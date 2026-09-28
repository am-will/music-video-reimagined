// c07_garage.js · barT(52) 98.364 → barT(60) 112.909 · VERSE 2 (bars 52-59) · THE DANCE-OFF in the parking garage
//
// ======================================== SHOT PLAN ========================================
// World: the garage set (fluorescent greys, orange-banded pillars, the red convertible at x 2300, the ELEVATOR at
// x 3300 with its doors open on a warm little car). Lighting arc: the garage starts DARK and its strip lights stutter
// on over Oppa as he passes; a total blackout for the Rival's entrance (one tube over his car, its headlights); then
// every light BANGS on for the battle and stays on (the plain lit garage that c08 opens on).
// Marks: the Rival fights at x 2300, Oppa at x 2980 (floor line y 935, both u 28); the mirror line is x 2640.
// The Horse (upright, s 15) sits in the back seat of the convertible all chapter, deadpan.
//
//  A  98.364-102.000  bars 52-53  THE STRUT  [in: WHIP PAN RIGHT: the first 6 frames come out of c06's right-moving
//     smear (dry-brush streaks, speed lines), decelerating onto the strut]  Oppa (tux) struts right through the dark
//     garage, hand on his shades, rapping, between two White Dancers strutting in step. Each strip light stutters on as
//     he passes under it (on the eighth nearest ~98.9, ~99.9, ~100.8) and pools light round them. They pass the red
//     convertible (a horse sits in the back seat, deadpan). Oppa eases to a stop at his mark on beat 3 of bar 53, in
//     front of the glowing open elevator, and they all hit a pose on beat 4. Camera: tracks with him (lead room), push.
//     reads: 98.36-98.60 the whip settles on Oppa · 98.6-99.6 a swaggering strut, rapping, flanked · 98.9-100.9 the
//            lights come on over him one by one · 101.5-102.0 he stops at the elevator: the pose.
//  B  102.000-103.818  bar 54  THE RIVAL RISES  [cut on the downbeat: BLACKOUT]  Every light dies. Oppa spins round to
//     look back (a take). One tube stutters on over the convertible and its headlights flare, throwing light at Oppa. In
//     that spotlight the Rival (yellow suit, mushroom hair, white shades) RISES slowly out of the driver's seat, beside
//     the deadpan Horse. At full height he turns his head to Oppa: a glint on the shades. He crouches and vaults out of
//     the car at Oppa. Camera: wide on the car and Oppa, a slow villain push toward the car.
//     reads: 102.0-102.3 blackout, Oppa turns · 102.3-102.5 the car lights up · 102.5-103.3 the slow rise ·
//            103.3-103.52 the glare (the Horse doesn't care) · 103.52-103.82 the vault (cut on action).
//  C1 103.818-105.636  bar 55  CHALLENGE 1  [cut on action: he lands ON the downbeat and every light BANGS on]
//     Two-shot favouring the Rival: he lands in a squash, slicks his hair back with both hands (beats 1-2), then
//     shoulder-shimmies at Oppa (beats 3-4), teeth gritted. Oppa watches, hands on hips, cool. The two White Dancers
//     between them go "ooh"; two more lean by the car. Camera: a push toward the Rival.
//  C2 105.636-107.455  bar 56  ANSWER 1  [cut: the reverse, on Oppa]  Oppa's HIP SWAY: hands on hips, step-touch,
//     hips swinging, rapping, the elevator glowing behind him. The Rival at the left edge, arms folded, flinches on
//     beat 4. The spectators cheer.
//  C3 107.455-109.273  bar 57  CHALLENGE 2  [cut: the reverse, on the Rival]  The Rival drops into a DEEP WIDE CROUCH
//     and pumps it on every beat, lower each time, crabbing toward Oppa, teeth bared. Oppa at the right edge adjusts
//     his shades, unimpressed. Oppa's own two dancers look impressed.
//  C4 109.273-112.909  bars 58-59  ANSWER 2 → THE MIRROR → CONVERTED → THE DOORS  [cut: wide]  One continuous shot.
//     bar 58: Oppa's LASSO: galloping, rope spinning overhead, while the two circle each other once round the mirror
//            line (each passes in front; the Rival turns through his key views to keep facing Oppa). The White Dancers
//            pick sides: Oppa's two look from one to the other... and scurry over to the Rival. Oppa is alone.
//     bar 59: the camera pushes in to a symmetric two-shot. Face-off: both lean in (111.09-111.62).
//            STAB 1 (111.71): both SNAP into the same pose, a mirror image: a finger to the sky, outer arms.
//            STAB 2 (111.99): again: they point at each other, a perfect mirror. The Rival's shades CRACK.
//            112.00-112.14: his mouth wobbles... and breaks into a huge laugh: he and his dancers burst into THE GALLOP.
//            Converted. Oppa touches his shades, nods, and glides backward into the open elevator.
//            112.42-112.86: the camera pans right to the elevator (the gallopers slide out of frame left) as the doors
//            slide shut on Oppa dropping into a squat (c08 opens on him squatting).
//  [out 112.909: STAGE.garage.elevator [3300, 600, 1.2], doors CLOSED, floor 1, call light off, lights full, nobody in
//   frame; only the convertible's nose at the left edge. c08 opens on the same framing with a DING.]
// The counter HUD is in every shot (90 M → 260 M). No lettering except the HUD and the elevator's floor number.
// ===========================================================================================
(() => {
  // ================================= time & marks =================================
  const T0 = barT(52), B54 = barT(54), B55 = barT(55), B56 = barT(56), B57 = barT(57), B58 = barT(58), B59 = barT(59), T1 = barT(60);
  const [S1, S2] = HIT.verseAccent2;                          // the two stabs: 111.71, 111.99
  const bt = (k, b = 0) => beatT(k, b);
  const EX = ELEV_X, GY = 935, RX = 2300, OX = 2980, MX = (RX + OX) / 2, ORB = (OX - RX) / 2, U = 28, UD = 23;
  const EL = { L: EX - 130, R: EX + 130, T: 400, B: FLOOR };  // the elevator's door opening
  const SEAT = 2240, RISEN = 705;                             // the Rival's spot in the car and his feet standing in it
  const HORSE = [2045, 820, 15];                              // the Horse, upright in the back seat
  const DARK = '#15111F';
  // Oppa's two White Dancers: flanking him in the strut, then (from the blackout) spectators upstage in the gap
  const UDB = 19, SPEC = [[0, 2528, 834, 'c7 d0'], [1, 2724, 828, 'c7 d1']], STRUT_END = [[OX - 360, 880], [OX + 352, 884]];

  // ================================= helpers =================================
  const poseOf = (name, move, t, o = {}) => { const q = memberOpts(name, o), d = { ...o, hand: q._hand, sleeve: q._sleeve }; return typeof move === 'string' ? dance(move, t, d) : routine(t, move, d); };
  const hipHook = (name, o = {}) => { const q = memberOpts(name, o); return bentHook(1.83, 1.85, q._sleeve, q._hand); };
  const cheekHook = (name, o = {}) => { const q = memberOpts(name, o); return bentHook(-2.05, 2.35, q._sleeve, q._hand); };
  // member() with a pose: offsets add up instead of replacing each other
  function put(name, x, y, u, pose, o = {}) {
    const r = { ...pose, ...o };
    for (const k of ['dx', 'dy', 'sq', 'rot']) r[k] = (pose[k] || 0) + (o[k] || 0);
    member(name, x, y, u, r);
  }
  const bump = (t, t0, rise = .06, k = 8) => t < t0 ? 0 : Math.sin(Math.min(1, (t - t0) / rise) * Math.PI / 2) * Math.exp(-Math.max(0, t - t0 - rise) * k);
  // a fist with the index finger out (arm space: +x runs out along the arm)
  const pointHook = col => (u, sw) => {
    paint(rrPts(.35 * u, -.24 * u, 1.25 * u, .46 * u, .21 * u), { wash: col, ink: PAL.ink, sw: sw * .6 });
    paint(ellPts(.1 * u, 0, .62 * u, .56 * u, 12), { wash: col, ink: PAL.ink, sw: sw * .7 });
  };
  const fist = col => fistHook(col, .66);
  const eighthRound = t => OFF + Math.round((t - OFF) / EIGHTH) * EIGHTH;

  // ================================= the strut path =================================
  // Oppa struts from x 1800 at T0 and eases to a stop on his mark OX exactly on beat 3 of bar 53 (legs neutral on a beat)
  const OX_A = 1800, STOP = bt(53, 3), DEC = .6, VS = (OX - OX_A) / (STOP - T0 - DEC / 2);
  function strutX(t) {
    const tA = STOP - DEC;
    if (t <= tA) return OX_A + VS * (t - T0);
    const a = Math.min(t, STOP) - tA;
    return OX_A + VS * (tA - T0) + VS * a - VS / (2 * DEC) * a * a;
  }
  // each strip light stutters on when Oppa passes under it (snapped to the nearest eighth note)
  const tubeOn = x => { const xo = x - 80; return xo <= OX_A ? -1e9 : xo > OX ? 1e9 : eighthRound(T0 + (xo - OX_A) / VS); };
  const STUT = [1, .08, .85, 0, .5, 1, .25, 1];
  const stutter = a => a < 0 ? 0 : a >= STUT.length / 24 ? 1 : STUT[Math.floor(a * 24)];

  // ================================= lighting =================================
  // repaint the lit tubes over the set's dead ones (the set is drawn with lights: 0 while it's dark)
  function tubes(kOf, burstOf) {
    const [a, , c] = viewRect2(400);
    for (let x = Math.floor(a / 400) * 400 + 100; x < c; x += 400) {
      const k = kOf(x); if (k <= .02) continue;
      for (const y of [60, 150]) { boilSeed('c7 tube ' + x + ' ' + y); fluoro(x, y, 220, k); }
      const b = burstOf ? burstOf(x) : 0;
      if (b > .02) { boilSeed('c7 burst ' + x); glow(x, 110, 330, '#F2FAFF', .8 * b * k); }
    }
  }
  function tubePools(kOf, r = 600) {
    const [a, , c] = viewRect2(400), P = [];
    for (let x = Math.floor(a / 400) * 400 + 100; x < c; x += 400) { const k = kOf(x); if (k > .02) P.push([x + 40, 660, r, k * .97]); }
    return P;
  }

  // ================================= the elevator's little car (its palette matches c08's) =================================
  function elevRoom(t, inside) {
    const { L, R, T, B } = EL, bl = L + 30, br = R - 30, btp = T + 26, bbt = B - 36;
    boilSeed('c7 lift base'); paint(rectPts(L - 4, T - 4, R - L + 8, B - T + 8), { wash: '#7E6E62', ink: null });
    boilSeed('c7 lift walls');
    paint([[L, T], [bl, btp], [bl, bbt], [L, B]], { wash: '#9A8672', ink: PAL.ink, sw: .6 });
    paint([[R, T], [br, btp], [br, bbt], [R, B]], { wash: '#9A8672', ink: PAL.ink, sw: .6 });
    boilSeed('c7 lift ceiling'); paint([[L, T], [R, T], [br, btp], [bl, btp]], { wash: '#FFF1CC', ink: PAL.ink, sw: .6 });
    boilSeed('c7 lift back');
    paint(rectPts(bl, btp, br - bl, bbt - btp), { wash: '#E2CDA2', ink: PAL.ink, sw: .7 });
    for (const x of [bl + (br - bl) / 3, bl + 2 * (br - bl) / 3]) inkLine([[x, btp + 4], [x, bbt - 4]], .5, '#A8906A', 'inkfine', 0);
    inkLine([[bl + 6, 668], [br - 6, 668]], 3.2, '#8E7A5E', 'ink', 0); inkLine([[bl + 6, 665], [br - 6, 665]], .8, '#F4E6C8', 'inkfine', 0);
    boilSeed('c7 lift floor'); paint([[bl, bbt], [br, bbt], [R, B], [L, B]], { wash: '#54473F', ink: PAL.ink, sw: .6 });
    boilSeed('c7 lift panel'); paint([[R - 20, 560], [R - 8, 552], [R - 8, 640], [R - 20, 636]], { wash: '#C8C0B4', ink: PAL.ink, sw: .4 });
    for (let k = 0; k < 4; k++) paint(ellPts(R - 14, 568 + k * 18, 3, 4, 6), { wash: '#8A8078', ink: null });
    glow(EX, T + 20, 170, '#FFE2A8', .55);
    if (inside) inside();
  }

  // ================================= the convertible's occupants (drawn in the set's back hook, so the car and the
  // floor paint over whatever sits below its door line) =================================
  function carSeat(t, o = {}) {
    if (!vis(1900, 2700)) return;
    const [hx, hy, hs] = HORSE;
    horse(hx, hy, hs, t, { view: 'up', mood: o.horseMood || 'deadpan', blink: 2, boilKey: 'c7 horse' });
    boilSeed('c7 seat');   // the driver's seat back, cream leather
    paint(rrPts(2090, 600, 42, 118, 16), { wash: '#F1E4C8', fill: '#D6C3A0', fillOp: 60, tex: .5, ink: PAL.ink, sw: .7 });
    if (o.rival) o.rival();
    boilSeed('c7 wheel');  // the steering wheel
    const Wp = ellPts(2306, 636, 8, 30, 16, 0, -.3); inkLine(Wp.concat([Wp[0]]), 2.6, '#2A2630', 'ink', .3);
    inkLine([[2306, 648], [2336, 672]], 2.2, '#2A2630', 'ink', 0);
    boilSeed('c7 undercar'); // the dark under the car's body (between the wheels)
    paint(rectPts(1990, 782, 624, 46), { wash: '#4A4652', ink: null });
  }

  // ================================= the whip-in (out of c06's right-moving smear) =================================
  const WHIP = ['#F3EFE6', '#D6D8D0', '#B8BCB6', '#86BCE8', '#F4A63A', '#FFF5E2', '#8E9096', '#E8EAE2'];
  function whipIn(lt) {
    const k = 1 - seg(lt, 0, .26); if (k <= .01) return;
    const c = Math.pow(k, 1.25), sh = lt * 2800;
    flushBrush();
    boilSeed('c7 whip veil');
    paint(rectPts(-60, -60, W + 120, H + 120), { wash: '#E4E0D6', washOp: 185 * c * c, ink: null });
    const n = Math.round(10 + 70 * c);
    for (let i = 0; i < n; i++) {
      const y = hash(i * 3.17 + 1) * (H + 60) - 30, len = (500 + 1500 * hash(i * 5.71 + 2)) * (.5 + .7 * c);
      const x0 = hash(i * 9.37 + 3) * (W + 1600) - 800 - sh, w = (.6 + 1.6 * hash(i * 2.33 + 4)) * (.4 + .8 * c);
      boilSeed('c7 whip ' + i);
      inkLine([[x0, y], [x0 + len * .5, y + jit(3)], [x0 + len, y + jit(2)]], w, WHIP[i % WHIP.length], 'dry', .1);
      if (i % 2 === 0) inkLine([[x0 + len * .2, y + 9], [x0 + len * .95, y + 9]], .7 + .6 * c, i % 4 ? PAL.ink : '#5A5F6A', 'inkfine', 0);
    }
  }

  // ================================= A · THE STRUT =================================
  function strutPose(name, t, o = {}) {
    if (t < STOP) return poseOf(name, 'strut', t, o);
    const p = poseOf(name, 'strut', t, o), f = frac(bpOf(t)), hit = bump(t, bt(53, 4), .05, 7);
    return { ...p, walk: null, dy: -.3 * Math.sin(Math.PI * f) * .5 - .5 * hit, rot: -.04 * hit, sq: .05 * Math.exp(-f * 8) };
  }
  function strutShot(t, lt, dur) {
    const x = strutX(t), wk = 1 - seg(lt, 0, .3), sm = wk > .05 ? { smear: .9 * wk, smearDir: -1 } : {};
    const cam = [x + 150 - 820 * wk * wk * wk, 568, lerp(1.1, 1.16, ease(seg(lt, .3, dur)))];
    const kOf = xx => stutter(t - tubeOn(xx));
    camBegin(...cam);
    garage(t, { lights: 0, elevOpen: 1, elevFloor: 1, hooks: {
      back: () => { tubes(kOf, xx => { const a = t - tubeOn(xx); return a >= 0 && a < .5 ? 1 - a / .5 : 0; }); carSeat(t); },
      elevInside: () => elevRoom(t),
      mid: () => {
        const dz = [[0, x - 360, 880, 'c7 d0'], [1, x + 352, 884, 'c7 d1']];
        dz.forEach(([v, dx, dy, key]) => {
          const cv = crowdVar(v + 3);
          put('dancer', dx, dy, UD, strutPose('dancer', t, { v, ph: cv.ph, side: v ? -1 : 1 }), { v, view: 'q', eyes: 'narrow', mouth: 'smirk', blush: .3, boilKey: key, ...sm });
        });
        put('oppa', x, GY, U, strutPose('oppa', t, { look: 'tux' }), { look: 'tux', view: 'q', ...singing(t, 'rap'), boilKey: 'c7 oppa', ...sm });
      }
    } });
    roomLight(.76, [...tubePools(kOf, 440), [EX, 610, 330, .95]], { col: DARK });
    camEnd();
    counterHUD(t);
    whipIn(lt);
  }

  // ================================= B · THE RIVAL RISES =================================
  const RISE0 = B54 + .32, RISE1 = B54 + 1.12, GLARE = B54 + 1.16, V0 = B55 - .29;
  const riseY = t => lerp(1040, RISEN, ease(seg(t, RISE0, RISE1)));
  const vaultK = t => seg(t, V0, B55);
  const vaultPt = t => arcPt([SEAT, RISEN], [RX, GY], 235, vaultK(t));
  function rivalInCar(t) {        // hidden, rising, glaring, crouching to vault (drawn behind the car body)
    const crouch = ease(seg(t, V0 - .14, V0)), turned = t >= GLARE;
    const tr = turned ? turn(t, GLARE, GLARE + .12, 0, .125) : { view: 'front' };
    put('rival', SEAT, riseY(t), U, {}, {
      ...tr, aL: -1.25 + .9 * crouch, aR: -1.25 + .9 * crouch, armLen: .95, armL: fist(HAND_R), armR: fist(HAND_R),
      sq: -.04 * seg(t, RISE0, RISE1) + .22 * crouch, rot: turned ? .05 : 0, mouth: t > GLARE ? 'teeth' : 'flat', boilKey: 'c7 rival'
    });
  }
  const HAND_R = '#D8805E', HAND_O = '#DC7B58';
  function rivalVault(t) {        // in flight (drawn in front of the car)
    const [x, y] = vaultPt(t), k = vaultK(t);
    put('rival', x, y, U, {}, { view: 'q', aL: 1.2, aR: 1.3, armLen: 1.1, armL: fist(HAND_R), armR: fist(HAND_R), sq: -.18 * Math.sin(Math.PI * k), rot: .12 * k, mouth: 'teeth', noShadow: true, boilKey: 'c7 rival' });
  }
  function glint(x, y, s, k) {    // a four-point sparkle
    if (k <= .02) return;
    boilSeed('c7 glint');
    glow(x, y, 60 * s * k, '#FFF6D8', .9 * k);
    paint(starPts(x, y, 26 * s * k, .22, 4, -Math.PI / 2), { wash: '#FFFDF4', ink: null });
  }
  function riseShot(t, lt, dur) {
    const p = lt / dur, cam = [lerp(2560, 2440, ease(p)), lerp(620, 612, p), lerp(1.02, 1.12, ease(p))];
    const kCar = stutter(lt - .16), kHead = easeOut(seg(lt, .26, .36)) * (1 + .25 * bump(t, B54 + .26, .04, 6));
    const oppaTurn = turn(t, B54 + .05, B54 + .26, .125, -.125), tk = take(t, B54 + .06, .6);
    camBegin(...cam);
    garage(t, { lights: 0, elevOpen: 1, elevFloor: 1, hooks: {
      back: () => {
        tubes(xx => Math.abs(xx - 2100) < 1 ? kCar : 0);
        carSeat(t, { rival: t < V0 ? () => rivalInCar(t) : vaultK(t) < .09 ? () => rivalVault(t) : null });
      },
      elevInside: () => elevRoom(t),
      mid: () => {
        SPEC.forEach(([v, gx, gy, key]) => {
          const k = ease(seg(t, RISE0 + .25 + .1 * v, RISE1 + .15 + .1 * v)), [sx0, sy0] = STRUT_END[v];
          const tr = k > 0 && k < 1 ? { view: 'q', flip: true } : turn(t, B54 + .1 + .06 * v, B54 + .3 + .06 * v, .125, -.125);
          put('dancer', lerp(sx0, gx, k), lerp(sy0, gy, k), lerp(UD, UDB, k), poseOf('dancer', 'groove', t, { v, e: .3 }), { v, ...tr, walk: k > 0 && k < 1 ? (t - OFF) / BEAT : null, eyes: t > RISE0 + .3 ? 'wide' : 'normal', mouth: t > RISE0 + .3 ? 'o' : 'flat', lookX: -.6, boilKey: key });
        });
        put('oppa', OX, GY, U, { aL: -.55, aR: -.55, armLen: .72, armL: hipHook('oppa', { look: 'tux' }), armR: hipHook('oppa', { look: 'tux' }), frontArm: 'LR' },
          { look: 'tux', ...oppaTurn, sq: tk.sq, dy: tk.dy, mouth: t > GLARE ? 'flat' : 'o', boilKey: 'c7 oppa' });
        if (t >= V0 && vaultK(t) >= .09) rivalVault(t);
        // the headlights (their glow, over the car)
        boilSeed('c7 headlights');
        if (kHead > .01) { glow(2600, 730, 150 * kHead, '#FFF2C8', .95); glow(2760, 780, 240 * kHead, '#FFF2C8', .35); }
        if (t > GLARE && t < V0) { const k = bump(t, GLARE + .04, .06, 5); glint(SEAT + 2.9 * U * .86, riseY(t) - 6.05 * U * 1.14 - 6, 1, k); }
      }
    } });
    roomLight(.84, [[2170, 600, 470, kCar * .98], [2600, 740, 150, kHead * .8], [2820, 850, 330, kHead * .55], [EX, 610, 320, .85]], { col: DARK });
    camEnd();
    counterHUD(t);
  }

  // ================================= the battle: shared pieces =================================
  const oppaCool = (t, extra = {}) => ({ aL: -.55, aR: -.55, armLen: .72, armL: hipHook('oppa', { look: 'tux' }), armR: hipHook('oppa', { look: 'tux' }), frontArm: 'LR', ...dance('groove', t, { e: .4 }), ...extra });
  const rivalFolded = t => ({ ...dance('groove', t, { e: .3 }), frontArm: 'LR', armLen: 2.3, aR: Math.PI + .4, aL: Math.PI + .4, armR: fist(HAND_R), armL: fist(HAND_R) });
  // (SPEC, STRUT_END and UDB are defined up top)
  function spectators(t, react) { SPEC.forEach(([v, x, y, key]) => react(v, x, y, key)); }
  function battleSet(t, hooks, o = {}) {
    garage(t, { elevOpen: o.open ?? 1, elevFloor: 1, hooks: { back: () => carSeat(t), elevInside: () => elevRoom(t, o.inside), ...hooks } });
  }

  // ================================= C1 · CHALLENGE 1: hair slick, shimmy =================================
  const R1 = [[B55 - 1, 'crouch'], [B55 + .1, 'hairslick'], [bt(55, 2), 'shimmy']];
  function c1Shot(t, lt, dur) {
    const p = lt / dur, [sx, sy] = shakeXY(t, 12 * Math.exp(-lt * 9));
    camBegin(lerp(2590, 2525, ease(p)) + sx, 655 + sy, lerp(1.1, 1.18, ease(p)));
    battleSet(t, { mid: () => {
      spectators(t, (v, x, y, key) => {
        const ooh = seg(lt, .15 + .08 * v, .35 + .08 * v);
        put('dancer', x, y, UDB, poseOf('dancer', 'groove', t, { v, e: .5 }), { v, aL: .2 + .9 * ooh, aR: .2 + .9 * ooh, eyes: ooh > .5 ? 'wide' : 'narrow', mouth: ooh > .5 ? 'O' : 'flat', lookX: -.8, noShadow: true, boilKey: key });
      });
      const land = Math.exp(-lt * 9) * Math.cos(lt * 22);
      put('rival', RX, GY, U, poseOf('rival', R1, t), { mouth: t < bt(55, 2) ? 'flat' : 'teeth', sq: .28 * land, rot: .03, boilKey: 'c7 rival' });
      put('oppa', OX, GY, U, oppaCool(t), { look: 'tux', view: 'q', flip: true, mouth: 'smirk', rot: t > bt(55, 2.5) ? -.03 : 0, boilKey: 'c7 oppa' });
    } });
    camEnd();
    flash(.6 * Math.exp(-lt * 12), '#FFFCF0');
    counterHUD(t);
  }

  // ================================= C2 · ANSWER 1: Oppa's hip sway =================================
  function c2Shot(t, lt, dur) {
    const p = lt / dur;
    camBegin(lerp(3005, 2985, ease(p)), 668, lerp(1.36, 1.43, ease(p)));
    battleSet(t, { mid: () => {
      spectators(t, (v, x, y, key) => {
        const sw = seg(lt, .25 + .15 * v, .45 + .15 * v), ch = cheekHook('dancer', { v }), g = poseOf('dancer', 'groove', t, { v, e: .5, ph: .1 * v });
        put('dancer', x, y, UDB, sw > .5 ? { ...g, aL: 1.0, aR: 1.0, armLen: .8, armL: ch, armR: ch, frontArm: 'LR', rot: .06 * Math.sin((t - OFF) / BEAT * Math.PI) } : g,
          { v, eyes: sw > .5 ? 'heart' : 'wide', mouth: sw > .5 ? 'cat' : 'o', blush: .8 * sw, noShadow: true, boilKey: key });
      });
      const fl = take(t, bt(56, 3), .7);
      put('rival', RX, GY, U, rivalFolded(t), { view: 'q', mouth: t > bt(56, 3) ? 'o' : 'flat', sq: fl.sq, dy: fl.dy, boilKey: 'c7 rival' });
      put('oppa', OX, GY, U, poseOf('oppa', 'hipsway', t, { look: 'tux' }), { look: 'tux', ...singing(t, 'rap'), boilKey: 'c7 oppa' });
    } });
    camEnd();
    counterHUD(t);
  }

  // ================================= C3 · CHALLENGE 2: the deep crouch =================================
  function crouchPose(t) {
    const b = clamp(Math.floor((t - B57) / BEAT), 0, 3), f = frac((t - OFF) / BEAT), hit = Math.exp(-f * 7), drop = easeOut(seg(t, B57, B57 + .12));
    const base = poseOf('rival', 'crouch', t);
    return { ...base, legSplay: 1.2 + .5 * drop + .1 * b, sq: (.1 + .1 * drop + .035 * b) + .06 * hit, dy: .1 * drop, aL: .15 + .5 * hit, aR: .15 + .5 * hit, dx: .16 * b + .06 * hit, rot: .02 };
  }
  function c3Shot(t, lt, dur) {
    const p = lt / dur;
    camBegin(lerp(2335, 2355, ease(p)), 715, lerp(1.38, 1.46, ease(p)));
    battleSet(t, { mid: () => {
      spectators(t, (v, x, y, key) => {
        const wow = seg(lt, .1 + .1 * v, .3 + .1 * v);
        put('dancer', x, y, UDB, poseOf('dancer', 'groove', t, { v, e: .4 }), { v, aL: .3 + .7 * wow, aR: .3 + .7 * wow, eyes: 'wide', mouth: 'O', lookX: -.8, emote: wow > .5 ? '!' : undefined, emoteK: wow, noShadow: true, boilKey: key });
      });
      put('rival', RX, GY, U, crouchPose(t), { mouth: 'teeth', emote: 'anger', emoteK: seg(lt, .15, .35), boilKey: 'c7 rival' });
      const shades = seg(t, bt(57, 2.2), bt(57, 2.5)) * (1 - seg(t, bt(57, 3.4), bt(57, 3.7)));
      put('oppa', OX, GY, U, oppaCool(t, shades > .5 ? { aR: 1.0, armLen: { R: .8, L: .72 }, armR: cheekHook('oppa', { look: 'tux' }) } : {}), { look: 'tux', view: 'q', flip: true, mouth: 'smirk', boilKey: 'c7 oppa' });
    } });
    camEnd();
    counterHUD(t);
  }

  // ================================= C4 · the lasso circle, the mirror, the conversion, the doors =================================
  function orbitPos(t, who) {           // who 0 = Oppa (starts right), 1 = the Rival (starts left)
    const p = seg(t, B58, B59), th = (who ? Math.PI : 0) + p * TAU, z = Math.sin(th);
    return { x: MX + Math.cos(th) * ORB, y: GY + 52 * z, s: 1 + .1 * z, th };
  }
  function orbitTrail(t, who) {         // a scuffed arc of dust on the floor behind each of them as they circle
    const p = seg(t, B58, B59); if (p <= .02 || p >= 1) return;
    const th = (who ? Math.PI : 0) + p * TAU, n = 12, len = Math.min(1.5, p * TAU), P = [];
    for (let i = 0; i <= n; i++) { const a = th - i / n * len; P.push([MX + Math.cos(a) * ORB, GY + 52 * Math.sin(a) + 8]); }
    boilSeed('c7 trail ' + who);
    inkLine(P, 2.2, '#F2F0E8', 'dry', .5);
    inkLine(P.slice(0, 8), .6, '#9A9EA0', 'inkfine', .5);
  }
  function faceView(fromTh) {           // the Rival's key view when Oppa is at angle fromTh+π round the circle
    let h = .25 - (fromTh + Math.PI) / TAU; h = ((h + .5) % 1 + 1) % 1 - .5;
    const a = Math.abs(h), hh = a <= .25 ? h * .5 : Math.sign(h) * (.125 + (a - .25));
    return a > .45 ? { view: 'back', flip: false } : spinView(hh);
  }
  // the White Dancers pick sides: Oppa's two scurry over to the Rival's side on beats 2-3 of bar 58
  const SIDE = { 0: [2528, 2130], 1: [2724, 1990] };
  const GO = v => [bt(58, 2.85) + .06 * v, bt(58, 3.85) + .06 * v];          // their scurry over to the Rival's side
  const sideX = (v, t) => lerp(SIDE[v][0], SIDE[v][1], ease(seg(t, ...GO(v))));
  // Oppa's exit: hand to the shades (a nod), two little hops backward into the elevator, then a squat as the doors shut
  const NOD = S2 + .12, HOP = [S2 + .25, S2 + .41, S2 + .57], SQUAT0 = S2 + .61, DOOR0 = S2 + .6, DOOR1 = T1 - .05;
  function oppaExit(t) {
    let k = 0, dy = 0, sq = 0;
    for (let i = 0; i < 2; i++) if (t >= HOP[i]) {
      const q = seg(t, HOP[i], HOP[i + 1]); k = (i + ease(q)) / 2;
      if (t < HOP[i + 1]) { dy = -1.15 * 4 * q * (1 - q); sq = -.1 * Math.sin(Math.PI * q); }
    }
    for (let i = 0; i < 2; i++) if (t < HOP[i] && t > HOP[i] - .06) sq += .13 * seg(t, HOP[i] - .06, HOP[i]);   // anticipation
    for (let i = 1; i < 3; i++) if (t >= HOP[i]) sq += .15 * Math.exp(-(t - HOP[i]) * 16);                        // landings
    return { x: lerp(OX, EX, k), y: lerp(GY, FLOOR - 2, k), u: lerp(U, 18, k), inside: k > .97, dy, sq };
  }
  function c4Cam(t) {
    let cx = lerp(2610, 2630, seg(t, B58, B59)), cy = 645, z = lerp(1.0, 1.05, seg(t, B58, B59));
    const pin = ease(seg(t, B59, B59 + .5));
    cx = lerp(cx, MX, pin); cy = lerp(cy, 650, pin); z = lerp(z, 1.2, pin);
    z *= 1 + .045 * bump(t, S1, .03, 7) + .06 * bump(t, S2, .03, 6);
    const pan = ease(seg(t, S2 + .43, DOOR1 - .01));
    return [lerp(cx, EX, pan), lerp(cy, 600, pan), lerp(z, 1.2, pan)];
  }
  function mirrorPose(name, t, side, o = {}) {   // side -1 = the Rival (left), 1 = Oppa (right); the two stab poses, mirrored
    const q = memberOpts(name, name === 'oppa' ? { look: 'tux' } : o), hand = q._hand, hip = bentHook(1.83, 1.85, q._sleeve, q._hand);
    const a1 = t >= S1 ? 1 : 0, a2 = t >= S2 ? 1 : 0, set = ring(t, [S1, S2], 7, 26);
    if (a2) {   // point at each other: the inner arm straight out, the outer hand on the hip
      const inner = side < 0 ? 'R' : 'L', outer = side < 0 ? 'L' : 'R';
      return { ['a' + inner]: .06 + .04 * set, ['a' + outer]: -.55, armLen: { [inner]: 1.55, [outer]: .72 }, ['arm' + inner]: pointHook(hand), ['arm' + outer]: hip, frontArm: outer, legSplay: .75, rot: -side * .1, sq: .08 * set, dy: -.1 * set };
    }
    if (a1) {   // a finger to the sky: the outer arm straight up, the inner hand on the hip
      const inner = side < 0 ? 'R' : 'L', outer = side < 0 ? 'L' : 'R';
      return { ['a' + outer]: 1.52, ['a' + inner]: -.55, armLen: { [outer]: 1.45, [inner]: .72 }, ['arm' + outer]: pointHook(hand), ['arm' + inner]: hip, frontArm: inner, legSplay: .6, rot: side * .04, sq: .08 * set, dy: -.25 * set };
    }
    return null;
  }
  const crackFace = k => (u, sw, F) => {
    if (k <= .01) return;
    for (const s of F.sides) {
      const cx = s * 2.5 * u, cy = -6.05 * u, P = [[-1.15, -.75], [-.45, -.15], [-.75, .25], [.05, .3], [.55, .95]].map(([a, b]) => [cx + a * u * lerp(.4, 1, k), cy + b * u * lerp(.4, 1, k)]);
      inkLine(P, sw * .9, '#F6F2EA', 'inkfine', 0);
      inkLine([[cx - .45 * u, cy - .15 * u], [cx - .05 * u, cy - .7 * u * k]], sw * .6, '#F6F2EA', 'inkfine', 0);
    }
  };
  function c4Shot(t, lt, dur) {
    const cam = c4Cam(t), ex = oppaExit(t), doors = 1 - ease(seg(t, DOOR0, DOOR1));
    const drawOppa = () => {
      if (t < B59) {       // the lasso, galloping round the circle
        const o = orbitPos(t, 0);
        return [o.y, () => put('oppa', o.x, o.y, U * o.s, poseOf('oppa', 'lasso', t, { look: 'tux' }), { look: 'tux', ...singing(t, 'rap'), boilKey: 'c7 oppa' })];
      }
      const m = mirrorPose('oppa', t, 1);
      if (t < S1 - .1) {   // the face-off: facing him, leaning in
        return [GY, () => put('oppa', OX, GY, U, oppaCool(t), { look: 'tux', view: 'q', flip: true, rot: -.06 * seg(t, B59, B59 + .3), mouth: 'smirk', boilKey: 'c7 oppa' })];
      }
      if (t < S1) return [GY, () => put('oppa', OX, GY, U, oppaCool(t), { look: 'tux', view: 'q', flip: true, sq: .12 * seg(t, S1 - .1, S1), mouth: 'flat', boilKey: 'c7 oppa' })];
      if (t < NOD) return [GY, () => put('oppa', OX, GY, U, m, { look: 'tux', mouth: 'smirk', boilKey: 'c7 oppa' })];
      // the hand to his shades (a nod), the hops back into the elevator, then the squat
      const sq = ease(seg(t, SQUAT0, SQUAT0 + .1)), nod = bump(t, NOD, .05, 9);
      const pose = sq > 0 ? { legSplay: 1.1 * sq, sq: .25 * sq, aL: lerp(-1.2, -.45, sq), aR: lerp(1.0, -.45, sq), armLen: .95, armL: fist(HAND_O), armR: sq > .5 ? fist(HAND_O) : cheekHook('oppa', { look: 'tux' }) }
        : { aR: 1.0, armLen: { R: .8, L: .9 }, armR: cheekHook('oppa', { look: 'tux' }), aL: -1.25, armL: fist(HAND_O), frontArm: 'R', sq: .1 * nod };
      return [ex.y, () => put('oppa', ex.x, ex.y, ex.u, pose, { look: 'tux', mouth: 'smirk', dy: ex.dy, sq: ex.sq, boilKey: 'c7 oppa' }), ex.inside];
    };
    const drawRival = () => {
      if (t < B59) {
        const o = orbitPos(t, 1), op = orbitPos(t, 0), fv = faceView(op.th - Math.PI);
        const walk = { ...dance('groove', t, { e: .6 }), walk: (t - OFF) / BEAT / 2, legSplay: .55, sq: .1, aL: .35, aR: .35, armLen: 1.15, armL: fist(HAND_R), armR: fist(HAND_R) };
        return [o.y, () => put('rival', o.x, o.y, U * o.s, walk, { ...fv, mouth: 'teeth', boilKey: 'c7 rival' })];
      }
      const m = mirrorPose('rival', t, -1), crack = t >= S2 ? ease(seg(t, S2, S2 + .06)) : 0, face = crackFace(crack);
      if (t < S1 - .1) return [GY, () => put('rival', RX, GY, U, rivalFolded(t), { view: 'q', rot: .06 * seg(t, B59, B59 + .3), mouth: 'teeth', boilKey: 'c7 rival' })];
      if (t < S1) return [GY, () => put('rival', RX, GY, U, rivalFolded(t), { view: 'q', sq: .12 * seg(t, S1 - .1, S1), mouth: 'flat', boilKey: 'c7 rival' })];
      if (t < S2 + .12) {    // the mirror, then the crack: his mouth wobbles, his body shudders
        const shud = t > S2 ? .07 * Math.sin((t - S2) * 90) * (1 - seg(t, S2, S2 + .12)) : 0;
        return [GY, () => put('rival', RX, GY, U, m, { mouth: t > S2 + .02 ? 'wobble' : 'flat', dx: shud, face, emote: t > S2 ? '!' : undefined, emoteK: seg(t, S2, S2 + .06), boilKey: 'c7 rival' })];
      }
      // CONVERTED: a hop into the gallop, laughing, galloping off to the left
      const g = poseOf('rival', 'gallop', t), hop = jump(t, S2 + .15, S2 + .36, 1.4), x = RX - 90 * ease(seg(t, S2 + .36, T1));
      return [GY, () => put('rival', x, GY, U, g, { mouth: frac(bpOf(t) * 2) < .5 ? 'laugh' : 'open', blush: .5, face, dy: hop.dy, sq: hop.sq, emote: 'music', emoteK: seg(t, S2 + .3, S2 + .5), boilKey: 'c7 rival' })];
    };
    const drawDancers = () => SPEC.map(([v, , y, key]) => {
      const x = sideX(v, t) - (t > S2 + .2 ? 80 * ease(seg(t, S2 + .3, T1)) : 0);
      const [g0, g1] = GO(v), moving = t > g0 && t < g1;
      let pose, o = { v, boilKey: key };
      if (t >= S2 + .16 + .03 * v) { pose = poseOf('dancer', 'gallop', t, { v, ...crowdVar(v) }); o = { ...o, eyes: 'happy', mouth: 'open' }; }
      else if (t >= S1 && t >= B59) { pose = mirrorPose('dancer', t, -1, { v }) || {}; o = { ...o, eyes: 'narrow', mouth: 'flat' }; }
      else if (moving) { pose = { ...poseOf('dancer', 'groove', t, { v }), walk: (t - OFF) / BEAT * 1.4, aL: -.2, aR: .6 }; o = { ...o, view: 'q', flip: true, eyes: 'narrow', mouth: 'smirk', smear: .3 }; }
      else if (t < g0) {    // torn: whole-body glances from one to the other on the beats, then at each other
        const bi = Math.floor((t - B58) / BEAT), atEach = t > bt(58, 2.3), left = bi % 2 === 0;
        const vw = atEach ? { view: 'q', flip: v === 1 } : { view: 'q', flip: left };
        pose = poseOf('dancer', 'groove', t, { v, e: .4 }); o = { ...o, ...vw, eyes: atEach ? 'narrow' : 'wide', mouth: atEach ? 'smirk' : 'o' };
      }
      else { pose = poseOf('dancer', 'hairslick', t, { v, e: .6 }); o = { ...o, eyes: 'narrow', mouth: 'smirk' }; }
      return [y, () => put('dancer', x, y, UDB, pose, { ...o, noShadow: true })];
    });
    const O = drawOppa(), R = drawRival();
    camBegin(...cam);
    battleSet(t, { mid: () => {
      orbitTrail(t, 0); orbitTrail(t, 1);
      const L = [...drawDancers(), R]; if (!O[2]) L.push(O);
      L.sort((a, b) => a[0] - b[0]).forEach(d => d[1]());
    } }, { open: doors, inside: O[2] ? O[1] : null });
    camEnd();
    counterHUD(t);
  }

  shots([[T0, strutShot], [B54, riseShot], [B55, c1Shot], [B56, c2Shot], [B57, c3Shot], [B58, c4Shot]]);
})();
