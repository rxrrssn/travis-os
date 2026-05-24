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

## Development Status (as of 2026-05-24)

Active MVP in progress. Admin shell is functional. Three build sessions completed.

**Exists:** foundational architecture, product philosophy, tenant model, IAM concepts, workflow ideology, operational design patterns, branding, domain, legal formation, full Prisma schema, seed data, working dev server, complete admin UI for Sites / Pages / Blocks / KB, public tenant routing, site importer.

**Working admin routes:** `/admin/sites`, `/admin/sites/[siteId]`, `/admin/pages`, `/admin/blocks`, `/admin/blocks/[blockId]/edit`, `/admin/kb`, `/admin/kb/[articleId]/edit`

**Working public routes:** `/t/[slug]`, `/t/[slug]/[...path]`, `/t/[slug]/kb`, `/t/[slug]/kb/[articleSlug]`

**Not yet:** auth layer, tenant theme rendering, tag/category management UI, production DB (NeonDB), institutional pilots.

See [[Corveaux CMS Build - Session 1]], [[Corveaux CMS Build - Session 2]], [[Corveaux CMS Build - Session 3]] for full build logs.

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

Corveaux the company lives the values it sells: canonical structure, single source of truth, de-siloed roles. The internal org model is itself a dogfood of the platform philosophy.

Corveaux is organized into five named offices:

### Office of the Platform
Infrastructure, engineering, server operations, IAM, and internal technical support. Everything that keeps the platform running.

### Office of the System
Executive leadership, finance, AP, AR, and legal. Operates as the visionary and operational core of the company.

### Office of People & Culture
HR, benefits, employee onboarding, and internal culture operations.

### Office of Intelligence
Oversees performance, analytics, and metrics -- both internally (platform health, company operations) and externally in support of institutional partners. The team responsible for turning data into operational insight across every layer of the company.

### Office of Institutional Partnerships
Manages all institutional relationships. Does not use traditional account managers.

Instead, institutions are supported by **Pods** -- cross-functional teams assigned to each institution. A Pod includes at minimum:

- **Partnership Manager (PM)** -- primary point of contact for the institution; owns the relationship end-to-end
- **Institutional Success Partner (ISP)** -- strategic alignment, platform adoption, ongoing success
- **Implementation Partner (IP)** -- onboarding, configuration, technical deployment

Additional Pod roles may be defined as the model matures.

The Pod model deliberately de-silos the onboarding and relationship management process. Rather than handoffs between sales, implementation, and support, one Pod maintains continuity across the full institutional lifecycle.

#### Matrix Reporting Structure

Pod members operate on a dual-reporting model:

- **Daily / project reporting** to their Pod lead for active institutional work
- **Functional reporting** to a manager within their home office subdivision

This keeps cross-functional teams coherent around institutional outcomes while preserving clear career paths, specialization, and accountability within each office. The structure mirrors the platform's own principle: roles are canonical, but context is flexible.

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
