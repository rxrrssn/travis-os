# CRVX MOBILE

## Objective

Create a focused iOS and Android companion app for Corveaux that extends the web platform into mobile-first workflows without trying to replicate the full desktop ERP experience.

The app should help students, staff, coaches, advisors, and administrators act quickly from their phones through notifications, messages, tasks, approvals, knowledge access, and lightweight operational actions.

The primary goal is to make Corveaux feel like “the institution in your pocket” while keeping the full configuration, administration, reporting, and platform management experience on the web app.

## Stakeholders

- Corveaux platform owner / founder
- Institutional tenant administrators
- Internal Corveaux tenant users
- Student success staff
- Advisors and coaches
- Admissions and enrollment staff
- Contact center / frontline support users
- Students
- App Store / Google Play reviewers
- Future implementation and support teams

## Systems

- Corveaux web platform
- Corveaux internal tenant
- Corveaux tenant CRM / organization model
- Next.js application backend and APIs
- Expo React Native mobile app
- Expo Application Services (EAS)
- Apple Developer Program
- Google Play Console
- Push notification services
- Authentication / session provider
- Role-based access control
- Tenant-aware routing and branding
- Messaging / notifications
- Knowledge base
- Tasks / workflows / approvals

## Current State

Corveaux is primarily a web-first SaaS platform. The web app should remain the system of record and full administrative environment.

A mobile app is desired, but it should be positioned as a companion app rather than a full ERP replacement on mobile. This reduces App Store review risk, lowers development complexity, and keeps the mobile experience focused on the workflows that actually benefit from a phone.

The preferred technical path is Expo React Native using the existing Corveaux backend/API architecture. This avoids building separate native Swift and Kotlin apps while still producing real native apps for iOS and Android.

The developer has access to a Touch Bar MacBook Pro, which is sufficient for installing Xcode, running iOS Simulator, testing Expo locally, and handling Apple submission edge cases when needed. Daily development should still happen mostly in VS Code, Expo, and TypeScript.

## Risks

- Apple may reject a thin web wrapper if the app feels like a website in a native shell.
- Trying to reproduce the entire desktop platform on mobile could create a bloated, poor user experience.
- Push notifications, authentication, and tenant-aware deep linking need careful design.
- App Store review requires stable demo access, privacy policy, terms, support URL, and non-placeholder content.
- Native dependencies may occasionally require Xcode troubleshooting even when using Expo.
- Mobile RBAC must not expose administrative controls or sensitive student/institutional data outside intended roles.
- Multi-tenant branding and login flows could confuse reviewers if demo accounts are not clear.

## Opportunities

- Use the mobile app to strengthen the Corveaux value proposition around proactive, operationally aware institutions.
- Give users fast access to alerts, messages, tasks, approvals, student interactions, and knowledge resources.
- Position the app as a focused operational companion instead of a full ERP squeezed onto a phone.
- Reuse platform APIs, auth, RBAC, tenant context, and design tokens from the web product.
- Add device-native features over time, including biometrics, camera scanning, offline cache, wallet integrations, geofencing, mobile ID, and attendance workflows.
- Improve institutional stickiness by making Corveaux part of daily staff and student behavior.

## Decisions

- Build the mobile app as **CRVX MOBILE** / **Corveaux Companion**.
- Use **Expo React Native** rather than fully native Swift/Kotlin for the initial mobile app.
- Keep the main Corveaux product web-first.
- Do not ship a thin website wrapper or generic webview app.
- Do not attempt to include full tenant/platform administration in v1.
- Optimize v1 around notifications, messaging, task actions, approvals, knowledge, student support interactions, and lightweight mobile workflows.
- Use EAS Build for iOS and Android production builds.
- Use the Touch Bar MacBook Pro for Xcode, iOS Simulator, and final Apple tooling when needed.
- Create a demo tenant and demo accounts before App Store submission.

## Next Actions

- [ ] Reserve/confirm Apple Developer Program account under the correct business/entity identity.
- [ ] Reserve/confirm Google Play Console account under the correct business/entity identity.
- [ ] Define the v1 mobile scope for staff users.
- [ ] Define the v1 mobile scope for student users.
- [ ] Create a demo tenant for app review.
- [ ] Create demo staff and student accounts for app review.
- [ ] Draft privacy policy, terms, support URL, and review notes for App Store submission.
- [ ] Decide final app name: CRVX MOBILE, Corveaux Mobile, or Corveaux Companion.
- [ ] Scaffold Expo app.
- [ ] Connect Expo app to Corveaux auth/session flow.
- [ ] Implement tenant-aware login and branding.
- [ ] Implement push notification proof of concept.
- [ ] Implement mobile inbox/messages proof of concept.
- [ ] Implement task/action list proof of concept.
- [ ] Implement knowledge/resource lookup proof of concept.
- [ ] Set up EAS Build profiles for development, preview, and production.
- [ ] Test iOS Simulator flow on Touch Bar MacBook Pro.
- [ ] Test Android emulator or physical Android device flow.

## Related Notes

- [[Corveaux]]
- [[Corveaux Internal Tenant]]
- [[Corveaux Platform Architecture]]
- [[Corveaux CRM]]
- [[Corveaux Notifications]]
- [[Corveaux Knowledge Base]]
- [[Expo React Native]]
- [[Apple Developer Program]]
- [[Google Play Console]]
