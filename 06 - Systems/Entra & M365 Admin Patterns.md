---
type: system
domain: m365
status: active
date: 2026-07-15
tags: [entra, m365, sharepoint, teams, admin, patterns]
---

# Entra & M365 Admin Patterns

Concrete, reusable admin how-to for the SLCC tenant: identity-driven group provisioning, SharePoint access + audience targeting, deleted-site recovery, the Teams Phone/Audio Conferencing rollout, and governed approval intake. Assume **no elevated tenant access** on this tenant. The whole department layer gets built on top of stable, IT-provided groups plus Team-owner / site-owner rights. IT owns identity and licensing; we own the operational experience, information architecture, and provisioning logic.

---

## The three-layer access model

The single most important mental model. Access is not enforced in one place.

| Layer | Where | Role |
|---|---|---|
| **Identity** | Entra security groups (dynamic where possible) | Defines *who a person is* |
| **Access** | Microsoft 365 Group behind a Team | *Enforces* Team + connected-SharePoint access |
| **Resource** | SharePoint sites, libraries, apps | *Consumes* the permission |

**Entra defines membership; it does not fully apply access.** The last mile (Teams roles, connected SharePoint) is enforced by the M365 Group, so it always needs either a dynamic M365 group or automation to bridge Entra → Team roles.

### Hard rules that break naive designs

- **Teams membership is upstream of SharePoint, not the reverse.** A Team creates one M365 Group; that group owns both Team membership and the SharePoint site. Flow: `Team membership → M365 Group → SharePoint permissions`. Adding people to SharePoint site groups gives file access but **no Team/channel/chat membership**.
- **Nested security groups are not universally honored.** Microsoft warns nested groups do not inherit access assigned to the parent, and SharePoint flags nested SGs as a performance risk. Do not build a `-All` master group and expect nesting to drive SharePoint + Teams + tags everywhere.
- **A security group cannot be the Owners/Members container of a Team.** Adding a group expands to a one-time snapshot; it does not stay in sync. New members are not auto-added, removed members can linger.
- **Dynamic M365 groups define Members only, never Owners.** Owner assignment always needs manual action or automation.
- **You cannot repoint a Team-connected site's built-in Owners/Members groups to your own groups.** Do not replace them — **feed them**.
- **Teams tags / private-channel membership are separate objects** with their own membership; they are not driven by the parent Team's groups automatically.

### Correct pattern

Flat, purpose-built Entra groups as source of truth → automation (or dynamic M365 group) assigns Team roles → SharePoint inherits automatically. Org groups describe people; automation assigns roles; the M365 Group enforces. Keep automation **additive-only** with a protected-owners exception list so manual elevation survives.

---

## Entra dynamic group rules (membership syntax)

Prefer attributes you own over waiting on HR job-title cleanup. `department` alone is too broad here — everyone in the division carries `Contact Center`, so layer a second attribute or a roster.

```text
(user.department -eq "Contact Center")
(user.extensionAttribute1 -eq "CC_LEADERSHIP")
(user.jobTitle -contains "Coach")
(user.department -eq "Contact Center") -and (user.jobTitle -contains "Coach")
```

Flag model (best for control): pick an unused field (`extensionAttribute1`, `employeeType`), define your own taxonomy (`CC_AGENT`, `CC_LEADERSHIP`, `OSC_COACH`, `OSC_LEAD`), and drive groups off it. Bulk-set via PowerShell:

```powershell
Update-MgUser -UserId user@slcc.edu -ExtensionProperty @{extensionAttribute1="OSC_COACH"}
```

**Naming convention (lock in now):** `SG-` = security group, `TEAM-`/`GRP-` = M365 group, `SYS-` prefix or a clear label = "automation owns this, humans don't touch it." Existing set: `SG-ContactCenter-Inbound`, `SG-ContactCenter-Outbound`, `SG-ContactCenter-Leads`, `SG-ContactCenter-Administrators`, `SG-OSC-Coaches`, `SG-OSC-Leads`. Consider adding umbrella (`SG-ContactCenter-All`), content (`SG-KB-Contributors`, `SG-KB-Approvers`), and reporting (`SG-Reporting-Leadership`) groups.

---

## Power Automate as the dynamic-group / role-sync engine

When native dynamic groups aren't available, Power Automate simulates them. This is a **custom identity provisioning engine** — build it to be boringly reliable.

### Source of truth

Reuse the existing **daily DimEmployees Excel roster** (the same table that drives Power BI RLS). Do the classification once in that import flow so RLS and group sync never drift. Add canonical columns:

- `EmployeeEmail` (this is the **UPN** — canonical key)
- `Active`
- `StandardTeam`, `StandardRole`
- `ProvisioningGroup`

This separates **business logic** ("who belongs where," computed in the import) from **execution logic** ("add/remove them," the sync flow). Each sync flow then just filters `ProvisioningGroup = SG-...`.

Classification is an `if()` derived in the append-to-table step, mapping messy titles to standard departments, with email-based overrides for edge cases (put the email override **first**, before title logic):

```text
if(
  or(
    equals(items('Apply_to_each_2')?['jobTitle'],'Coordinator, Online Student Success'),
    equals(items('Apply_to_each_2')?['jobTitle'],'Coordinator, Online Stu Succ')
  ),
  'OSC',
  if(
    contains(
      createArray('Specialist, Contact Center','Program Associate I','Specialist II'),
      items('Apply_to_each_2')?['jobTitle']
    ),
    'CC - IB',
    items('Apply_to_each_2')?['department']
  )
)
```

### Connector reality (matters at build time)

| Need | Connector / action | Note |
|---|---|---|
| List every user in tenant | **MS Graph Groups and Users → List Users** | Premium; often not granted |
| Search users by dept/title | **Office 365 Users → Search for users (V2)** | Search-based, exposes `department`/`jobTitle` |
| Group read/add/remove | **Microsoft Entra ID** | Needs `Group.ReadWrite.All`, `User.ReadWrite.All`, `Directory.ReadWrite.All` |
| Set a Team owner | **Microsoft Teams → Add a member to a team** | Has "Set user as team owner" flag |

If there's no `List users` action, don't manufacture one — drive from the Excel roster instead.

### The compare-two-arrays sync pattern

Never add/remove one row at a time. Build both sides, then diff.

```text
Recurrence (hourly for test, 4–12h prod)
  → Get roster rows / Get group members
  → Build TargetUsers  = who SHOULD be in the group
  → Build CurrentMembers = who IS in the group
  → Add: for each Target not in Current → Add member
  → Remove: for each Current not in Target → Remove member (guarded)
```

Owner sync example: `Get group members (CC-Leaders) → Apply to each → Add a member to a team (Team = target, Owner = true)`. Clone with `Owner = false` for member groups. Wrap the add in a Scope/try so a duplicate-add conflict is tolerated.

---

## Debugging membership sync: the "it removed everyone" class of bug

Root cause is almost always: **a filtered target array came back empty (or field-mismatched) and the removal loop ran anyway.** Fixes below are mandatory before pointing any flow at a real access group.

**1. UPN-first normalization on both sides.** In higher ed, `mail` ≠ `userPrincipalName` (aliases, shared mailboxes, historical usernames). If the Excel key is UPN, put UPN first; a `mail`-first coalesce silently flags valid people for removal.

```text
toLower(trim(coalesce(item()?['userPrincipalName'], item()?['mail'])))
```

Normalize the same way when appending to `TargetUsers` and check exact string membership with `contains(...)`.

**2. Minimum-count safety gate** before any removal loop — skip/terminate if the segment is unexpectedly small:

```text
greaterOrEquals(length(variables('TargetUsers_CCLead')), 2)
```

**3. Removal cap** so a connector glitch can never wipe a group in one run:

```text
lessOrEquals(length(variables('UsersToRemove_CCLead')), 5)
lessOrEquals(length(variables('UsersToRemove_CCLead')), div(length(variables('CurrentMembers_CCLead')), 2))
```

**4. Turn concurrency OFF** (degree 1) on any Apply-to-each that appends to arrays or mutates membership — parallelism corrupts array state.

**5. Initialize each `TargetUsers_*` variable once, outside loops/branches.**

**6. Recursion guard** on modified-item triggers: trigger on create only, or add a trigger condition.

**Condition logic (verified):** remove branch is `contains(TargetUsers, memberUPN)` **is equal to false**. So `contains = true` → condition false → **skip removal** (keep intended member); `contains = false` → condition true → remove. If intended members hit the remove branch, the strings don't match — inspect raw `item()` from Get group members to confirm the real UPN field, then compare exact values.

**Safe test method:** point at unused test groups, or temporarily swap `Remove member` for a Compose that logs who *would* be removed, then inspect before enabling.

---

## Security groups for SharePoint: access + audience targeting

Same daily groups serve two distinct jobs — keep them separate in your head:

- **Authorization** ("can they open it?") → permissions
- **Audience metadata** ("should they see it?") → audience targeting (visibility only, **not security**; a direct URL + permission still opens it)

### Access control

Assign **groups, never individuals**. Two acceptable shapes:

- **Cleanest:** assign Entra groups directly to the site/library/page.
- **Traditional:** nest Entra groups *inside* SharePoint Owners/Members/Visitors — manage groups there, never people.

| SharePoint permission | Group |
|---|---|
| Full Control | `SG-ContactCenter-Administrators` |
| Edit | Inbound, Outbound, OSC-Coaches, Leads |
| Read | broader stakeholders (optional) |

Break inheritance only intentionally; ad-hoc individual grants become orphaned access fast.

### Audience targeting (site-owner rights are enough)

Enable and target with the **same Entra groups** on: **Navigation, Quick Links, News, Highlighted Content, Events.** Highlighted Content + page metadata (`Audience`, `Department`, `Topic`, `System`, `Lifecycle`) turns one hub into a role-aware knowledge surface — inbound sees scripts/escalation KB, coaches see outreach workflows, leads additionally see dashboards — **one site, different experiences, no per-site sprawl.**

Target state: HR/roster → dynamic Entra groups → Teams membership + SharePoint permissions + audience targeting + Power BI RLS, all from one control plane. **If access is wrong, fix the source group — not SharePoint, not Teams.** That is what makes on/offboarding invisible.

---

## SharePoint architecture & site recovery

### Modern structure

- **Flat sites + hub association. Subsites are legacy** — permission nightmares, can't cleanly move/re-own, painful migration, de-emphasized by Microsoft. Don't use them for sensitive data.
- **Private channels auto-create isolated SharePoint sites** → dozens of ungoverned mini-sites. Avoid using private-channel sprawl as a data model.
- **Sensitive content (employee reviews, HR-grade):** a separate, tightly locked-down site — not the hub, not a subsite, not private-channel sites. Link to it from the hub. Centralize the *experience* (hub navigation), not necessarily the *storage*.
- **Onboarding flow** can create a per-employee folder and grant manager/HR access (SharePoint connector supports folder/item permission actions). Fine at small/medium scale; at large scale prefer separate libraries or a Power App front end over repeatedly breaking folder inheritance.

### Rename vs URL change

- **Rename a Team:** safe, instant, updates the M365 Group + Outlook name; nothing breaks.
- **Change the SharePoint URL:** controlled admin action — SharePoint Admin Center → Active Sites → **Edit URL** (Site Address Rename), or PowerShell:

```powershell
Start-SPOSiteRename -Identity https://tenant.sharepoint.com/sites/OldName `
  -NewSiteUrl https://tenant.sharepoint.com/sites/ContactCenter
```

Not instant, site locks briefly, the Team follows automatically (no re-link). Treat the URL as a permanent identifier; check flows/Power BI links after.

### Recover a deleted SharePoint site

| Situation | Action |
|---|---|
| Site deleted, within **93 days**, you're admin | SharePoint Admin Center → **Sites → Deleted sites → Restore** (needs Global or SharePoint Admin). Direct: `https://<tenant>-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx#/deletedSites` |
| Site was tied to a Team/M365 Group | Restore the **group** first (M365 Admin → Teams & Groups → Deleted teams & groups); the site returns with it |
| Not an admin | Request the admin restore (name + approx delete time). Restores take ~30s once located |
| Deleted a page/library, not the site | Self-serve via site recycle bin: `/_layouts/15/RecycleBin.aspx` |
| Past 93 days | Permanently deleted — backup/third-party only |

Removing a site from **hub navigation** is not a delete; it's just hidden.

---

## Teams Audio Conferencing & Teams Phone rollout

**Audio Conferencing ≠ Teams Phone.** Audio Conferencing is a shared dial-in *bridge* (conference number + conference ID + PIN) that lets people join *meetings* by phone — it is **not** a personal DID and rings no one directly.

Rollout layers, in order:

```text
1. Teams chat & meetings
2. Internal Teams-to-Teams calling
3. Audio Conferencing (dial into meetings)   ← common early enablement
4. Teams Phone / PSTN (real DIDs, calling plan/Operator Connect/Direct Routing)
5. Call queues, auto attendants, PBX replacement
```

**Diagnose your stage:** a Calls tab showing only Teams calls (no ability to dial real numbers, no assigned DID) = internal-only voice, pre-PSTN. Until PSTN + queues land, none of the IVR/transfer-depth architecture is actually in play.

**Reporting once on Teams Phone** (the payoff vs manual PBX exports — the current PBX has no endpoints, so ingestion is manual):

| Data | Path |
|---|---|
| Queue / auto-attendant operational metrics | **Auto Attendant & Call Queue Historical Reports** (Power BI) |
| Raw call records | **Graph Call Records API** — needs `CallRecords.Read.All` *application* permission; **no delegated support** (admin consent required) |
| Call quality / device / network | **CQD** (quality telemetry, not exact operational counts) |

Automatable pipeline: `Teams Phone → Graph / CQD → Dataflow Gen2 / Pipeline / Logic App / Power Automate → Fabric Lakehouse → Power BI semantic model`. Power Automate is the **pipe**, not the reporting engine. Validate that queue name, agent-answered, abandoned, transfer path, hold time, ANI, and timestamps are exposed at the grain you need before committing.

---

## Managing approval forms (Teams Approvals governance)

Native Teams Approval **templates are environment-scoped, not audience-scoped** — there is **no per-template or per-user visibility control**, so you cannot hide "Basic approvals" or other org templates from specific people. Native templates also lack a true **DateTime** field (date only, no time).

**Pattern: own the intake, keep native only as the approval action layer.** Replace the weakest ~10% (form creation); keep ~85% Microsoft-native.

| Layer | Native? |
|---|---|
| Teams UI, Approvals inbox, approval actions, notifications, manager routing, reporting | **Keep** |
| Intake form | **Replace** — SharePoint list + customized form |

Build the intake as a SharePoint list, customize via **Integrate → Power Apps → Customize Form** (not a standalone app — avoids ALM overhead, keeps datetime pickers + conditional logic), and embed it as a **Lists/SharePoint tab** inside a Teams channel. Users submit in Teams and approve in Teams; they never touch the chaotic template gallery.

**SharePoint list is the system of record; the approval object is a decision engine only** — never treat the approval as source of truth.

Status lifecycle: `Draft → Submitted → Pending Approval → Approved/Rejected` (keep intermediary states).

Flow around the intake (works with the built-in *Travel Request with Approval* template too — just add the SharePoint updates around the existing approval step):

```text
When an item is created
  → Update item: Status = Submitted
  → Get manager (V2)  (input: Created By Email)
  → Update item: Status = Pending Approval  + store Approval ID
  → Start and wait for an approval (Approve/Reject – First to respond, assigned to manager)
  → Condition on Outcome:
       Approve → Status = Approved, ApprovalComments = Responses Comments
       Reject  → Status = Rejected, ApprovalComments = Responses Comments
```

**Gotchas:** on `Update item`, re-pass required fields (Title, dates, requestor) from the trigger or they blank out. Guard modified-item triggers against recursion (trigger condition like `Status ne 'Pending Approval'` or an `ApprovalStarted` boolean flag). All requests hitting one governed list unlocks Power BI: turnaround time, denial rate, PTO utilization, manager responsiveness.

---

## Related

- [[Power Platform]]
- [[TDX]]
- [[Contact Center]]
