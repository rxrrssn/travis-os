---
type: session
domain: corveaux
project: corveaux-v2
session: 02
date: 2026-06-05
tags: [corveaux, session, tech-stack, vault, architecture]
---
# Corveaux V2 - Session 02 — Tech Stack and Vault Infrastructure

**Date:** 2026-06-05

**Continuing from:** Session 01 (strategic planning, ADR-001 through ADR-008, vision docs)

---

## Focus

Complete remaining foundational architecture work from Session 01 and establish project operating doctrine before implementation begins.

---

## What Happened

### CLAUDE.md Refactored

The project CLAUDE.md was separated into:

- `CLAUDE.md` — project doctrine, repository-safe
- `CLAUDE.local.md` — machine-specific configuration, gitignored

Project doctrine now contains:

- Institutional Operating System definition
- Architectural Axiom
- Canonical primitives
- Platform Vision vs Go-To-Market distinction
- Non-negotiable architectural rules
- Session expectations

Machine-specific paths and local environment references were moved to `CLAUDE.local.md`.

---

### Architectural Axiom Formalized

The project doctrine now explicitly establishes:

> The institutional model is canonical. Everything else is a projection.

Canonical institutional knowledge consists of:

- Entities
- Relationships
- Events
- Policies
- Time

The following are projections:

- Content blocks
- Pages
- Portals
- APIs
- Assistant responses
- Reports
- Dashboards
- Generated tenants

No page is canonical.

No content block is canonical.

---

### Platform Vision and GTM Separated

A distinction was established between:

#### Platform Vision

Corveaux as an Institutional Operating System capable of modeling and operating the institution itself.

#### Go-To-Market Strategy

- Institutional knowledge extraction
- Generated tenants
- Institutional intelligence

The entry wedge is not the platform.

Architectural decisions must optimize for the long-term platform vision rather than the initial sales motion.

---

### Tenant Isolation Elevated to Doctrine

Two architectural rules were added:

**Rule 6**

> Tenant isolation is a security boundary, not an application convention.

**Rule 7**

> No architectural decision may make future tenant separation more difficult.

This establishes tenant isolation as a core architectural requirement rather than an implementation detail.

---

### ADR-003 Revised

ADR-003 originally contained language implying that content blocks were canonical within the rendering layer.

The ADR was revised.

Current position:

> Content blocks are stable renderable projections assembled from canonical institutional primitives.

Content blocks are not canonical.

The canonical layer remains:

- Entities
- Relationships
- Events
- Policies
- Time

---

### Vault Infrastructure Completed

The remaining project structure was created.

#### Research

Created scaffold research documents:

- Competitive Landscape
- Buyer Personas
- Catalog Format Survey
- Institutional Archetypes

#### Specifications

Created scaffold specification documents:

- Content Block Schema
- Extraction Pipeline Spec
- Generated Tenant Spec
- Role-Aware Rendering Spec

#### Validation

Created:

- SLCC Validation Run

The validation directory now exists and defines the Day 30 gate.

All research and specification documents remain in draft status.

Research has not yet been conducted.

Implementation has not yet begun.

---

### ADR-009 Created

Tech stack decisions were formalized.

| Layer | Decision |
|---------|---------|
| Language | TypeScript |
| Frontend | Next.js + React |
| Backend | Next.js API Routes |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | Microsoft Entra ID + Recovery Auth |
| AI | Anthropic via Provider Interface |
| Search | PostgreSQL Full-Text Search |
| Storage | S3-Compatible Object Storage |
| Observability | OpenTelemetry + Sentry |
| Infrastructure | Docker + Coolify |

Background job orchestration remains unresolved.

---

## Decisions Made

### ADR-003

Content blocks are projections, not canonical records.

### ADR-009

Technology stack selected.

### ADR-010

Tenant isolation is a security boundary. Database-per-tenant or schema-per-tenant for production. Shared-schema with RLS rejected as a production isolation mechanism.

### ADR-011

Trigger.dev selected as the background job and pipeline orchestration platform. Rationale grounded in the IOS platform vision: an institutional operating system performs predominantly durable, long-running, batch-oriented work across every stage of the platform's lifetime.

### Project Doctrine

CLAUDE.md refactored and formalized.

---

---

## Wins

- Architectural doctrine formalized
- Canonical model clarified
- Content block ambiguity removed
- Platform vision separated from GTM
- Tenant isolation elevated to a first-class architectural concern
- Vault infrastructure completed
- Research structure created
- Specification structure created
- Validation structure created
- Technology stack selected

---

## Current State

### Complete

- Vision
- Project doctrine
- ADR-001 through ADR-009
- Research scaffolding
- Specification scaffolding
- Validation scaffolding
- Technology stack selection

### Not Started

- Application code
- Database schema
- Extraction pipeline
- Generated tenant
- Validation runs

---

## Next Session Targets

- Resolve Trigger.dev vs Inngest
- Initialize Next.js project
- Initialize PostgreSQL
- Initialize Prisma
- Design canonical institutional primitives schema
- Scaffold extraction pipeline
- Create Tenant Zero representation for Corveaux

---

## Related

- [[Corveaux V2]]
- [[Corveaux V2 - Session 01]]
- [[ADR-003 — Content Block Architecture]]
- [[ADR-009 — Tech Stack]]
- [[ADR-010 — Tenant Isolation Architecture]]
- [[ADR-011 — Background Job Platform]]