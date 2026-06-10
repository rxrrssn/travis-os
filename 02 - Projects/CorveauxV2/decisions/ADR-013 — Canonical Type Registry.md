---
type: decision
domain: data-architecture
status: active
date: 2026-06-05
tags: [ontology, types, governance, canonical]
---

# ADR-013 — Canonical Type Registry

## Decision

The canonical schema uses open string types for `entity_type`, `relationship_type`, `event_type`, `policy_type`, and `identifier_type`. The V2 registry is TypeScript constants in `src/types/institutional.ts`. No DB metadata table in V2.

**Governance rule:** Corveaux owns canonical meaning. Institutions own presentation.

The type key defines WHAT something IS. The display label is HOW AN INSTITUTION CALLS IT.

| Layer | Owner | Form |
|---|---|---|
| Canonical type key (`"person"`) | Corveaux | TypeScript constant |
| Presentation label (`"Student"`) | Institution | `TenantOntologyEntityType` |
| Extension attributes | Corveaux | TypeScript type definitions |
| Field-level customization | Institution | `TenantOntologyField` |

## Context

Open strings without governance create ontology drift. `"student"`, `"Student"`, `"students"`, `"learner"`, `"Learner"` may independently emerge across extraction runs, all representing person-in-academic-context. Cross-tenant analytics break when the same concept carries different type keys.

The platform vision requires a coherent canonical ontology. Drift defeats the institutional operating system.

Two registries are most critical in V2:
1. Entity types — highest drift risk. Synonyms proliferate.
2. Relationship types — high drift risk. `"reports_to"`, `"managed_by"`, `"supervised_by"` could represent the same edge.

Event types deferred (machine-generated events drift less). Policy and identifier types are institution-specific by design.

## Options Considered

**Registry location:**
- Option A: TypeScript constants only. Low cost, compile-time enforcement, no runtime queries. V2 choice.
- Option B: DB metadata table only. Runtime introspection, admin UI. V3 addition.
- Option C: TypeScript + DB mirror. TypeScript authoritative, DB adds description/category/deprecation for admin UI. V3 addition when building admin UI.

**Governance model:**
- Option A: Open — institutions can define their own canonical types. Rejected. Defeats cross-tenant analytics. The platform becomes a collection of isolated ontology islands.
- Option B: Corveaux-governed — new types require ADR. Accepted. Prevents fragmentation. Institutions use display labels for terminology customization.

## Rationale

TypeScript constants cost nothing and provide compile-time enforcement. The lint rule (`no raw string literals where EntityTypes.X exists`) catches drift at the application layer.

The DB metadata table adds value when building the admin UI (show which types are registered vs. unregistered) and for analytics. It is not needed for V2 core functionality.

Vendor displacement depends on a coherent canonical ontology. Without it, each institution's extraction produces isolated, incompatible islands. With it, every extraction maps to a shared layer and cross-tenant analytics work.

The test for a new canonical type:
> "Would swapping the label change what institutional operations you can perform with this entity?"

If swapping "Student" â†’ "Person" changes nothing operationally, they are the same canonical type. If swapping "Housing Unit" â†’ "Organization" would break institutional logic, they are distinct types.

## Stakeholders

Travis Hornbuckle (Founder & CEO) — approved in Session 03

## Consequences

- All application code uses `EntityTypes.PERSON` constants, never raw `"person"` strings
- New canonical types require an ADR — governance prevents fragmentation
- Existing institutions can label any canonical type with any display name they choose
- Tenant-local canonical extensions are not permitted — institutions petition Corveaux
- V3 will add `canonical_type_definitions` table for admin UI and analytics
- Deprecated types remain valid in existing data (never deleted); new data uses replacement

**V2 canonical entity types (partial):**
```typescript
// People
PERSON: "person", IDENTITY: "identity"
// Organizational
ORGANIZATION: "organization", POSITION: "position", COMMITTEE: "committee"
// Academic
PROGRAM: "program", COURSE: "course", SERVICE: "service"
// Operations
PROJECT: "project", TASK: "task", DECISION: "decision", TICKET: "ticket"
// Commercial
CONTRACT: "contract", SUBSCRIPTION: "subscription", INVOICE: "invoice"
// Platform
DOMAIN: "domain", REPOSITORY: "repository", ENVIRONMENT: "environment"
```

**Institution presentation examples:**

| Canonical type | SLCC | University | Corveaux |
|---|---|---|---|
| `person` | Student / Instructor / Staff | Student / Faculty | User |
| `organization` | Department / Division | School / College | Organization |
| `position` | Position | Faculty Rank | Role |

## Related

- [[ADR-012 — Canonical Schema Architecture]]
- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-010 — Tenant Isolation Architecture]]
