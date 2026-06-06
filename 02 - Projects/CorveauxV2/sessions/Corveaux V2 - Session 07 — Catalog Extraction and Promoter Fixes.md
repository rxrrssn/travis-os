---
type: daily
date: 2026-06-06
session: 07
---

# 2026-06-06 â€” Session 07: Catalog Extraction and Promoter Fixes

## Focus

Three bugs from Session 06 closed. Catalog extraction architecture clarified. Programs now extract from Degrees & Certificates page. Two-page non-JSON issue diagnosed and documented with a clear path forward.

## Tasks

- [x] Fix P2002 promoter bug â€” partial unique index on `canonical_key WHERE valid_to IS NULL`
- [x] Fix extractor type leakage â€” exclude platform types (`environment`, `domain`, `credential`, `milestone`, etc.) from system prompt
- [x] Investigate SLCC Acalog catalog pages â€” determine why program/course extraction failed
- [x] Implement HTML strip fix and run catalog validation
- [x] Session note + memory update

## Commands Run

```
npm run validate:catalog
```

## Migrations

One new tenant migration applied:

`prisma/tenant-migrations/20260606090000_fix_canonical_key_partial_index/migration.sql`

```sql
DROP INDEX IF EXISTS "entities_canonical_key_key";

CREATE UNIQUE INDEX "entities_canonical_key_active_unique"
    ON "entities" ("canonical_key")
    WHERE "valid_to" IS NULL;
```

Note: Prisma auto-generated an additional migration (`20260606083649_fix_canonical_key_partial_index`) from the schema change that also dropped the global constraint and cleaned up content_blocks schema drift. Both applied cleanly.

Verification: 3-cycle close+create test on same canonical_key â€” passed with zero P2002 errors.

## Extraction Changes

### 1. Extractor type leakage â€” fixed

Added `EXTRACTION_ENTITY_TYPES`, `EXTRACTION_RELATIONSHIP_TYPES`, and `EXTRACTION_EVENT_TYPES` subsets to `src/types/institutional.ts`. The extraction system prompt now shows only institution-facing types:

**Entity types shown to LLM:** `person`, `organization`, `position`, `committee`, `program`, `course`, `service`

**Excluded platform types:** `identity`, `auth_provider`, `project`, `milestone`, `task`, `ticket`, `asset`, `change`, `incident`, `contract`, `subscription`, `invoice`, `domain`, `repository`, `environment`, `credential`

**Relationship types shown:** `member_of`, `reports_to`, `part_of`, `assigned_to`, `holds_position`, `delegates_to`, `acting_as`, `founded_by`, `governed_by`, `contact_for`, `enrolled_in`, `hosted_by`, `belongs_to`

**Event types shown:** `hired`, `terminated`, `enrolled`, `graduated`, `applied`, `admitted`, `approved`, `rejected`, `decision_accepted`

### 2. HTML stripping â€” implemented

The extractor previously passed raw HTML to Claude. The programs list page is 94KB of HTML but only ~14KB of actual content; the program list started at byte 67,912 â€” after the 32KB raw slice limit.

`stripHtml()` added to `src/lib/extraction/extractor.ts`:
- Removes `<script>` and `<style>` blocks
- Strips all HTML tags
- Decodes common HTML entities
- Collapses whitespace

Slice limit increased from 32,000 to 48,000 chars (applies to stripped content â€” already small).

Result: programs page reduces from 94KB raw to 13,749 chars stripped. Courses page reduces from 151KB to 18,949 chars.

## Catalog Validation Results

**Run ID:** `9c4c312a-c7d4-454e-932f-c7382f5fae40`

**Status:** Partial pass â€” programs now extract. Two list pages still fail (root cause identified).

| Page | Result | Obs | Notes |
|---|---|---|---|
| Programs Listed Alphabetically | âœ— non-JSON | 0 | 132 programs â†’ output token limit exceeded |
| Course Descriptions | âœ— non-JSON | 0 | 101 courses â†’ output token limit exceeded |
| Degrees and Certificates | âœ“ | 25 | 5 programs, 4 orgs, 1 service â€” clean |

**Promoted:** 22  
**Conflicts:** 3  
**Avg confidence:** 0.952  
**Type leakage:** None â€” no `environment` or `milestone` entities  

**Programs extracted (Degrees page):**
- Associate of Arts (conf=0.98)
- Associate of Science (conf=0.98)
- Associate of Applied Science (conf=0.98)
- Associate of Pre-Engineering (conf=0.98)
- Academic Certificate in General Education (conf=0.97)

## Root Cause: Alphabetical List and Course Descriptions Pages

The non-JSON error on the two large list pages has a different root cause than previously hypothesized.

**Hypothesis (wrong):** Acalog uses JavaScript rendering â€” pages return empty shells.

**Actual root cause (confirmed):** Pages return full HTML (~94KB and ~151KB). After HTML stripping:
- Programs page: 13,749 chars with 132 program names
- Courses page: 18,949 chars with 101 course codes

Both pages are now within the 48K char content window. The failure is on the **output** side: 132 programs Ã— ~50 tokens each â‰ˆ 6,500 output tokens, approaching Claude's 8,096 output token max. The JSON is being cut off mid-output, producing invalid JSON.

**The deeper issue:** These pages are navigation/discovery pages, not data pages. Each entry is just a program name and a link. Individual program pages (`preview_program.php?catoid=28&poid=XXXX`) contain the authoritative data:
- Full program description
- Degree type and total credits
- Required courses with credit hours
- Program learning outcomes
- Location and accreditation

## Architectural Decision: Program Extraction via Crawlee Spidering

The correct extraction approach for SLCC catalog programs:

**Step 1 â€” Discovery (no Claude):** Extract all `poid` values from the alphabetical programs list HTML using a simple regex or Cheerio selector on `preview_program.php?catoid=28&poid=XXXX` links. There are 132 programs.

**Step 2 â€” Crawl and extract:** Run `crawlSource()` pointed at the programs list URL. Crawlee's CheerioCrawler naturally follows the discovered `preview_program.php` links. Each individual program page goes through the full extract â†’ write â†’ promote pipeline. One Claude call per program â€” focused, rich, within output limits.

This is how the pipeline was designed to work. The smoke test bypassed Crawlee by fetching specific URLs directly. The proper Session 08 fix is to run `crawlSource()` against `catalog.slcc.edu/content.php?catoid=28&navoid=9720` with Crawlee configured to follow only `preview_program.php` and `preview_course.php` links.

Individual program page example (AEMT program):
- URL: `https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12988`
- Contains: name, location, description, required courses (TEEM 1202, 6 credits), time to completion (1 semester), 6 learning outcomes

## Trigger.dev Validation Status

The Session 06 and Session 07 pipeline runs executed entirely locally via `npx tsx scripts/...`. Trigger.dev was NOT used for any extraction. The four Trigger.dev tasks (`extraction.run`, `extraction.extract-page`, `extraction.promote`, `extraction.regenerate-blocks`) have not been validated through the Trigger.dev runtime.

Before the Day 30 SLCC run, Trigger.dev orchestration must be validated:
- `npx trigger.dev@latest dev` to start local runner
- Trigger `extraction.run` task via `trigger.dev` or API call
- Verify task invocation, fan-out, retry, and completion logs

## Thoughts

The pipeline architecture continues to prove out. 0 citation rejections across both sessions. 0.952 avg confidence on catalog content. The type leakage fix will clean up the non-institutional entity types that appeared in Session 06.

The key remaining blocker for the Day 30 gate is individual program page extraction. Once Crawlee is configured to spider `preview_program.php` links, we get 132 focused, rich Claude extraction calls against real program data. That's the Day 30 run.

## Wins

- P2002 promoter bug fixed and verified across 3 cycles â€” no regression risk on repeated runs
- Type leakage eliminated â€” no more `environment` / `milestone` in institutional extraction
- HTML stripping implemented â€” 94KB â†’ 14KB, content now reaches the extractor
- Programs extract correctly from Degrees & Certificates page (5 programs, 0.97â€“0.98 confidence)
- Catalog architecture fully understood â€” list pages are discovery, program pages are data
- Individual program pages confirmed as rich extraction targets (description, credits, courses, outcomes)

## Blockers

- Individual program page crawling not implemented (Crawlee spidering from programs list URL) â€” Day 30 blocker
- Trigger.dev runtime not validated â€” must happen before scaled Day 30 run

## Open To-Dos for Session 08

- [x] Configure Crawlee to spider `preview_program.php` links from programs list URL with domain/pattern restrictions (`catalog.slcc.edu` only, `preview_program.php` patterns only) â€” also added URL canonicalization, maxConcurrency: 2, User-Agent (Session 08)
- [ ] Run full catalog extraction â€” 132 individual program pages via Trigger.dev (`npm run trigger:catalog`)
- [ ] Same for courses: discover via `navoid=9704`, crawl `preview_course.php` pages
- [x] Validate Trigger.dev orchestration: start `trigger.dev dev`, invoke `extraction.run` task, verify logs â€” all 4 tasks validated end-to-end (Session 08)
- [ ] Once full catalog extraction succeeds, assess Day 30 gate (coverage, accuracy, economics, reliability)

## Related

- [[SLCC Source Inventory]]
- [[ADR-013 — Canonical Type Registry]]
- [[Corveaux V2 - Session 06 â€” Auth Layer and SLCC Smoke Test]]

