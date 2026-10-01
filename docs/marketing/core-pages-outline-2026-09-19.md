# Core pages outline: For groups, How it works, Pricing

**Status:** Draft for Brandon / Grant review, 2026-09-19. Outline only; no page copy has been written and no code has been changed.
**Asana cards (Content Pipeline, Site Backlog):** "For Groups" Core Pillar Page (1218487645120671), "Pricing" Core Pillar Page (1218487645120673), "How It Works" Pillar Page (1218487645120675). All three descriptions are empty today.
**Read with:** `docs/brand/voice-and-tone.md`, `docs/brand/glossary.md`, `docs/research/behavior-science-knowledge-base.md`, `repo/src/app/page.tsx`.

## 1. What exists today (verified in `repo/`)

| Page | State |
|---|---|
| `/` | Carries everything: hero, thesis, four acts (`#how`), two modes (`#modes`), six mechanics, kitty, founder note, pricing card (`#pricing`), Field notes. Nav links "How it works", "For groups" and "Pricing" are **in-page anchors**, not pages. |
| `/how-it-works` | Exists but thin. Repeats the four-act cards (slightly reworded), a six-item bullet list, and a CTA. Adds nothing the homepage does not already say. |
| `/pricing` | Exists but thin. Repeats the homepage pricing card and a one-paragraph kitty note. |
| `/for-groups` | Does not exist. The homepage `#modes` section is its only content. |
| `/faq` | Exists, 12 questions with `FAQPage` schema. Overlaps with all three pages. |

So two of the three "new" pages are really rebuilds of existing stubs, and the sitemap already lists `/how-it-works` and `/pricing` (`repo/src/app/sitemap.ts:6`). `/for-groups` is the only net-new route.

## 2. Homepage messaging assessment

**What is working and should carry through every page**
- Thesis is sharp and ownable: private habit mirror vs. public, scheduled mirror to people you chose. This is the differentiator against stickK, Beeminder and Coach.me (per `business-evaluation-2026-05-15.md`).
- The four-act shape (set, run, close, pool) is the strongest structural device. Same order everywhere.
- Money is stated plainly ("$1 platform fee plus standard card processing. Everything else is yours.") and matches the ratified voice.
- Sample lines under each act (`Cadence · Weekly. Forfeit · $20 per missed report.`) make the mechanic concrete. Reuse the pattern.

**Gaps and inconsistencies to resolve before writing**
1. **Money optional vs. money core.** Homepage and CLAUDE.md treat the forfeit as the product. `/faq` says "Groups can use the product as a structured reporting and proof system without relying on financial consequences. Money is a tool for groups that want it." Pick one story. Recommendation: forfeit is the default mechanic, the group sets the amount, and a group that wants no money is a supported edge case mentioned once, not a headline.
2. **Who controls the rules in peer mode.** Homepage: "Group-set cadence, group-set penalty." FAQ: the owner configures everything and peer groups "agree socially first." Copy on the For groups page must describe what the product actually does.
3. **"We" in marketing.** The thesis ("We made the mirror public") and kitty section ("We take a flat $1") use "we", which the voice doc restricts to About, support and policy. Fix on the homepage when the teasers are rewritten.
4. **Unattributed mode quotes.** The two `<blockquote>`s in `#modes` ("I needed everyone reporting against the same rules...") have no source. If they are invented, they are fabricated testimonials; remove or label as "what an owner says" persona lines. Do not reuse them on new pages.
5. **Glossary drift.** "Hall-pass" is hyphenated in the UI copy and the pricing feature list; glossary says "hall pass".
6. **Duplicate content.** The same four-act text now lives on `/` and `/how-it-works`. Two near-identical pages will compete with each other in search.
7. **Vague plan claims.** "Member management for active groups" says nothing. "Cycle-close PDF receipts" is a real feature worth its own explanation.
8. **Pricing source drift.** `marketing-content.ts` still holds $19/$79 tiers (CLAUDE.md known discrepancy). Anything that renders those tiers is wrong.

## 3. Division of labor (so the pages stop duplicating)

| Surface | Job | Reader's question |
|---|---|---|
| Homepage | Thesis plus a skimmable teaser of each page. Every teaser links to its page. | "What is this?" |
| **For groups** | Audience and shape: who it fits, which mode, what a group looks like on day one. | "Is this for my group, and how would we set it up?" |
| **How it works** | Mechanics in sequence: what happens in each act, who does what, what the group sees. | "What actually happens each cycle?" |
| **Pricing** | Money: the fee, worked math, where forfeits go, what is and is not charged. | "What does this cost, and who touches the money?" |
| `/faq` | Objections and edge cases. Pages link to it; do not duplicate its answers. | "What about...?" |

Rule for the kitty, which touches all three: **policy options** (redistribute, reinvest, donate) live on How it works under act 4; **fee math and "not our revenue"** live on Pricing; **which group type picks which option** lives on For groups.

## 4. Page outlines

Voice for all three: marketing-site tone (confident, editorial, matter-of-fact), sentence case headings, one italic serif span per headline, no em dashes, no emoji, "you / your group", product named rather than "we". Headlines state the mechanic.

### 4.1 For groups (`/for-groups`, new)

**Job:** let a visitor self-identify, then move them to `/create-account` with the right mode in mind.
**Working H1:** "Built for groups that already *showed up*." (alt: "For groups that meet on a cycle.")
**Primary CTA:** Start a group. **Secondary:** see how a cycle runs.

1. **Hero.** One-sentence premise: the product assumes the room exists. You found the people; this keeps the rhythm.
2. **Is your group a fit.** Short checklist framed as facts, not persuasion: a fixed set of people, a recurring meeting or close date, a willingness to name measurable commitments. Also a plain "not for" line: solo habit tracking, open communities, strangers.
3. **Two ways to run a group** (owner-led vs. peer). Side-by-side comparison table: who sets cadence, who sets forfeit, who reviews reports, how the cycle closes, best for. Then a one-paragraph "how to choose". This is the section that expands homepage `#modes`. Needs product confirmation (see open question 2).
4. **Group types** (one short block each, all with a real cadence and a realistic commitment example):
   - Founder and operator groups (weekly execution; ties to `startup-accountability-system`)
   - Coaches and program owners (owner-led; sign-off on each cycle)
   - Mastermind and peer groups (monthly; Brandon's first-Thursday group is the one confirmed real example)
   - Fitness and habit groups
   Only include types the FAQ and CLAUDE.md already support. Link each to the matching Field notes article where one is live.
5. **What a first cycle looks like.** Five-step setup path: create account, name the group, set the standard, invite members, launch after readiness checks. (Readiness checks are referenced on the current `/how-it-works` CTA; verify what they are.)
6. **What the group sees.** Activity feed, per-member commitments, cycle report. A product screenshot or the existing "live cycle" panel labeled as illustrative.
7. **Where the money goes, by group type.** Two or three lines, then link to Pricing. Owner-led coaching group vs. peer friends: different kitty defaults.
8. **Founder note** (short, "I", Brandon's voice). Reuse the homepage note, trimmed. This is the only page besides the homepage where "I" is allowed.
9. **Close CTA.** "Start a group." Link to How it works and FAQ.

**Schema:** `WebPage` plus `BreadcrumbList` (match existing marketing pages via `buildMarketingMetadata`).
**Proof to gather:** any real group beyond Brandon's, with permission. Until then, no testimonials.

### 4.2 How it works (`/how-it-works`, rebuild)

**Job:** the manual. Anyone reading it should be able to explain a cycle to their group.
**Working H1:** keep the current "Four acts. *Set*, *run*, *close*, *pool*." It is good; the page just has to earn it.
**Primary CTA:** Start a group.

1. **Hero + one-line summary.** Same shape every cycle, written down before motivation fades.
2. **The cycle at a glance.** A single horizontal timeline for one sample cycle (open, mid-cycle logging, report window, close, kitty update). Labeled illustrative. This is the one new visual that makes the page more than the homepage.
3. **Act 1, Set the standard.** Who does what (owner or group), the decisions made (cadence, forfeit amount, hall pass allowance, disbursement policy), what each member does (card on file, commitments). Include what makes a commitment measurable: two good and two weak examples, no invented people. Link to the goal-setting article.
4. **Act 2, Run the cycle.** Proof types (completion note, count, percentage, comment, photo per the FAQ). Per-goal cadence. What the group sees vs. what stays private. The "signals, not pressure" principle. Recovery prompts.
5. **Act 3, Close with receipts.** Report window, what a member submits, how misses are tallied, hall pass use, the automatic charge, the PDF receipt. Include a plain "what if someone misses the window" answer (the FAQ has it; state it here in two sentences and link).
6. **Act 4, Pool the forfeits.** The kitty as a running ledger. Three disbursement policies (redistribute, reinvest, donate) as a compact table with an example line each, agreed at the start. Link to Pricing for fee math.
7. **What repeats and what does not.** Standard is set once; acts 2 to 4 repeat. Short and useful for owners planning their time.
8. **Roles.** Owner, member, and (peer mode) group: a small table of who can do what. Needs product confirmation.
9. **Common questions.** 4 to 6 of the FAQ's cycle-mechanics questions in condensed form, linking to `/faq`. Do not copy all 12.
10. **Close CTA.** Start a group; link to For groups and Pricing.

**Differentiation from homepage:** the homepage act cards stay as one-line teasers ("Set the standard: cadence, forfeit, hall pass. Read the manual."). Depth moves here.
**Schema:** avoid `HowTo` (Google removed those rich results). `WebPage` plus `BreadcrumbList` is enough.

### 4.3 Pricing (`/pricing`, rebuild)

**Job:** remove every money surprise before signup. This is the highest-trust page on the site given the card-on-file mechanic.
**Working H1:** keep "One plan. *No monthly fee.*"
**Primary CTA:** Start a group.

1. **Hero.** Three facts in one line: $0 monthly, $1 platform fee per forfeit charged, plus standard card processing.
2. **The plan.** Standard group card. Replace vague bullets with specifics once verified: member limits, group limits, receipts, activity feed, hall pass, both modes.
3. **Worked examples.** The centerpiece. Three short, labeled-illustrative ledgers:
   - A month where nobody misses: group pays $0.
   - A month with one $20 forfeit: what the member is charged, the $1 fee, processing, what lands in the kitty.
   - A month with several forfeits across members.
   Arithmetic must be exact, so the processing rate and who bears the $1 have to be confirmed first (open questions 4 and 5).
4. **Where the money goes.** The kitty is not our revenue model. Three policy options in one sentence each, linking to How it works act 4. State plainly: the company never keeps the kitty.
5. **What we do not charge for.** No seat fee, no subscription, no fee for cycles with no forfeit. Only include claims that are true.
6. **Compared with alternatives.** Short factual table against stickK, Beeminder and Coach.me from `business-evaluation-2026-05-15.md` (sourced May 2026 pricing). Frame around group-first and pooled kitty, not "better". Re-verify each competitor number before publishing; consider a separate compare page later if this section grows.
7. **Money questions.** Charge timing, failed cards, disputes and refunds, who can see card details, can a group set the forfeit to $0. Answer here in short form; link to `/faq`.
8. **Close CTA.** Start a group.

**Schema:** optional `Offer` with `price: 0` on the plan; keep in step with visible text.
**Blocker:** fix `marketing-content.ts` $19/$79 tiers before or with this page so no surface contradicts it.

## 5. Homepage changes that ride along

- Nav: replace `#how`, `#modes`, `#pricing` anchors with `/how-it-works`, `/for-groups`, `/pricing` (`repo/src/app/page.tsx:117-119`).
- Trim `#how`, `#modes`, `#pricing` into teasers that link out. Keep the kitty section and founder note.
- Add `/for-groups` to `staticMarketingRoutes` in `sitemap.ts`, add it to footer product links, and add internal links from the FAQ and relevant Field notes.
- Remove or fix items 3 to 5 in section 2.
- Analytics: CLAUDE.md notes funnel tracking is drifting from waitlist to create-account. Tag CTAs on the new pages by `context` (the `PublicSignupCta` prop already takes one).

## 6. Open questions (need Brandon or Grant)

1. **Slug and name.** `/for-groups` (matches nav label and Asana card) vs. `/accountability-groups` (closer to the search term). Recommendation: `/for-groups` for now.
2. **Peer mode reality.** Does a peer group actually set cadence and forfeit jointly in the product, or does the owner configure and the group agrees offline (per the FAQ)?
3. **Money optional?** Can a group run with a $0 forfeit? If yes, how prominently do we say so?
4. **Card processing.** Which provider and rate? Payments provider is unconfirmed in CLAUDE.md.
5. **Who bears the $1.** Is it deducted from the forfeit, added on top, or charged to the owner? Drives the worked examples.
6. **The kitty in practice.** Is money physically held and disbursed through the product, or is the kitty a ledger and the group settles outside it? "Group kitty ledger" on the current page suggests the latter. This changes the trust copy materially.
7. **Group limits.** Member caps, number of groups per account, anything else "Standard group" restricts.
8. **Real proof.** Any groups besides Brandon's willing to be named or quoted?
9. **Search targets.** No keyword data yet for these pages (Semrush units were exhausted 2026-09-18). Hypotheses to test, unverified: "accountability group app", "accountability software for groups", "accountability app with money stakes". Run this pull before finalizing H1s and title tags.

## 7. Suggested sequence

1. Answer open questions 2 to 6 (they gate accuracy of all three pages).
2. Fix `marketing-content.ts` pricing tiers and the homepage inconsistencies.
3. Build Pricing first (smallest, highest trust value), then How it works, then For groups (needs the most product decisions).
4. Homepage teaser and nav change ships with the last page, or per page if each ships separately.
5. Update `docs/features/marketing.md` (per the repo's AGENTS.md rule) in the same PR as each page.
6. Run each drafted page through `content-grader` and the voice doc before it goes to Needs review.
