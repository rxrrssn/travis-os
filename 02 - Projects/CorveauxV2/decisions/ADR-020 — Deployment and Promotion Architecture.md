---
type: decision
domain: corveaux
status: active
date: 2026-06-09
tags: [corveaux, deployment, github-actions, cloudflare, neon, opennext, audit, soc2]
---

# ADR-020 — Deployment and Promotion Architecture

## Decision

GitHub Actions is the sole deployment orchestrator. Cloudflare Workers Builds and
automatic Git deployments remain disabled.

```text
pull request -> CI
master -> staging automatically
approved staging SHA -> production
```

Production accepts only the exact immutable commit SHA that passed staging. The
protected GitHub `production` Environment supplies the human approval boundary.

## Deployment Units

The deployment pipeline controls:

- the Next.js application through `@opennextjs/cloudflare`
- the platform Worker
- Corveaux and SLCC tenant Workers
- platform and tenant migrations
- smoke tests
- deployment evidence

The application is served at `corveaux.app`; staging is served at
`staging.corveaux.app`. The marketing site remains at
`corveaux-landing.pages.dev`.

## Environment Isolation

Each database boundary has one Neon project:

- `platform`
- `corveaux`
- `slcc`

Each project has a `production` root branch and a `staging` child branch. Staging
and production use separate:

- Neon branch endpoints and credentials
- Hyperdrive configurations
- R2 data, cache, and audit buckets
- Queues and Workflows
- Worker names and runtime secrets
- Cloudflare and Neon deployment credentials

The frontend reaches the platform database through Hyperdrive. Tenant databases
remain direct Neon connections scoped to the assigned tenant.

## Migration Compatibility

Every production migration must preserve:

```text
old application + new schema = supported
new application + old schema = supported during rollout
```

Migrations use expand-and-contract sequencing. CI rejects newly introduced
destructive migration operations. Obsolete schema is removed only in a later release
after old Worker versions are no longer eligible for rollback.

## Rollback Classification

- Worker rollback restores a previous Cloudflare version.
- Database rollback is not automated.
- Database failures use a forward corrective migration or a reviewed Neon restore.
- A release requiring destructive database reversal is an incident.

## Evidence

Every staging and production deployment records:

- deployment SHA
- platform and tenant schema versions
- Worker version IDs
- migration IDs
- smoke-test results
- requester/approver context
- timestamps and outcome

Evidence is retained as a GitHub Actions artifact, submitted to the platform audit
API, and copied to the environment-specific platform audit R2 bucket.

## Consequences

- `master` is the integration source for staging, not an automatic production branch.
- Production secrets are unavailable to pull-request and staging jobs.
- Runtime secrets remain in Cloudflare Worker secret storage.
- Production promotion is intentionally gated by staging verification, human
  approval, and evidence generation.

## Related

- [[ADR-019 — Cloudflare and Neon Runtime Architecture]]
- [[ADR-010 — Tenant Isolation Architecture]]
- [[Corveaux V2 - Session 22 — Cloudflare and Neon Deployment Closeout]]
