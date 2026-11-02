// Ad A creative, round 3 (Brandon's feedback 2026-10-07). 1080x1350.
//   R1 personal ledger · R2 group text vs. the guild · R3 phone in the gym (comp) · R5 money at stake (comp)
//   node docs/marketing/reddit-ads/build_adA_round3.js
const path = require('path');
const fs = require('fs');
const { createRequire } = require('module');
const req = createRequire(path.join(__dirname, '../../brand/assets/facebook/gen_card.js'));
const { createCanvas, loadImage, GlobalFonts } = req('@napi-rs/canvas');

const ROOT = path.join(__dirname, '../../..');
const FONT_DIR = path.join(ROOT, 'repo/assets/fonts');
GlobalFonts.registerFromPath(path.join(FONT_DIR, 'Newsreader-Italic.ttf'), 'AGSerif');
GlobalFonts.registerFromPath(path.join(FONT_DIR, 'InterTight-SemiBold.ttf'), 'AGSans');
GlobalFonts.registerFromPath(path.join(FONT_DIR, 'JetBrainsMono-Bold.ttf'), 'AGMono');
const OUT = path.join(__dirname, 'out', 'round3');
fs.mkdirSync(OUT, { recursive: true });

const C = { bone: '#FAFAF7', panel: '#FFFFFF', ink: '#0F0F0E', soft: '#5C5C58', line: '#E5E2DA', ember: '#D8512A', emberSoft: '#F0A98A', faint: '#B9B6AE' };
const W = 1080, H = 1350;

function spaced(ctx, t, x, y, sp) { for (const ch of t) { ctx.fillText(ch, x, y); x += ctx.measureText(ch).width + sp; } return x; }
function spacedW(ctx, t, sp) { let w = 0; for (const ch of t) w += ctx.measureText(ch).width + sp; return w - sp; }
function mono(ctx, t, x, y, size, color, sp = size * 0.16, align = 'left') {
  ctx.font = `${size}px AGMono`; ctx.fillStyle = color;
  if (align === 'center') x -= spacedW(ctx, t, sp) / 2; else if (align === 'right') x -= spacedW(ctx, t, sp);
  return spaced(ctx, t, x, y, sp);
}
function text(ctx, font, t, x, y, color, align = 'left') { ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.fillText(t, x, y); ctx.textAlign = 'left'; }
function wrap(ctx, t, maxW) { const out = []; let line = ''; for (const w of t.split(' ')) { const n = line ? line + ' ' + w : w; if (ctx.measureText(n).width > maxW && line) { out.push(line); line = w; } else line = n; } out.push(line); return out; }
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function check(ctx, cx, cy, s, color) { ctx.strokeStyle = color; ctx.lineWidth = Math.max(3, s * 0.12); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(cx - s * 0.28, cy); ctx.lineTo(cx - s * 0.07, cy + s * 0.22); ctx.lineTo(cx + s * 0.3, cy - s * 0.22); ctx.stroke(); }
function save(c, name) { const f = path.join(OUT, name); fs.writeFileSync(f, c.toBuffer('image/png')); console.log('wrote', path.relative(ROOT, f)); }
function placeholderPhoto(ctx, label, lines) {
  ctx.fillStyle = '#D9D6CE'; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#C4C0B6'; ctx.lineWidth = 2;
  for (let i = -H; i < W; i += 46) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + H, H); ctx.stroke(); }
  ctx.fillStyle = 'rgba(250,250,247,0.92)'; rr(ctx, 48, 48, W - 96, 64 + lines.length * 40, 12); ctx.fill();
  mono(ctx, label, 76, 98, 22, C.ember);
  ctx.font = '30px AGSerif'; lines.forEach((l, i) => text(ctx, '30px AGSerif', l, 76, 142 + i * 40, C.ink));
}

(async () => {
  const mark = await loadImage(path.join(ROOT, 'docs/brand/assets/monogram/monogram-accent-512.png'));
  const markLR = (ctx) => ctx.drawImage(mark, W - 56 - 72, H - 56 - 72, 72, 72);

  // ---- R1: personal ledger — one person's goals across cycles, with forfeits ----
  {
    const c = createCanvas(W, H); const ctx = c.getContext('2d');
    ctx.fillStyle = C.bone; ctx.fillRect(0, 0, W, H);
    mono(ctx, 'YOUR GOALS · LAST FOUR CYCLES', 72, 150, 24, C.soft);
    const cols = ['JUL', 'AUG', 'SEP', 'OCT'];
    const tx = 72, tile = 214, tg = 18, th = 104;
    cols.forEach((m, i) => mono(ctx, m, tx + i * (tile + tg) + tile / 2, 238, 24, i === 3 ? C.ember : C.soft, 4, 'center'));
    const rows = [
      ['Lift four times a week.', ['kept', 'kept', '75%', 'now']],
      ['Read 20 pages a night.', ['kept', '50%', 'kept', 'now']],
      ['Phone-free dinner, four nights a week.', ['kept', 'kept', 'kept', 'now']],
    ];
    const drawTile = (x, y, st) => {
      if (st === 'kept') { ctx.fillStyle = C.ink; ctx.fillRect(x, y, tile, th); check(ctx, x + tile / 2, y + th / 2, 64, C.bone); }
      else if (st === 'now') { ctx.fillStyle = C.panel; ctx.fillRect(x, y, tile, th); ctx.strokeStyle = C.ember; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.strokeRect(x + 2, y + 2, tile - 4, th - 4); ctx.setLineDash([]); mono(ctx, 'DAY 7', x + tile / 2, y + th / 2 + 9, 24, C.ember, 3, 'center'); }
      else { ctx.fillStyle = C.emberSoft; ctx.fillRect(x, y, tile, th); mono(ctx, st, x + tile / 2, y + th / 2 + 12, 34, C.ink, 2, 'center'); }
    };
    rows.forEach(([goal, sts], r) => {
      const y = 300 + r * 222;
      text(ctx, '44px AGSerif', goal, tx, y + 44, C.ink);
      sts.forEach((st, i) => drawTile(tx + i * (tile + tg), y + 72, st));
    });
    // forfeit row
    const fy = 300 + 3 * 222 + 20;
    ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tx, fy); ctx.lineTo(W - 72, fy); ctx.stroke();
    mono(ctx, 'FORFEIT', tx, fy + 56, 24, C.soft);
    ['$0', '$10', '$5', '$20'].forEach((v, i) => {
      const cx = tx + i * (tile + tg) + tile / 2;
      text(ctx, '64px AGSerif', v, cx, fy + 150, i === 3 ? C.ember : C.ink, 'center');
      mono(ctx, i === 3 ? 'AT STAKE' : 'TO KITTY', cx, fy + 196, 20, i === 3 ? C.ember : C.soft, 3, 'center');
    });
    markLR(ctx);
    save(c, 'R1_personal-ledger_1080x1350.png');
  }

  // ---- R2: the group text (problem) vs. the guild report (answer) ----
  {
    const c = createCanvas(W, H); const ctx = c.getContext('2d');
    ctx.fillStyle = C.bone; ctx.fillRect(0, 0, W, H);
    const pw = 492, py = 170, ph = 1030, lx = 32, rx = W - 32 - pw;
    mono(ctx, 'THE GROUP TEXT', lx + 8, 130, 24, C.soft);
    mono(ctx, 'THE GUILD', rx + 8, 130, 24, C.ember);
    // left: a plain texting thread (generic, not AG's UI)
    ctx.fillStyle = C.panel; rr(ctx, lx, py, pw, ph, 36); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
    text(ctx, '30px AGSans', 'Goals crew', lx + pw / 2, py + 62, C.ink, 'center');
    text(ctx, '22px AGSans', '5 people', lx + pw / 2, py + 96, C.soft, 'center');
    ctx.strokeStyle = C.line; ctx.beginPath(); ctx.moveTo(lx, py + 124); ctx.lineTo(lx + pw, py + 124); ctx.stroke();
    const sent = (y, stamp, msg) => {
      text(ctx, '20px AGSans', stamp, lx + pw / 2, y, C.faint, 'center');
      ctx.font = '32px AGSans'; const lines = wrap(ctx, msg, 330);
      const bw = Math.max(...lines.map(l => ctx.measureText(l).width)) + 52, bh = lines.length * 42 + 34;
      const bx = lx + pw - 28 - bw;
      ctx.fillStyle = C.ink; rr(ctx, bx, y + 22, bw, bh, 30); ctx.fill();
      lines.forEach((l, i) => text(ctx, '32px AGSans', l, bx + 26, y + 22 + 54 + i * 42, C.bone));
      text(ctx, '20px AGSans', 'Read', lx + pw - 30, y + 22 + bh + 32, C.faint, 'right');
      return y + 22 + bh;
    };
    const recv = (y, msg) => {
      ctx.font = '32px AGSans'; const bw = ctx.measureText(msg).width + 52;
      ctx.fillStyle = C.line; rr(ctx, lx + 28, y, bw, 76, 30); ctx.fill();
      text(ctx, '32px AGSans', msg, lx + 54, y + 50, C.ink);
      return y + 76;
    };
    let y = sent(py + 190, 'Sep 3, 9:14 PM', "How's everyone doing on their goals?");
    y = recv(y + 70, 'pretty good');
    y = sent(y + 120, 'Oct 1, 10:02 PM', 'anyone?');
    // right: the cycle report everyone files
    ctx.fillStyle = C.panel; ctx.fillRect(rx, py, pw, ph); ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.strokeRect(rx + 1, py + 1, pw - 2, ph - 2);
    mono(ctx, 'OCTOBER REPORT', rx + 40, py + 66, 22, C.soft);
    text(ctx, '76px AGSerif', '5 of 5', rx + 40, py + 160, C.ink);
    text(ctx, '40px AGSerif', 'filed.', rx + 40, py + 214, C.ember);
    const members = [['M', 1.0], ['P', 0.88], ['D', 0.75], ['E', 1.0], ['S', 0.63]];
    members.forEach(([ini, p], i) => {
      const yy = py + 290 + i * 140, r = 32;
      ctx.fillStyle = C.bone; ctx.beginPath(); ctx.arc(rx + 40 + r, yy + r, r, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
      text(ctx, '36px AGSerif', ini, rx + 40 + r, yy + r + 12, C.ink, 'center');
      const bx = rx + 128, bw = pw - 128 - 40;
      mono(ctx, `FILED · ${Math.round(p * 100)}% KEPT`, bx, yy + 20, 18, C.soft, 2);
      ctx.fillStyle = C.line; ctx.fillRect(bx, yy + 38, bw, 16);
      ctx.fillStyle = C.ink; ctx.fillRect(bx, yy + 38, Math.round(bw * p), 16);
    });
    markLR(ctx);
    save(c, 'R2_group-text-vs-guild_1080x1350.png');
  }

  // ---- R3 comp: phone face-up in the gym, "Exercise 5 days a week" checked off ----
  {
    const c = createCanvas(W, H); const ctx = c.getContext('2d');
    placeholderPhoto(ctx, 'PHOTO TO SHOOT · GYM', ['Phone lying face-up on a bench or the floor mat,', 'real gym around it (dumbbells, chalk, a towel).', 'Overhead or low angle, natural or gym light.']);
    const px = 300, py = 330, pw = 480, ph = 900;
    ctx.fillStyle = C.ink; rr(ctx, px, py, pw, ph, 64); ctx.fill();
    ctx.fillStyle = C.bone; rr(ctx, px + 18, py + 18, pw - 36, ph - 36, 48); ctx.fill();
    const sx = px + 58;
    mono(ctx, 'THIS WEEK · FITNESS', sx, py + 150, 20, C.soft, 3);
    ['Exercise 5 days', 'a week.'].forEach((l, i) => text(ctx, '52px AGSerif', l, sx, py + 222 + i * 62, C.ink));
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'], s = 44, g = 10;
    days.forEach((d, i) => {
      const x = sx + i * (s + g), yy = py + 420;
      mono(ctx, d, x + s / 2, yy - 14, 18, C.soft, 0, 'center');
      if (i < 5) { ctx.fillStyle = i === 4 ? C.ember : C.ink; ctx.fillRect(x, yy, s, s); check(ctx, x + s / 2, yy + s / 2, 30, C.bone); }
      else { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(x + 1, yy + 1, s - 2, s - 2); }
    });
    text(ctx, '84px AGSerif', '5 of 5', sx, py + 600, C.ink);
    mono(ctx, 'KEPT', sx, py + 650, 26, C.ember, 6);
    markLR(ctx);
    save(c, 'R3_phone-in-the-gym_COMP_1080x1350.png');
  }

  // ---- R5 comp: money at stake — cash photo with the app's goal card ----
  {
    const c = createCanvas(W, H); const ctx = c.getContext('2d');
    placeholderPhoto(ctx, 'PHOTO TO SHOOT · $20', ['A real $20 bill on a desk or counter,', 'folded or paper-clipped, with a phone beside it.', 'Daylight, phone camera, slightly off-square.']);
    const cx = 96, cy = 640, cw = W - 192, ch = 560;
    ctx.fillStyle = C.panel; ctx.fillRect(cx, cy, cw, ch); ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.strokeRect(cx + 1, cy + 1, cw - 2, ch - 2);
    mono(ctx, 'OCTOBER · CYCLE 4', cx + 48, cy + 70, 22, C.soft);
    text(ctx, '54px AGSerif', 'Exercise 5 days a week.', cx + 48, cy + 150, C.ink);
    const s = 52, g = 12;
    for (let i = 0; i < 7; i++) {
      const x = cx + 48 + i * (s + g), yy = cy + 196;
      if (i < 4) { ctx.fillStyle = C.ink; ctx.fillRect(x, yy, s, s); check(ctx, x + s / 2, yy + s / 2, 34, C.bone); }
      else { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(x + 1, yy + 1, s - 2, s - 2); }
    }
    ctx.strokeStyle = C.line; ctx.beginPath(); ctx.moveTo(cx + 48, cy + 300); ctx.lineTo(cx + cw - 48, cy + 300); ctx.stroke();
    mono(ctx, 'AT STAKE', cx + 48, cy + 360, 24, C.ember, 4);
    text(ctx, '120px AGSerif', '$20', cx + 48, cy + 490, C.ink);
    mono(ctx, 'TO THE GROUP KITTY IF MISSED', cx + cw - 48, cy + 476, 20, C.soft, 3, 'right');
    markLR(ctx);
    save(c, 'R5_money-at-stake_COMP_1080x1350.png');
  }
})();
