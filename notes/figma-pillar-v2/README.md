# Topical Pillar v2.1 / v2.2 Figma build (P7 pending)

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
