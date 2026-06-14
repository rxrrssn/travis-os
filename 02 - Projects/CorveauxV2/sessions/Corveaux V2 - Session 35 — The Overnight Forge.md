---
type: session
project: corveaux-v2
session: 35
date: 2026-06-11
tags: [corveaux, forge, architect, overnight, slcc, data-debt, incidents, doctrine, commit]
---

# Corveaux V2 - Session 35 — The Overnight Forge

## What happened

The first end-to-end pipeline-driven forge. Founder added SLCC as a prospect on `/t/corveaux/admin/pipeline` (~00:50) with the full manifest (slug, catalog URLs, website, contacts) and moved the card to **Demo Requested**. Architect launched a 10-step chain; ~6.5 hours of machine time later (with Founder awake the whole way — "committed to the bit"), SLCC existed: canon, governance corpus, pages, and a hostile-review-proof Data Debt Report. Committed as **`06be78f`** (46 files, +3,021) and pushed; CI → staging in flight at note time.

## The forge verdict

2,017 courses · 154 programs (cross-check vs the 132-program live index queued) · 16 policy entities · 1,627 relationships · **4,287 Policy records across 21 institutional types** (eligibility 800, governance 1,221, enrollment 481…) · 6,423 blocks (incl. **4,252 policy_blocks** through the midnight projection wiring) · 3,015 reconstructed TenantPages · 8,523 observations promoted · **~$18.07 total extraction spend**.

**Data Debt (adjudicated):** 95 fact-drift events · **49 true ghost programs** (promoted on pages reachable from slcc.edu, existing nowhere in current canon — Accounting, Marketing Management, Commercial Baking, the old IT-cert family…) · **11 offerings promoted under superseded names** (fuzzy-adjudicated: Criminal Justice, Family & Human Studies, Game Design…) · 211 stale-edition links (catoid=17 era) · severity: severe (weighted: dangling ×4, drift ×5, stale-link ×2). Demo claim: *"~49 promoted programs don't exist; 11 more are promoted under names you've changed; 211 links route visitors to a catalog two editions old — every instance cited."* Substantiation pass: 7 of the ghosts match Session 30's independently verified discontinued list; the adjudicator also caught that S30's "Game Development discontinued" likely has a renamed successor (Game Design & Development cert) — the system out-skeptic'd our own prior ground truth.

## Six structural defects, found and killed in live fire

1. **Crawl step ceiling** (duration): cold 4,175-page crawl can't fit one Workflow step → **batched crawl** (frontier state between steps).
2. **Cross-worker fetch wall** (CF error 1042): platform worker can't fetch tenant workers on workers.dev → **chain advances via callback RESPONSE** (`dispatchNext`) + tenant worker's own workflow binding; deterministic instance ids.
3. **Orphaned claims + silent message death**: mid-run deploys killed consumer invocations; RUNNING items unclaimable; retries burned out with no DLQ (messages vanish) → stale-claim reclaim (10 min), break-glass **/v1/extraction/requeue**, unstick scripts; DLQs queued (#16).
4. **Finalizer mega-invocation** (duration ×2): promote 6.2k obs + project 2k blocks in one consumer call died at the wall; uncatchable death leaves PROMOTING runs whose retries SELF-ACK (silent forever) → **local rescue-finalize** (resumable promotion proved itself: zero loss), full batching queued (#21). Also: completion metadata REPLACE dropped sourceSlug → phantom "DERIVED" source rows; now MERGES.
5. **Reconstruct memory ceiling**: all pages' HTML in one 128MB heap → **batched capture/bind steps + R2 findings spill**.
6. **Slug collision**: `pageSlugFromUrl` ignored query strings — 600 catalog pages collapsed into 2 rows (caught by Founder: "wait did I read that right?") → slugs now include identifying query params; junk swept; relaunched (4,175 distinct pages).

Plus: **Acalog double-URL-shape cost leak** caught mid-run by Founder watching the Anthropic console ($7.31 at 1,065 pages → projected $27): 1,895 duplicate pending pages neutralized mid-flight (~$13 saved), item-level coid/poid dedupe now in the crawl assembly. Courses landed ~$14.5.

## Founder doctrine set tonight (memory updated)

- **No silent fails** (feedback memory): every async path needs a loud terminal state; watchdog converts staleness into Events (#17).
- **No invisible progress** (#20): phase + live counters on runs/operations ("i dislike being blind to what is happening").
- **Ingest doctrine** (project memory): ingest is ONE-TIME onboarding; the wedge is **consolidate and align**; at cutover the legacy site+catalog are decommissioned — the generated tenant IS the institution's web presence. Pre-cutover catalog pulls = monthly integration sync (#30). **Academic scheduling is the Modern Campus cutover-gating feature** (displacement-roadmap keystone).
- **Governed post-ingest editing** (#29): canon is the editable thing (S24 pattern holds); scoped ADR-022 capabilities; operator edits = highest-precedence source (ADR-028 swallows manual editing).
- Severity/accreditation framing: ghost-program promotion sits in NWCCU integrity-standards + ED misrepresentation (34 CFR 668.71-75) territory — credible compliance exposure, not FUD. Systemic-and-known across higher ed = platform sale (consolidation removes the substrate; detection tools just queue tickets).

## Also tonight

- **Policies authority experiment** (Founder-directed): `slcc-policies` source registered + granted authority for the policy entity type (first per-domain grant beyond catalog) → 300-page extraction minted **1,809 Policy records** (~$3.50, pages avg 10k tokens). Recrawl mapped the full subtree (622 pages + 294 PDFs; tail = scheme-twins + stubs, delta extraction correctly declined). Policies reconstruct dispatched post-chain (op `270bbabe`). PDFs await the doc-pipeline port (#25 — discovery alive, extractDocument alive, orchestration died with Trigger.dev).
- **Notification templates**: per-policy subject + HTML-aware body, delivery-time render, live-preview editor (production render functions), `/t/[slug]/admin/notifications`.
- **Policies registry** `/t/[slug]/admin/policies` + **public policy projection** (`regeneratePolicyBlocks` → policies collection; ADR-018 had orphaned it).
- **SEO**: noindex on all non-production builds shipped in the commit; full SEO layer + JSON-LD-from-canon = #24.
- Backlog grown deliberately (#16-31): hardening, observability, UX revamp ("generic SaaS is bleh"), self-hosted work tracking (the registry already reserves PROJECT/TASK/TICKET/INCIDENT — pipelines as Linear/ITSM), workflow-builder ADR candidate, ghost-audit standing script.
- Break-glass toolbox now version-controlled (`scripts/_*`) — every tool forged mid-incident and used in anger.

## State at close

Chain `[10/10]` COMPLETED · commit `06be78f` pushed · **Deploy Staging: SUCCESS** (CI green) · **corpus PROMOTED to staging on Founder's go** (`scripts/promote-tenant-corpus.ts`: 38,261 rows dev→staging *branch* — staging is a Neon BRANCH inside each tenant project, production is the default branch, pre-deploy restore branches auto-snapshot each deploy; staging's 61 audit events preserved; migration-head parity verified pre-copy). Staging now runs tonight's code over tonight's corpus: `staging.corveaux.app/t/slcc` is the forged college. R2 cache copy skipped (S3 token scoped to legacy buckets — morning item if wanted). Policies reconstruct (step 11) ran post-chain. Dev runtime fully on `-development` workers. Founder awake through sunrise by choice; work at 09:00. The product thesis was demonstrated end-to-end for the price of a steak dinner.

## Related

- [[Corveaux V2 - Session 34 — Architect Live, From-Scratch Forge, and the Batched Crawl]]
- [[ADR-029 — Effects Layer and Provider Rails]]
- [[ADR-030 — Architect, Pipeline-Driven Provisioning, and the Pre-Demo Forge]]
- [[Corveaux V2]]
