# Reddit Pixel setup: prompt for OpenClaw

> **Deferred (Brandon, 2026-10-03).** At about $100/month, conversions are too few to need the Pixel. Measurement runs on UTMs plus the app's own `LandingPageViewEvent` table instead (see the creative plan §2). Revisit the Pixel if spend grows or retargeting becomes a goal.

*2026-10-02. Paste everything below the line into OpenClaw. File paths and line numbers were checked against `repo/` on 2026-10-02. Context: [`reddit-ads-game-plan-2026-09-18.md`](./reddit-ads-game-plan-2026-09-18.md) §4 and [`reddit-ad-creative-plan-2026-10-01.md`](./reddit-ad-creative-plan-2026-10-01.md).*

**Before handing this off:** create the Pixel in Reddit Ads Manager → Events Manager, and have the Pixel ID ready to set as `NEXT_PUBLIC_REDDIT_PIXEL_ID` in the deploy environment. OpenClaw should not need any Reddit login.

---

## Task: add the Reddit Pixel to the Accountability Guild Next.js app

We're starting a small Reddit Ads test (Traffic objective, about $100/month). We need the Reddit Pixel to (1) attribute account signups and group launches to Reddit clicks, and (2) build a site-visitor audience for later retargeting. Conversions API (server-side) is **out of scope** for this ticket, but structure the code so it can be added later (see "Dedup readiness").

### Read first (repo rules)

- `AGENTS.md` at the repo root. This is a non-standard Next.js version, so read the relevant guide in `node_modules/next/dist/docs/` before writing code, especially for `next/script`. Follow its verification gate. A "done" claim needs pasted evidence.
- Run the session-start freshness check from `AGENTS.md` (`git fetch origin`, `git status -sb`, `git rev-list --count HEAD..origin/main`), and report if the tree is behind.
- `docs/features/INDEX.md`, then `docs/features/marketing.md` and `docs/features/onboarding.md`. Update whichever docs this change touches in the same PR, and run the link sweep the convention requires.
- The repo is indexed by GitNexus. Run `gitnexus_impact` on every symbol you modify before editing it, and `gitnexus_detect_changes` before committing, per the repo's `CLAUDE.md`.

### How analytics works today (verify, don't assume)

- `src/components/marketing-analytics.tsx` → `MarketingAnalytics`: loads GA4 via `next/script` when `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is set, renders `null` otherwise, and sends page views on route change. **Mirror this pattern.**
- `src/components/app-shell.tsx`:
  - `RootAppShell` (public marketing pages) mounts `MarketingAnalytics`.
  - `AuthAppShell` (`/create-account`, login) mounts `ProductAnalytics` (PostHog), **not** `MarketingAnalytics`.
  - So a pixel mounted only next to GA4 would never be present on the signup page. That's the main trap here.
- `src/app/create-account/page.tsx`: renders `GuidedOnboardingFlow` inside `AuthAppShell` for new users. For signed-in users at `step=group`/`step=invite`, it renders inside `ProtectedTabShell` instead.
- `src/components/guided-onboarding-flow.tsx`: onboarding milestones already go through `emitOnboardingEvent(...)`.
  - ~line 1318: `emitOnboardingEvent("step_success", "signup", "account_signup_completed")`, immediately followed by `window.location.assign(...)`. **This is the new-account signup moment.**
  - ~line 1239: `"invite_accept_completed"` and ~line 992: `"signed_in_invite_accept_completed"`. These are people joining via an invite, not ad-driven signups.
  - ~line 1484: `emitOnboardingEvent("step_success", "launch", ...)` with reason `launch_activated` or `launch_already_active`. **This is the group-launch moment.**
- `src/app/privacy/page.tsx`: the "Service Providers" section names Google Analytics and PostHog.
- No Content-Security-Policy was found in `next.config.*` or middleware. If you find one, allow the Reddit pixel domains.

### What to build

1. **Env var:** `NEXT_PUBLIC_REDDIT_PIXEL_ID`. Add it to whatever env example/docs file the repo uses. When it's unset, everything is a silent no-op: no script tag, no errors, no console noise. This matches the GA4 behavior.

2. **`RedditPixel` client component** (e.g. `src/components/reddit-pixel.tsx`), mirroring `MarketingAnalytics`:
   - Loads Reddit's official base pixel snippet (`https://www.redditstatic.com/ads/pixel.js`, the standard `rdt` queue stub) via `next/script` with `afterInteractive`.
   - Calls `rdt('init', PIXEL_ID)`, then fires `PageVisit` on initial load **and on client-side route changes** (App Router navigations don't reload the page; follow the `usePathname`/`useSearchParams` pattern GA4 uses).
   - Do **not** pass advanced-matching data (email, phone) in `init` for now.

3. **Small tracking helper** (e.g. `trackRedditEvent(eventName, params?)` exported from the same module):
   - No-op when the pixel isn't configured or `window.rdt` is missing.
   - Never throws into product flows. Wrap calls so a blocked script (ad blockers) can't break signup.
   - Generates and passes a `conversionId` (UUID) on conversion events, and returns it.

4. **Where the pixel loads:**
   - **Yes:** all public marketing pages (`RootAppShell`) and every step of account creation and onboarding (`AuthAppShell`, plus `GuidedOnboardingFlow` when it renders inside `ProtectedTabShell`).
   - **No:** the rest of the authenticated app (dashboard, group, reports, kitty, settings). Don't add a third-party ad pixel to member data screens.
   - Choose the cleanest way to meet that boundary, mount it only once per page, and explain your choice in the PR.

5. **Events:**

   | Event | When | Notes |
   |---|---|---|
   | `PageVisit` | Every page view on the surfaces above | Automatic via the component |
   | `ViewContent` | Page views of `/how-it-works` and `/pricing` | These are the ad landing pages |
   | `SignUp` | Only on `account_signup_completed` (~line 1318) | **Not** on invite-accept paths. Paid traffic creates new accounts; invite joins would inflate the count. |
   | `Custom`, `customEventName: "GroupLaunched"` | Only on `launch_activated` (~line 1484) | Not on `launch_already_active` |

   **Navigation race:** `SignUp` fires right before `window.location.assign(...)`. Make sure the event actually leaves the browser before the page unloads. For example, fire it, then wait for the pixel request or a short bounded timeout (≤ 300ms) before navigating. Signup must never be blocked or noticeably slowed. Pick an approach and verify it (see below).

6. **Dedup readiness (no CAPI work):** pass the generated `conversionId` with `SignUp` and `GroupLaunched`. Add a short code comment saying a future Conversions API call must send the same ID so Reddit can deduplicate.

7. **Privacy page:** in `src/app/privacy/page.tsx` "Service Providers", add one plain sentence saying public marketing pages and account sign-up may use the Reddit Pixel to measure the results of our Reddit advertising. Match the existing sentences' tone. **Flag this copy change in the PR for Brandon's review.** Don't add a cookie banner in this ticket; if you think one is legally needed, say so in the PR and stop there.

### Out of scope

- Reddit Conversions API, server-side events, and hashed PII matching.
- Changes to GA4 or PostHog behavior.
- Any ad-account or Reddit Ads Manager configuration.

### Verification (paste the evidence in your final message)

1. Unit test: with `NEXT_PUBLIC_REDDIT_PIXEL_ID` unset, `RedditPixel` renders nothing and `trackRedditEvent` is a no-op that doesn't throw.
2. Unit test: `SignUp` fires on the new-account path and does **not** fire on the invite-accept paths. `GroupLaunched` fires on `launch_activated` only.
3. Run the existing unit and integration suites for onboarding and marketing (`npm run test:unit`, `npm run test:integration`, plus `npm run test:regression:e2e` for the affected surfaces). Paste the output.
4. Manual check, with a test Pixel ID set locally:
   - In browser devtools → Network, confirm the pixel request on a marketing page, on `/how-it-works` (`ViewContent`), and after a test signup (`SignUp` request sent **before** the redirect completes).
   - Confirm no pixel requests on `/dashboard` or other in-app pages.
   - Use a throwaway test account from the project's seed/fixture conventions, not a real one.
5. Screenshot or log showing signup still completes with the pixel script blocked (e.g. block `redditstatic.com` in devtools).
6. `gitnexus_detect_changes` output showing only the expected files changed.

Open a PR. Don't merge it. Summarize the files changed, the mounting decision from step 4, how you handled the navigation race, and the privacy copy for review.
