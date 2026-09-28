# CLAWDNAM STYLE: production guide for chapter builders

You're building **one chapter** of a hand-painted animated music video: the Clawd reimagining of PSY's "Gangnam Style" (227.5 s). Read, in this order:
1. `ANIMATION_GUIDE.md`: the kit's rules and animation principles. They all apply. The exception: **text IS allowed here as motion graphics** (see Hard rules).
2. This file: the shared code, rules, framings and seams.
3. `STORYBOARD.md`: the whole film, then your chapter closely.
4. The shared source you'll call: `src/song.js`, `src/dance.js`, `src/cast.js`, `src/sets.js`, `src/counter.js`, `src/fx.js`, and `src/sheets_gs.js` (the model sheets and recipes).
5. Render and LOOK at the model sheets and recipes (commands below): `moves`, `cast`, `horse`, `castdance`, `counter`, `s_playground`, `s_stable`, `s_arena`, `s_garage`, `s_subway`, `s_platform`, `s_laser`, `r_formation`, `r_glitch`, `r_paperwipe`.

## Hard rules
- **Never write song lyrics anywhere**: not on screen, not in code comments, not in your report. Refer to the music only as "the chorus", "the drop", "the stabs" and so on.
- **Text on screen is allowed only as our own motion graphics**: the view counter, the banner plane, the elevator's floor numbers, a few painted sound effects (BOOM, DING…), maybe a speed-line "WHOOSH". Keep it sparse and hand-lettered (`letter()` / `sfx()`), never a caption of what's happening.
- **THE DANCE IS THE STAR.** Whenever the storyboard says a character dances, show the real choreography: full bodies, big enough to read (u ≥ 18 for the lead in a medium shot, ≥ 12 in wides), on the beat, held long enough to see. Don't cut away from a dance faster than one bar unless the storyboard says to.
- **Only edit your own chapter file**, `src/ch/<your file>.js`. All other files are shared and read-only. If you need a helper, write it inside your IIFE. If a shared file has a bug, report it; don't fix it.
- **Cover your time range exactly** with `shots([[t0, fn], ...])` in absolute video times (`barT(k)`, `beatT(k, b)`, `HIT.*`, `SEC.*`).
- **Pure functions of t.** No state between frames and no `Math.random()`. Use `hash(i)`, and `boilSeed(key)` before each separate element you paint (the shared functions seed themselves).
- **Characters only through the cast API** (`member`, `dancer`, `horse`). Never re-draw them, and never change their designs or colours.
- **Budget: ≤ 3 s per frame**, measured alone (parallel renders by other builders inflate it). Big crowds need small u and cheap back rows (`noShadow`, no extras).
- **Never call geometry helpers at file-load time** (`rectPts`, `ellPts`… call `random()`, which doesn't exist until the page runs). Only call them inside shots.
- macOS has no `timeout` command. `render.mjs` exits cleanly on its own.

## Time (src/song.js, src/config.js)
- 132 BPM, four-on-the-floor. `BEAT` = 0.45455 s, `EIGHTH` = 0.22727 s, `BAR` = 1.81818 s. `barT(k)` = 3.81818 + 1.81818·k is the downbeat of bar k; `beatT(k, b)` is beat b of bar k (fractions allowed).
- `SEC.*` and `HIT.*` hold the section map and the accents, and `DROPOUTS` lists the moments the low end drops out (the breaths). The full table is in STORYBOARD.md.
- `pulse(t)` is 1 on every beat and then decays; `pulse2(t)` does the same on eighths. `bpOf(t)` is the beat position, `beatIx(t)` the beat number and `beatPh(t)` the phase (0..1).
- Big changes land on downbeats. Accents and hits land on beats.

## The choreography (src/dance.js)
```js
dance(move, t, { side, ph, e, amp, hand, sleeve })   // pose fields for a move at time t
routine(t, [[t0, 'gallop'], [t1, 'lasso', { side: -1 }], ...], { blend: .12 })   // a timeline, blended between moves
crowdVar(i)                                          // { ph, amp, side, e }: tiny per-dancer variation for crowds
dancer(name, x, y, u, moveOrKeys, t, { look, v, mood, ph, e, side, amp, flip, view, dx, dy, rot, eyes, mouth, ... })   // member + choreography
```
Moves: `gallop` (the horse dance: skip-step gallop with the reins), `lasso`, `hipsway`, `disco`, `vArms`, `strut`, `windflap`, `hairslick`, `shimmy`, `pointup`, `crouch`, `crawl`, `groove`. Render `--loop=moves` and `--loop=castdance` to see them.

**The chorus routine** (every drop; keep to it so the choruses match the original):

| bars | move |
|---|---|
| 1–2 | `gallop` |
| 3–4 | `lasso` (the right arm by default) |
| 5–6 | `gallop` |
| 7–8 | `lasso` |

For example, for chorus 1: `[[barT(36), 'gallop'], [barT(38), 'lasso'], [barT(40), 'gallop'], [barT(42), 'lasso']]`.

**The post-chorus**: `hipsway` for 2 bars, `disco` for 2 bars (`side: 1` then `side: -1`), `hipsway` for 2 bars, then `lasso`, with `vArms` on the last bar.

Group dances move in unison; add `crowdVar(i)` so nobody is a photocopy. A **dance that reads**: full-body framing, the floor visible, the lead facing us, the camera steady or slowly drifting while the steps land. Save whip pans and cuts for bar lines.

## The cast (src/cast.js)
```js
member(name, x, y, u, o)           // names: 'oppa' 'kid' 'rival' 'elev' 'pop' 'dancer' 'granny' 'grandpa' 'boss' 'commuter' 'crowd'
  o.look (oppa only): 'tux' (sky-blue, his signature) | 'black' | 'white' | 'party' | 'beach' | 'sauna';   o.v = variant (ensembles)
  o.bareEyes (oppa): no shades (only after he gives them to the Horse in c13)
mood(name, t, keys, {v}) / mfeel(name, emo, t, {v, ...})   // emotions keeping the character's own clay
singing(t, 'rap'|'sing'|'shout')   // mouth flaps: spread into member()
horse(x, y, s, t, o)               // THE Horse (chestnut, with a spark star on its forehead) and other horses
  o.view: 'side' (default, faces right; o.flip faces left) | 'up' (upright on its hind legs, facing us: pass dance() pose
          fields to make it dance, with {hand: GP.hoof} for the lasso) | 'sit' (sitting, e.g. a bus seat)
  o.mood: 'deadpan' (default) | 'annoyed' | 'surprised' | 'smug' | 'joy';  o.look: 'camera' (its eye turns to us)
  o.coat: 'chestnut' (THE Horse) | 'bay' | 'grey' | 'black' | 'palomino' (extras: no star)
  o.walk (phase), o.chew (0..1), o.headDown (0..1), o.shades, o.visor (a colour), o.towel, o.blink (seed), o.dx/dy/sq/rot
roundShades(u, sw, F, 'tort'|'white'|'big'|'goggles'|'wire'), sunVisor(u, sw, col), lambTowel(u, sw)   // gear for face/head hooks
GP                                  // the film's palette (sky, sand, tux, horse, neon…)
```
- **The Horse's acting**: stillness is the joke. It barely moves: slow blinks, chewing, eyes sliding to look at things (or at us). One small move (a slow head turn, a single sweat drop) lands harder than a big one. Give each cameo a clear read (1–2 s).
- **Sizes**: a horse at s = u is about twice a Clawd's height; s ≈ 0.6–0.8 × the Clawds' u looks right side by side. Little Clawd is u × 0.55.

## The sets (src/sets.js)
World coordinates; **the floor line is y = 820** in every shared set. Each set takes `hooks: { back, mid, front, ... }`.

| set | notes |
|---|---|
| `playground(t, o)` | marks: lounger (1500, 820), Kid (1180, 860), umbrella x 1690, sandbox x 850–2190. `mid0`/`mid` hooks |
| `stable(t, o)` | stalls every 300 px from x = 200 (`stallX(k)`); horses peek over the doors (o.horses / o.skip lists; hook `stallHorse(k, x)` to draw your own, e.g. THE Horse) |
| `stableAisle(t, o)` | a symmetric aisle backdrop (walk toward the camera by scaling up); hook `aisleHorse(side, k, x, y, s)` |
| `arena(t, o)` | dancers on the sand in rows `STAGE.arena.rows` = [y, count, spacing]; riders/horses in the `back` hook at y ≈ 815 |
| `garage(t, o)` | pillars, strip lights, floor arrows, the red convertible at (2300, 830) (`carProp` exported); the **elevator** at `ELEV_X` = 3300: `o.elevOpen` 0..1, `o.elevFloor` (the number shown), `o.elevLight`, hook `elevInside(x, open)` to draw what's inside |
| `subway(t, o)` | the carriage: windows with streaking lights (`o.speed`), handles, poles at x = 350 + 700k, seats (`seats` hook) |
| `platform(t, o)` | tiled pillars, screen doors, the yellow line. The dance line: `STAGE.platform.line` = [y 900, 9 dancers, spacing 180] |
| `laserHall(t, o)` | the finale: `o.lasers` 0..1, `o.col`, `o.hue` |

- **Helpers**: `sky`, `cityline`, `tree`, `bench`, `fluoro`, `carProp`, `vis(x0, x1)`, `FLOOR`.
- **Single-use sets** (the sauna, the board-game bench, the bridge lot, the carousel, the bus, the river, the pool, the crossing, the restroom, the globe, space) are yours to paint in your file, in the same style: flat `wash` plus an ink outline for objects, soft watercolour `fill` for skies and shading. Use `bleed: .02–.04` on furniture fills; big bleeds stain light floors.

**Standard framings** (`camBegin(...)`) are in `STAGE`: `playground.wide` [1500, 560, .75], `stable.wide` [960, 540, .8], `arena.wide` [1600, 580, .62], `garage.wide` [1800, 560, .7], `garage.elevator` [3300, 600, 1.2], `subway.wide` [1500, 560, .75], `platform.wide` [1500, 560, .7], `laserHall.wide` [960, 560, .72]. Cameras must drift, push or react; a dead camera reads as a bug.

## The view counter and the glitch (src/counter.js)
```js
VIEWCOUNT(t)            // the count at t: { str, neg, bits, red, rate }. ONE number for the whole film: never fake your own
counterHUD(t)           // the corner HUD (top right, bounces on milestones). Call it in EVERY shot (after camEnd(), before
                        // your transitions), from 1.5 s in c01 to the end, unless your shot shows the counter big
viewCounter(t, { x, y, h, world, alpha, pop, glitch, rot })   // a big or diegetic counter (h = panel height in px; world:
                        // true draws it in world space inside a camera, e.g. a billboard in the sky)
MILESTONES              // [[t, label]]: 9.45 first view · 67.06 1,000,000 · 151.09 1,000,000,000 · 195.39 max · 195.54 overflow · 196.545 reboot
GLITCH = k              // set during a frame (0..1): the finished frame gets sliced, colour-split and inverted
paperWipe(p, seed)      // the paper-blizzard transition (p 0 -> .5 covers, .5 -> 1 uncovers)
T_OVF, T_BOOT, T_TAIL1, T_TAIL2   // 195.54, 196.545, 223.6, 225.35
```

## Other shared effects (src/fx.js)
- **Layers**: `paintLayer(name, fn)` + `showLayer(name, polys, o)`, for split screens and shaped reveals.
- **Light and shadow**: `castShadow(polys, o)`, `roomLight(dark, lights)`, `flick(t, seed, rate)`.
- **Marks**: `confetti(t, t0, o)`, `speedLines(cx, cy, r0, r1, n, col, seed)`, `screamRings(...)`.
- **The kit's own**: `glow`, `flash`, `iris`, `irisShape`, `brushWipe`, `letter`, `sfx`, `shakeXY`.

## Look and feel
- Bright, funny, bouncy, with a cute-cartoon gloss on everything. The palette arc is in STORYBOARD.md.
- The comedy is in the timing: the setup, a held beat, the payoff. One read at a time.
- Oppa is vain and ecstatic. Little Clawd is fierce. The Grannies are unhinged. The Rival is intense. The Horse is **deadpan**.
- Every transition belongs to the story (see the seams). Inside a chapter: cut on the beat, whip, match cut, flash or wipe.

## Seams: what each chapter hands to the next
| t | from → to | the handoff |
|---|---|---|
| 16.545 | c01 → c02 | **smash cut** on the bar-7 downbeat: c01 ends on the frozen `pointup` pose with the Horse peeking over the fence; c02 opens mid-strut in the stable |
| 31.091 | c02 → c03 | **paperWipe(p, 7)**: c02 calls `paperWipe((t - (31.091 - .45)) / .9, 7)` over its last 0.45 s; c03 calls `paperWipe(.5 + (t - 31.091) / .9, 7)` over its first 0.45 s |
| 52.909 | c03 → c04 | a cut on the bar-27 downbeat to the bridge-lot wide, Oppa mid-move (`tux`) |
| 69.273 | c04 → c05 | **flash**: c04 ends in a white-hot flash (`flash(k, '#FFF8E6')` with k reaching 1 at 69.273); c05 opens with the flash fading out over 0.25 s onto the arena formation, mid-gallop |
| 83.818 | c05 → c06 | a cut on the bar-44 downbeat (montage) |
| 98.364 | c06 → c07 | **whip pan RIGHT**: c06's last 6 frames smear right (speed lines); c07's first 6 frames arrive from the smear onto the garage strut |
| 112.909 | c07 → c08 | **the elevator doors**: c07 ends on `STAGE.garage.elevator` framing [3300, 600, 1.2] with the doors closed (`elevOpen: 0`, `elevFloor: 1`); c08 opens on the same framing with the doors sliding open (a DING) |
| 134.727 | c08 → c09 | **continuous**: the subway carriage, camera `STAGE.subway.wide` [1500, 560, .75], Oppa (`white`) at (1400, 900) u 24, the Pop Star at (1750, 900) u 22, both mid-dance |
| 151.091 | c09 → c10 | **the big counter**: c09 ends frozen with `viewCounter(t, { x: 960, y: 300, h: 150 })` showing 999,999,999; c10 opens with the same counter (same x, y, h) flipping to 1,000,000,000 and an explosion of confetti and fireworks, then reveals the platform |
| 165.636 | c10 → c11 | **continuous on the platform**: camera `STAGE.platform.wide` [1500, 560, .7], the line of nine at y 900, x = 780 + 180i (i = 0..8; Oppa `white` at i = 4, the Pop Star at i = 5), finishing the lasso |
| 180.182 | c11 → c12 | a hard cut on the bar-97 downbeat into the quiet bridge |
| 196.545 | c12 → c13 | **the red counter in black**: c12 ends on a black frame with `viewCounter(t, { x: 960, y: 540, h: 160, glitch: .5 })`, red and overflowed; c13 opens on the same frame (the Horse steps in) |
| 214.727 | c13 → c14 | **continuous in the laser hall**: camera `STAGE.laserHall.wide` [960, 560, .72]; Oppa (`party`, **bareEyes**) at (960, 900) u 24; the Horse upright in the shades at (1250, 900) s 16, mid-dance |

## World state (continuity)
| chapter | Oppa's look | the Horse | the counter |
|---|---|---|---|
| c01 | `beach` (playground) | peeks over the fence (15.2–16.5) | HUD 0 → 45 (the first view at 9.45) |
| c02 | `black` | THE Horse in a stall; other stalls have other coats | 80 → 1,500 |
| c03 | `tux` (storm), `sauna` (sauna), `tux` (bench) | the sauna (towel), the board game | → 60,000 |
| c04 | `tux` | walks out of the explosion | 1,000,000 at 67.06 (bounce) |
| c05 | `black` | the arena's back row, deadpan | → 25,000,000 |
| c06 | `black` (yoga), `white` (bus), `tux` (swan boat) | a bus seat, pink visor (`view: 'sit'`) | → 90,000,000 |
| c07 | `tux` | (optional: in the convertible's back seat) | → 260,000,000 |
| c08 | `black` (elevator), `white` (subway) | the elevator (carrot), the subway (a newspaper of scribbles) | → 720,000,000 |
| c09 | `white` | the subway, still reading | sticks at 999,999,999 (148.87) |
| c10 | `white`; the pool gag with `bareEyes` plus goggles | on the platform, waiting | 1,000,000,000 at 151.09 → 1.5 B |
| c11 | `white` | a "statue" in the square | → 2,000,000,000 |
| c12 | `tux` | in the frozen crowd staring at the sky counter | 2,147,483,647 → OVERFLOW (195.54) |
| c13 | `party`; gives his shades to the Horse → `bareEyes` | kicks the counter; dances upright in `shades` | 64-BIT reboot (196.545) → billions of billions |
| c14 | `party`, `bareEyes` | the lounger at dusk, `shades` | …806 → …807 (223.6) → OVERFLOW (225.35) |

## Look at it
```bash
node render.mjs --sheet=17,18.5,20,22 --cols=2 --w=960 --out=out/check/c2_a.jpg        # a contact sheet (video times)
node render.mjs --strip=29.8:30.4 --cols=6 --w=320 --out=out/check/c2_strip.jpg       # every frame of a moment
node render.mjs --sheet=20 --crop=700,300,600,500 --w=600 --out=out/check/c2_face.jpg  # full-res detail (screen px)
node render.mjs --loop=castdance --sheet=.3 --cols=1 --w=1920 --out=out/check/c2_ref.jpg   # the model sheets / recipes
```
- **Prefix your check images** with your chapter (`out/check/c7_*`).
- **Use compact images** (w 320–480 for strips) to save budget.
- **Open every image and look.** Check that the dance reads, the reads land, and the hits are on the beat. Check both seams frame by frame, that there's no stray text, and your ms/frame.
- Iterate until every shot is excellent.

## Your report
When you're done, reply with:
1. your shot list with start times, and what happens in each
2. what you checked and fixed
3. anything in a shared file that seemed broken or missing
4. the ms/frame of your heaviest shot
5. your exact final frame (for the next chapter's seam), and anything your neighbours need to know
