# PAPERCUT — a Clawd band music video: storyboard

**Logline:** Six Clawds rehearse in a painted Victorian parlor, but something lives on the *other side of the paper*. Every time the paper gets cut, the ink face behind it comes nearer, until the band learns it has been wearing their shadows all along.

**The big idea.** Our cartoon is painted on paper, so a *papercut* is literal: a slit in the sheet the world is painted on. Behind the paper is the **Ink Side**, the back of the sheet, where the band's own dark doubles live. The song is about paranoia and a presence under your skin that you can't get away from. We play that straight: the band is watched, mimicked, cut open, and finally has to face the thing. It turns out to be themselves, and it never leaves.

**Homage to the original video.** It keeps the eerie parlor (damask wallpaper, Chesterfield couch, antique DJ desk, lamps, a winged statue), the rotting mirror-room behind the walls, the ancestor portrait that gets creepier each time we see it, the bugs, the shadow figure copying the rapper, a split set with the light room on one side and the dark room on the other, the dragonfly, and the empty room at the end.

**No lyrics and no text on screen, ever.** Act the meaning; never write it.

---

## World

- **The Parlor (paper side).** Warm lamplight on cream paper. The wallpaper is cream with columns of ornate ink damask motifs, and each motif is a stylised Claude *spark*. There's an oxblood Chesterfield sofa, a gilded antique desk holding Joe's two turntables, pleated-shade table and floor lamps (real `glow()` light), a potted palm, a bronze **winged-Clawd statue** on a pedestal, a shaggy cream rug, panelled double doors and dark wainscot. The gilt-framed **ancestor portrait** of Great-Grand-Clawd, pale, stern, in a ruff collar, hangs over the couch.
- **The Ink Side (the back of the paper).** The same parlor, mirrored and inverted: indigo-black ink, bone-chalk linework, walls running with ink drips, peeling paper, a hanging chain, chalk scribbles (spirals, eyes, tally marks, never letters), and glowing eyes in every dark corner.

**Palette arc:** amber lamplight → lamps flicker colder and greener as the paranoia grows (verses) → violet-black ink and bone chalk (choruses) → red (the Ink's eyes, Chester's scream, the bridge) → the torn paper island, glowing warm in an ink void (finale) → warm amber again at the end, with the shadows *wrong*.

## Motifs (each one escalates and pays off)

1. **The papercut.** A hairline scratch (intro) → a slit in the wall (verse 1) → a cut across Chester's own chest (chorus 1) → a slash splitting the frame (chorus 2) → the whole sheet ripped in two (finale) → sealed again (end).
2. **The ancestor portrait.** Stern → eyes follow you → grins → papercut across its face with ink tears → at the end, the Ink itself sits in the frame, in the ruff collar, prim and proper.
3. **Shadows.** The lamps throw the band's shadows on the wallpaper. They're normal (intro) → lagging (verse 1) → peeling off the wall and copying their owners (verse 2) → a whole ink band (chorus 2) → the band's accepted twins (finale) → awake, grinning shadows the band doesn't notice (end).
4. **The lamp.** It flickers on at the very start and clicks off at the very end.
5. **The paper dragonfly.** A little dragonfly cut from cream paper (a nod to the original's dragonfly). It leads the eye into strange places and lands on the lamp at the end.

## Cast (all Clawd-built, all on model in every shot)

| Who | Look | Plays | Acting |
|---|---|---|---|
| **Chester Clawd** (vocals) | lean and a bit tall; short spiky bleach mohawk with red tips; black rectangular glasses; lip ring; bare clay arm-nubs with flame tattoos; black tank top; **red tartan legs** | vintage mic | explosive: jumps, stomps, screams with the lunchbox lid open |
| **Mike Clawd** (MC) | spiky black hair with blue and red tips; charcoal button-up shirt with collar and buttons; stud earrings; studded wristbands | handheld mic | the paranoid narrator: rap hands on the beat, leans into the lens, looks over his shoulder |
| **Brad Clawd** (guitar) | slightly wide; heather-grey hoodie (hood rim, drawstrings, pocket); big red-and-charcoal headphones; curls poking out | sunburst acoustic guitar | calm, cool, eyes often closed, nods |
| **Rob Clawd** (drums) | stocky; shaggy dark fringe; small goatee; violet collared shirt | small Victorian brass-and-wood drum kit | steady and powerful: hair flips on the crash |
| **Joe Clawd** (DJ) | slightly short; spiky black flat-top; maroon shirt; DJ headphones around the neck | two turntables on the antique desk | mischievous: scratching, head-bobs, smirks |
| **Phoenix Clawd** (bass) | tall; buzz cut; goatee; brown knit sweater with a red chest stripe | acoustic bass | laid-back sway, big grin |
| **The Ink** | a Clawd of wet ink: violet-black, bone-chalk rim light, glowing pale eyes (red when angry), a jagged grin, drips that hang and fall. As a *shadow* it wears the silhouette of whoever it copies (mohawk, spikes, headphones…) | — | mimics, lags, leads, lurks, grins |
| **The Face** | the Ink as a colossal face: two eyes as tall as the doors, a papercut-grin mouth | — | rises, mirrors, screams, shrinks |
| **Great-Grand-Clawd** | the ancestor in the portrait: pale clay, ruff collar, stern slit eyes, oval gilt frame | — | changes each time it's seen |
| **The paper dragonfly** | cream paper, cut-out wing veins | — | flutters, lands, guides the eye |

---

## Timing

The song is placed so its **first hit lands at t = 2.000**. Quarter beat = 0.7993 s (75.07 BPM, the song's half-time groove); eighth = 0.3997 s; bar = 3.1972 s. **Bar k starts at t = 2.000 + 3.1972·k.** `song.js` has `barT(k)` and every section time.

| section | bars | t |
|---|---|---|
| cold open (silent) | — | 0 – 2.000 |
| intro A: drum loop + eerie sample (riser from ~10.0) | 0–2 | 2.000 – 11.592 |
| intro B: full band riff | 3–6 | 11.592 – 24.381 |
| verse 1: Mike raps (band stop on the last beat of bar 11) | 7–14 | 24.381 – 49.958 |
| — the *breath* (low end drops out, last beat of bar 14) | | 49.16 – 49.958 |
| chorus 1: Chester | 15–18 | 49.958 – 62.747 |
| verse 2: Mike | 19–26 | 62.747 – 88.325 |
| — the *breath* (last beat of bar 26) | | 87.53 – 88.325 |
| chorus 2: Chester + all (double) | 27–34 | 88.325 – 113.903 |
| bridge A: stop-start riff, bass cuts out on beats 2–3 of each bar | 35–37 | 113.903 – 123.495 |
| bridge B: sparse and eerie (a sustained pad enters at bar 39) | 38–40 | 123.495 – 133.086 |
| build | 41 | 133.086 – 136.284 |
| final: chorus ×2 + outro | 42–57 | 136.284 – ~184.46 (the last big hit), ring-out to the cut at 185.95 |
| ending (silence) | — | 185.95 – 192.4 |

---

## Shots

Time is video time. "→" marks the transition out.

### Chapter 1 · Cold open + intro (0 – 24.381) · amber lamplight
| t | shot | reads | out |
|---|---|---|---|
| 0 – 2.0 | Black. A little table lamp **flickers on** (two stutters, then holds) and lights a close-up of a spinning record on the antique desk. Joe's nub lifts the tonearm and hovers it over the record (anticipation). | light comes on (0.4–1.0) · the record and the needle (1.0–2.0) | the **needle drops on the first hit (2.0)** |
| 2.0 – 11.592 | **One long dolly** to the right along the parlor, introducing the band one by one, each on its own action: **Joe** scratching, who looks up at us and smirks · **Rob** twirls a stick in the air and catches it for a hit on the bar-1 downbeat (5.197) · the **portrait** passes and its eyes slide to follow the camera · **Brad and Phoenix** on the couch, tuning and nodding (not in sync) · **Mike** leaning in the right doorway, glancing left and right, while the paper dragonfly flits past his face · the riser (≈10.0): **Chester**, seen from behind, peers at a **hairline papercut** in the wallpaper. The lamps flicker, he spins round through the key views and crouches… | one character per ~1.6 s, each with its own action | cut on action: **Chester launches into a jump, screaming, at 11.592** |
| 11.592 – 14.789 | **WIDE.** The band crashes in. Chester lands on the downbeat, the room shakes, the lamps swing, dust sifts down and the portrait rattles. Everyone plays at full energy. | the whole band, in one place, at full power | push in toward the wallpaper crack |
| 14.789 – 17.986 | **Behind the paper.** Push through the hairline slit into the **Ink Side**: the mirrored parlor in ink and chalk, dripping. In a dark corner a shape stirs, **two eyes open** and it turns toward the music, toward us. | where we are (the dark mirror room) · something is here · it has noticed | pull back out through the slit |
| 17.986 – 21.183 | Chester and Mike, front and centre, trade moves in front of the wallpaper. The lamps throw their **big shadows** on the wall, and the shadows move exactly with them (establish that they're normal). | two frontmen · their shadows copy them perfectly | — |
| 21.183 – 24.381 | The riff winds down. Chester points the way and Mike steps forward into the lamplight and raises his mic. The camera pushes in on him. | the verse belongs to Mike | cut on action into the verse |

### Chapter 2 · Verse 1 (24.381 – 49.958) · amber, then colder
| t | shot | reads | out |
|---|---|---|---|
| 24.381 – 30.775 | Medium close on Mike rapping, the lamp to his right, his shadow big on the wallpaper at left. Bar 7: the shadow copies him. Bar 8: it starts to **lag**, then stops copying altogether and slowly turns its head **toward us** while Mike raps on, oblivious. The camera drifts toward the shadow. On the last beat Mike whips round to look, and the shadow **snaps back** into his pose. He squints: suspicious. | Mike raps · the shadow lags · it looks at us · Mike turns and it snaps back · suspicion | camera keeps tracking |
| 30.775 – 37.170 | Mike raps as he walks along the wall past the **portrait**, whose eyes follow him. He stops and stares at it; it stares straight ahead, innocent. He leans in nose to nose, squinting, then turns away, and its eyes swivel after him again. | the eyes follow · the stare-down · they follow again | tilt down to the skirting board |
| 37.170 – 40.367 | Close on the wall: the **hairline papercut** is longer. A line of **ink ants** marches out of it, down the wainscot and across the floor to Mike's feet. He hops, lifting a foot. The **band stop** (39.57): every lamp dies at once. In the black, only the slit glows, and **two eyes blink** in it. | ants come out of the cut · the lights die · eyes in the slit | lamps stutter back on |
| 40.367 – 46.761 | WIDE. The band plays and Mike raps centre, sweating. **The room is watching him:** one by one, on the beat, the spark motifs in the wallpaper open into **eyes**, dozens of them, all turning to Mike. The lamps lean toward him and the walls *breathe* on the beat. The others don't notice (eyes closed, lost in playing). | the wallpaper grows eyes · they all look at Mike · only Mike sees them | — |
| 46.761 – 49.958 | Chester joins Mike. They stand back to back and turn, looking around. All the wallpaper eyes slide to one spot on the wall behind them. **The breath (49.16):** freeze. A razor line of light **slices across the wall**, left to right. | back to back, the eyes gather · the slice | the slice bursts open on the downbeat |

### Chapter 3 · Chorus 1 (49.958 – 62.747) · ink violet breaks into amber
| t | shot | reads | out |
|---|---|---|---|
| 49.958 – 53.156 | The slice **bursts open** into a long, lens-shaped gash in the wall, and ink-light spills out. Chester whirls to face it and sings into it, arms wide. Inside the gash is the Ink Side, and **the Face's** huge eyes. | the wall is open · Chester confronts it | push in on Chester |
| 53.156 – 56.353 | Close on Chester. A papercut slices diagonally **across his own chest**. It opens, and inside him is darkness with **two small glowing eyes**. He looks down at it, gives a horrified take and clamps his nubs over the cut. | the cut on Chester · the eyes inside him · his horror | cut on action to the wide |
| 56.353 – 59.550 | WIDE. A papercut opens on **every band member**, one per beat in a chain, each with blinking eyes inside. They pat at themselves in a panic while still playing. Chester screams at the ceiling (lid open). | cuts on everyone · panic · the scream | — |
| 59.550 – 62.747 | **The paper heals.** The slits zip shut, the gash in the wall seals and the lamps glow warm again. The band stare at each other, baffled (?). The camera drifts past the **portrait**, which is now **grinning**. | everything heals · confusion · the portrait grins | push into the grin, match cut |

### Chapter 4 · Verse 2 (62.747 – 88.325) · colder, greener
| t | shot | reads | out |
|---|---|---|---|
| 62.747 – 69.142 | Mike goes hunting, still rapping. He lifts the corner of the rug and ink ants scatter. He peeks behind the portrait, which swings on its nail: nothing. He drops down to look under the Chesterfield, where **a dozen pairs of eyes** blink back at him in the dark. Big take, and he scrambles backwards. | searching · nothing · the eyes under the couch | he backs into the wall |
| 69.142 – 75.536 | **The mirror routine.** Mike's shadow **peels off the wallpaper** like a sticker, one corner curling first, and stands up as an **Ink Mike** (spiky silhouette, glowing eyes). On the beats: Mike gestures and the Ink copies · Mike ducks suddenly and it copies · Mike freezes, and the Ink keeps going: it makes a move **first**, and Mike's body copies it against his will. His eyes go wide. | the shadow comes alive · it copies · it leads, and Mike is the puppet | — |
| 75.536 – 81.931 | The Ink leads a jerky little dance and Mike follows helplessly. The other members' shadows peel off the wall too and copy their owners, badly: Rob's shadow drums on Rob's head, Brad's shadow tugs his headphones. The **portrait** gets a papercut across its face and ink tears run down the canvas. | everyone's shadow is loose · the portrait bleeds | — |
| 81.931 – 88.325 | The wallpaper **peels** in long curling strips from the ceiling down, with black ink behind them. The lamps flicker in sequence and the Inks slip into the gaps. The band plays on in a tight circle, backs together. **The breath (87.53):** blackout, and in the black a **jagged grin** of light opens. | the walls come apart · the band huddle · the grin | the grin **slashes** into chorus 2 |

### Chapter 5 · Chorus 2 (88.325 – 113.903) · violet-black and amber, split
| t | shot | reads | out |
|---|---|---|---|
| 88.325 – 94.720 | **The Great Slash.** On the downbeat a giant papercut splits the frame diagonally. Upper left is the warm parlor and Chester; lower right is the Ink Side and **Ink Chester** (mohawk silhouette, glasses glinting, glowing eyes). They mirror each other across the tear, singing face to face. | the frame splits · Chester and his double | the tear swings vertical |
| 94.720 – 101.114 | **Two bands.** A vertical tear down the middle: on the left the band plays, on the right the **ink band** (all six Inks) plays the same moves mirrored. At first they're in sync, then the ink side **leads by a beat** and the real band follows late: they're being played. | two bands · in sync · then the ink side leads | — |
| 101.114 – 107.509 | Chester and Ink Chester in close-ups that alternate every half bar. Chester screams (lid open) and the Ink screams back (lid open, red glow inside). Chester presses both nubs against the tear to hold the paper shut while ink fingers push through around them. | scream vs scream · holding the tear shut | — |
| 107.509 – 113.903 | **Shatter.** A papercut slashes across the frame on every beat until the frame is paper shards, with ink and eyes through every crack. The band keeps playing in the pieces. On the last beat the shards fall away: the parlor is darker, an ink pool spreads across the floor and Inks stand in the corners. | slash after slash · the band plays through · the room is changed | — |

### Chapter 6 · Bridge (113.903 – 136.284) · blackout, then red
| t | shot | reads | out |
|---|---|---|---|
| 113.903 – 123.495 | **Lights on, lights off.** Each bar: on beat 1 the parlor is lit and Mike raps low to camera with the band behind him. On beats 2–3, where the bass cuts out, it's **BLACKOUT**: an inverted chalk-on-ink view of the room where **the Inks are standing, closer each time** (the far wall → the middle of the rug → right behind Mike). Beat 4 is lit again and there's nothing there. At the end of bar 37 Mike slowly turns to look behind him. | lit · dark: they're far · lit · dark: closer · lit · dark: RIGHT behind him · he turns | the lights die |
| 123.495 – 126.692 | Darkness. The band huddles in the single pool of light from one lamp (wide). Pairs of **eyes blink open** all around in the dark, one pair per beat, then more. The paper dragonfly flutters in the lamplight. | alone in the dark · surrounded by eyes | — |
| 126.692 – 129.889 | The pad swells and **the Face rises** behind the band like a moon, its eyes as tall as the doors. The band turn round one by one (staggered key-view turns) and look up. | the Face · the band sees it | Chester steps forward |
| 129.889 – 133.086 | **Chester screams at the Face**: lid wide, rings of cream brush strokes radiating out. The Face mirrors him: its mouth tears open along a papercut into a vast grin, red inside, and screams back. The screams meet in the middle and the paper trembles. | Chester's scream · the Face screams back · the collision | — |
| 133.086 – 136.284 | **The build.** The world's paper strains and slits race out from the collision toward the frame edges. Rob raises his sticks and counts in: four clicks, one per beat. Push in on Chester's determined face as his glasses flash. | the paper straining · the count-in · Chester's resolve | the sheet **rips** on the downbeat |

### Chapter 7 · Final, part 1 (136.284 – 161.861) · the paper island in an ink void
| t | shot | reads | out |
|---|---|---|---|
| 136.284 – 142.678 | **The rip.** On the downbeat the world's paper tears apart down the middle and the halves peel away like curtains. The band is left standing on a **torn island of parlor floor** (rug, couch, drums, desk, one lamp), adrift in the vast Ink Side. The camera pulls back to show the island. | the rip · the band stands on a scrap of paper in the void | — |
| 142.678 – 149.073 | **The mosh.** The band plays full blast on the island. All round it in the dark, dozens of **little Inks** bob and headbang on the beat: the monsters are the audience. Chester and Mike leap and the dragonfly circles. | full power · the Inks are headbanging | — |
| 149.073 – 155.467 | **The Face returns**, looming over the island. Chester walks to the paper's edge. He raises a nub and the Face raises one. He tilts his head and it tilts. He takes off his glasses and it does the same. **It's his reflection.** He reaches out, and the Face shrinks down into a small **Ink Chester**, face to face with him. | the Face · it mirrors him · the realisation · it shrinks to his size | — |
| 155.467 – 161.861 | Chester offers his nub and the Ink takes it. The Ink **melts into a puddle** that slides under Chester's feet and becomes **his shadow**, glowing eyes and all. Chester nods, puts his glasses back on, turns to the band and throws up his arms. All the little Inks dive into the band's feet and become their shadows. | acceptance · the Ink becomes his shadow · every Ink finds its owner | — |

### Chapter 8 · Final, part 2 + ending (161.861 – 192.4) · warm again
| t | shot | reads | out |
|---|---|---|---|
| 161.861 – 168.256 | Mike and Chester trade lines, close-ups alternating by the bar, while their ink shadows play along on the floor. Around the island the void swirls, and scraps of the parlor (wallpaper, the portrait, the lamps) drift back toward it. | the two voices · the world starts coming back | — |
| 168.256 – 174.650 | **The world repairs.** The torn halves slide back together round the band: the walls rise, the paper knits and the warm lights come back on, with the band playing right on the closing seam. | the seam closes · warm light | — |
| 174.650 – 181.045 | **Full blast** in the restored parlor: lamps blazing, **paper confetti** (shredded papercut strips) raining down. Chester jumps on the couch, Rob hits the crashes, Joe scratches like mad, Brad and Phoenix stand back to back. On the wall, the shadows dance along. | the whole band, triumphant | — |
| 181.045 – ~185.95 | The last hits: a **snap-zoom** to a member on each hit. On the final hit all six jump, and the frame **freezes** in mid-air through the ring-out. | the last hits · the freeze | **smash cut to silence** at the hard stop |
| ~185.95 – 192.4 | **Silence.** The parlor, calm, in warm lamplight. The band lounges, spent, in the places they held in the intro. A slow pan to the right (rhyming the opening dolly) passes the **portrait, where the Ink now sits in the ruff collar**. On the wallpaper behind the band their lamp-shadows have **glowing eyes and little grins**, awake and looking around. The band doesn't notice. The pan ends on Chester, and his shadow turns to look at us and raises a nub to its lips: **shh**. The dragonfly settles on the lamp. **Click**, the lamp goes off. Black. | the band at rest · the portrait · the shadows are awake · shh · click | black |

---

## Rules for every shot

- Something *happens* in every shot, on the beat, and every read is held long enough to land.
- A transition at every seam: cut on action, push through a slit, match cut, whip, slash, or a tear.
- Characters stay on model: same hair, clothes, colours and instruments, every shot.
- Big characters: a medium shot is u ≈ 20–28, a close-up is 40–70. Wide shots of the whole band are u ≈ 12–16.
- No text. Chalk scribbles are spirals, eyes, tally marks and little Clawd faces, never letters.
