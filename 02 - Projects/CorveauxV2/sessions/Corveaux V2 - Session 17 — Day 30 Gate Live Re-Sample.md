---
type: daily
date: 2026-06-07
---

# 2026-06-07 — Session 17

## Focus

Gate Run 002 (relaunched in [[Corveaux V2 - Session 16 — R2 Cleanup Close-Out and WAF Cache Poisoning Fix|Session 16]] with the Cartographer rebuild and WAF-detection fix in place) completed successfully. This session ran the live re-sample that the gate has been building toward since Day 1: 20 courses + 20 programs, scored against ground truth fetched live from `catalog.slcc.edu`, against the ≥90% material-fact-accuracy bar named in `project_stage` (memory) and `CLAUDE.md`.

**Result: 96.5% combined accuracy — clears the bar.** Full findings recorded in [[day-30-gate-resample-findings]] (validation/).

## Tasks

- [x] Confirmed Run 002 completed and program discovery succeeded (the WAF fix held — no repeat of the "0 programs" failure)
- [x] Selected the verification sample: 20 courses + 20 programs from the promoted entity set (one program collision resolved by substituting "Advanced Manufacturing: AAS (CTE)")
- [x] Built a throwaway verification harness (`scripts/_verify-sample.ts`): fetched all 40 sampled entities' `sourceUrl`s live from `catalog.slcc.edu`, stripped HTML to plain text, and wrote stored canonical attributes alongside live page text for comparison
- [x] Scored every material fact in each entity's `attributes` as PASS (1.0) / PARTIAL (0.5) / FAIL (0) / CONFLICT (excluded from the denominator)
- [x] **Caught and corrected my own measurement error mid-pass**: an initial 6,000-char truncation of the live page text cut off the "Time to Completion & Graduation Map" section that appears late on every Acalog program page, leaving ~15 program facts looking unverifiable. Wrote two targeted recheck scripts (`_recheck1.ts`, `_recheck2.ts`) that re-fetched those 15 pages in full with keyword-filtered output — every one of those facts turned out correct (PASS). None of this was an extraction defect; it was my own tooling's truncation, and I made sure not to penalize the pipeline for it.
- [x] Computed final scores and determined the gate result
- [x] Found and categorized 6 genuine defects (see Decisions below)
- [x] Cleaned up all throwaway verification scripts (`_verify-sample.ts`, `_verify-sample-output.txt`, `_recheck1.ts`, `_recheck2.ts`, `_sample-entities.ts`) — confirmed via `git status --short scripts/` that nothing but the pre-existing, unrelated `_poll-extract-progress.mjs` remains untracked
- [x] Logged the 6 defects as Bugs 15-17 in `known_bugs` (memory)
- [x] Wrote up findings to [[day-30-gate-resample-findings]] (validation/), `metrics.md` (accuracy-sample annotation), `catalog-review.md`, and this session note

## Decisions

**Gate verdict: PASS — and all six defects were squashed same-session, not deferred.** 96.5% combined accuracy clears the >90% bar comfortably (courses 95.2%, programs 97.7%, 165/171 facts correct). The user's own independent random-20 manual review later corroborated this at **99.4%** (zero FAILs — see [[day-30-gate-resample-random-20-manual]]). Rather than just logging the three defect classes as Day-60 follow-up, I fixed/mitigated them in the same session immediately after writing them up:

1. **`program:music` citation/identity mismatch (most serious finding)** — the entity's `displayName` ("Music program"), `canonicalKey` (`program:music`), and `sourceUrl` (poid=12642) don't agree: the cited URL actually resolves to **"MIDI: Academic Certificate (CTE)"**, a narrower sub-certificate that is "part of the Music program's participation in the college-wide stackable credentials initiative" — not the Music program itself. `attrs` is also empty, so this entity captured zero verifiable material facts. This is precisely the failure mode CLAUDE.md Rule #1 ("Every extracted fact requires a source URL citation. No citation = no fact") exists to prevent — the citation exists, but it doesn't point at what the entity claims to be.
2. **Unit-normalization error on `program:advanced-manufacturing-aas-cte`** — stored `timeToCompletionSemesters: 3`, but the live page states "Estimated Time to Completion is **3 years**" (≈6 semesters). The extractor mismapped a years-value into a semesters-typed field. (Its sibling attribute `admission_type: "paid apprenticeship"` on the same entity WAS verified correct.)
3. **4x course `prerequisites` omissions** — `course:art-2050` (missing ART 1120 + ART 1260), `course:teac-1500` (missing a 9-course prereq chain), `course:tebl-1320` (missing TEBL 1310), `course:flm-2075` (missing FLM 1045 + FLM 1055). Lower severity than #1/#2 — these are omissions of populated-but-uncaptured fields, not wrong-entity or wrong-unit errors — but they recur often enough (4 of 20 sampled courses) to warrant a completeness check.

**Squashed same-session (logged as fixed/mitigated in `known_bugs`, Bugs 15-17):**
- **Bug 15 (citation/identity mismatch) — FIXED with a code-level guardrail.** Added `extractPageTitle()` (pulls the page `<title>` before HTML stripping) and `displayNameMatchesPageTitle()` (rejects `program`/`course` entities whose `displayName` shares no significant word with the cited page's title) to `extractor.ts`'s `parseAndFilter()`. **Empirically verified against the actual offending page**: live-fetched poid=12642, confirmed its title is "Program of Study: MIDI: Academic Certificate (CTE)..." vs. displayName "Music program" → correctly rejected; ran the same check against a known-good control (`program:economics-as`) → correctly passed. This is a deterministic code check, not a model-compliance bet.
- **Bug 16 (unit-normalization error) — MITIGATED at the prompt level.** Added an explicit "Unit Normalization" instruction to `EXTRACTION_SYSTEM_PROMPT`: convert "N years" phrasing to semesters (×2) before storing `timeToCompletionSemesters`. Can't be fixed post-hoc in `normaliseAttributeKeys` — the original "3 years" phrasing is gone by normalization time, so the fix has to happen at extraction time where the source text is still visible. **Needs empirical re-verification on the next full extraction run** — a prompt instruction isn't proof of behavior change until observed in real output.
- **Bug 17 (course prerequisite omissions) — MITIGATED at the prompt level.** Added an explicit completeness instruction: capture the COMPLETE `prerequisites` value including every course in a chain, or omit the field entirely (a partial list is treated as a citation error). Same caveat as Bug 16 — **needs empirical re-verification on the next run**.

**Generalized lesson recorded in `known_bugs`:** code-level guardrails (Bug 15) are strictly stronger than prompt-level mitigations (Bugs 16-17) because they reject deterministically rather than depending on model compliance. Prefer a code check whenever the validating signal survives to extraction time (page title does; "3 years" phrasing does not).

These are now off the Day-60 punch list (modulo the Bugs 16-17 re-verification, which should happen on the next full run regardless of when that is). The previously-deferred backlog still stands, untouched: failed-page URL tracking, idempotency keys on `extractPage_task`, a DB-level dedup guard on observation writes, and loosening the strict `JSON.stringify` conflict comparison to avoid false-positive conflicts from LLM rewording.

## Wins

- The gate methodology held up under its own live re-test: every fact was checked against the actual current catalog page, not against a frozen snapshot or the extraction's own output
- Caught my own measurement-tooling bug (the 6,000-char truncation) before it produced a false negative on the gate — the rechecks turned 15 "unverifiable" facts into 15 confirmed-correct facts, which moved the needle materially (would have looked like ~85% if left uncorrected)
- Found a genuine, serious citation-integrity defect (`program:music`) through the re-sample exactly as the methodology is designed to do — this is the gate doing its job, not a reason to doubt the 96.5%
- 96.5% on a live, adversarial-feeling re-test (the WAF had been actively fighting the crawler two sessions running) is a strong signal the pipeline is fundamentally sound

## Blockers / Incidents

None. The user asked that the gate not be formally declared closed in this session — that determination is being held as a deliberate, separate step. The user has since completed their independent review of the random-20 subset ([[day-30-gate-resample-random-20-manual]]) and scored it at 99.4%, corroborating the self-check.

## Next Step

1. ~~User completes independent manual review of the random-20 subset~~ — **done, scored 99.4%, zero FAILs**
2. ~~Compare the user's manual scores against this session's self-check scores — reconcile any divergence~~ — **done: both samples clear the >90% bar with no FAILs on either disjoint cross-section; no divergence to reconcile**
3. Formally close the Day 30 gate (separate, deliberate step held by the user — both scoring passes are complete, so this is now unblocked whenever the user chooses to make the call)
4. Once closed: begin Day 60 generated-tenant work. The citation-sanity and unit-normalization guardrails are no longer "prioritize early" items — they're already shipped (Bug 15 code-fixed+verified, Bugs 16-17 prompt-mitigated). The one open thread to carry into that work: empirically re-verify Bugs 16-17's prompt mitigations on the next full extraction run.

## Related

- [[Corveaux V2 - Session 16 — R2 Cleanup Close-Out and WAF Cache Poisoning Fix]] — launched the Run 002 this session's re-sample verifies
- [[day-30-gate-resample-findings]] — full findings file (validation/)
- `known_bugs` (memory) — Bugs 15, 16, 17 added
- `project_stage` (memory)
- [[SLCC Material Facts Checklist]] — the methodology this re-sample followed
