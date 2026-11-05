# Homepage v5: SEO requirements for the build

This checklist goes out with `build-handoff.md` (Brandon, 2026-11-05: the SEO checklist stays with the build handoff).

SEO pass on the v5 mockup (`index.html`), run 2026-11-03 against the SEO checklist (`.claude/skills/seo-review/checklist.md`) and the site profile for `www/`. It lists what the production homepage (`www/src/app/(site)/page.tsx` + the `homepage` global) must ship with when v5 replaces the current page. The PR still gets its own `seo-review` against the real diff.

**Route:** `/` (changed). No new or removed routes, so no redirects.

## Already fixed in the mockup (keep them in the build)

- **Broken guide links.** The three guide cards pointed at `/blog/personal-accountability`, `/blog/goal-setting` and `/blog/behavior-change`, which all return 404. They're Topical Pillars, which live at the top level (`/personal-accountability`, `/goal-setting`, `/behavior-change`; all 200). The link under them now reads "All guides →" and goes to `/resources`. In the build, use `siteHref()`, never a hard-coded `/blog/` prefix for pillars.
- **Headings.** One H1, H2 per section, H3 for items inside a section. The text inside the sample app screens ("Day 34 of 35…", "The October cycle closes in 2 days", "The commitment, on paper.", "Report filed.", "Per-member contributions") was marked up as h3/h4; it's now plain text styled the same way, so the page outline is only real content. The FAQ, "who it's for" and guide-card titles went from H4 (skipping H3) to H3. Visual styles were checked as identical before and after.
- **Real links.** Nav, footer and every "Start a group" / "Log in" button now go to real routes: `/how-it-works`, `/pricing`, `/blog`, `/login`, `/create-account`, `/privacy`, `/terms`. The hero's "How it works" button stays an in-page jump to the 03 section.

## Blocking (the PR can't open without these)

1. **Server-render the sample dates.** The mockup hides the page until JavaScript fills in the dates (`clock-pending`). The build must not do that: crawlers and link previews would see a blank or half-filled page. Compute the dates on the server with the shared demo clock (`demo-clock.js`, cycle `{ meets: "Thu", rule: "first" }`, `tz: "America/Chicago"`) and render the finished text. The 5-minute Cloudflare HTML cache is fine; the date only changes once a day. Don't recompute on the client, to avoid a hydration mismatch.
2. **Use a real `<title>` and description for `/`** (see the table below). The live title today is "Accountability Guild | Goal & Accountability Software for Group": 63 characters, brand first, and "for Group" is a typo.

## Required in this PR

- **Metadata.** Update the code defaults in `generateMetadata()` and keep `absoluteTitle: true`. The `homepage` global's SEO tab overrides the code, so set the same values there (see CMS follow-ups).
- **Primary term on the page.** "Accountability software" was missing from the v5 copy, and it's the term the site profile and `llms.txt` lead with. Grant approved a hero sub under the H1 (2026-11-04), now in the mockup; ship it as body text (`<p>`), not a heading:
  > Accountability software for partners or groups. No monthly fee.

  "No monthly fee" moved up from the hero note, which now reads only "Free to start, and set up in five minutes."
- **Proof photo** (Step 2 phone screen): keep the alt text, set `width`/`height`, serve WebP through `next/image`, lazy-load it (it's below the fold), and give the file a descriptive name, e.g. `home-proof-spin-bike-workout.webp`.
- **Keep the internal links the current homepage gives.** Today `/` links to `/faq`, `/startup-accountability-system` and `/blog/weekly-or-4-week-goal-reporting-template-for-founders-and-operators`; v5 drops all three. Add FAQ to the footer, and make sure the other two are still linked from `/resources`, `/blog` or a pillar, so they don't lose their only link from `/`.
- **Product screens are HTML text, not images.** Keep them that way (it helps crawlers). The mockup wraps each one in a `<figure>` with an `aria-label` ("Example app screen: …"), so the sample names and amounts read as illustration, not as claims. There's no visible caption on the homepage (Grant, 2026-11-05). Keep the labels in the build (see `build-handoff.md`).

## Recommended

- **Open Graph image.** `opengraph-image.tsx` should carry the v5 H1, not the old hero line, so shared links match the page.
- **FAQ.** The four money questions on the homepage should also be on `/faq`, which carries the `FAQPage` schema. Don't add a second `FAQPage` block to `/`.
- **Group modes.** v5 drops the owner-led/peer explainer. `/how-it-works` still covers "Owner-led", so nothing is lost; link it from the 03 section, which v5 already does.
- **No new schema.** The sitewide `Organization` + `WebSite` JSON-LD is enough. Don't add a `SoftwareApplication` `Offer` with a $0 price (Grant's rule: never say $0).
- **`llms.txt`.** Add one line of homepage positioning in v5's words (goals, check-ins and reports in one place; missed goals pay the group's kitty) so answer engines quote the current framing.

## CMS follow-ups after merge

- [ ] `homepage` global → SEO tab: enter the title and description below exactly.
- [ ] The new v5 fields (FAQ items, "who it's for" cards, founder note, guide cards) get real seed content, not placeholders.
- [ ] Alt text on the proof photo's Media item.

## Baseline (not caused by v5)

- The live `robots.txt` is Cloudflare's managed block and still disallows GPTBot, ClaudeBot, Google-Extended and others (checked 2026-10-28). It needs the Cloudflare setting changed.

## Proposed metadata

| Route | Title (chars) | Meta description (chars) | Canonical |
|---|---|---|---|
| `/` | Accountability Software for Groups \| Accountability Guild (57) | Accountability software for groups: set goals, track progress your way, and report back before you meet. Missed goals pay your group’s pot. No monthly fee. (155) | `https://accountabilityguild.com` (unchanged) |

The description was revised 2026-11-05 for Brandon's Step 2 positioning: the report is the core, and tracking in the app is optional ("track progress your way").
