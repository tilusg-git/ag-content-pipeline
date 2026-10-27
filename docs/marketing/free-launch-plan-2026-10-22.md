# Free launch plan: directories and launch boards

*2026-10-22. Drafted from Ruben Dominguez's "50 Free Places to Launch Your Startup in 2026" (newsletter, 2026-10-22) and filtered for Accountability Guild. Each place below has its own card in the Content Pipeline (Asana), `TYPE: launch-listing`, in Needs review. This doc is the master copy: if a card and this doc disagree, this doc wins.*

## 1. Why we're doing this, and what we're not expecting

- **The main reason is backlinks and getting indexed.** The site has DR 0 and doesn't show up even for a search on its own name (`seo-audit-2026-07-13.md`). A handful of real links from crawled sites is one of the fastest ways to get Google to find and index it.
- **Don't expect many signups from this.** People who browse launch boards are mostly makers and developers. Our buyer is someone who already runs a group. The newsletter makes the same point with Gumroad: about 50,000 visitors from Hacker News on day one, while most paying customers came from elsewhere.
- **AI search is now in play too.** `repo/src/app/robots.ts` no longer blocks AI crawlers; it only disallows app and auth routes. (CLAUDE.md still says it blocks them. That note is out of date.) Listings on AlternativeTo and SaaSHub are the kind of page assistants quote when someone asks for "an alternative to stickK."
- **Cost:** nothing but time. No paid tiers, no "skip the queue" upgrades.

## 2. The shortlist (8 places)

| # | Place | Type | When | Owner | Card |
|---|---|---|---|---|---|
| 1 | AlternativeTo | Permanent directory | Submit week of Oct 26 | Brandon | `[Launch] AlternativeTo listing` |
| 2 | SaaSHub | Permanent directory | Submit week of Oct 26 | Brandon | `[Launch] SaaSHub listing` |
| 3 | Crunchbase | Company profile | Week of Oct 26 | Brandon | `[Launch] Crunchbase profile` |
| 4 | Indie Hackers | Community + product page | Product page now; first post Wed Nov 18 | Brandon | `[Launch] Indie Hackers product page and first post` |
| 5 | Peerlist Launchpad | Weekly board | Launch week Mon Nov 16 | Brandon | `[Launch] Peerlist Launchpad` |
| 6 | Product Hunt | Daily board | **Tue Nov 17, 12:01am PT** | Brandon (maker) | `[Launch] Product Hunt launch` |
| 7 | Smol Launch | Weekly cohort | Cohort for week of Nov 16 | Brandon | `[Launch] Smol Launch` |
| 8 | Reddit (r/SideProject, r/alphaandbetausers) | Communities | Thu Nov 19 and Sat Nov 21 | Brandon (personal account) | `[Launch] Reddit r/SideProject and r/alphaandbetausers` |

**Backup:** Shipybara (Monday launches, 18 free slots a week, bookable up to 180 days ahead) if Peerlist or Smol Launch falls through. Same copy as Peerlist.

**Skipped on purpose:** every board that requires their badge on our homepage (Uneed, FoundrList, StartupBase, Launch Llama, Fazier, Twelve Tools, Startup Fame, Nick Launches), because a third-party badge breaks brand standards; developer and AI-only places (Show HN, Lobsters, DEV, Hashnode, GitHub, Hugging Face, MCP Registry, ChatGPT app directory, Future Tools); B2B review sites (G2, Capterra, GetApp, TrustRadius) until the coach segment has reviews to show; integration marketplaces (no integrations yet). Revisit a **Notion template** for a monthly group check-in as a later content piece.

## 3. Calendar

| Date | What |
|---|---|
| Week of Oct 26 | AlternativeTo, SaaSHub, Crunchbase submitted (approval takes days to about a week). Indie Hackers product page created. Brandon creates or confirms a personal Product Hunt account (needs to be at least a week old to post). |
| By Nov 2 | Pre-launch checks in §5 done. Product Hunt gallery images built. |
| By Nov 6 | Product Hunt launch scheduled for Nov 17 (PH lets you schedule up to 30 days ahead). Peerlist project page complete and submitted for the Nov 16 week. Smol Launch cohort booked. |
| Nov 9 to 13 | Brandon tells his own group and close contacts the date. Ask them to visit and comment with real feedback, never to upvote (PH's one hard rule). |
| **Mon Nov 16** | Peerlist week starts. Smol Launch cohort week starts. |
| **Tue Nov 17** | Product Hunt goes live 12:01am PT. Maker comment posted right away. Reply to every comment within about 2 hours, all day. |
| Wed Nov 18 | Indie Hackers launch post. |
| Thu Nov 19 | r/SideProject post. |
| Sat Nov 21 | r/alphaandbetausers post. |
| Dec 1 | 2-week readout (§6). Note it's the week before Brandon's group meets on Thursday Dec 3. |

**Why Tue Nov 17:** it's 26 days out, enough time to set up, and it stays clear of Thanksgiving week (Nov 23 to 27), when traffic and attention drop. Tuesday is the most competitive day on Product Hunt; the trade-off is more traffic. If Brandon prefers a quieter day for a better shot at a top-5 badge, Saturday Nov 21 is the alternative. Decide before Nov 6.

## 4. Shared copy (use everywhere so every listing says the same thing)

Source of truth: live `/llms.txt`, live `/pricing`, `docs/brand/voice-and-tone.md`, `docs/brand/glossary.md`. No em dashes, no emoji, no exclamation points, sentence case.

- **Name:** Accountability Guild
- **Website:** https://accountabilityguild.com
- **Tagline (56 chars):** Follow-through, made visible to the people you owe it to
- **One-liner (≤140 chars, 133):** Accountability software for small groups that meet on a schedule. Commitments, proof, reports, and forfeits that stay with the group.
- **Short description (≤260 chars, 251):** Accountability Guild is accountability software for groups that already meet. Members write measurable commitments, log proof, and report at each close. Missed commitments can carry a forfeit, and that money goes to the group's kitty, not the company.
- **Long description (about 150 words):**

  Accountability Guild is accountability software for small groups that meet on a recurring cycle: weekly, bi-weekly, or monthly. It isn't a personal habit tracker. It assumes the group already exists and makes each member's follow-through visible to that group, on a schedule.

  Each cycle runs in four steps. The group sets the standard: cadence, forfeit amount, and how many hall passes each member gets. Members write their own measurable commitments and log proof as they go, with notes, photos, or tallies. At the close, everyone submits a short report and misses are tallied. Forfeits for missed commitments are charged to the card on file and pooled into the group's kitty. The group decides what the kitty is for: paying out top performers, a shared expense like a retreat, or a charity.

  Groups run owner-led, with a coach or founder setting the terms, or as peers who set them together. There's no monthly fee. The Standard group plan is free; each forfeit charged carries a $1 platform fee plus card processing.

- **Pricing line:** Free. No monthly fee. $1 platform fee plus card processing on each forfeit charged.
- **Who it's for:** founder groups, masterminds, coaches running a program, leadership cohorts, fitness and workout groups, friends who meet to keep each other on track.
- **Competitors to name (where a site asks):** stickK, Beeminder, Coach.me. Positioning against each, from `repo/docs/marketing/business-evaluation-2026-05-15.md`:
  - stickK: commitment contracts, mostly one person at a time. Accountability Guild is built around a recurring group and a shared kitty.
  - Beeminder: strong individual goal stakes, and the money goes to Beeminder. Accountability Guild is group-first, and forfeits stay with the group.
  - Coach.me: a paid coaching marketplace plus habit tracking. Accountability Guild is software for groups that already meet, not paid coaching.
- **Founder:** Brandon Tilus. He built it for his own accountability group, which meets on the first Thursday of every month and used to run on docs and spreadsheets.
- **Status:** public beta.
- **Platforms:** web, installable as a PWA on phones.

**Logo and images:**
- Logo/icon: `docs/brand/assets/app-icon/app-icon-accent-1024.png` (the default ember app icon). Wordmark: `docs/brand/assets/wordmark/wordmark-a-light-bone.svg`.
- Screenshots: the **swapped** set in `docs/product/reddit-ad-screenshots-2026-10-03/` (demo data, no real members). Best order: `04_GroupOverviewTop` (desktop), `01_DashboardMarkWeek` (desktop), `06_SubmitReportClosedCycle` (mobile), `07_ReportsArchiveClosedCycle` (mobile), `09_LivePricingFreeCard` (desktop). Before uploading, open each one and confirm no QA strings ("Demo User," "QA fixture," "@accountability.local") remain; `reddit-ad-screenshot-review-2026-10-03.md` §2 lists what to look for.

## 5. Before anything goes live

1. **Tracking.**
   - Permanent directories (AlternativeTo, SaaSHub, Crunchbase): list the plain homepage URL. The app's `LandingPageViewEvent` stores `referrerUrl`, so the source shows up without UTMs, and the backlink points at the clean URL.
   - Launch-week links (Product Hunt, Peerlist, Smol Launch, Indie Hackers post, Reddit): add UTMs.
     `?utm_source=<site>&utm_medium=referral&utm_campaign=launch_2026_11`
     Sites: `producthunt`, `peerlist`, `smollaunch`, `indiehackers`. Reddit uses `utm_source=reddit&utm_medium=organic&utm_campaign=launch_2026_11&utm_content=r_sideproject` (or `r_alphaandbetausers`), so it never mixes with the paid `cpc` traffic.
   - **Known gap:** UTMs drop off when a visitor clicks from a landing page to `/create-account`, and GA4 isn't loaded there (CLAUDE.md, Reddit section). Launch traffic can be counted at the landing page but not reliably at signup. Fixing that before Nov 16 is a small engineering ticket worth doing; otherwise read signups by date window.
2. **Product readiness.** Brandon walks a stranger's path end to end the week of Nov 2: create account, create a group, invite, write a commitment, log proof. Anything broken gets fixed or the launch moves.
3. **Domain email.** SaaSHub moves verified submissions up the queue and Crunchbase claims work through an email on the company domain. Confirm an `@accountabilityguild.com` address exists before submitting.
4. **Who answers comments on Nov 17.** Brandon, all day. Grant as backup for questions about content.

## 6. How we'll judge it (Dec 1 readout)

- Indexing: is the homepage indexed, and does a search for "Accountability Guild" return it? This is the main goal.
- Backlinks: which listings went live, and which links are dofollow (check in Semrush, budgeting units).
- Visits by source: `LandingPageViewEvent` grouped by `utmSource` and referrer domain.
- Signups and new groups created in the window Nov 16 to Nov 30, compared with the two weeks before.
- Product Hunt: rank on the day, number of comments, and the feedback worth acting on.

---

## 7. Per-place drafts

### 7.1 AlternativeTo

- **Where:** alternativeto.net, "Suggest new application" (requires a free account). Approval takes from a couple of days to about a week.
- **Name:** Accountability Guild
- **Website:** https://accountabilityguild.com
- **Short description:** use the one-liner (§4).
- **Description:** use the long description (§4).
- **License / pricing:** Free. The site's options don't fit per-forfeit fees well; choose **Free** and keep the pricing line in the description so nobody is surprised.
- **Platforms:** Online (web), and Progressive Web App if offered.
- **Tags/features to add:** accountability, goal tracking, group accountability, commitment contract, habit tracking, mastermind.
- **Alternative to:** stickK, Beeminder, Coach.me. After approval, open each competitor's page and add Accountability Guild as an alternative there, so it appears on their pages.
- **Screenshots:** the five in §4.

### 7.2 SaaSHub

- **Where:** saashub.com, "Submit product". Verify with an email on our own domain to move up the review queue.
- **Name / URL / tagline:** per §4.
- **Description:** short description (§4) as the summary; long description as the body.
- **Categories:** Productivity, Goal Tracking, Habit Tracker (pick the closest available).
- **Pricing model:** Free (with the pricing line in the description).
- **Competitors / alternatives:** stickK, Beeminder, Coach.me.
- **Logo:** app icon (§4).

### 7.3 Crunchbase

- **Where:** crunchbase.com, create an organization profile (free). Claim it with an `@accountabilityguild.com` email.
- **Organization name:** Accountability Guild
- **Website:** https://accountabilityguild.com
- **Short description:** use the one-liner (§4).
- **Full description:** first two paragraphs of the long description (§4).
- **Industries:** Software, SaaS, Productivity Tools, Consumer Software (pick from their list).
- **Founder:** Brandon Tilus.
- **Operating status:** Active. Company type: For profit.
- **Funding:** list nothing. Crunchbase guidance is closed rounds only.
- **Brandon to fill:** founded date, headquarters city, LinkedIn URL, employee count range. Not in our docs, so don't guess.

### 7.4 Indie Hackers

**Product page (now):** name, tagline, and short description from §4. Don't connect Stripe for "verified revenue" yet; it adds nothing until there's revenue to show.

**Launch post (Wed Nov 18).** Founder content speaks as "we" (voice-and-tone).

- **Title:** We built accountability software where the money from missed goals stays with the group
- **Body:**

  Our accountability group meets on the first Thursday of every month. For a long time it ran on docs and spreadsheets. Everyone said what they'd do, the month went by, and at the meeting it was hard to say what had actually happened.

  So we built Accountability Guild for that group. It's now in public beta.

  How it works:

  1. The group sets the ground rules for each round: how often it meets, the cost of a miss, and how many excused misses each person gets.
  2. Each member writes their own measurable commitments and records progress as they go: notes, photos, tallies.
  3. At the end of the round, everyone submits a short report. Misses are tallied, and the agreed cost is charged to the card on file.
  4. That money goes into the group's shared pot, not to us. The group decides what it's for.

  The business model is the part people ask about. There's no subscription. We charge a $1 platform fee plus card processing on each forfeit that's actually charged. If everyone keeps their commitments, we make nothing. We like that the incentives point the same way as the group's: we do best when the product makes forfeits matter, not when it makes them happen.

  [EDITOR NOTE for Brandon: add one or two real numbers if you're comfortable sharing them, such as groups or members in the beta, or how many rounds your own group has run on it. Indie Hackers rewards real numbers. Delete this note if not.]

  We launched on Product Hunt yesterday: [PH link]. The site is https://accountabilityguild.com/?utm_source=indiehackers&utm_medium=referral&utm_campaign=launch_2026_11

  A question for anyone who runs a mastermind or peer group: what does your group do today when someone misses what they said they'd do?

- **Check:** the "we do best when the product makes forfeits matter" sentence is a claim about our incentives. Cut it if Brandon doesn't want to make it.

### 7.5 Peerlist Launchpad

- **Where:** peerlist.io. Needs a verified personal profile (Brandon) and a fully completed project page. Launches run Monday to Sunday; the top 5 get a backlink.
- **Project name / tagline:** per §4.
- **Description:** short description, then the long description.
- **Categories:** Productivity, Social, SaaS (closest available).
- **Link:** `https://accountabilityguild.com/?utm_source=peerlist&utm_medium=referral&utm_campaign=launch_2026_11`
- **Images:** the five screenshots.
- **First comment (Brandon):** "We built this for our own monthly accountability group, which used to run on docs and spreadsheets. Members write measurable commitments, record progress as they go, and submit a short report at the end of each round. Missed commitments can carry a cost the group agrees on, and that money goes to the group's shared pot, never to us. It's in public beta. What would make you trust a tool like this with your group?"

### 7.6 Product Hunt

- **Launch:** Tuesday Nov 17, 2026, 12:01am PT. Brandon hunts it himself from his personal account (makers hunted 79% of featured posts; a third-party hunter adds nothing, per Product Hunt).
- **Name:** Accountability Guild
- **Tagline (56 chars, limit 60):** Follow-through, made visible to the people you owe it to
- **Description (251 chars, limit 260):** short description from §4.
- **Topics (pick 3 from PH's list):** Productivity, Community, Personal Finance (or closest available).
- **Link:** `https://accountabilityguild.com/?utm_source=producthunt&utm_medium=referral&utm_campaign=launch_2026_11`
- **Pricing:** Free.
- **Thumbnail:** app icon (§4), square.
- **Gallery (5 images, landscape):** build at 1270×760 from the screenshots in §4, each on a bone background with one short caption in Newsreader/Inter Tight, per brand standards. Suggested captions:
  1. "Built for groups that already meet." (group overview)
  2. "Members log proof as they go." (dashboard week)
  3. "Everyone reports at the close." (submit report)
  4. "Every round leaves a record." (reports archive)
  5. "No monthly fee. $1 per forfeit charged." (pricing card)
- **Maker comment (Brandon, signed; "I" is allowed in a signed founder piece per voice-and-tone):**

  I'm Brandon. I run an accountability group that meets on the first Thursday of every month. For a long time we ran it on docs and spreadsheets. Everyone said what they'd do, the month went by, and at the meeting it was hard to say what had actually happened.

  Accountability Guild is what I built for that group. Each cycle has four steps:

  1. Set the standard. The group picks a cadence (weekly, bi-weekly, or monthly), a forfeit amount, and how many hall passes each member gets. Each member writes their own measurable commitments.
  2. Run the cycle. Members log proof as they go: notes, photos, tallies. The group sees activity, not nagging.
  3. Close with receipts. Everyone submits a short report. Misses are tallied, and forfeits are charged to the card on file.
  4. Pool the forfeits. The money goes to the group's kitty, never to us. The group decides what it's for: paying out the top performers, a retreat, or a charity.

  It runs two ways. Owner-led, where a coach or founder sets the terms and reviews reports. Or peer, where the group sets them together.

  There's no subscription. The Standard group plan is free, and we charge a $1 platform fee plus card processing on each forfeit that's actually charged. If nobody misses, we make nothing.

  We're in public beta. What I'd most like to hear from you: if you're in a group like this, what happens today when someone misses?

- **Launch-day rules:** never ask anyone to upvote, anywhere (PH's only hard rule). Ask for visits, comments, and feedback. Reply to every comment within about 2 hours. Share the link with Brandon's group, close contacts, and on our Facebook page that morning.
- **Launch-day Facebook post (optional, goes through the normal social card loop if wanted):** "Accountability Guild is on Product Hunt today. We built it for our own monthly group. If you've ever been in a group where the goals were forgotten by the next meeting, we'd like your honest feedback there." Link in first comment.

### 7.7 Smol Launch

- **Where:** smollaunch.com. Weekly cohorts of 50 free slots, made for a first launch. Book the cohort for the week of Nov 16.
- **Copy:** name, tagline, short description from §4.
- **Link:** `https://accountabilityguild.com/?utm_source=smollaunch&utm_medium=referral&utm_campaign=launch_2026_11`
- **Images:** the five screenshots.

### 7.8 Reddit: r/SideProject and r/alphaandbetausers

Posted by Brandon from his personal account, by hand. This is separate from the one-a-week r/accountability_guild schedule. Follow each subreddit's rules and Reddit's rough 9:1 rule (about one in ten of your posts can be your own thing). Organic titles are statements, never questions. No hashtags.

**r/SideProject (Thu Nov 19).** Title format the sub uses: `[Project name] - [Short description]`.

- **Title:** Accountability Guild - accountability software for groups that meet on a schedule, where missed-goal money stays with the group
- **Body:**

  Our accountability group meets on the first Thursday of every month. It ran on docs and spreadsheets for a long time, and by meeting day it was hard to tell who had actually done what. So we built software for it.

  How it works: the group agrees on how often it meets and what a miss costs. Each member writes measurable commitments and records progress during the month (notes, photos, tallies). At the end, everyone submits a short report, misses are tallied, and the cost is charged to the card on file. The money goes into the group's shared pot. The group decides what it's for.

  No subscription. There's a $1 platform fee plus card processing on each charged forfeit, so if nobody misses, we make nothing.

  It's in public beta: https://accountabilityguild.com/?utm_source=reddit&utm_medium=organic&utm_campaign=launch_2026_11&utm_content=r_sideproject

  The thing we'd most like feedback on: does the money part make you more likely to try this with your group, or less?

**r/alphaandbetausers (Sat Nov 21).** Purpose: recruit beta groups.

- **Title:** Looking for accountability groups to beta test software built for groups that meet monthly
- **Body:**

  We're looking for a few existing groups to try Accountability Guild in its public beta: masterminds, founder groups, workout groups, coaching cohorts, or friends who meet to keep each other on track.

  What it does: members write measurable commitments, record progress as they go, and submit a short report at each meeting. The group can attach a small cost to a miss; that money goes to the group's shared pot, not to us.

  What we'd ask: run one full round (a week or a month) with your group and tell us what didn't work.

  Free to use. There's a $1 platform fee plus card processing only on a charged forfeit, and a group can run with no forfeits at all.

  https://accountabilityguild.com/?utm_source=reddit&utm_medium=organic&utm_campaign=launch_2026_11&utm_content=r_alphaandbetausers

- **Check before posting:** "a group can run with no forfeits at all" rests on `/llms.txt` calling forfeits optional. Brandon to confirm the product allows a $0 forfeit setting before this goes up.
