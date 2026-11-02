# Product screenshot review for Reddit ad imagery

*2026-10-03. Reviews `docs/product/AccountabilityGuild_ProductScreenshots_20261003_202331.zip`, extracted to `docs/product/screenshots-2026-10-03/`. Companion to [`reddit-ad-creative-plan-2026-10-01.md`](./reddit-ad-creative-plan-2026-10-01.md).*

## 1. What's in the set

There are 28 screenshots: 14 routes, each at desktop (1440 wide) and mobile (390 wide). All were captured from a local dev server (`127.0.0.1:3017`) against the QA seed group `seed-first-cohort-release-v1` (`repo/prisma/seed.ts`).

| Screen | Useful for ads? | Notes |
|---|---|---|
| Dashboard ("Mark the week") | **Yes, ad A's primary image** | Weekly grid of goals × days. This is the clearest "progress tracking" visual. |
| Goals | Yes, alternate for A | Goal-writing guidance plus the pillar coverage list. |
| Group overview | Yes, alternate for B | "Closes in 28 days," the amount at stake, the kitty ledger. |
| Submit report | Month 2 | Kept/forfeit tally and completion buckets. |
| Reports (archive) | Month 2 | The group's record: kept, partial, no report. |
| Members | Low | Roster. Fine for a carousel later. |
| Settings, reporting periods, billing | No | Admin surfaces. |
| Login, account, admin console, admin workflows | No | Exclude. The admin screens are internal and should never appear in ads. |

**Missing for the ads:**

1. **A populated week.** Every dashboard grid in the set is empty (day 3 of the cycle, nothing marked). Ad A needs a week with marks, notes, and photos filled in.
2. **Logging proof.** No capture of the mark-detail interaction (adding a note or photo to a day). That's the "log proof as you go" moment.
3. **A kitty with a balance.** The group overview shows $0 for every member and "Settling" for the totals.
4. **The live `/pricing` card** for ad B. This is a marketing page, not part of the app, so it needs its own capture.

## 2. What has to change for the images to look real

### QA data visible on screen
- Goal names like "Demo User release-gate health proof" and "…work proof."
- Report text like "QA fixture percentage entry: 100% complete" and "QA fixture: owner-paused-exception."
- The group is named "First Cohort Release Gate," and the nav shows "DEMO · FIRST COHORT RELEASE GATE."
- Members are "Demo User," Tim, Dan, Brandon and Josh, with `@accountability.local` emails.

### Empty or odd states
- An empty marking grid.
- A $0 kitty and "0 of 5 members paid into the kitty in Cycle 3."
- "No active goals were recorded for this member."
- A member with "0 active goals."

### Inconsistent numbers across screens
- The cycle is numbered 7 on the dashboard, 10 in the capture log, and 3 in members.
- The dashboard says "Week 1 of 5" while the group overview says "Week 01 of 04."
- Report dates run June through July, while the current cycle is October.

### Capture artifact
The mobile shots are full-page captures. The sticky bottom nav (Dashboard / Group / Reports) shows up partway down every long page, sitting on top of content. Ad crops should be viewport-only (one phone screen), or captured with the sticky nav hidden.

### Names
If any first names in the seed match real people in Brandon's group, don't use them. Use clearly fictional names in the demo data.

## 3. Demo data spec: a "marketing demo" seed group

Add a **separate** seed group for marketing captures. Don't edit the release-gate fixture: `scripts/qa/verify-first-cohort-release-gate-fixture.ts` depends on it. The demo data depicts the product. It must not be presented anywhere as real customer results.

**Group:** "Thursday Night Group," peer mode, monthly cadence, forfeit **$40 per cycle**, 1 hall pass, 5 members. Capture **mid-cycle (about day 17 of 31)** so progress is visible but the cycle isn't closed.

**Members (fictional):** Marcus, Priya, Dave, Elena, Sam. The capture account is Marcus.

**Goals.** Follow the app's own goal-writing guidance: one sentence, behavior-based, scoreable, under 120 characters. Include a mix of check-type and count-type goals. Marcus's goals cover all five pillars, so the "goal in every pillar" rule shows as satisfied:

| Pillar | Goal | Mark type |
|---|---|---|
| Fitness | Lift four times a week, two strength and two zone-2. | Count, target 4/week |
| Faith | Read scripture for 15 minutes before work, five days a week. | Count, target 5/week |
| Family | Phone-free dinner with the kids four nights a week. | Count, target 4/week |
| Personal | Read 20 pages a night, five nights a week. | Count, target 5/week |
| Professional | Ship two client proposals by the end of the month. | Count, target 2/cycle |

**Marks (the week shown on the dashboard):** most cells marked. Two or three carry a note (ember corner) and one carries a photo (ember dot), e.g. a gym log or a book page. Leave one or two honestly unmarked days, so the grid reads as real effort rather than a perfect streak.

**Prior cycles (for reports and the kitty):** two closed cycles, with a believable mix per member:
- Most goals kept.
- Some partial (75% or 50%).
- One member with a no-report.

The "what happened" text should be plain and specific, e.g. "Missed two lifts the week of the 14th, traveling. Made up one Saturday." The kitty shows a running balance from those forfeits after fees, consistent with the forfeit amounts.

**Consistency:** one cycle number everywhere (cycle 4, October). Matching week counts. Report dates in August and September.

## 4. Capture spec

- **Mobile:** 390×844 viewport at device scale factor 3 (output 1170×2532), **viewport-only, not full-page**. Scroll to each target region and capture one screen at a time.
- **Ad crops (done on our side afterward):** a 1080×1350 (4:5) crop or composition, with the monogram added lower-right.
- **Shots needed, in priority order:**
  1. Dashboard: the "Mark the week" grid for the current week, populated. **Ad A.**
  2. Dashboard: the mark-detail state, with a note or photo open on one day.
  3. Group overview: the top section ("closes in N days," amount at stake), plus the kitty ledger with a balance.
  4. Goals: the five-pillar list, coverage at 5/5.
  5. Submit report: kept/forfeit tally on a closed cycle.
  6. Reports archive: one closed cycle.
  7. Marketing `/pricing`: the "$0 monthly fee" card. **Ad B.**
- **Desktop (1440×900, viewport-only):** the same as 1, 3 and 7, for later landing-page or carousel use.

## 5. Prompt for OpenClaw

> **Superseded (2026-10-04):** use [`openclaw-demo-screenshots-prompt-2026-10-04.md`](./openclaw-demo-screenshots-prompt-2026-10-04.md). It sets the forfeit to $20 to match Ad A's copy, adds the settings ("standard") shot, hides the environment label, uses Brandon's photo for the proof attachment, and offers a faith-goal swap-in. The original is kept below for reference.

Paste the block below. It assumes the same capture tooling that produced this set.

```text
Task: add a marketing-demo seed group and recapture product screenshots for ad creative.

Repo rules: read AGENTS.md first (non-standard Next.js; freshness check; verification gate; GitNexus impact before editing symbols). Do NOT modify the existing release-gate QA fixture (group "seed-first-cohort-release-v1") — scripts/qa/verify-first-cohort-release-gate-fixture.ts depends on it. Add a separate, clearly named demo group instead (e.g. id "seed-marketing-demo-v1"), created by prisma/seed.ts or a separate seed script that only runs in local/dev.

Demo data (all fictional; never real member names):
- Group "Thursday Night Group", peer mode, monthly cadence, $40 forfeit per cycle, 1 hall pass, 5 members: Marcus (capture account, owner), Priya, Dave, Elena, Sam. Emails on a non-routable demo domain.
- Current cycle: cycle 4, October 1–31; set "today" so the dashboard shows about day 17 of 31. Use one consistent cycle number and week count across all screens.
- Marcus's goals (one per pillar):
  Fitness: "Lift four times a week, two strength and two zone-2." (count, 4/week)
  Faith: "Read scripture for 15 minutes before work, five days a week." (count, 5/week)
  Family: "Phone-free dinner with the kids four nights a week." (count, 4/week)
  Personal: "Read 20 pages a night, five nights a week." (count, 5/week)
  Professional: "Ship two client proposals by the end of the month." (count, 2/cycle)
  Other members: 2–5 similar goals each, plain and behavioral.
- Marks for the current week: mostly marked, 2–3 with notes, 1 with a photo attachment (use a neutral placeholder image — a notebook page or gym log, no people), 1–2 honestly unmarked days.
- Two closed prior cycles (cycles 2 and 3, Aug and Sep) with filed reports: mostly kept, some partial (75%/50%), one member with no report one cycle. "What happened" text plain and specific (no "QA fixture" strings). Forfeits charged and settled so the kitty shows a consistent running balance after fees.

Capture (viewport-only, NOT full-page; hide or exclude the sticky bottom nav from crops):
- Mobile 390x844 @ deviceScaleFactor 3. Desktop 1440x900 @ 2.
- Shots: (1) dashboard "Mark the week" grid populated; (2) dashboard with one mark's detail/note/photo open; (3) group overview top section + kitty ledger with balance; (4) goals list showing 5/5 pillar coverage; (5) submit-report view on a closed cycle; (6) reports archive for one closed cycle; (7) marketing /pricing "$0 monthly fee" card.
- Same file naming and capture-report.json format as AccountabilityGuild_ProductScreenshots_20261003_202331.zip; zip to docs/product/.

Verify: no "QA", "fixture", "release-gate", "Demo User", or "@accountability.local" strings visible in any capture (grep the capture-report bodyStart text and eyeball each image); existing QA fixture verification still passes. Paste evidence. Open a PR for the seed change; don't merge.
```

## 6. Usable now vs. after the recapture

- **Usable now:** nothing for paid ads as-is, because QA strings are visible on every app screen. The `/pricing` card (ad B) can be captured today from the live site, since it doesn't depend on seed data.
- **After the recapture:** ad A uses shot 1. Ad B uses shot 7, with shot 3 as an alternate.
