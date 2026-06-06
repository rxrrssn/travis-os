---
type: session-note
domain: corveaux
status: complete
date: 2026-05-27
tags:
  - cms
  - auth
  - nextauth
  - tenant-admin
  - kb
  - session-log
---

# Corveaux CMS Build - Session 6

## What Was Built

### Priority 1 — Auth (NextAuth v5 beta) ✅

All admin routes are now protected. Unauthenticated requests to `/admin/**` and `/t/[slug]/admin/**` redirect to `/login`.

**New files:**
- `src/auth.config.ts` — Edge-safe NextAuth config (no bcrypt/Prisma; JWT + authorized callback)
- `src/auth.ts` — Full config with Credentials provider; imports bcrypt and Prisma; exports `handlers`, `auth`, `signIn`, `signOut`
- `src/middleware.ts` — Uses `NextAuth(authConfig).auth` as middleware; matcher scoped to admin routes only
- `src/app/api/auth/[...nextauth]/route.ts` — NextAuth route handler
- `src/app/login/page.tsx` — On-brand login page (warm ivory, centered, graphite card)
- `src/app/login/LoginForm.tsx` — Client form using `useActionState`; shows inline error on bad credentials
- `src/app/login/actions.ts` — Server action `loginAction`; catches `AuthError` and returns `{ error }` to client; re-throws redirects
- `src/lib/actions/auth.ts` — `signOutAction` server action; calls `signOut({ redirectTo: '/login' })`
- `src/components/shell/SignOutButton.tsx` — Client form component that calls `signOutAction`
- `src/types/next-auth.d.ts` — Module augmentation for `User`, `Session`, `JWT` to include `id` and `systemRole`

**Modified files:**
- `prisma/schema.prisma` — Added `passwordHash String?` to `User` model
- `prisma/seed.ts` — Seeds `demo@corveaux.app` with `bcrypt.hash('demo1234', 12)`
- `corveaux/.env` — Added `AUTH_SECRET` (dev-only; rotate in production)
- `src/app/admin/layout.tsx` — Calls `auth()` server-side; passes real session user to `AppShell`
- `src/app/t/[slug]/admin/layout.tsx` — Calls `auth()` server-side; passes real session user to `TenantAdminShell`
- `src/components/shell/TenantAdminShell.tsx` — Added `user` prop; removed hardcoded name
- `src/components/shell/TopBar.tsx` — Added `SignOutButton` import and render

**Dev credentials:** `demo@corveaux.app` / `demo1234`

**Prisma migration run:** `20260527153327_add_user_password_hash`

**NextAuth split-config pattern (important):**
The middleware cannot import bcrypt or Prisma (Edge runtime). Solution is to split auth into two files:
- `auth.config.ts` — Edge-safe; only JWT/session callbacks and pages config; no providers
- `auth.ts` — Node.js only; imports bcrypt and Prisma; adds Credentials provider; spreads authConfig

The middleware imports from `auth.config.ts` only. The full `auth.ts` is used in server components and server actions.

**Next.js 16 deprecation note:** `middleware.ts` is deprecated in favor of `proxy.ts`. The build warns but the middleware still functions correctly. NextAuth v5 hasn't updated their convention yet — leave as `middleware.ts` until NextAuth has official `proxy.ts` guidance.

---

### Priority 2 — Tenant Creation UI ✅

**New files:**
- `src/app/admin/tenants/NewTenantButton.tsx` — Client modal with name, slug (auto-generated from name, editable), and optional domain fields; slug format validated client-side; errors shown inline
- `src/app/admin/tenants/actions.ts` — `createTenant()` server action; validates slug format and uniqueness; redirects to new tenant's admin on success

**Modified:**
- `src/app/admin/tenants/page.tsx` — Added `NewTenantButton` to page header

---

### Priority 3 — KB Category Management ✅

**New files:**
- `src/app/admin/kb/NewCategoryButton.tsx` — Client modal below category list; name/slug/description fields; slug auto-generated from name; duplicate slug check

**Modified:**
- `src/app/admin/kb/actions.ts` — Added `createCategory()` server action; calls `revalidatePath('/admin/kb')` so the category list and article dropdown update immediately
- `src/app/admin/kb/page.tsx` — Added `NewCategoryButton` below category list

---

## Build Status

- `npx tsc --noEmit` → clean
- `npm run build` → all 29 routes compiled; middleware active

---


[[Corveaux]]
[[Corveaux CMS Build - Session 6 Plan]]
[[Corveaux CMS Build - Session 5]]