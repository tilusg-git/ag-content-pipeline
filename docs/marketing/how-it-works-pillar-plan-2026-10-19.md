# How it works pillar: planning pass (2026-10-19)

**Status:** Planning doc for Brandon. Nothing written to the site, nothing moved in Asana.
**Card:** `[Product Pillar] How It Works (/how-it-works)` (Asana 1218487645120675), Site Backlog, `STAGE: backlog`, untouched since 2026-10-01. The Pricing card (1218487645120673) is also still in Site Backlog.
**Builds on:** `docs/marketing/core-pages-outline-2026-09-19.md` §4.2 (the section outline), `docs/marketing/pillar-page-playbook.md` (Core Product Pillar rules, §7 Asana flow), `pillar-page-structure` skill Part A (band layout), `docs/marketing/pillar-page-brief-template.md` (Product variant).

## 1. Where it stands

| Piece | State |
|---|---|
| Section outline | Done (outline §4.2, 2026-09-19). Written before the playbook and before anyone checked the product facts in the repo. |
| Asana card | Exists, field block filled, never dragged to Drafting. |
| Brief | Not started. |
| Keyword data | None. Semrush check was queued 2026-09-18 and never run. |
| Live page | `repo/src/app/how-it-works/page.tsx`: four act cards, a six-item list, a CTA. It repeats the homepage. |

So the page has a shape but no brief, and the shape rests on product assumptions that turn out to be partly wrong (§2).

## 2. Product facts, now checked against the repo

The repo is mounted, so the outline's open questions (§6) can mostly be answered from `repo/docs/features/*.md` (the repo's canonical product-behavior docs). Sources in brackets.

| Question | What the product actually does | Effect on the page |
|---|---|---|
| **How a forfeit is calculated** | The group sets one penalty amount per cycle (default $100). It is split evenly across each member's active goals ($100 / 5 goals = $20 per goal). At close, each goal forfeits its share in proportion to what was missed. Percentage mode: 75% done on a $20 goal = $5. Pass/fail mode: fail = $20. No report at all = full penalty. [reports.md] | **Live page is wrong.** "Forfeit · $20 per missed report" does not describe the model. The real mechanic (partial credit per goal) is a selling point and should be the act 3 centerpiece. |
| **Who bears the $1** | Deducted from the forfeit, not added on top. Kitty net = forfeit charged - Stripe's actual processing fee - $1. A $0 forfeit is never charged and pays no fee. No percentage platform fee. [payments.md] | Answers outline Q5. The member pays exactly the forfeit; the kitty gets the net. |
| **Payments provider** | Stripe (off-session charges on a saved card; Stripe Connect for payouts). [payments.md, group-fund.md] | Answers Q4. Processing rate is Stripe's actual fee per charge, recorded per capture. |
| **Is the kitty real money or a ledger?** | Real money, held on the platform's Stripe balance. The kitty is the app's ledger of what is withdrawable. [group-fund.md] | Answers Q6. Strong trust copy: "the money sits in the group's kitty until the owner cashes it out." |
| **Disbursement policies** (redistribute / reinvest / donate) | **Not a product feature.** V1 has one action: the owner cashes out to their own Stripe-connected account, with an amount and a required reason. The whole group sees each processed withdrawal (amount, destination label, reason). What happens next (retreat, donation, paying a winner) is coordinated by the owner outside the app. Only the owner can withdraw; no vote. [group-fund.md] | **Outline §4.2 act 4 and CLAUDE.md overstate this.** The page can say the group agrees how the kitty is used and every withdrawal is visible with its reason. It cannot present three built-in policies. |
| **Hall pass** | **Not implemented.** Listed as later settings work. [groups.md "Advanced policy settings"] | Remove from the page (and from the live sample line "Hall-pass · 1 per cycle"). Also affects homepage, pricing feature list, CLAUDE.md core mechanic. |
| **Late report** | Does not reduce the current forfeit. A late completed report earns a credit of 10% of the missed-report penalty, applied to the next cycle's charge, then expires. [cycles.md, penalties.md] | Good "what if someone misses the window" answer, exact and fair. |
| **Logging proof (act 2)** | Members record marks on each goal: done, missed, or skip, with an optional note and optional photo. Each goal has its own mark cadence (daily, weekly, monthly) and a check or count style. Marks show as read-only evidence while drafting the report but do not decide it. [marks.md, groups.md] | Accurate act 2 copy. "Tallies" = count goals. |
| **The report (act 3)** | One report per member per cycle: a completion value and a written note per goal. Public to the group once submitted. Owners cannot edit members' reports. [reports.md] | "Reports stay in the member's own words" is a real trust point. |
| **Cadence** | Weekly, every 2 weeks, every 4 weeks, calendar monthly, quarterly. Owner can shift one period's dates (holidays) or change cadence going forward; closed cycles are locked. [groups.md, cycles.md] | Adds quarterly, which no marketing copy mentions. |
| **Exceptions at close** | A member with no active goals at close is held for owner review (waive, full, or custom) instead of being auto-charged. [penalties.md] | Small fairness point for the objections band. |
| **Roles** | Owner and member today. Manager is a future role. [groups.md] | Roles table is two columns, not three. |
| **Peer mode** | No product support found for jointly setting cadence or forfeit. The owner configures; groups.md calls a group "founder-owned or member-owned" but every setting is owner-only. | **Needs Brandon.** Unless peer mode exists somewhere I didn't find, the page should describe peer groups as "one person sets it up, the group agrees the terms," which matches the FAQ. |

## 3. Proposed page plan (revised from outline §4.2)

Job and buying question are unchanged: "What actually happens each cycle?" Anyone who reads it should be able to explain a cycle to their group. Bands follow skill Part A2. About 1,200 to 1,500 words.

| # | Band | Contents | Change from outline |
|---|---|---|---|
| 1 | Hero | Keep H1 "Four acts. *Set*, *run*, *close*, *pool*." Subhead: the same rhythm every cycle, agreed before anyone starts. CTAs: Start a group / See a sample cycle (anchor to band 4). | Same |
| 2 | Cycle at a glance | Horizontal timeline of one illustrative monthly cycle: open, marks logged, cycle ends, report window, close and charge, kitty updated, next cycle opens. | Same; the one new visual |
| 3a | Act 1, Set the standard | Owner picks cadence, penalty amount, report mode (percentage or pass/fail); each member writes goals and saves a card. What makes a goal measurable: two strong, two weak examples. Link `/goal-setting`. | Drop hall pass and disbursement-policy choice |
| 3b | Act 2, Run the cycle | Marks: done, missed, skip, note, photo; per-goal cadence; check vs. count. What the group sees. | Proof types corrected to the real ones |
| 3c | Act 3, Close with receipts | Report per goal, in the member's own words. How the forfeit is calculated (penalty split across goals, partial credit). Late-report 10% credit. Automatic charge. | Forfeit math added; this is the band that differs most from the homepage |
| 3d | Act 4, Pool the forfeits | Net amount lands in the kitty ($1 and Stripe's fee come out of the forfeit). Owner cashes out; every withdrawal shows amount and reason to the whole group. Groups agree up front what the kitty is for. Link `/pricing` for fee detail. | Three-policy table replaced with the real mechanic |
| 4 | Worked example | One illustrative member, one cycle (see §4). | New; outline only had it on Pricing |
| 5 | Mid-page CTA | One line plus Start a group. | New per skill |
| 6 | What repeats | Set once; acts 2 to 4 every cycle; owner's time per cycle. | Same |
| 7 | Roles | Owner vs. member table. | Two roles, not three |
| 8 | Objections | Charged only on a miss; $0 forfeit is never charged; owner can't rewrite your report; no-goals cases go to review, not auto-charge; card held by Stripe. | New per skill |
| 9 | Condensed questions | 4 to 6 cycle-mechanics questions from `/faq`, each linking out. | Same |
| 10 | Learn the practice | `/goal-setting` now; `/accountability-groups` (P1) when live. | Same |
| 11 | Close CTA | Start a group; links to `/pricing`, `/for-groups`. | Same |

No comparison band (that belongs to Pricing and the future comparison page).

## 4. Worked example draft (numbers to confirm)

Illustrative, monthly group, $100 penalty per cycle, percentage mode. A member with 5 goals, so $20 per goal.

| Goal | Reported | Forfeit |
|---|---|---|
| 3 goals | 100% | $0 |
| 1 goal | 75% | $5 |
| 1 goal | 0% | $20 |
| **Charged to the member** | | **$25.00** |
| Stripe processing (standard US card rate, 2.9% + $0.30) | | -$1.03 |
| Platform fee | | -$1.00 |
| **Added to the kitty** | | **$22.97** |

The Stripe line is a standard-rate estimate. The app records Stripe's actual fee per charge, so the page should label this "about" or confirm the rate the account actually pays.

## 5. Decisions needed from Brandon

1. **Peer mode.** Is there any joint setup in the product, or is peer mode "one person configures, the group agrees"? This changes copy on this page, `/for-groups`, and the homepage `#modes` section.
2. **Disbursement language.** OK to replace "redistribute, reinvest, or donate per group policy" with "the group agrees what it's for; the owner cashes out and every withdrawal is shown to the group with its reason"? The three uses can still appear as examples of what groups do.
3. **Hall pass.** Pull it from marketing until it ships? It appears on the live `/how-it-works`, the pricing feature list, and CLAUDE.md.
4. **Sequence.** The outline says Pricing first. Both cards are in Site Backlog. Build Pricing first, or take How it works first now that the money facts in §2 are confirmed (they unblock both)?
5. **Keyword pull.** Run a small Semrush check (3 to 4 `phrase_this` lookups on "how accountability groups work," "accountability group app," "accountability app with money," "how does stickK work") before the brief? Cheap per lookup; the account ran dry on broad `phrase_related` calls last time, so no related-term expansion.

## 6. Next steps once those are answered

1. Run the keyword check (if approved) and record it on the card's `SOURCE:` line.
2. Grant drags the card to Drafting. The brief gets written into the card from `pillar-page-brief-template.md` (Product variant), with §2 of this doc as its fact base and any remaining unknowns listed as blockers in brief §12.
3. Separately, ticket the live-copy fixes this pass found, since they are wrong today regardless of the rebuild: the "$20 per missed report" sample line, hall pass mentions, and the three-policy kitty claim. CLAUDE.md's core-mechanic section needs the same correction.
