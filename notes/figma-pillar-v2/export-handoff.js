// Writes the publish hand-off for a Topical Pillar (playbook §7.3) from the Figma page data, so the copy Brandon builds from is
// exactly what is in the signed-off Figma frame. Page copy comes from the data file; links come from LINKS (the module doc's link
// map); photo slots come from MEDIA (docs/brand/assets/site-imagery/manifest.md), because the data file's media notes describe the
// pre-photo layout for some slots.
// Usage: node notes/figma-pillar-v2/export-handoff.js [data file] [out file]
//   default: p4-goal-setting-v2.4.js (Brandon's model, Figma frame 121:380) → content/pillars/goal-setting.md (the build hand-off)
//   older version for comparison: node notes/figma-pillar-v2/export-handoff.js p4-goal-setting-v2.3.js <out file>
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const DATA = process.argv[2] || 'p4-goal-setting-v2.4.js';
const OUT = process.argv[3] || path.join('content', 'pillars', 'goal-setting.md');
const V24 = /v2\.4/.test(DATA);
const src = fs.readFileSync(path.join(__dirname, DATA), 'utf8');
let D;
new Function('build', src.replace('return await build(D);', 'build(D);'))(d => { D = d; });

const SITE = 'https://accountabilityguild.com';
const RAW = 'https://raw.githubusercontent.com/tilusg-git/ag-content-pipeline/main/docs/brand/assets/site-imagery/out/';
const LINKS = {
  'the psychologists who developed goal-setting theory': 'https://doi.org/10.1037/mot0000127',
  'which kinds of goals to pick': '/types-of-personal-goals',
  'the four goal shapes': '/types-of-personal-goals',
  'a study of 512 real goals': 'https://doi.org/10.1093/intqhc/mzae009',
  'a large review of physical activity programs': 'https://doi.org/10.1080/17437199.2015.1104258',
  'a large review of 138 experiments': 'https://doi.org/10.1037/bul0000025',
  'a review of weight-loss research': 'https://doi.org/10.1016/j.jada.2010.10.008',
  'a large review of 141 studies': 'https://doi.org/10.1037/ccp0000260',
  'a large review of goal setting in groups': 'https://doi.org/10.1037/a0024315',
  'how to find someone to check in with': '/blog/how-to-find-an-accountability-partner-or-group',
  'a review of 21 studies': 'https://doi.org/10.3389/fpsyg.2021.565202',
};
const PAGES = {
  'Types of personal goals': '/types-of-personal-goals',
  'A 30-day sprint': '/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint',
  'From good intentions to shipped work: a 30-day accountability sprint': '/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint',
  'Weekly or 4-week goal reporting template for founders and operators': '/blog/weekly-or-4-week-goal-reporting-template-for-founders-and-operators',
  'Personal accountability': '/personal-accountability',
  'How it works': '/how-it-works',
};
// Photo slots: [slot, files (2x JPEG crops), display size desktop / mobile, public file name, alt, goal tag overlay, loading]
const MEDIA = {
  hero: { files: ['p4-hero-desktop.jpg', 'p4-hero-mobile.jpg'], size: '460×400 / 335×230', name: 'goal-setting-hero-runner', alt: D.heroAlt, tag: V24 ? 'Top-right: “GOAL · THIS YEAR” / “Run four times a week.”' : 'Top-right: “GOAL · 12 WEEKS” / “Run four times a week.”', load: 'Eager, `priority` (LCP image)' },
  '4.1': { files: ['p4-p41-desktop.jpg', 'p4-p41-mobile.jpg'], size: '360×340 / 335×210', name: 'goal-setting-one-goal-sticky-note', alt: 'A sticky note on an open notebook that reads "One goal (12 weeks): Finish my certification."', tag: null, load: 'Lazy' },
  '4.3': { files: ['p4-p43-desktop.jpg', 'p4-p43-mobile.jpg'], size: '360×300 / 335×240', name: 'goal-setting-checkable-goal-friends', alt: 'Two friends at a kitchen table; one points to a goal written in a notebook.', tag: 'Bottom-left: “GOAL” / “Walk 30 minutes three times a week.”', load: 'Lazy' },
  '4.6': { files: ['p4-p46-desktop.jpg', 'p4-p46-mobile.jpg'], size: '360×300 / 335×210', name: 'goal-setting-fridge-habit-tracker', alt: 'A hand ticking today’s box on a paper weekly habit tracker taped to a fridge door.', tag: null, load: 'Lazy' },
  '4.8a': { files: ['p4-p48a-desktop.jpg', 'p4-p48a-mobile.jpg'], size: '286×180 / 260×150', name: 'goal-setting-share-one-person', alt: 'A person on a park bench after a walk, typing a message on a phone.', tag: null, load: 'Lazy' },
  '4.8b': { files: ['p4-p48b-desktop.jpg', 'p4-p48b-mobile.jpg'], size: '286×180 / 260×150', name: 'goal-setting-share-small-group', alt: 'Four people around a kitchen table with notebooks open and phones face down.', tag: null, load: 'Lazy' },
  '4.8c': { files: ['p4-p48c-desktop.jpg', 'p4-p48c-mobile.jpg'], size: '286×180 / 260×150', name: 'goal-setting-share-group-tracker', alt: 'A group meeting in a living room; one member holds a clipboard with a shared tracker of colored ticks.', tag: null, load: 'Lazy' },
};
if (V24) {
  // 4.1: new photo (Gemini P4-8, 2026-11-05) replaces the "One goal (12 weeks)" sticky note. Crops are p4-p41-v24-*.jpg (face out of frame).
  // 4.8 photos reordered to match the new cards: kitchen table (present), park bench (report), living room (read the reports).
  MEDIA['4.1'] = { files: ['p4-p41-v24-desktop.jpg', 'p4-p41-v24-mobile.jpg'], size: '360×340 / 335×210', name: 'goal-setting-yearly-planning-notebook', alt: 'A person writing in a notebook at a kitchen table by a window on a winter morning, a second notebook open beside a glass of juice.', tag: null, load: 'Lazy' };
  const [a, b, c] = [MEDIA['4.8a'], MEDIA['4.8b'], MEDIA['4.8c']];
  Object.assign(MEDIA, { '4.8a': b, '4.8b': a, '4.8c': c });
}
const slug =s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const used = new Set();
const link = t => t.replace(/\[\[(.+?)\]\]/g, (_, a) => { const u = LINKS[a]; if (!u) throw new Error('no link for ' + a); used.add(a); return `[${a}](${u})`; });
const page = t => { const u = PAGES[t]; if (!u) throw new Error('no page for ' + t); return `[${t}](${u})`; };
const media = k => { const m = MEDIA[k]; return `> **Media · photo** (${m.size}). Files: ${m.files.map(f => f.startsWith('(') ? f : `[${f}](${RAW}${f})`).join(', ')}. Public name: \`${m.name}.webp\`. Alt: “${m.alt}”${m.tag ? ` Goal tag (HTML text over the photo, not baked in): ${m.tag}` : ''} Loading: ${m.load}.`; };

const out = [];
const isItem = x => /^(s*[-|]|d+. )/.test(x);
const P = (...all) => { const l = all.filter(x => x !== ''); l.forEach((x, i) => { out.push(x); if (!(isItem(x) && isItem(l[i + 1] || ''))) out.push(''); }); };
P('# /goal-setting · Topical Pillar P4 · publish hand-off',
  `*Generated ${new Date().toISOString().slice(0, 10)} by \`notes/figma-pillar-v2/export-handoff.js\` from \`${DATA}\`, the data the Figma frame was built from. Don't edit this file by hand; change the data and rerun.*`,
  V24 ? '**Status:** v2.4, rewritten around Brandon’s 2026-11-05 feedback (change list: `docs/marketing/goal-setting-pillar-revision-2026-11-05.md`). Copy approved by Grant and built in Figma 2026-11-05. All photos placed. Waiting on Brandon’s review.' : '**Status:** layout signed off by Grant 2026-11-03 (v2.3); photos placed 2026-11-04. Waiting on Brandon’s review.',
  V24 ? '**Design:** Figma frame `121:380` (desktop 1440, with a 375 mobile column and band notes beside it): https://www.figma.com/design/l27WIk0vje0syTYWN2iZee?node-id=121-380' : '**Design:** Figma frame `48:292` (desktop 1440, with a 375 mobile column and band notes beside it): https://www.figma.com/design/l27WIk0vje0syTYWN2iZee?node-id=48-292',
  '**Route:** `/goal-setting`, upgraded in place (same URL, no redirect). **SEO requirements:** [`docs/marketing/goal-setting-pillar-seo-requirements-2026-11-04.md`](../../docs/marketing/goal-setting-pillar-seo-requirements-2026-11-04.md).',
  '**Build blocker:** this page needs the Topical Pillar template (playbook §9 item 9): full-width bands, a sticky contents rail, typed module elements and media fields. Don’t publish it onto the current `ResourceArticle` template, which renders only headings and paragraphs.',
  '**Supersedes** the v2.1 module doc on Drive (“DRAFT v2.1 · Goal Setting module doc”). Since v2.1: plain-language H2s; a hero CTA; no visible updated date; the 4.6 go-deeper card removed (one per page); the band 7 founder paragraph removed; the soft CTA card replaced by the product CTA band; band 9 lists one neighbor guide; photos replace the illustrations; 4.6 checklist item 1 and the 4.7 product-context paragraph added.',
  '---');

P('## Band 1 · Hero', `**H1:** Goal setting: how to set goals you will actually keep`,
  '*“Goal setting” (before the colon) is set in ember italic.*', `**Dek:** ${D.dek}`,
  '**Buttons:** “Start a group →” (`/create-account`, via `siteHref()`) and a “See how it works” text link (`/how-it-works`). On mobile, a compact sticky bar keeps “Start a group” in reach once the hero button scrolls away.',
  `**On this page** (desktop: sticky contents rail; mobile: dropdown under the dek): ${D.toc.map(t => `${t} (\`#${slug(t)}\`)`).join(' · ')}`,
  'No byline, no read time, no visible updated date (`dateModified` stays in the schema).', media('hero'));

P(`## Band 2 · Answer: ${D.answerH2}`, `**Definition card:** ${D.def}`, '**Key points:**', ...D.kp.map(k => `- ${k}`),
  `**Stat callout:** ${link(D.stat[0])} *(${D.stat[1]})*`,
  `> **Media · diagram** (required original, HTML/SVG so the labels are text): the goal loop, ${D.loop.map((s, i) => `0${i + 1} ${s}`).join(' → ')}, then ${V24 ? '“↺ Then back to step 2, every cycle”. Caption: “Goals hold when they sit inside a reporting cycle.” Alt: “Diagram of a four-step cycle: commit, track as needed, report each cycle, adjust.”' : '“↺ Then back to step 1, every week”. Caption: “Goals hold when they sit inside a weekly loop.” Alt: “Diagram of a four-step loop: write the goal, track progress, review weekly, adjust.”'}`);

P(`## Band 3 · Topic index: ${D.mapH2}`, '*Card grid; each card jumps to its module anchor.*',
  ...D.map.map((m, i) => { const [t, ...r] = m.split('. '); return `- **${t}** (\`#${slug(D.toc[i + 2])}\`): ${r.join('. ')}`; }));

const el = (e, m) => {
  const L = [];
  if (e.t === 'checklist') L.push('*Checklist:*', ...e.items.map(x => `- ✓ ${x}`));
  if (e.t === 'table' || e.t === 'ba') { const h = e.cols ? e.cols.map(c => c[0]) : e.h; L.push(`*${e.t === 'ba' ? 'Before-and-after table' : 'Comparison table'}:*`, '', `| ${h.join(' | ')} |`, `|${h.map(() => '---').join('|')}|`, ...e.rows.map(r => `| ${r.join(' | ')} |`), ''); }
  if (e.t === 'rewrites') L.push('*Example list with rewrites (the vague goal as a small “Instead of” line above the checkable one):*', ...e.items.map(x => { const [a, b] = x.split(': '); return `- *${a}:* ${b}`; }));
  if (e.t === 'week') L.push('*Figure: a seven-day strip with four day cards, the minimum version under each, off days blank. Built in HTML; this list is its text. Alt (if rendered as an image): “A week with four planned study days, each with a smaller fallback action.”*', ...e.items.map(x => `- ${x}`));
  if (e.t === 'stack') L.push('*Figure: stacked bars that narrow as the rhythm gets more frequent; the last (daily) bar is ember. Built in HTML; this list is its text. Alt (if rendered as an image): “Four goal rhythms, from by-a-date to daily, each with how much tracking it needs.”*', ...e.items.map(x => { const [k, ...t] = x.split(': '); return `- **${k}:** ${t.join(': ')}`; }));
  if (e.t === 'steps') L.push('*Steps (question as the step line, what it does as the detail):*', ...e.items.map((x, i) => { const q = x.indexOf('? '); return `${i + 1}. **${x.slice(0, q + 1)}** ${x.slice(q + 2)}`; }));
  if (e.t === 'imageCards') L.push('*Image card grid (mobile: swipe row with the next card peeking):*', ...e.items.map((x, i) => { const [t, ...r] = x.split('. '); return `- **${t}.** ${r.join('. ')}\n  ${media('4.8' + 'abc'[i]).replace('> ', '')}`; }));
  if (e.t === 'ifthenList') L.push('*Example list (“If” and “then” in ember italic):*', ...e.items.map(x => `- ${x}`));
  if (m.cap) L.push(`*Caption: ${m.cap}*`);
  return L;
};
for (const m of D.mods) {
  P(`## Module ${m.id} · ${m.h2}`, `*Anchor \`#${slug(m.toc)}\`, TOC label “${m.toc}”.*`, `**Lead:** ${m.lead}`, ...el(m.el, m));
  m.ctx.forEach(c => P(link(c)));
  if (MEDIA[m.id]) P(media(m.id) + ` Layout: media split, photo ${m.media.side}.`);
  if (m.id === '4.7') P(`> **Media · product UI** (${m.media.side}, about ${V24 ? '360×380 desktop / 335×354 mobile' : '360×228 desktop / 335×272 mobile'}): the \`${V24 ? 'report-close' : 'week-board'}\` scene from \`docs/brand/assets/product-views/\`. Caption: “Illustrative: sample data in the Accountability Guild app.” Alt: “${m.media.alt}” Build it as HTML with server-rendered sample dates from the shared demo clock (like the homepage v5 screens), or as a PNG from \`render.js\` re-rendered on a schedule; a static PNG goes out of date.`);
  if (m.deeper) P(`**Go-deeper card** (“Go deeper · Field notes article”, “Read the article →”): ${page(m.deeper[0])}. ${m.deeper[1]}`);
}
P(`## Band 7 · In practice: ${D.b7.h2}`, ...D.b7.p, `*Illustrative panel, labeled “Illustrative”:* ${D.b7.illus.replace(/\s{2,}/g, ' ')}`);
P(`## Band 7B · Product CTA band (ink): ${D.cta.h}`, D.cta.sub, ...D.cta.steps.map((s, i) => `${i + 1}. ${s}`),
  '**Buttons:** “Start a group →” (`/create-account`) and “See how it works” (`/how-it-works`).', `**Fine print:** ${D.cta.fine}`,
  '*The steps are plain numbered text, never boxed (they read as buttons). Never mention $0 or “optional” money stakes.*');
P(`## Band 8 · ${D.b8h2}`, '*Four path cards (mobile: swipe row).*', ...D.paths.map(p => `- **${p[0]}:** ${page(p[1])}. ${p[2]}`));
P(`## Band 9 · ${D.b9h2}`, '*Cluster index, grouped by subtopic. Add each new cluster article as it publishes.*', ...D.cluster.map(c => `- **${c[0]}:** ${c[1].map(page).join(' · ')}`));

const unused = Object.keys(LINKS).filter(a => !used.has(a));
if (unused.length) throw new Error('link map anchors not on the page: ' + unused.join(', '));
P('---', '## Implementation notes', '### Images',
  'The crops in `docs/brand/assets/site-imagery/out/` are 2× JPEGs at the exact slot ratio. Use them, not the Gemini sources: the park-bench crop (4.8a) keeps the man’s face out of frame. Serve WebP through `next/image` with explicit `width`/`height`, art-directed desktop/mobile crops (`<picture>` or two sources), and the public names below. Goal tags are HTML text over the photo. Sourcing and approvals: `docs/brand/assets/site-imagery/manifest.md`.', '',
  '| Slot | Display (desktop / mobile) | Public name | Alt | Loading |', '|---|---|---|---|---|',
  ...Object.entries(MEDIA).map(([k, m]) => `| ${k} | ${m.size} | \`${m.name}.webp\` | ${m.alt} | ${m.load} |`), '');
P('### Links', `All ${used.size} inline anchors resolve (internal routes return 200; DOIs resolve via doi.org, checked 2026-11-04). Wrap only the exact anchor text. External citations open in the same tab, with no \`nofollow\`.`);
P('### Inbound retrofit at publish (brief §10)',
  '- 30-day sprint article, Week 1 section: anchor “how to set a goal you can actually check” → `/goal-setting`.',
  '- Weekly reporting template article, first section: anchor “goal setting” → `/goal-setting`.',
  '- `/types-of-personal-goals`: a path card to `/goal-setting`.',
  '- `/personal-accountability`, promises/commitments section: anchor “setting goals you can keep” → `/goal-setting`.');
P('### Sitemap, hub and nav', '`/goal-setting` is already in the sitemap and on `/resources`, and homepage v5 links to it. If the template ships as a new collection, keep it in the sitemap with a real `lastModified` and in `/resources`.');
fs.writeFileSync(path.join(root, OUT), out.join('\n'));
console.log('wrote ' + OUT,out.length, 'lines; links used', used.size);
