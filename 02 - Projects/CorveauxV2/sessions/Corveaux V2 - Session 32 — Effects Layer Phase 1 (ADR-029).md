---
type: session
project: corveaux-v2
session: 32
date: 2026-06-10
tags: [corveaux, effects, workflows, events, policies, email, resend, adr-029, business-substrate]
---

# Corveaux V2 - Session 32 — Effects Layer Phase 1 (ADR-029)

## Focus

Strategy session that became a build. Settled the business-substrate direction (CRM/billing/contracts as expansions of the five primitives, never bolt-on modules — Founder: "nothing should EVER be bolt on"), wrote [[ADR-029 — Effects Layer and Provider Rails]], then built Phase 1: the event→policy→effector engine with email as effector #1.

Also settled this session: companion app = Expo as "another projection of the platform" (extends the already-written [[ADR-025 — Push Companion App and Event-to-Device Projection]]); effects layer first, CRM projections next, Stripe rail after, projection API only when the Expo app gets built.

## Foresight pass (Founder: "what are we missing?")

Five guards adopted into the contract BEFORE code (ADR-029 addendum): per-environment delivery allowlist (staging can never email real people), `EFFECTS_PAUSED` kill switch + trigger **origin** matching (`operator`/`pipeline`/`provider` — corpus regens fire one effect, not thousands), `delivery: immediate | digest` reserved in the rules schema (digests become a feature, not a migration), PII-minimal payloads (effects point at projections, never embed canonical facts — keeps FERPA/TCPA posture clean), and an explicit subscription contract (institutional events + operation lifecycle, **never** audit events; Stripe = platform-as-merchant only).

## What was built

**Schema** — `EffectDispatch` (tenant DB, migration `20260610080000_add_effect_dispatch`, applied to both dev tenant DBs): transactional outbox mirroring `AuditOutbox`; status `PENDING | SENT | DEAD | SUPPRESSED | SIMULATED`; unique `idempotency_key` = replay guard (CF Workflows replay steps; callbacks double-fire).

**Effects library** (`src/lib/effects/`):
- `contracts.ts` — `effect_policy` rules Zod schema (trigger/operationTypes/origins/channel/delivery/dryRun/recipients), trigger types (`operation.completed`/`operation.failed`/institutional eventTypes), idempotency-key derivation
- `matcher.ts` — `evaluateEffectTrigger` (policy match → `createMany skipDuplicates` dispatch rows; `safeEvaluateEffectTrigger` never throws — an effects failure is a delivery problem, not a canonical-state problem)
- `drain.ts` — `drainEffectDispatches` + `effectsConfigFromEnv`; fail-safe allowlist semantics (unset = suppress everything, `"*"` = explicit unrestricted opt-in); 5-attempt cap → `DEAD`
- `effectors/email.ts` — Resend via raw HTTP (only module that knows Resend exists; swappable)
- `templates.ts` — PII-minimal operation context builder (counts + admin links only)

**Worker wiring** (`cloudflare/tenant/src/`):
- `index.ts` — workflow gains "evaluate effect policies" steps on completion + failure paths; `scheduled()` drains the effect outbox on the same 5-minute cron as the audit export (cron tick = retry backoff)
- `extraction-queue.ts` — finalizer fires the completion effect where real counts live (pages/observations/canonized/conflicts/cost + deep link to `/admin/extraction-runs/{id}`); final-attempt failure fires `operation.failed`

**Config** — effects vars added to all three tenant wrangler configs + example + `render-cloudflare-config.mjs` (staging AND production default to founder allowlist; widening is a deliberate promotion-time change). `RESEND_API_KEY` is a wrangler secret, never a var.

**Seeds/scripts** — `scripts/seed-effect-policy.ts` (founder operation-lifecycle email policy, seeded on corveaux + slcc dev DBs); `scripts/verify-effects.ts` (e2e verification, self-cleaning).

## Verification

`verify-effects.ts` against corveaux dev DB: 1 policy matched → 1 dispatch written; re-evaluation wrote 0 (idempotency proven at the DB constraint); drain attempted delivery, recorded `RESEND_API_KEY is not configured`, kept the row `PENDING` with `attempts=1` (retry semantics proven). `tsc --noEmit`, `cf:typecheck`, `lint`, `next build` all clean. Prisma clients (app + workerd) regenerated.

## Resend provisioning (same session — DONE)

Founder created the Resend account, added the key to `.env`, and verified the **corveaux.app sending domain** (confirmed `status: verified` via the Resend API). Then:
- Sender switched from `onboarding@resend.dev` to **`Corveaux <notifications@corveaux.app>`** across `.env`, all tenant wrangler configs, the render script, and the code default.
- **Real end-to-end send verified**: `verify-effects.ts` → 1 dispatch written → drain → `SENT`, email delivered to the founder inbox from the real domain.
- `RESEND_API_KEY` set as a worker secret on **corveaux-staging + slcc-staging** (via CF API). The legacy-named dev workers (`corveaux-tenant-zero`, `corveaux-slcc-validation`) did NOT get it (permission classifier flagged the ambiguous names) — harmless: they run pre-effects code until next dev deploy; dispatches would just sit PENDING. One-liner if wanted: `npx wrangler secret put RESEND_API_KEY --name corveaux-tenant-zero` (and `corveaux-slcc-validation`).
- **`RESEND_API_KEY_STAGING` added to GitHub repo secrets** and `deploy-staging.yml` wired: job env + both tenant `wrangler secret bulk` blocks (the bulk step re-asserts secrets every deploy — without this, the next deploy would have left the key out of the refresh), plus a new idempotent **"Seed effect policies"** step after tenant migrations (the job env already carries the staging DB URLs). Next push to master is fully zero-touch: migration + workers + secret + policy seed.

## Remaining

1. **Commit + push** — work is uncommitted at session close (Founder's call on bundling).
2. **Prod parity, AT PROMOTION TIME ONLY** (prod gate holds): mirror the three `deploy-staging.yml` edits into `deploy-production.yml` and create `RESEND_API_KEY_PRODUCTION` first — wiring it without the secret would bulk-write an empty key.
3. Dev-worker naming drift (pre-existing): local configs deploy as `*-development` but the live dev workers are the legacy `corveaux-tenant-zero`/`corveaux-slcc-validation` names — worth reconciling some session.

First live customer: the SLCC rebuild at sprint-end — one completion email instead of dashboard polling.

## State at close

Effects engine Phase 1 code-complete and verified in dev; uncommitted/undeployed. Prod untouched; SLCC rebuild still parked for sprint-end; business gates still pinned. Next phases per ADR-029 plan: CRM projections → Stripe rail (webhook → canonical Events, thin billing) → contracts/Mercury as need appears → projection API + Expo app (ADR-025 build).

## Related

- [[ADR-029 — Effects Layer and Provider Rails]]
- [[ADR-025 — Push Companion App and Event-to-Device Projection]]
- [[Corveaux V2 - Session 31 — Data Debt Surfaces, Admin IA, and Error Handling]]
- [[Corveaux V2]]
