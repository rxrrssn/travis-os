---
type: session
project: corveaux-v2
session: 39
date: 2026-06-11
tags: [corveaux, mirror, builder, snapshots, history, r2, easy-wins]
---

# Corveaux V2 - Session 39 — Snapshot-on-Save Page History

Short "easy wins" pass (user: "are there any easy wins you can take care of?"). Picked the S38 known edge named as the cheap fix: **a bad builder/WYSIWYG save overwrote `TenantPage.mirrorHtml` with no way back**. (Originally two local commits `006b4e5`/`f439e71`; both were soft-reset into the working tree at the founder's "one large commit" direction and shipped inside the Session 40 sprint commit **`8fc6828`**.)

## What shipped

- **`src/lib/page-snapshots.ts`** — snapshot/list/get against the tenant's `{slug}-data-{env}` R2 bucket under `snapshots/pages/{pageSlug}/{timestamp}.html`. Snapshots store the page-of-record form (canon islands + shared components already stripped), so a restore is a plain `mirrorHtml` write. Keys sort lexicographically = chronologically. No retention cap yet.
- **Save hook** (the single POST in `admin/live/[slug]/route.ts` — both the GrapesJS builder and the WYSIWYG editor funnel through it): before any overwrite, the prior document is snapshotted — the page AND any shared-component definition about to change. Snapshot precedes write, so no write ever happens without its snapshot. Skipped when content is unchanged.
- **History + restore UI** at `/t/{tenant}/admin/builder/{slug}/history`: list with timestamps/sizes, raw preview (served as-is; islands/components empty by design), and Restore — which snapshots the current document first, so **restore is itself undoable**. Linked from the builder top bar and a History button in the live-editor bar (built via `location.pathname` in JS because the chrome's `<base href>` hijacks plain anchors — same trap S38 hit with the save fetch).
- **Failure posture — degrade loudly, never block**: a snapshot failure does not abort the save (an operator's edit must not be lost to an R2 outage); both editors show **"saved — history snapshot FAILED"** in amber, the response carries `snapshotError`, server logs the error. Honors [[feedback_no_silent_fails]] without making the safety net a new failure mode on the working surface.

## Found while verifying, fixed same session: the app-side R2 credential split (`f439e71`)

A live round-trip test hit **AccessDenied on `slcc-data-development`**. The bucket exists (5,547 objects; the slcc dev worker binds and writes it constantly) — the app's `.env` **S3 keypair** (`R2_ACCESS_KEY_ID`, era 2026-06-06) predates the per-tenant `{slug}-data-{env}` buckets (2026-06-09) and can't reach them. **Founder called the fix live: "I think its using the cloudflare api key, not the r2 key"** — confirmed: `CLOUDFLARE_API_TOKEN` (the credential wrangler/provisioning already use) does R2 object put/list/get/delete via the Cloudflare REST API on those buckets.

- New **`src/lib/r2-objects.ts`**: dual-backend object access — Cloudflare REST API when `CLOUDFLARE_API_TOKEN` is set (preferred), S3 keypair fallback. `tenant-media.ts` and `page-snapshots.ts` now route through it.
- This **lights up snapshot history** AND **fixes the latent media-upload break** for non-corveaux tenants — no dashboard work needed.
- **The S3 keypair is NOT dead** (founder asked): verified alive against its original bucket (`corveaux-tenant-artifacts`). It stays, deliberately — it backs `crawl-storage.ts` bulk I/O, where the REST API's ~1,200 req/5 min rate limit is the wrong tool for 3,000-page crawl runs. REST for operator-paced tenant-bucket ops, S3 for bulk crawl cache.
- Verified end-to-end through the real lib: write → list → read-back → missing-key → delete, all green against `slcc-data-development` (`scripts/_verify-page-snapshots.ts`, committed, self-cleaning).

## Also cleared: the standing dev-worker redeploy gap (S36/S37)

User authorized headless control mid-session. Deployed both dev tenant workers locally — `slcc-development` (version `ea2a528b`) and `corveaux-development` (version `70ff45c9`) — so the S36 verdict/alias/authority worker code and S38 reconstruct/capture code are now live in dev. The "redeploy before next dev reconstruct" standing note is closed.

## Verification

- `tsc --noEmit`, `eslint`, `npm run build` all clean; the three new routes register (`…/history`, `…/history/view`).
- Live R2 round-trip green through the shipped code path (above).

## Close-out

Both commits were folded into the Session 40 sprint commit `8fc6828` (see [[Corveaux V2 - Session 40 — The Sprint]]); push remains the founder's action.

## Related

- [[Corveaux V2 - Session 38 — The Mirror Product]]
- [[feedback_no_silent_fails]]
