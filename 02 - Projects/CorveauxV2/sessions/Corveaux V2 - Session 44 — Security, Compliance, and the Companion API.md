# Corveaux V2 — Session 44 — Security, Compliance, and the Companion API

**Date:** 2026-06-13
**Merged:** PR #23 (security hardening), PR #24 (projection API). History trimmed to genesis + last 4 and deployments pruned to latest 4 at the prior session's close.
**Builds:** tsc / lint green throughout; PRs watched through CI and squash-merged.
**ADRs:** [[ADR-032 — The Institutional Assistant, Canonical Grounding, and the PII Boundary]] (prior), [[ADR-034 — Companion App Projection API and Mobile Auth]], [[ADR-035 — The Unified Notification Model]] (proposed).

A pivot from building features to **hardening, compliance, and the next surface** —
the companion app's API. Three movements.

## 1. Security scan + hardening (PR #23)

A self-scan through the FERPA / SOC 2 Type 2 / HECVAT 4 lens. Baseline strong (0
prod dep vulns, no hardcoded secrets, no SQLi, no `if tenant ===`, tenant isolation,
audited break-glass). Findings fixed:
- **HIGH (FERPA):** operator-approved answers could republish PII as public canon →
  `recordApprovedAnswer` now screens with `containsPII` and skips canonization (records
  `answer_canonization_skipped`) when PII is present.
- **MEDIUM:** inbound webhooks were fail-open → `inbound-auth.ts` adds Svix (Resend) +
  X-Twilio-Signature verification, a header token, per-IP rate limiting, and
  **fail-closed in production**.
- **MEDIUM:** the conversation read-capability key moved from the query string to a header.
- **LOW:** widget citation hrefs scheme-validated (no `javascript:`).
- **esbuild advisory:** correctly NOT forced — it's a build-toolchain dep (wrangler/
  @opennextjs), never shipped to the worker, transitively pinned; documented, not patched.
- Dumped 36 one-off `scripts/_*.ts`; kept `_staging-pass.ts`.

## 2. Operating documents + HECVAT (vault)

New `operations/` directory, plain-language and posture-forward (founder: *"very
human readable… convey the security posture we are assuming"*):
[[Subprocessors and DPAs]], [[Data Handling and Retention Policy]] (incl. the FERPA
rights + a planned **per-tenant field-level encryption** for the expansion tables —
founder's question, a future ADR), [[Security Overview and SOC 2 Control Mapping]],
[[Incident Response Runbook]], [[Environment and Secrets Inventory]], [[Inbound Channel Connection Runbook]], and the [[Expo App Integration Guide]].

Parsed the real **HECVAT 4.16** workbook and drafted honest answers ([[HECVAT 4.16 — Draft Responses]]). Proxy score from the draft: **~42% Yes / ~57% with partial
credit; 34% Yes on critical questions** — "strong architecture, light on
formal process/attestation." Biggest cheap movers: DPAs, BCP/DRP/IR + a pen test,
confirm the Partial items, a training record, the field-encryption, a VPAT. The AI
tab is the standout (PII never reaches the model; no training on data).

## 3. The companion app — API built, design riffed

**Built + merged (#24):** the typed `/api/v1/{tenant}/…` projection API — public
reads (`/home`, `/collections/…`, `/search`) reusing the rendering projections, and
authed `/me` (GET + PATCH self-service). Mobile auth = **verify the institution's IdP
token via JWKS (jose); Corveaux issues no tokens.** Typed DTOs in
`src/lib/api/contracts.ts` so the app can't drift. See [[ADR-034]].

**Designed (founder riff, to build):**
- **Boot:** single app → institutional email → resolve tenant by `brandConfig.emailDomains`
  (on the tenant registry, mirroring `customDomains`) → open the IdP with email
  prefilled → **white-label** on success. App lives **in-repo** (`apps/mobile`), shared types, no drift.
- **Assistant = a splash**, and whether it leads is a **user setting**.
- **Home = "all about me"** — an adaptive dashboard projecting the person's edges
  (record, tasks = reviews-due + assigned conversations + approvals, pages stewarded,
  courses when enrollment is canon). Renders the tiles the person's edges support.
- **Push is the soul** — and the founder's framing collapses it cleanly: *"if it
  could be an email or a text, push is just another extension of those."* → the
  **unified notification model** ([[ADR-035]]): channel-agnostic (email/SMS/push on
  the effects bus), recipient-scoped by capability, **per-category × per-channel**
  preferences, with the category taxonomy as a **data registry** (start wide, pare
  down). Closes the on-call loop: `operation.stalled` + status incidents → the
  platform admin's "Outages & health" push.

## Next
- Build order (founder to greenlight): `brandConfig.emailDomains` + `/institutions/resolve`
  → the unified notification model (push effector + device registration + category
  registry + preferences) → the `apps/mobile` Expo scaffold → `/me/home` aggregation.
- Compliance "Planned → Yes": DPAs, BCP/DRP/IR, pen test, field-level encryption ADR, VPAT.
- Holds unchanged: prod untouched; SMS wired-not-connected until its signature path is live.

## Related
- [[ADR-034 — Companion App Projection API and Mobile Auth]] · [[ADR-035 — The Unified Notification Model]]
- [[operations/README|Operating Documents]]
- [[Corveaux V2 - Session 43 — The Conversations Hub and the Five-Primitive Assistant]]
