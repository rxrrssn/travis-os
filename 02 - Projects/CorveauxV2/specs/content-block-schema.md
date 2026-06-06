---
type: spec
domain: corveaux
status: draft
date: 2026-06-05
tags: [corveaux, content-blocks, schema, spec]
---
# Content Block Schema

**Status:** Draft. To be written before Day 30.

## Purpose

Define the TypeScript/Zod schema for each content block type.

Blocks are stable renderable projections assembled from canonical institutional primitives. They are not canonical themselves.

This spec defines the projection schema, not the canonical institutional model.

---

## Block Types (Initial Hypothesis)

- ProgramBlock
- CourseBlock
- RequirementBlock
- ServiceBlock
- ContactBlock
- DepartmentBlock
- PolicyBlock
- LocationBlock

---

## Required Fields

All blocks must include:

- id
- tenantId
- blockType
- sourceUrls
- extractedAt
- validFrom
- validTo
- confidenceScore
- ownerId
- status
- renderingContexts

---

## Notes

Use `sourceUrls`, plural.

A block may assemble facts from multiple canonical primitives and therefore multiple cited sources.

---

## Open Questions

- [ ] What is the minimal viable block schema for the Day 30 extraction run?
- [ ] How are nested blocks handled?
- [ ] How is a block that exists at multiple URLs resolved?
- [ ] How are renderingContexts represented in the schema?
- [ ] How are block fields mapped back to canonical primitives?

---

## Related

- [[ADR-003 — Content Block Architecture]]
- [[ADR-009 — Tech Stack]]