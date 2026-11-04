# /goal-setting · Topical Pillar P4 · publish hand-off

*Generated 2026-11-04 by `notes/figma-pillar-v2/export-handoff.js` from `p4-goal-setting-v2.3.js`, the data the Figma frame was built from. Don't edit this file by hand; change the data and rerun.*

**Status:** layout signed off by Grant 2026-11-03 (v2.3); photos placed 2026-11-04. Waiting on Brandon’s review.

**Design:** Figma frame `48:292` (desktop 1440, with a 375 mobile column and band notes beside it): https://www.figma.com/design/l27WIk0vje0syTYWN2iZee?node-id=48-292

**Route:** `/goal-setting`, upgraded in place (same URL, no redirect). **SEO requirements:** [`docs/marketing/goal-setting-pillar-seo-requirements-2026-11-04.md`](../../docs/marketing/goal-setting-pillar-seo-requirements-2026-11-04.md).

**Build blocker:** this page needs the Topical Pillar template (playbook §9 item 9): full-width bands, a sticky contents rail, typed module elements and media fields. Don’t publish it onto the current `ResourceArticle` template, which renders only headings and paragraphs.

**Supersedes** the v2.1 module doc on Drive (“DRAFT v2.1 · Goal Setting module doc”). Since v2.1: plain-language H2s; a hero CTA; no visible updated date; the 4.6 go-deeper card removed (one per page); the band 7 founder paragraph removed; the soft CTA card replaced by the product CTA band; band 9 lists one neighbor guide; photos replace the illustrations; 4.6 checklist item 1 and the 4.7 product-context paragraph added.

---

## Band 1 · Hero

**H1:** Goal setting: how to set goals you will actually keep

*“Goal setting” (before the colon) is set in ember italic.*

**Dek:** Goals stick when someone could check them, they are broken into weekly actions, and they are tracked, reviewed every week, and shared.

**Buttons:** “Start a group →” (`/create-account`, via `siteHref()`) and a “See how it works” text link (`/how-it-works`). On mobile, a compact sticky bar keeps “Start a group” in reach once the hero button scrolls away.

**On this page** (desktop: sticky contents rail; mobile: dropdown under the dek): What goal setting is (`#what-goal-setting-is`) · At a glance (`#at-a-glance`) · Pick one goal (`#pick-one-goal`) · Results and actions (`#results-and-actions`) · Make it checkable (`#make-it-checkable`) · SMART and beyond (`#smart-and-beyond`) · Plan weekly actions (`#plan-weekly-actions`) · Track your progress (`#track-your-progress`) · Run a weekly review (`#run-a-weekly-review`) · Share it with others (`#share-it-with-others`) · Plan for setbacks (`#plan-for-setbacks`) · Common mistakes (`#common-mistakes`) · Goals in a group (`#goals-in-a-group`) · Where next (`#where-next`)

No byline, no read time, no visible updated date (`dateModified` stays in the schema).

> **Media · photo** (460×400 / 335×230). Files: [p4-hero-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-hero-desktop.jpg), [p4-hero-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-hero-mobile.jpg). Public name: `goal-setting-hero-runner.webp`. Alt: “A runner seen from behind, stepping off a front porch onto a quiet street at sunrise.” Goal tag (HTML text over the photo, not baked in): Top-right: “GOAL · 12 WEEKS” / “Run four times a week.” Loading: Eager, `priority` (LCP image).

## Band 2 · Answer: What is goal setting?

**Definition card:** Goal setting is deciding on a specific result or action, writing it down, and setting a way to check your progress by a date. A wish says what you want. A goal also says what you will do about it, how you will measure it, and when you will look at the results.

**Key points:**

- Pick one priority goal and give it eight to twelve weeks.
- Write it so someone else could read it and say done or not done.
- Turn it into three to five weekly actions, each with a minimum version.
- Track it the same day, review it weekly, and share it with someone who will ask.
- Plan your response to the first bad week before it happens.

**Stat callout:** Goals direct your attention, raise your effort, keep you going longer, and push you toward better strategies, according to [the psychologists who developed goal-setting theory](https://doi.org/10.1037/mot0000127). *(Locke and Latham, 2019)*

> **Media · diagram** (required original, HTML/SVG so the labels are text): the goal loop, 01 Write the goal → 02 Track progress → 03 Review weekly → 04 Adjust, then “↺ Then back to step 1, every week”. Caption: “Goals hold when they sit inside a weekly loop.” Alt: “Diagram of a four-step loop: write the goal, track progress, review weekly, adjust.”

## Band 3 · Topic index: Goal setting at a glance

*Card grid; each card jumps to its module anchor.*

- **Pick one goal** (`#pick-one-goal`): One priority for eight to twelve weeks, pointed at a longer direction.
- **Results and actions** (`#results-and-actions`): Pair the result you want with actions you control.
- **Make it checkable** (`#make-it-checkable`): Write it so someone else could mark it done or not done.
- **SMART and beyond** (`#smart-and-beyond`): When a SMART goal fits, and when an open goal works better.
- **Plan weekly actions** (`#plan-weekly-actions`): Three to five actions a week, each with a minimum version.
- **Track your progress** (`#track-your-progress`): A ten-second record, kept the same day, somewhere you see it.
- **Run a weekly review** (`#run-a-weekly-review`): Fifteen minutes and the same four questions every week.
- **Share it with others** (`#share-it-with-others`): Someone who will ask, and how to frame the goal for them.
- **Plan for setbacks** (`#plan-for-setbacks`): If-then plans written before the first bad week.
- **Common mistakes** (`#common-mistakes`): The three that sink most goals by week two.

## Module 4.1 · Pick one goal for the next eight to twelve weeks

*Anchor `#pick-one-goal`, TOC label “Pick one goal”.*

**Lead:** Choose one priority goal and give it eight to twelve weeks: long enough to see progress, short enough that the deadline still feels close.

*Checklist:*

- ✓ It is the one change that would make the biggest practical difference in three months.
- ✓ It points at a long-term direction, such as being debt-free next year.
- ✓ It ends on a date eight to twelve weeks from now.
- ✓ It fits your real schedule, not your ideal one.
- ✓ The basics elsewhere keep running without becoming new goals.

Choosing between areas of life, such as health or money, is a question of which goal to pick; the guide to [which kinds of goals to pick](/types-of-personal-goals) covers it.

> **Media · photo** (360×340 / 335×210). Files: [p4-p41-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p41-desktop.jpg), [p4-p41-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p41-mobile.jpg). Public name: `goal-setting-one-goal-sticky-note.webp`. Alt: “A sticky note on an open notebook that reads "One goal (12 weeks): Finish my certification."” Loading: Lazy. Layout: media split, photo right.

## Module 4.2 · Get the results you want through actions you control

*Anchor `#results-and-actions`, TOC label “Results and actions”.*

**Lead:** A strong goal has two layers: the result you want, for direction, and the actions you control, for this week.

*Comparison table:*

| Result you want | Action you control | How you’d check it |
|---|---|---|
| Run a half marathon | Run four times a week | Training log |
| Save $1,200 by August 31 | Move $100 to savings every Friday | Bank transfer history |
| Finish a certification | Study 45 minutes on weekdays | Course progress page |

*Caption: Examples are illustrative.*

Judge each week on the actions. If you did them and the result is slow, change the actions; if you didn’t, you already know what to fix. Process, outcome, learning, and open goals are compared in [the four goal shapes](/types-of-personal-goals).

## Module 4.3 · Write your goal so anyone could check it

*Anchor `#make-it-checkable`, TOC label “Make it checkable”.*

**Lead:** A goal is checkable when someone else could read it on Sunday and say done or not done without asking you anything.

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

*Comparison table:*

| Goal style | What it looks like | Works best for |
|---|---|---|
| SMART goal | “Run 3 miles, four times a week, through June” | People with some experience who know what they can do |
| Open goal | “Log every run this month and see how many I get” | Beginners, or anyone returning after a long break |
| Do-your-best goal | “Run as much as I can” | Rarely the best choice: nothing to check, easy to drift |

*Caption: Examples are illustrative.*

In [a large review of physical activity programs](https://doi.org/10.1080/17437199.2015.1104258), goal setting helped, but specific goals did not do significantly better than vague ones. New to something? Run an open goal for a month to learn your starting point, then set a specific target.

## Module 4.5 · Break your goal into three to five weekly actions

*Anchor `#plan-weekly-actions`, TOC label “Plan weekly actions”.*

**Lead:** Turn the goal into three to five actions a week, each tied to a day and each with a minimum version for a bad week.

*Figure: a seven-day strip with four day cards, the minimum version under each, off days blank. Built in HTML; this list is its text. Alt (if rendered as an image): “A week with four planned study days, each with a smaller fallback action.”*

- Monday: Study 45 minutes, finish one module. Minimum: watch one lesson.
- Wednesday: Study 45 minutes, practice questions. Minimum: answer five practice questions.
- Friday: Study 45 minutes, review the week’s notes. Minimum: reread one page of notes.
- Sunday: Fifteen-minute weekly review. Minimum: five minutes to tick off the week and pick Monday’s lesson.

*Caption: Example is illustrative.*

Plan around your real week: if Tuesdays are always packed, keep the hard action off Tuesday. After two weeks you will know whether the plan is realistic.

**Go-deeper card** (“Go deeper · Field notes article”, “Read the article →”): [From good intentions to shipped work: a 30-day accountability sprint](/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint). Turn the first month of a goal into weekly milestones.

## Module 4.6 · Track progress the same day so you see it building

*Anchor `#track-your-progress`, TOC label “Track your progress”.*

**Lead:** Record progress the same day in one place you see daily; a ten-second tick you keep beats a detailed log you abandon.

*Checklist:*

- ✓ One place: a paper sheet, a spreadsheet, a note on your phone, or Accountability Guild if you track with a group.
- ✓ Recorded the same day, at about the same time.
- ✓ Visible every day, on the fridge or pinned on your phone.
- ✓ Shared with someone, even if it is one weekly text.

In [a large review of 138 experiments](https://doi.org/10.1037/bul0000025), people prompted to track their progress reached their goals more often, with the biggest gains when progress was written down and shared. In [a review of weight-loss research](https://doi.org/10.1016/j.jada.2010.10.008), how consistently people tracked mattered more than how perfectly they behaved.

> **Media · photo** (360×300 / 335×210). Files: [p4-p46-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p46-desktop.jpg), [p4-p46-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p46-mobile.jpg). Public name: `goal-setting-fridge-habit-tracker.webp`. Alt: “A hand ticking today’s box on a paper weekly habit tracker taped to a fridge door.” Loading: Lazy. Layout: media split, photo right.

## Module 4.7 · Review your week in fifteen minutes to stay on course

*Anchor `#run-a-weekly-review`, TOC label “Run a weekly review”.*

**Lead:** Spend fifteen minutes at a fixed time each week, such as Sunday evening, with your tracker and the same four questions.

*Steps (question as the step line, what it does as the detail):*

1. **What did I finish this week?** Reads straight from your tracker, so the answer is a fact.

2. **What blocked me?** Turns a miss into a cause you can do something about.

3. **What will I adjust?** Changes one thing in the plan instead of starting over.

4. **What are my top three actions next week?** Ends the review with a plan already on the calendar.

The same questions every week make weeks easy to compare. On a bad week, adjust one action instead of rewriting the goal.

Accountability Guild keeps this board for you. Each member marks the day in a tap, adds a note or photo when it matters, and the group sees it. When the review comes, the week is already filled in: no spreadsheet to rebuild, no notebook to find.

> **Media · product UI** (right, about 360×228 desktop / 335×272 mobile): the `week-board` scene from `docs/brand/assets/product-views/`. Caption: “Illustrative: sample data in the Accountability Guild app.” Alt: “A sample week board in Accountability Guild: four goals with this week’s days marked.” Build it as HTML with server-rendered sample dates from the shared demo clock (like the homepage v5 screens), or as a PNG from `render.js` re-rendered on a schedule; a static PNG goes out of date.

## Module 4.8 · Share your goal with someone who will ask about it

*Anchor `#share-it-with-others`, TOC label “Share it with others”.*

**Lead:** A goal you share with someone who will ask about it is more likely to last than one you keep to yourself.

*Image card grid (mobile: swipe row with the next card peeking):*

- **One person.** Send them your tracker every week and let them ask about misses.
  **Media · photo** (286×180 / 260×150). Files: [p4-p48a-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p48a-desktop.jpg), [p4-p48a-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p48a-mobile.jpg). Public name: `goal-setting-share-one-person.webp`. Alt: “A person on a park bench after a walk, typing a message on a phone.” Loading: Lazy.
- **A small group.** Meet on a set day; each person reports on their goal and asks about the others.
  **Media · photo** (286×180 / 260×150). Files: [p4-p48b-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p48b-desktop.jpg), [p4-p48b-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p48b-mobile.jpg). Public name: `goal-setting-share-small-group.webp`. Alt: “Four people around a kitchen table with notebooks open and phones face down.” Loading: Lazy.
- **A contribution, not a contest.** Frame your goal as your part of the group’s effort, not a race to beat everyone.
  **Media · photo** (286×180 / 260×150). Files: [p4-p48c-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p48c-desktop.jpg), [p4-p48c-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p4-p48c-mobile.jpg). Public name: `goal-setting-share-group-tracker.webp`. Alt: “A group meeting in a living room; one member holds a clipboard with a shared tracker of colored ticks.” Loading: Lazy.

In [a large review of 141 studies](https://doi.org/10.1037/ccp0000260), goal setting worked better when goals were set publicly and as a group. In [a large review of goal setting in groups](https://doi.org/10.1037/a0024315), goals framed as a contribution to the group helped, while “beat everyone else” goals backfired where members depended on each other.

Not sure who to ask? Here is [how to find someone to check in with](/blog/how-to-find-an-accountability-partner-or-group).

## Module 4.9 · Plan your response to a bad week before it happens

*Anchor `#plan-for-setbacks`, TOC label “Plan for setbacks”.*

**Lead:** Before you start, name the obstacle most likely to derail you and write down what you will do when it shows up.

*Example list (“If” and “then” in ember italic):*

- If I work late on a run day, then I run the next morning before work.
- If I miss a study session, then I do the minimum version before bed.
- If I overspend on Saturday, then I skip eating out until Friday.
- If I miss the same action three weeks running, then I shrink the goal at my weekly review.

*Caption: Examples are illustrative.*

In [a review of 21 studies](https://doi.org/10.3389/fpsyg.2021.565202), picturing the goal, naming the obstacle, and making an if-then plan improved goal attainment, more so when practiced with another person. The effect may be somewhat inflated by which studies get published.

## Module 4.10 · Avoid the three mistakes that sink most goals

*Anchor `#common-mistakes`, TOC label “Common mistakes”.*

**Lead:** Most goals that fade by week two fall to one of three mistakes.

*Before-and-after table:*

| Mistake | Fix |
|---|---|
| Setting three new goals at once | Pick one and let the others wait their turn |
| Writing a vague outcome | Add a number and a time frame until someone else could check it |
| Quitting after one bad week | Do the minimum version, then fix the cause in your weekly review |

## Band 7 · In practice: Set goals with a group so you keep each other going

A small group makes several of these steps easier at once. Members agree how often they meet; each writes a checkable goal, records progress, and reviews it together on a set day.

*Illustrative panel, labeled “Illustrative”:* Cadence · Monthly. Goal · Run four times a week. Check · Training log.

## Band 7B · Product CTA band (ink): Start hitting your goals with a group that checks in.

Each member writes a goal anyone could check, logs progress during the cycle, and reports at the close. The group sees who followed through.

1. Set checkable goals

2. Log progress as you go

3. Report back on a set day

**Buttons:** “Start a group →” (`/create-account`) and “See how it works” (`/how-it-works`).

**Fine print:** No monthly fee · $1 platform fee per forfeit charged

*The steps are plain numbered text, never boxed (they read as buttons). Never mention $0 or “optional” money stakes.*

## Band 8 · Keep going: choose your next step

*Four path cards (mobile: swipe row).*

- **Still choosing a goal:** [Types of personal goals](/types-of-personal-goals). By life area and by shape.
- **Ready to start this week:** [A 30-day sprint](/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint). From goal to finished work.
- **Struggling to follow through:** [Personal accountability](/personal-accountability). A guide to personal accountability.
- **Setting goals with a group:** [How it works](/how-it-works). See how a group runs it.

## Band 9 · Related guides

*Cluster index, grouped by subtopic. Add each new cluster article as it publishes.*

- **Plan weekly actions:** [From good intentions to shipped work: a 30-day accountability sprint](/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint)
- **Track your progress:** [Weekly or 4-week goal reporting template for founders and operators](/blog/weekly-or-4-week-goal-reporting-template-for-founders-and-operators)
- **Guides:** [Types of personal goals](/types-of-personal-goals)

---

## Implementation notes

### Images

The crops in `docs/brand/assets/site-imagery/out/` are 2× JPEGs at the exact slot ratio. Use them, not the Gemini sources: the park-bench crop (4.8a) keeps the man’s face out of frame. Serve WebP through `next/image` with explicit `width`/`height`, art-directed desktop/mobile crops (`<picture>` or two sources), and the public names below. Goal tags are HTML text over the photo. Sourcing and approvals: `docs/brand/assets/site-imagery/manifest.md`.

| Slot | Display (desktop / mobile) | Public name | Alt | Loading |
|---|---|---|---|---|
| hero | 460×400 / 335×230 | `goal-setting-hero-runner.webp` | A runner seen from behind, stepping off a front porch onto a quiet street at sunrise. | Eager, `priority` (LCP image) |
| 4.1 | 360×340 / 335×210 | `goal-setting-one-goal-sticky-note.webp` | A sticky note on an open notebook that reads "One goal (12 weeks): Finish my certification." | Lazy |
| 4.3 | 360×300 / 335×240 | `goal-setting-checkable-goal-friends.webp` | Two friends at a kitchen table; one points to a goal written in a notebook. | Lazy |
| 4.6 | 360×300 / 335×210 | `goal-setting-fridge-habit-tracker.webp` | A hand ticking today’s box on a paper weekly habit tracker taped to a fridge door. | Lazy |
| 4.8a | 286×180 / 260×150 | `goal-setting-share-one-person.webp` | A person on a park bench after a walk, typing a message on a phone. | Lazy |
| 4.8b | 286×180 / 260×150 | `goal-setting-share-small-group.webp` | Four people around a kitchen table with notebooks open and phones face down. | Lazy |
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
