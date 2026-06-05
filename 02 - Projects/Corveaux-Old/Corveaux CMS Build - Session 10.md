---
type: session-note
domain: corveaux
status: complete
date: 2026-05-27
tags:
  - cms
  - homepage
  - branding
  - content-model
  - seed-data
  - session-log
---

# Corveaux CMS Build - Session 10

## What Was Built

Built the actual Corveaux marketing homepage through the CMS block architecture, using `https://www.corveaux.app` as the source template while adapting the presentation to the established warm ivory, graphite, and brass Corveaux application palette.

The root homepage remains database-driven. No homepage-specific JSX was added to `src/app/page.tsx`.

### CMS Homepage Composition

The seeded INTERNAL tenant homepage now publishes eleven ordered canonical blocks:

1. `HERO` - Institutional SaaS positioning, primary contact action, and services action
2. `SECTION_HEADER` - continuity and institutional trust statement
3. `SECTION_HEADER` - anchored Platform introduction
4. `FEATURE_GRID` - student engagement, workflow automation, and operational intelligence
5. `PULLQUOTE` - Corveaux institutional continuity statement
6. `SECTION_HEADER` - anchored Services introduction
7. `SERVICE_GRID` - six hosted software and implementation offerings
8. `SECTION_HEADER` - anchored Customer Terms introduction
9. `LINK_GRID` - privacy, terms, refunds, delivery, cancellation, and customer-service policy paths
10. `SECTION_HEADER` - anchored Contact introduction
11. `LINK_GRID` - customer service, Delaware business address, website, and entity details

The seeded site navigation now targets `Platform`, `Services`, `Policies`, and `Contact` anchors. Tenant/site naming and homepage metadata now represent Corveaux rather than the earlier Corveaux University demo content.

## Architectural Decisions

- Preserved the Session 8 architecture: Corveaux LLC is the `INTERNAL` tenant and the public site renders through the same CMS/page/block pipeline as tenant websites.
- Kept homepage content in `prisma/seed.ts` as canonical CMS fixture data rather than hardcoding marketing sections in a route component.
- Extended reusable block content rather than creating homepage-only components:
  - `HERO` supports an optional eyebrow.
  - `SECTION_HEADER` supports an optional eyebrow and anchor ID for content-driven navigation.
  - `SERVICE_GRID` items support an optional title in addition to a badge and description.
- Made homepage page-block seeding deterministic by replacing homepage placements with the canonical ordered composition each time the seed runs.
- Linked policy cards to currently published policy pages on `www.corveaux.app`; those pages can later be migrated into CMS-managed local routes.

## Files Changed

- `prisma/seed.ts` - Corveaux tenant/site presentation, navigation, metadata, canonical homepage blocks, and ordered placements.
- `src/types/content.ts` - optional eyebrow/anchor/service title fields.
- `src/lib/blocks.ts` - empty-content defaults for expanded block fields.
- `src/components/admin/BlockEditForm.tsx` - CMS editing controls for the new fields.
- `src/components/blocks/BlockRenderer.tsx` - premium responsive public rendering, anchors, eyebrow presentation, and titled service cards.
- `src/components/platform/PublicHeader.tsx` - expanded branded navigation layout and spacing.
- `src/components/platform/PlatformLayout.tsx` - graphite Corveaux public footer treatment.

## Validation

- `npx tsc --noEmit` - passed.
- `npx prisma db seed` - passed; local homepage contains the eleven ordered CMS blocks.
- `npm run build` - passed.

The existing Next.js warning that `middleware.ts` is deprecated in favor of `proxy.ts` remains outstanding and was not introduced by this work.

## Follow-Up Recommendations

- Import the published policy pages into CMS-managed Corveaux pages so all public content is administered through the platform.
- Add a richer hero composition option if the branded mark/card arrangement from the static marketing site should be reproduced exactly in the CMS.
- Address the `middleware.ts` to `proxy.ts` transition once the NextAuth routing approach is confirmed.
- Continue with RBAC enforcement so CMS ownership and tenant roles are authorization controls rather than informational metadata.

## Related

[[Corveaux]]
[[Corveaux GTM Strategy]]
[[Corveaux Data Portability]]
[[Corveaux Regulatory Surface]]
[[Corveaux CMS Build - Session 8]]
[[Corveaux CMS Build - Session 9]]
