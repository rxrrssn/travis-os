---
type: decision
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, product, generated-tenant, lifecycle, adoption]
---

# ADR-008 — Generated Tenant Lifecycle

## Decision

The generated tenant is not a demo artifact. It is the institution's first production environment. It is designed for production survival from Day 1. The demo is the institution's first encounter with the platform, not a throwaway prototype.

## Context

Early planning treated the generated tenant primarily as a demonstration tool — something to show prospects before they converted to a paying subscription. This was corrected in V2 planning. A "throwaway demo" architecture leads to technical debt, a second migration, and the wrong incentive structure (optimize for wow, not for production reliability).

## Options Considered

1. **Demo-only tenant** — Generate a polished preview for sales, then rebuild when institutions convert. Creates two migrations and technical debt.
2. **Generated tenant is the production environment** (chosen) — The same generated tenant the institution sees in the demo is the environment they operate in. No rebuild required to go live.
3. **Service delivery model** — Deliver findings report only; no persistent tenant. Consulting business model. Rejected as insufficient for platform vision.

## Rationale

The intended lifecycle is:

```
Institutional Discovery
        ↓
Institutional Model
        ↓
Content Block Generation
        ↓
Generated Tenant (the mirror — institution's first encounter)
        ↓
Role-Aware Experiences (demonstrated live)
        ↓
Departmental Validation (institution claims ownership of blocks)
        ↓
Governance Activation (approval workflows, ownership assignments)
        ↓
Production Launch (sections of website go live on Corveaux)
        ↓
Full Production (all public-facing content on Corveaux)
        ↓
Legacy System Retirement
```

The generated tenant serves multiple roles simultaneously:
1. The mirror — shows the institution itself, organized
2. The sales artifact — demonstrates role-aware rendering in the demo
3. The starting point for departmental validation (Stage 2 of adoption)
4. The eventual production environment

What the generated tenant must demonstrate:
- Institution-specific content (the buyer sees themselves, not a generic university)
- Role-aware rendering (Visitor, Prospective Student, Current Student, Faculty, Staff, Administrator)
- Gaps layer (inconsistencies between catalog and web content, quantified and cited)
- Ownership map (who should own which blocks)
- At least one "wow moment" — something the institution couldn't build in 3 months on their own

## Stakeholders

- Builder (Travis Hornbuckle)

## Consequences

- The generated tenant must be built for production reliability, not just demo aesthetics
- Block editing and governance workflows must be available within the tenant (not deferred to "after conversion")
- The findings/gaps layer is embedded within the tenant as a view — not a separate PDF deliverable that replaces the tenant
- Bidirectional sync with legacy systems during transition must be architected (designed early, implemented before Stage 4 adoption)
- Day 60 test: does the generated SLCC tenant feel like SLCC? Not: does it look pretty?

## Related

- [[ADR-001 — Entry Wedge Selection]]
- [[ADR-003 — Content Block Architecture]]
- [[ADR-006 — Tenant Zero]]
- `Corveaux V2 - Session 01.md`
