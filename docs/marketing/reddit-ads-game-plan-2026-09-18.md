# Reddit advertising game plan and execution runbook

**Status (2026-10-09):** month 1 is built in Ads Manager. See [`reddit-ad-creative-plan-2026-10-01.md`](./reddit-ad-creative-plan-2026-10-01.md) §4 "Month 1 build" for what was entered. That doc supersedes this one on creative, budget, subreddits and UTMs. The Pixel is deferred. What follows is the original v2 status.

**Status:** v2, updated 2026-09-18 after Brandon's review. Budget moved from $100/month to **$5-10/day** ($150-300/month). Not yet executed, no ad account created.
**Goal:** a concrete, sequenced plan and step-by-step process to start testing Reddit as a signup channel next week.

## 1. Set expectations at $5-10/day

Reddit's platform minimums and typical costs, from current (2026) pricing data:

| Metric | Value |
|---|---|
| Minimum daily budget | $5/day, $25 lifetime, per campaign |
| Typical CPC | $0.75-$2.00 (range $0.50-$3.50) |
| Typical CPM | $3.50-$15 (median ~$6.50) |
| Budget generally considered trustworthy for optimization | $50-100/day for 1-2 weeks ($500-1,500 total) |

At $5-10/day ($150-300/month) you clear Reddit's own floor with room, and over a 30-day flight that's roughly 75-300 clicks depending where CPC lands. That's still short of the volume needed to trust a CPA number, but it's enough to read directional signal: which creative gets clicked, which subreddit responds, whether the ad account stays in good standing. Treat month 1 as **calibration**, not a channel to judge final ROI on. Decide whether to scale month 2 based on qualitative signal (clean ad review, positive or neutral comment reception, any traced account creations) plus whatever CPC/CTR trend shows, not on a CAC calculation the sample can't yet support.

## 2. Scheduling: always-on vs. specific days

Reddit Ads does **not** have Meta/Google-style dayparting (choosing specific hours or days of the week for an ad to run). What it does offer:

- **Start and end date only.** A campaign runs continuously from its start date unless you set an end date. There's no native toggle for "only run Tuesday-Thursday" or "pause on weekends."
- **Budget type changes delivery pacing, not scheduling.** A **Daily Budget** caps spend evenly per day. A **Lifetime Budget** lets Reddit's delivery system shift spend toward higher-performing days on its own within the flight, you don't choose which days, Reddit's algorithm does, based on real-time engagement.
- **Manual pause/resume is the only way to force specific days.** If there's a real reason to believe AG's audience only browses relevant subreddits on certain days (e.g., Sunday-night goal-setting behavior, which is a plausible pattern for a weekly/monthly cadence product), the only way to act on that is to manually pause the campaign in Ads Manager on the off days and resume it, there's no automated schedule for this.

**Recommendation:** don't try to hand-schedule days in month 1. Run a **Lifetime Budget** flight (e.g., $210 over 30 days at the $7/day midpoint) and let Reddit's own pacing find the better days. Revisit manual day-restriction only if the data after 30 days shows a clear day-of-week pattern worth forcing.

## 3. Compliance and setup, before any spend

Do these in order; each gates the next.

1. **Ad account + business verification.** Reddit requires identity verification for advertisers (2026 policy tightened this). Use the business entity, not a personal Reddit account, so the "Promoted" label reads as a company, not an individual astroturfing.
2. **Read Reddit's financial-services ad policy before writing any creative.** AG charges real money automatically (forfeits, card on file, pooled kitty), that combination of "money is on the line" and "card gets charged automatically" is exactly the shape of claim Reddit's ad review scrutinizes for financial products, even though AG isn't investment/lending/crypto. Do not submit creative that leads with the dollar mechanic (e.g. "Miss twice, $50 to the kitty") until the ad account is verified and a first low-stakes ad (plain, no dollar amount) has cleared review. Escalate to Reddit support if an ad gets flagged rather than resubmitting the same copy.
3. **Landing page.** Per the CLAUDE.md discrepancy note, live CTAs already route to `/create-account`. Point conversion-intent ads straight there. For colder, top-of-funnel community targeting, consider landing on one of the money-stakes whitespace articles instead (Section 7), with its own in-page CTA to `/create-account`, a softer landing for someone who just saw an ad from a stranger link inside a community they trust.

## 4. Reddit Pixel and Conversions API setup

There's no Reddit Pixel or Conversions API integration in the codebase yet (confirmed by grep across `repo/src`), only GA4 (`repo/src/components/marketing-analytics.tsx`). This is what's needed to add it.

### What the Pixel is and how it works

The Reddit Pixel is a small JavaScript snippet, structurally almost identical to the GA4 loader already in the codebase. The pattern:

```html
<script>
  !function(w,d){/* Reddit's loader snippet, generated at pixel creation time in Ads Manager */}(window,document);
  rdt('init', 'YOUR_PIXEL_ID');
  rdt('track', 'PageVisit');
</script>
```

- `rdt('init', ...)` runs once, on every page, with the advertiser's Pixel ID (get this from Reddit Ads Manager > Events Manager when the pixel is created, it's a one-time step).
- `rdt('track', 'EventName')` fires a specific conversion event. Event names are **case-sensitive**.
- `PageVisit` fires automatically once the pixel is initialized, no extra work needed for that one.

Because the codebase already has a working pattern for exactly this shape of thing (`MarketingAnalytics` in `repo/src/components/marketing-analytics.tsx`, using Next.js `Script` components gated behind an env var), the cleanest implementation is a parallel `RedditPixel` component following the same convention: gated behind `NEXT_PUBLIC_REDDIT_PIXEL_ID`, loaded the same way, with `rdt('track', ...)` calls added at the specific points in the app where a conversion actually happens (not just on page load).

### Reddit's 8 standard events, and what to map them to for AG

| Reddit standard event | Fire it when... | AG mapping |
|---|---|---|
| `PageVisit` | Any page loads | Automatic, no work needed |
| `ViewContent` | User views a specific content page | Optional: fire on `/pricing` or `/how-it-works` view |
| `Search` | User searches on-site | Not applicable, AG has no on-site search |
| `Lead` | User expresses interest, before full conversion | Fire when someone **starts** the create-account flow (submits step 1 / enters email). Useful because it'll have more volume than full signups while the ad account is still low-traffic. |
| `SignUp` | User completes registration | Fire on **completed account creation**. This is the primary event to optimize toward. |
| `AddToCart` / `AddToWishlist` | Ecommerce cart actions | Not applicable |
| `Purchase` | Transaction completes | Could map to the first forfeit charge or the $1 platform fee, but this happens too far downstream (end of a full cycle) to be useful as an ad-optimization signal at launch. Revisit once SignUp volume is healthy. |

**Recommendation for month 1:** wire up `PageVisit` (automatic) and `SignUp` (fired in the account-creation success handler) only. Add `Lead` in month 2 if `SignUp` volume is too thin to read.

### Conversions API (CAPI), for later, not month 1

CAPI sends the same events server-side instead of (or alongside) the browser pixel, which matters once ad blockers or browser tracking restrictions start eating a meaningful share of client-side pixel fires. Setup requires:

- An **access token**, generated once in Reddit Ads Manager under Events Manager > Conversions API. Reddit shows this token exactly once at creation, save it immediately (in whatever secrets store the team already uses, per the existing pattern in `scripts/post_to_meta.js`'s gitignored `secrets/` convention).
- Capturing Reddit's **click ID** (`rdt_cid`), which Reddit appends as a URL parameter when someone clicks a Reddit ad. This needs to be read off the landing URL and carried through the signup flow (e.g., stashed in a first-party cookie or a hidden form field) so the server-side event can be matched back to the original ad click.
- **Deduplication**: if both the browser pixel and CAPI report the same real-world action (e.g., the same signup), each needs to carry a shared event/conversion ID so Reddit's system merges them into one counted conversion instead of two.

**Recommendation:** skip CAPI for month 1. It's real engineering work (server-side event sending, click-ID plumbing, dedup logic) that isn't justified until the pixel-only setup proves the channel is worth optimizing harder. Revisit once volume and budget both increase.

### The engineering ticket, summarized

A scoped, single ticket: add `NEXT_PUBLIC_REDDIT_PIXEL_ID` env var, add a `RedditPixel` client component mirroring `MarketingAnalytics`'s structure, call `window.rdt('track', 'SignUp')` in the existing account-creation success path. No CAPI, no `Purchase` event, no new backend work.

## 5. Targeting: how Reddit's targeting actually works

Four targeting types exist. For a $5-10/day budget, lean almost entirely on the first:

- **Community targeting** (target specific subreddits). Highest-intent, most efficient option at this budget, and the one to build the whole campaign around. This is where nearly all the spend should go.
- **Interest targeting** (broad categories like "Personal Finance" or "Fitness"). Casts a much wider net than community targeting; skip it at this budget, it dilutes an already-small daily spend across an audience too broad to learn anything from.
- **Keyword targeting** (serves to users who recently posted or commented on specific terms). Worth a small second ad group once the community campaign is running clean. Good AG keyword candidates: "accountability partner," "commitment device," "beeminder alternative," "stickk alternative," "mastermind group," "need to stay accountable," "goal tracker."
- **Audience/retargeting** (Pixel-based site-visitor retargeting or lookalikes). Not usable until the Pixel exists (Section 4) and there's enough site traffic to build a retargeting pool. Skip for month 1.

### Subreddit shortlist

Subscriber counts below are pulled from third-party subreddit-ranking sites, not Reddit's own live data, confirm actual current size and self-promotion rules directly in Ads Manager's community picker before launch, numbers drift and Ads Manager will show the real current figure at targeting time.

| Subreddit | Est. size | Why it fits | Note |
|---|---|---|---|
| r/accountability | Not reliably found in public rankings (small/niche) | Direct name match, Brandon has been watching this one. Small, tight-knit peer community. | Include it, but lead with the safest creative variant here (Section 7, "problem-first"), not the money-mechanic one, and watch the comments closely after launch, a small community notices being advertised to. |
| r/getdisciplined | ~2M | Explicit consistency/procrastination struggle, high-intent | Peer mode |
| r/DecidingToBeBetter | ~1.3M | Committing to change, follow-through framing matches AG's core mechanic | Peer mode |
| r/selfimprovement | ~2.4M | Largest hub, broadest reach, softest intent | Better for the article landing page than for direct `/create-account` clicks |
| r/productivity | Large, active | Systems-minded audience, receptive to "structure beats willpower" | Owner-led / founder-adjacent |
| r/EntrepreneurRideAlong, r/startups, r/Entrepreneur, r/smallbusiness | Large | AG's real whitespace per the existing SEO audit is group + money-stakes, founders running accountability pods or masterminds are underserved | Owner-led coach/founder groups |
| r/beeminder, r/StickK | Small (exact size unconfirmed, check in Ads Manager) | Users here already understand and use the "money as commitment device" concept, closest possible intent match to AG's actual mechanic | Conquesting play, best paired with keyword targeting on "beeminder alternative" / "stickk alternative" rather than community targeting alone if these communities turn out too small to target directly |
| r/GetMotivated | Large | High volume, lower intent | Awareness only, don't spend limited conversion budget here |

Keep month 1 to **3-4 subreddits maximum** in one ad group (r/accountability, r/getdisciplined or r/DecidingToBeBetter, and one founder-adjacent sub is a reasonable starting set). More than that dilutes an already-thin daily spend further and makes it impossible to tell which community, if any, is responding.

## 6. Budget and campaign structure, month 1

$5-10/day ($150-300/month), single campaign:

- **Objective:** Traffic for the first 1-2 weeks, then switch to Conversions once the Pixel's `SignUp` event has a few real fires to optimize against. Turning on Conversions optimization with zero conversion history just makes Reddit's delivery system guess.
- **Budget type:** Lifetime Budget over a 30-day flight (Section 2), letting Reddit's pacing find the better days automatically rather than a flat daily spend.
- **Structure:** one ad group, community targeting on 3-4 subreddits from Section 5, 3 creative variants (Section 7) rotated to see which framing and format perform, at this volume this is still directional signal, not statistical confidence.
- **What "success" looks like:** the ad gets approved and runs without a policy flag, CPC lands in the expected $0.75-$2 range (confirms targeting isn't misconfigured), the Pixel fires and shows up in Events Manager, and at least a handful of `SignUp` events trace back to Reddit. That's the gate for "worth scaling spend," not a finished CAC number.

## 7. Ad creative: specs and drafted concepts

> **Superseded in part (2026-10-01, revised 2026-10-02):** see [`reddit-ad-creative-plan-2026-10-01.md`](./reddit-ad-creative-plan-2026-10-01.md) for the updated creative strategy, the subreddit evaluation, and the revised budget (about $100/month as a 20-day, $5/day flight with one ad group; this replaces the $5-10/day budget in §1 and §6). The Pixel ticket in §4 is now a ready-to-paste OpenClaw prompt: [`reddit-pixel-openclaw-prompt-2026-10-02.md`](./reddit-pixel-openclaw-prompt-2026-10-02.md). It adds a signup-page shell catch, a `GroupLaunched` custom event, and a privacy-page update.

### Format specs (2026)

| Format | Specs | Fit for AG |
|---|---|---|
| **Image ad** | 1080x1350 (4:5 portrait, recommended), 1080x1080 (1:1), or 1920x1080 (16:9). JPG/PNG/GIF, max 3MB (GIF becomes a static thumbnail). Headline: keep to ~100 characters even though the platform allows up to 300 (150 in-feed / 100 in conversation placements before truncation). | Cheapest to produce, most reliable starting format |
| **Free-form ad** | Text + image + link combined into one post that reads like a detailed organic submission. No strict body character limit, shorter still wins. | Best fit for the founder-story concept below, matches Reddit's native culture and the brand's own allowance for first-person "founder content" voice |
| **Carousel ad** | 2-6 cards, up to 300 characters per card headline | Good fit for walking through the 4-act cycle using copy that's already on-site and brand-approved |
| **Video ad** | MP4/MOV, up to 1GB, 15 min max, 30fps, H.264 recommended. Front-load the message in the first 3 seconds, always upload a custom thumbnail. | Skip for month 1, no video asset exists yet and it's not worth producing one before the channel is validated |

Reddit's own 2026 data shows a 108% conversion lift when a logo is visible in the creative. Include the italic-A monogram mark (per `docs/brand/brand-standards.md`) small and in a corner, not overwhelming the plain aesthetic, no gradients, ember accent only, per brand rules.

### Three creative concepts to test against each other

All copy follows `docs/brand/voice-and-tone.md`: sentence case, no em dashes, no exclamation points, no emoji, no question-mark headlines, concrete over abstract.

**1. Founder story (free-form ad, top recommendation, safe to run immediately)**
Reddit's own best-practice research says founder-voiced content outperforms corporate messaging here, and AG's voice-and-tone doc already carves out first-person "I" specifically for founder content, this format and this account are made for each other.

> Headline: I built this for my own accountability group's first Thursday of the month
> Body: A few of us meet once a month to report on what we said we'd do. Accountability Guild is the tool I built to run that meeting: everyone writes a measurable commitment, logs proof as they go, and reports at the close. Miss it, and the forfeit goes into the group's own kitty. Not to us.
> CTA: See how a cycle works -> `/how-it-works`

**2. Problem-first (image ad, safe to run immediately, no dollar framing)**

> Headline: Accountability partners flake. A group with a shared deadline doesn't.
> Description: Set a measurable commitment. Report at the close. See what the group sees.
> CTA: Learn more -> whitespace article, e.g. [`startup-accountability-system`](../../repo/src/lib/marketing-content.ts) or [`designing-consequences-that-increase-follow-through-without-burning-trust`](../../repo/src/lib/marketing-content.ts)

**3. The cycle, step by step (carousel ad, hold for week 2+ once the account has a clean review history)**
Reuses copy that's already live and brand-approved on the homepage (`repo/src/lib/marketing-content.ts`), so there's no new claim to get flagged, just a walkthrough.

> Card 1: 1. Create your accountability group
> Card 2: 2. Members set measurable goals
> Card 3: 3. Report during the period
> Card 4: 4. Close, charge, and review results
> CTA: Start your first cycle -> `/create-account`

**4. Mechanic-first (image ad, hold until the ad account has a clean review history, per Section 3.2)**

> Headline: Miss your commitment. The forfeit goes to your group, not to us.
> Description: Accountability Guild pools missed commitments into your group's kitty. Set the cadence, name the amount, run the cycle.
> CTA: Get started -> `/create-account`

**Sequencing recommendation:** launch concepts 1 and 2 immediately (both safe under the financial-services policy). Add concept 3 once the account has a clean review. Hold concept 4 until there's real evidence the account isn't being flagged, and get an explicit go/no-go from Brandon before it ever runs (see Open Questions).

## 8. What NOT to do

- Don't spread spend across 5+ subreddits or multiple objectives at once, each slice becomes too small to read.
- Don't turn on Conversions optimization before the Pixel has fired any real `SignUp` events, Reddit will optimize toward nothing.
- Don't lead creative with the dollar-forfeit mechanic before the ad account has a clean review history.
- Don't try to hand-build a day-of-week schedule, Reddit doesn't support it natively (Section 2); use a Lifetime Budget instead.
- Don't expect this to move the needle on the site's DR-0/unindexed problem (per the SEO audit, that's a separate and higher-priority fix), Reddit ads drive direct clicks, not search authority.
- Don't run this as a "set and forget" spend, check the Reddit Ads dashboard at least twice a week; at $5-10/day a policy rejection or a targeting misfire can still burn a meaningful share of the week's budget before anyone notices.

## 9. Parallel track: organic community engagement (no ad spend)

Even at $5-10/day, paid alone won't build community trust as fast as showing up in these same communities without a company badge on it:

- Use the existing `reddit-reply` skill to draft non-promotional replies to threads in r/getdisciplined, r/DecidingToBeBetter, r/accountability, r/productivity where someone is describing the exact problem AG solves (flaking accountability partners, no consequence for missed goals, wanting a group with stakes).
- This builds founder credibility and, per Reddit ad best-practice research, founder-voiced organic presence in a community measurably improves how paid ads from the same account are received later, this isn't a substitute for the paid test, it's what makes the paid test land better once it starts, especially in r/accountability itself.
- Zero budget cost, so it can start immediately, doesn't need to wait on ad account verification.

## 10. Step-by-step execution runbook

Follow in order. Steps within the same numbered block can happen in parallel.

**Setup (start immediately, before any ad spend)**
1. [ ] Create the Reddit Ads Manager account under the business entity and submit identity verification (can take a few days to process, start first).
2. [ ] In parallel: start organic replies via the `reddit-reply` skill, 2-3 threads a week across r/getdisciplined, r/DecidingToBeBetter, r/accountability, r/productivity. No dependency on ad account approval.
3. [ ] In parallel: hand the engineering ticket from Section 4 to whoever builds the Next.js work, add `NEXT_PUBLIC_REDDIT_PIXEL_ID`, add a `RedditPixel` component mirroring `MarketingAnalytics`, fire `SignUp` on account-creation success.
4. [ ] Once the ad account exists, create the Pixel in Events Manager and retrieve the Pixel ID for the engineering ticket above.

**Creative (can start before verification finishes)**
5. [ ] Produce the image asset(s) for concepts 1 and 2 (Section 7): 1080x1350 primary size, italic-A monogram mark in a corner, ember accent only, no gradients, per brand standards.
6. [ ] Draft and internally review the founder-story free-form ad copy (concept 1) and problem-first image ad copy (concept 2). Get Brandon's sign-off on the founder-story copy specifically, since it speaks in his own voice.

**Launch**
7. [ ] Once identity verification clears and the Pixel is confirmed firing on a test signup, submit concepts 1 and 2 for ad review.
8. [ ] Set up the campaign: Traffic objective, Lifetime Budget (~$210 for a 30-day flight at the $7/day midpoint), community targeting on the 3-4 subreddits chosen from Section 5.
9. [ ] Launch once both creatives clear review. Do not submit concept 4 (mechanic-first) yet.

**Monitor and iterate**
10. [ ] Check the Ads Manager dashboard at least twice a week: spend pace, CPC, any policy flags, comment sentiment on the ad post itself (especially in r/accountability).
11. [ ] Around week 2, if the account has a clean review history and no negative comment activity, submit concept 3 (carousel) and consider switching the objective to Conversions now that `SignUp` events have started accumulating.
12. [ ] At day 30: review CPC, click volume, `SignUp` events traced to Reddit, and comment/community reception. Decide with Brandon whether month 2 scales budget, changes subreddits, greenlights concept 4, or pauses paid entirely in favor of the organic track.

## Open questions for Brandon

- Confirm there's no existing Reddit ad account or prior campaign history to build on (this plan assumes a cold start).
- Sign off on the founder-story ad copy (Section 7, concept 1) since it's written in first person as if from Brandon directly, and confirm the "first Thursday of the month" detail is fine to use in paid creative.
- Decide whether to greenlight concept 4 (mechanic-first, "the forfeit goes to your group") at all once the account has clean history, or keep all paid creative to the safer framings indefinitely.
- Decide who owns checking the Reddit Ads dashboard twice a week during the test window, and who's the engineering owner for the Pixel ticket (Section 4).

---
Sources consulted: Reddit Ads pricing/minimum-budget and scheduling guides (Stackmatix, Aimers, Feedheat, 2026), Reddit Ads targeting and creative-spec overviews (Stackmatix, Promodo, SubredditSignals, StrikeSocial, Vizup, Busylike, 2026), Reddit Pixel/Conversions API documentation and third-party integration guides (Reddit Ads Help, The Ad Spend, Biloba IT, react-reddit-pixel on GitHub, 2026), Reddit Ads financial-services policy (Reddit Ads Help), subreddit community sizing (ClickUp, DeadSubs, ReddTrends, TheVCCorner, 2026). No AG-specific Reddit ad account, pixel, or campaign history exists yet to benchmark against; all subscriber counts and exact character-limit/placement rules should be confirmed live in Ads Manager at setup time.
