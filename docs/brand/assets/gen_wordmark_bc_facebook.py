#!/usr/bin/env python3
"""Generate wordmark B (Stacked Masthead) + C (Mono Flag) vectors, and a Facebook asset kit.
Reuses helpers from gen_brand_assets.py."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_brand_assets import (Face, svg, write, FONTS, OUT, BONE, PANEL, INK,
    INK_SOFT, LINE, EMBER, EMBER_SOFT, news, inter, mono, wordmark_group)
import cairosvg

def mono_label(text, size, x, y, color, anchor="start", tracking=0.18):
    w = mono.text_width(text, size, tracking)
    if anchor == "end":
        x = x - w
    d, _ = mono.text_path(text, size, x, y, tracking_em=tracking)
    return f'<path d="{d}" fill="{color}"/>', w

for sub in ["wordmark", "facebook"]:
    os.makedirs(os.path.join(OUT, sub), exist_ok=True)

# ---------- Wordmark B · Stacked Masthead ----------
# "Accountability" (serif italic) over a rule over "GUILD · VOL. 01" (mono tracked)
def wordmark_b(fg, bg, label="VOL. 01"):
    S = 96
    serif_w = news.text_width("Accountability", S)
    pad = 56
    W = int(serif_w + pad*2)
    body = ""
    baseline1 = int(S*1.05)
    d1, _ = news.text_path("Accountability", S, pad, baseline1)
    body += f'<path d="{d1}" fill="{fg}"/>'
    rule_y = baseline1 + S*0.20
    body += f'<rect x="{pad}" y="{rule_y:.0f}" width="{serif_w:.0f}" height="2" fill="{fg}"/>'
    ms = S*0.19
    line2 = f"GUILD · {label}"
    mw = mono.text_width(line2, ms, 0.30)
    d2, _ = mono.text_path(line2, ms, pad, rule_y + S*0.32, tracking_em=0.30)
    body += f'<path d="{d2}" fill="{fg}"/>'
    H = int(rule_y + S*0.45)
    return svg(W, H, body, bg)

write(f"{OUT}/wordmark/wordmark-b-stacked-light.svg", wordmark_b(INK, None))
write(f"{OUT}/wordmark/wordmark-b-stacked-reversed.svg", wordmark_b(BONE, INK))

# ---------- Wordmark C · Mono Flag ----------
# vertical ember rule | "VOL. 01" (mono) over "Accountability Guild" (serif italic phrase)
def wordmark_c(fg, bg, label="VOL. 01"):
    S = 60  # serif size for the phrase
    phrase_w = news.text_width("Accountability Guild", S)
    pad = 48
    rule_x = pad
    text_x = pad + 22
    W = int(text_x + phrase_w + pad)
    body = ""
    ms = 15
    top = pad
    dlab, _ = mono.text_path(label, ms, text_x, top + ms, tracking_em=0.22)
    body += f'<path d="{dlab}" fill="{INK_SOFT if bg!=INK else BONE}"/>'
    baseline = top + ms + S*0.95
    dph, _ = news.text_path("Accountability Guild", S, text_x, baseline)
    body += f'<path d="{dph}" fill="{fg}"/>'
    rule_h = (baseline) - top + S*0.12
    body += f'<rect x="{rule_x}" y="{top-2:.0f}" width="4" height="{rule_h:.0f}" fill="{EMBER}"/>'
    H = int(top + rule_h + pad*0.4)
    return svg(W, H, body, bg)

write(f"{OUT}/wordmark/wordmark-c-flag-light.svg", wordmark_c(INK, None))
write(f"{OUT}/wordmark/wordmark-c-flag-reversed.svg", wordmark_c(BONE, INK))

# ---------- Monogram helper (reuse from assets) ----------
def monogram_group(size_px, a_color, rule_color, cx, cy, with_rule=True):
    x0, y0, x1, y1, adv = news.glyph_bounds("A", size_px)
    gw = x1 - x0; gh = y1 - y0
    bx = cx - gw/2 - x0
    baseline = cy + gh/2
    d, _ = news.text_path("A", size_px, bx, baseline)
    b = f'<path d="{d}" fill="{a_color}"/>'
    if with_rule:
        rw = gw*0.52; rx = cx-rw/2; ry = baseline + size_px*0.16; rh = size_px*0.045
        b += f'<rect x="{rx:.1f}" y="{ry:.1f}" width="{rw:.1f}" height="{rh:.1f}" fill="{rule_color}"/>'
    return b

# ---------- Facebook: profile picture (accent monogram, square; FB crops to circle) ----------
def fb_profile(size):
    body = f'<rect width="{size}" height="{size}" fill="{EMBER}"/>'
    # keep A well inside the circle safe area (~80% diameter)
    body += monogram_group(size*0.46, BONE, BONE, size/2, size/2 - size*0.02, with_rule=True)
    return svg(size, size, body)

write(f"{OUT}/facebook/fb-profile-320.svg", fb_profile(320))
write(f"{OUT}/facebook/fb-profile-1080.svg", fb_profile(1080))

# ---------- Facebook: cover photo 1640x624, safe area ~1093x420 centered ----------
def fb_cover(bg, fg):
    W, H = 1640, 624
    body = ""
    # center the inline lockup within the desktop/mobile safe area
    S = 96
    wm_w = news.text_width("Accountability", S) + S*0.24 + inter.text_width("GUILD", S*0.42, 0.34)
    cx = W/2 - wm_w/2
    baseline = H/2 + S*0.05
    wm, _, _ = wordmark_group(S, fg, cx, baseline)
    body += wm
    # mono tagline below
    tag = "FOLLOW-THROUGH, MADE VISIBLE"
    ts = 20
    tw = mono.text_width(tag, ts, 0.24)
    dt, _ = mono.text_path(tag, ts, W/2 - tw/2, baseline + S*0.6, tracking_em=0.24)
    body += f'<path d="{dt}" fill="{INK_SOFT if bg==BONE else BONE}"/>'
    # short ember rule centered under tagline
    body += f'<rect x="{W/2-28:.0f}" y="{baseline + S*0.85:.0f}" width="56" height="4" fill="{EMBER}"/>'
    return svg(W, H, body, bg)

write(f"{OUT}/facebook/fb-cover-light.svg", fb_cover(BONE, INK))
write(f"{OUT}/facebook/fb-cover-dark.svg", fb_cover(INK, BONE))

# ---------- Facebook: shared post 1200x630 (reuses social card language, generic) ----------
def fb_post(bg, fg, label, headline_lines, footer, rule_color):
    W, H = 1200, 630
    body = ""
    S = 40
    wm, _, _ = wordmark_group(S, fg, 84, 118)
    body += wm
    lab, _ = mono_label(label, 19, W-84, 112, BONE if bg!=BONE else INK_SOFT, anchor="end")
    body += lab
    hs = 72; y = 320
    for line in headline_lines:
        x = 84
        for seg_text, seg_col in line:
            d, x = news.text_path(seg_text, hs, x, y)
            body += f'<path d="{d}" fill="{seg_col}"/>'
        y += hs*1.18
    f, _ = mono_label(footer, 19, 84, 566, INK_SOFT if bg==BONE else BONE)
    body += f
    body += f'<rect x="{W-84-56}" y="560" width="56" height="5" fill="{rule_color}"/>'
    return svg(W, H, body, bg)

# a blank-ish template + one worked example
write(f"{OUT}/facebook/fb-post-template-light.svg", fb_post(
    BONE, INK, "FIELD NOTES",
    [[("Your headline goes here,", INK)], [("in ", INK), ("italic serif", EMBER), (".", INK)]],
    "ACCOUNTABILITYGUILD.COM", EMBER))
write(f"{OUT}/facebook/fb-post-example-dark.svg", fb_post(
    INK, BONE, "CYCLE 07 · CLOSED",
    [[("Eight groups closed", BONE)], [("their cycle this week.", BONE)]],
    "ACCOUNTABILITYGUILD.COM", EMBER))

# ---------- PNG exports ----------
jobs = [
    ("wordmark/wordmark-b-stacked-light.svg", "wordmark/wordmark-b-stacked-light@2x.png", 2),
    ("wordmark/wordmark-b-stacked-reversed.svg", "wordmark/wordmark-b-stacked-reversed@2x.png", 2),
    ("wordmark/wordmark-c-flag-light.svg", "wordmark/wordmark-c-flag-light@2x.png", 2),
    ("wordmark/wordmark-c-flag-reversed.svg", "wordmark/wordmark-c-flag-reversed@2x.png", 2),
    ("facebook/fb-profile-320.svg", "facebook/fb-profile-320.png", 1),
    ("facebook/fb-profile-1080.svg", "facebook/fb-profile-1080.png", 1),
    ("facebook/fb-cover-light.svg", "facebook/fb-cover-light.png", 1),
    ("facebook/fb-cover-dark.svg", "facebook/fb-cover-dark.png", 1),
    ("facebook/fb-post-template-light.svg", "facebook/fb-post-template-light.png", 1),
    ("facebook/fb-post-example-dark.svg", "facebook/fb-post-example-dark.png", 1),
]
for src, dst, scale in jobs:
    cairosvg.svg2png(url=os.path.join(OUT, src), write_to=os.path.join(OUT, dst), scale=scale)
    print("png", dst)
print("DONE")
