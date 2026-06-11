---
type: decision
domain: product-architecture
status: active
date: 2026-06-10
tags: [corveaux, data-debt, staleness, discovery-audit, compositor, gtm, onboarding, projections, primitives]
---

# ADR-026 — Data Debt Report and Staleness Detection

> Status: **active** (approved Session 30; rewritten same session to be primitive-aligned after the Founder applied the [[ADR-002 — Institutional Model Primitives]] test). A discovery-audit **projection** that surfaces the staleness found while scanning an institution's live surfaces as a cited, defensible Data Debt Report. Reuses existing primitives and pipeline machinery — **introduces no new canonical structure.**

## The principle

The institution's live website is a (stale) projection. The canonical model is truth. The **Data Debt Report is a projection of the *delta* between them** — "One Reality, Many Projections" turned into a diagnostic. It does not assert; it *cites*: every finding carries the source URL, a verbatim excerpt of what the institution's own surface says, and the canonical truth that contradicts it. The report is a receipt, not an opinion.

Founder framing (Session 30): document staleness as we scrape so it becomes a demo artifact — "show them their own site's data debt with receipts, then the generated tenant that fixes it."

## Primitive alignment (the load-bearing constraint)

Per [[ADR-002 — Institutional Model Primitives]] — *"no special domains"*; everything is Entities, Relationships, Events, Policies, Time, or a **projection** of them. Therefore:

- **A finding is not a new table.** A staleness finding is *an observation that a source page conflicts with canonical truth* — which the pipeline already models as an **`ExtractionObservation` with `status = conflict`** ([[ADR-016 — Topological Extraction Order and Content Quality Pipeline]] already names "dangling references" as first-class and requires the promoter to handle them). Findings reuse that substrate.
- **The truth a finding contradicts is already canonical.** A discontinued program is an **effective-dated Entity** (`effectiveTo`, [[ADR-021 — Effective Dating on Entity and Relationship]]) — not an absence. Retaining discontinued entities so this holds is [[ADR-027 — Discontinued-Entity Retention]].
- **The Data Debt Report is a projection** (like content blocks, pages, dashboards — [[ADR-003 — Content Block Architecture]]). It is computed from canonical truth + captured pages. No report, page, or block is canonical.
- **Report history is a projection artifact**, not a row-per-finding ledger — a generated document (snapshot) tied to tenant + timestamp, the same way a rendered PDF or export is a projection artifact.
- **A page capture is an Event.** `TenantPage` is a projection; "captured from `sourceUrl` at time T" is an **`InstitutionalEvent`** (or lightweight projection metadata on the disposable page record), never a new primitive.

## Decision

### 1. Findings are conflict observations, computed by the bind pass

Compositor's capture/bind pass (ADR-023) already canonicalizes links and resolves references against the canonical model. A staleness finding is the *same evaluation* read the other way:
- a reference that won't resolve to any current entity → **dangling** (the referenced entity is discontinued/absent);
- a reference that resolves but whose page-stated facts differ from the bound entity → **fact drift** (a genuine conflict observation);
- a link to the canonical source carrying a non-current edition signature → **stale-edition link**.

Where a finding needs to persist, it persists as an `ExtractionObservation(status=conflict)` carrying its `sourceUrl` + verbatim citation — not a bespoke record. The in-memory finding shape (`StalenessFinding` in `src/lib/compositor/staleness.ts`) is a **projection DTO**, not a table.

### 2. Finding taxonomy (each cited)

1. **Stale-edition link** — link to the canonical source but an older edition than current (data-derived edition signature; no special-casing). *(SLCC: `slcc.edu/academics` links 85× `catoid=17` / 3× `catoid=14` / 0× current `catoid=28`.)*
2. **Dangling / discontinued reference** — a reference to an entity whose canonical record is `effectiveTo`-set (discontinued, per ADR-027) or absent. *(SLCC promotes discontinued Accounting, Business Administration, Commercial Baking…)*
3. **Fact drift** — a page-stated fact contradicting the bound canonical value ("page says 60 credits; catalog says 63"). The highest-value finding; a conflict observation in the ADR-016 sense.
4. **Broken link / 404** — a reference that does not resolve at crawl time.
5. **Cross-page inconsistency** — the same fact stated differently across the institution's own pages.

### 3. The Data Debt Report = a projection

A per-source / per-tenant projection aggregating conflict observations + dangling references against effective-dated truth: counts by type, cited line items, a severity/volume summary. Computed on demand from canonical + captured pages; never stored as canonical.

### 4. History = report snapshots (projection artifacts)

Trend-over-time (debt declining as canonical adoption rises) comes from **snapshotting the report** at each scan — a generated document artifact (R2/object storage), tied to tenant + timestamp. This is how a PDF export is produced. Snapshots are projections, not primitives, so no axiom tension.

### 5. Lifecycle (Founder direction, S30)

- **Discovery (Stage 0):** generated by Corveaux-led scanning before the tenant exists — the proof in the first buyer conversation.
- **Onboarding:** the institution's entry point is seeing its own data debt.
- **Tenant-account-tied:** once a tenant exists, its report ties to the account and regenerates as surfaces are re-scanned (debt trend = retention/value signal).
- **Exported PDF:** the report snapshot exports to a shareable PDF disseminated inside the institution (CIO → Registrar / Web Director). Gives the [[project_gtm]] "Discovery audit: project fee" line a concrete, sellable output.

## Context

The Data Debt Report turns a technical finding (the institution's projections disagree with truth) into the discovery wedge's deliverable. It depends on the canonical model as ground truth (incl. ADR-027 effective-dated discontinuations) and on Compositor's bind pass as the detector; it ships alongside Compositor Phase 1.

## Options Considered

- **Bespoke `StalenessFinding` table** — *rejected (this rewrite)*; violates ADR-002 ("no special domains"). A finding is a conflict observation; the report is a projection.
- **Separate staleness-analysis pipeline** — rejected; the bind pass already performs the comparison.
- **Uncited "staleness score"** — rejected; violates Rule 1 and is unsellable. Every finding carries a verbatim receipt + the canonical truth.
- **Conflict-observation findings + projection report + snapshot artifacts** (chosen) — primitive-aligned, cheap (byproduct), defensible (cited), monetizable.

## Consequences

- Reuses `ExtractionObservation(status=conflict)`, `InstitutionalEvent`, effective-dating, and the projection layer — **no new canonical primitive or table**.
- Depends on [[ADR-027 — Discontinued-Entity Retention]] so dangling references rest on effective-dated truth rather than absence.
- Fact-drift detection compares page-stated attributes to bound-entity attributes — richest finding, lands after the dangling/stale-edition byproducts (which are pure capture/bind outputs).
- The bind review queue for uncertain matches reuses the planned content-review queue (ADR-024 work), not a new structure.
- PDF/snapshot export is a later lifecycle step; the projection + admin view come first.
- Naming: **"Data Debt Report"** stays descriptive (not a codename); Compositor is the module that produces it.

## Open questions

- Severity weighting for the report summary (a discontinued-program promotion outranks one broken link).
- Whether fact-drift runs only on auto-bound (high-confidence) references or also flags drift on review candidates.
- Snapshot cadence + dedup across re-scans (tie to the source's run id).

## Stakeholders

- Travis Hornbuckle (Founder & CEO) — idea, lifecycle direction, and the primitive-alignment correction, Session 30; **approved → active**.

## Related

- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-003 — Content Block Architecture]]
- [[ADR-016 — Topological Extraction Order and Content Quality Pipeline]]
- [[ADR-021 — Effective Dating on Entity and Relationship]]
- [[ADR-023 — Page Reconstruction and Single-Source Page Binding]]
- [[ADR-027 — Discontinued-Entity Retention]]
- [[project_gtm]]
- [[project_slcc_rebuild]]
