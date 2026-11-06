# Topical Pillar v2.1 to v2.3 Figma builds (P4 done; P7 v2.3.3 built, photos placed)

Rebuilds the /goal-setting and /types-of-personal-goals mockups to the v2.1 spec (skill B3a element mix, B7 media beats) on page `25:2` of the homepage Figma file (`l27WIk0vje0syTYWN2iZee`), next to the v1 frames. Copy matches the v2.1 module docs in Drive (P4 `1MoB4eE3J-arMEzZAaPdoT0uobOeUAJRpQfDn0vPYvX8`, P7 `1QnORvxjkE8DisWWOcB-QBM8u6PgFuAOoJFz9xsUn6xE`).

Status 2026-11-01: `00-components-and-log.js` ran (component `30:138`, change log `30:141`) and `p4-goal-setting.js` ran (frame `31:138`). `p7-types-of-personal-goals.js` hit the Starter-plan call limit and has not run. Neither page has had the screenshot pass.

## Running scripts without the MCP cap (Scripter)
The Starter plan's MCP cap can run out after a single call, so run builds and canvas reads through the **Scripter** plugin in the Figma web tab (Claude in Chrome), not `use_figma`:
1. Assemble the script. The `.manual.js` output wraps it and replaces `figma.createAutoLayout`, which exists only in the MCP's version of the Plugin API (in Scripter it fails with `TypeError: not a function`).
2. Put it on the clipboard with `Get-Content <file> -Raw -Encoding UTF8 | Set-Clipboard` (Windows PowerShell). **`-Encoding UTF8` is required**: without it every ·, “ and → arrives garbled (v2.3's first build had to be deleted). Typing 40 KB into Scripter's editor breaks because of its auto-closing brackets. Don't edit data files with `node -e "..."` inside bash double quotes: bash expands `$1`, `$0` and `$100` in the copy.
3. In Figma, press Ctrl+/, type "Scripter" and press Enter. In the editor, press Ctrl+A then Ctrl+V, and click ▶ (top-right of the editor) to run.
4. Results and errors go to the browser console. Read them with `read_console_messages`, and have scripts `console.log(JSON.stringify(...))` so the output is readable.
5. Comments: `fetch('/api/file/<fileKey>/comments')` in the Figma tab. Mapping pins to nodes is a read script in Scripter: compare `client_meta.node_offset` against `absoluteBoundingBox`.
6. Screenshot checks: Chrome screenshots of the Figma canvas break often (`Cannot access a chrome-extension:// URL`). Save the MCP calls for `get_screenshot`.

## P7 v2.4 (2026-11-06): Brandon's model, five life areas
This is frame `135:412` at x 33675, with its mobile frames and notes (34 nodes from x 33500). The data is `p7-types-of-personal-goals-v2.4.js` on `build-v2.3.js`, assembled the same way as P4 v2.4 into `out/p7-types-of-personal-goals-v2.4.manual.js`. The change list is `docs/marketing/types-of-personal-goals-pillar-revision-2026-11-06.md`.

**Paste route fix:** Figma now swallows paste events, so a plain textarea stays empty after Ctrl+V. What works:
1. Put the textarea in a `<dialog>` opened with `showModal()`.
2. Add a capture-phase `paste` listener on `window` that reads `clipboardData.getData('text/plain')` into a global and calls `stopImmediatePropagation()`.
3. Run it with `new Function('figma', src)(figma)`.

The tab froze for about a minute during the build, then came back.

After the build:
- **Photos:** the 12 placed v2.3.3 photo frames were cloned into the new slots inside Figma (no upload). The hero tag reads "FAMILY · THIS YEAR / Plan our family trip, two hours a month." Order: gym in 4.3, single novel in 4.5, the three cards in 4.9. The desk photo is unused.
- **4.6:** the product UI is placed with `docs/brand/assets/site-imagery/place-p7-photos.js 4`. Specs: `pillar-types-of-goals-shapes-v2.4*.json`; the run tally has no target and shows "3 /–" (Grant chose the real app screen).
- **Checks:** text check found all 9 module headings and no undefined or NaN strings. The hero was eyeballed in Chrome.
- **P4 v2.4.1** was applied in frame `121:380` the same session:
  - 4.1 checklist line (desktop `121:562`, mobile `121:1059`)
  - 4.1 context paragraph (`121:572`), with the link underline re-applied

Exporters now read v2.4: `p7-publish-config.js` (media keys 4.3 / 4.5 / 4.6 / 4.9a-c, new meta description), and `export-html.js` / `export-handoff-p7.js`, which gained a `checklist` element.

## P4 v2.4 (2026-11-05): Brandon's model
This is frame `121:380` at x 31000, with 19 mobile frames and 18 notes. The data is `p4-goal-setting-v2.4.js`, run on `build-v2.3.js` (new optional hook `D.loopBackM` for the mobile loop line). There's no `assemble-v2.2.js` invocation for a cross-version pair, so the scratch assembly joined `lib.js` (before `// ---------- page build ----------`), `build-v2.3.js` and the v2.4 data, the same way that script does. Output: `out/p4-goal-setting-v2.4(.manual).js`.

It was run from Claude in Chrome with the textarea paste route and `new Function`. The tab froze for 10+ minutes and never answered, but the build had finished, which a fresh tab confirmed.

After the build:
- **Photos:** the v2.3 photo frames were cloned into the new slots (4.8 order: kitchen table, park bench, living room). The hero tag text became "GOAL · THIS YEAR".
- **4.7:** the `report-close` render was placed (`product-views/examples/pillar-goal-setting-report.json`, 720×760 JPEG). Mobile slot 335×354.
- **Mobile frames:** restacked with 24 px gaps after the taller 4.7.
- **4.1:** keeps the plain placeholder until the new photo exists.

Change list: `docs/marketing/goal-setting-pillar-revision-2026-11-05.md`.

## P7 v2.3.3 (2026-11-05): week calendar in 4.4, photos placed
Frame `116:4994` at x 28025, with 18 mobile frames and 17 notes. Grant's comment on `113:3790` stays pinned there: "Should this UI be more of the calendar view like we previously used in the other pillar page?" (his example was P4's week figure).
- **4.4** now uses that `week` element: four days, each with a minimum, in place of the rewrite list.
- **Photos:** the seven Gemini photos are placed with `docs/brand/assets/site-imagery/place-p7-photos.js`. It reuses the P4 `place()`/`tag()` helpers and makes one ~950 KB script, pasted with the textarea route and run with `new Function('return ' + src)()`.
- **Checks:** desktop and mobile were checked by eye in Chrome (hero tag, 4.4 week figure, 4.10 cards).

## P7 v2.3.2 (2026-11-05): Grant's 6 comments on 108:1372
Frame `113:3790` at x 25350 (12,013 px tall), with 18 mobile frames and 17 notes beside it. The comments stay pinned on `108:1372`.

New in `build-v2.3.js` (P4 re-assembles unchanged apart from the mobile stat padding):
- `m.body` (serif paragraphs) and an optional `m.el`, so a module can be prose only.
- `D.b7` is optional.
- The mobile stat callout has more padding.

Checked: modules 4.1 to 4.10 in order, no band 7, three image cards at 286×343, no unresolved text, nothing past the frame edge.

| Comment on 108:1372 | v2.3.2 change |
|---|---|
| "Emergency fund" not buffer | Grid cell, 4.2 rewrite and 4.9 copy changed |
| Shapes, short/long term and lead area aren't "types" | Reframed as types: the definition sorts goals three ways (life area, shape, time frame). H2s: "Know the four goal shapes…", "Use short-term goals to reach long-term ones". 4.9 is "Where to start". Kept because "types of goals" searches expect short-term vs long-term and process vs outcome |
| 4.9 table too light, use paragraphs | Signal table replaced by two paragraphs (`m.body`). The page now has 2 tables |
| Band 7 UI unlike the rest; see example (P4 4.8) | Band 7 removed. Its content is now module 4.10, the same image card grid as P4's 4.8, with 3 photos (prompts P7-5 to P7-7 in media plan §10) |
| Band 9: a 3×1 grid like the other pillar | Three columns with one item each: Plan weekly actions, Check in on progress, Guides |
| Mobile answer band needs more padding | Stat callout padding 12/16/12/20 (shared template change) |

## P7 v2.3.1 (2026-11-05): Grant's 16 comments on 99:276
Frame `108:1372` at x 22675 (12,262 px tall), with 18 mobile frames and 17 notes beside it; the comments stay pinned on `99:276`. Built from Claude in Chrome with the textarea paste route. New optional hooks in `build-v2.3.js`: `D.diagIntro` and `D.b7.cards`/`D.b7.foot` (P4 re-assembles unchanged). Checked: key points one line each, 15 linked text blocks, modules 4.1-4.9 in order, no text past the frame edge. Chrome canvas screenshots came back blurred or blank, so the visual check is still Grant's.

| Comment on 99:276 | v2.3.1 change |
|---|---|
| Key points: one line each | Cut to five one-liners (all render on one line) |
| Grid "floating there" | Intro sentence above the grid: how to read rows and columns, where each is explained |
| Add faith/spirituality, with body content | Faith row in the grid, index item, new module 4.6 (5 rewrites), signal-table row in 4.9 |
| Health: how it feeds every other pursuit (+ "ok to expand") | 4.1 lead expanded |
| 4.1: only one supporting statement (the habit study) | Federal-guidelines line cut |
| Money: wealth-builder vs. debt | 4.2 lead covers both; investing rewrite replaces eating out |
| Career: promotion vs. stability | 4.3 lead covers both; "feel secure in my job" rewrite |
| Relationships: single, married, friendship | 4.4 lead covers all three; dating rewrite replaces volunteering |
| Learning: excellence, skill gap, something new | 4.5 lead names all three; faith moved out |
| Explain "shape" so the table makes sense | 4.7 lead defines each shape before the table |
| Expand on the why (short/long term; lead area) | 4.8 and 4.9 leads give the reason |
| Body links to other pillars and 1-2 Field notes | /self-improvement (4.5), /life-planning + /goal-setting + 30-day sprint (4.8), /personal-life-audit (4.9), /personal-accountability + check-ins article (band 7) |
| Band 7 out of place; tie goal types to self and partner/group accountability | Rebuilt: "Hold yourself to your goals, then let someone else ask" with three cards (on your own, with a partner, with a group) |
| Band 9: always 3 items | 3 guides + 2 Field notes |

## P7 v2.3 (2026-11-04): next pillar, built straight on the approved template
Grant picked /types-of-personal-goals as the pillar after P4. Instead of repeating the v2.1 → v2.2 → v2.3 comment rounds, `p7-types-of-personal-goals-v2.3.js` puts the v2.1 module-doc copy on the v2.3 build with every P4 lesson applied (list in the frame's change-log note and in media plan §10). Assemble with `node assemble-v2.2.js 2.3 p7-types-of-personal-goals` (the second argument is new; it defaults to P4). `build-v2.3.js` gained three backward-compatible hooks: `D.mDiagram` (page-specific mobile diagram; P4 still gets the loop), `MEL.stack` (mobile year-to-week figure), and `media.below` (product UI under a full-width table instead of a split). The P4 output re-assembles unchanged apart from those hooks. **Built 2026-11-04:** frame `99:276` at x 20000 (10,486 px tall), with 17 mobile frames and 16 notes beside it, on page `25:2`. It ran straight from Claude in Chrome: the script was pasted into a temporary textarea on the Figma tab (a real Ctrl+V, because `navigator.clipboard.readText()` hangs there) and run with `new Function`. Text check: all 15 headings present, no undefined/NaN strings, no overlap with other frames. Only the desktop hero has been eyeballed; the rest awaits Grant's review. The old v2.1 `p7-types-of-personal-goals.js` is superseded.

## v2.3 (P4, 2026-11-03): last layout pass before imagery
Built from Grant's 9 comments on v2.2 (comments stay pinned on the v2.2 frame): `build-v2.3.js` + `p4-goal-setting-v2.3.js`, assembled with `node assemble-v2.2.js 2.3`. Frame `48:292` at x 12675, with 19 mobile frames and 18 notes beside it. Run through Scripter; the run returned no errors. Chrome then lost access to the Figma tab (`Cannot access a chrome-extension:// URL`) and the MCP was still capped, so v2.3 has had **no visual or text check**.

| Comment on v2.2 | v2.3 change |
|---|---|
| Style the topic term (“Goal setting:”) to hold attention | Words before the colon in the H1 set in ember italic (desktop + mobile) |
| Mobile hero button should go sticky after scrolling past | New mobile frame: compact sticky bar with “Start a group →” |
| Mobile page length: make stacked cards horizontal scrolls with a peek | 4.2 and 4.4 table cards and the path cards are swipe rows (image cards already were) |
| Mobile path cards: horizontal scroll | Swipe row |
| Remove the Brandon paragraph | Removed on both devices |
| 4.7 blank space: focus the product UI | Media split with a “Product UI” slot (real app report screen). Media beats now 6, one over the 3–5 rule |
| CTA headline unclear; make it motivational and tied to the pillar | “Start hitting your goals with a group that checks in.” (`cta.h`, per pillar) |
| CTA step boxes look like buttons | Plain numbered steps with arrows, no boxes (both devices) |
| Money stakes aren't optional? | Fine print now “No monthly fee · $1 platform fee per forfeit charged”. Code allows `penaltyAmountCents` 0, onboarding defaults to $100: confirm with Brandon |

**v2.3.1 (same day):** three small comments were applied in place on `48:292`, desktop and mobile, and synced into `p4-goal-setting-v2.3.js`. The 4.6 go-deeper card is removed (rule: at most one per page). Band 9 "Neighbor guides" became "Guides", listing one guide. The band 7B note's "$1" was restored. A Scripter text check found no garbled characters, the H1 accent split correctly, the new CTA headline is in place, and the Brandon paragraph is gone. Grant: "looking good". The layout is signed off; next is the media pass. The approved template rules are now in the pillar skill (Part B) and the playbook (§3.2).

## Media pass 1 (2026-11-03): illustrations and product UI placed in v2.3
`media-p4-paper.js` (Paper style, which Grant picked) put the hero, 4.1 and 4.3 illustrations into `48:292` and its mobile frames. 4.1 was then re-placed with better positions (`63:280`, `63:317`). The 4.7 `week-board` renders went in as image fills (`65:280` desktop, `65:282` mobile) through a generated script that embeds the PNGs as base64 (`figma.base64Decode` + `figma.createImage`). Still open: the persona photos (4.6, 4.8 cards 1–2), the 4.8 card 3 illustration, and the goal tag. See `docs/marketing/pillar-media-plan-2026-11-03.md` §7–8.

**Scripter gotchas found on the way:**
- Copy with `node notes/figma-pillar-v2/to-scripter.js <file>`. It strips whole-line comments and copies as UTF-8.
- Open a **fresh "+" script tab for each run**. A tab that once held other text kept throwing "unexpected token" on a script that ran fine in a new tab.
- Check from a screenshot that Scripter is really open before pasting, or the paste lands on the canvas as a text layer.
- Anything Grant copies in the meantime replaces the clipboard, so look at the editor before clicking run.

## Hero style frame v1 (2026-11-03): media pass, step 1
`hero-style-v1.js` (plain API, run through Scripter) builds frame `54:293` at x 15350. It holds the P4 hero illustration (goal card "Run four times a week" plus a week grid with 4 of 4 kept) on three grounds: A Paper (line), B Ink, C Ember soft. Each is shown at desktop 460×400 and mobile 335×230, then dropped into a copy of the v2.3 hero. It was checked by eye in Chrome. Then the off-day cells were made visible (soft stroke) and the goal was set to break "Run four times / a week.", patched in place and in the script. Waiting for Grant's pick. Chrome screenshots of Figma keep failing because LastPass's content script throws on figma.com. Turning LastPass off for that site should fix it.

## v2.2 (P4 only, 2026-11-03): built through Scripter
Grant left 20 comments on the v2.1 P4 frame `31:138` (kept for history; comments stay pinned to it). v2.2 applies them and adds a 375 mobile view of every band in a column beside the desktop frame. Files: `build-v2.2.js` (new page build plus mobile variants; reuses the lib.js helpers), `p4-goal-setting-v2.2.js` (data), `assemble-v2.2.js` → `out/p4-goal-setting-v2.2.js` (for `use_figma`) and `out/p4-goal-setting-v2.2.manual.js` (to paste into the Scripter plugin by hand). It lands at x 10000 or further right if that space is taken, with notes to the right of the mobile column.

The `use_figma` run failed on 2026-11-03 because the Starter cap was hit after one read call. The same day it was built through Scripter (see above) at the far right of page `25:2`. Only the desktop hero has been eyeballed; the bands below it and the mobile frames still need Grant's review.

| Comment on v2.1 | v2.2 change |
|---|---|
| Hero: no dates, it isn't a blog post | Updated date removed |
| Hero: add a primary CTA | “Start a group →” ink button + “See how it works” link |
| Topic map too large | Ten cards became a numbered two-column index |
| Remove “Full guide” everywhere | Removed |
| H2s too vague / “plan” not “planning” / read as if only headlines are read | Every module H2, plus band 7 and band 8, rewritten as a standalone instruction with the why (4.2 uses Grant's wording) |
| 4.5: “not sure what this is” (go-deeper card) | Card labeled “Go deeper · Field notes article” with “Read the article →” |
| 4.6 media slots | Kept |
| 4.9 cards not needed | If-then cards became a plain text list |
| Band 7 CTA out of place → make it a more dynamic CTA | Soft CTA card replaced with an ink product CTA band (three-step strip, two buttons) |
| Band 8: 4×1 instead of 2×2 | Four path cards in one row, equal height |
| Band 9: odd spacing | Fixed column widths, a rule under each label, an even 12 px link gap |

Spec follow-ups if Grant approves: drop the updated date from the Topical Pillar hero (skill Part B, playbook), make the product CTA band the pillar standard, and copy the new H2s into the P4 module doc.

## Run
1. `node notes/figma-pillar-v2/assemble.js` writes paste-ready scripts to `out/` and syntax-checks them.
2. `create_session` on the file, then one `use_figma` call per script, in order: `out/00-components-and-log.js` (media placeholder component plus the v2.1 change log at x 4800; it skips itself if already built), then `out/p4-goal-setting.js` (x 5500) and `out/p7-types-of-personal-goals.js` (x 7500). The two page scripts can run in parallel.
3. Screenshot the bands with one `use_figma` call per page (at most 5 screenshots per call), fix, then comment the frame links on both Asana cards.

Budget: about 6 calls. The Starter plan allows about 20 a month, but on 2026-11-03 it allowed only one call before the cap hit. Don't count on more than a couple per session.
