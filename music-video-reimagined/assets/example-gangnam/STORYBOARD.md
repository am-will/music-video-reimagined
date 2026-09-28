# CLAWDNAM STYLE: the dance that broke the counter

**Logline:** A swaggering Clawd in a sky-blue tux catches a dance from a little kid in a sandbox. It spreads through the whole city, the whole world, and a view counter that climbs until it breaks the laws of 32-bit arithmetic. Through all of it, one horse remains deeply unimpressed... until the very end.

**The big idea.**
- **The song.** A comic boast about being the classiest guy around, delivered by someone whose luxury is obviously fake: sunbathing in a kids' sandbox, partying in a parking garage.
- **The spin.**
  - **The dance is contagious.** Everyone who sees it catches it: grannies, commuters, carousel horses, a traffic light, the Moon.
  - **The view counter.** A painted, odometer-style counter (the film's motion-graphics signature) tracks the spread. It climbs from 0 to 2,147,483,647 and **overflows**, a nod to the true story of this song's video breaking a 32-bit view counter.
  - **The Horse.** A deadpan chestnut horse with a Claude-spark star on its forehead. Humans doing a "horse dance" is beneath it, so it turns up in every scene, never dancing, visibly unimpressed. It kicks the broken counter back to life, and finally dances better than anyone.

**Homage** (each one reinvented):
- the fake beach that's a kids' playground
- the little kid dancer
- the stable
- the paper blizzard
- the sauna with the lamb-towel head
- the old men's board game
- the explosion walk-away
- the riding-arena horse dance
- the carousel
- the granny tour bus
- the parking-garage dance-off with the man in the yellow suit
- the elevator
- the subway
- the platform line dance
- the swimmer surfacing in goggles
- the toilet
- the laser-party finale
- the banner plane at the very start

**THE DANCE IS THE STAR.** In every chorus and post-chorus the Clawds do the real choreography on the beat, big and readable in full-body shots: the gallop with the reins, the lasso, the hands-on-hips sway, the disco point. See `src/dance.js` and "The moves" below.

**Text:** allowed and encouraged as *motion graphics*: the counter, the banner plane, a few painted sound effects, the elevator's floor numbers. **Never lyrics.**

---

## Cast (everyone via `member()`/`dancer()`/`horse()` in src/cast.js)
| Who | Look | Role |
|---|---|---|
| **Oppa** (`oppa`) | stout clay Clawd, glossy slicked-back black hair with a side part, **round tortoiseshell shades** (always), a sky-blue tux (`look: 'tux'`, his signature) or black tux / white shirt & khakis / white party jacket & maroon trousers / beach vest & pink shorts | the hero: swaggering, vain, a great dancer; spreads the dance |
| **Little Clawd** (`kid`, u ≈ 0.55 × Oppa) | black bowl cut, white tank, red legs, fierce | starts it all: dances first and best |
| **the Rival** (`rival`) | tall and lanky, black mushroom helmet hair, big white round shades, a yellow suit | dance-off opponent (garage), then a convert |
| **Elevator Guy** (`elev`) | topknot with a pink scrunchie, moustache, lime tee with a yellow badge, polka-dot shorts | the elevator's wild dancer |
| **the Pop Star** (`pop`) | long wavy rose-gold hair, lashes, gold hoops, pink sparkly top | Oppa's dance partner (subway, platform, finale) |
| **White Dancers** (`dancer`, v 0..n) | white dresses, black ponytail/bob/bun | the troupe (storm, arena, garage) |
| **Grannies** (`granny`, v) | tight perms, huge sun visors, oversized shades, flowery blouses, UV sleeves | the wildest dancers (bus, elevator, finale) |
| **Grandpas** (`grandpa`, v) | flat caps, wire glasses, white beards, white hanbok tops | the board-game bench |
| **the Sauna Boss** (`boss`) | big, bald, a towel rolled into a lamb head, dragon tattoos, a gold chain, a towel round the waist | sauna, elevator, finale |
| **Commuters** (`commuter`, v) / **Party crowd** (`crowd`, v) | suits & hair variety / costumes (taekwondo, hazard vest, chef, sailor, hero, tracksuit, nurse, baseball, hanbok, suit) | the contagion's spread / the finale |
| **THE HORSE** (`horse()`, coat chestnut) | deadpan half-lidded eyes, a cream **Claude-spark star** on its forehead (only it has one), a dark mane | the unimpressed skeptic in every scene, the hero of the ending. Other horses: coats bay / grey / black / palomino, no star |
| **the View Counter** (`counterHUD`, `viewCounter`) | a painted odometer: an eye icon and rolling digit wheels | tracks the spread; one continuous number (`VIEWCOUNT(t)`) |

## Motifs (each escalates and pays off)
1. **Who catches the dance:** a kid → Oppa → White Dancers → carousel horses → grannies → the rival → commuters → a whole train → the city → the world → the Moon → everyone at once. **Never the Horse**, until the end.
2. **The Horse's cameos:**
   - peeking over the playground fence
   - the stable (a deadpan stare-down)
   - the sauna (in a towel lamb-head)
   - playing the board game against a grandpa
   - walking out of the explosion cooler than Oppa
   - the arena's back row (the only one not dancing)
   - the granny bus (in a visor)
   - the elevator (eating a carrot)
   - the subway (reading a newspaper with no words, just scribbles)
   - the platform (waiting for a train)
   - a statue that turns out to be the Horse
   - staring at the counter
   - **the KICK**, then dancing upright in Oppa's shades
   - the final silent gag
3. **The counter** (`VIEWCOUNT(t)`, fixed):
   - 1 view on the Kid's first move
   - **1,000,000** at the explosion (67.06)
   - stuck on **999,999,999** through breath 2, then **1,000,000,000** on the drop (151.09)
   - ticks one view per eighth note up to 2,147,483,647 (193.8–195.39)
   - **OVERFLOW** to −2,147,483,648 in red at 195.54
   - **64-BIT REBOOT** at 196.545
   - spins toward 9,223,372,036,854,775,807; …806 at the cut, …807 at 223.6, **overflows again** at 225.35
4. **The sunglasses:** Oppa's round tortoiseshell shades are always on. At the finale he puts them on the Horse.
5. **The playground:** the opening and the ending (at dusk).

## Palette arc
Bright midsummer daylight (sky blue, sand, pink umbrella) → warm stable browns → white paper storm → cool river-bridge greys → the golden arena → pastel bus and river → fluorescent garage → the subway's blues → the platform's tiles → night → the laser hall's neon greens and cyans → glitch red → the playground again, at dusk (lilac and gold).

---

## Timing (video time)
First the soundtrack's pickup bar starts at 2.000; the vocal pickup starts at 2.285. **132 BPM**: BEAT 0.45455 s, BAR 1.81818 s. `barT(k) = 3.81818 + 1.81818·k`.

| section | bars | t | what the music does |
|---|---|---|---|
| cold open | — | 0 – 2.000 | silence |
| intro A | -1 – 2 | 2.000 – 9.273 | the hook chant over a sparse synth |
| intro B | 3 – 6 | 9.273 – 16.545 | the beat drops in (bar 3). Bar 6: the music drops out at ~15.18, two stabs at 15.35 and 15.69, a pickup at 16.09 |
| **verse 1** | 7 – 14 | 16.545 – 31.091 | rap, steady groove. Two-stab accent at 29.90 / 30.18 |
| pre-chorus A1 | 15 – 21 | 31.091 – 43.818 | a lift |
| pre-chorus B1 | 22 – 26 | 43.818 – 52.909 | louder |
| build 1 | 27 – 33 | 52.909 – 65.636 | rising, the loudest mids |
| breath 1 | 34 – 35 | 65.636 – 69.273 | the low end drops out 67.06–68.09 and 68.72–68.96 |
| **CHORUS 1 (the drop)** | 36 – 43 | 69.273 – 83.818 | the hook: THE HORSE DANCE |
| **post-chorus 1** | 44 – 51 | 83.818 – 98.364 | the second hook (hip sway, disco, V-arms) |
| **verse 2** | 52 – 59 | 98.364 – 112.909 | rap. Two-stab accent at 111.71 / 111.99 |
| pre-chorus A2 | 60 – 66 | 112.909 – 125.636 | |
| pre-chorus B2 | 67 – 71 | 125.636 – 134.727 | |
| build 2 | 72 – 78 | 134.727 – 147.455 | |
| breath 2 | 79 – 80 | 147.455 – 151.091 | dropouts 148.87–149.90 and 150.54–150.79 |
| **CHORUS 2 (the drop)** | 81 – 88 | 151.091 – 165.636 | THE HORSE DANCE again |
| **post-chorus 2** | 89 – 96 | 165.636 – 180.182 | |
| bridge | 97 – 105 | 180.182 – 196.545 | quiet breakdown; builds in bars 104–105; dropout 195.54–196.81 |
| **FINAL (the drop)** | 106 – 115 | 196.545 – 214.727 | the biggest drop. Two stabs at 197.17 / 197.51 |
| outro | 116 – 118 | 214.727 – 220.182 | the last chant, thinning. **HARD CUT at 220.182** |
| tail | — | 220.182 – 227.500 | silence: our ending |

## The moves (src/dance.js; each studied from the original)
| move | what it is | where the original uses it |
|---|---|---|
| `gallop` | **the horse dance**: a wide bent-knee stance and a skipping gallop (step on the beat, hop on the "and", the other knee up), both fists together at the belly holding the reins | every chorus: the arena, the platform, the finale |
| `lasso` | the same gallop with one arm overhead swinging a lasso (the loop spins once per beat), the other hand on the reins | alternates with `gallop` in 2-bar blocks in every chorus |
| `hipsway` | hands on hips, step-touch side to side, hips swinging | post-choruses (the arena, yoga, the bus) |
| `disco` | one arm flung diagonally up, pumping; the other hand on the hip | the bus, post-choruses |
| `vArms` | both arms up in a V, bouncing | ends of phrases, celebrations |
| `strut` | the swagger walk with a hand touching the shades | the verses (the garage, the stable) |
| `windflap` | arms flung wide, flapping, leaning into the wind | the paper storm |
| `hairslick` | both hands smoothing the hair back over the head, shoulders shimmying | the rival |
| `shimmy`, `pointup`, `crouch`, `crawl`, `groove` | a shoulder shimmy; a finger to the sky on accents; a wide deep crouch; hunkered low (the "on all fours" gag: a Clawd is always on all fours); a light bounce | accents, gags |

**The chorus routine** (in every drop; follow it): bars 1–2 `gallop`, bars 3–4 `lasso` (right arm), bars 5–6 `gallop`, bars 7–8 `lasso`. The post-chorus mixes `hipsway` (2 bars), `disco` (2 bars, then the other side), and `vArms` on the last bar.

---

## Chapters and shots
Each chapter is one file in `src/ch/`. Times are video time. The seams are specified exactly in PROJECT_GUIDE.md.

### c01_intro · 0 → 16.545 · midsummer daylight
- **0–2.0 (silence), the banner plane.** A little red propeller plane crosses a bright sky towing a painted banner reading **CLAWDNAM STYLE**. The counter HUD slides in top-right showing **0**.
- **2.0–5.64, close-ups.** Oppa lounging in his round tortoiseshell shades against a blue wave-pattern towel, the sun blazing, smug. He sips a drink through a straw.
- **5.64–9.27, the reveal.** Pull back: the "beach" is a **kids' sandbox** in a city playground (the slide, the swings, a bucket). Little Clawd stands beside the lounger, watching him.
- **9.27, the beat drops.** **Little Clawd DANCES**: a perfect gallop, then the lasso. The counter ticks: **1**. Oppa lowers his shades, impressed and a bit jealous.
- **~13.5 → 15.18.** Oppa vaults off the lounger and gallops beside the Kid, matching him. The counter ticks up.
- **15.18–16.09, the stop.** The music drops out. On the two stabs (15.35, 15.69) they hit a pose together (`pointup`). In the silence, **the Horse's head rises over the playground fence** behind them and stares, deadpan. A beat. Smash cut on bar 7.

### c02_stable · 16.545 → 31.091 · verse 1, warm browns
- Oppa (**black tux**) struts down the stable, rapping (`strut`, `singing(t,'rap')`), the camera dollying with him. Horses of every coat peek over the half-doors, their eyes following him, deadpan. Little Clawd trails behind, copying the strut.
- **The stare-down:** he stops at one stall: **THE Horse** (chestnut, the spark star), chewing hay. Oppa shows off a few bars of the gallop *at* the horse. The Horse doesn't blink. Chew. Chew. A fly lands on Oppa's shades. His confidence wobbles.
- **29.90 / 30.18 (the accent):** Oppa spins to the camera, finger guns on each stab, and struts out through the far door, into a wall of blowing paper.

### c03_storm · 31.091 → 52.909 · pre-choruses A1 + B1, white paper then a montage
- **A1, the paper blizzard (31.09–43.82):**
  - Oppa (**sky-blue tux**) strides toward us between two White Dancers into a howling storm of paper scraps (`windflap`, jacket flapping).
  - The scraps stick to him until his suit and face are speckled white.
  - Gag: he opens his mouth to sing and a sheet of paper slaps over his face. He peels it off without missing a beat.
  - The storm grows; the Dancers' hair streams sideways.
- **B1, the montage (43.82–52.91): hard cuts on the bar lines.**
  - **The sauna:** Oppa in a towel beside the Sauna Boss (lamb towel), both sweating. On Oppa's other side sits **the Horse** in its own towel lamb-head, one sweat drop.
  - **The board-game bench:** two grandpas at a board game (a grid and round pieces, no writing) on a riverside bench. Oppa sits down cool beside them. The grandpa's opponent is **the Horse**, pondering a move with its hoof.
  - A quick gag of your choice (a tennis court?) to finish the phrase.

### c04_explosion · 52.909 → 69.273 · build 1 + breath 1, river-bridge greys
- **The build:** an empty dirt lot by a huge river bridge. Oppa's solo dance grows bigger with the music: `pointup` on accents, the reins, side swings, `disco`. The contagion starts: a jogger stops and copies him, pigeons start bobbing on the beat. The camera pushes in with the build.
- **The breath (65.64–69.27):**
  - At **67.06** (the dropout) a HUGE painted explosion blooms behind Oppa. He walks toward us in slow motion, cool, not flinching, as debris cartwheels past.
  - The counter hits **1,000,000** with a pop.
  - Behind him **the Horse walks calmly out of the explosion**, even cooler.
  - At 68.72–68.96 (the second gap): a freeze. Flash on the drop.

### c05_arena · 69.273 → 83.818 · CHORUS 1, gold
- **THE HORSE DANCE.** The indoor riding arena. Oppa (**black tux**) front and centre, rows of White Dancers, everyone doing **the chorus routine** exactly on the beat: wide shots of the full formation, and medium shots of Oppa.
- Riders on horses line the back; **the Horse stands among them, deadpan, the only one not dancing.**
- **The carousel** (a cut on a bar line): the painted carousel horses come alive and do the horse dance on their poles while their riders cling on.
- Back to the arena for the last 2 bars, then out.

### c06_montage · 83.818 → 98.364 · POST-CHORUS 1, pastels
Fast cuts on the bar lines, dancing the whole time:
- **Riverside yoga:** a class on mats in "cat pose". For a Clawd that's just... standing, and the class looks pleased with itself. Oppa does the `hipsway` over them.
- **The granny tour bus:** Oppa (**white shirt & khakis**) dancing down the aisle of a party bus with the Grannies going wild (`disco`, `vArms`, visors bouncing). **The Horse sits in a seat wearing a pink sun visor**, deadpan. A granny tries to make it dance; it doesn't move.
- **The swan boat:** Oppa pedals a swan pedal-boat on the river, dancing.

### c07_garage · 98.364 → 112.909 · VERSE 2, fluorescent
- **The strut:** Oppa (**sky-blue tux**) struts through the parking garage between White Dancers (`strut`, hand to the shades).
- **The Rival:** he rises out of the red convertible. A **dance-off**, trading moves on the bar lines:
  - the Rival's `hairslick` and `shimmy`
  - Oppa's `hipsway`
  - the Rival's `crouch`
  - Oppa's `lasso`
- **111.71 / 111.99:** both freeze in the same pose. The Rival, beaten, breaks into the gallop himself: converted.

### c08_elevator · 112.909 → 134.727 · pre-choruses A2 + B2
- **A2, THE ELEVATOR (112.91–125.64):**
  - Oppa squats in the elevator, rapping.
  - On each ding the doors slide open on escalating chaos, while the floor indicator counts up:
    1. Elevator Guy dancing wildly over him (fists and knees pumping)
    2. the car crammed with dancing Grannies
    3. the Horse alone, deadpan, eating a carrot
    4. everyone at once (the Rival, the Kid, the Boss…)
- **B2, THE SUBWAY (125.64–134.73):**
  - A subway carriage. Oppa (**white shirt & khakis**) and the Pop Star.
  - The commuters catch the dance one after another down the car, like dominoes.
  - The Horse holds a handle, reading a newspaper that has only scribbles.

### c09_billion · 134.727 → 151.091 · build 2 + breath 2
- **The build:** the whole carriage is dancing, commuters hanging off the handles, the car rocking. Oppa and the Pop Star dance face to face. The counter races: 900,000,000… 999,999,990.
- **The breath:**
  - The counter **sticks at 999,999,999**. The music drops out, and everyone freezes and stares up at the counter (make it big).
  - Little Clawd, riding on a seat, does ONE tiny lasso…
  - **151.09: 1,000,000,000!** Confetti and fireworks burst inside the train.

### c10_platform · 151.091 → 165.636 · CHORUS 2, blue tiles
- **THE PLATFORM LINE DANCE:** a line of nine (the Pop Star, Oppa, commuters, White Dancers) doing **the chorus routine** in sync, big and readable. The 1-billion confetti is still falling.
- **The swimmer gag:** Oppa surfaces in a pool in **swimming goggles** (`roundShades` style 'goggles'), deadpan, then sinks.
- **The Horse** waits for the train at the platform edge, deadpan.

### c11_global · 165.636 → 180.182 · POST-CHORUS 2: the world catches it
- **The "down on all fours" gag:** the choreography says get down on all fours. The Clawds shrug: they already are. They hunker and wiggle (`crawl`).
- **The global montage** (cuts on the bar lines):
  - a pedestrian crossing: the little walking figure on the signal starts **galloping**
  - a statue in a square does the lasso (and one statue is the Horse, which is not a statue)
  - a spinning globe with dancing Clawds popping up everywhere
  - satellites, and **the Moon** doing the gallop
- The counter heads for 2,000,000,000.

### c12_overflow · 180.182 → 196.545 · BRIDGE, night, then glitch red
- **The breakdown:**
  - Quiet. Oppa sits on a **toilet** in a tiny restroom, still in his tux, watching his own dance on a phone, grinning. He presses replay: each press is a view.
  - A giant counter looms over the night city like a billboard.
- **The build (bars 104–105), one tick per eighth:**
  - Views 641, 642… 647. The whole frozen city stares up at the sky counter, with **the Horse among them**.
  - Oppa hovers over replay… presses it once more…
- **195.54, OVERFLOW:**
  - −2,147,483,648 in red, and the world **GLITCHES**: frames slice, colours invert, dancers freeze mid-gallop.
  - Silence (the dropout), then black with the red number flickering.

### c13_party · 196.545 → 214.727 · FINAL, neon
- **196.545, the kick:** out of the glitch-black, **THE HORSE** steps up to the broken counter, turns, and **back-kicks it** with both hind hooves. KA-BOOM: it **reboots as 64-BIT** (gold, new wheels slide in).
- **The laser-hall party:** the world snaps back into the ultimate party. EVERYONE from the film does **the chorus routine** under the lasers:
  - Oppa (**party look**), the Pop Star, the Kid
  - the Rival, Elevator Guy
  - Grannies, Grandpas, the Boss
  - White Dancers, commuters, the costumed crowd
- **The surprise:** Oppa takes off his shades and puts them on **the Horse**. The Horse rises **upright** and dances the horse dance better than anyone. The crowd parts in awe, and Oppa bows. The counter spins wildly toward 9 quintillion.

### c14_ending · 214.727 → 227.5 · outro, then silence at dusk
- **The outro:** the final chant: everyone's last big poses, and the camera pulls back over the whole party. The counter slows to …806.
- **220.182: the song CUTS DEAD.** Smash cut to silence.
- **The tail, the playground at dusk** (rhyming with the opening):
  - The empty sandbox, the pink umbrella, the lounger. **The Horse** reclines on the lounger in Oppa's shades, sipping his drink.
  - The small HUD reads 9,223,372,036,854,775,806.
  - The Horse glances at us, then does ONE tiny lasso twirl with a hoof: …807 (223.6).
  - It looks at the counter, at us, and smirks. One more twirl…
  - **225.35: OVERFLOW** to −9,223,372,036,854,775,808 in red, glitching.
  - The Horse's eyes widen: uh-oh. **CUT TO BLACK** ~226.6, held to the end.
