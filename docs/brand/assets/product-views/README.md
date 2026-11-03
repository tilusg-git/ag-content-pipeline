# Product views: real app UI for social images and GIFs

Renders Accountability Guild product screens with sample data into a branded social frame, as a PNG or an animated GIF. Use it to show the product in posts and ads.

It's real UI, not a redraw. `scenes.js` produces markup with the app's own class names (mirroring `repo/src/components/dashboard-today-marks.tsx`), and `render.js` inlines the app's own stylesheet (`repo/src/styles/components.css`). If the app's styles change, re-rendering picks up the change.

This replaces the single-card canvas tool from 2026-08-07 (`../social/checkmark-card-tool.html`), which redrew one Kept/Missed/Skipped card by hand.

## Run it

```bash
node render.js examples/week-board.json                 # PNG, 1080x1350
node render.js examples/week-board.json --gif           # animated GIF (720 wide)
node render.js examples/goal-detail.json --size 1080x1080 --theme ink
node render.js examples/mark-sheet-kept.json --frame bare   # panel only, transparent PNG
```

Output goes to `out/` as `<slug>-<size>[-ink][-bare].png|gif`.

Requirements: Microsoft Edge (Playwright drives it, so there's no browser download), `repo/node_modules/playwright`, `../facebook/node_modules/@napi-rs/canvas` (decodes GIF frames), and network access for Google Fonts.

## Scenes

| Scene | What it shows | Source component |
|---|---|---|
| `week-board` | Goals × days for one week: kept/missed/skipped cells, note corners, photo dots, count tallies, report-only goals | `WeekBoard` |
| `mark-sheet` | The check-in dialog: Kept/Missed/Skipped, note, photo, Done | `MarkSheet` |
| `goal-detail` | One goal's cycle history: streak, hits, 4-week day grid | `GoalDetail` |
| `report-goal` | Scoring one goal at cycle close: status, evidence from marks, 0–100% picker, "What happened" write-up | `dashboard-reporting-flow.tsx` goal row |
| `report-close` | The whole close: "Write the report." masthead, every goal's score, live tally (kept, forfeit, returned), forfeit note, the "Ready to file" panel that says the forfeit pools into the kitty | `dashboard-reporting-flow.tsx` |

`report-close` is tall, so use it at 1080x1350 only. At 1080x1080 the text gets too small; for square posts, use `report-goal` or `--frame bare`. Two layout changes keep it inside the frame: the sidebar is narrower than in the app, and the submit button sits under the panel text instead of beside it. Set `mastTally: false` to drop the masthead tally, since the sidebar shows the same numbers. Money values are display strings, so keep them consistent yourself: with a $100 stake across 5 goals, each missed goal forfeits $20 and a 50% goal forfeits $10.

The data fields for each scene are documented at the top of each scene in `scenes.js`. To start a new image, copy an example spec.

## Social carousels: mobile captures (`layout: "mobile"`)

For social, the image is the app itself, with no headline; the post caption carries the context. Set `"layout": "mobile"` and the scene renders at phone width (390 px). That turns on the app's own mobile CSS, so the screen looks the way members see it on a phone. For example, the report hides the tally sidebar and shows Kept / Forfeit / No report in the header. The renderer then crops one phone-screen window and places it on the bone background above the logo footer.

```bash
node render.js examples/report-carousel.json            # 4 slides, one PNG each
```

- `report-page` is the whole cycle-close report page on a phone, top to bottom.
- `slides`: `[{ "slug": "...", "crop": { "anchor": "#pv-goal-1", "offset": -20, "height": 700 } }]`. Each slide crops the same page, starting at its anchor. Anchors: `top`, `#pv-mast`, `#pv-subject`, `#pv-goal-N`, `#pv-picker-N`, `#pv-reflection`, `#pv-submit`. All slides share one height, so a carousel stays uniform, and crops never run past the end of the page.
- `--frame bare` writes the raw phone capture with no frame.
- `--gif` works the same way: the crop is measured on the first frame and held.

`examples/report-carousel.json` is the current report set:
1. `report-1-header`: "Write the report.", the cycle line, and Kept 4/5 · Forfeit $10 · No report 0
2. `report-2-evidence`: a goal at 50%, with its marks shown as read-only evidence
3. `report-3-score`: the completion picker and the "What happened" write-up
4. `report-4-file`: the reflection and the "Ready to file" panel (forfeit pools into the kitty)

The desktop, headline-framed report renders (`report-close`, `report-goal`) are parked as Reddit ad creative options for the 2026-11-09 Reddit Ads review.

## Dates: the demo clock (`demo-clock.js`)

Sample dates are written relative to today, so every render shows the current week. The module is shared with the homepage mockup (`docs/marketing/homepage-v5/`), which loads it in the browser.

- `{{d:-8}}` → "Oct 26" (8 days ago). Formats: `{{d:0|dowmd}}` "Tue, Nov 3", `|DOWMD` "TUE, NOV 3", `|day` "Tuesday", `|dow2` "Tu", `|dom`, `|month`, `|mdy`, `|iso`.
- `{{range:-4:2}}` → "Oct 30–Nov 5" (or "Nov 2–8" within a month).
- `"days": { "$days": { "from": -4, "count": 7 } }` builds the week-board day list with today in the 5th column. Cell patterns are by position, so they keep lining up whatever weekday it is.
- Optional `"clock": { "cycle": { "meets": "Thu", "weeks": 4, "minDaysLeft": 5 } }` adds a cycle that is always 5 to 11 days from closing: `{{d:close|dowmd}}`, `{{d:start}}`, `{{n:daysLeft}}`, `{{n:week}}`, `{{n:month}}`.
- The renderer prints the date it used. `--today 2026-11-02` (or `"clock": { "today": "2026-11-02" }` in the spec) reproduces an image exactly. Pin the date in the spec for anything already posted, so a re-render matches the post.
- Self-check: pinned to their original dates, all the example specs resolve to exactly their old fixed-date content (checked 2026-11-03).

## Spec file

- `scene`, `slug`, `size` (`1080x1350` default, `1080x1080`), `theme` (`light`, `ink`), `frame` (`social`, `bare`)
- `kicker`: the mono line above the headline. `headline`: wrap words in `*asterisks*` for the ember italic.
- `zoom`: maximum magnification. The panel shrinks automatically to fit between the headline and the footer.
- `clock`: optional `{ today, tz, cycle }` (see the demo clock section).
- `data`: the scene's data. Write dates as tokens, not fixed strings.
- `steps` (GIF only): `[{ "set": { "goals.0.cells.4": "done" }, "hold": 500 }]`. Each step changes the data cumulatively and is held as one frame. `firstHold` sets how long the opening frame is held.

## Rules for the sample data

- Use believable members and goals: no QA strings, no real member data, no `@accountability.local`.
- Headlines and kickers follow `docs/brand/voice-and-tone.md` (no humor, no emoji) and `docs/brand/glossary.md`.
- Show only what the app actually does (`docs/product/capability-ui-inventory.md`). The scenes mirror shipped components, so keep the data to states those components can show.

## Adding a scene

Read the component's JSX, copy its class structure into a new `render(data)` in `scenes.js`, and register it in the exports. Where the component uses Tailwind utilities (the app's stylesheet doesn't include them), add a small `pv-*` rule in `render.js` instead. Candidates for the next scenes: the group kitty and its disbursement, and the group activity feed.
