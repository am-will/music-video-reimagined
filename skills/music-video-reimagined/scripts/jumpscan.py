#!/usr/bin/env python3
"""Find single-frame discontinuities (cuts) and flag likely JUMP CUTS: a hard change between consecutive frames whose
coarse layout stays nearly the same (same framing, same set, but things moved or changed).
usage: python3 tools/jumpscan.py [first] [last]"""
import sys
import numpy as np
from PIL import Image, ImageFilter
a0 = int(sys.argv[1]) if len(sys.argv) > 1 else 0; a1 = int(sys.argv[2]) if len(sys.argv) > 2 else 5459
def load(i):
    im = Image.open(f'out/frames/f{i:05d}.jpg'); im.draft('L', (240, 135)); im = im.convert('L')
    fine = np.asarray(im.resize((96, 54)), np.float32); coarse = np.asarray(im.resize((12, 7), Image.BILINEAR).filter(ImageFilter.BLUR), np.float32)
    return fine, coarse
prev = load(a0); D = []
for i in range(a0 + 1, a1 + 1):
    cur = load(i); D.append((i, np.abs(cur[0] - prev[0]).mean(), np.abs(cur[1] - prev[1]).mean())); prev = cur
fine = np.array([d[1] for d in D])
out = []
for k, (i, df, dc) in enumerate(D):
    loc = np.median(fine[max(0, k - 12):k + 13])
    if df > 6 and df > 3.5 * max(loc, 1.0):          # a spike: a cut or a pop
        kind = 'JUMP?' if dc < .45 * df else 'cut'
        out.append((i, i / 24, df, dc, kind))
for i, t, df, dc, kind in out: print(f'{kind:6s} f{i:05d}  t={t:8.3f}  fine={df:5.1f}  coarse={dc:5.1f}')
print(len(out), 'spikes;', sum(1 for o in out if o[4] == 'JUMP?'), 'flagged as possible jump cuts')
