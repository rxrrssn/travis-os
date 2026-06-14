---
type: session
project: corveaux-v2
session: 37
date: 2026-06-11
tags: [corveaux, hardening, watchdog, finalizer, forge, theme, no-silent-fails, commit]
---

# Corveaux V2 - Session 37 — The Hardening Run

Founder: "cool, keep going on the tasks please." Five backlog tasks closed in one continuous block, each as its own verified commit, each green through CI → Deploy Staging. This is the structural-debt payoff for everything the overnight forge ([[Corveaux V2 - Session 35 — The Overnight Forge]]) exposed in live fire.

## #33 — Impressionist joins the forge chain (`e3552e8`)

`source.theme_extract` is now a forge step type, inserted right after the website crawl so the demo is styled as early as possible. The tenant worker reads the cached homepage and runs Claude theme extraction; the platform callback persists `result.theme` to `Tenant.themeConfig` (the tenant worker has no platform-DB access by design). The "styling was totally dropped" class of incident can't recur — a forged tenant carries the institution's visual identity from mid-chain. Contract round-trip verified (`scripts/_verify-theme-step-contract.ts`).

## #18 — WAF guard in extraction loadPage (same commit)

The cache-miss fetch path could cache and extract a bot-challenge page served with HTTP 200 (Bug 14 class). Now: cached challenge pages are treated as a miss and purged (self-heal), live fetches retry with backoff and never cache a challenge body, and a persistent challenge fails loud instead of minting garbage observations.

## #21 — Finalizer as batched workflow steps (`ac31211`)

The promised root-cause patch for the overnight PROMOTING freeze. The old finalizer promoted + projected an entire run in ONE queue-consumer invocation — it died uncatchably at the consumer wall, and its redeliveries self-acked into silence. Now:

- `promoteRunBatch` in the archivist: bounded, phase-scoped (entities → relationships → policies/events); the observation status flip IS the cursor, so a crashed finalization resumes exactly where it stopped. `promoteRun` is a loop over the same batches — one promotion code path.
- New internal `extraction.finalize` operation: the queue consumer is a thin claim-and-start; the workflow runs promote batches (250), projection batches (100), and a completion step with **status-derived counts** (exact even after a reclaimed resume).
- PROMOTING is reclaimable (15-min staleness) and a dead finalize workflow marks the run FAILED — no more PROMOTING-forever.

Verified with a synthetic run (`scripts/_verify-batched-promote.ts`): cursor resume, three-phase ordering, exact canon writes — and the first attempt incidentally proved the ADR-028 role guard holds in the batched path (an unknown source was refused minting).

## #17 — The watchdog (`2aeca03`)

The "no silent fails" keystone. The tenant cron tick now sweeps the extraction pipeline and converts staleness into ACTION plus a loud `operation.stalled` effect (new trigger type, once per run+kind via dispatch idempotency):

1. Stalled open items (10 min, deliveries presumed dead — no DLQ yet) → messages **rebuilt from run metadata** and resent (extraction runs now persist scopeHint/excludedEntityTypes/catalogYear for exactly this), items reset to PENDING with natural backoff.
2. All items terminal but never finalized → finalize resent.
3. PROMOTING stale → finalize resent; the #21 reclaim honors it.

Every manual rescue from the overnight session is now automated. Verified with backdated synthetic runs (`scripts/_verify-watchdog.ts`) including backoff behavior.

## #19 — Manual Pipeline cards color-code to live state (`55cec19`)

Founder request from the overnight: each step card on `/admin/tenants/[slug]` now shows green/amber/red/neutral per its OWN source's latest operation (extraction ops stay amber until the finalizer completes them, so amber = genuinely in flight; Canonize reflects the run status since canonization lives in the finalizer).

## #20 — Live phase + progress (`a030154`)

"i dislike being blind to what is happening," answered structurally: the batched workflows report progress BETWEEN steps through the existing RUNNING callback (the platform merges progress-only updates into the stored result; forge chains still only advance on COMPLETED). Crawl reports batch/discovered/frontier; reconstruct reports captured and bound; generate and finalize report entities projected and canonize-phase remaining. Surfaced on the operation results and as live amber captions on the pipeline cards ("mapping batch 12 · 2,340 discovered", "1,204/4,022 pages · 3 failed") — page-level extraction counts come from one work-item groupBy per active source.

## #23 — policiesUrl in the provisioning manifest (`6094fe8`)

The S35 policies-authority experiment formalized: the pipeline intake gains a "Policies directory URL" attribute; the forge derives a `{slug}-policies` source from it (crawl scoped to the directory path, 700-page cap) and seeds it as the ADR-028 **authority for the policy entity type** — never completeness-authoritative, so ADR-027 discontinuation stays catalog-gated. `ensureDefaultSourceAuthorityPolicy` now accepts per-source `authorityFor` grants.

## Also in this block (Session 36 follow-up, `8d2eaa2`)

Verdict-responsive report numbers: rejecting a finding now moves severity/totals/by-type/highlights immediately on both report views (rejected items re-enter only behind the "show rejected" toggle). Verified live: 418→416 findings on a 2-occurrence rejection.

## State at close

- Commits `8d2eaa2`, `e3552e8`, `ac31211`, `2aeca03`, `55cec19`, `a030154`, `6094fe8` — all pushed; **CI + Deploy Staging green for all seven** (confirmed through the final `6094fe8` deploy).
- **Dev tenant workers still NOT redeployed locally** (sandbox denies local wrangler deploy) — staging workers carry everything; before the next DEV forge/extraction, run `npm run cf:tenant:slcc:deploy` + `npm run cf:tenant:corveaux:deploy` so the dev workers pick up the batched finalizer, watchdog, WAF guard, and theme step.
- The `operation.stalled` effect fires but no effect_policy subscribes to it yet — adding `"operation.stalled"` to the founder policy's trigger list (in `/t/[slug]/admin/notifications`) turns it into an email.
- Backlog remaining: #16 (DLQs — needs queue creation, an infra step), #22 (UX revamp — wants Founder direction), #24 (SEO layer), #25 (doc extraction port — biggest remaining technical piece, 294 policy PDFs waiting), #26/#27 (work tracking + expansion inventory — design-heavy), #28 remainder (catalog-source reconstruct skip — product judgment), #29 (governed editing), #30 (monthly catalog sync).

## Related

- [[Corveaux V2 - Session 36 — Report v2, Verdicts, and Authority-Aware Adjudication]]
- [[Corveaux V2 - Session 35 — The Overnight Forge]]
- [[ADR-030 — Architect, Pipeline-Driven Provisioning, and the Pre-Demo Forge]]
- [[Corveaux V2]]
