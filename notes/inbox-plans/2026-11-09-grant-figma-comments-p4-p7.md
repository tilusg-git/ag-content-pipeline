# Grant's Figma comments on P4 v2.4.1 and P7 v2.4 (left 2026-11-06)

Source: `fetch('/api/file/l27WIk0vje0syTYWN2iZee/comments')` in the Figma tab (Claude in Chrome), filtered to unresolved
comments created on or after 2026-11-06: **18 comments, no replies**. 8 on P4 frame `121:380`, 10 on P7 frame `135:412`.
Each pin was mapped to a node by adding `client_meta.node_offset` to the frame's `absoluteBoundingBox` and taking the
deepest text node under that point (`figma` global in `javascript_tool`). Written by the scheduled task
`ag-pillars-monday-package-for-brandon`; the file name carries the Monday send date.

Data edited: `notes/figma-pillar-v2/p4-goal-setting-v2.4.js` (now v2.4.2) and `p7-types-of-personal-goals-v2.4.js`
(now v2.4.1). The "why" paragraphs use the template's `m.body` slot: a serif paragraph straight under the lead, on desktop
and mobile. Prose limits still hold (module prose at most 100 words, lead excluded): where a module was already near the
cap, its context was trimmed (P4 4.2 and 4.7, P7 4.7). No new research claims were added.

## P4 /goal-setting (frame 121:380): 8 comments, all "Feel like we could expand a bit more here to speak to the WHY."

| # | Pin (offset y) | Node | Module | Change (v2.4.2) |
|---|---|---|---|---|
| 1 | 2385 | `121:542` lead | 4.1 Set yearly goals | Why: a year gives a goal room to survive a slow month; setting goals together means the group knows what each person is working toward. |
| 2 | 3173 | `121:575` lead | 4.2 Accomplishments and goals | Why: report on the goal, not the accomplishment, because you control the behavior, not the result. Context trimmed: "That is why the goal you commit to is the repeated behavior" cut from the Atomic Habits line (the body now says it). |
| 3 | 3846 | `121:611` lead | 4.3 Make it checkable | Why: a goal only you can judge gets judged generously; a checkable one makes the report a fact and points the group at the real problem. |
| 4 | 4545 | `121:640` lead | 4.4 SMART and beyond | Why: a target set before you know your starting point is a guess that makes a normal week look like failure; measuring and reporting keeps it honest. |
| 5 | 5190 | `121:675` lead | 4.5 Give it a rhythm | Why: the wrong rhythm creates busywork or loses the goal. |
| 6 | 5987 | `121:701` lead | 4.6 Track what it needs | Why: tracking serves an accurate report, not a second job. |
| 7 | 6721 | `121:730` lead | 4.7 Report each cycle | Why: a report on a known date turns an intention into a promise with a deadline; the same questions make reports comparable (moved here from the context line). |
| 8 | 7622 | `121:764` lead | 4.8 Present to your group | Why: saying a goal out loud tests it; deciding for yourself keeps it your goal. |

## P7 /types-of-personal-goals (frame 135:412): 10 comments

| # | Pin (offset y) | Node | Module | Comment | Change (v2.4.1) |
|---|---|---|---|---|---|
| 1 | 2792 | `135:614` lead | 4.1 Faith goals | WHY | Why: faith shapes how people treat family, work and time; a set rhythm keeps it from being squeezed out. |
| 2 | 3031 | `135:627` element | 4.1 Faith goals | "This content doesn't seem to need to be in a table structure. Unless maybe we integrate an annual goal with daily/weekly goals?" | **Decided by Grant (relayed 2026-11-07): option B, as a table, faith only.** Applied, see below. |
| 3 | 3603 | `135:646` lead | 4.2 Family goals | WHY | Why: family time slips quietly; a reported commitment gives it a fixed place in the month. |
| 4 | 4206 | `135:687` H2 | 4.3 Fitness goals | "Not sure about use of words 'training' and 'race' here. Those are more examples than the broad messaging around a Health/Fitness goal." | H2 "Commit to the training, and let the race be the accomplishment" → "Commit to regular movement, and let the result be the accomplishment". Lead: "the race or the lift" → "a race, a lift, or a health number". |
| 5 | 4338 | `135:688` lead | 4.3 Fitness goals | WHY | Why: health feeds every other area; results move slowly and depend on more than effort, so commit to the sessions. |
| 6 | 4985 | `135:721` H2 | 4.4 Work goals | "Maybe adjust slightly for work/career/professional positioning." | H2 "Aim work goals at the time and work you put in" → "Aim career and work goals at the effort you put in". Lead "Career and work goals cover your job, a business, and money…". Contents label and topic index "Career and work goals". Grid row label stays "Work" (the app's life area). |
| 7 | 5075 | `135:722` lead | 4.4 Work goals | WHY | Why: work already takes most of the week; the risk is effort with no direction. |
| 8 | 5901 | `135:754` lead | 4.5 Personal goals | WHY | Why: personal goals go first when life gets busy, yet keep you rested and connected. |
| 9 | 8144 | `135:844` lead | 4.7 Time frames | WHY | Why: without a direction, commitments drift to the urgent; without a cycle, a direction stays a wish. Context trimmed to stay within 100 words (the "some repeat, some monthly, some dated" sentence cut; link sentence shortened). |
| 10 | 9622 | `135:887` lead | 4.9 Goals and accountability | WHY | Why: a goal only you know about is easy to drop; someone expecting a report turns a miss into a conversation about the cause. |

## Needs Grant (resolved)

1. **P7 4.1 faith rewrite list as a table (comment 2).** Resolved: Grant picked option B, as a table, faith only (relayed by the goal-setting session, 2026-11-07). 4.1 Faith is now a two-column table, “Commitment (daily or weekly)” | “By the end of the year”, five rows built on the module’s existing faith examples (Grant’s row: “Read the Bible for 30 minutes a day” | “Read the whole Bible”). Faith only; fitness, work and personal keep their rewrite lists and could follow if Grant wants. To keep the cap of 3 table-type elements with none adjacent (grid, 4.1, 4.6), the 4.2 Family table became the rhythm stack figure from P4 4.5, with the same four commitments, sorted monthly to weekdays.

   The options as first listed:
   - **A. Plain list:** keep the five rewrites but drop the two-column table look (a simple list of commitments). Would it apply to all four rewrite lists (faith, fitness, work, personal) or faith only? They share one element, so changing one makes the four area modules inconsistent.
   - **B. Annual goal + commitment pairs (your suggestion):** each row pairs a yearly aim with the daily or weekly commitment that serves it, e.g. "This year: read through the Gospels → Commitment: three pages a day". This fits the accomplishment-vs-commitment model and would need a new element (or the rewrites element with new labels) in `build-v2.3.js` and both exporters. Same consistency question.
   - **C. Keep the table.**
   A reply on the comment (or a word to Claude) settles it; the change is small either way.

## Rebuilt (2026-11-07)

- P4 /goal-setting v2.4.2: Figma frame `150:454` (x 36350), 19 mobile frames, 18 notes.
- P7 /types-of-personal-goals v2.4.1: Figma frame `151:472` (x 39500), 17 mobile frames, 16 notes.
- The v2.4 frames `121:380` and `135:412` keep the comments pinned.
