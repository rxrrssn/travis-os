---
type: operations
status: draft
date: 2026-06-13
owner: Travis Hornbuckle
tags: [soc2, secrets, configuration, runbook]
---

# Environment and Secrets Inventory

The operator's reference for every secret and setting Corveaux relies on — where it
lives and how it's protected. This is a working runbook; keep it in step with the
deployment config.

## Our posture, in plain language
Secrets never live in the code or in any school's data — they are held as encrypted
platform secrets and injected at runtime. Test keys are used in development and
staging; **live keys exist only in production**, and a live key used anywhere else
is refused. A leaked secret can be rotated without a code change.

## Where things live
- **Secrets** → Cloudflare Worker secrets (and GitHub Actions secrets for CI). Never in `.env` committed to git; `.env.example` documents the names only.
- **Non-secret settings** → Worker vars / repo variables (e.g. delivery allow-lists, feature flags).
- **The canonical list of names** is `.env.example` in the repo — treat it as the index; this doc explains the sensitive ones.

## Sensitive secrets (what they unlock)

| Name | Purpose | Notes |
|---|---|---|
| `*_DATABASE_URL` (platform + per-tenant) | Database access | Per-tenant URLs keep schools separated |
| `ANTHROPIC_API_KEY` | AI inference | Sees only redacted prompts (no personal data) |
| `RESEND_API_KEY` | Outbound + inbound email | Environment-resolved: test vs live |
| `RESEND_INBOUND_SIGNING_SECRET` | Verifies inbound email is really from Resend | Required before connecting inbound in prod |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_FROM_NUMBER` | SMS (not connected yet) | Auth token also verifies inbound SMS signatures |
| `CONVERSATIONS_INBOUND_TOKEN` | Fallback inbound auth when no provider signature | Send in the `x-corveaux-inbound-token` header |
| `STRIPE_*` (test/live pair) | Billing | Live key only in production |
| `AZURE_AD_*` | Platform SSO (Microsoft Entra) | Operator sign-in |
| `TENANT_AUTH_SECRET_{SLUG}` | A school's own SSO client secret | One per institution with its own IdP |
| `STATUS_ADMIN_TOKEN` | Posts/clears the status-page incident banner | — |
| `CLOUDFLARE_DISPATCH_BEARER_TOKEN` | Platform→worker dispatch + audit writes | — |

## Test-vs-production discipline
- `RESEND_API_KEY` and the Stripe keys are **environment-resolved** — the code picks
  the test key outside production and the live key only in production; a live key
  detected outside production is refused.
- The app worker must carry `CORVEAUX_ENVIRONMENT=production` in prod so the right
  keys are chosen (verify at prod paste-time).

## Rotation
- Rotate by replacing the Worker/CI secret and redeploying — no code change.
- Rotate immediately on any suspected exposure (see [[Incident Response Runbook]]).
- The CI secret scan (GitGuardian) blocks a secret from being committed in the first place.

## Open items
- ☐ Document the exact rotation command per provider.
- ☐ Confirm `CORVEAUX_ENVIRONMENT=production` is set on the production app worker.
- ☐ Set `RESEND_INBOUND_SIGNING_SECRET` before connecting inbound email; keep Twilio secrets unset until SMS is connected.

## Related
- [[Inbound Channel Connection Runbook]] · [[Security Overview and SOC 2 Control Mapping]] · [[Subprocessors and DPAs]]
