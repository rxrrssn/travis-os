---
type: spec
domain: corveaux
status: active
date: 2026-06-06
tags: [corveaux, generated-tenant, spec]
---
# Generated Tenant Spec

**Status:** Active. Architectural questions resolved Session 09 (2026-06-06). See [[ADR-015 — Rendering Architecture]].

## Purpose

Define exactly what a generated tenant is, what it contains, and what the Day 60 demonstration must prove.

A generated tenant is not a mockup, prototype, or throwaway artifact.

It is the institution's first production environment generated from its own institutional reality.

---

## Definition

A generated tenant is a functioning institutional environment produced from extracted and validated institutional primitives.

The generated tenant demonstrates that:

> One Reality. Many Projections.

Institutional reality is represented once in the canonical model and rendered into usable experiences.

The generated tenant is the first proof that Corveaux can model and operate a real institution.

---

## What the Generated Tenant Is

### The Mirror

Shows the institution itself, organized and navigable.

The institution should recognize itself immediately.

### A Production Candidate

Designed for survival beyond the demo.

Not disposable.

Not a one-time sales artifact.

### A Validation Environment

Demonstrates that the extraction pipeline can create useful institutional experiences from publicly available information.

### The Institution's First Corveaux Presence

The first expression of the institution running on the Corveaux platform.

---

## What the Generated Tenant Is Not

- A static website
- A marketing demo
- A mock catalog
- A throwaway proof-of-concept
- A manually authored institutional replica

The tenant must be generated from extracted institutional reality.

---

## Day 60 Demonstration Requirements

### Institution-Specific Identity

The buyer must immediately recognize the institution.

The tenant should feel like:

- SLCC
- Not a generic college
- Not a template
- Not a demo environment

### Role-Aware Rendering

Support multiple audience perspectives:

- Visitor
- Prospective Student
- Current Student
- Faculty
- Staff
- Administrator

The same institutional reality should render differently depending on audience context.

### Gaps Layer

Reveal inconsistencies between institutional sources.

Examples:

- Website vs catalog discrepancies
- Missing ownership
- Conflicting contact information
- Outdated content

All gaps must be cited.

### Ownership Map

Display:

- Content ownership
- Organizational ownership
- Stewardship responsibilities
- Governance visibility

### Institutional Search

Allow discovery of:

- Programs
- Courses
- Services
- Departments
- Contacts
- Policies

### At Least One "Wow Moment"

A capability that demonstrates institutional understanding beyond traditional CMS, catalog, or portal products.

The wow moment should emerge naturally from the institutional model.

---

## Required Tenant Capabilities

### Institutional Navigation

Navigate by:

- Program
- Department
- Service
- Policy
- Audience
- Organizational structure

### Institutional Search

Search across generated content blocks and institutional entities.

### Citations

Every displayed fact must retain source provenance.

Users should be able to determine:

- Where information originated
- When it was extracted
- Confidence level

### Freshness Visibility

Display:

- Extraction date
- Validation status
- Ownership status
- Confidence score

### Governance Visibility

Surface:

- Responsible parties
- Ownership gaps
- Review status
- Institutional stewardship

---

## Minimum Viable Content

### Academic

- Programs
- Courses
- Requirements
- Departments

### Administrative

- Services
- Offices
- Contacts
- Locations

### Governance

- Ownership metadata
- Source citations
- Confidence metadata

---

## Success Criteria

The generated tenant succeeds if:

- Institution-specific identity is obvious
- Institutional information is discoverable
- Sources remain visible
- Governance becomes visible
- Gaps become visible
- The institution feels coherent
- The buyer can imagine replacing existing systems

---

## Decisions (Session 09, 2026-06-06)

### Architecture

- [x] What is the rendering architecture? — **Next.js 15 App Router with React Server Components.** Two route groups: `(tenant)` for public institutional content, `(platform)` for administrative governance tools. See ADR-015 for full decision record.

- [x] Next.js App Router? — **Yes.** Decided in ADR-009. RSC aligns with the server-side block query pattern. App Router route groups enforce the security boundary between public and administrative routes structurally.

- [x] React Server Components? — **Yes, RSC-first.** Audience context is resolved server-side by middleware (injected as `x-audience-context` header) and consumed by RSC. No client-side context switching. No admin metadata is serialized to the client.

- [x] Static generation vs dynamic rendering? — **Dynamic rendering for all routes in V1.** Content blocks are stored projections (regenerated by Trigger.dev on canonical change), not assembled per-request. But blocks change on canonical updates and governance events — static generation at build time would create stale pages. Dynamic RSC with per-request DB query for the block is correct. CDN caching is possible for visitor context pages after the block status and freshness model is stable (V2 optimization, not V1 requirement).

### Role Awareness

- [x] How does role-aware rendering work technically? — Middleware resolves audience context from auth state and injects `x-audience-context` header. RSC reads the header via `next/headers`. Block query filters `renderingContexts` containment. Field visibility is applied via `applyFieldVisibility()` using the tenant's `rendering_visibility` Policy. See ADR-015 §Context Resolution and §Field Visibility via Policy.

- [x] Authentication? — NextAuth + Microsoft Entra ID (already implemented). Public `(tenant)` routes do not require authentication — they serve visitor context. Administrative `(platform)` routes require authentication — enforced by middleware. No change to existing auth layer for V1.

- [x] Context selection? — V1: derived from JWT session role (resolved at sign-in). V2: resolved from canonical graph (session `entraOid` → person entity → relationships → authority_scope). V1 context mapping: unauthenticated → `visitor`; authenticated platform operator → `administrator`. Per-session context derived once at login and cached in JWT.

- [x] Demo mode? — The public `(tenant)` route IS demo mode. No separate demo infrastructure. For audience perspective switching during a sales demo: `?context=` query parameter on public routes, constrained to non-administrative contexts (`visitor`, `prospective_student`, `current_student`). Admin metadata is never accessible without authentication, regardless of query params. See ADR-015 §Demo Mode.

### Generation

- [x] Which content blocks are generated first? — **Generation order: Programs → Departments → Courses → Services → Contacts → Policies.** Programs are the extraction priority (Day 30 gate). Departments are derived from program entity relationships. Courses are derived from program requirements. Services, Contacts, and Policies require additional website crawl beyond the catalog.

- [x] Which entities are required for a viable tenant? — **Tier 1 (viable demo):** all ProgramBlocks at PUBLISHED status + DepartmentBlocks for departments owning programs + CourseBlocks for courses appearing in program requirements + institutional search across Tier 1 blocks. **Tier 2 (complete demo):** ServiceBlocks + ContactBlocks + PolicyBlocks + administrator governance view. **Tier 3 (production adoption):** personalized student views, faculty/staff contexts, location blocks, bidirectional legacy sync.

- [x] What is the minimum viable institutional model? — **132 Programs (SLCC) at PUBLISHED status, rendered navigably with department and course context, with institutional search and an administrator gaps view.** The institution must be recognizable and navigable. Search must return accurate results. The administrator view must surface ownership gaps and confidence metadata. This is the Day 60 bar.

### Validation

- [x] What qualifies as "institution-specific"? — The generated tenant passes the institution-specific test when a buyer who has not seen the system before can open the program directory and identify: this is SLCC, not a generic college. Specific evidence: institution name and identity visible, program names match the published catalog, departments correspond to actual SLCC organizational units, extracted content is accurate and current. No generic template text. No placeholder data.

- [x] How is tenant quality measured? — Three dimensions: (1) **Coverage** — what percentage of Tier 1 entities have PUBLISHED blocks? Target: ≥90% of programs. (2) **Accuracy** — random sample of 10% of PUBLISHED blocks compared to canonical source; target: ≥90% material fact accuracy (Day 30 gate threshold). (3) **Governance readiness** — what percentage of Tier 1 blocks have `ownerEntityId` assigned? Target: a viable demo does not require full ownership assignment; governance readiness is a Tier 2 metric.

- [x] What evidence proves the generated tenant is useful? — The Day 60 test is qualitative: does the generated SLCC tenant feel like SLCC? Administered as a meeting: buyer navigates the live tenant without assistance. Observable evidence of success: buyer navigates to correct program without help, recognizes their institution's content, and asks "when can this go live?" rather than "is this real data?" Secondary evidence: buyer identifies a gap or inaccuracy in the existing catalog that Corveaux surfaced — the gaps layer demonstrating value the institution didn't have before.

### Governance

- [x] How are ownership assignments represented? — `ownerEntityId` on the ContentBlock links to a Person or Organization entity in the canonical graph. Ownership claims flow: institution staff authenticates → claims ownership of a block via platform UI → system writes `ownerEntityId`, sets `reviewedAt`, drops block to REVIEW if content has changed since last review. Ownership is claimed against canonical entities — not against user accounts. When the owning person changes roles, the ownership relationship can be transferred to their successor without losing review history.

- [x] How are governance gaps surfaced? — Gaps are not a separate data entity. They are computed query results rendered in the administrator context. A gap exists when: `ownerEntityId IS NULL` (unowned), OR `status IN ('DRAFT', 'REVIEW')` past staleness threshold (unreviewed), OR `confidenceScore < 0.70` (low-confidence extraction), OR source conflict present in ExtractionObservations for the same canonical fact. The administrator program page surfaces gaps inline. The `/admin/gaps` route surfaces institution-wide gap summary as a DB aggregate query. No separate gaps table.

- [x] How are stale blocks identified? — Freshness is computed at query time from `generatedAt` relative to the tenant's freshness Policy thresholds (e.g., `published_block_stale_after_days: 180`). It is not stored on the block — storing it would require updating every block daily as time passes. The RSC renders a freshness indicator from this computation. A Trigger.dev scheduled task (daily) identifies blocks past threshold and marks them REVIEW, notifying the owning entity. No auto-archive without human review.

---

## Working Hypotheses

1. The generated tenant is the first tangible proof of the institutional model.
2. Buyers must recognize their institution immediately.
3. Governance visibility is as important as content visibility.
4. Institutional gaps create more value than perfect replication.
5. A generated tenant is the bridge between the entry wedge and the Institutional Operating System.

---

## Related

- [[ADR-003 — Content Block Architecture]]
- [[ADR-008 — Generated Tenant Lifecycle]]
- [[ADR-009 — Tech Stack]]
- [[content-block-schema]]
- [[role-aware-rendering-spec]]
- [[SLCC Validation Run]]