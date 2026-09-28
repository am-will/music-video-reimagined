#!/usr/bin/env bash
# fetch_reference.sh URL OUTDIR NAME
# Downloads a reference video (<=720p is plenty for study) with yt-dlp. YouTube often refuses the default client
# (HTTP 403 or "requested format is not available"), so this walks through several player clients until one works.
# Also extracts the audio track losslessly (copy) next to the video for analysis. For X/Twitter posts with several
# videos, only the first item is taken (the /video/1 link).
set -uo pipefail
URL="$1"; OUT="${2:-ref}"; NAME="${3:-source}"
mkdir -p "$OUT"
command -v yt-dlp >/dev/null || { echo "yt-dlp not found (brew install yt-dlp)"; exit 1; }
try() {   # try <extra yt-dlp args...>
  yt-dlp --no-playlist --playlist-items 1 "$@" -f "bv*[height<=720]+ba/b[height<=720]/b" --merge-output-format mp4 \
    -o "$OUT/$NAME.%(ext)s" "$URL" >"$OUT/$NAME.ytdlp.log" 2>&1
  [ -s "$OUT/$NAME.mp4" ]
}
if ! try; then
  for pc in mweb web_safari tv ios android web_embedded; do
    echo "retrying with player client: $pc"
    rm -f "$OUT/$NAME".*.part
    try --extractor-args "youtube:player_client=$pc" && break
  done
fi
[ -s "$OUT/$NAME.mp4" ] || { echo "download failed; see $OUT/$NAME.ytdlp.log (try: brew upgrade yt-dlp)"; exit 1; }
ffprobe -v error -show_entries format=duration:stream=codec_type,width,height,r_frame_rate,sample_rate,bit_rate -of compact "$OUT/$NAME.mp4"
# lossless copy of the audio track (for analysis and the final mix); fall back to WAV if the codec can't be copied
ffmpeg -loglevel error -y -i "$OUT/$NAME.mp4" -vn -c:a copy "$OUT/$NAME.audio.m4a" 2>/dev/null \
  || ffmpeg -loglevel error -y -i "$OUT/$NAME.mp4" -vn -c:a pcm_s16le "$OUT/$NAME.audio.wav"
echo "ok: $OUT/$NAME.mp4"
