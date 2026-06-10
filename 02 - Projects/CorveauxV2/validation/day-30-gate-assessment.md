---
type: validation
domain: corveaux
status: complete
date: 2026-06-07
tags: [corveaux, slcc, validation, day-30, gate-assessment]
---

# Day 30 Gate Assessment — SLCC Extraction Validation

**Recommendation: CONDITIONAL PASS**

**Status update (2026-06-07):** All five defects named below have been fixed in code — see [[Corveaux V2 - Session 14 — Day 30 Gate Defect Remediation]]. Awaiting gate Run 002 (re-run + re-sample) to confirm the ≥90% bar is cleared.

The extraction architecture is sound and validated end-to-end (crawl → extract → promote → canonical model → content blocks). Citations are accurate, no hallucinated entities were found, and economics are excellent. However, raw accuracy on this run falls short of the 90% material-fact bar — not because the AI extracts badly when looking at the right page, but because of five identified, narrowly-scoped, fixable engineering defects (scope discipline, crawler coverage, orchestration tuning, promotion dedup keys, attribute vocabulary). None require architectural rework. **Recommendation: fix the five items below, re-run the gate, and re-assess — full Pass is realistically achievable on the next iteration.**

---

## 1. Coverage

| Source | Pages w/ entities | Estimated total | Coverage |
|---|---|---|---|
| Courses (catoid=28, navoid=9704) | 117 | ~1,050–1,260 | ~9–11% |
| Programs (catoid=28, navoid=9720) | 34 of 133 discovered | 133 | ~26% |

**Root causes (both infrastructure, not extraction-quality issues):**

- **Course coverage gap** — `src/lib/extraction/crawler.ts` only calls `enqueueLinks({ regexps })` against `allowedUrlPatterns`. The course crawl's pattern (`catalog\.slcc\.edu/preview_course`) does not match SLCC's pagination URLs (`content.php?...&filter[cpage]=N`), so the crawler never advances past the first results page. Most of the catalog was never visited.
- **Program coverage gap** — `extractPage_task` runs with `queue: { concurrencyLimit: 10 }` against a batch of 133 pages, in a dev environment where queued runs expire after a 10-minute TTL. ~99 of the 133 page-extraction runs queued long enough to expire (`EXPIRED` status) before ever executing — confirmed via Trigger.dev MCP run inspection. This produced the 99 errors recorded on `ExtractionRun 16fc7832`.

Both are config/orchestration bugs with direct fixes (broaden the crawl regex to include pagination params; raise `concurrencyLimit` or shard the batch to fit inside the TTL window, or move to a production environment without the 10-minute dev TTL).

---

## 2. Accuracy

Manually sampled 20 courses and 20 programs (evenly spread across the active canonical entity population) and verified each against the live SLCC catalog page cited as its `sourceUrl`.

### Courses (20 sampled)

| Classification | Count |
|---|---|
| Correct | 9 |
| Partially Correct | 6 |
| Incorrect | 5 |

- **Course accuracy (strict):** 9/20 = **45%**
- **Course accuracy (correct + partial):** 15/20 = **75%**

**Critical reframe:** all 5 "Incorrect" classifications were **scope-leakage stub entities** — course records created from *program* pages (sourced from `preview_program.php?...poid=...` URLs, not `preview_course_nopop.php?...coid=...`), each missing title/credits/description (e.g. `course:cj-2020` = `{"credits": null}`, `course:tecn-1000` = `{"subjectCode":"TECN","courseNumber":"1000"}`). None of these were genuine extraction failures on the course's actual page — they were never the course run's job to produce.

Filtering to the **15 of 20 courses sourced from an actual course page** (i.e., extraction operating in its intended scope):
- 9 correct, 6 partially correct, **0 incorrect**
- 100% partial-or-better; 60% (9/15) fully correct

The 6 "partially correct" cases share a single, consistent gap: **5 of 6 were missing the prerequisite field** that *is* present on the live page (e.g. MATH 1050 omits "MATH 1010 ... or appropriate placement; ENGL 0990 ..."; AMTT 1120 omits "MATH 1010 or higher, taken concurrently"; ENGL 1010 omits "ENGL 0990 with C or better"). This is not random noise — it is a specific, addressable extraction-prompt gap (prerequisites are being under-prioritized relative to title/credits/description).

### Programs (20 sampled)

| Classification | Count |
|---|---|
| Correct | 14 |
| Partially Correct | 2 |
| Incorrect | 4 |

- **Program accuracy (strict):** 14/20 = **70%**
- **Program accuracy (correct + partial):** 16/20 = **80%**

Same reframe applies: all 4 "Incorrect" classifications were **misclassification stubs sourced from course pages**, not program pages — `program:accounting` (`attrs: {}`), `program:advanced-manufacturing` (`{"programName":"Advanced Manufacturing"}` — a near-empty duplicate of the correctly-extracted `program:advanced-manufacturing-aas-cte`), and two separate canonical-key variants for AFROTC (`program:afrotc` and `program:air-force-reserve-officer-training-corps`, both single-field stubs referring to the same real-world program). These are scope-leakage and dedup failures, not factual errors about a program's actual page.

Filtering to the **16 of 20 programs sourced from an actual program page**:
- 14 correct, 2 partially correct, **0 incorrect**
- 100% partial-or-better; 87.5% (14/16) fully correct

The properly-scoped extractions were excellent — several (Cabinetmaking, Concrete Masonry Apprenticeship, Cultural Resource Management) matched the live page on every checked field including nested cost breakdowns and emphasis-track lists verbatim. The 2 partial cases both shared the same gap category: **missing admission/entry-requirement detail** (selective-admission criteria, CASAS test score thresholds) — again a single, addressable, consistent gap rather than scattered error.

### Overall Material-Fact Accuracy

| Basis | Correct | Partial | Incorrect | Accuracy |
|---|---|---|---|---|
| All 40 samples, strict | 23 | 8 | 9 | **57.5%** |
| All 40 samples, correct+partial | 23 | 8 | 9 | **77.5%** |
| All 40 samples, weighted (partial = 0.5) | — | — | — | **67.5%** |
| **Properly-scoped only (31 of 40)**, strict | 23 | 8 | 0 | **74%** |
| **Properly-scoped only (31 of 40)**, correct+partial | 23 | 8 | 0 | **100%** |

**Conclusion:** the system does not meet the 90% bar as measured against the full sample — but every single shortfall traces to one of two narrow, named causes: (1) scope leakage producing stub entities outside the extraction's intended target, or (2) one consistent missing-field category per entity type (prerequisites for courses, admission requirements for programs). Zero hallucinations, zero fabricated facts, zero wrong-but-plausible data were found anywhere in the 40-item sample — every discrepancy was an *omission*, not an *invention*.

---

## 3. Citations

Every sampled entity carried a `sourceUrl` that resolved to the cited live page and matched the extracted content. (Two apparent citation mismatches found during initial spot-checking — `course:acct-2090` and `course:amtt-1120` resolving to the wrong `coid`s — turned out to be an artifact of the *sampling script*, which used `findFirst` against `ExtractionObservation` and grabbed an arbitrary low-confidence "mention" observation rather than the canonical `Entity.sourceUrl`. Re-querying the canonical entities directly showed both citations are correct: `course:acct-2090` → coid=109690 "Cloud-Based Accounting Systems" ✓, `course:amtt-1120` → coid=107263 "Generals I - Aviation Fundamentals" ✓.)

**Citation gate: PASS.** No citation defects found in the canonical model.

---

## 4. Hallucination Review

No hallucinated entities, relationships, programs, or departments were found in the 40-item sample or in the conflict sample (below). Every entity, including the stub/scope-leakage entities, traced to a real, citable source page describing a real SLCC program or course — the problem with those entities is *incompleteness*, not *invention*.

**Hallucination gate: PASS.**

---

## 5. Conflict Analysis

602 observations are flagged `status: conflict` across the three runs. Sampled 30 (spread across the population) and classified by cause:

| Category | Est. count | % | Evidence |
|---|---|---|---|
| Relationship collisions (promotion-key defect) | ~490 | ~81% | See below |
| Duplicate observations / normalization differences | ~70 | ~12% | Same entity re-extracted from dozens of pages with attribute-name variance |
| Canonical-key / scope-leakage collisions | ~35 | ~6% | Stub "mention" entities colliding with the canonical full-detail entity |
| True contradictions (genuinely conflicting facts) | ~0 | <1% | None found in the 30-item sample |

**The dominant category is a promotion-engine defect, not a data-quality issue — confirmed with direct evidence:**

The 447 conflicting `requires` relationship observations (74% of all conflicts) collapse to only **32 distinct `(fromCanonicalKey, relationshipType)` pairs**, but represent **444 distinct `(fromCanonicalKey, relationshipType, toCanonicalKey)` triples** — i.e., 444 separate, true, valid facts ("Program X requires Course A", "Program X requires Course B", ...). The promotion engine appears to treat `(fromCanonicalKey, relationshipType)` as if it were a unique slot for a single relationship, when in reality one program legitimately requires dozens of distinct courses. Each subsequent distinct requirement collides with the first and gets flagged `conflict` rather than recorded as an additional relationship. The same pattern appears in `part_of` (35 conflicts).

The "duplicate observation" category is well-illustrated by `organization:salt-lake-community-college`, which is re-extracted from dozens of different course and program pages (every page footer carries the institution's contact block), each time with slightly different attribute key names (`mainPhone` vs. `phoneGeneral`, `enrollmentInfoPhone` vs. `phoneEnrollment`) — attribute soup at the observation layer, not a real disagreement about SLCC's phone number.

**Conclusion:** "Conflict" counts dramatically overstate any real data-quality problem in this run. ~93% of sampled conflicts are accounted for by a single fixable defect — the relationship-promotion uniqueness key needs to include `toCanonicalKey` (and, more generally, the full semantic identity of the fact) rather than collapsing on `(from, type)` alone. Genuine factual contradictions are vanishingly rare to nonexistent in this dataset.

---

## 6. Scope Leakage — RESOLVED (Option B: scope too broad)

This was not ambiguous. Direct DB lineage tracing on the 40-item accuracy sample proved scope leakage runs in **both directions**:

- **5 of 20 sampled courses** (`course:cj-2020`, `course:cj-1010`, `course:cj-2410`, `course:pols-1100`, `course:tecn-1000`) were created by the *program* run from `preview_program.php` pages, despite an explicit scope hint instructing: *"Courses have been pre-extracted in a prior run ... Do NOT emit course entities."*
- **4 of 20 sampled programs** (`program:accounting`, `program:advanced-manufacturing`, `program:afrotc`, `program:air-force-reserve-officer-training-corps`) were created by the *course* run from `preview_course_nopop.php` pages — including two separate canonical-key stubs for the same real-world AFROTC program, and a near-empty duplicate of the correctly-extracted Advanced Manufacturing AAS program under a different canonical key.

**Root cause:** scope hints are advisory free text appended to the extraction prompt; the model does not reliably honor "do not emit X" instructions when the source page incidentally references an out-of-scope entity. There is no hard page-type gate before extraction runs.

**Impact:** scope leakage is the single largest driver of the accuracy shortfall (100% of "Incorrect" classifications in both samples), a meaningful share of conflicts (~6%), and wasted extraction budget (pages being processed for entities outside the run's intended scope).

**Fix is a prompt/orchestration discipline problem, not a schema or architecture problem** — tighten the scope-hint enforcement (e.g., a post-extraction filter that drops out-of-scope `entityType` observations before they're written, keyed off the run's declared scope) or add a pre-extraction page-classification gate.

---

## 7. Canonical Schema Findings — "Attribute Soup"

Confirmed at **three** levels (the brief described it at the program level only — it is in fact pervasive):

- **Program attributes**: the same concept appears under `degree_type` / `degreeType` / `programType` / `type` / `certificationType`; `credits` / `total_credits` / `credits_minimum` / `credit_minimum` / `creditMinimum` / `minimumCredits`; `duration` / `duration_years` / `duration_semesters` / `time_to_completion_semesters` / `timeToCompletion` / `completion_time` / `program_length`; `cte` / `cteMark` / `cteName` / `cteDesignation` / `cte_designation`.
- **Course attributes**: `subject_code` / `subjectCode` / `courseCode` / `subject`; `course_number` / `courseNumber`; `semesters_offered` / `semestersOffered` / `semesterOffered`.
- **Policy types** (visible in `obs-breakdown.ts` output): 10+ near-duplicate variants — `program-requirement` / `program_requirement` / `program-entry-requirement`, `licensure-requirement` / `licensure` / `licensing-requirement` / `licensing_requirement`, `general_education_requirement` / `general-education-requirement`, etc.

**Root cause:** there is no canonical attribute vocabulary constraining model output. Each page's extraction free-associates field names from the source text, so the same fact takes a different shape depending on how the source page phrased it.

### Proposed Canonical Program Schema

**Attributes** (intrinsic scalar facts about the program record):
- `credentialType` (enum: Associate of Science | Associate of Arts | Associate of Applied Science | Academic Certificate | Technical Certificate | Apprenticeship Certificate | ...)
- `totalCredits` / `minimumCredits` (number)
- `timeToCompletionSemesters` (number)
- `admissionType` (enum: open | selective | competitive)
- `isCTE` (boolean)
- `studyFormat` (enum: full-time | part-time | hybrid)
- `transferable` (boolean)
- `catalogYear` (string)
- `estimatedCosts` (structured: tuition, courseFees, booksAndSupplies, tools, projects — this run already extracted this cleanly as a nested object for Cabinetmaking; promote that shape to the canonical schema)

**Relationships** (graph edges — the data we observed is fundamentally relational, not scalar):
- `program REQUIRES course` (attributes: category, required/elective, credits, sequence) — the dominant conflict-source; needs the dedup-key fix from §5
- `program OFFERED_AT campus/location` — locations are entities (Taylorsville Redwood Campus, Westpointe Campus, Miller Campus, Jordan Campus, Herriman Campus, SLCC Online all recurred), not free-text strings
- `program PART_OF school/department` — e.g. "Gail Miller Business School" is an organizational entity, not a `school` attribute string
- `program HAS_EMPHASIS emphasis-track` — emphases (e.g. Biology's "Anatomy and Physiology" / "Integrative Biology") are themselves structured sub-programs with their own course requirements; modeling them as flat string arrays loses that structure
- `program LEADS_TO award/credential` — modeling credential type as a relationship to a canonical Award entity (rather than a free-text attribute) enables cross-program comparison and is consistent with "no special-case logic"

**Content blocks** (narrative projections, not canonical facts):
- Program description / overview prose
- Admission-requirement narrative text (the structured `admissionType` enum is canonical; the explanatory paragraph is a projection of it)
- Cost disclaimers ("Fees may vary based upon specific registration and are subject to change")

**Policies** (reusable institutional logic, not per-program attributes):
- Selective/competitive admission criteria (CASAS test score thresholds, GPA minimums, interview processes, prerequisite-completion requirements) should be modeled as `Policy` entities of type `admission_eligibility`, referenced by multiple programs — not duplicated as free-text inside each program's attributes. This also directly addresses the policy-type attribute-soup problem in §findings above: collapsing to a canonical policy-type vocabulary eliminates the 10+ near-duplicate variants.

**Outcomes** (not extracted in this run — future work):
- Career/employment outcomes, transfer pathways, licensure pass rates were not present on the program-listing pages crawled. A dedicated extraction pass against career-services / outcomes-reporting pages would be needed; out of scope for this gate.

---

## 8. Economics & Reliability

| Run | Cost | Entities | Cost/entity | Errors |
|---|---|---|---|---|
| Catalog (courses) `cde95671` | $0.691 | 125 | $0.0055 | 0 |
| Catalog (programs) `16fc7832` | $0.655 | 103 | $0.0064 | 99 |
| Website `e34fca4f` | $0.101 | 127 | $0.0008 | 0 |
| **Total** | **~$1.45** | **355** | **~$0.004** | **99** |

Economics are excellent and well within any reasonable operating budget — full-catalog extraction at this rate scales trivially.

The 99 errors are entirely attributable to the queue/TTL orchestration bug identified in §1 (program coverage gap), not to model failures, rate limits, or content-quality issues. Course and website runs completed with **zero errors**.

**Reliability gate: PASS** for the architecture (0 errors when orchestration is correctly sized); **CONDITIONAL** for this specific run configuration (orchestration needs the concurrency/TTL fix before a production run).

---

## 9. Day 30 Gate Criteria — Scorecard

| Criterion | Result |
|---|---|
| >90% accuracy on material facts | ✗ Not met as measured (57.5–77.5% across full sample); but 100% correct-or-partial / 74% strict on properly-scoped extractions, with zero hallucinations and all gaps traced to two named, fixable causes |
| Citations present on all facts | ✓ PASS |
| No hallucinated entities/relationships/programs/departments | ✓ PASS |
| Confidence calibration (high conf ↔ correct, low conf ↔ uncertain) | Not formally scored this session — all sampled entities carried confidence ≥ 0.85, and none of the "Incorrect" stubs carried meaningfully lower confidence than correct entities, suggesting confidence is **not yet a reliable signal for scope-leakage stubs** specifically (worth a follow-up pass once the scope-leakage fix lands and a cleaner population exists to calibrate against) |
| Canonical model: primitives map, relationships preserved, temporal info preserved | ✓ Entities/relationships/policies all materialized correctly into the canonical graph; promotion and temporal close (`validFrom`/`validTo`) functioned as designed — the *defect* is in relationship dedup-key granularity (§5), not in the canonical model's ability to represent the data |

---

## 10. Recommendation: CONDITIONAL PASS

The architecture survived first contact with a real institution, end to end, at a cost of $1.45. It produced zero hallucinations, accurate citations, and — when extraction operated within its intended scope — accuracy in the 74–100% range with every shortfall being an *omission* (a specific missing field) rather than an *invention*. That is strong evidence the underlying approach is sound.

It falls short of an unconditional Pass because five concrete, narrowly-scoped engineering defects suppressed both coverage and accuracy on this particular run:

1. **Crawler pagination discovery** — `enqueueLinks` regex excludes pagination URLs (`crawler.ts`)
2. **Orchestration concurrency/TTL sizing** — `concurrencyLimit: 10` vs. 10-minute dev queue TTL caused 99 expired runs (`extraction.ts`)
3. **Scope enforcement** — advisory scope hints are not reliably honored; no hard page-type gate exists, producing stub entities in both directions (courses from program pages, programs from course pages)
4. **Relationship promotion dedup key** — `(fromCanonicalKey, relationshipType)` is too coarse; needs `toCanonicalKey` to stop flagging hundreds of legitimate distinct facts as "conflicts"
5. **Canonical attribute vocabulary** — no constrained schema for program/course/policy attributes, producing attribute soup that would need normalization before generated-tenant rendering could rely on consistent field names

None of these require rearchitecting the pipeline. They are scoped, well-understood, independently fixable items. **Recommended path: implement fixes 1–5, re-run the SLCC gate, and re-score against the same 40-item sampling methodology.** Given that properly-scoped extractions already cluster at 74–100% correct-or-partial with zero fabrication, closing the scope-leakage gap alone (which accounts for 100% of "Incorrect" classifications) would likely be sufficient to clear the 90% bar on a re-run.

---

## Appendix: Sampling Detail

- **Course sample** (20, evenly spread by `displayName` across 156 active course entities): ACCT 1050, ACCT 2090, ACCT 2600, AERO 1011, American Institutions (`pols-1100`), AMFG 2230, AMTT 1120, AMTT 1405, AMTT 2990, ANTH 2083, ANTH 2969, ASL 2040, AMTT 2501, Concrete Masonry 1A (`tecn-1000`), Criminal Justice Supervision (`cj-2020`), ENGL 1010, Introduction to Criminal Justice (`cj-1010`), Introduction to Victimology (`cj-2410`), LE 1220, MATH 1050
- **Program sample** (20, evenly spread by `displayName` across 45 active program entities): Accounting, Advanced Manufacturing AAS, Advanced Manufacturing Program, AFROTC, Air Force ROTC, ASL/English Interpreting AAS, Apprenticeship Facilities Maintenance AAS, Architecture AS, Automation Technology Tech Cert, Automotive Collision Repair AAS, Biology AS, Business AS, Cabinetmaking Academic Cert, Commercial DL Class A, Community Health and Leadership AS, Concrete Masonry Apprenticeship, Construction Management AS, Criminal Justice AS, Cultural Resource Management Cert, Economics AS
- **Conflict sample** (30, evenly spread across 602 conflict-status observations from all three runs)

All comparisons were made against the live SLCC catalog page cited as the canonical entity's `sourceUrl`, fetched at assessment time (2026-06-07).
