---
type: decision
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, architecture, tenant-zero, dogfood]
---

# ADR-006 — Tenant Zero (Corveaux Must Run Corveaux)

## Decision

Corveaux is Tenant Zero. Before any capability is demonstrated to an external prospect, Corveaux's own website, documentation, knowledge base, and directory run on the platform. Corveaux is a real institution operating on Corveaux — not a demo tenant, not a test environment.

## Context

The most powerful line in any sales conversation is: "Our own website runs on this platform." To earn that line, Corveaux must initialize itself as an institutional tenant and operate through its own product before showing it to anyone else.

This also solves the dogfood problem. If a feature can't be used internally by Corveaux, its design should be questioned before release.

## Options Considered

1. **Demo tenant only** — Create "Corveaux University" as a fictional demo institution. Doesn't allow "we run this ourselves."
2. **Separate internal tooling** — Use different tools internally; don't dogfood. Creates divergence between what's built and what's needed.
3. **Corveaux as real institutional tenant** (chosen) — Corveaux-the-company is modeled using the standard institutional object schema. The company operates through the platform.

## Rationale

Corveaux's institutional model maps naturally to the standard primitives:

**Offices (Department entities):**
- Office of the System
- Office of the Platform
- Office of People & Culture
- Office of Institutional Continuity
- Office of Intelligence

**Platform tiers (Program entities):**
- Institutional Discovery Audit
- Living Knowledge Layer
- Governance Platform
- Enterprise Platform

**Services (Service entities):**
- Discovery Engagement
- Implementation
- Institutional Support
- Platform API Access
- Institutional Intelligence Reports

**Policies (Policy entities):**
- Terms of Service, Privacy Policy, SLA, Data Processing Agreement, Acceptable Use Policy

The Office of Institutional Continuity is the most critical DepartmentBlock for prospect-facing rendering — it shows external institutions what their relationship with Corveaux will look like: Discovery â†’ Onboarding â†’ Implementation â†’ Support â†’ Renewal.

## Stakeholders

- Builder (Travis Hornbuckle)

## Consequences

- Day 30: Corveaux Tenant Zero must be initialized (even minimally) — institutional model with offices and services in the object store
- Day 60: Corveaux website running on the platform
- Day 90: Full Tenant Zero operational (website, docs, knowledge base, directory)
- The Day 90 demo to a prospect is: "Here's our website. It runs on the same platform we're showing you for your institution."
- This validates the platform is production-capable before any external institution is asked to rely on it

## Related

- [[ADR-004 — Platform Tenant Architecture]]
- [[ADR-005 — Capability-Based Authority Model]]
- [[Corveaux V2 - Session 01]]