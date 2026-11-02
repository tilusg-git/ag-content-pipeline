# Homepage explainer video: objective, outline, script, shot list

*2026-10-19. Draft for Brandon's review. Built from the homepage copy (`repo/src/app/page.tsx`), the group-create flow (`repo/src/components/guided-onboarding-flow.tsx`), the invite page (`repo/src/app/i/[code]/accept/page.tsx`), voice-and-tone, the glossary, and a review of every existing product screenshot (`docs/product/screenshots-2026-10-03/`, `docs/product/reddit-ad-screenshots-2026-10-03/`).*

## 1. Objective

**One sentence:** In about 90 seconds, show a group organizer how one cycle works and where the money goes, so they create a group and invite their people.

| | |
|---|---|
| **Viewer** | The organizer of a small group (3 to 8 people) or an accountability partner pair. They already meet, or want to, and they will be the one who brings everyone else in. Not a solo habit tracker user. |
| **Placement** | Homepage, directly under the hero (*"Follow-through, made visible to the people you owe it to."*) or at the top of the "how it works" section. |
| **Format** | 16:9, 1920×1080, about 90 seconds. Click-to-play with a poster frame. Captions burned in, because many homepage visitors will watch muted. |
| **The one takeaway** | "My group sets the rules, we log proof, we close with a report, and missed commitments pay into our own kitty, not to the company." |
| **Action after watching** | Create a group (`/create-account`). |
| **How we'll know it works** | Play rate, percent who watch to the end, and homepage → `/create-account` clicks from viewers vs. non-viewers. Needs a `video_play` / `video_complete` event; scope with the existing `MarketingAnalytics` component. |

### Key messages, in priority order
1. **It's for the group you already have.** You bring the people; Accountability Guild runs the cycle.
2. **The cycle makes follow-through visible.** Set the standard, run the cycle, close with receipts.
3. **The money stays with the group.** Forfeits go to the kitty. No monthly fee; $1 platform fee plus card processing only when a forfeit is charged.

### Objections the organizer will have (and where the video answers them)
| Objection | Answered in |
|---|---|
| "We already have a group chat / spreadsheet." | Scenes 1-2 (promises fade between meetings) and 6 (a shared record instead of a thread) |
| "My friends won't want to put a card on file." | Scene 4 (charged only for a miss; nothing commits until the first cycle opens) |
| "Who keeps the money?" | Scenes 8-9 (the group's kitty, $1 platform fee) |
| "Is this complicated to set up?" | Scene 3 (five short steps) |

## 2. Outline

Hook (0:00) → what it is (0:07) → **Act 1, set the standard** (0:12) → **Act 2, run the cycle** (0:40) → **Act 3, close with receipts** (0:54) → **Act 4, pool the forfeits** (1:07) → pricing (1:18) → call to action (1:24).

The four acts mirror the homepage and `/how-it-works`, so the video and the page tell the same story.

## 3. Script and scene list

Narration is second person, plain, no humor (voice-and-tone). About 200 words, which reads in about 85 to 90 seconds. The narration says "commitment" (glossary); the UI says "goal". That mismatch is acceptable on screen, but note it for the glossary reconciliation.

| # | Time | Voiceover | On screen | Caption / title card |
|---|---|---|---|---|
| 1 | 0:00-0:07 | Your group already meets. You make promises to each other. Then a month goes by, and nobody quite remembers who did what. | Title card on bone, or the homepage hero with a slow push-in. | *Promises fade between meetings.* |
| 2 | 0:07-0:12 | Accountability Guild keeps the record, on a cycle. | Logo lockup → homepage "This cycle's commitments" sample panel. | Accountability Guild |
| 3 | 0:12-0:26 | Start by setting the standard. Name the group, pick a cadence, and set what's at-stake for a miss. Then invite the people you already meet with. | **Recording:** group-create steps 1, 2, 4, 5: "Name the group." → "How often, how much." (monthly, $20) → "Who else is in?" (type 3-4 emails) → "The contract, on paper." | ACT 1 · SET THE STANDARD |
| 4 | 0:26-0:33 | Each member accepts, adds a card, and writes their own commitments. The card is only charged for a miss. | Invite page "You are in." → card authorization screen ("Where we will pull from if you miss"). Card field blurred or empty. | *Charged only for a miss.* |
| 5 | 0:33-0:40 | Commitments are specific and measurable. Lift four times a week. Read twenty pages a night. | Goals list, slow scroll through the five pillar goals. | |
| 6 | 0:40-0:54 | During the cycle, mark what you did, whenever you sit down. Add a note or a photo as proof. The whole group can see the cycle moving. | **Recording:** click cells on the "Mark the week" grid → open one day, type a note, attach a photo → cut to group overview "closes in N days." | ACT 2 · RUN THE CYCLE |
| 7 | 0:54-1:07 | At the close, everyone files a short report. Score each commitment and write what happened. Misses are tallied, and forfeits are charged automatically. | **Recording:** submit-report with scores and "what happened" filled → reports archive, one closed cycle with most members filed. | ACT 3 · CLOSE WITH RECEIPTS |
| 8 | 1:07-1:18 | Every forfeit goes into your group's kitty. The group decides what it's for: reward the top performers, fund a retreat, or give it to a shared charity. | Group overview ledger with a real kitty balance. Optional: three simple icons or text lines for the three disbursement options. | ACT 4 · POOL THE FORFEITS |
| 9 | 1:18-1:24 | There's no monthly fee. A one-dollar platform fee, plus card processing, applies only when a forfeit is charged. | Live `/pricing` card ("No monthly fee"). | No monthly fee · $1 per forfeit |
| 10 | 1:24-1:30 | Set the standard. Run the cycle. Close with receipts. Start your group. | End card: logo, the three phrases, "Create your group" and accountabilityguild.com. | |

**Required disclaimer** (same wording the homepage already uses for its sample panel), shown small on any scene with names or dollar amounts: *A sample group. Members and figures are illustrative.*

## 4. Capture checklist (what exists vs. what's missing)

Status key: **✓ usable** as-is · **↻ recapture** (exists, but has problems) · **✗ missing** (never captured).

Capture desktop (1920×1080 browser window, or 1440×900 at 2×) for the main video. Mobile is used only as a phone-frame insert for scene 6, where proof logging happens on a phone.

| Scene | Screen | Status | Existing file / problem |
|---|---|---|---|
| 1-2 | Homepage hero + sample cycle panel | ✗ missing | Live site, capture any time. Record a slow scroll, not a still. |
| 3 | Group create, steps 1, 2, 4, 5 (recording) | ✗ missing | Never captured. Most important gap: it's the organizer's own path. |
| 4 | Invite landing "You are in." | ✗ missing | `/i/[code]/accept`. Needs a real invite code from the step 3 run. |
| 4 | Card authorization screen | ✗ missing | The 10-03 Billing shot has QA strings. Use Stripe test mode; never show real card digits. |
| 5 | Goals list | ↻ recapture | `03_GoalsListCoverage_swapped_mobile.png` is fine but mobile only and shows 4 of 5 goals. Needs a desktop capture with all five. |
| 6 | "Mark the week" grid, populated (recording) | ↻ recapture | `01_DashboardMarkWeek_swapped_desktop.png` is day 3 with only a few marks. Record mid-cycle (about day 17) with most cells marked and 1-2 honest blanks. |
| 6 | Mark detail with note + photo | ↻ recapture | `02_DashboardMarkDetail_swapped_mobile.png` is good, but the photo's hash filename (`e65d79d7…`) shows under the image. Hide or crop it. |
| 6 | Group overview top ("closes in N days") | ✓ usable | `04_GroupOverviewTop_swapped_desktop.png`. Recapture only if the day count changes to match scene 6. |
| 7 | Submit report, filled in (recording) | ↻ recapture | `06_SubmitReportClosedCycle…` is empty (0/0, "All current goals are archived") and dated May while everything else says October. |
| 7 | Reports archive, one closed cycle | ↻ recapture | `07_ReportsArchiveClosedCycle…` shows 1 of 5 filed, Marcus with "No report," "No active goals," May dates, and an "Accountability Guild" label where the group name should be. |
| 8 | Ledger with a kitty balance | ✗ missing | Every capture shows "Settling" / $0. The kitty only has a balance after a real close with settled test charges. This is the blocker for Act 4. |
| 9 | `/pricing` "No monthly fee" card | ✓ usable | `09_LivePricingFreeCard_swapped_desktop.png`. |
| 10 | End card | Made in the edit | Brand tokens: bone, ink, ember; Newsreader + Inter Tight. |
| Optional | Members roster | ↻ recapture | 10-03 shot has QA names and emails. Only needed if you want a "your group" beat in scene 3. |

**Summary: 2 usable, 6 to recapture, 5 missing.** Everything in Acts 3 and 4 depends on demo data that the October OpenClaw run couldn't create through the UI alone (closed cycles, filed reports, settled charges).

## 5. Demo data you'll need before recording

The October capture used text swaps over the QA fixture. That works for stills, but not for a recording where you click and type live, and it can't produce a kitty balance. Two ways to get there:

1. **Recommended: a seeded marketing-demo group**, the "revision 1" spec in `reddit-ad-screenshot-review-2026-10-03.md` §3, which was never built. It's a small engineering task (a separate seed group; leave `seed-first-cohort-release-v1` alone because the QA verifier depends on it). It gives you two closed cycles with filed reports and a settled kitty, consistent everywhere.
2. **Manual:** create the group yourself on the dev server with Stripe test cards, run a short cycle (weekly cadence) through a real close, then switch to the demo values. Slower, but needs no code.

Either way, keep the values consistent across every scene:
- **Group:** Thursday Night Group · peer mode · monthly · $20 at-stake · 1 hall pass
- **Members (fictional):** Marcus (you, the organizer), Priya, Dave, Elena, Sam. Emails on `example.com`.
- **Current cycle:** Cycle 4, October, about day 17. **Prior cycle:** Cycle 3, September, closed, most members kept, one partial, one forfeit, kitty balance after fees.
- **Marcus's goals:** the five pillar goals already in the October captures.

## 6. Recording tips

- Full-screen browser or a clean window with no bookmarks bar, extensions, or dev environment label. Notifications off.
- Move the mouse slowly and pause about 1 second before each click. Editors can speed footage up, but can't smooth out a jerky cursor.
- Record each scene as its own short clip (5-20 s) rather than one long take.
- Type the onboarding text for real in the recording; it reads as genuine.
- Never show a real card number, real email, or real member name.

## 7. Production notes

- **Voiceover:** three options. (a) Brandon reads it, in second person as written; most authentic. (b) An AI voice (the creative connector can generate it). (c) Captions and music only. Recommend (a) or (b), with captions either way.
- **Editing:** Screen Studio (auto-zoom on clicks) or Remotion (Claude builds the edit in code with brand title cards). No AI-generated video of the UI.
- **On the page:** self-host MP4 + WebM, lazy-load, poster frame, `VideoObject` structured data. Run the `seo-manager` agent on that PR.
- **Cut-downs later:** a 30-second version (scenes 1, 3, 6, 8, 10) for social and Reddit, from the same footage.

## 8. Decisions for Brandon

1. Voiceover: Brandon, AI voice, or captions only.
2. Demo data: seeded demo group (engineering ticket) or manual run with test cards.
3. Placement: under the hero, or inside the "how it works" section.
4. Peer mode only, or a 5-second mention of owner-led mode for coaches. The draft is peer only, to stay focused on the organizer.

## 9. Asset request for Brandon's agents

*Added 2026-10-23.* Everything we need to cut the video from the shot list above. Brandon: hand section 9.6 to your agents (OpenClaw or similar) as-is. Sections 9.1 to 9.5 are the same request in checklist form, so you can tick off what comes back.

### 9.1 Demo environment (do this first)

Every recording depends on it.

- [ ] **A seeded marketing-demo group** on the local dev server, separate from `seed-first-cohort-release-v1` (the QA verifier `scripts/qa/verify-first-cohort-release-gate-fixture.ts` depends on that one; don't touch it). Values from §5: Thursday Night Group, peer mode, monthly, $20 at-stake, 1 hall pass; Marcus (owner and capture account), Priya, Dave, Elena, Sam on `example.com` emails.
- [ ] **Current cycle:** Cycle 4, October, clock set to about day 17. Marcus has the five pillar goals. The current week is mostly marked, with 2-3 notes, 1 photo, and 1-2 honest blanks.
- [ ] **Prior cycle:** Cycle 3, September, closed. All five members filed except one. Most goals kept, one partial, one forfeit. Charges settled in Stripe test mode, so the ledger shows a **real kitty balance**, not "Settling" or $0.
- [ ] **A second, empty account** (no group yet) for recording the group-create flow from step 1, plus a fresh invite code for the "You are in." page.
- [ ] Dev environment label hidden; no "QA", "fixture", "release-gate", "Demo User" or `accountability.local` text anywhere.

If seeding isn't practical, say so; the fallback is to run a short weekly-cadence cycle through a real close with Stripe test cards.

### 9.2 Screen recordings (the main deliverable)

**Format:** 1920×1080, 30 or 60 fps, MP4 (H.264, high bitrate, at least 15 Mbps) or MOV. No audio. One clip per row, 5-20 seconds, with a 1-second still hold at the start and the end. The cursor should move slowly and pause about 1 second before each click.

Playwright's built-in `recordVideo` is too low quality for this (compressed WebM, no cursor). Drive the browser with Playwright if you like, but capture it with OBS or a similar screen recorder at full quality. If a clip can only come from Playwright, also send the **click log** (§9.4) so the cursor and zooms can be added in the edit.

| ID | Scene | What to record | Viewport |
|---|---|---|---|
| R01 | 1-2 | Live homepage: hold on the hero, slow scroll to the "This cycle's commitments" sample panel. Read-only. | Desktop |
| R02 | 3 | Group create, step 1 "Name the group.": type "Thursday Night Group", continue. | Desktop |
| R03 | 3 | Step 2 "How often, how much.": choose monthly, enter $20, set 1 hall pass, continue. | Desktop |
| R04 | 3 | Step 3 "Where do goals live?": leave all five pillars checked, continue. (Optional; may be cut.) | Desktop |
| R05 | 3 | Step 4 "Who else is in?": type four `example.com` emails, continue. | Desktop |
| R06 | 3 | Step 5 "The contract, on paper.": slow scroll over the review, then confirm. | Desktop |
| R07 | 4 | Invite page "You are in.", then click "Set up your account". | Desktop |
| R08 | 4 | Card authorization: show "Where we will pull from if you miss" and the "charged only when" list. Stripe test card only; card digits blurred or not visible. | Desktop |
| R09 | 5 | Goals list for Marcus: slow scroll through all five goals and pillar coverage. | Desktop |
| R10 | 6 | Dashboard "Mark the week": click 3-4 cells to mark them. | Desktop |
| R11 | 6 | Open one day: choose Kept, type "Zone-2 on the bike, 40 min", attach the photo, Done. Hide the photo's hash filename. | **Mobile** 390×844 at 3× (output 1170×2532) |
| R12 | 6 | Group overview: hold on "The October cycle closes in N days" and the progress bar. | Desktop |
| R13 | 7 | Submit report: score each goal, type one plain sentence under "What happened", file it. Record it in a state where the report window is open and Marcus has not filed yet (e.g. a copy of the seed with the clock at the end of September), so it does not change the closed Cycle 3 shown in R14 and R15. | Desktop |
| R14 | 7 | Reports archive: open the Cycle 3 (September) group report, slow scroll past 3-4 members. | Desktop |
| R15 | 8 | Group overview ledger: hold on the kitty with a real balance, then scroll the per-member contributions. | Desktop |
| R16 | 9 | Live `/pricing`: hold on the "No monthly fee" card. Read-only. | Desktop |

### 9.3 Stills

- [ ] One PNG of the **end state of every recording** (R01-R16), viewport-only (not full-page), 1440×900 at 2× for desktop and 390×844 at 3× for mobile. These are poster frames and fallbacks.
- [ ] Sticky bottom nav hidden wherever it overlaps content.
- [ ] A **poster frame** candidate: the populated "Mark the week" grid (R10 end state) at 1920×1080.

### 9.4 Data and information

- [ ] **`capture-report.json`**, one entry per clip and still: file name, URL, viewport, device scale factor, date captured, and the demo state it shows.
- [ ] **Click log** for every recording: timestamp in seconds, x and y position, and what was clicked. We use it to time zooms and captions.
- [ ] **Demo data sheet:** the exact values visible on screen (group name, member names, cycle numbers and dates, at-stake amount, each member's kept/forfeit result, kitty balance, fees deducted). Every caption has to match these numbers.
- [ ] **Facts to confirm** (Brandon, not the agents). The script depends on them:
  1. Is a card charged for a missed commitment **and** for not filing a report? (The card screen says both. The script currently says "only charged for a miss.")
  2. Are kitty uses (reward top performers, fund a retreat, give to charity) set in the product, or agreed by the group outside it?
  3. Can every member see the group's marks and reports in peer mode?
  4. Are the $1 platform fee and card processing taken out of the forfeit, or charged on top of it?
  5. "Nothing commits until the first cycle opens and every member has set up payment." Is that still accurate?

### 9.5 Media and brand files

- [ ] **1-2 real phone photos** for the proof attachment (a notebook workout log, an open book, a gym log). No faces, nothing personal. Put them in `docs/product/demo-assets/` (doesn't exist yet).
- [ ] **Font files:** full Newsreader (regular and italic) and Inter Tight (regular, medium, semibold). The repo has only three weights (`repo/assets/fonts/`). Logo, monogram and wordmark are already in `docs/brand/assets/`.
- [ ] **Voiceover**, if Brandon reads it: the script in §3, each scene as its own file, 2-3 takes per line, WAV at 48 kHz, quiet room, phone or USB mic held close. Skip this if we use an AI voice.

### 9.6 Paste-ready prompt for the agents

```text
Task: capture screen recordings, stills, and capture data for the Accountability Guild homepage explainer video.

Background: docs/marketing/homepage-explainer-video-plan-2026-10-19.md (read §3 script, §4 checklist, §5 demo data, §9 this request). Read AGENTS.md first and follow its repo rules.

Ground rules
- Local dev server only. The only exceptions are read-only captures of the live homepage and /pricing.
- Do NOT modify the QA fixture group "seed-first-cohort-release-v1"; scripts/qa/verify-first-cohort-release-gate-fixture.ts depends on it. Add a separate marketing-demo group instead (e.g. id "seed-marketing-demo-v1"), dev/local only. Open a PR for the seed change; don't merge.
- All people are fictional: Marcus (owner, capture account), Priya, Dave, Elena, Sam, on example.com emails. Never show a real name, real email, or real card number. Stripe test mode only.
- No text swaps over the old fixture: every number on screen must be computed by the app from the demo data.

1. Demo environment
- Group "Thursday Night Group": peer mode, monthly cadence, $20 at-stake, 1 hall pass, 5 members.
- Current cycle: Cycle 4, October 1-31, clock at about day 17. Marcus's goals:
  Fitness "Lift four times a week, two strength and two zone-2."
  Professional "Ship two client proposals by the end of the month."
  Personal "Read 20 pages a night, five nights a week."
  Family "Phone-free dinner with the kids four nights a week."
  Faith "Read scripture for 15 minutes before work, five days a week."
  Current week mostly marked; 2-3 marks with short notes; 1 mark with a photo from docs/product/demo-assets/; 1-2 honest blank days.
- Cycle 3, September, closed: 4 of 5 members filed; mostly kept, one partial, one forfeit; plain, specific "what happened" sentences. Forfeit charges settled in Stripe test mode so the ledger shows a real kitty balance (not "Settling", not $0).
- A second empty account with no group, for recording group creation from step 1, plus a fresh invite code for /i/[code]/accept.
- Hide the dev environment label. Cycle numbers, week counts, and dates must agree on every screen.

2. Recordings (R01-R16 in §9.2 of the plan)
- 1920x1080, 30 or 60 fps, MP4 H.264 at 15+ Mbps (or MOV), no audio. One clip per row, 5-20 s, 1 s still hold at start and end. Slow cursor, about 1 s pause before each click.
- Capture with a real screen recorder (OBS or similar). Playwright may drive the browser, but don't deliver Playwright recordVideo output as the final clip.
- R11 is mobile: 390x844 at 3x, recorded as a phone screen. Hide the photo's hash filename.
- R13 (filing a report) needs a state where the report window is open and Marcus hasn't filed yet, e.g. a copy of the seed with the clock at the end of September. It must not change the closed Cycle 3 shown in R14 and R15.
- Hide the sticky bottom nav where it overlaps content.

3. Stills
- A viewport-only PNG of the end state of every recording: desktop 1440x900 at 2x, mobile 390x844 at 3x.
- Plus the populated "Mark the week" grid at 1920x1080 as a poster frame.

4. Data
- capture-report.json: per file, the name, URL, viewport, scale factor, timestamp, and the demo state shown.
- click-log.json: per recording, [{t_seconds, x, y, target}] for every click and keystroke burst.
- demo-data.md: every value visible on screen (names, cycle numbers and dates, at-stake amount, per-member results, kitty balance, fees).

5. Delivery
- Folder docs/product/explainer-video-assets-<date>/ containing recordings/ (R01_homepage-hero.mp4 ...), stills/ (S01_homepage-hero.png ...), and data/ (capture-report.json, click-log.json, demo-data.md). Zip it as well.

Verification (paste evidence in your reply)
- Text search of every page captured: zero hits for "QA", "fixture", "release-gate", "Demo User", "accountability.local", "DEMO".
- Eyeball every clip and still: no clipped text, no overlapping nav, no visible card digits, no hash filenames, no real names.
- The QA fixture verifier still passes.
- List any clip you couldn't record and why. Don't work around blockers by editing the database by hand.
```
