What---
type: operations
status: draft
date: 2026-06-13
owner: Travis Hornbuckle
tags: [hecvat, soc2, ferpa, privacy, vendor-assessment]
source: HECVAT416.xlsx
---

# HECVAT 4.16 — Draft Responses

Working answers for the HECVAT 4.16 a buyer institution will send. Transcribe the
**Answer** into the workbook's response column and the **Comment** into Additional
Information.

> **Read this first — honesty rule.** Answer for what is **in place today**, not what
> we intend. Items marked **Planned** are roadmap and must NOT be answered "Yes" in
> the workbook. Over-stating a control is a contractual and legal exposure with a
> public institution. Corveaux's real strength is its *architecture* (AI privacy,
> tenant isolation, encryption, SSO, audit). Its real gap is *formal process/attestation*
> (no SOC 2 report yet, solo operator, pre-GA). Lead with the first; be candid about
> the second — most institutions will accept a strong architecture + a credible
> roadmap from an early vendor.

Legend: **Y** = yes, in place · **N** = no · **Planned** = roadmap, not yet · **N/A** = not applicable · **Partial** = partly in place.

---

## Organization

| Question | Answer | Comment |
|---|---|---|
| BCP tested annually* | Planned | Core data + compute run on managed, highly-available infrastructure with automated backups; a formal, owner-assigned, annually-tested BCP is roadmap. |
| DRP tested annually* | Planned | Same — provider-level redundancy exists; a documented/tested DRP is roadmap. |
| SSAE-18 / SOC 2 audit undergone | N | Not yet undergone; targeting SOC 2 Type 2. Subprocessors (Cloudflare/Neon) hold their own SOC 2. |
| Conform to a security framework (NIST CSF/CIS/ISO) | Partial | Aligning to NIST CSF / CIS controls; not certified. |
| Provide architecture + data-flow diagrams | Y | Available; see [[Security Overview and SOC 2 Control Mapping]] + ADR set. |
| Data privacy policy | Y (draft) | [[Data Handling and Retention Policy]]. |
| Security assessments of third parties* | Partial | Subprocessor inventory maintained ([[Subprocessors and DPAs]]); formal assessments are roadmap. |
| Contractual language governing third-party data access* | Planned | DPAs in progress with each subprocessor. |
| Contracts address breach liability* | Planned | Part of the DPA execution. |
| Third-party management strategy* | Partial | Inventory + change discipline; formalizing. |
| Notify institution of major environment changes* | Y | Change-notification commitment; status page carries incidents. |
| System configuration management (gold images)* | Y | Infrastructure-as-config (Workers/Wrangler), reproducible deploys. |
| Documented change management | Y | Branch → PR → CI (tsc/lint/build, GitGuardian) → squash-merge on green; no direct commits in practice. (GitHub branch protection requires a paid plan for a private repo, so the control is the documented workflow + CI, not a server-side rule.) |
| Change mgmt incl. authorization/impact/test/validation | Y | CI gates + review before production. |
| Verify third-party libs supported each change | Partial | Dependency audit in place; not a formal gate yet. |
| Critical-patch policy | Partial | Dependency updates + audit; formal patch SLA is roadmap. |
| Documented patch management process* | Planned | — |
| Comply with institutional privacy/data policies* | Y | By design; institution is the data controller. |
| Subject to institution's regional laws* | Y | US-based; subject to applicable US state/federal law. |
| Encryption using open standards | Y | TLS; standard algorithms. |
| Documented SDLC | Partial | PR/CI lifecycle; lightweight, not a formal SDLC doc. |
| Background screening of employees | N/A → Planned | Solo operator today; will implement before any hire. |
| New-employee agreements/policy review | Planned | Same. |
| Documented information security policy | Y (draft) | This operations set. |
| Security designed into product lifecycle | Y | Capability-based authority, tenant isolation, PII boundary are architectural. |
| Comply with breach-notification laws | Y | Committed; see [[Incident Response Runbook]]. |
| Security awareness program / mandatory training | Planned | Solo; formal program before staffing. |
| Privileged-account access review | Partial | Operator access is minimal + audited; formal periodic review is roadmap. |
| Internal audit processes | Partial | Audit logging is strong; formal internal-audit program is roadmap. |

## Product (authentication, data, encryption)

| Question | Answer | Comment |
|---|---|---|
| SSO for user AND admin* | Partial | OIDC / Microsoft Entra SSO supported, per-tenant; confirm both user+admin coverage per deployment. |
| Local auth fallback / password complexity* | N/A | SSO-only; Corveaux stores no passwords. |
| Password complexity limits / reset* | N/A | No local passwords. |
| InCommon / eduGAIN federation* | Planned | Not yet; important for higher-ed — on the roadmap. |
| Hard-coded passwords* | N | Verified — zero hardcoded secrets (CI secret scanning + scan). |
| Passwords stored in plaintext* | N | No password storage at all (SSO). |
| Audit logs incl. login/logout/actions/source IP* | Y | Structured audit events incl. access decisions + IP. |
| Log retention/protection/customer access* | Partial | Retention ~7yr for audit; customer-facing access is roadmap. See [[Data Handling and Retention Policy]]. |
| SAML2 / OIDC / CAS support | Partial | OIDC yes; SAML2/CAS planned. |
| Transport of sensitive data encrypted* | Y | TLS everywhere. |
| Storage of sensitive data encrypted (at rest)* | Y | Provider-managed at-rest encryption; per-field encryption for education records is the planned next control. |
| FIPS 140-2/3 cryptographic modules* | Partial/confirm | Inherited from Cloudflare/Neon; confirm FIPS-validated modules with providers. |
| Data available at contract completion* | Y | Per-tenant DB; export on request. |
| Ownership of data/inputs/outputs/metadata retained* | Y | Institution retains ownership. |
| Backups leave data zone* | Confirm | Provider-managed backups (Neon/R2); confirm region. |
| Data returned/deleted at contract end | Y | Export + delete the tenant DB + artifacts. |
| Institution can extract backup | Y | Export supported. |
| Backups encrypted | Y | Provider-managed encryption. |
| Single-tenant separation* | **Y (strong)** | **Each institution has its own database** — not multi-tenant rows; physical/logical separation by design. |
| 90 days to extract data on bankruptcy/closure | Y | Commit in contract. |
| Cryptographic key management process | Partial | Provider-managed keys today; per-tenant app-level keys planned for education records. |
| Staff access to institutional data | Y (minimal, audited) | Break-glass operator access only, every cross-tenant access audited. |

## Infrastructure

| Question | Answer | Comment |
|---|---|---|
| RBAC/ABAC/PBAC for institutional accounts* | Y | Capability-based authority (ADR-022); roles → capabilities. |
| Web application firewall* | Y | Cloudflare WAF. |
| Only supported OS/software/libraries* | Y | Managed runtime; current dependencies. |
| Require location/GPS data* | N | No. |
| Separation of duties (security/system/user)* | Partial | Capability model supports it; solo operator today. |
| Static code analysis / SAST pre-release* | Partial | CI runs type-check + lint + secret scanning; dedicated SAST is roadmap. |
| Software testing processes* | Partial | CI gates; formal test suite expanding. |
| RBAC for internal staff | Y | Same capability model + platform.operator break-glass. |
| Data input validation + errors | Y | Schema validation (Zod) across inputs. |
| Software supply-chain management | Partial | Dependency audit + lockfile + secret scan; formal SBOM is roadmap. |
| Developers trained in secure coding | Partial | Practitioner-level; no formal program (solo). |
| Mobile app from trusted source | N/A | No mobile app (a companion app is future). |
| SOC 2 Type 2 for hosting environment | Y (provider) | Cloudflare/Neon hold SOC 2; Corveaux's own is pending. |
| Store data in institution's region | Confirm | Provider regions; confirm per deployment. |
| 24×7 staffed data centers / physical barriers / power/cooling redundancy / ISP redundancy | Inherited | All inherited from Cloudflare's data centers — answer per their SOC 2; Corveaux operates no physical DC. |
| MFA for administrative accounts | Y | Via the IdP (Entra) MFA. |
| Cloud provider hardening / pre-hardened images | Y | Managed platform defaults + WAF. |
| Cloud provider has access to encryption keys | Y (today) | Provider-managed keys; the planned per-tenant app-level encryption removes provider read access for education records. |
| SPI firewall / IDS / IPS / NGPT* | Inherited | Cloudflare network protections; host-level IDS/IPS is provider-managed. |
| Audit logs for network/firewall/IDS changes* | Inherited | Provider-managed. |
| Formal incident response plan | Y (draft) | [[Incident Response Runbook]]. |
| Internal/external IR team; 24×7 response | Partial | Solo operator; 24×7 is roadmap. |
| Authenticated vuln scans pre-release* | Partial | Dependency audit + internal security scan (2026-06-13); authenticated scanning is roadmap. |
| Provide scan results to institution* | Y | Willing to share. |
| Allow institution to pen-test* | Y | At a mutually agreed time. |
| Third-party security assessment in last year | N | Planned. |
| Scan for OWASP web vulns (SQLi/XSS/CSRF) | Partial | Reviewed in the internal scan (no SQLi — parameterized; XSS-safe rendering); continuous scanning is roadmap. |

## AI  *(our strongest section — answer confidently)*

| Question | Answer | Comment |
|---|---|---|
| Solution has AI features* | Y | An institution-facing assistant answering from the institution's published knowledge. |
| Uses ML / LLM* | Y | Uses a third-party LLM (Anthropic Claude) via API; **we do not train or fine-tune any model.** |
| AI risk model (NIST AI RMF etc.)* | Partial | Designing to NIST AI RMF principles; not formally certified. |
| AI features disable-able by tenant/user* | **Y** | The assistant is a per-tenant module; an institution can disable it entirely. |
| Staff completed responsible-AI training* | Planned | Solo; formal training before staffing. |
| Business rules to protect sensitive data from ingestion | **Y** | **Personal data is redacted before any model call** and restored only in the reply; the model sees tokens, never PII. |
| AI risk practices posted/implemented* | Partial | Documented here; formal public posting is roadmap. |
| Identified/measured AI risks* | Partial | Closed-world + PII boundary + citations are the core mitigations; formal risk register is roadmap. |
| AI disable-able on incident* / re-enable* | **Y / Y** | Per-tenant config flag — instant disable and re-enable. |
| Documented processes for AI negative impacts (RMF) | Partial | Closed-world + escalation-to-human; formal RMF mapping roadmap. |
| Remove/unlearn sensitive data from model on request* | **N/A** | We don't train a model on institutional data, and PII never enters the model — so there's nothing ingested to unlearn. |
| User input used to influence/train the model* | **N** | Visitor input is never used to train or fine-tune; closed-world answering only. |
| Logging of AI features (user, date, action)* | Y | Each turn is an immutable event; conversations are auditable. |
| Validate user inputs | Y | Input is length-bounded, schema-checked, prompt-injection-guarded (closed-world prompt ignores embedded instructions); PII redacted. |
| Mitigate AI supply-chain risk | Partial | Single, reputable model vendor; pinned API; subprocessor tracking. |
| Separate ML training data from solution data* | **N/A** | No training — institutional data is never used as training data. |
| Authenticate/verify model feedback* | Partial | Answers are grounded only in retrieved, cited canon; outputs are constrained to sources. |

## Privacy

| Question | Answer | Comment |
|---|---|---|
| AI features | Y | See AI tab. |
| Process PHI/HIPAA | N | No health data. |
| Process/store credit-card (PCI) | N | Billing via Stripe; Corveaux never handles card numbers. |
| Process FERPA-related data | Y | Will process education-record-adjacent data; mitigations: PII boundary, closed-world, internal-by-default People, tenant isolation. See [[Data Handling and Retention Policy]]. |
| GDPR / PIPL data | N (today) | US institutions, US data; will sign SCCs if an EEA need arises. |
| State-law (CCPA) data | Possible | Supported by the same handling/retention posture. |
| User-provided data may contain regulated info | Y | Visitors may type personal info in chat — which is why PII is redacted before the model and screened out of public canon. |
| Personal-data breach in last 3 yrs* | N | None. |
| Privacy-policy violations in 36 mo | N | None. |
| SOC 2 includes Privacy principle | N | No SOC 2 yet. |
| Conform to a privacy framework (NIST Privacy/ISO 27701) | Partial | Privacy-by-design in architecture; not certified. |
| Contractual third-party privacy obligations* | Planned | Via DPAs. |
| Privacy impact assessments of third parties | Planned | — |
| Change mgmt includes privacy review | Partial | Add a privacy check to the PR template (roadmap). |
| Collect demographic info* | N | Not collected by design. |
| Genetic/biometric/behaviometric info* | N | None. |
| Combine institutional data with other personal data* | N | No data combination/enrichment. |
| Data crosses US borders | N | US-based processing. |
| Capture device info (IP/MAC) | Y (IP only) | A conversation's IP is captured silently for the audit log only; never surfaced. Retention window to be set + enforced. |
| Web tracking (pixels/cookies) | Minimal | Functional localStorage for chat continuity; no third-party tracking pixels. |
| Staff access to institutional data | Y (minimal, audited) | Break-glass only, audited. |
| Documented privacy management process | Y (draft) | [[Data Handling and Retention Policy]]. |
| Privacy-by-design in lifecycle | **Y** | PII boundary + closed-world + internal-by-default are designed in, not bolted on. |
| Comply with breach-notification laws | Y | — |
| Comply with institution's privacy policies | Y | Institution is controller. |
| Subject to institution's regional law | Y | US. |
| Privacy awareness/training program* + mandatory + AI ethics | Planned | Solo; before staffing. |
| Fully automated decision-making (no human) | N | The assistant answers questions; consequential actions route to a human (escalation). No automated decisions about individuals. |
| Process for managing automated processing + data-subject requests | Partial | Human-in-the-loop; formal DSR process is roadmap. |
| Policy for sharing with law enforcement / share without warrant* | Planned / **N** | No data shared without valid legal process; written policy is roadmap. |
| Data in EEA / DPO / GDPR SCCs / data in China | N / N / Will sign / N | US scope; designate a DPO if EEA scope arises. |
| Data Privacy Impact Assessment performed | Planned | — |
| End-user privacy notice | Partial | The chat shows a "don't share personal info" notice; a full published privacy notice is roadmap. |
| Consent for collection/use/disclosure | Partial | — |
| Collect only for identified purpose | Y | Purpose-limited. |
| Documented list of personal data maintained | Y (draft) | [[Data Handling and Retention Policy]] data-categories table. |
| Retain only as long as necessary + dispose | Partial | Windows defined; automated enforcement (sweeper) is roadmap. |
| Disclose to third parties only per notice/consent | Y | No onward disclosure. |
| Protect personal info against unauthorized access | Y | Access control + isolation + audit. |
| Data-subject access/review/update | Partial | Operator-mediated today; self-service DSR is roadmap. |
| Procedures for privacy complaints/disputes | Planned | — |
| Anonymize/de-identify/mask personal data | Y (at the model boundary) | PII tokenized before the model; public canon screened for PII. |
| Certify stop-processing requests | Planned | — |
| Service uses AI to process institutional data | Y | Yes — to retrieve + phrase answers from published canon. |
| Institutional data retained in AI processing* | **N** | No retention in the model; PII never reaches it. |
| Agreements with AI subprocessors re: data + AI* | Planned | DPA with the model vendor; confirm no-training terms. |
| Data processed by a subprocessor that also uses AI | N | Only the model vendor; isolated to inference. |
| AI limited to licensed commercial enterprise AI | Y | Commercial API (Anthropic), not a public/free tier. |
| Institutional data used by shared AI services | N | No shared/free AI services. |
| Safeguards vs unintended AI queries/processing* | Y | Closed-world + PII redaction + per-tenant data isolation. |

## IT Accessibility (summary)
- **VPAT / WCAG 2.2 AA conformance: In progress.** The generated sites and the assistant
  widget are built on semantic HTML and themeable contrast, and the compliance hub runs a
  baseline automated check (lang / title / image-alt heuristics). A formal accessibility
  audit + VPAT (full external axe/pa11y scan) has not been completed — note the in-worker
  probe cannot scan the app's own origin, so real measurement needs an external CI scan.
  Commit to a VPAT before a public institution go-live (accessibility is often a hard
  procurement gate in higher ed).

## Case-Specific
- Complete only the conditional sections the institution flags as required based on
  the data types in scope (e.g., if no PHI/PCI, those branches are N/A).

---

## The honest summary for a buyer conversation
**Strengths to lead with:** personal data never reaches the AI; the AI is never
trained on anyone's data; each institution's data is fully isolated in its own
database; encryption in transit; SSO; capability-based access with audited
break-glass; closed-world answers with citations.

**Gaps to disclose plainly (with a roadmap):** no SOC 2 report yet; no formal
BCP/DRP/IR testing cadence; no third-party pen test; no security-awareness/responsible-AI
training program (solo operator, pre-GA); SAML/InCommon and a VPAT are roadmap;
DPAs with subprocessors in progress.

## Open items to convert "Planned" → "Yes"
- ☐ Execute subprocessor DPAs ([[Subprocessors and DPAs]]).
- ☐ Begin SOC 2 Type 2 readiness; collect subprocessor SOC 2 reports.
- ☐ Write + test BCP / DRP / IR; set a pen-test cadence.
- ☐ Implement the retention sweeper (conversations + IP).
- ☐ Per-tenant field-level encryption for education records (its own ADR).
- ☐ VPAT / WCAG audit before a public go-live.
- ☐ SAML2 + InCommon/eduGAIN federation on the auth roadmap.

## Related
- [[Subprocessors and DPAs]] · [[Data Handling and Retention Policy]] · [[Security Overview and SOC 2 Control Mapping]] · [[Incident Response Runbook]] · [[Environment and Secrets Inventory]]
