// dance.js: the choreography, as beat-locked pose functions for the Clawd rig. Studied frame by frame from the
// original video; every move here reproduces a real step of it (see STORYBOARD.md "The moves").
//
//   dance(move, t, o)          pose options for clawd()/member() at time t. o: { side: 1|-1 (which arm lassos, mirror),
//                              ph (beats of offset, for small crowd desync), e (energy 0..1, default 1), amp (size) }
//   routine(t, keys, o)        a choreography timeline: keys = [[t0, move, opts], ...]. Blends every numeric field over
//                              o.blend seconds (default .12) after each change, so moves flow without pops.
//   crowdVar(i)                small stable per-dancer variation { ph, amp, side } so a crowd isn't a photocopy
//   MOVES                      the list of move names
//
// Rig notes. The front-view Clawd is 10u wide; its arms pivot at the body's sides (±4.9u, -4.5u). To bring the
// hands together at the chest ("the reins") the arms stretch (armLen ~2.3) and cross in front (frontArm 'LR'), with a
// fist drawn at each tip. Bent arms (hands on hips, hand to the face, hands over the head) are an upper arm plus a
// forearm drawn from the arm-tip hook (bentHook).

// ---------- timing ----------
// beat number (integer) and phase (0..1) at time t, with an optional offset in beats
const _bt = (t, ph = 0) => { const bp = (t - OFF) / BEAT + ph; const b = Math.floor(bp); return { b, f: bp - b, bp }; };
// the skip-step: on each beat one foot steps and the other lifts on the "and" (peak ~0.55), landing on the next beat
const _skip = f => Math.pow(Math.sin(Math.PI * clamp((f - .08) / .92)), .85);

// ---------- arm helpers ----------
// A fist at an arm tip (arm hook): a rounded nub in the body colour, drawn in front of the arm.
function fistHook(col = null, r = .62) {
  return (u, sw) => { paint(ellPts(.1 * u, 0, r * u, r * .9 * u, 12), { wash: col || PAL.clay, ink: PAL.ink, sw: sw * .7 }); };
}
// A forearm from the arm tip (the elbow), bent by `ang` radians (+ bends it toward the body side / downward in arm
// space), `len` in u, colour `col` (a sleeve colour), with a fist at the end in `hand` colour.
function bentHook(ang, len, col, hand, o = {}) {
  return (u, sw) => {
    push(); rotate(ang);
    paint(rectPts(-.35 * u, -.5 * u, (len + .35) * u, u, u * .04), { wash: col, washOp: 255, fill: mixCol(col, PAL.ink, .3), fillOp: 50, tex: .5, ink: PAL.ink, sw: sw * .8 });
    if (o.cuff !== false) paint(rectPts((len - .55) * u, -.5 * u, .55 * u, u, u * .03), { wash: hand, washOp: 255, ink: PAL.ink, sw: sw * .6 });
    paint(ellPts((len + .05) * u, 0, .55 * u, .5 * u, 12), { wash: hand, ink: PAL.ink, sw: sw * .7 });
    if (o.tip) { translate((len + .1) * u, 0); o.tip(u, sw); }
    pop();
  };
}
// The lasso: swirling motion arcs around a raised arm's tip, world-aligned (a flat loop spinning overhead).
// k = energy, spin = the loop's phase (turns), which/a = the arm and its angle (to undo the arm's rotation).
function lassoHook(which, a, spin, k = 1, col = PAL.ink, fist = PAL.clay) {
  return (u, sw) => {
    push();
    if (which === 'R') rotate(a); else rotate(-a);   // undo the arm's rotation: the loop is flat in body space
    const cx = 0, cy = -2.1 * u, rx = 3.8 * u * k, ry = 1.05 * u * k, rope = '#9A6A3A';
    // the rope loop itself (one full turn, thicker on the near side), then trailing motion arcs
    const L = []; for (let i = 0; i <= 28; i++) { const q = i / 28 * TAU; L.push([cx + Math.cos(q) * rx, cy + Math.sin(q) * ry]); }
    inkLine(L.slice(0, 15), sw * 1.1, rope, 'ink', .6); inkLine(L.slice(14), sw * 1.7, rope, 'ink', .6);
    for (let r = 0; r < 3; r++) {
      const P = [], a0 = spin * TAU - r * .5;
      for (let i = 0; i <= 10; i++) { const q = a0 - i / 10 * 1.6; P.push([cx + Math.cos(q) * rx * (1.12 + r * .1), cy + Math.sin(q) * ry * (1.3 + r * .15)]); }
      inkLine(P, sw * (1.3 - r * .35), mixCol(col, PAL.cream, .25 + r * .25), 'dry', .6);
    }
    const lead = [cx + Math.cos(spin * TAU) * rx, cy + Math.sin(spin * TAU) * ry];
    inkLine([[0, 0], [lead[0] * .4, cy * .6], lead], sw * 1.1, rope, 'ink', .5);   // the rope from the fist to the loop
    paint(ellPts(0, 0, .62 * u, .58 * u, 12), { wash: fist, ink: PAL.ink, sw: sw * .7 });
    pop();
  };
}

// ---------- the moves ----------
// Each returns clawd() options. `S` = which side (1 = right arm lassos / right hand points; -1 mirrors).
const MOVE = {
  // THE HORSE DANCE: wide bent-knee stance, skipping gallop on the beat (step on the beat, hop on the "and" with the
  // other knee up), both hands together at the chest holding the reins, bouncing with the hop.
  gallop(t, o) {
    const { b, f } = _bt(t, o.ph), e = o.e ?? 1, amp = o.amp ?? 1, lead = b % 2 === 0 ? 1 : -1;   // which leg is free
    const lift = _skip(f) * e, hop = Math.sin(Math.PI * f), land = Math.exp(-f * 9);
    const L = lead > 0 ? [lift, lift * .85, 0, 0] : [0, 0, lift * .85, lift];
    const rein = .2 * hop * e;    // the reins bounce up on the hop
    return {
      legLift: L, legSplay: .9 * amp, dy: -.55 * hop * e * amp, sq: .1 * land * e - .04 * hop * e,
      dx: .22 * lead * e * amp, rot: -.035 * lead * e,
      frontArm: 'LR', armLen: 2.4, aR: Math.PI + .36 - rein, aL: Math.PI + .36 - rein, armR: fistHook(o.hand, .78), armL: fistHook(o.hand, .78)
    };
  },
  // THE LASSO: the same gallop, one arm raised overhead swinging a lasso (the loop spins once per beat), the other
  // hand still on the reins.
  lasso(t, o) {
    const g = MOVE.gallop(t, o), S = o.side ?? 1, { bp } = _bt(t, o.ph), e = o.e ?? 1;
    const up = 1.42 + .1 * Math.sin(bp * TAU), spin = bp % 1;
    const r = { ...g, frontArm: S > 0 ? 'L' : 'R' };
    if (S > 0) { r.aR = up; r.armR = lassoHook('R', up, spin, e, PAL.ink, o.hand || PAL.clay); r.armLen = { R: 1.15, L: 2.4 }; }
    else { r.aL = up; r.armL = lassoHook('L', up, spin, e, PAL.ink, o.hand || PAL.clay); r.armLen = { L: 1.15, R: 2.4 }; }
    return r;
  },
  // HANDS ON HIPS: wide stance, step-touch side to side on the beat, hips swinging (the post-chorus hook).
  hipsway(t, o) {
    const { b, f, bp } = _bt(t, o.ph), e = o.e ?? 1, side = b % 2 === 0 ? 1 : -1;
    const sw_ = Math.sin(bp * Math.PI) * e, step = Math.sin(Math.PI * clamp(f * 1.6));
    const L = side > 0 ? [0, 0, .45 * step * e, .5 * step * e] : [.5 * step * e, .45 * step * e, 0, 0];
    return {
      legLift: L, legSplay: .7, dx: .45 * sw_, rot: .07 * sw_, sq: .06 * Math.exp(-f * 8),
      aR: -.55, aL: -.55, armLen: .72, frontArm: 'LR',
      armR: bentHook(1.83, 1.85, o.sleeve || PAL.clay, o.hand || PAL.clay), armL: bentHook(1.83, 1.85, o.sleeve || PAL.clay, o.hand || PAL.clay)
    };
  },
  // THE DISCO POINT: one arm flung diagonally up and out, pumping on the beat; the other hand on the hip; weight on
  // one leg, leaning away (the bus scene).
  disco(t, o) {
    const { f } = _bt(t, o.ph), e = o.e ?? 1, S = o.side ?? 1, pump = Math.exp(-f * 6) * e;
    const r = { legLift: S > 0 ? [.5 * e, .35 * e, 0, 0] : [0, 0, .35 * e, .5 * e], legSplay: .5, rot: -.09 * S * e, dx: -.3 * S, sq: .05 * pump, dy: -.15 * pump };
    const pt = .75 + .18 * pump, hip = bentHook(1.83, 1.85, o.sleeve || PAL.clay, o.hand || PAL.clay);
    if (S > 0) Object.assign(r, { aR: pt, armLen: { R: 1.35, L: .72 }, armR: fistHook(o.hand), aL: -.55, armL: hip, frontArm: 'L' });
    else Object.assign(r, { aL: pt, armLen: { L: 1.35, R: .72 }, armL: fistHook(o.hand), aR: -.55, armR: hip, frontArm: 'R' });
    return r;
  },
  // BOTH ARMS UP in a V, bouncing (celebration, the end of a phrase).
  vArms(t, o) {
    const { f, bp } = _bt(t, o.ph), e = o.e ?? 1;
    return { aL: 1.05 + .12 * Math.sin(bp * TAU), aR: 1.05 - .12 * Math.sin(bp * TAU), armLen: 1.3, armL: fistHook(o.hand), armR: fistHook(o.hand), dy: -.6 * Math.sin(Math.PI * f) * e, sq: .08 * Math.exp(-f * 8) * e, legSplay: .5 };
  },
  // THE SWAGGER WALK (in place; add your own travel): a rolling strut with a hand touching the shades/cheek.
  strut(t, o) {
    const { b, f, bp } = _bt(t, o.ph), e = o.e ?? 1, S = o.side ?? 1;
    const r = { walk: bp / 2, dy: -.35 * Math.abs(Math.sin(bp * Math.PI)) * e, rot: .05 * Math.sin(bp * Math.PI) * e, legSplay: .25 };
    const cheek = bentHook(-2.05, 2.35, o.sleeve || PAL.clay, o.hand || PAL.clay);
    if (S > 0) Object.assign(r, { aR: 1.0, armLen: { R: .8, L: 1 }, armR: cheek, frontArm: 'R', aL: -.4 + .25 * Math.sin(bp * Math.PI) });
    else Object.assign(r, { aL: 1.0, armLen: { L: .8, R: 1 }, armL: cheek, frontArm: 'L', aR: -.4 + .25 * Math.sin(bp * Math.PI) });
    return r;
  },
  // INTO THE STORM: arms flung wide, flapping on the eighths, leaning into the wind, jogging (the paper blizzard).
  windflap(t, o) {
    const { b, f, bp } = _bt(t, o.ph), e = o.e ?? 1, flap = Math.sin(bp * TAU * 2);
    return { aL: .15 + .35 * flap * e, aR: .15 - .35 * flap * e, armLen: 1.35, armL: fistHook(o.hand), armR: fistHook(o.hand), walk: bp, rot: -.06, dy: -.3 * Math.abs(Math.sin(bp * Math.PI * 2)) * e, legSplay: .3, flap: .6 + .4 * Math.abs(flap) };
  },
  // HAIR SLICK: both hands over the head smoothing the hair back, shoulders shimmying (the rival's move).
  hairslick(t, o) {
    const { bp, f } = _bt(t, o.ph), e = o.e ?? 1, sh = Math.sin(bp * TAU * 2) * e;
    const over = (s) => bentHook(-1.21 + .12 * s, 3.5, o.sleeve || PAL.clay, o.hand || PAL.clay);
    return { aL: 1.25, aR: 1.25, armLen: .85, armL: over(1), armR: over(-1), frontArm: 'LR', dx: .18 * sh, rot: .04 * sh, dy: -.2 * Math.abs(sh), legSplay: .4, sq: .05 * Math.exp(-f * 8) };
  },
  // SHOULDER SHIMMY: arms low and loose, the body jittering on sixteenths.
  shimmy(t, o) {
    const { bp } = _bt(t, o.ph), e = o.e ?? 1, s = Math.sin(bp * TAU * 4) * e;
    return { aL: -.2 + .25 * s, aR: -.2 - .25 * s, armLen: 1.1, armL: fistHook(o.hand), armR: fistHook(o.hand), dx: .25 * s, rot: .04 * s, legSplay: .45, sq: .03 };
  },
  // POINT UP: one finger to the sky (the "hey!" accents), the other hand on the hip, bouncing.
  pointup(t, o) {
    const { f } = _bt(t, o.ph), e = o.e ?? 1, S = o.side ?? 1, hip = bentHook(1.83, 1.85, o.sleeve || PAL.clay, o.hand || PAL.clay);
    const r = { dy: -.4 * Math.sin(Math.PI * f) * e, sq: .07 * Math.exp(-f * 8), legSplay: .6 };
    if (S > 0) Object.assign(r, { aR: 1.52, armLen: { R: 1.4, L: .72 }, armR: fistHook(o.hand), aL: -.55, armL: hip, frontArm: 'L' });
    else Object.assign(r, { aL: 1.52, armLen: { L: 1.4, R: .72 }, armL: fistHook(o.hand), aR: -.55, armR: hip, frontArm: 'R' });
    return r;
  },
  // THE WIDE CROUCH: legs way out, sitting low, arms out: the big accent pose.
  crouch(t, o) {
    const { f } = _bt(t, o.ph), e = o.e ?? 1;
    return { legSplay: 1.6, sq: .22 * e, dy: .15, aL: .25, aR: .25, armLen: 1.4, armL: fistHook(o.hand), armR: fistHook(o.hand), rot: .02 * Math.sin((t - OFF) * 9) };
  },
  // DOWN ON ALL FOURS: the humans get down on hands and knees... a Clawd is always on all fours, so it just hunkers low
  // and wiggles its rear on the beat.
  crawl(t, o) {
    const { b, f } = _bt(t, o.ph), side = b % 2 ? 1 : -1;
    return { sq: .3, dy: .1, rot: .06 * side * Math.sin(Math.PI * f), dx: .2 * side * Math.sin(Math.PI * f), aL: -1.2, aR: -1.2, armLen: .9, legSplay: .4, eyes: 'narrow' };
  },
  // Standing groove (the idle between moves): a small bounce on the beat.
  groove(t, o) {
    const { f, bp } = _bt(t, o.ph), e = o.e ?? .6;
    return { dy: -.25 * Math.sin(Math.PI * f) * e, sq: .05 * Math.exp(-f * 8) * e, aL: .15 + .12 * Math.sin(bp * Math.PI), aR: .15 - .12 * Math.sin(bp * Math.PI), rot: .02 * Math.sin(bp * Math.PI / 2) };
  }
};
const MOVES = Object.keys(MOVE);
function dance(move, t, o = {}) { const f = MOVE[move] || MOVE.groove; return f(t, o); }

// numeric fields that blend between moves
const _BL = ['dy', 'dx', 'sq', 'rot', 'aL', 'aR', 'legSplay', 'flap'];
function _lerpPose(a, b, k) {
  const r = { ...b };
  for (const f of _BL) if (a[f] != null || b[f] != null) r[f] = lerp(a[f] ?? 0, b[f] ?? 0, k);
  if (a.legLift || b.legLift) { const A = a.legLift || [0, 0, 0, 0], B = b.legLift || [0, 0, 0, 0]; r.legLift = B.map((v, i) => lerp(A[i], v, k)); }
  const la = typeof a.armLen === 'object' ? a.armLen : { L: a.armLen ?? 1, R: a.armLen ?? 1 }, lb = typeof b.armLen === 'object' ? b.armLen : { L: b.armLen ?? 1, R: b.armLen ?? 1 };
  r.armLen = { L: lerp(la.L ?? 1, lb.L ?? 1, k), R: lerp(la.R ?? 1, lb.R ?? 1, k) };
  if (k < .5) { r.frontArm = a.frontArm; r.armL = a.armL; r.armR = a.armR; }
  return r;
}
// routine(t, [[t0, 'gallop', {side: -1}], [t1, 'lasso'], ...], { blend, ph, e, hand, sleeve })
function routine(t, keys, o = {}) {
  let i = 0; while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
  const [t0, mv, mo] = keys[i], opts = { ...o, ...(mo || {}) };
  const cur = dance(mv, t, opts), bl = o.blend ?? .12;
  if (i > 0 && t - t0 < bl) {
    const [, pmv, pmo] = keys[i - 1], prev = dance(pmv, t, { ...o, ...(pmo || {}) });
    return _lerpPose(prev, cur, ease((t - t0) / bl));
  }
  return cur;
}
// small stable per-dancer variation for crowds
const crowdVar = i => ({ ph: (hash(i * 7.7) - .5) * .12, amp: .88 + .24 * hash(i * 3.1), side: hash(i * 5.3) < .82 ? 1 : -1, e: .85 + .15 * hash(i * 9.1) });
