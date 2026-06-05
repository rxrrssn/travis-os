---
type: session-note
domain: corveaux
status: complete
date: 2026-05-27
tags:
  - people-core
  - organizations
  - canonical-data
  - tenant-model
  - prisma
  - session-log
---

# Corveaux CMS Build - Session 11

## What Was Built

Built the tenant-scoped Corveaux People Core: the canonical people and organizations layer that future modules should reference instead of owning or duplicating person data.

Core implementation principle preserved:

> Modules do not own people. Modules own operational context around people.

## Data Model

Added Prisma models for:

- `Person`
- `Organization`
- `PersonOrganizationRelationship`
- `PersonPersonRelationship`
- `PersonLifecycleState`
- `PersonContactMethod`
- `PersonIdentifier`
- `PersonTag`
- `PersonNote`
- `PersonAuditLog`
- `OrganizationNote`
- `OrganizationAuditLog`

All records are tenant-scoped with `tenantId`. People are not globally shared across tenants. Corveaux staff are seeded only in the INTERNAL Corveaux tenant. Cross-tenant visibility remains a future RBAC/access-grant concern, not a person-copying pattern.

Migration created and applied:

- `prisma/migrations/20260527192613_people_core/migration.sql`

## Routes Added

Tenant-scoped application routes:

- `/t/[slug]/people`
- `/t/[slug]/people/new`
- `/t/[slug]/people/[personId]`
- `/t/[slug]/organizations`
- `/t/[slug]/organizations/[organizationId]`

Person detail tabs:

- Overview
- Relationships
- Lifecycle
- Contact Methods
- Notes
- Audit Log

Organization detail tabs:

- Overview
- People
- Child Organizations
- Notes
- Audit Log

Tenant admin sidebar now links to People and Organizations.

## Follow-Up Added: Profile and Organization Images

Added picture support for People Core records:

- `Person.profileImageUrl`
- `Organization.logoUrl`

People and organization forms now include upload controls that reuse the existing authenticated `/api/upload` pipeline. The uploaded file URL is stored on the canonical person or organization record. List pages render thumbnails when present and fall back to initials when no image is set.

Migration created and applied:

- `prisma/migrations/20260527194917_people_org_images/migration.sql`

## Follow-Up Added: User-Aware Topbar, Verbose Audit, Identifier Settings

The admin topbar now resolves the current logged-in user instead of showing hardcoded admin labels:

- Uses the authenticated `User` record as the fallback.
- If a tenant-scoped `Person` record matches the logged-in user's active email contact method, the topbar displays that person's `displayName`, `profileImageUrl`, and active organization relationship title.
- This preserves the tenant boundary: Corveaux staff appear as people only in the INTERNAL tenant unless a tenant has its own person record.

Person and organization update audit logs are now field-level. Update actions store readable before/after summaries and structured `metadata.changes`, rather than only recording that an update occurred.

Added tenant-configurable identifier type settings:

- New `TenantIdentifierType` model.
- Tenant settings page includes identifier type configuration for people and organizations.
- Identifier settings include entity type, key, label, description, prefix, format hint, required flag, system flag, and status.
- Existing `PersonIdentifier.type` values remain string keys that correspond to tenant-configured identifier types.

Migration created and applied:

- `prisma/migrations/20260527200143_tenant_identifier_types/migration.sql`

## Server Actions

Added server actions for:

- `createPerson`
- `updatePerson`
- `createOrganization`
- `updateOrganization`
- `addPersonOrganizationRelationship`
- `addPersonPersonRelationship`
- `addContactMethod`
- `addNote`
- `changeLifecycleState`

Actions resolve records through the tenant slug and constrain writes by tenant ID.

## Seed Data

Seed now creates:

- Corveaux INTERNAL tenant people/org fixtures
- Demo institution tenant: `corveaux-demo-college`
- Person examples: student, employee, faculty, advisor, applicant, vendor contact, Corveaux staff
- Organization examples: institution, campus, division, department, office, external partner
- Contact methods, lifecycle states, tags, notes, audit entries, and person/org relationships

Local seeded counts after validation:

- `corveaux`: 1 person, 3 organizations
- `corveaux-demo-college`: 6 people, 6 organizations

## Files Changed

- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma/migrations/20260527192613_people_core/migration.sql`
- `prisma/migrations/20260527194917_people_org_images/migration.sql`
- `prisma/migrations/20260527200143_tenant_identifier_types/migration.sql`
- `src/lib/current-user.ts`
- `src/app/admin/layout.tsx`
- `src/app/t/[slug]/admin/layout.tsx`
- `src/app/t/[slug]/admin/settings/actions.ts`
- `src/app/t/[slug]/admin/settings/page.tsx`
- `src/app/t/[slug]/admin/settings/IdentifierTypeSettings.tsx`
- `src/app/t/[slug]/people/actions.ts`
- `src/app/t/[slug]/people/components.tsx`
- `src/app/t/[slug]/people/ImageUploadField.tsx`
- `src/app/t/[slug]/people/page.tsx`
- `src/app/t/[slug]/people/new/page.tsx`
- `src/app/t/[slug]/people/[personId]/page.tsx`
- `src/app/t/[slug]/organizations/page.tsx`
- `src/app/t/[slug]/organizations/[organizationId]/page.tsx`
- `src/components/shell/TenantAdminShell.tsx`

Note: the working tree also still contains the prior Session 10 homepage/CMS changes.

## Validation

Ran successfully:

- `npx prisma generate`
- `npx prisma db seed`
- `npx tsc --noEmit`
- `npm run build`

The existing Next.js `middleware.ts` deprecation warning remains.

## Follow-Up Recommendations

- Add RBAC/access-grant enforcement before treating People Core as protected production data.
- Add delete/archive flows rather than hard deletes for people and organizations.
- Add identifier/contact editing after creation, including primary contact conflict handling in the UI.
- Update future modules to reference `Person.id` and `Organization.id` rather than storing duplicate names, emails, phones, or departments.
- Consider moving these routes under the authenticated tenant admin shell if People Core should not be reachable from unauthenticated tenant public paths.

## Related

[[Corveaux]]
[[RBAC]]
[[Corveaux CMS Build - Session 10]]
[[Corveaux CMS Build - Session 9]]
[[Corveaux Regulatory Surface]]

## Session 11 Follow-Up - Tenant Admin Relocation

Date: 2026-05-27

Related: [[Corveaux]], [[Corveaux CMS Build - Session 11]], [[RBAC]]

### What Changed

- Relocated People Core routes into the tenant admin route tree.
- Updated the tenant admin sidebar to link to `/t/[tenantSlug]/admin/people` and `/t/[tenantSlug]/admin/organizations`.
- Removed the standalone People Core mini-navigation so the pages use the existing tenant admin sidebar and topbar.
- Updated People and Organization links, tabs, redirects, and revalidation paths to use the tenant admin URLs.
- Cleaned the Travis Hornbuckle seeded person profile by removing the seeded `demo@corveaux.app` contact method and deleting seeded organization relationships for that person.

### Files Changed

- `src/components/shell/TenantAdminShell.tsx`
- `src/app/t/[slug]/admin/people/actions.ts`
- `src/app/t/[slug]/admin/people/components.tsx`
- `src/app/t/[slug]/admin/people/page.tsx`
- `src/app/t/[slug]/admin/people/new/page.tsx`
- `src/app/t/[slug]/admin/people/[personId]/page.tsx`
- `src/app/t/[slug]/admin/organizations/page.tsx`
- `src/app/t/[slug]/admin/organizations/[organizationId]/page.tsx`
- `prisma/seed.ts`

### Decisions Made

- People and Organizations are canonical tenant administration surfaces, so they now live under tenant admin instead of top-level tenant routes.
- The existing tenant admin shell owns layout, sidebar, and topbar presentation for these pages.
- The seeded Travis person remains minimal so the profile can be completed manually inside the platform.

### Validation

- Ran `npx prisma db seed` to apply the Travis seed cleanup locally.
- Ran `npx tsc --noEmit` successfully after clearing stale Next route metadata.
- Ran `npm run build` successfully.
- Restarted the controlled dev server after Turbopack cache corruption caused by stale `.next` state.
- Verified `/t/corveaux/admin/people` and `/t/corveaux/admin/organizations` on the dev server.

### Next Steps

- Add explicit redirects from old `/t/[slug]/people` and `/t/[slug]/organizations` paths only if backward compatibility becomes necessary.
- Add RBAC checks around People Core admin routes before production use.

## Session 11 Follow-Up - Corveaux Tenant Content Reset

Date: 2026-05-27

Related: [[Corveaux]], [[Corveaux CMS Build - Session 11]], [[RBAC]]

### What Changed

Deleted CMS/public-content data scoped only to the `corveaux` tenant in the local development database.

Deleted counts:

- Sites: 3
- Pages: 33
- Content blocks: 44
- Page block placements: 45
- Knowledge articles: 4
- Knowledge categories: 4
- Knowledge tags: 6
- Article tag joins: 8
- Content review cycles: 1

### Files Changed

- No source files were changed for this reset.
- Local database content changed in `prisma/dev.db`.

### Decisions Made

- The reset targeted only CMS/public-content records for tenant slug `corveaux`.
- People Core, Organizations, identifier settings, tenant membership, tenant record, roles, and users were intentionally left intact.

### Validation

Post-reset counts for `corveaux` CMS/public content:

- Sites: 0
- Pages: 0
- Content blocks: 0
- Knowledge articles: 0
- Knowledge categories: 0
- Knowledge tags: 0
- Content review cycles: 0

Post-reset People Core checks:

- People: 1
- Organizations: 5
- Identifier types: 3
- Tenant members: 1

### Next Steps

- Rebuild the `corveaux` tenant CMS surface from inside tenant admin when ready.
- Avoid running `prisma db seed` unless the seeded homepage/KB content should be recreated.

## Session 11 Follow-Up - Password Reset and People Core Admin Controls

Date: 2026-05-27

Related: [[Corveaux]], [[Corveaux CMS Build - Session 11]], [[RBAC]]

### What Changed

- Added a password reset token model and migration.
- Added `/forgot-password` for requesting a reset link.
- Added `/reset-password?token=...` for setting a new password.
- Added a `Forgot your password?` link to the login form.
- Added an organization delete action and a danger-zone delete option on organization detail pages.
- Added editable Person tags on the person overview tab, including add and remove actions.
- Removed organization fixture creation from the seed.
- Added seed cleanup for the old known organization fixture slugs.
- Cleaned known seeded organizations from the current local database without running the full seed.

### Files Changed

- `prisma/schema.prisma`
- `prisma/migrations/20260527203443_password_reset_tokens/migration.sql`
- `prisma/seed.ts`
- `src/lib/password-reset.ts`
- `src/app/forgot-password/actions.ts`
- `src/app/forgot-password/ForgotPasswordForm.tsx`
- `src/app/forgot-password/page.tsx`
- `src/app/reset-password/actions.ts`
- `src/app/reset-password/ResetPasswordForm.tsx`
- `src/app/reset-password/page.tsx`
- `src/app/login/LoginForm.tsx`
- `src/app/t/[slug]/admin/people/actions.ts`
- `src/app/t/[slug]/admin/people/[personId]/page.tsx`
- `src/app/t/[slug]/admin/organizations/[organizationId]/page.tsx`

### Decisions Made

- Password reset tokens are stored hashed, expire after one hour, and are marked used after reset.
- In development, the reset request page displays the generated reset URL because no mailer exists yet.
- In production, reset URL display is suppressed until email delivery is added.
- Organization deletion is tenant-scoped and detaches child organizations before deleting the target organization.
- Seeded organization fixtures were removed so future seed runs do not recreate institution/campus/department/office/partner organizations.
- The full seed was not run after this change because it would recreate CMS content that was intentionally cleared earlier.

### Validation

- Ran `npx prisma migrate dev --name password_reset_tokens`.
- Ran `npx prisma generate`.
- Ran `npx tsc --noEmit` successfully.
- Ran `npm run build` successfully.
- Verified `/forgot-password` and `/reset-password?token=test` return 200 on the dev server.
- Confirmed current local counts after seeded organization cleanup:
  - `corveaux`: 2 organizations, 1 person, 0 sites, 0 pages, 0 content blocks
  - `corveaux-demo-college`: 0 organizations, 6 people

### Next Steps

- Add an email provider before using password reset in production.
- Add a client-side confirmation dialog for destructive organization deletion.
- Add the explicit `PersonUserAccount` link after the password reset flow is accepted.
