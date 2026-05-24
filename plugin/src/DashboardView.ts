import { App, ItemView, TFile, WorkspaceLeaf } from 'obsidian';
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

const LEGEND_ORDER = ['project', 'system', 'knowledge', 'person', 'reference', 'strategy', 'daily'];
const TASK_FOLDERS  = ['02 - Projects', '01 - Daily'];
const TOKEN_LOG_PATH = '00 - Inbox/claude-tokens.json';
const SIM_W = 800;
const SIM_H = 520;

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  type: string;
  path: string;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

interface TokenSession {
  date: string;
  tokens_in: number;
  tokens_out: number;
  total: number;
  session_label?: string;
}

interface TokenLog {
  monthly_limit: number;
  sessions: TokenSession[];
}

export class DashboardView extends ItemView {
  private sim: d3.Simulation<GraphNode, GraphLink> | null = null;

  constructor(leaf: WorkspaceLeaf, private obsApp: App) {
    super(leaf);
  }

  getViewType()    { return DASHBOARD_VIEW_TYPE; }
  getDisplayText() { return 'Travis OS'; }
  getIcon()        { return 'layout-dashboard'; }

  async onOpen()  { await this.render(); }
  async onClose() { this.sim?.stop(); }

  async render() {
    const root = this.containerEl.children[1] as HTMLElement;
    root.empty();
    root.addClass('tos-root');

    this.buildHeader(root);

    const grid = root.createDiv('tos-grid');
    const left  = grid.createDiv('tos-col-left');
    const right = grid.createDiv('tos-col-right');

    await this.buildTasksPanel(left);
    await this.buildTokenPanel(left);
    await this.buildStatsPanel(left);
    await this.buildGraphPanel(right);
  }

  // ── Header ──────────────────────────────────────────────────────────────

  private buildHeader(root: HTMLElement) {
    const h = root.createDiv('tos-header');
    h.createDiv({ cls: 'tos-title', text: 'T R A V I S  ·  O S' });

    const status = h.createDiv('tos-status');
    status.createSpan({ cls: 'tos-dot' });
    status.createSpan({ cls: 'tos-status-text', text: 'SYSTEM ONLINE' });

    const m = (window as any).moment;
    h.createDiv({ cls: 'tos-date', text: m ? m().format('YYYY.MM.DD · HH:mm') : new Date().toLocaleString() });
  }

  // ── Tasks ────────────────────────────────────────────────────────────────

  private async buildTasksPanel(col: HTMLElement) {
    const body = this.panel(col, 'ACTIVE TASKS', 'tos-tasks-panel');
    const tasks = await this.openTasks();

    if (!tasks.length) {
      body.createDiv({ cls: 'tos-empty', text: 'NO ACTIVE TASKS' });
      return;
    }

    const list = body.createDiv('tos-task-list');
    for (const t of tasks.slice(0, 9)) {
      const row = list.createDiv('tos-task-row');
      row.createSpan({ cls: 'tos-task-dot' });
      const lbl = row.createSpan({ cls: 'tos-task-lbl', text: t.text });
      lbl.title = t.path;
      row.addEventListener('click', () => this.openFile(t.path));
    }

    if (tasks.length > 9) {
      body.createDiv({ cls: 'tos-overflow', text: `+${tasks.length - 9} MORE` });
    }
  }

  // ── Tokens ───────────────────────────────────────────────────────────────

  private async buildTokenPanel(col: HTMLElement) {
    const body = this.panel(col, 'CLAUDE TOKEN USAGE', 'tos-token-panel');
    const log  = await this.readTokenLog();

    if (!log) {
      body.createDiv({ cls: 'tos-empty', text: 'NO LOG · ' + TOKEN_LOG_PATH });
      return;
    }

    const used = this.monthlyUsed(log);
    const pct  = Math.min(100, Math.round((used / log.monthly_limit) * 100));
    const warn = pct > 80;

    const bar = body.createDiv('tos-meter-track');
    const fill = bar.createDiv(warn ? 'tos-meter-fill tos-meter-warn' : 'tos-meter-fill');
    fill.style.width = `${pct}%`;

    const meta = body.createDiv('tos-token-meta');
    meta.createSpan({ cls: 'tos-tok-used', text: this.fmtTok(used) });
    meta.createSpan({ cls: 'tos-tok-sep',  text: ' / ' });
    meta.createSpan({ cls: 'tos-tok-lim',  text: this.fmtTok(log.monthly_limit) });
    meta.createSpan({ cls: 'tos-tok-pct',  text: `  ${pct}%` });

    const hist = body.createDiv('tos-token-hist');
    for (const s of log.sessions.slice(-4).reverse()) {
      const row = hist.createDiv('tos-token-row');
      row.createSpan({ cls: 'tos-tok-date', text: s.date });
      row.createSpan({ cls: 'tos-tok-val',  text: this.fmtTok(s.total) });
      if (s.session_label) row.createSpan({ cls: 'tos-tok-tag', text: s.session_label });
    }
  }

  // ── Stats ─────────────────────────────────────────────────────────────────

  private async buildStatsPanel(col: HTMLElement) {
    const body  = this.panel(col, 'VAULT STATS', 'tos-stats-panel');
    const files = this.obsApp.vault.getMarkdownFiles();
    const types: Record<string, number> = {};
    let openTasks = 0;
    let todayMod  = 0;
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
    this.stat(sg, String(todayMod),     'MODIFIED TODAY');

    const legend = body.createDiv('tos-legend');
    for (const type of LEGEND_ORDER) {
      if (!types[type]) continue;
      const row = legend.createDiv('tos-legend-row');
      const dot = row.createSpan({ cls: 'tos-legend-dot' });
      const col  = TYPE_COLORS[type] ?? TYPE_COLORS.default;
      dot.style.background  = col;
      dot.style.boxShadow   = `0 0 5px ${col}`;
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
        .scaleExtent([0.15, 5])
        .on('zoom', (e) => g.attr('transform', e.transform))
    );

    this.sim = d3.forceSimulation<GraphNode>(nodes)
      .force('link',      d3.forceLink<GraphNode, GraphLink>(links).id(d => d.id).distance(55).strength(0.4))
      .force('charge',    d3.forceManyBody().strength(-90))
      .force('center',    d3.forceCenter(SIM_W / 2, SIM_H / 2))
      .force('collision', d3.forceCollide(10));

    const linkSel = g.append('g')
      .selectAll<SVGLineElement, GraphLink>('line')
      .data(links)
      .join('line')
      .attr('class', 'tos-link');

    const nodeSel = g.append('g')
      .selectAll<SVGGElement, GraphNode>('g')
      .data(nodes)
      .join('g')
      .attr('class', 'tos-node')
      .call(
        d3.drag<SVGGElement, GraphNode>()
          .on('start', (e, d) => { if (!e.active) this.sim!.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
          .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y; })
          .on('end',   (e, d) => { if (!e.active) this.sim!.alphaTarget(0); d.fx = null; d.fy = null; })
      );

    nodeSel.append('circle')
      .attr('r', d => d.type === 'daily' ? 3.5 : 5.5)
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

  // ── Data helpers ──────────────────────────────────────────────────────────

  private graphData(): { nodes: GraphNode[]; links: GraphLink[] } {
    const nodes: GraphNode[]  = [];
    const links: GraphLink[]  = [];
    const ids   = new Set<string>();

    for (const f of this.obsApp.vault.getMarkdownFiles()) {
      const meta = this.obsApp.metadataCache.getFileCache(f);
      const type = meta?.frontmatter?.type ?? 'default';
      nodes.push({ id: f.basename, type, path: f.path });
      ids.add(f.basename);
    }

    for (const [src, targets] of Object.entries(this.obsApp.metadataCache.resolvedLinks)) {
      const srcName = src.replace(/\.md$/, '').split('/').pop()!;
      for (const tgt of Object.keys(targets)) {
        if (!tgt.endsWith('.md')) continue;
        const tgtName = tgt.replace(/\.md$/, '').split('/').pop()!;
        if (ids.has(srcName) && ids.has(tgtName) && srcName !== tgtName) {
          links.push({ source: srcName, target: tgtName });
        }
      }
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
          const raw  = lines[item.position.start.line] ?? '';
          const text = raw.replace(/^[\s\-*+]+\[ \]\s*/, '').trim();
          if (text) results.push({ text, path: file.path });
        }
      }
    }

    return results;
  }

  private async readTokenLog(): Promise<TokenLog | null> {
    const f = this.obsApp.vault.getAbstractFileByPath(TOKEN_LOG_PATH);
    if (!(f instanceof TFile)) return null;
    try {
      return JSON.parse(await this.obsApp.vault.read(f)) as TokenLog;
    } catch {
      return null;
    }
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
