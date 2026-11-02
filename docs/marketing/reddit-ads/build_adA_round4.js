// Ad A creative, round 4 (Brandon's feedback 2026-10-07): app screens inside phones, full wordmark lower-right.
// Photo backgrounds load from reddit-ads/bg/<name>.(jpg|png) when present (overhead flat-lays, phone composited
// straight-on); otherwise a labeled placeholder is drawn.
//   node docs/marketing/reddit-ads/build_adA_round4.js
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
const OUT = path.join(__dirname, 'out', 'round4');
const BG = path.join(__dirname, 'bg');
fs.mkdirSync(OUT, { recursive: true });

const C = {
  bone: '#FAFAF7', panel: '#FFFFFF', ink: '#0F0F0E', soft: '#5C5C58', line: '#E5E2DA', ember: '#D8512A', emberSoft: '#F0A98A', faint: '#B9B6AE',
  success: '#1F7A4D', successSoft: '#DCEAE0', warning: '#B07A1A', warningSoft: '#F1E5C8', // app functional palette (components.css)
};
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
function check(ctx, cx, cy, s, color) { ctx.strokeStyle = color; ctx.lineWidth = Math.max(2.5, s * 0.12); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(cx - s * 0.28, cy); ctx.lineTo(cx - s * 0.07, cy + s * 0.22); ctx.lineTo(cx + s * 0.3, cy - s * 0.22); ctx.stroke(); }
function pill(ctx, x, y, label, fg, bg, size = 15) {
  ctx.font = `${size}px AGMono`; const w = spacedW(ctx, label, 2) + 44, h = size + 18;
  ctx.fillStyle = bg; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(x + 15, y + h / 2, 4, 0, Math.PI * 2); ctx.fill();
  mono(ctx, label, x + 28, y + h / 2 + size * 0.36, size, fg, 2); return w;
}
function save(c, name) { const f = path.join(OUT, name); fs.writeFileSync(f, c.toBuffer('image/png')); console.log('wrote', path.relative(ROOT, f)); }

async function background(ctx, name, label, lines) {
  for (const ext of ['jpg', 'jpeg', 'png']) {
    const f = path.join(BG, `${name}.${ext}`);
    if (fs.existsSync(f)) { // cover-fit
      const img = await loadImage(f); const s = Math.max(W / img.width, H / img.height);
      ctx.drawImage(img, (W - img.width * s) / 2, (H - img.height * s) / 2, img.width * s, img.height * s); return;
    }
  }
  ctx.fillStyle = '#D9D6CE'; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#C9C5BB'; ctx.lineWidth = 2;
  for (let i = -H; i < W; i += 46) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + H, H); ctx.stroke(); }
  mono(ctx, label, 48, 70, 20, C.ember);
  lines.forEach((l, i) => text(ctx, '26px AGSerif', l, 48, 108 + i * 34, C.ink));
}
// Phone drawn straight-on (for overhead flat-lay backgrounds). drawScreen gets (ctx, w, h) in screen-local coords.
function phone(ctx, x, y, w, h, drawScreen, shadow = true, bezel = C.ink) {
  if (shadow) { ctx.save(); ctx.shadowColor = 'rgba(15,15,14,0.35)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 24; ctx.fillStyle = C.ink; rr(ctx, x, y, w, h, w * 0.13); ctx.fill(); ctx.restore(); }
  ctx.fillStyle = bezel; rr(ctx, x, y, w, h, w * 0.13); ctx.fill();
  const b = w * 0.035, sx = x + b, sy = y + b, sw = w - 2 * b, sh = h - 2 * b;
  ctx.save(); rr(ctx, sx, sy, sw, sh, w * 0.1); ctx.clip();
  ctx.fillStyle = C.bone; ctx.fillRect(sx, sy, sw, sh);
  ctx.translate(sx, sy); drawScreen(ctx, sw, sh); ctx.restore();
  ctx.fillStyle = bezel; rr(ctx, x + w / 2 - w * 0.14, y + b + 14, w * 0.28, 30, 15); ctx.fill(); // camera island
}
function appBar(ctx, w, wordmark) { // the app's top bar: wordmark + menu
  const ww = w * 0.46; ctx.drawImage(wordmark, 26, 74, ww, ww * (288 / 1700));
  ctx.fillStyle = C.ink; for (let i = 0; i < 3; i++) ctx.fillRect(w - 62, 84 + i * 10, 30, 4);
  ctx.fillStyle = C.line; ctx.fillRect(0, 128, w, 2);
}
function wordmarkPlate(ctx, wordmark, onPhoto = true, h = H) {
  const ww = 300, wh = ww * (288 / 1700), px = W - ww - 56, py = h - wh - 52;
  if (onPhoto) { ctx.fillStyle = C.bone; rr(ctx, px - 26, py - 20, ww + 52, wh + 40, 10); ctx.fill(); }
  ctx.drawImage(wordmark, px, py, ww, wh);
}

(async () => {
  const wordmark = await loadImage(path.join(ROOT, 'docs/brand/assets/wordmark/wordmark-a-light@2x.png'));
  const PW = 560, PH = 1130, PX = (W - PW) / 2, PY = 60;

  // ---- R1: personal goals, this week of the cycle — phone on a desk ----
  {
    const c = createCanvas(W, H); const ctx = c.getContext('2d');
    await background(ctx, 'r1-desk', 'BACKGROUND · DESK (Nano Banana prompt 1)', ['Overhead desk flat-lay, empty center for the phone.']);
    phone(ctx, PX, PY, PW, PH, (s, w) => {
      appBar(s, w, wordmark);
      mono(s, 'COLLEGE FRIENDS GROUP · WEEK 3 OF 4', 30, 196, 15, C.soft, 2);
      text(s, '40px AGSerif', 'Your goals', 30, 250, C.ink);
      const tw = 100, tg = 9, tx = 30, th = 54;
      ['WK 1', 'WK 2', 'WK 3', 'WK 4'].forEach((l, i) => mono(s, l, tx + i * (tw + tg) + tw / 2, 310, 14, i === 2 ? C.ember : C.soft, 2, 'center'));
      const rows = [['Exercise 5 days a week.', ['kept', 'kept', 'now:3 OF 5', 'next']], ['Read 20 pages a night.', ['kept', '75%', 'now:4 OF 7', 'next']], ['Phone-free dinner, four nights.', ['kept', 'kept', 'now:2 OF 4', 'next']]];
      rows.forEach(([g, sts], r) => {
        const y = 350 + r * 150;
        text(s, '27px AGSerif', g, tx, y + 26, C.ink);
        sts.forEach((st, i) => {
          const x = tx + i * (tw + tg), yy = y + 46;
          if (st === 'kept') { s.fillStyle = C.ink; s.fillRect(x, yy, tw, th); check(s, x + tw / 2, yy + th / 2, 34, C.bone); }
          else if (st.startsWith('now')) { s.fillStyle = C.panel; s.fillRect(x, yy, tw, th); s.strokeStyle = C.ember; s.lineWidth = 2.5; s.setLineDash([7, 6]); s.strokeRect(x + 1, yy + 1, tw - 2, th - 2); s.setLineDash([]); mono(s, st.slice(4), x + tw / 2, yy + th / 2 + 6, 15, C.ember, 1, 'center'); }
          else if (st === 'next') { s.strokeStyle = C.line; s.lineWidth = 2; s.setLineDash([5, 6]); s.strokeRect(x + 1, yy + 1, tw - 2, th - 2); s.setLineDash([]); }
          else { s.fillStyle = C.emberSoft; s.fillRect(x, yy, tw, th); mono(s, st, x + tw / 2, yy + th / 2 + 7, 19, C.ink, 1, 'center'); }
        });
      });
      s.fillStyle = C.ink; s.fillRect(30, 820, w - 60, 2);
      mono(s, 'AT STAKE', 30, 872, 15, C.ember, 3);
      text(s, '84px AGSerif', '$20', 30, 960, C.ink);
      mono(s, 'CLOSES OCT 31', w - 30, 872, 15, C.soft, 2, 'right');
      mono(s, 'TO THE KITTY IF MISSED', w - 30, 950, 13, C.soft, 2, 'right');
    });
    wordmarkPlate(ctx, wordmark);
    save(c, 'R1v2_personal-goals-desk_1080x1350.png');
  }

  // the app's cycle report, close to the real Reports screen (shared by the R2 ad sizes and its thumbnail)
  const reportScreen = (s, w) => {
    appBar(s, w, wordmark);
    mono(s, 'THURSDAY NIGHT GROUP · CYCLE 4', 22, 180, 12, C.soft, 1.5);
    text(s, '44px AGSerif', 'October', 22, 236, C.ink);
    const stats = [['FILED', '5/5'], ['KEPT', '2'], ['NO REPORT', '0']];
    stats.forEach(([k, v], i) => { const x = 22 + i * 130; mono(s, k, x, 284, 11, C.soft, 1.5); text(s, '30px AGSerif', v, x, 322, C.ink); });
    s.fillStyle = C.line; s.fillRect(22, 346, w - 44, 2);
    [['Marcus', '100% KEPT', 'kept'], ['Priya', '88% KEPT', 'kept'], ['Dave', '75% KEPT', 'part'], ['Elena', '100% KEPT', 'kept'], ['Sam', '63% KEPT', 'part']].forEach(([n, l, st], i) => {
      const y = 372 + i * 94;
      s.fillStyle = C.panel; s.fillRect(22, y, w - 44, 80); s.strokeStyle = C.line; s.lineWidth = 1.5; s.strokeRect(22, y, w - 44, 80);
      if (i === 0) { s.fillStyle = C.ember; s.fillRect(22, y, 4, 80); }
      text(s, '26px AGSerif', n, 40, y + 34, C.ink);
      pill(s, 40, y + 44, 'SUBMITTED · ' + l, C.success, C.successSoft, 11);
    });
  };

  // ---- R2: problem left (group text, ink) vs. solution right (the app, bone), Aha-style headlines ----
  // Rendered at 1080x1350 and as a 1080x1080 backup; the square scales the phones down (k) to clear the wordmark.
  for (const { h, k, name } of [
    { h: H, k: 1, name: 'R2v2_group-chat-vs-report_1080x1350.png' },
    { h: 1080, k: 0.77, name: 'R2v2_group-chat-vs-report_1080x1080.png' },
  ]) {
    const c = createCanvas(W, h); const ctx = c.getContext('2d');
    ctx.fillStyle = C.ink; ctx.fillRect(0, 0, W / 2, h); ctx.fillStyle = C.bone; ctx.fillRect(W / 2, 0, W / 2, h);
    text(ctx, '62px AGSerif', 'A goal spreadsheet', 48, 122, C.bone); text(ctx, '62px AGSerif', 'goes stale.', 48, 192, C.bone);
    text(ctx, '62px AGSerif', 'The cycle report', W / 2 + 48, 122, C.ink); text(ctx, '62px AGSerif', "doesn't.", W / 2 + 48, 192, C.ember);
    const pw = 430, ph = 900, py = k === 1 ? 270 : 250;
    // phones are drawn at full size, scaled by k around their own top-center
    const scaled = (cx, draw) => { ctx.save(); ctx.translate(cx, py); ctx.scale(k, k); ctx.translate(-pw / 2, 0); draw(); ctx.restore(); };
    // left: a generic texting app (deliberately not AG's UI)
    scaled(W / 4, () => phone(ctx, 0, 0, pw, ph, (s, w) => {
      s.fillStyle = C.panel; s.fillRect(0, 0, w, 2000);
      text(s, '24px AGSans', 'Goals crew', w / 2, 100, C.ink, 'center'); text(s, '17px AGSans', '5 people', w / 2, 126, C.soft, 'center');
      s.fillStyle = C.line; s.fillRect(0, 148, w, 2);
      const sent = (y, stamp, msg) => {
        text(s, '15px AGSans', stamp, w / 2, y, C.faint, 'center');
        s.font = '24px AGSans'; const lines = wrap(s, msg, 250);
        const bw = Math.max(...lines.map(l => s.measureText(l).width)) + 40, bh = lines.length * 32 + 26, bx = w - 20 - bw;
        s.fillStyle = C.ink; rr(s, bx, y + 16, bw, bh, 22); s.fill();
        lines.forEach((l, i) => text(s, '24px AGSans', l, bx + 20, y + 16 + 42 + i * 32, C.bone));
        text(s, '15px AGSans', 'Read', w - 22, y + 16 + bh + 24, C.faint, 'right'); return y + 16 + bh;
      };
      const recv = (y, msg) => { s.font = '24px AGSans'; const bw = s.measureText(msg).width + 40; s.fillStyle = C.line; rr(s, 20, y, bw, 58, 22); s.fill(); text(s, '24px AGSans', msg, 40, y + 38, C.ink); return y + 58; };
      let y = sent(210, 'Sep 3, 9:14 PM', 'Can everyone update the goals sheet before Thursday?');
      y = recv(y + 56, 'will do');
      sent(y + 150, 'Oct 1, 10:02 PM', 'Did anyone update the sheet?');
    }, false, C.soft));
    // right: the app's cycle report
    scaled(W * 3 / 4, () => phone(ctx, 0, 0, pw, ph, reportScreen, false));
    wordmarkPlate(ctx, wordmark, false, h);
    save(c, name);
  }

  // R2 thumbnail, 400x300 (Reddit conversation placement): the cycle report phone alone, cropped at the bottom edge
  {
    // drawn at 4x and halved twice, so the small wordmark and type downsample cleanly
    const TW = 400, TH = 300, k = 0.6, pw = 430, ss = 4;
    let c = createCanvas(TW * ss, TH * ss); const ctx = c.getContext('2d');
    ctx.scale(ss, ss); ctx.fillStyle = C.bone; ctx.fillRect(0, 0, TW, TH);
    ctx.translate((TW - pw * k) / 2, 22); ctx.scale(k, k); phone(ctx, 0, 0, pw, 900, reportScreen, false);
    for (let f = ss / 2; f >= 1; f /= 2) {
      const d = createCanvas(TW * f, TH * f), dx = d.getContext('2d');
      dx.imageSmoothingEnabled = true; dx.imageSmoothingQuality = 'high'; dx.drawImage(c, 0, 0, TW * f, TH * f); c = d;
    }
    save(c, 'R2v2_group-chat-vs-report_thumb_400x300.png');
  }

  // ---- R3: the Reports view for one goal — phone face-up in the gym ----
  {
    const c = createCanvas(W, H); const ctx = c.getContext('2d');
    await background(ctx, 'r3-gym', 'BACKGROUND · GYM (Nano Banana prompt 2)', ['Overhead gym floor flat-lay, empty center for the phone.']);
    phone(ctx, PX, PY, PW, PH, (s, w) => {
      appBar(s, w, wordmark);
      mono(s, "40+ MEN'S GROUP · OCTOBER REPORT", 30, 196, 15, C.soft, 2);
      text(s, '44px AGSerif', 'Marcus', 30, 256, C.ink);
      pill(s, 30, 276, 'SUBMITTED · 100% KEPT', C.success, C.successSoft, 13);
      const stats = [['KEPT', '2/2'], ['FORFEIT', '$0'], ['NO REPORT', '0']];
      stats.forEach(([k, v], i) => { const x = 30 + i * 165; mono(s, k, x, 368, 13, i === 1 ? C.ember : C.soft, 2); text(s, '40px AGSerif', v, x, 416, i === 1 ? C.ember : C.ink); });
      s.fillStyle = C.line; s.fillRect(30, 446, w - 60, 2);
      mono(s, 'FITNESS', 30, 496, 14, C.soft, 2);
      text(s, '36px AGSerif', 'Exercise 5 days a week.', 30, 546, C.ink);
      pill(s, 30, 568, 'KEPT · 100%', C.success, C.successSoft, 13);
      const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'], ds = 56, dg = 9;
      days.forEach((d, i) => {
        const x = 30 + i * (ds + dg), yy = 660;
        mono(s, d, x + ds / 2, yy - 12, 13, C.soft, 0, 'center');
        if (i < 5) { s.fillStyle = C.ink; s.fillRect(x, yy, ds, ds); check(s, x + ds / 2, yy + ds / 2, 34, C.bone); }
        else { s.strokeStyle = C.line; s.lineWidth = 2; s.strokeRect(x + 1, yy + 1, ds - 2, ds - 2); }
      });
      mono(s, 'WHAT HAPPENED', 30, 780, 13, C.soft, 2);
      ['Five mornings, every week.', 'Lifted before work.'].forEach((l, i) => text(s, '28px AGSerif', l, 30, 826 + i * 38, C.ink));
      s.fillStyle = C.line; s.fillRect(30, 906, w - 60, 2);
      mono(s, 'PERSONAL', 30, 950, 14, C.soft, 2);
      text(s, '30px AGSerif', 'Read 20 pages a night.', 30, 994, C.ink);
      pill(s, 30, 1012, 'KEPT · 100%', C.success, C.successSoft, 13);
    });
    wordmarkPlate(ctx, wordmark);
    save(c, 'R3v2_report-in-the-gym_1080x1350.png');
  }

  // ---- R5: money at stake — the app's cycle view on a phone next to cash ----
  {
    const c = createCanvas(W, H); const ctx = c.getContext('2d');
    await background(ctx, 'r5-money', 'BACKGROUND · DESK + $20 (Nano Banana prompt 3, or a real photo)', ['Overhead desk with a $20 bill to one side, empty center for the phone.']);
    phone(ctx, PX, PY, PW, PH, (s, w) => {
      appBar(s, w, wordmark);
      mono(s, 'EAST COAST STUDY GROUP · CYCLE 4', 30, 196, 14, C.soft, 2);
      text(s, '50px AGSerif', 'The October cycle', 30, 262, C.ink);
      text(s, '50px AGSerif', 'closes in 9 days.', 30, 322, C.ember);
      const stats = [['AT STAKE', '$20'], ['DAYS LEFT', '9'], ['CYCLE', '04']];
      stats.forEach(([k, v], i) => { const x = 30 + i * 165; mono(s, k, x, 398, 13, i === 0 ? C.ember : C.soft, 2); text(s, i === 0 ? '64px AGSerif' : '44px AGSerif', v, x, 464, i === 0 ? C.ember : C.ink); });
      s.fillStyle = C.line; s.fillRect(30, 500, w - 60, 2);
      mono(s, 'YOUR GOAL · PROFESSIONAL', 30, 556, 14, C.soft, 2);
      text(s, '36px AGSerif', 'Study 10 hours a week.', 30, 606, C.ink);
      const bw = w - 60; s.fillStyle = C.line; s.fillRect(30, 640, bw, 16); s.fillStyle = C.ink; s.fillRect(30, 640, bw * (29 / 44), 16);
      mono(s, '29 OF 44 HOURS', 30, 694, 14, C.ink, 2); mono(s, '15 TO GO', w - 30, 694, 14, C.ember, 2, 'right');
      s.fillStyle = C.panel; s.fillRect(30, 740, w - 60, 140); s.strokeStyle = C.line; s.lineWidth = 2; s.strokeRect(30, 740, w - 60, 140);
      mono(s, 'IF YOU MISS', 54, 790, 13, C.soft, 2);
      ['$20 goes to the group kitty.', 'Not to us.'].forEach((l, i) => text(s, '27px AGSerif', l, 54, 830 + i * 36, C.ink));
    });
    wordmarkPlate(ctx, wordmark);
    save(c, 'R5v2_money-at-stake-desk_1080x1350.png');
  }
})();
