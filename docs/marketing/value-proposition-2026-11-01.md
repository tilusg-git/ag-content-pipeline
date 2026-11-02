# Value proposition canvases

*2026-11-01. Draft for Grant's review. Built on the six-field Value Proposition template from Product Compass (persona, job to be done, before, how, after, alternatives). No site copy, Figma, Asana, or homepage doc was changed.*

**Status:** draft, all sections. Personas reviewed by Grant 2026-11-01: Peer is fine as a persona (not a product mode); a group can't run without money at stake (Grant's understanding, Brandon to confirm); headlines may say "goals" and tie them to "commitments" where possible. Section D follows those answers.

## How to read the tags

- `[src: file §section]` points to the source of a claim. Product facts come from the app repo's feature docs on `origin/main` (2fd1dd7, 2026-10-14), not the local `repo/` checkout, which is 356 commits behind.
- `[KB #n]` is a ✓ entry in `docs/research/behavior-science-knowledge-base.md`. No ⚠ or ✗ entry is used.
- **ASSUMPTION — needs Brandon/Grant** marks anything without a source, including every scene detail no doc records.

## Ground rules this draft follows

1. **The How field lists only features that exist.** The homepage evaluation found six claimed features that don't ship: hall pass, recovery prompts, an activity feed, group-set terms (peer mode), built-in kitty policies, and PDF receipts [src: `homepage-messaging-evaluation-2026-10-23.md` §Summary, C1]. None of them appear in a How field below.
2. **Pricing comes from live `/pricing`:** no monthly fee, one free Standard group plan, $1 platform fee plus card processing per forfeit charged [src: accountabilityguild.com/pricing, fetched 2026-11-01]. The $19/mo and $79/mo tiers in `repo/src/lib/marketing-content.ts` are stale [src: CLAUDE.md "Known discrepancies"].
3. **Peer mode is a persona here, not a product mode.** The product has one owner per group; every setting is owner-only. No feature doc on `origin/main` mentions a peer mode [src: `homepage-messaging-evaluation-2026-10-23.md` P2; `git grep peer origin/main -- docs/features` returns nothing]. The Peer canvas describes what a peer group gets from the product as it ships today. Gap E1 covers the difference.

---

## A + B. The canvases

### Shared product facts (both canvases draw on these)

| # | Fact | Source |
|---|---|---|
| F1 | One person creates the group in five steps: name it; set cadence, first cycle date, stake per cycle (default $100), scoring (percentage or pass/fail), and report window; pick commitment categories; invite up to 20 people by email; review "The contract, on paper." | `homepage-messaging-evaluation` §2; `docs/features/onboarding.md` (Protocol step, $100 default) |
| F2 | Cadences: weekly, bi-weekly, every 4 weeks, monthly, quarterly. Fixed-week cycles run 1 to 13 weeks. | `homepage-messaging-evaluation` §3 lens 9; `docs/features/cycles.md` (reportingCadence); `admin-super-admin.md` (`cycleLengthWeeks` 1–13) |
| F3 | Commitment categories are fitness, faith, family, personal, professional. | `src/app/api/groups/[id]/settings/route.ts:42`; `group-goals-composer.tsx` |
| F4 | Invites go by email; the owner can resend, revoke, or nudge, and sees each invite's status before Cycle 01. | `capability-ui-inventory.md` (invite rows); `docs/features/groups.md` §Forming roster |
| F5 | Each member saves a card before the first cycle. No money moves at this step; the screen shows the stake, cadence, first possible charge date, and what triggers a charge. | `docs/features/groups.md` §Card authorization setup; `capability-ui-inventory.md` (Billing/payment method) |
| F6 | Members write their own commitments: one sentence, a category, daily/weekly/monthly marking, check or count. | `docs/features/groups.md` §Step 02 goal composer; `capability-ui-inventory.md` (create goal, tracking modes) |
| F7 | Members mark progress as it happens (done, missed, or a count) with an optional note and photo. Marks lock once the cycle closes. | `goal-mark-evidence.md`; `capability-ui-inventory.md` (mark days, proof photos) |
| F8 | At close, each member scores each commitment and writes what happened. The group can read it; the owner cannot edit a member's evidence. | `docs/features/reports.md` §purpose; `goal-mark-evidence.md` §Permissions |
| F9 | A cycle summary email sends every active member each member's full report, including the written narrative. | `docs/features/notifications.md:104` (`cycle_summary`) |
| F10 | The stake is split across a member's commitments. In percentage scoring, you forfeit the share you missed; in pass/fail, the full share of each failed commitment. No report means the full stake. The total is capped at the stake. | `docs/features/penalties.md` §Current behavior; `reports.md:84` |
| F11 | Forfeits are charged to the saved card automatically at close. A late report earns a credit worth 10% of the missed-report forfeit on the next cycle. | `docs/features/penalties.md` |
| F12 | The kitty is the sum of forfeits minus Stripe's fee and the $1 platform fee. Both come out of the forfeit, not on top. | `docs/features/group-fund.md` §Balance calculation |
| F13 | Only the owner pays the kitty out (Stripe Connect), with a reason every member sees. Paid withdrawals are visible to every active member. Payout fee: $0.00. | `docs/features/group-fund.md` §Current behavior |
| F14 | Owner tools: member roster and progress, deactivate/remove members, transfer ownership, refund a charge, approve or deny a member's refund request, decide exception cases at close (for example a member with no active commitments). | `capability-ui-inventory.md`; `docs/features/penalties.md` (exception review) |
| F15 | SMS: the owner can set up a group text thread, send the cycle summary to it, and turn on silence nudges. **Verify on `origin/main`**: this comes from the inventory dated 2026-05-04. | `capability-ui-inventory.md` (SMS rows) |

**Worked example (illustrative):** $100 stake, five commitments, so $20 each. Hit three fully, one at 75%, one at 0%: $5 + $20 = $25 forfeited [src: `homepage-messaging-evaluation` §2]. The kitty receives $25 less the $1 platform fee and Stripe's fee. At Stripe's standard 2.9% + $0.30, that fee is about $1.03, so about $22.97 reaches the kitty [src: `business-evaluation-2026-05-15.md` reference pricing]. **The actual Stripe rate is unconfirmed** [src: `homepage-messaging-evaluation` §6].

---

### Canvas 1: Owner-led

**1. Persona: the organizer who runs the group**

A coach, a church small-group or men's-group leader, or someone running a program, with 4 to 10 people who already meet or check in on a schedule. They set the terms, invite people, and are the one who notices who went quiet.
- Organizer as the buyer: `homepage-messaging-evaluation` P1 ("organizer of a small group that already meets (3 to 8 people)").
- Group size 4–10, one clear owner: `business-evaluation-2026-05-15.md` §First 10 Group Plan.
- Coaches/facilitators and faith groups as segments: `business-evaluation` §Primary Customer Hypotheses.
- Church groups as example groups: CLAUDE.md, homepage redesign v2 direction.

**2. Job to be done**

*When I'm responsible for a group's progress, I want everyone's commitments, progress, and results in one record that runs on schedule, so I can spend our meeting on the people instead of chasing updates and doing penalty math.*
- "Who has to remind people?" and "What part is most awkward or manual?" are the owner interview questions: `business-evaluation` §Interview Guide.
- "Owner reports the app saved time or reduced awkwardness" is the owner retention signal; support target under 15 min/group/month: `business-evaluation` §Retention, §Unit economics.
- Supportive accountability needs a person the member sees as trustworthy and expert, with clear, process-based expectations the member helped set [KB #22 Mohr 2011]. The owner is that person in this mode.

**3. Before (the scene)**

- It's the night before the group meets. The organizer opens the shared doc to see who did what this month. Three of seven rows are blank. They text each person separately, then copy the answers in by hand. [src: `homepage-messaging-evaluation` C4, "a shared doc and one person chasing updates"; scene details ASSUMPTION — needs Brandon/Grant]
- Commitments were said out loud at the last meeting, and nobody wrote down how they'd be measured. At the meeting, "I mostly did it" is the answer nobody can check. [Real-world goals rarely include a measure (under 25%) and 93.5% have no monitoring plan at all: KB #8 Stewart 2024. The meeting detail: ASSUMPTION — needs Brandon/Grant]
- If there's a penalty, the organizer works out who owes what, then has to ask people for money: friends, clients, or members of their church. [src: `business-evaluation` §Competitive landscape, "manual overhead… awkward collections"; scene details ASSUMPTION — needs Brandon/Grant]
- For a coach: clients pay for sessions, but between sessions nothing records whether the work happened. [ASSUMPTION — needs Brandon/Grant]

**4. How (features that exist)**

- Set the terms once, in five steps, and invite people by email with the terms in the invite. [F1, F4]
- Everyone sees and agrees to the same terms before the cycle opens: the contract review at setup, and the card screen showing the stake and what triggers a charge. [F1, F5]
- Members write their own commitments; the organizer doesn't have to write them. [F6]
- Members mark progress as they go, with notes and photos. [F7]
- Reports at close in each member's words; the organizer can read them but can't edit them. [F8]
- Every member gets the cycle summary with everyone's report. [F9]
- Forfeits are calculated and charged automatically, with partial credit. [F10, F11]
- Owner controls: roster and progress view, exception decisions at close, refunds, member removal, ownership transfer. [F14]
- Kitty payouts with a reason everyone sees. [F12, F13]
- Optional SMS: group thread, cycle summary, silence nudges. [F15, verify]

**5. After (the scene)**

- The night before the meeting, the organizer opens the group page. Six of seven reports are in; the seventh member has a full forfeit recorded and has been charged. Nobody was texted. [F8, F10, F11; scene ASSUMPTION — needs Brandon/Grant]
- The meeting starts from what people wrote, not from "so, how'd everyone do?" [F8, F9]
- Nobody asks anybody for money. The card was saved before the cycle, the charge is automatic, and the amount follows the scoring everyone agreed to. [F5, F10, F11]
- When the group decides to spend the kitty, on a retreat or a gift, the organizer pays it out and every member sees the amount and the reason. [F13]
- Why it should work: tracking progress causally improves goal attainment, and the effect is bigger when progress is written down and reported to others [KB #21 Harkin 2016]. Goals work better when set publicly and as a group [KB #1 Epton 2017]. Commitments the member writes themselves hold up better than ones they're told to keep [KB #9 Riddell 2022].

**6. Alternatives:** see section C. For this persona the closest substitutes are the shared doc plus group text, paid coaching, and the honor system.

---

### Canvas 2: Peer

**1. Persona: the member who ends up keeping the list**

One person in a group of equals (friends, a founder group, a workout crew) who already meet or check in. Nobody is the boss, but one of them keeps the spreadsheet and holds the pot, usually the one who suggested stakes in the first place.
- Friend groups, founder groups, workout groups: CLAUDE.md "Two group modes".
- "Existing friend accountability groups · Informal group leader · Replaces spreadsheets, Venmo, texts, and manual penalty math": `business-evaluation` §Primary Customer Hypotheses.
- Brandon's own first-Thursday group as the reference case: CLAUDE.md Overview; `voice-and-tone.md` (confirmed real story).
- In the product this person becomes the owner. Peer equality is handled by everyone signing the same terms, not by shared settings. [Gap E1]

**2. Job to be done**

*When my friends and I agree to hold each other to something, I want the terms, the results, and the money to be fair and automatic, so nobody has to play cop and the stakes actually get paid.*
- "Did the penalty feel fair?" and "Members understand and trust penalty calculations" are member interview questions and a continue gate: `business-evaluation` §Interview Guide, §Decision Gates.
- In peer groups, reciprocity carries supportive accountability, not one person's expertise [KB #22 Mohr 2011; KB "Implications" bullet 3].
- Framing commitments as your contribution to the group beats competing with each other [KB #5 Kleingeld 2011].

**3. Before (the scene)**

- The group text on the first of the month: "How'd everyone do?" Two people reply. One sends a thumbs-up. The rest say they'll update later. [src: `business-evaluation` §Competitive landscape, "group text thread… no structured cycles, reporting state, penalty ledger, or reliable close process"; scene details ASSUMPTION — needs Brandon/Grant]
- The pot is a line in someone's Notes app: "$20 a miss." By March, three people owe money, nobody has paid, and asking a friend for $40 feels worse than letting it go. [src: `business-evaluation` §Competitive landscape, "awkward collections"; amounts and scene ASSUMPTION — needs Brandon/Grant]
- Someone "mostly" did it. Does that count as a miss? The group argues about it or quietly lets it slide. [Partial credit as the answer to "what if I mostly do it": `homepage-messaging-evaluation` §3 lens 4; scene ASSUMPTION — needs Brandon/Grant]
- The person who keeps the list starts to feel like the group's enforcer. [ASSUMPTION — needs Brandon/Grant]

**4. How (features that exist)**

- One person sets the group up; everyone reviews and accepts the same terms before the first cycle opens. [F1, F5]
- Everyone writes their own commitments. [F6]
- Everyone marks progress as they go, with notes and photos. [F7]
- At close, everyone's report goes to everyone: on the group page and in the cycle summary email. Nobody can edit anyone else's report. [F8, F9]
- Partial credit settles "mostly did it" by the scoring the group picked at setup. [F10]
- Forfeits are charged automatically; no one collects. [F11]
- The kitty ledger shows every dollar in and out; paid withdrawals are visible to all. [F12, F13]
- If the list-keeper wants out, ownership transfers to someone else. [F14]

**5. After (the scene)**

- First Thursday. Everyone has read everyone's report before they sit down. [F9; first-Thursday group from CLAUDE.md; scene ASSUMPTION — needs Brandon/Grant]
- Two people missed something. They were charged at close: one $25, one $5. Nobody had to bring it up. [F10, F11; amounts illustrative]
- The pot is real money on a ledger everyone can see, and the group decides together what it's for. [F12, F13; "the group decides" is a group agreement, not a product setting: `homepage-messaging-evaluation` P5]
- The list-keeper is just a member again. [ASSUMPTION — needs Brandon/Grant]
- Why it should work: the same monitoring and public-reporting evidence as Canvas 1 [KB #21, KB #1]. Commitment devices work, but few people choose them on their own [KB #28 Rogers 2014]. Joining a group at a high-motivation moment is how the KB suggests the product gets around that; this is the KB's own implication, not a tested finding [KB "Implications" bullet 2].

**6. Alternatives:** see section C. For this persona the closest substitutes are group chat + spreadsheet, a Venmo or cash pot, and the honor system; the closest competitors are stickK and Beeminder.

---

### Proposed third canvas (not built): church small groups and men's groups

It probably earns its own canvas, for four reasons:
1. **The money question is different.** Some congregations read money stakes as gambling [src: `beachhead-segment-scoring-2026-11-01.html`, church segment, Georgia Baptist Mission Board (secondary)]. The v2 homepage frames money as optional [CLAUDE.md], but the product requires a saved card (Gap E4). This persona's Before/After and objections differ from both canvases.
2. **The product already has a faith category** [F3].
3. **The substitutes are different.** "Christian accountability" apps are mostly screen monitoring, not commitment tracking [src: beachhead scoring, faith.tools (secondary)].
4. **The buyer is often one leader over several groups** [beachhead scoring, unverified], which is an owner-led job at a different scale.

Build it only if Grant confirms church groups are a target segment rather than an example on the homepage.

---

## C. Alternatives and value curve

### Relative pricing

| Option | What the group pays | Where missed-commitment money goes | Source |
|---|---|---|---|
| **Accountability Guild** | $0 subscription. $1 platform fee + card processing per forfeit charged, taken out of the forfeit. Nothing if nobody misses. | The group's kitty | live `/pricing`; F12 |
| stickK | Free basic; group Campaign plans $19/mo (All-Access) to $99/mo (Pro) | Recipient the user picks (charity, anti-charity, friend). **Verify** | `business-evaluation` reference pricing (May 2026); recipient: ASSUMPTION — needs Brandon/Grant |
| Beeminder | Free core; charged on derail, lowest charge $5 | To Beeminder. **Verify** | `business-evaluation` (May 2026); destination: ASSUMPTION — needs Brandon/Grant |
| Coach.me | Habit coaching $25/week or $87/month; leadership coaching $150/month | No stakes | `business-evaluation` (May 2026) |
| Group chat + spreadsheet | $0 | Nowhere (no stakes) or a manual pot | `business-evaluation` §Competitive landscape |
| Venmo / cash pot | $0 for personal transfers | The group, if it gets collected | ASSUMPTION — needs Brandon/Grant |
| Honor system | $0 | Usually nowhere: promised, not paid | ASSUMPTION — needs Brandon/Grant |
| Paid coaching (outside an app) | Coach's fee | No stakes | ASSUMPTION — needs Brandon/Grant |
| Doing nothing | $0 | n/a | n/a |

Competitor prices are from the May 2026 business evaluation and were not rechecked for this draft.

### Value curve

Scale 1 to 5, **5 = best for the group** on every row: for "cost" 5 = cheapest, for "setup effort" 5 = least ongoing work for the organizer, for "where forfeits go" 5 = stays with the group. **Every non-AG score is a judgment, ASSUMPTION — needs Brandon/Grant.**

| Factor | **AG** | stickK | Beeminder | Coach.me | Chat + sheet | Venmo/cash pot | Honor system | Paid coaching | Nothing |
|---|---|---|---|---|---|---|---|---|---|
| Group visibility | **4** | 2 | 1 | 2 | 3 | 2 | 2 | 2 | 1 |
| Recurring cycle | **5** | 2 | 3 | 3 | 2 | 1 | 2 | 4 | 1 |
| Proof logging | **4** | 3 | 5 | 4 | 3 | 1 | 1 | 2 | 1 |
| Money stakes | **5** | 4 | 4 | 1 | 1 | 3 | 2 | 2 | 1 |
| Where forfeits go | **5** | 3 | 1 | 1 | 1 | 5 | 1 | 1 | 1 |
| Cost to the group | **5** | 4 | 4 | 2 | 5 | 5 | 5 | 1 | 5 |
| Setup effort | **4** | 3 | 2 | 3 | 2 | 2 | 5 | 3 | 5 |

Why AG scores what it does:
- **Group visibility 4:** every report goes to every member at close [F8, F9]. Not 5 because whether members see each other's marks mid-cycle is unconfirmed [`homepage-messaging-evaluation` §6] and the activity feed doesn't exist.
- **Recurring cycle 5:** the cycle is the core unit: cadences from weekly to quarterly, scheduled opens and closes, report windows [F1, F2].
- **Proof logging 4:** marks with counts, notes, and photos [F7]. Not 5 because nothing is automatic: no device or app integrations. (Beeminder's 5 assumes its integrations, ASSUMPTION.)
- **Money stakes 5:** automatic charge to a saved card, with partial credit per commitment [F10, F11].
- **Where forfeits go 5:** to the group's kitty, less $1 and processing; the ledger shows it [F12, F13].
- **Cost to the group 5:** no subscription; the fee only applies when a forfeit is charged and comes out of the forfeit [live `/pricing`; F12].
- **Setup effort 4:** five setup steps for the organizer, then each member saves a card and writes commitments [F1, F5, F6]. After that, the close runs without the organizer [F11]. Not 5 because asking members to save a card is real friction (owner interview question: "What would make you stop using it after one cycle?" `business-evaluation` §Interview Guide).

What the curve shows: AG is the only option high on visibility, cycle, and stakes at once, at no subscription cost. The honor system and doing nothing win on effort and cost and lose everywhere else. Beeminder wins on proof logging. The spreadsheet and Venmo pot together cover most rows, but only with the organizer's manual work.

---

## D. Messaging blocks

Copy rules applied: `voice-and-tone.md` (second person, short declarative sentences, no em dashes, no humor, no emoji, no "we" in marketing lines, sentence case) and `glossary.md` ("kitty," "forfeit," "Accountability Guild" not "the app"). Every line maps to a feature in the How fields; the bracket after each line names it. Brackets are for review and don't ship.

**Goals and commitments (Grant, 2026-11-01):** headlines may say "goals." Where the copy has room, tie the two words together so readers learn that a goal becomes a commitment once it's written down, at-stake, and reported on. Patterns:
- Headline "goals," sub copy "commitments": "Write your goals. Your group holds you to them." / "Each goal becomes a commitment: marked as you go, reported at the close."
- One sentence that bridges: "Your goals, written down as commitments your group can see."
- Don't swap the words back and forth inside one paragraph without the bridge.

**Money is not optional.** A group can't run without a stake (Grant's understanding; Brandon to confirm, Gap E4). Nothing below calls money optional. The lines say what the money does and where it goes instead.

### Owner-led: the organizer

**Value proposition (one sentence)**

> Accountability Guild keeps your group's record for you: everyone's goals, progress, and reports on one schedule, with missed commitments charged automatically to your group's kitty, so you lead the meeting instead of chasing it.

[F1, F7, F8, F11, F12]

**Benefits**

- **Stop chasing updates.** Members mark progress as they go and file a report at the close. You read them before you meet. [F7, F8, F9]
- **Everyone agrees to the same terms.** You set the cadence, the stake, and the scoring once. Every member sees them before the first cycle opens. [F1, F5]
- **Their goals, their words.** Each member writes their own goals as commitments and reports on them in their own words. You can read every report. You can't edit one. [F6, F8]
- **You never ask anyone for money.** Forfeits are charged at the close to the card each member saved. [F5, F11]
- **The kitty belongs to your group.** You pay it out, and every member sees the amount and the reason. [F13]

### Peer: the member who keeps the list

**Value proposition (one sentence)**

> Accountability Guild gives your group one set of terms everyone accepts, reports everyone reads, and a shared pot that gets paid without anyone collecting it.

[F1, F5, F9, F11, F12]

**Benefits**

- **Same terms for everyone.** One person sets the group up. Everyone reviews and accepts the same terms before the first cycle opens. [F1, F5]
- **Everyone reads everyone's report.** At the close, each report goes to the whole group. Nobody can edit anyone else's. [F8, F9]
- **"Mostly did it" has an answer.** Your stake is split across your commitments. Hit 75% of one and you forfeit a quarter of its share. [F10; percentage scoring only]
- **Nobody has to collect.** Missed commitments are charged automatically at the close. [F11]
- **Every dollar is on the ledger.** Accountability Guild takes $1 per forfeit charged, plus card processing. The rest is your group's, and every payout shows the amount and the reason. [F12, F13]

### Why not just use X

| Alternative | Line | Depends on |
|---|---|---|
| stickK | stickK sets up one person's commitment contract. Accountability Guild puts your whole group on one cycle, and forfeits go to your group's kitty. | Open question 6 (stickK's recipient options) |
| Beeminder | Beeminder tracks one person's data. Accountability Guild puts your whole group on the same cycle, and the money stays with the group. | Open question 6 (where Beeminder's charges go) |
| Coach.me | Coach.me sells coaching by the week or month. Accountability Guild has no monthly fee and runs a group that already meets, with or without a coach. | `business-evaluation` pricing, May 2026, recheck |
| Group chat + spreadsheet | A group chat remembers who talked. Accountability Guild remembers who did the work and does the forfeit math. | adapted from `homepage-messaging-evaluation` C4 option B |
| Venmo or cash pot | A shared pot only works if someone asks for the money. Accountability Guild charges the card each member saved, at the close. | F5, F11 |
| Honor system | The honor system holds until the first miss. Accountability Guild records the miss and charges the forfeit, so nobody has to bring it up. | F10, F11 |
| Paid coaching | A coach sees your work once a session. Accountability Guild records it between sessions, at no monthly fee. | F7; live `/pricing` |
| Doing nothing | In a study of 512 real goals, 93.5% had no plan for tracking progress. Accountability Guild builds the tracking in. | KB #8 Stewart 2024 (health-care goals; keep the domain caveat if the line runs alone) |

---

## E. Gaps and contradictions

### Where the canvases disagree with current copy

| # | Gap | Canvas says (product) | Current copy says | Where |
|---|---|---|---|---|
| E1 | **Peer mode** | One owner holds every setting; peers are equal through shared terms and shared reports, not shared settings. | "Peer: members share the rules… without a central administrator"; "Owner-led or peer mode" | `llms.txt`; live `/pricing`; `/how-it-works`; CLAUDE.md "Two group modes"; `glossary.md` (owner-led, peer) |
| E2 | **Features that don't ship** | None in How. | Hall pass, activity feed, cycle-close PDF receipts, kitty policies as settings | `llms.txt`; live `/pricing` ("Optional hall-pass settings", "group activity feed", "PDF receipts") |
| E3 | **Forfeit formula** | Stake split across commitments; forfeit the share missed. | "$20 forfeit per missed report" | live `/how-it-works` (act 1 sample) |
| E4 | **Money as optional** | The card is a required setup step; stake defaults to $100, with $50/$100/$200/$500 chips and custom. Whether the setup UI accepts $0 is unverified (the admin API allows 0). | v2 homepage frames money as optional | CLAUDE.md homepage v2; `onboarding.md`; `guided-onboarding-flow.tsx:3583` |
| E5 | **"Redistribute to top performers"** | Kitty uses are a group agreement; the owner pays out. The KB warns that competitive framing backfires in groups [KB #5 Kleingeld; KB Implications bullet 7]. | Listed as a kitty policy | CLAUDE.md core mechanic §4; `llms.txt` |
| E6 | **Cadences** | Weekly through quarterly, plus 1–13 week fixed cycles. | "Weekly, bi-weekly, monthly" | live `/pricing`; `/how-it-works`; `llms.txt`; `glossary.md` (cadence) |
| E7 | **Fee mechanics** | $1 and processing come out of the forfeit; nothing is charged unless someone misses. | States the fee but not "out of, not on top" or "only on a miss" | live `/pricing`; homepage (`homepage-messaging-evaluation` §3 lens 4) |
| E8 | **"Contract" vs "commitment"** | The product's setup step is titled "The contract, on paper." | v2 homepage replaced "contract" with "commitment" | CLAUDE.md homepage v2; `homepage-messaging-evaluation` §2 |
| E9 | **"Goals" vs "commitment"** | The glossary says "commitment," and allows plain-language swaps only in Field notes. | v2 homepage uses "goals" in headlines, with product terms in the sub copy. The product UI also says "goals." | `glossary.md`; CLAUDE.md homepage v2; `groups.md` goal composer |
| E10 | **"Activity signals" mid-cycle** | Unconfirmed whether members see each other's marks before close. | "Group sees activity signals, not pressure" | CLAUDE.md core mechanic §2 |
| E11 | **Who holds the money** | Stripe holds it; the owner pays out via Stripe Connect; every withdrawal is visible. | Not said anywhere public | live `/pricing` (silent) |
| E12 | **Stale pricing in code** | No subscription. | $19/mo, $79/mo tiers | `repo/src/lib/marketing-content.ts` (known) |

### Open questions for Grant

**Answered 2026-11-01 (Grant):**
- *Peer mode:* Peer stays a persona, not a product mode. E1's copy fix: drop "peer mode" and "without a central administrator" from `llms.txt`, `/pricing`, and `/how-it-works`; describe peer groups as "one person sets it up, everyone accepts the same terms." `glossary.md` (owner-led, peer) needs the same change.
- *Money as optional:* Grant believes a group can't run without money at stake. If Brandon confirms, the v2 homepage's "money framed as optional" (E4) promises something the product doesn't do. A truthful version: say what the money does and where it goes ("missed commitments pay into your group's kitty"), not that it's optional. This also weakens the church-group canvas (see the proposal above): that persona's main objection has no product answer yet.
- *"Goals" in headlines:* yes, tie "goals" to "commitments" where possible (E9). Section D shows the patterns. `glossary.md` should get an amendment recording this rule for marketing headlines.

**Still open:**
1. **Church groups:** a target segment that gets its own canvas, or one example among several? Given the money answer, it may be one to defer.
2. **"Contract" vs "commitment":** the v2 change was about homepage copy. Should the product's "The contract, on paper" step change too, or does marketing use a different word than the product?
3. **$0 stake, Brandon's confirmation:** does the setup screen accept $0, and must every member save a card regardless?
4. **Mid-cycle visibility:** do members see each other's marks during the cycle, or only reports at close? This decides whether "visible" in the tagline means "as it happens" or "at the close." (Brandon to confirm.)
5. **Persona boundaries:** is the Owner-led persona's group size 3–8 (homepage eval P1) or 4–10 (business eval)? This draft uses 4–10.
6. **Competitor facts:** stickK's and Beeminder's forfeit destinations and current prices need a recheck before any "why not X" line ships.
7. **SMS:** confirm the group thread, summary, and silence nudges still ship on `origin/main` before the Owner-led How field mentions them in public copy.
