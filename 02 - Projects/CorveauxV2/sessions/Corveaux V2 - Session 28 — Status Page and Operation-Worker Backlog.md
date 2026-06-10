---
type: session
project: corveaux-v2
session: 28
date: 2026-06-10
tags: [corveaux, status-page, cloudflare-workers, operation-workers, service-bindings, deployment]
---

# Corveaux V2 - Session 28 — Status Page and Operation-Worker Backlog

## Focus

Two threads: shipped a public status page at **status.corveaux.app**, then cleared
the remaining operation-worker backlog (the last three queued-but-never-dispatched
TenantOperation types).

## Status page — status.corveaux.app (live)

Standalone, dependency-light Cloudflare Worker (`corveaux-status`), separate from the
systems it monitors so it stays up when they don't. Hybrid model: automated health +
a manual incident banner.

- **Matrix by environment** (Production / Staging), six components each: Platform API,
  Corveaux Site, SLCC Validation Site, Database, Storage & Extraction, SSO/Auth (Entra).
- **Design** — modern dark/onyx + gold, the Corveaux X mark inlined as a base64
  data-URI (header + favicon), pill-chip statuses with a subtle pulsing dot (cadence by
  severity, respects `prefers-reduced-motion`). Replaced an initial "legacy"-feeling
  serif draft.
- **Checks** — worker components are probed over **Service Bindings**, not workers.dev
  HTTP. (Discovered the hard way: a same-account worker-to-worker subrequest on
  workers.dev loses path fidelity and 404s. External probes returned 200, the status
  worker got 404 — a debug route surfaced it. Service bindings are the supported
  same-account mechanism and fixed it.) SSO/Auth stays a real external HTTP check to the
  Entra OIDC discovery doc.
- **Backend** — KV-cached snapshot refreshed by a 2-min cron + on-demand refresh when
  stale; `/api/status` JSON; token-protected `POST/DELETE /admin/incident` for the
  banner.
- **Discovery via CF API** — pulled every worker URL, the workers.dev subdomain, the
  zone, and KV state straight from the Cloudflare API (after the user rescoped the
  `CLOUDFLARE_API_TOKEN` to add KV + DNS). Created the `corveaux-status-kv` namespace,
  set `STATUS_ADMIN_TOKEN` as a secret, deployed, and attached the `status.corveaux.app`
  custom domain — all via wrangler/API. Verified live: `/api/status` reports all systems
  operational across both environments.
- **Non-breaking `/health` enhancements** on the platform + tenant workers (structured,
  non-throwing `checks.{worker,database,storage}` incl. an R2 list probe) so the page
  gets honest Database/Storage signals. Until those workers are redeployed, the page uses
  a `2xx == healthy` fallback (currently all green).

Commits: `1d411b0` (worker), `e21171e` (redesign + logo + pulse), `4d42494` (service
bindings + deploy config).

## Operation-worker backlog — CLEARED

The last three TenantOperation types were created-but-never-dispatched with no worker
(same shape as Session 27's retry_failed/cache.purge). Built all three through the proven
`dispatch -> TenantOperationWorkflow -> platform callback` path (commit `f0cda7c`):

- **`extraction.promote_run`** — runs the archivist `promoteRun` + projector block regen
  over a run's observations (manual re-canonization), updates the `ExtractionRun` counts,
  reports promotion metrics.
- **`source.validate`** — fetches the source URL, rejects WAF/bot-challenge pages and
  too-small responses, reports `VALID`/`INVALID` + reason; the platform callback writes
  `validationStatus`/`validationNotes`/`lastValidatedAt` back to `TenantSource`.
- **`tenant.review`** — computes a review snapshot of the generated tenant: entity counts
  by type, relationship/policy/content-block counts, blocks by status.

Each got a contract variant + dispatch routing + tenant-worker handler; the actions now
dispatch (were PENDING-only); the operation-result UI renders the new fields; generic
Retry re-dispatches them too.

**Operation-worker coverage is now complete:** `generate_tenant`, `source.crawl`,
`source.cache.purge`, `source.validate`, `extraction.run`, `extraction.retry_failed`,
`extraction.promote_run`, `tenant.review`.

## State at close

- All code pushed to `origin/master` through `4d42494`; `f0cda7c` (the three workers) is
  committed — push with the next batch.
- **Pending deploy:** the tenant + platform workers carry several committed-but-undeployed
  changes — the five new operation-worker handlers (retry_failed, cache.purge, promote_run,
  validate, review) and the `/health` structured-checks enhancement. One `wrangler deploy`
  of the tenant + platform workers ships them all and lights up the status page's granular
  Database/Storage checks.
- `status.corveaux.app` is live and green. `STATUS_ADMIN_TOKEN` set as a Worker secret.
- Verifications: root `tsc`, `cf:typecheck`, lint, and all worker bundles clean throughout.

## Related

- [[Corveaux V2 - Session 27 — Extraction Run Worker Verification]]
- [[Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan]]
- [[Corveaux V2]]
