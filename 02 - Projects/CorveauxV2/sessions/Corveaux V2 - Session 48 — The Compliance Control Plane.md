---
type: session
project: corveaux-v2
session: 48
date: 2026-06-13
tags: [corveaux, compliance, governance, soc2, iso27001, hecvat, ferpa, gdpr, vanta, control-plane, risk-register, vendors, adr, autonomous]
---

# Corveaux V2 - Session 48 — The Compliance Control Plane

**Merged:** PRs **#38–#43** — six bundles, each squash-merged on green CI (master → staging).
**Builds:** `tsc` (app) / `cf:typecheck` / `eslint` green throughout; headless assertions on the pure helpers (14 status-math, 12 risk/vendor) pass.
**ADR:** [[ADR-038 — Compliance Control Plane]] (new — written this session).
**Mode:** mostly **autonomous** — the founder stepped away mid-session with full authority to continue. Built A–E of the plan (`dreamy-splashing-lake.md`) and stopped before the sharpest slices (F/G/H/I) by design.

A heavy plan-mode ideation (the founder rejected ExitPlanMode several times to layer in requirements) produced the design for Corveaux's own **"mini-Vanta"**: a continuous-compliance command center in `/admin` that measures, records, and pushes on Corveaux's real adherence to every framework it's chasing. The defining requirement, stated emphatically: **honesty is the product, built into the math — an honest amber beats a faux green.** Then the build, in slices.

## The doctrine (what the build had to hold)

- **Honesty is structural, not disciplinary.** Status is pessimistic (`worst()`-wins) + evidence-gated: green requires real evidence, unmeasured renders Unmeasured (never green), a "met" without evidence degrades to amber. It *cannot* show a false green — so a spot check can't catch it lying. That is the entire trust play.
- **Continuous, not a snapshot** — sweep → immutable Events → push to operators on regression (reusing S47 effects/push). The Event stream doubles as the SOC 2 Type 2 operating-period evidence.
- **Not a certification claim** (cert is external) — "invite the spot check; steward accountably."
- **Tenant-generalizable** — no `if tenant == "corveaux"`; this dogfoods a future `module_governance`. Control *definitions* in code; mutable *state* (scope/attestations/risks/vendors/findings) is **canon in the corveaux tenant**; every surface is a projection.

## What shipped — slices A–E

- **A** (#38): the framework **catalog** (`frameworks.ts` — SOC 2, ISO 27001, NIST CSF, GDPR, HECVAT, FERPA, WCAG/508, GLBA, Clery, Title IX, accreditation, state auth; tenant-activatable via a `compliance_scope` Policy), the cross-mapped **control registry** (`controls.ts`, ~30 controls with criticality + enforcement point + review cadence), the honest **status math** (`status.ts`), the data layer, the two cross-linked views (Endpoints ↔ Certs), attestation edit (superseding, audited), nav + shield icon.
- **B** (#39, +#40): live **probes** (`probes.ts` — audit freshness, tenant isolation, break-glass, system health, stalled ops, per-tenant auth, inbound fail-closed, prod secrets, a PII-boundary self-test, accessibility baseline, TLS/HSTS) + **GitHub REST** probes (branch protection / secret scanning / Dependabot). #40 answered the founder's "there's a lot of attestation on SOC 2": SOC 2 is a *process* standard (attestation-heavy by nature, even in Vanta), so I converted the one genuinely measurable control (TLS) to automated and surfaced an **automated-vs-attested coverage** split on the hub — making the mix intentional, not accidental.
- **C** (#41): the **continuous loop** — `runComplianceSweep` diffs probe results against a `compliance_posture` Policy; a control falling out writes an immutable Event, opens a `compliance_finding` (stays open until restored), and fires an operator **push** (severity-scaled by criticality). Edge-triggered; first run = silent baseline. `compliance` notification category + trigger; bearer-gated `/api/cron/compliance-sweep` called from the corveaux worker cron (config-gated by `COMPLIANCE_SWEEP_URL`); on-demand "Re-run checks".
- **D** (#42): the auditor **evidence binder** (`/admin/compliance/report`, print → PDF) — cover + scope + system description + per-framework readiness + the full control matrix (status captured at generation) + the **operating-period record** (the `compliance_control_*` Event history). `?framework=` scopes it; reuses the existing `report-document` print CSS. States plainly: live posture, evidence-gated, not a cert claim.
- **E** (#43): the two **canon registries**. The **risk register** (`risks.ts`, `/risks`) — each risk a `compliance_risk` Policy keyed by a stable `riskKey` (supersede = review history), L×I scored + residual, banded, sorted worst-first, **linked to mitigating controls**, stale-flagged past cadence. The **vendor / subprocessor (3PV) registry** (`vendors.ts`, `/vendors`) — vendors are `organization` Entities related to the Corveaux org; the `subprocessor_dpas` probe now reads it **live** (missing/expired DPA fails the control → Event → push; a lapsed "on file" is honestly re-derived as expired).

## Where I stopped, and why

A–E is a complete, coherent, shippable core: the live hub + continuous loop + remediation + auditor binder + both registries. The remaining slices are the **sharpest tools**, and the plan itself flags them to land last:

- **F** — enforcement/maintenance jobs including **destructive retention deletion/redaction**. Off-by-default, dry-run-first, provenance-verified, operator-armed. Building data-erasure paths while the founder is away is exactly the hard-to-reverse work that wants their presence to design the arming.
- **G** — the first-party **letterheaded document generator** (policies + signed attestations + VPAT/RoPA). The largest slice; reuses S41 business_document + S42 e-sign.
- **H** — `trust.corveaux.app`, the **external-facing** restrained posture. Outward-facing, so the curated allowlist wants review before ship.
- **I** — the monthly **agentic deep self-audit** (the night watch; advances [[ADR-031 — On-call effector|ADR-031]]). Lands last, once the deterministic core is proven.

## To fully activate (founder TODOs)

Set `COMPLIANCE_SWEEP_URL` on the corveaux worker + run `scripts/seed-push-policies.ts` (the sweep + operator push); add `GITHUB_TOKEN` (GitHub probes → `na` without it) and `COMPLIANCE_A11Y_URL` (accessibility scan). Seed the risk register + the vendor list — especially the subprocessors (Cloudflare, Neon, Resend, R2, Stripe, Twilio, Azure/Entra) so the `subprocessor_dpas` control measures something real. Nothing fires until set; the hub + on-demand re-run work now. Prod untouched. Mirror-hardening **PR #37 remains UNMERGED** (founder held it for a render check).

## Continued — slice F safe core + the founder review (PRs #44–#50)

The founder re-engaged and the session kept going, producing seven more merged PRs:

- **Slice F (safe core)** (#44): the enforce-and-maintain pillar, non-destructive half — staleness enforcement (attestations + risks past cadence → a backlog finding, no push), the enforcement-gap backlog, and a read-only retention dry-run. The destructive retention *executor* stays unshipped (arming wants founder presence).
- **Ownership corrected** (#45, #46): I'd mis-read "Office of Institutional Continuity" as business-continuity and made it the owner of ~16 governance/risk/privacy controls. The founder corrected it — per `vision/Corveaux Institution Model`, OIC is the **customer lifecycle / sales & retention** office (Discovery→Onboarding→Success→Renewals→Expansion) and owns no compliance controls. Refactored to two roles: **policy & oversight = the Office of the System** (it sets policy and is the check-and-balance running the hub), and the `owner` field = the **controlling office** (Platform for security/IAM/infra, People & Culture for personnel, System for admin/governance).
- **Evidence-gated attestation** (#47): a control can't be claimed Met until the system holds the evidence — `evidenceMode` "document" (HECVAT/pen-test/IR/restore/DPA: a hard gate, must upload to R2 first; operator-gated download route) or "poll" (security training is now automated via an HRIS-LMS probe, honest `na` until connected).
- **A sharp framework audit** from the founder produced the two board items, both shipped:
  - **Edition refresh** (#48): ISO/IEC 27001 → **2022** Annex A, NIST CSF → **2.0** (incl. the GOVERN function — fittingly absent from a governance hub until now), citation loose-joints re-filed.
  - **The completeness denominator** (#48): `frameworkCriteria.ts` enumerates each framework's **full criteria set** at current edition; readiness now grades over the whole set, so an unmapped criterion is a gap, not invisible — the one overclaim the honesty engine otherwise couldn't catch. Hub + binder show "X of N criteria mapped."
- **Control library 53 → 137** (#49): built out the full ISO 27001:2022 Annex A as the cross-mapping spine. ISO **100/100**, NIST **22/22**, SOC 2 54/56, GLBA 9/9, FERPA 7/7. Honest enforcement: 37 enforced in code, **15 inherited** from subprocessors (a new shared-responsibility status — physical/infra evidenced by the provider's own SOC 2, so a serverless platform reads neither a false "enforced" nor a "gap").
- **Tenant-parameterized** (#50): the lib entry points take `tenantSlug = COMPLIANCE_TENANT`, so `module_governance` in another tenant is a slug argument, not a rewrite — answering the founder's "don't let it block other tenants." (It was never an `if tenant ==` branch; authority stays capability-based.)

The meta of it wasn't lost on either of us: this is Corveaux running its own governance on its own canonical model — building the auditor's denominator *for the engine that grades denominators*. Rule #3 in its purest form.

## Slice G — the document generator + the Trust Center plan (PR #51)

The sprint continued into the auditor document stack:

- **Slice G** (#51): the **first-party document generator** — 17 letterheaded, print-to-PDF documents, each a *projection of canon* (no prose the registry doesn't already assert): the 13-policy ISMS catalog (each stating the controls it governs), per-framework **attestation letters** (listing what's evidenced met, e-signable with a sha256 hash-chained certificate — defensible, not a screenshot), and the **RoPA / VPAT / Risk Assessment** reports. Built on the S41 business-document machinery turned on Corveaux: a new "executive memorandum" letterhead (onyx/gold, 8.5×11), canon-driven builders, generate/regenerate (R2 artifact + `business_document` Entity, canonical-keyed + superseded, audited) and sign, the `/admin/compliance/documents` catalog + an operator-gated view route. Verified headless: all 17 build, zero unresolved tokens.

- **Phase H — the Trust Center — planned with the founder** (not yet built). The founder's steer: an **Anthropic-style Trust Center** at `trust.corveaux.app`, which is "so meta" and "aligns really well with the canonical model" — because it's literally *One Reality, Many Projections* pointed outward. Decisions locked: deploy as a **host-bound app route** (not a separate worker — the posture is DB-backed canon); **category-coverage** detail (framework badges + posture + control families, no per-control internals); **document access = request → operator grant → tokenized download** (a canonical `compliance_access_request` Policy, operator approval, an unguessable time-limited token, audited; public docs free, SOC 2/pen-test gated behind a single reviewable allowlist projector). Built on G's documents. The plan lives in `dreamy-splashing-lake.md`.

## Open threads (carried)

- EAS Update CI for the companion app — offered (needs an `EXPO_TOKEN` secret + config + one build), still the founder's call.
- ADR-038 remaining: **H (Trust Center — next)**, F's destructive retention executor, I (agentic self-audit).
- Founder TODOs to activate: `COMPLIANCE_SWEEP_URL` + seeds, `GITHUB_TOKEN`, `COMPLIANCE_A11Y_URL`, `COMPLIANCE_LMS_URL` (training poll); upload the subprocessor SOC 2/ISO reports so the 15 inherited controls evidence honestly; and (for H) a `TRUST_HOST` env + the `trust.corveaux.app` custom domain.
