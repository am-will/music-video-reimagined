# Lessons learned (from the Papercut production)

Each of these cost real time once. Check this list before and during production.

## Timing
- **Onset times are biased by the analysis window.** Spectral flux on 93 ms windows put the Papercut grid 64 ms (1.5
  frames) early; every hit in every chapter looked slightly ahead of the sound until the audio was re-trimmed.
  `analyze_song.py` times frames at window centres and refines against sample-level attacks; `trim_audio.sh` verifies
  the result. Never skip the verification.
- **Compute times from sample counts.** A "10 ms" block at 22,050 Hz is 220 samples = 9.977 ms; indexing blocks as
  exact 10 ms drifts 0.23% (0.4 s by the end of a song).
- **The soundtrack must be exactly as long as the video.** The encoder uses `-shortest`, so a short WAV silently clips
  the ending. Pad with `apad=whole_dur=`.
- **Verify every musical assumption against the audio.** A stop-start riff's gap was assumed to end at beat 2.5; it
  ended at 3.3. Render a strip or read the per-bar energy before builders time scenes to it.

- **Tempo leveling can be off by 2×.** "Gangnam Style" auto-detected at 66 BPM (the half-note pulse). The analyzer
  now detects four-on-the-floor (kicks as strong on the odd double-tempo beats as on the even ones, and much stronger
  than the low end between them). Still sanity-check the level against the genre's feel.
- **Kick envelopes ripple.** A 50 Hz kick's 1 ms envelope has |sin| ripples every ~10 ms, so a phase search can lock
  onto a later ripple (+20–30 ms). Smooth the kick power over ~5 ms before measuring rises.
- **Pickups.** A vocal that starts before the first downbeat must be kept: trim to bar -1, and set `PROJECT.offset`
  to bar 0's video time.
- **Spectrogram axes.** A picture drawn at "20 px/s" from 86-frames-per-second data drifted 7.7% until columns were
  resampled to exactly 20 px/s. Wrong axes make section boundaries look misplaced.

## Rendering and tooling
- **render.mjs could hang on exit** after writing its output (fixed in the engine's render.mjs). Crashed builders
  also leave node and Chrome processes behind; before re-running, kill only the ones whose working directory is this
  project (`lsof -a -p <pid> -d cwd`). Other projects' renders may be running.
- **macOS has no `timeout` command.** Don't tell builders to use it.
- **Parallel renders share the GPU**, so ms/frame reads 2–3× higher under load. Judge performance on a quiet machine.
- **zsh doesn't word-split variables**: `for spec in "a 1 2"; do set -- $spec` passes ONE argument in zsh. Run such
  loops under `bash -c '...'`.
- **Global name collisions** with the engine (`VIEWS` is Clawd's key-view table) or p5 (`pop`, `image`, `tint`)
  break things silently or with odd errors. Prefix your globals.
- **p5 `image()` in WEBGL needs a p5.Graphics**, not a raw canvas. Draw motion graphics into
  `createGraphics(...).drawingContext`.
- **macOS ships bash 3.2**: no associative arrays (`declare -A` fails). Pass lists as arguments or use a python helper.
- **Rebalancing a frame render**: a `--frames` process builds its to-do list once at start and never re-checks it, so
  a second process on an overlapping range duplicates work. To rebalance, kill a process and restart it on narrower
  ranges; the restart skips finished frames.
- **`--crop` takes the final frame's screen pixels.** Several of today's crops missed their subject because the camera
  had moved. Compute the screen position (`toScreen`) or use `--crop-at` with world coordinates.

## Painting (p5.brush and the kit)
- **Watercolour fills bleed.** A dark oxblood couch left a pink stain on a cream rug. Use `bleed: .02–.03` on
  furniture, or a flat `wash` plus an inset darker wash.
- **Style variants leak.** The ink-style furniture still had gold and oxblood *fills* (only the washes checked the style
  flag), so red and gold patches showed in the dark world. Every colour in a styled prop must go through the switch.
- **Draw order hides things.** A drummer's arms and sticks were behind his kit in every chapter (fixed by splitting the
  kit into back and front parts), an ink pool was painted under the rug, and shadows vanished behind the couch or were
  washed out by lamp glows drawn later. Give scene functions hooks at every depth, and check a crop.
- A **partial `flash()` over dark mixes to mauve**. Fade out of flashes with a `glow()` bloom.
- The **lunchbox lid only renders in the front view**; screams from the side need a reverse angle.
- **Front-view arms above ~1.35 rad hide against the body**; raised gestures read at 1.1–1.25.
- **Blinks use the global T**, so a freeze-frame still blinks. Set `T` to the freeze time while drawing it.
- **Geometry helpers call `random()`**, which doesn't exist while a script loads. Calling them at file load time kills
  the whole chapter silently ("random is not defined").

## Design
- **Check silhouettes at the wide-shot size.** On the first pass a mohawk read as a crown, a hood as a TV frame,
  headphones around the neck as a moustache, and a collar as a bow tie. The model sheet is where these get fixed.
- **Props at arm tips hide behind the body** in the front view. Use `frontArm` to bring the arm across the face.
- **Dark-on-dark crowds disappear.** Rim-light or backlight them, and give them glowing eyes.
- **Two characters back to back merge into one blob.** Keep a gap or contrasting colours between silhouettes.
- **Small gestures need a strong silhouette.** A shadow's "shh" read weakly as a diagonal nub across its grin; as a
  vertical finger it was unmistakable.

- **Characters of a new species** (a horse, a dog) need their own rig built in the same style (flat wash, ink
  outline, boil). Give the star of that species a unique marking (the Horse's Claude-spark star) so it's identifiable in
  every cameo among extras of the same kind, which get different coats and no marking.
- **Hidden cameos**: a horse "in a stall" behind a half-door was invisible. Peekers must be placed so the face clears
  the occluder, or draw only the part that shows.

- **A continuous seam must lock the whole tableau, not just the camera and the leads.** On "Gangnam Style" the spec
  for a continuous subway seam gave the camera and the two leads' marks. Each builder then filled the carriage with
  their own riders: different people, sizes, bench height, a different Horse mark and pose, and even a different train
  speed, so the window streaks jumped. With the same camera it read as a glitch, and a viewer caught it at once. For
  every continuous seam, the later chapter must copy the earlier chapter's cast table verbatim for the handoff: every
  visible character's mark, size, view, dance phase and boil key, plus the set's parameters. Then re-cast its own
  events onto those same characters. Check the -1/+1 frames at full size, not only a strip.
- **A near-identical framing on both sides of a cut reads as a jump cut** (a glitch, not an edit). Either change the
  shot size or angle clearly, or make it one continuous camera move (the next shot starts from the previous shot's
  final camera, with eased velocity on both sides).

## Process
- **Usage limits can stop every builder at once.** Nothing is lost: resume each with `SendMessage` to its agent id
  after the reset, and ask for compact check images.
- **Seams drift when neighbours adapt to each other.** Two builders re-matched each other's seam twice. Lock seam specs
  in the guide, have builders write their exact final frame in their file header, and let the later builder match the
  earlier one's *actual* frame.
- **Relay handoffs.** A finished builder's spec for its neighbour (the exact camera and speed of a whip pan, a portrait
  that must stay whole) is only useful if the lead forwards it while the neighbour is still working.
- **Only the lead edits shared files**, always backward-compatibly, and then tells every running builder what changed.
- **Finishing after the builders stop.** Usage limits can stop every builder minutes before they finish. Their files
  keep everything written so far, so review what exists first: most chapters are usually done, and one or two have a
  placeholder shot. The lead can finish those directly. Builders that keep one function per shot, a header shot list,
  and shared helpers at the top of their file make this easy, so ask for that in the brief.
- **A frame-identical handoff.** When the next chapter opens on its own tableau (its own crowd layout), build the
  outgoing shot from *that chapter's* layout, poses, boil keys and camera. Copy its table into your file, and the
  seam frame matches exactly.
- **Delivery has limits.** 30 MB for remote file cards; scratch workspaces are deleted with the session; browsers
  can't upload large local files; tell the user where the final file is and copy it somewhere permanent.
