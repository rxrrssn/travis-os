---
type: session-note
domain: corveaux
status: complete
date: 2026-05-24
tags:
  - cms
  - tenant-admin
  - debugging
  - prisma
  - turbopack
  - session-log
---

# Corveaux CMS Build - Session 5

## What Was Fixed

### Page Editor Runtime Error (Root Cause Identified and Resolved)

**Symptom**: `PrismaClientValidationError: Unknown argument 'column'` when navigating to `/t/[slug]/admin/pages/[pageId]/edit`.

**Root cause**: The dev server (PID 12004) had been running since before `prisma migrate dev` + `prisma generate` ran in Session 4. Node.js caches `require()` at startup — new files in `node_modules/.prisma/client/` are never picked up by a running process. The server had the old Prisma client in memory, which didn't know about the `column` field added to `PageBlock` in migration `20260524182947_add_layout_columns`.

A secondary Turbopack cache artifact also surfaced: an old compiled version of `BlockCard.tsx` that still imported the removed `moveBlock` export.

**Why TypeScript and build passed clean**: Both checks ran fresh processes that loaded the regenerated client and current source files. The stale state was only in the running dev server.

**Fix**:
- Deleted `.next/` cache directory (cleared stale Turbopack chunks)
- Killed dev server (PID 12004)
- Restarted: `npm run dev` — fresh process loads current Prisma client and compiles current source

**Lesson**: After running `prisma migrate dev` + `prisma generate`, always restart the dev server. Turbopack's HMR does not reach into `node_modules/` and does not reload server-side singleton modules like the Prisma client.

### Layout Selector — Live Update + Persistence (Fixed)

**Symptom 1**: Selecting a layout in `PageMetaForm` (1col/2col/3col radio) had no visible effect on the canvas.

**Root cause**: `PageEditor` read `page.layout` directly from the server-passed prop. `PageMetaForm` kept its own `values.layout` state but had no way to signal the parent. The two were completely disconnected.

**Fix**: Lifted layout into `PageEditor` state. Added `onLayoutChange` callback prop on `PageMetaForm`. Radio `onChange` now calls both `setValues` and `onLayoutChange?.(opt.value)`, so selecting a layout instantly updates the canvas grid without a save.

---

**Symptom 2**: After saving a new layout and navigating away and back, the editor still showed the old layout.

**Root cause**: Next.js router cache served stale server-component props even after `revalidatePath`. The server had the new value but the client used its cached render.

**Fix**: Added `router.refresh()` immediately after `updatePageMeta` succeeds in `PageMetaForm.handleSave()`. Forces the router to re-fetch fresh server component data on the current route.

**Files changed**:
- `src/app/t/[slug]/admin/pages/[pageId]/edit/PageEditor.tsx` — `layout` lifted to `useState(page.layout)`, `useEffect` sync, all canvas references use local state, `onLayoutChange={setLayout}` passed to `PageMetaForm`
- `src/app/t/[slug]/admin/pages/[pageId]/edit/PageMetaForm.tsx` — added `useRouter`, `onLayoutChange` prop, radio `onChange` calls callback, `router.refresh()` post-save

**Verified** (Playwright headless, all three claims):
1. Load → canvas shows correct saved layout ✅
2. Radio click → canvas updates immediately, no save needed ✅
3. Save + navigate away + navigate back → layout persisted ✅

## Current State

All five tenant admin modules are functional:
- `/admin` — Platform dashboard + tenant list
- `/admin/tenants` — Tenant management table
- `/admin/settings` — Platform settings (read-only MVP)
- `/t/[slug]/admin` — Tenant dashboard
- `/t/[slug]/admin/sites` — Site CRUD
- `/t/[slug]/admin/pages` — Page list + create
- `/t/[slug]/admin/pages/[pageId]/edit` — Page editor with DnD column layout, WYSIWYG, ownership ✓ FIXED
- `/t/[slug]/admin/blocks` — Block list + create
- `/t/[slug]/admin/blocks/[blockId]/edit` — Block editor with WYSIWYG + ownership
- `/t/[slug]/admin/kb` — KB article list + create
- `/t/[slug]/admin/kb/[articleId]/edit` — Article editor
- `/t/[slug]/admin/settings` — CSS theming + branding
- `/t/[slug]/(public)` — Public site with tenant CSS vars applied

