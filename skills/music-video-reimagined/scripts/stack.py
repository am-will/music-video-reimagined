#!/usr/bin/env python3
"""Stack images vertically at a common width, with a label bar: python3 tools/stack.py out.jpg a.jpg b.jpg ..."""
import sys
from PIL import Image, ImageDraw
out, paths, W = sys.argv[1], sys.argv[2:], 2000
ims = []
for p in paths:
    im = Image.open(p).convert('RGB'); im = im.resize((W, round(im.height * W / im.width)))
    bar = Image.new('RGB', (W, 22), (30, 30, 30)); ImageDraw.Draw(bar).text((6, 4), p.split('/')[-1], fill=(255, 220, 120))
    ims += [bar, im]
H = sum(i.height for i in ims); canvas = Image.new('RGB', (W, H)); y = 0
for i in ims: canvas.paste(i, (0, y)); y += i.height
canvas.save(out, quality=88); print(out, W, H)
