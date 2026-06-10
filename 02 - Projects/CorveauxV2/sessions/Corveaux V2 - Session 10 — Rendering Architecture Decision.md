---
type: daily
date: 2026-06-06
---

# Corveaux V2 — Session 10 — Rendering Architecture Decision

## Focus

Resolved the rendering architecture as a blocking architectural decision before Day 60 implementation begins. Completed the Sessions 03–05 spec backlog. Produced ADR-015, completed generated-tenant-spec.md and role-aware-rendering-spec.md. All open spec decisions are now resolved.

## Tasks

- [x] Read generated-tenant-spec.md and role-aware-rendering-spec.md in full
- [x] Read ADR-003, ADR-008, ADR-009 for architectural context
- [x] Read content-block-schema.md for rendering context and block design decisions
- [x] Decide rendering architecture — RSC-first, middleware context injection, two route groups
- [x] Write ADR-015 — Rendering Architecture
- [x] Complete generated-tenant-spec.md — all 13 open questions answered
- [x] Complete role-aware-rendering-spec.md — all 6 open questions answered
- [x] Close demo mode question in content-block-schema.md
- [x] Update project_decisions.md — 4 new decisions recorded
- [x] Update project_stage.md
- [x] Update Corveaux V2.md — mark spec writing tasks complete

## Wins

- Sessions 03–05 spec backlog fully cleared — no open spec decisions remain before Day 60 implementation
- ADR-015 decides every sub-question across rendering implementation, routing structure, demo mode, policy layer vs rendering layer, personalization boundary, minimum viable model, governance gaps, and freshness policy shape
- The personalization / audience-aware rendering distinction is formally defined: audience-aware = same output for all people in same context (V1); personalization = per-individual, deferred to V2 after SIS integration
- Demo mode design avoids special-case infrastructure — the public `(tenant)` route IS demo mode
- Governance gaps are computed at query time, not stored — no separate gaps entity required

## Decisions

**ADR-015 — Rendering Architecture:**
- RSC-first, server-side context resolution. No client-side context switching.
- Two App Router route groups: `(tenant)` public (visitor context, no auth required, CDN-cacheable) and `(platform)` admin (administrator context, auth required, never indexed).
- Middleware injects `x-audience-context` request header from auth state. RSC reads via `next/headers`.
- Block queries filter `renderingContexts` containment server-side. `applyFieldVisibility()` applies Policy-driven field visibility before response.
- Demo mode = public `(tenant)` route. `?context=` param allows non-admin audience switching (visitor, prospective_student, current_student only).
- Audience-aware rendering (V1): same output for all people in same context. Personalization (V2): per-individual, requires SIS identity integration — deferred.
- Governance gaps: computed at query time from `ownerEntityId IS NULL`, `status IN ('DRAFT','REVIEW')`, `confidenceScore < 0.70`. Not stored in a separate table.
- Minimum viable institutional model for Day 60: all ProgramBlocks + DepartmentBlocks + CourseBlocks + search + admin gaps view.
- Block generation order: Programs → Departments → Courses → Services → Contacts → Policies.

## Blockers

None for Session 11. All architectural decisions are resolved. Implementation may begin.

## Next Session Targets (Session 11)

**Day 30 gate first:**
- Run full 132-page SLCC program extraction: `npm run trigger:catalog`
- `npm run metrics` after run — refresh economics baseline
- Manual accuracy sample: 10–20 programs against SLCC catalog ground truth
- Day 30 gate formal assessment — write `validation/day-30-gate-assessment.md`

**Then infrastructure:**
- [x] Entra ID auth end-to-end browser verification — completed in [[Corveaux V2 - Session 11 — Tenant Zero Auth Validation]]
- S3 integration for crawl storage — needed before production runs

**Then Day 60 rendering layer:**
- App Router route groups — scaffold `(tenant)` and `(platform)` in `src/app/`
- [x] Middleware extension — `x-audience-context` header injection completed in [[Corveaux V2 - Session 11 — Tenant Zero Auth Validation]]
- Block query helpers — `renderingContexts` filter + `applyFieldVisibility()`
- Program directory and detail pages — `/programs` and `/programs/[slug]`

## Related

- [[ADR-015 — Rendering Architecture]]
- [[generated-tenant-spec]]
- [[role-aware-rendering-spec]]
- [[content-block-schema]]
- [[ADR-003 — Content Block Architecture]]
- [[ADR-008 — Generated Tenant Lifecycle]]
- [[ADR-009 — Tech Stack]]
