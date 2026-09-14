#!/usr/bin/env python3
"""Brand reference sheet to attach to an image model (Gemini / Nano Banana) so it
matches AG's exact colors, mark, and type. Renders vector type from repo fonts."""
import os, io
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
import cairosvg

FONTS="/sessions/bold-dazzling-franklin/mnt/AccountabilityGuild/repo/assets/fonts"
OUT="/sessions/bold-dazzling-franklin/mnt/outputs"
BONE="#FAFAF7"; PANEL="#FFFFFF"; INK="#0F0F0E"; INK_SOFT="#5C5C58"; LINE="#E5E2DA"; EMBER="#D8512A"; EMBER_SOFT="#F0A98A"

class Face:
    def __init__(s,p): s.f=TTFont(p); s.upem=s.f["head"].unitsPerEm; s.cmap=s.f.getBestCmap(); s.gs=s.f.getGlyphSet()
    def path(s,t,size,x,y,tr=0.0):
        sc=size/s.upem; out=[]; cx=x
        for ch in t:
            g=s.cmap.get(ord(ch))
            if g is None: cx+=size*0.25; continue
            gl=s.gs[g]; sp=SVGPathPen(s.gs); gl.draw(TransformPen(sp,(sc,0,0,-sc,cx,y)))
            d=sp.getCommands()
            if d: out.append(d)
            cx+=gl.width*sc+tr*size
        return " ".join(out),cx
    def w(s,t,size,tr=0.0):
        sc=size/s.upem; wd=0; n=0
        for ch in t: g=s.cmap.get(ord(ch)); wd+=(s.gs[g].width*sc if g else size*0.25); n+=1
        return wd+tr*size*n
    def bounds(s,ch,size):
        g=s.cmap[ord(ch)]; bp=BoundsPen(s.gs); s.gs[g].draw(bp); x0,y0,x1,y1=bp.bounds
        sc=size/s.upem; return x0*sc,y0*sc,x1*sc,y1*sc,s.gs[g].width*sc
news=Face(f"{FONTS}/Newsreader-Italic.ttf"); inter=Face(f"{FONTS}/InterTight-SemiBold.ttf"); mono=Face(f"{FONTS}/JetBrainsMono-Bold.ttf")

W,H=1200,860; b=[]
def rect(x,y,w,h,fill,rx=0,stroke=None):
    s=f' stroke="{stroke}" stroke-width="1"' if stroke else ""
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"{s}/>'
def T(face,t,size,x,y,fill,tr=0.0): d,_=face.path(t,size,x,y,tr); return f'<path d="{d}" fill="{fill}"/>'

b.append(rect(0,0,W,H,BONE))
# header: wordmark + label
d1,ex=news.path("Accountability",40,72,96); d2,_=inter.path("GUILD",40*0.42,ex+40*0.24,96,0.34)
b.append(f'<path d="{d1}" fill="{INK}"/><path d="{d2}" fill="{INK}"/>')
lab="BRAND REFERENCE — ATTACH WITH YOUR PHOTO"; lw=mono.w(lab,16,0.18)
b.append(T(mono,lab,16,W-72-lw,92,INK_SOFT,0.18))
b.append(rect(72,120,W-144,2,LINE))

# color swatches
chips=[("Bone",BONE),("Panel",PANEL),("Ink",INK),("Ink soft",INK_SOFT),("Line",LINE),("Ember",EMBER),("Ember soft",EMBER_SOFT)]
x=72; cw=140; gap=(W-144-cw*len(chips))/(len(chips)-1); cy=160; ch=120
for name,hexv in chips:
    light = hexv in (BONE,PANEL,LINE,EMBER_SOFT)
    b.append(rect(x,cy,cw,ch,hexv,6,stroke=LINE if light else None))
    b.append(T(mono,hexv.upper(),15,x,cy+ch+26,INK,0.02))
    b.append(T(mono,name.upper(),12,x,cy+ch+46,INK_SOFT,0.06))
    x+=cw+gap

# left: the mark on a dark chip (bone A + ember tally) — how it sits on photos
mx0=72; my0=380; mw=380; mh=300
b.append(rect(mx0,my0,mw,mh,INK,10))
ms=150; x0,y0,x1,y1,adv=news.bounds("A",ms); gw=x1-x0
ax=mx0+mw/2-gw/2-x0; abase=my0+mh/2+(y1-y0)/2 - 6
dA,_=news.path("A",ms,ax,abase); b.append(f'<path d="{dA}" fill="{BONE}"/>')
rw=gw*0.52; b.append(rect(mx0+mw/2-rw/2,abase+ms*0.13,rw,max(ms*0.045,3),EMBER))
b.append(T(mono,"MONOGRAM — BONE A + EMBER TALLY",13,mx0,my0+mh+30,INK_SOFT,0.06))
b.append(T(mono,"(BOTTOM-CENTER ON PHOTO CARDS)",13,mx0,my0+mh+50,INK_SOFT,0.06))

# right: type samples
tx=520; ty=400
b.append(T(mono,"QUOTE TYPE — HIGH-CONTRAST SERIF ITALIC (NEWSREADER)",14,tx,ty,INK_SOFT,0.05))
# sample with one ember word
sx=tx; sy=ty+70; d,sx=news.path("“Follow-through, ",52,sx,sy); b.append(f'<path d="{d}" fill="{INK}"/>')
d,sx=news.path("made ",52,sx,sy); b.append(f'<path d="{d}" fill="{EMBER}"/>')
d,sx=news.path("visible.”",52,sx,sy); b.append(f'<path d="{d}" fill="{INK}"/>')
b.append(T(mono,"ATTRIBUTION / LABELS — UPPERCASE MONOSPACE (JETBRAINS MONO)",14,tx,ty+140,INK_SOFT,0.05))
b.append(T(mono,"— JIM ROHN",22,tx,ty+185,INK,0.16))
b.append(rect(tx,ty+230,W-72-tx,2,LINE))
b.append(T(mono,"ACCENT: EXACTLY ONE WORD IN EMBER",15,tx,ty+265,EMBER,0.05))
b.append(T(mono,"SCRIM: FLAT INK #0F0F0E ~45–65%  ·  NO GRADIENTS",14,tx,ty+292,INK_SOFT,0.04))
b.append(T(mono,"LAYOUT: CENTERED  ·  WIDE MARGINS  ·  3 COLORS ONLY",14,tx,ty+318,INK_SOFT,0.04))

svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{"".join(b)}</svg>'
cairosvg.svg2png(bytestring=svg.encode(),write_to=f"{OUT}/brand-reference-sheet.png",output_width=W,output_height=H)
print("DONE")
