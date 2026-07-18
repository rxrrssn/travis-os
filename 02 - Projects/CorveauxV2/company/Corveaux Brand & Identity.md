---
type: concept
domain: corveaux
status: active
date: 2026-07-15
tags: [corveaux, brand, identity, naming]
---

# Corveaux Brand & Identity

Corveaux is branded as an institutional systems company, not a higher-ed startup. Every identity decision optimizes for authority, continuity, and permanence over playful SaaS energy — the deliberate reference points are airport wayfinding, university press, aerospace mission software, and firms like Herman Miller, Linear, Vitra, and Notion. The elegance is only the surface layer; the real meaning is intelligent institutional infrastructure — continuity, orchestration, memory, guidance, invisible operational support. That framing is the throughline that ties the wordmark, color, typography, social presence, and even the merch back to the platform philosophy.

## Naming journey and why Corveaux won

The name history (Vetra → Corvux → Corveaux) is recorded in [[Corveaux]]; this note captures the reasoning, not the sequence. The early exploration (still under the Vetra codename) ran through three directions — Academic/Futuristic (Veyra, Axiom, Noma), System/Intelligence (Orin, Kyn, Sera), and Elevated Higher-Ed (Halcyon, Arc, Lumen) — plus later shortlist entries like Meridian, Keystone, and Continuum. None survived because they were either saturated (Axiom, Arc), too generic, or too "startup" to sound like they run an institution.

Once the corvid/raven root took hold, the finalist round was a set of `-eaux` variants weighed against Corveaux:

| Candidate | Read | Why it lost to Corveaux |
|---|---|---|
| **Corvaux** | KOR-voh | Phonetically cleaner and briefly judged the strongest refinement, but the handle/domain came back **unavailable** |
| **Valeaux** | best-balanced, but drifted off the corvid root |
| **Aureaux** | most modern/premium, but reads more SaaS than institutional |
| **Vantreaux** | infrastructure energy, slightly too long |
| **Corneaux** | most "legacy institution," but too surname-ish |

**Corveaux won because it carries the strongest emotional identity, cadence, and institutional feel** — it sounds intelligent, archival, enduring, and operationally calm, exactly matching the platform vision. The decision was explicitly to **stop mutating the name**: Corveaux is the anchor brand, and expansion happens through domains and sub-brands rather than a "perfect startup domain" hunt.

**Pronunciation:** cor-VOH / KOR-voh (phonetic *kor-VOH*). Corveaux carries a small pronunciation ambiguity (kor-VO / kor-VOH / kor-VOX / kor-vee-oh) that the cleaner Corvaux would have avoided — accepted as a worthwhile tradeoff for the richer name.

**Meaning / symbolism:** rooted in the corvid (raven). Ravens historically symbolize knowledge, memory, communication, guidance, observation, and continuity — which map directly onto institutional memory, orchestration, lifecycle management, knowledge systems, and student journeys. The identity is deliberately *not* "French raven luxury software"; the raven is thematic substrate, not aesthetic. The iconography lives in a corvid / crescent / seal motif rather than a literal bird.

## Brand split: Corveaux vs CRVX

A deliberate two-tier identity:

- **Corveaux** — the public, human-facing brand (vision, culture, platform, people).
- **CRVX** — the platform/system identity (infrastructure, automation, services, engineering, IAM, machine identities).

This split is both an architecture and a branding decision. Internal ID scheme: **CVX-XXXX**. Product namespace: **CRVX**.

## Domains

Primary and system domains (corveaux.app / crvx.app) are recorded in [[Corveaux]]. What's durable beyond that:

- **corveaux.app** is the canonical public/apex brand surface; **crvx.app** is reserved for system, automation, and machine-identity use.
- A branded short-link strategy is intended off the CRVX identity (no Bit.ly — the branded short URL already exists).
- The `.ux` play (`corvea.ux`) was explored and liked because `.ux` subtly reinforces systems/experience while keeping the word intact, but `corveaux.app` remained the lead. Other reserved/considered forms: corveaux.io, corveaux.co, getcorveaux.com, corveauxhq.com. Future product surfaces (e.g. corveauxstudentengagement.com) are treated as ecosystem entrypoints hanging off the anchor brand.

## Wordmark and logo direction

The onyx/gold/serif brand applied to auth and admin surfaces is noted in [[Corveaux]]; the specific lockup and mark decisions:

- **Primary lockup (Option A — premium/institutional):** flat gold/silver logo mark + serif **CORVEAUX** wordmark + a small gold sans tagline. This was chosen over the wide-spaced-sans variant (Option B) because the serif reads as more expensive and distinctive. One system is used everywhere — a recurring correction was killing mismatches where a sans background wordmark fought a serif card wordmark on the same screen.
- **The wordmark "Corveaux" is set in Instrument Serif** (Travis's explicit correction: Instrument Serif is the *logo* typography, so the name itself must render in it — not the ring/label font).
- **Seal / crest system** is a core brand device, not decoration. Variants to maintain:
  - **Formal Seal** — monochrome, emboss-friendly, for contracts, cover pages, MSA packets, executive decks.
  - **Digital Seal** — subtle gradients allowed, for splash screens, loading states, motion.
  - **Departmental Seals** — same seal structure, different office line (e.g. `CORVEAUX / OFFICE OF INSTITUTIONAL CONTINUITY`, `CORVEAUX / OFFICE OF INTELLIGENCE`) to project hierarchy and legitimacy.
  - **Minimal Seal** — ring + X mark + CORVEAUX, stripped down for app launch screens, watermarks, login pages, favicons.
- Design rules: keep it **thin** — precision, elegance, controlled geometry, generous spacing. Never chunky, medieval, or overbuilt. Avoid bright yellow gold, glossy gradients, and fake luxury; the target is "institutional premium," not "luxury nightclub."
- Avatars must survive at 32px; favicon uses the square flat mark / minimal seal.

## Typography

Two pairings operate in parallel — one for the brand/seal system, one for web and storefront surfaces.

**Brand / logo / seal system**
- **Instrument Serif** — primary. Wordmark, mottos, formal document usage ("human authority").
- **Suisse Intl** — secondary. Ring text, labels, metadata, structural/operational language ("system authority").

**Web + storefront (Shopify)**
- **Heading:** Instrument Serif. **Body / Subheading / Accent:** Inter.
- Heading scale in use: H1 64px / tight / -2%, H2 52px / -2%, H3 36px / -1%, H4 26px, with subheadings uppercase, wide letter-spacing at small sizes.
- Standing correction: the site uses **serif for large institutional headings and Inter-style sans for body/UI** — swap any theme preset that has these reversed.

**Deep systems / telemetry surfaces (earlier dark direction)**
- Sans candidates considered: Inter, Geist, Söhne, Suisse Intl, IBM Plex Sans (**Inter** is the adopted body/UI face).
- Monospace for metrics, IDs, timestamps, telemetry: IBM Plex Mono, JetBrains Mono, or Geist Mono — used selectively to make the platform feel operational and precise.

## Color system

The palette evolved from a near-black "aerospace/systems intelligence" direction into a softer institutional-premium scheme of ivory, onyx/charcoal, and brushed gold. The current application palette is canonical; the metallic values govern the physical mark and seals.

**Current application / web UI palette (corveaux.app) — canonical**

| Token | Hex |
|---|---|
| Primary / Accent (brushed gold) | `#B68D57` |
| Navigation Background (charcoal) | `#1E1E1B` |
| Navigation Text | `#F5F1E8` |
| Page Background (ivory) | `#F7F4EE` |
| Surface / Card | `#FFFFFF` |
| Heading Text | `#181818` |
| Body Text (softer than pure black) | `#4B4B47` |
| Alternate accent — enterprise/darker gold | `#9F7642` |
| Alternate accent — modern SaaS gold | `#C59A5C` |

These are wired as theme variables (`--t-primary`, `--t-nav-bg`, `--t-nav-text`, `--t-bg`, `--t-surface`, `--t-heading`, `--t-body`) so tenant, role, and platform theming reuse the same tokens — the platform (INTERNAL tenant) dogfoods the exact primitives tenants use, with no separate platform-branding config.

**Metallic mark / seal palette (logo, crest, physical goods)**

| Role | Hex | Notes |
|---|---|---|
| Silver | `#CDC6CC` | Travis-confirmed. Gradient build: `#E5E3E7` → `#CDC6CC` → `#A9A3AA` — engineered/architectural, not bright tech silver |
| Gold (seal) | `#D4AF37` | muted, warm, institutional; brushed sections, low contrast |
| Black (not pure) | `#0A0A0A` (alt `#111111`) | charcoal undertones, subtle grain |

**Earlier "systems intelligence" direction (superseded for public/UI, still informs deep/dark surfaces)**
- Accent gold `#C89B3C` (the brushed gold used for early Stripe branding), background `#090B0F`, dark surface `#14181F`, text `#F5F4F1`.
- A parallel "institutional systems" example set: background `#0B0D10`, surface `#12161B`, elevated `#1A2027`, border `#2A313B`, primary text `#F3F5F7`, secondary text `#9AA4B2`, accent orange `#D97706`, accent bright `#F59E0B`. This orange-accented, near-black scheme was softened into the ivory/charcoal/gold palette above; the orange is not part of the current brand.

Note the three golds are surface-specific, not a conflict: `#C89B3C` was the early dark-UI accent, `#D4AF37` is the seal/metallic gold, and `#B68D57` is the current UI accent.

## Social handles

`corveaux` was taken on Instagram, so the domain-echo handle was adopted; `corveaux` was secured clean on LinkedIn (a legitimacy win, since institutions/vendors/investors search there first).

| Surface | Handle |
|---|---|
| LinkedIn (company) | `/corveaux` (secured) |
| Instagram | `@corveaux.app` |
| X / Twitter | `corveauxapp` (or `corveauxhq`) |
| GitHub | `corveaux` |
| YouTube | `@corveaux` |
| TikTok | `@corveaux.app` |
| Threads | `@corveaux.app` |
| Bluesky | `@corveaux.app` (verified via `_atproto.corveaux.app` TXT record) |
| Product Hunt | `Corveaux` |

Avatar: the stacked mark, transparent background, dark charcoal icon, no small text (must read at 32px). Bio line: "Unified systems for higher education. Identity · engagement · operations · success. corveaux.app".

## Email and identity conventions

Social and communication accounts are treated as critical infrastructure owned by the company, not individuals — tied to role mailboxes on `@corveaux.app` (e.g. `social@`, `brand@`, `linkedin@`, `support@corveaux.app`) and delegated through the identity provider. Machine/system and IAM identities live on **crvx.app**. This mirrors the platform's own person-vs-role and Corveaux-vs-CRVX separation.

## Storefront and merch

Corveaux runs a **Shopify** storefront that extends the brand into physical goods, deliberately positioned as "objects produced by the organization" rather than merch/swag. Storefront aesthetic: gold CTA on black canvas, generous whitespace, **Instrument Serif** product titles for an editorial/institutional feel. Order/notification emails are branded (logo, colors, fonts, social, support) with `support@corveaux.app` as the support address; Shopify Liquid templates handle the transactional layer.

**Collections**
- **Corveaux Apparel Collection** — "built for operators, architects, and institutions in motion… institutional infrastructure, translated into apparel."
- **Corveaux Objects** — mugs, notebooks, collectibles, desk/workspace items; "operational artifacts… the visual language of the system in everyday operational spaces."

**Products defined so far**
- **Embroidered Corveaux Polo** — cotton-poly pique, mark on left chest + left sleeve; `$38.98`; sizes S–5XL; colors Black, Navy, Red, Steel Grey, Stone, Cool Grey, White.
- **Corveaux Logo Teddy Bear** — plush, mark on a white tee with black bow, ~7" seated; framed as a collectible brand artifact / welcome-kit gift.
- **Corveaux Ceramic Mug** — white ceramic, gloss finish, mark; 11oz and 15oz.

**Copy discipline:** rewrite all print-on-demand/POD auto-copy. Tone is institutional design firm — restrained, architectural, understated. Reference set: Herman Miller, Linear, Vitra, Notion, university-press store, architectural catalog. Explicitly avoid Etsy / Redbubble / TikTok-merch-drop / "cute ecommerce" / hype language. That tonal consistency is what makes the brand read as believable.

## Related
- [[Corveaux V2]]
- [[Corveaux]]
- [[One Voice One Brutus]]
