// c11_global.js: POST-CHORUS 2, bars 89-96 (barT(89) = 165.636 -> barT(97) = 180.182). The contagion goes GLOBAL.
//
// ============================================= SHOT PLAN =============================================
// Music: the second dance hook, 8 bars, cut on the bar lines. k = beats since the seam (1 beat = .4545 s).
//
//  A   165.636-168.364  (bar 89 + half of bar 90, k 0-6)  THE PLATFORM: "DOWN ON ALL FOURS"
//      SEAM IN (continuous with c10): camera STAGE.platform.wide [1500, 560, .7]; the line of nine at y 900,
//      x = 780 + 180i, Oppa (white) at i = 4, the Pop Star at i = 5, all finishing the lasso.
//      One read per beat, every hit on the beat:
//      k 0-.5  the lassos wind down (the loops shrink away, arms drop). Oppa winds up, both arms high.
//      k .5    Oppa signals DOWN!: both arms slam at the floor, a squash, a dust thump, shout rings aimed down.
//              A snap push-in to a medium on the line.
//      k 1     They look at each other: neighbours turn to face each other (drawn 3/4 turns), a few '?'.
//              Oppa looks left, then right, at them: why aren't they getting down?
//      k 2     They all look down at their own legs: each Clawd's four legs tap in turn, counting 1-2-3-4.
//      k 3     They look back at us and shrug, arms up, flat faces, a few "...": a Clawd is ALWAYS on all fours.
//      k 4     (bar 90) They hunker down low [crawl] and wiggle their rears on the beat, smug. Oppa too.
//  A2  168.364-169.273  (k 6-8)  cut on the beat: the far end of the platform. The Horse, side-on on its own four
//      legs, faces the line (the last wiggling rears at the left edge). It looks at them flatly. Its eye slides to
//      us (k 6.9). One blink (169.0). Deadpan.
//  B   169.273-171.091  (bar 91, k 8-12)  THE CROSSING, golden afternoon                              [gallop]
//      hard cut on the downbeat: a zebra crossing. Five Clawds (commuters, grannies, a tracksuit) wait at the kerb
//      under a pedestrian signal, eyes up at the glowing red standing man.
//      k 9     the lamp flips to GREEN, and the little glowing stick figure is GALLOPING: reins at the chest, a
//              knee up, a hop on every "and". A take from the kerb...
//      k 9.6-10.1  one after another they catch it and gallop out across the stripes, left to right; the camera
//              tracks them.  Last 5 frames: a whip pan RIGHT (speed streaks).
//  C   171.091-172.909  (bar 92, k 12-16)  THE SQUARE at sunset                               [disco pose -> lasso]
//      the whip lands on a bronze statue of Oppa on a granite plinth, frozen in a heroic pose (one arm flung to
//      the sky: the disco point), a pigeon perched on its raised fist.
//      k 13    the statue comes alive: the raised arm swings a lasso, the bronze body gallops. The pigeon, evicted,
//              flaps off; the eye follows it right across the square (the camera too) to the next plinth, where a
//              "horse statue" stands...
//      k 15.1  ...the pigeon lands on its head: it is THE Horse (chestnut, the spark star), dead still.
//      k 15.5  It blinks. Once.   Last .3 s: the camera pulls up and away; clouds rush in (C -> D).
//  D   172.909-174.727  (bar 93, k 16-20)  THE GLOBE                                                     [lasso]
//      out of the clouds, still pulling back: the painted Earth turning in space (flat, rotating in-plane like a
//      little planet). A spark at Korea: one tiny Clawd pops up there on the rim, lassoing. Then on every
//      sixteenth two more pop up, one each way, each with a burst of confetti, the wave running round the world
//      until the whole planet wears a crown of lassoing Clawds. Last beat: pulling back further.
//  E   174.727-176.545  (bar 94, k 20-24)  SPACE                                                         [gallop]
//      the pull-back carries on: the crowned Earth slides left and THE MOON swings in, huge, with a face, stubby
//      arms on the reins and four stubby legs, doing the gallop, its craters bouncing on every landing. Satellites
//      gallop round it (panels flapping, strut legs kicking); the stars twinkle on the beat.
//      Last 5 frames: a whip DOWN (the stars streak up).
//  F   176.545-180.182  (bars 95-96, k 24-32)  THE FINISH: the square at dusk, packed       [lasso -> vArms]
//      the whip lands on the whole city in the square under string lights: rows of commuters, grannies, White
//      Dancers and party costumes, Oppa (white) front and centre with the Pop Star, all doing the LASSO. The bronze
//      statue lassos on its plinth; the Horse still stands on its plinth, the pigeon still on its head.
//      k 28 (bar 96): V-ARMS. Every arm flies up, the camera lifts in, confetti. The pigeon on the Horse's head
//      throws its wings up in a V too. On the last beat (k 31) the Horse's eye slides to us.
//      SEAM OUT: a hard cut on the bar-97 downbeat (180.182) into the quiet bridge. The HUD reads 1,99x,xxx,xxx.
//  The counter HUD is in every shot (1.5 B -> 2 B). The palette runs platform blue -> gold -> sunset -> space
//  indigo -> dusk lilac, handing c12 its night.
// =====================================================================================================
(() => {
  // ---------------------------------------------------------------- time
  const B0 = barT(89), kb = k => B0 + k * BEAT, kOf = t => (t - B0) / BEAT;
  const bump = (x, a, d) => Math.sin(Math.PI * clamp((x - a) / d));                      // 0 -> 1 -> 0 over [a, a + d]
  // the seed that makes horseEye() blink exactly at time tb (its blink: ((t * .7 + seed * 1.3) % 4.1) < .13)
  const blinkAt = tb => ((4.1 - (tb * .7) % 4.1) % 4.1 + .01) / 1.3;
  const NOBLINK = tb => blinkAt(tb) + 1.6;                                                  // a seed whose blink is ~2.3 s away

  // ---------------------------------------------------------------- cast helpers
  const FACE = ['eyes', 'mouth', 'squint', 'blush', 'gloom', 'lid', 'emote', 'emoteK', 'emoteAge', 'lookX', 'lookY', 'col', 'dk', 'lt', 'tint', 'tintK'];
  const faceOf = m => { const r = {}; for (const f of FACE) if (m[f] !== undefined) r[f] = m[f]; return r; };
  const handsOf = (name, o = {}) => { const q = memberOpts(name, o); return { hand: q._hand, sleeve: q._sleeve, sx: q.sx, sy: q.sy }; };
  // a pose sequence: S = [[k0, pose, blendBeats, easeFn], ...]; blends from the previous pose after each key
  function seqPose(k, S) {
    let j = 0; while (j + 1 < S.length && k >= S[j + 1][0]) j++;
    const cur = S[j][1], bl = S[j][2] ?? .25;
    if (j > 0 && k - S[j][0] < bl) return _lerpPose(S[j - 1][1], cur, (S[j][3] || ease)((k - S[j][0]) / bl));
    return { ...cur };
  }
  // world position of a front-view arm tip (the hook origin), for things that must touch a fist
  function armTip(x, y, u, o, which = 'R') {
    const dir = which === 'R' ? 1 : -1, a = which === 'R' ? (o.aR ?? .2) : (o.aL ?? .2);
    const AL = 2.2 * (typeof o.armLen === 'object' ? (o.armLen[which] ?? 1) : (o.armLen ?? 1));
    let lx = (4.9 + .55 * clamp((Math.abs(a) - .7) / .9)) * dir * u + dir * AL * u * Math.cos(a), ly = -4.5 * u - AL * u * Math.sin(a);
    const sq = o.sq || 0; lx *= (o.flip ? -1 : 1) * (o.sx ?? 1) * (1 + sq * .6); ly *= (o.sy ?? 1) * (1 - sq);
    const r = o.rot || 0, c = Math.cos(r), s = Math.sin(r);
    return [x + (o.dx || 0) * u + lx * c - ly * s, y + (o.dy || 0) * u + lx * s + ly * c];
  }

  // ---------------------------------------------------------------- shared marks
  // speed streaks for a whip (screen space): k 0..1 strength
  function streaks(k, vertical, seed, cols) {
    if (k <= .02) return;
    const f = Math.floor(T * 24);
    for (let i = 0; i < 34; i++) {
      const a = hash(i * 3.7 + seed), b = hash(i * 9.1 + seed), c = hash(i * 5.3 + seed + f * 1.7);
      const len = (240 + 1000 * b) * (.35 + .65 * k), w = (1 + 3.4 * a) * (.5 + .5 * k), col = cols[i % cols.length];
      boilSeed('streak' + seed + '_' + i);
      if (vertical) { const x = a * W, y = c * (H + 600) - 300; inkLine([[x, y - len / 2], [x + jit(3), y + len / 2]], w, col, 'dry', 0); }
      else { const y = b * H, x = c * (W + 600) - 300; inkLine([[x - len / 2, y], [x + len / 2, y + jit(3)]], w, col, 'dry', 0); }
    }
  }
  // a cloud puff (screen or world)
  function puff(x, y, r, seed, op = 255) {
    const P = []; for (let i = 0; i < 22; i++) { const a = i / 22 * TAU, b = 1 + .16 * Math.abs(Math.sin(a * 2.5 + seed)) + .08 * Math.sin(a * 5 + seed * 3); P.push([x + Math.cos(a) * r * b, y + Math.sin(a) * r * .72 * b]); }
    paint(P, { wash: '#FBF6EC', washOp: op, fill: '#DCE2EA', fillOp: 70 * op / 255, bleed: .06, tex: .4, ink: op > 200 ? '#B8BCC8' : null, sw: .8, curv: .4 });
  }
  // THE CLOUDS (C -> D): p 0 -> .5 clouds rush in from every edge and cover the frame (the camera pulling up
  // through them); .5 -> 1 they keep converging and shrink away into the middle (receding below us), revealing the
  // globe. Screen space; both shots call it with the same p at the cut.
  function cloudCover(p) {
    if (p <= 0 || p >= 1) return;
    const n = 20;
    if (p > .4 && p < .6) { boilSeed('cloud fill'); paint(rectPts(-40, -40, W + 80, H + 80), { wash: '#FBF6EC', washOp: 255 * bump(p, .4, .2), ink: null }); }
    for (let i = 0; i < n; i++) {
      const h1 = hash(i * 2.7 + 5), h2 = hash(i * 6.1 + 2), h3 = hash(i * 4.3 + 9), ang = i / n * TAU + h1 * .6;
      const cov = [W / 2 + Math.cos(ang) * (80 + 640 * h3), H / 2 + Math.sin(ang) * (60 + 400 * h3)], R0 = 330 + 190 * h2;
      let x, y, r;
      if (p < .5) { const q = easeOut(p * 2); x = lerp(W / 2 + Math.cos(ang) * 1700, cov[0], q); y = lerp(H / 2 + Math.sin(ang) * 1100, cov[1], q); r = lerp(R0 * 1.6, R0, q); }
      else { const q = easeIn((p - .5) * 2); x = lerp(cov[0], W / 2, q); y = lerp(cov[1], H / 2, q); r = R0 * (1 - q); }
      if (r < 6) continue;
      boilSeed('cloud' + i); puff(x, y, r, i);
    }
  }

  // ======================================================================================================
  // A: THE PLATFORM, "DOWN ON ALL FOURS"
  // ======================================================================================================
  // the line of nine, exactly as c10 hands it over: x = 780 + 180 i, y 900
  const LINE = [['dancer', { v: 0 }], ['commuter', { v: 0 }], ['dancer', { v: 1 }], ['commuter', { v: 2 }], ['oppa', { look: 'white' }],
    ['pop', {}], ['commuter', { v: 1 }], ['dancer', { v: 3 }], ['commuter', { v: 4 }]];
  const LU = [14, 14, 14, 14, 15, 14, 14, 14, 14], LX = i => 780 + 180 * i, LY = 900;
  const PAIR = [1, 1, 1, -1, 0, 1, -1, -1, -1];                                   // which neighbour each one turns to
  const LINE_MOOD = i => LINE[i][0] === 'oppa' ? 'cool' : 'happy';                 // the faces c10 ends on

  function gagOpts(i, t) {
    const [name, O] = LINE[i], isO = name === 'oppa', k = kOf(t), cv = crowdVar(i), hs = handsOf(name, O);
    const st = isO ? 0 : .09 * hash(i * 4.7);                                        // a small stagger (beats)
    // the lasso winding down: the loop shrinks away as the energy drains
    const lassoE = isO ? 1 : cv.e * (1 - ease(seg(k, .02 + st, .5 + st)));
    const lasso = dance('lasso', t, { ...cv, side: 1, hand: hs.hand, sleeve: hs.sleeve, e: Math.max(.03, lassoE) });
    const stand = { aL: -.55, aR: -.55, armLen: .95, dy: 0, sq: 0, rot: 0, dx: 0, legSplay: .12, legLift: [0, 0, 0, 0], frontArm: '' };
    const legsP = { ...stand, sq: .07, dy: .1, legLift: [0, 1, 2, 3].map(j => .8 * bump(k, 2.16 + j * .2, .22)) };
    const hk = bentHook(-1.62, 1.3, hs.sleeve, hs.hand), sh = ease(seg(k, 3.15, 3.8));
    const shrug = { ...stand, aL: -.08, aR: -.08, armLen: .8, armL: hk, armR: hk, dy: -.34 + .14 * sh, sq: -.1 + .06 * sh };
    const c = dance('crawl', t, { ph: cv.ph }); delete c.eyes;
    const crawl = { ...c, rot: c.rot * 1.9, dx: c.dx * 1.8, sq: c.sq + .14 * Math.exp(-Math.max(0, t - kb(3.97)) * 9) };
    let S;
    if (isO) {
      const fist = fistHook(hs.hand, .74), a = t - kb(.5), slam = a > 0 ? Math.exp(-a * 8) : 0, sp = .1 * spring(t, kb(.5), 6, 22);
      const windup = { ...stand, aL: 1.38, aR: 1.38, armLen: 1.25, armL: fist, armR: fist, sq: -.15, dy: -.5, legSplay: .5 };
      const down = { ...stand, aL: -1.0 + sp, aR: -1.0 + sp, armLen: 1.5, armL: fist, armR: fist, sq: .1 + .22 * slam, dy: .04 + .12 * slam, legSplay: .95 };
      S = [[-99, lasso], [.08, windup, .3], [.42, down, .08, easeIn], [1.0, stand, .3], [2.0, legsP, .2], [3.0, shrug, .12, easeOut], [3.97, crawl, .1]];
    } else S = [[-99, lasso], [.36 + st, stand, .3], [2.0, legsP, .2], [3.0 + st, shrug, .12, easeOut], [3.97, crawl, .1]];
    const pose = seqPose(k, S);
    const tk = isO ? take(t, kb(3.0), .4) : take(t, kb(.56 + st), .55), tk2 = isO ? { sq: 0, dy: 0 } : take(t, kb(3.0 + st), .35);
    pose.sq = (pose.sq || 0) + tk.sq + tk2.sq; pose.dy = (pose.dy || 0) + tk.dy + tk2.dy;
    if (k > 3.66 && k < 3.97) pose.dy -= .38 * bump(k, 3.66, .31);                   // a little hop before the hunker
    // look at each other: drawn 3/4 turns toward the neighbour (Oppa: left, then right)
    let view = {};
    if (isO) { if (k >= 1 && k < 2.2) view = k < 1.5 ? turn(t, kb(1), kb(1) + .12, 0, -.125) : k < 2 ? turn(t, kb(1.5), kb(1.5) + .12, -.125, .125) : turn(t, kb(2), kb(2) + .12, .125, 0); }
    else if (k >= 1 + st && k < 2.2) view = k < 1.95 ? turn(t, kb(1 + st), kb(1 + st) + .12, 0, PAIR[i] * .125) : turn(t, kb(1.95), kb(1.95) + .12, PAIR[i] * .125, 0);
    const M = isO
      ? mood(name, t, [[B0 - 4, LINE_MOOD(i)], [kb(.4), 'determined', { mouth: 'belt', emote: null }], [kb(1), 'confused', { emote: '?' }],
          [kb(2), 'neutral', { mouth: 'o', lookY: 1 }], [kb(3), 'bored', { emote: null }], [kb(3.97), 'smug', { emote: null }]])
      : mood(name, t, [[B0 - 4, LINE_MOOD(i)], [kb(.56 + st), 'surprised', { emote: null }], [kb(1 + st), 'confused', { lookX: .85, emote: i % 2 ? '?' : null }],
          [kb(2), 'neutral', { eyes: 'look', mouth: 'o', lookY: 1, lookX: 0, emote: null }], [kb(3 + st), 'bored', { lookY: 0, lookX: 0, emote: [1, 5, 7].includes(i) ? 'dots' : null }],
          [kb(3.97), 'smug', { lookX: 0, emote: null }]], { v: O.v });
    return { ...O, ...faceOf(M), ...pose, ...view, hairSway: Math.sin(bpOf(t) * Math.PI) * .3, boilKey: 'L' + i };
  }
  function drawLine(t, which) { for (const i of which) if (vis(LX(i) - 160, LX(i) + 160)) member(LINE[i][0], LX(i), LY, LU[i], gagOpts(i, t)); }
  // Oppa's DOWN! thump: dust puffs skidding out along the floor, shout rings aimed at the floor
  function thump(t) {
    const a = t - kb(.5); if (a < 0 || a > .7) return;
    const x = LX(4), y = LY, q = easeOut(a / .7);
    for (let j = 0; j < 6; j++) {
      const s = j < 3 ? -1 : 1, jj = j % 3;
      boilSeed('thump' + j);
      paint(ellPts(x + s * (70 + 55 * jj) * (.5 + .9 * q), y - 6 - 14 * jj * q, (15 + 9 * jj) * (1 - .3 * q), (9 + 5 * jj) * (1 - .3 * q), 10), { wash: '#F4F0E6', washOp: 235 * (1 - q), ink: q < .6 ? PAL.ink : null, sw: .5 });
    }
    boilSeed('thump rings'); screamRings(x, y - 150, a, .2, { dir: Math.PI / 2, arc: [-.5, .5], n: 3, life: .5, gap: .07, col: PAL.cream, w: 1.3 });
  }
  function shotGag(t, lt, dur) {
    const k = kOf(t), push = easeOut(seg(k, .1, .6)), back = ease(seg(k, 3.85, 4.35));
    let cx = lerp(1500, 1590, push), cy = lerp(560, 842, push), z = lerp(.7, 1.82, push);   // a snap push-in on the DOWN
    cy += 28 * bump(k, 1.9, 1.4);                                                    // tilt down to the legs
    z += .08 * ease(seg(k, .6, 3.85));
    cx = lerp(cx, 1500, back); cy = lerp(cy, 815, back); z = lerp(z, 1.22, back);      // pull back: the whole line hunkers
    z += .07 * ease(seg(k, 4.35, 6));
    const a = t - kb(.5), [sx, sy] = a > 0 ? shakeXY(t, 7 * Math.exp(-a * 10)) : [0, 0];
    const b = t - kb(4), [bx, by] = b > 0 ? shakeXY(t + 3, 4 * Math.exp(-b * 12)) : [0, 0];
    camBegin(cx + sx + bx, cy + sy + by, z);
    platform(t, { hooks: { mid: () => { drawLine(t, [0, 1, 2, 3, 4, 5, 6, 7, 8]); thump(t); } } });
    camEnd();
    counterHUD(t);
  }
  // A2: the Horse, at the far end of the platform
  const HX = 3080, HY = 888, HS = 11.5;       // off to the right of c10's wide (its view ends at x 2871), facing the line
  function shotHorseA(t, lt, dur) {
    const k = kOf(t);
    camBegin(3040 - 18 * ease(lt / dur), 796, 2.25 + .12 * ease(lt / dur));
    platform(t, { hooks: { mid: () => {
      horse(HX, HY, HS, t, { flip: true, mood: 'deadpan', look: k > 6.9 ? 'camera' : undefined, blink: blinkAt(169.0), boilKey: 'A2 horse' });
    } } });
    camEnd();
    counterHUD(t);
  }

  // ======================================================================================================
  // B: THE CROSSING
  // ======================================================================================================
  const CR = { kerb: 720, z0: 790, z1: 2830, poleX: 560, boxY: 330 };
  const CR_BLD = [[-640, 390, 480], [-230, 300, 360], [90, 350, 540], [460, 300, 420], [790, 410, 590], [1240, 320, 400], [1590, 380, 520], [2000, 310, 450],
    [2340, 370, 560], [2740, 330, 410], [3100, 400, 520], [3530, 310, 470], [3870, 370, 540], [4270, 330, 450]];
  const CR_COL = ['#EBCBA6', '#DDB394', '#F0D7B6', '#D6A68A', '#E7C39F', '#DBAE8E', '#EDD0AC', '#D4A386'];
  const PEDS = [   // name, opts, x0, y, u, the beat (in the shot) it catches the gallop
    ['commuter', { v: 6 }, 185, 892, 17, 1.72], ['crowd', { v: 3 }, 420, 892, 17, 1.9],
    ['crowd', { v: 11 }, 80, 960, 20, 2.02], ['commuter', { v: 4 }, 318, 960, 20, 1.6], ['granny', { v: 1 }, 585, 960, 19, 1.82]];
  // the little glowing figure on the lamp, a solid painted silhouette: 'stand' (front) or 'gallop' (facing right, beat-locked)
  function pedFigure(cx, cy, h, col, kind, t) {
    const s = h / 10, W_ = (P, w0, w1) => paint(ribbon(P, w0 * s, (w1 ?? w0) * s), { wash: col, ink: null });
    boilSeed('pedfig ' + kind);
    if (kind === 'stand') {
      paint(ellPts(cx, cy - 3.75 * s, 1.1 * s, 1.1 * s, 16), { wash: col, ink: null });
      paint(rrPts(cx - .95 * s, cy - 2.45 * s, 1.9 * s, 3.7 * s, .6 * s), { wash: col, ink: null });
      for (const d of [-1, 1]) {
        W_([[cx + d * .95 * s, cy - 2.1 * s], [cx + d * 1.25 * s, cy - .6 * s], [cx + d * 1.3 * s, cy + .9 * s]], .62, .55);
        W_([[cx + d * .5 * s, cy + 1.0 * s], [cx + d * .55 * s, cy + 3 * s], [cx + d * .6 * s, cy + 5 * s]], .8, .72);
      }
      return;
    }
    const { f } = _bt(t), L = _skip(f), hop = Math.sin(Math.PI * f), oy = cy - .7 * s * hop;
    const hip = [cx - .35 * s, oy + 1.1 * s], sh = [cx + .05 * s, oy - 2.1 * s];
    const knee = [hip[0] + (.7 + 1.5 * L) * s, hip[1] + (2.0 - 1.5 * L) * s], foot = [knee[0] - (.05 - .45 * L) * s, knee[1] + 2.0 * s];
    const kneeB = [hip[0] - .6 * s, hip[1] + 2.0 * s], footB = [kneeB[0] - (.3 - .3 * L) * s, kneeB[1] + (2.0 - .35 * L) * s];
    const rein = .35 * hop, hands = [sh[0] + 2.0 * s, sh[1] + (1.25 - rein) * s];
    W_([hip, kneeB, footB], .82, .7);                                                                  // the back leg
    W_([sh, [sh[0] + .75 * s, sh[1] + 1.6 * s], hands], .56, .5);                                     // the far arm
    paint(ribbon([[sh[0] + .05 * s, sh[1] - .2 * s], [(sh[0] + hip[0]) / 2 - .05 * s, (sh[1] + hip[1]) / 2], hip], 1.9 * s, 1.5 * s), { wash: col, ink: null });   // torso
    W_([hip, knee, foot], .82, .7);                                                                    // the raised knee
    W_([sh, [sh[0] + .95 * s, sh[1] + 1.5 * s], [hands[0] + .15 * s, hands[1] - .1 * s]], .58, .52);  // the near arm
    paint(ellPts(hands[0] + .3 * s, hands[1] - .08 * s, .5 * s, .46 * s, 12), { wash: col, ink: null });   // fists on the reins
    paint(ellPts(sh[0] + .4 * s, sh[1] - 1.5 * s, 1.08 * s, 1.08 * s, 16), { wash: col, ink: null });      // head
  }
  function pedSignal(x, y, t, green, k) {
    boilSeed('sig pole');
    paint(rectPts(x - 15, y + 250, 30, 868 - (y + 250)), { wash: '#5E646E', ink: PAL.ink, sw: .8 });
    paint(rectPts(x - 30, 852, 60, 18), { wash: '#4A4F58', ink: PAL.ink, sw: .6 });
    boilSeed('sig box');
    paint(rrPts(x - 150, y - 262, 300, 524, 26), { wash: '#2E3038', ink: PAL.ink, sw: 1.2 });
    const flip = t - kb(9), punch = flip > 0 ? Math.exp(-flip * 7) : 0;
    for (const [ly, lit, col, kind] of [[y - 126, !green, '#FF5A46', 'stand'], [y + 126, green, '#6CFF8E', 'gallop']]) {
      boilSeed('lamp ' + kind);
      paint(rrPts(x - 118, ly - 114, 236, 228, 20), { wash: lit ? mixCol(col, '#101116', .8) : '#15161C', ink: PAL.ink, sw: .8 });
      paint([[x - 134, ly - 124], [x + 134, ly - 124], [x + 118, ly - 94], [x - 118, ly - 94]], { wash: '#40434C', ink: PAL.ink, sw: .6 });   // the hood
      if (lit) glow(x, ly + 8, 175 + (kind === 'gallop' ? 120 * punch : 0), col, .55 + (kind === 'gallop' ? .45 * punch : 0));
      pedFigure(x, ly + 10, 172, lit ? mixCol(col, '#FFFFFF', .35) : mixCol(col, '#15161C', .84), kind, t);
      if (lit) glow(x, ly + 8, 70, col, .35);
    }
  }
  function crossingSet(t, green, k, hooks) {
    const [a, b, c, d] = viewRect2(300);
    boilSeed('cr sky');
    paint(rectPts(a, b, c - a, 760 - b), { wash: '#F7D8A6', ink: null });
    paint(ellPts((a + c) / 2, 60, (c - a) * .75, 330, 24), { fill: '#EFAE78', fillOp: 120, bleed: .25, tex: .4, ink: null });
    glow(2350, 150, 560, '#FFD08A', .55);
    for (let i = 0; i < CR_BLD.length; i++) {
      const [x, w, h] = CR_BLD[i]; if (!vis(x, x + w)) continue;
      const col = CR_COL[i % CR_COL.length], top = 730 - h;
      boilSeed('crb' + i);
      paint(rectPts(x, top, w, h), { wash: col, ink: mixCol(col, PAL.ink, .45), sw: .7 });
      paint(rectPts(x - 8, top - 16, w + 16, 18), { wash: mixCol(col, PAL.ink, .18), ink: mixCol(col, PAL.ink, .45), sw: .5 });   // cornice
      for (let wx = x + 28; wx < x + w - 40; wx += 64) paint(rectPts(wx, top + 34, 32, h - 110), { wash: hash(i * 3 + wx) > .72 ? '#FBE6B8' : mixCol('#9DAEC0', col, .35), ink: null });
      for (let fy = top + 90; fy < 700; fy += 72) inkLine([[x + 14, fy], [x + w - 14, fy]], 1.1, mixCol(col, PAL.ink, .12), 'inkfine', 0);
      if (i % 3 === 1) paint(rectPts(x + 30, 610, w - 60, 44), { wash: ['#E8704A', '#4AA0C8', '#6AB86A'][i % 3], ink: PAL.ink, sw: .6 });   // a blank shop sign
    }
    // the road, the pavements, the kerbs
    boilSeed('cr road');
    paint(rectPts(a, 722, c - a, d - 722), { wash: '#747884', fill: '#5C606C', fillOp: 70, bleed: .03, tex: .7, ink: null });
    boilSeed('cr pave');
    paint(rectPts(a, 722, CR.kerb - a, d - 722), { wash: '#DCD2C2', ink: null });
    paint(rectPts(CR.z1 + 60, 722, 2000, d - 722), { wash: '#DCD2C2', ink: null });
    for (const kx of [CR.kerb, CR.z1 + 60]) paint(rectPts(kx - 10, 722, 20, d - 722), { wash: '#B8AC9A', ink: PAL.ink, sw: .6 });
    for (let y = 760; y < d; y += 70) inkLine([[a, y], [CR.kerb - 12, y]], .5, '#B2A694', 'inkfine', 0);
    for (const lx of [1450, 2150]) for (const [y0, y1] of [[735, 810], [1000, 1080]]) { boilSeed('dash' + lx + y0); paint(rectPts(lx - 7, y0, 14, y1 - y0), { wash: '#F2E8C8', ink: null }); }
    for (let x = CR.z0; x < CR.z1; x += 140) if (vis(x, x + 90)) { boilSeed('zb' + x); paint([[x, 850], [x + 84, 850], [x + 90, 982], [x + 6, 982]], { wash: '#F5F1E4', ink: mixCol('#F5F1E4', PAL.ink, .25), sw: .5 }); }
    pedSignal(CR.poleX, CR.boxY, t, green, k);
    if (hooks.mid) hooks.mid();
  }
  function shotCrossing(t, lt, dur) {
    const k = kOf(t) - 8, green = k >= 1;
    const wk = easeIn(seg(k, 3.54, 4)), trk = ease(seg(k, 1.85, 4)), flip = t - kb(9), punch = flip > 0 ? .035 * Math.exp(-flip * 6) : 0;
    const cx = 735 + 420 * trk + 2600 * wk, cy = 548 + 20 * trk, z = .96 + .03 * ease(seg(k, 0, 1.8)) + punch - .06 * trk;
    camBegin(cx, cy, z);
    crossingSet(t, green, k, { mid: () => {
      [...PEDS.keys()].sort((p, q) => PEDS[p][3] - PEDS[q][3]).forEach(i => {
        const [name, O, x0, y, u, ks] = PEDS[i], hs = handsOf(name, O), cv = crowdVar(i + 20);
        const tau = t - kb(8 + ks), V = 640, dist = tau <= 0 ? 0 : tau < .25 ? V * tau * tau / .5 : V * (tau - .125);
        if (!vis(x0 + dist - 200, x0 + dist + 200)) return;
        const wait = { aL: -.6 + .05 * Math.sin(t * 2.1 + i), aR: -.62, armLen: .95, dy: 0, sq: .02 * pulse(t, 4), legSplay: .15, legLift: [0, 0, 0, 0], rot: 0, dx: 0 };
        const gal = dance('gallop', t, { ...cv, hand: hs.hand, sleeve: hs.sleeve });
        const pose = tau <= 0 ? wait : tau < .12 ? _lerpPose(wait, gal, ease(tau / .12)) : gal;
        const tk = take(t, kb(9.1 + .06 * i), .6); pose.sq = (pose.sq || 0) + tk.sq; pose.dy = (pose.dy || 0) + tk.dy;
        const lx = clamp((CR.poleX - x0) / 260, -.9, .9);
        const M = mood(name, t, [[kb(6), 'bored', { lookY: -1, lookX: lx }], [kb(9.08 + .06 * i), 'surprised', { lookY: -1, lookX: lx, emote: i === 3 ? '!' : null }], [kb(8 + ks), 'excited', { emote: null }]], { v: O.v });
        member(name, x0 + dist, y, u, { ...O, ...faceOf(M), ...pose, noShadow: y < 900, boilKey: 'P' + i });
      });
    } });
    camEnd();
    counterHUD(t);
    streaks(wk, false, 11, [PAL.cream, '#F7D8A6', '#FFFFFF', '#E8C9A0']);
  }

  // ======================================================================================================
  // C + F: THE SQUARE (sunset, then dusk)
  // ======================================================================================================
  const SQ = { stX: 760, stTop: 540, hoX: 1540, hoTop: 604, hoS: 12, stU: 20 };
  const BRZ = { col: '#94703F', dk: '#5E4424', lt: '#C9A266', leg: '#7A5B31', legFar: '#56401F', arm: '#86653A', hair: '#4A3620', band: '#8A6A3C', patina: '#6FA590' };
  const SQ_BLD = [[-700, 420, 420], [-260, 300, 560], [60, 380, 360], [470, 330, 520], [830, 440, 400], [1300, 300, 600], [1630, 420, 380], [2080, 340, 540], [2450, 400, 430], [2880, 320, 500]];
  // the bronze Oppa (member() with a bronze patina; his own silhouette, hair and shades)
  function statue(x, y, u, pose, t, o = {}) {
    member('oppa', x, y, u, { look: 'white', col: BRZ.col, dk: BRZ.dk, lt: BRZ.lt, legCol: BRZ.leg, legFar: BRZ.legFar, armCol: BRZ.arm, sleeve: .82,
      outfit: (uu, sw, V, J) => { band(uu, V, J, -4.1, -2.02, BRZ.band); },
      noHair: true, head: (uu, sw, V) => HAIRS.slick(uu, sw, V, { base: BRZ.hair, ink: PAL.ink }),
      eyes: 'normal', mouth: o.mouth ?? null, noShadow: true, ...pose, boilKey: o.key || 'statue',
      draw: (uu, sw) => { for (let j = 0; j < 3; j++) paint(rectPts((-3.6 + j * 3.1) * uu, -8 * uu, .7 * uu, (2.2 + j * .6) * uu), { wash: BRZ.patina, washOp: 75, ink: null }); } });
  }
  const statueFrozen = () => ({ aR: .82, armLen: { R: 1.35, L: .72 }, armR: fistHook(BRZ.col, .7), aL: -.55, armL: bentHook(1.83, 1.85, BRZ.arm, BRZ.col), frontArm: 'L',
    legLift: [.42, .3, 0, 0], legSplay: .5, rot: -.07, dx: -.25, dy: 0, sq: 0 });
  function plinth(x, top, w, eve, key) {
    const g = mixCol('#B5AAA6', '#6E6878', eve), gd = mixCol(g, PAL.ink, .25), gl = mixCol(g, '#FFFFFF', .2);
    boilSeed('plinth ' + key);
    paint(rectPts(x - w / 2 - 22, 800, w + 44, 22), { wash: gd, ink: PAL.ink, sw: .7 });
    paint(rectPts(x - w / 2, top + 22, w, 800 - top - 22), { wash: g, fill: gd, fillOp: 60, bleed: .03, tex: .6, ink: PAL.ink, sw: .9 });
    paint(rectPts(x - w / 2 - 16, top, w + 32, 24), { wash: gl, ink: PAL.ink, sw: .7 });
    paint(rectPts(x - w * .22, top + (800 - top) * .42, w * .44, (800 - top) * .24), { wash: mixCol(BRZ.col, g, .3), ink: PAL.ink, sw: .6 });   // a blank plaque
  }
  function squareSet(t, eve, hooks) {
    const [a, b, c, d] = viewRect2(300);
    boilSeed('sq sky');
    paint(rectPts(a, b, c - a, 830 - b), { wash: mixCol('#F6C99C', '#8E78AC', eve), ink: null });
    paint(ellPts((a + c) / 2, 60, (c - a) * .8, 420, 24), { fill: mixCol('#EE9677', '#46427E', eve), fillOp: 140, bleed: .25, tex: .4, ink: null });
    paint(ellPts((a + c) / 2, 800, (c - a) * .7, 200, 24), { fill: mixCol('#FBE0B0', '#F29A6A', eve), fillOp: 120, bleed: .3, tex: .3, ink: null });
    if (eve < .5) { boilSeed('sq sun'); glow(2150, 640, 520, '#FFC478', .7); paint(ellPts(2150, 660, 120, 120, 30), { wash: '#FFE6B0', ink: null }); }
    else for (let i = 0; i < 26; i++) { const sx = a + (c - a) * hash(i * 3.3 + 1), sy = b + (500 - b) * hash(i * 5.1 + 2); boilSeed('sqstar' + i); paint(starPts(sx, sy, 5 + 5 * hash(i), .35, 4), { wash: '#FFF5E2', washOp: 200, ink: null }); }
    for (let i = 0; i < SQ_BLD.length; i++) {
      const [x, w, h] = SQ_BLD[i]; if (!vis(x, x + w)) continue;
      const col = mixCol(['#C98C86', '#B97E84', '#D39C8A', '#BF8890'][i % 4], ['#564A78', '#4A406C', '#5E5282', '#50466E'][i % 4], eve), top = 800 - h;
      boilSeed('sqb' + i);
      paint(rectPts(x, top, w, h), { wash: col, ink: mixCol(col, PAL.ink, .5), sw: .7 });
      for (let wy = top + 40; wy < 740; wy += 62) for (let wx = x + 26; wx < x + w - 40; wx += 58) {
        const lit = hash(i * 13.1 + wx * .7 + wy * .3) > (eve > .5 ? .42 : .82);
        if (!lit && eve > .5) continue;
        paint(rectPts(wx, wy, 26, 34), { wash: lit ? '#FFD98A' : mixCol(col, '#FFFFFF', .22), ink: null });
      }
    }
    if (eve > .5) for (let i = 0; i < SQ_BLD.length; i++) { const [x, w, h] = SQ_BLD[i]; if (vis(x, x + w)) glow(x + w / 2, 800 - h * .5, w * .7, '#FFC870', .22); }
    // the plaza
    boilSeed('sq floor');
    const fl = mixCol('#D8BEA2', '#857890', eve);
    paint(rectPts(a, 800, c - a, d - 800), { wash: fl, fill: mixCol(fl, PAL.ink, .2), fillOp: 70, bleed: .03, tex: .7, ink: null });
    for (const [y, sp] of [[836, 150], [884, 180], [950, 220], [1040, 270], [1160, 330]]) {
      inkLine([[a, y], [c, y]], .8, mixCol(fl, PAL.ink, .3), 'inkfine', 0);
      for (let x = Math.floor(a / sp) * sp + (y % 2 ? sp / 2 : 0); x < c; x += sp) inkLine([[x, y], [x + 4, y + (y < 900 ? 44 : 80)]], .6, mixCol(fl, PAL.ink, .25), 'inkfine', 0);
    }
    if (hooks.back) hooks.back();
    plinth(SQ.stX, SQ.stTop, 290, eve, 'st');
    plinth(SQ.hoX, SQ.hoTop, 440, eve, 'ho');
    if (hooks.plinths) hooks.plinths();
    if (hooks.mid) hooks.mid();
  }
  // a pigeon: (x, y) = its feet; s ~ 1/3 of its body length. o: flip (faces left), fly (0..1 wings out), flap
  // (phase), wingsUp (0..1: the V), bob (head forward 0..1), sq, key
  function pigeon(x, y, s, o = {}) {
    const f = o.flip ? -1 : 1, sw = clamp(s / 14, .4, 1.2), fly = clamp(o.fly || 0), wu = clamp(o.wingsUp || 0), sq = o.sq || 0;
    boilSeed('pigeon ' + (o.key || Math.round(x)));
    push(); translate(x, y); scale(f * (1 + sq * .5), 1 - sq); if (o.rot) rotate(o.rot);
    const wing = (near) => {   // a wing hinged at the shoulder; up = the V, fly = flapping
      const flapA = fly * Math.sin((o.flap || 0) * TAU) * 1.1, up = wu * (near ? 1.25 : 1.6) + (fly ? .3 + flapA : 0);
      push(); translate(-.2 * s, -1.75 * s); rotate(-up * (near ? 1 : .8) - (near ? 0 : .25));
      paint([[.2 * s, -.35 * s], [-1.1 * s, -.55 * s], [-2.7 * s, -.1 * s], [-2.4 * s, .35 * s], [-.9 * s, .5 * s], [.35 * s, .35 * s]], { wash: near ? '#A3AABB' : '#7E8598', ink: PAL.ink, sw: sw * .7, curv: .3 });
      if (near) { inkLine([[-.8 * s, -.1 * s], [-1.3 * s, .35 * s]], sw * 1.3, '#4E5466', 'inkfine', 0); inkLine([[-1.35 * s, -.15 * s], [-1.85 * s, .3 * s]], sw * 1.3, '#4E5466', 'inkfine', 0); }
      pop();
    };
    if (fly || wu) wing(false);
    if (!fly) for (const lx of [-.3, .3]) inkLine([[lx * s, -.7 * s], [lx * s + .1 * s, 0]], sw * 1.1, '#E07A7A', 'ink', 0);   // legs
    paint([[-1.1 * s, -1.6 * s], [-2.6 * s, -1.25 * s], [-2.55 * s, -.8 * s], [-1.05 * s, -1.05 * s]], { wash: '#5E6578', ink: PAL.ink, sw: sw * .7 });   // tail
    paint(ellPts(0, -1.3 * s, 1.5 * s, .95 * s, 16, 0, -.12), { wash: '#98A0B2', ink: PAL.ink, sw: sw * .8 });   // body
    const hx = 1.05 * s + .45 * s * (o.bob || 0), hy = -2.35 * s + .2 * s * (o.bob || 0);
    paint(ellPts(hx - .35 * s, hy + .55 * s, .6 * s, .75 * s, 12), { wash: '#6E9C8C', ink: null });              // the green-purple neck
    paint(ellPts(hx - .45 * s, hy + .75 * s, .45 * s, .35 * s, 10), { wash: '#9C82B4', ink: null });
    paint(ellPts(hx, hy, .62 * s, .58 * s, 12), { wash: '#858CA2', ink: PAL.ink, sw: sw * .7 });                  // head
    paint([[hx + .5 * s, hy - .1 * s], [hx + 1.1 * s, hy + .12 * s], [hx + .5 * s, hy + .24 * s]], { wash: '#E2D8C6', ink: PAL.ink, sw: sw * .5 });   // beak
    paint(ellPts(hx + .18 * s, hy - .12 * s, .17 * s, .17 * s, 8), { wash: '#F09A3A', ink: null });
    paint(ellPts(hx + .21 * s, hy - .12 * s, .07 * s, .08 * s, 6), { wash: PAL.ink, ink: null });
    if (!fly && !wu) { paint([[.6 * s, -1.75 * s], [-.9 * s, -1.9 * s], [-1.9 * s, -1.35 * s], [-.6 * s, -.95 * s]], { wash: '#A3AABB', ink: PAL.ink, sw: sw * .6, curv: .3 }); inkLine([[-.5 * s, -1.7 * s], [-.9 * s, -1.2 * s]], sw * 1.2, '#4E5466', 'inkfine', 0); inkLine([[-1 * s, -1.7 * s], [-1.4 * s, -1.25 * s]], sw * 1.2, '#4E5466', 'inkfine', 0); }
    else wing(true);
    pop();
  }
  // the Horse's poll (top of its head, behind the ear) in world space, for a pigeon to stand on
  const pollOf = (x, y, s, flip) => [x + (flip ? -1 : 1) * 7.9 * s, y - 17.95 * s];

  // ---------- C: the square at sunset ----------
  function shotSquare(t, lt, dur) {
    const k = kOf(t) - 12;
    // the statue: frozen until k 1, then the lasso
    const fz = statueFrozen(), las = dance('lasso', t, { side: 1, hand: BRZ.col, sleeve: BRZ.arm });
    const sp = k < 1 ? fz : k < 1.25 ? _lerpPose(fz, las, easeOut((k - 1) / .25)) : las;
    const wake = t - kb(13), [wx] = wake > 0 && wake < .5 ? shakeXY(t, 5 * (1 - wake / .5)) : [0];
    const stPose = { ...sp, dx: (sp.dx || 0) + wx / SQ.stU };
    const tip = armTip(SQ.stX, SQ.stTop, SQ.stU, { ...fz, sx: 1.12, sy: .94 }), perch0 = [tip[0] + 4, tip[1] - 9];
    const poll = pollOf(SQ.hoX, SQ.hoTop, SQ.hoS, true), perch1 = [poll[0] + 6, poll[1] + 2];
    const fk = seg(k, 1.05, 3.1), flying = k >= 1.05 && k < 3.1;
    const pq = easeOut(fk * .35 + .65 * ease(fk)), pp = k < 1.05 ? perch0 : k < 3.1 ? arcPt(perch0, perch1, 190, pq) : perch1;
    const landSq = k >= 3.1 ? .3 * Math.exp(-(t - kb(15.1)) * 9) * Math.cos((t - kb(15.1)) * 20) : 0;
    // camera: land from the whip, then follow the pigeon right to the Horse; pull up and away at the end
    const land = easeOut(seg(k, 0, .46)), fol = ease(seg(k, 1.0, 3.2)), up = easeIn(seg(k, 3.45, 4));
    const cx = lerp(925, 1335, fol) - (1 - land) * 2400, cy = lerp(582, 600, fol) - 300 * up, z = lerp(1.6, 1.66, fol) * lerp(1, .45, up);
    camBegin(cx, cy, z);
    squareSet(t, 0, {
      plinths: () => {
        statue(SQ.stX, SQ.stTop, SQ.stU, stPose, t, { mouth: k < 1 ? null : 'grin' });
        horse(SQ.hoX, SQ.hoTop, SQ.hoS, t, { flip: true, mood: 'deadpan', blink: blinkAt(kb(15.5)), boilKey: 'sq horse' });
        pigeon(pp[0], pp[1], 12, { flip: flying ? pp[0] > perch1[0] : k >= 3.1, fly: flying ? 1 : 0, flap: t * 7, sq: landSq, key: 'hero', rot: flying ? -.15 : 0 });
        if (wake > 0 && wake < .6) for (let j = 0; j < 7; j++) { boilSeed('wakedust' + j); const q = wake / .6, ang = -Math.PI / 2 + (j - 3) * .42; paint(ellPts(SQ.stX + Math.cos(ang) * (60 + 170 * q), SQ.stTop - 110 + Math.sin(ang) * (40 + 130 * q), 9 * (1 - q) + 3, 7 * (1 - q) + 2, 8), { wash: '#C9A266', washOp: 230 * (1 - q), ink: null }); }
      },
      mid: () => {
        [[1060, 862, 0], [1190, 884, 1.3], [940, 900, 2.1], [2020, 870, .7]].forEach(([x, y, ph], j) => pigeon(x, y, 9, { flip: j % 2 === 1, bob: pulse(t + ph * .1, 7), key: 'gp' + j }));
      }
    });
    camEnd();
    counterHUD(t);
    if (lt > dur - .3) cloudCover((lt - (dur - .3)) / .6);
  }

  // ======================================================================================================
  // D: THE GLOBE
  // ======================================================================================================
  const GR = 330;
  // painted continents (unit disc, y down), roughly Earth-like: [colour, points]
  const LAND = '#86C060', SAND = '#D9C27E', ICE = '#F1F4F0';
  const CONT = [
    [LAND, [[-.55, -.45], [-.45, -.62], [-.25, -.7], [-.05, -.78], [.2, -.82], [.45, -.78], [.65, -.62], [.8, -.42], [.86, -.2], [.78, -.05], [.66, .0], [.58, -.14], [.5, .04], [.38, .12], [.25, .08], [.12, .14], [.02, .05], [-.1, .02], [-.2, -.08], [-.32, -.12], [-.42, -.2], [-.5, -.3]]],
    [LAND, [[.55, -.16], [.62, -.15], [.64, -.05], [.6, .03], [.56, -.04]]],                              // Korea
    [LAND, [[.71, -.23], [.75, -.14], [.73, -.02], [.69, .03], [.68, -.1]]],                              // Japan
    [LAND, [[-.42, -.02], [-.25, 0], [-.12, .08], [-.05, .22], [-.08, .4], [-.15, .58], [-.25, .7], [-.33, .62], [-.38, .45], [-.48, .3], [-.58, .18], [-.55, .05]]],   // Africa
    [SAND, [[-.45, .02], [-.2, .03], [-.15, .12], [-.3, .16], [-.48, .14]]],                             // the Sahara
    [SAND, [[.02, .1], [.15, .16], [.22, .3], [.15, .38], [.07, .26]]],                                   // Arabia
    [LAND, [[.25, .12], [.36, .14], [.33, .32], [.27, .37], [.22, .22]]],                                 // India
    [LAND, [[.42, .24], [.53, .27], [.51, .34], [.4, .3]]],
    [SAND, [[.45, .45], [.62, .42], [.73, .5], [.7, .63], [.55, .67], [.45, .58]]],                       // Australia
    [LAND, [[-.9, .1], [-.75, .15], [-.71, .3], [-.78, .5], [-.86, .56], [-.93, .4], [-.96, .25]]],       // South America
    [LAND, [[-.96, -.3], [-.82, -.46], [-.66, -.56], [-.7, -.36], [-.8, -.2], [-.93, -.1]]],              // North America
    [ICE, [[-.3, -.93], [0, -.99], [.3, -.93], [.2, -.86], [-.1, -.88]]],                                  // the Arctic
    [ICE, [[-.55, .82], [-.2, .97], [.2, .97], [.55, .82], [.3, .86], [0, .9], [-.3, .87]]]               // Antarctica
  ];
  const KOREA = [.6, -.06], PHI_K = Math.atan2(KOREA[0], -KOREA[1]);    // Korea's bearing from the top, clockwise
  // the crown: 12 dancers round the rim, in popping order (n = 0 at Korea is the Kid, who started it all)
  const CROWN = [['kid', {}], ['commuter', { v: 0 }], ['dancer', { v: 0 }], ['crowd', { v: 4 }], ['commuter', { v: 4 }], ['dancer', { v: 2 }],
    ['crowd', { v: 3 }], ['commuter', { v: 6 }], ['crowd', { v: 11 }], ['dancer', { v: 3 }], ['crowd', { v: 2 }], ['commuter', { v: 10 }]];
  const CROWN_N = [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6];               // rim slots (30 degrees apart), in popping order
  const CROWN_START = 16.42, CROWN_STEP = .5;                             // beats: the Kid, then one each way on every eighth
  const earthRot = t => -.32 * (t - barT(93));
  function earthDisc(t, rot) {
    boilSeed('atmo'); glow(0, 0, GR * 1.5, '#5CC0FF', .5);
    boilSeed('ocean'); paint(ellPts(0, 0, GR, GR, 52), { wash: '#3F86CE', fill: '#2C66AC', fillOp: 60, bleed: .05, tex: .5, ink: PAL.ink, sw: 1.3 });
    push(); rotate(rot);
    CONT.forEach(([col, pts], i) => { boilSeed('cont' + i); paint(pts.map(([x, y]) => [x * GR, y * GR]), { wash: col, ink: mixCol(col, PAL.ink, .45), sw: .7, curv: .45 }); });
    for (let i = 0; i < 5; i++) {   // cloud wisps
      boilSeed('gcl' + i); const a = i * 1.3 + .4, r = GR * (.35 + .45 * hash(i * 2.2));
      inkLine([[Math.cos(a) * r - 40, Math.sin(a) * r], [Math.cos(a) * r, Math.sin(a) * r - 8], [Math.cos(a) * r + 50, Math.sin(a) * r + 4]], 3.2, '#F6FAFC', 'dry', .6);
    }
    pop();
    boilSeed('gshade'); paint(ellPts(GR * .42, GR * .38, GR * .95, GR * .9, 32), { fill: '#0E1A40', fillOp: 110, bleed: .12, tex: .4, ink: null });
    boilSeed('ghi'); paint(ellPts(-GR * .38, -GR * .4, GR * .35, GR * .22, 20, 0, -.6), { wash: '#FFFFFF', washOp: 70, ink: null });
    boilSeed('grim'); brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', PAL.ink, 1.3); brush.beginShape(0); for (const p of ellPts(0, 0, GR, GR, 52)) brush.vertex(p[0], p[1]); brush.endShape(true);
  }
  function crown(t, rot, uMax, all = false) {
    const [va, vb, vc, vd] = viewRect2(0);
    CROWN_N.forEach((n, j) => {
      const tp = kb(CROWN_START + Math.abs(n) * CROWN_STEP), age = t - tp;
      if (!all && age < 0) return;
      const phi = PHI_K + n * TAU / 12, ang = rot + phi, px = Math.sin(ang) * (GR + 60), py = -Math.cos(ang) * (GR + 60);
      if (px < va - 140 || px > vc + 140 || py < vb - 140 || py > vd + 140) return;          // off screen
      const q = all ? 1 : backOut(seg(age, 0, .17)), u = uMax * (n === 0 ? .82 : 1) * q; if (u < .8) return;
      const [name, O] = CROWN[j], cv = crowdVar(j + 40), hs = handsOf(name, O);
      push(); rotate(ang);
      const pose = dance(j % 4 === 2 ? 'gallop' : 'lasso', t, { ...cv, side: j % 3 === 1 ? -1 : 1, hand: hs.hand, sleeve: hs.sleeve });
      const m = mfeel(name, j % 2 ? 'excited' : 'happy', t, { v: O.v });
      member(name, 0, -GR + 2, u, { ...O, eyes: m.eyes, mouth: m.mouth, blush: 0, ...pose, noShadow: true, boilKey: 'crown' + j });
      if (!all && age < .55) for (let c = 0; c < 9; c++) {   // a burst of confetti
        const cq = easeOut(age / .55), ca = -Math.PI / 2 + (c - 4) * .36 + (hash(c + j) - .5) * .3, cr = 24 + 120 * cq * (.7 + .5 * hash(c * 3 + j));
        boilSeed('cf' + j + '_' + c);
        push(); translate(Math.cos(ca) * cr, -GR - 40 + Math.sin(ca) * cr * .9 + 40 * cq * cq); rotate(c + age * 9);
        paint(rectPts(-6, -10, 12, 20), { wash: ['#FF6A8A', '#FFD34A', '#6AE0FF', '#9CFF7A', '#FFF5E2', '#C98AFF', '#FF9A4A', '#FF6A8A', '#6AE0FF'][c], washOp: 255 * (1 - cq * .7), ink: null });
        pop();
      }
      pop();
    });
  }
  const mfeelFace = (name, emo, t, v) => { const m = mfeel(name, emo, t, { v }); return { eyes: m.eyes, mouth: m.mouth, blush: m.blush }; };
  function starField(t, seed, n, box, twK = 1) {
    for (let i = 0; i < n; i++) {
      const x = lerp(box[0], box[2], hash(i * 3.3 + seed)), y = lerp(box[1], box[3], hash(i * 7.1 + seed)), r = 3 + 8 * hash(i * 1.9 + seed) ** 2;
      const tw = hash(i * 5.5 + seed) > .6 ? 1 + .9 * twK * pulse(t + hash(i) * BEAT * 2, 5) : 1;
      boilSeed('star' + seed + '_' + i);
      paint(starPts(x, y, r * tw, .32, 4), { wash: i % 7 ? '#FFF5E2' : '#FFE08A', ink: null });
    }
  }
  function spaceBG(seed) {
    const [a, b, c, d] = viewRect2(400);
    boilSeed('space ' + seed);
    paint(rectPts(a, b, c - a, d - b), { wash: '#171B40', ink: null });
    paint(ellPts((a + c) / 2 - 200, (b + d) / 2 + 100, (c - a) * .6, (d - b) * .35, 24, 0, -.3), { fill: '#2C2A6A', fillOp: 90, bleed: .3, tex: .5, ink: null });
    return [a, b, c, d];
  }
  function shotGlobe(t, lt, dur) {
    const k = kOf(t) - 16, rot = earthRot(t);
    const zin = Math.exp(lerp(Math.log(4.2), 0, easeOut(seg(k, 0, .95))));            // out of the clouds
    const z = zin * lerp(1, .9, ease(seg(k, 1, 3.3))) * lerp(1, .6, ease(seg(k, 3.3, 4)));
    const kx = Math.sin(PHI_K + rot) * GR, ky = -Math.cos(PHI_K + rot) * GR, fz = easeOut(seg(k, 0, .95));
    camBegin(lerp(kx, 0, fz), lerp(ky, 0, fz), z);
    const box = spaceBG('g');
    starField(t, 3, 70, box);
    earthDisc(t, rot);
    const sp = t - kb(16.2);   // the spark at Korea
    if (sp > 0 && sp < .9) { const x = Math.sin(PHI_K + rot) * GR * .98, y = -Math.cos(PHI_K + rot) * GR * .98; boilSeed('ksp'); glow(x, y, 120 * (1 - sp / .9) + 30, '#FFE68A', 1); paint(starPts(x, y, 44 * backOut(seg(sp, 0, .2)) * (1 - sp / .9), .3, 4, sp * 4), { wash: '#FFF4C8', ink: PAL.ink, sw: .6 }); }
    crown(t, rot, 12);
    camEnd();
    counterHUD(t);
    if (lt < .3) cloudCover(.5 + lt / .6);
  }

  // ======================================================================================================
  // E: SPACE, THE MOON
  // ======================================================================================================
  const MOON = { x: 2600, y: 10, R: 560 };
  const CRATERS = [[-.62, -.5, .14], [.2, -.74, .1], [.66, -.42, .12], [-.82, .1, .1], [.8, .18, .12], [-.52, .64, .11], [.5, .66, .09], [-.2, -.82, .07]];
  function moonDancer(x, y, R, t) {
    const P = dance('gallop', t, {}), u = R / 5, sw = 2.2;
    const dy = P.dy * u * .8, sq = P.sq * 1.5, rot = P.rot * 1.6, dx = P.dx * u * .5, L = P.legLift || [0, 0, 0, 0];
    const { f, bp } = _bt(t), hop = Math.sin(Math.PI * f), land = spring(t, OFF + Math.floor(bp) * BEAT, 8, 26);
    boilSeed('moon glow'); glow(x + dx, y + dy, R * 1.7, '#FFF0C0', .45);
    push(); translate(x + dx, y + dy); rotate(rot); scale(1 + sq * .5, 1 - sq);
    [-2.5, -.9, .9, 2.5].forEach((lx, j) => {                                              // four stubby Clawd legs
      const bx = lx * u, edge = Math.sqrt(Math.max(0, R * R - bx * bx)), len = (1.55 - 1.05 * clamp(L[j])) * u;
      boilSeed('moonleg' + j);
      paint(rectPts(bx - .55 * u, edge - .9 * u, 1.1 * u, .9 * u + len, u * .04), { wash: j === 0 || j === 3 ? '#B7A06A' : '#C4AE78', ink: PAL.ink, sw: sw * .8 });
    });
    boilSeed('moon disc');
    paint(ellPts(0, 0, R, R, 48, u * .02), { wash: '#F3E4B4', ink: PAL.ink, sw: sw * 1.2 });
    paint(ellPts(R * .32, R * .34, R * .8, R * .74, 28), { fill: '#D2BC82', fillOp: 110, bleed: .12, tex: .6, ink: null });
    paint(ellPts(-R * .36, -R * .4, R * .4, R * .28, 20, 0, -.5), { fill: '#FFF9E0', fillOp: 120, bleed: .1, tex: .5, ink: null });
    CRATERS.forEach(([cx, cy, r], j) => {                                                   // craters, bouncing on each landing
      const jig = land * (.6 + .8 * hash(j * 3.3)) * .06 * R;
      boilSeed('crater' + j);
      const rx = r * R * (1 + .15 * land), ry = r * R * .82 * (1 - .15 * land), cy_ = cy * R - jig;
      paint(ellPts(cx * R, cy_, rx, ry, 16), { wash: '#D6C088', ink: mixCol('#BCA56C', PAL.ink, .35), sw: sw * .6 });
      paint(ellPts(cx * R + rx * .12, cy_ + ry * .16, rx * .78, ry * .7, 14), { wash: '#C4AC72', ink: null });
    });
    boilSeed('moon face');
    const fu = u * .95;
    for (const s of [-1, 1]) { push(); translate(s * 1.6 * u, -.9 * u); eye('happy', s, fu, {}, sw * 1.1); pop(); }
    for (const s of [-1, 1]) paint(ellPts(s * 2.75 * u, .35 * u, .9 * u, .45 * u, 14), { fill: PAL.rose, fillOp: 150, bleed: .2, ink: null });
    push(); translate(0, 4.2 * fu + 1.0 * u); mouth(fu, 'laugh', sw * 1.1); pop();
    const rein = .3 * hop;
    for (const s of [-1, 1]) {                                                              // arms on the reins
      boilSeed('moon arm' + s);
      const shd = [s * R * .95, R * .08], fist = [s * .6 * u, R * .5 - rein * u];
      paint(ribbon([shd, [s * R * .62, R * .42], fist], 1.3 * u, 1.1 * u), { wash: '#E4D199', ink: PAL.ink, sw: sw * .8 });
      paint(ellPts(fist[0] + s * .1 * u, fist[1], .78 * u, .72 * u, 12), { wash: '#EEDCA6', ink: PAL.ink, sw: sw * .8 });
    }
    pop();
  }
  function satellite(x, y, s, t, o = {}) {
    const P = dance('gallop', t, { ph: o.ph || 0 }), { f } = _bt(t, o.ph || 0), hop = Math.sin(Math.PI * f), L = P.legLift || [0, 0, 0, 0], sw = 1.2;
    push(); translate(x + P.dx * s * .3, y + P.dy * s * .9); rotate((o.rot || 0) + P.rot * 2.5);
    boilSeed('sat legs' + o.key);
    for (const [j, lx] of [[0, -.5], [3, .5]]) { const len = (1.5 - 1 * clamp(L[j])) * s; inkLine([[lx * s, .9 * s], [lx * s * 1.4, .9 * s + len]], sw * 1.6, '#8A8E98', 'ink', 0); paint(ellPts(lx * s * 1.4, .9 * s + len, .35 * s, .16 * s, 8), { wash: '#B8BCC6', ink: PAL.ink, sw: sw * .5 }); }
    const fl = .5 * hop;
    for (const sd of [-1, 1]) {
      boilSeed('sat panel' + o.key + sd);
      push(); translate(sd * 1.0 * s, 0); rotate(sd * -fl);
      inkLine([[0, 0], [sd * .5 * s, 0]], sw * 1.4, '#9A9EA8', 'ink', 0);
      const x0 = sd > 0 ? .5 * s : -3.7 * s;
      paint(rectPts(x0, -.62 * s, 3.2 * s, 1.24 * s), { wash: '#3C5CAA', fill: '#2A4488', fillOp: 60, ink: PAL.ink, sw: sw * .7 });
      for (let g = 1; g < 4; g++) inkLine([[x0 + g * .8 * s, -.6 * s], [x0 + g * .8 * s, .6 * s]], sw * .5, '#8AB0E8', 'inkfine', 0);
      inkLine([[x0 + .05 * s, 0], [x0 + 3.15 * s, 0]], sw * .5, '#8AB0E8', 'inkfine', 0);
      pop();
    }
    boilSeed('sat body' + o.key);
    paint(rrPts(-1.0 * s, -1.0 * s, 2 * s, 2 * s, .28 * s), { wash: '#E6B84E', fill: '#B8882A', fillOp: 70, tex: .6, ink: PAL.ink, sw: sw * .9 });
    for (let c = 0; c < 3; c++) inkLine([[-.8 * s, (-.5 + c * .45) * s], [.8 * s, (-.4 + c * .45) * s]], sw * .5, '#FFE7A0', 'inkfine', .5);
    inkLine([[.3 * s, -1 * s], [.6 * s, -1.9 * s]], sw * 1.2, '#9A9EA8', 'ink', 0);
    paint(ellPts(.62 * s, -1.95 * s, .5 * s, .22 * s, 10, 0, -.4), { wash: '#E8ECF0', ink: PAL.ink, sw: sw * .6 });
    for (const ex of [-.38, .38]) paint(rectPts(ex * s - .1 * s, -.28 * s, .2 * s, .42 * s), { wash: PAL.ink, ink: null });   // little eyes
    pop();
  }
  function shotSpace(t, lt, dur) {
    const k = kOf(t) - 20, rot = earthRot(t);
    const pan = ease(seg(k, .1, 1.25)), wk = easeIn(seg(k, 3.54, 4));
    const cx = lerp(0, 2520, pan), cy = lerp(0, -10, pan) + 3400 * wk, z = lerp(.54, .47, ease(seg(k, 0, 1.25)));
    camBegin(cx, cy, z);
    const box = spaceBG('s');
    starField(t, 7, 110, box);
    if (vis(-GR - 260, GR + 260)) { earthDisc(t, rot); crown(t, rot, 12, true); }
    satellite(1700, -560, 80, t, { ph: .1, key: 'a', rot: .2 });
    satellite(3430, -380, 72, t, { ph: .35, key: 'b', rot: -.25 });
    satellite(3240, 700, 66, t, { ph: .6, key: 'c', rot: .1 });
    moonDancer(MOON.x, MOON.y, MOON.R, t);
    camEnd();
    counterHUD(t);
    streaks(wk, true, 23, [PAL.cream, '#FFE08A', '#9AB0FF']);
  }

  // ======================================================================================================
  // F: THE FINISH, the square at dusk, packed
  // ======================================================================================================
  const FIN = [   // name, opts, x, y, u, back (no shadow)
    ['commuter', { v: 6 }, 240, 888, 13, 1], ['dancer', { v: 0 }, 480, 884, 13, 1], ['crowd', { v: 4 }, 985, 890, 13, 1], ['commuter', { v: 0 }, 1265, 886, 13, 1],
    ['crowd', { v: 10 }, 1805, 889, 13, 1], ['dancer', { v: 2 }, 2045, 885, 13, 1],
    ['crowd', { v: 3 }, 370, 972, 16, 1], ['granny', { v: 2 }, 650, 976, 16, 1], ['crowd', { v: 11 }, 1610, 974, 16, 1], ['commuter', { v: 4 }, 1890, 970, 16, 1],
    ['dancer', { v: 3 }, 805, 1062, 19, 0], ['crowd', { v: 9 }, 1765, 1066, 19, 0], ['pop', {}, 1445, 1070, 20, 0], ['oppa', { look: 'white' }, 1128, 1098, 25, 0]];
  const FKEYS = [[barT(95), 'lasso'], [barT(96), 'vArms']];
  function stringLights(t, a, c) {
    for (const [y0, sag, sh] of [[330, 70, 0], [430, 60, 1]]) {
      boilSeed('wire' + sh); const P = []; for (let x = Math.floor(a / 120) * 120 - 120; x <= c + 120; x += 60) P.push([x, y0 + sag * (.5 + .5 * Math.cos((x + sh * 300) / 600 * Math.PI))]);
      inkLine(P, .8, '#3A3048', 'inkfine', .4);
      P.forEach(([x, y], j) => { if (j % 2) return; const col = ['#FFD86A', '#FF8A8A', '#8AE0FF', '#B8FF8A'][(j / 2 + sh) % 4]; const on = .7 + .3 * pulse(t + j * .07, 4); glow(x, y + 10, 34, col, .8 * on); boilSeed('bulb' + sh + j); paint(ellPts(x, y + 10, 7, 9, 8), { wash: mixCol(col, '#FFFFFF', .3), ink: PAL.ink, sw: .4 }); });
    }
  }
  function shotFinish(t, lt, dur) {
    const k = kOf(t) - 24;
    const land = easeOut(seg(k, 0, .5)), lift = ease(seg(k, 4, 6.2));
    const cx = 1150, cy = 768 - (1 - land) * 1700 + 32 * lift, z = 1.0 + .04 * ease(seg(k, .5, 4)) + .1 * lift;
    const b = t - kb(28), [bx, by] = b > 0 ? shakeXY(t, 6 * Math.exp(-b * 10)) : [0, 0];
    camBegin(cx + bx, cy + by, z);
    squareSet(t, 1, {
      back: () => { const [a, , c] = viewRect2(200); stringLights(t, a, c); },
      plinths: () => {
        statue(SQ.stX, SQ.stTop, SQ.stU, routine(t, FKEYS, { side: 1, hand: BRZ.col, sleeve: BRZ.arm }), t, { mouth: 'grin', key: 'statueF' });
        horse(SQ.hoX, SQ.hoTop, SQ.hoS, t, { flip: true, mood: 'deadpan', look: k >= 7 ? 'camera' : undefined, blink: NOBLINK(179), boilKey: 'fin horse' });
        const p = pollOf(SQ.hoX, SQ.hoTop, SQ.hoS, true), vb = t >= barT(96) ? 1 : 0;
        pigeon(p[0] + 6, p[1] + 2, 11, { flip: true, bob: vb ? 0 : pulse(t, 7), wingsUp: vb * (.8 + .2 * Math.sin(bpOf(t) * Math.PI)), sq: vb * .12 * pulse(t, 8), key: 'hero' });
      },
      mid: () => {
        FIN.forEach(([name, O, x, y, u, back], j) => { if (vis(x - 200, x + 200)) dancer(name, x, y, u, FKEYS, t, { ...O, ...crowdVar(j), side: 1, mood: name === 'oppa' ? 'cool' : t >= barT(96) ? 'excited' : 'happy', blush: name === 'pop' ? .3 : 0, noShadow: !!back, boilKey: 'F' + j }); });
      }
    });
    camEnd();
    confetti(t, barT(96) - .05, { n: 46, spread: .7, cols: ['#FF6A8A', '#FFD34A', '#6AE0FF', '#9CFF7A', PAL.cream, '#C98AFF'] });
    counterHUD(t);
    if (k < .5) streaks(1 - easeOut(k / .5), true, 29, [PAL.cream, '#FFD98A', '#B8A8E8']);
  }

  shots([[barT(89), shotGag], [kb(6), shotHorseA], [barT(91), shotCrossing], [barT(92), shotSquare], [barT(93), shotGlobe], [barT(94), shotSpace], [barT(95), shotFinish]]);
})();
