#!/bin/bash
# Seam checks: 7 frames around each chapter boundary (3 before, the seam, 3 after) at review size, one strip per seam.
# Run from the project folder:  bash scripts/seams.sh 16.545 31.091 ...        (the seam times, in video seconds)
# Then stack several strips into one image to look at them together:  python3 scripts/stack.py out/review/seams.jpg out/check/seam_*.jpg
# (bash 3.2 on macOS: no associative arrays, so seam times are passed as arguments.)
for s in "$@"; do
  a=$(python3 -c "print(f'{$s - 3/24 + .001:.4f}')"); b=$(python3 -c "print(f'{$s + 3/24 + .001:.4f}')")
  node render.mjs --strip=$a:$b --cols=7 --w=400 --out=out/check/seam_$s.jpg 2>&1 | tail -1
done
