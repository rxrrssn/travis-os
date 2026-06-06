---
type: decision
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, architecture, content-blocks, rendering]
---

# ADR-003 — Content Block Architecture

## Decision

Content blocks are the atomic unit of institutional knowledge for rendering purposes. Pages are not canonical. Blocks render across website, catalog, assistant, portal, and search from the same definition. Blocks are projections of the canonical primitive layer, not the canonical layer themselves.

## Context

The rendering model requires a layer between the canonical primitives (Entities, Relationships, Events, Policies, Time) and the final rendered surfaces (website pages, catalog entries, search results). Content blocks serve this role.

## Options Considered

1. **Page-based model** — Pages are the unit of content. Each page is authored and published independently. Standard CMS approach. Does not support "One Reality. Many Projections."
2. **Content blocks as canonical** (initially considered) — Blocks are the source of truth. Rejected: blocks are rendered objects, not canonical objects. The canonical layer must be the primitive model.
3. **Content blocks as projection layer** (chosen) — Blocks are assembled from canonical primitives for specific rendering contexts. The same primitive data produces different blocks for different audiences and surfaces.

## Rationale

"Pages are not canonical. Content blocks are canonical." — but canonical within the *rendering* layer, not the data layer.

A ProgramBlock assembled from Program + Department + Contact primitives can render as:
- A full program detail page on the website
- A catalog entry with formal formatting conventions
- A teaser in search results
- A grounding context for the institutional assistant

The same block, different rendering context. This is the mechanical expression of "One Reality. Many Projections."

Core block types:
- ProgramBlock (Program entity + related Requirements, Courses, Contacts, Departments)
- CourseBlock (Course entity + prerequisites, corequisites, offering department)
- RequirementBlock (Requirement entity + linked Courses, Policies)
- DepartmentBlock (Organization entity + parent unit, programs, services, contacts)
- ServiceBlock (Service entity + eligibility, contact, audience tags)
- ContactBlock (Person entity + title, department, contact info)
- PolicyBlock (Policy entity + category, effective date, body)
- LocationBlock (Building/Room entity + hours, services)

Each block type defines field-to-rendering-context mappings: which fields appear in website rendering, catalog rendering, assistant grounding, search indexing, and API responses.

## Stakeholders

- Builder (Travis Hornbuckle)

## Consequences

- The block schema must include `rendering_contexts` metadata from Day 1; adding it later requires retroactive migration
- Block extraction: the pipeline assembles blocks from classified and validated primitive extractions
- Block governance: each block has an owner, a confidence score, a last-verified date, and an approval history
- Catalog round-trip: a ProgramBlock extracted from a catalog must be renderable back into catalog-quality output without data loss
- The assistant primarily queries the projection layer for institutional content and presentation contexts. When required, it may also query canonical primitives, relationships, policies, and temporal state through the institutional model.

## Revision (2026-06-05)

The original Rationale section used the phrase "Content blocks are canonical within the rendering layer." This phrasing is imprecise and has been superseded.

The correct statement:

Content blocks are stable renderable projections assembled from canonical institutional primitives. They are not canonical in any layer. No projection is canonical.

The canonical layer is strictly:
- Entities
- Relationships
- Events
- Policies
- Time

Content blocks, pages, portals, APIs, workflows, assistant responses, reports, and dashboards are all projections. The projection layer may have stable, reusable units (content blocks) but stability does not make a projection canonical.

The architectural axiom is:

> The institutional model is canonical. Everything else is a projection.

No page is canonical. No content block is canonical.

## Related

- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-004 — Platform Tenant Architecture]]
- [[Corveaux V2 - Session 01]]
- [[Corveaux V2 - Session 02 — Tech Stack and Vault Infrastructure]]
