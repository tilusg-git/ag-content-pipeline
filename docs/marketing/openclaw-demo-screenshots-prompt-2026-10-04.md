# OpenClaw prompt: product screenshots for ad creative

*2026-10-04, revision 2. Paste everything below the line into OpenClaw. Background: [`reddit-ad-screenshot-review-2026-10-03.md`](./reddit-ad-screenshot-review-2026-10-03.md).*

**What changed from revision 1:** no database seeding. OpenClaw populates states by using the app's own UI on the local dev server, and swaps visible text in the browser right before each capture. Claude does cropping, framing, and the monogram afterward. Claude can't redraw the text itself convincingly, because the repo has only 3 of the brand font weights (`repo/assets/fonts/`).

**Before sending, Brandon:**
- [ ] Put 1-2 real phone photos in `docs/product/demo-assets/` and attach them. Good subjects: a notebook workout log, an open book, a handwritten commitment list. No faces, nothing personal.
- [ ] Faith goal: keep it, or tell OpenClaw to use the swap-in (row 5 of the goal table).

---

## Task: capture clean product screenshots for Reddit ad images

We need real product screens for two Reddit ads. The previous capture set (`docs/product/AccountabilityGuild_ProductScreenshots_20261003_202331.zip`) shows QA strings ("Demo User release-gate…", "QA fixture…", `@accountability.local`, "First Cohort Release Gate"), empty states, and cycle numbers that don't match across screens. Recapture with the fixes below.

### Ground rules
- **Local dev only**, against the existing seed (`http://127.0.0.1:3017`, group `seed-first-cohort-release-v1`), same as last time.
- **No database edits and no code changes.** Populate states only by using the app's normal UI as a member would: marking days, adding notes, attaching a photo.
- **Text swaps happen in the rendered page only**, via `page.evaluate` (replace text nodes) just before each screenshot. Nothing is saved. Reload the page between shots so swaps don't carry over.
- Don't touch production. The one exception is the read-only capture of the public `/pricing` page (shot 9).

### Step 1: populate states through the UI (as the demo account)
1. In the current cycle's week view, mark goal cells across the visible week so the grid looks like real effort:
   - Most days marked.
   - **1-2 days left honestly unmarked.** Not a perfect streak.
   - On 2-3 marks, add a short note (e.g. "Zone-2 on the bike, 40 min", "Read at lunch, 22 pages").
   - On 1 mark, attach Brandon's photo from `docs/product/demo-assets/`.
2. If any of these interactions are blocked in the seed state (for example, marks only allowed on past days), capture what's possible and list what was blocked. Don't work around it in the database.

### Step 2: text swaps (apply before every shot where the text appears)

| On screen now | Replace with |
|---|---|
| First Cohort Release Gate (any casing) | Thursday Night Group |
| DEMO · FIRST COHORT RELEASE GATE (nav label) | *(remove the label entirely)* |
| Demo User | Marcus |
| Josh / Brandon / Dan / Tim | Priya / Dave / Elena / Sam |
| Any `@accountability.local` email | `marcus@example.com` pattern (or hide) |
| Demo User release-gate health proof | Lift four times a week, two strength and two zone-2. |
| Demo User release-gate work proof | Ship two client proposals by the end of the month. |
| *(add to the goals list if a third/fourth row exists or is easy to add via the UI)* | Read 20 pages a night, five nights a week. / Phone-free dinner with the kids four nights a week. |
| *(add as a goal row if a row exists or is easy to add via the UI; approved by Brandon 2026-10-04)* | Read scripture for 15 minutes before work, five days a week. |
| Other members' "… release-gate … proof" goals | Plain behavioral goals in the same style (e.g. "Run three mornings a week.", "Call Mom every Sunday.") |
| "QA fixture …" report text | Plain, specific sentences, e.g. "Missed two lifts the week of the 14th, traveling. Made up one on Saturday." / "Both proposals out by the 28th." |
| Report titles like "… release-gate submission" | "September report" (or the matching month) |
| Mismatched cycle numbers (7 / 10 / 3) | One number everywhere: **Cycle 4** (current, October) |
| Mismatched week counts ("Week 1 of 5" vs "Week 01 of 04") | Make them match what the calendar actually shows |
| Forfeit / at-stake amounts | **$20** per cycle (matches the ad copy) |
| Kitty showing $0 / "Settling" | Leave as is unless the UI already shows a real balance. **Don't invent money figures by text swap.** Report it, and we'll decide. |

Rule of thumb: swap **names and labels**, never **outcomes or money** the app didn't actually compute. The one exception is "at stake," which is a setting: set it to $20 through the UI if possible, and swap the text only if the setting can't be changed.

### Step 3: capture
- **Viewport-only, not full-page.** Scroll each target region into view and capture one screen at a time. Hide the sticky bottom nav (Dashboard / Group / Reports) wherever it overlaps content (a capture-time `display:none` is fine).
- **Mobile:** 390×844 at deviceScaleFactor 3. **Desktop:** 1440×900 at deviceScaleFactor 2.
- **Shots**, mobile unless noted, in priority order:
  1. **Dashboard, "Mark the week" grid**, populated, showing 3-4 goal rows. *Primary image for ad A.* Also capture desktop.
  2. **Dashboard, one marked day opened**, showing its note and the photo attachment.
  3. **Goals list**, showing the goal rows and the pillar coverage panel.
  4. **Group overview, top section** ("closes in N days," at stake, cycle progress bar). Also capture desktop.
  5. **Group settings, the standard**: cadence, forfeit amount, hall passes. Crop out owner/admin-only controls.
  6. **Submit report** on a closed cycle: kept/forfeit tally and completion buckets.
  7. **Reports archive**: one closed cycle.
  8. **Group overview, kitty ledger**: only if it shows a real balance after step 1. Otherwise skip it and say so.
  9. **Live `https://accountabilityguild.com/pricing`**: the "$0 monthly fee" card. Mobile and desktop. *Primary image for ad B.*
- **Also deliver**, for each shot: the **unswapped** version too (same frame, before text swaps), so we can check nothing structural changed.
- **Output:** same naming and `capture-report.json` format as the previous zip, plus a `swaps-applied.json` listing every replacement made per shot. Zip it to `docs/product/`.

### Verification (include in your reply)
- Search all swapped captures' text for "QA", "fixture", "release-gate", "Demo User", "accountability.local" and "DEMO". The result must be zero hits.
- Confirm by eye on each image: no clipped or overflowing text after swaps (longer goal names may wrap differently), and no sticky nav overlapping content.
- List anything from step 1 that was blocked, and any shot you skipped and why.
