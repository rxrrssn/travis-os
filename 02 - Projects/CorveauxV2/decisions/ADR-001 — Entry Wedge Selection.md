---
type: decision
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, architecture, gtm, wedge]
---

# ADR-001 — Entry Wedge Selection

## Decision

The entry wedge is Web + Catalog + Directory, treated as unified extraction sources feeding a single institutional object store.

## Context

V2 required choosing an initial entry point into the institutional technology landscape. The question was: which institutional domain should Corveaux land in first to establish a relationship before expanding toward the full institutional operating system?

## Options Considered

1. **Web only** — Low risk, but produces a weaker institutional model without catalog data
2. **Catalog only** — Authoritative academic data but politically radioactive as a lead
3. **Web + Catalog + Directory** (chosen) — Unified extraction sources; web and catalog together produce a materially stronger model; directory adds contact/org structure
4. **Assistant first** — AI assistant as the entry product; requires a clean knowledge layer anyway, so discovery is still needed
5. **SIS integration first** — High institutional trust needed; not achievable without an established relationship

## Rationale

Web + Catalog + Directory because these domains are:
- Public and legally crawlable
- Visible (institutions are embarrassed about them)
- Low institutional risk (not compliance-critical data)
- Politically easier to adopt than internal systems
- Discoverable through automation without permission or integration

The catalog is a required extraction source, not a separate product or political concern. It provides the authoritative academic program data that the website approximates. A model built from website + catalog is materially stronger than website alone: programs, courses, prerequisites, requirements, policies, and department relationships are all present in the catalog in structured form.

The political sensitivity around catalog arises only when proposing to *publish* AI-generated catalog content. Extracting the published catalog as an input is no different from what any student does.

## Stakeholders

- Builder (Travis Hornbuckle)

## Consequences

- The extraction pipeline must include catalog parsing adapters alongside the web crawler
- The catalog format survey (Acalog HTML, PDF, custom) must be conducted in the first 10 institutions processed
- The institutional object schema must support round-trip fidelity (catalog extracted â†’ blocks â†’ catalog rendered)
- This wedge does not preclude any future domain; it is the entry point, not the ceiling

## Related

- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-003 — Content Block Architecture]]
- [[Corveaux V2 - Session 01]]
