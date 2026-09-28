# Phase 5: team production (parallel chapter builders)

A 3–4 minute film is roughly 40–60 shots. One agent building them serially takes a very long time and burns its
context. Split the film into chapters and give each to a builder working in parallel, while you (the lead) own
everything shared and review everything.

## Split
- One chapter per song section (or two short sections), usually 12–30 s each, 6–10 chapters. Give a key ending (a
  silent twist, a final reveal) its own chapter.
- File per chapter: `src/ch/c<N>_<name>.js`, registered in studio.html in order. Each covers exactly `[start, next
  start)` using absolute times (`barT(k)`, `HIT.*`).

## Write the production guide (PROJECT_GUIDE.md)
Builders read it after the kit's ANIMATION_GUIDE.md. Adapt `assets/example-papercut/PAPERCUT_GUIDE.md`; it has every
section you need:
1. **Hard rules.** No lyrics anywhere (screen, comments, reports) and no text on screen. Only edit your own chapter
   file; report shared bugs instead of fixing them. Pure functions of t, seeded boil. Draw characters only through the
   cast API. The ms/frame budget.
2. **Time.** The song.js API and the section table.
3. **Cast API.** Every function and option, plus a one-line description of each design (so nobody "improves" a
   costume).
4. **Sets API.** `LAY` marks, hooks, lighting options, the stager and the **standard framings** table.
5. **The signature system.** The recipe code, pasted in.
6. **Look and feel.** The palette arc, the tone (creepy-but-cartoon, joyful…) and what never to do.
7. **Seams table.** For every boundary: exactly what the outgoing chapter ends on and what the incoming one opens on.
   Use world coordinates, camera framings, poses and the transition type. Seams are where parallel work breaks, so be
   specific.
8. **World-state table.** Per chapter: the state of every escalating motif (portrait stage, lighting, damage, which
   props are where). This is what keeps continuity across builders.
9. **How to check.** Render commands, with check images prefixed by chapter (`out/check/c4_*`) so builders don't
   overwrite each other.
10. **The report format.** Shot list with times, what they checked and fixed, shared-file issues, and ms/frame.

## Brief each builder
Launch all builders in **one message** (background agents), each with a self-contained brief. Use the strongest model
available; if the user said which model must do the work (e.g. "only Opus"), pass it explicitly (`model: "opus"`) on
every spawn. Template:

```
You are one of <N> animators building, in parallel, a hand-painted music video: <the Clawd reimagining of ARTIST's
"SONG">. The project lives at: <absolute path>
You own exactly ONE file: src/ch/<file>.js (currently a placeholder). It covers video time <start expr = s> → <end
expr = s>. Other animators are editing the other chapter files at the same moment, so never touch any file but yours.

## Read first (in this order)
1. ANIMATION_GUIDE.md  2. PROJECT_GUIDE.md  3. STORYBOARD.md (all of it, then your chapter's rows)
4. The source you'll call: src/song.js, cast.js, sets.js, fx.js, sheets_<project>.js (the recipes)
5. Render and LOOK at the model sheets and recipes (commands in PROJECT_GUIDE.md), saved under out/check/c<N>_*

## Absolute rules
- Never write song lyrics anywhere (screen, comments, report). No text on screen.
- Only edit src/ch/<file>.js; report shared bugs instead of fixing them.
- Pure functions of t; boilSeed() every element; characters only through the cast API; ≤ 3 s per frame.

## Your chapter: <name> (<start> → <end>)
Music: <what the music does, with the exact times of the bars, dropouts and hits in your range>
Shots (the direction; the craft is yours):
1. <t0–t1 · shot: what happens, the reads, the camera>
...
Seam in (<t>): <exactly what the previous chapter ends on>. Seam out (<t>): <exactly what you must end on>.
World state: <the motifs' states in this chapter>

## Quality bar
<what this chapter must achieve emotionally>. First write your detailed shot plan as a comment block at the top of your
file. Then build shot by shot; render sheets, strips and crops and LOOK at them (Read the images); iterate until each
shot is excellent. Check both seams frame by frame. macOS has no `timeout` command. When done, reply with the report
from PROJECT_GUIDE.md.
```

## While they work (the lead's job)
- **Only the lead edits shared files.** When a builder reports a shared bug, fix it in a backward-compatible way,
  re-render a quick check, and **message every running builder** (`SendMessage` to each agent id) saying what changed.
  Typical fixes: the draw order in a scene function, a helper that's wrong about the music, a colour leaking into
  another style, a render that hangs.
- **Relay cross-chapter requests.** When a finished builder hands off specs its neighbour needs (the exact camera and
  speed of a whip, a prop that must survive intact), forward them to the neighbour immediately.
- **If builders stop on a usage limit** (HTTP 429, "session limit"), their files stay as they were. After the limit
  resets, resume each with `SendMessage` to its agent id ("you were cut off by a usage limit; continue where you
  stopped"), and ask for compact check images to save usage. Before resuming, kill stuck render processes that
  belong to *this* project: check each one's working directory with `lsof -a -p <pid> -d cwd` and leave other
  projects' processes alone.
- **Prepare the audio mix and delivery scripts** while you wait.

## Review every chapter yourself
Builders review their own work, but you review for the *film*:
```bash
node render.mjs --sheet=<12-16 times across the chapter> --cols=3 --w=640 --out=out/check/main_cN.jpg
```
Check the story reads, that characters are on model, continuity with the world-state table, the energy on the beat,
and the transitions. Then check every seam with frames at −2, −1, 0, +1 and +2 around the boundary. Small fixes you
can make yourself once the builder has finished (e.g. Papercut's "shh" gesture was made vertical so it read clearly).
For larger ones, message the builder with specific, visual feedback.

## Continuous seams
When a seam is continuous (same place, same camera), the table must name **everyone visible** in the handoff frame, with
their mark, size, view and dance phase, plus the set's own parameters (a train's speed, a light's state). Or tell the
later builder to copy the earlier builder's cast table verbatim. Relaying only the camera and the leads isn't enough:
two builders will fill the rest of the frame differently.

## Review tools
- `scripts/seams.sh <t1> <t2> ...` renders a 7-frame strip across each seam. `scripts/stack.py out.jpg <strips...>`
  stacks several strips into one image, so you can check four seams per look.
- For a chapter: 12 evenly spaced frames at 480 px in 4 columns (`--sheet=<times> --cols=4 --w=480`). Render four
  chapters in parallel. That's enough to see the story, the models and continuity in one image per chapter.

## What it costs
Papercut: 9 builders, each about 0.5–0.7 M tokens and 15–45 minutes of wall time (plus a pause for a usage limit),
with the heaviest frames at 1–3 s. Tell the user up front that a full video is a multi-hour, heavy job.

"Gangnam Style" (3:47, a dance video) used **14 builders**, one per song section, since a dance film has more short,
distinct scenes. More builders finish sooner but make more seams: with over ~10, put every seam's exact camera
and character positions in the guide *before* launch, and give each builder the same routine tables so the
choruses match.
