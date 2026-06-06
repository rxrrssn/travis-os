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

**Platform stack (decided 2026-06-05, see [[ADR-009 — Tech Stack]]):**

| Layer | Choice |
|---|---|
| Language | TypeScript |
| Frontend | Next.js + React |
| Backend | Next.js API routes |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | Microsoft Entra ID + local recovery auth |
| Background Jobs | Trigger.dev (see [[ADR-011 — Background Job Platform]]) |
| AI | Anthropic behind provider interface |
| Search | PostgreSQL FTS |
| Storage | S3-compatible |
| Observability | OpenTelemetry + Sentry |
| Infrastructure | Docker + Coolify |

**Tenant isolation:** Database-per-tenant or schema-per-tenant. Shared-schema with RLS is rejected for production. See [[ADR-010 — Tenant Isolation Architecture]].

**Related vault notes:**
- [[Corveaux]] — full product history and development log

## Current State

**Stage:** Implementation in progress. Canonical layer complete. Extraction pipeline next.

**What exists:**
- Next.js project (TypeScript, App Router, PostgreSQL, Prisma)
- Two-schema architecture: platform DB (`tenants`) + tenant DB (10 canonical tables)
- Canonical primitives: Entity, EntityIdentifier, Relationship, InstitutionalEvent, Policy
- Pipeline models: ExtractionRun, ExtractionObservation (with GIN-indexed dependency JSONB)
- ContentBlock projection model with full dependency graph and GIN indexes
- Four institutional services: EntityService, RelationshipService, EventService, PolicyService
- TypeScript type registry: EntityTypes, RelationshipTypes, EventTypes, BlockTypes, RenderingContexts
- Zod schemas for all 8 content block types
- Tenant Zero seeded: Corveaux org, Travis person, Founder & CEO position, 2 relationships, ontology config
- ADR-001 through ADR-013
- Specs: extraction-pipeline-spec, content-block-schema (both complete and active)
- Specs: generated-tenant-spec, role-aware-rendering-spec (scaffolds, to be written before Day 60)

**What does not exist yet:**
- Extraction pipeline implementation (Trigger.dev, Crawlee, Claude extractor, promotion engine)
- Auth layer (Entra ID)
- Content block generator / regeneration engine
- Role-aware rendering
- Generated tenant
- Search layer

## Institutional Model Primitives

The canonical layer is built on five primitive types:

- **Entities** — Person, Organization, Program, Course, Service, Policy, Position, Building, Room, Resource
- **Relationships** — Member Of, Reports To, Assigned To, Student Of, Advisor For, Authority Over, Responsible For
- **Events** — Applied, Admitted, Registered, Hired, Approved, Graduated, Assigned (immutable)
- **Policies** — Eligibility, Governance, Approval Rules, Access Rules, Authority Rules
- **Time** — Every fact exists within time. Historical, current, and future state simultaneously.

One canonical instance per concept. One Person. One Course. One Department. One Policy. Everything else is a reference or a projection.

Content blocks are projections of these primitives. Content blocks are not canonical.

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
- Expansion path is clear: Knowledge Layer -> Governance -> Identity -> Workflow -> Operational -> IOS

## Decisions

See decisions/ folder for full ADRs (ADR-001 through ADR-013).

Key decisions:
- Entry wedge: Web + Catalog + Directory (unified extraction sources)
- Institutional model: canonical primitives, not flat object store
- Content blocks: projections of canonical primitives, not canonical themselves
- Tenant architecture: Platform Layer / Institutional Layer separation
- Tenant isolation: database-per-tenant or schema-per-tenant (see [[ADR-010 — Tenant Isolation Architecture]])
- Authority model: capability-based, no tenant-type checks
- Tenant Zero: Corveaux Must Run Corveaux
- LLM: implementation detail, not product headline
- Generated tenant: production survival from day one, not disposable
- Tech stack: TypeScript, Next.js, PostgreSQL, Prisma, Entra ID, Trigger.dev, Docker + Coolify
- Canonical schema: one master schema, no `tenant_id`, three identifier layers (see [[ADR-012 — Canonical Schema Architecture]])
- Type registry: TypeScript constants are authoritative, DB metadata deferred to V3 (see [[ADR-013 — Canonical Type Registry]])

## Next Actions

**Day 30 (~2026-07-05)**
- [ ] Implement extraction pipeline: Trigger.dev setup, Crawlee crawler, Claude extractor, ExtractionObservation writer
- [ ] Implement promotion engine: source precedence Policy, temporal canonical updates, conflict detection
- [ ] Implement content block generator: assemble blocks from current canonical state per block type
- [ ] Implement auth layer (Entra ID)
- [ ] Run extraction pipeline against SLCC
- [ ] Pass accuracy gate (>90% material facts) — see [[SLCC Validation Run]]

**Day 60 (~2026-08-05)**
- [ ] Write generated-tenant-spec and role-aware-rendering-spec
- [ ] Build generated tenant with role-aware rendering
- [ ] Corveaux website running on Corveaux
- [ ] Catalog round-trip validation
- [ ] First external buyer conversation

**Day 90 (~2026-09-05)**
- [ ] Demo-quality platform
- [ ] Go/No-Go decision

## Related Notes

- [[Corveaux]] — V1 development history, prior sessions
- [[SLCC Overview]] — Control case institution
- [[Contact Center]] — Institutional complexity the product is designed to solve
- [[Corveaux V2 - Session 01]] — Initial architecture planning session
- [[Corveaux V2 - Session 02 — Tech Stack and Vault Infrastructure]] — Tech stack, vault infrastructure, architectural doctrine
