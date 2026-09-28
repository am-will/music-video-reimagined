// c09_billion.js · barT(72) 134.727 → barT(81) 151.091 · BUILD 2 (bars 72–78) + BREATH 2 (bars 79–80) · the subway carriage
//
// SHOT PLAN
// The idea: the whole train is dancing and the counter races toward a billion. The build rises (the car rocks harder,
// the tunnel lights race faster, the counter climbs out of its corner and grows into a big panel over the carriage)...
// then the music cuts, everyone freezes mid-hop staring up at the counter, it clicks to 999,999,999 and does NOT turn
// over. Silence. One sweat drop. The Horse peeks over its paper. Little Clawd does ONE tiny lasso twirl. Hold. (c10 flips
// it to a billion.)
//
// Music (measured from the track): bars 72–75 an off-beat bass groove; bars 76–78 every eighth pumps (the build kicks up
// a gear); bar 79 the bass drops at ~147.68, the last hit lands on the "and" of beat 2 (148.59), then only a reverb tail,
// DEAD SILENCE 149.53–149.88, a vocal phrase 149.90–150.5, a quieter stretch 150.55–150.78, small pickup hits to 151.0.
//
// Layout (world, the subway set: floor y 820, poles x 1050 / 1750 / 2450): Oppa ('white') (1400, 900) u 24 facing right
// and the Pop Star (1750, 900) u 22 facing left, face to face in the aisle (3/4 views); they step a little apart over
// shot 1. Commuters on the floor (u 18), standing on the seats (u 14), two hanging off the grab handles (the handles are
// far above a Clawd's head: they leap up and dangle, kicking), two big ones in the front corners (u 28, from shot 3).
// THE Horse stands upright at the right (2090, 872) s 13, as c08 leaves it: one hoof on a strap, the other holding its
// newspaper of scribbles up in front of its face: the only one not dancing. Little Clawd stands on the seat at
// (1582, 740) between the leads (from shot 2), right under where the big counter will hang.
//
// S1  134.727–138.364 (bars 72–73)  [in: CONTINUOUS from c08: camera STAGE.subway.wide exactly, the leads mid-dance]
//     WIDE: the whole carriage galloping out of c08; the leads face to face (gallop, then HIP-SWAY from bar 73); the car
//     starts to rock (a roll on the beat). On beat 2 of bar 72 two commuters LEAP off the seats and catch the grab
//     handles (way above a Clawd's head), dangling and kicking. EVENT: c08's last holdout, the sleeper on the far-left
//     bench, is jolted awake by a big lurch on the bar-73 downbeat: a take, a '!', a look round, and on beat 2 he hops
//     up into the gallop. Now the WHOLE carriage is dancing, except the Horse (upright, strap + newspaper, far right).
//     reads: 134.7–135.5 one big dance party in a subway (continuity) · 135.5–136.2 the double leap to the handles ·
//            136.55–137.4 the sleeper wakes and joins · the Horse, reading, is the one still thing left
// S2  138.364–142.000 (bars 74–75)  [cut on action, on the downbeat]
//     MEDIUM TWO-SHOT on the leads, face to face: the DISCO point, bar 74 pointing up at each other, bar 75 the other arm.
//     Little Clawd on the seat behind them lassos. The counter pops out of its corner, a size bigger. Slow push-in.
//     reads: 138.4–140.2 the duet (mirror moves) · 140.2 the arm swap on the bar line · the counter starting to move
// S3  142.000–145.636 (bars 76–77)  [a SNAP ZOOM-OUT on the downbeat, with speed lines: the build kicks up a gear]
//     WIDE: THE WHOLE TRAIN GALLOPS in unison (the horse dance, before the drop has even come). The rocking grows with
//     the pumping eighths, the lights race, the hangers kick harder. The counter grows on each downbeat, drifting centre.
//     reads: 142.0–143.8 everyone is doing THE dance · 143.8–145.6 the counter climbing toward a billion
// S4  145.636–147.455 (bar 78)  [cut on the downbeat]
//     MEDIUM-CLOSE on the leads: the LASSO face to face (their outer arms, framing the Kid's lasso between them), pushing in hard, the rocking at its strongest; the Kid lassos
//     behind. The counter slides almost into its final place. (The peak of the build.)
// S5  147.455–151.091 (bars 79–80)  [cut on the downbeat; the counter lands BIG: viewCounter x 960, y 300, h 150]
//     WIDE TABLEAU. 147.46–148.59: still galloping without the bass, every face turned up at the big counter as it ticks
//        the last views, 990… 991… (one every ~0.16 s).
//     148.59  the music cuts: EVERYONE FREEZES mid-hop (knees up, in the air). Eyes wide, up at the counter. The car stops
//             rocking (a little settle).
//     148.87  it clicks to 999,999,999 (a small clunk) and STICKS. A very slow push-in begins.
//     148.9–149.35  hold (the viewer registers: it's stuck).
//     149.35–149.9  dead silence: ONE sweat drop pops on Oppa's temple and slides down.
//     149.93–150.4 the Horse lowers its newspaper a fraction: two deadpan eyes appear over the top, straight at us.
//     150.45–150.95 Little Clawd (a fierce little face) raises one arm: ONE tiny lasso twirl (150.62–150.88); the rope
//             zips back into his raised fist and he freezes again, fist up, glaring at the counter.
//     150.95–151.09 the frame holds on the counter, frozen, awaiting the flip.
//     [out: THE BIG COUNTER: the last frame shows viewCounter(t, { x: 960, y: 300, h: 150 }) = 999,999,999, all frozen]
//
// The counter is always VIEWCOUNT (never faked): the corner HUD through bar 73, then it grows on the downbeats of bars
// 74, 76, 77, 78, 79 and lands at (960, 300, 150) on bar 79 (pumping on the beat in bars 76–78, a knock on each last tick).
(() => {
  // ---------- times ----------
  const T0 = barT(72), T_S2 = barT(74), T_S3 = barT(76), T_S4 = barT(78), T_S5 = barT(79), T1 = barT(81);
  const T_LOOKUP = T_S5 + .16;                                  // every face turns up to the big counter
  const T_FREEZE = beatT(79, 2.5);                              // 148.591: the music cuts, everyone freezes
  const T_STUCK = 148.87;                                       // VIEWCOUNT reaches 999,999,999 and holds
  const T_SWEAT = 149.34, T_PAPER = 149.93, T_KID = 150.45, T_ARM = 150.53, T_TW0 = 150.62, T_TW1 = 150.88, T_ZIP = 150.97;
  const pclock = t => Math.min(t, T_FREEZE);                    // the dancers' clock: it stops dead on the cut

  // ---------- the train: the tunnel lights race faster through the build and ease off in the hush ----------
  // subway() draws its streaks (and handle sway) from t, so speed is integrated in closed form (piecewise-linear speed);
  // trainT(T0) = T0 so the first frame matches c08's carriage exactly.
  const SPD = [[T0, 1], [barT(75), 1.05], [barT(78), 1.6], [T_FREEZE, 1.75], [T_FREEZE + .7, .5], [T1 + 1, .5]];
  function trainT(t) {
    let acc = T0;
    for (let i = 0; i + 1 < SPD.length; i++) {
      const [a, sa] = SPD[i], [b, sb] = SPD[i + 1]; if (t <= a) break;
      const d = Math.min(t, b) - a, D = b - a; acc += sa * d + (sb - sa) * d * d / (2 * D);
    }
    return acc;
  }
  // ---------- the car rocks on the beat: a roll (one way on even beats, the other on odd) and a jolt on every beat ----------
  function rocking(t) {
    const amp = t < T_FREEZE ? kf(t, [[T0, 0], [T0 + BAR, .0045], [T_S3, .006], [T_S4, .011], [T_S5, .012], [T_FREEZE - .05, .012]]) : 0;
    const bp = bpOf(t), roll = amp * Math.cos(Math.PI * bp), jolt = (amp / .012) * 6 * pulse(t, 10) * (t < T_FREEZE ? 1 : 0)
      + (t >= T_WAKE ? 13 * Math.exp(-(t - T_WAKE) * 8) * Math.cos((t - T_WAKE) * 28) : 0);   // the big jolt that wakes the sleeper
    // the freeze: the rocking stops and the car settles with a little wobble
    const settle = t >= T_FREEZE ? .012 * Math.cos(Math.PI * bpOf(T_FREEZE)) * Math.exp(-(t - T_FREEZE) * 7) * Math.cos((t - T_FREEZE) * 16) : 0;
    return { rot: roll + settle, dy: -jolt };
  }

  // ---------- the counter: from the corner HUD to the big panel ----------
  const HUDP = [W - 36 - 866 * 64 / 120 / 2, 58, 64], BIGP = [960, 300, 150];
  const GROW = [[barT(74), .14], [barT(76), .36], [barT(77), .56], [barT(78), .78], [barT(79), 1]];
  const growP = t => { let p = 0; for (const [tk, pk] of GROW) p = lerp(p, pk, backOut(seg(t, tk, tk + .42))); return p; };
  const TICK = n => 147.45 + n * (148.87 - 147.45) / 9;        // VIEWCOUNT's last nine views: 991 … 999
  function bigCounter(t) {
    const p = growP(t);
    if (p <= 0) { counterHUD(t); return; }
    let pop = 0;
    if (t >= T_S3 && t < T_S5) pop += .09 * pulse(t, 9) * ease(seg(t, T_S3, T_S3 + BAR));      // pumping with the build
    for (let n = 1; n <= 9; n++) { const a = t - TICK(n); if (a >= 0 && a < .45) pop += (n === 9 ? .42 : .12) * Math.exp(-a * 10) * Math.cos(a * 28); }
    viewCounter(t, { x: lerp(HUDP[0], BIGP[0], p), y: lerp(HUDP[1], BIGP[1], p), h: lerp(HUDP[2], BIGP[2], p), pop });
  }

  // ---------- the cast ----------
  const OPPA = { x: 1400, y: 900, u: 24 }, POP = { x: 1750, y: 900, u: 22 };
  const apart = t => ease(seg(t, T0 + BEAT, T_S2 - BEAT));        // the leads step a little apart over shot 1 (room for the Kid)
  const oppaX = t => OPPA.x - 16 * apart(t), popX = t => POP.x + 24 * apart(t);
  // THE CARRIAGE IS c08's: the same riders at the same marks, sizes, gallop phases and boil keys as c08's last frame, so
  // the seam at 134.727 is continuous (c08's COMM table: L1-L5, R1-R3). BENCH = standing on the bench, SIT = sitting on it.
  const BENCH = 732, SIT = 770, c8ph = v => hash(v * 5.1) * .12 - .06;
  const HORSE = { x: 2338, y: 905, s: 15 }, KID = { x: 1582, y: BENCH, u: 13 };
  const SLEEPER = { v: 7, x: 330, u: 16, key: 'c8 L5' };          // c08's last holdout, asleep on the far-left bench
  const SEATED = [{ v: 2, x: 1130, u: 17, key: 'c8 L1' }, { v: 4, x: 2612, u: 17, key: 'c8 R3' }];
  const FLOORC = [{ v: 0, x: 470, y: 888, u: 19, key: 'c8 L4' }, { v: 6, x: 905, y: 884, u: 19, key: 'c8 L2' }, { v: 3, x: 2128, y: 884, u: 19, key: 'c8 R2' }];
  // the two handle-hangers (c08's L3 and R1): they leap up off the bench together on beat 2 of bar 72 to the grab handles
  // right above them (the handles hang every 115 px)
  const T_LEAP = beatT(72, 2);
  const HANG = [{ v: 5, hx: 805, u: 17, flip: false, ph: .03, x0: 690, key: 'c8 L3' }, { v: 1, hx: 2070, u: 17, flip: false, ph: -.04, x0: 1958, key: 'c8 R1' }];
  // c08's riders at the seam: happy eyes, a grin, no blush; then each one's own mood from bar 73
  const FIRST8 = (m, t1 = barT(73)) => [[T0 - 2, 'happy', { mouth: 'grin', blush: 0 }], [t1, m]];
  const FRONTC = [{ v: 8, x: 760, y: 1120, u: 28 }, { v: 5, x: 2420, y: 1130, u: 28 }];   // foreground, from shot 3 on
  // blink seeds that keep every eye open through the hush (blinks are timed by the global clock)
  const SEED = i => 1.05 + .09 * (i % 5) + 1.941 * (i % 3);
  const lookTo = x => clamp((1560 - x) / 900, -.85, .85);     // eyes toward the big counter (screen centre, above)

  // the routine: the leads gallop on out of c08, then the post-chorus moves; the horse dance for everyone else
  const LEADS = [[T0, 'gallop'], [barT(73), 'hipsway'], [T_S2, 'disco', { side: 1 }], [barT(75), 'disco', { side: -1 }], [T_S3, 'gallop'], [T_S4, 'lasso', { side: -1 }], [T_S5, 'gallop']];
  const CROWD = [[T0, 'gallop'], [T_S4, 'lasso', { side: 1 }], [T_S5, 'gallop']];
  const KIDR = [[T0, 'gallop'], [T_S2, 'lasso', { side: 1 }], [T_S3, 'gallop'], [T_S4, 'lasso', { side: 1 }], [T_S5, 'gallop']];

  // dance.js's lassoHook undoes the arm's rotation with the wrong sign for the LEFT arm (side -1), so that loop comes
  // out tilted through the body. The same loop, flattened correctly for either arm (the arm hook is mirrored for 'L'):
  function lassoFix(which, a, spin, k = 1, col = PAL.ink, fist = PAL.clay) {
    return (u, sw) => {
      push(); rotate(a);
      const cx = 0, cy = -2.1 * u, rx = 3.8 * u * k, ry = 1.05 * u * k, rope = '#9A6A3A', L = [];
      for (let i = 0; i <= 28; i++) { const q = i / 28 * TAU; L.push([cx + Math.cos(q) * rx, cy + Math.sin(q) * ry]); }
      inkLine(L.slice(0, 15), sw * 1.1, rope, 'ink', .6); inkLine(L.slice(14), sw * 1.7, rope, 'ink', .6);
      for (let r = 0; r < 3; r++) {
        const P = [], a0 = spin * TAU - r * .5;
        for (let i = 0; i <= 10; i++) { const q = a0 - i / 10 * 1.6; P.push([cx + Math.cos(q) * rx * (1.12 + r * .1), cy + Math.sin(q) * ry * (1.3 + r * .15)]); }
        inkLine(P, sw * (1.3 - r * .35), mixCol(col, PAL.cream, .25 + r * .25), 'dry', .6);
      }
      const lead = [cx + Math.cos(spin * TAU) * rx, cy + Math.sin(spin * TAU) * ry];
      inkLine([[0, 0], [lead[0] * .4, cy * .6], lead], sw * 1.1, rope, 'ink', .5);
      paint(ellPts(0, 0, .62 * u, .58 * u, 12), { wash: fist, ink: PAL.ink, sw: sw * .7 });
      pop();
    };
  }
  // dancer() with that fix applied to left-arm lassos (a routine through member(), like dancer())
  function dancerL(name, x, y, u, keys, tp, o) {
    const q = memberOpts(name, o), pose = routine(tp, keys, { ph: o.ph, e: o.e, amp: o.amp, hand: q._hand, sleeve: q._sleeve });
    if (name === 'pop') pose.hairSway = (pose.dx || 0) * .5 + .2 * Math.sin(bpOf(tp) * Math.PI);   // as c08 sways it
    let i = 0; while (i + 1 < keys.length && tp >= keys[i + 1][0]) i++;
    const [k0, mv, mo] = keys[i];
    if (mv === 'lasso' && mo && mo.side === -1 && tp - k0 >= .06) pose.armL = lassoFix('L', pose.aL, frac(bpOf(tp) + (o.ph || 0)), o.e ?? 1, PAL.ink, q._hand);
    member(name, x, y, u, { ...o, ...pose });
  }

  // faces: the dance mood, then (bar 79) eyes up to the counter, then the freeze: wide eyes, a small 'o'
  function face(name, t, dmood, x, v, extra = [], flip = false, first = null) {
    const lx = lookTo(x) * (flip ? -1 : 1);
    const keys = [...(first || [[T0 - 2, dmood]]), [T_LOOKUP, 'excited', { lookX: lx, lookY: -.85 }], [T_FREEZE + .04, 'surprised', { mouth: 'o', lookX: lx, lookY: -1 }], ...extra];
    const F = mood(name, t, keys, { v });
    return { eyes: F.eyes, mouth: F.mouth, squint: F.squint, lookX: F.lookX, lookY: F.lookY, blush: F.blush, emote: F.emote, emoteK: F.emoteK, emoteAge: F.emoteAge };
  }
  const faceNE = f => { const { emote, emoteK, emoteAge, ...r } = f; return r; };   // the face without its emote

  // a commuter hanging off a grab handle by one arm: the fist stays on the handle's loop (the set's own sway), the body
  // swings under it on the beat and the legs kick the gallop in mid-air. Before T_LEAP it's dancing on the seat; then a
  // crouch, a leap on an arc, the catch (a swing kick), and it hangs.
  function hangGround(h, t, tt, theta) {
    const u = h.u, C = CAST.commuter.variants(h.v), S = h.flip ? -1 : 1;
    const a = 1.45, al = 1.12, AL = 2.2 * al, k = clamp((a - .7) / .9);
    const fx = 4.9 + .55 * k + (AL + .1) * Math.cos(a), fy = -4.5 - (AL + .1) * Math.sin(a);   // the fist, body-local (u)
    const X = fx * u * C.sx * S, Y = fy * u * C.sy;
    const hx = h.hx + 6 * Math.sin(tt * 3 + h.hx * .01), hy = 266;                                // the handle loop (as subway() sways it)
    return [hx - (X * Math.cos(theta) - Y * Math.sin(theta)), hy - (X * Math.sin(theta) + Y * Math.cos(theta))];
  }
  const hangTheta = (h, t) => {
    const tp = pclock(t), bp = bpOf(tp) + h.ph, e = kf(t, [[T0, .85], [T_S3, 1], [T_S4, 1.2]]), S = h.flip ? -1 : 1;
    return S * (-.3 + .15 * e * Math.cos(Math.PI * bp) + .3 * spring(t, T_LEAP + .3, 5, 9));   // + the kick of the catch
  };
  function hanger(h, i, t, tt) {
    const u = h.u, C = CAST.commuter.variants(h.v), hand = C.col, S = h.flip ? -1 : 1, tp = pclock(t), key = h.key;
    const F = faceNE(face('commuter', t, 'excited', h.hx, h.v, [], h.flip, FIRST8('excited', T_LEAP - .2)));
    if (t < T_LEAP - .16) { dancer('commuter', h.x0, BENCH, u, CROWD, tp, { v: h.v, ph: c8ph(h.v), e: .95, noShadow: true, flip: h.flip, ...F, seed: SEED(i + 20), boilKey: key }); return; }
    if (t < T_LEAP) {   // the crouch (anticipation), arms swinging back
      const c = ease(seg(t, T_LEAP - .16, T_LEAP - .04));
      member('commuter', h.x0, BENCH, u, { v: h.v, flip: h.flip, noShadow: true, sq: .28 * c, dy: .1 * c, aL: -.2 - .9 * c, aR: -.2 - .9 * c, armLen: 1.2, armL: fistHook(hand), armR: fistHook(hand), legSplay: .5 * c, ...F, eyes: 'determined', seed: SEED(i + 20), boilKey: key });
      return;
    }
    const bp = bpOf(tp) + h.ph, e = kf(t, [[T0, .85], [T_S3, 1], [T_S4, 1.2]]);
    if (t < T_LEAP + .3) {   // the flight: an arc from the seat to the handle, stretched, the catching arm reaching up
      const k = easeOut(seg(t, T_LEAP, T_LEAP + .3)), th1 = hangTheta(h, T_LEAP + .3), end = hangGround(h, T_LEAP + .3, tt, th1);
      const p = arcPt([h.x0, BENCH], end, 70, k);
      member('commuter', p[0], p[1], u, { v: h.v, flip: h.flip, rot: th1 * k, sq: -.25 * (1 - k), noShadow: true,
        aR: lerp(.6, 1.45, k), armLen: { R: lerp(1.3, 1.12, k), L: 1.25 }, armR: fistHook(hand), aL: 1.1 - .9 * k, armL: fistHook(hand),
        legLift: [.8, .7, .7, .8], legSplay: .3, ...F, eyes: 'wide', mouth: 'open', seed: SEED(i + 20), boilKey: key });
      return;
    }
    const theta = hangTheta(h, t), [x, y] = hangGround(h, t, tt, theta), g = dance('gallop', tp, { ph: h.ph, hand, e });
    const pump = Math.sin(Math.PI * clamp(frac(bp) * 1.4));
    member('commuter', x, y, u, {
      v: h.v, seed: SEED(i + 20), rot: theta, flip: h.flip, noShadow: true,
      aR: 1.45, armLen: { R: 1.12, L: 1.25 }, armR: fistHook(hand), aL: -.1 + .95 * pump * e, armL: fistHook(hand),
      legLift: g.legLift.map(q => q * 1.2), legSplay: .45 + .2 * Math.sin(Math.PI * bp), sq: .04 * Math.sin(TAU * bp),
      ...F, boilKey: key
    });
  }

  // THE Horse, upright like a commuter (as c08 leaves it): the right hoof on a strap, the left holding its newspaper up
  // in front of its face (only the ears and the forelock over the top). In the hush it lowers the paper a fraction: two
  // deadpan eyes, straight at us. horseUp space (s): shoulders (±3.6, -12.4), face y -21.6..-13.4, eyes at y -18.9.
  const PW = 6.9, PH = 7.9;                                       // the folded paper, in s
  const paperLow = t => 2.45 * ease(seg(t, T_PAPER, T_PAPER + .45)) + .1 * spring(t, T_PAPER + .45, 9, 20);
  function newspaper(s, sw, x0, y0) {   // body space, top-left corner (x0, y0) in s
    const P = (x, y) => [(x0 + x) * s, (y0 + y) * s], M = PW / 2;
    boilSeed('c9 paper');
    paint([P(0, .2), P(M, 0), P(PW, .2), P(PW + .05, PH), P(M, PH + .12), P(-.05, PH)], { wash: '#F1ECDE', ink: PAL.ink, sw: sw * .9 });
    paint([P(M, .05), P(PW - .05, .25), P(PW, PH - .05), P(M, PH + .05)], { fill: '#C9C0AC', fillOp: 60, bleed: .02, tex: .5, ink: null });   // the far page, in shade
    inkLine([P(M, 0), P(M + .03, PH + .1)], sw * .5, '#9A907E', 'inkfine', 0);                                   // the fold
    boilSeed('c9 paper ink');
    for (const [a, b] of [[.45, M - .35], [M + .35, PW - .45]]) {
      const hl = []; for (let i = 0; i <= 6; i++) hl.push(P(lerp(a, b, i / 6), .95 + (i % 2 ? -.25 : .25)));
      inkLine(hl, sw * 1.3, '#3A3440', 'ink', .1);                                                                 // a headline scribble
      for (let r = 0; r < 5; r++) {
        const y = 2.15 + r * 1.2, ln = []; for (let i = 0; i <= 8; i++) ln.push(P(lerp(a, b - (r === 4 ? 1.1 : 0), i / 8), y + .15 * Math.sin(i * 2.1 + r)));
        inkLine(ln, sw * .45, '#6A6272', 'inkfine', .4);
      }
    }
    paint([P(.5, 1.8), P(2.9, 1.8), P(2.9, 4.4), P(.5, 4.4)], { wash: '#E4DCC8', ink: '#6A6272', sw: sw * .45 });   // a photo...
    paint([P(1.0, 2.7), P(2.4, 2.7), P(2.4, 3.6), P(1.0, 3.6)], { wash: PAL.clay, ink: null });                     // ...of a Clawd
    for (const lx of [1.15, 1.55, 1.9, 2.25]) inkLine([P(lx, 3.6), P(lx + (lx < 1.7 ? -.2 : .2), 4.1)], sw * .45, '#6A6272', 'inkfine', 0);
  }
  // c08's train Horse, verbatim (its paper already turned to pages 2-3), for the continuous first shot
  function horseC8(t) {
    const HSS = 15, HXS = 2338, HYS = 905, SL = 1.5, SA = 1.3;
    const len0 = 3.6 * SL * .72 * HSS, sx = HXS - 3.6 * HSS - len0 * Math.cos(SA), sy = HYS - 12.4 * HSS - len0 * Math.sin(SA), sway = .012 * Math.sin(t * 2.2 + 1);
    const page = (x0, y0, w, h, seed, sw) => {
      const X = q => x0 + q * w;
      inkLine([[X(.08), y0 + .14 * h], [X(.3), y0 + .1 * h], [X(.5), y0 + .15 * h], [X(.86), y0 + .11 * h]], sw * 1.5, '#3A3440', 'ink', .5);
      if (seed % 2) { paint(rectPts(X(.08), y0 + .26 * h, .38 * w, .3 * h), { wash: '#C9C0AE', ink: '#6A6070', sw: sw * .4 });
        const sc = []; for (let i = 0; i < 9; i++) sc.push([X(.12 + .3 * hash(i * 3.1 + seed)), y0 + (.3 + .22 * hash(i * 5.3 + seed)) * h]); inkLine(sc, sw * .6, '#5A5060', 'inkfine', .6); }
      for (let r = 0; r < 6; r++) {
        const yy = y0 + (.3 + r * .11) * h, xa = (seed % 2 && r < 3) ? .52 : .08, pts = [];
        for (let i = 0; i <= 6; i++) pts.push([X(xa + (.86 - xa) * i / 6), yy + Math.sin(i * 2.3 + r + seed) * .018 * h]);
        inkLine(pts, sw * .45, '#8A8290', 'inkfine', .5);
      }
    };
    const paper = (s, sw) => {
      const w = 9.4 * s, h = 7 * s, x0 = -w + .5 * s, y0 = -3.6 * s, half = w / 2, fold = x0 + half;
      boilSeed('c8 paper');
      paint(rectPts(x0, y0, w, h, s * .05), { wash: '#F1EBDD', fill: '#D8CFBC', fillOp: 60, tex: .5, ink: PAL.ink, sw: sw * .7 });
      inkLine([[fold, y0 + 2], [fold, y0 + h - 2]], sw * .5, '#9A907E', 'inkfine', 0);
      page(x0, y0, half, h, 13, sw); page(fold, y0, half, h, 14, sw);
      paint(rrPts(-.8 * s, -.8 * s, 1.6 * s, 1.6 * s, .5 * s), { wash: GP.hoof, ink: PAL.ink, sw: sw * .6 });
    };
    boilSeed('c8 strap');
    inkLine([[sx, 196], [sx + 2, sy - 22]], 3, '#4A4650', 'ink', 0);
    paint(rrPts(sx - 20, sy - 26, 40, 42, 12), { ink: '#5A5660', sw: 2.2 });
    const hx = 4.7, hy = -12.6, vx = hx - 3.6, vy = hy + 12.4, armLen = Math.hypot(vx, vy) / (3.6 * .72), a = Math.atan2(-vy, vx);
    horse(HXS, HYS, HSS, t, { view: 'up', mood: 'deadpan', blink: 2.915, rot: sway, aL: SA, aR: a, armLen: { L: SL, R: armLen }, frontArm: 'R',
      armR: (u, sw) => { push(); rotate(a); paper(HSS, sw); pop(); }, boilKey: 'c8 horseS' });
  }
  function theHorse(t, tt) {
    if (t < T_S2) { horseC8(t); return; }
    const { x, y, s } = HORSE, sw = clamp(s / 15, .45, 2.4), low = paperLow(t);
    const bob = t < T_FREEZE ? .08 * Math.cos(Math.PI * bpOf(t)) : 0;          // the paper rides the car's rocking
    const top = -20.45 + low + bob, grip = [-1.45, top + PH - .5];            // the left hoof holds it near the bottom
    const vx = grip[0] + 3.6, vy = grip[1] + 12.4, len = Math.hypot(vx, vy);
    let aL = Math.atan2(-vy, -vx); if (aL < 0) aL += TAU;
    const armL = (u, sw_) => {   // at the hoof: back to body space, the paper, then the hoof again over its edge
      push(); scale(-1, 1); rotate(-aL); newspaper(s, sw, -PW / 2 - grip[0], top - grip[1]); pop();
      paint(rrPts(-.5 * s, -.8 * s, 1.6 * s, 1.6 * s, .5 * s), { wash: GP.hoof, ink: PAL.ink, sw: sw * .6 });
    };
    // the strap: from the rail down to the right hoof (drawn first, behind the horse)
    const aR = 1.2, lenR = 3.6 * 1.05 * .72, hx = x + (3.6 + lenR * Math.cos(aR) + .3 * Math.cos(aR)) * s, hy = y + (-12.4 - (lenR + .3) * Math.sin(aR)) * s;
    boilSeed('c9 strap');
    paint(rectPts(hx - .3 * s, 196, .6 * s, hy - 196 - .9 * s), { wash: '#5A6A74', ink: PAL.ink, sw: sw * .6 });
    paint(ellPts(hx, hy - .2 * s, 1.1 * s, 1.2 * s, 14), { wash: '#6A7A84', ink: PAL.ink, sw: sw * .6 });
    horse(x, y, s, t, { view: 'up', mood: 'deadpan', blink: 3.1, aL, aR, armLen: { L: len / (3.6 * .72), R: 1.05 }, frontArm: 'L', armL, boilKey: 'c9 horse' });
  }

  // Little Clawd on the seat: the routine, the freeze... and ONE tiny lasso twirl
  function theKid(t) {
    const hand = CAST.kid.hand, u = KID.u;
    const F = faceNE(face('kid', t, 'excited', KID.x, 0, [[T_KID, 'determined', { lookX: -.3, lookY: -.8 }]]));
    let pose = routine(pclock(t), KIDR, { hand });
    if (t > T_ARM) {
      const up = ease(seg(t, T_ARM, T_TW0)), a = lerp(pose.aR, 1.42, up), k = .72 * ease(seg(t, T_TW0 - .04, T_TW0 + .06)) * (1 - ease(seg(t, T_TW1, T_ZIP)));
      const spin = ease(seg(t, T_TW0, T_TW1)) + .02 * spring(t, T_TW1, 10, 30);
      pose = { ...pose, aR: a, frontArm: up > .5 ? 'L' : pose.frontArm, armLen: { L: 2.4, R: lerp(2.4, 1.15, up) },
        armR: k > .02 ? lassoHook('R', a, spin, k, PAL.ink, hand) : fistHook(hand, .78), dy: (pose.dy || 0) - .15 * up + .08 * spring(t, T_ZIP, 12, 26) };
    }
    member('kid', KID.x, KID.y, u, { ...pose, ...F, seed: SEED(3), boilKey: 'c9 kid' });
  }

  // the sleeper (c08's last holdout, far left): dozing through bar 72, the car's big jolt on the bar-73 downbeat wakes him
  // (a take, a '!'), a look round at the party, and he hops up into the gallop on beat 2
  const T_WAKE = barT(73), T_JOIN = beatT(73, 2);
  function sleeper(t) {
    const c = SLEEPER, C = CAST.commuter.variants(c.v), hand = C.col, sleeve = C.suit;
    const M = mood('commuter', t, [[T0 - 2, 'sleepy', { emote: 'zzz' }], [T_WAKE, 'surprised', { emote: '!' }], [T_JOIN - .1, 'excited', { lookX: .5 }],
      [T_LOOKUP, 'excited', { lookX: lookTo(c.x), lookY: -.85 }], [T_FREEZE + .04, 'surprised', { mouth: 'o', lookX: lookTo(c.x), lookY: -1 }]], { v: c.v });
    if (t >= T_WAKE + .12 && t < T_JOIN) { M.lookX = kf(t, [[T_WAKE + .12, 0], [T_WAKE + .3, .75], [T_WAKE + .62, .75], [T_WAKE + .74, 1]]); M.lookY = kf(t, [[T_WAKE + .62, 0], [T_WAKE + .74, -.25]]); }   // a look round at the party
    const sway = .035 * Math.sin(t * 2.2 + c.x * .013);
    if (t < T_WAKE) {   // exactly as c08 draws its sleeper
      member('commuter', c.x, SIT, c.u, { v: c.v, noShadow: true, boilKey: c.key, eyes: 'closed', mouth: 'o', emote: 'zzz', emoteK: 1, emoteAge: t - 100,
        aL: -.8, aR: -.8, sq: .06 + .03 * Math.sin(t * 1.9), rot: .1 + sway, legLift: [.35, .35, .35, .35] });
      return;
    }
    const doze = { dy: M.dy, sq: .06 + (M.sq || 0), rot: M.rot || 0, dx: M.dx || 0, aL: -.8, aR: -.8, armLen: 1, legSplay: 0, legLift: [.35, .35, .35, .35] };
    const g = routine(pclock(t), CROWD, { hand, sleeve, ph: c8ph(c.v), e: .95 });
    const k = ease(seg(t, T_JOIN, T_JOIN + .16)), up = easeOut(seg(t, T_JOIN, T_JOIN + .22));
    let pose = k <= 0 ? doze : k >= 1 ? g : _lerpPose(doze, g, k);
    if (t >= T_JOIN - .12 && t < T_JOIN + .5) { const j = jump(t, T_JOIN, T_JOIN + .22, 1.2); pose = { ...pose, dy: (pose.dy || 0) + j.dy, sq: (pose.sq || 0) + j.sq }; }
    member('commuter', c.x, lerp(SIT, BENCH, up), c.u, { v: c.v, ...pose, noShadow: true, eyes: M.eyes, mouth: M.mouth, squint: M.squint, lookX: M.lookX, lookY: M.lookY,
      emote: t < T_JOIN + .3 ? M.emote : null, emoteK: M.emoteK, emoteAge: M.emoteAge, seed: SEED(11), boilKey: c.key });
  }

  // the whole carriage. o.kid / o.front: include Little Clawd / the foreground pair
  function carriage(t, cam, o = {}) {
    const tt = trainT(t), r = rocking(t);
    camBegin(cam[0], cam[1] + r.dy, cam[2], r.rot);
    const [va, , vc] = viewRect2(40), V = (x0, x1) => x1 > va && x0 < vc;   // cull what the camera can't see
    subway(tt, { speed: 1.1, hooks: {
      seats: () => {
        if (V(SLEEPER.x - 90, SLEEPER.x + 90)) sleeper(t);
        SEATED.forEach((c, i) => { if (V(c.x - 90, c.x + 90)) dancer('commuter', c.x, BENCH, c.u, CROWD, pclock(t), { v: c.v, ph: c8ph(c.v), e: .95, noShadow: true, ...faceNE(face('commuter', t, 'happy', c.x, c.v, [], false, FIRST8(i % 2 ? 'happy' : 'excited'))), seed: SEED(i + 4), boilKey: c.key }); });
        HANG.forEach((h, i) => { if (V(h.hx - 260, h.hx + 260)) hanger(h, i, t, tt); });
        if (o.kid !== false && V(KID.x - 90, KID.x + 90)) theKid(t);
      },
      mid: () => {
        // the floor, back to front: the commuters and the Horse by depth, then the leads
        const floor = FLOORC.map((c, i) => [c.y, () => { if (V(c.x - 120, c.x + 120)) dancer('commuter', c.x, c.y, c.u, CROWD, pclock(t), { v: c.v, ph: c8ph(c.v), e: .95, ...faceNE(face('commuter', t, 'happy', c.x, c.v, [], false, FIRST8(i % 2 ? 'excited' : 'happy'))), seed: SEED(i), boilKey: c.key }); }]);
        floor.push([HORSE.y, () => { if (V(HORSE.x - 90, HORSE.x + 140)) theHorse(t, tt); }]);
        floor.sort((a, b) => a[0] - b[0]).forEach(([, f]) => f());
        const oppaF = faceNE(face('oppa', t, 'cool', OPPA.x, 0, [[T_SWEAT - .06, 'nervous', { mouth: 'wobble', lookX: .3, lookY: -1 }]]));
        const turned = t >= barT(73);                              // c08 hands them over front-on, galloping
        dancerL('oppa', oppaX(t), OPPA.y, OPPA.u, LEADS, pclock(t), { look: 'white', view: turned ? 'q' : 'front', ...oppaF, ...(turned ? {} : singing(t, 'rap')), seed: SEED(1), boilKey: turned ? 'c9 oppa' : 'c8 oppaS' });
        const popF = turned ? faceNE(face('pop', t, 'happy', POP.x, 0, [], true)) : { eyes: 'happy', mouth: frac(bpOf(t) / 2) < .5 ? 'grin' : 'sing', blush: .3 };
        dancerL('pop', popX(t), POP.y, POP.u, LEADS, pclock(t), { view: turned ? 'q' : 'front', flip: turned, ph: .06, ...popF, seed: SEED(2), boilKey: turned ? 'c9 pop' : 'c8 pop' });
        if (t >= T_SWEAT) sweat(t);
      },
      front: () => { if (o.front) FRONTC.forEach((c, i) => { if (V(c.x - 170, c.x + 170)) dancer('commuter', c.x, c.y, c.u, CROWD, pclock(t), { v: c.v, ...crowdVar(i + 9), ...faceNE(face('commuter', t, 'excited', c.x, c.v)), seed: SEED(i + 9), boilKey: 'c9 front ' + c.v }); }); }
    } });
    camEnd();
  }
  // Oppa's one sweat drop, at his temple (his frozen pose), popping in and sliding down
  function sweat(t) {
    const a = t - T_SWEAT, u = OPPA.u, p = dance('gallop', T_FREEZE, {});
    const x = oppaX(t) + ((p.dx || 0) + (1.5 + 3.95 * .74) * 1.12) * u, y = OPPA.y + (p.dy || 0) * u - 7.25 * u * .94 + ease(seg(a, .15, .6)) * 1.2 * u;
    boilSeed('c9 sweat');
    emote('sweat', x, y, u * 1.05, clamp(a / .14), a);
  }

  // ---------- the shots ----------
  // S1: WIDE, continuous from c08 (STAGE.subway.wide exactly at 134.727); through bar 72 it drifts left and in, toward the
  // sleeper (leading the eye to the wake-up), the leads staying in frame
  function sWide1(t) {
    const e = ease(seg(t, T0 + .2, T_WAKE - .15)), e2 = ease(seg(t, T_WAKE, T_S2));
    carriage(t, [lerp(1500, 1100, e) + 25 * e2, lerp(560, 628, e) + 6 * e2, lerp(.75, .95, e) + .02 * e2], { kid: false });
    bigCounter(t);
  }
  // S2: MEDIUM TWO-SHOT on the leads' disco, a slow push
  const camS2 = t => { const e = ease(seg(t, T_S2, T_S3)); return [lerp(1500, 1508, e), lerp(744, 752, e), lerp(1.27, 1.37, e)]; };
  function sDuet(t) { carriage(t, camS2(t)); bigCounter(t); }
  // S3: SNAP ZOOM-OUT to the whole train galloping, then a slow push
  function sTrain(t) {
    const a = t - T_S3, e = ease(seg(t, T_S3 + .25, T_S4)), wide = [lerp(1545, 1552, e), lerp(620, 626, e), lerp(.8, .87, e)];
    const k = easeOut(seg(a, 0, .26)), c0 = camS2(T_S3);
    carriage(t, [lerp(c0[0], wide[0], k), lerp(c0[1], wide[1], k), 1 / lerp(1 / c0[2], 1 / wide[2], k)], { front: true });
    if (a < .2) { boilSeed('c9 zoomlines'); speedLines(W / 2, H / 2 + 60, 520 + 700 * k, 900 + 900 * k, 26, '#F4F0E4', 3, 1.6 * (1 - a / .2)); }
    bigCounter(t);
  }
  // S4: MEDIUM-CLOSE on the leads' lasso, pushing in hard
  function sPeak(t) {
    const e = ease(seg(t, T_S4, T_S5));
    carriage(t, [lerp(1515, 1555, e), lerp(752, 772, e), lerp(1.3, 1.52, e)]);
    bigCounter(t);
  }
  // S5: the TABLEAU: the last ticks, the freeze, the hush, the gags, the hold
  function sBreath(t) {
    const e = ease(seg(t, T_STUCK, T1 + .25));
    carriage(t, [lerp(1640, 1690, e), lerp(634, 618, e), lerp(1.12, 1.17, e)], { front: true });
    bigCounter(t);
  }

  shots([[T0, sWide1], [T_S2, sDuet], [T_S3, sTrain], [T_S4, sPeak], [T_S5, sBreath]]);
})();
