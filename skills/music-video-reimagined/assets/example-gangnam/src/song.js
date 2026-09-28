// song.js: the song's map, measured from the audio (kick-drum grid, section self-similarity, band energy, dropouts).
// Video time t. 132 BPM: BEAT = 0.45455 s, EIGHTH = 0.22727 s, BAR = 1.81818 s. Bar k starts at barT(k) = 3.81818 + 1.81818·k.
// The song is two identical 45-bar rounds, a breakdown bridge, and a final drop. The vocal pickup starts at 2.285
// (inside bar -1, which starts at 2.000). The song HARD-CUTS on the downbeat of bar 119 (220.182); after that: silence.
const BAR = 4 * BEAT, EIGHTH = BEAT / 2;
const barT = k => OFF + k * BAR;
const beatT = (k, b = 0) => OFF + k * BAR + b * BEAT;
const barOf = t => Math.floor((t - OFF) / BAR);
const inBar = t => ((t - OFF) / BAR) - barOf(t);

const SEC = {
  open:     [0, barT(-1)],          // silent cold open (2 s)
  introA:   [barT(-1), barT(3)],    // the hook chant over a sparse synth (pickup at 2.285)
  introB:   [barT(3), barT(7)],     // the beat is in; a 2-beat STOP near the end of bar 6 (15.35-15.69 hits), then the verse
  verse1:   [barT(7), barT(15)],    // rap, steady groove
  preA1:    [barT(15), barT(22)],   // lift (pre-chorus part 1)
  preB1:    [barT(22), barT(27)],   // pre-chorus part 2 (louder)
  build1:   [barT(27), barT(34)],   // the build: loudest mids, rising
  breath1:  [barT(34), barT(36)],   // the low end drops out (67.06-68.09 and 68.72-68.96): the held breath before the drop
  chorus1:  [barT(36), barT(44)],   // THE DROP: the hook + the horse dance
  post1:    [barT(44), barT(52)],   // post-chorus: the second dance hook (hip sway, lasso, disco points)
  verse2:   [barT(52), barT(60)],
  preA2:    [barT(60), barT(67)],
  preB2:    [barT(67), barT(72)],
  build2:   [barT(72), barT(79)],
  breath2:  [barT(79), barT(81)],   // dropouts 148.87-149.90 and 150.54-150.79
  chorus2:  [barT(81), barT(89)],   // THE DROP again
  post2:    [barT(89), barT(97)],
  bridge:   [barT(97), barT(106)],  // breakdown: quieter, sparse; builds in bars 104-105; dropout 195.54-196.81
  final:    [barT(106), barT(116)], // the final drop: the big party
  outro:    [barT(116), barT(119)], // the last chant, thinning out; HARD CUT at barT(119) = 220.182
  tail:     [barT(119), PROJECT.duration]   // silence (our ending gag)
};
const HIT = {
  pickup: 2.285,                    // the first sound (the vocal pickup)
  introStop: [15.35, 15.69],        // the two stabs before the intro's stop (bar 6)
  verseAccent1: [29.90, 30.18],     // the same two-stab figure mid-verse 1 (bar 14)
  drop1: barT(36), drop2: barT(81), drop3: barT(106),
  verseAccent2: [111.71, 111.99],   // bar 59
  bridgeAccents: [197.17, 197.51],  // bar 106
  cut: barT(119)                    // the song stops dead
};
// the "breath" dropouts (the music holds its breath before each drop)
const DROPOUTS = [[67.06, 68.09], [68.72, 68.96], [148.87, 149.90], [150.54, 150.79], [195.54, 196.81], [214.17, 214.43]];
// beat helpers for choreography: the beat index (integer), the phase within the beat (0..1), eighth-note phase
const beatIx = t => Math.floor((t - OFF) / BEAT);
const beatPh = t => frac((t - OFF) / BEAT);
