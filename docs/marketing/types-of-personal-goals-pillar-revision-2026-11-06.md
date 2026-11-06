# /types-of-personal-goals (P7) v2.4: revision for Brandon's feedback (2026-11-06)

Brandon replied on 2026-11-06 to the P7 review email. He asked for the /goal-setting feedback to be applied here too, so both guides describe one approach. He also sent a reference packet of anonymized planning examples, which is kept privately in `Personal\AG-reference\`, not in this repo. Keep the faith examples and the visual direction. The main changes are the planning model, the tracking language and the open-goal illustration.

**Status:** copy drafted in `notes/figma-pillar-v2/p7-types-of-personal-goals-v2.4.js` and waiting on Grant's approval. Nothing is built in Figma yet. The full copy is at the end of this doc.

Prose limits pass (script-checked):
- definition: 53 words
- key points: 12 to 17 words
- H2s: at most 11 words
- leads: at most 30 words
- module prose: at most 92 words
- no paragraph over 56 words
- paragraph share: 33% (leads excluded, grid counted)
- dek: 156 characters
- no em dashes in page copy

Element mix: 3 table-type elements (the grid, 4.2 and 4.6), none adjacent. Element types: grid, rewrite list, table, stack figure, checklist and image card grid. Media beats:
- 4.3: photo
- 4.5: photo
- 4.6: product UI
- 4.7: native figure
- 4.9: image cards

## Brandon's points, mapped to changes

| Brandon's point | v2.4 change |
|---|---|
| **Same model as /goal-setting.** Aspirations give direction; the group plans annual goals (his: a January retreat); members present, discuss, then decide. | Definition says most people hold goals in several areas and choose them for the year. 4.7 "Connect your long-term direction to this year's commitments". 4.9's group card: present, hear the group out, decide, report on the same cycle. CTA steps: present / track as much as helps / report at each cycle close. |
| **Life areas** (Grant's call, 2026-11-06): his five. | Five modules in his order: Faith, Family, Fitness, Work, Personal. They match the app's own pillars (Fitness, Faith, Family, Personal, Professional). The page says "Work" because readers search for work and career goals; career and money fold into it. The grid, topic index and definition follow. 9 modules (was 10). |
| **1. Focus periods and weekly planning are options,** not the default, and no one-area rule. | The old 4.9 "Lead with one life area for eight to twelve weeks" is gone. The new 4.8 "Choose what to commit to, and what can wait" has 4 narrow questions and the line "You can hold commitments in several areas at once; in a demanding season, say which one gets less." Eight to twelve weeks stays as an option in 4.7. The key point "Lead with one life area" is cut. |
| **2. Accomplishment vs commitment.** | Key point 2. The 4.3 Fitness H2: "Commit to the training, and let the race be the accomplishment." 4.6: "the commitment you report on is usually a process goal, and an outcome goal is often the accomplishment it serves." |
| **Frequency is not the reporting cycle.** A monthly commitment doesn't need weekly steps. | Key point 3. The 4.2 Family table: Commitment / How often / What you'd say at a monthly report (it replaces the week calendar). The 4.7 "three clocks" stack replaces year → quarter → month → week: what you want, how often you act, when you report. "You don't have to break every aim into quarters, months, and weeks." |
| **3. Tracking is optional;** everyone reports on the cycle. | Key point 4. The 4.6 product line: "how you track is a separate choice from the shape: daily marks, a running tally with no target, or nothing until the cycle report. Every member reports at the cycle close either way." 4.3: "A training app, a calendar, or a notebook can help you recall the sessions; the report is where you account for them." |
| **4. Keep the Christian faith examples,** as chosen practices, without implying a checked box measures spiritual maturity. | 4.1 Faith now leads. Its examples come from the packet, generalized (daily Bible reading, praying with a spouse, a weekly faith book, a 90-day Gospel devotional, giving). New line: "A checked box shows you kept the practice you chose. It doesn't measure spiritual growth, and nobody should treat it that way." |
| **5. The open-goal illustration:** 9/12 adds a target. | The 4.6 table's open row: "Seeing how far you get, with no target" / "Record every run this month and see how far you get". The product render has a new spec, `product-views/examples/pillar-types-of-goals-shapes-v2.4.json`: the run tally has no target. See open item 1. |
| **What would it take; deferring is OK.** | 4.8 question 3: "What would it take: time, money, practice, help, and trade-offs with family?" Context: "An idea that fails the third question can wait. Deferring a bucket-list trip or a second business is a choice, not a failure." Key point 5. |
| **Packet: time-based practice is a valid choice;** no output-only rule for learning. | The old 4.5 H2 "Measure learning goals by what you finish, not time spent" is gone. The new 4.5 is "Keep personal goals as practice you enjoy or things you finish": "Practice time is a real commitment; not every hobby needs an output target." 4.4 Work: "Time spent is a fair commitment when the result isn't in your hands yet." |
| **Packet: the grid is a teaching aid,** not app configuration. | The grid caption: "A teaching aid: every goal has an area and a shape." |

Kept: the H1, the stat callout (Williamson 2022), the shapes table, the 4.9 image cards and their photos, the CTA fine print, the paths and every research link (same link texts, so `p7-publish-config.js` needs no link-map change).

## /goal-setting (P4) v2.4.1: matching pass

These are the gaps between P4 v2.4 and Brandon's new points, patched in `p4-goal-setting-v2.4.js`. They're not yet in Figma `121:380` or `content/pillars/goal-setting.md`.
- **4.1 checklist:** "It fits your real schedule, not your ideal one." became "You have counted what it takes: time, money, help, and trade-offs with family."
- **4.1 context:** new line "An idea that fails these checks can wait for another year; deferring it is a choice, not a failure." The life-area example changed from "such as health or money" to "such as faith, family, or fitness".

Already covered in P4 v2.4: frequency vs reporting cycle (4.5, 4.7), optional tracking (4.6), 8-12 weeks as an option (4.1), present/discuss/decide (4.8), and an open goal with no target (4.4).

## Open items for Grant

1. ~~**Open-goal product render.**~~ **Decided (Grant, 2026-11-06): use the app screen as is** (option a): the real no-target tally, "3 /–", stays in the 4.6 product UI with the faith and family rows. If Brandon objects to the full bar, the fallback is option (b). The app's real running tally with no target shows "3 /–" and draws a **full bar**, which reads as "done". Render: `docs/brand/assets/product-views/out/pillar-types-of-goals-shapes-v2.4-2000x1200-bare.png` (rows: faith daily marks, run tally with no target, family trip at the cycle report). Brandon said to use a separate illustration if the app can't show it faithfully. Options:
   - (a) Use it as is. It's the real app.
   - (b) **Recommended:** keep the faith and family rows in the product UI, and show the open goal as a small editorial tally ("3 runs recorded this week, see how far you get") under the table, not in the app screen.
   - (c) Ask Brandon whether the app should draw no bar when there's no target (a product change, his call).
2. **The 20 grid examples** need your OK (as before).
3. **The family table** replaces the week calendar you asked for in v2.3.3. The week grid implied breaking monthly goals into weekly steps. Say if you want a week figure back somewhere.
4. **Photos:** the work module has no photo now, so the beats don't stack up in 4.3 to 4.5. The desk photo (P7-3) is held back. The hero tag changes to "Family · This year / Plan our family trip, two hours a month".
5. **SEO:** "money goals", "career goals" and "health goals" lose their own H2s. They fold into Work and Fitness. Re-check the title, meta and H2 targets in `types-of-personal-goals-pillar-seo-requirements-2026-11-05.md` before the hand-off is regenerated.
6. **Terminology:** as on P4, the page says "goal" and treats the commitment as the goal. It doesn't use "commitment" in product copy per the glossary, apart from where it teaches accomplishment vs commitment.

## After sign-off
1. 4.6 product UI: use the v2.4 render as is (item 1). Build v2.4 in Figma through Scripter: data `x` 33675, to the right of P4 v2.4. Clone in the photos. Rebuild P4 4.1 as v2.4.1.
2. Point `export-html.js` and `export-handoff-p7.js` at the v2.4 data. Regenerate `content/pillars/types-of-personal-goals.md`, the HTML mockup and `dist/`, then `content/pillars/goal-setting.md`.
3. Send both guides back to Brandon together, using GitHub links.

---

## Full copy (generated from the v2.4 data)

**H1:** Types of personal goals: how to pick the ones worth keeping

**Dek:** Personal goals sort by life area, by shape, and by time frame. Use them to choose what matters this year, then commit to an action someone else could check.

**Hero:** Photo (Gemini P7-1): a person at a table marking a paper month calendar, face cropped out. Goal tag: “Family · This year / Plan our family trip, two hours a month.”

## What are the types of personal goals?

Personal goals are aims you set for your own life, not for an employer. They sort three ways: by life area (faith, family, fitness, work, and personal), by shape (process, outcome, learning, or open), and by time frame. Most people hold goals in several areas at once and choose them for the year.

Key points:
- Every goal has a life area, a shape, and a time frame.
- Name the accomplishment you want, then commit to the action that gets you there.
- A commitment can be daily, weekly, or monthly; your group still reports on its own cycle.
- Track only as much as a commitment needs; the report at the cycle close is what counts.
- Before you commit, count what it takes: time, money, help, and trade-offs with family.

Stat: Goals about the actions you control improved performance far more than goals about the final result, in [a review of 27 sport studies]. (Williamson et al., 2022)

Grid intro: Find an example on the grid. Pick the row for a life area, then the column for a goal shape. Each area has its own section below, and the four shapes follow them.

| Area | Process | Outcome | Learning | Open |
|---|---|---|---|---|
| Faith | Read three pages of the Bible each day | Finish a 90-day Gospel devotional by Easter | Try two ways to keep a daily quiet time | Count the mornings I journal with scripture this month |
| Family | Two dates with my spouse each month | Take a week-long family road trip this summer | Learn three ways to plan a trip on a budget | Count the evenings the phone stays off this month |
| Fitness | Three strength sessions a week | Finish a marathon in the fall | Learn three strength lifts with good form | Record every run this month and see how far I get |
| Work | One protected hour a week on a business idea | Ship one project this quarter | Learn to build a monthly budget | Count the prospect calls I make this month |
| Personal | Call a friend or family member each week | Hold a ten-minute conversation in Spanish by March | Try three ways to practice piano | Count the books I finish this year |

## The types of personal goals at a glance

1. Faith goals. Prayer, scripture, worship, service, and giving, written as practices you choose to keep.
2. Family goals. Spouse, children, parents, and time together, often kept on a monthly rhythm.
3. Fitness goals. Training, movement, sleep, and recovery, written as sessions you repeat each week.
4. Work goals. Career, business, and money, written around the time and work you put in.
5. Personal goals. Friendships, reading, hobbies, and skills, measured by practice kept or things finished.
6. Goal shapes. Process, outcome, learning, and open goals: what each one measures.
7. Time frames. Long-term direction, this year’s commitments, and the cycle you report on.
8. Choose what to commit to. Questions that turn a wish into a commitment, or a reason to wait.
9. Goals and accountability. Holding yourself to a goal, and letting a partner or group ask.

## 4.1 Build faith goals around practices you choose to keep

*Faith goals cover prayer, scripture, worship, service, and giving, and they hold best as a practice you choose to keep on a set rhythm.*

- Instead of “Read the Bible more”: Read three pages of the Bible each day
- Instead of “Pray more”: Pray with my spouse twice a week
- Instead of “Grow in my faith”: Read for one hour a week from a book on faith
- Instead of “Get into the Gospels”: Finish a 90-day Gospel devotional by Easter
- Instead of “Be more generous”: Give a set amount on the first of every month

Caption: Examples are illustrative.

A checked box shows you kept the practice you chose. It doesn’t measure spiritual growth, and nobody should treat it that way. If you already meet with a small group or a prayer partner, that meeting is a natural place to report back.

## 4.2 Give family goals the rhythm they need, often monthly

*Family goals cover your spouse, children, parents, and time together, and many run monthly: a date, a one-on-one, a trip you plan together.*

| Commitment | How often | What you’d say at a monthly report |
|---|---|---|
| Two dates with my spouse | Monthly | Both happened; the second moved back a week. |
| Two hours planning our family trip | Monthly | Used the time to compare three options. No daily log. |
| One hour with each child on music, sport, or reading | Weekly | Kept it three weeks out of four; travel took one. |
| Phone off from arriving home to bedtime | Four weekdays | Kept it most nights; Thursdays slipped. |

Caption: Examples are illustrative, not member reports.

A monthly commitment doesn’t need a daily grid. Two hours of trip planning a month is a complete commitment, and the report says what you did with them. The group reports on its own cycle, whatever each commitment’s rhythm.

## 4.3 Commit to the training, and let the race be the accomplishment

*Fitness goals cover training, movement, sleep, and recovery; the commitment is usually the sessions, and the race or the lift is the accomplishment they serve.*

- Instead of “Get in shape”: Three strength sessions a week
- Instead of “Run a marathon”: Follow my training plan’s sessions every week
- Instead of “Be more flexible”: Stretch for 15 minutes on four days a week
- Instead of “Sleep more”: Lights off by 11 p.m. on weeknights

Caption: Examples are illustrative.

Media: Photo (Gemini P7-2): a person seen from behind walking into a gym in the evening, carrying training shoes.

Plan in months. In [a review of 20 studies on habit formation], a new health behavior typically took about 59 to 66 days to feel automatic. A training app, a calendar, or a notebook can help you recall the sessions; the report is where you account for them.

## 4.4 Aim work goals at the time and work you put in

*Work goals cover your career, a business, and money, and they hold best when they name the time or work you put in, not the title or the revenue.*

- Instead of “Grow the business”: Protect one hour a week to develop a product idea
- Instead of “Get more customers”: Make 45 calls to prospective customers each month
- Instead of “Get promoted”: Ship one project this quarter that I can show in my review
- Instead of “Run things better”: Put one operational improvement in place each month
- Instead of “Save more”: Move $100 into savings every Friday

Caption: Examples are illustrative.

Time spent is a fair commitment when the result isn’t in your hands yet. A promotion or a sale depends partly on other people; the hour and the calls don’t. To see where your money stands first, take the Consumer Financial Protection Bureau’s [free 10-question financial well-being check].

## 4.5 Keep personal goals as practice you enjoy or things you finish

*Personal goals cover friendships, reading, hobbies, and new skills, and you can measure them by the practice you keep or by something you finish.*

- Instead of “Stay in touch”: Call one friend or family member each week and see one in person each month
- Instead of “Read more”: Read for 30 minutes a day
- Instead of “Learn piano”: Practice for 20 minutes on three days a week
- Instead of “Learn Spanish”: Hold a ten-minute conversation in Spanish by March

Caption: Examples are illustrative.

Media: Photo (Gemini P7-4b): hands writing a short summary on an index card resting on a finished novel.

Practice time is a real commitment; not every hobby needs an output target. Turn character goals into a behavior: “be more grateful” becomes “write down three things each night.” More on making growth stick is in [the self-improvement guide].

## 4.6 Know the four goal shapes: process, outcome, learning, and open

*Every goal also has a shape, which decides what you measure: the actions you take, a result by a date, a skill you are learning, or how far you get.*

| Goal shape | What it targets | Example | Works best when |
|---|---|---|---|
| Process | Actions you control | Three strength sessions a week | You know what to do and need to do it consistently |
| Outcome | A result by a date | Finish a marathon in the fall | You want a direction to aim the process at |
| Learning | A skill or strategy to master | Learn three ways to pace a long run | You don’t yet have the skills the goal needs |
| Open | Seeing how far you get, with no target | Record every run this month and see how far you get | You are new to it or returning after a long break |

Caption: Examples are illustrative.

Media: Real app screen (product-view renderer, week-board scene, spec pillar-types-of-goals-shapes-v2.4): one member’s week with three goals tracked three ways: daily marks (faith reading), a running tally with no target (runs), and tracked at the cycle report (family trip planning).

In a group, the commitment you report on is usually a process goal, and an outcome goal is often the accomplishment it serves. Use [learning goals when you lack the skills] a task needs, and [open goals] when you are starting out: [early evidence from a small study] found beginners did better and enjoyed them more.

In Accountability Guild, how you track is a separate choice from the shape: daily marks, a running tally with no target, or nothing until the cycle report. Every member reports at the cycle close either way.

## 4.7 Connect your long-term direction to this year’s commitments

*Goals also sort by time frame: a direction you may hold for years, the commitments you choose for this year, and the cycle you report on.*

- Long-term direction: Run a marathon one day.
- This year’s commitment: Follow my training plan, four runs a week.
- How often it happens: Four times a week, on the days the plan sets.
- When you report: At each monthly cycle close, with every other goal.

Caption: Three clocks: what you want, how often you act, and when you report. Example is illustrative.

You don’t have to break every aim into quarters, months, and weeks. Some commitments repeat, some are a monthly action, and some are a dated deliverable. Many groups set the year’s commitments in January; a focused eight to twelve weeks works too when a season calls for it.

No long-term direction yet? [The life planning guide] starts there. Setting and reporting on the year’s goals is in [the goal setting guide], and [a 30-day accountability sprint] shows one focused month.

## 4.8 Choose what to commit to, and what can wait

*Not everyone starts knowing what they want, so work from narrow questions, then count what each idea would take before you commit to it.*

- What do I want to build, experience, learn, or keep going this year?
- What action am I willing to commit to and report on?
- What would it take: time, money, practice, help, and trade-offs with family?
- What would I tell my group at the next report?

An idea that fails the third question can wait. Deferring a bucket-list trip or a second business is a choice, not a failure. You can hold commitments in several areas at once; in a demanding season, say which one gets less.

Not sure where things stand? [A personal life audit] rates each area first. Then write down how you will report on each one: in [a study of 512 real goals], fewer than a quarter said how success would be measured.

## 4.9 Hold yourself to your goals, then let someone else ask

*Every commitment on this page ends in something you can report: a practice kept, a session done, an hour protected, a call made.*

- On your own. Check your log, calendar, or notebook on a set day, and write yourself a short report each cycle.
- With a partner. One person asks on a set day. A spouse, friend, or prayer partner already knows the context.
- With a group. Members present their goals, hear the group out, decide for themselves, and report on the same cycle.

In [a large review of 141 studies], goal setting worked better when goals were public and set as a group. More on following through on your own is in [the personal accountability guide]. To run the check-in well, see [how to run accountability check-ins that change behavior].

## Product CTA band

**Pick your goals, then keep them with a group that reads the reports.** Each member commits to goals anyone could check, tracks as much as helps, and reports at each cycle close. The group sees who followed through.

1. Present your goals to the group
2. Track as much as helps
3. Report at each cycle close

No monthly fee · $1 platform fee per forfeit charged

## Keep going: choose your next step

- Ready to set the year’s goals · Goal setting · How to set goals and report on them.
- Not sure where things stand · Personal life audit · See where each area stands first.
- Planning the next few years · Life planning · From values to a long-term direction.
- Keeping goals with a group · How it works · See how a group runs it.

## Related guides

- Report each cycle: How to run accountability check-ins that actually change behavior
- Try a focused month: From good intentions to shipped work: a 30-day accountability sprint
- Guides: Goal setting: how to set goals you will actually keep
