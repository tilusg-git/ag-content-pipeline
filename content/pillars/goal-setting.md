# /goal-setting · Topical Pillar P4 · publish hand-off

*Generated 2026-11-06 by `notes/figma-pillar-v2/export-handoff.js` from `p4-goal-setting-v2.4.js`, the data the Figma frame was built from. Don't edit this file by hand; change the data and rerun.*

**Status:** v2.4.2, rewritten around Brandon’s 2026-11-05 feedback (change list: `docs/marketing/goal-setting-pillar-revision-2026-11-05.md`), plus v2.4.1 (a “what it takes” check in 4.1) and v2.4.2 (a short why paragraph under the lead in 4.1 to 4.8, from Grant’s Figma comments of 2026-11-06). Built in Figma 2026-11-07. All photos placed. Waiting on Brandon’s review of both guides together.

**Design:** Figma frame `150:454` (desktop 1440, with a 375 mobile column and band notes beside it): https://www.figma.com/design/l27WIk0vje0syTYWN2iZee?node-id=150-454 (v2.4 with Grant’s comments: `121:380`)

**Route:** `/goal-setting`, upgraded in place (same URL, no redirect). **SEO requirements:** [`docs/marketing/goal-setting-pillar-seo-requirements-2026-11-04.md`](../../docs/marketing/goal-setting-pillar-seo-requirements-2026-11-04.md).

**Build blocker:** this page needs the Topical Pillar template (playbook §9 item 9): full-width bands, a sticky contents rail, typed module elements and media fields. Don’t publish it onto the current `ResourceArticle` template, which renders only headings and paragraphs.

**Supersedes** the v2.1 module doc on Drive (“DRAFT v2.1 · Goal Setting module doc”). Since v2.1: plain-language H2s; a hero CTA; no visible updated date; the 4.6 go-deeper card removed (one per page); the band 7 founder paragraph removed; the soft CTA card replaced by the product CTA band; band 9 lists one neighbor guide; photos replace the illustrations; 4.6 checklist item 1 and the 4.7 product-context paragraph added.

---

## Band 1 · Hero

**H1:** Goal setting: how to set goals you will actually keep

*“Goal setting” (before the colon) is set in ember italic.*

**Dek:** Goals stick when you commit to a repeatable behavior, present it to your group, track it as it needs, and report on it every cycle.

**Buttons:** “Start a group →” (`/create-account`, via `siteHref()`) and a “See how it works” text link (`/how-it-works`). On mobile, a compact sticky bar keeps “Start a group” in reach once the hero button scrolls away.

**On this page** (desktop: sticky contents rail; mobile: dropdown under the dek): What goal setting is (`#what-goal-setting-is`) · At a glance (`#at-a-glance`) · Set yearly goals (`#set-yearly-goals`) · Accomplishments and goals (`#accomplishments-and-goals`) · Make it checkable (`#make-it-checkable`) · SMART and beyond (`#smart-and-beyond`) · Give it a rhythm (`#give-it-a-rhythm`) · Track what it needs (`#track-what-it-needs`) · Report each cycle (`#report-each-cycle`) · Present to your group (`#present-to-your-group`) · Plan for setbacks (`#plan-for-setbacks`) · Common mistakes (`#common-mistakes`) · Goals in a group (`#goals-in-a-group`) · Where next (`#where-next`)

No byline, no read time, no visible updated date (`dateModified` stays in the schema).

> **Media · photo** (460×400 / 335×230). Files: [p4-hero-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-hero-desktop.jpg), [p4-hero-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-hero-mobile.jpg). Public name: `goal-setting-hero-runner.webp`. Alt: “A runner seen from behind, stepping off a front porch onto a quiet street at sunrise.” Goal tag (HTML text over the photo, not baked in): Top-right: “GOAL · THIS YEAR” / “Run four times a week.” Loading: Eager, `priority` (LCP image).

## Band 2 · Answer: What is goal setting?

**Definition card:** Goal setting is deciding what you want to accomplish and the repeatable commitment that will get you there, writing it down, and agreeing how you will report on it. A wish says what you want. A goal says what you will do, how often, and when you will report back.

**Key points:**

- Set goals for the year, often in January, and report on them every cycle.
- Name the accomplishment you want, then commit to the repeatable behavior that gets you there.
- Write each goal so someone else could read your report and say done or not done.
- Present your goals to your group, hear their input, then decide what you commit to.
- Track each goal as much as it needs, and report on the group’s cycle.

**Stat callout:** Goals direct your attention, raise your effort, keep you going longer, and push you toward better strategies, according to [the psychologists who developed goal-setting theory](https://doi.org/10.1037/mot0000127). *(Locke and Latham, 2019)*

> **Media · diagram** (required original, HTML/SVG so the labels are text): the goal loop, 01 Commit → 02 Track as needed → 03 Report each cycle → 04 Adjust, then “↺ Then back to step 2, every cycle”. Caption: “Goals hold when they sit inside a reporting cycle.” Alt: “Diagram of a four-step cycle: commit, track as needed, report each cycle, adjust.”

## Band 3 · Topic index: Goal setting at a glance

*Card grid; each card jumps to its module anchor.*

- **Set yearly goals** (`#set-yearly-goals`): Set them once a year with your group, then report on them all year.
- **Accomplishments and goals** (`#accomplishments-and-goals`): Separate what you want to achieve from the behavior you commit to.
- **Make it checkable** (`#make-it-checkable`): Write it so someone else could mark it done or not done.
- **SMART and beyond** (`#smart-and-beyond`): When a SMART goal fits, and when an open goal works better.
- **Give it a rhythm** (`#give-it-a-rhythm`): Daily, weekly, monthly, or by a date: whatever the goal needs.
- **Track what it needs** (`#track-what-it-needs`): A daily mark for a daily goal; a monthly goal may need nothing until the report.
- **Report each cycle** (`#report-each-cycle`): Monthly or every four weeks for many groups, with the same questions each time.
- **Present to your group** (`#present-to-your-group`): Share your goals, hear the group out, then decide for yourself.
- **Plan for setbacks** (`#plan-for-setbacks`): If-then plans written before the first bad stretch.
- **Common mistakes** (`#common-mistakes`): The three that sink most goals in the first month.

## Module 4.1 · Set your goals for the year, then report on them all year

*Anchor `#set-yearly-goals`, TOC label “Set yearly goals”.*

**Lead:** Many groups set goals once a year, often in January, then hold each other to them through every reporting cycle that follows.

**Why:** A year gives a goal room to survive a slow month, a sick week, or a busy season. Setting goals together at the start also means the group knows what each person is working toward before the first report is due.

*Checklist:*

- ✓ It matters enough to you to keep at it for a full year.
- ✓ It is a behavior you can repeat, not a one-off wish.
- ✓ You have few enough goals to keep every one of them going.
- ✓ You have counted what it takes: time, money, help, and trade-offs with family.
- ✓ A shorter run, such as twelve weeks, works too when a season or a fresh start calls for one.

An idea that fails these checks can wait for another year; deferring it is a choice, not a failure. Choosing between areas of life, such as faith, family, or fitness, is covered in the guide to [which kinds of goals to pick](/types-of-personal-goals).

> **Media · photo** (360×340 / 335×210). Files: [p4-p41-v24-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p41-v24-desktop.jpg), [p4-p41-v24-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p41-v24-mobile.jpg). Public name: `goal-setting-yearly-planning-notebook.webp`. Alt: “A person writing in a notebook at a kitchen table by a window on a winter morning, a second notebook open beside a glass of juice.” Loading: Lazy. Layout: media split, photo right.

## Module 4.2 · Separate what you want to accomplish from the goal you commit to

*Anchor `#accomplishments-and-goals`, TOC label “Accomplishments and goals”.*

**Lead:** A strong goal has two layers: the accomplishment you want, for direction, and the repeatable commitment you report on, which is the goal itself.

**Why:** Report on the goal, not the accomplishment. You can’t decide when a race time or a promotion arrives, but you can decide whether you train or study today, so every report is about something you control.

*Comparison table:*

| Accomplishment you want | Goal you commit to | How you’d report it |
|---|---|---|
| Run a half marathon | Run four times a week | Training log |
| Save $1,200 by August 31 | Move $100 to savings every Friday | Bank transfer history |
| Finish a certification | Study 45 minutes on weekdays | Course progress page |

*Caption: Examples are illustrative.*

If you kept the goal and the result is slow, change the goal; if you didn’t, you know what to fix. Process, outcome, learning, and open goals are compared in [the four goal shapes](/types-of-personal-goals).

Accountability Guild’s approach owes a lot to James Clear’s Atomic Habits, which argues that results come from the small behaviors you repeat.

## Module 4.3 · Write your goal so anyone could check it

*Anchor `#make-it-checkable`, TOC label “Make it checkable”.*

**Lead:** A goal is checkable when someone else could read your report at the end of the cycle and say done or not done without asking you anything.

**Why:** A goal only you can judge gets judged generously in a bad week. When anyone could check it, the report is a fact rather than a feeling, and the group can help with the real problem instead of debating what counts.

*Example list with rewrites (the vague goal as a small “Instead of” line above the checkable one):*

- *Instead of “Get fit”:* Walk 30 minutes three times a week
- *Instead of “Read more”:* Read 20 pages before bed on weeknights
- *Instead of “Be better with money”:* Check spending every Sunday and stay under $150 on eating out

*Caption: Examples are illustrative.*

Most real goals fail this test. In [a study of 512 real goals](https://doi.org/10.1093/intqhc/mzae009) written with health professionals, fewer than a quarter said how success would be measured, and 93.5% had no plan to track progress.

> **Media · photo** (360×300 / 335×240). Files: [p4-p43-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p43-desktop.jpg), [p4-p43-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p43-mobile.jpg). Public name: `goal-setting-checkable-goal-friends.webp`. Alt: “Two friends at a kitchen table; one points to a goal written in a notebook.” Goal tag (HTML text over the photo, not baked in): Bottom-left: “GOAL” / “Walk 30 minutes three times a week.” Loading: Lazy. Layout: media split, photo left.

## Module 4.4 · Start with an open goal, then make it SMART

*Anchor `#smart-and-beyond`, TOC label “SMART and beyond”.*

**Lead:** SMART (specific, measurable, achievable, relevant, time-bound) is a useful checklist, but being measured and tracked matters more than being highly specific.

**Why:** Specific targets help once you know your starting point. Set too early, they are guesses that make a normal week look like a failure. Measuring and reporting what you actually did keeps the goal honest either way.

*Comparison table:*

| Goal style | What it looks like | Works best for |
|---|---|---|
| SMART goal | “Run 3 miles, four times a week, through June” | People with some experience who know what they can do |
| Open goal | “Log every run this month and see how many I get” | Beginners, or anyone returning after a long break |
| Do-your-best goal | “Run as much as I can” | Rarely the best choice: nothing to check, easy to drift |

*Caption: Examples are illustrative.*

In [a large review of physical activity programs](https://doi.org/10.1080/17437199.2015.1104258), goal setting helped, but specific goals did not do significantly better than vague ones. New to something? Run an open goal for a cycle to learn your starting point, then set a specific target.

## Module 4.5 · Give each goal the rhythm it needs

*Anchor `#give-it-a-rhythm`, TOC label “Give it a rhythm”.*

**Lead:** Goals don’t all run on a weekly plan. Some happen daily, some a few times a week, some once a month, and some by a date.

**Why:** A goal forced into the wrong rhythm either creates busywork, like logging a monthly date night every day, or gets lost, like a daily habit checked once a month. Matching the rhythm to the goal keeps your effort on the goal itself.

*Figure: stacked bars that narrow as the rhythm gets more frequent; the last (daily) bar is ember. Built in HTML; this list is its text. Alt (if rendered as an image): “Four goal rhythms, from by-a-date to daily, each with how much tracking it needs.”*

- **By a date:** Finish a certification by June. A progress note each cycle is enough.
- **Monthly:** One date night a month. A single check at the report.
- **Weekly:** Run four times a week. A tally you add to after each run.
- **Daily:** Read ten minutes every day. A mark each day, so the streak shows.

*Caption: Examples are illustrative.*

Breaking a goal into weekly steps is one option, not a rule. Use it when it helps you keep the commitment, and skip it when it doesn’t.

**Go-deeper card** (“Go deeper · Field notes article”, “Read the article →”): [From good intentions to shipped work: a 30-day accountability sprint](/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint). One way to plan a goal’s first month in weekly milestones.

## Module 4.6 · Track each goal only as much as it needs

*Anchor `#track-what-it-needs`, TOC label “Track what it needs”.*

**Lead:** Track in a way that fits the goal: a daily mark for a daily goal, a tally for a weekly one, nothing until the report for a monthly one.

**Why:** Tracking is there to make the report accurate, not to become a second job. Track too little and you report from memory; track too much and the logging wears you out before the goal does.

*Checklist:*

- ✓ One place: a paper sheet, a spreadsheet, a note on your phone, or Accountability Guild if you track with a group.
- ✓ As often as the goal happens, and no more.
- ✓ Enough to answer the report as fact, not from memory.
- ✓ Visible to your group, so the report holds no surprises.

In [a large review of 138 experiments](https://doi.org/10.1037/bul0000025), people prompted to track their progress reached their goals more often, with the biggest gains when progress was written down and shared. In [a review of weight-loss research](https://doi.org/10.1016/j.jada.2010.10.008), how consistently people tracked mattered more than how perfectly they behaved.

> **Media · photo** (360×300 / 335×210). Files: [p4-p46-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p46-desktop.jpg), [p4-p46-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p46-mobile.jpg). Public name: `goal-setting-fridge-habit-tracker.webp`. Alt: “A hand ticking today’s box on a paper weekly habit tracker taped to a fridge door.” Loading: Lazy. Layout: media split, photo right.

## Module 4.7 · Report on your goals at the end of every cycle

*Anchor `#report-each-cycle`, TOC label “Report each cycle”.*

**Lead:** Your group agrees a reporting cycle, often monthly or every four weeks, and at each close every member reports on every goal.

**Why:** A report on a known date turns an intention into a promise with a deadline. Asking the same questions every cycle makes each report easy to compare with the last one.

*Steps (question as the step line, what it does as the detail):*

1. **Did I keep each goal?** Reads straight from what you tracked, so the answer is a fact.

2. **What got in the way?** Turns a miss into a cause you can do something about.

3. **What will I change next cycle?** Changes one thing instead of starting over.

4. **What should the group ask me about?** Points the group at the goal that needs the most help.

Weekly suits some groups and quarterly suits others; pick the cycle that fits your goals and your meetings.

Accountability Guild keeps the record for you. Members log proof as they go, a mark, a note or a photo, and submit a short report at each cycle close. The group reads every report, so nobody rebuilds a spreadsheet before the meeting.

> **Media · product UI** (right, about 360×380 desktop / 335×354 mobile): the `report-close` scene from `docs/brand/assets/product-views/`. Caption: “Illustrative: sample data in the Accountability Guild app.” Alt: “A sample cycle-close report in Accountability Guild: a member’s goals, each marked kept or missed.” Build it as HTML with server-rendered sample dates from the shared demo clock (like the homepage v5 screens), or as a PNG from `render.js` re-rendered on a schedule; a static PNG goes out of date.

## Module 4.8 · Present your goals to your group, then decide for yourself

*Anchor `#present-to-your-group`, TOC label “Present to your group”.*

**Lead:** Share your goals with the group, hear their questions and suggestions, then make the call yourself; the group reads your reports all year.

**Why:** Saying a goal out loud tests it: the group spots a goal that is too vague or too big before the year starts. Deciding for yourself keeps it your goal, not one the group handed you.

*Image card grid (mobile: swipe row with the next card peeking):*

- **Present.** Read out your goals for the year. The group asks questions and may suggest changes; you decide.
  **Media · photo** (286×180 / 260×150). Files: [p4-p48b-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p48b-desktop.jpg), [p4-p48b-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p48b-mobile.jpg). Public name: `goal-setting-share-small-group.webp`. Alt: “Four people around a kitchen table with notebooks open and phones face down.” Loading: Lazy.
- **Report.** At each cycle close, report on every goal, from wherever you are.
  **Media · photo** (286×180 / 260×150). Files: [p4-p48a-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p48a-desktop.jpg), [p4-p48a-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p48a-mobile.jpg). Public name: `goal-setting-share-one-person.webp`. Alt: “A person on a park bench after a walk, typing a message on a phone.” Loading: Lazy.
- **Read the reports.** The group sees every goal and reads each report, so progress and misses are both in the open.
  **Media · photo** (286×180 / 260×150). Files: [p4-p48c-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p48c-desktop.jpg), [p4-p48c-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p48c-mobile.jpg). Public name: `goal-setting-share-group-tracker.webp`. Alt: “A group meeting in a living room; one member holds a clipboard with a shared tracker of colored ticks.” Loading: Lazy.

In [a large review of 141 studies](https://doi.org/10.1037/ccp0000260), goal setting worked better when goals were set publicly and as a group. In [a large review of goal setting in groups](https://doi.org/10.1037/a0024315), goals framed as a contribution to the group helped, while “beat everyone else” goals backfired where members depended on each other.

No group yet? Here is [how to find someone to check in with](/blog/how-to-find-an-accountability-partner-or-group).

## Module 4.9 · Plan your response to a bad stretch before it happens

*Anchor `#plan-for-setbacks`, TOC label “Plan for setbacks”.*

**Lead:** Before the year starts, name the obstacle most likely to derail each goal and write down what you will do when it shows up.

*Example list (“If” and “then” in ember italic):*

- If I work late on a run day, then I run the next morning before work.
- If I miss a study session, then I do a shorter one before bed.
- If I overspend on Saturday, then I skip eating out until Friday.
- If I miss the same goal two cycles running, then I raise it in my report and adjust it.

*Caption: Examples are illustrative.*

In [a review of 21 studies](https://doi.org/10.3389/fpsyg.2021.565202), picturing the goal, naming the obstacle, and making an if-then plan improved goal attainment, more so when practiced with another person. The effect may be somewhat inflated by which studies get published.

## Module 4.10 · Avoid the three mistakes that sink most goals

*Anchor `#common-mistakes`, TOC label “Common mistakes”.*

**Lead:** Most goals that fade in the first month fall to one of three mistakes.

*Before-and-after table:*

| Mistake | Fix |
|---|---|
| Taking on more goals than you can keep up | Keep the few that matter and save the rest for next year |
| Writing a vague outcome | Name the behavior, a number, and how often, until someone else could check it |
| Quitting after one bad stretch | Do a smaller version, then name the cause in your next report |

## Band 7 · In practice: Set goals with a group so you keep each other going

A group makes several of these steps easier at once. Members present their goals together, often in January, log proof as they go, and report at the close of each cycle.

*Illustrative panel, labeled “Illustrative”:* Cadence · Monthly. Goal · Run four times a week. Check · Training log.

## Band 7B · Product CTA band (ink): Start hitting your goals with a group that checks in.

Each member commits to goals anyone could check, logs proof during the cycle, and reports at the close. The group sees who followed through.

1. Present your goals to the group

2. Log proof as you go

3. Report at each cycle close

**Buttons:** “Start a group →” (`/create-account`) and “See how it works” (`/how-it-works`).

**Fine print:** No monthly fee · $1 platform fee per forfeit charged

*The steps are plain numbered text, never boxed (they read as buttons). Never mention $0 or “optional” money stakes.*

## Band 8 · Keep going: choose your next step

*Four path cards (mobile: swipe row).*

- **Still choosing a goal:** [Types of personal goals](/types-of-personal-goals). By life area and by shape.
- **Want a fast start:** [A 30-day sprint](/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint). From goal to finished work.
- **Struggling to follow through:** [Personal accountability](/personal-accountability). A guide to personal accountability.
- **Setting goals with a group:** [How it works](/how-it-works). See how a group runs it.

## Band 9 · Related guides

*Cluster index, grouped by subtopic. Add each new cluster article as it publishes.*

- **Give it a rhythm:** [From good intentions to shipped work: a 30-day accountability sprint](/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint)
- **Report each cycle:** [Weekly or 4-week goal reporting template for founders and operators](/blog/weekly-or-4-week-goal-reporting-template-for-founders-and-operators)
- **Guides:** [Types of personal goals](/types-of-personal-goals)

---

## Implementation notes

### Images

The crops in `docs/brand/assets/site-imagery/out/` are 2× JPEGs at the exact slot ratio. Use them, not the Gemini sources: the park-bench crop (4.8a) keeps the man’s face out of frame. Serve WebP through `next/image` with explicit `width`/`height`, art-directed desktop/mobile crops (`<picture>` or two sources), and the public names below. Goal tags are HTML text over the photo. Sourcing and approvals: `docs/brand/assets/site-imagery/manifest.md`.

| Slot | Display (desktop / mobile) | Public name | Alt | Loading |
|---|---|---|---|---|
| hero | 460×400 / 335×230 | `goal-setting-hero-runner.webp` | A runner seen from behind, stepping off a front porch onto a quiet street at sunrise. | Eager, `priority` (LCP image) |
| 4.1 | 360×340 / 335×210 | `goal-setting-yearly-planning-notebook.webp` | A person writing in a notebook at a kitchen table by a window on a winter morning, a second notebook open beside a glass of juice. | Lazy |
| 4.3 | 360×300 / 335×240 | `goal-setting-checkable-goal-friends.webp` | Two friends at a kitchen table; one points to a goal written in a notebook. | Lazy |
| 4.6 | 360×300 / 335×210 | `goal-setting-fridge-habit-tracker.webp` | A hand ticking today’s box on a paper weekly habit tracker taped to a fridge door. | Lazy |
| 4.8a | 286×180 / 260×150 | `goal-setting-share-small-group.webp` | Four people around a kitchen table with notebooks open and phones face down. | Lazy |
| 4.8b | 286×180 / 260×150 | `goal-setting-share-one-person.webp` | A person on a park bench after a walk, typing a message on a phone. | Lazy |
| 4.8c | 286×180 / 260×150 | `goal-setting-share-group-tracker.webp` | A group meeting in a living room; one member holds a clipboard with a shared tracker of colored ticks. | Lazy |

### Links

All 11 inline anchors resolve (internal routes return 200; DOIs resolve via doi.org, checked 2026-11-04). Wrap only the exact anchor text. External citations open in the same tab, with no `nofollow`.

### Inbound retrofit at publish (brief §10)

- 30-day sprint article, Week 1 section: anchor “how to set a goal you can actually check” → `/goal-setting`.
- Weekly reporting template article, first section: anchor “goal setting” → `/goal-setting`.
- `/types-of-personal-goals`: a path card to `/goal-setting`.
- `/personal-accountability`, promises/commitments section: anchor “setting goals you can keep” → `/goal-setting`.

### Sitemap, hub and nav

`/goal-setting` is already in the sitemap and on `/resources`, and homepage v5 links to it. If the template ships as a new collection, keep it in the sitemap with a real `lastModified` and in `/resources`.
