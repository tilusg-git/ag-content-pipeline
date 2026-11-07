# /types-of-personal-goals · Topical Pillar P7 · publish hand-off

*Generated 2026-11-07 by `notes/figma-pillar-v2/export-handoff-p7.js` from `p7-types-of-personal-goals-v2.4.js` (the data the Figma frame was built from) and `p7-publish-config.js`. Don't edit this file by hand; change the data and rerun.*

**Status:** v2.4, rewritten around Brandon’s 2026-11-06 feedback to match /goal-setting v2.4 (change list: `docs/marketing/types-of-personal-goals-pillar-revision-2026-11-06.md`). v2.4.1 (2026-11-07) adds Grant’s Figma comments of 2026-11-06: a short why paragraph under the lead in 4.1 to 4.5, 4.7 and 4.9; a fitness H2 without “training” and “race”; “Career and work goals”; 4.1 faith as a commitment → year-end accomplishment table; 4.2 family as a rhythm stack. Built in Figma 2026-11-07 (frame 151:472; v2.4 with Grant’s comments is 135:412); photos and the product screen placed. Waiting on Brandon’s review of both guides together.

**Design:** Figma frame `151:472` (desktop 1440, with a 375 mobile column and band notes beside it): https://www.figma.com/design/l27WIk0vje0syTYWN2iZee?node-id=151-472

**HTML mockup:** [`docs/marketing/pillars/types-of-personal-goals/index.html`](../../docs/marketing/pillars/types-of-personal-goals/index.html) (desktop and mobile in one responsive page, generated from the same data; the `dist/` copy has every image inlined and opens from an email attachment).

**Route:** `/types-of-personal-goals`, upgraded in place (same URL, no redirect). **SEO requirements:** [`docs/marketing/types-of-personal-goals-pillar-seo-requirements-2026-11-05.md`](../../docs/marketing/types-of-personal-goals-pillar-seo-requirements-2026-11-05.md).

**Build blocker:** like P4 /goal-setting, this page needs the Topical Pillar template (playbook §9 item 9): full-width bands, a sticky contents rail, typed module elements and media fields. Don’t publish it onto the current `ResourceArticle` template, which renders only headings and paragraphs. Build P4 and P7 on the same template; P7 adds no new element types beyond a prose-only module (4.9).

**Supersedes** the v2.1 P7 module doc on Drive (renamed “SUPERSEDED”). Since then (v2.4): five life areas (faith, family, fitness, work, personal) in place of six. Before that: six life areas (faith added), goals sorted three ways (area, shape, time frame), the area-by-shape grid with an intro line, leads that name each reader’s motivation, P4’s week calendar in 4.4, a prose module in 4.9, the accountability band rebuilt as module 4.10 (P4’s image card grid), band 9 as a 3×1 grid, photos and the product screen.

---

## Band 1 · Hero

**H1:** Types of personal goals: how to pick the ones worth keeping

*“Types of personal goals” and the colon are set in ember italic.*

**Dek:** Personal goals sort by life area, by shape, and by time frame. Use them to choose what matters this year, then commit to an action someone else could check.

**Buttons:** “Start a group →” (`/create-account`, via `siteHref()`) and a “See how it works” text link (`/how-it-works`). On mobile, a compact sticky bar (“No monthly fee. Set up in five minutes.” + “Start a group →”) keeps the button in reach once the hero buttons scroll away.

**On this page** (desktop: sticky contents rail; mobile: dropdown under the dek): What they are (`#what-they-are`) · At a glance (`#at-a-glance`) · Faith goals (`#faith-goals`) · Family goals (`#family-goals`) · Fitness goals (`#fitness-goals`) · Career and work goals (`#career-and-work-goals`) · Personal goals (`#personal-goals`) · Goal shapes (`#goal-shapes`) · Time frames (`#time-frames`) · Choose what to commit to (`#choose-what-to-commit-to`) · Goals and accountability (`#goals-and-accountability`) · Where next (`#where-next`)

No byline, no read time, no visible updated date (`dateModified` stays in the schema).

> **Media · photo** (460×400 desktop / 335×230 mobile). Files: [p7-hero-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-hero-desktop.jpg), [p7-hero-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-hero-mobile.jpg). Public name: `types-of-personal-goals-hero-calendar.webp`. Alt: “A person at a table marking dates on a paper month calendar.” Goal tag (HTML text over the photo, top-right, not baked in): “FAMILY · THIS YEAR” / “Plan our family trip, two hours a month.”. Loading: Eager, `priority` (LCP image).

## Band 2 · Answer: What are the types of personal goals?

*Anchor `#what-they-are`.*

**Definition card:** Personal goals are aims you set for your own life, not for an employer. They sort three ways: by life area (faith, family, fitness, work, and personal), by shape (process, outcome, learning, or open), and by time frame. Most people hold goals in several areas at once and choose them for the year.

**Key points:**

- Every goal has a life area, a shape, and a time frame.
- Name the accomplishment you want, then commit to the action that gets you there.
- A commitment can be daily, weekly, or monthly; your group still reports on its own cycle.
- Track only as much as a commitment needs; the report at the cycle close is what counts.
- Before you commit, count what it takes: time, money, help, and trade-offs with family.

**Stat callout:** Goals about the actions you control improved performance far more than goals about the final result, in [a review of 27 sport studies](https://doi.org/10.1080/1750984X.2022.2116723). *(Williamson et al., 2022)*

**Grid intro:** Find an example on the grid. Pick the row for a life area, then the column for a goal shape. Each area has its own section below, and the four shapes follow them.

**Diagram · area-by-shape grid** (required original; an HTML table, so every cell is text. Mobile: a swipe row with one card per life area):

| Area / shape | Process | Outcome | Learning | Open |
|---|---|---|---|---|
| **Faith** | Read three pages of the Bible each day | Finish a 90-day Gospel devotional by Easter | Try two ways to keep a daily quiet time | Count the mornings I journal with scripture this month |
| **Family** | Two dates with my spouse each month | Take a week-long family road trip this summer | Learn three ways to plan a trip on a budget | Count the evenings the phone stays off this month |
| **Fitness** | Three strength sessions a week | Finish a marathon in the fall | Learn three strength lifts with good form | Record every run this month and see how far I get |
| **Work** | One protected hour a week on a business idea | Ship one project this quarter | Learn to build a monthly budget | Count the prospect calls I make this month |
| **Personal** | Call a friend or family member each week | Hold a ten-minute conversation in Spanish by March | Try three ways to practice piano | Count the books I finish this year |

*Caption: A teaching aid: every goal has an area and a shape. Examples are illustrative.*

## Band 3 · Topic index: The types of personal goals at a glance

*Anchor `#at-a-glance`. Two-column numbered index; each item links to its module anchor.*

1. **Faith goals** (`#faith-goals`): Prayer, scripture, worship, service, and giving, written as practices you choose to keep.
2. **Family goals** (`#family-goals`): Spouse, children, parents, and time together, often kept on a monthly rhythm.
3. **Fitness goals** (`#fitness-goals`): Training, movement, sleep, and recovery, written as sessions you repeat each week.
4. **Career and work goals** (`#career-and-work-goals`): Your job, a business, and money, written around the time and effort you put in.
5. **Personal goals** (`#personal-goals`): Friendships, reading, hobbies, and skills, measured by practice kept or things finished.
6. **Goal shapes** (`#goal-shapes`): Process, outcome, learning, and open goals: what each one measures.
7. **Time frames** (`#time-frames`): Long-term direction, this year’s commitments, and the cycle you report on.
8. **Choose what to commit to** (`#choose-what-to-commit-to`): Questions that turn a wish into a commitment, or a reason to wait.
9. **Goals and accountability** (`#goals-and-accountability`): Holding yourself to a goal, and letting a partner or group ask.

## Module 4.1 · Build faith goals around practices you choose to keep

*Anchor `#faith-goals`, contents label “Faith goals”.*

**Lead:** Faith goals cover prayer, scripture, worship, service, and giving, and they hold best as a practice you choose to keep on a set rhythm.

Faith shapes how many people treat their family, their work, and their time, so it often comes first on the list. A practice on a set rhythm keeps it from being the commitment a busy week squeezes out.

*Comparison table (mobile: a swipe row, one card per row):*

| Commitment (daily or weekly) | By the end of the year |
|---|---|
| Read the Bible for 30 minutes a day | Read the whole Bible |
| Read for one hour a week from a book on faith | Finish six books on faith |
| Pray with my spouse twice a week | About a hundred evenings of prayer together |
| Read a short devotional before my morning routine on weekdays | Finish a year-long devotional |
| Give a set amount on the first of every month | Twelve gifts, and the year’s giving total I chose in January |

*Caption: Each row pairs a commitment you report on with the accomplishment it builds toward. Examples are illustrative.*

A checked box shows you kept the practice you chose. It doesn’t measure spiritual growth, and nobody should treat it that way. If you already meet with a small group or a prayer partner, that meeting is a natural place to report back.

## Module 4.2 · Give family goals the rhythm they need, often monthly

*Anchor `#family-goals`, contents label “Family goals”.*

**Lead:** Family goals cover your spouse, children, parents, and time together, and many run monthly: a date, a one-on-one, a trip you plan together.

Family time slips quietly, because nobody sends a reminder when a date or a one-on-one doesn’t happen. A written commitment you report on gives that time a fixed place in the month, instead of whatever is left over.

*Figure: rhythm stack, four bars that narrow as the commitment gets more frequent (monthly to weekdays); the last bar has an ember border. Built in HTML; this list is its text.*

- Monthly: Two hours planning our family trip. Reported as “Compared three options; no daily log.”
- Monthly: Two dates with my spouse. Reported as “Both happened; the second moved back a week.”
- Weekly: One hour with each child on music, sport, or reading. Reported as “Kept it three weeks out of four.”
- Weekdays: Phone off from arriving home to bedtime, four weekdays. Reported as “Most nights; Thursdays slipped.”

*Caption: Examples are illustrative, not member reports.*

A monthly commitment doesn’t need a daily grid. Two hours of trip planning a month is a complete commitment, and the report says what you did with them. The group reports on its own cycle, whatever each commitment’s rhythm.

## Module 4.3 · Commit to regular movement, and let the result be the accomplishment

*Anchor `#fitness-goals`, contents label “Fitness goals”.*

**Lead:** Fitness goals cover training, movement, sleep, and recovery; the commitment is usually the sessions, and a race, a lift, or a health number is the accomplishment they serve.

Your health feeds every other area: the energy you bring to your family, your work, and your faith. A weight or a race time moves slowly and depends on more than effort, so commit to the sessions you control.

*Example list with rewrites (the vague goal as a small “Instead of” line above the checkable one):*

- *Instead of “Get in shape”:* Three strength sessions a week
- *Instead of “Run a marathon”:* Follow my training plan’s sessions every week
- *Instead of “Be more flexible”:* Stretch for 15 minutes on four days a week
- *Instead of “Sleep more”:* Lights off by 11 p.m. on weeknights

*Caption: Examples are illustrative.*

> **Media · photo** (360×320 desktop / 335×210 mobile). Files: [p7-p41-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p41-desktop.jpg), [p7-p41-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p41-mobile.jpg). Public name: `types-of-personal-goals-fitness-gym.webp`. Alt: “A person walking into a gym in the evening, carrying training shoes.” Loading: Lazy. Layout: media split, photo right; on mobile the photo sits above the element.

Plan in months. In [a review of 20 studies on habit formation](https://doi.org/10.3390/healthcare12232488), a new health behavior typically took about 59 to 66 days to feel automatic. A training app, a calendar, or a notebook can help you recall the sessions; the report is where you account for them.

## Module 4.4 · Aim career and work goals at the effort you put in

*Anchor `#career-and-work-goals`, contents label “Career and work goals”.*

**Lead:** Career and work goals cover your job, a business, and money, and they hold best when they name the time or work you put in, not the title or revenue.

Work already takes most of your week, so the risk is rarely too little effort; it is effort with no direction. Committing set time to what moves your career or business forward makes those hours count and leaves room for everything else.

*Example list with rewrites (the vague goal as a small “Instead of” line above the checkable one):*

- *Instead of “Grow the business”:* Protect one hour a week to develop a product idea
- *Instead of “Get more customers”:* Make 45 calls to prospective customers each month
- *Instead of “Get promoted”:* Ship one project this quarter that I can show in my review
- *Instead of “Run things better”:* Put one operational improvement in place each month
- *Instead of “Save more”:* Move $100 into savings every Friday

*Caption: Examples are illustrative.*

Time spent is a fair commitment when the result isn’t in your hands yet. A promotion or a sale depends partly on other people; the hour and the calls don’t. To see where your money stands first, take the Consumer Financial Protection Bureau’s [free 10-question financial well-being check](https://www.consumerfinance.gov/consumer-tools/financial-well-being/).

## Module 4.5 · Keep personal goals as practice you enjoy or things you finish

*Anchor `#personal-goals`, contents label “Personal goals”.*

**Lead:** Personal goals cover friendships, reading, hobbies, and new skills, and you can measure them by the practice you keep or by something you finish.

Personal goals are often the first to go when work and family get busy, yet they are what keep you rested and connected. A commitment of their own, however small, keeps them on the list when the year fills up.

*Example list with rewrites (the vague goal as a small “Instead of” line above the checkable one):*

- *Instead of “Stay in touch”:* Call one friend or family member each week and see one in person each month
- *Instead of “Read more”:* Read for 30 minutes a day
- *Instead of “Learn piano”:* Practice for 20 minutes on three days a week
- *Instead of “Learn Spanish”:* Hold a ten-minute conversation in Spanish by March

*Caption: Examples are illustrative.*

> **Media · photo** (360×320 desktop / 335×210 mobile). Files: [p7-p45-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p45-desktop.jpg), [p7-p45-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p45-mobile.jpg). Public name: `types-of-personal-goals-personal-book-summary.webp`. Alt: “Hands writing a short summary on an index card resting on a finished novel.” Loading: Lazy. Layout: media split, photo right; on mobile the photo sits above the element.

Practice time is a real commitment; not every hobby needs an output target. Turn character goals into a behavior: “be more grateful” becomes “write down three things each night.” More on making growth stick is in [the self-improvement guide](/self-improvement).

## Module 4.6 · Know the four goal shapes: process, outcome, learning, and open

*Anchor `#goal-shapes`, contents label “Goal shapes”.*

**Lead:** Every goal also has a shape, which decides what you measure: the actions you take, a result by a date, a skill you are learning, or how far you get.

*Comparison table (mobile: a swipe row, one card per row):*

| Goal shape | What it targets | Example | Works best when |
|---|---|---|---|
| Process | Actions you control | Three strength sessions a week | You know what to do and need to do it consistently |
| Outcome | A result by a date | Finish a marathon in the fall | You want a direction to aim the process at |
| Learning | A skill or strategy to master | Learn three ways to pace a long run | You don’t yet have the skills the goal needs |
| Open | Seeing how far you get, with no target | Record every run this month and see how far you get | You are new to it or returning after a long break |

*Caption: Examples are illustrative.*

> **Media · product UI** (900×467 desktop / 335×378 mobile). Files: [p7-p46-ui-desktop.png](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p46-ui-desktop.png), [p7-p46-ui-mobile.png](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p46-ui-mobile.png). Public name: `types-of-personal-goals-week-board.webp`. Alt: “A sample week in Accountability Guild: one goal marked by day, one counted with no target, and one tracked at the cycle report.” Loading: Lazy. Placed below the table, full width, in a `<figure>` with the caption “Illustrative: sample data in the Accountability Guild app.” (template rule). Rendered with the product-view renderer (`docs/brand/assets/product-views/examples/pillar-types-of-goals-shapes*.json`, `week-board` scene). In production build it as HTML with server-rendered sample dates from the shared demo clock, like the homepage v5 screens, or re-render the PNG on a schedule; a static PNG goes out of date.

In a group, the commitment you report on is usually a process goal, and an outcome goal is often the accomplishment it serves. Use [learning goals when you lack the skills](https://doi.org/10.1037/mot0000127) a task needs, and [open goals](https://doi.org/10.1080/17437199.2025.2467695) when you are starting out: [early evidence from a small study](https://doi.org/10.1016/j.psychsport.2020.101661) found beginners did better and enjoyed them more.

In Accountability Guild, how you track is a separate choice from the shape: daily marks, a running tally with no target, or nothing until the cycle report. Every member reports at the cycle close either way.

## Module 4.7 · Connect your long-term direction to this year’s commitments

*Anchor `#time-frames`, contents label “Time frames”.*

**Lead:** Goals also sort by time frame: a direction you may hold for years, the commitments you choose for this year, and the cycle you report on.

Without a long-term direction, this year’s commitments drift toward whatever feels urgent; without a reporting cycle, a good direction stays a wish. Separate clocks let each commitment run at its own pace and still report on one day.

*Figure: “three clocks”, four stacked bars from long-term direction to when you report; the last bar has an ember border. Built in HTML.*

- Long-term direction: Run a marathon one day.
- This year’s commitment: Follow my training plan, four runs a week.
- How often it happens: Four times a week, on the days the plan sets.
- When you report: At each monthly cycle close, with every other goal.

*Caption: Three clocks: what you want, how often you act, and when you report. Example is illustrative.*

You don’t have to break every aim into quarters, months, and weeks. Many groups set the year’s commitments in January; a focused eight to twelve weeks works too when a season calls for it.

No long-term direction yet? [The life planning guide](/life-planning) starts there; [the goal setting guide](/goal-setting) covers the year’s goals, and [a 30-day accountability sprint](/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint) shows one focused month.

## Module 4.8 · Choose what to commit to, and what can wait

*Anchor `#choose-what-to-commit-to`, contents label “Choose what to commit to”.*

**Lead:** Not everyone starts knowing what they want, so work from narrow questions, then count what each idea would take before you commit to it.

*Checklist (ember ticks):*

- What do I want to build, experience, learn, or keep going this year?
- What action am I willing to commit to and report on?
- What would it take: time, money, practice, help, and trade-offs with family?
- What would I tell my group at the next report?

An idea that fails the third question can wait. Deferring a bucket-list trip or a second business is a choice, not a failure. You can hold commitments in several areas at once; in a demanding season, say which one gets less.

Not sure where things stand? [A personal life audit](/personal-life-audit) rates each area first. Then write down how you will report on each one: in [a study of 512 real goals](https://doi.org/10.1093/intqhc/mzae009), fewer than a quarter said how success would be measured.

## Module 4.9 · Hold yourself to your goals, then let someone else ask

*Anchor `#goals-and-accountability`, contents label “Goals and accountability”.*

**Lead:** Every commitment on this page ends in something you can report: a practice kept, a session done, an hour protected, a call made.

A goal only you know about is easy to drop without a word. When someone expects a report, you plan around keeping the commitment, and a miss becomes a conversation about the cause instead of a quiet restart.

*Image card grid, 3 across (mobile: swipe row with the next card peeking):*

- **On your own.** Check your log, calendar, or notebook on a set day, and write yourself a short report each cycle.
  **Media · photo** (286×180 desktop / 260×150 mobile). Files: [p7-p410a-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p410a-desktop.jpg), [p7-p410a-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p410a-mobile.jpg). Public name: `types-of-personal-goals-on-your-own.webp`. Alt: “A person at a kitchen counter ticking a weekly grid in a notebook with a pencil.” Loading: Lazy.
- **With a partner.** One person asks on a set day. A spouse, friend, or prayer partner already knows the context.
  **Media · photo** (286×180 desktop / 260×150 mobile). Files: [p7-p410b-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p410b-desktop.jpg), [p7-p410b-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p410b-mobile.jpg). Public name: `types-of-personal-goals-with-a-partner.webp`. Alt: “Two people at a café table, one showing the other a phone.” Loading: Lazy.
- **With a group.** Members present their goals, hear the group out, decide for themselves, and report on the same cycle.
  **Media · photo** (286×180 desktop / 260×150 mobile). Files: [p7-p410c-desktop.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p410c-desktop.jpg), [p7-p410c-mobile.jpg](https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/p7-p410c-mobile.jpg). Public name: `types-of-personal-goals-with-a-group.webp`. Alt: “A group at a community-room table with notes and printed sheets.” Loading: Lazy.

In [a large review of 141 studies](https://doi.org/10.1037/ccp0000260), goal setting worked better when goals were public and set as a group. More on following through on your own is in [the personal accountability guide](/personal-accountability). To run the check-in well, see [how to run accountability check-ins that change behavior](/blog/how-to-run-accountability-check-ins-that-actually-change-behavior).

## Band 7B · Product CTA band (ink): Pick your goals, then keep them with a group that reads the reports.

Each member commits to goals anyone could check, tracks as much as helps, and reports at each cycle close. The group sees who followed through.

1. Present your goals to the group
2. Track as much as helps
3. Report at each cycle close

**Buttons:** “Start a group →” (`/create-account`) and “See how it works” (`/how-it-works`).

**Fine print:** No monthly fee · $1 platform fee per forfeit charged

*The steps are plain numbered text, never boxed (they read as buttons). Never mention $0 or “optional” money stakes.*

## Band 8 · Keep going: choose your next step

*Anchor `#where-next`. Four path cards (mobile: swipe row).*

- **Ready to set the year’s goals:** [Goal setting](/goal-setting). How to set goals and report on them.
- **Not sure where things stand:** [Personal life audit](/personal-life-audit). See where each area stands first.
- **Planning the next few years:** [Life planning](/life-planning). From values to a long-term direction.
- **Keeping goals with a group:** [How it works](/how-it-works). See how a group runs it.

## Band 9 · Related guides

*Cluster index: a 3×1 grid, one item per column, the same component as P4. Swap in P7 Field notes articles as they publish.*

- **Report each cycle:** [How to run accountability check-ins that actually change behavior](/blog/how-to-run-accountability-check-ins-that-actually-change-behavior)
- **Try a focused month:** [From good intentions to shipped work: a 30-day accountability sprint](/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint)
- **Guides:** [Goal setting: how to set goals you will actually keep](/goal-setting)

---

## Implementation notes

### Images

The crops in `docs/brand/assets/site-imagery/out/` are 2× files at the exact slot ratio. Use them, not the Gemini sources: several crops remove faces or real book titles (details in `docs/brand/assets/site-imagery/manifest.md`). Serve WebP through `next/image` with explicit `width`/`height`, art-directed desktop/mobile crops (`<picture>` or two sources) and the public names below. The goal tag on the hero is HTML text over the photo.

| Slot | Display (desktop / mobile) | Public name | Alt | Loading |
|---|---|---|---|---|
| hero | 460×400 / 335×230 | `types-of-personal-goals-hero-calendar.webp` | A person at a table marking dates on a paper month calendar. | Eager, `priority` (LCP image) |
| 4.3 | 360×320 / 335×210 | `types-of-personal-goals-fitness-gym.webp` | A person walking into a gym in the evening, carrying training shoes. | Lazy |
| 4.5 | 360×320 / 335×210 | `types-of-personal-goals-personal-book-summary.webp` | Hands writing a short summary on an index card resting on a finished novel. | Lazy |
| 4.6 | 900×467 / 335×378 | `types-of-personal-goals-week-board.webp` | A sample week in Accountability Guild: one goal marked by day, one counted with no target, and one tracked at the cycle report. | Lazy |
| 4.9a | 286×180 / 260×150 | `types-of-personal-goals-on-your-own.webp` | A person at a kitchen counter ticking a weekly grid in a notebook with a pencil. | Lazy |
| 4.9b | 286×180 / 260×150 | `types-of-personal-goals-with-a-partner.webp` | Two people at a café table, one showing the other a phone. | Lazy |
| 4.9c | 286×180 / 260×150 | `types-of-personal-goals-with-a-group.webp` | A group at a community-room table with notes and printed sheets. | Lazy |

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
