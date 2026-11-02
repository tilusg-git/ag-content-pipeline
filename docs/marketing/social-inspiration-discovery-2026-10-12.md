# Social inspiration discovery, round 2: long-form text posts

*2026-10-12. Prompted by Brandon: he likes the Good Financial Cents Facebook Page and asked whether AG could adapt its longer text style to our niche. This doc covers (1) what that Page actually does, (2) what fits AG's voice and what doesn't, (3) two new proposed post formats, (4) three full long-form drafts, and (5) the backlog sweep that went into Asana the same day.*

## 1. What Good Financial Cents does

Good Financial Cents is Jeff Rose's Page (CFP, about 809K followers as of today). Rose moved his business from blog display ads to Facebook's Content Monetization program, which pays on engagement. His playbook, as described in a [My Wife Quit Her Job interview](https://mywifequitherjob.com/episode635/):

| Format | Share of his output | What the interview reports |
|---|---|---|
| Screenshot of a viral post (X, Reddit, Threads) plus his own commentary | About 70% | The volume driver. |
| Long-form written post, 500 to 1,000 words, one image | Smaller share | Top earners. One business write-up earned over $3,000. |
| One-sentence text post with a stat | Occasional | A single stat line earned $250 to $300, more than a reel with a million views. |
| Reels | Occasional | Low payout per view. |

Other mechanics: about 24 posts a day, links go in the **first comment** rather than the post body (to protect reach), top performers are **reposted about two weeks later** because most posts are dead after 48 hours, and comments and shares count for more than likes.

The one post visible without logging in today (7 hours old, 1.6K reactions, 200 comments, 220 shares) shows the long-form pattern clearly:

- **Line 1 is the whole hook**, and it has to land before Facebook's "See more" fold (roughly the first 2 to 3 lines on mobile).
- **Line 2 narrows it** with a "not this, but this" move: rules out the obvious reading and names the real subject.
- **Short paragraphs**, often one sentence, so it reads fast on a phone.
- **Recognition over information.** It names a feeling the reader already has. The comments are people agreeing and adding their own version, which is what drives the 200 comments.
- **First person, personal, conversational.**

(Facebook shows only one post to logged-out visitors. If you want a bigger sample, scroll the Page while logged in and paste or screenshot three or four posts you like; I'll break down the structure of each.)

## 2. What fits AG, and what doesn't

**My take: yes, worth doing, as one slot in the rotation rather than a pivot.** Our audience is people who already tried to stay accountable and watched it fade. That's a recognition audience. A long text post that names the moment the group chat went quiet will get comments from exactly the people we want, and comments are what Facebook rewards. It also costs nothing to produce: no image generation, no photo shoot.

What carries over:

| GFC move | AG version |
|---|---|
| One-line hook before the fold | Same. A plain declarative statement. |
| "Not X. Y." narrowing in line 2 | Same, in our voice. |
| Short paragraphs, phone-first | Same. |
| Recognition-first, then a point | Same. Name the situation, then explain it, then (lightly) the structure that fixes it. |
| Ends on a question that invites a story | Same. This is the comment driver. |
| Link in the first comment | Same. Keep the body link-free. |
| Repost winners after about two weeks | Worth adopting for evergreen posts. |
| One-sentence stat post | Adopt as its own format (section 3). |

What does not carry over:

- **Volume emphasis.** GFC uses ALL CAPS words and "nobody talks about it." Voice-and-tone rules out volume; emphasis comes from the sentence itself.
- **Hot takes and generational grievance.** Good for GFC's reach, wrong for a brand that has to be trusted with a card on file.
- **24 posts a day.** That's a monetization-program strategy. We post 2 a week and should stay quality-first.
- **Screenshots of other people's viral posts** as the main format. Our only precedent is Grant's short-form video study post, which needed manual handling. Commentary on a news item or study (our existing `study` slot) is the on-brand version.
- **First-person "I" by default.** Voice-and-tone allows "I" only in founder content, and for the Reddit founder ad Brandon chose "we" (our group) instead of "I". The drafts below use "you" for recognition posts and "we" only where a first party has to speak. A founder long-form post needs Brandon's call on "I" vs. "we" (open question 2).

## 3. Proposed new formats

### `long-form` (new rotation slot)

- **Length:** 250 to 400 words. Under 2,000 characters if it also goes to Instagram (IG captions cap at 2,200, and links there aren't clickable). If it runs long, make it Facebook-only.
- **Anatomy:** hook line → narrowing line → the situation, told plainly → the reason it happens (one ✓ study from the KB if there is one) → what helps, in structural terms → at most one short product paragraph → a question that asks for the reader's own story.
- **Image: optional, decided per card** (`ASSETS: none (text-only)` or a card link). With an image: a plain `gen_card.js` card with the hook line, posted to Facebook and Instagram. Text-only: Facebook only.
- **Link:** first comment, not body.
- **Product mentions:** the post must still be worth reading if the product sentence were deleted (same rule as the blog).

### `one-liner` (new rotation slot)

- One sentence. Either a ✓ stat from the KB or a plain observation. Source link goes in the first comment.
- Cheapest post we can make and, per the GFC numbers, can out-perform heavier formats on comments.

### Tooling gap

Resolved 2026-10-12: `scripts/post_to_meta.js` now posts text-only to Facebook (`/{page-id}/feed`) when `--image` is omitted, and `--first-comment "..."` adds the link comment on each published post. Not yet exercised against the live API; watch the first run.

## 4. Three full long-form drafts

All three are checked against voice-and-tone (no em dashes, no emoji, no exclamation points, sentence case, 1 to 3 hashtags on their own line) and cite only ✓ KB entries. Lengths with hashtags: L1 286 words / 1,655 characters, L2 272 / 1,518, L3 240 / 1,347. All three fit an Instagram caption.

### L1 · Nobody quits their goals out loud (recognition)

> Nobody quits their goals out loud.
>
> No one stands up at the March check-in and says they're done. The check-in just stops happening.
>
> Here's how it usually goes. In January, a few friends agree to hold each other accountable. Someone starts a group chat. Someone else makes a shared spreadsheet: names down the side, months across the top.
>
> The first few weeks are good. People post updates without being asked. The spreadsheet fills in.
>
> Then one person misses a week and doesn't mention it. Nobody else mentions it either, because nobody wants to be the one who nags. The next week, two people skip. By month two, the chat is mostly links and birthday messages. By month three, nobody has opened the spreadsheet since February.
>
> No one failed in a way anyone could point to. Everyone just quietly let everyone else off the hook.
>
> That's the part worth noticing. The goals didn't die because the people were lazy or the goals were wrong. They died because the check-in depended on someone choosing to start it, every time, and eventually nobody did.
>
> What helps is structure that doesn't depend on anyone remembering:
>
> 1. A fixed date. The check-in is on the calendar, not waiting for someone to bring it up.
> 2. A written record. Progress gets logged as it happens, not rebuilt from memory at the meeting.
> 3. A cost for skipping, agreed on in advance, so silence costs more than an honest update.
>
> None of that takes more willpower. It takes deciding once, at the start, so nobody has to decide again in month three.
>
> If you've been in a group that faded, what was the last thing that happened before it went quiet?
>
> #Accountability #AccountabilityGroup

**First comment:** `How Accountability Guild runs the check-in for you: https://accountabilityguild.com/how-it-works?utm_source=facebook&utm_medium=organic&utm_campaign=long_form&utm_content=l1`

### L2 · The people who need a commitment device most are least likely to pick one (research)

> The people who most need a commitment device are the least likely to choose one.
>
> A commitment device is a rule you set for your future self ahead of time. A deposit you lose if you skip the gym. A friend you have to text if the chapter isn't done. Money on the line for a missed week.
>
> They work. A 2014 piece in JAMA by three behavioral researchers described them as inexpensive and effective. But few people take one on voluntarily, and the reason is uncomfortable. On the day you set a goal, you're motivated, and you're confident about your future willpower. You can't picture the tired Tuesday in week five when the goal feels optional. So you skip the safeguard.
>
> The same overconfidence shows up in how goals get written. A 2024 study looked at 512 real goals, written with help from trained professionals. Fewer than 25% said how success would be measured. 93.5% had no plan to track progress at all.
>
> Put those together and you get the most common way a goal ends: a confident start, no measurement, no consequence, and a quiet stop a few weeks in.
>
> The fix isn't more confidence. It's making the safeguard the default instead of an extra step you have to choose. Decide what a miss costs on the day you're motivated, so it's already in place on the day you're not. Doing that inside a group helps, because the stakes are part of joining rather than a separate decision you can talk yourself out of.
>
> What's one goal you would have kept if skipping it had cost you something?
>
> #Accountability #FollowThrough

**First comment:** `The research: Rogers, Milkman & Volpp 2014 https://doi.org/10.1001/jama.2014.3485 · Stewart et al. 2024 https://doi.org/10.1093/intqhc/mzae009`

### L3 · A $25 forfeit isn't about the $25 (money)

> A $25 forfeit isn't really about the $25.
>
> Most people in an accountability group could afford to miss. That isn't why you put money on it.
>
> The money changes the conversation at the end of the month. Without it, a missed commitment gets a shrug. "Busy month." Everyone nods, the group moves on, and the next miss is a little easier.
>
> With a forfeit, the miss has a number attached. It gets written down next to your name. Nobody has to call you out, because the record already did. And the number you agreed to in week one is still there in week three, when the goal starts to feel optional.
>
> Where the money goes matters as much as the amount. If a missed week pays an app company, the company does better when you fail. That's a strange incentive to build a habit around.
>
> In Accountability Guild, forfeits go into the group's kitty, not to the company. The group decides what it funds: the members who kept their commitments, a retreat, or a charity everyone agrees on. Your missed week becomes someone else's good week.
>
> Three rules keep stakes from souring a group:
>
> 1. Pick an amount that stings but doesn't hurt.
> 2. Agree on it together, before anyone has missed.
> 3. Build in a hall pass for the week life genuinely gets in the way.
>
> What amount would actually change your behavior: $5, $25, or $100?
>
> #Accountability #AccountabilityGroup

**First comment:** `How the kitty works, and what it costs (no subscription, $1 per charged forfeit): https://accountabilityguild.com/pricing?utm_source=facebook&utm_medium=organic&utm_campaign=long_form&utm_content=l3`

Note: L3 overlaps in subject with `[Product] The kitty — where forfeits actually go`, which is in Needs review. Run them at least two weeks apart, or let L3 replace it.

## 5. Backlog sweep (carded in Asana 2026-10-12)

All cards went to **Ideas / Backlog**, so nothing drafts until Grant drags one to Drafting.

**Pulled in from existing material (10):**

| Card | Source |
|---|---|
| 7 × `[Quote]`: Churchill, Didion, Douglass, Dweck ("Becoming"), Dweck (fixed vs. growth), Duckworth, Kipchoge | `quote-bank.md` Top shelf. These were the 7 of 10 remaining Top shelf quotes with no card. Clear (outcomes), Clear (environment), and Lencioni were already carded. |
| 3 × `[Study]`: 21-day habit myth, tracking works when prompted and shared, avoid temptation instead of resisting | Reddit drafts P2 to P4 in `reddit-community-posts-2026-10-09.md`, rewritten for Facebook when drafted. |

**Not pulled in, on purpose:** Reddit P5 to P7 (they're Field notes promos, already covered by existing promo cards); the Reddit ad discovery concepts D1 to D5 (they're live or queued ad creative; posting the same image organically would muddy the ad test).

**New from this research (7):**

| Card | Slot | State |
|---|---|---|
| `[Long-form] Nobody quits their goals out loud` | long-form | Full draft above (L1) |
| `[Long-form] The people who need a commitment device most…` | long-form | Full draft above (L2) |
| `[Long-form] A $25 forfeit isn't about the $25` | long-form | Full draft above (L3) |
| `[Long-form] Nobody wants to be the one who nags` | long-form | Angle only. Peer groups fade because someone has to play enforcer; structure removes the role. Mohr 2011 (accountability works through trust, not surveillance). |
| `[Long-form] 11 weeks left in 2026` | long-form | Angle only. Time-sensitive: should post by about Oct 25. Don't scrap the annual goals; pick one and run a short cycle on it. Recount the weeks on the publish date. |
| `[Long-form] Founder: what our group's spreadsheet looked like by month three` | long-form | Needs Brandon's real details. Skeleton only; nothing invented. |
| `[One-liner] Batch of 5` | one-liner | Five options on one card, Grant picks. |

## Decisions (Brandon, 2026-10-12)

1. **`long-form` is approved** as a slot woven into the existing rotation, not a strategic takeover. Quote cards, Field notes promos, product notes and studies stay the backbone.
2. **Founder voice is "we"** (Brandon and his group), matching the Reddit founder ad. Recorded in voice-and-tone.
3. **Image is optional per post.** `scripts/post_to_meta.js` now supports text-only Facebook posts (omit `--image`) and `--first-comment`. A text-only post skips Instagram, which can't publish without media; a post with an image goes to both.

4. **`one-liner` is approved** as its own slot. The original batch card was split into five single-line cards so each one drafts, publishes, and is used once.

## 6. Long-form topic bank (research pass 2, 2026-10-12)

Where these came from: the behavior-science KB (✓ entries not yet used in social), practitioner write-ups on why masterminds and accountability groups fade ([Membergate](https://www.membergate.com/tips/140/Accountability-groups-and-mastermind-circles), [Psychotactics](https://www.psychotactics.com/?p=6839), [a 26-year mastermind operator on Skool](https://www.skool.com/mastermind-skool-4781/ive-run-masterminds-for-26-years-almost-everyone-gets-the-first-step-dead-wrong)), accountability-partner threads ([GTD forum](https://forum.gettingthingsdone.com/threads/gtd-weekly-review-accountability-partner-a-project.6998), [WGBH on accountability buddies](https://www.wgbh.org/news/2025-01-15/ready-to-take-on-a-difficult-goal-heres-how-a-buddy-might-help)), money-stakes experiences ([Beeminder forum](https://forum.beeminder.com/t/goals-with-clear-monetary-value-the-gateway-drug-to-beeminder/12069), [David Seah](https://davidseah.com/?p=4995)), and men's / church small-group guides ([Lifeway](https://www.lifeway.com/articles/the-resoultion-for-men-keys-for-accountability-group-success), [EPM](https://epm.org/resources/2009/Dec/23/accountability-groups-men-helping-men)). Practitioner sources are opinion, not evidence: they shape topics and recognition beats, never stats. Stats come only from ✓ KB entries.

**Recurring themes in what people say kills groups:** people get busy and attendance slips; members at different levels stop getting value; one person disengaging spreads; pushing and shaming backfire; partners go quiet and the arrangement depends on one person's availability; vague goals make the check-in useless. Each maps to a structural fix the product already has, which is why they make good long-form subjects.

★ = carded in Ideas / Backlog today. Unstarred rows stay here for later rounds.

### Research stories (one ✓ study, told plainly)

| | Hook | Source | Point |
|---|---|---|---|
| ★ | Habits don't make your good days better. They stop your bad days from going to zero. | Rebar 2014 (KB #16) | Structure is a floor for low-motivation weeks, which is when a group earns its keep. |
| ★ | Commit to the reps, not the result. | Williamson 2022 (KB #7): process d=1.36, outcome d=0.09 | How to write a commitment you control. |
| ★ | A goal someone else picked for you is easier to quit. | Riddell 2022 (KB #9) | "Have to" goals get abandoned early; "want to" goals persist, and also let you quit the right goals sooner. Members write their own commitments, even in owner-led groups. |
| ★ | Your first cycle shouldn't be pass/fail. | Swann 2020 (KB #10), open goals 2025 (KB #3) | Newcomers given open but measurable goals were more interested in coming back. Start with "log every workout and see where you land." |
| ★ | Tracking every day matters more than having a perfect day. | Burke 2011 (KB #27) | Consistency of tracking, not perfection of behavior, went with success. |
| | In a group, "beat everyone" goals backfire. | Kleingeld 2011 (KB #5) | Contribution framing over leaderboards. (Overlaps one-liner #5; use one or the other.) |
| | What to say right after someone misses. | Burnette 2013 (KB #24) | Mindset matters most right after failure feedback; treat the miss as data for next cycle. Space from the Dweck quote cards. |

### Recognition essays (name the situation, then the structure)

| | Hook | Point |
|---|---|---|
| ★ | The group that meets "when everyone's free" stops meeting. | Busy schedules are the most-cited killer; a fixed date nobody has to negotiate fixes it. |
| ★ | When the most experienced person in the group stops getting anything out of it. | Uneven levels drain the strongest members first. Peer vs. owner-led is a real choice, not a setting. |
| | Watch for the member who goes quiet. | Disengagement spreads; what to do in week two, not month three. |
| | Most groups don't have a goal problem. They have a "what counts" problem. | Vague commitments turn the close into an argument. |

### Group operations (practical, still long-form)

| | Hook | Point |
|---|---|---|
| ★ | How to restart an accountability group that went quiet. | Follow-up to "Nobody quits their goals out loud": one reset message, a date, smaller commitments, a written record. |
| | The 10-minute close. | What a cycle close covers and what it skips. Pairs with the check-ins Field notes article. |
| | Three to seven people. | Too many and members hide; too few and one absence stalls the group. Practitioner consensus, framed as experience. |

### Money

| | Hook | Point |
|---|---|---|
| ★ | Money is the easy part of stakes. The hard part is deciding what counts as a fair miss. | Hall passes and mid-cycle revisions are features, not loopholes (Riddell 2022 supports revising unattainable goals). |

### Seasonal (date-bound)

| | Hook | Post by | Note |
|---|---|---|---|
| ★ | December is where weekly commitments go to die. | About Dec 1 | Plan a lighter holiday cycle on purpose instead of letting it lapse. |
| ★ | Mid-January is when most resolutions quietly stop. | About Jan 8, 2027 | Strava coined "Quitter's Day" from its activity data (Jan 17 in 2019, Jan 19 in 2020; [GearJunkie](https://gearjunkie.com/health-fitness/strava-quitters-day-fitness-resolution)). External company data, not a KB study: attribute it to Strava, use no other numbers, and re-verify before posting. |
| | Don't set your 2027 goals alone. | Late Dec | The year-start version of the group pitch. |

### Founder ("we")

| | Hook | Needs from Brandon |
|---|---|---|
| ★ | How our group picked its forfeit amount. | The real amount, how the group decided it, and whether it changed. |
| | The first month most of us missed. | Only if it happened. Nothing invented. |
