// song.js: the song's map, measured from the audio (onsets, band energy and a self-similarity matrix).
// Video time t. Bar k starts at barT(k) = 2.000 + 3.1972·k. A bar has 4 quarter beats (BEAT = 0.7993 s) and
// 8 eighths (EIGHTH = 0.3997 s). beatT(k, b) = the time of beat b (0..3) of bar k.
const BAR = 4 * BEAT, EIGHTH = BEAT / 2;
const barT = k => OFF + k * BAR;
const beatT = (k, b = 0) => OFF + k * BAR + b * BEAT;
const barOf = t => Math.floor((t - OFF) / BAR);                    // which bar t is in
const inBar = t => ((t - OFF) / BAR) - barOf(t);                   // 0..1 progress through the current bar

// Sections (bars are inclusive of the start, exclusive of the end).
const SEC = {
  open:    [0, barT(0)],            // silent cold open
  introA:  [barT(0), barT(3)],      // drum loop + eerie sample; a riser from ~10.0
  introB:  [barT(3), barT(7)],      // full band riff
  verse1:  [barT(7), barT(15)],     // rap
  chorus1: [barT(15), barT(19)],    // sung hook
  verse2:  [barT(19), barT(27)],    // rap
  chorus2: [barT(27), barT(35)],    // double chorus
  bridgeA: [barT(35), barT(38)],    // stop-start riff: the bass cuts out on beats 2-3 of each bar
  bridgeB: [barT(38), barT(41)],    // sparse; a sustained pad enters at bar 39
  build:   [barT(41), barT(42)],
  final:   [barT(42), 185.95],      // chorus x2 + outro; the last hits (184.26, 184.46, 184.65) ring out until the cut at 185.95
  ending:  [185.95, PROJECT.duration] // silence
};
// Moments worth hitting.
const HIT = {
  first: barT(0),                   // the needle drop
  riser: 10.0,                      // riser starts building into the band entry
  band: barT(3),                    // the band crashes in
  stop1: beatT(11, 3),              // the band stops for one beat (39.57 - 40.37)
  breath1: beatT(14, 3),            // the low end drops out before chorus 1 (49.16 - 49.96)
  breath2: beatT(26, 3),            // before chorus 2 (87.53 - 88.33)
  pad: barT(39),                    // the eerie pad enters
  scream: barT(40),                 // Chester's big scream bar
  rip: barT(42),                    // the final section explodes
  lastHits: [184.26, 184.46, 184.65], // the final flurry (184.46 is the biggest); then a ring-out
  lastHit: 184.46,
  silence: 185.95                   // the audio cuts to silence
};
// Bridge A's gaps: in each of bars 35-37 the bass decays out from about beat 1 and slams back in near beat 3.3.
const bridgeGap = k => [beatT(k, 1), beatT(k, 3.3)];
