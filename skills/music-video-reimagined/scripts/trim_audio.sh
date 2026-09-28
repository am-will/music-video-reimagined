#!/usr/bin/env bash
# trim_audio.sh SOURCE OUT.wav BAR_TIME PREROLL DURATION [FIRST_SOUND]
# Makes the project's soundtrack: the song placed so a bar line (BAR_TIME, in SOURCE's clock, from analyze_song.py) lands
# exactly at PREROLL seconds, padded with silence to exactly DURATION seconds.
#   - BAR_TIME: normally "bar 0 (first downbeat)". If the report says the music starts BEFORE bar 0 (a pickup), pass
#     "bar -1 starts at" instead, so the pickup isn't cut off.
#   - PREROLL (e.g. 2.0) gives a silent cold open; PROJECT.offset must then be the video time of bar 0
#     (= PREROLL, or PREROLL + one bar if you placed bar -1 at PREROLL).
#   - DURATION must equal PROJECT.duration: render.mjs encodes with -shortest, so a short soundtrack clips the video.
#   - FIRST_SOUND (optional): the report's "music from X s". The check then expects the first sound at
#     PREROLL + (FIRST_SOUND - BAR_TIME) instead of at PREROLL (they differ when the song has a pickup).
# Then verifies the result: the first strong sound should be within ~10 ms of where it belongs.
set -euo pipefail
SRC="$1"; OUT="$2"; HIT="$3"; PRE="$4"; DUR="$5"; FIRST="${6:-}"
HERE="$(cd "$(dirname "$0")" && pwd)"
START=$(python3 -c "print(max(0.0, $HIT - $PRE))")
DELAY_MS=$(python3 -c "print(int(round(max(0.0, $PRE - $HIT) * 1000)))")   # if the song starts sooner than PREROLL
if [ "$DELAY_MS" -gt 0 ]; then
  ffmpeg -loglevel error -y -i "$SRC" -vn -ac 2 -ar 44100 -af "adelay=${DELAY_MS}|${DELAY_MS},apad=whole_dur=${DUR}" -t "$DUR" -c:a pcm_s16le "$OUT"
else
  ffmpeg -loglevel error -y -ss "$START" -i "$SRC" -vn -ac 2 -ar 44100 -af "apad=whole_dur=${DUR}" -t "$DUR" -c:a pcm_s16le "$OUT"
fi
echo "duration: $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT") s (want $DUR)"
EXPECT=$(python3 -c "print(round($PRE + (($FIRST - $HIT) if '$FIRST' else 0), 3))")
python3 "$HERE/analyze_song.py" "$OUT" --check-first-hit "$EXPECT"
