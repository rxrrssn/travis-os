import { App, ItemView, TFile, WorkspaceLeaf } from 'obsidian';
import * as d3 from 'd3';

export const DASHBOARD_VIEW_TYPE = 'travis-os-dashboard';

// Folder-based colors — distinct hue per top-level vault folder.
// Nested sub-folders derive lighter/softer variants of the parent hue.
const FOLDER_COLORS: Record<string, string> = {
  '00 - Inbox':     '#00d4ff',  // cyan
  '01 - Daily':     '#00ff88',  // green
  '02 - Projects':  '#ff6b35',  // orange
  '03 - Knowledge': '#4a9eff',  // blue
  '04 - People':    '#ffd700',  // gold
  '06 - Systems':   '#7b2fff',  // purple
  '08 - Reference': '#ff4b91',  // pink
  '99 - Templates': '#444444',  // dim
  default:          '#888888',
};

// Hues for sub-folder derivation (HSL).  Matches FOLDER_COLORS above.
const FOLDER_HUES: Record<string, number> = {
  '00 - Inbox':      188,
  '01 - Daily':      150,
  '02 - Projects':    20,
  '03 - Knowledge':  210,
  '04 - People':      45,
  '06 - Systems':    270,
  '08 - Reference':  330,
};

const FOLDER_LABELS: Record<string, string> = {
  '00 - Inbox':     'INBOX',
  '01 - Daily':     'DAILY',
  '02 - Projects':  'PROJECTS',
  '03 - Knowledge': 'KNOWLEDGE',
  '04 - People':    'PEOPLE',
  '06 - Systems':   'SYSTEMS',
  '08 - Reference': 'REFERENCE',
  '99 - Templates': 'TEMPLATES',
};

const FOLDER_ORDER = [
  '01 - Daily', '02 - Projects', '03 - Knowledge',
  '04 - People', '06 - Systems', '08 - Reference',
];
const TASK_FOLDERS  = ['02 - Projects', '01 - Daily'];
const TOKEN_LOG     = '00 - Inbox/claude-tokens.json';
const GRAPH_EXCLUDE = ['plugin/', '.obsidian/', '99 - Templates/'];
const SIM_W = 800;
const SIM_H = 480;

interface GraphNode extends d3.SimulationNodeDatum { id: string; type: string; path: string; degree: number; }
interface GraphLink extends d3.SimulationLinkDatum<GraphNode> { source: string | GraphNode; target: string | GraphNode; }
interface TokenSession { date: string; tokens_in: number; tokens_out: number; total: number; session_label?: string; }
interface TokenLog { daily_limit?: number; monthly_limit: number; sessions: TokenSession[]; }
interface LiveTokens { session: number; today: number; allTime: number; }

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
    this.buildRecentPanel(left);
    await this.buildTasksPanel(left);
    await this.buildStatsPanel(left);
    await this.buildGraphPanel(right);
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
      const color = this.folderColor(file.path);

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
    const folderCounts: Record<string, number> = {};
    let openTasks = 0, todayMod = 0;
    const dayStart = Date.now() - (Date.now() % 86_400_000);

    for (const f of files) {
      const meta   = this.obsApp.metadataCache.getFileCache(f);
      const folder = f.path.split('/')[0];
      folderCounts[folder] = (folderCounts[folder] ?? 0) + 1;
      openTasks += (meta?.listItems ?? []).filter(i => i.task === ' ').length;
      if (f.stat.mtime >= dayStart) todayMod++;
    }

    const sg = body.createDiv('tos-stats-grid');
    this.stat(sg, String(files.length), 'NOTES');
    this.stat(sg, String(openTasks),    'OPEN TASKS');
    this.stat(sg, String(todayMod),     'MOD TODAY');

    const legend = body.createDiv('tos-legend');
    for (const folder of FOLDER_ORDER) {
      if (!folderCounts[folder]) continue;
      const row = legend.createDiv('tos-legend-row');
      const dot = row.createSpan({ cls: 'tos-legend-dot' });
      const c   = FOLDER_COLORS[folder] ?? FOLDER_COLORS.default;
      dot.style.background = c;
      dot.style.boxShadow  = `0 0 5px ${c}`;
      row.createSpan({ cls: 'tos-legend-lbl',   text: FOLDER_LABELS[folder] ?? folder });
      row.createSpan({ cls: 'tos-legend-count', text: String(folderCounts[folder]) });
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
      .attr('r',    d => this.nodeRadius(d))
      .attr('fill', d => this.folderColor(d.path))
      .attr('stroke', d => this.folderStrokeColor(d.path))
      .attr('stroke-width', 3)
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

  private relTime(mtime: number): string {
    const mins = Math.floor((Date.now() - mtime) / 60_000);
    if (mins < 1)   return 'just now';
    if (mins < 60)  return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs  < 24)  return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  // ── Color helpers ─────────────────────────────────────────────────────────

  // Returns the color for a file at `path`.
  // Top-level folder → exact FOLDER_COLORS entry.
  // Nested sub-folders → hue within ±25° of parent (family feel, sibling contrast),
  // lightness 60–88% spread wide enough that siblings look clearly different.
  private folderColor(path: string): string {
    const parts = path.split('/');
    parts.pop(); // drop filename
    if (!parts.length) return FOLDER_COLORS.default;

    const topFolder = parts[0];
    if (parts.length === 1) return FOLDER_COLORS[topFolder] ?? FOLDER_COLORS.default;

    const hue = FOLDER_HUES[topFolder];
    if (hue === undefined) return FOLDER_COLORS[topFolder] ?? FOLDER_COLORS.default;

    const depth    = parts.length;              // 2 = direct child, 3 = grandchild…
    const leafName = parts[parts.length - 1];   // leaf folder name drives sibling spread
    const hashH    = this.strHash(leafName);    // hue dimension
    const hashL    = this.strHash(path);        // lightness dimension (independent bits)

    // Hue: ±25° rotation keyed on leaf name — siblings spread, parent family preserved.
    const h = (hue + (hashH % 51) - 25 + 360) % 360;

    // Lightness: 60–88% range; deeper levels start slightly higher (lighter base).
    const lMin   = 60 + (depth - 2) * 8;
    const lRange = Math.max(18, 30 - (depth - 2) * 4);
    const l      = Math.min(88, lMin + (hashL % lRange));

    // Saturation: rich at depth 2, fades with depth so deepest nesting stays legible.
    const s = Math.max(45, 82 - (depth - 2) * 18);

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  private strHash(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0xffffffff;
    return Math.abs(h);
  }

  private folderStrokeColor(path: string): string {
    const parts = path.split('/');
    parts.pop();
    if (!parts.length) return FOLDER_COLORS.default;

    const folderPath = parts.join('/');
    const h = this.strHash(folderPath) % 360;
    const s = 88;
    const l = parts.length === 1 ? 54 : Math.min(78, 52 + parts.length * 7);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  private nodeRadius(node: GraphNode): number {
    const base = node.type === '01 - Daily' ? 3.5 : 5;
    return Math.min(16, base + Math.sqrt(node.degree) * 2.2);
  }

  // ── Data helpers ──────────────────────────────────────────────────────────

  private graphData(): { nodes: GraphNode[]; links: GraphLink[] } {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    const ids = new Set<string>();

    for (const f of this.obsApp.vault.getMarkdownFiles()) {
      if (GRAPH_EXCLUDE.some(prefix => f.path.startsWith(prefix))) continue;
      const meta = this.obsApp.metadataCache.getFileCache(f);
      const type = f.path.split('/')[0];
      nodes.push({ id: f.basename, type, path: f.path, degree: 0 });
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

    const byId = new Map(nodes.map(node => [node.id, node]));
    for (const link of links) {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;
      const source = byId.get(sourceId);
      const target = byId.get(targetId);
      if (source) source.degree++;
      if (target) target.degree++;
    }

    return { nodes, links };
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

  private readLiveTokens(): LiveTokens | null {
    return null;
  }

  private async readTokenLog(): Promise<TokenLog | null> {
    return null;
  }

  private monthlyUsed(log: TokenLog): number {
    return log.sessions.reduce((n, s) => n + s.total, 0);
  }

  private fmtTok(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
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
