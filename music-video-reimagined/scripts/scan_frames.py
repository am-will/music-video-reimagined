#!/usr/bin/env python3
"""Flag suspicious rendered frames: missing, tiny files, near-black frames outside the expected black stretches,
and frames identical to their neighbour for long runs (a frozen shot).  usage: python3 tools/scan_frames.py [n_frames]"""
import os, sys
import numpy as np
from PIL import Image
N = int(sys.argv[1]) if len(sys.argv) > 1 else 5460
BLACK_OK = [(195.5, 197.3), (226.4, 227.6)]           # the overflow void and the ending: black is intended
missing, tiny, black, prev, same_run, runs = [], [], [], None, 0, []
for i in range(N):
    f = f'out/frames/f{i:05d}.jpg'
    if not os.path.exists(f): missing.append(i); prev = None; continue
    if os.path.getsize(f) < 15000: tiny.append(i)
    im = np.asarray(Image.open(f).convert('L').resize((96, 54)), dtype=np.float32)
    t = i / 24
    if im.mean() < 14 and not any(a <= t <= b for a, b in BLACK_OK): black.append(i)
    if prev is not None and np.abs(im - prev).mean() < .15: same_run += 1
    else:
        if same_run >= 12: runs.append((i - same_run - 1, i - 1))
        same_run = 0
    prev = im
print('missing', len(missing), missing[:10], '...' if len(missing) > 10 else '')
print('tiny', tiny[:20]); print('black', [(i, round(i / 24, 2)) for i in black][:20])
print('frozen runs (>= 0.5 s)', [(a, b, round(a / 24, 2), round(b / 24, 2)) for a, b in runs])
