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
- **Break-glass:** platform operators may cross tenant boundaries — on the **web** (middleware) and on the **mobile admin API** (the `x-corveaux-operator-home` path, verified against the operator's home IdP, PR #36). Every crossing is **audited** into the visited tenant's trail (`tenant_boundary_crossing`, `access_decision`) with the licensing basis recorded.
- **Tenant isolation:** separate database per tenant; no cross-tenant queries.
- **Capability URLs:** the conversation read-key now travels in a header, not the URL (post-scan fix).

### CC7 — System operations / monitoring
- **Health + status:** a dedicated status worker probes each environment's components (per-component `/health` sub-checks: worker, database, storage, assistant) and renders a public status page with a manual incident banner.
- **Resilience:** a watchdog converts stalled async pipelines into `operation.stalled` events; dead-letter queues archive failed effects to R2 (no silent failures — [[ADR-029|effects layer]]).

### CC8 — Change management
- **Process-enforced (not platform-enforced):** every change goes branch → PR → CI (`validate`: tsc + lint + build; GitGuardian) → squash-merge on green; no direct commits to master in practice. NB — GitHub branch protection / rulesets and *required* status checks need a **paid plan** for a private repo, so this control rests on the documented workflow + CI discipline, not a server-side branch rule. The compliance hub reports this honestly (it does not claim GitHub enforcement).
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

## Vulnerability scan — 2026-06-13 (first pass, PR #23)

| Finding | Severity | Status |
|---|---|---|
| Operator-approved answers could republish PII as public canon | HIGH (FERPA) | **Fixed** — PII gate on canonization (#23) |
| Inbound webhooks fail-open / no signature / no rate limit | MEDIUM | **Fixed** — Svix + Twilio signatures, header token, per-IP limit, fail-closed in prod (#23) |
| Capability key (`conversationKey`) in query string | MEDIUM | **Fixed** — moved to request header (#23) |
| Citation href scheme unvalidated (XSS via poisoned canon) | LOW | **Fixed** — http(s)/relative only (#23) |
| `media/` prefix is fully public + immutable-cached | LOW | Accepted — keys unguessable; keep PII-sensitive media out |

## Vulnerability scan — 2026-06-13 (fresh full pass, post-#36)

A full-codebase pass after PR #36 (companion-app surface). Covered: token verification,
authorization/route coverage, tenant isolation, the new mobile break-glass, injection,
secrets, XSS/sanitization, CORS, PII, webhooks, the new `/me/*` + `/admin/tenants` endpoints.

| Finding | Severity | Status |
|---|---|---|
| **Mirror HTML sanitizer is a bypassable regex.** `stripExecutableHtml` (regex) is the *sole* XSS defense for operator-authored mirror pages served to the **public** via `/t/{slug}/m/` (root-served homepages). Misses unquoted event handlers (`<img src=x onerror=…>`), single-quoted/unquoted `javascript:`, and leaves `<iframe>/<object>/<embed>/<form>` intact (phishing/clickjacking on the institution's own domain). No CSP header on mirror responses. | MEDIUM (→HIGH when tenant-local admins ship) | ☐ Open — see remediation |
| **Draft mirror pages publicly readable.** Middleware's protected set omits `/t/{slug}/m/`; direct `/m/` access serves drafts (the PUBLISHED gate only applies to root-served traffic). The documented "operator preview" is not operator-gated → unpublished content disclosure by slug guess. | MEDIUM | ☐ Open — gate `/t/{slug}/m/` to `platform.operator` |
| esbuild dev-server advisory | LOW (dev-only) | ☐ Open — bump pending (not shipped to workers) |
| Per-action audit completeness on direct server-action POSTs | LOW | ☐ Confirm every mutating tenant-admin action self-audits |

### Reviewed and sound (no finding)
- **#36 mobile break-glass:** the `x-corveaux-operator-home` header only *selects the verifier*; the token is cryptographically verified against that home IdP and `platform.operator` is required there — neither forgeable. Every crossing is audited into the **visited** tenant's trail (`recordApiBoundaryCrossing`).
- **`/me/alerts`** scopes to the caller's own `personEntityId` + own email — no cross-person leakage.
- **Auth:** per-tenant JWKS verification with issuer **and** audience checks (`api/auth.ts`); the per-tenant identity boundary is enforced in both middleware and the API gate.
- **Isolation:** database-per-tenant; the only raw SQL is static/parameterized (`SELECT 1` health, a static Neon `tenants` read); no cross-tenant queries.
- **Hygiene:** no hardcoded secrets; no `eval`/`new Function`; Prisma parameterized; Zod validation on mutating endpoints; open-redirect on `callbackUrl` blocked; CORS `*` is acceptable for a Bearer-only API (no cookies); the captured-content sanitizer (`sanitizeSectionHtml`) correctly uses the `sanitize-html` library.

### Remediation — mirror sanitizer (the headline finding)
The proper fix is **not** a better regex. Replace `stripExecutableHtml` with `sanitize-html`
configured to **preserve** GrapesJS fidelity (structural tags, `class`/`id`, `style`
attributes via `allowedStyles`, `<style>` tags) while parser-dropping scripts, event
handlers, `javascript:`, and `<object>/<embed>/<form>` — with `<iframe>` allowlisted to
known embed hosts (YouTube/Vimeo) so video blocks survive. Add a **Content-Security-Policy**
header to `/m/` responses as defense-in-depth. Requires testing that real mirror designs
render unchanged before shipping (don't break the demo). *Currently mitigated: only
platform operators can author mirror HTML — there are no tenant-local admins yet — so this
is latent, not live; fix it before tenant-local admin authoring ships.*

## Open items
- ☐ **Mirror sanitizer → `sanitize-html`** + CSP on `/m/` (the headline finding; test design fidelity first).
- ☐ **Gate `/t/{slug}/m/` to operators** (close the draft-disclosure; aligns the route with its "operator preview" intent).
- ☐ esbuild bump (separate PR).
- ☐ Sweep all mutating tenant-admin actions for self-audit coverage.
- ☐ Formalize a penetration-test cadence + the evidence binder for the Type 2 window.

**Baseline:** 0 production dependency vulnerabilities; no hardcoded secrets; no SQL
injection (Prisma parameterized); no tenant name-check anti-pattern.

## Related
- [[Subprocessors and DPAs]] · [[Data Handling and Retention Policy]] · [[Incident Response Runbook]] · [[Environment and Secrets Inventory]]
