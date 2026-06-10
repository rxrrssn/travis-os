---
type: validation
domain: extraction
status: complete
date: 2026-06-07
tags: [day-30-gate, resample, slcc, accuracy, session-17]
---

# Day 30 Gate — Live Re-Sample Findings (Session 17)

_Full writeup: [[Corveaux V2 - Session 17 — Day 30 Gate Live Re-Sample]]. Aggregate scores also recorded in `metrics.md` (vault root, accuracy-sample annotation) and `known_bugs` / `project_stage` (memory)._

## Methodology

Selected 20 promoted `course` entities and 20 promoted `program` entities from gate Run 002's output (one program collision was resolved by substituting "Advanced Manufacturing: AAS (CTE)" for a duplicate). For each of the 40 entities:

1. Fetched the entity's canonical `sourceUrl` live from `catalog.slcc.edu` (not a cached copy, not the extraction's own observation record)
2. Stripped HTML to plain text (regex-based tag removal preserving block-level line breaks, HTML entity decoding)
3. Compared every material fact in `Entity.attributes` against the live page's ground-truth content
4. Scored each fact:
   - **PASS (1.0)** — fact matches the live page
   - **PARTIAL (0.5)** — fact is approximately correct or only partially verifiable from the page text
   - **FAIL (0)** — fact contradicts or is absent from the live page where it should be present
   - **CONFLICT (excluded)** — ambiguous ground truth; excluded from the denominator rather than penalized

`Accuracy = (PASS + 0.5 × PARTIAL) / reviewed non-conflict facts`

**Methodology correction made mid-pass:** an initial 6,000-character truncation of the live page text cut off the "Time to Completion & Graduation Map" section that appears late on every Acalog program page (often beyond ~6,000 characters of stripped text), leaving roughly 15 program facts (credit breakdowns, time-to-completion details, accreditation status, admission types) looking unverifiable. Two targeted recheck passes re-fetched those specific pages in full, with keyword-filtered output (`/credit|Part-time|Full-time|Time to Completion|years|semester|Track|Apprentice|paid/`) starting from the `Program Description` section onward. **Every one of those 15 facts resolved as correct (PASS)** — they were never wrong, just truncated out of view by my own tooling. This is recorded explicitly so the distinction between "unverifiable from my excerpt" and "actually wrong" is auditable: none of the 96.5% score rests on a fact I couldn't actually see.

## Results

| | PASS | FAIL | Total reviewed | Accuracy |
|---|---|---|---|---|
| Courses (20 sampled) | 79 | 4 | 83 | 95.2% |
| Programs (20 sampled) | 86 | 2 | 88 | 97.7% |
| **Combined** | **165** | **6** | **171** | **96.5%** |

**96.5% clears the >90% material-fact-accuracy bar set for the Day 30 gate** (per `CLAUDE.md` and `project_stage` memory).

## Defects Found (6 total — logged as Bugs 15-17 in `known_bugs` memory)

### 1. Citation/identity mismatch — `program:music` (most serious finding)

- **Entity**: `program:music`, `displayName = "Music program"`
- **`sourceUrl`**: resolves to poid=12642 — but that page's actual title is **"MIDI: Academic Certificate (CTE)"**, a narrower sub-certificate described on its own page as "part of the Music program's participation in the college-wide stackable credentials initiative" — a different, more specific entity than the one this record claims to represent
- **`attributes`**: `{}` — empty; zero verifiable material facts captured
- **Why it matters**: this is exactly the failure mode `CLAUDE.md` Rule #1 ("Every extracted fact requires a source URL citation. No citation = no fact") exists to prevent. The citation *exists* — it just doesn't point at what the entity claims to be. A citation that resolves to the wrong entity is functionally equivalent to no citation: a downstream consumer trusting `displayName` + `sourceUrl` together would be misled.
- **Recommended fix**: a citation-sanity check that verifies an extracted `displayName` actually appears in the cited page's title/H1 before promotion. This single check would have caught the defect at write time, before it reached the canonical layer.

### 2. Unit-normalization error — `program:advanced-manufacturing-aas-cte`

- **Stored**: `attributes.timeToCompletionSemesters = 3`
- **Live page**: states "Estimated Time to Completion is **3 years**" — i.e. roughly 6 semesters, not 3
- **Diagnosis**: the extractor took the bare numeral from "3 years" phrasing and mapped it directly into a `timeToCompletionSemesters`-typed slot without converting units. This is a narrow, mechanical mapping bug — not a wholesale extraction failure. (Note: the entity's sibling attribute `admission_type: "paid apprenticeship"` on this same record WAS verified correct against the live page's "Qualified applicants will be offered a paid position as an apprentice" language.)
- **Why it matters**: this defect class generalizes. Any program whose live page describes completion time in years (apprenticeship-style, multi-year programs) rather than semesters is at risk of the same silent unit mismap. A single occurrence found in a 20-program sample (5%) is enough to warrant a systemic guardrail before the pattern scales to many more institutions, many of which will have apprenticeship/multi-year program structures.
- **Recommended fix**: detect "N years" phrasing explicitly in time-to-completion source text and convert to semesters (×2, with appropriate rounding/annotation), rather than assuming the source phrasing already matches the target field's unit.

### 3. Course `prerequisites` omissions (4 of 20 sampled courses, 20%)

All four have populated, required prerequisite text visible inline on their live catalog pages that did not make it into `attributes.prerequisites`:

| Entity | Missing prerequisite(s) |
|---|---|
| `course:art-2050` | ART 1120, ART 1260 |
| `course:teac-1500` | a 9-course prerequisite chain |
| `course:tebl-1320` | TEBL 1310 |
| `course:flm-2075` | FLM 1045, FLM 1055 |

- **Diagnosis**: omission of a populated source field — not a wrong-entity error (like #1) or a wrong-unit error (like #2). The pipeline correctly identified these courses and most of their other attributes; it simply failed to capture the prerequisite chain in 4 of 20 cases.
- **Why it matters**: 20% recurrence in a small sample suggests this isn't a one-off LLM miss but a structural gap — likely related to how multi-course prerequisite chains are formatted on course pages (e.g. semicolon-separated lists, "or" chains, cross-references) versus how the extractor's prompt frames the `prerequisites` field.
- **Recommended fix**: a `prerequisites`/`corequisites` completeness check that cross-references the live page's inline "Prerequisite:"/"Corequisite:" text against the extracted attribute before promotion — flagging (or re-running extraction on) any course where that source text is non-empty but the extracted attribute is missing or shorter than expected.

## What this does NOT change

- **The gate bar is cleared.** 96.5% > 90%, with margin (6.5 points). None of the 6 defects, even taken together, would move the combined score below the bar — they're concentrated in specific fields (`prerequisites`, `timeToCompletionSemesters`) and one specific entity (`program:music`), not spread evenly across the dataset in a way that suggests systemic unreliability.
- **Zero hallucinations or fabrications were found** in this sample — consistent with the Run 001 finding (Session 13 assessment) that every gap in that earlier, lower-scoring run was an omission, never an invention. The pipeline's failure mode remains "misses or mismaps a real fact" — never "invents a fact that isn't there."

## Follow-up status: squashed same-session, not deferred

All three defect classes were fixed/mitigated in the same session this re-sample was completed in (recorded as Bugs 15-17 in `known_bugs` memory):

- **Bug 15 (citation/identity mismatch) — FIXED with a code-level guardrail**, not just a recommendation. `extractor.ts` now extracts the page `<title>` before HTML stripping and rejects `program`/`course` entities whose `displayName` shares no significant word with it (`extractPageTitle()` / `displayNameMatchesPageTitle()` in `parseAndFilter()`). **Empirically verified against the actual offending page** (poid=12642 — confirmed title "Program of Study: MIDI: Academic Certificate (CTE)..." vs. displayName "Music program" → correctly rejected; control case `program:economics-as` → correctly passed). This closes exactly the compounding-at-scale risk described below — deterministically, not by hoping the model complies.
- **Bug 16 (unit-normalization error) — MITIGATED at the prompt level.** `EXTRACTION_SYSTEM_PROMPT` now explicitly instructs converting "N years" phrasing to semesters (×2) before storing `timeToCompletionSemesters`. This can't be fixed post-hoc in `normaliseAttributeKeys` — the source phrasing is gone by normalization time — so the prompt is the only available lever. **Needs empirical re-verification on the next full extraction run.**
- **Bug 17 (course prerequisite omissions) — MITIGATED at the prompt level.** `EXTRACTION_SYSTEM_PROMPT` now explicitly instructs capturing the COMPLETE prerequisite chain or omitting the field entirely (partial = citation error). Same caveat — **needs empirical re-verification on the next run**.

**Generalized lesson (recorded in `known_bugs`):** code-level guardrails are strictly stronger than prompt-level mitigations because they reject bad output deterministically rather than depending on model compliance. Use a code check whenever the validating signal survives to extraction time (a page's `<title>` does; "3 years" phrasing in prose does not — by the time normalization runs, it's already collapsed to a bare number).

**Independent corroboration:** the user separately scored their own random-20 cross-section of the same promoted entity set ([[day-30-gate-resample-random-20-manual]]) at **99.4%**, with zero FAILs — reinforcing that 96.5% wasn't a sampling artifact.

These three no longer block Day 60 generated-tenant work — they're shipped. The previously-identified, still-deferred backlog items remain open and untouched: failed-page URL tracking, idempotency keys on `extractPage_task`, a DB-level dedup guard on observation writes, and loosening the strict `JSON.stringify` conflict comparison that currently produces false-positive conflicts from LLM rewording.

## Related

- [[Corveaux V2 - Session 17 — Day 30 Gate Live Re-Sample]] — full session writeup
- `metrics.md` (vault root) — accuracy-sample annotation with the same aggregate scores
- [[day-30-gate-resample-random-20-manual]] — independent random-20 subset generated for the user's own manual scoring, separate from this self-check
- `known_bugs` (memory) — Bugs 15, 16, 17
- `project_stage` (memory) — current stage notes
- [[day-30-gate-assessment]] — the Run 001 assessment this re-sample follows the methodology of
- [[SLCC Material Facts Checklist]] — the checklist defining "material fact" for scoring purposes
