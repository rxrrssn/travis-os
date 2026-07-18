# Corveaux Architecture Session — 2026-05-27

## What We Built (CMS + UI, Sessions 6–11)

Before the architectural pivot, sessions 6–11 completed:

- **WYSIWYG block editor**: side-by-side layout with live `BlockRenderer` preview; sticky left panel with content form + settings; `-mx-8 -mb-7` breakout from PageContainer for full-width canvas
- **Two new block types**: `MARQUEE` (CSS ticker animation, brass diamond separators, hover-pause) and `STATS_BAND` (dark graphite bg, hairline grid via `gap-px bg-white/10`, brass stat values)
- **Internal tenant homepage**: 8-block futuristic homepage — HERO, MARQUEE (14 module names), two SECTION_HEADERs, FEATURE_GRID (6 data principles), STATS_BAND (16+ modules / 1 data model / 0 middleware / ∞ scale), PULLQUOTE, SERVICE_GRID (12 platform modules)
- Cleaned up 8 draft pages and 8 orphaned content blocks from the internal tenant

---

## Architectural Decision: Primitives First

**The shift:** Stop treating Corveaux as a collection of siloed modules (SIS, LMS, CRM...). Modules are lenses onto a canonical graph — they are not the foundation.

**The primitives:**

| Primitive | What it is |
|-----------|-----------|
| **Entity** | Persistent, identifiable subject — Person, Organization |
| **Relationship** | Typed edge between entities — Affiliation, Reporting line |
| **Event** | Immutable record of something that happened — Domain, Audit, Timeline, Notification |
| **Workflow** | Versioned definition + runtime instance — governs multi-step processes |
| **Actor** | Who/what acts — PERSON, AGENT, SERVICE, AI_AGENT |
| **Grant** | Authorization unit — Actor Ã— Role Ã— Scope |
| **Scope** | Boundary of authority — tenant, organization, team, global |
| **Lifecycle** | State machine for entities/instances |

---

## Three-Layer Model

```
INTERNAL TENANT        — Operational brain
  ←“ governed workflows
PLATFORM               — Protected execution layer (no direct access by any tenant)
  ←“ provisioning jobs
TENANT                 — Institution operating environment
```

**Key principle:** The internal tenant is not the platform. It *operates* Corveaux through workflows. Example flow:

1. Customer org (in internal tenant) → creates Implementation Project
2. Implementation Project → triggers Provisioning Request
3. Provisioning Request → triggers Platform Job
4. Platform Job → provisions tenant
5. Platform Job completion → fires Domain Event → updates Provisioning Request status

This means even Corveaux staff interact through governed workflows, not raw platform access. The platform has no UI — it is triggered by events.

---

## Schema Cleanup Plan (Next Build Session)

### 1. Affiliation (rename from PersonOrganizationRelationship)
```
id, tenantId, personId, organizationId
affiliationType       (was: relationshipType)
positionLabel         (was: title)
positionCode          (new — structured job code)
isPrimary Boolean     (new)
startedAt DateTime?   (was: startDate)
endedAt DateTime?     (was: endDate)
status                (keep)
@@unique([tenantId, personId, organizationId, affiliationType])
```

### 2. Relationship (rename from PersonPersonRelationship)
```
id, tenantId, fromPersonId, toPersonId
relationshipType, notes, startedAt, endedAt, status
```

### 3. Role (update)
```
+ description String?
+ isSystem Boolean @default(false)
@@unique([tenantId, slug])   // fix: was just [name, tenantId]
```

### 4. Actor (new)
```
id, type (PERSON | AGENT | SERVICE | AI_AGENT)
tenantId String?      // null = platform actor
personId String?      // FK to Person if type=PERSON
displayName String
isActive Boolean @default(true)
metadata String @default("{}")
```

### 5. Grant (new)
```
id, actorId → Actor
roleId → Role
scopeType String      // TENANT | ORGANIZATION | TEAM | GLOBAL
scopeId String?       // null = global
grantedBy String      // actorId
expiresAt DateTime?
status String @default("ACTIVE")
conditions String @default("{}")
@@unique([actorId, roleId, scopeType, scopeId])
```

### 6. AuditEvent (replace PersonAuditLog + OrganizationAuditLog)
```
id, tenantId
actorId String?       // who did it
actorType String      // PERSON | SYSTEM | AGENT
action String         // CREATE | UPDATE | DELETE | TRANSITION
entityType String     // Person | Organization | etc.
entityId String
diff String @default("{}")   // JSON patch
ipAddress String?
userAgent String?
occurredAt DateTime @default(now())
```

### 7. DomainEvent (new — internal event bus)
```
id, tenantId?
eventType String      // e.g. "person.created", "affiliation.ended"
sourceEntityType String
sourceEntityId String
payload String @default("{}")
correlationId String?
processedAt DateTime?
occurredAt DateTime @default(now())
```

### 8. TimelineEvent (new — human-readable feed)
```
id, tenantId
actorId String?
subjectType String    // the "about" entity type
subjectId String
verb String           // "enrolled in", "promoted to", "departed from"
summary String        // rendered sentence
metadata String @default("{}")
occurredAt DateTime @default(now())
```

### 9. WorkflowDefinition (new)
```
id, tenantId?          // null = platform-level
key String             // e.g. "tenant.provisioning"
version Int @default(1)
name String
triggerType String     // MANUAL | EVENT | SCHEDULE | API
triggerConfig String @default("{}")
scopeType String       // who can trigger
steps String           // JSON step definitions
isActive Boolean @default(true)
@@unique([tenantId, key, version])
```

### 10. WorkflowInstance (new)
```
id
definitionId → WorkflowDefinition
tenantId?
contextEntityType String?    // what this instance is "about"
contextEntityId String?
status String @default("PENDING")   // PENDING | RUNNING | PAUSED | COMPLETED | FAILED | CANCELLED
variables String @default("{}")
startedAt DateTime?
completedAt DateTime?
createdAt DateTime @default(now())
```

### 11. WorkflowStepRecord (new)
```
id
instanceId → WorkflowInstance
stepKey String
stepType String    // TASK | APPROVAL | CONDITION | ACTION | WAIT | FORK
status String @default("PENDING")
actorId String?    // who is assigned/performed
input String @default("{}")
output String @default("{}")
startedAt DateTime?
completedAt DateTime?
```

---

## Design Principles Confirmed

- **ONE PERSON** — a person exists once across all tenants; identity is federated, not duplicated
- **RBAC ≠ Affiliations** — being an employee does not grant system access; grants are explicit
- **Workflows govern platform actions** — no direct DB writes to platform layer from tenant code
- **Events are immutable** — DomainEvent and AuditEvent are append-only
- **Modules are lenses** — the SIS module is a query + UI layer over Person + Affiliation + Lifecycle; it adds no new primitives

---

## Implementation Completed (this session)

All schema changes were built and migrated:

- `Affiliation`, `Relationship`, `Role` (updated), `Actor`, `Grant`, `AuditEvent`, `DomainEvent`, `TimelineEvent`, `WorkflowDefinition`, `WorkflowInstance`, `WorkflowStepRecord`
- Migration file: `20260527223036_canonical_graph_primitives`
- All TypeScript updated across 6 files: `actions.ts`, `current-user.ts`, `people/page.tsx`, `people/[personId]/page.tsx`, `organizations/page.tsx`, `organizations/[organizationId]/page.tsx`
- TypeScript clean, build clean, seed clean

**Dev note:** SQLite DB got corrupted when `migrate reset` ran while the dev server held the file open. Fix: kill dev server, delete `dev.db`, run `migrate deploy && db seed`. Avoid running Prisma CLI while the dev server is live against the same SQLite file.

## Tech Stack (current)
- Next.js 15 App Router, React 19
- Prisma with LibSQL/SQLite (dev); Turso-compatible for prod
- Tailwind CSS with custom `graphite` / `canvas` / `brass` tokens
- Server Actions for mutations
- `cuid2` for IDs throughout
