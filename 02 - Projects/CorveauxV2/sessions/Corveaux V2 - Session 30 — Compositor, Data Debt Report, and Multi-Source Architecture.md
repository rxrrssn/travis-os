---
type: session
project: corveaux-v2
session: 30
date: 2026-06-10
tags: [corveaux, compositor, page-reconstruction, data-debt, staleness, source-authority, discontinuation, adr-023, adr-026, adr-027, adr-028]
---

# Corveaux V2 - Session 30 — Compositor, Data Debt Report, and Multi-Source Architecture

## Focus

Built [[ADR-023 — Page Reconstruction and Single-Source Page Binding]] Phase 1 — the **Compositor** module that turns a scanned *site* into assembled *pages* whose every fact is a live binding to a canonical entity — and, as a byproduct, the **Data Debt Report** ([[ADR-026 — Data Debt Report and Staleness Detection]]). The work surfaced the real multi-source architecture, captured as two further ADRs. Closed with a clean catalog-attribute fix the Founder requested, then committed + pushed to staging. The full SLCC rebuild RUN is held for sprint-end (Founder's call).

## The arc (Founder-driven, with three corrections)

1. **Block-attribute fix** — generated blocks lacked the fields the visibility policy targets. Root cause (verified against staging): the entities are fine; the gap is catalog-context fields (`catalogYear`/`status`) the catalog never restates per course. Resolution: **catalog-membership-as-citation** — presence in the current published catalog cites `status:active` + the edition's `catalogYear`. Built as deterministic stamping (`catoid=28` = the **2026-2027** edition).
2. **Compositor build** — capture → bind (URL-match) → resolve (fuzzy) → reconstruct (two-phase) → page.reconstruct operation.
3. **Live data reality (the demo gold):** `slcc.edu` deep-links **85× `catoid=17` / 3× `catoid=14` / 0× current `catoid=28`** and promotes **7+ discontinued programs** (Accounting, Business Administration, Commercial Baking…), verified absent from the live catalog. The institution's own site serves stale, differently-named facts — exactly what Corveaux fixes. Forced the **fuzzy resolver** (naming taxonomies differ: "Architecture (AS)" vs "Architecture: AS").
4. **Founder idea → Data Debt Report:** document staleness during scans as a cited, exportable audit. The discovery-wedge deliverable.
5. **Correction 1 — "does it match the primitives?"** The bespoke `StalenessFinding` table violated [[ADR-002 — Institutional Model Primitives]]. Rewrote ADR-026: findings = `ExtractionObservation(conflict)`; report = a **projection**; history = snapshot artifacts; no new primitive.
6. **Correction 2 — discontinuation modeling.** "Discontinued" was implicit (absence). Gave it [[ADR-027 — Discontinued-Entity Retention]]: retain as effective-dated entity (`effectiveTo`) + discontinuation Event, completeness-gated.
7. **Correction 3 — multi-source collisions.** The Founder asked how conflicts are detected across `catalog/slcc/i.slcc/support`. Convergence is by `canonicalKey`; the real risk is *non-convergence* (different naming → duplicate entities). Resolved with [[ADR-028 — Source Roles and Authority]]: each source has a role *per entity type* — **authority** (mints) vs **projection** (binds, never mints, deltas = Data Debt). A `source_authority` Policy, default projection.

## Built (commit `a4bf94e`, pushed to staging)

- **Compositor engine** (`src/lib/compositor`): pure `capture / bind / resolve / bind-pass / reconstruct / data-debt-report`; two-phase (shells then bind) per [[ADR-016 — Topological Extraction Order and Content Quality Pipeline]] ordering — the Founder's order-of-operations concern made structural.
- **`page.reconstruct` operation**: contract, dispatch (sources crawled pages), two-phase R2-backed worker orchestrator, handler.
- **Source authority** (`source-authority.ts` resolver) + **role-aware promoter** (projection sources never mint — drift/dangling become `data_debt_drift_detected` Events; zero-regression guard) + **`reconcileRunDiscontinuations`** (ADR-027, completeness-gated, safe by default).
- **Catalog-context stamping** in the interpreter (threaded `catalogYear` through manifest → page message → dispatch from `TenantSource` metadata).
- **Data Debt Report surfaces**: per-source view (`/admin/sources/[id]/data-debt`) + **institution-level aggregated** view (`/admin/tenants/[slug]/data-debt` — Founder request: merge all sources, collapse cross-surface issues, per-source breakdown), print/PDF; **interactive binding-review queue** (`/t/[slug]/admin/binding-review`, accept/reject + alternates); **source authority config UI** (`/t/[slug]/admin/source-authority`).
- **Migrations** (additive): `TenantPage` provenance (`source_url`/`captured_at`/`origin`) + `pending_bindings`.

`root tsc`, `cf:typecheck`, `lint`, `next build` green throughout. 34 files, +2733.

## State at close

- **Code committed + pushed** (`b6da570..a4bf94e`) → staging deploy. **Prod untouched.**
- **SLCC rebuild RUN held for sprint-end** (Founder). Everything is inert until configured: no `source_authority` Policy → legacy mint (no regression); stamping/discontinuation only act on the rebuild's authoritative-complete run. Activation steps live in the `project_slcc_rebuild` memory.
- **Deferred:** report-snapshot → automated PDF (manual print works); interactive review queue's deeper integration with the content-review queue ([[ADR-024]], unbuilt); ADR-028 §contributor role; per-attribute authority.

## Related

- [[ADR-023 — Page Reconstruction and Single-Source Page Binding]]
- [[ADR-026 — Data Debt Report and Staleness Detection]]
- [[ADR-027 — Discontinued-Entity Retention]]
- [[ADR-028 — Source Roles and Authority]]
- [[ADR-025 — Push Companion App and Event-to-Device Projection]]
- [[Corveaux V2 - Session 29 — Entitlement Model (ADR-022 Phase 1)]]
- [[Corveaux V2]]
