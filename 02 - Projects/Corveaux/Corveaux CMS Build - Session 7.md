---
type: session-note
domain: corveaux
status: complete
date: 2026-05-27
tags:
  - cms
  - platform-site
  - preview
  - pages
  - session-log
---

# Corveaux CMS Build - Session 7

## What Was Fixed / Completed

### Stale Dev Server Issue (Session 6 Carryover)

The "unable to sign in" report was caused by a stale Node.js process (PID 21236) that had been running since 2026-05-24 before auth code was written. The server never picked up any Session 6 changes. Auth works correctly on a fresh dev server. Always kill and restart after a session with schema changes.

---

## What Was Built

### Root-Level Platform Pages ✅

The platform admin at `/admin` already managed sites/pages/blocks. The missing piece was public routes serving those pages at the root domain.

**New files:**
- `src/lib/platform-site.ts` — `getPlatformSite()` helper (returns first tenant + first site); `parseSiteNav()` parses navConfig JSON
- `src/components/platform/PlatformLayout.tsx` — server component; wraps platform public pages with header (site name + nav from navConfig) and footer
- `src/app/[...path]/page.tsx` — catch-all for nested root pages (`/about`, `/pricing`, etc.); uses PlatformLayout; 404s if no matching PUBLISHED page in DB

**Modified files:**
- `src/app/page.tsx` — now renders the platform homepage from the DB using PlatformLayout; falls back to redirect('/admin') if no published homepage

**How it works:**
- Platform site = `prisma.tenant.findFirst()` → `prisma.site.findFirst()` — same placeholder as other admin sections; will be replaced when auth/RBAC lands
- Pages are served at root URL: `/` is the homepage, `/about` is the about page, etc.
- Next.js route precedence: `/admin`, `/api`, `/login`, `/t`, `/preview` all take priority over `[...path]`

---

### Preview Before Publishing ✅

**New files:**
- `src/components/platform/PreviewBanner.tsx` — sticky graphite banner at top of preview; shows page title, status badge, "Edit page" link, close button (`window.close()`)
- `src/app/preview/[pageId]/page.tsx` — auth-gated preview route; redirects to `/login?callbackUrl=...` if not signed in; renders any page regardless of publish status; uses BlockRenderer

**Preview is available from both editors.** See below.

---

### Preview Button + Published Page Link in Editors ✅

Both the platform admin editor and tenant admin editor now have two action buttons at the top of the Page Settings sidebar:
- **Preview** — always shown; opens `/preview/[pageId]` in new tab
- **View page** — only shown when status = PUBLISHED; opens the public URL in new tab
  - Platform admin: links to `/{page.path}` (root URL)
  - Tenant admin: links to `/t/{tenantSlug}{page.path}`

**Modified files:**
- `src/app/admin/pages/[pageId]/edit/page.tsx` — computes `publicUrl = page.path`; passes to PageEditor
- `src/app/admin/pages/[pageId]/edit/PageEditor.tsx` — added `publicUrl?: string` prop; threads to PageMetaForm
- `src/app/admin/pages/[pageId]/edit/PageMetaForm.tsx` — added `publicUrl?: string` prop; Preview + View page buttons at top; imports ExternalLink from lucide-react
- `src/app/t/[slug]/admin/pages/[pageId]/edit/PageMetaForm.tsx` — computes `publicUrl = /t/${tenantSlug}${page.path}` internally; same Preview + View page buttons

---

## Build Status

- `npx tsc --noEmit` → clean
- `npm run build` → 31 routes compiled; all correct

---

## Route Map (complete)

| Route | Type | Purpose |
|---|---|---|
| `/` | Dynamic | Platform homepage (from DB) |
| `/[...path]` | Dynamic | Nested platform pages |
| `/login` | Dynamic | Auth login page |
| `/preview/[pageId]` | Dynamic | Auth-gated page preview |
| `/admin/**` | Dynamic | Platform admin (middleware protected) |
| `/t/[slug]` | Dynamic | Tenant public homepage |
| `/t/[slug]/[...path]` | Dynamic | Tenant public pages |
| `/t/[slug]/kb/**` | Dynamic | Tenant knowledge base |
| `/t/[slug]/admin/**` | Dynamic | Tenant admin (middleware protected) |
| `/api/auth/[...nextauth]` | Dynamic | NextAuth handler |

---

## Deferred to Session 8+

- **Tag management UI** — create, rename, delete tags; assign tags from article editor
- **Cross-column DnD** — drag blocks across column boundaries
- **NeonDB migration** — swap libsql for `@prisma/adapter-neon`
- **Tenant theme in admin UI** — apply tenant CSS vars to admin shell
- **Public page column layout rendering** — public pages ignore column layout; all blocks render in a single column
- **RBAC enforcement** — auth checks login state only; role/permission checks pending
- **Platform nav editor** — currently navConfig JSON edited via raw site settings; no visual nav builder
- **Preview in tenant admin** — `editHref` in PreviewBanner points to platform admin by default; should detect tenant context

---

## Starting Point for Session 8

- Dev server: `cd corveaux && npm run dev` (restart fresh if schema changed)
- Login: `demo@corveaux.app` / `demo1234`
- DB: SQLite at `prisma/dev.db`
- Platform homepage: `http://localhost:3000/` (shows seeded "Welcome to Corveaux University" hero block)
- Platform admin: `http://localhost:3000/admin`
[[Corveaux]]
[[Corveaux CMS Build - Session 6]]