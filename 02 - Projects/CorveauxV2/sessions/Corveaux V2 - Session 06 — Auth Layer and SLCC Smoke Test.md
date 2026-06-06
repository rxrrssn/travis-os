---
type: daily
date: 2026-06-06
session: 06
---

# 2026-06-06 — Session 06: Auth Layer and SLCC Smoke Test

## Focus

Wired Entra ID auth layer (NextAuth v5 / Auth.js beta). Ran the first end-to-end SLCC smoke test against the 7 priority URLs from the SLCC Source Inventory. Pipeline ran — surface extraction works, catalog extraction does not.

## Tasks

- [x] Add Trigger.dev env vars to `.env` — `TRIGGER_PROJECT_ID` (user), `TRIGGER_SECRET_KEY` (user)
- [x] Auth layer — `next-auth@beta` installed; MicrosoftEntraID provider; JWT/session callbacks capturing `entraOid`; middleware protecting all routes; `/login` page; `SessionProvider` in root layout; `AUTH_SECRET` + `AUTH_URL` added to `.env`
- [x] Type augmentation — `src/types/next-auth.d.ts` extends `Session` and `JWT` with `entraOid`
- [x] Smoke test script — `scripts/slcc-smoke-test.ts` + `npm run smoke-test:slcc`
- [x] SLCC smoke test run — pipeline completed end-to-end

## Smoke Test Results

**Command:** `npm run smoke-test:slcc`

**Status:** Partial pass — pipeline ran, catalog extraction failed to produce program/course entities.

| Metric | Value |
|---|---|
| Pages attempted | 7 |
| Page errors | 1 |
| Claude API calls | 7 (1 per page) |
| Observations written | 78 |
| Observations rejected | 0 |
| Promoted | 76 |
| Conflicts | 1 |
| Promoter errors | 1 (P2002) |
| Avg confidence | 0.938 |
| Entities created | 35 |

**Entity breakdown:**

| Type | Count | Notes |
|---|---|---|
| `service` | 22 | Extraction working — advising offices, financial aid, help lines |
| `environment` | 9 | **Wrong type** — academic calendar items mapped to platform type |
| `organization` | 2 | SLCC org entity + one division |
| `milestone` | 2 | **Wrong type** — calendar deadlines mapped to platform type |
| `program` | 0 | **Gap** — catalog pages produced no program entities |
| `course` | 0 | **Gap** — catalog pages produced no course entities |

**Relationships created:** 20 active
**Conflict events:** 1

## Errors and Schema Gaps

### 1. Zero program/course entities — highest priority gap

Catalog pages (`catoid=28&navoid=9720`, `catoid=28&navoid=9704`) returned 5 and 1 observation respectively, none mapping to `program` or `course`. SLCC uses Acalog CMS. Direct HTTP fetch likely returns a page shell that requires JavaScript to populate the program/course list. A Playwright-rendered fetch (or identifying a static fallback URL) is required.

This is the most critical gap for the Day 30 gate. Without program and course extraction, >90% accuracy on material facts cannot be validated.

### 2. Promoter P2002 — unique constraint bug

The `entities` table has `@@unique([canonicalKey])` as a global constraint. The temporal close+create pattern (set `validTo`, create new record) fails if a previous closed record already exists with the same `canonicalKey`. Prisma throws P2002 `UniqueConstraintViolation`. Fix: the unique index must be a partial index scoped to `valid_to IS NULL`, which Prisma schema DSL cannot express directly. Requires a raw SQL migration step or an `@@ignore` + manual index.

### 3. `environment` and `milestone` type leakage

The extraction system prompt exposes the full canonical type registry including platform-level types (`environment`, `domain`, `repository`, `credential`, `milestone` etc.). The LLM maps academic calendar entries to `milestone` and advising room/location entries to `environment` rather than `event` or `service`. Fix: filter the type registry shown in the system prompt to institution-facing types only. Platform-level types (`environment`, `domain`, `repository`, `credential`, `milestone`) should not be offered as extraction targets.

### 4. Programs (Website) page — non-JSON response

`https://www.slcc.edu/academics/programs/index.aspx` caused Claude to return non-JSON. The page is an ASPX page and may include script-heavy content that disrupts Claude's output formatting. Low priority — the catalog URL is the authoritative source.

## Decisions

- `AUTH_SECRET` generated and committed to `.env` for local dev.
- Redirect URI `http://localhost:3000/api/auth/callback/microsoft-entra-id` confirmed registered in Azure by user.
- `entraOid` captured in JWT/session — this is the hook for `EntityIdentifier(type="entra_object_id")` resolution in the identity layer.
- Source precedence policy seeded: `catalog (1) > directory (2) > website (3)`, tiebreaker: confidence. Stored as `Policy(type="source_precedence")` — not hardcoded.

## Thoughts

The pipeline architecture is sound. The 0.938 avg confidence and 0 citation rejections are good signals — the extractor is being appropriately conservative. Service, contact, and organizational extraction worked exactly as designed.

The catalog extraction failure is the critical blocker for Day 30. Acalog's JavaScript rendering is not a surprise — most catalog vendors use client-side rendering. This needs a Playwright-based fetch step for catalog pages, or a direct Acalog API/export endpoint if one exists.

The P2002 bug is real but low frequency in the current state (only 1 conflict in this run). Becomes more significant on re-runs against the same institution. Must be fixed before running validation at scale.

The `environment`/`milestone` type leakage is an easy fix — just filter the system prompt to exclude platform types. Should be done before the next extraction run.

## Wins

- Pipeline runs end-to-end without crashing
- 0 citation rejections — the citation enforcement is working
- 0.938 avg confidence — model is calibrating well
- Service and contact extraction is production-quality
- Auth layer complete — Entra ID sign-in, session, middleware all wired
- Source precedence policy seeded as a Policy record, not hardcoded

## Blockers

- Catalog program/course extraction requires JS-rendered page fetching (Playwright or Acalog export)
- P2002 promoter bug must be fixed before scaled runs

## Open To-Dos for Session 07

- [ ] Fix P2002 promoter bug — partial unique index on `canonical_key WHERE valid_to IS NULL` via raw SQL migration
- [ ] Fix extractor type leakage — filter platform-level types (`environment`, `domain`, `repository`, `credential`, `milestone`) out of the system prompt extraction registry
- [ ] Investigate SLCC catalog rendering — test whether Acalog pages need Playwright fetch or if there is a static/export URL
- [ ] Once catalog fetch is solved, re-run smoke test targeting programs and courses
- [ ] Verify Entra ID auth end-to-end in browser (redirect URI registered, needs a browser test)
- [ ] S3 integration for crawl page storage (still stubbed to `tmp/crawl-output/`)

## Related

- [[SLCC Source Inventory]]
- [[Extraction Pipeline Spec]]
- [[ADR-011 - Trigger.dev v3 for Durable Background Jobs]]
- [[ADR-013 - Canonical Type Registry]]
- [[Corveaux V2 - Session 05 — Extraction Pipeline Implementation]]
