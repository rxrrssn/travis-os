---
type: decision
domain: canonical-model
status: active
date: 2026-06-10
tags: [corveaux, canonical-model, effective-dating, discontinuation, extraction, archivist, events, time]
---

# ADR-027 — Discontinued-Entity Retention

> Status: **active** (approved Session 30). When a previously-canonical entity disappears from a complete re-extraction of its authoritative source, it is **retained as an effective-dated record + a discontinuation Event** — never silently dropped. Makes "discontinued" canonical truth, realizing [[ADR-021 — Effective Dating on Entity and Relationship]]'s intent and underpinning [[ADR-026 — Data Debt Report and Staleness Detection]].

## The problem

Today the extraction/promotion path (Archivist) carries forward what the current crawl produces. An entity that existed in a prior catalog edition but is **absent** from the current one simply… vanishes from the working set. SLCC, Session 30: the Accounting, Business Administration, Commercial Baking, Marketing Management programs are real, recently-discontinued programs — and they exist in the canonical table only as *absence* (their courses remain; the program entities are gone).

Absence is not a fact. It can't be cited, queried, dated, or rendered "as of." It cannot tell apart "discontinued", "renamed", "not yet crawled", and "extraction bug". Per [[ADR-002 — Institutional Model Primitives]], a discontinuation is an institutional **Event in Time** — and per [[ADR-021 — Effective Dating on Entity and Relationship]], `effectiveTo` exists precisely to say "the institution stopped offering this" while the row *remains the current record and queryable as historical canonical truth.* Nothing currently *sets* it on disappearance.

## Decision

### 1. Disappearance from a *complete* authoritative source ⇒ discontinuation, not deletion

When a re-extraction run is asserted complete and authoritative for an entity type (see §3), and a previously-canonical entity of that type is absent from it, the Archivist:

1. **Sets `effectiveTo`** on the entity to the end of the prior effective period (e.g. the prior `catalogYear`'s end, or the run's detection date when no period boundary is known). The row stays live (`validTo` stays NULL) — it is the current canonical record of a *now-ended* offering.
2. **Emits a discontinuation `InstitutionalEvent`** — `eventType: "discontinued"`, `subjectEntityId` = the entity, `occurredAt` = the effective end, `payload` = `{ reason: "absent from complete source", sourceEdition, runId }`, with the run + source index as citation.
3. **Leaves `validTo` untouched.** Discontinuation is an *institutional* statement (`effectiveTo`), never a *system-record-dead* statement (`validTo`). The two axes stay orthogonal exactly as ADR-021 requires; UI must not collapse them.

### 2. Absence-from-complete-catalog is the citation

This mirrors the catalog-membership-as-citation ruling (S30, [[project_slcc_rebuild]]): presence in the current published catalog cites `status: active`; **provable absence from the complete current catalog cites `effectiveTo` / discontinuation.** The citation is the authoritative source index + the run that confirmed completeness — not a per-entity quote (none can exist for a thing that's gone). Rule 1 is satisfied by the completeness assertion, which is itself evidenced (§3).

### 3. Completeness gate — the safeguard against false discontinuation

Discontinuation marking triggers **only** on a run flagged complete + authoritative for the entity type. A partial or failed crawl absence is **not** discontinuation (this is the trap that produced the S30 "coverage gap" misdiagnosis — an incomplete crawl looked like missing programs). Completeness is asserted by reconciling the run against the source's own index of record (e.g. the catalog's "Programs Listed Alphabetically" count) within tolerance. Absent that assertion, missing entities are left **untouched** (current behavior), never auto-discontinued.

### 4. Scope and phasing

- **Phase 1: programs** (the demo-critical, low-cardinality, index-reconcilable case).
- **Later:** courses and other entity types, once each has a reliable completeness signal.
- Renames are *not* discontinuations: a fuzzy-resolvable successor (Compositor resolver / review) means "renamed", handled by the entity-merge/review tooling, not by `effectiveTo`.

## Options Considered

- **Drop/ignore absent entities** (status quo) — rejected; absence isn't a fact, breaks citation, point-in-time rendering, and the Data Debt Report's dangling-reference truth.
- **Hard-delete absent entities** — rejected; violates "Events are immutable / institutional memory is preserved" (ADR-002) and ADR-021's record-retention.
- **Mark `validTo` (system-dead)** — rejected; that means "not the current Corveaux record", losing the entity from canonical history. Discontinuation is `effectiveTo`, not `validTo`.
- **Retain as effective-dated + discontinuation Event, gated on a completeness assertion** (chosen) — canonical, cited, queryable, and safe against partial-crawl false positives.

## Consequences

- "Discontinued" becomes **canonical, cited, queryable** truth; `effectiveTo` finally gets written by the pipeline (ADR-021 was data-layer-only).
- [[ADR-026 — Data Debt Report and Staleness Detection]] dangling-reference findings rest on effective-dated truth, not absence — and can state *when* a program ended.
- ADR-021's deferred **point-in-time "as of catalog year X" rendering** becomes meaningful (discontinued programs render in historical views, not current ones).
- The Compositor resolver can distinguish **renamed** (successor exists → merge/review) from **discontinued** (`effectiveTo` set → dangling finding).
- The Archivist gains a completeness-gated reconciliation step; requires a trustworthy per-source completeness signal (the coverage-reconciliation work already implied by the SLCC rebuild).
- Tenant content tooling must render effective-dated/discontinued entities distinctly and must not let "expire/discontinue" be confused with "supersede" (`validTo`) — reinforces the ADR-021 UI constraint.

## Open questions

- The exact completeness tolerance and how the authoritative index-of-record is declared per source.
- Effective-end date when the prior period boundary is unknown (detection date vs. prior `catalogYear` end).
- Cascade: when a program is discontinued, what happens to its `offered_by` / `contains_course` relationships (effective-date the relationships too?).
- Reinstatement: a program reappearing in a later edition (clear `effectiveTo` + a reinstatement Event).

## Stakeholders

- Travis Hornbuckle (Founder & CEO) — directed that discontinued-entity retention get its own decision, Session 30; **approved → active**.

## Related

- [[ADR-021 — Effective Dating on Entity and Relationship]]
- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-016 — Topological Extraction Order and Content Quality Pipeline]]
- [[ADR-026 — Data Debt Report and Staleness Detection]]
- [[ADR-023 — Page Reconstruction and Single-Source Page Binding]]
- [[project_slcc_rebuild]]
