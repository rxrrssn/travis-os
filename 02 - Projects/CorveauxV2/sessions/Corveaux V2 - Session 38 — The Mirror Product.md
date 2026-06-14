---
type: session
project: corveaux-v2
session: 38
date: 2026-06-11
tags: [corveaux, mirror, builder, wysiwyg, components, capture-doctrine, omni-cms, commit]
---

# Corveaux V2 - Session 38 — The Mirror Product

An evening of rapid founder-driven iteration (~15:00–18:00, Founder at the keyboard testing every piece live) that built an entire product surface: **the generated tenant can now BE the institution's website** — their exact front end, served and edited by Corveaux. Committed as **`f9c7aba`** (29 files, +2,448) after the founder validated every layer.

## The arc (each step was a founder reaction to the previous one)

1. **"I literally want to rip 2-3 pages... look EXACTLY like it does"** → mirror pages: `TenantPage.mirrorHtml` holds the full captured document; `/t/{tenant}/m/{slug}` serves it verbatim with a per-page `<base>` for assets. Pixel-identical by construction.
2. **"the scrape went really fast... we didn't really get any content"** → diagnosis confirmed: website crawl capped at 500 pages AND the capturer extracted Omni CMS chrome (the "outdated browser" IE-conditional banner became hero copy; avg 1.7 sections/page). Task #34 created. The 2,160 Acalog preview-shell TenantPages also surfaced (= #28 evidence).
3. **"the omni clones are fantastic. I want the front end to LOOK like this, but be served by my backend"** → chrome tier: the captured page splits at its main-content seam into a reusable chrome template + content slot; canon-backed content renders inside. CMS-agnostic seam ladder verified against Omni (SLCC), WordPress-clean (utah.edu `<main class="uu-main">`), WordPress-soup (ufl.edu Visual Composer — derive from interior pages).
4. **"the http NEVER actually renders right"** → root cause: the page builder was text-only (rich-text = pre-wrap plain text) and capture flattened markup. Fix: `html` section type, sanitize-html server-side (structure/classes kept, execution stripped, data: URIs for images only).
5. **"you edit inside the actual rendered page... WYSIWYG"** → whole-page contentEditable editor (`/admin/live/{slug}`) with link-edit popovers; the chrome's own scripts stripped in edit mode (they fought contentEditable — "i cant type anywhere").
6. **"a REAL webpage builder - not some half rate clone"** → **GrapesJS** mounted on the mirror document (`/admin/builder/{slug}`): drag-drop blocks (sections/columns/text/image/video/docs), style+layer managers, captured site CSS inside an isolated canvas iframe, Corveaux-gold skin. Founder: **"I LOVE IT... WAY better"** than the section builder.
7. **"how do you pick a template?"** → every mirror-captured page IS a template: "New from Template" picker → full-copy page → builder.
8. **"make some components entities... updated once, consistent everywhere"** → shared projection components: `<corveaux-component data-ref>` markers + single `_component-{ref}` definitions; **editing a component's contents on any page writes back to the definition on save**. slcc header/footer componentized across all five pages. (Named correctly: shared projection components, not canonical Entities — but canon islands nest inside them.)
9. **"anytime someone types \\ ... a dropdown with a list of entities"** → the backslash entity picker: live canonical-entity search dropdown in the builder, arrow/enter/click inserts a pre-rendered canon island at the caret.
10. **"this is how I want every Website page to get ripped. content intact."** → CAPTURE DOCTRINE: `page.reconstruct` now mints mirror-grade pages for website sources (full document Phase A, intact sanitized content section Phase B; catalog sources excluded via manifest `sourceType`). Worker bundle dry-run verified.
11. **Demo polish:** placeholder images (generated dimension-preserving SVG data-URIs replace the institution's own media — content region only, chrome art stays); serve-time internal-link rewriting (the `<base>` was sending navigation to slcc.edu — founder caught it; 96 links on home now stay in-mirror); test page cleaned by provenance.

## Doctrine highlights

- **Canon islands** (`corveaux-block data-key`): locked in every editor, EMPTIED at save, re-rendered from the canonical model on every serve. Facts never persist as prose. Round-trip verified by script.
- **Shared components**: same lifecycle, one definition, edit-anywhere-update-everywhere.
- The storage format is plain HTML + markers — **the editor (GrapesJS) is swappable**; the model is ours.
- Editing trust = platform operator for now; #29 (governed editing) becomes load-bearing before any institutional user touches the builder.

## State at close

- Commits `f9c7aba` (the product, 29 files +2,448), `a2c908a`+`49bd37e` (Windows→Linux lock-file sync — npm refuses to record other-platform optional subtrees; CI npm ci failed twice and MY DEPLOY WATCHER LIED about it by swallowing exit codes — watchers now check actual run conclusions), `cf35f61` (componentizer staging target + chrome-component expansion in the fallback path; also fixes the hollow staging chrome derived from an already-componentized dev donor).
- **STAGING IS LIVE end to end**: `staging.corveaux.app/t/slcc/m/home` verified — 200, both shared components expanded, zero missing, 96 in-mirror links, placeholders intact. Pages ripped + componentized on the staging branch; chrome rebuilt there.
- Dev demo live: `/t/slcc/m/{home,academics,future,policies,admissions}`, builder + template picker + `\` picker + components all working on :3000.
- **Next clone candidate (founder asked, fingerprinted live): Casper College** — WordPress 6.9.4 confirmed + Acalog confirmed (76 markers), small, directory URLs; proves CMS-agnosticism with the pipeline reused as-is. Runner-up Westminster (SLC-local; "Catalog Redirect" title suggests Acalog behind a hop — probe next session). Utah Tech subdomains rejected for now: `pageSlugFromUrl` is path-based → cross-subdomain slug collisions; chrome varies per subdomain.
- Founder's stated gate: **demo must look and feel good before buyer conversations** — the remaining gap is #34 (estate-wide mirror-grade recapture: raise crawl caps, junk exclusions, worker deploy, re-reconstruct) so every internal link lands on a rich page, not text soup.
- Known edges: ~~no page-version history (a bad save overwrites — snapshot-on-save is the cheap fix)~~ shipped in [[Corveaux V2 - Session 39 — Snapshot-on-Save Page History]] (inert until the app R2 token is rescoped), image upload to tenant media not yet wired in the builder, video = YouTube only, GrapesJS is a backbone-era dependency (accepted; format is ours).

## Coda: root serving (`1e9a0b6`)

Founder: "/t/slug/m/home should just be served at /t/slug." Middleware now rewrites public tenant paths URL-preservingly onto the mirror route for tenants in `MIRROR_ROOT_TENANTS` (deployment config, same pattern as `ROOT_TENANT_SLUG`): **`/t/slcc` IS the SLCC homepage**, paths flatten like the Compositor's slugs (`/future/index.aspx` → `future`), reserved segments (admin/m/p/search + canon collections) keep their React routes, and the domain-root tenant flow applies the same mapping. Posture: root requires `PUBLISHED` (five pages published dev+staging, home flagged homepage); `/m/` stays the operator draft preview; internal links emit clean root URLs (95/96 on home; the `policies` page yields to the policies collection by design). This is the cutover serving architecture — at a real cutover the institution's domain maps to the tenant and the same rewrite serves their site. Deploy hiccup: first attempt failed on transient Cloudflare API auth (10001); rerun green. **Verified live: `staging.corveaux.app/t/slcc` → 200, serving the mirror.**

## Related

- [[Corveaux V2 - Session 37 — The Hardening Run]]
- [[ADR-023 — Page Reconstruction and Single-Source Page Binding]]
- [[Corveaux V2]]
