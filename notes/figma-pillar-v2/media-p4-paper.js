// P4 /goal-setting media pass 1 (2026-11-03): Paper-style brand illustrations (brand standards §16, route C) swapped into
// the v2.3 frame (48:292) and its mobile frames, replacing the placeholders for the hero, 4.1 and 4.3.
// Plain Plugin API, run through Scripter. Copy with: Get-Content -Raw -Encoding UTF8 <file> | Set-Clipboard
(async () => {
const page = await figma.getNodeByIdAsync('25:2'); await figma.setCurrentPageAsync(page);
const F = { serifI: { family: 'Newsreader', style: 'Italic' }, mono: { family: 'JetBrains Mono', style: 'Medium' }, monoB: { family: 'JetBrains Mono', style: 'Bold' } };
await Promise.all(Object.values(F).map(f => figma.loadFontAsync(f)));
const C = { bone: 'FAFAF7', panel: 'FFFFFF', ink: '0F0F0E', soft: '5C5C58', line: 'E5E2DA', ember: 'D8512A' };
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
  const t = figma.createText(); t.fontName = F[o.f || 'mono']; t.characters = o.upper ? s.toUpperCase() : s; t.fontSize = o.size || 14; t.fills = P(o.c || 'ink');
  t.lineHeight = { unit: 'PERCENT', value: (o.lh || 1.3) * 100 }; if (o.ls) t.letterSpacing = { unit: 'PERCENT', value: o.ls * 100 };
  parent.appendChild(t); if (o.w) { t.resize(o.w, t.height); t.textAutoResize = 'HEIGHT'; } return t;
}
function rule(parent, w, h, k) { const r = figma.createRectangle(); r.fills = P(k); parent.appendChild(r); r.resize(w, h); return r; }
function box(parent, w, h, o = {}) { const b = figma.createFrame(); b.name = o.name || 'Cell'; b.layoutMode = 'VERTICAL'; b.primaryAxisSizingMode = 'FIXED'; b.counterAxisSizingMode = 'FIXED'; b.primaryAxisAlignItems = 'CENTER'; b.counterAxisAlignItems = 'CENTER'; parent.appendChild(b); b.resize(w, h); b.fills = o.bg ? P(o.bg) : []; if (o.stroke) { b.strokes = P(o.stroke); b.strokeWeight = 1; b.strokeAlign = 'INSIDE'; } b.clipsContent = false; return b; }
function ground(w, h, name) { const fr = figma.createFrame(); fr.name = name; fr.resize(w, h); fr.fills = P('line'); fr.clipsContent = true; return fr; }
// Shared goal card (Paper: panel card, ember top rule, Newsreader italic goal, ruled lines, mono labels).
function goalCard(parent, s, kicker, lines, foot) {
  const c = al(parent, 'V', { name: 'Goal card', bg: 'panel', gap: 10 * s, pad: [16 * s, 22 * s, 20 * s, 22 * s] }); const w = 216 * s;
  tx(c, kicker, { size: 9 * s, c: 'soft', ls: 0.16, upper: true });
  rule(c, w, Math.max(1, 1.5 * s), 'ember');
  tx(c, lines, { f: 'serifI', size: 28 * s, lh: 1.15, w });
  rule(c, w, 1, 'line'); rule(c, w, 1, 'line');
  if (foot) tx(c, foot, { size: 9 * s, c: 'soft', ls: 0.16, upper: true });
  return c;
}
// Hero: goal card + week grid, 4 of 4 kept.
function hero(s, w, h, cardXY, gridXY) {
  const fr = ground(w, h, 'Hero illustration · Paper');
  const card = goalCard(fr, s, 'Goal · next 12 weeks', 'Run four times\na week.', 'Check · training log'); card.x = cardXY[0]; card.y = cardXY[1]; card.rotation = 3;
  const g = al(fr, 'V', { name: 'Week grid', bg: 'panel', gap: 10 * s, pad: 16 * s });
  const hd = al(g, 'H', { gap: 12 * s }); tx(hd, 'This week', { size: 9 * s, c: 'soft', ls: 0.16, upper: true }); tx(hd, '4 of 4 kept', { f: 'monoB', size: 9 * s, c: 'ember', ls: 0.16, upper: true });
  const row = al(g, 'H', { gap: 6 * s });
  ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((d, i) => { const kept = i % 2 === 0; const col = al(row, 'V', { gap: 5 * s, align: 'CENTER' }); tx(col, d, { size: 9 * s, c: 'soft', ls: 0.1 }); const b = box(col, 28 * s, 28 * s, kept ? { bg: 'ember', name: 'Kept' } : { stroke: 'soft', name: 'Off' }); if (kept) tx(b, '✓', { f: 'monoB', size: 13 * s, c: 'bone', lh: 1 }); });
  g.x = gridXY[0]; g.y = gridXY[1]; return fr;
}
// 4.1: one goal clipped above a 12-week calendar, week 12 circled.
function pickOne(s, w, h, cardXY, calXY) {
  const fr = ground(w, h, '4.1 illustration · one goal, 12 weeks');
  const cal = al(fr, 'V', { name: '12-week calendar', bg: 'panel', gap: 10 * s, pad: 16 * s });
  tx(cal, 'Next 12 weeks', { size: 9 * s, c: 'soft', ls: 0.16, upper: true });
  for (let r = 0; r < 2; r++) { const row = al(cal, 'H', { gap: 8 * s }); for (let i = 1; i <= 6; i++) { const n = r * 6 + i; const b = box(row, 36 * s, 36 * s, { stroke: n === 12 ? null : 'line', bg: n === 12 ? 'bone' : null, name: 'Week ' + n }); tx(b, 'W' + n, { size: 9 * s, c: n === 12 ? 'ember' : 'soft', f: n === 12 ? 'monoB' : 'mono' }); } }
  cal.x = calXY[0]; cal.y = calXY[1];
  const card = goalCard(fr, s, 'Goal · ends week 12', 'Finish my\ncertification.', null); card.x = cardXY[0]; card.y = cardXY[1]; card.rotation = -2;
  const clip = figma.createRectangle(); clip.name = 'Clip'; clip.fills = P('ink'); fr.appendChild(clip); clip.resize(34 * s, 10 * s); clip.x = cardXY[0] + 90 * s; clip.y = cardXY[1] - 6 * s;
  // Ring week 12: positioned from the calendar's measured cell.
  const w12 = cal.findOne(n => n.name === 'Week 12'); const bb = w12.absoluteBoundingBox, fb = fr.absoluteBoundingBox;
  const ring = figma.createEllipse(); ring.name = 'Circled end date'; fr.appendChild(ring); ring.resize(52 * s, 52 * s); ring.fills = []; ring.strokes = P('ember'); ring.strokeWeight = Math.max(1.5, 2 * s);
  ring.x = bb.x - fb.x + bb.width * 0.5 - 26 * s; ring.y = bb.y - fb.y + bb.height * 0.5 - 26 * s;
  return fr;
}
// 4.3: the checkable goal card with numbered markers on the action, the number, and the schedule.
function annotated(s, w, h, xy) {
  const fr = ground(w, h, '4.3 illustration · annotated goal card');
  const c = al(fr, 'V', { name: 'Goal card (annotated)', bg: 'panel', gap: 10 * s, pad: [18 * s, 24 * s, 22 * s, 24 * s] });
  tx(c, 'Goal', { size: 9 * s, c: 'soft', ls: 0.16, upper: true }); rule(c, 252 * s, Math.max(1, 1.5 * s), 'ember');
  [['1', 'Walk'], ['2', '30 minutes'], ['3', 'three times a week.']].forEach(([n, t]) => {
    const row = al(c, 'H', { gap: 12 * s, align: 'CENTER' });
    const m = box(row, 22 * s, 22 * s, { bg: 'ember', name: 'Marker ' + n }); m.cornerRadius = 11 * s; tx(m, n, { f: 'monoB', size: 11 * s, c: 'bone', lh: 1 });
    tx(row, t, { f: 'serifI', size: 27 * s, lh: 1.15 });
  });
  rule(c, 252 * s, 1, 'line');
  c.x = xy[0]; c.y = xy[1]; return fr;
}
// Swap a placeholder node for an illustration, keeping its slot in the layout.
function swap(old, ill) { const p = old.parent; const i = p.children.indexOf(old); p.insertChild(i, ill); if (p.layoutMode && p.layoutMode !== 'NONE') { ill.layoutSizingHorizontal = 'FIXED'; ill.layoutSizingVertical = 'FIXED'; } old.remove(); return ill.id; }
const pg = await figma.getNodeByIdAsync('48:292');
const mob = async (id, want) => { const n = await figma.getNodeByIdAsync(id); if (!n || n.name !== want) throw new Error('mobile frame mismatch ' + id + ' ' + (n && n.name)); return n; };
const mHero = await mob('48:872', 'Mobile 375 · Hero'), m41 = await mob('48:993', 'Mobile 375 · Module 4.1'), m43 = await mob('48:1053', 'Mobile 375 · Module 4.3');
const d41 = pg.findOne(n => n.name === 'Module 4.1 · Pick one goal'), d43 = pg.findOne(n => n.name === 'Module 4.3 · Make it checkable');
const out = {};
out.heroD = swap(pg.findOne(n => n.name === 'Media · Hero illustration'), hero(1, 460, 400, [40, 56], [176, 236]));
out.heroM = swap(mHero.findOne(n => n.name === 'Media · Hero illustration'), hero(0.72, 335, 230, [18, 20], [128, 128]));
out.p41D = swap(d41.findOne(n => n.name === 'Media · Image'), pickOne(1, 360, 340, [40, 24], [36, 192]));
out.p41M = swap(m41.findOne(n => n.name === 'Media · Image'), pickOne(0.66, 335, 210, [14, 12], [133, 104]));
out.p43D = swap(d43.findOne(n => n.name === 'Annotated image'), annotated(1, 360, 300, [28, 48]));
out.p43M = swap(m43.findOne(n => n.name === 'Media · Annotated image'), annotated(0.92, 335, 240, [24, 26]));
console.log('MEDIA1 ' + JSON.stringify(out));
})().catch(e => console.error('MEDIA1ERROR ' + (e && e.stack || e)));
