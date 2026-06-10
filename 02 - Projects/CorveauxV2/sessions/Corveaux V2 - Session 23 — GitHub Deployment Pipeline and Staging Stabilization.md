---
type: session
project: corveaux-v2
session: 23
date: 2026-06-09
tags: [corveaux, github-actions, cloudflare, neon, hyperdrive, opennext, deployment, staging, audit, ferpa, soc2]
---

# Corveaux V2 - Session 23 — GitHub Deployment Pipeline and Staging Stabilization

## Focus

Turned the local-only Corveaux application and the Cloudflare/Neon runtime established in Session 22 into a repeatable GitHub-controlled deployment system. The session covered environment design, Neon branch usage, infrastructure naming, secret separation, migration safety, deployment evidence, repository cleanup, repeated CI diagnosis, and the first fully successful staging deployment.

## Architecture Recap

The following runtime decisions remain in force:

- Cloudflare and Neon are the target end-to-end infrastructure.
- The platform database runs in Neon and is reached by the application/platform runtime through Cloudflare Hyperdrive.
- Tenant databases remain isolated Neon databases and are connected directly by the tenant-specific Worker using the appropriate secret.
- Platform provisioning is a platform-level Workflow. It owns tenant registry work and Neon provisioning API calls.
- Cartographer, Archivist, extraction, generation, and other tenant operations execute in the tenant boundary.
- Each tenant receives private, environment-specific R2 data and audit buckets.
- Provisioning records both `tenant_region` and `tenant_residency_requirement`.
- Administrative actions, protected views, denials, operations, and deployment activity must produce audit evidence.
- FERPA and SOC 2 Type II are program requirements. The infrastructure supplies controls and evidence foundations but does not itself confer compliance or certification.

## Deployment Decision

GitHub Actions is the sole deployment orchestrator.

```text
pull request -> CI
master -> staging after successful CI
approved staging SHA -> production
```

Cloudflare automatic Git deployments remain disabled. This avoids competing deployment authorities and allows one ordered workflow to coordinate:

1. dependency installation and generated clients
2. configuration rendering
3. application build
4. Neon restore branches
5. platform and tenant migrations
6. platform Worker deployment
7. tenant Worker deployment
8. frontend Worker deployment
9. runtime secret installation
10. smoke tests
11. deployment evidence generation and retention

Production is not deployed automatically from `master`. Promotion accepts an exact 40-character commit SHA only after GitHub verifies that the same SHA completed the staging workflow successfully. The protected GitHub `production` Environment is the human approval boundary.

See [[ADR-020 — Deployment and Promotion Architecture]].

## Environment and Database Model

The environment model was simplified to use branches rather than multiplying Neon projects.

Each database boundary has one Neon project:

- platform
- Corveaux Tenant Zero
- SLCC Validation

Each project has:

- a `production` root branch
- a `staging` child branch

Staging and production use separate endpoints and credentials. The workflows create timestamped restore branches before applying migrations. These are recovery points, not automated database rollback.

Migration policy:

```text
old Worker + new schema = supported
new Worker + old schema = supported during rollout
```

Migrations must use expand-and-contract sequencing. Worker rollback is routine; database reversal is not. Database incidents require a forward corrective migration or a reviewed Neon restore.

## Naming Standard

Infrastructure names were normalized to:

```text
[slug]-[environment]
```

Current generated names include:

- Workers: `platform-staging`, `corveaux-staging`, `slcc-staging`, `app-staging`
- Production Workers: `platform-production`, `corveaux-production`, `slcc-production`, `app-production`
- Workflows: `platform-provisioning-[environment]`, `[tenant]-operations-[environment]`
- R2: `platform-audit-[environment]`, `[tenant]-data-[environment]`, `[tenant]-audit-[environment]`, `app-cache-[environment]`
- Queues: `[tenant]-extraction-[environment]`, `[tenant]-extraction-finalize-[environment]`

The deployment renderer is the source of truth for these generated Cloudflare names. This prevents checked-in Wrangler configurations and CI from drifting apart.

## Secrets and Credentials

Environment credentials are separated in GitHub:

- staging Cloudflare API token
- production Cloudflare API token
- staging Neon API key
- production Neon API key
- environment-specific platform and tenant database URLs
- environment-specific dispatch and platform callback bearer tokens
- environment-specific auth and Entra ID values
- environment-specific Anthropic key

GitHub Environment secrets feed deployment jobs. Runtime secrets are installed into the relevant Cloudflare Workers with `wrangler secret bulk`; they are not emitted into rendered configuration files or committed to Git.

The local `.env` remains the operator/development location for local credentials. `.env.example` documents required names without containing live values.

The Cloudflare account identifier can be shared as a non-secret variable. API tokens should remain distinct by environment and least privilege. A single broad Cloudflare credential was deliberately not used as the long-term production model.

No secret values are recorded in this note.

## GitHub Actions Implemented

### CI

CI validates the repository before staging is eligible to deploy. It includes:

- dependency installation
- Prisma client generation
- TypeScript and Cloudflare checks
- application build
- migration compatibility validation
- dependency/security checks

### Staging

`Deploy Staging` runs after successful CI on `master`, or by explicit manual dispatch. It deploys the verified SHA and performs:

- OpenNext build
- Neon restore-point branch creation
- platform migration deployment
- Corveaux tenant migration deployment
- SLCC tenant migration deployment
- platform Worker deployment and secrets
- both tenant Worker deployments and secrets
- frontend Worker deployment and secrets
- health checks for platform and tenant Workers
- frontend login-route smoke check
- Worker version capture
- deployment evidence generation
- evidence submission to the platform audit path
- evidence copy to audit R2
- GitHub artifact retention

### Production

`Promote Production` is manually dispatched with the exact staging-verified SHA. It:

- rejects malformed or unverified SHAs
- requires the production GitHub Environment
- rebuilds the immutable promoted revision
- repeats restore-point, migration, deployment, secret, smoke-test, and evidence steps using production credentials
- records the approving GitHub actor

Production evidence is retained for seven years in GitHub Actions and copied to the production platform audit bucket.

## Deployment Evidence

Each deployment records:

- deployment SHA
- environment
- platform schema version
- tenant schema version
- applied migration identifiers
- Cloudflare Worker version IDs
- smoke-test results
- requester/approver context
- start/completion timestamps
- final outcome

The evidence is retained in three places where available:

- GitHub Actions artifact
- platform audit API/event trail
- environment-specific platform audit R2 bucket

This is part of the SOC 2 evidence foundation and supports release traceability, but it does not replace policy ownership, access reviews, incident procedures, or an auditor-observed operating period.

## Repository Cleanup and History

The project directory was cleaned before the final deployment attempt.

At the user's direction:

- all current project changes were included
- removed legacy documentation stayed removed
- the Git history was replaced with a single root commit
- subsequent deployment fixes amended that same root commit rather than adding history

Current repository state at close:

- branch: `master`
- commit: `16bd89ca9095e4d19d587bb98df923c9bba92ce7`
- subject: `Initialize Corveaux V2`
- worktree: clean

This was an intentional history rewrite. Future work should resume normal incremental commits unless another explicit rewrite is requested.

## CI Failures Diagnosed and Fixed

The staging workflow failed repeatedly while local assumptions were exposed in the clean GitHub runner and Cloudflare build environment. The fixes included:

### Lazy Tenant Database Initialization

Tenant database clients no longer require tenant connection values during unrelated build-time module evaluation. Connections are initialized only when tenant database work is actually requested.

### Lazy R2 Initialization

R2-dependent extraction code no longer initializes Cloudflare storage clients during application build. R2 access is deferred until the runtime path needs it.

### Build-Time Authentication Inputs

The CI build receives non-production placeholder auth inputs where Next.js requires values to compile routes. Runtime authentication still receives real secrets only through environment-specific Cloudflare secret installation.

### NextAuth Compatibility Aliases

Both the current auth variables and compatibility aliases required by the application/runtime are installed on the frontend Worker.

### Hyperdrive OpenNext Build Support

OpenNext/workerd needs a local connection string while building an application with a Hyperdrive binding. The workflows now provide:

`CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_PLATFORM_HYPERDRIVE`

using the appropriate environment platform database URL.

### Runtime Worker Secrets

Successful Worker deployment is followed by explicit secret installation for:

- platform dispatch, callback, and Neon API access
- tenant database, Anthropic, dispatch, and callback access
- frontend auth, Entra ID, dispatch, and tenant database access

This closed the gap between compiling/deploying a Worker and making its runtime dependencies usable.

### Cloudflare Cron Capacity

Legacy cron schedules on the previous Workers consumed the account schedule allowance. Cron triggers were removed from:

- `corveaux-platform`
- `corveaux-slcc-validation`
- `corveaux-tenant-zero`

This freed capacity for the environment-scoped platform and tenant Workers. The legacy Workers and their storage were not otherwise deleted during this cleanup.

## Successful Staging Deployment

The final retry completed successfully:

- GitHub Actions workflow: `Deploy Staging`
- run ID: `27200100540`
- commit: `16bd89ca9095e4d19d587bb98df923c9bba92ce7`
- result: `success`
- date: 2026-06-09

Successful stages included:

- dependency installation
- Prisma client generation
- rendered deployment configurations
- OpenNext application build
- Neon restore branches
- all platform and tenant migrations
- platform Worker deployment and secrets
- Corveaux tenant Worker deployment and secrets
- SLCC tenant Worker deployment and secrets
- frontend Worker deployment and secrets
- staging smoke tests
- Worker version capture
- deployment evidence generation
- audit R2 evidence storage
- GitHub artifact upload step

Live staging deployment units:

- `platform-staging`
- `corveaux-staging`
- `slcc-staging`
- `app-staging`

Staging frontend:

- `https://staging.corveaux.app`

The platform, both tenant services, and frontend smoke tests passed.

The run emitted non-blocking GitHub Actions annotations concerning the Node 20 action runtime deprecation and an artifact-path warning. They did not affect the successful deployment or smoke tests. Action versions should be refreshed before GitHub removes the deprecated runtime.

## Source Crawl Guardrail

The operator requested that routine test scrapes be limited to five pages. The exception was the explicitly authorized full crawl of:

- `https://corveaux-landing.pages.dev/`

Future ad hoc validation crawls should retain the five-page cap unless the user explicitly authorizes a full source run.

## Compliance and Security Position

The architecture now includes technical foundations relevant to FERPA and SOC 2 Type II:

- isolated tenant databases
- isolated tenant data and audit buckets
- environment-specific credentials
- least-privilege credential direction
- protected production approval
- immutable-SHA promotion
- migration safety gates
- pre-migration restore points
- append-only audit records
- durable deployment evidence
- seven-year audit retention target
- region and residency metadata at provisioning

Still required before making compliance claims or loading FERPA-covered records:

- Cloudflare and Neon vendor risk reviews
- contracts and appropriate DPAs
- institutional authorization for education-record processing
- written security and privacy policies
- control owners
- recurring access reviews
- incident response and breach-notification exercises
- backup/restore and disaster-recovery tests
- retention, deletion, and legal-hold procedures
- signed audit manifests or integrity checkpoints
- evidence collection over the SOC 2 Type II operating period
- independent audit

## Current State

- GitHub Actions is the sole deployment authority.
- Automatic staging deployment is operational.
- Staging is healthy on Cloudflare and Neon.
- Production promotion is implemented but has not been run.
- The exact production candidate is the staging-verified SHA:
  `16bd89ca9095e4d19d587bb98df923c9bba92ce7`
- Platform DB access is through Hyperdrive.
- Tenant DB access is direct and tenant-scoped.
- Environment names follow `[slug]-[environment]`.
- Repository history currently contains one root commit.

## Next Actions

1. Review the successful staging application manually, including authentication and admin flows.
2. Refresh GitHub Action dependencies that still use the deprecated Node 20 runtime.
3. Resolve or confirm the non-blocking deployment artifact path annotation.
4. Promote the staging-verified SHA to production when the manual review and production approval gate are satisfied.
5. Validate production health, auth, platform operations, tenant generation, audit API delivery, and R2 evidence after promotion.
6. Remove or archive legacy Cloudflare Workers and storage only after confirming no rollback dependency remains.
7. Continue Cloudflare-native extraction queue/fan-out work and re-run the SLCC corpus before retiring Trigger.dev extraction.
8. Add signed audit manifests and integrity checkpoints.
9. Complete FERPA vendor/contract controls and SOC 2 governance/evidence work.
10. Resume Day 60 generated-tenant and role-aware rendering work.

## Related

- [[Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan]]
- [[Corveaux V2 - Session 22 — Cloudflare and Neon Deployment Closeout]]
- [[ADR-019 — Cloudflare and Neon Runtime Architecture]]
- [[ADR-020 — Deployment and Promotion Architecture]]
- [[ADR-010 — Tenant Isolation Architecture]]
