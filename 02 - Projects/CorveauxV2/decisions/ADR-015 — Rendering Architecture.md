---
type: decision
domain: corveaux
status: active
date: 2026-06-06
tags: [corveaux, rendering, architecture, role-aware, generated-tenant, next-js]
---

# ADR-015 — Rendering Architecture

## Decision

React Server Components resolve audience context server-side from middleware-injected headers. Public institutional content is served at unambiguous routes without authentication. Administrative context is served at separate auth-gated routes. No client-side context switching. No URL-embedded audience segments. Blocks are pre-filtered by `renderingContexts` in the RSC query; field visibility within a context is governed by Policy evaluation at render time. Demo mode is the public route — no separate demo infrastructure.

---

## Context

The generated tenant must serve the same institutional reality to six distinct audiences (Visitor, Prospective Student, Current Student, Faculty, Staff, Administrator) without duplicating canonical data, compromising the canonical source of truth, or leaking administrative metadata to public routes.

The architecture must satisfy three constraints simultaneously:

1. **Canonical integrity** — The same canonical entity produces all audience projections. Audience context never creates a new canonical record or alters an existing one.
2. **Security boundary** — Administrative metadata (confidence scores, governance gaps, ownership, citations, extraction provenance) must never reach unauthenticated routes, even accidentally.
3. **Performance** — Generated tenant serving public website traffic cannot afford per-request canonical graph traversal for every block on every page. Blocks are stored projections (established in ADR-003 + content-block-schema.md §8).

The existing stack (Next.js 15 App Router, NextAuth, middleware.ts) provides the foundation. This ADR decides how to use it for role-aware rendering.

---

## Options Considered

### Option 1 — Client-Side Context Switching

Single URL for all audiences. After hydration, client reads session context and fetches appropriate field set from an API. The server sends a full block; the client hides fields based on role.

**Rejected.** Server sends administrative fields to the client even if they are not displayed. No true security boundary — a browser inspector reveals hidden metadata. SEO is broken for public content (crawlers see the server-rendered shell, not the audience-specific content). The RSC model is wasted. Adds complexity (client fetch, loading states) without benefit.

---

### Option 2 — Audience-Prefixed URLs

Separate URLs per audience context: `/visitor/programs/[slug]`, `/admin/programs/[slug]`, `/student/programs/[slug]`.

**Rejected as a public-facing pattern.** URL segments that encode audience violate the institutional identity model — a program has one identity, not six. Multiple canonical URLs for the same institutional entity create confusion for search indexing, link sharing, and accreditation documentation. The URL `/programs/associate-of-science-computer-science` is the institutional identity of that program. This concept does not belong to any audience.

Audience-prefixed URLs ARE used for the administrative route group, which is not a public-facing pattern — it is a platform operator tool. See Route Structure below.

---

### Option 3 — RSC + Middleware Context Injection (Chosen)

Middleware resolves audience context from auth state and injects it as a request header. RSC reads the header, queries blocks filtered by `renderingContexts`, and applies Policy-driven field visibility. Public routes operate under `visitor` context without authentication. Admin routes operate under `administrator` context and require authentication.

**Chosen.** The security boundary is enforced at the server — admin metadata never reaches the public route group. Public routes are deterministic per-context, CDN-cacheable. RSC handles data fetching with full access to the canonical DB. The canonical model is untouched by rendering decisions. No audience-encoding in public URLs.

---

## Architecture

### Route Groups

Two App Router route groups. Route groups use parentheses — they do not appear in URLs.

```
src/app/
  (tenant)/                      # Public routes — no auth required for visitor context
    programs/
      page.tsx                   # Program directory
      [slug]/
        page.tsx                 # Program detail — visitor + prospective_student context
    courses/
      page.tsx
      [slug]/page.tsx
    departments/
      page.tsx
      [slug]/page.tsx
    services/
      page.tsx
      [slug]/page.tsx
    policies/
      page.tsx
      [slug]/page.tsx
    contacts/
      [slug]/page.tsx
    search/page.tsx
    layout.tsx                   # Tenant shell (nav, footer, institution branding)

  (platform)/                    # Admin routes — auth required
    admin/
      programs/[slug]/page.tsx   # Administrator context — governance, gaps, confidence
      departments/[slug]/page.tsx
      blocks/page.tsx            # Block governance dashboard
      gaps/page.tsx              # Governance gap surface
      ownership/page.tsx         # Ownership assignment
    layout.tsx                   # Platform shell (admin nav, governance tools)

  login/page.tsx                 # Already exists
  layout.tsx                     # Root layout (SessionProvider)
```

**URL mapping:**
```
/programs/associate-of-science-computer-science   → public program detail (visitor context)
/admin/programs/associate-of-science-computer-science  → admin view of same program
/search?q=math                                    → institutional search, visitor context
/admin/gaps                                       → governance gap dashboard
```

The public URL (`/programs/[slug]`) is the institutional identity of the program. The admin URL (`/admin/programs/[slug]`) is a platform operator view of that same institutional entity — a separate route, a separate purpose, never indexed.

---

### Context Resolution

Middleware (`middleware.ts`) handles two responsibilities:

1. **Authentication gate** — redirects unauthenticated requests away from `(platform)` routes. Public `(tenant)` routes do not require authentication.
2. **Audience context injection** — resolves audience context from auth state, injects as `x-audience-context` request header.

```typescript
// middleware.ts — extended
export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const isPlatformRoute = req.nextUrl.pathname.startsWith("/admin");

  if (isPlatformRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  if (isAuthenticated && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  const response = NextResponse.next();

  // Inject resolved audience context
  const context = resolveAudienceContext(req.auth);
  response.headers.set("x-audience-context", context);

  return response;
});
```

Context resolution is deterministic from auth state. For V1, this is a simple mapping from session capabilities to context. Canonical graph resolution (determining context from entity relationships) is deferred to when Corveaux runs Corveaux end-to-end:

```typescript
function resolveAudienceContext(auth: Session["auth"] | null): string {
  if (!auth) return "visitor";
  // V1: session contains role from JWT callback (resolved at sign-in)
  // V2: query canonical graph from session.entraOid → entity → relationships
  return auth.user?.role ?? "visitor";
}
```

The `x-audience-context` header is read in RSC layouts and page components via `headers()` from `next/headers`. It is never sent to the client — it is a server-side request annotation.

---

### Block Query Pattern

RSC queries content blocks filtered by `renderingContexts`. The canonical data layer is never queried per-request for raw primitives in the public rendering path — blocks are the pre-assembled projection.

```typescript
// src/server/content-blocks/queries.ts
import { headers } from "next/headers";
import { db } from "@/lib/tenant-db";

export async function getProgramBlock(slug: string) {
  const context = (await headers()).get("x-audience-context") ?? "visitor";
  const canonicalKey = `program_block:${slug}`;

  const block = await db.contentBlock.findFirst({
    where: {
      canonicalKey,
      status: "PUBLISHED",
      validTo: null,
      // PostgreSQL containment: renderingContexts must include this context
      renderingContexts: { array_contains: context },
    },
  });

  return block ? applyFieldVisibility(block, context) : null;
}
```

Field visibility is applied in `applyFieldVisibility()` — a server-side function that reads the tenant's `rendering_visibility` Policy and strips fields from `block.content` that the given context is not permitted to see. The full block record (with all fields) never reaches the client.

---

### Field Visibility via Policy

The `rendering_visibility` Policy record defines which `content` fields are visible per rendering context. It is a tenant-level Policy (Corveaux governs the type; the institution governs the values).

```typescript
// Policy record example (policyType: "rendering_visibility", blockType: "program_block")
{
  rules: {
    visitor: ["programType", "degreeType", "description", "outcomes", "departmentName", "contactName"],
    prospective_student: ["programType", "degreeType", "description", "outcomes", "departmentName", "contactName", "contactEmail"],
    administrator: ["*"],  // all fields; plus governance metadata from block base
  }
}
```

`applyFieldVisibility()` reads this Policy at render time and returns only the permitted fields from `block.content`. The canonical `block` record (with all fields) is never serialized to the client.

This is the correct division established in ADR-003:
- `renderingContexts` = **targeting** (should this block appear in this context at all?)
- Policy `rendering_visibility` = **field visibility** (within this context, which fields from the block's content are shown?)

---

### Demo Mode

**Demo mode is the public `(tenant)` route group.**

No separate demo infrastructure. No demo tokens. No special-case logic.

An unauthenticated visitor to `/programs/associate-of-science-computer-science` receives the visitor context projection of the institutional reality. This IS the demo. The institution's content is live, accurate, and publicly accessible — exactly what it would be in production.

For demonstrating specific audience perspectives (showing a prospect "here's what a current student sees"):

A scoped `?context=` query parameter unlocks additional audience projections on public routes for demonstration purposes. It is:
- Read in RSC only
- Constrained to non-administrative contexts: `visitor`, `prospective_student`, `current_student`
- Ignored if the requested context includes `administrator`, `staff`, or `faculty` — these require authentication
- Not persisted in session or cookies

```typescript
// In page.tsx (tenant route)
const searchParams = await props.searchParams;
const demoContext = ["visitor", "prospective_student", "current_student"]
  .find(c => c === searchParams.context);
const resolvedContext = demoContext ?? audienceContextFromHeader;
```

This lets a sales demo show audience switching in the browser without requiring the prospect to create an account, while administratordata remains auth-gated without exception.

---

### Personalization vs Audience-Aware Rendering

These are distinct concepts with distinct implementation paths. Confusing them leads to architectural drift.

**Audience-aware rendering (V1 — this ADR):**
- Context is the unit of variation: all visitors see the same visitor projection of a program
- Context resolves from auth state (role/capabilities)
- Output is deterministic and context-identical for all people in the same context
- No individual data involved
- CDN-cacheable per context

**Personalization (V2 — deferred):**
- The individual is the unit of variation: a current student sees their remaining requirements, their specific advisor, their deadline
- Requires identity resolution: session → person entity → institutional relationships (enrollment, advisor assignment, course history)
- Output differs per person even within the same context
- Not CDN-cacheable
- Requires institutional SIS integration (Banner → canonical person entity link)

V1 implements audience-aware rendering only. Personalization is architecturally possible (the canonical model supports it — `relationship` records can link person entities to programs, sections, advisors) but requires SIS identity integration before it can be rendered. No V1 code may assume personalization is available or build infrastructure for it prematurely.

The boundary: if a rendering decision requires knowing which specific person is authenticated (not just their context), it is personalization. Defer it.

---

## Minimum Viable Institutional Model (Day 60)

The generated tenant is viable when a buyer can navigate it and recognize their institution. This requires:

**Tier 1 — Required for viable demo:**
- All ProgramBlocks (PUBLISHED, all 132 for SLCC)
- DepartmentBlocks for departments that own programs (derived from program extraction)
- CourseBlocks for required courses appearing in program requirements
- Institutional search across all Tier 1 blocks

**Tier 2 — Required for complete demo:**
- ServiceBlocks (financial aid, advising, student services — from website crawl)
- ContactBlocks (deans, advisors, department contacts)
- PolicyBlocks (academic policies from catalog)
- Administrator governance view (gaps, confidence, ownership map)

**Tier 3 — Deferred to production adoption:**
- Personalized student views (requires SIS integration)
- Faculty/Staff contexts (requires directory integration)
- Location blocks (requires facilities data)
- Bidirectional sync with legacy systems

**Generation order:** Programs → Departments → Courses → Services → Contacts → Policies

---

## Governance Gap Surfacing

Governance gaps are not a separate data entity. They are a computed query result rendered in the administrator context.

A governance gap exists when any of the following is true for a block:
- `ownerEntityId IS NULL` — unowned
- `status IN ('DRAFT', 'REVIEW')` and `generatedAt < (now - staleness_threshold)` — stale and unreviewed
- `confidenceScore < 0.70` — low confidence extraction
- Multiple ExtractionObservations for the same canonical fact with different values (source conflict)

The administrator route (`/admin/programs/[slug]`) surfaces this alongside the block content. The gaps layer is a rendering projection of governance metadata — not a parallel data structure.

The `/admin/gaps` route surfaces institution-wide gap summary: total blocks unowned, total in REVIEW, total below confidence threshold, top gaps by entity type. This is a DB aggregate query, not a separate table.

---

## Rationale

**RSC-first** because: blocks are stored projections, not dynamically assembled; RSC reads them from DB with context-appropriate field visibility applied server-side; the client receives only what it should render; the canonical layer is never traversed per request in the public path.

**Two route groups (not one URL for all contexts)** because: the security boundary between public and administrative metadata must be enforced at the route level, not at the rendering level. A single URL attempting to serve both visitor and administrator contexts cannot reliably enforce that boundary — it requires perfect field-stripping on every render path. Separate routes enforce the boundary structurally.

**Middleware injects context header** because: RSC has no access to `req.auth` directly in App Router — auth state lives in the middleware layer. The header pattern is the Next.js-sanctioned method for passing middleware-resolved data to RSC. It keeps context resolution out of each page component.

**Demo mode is the public route** because: a separate demo infrastructure (tokens, mock auth, demo-specific routes) would be special-case logic that doesn't survive production. The public route is already the "demo" — it is the visitor projection of real institutional reality. There is no cleaner demo than showing the institution live.

**Policy-driven field visibility (not schema-driven)** because: adding a new audience context should not require a schema migration. Policies are data; the block schema is fixed. Field visibility rules change as institutional governance evolves — they belong in the Policy layer, where they can be updated without code deployment.

---

## Stakeholders

- Builder (Travis Hornbuckle)

---

## Consequences

- `middleware.ts` requires extension: audience context injection and selective auth gating (platform routes always gated; tenant routes optionally accessible without auth)
- Session JWT callback must resolve and cache audience context at sign-in time (V1) or resolve from canonical graph on each request (V2)
- Block query helpers must accept audience context parameter and apply `renderingContexts` containment filter
- `applyFieldVisibility()` server function must read rendering_visibility Policy and strip content fields accordingly — enforced as a required step in all RSC block queries
- `?context=` demo param is constrained to non-admin contexts — enforcement is in RSC, not middleware
- The canonical layer is never queried in public rendering paths for raw primitives; blocks are always the data source for rendering
- Personalization deferred until SIS identity integration is architected
- Admin routes under `/admin/` are excluded from sitemap and robots.txt

---

## Related

- [[ADR-003 — Content Block Architecture]]
- [[ADR-008 — Generated Tenant Lifecycle]]
- [[ADR-009 — Tech Stack]]
- [[ADR-012 — Canonical Schema Architecture]]
- [[content-block-schema]]
- [[generated-tenant-spec]]
- [[role-aware-rendering-spec]]
