---
type: decision
domain: compliance
status: active
date: 2026-06-13
tags: [compliance, governance, soc2, iso27001, hecvat, ferpa, gdpr, accessibility, control-plane, vanta]
---

# ADR-038 — Compliance Control Plane

## Decision

Build a **continuous compliance control plane** inside the platform admin — Corveaux's own
"mini-Vanta" — that **measures, enforces, and maintains** adherence to every framework Corveaux
aligns with, on the canonical model. Control *definitions* live in code (a cross-framework
registry); mutable *attestation/scope/risk/vendor state* is **canon in the Corveaux tenant**;
the dashboard, the auditor binder, and the public `trust.corveaux.app` posture are **projections**
of (registry × live probes × canon). It is built **tenant-generalizable** so it becomes a future
`module_governance` inside any tenant. The defining rule: **honesty is structural** — status is
pessimistic and evidence-gated, so the dashboard *cannot* show green without real evidence.

## Context

Higher-ed buyers send HECVAT/security reviews and expect a credible, current compliance posture;
SOC 2 Type 2 / ISO 27001 / FERPA / GDPR / accessibility (ADA/WCAG/508) all apply. Paying for
Vanta was rejected — and a stale "our cert is good until next month" PDF is *weaker* than a live,
inspectable posture. Corveaux is a **governance-forward** platform, so doing this for Tenant Zero
("Corveaux Must Run Corveaux") both solves the immediate need and dogfoods a sellable governance
module. The platform already has the machinery to turn on itself: the canonical primitives
(Entities/Relationships/Policies/Events/Time), the S47 effects→push pipeline, the status-worker
health-probe pattern, S41 business-documents + S42 e-signature, and the watchdog/"no silent
fails" doctrine.

## Options Considered

- **Buy Vanta / Drata** — rejected; cost, and it can't model Corveaux's institutional doctrine or
  become a tenant module.
- **A static control-mapping doc** (the existing `operations/` set) — necessary but not
  sufficient; it goes stale and proves nothing continuously.
- **A platform-DB compliance store** — rejected; a parallel store violates "one reality," needs a
  platform migration, and doesn't generalize to tenants.
- **Canon in the Corveaux tenant + a code control registry (chosen)** — controls describe the
  system (code), state is canon (Policies/Events), surfaces are projections. On-axiom, no platform
  migration, tenant-generalizable, and the Event stream doubles as Type 2 operating-period evidence.

## How it works (summary)

- **Scope & frameworks** — a `compliance_scope` Policy defines the system boundary, the activated
  frameworks (from a full seeded catalog: SOC 2, ISO 27001, NIST CSF, GDPR, HECVAT, FERPA,
  WCAG/508, GLBA, Clery, Title IX, accreditation, state auth), and the SOC 2 TSC selection.
- **Controls** — a code registry; each control cross-maps to many framework criteria, carries a
  `criticality` and `reviewCadence`, declares its **enforcement point**, and is either *automated*
  (a probe) or *attested* (canon).
- **Honesty math** — status resolves pessimistically (`worst()`), green requires attached
  evidence, unknown/unmeasured ≠ green, stale/missing → amber-or-worse; no override greens without
  evidence.
- **Continuous** — a scheduled sweep runs the probes, records state changes as immutable Events,
  and a control *falling out of compliance* fires a **push to platform operators** (S47),
  severity-scaled by `criticality`, opening a remediation `compliance_finding` that stays open
  until the control recovers. A **monthly read-only agentic deep self-audit** (the night watch —
  advancing [[ADR-031 — On-call effector|ADR-031]]) reasons over the whole control set + evidence.
- **Enforcement & maintenance** — enforcement points are verified; self-enforcing jobs (retention
  deletion, DPA lapse, staleness, onboarding/offboarding) keep controls in place — destructive
  jobs are dry-run-first, provenance-verified, audited, operator-armed, behind guardrails.
- **Artifacts** — first-party letterheaded policies + signed attestations (S41/S42), the auditor
  evidence binder (print/PDF), RoPA + VPAT + risk-assessment reports, and the restrained external
  **`trust.corveaux.app`** posture (a curated, audience-scoped projection — no internals).

## Consequences

- **Honesty is enforced by construction**, not discipline — the trust/transparency posture
  survives a real spot check, which is the only way it has value.
- **Corveaux runs Corveaux**: compliance becomes a live projection of its own canonical model; the
  immutable Event stream is genuine operating-period evidence.
- **Tenant-generalizable** — no `if tenant == "corveaux"`; the control plane is one, the audience
  and frameworks are projections, so a `module_governance` is a later activation, not a rebuild.
- **Reuses, not rebuilds** — effects/push (S47), business-docs + e-sign (S41/S42), the health-probe
  pattern, audit, entitlement gating; the only new canon types are Policy/Event shapes.
- Certification remains **external** (an independent auditor over an operating period); the hub is
  evidence + live health, never a certification claim.
- Large surface — built in slices A→I behind this ADR, each shippable; the mutating-enforcement and
  agentic-audit pieces land last, behind guardrails.

## Build status (2026-06-13)

Slices **A–E shipped** (PRs #38–#43, master→staging): the framework catalog + cross-mapped
control registry + the honest status math; live probes (DB/health/config + GitHub REST +
PII-boundary self-test + TLS); the two cross-linked views (Endpoints ↔ Certs) with the
automated-vs-attested coverage split; the continuous sweep → immutable Events → operator push +
the remediation-finding loop; the auditor evidence binder (print/PDF) with the operating-period
Event history; and the two canon registries (risk register with control-linkage + staleness, and
the vendor/subprocessor 3PV registry whose DPA state drives the `subprocessor_dpas` control).
Plus **slice F's non-destructive maintenance core** (PR #44: staleness enforcement, enforcement-gap
backlog, retention dry-run) and a run of **founder-driven refinements** (PRs #45–#50): control
ownership corrected (the Office of the System is the policy/oversight owner; the controlling office
splits Platform vs People & Culture — the Office of Institutional Continuity is the customer
lifecycle / sales & retention office and owns no controls); **framework accuracy** — current
editions (ISO/IEC 27001:**2022**, NIST CSF **2.0** incl. GOVERN) and the **completeness denominator**
(`frameworkCriteria.ts` — readiness graded over each framework's full criteria set, so an unmapped
section reads as a gap); the **control library expanded 53 → 137** (ISO 100/100, NIST 22/22; 37
platform-enforced, 15 inherited from subprocessors under a new shared-responsibility status);
**evidence-gated attestation** (a control can't be Met until a document is uploaded or a system poll
confirms it); and **tenant parameterization** (a `tenantSlug` argument, so `module_governance` in any
tenant is not blocked).

Plus **slice G — the first-party document generator** (PR #51): 17 letterheaded, print-to-PDF
documents generated as projections of canon — the ISMS policy catalog (each stating the controls it
governs), per-framework attestation letters (e-signable with a hash-chained certificate), and the
RoPA / VPAT / Risk Assessment reports, stored as `business_document` Entities over R2 artifacts
(reusing the S41 billing machinery turned on Corveaux). The auditor's document stack.

**Slice H1 — the Trust Center SHIPPED** (PR #52): the public `trust.corveaux.app` as a host-bound app
route — an Anthropic-style projection of canon (framework + control-family coverage, subprocessors, a
document library) with **request → operator grant → tokenized download** access. Session 49 then made
that access flow **actionable end-to-end** (PRs #63–#69): a gated-document request now **pushes to
platform operators** (`compliance_access_requested` → the S47 effects/push pipeline) and is
**approvable/deniable from the companion app** (Admin · Trust tab + `/api/v1/admin/compliance/access-requests`),
not just the web hub — the decision core is shared (`applyAccessDecision`). The same session ran a
**probe-honesty** pass (TLS self-fetch 522, free-plan branch-protection 403, accessibility self-scan
limit, secret-scanning via GitGuardian) so cryptic ambers read as honest Unmeasured-with-reason, and
wired the inbound signing secret + seeded the push policies on staging.

Remaining: **F's destructive retention executor** (off-by-default, dry-run-first, operator-armed —
arming wants the founder), **I** (the monthly agentic deep self-audit), and the **honest residual**
(branch protection = free-plan ceiling; accessibility = needs an external CI scan). Activation TODOs
(worker env + seeds) live in the project memory. See [[Corveaux V2 - Session 49 — The Trust Center Access Flow and Honest Probes]].

## Related

- [[ADR-006 — Tenant Zero]] · [[ADR-029 — Effects Layer and Provider Rails]] · [[ADR-035 — The Unified Notification Model]]
- [[ADR-021 — Effective Dating on Entity and Relationship]] · [[ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation]]
- [[Security Overview and SOC 2 Control Mapping]] (operations/) — the seed control mapping
- [[project_business_substrate]] (S41 documents) · S42 e-signature · S47 organic push
