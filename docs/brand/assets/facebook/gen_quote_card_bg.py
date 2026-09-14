#!/usr/bin/env python3
"""Accountability Guild — image-backed social quote card generator (unified layout).
Renders EVERYTHING in exact brand fonts over a supplied background image:
  wordmark top-left · FIELD NOTES top-right · centered quote (one ember word) ·
  centered attribution · A monogram bottom-center. Flat ink scrim, seven tokens only.
Spec: docs/brand/image-backgrounds-spec.md. Requires: fonttools, cairosvg, pillow.

  python3 gen_quote_card_bg.py --image photo.jpg \
    --quote "If there is no struggle, there is no progress." \
    --author "Frederick Douglass" --accent progress --out out.png
"""
import os, io, argparse
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from PIL import Image, ImageOps
import cairosvg

BONE="#FAFAF7"; INK="#0F0F0E"; INK_SOFT="#5C5C58"; LINE="#E5E2DA"; EMBER="#D8512A"; EMBER_SOFT="#F0A98A"
BONE_SOFT="#E9E7E1"
def hx(h): h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))

def find_fonts():
    here=os.path.dirname(os.path.abspath(__file__))
    for c in [os.environ.get("AG_FONTS",""),
              os.path.normpath(os.path.join(here,"../../../../repo/assets/fonts")),
              "/sessions/bold-dazzling-franklin/mnt/AccountabilityGuild/repo/assets/fonts"]:
        if c and os.path.exists(os.path.join(c,"Newsreader-Italic.ttf")): return c
    raise SystemExit("Brand fonts not found. Set AG_FONTS to repo/assets/fonts.")
FONTS=find_fonts()

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

def cover(img,w,h):
    ir=img.width/img.height; tr=w/h
    if ir>tr: nh=h; nw=int(h*ir)
    else: nw=w; nh=int(w/ir)
    img=img.resize((nw,nh),Image.LANCZOS)
    return img.crop(((nw-w)//2,(nh-h)//2,(nw-w)//2+w,(nh-h)//2+h))
def scrim(img,alpha):
    return Image.alpha_composite(img.convert("RGBA"),Image.new("RGBA",img.size,hx(INK)+(int(255*alpha),)))

def text_layer(W,H,quote,author,accent,kicker,fg,second,accent_col=EMBER):
    Mc=int(W*0.062); body=""
    # wordmark top-left
    ws=W*0.038; d1,ex=news.path("Accountability",ws,Mc,H*0.09); d2,_=inter.path("GUILD",ws*0.42,ex+ws*0.24,H*0.09,0.34)
    body+=f'<path d="{d1}" fill="{fg}"/><path d="{d2}" fill="{fg}"/>'
    # kicker top-right
    ks=W*0.0175; kw=mono.w(kicker,ks,0.22); dk,_=mono.path(kicker,ks,W-Mc-kw,H*0.086,0.22); body+=f'<path d="{dk}" fill="{second}"/>'
    # centered quote
    Mq=int(W*0.11); maxw=W-2*Mq; q=f'“{quote}”'; words=q.split(" "); hs=int(W*0.066)
    def wrap(sz):
        L=[];cur=[]
        for wd in words:
            if news.w(" ".join(cur+[wd]),sz)<=maxw or not cur: cur.append(wd)
            else: L.append(cur); cur=[wd]
        if cur: L.append(cur)
        return L
    while True:
        lines=wrap(hs)
        if len(lines)<=5 or hs<=int(W*0.05): break
        hs-=2
    lh=hs*1.26; bh=lh*(len(lines)-1); y=H*0.5-bh/2+hs*0.34
    acc=accent.lower().strip() if accent else None
    for ln in lines:
        lw=news.w(" ".join(ln),hs); x=(W-lw)/2
        for wd in ln:
            col=accent_col if (acc and wd.strip('“”.,;:!?').lower()==acc) else fg
            d,x=news.path(wd,hs,x,y); x+=news.w(" ",hs); body+=f'<path d="{d}" fill="{col}"/>'
        y+=lh
    # centered attribution
    at=f"— {author.upper()}"; a_s=W*0.0185; aw=mono.w(at,a_s,0.18)
    da,_=mono.path(at,a_s,(W-aw)/2,y-lh+hs*0.34+H*0.052,0.18); body+=f'<path d="{da}" fill="{second}"/>'
    # A monogram bottom-center (+ ember tally)
    ms=W*0.056; x0,y0,x1,y1,adv=news.bounds("A",ms); gw=x1-x0
    mbase=H*0.905; mx=W/2-gw/2-x0
    dA,_=news.path("A",ms,mx,mbase); body+=f'<path d="{dA}" fill="{fg}"/>'
    rw=gw*0.52; body+=f'<rect x="{W/2-rw/2:.1f}" y="{mbase+ms*0.13:.1f}" width="{rw:.1f}" height="{max(ms*0.045,2):.1f}" fill="{accent_col}"/>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{body}</svg>'

def build(a):
    W=H=a.size
    if not a.image and a.treatment!="paper": raise SystemExit("--image required (except --treatment paper)")
    if a.image: base=Image.open(a.image).convert("RGB")
    if a.treatment=="b":
        bg=scrim(cover(base,W,H),a.scrim); fg,second=BONE,BONE_SOFT
    elif a.treatment=="duotone":
        bg=scrim(ImageOps.colorize(ImageOps.grayscale(cover(base,W,H)),black=INK,white=BONE),min(a.scrim,0.45)); fg,second=BONE,BONE_SOFT
    elif a.treatment=="ember":
        bg=scrim(ImageOps.colorize(ImageOps.grayscale(cover(base,W,H)),black=INK,white=EMBER_SOFT),min(a.scrim,0.40)); fg,second=BONE,BONE_SOFT
    elif a.treatment=="paper":
        bg=ImageOps.colorize(Image.effect_noise((W,H),16),black="#ECE8DE",white=BONE).convert("RGBA"); fg,second=INK,INK_SOFT
    else: raise SystemExit("unknown treatment")
    tl=text_layer(W,H,a.quote,a.author,a.accent,a.kicker,fg,second)
    png=cairosvg.svg2png(bytestring=tl.encode(),output_width=W,output_height=H)
    out=Image.alpha_composite(bg,Image.open(io.BytesIO(png)).convert("RGBA")).convert("RGB")
    os.makedirs(os.path.dirname(os.path.abspath(a.out)),exist_ok=True); out.save(a.out); print("wrote",a.out,out.size)

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("--image"); p.add_argument("--quote",required=True); p.add_argument("--author",required=True)
    p.add_argument("--accent",default=None,help="one word in the quote to set in ember")
    p.add_argument("--kicker",default="FIELD NOTES")
    p.add_argument("--treatment",default="b",choices=["b","duotone","ember","paper"])
    p.add_argument("--scrim",type=float,default=0.55); p.add_argument("--size",type=int,default=1080)
    p.add_argument("--out",required=True)
    build(p.parse_args())
