# Phase 6: render, finish and deliver

## Final frames
```bash
node render.mjs --frames --range=0:<t> --workers=3        # resumable JPEG frames into out/frames
node render.mjs --frames --range=<t>:<end> --workers=2    # a second range in parallel if the machine has headroom
```
Start chapters as soon as they're approved; don't wait for the last one. Frames are resumable, so if a shared file
changes later, delete only the affected range and re-render. On an Apple M4, 5 workers across two processes managed
~0.75–1.2 s per frame effective (a 3-minute film in about an hour). Then check completeness:
```bash
python3 - <<'EOF'
import os; n=round(DURATION*24)   # frames expected
miss=[i for i in range(n) if not os.path.exists(f'out/frames/f{i:05d}.jpg')]
small=[i for i in range(n) if os.path.exists(f'out/frames/f{i:05d}.jpg') and os.path.getsize(f'out/frames/f{i:05d}.jpg')<20000]
print('missing', len(miss), miss[:10], 'small', len(small))
EOF
python3 scripts/framesheet.py 0 70 2 out/check/final_a 6 320      # QA the real output, 1 frame / 2 s
python3 scripts/scan_frames.py 5460        # every frame: missing, near-empty, unexpectedly black, or frozen for 0.5 s+
python3 scripts/jumpscan.py                # every cut: flags JUMP CUTS (a hard change while the layout stays the same)
```
`jumpscan.py` lists every single-frame discontinuity. For "JUMP?" entries, the coarse picture barely changed (same set,
same framing) while the detail did. Ignore runs of consecutive flags (fast motion, whips, punch-ins). Look at every
*isolated* flag as a before/after pair of real frames at full size. Intended ones are crash zooms, punch-in cuts and
takes, where the characters stay continuous. A real jump has things teleporting: a user found one of these at a
"continuous" seam where two builders had filled the same subway carriage with different riders.

## Foley for the silences
The song only covers the middle; a cold open and a silent tail feel richer with a few tiny sounds that match what's on
screen: a lamp clicking on or off, a filament buzzing, a tonearm lifting. `scripts/sfx.py` synthesises them from noise
and sine waves (no samples), at levels that sit under the song:
```bash
python3 scripts/sfx.py --song assets/song.wav --out assets/final.wav --clicks 0.417,0.583,0.75 --buzz 0.417:1.1 \
  --softclicks 1.13 --offclick 191.55
```
Take the times from the chapters (grep their shot plans). Keep effects off the song's own hits, which are loud enough
already; the script reports levels, so check there's no clipping.

## Encode
```bash
bash scripts/encode_all.sh <project> assets/final.wav <Name>
```
This makes the master (CRF 17), a 1080p share copy (CRF 23, grain kept), a 720p copy and a ~26 MB 540p preview.
Painted paper grain compresses badly: expect ~500 MB for a 3-minute master and ~350 MB for the 1080p share.

**Verify the final file itself** before telling anyone it's done:
- Decode its audio and check the first strong hit is at the pre-roll (±10 ms) and the song cuts where the chapters cut.
  `analyze_song.py <file> --check-first-hit 2.0` does the first check; a threshold above your foley's level keeps
  quiet effects from being mistaken for the song.
- Pull 5–6 frames with `ffmpeg -ss <t> -i <file> -frames:v 1` at key moments and look at them.

## Deliver
- **SendUserFile** delivers up to 30 MB to remote (phone and web) viewers; bigger files only show in the desktop app.
  Send the preview so the user can watch anywhere, and send or point to the full-quality files.
- **Session scratch workspaces are deleted when the session ends.** Copy the finished videos (and offer the project)
  somewhere permanent, e.g. `~/Movies/<Name> (1080p).mp4`, and give the user that path.
- **Uploading somewhere else** (Google Drive, etc.):
  - The built-in browser can't attach local files.
  - Claude in Chrome's `file_upload` is capped at 10 MB per call.
  - Drive-style connectors carry file contents inside the tool call, so they can't move hundreds of MB.
  - What does work: if a sync client is installed (`~/Library/CloudStorage/GoogleDrive-*`), copy the file into its
    folder. Otherwise open the destination in the user's Chrome, reveal the file in Finder (`open -R`), and let them
    drag it in.
- **Tell the user plainly** that the video contains the original commercial recording. That's fine for personal use,
  but platforms may flag or block the audio if they post it publicly.
