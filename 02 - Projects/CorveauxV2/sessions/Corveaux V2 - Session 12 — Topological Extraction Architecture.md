---
type: daily
date: 2026-06-06
---

# 2026-06-06 — Session 12

## Focus

Built the full topological extraction architecture for the Day 30 gate. This session was entirely implementation — no design or spec work.

## Tasks

- [x] Add `DocumentExtractionOptions` + `extractDocument()` to `AIProvider` interface
- [x] Implement `extractDocument()` in `AnthropicProvider` using native Anthropic PDF document blocks
- [x] Create `document-discovery.ts` — HTML parser to find linked PDFs/Word docs
- [x] Add document link collection to `CrawlResult` (crawler now returns `documentLinks[]`)
- [x] Refactor `extractor.ts` — content quality gate, JSON-LD harvesting, scope hints, shared filter logic
- [x] Add `extractDocument()` function to extractor.ts for document-level extraction
- [x] Export `EXTRACTION_SYSTEM_PROMPT` from extractor.ts (shared across page + document extraction)
- [x] Add `scopeHint?: string` to `extractionRun` payload and `extractPage_task` payload
- [x] Add `documentRun` orchestrator task to `extraction.ts`
- [x] Add `extractDocument_task` child task to `extraction.ts`
- [x] Create `scripts/catalog-courses.ts` — Phase 1 course extraction (no scope hint)
- [x] Update `scripts/catalog-programs.ts` — Phase 2 with scope hint (courses pre-extracted)
- [x] Create `scripts/catalog-documents.ts` — Phase 3 document extraction
- [x] Add new npm scripts: `trigger:catalog:courses`, `trigger:catalog:programs`, `trigger:catalog:documents`
- [x] Write ADR-016 — Topological Extraction Order and Content Quality Pipeline
- [x] Add `fullCatalogRun` Trigger.dev task — single-task orchestrator that sequences all three phases via `triggerAndWait`
- [x] Create `scripts/catalog-full.ts` — local crawl of courses + programs + documents, then single `fullCatalogRun.trigger()` call
- [x] Add `trigger:catalog:full` npm script

## Decisions

- Topological extraction order is the canonical gate run sequence: courses first, then programs, then optional documents
- Single-command gate run: `npm run trigger:catalog:full` — all URL discovery local, then one `fullCatalogRun.trigger()` call
- `fullCatalogRun` sequences phases via sequential `triggerAndWait` calls — program phase cannot start until course phase returns `result.ok`
- Document phase failure is non-fatal — logged as warning, orchestrator continues and returns
- `maxDuration: 86400` on `fullCatalogRun` — orchestrator compute is negligible since `triggerAndWait` suspends the task at each wait; ceiling is safety-only
- Scope hint format: plain English instruction appended to user message, not a separate system field
- Content quality gate threshold: 500 chars after HTML stripping (~100 words)
- JSON-LD extracted before `stripHtml()` call — script tags are removed by that function
- Document extraction: Anthropic native PDF document blocks (no OCR, no text preprocessing)
- Non-PDF documents (docx, xlsx, pptx) skipped by `extractDocument_task` — Claude PDF API only accepts PDF
- Document size limit: 10 MB — returns `skipped: "too_large"` without fetching if Content-Length exceeds threshold
- Each extraction phase (courses, programs, documents) creates its own `ExtractionRun` record

## Wins

- TypeScript compiles clean with zero errors after all changes (`tsc --noEmit` verified twice)
- `fullCatalogRun` reuses existing `extractionRun` and `documentRun` tasks — no logic duplication
- Scope hint expected to reduce program page output from ~15,000 tokens to ~2,000–3,000 tokens per page — 5–7× cost reduction for program phase
- Content quality gate eliminates LLM calls on index/navigation pages — pure savings
- JSON-LD will produce cleaner structured data for Acalog pages that include Course schema
- Document pipeline is a first-class phase — policy and governance extraction now possible

## Blockers

None. Ready to run.

## Gate Run Sequence

```
# Single command — all phases run automatically in the correct order
npm run trigger:catalog:full

# After the orchestrator completes:
npm run metrics
```

Individual phase scripts remain available if a single phase needs to be re-run:

```
npm run trigger:catalog:courses     # courses only
npm run trigger:catalog:programs    # programs only (with scope hint)
npm run trigger:catalog:documents   # documents only
```

## Related

- [[ADR-016 — Topological Extraction Order and Content Quality Pipeline]] — ADR written this session
- [[ADR-014 — Fan-out Scalability and batchTriggerAndWait]] — batchTriggerAndWait used for parallel extraction within each phase
- [[Corveaux V2 - Session 11 — Tenant Zero Auth Validation]] — Prior session; diagnosed full-run failures that drove this redesign
- [[extraction-pipeline-spec]] — Formal extraction pipeline specification
- [[SLCC Validation Run]] — Gate run validation document
- [[SLCC Material Facts Checklist]] — Accuracy ground truth for Day 30 gate
- [[catalog-review]] — Pilot run review (30-program run) that informed the redesign
- `project_stage` (memory) — Day 30 gate
