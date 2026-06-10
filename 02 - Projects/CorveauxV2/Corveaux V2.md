---
type: project
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, platform, institutional-os, v2]
---

# Corveaux V2

## Objective

Build Corveaux as an Institutional Operating System. Model the institution directly. Render it as role-aware experiences across every surface. Become the primary institutional operating environment over time.

One Reality. Many Projections.

## Stakeholders

- Travis Hornbuckle — Founder, builder, Tenant Zero operator
- SLCC — Control case institution (ground truth known)
- Higher-ed institutions — Target market (community colleges, regional universities, R1s, system offices)

## Systems

**Platform stack (decided 2026-06-05, see [[ADR-009 — Tech Stack]]):**

| Layer | Choice |
|---|---|
| Language | TypeScript |
| Frontend | Next.js + React |
| Backend | Next.js API routes + Cloudflare Workers/Workflows |
| Database | Neon PostgreSQL |
| ORM | Prisma |
| Auth | Microsoft Entra ID + local recovery auth |
| Background Jobs | Cloudflare Workers/Workflows (Trigger.dev fully removed, Session 25) |
| AI | Anthropic behind provider interface |
| Search | PostgreSQL FTS |
| Storage | Cloudflare R2, isolated data/audit buckets per tenant |
| Observability | OpenTelemetry + Sentry |
| Infrastructure | Cloudflare + Neon; local Docker PostgreSQL retained for rollback/development |

**Tenant isolation:** Database-per-tenant or schema-per-tenant. Shared-schema with RLS is rejected for production. See [[ADR-010 — Tenant Isolation Architecture]].

**Related vault notes:**
- [[Corveaux]] — full product history and development log

## Current State

**Stage (as of 2026-06-10):** Day 30 is closed and Day 60 is underway. The Cloudflare + Neon production-shaped foundation is live. The platform database runs on Neon through Cloudflare Hyperdrive. Corveaux Tenant Zero and SLCC Validation run in separate Neon projects with separate Cloudflare Workers and private R2 data/audit buckets. GitHub Actions now owns CI, automatic staging deployment, and approval-gated production promotion of staging-verified SHAs. The Next.js frontend is packaged for Cloudflare Workers through OpenNext. See [[ADR-020 — Deployment and Promotion Architecture]]. The tenant-admin authoring layer is now substantial: content review + canonical editor with effective dating ([[Corveaux V2 - Session 24 — Tenant Content Review and Canonical Editor]], [[ADR-021 — Effective Dating on Entity and Relationship]]), and a drag-and-drop page builder, ontology UI, brand/theme editor, and Impressionist visual-identity extraction ([[Corveaux V2 - Session 25 — Page Builder, Impressionist Branding, and Tenant Footer]]). The application repo was given a hygiene + security pass and migrated off the deprecated `next lint` ([[Corveaux V2 - Session 26 — Repo Hygiene, Security Audit, and ESLint Migration]]).

### Live Infrastructure Baseline

- Platform Neon project in `aws-us-east-1`; platform schema migrated and row-count verified.
- Platform Worker deployed with Hyperdrive, provisioning Workflow, and platform audit R2 binding.
- Corveaux Tenant Zero and SLCC Validation each have:
  - an isolated Neon project
  - a dedicated tenant Worker
  - a private R2 data bucket
  - a private R2 audit bucket
- Platform/admin runtime uses the pooled Neon platform endpoint.
- Tenant Workers connect directly to their assigned Neon tenant database.
- Audit events are append-only in PostgreSQL, use transactional outboxes, retain for seven years by default, and export to R2.
- `tenant_region` and `tenant_residency_requirement` are provisioning inputs persisted in the platform registry.
- Production dependency audit reports zero known vulnerabilities after targeted transitive overrides.
- This is a compliance-capable technical baseline, not a claim of FERPA or SOC 2 Type II compliance. Contracts, policies, control ownership, access reviews, incident response, evidence collection, backup/restore testing, and an operating period remain required.

**What exists:**
- Next.js project (TypeScript, App Router, PostgreSQL, Prisma)
- Two-schema architecture: platform DB (`tenants`) + tenant DB (10 canonical tables)
- Canonical primitives: Entity, EntityIdentifier, Relationship, InstitutionalEvent, Policy
- Pipeline models: ExtractionRun, ExtractionObservation (with GIN-indexed dependency JSONB)
- ContentBlock projection model with full dependency graph and GIN indexes
- Four institutional services: EntityService, RelationshipService, EventService, PolicyService
- TypeScript type registry: EntityTypes, RelationshipTypes, EventTypes, BlockTypes, RenderingContexts
- Zod schemas for all 8 content block types
- Tenant Zero seeded and rewritten (Session 09): Corveaux org, Travis person, Founder & CEO position, relationships, ontology config
- ADR-001 through ADR-017
- Specs: extraction-pipeline-spec, content-block-schema, generated-tenant-spec, role-aware-rendering-spec (all complete and active)
- Auth layer: NextAuth v5, MicrosoftEntraID provider, JWT/session with entraOid, canonical Tenant Zero identity linking, authority-scoped audience context, middleware ([[Corveaux V2 - Session 11 — Tenant Zero Auth Validation]])
- Extraction pipeline: Cloudflare Workers dispatch (Trigger.dev removed, Session 25), topologically-ordered (courses → programs → documents) per [[ADR-016 — Topological Extraction Order and Content Quality Pipeline]], custom cache-aware Cartographer crawler (Crawlee removed), Claude extractor, promotion engine, block regeneration
- R2-backed crawl cache with read-back wired into both discovery and extraction, shared via deterministic `pageKey(sourceSlug, canonicalUrl)` ([[ADR-017 — Cache-Aware Crawling and Extraction]])
- **Day 30 gate: CLOSED (Session 17, 2026-06-07).** Run 001 (conditional pass, five defects fixed in Session 14) → Cartographer rebuild + WAF fix (Sessions 15-16) → Run 002 → live re-sample scored 96.5% combined accuracy, corroborated by the user's own independent random-20 manual review at 99.4% (zero FAILs, [[day-30-gate-resample-random-20-manual]]) — both well clear of the ≥90% bar. The three defect classes found (Bugs 15-17) were squashed same-session (Bug 15 code-fixed+verified, Bugs 16-17 prompt-mitigated pending re-verification). The user formally authorized close-out after confirming their manual review was complete. **Day 60 generated-tenant work is now unblocked.**
- ADR-018 canonical extraction shape: fixed course/program attribute sets, relationship-attached policies, bounded extraction policy taxonomy, three-phase promotion ordering, and canonical attribute enforcement
- Platform Admin operator cockpit: `/admin`, tenant/source/extraction-run views, tenant/source/extraction controls, tenant-level manual pipeline, operation history/audit trail, operation result visibility, and manual retry
- Platform operation tables: `TenantSource` and `TenantOperation`; operation state remains durable and separate append-only audit events capture actor, authority, request, resource, purpose, deployment, and schema context
- TenantOperation worker: `generate_tenant` regenerates projection blocks for active tenant entities and writes `entityCount`, `blocksWritten`, and `generatedAt` into operation result
- TenantOperation worker: `source.crawl` runs Cartographer from the admin pane, updates source health, writes crawl metadata, and renders discovered/cache/error counts in operation results
- TenantOperation worker: `extraction.run` — Cloudflare Workflow creates the run, fans out one queue message per page, a queue consumer extracts each page via Claude and writes observations, and a finalizer promotes (archivist) + regenerates blocks (projector) and reports completion; verified live on dev SLCC ([[Corveaux V2 - Session 27 — Extraction Run Worker Verification]])
- TenantOperation worker: `extraction.retry_failed` — re-extracts only a prior run's failed pages, reusing the `extraction.run` pipeline and recovering the source's original scope/excluded-type rules (built Session 27; needs a Worker redeploy to go live)
- TenantOperation worker: `source.cache.purge` — deletes all cached crawl HTML under `crawl/{sourceSlug}/` in the tenant R2 bucket and resets the source cache count, forcing the next crawl/extraction to re-fetch live (built Session 27; needs a Worker redeploy to go live)
- TenantOperation workers: `extraction.promote_run` (manual re-canonization — archivist + projector over a run), `source.validate` (fetch the source URL, reject WAF/bot-challenge + too-small responses, write `validationStatus` back to the source), and `tenant.review` (review snapshot — entity/relationship/policy/content-block counts) — completing operation-worker coverage (built Session 28; needs a Worker redeploy to go live)
- Platform provisioning Workflow creates isolated Neon tenant projects and records non-secret database target metadata.
- Cloudflare tenant generation Workflow completed an end-to-end live validation, including direct Neon work and authenticated callback to the platform Worker.
- Separate append-only `PlatformAuditEvent` / `AuditEvent` tables and transactional audit outboxes exist at platform and tenant levels.
- Protected admin views and admin actions produce audit events with actor, authority, request, resource, and purpose context.
- GitHub Actions deployment architecture: PR CI, automatic staging from `master`, approval-gated production promotion, Neon pre-deploy restore branches, migration compatibility checks, smoke tests, and durable deployment evidence.
- Tenant content review + canonical editor: tenant-scoped review queue, edit canonical `Entity`/`Relationship` records then regenerate affected `ContentBlock`s, with `validTo` (supersede) vs `effectiveTo` (institutional period ended) as distinct actions ([[Corveaux V2 - Session 24 — Tenant Content Review and Canonical Editor]], [[ADR-021 — Effective Dating on Entity and Relationship]])
- Tenant page builder: `TenantPage` model, `@dnd-kit` drag-and-drop, four section types (hero, rich-text, entity-list, cta-banner), page-layout picker, home-page promotion, draft preview, shared `TenantBuiltPage` server renderer ([[Corveaux V2 - Session 25 — Page Builder, Impressionist Branding, and Tenant Footer]])
- Tenant ontology UI, brand/theme editor, Impressionist visual-identity extraction (Claude reads source HTML → `themeConfig` → scoped `<style>`), logo/favicon upload to tenant R2 media bucket, and a configurable multi-column tenant footer (Session 25)
- Repo is clean and secure: zero tracked secrets, zero prod vulnerabilities, lint migrated to the ESLint CLI, dead Trigger.dev-era scripts removed ([[Corveaux V2 - Session 26 — Repo Hygiene, Security Audit, and ESLint Migration]])

**What does not exist yet:**
- (Role-aware rendering now differentiates by audience — ADR-022 Phase 1, Session 29 — driven by a configurable `rendering_visibility` policy)
- Full generated tenant routes/experience end-to-end
- (Operation-worker backlog cleared — every TenantOperation type now has a worker: `generate_tenant`, `source.crawl`, `source.cache.purge`, `source.validate`, `extraction.run`, `extraction.retry_failed`, `extraction.promote_run`, `tenant.review`. `extraction.run` is verified live; the rest are built and need a tenant/platform Worker redeploy to go live.)
- Search layer
- Cloudflare-native crawl/extraction fan-out and queue controls
- Signed audit batch manifests and hash-chain checkpoints
- Formal FERPA contractual approval and SOC 2 Type II operating evidence

## Institutional Model Primitives

The canonical layer is built on five primitive types:

- **Entities** — Person, Organization, Program, Course, Service, Policy, Position, Building, Room, Resource
- **Relationships** — Member Of, Reports To, Assigned To, Student Of, Advisor For, Authority Over, Responsible For
- **Events** — Applied, Admitted, Registered, Hired, Approved, Graduated, Assigned (immutable)
- **Policies** — Eligibility, Governance, Approval Rules, Access Rules, Authority Rules
- **Time** — Every fact exists within time. Historical, current, and future state simultaneously.

One canonical instance per concept. One Person. One Course. One Department. One Policy. Everything else is a reference or a projection.

Content blocks are projections of these primitives. Content blocks are not canonical.

## Risks

1. **Accuracy/Hallucination** — Existential. Every extracted fact requires a source citation. No citation = no fact.
2. **Object model scope creep** — The schema must serve the 90-day goal, not the 3-year vision.
3. **Input data quality variance** — Not all institutions have clean websites. Pre-score before running.
4. **Catalog parsing complexity** — Formats vary (Acalog HTML, PDF, custom). Build adapters for top 2-3.
5. **Bidirectional sync during transition** — Design architecture early, defer full implementation.
6. **Curriculum workflow gaps** — Displacing Acalog requires Faculty Senate-grade governance. Year 2+.

## Opportunities

- No existing platform does cross-silo institutional knowledge synthesis
- Founder-market fit: builder lives the problem at SLCC
- Corveaux-as-Tenant-Zero is a compelling live demo from day one
- Web + Catalog + Directory wedge is low-risk and high-visibility
- Staged adoption model reduces procurement friction
- Expansion path is clear: Knowledge Layer -> Governance -> Identity -> Workflow -> Operational -> IOS

## Decisions

See decisions/ folder for full ADRs (ADR-001 through ADR-022).

Key decisions:
- Entry wedge: Web + Catalog + Directory (unified extraction sources)
- Institutional model: canonical primitives, not flat object store
- Content blocks: projections of canonical primitives, not canonical themselves
- Tenant architecture: Platform Layer / Institutional Layer separation
- Tenant isolation: database-per-tenant or schema-per-tenant (see [[ADR-010 — Tenant Isolation Architecture]])
- Authority model: capability-based, no tenant-type checks
- Tenant Zero: Corveaux Must Run Corveaux
- LLM: implementation detail, not product headline
- Generated tenant: production survival from day one, not disposable
- Tech stack: TypeScript, Next.js, Prisma, Cloudflare Workers/Workflows/R2/Hyperdrive, Neon PostgreSQL, Entra ID (Trigger.dev removed in Session 25; crawl/extraction now dispatch through Cloudflare Workers)
- Canonical schema: one master schema, no `tenant_id`, three identifier layers (see [[ADR-012 — Canonical Schema Architecture]])
- Type registry: TypeScript constants are authoritative, DB metadata deferred to V3 (see [[ADR-013 — Canonical Type Registry]])
- Extraction order: topological (courses before programs) to eliminate scope-leakage stubs (see [[ADR-016 — Topological Extraction Order and Content Quality Pipeline]])
- Crawl caching: cache-first, R2-backed, shared between discovery and extraction via deterministic page keys (see [[ADR-017 — Cache-Aware Crawling and Extraction]])

## Next Actions

**Day 30 (~2026-07-05)**
- [x] Implement extraction pipeline: Trigger.dev setup, crawler, Claude extractor, ExtractionObservation writer (Sessions 05-08)
- [x] Implement promotion engine: source precedence Policy, temporal canonical updates, conflict detection (Sessions 05-07)
- [x] Implement content block generator: assemble blocks from current canonical state per block type (Session 07)
- [x] Implement auth layer (Entra ID) (Session 06)
- [x] Run full extraction pipeline against SLCC — Run 001 complete (conditional pass, five defects found and fixed in Session 14); Cartographer rebuilt with R2 caching (Session 15) and a WAF cache-poisoning bug fixed (Session 16); Run 002 complete (Session 17)
- [x] Score live re-sample of 20 courses + 20 programs against ground truth — 96.5% combined material-fact accuracy, clears the >90% bar (Session 17, [[day-30-gate-resample-findings]])
- [x] User's independent random-20 manual review — scored 99.4% combined, zero FAILs, corroborates the self-check (Session 17, [[day-30-gate-resample-random-20-manual]])
- [x] Squash the three defect classes (Bugs 15-17) found in the self-check — Bug 15 (citation/identity mismatch) fixed with a code-level guardrail and verified against the live offending page; Bugs 16-17 (unit-normalization, prerequisite omissions) mitigated via `EXTRACTION_SYSTEM_PROMPT` additions, pending empirical re-verification on the next run (Session 17, `known_bugs` memory)
- [x] Formally close the Day 30 gate — **CLOSED 2026-06-07**, user-authorized after confirming their independent manual review (99.4%, corroborating the self-check's 96.5%)

**Day 60 (~2026-08-05)**
- [x] Write generated-tenant-spec and role-aware-rendering-spec — ADR-015 + both specs complete (Session 10)
- [x] Build Platform Admin operator cockpit — tenant/source/extraction views, operation persistence, first worker-backed `generate_tenant` operation (Session 19)
- [x] Implement operation worker for source crawl
- [x] Implement operation worker for extraction run — already built end-to-end (Workflow → Cloudflare Queue fan-out → consumer → finalizer/promotion → callback); **verified live** on dev SLCC (run `00e9ee48`: 3 cached URLs → COMPLETED in ~28s, 5 observations, 2 canonized, $0.018, 0 failures) ([[Corveaux V2 - Session 27 — Extraction Run Worker Verification]])
- [x] Deploy platform database to Neon through Hyperdrive
- [x] Provision isolated Neon projects and R2 buckets for Corveaux and SLCC
- [x] Deploy platform and tenant Cloudflare Workers/Workflows
- [x] Implement append-only platform/tenant audit events and R2 audit export
- [x] Build tenant content review + canonical editor with effective dating (Session 24, [[ADR-021 — Effective Dating on Entity and Relationship]])
- [x] Build tenant page builder, ontology UI, brand/theme editor, Impressionist extraction, configurable footer (Session 25)
- [x] Role-aware rendering — audience-conditional rendering now differentiates via a configurable visibility policy (ADR-022 Phase 1c/1b, Session 29). Full generated-tenant experience polish ongoing.
- [x] Configurable entitlement model (ADR-022 Phase 1): canonical Role/Capability, graph resolution + explanation trace, tenant entitlement config + explain view, governed view-as impersonation (Session 29)
- [ ] Corveaux website running on Corveaux
- [x] Implement GitHub-controlled staging and production deployment architecture
- [ ] Catalog round-trip validation
- [ ] First external buyer conversation

**Day 90 (~2026-09-05)**
- [ ] Demo-quality platform
- [ ] Go/No-Go decision

## Related Notes

- [[Corveaux]] — V1 development history, prior sessions
- [[SLCC Overview]] — Control case institution
- [[Contact Center]] — Institutional complexity the product is designed to solve
- [[Corveaux V2 - Session 01]] — Initial architecture planning session
- [[Corveaux V2 - Session 02 — Tech Stack and Vault Infrastructure]] — Tech stack, vault infrastructure, architectural doctrine
- [[Corveaux V2 - Session 03 — Canonical Schema and Tenant Zero]] — Canonical schema, tenant isolation, Tenant Zero seed
- [[Corveaux V2 - Session 04 — Content Block Zod Schemas]] — Content block schema, Zod validation
- [[Corveaux V2 - Session 05 — Extraction Pipeline Implementation]] — Full extraction pipeline: crawl, extract, write, promote
- [[Corveaux V2 - Session 06 — Auth Layer and SLCC Smoke Test]] — Entra ID auth, first SLCC smoke test
- [[Corveaux V2 - Session 07 — Catalog Extraction and Promoter Fixes]] — P2002 fix, type leakage fix, HTML stripping
- [[Corveaux V2 - Session 08 — Trigger.dev Validation and Catalog Pilot]] — Trigger.dev end-to-end, catalog pilot, extraction economics
- [[Corveaux V2 - Session 09 — Competitive Intelligence Research]] — Tenant Zero seed rewrite, competitive landscape research
- [[Corveaux V2 - Session 10 — Rendering Architecture Decision]] — ADR-015, generated-tenant-spec, role-aware-rendering-spec
- [[Corveaux V2 - Session 11 — Tenant Zero Auth Validation]] — Auth layer validation end-to-end
- [[Corveaux V2 - Session 12 — Topological Extraction Architecture]] — ADR-016, topological extraction redesign for the Day 30 gate
- [[Corveaux V2 - Session 14 — Day 30 Gate Defect Remediation]] — Fixed all five Day 30 gate assessment defects
- [[Corveaux V2 - Session 15 — Cartographer and Cache-Aware Crawling]] — ADR-017, Cartographer rebuild, R2 cache read-back
- [[Corveaux V2 - Session 16 — R2 Cleanup Close-Out and WAF Cache Poisoning Fix]] — R2 migration close-out, WAF cache-poisoning bug found and fixed, Run 002 launched
- [[Corveaux V2 - Session 17 — Day 30 Gate Live Re-Sample]] — Run 002 completion, live re-sample of 20 courses + 20 programs scored 96.5% against ground truth, six defects found and logged
- [[Corveaux V2 - Session 19 — Platform Admin and Tenant Operations]] — Platform Admin, TenantSource/TenantOperation, canonical admin auth, generate_tenant worker, operation result visibility and retry
- [[Corveaux V2 - Session 20 — Module Identity Renames and Admin Vocabulary Sweep]] — module renames (Interpreter/Archivist/Projector), admin vocabulary sweep (map/interpret/project/Canonize)
- [[Corveaux V2 - Session 20.5 — Brand Identity Applied to Auth and Platform Admin]] — Corveaux brand palette/imagery applied to /login, /auth-status, and the platform admin shell
- [[Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan]] — migration plan, since fully executed (Trigger.dev removed)
- [[Corveaux V2 - Session 22 — Cloudflare and Neon Deployment Closeout]] — live platform/tenant deployment, audit hardening, tenant split, and validation
- [[Corveaux V2 - Session 23 — GitHub Deployment Pipeline and Staging Stabilization]] — GitHub Actions deploy pipeline, staging stabilization (ADR-019/ADR-020)
- [[Corveaux V2 - Session 24 — Tenant Content Review and Canonical Editor]] — tenant content review queue, edit-canonical-then-regenerate, effective dating (ADR-021)
- [[Corveaux V2 - Session 25 — Page Builder, Impressionist Branding, and Tenant Footer]] — drag-and-drop page builder, page layouts, Impressionist theme extraction, configurable footer
- [[Corveaux V2 - Session 26 — Repo Hygiene, Security Audit, and ESLint Migration]] — security audit, next lint → ESLint CLI migration, dead Trigger.dev script removal
- [[Corveaux V2 - Session 27 — Extraction Run Worker Verification]] — extraction.run verified live; extraction.retry_failed + source.cache.purge built
- [[Corveaux V2 - Session 28 — Status Page and Operation-Worker Backlog]] — shipped status.corveaux.app; cleared the operation-worker backlog (promote_run, source.validate, tenant.review)
- [[Corveaux V2 - Session 29 — Entitlement Model (ADR-022 Phase 1)]] — configurable entitlements: Role/Capability model, graph resolution + explanation trace, role-aware rendering turned on, tenant entitlement config + explain view, governed view-as impersonation
- [[ADR-018 — Canonical Attribute Standardization and Relationship-Attached Policies]] — fixed course/program attribute sets, relationship-attached policies, three-phase promotion
- [[ADR-019 — Cloudflare and Neon Runtime Architecture]] — current infrastructure decision
- [[ADR-020 — Deployment and Promotion Architecture]] — GitHub-controlled staging and production promotion
- [[ADR-021 — Effective Dating on Entity and Relationship]] — effectiveFrom/effectiveTo/catalogYear; validTo (record dead) vs effectiveTo (period ended)
- [[ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation]] — canonical Person/Position/Role/Capability/Policy split; typed supporting tables; tenant-owned, effective-dated, explainable entitlements; role + person impersonation
- [[institutional-archetypes]] — institutional archetype research (community college, regional university, R1, system office, foundation)
