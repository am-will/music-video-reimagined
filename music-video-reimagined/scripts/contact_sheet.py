#!/usr/bin/env python3
"""contact_sheet.py: timestamped contact sheets of a video, for studying a reference (read them with the Read tool).

Usage: python3 contact_sheet.py VIDEO OUT_PREFIX [--step 2] [--cols 5] [--rows 4] [--w 384] [--t0 0] [--t1 END]
Writes OUT_PREFIX_00.jpg, _01.jpg ... (cols x rows cells each). One frame every `step` seconds, labelled with its time.
Use step 2 for a first pass over a whole video, then step 0.25-0.5 over the moments you need to understand (cuts,
choreography, effects). No ffmpeg drawtext needed (many builds lack it); labels are drawn with Pillow.
"""
import argparse, os, shutil, subprocess, tempfile
from PIL import Image, ImageDraw, ImageFont

ap = argparse.ArgumentParser()
ap.add_argument('video'); ap.add_argument('prefix')
ap.add_argument('--step', type=float, default=2); ap.add_argument('--cols', type=int, default=5); ap.add_argument('--rows', type=int, default=4)
ap.add_argument('--w', type=int, default=384); ap.add_argument('--t0', type=float, default=0); ap.add_argument('--t1', type=float, default=None)
a = ap.parse_args()
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', a.video]).decode().strip())
t1 = a.t1 if a.t1 is not None else dur
h = int(a.w * 9 / 16); tmp = tempfile.mkdtemp()
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-ss', str(a.t0), '-to', str(t1), '-i', a.video,
                '-vf', f'fps=1/{a.step},scale={a.w}:{h}:force_original_aspect_ratio=decrease,pad={a.w}:{h}:(ow-iw)/2:(oh-ih)/2',
                os.path.join(tmp, 'f%05d.png')], check=True)
frames = sorted(os.listdir(tmp))
try: font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 16)
except Exception: font = ImageFont.load_default()
per = a.cols * a.rows; os.makedirs(os.path.dirname(os.path.abspath(a.prefix)), exist_ok=True)
for s in range(0, len(frames), per):
    chunk = frames[s:s + per]; rows = (len(chunk) + a.cols - 1) // a.cols
    sheet = Image.new('RGB', (a.cols * a.w, rows * h), (20, 20, 20)); d = ImageDraw.Draw(sheet)
    for i, fn in enumerate(chunk):
        x, y = (i % a.cols) * a.w, (i // a.cols) * h
        sheet.paste(Image.open(os.path.join(tmp, fn)), (x, y))
        t = a.t0 + (s + i) * a.step
        d.rectangle([x, y, x + 66, y + 20], fill=(0, 0, 0)); d.text((x + 4, y + 2), f'{t:6.1f}s', fill=(255, 230, 0), font=font)
    sheet.save(f'{a.prefix}_{s // per:02d}.jpg', quality=85)
shutil.rmtree(tmp)
print(len(frames), 'frames ->', f'{a.prefix}_00.jpg ...')
