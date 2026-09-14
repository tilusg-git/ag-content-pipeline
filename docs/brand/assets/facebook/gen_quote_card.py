#!/usr/bin/env python3
"""Accountability Guild — Facebook quote card, 1080x1080, light (bone) ground.
Reuses the ratified brand text-outlining approach (fontTools -> SVG paths) so
the card is font-independent and matches the identity kit exactly.
Quote: James Clear, Atomic Habits (flagship AG quote, verified in quote-bank.md)."""
import os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

FONTS = "/sessions/bold-dazzling-franklin/mnt/AccountabilityGuild/repo/assets/fonts"
OUT   = "/sessions/bold-dazzling-franklin/mnt/outputs"

# Seven brand tokens
BONE="#FAFAF7"; PANEL="#FFFFFF"; INK="#0F0F0E"; INK_SOFT="#5C5C58"
LINE="#E5E2DA"; EMBER="#D8512A"; EMBER_SOFT="#F0A98A"

class Face:
    def __init__(self, path):
        self.font=TTFont(path); self.upem=self.font["head"].unitsPerEm
        self.cmap=self.font.getBestCmap(); self.glyphs=self.font.getGlyphSet()
    def text_path(self, text, size, x, y, tracking_em=0.0):
        scale=size/self.upem; out=[]; cx=x
        for ch in text:
            g=self.cmap.get(ord(ch))
            if g is None:
                cx+=size*0.25; continue
            gl=self.glyphs[g]; sp=SVGPathPen(self.glyphs)
            gl.draw(TransformPen(sp,(scale,0,0,-scale,cx,y)))
            d=sp.getCommands()
            if d: out.append(d)
            cx+=gl.width*scale+tracking_em*size
        return " ".join(out), cx
    def text_width(self, text, size, tracking_em=0.0):
        scale=size/self.upem; w=0; n=0
        for ch in text:
            g=self.cmap.get(ord(ch))
            w+=(self.glyphs[g].width*scale if g else size*0.25); n+=1
        return w+tracking_em*size*n
    def glyph_bounds(self, ch, size):
        g=self.cmap[ord(ch)]; bp=BoundsPen(self.glyphs); self.glyphs[g].draw(bp)
        x0,y0,x1,y1=bp.bounds; s=size/self.upem
        return x0*s,y0*s,x1*s,y1*s,self.glyphs[g].width*s

news=Face(os.path.join(FONTS,"Newsreader-Italic.ttf"))
inter=Face(os.path.join(FONTS,"InterTight-SemiBold.ttf"))
mono=Face(os.path.join(FONTS,"JetBrainsMono-Bold.ttf"))

def svg(w,h,body,bg=None):
    rect=f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
            f'viewBox="0 0 {w} {h}">{rect}{body}</svg>')

def wordmark_group(serif_size, ink_color, x, y):
    sans=serif_size*0.42; track=0.34
    d1,endx=news.text_path("Accountability",serif_size,x,y)
    gap=serif_size*0.24
    d2,endx2=inter.text_path("GUILD",sans,endx+gap,y,tracking_em=track)
    body=f'<path d="{d1}" fill="{ink_color}"/><path d="{d2}" fill="{ink_color}"/>'
    return body, endx2-x-track*sans

def mono_label(text,size,x,y,color,anchor="start",tracking=0.18):
    w=mono.text_width(text,size,tracking)
    if anchor=="end": x=x-w
    d,_=mono.text_path(text,size,x,y,tracking_em=tracking)
    return f'<path d="{d}" fill="{color}"/>', w

# ---- layout ----
W=H=1080; M=96
body=""

# wordmark top-left (A - Inline Lockup)
wm,_=wordmark_group(44, INK, M, 132); body+=wm
# mono kicker top-right
lab,_=mono_label("FIELD NOTES",20, W-M, 126, INK_SOFT, anchor="end", tracking=0.22); body+=lab

# quote, greedy-wrapped, auto-fit; ember accent on "systems."
quote='“You do not rise to the level of your goals. You fall to the level of your systems.”'
words=quote.split(" ")
maxw=W-2*M
def wrap(size):
    lines=[]; cur=[]
    for wd in words:
        test=(" ".join(cur+[wd]))
        if news.text_width(test,size)<=maxw or not cur:
            cur.append(wd)
        else:
            lines.append(cur); cur=[wd]
    if cur: lines.append(cur)
    return lines
hs=74
while True:
    lines=wrap(hs)
    if len(lines)<=5 or hs<=54: break
    hs-=2
lh=hs*1.24
block_h=lh*(len(lines)-1)
top_region, bot_region = 300, 812
first_baseline=(top_region+bot_region)/2 - block_h/2 + hs*0.34
y=first_baseline
for ln in lines:
    x=M
    for wd in ln:
        col=EMBER if wd.lstrip('“').startswith("systems") else INK
        d,x=news.text_path(wd+" ",hs,x,y)
        body+=f'<path d="{d}" fill="{col}"/>'
    y+=lh

# attribution, mono ink-soft tracked uppercase
attr="— JAMES CLEAR, ATOMIC HABITS"
a,_=mono_label(attr,22, M, y-lh+hs*0.34+70, INK_SOFT, tracking=0.16); body+=a

# footer bottom-left + ember signature rule bottom-right
f,_=mono_label("ACCOUNTABILITYGUILD.COM",20, M, H-84, INK_SOFT, tracking=0.20); body+=f
body+=f'<rect x="{W-M-56}" y="{H-104}" width="56" height="5" fill="{EMBER}"/>'

out_svg=svg(W,H,body,BONE)
with open(os.path.join(OUT,"fb-quote-systems-light.svg"),"w") as fh: fh.write(out_svg)

import cairosvg
cairosvg.svg2png(url=os.path.join(OUT,"fb-quote-systems-light.svg"),
                 write_to=os.path.join(OUT,"fb-quote-systems-light.png"),
                 output_width=1080, output_height=1080)
print("lines",len(lines),"hs",hs)
print("DONE")
