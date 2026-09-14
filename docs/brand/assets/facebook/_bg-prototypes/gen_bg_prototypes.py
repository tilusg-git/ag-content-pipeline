#!/usr/bin/env python3
"""Prototype: quote cards with IMAGE backgrounds, 1080x1080.
Demonstrates on-brand treatment options for a founder decision (amends brand §14).
Pipeline: Pillow composites/treats the background -> cairosvg rasterizes the crisp
vector text layer (repo fonts) -> Pillow alpha-composites text over background.
Demo quote: Jim Rohn (mockups only; not published, so no retirement needed)."""
import os, io
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from PIL import Image, ImageOps
import cairosvg

FONTS="/sessions/bold-dazzling-franklin/mnt/AccountabilityGuild/repo/assets/fonts"
SRC  ="/sessions/bold-dazzling-franklin/mnt/AccountabilityGuild/repo/public/homepage-redesign/hero.png"
OUT  ="/sessions/bold-dazzling-franklin/mnt/outputs"

BONE="#FAFAF7"; PANEL="#FFFFFF"; INK="#0F0F0E"; INK_SOFT="#5C5C58"
LINE="#E5E2DA"; EMBER="#D8512A"; EMBER_SOFT="#F0A98A"
def hx(h): h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))

class Face:
    def __init__(s,p): s.f=TTFont(p); s.upem=s.f["head"].unitsPerEm; s.cmap=s.f.getBestCmap(); s.gs=s.f.getGlyphSet()
    def path(s,t,size,x,y,tr=0.0):
        sc=size/s.upem; out=[]; cx=x
        for ch in t:
            g=s.cmap.get(ord(ch))
            if g is None: cx+=size*0.25; continue
            gl=s.gs[g]; sp=SVGPathPen(s.gs); gl.draw(TransformPen(sp,(sc,0,0,-sc,cx,y)))
            d=sp.getCommands();  out.append(d) if d else None
            cx+=gl.width*sc+tr*size
        return " ".join(out),cx
    def w(s,t,size,tr=0.0):
        sc=size/s.upem; wd=0; n=0
        for ch in t: g=s.cmap.get(ord(ch)); wd+=(s.gs[g].width*sc if g else size*0.25); n+=1
        return wd+tr*size*n
news=Face(f"{FONTS}/Newsreader-Italic.ttf"); inter=Face(f"{FONTS}/InterTight-SemiBold.ttf"); mono=Face(f"{FONTS}/JetBrainsMono-Bold.ttf")

W=H=1080; M=96
QUOTE='“We must all suffer from one of two pains: the pain of discipline or the pain of regret.”'
ATTR="— JIM ROHN"

def wrap(size,maxw):
    words=QUOTE.split(" "); lines=[]; cur=[]
    for wd in words:
        if news.w(" ".join(cur+[wd]),size)<=maxw or not cur: cur.append(wd)
        else: lines.append(cur); cur=[wd]
    if cur: lines.append(cur)
    return lines

def text_layer(text_col, second_col, wm_col, region, foot_col, accent=EMBER, attr_y=None):
    body=""
    d1,ex=news.path("Accountability",44,M,132); gap=44*0.24
    d2,_=inter.path("GUILD",44*0.42,ex+gap,132,tr=0.34)
    body+=f'<path d="{d1}" fill="{wm_col}"/><path d="{d2}" fill="{wm_col}"/>'
    kt="FIELD NOTES"; kw=mono.w(kt,20,0.22); dk,_=mono.path(kt,20,W-M-kw,126,tr=0.22)
    body+=f'<path d="{dk}" fill="{second_col}"/>'
    maxw=W-2*M; hs=74
    while True:
        lines=wrap(hs,maxw)
        if len(lines)<=5 or hs<=52: break
        hs-=2
    lh=hs*1.24; bh=lh*(len(lines)-1)
    y=(region[0]+region[1])/2 - bh/2 + hs*0.34
    for ln in lines:
        x=M
        for wd in ln:
            col=accent if wd.lstrip('“').startswith("regret") else text_col
            d,x=news.path(wd+" ",hs,x,y); body+=f'<path d="{d}" fill="{col}"/>'
        y+=lh
    ay=attr_y if attr_y else (y-lh+hs*0.34+70)
    da,_=mono.path(ATTR,22,M,ay,tr=0.16); body+=f'<path d="{da}" fill="{second_col}"/>'
    df,_=mono.path("ACCOUNTABILITYGUILD.COM",20,M,H-84,tr=0.20); body+=f'<path d="{df}" fill="{foot_col}"/>'
    body+=f'<rect x="{W-M-56}" y="{H-104}" width="56" height="5" fill="{accent}"/>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{body}</svg>')

def raster_text(svg):
    png=cairosvg.svg2png(bytestring=svg.encode(),output_width=W,output_height=H)
    return Image.open(io.BytesIO(png)).convert("RGBA")

def cover(img,w,h):
    ir=img.width/img.height; tr=w/h
    if ir>tr: nh=h; nw=int(h*ir)
    else: nw=w; nh=int(w/ir)
    img=img.resize((nw,nh),Image.LANCZOS)
    return img.crop(((nw-w)//2,(nh-h)//2,(nw-w)//2+w,(nh-h)//2+h))

def scrim(img,color,alpha):
    ov=Image.new("RGBA",img.size,hx(color)+(int(255*alpha),))
    return Image.alpha_composite(img.convert("RGBA"),ov)

base=Image.open(SRC).convert("RGB")

def save(img,name):
    img.convert("RGB").save(f"{OUT}/{name}"); print("wrote",name)

# ---- A: token duotone (ink<->bone) + flat ink scrim ----
bg=cover(base,W,H)
duo=ImageOps.colorize(ImageOps.grayscale(bg),black=INK,white=BONE).convert("RGBA")
duo=scrim(duo,INK,0.42)
txt=raster_text(text_layer(BONE, "#FAFAF7B0"[:7], BONE,(300,812), "#FAFAF7"))
save(Image.alpha_composite(duo,txt),"bg-A-duotone-inkbone.png")

# ---- B: full-color photo + flat ink scrim ----
bg=cover(base,W,H).convert("RGBA"); bg=scrim(bg,INK,0.55)
txt=raster_text(text_layer(BONE, BONE, BONE,(300,812), BONE))
save(Image.alpha_composite(bg,txt),"bg-B-fullcolor-scrim.png")

# ---- C: image band (bottom) + quote on bone panel ----
panel=Image.new("RGBA",(W,H),hx(BONE)+(255,))
band_y=748; band=cover(base,W,H-band_y)
panel.paste(band,(0,band_y))
# hairline at band top + keep footer over band in bone
from PIL import ImageDraw
d=ImageDraw.Draw(panel); d.rectangle([0,band_y,W,band_y+2],fill=hx(LINE))
txt=raster_text(text_layer(INK, INK_SOFT, INK,(238,556), BONE, attr_y=650))
save(Image.alpha_composite(panel,txt),"bg-C-imageband.png")

# ---- D (bonus): duotone ink<->ember tint + scrim ----
bg=cover(base,W,H)
duoE=ImageOps.colorize(ImageOps.grayscale(bg),black=INK,white=EMBER_SOFT).convert("RGBA")
duoE=scrim(duoE,INK,0.40)
txt=raster_text(text_layer(BONE, BONE, BONE,(300,812), BONE))
save(Image.alpha_composite(duoE,txt),"bg-D-duotone-ember.png")

# ---- E: procedural bone-paper texture (abstract-texture source), ink text, no scrim ----
noise=Image.effect_noise((W,H),16)
paper=ImageOps.colorize(noise,black="#ECE8DE",white=BONE).convert("RGBA")
txt=raster_text(text_layer(INK, INK_SOFT, INK,(300,812), INK_SOFT))
save(Image.alpha_composite(paper,txt),"bg-E-papertexture.png")

print("DONE")
