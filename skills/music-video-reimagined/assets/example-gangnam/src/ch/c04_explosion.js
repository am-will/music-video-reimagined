// c04_explosion.js · barT(27) = 52.909 → barT(36) = 69.273 · build 1 + breath 1 · river-bridge greys
//
// ===================================================================================================================
// SHOT PLAN
// The music (measured): four-on-the-floor build in bars 27-30 with syncopated stabs; a rolling eighth-note bass from
// bar 31 beat 1 (60.64); the loudest mids in bar 33. The breath: the kick stops ~65.95, a held pad, a low swell ~66.75,
// near silence 66.87-68.08 (the dropout), three short vocal hits ~68.2 / 68.42 / 68.65, the tiny gap 68.72-68.96, the
// drop at 69.273 (c05).
//
// SET (painted here): an empty dirt lot on the riverbank under a HUGE concrete bridge, side-on: a long deck across the
// top (parapet, lamp posts, tiny cars crossing both ways), massive hammerhead piers, the river beyond with a pale far
// bank and a distant second bridge in the haze, reeds along the bank. Cool greys; Oppa's sky-blue tux is the only strong
// colour until the fireball. Props: a junk heap (pallet, box, a bundle of old papers, a TOASTER on top), a puddle with a
// RUBBER DUCK, a TRAFFIC CONE, three PIGEONS. THE Horse stands by the water in the back, deadpan: a quiet Easter egg in
// the build that pays off when it walks out of the explosion.
//
// A  52.909-60.182 (bars 27-30) THE BUILD, one continuous camera   [in: a cut on the bar-27 downbeat from c03]
//    camera: the wide (.8 → .86, slow push and drift) → a SNAP PUSH-IN to a medium two-shot on the bar-29 downbeat
//    Oppa (tux, u 22): bar 27 the gallop with the reins (already mid-move at the cut); bar 28 POINTUP right (beat 0) and
//    left (beat 2); bar 29 DISCO right; bar 30 DISCO left.
//    reads  52.91-54.0   the place, and Oppa dancing alone under the bridge
//           53.6-54.8    a JOGGER (crowd v 5, tracksuit) jogs in from the left, side view
//           54.73        Oppa's big pointup (the cause) → 54.95 the jogger skids to a stop, 55.18 a take ('!')
//           55.2-56.5    he stares, mouth open; his foot starts tapping on the beat (the first symptom)
//           56.55        snap push-in, Oppa's disco. 57.0-57.4 the jogger glances round: is anyone looking?
//           57.45-58.3   a timid little disco (nervous, sweat), a bit bigger on beat 3
//           58.36-60.1   bar 30: he goes all in (disco left, beaming), in time with Oppa but smaller and a hair late;
//                        Oppa tips his head to him, approving
// B  60.182-62.0 (bar 31) THE PIGEONS AND THE CONE   [in: a whip pan right + crash zoom out of A, with a speed smear]
//    close on the ground by the cone. 60.2-60.6 three pigeons peck out of time; 60.64 (the rolling bass comes in) their
//    heads snap up together, then bob on every eighth, stepping; 61.09 the cone starts rocking on the beat; 61.55 a hop.
// C  62.0-65.636 (bars 32-33) THE PEAK   [in: a hard cut on the bar-32 downbeat, mid-gallop]
//    Oppa big and centred (u 24): the gallop with the reins (bar 32), the jogger galloping behind him, the pigeons bobbing
//    and the cone rocking, THE Horse at the back: the only one not dancing. Camera pushes 1.3 → 1.5.
//    Bar 33 (the loudest): four hits, one per beat: POINTUP alternating right / left with a camera punch-in on each.
// D  65.636-69.273 (bars 34-35) THE WALK   [in: a cut on the bar-34 downbeat, where the music breaks]
//    Oppa stops dancing and walks straight at us, cool (the strut, a hand at the shades); a low hero framing; the junk
//    heap and THE Horse behind him, the cone and the pigeons to the side.
//    reads  65.64-66.7   the cool walk toward us (bigger with every step)
//           66.75        the low swell: he nudges his shades; a glint
//           67.06        BOOM. A HUGE orange-and-cream fireball blooms behind him (a spiky flash, then billows, a ground
//                        shockwave, one painted BOOM) and everything drops into SLOW MOTION (a closed-form speed ramp)
//           67.06        the counter hits 1,000,000: the HUD bounces, sparkles pop round it
//           67.1-68.0    he keeps walking in slow motion, never flinching; debris cartwheels past: old papers, the toaster
//                        (popping its toast in mid-air), the rubber duck, the cone, feathers, two pigeons flapping off
//           67.6-68.7    THE Horse walks calmly out of the smoke behind him, deadpan, mane tips smoking; ~68.3 its eye
//                        slides to the camera
//           68.72-68.96  FREEZE: everything stops dead in the gap (the drawing still boils), a small push holds it
//           68.96-69.273 WHITE-HOT: the core flares out over the frame; flash('#FFF8E6') reaches k = 1 at 69.273
//    [out: the white-hot flash; c05 fades it out onto the arena, mid-gallop]
// The counter HUD is in every shot (60,000 → 1,000,000 at 67.06).
// ===================================================================================================================
(() => {
  const T_IN = barT(27), T_PUSH = barT(29), T_WHIP = barT(31), T_PEAK = barT(32), T_WALK = barT(34), T_OUT = barT(36);
  const T_CLICK = 66.75, T_BOOM = 67.06, T_FREEZE = 68.72, T_HOT = 68.96;
  const BANK = 745;            // the riverbank: the lot's back edge, where the piers stand
  const GY = 880;              // Oppa's dance line
  const DECK = { par: -230, face: -200, under: -50, bot: 50 };   // parapet top, face top, underside (seen from below), far edge
  const PIER_X = k => 380 + 1240 * k;
  const INK2 = '#5E6668';      // the bridge's ink: a soft grey for far concrete
  const OPPA_X = 900;
  const JOG = { v: 55, u: 20, y: 872, xs: 520 };     // the jogger: crowd v 55 (tracksuit + cap), where he stops
  const CONE_AT = [1335, 852], CONE_C = 30;          // the traffic cone
  const PIGS = [[1238, 868, 1, .1], [1420, 874, -1, .55], [1478, 852, -1, .3]];   // pigeons: x, y, facing, phase
  const HORSE_AT = [1560, 750, 8];                   // THE Horse, deadpan at the water's edge
  const JUNK_AT = [1150, 752];                       // the junk heap (ground zero)

  // ---------- small helpers ----------
  // a long straight line in pieces (p5.brush loses strokes much longer than the canvas)
  function longLine(x0, x1, y0, y1, sw, col, br = 'ink') {
    const n = Math.max(1, Math.ceil(Math.abs(x1 - x0) / 700));
    for (let i = 0; i < n; i++) inkLine([[lerp(x0, x1, i / n), lerp(y0, y1, i / n)], [lerp(x0, x1, (i + 1) / n), lerp(y0, y1, (i + 1) / n)]], sw, col, br, 0);
  }
  // a cloud/billow outline: a circle with scalloped bumps (ph turns the bumps: billowing)
  function puffPts(cx, cy, r, seed, ph = 0, n = 30, bumps = 8, amp = .12, sy = 1) {
    const P = [];
    for (let i = 0; i < n; i++) {
      const a = i / n * TAU, b = Math.abs(Math.sin(a * bumps / 2 + seed * 3.7 + ph));
      const rr = r * (1 - amp * .5 + amp * Math.pow(b, .6) + .05 * Math.sin(a * 3 + seed));
      P.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * sy]);
    }
    return P;
  }
  const bpT = t => (t - OFF) / BEAT;

  // ================================================================================================================
  // THE SET: the bridge lot
  // ================================================================================================================
  function lotSky(t) {
    const [a, b, c] = viewRect2(300);
    boilSeed('c4 sky');
    paint(rectPts(a - 100, b - 300, c - a + 200, 700 - b + 300), { wash: '#D3DBDE', ink: null });
    paint(ellPts((a + c) / 2, 600, (c - a) * .8, 220, 24), { fill: '#EEF0EA', fillOp: 150, bleed: .25, tex: .3, ink: null });
    for (let i = 0; i < 5; i++) {   // long soft cloud streaks, drifting
      const x = -900 + ((i * 1130 + t * 9) % 4600), y = 230 + 200 * hash(i + 11);
      if (!vis(x - 500, x + 500)) continue;
      boilSeed('c4 cloud' + i);
      paint(ellPts(x, y, 330 + 140 * hash(i), 24 + 14 * hash(i + 3), 20), { fill: '#EFF2EF', fillOp: 120, bleed: .2, tex: .3, ink: null });
    }
  }
  function farBank(t) {
    const [a, , c] = viewRect2(200);
    boilSeed('c4 hills');
    const hl = []; for (let x = a - 100; x <= c + 120; x += 110) hl.push([x, 560 - 34 * Math.sin(x * .0021 + .5) - 20 * Math.sin(x * .0067 + 1)]);
    hl.push([c + 120, 690], [a - 100, 690]);
    paint(hl, { wash: '#CBD3D4', ink: null });
    for (let i = Math.floor(a / 150) - 1; i <= Math.ceil(c / 150) + 1; i++) {
      const x = i * 150 + 50 * hash(i * 1.7), h = 60 + 120 * hash(i * 3.1), w = 70 + 55 * hash(i * 2.3);
      boilSeed('c4 far' + i);
      const col = mixCol('#BAC5C8', '#D9E0E0', hash(i * 5.5));
      paint(rectPts(x, 652 - h, w, h), { wash: col, ink: mixCol(col, PAL.ink, .16), sw: .35 });
      for (let r = 1; r < Math.min(4, h / 30); r++) inkLine([[x + 7, 652 - h + r * 26], [x + w - 7, 652 - h + r * 26]], .3, mixCol(col, PAL.ink, .1), 'inkfine', 0);
    }
    // the next bridge downstream, far off in the haze
    boilSeed('c4 far bridge');
    paint(rectPts(a - 100, 586, c - a + 220, 13), { wash: '#B9C3C5', ink: null });
    for (let x = Math.floor(a / 260) * 260 + 60; x < c + 100; x += 260) { boilSeed('c4 fbp' + x); paint(rectPts(x, 598, 14, 56), { wash: '#BFC8CA', ink: null }); }
    boilSeed('c4 haze');
    paint(rectPts(a - 100, 560, c - a + 220, 100), { fill: '#E6EAE6', fillOp: 90, bleed: .2, tex: .2, ink: null });
  }
  function river(t) {
    const [a, , c] = viewRect2(200);
    boilSeed('c4 river');
    paint(rectPts(a - 100, 648, c - a + 220, 110), { wash: '#A6B2B3', fill: '#93A1A3', fillOp: 60, bleed: .05, tex: .5, ink: null });
    for (let i = 0; i < 16; i++) {   // light streaks drifting downstream
      const span = 3600, x = -900 + (((i * 523 + t * 22) % span) + span) % span, y = 662 + 70 * hash(i * 2.1), w = 60 + 90 * hash(i);
      if (!vis(x - w, x + w)) continue;
      boilSeed('c4 rs' + i);
      inkLine([[x, y], [x + w, y + 1]], .6 + .5 * hash(i + 4), '#CBD4D2', 'inkfine', 0);
    }
  }
  function pier(k) {
    const x = PIER_X(k);
    if (!vis(x - 260, x + 260)) return;
    boilSeed('c4 pier' + k);
    paint([[x - 118, 150], [x + 118, 150], [x + 136, BANK + 6], [x - 136, BANK + 6]], { wash: '#C1C4C1', ink: INK2, sw: 1 });
    paint([[x + 34, 156], [x + 118, 150], [x + 136, BANK + 6], [x + 44, BANK + 6]], { fill: '#8E9496', fillOp: 120, bleed: .03, tex: .6, border: .4, ink: null });
    paint(rectPts(x - 134, BANK - 90, 268, 94), { fill: '#88907F', fillOp: 90, bleed: .1, tex: .8, ink: null });     // the water stain
    for (const dx of [-70, -8]) inkLine([[x + dx, 170], [x + dx * 1.12, BANK - 20]], .45, '#A6ABAA', 'inkfine', 0);   // formwork seams
    // the hammerhead cap under the deck
    boilSeed('c4 cap' + k);
    paint([[x - 240, DECK.bot - 2], [x + 240, DECK.bot - 2], [x + 218, 100], [x + 130, 156], [x - 130, 156], [x - 218, 100]], { wash: '#BBBFBC', fill: '#9DA3A2', fillOp: 60, tex: .5, ink: INK2, sw: 1 });
    paint([[x + 60, DECK.bot], [x + 240, DECK.bot], [x + 218, 100], [x + 130, 156], [x + 40, 156]], { fill: '#8A9092', fillOp: 90, bleed: .03, tex: .5, ink: null });
  }
  function deck(t) {
    const [a, , c] = viewRect2(300), x0 = a - 120, x1 = c + 120, VPX = 1000;
    // lamp posts on the deck (rising out of frame in close shots)
    for (let x = Math.floor(a / 520) * 520 + 200; x < c + 200; x += 520) {
      boilSeed('c4 lamp' + x);
      inkLine([[x, DECK.par], [x, DECK.par - 170], [x + 46, DECK.par - 196]], 2.2, '#7A8284', 'ink', .4);
      paint(ellPts(x + 58, DECK.par - 196, 22, 9, 10), { wash: '#E8EAE2', ink: INK2, sw: .6 });
    }
    // tiny traffic, both ways: scale and life
    for (let i = 0; i < 9; i++) {
      const dir = i % 2 ? 1 : -1, sp = 150 + 90 * hash(i * 3.3), span = 5600, big = i === 4;
      const x = -1900 + ((((i * 811 + dir * t * sp) % span) + span) % span);
      if (!vis(x - 90, x + 90)) continue;
      boilSeed('c4 car' + i);
      const col = ['#E6E1D6', '#D8A640', '#8EA5BD', '#C85A4A', '#6F7C88', '#EFECE4', '#4E6A8C', '#B9BDBC', '#E3D9C2'][i];
      const w = big ? 150 : 70, h = big ? 44 : 26;
      paint(rrPts(x - w / 2, DECK.par - h + 4, w, h, big ? 8 : 9), { wash: col, ink: PAL.ink, sw: .6 });
      if (!big) paint(rrPts(x - w * .28 + dir * 4, DECK.par - h - 12, w * .56, 16, 6), { wash: mixCol(col, '#FFFFFF', .25), ink: PAL.ink, sw: .5 });
      else for (let k = 0; k < 5; k++) paint(rectPts(x - 64 + k * 27, DECK.par - h + 10, 18, 12), { wash: '#DCE6EA', ink: null });
    }
    boilSeed('c4 parapet');
    paint(rectPts(x0, DECK.par, x1 - x0, DECK.face - DECK.par), { wash: '#B2B7B5', ink: null });
    for (let x = Math.floor(a / 60) * 60; x < c + 60; x += 60) inkLine([[x, DECK.par + 3], [x, DECK.face - 3]], .5, '#8E9596', 'inkfine', 0);
    longLine(x0, x1, DECK.par, DECK.par, 1, INK2);
    boilSeed('c4 deck face');
    paint(rectPts(x0, DECK.face, x1 - x0, DECK.under - DECK.face), { wash: '#C9CCC9', fill: '#B2B7B5', fillOp: 50, tex: .5, ink: null });
    paint(rectPts(x0, DECK.under - 40, x1 - x0, 40), { fill: '#9EA4A3', fillOp: 70, bleed: .05, tex: .7, ink: null });   // the drip stain
    // the underside, looming overhead: girders converge toward the far edge (a painted perspective, no 3D)
    boilSeed('c4 deck under');
    paint(rectPts(x0, DECK.under, x1 - x0, DECK.bot - DECK.under), { wash: '#8A9092', ink: null });
    paint(rectPts(x0, DECK.bot - 40, x1 - x0, 40), { fill: '#6E7577', fillOp: 110, bleed: .05, tex: .5, ink: null });
    const k = (DECK.bot - DECK.under) / (620 - DECK.under);
    for (let x = Math.floor(a / 150) * 150 - 150; x < c + 300; x += 150) { const xf = lerp(x, VPX, k); inkLine([[x, DECK.under + 2], [xf, DECK.bot - 2]], .8, '#666D70', 'inkfine', 0); }
    for (const q of [.3, .58, .8]) longLine(x0, x1, lerp(DECK.under, DECK.bot, q), lerp(DECK.under, DECK.bot, q), .5, '#737A7C', 'inkfine');
    boilSeed('c4 deck lines');
    longLine(x0, x1, DECK.face, DECK.face, 1.3, INK2);
    longLine(x0, x1, DECK.under, DECK.under, 1.4, INK2);
    for (let x = Math.floor(a / 330) * 330; x < c + 330; x += 330) inkLine([[x, DECK.face + 4], [x, DECK.under - 4]], .5, '#A4A9A8', 'inkfine', 0);   // expansion joints
  }
  function reeds(t, y0 = BANK, beat = 0) {
    const [a, , c] = viewRect2(160);
    for (let i = Math.floor(a / 58) - 1; i <= Math.ceil(c / 58) + 1; i++) {
      if (hash(i * 7.13) < .22) continue;
      const x = i * 58 + 26 * hash(i * 2.9), h = 34 + 58 * hash(i * 4.3), sway = 5 * Math.sin(t * 1.4 + i * .8) + beat * 9 * Math.sin(bpT(t) * Math.PI);
      boilSeed('c4 reed' + i);
      const P = [[x - 30, y0 + 14]];
      for (let k = 0; k < 5; k++) { const bx = x - 24 + k * 12 + 4 * hash(i + k), hh = h * (.55 + .45 * hash(i * 3 + k)); P.push([bx + sway * hh / 60, y0 + 8 - hh], [bx + 7, y0 - hh * .25]); }
      P.push([x + 32, y0 + 14]);
      paint(P, { wash: hash(i * 1.1) < .5 ? '#939A7E' : '#A4A787', ink: '#6A6F5A', sw: .45 });
      if (hash(i * 9.1) < .35) { const cx = x - 6 + sway * .9, cy = y0 - h - 10; inkLine([[x - 6, y0], [cx, cy + 12]], .7, '#6A6F5A', 'inkfine', .3); paint(ellPts(cx, cy, 5, 13, 8), { wash: '#7A5E48', ink: null }); }
    }
  }
  function lotGround(t) {
    const [a, , c, d] = viewRect2(200);
    boilSeed('c4 lot');
    paint(rectPts(a - 100, BANK - 6, c - a + 220, d - BANK + 400), { wash: '#BCAF98', fill: '#A99C85', fillOp: 70, bleed: .04, tex: .8, ink: null });
    paint(rectPts(a - 100, BANK - 10, c - a + 220, 30), { fill: '#978B75', fillOp: 110, bleed: .05, tex: .7, ink: null });   // the muddy bank
    boilSeed('c4 lot light');
    paint(ellPts(1000, 960, 1000, 110, 24), { fill: '#CCC1AA', fillOp: 80, bleed: .15, tex: .6, ink: null });
    // faint tyre tracks sweeping across the lot
    boilSeed('c4 tracks');
    for (const [y, amp, ph] of [[905, 22, 0], [926, 22, 0], [1050, 34, 2], [1076, 34, 2]]) {
      const P = []; for (let x = a - 50; x <= c + 50; x += 160) P.push([x, y + amp * Math.sin(x * .0023 + ph)]);
      for (let i = 0; i + 1 < P.length; i += 3) inkLine(P.slice(i, i + 4), .7, '#AFA28A', 'dry', .5);
    }
    // pebbles and weed tufts
    for (let i = 0; i < 70; i++) {
      const x = -700 + 3800 * hash(i * 1.31), y = BANK + 24 + 520 * Math.pow(hash(i * 2.71), 1.4);
      if (!vis(x - 20, x + 20)) continue;
      boilSeed('c4 peb' + i);
      if (i % 5 === 0) { const T_ = []; for (let k = 0; k < 4; k++) T_.push([x - 10 + k * 7, y + 2], [x - 7 + k * 7 + 2 * Math.sin(t * 1.5 + i), y - 10 - 8 * hash(i + k)]); T_.push([x + 20, y + 2]); paint(T_, { wash: '#98A07E', ink: '#6A6F5A', sw: .4 }); }
      else paint(ellPts(x, y, 4 + 5 * hash(i), 3 + 2 * hash(i + 1), 7), { wash: hash(i * 5.1) < .5 ? '#8E8472' : '#D5CBB6', ink: null });
    }
  }
  function puddle(x, y, rx, ry, key) {
    if (!vis(x - rx, x + rx)) return;
    boilSeed('c4 puddle' + key);
    paint(ellPts(x, y, rx, ry, 22, 1.5), { wash: '#A9B6B8', fill: '#C9D2D1', fillOp: 70, bleed: .05, ink: '#8E8472', sw: .6 });
    inkLine([[x - rx * .55, y - ry * .15], [x + rx * .15, y - ry * .3]], .8, '#E4EAE7', 'inkfine', 0);
  }

  // ---------- props ----------
  // THE TOASTER (centred at 0,0 in the current transform; k = half its width). pop 0..1 = a slice rising out of it.
  function toaster(k, sw = .8, pop = 0) {
    if (pop > 0) paint(rrPts(-.62 * k, (-.62 - .9 * pop) * k, .5 * k, .9 * k, .12 * k), { wash: '#E2B06A', fill: '#B87A3A', fillOp: 60, tex: .5, ink: PAL.ink, sw: sw * .7 });
    paint(rrPts(-k, -.62 * k, 2 * k, 1.24 * k, .32 * k), { wash: '#C8CED2', fill: '#9AA2A8', fillOp: 70, tex: .5, ink: PAL.ink, sw });
    for (const sx of [-.37, .37]) paint(rrPts((sx - .3) * k, -.6 * k, .6 * k, .13 * k, .05 * k), { wash: '#3A3640', ink: null });
    paint(rectPts(.98 * k, -.25 * k, .22 * k, .12 * k), { wash: '#3A3640', ink: null });                 // the lever
    inkLine([[-.75 * k, -.28 * k], [-.2 * k, -.42 * k]], sw * .8, '#F4F4F0', 'inkfine', 0);            // shine
    paint(rectPts(-.75 * k, .58 * k, .3 * k, .12 * k), { wash: '#3A3640', ink: null }); paint(rectPts(.45 * k, .58 * k, .3 * k, .12 * k), { wash: '#3A3640', ink: null });
  }
  // THE RUBBER DUCK (centred; k = body half-width; faces right)
  function duck(k, sw = .8) {
    paint([[-k, -.1 * k], [-.7 * k, -.62 * k], [.1 * k, -.55 * k], [.7 * k, -.3 * k], [.95 * k, .15 * k], [.6 * k, .55 * k], [-.5 * k, .55 * k], [-.95 * k, .25 * k]], { wash: '#F6CF3A', fill: '#E0A82A', fillOp: 60, tex: .4, ink: PAL.ink, sw, curv: .6 });
    paint(ellPts(.38 * k, -.85 * k, .42 * k, .4 * k, 14), { wash: '#F6CF3A', ink: PAL.ink, sw });
    paint([[.72 * k, -.86 * k], [1.18 * k, -.8 * k], [.74 * k, -.64 * k]], { wash: '#F08A2A', ink: PAL.ink, sw: sw * .7 });
    paint(ellPts(.48 * k, -.94 * k, .07 * k, .09 * k, 8), { wash: PAL.ink, ink: null });
    inkLine([[-.45 * k, .02 * k], [-.1 * k, .18 * k], [.25 * k, .05 * k]], sw * .7, '#C98A1E', 'inkfine', .5);   // the wing
  }
  // THE TRAFFIC CONE (base centre at 0,0; c = unit: 2.7c tall, the base 2c wide)
  function cone(c, sw = .8) {
    paint(rrPts(-1.05 * c, -.32 * c, 2.1 * c, .36 * c, .08 * c), { wash: '#C8541E', ink: PAL.ink, sw });
    paint([[-.72 * c, -.3 * c], [.72 * c, -.3 * c], [.16 * c, -2.62 * c], [-.16 * c, -2.62 * c]], { wash: '#F2833A', fill: '#D8621E', fillOp: 60, tex: .4, ink: PAL.ink, sw });
    for (const [y0, y1] of [[-1.05, -1.35], [-1.75, -1.98]]) {
      const w0 = lerp(.72, .16, (-y0 - .3) / 2.32), w1 = lerp(.72, .16, (-y1 - .3) / 2.32);
      paint([[-w0 * c, y0 * c], [w0 * c, y0 * c], [w1 * c, y1 * c], [-w1 * c, y1 * c]], { wash: '#F4F1E8', ink: null });
    }
    inkLine([[-.4 * c, -.5 * c], [-.1 * c, -2.4 * c]], sw * .6, '#FFB070', 'inkfine', 0);
  }
  // a scrap of old paper with scribbles (no writing); centred
  function paperScrap(w, h, sw = .6, i = 0) {
    paint(rectPts(-w / 2, -h / 2, w, h, 1.5), { wash: ['#F3EDDD', '#ECE4CF', '#F7F2E6', '#E8DEC6'][i % 4], ink: PAL.ink, sw });
    for (let k = 0; k < 3; k++) { const y = -h * .28 + k * h * .26; inkLine([[-w * .34, y], [-w * .05, y + 1.5], [w * (.1 + .2 * hash(i + k)), y]], sw * .6, '#A89E88', 'inkfine', .4); }
  }
  // THE JUNK HEAP (ground zero). (x, y) = its base centre
  function junkHeap(x, y, o = {}) {
    if (!vis(x - 220, x + 220)) return;
    boilSeed('c4 junk tyre');
    push(); translate(x - 120, y - 38); rotate(-.25);
    paint(ellPts(0, 0, 44, 40, 20), { wash: '#3C3844', ink: PAL.ink, sw: .8 }); paint(ellPts(0, 0, 20, 18, 14), { wash: '#A99C85', ink: PAL.ink, sw: .6 });
    pop();
    boilSeed('c4 junk pallet');
    paint(rectPts(x - 96, y - 26, 200, 26), { wash: '#B99A6C', fill: '#9A7A4E', fillOp: 60, tex: .6, ink: PAL.ink, sw: .8 });
    for (const dx of [-60, -10, 40, 88]) inkLine([[x + dx, y - 24], [x + dx, y - 2]], .6, '#7A5E3A', 'inkfine', 0);
    boilSeed('c4 junk box');
    paint([[x - 70, y - 26], [x + 10, y - 26], [x + 14, y - 96], [x - 66, y - 100]], { wash: '#C9A26E', fill: '#A8804E', fillOp: 55, tex: .5, ink: PAL.ink, sw: .8 });
    inkLine([[x - 68, y - 72], [x + 12, y - 70]], .6, '#8A6A40', 'inkfine', 0);
    boilSeed('c4 junk papers');
    for (let k = 0; k < 4; k++) paint(rectPts(x + 14 - k * 2, y - 26 - (k + 1) * 13, 84 + 3 * k, 13, 1.5), { wash: ['#EFE8D6', '#E4DCC6', '#F2ECDD', '#E8E0CC'][k], ink: PAL.ink, sw: .55 });
    inkLine([[x + 56, y - 80], [x + 58, y - 26]], .7, '#9A5A3A', 'inkfine', 0);
    if (!o.noToaster) { boilSeed('c4 junk toaster'); push(); translate(x + 58, y - 104); rotate(-.06); toaster(28, .75); pop(); }
  }
  function duckPuddle(x, y, t, beat = 0) {
    puddle(x, y, 74, 17, 'duck');
    if (!vis(x - 60, x + 60)) return;
    boilSeed('c4 duck');
    const b = beat ? pulse(t, 7) : 0, sway = beat ? .18 * Math.sin(bpT(t) * Math.PI) : .04 * Math.sin(t * 1.7);
    push(); translate(x + 8, y - 6 + 1.5 * Math.sin(t * 2.2) - 7 * b); rotate(sway); duck(15, .7); pop();
  }

  // ---------- the pigeons ----------
  // A pigeon, side view facing right (o.flip faces left). (x, y) = the ground under its feet, s = size unit (the body is
  // ~4.4s long). o.bob -1..1 thrusts the head (forward +), o.peck 0..1 dips it to the ground, o.step = the leg phase,
  // o.hop px, o.fly = the wing-beat phase (flying: wings beating, legs tucked), o.rot, o.key (boil key).
  function pigeon(x, y, s, o = {}) {
    const key = 'c4 pg ' + (o.key ?? Math.round(x)), sw = o.sw ?? clamp(s * .06, .3, 1.6);
    push(); translate(x, y - (o.hop || 0)); scale(o.flip ? -1 : 1, 1); if (o.rot) rotate(o.rot);
    const P = pts => pts.map(([a, b]) => [a * s, b * s]);
    const fly = o.fly != null, wb = fly ? Math.sin(o.fly * TAU) : 0;
    // a wing: a long feathered leaf from the shoulder, raised by `lift` (-1 down .. 1 up)
    const wing = (lift, col, dx) => {
      push(); translate((.1 + dx) * s, -2.35 * s); rotate(-2.55 - .95 * lift);
      paint(P([[0, -.42], [1.1, -.62], [2.3, -.5], [3.4, -.12], [3.1, .1], [2.5, .12], [2.2, .38], [1.6, .3], [1.2, .5], [.1, .42]]), { wash: col, ink: PAL.ink, sw: sw * .7, curv: .3 });
      inkLine(P([[2.2, -.1], [3.1, -.05]]), sw * .6, '#4A4E5E', 'inkfine', 0);
      pop();
    };
    if (fly) { boilSeed(key + ' farwing'); wing(wb, '#7E8699', -.2); }
    else {
      boilSeed(key + ' legs');
      for (const [lx, ph] of [[-.15, 0], [.3, .5]]) {
        const lift = Math.max(0, Math.sin(((o.step || 0) + ph) * TAU)) * .55;
        const lw = Math.max(sw * 1.1, .042 * s);
        inkLine(P([[lx, -1.05], [lx + .08, -.45 - lift], [lx + .02, -lift]]), lw, '#B85A5E', 'ink', 0);
        inkLine(P([[lx - .3, -lift], [lx + .42, -lift]]), lw * .8, '#B85A5E', 'ink', 0);
      }
    }
    boilSeed(key + ' body');
    paint(P([[1.45, -2.05], [1.3, -1.4], [.6, -1], [-.5, -.98], [-1.4, -1.3], [-2.55, -1.55], [-2.8, -1.95], [-2.35, -2.12], [-1.2, -2.35], [-.2, -2.72], [.8, -2.8]]),
      { wash: '#A2AABA', fill: '#7F879A', fillOp: 80, bleed: .04, tex: .5, ink: PAL.ink, sw: sw * .85, curv: .5 });
    paint(P([[-2.2, -1.62], [-2.78, -1.6], [-2.8, -1.95], [-2.3, -2.08]]), { wash: '#4A4E5E', ink: null });   // the dark tail band
    if (!fly) {
      paint(P([[.7, -2.45], [-.6, -2.4], [-1.9, -1.95], [-.5, -1.55], [.5, -1.75]]), { wash: '#8E97AB', ink: PAL.ink, sw: sw * .6, curv: .4 });   // the folded wing
      for (const d of [0, .32]) inkLine(P([[-.3 - d, -2.2 + d * .5], [-.9 - d, -1.95 + d * .4]]), sw * 1.1, '#4A4E5E', 'ink', 0);
    }
    // neck + head: the head thrusts forward on a bob, dips on a peck
    boilSeed(key + ' head');
    const bob = o.bob || 0, pk = clamp(o.peck || 0);
    const hx = 1.45 + .7 * bob + .9 * pk, hy = -3.35 + 2.55 * pk;
    paint(P([[.3, -2.6], [1.45, -2.2], [hx + .45, hy + .55], [hx - .5, hy + .1]]), { wash: '#7A8F8A', ink: null });   // the neck
    paint(P([[.55, -2.45], [1.25, -2.25], [hx + .3, hy + .7], [hx - .2, hy + .55]]), { wash: '#8A7A9E', washOp: 190, ink: null });   // the violet sheen
    paint(ellPts(hx * s, hy * s, .68 * s, .62 * s, 14), { wash: '#7C8599', ink: PAL.ink, sw: sw * .8 });
    inkLine(P([[.35, -2.62], [hx - .55, hy + .2]]), sw * .6, PAL.ink, 'inkfine', .3);
    inkLine(P([[1.4, -2.15], [hx + .5, hy + .45]]), sw * .6, PAL.ink, 'inkfine', .3);
    paint(P([[hx + .55, hy - .08], [hx + 1.15, hy + .12], [hx + .55, hy + .22]]), { wash: '#4A4450', ink: null });   // beak
    paint(ellPts((hx + .58) * s, (hy - .12) * s, .14 * s, .1 * s, 8), { wash: '#ECE8E0', ink: null });           // the cere
    paint(ellPts((hx + .18) * s, (hy - .12) * s, .2 * s, .2 * s, 10), { wash: '#F08A3A', ink: null });           // the orange eye
    paint(ellPts((hx + .2) * s, (hy - .12) * s, .09 * s, .09 * s, 8), { wash: PAL.ink, ink: null });
    if (fly) { boilSeed(key + ' wing'); wing(wb * .9, '#98A1B4', 0); }
    pop();
  }

  // ================================================================================================================
  // THE WORLD: everything but the cast, in depth order, with hooks between the layers
  // ================================================================================================================
  function bridgeLot(t, o = {}) {
    const H_ = o.hooks || {};
    lotSky(t); farBank(t); river(t);
    for (let k = -2; k <= 4; k++) pier(k);
    deck(t);
    lotGround(t);
    reeds(t, BANK, o.beatReeds || 0);
    if (H_.back) H_.back();
    if (H_.mid) H_.mid();
    if (H_.front) H_.front();
  }

  // ================================================================================================================
  // CHOREOGRAPHY AND ACTING (all closed-form in t)
  // ================================================================================================================
  // Oppa through the build: the reins, the pointups on the accents, disco both sides, a hip sway under the insert,
  // the reins again (bigger), then four pointups on the four hits of bar 33.
  const OPPA_KEYS = [
    [T_IN - BAR, 'gallop', { e: .85 }],
    [beatT(28, 0), 'pointup', { side: 1 }], [beatT(28, 2), 'pointup', { side: -1 }],
    [barT(29), 'disco', { side: 1 }], [barT(30), 'disco', { side: -1 }],
    [barT(31), 'hipsway'],
    [barT(32), 'gallop', { amp: 1.15 }],
    [beatT(33, 0), 'pointup', { side: 1, e: 1.3 }], [beatT(33, 1), 'pointup', { side: -1, e: 1.3 }],
    [beatT(33, 2), 'pointup', { side: 1, e: 1.3 }], [beatT(33, 3), 'pointup', { side: -1, e: 1.3 }]
  ];
  function drawOppaDance(t, x, y, u, over = {}) {
    const acc = [beatT(28, 0), beatT(28, 2), beatT(33, 0), beatT(33, 1), beatT(33, 2), beatT(33, 3)];
    let mouth = 'grin'; for (const a of acc) if (t >= a && t < a + .22) mouth = 'open';
    dancer('oppa', x, y, u, OPPA_KEYS, t, { look: 'tux', mood: 'happy', eyes: 'happy', mouth, boilKey: 'oppa', ...over });
  }

  // THE JOGGER through shot A. Returns the options for member('crowd', ...), plus x.
  const T_SKID = 54.74, T_STOP = 54.96, T_TAKE = 55.18;
  function joggerPose(t) {
    const v0 = 640, kk = .085, xsk = JOG.xs - v0 * kk;
    let x, skid = 0, walk;
    if (t < T_SKID) { x = xsk - v0 * (T_SKID - t); walk = (x + 400) / (4.4 * JOG.u); }
    else { const a = t - T_SKID; x = xsk + v0 * kk * (1 - Math.exp(-a / kk)); walk = (xsk + 400) / (4.4 * JOG.u) + .18 * (1 - Math.exp(-a / kk)); skid = Math.exp(-a / .16) * seg(a, 0, .04); }
    const base = { v: JOG.v, boilKey: 'jogger', flip: false };
    if (t < T_STOP + .08) {   // jogging in (side view), then the skid: heels dug in, leaning back
      const run = t < T_SKID ? 1 : Math.exp(-(t - T_SKID) / .06);
      return { x, dust: skid, o: { ...base, view: 'side', walk, dy: -.55 * Math.abs(Math.sin(walk * TAU)) * run, aL: .25 + .75 * Math.sin(walk * TAU) * run + .6 * skid, rot: lerp(-.1, .16, 1 - run) * (1 - seg(t, T_STOP, T_STOP + .08)), eyes: 'determined', mouth: 'flat' } };
    }
    // stopped: turn to 3/4 toward Oppa, a TAKE, then stare with the foot tapping on the beat
    const tk = take(t, T_TAKE, 1.1), tr = turn(t, T_STOP + .02, T_STOP + .18, .25, .125);
    const bp = bpT(t), f = frac(bp), tap = t > 55.6 ? Math.max(0, Math.sin(Math.PI * clamp(f * 1.8))) * .75 : 0;
    const settle = spring(t, T_STOP + .08, 7, 16) * .12;
    const eK = seg(t, T_TAKE - .02, T_TAKE + .14) * (1 - seg(t, 56.1, 56.35));
    return { x, dust: skid, o: { ...base, ...tr, rot: settle, sq: tk.sq, dy: tk.dy - .12 * pulse(t, 8) * seg(t, 55.6, 55.7), eyes: 'wide', mouth: t < T_TAKE ? 'o' : 'O', lookX: .85, aL: .15 + .9 * seg(t, T_TAKE - .05, T_TAKE + .05) * Math.exp(-(t - T_TAKE) * 3), aR: .1, legLift: [0, 0, 0, tap], emote: '!', emoteK: eK, emoteAge: t - T_TAKE } };
  }
  // shot A after the push-in: turns to us, glances round, a timid disco, then all in (bar 30)
  function joggerCopy(t) {
    const base = { v: JOG.v, boilKey: 'jogger' };
    const q = memberOpts('crowd', { v: JOG.v }), dopt = (o) => ({ hand: q._hand, sleeve: q._sleeve, ...o });
    if (t < beatT(29, 2)) {   // staring, turning to us, then a look over each shoulder: is anyone watching?
      const tr = t < 56.95 ? turn(t, 56.74, 56.9, .125, 0) : t < 57.2 ? turn(t, 57.0, 57.1, 0, -.125) : t < 57.36 ? turn(t, 57.2, 57.3, -.125, .125) : turn(t, 57.36, 57.44, .125, 0);
      const look = t < 57.0 ? .85 : t < 57.2 ? -1 : t < 57.36 ? 1 : .5;
      const bob = -.12 * pulse(t, 8);
      return { ...base, ...tr, eyes: t < 57.0 ? 'wide' : 'look', mouth: t < 57.0 ? 'O' : 'flat', lookX: look, lookY: t > 57.0 && t < 57.36 ? -.3 : 0, dy: bob, sq: t > 57.0 && t < 57.4 ? .05 : 0, legLift: [0, 0, 0, t < 57.0 ? Math.max(0, Math.sin(Math.PI * clamp(frac(bpT(t)) * 1.8))) * .7 : 0], aL: t > 57.0 && t < 57.4 ? -.5 : .1, aR: t > 57.0 && t < 57.4 ? -.5 : .1 };
    }
    if (t < barT(30)) {       // the timid try: a small disco, nervous, sweating
      const e = t < beatT(29, 3) ? .35 : .62;
      const pose = routine(t, [[beatT(29, 2) - .01, 'groove'], [beatT(29, 2), 'disco', { side: 1, e: .35 }], [beatT(29, 3), 'disco', { side: 1, e: .62 }]], dopt({ blend: .1 }));
      return { ...base, ...pose, eyes: 'look', lookX: .7, lookY: -.3, mouth: 'wobble', emote: 'sweat', emoteK: seg(t, beatT(29, 2), beatT(29, 2) + .2), emoteAge: t - beatT(29, 2) };
    }
    // bar 30: ALL IN, the disco to the left with Oppa (a hair late, smaller: not a photocopy)
    const pose = routine(t, [[barT(30) - .12, 'disco', { side: 1, e: .62 }], [barT(30), 'disco', { side: -1, e: 1, ph: -.05, amp: .92 }]], dopt({ blend: .1 }));
    const tk = take(t, barT(30), .8);
    return { ...base, ...pose, sq: (pose.sq || 0) + tk.sq, dy: (pose.dy || 0) + tk.dy, eyes: 'happy', mouth: 'grin', blush: .35 };
  }
  function skidDust(x, y, k, u) {
    if (k < .02) return;
    for (let i = 0; i < 4; i++) {
      boilSeed('c4 dust' + i);
      const r = u * (.8 + .5 * i) * (1.4 - k), dx = -u * (1 + i * 1.3) * (1.3 - k);
      paint(puffPts(x + dx, y - r * .5, r, i, 0, 16, 5, .2, .7), { wash: '#D8CDB6', washOp: 220 * k, ink: null });
    }
  }

  // THE PIGEONS: pecking out of time, then (from tBob) bobbing on every eighth and stepping on the beat
  function pigeonState(i, t, tBob, spot = PIGS[i]) {
    const [x, y, face, ph] = spot;
    if (t < tBob) {
      const pk = Math.pow(Math.max(0, Math.sin((t * (1.3 + .4 * i) + ph) * TAU)), 3);
      return { x: x + 6 * Math.sin(t * .8 + i) * (spot[4] || 9) / 9, y, flip: face < 0, peck: pk, step: t * .7 + ph, bob: 0 };
    }
    const a = t - tBob, bp = bpT(t), f2 = frac(bp * 2), up = Math.exp(-a * 9);
    const bob = a < .1 ? -.35 : Math.exp(-f2 * 7) * 1 - .3;
    return { x: x + 8 * Math.sin(bp * Math.PI) * face * (spot[4] || 9) / 9, y, flip: face < 0, peck: 0, step: bp / 2 + ph, bob, hop: (10 * up * Math.sin(Math.min(1, a / .1) * Math.PI) + 3 * Math.exp(-f2 * 8)) * (spot[4] || 9) / 9 };
  }
  function drawPigeons(t, tBob, s = 9, filter = null) {
    PIGS.forEach((p, i) => { if (filter && !filter(i)) return; const st = pigeonState(i, t, tBob); pigeon(st.x, st.y, s, { ...st, key: 'p' + i }); });
  }
  // THE CONE: rocks side to side on the beat from t0 (a clack on each beat), a hop on beat 3 of bar 31
  function coneState(t, t0) {
    if (t < t0) return { tilt: 0, hop: 0 };
    const bp = bpT(t), f = frac(bp), dir = (Math.floor(bp) % 2) ? -1 : 1, k = clamp((t - t0) / .12);
    const hopT = beatT(31, 3), hop = t > hopT && t < hopT + .3 ? 26 * Math.sin(Math.PI * (t - hopT) / .3) : 0;
    return { tilt: .2 * k * dir * Math.sin(Math.PI * f), hop };
  }
  function drawCone(x, y, c, st, key = 'cone') {
    if (!vis(x - 3 * c, x + 3 * c)) return;
    boilSeed('c4 ' + key + ' shadow');
    paint(ellPts(x, y + 2, 1.4 * c, .3 * c, 14), { fill: PAL.ink, fillOp: 60, bleed: .2, ink: null });
    boilSeed('c4 ' + key);
    const piv = Math.sign(st.tilt || 0) * 1.0 * c;
    push(); translate(x + piv, y - (st.hop || 0)); rotate(st.tilt || 0); translate(-piv, 0); cone(c, clamp(c / 36, .5, 1.2)); pop();
  }

  // the whip pan's smear: streaks of the scene's colours dragged across the frame (screen space). k 0..1 over the whip;
  // at k = .5 the frame is fully covered (the cut hides under it)
  function whipSmear(k, dir = 1) {
    const s = Math.pow(Math.sin(Math.PI * clamp(k)), .7);
    if (s < .04) return;
    boilSeed('c4 whip wash');
    paint(rectPts(-60, -60, W + 120, H + 120), { wash: '#C4C2B6', washOp: 255 * clamp(s * 1.25 - .15), ink: null });
    const cols = ['#C9CCC9', '#BCAF98', '#D3DBDE', '#9EA4A3', '#86BCE8', '#A9B6B8', '#8A9092', '#D5CBB6'];
    for (let i = 0; i < 42; i++) {
      const y = (i + .5) / 42 * H + 14 * (hash(i * 3.1) - .5), len = (700 + 1100 * hash(i * 1.7)) * s, x = hash(i * 5.3) * (W + 900) - 450 - dir * 300 * k;
      boilSeed('c4 whip' + i);
      inkLine([[x, y], [x + dir * len, y + 2 * (hash(i) - .5)]], (2 + 6 * hash(i * 2.2)) * s, cols[i % cols.length], 'dry', 0);
    }
    for (let i = 0; i < 10; i++) { const y = hash(i * 9.7) * H; boilSeed('c4 whipl' + i); inkLine([[-40, y], [W / 2, y + 2], [W + 40, y + 4]], .7 * s, PAL.ink, 'inkfine', 0); }
  }

  // ================================================================================================================
  // A: THE BUILD (one continuous camera: the wide → a snap push-in → the whip pan out to B)
  // ================================================================================================================
  const CAM_WIDE0 = [1000, 390, .8], CAM_WIDE1 = [985, 430, .86], CAM_TWO0 = [712, 700, 1.4], CAM_TWO1 = [728, 705, 1.46];
  const T_WHIP0 = T_WHIP - .09, T_WHIP1 = T_WHIP + .1;
  function buildCam(t) {
    if (t < T_PUSH) return kf(t, [[T_IN, CAM_WIDE0], [T_PUSH, CAM_WIDE1]], x => x);
    if (t < T_PUSH + .2) return kf(t, [[T_PUSH, CAM_WIDE1], [T_PUSH + .2, CAM_TWO0]], x => easeOut(x) * .15 + ease(x) * .85);
    if (t < T_WHIP0) return kf(t, [[T_PUSH + .2, CAM_TWO0], [T_WHIP0, CAM_TWO1]], x => x);
    const k = seg(t, T_WHIP0, T_WHIP); return [CAM_TWO1[0] + 900 * k * k, CAM_TWO1[1], CAM_TWO1[2] * (1 + .15 * k)];   // whipping right
  }
  function build(t, lt, dur) {
    const [cx, cy, z] = buildCam(t), punch = t > T_PUSH && t < T_PUSH + .5 ? spring(t, T_PUSH + .2, 9, 22) * .012 : 0;
    camBegin(cx, cy, z * (1 + punch));
    const J = t < T_PUSH ? joggerPose(t) : { x: JOG.xs, o: joggerCopy(t), dust: 0 };
    bridgeLot(t, { hooks: {
      back: () => {
        horse(HORSE_AT[0], HORSE_AT[1], HORSE_AT[2], t, { mood: 'deadpan', boilKey: 'c4horse', headDown: .15 + .1 * Math.sin(t * .6), chew: .6, blink: 2 });
        junkHeap(JUNK_AT[0], JUNK_AT[1]);
        duckPuddle(740, 790, t);
      },
      mid: () => {
        // depth order by y: the cone and pigeons (852-874), the jogger (872), Oppa (880)
        drawCone(CONE_AT[0], CONE_AT[1], CONE_C, coneState(t, 1e9));
        drawPigeons(t, 1e9);
        if (J.x > -500) { skidDust(J.x, JOG.y, J.dust, JOG.u); member('crowd', J.x, JOG.y, JOG.u, J.o); }
        drawOppaDance(t, OPPA_X, GY, 22, bar30Nod(t));
      }
    } });
    camEnd();
    counterHUD(t);
    if (t > T_WHIP0) whipSmear(seg(t, T_WHIP0, T_WHIP1), 1);
  }

  // ================================================================================================================
  // B: THE PIGEONS AND THE CONE: a pigeon's-eye close-up, painted at its own scale (the whip hides the cut)
  // ================================================================================================================
  const CU_PIGS = [[380, 968, 1, .1, 80], [1650, 1000, -1, .55, 84], [760, 690, 1, .3, 46]];   // x, y, facing, phase, s
  function closeup(t, lt, dur) {
    const d = t - T_WHIP, arrive = 1 - easeOut(seg(t, T_WHIP, T_WHIP1));
    camBegin(960 - 520 * arrive * arrive + 18 * d, 540 - 8 * d, 1 + .03 * d);
    const [a, , c] = viewRect2(200);
    // far: haze, the river, a pier's foot and the reeds, all big and soft
    boilSeed('c4 cu sky'); paint(rectPts(a - 100, -200, c - a + 200, 460), { wash: '#D6DDDF', ink: null });
    boilSeed('c4 cu river'); paint(rectPts(a - 100, 120, c - a + 200, 140), { wash: '#AEB9BA', fill: '#9AA7A8', fillOp: 60, bleed: .05, tex: .5, ink: null });
    boilSeed('c4 cu pier'); paint([[1330, -200], [1900, -200], [1920, 270], [1310, 270]], { wash: '#C3C6C3', fill: '#A6ABAA', fillOp: 60, tex: .5, ink: INK2, sw: 1.2 });
    paint(rectPts(1312, 150, 606, 120), { fill: '#8E9486', fillOp: 90, bleed: .1, tex: .8, ink: null });
    for (let i = 0; i < 16; i++) {   // big soft reeds along the bank
      const x = -140 + i * 150 + 60 * hash(i * 3.3), h = 90 + 100 * hash(i * 1.9), sw_ = 8 * Math.sin(t * 1.4 + i);
      boilSeed('c4 cu reed' + i);
      const P = [[x - 70, 285]]; for (let k = 0; k < 5; k++) { const bx = x - 56 + k * 28, hh = h * (.6 + .4 * hash(i * 5 + k)); P.push([bx + sw_ * hh / 120, 275 - hh], [bx + 16, 275 - hh * .25]); } P.push([x + 74, 285]);
      paint(P, { wash: hash(i) < .5 ? '#A3A98E' : '#B1B397', ink: '#7E836C', sw: .7 });
    }
    // the ground, rising to us
    boilSeed('c4 cu ground');
    paint(rectPts(a - 100, 250, c - a + 200, 950), { wash: '#BEB19A', fill: '#A99C85', fillOp: 70, bleed: .04, tex: .8, ink: null });
    paint(rectPts(a - 100, 250, c - a + 200, 60), { fill: '#978B75', fillOp: 100, bleed: .06, tex: .7, ink: null });
    for (let i = 0; i < 30; i++) {
      const x = -100 + 2200 * hash(i * 2.31), y = 330 + 760 * Math.pow(hash(i * 1.77), 1.1), r = (5 + 14 * hash(i)) * (.4 + (y - 250) / 700);
      boilSeed('c4 cu peb' + i);
      paint(ellPts(x, y, r, r * .6, 9), { wash: hash(i * 4.7) < .5 ? '#8E8472' : '#D8CEBA', ink: i % 3 ? null : '#7E7462', sw: .5 });
    }
    boilSeed('c4 cu track'); inkLine([[a - 100, 560], [600, 548], [1400, 556], [c + 100, 540]], 2, '#AFA28A', 'dry', .5);
    // the cone and the pigeons, in depth order
    const cs = coneState(t, beatT(31, 2));
    const pg = i => { const [x, y, face, ph, s] = CU_PIGS[i], st = pigeonState(i, t, beatT(31, 1), [x, y, face, ph, s]); pigeon(st.x, st.y, s, { ...st, key: 'cu' + i, sw: s > 60 ? 2.3 : 1.7 }); };
    pg(2);
    boilSeed('c4 cu cone shadow'); paint(ellPts(1130, 902, 290, 44, 18), { fill: PAL.ink, fillOp: 70, bleed: .2, ink: null });
    boilSeed('c4 cu cone');
    { const c = 150, piv = Math.sign(cs.tilt) * c; push(); translate(1130 + piv, 896 - cs.hop * 4); rotate(cs.tilt); translate(-piv, 0); cone(c, 2.4); pop(); }
    pg(0); pg(1);
    camEnd();
    counterHUD(t);
    if (t < T_WHIP1) whipSmear(seg(t, T_WHIP0, T_WHIP1), 1);
  }

  // Oppa approves of his new disciple in bar 30: a tip of the head toward him, a smirk
  function bar30Nod(t) {
    const k = seg(t, beatT(30, 1), beatT(30, 1.3)) * (1 - seg(t, beatT(30, 3.4), beatT(30, 3.8)));
    return k > 0 ? { rot: -.08 * k, mouth: k > .5 ? 'smirk' : 'grin' } : {};
  }

  // ================================================================================================================
  // C: THE PEAK: Oppa big and centred, everyone behind him caught up in it; bar 33 hits on every beat
  // ================================================================================================================
  const T_P33 = barT(33);
  function peakCam(t) {
    if (t < T_P33) { const k = ease(seg(t, T_PEAK, T_P33)); return [lerp(955, 960, k), lerp(712, 735, k), lerp(1.24, 1.34, k), 0]; }
    // four punch-ins, one per beat, each snapping in with a little overshoot and a dutch tilt that flips side
    const zs = [1.34, 1.48, 1.64, 1.82, 2.04], ys = [735, 752, 768, 782, 796], rs = [0, .035, -.035, .04, -.045];
    const b = Math.min(3, Math.floor((t - T_P33) / BEAT)), a = (t - T_P33) - b * BEAT, k = backOut(clamp(a / .1));
    return [960, lerp(ys[b], ys[b + 1], k), lerp(zs[b], zs[b + 1], k), lerp(rs[b], rs[b + 1], k)];
  }
  function peak(t, lt, dur) {
    const [cx, cy, z, rot] = peakCam(t);
    camBegin(cx, cy, z, rot);
    const jogKeys = [[T_PEAK - 1, 'gallop', { e: .95, ph: -.05, amp: .9 }], [beatT(33, 0) + .03, 'pointup', { side: 1, ph: -.05 }], [beatT(33, 1) + .03, 'pointup', { side: -1, ph: -.05 }], [beatT(33, 2) + .03, 'pointup', { side: 1, ph: -.05 }], [beatT(33, 3) + .03, 'pointup', { side: -1, ph: -.05 }]];
    bridgeLot(t, { beatReeds: 1, hooks: {
      back: () => {
        horse(1530, 752, 8.5, t, { mood: 'deadpan', boilKey: 'c4horse', look: t > 63.2 ? 'camera' : undefined, chew: .8, blink: 3 });
        junkHeap(JUNK_AT[0], JUNK_AT[1]);
        duckPuddle(760, 800, t, 1);
      },
      mid: () => {
        drawCone(1310, 842, CONE_C, coneState(t, 0));
        PIGS.forEach((p, i) => { const sp = [[1228, 852], [1392, 860], [1452, 838]][i], st = pigeonState(i, t, 0, [sp[0], sp[1], p[2], p[3]]); pigeon(st.x, st.y, 9, { ...st, key: 'p' + i }); });
        dancer('crowd', 620, 850, 18, jogKeys, t, { v: JOG.v, mood: 'happy', eyes: 'happy', mouth: 'grin', boilKey: 'jogger' });
        drawOppaDance(t, 960, 950, 26);
      }
    } });
    camEnd();
    counterHUD(t);
  }

  // ================================================================================================================
  // D: THE WALK. Slow motion is a closed-form speed ramp: tw(t) runs at 1× until the boom, then eases down to SLOW×,
  // stops dead for the freeze, and creeps on again under the white-hot flash.
  // ================================================================================================================
  const SLOW = .3, RAMP = .12;
  function tw(t) {
    const tf = t < T_FREEZE ? t : t < T_HOT ? T_FREEZE : t - (T_HOT - T_FREEZE);
    if (tf < T_BOOM) return tf;
    const d = tf - T_BOOM; return T_BOOM + SLOW * d + (1 - SLOW) * RAMP * (1 - Math.exp(-d / RAMP));
  }
  const tHold = t => t < T_FREEZE ? t : t < T_HOT ? T_FREEZE : t - (T_HOT - T_FREEZE);   // real time, frozen in the gap
  const FB = { x: 1240, y: 575, R: 470 };            // the fireball's centre (world) and full radius
  const WALK_CAM = [1225, 540, 1.08];
  const HZ = { x: 1600, y: 805, s: 14.5 };             // THE Horse's mark in the walk
  const WPIGS = [[1742, 846, 1, 0], [1800, 858, 1, .4], [1690, 866, -1, .7]], WCONE = [1770, 840];
  // the fireball's puffs: [angle, dist (×R), radius (×R), colour, ink?]  (outer smoke first, the cream core last)
  const FB_PUFFS = (() => {
    const L = [], add = (n, d0, d1, r0, r1, cols, ink, a0, a1, seed) => {
      for (let i = 0; i < n; i++) { const k = (i + .5) / n, a = lerp(a0, a1, k) + (hash(i * 3.7 + seed) - .5) * .3; L.push([a, lerp(d0, d1, hash(i * 1.9 + seed)), lerp(r0, r1, hash(i * 2.3 + seed)), cols[i % cols.length], ink, seed + i]); }
    };
    add(9, .6, .76, .34, .44, ['#6F6360', '#857873', '#7A6D69', '#978A84'], true, -Math.PI * 1.12, Math.PI * .12, 1);
    add(7, .4, .56, .32, .4, ['#D9562A', '#E36A2C', '#CF4E26'], false, -Math.PI * 1.05, Math.PI * .05, 20);
    add(6, .2, .4, .28, .36, ['#F2923A', '#F6A844', '#EF8434'], false, -Math.PI * 1.0, 0, 40);
    add(4, .06, .24, .24, .3, ['#FBC95C', '#FDD46E'], false, -Math.PI * .95, -Math.PI * .05, 60);
    add(3, 0, .1, .2, .25, ['#FFF2D2', '#FFF7E4'], false, -Math.PI * .8, -Math.PI * .2, 80);
    return L;
  })();
  const fbGrow = te => easeOut(clamp(te / .15)) * (1 + .55 * te);
  function fireball(te, dt, hot) {
    if (dt < 0) return;
    const grow = fbGrow(te), R = FB.R * grow, rise = 140 * te;
    const cx = FB.x, cy = FB.y - rise;
    // the light it throws on everything (additive: warm, never muddy)
    glow(cx, cy + 80, R * 2.7, '#FF9A48', .9 * clamp(dt / .05));
    // the billows, outer smoke to cream core, each drifting out and turning its scallops
    FB_PUFFS.forEach(([a, d, r, col, ink, sd], i) => {
      const dd = d * (1 + .35 * te), px = cx + Math.cos(a) * dd * R, py = cy + Math.sin(a) * dd * R * .92, pr = r * R * (1 + (ink ? .3 : .1) * te);
      boilSeed('c4 puff' + i);
      paint(puffPts(px, py, pr, sd, te * (ink ? 1.2 : 2.2) * (i % 2 ? 1 : -1), 22, 7 + (i % 3), ink ? .14 : .1), { wash: hot ? mixCol(col, '#FFF4DC', hot) : col, ink: ink ? '#4A3E3E' : null, sw: 1.5 });
    });
    glow(cx, cy - R * .05, R * 1.1, '#FFE3A0', .8);
    // the first instant: a spiky white burst
    if (dt < .16) {
      const k = dt / .16;
      boilSeed('c4 burst');
      paint(starPts(cx, cy + 40, FB.R * (.5 + 1.1 * easeOut(k)), .42, 13, dt * 2), { wash: '#FFF6DC', washOp: 255 * (1 - k * k), ink: null });
      glow(cx, cy, FB.R * 3, '#FFF2D0', 1 - k);
    }
    // embers streaking out
    for (let i = 0; i < 14; i++) {
      const a = -Math.PI * (.05 + .9 * hash(i * 4.1)), sp = 900 + 1100 * hash(i * 2.9), f = te * sp;
      const ex = cx + Math.cos(a) * (R * .5 + f), ey = cy + Math.sin(a) * (R * .5 + f) + 900 * te * te, fade = 1 - seg(te, .3, .5);
      if (fade <= 0 || te < .01) continue;
      boilSeed('c4 ember' + i);
      inkLine([[ex, ey], [ex - Math.cos(a) * 46, ey - Math.sin(a) * 46 - 40 * te]], 3.4 * fade, '#FFD27A', 'ink', 0);
    }
  }
  // the dust the blast rolls out along the ground: soft, pale, low (in front of the fireball's foot)
  function groundDust(te) {
    if (te <= 0) return;
    const g = easeOut(clamp(te / .22)), half = (80 + 520 * g) * (1 + .6 * te), hgt = (30 + 90 * g) * (1 + .5 * te), y0 = 818;
    for (const [lay, col, op, hk] of [[0, '#B9AC9B', 235, 1], [1, '#D2C6B4', 200, .62]]) {
      const P = [[FB.x - half * 1.08, y0]], n = 16;
      for (let i = 0; i <= n; i++) { const k = i / n, x = FB.x - half + 2 * half * k, bump = Math.pow(Math.abs(Math.sin(k * Math.PI * 7 + lay + te * 3)), .5); P.push([x, y0 - hgt * hk * (Math.sin(Math.PI * k) * .75 + .25) * (.7 + .3 * bump)]); }
      P.push([FB.x + half * 1.08, y0]);
      boilSeed('c4 dust' + lay);
      paint(P, { wash: col, washOp: op, ink: lay ? null : '#8A7C70', sw: .8, curv: .4 });
    }
    if (te < .5) {   // the shockwave ring racing out along the ground
      const rx = 140 + 1600 * easeOut(te / .5), fade = 1 - te / .5, P = [];
      for (let i = 0; i <= 24; i++) { const q = Math.PI * (2.05 + .9 * i / 24); P.push([FB.x + Math.cos(q) * rx, 812 + Math.sin(q) * rx * .12]); }
      boilSeed('c4 ring'); inkLine(P, 5 * fade, '#F6EAD0', 'dry', .6);
    }
  }
  // the front smoke that swallows THE Horse, then thins to let it walk out (it grows with the blast)
  function frontSmoke(te, t) {
    const lift = seg(t, 67.5, 67.98);
    if (lift > .98) return;
    const g = easeOut(clamp((te - .02) / .14));
    if (g <= 0) return;
    for (let i = 0; i < 4; i++) {
      const sx = lerp(FB.x + 120, HZ.x - 60 + 70 * i, g), sy = lerp(FB.y + 40, HZ.y - 150 - 50 * (i % 2), g) - 260 * lift - 40 * i * lift;
      const r = (95 + 30 * hash(i)) * g * (1 + .4 * te) * (1 - .35 * lift);
      boilSeed('c4 fsmoke' + i);
      paint(puffPts(sx + 120 * lift * (i - 1.5), sy, r, i + 30, te * 2.4, 24, 9, .16), { wash: ['#857873', '#978A84', '#7A6D69', '#8E817B'][i], washOp: 255 * (1 - lift * lift), ink: lift < .3 ? '#4A3E3E' : null, sw: 1.4 });
    }
  }
  // debris cartwheeling past in slow motion: all closed-form flights in te
  function flight(p0, v, g, te) { return [p0[0] + v[0] * te, p0[1] + v[1] * te + .5 * g * te * te]; }
  function debrisBack(te) {   // behind Oppa
    if (te <= 0) return;
    // old papers from the heap: flipping, turning, fluttering out and away (up and to the left, clear of the Horse)
    for (let i = 0; i < 7; i++) {
      const a = -Math.PI * (.32 + .62 * hash(i * 7.3)), sp = 1700 + 1400 * hash(i * 1.3);
      const [x, y] = flight([JUNK_AT[0] + 60, 690], [Math.cos(a) * sp, Math.sin(a) * sp], 1500, te);
      const sc = 1.3 + 3 * te * hash(i * 2.2);
      if (y < -400 || x < -300) continue;
      boilSeed('c4 paper' + i);
      push(); translate(x + 40 * Math.sin(te * 9 + i), y); rotate(te * (6 + 6 * hash(i)) * (i % 2 ? 1 : -1) + i); scale(sc, sc * (.25 + .75 * Math.abs(Math.cos(te * 9 + i * 1.7))));
      paperScrap(56 + 20 * hash(i), 42 + 14 * hash(i * 3), .7, i); pop();
    }
    // the cone, tumbling end over end, up and out to the right
    { const [x, y] = flight([WCONE[0], WCONE[1] - 40], [900, -3200], 3000, te), sc = 1 + 1.6 * te; if (y > -300) { boilSeed('c4 cone fly'); push(); translate(x, y); rotate(te * 9); scale(sc); translate(0, 1.3 * CONE_C); cone(CONE_C, .9); pop(); } }
    // the pigeons blown up and away, flapping in slow motion (unharmed, affronted)
    WPIGS.forEach(([x0, y0], i) => {
      const [x, y] = flight([x0, y0 - 20], [500 + 300 * i, -2600 - 300 * i], 2000, te);
      if (y > -250) pigeon(x, y, 10 + 10 * te, { fly: te * 3.2 + i * .3, rot: -.3, key: 'fly' + i });
    });
    // feathers drifting (up and right, out of the Horse's way)
    for (let i = 0; i < 5; i++) {
      const x = 1760 + 60 * i + 700 * te * (.4 + hash(i)), y = 800 - 1500 * te * (.6 + .5 * hash(i * 2)) + 900 * te * te + 20 * Math.sin(te * 9 + i);
      boilSeed('c4 feather' + i);
      push(); translate(x, y); rotate(Math.sin(te * 7 + i) * .8 + i); scale(1.4);
      paint([[-14, 0], [-4, -5], [14, -2], [4, 4]], { wash: '#A8B0BE', ink: PAL.ink, sw: .5, curv: .5 }); inkLine([[-15, 1], [15, -1]], .5, '#6A7080', 'inkfine', 0);
      pop();
    }
  }
  function debrisFront(te) {   // in front of Oppa: flying past the lens (each stops once it has passed the camera)
    if (te <= 0) return;
    // THE TOASTER: over his head, turning, coming at us; the toast pops out mid-air
    { const [x, y] = flight([JUNK_AT[0] + 90, 610], [-1750, -1150], 2600, te), sc = 1.3 + 9 * te * te;
      if (sc < 7) { boilSeed('c4 toaster fly'); push(); translate(x, y); rotate(-te * 4); scale(sc); toaster(28, .9 / Math.sqrt(sc), seg(te, .1, .18)); pop(); }
      if (te > .1) { const k = te - .1, sk = sc * .9; if (sk < 8) { boilSeed('c4 toast'); push(); translate(x - 20 * sc + 600 * k, y - 50 * sc - 1500 * k + 2400 * k * k); rotate(te * 7); scale(sk); paint(rrPts(-15, -24, 30, 44, 6), { wash: '#E2B06A', fill: '#B87A3A', fillOp: 60, tex: .5, ink: PAL.ink, sw: .8 / Math.sqrt(sk) }); pop(); } } }
    // THE RUBBER DUCK: out of its puddle, straight at the camera, spinning, and past
    { const [x, y] = flight([905, 808], [-1300, -1900], 2400, te), sc = 1 + 70 * te * te;
      if (sc < 12) { boilSeed('c4 duck fly'); push(); translate(x, y); rotate(te * 7); scale(sc); duck(15, 1 / Math.sqrt(sc)); pop(); } }
    // two big papers sail past the lens
    for (let i = 0; i < 2; i++) {
      const [x, y] = flight([JUNK_AT[0] + 40, 680], [i ? 2400 : -2000, -1500 - 500 * i], 1200, te), sc = 1 + 40 * te * te;
      if (sc > 9) continue;
      boilSeed('c4 bigpaper' + i);
      push(); translate(x, y); rotate(te * (i ? 3 : -4)); scale(sc, sc * (.3 + .7 * Math.abs(Math.cos(te * 6 + i)))); paperScrap(60, 46, .7 / Math.sqrt(sc), i + 5); pop();
    }
  }
  // Oppa's walk: the strut toward the camera, a shade-nudge at the low swell; in slow motion after the boom
  function walkOppa(t) {
    const w = tw(t), p = seg(w, T_WALK, tw(T_OUT)), pe = 1 - Math.pow(1 - p, 1.5);
    const x = lerp(1212, 1198, pe), y = lerp(846, 992, pe), u = lerp(26, 42, pe);
    const nudge = Math.exp(-Math.pow((t - T_CLICK - .06) / .09, 2));
    return { x, y, u, nudge, o: { look: 'tux', mood: 'cool', eyes: 'narrow', mouth: 'smirk', boilKey: 'oppa', rot: -.04 * nudge, dy: -.15 * nudge } };
  }
  // a long soft shadow thrown toward us by the light behind (x, y = the feet; len in px)
  function backShadow(x, y, w, len, k, key) {
    if (k < .02) return;
    boilSeed('c4 bshadow ' + key);
    paint([[x - w * .5, y - 4], [x + w * .5, y - 4], [x + w * .75, y + len], [x - w * .75, y + len]], { fill: '#3A2E36', fillOp: 110 * k, bleed: .12, tex: .3, border: .2, ink: null });
  }
  function walk(t, lt, dur) {
    const w = tw(t), te = Math.max(0, w - T_BOOM), dt = tHold(t) - T_BOOM, th = tHold(t);
    const jolt = dt > 0 && dt < .5 ? 12 * Math.exp(-dt * 7) * Math.sin(dt * 55) : 0;
    const frz = ease(seg(t, T_FREEZE, T_FREEZE + .09)) * .035;
    const push_ = lerp(0, .06, ease(seg(w, T_WALK, tw(T_OUT))));
    camBegin(WALK_CAM[0] + jolt + 700 * frz, WALK_CAM[1] + jolt * .6, WALK_CAM[2] * (1 + push_ + frz));
    const O = walkOppa(t), hot = seg(t, T_HOT, T_OUT), lit = dt > 0 ? clamp(dt / .1) : 0;
    const hk = th > 67.45, ha = Math.max(0, th - 67.45), hs = HZ.s + 1.5 * ha, hx = HZ.x + 72 * ha, hy = HZ.y + 44 * ha;
    bridgeLot(th, { hooks: {
      back: () => {
        if (dt < 0) {
          // before the boom: THE Horse by the heap, deadpan; the pigeons and the cone still at it (they stop dead when the kick stops)
          horse(HZ.x, HZ.y, HZ.s, th, { mood: 'deadpan', boilKey: 'c4horse', chew: .7, blink: 5 });
          junkHeap(JUNK_AT[0], JUNK_AT[1]);
          duckPuddle(905, 812, th);
          const stop = 65.95, tt = Math.min(th, stop);
          drawCone(WCONE[0], WCONE[1], CONE_C, th < stop ? coneState(tt, 0) : { tilt: 0, hop: 0 });
          WPIGS.forEach(([x, y, f, ph], i) => { const st = pigeonState(i, tt, 0, [x, y, f, ph]); pigeon(st.x, st.y, 9, { ...st, bob: th < stop ? st.bob : -.35, hop: th < stop ? st.hop : 0, key: 'p' + i }); });
        } else {
          puddle(905, 812, 74, 17, 'duck');
          fireball(te, dt, hot);
          groundDust(te);
          debrisBack(te);
          if (hk) { backShadow(hx - hs * .5, hy, hs * 12, 70 + 30 * lit, .7 * lit, 'horse'); horse(hx, hy, hs, t, { mood: 'deadpan', boilKey: 'c4horse', walk: .8 * ha, look: th > 68.28 ? 'camera' : undefined, blink: .816, draw: (s, sw) => singed(s, sw, t) }); }
          frontSmoke(te, th);
        }
      },
      mid: () => {
        backShadow(O.x, O.y, O.u * 10.5, O.u * (2 + 5 * lit), .25 + .6 * lit, 'oppa');
        if (dt > 0) { boilSeed('c4 oppa rim'); glow(O.x, O.y - 5 * O.u, O.u * 8, '#FFC070', .45 * lit); }
        dancer('oppa', O.x, O.y, O.u, 'strut', w, { ...O.o });
        if (O.nudge > .05) { const [lx, ly] = [O.x + 2.7 * O.u, O.y - 6.3 * O.u]; boilSeed('c4 glint'); glow(lx, ly, O.u * 3, '#FFF6D8', O.nudge); paint(starPts(lx, ly, O.u * 1.6 * O.nudge, .22, 4, .3), { wash: '#FFFBEE', ink: null }); }
        if (dt > 0) debrisFront(te);
      }
    } });
    camEnd();
    // the painted BOOM (one word, our own sound effect)
    if (dt > .02) {
      const k = backOut(clamp(dt / .14)), fade = 1 - seg(th, 67.8, 68.05);
      if (fade > 0) letter('BOOM', 1000, 205 - 40 * te, 250 * (1 + .3 * te), '#FFE08A', { pop: k, rot: -.09 + .03 * Math.sin(te * 5), alpha: fade, stroke: '#7A2E1C', screen: true });
    }
    flushLetters();
    counterHUD(t);
    if (dt > 0) hudSparkle(t - T_BOOM);
    // WHITE-HOT: the core flares out over the frame; the flash reaches k = 1 exactly at the drop (69.273)
    if (hot > 0) {
      const [sx, sy] = toScreen(FB.x, FB.y - 140 * te, LAST_CAM);
      glow(sx, sy, 400 + 2600 * hot, '#FFF4DA', .25 + .75 * hot);
      boilSeed('c4 hot'); paint(ellPts(sx, sy, 120 + 2300 * Math.pow(hot, 2.4), 110 + 2000 * Math.pow(hot, 2.4), 30), { wash: '#FFF8E6', washOp: 255 * clamp(.35 + hot), ink: null });
      flash(Math.pow(hot, 1.25), '#FFF8E6');
    }
  }
  // THE Horse's mane tips, gently smoking (drawn in horse space)
  function singed(s, sw, t) {
    for (let i = 0; i < 3; i++) {
      const ph = frac(t * .45 + i * .33), bx = (3.4 + 1.1 * i) * s, by = (-13.2 - 1.2 * i) * s, rise = ph * 6 * s;
      const W_ = [], n = 9; for (let k = 0; k < n; k++) { const q = k / (n - 1); W_.push([bx + Math.sin(q * 5 + i + ph * 4) * (.5 + q) * s * .9, by - rise * .4 - q * 4 * s]); }
      boilSeed('c4 singe' + i);
      inkLine(W_, (1.6 - ph) * s * .12, mixCol('#8A8480', '#D8D2CC', ph), 'ink', .6);
      paint(puffPts(W_[n - 1][0], W_[n - 1][1], (.45 + .6 * ph) * s, i, ph * 3, 14, 5, .2), { wash: '#9A948F', washOp: 170 * (1 - ph), ink: null });
    }
    boilSeed('c4 singe tips');
    for (let i = 0; i < 3; i++) paint(ellPts((3.2 + 1.1 * i) * s, (-13 - 1.1 * i) * s, .32 * s, .22 * s, 8), { wash: '#FF9A48', washOp: 150 + 100 * Math.sin(t * 9 + i), ink: null });
  }
  // sparkles popping round the counter as it hits a million
  function hudSparkle(age) {
    if (age > 1.2) return;
    const V = VIEWCOUNT(T_BOOM + .01), wHUD = (150 + 64 * V.str.length + 24 * Math.floor((V.str.length - 1) / 3) + 52 + 40) * (64 / 120), hx = W - 36 - wHUD / 2;
    [[-.55, -.2, 0], [.5, -.35, .08], [-.2, .6, .15], [.45, .55, .22], [0, -.6, .3]].forEach(([dx, dy, d], i) => {
      const a = age - d; if (a < 0 || a > .8) return;
      const k = backOut(clamp(a / .18)) * (1 - seg(a, .5, .8)), x = hx + dx * wHUD * .62, y = 58 + dy * 70;
      boilSeed('c4 hs' + i);
      glow(x, y, 60 * k, '#FFE6A0', .8 * k);
      paint(starPts(x, y, 22 * k, .25, 4, a * 2), { wash: i % 2 ? '#FFE9A8' : '#FFF8E6', ink: '#7A5A2A', sw: .6 });
    });
  }


  shots([[T_IN, build], [T_WHIP, closeup], [T_PEAK, peak], [T_WALK, walk]]);
})();
