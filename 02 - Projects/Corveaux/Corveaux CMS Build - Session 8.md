---
type: session-note
domain: corveaux
status: complete
date: 2026-05-27
tags:
  - cms
  - architecture
  - tenant-model
  - refactor
  - session-log
---

# Corveaux CMS Build - Session 8

## What Was Built

### Platform Site Architecture Refactor ✅

**Motivation:** The previous "platform site" concept used `findFirst` heuristics (oldest tenant, oldest site) with no semantic distinction between Corveaux LLC itself and customer tenants. This created ambiguity and would break as more tenants were added.

**Design principle:** The public Corveaux website dogfoods the same system customers use. One CMS, one page model, one block renderer, one publish workflow, one routing system. Corveaux LLC is just a tenant — the INTERNAL tenant.

---

### Schema Changes

**`prisma/schema.prisma`:**
- Added `tenantType String @default("CUSTOMER")` to Tenant model
  - Valid values: `INTERNAL`, `CUSTOMER`, `DEMO`, `TEST`, `SYSTEM`
  - SQLite has no native enum support in Prisma, so String is used — consistent with `status`, `systemRole`, etc.
- Added `isPrimary Boolean @default(false)` to Site model
  - Allows explicit primary site selection per tenant without relying on creation order

**Migration:** `20260527164716_add_tenant_type_and_primary_site`

---

### Seed Updates

**`prisma/seed.ts`:**
- Tenant upsert: `update: { tenantType: 'INTERNAL' }`, `create: { ..., tenantType: 'INTERNAL' }`
- Site upsert: `update: { isPrimary: true }`, `create: { ..., isPrimary: true }`
- Both `update` fields now apply the values on reseed so existing records stay in sync

---

### New Helper Library

**`src/lib/tenant.ts`** (replaces `src/lib/platform-site.ts`):

```ts
getInternalTenant()
// prisma.tenant.findFirst({ where: { tenantType: 'INTERNAL' }, orderBy: { createdAt: 'asc' } })

getPrimarySiteForTenant(tenantId)
// finds isPrimary: true site; falls back to first by createdAt if none flagged

getInternalPrimarySite()
// combines above; returns { tenant, site } | null

parseSiteNav(navConfig)
// unchanged: parses navConfig JSON → { label, href }[]
```

**Deleted:** `src/lib/platform-site.ts`

---

### Consuming Code Updates

- `src/app/page.tsx` — `getPlatformSite` → `getInternalPrimarySite`, import from `@/lib/tenant`
- `src/app/[...path]/page.tsx` — same
- `src/app/admin/layout.tsx` — `prisma.tenant.findFirst()` → `getInternalTenant()` from `@/lib/tenant`; removed direct `prisma` import

---

## Build Status

- `npx tsc --noEmit` → clean
- `npm run build` → 31 routes compiled; all correct
- No regressions: `/`, `/[...path]`, `/admin/**`, `/preview/[pageId]`, `/t/[slug]/**` all pass

---

## Route Map (complete, unchanged from Session 7)

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

## Deferred to Session 9+

- **Tag management UI** — create, rename, delete tags; assign tags from article editor
- **Cross-column DnD** — drag blocks across column boundaries
- **NeonDB migration** — swap libsql for `@prisma/adapter-neon`
- **Tenant theme in admin UI** — apply tenant CSS vars to admin shell
- **Public page column layout rendering** — public pages ignore column layout; all blocks render in a single column
- **RBAC enforcement** — auth checks login state only; role/permission checks pending
- **Platform nav editor** — currently navConfig JSON edited via raw site settings; no visual nav builder
- **Preview in tenant admin** — `editHref` in PreviewBanner points to platform admin by default; should detect tenant context
- **`middleware.ts` → `proxy.ts` rename** — Next.js 16 deprecation warning; low priority

---

## Starting Point for Session 9

- Dev server: `cd corveaux && npm run dev` (restart fresh if schema changed)
- Login: `demo@corveaux.app` / `demo1234`
- DB: SQLite at `prisma/dev.db`
- Platform homepage: `http://localhost:3000/`
- Platform admin: `http://localhost:3000/admin`
- Internal tenant: `tenantType = 'INTERNAL'`, slug `corveaux-university`
- Primary site: `isPrimary = true`, slug `main`

[[Corveaux]]
[[Corveaux CMS Build - Session 7]]