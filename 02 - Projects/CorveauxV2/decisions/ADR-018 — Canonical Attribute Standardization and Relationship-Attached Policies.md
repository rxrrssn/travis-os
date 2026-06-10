---
type: decision
domain: extraction
status: active
date: 2026-06-07
tags: [extraction, canonical-model, schema, course, program, policy, relationship, day-60]
---

# ADR-018 — Canonical Attribute Standardization and Relationship-Attached Policies

## Decision

`course` and `program` entities standardize on a fixed, minimal canonical attribute set. Everything that does not fit that set — prerequisites, corequisites, admission rules, curriculum/degree/graduation requirements, recommended preparation, advising guidance, etc. — is extracted as a `Relationship` or a `Policy`, never as a free-form attribute. Where a relationship needs a qualifying detail (e.g. "C- or higher required" on a prerequisite), that detail is stored as a `Policy` attached to the `Relationship` instance — not as a string modifier on the relationship's own `attributes` JSON.

**Canonical `course` attributes:** `title`, `subjectCode`, `courseNumber`, `catalogCode`, `description`, `credits`, `courseFee`, `semestersOffered`, `catalogYear`, `status`

**Canonical `program` attributes:** `title`, `credentialType`, `description`, `totalCredits`, `timeToCompletion`, `locations`, `catalogYear`, `status`

`catalogYear` and `status` were added by the user after the initial draft — both are structural, not descriptive, facts: `catalogYear` anchors a course/program to the specific catalog edition it was extracted from (the same course can have materially different requirements across catalog years — this is the entity-level analogue of the `Relationship`/`Policy` `validFrom`/`validTo` time-versioning the rest of the model already relies on), and `status` captures lifecycle state (active / inactive / discontinued / pending — a fact every catalog page states but the original canonical set omitted). Both belong in the fixed set precisely because they're true of *every* course and program, at every institution, regardless of how a given source page phrases anything else — the same test that put `title` and `credits` in the set.

**New `relationshipType` values:** `prerequisite`, `corequisite`, `requires_course`, `contains_course`, `offered_by`

**Expanded `policyType` taxonomy** (folded into the existing `Policy` primitive — see Options Considered):
- Admission Rule, Eligibility Rule, Approval Rule, Access Rule, Governance Rule, Enrollment Rule
- Curriculum Requirement, Degree Requirement, Graduation Requirement, General Education Requirement
- Recommended Preparation, Suggested Course, Advising Guidance

## Context

The Day 30 gate live re-sample (Session 17, [[day-30-gate-resample-findings]]) and the user's independent random-20 manual review ([[day-30-gate-resample-random-20-manual]]) both scored well above the >90% bar (96.5% and 99.4% respectively) — the gate is closed and Day 60 generated-tenant work is unblocked. But both review passes surfaced the same underlying shape problem from different angles:

- **Bug 12 (Session 14, [[known_bugs]])** found "attribute-name soup" — the same concept (e.g. credential type) spelled five different ways depending on source phrasing — and built a normalization layer (`attribute-vocabulary.ts`) to canonicalize *spelling*. It explicitly deferred the harder problem: "policy-type soup intentionally NOT addressed here — needs entity-modeling work."
- **The manual reviewer (the user)** flagged, on `course:pta-2350` and `course:mse-1820`, that `corequisite`/`prerequisite` are stored as flat string attributes (`"PTA 2360"`, `"MATH 1050 w/C grade or better..."`) and suggested they "should be relational... maybe a modifier on the relationship."
- The same review flagged inconsistent `subjectCode`/`courseNumber` representation (sometimes split, sometimes combined as `"PTA 2350"`) — a direct symptom of having no canonical attribute contract for `course`.

These are the same root issue: the canonical attribute set for `course`/`program` was never fixed, so the extractor (and the normalization layer behind it) has been making ad hoc per-page judgment calls about what counts as an "attribute" versus a "fact that belongs in the relational/policy layer." That is exactly backwards for an Institutional Operating System whose Architectural Axiom states the institutional model — Entities, Relationships, Events, Policies, Time — is canonical and content (including a flat `attributes` JSON blob) is a projection. An unbounded `attributes` bag is itself a kind of un-modeled content; it just happens to live inside an Entity row instead of a content block.

## Options Considered

**Option A — Keep `attributes` as an open bag, rely on the normalization layer to converge spellings (status quo).** Rejected. Bug 12 already proved spelling-convergence isn't enough — the *shape* problem (should this be an attribute at all, or a relationship/policy?) recurs every time a new institution's page phrasing differs, and it compounds: each new tenant multiplies the chance of the same fact landing in `attributes` at one institution and in a `Relationship`/`Policy` at another, making cross-tenant queries and generated-tenant rendering unreliable. This directly trips Rule #7 ("No architectural decision may make future tenant separation more difficult") — an unbounded per-tenant attribute vocabulary *is* a tenant-separation hazard.

**Option B — Fixed canonical attribute sets + relationships/policies for everything else, with relationship modifiers stored as plain strings in `Relationship.attributes` (the manual reviewer's first suggestion).** Workable, but re-introduces the same "soup" risk one level down — `Relationship.attributes` becomes the new dumping ground for "C- or higher required," "department approval required," "by audition only," etc., each phrased differently per source page. It also can't represent *time* — a prerequisite rule that changes by catalog year needs `validFrom`/`validTo`, which `Relationship` doesn't carry on its sub-fields.

**Option C — Fixed canonical attribute sets + relationships, with qualifying detail stored as a `Policy` attached to the `Relationship` instance (chosen).** The user's refinement: instead of a string modifier, the modifier *is* a Policy — e.g. an `Eligibility Rule` policy ("grade of C- or higher in MATH 1050") whose subject is the `prerequisite` relationship between `course:mse-1820` and `course:math-1050`. This is the only option that keeps every layer of the model canonical: the relationship says *what* is required, the policy says *under what conditions/with what qualification*, and the policy inherits everything `Policy` already provides for free — `policyType` taxonomy, `rules` JSONB, `validFrom`/`validTo`, `sourceUrl`, `confidence`. Nothing new has to be invented; the existing primitive is simply allowed to attach to a `Relationship` as well as an `Entity`.

**Sub-decision — fold `Requirement`/`Recommendation` into `Policy` rather than create new primitives (user-confirmed).** The user's draft taxonomy listed `Requirement` and `Recommendation` as peers to `Relationship` and `Policy`. Both, on inspection, are species of "institutional logic about what's expected or suggested" — precisely what `Policy.policyType` (a free string, "new types never require migrations" per the schema's own header comment) was designed to absorb. Treating them as new top-level primitives would mean new DB tables, a new promotion path, and new content-block projections for a distinction (`requirement` vs. `rule` vs. `recommendation`) that is really just a `policyType` value. This keeps the Architectural Axiom's five-primitive model intact.

## Rationale

This decision makes the canonical model *narrower* at the entity-attribute layer and *richer* at the relationship/policy layer — which is the correct direction of travel for an Institutional Operating System. A `course` is not "a bag of facts about a course"; it is a node whose *identity* facts (title, subject, credits, fee, when offered) are attributes, and whose *relational* facts (what it requires, what requires it, what governs eligibility for it) are first-class canonical primitives that can be queried, time-versioned, and reasoned about across the whole institution — not just rendered back out as a paragraph on one page.

Storing the qualifying detail as a `Policy` attached to a `Relationship` rather than as a string also resolves Bug 12's deferred concern in the same motion: instead of accumulating ad hoc `policyType` strings per institution, the extractor now has an explicit, finite target taxonomy to map onto (Admission Rule, Eligibility Rule, Curriculum Requirement, etc.), and the normalization layer's job becomes "map this institution's phrasing onto one of these N canonical policy types" — a bounded problem, not an open one.

## Schema Implication

`Policy.subjectEntityType` / `subjectEntityId` currently link a policy only to an `Entity` — and notably with **no FK constraint** (it's already a loose, string-pair reference, not a Prisma relation). The schema's own design comment ("`policy_type` is a string: new types never require migrations") establishes that `Policy` deliberately favors loose typing over strict referential integrity for extensibility. Generalizing the subject reference continues that existing pattern rather than introducing a new one.

**Chosen shape — polymorphic subject, scoped to the three other canonical primitives only:**

```prisma
subjectKind String?   @map("subject_kind")   // "entity" | "relationship" | "event"
subjectType String?   @map("subject_type")   // the TYPE within that kind: course, program, prerequisite, admitted...
subjectId   String?   @map("subject_id")
@@index([subjectKind, subjectType, subjectId])
```

This generalizes (rather than replaces) the existing two-column design: the current `subjectEntityType` actually does double duty today — it both says "the subject is an Entity" *and* names which entity type (`course`, `program`...). A true polymorphic reference has to separate those two facts cleanly, or `subjectType: "course"` becomes ambiguous (an Entity of type course? something else entirely?). Adding the `subjectKind` discriminator preserves all the type-filtering power the current design has for entity subjects while extending it to relationships and events.

**`Policy` may govern an `Entity`, `Relationship`, or `Event` — never a `ContentBlock` (user-confirmed, deliberate exclusion).** Per the Architectural Axiom, content blocks are *projections*, never canonical ("No content block is canonical"). A `Policy` (canonical) referencing a `ContentBlock` (projection) would invert "One Reality, Many Projections" — the canonical layer would start depending on its own rendered output. If projection logic ever needs to know "does a policy govern how this renders," that's the *projection* reading the policy, never the policy pointing at the block. `subjectKind` is therefore a closed enum of exactly three values, by design — not left open for future convenience.

This is a `tenant.schema.prisma` migration and needs its own implementation pass before any extraction-layer work lands — it is the one piece of this ADR that touches the database schema rather than just the extraction layer, and changes to `Policy`'s shape ripple through the promotion engine and any existing policy-subject queries (which currently assume an entity subject).

## Stakeholders

- Travis Hornbuckle (platform)

## Consequences

**Positive:**
- Closes Bug 12's deferred "policy-type soup" gap with a bounded, named taxonomy instead of an open vocabulary
- Resolves the manual reviewer's prerequisite/corequisite and subjectCode/courseNumber consistency findings structurally, not with spot-fixes
- `course`/`program` entities become predictable, queryable, and renderable the same way across every future tenant — directly serves Rule #4 (model every institution type without special-case logic) and Rule #7 (don't make tenant separation harder)
- Qualifying details on relationships gain full `Policy` capabilities for free: time-versioning, confidence, source citation, structured `rules` JSON — richer than a string modifier could ever be

**Negative / Open work:**
- Requires a `Policy` schema change (subject-on-relationship) — needs its own design pass and migration before any extraction-layer work can land
- Requires new `EXTRACTION_RELATIONSHIP_TYPES` entries and a `policyType` vocabulary constant (parallel to `attribute-vocabulary.ts`'s normalization approach)
- `EXTRACTION_SYSTEM_PROMPT` needs explicit guidance steering the model to *not* emit prerequisite/admission/requirement facts as course/program attributes, with worked examples of the relationship+policy shape
- Existing promoted `course`/`program` entities carry attributes outside the new canonical sets (e.g. `prerequisite`, `corequisite`, `admission_type`, `delivery_modes`, `emphases`, `creditsPerSemester` per the gate samples) — a migration/backfill question: re-extract, or write a one-time reshape pass that lifts existing out-of-set attributes into relationships/policies against current canonical entities. **RESOLVED — deferred, not dropped (2026-06-07):** a live count found the problem far larger than the gate samples suggested (161/307 programs, 966/2288 courses — over 200 distinct out-of-set key spellings, e.g. `prerequisite`/`prerequisites`/`prerequisiteCourses`/`recommendedPrerequisite`/`recommended_prerequisite`...). A bespoke reshape pass would have to re-derive the same judgment calls the LLM extraction makes, with worse tools. But re-extracting the current corpus now would also be throwaway: the live SLCC data in the DB is the Day 30 gate validation artifact (Run 002), not the corpus that will back the actual generated SLCC tenant — Day 60/90 generated-tenant work means running the (now ADR-018-aware) pipeline again from scratch regardless. User's call: dump the dev DB and re-run extraction as part of that generated-tenant work, which absorbs the attribute-soup problem for free. No standalone backfill effort needed.
- Should be sequenced early in Day 60 generated-tenant work, since every subsequent institution multiplies the cost of *not* having a fixed shape (the same compounding-at-scale argument that motivated fixing Bugs 15-17 immediately rather than deferring them)

## Implementation Note (2026-06-07)

Implemented same-session as an **additive** schema change rather than the literal replace shown in "Schema Implication" — `subjectKind`/`subjectType`/`subjectId` were added as new nullable columns alongside the existing `subjectEntityType`/`subjectEntityId` (migration `20260607213601_add_policy_polymorphic_subject`), with zero data loss and full reversibility. The promoter now populates the legacy pair for entity-subject policies and the new triple for both entity- and relationship-subject policies; a later pass can backfill `subjectKind="entity"` onto pre-migration rows and drop the legacy columns once nothing reads them. This was a deliberate refinement on the ADR's literal text — chosen via an explicit user decision to avoid a destructive rename/backfill-in-one-step against a database already holding promoted policy data.

**Backfill attempted, premise found wrong (2026-06-07):** wrote and ran `backfill-policy-subject-kind.ts` against the live `corveaux` tenant — 0 rows matched the expected shape (`subjectKind IS NULL` AND `subjectEntityType`/`subjectEntityId` both populated). Investigation found **1,889** `Policy` rows with `subjectKind IS NULL`, but **none** carry a `subjectEntityId` — they're pre-redesign policy-type-soup artifacts (`policyType` values like `prerequisite`/`course-prerequisite`/`course_prerequisite`/`course-requirement`/`corequisite`... — the exact inconsistent-naming gap Bug 12 named), with the actual subject buried as a free-text string inside `rules` JSON (e.g. `"subject_course": "course:acct-2000"`) rather than a real reference. There is no entity ID to backfill into, and forcing `subjectKind="entity"` onto them would be wrong anyway — under this ADR they should become `subjectKind="relationship"` policies attached to real `prerequisite`/`corequisite` `Relationship` records. **No standalone backfill task exists.** These rows are pre-redesign artifacts in the Day 30 gate validation corpus and fall into the same bucket as the course/program attribute-soup question above — both get replaced wholesale by the Day 60/90 corpus regeneration. Script deleted; nothing to run.

Also implemented in the same pass:
- `EXTRACTION_RELATIONSHIP_TYPES`: `prerequisite`, `corequisite`, `requires_course`, `contains_course`, `offered_by` (`src/types/institutional.ts`)
- `EXTRACTION_POLICY_TYPES` taxonomy constant, folding Requirement/Recommendation into Policy per the sub-decision (`src/types/institutional.ts`)
- `EXTRACTION_SYSTEM_PROMPT` rewritten with the canonical course/program attribute sets (including `catalogYear`/`status`), worked relational-fact examples, and the `subjectRelationship` policy shape (`src/lib/extraction/extractor.ts`)
- `normaliseAttributeKeys` upgraded from a normalization layer to an enforcement gate for `course`/`program` — out-of-canonical-set keys are now dropped, not passed through (`src/lib/extraction/attribute-vocabulary.ts`); also switched the canonical duration key to `timeToCompletion` (no forced unit), sidestepping Bug 16's unit-conversion problem at the root
- `PolicyObservationSchema` gained an optional `subjectRelationship` triple; `promoteRun`'s two-phase ordering became **three-phase** (entities → relationships → policies/events) so relationship-attached policies can resolve their subject to an already-promoted `Relationship` record — the same dangling-reference class Bug 11 fixed, one level up (`src/lib/extraction/types.ts`, `promoter.ts`)
- Cleared backlog items (failed-page URL tracking in `ExtractionRun.metadata`, per-page idempotency keys on `extractPage_task`, a DB-level dedup guard on `Policy` promotion mirroring the Bug 11 relationship fix, and a semantic `attributesEqual` deep-comparison replacing the order-sensitive `JSON.stringify` conflict check) (`src/trigger/extraction.ts`, `src/lib/extraction/promoter.ts`)

Bugs 16-17 re-verification via a live extraction run remains open — pending user authorization (real API cost + wall time).

## Related

- [[ADR-012 — Canonical Schema Architecture]] — the `Entity`/`Relationship`/`Event`/`Policy` schema this ADR extends
- [[ADR-013 — Canonical Type Registry]] — where `EXTRACTION_RELATIONSHIP_TYPES` and friends are registered
- `known_bugs` (memory) — Bug 12 (attribute-name soup, policy-type soup deferred), Bugs 15-17 (citation mismatch, unit error, prerequisite omissions — all squashed Session 17)
- [[day-30-gate-resample-findings]] / [[day-30-gate-resample-random-20-manual]] — the two review passes whose findings motivate this decision
- [[Corveaux V2 - Session 17 — Day 30 Gate Live Re-Sample]] — session note recording the gate close-out this ADR follows
