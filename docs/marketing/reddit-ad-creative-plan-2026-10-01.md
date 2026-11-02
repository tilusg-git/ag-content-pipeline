# Reddit ad creative plan

*Created 2026-10-01, revised 2026-10-02 after Brandon's decisions: no humor or meme creative, question headlines allowed in paid social, and a budget of about $100/month. Companion to [`reddit-ads-game-plan-2026-09-18.md`](./reddit-ads-game-plan-2026-09-18.md), which covers setup, compliance and the runbook. Where the two disagree on creative, budget, or subreddits, this doc is newer. Pixel setup is handed off in [`reddit-pixel-openclaw-prompt-2026-10-02.md`](./reddit-pixel-openclaw-prompt-2026-10-02.md).*

**Status (2026-10-09):**
- Month 1 is built in Ads Manager. Ad A (`the_story`) has been entered, and ad B (`the_price`) is specced to match.
- What was actually entered (communities, headlines, URLs, files) is in §4, "Month 1 build."
- The live image files are in [`reddit-ads/out/month1-launch/`](./reddit-ads/out/month1-launch/). The asset index is [`reddit-ads/README.md`](./reddit-ads/README.md).
- Still to record: the launch date, ad review outcome for both ads, and the day-20 CTR read.

## 1. Decisions locked

| Decision | Source |
|---|---|
| No comedic memes and no humor in any Reddit creative. The "fully straight" voice rule holds on Reddit too. | Brandon, 2026-10-02 |
| Question headlines are allowed in paid social ad headlines. Blog titles keep the no-question rule. | Brandon, 2026-10-02 (recorded in `docs/brand/voice-and-tone.md`) |
| Budget is about $100/month, at Reddit's $5/day minimum. | Brandon, 2026-10-02 |

## 2. What $100/month actually buys

- **Reddit's minimum is $5/day per campaign and per ad group.** $100 doesn't stretch across a 30-day month at that rate, so run a **20-day flight with a $100 lifetime budget** each month, starting on a Monday. If Ads Manager accepts $100 spread over a full 30 days, that works too. Either way the total is the same.
- **One campaign, one ad group, two ads.** A second ad group would double the daily floor to $10. Everything we test has to fit inside one ad group: two ads rotating against the same audience.
- **Expected volume:** at $0.75-$2 CPC, about **50-130 clicks a month**, or roughly 8,000-30,000 impressions. That's enough to compare **click-through rate between two ads**. It isn't enough to compare signups, which will be single digits at best.
- **Consequences:**
  - Judge creative on CTR and cost per click, which come from Reddit's own dashboard.
  - **No Pixel for now (Brandon, 2026-10-03).** Measure with UTMs instead:
    - GA4 covers landing-page sessions and engagement, split by `utm_content`.
    - The app's own `LandingPageViewEvent` table covers signups. It already records onboarding funnel events, `account_signup_completed` included, with UTM columns.
    - **Gap:** UTMs are lost when a visitor clicks from the landing page to `/create-account`. The fix is a small ticket: keep first-touch UTMs in session storage and send them with the onboarding events. The endpoint already accepts them.
  - Stay on the **Traffic objective** indefinitely at this budget. Conversion optimization needs far more conversion volume than $100/month will ever produce.
  - Test **one variable per month**. Month 1: format. Month 2: headline. Month 3: audience. Treat each month as a directional read, not proof.
  - Target **US only** (cards and charges are USD-based), so the small budget isn't spread across countries.

## 3. Creative strategy by ad structure

I couldn't load the two Reddit pages Brandon linked (business.reddit.com blocks automated fetching), so the format list below comes from Reddit Help Center articles and the third-party spec guides cited at the end. Before building in Ads Manager, check this list against those two pages.

| Ad structure | What it is | Use for AG? | Role |
|---|---|---|---|
| **Free-form** | A post with a headline, body text and an image, laid out like an organic thread. Comments on. Had the highest CTR of any format in Reddit's launch test (+28%). | **Yes. Month 1, ad A.** | Founder story. Builds trust. |
| **Image** | A single image, a headline and a CTA button. 4:5 (1080x1350) recommended. | **Yes. Month 1, ad B.** | "Receipts" proof shot. |
| **Carousel** | 2-6 swipeable cards, each with its own headline. | **Month 2 or 3 candidate.** | The 4-act cycle, one card per act, using copy that's already live. Explains the mechanic without leading with money. |
| **Video** | MP4/MOV; under 6 seconds converts best. | Not yet. | Only once a real screen recording of a cycle close exists. |
| **Conversation placement** | Not a format. It's where the ad appears: inside comment threads rather than the feed. Headlines truncate around 100 characters there. | Leave placement on automatic. | Keep every headline under 100 characters so it fits both placements. |
| **Lead gen / product / catalog** | A lead form inside Reddit, or shopping catalogs. | **No.** | AG's conversion is account creation on the site, not an email in a Reddit form. |

### Messaging strategy for month 1 (revised 2026-10-03)

With one ad group and two ads, month 1 tests **one strategic question: what makes a stranger click, the story or the price?**

- **Change only the angle.** Both ads are **free-form**, run to the same audience, use the same CTA button ("Learn More"), and have comments on. Only the reason to click differs: headline, body, and the image that proves it. The earlier plan tested free-form vs. image ad. That would have bundled a format change with a message change, and ~100 clicks can't untangle two variables.
- **Make the angles far apart.** At this volume, Reddit's CTR numbers only separate if one ad does roughly 1.5-2x better than the other. Two similar ads would always read as a tie.
- **Hypotheses:**
  - **A (why):** people click because they recognize the situation. A real group, a real founder, a real problem. This tests trust and identity.
  - **B (cost):** people click because it removes a familiar objection: another subscription. It also answers "how do you make money" before anyone asks. This tests economics.
- **Destination: homepage for both (Brandon, 2026-10-03).** CTR is measured before the click, so the shared destination doesn't affect the test. `utm_content` separates the two in GA4 and in the signup data.
  - **Message-match gap for B:** the homepage hero (`repo/src/app/page.tsx`) never says "no monthly fee" or mentions a subscription, and pricing appears nowhere above the fold. Someone who clicked B for the price lands on a page that doesn't repeat it, and bounces are likely.
  - **Fix options:**
    - Send B to `/pricing` instead.
    - Or add pricing to the homepage hero stats row. It currently reads Cadence / Group setup / The kitty. Adding "Monthly fee: $0" there is a small site change.
  - Ad A's message (cycles, logged progress, reports, the kitty) is already above the fold on the homepage, so A is fine.

### Product shots to capture (for A now, and month 2 variants)

Capture these as phone screenshots in portrait, ideally from a demo/seed group so no real member data is involved, or real data with names blurred and consent:

1. **Member cycle view:** commitments with progress bars and "report due." This is ad A's image.
2. **Logging proof:** the moment of adding a note, photo, or tally.
3. **Cycle close report:** a submitted report with hits and misses.
4. **Kitty screen:** the pot balance and the group's payout policy. A strong alternative image for B.
5. **Group view:** member activity signals ("the group sees activity, not pressure").
6. **Setting the standard:** cadence, forfeit amount, hall passes. This is the setup screen.

Also check the homepage's `LiveCyclePanel` (the "This cycle's commitments" panel in the hero). It's already a public product depiction, so a crop of it could stand in for #1 while real screenshots are gathered.
- **Decision rule at day 20:**
  - If one ad's CTR is about 1.5x the other's or better, on at least ~5,000 impressions each, it wins and moves to month 2's headline test.
  - Anything closer is a tie. Keep A, which carries lower ad-review risk, and fold B's pricing line into A's body for month 2.
- **Keep pricing below the fold in A (revised 2026-10-03).** Brandon wants A's body to mention forfeits and no subscription. To keep the test readable, those lines go in A's **last paragraph**, below the "more" cut. The visible part of A (headline, first two lines, image) stays about the story and the product. The visible part of B leads with price.

### How to position "no monthly fee"

The live `/pricing` page already has ratified, accurate lines. Reuse them rather than inventing new claims:

- "One plan. No monthly fee."
- "Groups do not pay a subscription. Forfeits belong to the group; Accountability Guild takes a $1 platform fee plus standard card processing when a forfeit is charged."
- "The kitty is not our revenue model."

**Recommended framing: what it costs, plus where the money goes.** "No monthly fee" by itself sounds like a free trial with a catch, and redditors will go looking for the catch. Pairing it with "missed commitments go to your group's kitty, not to us" names the catch up front and makes it a selling point. A group app whose revenue doesn't depend on your subscription or on keeping your money is a real point of difference from stickK and Beeminder. Don't name them in ads; let commenters draw the comparison.

**Don't say:**
- "Free." It isn't: a charged forfeit carries a $1 fee plus processing.
- "Only pay when you miss." Who pays the $1 isn't stated on the site, so the claim can't be verified.
- Any competitor's price.
- "Bet," "wager," or "win money." Gambling language is an ad-policy risk and inaccurate besides.

**Ad-review risk:** ad B mentions forfeits, which is the money mechanic the game plan (§3) said to hold until the account had clean review history. Brandon is choosing to test it in month 1. Have a fallback ready in case B is rejected:
- **B-safe:** headline "One plan, no monthly fee, built for accountability groups," with the body cut to the cadence and report mechanics. No forfeit language.

### Ad A: built for our group (why), revised 2026-10-03

- **Voice:** "we," meaning the group and the people who built the product (Brandon's call; this replaces the first-person "I" founder framing for this ad).
- **Format:** free-form. **Destination:** homepage `/` (Brandon, 2026-10-03). `utm_content=group-s1`.
- **Headline (92 chars):** "We built Accountability Guild to replace the docs and spreadsheets our monthly group ran on."
  - Month 2 alternate (78): "Still running your accountability group on docs and spreadsheets? We were too."
- **Body (Brandon's edit, 2026-10-03, tightened):**
  > Our group meets monthly for one reason: to follow through on our goals and show real progress, not just talk about them.
  >
  > That used to mean a shared doc and someone chasing updates. So we built the tool we wanted: commitments are written down, progress is logged as it happens, misses are tallied automatically, and every member reports at the close of each cycle.
  >
  > Follow-through is where personal growth actually happens, so it runs on skin in the game. Each group sets a forfeit amount, say $20 a cycle. The amount is the point: big enough that you'd rather do the work than pay it, it turns a goal into a promise you've made to yourself and to the people in the room. Fall short and part or all of it goes into a shared pot the group controls, not to us. Groups put the pot toward a night out, a retreat, or a charity.
  >
  > There's no monthly subscription, so hit every commitment and you pay nothing. We take a $1 platform fee plus standard card processing out of each charged forfeit, but we'd rather never see it. The best cycle is one where everyone did what they said they would.
- **Fee wording verified in code:** the pot receives the gross forfeit minus Stripe fees minus the platform fee (`repo/src/lib/group-kitty.ts`). So the fee comes *out of* the forfeit. Members don't pay $1 on top. Never write "you only pay $1."
- **Confirmed by Brandon (2026-10-03):** forfeits are set per cycle, and partial forfeits are real, so "part or all" stands.
- "Most groups use the pot for..." was changed to "Groups put the pot toward...", since beta usage data can't support "most."
- **"Hit every commitment and you pay nothing"** (added 2026-10-03, both ads) is true: there's no subscription, and the platform fee only applies to a charged forfeit. Don't add "your card is never charged." Mentioning the card invites the financial-services review scrutiny, and the line works without it.
- **Image:** a real screenshot of the product's progress tracking (a member's cycle view: commitments, proof logged, progress, report due). Capture it from the real app with demo or seed data. Real names only with consent. The numbers in the stand-in are illustrative and must not ship. Crop to 1080x1350, monogram lower-right.
- **Claim to verify before launch:** "misses are tallied automatically" and auto-charged forfeits match the product description in CLAUDE.md (cycle act 3). Confirm with Brandon that both are live in the beta.

### Ad B: no monthly fee (cost), revised 2026-10-03

- **Format:** free-form. **Destination:** homepage `/` (Brandon, confirmed 2026-10-03). The homepage hero doesn't mention pricing (see §3). The recommended fix is "Monthly fee: $0" in the hero stats row, but that's a site change and not a launch blocker. `utm_content=pricing-s1`.
- **"Kitty" vs. "shared pot":** "kitty" is AG's product term. It's common US English for a pooled pot of money, but a cold audience may misread it. The glossary already covers this case: in headings and lead sentences, say "a shared pot"; introduce "kitty" in the body. So the headline says "shared pot," and the body uses "kitty" once with its meaning.
- **Headline (76 chars, "One plan" dropped 2026-10-03):** "No monthly fee. Missed commitments go to your group's shared pot, not to us."
  - Month 2 alternates: Q1 "Why pay a subscription to stay accountable? Our groups pay $0 a month." (70) and S2 "Our accountability software has no monthly fee. The kitty is not our revenue model." (83; uses "kitty," so test it only if B wins)
- **Body (aimed at people who need structure with a partner or group):**
  > Accountability Guild is software for partners and groups who meet on a schedule: set commitments, log progress, report at each close.
  >
  > Without that structure, the benefit of an accountability partner or group fades. Nothing gets written down and nobody checks. It works whether it's you and one partner or a whole group, weekly, bi-weekly, or monthly.
  >
  > There's no subscription. Hit every commitment and you pay nothing. Miss one and you forfeit part or all of the amount your group set for the cycle, which goes into a shared pot the group controls. We call it the kitty. We take a $1 platform fee plus standard card processing out of each charged forfeit, but we built this to see you follow through, not to collect fees. The goal is progress you can point to, cycle after cycle.
- **Month 2 headline candidate (57 chars):** "No monthly fee. Hit every commitment and you pay nothing." Test it against the current headline if B wins month 1.
- **Partner claim verified:** a non-solo group launches with a minimum of 2 active members (`repo/src/app/api/onboarding/launch/route.ts`, `minimumParticipantCount`).
- **Image:** a phone screenshot of the live `/pricing` card ("$0 monthly fee," with the fee notes). It's real, needs no consent, and is ready now. Trade-off: a screenshot is text in the image, which Reddit's data says costs about 13%. Accept that for B, because the screenshot *is* the proof.

### Held

- **Receipts image** (real closed-cycle screenshot): the strongest proof asset once a consented real cycle exists. It becomes month 2's image variant for whichever angle wins.
- **Carousel (4-act cycle):** a challenger for month 3.

### Rules for every ad

- Image 1080x1350 plus a 1080x1080 backup, JPG/PNG under 3MB. Monogram top-left or lower-right (Reddit data: +108% conversion with a visible logo). No overlay text (−13% on images). No gradients, ember accent only, no stock, no AI people.
- Headline under 100 characters. Questions are fine. Sentence case. No emoji, no em dashes, no exclamation points. "Kitty," not "group fund."
- UTMs (as launched 2026-10-09): `?utm_source=reddit&utm_medium=cpc&utm_campaign=<ad>` (`the_story`, `the_price`). This supersedes the earlier `paid_social` / `utm_content` convention. Headlines rotate inside Reddit, so read per-headline results in Ads Manager, not in UTMs.
- Every ad ships three image sizes: 1080x1350 main, 1080x1080 square, and a 400x300 thumbnail (4:3, under 500 KB, for the conversation placement) cropped on one focal point.
- Ads Manager requires at least 3 unique headlines per ad.
- Comments on, with an answer bank ready before launch. It covers:
  - Where the money goes: the kitty, plus a $1 platform fee and card processing per charged forfeit.
  - Why a card on file, and "is this a scam."
  - How AG differs from stickK and Beeminder.
  - Hall passes.
  - No subscription.
  Brandon replies within a few hours during week 1.

## 4. Subreddit evaluation

**Caveat:** Reddit blocks my tools, so I could only confirm sizes for 3 of the 22 subreddits (cited). Everything else is a judgment on fit from the subreddit's name and known culture. **Before building the ad group, check each one in Ads Manager's community picker**: whether it's targetable at all, its audience estimate, and its rules on promotion.

### How each sub was judged

1. **Intent:** are people asking for accountability or structure, or just consuming motivation?
2. **Group fit:** is the culture about doing it *with other people*?
3. **Money fit:** adults with a card, US-heavy, open to stakes.
4. **Size:** targetable, and not so big that it swallows the whole $5/day.

**Important:** Reddit spreads delivery toward the biggest audience in an ad group. Put r/getdisciplined (~2.2M) in with ten 10k-member subs and nearly every impression goes to r/getdisciplined. So the large subs get their own month instead of being mixed in.

### Tier 1: month 1 ad group (high intent, group-shaped)

| Subreddit | Size | Why |
|---|---|---|
| r/GetMotivatedBuddies | 10k+ (cited) | People literally asking for accountability partners. Closest intent match on the list. |
| r/Accountabilibuddies | Unverified | Same intent as above. |
| r/BusinessBuddy | Unverified | Founders seeking accountability. Fits owner-led and founder peer groups, which is AG's SEO whitespace. |
| r/gtd | Unverified, likely mid-size | Systems people with a weekly-review habit, which is a natural bridge to cycle reports. |
| r/habitrpg | Unverified, likely mid-size | Habitica users already accept social stakes: party members take damage when you miss a daily. |
| r/manprovement | 48k (cited) | Men's self-improvement. Men's groups are a common real-world accountability-group format. |
| r/Discipline | Unverified | Discipline-seeking intent, smaller and less noisy than r/getdisciplined. |

### Tier 2: month 3 audience test, or fallback if tier 1 under-delivers

| Subreddit | Size | Why |
|---|---|---|
| r/getdisciplined | ~2.2M (cited) | Core fit, but big enough to swallow every impression. Give it its own month. |
| r/monkmode | Unverified, likely large | High discipline intent, but the ethos is solitary withdrawal, not group check-ins. |
| r/dailyfocuslogs, r/disciplinedaily, r/BuildYourDiscipline | Unverified, likely small | Logging culture matches proof-logging. Add these if they're targetable and tier 1 needs more volume. |
| r/personalcurriculum | Unverified | Self-directed learners. Medium fit for a study-group use case. |

### Tier 3: exclude

| Subreddit | Why |
|---|---|
| r/selfimprovement | Huge and low-intent, and would swallow the budget. Better reached through organic replies. |
| r/lifegoals, r/FutureGoals, r/MindfullyDriven | Aspirational or motivational browsing, not doing. |
| r/Selfhelpbooks | Readers, not people looking for a group to report to. |
| r/focus | The name is ambiguous (ADHD, photography, general). Check its content before considering it. |
| r/ProductivityGeeks, r/FrameworksInAction | Likely tiny, or heavy on app promotion where an ad blends into the noise. Check activity first. |
| r/Disciplined_Bondhas | "Bondha" points to a South Asian audience, which doesn't match US targeting or USD forfeits. |

### Delivery rule for month 1

Launch with the tier 1 subs that Ads Manager accepts. If the ad group hasn't spent at least ~$3/day by day 3, add r/getdisciplined and note that month 1's results then mostly reflect that sub. Use the community breakdown in reporting, if available, to see which subs drove clicks.

### Month 1 build, as entered in Ads Manager (Brandon, 2026-10-09)

**Communities (13), one ad group:**
- From tier 1: r/GetMotivatedBuddies, r/Accountabilibuddies, r/BusinessBuddy, r/gtd, r/manprovement, r/Discipline. r/habitrpg was not included.
- From tier 2: r/getdisciplined, r/monkmode, r/disciplinedaily.
- New, not evaluated in this plan: r/DecidingToBeBetter, r/selfimprovementforman, r/selfdevelopment.

**This changes the delivery rule above.** r/getdisciplined (~2.2M) is in from day one instead of being held as a day-3 fallback. Its month 3 solo test is also gone. Expect it to take most impressions. Read month 1 results through the community breakdown, not the ad-group totals. r/selfdevelopment is close in kind to r/selfimprovement, which tier 3 excludes as huge and low-intent, so watch its CTR.

**Ad A assets (uploaded):**
- Images, in `reddit-ads/out/month1-launch/` (copies of R2v2 from `reddit-ads/build_adA_round4.js`; uploaded under their `email-review-2026-10-08/1_ad_spreadsheet-vs-report_*` names):
  - `adA_the-story_1080x1350.png`
  - `adA_the-story_1080x1080.png`
  - `adA_the-story_thumb_400x300.png`, the conversation placement thumbnail (spec 400x300, max 500 KB): the cycle report phone alone.
- Headlines: Ads Manager requires at least 3 unique headlines and rotates them. This means month 1 already mixes headlines, ahead of month 2's planned headline test. A vs. B still compares angles, as long as all of B's headlines lead with price.
  1. "We built Accountability Guild to replace the docs and spreadsheets our monthly group ran on."
  2. "Still running your accountability group on docs and spreadsheets? We were too."
  3. "Our accountability group outgrew the shared doc, so we built the software to run it." (new 2026-10-09)
- CTA: Learn More.
- URL as entered: `https://accountabilityguild.com/?utm_source=reddit&utm_medium=cpc&utm_campaign=the_story`. This replaces the UTM convention in "Rules for every ad": the ad is named in `utm_campaign`, and there's no `utm_content`. `/api/analytics/landing-view` stores `utm_campaign`, so ads still separate in the app's data.

**Ad B: what to enter, following the same pattern as A:**
- Images, in `reddit-ads/out/month1-launch/` (copies of R5v3 from `reddit-ads/build_adA_round5.js`; the same files as `email-review-2026-10-08/4_ad_money-at-stake_*`):
  - `adB_the-price_1080x1350.png`
  - `adB_the-price_1080x1080.png`
  - `adB_the-price_thumb_400x300.png`, cropped on "October closes in 9 days" and "At stake $20".
- Headlines (3 required):
  1. "No monthly fee. Missed commitments go to your group's shared pot, not to us."
  2. "Why pay a subscription to stay accountable? Our groups pay $0 a month."
  3. "No monthly fee. Hit every commitment and you pay nothing."
  - Not S2, which uses "kitty" in a headline.
- CTA: Learn More, same as A.
- URL: `https://accountabilityguild.com/?utm_source=reddit&utm_medium=cpc&utm_campaign=the_price`. Mirror A's source and medium exactly, and change only the campaign.
- Body: as written in "Ad B" above.

**Alternate A images, built but not in month 1:** these now also have all three sizes in the same folder, for month 2 image variants:
- `2_ad_report-in-the-gym_*` (R3v3)
- `3_ad_personal-goals-desk_*` (R1v3)

## 5. Three-month calendar

| Month | Ads | Audience | Question it answers |
|---|---|---|---|
| 1 | A founder story vs. B no monthly fee (both free-form) | Tier 1 | Do strangers click for the story or for the price? |
| 2 | Winner, rotating its 3 headlines (question vs. statement) | Tier 1 | Do question headlines beat statements for AG? |
| 3 | Winner with best headline, plus carousel as challenger | r/getdisciplined alone | Does the message hold up in a large general-discipline sub? |

**Revised by the month 1 build (2026-10-09):**
- r/getdisciplined is already in the month 1 ad group, so month 3's solo test of it needs a new audience question.
- Ads Manager rotates three headlines per ad from day one, so month 2's headline test becomes a read of per-headline results from month 1, rather than a new flight.

**Free pre-test, run in parallel:** post the founder story organically from Brandon's account in subs that allow it. Whichever framing gets real engagement becomes the ad A copy.

## 6. Still needed

1. **Brandon:** a real product screenshot for A (progress-tracking view), and confirmation that automatic miss tallies and forfeit charging are live.
2. **Brandon:** sign off on A's and B's final body copy, and on running forfeit language in month 1 despite the review risk.
3. ~~**Brandon:** run the tier 1 list through Ads Manager's community picker.~~ Done 2026-10-09; see "Month 1 build" in §4.
4. **Who** replies to ad comments in week 1?

---
Sources: Reddit 2026 Creative Best Practices study via [PPC Land](https://ppc.land/reddits-2026-ad-creative-study-what-actually-moves-conversion-rates/); specs via [Stackmatix](https://www.stackmatix.com/blog/reddit-ad-specs), [Vizup](https://www.tryvizup.com/blog/reddit-ad-specs-2026-sizes-formats-and-creative-rules), [StrikeSocial](https://strikesocial.com/blog/reddit-ad-specs-complete-sizes-dimensions-and-safe-zones-guide/); free-form launch data via [MediaPost](https://www.mediapost.com/publications/article/394411/reddit-introduces-free-form-ads-inspired-by-user.html) and [Reddit Ads Help](https://business.reddithelp.com/s/article/Free-form-Ads); budget minimums via [Stackmatix](https://www.stackmatix.com/blog/reddit-ads-minimum-budget-requirements-2026); targeting audience-size guidance via [Stackmatix](https://www.stackmatix.com/blog/reddit-ads-targeting-options-2026); subreddit sizes via [ReddTrends](https://www.reddtrends.com/r/getdisciplined), [Cohorty](https://blog.cohorty.app/find-accountability-partner-beyond-reddit/), [The Hive Index](https://thehiveindex.com/topics/personal-growth/platform/reddit/). Confirm everything live in Ads Manager at build time.
