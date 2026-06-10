---
type: decision
domain: data-architecture
status: active
date: 2026-06-10
tags: [corveaux, page-reconstruction, projections, entity-resolution, binding, generated-tenant, extraction]
---

# ADR-023 — Page Reconstruction and Single-Source Page Binding

> Status: **active** (approved Session 29). The missing half of the generated-tenant value proposition: turning a scanned *site* into assembled *pages*, not just a catalog of entity blocks. Extends [[ADR-003 — Content Block Architecture]], [[ADR-015 — Rendering Architecture]], and [[ADR-016 — Topological Extraction Order and Content Quality Pipeline]]; depends on [[ADR-012 — Canonical Schema Architecture]] field resolution.

## The principle

A reconstructed page is a **stable shell whose every factual reference is a live binding to a canonical entity** — never a copy. A marketing page can say "our Accounting AS prepares you for…" and the program name, credits, advisor, and tuition all resolve from the one `program:accounting-as` record. **Facts live once; pages point.** Update the canonical model and every page that references it updates. This is "One Reality, Many Projections" realized at the page level, and it is non-negotiable: no fact is duplicated onto a page.

**Fidelity is a goal:** the reconstruction mirrors the source site's pages and navigation **as faithfully as possible** — it should look and navigate like the original — while every fact on it is a binding rather than a copy.

## Decision

### 1. Two interpretation modes (this is a sibling to entity extraction, not a replacement)

- **Entity extraction** (catalog, directory) — structured/repeating records → canonical entities → per-entity content blocks. *Already built (Interpreter/Archivist/Projector).* Good at catalogs; wrong tool for a marketing site.
- **Page reconstruction** (marketing site, intranet) — a page's structure, narrative, and IA → an assembled page projection with bound references. *This ADR.* Pointing the entity interpreter at `slcc.edu` produces sparse, hallucinated entities — narrative pages are not entities. They need their own path.

### 2. Page capture → a `TenantPage` shell

A scanned page is captured (not extracted-to-entities) into a **`TenantPage`** (the model + section types — hero, rich-text, entity-list, cta-banner — already exist from the page builder):
- **Structure & layout** → sections + page layout.
- **Narrative content** → rich-text / hero section content (cited to the source URL — projection content, not a canonical fact).
- **IA / navigation** → the tenant's nav structure (a site-level capture, not per-page).
- Captured narrative is a **projection** (honors "no page is canonical"); it carries a `sourceUrl` citation.

### 3. Reference resolution (the genuinely new, hard part)

During capture, every link and salient mention is resolved against the canonical model, strongest signal first:
- **URL match (deterministic, high-confidence):** a link to a page that *is* a canonical entity's `sourceUrl` (e.g. a catalog program URL) resolves directly to that entity. Most real references on a site are links — this alone covers a lot.
- **Fuzzy mention (lower-confidence, cited, reviewed):** "the Accounting program," "call the Advising Center" → NER + resolution against the canonical model, confidence-scored, **routed through the existing content-review queue** for low-confidence matches.
- **Unresolved → stays static narrative.** No hallucinated bindings — an unmatched mention is just text, cited to the source.
- **Conservative by default:** auto-bind only on **high confidence** (URL match, or a strong unambiguous mention). Anything uncertain goes to the review queue or stays static. A *wrong* binding (pointing a page at the wrong entity) is worse than an unbound mention.

### 4. Single-source binding (reuses what's already built)

Resolved references become **bound references, never copies**, using mechanisms that already exist:
- **Inline entity embeds** in rich-text — `TenantBuiltPage` already resolves `embed` segments by canonical key (commit `605d0c6`).
- **Entity-list sections** — already bind to entities.
- **`sourceType`/`sourcePath` field resolution** (ADR-012) — a bound field (a program's credit count, an office phone) resolves from the graph, not a stored copy.
- Every binding carries the entity's **citation and effective-dating** (ADR-021) for free.

### 5. Render = single source of truth

At render, `TenantBuiltPage` resolves bindings from the current canonical model. The page's narrative/layout is static (captured once); its facts are live. Re-scraping is only needed when the *page itself* changes — fact updates flow through the canonical model with zero page edits.

### 6. Audience: identical capture, audience-tagged pages

`slcc.edu` and `i.slcc.edu` are **identical scrapes** — the capture pipeline is the same. The difference is purely **audience**: public-site pages are tagged for visitor/prospective/current audiences, intranet pages for the internal/administrator audience. Captured pages carry an audience (the same `renderingContexts` + `rendering_visibility` machinery from [[ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation]] Phase 1, applied at the page level), and the audience-conditional renderer gates them. One pipeline; audience-tagged outputs. An intranet page is just a captured page bound to a higher audience — and `view-as`/person impersonation lets an operator preview it.

### 7. Page-level audit trail — including upstream reference updates

Every page carries an audit trail that records both **its own captures/edits** *and* **when a bound reference's underlying entity changed**. Because a page's rendered facts are bindings, a page can change with no page edit at all (a bound program's credits were corrected). The trail must answer "what does this page show, and why did it change, and when" — surfacing the upstream canonical event (with its citation + effective date) that altered the page. This reuses the append-only audit/event substrate; pages get a derived "as-of" view over their bindings' histories.

## Context

The SLCC tenant is **catalog-only** (`catalog.slcc.edu` → courses/programs); `slcc.edu` and `i.slcc.edu` have never been scraped. `generate_tenant` emits one content block per entity; `TenantPage`s are only ever hand-built. So a "generated tenant" today is a catalog of entity blocks + a counts home — not a reproduced institutional website, which is where the value is supposed to lie (Founder, Session 29). The Founder's framing: on a narrative site, any reference to a canonical entity must be **swapped in** as a binding so pages become static shells over single sources of truth.

## Options Considered

- **Static snapshot** (capture pages, copy facts inline) — rejected; duplicates facts, diverges on update, violates single-source-of-truth and the citation rule.
- **Pure entity extraction on the website** (status quo, point Interpreter at `slcc.edu`) — rejected; narrative pages aren't entities → sparse/hallucinated output, no pages.
- **Page reconstruction with single-source binding** (chosen) — captures the page as a projection shell, binds factual references to canonical entities, keeps unresolved narrative static and cited.
- **Resolution: URL-match only** vs **URL-match + fuzzy + review** — chosen the latter; URL-match is the deterministic backbone, fuzzy + the existing review queue extends coverage without hallucinating.

## Consequences

- A new module — **Compositor** — joins the roster (Cartographer · Interpreter · Archivist · Projector · Impressionist · **Compositor**): it captures a site's pages, resolves + binds references, and composes them into `TenantPage`s. The crawler (Cartographer) is reused for fetching/IA; Compositor consumes its output. Module identity = *Compositor*; the user-facing operation/verb is **`page.reconstruct`** ("Reconstruct"), per the naming convention (identity noun ≠ action verb).
- The `page.reconstruct` operation gains the ability to **auto-produce `TenantPage`s**, not just blocks. The manual page builder becomes the editor for Compositor-generated pages.
- Captured narrative needs a home: page-section content on the `TenantPage` (cited). An open question is whether some institutional narrative ("mission statement") should become canonical `content`/`statement` facts rather than page content.
- Entity resolution is an entity-linking problem; the content-review queue (ADR-024 work) is the human-in-the-loop for low-confidence bindings — no schema change needed to start.
- Re-scrape semantics: a page re-capture updates the shell; fact changes never require it.
- Makes the **SLCC website scrape + full rebuild the real end-to-end test** (facts → pages → site), instead of a re-run that re-confirms catalog-blocks.

## Resolved (Session 29)

- **Narrative = projection.** Captured narrative is page-section content (cited), not a canonical fact.
- **Binding is conservative** — auto-bind only on high confidence; uncertain → review or static.
- **Public vs intranet = identical capture, different audience** (§6); page reconstruction reuses ADR-022's audience machinery at the page level.
- **Page-level audit trail includes upstream reference updates** (§7).
- **Phasing:** Phase 1 = URL-match binding + capture of link-rich pages (program/department landings — high-value, deterministic). Phase 2 = fuzzy mention resolution + full narrative/marketing pages + IA.
- **IA / navigation = mirror the source.** Capture the source site's nav (menus, page hierarchy) and reproduce it as faithfully as possible, with nav links bound (resolving to pages/entities), overridable via the existing tenant nav config. The overarching directive is **maximum fidelity** — mirror existing pages and navigation as closely as absolutely possible.

## Open questions

None blocking. Implementation details — capture/snapshot format, fuzzy-resolution heuristics, nav-binding edge cases, page-level "as-of" audit view — settle during the Phase 1 build.

## Stakeholders

- Travis Hornbuckle (Founder & CEO) — direction set and open questions resolved Session 29; **approved → active**.

## Related

- [[ADR-003 — Content Block Architecture]]
- [[ADR-015 — Rendering Architecture]]
- [[ADR-016 — Topological Extraction Order and Content Quality Pipeline]]
- [[ADR-012 — Canonical Schema Architecture]]
- [[ADR-021 — Effective Dating on Entity and Relationship]]
- [[Corveaux V2 - Session 29 — Entitlement Model (ADR-022 Phase 1)]]
