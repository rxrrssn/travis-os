---
type: session-note
domain: corveaux
status: complete
date: 2026-05-28
tags:
  - assistant
  - itsm
  - service-management
  - workforce
  - finance
  - flows
  - notifications
  - ui-overhaul
  - schema-expansion
  - session-log
---

# Corveaux Platform Build — Session 12

## Overview

Massive schema and UI expansion session. Added six new platform modules and overhauled the core admin shell. All work is on the `master` branch, uncommitted as of 2026-06-05.

---

## 1. Assistant Module

**Schema additions:**
- `AssistantConfig` — one per tenant; covers identity (name, greeting, tagline, avatarUrl), communication style (tonePreset, warmthLevel, verbosity, citationStyle, linkFrequency, emojiPolicy), channels (web, portal, SMS, Teams), escalation config, and `suggestedPrompts` (JSON array) and `orgContext` (freetext)
- `AssistantConversation` — tenant-scoped persistent conversation; links to sessionToken (anonymous) or personId (authenticated)
- `AssistantMessage` — immutable message record with role, content, citations (JSON array), metadata

**UI built:**
- `/t/[slug]/admin/assistant` — full AssistantConfig editor with identity, style, channels, and escalation sections

**Dependencies added:**
- `@anthropic-ai/sdk ^0.99.0` — inference layer for future conversation endpoint

**Migrations:**
- `20260528020051_add_assistant_models`
- `20260528022145_add_suggested_prompts` — added `suggestedPrompts` field
- `20260528032348_add_assistant_org_context` — added `orgContext` field

**Architecture ref:** [[Corveaux Assistant Architecture - 2026-05-27]]

---

## 2. Service Management (ITSM)

**Schema additions:**
- `SmCategory` — service categories (icon, sortOrder, isActive)
- `SmService` — services with slug, category FK, `approvalOrgId` FK, `isPublic`, `isActive`
- `SmTicket` — support tickets with ticketNumber, status, priority, assignment, linked personId
- `SmChange` — ITSM change records: type (NORMAL/STANDARD/EMERGENCY), state (DRAFT→CLOSED), CAB required, implementation/rollback/test plans, scheduled windows, requester/implementer/assignmentGroup FKs
- `ApprovalOrg` — approval organization model; linked to SmService for service-level approval routing
- `SmFlowTemplate` + `SmFlowStep` — approval flow templates and steps

**UI built (all under `/t/[slug]/admin/sm/`):**
- Dashboard (`/sm`)
- Tickets: list, new, detail with actions
- Changes: list, new, detail with actions
- Problems: list, detail
- Services: detail/settings per service
- SLA: policy management
- Assets: asset list, detail
- Settings: service catalog config

**Form block integration:**
- `FormBlockSubmission` model links CMS block submissions to SM tickets
- `ContentBlock` gets `smServiceId` FK — form blocks can auto-route to a service

**Migrations:**
- `20260528034520_add_service_management`
- `20260528152924_add_itsm_change_management_and_flows`
- `20260528154119_add_service_approval_and_ticket_approval_link`
- `20260528172923_add_form_blocks`

---

## 3. Workforce Module

**Schema additions:**
- `WfPosition` — position record: orgId FK, laborClass, scheduleType, workLocation, supervisorPositionId, FTE, headcount, vacancy, salary band, fundingSource, FLSA, jobFamily, benefits, education/experience/license requirements, `postingDuties`, `postingQualReq`, `postingQualPref`, `postingOrgSummary`
- `WfJobApplication` — application record: positionId + personId FKs, status (SUBMITTED→HIRED/REJECTED), coverLetter, resumeUrl, portfolioUrl, referralSource, reviewedById

**UI built (all under `/t/[slug]/admin/workforce/`):**
- Dashboard
- Positions: list, new, detail with actions
- Appointments: list, new, detail
- Leave: request management
- Onboarding: plan list; templates (list, new, detail)
- Performance: cycle list, cycle detail, goals
- People (workforce view): person detail with HR context
- Directory: workforce directory
- Org chart
- Analytics
- Applications

**Migrations:**
- `20260528160529_add_workforce_layer`
- `20260528162853_add_position_hr_metadata_and_posting`
- `20260528165128_add_job_applications`

---

## 4. Finance Module

**Schema additions:**
- `FinChartOfAccount` — hierarchical COA with code, type, subtype, normalBalance (DEBIT/CREDIT), isImported
- `FinCostCenter` — cost center hierarchy: centerType, managerId FK, isActive
- `FinJournalEntry` + `FinJournalLine` — double-entry bookkeeping
- `FinBudgetPeriod` + `FinBudgetLine` — budget periods and line items
- `FinTransaction` — financial transaction records
- `FinVendor` — vendor management
- `FinPurchaseOrder` + `FinPOLine` — procurement (PO + line items)

**UI built (all under `/t/[slug]/admin/finance/`):**
- Dashboard
- Chart of Accounts: list
- Cost Centers: list, detail
- Journal Entries: list, new
- Budgets: list, period detail, new period
- Transactions: list
- Procurement (POs): list, detail
- Reports

**Migration:**
- `20260528174938_add_finance_module`

---

## 5. Broader Platform Expansion (Mega Migration)

Single migration covering remaining platform schema: `20260528191309_add_perf_leave_assets_sla_problems_procurement_customfields_webhooks_apikeys_notifications`

**Models added:**
- `PerfReviewCycle`, `PerfReview`, `PerfReviewSection`, `PerfGoal` — performance review engine
- `LeaveType`, `LeaveRequest`, `LeaveBalance` — leave management
- Asset management tables
- SLA policy tables
- Problem management tables (ITSM)
- Procurement tables
- `CustomFieldDefinition` + `CustomFieldValue` — tenant-configurable custom fields on any entity
- `WebhookEndpoint` + `WebhookDelivery` — outbound webhook infrastructure
- `ApiKey` — tenant API key management
- `Notification` — platform notification system

---

## 6. Flows Module

**UI built:**
- `/t/[slug]/admin/flows` — approval flow listing and management

**Schema:** Uses existing `WorkflowDefinition` / `WorkflowInstance` / `WorkflowStepRecord` primitives from [[Corveaux Architecture Session - 2026-05-27]]

---

## 7. Notifications Module

**UI built:**
- `/t/[slug]/admin/notifications` — notification management surface

---

## 8. UI / Shell Overhaul

### Tenant Admin Sidebar (`TenantAdminShell.tsx`)
Complete redesign. Graphite sidebar (`bg-graphite`) with:
- Tenant identity block at top (logo or initials + tenant name)
- Primary nav: Dashboard, Sites, Pages, Content Blocks, Knowledge Base, People, Assistant, Workforce, ITSM, Finance, Flows
- System section: Settings (separator + label)
- Active state: brass/tenant-primary left-border indicator + white text
- Inactive: `text-white/45` with hover to `text-white/75`
- Platform Admin link at footer for PLATFORM_* users

### Tenant Admin Dashboard (`/t/[slug]/admin/page.tsx`)
Redesigned from stats strip to full module card grid (4 columns):
- 12 module cards: Sites, Pages, Content Blocks, Knowledge Base, People, Organizations, Assistant, Workforce, ITSM, Finance, Flows, Settings
- Each card shows icon, label, and short descriptor
- Member count in page header

### CSS Design Tokens (`globals.css`)
Overhauled with warm palette variables:
```
--color-canvas:   #F2EDE3
--color-surface:  #FDFAF5
--color-subtle:   #EDE7DA
--color-ink:      #18191C
--color-ink-secondary: #424952
--color-ink-muted: #7A8088
--color-border:   #DDD7CC
--color-border-strong: #C5BBAE
--color-graphite: #272D33
--color-success:  #5F8C6A
--color-warning:  #B88A42
--color-danger:   #A85E55
--color-info:     #5F7A9A
```
Added: text-rendering optimization, selection highlight (brass/20), refined scrollbar (6px, warm gray).

### TopBar
Refreshed to match the new shell aesthetic.

---

## Validation State

These migrations have been applied to the local SQLite dev database. The `prisma/schema.prisma` file reflects all changes (+1686 lines from the committed baseline). TypeScript and build status as of this session are not yet confirmed in vault — verify with `npx tsc --noEmit && npm run build`.

---

## Files Changed (Key)

**Prisma:**
- `prisma/schema.prisma` (+1686 lines)
- `prisma/seed.ts` (+179 lines)
- 12 new migration directories under `prisma/migrations/20260528*/`

**New route trees:**
- `src/app/t/[slug]/admin/assistant/` (3 files)
- `src/app/t/[slug]/admin/sm/` (20+ files)
- `src/app/t/[slug]/admin/workforce/` (25+ files)
- `src/app/t/[slug]/admin/finance/` (15+ files)
- `src/app/t/[slug]/admin/flows/` (3 files)
- `src/app/t/[slug]/admin/notifications/` (2 files)

**Shell/UI:**
- `src/components/shell/TenantAdminShell.tsx` (+101 lines net — full sidebar redesign)
- `src/app/t/[slug]/admin/page.tsx` (+78 lines net — dashboard redesign)
- `src/app/globals.css` (+90 lines — design tokens + polish)
- `src/components/shell/TopBar.tsx` (+30 lines)
- `src/components/admin/BlockEditForm.tsx` (+145 lines — form block type support)
- `src/components/blocks/BlockRenderer.tsx` (+50 lines)
- `src/lib/blocks.ts` (+3 lines)
- `src/lib/tenant.ts` (+1 line)
- `package.json` — added `@anthropic-ai/sdk ^0.99.0`

---

## Outstanding / Not Yet Built

- Assistant inference endpoint (API route wiring Claude to AssistantConfig)
- Public-facing assistant widget (web channel)
- Conversation session persistence (cookie → DB)
- KB grounding / retrieval for assistant
- RBAC enforcement across all new modules
- Delete/archive flows for most new entity types
- Email delivery for notifications
- Webhook delivery worker
- Production DB migration (still on SQLite/Turso; NeonDB planned)
- Commit and push to GitHub (all 2026-05-28 work is uncommitted)

---

## Related

[[Corveaux]]
[[Corveaux Architecture Session - 2026-05-27]]
[[Corveaux Assistant Architecture - 2026-05-27]]
[[Corveaux Auth Architecture - Tenant Resolver]]
[[Corveaux CMS Build - Session 11]]
