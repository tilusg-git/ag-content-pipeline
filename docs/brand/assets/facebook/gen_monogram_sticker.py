#!/usr/bin/env python3
"""Transparent AG monogram stickers (italic-A + ember tally) to drop onto a card
after cropping off the AI badge. Bone version for dark cards, ink for light."""
import os, io
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
import cairosvg
FONTS="/sessions/bold-dazzling-franklin/mnt/AccountabilityGuild/repo/assets/fonts"
OUT="/sessions/bold-dazzling-franklin/mnt/outputs"
BONE="#FAFAF7"; INK="#0F0F0E"; EMBER="#D8512A"
f=TTFont(f"{FONTS}/Newsreader-Italic.ttf"); upem=f["head"].unitsPerEm; cmap=f.getBestCmap(); gs=f.getGlyphSet()
def apath(size,x,y):
    g=cmap[ord("A")]; sp=SVGPathPen(gs); gs[g].draw(TransformPen(sp,(size/upem,0,0,-size/upem,x,y))); return sp.getCommands()
def abounds(size):
    g=cmap[ord("A")]; bp=BoundsPen(gs); gs[g].draw(bp); x0,y0,x1,y1=bp.bounds; s=size/upem; return x0*s,y0*s,x1*s,y1*s

def sticker(a_color,name):
    cap=180; pad=60
    x0,y0,x1,y1=abounds(cap); gw=x1-x0; gh=y1-y0
    W=int(gw+pad*2); tally_h=max(cap*0.045,3); tally_gap=cap*0.13
    H=int(gh+pad*2+tally_gap+tally_h)
    ax=pad-x0; baseline=pad+gh
    d=apath(cap,ax,baseline)
    rw=gw*0.52; rx=W/2-rw/2; ry=baseline+tally_gap
    body=f'<path d="{d}" fill="{a_color}"/><rect x="{rx:.1f}" y="{ry:.1f}" width="{rw:.1f}" height="{tally_h:.1f}" fill="{EMBER}"/>'
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{body}</svg>'
    cairosvg.svg2png(bytestring=svg.encode(),write_to=f"{OUT}/{name}",output_width=W*2,output_height=H*2)
    print("wrote",name,f"{W}x{H}")
sticker(BONE,"monogram-overlay-bone.png")
sticker(INK,"monogram-overlay-ink.png")
print("DONE")
