---
type: project
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, platform, institutional-os, v2]
---

# Corveaux V2

## Objective

Build Corveaux as an Institutional Operating System. Model the institution directly. Render it as role-aware experiences across every surface. Become the primary institutional operating environment over time.

One Reality. Many Projections.

## Stakeholders

- Travis Hornbuckle — Founder, builder, Tenant Zero operator
- SLCC — Control case institution (ground truth known)
- Higher-ed institutions — Target market (community colleges, regional universities, R1s, system offices)

## Systems

**Platform stack (to be decided by Day 30):**
- Crawler: Crawl4AI or Firecrawl (evaluate against SLCC)
- Storage: Postgres + JSONB (tenant-namespaced)
- LLM: claude-sonnet-4-6 (extraction), claude-opus-4-8 (synthesis)
- Framework: TBD

**Related vault notes:**
- [[CLAUDE.md]] — root vault context
- [[Corveaux]] — full product history and development log

## Current State

**Stage:** Pre-implementation. Strategic planning complete (V4 approved 2026-06-05).

**What exists:**
- V4 strategic plan (approved)
- Claude project memory (5 files)
- CLAUDE.md in codebase
- Vault project structure (this document)

**What does not exist yet:**
- Code
- Extraction pipeline
- Institutional object store
- Generated tenant

## Institutional Model Primitives

The canonical layer is built on five primitive types:

- **Entities** — Person, Organization, Program, Course, Service, Policy, Position, Building, Room, Resource
- **Relationships** — Member Of, Reports To, Assigned To, Student Of, Advisor For, Authority Over, Responsible For
- **Events** — Applied, Admitted, Registered, Hired, Approved, Graduated, Assigned (immutable)
- **Policies** — Eligibility, Governance, Approval Rules, Access Rules, Authority Rules
- **Time** — Every fact exists within time. Historical, current, and future state simultaneously.

Content blocks are projections of these primitives, not the canonical layer.

## Risks

1. **Accuracy/Hallucination** — Existential. Every extracted fact requires a source citation. No citation = no fact.
2. **Object model scope creep** — The schema must serve the 90-day goal, not the 3-year vision.
3. **Input data quality variance** — Not all institutions have clean websites. Pre-score before running.
4. **Catalog parsing complexity** — Formats vary (Acalog HTML, PDF, custom). Build adapters for top 2-3.
5. **Bidirectional sync during transition** — Design architecture early, defer full implementation.
6. **Curriculum workflow gaps** — Displacing Acalog requires Faculty Senate-grade governance. Year 2+.

## Opportunities

- No existing platform does cross-silo institutional knowledge synthesis
- Founder-market fit: builder lives the problem at SLCC
- Corveaux-as-Tenant-Zero is a compelling live demo from day one
- Web + Catalog + Directory wedge is low-risk and high-visibility
- Staged adoption model reduces procurement friction
- Expansion path is clear: Knowledge Layer → Governance → Identity → Workflow → Operational → IOS

## Decisions

See `decisions/` folder for full ADRs.

Key decisions made 2026-06-05:
- Entry wedge: Web + Catalog + Directory (unified extraction sources)
- Institutional model: canonical primitives, not flat object store
- Content blocks: blocks are canonical, pages are not
- Tenant architecture: Platform Layer / Institutional Layer separation
- Authority model: capability-based, no tenant-type checks
- Tenant Zero: Corveaux Must Run Corveaux
- LLM: implementation detail, not product headline
- Generated tenant: production survival from day one, not disposable

## Next Actions

- [ ] Decide tech stack (language, framework, crawler) — Day 15
- [ ] Implement institutional model v1 and content block schema v1 — Day 30
- [ ] Run extraction pipeline against SLCC — Day 30
- [ ] Pass accuracy gate (>90% material facts) — Day 30
- [ ] Initialize Corveaux as Tenant Zero — Day 30
- [ ] Build generated tenant with role-aware rendering — Day 60
- [ ] Corveaux website running on Corveaux — Day 60
- [ ] Catalog round-trip validation — Day 60
- [ ] First external buyer conversation — Day 60
- [ ] Demo-quality platform — Day 90
- [ ] Go/No-Go decision — Day 90

## Related Notes

- [[Corveaux]] — V1 development history, prior sessions
- [[SLCC Overview]] — Control case institution
- [[Contact Center]] — Institutional complexity the product is designed to solve
- `sessions/Corveaux V2 - Session 01.md` — Initial architecture planning session
- `decisions/` — All ADRs
