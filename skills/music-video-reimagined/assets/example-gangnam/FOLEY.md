# Foley and encode commands used for "CLAWDNAM STYLE"

The soundtrack is not included. It is the song, trimmed so that bar -1 lands at 2.000 s, with the vocal pickup at
2.285 s. Everything else is synthesised by `scripts/sfx.py`, into the song's silences only:

```bash
python3 tools/sfx.py --song assets/song.wav --out assets/song_final.wav --drone 0:2.15:0.8:-0.8 --crickets 220.5:226.4 \
  --whoosh 223.0:0.6,225.07:0.3 --pops 223.6 --glitch 225.35:225.62,226.36:226.58 --offclick 226.56
bash tools/encode_all.sh . assets/song_final.wav clawdnam
```

| cue | when | what |
|---|---|---|
| `--drone` | 0–2.15 | the banner plane crossing right to left in the cold open |
| `--crickets` | 220.5–226.4 | the playground at dusk, after the song's hard cut |
| `--whoosh` | 223.0, 225.07 | the Horse's two lasso twirls |
| `--pops` | 223.6 | the counter ticking to …807 |
| `--glitch` | 225.35, 226.36 | the second overflow, and the surge before the picture collapses |
| `--offclick` | 226.56 | the picture switching off |
