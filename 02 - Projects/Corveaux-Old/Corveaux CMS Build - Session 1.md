---
type: session-note
domain: corveaux
status: complete
date: 2026-05-24
tags:
  - cms
  - knowledge-base
  - prisma
  - next-js
  - mvp
  - session-log
---

# Corveaux CMS Build - Session 1

## What Was Built

First full implementation pass on the Corveaux platform. Wedge product: Web / CMS / Knowledge Base.

### Infrastructure

- **Prisma 7.8.0** with SQLite (`@libsql/client` + `@prisma/adapter-libsql`) for local dev
- **Database file:** `prisma/dev.db` (gitignored)
- **Config:** `prisma.config.ts` -- Prisma 7 moved datasource URL out of schema into config file
- **Migrations:** `prisma/migrations/20260524060225_init`
- **Seed:** `prisma/seed.ts` -- runs with `npx prisma db seed`

### Schema (all models implemented)

- `Tenant` -- institution record with theme JSON, slug, domain
- `User` -- platform user, systemRole (SUPER_ADMIN / SUPPORT / USER)
- `TenantMember` -- join table with Role
- `Role` -- tenant-scoped RBAC roles with permissions JSON
- `Site` -- a tenant's website (tenant can have multiple sites)
- `Page` -- pages within a site, path-based routing, visibility controls
- `ContentBlock` -- canonical reusable blocks (key = canonical identifier)
- `PageBlock` -- join table placing blocks on pages with position ordering
- `KnowledgeArticle` -- KB articles with category, tags, review lifecycle
- `Category` -- hierarchical, supports PAGE and KNOWLEDGE types
- `Tag` + `ArticleTag` -- many-to-many tag system
- `ReviewCycle` -- content governance, tracks review due dates per content item

### Seed Data (demo: Corveaux University)

- Tenant: `corveaux-university`
- User: Travis Hornbuckle (SUPER_ADMIN, demo@corveaux.app)
- Roles: Tenant Admin, Content Editor, KB Manager, Viewer
- Site: Corveaux University Website (LIVE)
- Pages: Home (`/`), About (`/about`)
- Content blocks: Hero, Mission Statement (RICH_TEXT), Fall Registration Callout (CALLOUT)
- Categories: Getting Started, Enrollment & Registration, Academic Support, Financial Aid
- Tags: registration, financial-aid, advising, orientation, deadlines, student-portal
- KB Articles: Getting Started, How to Register for Classes, Financial Aid Overview, Academic Advising

### Route Structure

```
/admin                          Admin dashboard (stats + recent KB)
/admin/sites                    Site list
/admin/pages                    Page list
/admin/blocks                   Content block library (card grid)
/admin/kb                       KB management (table + category sidebar)
/t/[slug]                       Public tenant homepage (block renderer)
/t/[slug]/kb                    Public KB article list (grouped by category)
/t/[slug]/kb/[articleSlug]      Public KB article (full content + related)
```

### UI Shell

Design language: warm ivory platform (canvas `#F6F3ED`), graphite sidebar (`#2B3138`), brass/gold accents (`#B89B5E` / `#C9AE6B`). Full Tailwind v4 token system in `globals.css`.

Components:
- `AppShell` -- server component wrapper
- `Sidebar` -- client component, uses `usePathname()` for active state
- `TopBar` -- slim header with user info
- `PageContainer` -- consistent page padding
- `BlockRenderer` -- renders HERO, RICH_TEXT, CARD, CALLOUT blocks
- `StatusBadge` -- consistent status pill across admin tables

### Key Technical Decisions

- Prisma 7 removed `url` from datasource in schema.prisma -- now lives in `prisma.config.ts`
- Prisma 7's `PrismaLibSql` constructor takes config object `{ url, authToken }`, NOT a libsql client instance (breaking change from v5/v6)
- JSON fields stored as `String` in schema -- parsed in application layer
- No auth yet -- admin routes use first tenant in DB (demo mode)
- Public routes use `notFound()` for missing tenants/articles
- Next.js 16 App Router with async params (`await params` pattern)

---



---

## Related

[[Corveaux]]
[[Corveaux GTM Strategy]]
[[Corveaux Design Language]]
