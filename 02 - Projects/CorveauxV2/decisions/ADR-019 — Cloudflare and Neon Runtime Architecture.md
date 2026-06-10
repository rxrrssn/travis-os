---
type: decision
domain: corveaux
status: active
date: 2026-06-09
tags: [corveaux, cloudflare, neon, hyperdrive, workflows, r2, compliance, audit, multi-tenant]
---

# ADR-019 — Cloudflare and Neon Runtime Architecture

## Decision

Corveaux uses Cloudflare and Neon as its primary managed runtime:

- Cloudflare Workers for platform and tenant runtime services
- Cloudflare Workflows for platform provisioning and tenant generation
- Cloudflare Hyperdrive for the platform Worker's Neon connection
- Cloudflare R2 for private tenant data and audit storage
- Neon PostgreSQL for the platform database and database/project-per-tenant institutional databases

Trigger.dev remains temporarily active for crawl and extraction. This is a staged migration, not dual architectural ownership: Cloudflare is the destination, while extraction moves only after its fan-out and queue semantics pass the existing SLCC quality gate.

## Platform and Tenant Split

### Platform

- One Neon platform project stores tenants, sources, operations, database targets, and platform audit records.
- The platform Worker reaches Neon through Hyperdrive.
- The platform provisioning Workflow calls the Neon API and records non-secret target metadata.
- The platform Worker receives separate dispatch and callback secrets.

### Tenant

- Each tenant receives an isolated Neon project.
- Each tenant receives a dedicated Worker and Workflow binding.
- Each tenant receives a private R2 data bucket and private R2 audit bucket.
- Tenant Workers connect directly to Neon using tenant-specific secrets.
- Tenant database credentials are never stored in the platform database.

## Data Residency

Provisioning records:

- `tenant_region`
- `tenant_residency_requirement`
- audit retention years

Region changes require a new project and controlled migration. Provisioning must stop when the selected resources cannot satisfy the tenant's residency requirement.

## Audit and Compliance Baseline

- Protected views and administrative mutations create audit records.
- Platform and tenant audit events are append-only at the database layer.
- Audit event and outbox rows are created transactionally.
- Scheduled Workers export pending audit events to private R2 audit buckets.
- Default retention is seven years.
- Request, correlation, actor, authority, resource, purpose, deployment, and schema context are supported.

This architecture supports FERPA and SOC 2 control implementation but does not itself establish compliance. Required organizational work includes contracts and DPAs, policies, control ownership, access reviews, incident response, evidence collection, backup/restore exercises, retention/deletion procedures, vendor reviews, and a SOC 2 Type II operating period.

## Security Decisions

- Database/project-per-tenant is the production isolation boundary.
- Platform Hyperdrive uses encrypted origin connections and Cloudflare's WebPKI certificate validation behavior.
- Direct application Neon URLs use explicit TLS verification.
- Secrets live in local `.env` for development and Cloudflare Worker secret storage for deployed runtimes.
- Public Worker health routes disclose only service/tenant identity and database reachability.
- Production dependency advisories are treated as release blockers; the closeout audit reported zero known production vulnerabilities.

## Implemented Baseline

As of 2026-06-09:

- Platform Neon migration completed and verified.
- Platform Worker, Workflow, Hyperdrive, and audit bucket deployed.
- Corveaux Tenant Zero and SLCC Validation isolated into separate Neon projects.
- Separate data/audit R2 buckets and tenant Workers deployed.
- Audit outbox exports succeeded for platform and both tenants.
- Append-only trigger tests passed for all three databases.
- A live `generate_tenant` Workflow completed with direct Neon work and authenticated platform callback.

## Consequences

- Tenant provisioning is now an infrastructure workflow, not an inline application action.
- Every new tenant requires Neon, Worker, Workflow, R2, secret, migration, and validation steps.
- Platform metadata must remain non-secret.
- Crawl/extraction migration must preserve the existing accuracy gate, retries, concurrency limits, and idempotency.
- Cloudflare and Neon vendor/contract posture becomes part of the FERPA and SOC 2 compliance program.

## Supersedes

- Infrastructure portions of [[ADR-009 — Tech Stack]]
- Platform-wide orchestration choice in [[ADR-011 — Background Job Platform]]
- The deferred database-vs-schema production choice in [[ADR-010 — Tenant Isolation Architecture]]

## Related

- [[ADR-004 — Platform Tenant Architecture]]
- [[ADR-010 — Tenant Isolation Architecture]]
- [[Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan]]
- [[Corveaux V2 - Session 22 — Cloudflare and Neon Deployment Closeout]]
