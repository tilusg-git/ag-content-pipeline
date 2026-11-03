// Hero style frame v1 (2026-11-03): the P4 /goal-setting hero illustration (route C, brand illustration) in three ground options,
// each at desktop (460x400) and mobile (335x230) size, plus each dropped into a copy of the v2.3 hero (48:292) for context.
// Plain Plugin API (no figma.createAutoLayout), so it runs in Scripter. Copy with: Get-Content -Raw -Encoding UTF8 <file> | Set-Clipboard
(async () => {
const page = await figma.getNodeByIdAsync('25:2'); await figma.setCurrentPageAsync(page);
const F = { serif: { family: 'Newsreader', style: 'Regular' }, serifI: { family: 'Newsreader', style: 'Italic' }, sans: { family: 'Inter', style: 'Regular' }, sansB: { family: 'Inter', style: 'Semi Bold' }, mono: { family: 'JetBrains Mono', style: 'Medium' }, monoB: { family: 'JetBrains Mono', style: 'Bold' } };
await Promise.all(Object.values(F).map(f => figma.loadFontAsync(f)));
const C = { bone: 'FAFAF7', panel: 'FFFFFF', ink: '0F0F0E', soft: '5C5C58', line: 'E5E2DA', ember: 'D8512A', emberSoft: 'F0A98A' };
const rgb = h => ({ r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 });
const P = k => [{ type: 'SOLID', color: rgb(C[k]) }];
function al(parent, dir, o = {}) {
  const f = figma.createFrame(); f.layoutMode = dir === 'H' ? 'HORIZONTAL' : 'VERTICAL'; f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO';
  f.fills = o.bg ? P(o.bg) : []; f.clipsContent = false; f.name = o.name || 'Frame';
  if (o.gap != null) f.itemSpacing = o.gap;
  if (o.pad != null) { const p = Array.isArray(o.pad) ? o.pad : [o.pad, o.pad, o.pad, o.pad]; [f.paddingTop, f.paddingRight, f.paddingBottom, f.paddingLeft] = p; }
  if (o.stroke) { f.strokes = P(o.stroke); f.strokeWeight = o.sw || 1; f.strokeAlign = 'INSIDE'; }
  if (o.align) f.counterAxisAlignItems = o.align;
  if (parent) parent.appendChild(f); return f;
}
function tx(parent, s, o = {}) {
  const t = figma.createText(); t.fontName = F[o.f || 'sans']; t.characters = o.upper ? s.toUpperCase() : s; t.fontSize = o.size || 14; t.fills = P(o.c || 'ink');
  t.lineHeight = { unit: 'PERCENT', value: (o.lh || 1.3) * 100 }; if (o.ls) t.letterSpacing = { unit: 'PERCENT', value: o.ls * 100 };
  parent.appendChild(t); if (o.w) { t.resize(o.w, t.height); t.textAutoResize = 'HEIGHT'; } return t;
}
function rule(parent, w, h, k) { const r = figma.createRectangle(); r.fills = P(k); parent.appendChild(r); r.resize(w, h); return r; }
// The goal card: an index card with an ember top rule, the goal in Newsreader italic, ruled lines, and how it gets checked.
function goalCard(parent, s, th) {
  const c = al(parent, 'V', { name: 'Goal card', bg: th.card, gap: 10 * s, pad: [16 * s, 22 * s, 20 * s, 22 * s], stroke: th.cardStroke });
  const w = 216 * s;
  tx(c, 'Goal · next 12 weeks', { f: 'mono', size: 9 * s, c: th.kicker, ls: 0.16, upper: true });
  rule(c, w, Math.max(1, 1.5 * s), 'ember');
  tx(c, 'Run four times\na week.', { f: 'serifI', size: 28 * s, lh: 1.15, c: th.cardInk, w });
  rule(c, w, 1, th.lines); rule(c, w, 1, th.lines);
  tx(c, 'Check · training log', { f: 'mono', size: 9 * s, c: th.kicker, ls: 0.16, upper: true });
  return c;
}
// The week grid: seven days, four kept (Mon, Wed, Fri, Sun) as ember squares with a bone check.
function weekGrid(parent, s, th) {
  const g = al(parent, 'V', { name: 'Week grid', bg: th.card, gap: 10 * s, pad: 16 * s, stroke: th.cardStroke });
  const hd = al(g, 'H', { gap: 12 * s });
  tx(hd, 'This week', { f: 'mono', size: 9 * s, c: th.kicker, ls: 0.16, upper: true });
  tx(hd, '4 of 4 kept', { f: 'monoB', size: 9 * s, c: 'ember', ls: 0.16, upper: true });
  const row = al(g, 'H', { gap: 6 * s });
  ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((d, i) => {
    const kept = i === 0 || i === 2 || i === 4 || i === 6;
    const col = al(row, 'V', { gap: 5 * s, align: 'CENTER' });
    tx(col, d, { f: 'mono', size: 9 * s, c: th.kicker, ls: 0.1 });
    const cell = figma.createFrame(); cell.name = kept ? 'Kept' : 'Off'; cell.layoutMode = 'VERTICAL'; cell.primaryAxisSizingMode = 'FIXED'; cell.counterAxisSizingMode = 'FIXED';
    cell.primaryAxisAlignItems = 'CENTER'; cell.counterAxisAlignItems = 'CENTER'; col.appendChild(cell); cell.resize(28 * s, 28 * s);
    if (kept) { cell.fills = P('ember'); tx(cell, '✓', { f: 'monoB', size: 13 * s, c: 'bone', lh: 1 }); }
    else { cell.fills = []; cell.strokes = P(th.offStroke || 'soft'); cell.strokeWeight = 1; cell.strokeAlign = 'INSIDE'; }
  });
  return g;
}
// One illustration: a fixed ground frame with the card (tilted) and the grid layered over its lower right.
function illus(s, th, w, h, cardXY, gridXY, name) {
  const fr = figma.createFrame(); fr.name = name; fr.resize(w, h); fr.fills = P(th.ground); fr.clipsContent = true;
  const card = goalCard(fr, s, th); card.x = cardXY[0]; card.y = cardXY[1]; card.rotation = 3;
  const grid = weekGrid(fr, s, th); grid.x = gridXY[0]; grid.y = gridXY[1];
  return fr;
}
const themes = [
  { key: 'A', name: 'Paper', ground: 'line', card: 'panel', cardInk: 'ink', cardStroke: null, kicker: 'soft', lines: 'line', why: 'Warm grey ground, white card. Quietest; closest to the page itself. Safe on every pillar.' },
  { key: 'B', name: 'Ink', ground: 'ink', card: 'bone', cardInk: 'ink', cardStroke: null, kicker: 'soft', lines: 'line', why: 'Dark ground, bone card. Most contrast and the strongest hero; matches the product CTA band, so the page opens and closes in ink.' },
  { key: 'C', name: 'Ember soft', ground: 'emberSoft', card: 'panel', cardInk: 'ink', cardStroke: null, kicker: 'soft', lines: 'line', why: 'Ember-soft ground, white card. Warmest and most distinctive in search results and shares; uses the one warm token at scale.' },
];
// Layout on the canvas, to the right of everything.
const right = Math.max(...page.children.map(n => n.x + n.width));
const wrap = al(null, 'V', { name: 'Hero style frame · v1 · P4 /goal-setting', bg: 'bone', gap: 40, pad: 64 }); page.appendChild(wrap);
wrap.x = right + 400; wrap.y = 0;
tx(wrap, 'Hero style frame · v1', { f: 'mono', size: 11, c: 'ember', ls: 0.18, upper: true });
tx(wrap, 'One illustration, three grounds. Pick one; it sets the style for every Topical Pillar hero and the goal-card family (4.1, 4.3).', { f: 'serif', size: 28, lh: 1.25, w: 1100 });
tx(wrap, 'Route C (brand illustration, media plan §2): built from type, rules and tokens only, so it stays editable, license-free and on-brand. The card reuses in 4.1 and 4.3; the week grid echoes the tally mark and the product\'s kept/missed marks without showing product UI.', { size: 15, c: 'soft', lh: 1.6, w: 1100 });
const opts = al(wrap, 'H', { name: 'Options', gap: 64 });
const ids = [];
for (const th of themes) {
  const col = al(opts, 'V', { name: 'Option ' + th.key + ' · ' + th.name, gap: 16 });
  tx(col, 'Option ' + th.key + ' · ' + th.name, { f: 'mono', size: 11, c: 'ember', ls: 0.16, upper: true });
  tx(col, th.why, { size: 14, c: 'soft', lh: 1.5, w: 819 });
  const row = al(col, 'H', { gap: 24, align: 'MIN' });
  const d = illus(1, th, 460, 400, [40, 56], [176, 236], 'Hero illustration · ' + th.name + ' · desktop 460x400'); row.appendChild(d);
  const m = illus(0.72, th, 335, 230, [18, 20], [128, 128], 'Hero illustration · ' + th.name + ' · mobile 335x230'); row.appendChild(m);
  ids.push(d.id, m.id);
}
// In context: a copy of the v2.3 hero band for each option, placeholder swapped for the illustration.
tx(wrap, 'In the hero (copies of the v2.3 hero band)', { f: 'mono', size: 11, c: 'ember', ls: 0.16, upper: true });
const src = (await figma.getNodeByIdAsync('48:292')).findOne(n => n.name === 'Band 1 · Hero');
for (const th of themes) {
  const band = src.clone(); wrap.appendChild(band); band.name = 'Hero in context · Option ' + th.key + ' · ' + th.name;
  const phNode = band.findOne(n => n.name === 'Media · Hero illustration');
  const ill = illus(1, th, 460, 400, [40, 56], [176, 236], 'Hero illustration · ' + th.name);
  const parent = phNode.parent; const idx = parent.children.indexOf(phNode); parent.insertChild(idx, ill); phNode.remove();
  ids.push(band.id);
}
console.log('HEROSTYLE ' + JSON.stringify({ wrap: wrap.id, x: wrap.x, w: Math.round(wrap.width), h: Math.round(wrap.height), ids }));
})().catch(e => console.error('HEROERROR ' + (e && e.stack || e)));
