---
type: operations
status: draft
date: 2026-06-13
owner: Travis Hornbuckle
tags: [soc2, security, hecvat, access-control]
---

# Security Overview and SOC 2 Control Mapping

Corveaux's security controls, mapped to the SOC 2 Trust Services Criteria, with the
current vulnerability-scan findings and their status. Supports SOC 2 Type 2 and the
security sections of a HECVAT.

## Our posture, in plain language

- **Only the right people get in.** Signing in uses the institution's own identity
  provider; administrative access is restricted, and any time a Corveaux operator
  steps into a school's workspace it is recorded.
- **Every school is walled off from every other.** Separate databases, no shared
  data, no special-case code for any one school.
- **We write down who did what.** Access decisions, boundary crossings, and changes
  are logged to a tamper-evident trail.
- **Nothing ships without review.** Every change goes through pull-request review,
  automated checks, and a secret scan before it can reach production.
- **We watch the system and own our failures.** A public status page reports health;
  background jobs that stall raise alerts instead of failing silently.
- **We test ourselves.** We run security scans, fix what they find, and keep the
  record below.

The table that follows ties each of these to the formal SOC 2 criteria for an
auditor or a HECVAT reviewer.

## Architecture in one paragraph
A Next.js app on Cloudflare Workers; per-tenant Neon Postgres (no shared
`tenant_id`); R2 for artifacts. Institutional knowledge is a canonical model
(Entities, Relationships, Policies, Events, Time); everything else — pages, the
assistant, APIs — is a projection. Authority is capability-based (no tenant
name-checks). See `../decisions/` for the ADRs.

## Control mapping (SOC 2 TSC)

### CC6 — Logical & physical access
- **Authentication:** Microsoft Entra ID SSO (platform operators); per-tenant OIDC/Entra providers for institution identities — the identity boundary IS the tenant boundary ([[ADR-022|entitlements]], per-tenant auth providers).
- **Authorization:** `middleware.ts` gates `/admin` and `/t/{slug}/admin/*` (incl. server-action POSTs) behind `platform.operator`; `/api/tenant-admin/*` self-gates on the same. Capability + entitlement gating on modules (e.g. the assistant).
- **Break-glass:** platform operators may cross tenant boundaries; every crossing is **audited** (`tenant_boundary_crossing`, `access_decision`) with the licensing basis recorded.
- **Tenant isolation:** separate database per tenant; no cross-tenant queries.
- **Capability URLs:** the conversation read-key now travels in a header, not the URL (post-scan fix).

### CC7 — System operations / monitoring
- **Health + status:** a dedicated status worker probes each environment's components (per-component `/health` sub-checks: worker, database, storage, assistant) and renders a public status page with a manual incident banner.
- **Resilience:** a watchdog converts stalled async pipelines into `operation.stalled` events; dead-letter queues archive failed effects to R2 (no silent failures — [[ADR-029|effects layer]]).

### CC8 — Change management
- **No direct commits to master** — branch → PR → CI (`validate`: tsc + lint + build) → squash-merge.
- **Secret scanning** on every PR (GitGuardian).
- **Deployment evidence** recorded; migration-compatibility checked pre-deploy.
- Prod is gated behind an explicit founder promotion step (staging is the working environment).

### CC6.7 / C1 — Encryption & confidentiality
- TLS in transit; Neon + R2 encryption at rest (provider default — confirm in DPAs).
- Secrets are Worker/CI secrets, never in code (verified by scan — zero hardcoded secrets).

### P (Privacy) — PII handling
- Visitor PII is tokenized out before any LLM call and rehydrated on return; records retain the real text (audited). Operator answers are PII-screened before becoming public canon. See [[Data Handling and Retention Policy]].

## Audit logging
Structured audit events: `access_decision` (allow/deny at the edge), tenant-boundary
crossings, config changes (e.g. `tenant_assistant_config_updated`), conversation
operations, escalations, effect dispatches. Audit is the governance record and is
never itself an effects trigger (no loops).

## Vulnerability scan — 2026-06-13

| Finding | Severity | Status |
|---|---|---|
| Operator-approved answers could republish PII as public canon | HIGH (FERPA) | **Fixed** — PII gate on canonization (#23) |
| Inbound webhooks fail-open / no signature / no rate limit | MEDIUM | **Fixed** — Svix + Twilio signatures, header token, per-IP limit, fail-closed in prod (#23) |
| Capability key (`conversationKey`) in query string | MEDIUM | **Fixed** — moved to request header (#23) |
| Citation href scheme unvalidated (XSS via poisoned canon) | LOW | **Fixed** — http(s)/relative only (#23) |
| esbuild dev-server advisory | LOW (dev-only) | ☐ Open — bump pending (not shipped to workers) |
| `media/` prefix is fully public + immutable-cached | LOW | Accepted — keys unguessable; keep PII-sensitive media out |
| Per-action audit completeness on direct server-action POSTs | LOW | ☐ Confirm every mutating tenant-admin action self-audits |

**Baseline:** 0 production dependency vulnerabilities; no hardcoded secrets; no SQL
injection (Prisma parameterized); no tenant name-check anti-pattern.

## Open items
- ☐ esbuild bump (separate PR).
- ☐ Sweep all mutating tenant-admin actions for self-audit coverage.
- ☐ Formalize a penetration-test cadence + the evidence binder for the Type 2 window.

## Related
- [[Subprocessors and DPAs]] · [[Data Handling and Retention Policy]] · [[Incident Response Runbook]] · [[Environment and Secrets Inventory]]
