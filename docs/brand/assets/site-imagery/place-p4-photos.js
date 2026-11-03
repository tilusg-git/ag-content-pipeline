// Crops the P4 /goal-setting persona photos to their slots (2x), and writes one Scripter script per slot that places them in
// Figma frame 48:292 (desktop) and its mobile frames, with goal tags. The Paper illustration in each slot is hidden, not deleted.
// Usage: node docs/brand/assets/site-imagery/place-p4-photos.js  →  out/<slot>.jpg and scripts in the OS temp folder.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createCanvas, loadImage } = require('../facebook/node_modules/@napi-rs/canvas');
const dir = __dirname;
const SRC = {
  hero: 'Gemini_Generated_Image_rnx6mornx6mornx6.jpg',
  p41: 'Gemini_Generated_Image_ubevzhubevzhubev.jpg',
  p43: 'Gemini_Generated_Image_3a7kia3a7kia3a7k.jpg',
};
// slot: [source, desktop {node, w, h, crop:[x,y,w,h]}, mobile {...}, goal tag or null, tag corner, alt]
const SLOTS = [
  { key: 'hero', src: SRC.hero, d: { node: '60:292', w: 460, h: 400, crop: [60, 0, 1030, 896] }, m: { node: '60:330', w: 335, h: 230, crop: [0, 50, 1200, 824] },
    tag: ['Goal · 12 weeks', 'Run four times a week.'], corner: 'tr', alt: null },
  { key: 'p41', src: SRC.p41, d: { node: '63:280', w: 360, h: 340, crop: [0, 30, 1024, 966] }, m: { node: '63:317', w: 335, h: 210, crop: [0, 260, 1024, 640] },
    tag: null, alt: 'A sticky note on an open notebook that reads "One goal (12 weeks): Finish my certification."' },
  { key: 'p43', src: SRC.p43, d: { node: '60:442', w: 360, h: 300, crop: [60, 0, 1075, 896] }, m: { node: '60:459', w: 335, h: 240, crop: [0, 20, 1200, 857] },
    tag: ['Goal', 'Walk 30 minutes three times a week.'], corner: 'bl', alt: 'Two friends at a kitchen table; one points to a goal written in a notebook.' },
];
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
  for (const s of SLOTS) {
    const d64 = await crop(s.src, s.d.crop, s.d.w, s.d.h, path.join(dir, 'out', `p4-${s.key}-desktop.jpg`));
    const m64 = await crop(s.src, s.m.crop, s.m.w, s.m.h, path.join(dir, 'out', `p4-${s.key}-mobile.jpg`));
    let js = header;
    js += `out.d = await place('${s.d.node}', '${d64}', ${s.d.w}, ${s.d.h}, 'Photo · ${s.key} · desktop', ${JSON.stringify(s.tag)}, '${s.corner}', 1);\n`;
    js += `out.m = await place('${s.m.node}', '${m64}', ${s.m.w}, ${s.m.h}, 'Photo · ${s.key} · mobile', ${JSON.stringify(s.tag)}, '${s.corner}', 0.85);\n`;
    if (s.alt || s.key === 'p43') {
      js += `const fixAlt = async (photoId) => { const ph = await figma.getNodeByIdAsync(photoId); const col2 = ph.parent; const altT = col2.findOne(n => n.type === 'TEXT' && n.characters.startsWith('Alt:')); if (altT) altT.characters = ${JSON.stringify('Alt: ' + s.alt)}; const cl = col2.findOne(n => n.name === 'Callouts'); if (cl) cl.visible = false; };\n`;
      js += `await fixAlt(out.d); await fixAlt(out.m);\n`;
    }
    js += `console.log('PHOTO_${s.key} ' + JSON.stringify(out));\n})().catch(e => console.error('PHOTOERROR ' + (e && e.stack || e)));\n`;
    new Function('figma', js);
    fs.writeFileSync(path.join(os.tmpdir(), `place-${s.key}.js`), js);
    console.log(s.key, 'script', Math.round(js.length / 1024), 'KB');
  }
})();
