import { Plugin, WorkspaceLeaf } from 'obsidian';
import { DashboardView, DASHBOARD_VIEW_TYPE } from './DashboardView';

export default class TravisOSDashboard extends Plugin {
  async onload() {
    this.registerView(
      DASHBOARD_VIEW_TYPE,
      (leaf) => new DashboardView(leaf, this.app)
    );

    this.addRibbonIcon('layout-dashboard', 'Travis OS', () => this.activateDashboard());

    this.addCommand({
      id: 'open-travis-os-dashboard',
      name: 'Open Dashboard',
      callback: () => this.activateDashboard(),
    });
  }

  async onunload() {
    this.app.workspace.detachLeavesOfType(DASHBOARD_VIEW_TYPE);
  }

  async activateDashboard() {
    const { workspace } = this.app;
    let leaf: WorkspaceLeaf | null =
      workspace.getLeavesOfType(DASHBOARD_VIEW_TYPE)[0] ?? null;

    if (!leaf) {
      leaf = workspace.getLeaf('tab');
      await leaf.setViewState({ type: DASHBOARD_VIEW_TYPE, active: true });
    }

    workspace.revealLeaf(leaf);
  }
}
