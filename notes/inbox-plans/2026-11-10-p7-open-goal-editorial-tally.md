# P7 4.6: open goal as a separate editorial tally (Brandon, 2026-11-09)

Source: Brandon's reply (drafted by his agent, claude@projectstart.co, Brandon cc'd) on
"/types-of-personal-goals guide for review", 2026-11-09 16:55 CT. Gmail thread `1a1adc2283187518`,
message `1a1c286781004ffa`. Written by the inbox-replies routine on 2026-11-10. Nothing in the page
data, renders or Figma has been changed yet.

## What he said (short)

- Both revised guides address his feedback ("The updated direction addresses my feedback").
- **P7 4.6 open goal:** use a separate editorial tally, not the app screen.
  - Keep the supported faith (daily marks) and family (tracked at the cycle report) rows in the app
    illustration.
  - Show the open goal separately, beneath the goal-shapes table, for example
    "3 runs recorded this week—see how far you get."
  - Remove the target-free running tally and its full progress bar from the app screen.
  - Adjust the surrounding copy and alt text so nothing implies the app offers a target-free
    Count mode.
- **P4:** Project Start is updating P4 in their existing PR12 with the what-it-takes check, the
  deferral wording and the explanatory paragraphs (v2.4.1 / v2.4.2). Nothing for us to build.
- **Hold:** they're holding off on building P7 and on publishing either guide. He wants the
  corrected P7 illustration back for review.

## Why this wasn't applied automatically

1. It reverses a recorded call of Grant's: on 2026-11-06 Grant chose the real app screen
   ("3 /–") over an editorial tally (`p7-types-of-personal-goals-v2.4.js`, 4.6 note; CLAUDE.md P7
   section). Brandon's reason is product accuracy: the app doesn't offer a target-free Count mode.
   This also contradicts the CLAUDE.md line that "3 /–" is the app's real tally.
2. It needs a new element (an editorial tally callout) that neither the Figma builder
   (`build-v2.3.js`, shared with P4) nor `export-html.js` has today, plus a Figma rebuild through
   Chrome/Scripter.

## Proposed changes

1. `docs/brand/assets/product-views/examples/pillar-types-of-goals-shapes-v2.4.json` (and the
   mobile spec): drop the fitness `count` goal; keep faith `daily` and family `report`. Re-render
   `p7-p46-ui-desktop.png` / `-mobile.png` and check the crop (two rows, so the frame gets shorter;
   update `d`/`m` sizes in `p7-publish-config.js`).
2. `notes/figma-pillar-v2/p7-types-of-personal-goals-v2.4.js`, module 4.6:
   - add an editorial tally under the table, e.g. `tally:{label:'Open goal · Fitness',
     value:'3 runs recorded this week', line:'See how far you get.'}`. Brandon's example says
     "this week"; the table row says "this month". Pick one (suggest matching the table:
     "this month", with a month-scale number such as 9).
   - media `desc` and `alt`: "one goal marked by day and one tracked at the cycle report".
   - second context line: replace "daily marks, a running tally with no target, or nothing until
     the cycle report" with something like "mark it by day, count it, or track nothing until the
     cycle report" only if Count with a target is a real mode; otherwise "mark it by day or track
     nothing until the cycle report". **Needs Brandon's or Grant's confirmation of which tracking
     modes the app has.**
   - note: record the reversal (Brandon 2026-11-09) and the new element.
3. `p7-publish-config.js`: 4.6 alt text to match.
4. `build-v2.3.js` and `export-html.js`: add the tally element (bordered panel, mono label, serif
   value, one line), desktop and mobile. Label it editorial in the module note; no "Illustrative"
   product caption on it since it isn't a product view.
5. Re-run `export-html.js` and `export-handoff-p7.js` (hand-off, HTML mockup, `dist/`).
6. Figma: rebuild 4.6 in a new frame (v2.4.2) via the `figma` global in Chrome or Scripter; keep
   `151:472` with its comments.
7. CLAUDE.md P7 section: replace "4.6 uses the real app screen (a tally with no target, "3 /–";
   Grant's call)".
8. Reply to Brandon in the P7 thread with the corrected illustration (Figma link + hand-off link,
   GitHub links only).

## Open questions for Grant

1. OK to reverse your 2026-11-06 call and go with Brandon's editorial tally? (Recommended: yes; he
   owns the product and says the screen implies a mode the app doesn't have.)
2. "This week" (Brandon's example) or "this month" (matches the 4.6 table row and the grid cell)?
3. Which tracking modes does the app actually have, so the 4.6 product-context line is accurate?

## Size

About one focused session: spec + render, data and config edits, a small new element in two
builders, regenerate, one Figma build, reply draft.

## Done 2026-11-12

Grant forwarded Brandon's email to act on. Answers to the open questions:
1. Reversal: applied (Brandon's direction).
2. Wording: Brandon's example verbatim, "3 runs recorded this week" / "See how far you get." It's a snapshot inside the table's "this month" example.
3. Tracking modes, from the code: `daily`, `count` (a weekly target from 1 to 999 is required: `goal-form.ts`, `goals-service.ts`, `dashboard-reporting.ts`), and `percentage` (tracked at the cycle report). The product line now reads "daily marks, a weekly count toward a target, or nothing until the cycle report."

Steps 1 to 5 and 7 are done. The tally is in `export-html.js` and `export-handoff-p7.js` only. Step 6 (Figma) isn't done, because `build-v2.3.js` has no tally element yet. Review PNGs: `docs/marketing/pillars/types-of-personal-goals/review/p7-4.6-open-goal-{desktop,mobile}.png`. Step 8: a Gmail reply draft (not sent).
