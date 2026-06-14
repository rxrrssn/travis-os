---
type: session
project: corveaux-v2
session: 34
date: 2026-06-11
tags: [corveaux, architect, forge, adr-030, crawl, workflows, notifications, policies, dev-runtime]
---

# Corveaux V2 - Session 34 — Architect Live, From-Scratch Forge, and the Batched Crawl

## Focus

Same continuous working stretch as Sessions 32-33. Founder reframed the SLCC rebuild as the **from-scratch pipeline-driven forge test**: "delete EVERYTHING… I want to add all their info, move them to Demo Requested which calls the Architect… and passes all the values from the pipeline into the platform admin to start the entire process." Plus the standing principle (memory: [[feedback_breakglass_platform_admin]]): **platform admin is a break-glass pane; work happens in the master tenant**.

## ADR-030 + Architect v1 BUILT (uncommitted bundle)

[[ADR-030 — Architect, Pipeline-Driven Provisioning, and the Pre-Demo Forge]]: pipeline = provisioning manifest; stage move = human gate; demo-slot pool interim; Workers-for-Platforms later. Built same session:
- **Pipeline manifest capture**: proposedSlug, catalog courses/programs URLs, intranet URL, catalogYear, address; primary/billing contacts as Person entities + `contact_for` relationships.
- **`launchDemoForge`** (`src/server/admin/forge.ts`): derives tenant + sources (Acalog navoid-scoped patterns, scope guards, page caps, catalogYear) from prospect attributes; seeds `source_authority` in the target tenant DB; one active forge per prospect (label-keyed idempotency); 10-step chain (crawl+extract ×3 sources → reconstruct ×3 → generate).
- **Callback chaining**: shared `dispatch-body.ts` builder + `forge.ts` envelope (`src/lib/provisioning/`); the platform worker's `/v1/operations/callback` advances the chain after source-metadata updates; failures mark FAILED + halt + email. Platform worker var `TENANT_WORKER_URL_TEMPLATE` (dev jsonc + render script).
- **Stage-move hook** in `moveStageAction` + launch/skip banner on the pipeline detail page.
- Add Source form gained patterns/maxPages/catalogYear (panel couldn't express crawl scope — Day-30 leakage class).

## From-scratch teardown executed

SLCC dev DB wiped (25,806 rows, audit preserved — **a platform DB trigger enforced "audit events are append-only" live**, blocking even FK-nulling); sources deleted; legacy `corveaux-slcc-validation` worker + queues + data bucket deleted; old tenant registration **renamed** to `slcc-retired-20260611` (audit FK made true deletion impossible — registry rows retire, they don't die); fresh `platform-development`/`slcc-development`/`corveaux-development` workers deployed with full secrets; `.env` repointed; legacy `corveaux-tenant-zero` worker left in place (classifier blocked autonomous deletion — Founder's call). Note: corveaux pipeline effects only began draining once `corveaux-development` deployed (legacy worker had no drain) — expect a catch-up email burst.

## The forge run — first failure was the find of the day

Founder added SLCC via the pipeline and moved it to Demo Requested → Architect launched (10 steps). **Step 1 died at 9 minutes**: `WorkflowInternalError` — a cold ~2,000-page live crawl cannot fit one Workflow step (per-attempt duration/subrequest limits); retries restarted the crawl from scratch. Every prior worker crawl had hidden this behind the R2 cache.

**Fix: batched crawl** — the workflow loops `step.do("crawl batch N")`, each ≤100 pages, frontier/visited state flowing between steps (durable, independently retryable; `CRAWL_MAX_BATCHES` 80). Stuck instance terminated, op marked FAILED, worker redeployed, forge relaunched programmatically (idempotency correctly blocked while active, allowed after FAILED). Result: ~15 batches in ~14 min, pagination discovery working on catoid=28, Founder watching it pass batch 20. R2 `bucket info object_count` confirmed stale-stat behavior again (S16 lesson).

## Notifications + Policies (same bundle)

- **Per-policy templates** on `effect_policy` (rules JSON): subject + body; **body auto-detects HTML** (HTML part + tag-stripped text alternative; var values HTML-escaped); rendered at DELIVERY time so edits hit queued dispatches; producers ship structured `vars`. Settled ADR-029's open "template storage shape" question.
- **`/t/[slug]/admin/notifications`** (Settings tab): recipients, dryRun, template editor with **live preview** (client component using the production render functions; sample vars per trigger family).
- **`/t/[slug]/admin/policies`** (Settings tab): read-only registry of ALL active Policy rows grouped by type, links to dedicated editors. Founder doctrine question answered honestly: policies govern per-domain today (grants/authority/effects/pipeline); a universal `can(actor, action, subject)` decision point is future ADR material.
- **Public policy projection**: `policies` collection existed but ADR-018 had orphaned it (projector only handled policy *entities*); `regeneratePolicyBlocks` now projects institutional-taxonomy Policy rows into `policy_block`s through draft→review→publish. Operational policy types NEVER project.

## State at close of this note

Forge chain in flight (step 1/10, batched, healthy ~batch 20+); watcher + worker tails running; everything since `9279e04` uncommitted by design. Remaining known debt: corveaux legacy worker deletion (Founder call), Resend domain already verified, prod parity notes in S32, dev-worker naming now CLEAN (all three `-development`).

## Related

- [[ADR-030 — Architect, Pipeline-Driven Provisioning, and the Pre-Demo Forge]]
- [[Corveaux V2 - Session 33 — CRM Pipeline Projections (ADR-029 Phase 2)]]
- [[Corveaux V2]]
