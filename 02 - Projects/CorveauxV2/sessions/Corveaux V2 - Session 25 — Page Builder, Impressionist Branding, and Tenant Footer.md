---
type: session
project: corveaux-v2
session: 25
date: 2026-06-10
tags: [corveaux, tenant-admin, page-builder, impressionist, branding, footer, theme-extraction]
---

# Corveaux V2 - Session 25 — Page Builder, Impressionist Branding, and Tenant Footer

## Focus

Built out the tenant-facing projection authoring and visual-identity surfaces on top
of Session 24's content-review foundation: a drag-and-drop **page builder** with page
layouts, the **Impressionist** visual-identity extractor (institution theme from a
URL/cached page), and a configurable **tenant footer** with multi-column links. Also
relocated the Corveaux wordmark off the tenant header into a "Powered by Corveaux"
footer.

All of this work — Session 24's content review/canonical editor plus Session 25's
builder/branding/footer — had accumulated uncommitted in the working tree. It went out
as a single commit at the end of this session: `0897272` *"Add tenant admin: content
review, page builder, branding, footer"* (61 files, +6794/−2490, on `master`).

## What shipped

1. **Page builder** (`/t/[tenantSlug]/admin/pages`) — new `TenantPage` model (JSON
   `sections`, `isHomePage`, `layout`), drag-and-drop section ordering via `@dnd-kit`,
   four section types (hero, rich-text, entity-list, cta-banner). `TenantBuiltPage` is
   a shared async server renderer used by both the public page route
   (`/t/[slug]/p/[slug]`) and a promoted home page. Includes home-page promotion,
   `?preview=1` draft preview, and save/publish via direct server-action calls.
2. **Page layout picker** — `left 1/3`, `right 1/3`, `2 column`, plus `header + ` each
   of those three. Stored as a `layout` string column on `TenantPage`
   (migration `20260610020000_add_tenant_page_layout`, applied to local + CORVEAUX +
   SLCC Neon). The builder shows a visual diagram picker; `TenantBuiltPage` applies the
   corresponding CSS grid to `<main>`, with the first section spanning full width on
   `header-*` layouts.
3. **Impressionist** (`src/lib/rendering/impressionist.ts`) — Claude Haiku reads HTML
   (from the R2 crawl cache or a directly-supplied URL) and extracts colors, fonts,
   border radius, and **layout signals** (content max-width, utility bar, header
   height) into `themeConfig`. `buildThemeCss` emits a `<style>` scoped to
   `.tenant-shell` (Google Fonts `@import` + custom properties), so an institution's
   site reads as a copy of the source without affecting platform admin chrome.
4. **Brand & Identity admin** (`/t/[slug]/admin/brand`) — institution identity form,
   `ThemeEditor` client component (color pickers + hex inputs), logo/favicon upload to
   the tenant R2 media bucket (`media/brand/`), Impressionist extract-from-URL,
   Reset Theme, and the footer editor.
5. **Tenant footer** — Corveaux wordmark removed from the header brand; footer renders
   institution name, tagline, link columns, official-site link, and "Powered by
   Corveaux". Footer is configurable: tagline, a **1/2/3 column** selector, and per-
   column heading + `Label|URL` link lists (`footerColN*` fields in `brandConfig`).
   Public footer renders the chosen column count via a CSS grid that collapses to one
   column under 700px.

## Bugs fixed

- **`/t/[slug]/admin/brand` 500 — stale platform Prisma client.** `getTenantWithBrand`
  selects `themeConfig` from the platform `Tenant` model. The field is in the schema
  and the DB (`add_tenant_theme_config` migration applied), but the **generated
  platform client** predated the field, so Prisma threw `PrismaClientValidationError:
  Unknown field themeConfig`. `tsc` and `next build` both passed because neither
  validates runtime Prisma queries against the generated client's field set. Fix:
  `npx prisma generate --schema prisma/platform.schema.prisma` (I had only regenerated
  the *tenant* client earlier), then a full dev-server restart — Next's webpack cache
  pins the old compiled client and HMR won't reload a generated client. This is the
  same stale-client failure mode noted earlier in the codebase; the lesson is **regen
  every client whose schema changed, not just the one you were working in**.
- **`/t/[slug]/admin/brand` + `/admin/pages` 500 — server-component event handlers.**
  Destructive buttons used inline `onClick={() => confirm(...)}` inside server
  components ("Event handlers cannot be passed to Client Component props"). Extracted
  `src/components/admin/ConfirmButton.tsx` (`"use client"`) and swapped both call
  sites.
- **Invalid nested `<form>`.** The logo/favicon upload forms were nested inside the
  outer identity `<form>`. Split brand assets into their own panel with standalone
  upload forms; identity form now carries plain logo/favicon URL text inputs.

## Notes / gotchas

- `tsc --noEmit` clean is necessary but **not sufficient** here — the two highest-
  impact runtime errors this session (stale Prisma client, server-component handlers)
  both passed type-check and build. Verifying meant reading the actual dev-server log
  and watching for `GET ... 200` after recompile.
- `updateBrandConfigAction` and `updateFooterConfigAction` now **merge** into the
  existing `brandConfig` rather than overwriting, so saving identity doesn't wipe
  footer fields and vice-versa.
- Tenant audit delivery (`writeRemoteTenantAuditEvent`) fails locally because the
  tenant Worker audit endpoint isn't running — `safeAudit` swallows it, POSTs return
  200. Expected in local dev; not a blocker.

## State at close

- Commit `0897272` on `master` (not pushed — push when ready).
- Migrations applied to all three tenant DBs (local, CORVEAUX, SLCC) + platform Neon.
- Footer multi-column (1/2/3) editor + renderer landed after the commit; tsc clean,
  uncommitted — fold into the next commit.

## Related

- [[Corveaux V2 - Session 24 — Tenant Content Review and Canonical Editor]]
- [[Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan]]
- [[Corveaux V2]]
