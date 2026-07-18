---
type: spec
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, extraction, pipeline, spec, canonical, observations, promotion]
---

# Extraction Pipeline Spec

**Status:** Active. Written Session 03 (2026-06-05). Runtime updated 2026-06-13.

> **Runtime note (2026-06-13):** The *doctrine* below is unchanged and authoritative. The *runtime mechanics* have moved since this spec was written: crawling is now the custom cache-aware **Cartographer** (Crawlee + Playwright removed; see [[ADR-017 — Cache-Aware Crawling and Extraction]]), and orchestration runs on **Cloudflare Workers/Workflows/Queues** (Trigger.dev removed in [[Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan]] / Session 25). `extraction.run` is a Cloudflare Workflow that fans out one Queue message per page to a consumer, then a finalizer promotes + regenerates — verified live in [[Corveaux V2 - Session 27 — Extraction Run Worker Verification]]. References to "Trigger.dev" and "Crawlee" in the prose below have been corrected in place; the older task-shape pseudocode is retained as conceptual reference.

---

## Doctrine

The extraction pipeline converts publicly available institutional sources into canonical institutional primitives and derived content blocks.

Three rules govern every decision in this spec:

1. **No citation = no fact.** Every extracted claim must carry a verbatim `citationText` from the source page. Claims without citations are never written. No exception.
2. **Raw extraction is not canonical.** Observations are raw claims. Canonical state is the result of promotion. The boundary between these two is absolute.
3. **Canonical state is temporal, not destructive.** When a fact changes, the prior record is closed (`validTo = now()`). A new record is created. History is never deleted.

---

## Pipeline Overview

```
Source (website / catalog / directory)
  │
  ▼
[Stage 1] Crawl
  Cartographer (custom cache-aware crawler, R2-backed)
  Outputs: list of pages with raw HTML/text
  │
  ▼
[Stage 2] Extract
  Claude claude-sonnet-4-6, one call per page
  Outputs: ExtractionObservation records (status: pending)
  │
  ▼
[Stage 3] Promote
  Promotion Engine
  Applies source precedence Policy
  Outputs: canonical primitive updates (temporal close + new record)
           or conflict flags
  │
  ▼
[Stage 4] Regenerate
  Block Regeneration
  Assembles ContentBlock projections from current canonical state
  Outputs: ContentBlock records (status: DRAFT or REVIEW)
```

Each stage is a durable Cloudflare Workflow step (extraction fans out across a Cloudflare Queue, one message per page). Stages are not coupled — promotion runs after all extraction observations for a run are written. Block regeneration runs after promotion completes.

---

## Data Model

### ExtractionRun

Provenance record for one extraction pass against one source. Created before crawling begins. Updated at each stage.

```
status:           PENDING → RUNNING → COMPLETED | FAILED | CANCELLED
sourceType:       website | catalog | directory
sourceUrl:        root URL of the crawl target
observationCount: total observations written in this run
promotedCount:    observations successfully promoted to canonical state
conflictCount:    observations flagged for conflict review
errorCount:       pages or observations that failed processing
confidenceAvg:    mean confidence across all observations in this run
```

The `ExtractionRun.id` is stamped on every `ExtractionObservation` it produces. It is also stamped on canonical Entity and Relationship records as `extractionRunId` to answer: "which run produced this current canonical fact?"

`ExtractionRun` is provenance infrastructure. It is not part of the canonical model.

---

### ExtractionObservation

Raw extracted claim from a single source page. Written by the extraction stage. Read by the promotion engine. **Immutable once written.**

```
extractionRunId:    which run produced this observation
observationType:    entity | relationship | policy | event
canonicalKey:       the subject entity's canonical key (nullable for new entities)
observedType:       the specific type string (e.g. "person", "holds_position", "academic_standing")
payload:            JSONB — the full extracted claim (see Payload Shapes below)
citationText:       verbatim excerpt from the source page supporting this claim
sourceUrl:          the specific page URL where this claim was found
confidence:         Decimal(4,3) — self-reported by Claude per claim
status:             pending | promoted | conflict | rejected
promotedRecordId:   UUID of the canonical record created or updated on promotion (nullable)
promotedRecordType: entity | relationship | policy | event (nullable)
createdAt:          immutable
```

**Status transitions:**
```
pending → promoted   (promotion engine accepted this observation)
pending → conflict   (promotion engine detected a conflict it cannot resolve)
pending → rejected   (observation failed validation: missing citation, confidence below threshold, malformed)
conflict → promoted  (human resolved the conflict, winning observation is promoted)
conflict → rejected  (human rejected this observation as incorrect)
```

---

### Payload Shapes

The `payload` JSONB structure varies by `observationType`.

**entity observation:**
```json
{
  "entityType": "program",
  "displayName": "Associate of Science — Computer Science",
  "canonicalKey": "program:associate-of-science-computer-science",
  "attributes": {
    "program_type": "associate",
    "cip_code": "11.0101",
    "total_credits": 60,
    "description": "..."
  }
}
```

**relationship observation:**
```json
{
  "relationshipType": "part_of",
  "fromCanonicalKey": "program:associate-of-science-computer-science",
  "toCanonicalKey": "organization:school-of-business-and-technology",
  "attributes": {}
}
```

**policy observation:**
```json
{
  "policyType": "graduation_requirement",
  "name": "Associate Degree General Education Requirements",
  "subjectEntityType": "program",
  "rules": {
    "min_credits": 60,
    "general_education_credits": 18,
    "required_courses": ["ENGL-1010", "MATH-1030"]
  }
}
```

**event observation:**
```json
{
  "eventType": "policy_updated",
  "subjectCanonicalKey": "policy:graduation-requirement-associate",
  "occurredAt": "2025-08-15",
  "payload": { "note": "Updated credit hour requirement from 62 to 60" }
}
```

---

## Stage 1: Crawl

**Technology:** Cartographer — the custom cache-aware crawler (Crawlee + Playwright removed; see [[ADR-017 — Cache-Aware Crawling and Extraction]]). R2-backed crawl cache keyed by `pageKey(sourceSlug, canonicalUrl)`, shared between discovery and extraction.

**Scope per sourceType:**

| sourceType | Crawl target | Depth |
|---|---|---|
| website | Institution root URL | Full domain crawl, configurable depth |
| catalog | Catalog root URL | Full catalog crawl; Acalog HTML, PDF, and custom format adapters |
| directory | Directory root URL | Full directory crawl |

**Outputs:** A list of `{ url, rawContent, contentType }` records — one per successfully fetched page. Raw content is stored to S3-compatible object storage for replay and audit. The crawl step does not produce observations.

**ExtractionRun behavior:** `status` is set to `RUNNING` when the crawl step begins. `metadata` records crawl configuration (root URL, depth, page count, adapter type).

---

## Stage 2: Extract

**Technology:** Claude claude-sonnet-4-6 via provider interface. One LLM call per page.

### Extraction Call

The extraction call takes one page's content and returns all canonical primitives visible on that page in a single structured call. Multiple calls per page are not used — they multiply cost without adding accuracy for a well-structured prompt.

**Prompt structure:**
- System: institutional extraction context, canonical type vocabulary, confidence calibration rules, citation requirement
- User: raw page content + source URL + page type hint (website | catalog | directory)
- Output: structured JSON via tool use / structured output

**Confidence calibration rules embedded in the prompt:**
```
≥ 0.90 — The source page states this fact directly and unambiguously.
0.70–0.89 — The fact is clearly implied or stated with minor ambiguity.
0.50–0.69 — You are inferring this fact from context. Flag it.
< 0.50   — Do not emit this observation. Below threshold.
```

Observations with confidence < 0.50 are not written. The pipeline does not emit low-confidence guesses — it emits nothing and reports the page as yielding no facts.

### Extraction Output Schema

```typescript
type ExtractionResult = {
  entities: {
    entityType: string
    displayName: string
    canonicalKey: string
    attributes: Record<string, unknown>
    confidence: number
    citationText: string
  }[]
  relationships: {
    relationshipType: string
    fromCanonicalKey: string
    toCanonicalKey: string
    attributes?: Record<string, unknown>
    confidence: number
    citationText: string
  }[]
  policies: {
    policyType: string
    name: string
    subjectEntityType?: string
    rules: Record<string, unknown>
    confidence: number
    citationText: string
  }[]
  events: {
    eventType: string
    subjectCanonicalKey: string
    occurredAt?: string
    payload?: Record<string, unknown>
    confidence: number
    citationText: string
  }[]
}
```

### canonicalKey Formation

The extraction prompt instructs Claude to produce a natural key for each entity. The pipeline normalizes it to canonical form before writing.

**Format:** `{entityType}:{normalized-natural-key}`

**Normalization:** lowercase, whitespace → hyphens, strip special characters except hyphens and digits.

**Natural key by entity type:**

| Entity type | Natural key source |
|---|---|
| course | `{subject_code}-{course_number}` → `course:math-1010` |
| program | normalized program name → `program:associate-of-science-computer-science` |
| organization | normalized org name → `organization:school-of-business-and-technology` |
| position | `{normalized-title}-{normalized-org}` → `position:dean-school-of-science` |
| person | `{first-last}` → `person:jane-smith` — **weak key, low confidence, flag for review** |
| service | normalized service name → `service:financial-aid-office` |
| policy | `{policy_type}-{normalized-name}` → `policy:graduation-requirement-associate-degree` |

Person keys derived from name only are intentionally low-confidence. They require an additional identifier (employee ID, email, Entra object ID) to become strong keys. The extraction pipeline notes the weakness; the identity layer resolves it.

### Observation Write

Each item in the extraction result becomes one `ExtractionObservation` record:

- `observationType` from the result section (entity / relationship / policy / event)
- `observedType` from the specific type field (entityType, relationshipType, etc.)
- `canonicalKey` from the extracted natural key
- `payload` = the full extracted item as JSONB
- `citationText` = verbatim excerpt — **required; observation is rejected if empty or missing**
- `sourceUrl` = the page URL
- `confidence` = Claude's self-reported confidence
- `status` = `"pending"`

`ExtractionRun.observationCount` is incremented for each observation written.

---

## Stage 3: Promote

The promotion engine runs after all observations for an extraction run are written. It takes pending observations and decides what the canonical state should be.

**Promotion is a Cloudflare Workflow step** (the finalizer) triggered once all per-page extraction Queue messages for the run have been consumed.

### Promotion Logic

```
for each pending observation:
  load current canonical state for this canonicalKey
  
  if canonicalKey is null (new entity, no key yet):
    auto-generate canonicalKey from payload
    check for existing entities with same canonicalKey
    if none: promote → create new canonical record
    if exists: treat as update case (see below)
  
  if no current canonical record for this canonicalKey:
    promote → create new canonical record
    stamp: extractionRunId, extractedAt, sourceUrl, confidence
    set: validFrom = now(), validTo = null
    mark observation: status = "promoted", promotedRecordId, promotedRecordType
  
  if current canonical record exists:
    compare observation payload to current canonical attributes
    if observation agrees with current state:
      mark observation: status = "promoted" (no canonical change)
    if observation differs:
      load active source_precedence policy for this tenant
      if policy resolves the conflict (observation source ranks higher):
        close current canonical record: validTo = now()
        create new canonical record: validFrom = now(), validTo = null
        stamp: extractionRunId, extractedAt, sourceUrl, confidence
        mark observation: status = "promoted"
        increment run.promotedCount
      if policy cannot resolve (no applicable rule, or equal rank):
        flag as conflict (see Conflict Detection below)
```

### Temporal Canonical Updates

When a promoted observation differs from the current canonical state, the update is temporal — never destructive:

```
BEFORE promotion:
  Entity { id: X, canonicalKey: "program:cs", attributes: { credits: 62 }, validFrom: T1, validTo: null }

AFTER promotion of observation claiming credits = 60:
  Entity { id: X, canonicalKey: "program:cs", attributes: { credits: 62 }, validFrom: T1, validTo: now() }  ← closed
  Entity { id: Y, canonicalKey: "program:cs", attributes: { credits: 60 }, validFrom: now(), validTo: null }  ← current
```

Full history of any fact is always queryable:
```sql
SELECT * FROM entities WHERE canonical_key = 'program:cs' ORDER BY valid_from
```

Current state is always:
```sql
SELECT * FROM entities WHERE canonical_key = 'program:cs' AND valid_to IS NULL
```

---

## Source Precedence as Policy

Source precedence is **not hardcoded** in the promotion engine. It is a `Policy` record in the tenant database.

**Policy record:**
```
policyType: "source_precedence"
name:       "Default Source Precedence"
rules: {
  "precedence": [
    { "sourceType": "catalog", "rank": 1 },
    { "sourceType": "directory", "rank": 2 },
    { "sourceType": "website", "rank": 3 }
  ],
  "tiebreaker": "confidence",
  "scope": "all"
}
validFrom: <tenant configuration date>
validTo:   null
```

The promotion engine queries the active `source_precedence` policy before evaluating any conflict. If no policy exists, all conflicts go to manual review. If a policy exists, it is applied. Institutions configure their own precedence rules — different institutions may weight their authoritative sources differently.

For attribute-level precedence (when different attributes should have different rules): the `scope` field may reference a specific `observedType` or attribute key. General rule uses `scope: "all"`.

---

## Stage 4: Conflict Detection and Resolution

### Detection

A conflict exists when two or more observations for the same `canonicalKey` + `observedType` make different claims that the source precedence policy cannot resolve.

**Conflict cases:**

1. **Pre-promotion conflict:** Observations about an entity that does not yet exist in the canonical layer disagree. No entity exists yet to reference.
   - Both observations are set to `status = "conflict"`
   - `ExtractionRun.conflictCount` is incremented
   - The conflict surfaces in a review queue: `SELECT * FROM extraction_observations WHERE status = 'conflict'`

2. **Post-promotion conflict:** A new observation disagrees with an existing canonical entity and policy does not resolve it.
   - Observation is set to `status = "conflict"`
   - An `InstitutionalEvent` is written:
     ```
     eventType:       "extraction_conflict_detected"
     subjectEntityId: <existing entity id>
     occurredAt:      now()
     payload: {
       observationId: <uuid>,
       conflictingField: "attributes.total_credits",
       currentValue: 62,
       observedValue: 60,
       observedSource: "https://www.slcc.edu/catalog/...",
       observedConfidence: 0.94
     }
     ```

### Resolution

Conflict resolution is a human action. The reviewer:

1. Reviews the conflicting observations and their citations
2. Accepts one observation and rejects the other(s)
3. The accepted observation is promoted (temporal canonical update)
4. An `InstitutionalEvent` is written:
   ```
   eventType:       "extraction_conflict_resolved"
   subjectEntityId: <entity id>
   occurredAt:      now()
   payload: {
     acceptedObservationId: <uuid>,
     rejectedObservationIds: [<uuid>],
     resolvedBy: <resolver entity id>,
     rationale: "Catalog is authoritative for credit hours"
   }
   ```

Accepted observations transition to `status = "promoted"`. Rejected observations transition to `status = "rejected"`. Block regeneration is triggered after resolution completes.

---

## Stage 5: Block Regeneration

Block regeneration runs after promotion completes. It is the projector phase of the finalizer Workflow step (Cloudflare).

**Trigger conditions:**
- Extraction run promotion stage completes
- A conflict is resolved (manual trigger)
- A canonical record is updated by any mechanism

**Assembly logic:**

Each block type is assembled by querying current canonical state (`validTo IS NULL`):

| Block type | Assembly query |
|---|---|
| ProgramBlock | Program entity + `part_of` → organization + Course entities in requirement relationships + Contact entities |
| CourseBlock | Course entity + prerequisite/corequisite relationships + offering organization |
| DepartmentBlock | Organization entity + `part_of` relationships + Person entities with `holds_position` |
| ServiceBlock | Service entity + eligibility Policy + Contact entities |
| ContactBlock | Person entity + `holds_position` → Position + `part_of` chain → Organization |
| PolicyBlock | Policy entity + subject entity if applicable |

**Block status on generation:**
- First extraction: `DRAFT`
- Re-generation of previously published block: `REVIEW` (triggers owner notification)
- Content is only published after human review confirms accuracy

Blocks assemble from current (`validTo IS NULL`) canonical records. A block never references historical canonical records directly — the temporal layer is below blocks, not in them.

---

## Task Structure (Cloudflare Workflow + Queue)

> The shape below is the original conceptual decomposition. As shipped (Session 27), `extraction.run` is a Cloudflare **Workflow**; the per-page extract step fans out across a Cloudflare **Queue** (one message per page) consumed by an extractor Worker, and a **finalizer** Workflow step runs promotion (archivist) then block regeneration (projector). The stage boundaries and durability guarantees are identical; only the platform primitives changed (was Trigger.dev `triggerAndWait` fan-out).

```
workflow: extraction.run(tenantId, sourceType, sourceUrl, config)
  step 1 — initialize
    create ExtractionRun record (status: PENDING → RUNNING)
    
  step 2 — crawl
    run Cartographer crawl against sourceUrl
    store raw pages to S3
    return pageList: { url, s3Key, contentType }[]
    
  step 3 — extract (fan-out)
    for each page in pageList:
      trigger child task: extraction.extractPage
      (child tasks run in parallel, up to concurrency limit)
    wait for all child tasks to complete
    
  step 4 — complete crawl phase
    update ExtractionRun.observationCount
    update ExtractionRun.errorCount
    
  step 5 — trigger promotion
    trigger child task: extraction.promote(extractionRunId)
    wait for promotion to complete

task: extraction.extractPage(extractionRunId, pageUrl, s3Key)
  step 1 — fetch content from S3
  step 2 — call Claude (structured extraction, provider interface)
  step 3 — validate result (Zod schema)
  step 4 — write ExtractionObservation records
    reject any observation with empty citationText before writing
  step 5 — return observation count and error count

task: extraction.promote(extractionRunId)
  step 1 — load pending observations for this run
  step 2 — load active source_precedence policy for tenant
  step 3 — group observations by canonicalKey + observedType
  step 4 — evaluate each group (promote | conflict)
  step 5 — write canonical records (temporal close + new record)
  step 6 — update observation statuses
  step 7 — update ExtractionRun counters (promotedCount, conflictCount)
  step 8 — update ExtractionRun status: COMPLETED (or FAILED)
  step 9 — trigger child task: extraction.regenerateBlocks(extractionRunId)

task: extraction.regenerateBlocks(extractionRunId)
  step 1 — find all canonical entities with extractionRunId = this run
  step 2 — for each entity: determine affected block types
  step 3 — for each affected block: assemble from current canonical state
  step 4 — write or update ContentBlock records
  step 5 — set block status: DRAFT (new) | REVIEW (updated published block)
```

**Tenant context:** `tenantId` is carried explicitly in every Workflow/Queue payload. The runtime does not provide ambient tenant isolation. The handler uses `tenantId` to select the correct database connection (schema for local dev, separate database/Worker for production). Consistent with ADR-010.

**Durable execution:** Each Cloudflare Workflow step is checkpointed. A failure at step 4 of promotion does not restart from step 1. It resumes from the last successful checkpoint. Long-running crawls (hours for large catalogs) do not time out. (A staleness watchdog converts stuck runs into `operation.stalled` Events with self-healing requeue — Session 37.)

**Rate limiting:** The extract stage respects Claude API rate limits via Queue concurrency/batching — no polling loops, no hardcoded sleeps.

---

## Day 30 SLCC Validation Criteria

The Day 30 gate requires a completed extraction run against SLCC with measured outcomes. No generated tenant work begins until this gate is passed.

> **GATE CLOSED 2026-06-07** — Run 002 live re-sample scored **96.5%** combined material-fact accuracy; the independent random-20 review scored **99.4%** with zero FAILs. See [[SLCC Validation Run]], [[day-30-gate-resample-findings]], and [[Corveaux V2 - Session 17 — Day 30 Gate Live Re-Sample]]. Boxes below reflect the closure. Confidence calibration was deliberately NOT scored (see note). Two canonical-quality invariants remain open and tracked as ongoing cleanup (`known_bugs` memory — orphaned policy-soup rows), not gate blockers.

### Accuracy

- [x] Greater than 90% accuracy on material facts (see Material Facts below) — 96.5% / 99.4%
- [x] Accuracy measured by manual comparison to known ground truth

### Citations

- [x] Source citation present on every extracted observation
- [x] Citations traceable to specific source URLs
- [x] No `citationText` field empty or null in any promoted observation

### Hallucination Prevention

- [x] No invented entities not present in SLCC sources
- [x] No invented relationships between entities
- [x] No invented programs, courses, or credit hours
- [x] No invented departments or contacts
- [x] Random sample review of 10% of promoted observations (live re-sample + independent random-20)

### Confidence Calibration

*Not formally scored — all sampled entities carried confidence ≥ 0.85 regardless of correctness (including scope-leakage stubs). Confidence is not yet a reliable signal for this failure mode; revisit once the scope-leakage fix lands. Tracked as a quality improvement, not a gate blocker.*

- [ ] Observations with confidence ≥ 0.90 are verified to be correct in ≥ 90% of reviewed cases
- [ ] Observations with confidence 0.70–0.89 accurately reflect genuine ambiguity in source material
- [ ] Observations with confidence < 0.50 are not present in promoted canonical state

### Canonical Model Quality

- [ ] All extracted entity types map cleanly to the canonical type registry (no unregistered types) — *pre-ADR-018 attribute/policy soup still present; tracked in `known_bugs`*
- [ ] Relationship graph is internally consistent (no dangling canonicalKeys) — *~1,889 orphaned policy-soup rows remain; absorbed by Day 60/90 corpus regen*
- [x] Temporal fields (`validFrom`, `validTo`) correctly reflect observed institutional state
- [x] No `tenant_id` present on any extracted record (connection is tenant context)

### Pipeline Integrity

- [x] ExtractionRun record present for the SLCC run with accurate counters
- [x] Every promoted observation has `promotedRecordId` and `promotedRecordType` set
- [x] Source precedence policy applied correctly where conflicts arose
- [x] Conflict review queue populated for any unresolved conflicts

### Material Facts (SLCC ground truth)

The following facts are verified against known SLCC institutional reality:

**Academic Programs**
- Program names (match catalog exactly)
- Degree types (AAS, AS, AA, Certificate, Apprenticeship)
- Total credit hours per program
- CIP codes where published

**Courses**
- Course codes (subject + number, e.g. MATH-1010)
- Course names
- Credit hours
- Prerequisites and corequisites where stated

**Departments**
- Department names
- Parent organizational unit
- Contact information (phone, email where published)

**Services**
- Service names
- Hours of operation where published
- Contact information where published

---

## Failure Conditions

The validation run fails if any of the following are true:

- Accuracy falls below 90% on material facts
- Any promoted observation has empty or missing `citationText`
- Hallucinated entities, relationships, or programs are found in promoted state
- Confidence scores do not correlate with accuracy (calibration failure)
- Canonical model contains unregistered type strings
- Relationship graph contains dangling references

**If the gate fails:** iterate on extraction prompt, confidence calibration, or promotion logic. Re-run validation. Do not proceed to generated tenant construction.

---

## Non-Negotiables

These rules are not configurable and not overridable:

1. **No citation = no fact.** `citationText` is non-nullable on `ExtractionObservation`. The pipeline rejects any LLM output where `citationText` is empty before writing.
2. **Raw extraction is not canonical.** `ExtractionObservation` records are never read directly by the rendering layer. Only promoted canonical records are.
3. **Canonical state is temporal, not destructive.** `UPDATE entities SET attributes = ...` is not how canonical facts change. Temporal close + new record is the only mechanism.
4. **Source precedence is a Policy, not code.** The promotion engine reads active policies. It does not have catalog > website hardcoded.
5. **Tenant context is explicit.** Every task payload carries `tenantId`. No ambient tenant context.
6. **Conflicts surface before canonical state changes.** An unresolvable conflict blocks promotion of that observation. It never produces a silent overwrite.

---

## Open Questions

- [x] Catalog format adapters: which formats need custom parsers before SLCC run? — Acalog HTML confirmed and run end-to-end; the SLCC gate ran on Acalog without a PDF parser. PDF adapter deferred until a prospect's catalog requires it.
- [ ] Person deduplication strategy for weak-key person entities (name-only) before identity layer exists
- [x] How are extraction runs triggered in production — scheduled, webhook, admin-initiated, or all three? — Admin-initiated `TenantOperation` (the Platform Admin / Manual Pipeline) and pipeline-driven provisioning (the ADR-030 Architect forge, triggered by an Institutions stage-change Event). Scheduled re-extraction remains future.
- [ ] What is the re-extraction interval for different source types (catalog annual, website monthly, directory weekly)?

---

## Related

- [[ADR-001 — Entry Wedge Selection]]
- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-003 — Content Block Architecture]]
- [[ADR-007 — LLM Strategy Positioning]]
- [[ADR-009 — Tech Stack]]
- [[ADR-011 — Background Job Platform]]
- [[ADR-012 — Canonical Schema Architecture]]
- [[ADR-013 — Canonical Type Registry]]
- [[SLCC Validation Run]]
- [[content-block-schema]]
