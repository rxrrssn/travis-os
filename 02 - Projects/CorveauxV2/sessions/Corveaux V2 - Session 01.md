---
type: session
project: corveaux-v2
session: 01
date: 2026-06-05
tags: [corveaux, architecture, planning, strategy, v2]
---

# Corveaux V2 - Session 01 — Initial Architecture

## Focus

Complete restart of Corveaux. Clean-slate strategic planning session to establish the V2 architecture, product definition, organizational model, and 90-day roadmap.

No code was written. This was a pure strategy and architecture session.

## Context

Corveaux V2 is a deliberate restart. Prior development (V1, Sessions 1-13) built working modules but without the clarity of the institutional model that V2 is now being built around. The V2 restart begins from an empty codebase and a blank slate.

The central question going into this session: Is the Institutional Discovery Engine the correct first product, and is this the right starting sequence?

## What We Figured Out

The session went through four major rounds of revision, each sharpening the vision.

### V1 Assessment
The initial architectural assessment challenged several assumptions:
- The "Discovery Engine" is a GTM motion, not a product
- The catalog was incorrectly being treated as politically risky to defer — it's a required extraction source
- The findings report was drifting toward being the primary deliverable (consulting business logic)
- Role-aware rendering was underweighted — it's the core demo mechanic, not a Year 2 feature
- AI was being elevated too high — it's an implementation detail, not the headline

### V2 Corrections
- Catalog is an extraction source alongside web. It provides authoritative program data the website approximates.
- The generated tenant is the product. The findings report is context embedded within the tenant.
- Role-aware rendering ("One Reality. Many Projections.") must be demonstrable on Day 90.
- AI is never said externally. The product is institutional knowledge and experience.

### V3 Expansion
The vision clarified from "interesting product" to "platform company with a defined land-and-expand architecture":
- Generated tenant designed for production survival from Day 1
- Content blocks as first-class objects (blocks are canonical, pages are not)
- Corveaux as Tenant Zero — Corveaux Must Run Corveaux
- Staged adoption model: Observe â†’ Validate â†’ Govern â†’ Launch â†’ Retire
- Vendor consolidation sequencing (not exclusion — sequencing)

### V4 Final Framework
The builder wrote the definitive document separating eight distinct concerns:

1. Corveaux Organizational Vision
2. Platform Vision
3. Platform Architecture
4. Product Strategy
5. GTM Strategy
6. Expansion Strategy
7. Roadmap

Key clarifications in V4:
- Corveaux is an Institutional Operating System
- Canonical primitives: Entities, Relationships, Events, Policies, Time
- Events are immutable
- Time is native — every fact exists within historical, current, and future state
- Authority emerges from Relationships + Policies + Time; it is not assigned
- No domain is permanently excluded — expansion is sequenced, not bounded
- The Final Principle: "Does this make it easier or harder for Corveaux to eventually model and operate the entire institution?"

## Decisions

Key architectural decisions made (see `decisions/` folder for full ADRs):

1. **Entry Wedge** — Web + Catalog + Directory as unified extraction sources (not separate modules)
2. **Institutional Model** — Canonical primitives (Entities, Relationships, Events, Policies, Time) — not a flat object store
3. **Content Blocks** — Blocks are canonical. Pages are not. Blocks render across website, catalog, assistant, portal, search.
4. **Tenant Architecture** — Platform Layer (Corveaux-operated) / Institutional Layer (tenant-operated), cleanly separated
5. **Authority Model** — Capability-based. `institution.viewer`, `institution.contributor`, `institution.publisher`, `institution.admin`, `platform.operator`. No `if tenant == "corveaux"` logic.
6. **Tenant Zero** — Corveaux Must Run Corveaux. Corveaux website, docs, knowledge base, and directory run on the platform before any external demos.
7. **LLM Positioning** — AI is an implementation detail. Never the external headline.
8. **Generated Tenant** — Production survival from Day 1. The demo is the institution's first encounter with the platform, not a throwaway artifact.

## Corveaux Organizational Model

Five Offices:
- Office of the System — vision, governance, strategy, operations, partnerships, finance
- Office of the Platform — infrastructure, IAM, platform engineering, security, reliability, dev experience
- Office of People & Culture — recruiting, onboarding, benefits, L&D, employee experience
- Office of Institutional Continuity — discovery, support pods, onboarding, implementation, support, renewals, expansion
- Office of Intelligence — analytics, forecasting, research, data science, product intelligence, benchmarking

The naming is intentional. Corveaux models itself as an institution, not a startup.

## 90-Day Roadmap

**Day 30 — Validate the model**
- Institutional model v1
- Extraction pipeline v1
- Content block schema v1 (with rendering context metadata from Day 1)
- Tenant architecture v1 (platform/institutional layer separation)
- Corveaux Tenant Zero initialized
- SLCC validation run
- Gate: Is the model accurate? (>90% material facts)

**Day 60 — Demonstrate the model**
- Generated tenant (SLCC-specific)
- Role-aware rendering (at minimum: Visitor, Prospective Student, Administrator)
- Corveaux website running on Corveaux
- Catalog round-trip validation
- Multi-institution testing (1 R1, 1 community college)
- Gate: Does the generated tenant feel like the institution?

**Day 90 — Validate the business**
- Demo-quality platform
- Governance workflows + block editing
- Tenant Zero fully operational
- Initial buyer conversations (2+)
- Gate: Would institutions pay for this?

## Open Questions

- Tech stack: Python + FastAPI vs. Node/TypeScript? (Decide by Day 15)
- Crawler: Crawl4AI vs. Firecrawl? (Test against SLCC; decide by Day 15)
- Catalog format distribution: What percentage use Acalog vs. PDF vs. custom HTML?
- Bidirectional sync architecture: Sketch early, implement later — what does the interface look like?
- First external institution: Who is the best first prospect after SLCC control case?

## Wins

- V4 plan approved. The clearest, most principled product definition Corveaux has had.
- The "Corveaux Must Run Corveaux" founding principle established.
- The Final Principle test established as the ongoing architectural decision filter.
- Full vault structure and project memory initialized.

## Blockers

None. Codebase is a blank slate. First blocker will appear at Day 15 tech stack decision.

## Next Session

**Session 02 should address:**
- Tech stack selection (language, framework, crawler, database)
- ADR-009: Tech Stack
- Project scaffolding (repo structure, initial directories)
- Institutional model schema design (the primitive layer)
- Tenant Zero initialization plan (what does Corveaux's own institutional model look like?)
- SLCC extraction plan (what do we actually crawl? what are the catalog URLs?)

## Related

- [[Corveaux]] — full V1 development history
- [[SLCC Overview]] — control case institution
- [[Corveaux V2]] — main project document
- `decisions/ADR-001` through `decisions/ADR-008` — decisions made this session
- V4 Strategic Plan: `C:\Users\razor\.claude\plans\corveaux-v2-planning-cheerful-breeze.md`
