---
type: decision
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, infrastructure, background-jobs, extraction-pipeline]
---

# ADR-011 — Background Job Platform

## Decision

Trigger.dev is the background job and pipeline orchestration platform for Corveaux.

## Context

An Institutional Operating System does not merely serve requests. It continuously operates the institution.

The platform's dominant operational pattern is durable, long-running, batch-oriented work:

- Modeling institutional reality from source data
- Keeping that model current as institutions change
- Enforcing governance across content, identity, policy, and workflow
- Generating and regenerating projected surfaces as the canonical model evolves
- Synchronizing with adjacent institutional systems as the platform expands

None of this work is reactive in the event-driven sense. It is initiated by deliberate actions, scheduled maintenance cycles, or institutional lifecycle events. It must run to completion, survive infrastructure failures, and be observable at every stage.

The job platform decision must be made before any pipeline code is written. It defines the execution model for all operational work across the platform's lifetime, not just the initial entry wedge.

## Options Considered

### Trigger.dev (chosen)

Trigger.dev v3 is a TypeScript-native durable execution platform designed for long-running background jobs.

Relevant characteristics:

- Tasks are defined as ordinary TypeScript functions; no configuration language or YAML
- Durable execution: jobs checkpoint and survive process restarts or infrastructure failure
- Steps within tasks: individual stages can be checkpointed and retried independently
- Native long-running support: tasks run for hours without timeout constraints
- Wait and sleep primitives: built-in rate limiting and backoff without polling loops
- Self-hostable via Docker; aligns with the Docker + Coolify infrastructure decision (ADR-009)
- First-class Next.js SDK integration
- Designed as a batch processing platform, not a messaging bus

### Inngest

Inngest is an event-driven durable workflow platform.

Relevant characteristics:

- Excellent TypeScript SDK
- Strong developer experience and observability
- Event-driven model: functions are triggered by named events
- Well-suited for reactive workflows where user actions or system events trigger downstream processing
- Cloud-native; self-hosting is available but less central to the platform design

## Rationale

The primary question is not: which platform best serves the extraction pipeline?

The primary question is: what execution model does an Institutional Operating System require?

An IOS operates an institution continuously. The operational work that a mature Corveaux platform must perform includes:

**Institutional Model Operations**
- Initial institutional discovery (crawl, extract, validate, store)
- Incremental model updates as institutional reality changes
- Conflict detection and resolution across sources
- Confidence recalibration as source material changes
- Historical state preservation and audit trail maintenance

**Tenant Lifecycle Operations**
- Database or schema provisioning on tenant creation
- Schema migrations scoped to individual tenants
- Tenant data seeding and initialization
- Tenant deactivation and data retention workflows

**Governance Operations**
- Review cycle enforcement across content blocks
- Ownership gap detection and escalation
- Publication workflow execution and approval routing
- Policy evaluation and re-evaluation as policies change
- Compliance and audit report generation

**Projection Operations**
- Content block regeneration when the canonical model changes
- Search index rebuilding after institutional model updates
- Generated tenant rebuilds on significant model changes
- Scheduled freshness checks across rendered surfaces

**Intelligence Operations**
- Institutional benchmarking and analytics
- Scheduled forecasting and trend analysis
- Institutional health reporting
- Cross-tenant anonymized analysis (Office of Intelligence)

**Integration Operations (future)**
- SIS-adjacent synchronization jobs
- LMS-adjacent synchronization jobs
- Identity provider synchronization
- Workforce system synchronization
- Financial system reconciliation

Every category above is predominantly durable, batch-oriented, long-running work. It is initiated by scheduled triggers, deliberate administrative actions, or institutional lifecycle events. It is not a stream of user-facing events.

Trigger.dev's execution model matches the dominant operational pattern of the platform:

- A job runs to completion, however long that takes
- Each stage within the job is durable and independently recoverable
- Failures are isolated to the stage that failed, not the entire operation
- The platform can observe, pause, retry, and resume operations at any stage
- Self-hosting keeps operational data within the platform's infrastructure boundary

Inngest's event-driven model is correct for a different class of problem. It excels when user actions or system events need to trigger downstream chains in near-real-time. Corveaux's operational work is not that class of problem. Modeling the institutional reality of a 50,000-student college is not triggered by a user clicking a button and waiting. It is a sustained operational process that runs in the background and surfaces results when complete.

The extraction pipeline is the first instance of this pattern. It is not the reason for the decision.

## Consequences

- Trigger.dev v3 self-hosted via Docker must be provisioned alongside the application, database, and object storage in the Coolify deployment
- Tenant context must be carried explicitly in every job payload; Trigger.dev does not provide tenant isolation natively (consistent with ADR-010)
- LLM provider interface must include retry and rate-limit handling compatible with Trigger.dev wait primitives
- Pipeline stages should be modeled as durable steps for sequential checkpointed work, and as child tasks for fan-out or independent retry and observability requirements
- Pipeline execution state is represented in both Trigger.dev (for orchestration) and Corveaux's own database (as the system of record for extraction history, auditability, and tenant-visible operational state)
- Trigger.dev observability is the primary operational interface for monitoring job execution health

## Status

Accepted

## Related

- [[ADR-009 — Tech Stack]]
- [[ADR-010 — Tenant Isolation Architecture]]
- [[extraction-pipeline-spec]]
- [[Corveaux V2 - Session 02 — Tech Stack and Vault Infrastructure]]
