import { App, ItemView, Notice, TFile, WorkspaceLeaf } from 'obsidian';
import * as d3 from 'd3';

export const DASHBOARD_VIEW_TYPE = 'travis-os-dashboard';

const TYPE_COLORS: Record<string, string> = {
  daily:     '#00ff88',
  project:   '#ff6b35',
  knowledge: '#00d4ff',
  system:    '#7b2fff',
  person:    '#ffd700',
  reference: '#ff4b91',
  strategy:  '#ff8c00',
  default:   '#4a9eff',
};

const LEGEND_ORDER  = ['project', 'system', 'knowledge', 'person', 'reference', 'strategy', 'daily'];
const TASK_FOLDERS  = ['02 - Projects', '01 - Daily'];
const TOKEN_LOG     = '00 - Inbox/claude-tokens.json';
const GRAPH_EXCLUDE = ['plugin/', '.obsidian/'];
const MAX_SESSIONS  = 6;
const SIM_W = 800;
const SIM_H = 480;

interface GraphNode extends d3.SimulationNodeDatum { id: string; type: string; path: string; }
interface GraphLink extends d3.SimulationLinkDatum<GraphNode> { source: string | GraphNode; target: string | GraphNode; }
interface TokenSession { date: string; tokens_in: number; tokens_out: number; total: number; session_label?: string; }
interface TokenLog { daily_limit?: number; monthly_limit: number; sessions: TokenSession[]; }
interface LiveTokens { session: number; today: number; allTime: number; }
interface SessionInfo { id: string; mtime: Date; preview: string; }

export class DashboardView extends ItemView {
  private sim: d3.Simulation<GraphNode, GraphLink> | null = null;
  private tokenInterval: number | null = null;
  private tokenBody: HTMLElement | null = null;

  constructor(leaf: WorkspaceLeaf, private obsApp: App) { super(leaf); }

  getViewType()    { return DASHBOARD_VIEW_TYPE; }
  getDisplayText() { return 'Travis OS'; }
  getIcon()        { return 'layout-dashboard'; }

  async onOpen()  { await this.render(); }

  async onClose() {
    this.sim?.stop();
    if (this.tokenInterval !== null) window.clearInterval(this.tokenInterval);
  }

  // ── Render ──────────────────────────────────────────────────────────────

  async render() {
    const root = this.containerEl.children[1] as HTMLElement;
    root.empty();
    root.addClass('tos-root');
    this.buildHeader(root);

    const grid  = root.createDiv('tos-grid');
    const left  = grid.createDiv('tos-col-left');
    const right = grid.createDiv('tos-col-right');

    await this.buildDailyPanel(left);
    this.buildCapturePanel(left);
    this.buildRecentPanel(left);
    await this.buildTasksPanel(left);
    await this.buildTokenPanel(left);
    await this.buildStatsPanel(left);
    await this.buildGraphPanel(right);
    this.buildSessionPanel(right);
  }

  // ── Header ───────────────────────────────────────────────────────────────

  private buildHeader(root: HTMLElement) {
    const h = root.createDiv('tos-header');
    h.createDiv({ cls: 'tos-title', text: 'T R A V I S  ·  O S' });
    const s = h.createDiv('tos-status');
    s.createSpan({ cls: 'tos-dot' });
    s.createSpan({ cls: 'tos-status-text', text: 'SYSTEM ONLINE' });
    const m = (window as any).moment;
    h.createDiv({ cls: 'tos-date', text: m ? m().format('YYYY.MM.DD · HH:mm') : new Date().toLocaleString() });
  }

  // ── Daily Note ────────────────────────────────────────────────────────────

  private async buildDailyPanel(col: HTMLElement) {
    const body = this.panel(col, 'DAILY NOTE', 'tos-daily-panel');
    const m    = (window as any).moment;
    const today = m ? m().format('YYYY-MM-DD') : new Date().toISOString().slice(0, 10);
    const path  = `01 - Daily/${today}.md`;
    const exists = !!this.obsApp.vault.getAbstractFileByPath(path);

    body.createDiv({ cls: 'tos-daily-date', text: m ? m().format('dddd, MMMM D') : today });

    const btn = body.createEl('button', {
      cls:  exists ? 'tos-daily-btn tos-daily-open' : 'tos-daily-btn tos-daily-create',
      text: exists ? "OPEN TODAY'S NOTE" : "CREATE TODAY'S NOTE",
    });
    btn.addEventListener('click', async () => {
      if (exists) { await this.openFile(path); return; }
      await this.createDailyNote(today, path);
      btn.setText("OPEN TODAY'S NOTE");
      btn.removeClass('tos-daily-create');
      btn.addClass('tos-daily-open');
    });

    if (!exists) {
      const last = this.obsApp.vault.getMarkdownFiles()
        .filter(f => f.path.startsWith('01 - Daily/'))
        .sort((a, b) => b.stat.mtime - a.stat.mtime)[0];
      if (last) {
        const row = body.createDiv('tos-daily-last');
        row.createSpan({ cls: 'tos-daily-last-lbl', text: 'LAST' });
        const link = row.createSpan({ cls: 'tos-daily-last-name', text: last.basename });
        link.addEventListener('click', () => this.openFile(last.path));
      }
    }
  }

  private async createDailyNote(date: string, path: string) {
    const tplFile = this.obsApp.vault.getAbstractFileByPath('99 - Templates/Daily.md');
    let content = `---\ntype: daily\ndate: ${date}\n---\n\n# ${date}\n\n## Focus\n\n## Tasks\n\n- [ ] \n\n## Thoughts\n\n## Related\n`;

    if (tplFile instanceof TFile) {
      const raw = await this.obsApp.vault.read(tplFile);
      content = raw.replace(/<% tp\.date\.now\("YYYY-MM-DD"\) %>/g, date);
    }

    await this.obsApp.vault.create(path, content);
    await this.openFile(path);
  }

  // ── Quick Capture ─────────────────────────────────────────────────────────

  private buildCapturePanel(col: HTMLElement) {
    const body = this.panel(col, 'QUICK CAPTURE', 'tos-capture-panel');

    const textarea = body.createEl('textarea') as HTMLTextAreaElement;
    textarea.addClass('tos-capture-input');
    textarea.placeholder = 'capture a thought...';
    textarea.rows = 3;

    const row = body.createDiv('tos-capture-row');
    const btn  = row.createEl('button', { cls: 'tos-capture-btn', text: 'CAPTURE' });
    row.createSpan({ cls: 'tos-capture-hint', text: 'ctrl+enter' });

    const capture = async () => {
      const text = textarea.value.trim();
      if (!text) return;

      const m   = (window as any).moment;
      const now = m ? m() : new Date();
      const ts  = m ? now.format('YYYY-MM-DD HH-mm-ss') : new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
      const title    = text.split('\n')[0].slice(0, 40).replace(/[\\/:*?"<>|]/g, '');
      const dateStr  = m ? now.format('YYYY-MM-DD HH:mm') : new Date().toLocaleString();
      const fileName = `00 - Inbox/${ts} ${title}.md`;

      try {
        await this.obsApp.vault.create(fileName, `---\ntype: capture\ndate: ${dateStr}\n---\n\n${text}\n`);
        textarea.value = '';
        btn.setText('CAPTURED');
        btn.addClass('tos-capture-ok');
        setTimeout(() => { btn.setText('CAPTURE'); btn.removeClass('tos-capture-ok'); }, 1600);
      } catch {
        btn.setText('ERROR');
        setTimeout(() => btn.setText('CAPTURE'), 1600);
      }
    };

    btn.addEventListener('click', capture);
    textarea.addEventListener('keydown', e => { if (e.key === 'Enter' && e.ctrlKey) { e.preventDefault(); capture(); } });
  }

  // ── Recent Notes ──────────────────────────────────────────────────────────

  private buildRecentPanel(col: HTMLElement) {
    const body  = this.panel(col, 'RECENT NOTES', 'tos-recent-panel');
    const files = this.obsApp.vault.getMarkdownFiles()
      .filter(f => !GRAPH_EXCLUDE.some(p => f.path.startsWith(p)))
      .sort((a, b) => b.stat.mtime - a.stat.mtime)
      .slice(0, 7);

    if (!files.length) { body.createDiv({ cls: 'tos-empty', text: 'NO NOTES' }); return; }

    const list = body.createDiv('tos-recent-list');
    for (const file of files) {
      const meta  = this.obsApp.metadataCache.getFileCache(file);
      const type  = meta?.frontmatter?.type ?? 'default';
      const color = TYPE_COLORS[type] ?? TYPE_COLORS.default;

      const row = list.createDiv('tos-recent-row');
      const dot = row.createSpan({ cls: 'tos-recent-dot' });
      dot.style.background = color;
      dot.style.boxShadow  = `0 0 4px ${color}`;

      const info = row.createDiv('tos-recent-info');
      info.createDiv({ cls: 'tos-recent-name', text: file.basename });
      info.createDiv({ cls: 'tos-recent-time', text: this.relTime(file.stat.mtime) });

      row.addEventListener('click', () => this.openFile(file.path));
    }
  }

  // ── Tasks ────────────────────────────────────────────────────────────────

  private async buildTasksPanel(col: HTMLElement) {
    const body = this.panel(col, 'ACTIVE TASKS', 'tos-tasks-panel');
    const tasks = await this.openTasks();
    if (!tasks.length) { body.createDiv({ cls: 'tos-empty', text: 'NO ACTIVE TASKS' }); return; }

    const list = body.createDiv('tos-task-list');
    for (const t of tasks.slice(0, 9)) {
      const row = list.createDiv('tos-task-row');
      row.createSpan({ cls: 'tos-task-dot' });
      const lbl = row.createSpan({ cls: 'tos-task-lbl', text: t.text });
      lbl.title = t.path;
      row.addEventListener('click', () => this.openFile(t.path));
    }
    if (tasks.length > 9) body.createDiv({ cls: 'tos-overflow', text: `+${tasks.length - 9} MORE` });
  }

  // ── Tokens ───────────────────────────────────────────────────────────────

  private async buildTokenPanel(col: HTMLElement) {
    const wrap = col.createDiv('tos-panel tos-token-panel');
    wrap.createDiv({ cls: 'tos-panel-title', text: 'CLAUDE TOKEN USAGE' });
    const body = wrap.createDiv('tos-panel-body');
    this.tokenBody = body;

    await this.renderTokens(body);

    this.tokenInterval = window.setInterval(async () => {
      if (!this.tokenBody) return;
      this.tokenBody.empty();
      await this.renderTokens(this.tokenBody);
    }, 30_000);
  }

  private async renderTokens(body: HTMLElement) {
    const live = this.readLiveTokens();
    const log  = await this.readTokenLog();

    if (!live && !log) {
      body.createDiv({ cls: 'tos-empty', text: `NO LOG · ${TOKEN_LOG}` });
      return;
    }

    // TODAY row — primary metric (stable, doesn't reset mid-session)
    if (live) {
      const todayRow = body.createDiv('tos-live-row');
      todayRow.createSpan({ cls: 'tos-live-label', text: 'TODAY' });
      todayRow.createSpan({ cls: 'tos-live-val',   text: this.fmtTok(live.today) });

      const dailyLimit = log?.daily_limit;
      if (dailyLimit) {
        const pct = Math.min(100, Math.round((live.today / dailyLimit) * 100));
        const bar  = body.createDiv('tos-meter-track');
        const fill = bar.createDiv(pct > 80 ? 'tos-meter-fill tos-meter-warn' : 'tos-meter-fill');
        fill.style.width = `${pct}%`;
        const meta = body.createDiv('tos-token-meta');
        meta.createSpan({ cls: 'tos-tok-used', text: this.fmtTok(live.today) });
        meta.createSpan({ cls: 'tos-tok-sep',  text: ' / ' });
        meta.createSpan({ cls: 'tos-tok-lim',  text: this.fmtTok(dailyLimit) });
        meta.createSpan({ cls: 'tos-tok-pct',  text: `  ${pct}%` });
      }

      // Session + all-time as secondary info
      const sub = body.createDiv('tos-tok-sub');
      sub.createSpan({ cls: 'tos-tok-sub-lbl', text: 'SESSION' });
      sub.createSpan({ cls: 'tos-tok-sub-val', text: this.fmtTok(live.session) });
      sub.createSpan({ cls: 'tos-tok-sub-sep', text: '·' });
      sub.createSpan({ cls: 'tos-tok-sub-lbl', text: 'ALL TIME' });
      sub.createSpan({ cls: 'tos-tok-sub-val', text: this.fmtTok(live.allTime) });
    }

    // Monthly bar (from manual log)
    if (log) {
      const used = this.monthlyUsed(log);
      const pct  = Math.min(100, Math.round((used / log.monthly_limit) * 100));
      body.createDiv({ cls: 'tos-tok-divider' });
      const mrow = body.createDiv('tos-tok-month-row');
      mrow.createSpan({ cls: 'tos-live-label', text: 'MONTH (LOG)' });
      const mbar  = body.createDiv('tos-meter-track');
      const mfill = mbar.createDiv(pct > 80 ? 'tos-meter-fill tos-meter-warn' : 'tos-meter-fill');
      mfill.style.width = `${pct}%`;
      const mmeta = body.createDiv('tos-token-meta');
      mmeta.createSpan({ cls: 'tos-tok-used', text: this.fmtTok(used) });
      mmeta.createSpan({ cls: 'tos-tok-sep',  text: ' / ' });
      mmeta.createSpan({ cls: 'tos-tok-lim',  text: this.fmtTok(log.monthly_limit) });
      mmeta.createSpan({ cls: 'tos-tok-pct',  text: `  ${pct}%` });
    }
  }

  // ── Stats ─────────────────────────────────────────────────────────────────

  private async buildStatsPanel(col: HTMLElement) {
    const body  = this.panel(col, 'VAULT STATS', 'tos-stats-panel');
    const files = this.obsApp.vault.getMarkdownFiles()
      .filter(f => !GRAPH_EXCLUDE.some(p => f.path.startsWith(p)));
    const types: Record<string, number> = {};
    let openTasks = 0, todayMod = 0;
    const dayStart = Date.now() - (Date.now() % 86_400_000);

    for (const f of files) {
      const meta = this.obsApp.metadataCache.getFileCache(f);
      const t    = meta?.frontmatter?.type ?? 'default';
      types[t]   = (types[t] ?? 0) + 1;
      openTasks  += (meta?.listItems ?? []).filter(i => i.task === ' ').length;
      if (f.stat.mtime >= dayStart) todayMod++;
    }

    const sg = body.createDiv('tos-stats-grid');
    this.stat(sg, String(files.length), 'NOTES');
    this.stat(sg, String(openTasks),    'OPEN TASKS');
    this.stat(sg, String(todayMod),     'MOD TODAY');

    const legend = body.createDiv('tos-legend');
    for (const type of LEGEND_ORDER) {
      if (!types[type]) continue;
      const row = legend.createDiv('tos-legend-row');
      const dot = row.createSpan({ cls: 'tos-legend-dot' });
      const c   = TYPE_COLORS[type] ?? TYPE_COLORS.default;
      dot.style.background = c;
      dot.style.boxShadow  = `0 0 5px ${c}`;
      row.createSpan({ cls: 'tos-legend-lbl',   text: type.toUpperCase() });
      row.createSpan({ cls: 'tos-legend-count', text: String(types[type]) });
    }
  }

  // ── Graph ─────────────────────────────────────────────────────────────────

  private async buildGraphPanel(col: HTMLElement) {
    const body = this.panel(col, 'NOTE GRAPH', 'tos-graph-panel');
    body.addClass('tos-graph-body');

    const { nodes, links } = this.graphData();
    const svgEl = body.createSvg('svg');
    svgEl.setAttribute('class', 'tos-graph-svg');
    svgEl.setAttribute('viewBox', `0 0 ${SIM_W} ${SIM_H}`);
    svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    const svg = d3.select(svgEl as SVGSVGElement);
    const g   = svg.append('g');

    svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 5])
        .on('zoom', e => g.attr('transform', e.transform))
    );

    this.sim = d3.forceSimulation<GraphNode>(nodes)
      .force('link',      d3.forceLink<GraphNode, GraphLink>(links).id(d => d.id).distance(55).strength(0.4))
      .force('charge',    d3.forceManyBody().strength(-90))
      .force('center',    d3.forceCenter(SIM_W / 2, SIM_H / 2))
      .force('collision', d3.forceCollide(10));

    const linkSel = g.append('g')
      .selectAll<SVGLineElement, GraphLink>('line').data(links).join('line').attr('class', 'tos-link');

    const nodeSel = g.append('g')
      .selectAll<SVGGElement, GraphNode>('g').data(nodes).join('g').attr('class', 'tos-node')
      .call(
        d3.drag<SVGGElement, GraphNode>()
          .on('start', (e, d) => { if (!e.active) this.sim!.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
          .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y; })
          .on('end',   (e, d) => { if (!e.active) this.sim!.alphaTarget(0); d.fx = null; d.fy = null; })
      );

    nodeSel.append('circle')
      .attr('r',    d => d.type === 'daily' ? 3.5 : 5.5)
      .attr('fill', d => TYPE_COLORS[d.type] ?? TYPE_COLORS.default)
      .attr('class', 'tos-node-circle');

    nodeSel.append('title').text(d => d.id);
    nodeSel.on('click', (_e, d) => this.openFile(d.path));

    this.sim.on('tick', () => {
      linkSel
        .attr('x1', d => (d.source as GraphNode).x ?? 0)
        .attr('y1', d => (d.source as GraphNode).y ?? 0)
        .attr('x2', d => (d.target as GraphNode).x ?? 0)
        .attr('y2', d => (d.target as GraphNode).y ?? 0);
      nodeSel.attr('transform', d => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });
  }

  // ── Session Panel ─────────────────────────────────────────────────────────

  private buildSessionPanel(col: HTMLElement) {
    const wrap = col.createDiv('tos-panel tos-session-panel');
    wrap.createDiv({ cls: 'tos-panel-title', text: 'CLAUDE SESSIONS' });
    const body = wrap.createDiv('tos-session-body');

    const topRow = body.createDiv('tos-session-actions');
    const newBtn = topRow.createEl('button', { cls: 'tos-session-new', text: '+ NEW SESSION' });
    const conBtn = topRow.createEl('button', { cls: 'tos-session-con', text: 'CONTINUE LAST' });
    newBtn.addEventListener('click', () => this.launchClaude('new', newBtn as HTMLButtonElement));
    conBtn.addEventListener('click', () => this.launchClaude('continue', conBtn as HTMLButtonElement));

    const sessions = this.getSessions();

    if (!sessions.length) {
      body.createDiv({ cls: 'tos-empty', text: 'NO SESSIONS FOUND' });
      return;
    }

    const list = body.createDiv('tos-session-list');
    for (const s of sessions.slice(0, MAX_SESSIONS)) {
      const row = list.createDiv('tos-session-row');

      const info = row.createDiv('tos-session-info');
      info.createDiv({ cls: 'tos-session-date', text: this.fmtDate(s.mtime) });
      info.createDiv({ cls: 'tos-session-id',   text: s.id.slice(0, 8) });
      if (s.preview) info.createDiv({ cls: 'tos-session-preview', text: s.preview });

      const btn = row.createEl('button', { cls: 'tos-resume-btn', text: 'RESUME' });
      btn.addEventListener('click', () => this.launchClaude(s.id, btn as HTMLButtonElement));
    }
  }

  private getSessions(): SessionInfo[] {
    try {
      const fs   = require('fs')   as typeof import('fs');
      const path = require('path') as typeof import('path');
      const os   = require('os')   as typeof import('os');

      const projectHash = this.vaultPath().replace(/\\/g, '-').replace(/:/g, '-');
      const claudeDir   = path.join(os.homedir(), '.claude', 'projects', projectHash);
      if (!fs.existsSync(claudeDir)) return [];

      return (fs.readdirSync(claudeDir) as string[])
        .filter((f: string) => f.endsWith('.jsonl'))
        .map((f: string) => {
          const full  = path.join(claudeDir, f);
          const id    = f.slice(0, -6);
          const mtime = new Date(fs.statSync(full).mtimeMs);
          let preview = '';

          try {
            const lines = (fs.readFileSync(full, 'utf8') as string).split('\n');
            for (const line of lines.slice(0, 40)) {
              if (!line.trim()) continue;
              try {
                const obj = JSON.parse(line);
                if (obj.type === 'user' && typeof obj.message?.content === 'string') {
                  preview = obj.message.content.slice(0, 72).replace(/\n/g, ' ');
                  break;
                }
              } catch { /* skip */ }
            }
          } catch { /* skip */ }

          return { id, mtime, preview };
        })
        .sort((a: SessionInfo, b: SessionInfo) => b.mtime.getTime() - a.mtime.getTime());
    } catch {
      return [];
    }
  }

  private launchClaude(mode: string, btn?: HTMLButtonElement) {
    const fs   = require('fs')   as typeof import('fs');
    const path = require('path') as typeof import('path');
    const os   = require('os')   as typeof import('os');
    const { exec, execSync } = require('child_process') as typeof import('child_process');

    const vault = this.vaultPath();

    // Resolve absolute path to claude.cmd to avoid Electron PATH gaps
    let claudeBin = 'claude';
    try {
      const lines = (execSync('where claude', { shell: true }) as Buffer)
        .toString().split(/\r?\n/).map((l: string) => l.trim()).filter(Boolean);
      claudeBin = lines.find((l: string) => l.toLowerCase().endsWith('.cmd'))
               ?? lines.find((l: string) => l.toLowerCase().endsWith('.exe'))
               ?? lines[0]
               ?? 'claude';
    } catch { /* fallback to 'claude' */ }

    const claudeArg =
      mode === 'new'      ? '' :
      mode === 'continue' ? '--continue' :
                            `--resume ${mode}`;

    // Write a temp .ps1 file -- eliminates ALL quoting issues
    const scriptPath = path.join(os.tmpdir(), `travis-os-${Date.now()}.ps1`);
    fs.writeFileSync(
      scriptPath,
      `Set-Location '${vault.replace(/'/g, "''")}'\r\n& '${claudeBin.replace(/'/g, "''")}' ${claudeArg}\r\n`,
      'utf8'
    );

    if (btn) { btn.disabled = true; btn.setText('LAUNCHING...'); }
    const btnLabel = mode === 'new' ? '+ NEW SESSION' : mode === 'continue' ? 'CONTINUE LAST' : 'RESUME';
    const restore  = (label: string) => { if (btn) { btn.disabled = false; btn.setText(label); } };
    const cleanup  = () => { try { fs.unlinkSync(scriptPath); } catch { /* ignore */ } };

    const psArgs = `-NoExit -NoProfile -ExecutionPolicy Bypass -File "${scriptPath}"`;
    const wtCmd  = `start "" wt.exe new-tab -- powershell.exe ${psArgs}`;
    const psCmd  = `start "" powershell.exe ${psArgs}`;

    exec(wtCmd, { shell: true }, (err) => {
      if (!err) { restore(btnLabel); setTimeout(cleanup, 15_000); return; }

      exec(psCmd, { shell: true }, (err2) => {
        cleanup();
        if (!err2) { restore(btnLabel); return; }
        restore('ERROR');
        new Notice(`Travis OS: failed to open terminal\n${err2.message}`, 8000);
      });
    });
  }

  private fmtDate(d: Date): string {
    return d.toISOString().slice(0, 16).replace('T', '  ');
  }

  private relTime(mtime: number): string {
    const mins = Math.floor((Date.now() - mtime) / 60_000);
    if (mins < 1)   return 'just now';
    if (mins < 60)  return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs  < 24)  return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  // ── Data helpers ──────────────────────────────────────────────────────────

  private graphData(): { nodes: GraphNode[]; links: GraphLink[] } {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    const ids = new Set<string>();

    for (const f of this.obsApp.vault.getMarkdownFiles()) {
      if (GRAPH_EXCLUDE.some(prefix => f.path.startsWith(prefix))) continue;
      const meta = this.obsApp.metadataCache.getFileCache(f);
      const type = meta?.frontmatter?.type ?? 'default';
      nodes.push({ id: f.basename, type, path: f.path });
      ids.add(f.basename);
    }

    for (const [src, targets] of Object.entries(this.obsApp.metadataCache.resolvedLinks)) {
      if (GRAPH_EXCLUDE.some(p => src.startsWith(p))) continue;
      const srcName = src.replace(/\.md$/, '').split('/').pop()!;
      for (const tgt of Object.keys(targets)) {
        if (!tgt.endsWith('.md')) continue;
        const tgtName = tgt.replace(/\.md$/, '').split('/').pop()!;
        if (ids.has(srcName) && ids.has(tgtName) && srcName !== tgtName)
          links.push({ source: srcName, target: tgtName });
      }
    }

    return { nodes, links };
  }

  private readLiveTokens(): LiveTokens | null {
    try {
      const fs   = require('fs')   as typeof import('fs');
      const path = require('path') as typeof import('path');
      const os   = require('os')   as typeof import('os');

      const projectHash = this.vaultPath().replace(/\\/g, '-').replace(/:/g, '-');
      const claudeDir   = path.join(os.homedir(), '.claude', 'projects', projectHash);
      if (!fs.existsSync(claudeDir)) return null;

      const now       = Date.now();
      const dayStart  = now - (now % 86_400_000);

      const files = (fs.readdirSync(claudeDir) as string[])
        .filter((f: string) => f.endsWith('.jsonl'))
        .map((f: string) => ({ name: f, mtime: fs.statSync(path.join(claudeDir, f)).mtimeMs }))
        .sort((a: { mtime: number }, b: { mtime: number }) => b.mtime - a.mtime);

      if (!files.length) return null;

      const sessionFile = files[0].name;
      let session = 0, today = 0, allTime = 0;

      for (const { name, mtime } of files) {
        const content   = fs.readFileSync(path.join(claudeDir, name), 'utf8') as string;
        const isSession = name === sessionFile;
        const isToday   = mtime >= dayStart;

        for (const line of content.split('\n')) {
          if (!line.trim()) continue;
          try {
            const obj = JSON.parse(line);
            const u   = obj?.message?.usage;
            if (!u) continue;
            // Include all token types: fresh input, cache creation, cache reads, output
            const t = (u.input_tokens ?? 0)
                    + (u.cache_creation_input_tokens ?? 0)
                    + (u.cache_read_input_tokens ?? 0)
                    + (u.output_tokens ?? 0);
            allTime += t;
            if (isSession) session += t;
            if (isToday)   today   += t;
          } catch { /* malformed line */ }
        }
      }

      return { session, today, allTime };
    } catch {
      return null;
    }
  }

  private async openTasks(): Promise<Array<{ text: string; path: string }>> {
    const results: Array<{ text: string; path: string }> = [];
    for (const folder of TASK_FOLDERS) {
      const files = this.obsApp.vault.getMarkdownFiles()
        .filter(f => f.path.startsWith(folder))
        .sort((a, b) => b.stat.mtime - a.stat.mtime);

      for (const file of files) {
        const meta = this.obsApp.metadataCache.getFileCache(file);
        if (!meta?.listItems?.some(i => i.task === ' ')) continue;
        const content = await this.obsApp.vault.cachedRead(file);
        const lines   = content.split('\n');
        for (const item of meta.listItems) {
          if (item.task !== ' ') continue;
          const text = (lines[item.position.start.line] ?? '').replace(/^[\s\-*+]+\[ \]\s*/, '').trim();
          if (text) results.push({ text, path: file.path });
        }
      }
    }
    return results;
  }

  private async readTokenLog(): Promise<TokenLog | null> {
    const f = this.obsApp.vault.getAbstractFileByPath(TOKEN_LOG);
    if (!(f instanceof TFile)) return null;
    try { return JSON.parse(await this.obsApp.vault.read(f)) as TokenLog; }
    catch { return null; }
  }

  private monthlyUsed(log: TokenLog): number {
    const m = (window as any).moment;
    const start = m ? m().startOf('month').format('YYYY-MM-DD') : new Date().toISOString().slice(0, 7) + '-01';
    return log.sessions.filter(s => s.date >= start).reduce((n, s) => n + s.total, 0);
  }

  private fmtTok(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`;
    return String(n);
  }

  private vaultPath(): string {
    return (this.obsApp.vault.adapter as any).basePath ?? '';
  }

  // ── DOM helpers ───────────────────────────────────────────────────────────

  private panel(parent: HTMLElement, title: string, cls: string): HTMLElement {
    const wrap = parent.createDiv(`tos-panel ${cls}`);
    wrap.createDiv({ cls: 'tos-panel-title', text: title });
    return wrap.createDiv('tos-panel-body');
  }

  private stat(parent: HTMLElement, value: string, label: string) {
    const b = parent.createDiv('tos-stat-block');
    b.createDiv({ cls: 'tos-stat-value', text: value });
    b.createDiv({ cls: 'tos-stat-label', text: label });
  }

  private async openFile(path: string) {
    const f = this.obsApp.vault.getAbstractFileByPath(path);
    if (f instanceof TFile) await this.obsApp.workspace.openLinkText(path, '', false);
  }
}
