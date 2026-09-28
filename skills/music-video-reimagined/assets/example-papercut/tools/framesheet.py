#!/usr/bin/env python3
"""Tile rendered frames (out/frames/fNNNNN.jpg) into timestamped contact sheets for QA.
Usage: python3 tools/framesheet.py t0 t1 step out_prefix [cols] [w]"""
import sys, os
from PIL import Image, ImageDraw, ImageFont
t0, t1, step, pre = float(sys.argv[1]), float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
cols = int(sys.argv[5]) if len(sys.argv) > 5 else 6; w = int(sys.argv[6]) if len(sys.argv) > 6 else 320
h = w * 9 // 16; font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 14)
ts, t = [], t0
while t < t1 + 1e-9: ts.append(t); t += step
cells = [(t, f'out/frames/f{round(t * 24):05d}.jpg') for t in ts]
cells = [(t, f) for t, f in cells if os.path.exists(f)]
per = cols * 4
for s in range(0, len(cells), per):
    chunk = cells[s:s + per]; rows = (len(chunk) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * w, rows * h), (16, 16, 16)); d = ImageDraw.Draw(sheet)
    for i, (t, f) in enumerate(chunk):
        x, y = (i % cols) * w, (i // cols) * h
        sheet.paste(Image.open(f).resize((w, h)), (x, y))
        d.rectangle([x, y, x + 58, y + 18], fill=(0, 0, 0)); d.text((x + 3, y + 1), f'{t:.1f}s', fill=(255, 220, 0), font=font)
    sheet.save(f'{pre}_{s // per:02d}.jpg', quality=85)
print(len(cells), 'frames tiled')
