---
type: decision
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, tech-stack, architecture, infrastructure]
---
# ADR-009 — Tech Stack

## Decision

TypeScript throughout. Next.js for frontend and initial API layer. PostgreSQL with Prisma for the institutional model. Microsoft Entra ID for authentication. Anthropic behind a provider interface. Trigger.dev for background job orchestration. Docker + Coolify for infrastructure. See ADR-011 for the Trigger.dev decision.

## Context

This is a solo builder project at pre-implementation stage. The Day 30 gate requires a working extraction pipeline against SLCC. Day 60 requires a generated tenant with role-aware rendering. Day 90 requires a demo-quality platform with governance workflows.

Stack choices must balance:

- Builder productivity (TypeScript unifies frontend and backend mental model)
- Architectural correctness (PostgreSQL supports multi-tenant data patterns and Row Level Security)
- Platform vision alignment (every choice must support eventual expansion into identity, workflow, operational domains)
- Minimal operational overhead (Coolify over Kubernetes until scale demands otherwise)

## Options Considered

### Language

1. **TypeScript throughout** (chosen) — Single language for extraction pipeline, API layer, and frontend. Type safety matters for the institutional model schema, which has significant complexity (primitives, relationships, temporal fields, tenant isolation). Solo builder context makes one language the clear choice.

2. **Python + TypeScript split** — Python for LLM/extraction work, TypeScript for web layer. Adds cognitive overhead and build complexity for a solo builder. Not chosen.

3. **Python throughout** — Strong for extraction but weak for the web/rendering layer. Not chosen.

---

### Web and API Framework

1. **Next.js + React** (chosen) — App Router with React Server Components aligns well with the role-aware rendering model. API routes provide the initial backend layer without requiring a separate server. Services can be extracted later when needed.

2. **Separate frontend + backend from Day 1** — Adds complexity before it is needed. Monolith-first aligns with the solo builder context and the Day 30/60/90 timeline.

---

### Database

1. **PostgreSQL** (chosen) — Battle-tested for institutional data. Provides the foundation for enforcing tenant isolation through Row Level Security (RLS) policies. Temporal data patterns are well understood. Full-text search is available natively.

2. **Graph database (Neo4j)** — The institutional model is relationship-heavy, which suggests graph. Rejected due to operational complexity, ecosystem maturity considerations, and the ability of PostgreSQL to support the initial requirements.

---

### ORM

1. **Prisma** (chosen initially) — Excellent TypeScript integration, migration tooling, and developer ergonomics. Appropriate for Day 30 through Day 90.

2. **Drizzle** (future evaluation) — Closer to SQL and potentially advantageous for specific query patterns. Worth revisiting if Prisma becomes a constraint.

---

### Authentication

1. **Microsoft Entra ID + local recovery auth** (chosen) — Higher education institutions are commonly Microsoft-centric. Entra ID integration reduces SSO friction for institutional buyers. Local recovery auth supports non-institutional access scenarios.

2. **Auth0 / Clerk** — Viable alternatives but do not provide the same Microsoft-native institutional story.

---

### Background Jobs / Pipeline Orchestration

**Trigger.dev.** See [[ADR-011 — Background Job Platform]] for full evaluation and rationale.

---

### AI / LLM

1. **Anthropic behind provider interface** (chosen) — Follows ADR-007. AI is an implementation detail. Abstracting behind a provider interface allows model selection and provider changes without modifying business logic.

2. **Direct provider SDK usage** — Rejected because it couples business logic directly to a specific provider.

---

### Search

1. **PostgreSQL Full-Text Search** (chosen initially) — Sufficient for Day 30–90 scope. No additional infrastructure required.

2. **Dedicated search infrastructure** (future evaluation) — Potential future option if search quality, relevance, or scale exceeds PostgreSQL capabilities.

---

### Storage

S3-compatible object storage for:

- Crawled content
- Extracted artifacts
- Generated assets

---

### Observability

- OpenTelemetry for tracing and metrics
- Sentry for error tracking and alerting

---

### Infrastructure

1. **Docker + Coolify** (chosen initially) — Self-hosted PaaS that minimizes operational overhead while maintaining deployment control. Appropriate for the pre-revenue stage.

2. **Kubernetes** — Deferred until operational requirements justify the complexity.

3. **Managed cloud platforms (Vercel, Railway, Render)** — Viable alternatives. Coolify is preferred because it supports a multi-service deployment model including application, database, background jobs, and supporting infrastructure.

---

## Explicitly Deferred

The following technologies are intentionally deferred:

- Kubernetes
- Microservices
- Graph databases
- Dedicated search infrastructure
- Separate frontend/backend deployments
- Dedicated workflow engines beyond pipeline orchestration

These may be revisited when operational requirements justify additional complexity.

---

## Rationale

The institutional model is the complex part.

The stack should be simple everywhere else so cognitive overhead concentrates on solving:

- The institutional model
- The governance model
- The extraction architecture

TypeScript unified across the stack provides:

- One type system
- One build pipeline
- One mental model

PostgreSQL supports the institutional model while providing a path to strong tenant isolation through Row Level Security.

Next.js monolith-first is appropriate for the Day 30–90 timeline. Services should be extracted only when there is a demonstrated operational reason to do so.

---

## Stakeholders

- Builder (Travis Hornbuckle)

---

## Consequences

- Background job platform decision must be made before the first extraction pipeline run
- Provider interface must be designed before the first LLM integration is written
- PostgreSQL RLS policies should be designed alongside the initial schema
- Coolify deployment must support PostgreSQL, background jobs, object storage, and the Next.js application
- Future migration away from Prisma remains possible if justified

---

## Related

- [[ADR-007 — LLM Strategy Positioning]]
- [[ADR-004 — Platform Tenant Architecture]]
- [[ADR-005 — Capability-Based Authority Model]]
- [[extraction-pipeline-spec]]
- [[Corveaux V2 - Session 02 — Tech Stack and Vault Infrastructure]]