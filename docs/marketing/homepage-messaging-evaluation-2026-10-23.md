# Homepage messaging evaluation

*2026-10-23. For Brandon's review. Evaluated the live homepage at accountabilityguild.com (desktop at 1440 and 800 wide, mobile at 375), its metadata, and the next steps a visitor takes (`/how-it-works`, `/pricing`, `/app/create-account`). The product ground truth comes from the app repo's feature docs on `origin/main` (`groups`, `onboarding`, `marks`, `reports`, `penalties`, `group-fund`, `group-invites`, `cycles`) and the screenshots in `docs/product/screenshots-2026-10-03/`. No site code was changed.*

## Summary

Your hunch holds, and it's worse than a framing problem: **the homepage describes a product that differs from the one that ships.** Six things it sells don't exist (hall pass, recovery prompts, an activity feed, group-set terms in peer mode, three built-in kitty policies, PDF receipts), and its one forfeit example ("$20 per missed report") contradicts the real formula. Meanwhile the moments that make the product good are missing or buried: the contract everyone signs before the cycle starts, partial-credit forfeits, marking the week in a minute, the report in your own words, and a kitty ledger where every withdrawal is visible.

The voice, the founder note, and the "money stays with the group" framing are strong and should stay. The page's problem is substance and order, not tone.

What to do, in order:
1. **Make the page true** (quick, CMS-only): remove or relabel the six features that don't exist and fix the forfeit line. Same fixes on `/how-it-works`, `/pricing`, `/llms.txt`, and the launch listing copy before Nov 16.
2. **Re-aim the page at the organizer's real question**: "what would this replace, what will I ask my people to do, and what does the money involve?" Lead with the cycle as a member experiences it, then the money with the real math.
3. **Show the real product.** Replace the illustrative dashboard with real screens (the explainer-video demo group unblocks this), and put the price above the fold.

**Where the work happens:** the homepage now lives in a separate repo, `accountabilityguild/www` (Next.js + Payload CMS). Every headline, body line, sample line, and list item is a CMS field Grant can edit at `cms.accountabilityguild.com`; only section order, section types, and the title tag need an engineer. That makes most of this list cheaper than it looks. (`repo/src/app/page.tsx` is a stale copy; CLAUDE.md should be updated.)

## Positioning decisions for you

Copy can't settle these. My recommended answer is first in each.

| # | Decision | Recommended answer | Why |
|---|---|---|---|
| P1 | **Who is the page for?** | The **organizer** of a small group that already meets (3 to 8 people), currently running on a chat, a doc, or a spreadsheet. Members are a secondary reader: make sure an invitee who looks the site up can find "what am I agreeing to, where does my card get charged, who holds the money" in one section. | The organizer is the one who signs up, configures everything (the product has one owner), and invites. Invitees land on `/app/i/<code>/accept`, not the homepage. |
| P2 | **What do we do about owner-led vs. peer?** | **Drop "two modes" as a product claim.** Say: one person sets the group up; the group agrees the terms before the first cycle opens. Keep coach and friends as *examples* of who runs groups, not as modes. | The product has no peer mode: every setting is owner-only. Today's section promises "Group-set cadence / Group-set penalty". Fold it back in when joint setup ships. |
| P3 | **How hard do we lead with money?** | **Second, not first.** Lead with the cycle (the record of who did what), then money as the reason it holds. Put the price ("no monthly fee") above the fold as a fact, not the headline. | Ad B tests price-first; the ad plan's own rule is not to decide on paper. The homepage has to serve both ads, so carry the price line in the hero without making it the promise. Revisit after the day-20 CTR read. |
| P4 | **Do we keep the "Vol. 01 / Issue №01 / working manual" editorial frame?** | **Keep the visual language, drop the copy that costs clarity.** Remove "Members only" (signup is open) and "A working manual" as the hero eyebrow. Rename "Read the manual" to something that says what's there. | The brand is editorial; that's ratified. But the eyebrow and CTA labels are prime first-screen space spent on metaphor. |
| P5 | **What do we say about kitty uses?** | "Your group agrees what the kitty is for. The owner pays it out, and every withdrawal shows the amount and the reason to the whole group." Keep retreat, payout, and charity as examples of what groups do, not as product settings. | Matches `group-fund.md`. Already raised as decision 2 in `how-it-works-pillar-plan-2026-10-19.md`; one answer settles both pages. |
| P6 | **Which forfeit model do we explain publicly?** | The real one: the group sets an amount per cycle; it's split across each member's goals; you forfeit the share you missed. One worked example. | It's the fairest, most distinctive mechanic in the product, and it answers "what if I mostly do it?" No competitor we list explains partial stakes. |

P2, P5, and hall pass are the same open decisions as in the how-it-works plan (§5, items 1 to 3). Answering them once unblocks the homepage, `/how-it-works`, `/pricing`, `/llms.txt`, and the launch copy.

---

## 1. The page as it is (condensed from the checkpoint)

**Metadata:** title "Accountability Guild | Goal & Accountability Software for Group" (singular "Group" reads as a typo; hard-coded in www `src/app/(site)/page.tsx`). Description and OG: "Accountability software for groups that want to follow through. Set goals, track progress, share proof, and use agreed-upon consequences to stay accountable." OG image `/opengraph-image`.

| # | Section | Headline copy | Notes |
|---|---|---|---|
| 0 | Masthead/nav | "Vol. 01 · Cycle Infrastructure · Established 2026 · Members only" | Mobile: nav links hidden, no menu button. |
| 1 | Hero | "Follow-through, made *visible* to the people you owe it to." Lede: "A deliberate piece of software for accountability groups that meet on a cycle…" CTAs "Start a group →", "Read the manual". Stats: Cadence / Group setup / The kitty. | No price, no product image on mobile's first screen. |
| 1b | Sample "Live cycle" panel | 3d 14h · 11/14 reports · $320 kitty · 82% follow-through; four members' commitments | Illustrative; not a screen the product has. |
| 2 | Thesis | "Most habit apps are *private* mirrors…" | |
| 3 | Four acts | "Four acts. *Set*, *run*, *close*, *pool*." | Sample "Forfeit · $20 per missed report. Hall-pass · 1 per cycle." |
| 4 | Two modes | "Built for groups that want an *operating rhythm*…" | Unattributed quotes; "Group-set penalty". |
| 5 | Six mechanics | "Six small mechanics, doing the work that group chats can't." | Three of six don't exist. |
| 6 | Kitty | "When someone misses, the money *stays with the group*." | Three policies presented as product. |
| 7 | Founder note | First-Thursday group story | True, strong. |
| 8 | Pricing | "One plan. *No monthly fee.*" | Lists PDF receipts, hall pass. |
| 9 | Resources | "Guides for groups *actually running* cycles." | Read times 3/1/1 min look wrong; one card is the misplaced `/startup-accountability-system`. |

Next steps: `/how-it-works` repeats sections 3 and 5 nearly verbatim (same wrong sample line). `/pricing` matches the homepage. "Start a group" opens a generic account form (first name, email, phone, password, SMS consents), then `/dashboard?welcome=1`; group setup is a separate step after that.

## 2. The experience it should convey (condensed from the checkpoint)

**Organizer:** signs up, then five setup steps: name the group; "How often, how much" (cadence, first cycle date, stake per cycle with $100 default, percentage or pass/fail scoring, report window); goal categories; up to 20 email invites; "The contract, on paper." Then a forming state with a countdown to Cycle 01 and invite statuses (nudge, resend, withdraw). Owns all settings, decides exception cases at close, and pays out the kitty to their Stripe account with a reason the whole group sees.

**Member:** invite email with the contract summary → "You are in." → account → save a card ("Where we will pull from if you miss") → write goals (category, sentence, cadence, check or count, target). Through the cycle: "page through the week and mark what you did, whenever you sit down" (done / missed / skip or a count, optional note and photo). Report window: score each goal and write what happened; the report is public to the group and nobody else can edit it. At close: stake split across goals, you forfeit the share you missed (example: $100, 5 goals, one at 75% and one at 0% = $25); no report = full stake; charged automatically; $1 and Stripe's fee come out of the forfeit; a late report earns a 10% credit next cycle. The group page shows the kitty ledger by member.

**Distinctive moments:** (1) signing the contract before anyone starts; (2) partial-credit forfeits; (3) marking the week in a minute; (4) the report in your own words; (5) the ledger, every dollar visible, none to the company.

**Primary visitor:** the organizer of an existing small group. Arrives from Reddit ads (recognizes the problem, or curious about price), launch boards from Nov 16 (has read listing copy, curious), a little organic, and occasionally a member checking legitimacy. Question: "Would this run our check-ins better than what we do now, what will I ask my people to do, and what does the money part involve?"

## 3. Scorecard

Observed = on the page or in the code/docs. *Inferred* = my judgment of visitor reaction; no traffic data was used (see §6).

| Lens | Score | Evidence |
|---|---|---|
| 1. Five-second test | **Adequate** | *What:* "software for accountability groups that meet on a cycle" is clear. *Who:* groups, yes; organizer, not named. *Why care:* the H1 is a promise without a mechanism; the only money cue is a stat label, "Forfeits stay with the group," which assumes you know what a forfeit is. *Next:* "Start a group" is clear. Masthead "Members only" contradicts open signup. No price above the fold, though ad B sends price-curious clicks here (flagged in the ad plan §3). |
| 2. Experience articulation | **Weak** | Every product image is illustrative, and the hero panel (everyone's progress plus a follow-through rate) isn't a screen the product has. Of the five moments: contract **buried** (one clause in act 1, "names the group's cycle, the cadence, the consequence"); partial-credit forfeits **missing and contradicted** ("$20 per missed report"); marking the week **told** ("A note. A photograph. A tally."); report in your own words **told** ("a short report"); ledger **missing** (the kitty section shows uses, not the ledger). |
| 3. Audience fit | **Adequate** | Group-not-solo is stated well (thesis, "Built for groups… not another private habit tracker," founder note: "It assumes the room"). But the organizer's job (inviting people, asking them to put a card on file) is never addressed, and the modes section promises a product difference that doesn't exist. The mode quotes ("I needed everyone reporting against the same rules…") look like testimonials but are unattributed. |
| 4. The money mechanic | **Weak** | Framing is right: "When someone misses, the money *stays with the group*," "not to us." But objections go unanswered or answered wrong. *What if I miss?* Wrong formula. *Mostly do it?* Not covered (it's partial credit). *Who holds the money?* Never said (Stripe holds it; the owner pays it out; withdrawals are visible). *What does it cost?* "$1 platform fee plus standard card processing" without saying it comes out of the forfeit, not on top. "Charged only for a miss" never appears. |
| 5. Differentiation | **Adequate** | Habit apps (thesis) and group chats (mechanics H2) are named. Spreadsheets and docs, the actual incumbent per the founder story and ad A, are not. The stickK/Beeminder contrast (money goes to the group, not the company; partial stakes) is implied, never stated. |
| 6. Proof and credibility | **Weak** | The founder note is true and the best thing on the page. Everything else is asserted: illustrative data, unattributed quotes, and six features a beta user would find missing. "Public beta" appears once, in a CTA eyebrow. No research, though ✓ KB #21 (Harkin 2016) directly supports the mechanic. |
| 7. Hierarchy and flow | **Weak** | Ten sections, about 15 screens on mobile. The $1 fee is stated four times (kitty body, kitty footer, pricing subhead, pricing card); the four acts and the six mechanics overlap; modes come before the visitor knows what a cycle feels like. Pricing sits at about screen 11 on mobile. |
| 8. CTA and next step | **Adequate** | One action, repeated, good. But nothing says what happens after the click (five setup steps, invite your people, nothing is charged until a cycle closes with a miss), and the click lands on a generic account form asking for a phone number and SMS consent, then a dashboard, not group setup. "Read the manual" leads to a page that repeats the homepage. `/how-it-works` CTA says "Create a founder account." |
| 9. Consistency | **Weak** | Homepage, `/how-it-works`, `/pricing`, `/llms.txt`, and the launch listing copy (`free-launch-plan-2026-10-22.md` §4) agree with each other, but on claims the product doesn't support (hall pass, peer mode, three policies, PDF receipts). Ad A's "part or all of it goes into a shared pot" is *more* accurate than the homepage. Cadences undersold: product also offers every 4 weeks and quarterly. Old $19/mo and $79/mo tiers still sit in `repo/src/lib/marketing-content.ts` and the www seed file `seed/legacy-marketing-content.ts` (not rendered, but `/llms.txt`-style regeneration could pick them up). |
| 10. Voice and terminology | **Adequate** | Tone is on-brand: plain, editorial, no em dashes, no emoji. Glossary misses: "Hall-pass" (→ hall pass), "penalty" ×4 (→ forfeit), "goals" for commitments in act 2, "The app collects…" (glossary: never "the app" in marketing), "group kitty" is fine. "We made the mirror *public*" is "we" in a display line (voice-and-tone: avoid "we" in marketing headlines). |
| 11. Mobile | **Weak** | No nav menu at all (links hidden, no toggle). The product panel starts below the first screen and stacks its four stats one per row, so the "show" takes 1.5 screens of big numbers before any commitment appears. Message survives (H1 and lede render well), proof doesn't. |

## 4. Recommendations

### Positioning decisions
P1 to P6 are at the top of this doc.

### Copy and structure fixes

**C1. Make every product claim true.** Impact high · effort low · confidence high.
- *Problem:* "Hall-pass, optional," "Recovery prompts," "Group visibility: A shared feed of activity," "Group-set cadence / Group-set penalty," the three kitty "policies," "Cycle-close PDF receipts," and "Forfeit · $20 per missed report." None match the product (`groups.md`, `group-fund.md`, `penalties.md`; no PDF generation or activity events in `src`).
- *Recommendation:* replace each in the CMS now; repeat on `/how-it-works`, `/pricing`, `/llms.txt`, and the launch listing copy before the Nov 16 launch week. Replacement mechanics that are real: the contract, partial-credit forfeits, late-report credit, the ledger, reports nobody else can edit.
- *Example copy (replacing two of the six mechanics):*
  - A: "**Partial credit, not all or nothing.** Your stake is split across your goals. Hit 75% of one, and you forfeit a quarter of its share."
  - B: "**Your report, your words.** Score each goal and write what happened. The group reads it; nobody else can edit it."

**C2. Rebuild the money section around the real math and the obvious objections.** Impact high · effort medium · confidence high.
- *Problem:* "Every penalty paid into the system becomes the property of the group. We take a flat $1 platform fee plus standard card processing." No formula, no "who holds it," no "on top or out of."
- *Recommendation:* one worked example plus three short answers: when you're charged, where the money sits, who can pay it out. Use the how-it-works plan's worked example (§4) once the Stripe rate is confirmed; label it illustrative.
- *Example copy:*
  - A: H2 "Miss a commitment, and the forfeit goes to your group." Body: "Your group sets one amount per cycle, say $100. It's split across your goals. Miss one entirely and keep the rest: $20 to the kitty, less the $1 platform fee and card processing. Hit everything and nothing is charged."
  - B: H2 "The money is the group's. Every dollar is on the ledger." Body: "Forfeits are charged to the card you saved, automatically, at the close. The kitty holds them for the group. When the owner pays it out, every member sees the amount and the reason."

**C3. Replace the illustrative dashboard with real screens, one per act.** Impact high · effort medium · confidence medium.
- *Problem:* hero panel and act samples are invented ("Cycle 18 · +$60 to kitty · running balance $440"); a visitor can't picture the app.
- *Recommendation:* use the explainer-video demo group (plan §9.1) to capture four real stills: the contract review (step 5), "Mark the week," a filed report, the ledger with a balance. Use them as the four acts' visuals; the hero gets the "Mark the week" grid. This is the same capture request already with Brandon's agents, so it costs one extra still list, not a new project.
- *Example copy (hero image caption):* A: "Day 17 of 31. Mark what you did, whenever you sit down." B: "What your group sees: the week, marked."

**C4. Answer "what would this replace" in the organizer's terms.** Impact medium · effort low · confidence medium.
- *Problem:* the page argues against habit apps and group chats; the founder story and ad A say the real incumbent is "a shared doc and someone chasing updates." No section speaks to that.
- *Recommendation:* rewrite the thesis block as the before/after of running the group, using the founder's own situation.
- *Example copy:*
  - A: "Most groups run on a shared doc and one person chasing updates. Accountability Guild keeps the record instead: what everyone committed to, what they marked, what they reported, and what it cost."
  - B: "A group chat remembers who talked. It doesn't remember who did the work. Accountability Guild keeps that record, cycle after cycle."

**C5. Tell the organizer what happens after "Start a group."** Impact medium · effort low · confidence high.
- *Problem:* "Sign up to start a group and invite the people who will run the cycle with you." is the only next-step copy; the click lands on a generic form.
- *Recommendation:* add a three-step "what happens next" line near each primary CTA; separately, route homepage "Start a group" to `/app/create-account?step=group` (app ticket: signup should continue into group setup, not stop at the dashboard).
- *Example copy:* A: "Create your account. Set the terms in five short steps. Invite your group; nothing is charged until a cycle closes." B: "Five minutes to set up. Your group signs the same terms before the first cycle opens."

**C6. Cut and reorder to the visitor's questions.** Impact medium · effort medium (section order is code) · confidence medium.
- *Problem:* ten sections, the $1 fee four times, modes before experience, pricing at screen 11 on mobile.
- *Recommendation:* the order in §5 below. Merge the six mechanics into the four acts; fold modes into one "who runs it" band; merge kitty and pricing into one money section.

**C7. Use one ✓ research line as proof of the mechanism.** Impact low · effort low · confidence medium.
- *Problem:* nothing on the page says why visible tracking works.
- *Recommendation:* one line in the cycle section, citing KB #21 (Harkin et al., 2016, *Psychological Bulletin*, 138 randomized experiments): monitoring progress improves goal attainment, and the effect is larger when progress is reported publicly and physically recorded. Link the DOI.
- *Example copy:* A: "Tracking progress works better when it's written down and reported to other people. That's the finding of a review of 138 experiments (Harkin et al., 2016)." B: "Writing it down helps. Reporting it to people helps more (Harkin et al., 2016, 138 randomized experiments)."

### Quick wins (do regardless)

| # | Fix | Where | Effort |
|---|---|---|---|
| Q1 | Title tag "…Software for Group" → "Accountability Guild: Accountability Software for Small Groups" (or similar; keep under 60 characters). | www `page.tsx` (code) or `homepage.meta` (CMS) | Low |
| Q2 | Add "No monthly fee" to the hero stats row (the ad plan's fix for ad B message match). Example: "Cost · No monthly fee. $1 per forfeit charged." | CMS `heroStats` | Low |
| Q3 | Masthead "Members only" → "Public beta". | CMS `site-nav.masthead` | Low |
| Q4 | Glossary pass: "Hall-pass" (remove), "penalty" → "forfeit," "goals" → "commitments," drop "the app." | CMS | Low |
| Q5 | Remove the unattributed mode quotes, or replace with a real, permissioned quote from Brandon's group. | CMS | Low |
| Q6 | Add a mobile nav menu (links are hidden with no toggle). | www code | Low |
| Q7 | Check the resource cards' read times (3, 1, 1 min); the reporting-template article page is about 1,000 words including chrome. Swap the `/startup-accountability-system` card until that article moves to `/blog/`. | CMS | Low |
| Q8 | `/how-it-works` CTA "Create a founder account" → "Create an account"; rename the homepage "Read the manual" to "See how a cycle works." | CMS | Low |
| Q9 | Delete the $19/mo and $79/mo tiers from `repo/src/lib/marketing-content.ts` and the www seed file so nothing regenerates them. | Both repos | Low |

## 5. Proposed messaging hierarchy

**One-line promise (keep the H1):** "Follow-through, made *visible* to the people you owe it to." Change the lede to say the mechanism and the money in one breath, for example: "Accountability Guild runs your group's check-ins on a cycle: everyone signs the same terms, marks progress as they go, and files a report at the close. Missed commitments pay into your group's kitty, never to Accountability Guild."

| # | Supporting point | Proof |
|---|---|---|
| 1 | **Everyone agrees the terms before anyone starts.** One person sets it up; the group signs the same contract. | Real screen: step 5 "The contract, on paper." The invite email carries the terms. |
| 2 | **Progress is marked as it happens, and reported in each member's own words.** | Real screens: "Mark the week," a filed report. Harkin 2016 (✓ KB #21). |
| 3 | **The money is fair, automatic, and the group's.** Partial credit per goal; charged at close; held for the group; every withdrawal visible. | Worked example; real ledger screen; "$0 monthly fee." |
| 4 | **Built by a group that runs on it.** | Founder note (first-Thursday group). Public beta, stated plainly. |

**Section order this implies:**
1. Hero: promise, mechanism-and-money lede, "Start a group" + "See how a cycle works," stats row with price, real "Mark the week" image.
2. What it replaces (C4): the doc, the chat, the person chasing updates.
3. One cycle, four acts, each with a real screen and the mechanics folded in (points 1 and 2).
4. The money: worked example, three objection answers, price (point 3; merges today's kitty and pricing sections).
5. Who runs it: coaches, founder groups, friends, workout groups, as examples of one setup, not modes.
6. Founder note (point 4).
7. What happens after you click (C5) + CTA.
8. Field notes (three cards, optional; consider moving below the footer CTA or dropping on mobile).

## 6. Open items

- **Traffic data not used.** The app's `LandingPageViewEvent` table (production) would show the real source mix and homepage → `/create-account` click-through, which would test P1 and P3. I haven't queried it; it needs your OK because it touches production.
- **Facts still to confirm with Brandon** (some are already in the explainer plan §9.4): whether members see each other's marks mid-cycle; whether the card is charged for a missed report as well as a missed goal (the card screen says both); Stripe's actual processing rate for the worked example; whether any form of peer setup is planned soon enough to keep the word.
- **Downstream copy to fix with C1:** `/how-it-works`, `/pricing`, `/llms.txt` (Payload `site-settings`), the launch listing master copy (`free-launch-plan-2026-10-22.md` §4, before Nov 16), and the CLAUDE.md core-mechanic section.
