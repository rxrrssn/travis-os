---
type: session
project: corveaux-v2
session: 31
date: 2026-06-10
tags: [corveaux, data-debt, admin-ia, error-handling, fact-drift, source-authority, incident, migrations]
---

# Corveaux V2 - Session 31 — Data Debt Surfaces, Admin IA, and Error Handling

## Focus

Continuation of [[Corveaux V2 - Session 30 — Compositor, Data Debt Report, and Multi-Source Architecture]]: finished the Data Debt Report's user-facing surfaces, consolidated the tenant-admin IA, hardened the app with error boundaries, and recovered from a self-inflicted staging break. All shipped to staging (prod untouched; SLCC rebuild still parked for sprint-end).

## What shipped (commits `a4bf94e` → `95f39a0`)

**Data Debt Report surfaces (ADR-026):**
- Per-source report view (`/admin/sources/[id]/data-debt`) + **institution-level aggregated** view (`/admin/tenants/[slug]/data-debt`) — merges every source's latest reconstruction snapshot, collapses the same issue across surfaces, per-source + per-type breakdown, **print/PDF** (browser print). The operation result IS the snapshot.
- **Unified Review inbox** (`/t/[slug]/admin/review`): reference bindings (accept/reject + alternates, applies a live `\block` embed) **and** content blocks needing review, in one box (Founder: "one review box" — toward ADR-024).
- **Fact-drift** surfaced from the promoter's `data_debt_drift_detected` events (the projection-source drift ADR-028 detects) as `fact_drift` items in the aggregated report.

**Multi-source / authority follow-ons:**
- **Source Authority config UI** (`/t/[slug]/admin/source-authority`) — per-entity-type roles, saved to the `source_authority` Policy; catalog defaults to authority so a fresh save can't block minting.
- **`generate_tenant` seeds a default `source_authority` Policy** from the tenant's sources (catalog→authority+completeness, others→projection).
- **ADR-027 discontinuation also archives the entity's content blocks** so a discontinued offering stops rendering as current.

**Tenant-admin IA consolidation** (Founder: "too cluttered… pieces of the same component"):
- 11 nav entries → **6** (Overview · Review · Content · Pages · Sources · Settings). Sources and Settings are **tabbed areas via route groups** (`(content)/(sources)/(settings)` — URLs unchanged); **Entities folded into Content** (Founder: barely used).
- **Sidebar now matches the tenant header** — consumes `--t-header-bg/-fg/-font-body`, so it reskins with the institution theme; platform sidebar keeps onyx. "Back to Site" anchored above the profile card.

**Error handling** (Founder: "the app needs internal error handling"):
- App-wide **error boundaries** (`error.tsx` at app/tenant/tenant-admin/platform-admin + `global-error.tsx`) via a shared `RouteError` UI — a segment crash now renders a contained message + `digest` inside the shell instead of taking down the nav.

## Incident — staging tenant-admin crash (root-caused + fixed)

The nav-consolidation deploy broke the staging tenant admin. Chased it wrong first (assumed migration lag), then tailed `app-staging` and got the real error: **`Attempted to call sourcesTabs() from the server`** — the tab-set builders lived in the `"use client"` `AdminTabs` module, so the server route-group layouts calling them threw. **Fix:** split the plain builders into a server-safe `admin-tabs.ts`; the client component stays in `AdminTabs.tsx`. (`next build` does NOT catch this client/server boundary call — it's a runtime error; the new error boundaries would have made it a 10-second diagnosis.)

Worker names: deployed staging workers use the **`-staging`** suffix (`app-staging`, `slcc-staging`), not the `-development` in the wrangler config (the render step overrides the name).

## Dev-migration gap (closed)

Discovered the dev tenant DBs were missing the **entire S29–30 migration set** — the deploy pipeline only migrates the staging/prod branches (`secrets.TENANT_DATABASE_URL_*_STAGING`), so the dev tenant DBs (the `.env` `TENANT_DATABASE_URL_*`) drift on every schema change. Applied the four migrations to the dev DBs + reconciled `_prisma_migrations`, and added **`npm run db:migrate:dev`** (`scripts/migrate-dev.mjs`) — `prisma migrate deploy` per dev tenant URL, idempotent, skips an unreachable local DB. Run it after pulling schema changes. (Note: the staging DBs already had the migrations via the pipeline; the staging crash was the code bug above, not migration lag.)

## Ops

Pruned GitHub deployments 22 → 4. Commit-history squash considered then **held** (force-push would orphan the SHAs ADR-020 promotion tracks); going forward = fewer, larger commits.

## State at close

Staging recovered and green; prod untouched; SLCC rebuild parked for sprint-end. Open business gates PINNED (Founder not ready). Remaining build (deferred, not blocking): entity **merge tooling** (dupes), Compositor **Phase 2 fidelity** (nav mirror + inline links), discontinued-entity **admin badge + point-in-time view**.

## Related

- [[Corveaux V2 - Session 30 — Compositor, Data Debt Report, and Multi-Source Architecture]]
- [[ADR-026 — Data Debt Report and Staleness Detection]]
- [[ADR-027 — Discontinued-Entity Retention]]
- [[ADR-028 — Source Roles and Authority]]
- [[Corveaux V2]]
