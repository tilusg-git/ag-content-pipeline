#!/usr/bin/env python3
"""Generate Accountability Guild brand asset pack from ratified Identity Kit Vol. 01.
Text is converted to outlines using the repo's bundled brand fonts."""
import os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

FONTS = "/sessions/festive-elegant-mendel/mnt/AccountabilityGuild/repo/assets/fonts"
OUT = "/sessions/festive-elegant-mendel/mnt/AccountabilityGuild/docs/brand/assets"

# Color tokens
BONE = "#FAFAF7"; PANEL = "#FFFFFF"; INK = "#0F0F0E"; INK_SOFT = "#5C5C58"
LINE = "#E5E2DA"; EMBER = "#D8512A"; EMBER_SOFT = "#F0A98A"

class Face:
    def __init__(self, path):
        self.font = TTFont(path)
        self.upem = self.font["head"].unitsPerEm
        self.cmap = self.font.getBestCmap()
        self.glyphs = self.font.getGlyphSet()
        self.ascent = self.font["hhea"].ascent
        self.descent = self.font["hhea"].descent
    def text_path(self, text, size, x, y, tracking_em=0.0):
        """Return (svg path d, end_x). x,y = baseline origin in SVG coords (y down)."""
        scale = size / self.upem
        pen_out = []
        cx = x
        for ch in text:
            gname = self.cmap.get(ord(ch))
            if gname is None:
                cx += size * 0.25
                continue
            glyph = self.glyphs[gname]
            spen = SVGPathPen(self.glyphs)
            # flip y, scale, translate to (cx, y)
            tpen = TransformPen(spen, (scale, 0, 0, -scale, cx, y))
            glyph.draw(tpen)
            d = spen.getCommands()
            if d:
                pen_out.append(d)
            cx += glyph.width * scale + tracking_em * size
        return " ".join(pen_out), cx
    def text_width(self, text, size, tracking_em=0.0):
        scale = size / self.upem
        w = 0
        n = 0
        for ch in text:
            gname = self.cmap.get(ord(ch))
            w += (self.glyphs[gname].width * scale if gname else size*0.25)
            n += 1
        return w + tracking_em * size * n
    def glyph_bounds(self, ch, size):
        gname = self.cmap[ord(ch)]
        bp = BoundsPen(self.glyphs)
        self.glyphs[gname].draw(bp)
        (x0, y0, x1, y1) = bp.bounds
        s = size / self.upem
        return x0*s, y0*s, x1*s, y1*s, self.glyphs[gname].width*s

news = Face(os.path.join(FONTS, "Newsreader-Italic.ttf"))
inter = Face(os.path.join(FONTS, "InterTight-SemiBold.ttf"))
mono = Face(os.path.join(FONTS, "JetBrainsMono-Bold.ttf"))

os.makedirs(OUT, exist_ok=True)
for sub in ["wordmark", "monogram", "app-icon", "favicon", "social"]:
    os.makedirs(os.path.join(OUT, sub), exist_ok=True)

def svg(w, h, body, bg=None):
    rect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
            f'viewBox="0 0 {w} {h}">{rect}{body}</svg>')

def write(path, content):
    with open(path, "w") as f:
        f.write(content)
    print("wrote", path)

# ---------------- Wordmark A: inline lockup ----------------
def wordmark_group(serif_size, ink_color, x=0, y=0):
    """Returns (body, total_w, total_h_above_baseline). Baseline at y."""
    sans_size = serif_size * 0.42
    track = 0.34
    d1, endx = news.text_path("Accountability", serif_size, x, y)
    gap = serif_size * 0.24
    d2, endx2 = inter.text_path("GUILD", sans_size, endx + gap, y, tracking_em=track)
    body = f'<path d="{d1}" fill="{ink_color}"/><path d="{d2}" fill="{ink_color}"/>'
    return body, endx2 - x - track*sans_size, serif_size

for name, fg, bg in [("wordmark-a-light", INK, None),
                     ("wordmark-a-light-bone", INK, BONE),
                     ("wordmark-a-reversed", BONE, INK)]:
    S = 96
    body, w, _ = wordmark_group(S, fg, 0, 0)
    pad = 48
    W, H = int(w + pad*2), int(S*1.5)
    baseline_y = int(S*1.08)
    body, w, _ = wordmark_group(S, fg, pad, baseline_y)
    write(f"{OUT}/wordmark/{name}.svg", svg(W, H, body, bg))

# ---------------- Monogram ----------------
def monogram_group(size_px, a_color, rule_color, cx, cy, with_rule=True):
    """Italic A centered at (cx, cy-ish) with tally rule below. size_px = A cap size."""
    x0, y0, x1, y1, adv = news.glyph_bounds("A", size_px)
    gw = x1 - x0; gh = y1 - y0
    bx = cx - gw/2 - x0
    baseline = cy + gh/2
    d, _ = news.text_path("A", size_px, bx, baseline)
    body = f'<path d="{d}" fill="{a_color}"/>'
    if with_rule:
        rw = gw * 0.52
        ry = baseline + size_px * 0.13
        rx = cx - rw/2
        rh = max(size_px * 0.045, 2)
        body += f'<rect x="{rx:.1f}" y="{ry:.1f}" width="{rw:.1f}" height="{rh:.1f}" fill="{rule_color}"/>'
    return body

C = 512
for name, a, rule, bg, wr in [
    ("monogram-light", INK, EMBER, BONE, True),
    ("monogram-dark", BONE, EMBER, INK, True),
    ("monogram-accent", BONE, BONE, EMBER, True),
    ("monogram-solo", INK, EMBER, None, False)]:
    body = monogram_group(C*0.56, a, rule, C/2, C/2 - C*0.03)
    if not wr:
        body = monogram_group(C*0.56, a, rule, C/2, C/2, with_rule=False)
    write(f"{OUT}/monogram/{name}.svg", svg(C, C, body, bg))

# ---------------- App icons ----------------
def rounded_icon(size, ground, a_color, rule_color, with_rule, corner_ratio=0.2237):
    r = size * corner_ratio
    body = f'<rect width="{size}" height="{size}" rx="{r:.0f}" fill="{ground}"/>'
    body += monogram_group(size*0.5, a_color, rule_color, size/2, size/2 - (size*0.02 if with_rule else 0), with_rule)
    return svg(size, size, body)

write(f"{OUT}/app-icon/app-icon-accent-1024.svg", rounded_icon(1024, EMBER, BONE, BONE, False))
write(f"{OUT}/app-icon/app-icon-ink-1024.svg", rounded_icon(1024, INK, BONE, EMBER, True))
write(f"{OUT}/app-icon/app-icon-bone-1024.svg", rounded_icon(1024, BONE, INK, EMBER, True))

# ---------------- Favicons (accent ground squares) ----------------
def favicon(size):
    body = f'<rect width="{size}" height="{size}" fill="{EMBER}"/>'
    if size <= 16:
        body += monogram_group(size*0.62, BONE, BONE, size/2, size/2, with_rule=False)
    elif size <= 32:
        # single thin tally under A
        body += monogram_group(size*0.56, BONE, BONE, size/2, size/2 - size*0.04, with_rule=True)
    else:
        body += monogram_group(size*0.52, BONE, BONE, size/2, size/2 - size*0.03, with_rule=True)
    return svg(size, size, body)

for s in [16, 32, 64, 180]:
    write(f"{OUT}/favicon/favicon-{s}.svg", favicon(s))

# ---------------- Social card templates 1200x630 ----------------
def mono_label(text, size, x, y, color, anchor="start", tracking=0.08):
    w = mono.text_width(text, size, tracking)
    if anchor == "end":
        x = x - w
    d, _ = mono.text_path(text, size, x, y, tracking_em=tracking)
    return f'<path d="{d}" fill="{color}"/>', w

def social_card(bg, fg, label, headline_lines, headline_colors, footer, rule_color):
    W, H = 1200, 630
    body = ""
    # wordmark top-left
    S = 40
    wm, _, _ = wordmark_group(S, fg, 84, 118)
    body += wm
    # mono label top-right
    lab, _ = mono_label(label, 19, W-84, 112, INK_SOFT if bg == BONE else (BONE if bg==INK else BONE), anchor="end")
    body += lab
    # headline: large italic serif
    hs = 74
    y = 320
    for line, col in zip(headline_lines, headline_colors):
        x = 84
        for seg_text, seg_col in line:  # line = list of (text, color)
            d, x = news.text_path(seg_text, hs, x, y)
            body += f'<path d="{d}" fill="{seg_col}"/>'
        y += hs * 1.18
    # footer mono bottom-left
    f, _ = mono_label(footer, 19, 84, 566, INK_SOFT if bg == BONE else BONE)
    body += f
    # ember rule bottom-right
    body += f'<rect x="{W-84-56}" y="560" width="56" height="5" fill="{rule_color}"/>'
    return svg(W, H, body, bg)

# 1. site-wide light
card1 = social_card(
    BONE, INK, "VOL. 01",
    [[("Built for groups, on a", INK)], [("cycle. Receipts at the close.", INK)]],
    [INK, INK],
    "ACCOUNTABILITYGUILD.COM", EMBER)
write(f"{OUT}/social/social-sitewide-light.svg", card1)

# 2. invite dark
card2 = social_card(
    INK, BONE, "CYCLE 07 · INVITE",
    [[("Brandon invited you", BONE)], [("to ", BONE), ("Legacy Group.", EMBER)]],
    [BONE, BONE],
    "4 MEMBERS · DAILY CADENCE · $25 AT-STAKE", EMBER)
write(f"{OUT}/social/social-invite-dark.svg", card2)

# 3. report accent
card3 = social_card(
    EMBER, BONE, "CYCLE 07 · CLOSED",
    [[("Brandon kept four of five.", BONE)], [("$25 owed to the room.", BONE)]],
    [BONE, BONE],
    "READ THE REPORT", BONE)
write(f"{OUT}/social/social-report-accent.svg", card3)

# ---------------- PNG exports ----------------
import cairosvg
png_jobs = [
    ("wordmark/wordmark-a-light.svg", "wordmark/wordmark-a-light@2x.png", 2),
    ("wordmark/wordmark-a-reversed.svg", "wordmark/wordmark-a-reversed@2x.png", 2),
    ("monogram/monogram-light.svg", "monogram/monogram-light-512.png", 1),
    ("monogram/monogram-dark.svg", "monogram/monogram-dark-512.png", 1),
    ("monogram/monogram-accent.svg", "monogram/monogram-accent-512.png", 1),
    ("app-icon/app-icon-accent-1024.svg", "app-icon/app-icon-accent-1024.png", 1),
    ("app-icon/app-icon-ink-1024.svg", "app-icon/app-icon-ink-1024.png", 1),
    ("app-icon/app-icon-bone-1024.svg", "app-icon/app-icon-bone-1024.png", 1),
    ("social/social-sitewide-light.svg", "social/social-sitewide-light.png", 1),
    ("social/social-invite-dark.svg", "social/social-invite-dark.png", 1),
    ("social/social-report-accent.svg", "social/social-report-accent.png", 1),
]
for s in [16, 32, 64, 180]:
    png_jobs.append((f"favicon/favicon-{s}.svg", f"favicon/favicon-{s}.png", 1))
for src, dst, scale in png_jobs:
    cairosvg.svg2png(url=os.path.join(OUT, src), write_to=os.path.join(OUT, dst), scale=scale)
    print("png", dst)
print("DONE")
