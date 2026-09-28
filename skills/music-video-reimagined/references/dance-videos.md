# Dance videos: reproducing real choreography on the Clawd rig

When the source is a dance video ("Gangnam Style", "Chandelier", "Hotline Bling"…), the user almost always wants to
**see the actual dance**. The foundation then needs a *move library*: every signature step as a beat-locked pose
function, checked on a model sheet before anyone animates a scene. `assets/dance/dance.js` is the one built for
"Gangnam Style"; copy it and extend or retune it. The whole project is in `assets/example-gangnam/`: see how its
chapters stage the chorus routine (c05 the arena, c10 the platform line, c13 the finale).

## 1. Study the choreography frame by frame
Contact sheets at 2 s show *where* the dancing is; they can't show *what* the steps are. For every dance passage,
make quarter-second sheets (6 × 4 cells = 6 s each):
```bash
bash -c 'for spec in "chorus1 71.2 77.2" "post1 86 92" "final 199.8 205.8"; do set -- $spec;
  python3 scripts/contact_sheet.py ref/source.mp4 ref/sheets/d_$1 --step 0.25 --cols 6 --rows 4 --w 320 --t0 $2 --t1 $3; done'
```
(Run loops like this under `bash -c`: zsh doesn't word-split `$spec`, so `set -- $spec` silently passes one argument.)

For each passage write down:
- **the moves**, and for each: the stance, what the legs do on each beat, the arm shapes, and the body bounce
- **the count**: which moves repeat in 2-bar or 4-bar blocks
- **the relation to the music**: the drop, the hook, the post-chorus

Name every move in your own words and tie it to its section (the chorus routine, the post-chorus routine). The
"Gangnam" catalogue:
- **gallop**: a wide stance and a skip step (step on the beat, hop on the "and" with the other knee up), fists together
  at the belly holding the reins
- **lasso**: the gallop with one arm overhead circling
- **hipsway**: hands on hips, a step-touch
- **disco**: a diagonal point up, the other hand on the hip
- **vArms**
- **strut**: the swagger walk with a hand to the shades
- **windflap**: arms flung wide into the storm
- **hairslick**: the rival's move, hands smoothing the hair over the head
- **crawl**: down on all fours
- plus **pointup**, **crouch**, **shimmy** and **groove**

## 2. Map each move onto the rig
The front-view Clawd is a 10u-wide block. Its arms pivot at the body's edges (±4.9u, −4.5u) and are 2.2u long, and
it has four stubby legs at x −4, −2, 1, 3. So:
- **Hands together in front** (reins, clapping, prayer): stretch the arms (`armLen ≈ 2.3–2.4`), draw both in front
  (`frontArm: 'LR'`), angle them down into a V (`a ≈ π + .36` points from the shoulder to the belly centre), and put a
  fist at each tip (`fistHook`). A flat horizontal pair reads as a belt; a V reads as arms.
- **Bent arms** (hands on hips, a hand to the face, hands over the head): a short upper arm plus a forearm drawn from the
  arm-tip hook (`bentHook(angle, len, sleeveColour, handColour)`). **Derive the angles from the rig's geometry**; don't
  guess:
  1. The elbow = the pivot + the upper arm's direction × its length. In a raised arm, the root slides out by
     `.55 · clamp((|a| − .7) / .9)`.
  2. The target = the hip (±4.8u, −2.3u), the cheek (±3.6u, −6.2u) or the head top (±3u, −8.6u).
  3. The hook's angle = the elbow→target angle minus the upper arm's world angle.

  A sign error sends the forearms up instead of down. Check it on the move sheet.
- **Steps**: `legLift` per leg (0..1: a foot retracts; a knee-up is ~.8–1 on the free pair), `legSplay` for wide
  stances, and `dy`/`sq` for the bounce (up on the hop, squash on the landing).
- **Skip-step timing**: at a beat's phase f, lift the free leg with `sin(π·f)`-ish, peaking at ~0.55; bounce the body
  up on the "and" and land on the beat. Alternate the free pair every beat.
- **Props implied by the dance** (a lasso, reins, a microphone): draw them lightly as motion graphics (spinning rope
  arcs, speed lines) so the mime reads at cartoon speed.

## 3. Check the library before anyone animates
Make two loops in the project's sheets:
- `moves`: every move on a plain Clawd, in a grid, over one bar. Check each one reads as its real counterpart.
- `castdance`: the lead doing every move in costume, plus the ensemble doing the main move. Check sleeves, hands and
  hair still read.

Render 3–4 times across a bar (e.g. `--sheet=0.05,0.25,0.45`) to see the motion phases. Fix and re-render until a
viewer who knows the dance would recognise every move.

## 4. Choreograph with routines
- `routine(t, [[t0, 'gallop'], [t1, 'lasso', { side: -1 }], ...])` blends every numeric field for 0.12 s after each
  change, so moves flow without pops.
- **Write the song's routines into the production guide as tables**, e.g. the chorus = 2 bars gallop, 2 lasso,
  2 gallop, 2 lasso. Then every chapter's chorus matches the original's, and the choruses match each other.
- **Crowds dance in unison** (it's a group dance), but `crowdVar(i)` gives each dancer a tiny phase offset, an
  amplitude and a lasso side, so it's never a photocopy.
- **A new character type that dances** (e.g. a horse standing upright) should accept the same pose fields (`aL`,
  `aR`, `armLen`, `frontArm`, `legLift`, `legSplay`, `dy`, `sq`, `rot`, arm hooks), so `dance()` drives it too.

## 5. Make the dance the star on screen
Put this in the production guide, because builders drift toward gags and cutaways:
- Full bodies, the floor visible, the lead facing the camera: u ≥ 18 for the lead in a medium shot, ≥ 12 in wides.
- Hold a dance at least a bar before cutting away. Cut and whip on bar lines; drift the camera slowly while the
  steps land.
- Check strips at 24 fps to make sure the steps land on the beats (the hop on the "and", the landing on the beat).
- Give each chorus one wide of the whole formation and one medium of the lead, and repeat the formation across the
  choruses with an escalation (bigger crowds, new places).
