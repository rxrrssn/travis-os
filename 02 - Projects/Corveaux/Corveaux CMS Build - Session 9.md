---
type: session-note
domain: corveaux
status: complete
date: 2026-05-27
tags:
  - cms
  - blocks
  - branding
  - wysiwyg
  - refactor
  - session-log
---

# Corveaux CMS Build - Session 9

## What Was Built

### TipTap WYSIWYG Editor ✅

Replaced raw textarea for RICH_TEXT blocks with a full TipTap editor.

**`src/components/editor/RichTextEditor.tsx`** (new):
- Extensions: StarterKit, Underline, Link
- Toolbar: Bold, Italic, Underline, H2, H3, BulletList, OrderedList, Link/Unlink
- `useEffect` syncs content when blockId changes (switching between blocks without unmount)

BlockEditForm imports from `@/components/editor/RichTextEditor`. The old `src/components/admin/RichTextEditor.tsx` was dead code and was deleted during the refactor.

---

### Block Content Previews in Collapsed BlockCard Headers ✅

When a BlockCard is collapsed, the header now shows a content preview:
- HERO → headline text
- RICH_TEXT → stripped plain text (120 char truncated)
- CARD → title
- CALLOUT → title + body
- SECTION_HEADER → headline
- FEATURE_GRID → section headline or first item headline
- PULLQUOTE → first 80 chars of quote
- SERVICE_GRID / LINK_GRID → section headline

Falls back to `block.key` in monospace if no preview is extractable.

---

### Brand Asset Management ✅

**File upload API:** `src/app/api/upload/route.ts`
- Auth-gated POST handler
- Accepts: `file` (File), `tenantId` (string), `purpose` (string)
- Stores to `public/uploads/[tenantId]/[purpose]-[timestamp][ext]`
- For PDFs with `purpose=brand-guide`: parses with `pdf-parse` (via `require()` — TS ESM compatibility), extracts hex and RGB colors from text
- Returns `{ url, extractedColors }`

**Tenant settings UI:** `src/app/t/[slug]/admin/settings/TenantSettingsEditor.tsx`
- Logo file upload button + manual URL fallback
- PDF brand guide upload with extracted color swatches (hover to apply to theme fields)
- Logo shown in live preview strip

---

### Branding Propagation ✅

Theme CSS vars (`--t-primary`, `--t-nav-bg`, `--t-nav-text`, `--t-bg`, `--t-surface`, `--t-heading`, `--t-body`) now applied consistently:

- **Public pages:** `PlatformLayout` applies full var set on wrapper div; inherited by all child components including `PublicHeader`
- **Tenant public layout:** `src/app/t/[slug]/(public)/layout.tsx` same pattern
- **Admin shells:** `AppShell` and `TenantAdminShell` apply `--t-primary` on wrapper div; nav active states use `var(--t-primary, var(--color-gold))`

Platform admin (`/admin`) pulls branding from the INTERNAL tenant — same `tenantType = 'INTERNAL'` record that powers the public site. No separate platform branding config.

---

### Logo + Tenant Name Always Together ✅

All sidebars and headers show logo (or initial badge fallback) AND tenant name simultaneously.

- Logo on graphite sidebar: `brightness-0 invert` CSS filter converts any colored logo to white
- Badge fallback: colored square using `var(--t-primary, var(--color-brass))` with capitalized first letter in white
- Name text always next to the logo, never replaced by it

---

### Responsive Public Nav ✅

`src/components/platform/PublicHeader.tsx` (new client component):
- Desktop: horizontal nav links
- Mobile: hamburger button (Menu/X toggle) → dropdown nav
- CSS vars inherited from server-rendered parent wrapper; no prop drilling needed

---

### Root KB Routes ✅

`src/app/kb/page.tsx` and `src/app/kb/[articleSlug]/page.tsx` — public KB pages at the platform root, using `getInternalTenant()` + `getPrimarySiteForTenant()`. Same layout as tenant KB pages but scoped to the INTERNAL tenant.

---

### Slug Change ✅

`corveaux-university` → `corveaux`

Seed handles gracefully: `updateMany({ where: { slug: 'corveaux-university', tenantType: 'INTERNAL' }, data: { slug: 'corveaux' } })` runs before the upsert.

---

### New Block Types ✅

Five new block types added to match the corveaux.app layout. All wired through: `src/types/content.ts`, `src/components/blocks/BlockRenderer.tsx`, `src/components/admin/BlockEditForm.tsx`, both `NewBlockButton.tsx` files, both `BlockCard.tsx` files, both `BlockPicker.tsx` files.

| Block Type | Description |
|---|---|
| `SECTION_HEADER` | Full-width headline + body paragraph, left or center aligned |
| `FEATURE_GRID` | Numbered feature cards (auto 01/02/03), add/remove items |
| `PULLQUOTE` | Large quote on dark (graphite) background with attribution |
| `SERVICE_GRID` | Badge-labeled cards (e.g. SaaS/OPS/DATA), 2 or 3 col grid |
| `LINK_GRID` | Clickable link cards with label, href, optional description |

**Updated HERO block:**
- Added `body` text field (paragraph below subheadline)
- Added `cta2Label`/`cta2Href` for a second CTA button (outlined style)
- Split layout: when `imageUrl` is set, text goes left and image goes right in a 2-col grid; without image, centered layout as before

---

### Codebase Refactor ✅

Eliminated ~200 LOC of duplication by extracting shared modules:

**`src/lib/theme.ts`** — single `buildCssVars(themeJson?)` covering all 7 CSS vars. Previously defined in 4 places (AppShell, TenantAdminShell, PlatformLayout, tenant public layout) with inconsistent coverage.

**`src/lib/slug.ts`** — single `toSlug(str)`. Previously defined as `toKey`/`toSlug` in 5+ places across server actions and client NewBlockButton components (identical logic, different names).

**`src/lib/blocks.ts`** — three exports:
- `BLOCK_TYPES` — canonical ordered list of all 9 block types (`as const`)
- `BLOCK_TYPE_LABELS` — display name mapping for all 9 types
- `BLOCK_EMPTY_CONTENT` — default JSON content per type (now includes all 9 types including new ones)

14 files updated to import from these shared modules. `npx tsc --noEmit` → clean.

---

## Build Status

- `npx tsc --noEmit` → clean
- Corveaux repo: all changes staged; committed to `master`
- Vault: session 9 note committed to `main`

---

## Starting Point for Session 10

- Dev server: `cd corveaux && npm run dev`
- Login: `demo@corveaux.app` / `demo1234`
- DB: SQLite at `prisma/dev.db`
- Platform homepage: `http://localhost:3000/`
- Platform admin: `http://localhost:3000/admin`
- Internal tenant slug: `corveaux`
- Primary site slug: `main`

**Open items to pick up:**

- **Build the corveaux.app page** — create the actual blocks (HERO, SECTION_HEADER, FEATURE_GRID, PULLQUOTE, SERVICE_GRID, LINK_GRID) in the page editor and assemble the homepage
- **Cross-column DnD** — drag blocks across column boundaries in tenant admin
- **NeonDB migration** — swap libsql for `@prisma/adapter-neon`
- **RBAC enforcement** — auth checks login only; role checks pending
- **Platform nav editor** — visual nav builder; currently navConfig is raw JSON in site settings
- **Preview in tenant admin** — `editHref` in PreviewBanner defaults to platform admin path; detect tenant context
- **Tag management UI** — create/rename/delete tags; assign from article editor
- **`middleware.ts` → `proxy.ts` rename** — Next.js 16 deprecation warning

[[Corveaux]]
[[Corveaux CMS Build - Session 8]]
