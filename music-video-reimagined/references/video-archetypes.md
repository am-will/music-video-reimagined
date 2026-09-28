# Adapting to the kind of music video

Every source video is different, so the pipeline stays the same (study → map → concept → foundation → team → review
→ render → deliver) but *what the foundation must contain* and *how chapters split* change with the video's type. Most
videos mix types; pick the one that carries the video and borrow from the others.

| type | examples of the form | build first (foundation) | how to split chapters | watch out for |
|---|---|---|---|---|
| **Band performance in a set** | Linkin Park "Papercut", countless rock videos | cast registry, one set with marks, a performance stager, standard framings | by song section | Instruments hiding arms; members hidden behind furniture; everyone bouncing in sync (offset them) |
| **One continuous take** | OK Go "This Too Shall Pass" (a Rube Goldberg machine), "I Won't Let You Down" (a drone shot) | ONE shared camera path (a spline keyed by time, in shared code) and ONE shared event timeline (when each domino falls) | by time, but every seam is mid-move: builders MUST use the shared camera and events | Seams are invisible, so the lead owns the camera and the chain; use fewer, longer chapters |
| **Choreography / dance** | PSY "Gangnam Style" (done: `assets/dance/dance.js`), Sia "Chandelier", Drake "Hotline Bling", LMFAO "Party Rock Anthem" | a **move library** (read `references/dance-videos.md`): each step studied from quarter-second sheets, beat-locked on the rig, checked on a move sheet; routines as tables in the guide; `crowdVar` for crowds | by song section, with the chorus routine identical in every chorus | The iconic move must be *recognisable* with nubs and stubby legs: prototype it first. Unison reads robotic, so add small offsets. Builders drift to gags, so make "the dance is the star" a hard rule |
| **Narrative short film** | Adele "Hello", Taylor Swift "Blank Space", Wiz Khalifa "See You Again" | locations as sets, props with state over time, costume changes as registered variants, a continuity table | by story beat (aligned to sections) | Acting over dancing; no speech bubbles or text: act everything; hold the emotional beats longer |
| **A visual-trick concept** | Gotye "Somebody That I Used to Know" (body paint merging into a painted wall), OK Go "The Writing's on the Wall" (optical illusions), Arctic Monkeys "Do I Wanna Know?" (animated soundwaves) | the **trick as a system**, proven in a recipe loop before anything else: it IS the video | by section, all sharing the trick's API | If the trick doesn't read in the first recipe, rethink the concept rather than polishing chapters |
| **Lyric / typography video** | the many official lyric videos | a visual metaphor per section: brush strokes, shapes and objects, never letters | by section | Text is forbidden here: translate each line's *meaning* into images, and never write the words |
| **Animated original** | Gorillaz videos, Tame Impala "The Less I Know the Better" | an entirely NEW cast in the Clawd world: keep the story beats and mood, invent every design | by section | Never reproduce the source's characters; they're copyrighted designs. Replace them with original ones |
| **Montage / everyone dances** | Pharrell "Happy" | a **cameo generator**: a small parts library (hats, hair, clothes, colours) with seeded variation, one gag per cameo, and a consistent lead | by section; the lead reappears to tie it together | A hundred cameos can look random: give the montage a through-line (a walk across town, a clock) |
| **Split screen / multi-panel** | duet videos, "two worlds" concepts | a panel layout helper on `paintLayer`/`showLayer` with rhyming compositions across panels | by section | Cost doubles per panel: keep each world lean and cull it |
| **Concert / stage** | tour-footage videos | a stage, a crowd system, light rigs cued to hits (strobes on snares, washes on pads) | by section | Crowd readability (rim-light a dark crowd); cue lights to the analyzer's hits |
| **Practical / stop-motion look** | handmade-effects videos | lean into the kit: hold drawings on twos (`onTwos`), paper cutouts, visible hands | by section | Keep the boil and holds consistent across builders (put `onTwos` in the guide) |

## Pacing by genre
- **Rock / punk**: cuts on the downbeat, jumps landing on snares, a big release at the climax.
- **Hip-hop**: rap hands on the beat, leaning into the lens, bars as units. The verse is the character's monologue, so
  give it a visual argument.
- **Pop**: clean choreography, colour, a clear chorus look that returns and escalates.
- **EDM**: the build is tension (strain, cracks, lights rising) and the drop is the device's biggest moment. Silence
  before the drop is a freeze.
- **Ballad**: slower cameras, longer holds, fewer cuts, and the acting carries it. Put the emotional turn on the key
  change or the final chorus.

## Casting variations
- **A solo artist**: the lead plus an ensemble (dancers, doubles, a love interest) built from the same registry.
- **A duet or feature**: register every performer; a guest appears for their verse, and their arrival is an event.
- **Artist plus producer or DJ**: give the producer a visible instrument (decks, a pad controller) and something to do
  on every drop.
- **Anonymous or masked artists**: the mask or costume is the whole identity; make its silhouette unmistakable.
