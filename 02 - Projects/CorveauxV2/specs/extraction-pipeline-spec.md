---
type: spec
domain: corveaux
status: draft
date: 2026-06-05
tags: [corveaux, extraction, pipeline, spec]
---
# Extraction Pipeline Spec

**Status:** Draft. To be written before Day 30.

## Purpose

Define the extraction pipeline that converts public institutional sources into canonical institutional primitives, then generates content blocks as projections.

The pipeline must preserve citations, confidence, provenance, and run history for every extracted fact.

---

## Pipeline Stages

1. Crawl — discover and fetch pages from website, catalog, directory, and other public sources
2. Parse — extract structured content from HTML/PDF
3. Extract — identify canonical primitives: Entities, Relationships, Events, Policies, Time
4. Validate — verify required fields, source citations, and confidence scores
5. Deduplicate — resolve the same entity or fact appearing across sources
6. Store — write validated primitives to PostgreSQL
7. Generate — produce content blocks as stable renderable projections from primitives

---

## Technology Choices

- Crawlee, built on Playwright, for crawling
- Anthropic behind provider interface for extraction
- Trigger.dev for pipeline orchestration (see [[ADR-011 — Background Job Platform]])
- PostgreSQL + Prisma for storage
- Zod for schema validation at each pipeline stage

---

## Non-Negotiables

- No citation = no fact
- The institutional model is canonical
- Content blocks are projections, not canonical records
- Every extraction run must be versioned
- Every extracted fact must retain source provenance
- Re-runs must be diffable against prior runs

---

## Open Questions

- [ ] What is the extraction prompt structure for each primitive type?
- [ ] How are confidence scores computed and stored?
- [ ] How are extraction runs versioned?
- [ ] How is deduplication handled across sources?
- [ ] How are conflicts between sources resolved?
- [ ] How are extracted primitives mapped into content blocks?

---

## Related

- [[ADR-001 — Entry Wedge Selection]]
- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-007 — LLM Strategy Positioning]]
- [[ADR-009 — Tech Stack]]
- [[content-block-schema]]