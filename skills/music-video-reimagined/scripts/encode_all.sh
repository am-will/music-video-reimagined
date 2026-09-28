#!/usr/bin/env bash
# encode_all.sh PROJECT_DIR AUDIO.wav NAME
# From PROJECT_DIR/out/frames (JPEG frames at 24 fps written by `node render.mjs --frames`) and the final soundtrack:
#   out/NAME_master.mp4    1080p, CRF 17 (render.mjs --encode) - the archival master
#   out/NAME_1080p.mp4     1080p, CRF 23, -tune grain (keeps the paper grain) - for viewing and sharing
#   out/NAME_720p.mp4      720p, CRF 24
#   out/NAME_preview.mp4   960x540, two-pass, sized to ~26 MB - small enough for SendUserFile's 30 MB remote limit
# Painted paper grain is expensive to compress: expect ~2.8 MB/s for the master and ~1.8 MB/s for the 1080p share.
set -euo pipefail
P="$1"; AUD="$2"; NAME="$3"
cd "$P"
N=$(ls out/frames | grep -c '\.jpg$'); DUR=$(python3 -c "print($N/24)")
echo "$N frames = ${DUR}s"
node render.mjs --encode --audio="$AUD" --out="out/${NAME}_master.mp4" >/dev/null 2>&1
ffmpeg -loglevel error -y -framerate 24 -i out/frames/f%05d.jpg -i "$AUD" -map 0:v -map 1:a -c:v libx264 -preset slow -crf 23 -tune grain \
  -pix_fmt yuv420p -c:a aac -b:a 256k -shortest -movflags +faststart "out/${NAME}_1080p.mp4"
ffmpeg -loglevel error -y -framerate 24 -i out/frames/f%05d.jpg -i "$AUD" -map 0:v -map 1:a -vf scale=1280:720:flags=lanczos -c:v libx264 \
  -preset slow -crf 24 -tune grain -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "out/${NAME}_720p.mp4"
VB=$(python3 -c "print(int(26*8*1024/$DUR - 96))")   # kbit/s of video that lands the preview near 26 MB
PASS=$(mktemp -d)
ffmpeg -loglevel error -y -i "out/${NAME}_1080p.mp4" -vf scale=960:540:flags=lanczos -c:v libx264 -preset slow -b:v ${VB}k -pass 1 -passlogfile "$PASS/p" -an -f mp4 /dev/null
ffmpeg -loglevel error -y -i "out/${NAME}_1080p.mp4" -vf scale=960:540:flags=lanczos -c:v libx264 -preset slow -b:v ${VB}k -pass 2 -passlogfile "$PASS/p" \
  -c:a aac -b:a 96k -movflags +faststart "out/${NAME}_preview.mp4"
rm -rf "$PASS"
ls -lh out/${NAME}_*.mp4
for f in out/${NAME}_*.mp4; do echo "$f: $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f") s"; done
