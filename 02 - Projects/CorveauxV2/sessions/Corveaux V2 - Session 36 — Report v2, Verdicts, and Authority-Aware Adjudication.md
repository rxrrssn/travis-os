---
type: session
project: corveaux-v2
session: 36
date: 2026-06-11
tags: [corveaux, data-debt, verdicts, feedback-loop, authority, theme, commit]
---

# Corveaux V2 - Session 36 — Report v2, Verdicts, and Authority-Aware Adjudication

Morning continuation of the overnight forge ([[Corveaux V2 - Session 35 — The Overnight Forge]]). Committed as **`c381012`** and pushed; CI → Deploy Staging applies the new tenant migration to both staging tenant DBs.

## Report v2 (task #32, Founder: "prioritize 32 right now")

The Data Debt Report grew a human adjudication layer — three pieces:

1. **Specific, never general.** Fact-drift findings now state attribute-by-attribute deltas: `attribute: the page says "X" — canon says "Y"`, computed from the `data_debt_drift_detected` event payloads (observed vs current value). No more "values differ" summaries.
2. **Accept/Reject verdicts.** New `FindingVerdict` tenant table keyed by a stable `dedupeKey` (`findingType::canonicalKey-or-evidence`) that survives re-reconstruction. Verdict UI on both report pages (tenant-aggregated + per-source): accept/reject buttons per finding, verdict badges, rejected rows hidden behind a `?showRejected=1` toggle, audited via `data_debt_finding_adjudicated` events.
3. **Feedback loop into the model.** An ACCEPTED rename finding seeds an **alias `EntityIdentifier`** (the old public name → current canonical entity); the resolver indexes aliases as first-class candidates, so future binding passes resolve the old name directly. REJECTED findings are suppressed from all future report snapshots by the worker. A verdict is institutional knowledge — the report learns.

## Authority-aware adjudication (Founder catch, mid-session)

> "if something comes from an authoritative source, it can't be discontinued if it's in the catalog."

Correct, and it was a real classification bug. A reference on the ADR-028 **authority** source can never be "discontinued" — the catalog defines what exists, so an unresolved reference there is an *extraction coverage gap* (our debt), not institutional data debt. Fixed at two layers:

- **Worker** (`reconstructFinish`): on a program-authority source, dangling references are excluded from the report and surfaced as a new `authorityCoverageGaps` counter in the operation result (no silent drops).
- **Aggregation** (read-time, heals pre-fix snapshots in dev AND staging immediately): authority-source dangling items are suppressed, and — the cross-source implication — any projection-source dangling item whose name *also* dangles on the authority source is suppressed too, because canon is provably incomplete for that name.

Verified against live dev data: `slcc-catalog-courses` and `slcc-catalog-programs` now report **clean (0 findings)**; all 60 remaining "discontinued / superseded-name" items are website-only — exactly the adjudicated 49 ghosts + 11 renames. The demo claim survives intact and is now *more* defensible.

Found and fixed along the way: the alias seeding/reading code used a nonexistent `identifierValue` field (schema field is `value`) — caught by the typecheck gate in both the server action and the worker's alias loader.

## Theme rescue (and task #33)

Founder: "I HATE how the pages rendered. the styling was totally dropped." Root cause: the forge-created slcc tenant had an **empty `themeConfig`** — Impressionist theme extraction was never a step in the forge chain. Rescued directly (`scripts/_extract-slcc-theme.ts` runs `extractThemeOperation` against the cached homepage; themeConfig persisted, `/t/slcc` styled). **Task #33** tracks the structural fix: a theme-extract step in the forge chain.

## Follow-up: verdict-responsive numbers (`8d2eaa2`)

Founder asked whether rejecting a finding updates the numbers — it didn't (only the row hid; severity/totals waited for the next reconstruct). Fixed: rejected findings now come out of the report *before* aggregation, so severity, totals, by-type counts, and highlights respond to a verdict immediately on both report views; rejected items only re-enter behind the "show rejected" toggle. Verified live on dev slcc (418→416 findings, dangling 113→111, row hidden, reversible).

## State at close

- Commit `c381012` pushed (16 files, +929): FindingVerdict migration, verdict action + UI, drift deltas, alias feedback loop, authority suppression, promotion scripts, theme rescue.
- **CI + Deploy Staging: SUCCESS** — tenant migrations (incl. `finding_verdicts`) applied to both staging tenant DBs; staging workers carry the new reconstruct code.
- Dev tenant workers NOT redeployed this block (sandbox denied the local wrangler deploy) — the worker-side suppression/alias/verdict-filter code goes live in dev on the next `npm run cf:tenant:slcc:deploy`; read-time aggregation already corrects the report everywhere.
- Tasks: #31, #32 complete; #33 (forge theme step) open; backlog #16–#30 unchanged.

## Related

- [[Corveaux V2 - Session 35 — The Overnight Forge]]
- [[ADR-026 — Data Debt Report and Staleness Detection]]
- [[ADR-028 — Source Roles and Authority]]
- [[Corveaux V2]]
