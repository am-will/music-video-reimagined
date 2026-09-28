# Phase 2: map the song

Every action in the film lands on the music, so the timing map is the backbone. Measure it; don't guess it.

## 1. Analyse the source audio
Use the audio from the *video* (music-video edits often differ from the album cut):
```bash
python3 scripts/analyze_song.py ref/source.mp4 --out song_map
```
It writes `report.md`, `analysis.json`, `spectrogram.png` and `ssm.png`, in about 2 seconds. Read the report, then
**look at the spectrogram**: band entries, sparse verses, breakdowns and sustained pads are obvious to the eye, and they
confirm (or correct) the automatic boundaries.

What the report gives you:
- **Tempo.** The pulse plus the beat level, chosen automatically:
  - **Four-on-the-floor** (a kick on every beat of the double tempo, quiet between them): the beat is the double
    tempo. "Gangnam Style" reports a 66 BPM pulse, correctly leveled to 132.
  - **A fast pulse that alternates strong and weak** (> 130): half time. Papercut's 150 is correctly leveled to 75.
  - Check the choice against the feel: dance tracks bounce at 120–135, rock and hip-hop often at 70–100.
  - Use the beat level as `PROJECT.bpm`, and `pulse2()` for eighths.
- **Bar 0.** The first downbeat. The grid phase is refined against **kick-drum transients** (1 ms resolution) when
  there's a steady kick, and against broadband attacks otherwise. The report shows the bar-phase scores; if two are
  close, trust the structure: **drops and section starts land on bar lines**, and the analyzer weighs where the music
  returns after each dropout.
- **A pickup.** If the music starts before bar 0 (a vocal pickup), the report says so and gives bar -1's start. Trim
  so **bar -1** lands at the pre-roll (and pass the first-sound time to `trim_audio.sh`), or you'll cut the pickup off.
- **Segments.** Boundaries snapped to bars, with letters: the same letter means similar material, so repeats reveal
  verse/chorus. Name them by musical function (intro, verse, pre-chorus, chorus, bridge, breakdown, outro), using the
  energy columns (choruses are usually louder and brighter in the mids) and who performs when from the source study.
- **Dropouts.** The low end falls away for ≥0.2 s: pre-chorus "breaths", band stops and stop-start riffs. These are the
  best moments in the song for freezes, blackouts and slices.
- **Strongest hits.** Crashes, stabs and the final flurry: land the biggest visual events on these.
- **The ending.** Where the music stops, and whether it's a hard cut or a fade. A hard cut is a gift: smash-cut to
  silence and let the ending play in the quiet.
- **Drift.** If the best local offset wanders beyond ±20 ms (a live recording, rubato, a tempo change), a single grid
  won't hold. Give those sections their own measured anchors: write their key times from the report's hits, or run the
  analyzer on the section alone.

## 2. Decide the film's clock
- **Pre-roll**: 1.5–3 s of silence before the first hit gives a cold open (a light flicking on, a needle hovering).
  Put the first downbeat at exactly `PREROLL` (usually 2.000).
- **Tail**: if the song ends hard, 4–8 s of silence after it gives room for a twist or a button.
- `PROJECT = { duration: PREROLL + songLength + TAIL, bpm: <beat bpm>, offset: PREROLL, audio: 'assets/song.wav' }`.

## 3. Make the soundtrack
```bash
bash scripts/trim_audio.sh ref/source.mp4 assets/song.wav <bar0 (or bar -1) from report> 2.0 <duration> [<first sound>]
```
This places that bar line at the pre-roll, pads with silence to exactly `duration` (the encoder uses `-shortest`, so a
short soundtrack would clip the ending), and then **verifies** the first strong sound lands within a few ms of the
pre-roll. If the verification is off by more than ~15 ms, fix it before anyone animates to the grid. On Papercut an
unverified grid was 64 ms (1.5 frames) early and every hit in every chapter looked slightly ahead of the sound.

Re-run the analyzer on `assets/song.wav` for times in the film's own clock.

## 4. Write src/song.js
Everything downstream uses these names, so every chapter hits the same beats:
```js
const BAR = 4 * BEAT, EIGHTH = BEAT / 2;
const barT = k => OFF + k * BAR;                 // bar k's downbeat
const beatT = (k, b = 0) => OFF + k * BAR + b * BEAT;
const SEC = { intro: [barT(0), barT(4)], verse1: [barT(4), barT(12)], /* ... from the report */ };
const HIT = { first: barT(0), band: barT(3), breath1: beatT(14, 3), lastHits: [/* measured */], silence: /* cut */ };
```
Add small song-specific helpers where a section has a pattern, e.g. a stop-start riff's gaps
(`gapOf(k) => [beatT(k, 1), beatT(k, 3.3)]`). Check such patterns by rendering a strip, or by reading the per-bar
energy, before builders rely on them: on Papercut a gap assumed to end at beat 2.5 really ended at 3.3.

## 5. Keep a table in the storyboard
Put the section table (name, bars, times) at the top of STORYBOARD.md. Builders will use it constantly.
