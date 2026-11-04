// Crops the P4 /goal-setting persona photos to their slots (2x), and writes one Scripter script per slot that places them in
// Figma frame 48:292 (desktop) and its mobile frames, with goal tags. The Paper illustration in each slot is hidden, not deleted.
// Usage: node docs/brand/assets/site-imagery/place-p4-photos.js [batch]  →  out/<slot>.jpg and scripts in the OS temp folder.
// Batch 1 (2026-11-03): hero, 4.1, 4.3, one script per slot. Batch 2 (2026-11-04): 4.6 and the three 4.8 cards plus the two
// copy changes (4.6 checklist item 1, 4.7 product-context paragraph), all in one script: place-batch2.js.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createCanvas, loadImage } = require('../facebook/node_modules/@napi-rs/canvas');
const dir = __dirname;
const SRC = {
  hero: 'Gemini_Generated_Image_rnx6mornx6mornx6.jpg',
  p41: 'Gemini_Generated_Image_ubevzhubevzhubev.jpg',
  p43: 'Gemini_Generated_Image_3a7kia3a7kia3a7k.jpg',
  p46: 'Gemini_Generated_Image_v8wqx6v8wqx6v8wq.jpg',
  p48a: 'Gemini_Generated_Image_ub0px3ub0px3ub0p.jpg',
  p48b: 'Gemini_Generated_Image_thbh6tthbh6tthbh.jpg',
  // Card 3 was qljm (cork board) on the first run; Grant swapped it for akk7 (group circle with a clipboard tracker) the same day.
  p48c: 'Gemini_Generated_Image_akk710akk710akk7.jpg',
};
const BATCH = Number(process.argv[2] || 1);
// slot: [source, desktop {node, w, h, crop:[x,y,w,h]}, mobile {...}, goal tag or null, tag corner, alt]
const SLOTS = [
  { key: 'hero', src: SRC.hero, d: { node: '60:292', w: 460, h: 400, crop: [60, 0, 1030, 896] }, m: { node: '60:330', w: 335, h: 230, crop: [0, 50, 1200, 824] },
    tag: ['Goal · 12 weeks', 'Run four times a week.'], corner: 'tr', alt: null },
  { key: 'p41', src: SRC.p41, d: { node: '63:280', w: 360, h: 340, crop: [0, 30, 1024, 966] }, m: { node: '63:317', w: 335, h: 210, crop: [0, 260, 1024, 640] },
    tag: null, alt: 'A sticky note on an open notebook that reads "One goal (12 weeks): Finish my certification."' },
  { key: 'p43', src: SRC.p43, d: { node: '60:442', w: 360, h: 300, crop: [60, 0, 1075, 896] }, m: { node: '60:459', w: 335, h: 240, crop: [0, 20, 1200, 857] },
    tag: ['Goal', 'Walk 30 minutes three times a week.'], corner: 'bl', alt: 'Two friends at a kitchen table; one points to a goal written in a notebook.' },
  // Batch 2. Crops keep faces out: p48a starts below the man's beard line; p48c is wide on purpose: blurred background faces are OK (Grant, 2026-11-04).
  { batch: 2, key: 'p46', src: SRC.p46, d: { node: '48:673', w: 360, h: 300, crop: [250, 0, 2150, 1792] }, m: { node: '48:1157', w: 335, h: 210, crop: [0, 150, 2400, 1505] },
    tag: null, alt: 'A hand ticking today’s box on a paper weekly habit tracker taped to a fridge door.' },
  { batch: 2, key: 'p48a', src: SRC.p48a, d: { node: '48:724', w: 286, h: 180, crop: [250, 520, 1615, 1016] }, m: { node: '48:1218', w: 260, h: 150, crop: [150, 520, 1761, 1016] },
    tag: null, alt: 'A person on a park bench after a walk, typing a message on a phone.' },
  { batch: 2, key: 'p48b', src: SRC.p48b, d: { node: '48:731', w: 286, h: 180, crop: [155, 0, 2441, 1536] }, m: { node: '48:1225', w: 260, h: 150, crop: [45, 0, 2662, 1536] },
    tag: null, alt: 'Four people around a kitchen table with notebooks open and phones face down.' },
  { batch: 2, key: 'p48c', src: SRC.p48c, d: { node: '48:738', w: 286, h: 180, crop: [0, 0, 2441, 1536] }, m: { node: '48:1232', w: 260, h: 150, crop: [0, 0, 2662, 1536] },
    tag: null, alt: 'A group meeting in a living room; one member holds a clipboard with a shared tracker of colored ticks.' },
].filter(s => (s.batch || 1) === BATCH);
// Batch 2 copy changes (media plan §9; website imagery guideline §3a).
const ITEM1 = 'One place: a paper sheet, a spreadsheet, a note on your phone, or Accountability Guild if you track with a group.';
const CTX47 = 'Accountability Guild keeps this board for you. Each member marks the day in a tap, adds a note or photo when it matters, and the group sees it. When the review comes, the week is already filled in: no spreadsheet to rebuild, no notebook to find.';
const copyJs = `
for (const id of ['48:659', '48:1164']) { const t = await figma.getNodeByIdAsync(id); await figma.loadFontAsync(t.fontName); t.characters = ${JSON.stringify(ITEM1)}; }
{ // 4.7 desktop: clone the context paragraph 48:717 and put the product paragraph right after it.
  const src = await figma.getNodeByIdAsync('48:717'); await figma.loadFontAsync(src.fontName);
  const c = src.clone(); src.parent.insertChild(src.parent.children.indexOf(src) + 1, c); c.characters = ${JSON.stringify(CTX47)}; c.name = 'Product context'; out.ctxD = c.id; }
{ // 4.7 mobile has no context paragraph: clone the lead 48:1186's style, place after the UI caption 65:283.
  const lead = await figma.getNodeByIdAsync('48:1186'); const cap = await figma.getNodeByIdAsync('65:283'); await figma.loadFontAsync(lead.fontName);
  const c = lead.clone(); cap.parent.insertChild(cap.parent.children.indexOf(cap) + 1, c); c.characters = ${JSON.stringify(CTX47)}; c.name = 'Product context'; out.ctxM = c.id;
  if (!(cap.parent.layoutMode && cap.parent.layoutMode !== 'NONE')) out.ctxMWarn = 'mobile 4.7 is not auto layout: position by hand'; }
`;
async function crop(file, [x, y, w, h], ow, oh, out) {
  const img = await loadImage(path.join(dir, 'source', file));
  const c = createCanvas(ow * 2, oh * 2); c.getContext('2d').drawImage(img, x, y, w, h, 0, 0, ow * 2, oh * 2);
  const buf = c.toBuffer('image/jpeg', 84); fs.writeFileSync(out, buf); return buf.toString('base64');
}
const header = `(async () => {
const page = await figma.getNodeByIdAsync('25:2'); await figma.setCurrentPageAsync(page);
await Promise.all([{ family: 'JetBrains Mono', style: 'Medium' }, { family: 'Newsreader', style: 'Italic' }, { family: 'Inter', style: 'Regular' }].map(f => figma.loadFontAsync(f)));
const col = h => ({ r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 });
function tag(parent, k, line, s, corner) {
  const t = figma.createFrame(); t.name = 'Goal tag'; t.layoutMode = 'VERTICAL'; t.primaryAxisSizingMode = 'AUTO'; t.counterAxisSizingMode = 'AUTO';
  t.itemSpacing = 4 * s; t.paddingTop = t.paddingBottom = 10 * s; t.paddingLeft = t.paddingRight = 14 * s; t.fills = [{ type: 'SOLID', color: col('FAFAF7') }];
  t.strokes = [{ type: 'SOLID', color: col('D8512A') }]; t.strokeAlign = 'INSIDE'; t.strokeTopWeight = 2; t.strokeRightWeight = 0; t.strokeBottomWeight = 0; t.strokeLeftWeight = 0;
  const a = figma.createText(); a.fontName = { family: 'JetBrains Mono', style: 'Medium' }; a.characters = k.toUpperCase(); a.fontSize = 9 * s; a.letterSpacing = { unit: 'PERCENT', value: 16 }; a.fills = [{ type: 'SOLID', color: col('5C5C58') }]; t.appendChild(a);
  const b = figma.createText(); b.fontName = { family: 'Newsreader', style: 'Italic' }; b.characters = line; b.fontSize = 18 * s; b.fills = [{ type: 'SOLID', color: col('0F0F0E') }]; t.appendChild(b);
  parent.appendChild(t); const m = 16 * s;
  t.x = corner === 'tr' ? parent.width - t.width - m : m; t.y = corner === 'tr' ? m : parent.height - t.height - m; return t;
}
function place(oldId, b64, w, h, name, tg, corner, s) {
  return figma.getNodeByIdAsync(oldId).then(old => {
    if (!old) throw new Error('missing ' + oldId);
    const img = figma.createImage(figma.base64Decode(b64));
    const f = figma.createFrame(); f.name = name; f.resize(w, h); f.clipsContent = true; f.fills = [{ type: 'IMAGE', imageHash: img.hash, scaleMode: 'FILL' }];
    if (tg) tag(f, tg[0], tg[1], s, corner);
    const p = old.parent; const i = p.children.indexOf(old); p.insertChild(i, f);
    if (p.layoutMode && p.layoutMode !== 'NONE') { f.layoutSizingHorizontal = 'FIXED'; f.layoutSizingVertical = 'FIXED'; }
    old.visible = false; old.name = old.name + ' (fallback, hidden)';
    return f.id;
  });
}
const out = {};
`;
(async () => {
  fs.mkdirSync(path.join(dir, 'out'), { recursive: true });
  let combined = header;
  for (const s of SLOTS) {
    const d64 = await crop(s.src, s.d.crop, s.d.w, s.d.h, path.join(dir, 'out', `p4-${s.key}-desktop.jpg`));
    const m64 = await crop(s.src, s.m.crop, s.m.w, s.m.h, path.join(dir, 'out', `p4-${s.key}-mobile.jpg`));
    let js = header;
    js += `out.${s.key}_d = await place('${s.d.node}', '${d64}', ${s.d.w}, ${s.d.h}, 'Photo · ${s.key} · desktop', ${JSON.stringify(s.tag)}, '${s.corner}', 1);\n`;
    js += `out.${s.key}_m = await place('${s.m.node}', '${m64}', ${s.m.w}, ${s.m.h}, 'Photo · ${s.key} · mobile', ${JSON.stringify(s.tag)}, '${s.corner}', 0.85);\n`;
    if (s.alt || s.key === 'p43') {
      js += `const fixAlt = async (photoId) => { const ph = await figma.getNodeByIdAsync(photoId); const col2 = ph.parent; const altT = col2.findOne(n => n.type === 'TEXT' && n.characters.startsWith('Alt:')); if (altT) altT.characters = ${JSON.stringify('Alt: ' + s.alt)}; const cl = col2.findOne(n => n.name === 'Callouts'); if (cl) cl.visible = false; };\n`;
      js += `await fixAlt(out.${s.key}_d); await fixAlt(out.${s.key}_m);\n`;
    }
    combined += js.slice(header.length);
    js += `console.log('PHOTO_${s.key} ' + JSON.stringify(out));\n})().catch(e => console.error('PHOTOERROR ' + (e && e.stack || e)));\n`;
    new Function('figma', js);
    fs.writeFileSync(path.join(os.tmpdir(), `place-${s.key}.js`), js);
    console.log(s.key, 'script', Math.round(js.length / 1024), 'KB');
  }
  if (BATCH === 2) {
    combined = combined.replace(/const fixAlt = /g, 'var fixAlt = ');
    combined += copyJs + `console.log('BATCH2 ' + JSON.stringify(out)); figma.notify('Batch 2 placed');
})().catch(e => { console.error('PHOTOERROR ' + (e && e.stack || e)); figma.notify('Batch 2 error: ' + e.message); });
`;
    new Function('figma', combined);
    fs.writeFileSync(path.join(os.tmpdir(), 'place-batch2.js'), combined);
    console.log('batch2 combined', Math.round(combined.length / 1024), 'KB');
  }
})();
