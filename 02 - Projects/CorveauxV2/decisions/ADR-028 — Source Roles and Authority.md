---
type: decision
domain: canonical-model
status: active
date: 2026-06-10
tags: [corveaux, canonical-model, sources, authority, conflict, extraction, compositor, policy, multi-source]
---

# ADR-028 — Source Roles and Authority

> Status: **active** (approved Session 30). A source has a **role per entity type** — *authority* (source of record: mints, conflict precedence, optionally completeness-authoritative) or *projection* (references canonical entities, never mints, deltas become Data Debt). Expressed as a `source_authority` **Policy** (primitive-aligned). Resolves how `catalog.slcc.edu`, `slcc.edu`, `i.slcc.edu`, `support.slcc.edu` — separate runs over the same institution — converge without colliding, and is the prerequisite for [[ADR-027 — Discontinued-Entity Retention]] and the [[ADR-026 — Data Debt Report and Staleness Detection]].

## The problem

An institution has many sources, each its own crawl + run. They describe the **same canonical entities** from different angles: the catalog is the academic record; the marketing site promotes programs; the intranet documents them; support answers questions about them.

Today, conflict detection converges on the canonical Entity by `canonicalKey` (`archivist.ts` — incoming observation vs current canonical, adjudicated by the `source_precedence` Policy, unresolvable → `ExtractionObservation.status=conflict` + an `extraction_conflict_detected` `InstitutionalEvent`). That part works. But two gaps remain:

1. **Non-convergence collisions.** Sources name the same thing differently — measured S30: `slcc.edu` "Computer Science Fundamentals (CP)" vs catalog "Computer Science: Academic Certificate." Different names → different `canonicalKey` → **two entities, conflict silently missed.** Worse, a marketing crawl that *mints* academic entities manufactures duplicates.
2. **No authority-per-entity-type.** `source_precedence` ranks by source *type* globally (`scope: "all" | string`). There's no declaration that **the catalog is the source of record for programs** — which [[ADR-027 — Discontinued-Entity Retention]]'s completeness gate and Compositor's "don't mint from a projection" rule both require.

## Decision

### 1. Every source has a role per entity type

- **authority** — the source of record for that entity type. It **mints** canonical entities, takes **conflict precedence**, and *may* be flagged **completeness-authoritative** (its complete run is ground truth for what exists — gates ADR-027 discontinuation).
- **projection** — references/binds existing canonical entities (via the Compositor resolver, ADR-023); **never mints** that entity type; a differing fact is **not** a canonical overwrite but a **Data Debt drift finding** (ADR-026). Never triggers discontinuation.

Example: `catalog.slcc.edu` = authority (+ completeness-authoritative) for `program`/`course`; `slcc.edu`, `i.slcc.edu`, `support.slcc.edu` = projection for those types. A source may be authority for one type and projection for another (a staff directory: authority for `person`, projection for `program`).

### 2. Roles are a `source_authority` Policy (primitive-aligned)

Institutional logic about sources is a **Policy** (ADR-002), alongside the existing `source_precedence` Policy. Shape (`rules`):

```
{
  "assignments": [
    { "sourceSlug": "slcc-catalog", "entityTypes": ["program","course"],
      "role": "authority", "completenessAuthority": true },
    { "sourceSlug": "slcc-web",     "entityTypes": ["*"], "role": "projection" }
  ],
  "default": "projection"
}
```

**Default = projection** — the safe default: an undeclared source/type **cannot mint and cannot discontinue.** Authority is granted explicitly, never assumed.

### 3. The promoter becomes role-aware

In the Archivist, before minting/overwriting an entity, resolve the run's source role for that entity type:
- **authority** → current behavior (mint, or conflict-resolve by `source_precedence`).
- **projection** → **never create a new entity of that type.** If a matching canonical entity exists and the fact differs → emit a **Data Debt fact-drift finding** (a conflict observation, ADR-026) instead of a canonical write. If none exists, the reference stays a dangling finding (ADR-026), not a new entity.

This makes the Data Debt Report a *natural output of promoting a projection source's run* — the projection's deltas from canonical truth are exactly its findings.

### 4. Conflict precedence unchanged, now scoped by role

`source_precedence` continues to adjudicate value conflicts **among authority/contributor sources**. Projection sources never participate in canonical overwrite, so they never enter precedence adjudication — they only produce findings. (Roles and precedence are complementary: role decides *who may write*; precedence decides *who wins when two writers disagree*.)

## Options Considered

- **Global source_precedence only** (status quo) — rejected; can't express per-entity-type authority, can't stop a projection crawl from minting duplicates, can't gate ADR-027.
- **Hardcode "catalog is authority"** — rejected; violates Rule 2 (no `if tenant`/`if source == catalog`). Must be tenant-declared config.
- **Roles as a TenantSource column** — workable but coarse (one role per source, not per entity type) and not a primitive. Rejected for the Policy.
- **`source_authority` Policy, per-entity-type, default projection** (chosen) — primitive-aligned, per-tenant config, safe-by-default, and the single concept that unblocks ADR-026/027 + multi-source convergence.

## Consequences

- **Convergence without collision:** only authority sources mint; projections resolve-and-reference (Compositor resolver as cross-source entity-linker). No duplicate academic entities from a marketing crawl.
- **[[ADR-027 — Discontinued-Entity Retention]] gate is now correct:** discontinuation reconciliation runs only for `{authority + completenessAuthority + run-asserted-complete}` for that entity type. Absence from a projection source (`slcc.edu`) is never discontinuation evidence.
- **[[ADR-026 — Data Debt Report and Staleness Detection]] gets a second producer:** promoting a projection source's run emits drift/dangling findings directly (not only the Compositor capture pass).
- Requires reading two policies (`source_authority` + `source_precedence`) in the Archivist; both are effective-dated tenant config.
- Tenant Zero seed + each generated tenant must seed a sane `source_authority` Policy (catalog → authority for academics; web/intranet/support → projection).
- Migrating existing multi-source data may surface duplicate entities created before roles existed — a cleanup/merge pass (the admin merge tooling Travis noted), not blocking.

## Open questions

- A third role, **contributor** (may supplement/mint but is not completeness-authoritative — e.g. a department program page) — deferred; `completenessAuthority: false` on an authority covers most of it for now.
- Per-entity-type vs per-attribute authority (a source authoritative for a program's *description* but not its *credits*) — deferred; entity-type granularity first.
- How completeness is asserted for an authority run (reconcile against the source's index-of-record) — settled in ADR-027 / the rebuild.

## Stakeholders

- Travis Hornbuckle (Founder & CEO) — surfaced the multi-source collision question that forced this decision, Session 30; **approved → active**.

## Related

- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-016 — Topological Extraction Order and Content Quality Pipeline]]
- [[ADR-023 — Page Reconstruction and Single-Source Page Binding]]
- [[ADR-026 — Data Debt Report and Staleness Detection]]
- [[ADR-027 — Discontinued-Entity Retention]]
- [[project_slcc_rebuild]]
