# Handoff: move `startup-accountability-system` to `/blog` (URL separation, part 1)

**For:** the implementing agent working in the accountabilityguild.com repo (`repo/` in this project).
**From:** Content Pipeline planning, 2026-09-30. Approved by Brandon Tilus.
**Scope:** one article move plus a redirect, links, tests, and a feature-doc update. No content rewrites.

## Why

The site is adopting a fixed URL rule:

- **Pillar pages live at the top level:** `accountabilityguild.com/<slug>`. There are two kinds: Core Product Pillars (`/how-it-works`, `/pricing`, ...) and Topical Pillars (`/goal-setting`, `/personal-accountability`, ...).
- **Blog articles always live under `/blog/<slug>`.**

Today, `resourceArticles` in `src/lib/marketing-content.ts` is served at the top level by `src/app/[slug]/page.tsx`, and `blogPosts` is served at `/blog/<slug>` by `src/app/blog/[slug]/page.tsx`. Seven of the eight `resourceArticles` entries are Topical Pillars and stay where they are. One, `startup-accountability-system`, is a blog article and has to move. (It will be rewritten later through the content pipeline. This change only moves it.)

The site is not indexed yet, so a URL change now costs nothing in search.

## Changes

### 1. Move the article data
In `src/lib/marketing-content.ts`, move the `startup-accountability-system` object (currently starts at line 648) out of `resourceArticles` and into `blogPosts`, unchanged. Keep the slug, title, excerpt, `publishedOn`, and sections exactly as they are.

Leave these seven in `resourceArticles`: `goal-setting`, `types-of-personal-goals`, `personal-accountability`, `behavior-change`, `personal-life-audit`, `life-planning`, `self-improvement`.

Add a short comment above each array stating the rule:
- above `resourceArticles`: `// Topical Pillars only. Served at /<slug>. Blog articles go in blogPosts.`
- above `blogPosts`: `// Blog articles. Always served at /blog/<slug>.`

### 2. Add a permanent redirect
In `next.config.ts`, add to the existing `redirects()` array:

```ts
{
  source: "/startup-accountability-system",
  destination: "/blog/startup-accountability-system",
  permanent: true,
},
```

Check that no existing redirect points at `/startup-accountability-system` (none did as of 2026-09-30); if one does, point it straight at the `/blog/` URL so there is no redirect chain.

### 3. Update internal links (3 known)
| File | Line (2026-09-30) | Current | Change to |
|---|---|---|---|
| `src/app/page.tsx` | ~101 | Field notes card `href: "/startup-accountability-system"` | `href: "/blog/startup-accountability-system"` |
| `src/app/page.tsx` | ~473 | Footer link "Founder systems" → `/startup-accountability-system` | `/blog/startup-accountability-system` (keep the label) |
| `src/app/blog/page.tsx` | ~69 | "Pillar resources" block link "Startup accountability system" | This block lists pillars, so the moved article no longer belongs in it. Replace with `<Link href="/personal-accountability">Personal accountability</Link>` |

Then search all of `src/` (and `public/`, including `llms.txt` if present) for any other `"/startup-accountability-system"` reference and update it the same way.

### 4. Update tests
`tests/unit/resource-route-fidelity.test.ts`:
- Remove `startup-accountability-system` from `waveOneRoutes` (it is no longer a resource article).
- Add a test mirroring the existing "moved blog posts resolve from the blog collection only" test: `getBlogPostBySlug("startup-accountability-system")` returns the article with title `"Startup Accountability System: A Founder Playbook for Weekly Execution"`, and `getResourceArticleBySlug("startup-accountability-system")` returns `undefined`.
- Add a sitemap assertion: the sitemap includes `${siteUrl}/blog/startup-accountability-system` and does not include `${siteUrl}/startup-accountability-system`.
- If the repo has a pattern for testing `next.config.ts` redirects, add one for the new redirect; if not, cover it in manual verification below.

### 5. Feature doc
Per `AGENTS.md`, update `docs/features/marketing.md` in the same PR:
- Add the URL rule under the public marketing surfaces section (pillars at `/<slug>`, blog articles at `/blog/<slug>`).
- Add a dated changelog line: `2026-09-30 — startup-accountability-system moved from /<slug> to /blog/<slug> (301); URL rule adopted: top level reserved for pillar pages.`
- Run the `affects:` / `affected-by:` link sweep as the doc convention requires.

## Out of scope (do not do)

- Do not move, rename, or edit any of the seven Topical Pillar articles.
- Do not rewrite the article content, titles, or metadata.
- Do not remove the `building-a-resource-library-...` blog post. Brandon is handling that separately.
- Do not rename `resourceArticles` / `blogPosts` or change the article page components.
- Do not add new pages (`/for-groups` etc. come later).

## Verification (paste evidence in the PR, per AGENTS.md)

1. `npm run test:unit`: full output, all passing, including the new tests.
2. Production build succeeds.
3. On a local or preview server:
   - `curl -sI <host>/startup-accountability-system` returns a 308 with `location: /blog/startup-accountability-system`.
   - `/blog/startup-accountability-system` returns 200, and its canonical tag is `https://accountabilityguild.com/blog/startup-accountability-system`.
   - `/sitemap.xml` lists the `/blog/` URL and not the top-level one.
   - `/resources` no longer lists the article; `/blog` does.
   - The homepage Field notes card and footer link, and the `/blog` "Pillar resources" block, point where the table above says.
4. `gitnexus_impact` / `gitnexus_detect_changes` per the repo `CLAUDE.md`, and report the blast radius.

## When done

Reply with the PR link and the evidence above. On the Content Pipeline Asana board, the tracking card is `[Site fix] Move startup-accountability-system to /blog` in Site Backlog. Comment the PR link there; Brandon marks it complete when it merges.
