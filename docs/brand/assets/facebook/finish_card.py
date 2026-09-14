#!/usr/bin/env python3
"""Finish a Gemini quote card: inpaint out its corner badge (keep full size),
then stamp the real AG monogram at bottom-center."""
import cv2, numpy as np
from PIL import Image
BASE="/sessions/bold-dazzling-franklin/mnt/AccountabilityGuild/docs/brand/assets/facebook"
src=f"{BASE}/backgrounds/source/Gemini_Generated_Image_pg5hqnpg5hqnpg5h.png"
out=f"{BASE}/backgrounds/out/greatwall-progress.png"

img=cv2.imread(src).astype(np.float32)   # BGR
H,W=img.shape[:2]
cx0,cy0=938,889                          # badge center
# 1) inpaint to kill the bright star
mask=np.zeros((H,W),np.uint8); cv2.circle(mask,(cx0,cy0),70,255,-1)
base=cv2.inpaint(img.astype(np.uint8),mask,5,cv2.INPAINT_TELEA).astype(np.float32)
# 2) clone real foliage texture from directly ABOVE the badge over the smoothed area,
#    with a feathered (Gaussian) mask so it blends seamlessly
dy=150                                    # source offset upward (continuous foliage column)
R=80
y0,y1=cy0-R,cy0+R; x0,x1=cx0-R,cx0+R
src_patch=img[y0-dy:y1-dy, x0:x1]         # foliage above
fmask=np.zeros((2*R,2*R),np.float32); cv2.circle(fmask,(R,R),int(R*0.72),1.0,-1)
fmask=cv2.GaussianBlur(fmask,(0,0),R*0.28)[...,None]
base[y0:y1,x0:x1]=src_patch*fmask + base[y0:y1,x0:x1]*(1-fmask)
clean=np.clip(base,0,255).astype(np.uint8)
card=Image.fromarray(cv2.cvtColor(clean,cv2.COLOR_BGR2RGB)).convert("RGBA")

# stamp monogram bottom-center
st=Image.open(f"{BASE}/monogram-overlay-bone.png").convert("RGBA")
target_h=120; tw=int(st.width*target_h/st.height)
st=st.resize((tw,target_h),Image.LANCZOS)
cx=(W-tw)//2; cy=int(0.905*H)-target_h//2      # vertical center ~90.5% down
card.alpha_composite(st,(cx,cy))
card.convert("RGB").save(out)

# inspection crop of the patched corner
Image.fromarray(cv2.cvtColor(clean,cv2.COLOR_BGR2RGB)).crop((int(W*0.72),int(H*0.80),W,H)).save("/sessions/bold-dazzling-franklin/mnt/outputs/_after_br.png")
print("wrote",out, card.size)
