---
type: decision
domain: platform-architecture
status: active
date: 2026-06-10
tags: [corveaux, effects, workflows, events, policies, providers, stripe, mercury, email, sms, push, crm, billing]
---

# ADR-029 — Effects Layer and Provider Rails

> Status: **active** (approved as direction, Session 32). Generalizes [[ADR-025 — Push Companion App and Event-to-Device Projection]] §2-3 from one channel (push) to all outbound channels, and establishes the substrate the business tooling (CRM, billing, contracts) rides on. Extends ADR-002 (Events primitive), ADR-005/022 (capability gating), ADR-019 (Cloudflare runtime).

## The thesis

Events are canonical but today they are inert — the system records that things happened and nothing reacts. The effects layer makes Events **consequential** without adding a sixth primitive: a canonical Event occurs → a Policy decides → an outbound action fires through a provider. Push notifications, email, SMS, Stripe invoicing, bank activity, and e-signature are all this one shape.

Founder constraint (Session 32): "everything needs to rely on the primitives that already exist… nothing should EVER be bolt on. they should always act as expansions of the current model."

## Decision

### 1. An effect is a projection of an Event, never canonical

No new primitive. An effect (an email sent, a push delivered, a Stripe invoice created) is a projection of a canonical `InstitutionalEvent` to an outbound channel, exactly as ADR-025 §2 defines push. Effects hold no canonical state; deleting every effect record loses no institutional fact.

### 2. Effect rules are a Policy

"Which events trigger which actions on which channel for whom" is institutional logic → an **`effect_policy`** Policy type (string `policyType`, no migration — by design). Rules JSON declares: matched `eventType`(s), optional conditions over event payload/subject, target channel, template reference, and audience/capability gating reusing ADR-022 resolution directly. ADR-025's `notification_policy` becomes a specialization of (or alias for) `effect_policy` with `channel: push` — one mechanism, not two.

### 3. Delivery via transactional outbox, drained by the existing worker topology

The codebase already proves this pattern: `AuditEvent` → `AuditOutbox` → R2 export. Effects mirror it: when a written event matches an `effect_policy`, an **`EffectDispatch`** row (typed supporting table, ADR-022 pattern) is written in the same transaction — channel, payload projection, idempotency key, `PENDING/SENT/FAILED/DEAD` status, attempts. A Cloudflare Queue consumer in the existing tenant-worker topology drains it with retry/backoff. This answers ADR-025's open question "where the send worker lives." An effect failing can never corrupt canonical state — the event is already durable before any provider is contacted.

### 4. Providers are systems of execution; the canonical model is the system of record

Each channel sits behind one TypeScript **effector interface** — `push` (Expo, per ADR-025), `email` (Resend or Postmark), `sms` (Twilio), `stripe`, `esign`, `webhook` — swappable per channel. Provider credentials live in worker secrets, **never** in Policy rules or tenant DB rows. Don't rebuild what the rail provides: Stripe Billing executes invoices; Corveaux records the facts.

### 5. Inbound rail traffic is ingestion: webhooks become canonical Events

Provider webhooks (Stripe `invoice.paid`, Mercury transactions) are verified, deduplicated on the provider's event id, and written as canonical `InstitutionalEvent`s with provenance (rule 1 — the webhook payload/provider record is the source). Inbound events may themselves match effect policies (payment received → receipt email), with a chain-depth guard so effects cannot cascade unboundedly.

### 6. The business substrate is projections over this, not modules

There is no CRM module and no Billing module. Prospects/customers = Organization Entities; pipeline stages = Relationships + lifecycle Events (`contacted`, `demoed`, `contract_signed`, `invoice_paid`); pricing and contract terms = Policies; pipeline boards, invoices, and contracts are projections. A contract is a projection (parties + term Policies + template → document → e-sign effector → `contract_executed` Event). Discipline test: **if any piece demands bespoke logic that couldn't serve a university tomorrow, it is modeled wrong** — a foundation's donor pipeline is structurally this sales pipeline (rule 4).

## Context

Day 60 scope complete, pre-first-buyer, sole operator. Two needs converged: (a) operational — long-running operations (SLCC rebuild at sprint-end) and review queues should notify the operator instead of being polled; (b) strategic — Corveaux-the-company needs CRM/billing/contract tooling, and Corveaux Must Run Corveaux means that tooling must be the institutional model, not beside it. The effects layer is also the workflow/governance expansion story made real — it is product, not just internal plumbing.

## Options Considered

- **Bolt-on CRM/Billing modules** — rejected; builds a second reality for Corveaux's own data while selling One Reality (violates the axiom and rule 3).
- **External workflow engine (Temporal, Trigger.dev, n8n)** — rejected; an external state machine becomes a second source of truth for institutional logic, and Trigger.dev was already removed (Session 25, ADR-019 — Cloudflare-native runtime).
- **DB triggers / pg_notify** — rejected; institutional logic belongs in Policies, not hidden in database triggers; no capability gating, poor observability.
- **Synchronous effects in-request** — rejected; couples canonical writes to provider availability; a Stripe outage must never block recording a fact.
- **Policy-matched transactional outbox + queue consumer + effector interface** (chosen) — on-axiom, reuses the proven AuditOutbox shape and the existing CF worker/queue topology, observable (the dispatch table is the effect log), replay-safe via idempotency keys.

## Rationale

Every piece reuses something that exists: Events (ADR-002) gain consequence, Policies (ADR-002/018) gain a new string type, typed supporting tables (ADR-022) hold dispatch state, the outbox pattern is already proven (audit export), the queue consumer lives in the topology ADR-019 built, and capability gating is ADR-022 resolution unchanged. The only genuinely new code is the matcher and the effector interface — the narrowest possible addition that makes the whole business substrate expressible as projections.

## Stakeholders

- Travis Hornbuckle (Founder & CEO) — direction approved, Session 32.

## Consequences

- **Event emission becomes load-bearing.** Today events are sparse (extraction lifecycle, drift detection). Operation completion/failure and review-queue arrivals must reliably emit events or the layer has nothing to react to — first implementation step.
- ADR-025's push channel slots in as one effector; its `person_devices` registry still lands with HRIS Phase 2, but Tenant Zero can register the Founder's device early — Corveaux has People even though SLCC doesn't.
- Stripe/Mercury webhook ingestion requires platform-level inbound endpoints with signature verification and provider-id idempotency.
- An `effect_policy` admin surface (tenant admin) is eventually needed; v1 policies can be seeded.
- Scope calibration (zero customers today): effects engine + CRM projections get full effort; billing is a thin Stripe wrapper; Mercury starts read-only; contract generation waits for a real contract.
- Open questions: where `EffectDispatch` lives for *platform*-level triggers (TenantOperation status is platform DB, not tenant) — likely a platform twin of the tenant table; template storage shape (Policy rules vs content blocks); per-Person notification preferences (ADR-025 open question, unchanged).

## Addendum — Operating guards and subscription contract (same session, pre-build)

Founder asked "what are we missing?" before Phase 1 code. Five guards adopted into the v1 contract:

1. **Delivery allowlist per environment** — dev/staging effectors deliver only to `EFFECTS_DELIVERY_ALLOWLIST`; anything else is recorded `SUPPRESSED`, never sent. Prevents the staging-emails-real-people incident class. Staging is the working environment (prod untouched), so this is load-bearing from day one.
2. **Kill switch + origin matching** — global `EFFECTS_PAUSED` switch; every trigger carries an **origin** (`operator` | `pipeline` | `provider`) and policies match on it. Default posture: `pipeline`-origin events fire nothing unless a policy explicitly subscribes — corpus regens and the SLCC rebuild must produce one completion effect, not thousands of per-entity effects.
3. **Delivery mode reserved in the rules schema** — `delivery: immediate | digest{window}`. v1 implements `immediate` only; digests become a feature, not a migration. (Review-arrival notifications are digest-shaped; deferred to Phase 1.5.)
4. **PII-minimal payloads** — effects point at projections (links into the admin), never embed canonical facts; keeps provider choice non-load-bearing for FERPA/TCPA/CAN-SPAM when tenants eventually notify constituents. Tenant-branded sending (institution domain, SPF/DKIM) is named as a future onboarding workstream, explicitly not v1.
5. **Subscription contract** — effects subscribe to **institutional events and operation lifecycle, never audit events** (audit is the governance record, including of effects themselves — subscribing to it invites loops). Stripe scope: **platform-as-merchant only**; tenant-as-merchant (Stripe Connect) is deliberately inexpressible in v1.

Also: `dryRun: true` on a policy writes `SIMULATED` dispatch rows without sending; dispatch creation is replay-proof via a DB unique constraint on the idempotency key (CF Workflows replay steps; callbacks can double-fire).

**v1 resolution of the platform-trigger open question:** operation-lifecycle effects are evaluated **tenant-side** — both completion paths (the operation Workflow's report step and the extraction finalizer) already run in the tenant worker with tenant-DB access, so `effect_policy` rows and `EffectDispatch` live in the tenant DB and the existing `scheduled()` drain (AuditOutbox pattern) gains a second queue. No platform twin table needed yet.

## Related

- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-005 — Capability-Based Authority Model]]
- [[ADR-019 — Cloudflare and Neon Runtime Architecture]]
- [[ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation]]
- [[ADR-025 — Push Companion App and Event-to-Device Projection]]
- [[Corveaux V2]]
