# Corveaux Extraction Metrics

_Generated from ExtractionRun records. Do not edit manually — accuracy sample annotations are the only permitted manual additions._

---

## … CATALOG — https://catalog.slcc.edu/content.php?catoid=28&navoid=9704 — 2026-06-07 13:05:09

| Metric | Value |
|---|---|
| Run ID | `bb33ed5c-1468-4489-a01c-d4aab6e72582` |
| Status | RUNNING |
| Model | unknown |
| Source type | catalog |
| Runtime | — |
| Observations written | 0 |
| Promoted | 0 |
| Conflicts | 0 |
| Errors | 0 |
| Entities created | 0 |
| Programs extracted | 0 |
| Avg confidence | — |
| Total tokens (in/out) | — |
| Estimated cost (USD) | — |
| Cost per entity | — |
| Cost per program | — |

<!-- ACCURACY SAMPLE (append manually below) -->

### Live re-sample vs ground truth — 2026-06-07 (Session 17)

Methodology: fetched all 40 sampled entities' `sourceUrl`s live from `catalog.slcc.edu`, stripped HTML, and scored every material fact in `Entity.attributes` as PASS (1.0) / PARTIAL (0.5) / FAIL (0) / CONFLICT (excluded). `Accuracy = (PASS + 0.5*PARTIAL) / reviewed non-conflict facts`. Full findings: [[day-30-gate-resample-findings]] (validation/).

| | PASS | FAIL | Total | Accuracy |
|---|---|---|---|---|
| Courses (20 sampled) | 79 | 4 | 83 | 95.2% |
| Programs (20 sampled) | 86 | 2 | 88 | 97.7% |
| **Combined** | **165** | **6** | **171** | **96.5%** |

96.5% clears the >90% material-fact-accuracy bar set for the Day 30 gate.

6 genuine defects found and logged (`known_bugs` memory, Bugs 15-17):
- 4x course `prerequisites` omissions (`course:art-2050`, `course:teac-1500`, `course:tebl-1320`, `course:flm-2075`)
- 1x citation/identity mismatch — `program:music` resolves to a different entity ("MIDI: Academic Certificate (CTE)") than its `displayName` claims, with empty `attrs`
- 1x unit-normalization error — `program:advanced-manufacturing-aas-cte` stored `timeToCompletionSemesters: 3` when the live page states "3 years" (≈6 semesters)

See [[Corveaux V2 - Session 17 — Day 30 Gate Live Re-Sample]] for full session detail.

---

