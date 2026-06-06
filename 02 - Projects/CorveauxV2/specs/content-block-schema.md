---
type: spec
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, content-blocks, schema, spec, projection, governance, rendering]
---

# Content Block Schema

**Status:** Active. Written Session 03 (2026-06-05).

---

## Doctrine

A Content Block is a renderable projection assembled from current canonical institutional state.

It is not canonical. It creates no truth. It owns no facts.

The canonical layer is:
- Entity
- Relationship
- Event
- Policy
- Time
- EntityIdentifier

Content Blocks exist downstream of that layer. They are the product of assembling canonical reality into a shape suitable for rendering. When canonical reality changes, the block is regenerated. The block does not tell the canonical layer what is true. The canonical layer tells the block what to render.

**The guiding test for any design decision:**
> Does this put authoritative facts in the block, or does it keep the block as a faithful projection of the canonical layer?

If a fact lives in a block and not in the canonical layer, it is projection drift. Projection drift is architectural decay.

---

## Architectural Role

```
Canonical Layer                     Projection Layer
─────────────────────               ──────────────────────────────────────
Entity                              ContentBlock
  attributes (intrinsic)    →         title, content (rendered)
  validFrom / validTo       →         validFrom / validTo
  extractionRunId           →         lastExtractionRunId
  confidence                →         confidenceScore (min across all deps)
  sourceUrl                 →         sourceUrls (union from all deps)

Relationship                →         dependencies.relationships[]
Policy                      →         dependencies.policies[]
EntityIdentifier            →         (resolved via Entity, not stored on block)

ExtractionObservation       →         (provenance trace, not on block)
ExtractionRun               →         lastExtractionRunId (cached reference)
```

The block caches derived and aggregated metadata for rendering performance. It does not author those values — it derives them from the canonical layer at generation time.

---

## Block Identity

Every block has three identifiers, following the same pattern as canonical Entity:

| Field | Purpose | Changes? |
|---|---|---|
| `id` | Internal UUID, database PK | Never |
| `platformId` | Stable Corveaux public identifier | Never |
| `canonicalKey` | Human-stable routing key | Never after creation |

**canonicalKey format:** `{blockType}:{source-entity-canonical-key}`

Examples:
```
program_block:associate-of-science-computer-science
course_block:math-1010
department_block:school-of-business-and-technology
service_block:financial-aid-office
contact_block:jane-smith
```

**URL routing:** The canonical key is the routing substrate.

```
program_block:associate-of-science-computer-science  →  /programs/associate-of-science-computer-science
course_block:math-1010                                →  /courses/math-1010
department_block:school-of-science                    →  /departments/school-of-science
```

**Regeneration preserves identity:** When a block is regenerated, it upserts by `canonicalKey`. The `platformId` is unchanged. The `id` is unchanged. URLs never break due to regeneration.

---

## BaseContentBlock Schema

Every block type inherits these fields. No block omits any of them.

```typescript
type BaseContentBlock = {
  // Identity
  id:           string       // internal UUID, DB PK
  platformId:   string       // stable Corveaux public ID — never changes
  canonicalKey: string       // "{blockType}:{source-canonical-key}" — routing substrate

  // Classification
  blockType: string          // see BlockTypes registry
  title:     string          // rendered display title

  // Content
  content:       Record<string, unknown>  // block-type specific (see content shapes below)
  searchContent: string | null            // plain-text aggregate for FTS — populated at generation

  // Dependency graph
  dependencies: {
    entities:      string[]  // entity.id UUIDs this block was assembled from
    relationships: string[]  // relationship.id UUIDs
    policies:      string[]  // policy.id UUIDs
    events?:       string[]  // institutional_event.id UUIDs (optional)
  }

  // Nested block references (by platformId, NOT materialized)
  childBlockIds: string[]

  // Provenance (derived from canonical layer at generation time — cached, not authoritative)
  sourceUrls:          string[]     // union of sourceUrl from all dependency records
  confidenceScore:     number | null  // minimum confidence across all dependency records
  lastExtractionRunId: string | null  // which extraction run last triggered regeneration
  generatedAt:         Date | null    // when this block was last assembled

  // Governance
  ownerEntityId:       string | null  // person or org entity responsible for accuracy
  reviewedAt:          Date | null    // when owner last reviewed this block
  reviewedByEntityId:  string | null  // entity ID of the last reviewer

  // Status and lifecycle
  status:    "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED"
  validFrom: Date
  validTo:   Date | null

  // Rendering
  renderingContexts: string[]  // targeting: which contexts this block appears in

  // Record timestamps
  createdAt: Date
  updatedAt: Date
}
```

---

## Answers to Design Questions

### 1. Block Identity

Blocks are identified by `canonicalKey`. Regeneration upserts by `canonicalKey` — `platformId` and `id` are preserved. URLs route via `canonicalKey`. The block is immortal in identity even as its content is updated by successive extraction runs.

### 2. Source Mapping

Source mapping is represented as a `dependencies` JSONB field:

```typescript
type BlockDependencies = {
  entities:      string[]  // UUIDs
  relationships: string[]  // UUIDs
  policies:      string[]  // UUIDs
  events?:       string[]  // UUIDs
}
```

This is a single field — not three separate array columns — because:
- It is atomic to read and write
- It supports PostgreSQL `@>` containment queries for regeneration triggers
- It is extensible (add `events` without a migration)
- It clearly represents the dependency graph as a unit

**Regeneration query:** when canonical record X changes, find all affected blocks:
```sql
SELECT * FROM content_blocks
WHERE dependencies @> '{"entities": ["<uuid>"]}'::jsonb
  AND status != 'ARCHIVED';
```

A `ProgramBlock` for the Computer Science program has dependencies on:
- The `program` Entity (primary source)
- The `organization` Entity for the department
- All `relationship` records linking the program to requirements and contacts
- Applicable `policy` records (graduation requirements, eligibility)

All of those UUIDs appear in `dependencies`. Any change to any of them triggers regeneration.

### 3. Provenance

**What belongs on the block (derived/cached):**
- `sourceUrls` — union of `sourceUrl` from all dependency canonical records; cached at generation time
- `confidenceScore` — minimum confidence across all dependencies (the weakest link); cached at generation time
- `lastExtractionRunId` — which run last triggered regeneration; a soft reference for tracing
- `generatedAt` — when the block was last assembled

**What remains in the canonical layer (authoritative):**
- Individual fact citations (`citationText` on `ExtractionObservation`)
- Per-fact confidence (on `Entity.confidence`, `Relationship.confidence`)
- Temporal history (`validFrom`/`validTo` on canonical records)
- Extraction run provenance (`ExtractionRun` records)

A block's `sourceUrls` is a rendering convenience — a human can see "this came from these pages." It is not the authoritative provenance record. The authoritative trace runs: Block → `dependencies` → canonical records → `extractionRunId` → `ExtractionObservation` → `citationText`.

### 4. Governance

Governance metadata is standardized across all block types. No block type may omit these fields:

| Field | Meaning |
|---|---|
| `ownerEntityId` | Person or organization entity responsible for this block's accuracy |
| `reviewedAt` | When the owner last confirmed the block is accurate |
| `reviewedByEntityId` | Who performed the review |
| `status` | DRAFT → REVIEW → PUBLISHED → ARCHIVED (see status flow below) |
| `validFrom` / `validTo` | Temporal validity of this version of the block |
| `confidenceScore` | Rendering-time signal of aggregate extraction confidence |
| `generatedAt` | When the block was last assembled — basis for freshness calculation |

**Freshness status** is computed at query time from `generatedAt` relative to the tenant's freshness policy. It is not stored on the block — storing it would require updating every block as time passes. The freshness policy (a `Policy` record) defines thresholds: e.g., "a published block is stale after 180 days without regeneration."

**Status flow:**
```
DRAFT      — Generated but not reviewed. Not visible to non-admin audiences.
REVIEW     — Generated from changed canonical data. Previously published. Owner notified.
PUBLISHED  — Owner-reviewed and approved. Visible to target audiences.
ARCHIVED   — No longer rendered. Preserved for history.
```

When a block is regenerated from a previously PUBLISHED state, it drops to REVIEW. It is never auto-published. A human owner must confirm the update before it returns to PUBLISHED.

### 5. Rendering Context

**Recommendation: Option C — Hybrid.**

`renderingContexts: string[]` answers the **targeting question**: "Should this block appear in this context at all?"

Example: `renderingContexts: ["visitor", "prospective_student", "current_student"]` — this block renders for those three contexts and is invisible to others.

Policy evaluation answers the **visibility question**: "Within this context, which fields in this block can this specific person see?"

Example: A ProgramBlock rendered for `administrator` context shows confidence scores, source citations, last extraction date, and governance gaps. The same block for `visitor` context shows description, outcomes, and contact information only. This distinction is encoded in a `Policy` record (`policyType: "rendering_visibility"`), not in the block schema.

These are two different questions requiring two different mechanisms:
- Targeting (`renderingContexts`) is static metadata set at generation time
- Visibility (Policy) is dynamic evaluation at render time based on the authenticated entity

Duplicating blocks per audience is explicitly rejected. One block, targeted to appropriate contexts, with policy-driven field visibility within each context.

### 6. Nested Blocks

**Nested blocks are references, not materializations.**

A `ProgramBlock` may reference child blocks via `childBlockIds: string[]` (array of `platformId` values). The rendering layer resolves them. The child blocks are never embedded in the parent block's `content` field.

**Why references, not materialization:**
- If child blocks were embedded, every update to a child block would require re-embedding in every parent — cascading writes
- References allow each block to be independently regenerated; the parent always renders the current child
- Dependency tracking propagates up: when a child block changes, parents that reference it are also queued for regeneration

**Dependency propagation for nested blocks:**
The regeneration engine, on completing a child block regeneration, queries parent blocks: `WHERE child_block_ids @> '["<child_platformId>"]'::jsonb`. Parents are queued for re-evaluation. Their `generatedAt` and cached metadata are refreshed. If a parent was PUBLISHED, it drops to REVIEW.

### 7. Generated Tenant Requirements

The block schema supports all generated tenant capabilities:

| Capability | Supported by |
|---|---|
| Institutional Search | `searchContent` text field + PostgreSQL FTS index |
| Ownership Maps | `ownerEntityId` → person/org entity hierarchy |
| Gap Detection | `ownerEntityId IS NULL` OR `status IN ('DRAFT', 'REVIEW')` after threshold |
| Governance Visibility | `ownerEntityId`, `reviewedAt`, `status`, `confidenceScore` |
| Freshness Visibility | `generatedAt` + freshness policy evaluation |
| Role-Aware Rendering | `renderingContexts` (targeting) + Policy (field visibility) |
| Citations | `sourceUrls` (cached), `lastExtractionRunId` → canonical trace |
| Audience Navigation | Block listing by `blockType` + `renderingContexts` containment |

### 8. Regeneration Strategy

**Option C: Stored projections, event-driven regeneration.**

Blocks are stored in the database. They are not dynamically assembled on every request — a generated tenant serving public website traffic cannot afford per-request canonical traversal for every block on a page.

Regeneration is event-driven: when canonical state changes (a canonical record's `validTo` is set and a new record is created), a Trigger.dev task finds all blocks with that record in their `dependencies` and regenerates them.

Regenerated blocks:
- Drop to REVIEW if they were PUBLISHED
- Drop to DRAFT if they were DRAFT
- Get fresh `generatedAt`, `sourceUrls`, `confidenceScore`, `lastExtractionRunId`
- Their `content` reflects current canonical state

### 9. Dependency Tracking

```typescript
type BlockDependencies = {
  entities:      string[]  // entity.id UUIDs
  relationships: string[]  // relationship.id UUIDs
  policies:      string[]  // policy.id UUIDs
  events?:       string[]  // institutional_event.id UUIDs
}
```

Stored as JSONB. PostgreSQL containment operators for queries:

```sql
-- Find all blocks that depend on a specific entity
SELECT * FROM content_blocks
WHERE dependencies @> '{"entities": ["d4e5f6..."]}'::jsonb;

-- Find all blocks that depend on a specific policy
SELECT * FROM content_blocks
WHERE dependencies @> '{"policies": ["a1b2c3..."]}'::jsonb;
```

For child block dependency propagation, the parent block's `dependencies` does NOT need to include all of the child's dependencies manually. The regeneration engine resolves the propagation chain at runtime via `childBlockIds`. This keeps `dependencies` scoped to the direct canonical primitives the assembly step read — not a recursive union.

### 10. Projection Boundary

| Category | Block's role | Canonical layer's role |
|---|---|---|
| Authoritative facts (credit hours, program names) | Render | Own |
| Identity facts (student IDs, employee IDs) | Do not touch | Own (EntityIdentifier) |
| Temporal history | Do not touch | Own (validFrom/validTo) |
| Policy rules | Evaluate, render outcomes | Own |
| Organizational structure | Render current state | Own (Relationships) |
| Governance state | Cache from canonical | Source of truth |
| Rendered title and description | Assemble and own | Provide raw facts |
| Search content | Aggregate and own | N/A |
| Rendering context targeting | Own | N/A |

**How projection drift is prevented:**

1. Regeneration is event-driven — blocks cannot silently diverge from the canonical layer
2. Regenerated blocks drop to REVIEW — human review before a stale projection goes public
3. The projection boundary is enforced by architecture: the block generator reads canonical records and assembles; it does not write back to canonical records
4. `dependencies` must contain every canonical record the generator read — this is enforced at generation time, not at query time

---

## Block Content Shapes

Each `blockType` defines a contract for its `content` JSONB field. All fields in `content` are rendered values derived from canonical primitives — never owned authoritative facts.

### ProgramBlock

```typescript
type ProgramBlockContent = {
  programType:      string             // "associate" | "certificate" | "bachelor" | "master"
  degreeType:       string             // "AAS" | "AS" | "AA" | "Certificate" | ...
  cipCode?:         string             // e.g. "11.0101"
  totalCredits?:    number
  creditRange?:     [number, number]   // [min, max] if variable
  description?:     string
  outcomes?:        string[]
  departmentName?:  string
  departmentUrl?:   string
  contactName?:     string
  contactEmail?:    string
  contactPhone?:    string
}
```

Child blocks: `RequirementBlock[]`, `CourseBlock[]`, `ContactBlock[]`

### CourseBlock

```typescript
type CourseBlockContent = {
  subjectCode:      string    // "MATH"
  courseNumber:     string    // "1010"
  courseCode:       string    // "MATH-1010"
  credits?:         number
  description?:     string
  prerequisites?:   string[]  // course_block canonicalKeys
  corequisites?:    string[]  // course_block canonicalKeys
  offeredBy?:       string    // department display name
  offeredByUrl?:    string
}
```

### RequirementBlock

```typescript
type RequirementBlockContent = {
  requirementType:   string    // "core" | "general_education" | "major" | "elective"
  totalCredits?:     number
  requiredCourses?:  string[]  // course_block canonicalKeys
  electiveGroups?:   {
    label: string
    minCredits: number
    courses: string[]          // course_block canonicalKeys
  }[]
  notes?:            string
}
```

### DepartmentBlock

```typescript
type DepartmentBlockContent = {
  orgType?:       string    // "school" | "department" | "division" | "office"
  description?:   string
  parentUnit?:    string    // display name of parent org
  phone?:         string
  email?:         string
  location?:      string
  website?:       string
  dean?:          string    // display name of department head
}
```

Child blocks: `ServiceBlock[]`, `ContactBlock[]`

### ServiceBlock

```typescript
type ServiceBlockContent = {
  description?:     string
  audience?:        string[]   // intended audiences
  eligibility?:     string
  hours?:           string
  location?:        string
  phone?:           string
  email?:           string
  website?:         string
}
```

### ContactBlock

```typescript
type ContactBlockContent = {
  firstName?:    string
  lastName?:     string
  title?:        string
  department?:   string
  email?:        string
  phone?:        string
  officeLocation?: string
}
```

### PolicyBlock

```typescript
type PolicyBlockContent = {
  policyType:     string
  category?:      string
  effectiveDate?: string
  body?:          string
  summary?:       string
  relatedPolicies?: string[]   // policy_block canonicalKeys
}
```

### LocationBlock

```typescript
type LocationBlockContent = {
  buildingName?:  string
  address?:       string
  hours?:         string
  services?:      string[]
  accessibility?: string
  mapUrl?:        string
}
```

---

## Rendering Contexts Registry

```typescript
export const RenderingContexts = {
  VISITOR:             "visitor",
  PROSPECTIVE_STUDENT: "prospective_student",
  CURRENT_STUDENT:     "current_student",
  FACULTY:             "faculty",
  STAFF:               "staff",
  ADMINISTRATOR:       "administrator",
  ASSISTANT:           "assistant",   // grounding context for institutional AI
  SEARCH:              "search",      // indexed for search
  API:                 "api",         // exposed via API response
} as const;
```

A block may target any subset of these. Most public content targets `["visitor", "prospective_student", "search", "api"]`. Administrator governance views add `"administrator"`. Assistant context includes `"assistant"` for grounding.

---

## Search and Indexing

**PostgreSQL full-text search.** `searchContent` is a plain-text field aggregated by the block generator from title and key content fields. The FTS index operates on this field.

**Generator responsibility:** when assembling a block, the generator also populates `searchContent`:
```typescript
searchContent = [
  title,
  content.description,
  content.outcomes?.join(" "),
  content.departmentName,
  // etc. — block-type specific
].filter(Boolean).join(" ")
```

**FTS query pattern:**
```sql
SELECT * FROM content_blocks
WHERE to_tsvector('english', search_content) @@ plainto_tsquery('english', $1)
  AND status = 'PUBLISHED'
  AND (rendering_contexts @> '["search"]'::jsonb OR rendering_contexts @> '["visitor"]'::jsonb)
  AND valid_to IS NULL;
```

A PostgreSQL GIN index on the tsvector is added via raw migration SQL — Prisma does not natively model tsvector columns.

---

## Prisma Schema

```prisma
model ContentBlock {
  id            String             @id @default(uuid())
  platformId    String             @unique @default(uuid()) @map("platform_id")
  canonicalKey  String             @unique @map("canonical_key")

  blockType     String             @map("block_type")
  title         String
  content       Json
  searchContent String?            @map("search_content")

  dependencies  Json               @default("{\"entities\":[],\"relationships\":[],\"policies\":[]}")
  childBlockIds Json               @default("[]") @map("child_block_ids")

  // Provenance (derived from canonical layer at generation time)
  sourceUrls          Json      @default("[]") @map("source_urls")
  confidenceScore     Decimal?  @db.Decimal(4, 3) @map("confidence_score")
  lastExtractionRunId String?   @map("last_extraction_run_id")
  generatedAt         DateTime? @map("generated_at")

  // Governance
  ownerEntityId       String?   @map("owner_entity_id")
  reviewedAt          DateTime? @map("reviewed_at")
  reviewedByEntityId  String?   @map("reviewed_by_entity_id")

  // Status and lifecycle
  status        ContentBlockStatus @default(DRAFT)
  validFrom     DateTime           @default(now()) @map("valid_from")
  validTo       DateTime?          @map("valid_to")

  // Rendering
  renderingContexts Json @default("[]") @map("rendering_contexts")

  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@index([blockType])
  @@index([blockType, status])
  @@index([status])
  @@index([canonicalKey])
  @@map("content_blocks")
}

enum ContentBlockStatus {
  DRAFT
  REVIEW
  PUBLISHED
  ARCHIVED

  @@map("content_block_status")
}
```

Note: the GIN index for full-text search on `search_content` is added in raw migration SQL, not Prisma schema, because Prisma does not model tsvector computed columns.

---

## Block Types Registry

```typescript
export const BlockTypes = {
  PROGRAM:     "program_block",
  COURSE:      "course_block",
  REQUIREMENT: "requirement_block",
  DEPARTMENT:  "department_block",
  SERVICE:     "service_block",
  CONTACT:     "contact_block",
  POLICY:      "policy_block",
  LOCATION:    "location_block",
} as const;

export type BlockType = (typeof BlockTypes)[keyof typeof BlockTypes];
```

Same governance as canonical type registry (ADR-013): new block types require a spec-level decision. Institutions never define their own block types — they configure `TenantOntologyEntityType` and `TenantOntologyField` to shape the canonical layer, and the block generator produces blocks from the canonical layer.

---

## Non-Negotiables

1. **Blocks never own facts.** If a fact is in `content` and not traceable to a canonical record in `dependencies`, it is projection drift. The block generator must read from the canonical layer, not author it.
2. **Regeneration is the mechanism of truth.** Blocks do not correct canonical facts. When canonical state changes, the block is regenerated. The block never triggers canonical updates.
3. **Identity is preserved across regenerations.** `platformId` and `canonicalKey` never change after creation. URLs never break.
4. **Previously published blocks require human review after regeneration.** No auto-publish.
5. **Role targeting via `renderingContexts`. Field visibility via Policy.** These are not interchangeable.
6. **Child blocks are references.** Nested blocks are never materialized inside parent content.

---

## Open Questions

- [ ] Block generator spec: exact assembly query per block type — deferred to implementation
- [ ] Freshness policy shape: how are thresholds configured per block type? — deferred to Day 60 governance work
- [ ] Demo mode: how are rendering contexts simulated for unauthenticated demo visitors? — deferred to role-aware rendering spec

---

## Related

- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-003 — Content Block Architecture]]
- [[ADR-012 — Canonical Schema Architecture]]
- [[ADR-013 — Canonical Type Registry]]
- [[extraction-pipeline-spec]]
- [[generated-tenant-spec]]
- [[role-aware-rendering-spec]]
