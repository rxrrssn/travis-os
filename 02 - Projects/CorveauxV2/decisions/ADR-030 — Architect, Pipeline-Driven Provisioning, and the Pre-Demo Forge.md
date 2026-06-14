---
type: decision
domain: platform-architecture
status: accepted-direction
date: 2026-06-11
tags: [corveaux, architect, provisioning, pipeline, effects, demo, gtm, workers-for-platforms]
---

# ADR-030 — Architect, Pipeline-Driven Provisioning, and the Pre-Demo Forge

> Status: **accepted direction** (Session 33/34 discussion, Founder-driven). Extends [[ADR-029 — Effects Layer and Provider Rails]] (effects gain an action channel) and fills the **Architect** module slot reserved in Session 20. Build is phased; nothing here is yet code except the source-config capture (Add Source form, shipped with the SLCC from-scratch test prep).

## The thesis

The crawl-and-build chain runs **pre-demo**. Corveaux walks into the first prospect meeting with the institution already canonicalized: a personalized working tenant and a Data Debt Report — an audit they can't unsee. Provisioning is not a post-sale operation; it is the sales weapon, and it must be **mostly automated from the pipeline**.

Founder framing: "everything should be captured in the pipeline (or derived from pipeline fields) so that when provisioning does happen it's mostly automated."

## Decision

### 1. The pipeline is the provisioning manifest

A prospect's pipeline record carries everything Architect needs, modeled canonically — never a flat intake form:

- **Organization attributes** (institutional web-estate facts): `marketingUrl`, `catalogUrl`, `intranetUrl`, `address`, `proposedSlug` — extending the prospect Organization entity from ADR-029 Phase 2.
- **Contacts as Person entities** with `contact_for` Relationships carrying a role attribute (`primary`, `billing`); **stakeholders** are the same mechanism, plural. Never name-strings in attributes.
- Provisioning derivation: `proposedSlug` → tenant slug; `catalogUrl` → catalog source (+ patterns); `marketingUrl` → website source; `intranetUrl` → future authenticated source; contacts → tenant admin invitations later.

### 2. The human gate is the stage move

Moving a prospect into the demo-prep stage **is** the authorization — a deliberate act whose cost (a few dollars of crawl+extraction) is proportional to "worth a meeting." No separate approval ceremony. **Propose-mode** (`mode: "propose"` on the effect policy: operation created PENDING + notification, dispatched only on explicit approval) is reserved for expensive/irreversible chains — `closed_won` → production provisioning.

### 3. Architect = the forge chain

`stage_changed`(→demo-prep) Event → effect policy → operation chain: create tenant record → assign runtime → seed sources from pipeline fields → crawl → interpret → canonize → reconstruct pages → Data Debt snapshot → generate tenant. Architect (Session 20 roster) is the orchestrator of this chain — the Day 60 end-to-end module, now with a GTM job.

### 4. Effects layer extensions required

- **Payload conditions** in `effect_policy` rules (e.g. match `payload.to == "demo_prep"`) — today rules match only trigger type + origin.
- **`operation` effector channel** — alongside `email`: the drain enqueues a `TenantOperation` via the existing authenticated tenant→platform seam, with the same outbox/retry/guard semantics.
- **Business-level idempotency** — stage flapping produces distinct events; provisioning dedupes on the prospect's canonical key, not the event id.

### 5. Runtime provisioning: demo-slot pool now, Workers for Platforms later

The provisioning last-mile (tenant workers deploy via the GitHub pipeline; per-slug config) is on the GTM critical path. Interim: a **pre-provisioned demo-slot pool** (3-5 worker+DB+bucket slots through the existing pipeline; Architect assigns a free slot, runs the chain, wipes on demo-cycle end) — preserves rule-6 isolation, works today. Structural fix: **Cloudflare Workers for Platforms** (dispatch namespaces — one worker, N tenants routed at runtime), its own ADR when demo volume justifies the topology change.

### 6. Chain semantics: halt-on-failure, because order is authority topology

The forge sequence (catalog sources → website sources → reconstruct → generate) is not scheduling preference — it is [[ADR-028 — Source Roles and Authority]] executing: authority sources mint canon first; projection sources then bind, reference, and surface drift against it. A "best-effort continue past a failed catalog pass" was considered and **rejected by the Founder** (Session 34): "each preceding pass is canonical and foundational — the website should be the tie that assists in linking things together." A projection pass without its canon binds nothing and reports noise. A failed step therefore halts the chain, emails the founder, and waits for break-glass retry.

## Context

Settled across the same working session that shipped ADR-029 Phases 1+2 and the SLCC from-scratch reset. The SLCC manual end-to-end (admin panel, from zero) is the validation of exactly the chain Architect will automate — including its first finding: the Add Source form couldn't express crawl/extraction patterns (Day-30 scope-leakage class), fixed by capturing `allowedUrlPatterns`/`extractionUrlPatterns`/`maxPages`/`catalogYear` on the form into source metadata, which is precisely the config the pipeline will later derive from prospect attributes (§1).

## Options Considered

- **Provision on closed_won** — rejected; the generated tenant + Data Debt Report is the differentiated sales artifact, so it must exist before the meeting, not after the contract.
- **Separate approval workflow for demo forging** — rejected; the stage move already is a deliberate, auditable, cost-proportional human act.
- **Intake form / CRM fields outside the canonical model** — rejected; violates the no-bolt-on axiom. Capture is Organization attributes + Person/Relationship records.
- **Workers for Platforms immediately** — deferred; a real topology migration that shouldn't gate the first prospect meetings when a slot pool works today.
- **Shared demo worker across prospects** — rejected; tenant isolation is a security boundary (rule 6), demo data or not.

## Consequences

- ADR-029's `effect_policy` rules schema gains `conditions` and a second channel; the contract was designed for this (channel enum, reserved fields).
- The pipeline add/edit surfaces grow the manifest fields (§1) — organization attribute enrichment + contact/stakeholder management on the pipeline detail page.
- A `tenant.forge_demo` composite operation (Architect) enters the operation vocabulary; its progress is trackable like any TenantOperation and its completion email carries the Data Debt link.
- Demo-slot lifecycle (assign → forge → demo → wipe → return to pool) needs state on the platform side (slot registry) — designed with the pool, discarded cleanly if Workers for Platforms replaces it.
- Open: intranet sources imply authenticated crawling (credentials, scope, consent) — explicitly out of scope until a prospect actually offers intranet access.

## Stakeholders

- Travis Hornbuckle (Founder & CEO) — direction set, Sessions 33-34.

## Related

- [[ADR-029 — Effects Layer and Provider Rails]]
- [[ADR-023 — Page Reconstruction and Single-Source Page Binding]]
- [[ADR-026 — Data Debt Report and Staleness Detection]]
- [[ADR-008 — Generated Tenant Lifecycle]]
- [[Corveaux V2 - Session 33 — CRM Pipeline Projections (ADR-029 Phase 2)]]
- [[Corveaux V2]]
