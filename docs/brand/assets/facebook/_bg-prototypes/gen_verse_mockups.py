#!/usr/bin/env python3
"""Verse-image direction mockups: YouVersion-style (image-forward, centered, minimal
chrome) in AG branding. Same treatment across 3 calm backgrounds to show cohesion.
Calm backgrounds are generated procedurally (stand-ins for real photos)."""
import os, io, random, math
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from PIL import Image, ImageOps, ImageDraw, ImageFilter
import cairosvg

FONTS="/sessions/bold-dazzling-franklin/mnt/AccountabilityGuild/repo/assets/fonts"
OUT="/sessions/bold-dazzling-franklin/mnt/outputs"
BONE="#FAFAF7"; INK="#0F0F0E"; INK_SOFT="#5C5C58"; EMBER="#D8512A"
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
W=H=1080

def calm_bg(base, blobs, seed):
    random.seed(seed)
    img=Image.new("RGB",(W,H),base)
    d=ImageDraw.Draw(img,"RGBA")
    for _ in range(blobs):
        cx=random.randint(-100,W+100); cy=random.randint(-100,H+100); r=random.randint(220,520)
        dv=random.randint(-28,34); col=tuple(max(0,min(255,c+dv)) for c in base)+(90,)
        d.ellipse([cx-r,cy-r,cx+r,cy+r],fill=col)
    img=img.filter(ImageFilter.GaussianBlur(120))
    # warm bokeh specks
    d2=ImageDraw.Draw(img,"RGBA")
    for _ in range(9):
        cx=random.randint(0,W); cy=random.randint(0,H); r=random.randint(18,54)
        d2.ellipse([cx-r,cy-r,cx+r,cy+r],fill=(230,180,120,30))
    img=img.filter(ImageFilter.GaussianBlur(14))
    noise=Image.effect_noise((W,H),12).convert("L")
    img=Image.composite(img,ImageOps.colorize(noise,black="#000000",white="#ffffff").convert("RGB"),
                        Image.new("L",(W,H),244))
    return img

def scrim(img,alpha):
    ov=Image.new("RGBA",img.size,hx(INK)+(int(255*alpha),))
    return Image.alpha_composite(img.convert("RGBA"),ov)

def centered(quote,author,accent,region):
    """Centered verse composition, minimal chrome + small monogram."""
    body=""; M=int(W*0.11); maxw=W-2*M
    q=f'“{quote}”'; words=q.split(" "); hs=int(W*0.066)
    def wrap(size):
        lines=[]; cur=[]
        for wd in words:
            if news.w(" ".join(cur+[wd]),size)<=maxw or not cur: cur.append(wd)
            else: lines.append(cur); cur=[wd]
        if cur: lines.append(cur)
        return lines
    while True:
        lines=wrap(hs)
        if len(lines)<=5 or hs<=int(W*0.05): break
        hs-=2
    lh=hs*1.26; bh=lh*(len(lines)-1)
    y=(region[0]+region[1])/2 - bh/2 + hs*0.34
    acc=accent.lower().strip() if accent else None
    for ln in lines:
        lw=news.w(" ".join(ln),hs); x=(W-lw)/2
        for wd in ln:
            clean=wd.strip('“”.,;:!?').lower()
            col=EMBER if (acc and clean==acc) else BONE
            d,x=news.path(wd,hs,x,y); x+=news.w(" ",hs); body+=f'<path d="{d}" fill="{col}"/>'
        y+=lh
    # attribution centered
    at=f"— {author.upper()}"; aw=mono.w(at,20,0.20)
    da,_=mono.path(at,20,(W-aw)/2,y-lh+hs*0.34+58,tr=0.20); body+=f'<path d="{da}" fill="#E9E7E1"/>'
    # small italic-A monogram + ember tally, centered near bottom
    ms=int(W*0.058); x0,y0,x1,y1,adv=news.bounds("A",ms); gw=x1-x0
    mx=W/2 - gw/2 - x0; mbase=H-int(H*0.072)
    dA,_=news.path("A",ms,mx,mbase); body+=f'<path d="{dA}" fill="{BONE}"/>'
    rw=gw*0.52; body+=f'<rect x="{W/2-rw/2:.1f}" y="{mbase+ms*0.13:.1f}" width="{rw:.1f}" height="{max(ms*0.045,2):.1f}" fill="{EMBER}"/>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{body}</svg>'

def raster(svg):
    png=cairosvg.svg2png(bytestring=svg.encode(),output_width=W,output_height=H)
    return Image.open(io.BytesIO(png)).convert("RGBA")

cards=[
 ("slate",   (44,52,66),  7, 11, 0.50,
   "Discipline equals freedom.","Jocko Willink","freedom"),
 ("stone",   (108,96,82), 6, 23, 0.52,
   "Accountability breeds response-ability.","Stephen R. Covey","response-ability"),
 ("forest",  (34,52,48),  7, 31, 0.50,
   "We must all suffer from one of two pains: the pain of discipline or the pain of regret.",
   "Jim Rohn","regret"),
]
for name,base,blobs,seed,sc,quote,author,accent in cards:
    bg=scrim(calm_bg(base,blobs,seed),sc)
    out=Image.alpha_composite(bg,raster(centered(quote,author,accent,(int(H*0.28),int(H*0.76))))).convert("RGB")
    p=f"{OUT}/verse-{name}.png"; out.save(p); print("wrote",p)
print("DONE")
