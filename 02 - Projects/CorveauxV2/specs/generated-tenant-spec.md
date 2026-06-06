---
type: spec
domain: corveaux
status: draft
date: 2026-06-05
tags: [corveaux, generated-tenant, spec]
---
# Generated Tenant Spec

**Status:** Draft. To be written before Day 60.

## Purpose

Define exactly what a generated tenant is, what it contains, and what the Day 60 demonstration must prove.

A generated tenant is not a mockup, prototype, or throwaway artifact.

It is the institution's first production environment generated from its own institutional reality.

---

## Definition

A generated tenant is a functioning institutional environment produced from extracted and validated institutional primitives.

The generated tenant demonstrates that:

> One Reality. Many Projections.

Institutional reality is represented once in the canonical model and rendered into usable experiences.

The generated tenant is the first proof that Corveaux can model and operate a real institution.

---

## What the Generated Tenant Is

### The Mirror

Shows the institution itself, organized and navigable.

The institution should recognize itself immediately.

### A Production Candidate

Designed for survival beyond the demo.

Not disposable.

Not a one-time sales artifact.

### A Validation Environment

Demonstrates that the extraction pipeline can create useful institutional experiences from publicly available information.

### The Institution's First Corveaux Presence

The first expression of the institution running on the Corveaux platform.

---

## What the Generated Tenant Is Not

- A static website
- A marketing demo
- A mock catalog
- A throwaway proof-of-concept
- A manually authored institutional replica

The tenant must be generated from extracted institutional reality.

---

## Day 60 Demonstration Requirements

### Institution-Specific Identity

The buyer must immediately recognize the institution.

The tenant should feel like:

- SLCC
- Not a generic college
- Not a template
- Not a demo environment

### Role-Aware Rendering

Support multiple audience perspectives:

- Visitor
- Prospective Student
- Current Student
- Faculty
- Staff
- Administrator

The same institutional reality should render differently depending on audience context.

### Gaps Layer

Reveal inconsistencies between institutional sources.

Examples:

- Website vs catalog discrepancies
- Missing ownership
- Conflicting contact information
- Outdated content

All gaps must be cited.

### Ownership Map

Display:

- Content ownership
- Organizational ownership
- Stewardship responsibilities
- Governance visibility

### Institutional Search

Allow discovery of:

- Programs
- Courses
- Services
- Departments
- Contacts
- Policies

### At Least One "Wow Moment"

A capability that demonstrates institutional understanding beyond traditional CMS, catalog, or portal products.

The wow moment should emerge naturally from the institutional model.

---

## Required Tenant Capabilities

### Institutional Navigation

Navigate by:

- Program
- Department
- Service
- Policy
- Audience
- Organizational structure

### Institutional Search

Search across generated content blocks and institutional entities.

### Citations

Every displayed fact must retain source provenance.

Users should be able to determine:

- Where information originated
- When it was extracted
- Confidence level

### Freshness Visibility

Display:

- Extraction date
- Validation status
- Ownership status
- Confidence score

### Governance Visibility

Surface:

- Responsible parties
- Ownership gaps
- Review status
- Institutional stewardship

---

## Minimum Viable Content

### Academic

- Programs
- Courses
- Requirements
- Departments

### Administrative

- Services
- Offices
- Contacts
- Locations

### Governance

- Ownership metadata
- Source citations
- Confidence metadata

---

## Success Criteria

The generated tenant succeeds if:

- Institution-specific identity is obvious
- Institutional information is discoverable
- Sources remain visible
- Governance becomes visible
- Gaps become visible
- The institution feels coherent
- The buyer can imagine replacing existing systems

---

## Open Questions

### Architecture

- [ ] What is the rendering architecture?
- [ ] Next.js App Router?
- [ ] React Server Components?
- [ ] Static generation vs dynamic rendering?

### Role Awareness

- [ ] How does role-aware rendering work technically?
- [ ] Authentication?
- [ ] Context selection?
- [ ] Demo mode?

### Generation

- [ ] Which content blocks are generated first?
- [ ] Which entities are required for a viable tenant?
- [ ] What is the minimum viable institutional model?

### Validation

- [ ] What qualifies as "institution-specific"?
- [ ] How is tenant quality measured?
- [ ] What evidence proves the generated tenant is useful?

### Governance

- [ ] How are ownership assignments represented?
- [ ] How are governance gaps surfaced?
- [ ] How are stale blocks identified?

---

## Working Hypotheses

1. The generated tenant is the first tangible proof of the institutional model.
2. Buyers must recognize their institution immediately.
3. Governance visibility is as important as content visibility.
4. Institutional gaps create more value than perfect replication.
5. A generated tenant is the bridge between the entry wedge and the Institutional Operating System.

---

## Related

- [[ADR-003 — Content Block Architecture]]
- [[ADR-008 — Generated Tenant Lifecycle]]
- [[ADR-009 — Tech Stack]]
- [[content-block-schema]]
- [[role-aware-rendering-spec]]
- [[SLCC Validation Run]]