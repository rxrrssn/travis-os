# Corveaux Tenant Zero Validation

## Purpose

Validate that Corveaux can model and operate itself using the canonical institutional model.

Corveaux Must Run Corveaux.

---

# Organizations

## Office of the System

- [x] Exists as Organization entity — `organization:office-of-the-system` (seeded Session 09)
- [x] Has canonicalKey
- [x] Has platformId

## Office of the Platform

- [x] Exists as Organization entity — `organization:office-of-the-platform` (seeded Session 09)
- [x] Has canonicalKey
- [x] Has platformId

## Office of People & Culture

- [x] Exists as Organization entity — `organization:office-of-people-and-culture` (seeded Session 09)

## Office of Institutional Continuity

- [x] Exists as Organization entity — `organization:office-of-institutional-continuity` (seeded Session 09)

## Office of Intelligence

- [x] Exists as Organization entity — `organization:office-of-intelligence` (seeded Session 09)

---

# Positions

## Founder & Chief Systems Officer

- [x] Exists as Position entity — `position:founder-ceo-corveaux` (seeded Session 03, renamed Session 09)

## Platform Engineer

- [x] Exists as Position entity — `position:platform-engineer` (seeded Session 09)

## Implementation Lead

- [x] Exists as Position entity — `position:implementation-lead` (seeded Session 09)

## Institutional Analyst

- [x] Exists as Position entity — `position:institutional-analyst` (seeded Session 09)

---

# People

## Travis Hornbuckle

- [x] Exists as Person entity — `person:travis-hornbuckle` (seeded Session 03)
- [x] Has platformId — `0cf7f20c-57c6-4538-8124-4b418ccf6d35` (confirmed Session 09)
- [x] Has identity relationship — `has_identity` → `identity:travis-primary` (seeded Session 09)

---

# Identities

## Primary Identity

- [x] Exists as Identity entity — `identity:travis-primary` (seeded Session 09)
- [x] Linked to Travis — `has_identity` relationship (seeded Session 09)

## Entra Identity

- [x] Exists as Identifier — `entra_object_id` and `entra_email` persisted; `external_id` no longer pending ([[Corveaux V2 - Session 11 — Tenant Zero Auth Validation]])
- [x] Linked to Identity — identifiers attached to `identity:travis-primary` ([[Corveaux V2 - Session 11 — Tenant Zero Auth Validation]])
- [x] Resolves platform authority — `person:travis-hornbuckle` → `holds_position` → `position:founder-ceo-corveaux` with `authority_scope: "platform"` → `platform.operator` ([[Corveaux V2 - Session 11 — Tenant Zero Auth Validation]])
---

# Relationships

## Founder Relationship

- [x] Travis holds Founder & CEO — `holds_position` relationship seeded (Session 03)

## Office Assignment

- [x] Founder & Chief Systems Officer belongs to Office of the System — `part_of` relationship seeded (Session 09)

---

# Policies

## Source Precedence

- [x] Exists — seeded as `Policy(type="source_precedence")` in Session 06: catalog (1) > directory (2) > website (3), tiebreaker: confidence

## Publishing Policy

- [x] Exists — `Policy(type="publishing")` (seeded Session 09)

## Ontology Governance Policy

- [x] Exists — `Policy(type="ontology_governance")` (seeded Session 09)

---

# Content Blocks

## Organization Blocks

- [x] Office of the System block generated — `department_block:organization:office-of-the-system` (seeded Session 09, DRAFT)
- [x] Office of the Platform block generated — `department_block:organization:office-of-the-platform` (seeded Session 09, DRAFT)

## Person Block

- [x] Travis profile block generated — `contact_block:person:travis-hornbuckle` (seeded Session 09, DRAFT)

## Position Block

- [x] Founder & Chief Systems Officer block generated — `department_block:position:founder-ceo-corveaux` (seeded Session 09, DRAFT)

---

# Rendering

## Visitor Context

- [ ] Organization blocks render

## Platform Operator Context

- [ ] Governance metadata visible

---

# Provenance

## Every Generated Block

- [ ] Has dependency graph
- [ ] Has source references
- [ ] Has generation timestamp

---

# Canonical Model Validation

## Entities

- [ ] Query returns all expected entities

## Relationships

- [ ] Query returns all expected relationships

## Policies

- [ ] Query returns all expected policies

## Events

- [ ] Query returns expected events

---

# Success Criteria

Corveaux can represent:

- Its people
- Its offices
- Its positions
- Its policies
- Its identities
- Its governance structure

using only canonical primitives.

No special-case tables.

No hardcoded Corveaux logic.

No `if tenant == "corveaux"` branches.

Corveaux successfully operates as Tenant Zero.

## Related

- [[Corveaux Institution Model]]
- [[ADR-006 — Tenant Zero]]
- [[ADR-004 — Platform Tenant Architecture]]
- [[ADR-005 — Capability-Based Authority Model]]
- [[ADR-012 — Canonical Schema Architecture]]
- [[generated-tenant-spec]]
- [[Corveaux V2 - Session 03 — Canonical Schema and Tenant Zero]]
