---
type: operations
status: draft
date: 2026-06-13
owner: Travis Hornbuckle (Office of Institutional Continuity)
---

# Corveaux — Operating Documents

Operational and compliance documents for Corveaux as a vendor to higher-education
institutions. These support **FERPA**, **SOC 2 Type 2**, and **HECVAT 4** posture.
They are working DRAFTS — items marked ☐ or *(to confirm)* need a human decision,
a signed agreement, or a vendor attestation before they are authoritative.

> These describe how Corveaux *operates and protects institutional data*. They are
> distinct from the architectural record in `../decisions/` (ADRs) and the build
> history in `../sessions/`.

## Index

- [[Subprocessors and DPAs]] — every third party that touches institutional data, what it sees, and DPA status.
- [[Data Handling and Retention Policy]] — data categories, retention windows, deletion, the PII-bypass data flow, and FERPA student rights.
- [[Security Overview and SOC 2 Control Mapping]] — access control, audit logging, encryption, change management, monitoring; mapped to the SOC 2 Trust Services Criteria; current scan findings + remediations.
- [[Incident Response Runbook]] — severity levels, the status page, the watchdog/DLQ, and the response sequence.
- [[Environment and Secrets Inventory]] — every secret/var, where it lives, and the prod-vs-staging key discipline.
- [[Inbound Channel Connection Runbook]] — how to connect Resend inbound email and Twilio SMS safely (signatures, fail-closed).
- [[HECVAT 4.16 — Draft Responses]] — drafted answers to the HECVAT 4.16 a buyer will send, grounded in the docs above; honest about what's in place vs. planned.
- [[Expo App Integration Guide]] — the typed `/api/v1` projection API + OIDC sign-in the companion app is built against.

## How to use

- Review at each onboarding (a new institution will send a HECVAT and likely a DPA).
- Update [[Subprocessors and DPAs]] whenever a provider is added or changed.
- Re-run the security scan and update [[Security Overview and SOC 2 Control Mapping]] each significant release.
- Keep retention windows in [[Data Handling and Retention Policy]] in sync with what the code actually enforces.
