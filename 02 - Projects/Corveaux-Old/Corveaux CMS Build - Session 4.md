---
type: session-note
domain: corveaux
status: complete
date: 2026-05-24
tags:
  - cms
  - tenant-admin
  - platform-admin
  - theming
  - wysiwyg
  - dnd
  - session-log
---

# Corveaux CMS Build - Session 4

## What Was Built

### Platform Admin Cleanup
- **Sidebar trimmed** — removed Sites/Pages/Blocks/KB from platform admin nav. Now only: Overview, Tenants, Settings.
- **`/admin`** — platform dashboard now shows aggregate stats (tenants, sites, pages, KB articles) + tenant list with "Open admin" links
- **`/admin/tenants`** — NEW: full tenant management table (name, slug, domain, content counts, status, Open admin link)
- **`/admin/settings`** — NEW: platform settings page (platform info, env, totals, content defaults — informational MVP)

### Tenant Settings: CSS Theming
- **`/t/[slug]/admin/settings`** — Extended with a full CSS Theme section
- 7 editable color variables (Primary/Accent, Nav Background, Nav Text, Page Background, Surface/Card, Heading Text, Body Text)
- Each variable has a native `<input type="color">` picker + hex text input
- Live preview panel shows a miniaturized site (nav bar + card + CTA button) that updates in real time
- "Reset to defaults" button reverts to Corveaux platform palette
- Theme saved to `Tenant.theme` JSON field via `updateTenantTheme` server action
- **Public layout** (`/t/[slug]/(public)/layout.tsx`) now reads `Tenant.theme` and applies CSS custom properties (`--t-primary`, `--t-nav-bg`, `--t-nav-text`, `--t-bg`, `--t-surface`, `--t-heading`, `--t-body`) as inline styles on the root div, with platform token fallbacks

### Page/Block Layout System
- **Schema**: Added `Page.layout String @default("1col")`, `Page.departmentContext String?`, `PageBlock.column Int @default(0)`
- Migration `20260524182947_add_layout_columns` applied
- **Layout options**: 1 Column, 2 Column (Left/Right halves), 3 Column (Left/Center/Right thirds)
- Layout picker in PageMetaForm sidebar as radio buttons
- Page canvas renders as CSS grid matching the selected layout
- Each BlockCard has a column selector dropdown (hidden for 1col, Left/Right for 2col, Left/Center/Right for 3col)
- `updateBlockColumn` server action moves a block to a new column (appends at end of that column)

### WYSIWYG Editors
- **`src/components/admin/RichTextEditor.tsx`** — NEW: TipTap WYSIWYG editor with toolbar (Bold, Italic, H2, H3, Bullet/Ordered Lists, HR, Undo/Redo)
- **`BlockEditForm`** updated:
  - RICH_TEXT blocks now use TipTap WYSIWYG instead of textarea
  - HERO: live preview panel shows rendered hero section (bg color, headline, subheadline, CTA button)
  - CALLOUT: live preview shows styled callout box with variant-appropriate colors
  - CARD: live preview shows a styled card component
- Packages installed: `@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`

### Drag and Drop Block Reordering
- **dnd-kit installed**: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- `BlockCard` uses `useSortable` hook — drag handle on GripVertical icon
- `PageEditor` wraps all columns in `DndContext`, each column has its own `SortableContext`
- DnD is within-column only (blocks change columns via dropdown)
- Optimistic local state update on drag end, then `reorderBlocks` server action syncs positions
- `moveBlock` (button-based) removed; replaced by DnD

### Ownership Fields
- **Pages**: Layout + ownership (owner select from tenant members, department context) added to PageMetaForm sidebar
- **Blocks**: Owner select + department input added to BlockEditor sidebar
- Both editors load tenant members via `prisma.tenant.findUnique` â†’ members join
- `updatePageMeta` now saves layout, departmentContext, ownerId
- `updateBlockMeta` now saves departmentContext, ownerId

## Architecture Summary

**Two independent admin surfaces:**
- `/admin` — Platform superadmin (Corveaux internal): Overview, Tenants, Settings
- `/t/[slug]/admin` — Tenant admin: Sites, Pages, Blocks, KB, Settings (with theming)

**Route isolation:** `t/[slug]/(public)/` route group for public site, `t/[slug]/admin/` independent layout tree

---

## Related

[[Corveaux]]
[[Corveaux CMS Build - Session 3]]
[[Corveaux CMS Build - Session 5]]
[[Corveaux CMS Build - Session 6 Plan]]
