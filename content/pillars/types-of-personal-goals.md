# /types-of-personal-goals · Topical Pillar P7 · publish hand-off

*Generated 2026-11-05 by `notes/figma-pillar-v2/export-handoff-p7.js` from `p7-types-of-personal-goals-v2.3.js` (the data the Figma frame was built from) and `p7-publish-config.js`. Don't edit this file by hand; change the data and rerun.*

**Status:** built on the approved v2.3 template (the P4 layout Grant signed off 2026-11-03); three comment rounds applied 2026-11-05 (v2.3.1 to v2.3.3); photos and the product screen placed 2026-11-05. Waiting on Brandon’s review.

**Design:** Figma frame `116:4994` (desktop 1440, with a 375 mobile column and band notes beside it): https://www.figma.com/design/l27WIk0vje0syTYWN2iZee?node-id=116-4994

**HTML mockup:** [`docs/marketing/pillars/types-of-personal-goals/index.html`](../../docs/marketing/pillars/types-of-personal-goals/index.html) (desktop and mobile in one responsive page, generated from the same data; the `dist/` copy has every image inlined and opens from an email attachment).

**Route:** `/types-of-personal-goals`, upgraded in place (same URL, no redirect). **SEO requirements:** [`docs/marketing/types-of-personal-goals-pillar-seo-requirements-2026-11-05.md`](../../docs/marketing/types-of-personal-goals-pillar-seo-requirements-2026-11-05.md).

**Build blocker:** like P4 /goal-setting, this page needs the Topical Pillar template (playbook §9 item 9): full-width bands, a sticky contents rail, typed module elements and media fields. Don’t publish it onto the current `ResourceArticle` template, which renders only headings and paragraphs. Build P4 and P7 on the same template; P7 adds no new element types beyond a prose-only module (4.9).

**Supersedes** the v2.1 P7 module doc on Drive (renamed “SUPERSEDED”). Since then: six life areas (faith added), goals sorted three ways (area, shape, time frame), the area-by-shape grid with an intro line, leads that name each reader’s motivation, P4’s week calendar in 4.4, a prose module in 4.9, the accountability band rebuilt as module 4.10 (P4’s image card grid), band 9 as a 3×1 grid, photos and the product screen.

---

## Band 1 · Hero

**H1:** Types of personal goals: how to pick the ones worth keeping

*“Types of personal goals” and the colon are set in ember italic.*

**Dek:** Personal goals sort by life area, by shape, and by time frame. Lead with one area, pick the shape that fits, and write a goal someone else could check.

**Buttons:** “Start a group →” (`/create-account`, via `siteHref()`) and a “See how it works” text link (`/how-it-works`). On mobile, a compact sticky bar (“No monthly fee. Set up in five minutes.” + “Start a group →”) keeps the button in reach once the hero buttons scroll away.

**On this page** (desktop: sticky contents rail; mobile: dropdown under the dek): What they are (`#what-they-are`) · At a glance (`#at-a-glance`) · Health goals (`#health-goals`) · Money goals (`#money-goals`) · Career goals (`#career-goals`) · Relationship goals (`#relationship-goals`) · Learning and growth (`#learning-and-growth`) · Faith goals (`#faith-goals`) · Goal shapes (`#goal-shapes`) · Short- and long-term goals (`#short-and-long-term-goals`) · Where to start (`#where-to-start`) · Goals and accountability (`#goals-and-accountability`) · Where next (`#where-next`)

No byline, no read time, no visible updated date (`dateModified` stays in the schema).

> **Media · photo** (460×400 desktop / 335×230 mobile). Files: [p7-hero-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-hero-desktop.jpg), [p7-hero-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-hero-mobile.jpg). Public name: `types-of-personal-goals-hero-calendar.webp`. Alt: “A person at a table marking dates on a paper month calendar.” Goal tag (HTML text over the photo, top-right, not baked in): “LEAD AREA · MONEY” / “Move $100 to savings every Friday.”. Loading: Eager, `priority` (LCP image).

## Band 2 · Answer: What are the types of personal goals?

*Anchor `#what-they-are`.*

**Definition card:** Personal goals are aims you set for your own life, not for an employer. They sort three ways: by life area (health, money, career, relationships, learning and growth, faith), by shape (process, outcome, learning, or open), and by time frame (short-term or long-term). Choosing well means one area and one shape that fit your life right now.

**Key points:**

- Every goal has a life area, a shape, and a time frame.
- Each life area has a form that works best.
- Action goals usually beat result goals.
- Long-term goals need a short-term goal for this week.
- Lead with one life area for eight to twelve weeks.

**Stat callout:** Goals about the actions you control improved performance far more than goals about the final result, in [a review of 27 sport studies](https://doi.org/10.1080/1750984X.2022.2116723). *(Williamson et al., 2022)*

**Grid intro:** Find your goal on the grid. Pick the row for your life area, then the column for the shape you want. Each row has its own section below, and the four shapes are explained after them.

**Diagram · area-by-shape grid** (required original; an HTML table, so every cell is text. Mobile: a swipe row with one card per life area):

| Area / shape | Process | Outcome | Learning | Open |
|---|---|---|---|---|
| **Health** | Walk 30 minutes, Mon, Wed, Fri | Run a 5K by June | Learn three strength lifts with good form | Log every walk this month |
| **Money** | Move $100 to savings every Friday | Two-month emergency fund by Dec 31 | Learn to build a monthly budget | Track every purchase for 30 days |
| **Career** | Two hours of focused work each morning | Ship one project this quarter | Learn the reporting tool my team uses | Count client pitches sent this month |
| **Relationships** | Call my parents every Sunday | Host four dinners by summer | Learn three ways to ask better questions | Log every in-person visit this month |
| **Learning and growth** | Read 20 pages before bed | Finish one book a month through June | Try three study methods for Spanish | Count the days I practice guitar this month |
| **Faith** | Ten minutes of prayer each morning | Read through the Gospels by Easter | Learn two ways to keep a daily quiet time | Count the mornings I keep my quiet time this month |

*Caption: Every goal has an area and a shape. Examples are illustrative.*

## Band 3 · Topic index: The types of personal goals at a glance

*Anchor `#at-a-glance`. Two-column numbered index; each item links to its module anchor.*

1. **Health goals** (`#health-goals`): Sleep, movement, food, and energy, written as habits you repeat every week.
2. **Money goals** (`#money-goals`): Debt, savings, spending, and investing, written as numbers you check on a set day.
3. **Career goals** (`#career-goals`): Role, skills, income, and side projects, written around the work you deliver.
4. **Relationship goals** (`#relationship-goals`): Partner, family, friends, and dating, written as time on the calendar.
5. **Learning and growth goals** (`#learning-and-growth`): Skills, reading, creative work, and character, measured by what you finish.
6. **Faith goals** (`#faith-goals`): Prayer, scripture, worship, service, and giving, written as a practice you keep.
7. **Goal shapes** (`#goal-shapes`): Process, outcome, learning, and open goals: what each one measures.
8. **Short- and long-term goals** (`#short-and-long-term-goals`): Goals by time frame, and how one feeds the other.
9. **Where to start** (`#where-to-start`): Signs that show which life area to lead with.
10. **Goals and accountability** (`#goals-and-accountability`): Holding yourself to a goal, and letting a partner or group ask.

## Module 4.1 · Write health goals as habits you repeat every week

*Anchor `#health-goals`, contents label “Health goals”.*

**Lead:** Health goals cover sleep, movement, food, energy, and stress. They come first for many people because they feed everything else: more energy and better sleep make it easier to show up for work, family, and every other goal on the list. They work best as habits you repeat every week.

*Example list with rewrites (the vague goal as a small “Instead of” line above the checkable one):*

- *Instead of “Get healthier”:* Walk 30 minutes on Monday, Wednesday, and Friday for twelve weeks
- *Instead of “Sleep more”:* In bed with the lights off by 11 p.m. on weeknights
- *Instead of “Get stronger”:* Strength training twice a week, logged in a notebook
- *Instead of “Eat better”:* Cook dinner at home four nights a week

*Caption: Examples are illustrative.*

> **Media · photo** (360×320 desktop / 335×210 mobile). Files: [p7-p41-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p41-desktop.jpg), [p7-p41-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p41-mobile.jpg). Public name: `types-of-personal-goals-health-gym.webp`. Alt: “A person walking into a gym in the evening, carrying training shoes.” Loading: Lazy. Layout: media split, photo right; on mobile the photo sits above the element.

Plan in months. In [a review of 20 studies on habit formation](https://doi.org/10.3390/healthcare12232488), a new health behavior typically took about 59 to 66 days to feel automatic.

## Module 4.2 · Turn money goals into numbers you check on a set day

*Anchor `#money-goals`, contents label “Money goals”.*

**Lead:** Money goals cover debt, savings, spending, and investing. Some people start from a stretch of overspending or debt and want control back; others have the basics covered and want to build wealth. Either way, they are easiest to keep as numbers you check on a set day each month.

*Example list with rewrites (the vague goal as a small “Instead of” line above the checkable one):*

- *Instead of “Save more”:* Move $100 into savings every Friday
- *Instead of “Build a safety net”:* Build a two-month emergency fund by December 31
- *Instead of “Pay off the card”:* Pay an extra $150 toward the credit card on the first of every month
- *Instead of “Start investing”:* Set up an automatic monthly transfer into a retirement account and check it each quarter

*Caption: Examples are illustrative.*

To see where you stand first, take the Consumer Financial Protection Bureau’s [free 10-question financial well-being check](https://www.consumerfinance.gov/consumer-tools/financial-well-being/). Then automate the action: a scheduled transfer does the saving for you.

## Module 4.3 · Aim career goals at the work you deliver, not the title

*Anchor `#career-goals`, contents label “Career goals”.*

**Lead:** Career goals cover role, skills, income, and side projects. You might be pushing for a promotion, or you might want stability: a steadier income, a role that holds up in a reorganization, skills that keep you employable. Either way, they hold best when they name the work you will deliver.

*Example list with rewrites (the vague goal as a small “Instead of” line above the checkable one):*

- *Instead of “Get promoted”:* Ship one project this quarter that I can show in my review
- *Instead of “Get more feedback”:* Hold a 30-minute feedback conversation with my manager every other Friday
- *Instead of “Grow my side business”:* Publish one piece of work and contact five potential clients every week
- *Instead of “Feel secure in my job”:* Finish one certification module a week and use it on a real task

*Caption: Examples are illustrative.*

> **Media · photo** (360×300 desktop / 335×210 mobile). Files: [p7-p43-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p43-desktop.jpg), [p7-p43-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p43-mobile.jpg). Public name: `types-of-personal-goals-career-checklist.webp`. Alt: “A desk with a printed project checklist and a date circled on a desk calendar.” Loading: Lazy. Layout: media split, photo left; on mobile the photo sits above the element.

A promotion depends partly on other people; the work that earns it does not.

## Module 4.4 · Put relationship goals on the calendar so they happen

*Anchor `#relationship-goals`, contents label “Relationship goals”.*

**Lead:** Relationship goals cover a partner, family, friends, and dating. If you are married, they may be about protecting time together; if you are single, about meeting new people; if you have moved or drifted apart from friends, about building connection back. They depend on showing up on a schedule more than on grand gestures, so give each one a day.

*Figure: P4’s seven-day week calendar, four day cards with the minimum version under each, off days marked “Off”. Built in HTML; this list is its text. Mobile: a list, one row per day.*

- Tuesday: Phone-free dinner with my partner. Minimum: dessert together with phones in another room.
- Thursday: Text one friend to set this month’s visit. Minimum: send one message.
- Saturday: Say yes to one plan or date. Minimum: reply to one invitation.
- Sunday: Call my parents at 5 p.m. Minimum: a five-minute call.

*Caption: One week of relationship goals on the calendar. Example is illustrative.*

Nobody complains when you skip a call, so a fixed time on the calendar does the reminding.

## Module 4.5 · Measure learning goals by what you finish, not time spent

*Anchor `#learning-and-growth`, contents label “Learning and growth”.*

**Lead:** Learning and growth goals cover skills, reading, creative work, and character. You might be chasing excellence in something you already do, closing a skill gap that holds you back, or taking on something new to test yourself. Either way, measure them by what you finish, not by time spent.

*Example list with rewrites (the vague goal as a small “Instead of” line above the checkable one):*

- *Instead of “Learn to code”:* Build and publish one small app by June
- *Instead of “Read more”:* Write a one-paragraph summary of each book I finish
- *Instead of “Learn Spanish”:* Practice 20 minutes a day and hold a ten-minute conversation by March
- *Instead of “Be more patient with my kids”:* No phone during the first 30 minutes after school pickup

*Caption: Examples are illustrative.*

> **Media · photo** (360×320 desktop / 335×210 mobile). Files: [p7-p45-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p45-desktop.jpg), [p7-p45-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p45-mobile.jpg). Public name: `types-of-personal-goals-learning-book-summary.webp`. Alt: “Hands writing a short summary on an index card resting on a finished novel.” Loading: Lazy. Layout: media split, photo right; on mobile the photo sits above the element.

Translate character goals into a behavior: “be more grateful” becomes “write down three things I’m grateful for each night.” Put time-based practice under an output: “practice guitar 20 minutes a day” leads to “play one full song for a friend by the end of the month.” More on making growth stick is in [the self-improvement guide](/self-improvement).

## Module 4.6 · Build faith goals around a practice you keep every week

*Anchor `#faith-goals`, contents label “Faith goals”.*

**Lead:** Faith and spiritual goals cover prayer, scripture and other reading, worship, service, and giving. You can’t check a feeling of closeness, but you can check the practice that feeds it, so these goals hold best as something you do every day or every week.

*Example list with rewrites (the vague goal as a small “Instead of” line above the checkable one):*

- *Instead of “Grow closer to God”:* Pray for ten minutes before work every morning
- *Instead of “Read the Bible more”:* Read one chapter a day and write one line about it
- *Instead of “Go to church more”:* Attend a weekly service and one small-group meeting a month
- *Instead of “Be more generous”:* Give a set amount on the first of every month
- *Instead of “Serve more”:* Serve on one weekend team each month

*Caption: Examples are illustrative.*

If you already meet with a small group or a prayer partner, that meeting is a natural place to report back on these goals.

## Module 4.7 · Know the four goal shapes: process, outcome, learning, and open

*Anchor `#goal-shapes`, contents label “Goal shapes”.*

**Lead:** Every goal also has a shape, which decides what you measure. A process goal measures the actions you take. An outcome goal measures a result by a date. A learning goal measures a skill you are still working out. An open goal measures how far you get, with no pass-or-fail line. The table shows when each one fits.

*Comparison table (mobile: a swipe row, one card per row):*

| Goal shape | What it targets | Example | Works best when |
|---|---|---|---|
| Process | Actions you control | Run four times a week | You know what to do and need to do it consistently |
| Outcome | A result by a date | Run a half marathon in May | You need a direction to aim the process at |
| Learning | A skill or strategy to master | Learn three ways to pace a long run | You don’t yet have the skills the goal needs |
| Open | Seeing how far you get, measured | Log every run this month and see the total | You are new to it or returning after a long break |

*Caption: Examples are illustrative.*

> **Media · product UI** (900×524 desktop / 335×344 mobile). Files: [p7-p47-ui-desktop.png](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p47-ui-desktop.png), [p7-p47-ui-mobile.png](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p47-ui-mobile.png). Public name: `types-of-personal-goals-week-board.webp`. Alt: “A sample week in Accountability Guild: one goal marked by day, one counted toward 12, and one tracked at the cycle report.” Loading: Lazy. Placed below the table, full width, in a `<figure>` with the caption “Illustrative: sample data in the Accountability Guild app.” (template rule). Rendered with the product-view renderer (`docs/brand/assets/product-views/examples/pillar-types-of-goals-shapes*.json`, `week-board` scene). In production build it as HTML with server-rendered sample dates from the shared demo clock, like the homepage v5 screens, or re-render the PNG on a schedule; a static PNG goes out of date.

Use [learning goals when you lack the skills](https://doi.org/10.1037/mot0000127) a task needs. Use [open goals](https://doi.org/10.1080/17437199.2025.2467695), measured but graded rather than pass or fail, when you are starting out: [early evidence from a small study](https://doi.org/10.1016/j.psychsport.2020.101661) found beginners did better and enjoyed them more.

In Accountability Guild, each goal tracks the way its shape needs: daily marks for a process goal, a running count for an open goal, and a report at the cycle close for an outcome goal.

## Module 4.8 · Use short-term goals to reach long-term ones

*Anchor `#short-and-long-term-goals`, contents label “Short- and long-term goals”.*

**Lead:** Goals also sort by time frame. Long-term goals cover a year or more; short-term goals cover the next few weeks to three months. A year-long goal is too far away to act on today, so you break it down until it says what to do this week. The weekly step is the part you can do, check, and report on.

*Figure: four stacked bars narrowing from year to week; the week bar has an ember border. Built in HTML.*

- This year: Run a marathon next fall.
- This quarter: Run four times a week.
- This month: Log every run and reach 16 runs.
- This week: Run Tuesday, Thursday, Saturday, and Sunday.

*Caption: A long-term goal becomes this week’s action. Example is illustrative.*

Short-term goals you can start now: walk three times a week for a month, cut one spending category, finish a small project in 30 days, or call a friend every Sunday for six weeks.

No long-term direction yet? [The life planning guide](/life-planning) starts there. How to plan the weekly actions is in [the goal setting guide](/goal-setting), and [a 30-day accountability sprint](/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint) shows one month of it run start to finish.

## Module 4.9 · Lead with one life area for the next eight to twelve weeks

*Anchor `#where-to-start`, contents label “Where to start”.*

**Lead:** Keep the basics running everywhere, but give one life area your new effort for the next eight to twelve weeks. Spreading new effort across five areas tends to leave all five half done; one lead area gets the attention it needs to become routine. Eight to twelve weeks is about how long a new habit takes to settle.

Lead with health if you are tired most afternoons, sleeping badly, or rarely moving. Lead with money if bills cause dread or a surprise expense would hurt because there is no emergency fund. Lead with career if you feel bored or stuck at work, with no visible progress in a year.

Lead with relationships if weeks pass without real time with the people closest to you. Lead with learning and growth if you start courses or books and finish none of them. Lead with faith if your practice has slipped and you miss it.

*Prose module: lead and two paragraphs, no element (Grant: the signal table was too light for a table).*

If two areas fit, lead with the one that would make the others easier. Not sure where things stand? [A personal life audit](/personal-life-audit) rates each area first. Then write down how you will measure it: in [a study of 512 real goals](https://doi.org/10.1093/intqhc/mzae009), fewer than a quarter did.

## Module 4.10 · Hold yourself to your goals, then let someone else ask

*Anchor `#goals-and-accountability`, contents label “Goals and accountability”.*

**Lead:** Every goal type on this page ends in something checkable: a habit marked done, a number on a set day, a piece of work finished. That is what lets you hold yourself to it, and what lets someone else hold you to it too.

*Image card grid, 3 across (mobile: swipe row with the next card peeking):*

- **On your own.** Check your own log on a set day each week: a mark a day for habit goals, one number a month for money goals.
  **Media · photo** (286×180 desktop / 260×150 mobile). Files: [p7-p410a-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p410a-desktop.jpg), [p7-p410a-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p410a-mobile.jpg). Public name: `types-of-personal-goals-on-your-own.webp`. Alt: “A person at a kitchen counter ticking a weekly grid in a notebook with a pencil.” Loading: Lazy.
- **With a partner.** One person asks on a set day. A spouse, friend, or prayer partner already knows the context of your goal.
  **Media · photo** (286×180 desktop / 260×150 mobile). Files: [p7-p410b-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p410b-desktop.jpg), [p7-p410b-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p410b-mobile.jpg). Public name: `types-of-personal-goals-with-a-partner.webp`. Alt: “Two people at a café table, one showing the other a phone.” Loading: Lazy.
- **With a group.** Several people report on the same day, each on their own goal, even when they lead with different life areas.
  **Media · photo** (286×180 desktop / 260×150 mobile). Files: [p7-p410c-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p410c-desktop.jpg), [p7-p410c-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p410c-mobile.jpg). Public name: `types-of-personal-goals-with-a-group.webp`. Alt: “A group at a community-room table with notes and printed sheets.” Loading: Lazy.

In [a large review of 141 studies](https://doi.org/10.1037/ccp0000260), goal setting worked better when goals were public and set as a group. More on following through on your own is in [the personal accountability guide](/personal-accountability). To run the weekly ask well, see [how to run accountability check-ins that change behavior](/blog/how-to-run-accountability-check-ins-that-actually-change-behavior).

## Band 7B · Product CTA band (ink): Pick your goal, then keep it with a group that checks in.

Each member writes a goal anyone could check, logs progress during the cycle, and reports at the close. The group sees who followed through.

1. Set checkable goals
2. Log progress as you go
3. Report back on a set day

**Buttons:** “Start a group →” (`/create-account`) and “See how it works” (`/how-it-works`).

**Fine print:** No monthly fee · $1 platform fee per forfeit charged

*The steps are plain numbered text, never boxed (they read as buttons). Never mention $0 or “optional” money stakes.*

## Band 8 · Keep going: choose your next step

*Anchor `#where-next`. Four path cards (mobile: swipe row).*

- **Ready to write the goal:** [Goal setting](/goal-setting). How to set a goal and keep it.
- **Not sure where things stand:** [Personal life audit](/personal-life-audit). See where each area stands first.
- **Planning the next few years:** [Life planning](/life-planning). From values to a long-term direction.
- **Keeping goals with a group:** [How it works](/how-it-works). See how a group runs it.

## Band 9 · Related guides

*Cluster index: a 3×1 grid, one item per column, the same component as P4. Swap in P7 Field notes articles as they publish.*

- **Plan weekly actions:** [From good intentions to shipped work: a 30-day accountability sprint](/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint)
- **Check in on progress:** [How to run accountability check-ins that actually change behavior](/blog/how-to-run-accountability-check-ins-that-actually-change-behavior)
- **Guides:** [Goal setting: how to set goals you will actually keep](/goal-setting)

---

## Implementation notes

### Images

The crops in `docs/brand/assets/site-imagery/out/` are 2× files at the exact slot ratio. Use them, not the Gemini sources: several crops remove faces or real book titles (details in `docs/brand/assets/site-imagery/manifest.md`). Serve WebP through `next/image` with explicit `width`/`height`, art-directed desktop/mobile crops (`<picture>` or two sources) and the public names below. The goal tag on the hero is HTML text over the photo.

| Slot | Display (desktop / mobile) | Public name | Alt | Loading |
|---|---|---|---|---|
| hero | 460×400 / 335×230 | `types-of-personal-goals-hero-calendar.webp` | A person at a table marking dates on a paper month calendar. | Eager, `priority` (LCP image) |
| 4.1 | 360×320 / 335×210 | `types-of-personal-goals-health-gym.webp` | A person walking into a gym in the evening, carrying training shoes. | Lazy |
| 4.3 | 360×300 / 335×210 | `types-of-personal-goals-career-checklist.webp` | A desk with a printed project checklist and a date circled on a desk calendar. | Lazy |
| 4.5 | 360×320 / 335×210 | `types-of-personal-goals-learning-book-summary.webp` | Hands writing a short summary on an index card resting on a finished novel. | Lazy |
| 4.7 | 900×524 / 335×344 | `types-of-personal-goals-week-board.webp` | A sample week in Accountability Guild: one goal marked by day, one counted toward 12, and one tracked at the cycle report. | Lazy |
| 4.10a | 286×180 / 260×150 | `types-of-personal-goals-on-your-own.webp` | A person at a kitchen counter ticking a weekly grid in a notebook with a pencil. | Lazy |
| 4.10b | 286×180 / 260×150 | `types-of-personal-goals-with-a-partner.webp` | Two people at a café table, one showing the other a phone. | Lazy |
| 4.10c | 286×180 / 260×150 | `types-of-personal-goals-with-a-group.webp` | A group at a community-room table with notes and printed sheets. | Lazy |

### Links

All 15 inline anchors resolve (internal routes return 200; DOIs resolve at doi.org; the CFPB tool returns 200; checked 2026-11-05). Every study is a ✓ entry in the behavior-science KB:

| Anchor | URL | Source |
|---|---|---|
| a review of 27 sport studies | https://doi.org/10.1080/1750984X.2022.2116723 | KB #7 Williamson et al. 2022 |
| a review of 20 studies on habit formation | https://doi.org/10.3390/healthcare12232488 | KB #11 Singh et al. 2024 |
| free 10-question financial well-being check | https://www.consumerfinance.gov/consumer-tools/financial-well-being/ | CFPB tool |
| the self-improvement guide | /self-improvement | AG page |
| learning goals when you lack the skills | https://doi.org/10.1037/mot0000127 | KB #6 Locke & Latham 2019 |
| open goals | https://doi.org/10.1080/17437199.2025.2467695 | KB #3 Swann et al. 2025 |
| early evidence from a small study | https://doi.org/10.1016/j.psychsport.2020.101661 | KB #4 Hawkins et al. 2020 |
| The life planning guide | /life-planning | AG page |
| the goal setting guide | /goal-setting | AG page |
| a 30-day accountability sprint | /blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint | AG page |
| A personal life audit | /personal-life-audit | AG page |
| a study of 512 real goals | https://doi.org/10.1093/intqhc/mzae009 | KB #8 Stewart et al. 2024 |
| a large review of 141 studies | https://doi.org/10.1037/ccp0000260 | KB #1 Epton et al. 2017 |
| the personal accountability guide | /personal-accountability | AG page |
| how to run accountability check-ins that change behavior | /blog/how-to-run-accountability-check-ins-that-actually-change-behavior | AG page |

Wrap only the exact anchor text. External citations open in the same tab, with no `nofollow`.

### Inbound links at publish

- `/goal-setting` (P4, in Brandon’s queue) already links here four times: two context lines (“which kinds of goals to pick” and “the four goal shapes”), the “Still choosing a goal” path card and the Guides list. When both pages ship, point “the four goal shapes” at `/types-of-personal-goals#goal-shapes`.
- `/life-planning`, `/personal-life-audit` and `/self-improvement`: add one contextual link each where the page talks about life areas, with the anchor “types of personal goals”. These pages are all linked from P7, so this closes the loop.

### Sitemap, hub and nav

`/types-of-personal-goals` is already in the sitemap and on `/resources`. If the template ships as a new collection, keep it in the sitemap with a real `lastModified` and in `/resources`.
