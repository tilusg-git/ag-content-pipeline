# Content engine repo scan — 2026-07-13

Source: a scan Grant ran against the actual app repo, pasted into a Cowork session that did not have that repo mounted. Recorded here verbatim (lightly organized) so future sessions have it without re-deriving. Treat as reported, not independently verified until this Cowork session (or another with repo access) confirms directly.

## Repo context
- Repo: `/Users/systemadmin/vault/projects/projectstart/accountability`
- Branch/worktree at scan time: `codex/group-fund-withdrawals-payouts`
- Product: Next.js PWA for small-group accountability cycles, goals, reports, penalty-backed consequences, notifications, and group-fund/kitty handling.

## Core positioning language already in the product
- Homepage title/metadata: "Follow-through, Made Visible."
- Product promise: "A deliberate piece of software for accountability groups that meet on a cycle. Set the standard, run the cycle, close it with receipts."
- Operating model: four acts — Set the standard, Run the cycle, Close with receipts, Pool the forfeits.
- Strong framing line: "Most habit apps are private mirrors... We made the mirror public, on a schedule, to the people you asked to hold the line."
- Differentiators currently emphasized: owner-led or peer-run groups, recurring cadence, per-member commitments, proof entries, cycle reports, saved-card forfeits, group kitty ledger.

## Public marketing surfaces already present
- `/` — homepage overview, sample live cycle, operating model, group modes, pricing summary, field notes.
- `/how-it-works` — four-act cycle explanation.
- `/pricing` — current public pricing: no monthly fee; $1 platform fee per charged forfeit plus standard card processing; forfeits stay with the group.
- `/resources` — field notes/resource hub with article cards and a lead-magnet/blueprint section.
- `/resources/[slug]` — article pages with metadata, JSON-LD Article schema, canonical URLs, sitemap inclusion.

## Current article inventory (`src/lib/marketing-content.ts`)
1. `/resources/goal-setting` — Goal Setting That Actually Sticks: A Practical Step-by-Step Guide
2. `/resources/types-of-personal-goals` — Types of Personal Goals: Choose the Right Goals for Every Life Area
3. `/resources/personal-accountability` — Personal Accountability: How to Follow Through on Your Commitments
4. `/resources/behavior-change` — Behavior Change 101: Build Better Habits and Break Bad Ones
5. `/resources/personal-life-audit` — Personal Life Audit: Evaluate Where You Are and What to Change
6. `/resources/life-planning` — Life Planning Guide: Design a Life Plan You Can Actually Execute
7. `/resources/self-improvement` — Self Improvement That Lasts: A Realistic Plan for Personal Growth
8. `/resources/startup-accountability-system` — Startup Accountability System: A Founder Playbook for Weekly Execution
9. `/resources/how-to-run-accountability-check-ins-that-actually-change-behavior` — How To Run Accountability Proof Entries That Actually Change Behavior
10. `/resources/designing-consequences-that-increase-follow-through-without-burning-trust` — Designing Consequences That Increase Follow-Through Without Burning Trust
11. `/resources/weekly-or-4-week-goal-reporting-template-for-founders-and-operators` — Weekly Or 4-Week Goal Reporting Template For Founders And Operators
12. `/resources/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint` — From Good Intentions To Shipped Work: A 30-Day Accountability Sprint
13. `/resources/building-a-resource-library-that-turns-product-interest-into-qualified-signups` — Building A Resource Library That Turns Product Interest Into Qualified Signups

Articles 1–7 are broad self-improvement/SEO topics; 8–13 are more directly tied to the group-owner/operator use case. When auditing for conversion intent, start with 1–7.

## SEO/content docs already in the repo
- `docs/marketing/seo-founding-articles-baseline-2026-04-12.md` — defines the original 5 founding resource articles, keyword targets, metadata checks, JSON-LD, sitemap, robots, Google Search Console setup.
- `docs/marketing/seo-waitlist-measurement.md` — UTM governance and baseline report endpoint. **Stale**: still references waitlist submits; app now routes to `/create-account`.
- `docs/features/marketing.md` — canonical note that public pages should route non-authenticated visitors directly to `/create-account`, not waitlist.
- `src/lib/seo.ts` and `src/app/sitemap.ts` — metadata/canonical/sitemap mechanics for public pages and resources.

## Lead magnet already outlined
Title: "The Accountability Operating System: 30-Day Consistency Blueprint" — outline only, not yet written:
1. Diagnose where your current accountability process breaks down.
2. Define a weekly reporting template that drives action, not noise.
3. Set consequence ladders that are fair, predictable, and motivating.
4. Run a 30-day rollout with weekly retrospectives and scorecards.
5. Scale your system from solo execution to team-level accountability.

## Audience and customer hypothesis material already exists
- `docs/marketing/business-evaluation-2026-05-15.md` — core thesis: not a general habit tracker; a group operating system for people who already value accountability enough to meet, report publicly, and put money at stake. Segments: existing friend accountability groups, men's/faith groups, coaches/facilitators, paid communities/masterminds, fitness/discipline groups. Competitive alternatives: group text threads, spreadsheet + Venmo/Cash App, stickK, Beeminder, Coach.me. Market signal: 5 groups complete 3 cycles without Brandon manually operating them.
- `docs/marketing/pilot-offer-2026-05-15.md` — offer, ideal pilot group profile, pricing test, outreach message, success criteria, post-cycle questions.
- `docs/marketing/pilot-candidate-playbook-2026-05-15.md` — candidate fields, validation tracks, prioritization, outreach scripts, interview script, first-3-pilot rule.
- `docs/marketing/business-metrics-plan-2026-05-15.md` — north star: active groups completing accountability cycles. Funnel: lead → qualified group → group created → invites sent → members joined → payment setup → goals created → reports submitted → cycle closed → penalty snapshot → retention.

## Product/feature docs that can become content themes
- `docs/features/groups.md` — group as the primary accountability container; social contract, cadence, stakes, invites, forming state, group governance, share/switch/account surfaces.
- `docs/features/goals.md` — member-owned commitments, one-sentence goals, cadence, mark cadence, tracking mode, lifecycle-aware edits/archive.
- `docs/features/reports.md` — reports are the core product act: per-goal completion value plus narrative; public to the group; basis for forfeit calculation.
- `docs/features/marks.md` — proof/evidence entries that support reports.
- `docs/features/notifications.md` — lifecycle reminders, report due reminders, missed-report follow-up, email/SMS delivery.
- `docs/features/payments.md`, `penalties.md`, `refunds.md`, `group-fund.md` — money-backed accountability, fee economics, full-refund workflow, group kitty/Stripe Connect owner withdrawals.
- `docs/product/first-user-journey-path-audit.md` — full journey from visitor to group creation, invites, payment setup, goals, reports, automatic cycle close, penalties/refunds, group results.
- `docs/product/capability-ui-inventory.md` — capability map showing what is complete vs partial; useful for content claims guardrails (don't market a capability that's still partial).

## Best starting point for the content engine (per the scan)
Treat `/resources` as the content hub. Use the product docs to define claim-safe content pillars. Refresh the existing articles and lead magnet around the group-owner wedge. Replace waitlist-era measurement with create-account/group-activation measurement. Build the first calendar around "how to run a real accountability cycle" rather than generic habit/goal advice.

## Key files to review first (once repo is mounted)
- `src/lib/marketing-content.ts`
- `src/app/page.tsx`
- `src/app/how-it-works/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/resources/page.tsx`
- `docs/features/marketing.md`
- `docs/marketing/seo-founding-articles-baseline-2026-04-12.md`
- `docs/marketing/business-evaluation-2026-05-15.md`
- `docs/marketing/pilot-offer-2026-05-15.md`
- `docs/marketing/pilot-candidate-playbook-2026-05-15.md`
- `docs/marketing/business-metrics-plan-2026-05-15.md`
- `docs/product/first-user-journey-path-audit.md`
- `docs/features/INDEX.md`
