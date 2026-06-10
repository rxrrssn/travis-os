---
type: daily
date: 2026-06-07
---

# 2026-06-07 — Session 14

## Focus

Implemented fixes for all five defects named in the Day 30 Gate Assessment ([[day-30-gate-assessment]]) — the user's instruction was simply "fix it all." This session was entirely implementation against an existing diagnosis; no new analysis was required beyond resolving one discrepancy between the assessment's stated root cause and the actual code (see Decisions).

## Tasks

- [x] **Defect 1 — Crawler pagination discovery gap**: added `navoid`-scoped pagination regex to `allowedUrlPatterns` in `scripts/catalog-courses.ts` (`navoid=9704`) and `scripts/catalog-programs.ts` (`navoid=9720`) so `enqueueLinks` follows listing pages past page 1
- [x] **Defect 2 — Orchestration concurrency/TTL sizing**: reworked `extractionRun` in `src/trigger/extraction.ts` to shard `payload.urls` into sequential batches of 20 (`SHARD_SIZE`) via `batchTriggerAndWait`, replacing the single giant-batch call that left tail items queued past the 10-minute dev TTL; raised `extractPage_task` `concurrencyLimit` from 10 → 15
- [x] **Defect 3 — Scope enforcement (hard filter)**: added `excludedEntityTypes?: string[]` threaded through `ExtractPageInput` → `extractPage_task` → `extractionRun` → `fullCatalogRun`/standalone scripts; `parseAndFilter()` in `src/lib/extraction/extractor.ts` now hard-drops entities of excluded types (and any relationship/event referencing them by canonical-key prefix) — tracked via a new `excluded` counter, separate from the existing confidence/citation `rejected` counter. Course runs now exclude `["program"]`, program runs exclude `["course"]`
- [x] **Defect 4 — Relationship promotion dedup key**: restructured `promoteRun()` in `src/lib/extraction/promoter.ts` into a two-phase pass — all entity observations promoted before any relationship/policy/event observations — eliminating false "conflict" classifications caused by intra-run ordering dependency
- [x] **Defect 5 — Canonical attribute vocabulary**: created `src/lib/extraction/attribute-vocabulary.ts` with alias maps for program, course, and organization entity attributes (e.g. `degree_type`/`degreeType`/`programType`/`type`/`certificationType` → `credentialType`); wired `normaliseAttributeKeys()` into `parseAndFilter()` so canonical keys land in the model at extraction time

## Decisions

- **Corrected the stated root cause for Defect 4.** The assessment described the relationship promotion uniqueness key as `(fromCanonicalKey, relationshipType)` — too coarse, needing `toCanonicalKey` added. Reading `promoter.ts` showed the `existing` relationship lookup *already* keys on the full `(fromEntityId, relationshipType, toEntityId)` triple — that part of the code was correct as written. The actual mechanism producing 447 `requires` conflicts (collapsing to 32 distinct `(from,type)` pairs / 444 valid distinct triples) was **promotion-order dependency**: observations process in `createdAt asc` order, so a relationship observed on page N referencing an entity first observed on page M > N hits the dangling-reference check (`!fromEntity || !toEntity`) before that entity is promoted, and gets permanently flagged `conflict`. Fix: two-phase promotion (all entities, then everything else) — same defect, more accurate mechanism, more durable fix than tightening an already-correct lookup key.
- **Sharding over raising concurrency alone** for Defect 2 — back-of-envelope math showed even `concurrencyLimit: 25` could leave the tail of a 130+ URL batch queued ~7.5 minutes, uncomfortably close to the 10-minute dev TTL. Sequential shards of 20 guarantee shallow queue depth regardless of environment TTL/concurrency settings; paired with a modest concurrency bump (10 → 15) for throughput.
- **Hard filter is additive to scope hints, not a replacement** — `scopeHint` free text remains in the prompt (it still helps the model focus), but `excludedEntityTypes` is the enforcement backstop that doesn't depend on the model reliably honoring prose instructions. This directly targets the dominant accuracy-shortfall driver: 100% of "Incorrect" classifications in the gate sample were scope-leakage stubs, not genuine extraction errors.
- **Attribute vocabulary is a normalization layer, not a schema gate** — unknown/unlisted attribute keys pass through unchanged. Collisions (e.g. both `credits` and `total_credits` present on one observation) resolve first-non-null-wins. Policy-type "attribute soup" was *not* addressed here — the assessment's proposed fix for that is modeling `admission_eligibility` as reusable canonical `Policy` entities (an entity-modeling change, not an attribute rename), explicitly framed as schema-redesign work for a future session.

## Wins

- TypeScript compiles clean (`tsc --noEmit`) after all five defect fixes
- All fixes are scoped, additive, and reuse existing patterns — no architectural rework, consistent with the assessment's "none require re-architecture" framing
- Found and corrected a misdiagnosis in my own prior assessment (Defect 4) by reading the actual code rather than trusting the written analysis — the fix that resulted is more durable than the one originally proposed

## Blockers

None. Ready to re-run the Day 30 gate.

## Next Step

Re-run the gate: `npm run trigger:catalog:full`, then re-sample 20 courses + 20 programs against live SLCC pages using the same methodology as [[day-30-gate-assessment]]. Closing the scope-leakage gap (Defect 3) alone was projected to be sufficient to clear the 90% bar — with all five defects now fixed, a Pass is the expected outcome. Do not start generated-tenant work until the re-run scores ≥90%.

## Related

- [[day-30-gate-assessment]] — the assessment this session's work directly remediates
- [[SLCC Validation Run]] — gate validation document, currently `status: conditional-pass`, awaiting re-run
- [[Corveaux V2 - Session 12 — Topological Extraction Architecture]] — built the pipeline this session patched
- [[ADR-016 — Topological Extraction Order and Content Quality Pipeline]]
- `project_stage` (memory)
