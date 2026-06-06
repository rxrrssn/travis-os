# Corveaux Tenant Zero Validation

## Purpose

Validate that Corveaux can model and operate itself using the canonical institutional model.

Corveaux Must Run Corveaux.

---

# Organizations

## Office of the System

- [ ] Exists as Organization entity
- [ ] Has canonicalKey
- [ ] Has platformId

## Office of the Platform

- [ ] Exists as Organization entity
- [ ] Has canonicalKey
- [ ] Has platformId

## Office of People & Culture

- [ ] Exists as Organization entity

## Office of Institutional Continuity

- [ ] Exists as Organization entity

## Office of Intelligence

- [ ] Exists as Organization entity

---

# Positions

## Founder & CEO

- [x] Exists as Position entity — `position:founder-ceo-corveaux` (seeded Session 03)

## Platform Engineer

- [ ] Exists as Position entity

## Implementation Lead

- [ ] Exists as Position entity

## Institutional Analyst

- [ ] Exists as Position entity

---

# People

## Travis Hornbuckle

- [x] Exists as Person entity — `person:travis-hornbuckle` (seeded Session 03)
- [ ] Has platformId
- [ ] Has identity relationship

---

# Identities

## Primary Identity

- [ ] Exists as Identity entity
- [ ] Linked to Travis

## Entra Identity

- [ ] Exists as Identifier
- [ ] Linked to Identity

---

# Relationships

## Founder Relationship

- [x] Travis holds Founder & CEO — `holds_position` relationship seeded (Session 03)

## Office Assignment

- [ ] Founder & CEO belongs to Office of the System — Office of the System not yet seeded

---

# Policies

## Source Precedence

- [x] Exists — seeded as `Policy(type="source_precedence")` in Session 06: catalog (1) > directory (2) > website (3), tiebreaker: confidence

## Publishing Policy

- [ ] Exists

## Ontology Governance Policy

- [ ] Exists

---

# Content Blocks

## Organization Blocks

- [ ] Office of the System block generated
- [ ] Office of the Platform block generated

## Person Block

- [ ] Travis profile block generated

## Position Block

- [ ] Founder & CEO block generated

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
