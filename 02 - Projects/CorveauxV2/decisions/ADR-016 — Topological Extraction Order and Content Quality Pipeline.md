---
type: decision
domain: extraction
status: active
date: 2026-06-06
tags: [extraction, ai, pipeline, slcc, day-30-gate]
---

# ADR-016 — Topological Extraction Order and Content Quality Pipeline

## Decision

The extraction pipeline operates in topological order — leaf entities before aggregate entities — with four additional quality mechanisms: a content quality gate, JSON-LD structured data harvesting, scope-aware extraction hints, and a separate document (PDF) extraction pipeline.

## Context

The Day 30 gate requires >90% accuracy on material facts extracted from the SLCC catalog. Prior runs failed at scale due to two compounding problems:

**Output size problem.** Program pages in the SLCC catalog link to every course in the program's curriculum. When extracting a program page without scope constraints, Claude emits the program entity plus 20–50 full course entities. A single program page generates 10,000–15,000 output tokens. At Tier 1 rate limits (8,000 output tokens/minute), extraction of 132 programs serializes entirely — no meaningful parallelism — and total costs spike.

**Content quality problem.** The crawler collects index pages, navigation pages, and other structural pages alongside content pages. These produce zero extractable facts but still consume an LLM call. Some pages return mostly JavaScript rendering stubs with no readable content.

**Document coverage gap.** Institutional policies, eligibility requirements, and governance rules are frequently encoded in linked PDFs and Word documents — not in the HTML pages. The prior HTML-only pipeline missed this entire class of institutional knowledge.

**Discovery from institutional anatomy.** Universities have a clear entity hierarchy: courses → programs → departments → schools → institution. Each level references the level below. If extraction works bottom-up (leaves before roots), aggregate pages can reference already-extracted children by canonical key rather than re-describing them in full.

## Options Considered

**Option A — Flat extraction with deduplication.** Extract all pages simultaneously, rely on post-extraction deduplication to collapse duplicate course observations. Rejected: deduplication is lossy (different confidence scores for same entity), and the output token problem remains — the rate limit bottleneck is at generation time, not storage time.

**Option B — Topological order with scope hints (chosen).** Extract courses first (leaf), then programs (aggregate) with a scope hint telling Claude not to re-emit course entities — only emit program entities and REQUIRES relationships using canonical course keys. Programs become compact (2,000–3,000 tokens each instead of 15,000). Full parallelism restored within each phase.

**Option C — Single-pass extraction with chunking.** Break each page into smaller chunks and extract chunk-by-chunk. Rejected: institutional facts frequently span chunks (a requirement spans a sentence on page 1 and a definition on page 3). Chunking destroys semantic coherence.

## Rationale

Topological order is the correct architectural choice because it maps to institutional reality: courses exist independently, programs are defined in terms of courses. This is not a pipeline optimization — it is a reflection of the institutional model itself. Extracting leaves before roots produces smaller, more accurate, more focused observations at each aggregate level.

The content quality gate (500-character minimum after HTML stripping) eliminates LLM calls on pages with no signal. Index pages, pagination pages, and JS-rendered stubs all fail this check. The check is free (no API call).

JSON-LD harvesting captures structured data that the HTML-stripping pipeline throws away. Acalog catalog pages sometimes include schema.org CourseInstance or Course JSON-LD that provides more reliable attribute extraction than free-text parsing.

The document pipeline addresses an entire class of missed knowledge. Policies are defined in handbooks, not in navigation pages. For institutional completeness, document extraction is a first-class pipeline phase, not an afterthought.

## Stakeholders

- Travis Hornbuckle (platform)

## Consequences

**Positive:**
- Program page output reduced from ~15,000 tokens to ~2,000–3,000 tokens
- Full concurrency (concurrencyLimit: 2) restored for programs phase
- Estimated cost per full catalog run reduced 5–7×
- Zero LLM calls on thin/boilerplate pages
- Policy and governance facts now captured from linked documents
- Pipeline structure reflects institutional entity hierarchy — scales to any institution

**Negative:**
- Gate run now requires two sequential phases (courses, then programs) instead of one — adds ~20–40 minutes of wall time
- Scope hints create a coupling between phases: if course extraction is incomplete, REQUIRES relationships emitted by programs will reference non-existent canonical keys. Promoter must handle dangling references gracefully.
- Document pipeline adds a third optional phase and requires fetching binary files — increases network surface area

**Constraints introduced:**
- `catalog-programs.ts` MUST NOT run before `catalog-courses.ts` completes
- Canonical course key format (`course:{lowercase-subject}-{number}`) must be consistent across both phases — a normalization bug in one phase will cause key mismatches in relationship resolution

## Related

- [[ADR-015 — Rendering Architecture]] — Extraction pipeline architecture (extractionRun, extractPage_task, promote_task)
- [[ADR-014 — Fan-out Scalability and batchTriggerAndWait]] — batchTriggerAndWait is the core fan-out mechanism within each extraction phase
- [[extraction-pipeline-spec]] — Formal specification this ADR implements
- [[SLCC Validation Run]] — Where this architecture will be validated against the Day 30 gate
- [[SLCC Material Facts Checklist]] — Accuracy criteria for gate passage
- [[catalog-review]] — Pilot run results (30-program run) that exposed the problems this ADR solves
- [[Corveaux V2 - Session 12 — Topological Extraction Architecture]] — Session when this architecture was built
- [[Corveaux V2 - Session 11 — Tenant Zero Auth Validation]] — Session when full-run failures were diagnosed
- `project_stage` (memory) — Day 30 gate requirements
- `known_bugs` (memory) — P2002 canonical_key uniqueness, which this ADR helps mitigate by reducing duplicate course observations
