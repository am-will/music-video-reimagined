// c7_face.js: Final part 1: face it (barT(42) = 136.284 to barT(50) = 161.861). Bars 42-49, full power.
//
// SHOT PLAN (video times; half-time groove: beat = 0.799 s, bar = 3.197 s; full power all the way)
// World: the parlor is torn away. The band plays on a torn island of warm parlor floor (rug, couch, Rob's kit, Joe's
// desk, floor lamp A) adrift in the Ink Side void: indigo-black, bone-chalk marks, drifting scraps, far-off glowing
// eyes. Everyone stays on their LAY marks, and chapter 8 copies the island outline, the void data and the island
// painting from this file: keep ISL_A, the tears, VD and islandBase/islandEdge as they are.
//
// 1  THE RIP  136.284-142.678 (bars 42-43)   [in: out of chapter 6's #FFF8E6 flash, peaking at 136.284]
//    136.28-136.66  the paint flash clears first and a warm bloom lingers. A bright tear races down the middle of
//                   the dark, cracked parlor, splits round the band's patch of floor and closes below it. The
//                   portrait is knocked off its nail and tumbles away whole to the far right; the desk's table lamp
//                   is thrown off to the left (chapter 8 brings both home). The band jolts; Chester screams.
//    136.66-137.08  the tear glows; a crack of void opens along it.
//    137.00-138.50  the two halves of the world peel apart like curtains (a V opening from the top): they slide
//                   out and swing, their torn wall edges curl back (paper backs showing), scraps fly off.
//    137.45-140.90  the camera pulls back (0.86 -> 0.43): a small warm scrap of floor with a drop shadow in the vast
//                   void; far eyes open one by one, scraps drift. The band plays on.
//    141.10-142.68  pairs of eyes blink open in a ring round the island, faster and faster: something gathers.
//    reads: the tear (0.4 s) · the peel (1.5 s) · a scrap of floor in the void (3.5 s) · we are not alone (1.5 s)
// 2  THE MOSH  142.678-149.073 (bars 44-45)   [in: a camera swoop on the downbeat, carried over from shot 1]
//    142.68-145.88  framing A, low and wide from the pit: the lamp flares and the eyes are dozens of little Inks,
//                   each wearing a member's silhouette: the audience. Backlit silhouettes headbang in front of the
//                   stage, more bob at its ends and far behind it, eyes bouncing, nubs up on the bar lines.
//    145.88-149.07  framing B (cut on action: Chester's leap takes off on the downbeat): Chester leaps, then Mike,
//                   then both; the paper dragonfly circles lamp A. The camera drifts right.
//    148.27-149.07  beat 4: a giant eye in ink glasses opens at the right edge of frame. The crowd freezes and turns
//                   to it; Chester stops singing, lowers his mic and looks.
//    reads: the Inks are the audience (3.2 s) · the leaps (2.4 s) · the dragonfly (secondary) · the eye (0.8 s)
// 3  THE MIRROR  149.073-155.467 (bars 46-47)   [in: the camera travels right with Chester's look]
//    149.07-150.30  the camera moves to a two-shot at the island's right tip. Chester flicks his mic away and walks
//                   to the paper's edge. The Face rises beyond it: his reflection in ink, his mohawk and glasses,
//                   a papercut grin.
//    150.66-151.44  RAISE: Chester lifts his right nub; the Face lifts its giant ink nub, mirrored, 0.2 s late.
//    151.47-152.22  TILT: he tilts, suspicious; it tilts the mirror way, 0.14 s late. Its grin fades.
//    152.27-152.80  GLASSES: he takes off his glasses and holds them out; the Face takes its glasses off too, 0.09 s
//                   late, and holds them down in front of itself. Bare eyes on both.
//    153.07-153.87  held realisation: his bare eyes go wide, then soft; the Face's eyes warm with his.
//    153.86-154.93  REACH: he reaches out; the Face reaches back and shrinks down, whoosh, into a small Ink Chester
//                   standing just beyond the edge (an ink splash covers the change), face to face with him.
//    154.93-155.47  hold: two Chesters in mirror image, nubs almost touching, glasses held out.
// 4  ACCEPTANCE  155.467-161.861 (bars 48-49)   [in: a continuous push-in]
//    155.47-156.85  Chester offers his nub; the Ink glances at it, then takes it (touch at 156.27, a warm glow). Held.
//    156.85-157.66  the Ink melts into a pool, becomes a puddle with its two eyes, streams across the torn edge and
//                   settles under Chester's feet.
//    157.66-158.66  the puddle unfolds into his shadow on the rug (drawn like chapter 8's: his silhouette mirrored
//                   at his feet, faint eyes); its eyes wake on beat 4. His take, then relief.
//    158.66-159.45  eyes on his shadow, two nods (it nods with him); his glasses go back on, with a glint.
//    159.46-160.26  he turns to the band, crouches, and on beat 3 of bar 49 leaps with both arms up, back to his mark.
//    160.38-161.00  the camera blows back wide: every little Ink dives in an arc into its owner's feet: floor shadows
//                   for Mike and Chester, eyes waking under the desk, the kit and the couch.
//    161.06-161.61  the band erupts on beat 4 (jumps, the lamp flares); the camera winds up toward Chester...
//    161.61-161.86  [out: ...and whips left, smear and streaks, arriving at chapter 8's opening camera (1946, 796,
//                   zoom 1.30) at 300 px/frame; chapter 8 lands on Mike, still on the island]
(() => {
  // ---------------------------------------------------------------- time
  const T0 = barT(42), T1 = barT(44), T2 = barT(46), T3 = barT(48), TE = barT(50);
  const B = (k, b = 0) => beatT(k, b);
  const lz = (a, b, k) => Math.exp(lerp(Math.log(a), Math.log(b), k));          // zoom that feels even
  const sm = (t, a, b) => ease(seg(t, a, b));
  const cam = (cx, cy, z) => ({ cx, cy, z });
  const mixCam = (a, b, k) => cam(lerp(a.cx, b.cx, k), lerp(a.cy, b.cy, k), lz(a.z, b.z, k));

  // ---------------------------------------------------------------- geometry helpers
  function chunks(P, n = 12) { const out = []; for (let i = 0; i < P.length - 1; i += n - 1) out.push(P.slice(i, Math.min(P.length, i + n))); return out; }
  function partial(P, k) {            // the first k (0..1) of a polyline, by length
    if (k <= 0 || P.length < 2) return []; if (k >= 1) return P;
    const d = [0]; for (let i = 1; i < P.length; i++) d.push(d[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    const tg = k * d[d.length - 1], out = [P[0]];
    for (let i = 1; i < P.length; i++) {
      if (d[i] <= tg) out.push(P[i]);
      else { const f = (tg - d[i - 1]) / Math.max(1e-6, d[i] - d[i - 1]); out.push([lerp(P[i - 1][0], P[i][0], f), lerp(P[i - 1][1], P[i][1], f)]); break; }
    }
    return out;
  }
  function polyArea(P) { let a = 0; for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length]; a += p[0] * q[1] - q[0] * p[1]; } return a / 2; }
  function clipConvex(subject, clip) {      // Sutherland-Hodgman: subject ∩ clip (clip must be convex)
    const sg = Math.sign(polyArea(clip)), inside = (p, a, b) => sg * ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) >= 0;
    const X = (p, q, a, b) => { const a1 = q[1] - p[1], b1 = p[0] - q[0], c1 = a1 * p[0] + b1 * p[1], a2 = b[1] - a[1], b2 = a[0] - b[0], c2 = a2 * a[0] + b2 * a[1], d = a1 * b2 - a2 * b1 || 1e-9; return [(b2 * c1 - b1 * c2) / d, (a1 * c2 - a2 * c1) / d]; };
    let out = subject;
    for (let i = 0; i < clip.length && out.length; i++) {
      const a = clip[i], b = clip[(i + 1) % clip.length], inp = out; out = [];
      for (let j = 0; j < inp.length; j++) {
        const p = inp[j], q = inp[(j + 1) % inp.length], pi = inside(p, a, b), qi = inside(q, a, b);
        if (pi) { out.push(p); if (!qi) out.push(X(p, q, a, b)); } else if (qi) out.push(X(p, q, a, b));
      }
    }
    return out;
  }
  function inPoly(p, P) { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const a = P[i], b = P[j]; if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
  function rowSpan(P, y) {                  // min/max x where a horizontal line crosses the polygon
    let lo = Infinity, hi = -Infinity;
    for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const a = P[i], b = P[j]; if ((a[1] > y) !== (b[1] > y)) { const x = a[0] + (y - a[1]) * (b[0] - a[0]) / (b[1] - a[1]); lo = Math.min(lo, x); hi = Math.max(hi, x); } }
    return [lo, hi];
  }
  // offset a polyline sideways by w (smoothed normals). side = +1 uses (-dy, dx), -1 uses (dy, -dx)
  function offsetLine(P, w, side, sm = 3) {          // w: a width, or a function of the point index
    return P.map((p, i) => {
      const a = P[Math.max(0, i - sm)], b = P[Math.min(P.length - 1, i + sm)], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ww = typeof w === 'function' ? w(i) : w;
      return [p[0] + side * (-dy / L) * ww, p[1] + side * (dx / L) * ww];
    });
  }
  // a rigid world transform: rotate by r about q, then move by d
  const rig = (q, r, d) => { const c = Math.cos(r), s = Math.sin(r); return ([x, y]) => [q[0] + (x - q[0]) * c - (y - q[1]) * s + d[0], q[1] + (x - q[0]) * s + (y - q[1]) * c + d[1]]; };

  // ---------------------------------------------------------------- layers, moved (the curtains and the whip)
  let MASK7 = null;
  function showMoved(name, polys, tf, o = {}) {           // tf in SCREEN px: rotate tf.r about (tf.px, tf.py), then move (tf.dx, tf.dy)
    const L = LAYERS[name]; if (!L) return;
    flushBrush();
    if (!MASK7) { MASK7 = document.createElement('canvas'); MASK7.width = W; MASK7.height = H; }
    const setT = c => { c.setTransform(1, 0, 0, 1, 0, 0); c.translate(tf.dx + tf.px, tf.dy + tf.py); c.rotate(tf.r || 0); c.translate(-tf.px, -tf.py); };
    const g = SHOW_POOL[SHOW_I] || (SHOW_POOL[SHOW_I] = _gfx()); SHOW_I++;
    const s = g.drawingContext;
    s.setTransform(1, 0, 0, 1, 0, 0); s.globalCompositeOperation = 'source-over'; s.clearRect(0, 0, W, H);
    setT(s); s.drawImage(L.drawingContext.canvas, 0, 0); s.setTransform(1, 0, 0, 1, 0, 0);
    if (polys) {
      const m = MASK7.getContext('2d');
      m.setTransform(1, 0, 0, 1, 0, 0); m.globalCompositeOperation = 'source-over'; m.clearRect(0, 0, W, H);
      setT(m); m.fillStyle = '#000'; _pathPolys(m, polys); m.fill('nonzero'); m.setTransform(1, 0, 0, 1, 0, 0);
      s.globalCompositeOperation = 'destination-in'; s.drawImage(MASK7, 0, 0); s.globalCompositeOperation = 'source-over';
    }
    screenDraw(() => { if (o.alpha != null && o.alpha < 1) tint(255, 255 * clamp(o.alpha)); image(g, 0, 0); noTint(); });
  }

  // ---------------------------------------------------------------- the island (world coords)
  // A torn scrap of the parlor floor round the band's marks. Anchors run clockwise from the left end.
  const ISL_A = [[400, 880], [470, 800], [640, 776], [900, 786], [1120, 772], [1330, 780], [1480, 760], [1640, 770], [1800, 779],
    [1930, 784], [2080, 787], [2300, 776], [2440, 800], [2545, 858], [2610, 940], [2596, 1018], [2500, 1080], [2250, 1108],
    [2000, 1119], [1800, 1122], [1550, 1113], [1250, 1101], [950, 1085], [700, 1052], [500, 990], [410, 935]];
  const ISL = (() => {
    const P = [], at = [];
    ISL_A.forEach((a, i) => {
      const b = ISL_A[(i + 1) % ISL_A.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      at.push(P.length);
      const s = tearLine(a, b, i * 3.7 + 2, Math.min(15, L * .06), Math.max(3, Math.round(L / 22))); s.pop(); P.push(...s);
    });
    return { P, at, top: at[9], bot: at[19] };
  })();
  const NI = ISL.P.length;
  const walkI = (i0, i1, dir) => { const out = [], e = ((i1 % NI) + NI) % NI; for (let i = ((i0 % NI) + NI) % NI, n = 0; n <= NI; i = (i + dir + NI) % NI, n++) { out.push(ISL.P[i]); if (i === e) break; } return out; };
  const HALF_R = walkI(ISL.top, ISL.bot, 1), HALF_L = walkI(ISL.top, ISL.bot, -1), FRONT_EDGE = walkI(ISL.at[14], ISL.at[25], 1);
  const TEAR_TOP = tearLine([1990, -1500], ISL.P[ISL.top], 11, 30, 44), TEAR_BOT = tearLine(ISL.P[ISL.bot], [1745, 1900], 5, 20, 18);
  const EDGE_L = TEAR_TOP.concat(HALF_L.slice(1), TEAR_BOT.slice(1)), EDGE_R = TEAR_TOP.concat(HALF_R.slice(1), TEAR_BOT.slice(1));
  const CURT_L = EDGE_L.concat([[-5000, 4000], [-5000, -4000]]), CURT_R = EDGE_R.concat([[8000, 4000], [8000, -4000]]);
  // scraps that fly off the torn edges when the world rips, then drift in the void
  const DEBRIS = Array.from({ length: 16 }, (_, i) => {
    const side = i % 2 ? 1 : -1, E = side > 0 ? EDGE_R : EDGE_L, f = .04 + .9 * hash(i * 3.1 + 17);
    return { p0: E[Math.floor(f * (E.length - 1))], side, ts: T0 + .42 + .7 * hash(i * 5.3 + 2), v: 420 + 620 * hash(i * 2.9 + 4),
      a: (side < 0 ? Math.PI : 0) + (hash(i + 9) - .5) * 1.6, sz: 14 + 26 * hash(i + 11), kind: i % 3, w: (hash(i + 13) - .5) * 10, fw: 2 + 6 * hash(i + 15) };
  });
  const RUG = Array.from({ length: 48 }, (_, i) => [1850 + Math.cos(i / 48 * TAU) * 980, 935 + Math.sin(i / 48 * TAU) * 150]);   // (no jit: p5 isn't up at load time)
  const RUG_ON = clipConvex(ISL.P, RUG);
  const BOARDS = [817, 844, 881, 928, 985, 1052].map(y => [y, rowSpan(ISL.P, y)]);

  // ---------------------------------------------------------------- the void behind the paper
  const VA = [1500, 820];
  const vcam = (c, d) => [VA[0] + (c.cx - VA[0]) * d, VA[1] + (c.cy - VA[1]) * d, Math.pow(c.z, d)];
  const VD = {
    blot: Array.from({ length: 7 }, (_, i) => ({ x: -900 + 4800 * hash(i * 2.3 + 1), y: -600 + 2800 * hash(i * 4.1 + 2), r: 520 + 520 * hash(i + 5), c: [PC.inkWall2, PC.mold, '#2A1D3C', PC.inkWall][i % 4] })),
    eyes: Array.from({ length: 30 }, (_, i) => ({ d: .2 + .32 * hash(i * 3.1 + 7), x: -1300 + 5600 * hash(i * 5.3 + 1), y: -1000 + 3500 * hash(i * 7.7 + 2), s: .7 + .7 * hash(i * 1.9 + 3), t0: 137.5 + 3.6 * hash(i * 9.1 + 4), red: hash(i * 2.7 + 8) > .86 })),
    chalk: Array.from({ length: 30 }, (_, i) => ({ d: .34 + .5 * hash(i * 6.1 + 3), x: -1600 + 6200 * hash(i * 3.9 + 5), y: -1200 + 3900 * hash(i * 8.3 + 6), s: 1.3 + 1.2 * hash(i + 11), k: ['spiral', 'eye', 'tally', 'face', 'cross', 'arrow'][i % 6] })),
    scraps: Array.from({ length: 16 }, (_, i) => ({ d: .45 + .5 * hash(i * 4.4 + 9), x: -900 + 5000 * hash(i * 2.9 + 12), y: -700 + 3000 * hash(i * 5.7 + 13), sz: 38 + 60 * hash(i + 21), vx: (hash(i + 31) - .5) * 40, vy: 8 + 16 * hash(i + 41), w: (hash(i + 51) - .5) * 1.2, fw: .5 + 1.5 * hash(i + 61), kind: i % 3 }))
  };
  function farEye(x, y, s, open, look = 0, red = false) {
    const h = 24 * s * open, w = 8 * s, gap = 26 * s;
    glow(x, y, 58 * s, red ? '#FF3B2E' : '#D8F0A0', .5 * clamp(open * 1.5));
    if (h > 1.2) for (const sd of [-1, 1]) paint(rectPts(x + sd * gap / 2 - w / 2 + look * 3 * s, y - h / 2, w, h, s * .4), { wash: red ? '#FF6A50' : '#F4EDC9', ink: null });
  }
  function blinkK(t, i) { const p = frac((t + hash(i * 1.3) * 9) / (2.6 + 2.5 * hash(i + 2))); return p < .045 ? .08 : 1; }
  function drawVoid(t, c, o = {}) {
    boilSeed('c7 void base');
    paint(rectPts(-80, -80, W + 160, H + 160), { wash: PC.inkBg, ink: null });
    // ink washes far away
    { const [vx, vy, vz] = vcam(c, .12); camBegin(vx, vy, vz);
      VD.blot.forEach((b, i) => { boilSeed('c7 blot' + i); paint(ellPts(b.x, b.y, b.r, b.r * .7, 18), { fill: b.c, fillOp: 70, bleed: .3, tex: .8, border: .6, ink: null }); });
      camEnd(); }
    // far eyes (they open after the paper rips; then blink now and then)
    const eo = o.eyes ?? 1;
    VD.eyes.forEach((e, i) => {
      const op = eo * ease(seg(t, e.t0, e.t0 + .3)) * blinkK(t, i); if (op < .03) return;
      const [vx, vy, vz] = vcam(c, e.d); camBegin(vx, vy, vz);
      if (inView(e.x - 60, e.x + 60, e.y - 60, e.y + 60)) { boilSeed('c7 feye' + i); farEye(e.x, e.y, e.s, op, Math.sin(t * .7 + i), e.red); }
      camEnd();
    });
    // chalk marks on the dark
    VD.chalk.forEach((m, i) => {
      const [vx, vy, vz] = vcam(c, m.d); camBegin(vx, vy, vz);
      if (inView(m.x - 80, m.x + 80, m.y - 80, m.y + 80)) { boilSeed('c7 chalk' + i); chalkMark(m.k, m.x, m.y, m.s, i, m.d > .6 ? PC.chalk : PC.chalkDim); }
      camEnd();
    });
    // drifting scraps of the torn parlor
    VD.scraps.forEach((p, i) => {
      const age = t - T0, x = p.x + p.vx * age, y = p.y + p.vy * age, [vx, vy, vz] = vcam(c, p.d);
      camBegin(vx, vy, vz);
      if (inView(x - 150, x + 150, y - 150, y + 150)) { boilSeed('c7 scrap' + i); scrap(i, x, y, p.sz, p.w * age + i, Math.cos(p.fw * age + i * 1.7), p.kind, p.d); }
      camEnd();
    });
  }
  function scrap(i, x, y, sz, ang, fl, kind, d) {
    const pts = []; for (let k = 0; k < 7; k++) { const a = k / 7 * TAU + hash(i * 3 + k) * .6, r = sz * (.55 + .45 * hash(i * 7 + k)); pts.push([Math.cos(a) * r, Math.sin(a) * r * .75]); }
    const dim = lerp(.62, .3, clamp((d - .45) / .5)), front = fl > 0;
    const col = kind === 1 ? PC.wains : kind === 2 ? PC.floor : PC.wall;
    push(); translate(x, y); rotate(ang); scale(Math.max(.08, Math.abs(fl)), 1);
    paint(pts, { wash: mixCol(front ? col : '#D8C9A8', PC.inkBg, dim), ink: mixCol(PC.chalkDim, PC.inkBg, dim * .6), sw: .8 });
    if (front && kind === 0) paint(starPts(0, 0, sz * .42, .22, 4, -Math.PI / 2), { wash: mixCol(PC.damask, PC.inkBg, dim * .6), ink: null });
    pop();
  }

  function debris(t) {
    DEBRIS.forEach((d, i) => {
      const age = t - d.ts; if (age < 0) return;
      const dist = d.v * (1 - Math.exp(-1.2 * age)) / 1.2 + 18 * age, x = d.p0[0] + Math.cos(d.a) * dist, y = d.p0[1] + Math.sin(d.a) * dist + 14 * age;
      if (!inView(x - 60, x + 60, y - 60, y + 60)) return;
      boilSeed('c7 debris' + i);
      scrap(i + 40, x, y, d.sz, d.w * (1 - Math.exp(-.8 * age)) / .8 + .4 * age, Math.cos(d.fw * age + i), d.kind, .2);
    });
  }
  // ---------------------------------------------------------------- the island, painted
  function islandBase(t, c, o = {}) {
    const z = c.z;
    boilSeed('c7 halo');
    glow(1500, 900, 1900, '#FFB35A', .2 * (o.halo ?? 1));
    glow(LAY.lampA, 700, 900, '#FFC766', .22 * (o.halo ?? 1));
    // the drop shadow: the scrap floats a little above the dark
    castShadow([toScreenPts(ISL.P.map(([x, y]) => [x + 22, y + 58]))], { alpha: .75, blur: 16, col: '#000000' });
    boilSeed('c7 floor');
    paint(ISL.P, { wash: PC.floor, fill: PC.floorDk, fillOp: 110, bleed: .05, tex: .7, ink: null });
    BOARDS.forEach(([y, [a, b]], k) => { if (b - a > 60) { boilSeed('c7 board' + k); inkLine([[a + 12, y], [b - 12, y + 2]], .45 / Math.min(1, z), PC.floorDk, 'inkfine', 0); } });
    boilSeed('c7 rug');
    paint(RUG_ON, { wash: PC.rug, fill: PC.rugDk, fillOp: 100, bleed: .12, tex: .9, border: .8, ink: null });
    for (let i = 0; i < 40; i++) {
      const a = i / 40 * TAU, x = 1850 + Math.cos(a) * 980, y = 935 + Math.sin(a) * 150;
      if (inPoly([x, y], ISL.P) && inPoly([x + Math.cos(a) * 14, y + Math.sin(a) * 6 + 4], ISL.P)) inkLine([[x, y], [x + Math.cos(a) * 14, y + Math.sin(a) * 6 + 4]], .5, PC.rugDk, 'inkfine', 0);
    }
    // warm light round the lamp, falling off to the ends of the scrap
    boilSeed('c7 isl light');
    paint(ellPts(LAY.lampA + 200, 930, 900, 170, 24), { fill: '#FFE3A8', fillOp: 40 * (o.halo ?? 1), bleed: .3, tex: .3, ink: null });
    for (const [x, y] of [[520, 950], [2520, 980]]) paint(ellPts(x, y, 260, 150, 18), { fill: '#2A1620', fillOp: 70, bleed: .3, tex: .4, ink: null });
    islandEdge(z, o.edgeReveal ?? 1);
  }
  function islandEdge(z, rev = 1) {
    boilSeed('c7 isl edge');
    const k = 1 / Math.max(.45, Math.min(1.6, z));
    const Ps = rev >= 1 ? [ISL.P.concat([ISL.P[0]])] : [partial(HALF_L, rev), partial(HALF_R, rev)];
    for (const P of Ps) for (const C of chunks(P, 14)) if (C.length > 1) tearEdge(C, { sw: 1.25 * k, shadow: false });
    if (rev < 1) return;
    // the paper's thickness along the front: a thin dark underside
    const front = FRONT_EDGE;
    for (const C of chunks(front, 14)) inkLine(C.map(([x, y]) => [x, y + 3.2 * k]), 1.6 * k, '#3A2430', 'inkfine', .2);
  }

  // ---------------------------------------------------------------- the band on the island
  const DRAGON = t => {                     // the paper dragonfly circling lamp A's shade
    const a = (t - T1) * TAU / 2.3 + 1.2, x = LAY.lampA + Math.cos(a) * 175, y = 292 + Math.sin(a) * 46 + 12 * Math.sin(t * 2.7);
    const vx = -Math.sin(a) * 175, vy = Math.cos(a) * 46;
    return { x, y, rot: Math.atan2(vy, vx), behind: Math.sin(a) < -.1 };
  };
  function stage(t, o = {}) {
    const over = o.over || {};
    for (const m of MEMBERS) over[m] = { boilKey: 'c7 ' + m, ...(over[m] || {}) };
    const vr = viewRect(60), vis = (a, b) => b > vr[0] && a < vr[2];
    const skip = new Set(o.skip || []);
    if (!vis(560, 960)) skip.add('joe'); if (!vis(1100, 1480)) skip.add('rob'); if (!vis(1650, 1930)) skip.add('brad');
    if (!vis(1940, 2220)) skip.add('phoenix'); if (!vis(1400, 1720)) skip.add('mike'); if (!vis(2090, 2410)) skip.add('chester');
    const H = bandHooks(t, { style: o.style || { mike: 'hype', chester: 'belt' }, energy: o.energy ?? 1, over, skip: [...skip], floorBefore: o.floorBefore, floorAfter: o.floorAfter });
    const df = o.fly ? DRAGON(t) : null;
    if (df && df.behind) dragonfly(df.x, df.y, .85, t, { rot: df.rot });
    floorLamp(LAY.lampA, LAY.floorY - 10, 1, { on: o.lamp ?? 1 });
    if (o.lampFlare) { boilSeed('c7 flare'); glow(LAY.lampA, 300, 520, '#FFD27A', o.lampFlare); }
    if (df && !df.behind) dragonfly(df.x, df.y, .85, t, { rot: df.rot });
    couchBack(LAY.couch, LAY.seatY + 96, 1);
    H.couch();
    couchFront(LAY.couch, LAY.seatY + 96, 1);
    H.joe();
    desk(LAY.desk, LAY.floorY, 1, t, { spin: t * 3.4 });
    H.rob();
    drumKit(LAY.drums, LAY.floorY + 60, .72, t, { hits: drumHits(t) });
    H.floor();
  }

  // ---------------------------------------------------------------- the crowd of little Inks
  // Every Ink wears one member's silhouette (it is that member's shadow, waiting). Zones: behind the island (front
  // view, far), left/right of it (3/4 views facing in), in front of it (backs to us, facing the stage).
  const CROWD = (() => {
    const L = [], ofs = ['chester', 'mike', 'brad', 'rob', 'joe', 'phoenix'];
    let n = 0;
    const add = (x, y, u, view, flip, zone, drip = 0) => { L.push({ x, y, u, view, flip, zone, drip, of: ofs[(n * 5 + 2) % 6], ph: .12 * (hash(n * 3.3 + 1) - .5), amp: .8 + .45 * hash(n * 7.1 + 2), lean: (hash(n * 2.2 + 5) - .5) * .14, horn: hash(n * 4.4 + 9) > .5, i: n }); n++; };
    // far behind the island (front view: eyes on the band), smaller the higher they float
    [[300, 700, 6.4], [520, 612, 6.6], [790, 470, 5.8], [1000, 575, 6.4], [1330, 300, 4.8], [1720, 470, 5.8], [2060, 455, 5.6], [2200, 320, 4.6], [2420, 640, 6.6]]
      .forEach(([x, y, u]) => add(x, y, u, 'front', false, 'back'));
    // at the ends of the island, 3/4 views facing in
    [[330, 860, 7.6], [130, 930, 8.2], [270, 1040, 8.6], [110, 1150, 9.2]].forEach(([x, y, u]) => add(x, y, u, 'q', false, 'left'));
    [[2830, 1000, 8.2], [2965, 905, 7.8], [3085, 1040, 8.6], [2940, 1160, 9.2]].forEach(([x, y, u]) => add(x, y, u, 'q', true, 'right'));
    // in front of the stage, backs to us, backlit
    [[620, 1192, 10.6], [990, 1212, 11.2], [1360, 1188, 10.4], [1730, 1214, 11.4], [2100, 1192, 10.8], [2470, 1206, 10.6]]
      .forEach(([x, y, u], i) => add(x, y, u, i % 3 === 1 ? 'back' : 'qback', x > 1700, 'front'));
    [[470, 1400, 13.6], [1000, 1380, 13.2], [1560, 1415, 14], [2120, 1382, 13.4], [2660, 1405, 13.8]]
      .forEach(([x, y, u], i) => add(x, y, u, i % 3 === 2 ? 'back' : 'qback', x > 1560, 'front'));
    return L;
  })();
  // pose of one Ink: headbanging on the beat, or frozen and looking at o.at (o.freeze 0..1 blends)
  function crowdPose(c, t, o) {
    const bp = bpOf(t) - c.ph, f = frac(bp), hit = Math.exp(-f * 6), bob = Math.abs(Math.sin(bp * Math.PI)), bar = beatN(t - c.ph * BEAT) % 4 === 0;
    const bang = { dy: (.9 * hit - 1.6 * bob) * c.amp, sq: .26 * hit * c.amp - .05, rot: c.lean + .13 * Math.sin(bp * Math.PI) * c.amp, lookY: .8 * hit, lookX: 0,
      aL: c.horn && bar ? .7 + .9 * hit : -.4 + .7 * hit, aR: !c.horn && bar ? .7 + .9 * hit : -.3 + .6 * hit };
    const fz = clamp(o.freeze || 0);
    if (fz <= 0) return bang;
    const at = o.at || [3000, 450], dx = at[0] - c.x, dy = at[1] - (c.y - 5 * c.u), L = Math.hypot(dx, dy) || 1, br = Math.sin(t * 2.3 + c.i);
    const w = { dy: 0, sq: .03 * br, rot: c.lean * .5, lookX: clamp(dx / L * 1.4, -1, 1), lookY: clamp(dy / L * 1.4, -1, 1), aL: -.35, aR: -.3 };
    const out = {}; for (const k in bang) out[k] = lerp(bang[k], w[k], fz); return out;
  }
  function drawCrowd(t, zone, o = {}) {
    for (const c of CROWD) {
      if (c.zone !== zone) continue;
      if (o.hide && diveOf(c, t).k > 0) continue;
      if (!inView(c.x - 8 * c.u, c.x + 8 * c.u, c.y - 16 * c.u, c.y + 3 * c.u)) continue;
      const p = crowdPose(c, t, o);
      inkling(c.x, c.y, c.u, { of: c.of, view: c.view, flip: c.flip, noShadow: true, drip: c.drip, ...p, boilKey: 'c7 ink' + c.i, seed: c.i });
    }
  }
  function crowdEyes(t, k) {               // only the eyes, opening in the dark (end of shot 1)
    for (const c of CROWD) {
      if (c.view === 'back' || c.view === 'qback') continue;
      const t0 = 141.1 + 1.45 * hash(c.i * 5.9 + 3), op = k * ease(seg(t, t0, t0 + .18)) * blinkK(t, c.i + 40); if (op < .03) continue;
      if (!inView(c.x - 80, c.x + 80, c.y - 200, c.y)) continue;
      const u = c.u * (c.of ? BAND[c.of].sy : 1), ex = c.x + (c.view === 'q' ? (c.flip ? -1.1 : 1.1) * c.u : 0), ey = c.y - 6 * u;
      boilSeed('c7 ceye' + c.i);
      const g = 1.7;   // seen from far off, the eyes read bigger than the bodies they belong to
      for (const sd of [-1, 1]) { const x = ex + sd * 2.5 * c.u * (c.view === 'q' ? .74 : 1); glow(x, ey, c.u * 3.2 * g, '#D8F0A0', .9 * op); paint(rectPts(x - .5 * c.u * g, ey - 1.05 * u * op * g, c.u * g, 2.1 * u * op * g), { wash: '#F4EDC9', ink: null }); }
    }
  }

  // ---------------------------------------------------------------- world assembly
  function world(t, c, o = {}) {
    drawVoid(t, c, o);
    if (o.afterVoid) o.afterVoid();
    camBegin(c.cx, c.cy, c.z);
    debris(t);
    if (o.crowd) drawCrowd(t, 'back', o.crowd);
    if (o.face) o.face('behind');
    islandBase(t, c, o);
    if (o.afterIsland) o.afterIsland();
    stage(t, o);
    if (o.crowd) {
      boilSeed('c7 haze');
      const hz = o.crowd.haze ?? 1;
      if (hz > .02) { for (const [x, y, r] of [[380, 980, 420], [2640, 1000, 420]]) if (inView(x - r, x + r, y - r, y + r)) glow(x, y, r, '#FFB35A', .22 * hz); }
      drawCrowd(t, 'left', o.crowd); drawCrowd(t, 'right', o.crowd);
    }
    if (o.face) o.face('front');
    if (o.crowd) {
      const hz = o.crowd.haze ?? 1;
      boilSeed('c7 haze2');
      if (hz > .02) for (let i = 0; i < 6; i++) { const x = 640 + i * 390; if (inView(x - 300, x + 300, 850, 1450)) glow(x, 1150, 330, '#FFB35A', .3 * hz); }
      drawCrowd(t, 'front', o.crowd);
    }
    if (o.eyesK) crowdEyes(t, o.eyesK);
    if (o.lit) o.lit();
    camEnd();
  }

  // ================================================================ SHOT 1: the rip
  const CAM1 = t => {
    const k = sm(t, 137.45, 140.9), sh = t < 137.6 ? shakeXY(t, 18 * Math.exp(-(t - T0) * 4)) : [0, 0];
    const c = mixCam(cam(1720, 612, .86), cam(1515, 735, .43), k);
    c.z *= 1 - .035 * seg(t, 140.7, T1); c.cy += 10 * Math.sin((t - T0) * .9) * k;
    return cam(c.cx + sh[0], c.cy + sh[1], c.z);
  };
  // the torn-away parlor: dark, peeled, cracked (c6's state), minus everything that stays on the island
  function roomLayer(t, c) {
    paintLayer('c7room', () => {
      camBegin(c.cx, c.cy, c.z);
      wallpaper(-500, 3700, t, {});
      peelStrips(t, .7);
      wainscot(-500, 3700, false);
      crown(-500, 3700, false);
      doors(LAY.doorsL, false); doors(LAY.doorsR, false);
      for (const sx of LAY.sconces) sconce(sx, 280, 0, false);
      floorBoards(-500, 3700, false, { ink: .5 });
      rug(1850, 935, 980, 150, false);
      floorLamp(LAY.lampB, LAY.floorY - 10, 1, { on: 0 });
      // c6's cracks, racing out to the edges: slivers of light with a dark lip
      [[[1700, 520], [300, -300]], [[1400, 700], [-400, 420]], [[2300, 560], [3600, -200]], [[2500, 760], [3700, 600]], [[1200, 1150], [300, 1800]], [[2400, 1100], [3400, 1700]], [[1850, 180], [1300, -500]]].forEach(([a, b], i) => {
        boilSeed('c7 crack' + i);
        const L = tearLine(a, b, 40 + i * 3, 22, 18), w = 5 + 2 * hash(i + 3);
        const S = L.map(([x, y], k) => { const q = Math.sin(k / (L.length - 1) * Math.PI) * w; return [x + q, y - q * .5]; });
        paint(L.concat(S.slice().reverse()), { wash: '#FFF1CC', ink: null });
        inkLine(S, 1.6, PC.inkDrip, 'inkfine', .2);
        const m = L[Math.floor(L.length * .45)], br = tearLine(m, [m[0] + 160 * (hash(i + 7) - .3), m[1] + 170 * (hash(i + 8) - .5)], i, 8, 6);
        inkLine(br, 2.2, '#FFF1CC', 'inkfine', .2);
      });
      roomLight(.84, [[LAY.lampA, 360, 620, .8], [1850, 980, 700, .5]], { col: '#1E0F16' });
      camEnd();
    });
  }
  const CURT = (t, side) => {     // the curtain's world motion: slide out, swing, drop a little
    const p = seg(t, 136.98, 138.75), m = .5 * easeIn(p) + .5 * ease(p), crack = 7 * ease(seg(t, T0 + .36, 137.0));
    return { d: [side * (crack + 3600 * m), 160 * m * m], r: -side * .17 * ease(p), q: side < 0 ? [-600, -600] : [4200, -600], curl: 14 * ease(seg(t, T0 + .36, 137.1)) + 95 * ease(p) };
  };
  function curtains(t, c) {
    const S = (x, y) => toScreen(x, y);
    for (const side of [-1, 1]) {
      const M = CURT(t, side), E = side < 0 ? EDGE_L : EDGE_R, P = side < 0 ? CURT_L : CURT_R;
      const [qx, qy] = S(M.q[0], M.q[1]);
      showMoved('c7room', [toScreenPts(P)], { dx: M.d[0] * c.z, dy: M.d[1] * c.z, r: M.r, px: qx, py: qy });
      // the wall tear's edges curl back (paper backs showing); round the island the pieces just slide away
      const f = rig(M.q, M.r, M.d), Em = E.map(f), nT = TEAR_TOP.length, wk = i => i < nT ? 1 : Math.max(0, 1 - (i - nT) / 6);
      if (M.curl > 2) {
        const Et = Em.slice(0, nT + 6), dir = side < 0 ? 1 : -1;
        const inner = offsetLine(Et, i => M.curl * wk(i), dir, 4), mid = offsetLine(Et, i => M.curl * .45 * wk(i), dir, 4);
        boilSeed('c7 curl' + side);
        castShadow([toScreenPts(inner.concat(offsetLine(Et, i => M.curl * 1.5 * wk(i), dir, 6).reverse()))], { alpha: .5, blur: 9, col: '#12080C' });
        for (let i = 0; i < Et.length - 1; i += 10) {
          const a = Et.slice(i, i + 11), b = inner.slice(i, i + 11), mm = mid.slice(i, i + 11);
          if (a.length > 1) { paint(a.concat(b.slice().reverse()), { wash: '#EFE2C6', ink: null }); paint(mm.concat(b.slice().reverse()), { wash: '#D9C6A2', washOp: 200, ink: null }); }
        }
        for (const C of chunks(inner, 14)) inkLine(C, 1.2 / c.z, '#6E5238', 'inkfine', .4);
      }
      boilSeed('c7 tornedge' + side);
      for (const C of chunks(Em, 14)) tearEdge(C, { sw: .7 / c.z, shadow: false });
    }
  }
  function tearGlow(t, c, which) {  // the tear racing round the band, then glowing ('wall': the tear through the room, 'isle': round the island)
    const k1 = seg(t, T0, T0 + .13), k2 = seg(t, T0 + .1, T0 + .32), k3 = seg(t, T0 + .3, T0 + .36), fade = 1 - seg(t, 136.75, 137.25);
    if (fade <= 0) return;
    const parts = which === 'wall' ? [partial(TEAR_TOP, k1), partial(TEAR_BOT, k3)] : [partial(HALF_L, k2), partial(HALF_R, k2)];
    boilSeed('c7 tearglow');
    for (const P of parts) for (const C of chunks(P, 14)) if (C.length > 1) { inkLine(C, 5 / c.z * fade, '#FFF8E6', 'ink', .2); }
    const fronts = parts.map(P => P[P.length - 1]).filter(Boolean);
    for (const p of fronts) glow(p[0], p[1], 120 / c.z, '#FFF3C0', .9 * fade);
    for (let i = 0; i < 8; i++) { const P = parts[i % 2]; if (P.length > 3) { const p = P[Math.floor(P.length * (i + 1) / 9)]; if (p) glow(p[0], p[1], 90 / c.z, '#FFE9B0', .45 * fade); } }
  }
  // the portrait: the tear knocks it off its nail and it tumbles away whole, far to the right (chapter 8 brings it home)
  function flyingPortrait(t) {
    const j = T0 + .07, a = Math.max(0, t - j - .1), jolt = t < j ? 0 : spring(t, j, 5, 30) * .18;
    const x = LAY.portrait[0] + 520 * a + 260 * a * a, y = LAY.portrait[1] - 240 * a + 30 * a * a, s = Math.exp(-.75 * a);
    if (s < .12) return;
    portrait(x, y, s, t, { stage: 'ink', swing: jolt + 1.9 * a + .35 * Math.sin(a * 3) });
  }
  // the desk's table lamp is thrown off too, spinning away to the left
  function flyingLamp(t) {
    const a = Math.max(0, t - T0 - .12), s = .8 * Math.exp(-.9 * a); if (s < .1) return;
    tableLamp(LAY.lampDesk - 480 * a - 200 * a * a, LAY.deskTop - 20 - 330 * a + 60 * a * a, s, { on: 0, swing: -2.3 * a - .4 * Math.sin(a * 5) });
  }
  function shotRip(t, lt, dur) {
    const c = CAM1(t), live = t < 139.2;
    if (live) roomLayer(t, c);
    const scream = t < B(42, 1.1), jolt = take(t, T0 + .05, .9);
    world(t, c, {
      style: { mike: 'hype', chester: scream ? 'scream' : 'belt' },
      over: { chester: { sq: jolt.sq, dy: jolt.dy - 1.2 * Math.abs(Math.sin(bpOf(t) * Math.PI)) }, mike: { sq: jolt.sq * .8 } },
      eyes: 1, halo: .6 + .4 * seg(t, 137, 139),
      lampFlare: .6 * Math.exp(-Math.max(0, t - T0) * 3),
      afterVoid: live ? () => { camBegin(c.cx, c.cy, c.z); curtains(t, c); tearGlow(t, c, 'wall'); camEnd(); } : null,
      afterIsland: () => tearGlow(t, c, 'isle'),
      eyesK: seg(t, 141, 141.2), edgeReveal: seg(t, T0 + .1, T0 + .32),
      lit: () => { flyingLamp(t); flyingPortrait(t); }
    });
    const fk = 1 - ease(seg(t, T0, T0 + .3));
    if (fk > 0) { glow(W / 2 + 110, H / 2 - 60, 900 + 1300 * fk, '#FFF3D0', 1.4 * fk); flash(clamp((fk - .5) / .5), '#FFF8E6'); }   // out of chapter 6's flash: the paint clears first, the light lingers
  }

  // ================================================================ SHOT 2: the mosh
  const CAMA = cam(1560, 770, .71), CAMB0 = cam(1880, 720, 1.0), CAMB1 = cam(2030, 705, 1.03);
  function shotMosh(t, lt, dur) {
    const inB = t >= B(45, 0);
    let c;
    if (!inB) { const k = easeOut(seg(t, T1, T1 + .55)); c = mixCam(CAM1(T1 - .001), CAMA, k); c.z *= 1 + .06 * seg(t, T1 + .55, B(45, 0)); c.cx += 50 * seg(t, T1 + .55, B(45, 0)); }
    else { c = mixCam(CAMB0, CAMB1, sm(t, B(45, 0), T2)); }
    const bp = bpOf(t), hop = [
      inB ? jump(t, B(45, 0), B(45, .82), 5.5) : jump(t, B(44, 3) + .04, B(44, 3.8), 3.5),
      inB ? jump(t, B(45, 1), B(45, 1.8), 4.6) : { dy: 0, sq: 0 },
      jump(t, B(45, 2) + .03, B(45, 2.8), 5), jump(t, B(45, 2) + .08, B(45, 2.85), 4.4)
    ];
    const cy = hop[0].dy + hop[2].dy, csq = hop[0].sq + hop[2].sq, my = hop[1].dy + hop[3].dy, msq = hop[1].sq + hop[3].sq;
    const fz = seg(t, B(45, 3), B(45, 3) + .25), look = sm(t, B(45, 3) + .1, B(45, 3) + .35);
    world(t, c, {
      style: { mike: 'hype', chester: look > .5 ? 'idle' : 'belt' },
      over: {
        chester: { dy: cy - .6 * Math.abs(Math.sin(bp * Math.PI)) * (1 - look), sq: csq, aL: lerp(1.2 + .3 * Math.sin(bp * TAU), .1, look), lookX: look * .9, lookY: -.3 * look, ...(look > .5 ? { micAt: 'up', aR: -.55, mouth: null, eyes: 'normal' } : {}) },
        mike: { dy: my, sq: msq }
      },
      fly: true, eyes: 1, halo: 1,
      lampFlare: .9 * Math.exp(-Math.max(0, t - T1) * 2.5) + .25 * pulse(t, 4),
      crowd: { freeze: fz, at: [2860, 380] },
      face: t > B(45, 3) - .05 ? (layer) => { if (layer === 'behind') theFace(t, faceState(t)); } : null
    });
  }

  // ================================================================ the Face (shots 2-3)
  const FGL = '#0B0911';
  // giant ink glasses round the Face's eyes (eyes at cx ± 4.8s, cy - 1.8s). held: temples folded, a lens sheen
  function faceGlasses(cx, cy, s, sw, held = false) {
    boilSeed('c7 fglasses');
    const ey = cy - 1.8 * s;
    for (const sd of [-1, 1]) {
      const ex = cx + sd * 4.8 * s;
      if (held) paint(rrPts(ex - 2.7 * s, ey - 3.1 * s, 5.4 * s, 6.2 * s, 1 * s), { wash: '#8E7FAF', washOp: 45, ink: null });
      paint(rrPts(ex - 2.9 * s, ey - 3.3 * s, 5.8 * s, 6.6 * s, 1.1 * s), { ink: FGL, sw: sw * 3.4 });
      inkLine([[ex - 2.1 * s, ey - 3.0 * s], [ex + 1.6 * s, ey - 3.0 * s]], sw * .9, PC.inkRim, 'inkfine', 0);
      inkLine([[ex - 1.9 * s, ey + 1.7 * s], [ex - .5 * s, ey - .5 * s]], sw * (held ? 1.2 : .8), held ? '#C9BFE0' : '#8E7FAF', 'inkfine', 0);
    }
    inkLine([[cx - 2 * s, ey - .9 * s], [cx, ey - 1.4 * s], [cx + 2 * s, ey - .9 * s]], sw * 2.8, FGL, 'ink', .5);
    if (!held) for (const sd of [-1, 1]) inkLine([[cx + sd * 7.8 * s, ey - 1.6 * s], [cx + sd * 10.2 * s, ey - 1.8 * s]], sw * 2.8, FGL, 'ink', 0);
  }
  function faceNub(px, py, s, ang, sw, hook) {       // a giant ink arm from (px, py), pointing at screen angle ang
    push(); translate(px, py); rotate(ang);
    paint(rrPts(-.6 * s, -1.05 * s, 5.2 * s, 2.1 * s, .9 * s), { wash: PC.inkBody, fill: PC.inkBodyLt, fillOp: 70, bleed: .08, tex: .7, ink: PC.inkRim, sw: sw * 1.2 });
    if (hook) { translate(4.6 * s, 0); rotate(-ang); hook(); }
    pop();
  }
  // F: { x, y, s, tilt, sx, sy, open, lookX, lookY, grin, glasses (on the face?), nubL / nubR: { ang, front, tuck, hold } }
  function theFace(t, F) {
    const s = F.s, sw = clamp(s / 10, .7, 3), px = F.x, py = F.y + 8 * s;
    push(); translate(px, py); rotate(F.tilt || 0); scale(F.sx ?? 1, F.sy ?? 1); translate(-px, -py);
    const nub = (side, N) => {
      if (!N) return; boilSeed('c7 fnub' + side);
      faceNub(F.x + side * (9.6 - 3.2 * (N.tuck || 0) + (N.out || 0)) * s, F.y + 1.6 * s, s, N.ang, sw, N.hold ? () => { rotate(N.holdRot || 0); faceGlasses(side < 0 ? 7.7 * s : -7.7 * s, 1.8 * s, s, sw, true); } : null);
    };
    if (F.nubL && !F.nubL.front) nub(-1, F.nubL);
    if (F.nubR && !F.nubR.front) nub(1, F.nubR);
    bigFace(F.x, F.y, s, t, { open: F.open, lookX: F.lookX, lookY: F.lookY, grin: F.grin });
    if (F.soft > .02) { boilSeed('c7 fsoft'); for (const sd of [-1, 1]) glow(F.x + sd * 4.8 * s + (F.lookX || 0) * 1.2 * s, F.y - 1.8 * s, 6 * s, '#FFE3A8', .35 * F.soft); }
    boilSeed('c7 fmohawk');
    push(); translate(F.x, F.y + 8.5 * s); HAIR.mohawk(2 * s, sw * 2.2, VIEWS.front, { base: PC.inkBodyDk, tip: '#3A2F52', ink: PC.inkRim }); pop();
    if (F.glasses) faceGlasses(F.x, F.y, s, sw);
    if (F.nubL && F.nubL.front) nub(-1, F.nubL);
    if (F.nubR && F.nubR.front) nub(1, F.nubR);
    pop();
  }

  // ---------------------------------------------------------------- Chester's gestures (shot 3). The Face copies
  // them mirrored, late at first, then catching up: raise 0.2 s, tilt 0.14 s, glasses 0.09 s, reach 0.05 s.
  const WALK = [149.36, 150.3], EDGE_X = 2390, OFF_G = 152.53, INK_X = 2660, SHRINK = [154.1, 154.93];
  const raiseK = t => kf(t, [[150.56, 0], [150.66, -.14], [150.83, 1.1], [150.96, 1], [151.26, 1], [151.44, 0]]);
  const tiltK = t => kf(t, [[151.47, 0], [151.64, 1.12], [151.75, 1], [152.04, 1], [152.22, 0]]);
  const liftK = t => kf(t, [[152.27, 0], [152.45, 1], [152.52, 1], [152.66, 2.1], [152.78, 2]]);   // 0 rest · 1 hand at the glasses · 2 held out
  const reachK = t => kf(t, [[153.86, 0], [154.08, 1.08], [154.2, 1]]);
  const lagAt = t => t < 151.46 ? .2 : t < 152.25 ? .14 : t < 153.8 ? .09 : .05;
  const aLofLift = k => k <= 1 ? lerp(.08, 2.45, k) : lerp(2.45, .25, k - 1);
  const chesArms = t => ({ aR: .1 + 1.12 * raiseK(t) + .3 * reachK(t), aL: aLofLift(liftK(t)), rot: .21 * tiltK(t) + .07 * reachK(t) });
  function chester3(t) {                 // Chester in shot 3: tosses the mic, walks to the edge, mirrors, reaches
    const w = stroll(t, WALK[0], WALK[1], LAY.chester[0], EDGE_X, 19), A = chesArms(t), lk = liftK(t);
    const m = mood('chester', t, [[T2 - 1, 'determined'], [151.47, 'suspicious'], [152.27, 'neutral'], [153.07, 'surprised'], [153.52, 'hopeful']], { take: .6 });
    const toss = seg(t, T2 + .02, T2 + .2), flick = Math.sin(Math.PI * toss);
    const o = { ...m, emote: null, mouth: t > 153.52 ? 'smile' : m.mouth, lookX: .72, lookY: -.72, view: w.view, walk: w.walk, flip: false, boilKey: 'c7 chester',
      mic: t < T2 + .12 ? 'R' : false, micAt: 'up', aR: t < T2 + .3 ? lerp(-.55, 1.1, flick) : A.aR, aL: A.aL, rot: A.rot + (m.rot || 0) * .3, dx: .3 * reachK(t), dy: (m.dy || 0) + w.dy,
      glasses: t < OFF_G, frontArm: lk > .25 && lk < 1.7 ? 'L' : undefined, armL: t >= OFF_G ? glassesProp : undefined };
    const rk = raiseK(t); o.sq = (o.sq || 0) - .07 * clamp(rk); o.dy = (o.dy || 0) - .25 * clamp(rk);
    if (t > 153.07 && t < 153.52) o.lookY = -.5;
    return { x: w.x, y: LAY.chester[1], o };
  }
  function flyingMic(t) {                // the mic he tosses away, arcing off to the left
    const k = seg(t, T2 + .12, T2 + .9); if (k <= 0 || k >= 1) return;
    const p = arcPt([LAY.chester[0] + 90, 830], [LAY.chester[0] - 700, 900], 260, k);
    boilSeed('c7 tossmic');
    push(); translate(p[0], p[1]); rotate(-1.5 - 9 * k); micProp(19, 1.25, 'chester', 0); pop();
  }
  // the Face over shots 2-3: its eye opens at the edge of the mosh, it rises, it copies him, it shrinks
  function faceState(t) {
    const L = lagAt(t), tl = t - L, A = chesArms(tl), lk = liftK(tl);
    const open = ease(seg(t, B(45, 3), B(45, 3) + .4)), rise = sm(t, T2, T2 + 1.15);
    const sk = ease(seg(t, SHRINK[0], SHRINK[1]));
    const tk = take(t, 153.07 + L, .45);
    // its outer nub copies his glasses hand: to the face, the glasses off, then held down in front of its body
    let angR = -A.aL, frontR = lk > .25, holdR = tl >= OFF_G;
    if (lk > 1) angR = lerp(-2.45, -3.74, clamp((lk - 1) / 1.1));
    return {
      x: lerp(2965, INK_X, sk), y: lerp(lerp(790, 585, rise), 866, sk), s: lz(26, 8.8, sk), tilt: -A.rot, sx: 1 + .6 * tk.sq, sy: 1 - tk.sq,
      open, lookX: -.75 * open, lookY: .5, grin: .85 * sm(t, T2 + .5, T2 + 1.1) * (1 - sm(t, 150.9, 152.3)), glasses: tl < OFF_G, soft: sm(t, 153.3, 153.9),
      nubL: { ang: Math.PI + A.aR, out: 1.1 * clamp((A.aR - .5) / .7), tuck: 1 - sm(t, 150.35, 150.62), front: false },
      nubR: { ang: angR, front: frontR, hold: holdR, holdRot: lerp(.08, 0, sk), tuck: 1 - sm(t, 151.9, 152.3) },
      sk
    };
  }
  function speedIn(t, x, y) {             // lines rushing in toward the shrinking Face
    const k = seg(t, SHRINK[0] + .05, SHRINK[1] + .05); if (k <= 0 || k >= 1) return;
    boilSeed('c7 shrinklines');
    const r0 = lerp(700, 160, easeIn(k)), r1 = r0 + 420 * Math.sin(Math.PI * k);
    speedLines(x, y, r0, r1, 26, mixCol(PC.inkRim, PC.chalk, .3), 7, .7);
  }
  // the Ink Chester the Face becomes (and its glasses, in ink)
  function inkGlassesProp(u, sw) {
    push(); rotate(-.3);
    for (const dx of [.4, 3.2]) { paint(rrPts(dx * u, -.9 * u, 2.4 * u, 2 * u, .35 * u), { wash: '#8E7FAF', washOp: 50, ink: FGL, sw: sw * 1.2 }); inkLine([[(dx + .3) * u, -.72 * u], [(dx + 1.9) * u, -.72 * u]], sw * .5, PC.inkRim, 'inkfine', 0); }
    inkLine([[2.8 * u, -.3 * u], [3.2 * u, -.3 * u]], sw, FGL, 'ink', 0);
    inkLine([[1 * u, -.5 * u], [1.5 * u, -.1 * u]], sw * .5, '#C9BFE0', 'inkfine', 0);
    pop();
  }

  // ================================================================ SHOT 3: the mirror
  const TWO = cam(2615, 682, 1.42), TWO2 = cam(2598, 694, 1.5), CLOSE = cam(2525, 872, 1.62);
  const CAM3 = t => {
    let c = mixCam(CAMB1, TWO, sm(t, T2, T2 + 1.15));
    c = mixCam(c, TWO2, sm(t, T2 + 1.15, 153.8));
    c = mixCam(c, CLOSE, sm(t, 154.05, T3 + .1));
    c.cy += 6 * Math.sin((t - T2) * 1.3);
    return c;
  };
  function shotMirror(t, lt, dur) {
    const c = CAM3(t), F = faceState(t), ch = chester3(t), popK = t >= SHRINK[1];
    world(t, c, {
      style: { mike: 'hype', chester: 'idle' }, skip: ['chester'], eyes: 1, halo: 1,
      crowd: { freeze: 1, at: popK ? [2520, 850] : [F.x, F.y], haze: .7 },
      face: layer => { if (layer === 'behind' && !popK) { theFace(t, F); speedIn(t, F.x, F.y); } },
      floorAfter: () => {
        member('chester', ch.x, ch.y, 19, ch.o);
        flyingMic(t);
        if (popK) inkChester(t, INK_X, { pop: t - SHRINK[1] });
      }
    });
  }
  // the Ink Chester: pose at time t (shots 3-4); o.pop = seconds since it formed
  function inkPose(t) {
    const a = seg(t, SHRINK[1], SHRINK[1] + .5), look = t < 155.6 ? -.8 : t < 155.95 ? -.25 : -.8;
    return { aL: .38 + .12 * sm(t, 155.95, 156.27), aR: .25, lookX: look, lookY: t > 155.6 && t < 155.95 ? .45 : 0, dx: -.25 * sm(t, 155.95, 156.27) };
  }
  function inkChester(t, x, o = {}) {
    const P = inkPose(t), pop = o.pop ?? 9, sq = pop < .5 ? -.22 * Math.exp(-pop * 7) * Math.cos(pop * 26) : 0;
    inkling(x, LAY.chester[1], 19, { of: 'chester', glasses: false, view: 'front', drip: .55, boilKey: 'c7 inkchester', seed: 4, noShadow: true,
      aL: P.aL, aR: P.aR, armR: inkGlassesProp, lookX: P.lookX, lookY: P.lookY, dx: P.dx, sq: sq + (o.sq || 0), dy: o.dy || 0, squint: o.squint || 0, eyeGlow: o.glow ?? 1, ...(o.over || {}) });
    if (pop < .35) { boilSeed('c7 inksplash'); for (let i = 0; i < 9; i++) { const a = i / 9 * TAU + .3, r = 60 + 260 * easeOut(pop / .35); paint(ellPts(x + Math.cos(a) * r, 880 + Math.sin(a) * r * .7, 9 * (1 - pop / .35) + 2, 9 * (1 - pop / .35) + 2, 8), { wash: PC.inkBody, ink: PC.inkRim, sw: .6 }); } }
  }

  // ================================================================ SHOT 4: acceptance
  // shadows on the floor, drawn like chapter 8's: the silhouette mirrored below the feet (a reflection), faint eyes
  function floorShadow(name, x, y, u, pose, o = {}) {
    const k = o.k ?? .5, sk = o.skew ?? 0, a = o.alpha ?? .62; if (a <= .01 || k <= .005) return;
    pose = { ...pose, dy: Math.max(0, pose.dy || 0) };
    const mir = ([px, py]) => { const d = y - py; return [px + sk * d, y + d * k]; };
    const polys = silPolys(name, x, y, u, pose).map(P => P.map(mir)), z = CAM ? CAM.zoom : 1;
    castShadow(polys.map(P => toScreenPts(P)), { alpha: a, blur: 2.5 * z, col: '#1A1230' });
    const e = clamp(o.eyes ?? 0), V = VIEWS[pose.view] || VIEWS.front; if (e <= .02 || !V.face) return;
    const M = BAND[name], sq = pose.sq || 0, fx = (pose.flip ? -1 : 1) * (pose.sx ?? 1) * M.sx * (1 + sq * .6), fy = (pose.sy ?? 1) * M.sy * (1 - sq);
    const bx = x + (pose.dx || 0) * u, by = y + (pose.dy || 0) * u, c = Math.cos(pose.rot || 0), s = Math.sin(pose.rot || 0);
    const Tb = (px, py) => { const X = px * u * fx, Y = py * u * fy; return [bx + X * c - Y * s, by + X * s + Y * c]; };
    const bl = frac(T * .31 + hash(name.length * 3.3)) < .05 ? .12 : 1;
    boilSeed('c7 shadow eyes ' + name);
    for (const sd of V.face.sides) {
      const [ex, ey] = mir(Tb(V.face.cx + sd * 2.5 * V.face.fw + (o.lookX || 0) * .45, -6 + (o.lookY || 0) * .3));
      const h = 1.9 * u * k * fy * bl * e, w = .8 * u * V.face.fw;
      glow(ex, ey, u * 2.2, '#D8F0A0', (o.glowK ?? .3) * e);
      if (h > .6) paint(rectPts(ex - w / 2, ey - h / 2, w, h, u * .04), { wash: '#E6E9C4', washOp: 160 * e, ink: null });
    }
  }
  const MELT = [156.85, 157.3], SLIDE = [157.28, 157.66], UNFOLD = [157.66, 158.12], NOD = B(49, 0), GLON = [159.0, 159.45], TURN = B(49, 1), UP = B(49, 2), LAND = 160.9, ERUPT = B(49, 3), WHIP = TE - .25;
  function chester4(t) {
    const m = mood('chester', t, [[T3 - 1, 'hopeful'], [157.7, 'surprised'], [158.12, 'relieved'], [UP - .05, 'excited']], { take: .55 });
    const offer = sm(t, T3, T3 + .5), drop = sm(t, 157.1, 157.7), look = sm(t, 157.22, 157.46);
    const nod = t > NOD && t < NOD + .62 ? Math.sin((t - NOD) / .62 * Math.PI * 4) * (1 - .35 * seg(t, NOD, NOD + .62)) : 0;   // two nods
    const gl = kf(t, [[GLON[0], 0], [GLON[0] + .2, 1], [GLON[0] + .26, 1], [GLON[1], 2]]);   // glasses on: 0 held · 1 at the face · 2 arm down
    const on = t >= GLON[0] + .24;
    const crouch = sm(t, UP - .42, UP - .02) * (1 - seg(t, UP - .02, UP + .05)), J = jump(t, UP, LAND, 5.2);
    const fly = seg(t, UP, LAND), x = lerp(EDGE_X, LAY.chester[0], ease(fly));
    const turnO = t < TURN ? { view: 'front' } : turn(t, TURN, TURN + .18, 0, -.125);
    const armsUp = backOut(seg(t, UP - .04, UP + .16));
    const o = { ...m, emote: null, boilKey: 'c7 chester', mic: false, glasses: on,
      mouth: t < 157.7 ? 'smile' : t < UP - .05 ? (t > 158.12 ? 'smile' : m.mouth) : 'belt',
      eyes: t > 158.12 && t < 158.55 ? 'closed' : t >= 158.55 && t < UP - .05 ? 'normal' : m.eyes, squint: t >= 158.55 && t < UP - .05 ? .25 : m.squint,
      lookX: lerp(.75, .2, look) - .25 * sm(t, 158.5, 158.65), lookY: lerp(0, 1, look) * (1 - sm(t, 159.02, 159.2)) + .25 * Math.max(0, nod),
      aR: lerp(lerp(.4, .56, offer), -.35, drop), dx: .3 * (1 - drop), rot: .06 * (1 - drop) + .045 * nod,
      aL: gl <= 1 ? lerp(.25, 2.45, gl) : lerp(2.45, .12, gl - 1), frontArm: gl > .25 && gl < 1.7 ? 'L' : undefined, armL: !on ? glassesProp : undefined,
      dy: (m.dy || 0) + .45 * Math.max(0, nod) + J.dy + .5 * crouch, sq: (m.sq || 0) + .09 * Math.max(0, nod) + J.sq + .16 * crouch, ...turnO };
    if (t >= UP - .04) { o.aL = lerp(.12, 1.18, armsUp); o.aR = lerp(-.35, 1.22, armsUp); o.frontArm = undefined; o.mouth = 'belt'; }
    if (t > ERUPT) Object.assign(o, singing(t, 'belt'), { aL: 1.2 + .25 * Math.sin(bpOf(t) * TAU), aR: 1.35 });
    return { x, y: LAY.chester[1], o };
  }
  // the melting Ink: squash down into a puddle, which slides under Chester and unfolds into his shadow
  function puddle(t) {
    if (t < SLIDE[0] || t > UNFOLD[0] + .4) return;
    const sl = ease(seg(t, SLIDE[0], SLIDE[1])), x = lerp(INK_X, EDGE_X + 14, sl), w = 118 + 36 * Math.sin(Math.PI * sl), fade = 1 - seg(t, UNFOLD[0], UNFOLD[0] + .4);
    const stretch = 70 * Math.sin(Math.PI * sl);   // it runs, so it streams out behind (to the right)
    boilSeed('c7 puddle');
    const P = []; for (let i = 0; i < 22; i++) { const a = i / 22 * TAU, r = 1 + .1 * Math.sin(a * 3 + t * 9); P.push([x + Math.cos(a) * w * r + stretch * Math.max(0, Math.cos(a)), 977 + Math.sin(a) * 19 * r]); }
    paint(P, { wash: PC.inkBody, washOp: 255 * fade, ink: fade > .55 ? PC.inkRim : null, sw: 1 });
    for (const sd of [-1, 1]) { const ex = x + sd * 30, ey = 973; glow(ex, ey, 44, '#D8F0A0', .5 * fade); paint(rectPts(ex - 6, ey - 8 * fade, 12, 16 * fade, 1), { wash: '#F4EDC9', ink: null }); }
  }
  // chapter-7's crowd dives in: each Ink arcs into its owner's feet (targets: floor shadows, or under the furniture)
  const DIVE_AT = { mike: [LAY.mike[0], 1010], chester: [LAY.chester[0], 1015], brad: [LAY.brad[0], 812], phoenix: [LAY.phoenix[0], 812], joe: [LAY.joe[0], 812], rob: [LAY.drums, 872] };
  function diveOf(c, t) {
    const t0 = UP + .12 + .16 * hash(c.i * 2.1 + 5), dur = .4 + .16 * hash(c.i * 3.7 + 1), k = seg(t, t0, t0 + dur);
    return { k, t0, dur, to: DIVE_AT[c.of] };
  }
  function diveCrowd(t) {                // the flying Inks (drawn over everything on the island)
    for (const c of CROWD) {
      const d = diveOf(c, t); if (d.k <= 0 || d.k >= 1) continue;
      const hgt = 180 + 160 * hash(c.i + 30), p = arcPt([c.x, c.y - 4 * c.u], d.to, hgt, easeIn(d.k) * .35 + d.k * .65), q = arcPt([c.x, c.y - 4 * c.u], d.to, hgt, Math.min(1, d.k + .05));
      const ang = Math.atan2(q[1] - p[1], q[0] - p[0]), u = lerp(c.u, c.u * .8, d.k);
      if (!inView(p[0] - 150, p[0] + 150, p[1] - 150, p[1] + 150)) continue;
      inkling(p[0], p[1] + 4 * u, u, { of: c.of, view: c.view === 'back' || c.view === 'qback' ? 'front' : c.view, flip: c.flip, noShadow: true, drip: 0, rot: ang + Math.PI / 2, sq: -.28, aL: 1.4, aR: 1.4, boilKey: 'c7 ink' + c.i, seed: c.i, smear: .4, smearDir: 0 });
    }
  }
  function splashes(t) {                  // little ink splashes where they land
    for (const c of CROWD) {
      const d = diveOf(c, t), age = t - (d.t0 + d.dur); if (age < 0 || age > .35) continue;
      if (!inView(d.to[0] - 100, d.to[0] + 100, d.to[1] - 100, d.to[1] + 100)) continue;
      boilSeed('c7 splash' + c.i);
      for (let i = 0; i < 5; i++) { const a = -Math.PI * (.15 + .7 * i / 4), r = 20 + 90 * easeOut(age / .35); paint(ellPts(d.to[0] + Math.cos(a) * r, d.to[1] + Math.sin(a) * r * .6 + 60 * age * age * 9, 6 * (1 - age / .35) + 1.5, 6 * (1 - age / .35) + 1.5, 7), { wash: PC.inkBody, ink: null }); }
    }
  }
  const landed = (name, t) => { let n = 0, m = 0; for (const c of CROWD) if (c.of === name) { m++; const d = diveOf(c, t); if (t > d.t0 + d.dur) n++; } return m ? n / m : 0; };
  // eyes under the furniture for the members whose shadows hide there
  function underEyes(t) {
    for (const [name, x, y] of [['joe', LAY.joe[0], 790], ['rob', LAY.drums, 850], ['brad', LAY.brad[0], 796], ['phoenix', LAY.phoenix[0], 796]]) {
      const e = ease(clamp(landed(name, t) * 1.6)); if (e <= .02 || !inView(x - 80, x + 80, y - 80, y + 80)) continue;
      boilSeed('c7 undereyes' + name);
      castShadow([toScreenPts(ellPts(x, y + 12, 100, 15, 18))], { alpha: .62 * e, blur: 2.5 * (CAM ? CAM.zoom : 1), col: '#1A1230' });
      const bl = frac(t * .37 + hash(name.length)) < .05 ? .15 : 1;
      for (const sd of [-1, 1]) { glow(x + sd * 22, y + 8, 34, '#D8F0A0', .5 * e); paint(rectPts(x + sd * 22 - 5, y + 8 - 9 * e * bl, 10, 18 * e * bl, 1), { wash: '#E6E9C4', ink: null }); }
    }
  }
  const WIND = cam(1946 + 5540 * .25 / 4, 792, 1.14);   // quartic ease-in from here reaches 5540 world px/s (300 px/frame at zoom 1.3) at the cut
  const CAM4 = t => {
    let c = mixCam(CLOSE, cam(2480, 895, 1.72), sm(t, T3, GLON[1]));
    c = mixCam(c, cam(2270, 812, 1.18), sm(t, GLON[1], UP - .1));
    c = mixCam(c, cam(1720, 712, .74), easeOut(seg(t, UP + .2, UP + .6)));
    c.cx += 14 * Math.sin((t - T3) * 1.1) * sm(t, UP + .4, UP + .7);
    c = mixCam(c, WIND, sm(t, 161.1, WHIP));
    if (t > WHIP) { const w = seg(t, WHIP, TE), q = w * w * w * w; c = cam(lerp(WIND.cx, 1946, q), lerp(WIND.cy, 796, q), lz(WIND.z, 1.3, q)); }
    const sh = shakeXY(t, 10 * Math.exp(-Math.max(0, t - ERUPT) * 6) * (t > ERUPT ? 1 : 0));
    return cam(c.cx + sh[0] / c.z, c.cy + sh[1] / c.z, c.z);
  };
  function acceptWorld(t, c) {
    const ch = chester4(t), melt = seg(t, MELT[0], MELT[1]), ink = t < MELT[1];
    const inkSq = .85 * easeIn(melt), inkArms = lerp(0, 1, ease(melt));
    const erupt = t > ERUPT ? Math.exp(-(t - ERUPT) * 2.5) : 0;
    const hopM = jump(t, ERUPT - .02, ERUPT + .55, 4), sh = sm(t, UNFOLD[0], UNFOLD[1]), eyesC = ease(seg(t, 157.8, 158.0));
    const shK = .5 * backOut(seg(t, UNFOLD[0], UNFOLD[1])), dive = t > UP;
    world(t, c, {
      style: { mike: 'hype', chester: 'idle' }, skip: ['chester'], eyes: 1, halo: 1,
      over: t > ERUPT - .05 ? { mike: { dy: hopM.dy, sq: hopM.sq }, rob: {}, brad: { dy: -1.2 * erupt }, phoenix: { dy: -1.2 * erupt } } : {},
      lampFlare: .8 * erupt,
      crowd: { freeze: 1, at: t < 159.3 ? [2480, 900] : [1800, 800], haze: .7, hide: dive },
      floorBefore: () => {
        const mk = ease(clamp(landed('mike', t) * 1.4));
        if (mk > .01) floorShadow('mike', LAY.mike[0], LAY.mike[1], 19, { view: 'front', aL: .9, aR: Math.PI - .14 }, { k: .5 * mk, skew: .03, alpha: .62 * mk, eyes: mk });
      },
      floorAfter: () => {
        if (melt > 0 && t < SLIDE[0] + .03) { boilSeed('c7 meltpool'); const r = 30 + 95 * ease(melt); paint(ellPts(INK_X, 976, r, 10 + 9 * ease(melt), 18), { wash: PC.inkBody, ink: PC.inkRim, sw: 1 }); }
        if (ink) inkChester(t, INK_X, { sq: inkSq, over: { aL: lerp(inkPose(t).aL, -.9, inkArms), aR: lerp(.25, -.8, inkArms), drip: .55 + 2.2 * melt, lookY: .6 * melt, dx: inkPose(t).dx + .25 * Math.sin(melt * 18) * melt * (1 - melt) * 4, rot: .06 * Math.sin(melt * 14) * melt } });
        puddle(t);
        if (t > UNFOLD[0]) floorShadow('chester', ch.x, ch.y, 19, ch.o, { k: shK, skew: lerp(.18, .3, seg(t, UP, LAND)), alpha: .62 * sh, eyes: eyesC, lookX: -.2, lookY: -.6, glowK: .3 + .5 * (1 - seg(t, 158.2, 159)) });
        member('chester', ch.x, ch.y, 19, ch.o);
        if (t > 156.05 && t < 156.95) { const k = Math.sin(Math.PI * seg(t, 156.05, 156.95)); boilSeed('c7 touch'); glow(2527, 862, 70 + 30 * k, '#FFE3A8', .8 * k); }
        if (t > GLON[0] + .22 && t < GLON[0] + .62) { const g = seg(t, GLON[0] + .22, GLON[0] + .62); boilSeed('c7 glint'); glow(ch.x + 2.6 * 19 * .93, ch.y - 6.7 * 19 * 1.07, 30 + 90 * Math.sin(Math.PI * g), '#FFF3D0', .9 * Math.sin(Math.PI * g)); }
      },
      lit: () => { underEyes(t); if (dive) { diveCrowd(t); splashes(t); } }
    });
  }
  function shotAccept(t, lt, dur) {
    const c = CAM4(t);
    if (t < WHIP) { acceptWorld(t, c); return; }
    // the whip: the frame smeared along the move, plus painted streaks (the same recipe chapter 8 lands with)
    const c0 = CAM4(t - 1 / 24), v = (c.cx - c0.cx) * c.z;
    if (Math.abs(v) < 60) { acceptWorld(t, c); return; }
    paintLayer('c7whip', () => acceptWorld(t, c));
    blit('c7whip', 0, 1);
    const n = clamp(Math.ceil(Math.abs(v) / 11), 6, 40);
    for (let i = 1; i < n; i++) blit('c7whip', v * (i / (n - 1) - .5), 1 / (i + 1));
    const k = clamp(Math.abs(v) / 420), cols = ['#2A2140', '#3A2F52', '#6E2B2F', '#D97757', '#F2A283', '#E9DFC8', '#CDBF9F', '#7A5238', '#15111F', '#F4E3BC'];
    for (let i = 0; i < 16; i++) {
      const y = 40 + 1000 * hash(i * 3.1 + 2), x = W * hash(i * 7.3 + Math.floor(t * 24)), len = (200 + 700 * hash(i + 9)) * k;
      boilSeed('c7 streak' + i);
      inkLine([[x - len / 2, y], [x, y + 4 * (hash(i + 4) - .5)], [x + len / 2, y]], (1.6 + 2.4 * hash(i + 2)) * k, cols[Math.floor(clamp(y / H) * 9.99)], 'dry', .3);
    }
  }
  function blit(name, dx, a) {
    const L = LAYERS[name]; if (!L) return;
    flushBrush();
    screenDraw(() => { if (a < 1) tint(255, 255 * a); image(L, dx, 0); noTint(); });
  }

  shots([[T0, shotRip], [T1, shotMosh], [T2, shotMirror], [T3, shotAccept]]);
})();
