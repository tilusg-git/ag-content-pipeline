// Writes the publish hand-off for Topical Pillar P7 /types-of-personal-goals (playbook §7.3) from the Figma page data and
// p7-publish-config.js, so the copy Brandon builds from is exactly what is in Figma frame 116:4994 and in the HTML mockup.
// Usage: node notes/figma-pillar-v2/export-handoff-p7.js  →  content/pillars/types-of-personal-goals.md
const fs = require('fs');
const path = require('path');
const cfg = require('./p7-publish-config.js');
const D = cfg.loadData();
const root = path.join(__dirname, '..', '..');
const RAW = 'https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/';
const slug = s => s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const used = new Set();
const link = t => t.replace(/\[\[(.+?)\]\]/g, (_, a) => { const l = cfg.LINKS[a]; if (!l) throw new Error('no link for ' + a); used.add(a); return `[${a}](${l[0]})`; });
const page = t => { const u = cfg.PAGES[t]; if (!u) throw new Error('no page for ' + t); return `[${t}](${u})`; };
const split = s => { const i = s.indexOf('. '); return [s.slice(0, i), s.slice(i + 2)]; };
const media = k => { const m = cfg.MEDIA[k]; return `> **Media · ${m.ui ? 'product UI' : 'photo'}** (${m.d.join('×')} desktop / ${m.m.join('×')} mobile). Files: ${m.files.map(f => `[${f}](${RAW}${f})`).join(', ')}. Public name: \`${m.name}.webp\`. Alt: “${m.alt}”${m.tag ? ` Goal tag (HTML text over the photo, top-right, not baked in): “${m.tag[0].toUpperCase()}” / “${m.tag[1]}”.` : ''} Loading: ${m.load}.`; };

const out = [];
const isItem = x => /^(\s*[-|]|\d+\. )/.test(x);
const P = (...all) => { const l = all.filter(x => x !== ''); l.forEach((x, i) => { out.push(x); if (!(isItem(x) && isItem(l[i + 1] || ''))) out.push(''); }); };
const ids = D.toc.map(slug);
P('# /types-of-personal-goals · Topical Pillar P7 · publish hand-off',
  `*Generated ${new Date().toISOString().slice(0, 10)} by \`notes/figma-pillar-v2/export-handoff-p7.js\` from \`p7-types-of-personal-goals-v2.4.js\` (the data the Figma frame was built from) and \`p7-publish-config.js\`. Don't edit this file by hand; change the data and rerun.*`,
  '**Status:** v2.4, rewritten around Brandon’s 2026-11-06 feedback to match /goal-setting v2.4 (change list: `docs/marketing/types-of-personal-goals-pillar-revision-2026-11-06.md`). v2.4.1 (2026-11-07) adds Grant’s Figma comments of 2026-11-06: a short why paragraph under the lead in 4.1 to 4.5, 4.7 and 4.9; a fitness H2 without “training” and “race”; “Career and work goals”; 4.1 faith as a commitment → year-end accomplishment table; 4.2 family as a rhythm stack. Built in Figma 2026-11-07 (frame 151:472; v2.4 with Grant’s comments is 135:412); photos and the product screen placed. Waiting on Brandon’s review of both guides together.',
  `**Design:** Figma frame \`${cfg.figma.node}\` (desktop 1440, with a 375 mobile column and band notes beside it): ${cfg.figma.url}`,
  '**HTML mockup:** [`docs/marketing/pillars/types-of-personal-goals/index.html`](../../docs/marketing/pillars/types-of-personal-goals/index.html) (desktop and mobile in one responsive page, generated from the same data; the `dist/` copy has every image inlined and opens from an email attachment).',
  '**Route:** `/types-of-personal-goals`, upgraded in place (same URL, no redirect). **SEO requirements:** [`docs/marketing/types-of-personal-goals-pillar-seo-requirements-2026-11-05.md`](../../docs/marketing/types-of-personal-goals-pillar-seo-requirements-2026-11-05.md).',
  '**Build blocker:** like P4 /goal-setting, this page needs the Topical Pillar template (playbook §9 item 9): full-width bands, a sticky contents rail, typed module elements and media fields. Don’t publish it onto the current `ResourceArticle` template, which renders only headings and paragraphs. Build P4 and P7 on the same template; P7 adds no new element types beyond a prose-only module (4.9).',
  '**Supersedes** the v2.1 P7 module doc on Drive (renamed “SUPERSEDED”). Since then (v2.4): five life areas (faith, family, fitness, work, personal) in place of six. Before that: six life areas (faith added), goals sorted three ways (area, shape, time frame), the area-by-shape grid with an intro line, leads that name each reader’s motivation, P4’s week calendar in 4.4, a prose module in 4.9, the accountability band rebuilt as module 4.10 (P4’s image card grid), band 9 as a 3×1 grid, photos and the product screen.',
  '---');

P('## Band 1 · Hero', `**H1:** ${D.h1}`, `*“${D.h1.slice(0, D.h1.indexOf(':'))}” and the colon are set in ember italic.*`, `**Dek:** ${D.dek}`,
  '**Buttons:** “Start a group →” (`/create-account`, via `siteHref()`) and a “See how it works” text link (`/how-it-works`). On mobile, a compact sticky bar (“No monthly fee. Set up in five minutes.” + “Start a group →”) keeps the button in reach once the hero buttons scroll away.',
  `**On this page** (desktop: sticky contents rail; mobile: dropdown under the dek): ${D.toc.map((t, i) => `${t} (\`#${ids[i]}\`)`).join(' · ')}`,
  'No byline, no read time, no visible updated date (`dateModified` stays in the schema).', media('hero'));

P(`## Band 2 · Answer: ${D.answerH2}`, `*Anchor \`#${ids[0]}\`.*`, `**Definition card:** ${link(D.def)}`, '**Key points:**', ...D.kp.map(k => `- ${k}`),
  `**Stat callout:** ${link(D.stat[0])} *(${D.stat[1]})*`, `**Grid intro:** ${link(D.diagIntro)}`,
  '**Diagram · area-by-shape grid** (required original; an HTML table, so every cell is text. Mobile: a swipe row with one card per life area):', '',
  `| Area / shape | ${D.shapes.join(' | ')} |`, `|${['', ...D.shapes].map(() => '---').join('|')}|`, ...D.grid.map(r => `| **${r[0]}** | ${r.slice(1).join(' | ')} |`), '',
  '*Caption: A teaching aid: every goal has an area and a shape. Examples are illustrative.*');

P(`## Band 3 · Topic index: ${D.mapH2}`, `*Anchor \`#${ids[1]}\`. Two-column numbered index; each item links to its module anchor.*`,
  ...D.map.map((m, i) => { const [t, r] = split(m); return `${i + 1}. **${t}** (\`#${ids[i + 2]}\`): ${r}`; }));

const el = (e, m) => {
  const L = [];
  if (e.t === 'table') { const h = e.cols.map(c => c[0]); L.push('*Comparison table (mobile: a swipe row, one card per row):*', '', `| ${h.join(' | ')} |`, `|${h.map(() => '---').join('|')}|`, ...e.rows.map(r => `| ${r.join(' | ')} |`), ''); }
  if (e.t === 'rewrites') L.push('*Example list with rewrites (the vague goal as a small “Instead of” line above the checkable one):*', ...e.items.map(x => { const i = x.indexOf(': '); return `- *${x.slice(0, i)}:* ${x.slice(i + 2)}`; }));
  if (e.t === 'week') L.push('*Figure: P4’s seven-day week calendar, four day cards with the minimum version under each, off days marked “Off”. Built in HTML; this list is its text. Mobile: a list, one row per day.*', ...e.items.map(x => `- ${x}`));
  if (e.t === 'stack') L.push(e.desc || '*Figure: “three clocks”, four stacked bars from long-term direction to when you report; the last bar has an ember border. Built in HTML.*', ...e.items.map(x => `- ${x}`));
  if (e.t === 'checklist') L.push('*Checklist (ember ticks):*', ...e.items.map(x => `- ${link(x)}`));
  if (e.t === 'imageCards') L.push('*Image card grid, 3 across (mobile: swipe row with the next card peeking):*', ...e.items.map((x, i) => { const [t, r] = split(x); return `- **${t}.** ${link(r)}\n  ${media(m.id + 'abc'[i]).replace('> ', '')}`; }));
  if (m.cap) L.push(`*Caption: ${m.cap}*`);
  return L;
};
for (const m of D.mods) {
  P(`## Module ${m.id} · ${m.h2}`, `*Anchor \`#${slug(m.toc)}\`, contents label “${m.toc}”.*`, `**Lead:** ${link(m.lead)}`,
    ...(m.body || []).map(b => link(b)), ...(m.el ? el(m.el, m) : ['*Prose module: lead and two paragraphs, no element (Grant: the signal table was too light for a table).*']));
  if (cfg.MEDIA[m.id] && !cfg.MEDIA[m.id].ui) P(media(m.id) + ` Layout: media split, photo ${m.media.side}; on mobile the photo sits above the element.`);
  if (cfg.MEDIA[m.id] && cfg.MEDIA[m.id].ui) P(media(m.id) + ` Placed below the table, full width, in a \`<figure>\` with the caption “${cfg.UI_CAPTION}” (template rule). Rendered with the product-view renderer (\`docs/brand/assets/product-views/examples/pillar-types-of-goals-shapes*.json\`, \`week-board\` scene). In production build it as HTML with server-rendered sample dates from the shared demo clock, like the homepage v5 screens, or re-render the PNG on a schedule; a static PNG goes out of date.`);
  m.ctx.forEach(c => P(link(c)));
}
P(`## Band 7B · Product CTA band (ink): ${D.cta.h}`, D.cta.sub, ...D.cta.steps.map((s, i) => `${i + 1}. ${s}`),
  '**Buttons:** “Start a group →” (`/create-account`) and “See how it works” (`/how-it-works`).', `**Fine print:** ${D.cta.fine}`,
  '*The steps are plain numbered text, never boxed (they read as buttons). Never mention $0 or “optional” money stakes.*');
P(`## Band 8 · ${D.b8h2}`, `*Anchor \`#${ids[ids.length - 1]}\`. Four path cards (mobile: swipe row).*`, ...D.paths.map(p => `- **${p[0]}:** ${page(p[1])}. ${p[2]}`));
P(`## Band 9 · ${D.b9h2}`, '*Cluster index: a 3×1 grid, one item per column, the same component as P4. Swap in P7 Field notes articles as they publish.*', ...D.cluster.map(c => `- **${c[0]}:** ${c[1].map(page).join(' · ')}`));

const unused = Object.keys(cfg.LINKS).filter(a => !used.has(a));
if (unused.length) throw new Error('link map anchors not on the page: ' + unused.join(', '));
P('---', '## Implementation notes', '### Images',
  'The crops in `docs/brand/assets/site-imagery/out/` are 2× files at the exact slot ratio. Use them, not the Gemini sources: several crops remove faces or real book titles (details in `docs/brand/assets/site-imagery/manifest.md`). Serve WebP through `next/image` with explicit `width`/`height`, art-directed desktop/mobile crops (`<picture>` or two sources) and the public names below. The goal tag on the hero is HTML text over the photo.', '',
  '| Slot | Display (desktop / mobile) | Public name | Alt | Loading |', '|---|---|---|---|---|',
  ...Object.entries(cfg.MEDIA).map(([k, m]) => `| ${k} | ${m.d.join('×')} / ${m.m.join('×')} | \`${m.name}.webp\` | ${m.alt} | ${m.load} |`), '');
P('### Links', `All ${used.size} inline anchors resolve (internal routes return 200; DOIs resolve at doi.org; the CFPB tool returns 200; checked 2026-11-05). Every study is a ✓ entry in the behavior-science KB:`, '',
  '| Anchor | URL | Source |', '|---|---|---|', ...Object.entries(cfg.LINKS).map(([a, l]) => `| ${a} | ${l[0]} | ${l[1] || 'AG page'} |`), '',
  'Wrap only the exact anchor text. External citations open in the same tab, with no `nofollow`.');
P('### Inbound links at publish',
  '- `/goal-setting` (P4, in Brandon’s queue) already links here four times: two context lines (“which kinds of goals to pick” and “the four goal shapes”), the “Still choosing a goal” path card and the Guides list. When both pages ship, point “the four goal shapes” at `/types-of-personal-goals#goal-shapes`.',
  '- `/life-planning`, `/personal-life-audit` and `/self-improvement`: add one contextual link each where the page talks about life areas, with the anchor “types of personal goals”. These pages are all linked from P7, so this closes the loop.');
P('### Sitemap, hub and nav', '`/types-of-personal-goals` is already in the sitemap and on `/resources`. If the template ships as a new collection, keep it in the sitemap with a real `lastModified` and in `/resources`.');
fs.writeFileSync(path.join(root, 'content', 'pillars', 'types-of-personal-goals.md'), out.join('\n'));
console.log('wrote content/pillars/types-of-personal-goals.md', out.length, 'lines; links used', used.size);
