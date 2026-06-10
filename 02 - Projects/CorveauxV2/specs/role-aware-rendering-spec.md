---
type: spec
domain: corveaux
status: active
date: 2026-06-06
tags: [corveaux, rendering, role-aware, spec]
---
# Role-Aware Rendering Spec  
  
**Status:** Complete. Decided Session 09 (2026-06-06). See [[ADR-015 — Rendering Architecture]].  
  
## Purpose  
  
Define how the same institutional reality renders as different experiences for different audiences.  
  
Role-aware rendering is a projection concern, not a canonical-model concern.  
  
The canonical institutional model remains unchanged. Different audiences receive different projections of the same underlying reality.  
  
This is a practical implementation of:  
  
> One Reality. Many Projections.  
  
---  
  
## Goals  
  
- Present relevant information to each audience  
- Reduce information overload  
- Preserve a single source of institutional truth  
- Avoid duplicate content ownership  
- Support institution-specific experiences without creating institution-specific architecture  
  
---  
  
## Audience Matrix  
  
| Audience | Primary Questions |  
|-----------|-----------|  
| Visitor | What does this institution do? How do I connect? |  
| Prospective Student | What can I study? How do I apply? What will it cost? |  
| Current Student | What do I need to do next? What services are available to me? |  
| Faculty | What courses, committees, processes, and responsibilities apply to me? |  
| Staff | What services exist? Who owns them? What are the procedures? |  
| Administrator | What is stale? What is missing? Who owns what? Where are the governance gaps? |  
  
---  
  
## Rendering Model (Hypothesis)  
  
- Audience context influences which blocks render and in what order  
- Rendering decisions may be driven by block metadata, rendering rules, policy evaluation, or a combination  
- The same institutional reality can produce different experiences  
- The same URL may render differently depending on audience context  
- Audience-specific experiences should not require duplicate content ownership  
- Demo mode may simulate audience context without authentication  
  
---  
  
## Example  
  
### Program  
  
Canonical Reality:  
  
- Program  
- Department  
- Requirements  
- Contacts  
- Policies  
  
Visitor View:  
  
- Overview  
- Outcomes  
- Contact information  
  
Prospective Student View:  
  
- Program overview  
- Admissions information  
- Costs  
- Career outcomes  
  
Current Student View:  
  
- Requirements  
- Remaining coursework  
- Deadlines  
- Advisor information  
  
Administrator View:  
  
- Ownership  
- Freshness  
- Citations  
- Confidence  
- Governance gaps  
  
Same institutional reality.  
  
Different projection.  
  
---  
  
## Non-Negotiables  
  
- The institutional model remains canonical  
- Audience context must not create duplicate institutional records  
- Rendering decisions must not alter canonical data  
- Every rendered fact must retain source provenance  
- Role-aware rendering must function without institution-specific logic  
  
---  
  
## Implementation (Decided ADR-015, 2026-06-06)

### Rendering Implementation

- [x] Is this implemented through React Server Components, middleware, client-side rendering, or a combination? — **React Server Components, resolved server-side. No client-side context switching.** Middleware injects `x-audience-context` request header from auth state. RSC reads the header via `headers()` from `next/headers`. All block filtering and field visibility is applied server-side before the response reaches the client. Client receives only the fields it is permitted to render.

### Routing Structure

- [x] What is the routing structure? — **Two App Router route groups:**
  - `(tenant)` — public routes; no auth required for visitor context; CDN-cacheable; institution's public identity. URLs: `/programs/[slug]`, `/courses/[slug]`, `/departments/[slug]`, `/services/[slug]`, `/policies/[slug]`, `/contacts/[slug]`, `/search`.
  - `(platform)` — administrative routes; auth required; governance metadata visible; never indexed. URLs: `/admin/programs/[slug]`, `/admin/gaps`, `/admin/blocks`, `/admin/ownership`.
  - Public URL (`/programs/[slug]`) is the institutional identity of the entity. Admin URL (`/admin/programs/[slug]`) is the platform operator view of that entity. Two routes, same underlying block, different projection scope.

### Demo Mode

- [x] How does demo mode work without exposing administrative views? — **Demo mode is the public `(tenant)` route.** No separate demo infrastructure, no demo tokens, no special-case logic. The public visitor projection of the institution IS the demo. For demonstrating specific audience perspectives (e.g., "what a prospective student sees"), a `?context=` query parameter on public routes unlocks additional non-administrative contexts (`visitor`, `prospective_student`, `current_student`). The param is constrained in RSC — it cannot unlock `administrator`, `staff`, or `faculty`. Administrative metadata never reaches unauthenticated routes regardless of query params.

### Audience Awareness Mechanism

- [x] Is audience awareness represented through metadata, rendering rules, policies, or a combination? — **A combination of two distinct mechanisms with distinct responsibilities:**
  - `renderingContexts: string[]` on the content block — **targeting**. Answers: should this block appear in this context at all? Set at block generation time. Static per block.
  - Policy record (`policyType: "rendering_visibility"`) — **field visibility**. Answers: within this context, which fields from `block.content` are visible? Evaluated at render time in RSC via `applyFieldVisibility()`. Dynamic per policy version.

### Policy Layer vs Rendering Layer

- [x] Which rendering decisions belong in the policy layer versus the rendering layer? —
  - **Policy layer:** which `content` fields are visible within a given context for a given block type. These are governance decisions that can change without code deployment.
  - **Rendering layer (RSC):** which blocks appear on a given page; layout and component composition; how fields are displayed (typography, order, component type). These are implementation decisions encoded in React components.
  - The rendering layer never decides what is true. It decides how truth is presented. The policy layer never decides how truth is presented. It decides which truths are permitted in a given context.

### Personalization vs Audience-Aware Rendering

- [x] How is personalization distinguished from audience-aware rendering? —
  - **Audience-aware rendering** (V1 — implemented by this spec): context is the unit of variation. All people in the same context receive the same projection. Output is deterministic and context-identical. CDN-cacheable per context. No individual data required.
  - **Personalization** (V2 — deferred): the individual is the unit of variation. A current student sees their remaining requirements, their specific advisor, their deadline. Requires identity resolution (session → person entity → institutional relationships). Cannot be CDN-cached. Requires SIS identity integration.
  - The boundary rule: if a rendering decision requires knowing which specific authenticated person is making the request (not just their context), it is personalization. It belongs in V2, after SIS integration. No V1 code may assume personalization is available.  
  
---  
  
## Success Criteria  
  
This spec is complete when:  
  
- [x] Audience context is formally defined — six contexts defined in Rendering Contexts Registry (content-block-schema.md)
- [x] Rendering decision points are identified — targeting via `renderingContexts`; field visibility via Policy; layout via RSC components
- [x] Routing strategy is defined — `(tenant)` public + `(platform)` admin route groups; see ADR-015
- [x] Demo mode is defined — public `(tenant)` route IS demo mode; `?context=` param for audience switching
- [x] Governance and security implications are understood — admin metadata structurally isolated to `(platform)` routes; middleware enforces auth gate; RSC enforces field visibility; `?context=` constrained to non-admin contexts
- [x] The same institutional reality can render appropriately for all supported audiences — one block, multiple `renderingContexts` targets, Policy-driven field visibility per context  
  
---  
  
## Related  
  
- [[ADR-003 — Content Block Architecture]]  
- [[ADR-015 — Rendering Architecture]]
- [[generated-tenant-spec]]  
- [[ADR-009 — Tech Stack]]
- [[content-block-schema]]