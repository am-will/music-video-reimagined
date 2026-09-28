# PAPERCUT: production guide for chapter builders

You're building **one chapter** of a hand-painted music video: the Clawd band's version of Linkin Park's "Papercut", about 192 s long. Read these first, in this order:

1. `ANIMATION_GUIDE.md`: the kit's rules (medium, boil, timing, the animation principles, transitions). Everything there applies here.
2. This file: the project's shared code, rules and seams.
3. `STORYBOARD.md`: the whole film. Read all of it for context, then study your chapter's rows closely.
4. The model sheets (render them yourself, see "Look at it"): `band`, `turns`, `faces`, `parlor`, `inkside`, `props`, and the recipes `r_shadows`, `r_slit`, `r_dark`.

## Hard rules

- **No lyrics, anywhere.** Not on screen, not in code comments, not in your report. Refer to the music only as "verse", "chorus", "the scream bar" and so on. **No text on screen at all** (see ANIMATION_GUIDE rule 2): chalk marks are spirals, eyes, tallies and little faces, never letters.
- **Only edit your own chapter file**, `src/ch/<your file>.js`. Everything else is shared and read-only: core.js, clawd.js, timeline.js, song.js, fx.js, cast.js, sets.js, sheets*.js, studio.html, render.mjs. If you need a helper, write it inside your chapter's IIFE. If you find a real bug in a shared file, don't fix it: describe it in your report.
- **Cover your time range exactly.** Register your shots with `shots([[t0, fn], ...])`. Your first shot starts at your chapter's start time and your last shot runs until the next chapter's start. Use absolute video times (`barT(k)`, `beatT(k, b)`, `HIT.*`), never times relative to your chapter.
- **Pure functions of t.** No state between frames and no `Math.random()`. Use `hash(i)` for stable randomness, and call `boilSeed(key)` before each separate element you paint. The shared functions seed themselves.
- **Stay on model.** Band members are always drawn with `member()` / `seated()` / `bandHooks()`, and the Ink with `inkling()` / `bigFace()`. Never re-draw them by hand, and never change their colours or clothes.
- **Budget:** aim for ≤ 3 s per frame (the render log prints ms/frame). The wide parlor with the full band costs about 2.3 s. Two-layer papercut shots paint the world twice, so keep those lean.

## Time

The song's first hit lands at t = 2.000. `BEAT` = 0.7993 s (the quarter note of the half-time groove), `EIGHTH` = 0.3997 s and `BAR` = 3.1972 s.

- `barT(k)` is when bar k starts, and `beatT(k, b)` is beat b (0–3, fractions allowed) of bar k.
- `SEC.*` and `HIT.*` hold the song map (see `src/song.js`).
- `pulse(t)` is 1 on every quarter beat and then decays; `pulse2(t)` does the same on eighths. `bpOf(t)` is the beat position and `beatN(t)` the integer beat.
- Put hits on beats and cuts on bar lines (or on a strong beat). Big changes land on downbeats.

## The cast (src/cast.js)

```js
member(name, x, y, u, o)   // name: 'chester' 'mike' 'brad' 'rob' 'joe' 'phoenix'; (x, y) = the floor point between the feet
seated(name, x, u, o)      // on the couch cushion (Brad and Phoenix sit there): legs tucked, no shadow
mood(name, t, keys, opts)  // = emotions() with the member's own clay kept through the cross-fades. ALWAYS use this for members
mfeel(name, emo, t, over)  // = feel() with the member's clay
singing(t, style, k)       // mouth flaps: 'rap' | 'sing' | 'belt' | 'scream' (opens the lunchbox lid, teeth and all)
```

`o` takes any `clawd()` option (pose, view, face, emote, hooks…), plus:
- `mic: 'L' | 'R' | false` (Chester and Mike default to `'R'`). `micAt: 'mouth'` (default; front view only: the arm crosses in front and holds the mic to the mouth) or `'up'` (the arm holds the mic out, pointing up; use this for gestures and non-front views). `micBob` adds a small wobble to the mouth arm.
- `inst: false` hides the instrument (the guitar or bass, the mic). `strum` is the strumming phase (e.g. `bpOf(t) * 2`).
- Chester only: `glasses: false` takes his glasses off (draw them in his hand with `glassesProp(u, sw)` in an arm hook).
- `frontArm: 'L' | 'R'` draws that arm in front of the body.
- Joe stands behind the desk and Rob sits behind the kit: pass `noShadow: true, noLegs: true`. Rob holds sticks with `armL: stickHook(swing), armR: stickHook(swing)`.
- Sizes (u): a wide band shot is 15–19 (at camera zoom ~0.8), a medium shot 22–30, a close-up 40–70, an extreme close-up 90+.

**Designs** (don't change them): Chester has a bleach mohawk with red tips, black glasses, a lip ring, flame tattoos, a black tank top and red tartan legs. Mike has black spikes with blue and red tips, a charcoal shirt and olive legs. Brad has a grey hood, red headphones, curls, jeans and a sunburst acoustic. Rob has a shaggy brown mop, a goatee, a violet shirt and sticks. Joe has a black flat-top, one-ear DJ headphones and a maroon shirt. Phoenix has a buzz cut, a goatee, a brown sweater with a red stripe and a natural-wood acoustic bass.

**The Ink**, the band's dark doubles, and the ink face in the paper:
```js
inkling(x, y, u, { of: 'mike', red: 0..1, grin: 0..1, drip: 0..1, eyes: 'glow', lid, mouth, ...any clawd option })
bigFace(cx, cy, s, t, { open, lookX, lookY, grin, scream, red })   // the Face: ~20s wide; eyes 5s tall
```
With `of`, an Ink wears that member's silhouette (mohawk and glasses, spikes, hood and headphones…).

**Props and extras:**
- `portrait(x, y, s, t, { stage: 'stern'|'look'|'grin'|'bleed'|'ink', lookX, lookY, swing, grin, bleedK })`: `parlor()` draws it at `LAY.portrait`; pass the options as `parlor({ portrait: {...} })`.
- `dragonfly(x, y, s, t, { rot, flap })` · `inkAnt(x, y, s, t, heading)` · `damask(x, y, style, open, {lookX, lookY})`.
- `micProp`, `guitarProp`, `stickHook` are there if you need them.

**Shadows on the wall:**
```js
wallShadow(name, x, y, u, pose, { k: 1.4, dx: -150, wallY: 700, alpha: .42, blur: 4, eyes: 0..1, grin: 0..1, red })
shadowMap(x, y, { k, dx, wallY })   // the same world->wall mapping, to place your own marks on a shadow
silPolys(name, x, y, u, pose)       // raw silhouette polygons (world space)
```
`pose` is the **shadow's** pose, so it can lag, freeze, turn, or grin while the member does something else. Call it in the `floor` hook just **before** drawing the member, so the shadow falls across the furniture behind them (as in the `r_shadows` recipe), or in the `wall` hook to keep it on the wallpaper only.

## The sets (src/sets.js)

`LAY` holds every position (world coordinates, y down): the wall runs y 40–800 (the rail is at 600) and the floor from 800. Marks: `LAY.joe`, `LAY.rob`, `LAY.brad`, `LAY.phoenix` (on the couch), `LAY.mike` [1560, 968] and `LAY.chester` [2250, 972] (the frontmen on the rug), `LAY.portrait` [1935, 318], `LAY.couch`, `LAY.desk`, `LAY.drums`, `LAY.lampA` / `LAY.lampB` (floor lamps), `LAY.lampDesk`, `LAY.statue`, `LAY.doorsL` / `LAY.doorsR`, `LAY.palm`.

```js
parlor(t, {
  hooks: { wall, behind, couch, joe, rob, floor, lit, front },   // called at each depth (see sets.js)
  lamps: 1 | { a, b, desk, sconce },   // 0..1 power per lamp
  flicker: 0..1, cold: 0..1,           // troubled lamps · sickly cold light
  ambient: .22, dark: 0..1,            // lamplight falloff · extra darkness (1 = blackout; the lamps that are on keep their pools)
  lights: [[x, y, r, k], ...],         // extra pools of light (world)
  eyes: (i, j) => ({ open, lookX, lookY }),   // wallpaper motifs opening into eyes
  portrait: { stage, lookX, ... }, peel: 0..1, ink: 0..1, breath: -1..1, swing: 0..1,
  spin, arm: [a, b],                   // turntable records, tonearms
  drums: drumHits(t)                   // cymbals and heads react
})
bandHooks(t, { style: { mike: 'rap'|'hype'|'idle', chester: 'sing'|'belt'|'scream'|'idle' }, energy, u, over: { chester: {...} }, skip: ['mike'], extra: { wall, lit, front, ... }, floorBefore, floorAfter })
inkSide(t, o)          // the mirrored Ink Side, same hooks; things sit at mirrored x = 2*LAY.mirror - x
roomLight(dark, lights, o)   // darkness with pools of light, if you need it outside parlor()
```

**Standard framings** (use them so chapters match):

| framing | camera |
|---|---|
| WIDE band | `camBegin(1720, 560, .82)` |
| frontmen two-shot | `camBegin(1900, 620, 1.25)` |
| Mike medium | `camBegin(1560, 760, 1.9)` |
| Chester medium | `camBegin(2250, 760, 1.9)` |
| Joe at the decks | `camBegin(760, 560, 1.7)` |
| Rob at the kit | `camBegin(1290, 620, 1.8)` |
| couch (Brad and Phoenix) | `camBegin(1935, 600, 1.5)` |
| portrait close | `camBegin(1935, 318, 2.4)` |

Cameras must drift, push or react. A dead camera reads as a bug.

## Papercuts, the video's signature (src/fx.js)

The world is painted on paper, and a papercut is a slit *in that sheet*. Through it you see **the Ink Side**.

```js
paintLayer('ink', () => { camBegin(...); inkSide(t, {...}); camEnd(); });   // FIRST thing in the shot, outside any camera
camBegin(...);
parlor(t, { hooks: { floor: () => {
  showLayer('ink', [toScreenPts(slitPts(a, b, w))], { feather: 1 });   // the hole (screen space)
  slitEdges(a, b, w);                                                  // the cut paper's lips (WORLD space inside a camera)
  member(...);                                                         // characters in front of the cut
} } });
camEnd();
```
- `slitPts(a, b, w)`: a lens-shaped slit from a to b, with half-width w at its middle.
- `tearLine(p0, p1, seed, rough)` + `sidePoly(line, corners)`: a torn edge and the polygon on one side of it, for splitting the frame. `tearEdge(line)` paints the torn fibres. See the `fx` loop in sheets_pc.js.
- The layer can hold *anything*: the Ink Side, a black void, the Face. Paint what should be behind the paper.
- Order matters: a slit drawn in the `wall` hook sits behind the furniture; drawn at the start of the `floor` hook it cuts across the furniture but stays behind the people. After everything, it cuts through the whole frame.
- Other marks: `screamRings(x, y, age, s, o)`, `confetti(t, t0, o)`, `chalkMark(kind, x, y, s, seed)`, `speedLines(...)`, `flick(t, seed, rate)` (lamp flicker), `castShadow(polys, o)`, plus the kit's `glow`, `flash`, `iris`, `irisShape`, `brushWipe`.

## Look and feel

- Warm lamplight and cream paper at the start, getting colder and greener as the paranoia grows (`cold`, `flicker`). The Ink Side is indigo-black with bone chalk. Red is saved for the Ink's anger, Chester's scream and the bridge.
- The frontmen are the stars: keep them big and readable. Something happens in every shot, on the beat.
- The Ink is creepy but it's still a cartoon: it copies, lags, grins, leans in. Play the dread with timing, not with gore. No blood; ink only.
- Transitions at every seam (see the seams below). Inside your chapter, choose ones that belong to the story: a push through a slit, a cut on action, a whip, a match cut, a tear.

## Seams: what each chapter hands to the next

| t | from → to | the handoff |
|---|---|---|
| 0 | open | from black: a table lamp flickers on |
| 24.381 | c1 → c2 | c1 ends on a push-in on Mike at `LAY.mike`, front view, as he raises his mic to his mouth. **Cut on action:** c2 opens on Mike, mic at his mouth, starting to rap (Mike medium framing or tighter) |
| 49.958 | c2 → c3 | c2 ends on the frontmen two-shot, Mike and Chester back to back, frozen, with a razor-thin line of light across the wall behind them from **(1250, 360) to (2600, 250)** (world). c3 opens on the same framing and the line **bursts open** into a gash along the same line on the downbeat |
| 62.747 | c3 → c4 | c3 pushes into the grinning portrait (stage 'grin') and closes an iris on the grin: black at 62.747. c4 opens from black with an iris opening on Mike |
| 88.325 | c4 → c5 | c4 ends in a blackout with the Face's jagged grin of light in the middle of the frame. c5 opens with that light becoming the Great Slash: a bright diagonal from screen (-100, 1000) to (2020, 80) that splits the frame |
| 113.903 | c5 → c6 | c5's shards fall away to show the darkened parlor (ink pooled on the floor `ink: .5`, walls peeled `peel: .7`, the Ink now sitting in the portrait: stage `'ink'`), with Mike front and centre in camera `(1720, 640, 1.1)`. c6 opens on the same framing |
| 136.284 | c6 → c7 | c6 pushes in on Chester's determined face while cracks race out to the frame edges, then a **cream flash** at 136.284. c7 opens out of the flash with the paper tearing apart |
| 161.861 | c7 → c8 | c7 ends with a fast **whip pan** left (smear) on the last 0.25 s. c8 opens mid-whip and lands on Mike |
| 185.95 | c8 → c9 | the last big hit is at 184.46 (after 184.26, and then 184.65): all six jump and the frame freezes in mid-air while the band rings out, then a **smash cut** to silence at 185.95 |
| 192.4 | end | the lamp clicks off, to black |

**The state of the world** (keep it consistent with your neighbours):

| chapters | portrait | light | extras |
|---|---|---|---|
| c1 | 'stern'; eyes follow the camera in the dolly ('look') | warm | a hairline cut in the wallpaper near where Chester stands in the dolly |
| c2 | 'look' | warm, then colder (`cold` up to .3, `flicker` .2) | wall eyes, ink ants |
| c3 | 'look', then 'grin' at the end | ink violet spills in | papercuts on the bodies |
| c4 | 'grin', then 'bleed' | colder and greener (`cold` .5, `flicker` .4) | `peel` up to .8 |
| c5 | 'bleed', then the Ink sits in the frame ('ink') | split warm / ink | `ink` pool .5 by the end |
| c6 | 'ink' | strobe blackouts, then darkness, then red | `peel` .7, `ink` .5 |
| c7 | (the parlor is torn apart: the band plays on a torn island of floor in the void) | warm island, ink void | Inks all around |
| c8 | back to 'stern' when the room repairs | warm, blazing at the end | confetti |
| c9 | the Ink in the ruff collar ('ink') | calm warm | the shadows are awake |

## Look at it

```bash
node render.mjs --sheet=24.5,25.2,26,27.5 --cols=2 --w=960 --out=out/check/c2_a.jpg     # contact sheet (times are video times)
node render.mjs --strip=29.6:30.3 --cols=6 --w=320 --out=out/check/c2_strip.jpg         # every frame of a moment
node render.mjs --sheet=26 --crop=700,300,600,500 --w=600 --out=out/check/c2_face.jpg    # full-res detail
node render.mjs --loop=band --sheet=1 --cols=1 --w=1920 --out=out/check/band.jpg         # model sheets and recipes
```
Name your check images with your chapter prefix (e.g. `out/check/c4_...`) so they don't collide with other builders'. Open every image and look. Check reads, timing (count frames at 24 fps), motion, boil, contacts, transitions at both of your seams, and that there's no text anywhere. Iterate until every shot is charming, readable and alive. Budget: a sheet for every shot, a strip for every key motion and seam, and a crop for every face that carries the story.

## Your report

When you're done, reply with:
1. your shot list with start times, and what happens in each;
2. what you checked (the sheets you looked at) and what you fixed;
3. anything in a shared file that seemed broken or missing;
4. ms/frame for your heaviest shot.
