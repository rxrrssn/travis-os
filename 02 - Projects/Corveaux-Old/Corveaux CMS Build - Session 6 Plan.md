---
type: session-plan
domain: corveaux
status: active
date: 2026-05-24
tags:
  - cms
  - tenant-admin
  - auth
  - session-plan
---

# Corveaux CMS Build - Session 6 Plan

## Context

Session 5 closed with a fully functional page editor: DnD column layouts, WYSIWYG, ownership, layout selector live update and persistence all verified. Codebase is committed and pushed to `https://github.com/rxrrssn/corveaux` (private).

All admin routes are functional but entirely unprotected. This session should close that gap and fill the most visible admin UX holes.

---

## Priority 1 — Auth (NextAuth)

The single most important unfinished piece. Every route is currently open to anyone.

- [x] Install and configure NextAuth v5 (`next-auth@beta`) with credentials provider
- [x] Add `User.passwordHash` field to Prisma schema + migration
- [x] Protect all `/admin/**` and `/t/[slug]/admin/**` routes via middleware
- [x] Create login page at `/login` — minimal, on-brand
- [x] Session-aware `AppShell` / `TenantAdminShell` (show logged-in user, sign-out)
- [x] Seed demo user with hashed password for dev login
- [x] Verify: unauthenticated requests redirect to `/login`; authenticated requests pass through

---

## Priority 2 — Tenant Creation UI

Currently tenants only exist via seed or direct DB. Platform admin has no way to create one from the UI.

- [x] Add "New Tenant" button + modal/form to `/admin/tenants`
- [x] Server action: `createTenant(slug, name, domain?)` — validates slug uniqueness
- [x] On success: redirect to new tenant's admin dashboard
- [x] Show validation errors inline (slug taken, slug format)

---

## Priority 3 — KB Category Management

The KB sidebar shows categories read-only. Editors have no way to create or rename them from the UI.

- [x] "New Category" button in KB sidebar or KB index page
- [x] Server action: `createCategory(tenantSlug, name, slug, description?)`
- [x] Inline edit / rename on existing category names (or a settings modal)
- [x] Verify: new category appears in article editor's category dropdown immediately

---



---

