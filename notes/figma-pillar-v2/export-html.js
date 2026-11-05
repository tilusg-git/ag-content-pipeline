// Writes the HTML mockup of a Topical Pillar (desktop 1440 + mobile 375, one responsive page) from the same page data the Figma
// frame was built from, so the copy can't drift from the design. Layout and type follow build-v2.3.js; nav, footer and the
// mobile sticky bar follow docs/marketing/homepage-v5/index.html. Media are the 2x crops in docs/brand/assets/site-imagery/out/.
// Usage: node notes/figma-pillar-v2/export-html.js  →  docs/marketing/pillars/types-of-personal-goals/index.html
//        and dist/accountability-guild-types-of-personal-goals.html (images inlined, opens from an email attachment).
const fs = require('fs');
const path = require('path');
const cfg = require('./p7-publish-config.js');
const D = cfg.loadData();
const root = path.join(__dirname, '..', '..');
const outDir = path.join(root, 'docs', 'marketing', 'pillars', cfg.slug);
const IMG = '../../../brand/assets/site-imagery/out/';
const SITE = 'https://accountabilityguild.com';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = s => s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const href = u => (u.startsWith('/') ? SITE + u : u);
const used = new Set();
const T = s => esc(s).replace(/\[\[(.+?)\]\]/g, (_, a) => {
  const k = a.replace(/&amp;/g, '&'); const l = cfg.LINKS[k]; if (!l) throw new Error('no link for ' + k); used.add(k);
  return `<a class="tl" href="${href(l[0])}">${a}</a>`;
});
const page = t => { const u = cfg.PAGES[t]; if (!u) throw new Error('no page for ' + t); return href(u); };
const split = s => { const i = s.indexOf('. '); return [s.slice(0, i), s.slice(i + 2)]; };
const ids = D.toc.map(slug);

function pic(key, cls = '', eager = false) {
  const m = cfg.MEDIA[key];
  const tag = m.tag ? `<span class="gtag"><b>${esc(m.tag[0])}</b><i>${esc(m.tag[1])}</i></span>` : '';
  return `<div class="ph ${cls}"><picture><source media="(max-width:760px)" srcset="${IMG}${m.files[1]}"><img src="${IMG}${m.files[0]}" width="${m.d[0]}" height="${m.d[1]}" alt="${esc(m.alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}></picture>${tag}</div>`;
}

const EL = {
  rewrites: e => `<ul class="rw">${e.items.map(s => { const m = s.match(/^Instead of (“.+?”): (.+)$/); return `<li><span class="ar">→</span><div><small>Instead of ${esc(m[1])}</small><p>${T(m[2])}</p></div></li>`; }).join('')}</ul>`,
  table: e => `<div class="tbl-wrap"><table class="tbl"><thead><tr>${e.cols.map(c => `<th style="width:${Math.round(100 * c[1] / e.cols.reduce((t, x) => t + x[1], 0))}%">${esc(c[0])}</th>`).join('')}</tr></thead><tbody>${e.rows.map(r => `<tr>${r.map((v, i) => `<td${i === 0 ? ' class="k"' : i > 1 ? ' class="s"' : ''} data-h="${esc(e.cols[i][0])}">${T(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`,
  stack: e => `<div class="stack">${e.items.map((it, i) => { const [l, t] = it.split(': '); return `<div class="bar b${i}"><span class="mono">${esc(l)}</span><p>${T(t)}</p></div>`; }).join('')}</div>`,
  week: e => { const map = {}; e.items.forEach(s => { map[s.split(':')[0]] = s; });
    return `<div class="week">${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => { const on = map[d]; if (!on) return `<div class="day off"><span class="mono">${d.slice(0, 3)}</span><p>Off</p></div>`; const m = on.match(/^\w+: (.+?)\. Minimum: (.+)$/); return `<div class="day on"><span class="mono">${d.slice(0, 3)}</span><p>${esc(m[1])}</p><div class="min"><span class="mono">Minimum</span><small>${esc(m[2].charAt(0).toUpperCase() + m[2].slice(1))}</small></div></div>`; }).join('')}</div>`; },
  imageCards: (e, m) => `<div class="cards3 swipe">${e.items.map((s, i) => { const [t, l] = split(s); return `<div class="icard">${pic(m.id + 'abc'[i], 'ph-card')}<div><h3>${esc(t)}</h3><p>${T(l)}</p></div></div>`; }).join('')}</div>`,
};

function module(m) {
  const id = slug(m.toc);
  let el = '';
  if (m.el) {
    const inner = EL[m.el.t](m.el, m) + (m.cap ? `<p class="cap">${esc(m.cap)}</p>` : '');
    if (m.media && !m.media.below) el = `<div class="split ${m.media.side === 'left' ? 'left' : ''}"><div class="sp-el">${inner}</div>${pic(m.id, 'ph-side')}</div>`;
    else if (m.media && m.media.below) { const u = cfg.MEDIA[m.id]; el = `${inner}<figure class="ui"><picture><source media="(max-width:760px)" srcset="${IMG}${u.files[1]}"><img src="${IMG}${u.files[0]}" width="${u.d[0]}" height="${u.d[1]}" alt="${esc(u.alt)}" loading="lazy"></picture><figcaption>${esc(cfg.UI_CAPTION)}</figcaption></figure>`; }
    else el = inner;
  }
  return `<section class="mod" id="${id}" aria-labelledby="${id}-h">
  <h2 class="h2" id="${id}-h">${esc(m.h2)}</h2>
  <p class="lead">${T(m.lead)}</p>
  ${(m.body || []).map(p => `<p class="bodyp">${T(p)}</p>`).join('\n  ')}
  ${el}
  ${m.ctx.map(c => `<p class="ctx">${T(c)}</p>`).join('\n  ')}
</section>`;
}

const [topic, rest] = [D.h1.slice(0, D.h1.indexOf(':') + 1), D.h1.slice(D.h1.indexOf(':') + 1).trim()];
const gridHtml = `<div class="grid-fig"><table class="grid"><thead><tr><th>Area / shape</th>${D.shapes.map(s => `<th>${esc(s)}</th>`).join('')}</tr></thead><tbody>${D.grid.map(r => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map((v, i) => `<td data-h="${esc(D.shapes[i])}">${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const half = Math.ceil(D.map.length / 2);
const idxItem = (s, i) => { const [t, l] = split(s); return `<li><a href="#${ids[i + 2]}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span><b>${esc(t)}</b><small>${esc(l)}</small></span></a></li>`; };

const jsonld = {
  '@context': 'https://schema.org', '@type': 'Article', headline: D.h1, description: cfg.SEO.description,
  image: `${SITE}/images/${cfg.MEDIA.hero.name}.webp`, datePublished: cfg.SEO.datePublished, dateModified: 'SET-AT-PUBLISH',
  author: { '@type': 'Organization', name: 'Accountability Guild', url: SITE }, publisher: { '@type': 'Organization', name: 'Accountability Guild', url: SITE },
  mainEntityOfPage: cfg.SEO.canonical,
};

const css = `
:root{--bone:#FAFAF7;--panel:#FFFFFF;--ink:#0F0F0E;--ink-soft:#5C5C58;--line:#E5E2DA;--ember:#D8512A;
--serif:"Newsreader",Georgia,serif;--sans:"Inter",system-ui,sans-serif;--mono:"JetBrains Mono",ui-monospace,monospace;--wrap:1200px;--gutter:120px}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bone);color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}img{display:block;max-width:100%;height:auto}
.wrap{max-width:calc(var(--wrap) + 2*var(--gutter));margin:0 auto;padding:0 var(--gutter)}
.mono{font-family:var(--mono);font-weight:500;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-soft)}
.lockup{display:inline-flex;align-items:baseline;gap:8px;white-space:nowrap}.lockup i{font-family:var(--serif);font-style:italic;font-size:22px}.lockup b{font-family:var(--sans);font-weight:600;font-size:12.8px;letter-spacing:.34em}
.lockup.sm i{font-size:15px}.lockup.sm b{font-size:8.7px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:var(--sans);font-weight:600;font-size:13px;letter-spacing:.14em;text-transform:uppercase;padding:15px 24px;border:1.5px solid var(--ink);white-space:nowrap;background:var(--ink);color:var(--bone)}
.btn-sm{padding:10px 18px}.btn-line{background:transparent;color:var(--ink)}
.tl{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px}
.tl:hover{color:var(--ember)}
.nav{border-bottom:1px solid var(--line)}.nav .wrap{display:flex;align-items:center;height:83px;gap:40px}
.nav-links{display:flex;gap:40px;font-weight:500;font-size:14px;color:var(--ink-soft);flex:1}.nav-login{font-weight:500;font-size:14px}
h1,h2,h3{font-weight:400}
.hero .wrap{display:flex;align-items:center;gap:80px;padding-top:88px;padding-bottom:72px}
.hero-text{flex:0 1 660px;display:flex;flex-direction:column;gap:24px;border-top:2px solid var(--ink);padding-top:24px}
.h1{font-family:var(--serif);font-size:60px;line-height:1.04;letter-spacing:-.02em}.h1 em{font-style:italic;color:var(--ember)}
.dek{font-family:var(--serif);font-size:21px;line-height:1.45;color:var(--ink-soft)}
.hero-cta{display:flex;align-items:center;gap:28px;padding-top:8px}.hero-cta .tl{font-weight:500;font-size:15px}
.ph{position:relative;overflow:hidden;background:var(--line)}.ph img{width:100%;height:100%;object-fit:cover}
.ph-hero{flex:0 0 460px;height:400px}
.gtag{position:absolute;top:16px;right:16px;display:flex;flex-direction:column;gap:4px;padding:10px 14px;background:var(--bone);border-top:2px solid var(--ember);max-width:calc(100% - 32px)}
.gtag b{font-family:var(--mono);font-weight:500;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-soft)}.gtag i{font-family:var(--serif);font-size:18px;color:var(--ink)}
.toc-m{display:none}
.body{display:flex;gap:80px;padding-top:40px;padding-bottom:120px;align-items:flex-start}
.rail{flex:0 0 220px;position:sticky;top:24px}.rail ol{list-style:none;border-left:1px solid var(--line);margin-top:10px}
.rail a{display:block;padding:7px 0 7px 14px;font-size:14px;color:var(--ink-soft);border-left:2px solid transparent;margin-left:-1px}
.rail a.on{color:var(--ink);font-weight:500;border-left-color:var(--ember)}
main{flex:0 1 900px;min-width:0;display:flex;flex-direction:column;gap:72px}
.h2{font-family:var(--serif);font-size:38px;line-height:1.1;letter-spacing:-.02em}
.band{display:flex;flex-direction:column;gap:28px}
.def{background:var(--panel);border:1px solid var(--line);padding:32px 36px;display:flex;flex-direction:column;gap:12px}
.def p{font-family:var(--serif);font-size:23px;line-height:1.45}
.kr{display:flex;gap:24px}.kp{flex:1;background:var(--panel);border:1px solid var(--line);padding:28px;display:flex;flex-direction:column;gap:12px}
.kp ul{list-style:none;display:flex;flex-direction:column;gap:12px}.kp li{display:flex;gap:12px;font-size:15px;line-height:1.5}.kp li::before{content:"–";font-family:var(--mono);color:var(--ember)}
.stat{flex:0 0 300px;border-left:3px solid var(--ember);padding:4px 0 4px 20px;display:flex;flex-direction:column;gap:14px}
.stat p{font-family:var(--serif);font-style:italic;font-size:20px;line-height:1.4}
.intro{font-family:var(--serif);font-size:19px;line-height:1.45;max-width:760px}
.grid-fig{background:var(--panel);border:1px solid var(--line);padding:32px}
.grid{width:100%;border-collapse:collapse}.grid th,.grid td{text-align:left;vertical-align:top;padding:12px 12px 12px 0;border-bottom:1px solid var(--line)}
.grid thead th{font-family:var(--mono);font-weight:500;font-size:10px;letter-spacing:.16em;text-transform:uppercase;padding-bottom:10px;border-bottom:1px solid var(--ink)}
.grid thead th:first-child{color:var(--ink-soft);width:136px}.grid tbody th{font-family:var(--serif);font-size:16px;line-height:1.3;font-weight:400}
.grid td{font-size:13px;line-height:1.45;color:var(--ink-soft)}
.cap{font-family:var(--serif);font-style:italic;font-size:14px;color:var(--ink-soft)}
.idx{display:grid;grid-template-columns:1fr 1fr;gap:40px}.idx ol{list-style:none;border-left:1px solid var(--ink)}
.idx a{display:flex;gap:14px;padding:12px 0 12px 16px;border-bottom:1px solid var(--line)}.idx a:hover b{color:var(--ember)}
.idx .n{font-family:var(--mono);font-size:11px;color:var(--ember);letter-spacing:.12em;line-height:2}
.idx b{display:block;font-family:var(--serif);font-weight:400;font-size:19px;line-height:1.3}.idx small{display:block;font-size:13px;line-height:1.45;color:var(--ink-soft)}
.mod{display:flex;flex-direction:column;gap:22px;padding-top:48px;border-top:1px solid var(--line);scroll-margin-top:24px}
.band,.paths-band{scroll-margin-top:24px}
.lead{font-family:var(--serif);font-size:22px;line-height:1.4;max-width:780px}
.bodyp{font-family:var(--serif);font-size:19px;line-height:1.5;max-width:760px}
.ctx{font-size:15px;line-height:1.6;color:var(--ink-soft);max-width:720px}
.split{display:flex;gap:40px;align-items:flex-start}.split.left{flex-direction:row-reverse}.sp-el{flex:0 1 500px;display:flex;flex-direction:column;gap:12px}
.ph-side{flex:0 0 360px}.ph-side img{aspect-ratio:auto}
.rw{list-style:none;border-top:1px solid var(--ink)}.rw li{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid var(--line)}
.rw .ar{font-family:var(--serif);font-size:20px;color:var(--ember);line-height:1.3}.rw small{display:block;font-size:13px;color:var(--ink-soft);margin-bottom:4px}
.rw p{font-family:var(--serif);font-size:19px;line-height:1.35}
.tbl{width:100%;border-collapse:collapse}.tbl th{font-family:var(--mono);font-weight:500;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-soft);text-align:left;padding:0 16px 10px 0;border-bottom:1px solid var(--ink)}
.tbl td{padding:14px 16px 14px 0;border-bottom:1px solid var(--line);font-size:15px;line-height:1.5;vertical-align:top}.tbl td.k{font-family:var(--serif);font-size:18px;line-height:1.35}.tbl td.s{color:var(--ink-soft)}
.ui{display:flex;flex-direction:column;gap:12px}.ui img{border:1px solid var(--line)}.ui figcaption{font-family:var(--serif);font-style:italic;font-size:13px;color:var(--ink-soft)}
.stack{display:flex;flex-direction:column;gap:10px}.bar{display:flex;align-items:center;gap:16px;padding:16px 20px;background:var(--panel);border:1px solid var(--line)}
.bar .mono{flex:0 0 110px}.bar p{font-family:var(--serif);font-size:18px;line-height:1.3}
.b0{width:100%}.b1{width:84%}.b2{width:69%}.b3{width:53%;border:2px solid var(--ember)}.b3 .mono{color:var(--ember)}
.week{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;background:var(--panel);border:1px solid var(--line);padding:24px;align-items:start}
.day{display:flex;flex-direction:column;gap:8px;padding:12px;border:1px solid var(--line)}.day.on{background:var(--bone);border-color:var(--ink)}.day.on>.mono{color:var(--ember)}
.day p{font-family:var(--serif);font-size:14px;line-height:1.3}.day.off p{font-family:var(--sans);font-size:12px;color:var(--ink-soft)}
.min{border-top:1px solid var(--line);padding-top:8px;display:flex;flex-direction:column;gap:2px}.min .mono{font-size:9px;letter-spacing:.14em}.min small{font-size:12px;line-height:1.4;color:var(--ink-soft)}
.cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.icard{background:var(--panel);border:1px solid var(--line)}
.ph-card{aspect-ratio:286/180}.icard>div:last-child{padding:22px;display:flex;flex-direction:column;gap:8px}
.icard h3{font-family:var(--serif);font-size:21px;line-height:1.2}.icard p{font-size:14px;line-height:1.5;color:var(--ink-soft)}
.cta{background:var(--ink);color:var(--bone);padding:48px;display:flex;flex-direction:column;gap:28px}
.cta .mono{color:var(--ember);letter-spacing:.18em}.cta h2{font-family:var(--serif);font-size:38px;line-height:1.12;letter-spacing:-.01em}
.cta .sub{font-size:17px;line-height:1.55;color:var(--line);max-width:640px}
.steps{display:flex;align-items:center;gap:20px;border-top:1px solid var(--ink-soft);padding-top:16px;list-style:none;flex-wrap:wrap}
.steps li{display:flex;align-items:center;gap:10px;font-family:var(--serif);font-size:17px}.steps .mono{color:var(--ember);font-size:11px;letter-spacing:.12em}
.steps .arw{font-family:var(--serif);color:var(--ember);font-size:18px}
.cta .btns{display:flex;gap:12px}.cta .btn{background:var(--bone);color:var(--ink);border-color:var(--bone)}.cta .btn-line{background:transparent;color:var(--bone)}
.cta .fine{color:var(--line);letter-spacing:.14em}
.paths{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.path{background:var(--panel);border:1px solid var(--line);padding:20px;display:flex;flex-direction:column;gap:8px}
.path b{font-family:var(--serif);font-weight:400;font-size:21px;line-height:1.2}.path small{font-size:13px;color:var(--ink-soft);flex:1}.path .arw{font-family:var(--serif);font-size:20px;color:var(--ember)}
.path:hover b{color:var(--ember)}
.cluster{border-top:1px solid var(--line);padding-top:40px}.cols3{display:grid;grid-template-columns:repeat(3,1fr);gap:40px}
.cols3 .mono{display:block;padding-bottom:8px;border-bottom:1px solid var(--line);margin-bottom:12px}.cols3 a{font-family:var(--serif);font-size:17px;line-height:1.35;text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
.foot{border-top:1px solid var(--line);padding:36px 0}.foot .wrap{display:flex;align-items:center;gap:36px}.foot nav{display:flex;gap:28px;flex:1;font-size:13px;color:var(--ink-soft)}
.sticky{display:none}
.swipe-dots{display:none}
@media (max-width:1200px){:root{--gutter:48px}.hero .wrap{gap:48px}.body{gap:48px}.rail{flex-basis:180px}}
@media (max-width:1000px){.rail{display:none}.kr{flex-direction:column}.stat{flex-basis:auto}.split,.split.left{flex-direction:column}.sp-el,.ph-side{flex-basis:auto;width:100%}.ph-side{order:-1}}
@media (max-width:760px){
:root{--gutter:20px}
.nav .wrap{height:64px;gap:12px}.nav-links,.nav-login{display:none}.nav .lockup{flex:1}.nav .lockup i{font-size:19px}.nav .lockup b{font-size:11px}.nav .btn{padding:9px 12px;font-size:11px}
.hero .wrap{flex-direction:column;align-items:stretch;gap:20px;padding-top:28px;padding-bottom:16px}.hero-text{gap:16px;flex:none}
.tbl-wrap,.paths{overflow-x:auto;scroll-snap-type:x mandatory;margin-right:calc(-1*var(--gutter));padding-right:var(--gutter);scrollbar-width:none}.tbl-wrap::-webkit-scrollbar,.paths::-webkit-scrollbar{display:none}
.h1{font-size:40px}.dek{font-size:18px}.hero-cta{flex-direction:column;align-items:stretch;gap:14px}.hero-cta .btn{width:100%}.hero-cta .tl{text-align:center}
.ph-hero{flex:none;height:auto;aspect-ratio:335/230}.gtag{top:12px;right:12px;padding:8px 12px}.gtag i{font-size:15px}
.toc-m{display:block;border:1px solid var(--line);background:var(--panel)}.toc-m summary{list-style:none;cursor:pointer;padding:14px 16px;display:flex;justify-content:space-between}
.toc-m summary::after{content:"+";font-family:var(--mono);color:var(--ember)}.toc-m[open] summary::after{content:"–"}
.toc-m ol{list-style:none;padding:0 16px 10px}.toc-m a{display:block;padding:8px 0;border-top:1px solid var(--line);font-size:15px}
.body{padding-top:24px;padding-bottom:64px}main{gap:48px}
.h2{font-size:30px}.def{padding:22px}.def p{font-size:19px}.kp{padding:20px}.lead{font-size:18px}.bodyp{font-size:17px}.intro{font-size:17px}
.mod{padding-top:32px;gap:16px}
.swipe{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;margin-right:calc(-1*var(--gutter));padding-right:var(--gutter);scrollbar-width:none}
.swipe::-webkit-scrollbar{display:none}.swipe>*{flex:0 0 260px;scroll-snap-align:start}
.swipe-dots{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.12em;color:var(--ink-soft)}
.grid-fig{background:none;border:0;padding:0}
.grid,.grid tbody{display:flex;gap:12px}.grid thead{display:none}
.grid tr{display:flex;flex-direction:column;gap:8px;flex:0 0 270px;scroll-snap-align:start;background:var(--panel);border:1px solid var(--line);padding:16px}
.grid th,.grid td{border:0;padding:0}.grid tbody th{font-size:19px}.grid td::before{content:attr(data-h);display:block;font-family:var(--mono);font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:2px}
.grid td{font-size:14px;color:var(--ink)}
.tbl-wrap .tbl,.tbl-wrap tbody{display:flex;gap:12px}.tbl thead{display:none}
.tbl tr{display:flex;flex-direction:column;gap:8px;flex:0 0 260px;scroll-snap-align:start;background:var(--panel);border:1px solid var(--line);padding:16px}
.tbl td{border:0;padding:0;font-size:14px}.tbl td::before{content:attr(data-h);display:block;font-family:var(--mono);font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:2px}
.idx{grid-template-columns:1fr;gap:0}.idx ol+ol{border-top:0}
.week{grid-template-columns:1fr;padding:0;gap:0}.day{flex-direction:row;flex-wrap:wrap;align-items:baseline;border:0;border-bottom:1px solid var(--line);gap:4px 12px}.day.on{border:0;border-bottom:1px solid var(--line);background:none}
.day>.mono{flex:0 0 40px}.day p{flex:1;font-size:16px}.day .min{flex:0 0 100%;padding:0 0 0 52px;border:0}
.b1,.b2,.b3{width:100%}.bar{flex-direction:column;align-items:flex-start;gap:4px}.bar .mono{flex:none}
.cards3{display:flex}
.cta{padding:24px;margin:0 calc(-1*var(--gutter))}.cta h2{font-size:28px}.cta .sub{font-size:15px}.steps{flex-direction:column;align-items:flex-start;gap:10px}.steps .arw{display:none}
.cta .btns{flex-direction:column}.cta .btn{width:100%}
.paths{display:flex;gap:12px}.paths>*{flex:0 0 240px;scroll-snap-align:start}
.cols3{grid-template-columns:1fr;gap:24px}
.foot .wrap{flex-direction:column;align-items:flex-start;gap:18px}.foot nav{flex-wrap:wrap;gap:16px 22px}.foot{padding-bottom:96px}
.sticky{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:20;align-items:center;justify-content:space-between;gap:12px;padding:12px 20px calc(12px + env(safe-area-inset-bottom));background:var(--bone);border-top:1px solid var(--line);transform:translateY(110%);transition:transform .25s ease}
.sticky.show{transform:none}.sticky span{font-size:12.5px;color:var(--ink-soft)}.sticky span strong{color:var(--ink)}.sticky .btn{padding:11px 14px;font-size:11px}
}`;

const navLinks = `<a href="${SITE}/how-it-works">How it works</a><a href="${SITE}/pricing">Pricing</a><a href="${SITE}/blog">Field notes</a>`;
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--
  ${cfg.slug} · Topical Pillar P7 · HTML mockup (desktop 1440 + mobile 375), generated ${new Date().toISOString().slice(0, 10)} by
  notes/figma-pillar-v2/export-html.js from p7-types-of-personal-goals-v2.3.js, the data Figma frame ${cfg.figma.node} was built from.
  Don't edit by hand: change the data or p7-publish-config.js and rerun. Head tags below are the proposed production values.
-->
<title>${esc(cfg.SEO.title)} | Accountability Guild</title>
<meta name="description" content="${esc(cfg.SEO.description)}">
<link rel="canonical" href="${cfg.SEO.canonical}">
<meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<style>${css}</style>
</head>
<body>
<header class="nav"><div class="wrap">
  <a href="${SITE}/" class="lockup"><i>Accountability</i><b>GUILD</b></a>
  <nav class="nav-links">${navLinks}</nav>
  <a href="${SITE}/login" class="nav-login">Log in</a>
  <a href="${SITE}/create-account" class="btn btn-sm">Start a group</a>
</div></header>

<section class="hero"><div class="wrap">
  <div class="hero-text">
    <h1 class="h1"><em>${esc(topic)}</em> ${esc(rest)}</h1>
    <p class="dek">${esc(D.dek)}</p>
    <div class="hero-cta" id="hero-cta"><a class="btn" href="${SITE}/create-account">Start a group&nbsp; →</a><a class="tl" href="${SITE}/how-it-works">See how it works</a></div>
    <details class="toc-m"><summary class="mono">On this page</summary><ol>${D.toc.map((t, i) => `<li><a href="#${ids[i]}">${esc(t)}</a></li>`).join('')}</ol></details>
  </div>
  ${pic('hero', 'ph-hero', true)}
</div></section>

<div class="wrap body">
  <nav class="rail" aria-label="On this page"><span class="mono">On this page</span><ol>${D.toc.map((t, i) => `<li><a href="#${ids[i]}"${i === 0 ? ' class="on"' : ''}>${esc(t)}</a></li>`).join('')}</ol></nav>
  <main>
    <section class="band" id="${ids[0]}" aria-labelledby="${ids[0]}-h">
      <h2 class="h2" id="${ids[0]}-h">${esc(D.answerH2)}</h2>
      <div class="def"><span class="mono">Definition</span><p>${T(D.def)}</p></div>
      <div class="kr"><div class="kp"><span class="mono">Key points</span><ul>${D.kp.map(k => `<li>${T(k)}</li>`).join('')}</ul></div>
        <aside class="stat"><p>${T(D.stat[0])}</p><span class="mono">${esc(D.stat[1])}</span></aside></div>
      <p class="intro">${T(D.diagIntro)}</p>
      <div class="swipe-wrap">${gridHtml.replace('<table class="grid">', '<table class="grid swipe">')}</div>
      <p class="swipe-dots">●&nbsp; ○&nbsp; ○&nbsp; ○&nbsp; ○&nbsp; ○&nbsp;&nbsp; Swipe for more</p>
      <p class="cap">Every goal has an area and a shape. Examples are illustrative.</p>
    </section>

    <section class="band" id="${ids[1]}" aria-labelledby="${ids[1]}-h">
      <h2 class="h2" id="${ids[1]}-h">${esc(D.mapH2)}</h2>
      <div class="idx"><ol>${D.map.slice(0, half).map((s, i) => idxItem(s, i)).join('')}</ol><ol>${D.map.slice(half).map((s, i) => idxItem(s, i + half)).join('')}</ol></div>
    </section>

${D.mods.map(module).join('\n\n')}

    <section class="cta" aria-labelledby="cta-h">
      <span class="mono">Accountability Guild</span>
      <h2 id="cta-h">${esc(D.cta.h)}</h2>
      <p class="sub">${esc(D.cta.sub)}</p>
      <ol class="steps">${D.cta.steps.map((s, i) => `${i ? '<li class="arw" aria-hidden="true">→</li>' : ''}<li><span class="mono">0${i + 1}</span>${esc(s)}</li>`).join('')}</ol>
      <div class="btns"><a class="btn" href="${SITE}/create-account">Start a group&nbsp; →</a><a class="btn btn-line" href="${SITE}/how-it-works">See how it works</a></div>
      <span class="mono fine">${esc(D.cta.fine)}</span>
    </section>

    <section class="band paths-band" id="${ids[ids.length - 1]}" aria-labelledby="next-h">
      <h2 class="h2" id="next-h">${esc(D.b8h2)}</h2>
      <div class="paths">${D.paths.map(p => `<a class="path" href="${page(p[1])}"><span class="mono">${esc(p[0])}</span><b>${esc(p[1])}</b><small>${esc(p[2])}</small><span class="arw">→</span></a>`).join('')}</div>
      <p class="swipe-dots">●&nbsp; ○&nbsp; ○&nbsp; ○&nbsp;&nbsp; Swipe for more</p>
    </section>

    <section class="band cluster" aria-labelledby="rel-h">
      <h2 class="h2" id="rel-h">${esc(D.b9h2)}</h2>
      <div class="cols3">${D.cluster.map(([g, ls]) => `<div><span class="mono">${esc(g)}</span>${ls.map(l => `<a href="${page(l)}">${esc(l)}</a>`).join('')}</div>`).join('')}</div>
    </section>
  </main>
</div>

<footer class="foot"><div class="wrap">
  <span class="lockup sm"><i>Accountability</i><b>GUILD</b></span>
  <nav>${navLinks}<a href="${SITE}/privacy">Privacy</a><a href="${SITE}/terms">Terms</a></nav>
  <span class="mono">© ${new Date().getFullYear()}</span>
</div></footer>
<div class="sticky" id="sticky"><span><strong>No monthly fee.</strong> Set up in five minutes.</span><a href="${SITE}/create-account" class="btn">Start a group&nbsp; →</a></div>
<script>
// Mobile sticky "Start a group" bar once the hero buttons scroll away; desktop contents rail highlights the section in view.
(function(){var s=document.getElementById('sticky'),h=document.getElementById('hero-cta');
new IntersectionObserver(function(e){s.classList.toggle('show',!e[0].isIntersecting&&e[0].boundingClientRect.top<0)}).observe(h);
var links=[].slice.call(document.querySelectorAll('.rail a'));var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
addEventListener('scroll',function(){var y=scrollY+120,on=0;secs.forEach(function(sec,i){if(sec&&sec.offsetTop<=y)on=i});links.forEach(function(a,i){a.classList.toggle('on',i===on)})},{passive:true});})();
</script>
</body>
</html>
`;

const unused = Object.keys(cfg.LINKS).filter(a => !used.has(a));
if (unused.length) throw new Error('link map anchors not on the page: ' + unused.join(', '));
fs.mkdirSync(path.join(outDir, 'dist'), { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html);
// Single-file copy: every image inlined as base64.
const single = html.replace(new RegExp(IMG.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&') + '([\\w.-]+)', 'g'), (_, f) => {
  const b = fs.readFileSync(path.join(root, 'docs', 'brand', 'assets', 'site-imagery', 'out', f));
  return `data:image/${f.endsWith('.png') ? 'png' : 'jpeg'};base64,${b.toString('base64')}`;
});
if (/(src|srcset|href)="\.\.?\//.test(single)) throw new Error('relative references left in the single file');
const distName = `accountability-guild-${cfg.slug}.html`;
fs.writeFileSync(path.join(outDir, 'dist', distName), single);
console.log('wrote', path.relative(root, path.join(outDir, 'index.html')), Math.round(html.length / 1024) + ' KB;', 'dist/' + distName, Math.round(single.length / 1024) + ' KB; links', used.size);
