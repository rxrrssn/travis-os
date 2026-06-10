---
type: daily
date: 2026-06-06
---

# Corveaux V2 — Session 09 — Backlog Clearance and Tenant Zero Implementation

## Focus

Two parallel workstreams: (1) competitive intelligence research to fill Session 02 backlog items, (2) Tenant Zero implementation — full seed of all 5 offices, 4 positions, platform tiers, services, Travis identity, policies, ontology config, and content blocks.

## Tasks

- [x] Research AI vendors actively pitching higher education (2024–2026)
- [x] Research catalog platform market — CourseLeaf and Acalog market share, installed base, lock-in patterns
- [x] Research typical community college tech stack (SIS, CMS, catalog, portal)
- [x] Research incumbent vendor contracts and procurement patterns
- [x] Research competitive displacement conversation dynamics
- [x] Update [[competitive-landscape]] — replaced draft stub with full research findings
- [x] Update [[buyer-personas]] — competitive discovery questions closed; procurement and buyer research answered
- [x] Update [[catalog-format-survey]] — poid stability confirmed non-stable, catoid history documented, SLCC tech stack table added
- [x] Rewrite `prisma/seeds/tenant-zero.seed.ts` — full Tenant Zero canonical data seeded
- [x] Fix Prisma upsert incompatibility with partial unique index on `entities.canonical_key`
- [x] Seed all 5 offices with `part_of` Corveaux org relationship
- [x] Seed Platform Engineer, Implementation Lead, Institutional Analyst positions
- [x] Seed platform tiers (4 Program entities) and services (5 Service entities)
- [x] Seed Travis `has_identity` → `identity:travis-primary` entity
- [x] Seed Publishing Policy and Ontology Governance Policy
- [x] Seed Tenant Isolation Policy and Access Control Policy
- [x] Seed ontology config: 6 entity types, 2 identifier types, 6 person fields
- [x] Seed 4 content blocks (DRAFT): Office of System, Office of Platform, Travis profile, Founder position
- [x] Correct Travis position to "Founder & Chief Systems Officer"
- [x] Update Tenant Zero Checklist — all seeded items marked complete

## Wins

- competitive-landscape.md is no longer a stub — all five research questions answered with specific vendor names, market share estimates, and lock-in mechanics
- buyer-personas.md complete — all Institutional Purchasing, Buyer Discovery, Champion, Procurement, Strategic, and Platform Discovery questions answered with community-college-specific research
- catalog-format-survey.md complete — poid instability confirmed, catoid history documented (13 catalogs, non-sequential), SLCC tech stack table confirmed via public sources
- SLCC tech stack confirmed: Ellucian Banner 9 (SIS), Canvas (LMS), Entra ID (SSO), DegreeWorks (degree audit), Ellucian Experience (student portal), Cognos (BI), Jaggaer SLCCBuy (eProcurement), SoftDocs (document management), Microsoft 365
- Session 02 research backlog fully cleared — buyer-personas.md, competitive-landscape.md, catalog-format-survey.md all complete
- Tenant Zero seed rewritten — all 5 offices, 4 positions, 4 platform tiers, 5 services, Travis identity chain, 5 policies, 6 entity types, 2 identifier types, 6 person fields, 4 content blocks seeded
- Partial unique index fix — `entities.canonical_key` has only a partial index (WHERE valid_to IS NULL). Prisma `upsert` generates `ON CONFLICT (canonical_key)` which fails. All entity upserts converted to `findFirst({ where: { canonicalKey, validTo: null } }) + create/update`
- Travis position title corrected to "Founder & Chief Systems Officer" in entity, content block, and institution model
- Tenant Zero Checklist updated — all seeded items marked complete; Entra Identity still pending real OID

## Decisions

- **Position title:** "Founder & Chief Systems Officer" — not "Founder & CEO"
- **Entity upsert pattern:** `findFirst + create/update` is the required pattern for any entity with a partial unique index. TenantOntologyEntityType, TenantOntologyIdentifierType, TenantOntologyField retain `upsert()` because their unique indexes are full, not partial.
- **Content block canonical keys:** Content blocks do NOT have a unique DB constraint on `canonical_key` in the current migration — `findFirst + create` required, not `upsert`.

## Key Findings

**Market Share (Catalog Platforms)**
- Modern Campus / Acalog: ~42%
- CourseLeaf: ~25%
- Kuali, Watermark, Coursedog, Clean Catalog: remainder

**Market Share (SIS — North America)**
- Ellucian Banner: 24%
- Ellucian Colleague: 11%
- Jenzabar: 11%
- Anthology: 10%
- Oracle PeopleSoft: 10%
- Workday: 3% (fastest growing)

**The AI Narrative Has Commoditized**
Every major incumbent (Ellucian, Anthology, Modern Campus, EAB) is now saying "AI-powered." Differentiation must be on institutional accuracy and the canonical model — not AI generically.

**Modern Campus Is the Most Direct Overlap**
They own 42% of catalog management and 550+ web CMS deployments. But they own the authoring/workflow side. Corveaux targets the structured canonical output side. These can coexist initially.

**Ellucian Is Both the Biggest Incumbent and the Best Potential Channel**
Banner in 24% of all North American institutions. A clean Ethos/Banner read integration is the technical story that resonates with CIOs already inside the Ellucian ecosystem.

**Procurement Reality at Community Colleges**
- Contracts are 3–5 years; budget cycles are annual or biennial
- Most community colleges buy through cooperative purchasing (OMNIA, E&I, Sourcewell) — new vendors not on these vehicles face 6–12 months extra friction
- Small IT teams (5–15 people) concentrate on known vendors
- FERPA/security review adds months to any new vendor approval
- Curriculum tools require Faculty Senate + Academic Affairs approval, not just IT

## Blockers

- [x] Entra Identity (`identity:travis-primary`) external_id is no longer `"pending"`; `entra_object_id`/`entra_email` identifiers persisted and authority resolves to `platform.operator` ([[Corveaux V2 - Session 11 — Tenant Zero Auth Validation]])

## Next Session Targets (Session 10)

- Run full 132-page catalog extraction: `npm run trigger:catalog`
- `npm run metrics` after full run — refresh economics baseline
- Manual accuracy sample: 10–20 programs against SLCC catalog ground truth
- Day 30 gate formal assessment — Coverage, Accuracy, Economics, Operational Reliability
- [x] Entra ID auth end-to-end browser verification — completed in [[Corveaux V2 - Session 11 — Tenant Zero Auth Validation]]
- S3 integration for crawl storage (still local `tmp/crawl-output/`)
- Remaining vault backlog (Sessions 03–05): content-block-schema.md open decisions, generated-tenant-spec.md rendering decision, role-aware-rendering-spec.md rendering decision

## Related

- [[competitive-landscape]]
- [[buyer-personas]]
- [[catalog-format-survey]]
- [[GTM Hypothesis]]
- [[Corveaux Tenant Zero Checklist]]
- [[ADR-006 — Tenant Zero]]
- [[SLCC Validation Run]]
