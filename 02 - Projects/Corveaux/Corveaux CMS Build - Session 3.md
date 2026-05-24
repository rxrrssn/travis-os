---
type: session-note
domain: corveaux
status: active
date: 2026-05-24
tags:
  - cms
  - admin
  - knowledge-base
  - site-import
  - tenant-scoping
  - session-log
---

# Corveaux CMS Build - Session 3

## What Was Built

This session completed the admin CRUD layer across all four modules (Sites, Pages, Blocks, KB) and added a site scraper / URL importer. Session started mid-work continuing from a context-compacted Session 2 continuation.

---

## Shared ContentBlock Editor

### Problem
Content blocks had a list view but no edit surface. The only way to edit block content was inline from within the page editor.

### Solution
Built a standalone block editor at `/admin/blocks/[blockId]/edit/`.

**Files created:**
- `src/lib/actions/blocks.ts` — canonical shared server action: `updateBlockContent(blockId, content)`
- `src/components/admin/BlockEditForm.tsx` — shared form component used by both page editor (inline) and block editor (standalone). Type-safe using `Partial<T>` to avoid TS2783 duplicate key error.
- `src/app/admin/blocks/[blockId]/edit/actions.ts` — `updateBlockMeta(blockId, { name, status, departmentContext })`
- `src/app/admin/blocks/[blockId]/edit/BlockEditor.tsx` — two-panel layout: left = content form, right = metadata sidebar
- `src/app/admin/blocks/[blockId]/edit/page.tsx` — server component with breadcrumb

**Layout pattern:** content area (`flex-1`) + settings sidebar (`w-72 sticky top-6`)

**Updated:**
- `BlockCard.tsx` in page editor imports `BlockEditForm` from `@/components/admin/BlockEditForm` instead of the now-removed local copy

---

## Blocks List — Tenant Scoping + Edit Links

`src/app/admin/blocks/page.tsx`:
- Added tenant scoping: `const tenant = await prisma.tenant.findFirst(...)` → `where: { tenantId: tenant.id }`
- Block cards are now `<Link href="/admin/blocks/[id]/edit">` — clicking any card opens the editor

---

## Sites — Detail Page + Edit Links

### Problem
Sites could be created but there was no way to navigate to a site after creation. No edit surface existed.

### Solution

**Files created:**
- `src/app/admin/sites/[siteId]/page.tsx` — site detail page: breadcrumb, name + status badge, pages table on left, settings sidebar on right
- `src/app/admin/sites/[siteId]/SiteEditor.tsx` — client component with name, slug, status, custom domain fields + save
- `src/app/admin/sites/[siteId]/actions.ts` — `updateSite(siteId, { name, slug, status, domain })` with explicit slug uniqueness check before update

**Updated:**
- `sites/page.tsx` — site names now link to `/admin/sites/[siteId]`

### Bug fixed: silent save failures
`SiteEditor.handleSave` had no `try/catch`, so errors were silently swallowed. Added error state and display. The `updateSite` action now validates slug uniqueness with a human-readable error instead of leaking a Prisma constraint trace.

The action also normalizes slugs on save (lowercase, strip non-alphanumeric) and syncs the normalized value back to the input field.

---

## Pages List — Tenant Scoping

`src/app/admin/pages/page.tsx`:
- Added `tenant = prisma.tenant.findFirst(...)` → `where: { tenantId: tenant.id }` on the `findMany`

---

## KB List — Tenant Scoping

`src/app/admin/kb/page.tsx`:
- Articles and categories both scoped to `tenantId`
- Categories filter: `where: { type: 'KNOWLEDGE', ...(tenant ? { tenantId: tenant.id } : {}) }`

---

## KB Article Editor — Services + Related Articles

### Schema migration (applied: `20260524070924_add_kb_department_services`)
Added two fields to `KnowledgeArticle`:
```prisma
departmentContext String?
services          String    @default("[]")
```

### Prisma client
Regenerated after migration: `npx prisma generate`

### Files updated:

**`src/app/admin/kb/[articleId]/edit/actions.ts`**
`updateArticle` now handles `departmentContext` and `services` (JSON string of `[{ name, url }]`).

**`src/app/admin/kb/[articleId]/edit/ArticleEditor.tsx`**
New fields added to the editor:
- **Department** — text input in sidebar
- **Related Services** — dynamic list of name + URL pairs with Add/Remove controls. Stored as `JSON.stringify([{ name, url }])`. Empty entries are filtered out on save.
- **Related Articles panel** — read-only list at the bottom of the content area. Populated server-side by tag intersection; falls back to department match if no tags.

**`src/app/admin/kb/[articleId]/edit/page.tsx`**
Now loads `departmentContext`, `services`, `tags`, and `relatedArticles` from the server. Related articles query:
1. If article has tags → find other articles sharing at least one tag (same tenant, max 8)
2. Else if article has departmentContext → find other articles in same department (same tenant, max 8)

---

## Site Importer (Scrape from URL)

### What it does
Crawls an existing website and migrates its content into Corveaux as a new site with DRAFT pages and RICH_TEXT content blocks.

**Installed:** `node-html-parser` (lightweight, types bundled)

### Files created:
`src/app/admin/sites/scrape.ts` — `importSiteFromUrl({ name, slug, url })`

**Behavior:**
1. Fetches homepage HTML
2. Extracts site name from `<title>` or `og:title` if not provided
3. Discovers internal links (same-origin `<a href>`), skips media/asset extensions
4. Deduplicates by path, caps at 30 pages
5. For each page: fetches HTML, extracts content from `<main>` → `<article>` → `#content` → `.content` → `<body>` fallback, strips scripts/styles/nav/header/footer
6. Creates: `Site` → `Page` → `ContentBlock (RICH_TEXT)` → `PageBlock` — all in DRAFT status
7. Redirects to `/admin/sites/[siteId]` on completion

**Timeout:** 10s per page fetch (via `AbortSignal.timeout`)

### UI: `NewSiteButton.tsx`
Modal now has two tabs: **Manual** and **Import from URL**.

Import mode fields:
- Existing Site URL (required)
- Name (optional — extracted from site title if blank)
- Slug (auto-generated, manually overridable)

Import mode shows "Crawling site — this may take 15-30 seconds..." while pending.

---

## Architecture Notes

### Tenant scoping pattern
All list pages now follow this pattern:
```typescript
const tenant = await prisma.tenant.findFirst({ orderBy: { createdAt: 'asc' } })
const records = await prisma.model.findMany({
  where: tenant ? { tenantId: tenant.id } : undefined,
  ...
})
```
This is a placeholder for proper auth-based tenant resolution. When auth lands, replace `findFirst` with session-derived tenant lookup.

### Shared form component pattern
`BlockEditForm` lives at `src/components/admin/BlockEditForm.tsx` and is used from both:
- `/admin/blocks/[blockId]/edit/` (standalone editor)
- `/admin/pages/[pageId]/edit/BlockCard.tsx` (inline in page editor)

The canonical content update action is at `src/lib/actions/blocks.ts`.

---

## TypeScript Notes

- `Partial<T>` on content form initial values avoids TS2783 (duplicate keys in spread)
- `node-html-parser` ships its own `.d.ts` — no `@types/` needed

---

## What's Next (Session 4 Candidates)

- **Tenant theme system** — CSS custom properties from `Tenant.theme` JSON applied in `/t/[slug]/layout.tsx`; admin UI for editing theme colors/fonts per site
- **Auth layer** — NextAuth or Clerk; outer `package.json` has `next-auth` + `@auth/prisma-adapter` pre-identified; replace `findFirst` tenant lookups with session-derived tenant
- **Tag management** — KB articles have tags in schema but no UI to add/manage them (needed for related articles to work)
- **Category management** — No UI to create KB categories; currently seeded only
- **Switch to NeonDB** — production PostgreSQL; update `prisma.config.ts` datasource and env vars
- **Review cycle dashboard** — schema has `ReviewCycle` model; no UI yet

---

## Related

[[Corveaux]]
[[Corveaux CMS Build - Session 1]]
[[Corveaux CMS Build - Session 2]]
