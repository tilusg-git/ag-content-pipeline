#!/usr/bin/env python3
"""Annotated guide: how to place the AG mark higher and crop off Gemini's corner badge
while keeping the card square. Renders at 1024 (typical Gemini output size)."""
import os, io, random
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from PIL import Image, ImageOps, ImageDraw, ImageFilter
import cairosvg
FONTS="/sessions/bold-dazzling-franklin/mnt/AccountabilityGuild/repo/assets/fonts"
OUT="/sessions/bold-dazzling-franklin/mnt/outputs"
BONE="#FAFAF7"; INK="#0F0F0E"; EMBER="#D8512A"
def hx(h): h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))
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
news=Face(f"{FONTS}/Newsreader-Italic.ttf"); mono=Face(f"{FONTS}/JetBrainsMono-Bold.ttf")
S=1024
def calm(seed,base):
    random.seed(seed); img=Image.new("RGB",(S,S),base); d=ImageDraw.Draw(img,"RGBA")
    for _ in range(7):
        cx=random.randint(-100,S+100); cy=random.randint(-100,S+100); r=random.randint(220,520)
        dv=random.randint(-26,30); d.ellipse([cx-r,cy-r,cx+r,cy+r],fill=tuple(max(0,min(255,c+dv)) for c in base)+(90,))
    return img.filter(ImageFilter.GaussianBlur(120))
def scrim(img,a):
    return Image.alpha_composite(img.convert("RGBA"),Image.new("RGBA",img.size,hx(INK)+(int(255*a),)))
bg=scrim(calm(11,(44,52,66)),0.5)

# text layer (SVG)
body=""; M=int(S*0.11); maxw=S-2*M
quote='“If there is no struggle, there is no progress.”'; accent="progress"
words=quote.split(" "); hs=int(S*0.07)
def wrap(sz):
    lines=[]; cur=[]
    for wd in words:
        if news.w(" ".join(cur+[wd]),sz)<=maxw or not cur: cur.append(wd)
        else: lines.append(cur); cur=[wd]
    if cur: lines.append(cur)
    return lines
lines=wrap(hs); lh=hs*1.26; bh=lh*(len(lines)-1); y=S*0.46-bh/2+hs*0.34
for ln in lines:
    lw=news.w(" ".join(ln),hs); x=(S-lw)/2
    for wd in ln:
        col=EMBER if wd.strip('“”.,').lower()==accent else BONE
        d,x=news.path(wd,hs,x,y); x+=news.w(" ",hs); body+=f'<path d="{d}" fill="{col}"/>'
    y+=lh
at="— FREDERICK DOUGLASS"; aw=mono.w(at,19,0.2)
da,_=mono.path(at,19,(S-aw)/2,y-lh+hs*0.34+52,0.2); body+=f'<path d="{da}" fill="#E9E7E1"/>'
# monogram at 78% down (22% up from bottom) — clears the disposable bottom band
ms=int(S*0.058); x0,y0,x1,y1,adv=news.bounds("A",ms); gw=x1-x0
mbase=int(S*0.78); mx=S/2-gw/2-x0
dA,_=news.path("A",ms,mx,mbase); body+=f'<path d="{dA}" fill="{BONE}"/>'
rw=gw*0.52; body+=f'<rect x="{S/2-rw/2:.1f}" y="{mbase+ms*0.13:.1f}" width="{rw:.1f}" height="{max(ms*0.045,2):.1f}" fill="{EMBER}"/>'
svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}" viewBox="0 0 {S} {S}">{body}</svg>'
txt=Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode(),output_width=S,output_height=S))).convert("RGBA")
card=Image.alpha_composite(bg,txt)

# annotations: fake Gemini badge bottom-right, disposable band shade, crop line
d=ImageDraw.Draw(card,"RGBA")
cropline=int(S*0.88)
d.rectangle([0,cropline,S,S],fill=(216,81,42,40))               # disposable band tint
for xx in range(0,S,26): d.line([xx,cropline,xx+14,cropline],fill=(255,255,255,220),width=3)  # dashed crop line
# fake badge
bx,by=S-150,S-70; d.rounded_rectangle([bx,by,bx+120,by+40],8,fill=(255,255,255,70))
d.ellipse([bx+12,by+12,bx+30,by+30],fill=(255,255,255,180))
gg,_=mono.path("GEMINI",13,bx+38,by+26,0.1)
d.text  # noop
lab=Image.open(io.BytesIO(cairosvg.svg2png(bytestring=f'<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}"><path d="{gg}" fill="#FFFFFF"/></svg>'.encode(),output_width=S,output_height=S))).convert("RGBA")
card=Image.alpha_composite(card,lab)
# crop-line caption
cap,_=mono.path("CROP LINE — TRIM EVERYTHING BELOW (removes badge)",15,int(S*0.11),cropline-16,0.03)
capimg=Image.open(io.BytesIO(cairosvg.svg2png(bytestring=f'<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}"><path d="{cap}" fill="#FFFFFF"/></svg>'.encode(),output_width=S,output_height=S))).convert("RGBA")
card=Image.alpha_composite(card,capimg)
card.convert("RGB").save(f"{OUT}/crop-guide.png")

# also output the actual cropped, re-squared result (from the CLEAN card, no annotations)
clean=Image.alpha_composite(bg,txt).convert("RGB")
c=int(S*0.88); cropped=clean.crop((0,0,S,c))                        # drop bottom 12%
side=(S-c)//2; squared=cropped.crop((side,0,side+c,c))              # center to square
squared.save(f"{OUT}/crop-result.png")
print("DONE",squared.size)
