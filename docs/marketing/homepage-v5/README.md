# Homepage v5: HTML mockup (desktop + mobile)

`index.html` is the Figma v5 homepage (frame `77:2` in file `l27WIk0vje0syTYWN2iZee`) as one responsive page. The copy matches Figma word for word. The desktop layout follows the 1440 frame. Mobile (375) is new, since Figma has no mobile homepage yet, and it reuses the patterns Grant approved on the Topical Pillar template v2.3: stacked full-width buttons, swipe rows with a peek, and a sticky "Start a group" bar once the hero buttons scroll away.

## Live dates

Every date in the product screens comes from the shared demo clock (`docs/brand/assets/product-views/demo-clock.js`, the same module the product-view renderer uses), so the page always shows the current week.

- The demo group meets on the **first Thursday of each month**, like Brandon's group, so the cycle follows the real calendar. On Nov 3, 2026 it shows the October cycle (Oct 1 to Nov 4), day 34 of 35, closing Thu, Nov 5. On a meeting Thursday the next cycle starts.
- The hero week board shows the cycle week that contains today. Past days follow each goal's pattern, today is marked in ember, and later days are empty. Early in a cycle week the board is mostly empty; that's what the real app shows too.
- The current cycle is always "Cycle 5". The filed report and the ledger belong to Cycle 4, which closed at this cycle's opening meeting (filed two days before it).
- Preview any day with `?today=YYYY-MM-DD`.

## View it

The page loads the clock with a relative path, so open it through a local server, not as a file:

```bash
node .claude/tools/static-server.js 4173
```

Then open http://localhost:4173/docs/marketing/homepage-v5/index.html. In the Claude desktop app, the `docs-static` preview config starts the same server.

## Single-file copy (for sharing)

`node build-single-file.js` writes `dist/accountability-guild-homepage-v5.html`: the same page with the demo clock inlined and the proof photo embedded, so it opens straight from an email attachment (it needs internet only for the fonts). Rebuild it after any change to `index.html`.

## SEO

`seo-requirements.md` lists what the production build must ship with: metadata, server-rendered dates, links, image handling, CMS follow-ups. The mockup already has the fixed heading outline and real links.

## Open questions for Grant

- **Mobile** is a first proposal: there's no Figma mobile homepage to match yet.

## Resolved

- **Setup card vs. hero (2026-11-03, Grant):** the Step 1 card is now a different group, Tuesday Founders Group (Priya, Leo, Sam, Kate; every two weeks on a video call, $50 a cycle). Its first cycle starts at its next Tuesday call, at least two days out. Same change in Figma v5 (`77:2`) and its change log.
- Field notes card links point at the live `/blog/<slug>` URLs.
