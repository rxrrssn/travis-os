---
type: decision
domain: corveaux
status: active
date: 2026-06-09
tags: [corveaux, canonical-model, effective-dating, entity, relationship, tenant-admin]
---

# ADR-021 — Effective Dating on Entity and Relationship

## Decision

`Entity` and `Relationship` each gain three additive, nullable columns:
`effectiveFrom`, `effectiveTo`, `catalogYear` (plus supporting indexes:
`[effectiveFrom, effectiveTo]`, `[catalogYear]` on both, and
`[entityType, catalogYear]` on `Entity`).

These track **institutional validity** — the period during which the institution
itself says a fact applies (e.g. "this program was offered through Spring 2024",
"this prerequisite applied for catalog year 2023-2024"). NULL means "no stated
institutional period", treated as always-effective (today's behavior, unchanged).

## Why this is a separate axis from `validTo`

`validFrom`/`validTo` already exist and track **system record validity** — temporal
versioning of the row itself (when it was/became the live Corveaux record).

The new fields track a different, orthogonal fact:

- **`validTo` set** = "this row is no longer the current Corveaux record" — a
  *system* statement (superseded, duplicate, corrected). The row is dead to the
  canonical model.
- **`effectiveTo` set** = "the institution says this fact stopped applying" at that
  date — a *catalog/institutional* statement. The row remains the current Corveaux
  record and remains queryable as historical canonical truth.

Conflating these would mean every catalog-year change ("this prerequisite no longer
applies as of 2024-2025") would have to either (a) incorrectly mark the row as a dead
system record, or (b) be silently dropped with no canonical trace — both violate the
"institutional model is canonical" axiom, since catalog-era facts are themselves
canonical institutional knowledge, not just current-state snapshots.

## Consequence for editors and tooling

- "Update Dates" (sets `effectiveFrom`/`effectiveTo`/`catalogYear`) and "Supersede /
  Mark Record Invalid" (sets `validTo`) are distinct actions with distinct intent.
  UI must not collapse them into a single "Expire" control — a reviewer reaching for
  "expire" to mean "this fact's catalog period ended" must not accidentally remove the
  row from canonical history.
- First consumer: `/t/[tenantSlug]/admin/content` tenant content review/editor
  (Session 24). `updateRelationshipEffectiveDatesAction` / `updateEntityAttributesAction`
  write `effectiveFrom`/`effectiveTo`/`catalogYear`; `expireRelationshipAction` writes
  `validTo` only.

## Known overlap, not resolved here

ADR-018's `ProgramAttributes`/`CourseAttributes` already include an attribute-level
`catalogYear` string (extraction-populated). The new top-level `Entity.catalogYear` is
a general canonical-primitive field for any entity or relationship type. Both coexist
for now — reconciliation deferred, consistent with how Session 18 left pre-ADR-018
legacy-shape conflicts for a later pass.

## Out of scope / deferred

Point-in-time "as of catalog year X" rendering (`tenant-content.ts` `loadCollection`/
`loadBlock` continue to filter only on `validTo: null`). This ADR adds the fields and
makes them editable/queryable at the data layer; point-in-time institutional rendering
is a follow-on once real catalog-year data exists to test against.
