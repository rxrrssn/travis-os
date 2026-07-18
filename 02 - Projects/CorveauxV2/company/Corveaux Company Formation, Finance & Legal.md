---
type: concept
domain: corveaux
status: active
date: 2026-07-15
tags: [corveaux, company, finance, legal, formation]
---

# Corveaux Company Formation, Finance & Legal

The operational record of how Corveaux exists as a legal and financial entity: formation decisions, the conversion path, banking, payments, tax, IP, and the identity-consistency rules that hold it all together. Entity basics already captured elsewhere (Delaware LLC; Vetra -> Corvux -> Corveaux; internal Offices mirroring the product) are not restated here — this note is the concrete formation/finance/legal layer beneath them.

Guiding principle carried through every decision below: **keep the entity clean now so the eventual C-corp conversion and any diligence are mechanical, not a cleanup project.** At this stage that discipline matters far more than the choice of entity form.

---

## Entity Snapshot (canonical facts)

| Field | Value |
|---|---|
| Legal name | **Corveaux, LLC** (comma is part of the legal name; must match IRS CP 575 exactly) |
| Public / operating name | Corveaux |
| Entity type | Single-member Delaware LLC, **disregarded entity / federal pass-through** (Schedule C on Form 1040) |
| Jurisdiction | Delaware |
| Formation date | **2026-05-07** |
| Registered agent | **Legalinc** — 131 Continental Dr, Suite 305, Newark, DE 19713 (New Castle County) |
| EIN | **42-2428047** (working value; entered on A2P/10DLC registration assuming exact CP 575 match) |
| NAICS | **511210 — Software Publishers** (primary); 541511 Custom Computer Programming as fallback |
| Tax/business classification | **Software / SaaS** — explicitly NOT Education, Consulting, or IT Services |
| DE franchise tax | **$300 flat, due June 1 annually; no annual report for LLCs.** First payment **2027-06-01** for tax year 2026 (no proration owed at formation) |
| Owner | Travis Hornbuckle, 100% |

"EdTech" / "higher education technology" is an industry *label* for the website, LinkedIn (Industry = Software Development), and pitch only — never the legal, tax, EIN, or banking category.

---

## Formation Decisions & Rationale

- **Entity form: single-member LLC now, Delaware C-corp later.** An earlier "LLC now, elect S-corp later" framing was **superseded** — the target end state is a Delaware **C-corp**, not S-corp, because that is what institutional contracts and outside capital eventually require.
- **Jurisdiction: Delaware — decided and executed.** An initial recommendation to form in the home state (Utah) to avoid double filings was **reversed**; the entity was actually formed in Delaware for Court of Chancery precedent, investor/acquirer familiarity, and remote formation. Wyoming was floated and not pursued.
- **Delaware is not a tax shield.** No DE sales tax and no DE tax on income earned outside DE, but the LLC still owes federal pass-through reporting, **foreign qualification and local tax where it actually operates**, and multistate SaaS sales-tax nexus obligations. Utah remains the operational-nexus state through Travis's residency.
- **Single entity — holdco / multi-entity deferred.** A parent/opco + IP-licensing structure (and a future Holdings / IP / Realty / Platform split with intercompany shared services) was explicitly **declined for now**; licensing your own brand to yourself early is "paying yourself to use your own name." Revisit only at real traction (~$1M+ revenue). Near-term priority is ownership hygiene, not entity count.
- **Classification locked to Software/SaaS** across bank, tax, vendor, insurance, and accounting. Rejected categories (each creates weird nexus or misrepresents revenue): Educational services, Professional services, Information services, Memberships, Marketplace facilitator, Custom development. Long-term revenue streams still map cleanly — platform subscriptions = SaaS, implementation = professional services, training = educational services — but the primary Stripe/tax category stays SaaS.

### Ownership & equity posture
- Travis holds **100% equity**; early collaborators get **salary + synthetic equity** (profit share, milestone/performance bonuses), not real equity.
- **No handshake or verbal equity promises** — the single biggest cap-table contaminant for a future conversion. Convert someone to true equity only once they are proven foundational.
- Preferred title: **Chief Systems Officer (CSO)**, not CEO/Founder.

---

## LLC -> C-Corp Conversion Path

- **Convert when any of these hit:** first real institutional contracts, outside funding, hiring core employees, equity/options becoming meaningful, or genuine scale. No committed date — it is trigger-based.
- **Mechanism: Delaware statutory conversion** (LLC -> DE C-corp). The filing itself is routine. The hard parts are cap-table cleanup, tax treatment, equity restructuring, and verifying IP assignment — all of which are cheap now and expensive later.
- **Why C-corp:** investors demand Delaware C-corps for standardized stock, preferred shares, clean option grants, predictable governance, and **QSBS**.
- **QSBS timing:** the 5-year holding clock starts when C-corp stock is **issued post-conversion**, not at original LLC formation. Illustrative-only (not committed): 2026 LLC -> 2029 convert -> 2034 QSBS window matures.
- **Keep-it-clean imperatives (do these regardless of form):** separate bank/finances, all contracts/domains/GitHub/cloud/IP under the LLC, clean bookkeeping even pre-revenue, no mixed personal/company money, no ambiguous IP ownership.

---

## Addresses & the Canonical-Identity Problem

The entity legitimately has three distinct address roles. External KYC systems that flatten them into a single "business address" field and string-match it are the recurring friction point.

| Role | Address | Anchored to |
|---|---|---|
| Registered agent / registered office (legal, service of process) | **131 Continental Dr, Suite 305, Newark, DE 19713** (Legalinc, New Castle County) | Certificate/Articles of Formation; Microsoft Teams Phone KYC (forced to match) |
| Operational mailing address (where the business accepts mail) | **1111B S Governors Ave, Suite 90947, Dover, DE 19904** (via **Stable** mail-forwarding) | Mercury bank account; Stripe support/business address |
| Physical / residence | Address tied to Travis's ID / driver's license / tax residency | KYC physical-address fields (RV full-time living = the edge case) |

**Known, deliberate divergence:** Mercury + Stripe + operational mail use the Dover (Governors Ave) address; Microsoft/telecom KYC is anchored to the Newark (Continental Dr) registered-agent address. Flagged to normalize later, not now.

### Source of truth for identity
- **IRS CP 575 (EIN assignment letter) is the canonical name+EIN document.** Legal name must appear everywhere exactly as on CP 575 ("Corveaux, LLC" with the comma). The IRS exact-match matters more than branding. (147C is a replacement letter if CP 575 is lost.)
- **Stamped Articles/Certificate of Formation** is canonical for legal name + registered address, and is what reviewers match against. It certifies the registered-agent address, NOT a headquarters.

### KYC mismatch — resolution (Microsoft Teams Phone)
Business verification failed while email and domain passed, because the KYC profile carried the Dover mailing address while the formation docs certify only the Newark RA address, and Microsoft requires the entered address to exactly match supporting docs *and* "where the company is headquartered." Delaware formation certifies no HQ, so the loop was circular.

**Resolution (a forced compromise, and a reversal of the earlier setup):** set the Microsoft business address to exactly the **registered-agent address (131 Continental Dr, Newark)** character-for-character, re-upload **stamped Articles of Formation + EIN letter**, and stop re-arguing the mailing-vs-legal distinction. Microsoft support confirmed verbatim that exact-match is prioritized over operational accuracy ("even if it is not the actual organizational address"). Using the RA address is a legally valid address for the entity, so it is not misrepresentation. Outcome at time of record: resubmitted, domain re-verified, business verification "in progress" — **final approval was still pending.**

- **DUNS number:** worth obtaining eventually for enterprise/procurement trust, but it will not fix a same-day address mismatch (new-entity data still propagates to the RA address). Not now.
- Document handling lessons: **Cloudflare invoices snapshot at generation and do not retroactively regenerate** after a billing-profile edit, so a personal-name invoice stays personal — use a dashboard screenshot proving domain control instead. **Bank statements do not satisfy government-registration proof categories** even when operationally strongest.

---

## Banking — Mercury

- **Mercury is the single primary operational finance hub** (bank, treasury, cards, ACH/wires). Account **approved and opened** with a **$5 initial deposit** from personal checking. Account holder = **Corveaux, LLC**; Travis is authorized signer.
- **Ramp/Brex/Navan/Expensify explicitly declined at this stage.** Mercury already covers virtual cards, spend controls, approvals, reimbursements, accounting automation, vendor/payee management, and a lite operational GL layer. Adding Ramp would create another sync/reconciliation surface — the exact fragmentation Corveaux exists to avoid. Ramp revisits only at multiple employees + department budgets + procurement controls + audit pressure.
- Mercury onboarding required a **legal address** (RA address accepted; no PO box / CMRA) and a separate **physical address** (RA/virtual not accepted). Stable was kept for mailing/card delivery, steered away from the *legal* field because Mercury screens CMRA/virtual-mailbox classifications.
- Merchant descriptor already live and clean in the banking app: **`CORVEAUX LLC, PAYMENT`**.

### Virtual cards — one per vendor
Decision: **one virtual card per vendor/service**, not a single catch-all card — for blast-radius containment, clean cost attribution, and instant anomaly detection.

| Card | Purpose |
|---|---|
| `VC-INFRA-M365`, `VC-INFRA-CLOUDFLARE`, `VC-PLATFORM-VERCEL`, `VC-COMMS-TWILIO`, `VC-OPS-CANVA` | one per major recurring vendor (own limit, memo/tag, accounting category, merchant-lock if supported) |
| `VC-OPS-GENERAL` | one-offs and trials, low limit |
| `VC-TRAVEL` | later |
| `VC-EMERGENCY` | disabled by default, break-glass only |

Target: **~8-12 cards** (1 shared ops + 1 infra + 1 per major vendor).

---

## Finance Stack & Division of Responsibility

| System | Owns |
|---|---|
| **Mercury** | banking, treasury, cash, virtual cards, vendor/outbound payments |
| **Stripe** | invoices, subscriptions, quotes, payment collection, ACH/card rails, customer billing portal, tax/VAT, dunning, receipts |
| **Xero** | accounting / compliance ledger |
| **Corveaux** (long term) | commercial system of record — generates quote -> contract -> executed agreement -> internal invoice, then pushes to Stripe via API |

- **Accounting: Xero — reversed from an initial QuickBooks Online recommendation** once the Mercury account surfaced **6 months of Xero free** plus Mercury's tighter Xero reconciliation partnership. Travis is QuickBooks-certified and has prior NetSuite experience; NetSuite is deferred to far-future enterprise complexity only.
- **Payments: Stripe** is the customer-facing rail (subscriptions, metered billing, webhooks, Connect). **Square rejected** as a retail/SMB commerce-in-a-box fit; Stripe preferred for being API-first and composable. **Stripe Treasury / embedded finance deferred** until real recurring revenue exists.
- Setup priority order for remaining accounts: GitHub -> Amazon Business -> PostHog -> Sentry -> Resend -> Xero, then Better Stack, Figma, Tailscale, PandaDoc.
- Email/identity separation as a durable rule: **`@corveaux.app` = humans / institutional trust / customer-facing** (e.g. `finance@corveaux.app` owns Mercury + Stripe); **`@crvx.app` = systems / automation / infrastructure** (`svc-*@crvx.app` service identities, `infrastructure@crvx.app` owns Cloudflare/Vercel).

---

## Stripe Setup — Business Info, Tax & Verification

| Stripe field | Value |
|---|---|
| Legal business name | **Corveaux, LLC** (exact CP 575 match) |
| Public name | Corveaux |
| Statement descriptor | **CORVEAUX** (Stripe rule: 5-22 chars) |
| Shortened descriptor | **CORV** (rule: 2-10 chars; product form `CORV*PLATFORM`, `CORV*HOSTING`) |
| Business type | Single-member DE LLC (disregarded entity) |
| EIN / Tax ID | 42-2428047 |
| Support phone | +1 321 430 7547 |
| Support/business address | 1111B S Governors Ave, Suite 90947, Dover, DE 19904 |
| Verification document | **IRS EIN letter (CP 575)** — chosen over the Certificate of Formation because it ties name + EIN + federal registration in one authoritative doc |

- **Stripe Tax product tax category: "Software as a service (SaaS) - business use"** — confirmed correct. Cloud-delivered, multi-tenant, standardized platform; the category's "not customized for a specific buyer" wording does not preclude tenant configuration or paid implementation. (No `txcd` code was recorded — only the named category.)
- **Descriptor progression** settled at CRVX -> CORVX -> **CORV** (final recommendation; not confirmed saved). This makes CORV the third layer of the brand namespace below.
- **Sales tax / nexus — decided to defer.** While pre-revenue with no employees and no sales, operate as Delaware LLC only; do **not** foreign-qualify in Utah or register tax accounts yet. Economic-nexus thresholds (post-Wayfair) are typically ~$100k revenue OR 200 transactions per state and vary; Stripe Tax / Avalara / TaxJar will monitor them. Revisit Utah foreign qualification once revenue/customers/payroll begin.
- **Domain verification:** `corveaux.app` was purchased under Travis's personal account (10-day ICANN transfer lock), then registrant/org/billing/admin contacts updated to **Corveaux, LLC** — sufficient for business-controlled verification.
- **Verification website:** static site on **Cloudflare Pages** (framework preset None, build command `exit 0`, output `/`), with public policy pages (`index/privacy/terms/refunds/delivery/cancellation/contact`). Everything sold is **digital, delivered electronically, no physical shipping**.
- **Policies (decided):** refunds **case-by-case with written approval**, not guaranteed once work has started, approved refunds returned to original method within 5-10 business days; cancellation via **written notice before renewal** to `hello@corveaux.app`, stops future billing, no refund of completed work.
- **Billing portal:** custom domain configured as `pay.crvx.app`, with a standing recommendation (not confirmed applied) to move it to **`billing.corveaux.app`** — billing is a customer-trust surface and belongs to the corveaux.app brand, not the internal crvx.app layer. Header copy: "Manage your Corveaux services." Support email standardized to **`hello@corveaux.app`** (reversed from earlier support@/travis@).

---

## Billing Architecture & API-Billing Strategy

- **Pricing model: enrollment bands** (tier by student count). Live invoice line items include "Implementation (Flat)" and "Corveaux (10,000 - 24,999 Students)"; invoice tagline "One System. One Institution. Every Student."
- **Long-term billing flow: Corveaux is the system of record, Stripe is the collector.** Corveaux generates quote -> contract -> executed agreement -> internal invoice, then pushes to Stripe via API (create/update customer, create invoice items, finalize, send hosted link); Stripe collects; Stripe webhooks report status (sent/paid/failed/refund/renewal/dispute) back to Corveaux. **Business logic never lives in Stripe** — Stripe knows who/how-much/when; Corveaux knows why/which-contract/which-tenant/which-pricing-model. Phase 1 uses Stripe natively until that API layer exists.
- **API-cost strategy — do NOT expose external API/token costs to customers.** Bundle them into subscription tiers; never become "base + AI credits + token packs + connector fees" middleware, which is exactly what Corveaux positions against in higher-ed procurement.

| Treatment | What |
|---|---|
| **Bundled into tiers** (Starter / Professional / Enterprise, by automation depth) | chatbot conversations, advising assistance, KB querying, workflow summarization, ticket drafting |
| **Usage-metered — only cost-explosive items** | bulk SMS campaigns, voice transcription at scale, mass AI document ingestion, mass outbound AI comms, dedicated inference/model hosting, heavy OCR/video, data-lake compute, telephony |
| **Enterprise upsell** | private/institution-trained models, on-prem/hybrid deployment, advanced governance, audit/compliance tooling |

- **"Corveaux Intelligence Layer" abstraction:** never expose provider names (Anthropic/OpenAI/etc.) in-product; internally route across Claude / OpenAI / Gemini / Azure AI / local models by cost, latency, FERPA/compliance, task type, and tenant policy. Treated as a strategic moat.
- **Cost-control model routing:** Haiku/local for ~80-90% of requests (classification, routing, tagging, summarization, extraction); Sonnet selectively (advising, drafting, synthesis); Opus rarely ("a scalpel, not the default"). Biggest cost risk is **agentic loops** — constrain agents, prefer deterministic workflows, use canonical knowledge blocks to cut token volume.
- **Anthropic pricing captured (2026-05-27), per MTok input/output:** Haiku $1 / $5; Sonnet $3 / $15; Opus $5 / $25.
- Internal metering tracks per-tenant AI request counts, tokens, model/provider, cost basis, feature origin, and user/org attribution — surfaced to institutions as **quotas / "institutional capacity"**, never as raw API math. Rate limiting is the billing/quota enforcement mechanism.

---

## Trademark & IP

- **Filing priority (word mark first, filed separately from the design mark):**

| Priority | Mark | Notes |
|---|---|---|
| 1 | **CORVEAUX word mark** (standard character) | highest value; protects the name regardless of font/styling |
| 2 | **X design/logo mark** | geometric X device; upload actual artwork |
| 3 | CRVX | only if used publicly and seriously — short acronyms are collision-prone and harder to defend |
| 4 | Slogans (e.g. "One system. One institution. Every student.") | only if they become core branding; several are too descriptive to defend |

- **Name clearance is the gating first step, before filing or scaling:** search USPTO, the SaaS/EdTech market, and domains/socials; check phonetic equivalents **Corvus / Corveau / Corvo** against the "likelihood of confusion" standard. No specific Nice class numbers were determined — map current-use vs first-launch vs biggest-risk rather than filing everything.
- **IP assignment agreement — recommended, not yet executed.** Formally assign code, branding, domains, documentation, designs, inventions, and trademarks from Travis personally to Corveaux, LLC. **Owning the company does not automatically mean the LLC owns the IP** — it must be assigned/contributed. Also required the moment any outside engineer/designer/contractor touches the platform: invention-assignment clauses, work-for-hire language, NDAs. The highest-value defensible IP is not the logo but the operational architecture, canonical data model, and orchestration methodology — trade-secret territory; software patents are low-value for early SaaS.
- **Logo ownership:** generated via OpenAI (Terms assign output rights to the user, no OpenAI ownership claim). Because purely AI-generated work has limited US copyright, Travis strengthened authorship by vectorizing, cleaning, and standardizing the artwork. For a logo, **trademark protection matters more than copyright.**

### Brand namespace layers (trademark equity concentrates on CORVEAUX)
| Layer | Token | Use |
|---|---|---|
| Institutional / master trademark | **Corveaux** (`corveaux.app`) | public, partner/customer trust, billing portal |
| Systems / infrastructure namespace | **CRVX** (`crvx.app`, `api.crvx.app`) | system notifications, webhooks, status, service identities |
| Billing descriptor | **CORV** | Stripe shortened statement descriptor |

The "Vetra" product-family naming was **abandoned** in favor of unified "Corveaux [Capability]" naming to consolidate trademark equity. Corveaux is both the company and the platform (Salesforce/ServiceNow model). Owned brand assets already establishing common-law rights: domains `corveaux.app` and `crvx.app`, social handles `Corveaux.app` / `corveauxapp`. The internal Offices are organizational constructs and do not need their own trademarks initially.

---

## Company/Payment Maturity Milestones

The sequence at which the entity stopped being a concept and became operational infrastructure: **domains -> identity (Entra/SSO) -> banking (Mercury) -> payment rails (Stripe) -> SSO -> branding.** Getting the "boring" details right (clean ACH/merchant descriptors, a real registered address in banking systems) is the institutional-feel signal that mature companies get right.

---

## Open / Pending Items

- Microsoft Teams Phone **business KYC** — resubmitted against the RA address; final approval was still pending at time of record.
- **C-corp conversion timing** — trigger-based, no committed date; QSBS timeline illustrative only.
- **IP assignment agreement** — recommended, not yet executed.
- **Trademark filings** — clearance search is the prerequisite; no filing date set, no Nice classes selected.
- **Billing portal domain** — `billing.corveaux.app` recommended but `pay.crvx.app` is what is actually configured.
- **Stripe shortened descriptor `CORV`** — final recommendation, not confirmed saved.
- **Utah foreign qualification / sales-tax registration** — deliberately deferred until revenue/customers/payroll begin.
- **EIN 42-2428047** — working value; verify it matches CP 575 exactly before it propagates further.
- **Address normalization** — reconcile the Dover (Mercury/Stripe) vs Newark (telecom KYC) divergence at a calmer time.

---

## Related
- [[Corveaux V2]]
- [[Corveaux]]
- [[Corveaux Brand & Identity]]
