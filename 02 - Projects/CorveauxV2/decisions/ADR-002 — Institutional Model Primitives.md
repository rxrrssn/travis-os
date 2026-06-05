---
type: decision
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, architecture, data-model, primitives]
---

# ADR-002 — Institutional Model Primitives

## Decision

The canonical institutional layer is built on five primitive types: Entities, Relationships, Events, Policies, and Time. Content blocks and rendered surfaces are projections of these primitives.

## Context

Prior versions of Corveaux used a flat object store (ProgramBlock, CourseBlock, ContactBlock, etc.) as the canonical layer. This was identified as insufficient: a flat object model would require special-case logic to represent different institution types (university vs. community college vs. foundation vs. Corveaux-the-company).

The model needs to be general enough to represent any institutional entity without special casing.

## Options Considered

1. **Flat content block store** — Simple to implement, but doesn't capture relationships, temporal state, or institutional logic. Blocks would proliferate for each use case.
2. **Relational schema** — Tables for each entity type (Programs, Courses, Contacts). Better but still doesn't model time or authority emergence natively.
3. **Canonical primitives** (chosen) — Entities + Relationships + Events + Policies + Time. More complex upfront, but general enough to represent any institutional structure.
4. **Graph database** — Would model relationships well but introduces operational complexity; can be deferred until relationship queries demand it.

## Rationale

The five primitives cover the full space of what an institution is and does:

- **Entities** — things that exist: Person, Organization, Department, Office, Program, Course, Service, Policy, Committee, Position, Building, Room, Resource
- **Relationships** — how entities connect: Member Of, Reports To, Assigned To, Student Of, Advisor For, Authority Over, Responsible For
- **Events** — things that happen; immutable: Applied, Admitted, Registered, Hired, Approved, Graduated, Assigned
- **Policies** — institutional logic: Eligibility, Governance, Approval Rules, Access Rules, Authority Rules
- **Time** — every fact exists within time; the model simultaneously represents historical state, current state, and future state

Events are immutable by design. An enrollment record that is later reversed is not deleted — a reversal event is added. This preserves institutional memory.

Authority emerges from Relationships + Policies + Time rather than being directly assigned. This means the model can derive who has authority over what from the institutional structure itself.

The model must represent universities, community colleges, system offices, foundations, and Corveaux itself without special-case logic.

## Stakeholders

- Builder (Travis Hornbuckle)

## Consequences

- The initial implementation will use Postgres + JSONB for the object store, with the primitive types modeled as typed records
- Content blocks are projections of these primitives, assembled for specific rendering contexts (website, catalog, assistant, portal, search)
- The graph DB decision is deferred until relationship traversal queries become frequent enough to justify it
- Schema round-trip fidelity (catalog → primitives → catalog) is required; the field set must support catalog-quality rendering from Day 1
- Any future domain (SIS, LMS, HR, Finance) must be representable as entities, relationships, events, policies, and time — no special domains

## Related

- [[ADR-001 — Entry Wedge Selection]]
- [[ADR-003 — Content Block Architecture]]
- [[ADR-004 — Platform Tenant Architecture]]
- `Corveaux V2 - Session 01.md`
