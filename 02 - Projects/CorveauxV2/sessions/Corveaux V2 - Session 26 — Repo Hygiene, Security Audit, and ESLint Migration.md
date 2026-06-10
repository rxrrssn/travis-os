---
type: session
project: corveaux-v2
session: 26
date: 2026-06-10
tags: [corveaux, repo-cleanup, security-audit, eslint, tooling, trigger-dev-removal]
---

# Corveaux V2 - Session 26 — Repo Hygiene, Security Audit, and ESLint Migration

## Focus

A "repo clean — make sure everything is efficient and secure" pass over the
application codebase (`corveauxV2`), followed by getting ahead of the deprecated
`next lint` command and clearing the dead-code backlog it exposed. No schema,
extraction, or feature work — pure hygiene. Three commits on `master`, not pushed.

## Security audit — clean across the board

- `.env` is **not** tracked, never committed to history; `.gitignore` covers all
  env/build artifacts.
- **Zero hardcoded secrets** in source; `.env.example` is all empty placeholders.
- **Zero npm vulnerabilities** (prod deps); no raw SQL (`queryRawUnsafe`/`executeRaw`),
  no `eval`/`new Function`/`child_process`.
- The one `dangerouslySetInnerHTML` (tenant theme CSS in `layout.tsx`) is **properly
  hardened** — `buildThemeCss` runs every value through a strict validator (hex regex,
  char-stripped fonts, `px|rem`-only lengths), so the `<`, `>`, `/` needed for a
  `</style>` breakout are stripped. No XSS. Good defensive code, recorded here so it
  isn't re-flagged later.
- `next.config.ts` has no disabled type/lint checks.

## What changed

**Commit `2bc1a9e` — dead config, lint hygiene, orphaned scripts:**
- Removed 4 dead `*_BACKEND` env selectors from `.env.example` (Trigger.dev-era
  leftovers, read nowhere in the codebase, misleadingly defaulted to `"trigger"`).
- Added the standard `no-unused-vars` `^_` ignore-pattern to `eslint.config.mjs`;
  dropped a dead `getTenantDb` import and marked an unused signature-convention param
  `_operationId`.
- Deleted 5 unreferenced one-off scripts (`_poll-extract-progress`,
  `_retry-failed-program-pages`, `verify-bugs-16-17`, `close-legacy-programs`,
  `reopen-non-slcc-programs`).

**Commit `64c0111` — ESLint CLI migration + dead Trigger.dev script removal:**
- `next lint` is deprecated (removed in Next 16). Migrated `npm run lint` →
  `eslint .` (+ added `lint:fix`). This surfaced that raw ESLint walks the whole repo
  (1281 problems!) where `next lint` silently scoped to `src` — **289 of 290 errors
  were in `.next/` build output**. Added the missing global `ignores` (`.next`,
  `.open-next`, `.wrangler`, `.deployment`, `node_modules`, `src/generated`,
  `next-env.d.ts`) and a Workers-idiom override disabling
  `import/no-anonymous-default-export` for `cloudflare/**`.
- Fixed the genuine warnings the broader scan exposed: two unused Worker `catch`
  bindings (`} catch {`), a dead seed var, dead metrics code.
- **Removed 7 scripts orphaned by the S25 Trigger.dev → Cloudflare migration** —
  `catalog-courses`, `catalog-documents`, `catalog-full`, `catalog-programs`,
  `catalog-programs-pilot`, `run-source-crawl`, `trigger-validate` all imported the
  deleted `src/trigger/*` modules and fail on run. They were invisible to `tsc`
  because `scripts/` is outside the tsconfig `include`. Dropped their 8 dead
  `package.json` commands (`trigger:catalog:*`, `trigger:validate`, `source:crawl`).

## Notes / gotchas

- **`tsc --noEmit` passing is not proof the scripts work.** The 7 broken scripts
  type-checked clean only because `tsconfig.json` excludes `scripts/` (and
  `cloudflare/`, `trigger.config.ts`). Runtime-fatal broken imports hid there for the
  whole gap between S25 and now. Same lesson shape as S25's stale-Prisma-client bug:
  the green check covered a surface that didn't include the actual failure.
- **Implication for the extraction.run port:** deleting those scripts means there is
  no longer any script-level fallback for the old Trigger.dev extraction fan-out. If
  `extraction.run` still needs porting into the Cloudflare Workers flow (the standing
  one-code-gap), it must be built there from scratch — don't expect
  `npm run trigger:catalog:*` to exist. See [[project_trigger_to_workflows_migration]]
  (memory) and [[Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan]].

## State at close

- Commits `2bc1a9e` and `64c0111` on `master` (not pushed — push when ready).
- `npm run lint` (now `eslint .`) and `npx tsc --noEmit` both clean repo-wide.
- No bugs found — `known_bugs` memory remains "None blocking"; zero TODO/FIXME markers
  in source. Bug backlog is genuinely empty.
- Project memory `project_trigger_to_workflows_migration` updated to record the deleted
  entry points and the new lint command.

## Related

- [[Corveaux V2 - Session 25 — Page Builder, Impressionist Branding, and Tenant Footer]]
- [[Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan]]
- [[Corveaux V2]]
