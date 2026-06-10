---
type: session
project: corveaux-v2
session: 22
date: 2026-06-09
tags: [corveaux, cloudflare, neon, hyperdrive, workflows, r2, audit, ferpa, soc2, deployment]
---

# Corveaux V2 - Session 22 — Cloudflare and Neon Deployment Closeout

## Focus

Implemented the Cloudflare + Neon runtime plan end to end, including tenant isolation, provisioning metadata, residency fields, append-only audit trails, R2 audit export, and a staged Trigger.dev-to-Cloudflare changeover.

## Decisions Confirmed

- Platform database: Neon through Cloudflare Hyperdrive.
- Tenant databases: one isolated Neon project per tenant, direct-connected from the assigned tenant Worker.
- Tenant storage: separate private R2 data and audit buckets.
- Provisioning tracks region and residency requirements.
- Audit retention defaults to seven years.
- Every protected admin view and administrative action must be auditable.
- Cloudflare Workflows owns provisioning and tenant generation.
- Trigger.dev remains for crawl/extraction until Cloudflare-native fan-out and queue behavior passes SLCC revalidation.
- FERPA and SOC 2 Type II are program requirements, not labels conferred by infrastructure.

## Work Completed

### Platform Database

- Created the Neon platform project in `aws-us-east-1`.
- Migrated the `corveaux_platform` schema from local PostgreSQL.
- Verified exact source/destination counts: 1 tenant, 3 pre-existing operations, and 5 platform migrations at migration time.
- Switched the local/admin platform runtime to Neon's pooled endpoint.

### Hyperdrive and Platform Worker

- Created the platform Hyperdrive configuration.
- Created the platform audit R2 bucket.
- Deployed the platform Worker with:
  - Hyperdrive binding
  - provisioning Workflow
  - audit R2 binding
  - scheduled audit exporter
  - separate dispatch and callback secrets
- Verified `/health` against the Neon platform database.

### Tenant Provisioning and Isolation

- Provisioned isolated Neon projects for:
  - Corveaux Tenant Zero
  - SLCC Validation
- Applied all seven tenant migrations to both projects.
- Split the previous local combined schema by provenance.

Final tenant counts:

| Tenant | Entities | Relationships | Policies | Events | Blocks | Runs | Observations |
|---|---:|---:|---:|---:|---:|---:|---:|
| Corveaux | 21 | 10 | 5 | 0 | 4 before live regeneration | 0 | 0 |
| SLCC Validation | 2,855 | 2,216 | 2,450 | 1,059 | 2,345 | 8 | 14,822 |

The split removed all source-backed SLCC records from Corveaux and all source-less Corveaux records from SLCC.

### Tenant Workers and R2

Created and deployed dedicated Workers for Corveaux and SLCC Validation.

Each tenant has:

- one private data bucket
- one private audit bucket
- one Workflow binding
- tenant-specific Neon database secret
- dispatch secret
- platform callback secret

Both tenant `/health` endpoints passed.

### Audit Hardening

Added platform and tenant:

- append-only audit event tables
- transactional outboxes
- seven-year retention timestamps
- scheduled R2 exporters
- database triggers rejecting update/delete

Protected admin views and existing admin mutations now emit audit records. Middleware supplies request, correlation, route, and access-denial context.

Validation:

- Platform append-only trigger: PASS
- Corveaux append-only trigger: PASS
- SLCC append-only trigger: PASS
- Platform audit outbox exported to R2: PASS
- Corveaux audit outbox exported to R2: PASS
- SLCC audit outbox exported to R2: PASS

### Workflow Validation

Ran a real Corveaux `generate_tenant` operation through the deployed tenant Worker and Workflow.

Result:

- status: `COMPLETED`
- entities processed: 16 active renderable entities
- blocks written: 16
- authenticated callback recorded in the platform database

Set `TENANT_GENERATION_BACKEND=cloudflare`. Source crawl and extraction remain on Trigger.dev.

### Security and Build Validation

- Added workerd-specific Prisma clients for Cloudflare Workers.
- Corrected platform callback authentication to use its dedicated secret.
- Added targeted dependency overrides for vulnerable transitive packages.
- `npm run build`: PASS
- `npm run cf:typecheck`: PASS
- `npx tsc --noEmit`: PASS
- `npm audit --omit=dev`: 0 known vulnerabilities
- `git diff --check`: no whitespace errors; line-ending warnings only

## Compliance Position

The deployed architecture now provides technical foundations for:

- tenant isolation
- encryption in transit
- secret separation
- append-only audit trails
- retention metadata
- isolated, hash-recorded audit export
- residency-aware provisioning
- deployment/version evidence

It is not yet correct to claim FERPA compliance or SOC 2 Type II certification. Remaining work includes:

- Cloudflare and Neon vendor reviews, contracts, and DPAs
- documented control owners and policies
- least-privilege access review and recurring certification
- incident response and breach-notification procedures
- backup/restore and disaster-recovery exercises
- retention/deletion and legal-hold procedures
- signed audit manifests/hash-chain checkpoints
- evidence collection and SOC 2 Type II operating period

No FERPA-covered student records should be loaded until the contractual and institutional authorization gate is complete.

## Current Runtime

- Platform provisioning: Cloudflare Workflows
- Tenant generation: Cloudflare Workflows
- Platform DB: Neon through Hyperdrive
- Tenant DBs: direct Neon, one project per tenant
- Tenant data/audit storage: separate private R2 buckets
- Crawl/extraction: Trigger.dev
- Local PostgreSQL: development and rollback source

## Next Actions

1. Add Cloudflare-native extraction work queues and fan-out.
2. Preserve page/document retry, concurrency, and idempotency semantics.
3. Re-run the full SLCC corpus before moving extraction off Trigger.dev.
4. Add signed audit batch manifests and integrity checkpoints.
5. Complete vendor, FERPA, and SOC 2 control documentation.
6. Build the role-aware generated tenant experience.

## Related

- [[ADR-019 — Cloudflare and Neon Runtime Architecture]]
- [[ADR-010 — Tenant Isolation Architecture]]
- [[Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan]]
- [[SLCC Validation Run]]
