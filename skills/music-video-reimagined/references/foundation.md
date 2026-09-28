# Phase 4: the foundation (the lead builds this personally)

Everything consistent about the film lives here: character designs, sets, the signature effect and shared helpers.
Parallel builders can only stay on model if there is one source of truth for all of these that they draw through.
Never delegate it, and finish it before any chapter work starts.

## Project setup
```bash
git clone https://github.com/JohnHeibel/ClaudeAnimationBase.git <project> && cd <project> && rm -rf .git && git init -q
cp -R <skill>/assets/engine/src/*.js src/ && cp <skill>/assets/engine/render.mjs .     # engine upgrades (PATCHES.md)
npm install
```
In `studio.html`, load, in order: config, core, clawd, timeline, **song, fx, cast, sets**, the kit's sheets, your
`sheets_<project>.js`, then one `<script>` per chapter file (`src/ch/c1_*.js`…). Create placeholder chapter files up
front (each registers one labelled placeholder shot at its start time), so builders never have to touch studio.html.
Measure speed with `node render.mjs --sheet=...`; the log prints ms per frame.

Read the kit's `ANIMATION_GUIDE.md` first. Its rules (handmade, alive, one piece, no text, timing for the viewer,
transitions always) are the quality bar for everything here.

## cast.js: one registry, one entry point per character
Look at `assets/example-papercut/src/cast.js`. The pattern:
- A palette object for the film (`PC`).
- A registry (`BAND` / `CAST`): per character, its clay colours (`col`, `dk`, `lt`), proportions (`sx`, `sy`), legs
  (`legCol`, `legPat`), sleeves (`armCol`, `sleeve`, `armDeco`), clothes (`outfit`), hair or headwear (`head`), face
  pieces (`face`: glasses, beards, piercings) and default props (mic hand, instrument). All of it uses the engine's
  hooks, so clothes wrap round the drawn key views and ride on the lunchbox lid.
- `member(name, x, y, u, o)`: the ONLY way anyone draws that character. Pose and face options pass through, and
  design fields are filled from the registry.
- `mood(name, t, keys)` and `mfeel(name, emo, t)`: emotions that keep the character's own clay (`base` colours).
- `singing(t, style)`: mouth flaps ('rap' 'sing' 'belt' 'scream') so performances read without lip-sync.
- Props: mics that can be held to the mouth (`frontArm`, arm across the face), instruments drawn in body space with
  fake strum and fret nubs, sticks as arm hooks.
- Doubles, variants and creatures built from the same data (Papercut's `inkling({ of: 'mike' })` wears Mike's hair
  silhouette in ink).
- Silhouettes (`silPolys`) and a `wallShadow()` if shadows matter to the concept.

### Check it on model sheets
Make loops in `sheets_<project>.js` and render them at full width: every character front-on (plus variants), every
character in all five key views, close-ups of the key expressions (the scream, the grin), and every prop. Look at
each one and ask: **would a fan recognise who this is from the silhouette alone?** Fix readability problems now; they
multiply across every chapter otherwise. Real problems found on Papercut:
- A mohawk read as a crown (spikes with a flat base and dark outline). Fix: outline only along the top, bleach roots
  and dyed tips, fewer and taller spikes.
- A hood read as a TV frame. Fix: a rounded outer silhouette with a peak, and a rounded face opening.
- Headphones around the neck read as a moustache. Fix: moved onto the head, worn one-ear.
- A shirt collar read as a bow tie. Fix: two collar leaves pointing down.
- A mic held at an arm tip was hidden behind the body. Fix: `frontArm` with the arm across the face.
- Characters hidden behind furniture (a drummer behind the kit, a DJ behind the desk). Fix: raise their marks, and
  split props into back and front parts (cymbals behind the drummer, drums in front).

## sets.js: fixed places, fixed marks
Look at `assets/example-papercut/src/sets.js`.
- Everything in **world coordinates**, with a `LAY` table of positions: every piece of furniture and a mark for every
  character. Builders stage the cast on these marks so wide shots always match.
- Set pieces are functions with a style switch (Papercut's paper vs ink versions of the same furniture), cull
  themselves with `inView()`, and seed their boil with `boilSeed(key)`.
- A scene function that paints in depth order and calls **hooks** at each depth (`wall`, `behind`, `couch`, `joe`,
  `rob`, `floor`, `lit`, `front`), so builders insert characters and effects at the right depth without re-drawing the
  room.
- Lighting as parameters: lamp power, flicker, a cold colour shift, ambient falloff and full darkness with pools
  (`roomLight`), plus a `lit` hook for things that glow in the dark.
- **Standard framings** (camera centre and zoom for the wide shot, two-shots and each character's medium shot) that
  go in the production guide.
- A performance stager (`bandHooks(t, o)`) that puts the whole band on its marks, playing on the beat, with per-member
  overrides. It makes every "the band plays" shot consistent and cheap to write.

## The signature system
Whatever the concept's device is (Papercut: cutting the paper to reveal another world), build it as a reusable system
in fx.js or a project file, and prove it with a **recipe loop** before briefing anyone. Papercut's recipes: a wide
performance shot, lamp shadows that wake up, a slit revealing the Ink Side, a blackout with one pool of light, and a
full-frame tear. Builders copy recipes; they don't reinvent them.

## Performance budget
Aim for ≤ 3 s per frame on the heaviest shots (measured alone; under parallel load it can read 2–3× higher). The costs
are watercolour `fill` shapes, strokes and `glow()` calls (each flushes the brush). Keep crowds cheap (small `u`, no
extras) and cull everything that's off-screen.
