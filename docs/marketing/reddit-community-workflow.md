# r/accountability_guild: publish-to-Reddit note workflow

**Set up 2026-10-09 (Grant).** Reddit posting stays manual: Grant schedules posts with Reddit's native mod scheduler (Mod Tools → Scheduled posts), **one post per week**. The automations don't post to Reddit. When a Facebook post or a blog article publishes, they draft a Reddit version, add it to the queue, and email it to Grant so he can schedule it.

Triggers:

| Automation | Fires when | Reddit note? |
|---|---|---|
| `ag-social-auto-publish` | A `TYPE: social` card publishes to Facebook | Yes, **except** `ROTATION SLOT: fieldnotes-promo` cards (the blog publish already sent that article's note; skip it so the same article isn't queued twice) |
| `ag-blog-publish-mon/wed/fri` | A `TYPE: blog` card is marked Published | Yes |
| (same) | `topical-pillar` / `product-pillar` publish | No (not requested; revisit later) |

Posts come in faster than one a week, so the queue builds up. Grant picks what to schedule. Drafts don't expire, so leave older ones queued instead of deleting them.

## 1. Adapt the post

Read `docs/brand/voice-and-tone.md` first. Then:

- **Format:** a text post with a title and body. For a social quote card or study card, use an image post: the card's `ASSETS:` PNG URL as the image, plus a short body. Name the format in the note.
- **Title:** a statement, never a question (organic rule; the question-headline exception covers paid ads only). Sentence case, 300 characters max, no clickbait.
- **Body:** plain, declarative, second person. No em dashes, no emoji, no humor, no exclamation points, **no hashtags** (they don't belong on Reddit). Write for someone who has never heard of Accountability Guild. Give the useful idea first; mention the product in at most one or two sentences near the end.
- **End with a discussion prompt** in the body: one specific question readers can answer from their own experience. The sub is new and needs comments more than clicks.
- **Flair:** `Research` (study-based), `Field notes` (blog article), `Discussion` (quote or opinion prompt), or `Product` (product note).
- **Research:** cite only ✓ entries from `docs/research/behavior-science-knowledge-base.md`, with the DOI link on the plain-language phrase, using the exact stats given there.
- **Links:** blog articles live at `https://accountabilityguild.com/blog/<slug>`. Every link to the site gets UTMs:
  `?utm_source=reddit&utm_medium=organic&utm_campaign=r_accountability_guild&utm_content=<slug-or-short-id>`
- **Length:** a blog adaptation is a short summary of the article's main points (a numbered list works well) and is much shorter than the article, plus the link. A social adaptation can be 80 to 200 words.
- **Quotes:** a quote-card post's quote was already retired from `quote-bank.md` when it went to Facebook. Don't retire it again. Mention in the note that it's already retired.

Model posts: `docs/marketing/reddit-community-posts-2026-10-09.md` (P2 to P8).

## 2. Add it to the queue

Append the post to `docs/marketing/reddit-queue.md` under `## Queued`, using this shape:

```
### <YYYY-MM-DD> · <Title>
**Source:** <Facebook permalink, or content/field-notes/<slug>.md> · **Flair:** <flair> · **Format:** <text / image + URL>
**Check before scheduling:** <anything Grant must verify, or "none">

<body>
```

Then commit just that file (`git add docs/marketing/reddit-queue.md`, message `Queue Reddit draft: <short title>`, no Co-Authored-By line). Push only if the calling automation already pushes (the blog publish does; the social auto-publish doesn't).

## 3. Email Grant

Send with the Gmail connector's `send_message` to **tilusg@gmail.com**. Grant gave standing authorization for these self-notes on 2026-10-09. Send them to that address only, never anyone else.

- **Subject:** `Reddit post ready: <title>`
- **Body:** plain text, in this order: the flair, format, and any "check before scheduling" item; then `TITLE:` and the title; then `BODY:` and the body, ready to paste; then the source link (Facebook permalink or Asana card); then the line `Queued in docs/marketing/reddit-queue.md. Schedule it in Mod Tools → Scheduled posts (one a week).`

**"Check before scheduling" items to always include where they apply:**
- **Blog:** "The article isn't on accountabilityguild.com until someone copies it into the site repo. Open the /blog/<slug> link first, and schedule the post only once it loads." The blog publish step archives the article but doesn't deploy it.
- **Image post:** "Download the card PNG from the URL and attach it."

If the Gmail connector isn't available or the send fails, don't retry in a loop. The draft is still in the queue file. Say in the automation's summary that the email failed and why.

## 4. When Grant schedules or posts one

Grant moves the entry from `## Queued` to `## Scheduled / posted` with the date, or asks Claude to do it.
