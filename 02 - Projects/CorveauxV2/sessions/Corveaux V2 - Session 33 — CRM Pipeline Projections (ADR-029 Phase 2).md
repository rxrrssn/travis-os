---
type: session
project: corveaux-v2
session: 33
date: 2026-06-11
tags: [corveaux, crm, pipeline, projections, events, policies, business-substrate, adr-029]
---

# Corveaux V2 - Session 33 — CRM Pipeline Projections (ADR-029 Phase 2)

## Focus

Same working session as [[Corveaux V2 - Session 32 — Effects Layer Phase 1 (ADR-029)]] (Founder: bundle commits, keep going). Built ADR-029 Phase 2: CRM as projections over the five primitives — **no CRM module exists**. A pipeline is: subject Entities related to an anchor Entity, stage as a Relationship attribute, every interaction/transition an immutable Event, and the board's shape declared by a **`pipeline_definition` Policy**. A foundation's donor pipeline is this same machinery with a different Policy (rule 4 honored — zero tenant special-casing; the admin nav shows Pipeline only where the Policy exists).

## What was built

**Canonical registry** (`src/types/institutional.ts`): `prospect_of`/`customer_of` relationship types; lifecycle event types `pipeline_entered`, `contacted`, `meeting_held`, `demoed`, `proposal_sent`, `contract_signed`, `stage_changed`, `note_logged`.

**Pipeline library** (`src/lib/pipeline/`):
- `contracts.ts` — `pipeline_definition` rules Zod schema (relationshipType, anchorCanonicalKey, subjectEntityType, stages with terminal flags, loggable eventTypes)
- `core.ts` — runtime-agnostic mutations the actions AND the verify script share: `addPipelineItem` (findFirst+create per the partial-unique-index lesson, idempotent on re-add), `logPipelineInteraction`, `movePipelineStage`. Every mutation writes the canonical Event **and fires the effects matcher** (`safeEvaluateEffectTrigger`) — the institutional-event side of the ADR-029 contract is now exercised, not just designed. Effect contexts stay PII-minimal: org names/stage labels only, interaction notes never leave the canonical store.

**Server layer** (`src/server/tenant-admin/pipeline-data.ts` / `pipeline-actions.ts`): board query (relationships grouped by stage + latest event per subject), item detail with timeline; actions wrap core with form parsing, tenant audit events (`tenant_pipeline_item_added` / `_interaction_logged` / `_stage_changed`), and revalidation.

**UI**: `/t/[slug]/admin/pipeline` — stage-column board, add-prospect form, per-card move-stage; `/t/[slug]/admin/pipeline/[relationshipId]` — record panel, log-interaction form, immutable timeline. Conditional **Pipeline** nav entry (renders only when a `pipeline_definition` exists; probe fails soft so a pre-migration tenant DB can't take down the admin shell). Board styles appended to `globals.css` from the existing token palette.

**Seeds/verification**: `scripts/seed-pipeline-definition.ts` (Corveaux "Sales Pipeline": identified → contacted → demoed → proposal → closed_won/closed_lost, anchored to `organization:corveaux`) — seeded on the corveaux dev DB. `scripts/verify-pipeline.ts` — **PASS**: add (created) → re-add (idempotent) → interaction → stage move → timeline `pipeline_entered → contacted → stage_changed` → and a temporary **dryRun effect_policy proved the institutional-event trigger path** (exactly 1 `SIMULATED` dispatch, nothing sent); self-cleaning by exact ids.

`tsc`, `cf:typecheck`, `lint`, `next build` all clean (both pipeline routes in the build manifest).

## Also this session (post-S32 closeout)

- Resend domain `corveaux.app` verified; sender = `notifications@corveaux.app`; real email delivered (see S32 note).
- Twilio direction settled: **toll-free** number for the marketing identity (voice inbound + SMS + WhatsApp; outbound dials from cell), DE-entity paperwork with IRS-exact matching; Founder's **compliance profile pending**. No code until effector phases need it.

## Shipped to staging (same session)

Bundle committed as **`9279e04`** (29 files, +2,040) and pushed; CI + Deploy Staging both green. Staging tenant DBs migrated, workers carry the effects drain, `RESEND_API_KEY` installed via the secret-bulk step, founder `effect_policy` seeded on both staging DBs by the new deploy step. **Staging now emails the Founder on operation completion/failure** — the SLCC rebuild at sprint-end inherits this automatically. Known gap: the deploy seed step covers `effect_policy` only — the staging `pipeline_definition` is NOT seeded, so the staging pipeline board 404s until `seed-pipeline-definition.ts` runs against the staging Corveaux DB (or the seed step is extended in the next bundle).

## Next direction settled (same session, not yet built): ADR-030 / Architect

Founder reframed automatic provisioning: the crawl-and-build chain runs **PRE-demo** — Corveaux walks into the first meeting with a personalized working tenant + Data Debt Report ("audit they can't unsee"). Consequences agreed in discussion: (1) the human gate IS the stage move (moving a prospect into demo-prep authorizes the ~$1-2 compute spend; propose-mode is reserved for closed_won → production provisioning); (2) the end-to-end chain (tenant record → DB → seed source → crawl → interpret → canonize → reconstruct → Data Debt → generate) fills the reserved **Architect** module slot (Session 20 roster); (3) the provisioning last-mile (per-slug pipeline edits) is now on the GTM critical path — recommended interim: **pre-provisioned demo-slot pool** (preserves rule-6 isolation), with **Workers for Platforms** (dispatch namespaces) as the structural ADR when volume justifies. Needs: effect_policy payload conditions, an `operation` effector channel (tenant→platform via the authenticated seam), prospect-keyed idempotency. ADR-030 offered, Founder response pending.

## State at close

Phases 1+2 **live on staging** (`9279e04`). Next: Founder loads real prospects; ADR-030/Architect decision; Phase 3 (Stripe) when there's something to bill. Prod untouched; SLCC rebuild parked for sprint-end; business gates pinned.

## Related

- [[Corveaux V2 - Session 32 — Effects Layer Phase 1 (ADR-029)]]
- [[ADR-029 — Effects Layer and Provider Rails]]
- [[Corveaux V2]]
