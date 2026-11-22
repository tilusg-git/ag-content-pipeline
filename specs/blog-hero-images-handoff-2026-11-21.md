# Blog hero images: build hand-off (batch 1, 2026-11-21)

For Project Start. Live blog articles have no images today: the article template has no image slot, and every article shares the site-wide `/opengraph-image`. This hand-off asks for the image slot once, then delivers the first three articles' images. More articles follow in later batches under the same file pattern, so nothing in the template should be article-specific.

Spec background: `specs/blog-content-guide-authorship-schema-imagery-seo-2026-07-16.md` §3.1 (hero image) and §2.1 (Article schema `image` array).

## 1. One-time template change

1. **Add an optional `heroImage` field** to each blog article entry (`src/lib/marketing-content.ts` or wherever blog entries now live): `{ src16x9, src4x3, src1x1, srcOg, alt }`. Articles without it render exactly as today.
2. **Render the hero** from `src16x9` with `next/image`, at the top of the article directly below the H1 (above the Quick Summary), full content width, `priority` set (it's above the fold), with `alt` from the field. No caption, no overlay, no border radius beyond the site's default for images.
3. **Article schema:** set `image` to the three ratios as absolute URLs: `[src16x9, src4x3, src1x1]`.
4. **Share image:** when `heroImage` exists, use `srcOg` (1200×630) as the article's `og:image` and `twitter:image` instead of the site-wide `/opengraph-image`. The share image already has the Accountability Guild monogram in its bottom-right corner; the page hero crops deliberately don't.
5. **Files:** copy the images into `public/blog/<slug>/` (or your preferred static path) as `hero-16x9.jpg`, `hero-4x3.jpg`, `hero-1x1.jpg`, `og.jpg`. Sizes: 1600×900, 1200×900, 1080×1080, 1200×630, JPEG.

## 2. Batch 1: three live articles

Download links are raw GitHub files from `tilusg-git/ag-content-pipeline` (`docs/brand/assets/site-imagery/out/`). Replace `<size>` with `16x9`, `4x3`, `1x1` or `og`.

| Article | Files | Alt text |
|---|---|---|
| `/blog/accountability-buddy-vs-partner-vs-group` | https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/blog-accountability-buddy-vs-partner-vs-group-<size>.jpg | A park path in autumn with three people walking away from the camera, a few more walkers far ahead. |
| `/blog/how-to-run-accountability-check-ins-that-actually-change-behavior` | https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/blog-how-to-run-accountability-check-ins-that-actually-change-behavior-<size>.jpg | Three people at a tall café table during a short standing check-in; one reads from a handwritten index card. |
| `/blog/designing-consequences-that-increase-follow-through-without-burning-trust` | https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/blog-designing-consequences-that-increase-follow-through-without-burning-trust-<size>.jpg | A hand tucks a folded bill into an envelope of cash beside a spiral notebook on a wooden table. |

## 3. Check after deploy

- Each of the three articles shows its photo under the H1, on phone (375) and desktop (1440) widths, with no layout shift.
- View source: `og:image` points at the article's own `og.jpg`; the Article JSON-LD `image` array lists the three ratios.
- An article without `heroImage` (any other live article) still renders and still uses `/opengraph-image`.

## Coming next

Five more live articles (How to Find an Accountability Partner, the weekly reporting template, the 30-day sprint, the resource-library article and Startup Accountability System) get their images in a later batch. New articles will arrive with `heroImage` values in their publish hand-off.
