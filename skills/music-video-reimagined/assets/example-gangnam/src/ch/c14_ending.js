// c14_ending.js · barT(116) = 214.727 → PROJECT.duration = 227.5 · THE OUTRO, then THE SILENT ENDING at dusk
//
// ================================================== SHOT PLAN ==================================================
// The music (measured from the soundtrack): 214.62–215.0 a last vocal pickup with the low end still out → 215.01 THE
// FINAL BOOM (the loudest hit of the song, ~0.45 s of sustain) → 215.5–220.18 a long ring-out that fades steadily, no
// more beat → 220.182 the song CUTS DEAD → silence to the end.
//
// O1 · 214.727–220.182 · THE OUTRO · the laser hall, one continuous take, continuous from c13
//   214.727  SEAM IN: camera STAGE.laserHall.wide [960, 560, .72]; Oppa ('party', bareEyes) at (960, 900) u 24 and the
//            Horse (upright, in Oppa's shades) at (1250, 900) s 16, both mid-lasso; the whole party dancing around them.
//   214.86   anticipation: everyone dips into a crouch, arms pulled in (the wind-up for the last hit).
//   215.01   THE BOOM: the final pose, landing with overshoot. Oppa throws both arms up in the V (bare-eyed joy), the Horse
//            flings the lasso high (grinning under the shades), the crowd splits between the V and the lasso. A confetti
//            burst, the lasers flare, a white flash, a camera punch.
//   215.2–219.95  THE TRIUMPHANT FREEZE: everyone holds the pose (breathing, the lassos still spinning but slowing as the
//            music fades, confetti drifting down, the lasers slowing and dimming) while the camera pulls back over the
//            crowd: the stage recedes and the backs of the nearest partygoers, arms up, rise into the bottom of frame.
//            The counter HUD slows to 9,223,372,036,854,775,806, reaching it at 220.18.
//   reads:   215.0–216.2  the final pose: Oppa and the Horse side by side, centre
//            216.2–218.6  the pull-back: the whole cast in the pose (the curtain call)
//            218.6–220.18 everything settles; the counter crawls to …806
//   OUT:     220.182 SMASH CUT TO SILENCE, exactly on the song's hard cut.
//
// T1 · 220.182–226.6 · THE TAIL · the playground at dusk (rhymes with c01's opening), silence, one take, a slow push-in
//   The set: the empty sandbox under a lilac-and-gold sky, a warm low sun sinking behind the city, the pink umbrella,
//   the lounger. THE Horse (chestnut, spark star, Oppa's shades) reclines in the lounger ('sit' view, leaned back into
//   the backrest, nose in the air), sipping Oppa's drink (the glass on the side table) through an extra-long straw.
//   Its near foreleg (an upright horse()'s foreleg, masked in through a layer) rests on its belly. The HUD reads …806.
//   220.18–221.5  THE CALM: shades on, nose up to the sunset, slow sips (the drink goes up the straw, the level drops).
//   221.5–222.6   THE GLANCE: the sipping stops; the head dips, the shades slide down the nose, and over the rim the eye
//                 slides to US. One slow deadpan blink (222.25).
//   222.6–223.95  THE TWIRL: the hoof lifts off the belly (anticipation) and does ONE tiny lasso twirl (223.0–223.6).
//                 223.6 (T_TAIL1): …807, the HUD bounces. The hoof settles back.
//   223.78–224.95 THE SMIRK: it tips its nose up at the counter (hold), the eye comes back to us, a slow smug smile.
//   224.93–225.35 ONE MORE TWIRL… quicker, cockier.
//   225.35        OVERFLOW (T_TAIL2): the HUD turns red, −9,223,372,036,854,775,808, and pops; GLITCH spikes over the
//                 whole frame, the camera jolts.
//   225.52        "uh-oh": the eye goes WIDE (mood 'surprised'), the shades jump, the loop drops, one sweat drop.
//                 The glitch keeps flickering.
//   226.42–226.6  the glitch surges and the picture collapses into a bright line, then a dot (a CRT switching off).
// T2 · 226.6–227.5 · BLACK. The afterglow dot fades in the first 0.3 s; black to the end.
// ================================================================================================================
(() => {
  const BOOM = 215.01, ANTIC = 214.86, TCUT = HIT.cut, TBLK = 226.6;
  const rot2 = (p, a) => [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)];
  const bump = (t, t0, amp, k = 5.5, w = 20) => { const a = t - t0; return a >= 0 && a < .8 ? amp * Math.exp(-a * k) * Math.sin(a * w + .3) : 0; };

  // ================================================== O1 · THE OUTRO ==================================================
  // after the boom the energy drains: lassos and lasers slow down as the ring-out fades (closed-form phase integrals)
  const drain = (t, r0, r1, tau) => { if (t <= BOOM) return (t - BOOM) * r0; const a = t - BOOM; return r1 * a + (r0 - r1) * tau * (1 - Math.exp(-a / tau)); };
  const hallT = t => BOOM + drain(t, 1, .22, 1.3);                     // warped time for the hall's lasers and lights
  const lassoSpin = (t, ph = 0) => drain(t, 1 / BEAT, .55, 1.4) + ph;  // turns: one per beat at the boom, slowing
  const easeIO = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
  const dollyP = t => easeIO(seg(t, 215.75, 219.95));
  // the camera: c13's framing → a punch in on the boom (the final pose, big) → a slow pull back over the crowd
  function outroCam(t) {
    if (t < BOOM) return [960, 560, .72];
    const k = easeOut(seg(t, BOOM, BOOM + .2)), p = dollyP(t), sp = .015 * spring(t, BOOM + .2, 7, 16);
    return [lerp(960, 1095, k) - 15 * p, lerp(560, 650, k) - 40 * p, lerp(.72, .86, k) / (1 + .3 * p) * (1 + sp)];
  }
  // the pose envelope: dancing → the crouch (anticipation) → the final pose (backOut overshoot) → the held freeze
  const crouchK = t => ease(seg(t, ANTIC, BOOM));
  const hitK = t => backOut(seg(t, BOOM, BOOM + .24));
  const breath = (t, ph) => Math.sin((t * .9 + ph) * TAU);
  const NUM = ['dy', 'dx', 'sq', 'rot', 'aL', 'aR', 'legSplay'];
  function blendPose(a, b, k) {
    const r = { ...(k < .5 ? a : b) };
    for (const f of NUM) r[f] = lerp(a[f] ?? (f === 'aL' || f === 'aR' ? .2 : 0), b[f] ?? (f === 'aL' || f === 'aR' ? .2 : 0), k);
    const la = typeof a.armLen === 'object' ? a.armLen : { L: a.armLen ?? 1, R: a.armLen ?? 1 }, lb = typeof b.armLen === 'object' ? b.armLen : { L: b.armLen ?? 1, R: b.armLen ?? 1 };
    r.armLen = { L: lerp(la.L ?? 1, lb.L ?? 1, k), R: lerp(la.R ?? 1, lb.R ?? 1, k) };
    const A = a.legLift || [0, 0, 0, 0], B = b.legLift || [0, 0, 0, 0]; r.legLift = B.map((v, i) => lerp(A[i], v, k));
    return r;
  }
  // the final poses, held and breathing (no beat: the music has stopped pulsing)
  function holdV(t, o) {
    const b = breath(t, o.ph || 0), s = o.sway || 0;
    return { aL: 1.1 + .05 * b + s, aR: 1.02 - .05 * b + s, armLen: 1.32, armL: fistHook(o.hand), armR: fistHook(o.hand), legSplay: .65, dy: -.05 - .06 * b, sq: -.02 + .02 * b, rot: .015 * b, legLift: [0, 0, 0, 0] };
  }
  function holdLasso(t, o) {
    const b = breath(t, o.ph || 0), S = o.side ?? 1, spin = lassoSpin(t, o.ph || 0), up = 1.42 + .05 * Math.sin(spin * TAU);
    const r = { legSplay: .9, dy: -.04 - .05 * b, sq: .02 * b, rot: -.02 * S + .01 * b, legLift: [0, 0, 0, 0], frontArm: S > 0 ? 'L' : 'R' };
    const rein = Math.PI + .36, hook = lassoHook(S > 0 ? 'R' : 'L', up, spin % 1, o.e ?? 1, PAL.ink, o.hand || PAL.clay);
    if (S > 0) Object.assign(r, { aR: up, armR: hook, aL: rein, armL: fistHook(o.hand, .78), armLen: { R: 1.15, L: 2.4 } });
    else Object.assign(r, { aL: up, armL: hook, aR: rein, armR: fistHook(o.hand, .78), armLen: { L: 1.15, R: 2.4 } });
    return r;
  }
  const CROUCH = { sq: .2, dy: .12, aL: -.35, aR: -.35, armLen: 1, legSplay: 1.1, rot: 0, dx: 0 };
  // a character's pose at t: the lasso dance (as c13 hands it over), the dip, the hit, the hold
  function partyPose(t, final, o) {
    const dancing = dance('lasso', t, o);
    if (t < ANTIC) return dancing;
    const held = final === 'v' ? holdV(t, o) : holdLasso(t, o);
    if (t < BOOM) return blendPose(dancing, { ...dancing, ...CROUCH, legLift: [0, 0, 0, 0] }, crouchK(t));
    return blendPose({ ...held, ...CROUCH }, held, hitK(t));
  }
  // the tableau: a wedge opening out from the leads, a back row of raised hands filling the gaps (back to front)
  const PARTY = [
    ['crowd', -150, 832, 11, 'v', { v: 1 }], ['crowd', 330, 830, 11, 'l', { v: 4 }], ['dancer', 590, 834, 11, 'v', { v: 1 }],
    ['crowd', 1650, 832, 11, 'v', { v: 7 }], ['commuter', 1930, 830, 11, 'v', { v: 4 }], ['dancer', 2300, 834, 11, 'v', { v: 3 }],
    ['granny', 170, 842, 14, 'v', { v: 0 }], ['grandpa', 2070, 842, 14, 'v', {}],
    ['elev', 440, 850, 16, 'v', {}], ['boss', 1800, 850, 17, 'l', {}],
    ['pop', 700, 862, 18, 'l', { side: -1 }], ['rival', 1510, 862, 18, 'v', {}],
    ['kid', 790, 972, 13, 'v', {}]
  ];
  const FACE = { oppa: ['happy', 'open'], kid: ['determined', 'grin'], rival: ['happy', 'grin'], elev: ['wide', 'open'], pop: ['happy', 'open'], boss: ['happy', 'laugh'], granny: ['happy', 'open'], grandpa: ['happy', 'grin'], dancer: ['happy', 'smile'], crowd: ['happy', 'open'], commuter: ['happy', 'grin'] };
  function partyMember(t, name, x, y, u, fin, ex, i) {
    const q = memberOpts(name, ex), cv = crowdVar(i + 3), o = { ph: cv.ph, e: cv.e, side: ex.side ?? 1, hand: q._hand, sleeve: q._sleeve, sway: (hash(i * 4.1) - .5) * .12 };
    const pose = partyPose(t, fin, o), [eyes, mouth] = FACE[name] || FACE.crowd, hit = t > BOOM - .02;
    member(name, x, y, u, { ...ex, ...pose, eyes: t < ANTIC ? 'happy' : hit ? eyes : 'squeeze', mouth: hit ? mouth : 'smile', noShadow: u < 15, boilKey: 'party' + i });
  }
  function party(t) {
    PARTY.forEach((p, i) => { if (p[2] < 900) partyMember(t, ...p, i); });
    // THE LEADS: Oppa (bare-eyed) and the Horse (upright, in his shades), side by side
    const oq = memberOpts('oppa', { look: 'party', bareEyes: true }), oo = { hand: oq._hand, sleeve: oq._sleeve, ph: 0 };
    const op = partyPose(t, 'v', oo), hop = t >= BOOM ? jump(t, BOOM - .02, BOOM + .2, .9) : { dy: 0, sq: 0 };
    member('oppa', 960, 900, 24, { look: 'party', bareEyes: true, ...op, dy: (op.dy || 0) + hop.dy, sq: (op.sq || 0) + hop.sq, eyes: t < ANTIC ? 'happy' : t < BOOM ? 'squeeze' : 'happy', mouth: t < BOOM ? 'grin' : 'open', blush: .4, boilKey: 'oppa' });
    const hp = partyPose(t, 'l', { hand: GP.hoof, ph: .05, e: 1.45 });
    horse(1250, 900, 16, t, { view: 'up', shades: true, mood: t < BOOM ? 'deadpan' : 'joy', ...hp, boilKey: 'c14 party horse' });
    PARTY.forEach((p, i) => { if (p[2] >= 900) partyMember(t, ...p, i); });
  }
  // the nearest partygoers, seen from behind (screen space, a nearer depth): they rise as the camera pulls back,
  // their raised arms framing the stage; the foreground falls into shadow
  const NEAR = [['crowd', 140, 5, 0], ['commuter', 470, 3, .3], ['crowd', 1470, 8, .6], ['dancer', 1800, 2, .15]];
  function nearCrowd(t) {
    const p = dollyP(t); if (p <= .01) return;
    NEAR.forEach(([name, x, v, ph], i) => {
      const u = lerp(34, 27, p), y = H + 110 + 280 * Math.pow(1 - p, 1.4) + 24 * hash(i * 2.7) - 8 * Math.sin((t * .7 + ph) * TAU);
      const q = memberOpts(name, { v });
      member(name, x + 20 * Math.sin((t * .35 + ph) * TAU), y, u, { v, ...holdV(t, { ph, hand: q._hand, sway: (i % 2 ? .06 : -.06) }), view: 'back', noShadow: true, boilKey: 'near' + i });
    });
    castShadow([[[-40, H - 250], [W + 40, H - 250], [W + 40, H + 40], [-40, H + 40]]], { col: '#0A0E1C', alpha: .78 * Math.min(1, p * 3), blur: 70 });
  }
  function outro(t, lt, dur) {
    const cam = outroCam(t), boomK = t >= BOOM ? Math.exp(-(t - BOOM) * 9) : 0;
    camBegin(...cam);
    laserHall(hallT(t), { lasers: lerp(1, .45, seg(t, 215.6, 219.8)), hooks: {
      back: () => { if (boomK > .02) for (let s = 0; s < 4; s++) glow(cam[0] + (s - 1.5) * 520, 470, 260, GP.laser, boomK); },
      mid: () => { party(t); roomLight(.42 * ease(seg(t, 215.5, 219.6)), [[1105, 800, 560, 1], [1105, 700, 900, .45]], { col: '#081020' }); }
    } });
    camEnd();
    nearCrowd(t);
    if (t >= BOOM - .05) confetti(t, BOOM - .05, { n: 45, spread: 1.6, cols: [PAL.cream, '#FFF1B8', GP.neonG, GP.neonB, GP.neonP, '#FFD24A'] });
    flash(.5 * boomK, '#F4FFF6');
    counterHUD(t);
  }

  // ================================================== T1 · THE TAIL ==================================================
  // ---- the playground at dusk: a lilac-and-gold sky and a low sun, painted in the set's back hook over its daylight ----
  const SUN = [2085, 452];
  function duskBack(t) {
    const [a, b, c] = viewRect2(400), top = b - 200, hz = FLOOR - 125;
    boilSeed('c14 dusk sky');
    const bands = [['#5C4A8C', 0], ['#76599C', .26], ['#A46FA6', .48], ['#D58A98', .66], ['#F0A983', .8], ['#FAC985', .92]];
    bands.forEach(([col, k], i) => { const y0 = lerp(top, hz, k); paint(rectPts(a - 100, y0 - (i ? 40 : 0), c - a + 200, hz - y0 + 60), { wash: col, washOp: i ? 150 : 255, fill: col, fillOp: 90, bleed: .12, tex: .4, ink: null }); });
    boilSeed('c14 dusk sun');
    glow(SUN[0], SUN[1], 520, '#FF9A50', .9);
    paint(ellPts(SUN[0], SUN[1], 96, 96, 36), { wash: '#FFE3A0', fill: '#FFCB70', fillOp: 110, bleed: .04, ink: null });
    for (let i = 0; i < 5; i++) {   // long clouds lit from below
      boilSeed('c14 dcloud' + i);
      const x = 640 + i * 540 + 40 * Math.sin(t * .05 + i), y = 160 + 80 * hash(i + 3) + i * 14, w = 230 + 130 * hash(i * 2.2), P = [];
      for (let k = 0; k < 20; k++) { const q = k / 20 * TAU; P.push([x + Math.cos(q) * w, y + Math.sin(q) * (Math.sin(q) < 0 ? 22 + 10 * Math.abs(Math.sin(q * 3)) : 13)]); }
      paint(P, { wash: '#E3A0B4', fill: '#FFD2A2', fillOp: 90, bleed: .08, ink: null, curv: .5 });
    }
    cityline(FLOOR - 120, { col: '#9A84B2' });
    for (let i = 0; i < 16; i++) {   // windows lighting up for the evening
      const wx = 700 + 110 * i + 60 * hash(i * 3.1), wy = FLOOR - 190 - 180 * hash(i * 7.7), on = seg(t, 220.4 + 5 * hash(i * 1.9), 220.6 + 5 * hash(i * 1.9));
      if (on > 0 && vis(wx - 20, wx + 20)) { boilSeed('c14 win' + i); paint(rectPts(wx, wy, 14, 10), { wash: '#FFE09A', washOp: 255 * on, ink: null }); }
    }
    boilSeed('c14 dusk grass');
    paint(rectPts(a - 100, FLOOR - 130, c - a + 200, 200), { wash: '#6C8A5E', fill: '#4C6A48', fillOp: 70, bleed: .03, tex: .6, ink: null });
    boilSeed('c14 dusk lawn');   // the lawn in front of the sandbox, falling into shadow toward us
    paint(rectPts(a - 100, FLOOR + 40, c - a + 200, 1000), { wash: '#648052', fill: '#4A6440', fillOp: 70, bleed: .03, tex: .6, ink: null });
    paint(rectPts(a - 100, FLOOR + 300, c - a + 200, 800), { fill: '#3E5238', fillOp: 90, bleed: .1, tex: .5, ink: null });
    for (let i = 0; i < 26; i++) { const x = a + (c - a) * hash(i * 2.3 + 1), y = FLOOR + 60 + 380 * hash(i * 4.7 + 2); if (x > 850 && x < 2190 && y < FLOOR + 170) continue; boilSeed('c14 tuft' + i); inkLine([[x - 8, y], [x - 2, y - 14], [x + 3, y - 2], [x + 9, y - 12]], .7, '#3E5A36', 'inkfine', .3); }
    for (let i = 0; i < 9; i++) {   // the set's trees, in the evening
      const x = -200 + i * 480 + 90 * hash(i), s = .8 + .3 * hash(i + 4); if (!vis(x - 160 * s, x + 160 * s)) continue;
      boilSeed('c14 dtree' + i);
      paint(rectPts(x - 12 * s, FLOOR - 110 - 150 * s, 24 * s, 150 * s), { wash: '#5A4250', ink: PAL.ink, sw: .6 });
      for (let k = 0; k < 3; k++) paint(ellPts(x + (k - 1) * 55 * s + 4 * Math.sin(t * 1.4 + k), FLOOR - 110 - (190 + 30 * (k % 2)) * s, 90 * s, 72 * s, 18), { wash: k % 2 ? '#5C785A' : '#4C6450', fill: '#3C5246', fillOp: 70, bleed: .05, ink: PAL.ink, sw: .6 });
    }
    boilSeed('c14 dusk fence');
    for (let x = -600; x < 4200; x += 90) if (vis(x - 50, x + 50)) paint(rectPts(x, FLOOR - 180, 12, 70), { wash: '#587A5C', ink: PAL.ink, sw: .5 });
    inkLine([[a - 100, FLOOR - 170], [c + 100, FLOOR - 170]], 1.5, '#44604A', 'ink', 0);
  }

  // ---- the Horse in the lounger: the 'sit' view leaned back, with a foreleg borrowed from an upright horse() ----
  const HX = 1400, HY = 752, HS = 21, HROT = -.3, SHOULDER = [4.3, -8.9];
  const AR_REST = -1.2, AR_UP = .1;
  // one ease per segment: [[t, v, easeFn], ...] (the ease of a key shapes the move INTO it)
  const keys = (t, K) => { if (t <= K[0][0]) return K[0][1]; for (let i = 1; i < K.length; i++) if (t < K[i][0]) { const e = K[i][2] || ease; return lerp(K[i - 1][1], K[i][1], e((t - K[i - 1][0]) / (K[i][0] - K[i - 1][0]))); } return K[K.length - 1][1]; };
  const TW1 = [223.0, T_TAIL1], TW2 = [225.07, T_TAIL2], TAKE = 225.52;
  function tailState(t) {
    const S = {};
    S.slide = keys(t, [[221.55, 0], [222.08, 1.06, easeOut], [222.22, 1]]) + (t > TAKE ? .3 * ease(seg(t, TAKE + .05, TAKE + .3)) : 0);
    S.lift = t > TAKE ? Math.max(0, 1.1 * Math.exp(-(t - TAKE) * 7) * Math.sin(Math.min(Math.PI, (t - TAKE) * 16))) : 0;
    S.hd = keys(t, [[221.5, 0], [221.8, .13], [222.3, .06], [223.78, .06], [224.02, 0], [224.3, 0], [224.48, .05], [TAKE, .05], [TAKE + .08, 0, easeOut]]);
    const lean = keys(t, [[223.78, 0], [224.02, -.1], [224.3, -.1], [224.48, 0]]), nod = .035 * Math.sin(Math.PI * seg(t, 224.55, 224.95));
    S.rot = HROT + .006 * Math.sin(t * 2.1) + lean + nod - .05 * take(t, TAKE, .6).sq;
    S.dy = take(t, TAKE, .5).dy * .25;
    S.look = (t > 222.02 && t < 223.8) || t > 224.36 ? 'camera' : null;
    S.mood = t >= TAKE ? 'surprised' : t >= 224.56 ? 'joy' : 'deadpan';
    S.chew = t < 221.45 ? .55 * seg(t, 220.35, 220.5) : 0;
    // the foreleg: rest on the belly → lift → twirl → settle; again, quicker; the take stiffens it
    const tw = t < 224.5 ? seg(t, ...TW1) : seg(t, ...TW2), spinning = (t > TW1[0] && t < TW1[1] + .05) || (t > TW2[0] && t < TAKE);
    S.aR = keys(t, [[222.62, AR_REST], [222.74, AR_REST - .14], [223.02, AR_UP, backOut], [223.66, AR_UP], [223.98, AR_REST], [224.93, AR_REST], [224.98, AR_REST - .08], [225.09, AR_UP + .05, easeOut], [TAKE, AR_UP + .05], [TAKE + .12, AR_UP + .42, easeOut], [226.6, AR_UP + .38]])
      + (spinning && t < T_TAIL2 ? .07 * Math.sin(tw * TAU) : 0);
    S.len = 1.32 + .16 * Math.sin(Math.PI * clamp((S.aR - AR_REST) / (AR_UP - AR_REST)));   // reaches out as it lifts
    // the lasso loop: size k, spin phase, droop
    const k1 = backOut(seg(t, TW1[0] - .04, TW1[0] + .12)) * (1 - ease(seg(t, TW1[1] + .02, TW1[1] + .16)));
    const k2 = backOut(seg(t, TW2[0] - .02, TW2[0] + .09)) * (1 - ease(seg(t, TAKE + .1, TAKE + .45)));
    S.loopK = t < 224.5 ? k1 : k2;
    S.spin = (t < 224.5 ? ease(seg(t, ...TW1)) : Math.min(ease(seg(t, ...TW2)), 1)) + .25;
    S.droop = ease(seg(t, TAKE + .02, TAKE + .4));
    S.spinning = spinning && t < T_TAIL2;
    return S;
  }
  const bodyToWorld = (p, S) => { const r = rot2([p[0] * HS, p[1] * HS], S.rot); return [HX + r[0], HY + (S.dy || 0) * HS + r[1]]; };
  function headFrame(hd) { const nb = [2.2, -10.8], ha = lerp(-.95, .35, hd), nl = 6.2; return { nt: [nb[0] + Math.cos(ha) * nl * .55 + 1.6, nb[1] + Math.sin(ha) * nl], ang: lerp(.62, 1.25, hd) }; }
  const headToBody = (p, hd) => { const F = headFrame(hd), r = rot2(p, F.ang); return [F.nt[0] + r[0], F.nt[1] + r[1]]; };
  // Oppa's shades as a prop in the Horse's draw hook: the same pair horse() paints, but free to slide down the nose
  function shadesProp(S) {
    return (s, sw) => {
      const F = headFrame(S.hd), k = S.slide;
      push(); translate(F.nt[0] * s, F.nt[1] * s); rotate(F.ang);
      const cx = (1.8 + .62 * k) * s, cy = (-.5 + 1.45 * k - 1.3 * S.lift) * s;
      boilSeed('c14 shades');
      inkLine([[cx - 1.1 * s, cy - .1 * s], [-.3 * s, -.95 * s]], sw * 1.1, GP.tort, 'ink', 0);   // the temple, back to the ear
      push(); translate(cx, cy); rotate(-F.ang + .25 * S.lift);
      paint(ellPts(0, 0, 1.15 * s, 1.05 * s, 16), { wash: GP.lens, ink: null });
      brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', GP.tort, sw * 1.4); brush.beginShape(0); for (const p of ellPts(0, 0, 1.15 * s, 1.05 * s, 16)) brush.vertex(p[0], p[1]); brush.endShape(true);
      inkLine([[-.5 * s, -.3 * s], [-.1 * s, -.7 * s]], sw * .5, PAL.cream, 'inkfine', 0);
      pop(); pop();
    };
  }
  // the borrowed foreleg: an upright horse() whose right shoulder sits on the sit-horse's near shoulder
  function legLayerFn(t, S) {
    const P = bodyToWorld(SHOULDER, S);
    horse(P[0] - 3.6 * HS, P[1] + 12.4 * HS, HS, t, { view: 'up', aR: S.aR, armLen: S.len, frontArm: 'R', aL: -1.2, boilKey: 'c14 foreleg' });
  }
  function legGeom(S) {
    const P = bodyToWorld(SHOULDER, S), L = 3.6 * S.len * .72, e = .08;
    const A = [[-e, -.65 - e], [L - .5, -.65 - e], [L - .5, -.8 - e], [L + 1.1 + e, -.8 - e], [L + 1.1 + e, .8 + e], [L - .5, .8 + e], [L - .5, .65 + e], [-e, .65 + e]];
    const W_ = p => { const r = rot2([p[0] * HS, p[1] * HS], -S.aR); return [P[0] + r[0], P[1] + r[1]]; };
    return { poly: A.map(W_), hoof: W_([L + .45, 0]) };
  }
  // ONE tiny lasso: a small rope loop spinning over the hoof, with motion arcs while it spins
  function twirlLoop(x, y, S) {
    const k = S.loopK; if (k < .02) return;
    const s = HS, sw = clamp(s / 15, .45, 2.4), dr = S.droop, rope = '#9A6A3A';
    const cx = x + .45 * s, cy = y - 1.85 * s * k + dr * 2.4 * s, rx = 2.65 * s * k * (1 - .35 * dr), ry = .72 * s * k * (1 + .6 * dr);
    boilSeed('c14 loop');
    const L = []; for (let i = 0; i <= 28; i++) { const q = i / 28 * TAU; L.push([cx + Math.cos(q) * rx, cy + Math.sin(q) * ry + dr * .9 * s * Math.max(0, Math.cos(q))]); }
    inkLine(L.slice(0, 15), sw * .9, rope, 'ink', .6); inkLine(L.slice(14), sw * 1.35, rope, 'ink', .6);
    const a = S.spin * TAU, lead = [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];
    if (S.spinning) for (let r = 0; r < 3; r++) {
      const P = [], a0 = a - r * .45; for (let i = 0; i <= 10; i++) { const q = a0 - i / 10 * 1.5; P.push([cx + Math.cos(q) * rx * (1.14 + r * .1), cy + Math.sin(q) * ry * (1.35 + r * .18)]); }
      inkLine(P, sw * (1.1 - r * .3), mixCol(PAL.ink, PAL.cream, .3 + r * .22), 'dry', .6);
    }
    inkLine([[x, y], [lerp(x, lead[0], .45), lerp(y, lead[1], .45) - .25 * s], lead], sw * .9, rope, 'ink', .5);
  }
  // Oppa's drink on the side table, and the extra-long straw from it to the Horse's mouth
  function strawAndDrink(t, S) {
    const m = bodyToWorld(headToBody([5.7, 1.02], S.hd), S), sip = seg(t, 220.3, 221.45);
    boilSeed('c14 drink');
    const lvl = lerp(668, 682, sip);   // the level drops as it sips
    paint([[1832.5, 663], [1857.5, 663], [1857.5 - 2.4 * (lvl - 663) / 45, lvl], [1832.5 + 2.4 * (lvl - 663) / 45, lvl]], { wash: '#F6EEDD', washOp: 210, ink: null });
    if (t < 221.6) for (let i = 0; i < 3; i++) { const bt = frac(t * .9 + hash(i * 3.3)), bx = 1838 + 14 * hash(i * 5.1), by = lerp(704, lvl + 3, bt); paint(ellPts(bx, by, 1.8, 1.8, 6), { wash: '#FFF4D8', ink: null }); }
    const P = [[1845, 698], [1849, 652], [1822, 596], [lerp(1822, m[0], .55), Math.min(m[1], 596) - 34], [m[0] + 34, m[1] - 6], m];
    boilSeed('c14 straw');
    inkLine(P, 1.25, '#E0463C', 'ink', .55);
    if (sip > 0 && sip < 1) {   // gulps of drink travelling up the straw
      const C = through(P, 8), n = C.length;
      for (let g = 0; g < 3; g++) { const q = frac(t * 1.3 + g / 3), i = Math.floor(q * (n - 4)); inkLine(C.slice(i, i + 3), .55, '#F7C060', 'inkfine', .5); }
    }
  }
  function fireflies(t) {
    for (let i = 0; i < 6; i++) {
      const on = .5 + .5 * Math.sin(t * (1.3 + hash(i) * .8) + i * 2), x = 780 + 1300 * hash(i * 3.7) + 30 * Math.sin(t * .6 + i), y = 640 + 150 * hash(i * 5.1) + 20 * Math.sin(t * .9 + i * 1.7);
      if (on > .35 && vis(x - 20, x + 20)) glow(x, y, 22, '#FFE88A', .7 * (on - .35));
    }
  }
  function tailCam(t) {
    const p = ease(seg(t, 220.42, 222.95)), c = seg(t, 222.95, TBLK);
    let cx = lerp(1585, 1482, p) - 8 * c, cy = lerp(548, 518, p), z = lerp(.98, 1.5, p) + .06 * c;
    if (t > T_TAIL2) { const [sx, sy] = shakeXY(t, 16 * Math.exp(-(t - T_TAIL2) * 6)); cx += sx / z; cy += sy / z; }
    return [cx, cy, z];
  }
  function tailGlitch(t) {
    if (t < T_TAIL2) return 0;
    let g = 1.0 * Math.exp(-(t - T_TAIL2) * 13) + .06;
    for (const [bt, amp, d] of [[225.86, .55, .09], [226.04, .4, .07], [226.2, .7, .1]]) { const a = t - bt; if (a >= 0 && a < d) g = Math.max(g, amp); }
    return clamp(Math.max(g, easeIn(seg(t, 226.28, 226.5)) * 1.1));
  }
  let CRT = null;
  function crtCollapse(t) {   // the finished picture squeezes into a glowing line, then a dot
    const k = seg(t, 226.42, TBLK); if (k <= 0) return;
    flushBrush();
    if (!CRT) { CRT = createGraphics(W, H); CRT.pixelDensity(1); }
    const c = CRT.drawingContext; c.setTransform(1, 0, 0, 1, 0, 0); c.globalCompositeOperation = 'copy'; c.drawImage(drawingContext.canvas, 0, 0, W, H); c.globalCompositeOperation = 'source-over';
    const sy = lerp(1, .006, easeIn(clamp(k / .7))), sx = k < .7 ? 1 : lerp(1, .012, ease((k - .7) / .3));
    screenDraw(() => {
      boilSeed('c14 crt');
      paint(rectPts(-60, -60, W + 120, H + 120), { wash: '#110D15', ink: null });
      flushBrush();
      image(CRT, W / 2 - W * sx / 2, H / 2 - H * sy / 2, W * sx, H * sy);
      glow(W / 2, H / 2, lerp(200, 90, k) * (k < .7 ? 3 : 1.2 * sx + .4), '#FFF6E6', .55 + .45 * k);
    });
  }
  function tail(t, lt, dur) {
    const S = tailState(t), cam = tailCam(t);
    paintLayer('c14 foreleg', () => { camBegin(...cam); legLayerFn(t, S); });
    camBegin(...cam);
    playground(t, { hooks: { back: () => duskBack(t), mid: () => {
      horse(HX, HY + (S.dy || 0) * HS, HS, t, { view: 'sit', rot: S.rot, look: S.look, mood: S.mood, chew: S.chew, blink: .1731, boilKey: 'c14 horse', draw: shadesProp(S) });
      const G = legGeom(S);
      showLayer('c14 foreleg', [toScreenPts(G.poly)]);
      twirlLoop(G.hoof[0], G.hoof[1], S);
      strawAndDrink(t, S);
      if (t > TAKE) { const hp = bodyToWorld(headToBody([.4, -2.2], S.hd), S); emote('sweat', hp[0] - 10, hp[1] - 6, 16, seg(t, TAKE + .08, TAKE + .3), t - TAKE); }
      roomLight(.36, [[SUN[0], SUN[1], 1350, 1], [HX + 60, HY - 230, 520, .5]], { col: '#45306A' });
      glow(SUN[0], SUN[1], 300, '#FFC070', .55);
      fireflies(t);
    } } });
    camEnd();
    const V = VIEWCOUNT(t), pop = Math.max(bump(t, T_TAIL1, 1.1), bump(t, T_TAIL2, 1.7, 4.5, 18));
    const sc = 1 + .25 * pop, aw = (150 + 64 * V.str.length + 24 * Math.floor((V.str.length - 1) / 3) + 52 + 40) * (64 / 120);
    counterHUD(t, { pop, x: W - 36 - aw * sc / 2 });
    GLITCH = Math.max(GLITCH, tailGlitch(t));
    crtCollapse(t);
  }

  // ================================================== T2 · BLACK ==================================================
  function black(t, lt) {
    boilSeed('c14 black');
    paint(rectPts(-60, -60, W + 120, H + 120), { wash: '#110D15', ink: null });
    const a = 1 - seg(lt, 0, .3);
    if (a > 0) glow(W / 2, H / 2, 70 * a + 20, '#FFF6E6', .9 * a);
  }


  // PERF PROBE (temporary)
  LOOPS.c14cost = lt => {
    const k = Math.floor(lt), t = 216.5;
    if (k === 0) { camBegin(...outroCam(t)); laserHall(hallT(t), {}); camEnd(); }
    if (k === 1) { camBegin(...outroCam(t)); laserHall(hallT(t), { hooks: { mid: () => party(t) } }); camEnd(); }
    if (k === 2) { camBegin(...outroCam(t)); laserHall(hallT(t), {}); camEnd(); nearCrowd(t); }
    if (k === 3) { camBegin(...outroCam(t)); laserHall(hallT(t), {}); camEnd(); confetti(t, BOOM - .05, { n: 70, spread: 1.6 }); }
    if (k === 4) tail(222.9, 0, 1);
    if (k === 5) outro(216.5, 0, 1);
  };
  LOOPS.c14cost.len = 6;

  LOOPS.c14cost2 = lt => {
    const k = Math.floor(lt), t = 216.5, sets = [
      null, ['crowd', 'v'], ['crowd', 'l'], ['granny', 'v'], ['oppa', 'v'], ['pop', 'l'], ['boss', 'l'], ['commuter', 'v'], ['dancer', 'v'], ['horse', 'l'], ['crowd', 'd']];
    camBegin(960, 560, .72);
    laserHall(t, { hooks: { mid: () => { const S_ = sets[k]; if (!S_) return;
      for (let i = 0; i < 4; i++) {
        const x = 300 + i * 420;
        if (S_[0] === 'horse') { horse(x, 900, 16, t, { view: 'up', shades: true, mood: 'joy', ...holdLasso(t, { hand: GP.hoof }) }); continue; }
        const q = memberOpts(S_[0], { v: i, look: 'party' }), o = { hand: q._hand, sleeve: q._sleeve };
        const pose = S_[1] === 'v' ? holdV(t, o) : S_[1] === 'l' ? holdLasso(t, o) : dance('gallop', t, o);
        member(S_[0], x, 900, 18, { v: i, look: 'party', ...pose, eyes: 'happy', mouth: 'open' });
      } } } });
    camEnd();
  };
  LOOPS.c14cost2.len = 11;
  shots([[barT(116), outro], [TCUT, tail], [TBLK, black]]);
})();
