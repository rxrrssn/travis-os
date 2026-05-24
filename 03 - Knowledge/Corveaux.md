---
type: concept
domain: corveaux
status: active
tags:
  - company
  - saas
  - edtech
  - platform
  - vision
  - higher-ed
  - multi-tenant
---

# Corveaux

## What It Is

Corveaux LLC is Travis's private Delaware LLC -- a SaaS / EdTech company. Solo founder.

Not just an SIS or CRM. The intended institutional nervous system for colleges, especially community colleges and workforce institutions.

Name history: Vetra -> Corvux -> Corveaux

## Development Status (as of 2026-05-23)

Very early-stage but unusually well-defined architecturally. Strongest current asset is the systems thinking and operational model -- not the code.

**Exists:** foundational architecture, product philosophy, tenant model, IAM concepts, workflow ideology, operational design patterns, branding, domain, legal formation, infrastructure setup, early Next.js / Tailwind / Prisma prototyping.

**Not yet:** mature MVP, production customers, full engineering team, institutional pilots.

## Taglines

- "One System, One Institution, Every Student."
- "The system that ensures nothing falls through."

## URLs

- https://www.corveaux.app
- https://www.crvx.app

---

## Core Philosophy

### Canonical Data

There should only ever be one instance of:

- one PERSON
- one COURSE
- one DEPARTMENT
- one POLICY
- one KNOWLEDGE BLOCK

Everything else references the same underlying object. No sync drift. No duplicate records. No middleware spaghetti.

### Do It Once, Reuse Everywhere

Workflows, webpages, directories, open positions -- created once, referenced everywhere. If something needs to appear in multiple places it is referenced, not recreated. Eliminates repetitive work and ensures consistency automatically.

### The System Does the Work

Humans focus on: students, teaching, support, decision making.

The platform handles: routing, orchestration, nudging, provisioning, compliance, lifecycle automation, scheduling, communication segmentation.

"Train the system once, then let it operate."

---

## Platform Scope

Corveaux unifies as native modules -- not integrations:

- SIS
- LMS
- CRM / admissions
- Student success / advising
- ITSM / help desk
- HR / payroll
- Finance / procurement
- Identity / IAM
- CMS / websites
- Knowledge management
- Facilities / space
- Communications / campaigning
- Workflow / automation

---

## Architecture

### Multi-Tenant SaaS

- Each institution is an isolated tenant
- Corveaux dogfoods the platform internally as its own first tenant
- Platform employees have global support/admin roles or scoped tenant access
- Institutions own their data, branding, workflows, and governance
- Domain parking / forwarding for tenant institutions

### First Tenants

- Corveaux LLC (the company itself)
- Corveaux University -- demo environment and institutional support hub

### Technical Stack

Next.js, Tailwind CSS, PostgreSQL, Prisma, multi-tenant app shell architecture, tenant-aware theming, RBAC everywhere, strong workflow/event architecture.

Preferences: full-stack ownership, minimal third-party dependency, operational simplicity, deeply integrated UX.

---

## Key Product Areas

### Web / CMS / Knowledge (Wedge Product)

Primary entry point for institutional adoption.

- Decentralized content ownership
- Canonical knowledge blocks
- Automatic propagation
- Review cadences
- Role-aware pages
- Public/private dynamic rendering

Marketing owns presentation. Departments own truth.

### Student Success

Proactive lifecycle orchestration:
- Hold interventions
- Advisor assignment
- Onboarding nudges
- Registration campaigns
- Persistence workflows
- Engagement scoring

Informed by Travis's work with Mainstay, Navigate360, and Contact Center operations.

### Identity / IAM

Corveaux is the authoritative business process engine for identity.

Example lifecycle flow:
1. Student admitted
2. Corveaux approves lifecycle transition
3. Entra provisions identity
4. Downstream systems inherit access

Corveaux governs lifecycle. IAM platforms enforce policy.

---

## Governance

Because all roles, assignments, and institutional relationships live inside Corveaux:
- Nothing is orphaned (pages, content, processes, workflows)
- Role ownership persists when people change
- Access and provisioning are tied to roles, not individuals

Core governance principle: **people change, roles persist.**

---

## Organizational Structure

Corveaux itself is organized into offices that mirror how the product thinks about institutions:

- **Office of Institutional Continuity** -- onboarding, support, implementation, partner success
- **Platform** -- infrastructure, IAM, engineering
- **System** -- finance, procurement, executive operations
- **People & Culture** -- HR / internal operations

---

## What Corveaux Is NOT

Corveaux is not a middleware marketplace.

Ellucian's model invites third-party vendors to fill gaps between segmented systems and band-aid them together with APIs and integrations. That model is the problem Corveaux is solving -- not a template to follow.

Corveaux is one TRUE system:
- No batch processing
- No API-based sync between internal modules
- No vendor marketplace filling gaps
- No integration layer as a product category
- Data is updated in the moment, everywhere, instantly

When something changes in Corveaux, every part of the platform that references that data reflects the change immediately. There is no sync job, no webhook delay, no middleware translating between systems.

This is only possible because everything is native -- not integrated.

Politically, Corveaux cannot say "rip out Banner tomorrow." The external message is continuity and gradual modernization. The internal reality is progressive system-of-record displacement. See [[Corveaux GTM Strategy]] for the full transitional coexistence model (Observe -> Orchestrate -> Absorb).

## Competitive Positioning

Philosophically opposed to: SaaS sprawl, tribal knowledge, middleware dependency, passive systems, fragmented student experiences.

Current higher-ed ecosystems are: reactive, siloed, integration-heavy, operationally wasteful.

Corveaux is: proactive, unified, operationally intelligent, lifecycle-aware.

---

## Long-Term Vision

A college where:
- Websites update themselves from canonical data
- Courses and syllabi provision automatically
- Campaigns self-segment
- Workflows adapt dynamically
- Staffing and scheduling optimize continuously
- Departments operate from shared institutional truth

Not "software for colleges." A digital institution layer.

---

## Related

[[SLCC Overview]]
[[One Voice One Brutus]]
[[Mainstay Brutus]]
[[TDX]]
[[Contact Center]]
[[Corveaux Pricing Model]]
[[Corveaux GTM Strategy]]
[[Corveaux Data Portability]]
[[Corveaux Regulatory Surface]]
