---
name: music-video-reimagined
description: Reimagine an existing music video as an original, hand-painted Claude/Clawd cartoon that plays the whole song, built on John Heibel's Claude Animation Base (p5.js + p5.brush, rendered in headless Chrome, encoded with ffmpeg). Covers the full pipeline end to end - downloading and studying the reference video, measuring the song's exact beat grid and sections, inventing a Claude-flavoured concept, storyboarding, building an on-model cast (the artists reimagined as Clawd characters) and sets, splitting the song into chapters built in parallel by subagents, reviewing seams, rendering, adding foley, encoding and delivering. Use this skill whenever someone wants to remake, reimagine, parody, cover or "Clawd-ify" a music video, make an animated music video for a real song with Claude characters, says "do what you did for Papercut, but with another song", or shares a YouTube music-video link together with the ClaudeAnimationBase repo - even if they don't name every step or say "skill".
---

# Music video, reimagined with Clawd

Turn any music video into a new, hand-painted animated film starring Clawd characters, synced to the complete song.
The first film made this way was Linkin Park's "Papercut": 3:12, nine chapters, six band Clawds, and one
concept (a cut in the *paper* the cartoon is painted on reveals an ink world where the band's dark doubles live). Its
whole project is in `assets/example-papercut/`; use it as the worked example for every phase.

This is a big job (multiple hours, heavy token use, often a dozen agents). Say so up front, then work
autonomously: the user asked for something exceptional, not a quick sketch.

## Ground rules (and why)
- **No lyrics, anywhere.** Not on screen, not in the storyboard, not in code comments, not in agent briefs or reports.
  Lyrics are copyrighted text, and the kit's craft rule is to *act* meaning rather than write it. Refer to the music as
  "verse 1", "the chorus", "the scream bar".
- **No text on screen by default** (the kit's rule 2): no titles, captions, signs or speech bubbles with words. If the
  user allows text or motion graphics, use them as designed elements (a counter, a banner, painted sound effects),
  never as captions and never for lyrics.
- **Original characters only.** Performers become Clawd caricatures recognisable by silhouette, costume, props and
  proportions: affectionate, never realistic likenesses, never mocking, and respectful toward artists who have died.
  If the source video contains a well-known copyrighted character (a famous cartoon, mascot or game character), don't
  draw it: invent an original Clawd-world character that plays the same role.
- **Homage, not copy.** Keep the recognisable ideas of the original (the set, the gags, the famous moves, the ending)
  but reinvent each one through your concept. Never trace it shot by shot.
- **The song audio is the user's, for personal use.** Download it only because they asked; keep it local and out of
  the skill's assets; never publish it anywhere. When delivering, tell them that posting it publicly may get the audio
  flagged.
- **Tone.** Distressing source material (real violence, self-harm, sexual content) gets reinterpreted through metaphor
  or softened. If a video can't be made kid-cartoon-appropriate without losing its point, say so and suggest another.

## Prerequisites
Node.js, Google Chrome, ffmpeg, yt-dlp, and Python 3 with numpy and Pillow. Clone the kit:
`git clone https://github.com/JohnHeibel/ClaudeAnimationBase.git`. Read its `ANIMATION_GUIDE.md` in full before
drawing anything: its rules (handmade, alive, one piece, no text, timing for the viewer, transitions always) are the
quality bar.

## The pipeline
Work through these phases in order. Each has a reference file; read it when you reach that phase.

### 1. Study the source: `references/source-study.md`
```bash
bash scripts/fetch_reference.sh "<youtube url>" ref source        # retries YouTube player clients on 403s
python3 scripts/contact_sheet.py ref/source.mp4 ref/sheets/src --step 2
```
Read the sheets and write SOURCE_NOTES.md: settings and props, palette, the cast's *signatures* (hair, eyewear,
clothes, instruments, moves), who performs when, the signature moments with timestamps, the structure and ending, and
what not to carry over. Paraphrase the song's meaning in one or two sentences of your own.

### 2. Map the song: `references/song-map.md`
```bash
python3 scripts/analyze_song.py ref/source.mp4 --out song_map        # tempo, grid, bars, sections, dropouts, hits
```
Read `report.md` and **look at `spectrogram.png`** to confirm the section boundaries. The analyzer levels the tempo
(four-on-the-floor, half time), refines the grid on the kick drum, and flags a pickup before bar 0. Choose a pre-roll (≈2 s cold open)
and a tail (a silent ending if the song stops hard), then make the soundtrack. This step also verifies the first hit
lands on the grid:
```bash
bash scripts/trim_audio.sh ref/source.mp4 <project>/assets/song.wav <bar0 time> 2.0 <total duration>
```
Write `src/song.js` (`barT`, `beatT`, `SEC`, `HIT`) and the section table.

### 3. Concept and storyboard: `references/concept-storyboard.md`, `references/video-archetypes.md`
Find the *device*: the song's meaning plus the video's visual language, translated into paper, ink and Clawds, as one
literal metaphor that escalates to the climax. Decide which kind of video this is: the archetype changes what the
foundation needs (a move library for dance videos, one shared camera for one-take videos, and so on). **For a dance
video, read `references/dance-videos.md`** and start from `assets/dance/dance.js`. Design the cast,
motifs with escalation, the palette arc, and an ending that rhymes with the opening. Write STORYBOARD.md with chapters
following the song's sections, reads, and every seam specified. Send it to the user early and keep going.

### 4. Foundation, built by you personally: `references/foundation.md`
Set up the project with the engine upgrades (`assets/engine/`, see `PATCHES.md`). Then build the shared layer, which is
what keeps parallel builders consistent:
- `cast.js`: a registry of designs and one `member()` entry point per character
- `sets.js`: sets in world coordinates, with marks, depth hooks, lighting, standard framings and a performance stager
- the concept's signature system, proven in **recipe loops**
- model sheets

Render the sheets and look at them; fix every silhouette that doesn't read before any chapter work starts.

### 5. Team production: `references/team-production.md`
Write PROJECT_GUIDE.md (adapt `assets/example-papercut/PAPERCUT_GUIDE.md`): hard rules, the APIs, standard framings, the
seams table and the world-state table. Create placeholder chapter files. Launch every chapter builder in **one message**
as background agents, with the brief template, on the strongest model (pass the model explicitly if the user named one).
While they work: only you edit shared files, fix reported shared bugs backward-compatibly and message every running
builder, and relay handoff specs between neighbours. If a usage limit stops them, resume each by agent id with
`SendMessage`.

### 6. Review: `references/team-production.md` (review section)
As each chapter lands, render 12–16 frames at review size and check it plays as part of *the film*: the story reads,
the characters are on model, continuity matches the world-state table, and it hits the beat. Check every seam at −2…+2
frames. Fix small things yourself; send specific visual feedback for bigger ones.

### 7. Render, finish and deliver: `references/render-deliver.md`
Render approved chapters as they land (`node render.mjs --frames --range=a:b --workers=3`). Check that every frame
exists, then QA the real frames with `scripts/framesheet.py`. Add foley to the silences (`scripts/sfx.py`), encode
everything (`scripts/encode_all.sh`), and **verify sync and frames in the final file**. Then deliver:
- a <30 MB preview via SendUserFile
- a copy in a permanent folder (scratch workspaces are deleted), with its path
- the copyright note about the song audio

## Top lessons (the full list is in `references/lessons-learned.md`)
1. Verify the grid against the real audio. On Papercut, an unrefined grid was 1.5 frames early everywhere.
2. The soundtrack must be exactly as long as the video (the encoder clips to the shorter one).
3. Check silhouettes at wide-shot size on the model sheets. Crown-mohawks and TV-frame hoods only look fine up close.
4. Draw order hides things (drummers behind kits, pools under rugs). Give scene functions hooks at every depth, and
   split props into back and front parts.
5. Seams break between parallel builders. Lock them in the guide with world coordinates, and forward handoff specs.
6. Only the lead edits shared code, and announces every change.
7. Painted grain makes big files (~500 MB for 3 minutes). Plan delivery around the 30 MB file-card limit and the
   scratch-workspace deletion.

## Credits
Built on John Heibel's [ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase) (MIT License; the notice
is in `LICENSE-ClaudeAnimationBase`). `assets/engine/` and the engine files in both examples (`clawd.js`, `core.js`,
`timeline.js`, `sheets.js`, `render.mjs`) are modified copies of its code, and its `ANIMATION_GUIDE.md` supplies the
craft rules this skill follows. The team workflow also follows his
[P(doom) music video](https://github.com/JohnHeibel/PDoomVideo): one chapter file per song section, parallel subagents
briefed by a written guide, and the shape of its storyboard. No code from that repository is included.

## What's in this skill
| path | what it is |
|---|---|
| `scripts/fetch_reference.sh` | download a reference video with yt-dlp, retrying player clients; extract its audio |
| `scripts/contact_sheet.py` | timestamped contact sheets of a video (no ffmpeg drawtext needed) |
| `scripts/analyze_song.py` | the song map: tempo, refined grid, bars, sections, dropouts, hits, ending, spectrogram, SSM; `--check-first-hit` to verify |
| `scripts/trim_audio.sh` | place the first hit at the pre-roll, pad to the exact duration, verify |
| `scripts/framesheet.py` | QA contact sheets from rendered frames |
| `scripts/seams.sh`, `scripts/stack.py` | strips across every seam, and stacking several strips into one image to review |
| `scripts/scan_frames.py`, `scripts/jumpscan.py` | frame QA: missing, black or frozen frames; and every cut, with likely jump cuts flagged |
| `scripts/sfx.py` | synthesised foley (lamp clicks, buzz, tonearm, crackle) mixed under the song |
| `scripts/encode_all.sh` | master, 1080p, 720p and a ~26 MB preview from the frames and the soundtrack |
| `assets/engine/` | upgraded kit files (costume hooks, frontArm incl. both arms, armLen, legLift/legSplay, glow eyes, singing mouths, layers and papercut fx, lighting, a postFx hook, a render that doesn't hang) + `PATCHES.md` |
| `assets/dance/dance.js` | a beat-locked move library (the Gangnam choreography: gallop, lasso, hip sway, disco, strut…), routines with blending, crowd variation |
| `assets/example-papercut/` | the complete Papercut project (no audio): storyboard, production guide, song map, cast, sets, all nine chapters |
| `assets/example-gangnam/` | the complete "Gangnam Style" project (no audio), a dance video: the move library, a horse rig, the view-counter motion graphics, 14 chapters, and the foley cues |
| `references/*.md` | one guide per phase, video archetypes, lessons learned |
