# Engine upgrades over the stock ClaudeAnimationBase

Copy these files over a fresh clone of https://github.com/JohnHeibel/ClaudeAnimationBase, then add
`<script src="src/fx.js"></script>` to `studio.html` right after `timeline.js`. They are drop-in: the stock demo renders
identically. If the upstream kit has moved on, re-apply the changes below by hand instead of overwriting.

## render.mjs
- **Force exit.** Headless Chrome sometimes hangs on `browser.close()` after the output is already written, which
  leaves node processes stuck (and parallel builders waiting forever). The last line races `close()` against 3 s,
  kills the process and exits.

## src/core.js
- `draw()` calls `resetFx()` each frame (if fx.js is loaded) so fx.js can reuse its pool of scratch canvases.
- `composite()` calls a global `postFx(c, t)` (if one is defined) after the frame and its lettering are composited and
  before the paper grain: a hook for full-frame 2D post effects (glitches, colour splits, vignettes). Keep them
  deterministic (seed from `Math.floor(t * 24)`).

## src/clawd.js (all options are optional; defaults behave exactly like the stock kit)
- **Costume hooks**, so a character can wear clothes without re-drawing Clawd:
  - `outfit(u, sw, V, J, jaw, col)`: painted over the body after its shading and before its outline, so clothes get
    the body's ink line. `V` is the current key view, so clothes can wrap round the side face in 3/4 views. `jaw` is set
    when the lunchbox lid is open (paint only below it). `col` is the body colour (for skin showing through a neckline).
  - `head(u, sw, V, lid)`: drawn in hat space after the hat (hair, hoods, headphones). Also drawn on the lunchbox lid.
  - `face(u, sw, F, V, lid)`: drawn in face space after the eyes and mouth (glasses, piercings, beards).
  - `legCol`, `legFar`, `legPat(x, y, w, h, isFar, u, sw)`: leg colours and a pattern hook (tartan, stripes).
  - `armCol` + `sleeve` (0..1): sleeves covering the arm's root; `armDeco(u, sw, which, layer)`: tattoos, wristbands.
  - `inkCol`: the outline colour for body, legs and arms (for dark characters drawn on dark grounds).
  - `mouthCol`: the colour inside the open lunchbox mouth (e.g. a red glow for a monster).
- **`frontArm: 'L' | 'R' | 'LR'`** draws that arm (or both) in front of the body: a mic held to the mouth
  (`aR ≈ π - 0.14` points the arm across the face), or both fists together at the chest (dance "reins").
- **`armLen`** (a number, or `{ L, R }`): arm length multiplier. Clawd's shoulders are at the body's edges (±4.9u), so
  hands meeting at the centre need `armLen ≈ 2.3`; bent arms are a short upper arm plus a forearm drawn from the arm-tip
  hook (see `assets/dance/dance.js` `bentHook`). The arm-tip hook also receives the arm length as a 5th argument.
- **`legLift: [4]`** (0..1 per leg: retracts a foot, for steps, skips and knee-ups) and **`legSplay`** (a number for a
  wide A-frame stance, or `[4]` per-leg foot offsets in u): the legs are drawn as slanted quads.
- **`draw` vs `drawOver`**: `draw` is now painted before the front arms (so an arm can overlap a held guitar); pass
  `drawOver: true` for the old behaviour (on top of everything).
- **New eyes**: `glow` and `glowRed` (shining slits with a real `glow()` halo, for creatures on dark grounds; `o.red`
  0..1, `o.eyeGlow`), and `none`.
- **New mouths**: `sing` (mid-note, top teeth), `belt` (a big shout), `jag` (a pale crescent grin with jagged teeth).
- **`emotions(t, keys, { base })`**: `base = { col, dk, lt }` keeps a custom-coloured character's own clay through the
  mood cross-fades (without it the cross-fade briefly reverts to the stock clay).

## src/fx.js (new; generic, no project palette)
- **Layers**: `paintLayer(name, fn)` paints a whole alternate world (first thing in a shot, outside any camera);
  `showLayer(name, polys, { feather, alpha, invert })` composites it through holes (screen-space polygons) at the
  current point in the draw order, so things painted later sit in front. This is how a "cut in the paper" reveals
  another world, and how split screens and shaped reveals work.
- `toScreenPts(pts)`: world → screen through the active camera (or the last one).
- **Papercuts**: `slitPts(a, b, w)` (a lens-shaped slit), `slitEdges(a, b, w)` (the cut paper's lips; WORLD points when
  called inside a camera), `tearLine(p0, p1, seed, rough)`, `sidePoly(line, corners)`, `tearEdge(line)`.
- **Light and shadow**: `castShadow(polys, { alpha, blur, col })` (a soft multiply shadow), `flick(t, seed, rate)`
  (deterministic lamp flicker), `roomLight(dark, lights)` (darkness over the frame with pools of light cut out).
- **Marks**: `screamRings`, `confetti`, `chalkMark` ('spiral' 'eye' 'tally' 'face' 'cross' 'arrow'), `speedLines`.

## assets/dance/dance.js (optional; for dance videos)
A beat-locked move library on this rig (`dance(move, t, o)`, `routine(t, keys)`, `crowdVar(i)`, `fistHook`, `bentHook`,
`lassoHook`), built for "Gangnam Style" (gallop with reins, lasso, hip sway, disco point, V-arms, strut, wind-flap,
hair slick, shimmy, point up, crouch, crawl, groove). Copy it into `src/` and load it after `timeline.js`; add or
re-tune moves for the new song's choreography (see `references/dance-videos.md`).

## Known engine limits (work around them, don't fight them)
- The lunchbox lid only renders in the front view.
- Arms raised past ~1.35 rad in the front view hide against the body (the root only slides 0.55u); raised gestures
  read best at 1.1–1.25.
- Blinks run on the global `T`, not the shot's time: for a freeze-frame, set `T` to the freeze time while drawing and
  restore it afterwards.
- Props culled with `inView()` use world x under the active camera; don't draw them at a local origin inside a
  `translate()` or they'll cull wrongly. Pass world coordinates.
- `ellPts/rectPts/rrPts` call `jit()` → p5's `random()`, which doesn't exist while a script file is loading: calling
  them at file load time throws "random is not defined" and silently kills that whole chapter. Only call them inside
  shots.
- A `flash()` at partial opacity over a dark frame mixes to mauve (pigment mixing). Fade out of a flash with a
  `glow()` bloom instead.
- p5 `image()` in WEBGL mode needs a p5.Graphics (`createGraphics`), not a raw HTMLCanvasElement ("Cannot read
  properties of undefined (reading 'width')"). Draw 2D graphics into `createGraphics(w, h).drawingContext`.
- Don't name your own globals after engine ones: `VIEWS` (Clawd's key views), `pop`/`push`/`image`/`tint` (p5). A
  local variable called `pop` breaks every `pop()` call in its scope ("pop is not a function").
- p5.brush watercolour `fill` bleeds beyond the shape (default bleed .1): a dark fill on a light floor leaves a pink
  stain. Use `bleed: .02–.03` on furniture, or a flat `wash` plus an inset darker wash for shading.
