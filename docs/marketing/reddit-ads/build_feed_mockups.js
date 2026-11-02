// Reddit feed mockups: each ad image shown in a promoted free-form post with its real headline and body copy.
// Generic feed styling (no Reddit logo); 2x scale of a ~540pt-wide phone feed. For internal review only.
//   node docs/marketing/reddit-ads/build_feed_mockups.js
const path = require('path');
const fs = require('fs');
const { createRequire } = require('module');
const req = createRequire(path.join(__dirname, '../../brand/assets/facebook/gen_card.js'));
const { createCanvas, loadImage, GlobalFonts } = req('@napi-rs/canvas');

const ROOT = path.join(__dirname, '../../..');
GlobalFonts.registerFromPath(path.join(ROOT, 'repo/assets/fonts/InterTight-SemiBold.ttf'), 'AGSans');
const OUT = path.join(__dirname, 'out', 'feed');
fs.mkdirSync(OUT, { recursive: true });

const AD_A = {
  headline: 'We built Accountability Guild to replace the docs and spreadsheets our monthly group ran on.',
  body: 'Our group meets monthly for one reason: to follow through on our goals and show real progress, not just talk about them. That used to mean a shared doc and someone chasing updates.',
};
const AD_B = {
  headline: "No monthly fee. Missed commitments go to your group's shared pot, not to us.",
  body: 'Accountability Guild is software for partners and groups who meet on a schedule: set commitments, log progress, report at each close. Without that structure, the benefit fades.',
};
const ADS = [
  ['feed_R2_group-chat-vs-report.png', 'out/round4/R2v2_group-chat-vs-report_1080x1350.png', AD_A],
  ['feed_R3_report-in-the-gym.png', 'out/round5/R3v3_report-in-the-gym_1080x1350.png', AD_A],
  ['feed_R1_personal-goals-desk.png', 'out/round5/R1v3_personal-goals-desk_1080x1350.png', AD_A],
  ['feed_R5_money-at-stake.png', 'out/round5/R5v3_money-at-stake-desk_1080x1350.png', AD_B],
];

const F = { ink: '#1A1A1B', soft: '#576F76', faint: '#8A9BA1', line: '#EDEFF1', bg: '#FFFFFF', feedBg: '#F6F7F8', link: '#0A449B' };
const W = 1080, M = 36;

function wrap(ctx, t, maxW) { const out = []; let line = ''; for (const w of t.split(' ')) { const n = line ? line + ' ' + w : w; if (ctx.measureText(n).width > maxW && line) { out.push(line); line = w; } else line = n; } out.push(line); return out; }
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
function ghostPost(ctx, y, h) { // a greyed-out organic post for context
  ctx.fillStyle = F.bg; ctx.fillRect(0, y, W, h);
  ctx.fillStyle = F.line; rr(ctx, M, y + 30, 52, 52, 26); ctx.fill();
  ctx.fillRect(M + 70, y + 40, 260, 16); ctx.fillRect(M, y + 104, W - 2 * M - 120, 26); ctx.fillRect(M, y + 146, W - 2 * M - 300, 26);
}

(async () => {
  const mono = await loadImage(path.join(ROOT, 'docs/brand/assets/monogram/monogram-accent-512.png'));
  for (const [name, imgPath, ad] of ADS) {
    const img = await loadImage(path.join(__dirname, imgPath));
    const probe = createCanvas(10, 10).getContext('2d');
    probe.font = '40px AGSans'; const hl = wrap(probe, ad.headline, W - 2 * M);
    probe.font = '32px AGSans';
    let bl = wrap(probe, ad.body, W - 2 * M);
    // free-form body truncates after two lines with "… more"
    if (bl.length > 2) { let l2 = bl[1]; while (probe.measureText(l2 + '… more').width > W - 2 * M) l2 = l2.split(' ').slice(0, -1).join(' '); bl = [bl[0], l2 + '…']; }
    const imgW = W - 2 * M, imgH = Math.round(imgW * img.height / img.width);
    const top = 210, cardH = 120 + hl.length * 54 + 24 + bl.length * 44 + 30 + imgH + 24 + 92 + 24 + 70;
    const H = top + cardH + 210;
    const c = createCanvas(W, H); const ctx = c.getContext('2d');
    ctx.fillStyle = F.feedBg; ctx.fillRect(0, 0, W, H);
    ghostPost(ctx, 0, top - 14);
    // ad card
    let y = top; ctx.fillStyle = F.bg; ctx.fillRect(0, y, W, cardH);
    ctx.save(); rr(ctx, M, y + 34, 56, 56, 28); ctx.clip(); ctx.drawImage(mono, M, y + 34, 56, 56); ctx.restore();
    ctx.font = '28px AGSans'; ctx.fillStyle = F.ink; ctx.fillText('u/AccountabilityGuild', M + 72, y + 60);
    ctx.fillStyle = F.soft; ctx.fillText('Promoted', M + 72, y + 92);
    ctx.fillStyle = F.soft; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(W - M - 8 - i * 14, y + 62, 4, 0, Math.PI * 2); ctx.fill(); }
    y += 120;
    ctx.font = '40px AGSans'; ctx.fillStyle = F.ink; hl.forEach((l, i) => ctx.fillText(l, M, y + 40 + i * 54)); y += hl.length * 54 + 24;
    ctx.font = '32px AGSans'; bl.forEach((l, i) => { ctx.fillStyle = F.soft; ctx.fillText(l, M, y + 32 + i * 44); if (i === bl.length - 1 && l.endsWith('…')) { ctx.fillStyle = F.link; ctx.fillText(' more', M + ctx.measureText(l).width, y + 32 + i * 44); } });
    y += bl.length * 44 + 30;
    ctx.save(); rr(ctx, M, y, imgW, imgH, 24); ctx.clip(); ctx.drawImage(img, M, y, imgW, imgH); ctx.restore();
    ctx.strokeStyle = F.line; ctx.lineWidth = 2; rr(ctx, M, y, imgW, imgH, 24); ctx.stroke();
    y += imgH + 24;
    // link bar
    ctx.fillStyle = F.feedBg; rr(ctx, M, y, imgW, 92, 18); ctx.fill();
    ctx.font = '28px AGSans'; ctx.fillStyle = F.soft; ctx.fillText('accountabilityguild.com', M + 28, y + 56);
    ctx.fillStyle = F.bg; rr(ctx, W - M - 220, y + 16, 196, 60, 30); ctx.fill(); ctx.strokeStyle = F.ink; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = F.ink; ctx.textAlign = 'center'; ctx.fillText('Learn More', W - M - 122, y + 56); ctx.textAlign = 'left';
    y += 92 + 24;
    // action row: vote, comments, share
    const pillBtn = (x, label, w) => { ctx.fillStyle = F.feedBg; rr(ctx, x, y, w, 60, 30); ctx.fill(); ctx.fillStyle = F.ink; ctx.font = '26px AGSans'; ctx.fillText(label, x + 26, y + 40); };
    pillBtn(M, '▲  Vote  ▼', 200); pillBtn(M + 216, '◯  Comments', 210); pillBtn(M + 442, '↗  Share', 150);
    ghostPost(ctx, top + cardH + 14, H - (top + cardH + 14));
    const f = path.join(OUT, name); fs.writeFileSync(f, c.toBuffer('image/png')); console.log('wrote', path.relative(ROOT, f), W + 'x' + H);
  }
})();
