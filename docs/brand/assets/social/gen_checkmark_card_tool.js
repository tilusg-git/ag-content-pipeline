#!/usr/bin/env node
/* Accountability Guild — editable "checkmark goal" social card tool.
 *
 * Unlike the other gen_*.js scripts in this asset library, this one takes no
 * per-run content flags. It writes a single self-contained, fully interactive
 * HTML page: pillar select, goal-text field, and a Kept/Missed/Skipped picker
 * all live-redraw an HTML5 canvas that mirrors the real in-app "mark sheet"
 * card (see src/components/dashboard-today-marks.tsx + the .dash-mark-outcomes
 * rules in src/styles/components.css) — same colors, same button states, same
 * glyphs per outcome (check / dash / "s"), so the exported asset matches the
 * product instead of just looking similar.
 *
 * Brand fonts are embedded as base64 @font-face data URIs (no network calls,
 * works inside the sandboxed Artifact CSP). Only InterTight-SemiBold and
 * JetBrainsMono-Bold are bundled locally (repo/assets/fonts) — there is no
 * upright-weight Newsreader file in this checkout (only Newsreader-Italic),
 * so the goal headline falls back to Georgia/serif, which is exactly the
 * documented fallback chain in docs/brand/design-system/tokens.json
 * (font.family.serif = ["Newsreader", "Georgia", "serif"]). Swap in a real
 * Newsreader-Regular.ttf later and change GOAL_FONT below to match exactly.
 *
 * Export follows the same reliable pattern as gen_quote_card_canvas.js:
 * canvas renders, then gets swapped for a plain <img> of the PNG so the user
 * can right-click -> "Save image as..." (scripted downloads are unreliable
 * inside sandboxed artifact previews).
 *
 * Also offers a "Download animated GIF" export of the currently-selected
 * status button's check-in transition (empty box -> filled ink button with
 * an ember glyph box popping in). GIF encoding runs client-side via a
 * vendored copy of gifenc (MIT, mattdesl) at vendor/gifenc.js, read and
 * inlined the same way the fonts are -- gifenc runs synchronously on the
 * main thread (no Web Worker), so no CSP worker-src complications. GIF
 * export always renders on an opaque bone background regardless of the
 * transparent-background toggle: GIF transparency is 1-bit (no alpha
 * blending), so honoring that toggle there would visibly degrade every
 * antialiased edge. The transparent toggle stays PNG-only.
 *
 * Usage:
 *   node gen_checkmark_card_tool.js --out checkmark-card-tool.html
 */
const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      out[a.slice(2)] = argv[i + 1];
      i++;
    }
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const outPath = args.out || 'checkmark-card-tool.html';

const FONT_DIR = path.join(__dirname, '..', '..', '..', '..', 'repo', 'assets', 'fonts');
function b64(file) {
  return fs.readFileSync(path.join(FONT_DIR, file)).toString('base64');
}
const INTERTIGHT_B64 = b64('InterTight-SemiBold.ttf');
const JETBRAINS_B64 = b64('JetBrainsMono-Bold.ttf');

const VENDOR_DIR = path.join(__dirname, 'vendor');
const GIFENC_SRC = fs.readFileSync(path.join(VENDOR_DIR, 'gifenc.js'), 'utf8');

const html = `<title>AG checkmark goal card — editable</title>
<style>
@font-face { font-family: "AGInterTight"; src: url(data:font/ttf;base64,${INTERTIGHT_B64}) format("truetype"); font-weight: 600; }
@font-face { font-family: "AGJetBrainsMono"; src: url(data:font/ttf;base64,${JETBRAINS_B64}) format("truetype"); font-weight: 700; }

:root {
  --page-bg: #EDEBE4; --page-fg: #1A1A18; --page-fg-soft: #6B6B65;
  --panel: #FFFFFF; --line: #E5E2DA; --accent: #D8512A;
}
@media (prefers-color-scheme: dark) {
  :root { --page-bg: #1C1C1A; --page-fg: #F2F1EC; --page-fg-soft: #9C9C95; --panel: #262624; --line: #38372F; }
}
:root[data-theme="dark"] { --page-bg: #1C1C1A; --page-fg: #F2F1EC; --page-fg-soft: #9C9C95; --panel: #262624; --line: #38372F; }
:root[data-theme="light"] { --page-bg: #EDEBE4; --page-fg: #1A1A18; --page-fg-soft: #6B6B65; --panel: #FFFFFF; --line: #E5E2DA; }

* { box-sizing: border-box; }
body {
  font-family: "AGInterTight", system-ui, sans-serif;
  background: var(--page-bg); color: var(--page-fg);
  margin: 0; padding: 32px 20px 64px;
  display: flex; flex-direction: column; align-items: center; gap: 24px;
}
.eyebrow {
  font-family: "AGJetBrainsMono", monospace; font-size: 13px; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--page-fg-soft); text-align: center;
}
.layout {
  width: min(94vw, 1180px);
  display: grid; grid-template-columns: 320px 1fr; gap: 24px; align-items: start;
}
@media (max-width: 860px) { .layout { grid-template-columns: 1fr; } }

.controls {
  background: var(--panel); border: 1px solid var(--line);
  padding: 20px; display: flex; flex-direction: column; gap: 18px;
}
.field { display: flex; flex-direction: column; gap: 6px; }
.field label {
  font-family: "AGJetBrainsMono", monospace; font-size: 11px; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--page-fg-soft);
}
select, textarea {
  font-family: "AGInterTight", system-ui, sans-serif; font-size: 14px;
  padding: 10px 12px; border: 1px solid var(--line); background: var(--page-bg);
  color: var(--page-fg); resize: vertical;
}
textarea { min-height: 76px; line-height: 1.4; }
.charcount { font-size: 11px; color: var(--page-fg-soft); text-align: right; }

.status-picker { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.status-picker button {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  min-height: 44px; border: 1px solid var(--line); background: transparent;
  color: var(--page-fg); font-family: "AGInterTight", sans-serif; font-size: 12px;
  font-weight: 600; cursor: pointer; padding: 8px 6px;
  transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
}
.status-picker button .box {
  width: 16px; height: 16px; border: 1.5px solid var(--line); display: grid; place-items: center;
  font-size: 10px; color: transparent; transition: background 120ms ease, border-color 120ms ease;
}
.status-picker button.is-active {
  background: #0F0F0E; border-color: #0F0F0E; color: #FAFAF7;
  transform: scale(1.03);
}
.status-picker button.is-active .box {
  background: var(--accent); border-color: var(--accent); color: #FAFAF7;
  animation: pop 220ms ease;
}
@keyframes pop { 0% { transform: scale(0.4); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }

.toggle-row { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.toggle-row input { accent-color: var(--accent); }

.stage-col { display: flex; flex-direction: column; gap: 16px; align-items: center; }
.stage {
  width: 100%; background: repeating-conic-gradient(#00000010 0% 25%, transparent 0% 50%) 0 0/16px 16px;
  border: 1px solid var(--line); padding: 16px; display: flex; justify-content: center;
}
#card, #cardImg { display: block; width: 100%; height: auto; max-width: 900px; }

.actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
button.primary {
  font-family: "AGJetBrainsMono", monospace; font-size: 13px; letter-spacing: 0.08em;
  text-transform: uppercase; padding: 12px 20px; border-radius: 3px;
  border: 1px solid var(--accent); background: var(--accent); color: #FAFAF7; cursor: pointer;
}
button.primary:hover { opacity: 0.85; }
button.primary:disabled { opacity: 0.5; cursor: wait; }
.hint { width: min(90vw, 700px); font-size: 13px; line-height: 1.5; color: var(--page-fg-soft); text-align: center; margin: 0; }
.hint strong { color: var(--page-fg); }
.hint.err { display: none; color: #B5432A; }
</style>

<div class="eyebrow">Field notes &middot; editable checkmark goal card</div>

<div class="layout">
  <div class="controls">
    <div class="field">
      <label for="pillarSelect">Pillar</label>
      <select id="pillarSelect">
        <option value="PERSONAL" selected>Personal</option>
        <option value="PROFESSIONAL">Professional</option>
        <option value="FITNESS">Fitness</option>
        <option value="FAITH">Faith</option>
        <option value="FAMILY">Family</option>
      </select>
    </div>
    <div class="field">
      <label for="goalText">Goal</label>
      <textarea id="goalText" maxlength="160">Fully fund my Roth IRA in 2026 with monthly contributions.</textarea>
      <div class="charcount"><span id="charcount">0</span>/160</div>
    </div>
    <div class="field">
      <label>Status</label>
      <div class="status-picker" id="statusPicker">
        <button type="button" data-status="kept" class="is-active"><span class="box" aria-hidden="true">&#10003;</span>Kept</button>
        <button type="button" data-status="missed"><span class="box" aria-hidden="true">&minus;</span>Missed</button>
        <button type="button" data-status="skipped"><span class="box" aria-hidden="true">s</span>Skipped</button>
      </div>
    </div>
    <div class="toggle-row">
      <input type="checkbox" id="transparentToggle" />
      <label for="transparentToggle" style="text-transform:none;font-family:inherit;letter-spacing:normal;color:inherit;">Transparent background (for compositing over photos)</label>
    </div>
  </div>

  <div class="stage-col">
    <div class="stage">
      <canvas id="card" width="1200" height="400"></canvas>
      <img id="cardImg" style="display:none;" alt="Accountability Guild checkmark goal card" />
    </div>
    <div class="actions">
      <button class="primary" id="downloadBtn">Download PNG</button>
      <button class="primary" id="downloadGifBtn">Download animated GIF</button>
    </div>
    <p class="hint">If a button doesn't trigger a download (sandboxed previews often block it), right-click the card above &rarr; <strong>Save image as&hellip;</strong> It exports at full resolution (1200px wide) regardless of the on-screen size.</p>
    <p class="hint">The animated GIF shows the current status button checking in and always exports on a solid bone background &mdash; GIF doesn't support smooth transparency, so the transparent-background toggle only applies to the PNG.</p>
    <p class="hint err" id="errHint"></p>
  </div>
</div>

<script>
// gifenc -- MIT License, (c) Matt DesLauriers -- https://github.com/mattdesl/gifenc
// Vendored verbatim (dist/gifenc.js) so it works as a plain inline <script> with
// no bundler and no network fetch at runtime. Its CJS build writes to a bare
// top-level "exports" with no UMD wrapper, hence the shim var below.
var exports = {};
${GIFENC_SRC}
var GIFEncoder = exports.GIFEncoder, quantize = exports.quantize, applyPalette = exports.applyPalette;
</script>

<script>
const INTER = "AGInterTight";
const MONO = "AGJetBrainsMono";
const GOAL_FONT = "Georgia, 'Times New Roman', serif"; // stand-in for upright Newsreader — see script header

const INK = "#0F0F0E";
const INK_SOFT = "#5C5C58";
const LINE = "#E5E2DA";
const PANEL = "#FFFFFF";
const BONE = "#FAFAF7";
const EMBER = "#D8512A";

const STATUS_META = {
  kept:    { label: "Kept",    glyph: "check" },
  missed:  { label: "Missed",  glyph: "dash" },
  skipped: { label: "Skipped", glyph: "s" },
};

const GIF_FRAME_COUNT = 16;
const GIF_FRAME_DELAY_MS = 35;
const GIF_HOLD_DELAY_MS = 1100;
const GIF_MAX_COLORS = 64;

const state = {
  pillar: "PERSONAL",
  goal: document.getElementById("goalText").value,
  status: "kept",
  transparent: false,
  gifBlobUrl: null,
};

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function lerpColor(hexA, hexB, t) {
  const a = hexToRgb(hexA), b = hexToRgb(hexB);
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bch = Math.round(a[2] + (b[2] - a[2]) * t);
  return "rgb(" + r + ", " + g + ", " + bch + ")";
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function easeOutCubic(u) { return 1 - Math.pow(1 - u, 3); }
function popScale(u) { return 1 + 0.14 * Math.sin(Math.PI * clamp(u, 0, 1)); }

function wrapGoalText(ctx, text, maxWidth) {
  let hs = 52;
  const words = text.split(/\\s+/).filter(Boolean);
  let lines;
  while (true) {
    ctx.font = \`\${hs}px \${GOAL_FONT}\`;
    lines = [];
    let cur = [];
    for (const w of words) {
      const test = [...cur, w].join(" ");
      if (ctx.measureText(test).width <= maxWidth || cur.length === 0) {
        cur.push(w);
      } else {
        lines.push(cur.join(" "));
        cur = [w];
      }
    }
    if (cur.length) lines.push(cur.join(" "));
    if (lines.length <= 3 || hs <= 32) break;
    hs -= 2;
  }
  return { lines, size: hs };
}

function drawGlyph(ctx, kind, cx, cy, boxSize) {
  ctx.strokeStyle = BONE;
  ctx.fillStyle = BONE;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (kind === "check") {
    ctx.lineWidth = boxSize * 0.13;
    ctx.beginPath();
    ctx.moveTo(cx - boxSize * 0.28, cy + boxSize * 0.02);
    ctx.lineTo(cx - boxSize * 0.06, cy + boxSize * 0.22);
    ctx.lineTo(cx + boxSize * 0.30, cy - boxSize * 0.22);
    ctx.stroke();
  } else if (kind === "dash") {
    ctx.lineWidth = boxSize * 0.13;
    ctx.beginPath();
    ctx.moveTo(cx - boxSize * 0.25, cy);
    ctx.lineTo(cx + boxSize * 0.25, cy);
    ctx.stroke();
  } else if (kind === "s") {
    ctx.font = \`700 \${boxSize * 0.62}px \${INTER}\`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("s", cx, cy + boxSize * 0.04);
  }
}

function draw(ctx, W, { animateKey = null, progress = 1 } = {}) {
  const M = 64;
  const maxWidth = W - 2 * M;

  ctx.letterSpacing = "0px";
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  // Kicker
  const kickerSize = 22;
  ctx.font = \`700 \${kickerSize}px \${MONO}\`;
  ctx.letterSpacing = (kickerSize * 0.18) + "px";
  ctx.fillStyle = INK_SOFT;
  const kickerY = M + kickerSize * 0.78;
  ctx.fillText(state.pillar || "PERSONAL", M, kickerY);
  ctx.letterSpacing = "0px";

  // Goal text (measure pass to size the canvas)
  const goal = (state.goal || "").trim() || "What are you committing to?";
  const { lines, size: hs } = wrapGoalText(ctx, goal, maxWidth);
  const lh = hs * 1.28;
  const goalTop = kickerY + 34;
  let y = goalTop + hs * 0.86;

  ctx.font = \`\${hs}px \${GOAL_FONT}\`;
  ctx.fillStyle = INK;
  for (const line of lines) {
    ctx.fillText(line, M, y);
    y += lh;
  }
  const textBlockBottom = y - lh + (lh - hs * 0.86);

  // Outcome buttons
  const btnTop = textBlockBottom + 40;
  const btnH = 92;
  const gap = 16;
  const btnW = (maxWidth - 2 * gap) / 3;
  const order = ["kept", "missed", "skipped"];

  const H = btnTop + btnH + M;

  order.forEach((key, i) => {
    const meta = STATUS_META[key];
    const bx = M + i * (btnW + gap);
    const by = btnTop;
    const selected = state.status === key;
    const isAnimating = key === animateKey;
    const t = isAnimating ? easeOutCubic(progress) : (selected ? 1 : 0);

    ctx.fillStyle = lerpColor(PANEL, INK, t);
    ctx.fillRect(bx, by, btnW, btnH);
    ctx.strokeStyle = lerpColor(LINE, INK, t);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(bx + 0.75, by + 0.75, btnW - 1.5, btnH - 1.5);

    const boxSize = 30;
    ctx.font = \`600 20px \${INTER}\`;
    const labelWidth = ctx.measureText(meta.label).width;
    const groupGap = 12;
    const groupWidth = boxSize + groupGap + labelWidth;
    const groupStartX = bx + (btnW - groupWidth) / 2;
    const centerY = by + btnH / 2;

    const boxX = groupStartX;
    const boxY = centerY - boxSize / 2;
    const boxCenterX = boxX + boxSize / 2;
    const boxCenterY = boxY + boxSize / 2;
    const glyphU = isAnimating ? clamp((t - 0.35) / 0.65, 0, 1) : (selected ? 1 : 0);
    const scale = isAnimating ? popScale(glyphU) : 1;

    ctx.save();
    if (scale !== 1) {
      ctx.translate(boxCenterX, boxCenterY);
      ctx.scale(scale, scale);
      ctx.translate(-boxCenterX, -boxCenterY);
    }
    ctx.fillStyle = lerpColor(PANEL, EMBER, t);
    ctx.fillRect(boxX, boxY, boxSize, boxSize);
    ctx.strokeStyle = lerpColor(LINE, EMBER, t);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(boxX + 0.75, boxY + 0.75, boxSize - 1.5, boxSize - 1.5);
    if (glyphU > 0) {
      ctx.globalAlpha = glyphU;
      drawGlyph(ctx, meta.glyph, boxCenterX, boxCenterY, boxSize);
      ctx.globalAlpha = 1;
    }
    ctx.restore();

    ctx.font = \`600 20px \${INTER}\`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = lerpColor(INK, BONE, t);
    ctx.fillText(meta.label, groupStartX + boxSize + groupGap, centerY + 1);
    ctx.textBaseline = "alphabetic";
  });

  return H;
}

function showError(err) {
  const el = document.getElementById("errHint");
  el.style.display = "block";
  el.textContent = "Render error: " + (err && err.message ? err.message : String(err));
  console.error(err);
}

function render() {
  try {
    const canvas = document.getElementById("card");
    const img = document.getElementById("cardImg");
    const ctx = canvas.getContext("2d");
    const W = 1200;

    // Measure pass on a throwaway context state to get final height.
    canvas.width = W;
    canvas.height = 2000;
    const H = draw(ctx, W);

    canvas.width = W;
    canvas.height = H;
    if (!state.transparent) {
      ctx.fillStyle = BONE;
      ctx.fillRect(0, 0, W, H);
    } else {
      ctx.clearRect(0, 0, W, H);
    }
    draw(ctx, W);

    const dataUrl = canvas.toDataURL("image/png");
    img.src = dataUrl;
    img.width = W;
    img.height = H;
    img.style.display = "block";
    canvas.style.display = "none";
  } catch (err) {
    showError(err);
  }
}

function buildStatusGif(button) {
  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = "Rendering…";
  setTimeout(() => {
    try {
      const canvas = document.getElementById("card");
      const img = document.getElementById("cardImg");
      const ctx = canvas.getContext("2d");
      const W = 1200;

      canvas.width = W;
      canvas.height = 2000;
      const H = draw(ctx, W);
      canvas.width = W;
      canvas.height = H;

      function renderFrame(progress) {
        ctx.fillStyle = BONE;
        ctx.fillRect(0, 0, W, H);
        draw(ctx, W, { animateKey: state.status, progress });
        return ctx.getImageData(0, 0, W, H).data;
      }

      const finalRGBA = renderFrame(1);
      const palette = quantize(finalRGBA, GIF_MAX_COLORS);
      const finalIndex = applyPalette(finalRGBA, palette);

      const gif = GIFEncoder();
      for (let f = 0; f < GIF_FRAME_COUNT; f++) {
        const progress = f / (GIF_FRAME_COUNT - 1);
        const last = f === GIF_FRAME_COUNT - 1;
        const index = last ? finalIndex : applyPalette(renderFrame(progress), palette);
        gif.writeFrame(index, W, H, {
          palette: f === 0 ? palette : undefined,
          delay: GIF_FRAME_DELAY_MS,
        });
      }
      gif.writeFrame(finalIndex, W, H, { delay: GIF_HOLD_DELAY_MS });
      gif.finish();

      const blob = new Blob([gif.bytes()], { type: "image/gif" });
      if (state.gifBlobUrl) URL.revokeObjectURL(state.gifBlobUrl);
      const url = URL.createObjectURL(blob);
      state.gifBlobUrl = url;

      img.src = url;
      img.width = W;
      img.height = H;
      img.style.display = "block";
      canvas.style.display = "none";

      const link = document.createElement("a");
      link.download = "ag-checkmark-goal-" + state.status + ".gif";
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      showError(err);
    } finally {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  }, 0);
}

function loadFontsThenRender() {
  const faces = [
    new FontFace(INTER, \`url(data:font/ttf;base64,${INTERTIGHT_B64})\`, { weight: "600" }),
    new FontFace(MONO, \`url(data:font/ttf;base64,${JETBRAINS_B64})\`, { weight: "700" }),
  ];
  Promise.all(faces.map((f) => f.load().then((loaded) => document.fonts.add(loaded))))
    .then(() => document.fonts.ready)
    .then(render)
    .catch(showError);
}

document.getElementById("pillarSelect").addEventListener("change", (e) => {
  state.pillar = e.target.value;
  render();
});

const goalTextEl = document.getElementById("goalText");
const charcountEl = document.getElementById("charcount");
function syncCharcount() { charcountEl.textContent = String(goalTextEl.value.length); }
goalTextEl.addEventListener("input", (e) => {
  state.goal = e.target.value;
  syncCharcount();
  render();
});
syncCharcount();

document.getElementById("statusPicker").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-status]");
  if (!btn) return;
  state.status = btn.dataset.status;
  document.querySelectorAll("#statusPicker button").forEach((b) => b.classList.toggle("is-active", b === btn));
  render();
});

document.getElementById("transparentToggle").addEventListener("change", (e) => {
  state.transparent = e.target.checked;
  render();
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  try {
    const img = document.getElementById("cardImg");
    const link = document.createElement("a");
    link.download = "ag-checkmark-goal-" + state.status + ".png";
    link.href = img.src;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    showError(err);
  }
});

document.getElementById("downloadGifBtn").addEventListener("click", (e) => {
  buildStatusGif(e.currentTarget);
});

loadFontsThenRender();
</script>
`;

fs.writeFileSync(outPath, html);
console.log('wrote', outPath, html.length, 'bytes');
