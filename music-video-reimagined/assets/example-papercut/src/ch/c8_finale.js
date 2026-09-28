// c8_finale.js: Final part 2: the world repairs (barT(50) = 161.861 to HIT.silence = 185.95). Bars 50-57.
//
// SHOT PLAN (video times; half-time groove: beat = 0.799 s, bar = 3.197 s)
// Music: the last chorus and the outro at full power; the final flurry of hits at 184.26 / 184.46 (the biggest) /
// 184.65; the band rings out from ~185.0 and the audio cuts to silence at 185.95.
// World: chapter 7's torn island of parlor floor (same outline: rug, couch, kit, desk, floor lamp A) adrift in the
// ink void -> the two torn halves of the paper world swing back round the island (chapter 7's curtains, reversed)
// and knit shut -> the warm parlor, restored and blazing, portrait 'stern', paper confetti. Every member now owns an
// ink shadow with faint eyes (chapter 7's ending); the band has accepted them.
//
// A  TWO VOICES  161.861-168.256 (bars 50-51)  [in: mid whip pan to the LEFT, smeared, landing on Mike]
//    161.86-162.24  the whip decelerates (smear and streaks fading) and lands on a close-up of Mike on the island.
//    162.24-164.40  Mike raps to camera. Under his feet his ink shadow lies on the rug like a reflection and plays
//                   along, faint eyes blinking. A long wallpaper strip glides through the air behind him.
//    164.46-164.86  he flings his mic arm out at Chester: your turn.
//    164.86-165.30  whip pan right (smear) along the island to Chester, fastest on the bar-51 downbeat.
//    165.30-167.40  Chester belts, eyes shut; his shadow plays along under him. Great-Grand-Clawd's portrait tumbles
//                   through the void behind him, drifting home. The void's far eyes close one by one.
//    167.46         Chester throws both arms up and looks up...
//    167.70-168.80  ...and the camera pulls back fast (carried across the cut) to the whole island in the void: scraps
//                   of the parlor (wallpaper strips, the portrait, the desk's lost table lamp) spiral back to it.
//    reads: Mike's voice (2.2 s) · his shadow plays along (the same frames, under him) · the hand-off (0.4 s) ·
//           Chester's voice (2.2 s) · the portrait coming home (1.5 s, behind him) · the world returning (pull-back)
// B  THE WORLD REPAIRS  168.256-174.650 (bars 52-53)  [in: the pull-back, continued]
//    168.26-169.05  wide: the island adrift, scraps converging on it.
//    169.05-171.45  the two halves of the world swing back in from both sides, sliding and rising, their curled torn
//                   edges flattening. The band glances left, then right. The table lamp settles onto Joe's desk.
//    171.45         they meet behind the band with a thump (bar-53 downbeat); a V of void is still open above them.
//    171.50-172.40  the seam zips shut from the band up to the ceiling: a spark runs up the tear, the fibres
//                   interlock behind it, stitches cross the seam. The band looks up with it.
//    171.90-172.80  the island's own torn rim knits into the floor; the peeled wallpaper rolls back up and the
//                   cracks close; paper shreds puff out of the seam and flutter down (the first confetti).
//    172.20-172.62  the portrait swoops in over lamp A and hangs itself back on its nail: stern. It swings, settles.
//    172.75-173.05  the lamps stutter... and blaze on at 173.05: warm light floods the room; the band's shadows leap
//                   from the floor up onto the wallpaper.
//    173.05-173.85  delight. 173.85-174.45: Chester crouches, eyeing the couch, and leaps at 174.45.
//    reads: the island adrift (0.8 s) · the halves come back (2.4 s) · the thump · the zip (0.9 s) · the portrait
//           home (0.5 s) · the lamps (0.8 s) · Chester's leap (carried over the cut)
// C  FULL BLAST  174.650-181.045 (bars 54-55)  [in: cut on action, Chester mid-leap]
//    174.65         paper confetti (shredded strips of the world's paper) bursts from the ceiling and pours down.
//    175.45         Chester lands standing on the couch (squash). Brad and Phoenix play back to back on the rug.
//    175.45-177.85  Chester belts from the couch, Rob hits the crashes, Joe scratches like mad, Mike hypes. The lamps
//                   throw the band's shadows big on the wallpaper: they dance along, normal-looking...
//    177.05         ...except Mike's shadow jumps a beat early; Mike jumps on the downbeat (177.85), Rob double crash.
//    179.45         Chester's shadow throws its arms up a beat before Chester does (180.25).
//    reads: the party (0.8 s) · Chester onto the couch (0.8 s) · the band triumphant · the shadow ahead (a hint)
// D  THE LAST HITS  181.045-185.95 (bars 56-57)  [in: snap zoom on the downbeat]
//    181.05  snap to Chester on the couch: the scream, lid wide, arms flung out.
//    181.84  snap to Mike, pointing at the lens.
//    182.64  snap to Brad and Phoenix, back to back, guitars up.
//    183.44  snap to Joe, scratching like mad.      183.84  snap to Rob, sticks flying in the fill.
//    184.24  snap back out to the wide: everyone crouches on the first flurry hit (184.26)...
//    184.46  ...ALL SIX JUMP on the biggest hit (camera kick)...
//    184.65  ...and the frame FREEZES in mid-air on the third (a camera-flash pop): the poster. Only the boil and a
//            slow push go on while the band rings out. Joe holds up a record; the portrait's stern face peeks
//            over Chester's mohawk; Mike's wall shadow has already landed (a beat ahead of him).
//    [out: smash cut to silence at 185.95 (chapter 9)]
(() => {
  // ================================================================ time
  const T50 = barT(50), T51 = barT(51), T52 = barT(52), T53 = barT(53), T54 = barT(54), T55 = barT(55), T56 = barT(56), T57 = barT(57);
  const B = (k, b = 0) => beatT(k, b);
  const [FL1, FL2, FL3] = HIT.lastHits;
  const T42 = barT(42);                                   // chapter 7's start (its void scraps drift from here)
  const sm = (t, a, b) => ease(seg(t, a, b));
  const lz = (a, b, k) => Math.exp(lerp(Math.log(a), Math.log(b), k));
  const cam = (cx, cy, z) => ({ cx, cy, z });
  const mixCam = (a, b, k) => cam(lerp(a.cx, b.cx, k), lerp(a.cy, b.cy, k), lz(a.z, b.z, k));
  const dec = (x, k = 7) => x < 0 ? 0 : Math.exp(-x * k);

  // ================================================================ geometry helpers (as chapter 7 uses them)
  function chunks(P, n = 12) { const out = []; for (let i = 0; i < P.length - 1; i += n - 1) out.push(P.slice(i, Math.min(P.length, i + n))); return out; }
  function polyArea(P) { let a = 0; for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length]; a += p[0] * q[1] - q[0] * p[1]; } return a / 2; }
  function clipConvex(subject, clip) {
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
  function rowSpan(P, y) { let lo = Infinity, hi = -Infinity; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const a = P[i], b = P[j]; if ((a[1] > y) !== (b[1] > y)) { const x = a[0] + (y - a[1]) * (b[0] - a[0]) / (b[1] - a[1]); lo = Math.min(lo, x); hi = Math.max(hi, x); } } return [lo, hi]; }
  function offsetLine(P, w, side, s = 3) {
    return P.map((p, i) => { const a = P[Math.max(0, i - s)], b = P[Math.min(P.length - 1, i + s)], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [p[0] + side * (-dy / L) * w, p[1] + side * (dx / L) * w]; });
  }
  const rig = (q, r, d) => { const c = Math.cos(r), s = Math.sin(r); return ([x, y]) => [q[0] + (x - q[0]) * c - (y - q[1]) * s + d[0], q[1] + (x - q[0]) * s + (y - q[1]) * c + d[1]]; };
  // a smooth path through waypoints, walked by arc length (k 0..1)
  function mkPath(Wp) { const P = through(Wp, 10), L = [0]; for (let i = 1; i < P.length; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1])); return { P, L, len: L[L.length - 1] }; }
  function pathAt(pa, k) {
    const d = clamp(k) * pa.len; let i = 1; while (i < pa.L.length - 1 && pa.L[i] < d) i++;
    const a = pa.L[i - 1], b = pa.L[i], q = b > a ? clamp((d - a) / (b - a)) : 0; return [lerp(pa.P[i - 1][0], pa.P[i][0], q), lerp(pa.P[i - 1][1], pa.P[i][1], q)];
  }

  // ================================================================ layers
  // A layer composited through polygons (SCREEN px), moved as a rigid sheet: rotate r about (px, py), then move by
  // (dx, dy). The polygons are given in the layer's own (unmoved) coordinates.
  let MASK8 = null;
  function showMoved(name, polys, tf = {}, o = {}) {
    const L = LAYERS[name]; if (!L) return;
    flushBrush();
    if (!MASK8) { MASK8 = document.createElement('canvas'); MASK8.width = W; MASK8.height = H; }
    const setT = c => { c.setTransform(1, 0, 0, 1, 0, 0); c.translate((tf.dx || 0) + (tf.px || 0), (tf.dy || 0) + (tf.py || 0)); c.rotate(tf.r || 0); c.translate(-(tf.px || 0), -(tf.py || 0)); };
    const g = SHOW_POOL[SHOW_I] || (SHOW_POOL[SHOW_I] = _gfx()); SHOW_I++;
    const s = g.drawingContext;
    s.setTransform(1, 0, 0, 1, 0, 0); s.globalCompositeOperation = 'source-over'; s.clearRect(0, 0, W, H);
    setT(s); s.drawImage(L.drawingContext.canvas, 0, 0); s.setTransform(1, 0, 0, 1, 0, 0);
    if (polys) {
      const m = MASK8.getContext('2d');
      m.setTransform(1, 0, 0, 1, 0, 0); m.globalCompositeOperation = 'source-over'; m.clearRect(0, 0, W, H);
      m.filter = o.feather ? `blur(${o.feather}px)` : 'none';
      setT(m); m.fillStyle = '#000'; _pathPolys(m, polys); m.fill('nonzero'); m.setTransform(1, 0, 0, 1, 0, 0); m.filter = 'none';
      s.globalCompositeOperation = 'destination-in'; s.drawImage(MASK8, 0, 0); s.globalCompositeOperation = 'source-over';
    }
    screenDraw(() => { if (o.alpha != null && o.alpha < 1) tint(255, 255 * clamp(o.alpha)); image(g, 0, 0); noTint(); });
  }
  function blit(name, dx, a) {   // a whole layer, shifted sideways (for the whip smear)
    const L = LAYERS[name]; if (!L) return;
    flushBrush();
    screenDraw(() => { if (a < 1) tint(255, 255 * a); image(L, dx, 0); noTint(); });
  }

  // ================================================================ the island (chapter 7's outline, world coords)
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
  const RUG = Array.from({ length: 48 }, (_, i) => [1850 + Math.cos(i / 48 * TAU) * 980, 935 + Math.sin(i / 48 * TAU) * 150]);
  const RUG_ON = clipConvex(ISL.P, RUG);
  const BOARDS = [817, 844, 881, 928, 985, 1052].map(y => [y, rowSpan(ISL.P, y)]);
  const SEAM_X = y => { for (let i = 1; i < TEAR_TOP.length; i++) if (TEAR_TOP[i][1] >= y) { const a = TEAR_TOP[i - 1], b = TEAR_TOP[i], q = (y - a[1]) / ((b[1] - a[1]) || 1); return lerp(a[0], b[0], q); } return TEAR_TOP[TEAR_TOP.length - 1][0]; };

  // ================================================================ the void (chapter 7's, calming down)
  const VA = [1500, 820];
  const vcam = (c, d) => [VA[0] + (c.cx - VA[0]) * d, VA[1] + (c.cy - VA[1]) * d, Math.pow(c.z, d)];
  const VD = {
    blot: Array.from({ length: 7 }, (_, i) => ({ x: -900 + 4800 * hash(i * 2.3 + 1), y: -600 + 2800 * hash(i * 4.1 + 2), r: 520 + 520 * hash(i + 5), c: [PC.inkWall2, PC.mold, '#2A1D3C', PC.inkWall][i % 4] })),
    eyes: Array.from({ length: 30 }, (_, i) => ({ d: .2 + .32 * hash(i * 3.1 + 7), x: -1300 + 5600 * hash(i * 5.3 + 1), y: -1000 + 3500 * hash(i * 7.7 + 2), s: .7 + .7 * hash(i * 1.9 + 3), shut: 162.3 + 4.6 * hash(i * 9.1 + 4), red: hash(i * 2.7 + 8) > .86 })),
    chalk: Array.from({ length: 30 }, (_, i) => ({ d: .34 + .5 * hash(i * 6.1 + 3), x: -1600 + 6200 * hash(i * 3.9 + 5), y: -1200 + 3900 * hash(i * 8.3 + 6), s: 1.3 + 1.2 * hash(i + 11), k: ['spiral', 'eye', 'tally', 'face', 'cross', 'arrow'][i % 6] })),
    scraps: Array.from({ length: 16 }, (_, i) => ({ d: .45 + .5 * hash(i * 4.4 + 9), x: -900 + 5000 * hash(i * 2.9 + 12), y: -700 + 3000 * hash(i * 5.7 + 13), sz: 38 + 60 * hash(i + 21), vx: (hash(i + 31) - .5) * 40, vy: 8 + 16 * hash(i + 41), w: (hash(i + 51) - .5) * 1.2, fw: .5 + 1.5 * hash(i + 61), kind: i % 3 }))
  };
  function farEye(x, y, s, open, look = 0, red = false) {
    const h = 24 * s * open, w = 8 * s, gap = 26 * s;
    glow(x, y, 58 * s, red ? '#FF3B2E' : '#D8F0A0', .5 * clamp(open * 1.5));
    if (h > 1.2) for (const sd of [-1, 1]) paint(rectPts(x + sd * gap / 2 - w / 2 + look * 3 * s, y - h / 2, w, h, s * .4), { wash: red ? '#FF6A50' : '#F4EDC9', ink: null });
  }
  function blinkK(t, i) { const p = frac((t + hash(i * 1.3) * 9) / (2.6 + 2.5 * hash(i + 2))); return p < .045 ? .08 : 1; }
  function scrap(i, x, y, sz, ang, fl, kind, d) {
    const pts = []; for (let k = 0; k < 7; k++) { const a = k / 7 * TAU + hash(i * 3 + k) * .6, r = sz * (.55 + .45 * hash(i * 7 + k)); pts.push([Math.cos(a) * r, Math.sin(a) * r * .75]); }
    const dim = lerp(.62, .3, clamp((d - .45) / .5)), front = fl > 0, col = kind === 1 ? PC.wains : kind === 2 ? PC.floor : PC.wall;
    push(); translate(x, y); rotate(ang); scale(Math.max(.08, Math.abs(fl)), 1);
    paint(pts, { wash: mixCol(front ? col : '#D8C9A8', PC.inkBg, dim), ink: mixCol(PC.chalkDim, PC.inkBg, dim * .6), sw: .8 });
    if (front && kind === 0) paint(starPts(0, 0, sz * .42, .22, 4, -Math.PI / 2), { wash: mixCol(PC.damask, PC.inkBg, dim * .6), ink: null });
    pop();
  }
  // the scraps chapter 7 left drifting; from bar 50 they are pulled home, spiralling in toward the island
  const HOME = k => ease(clamp(k));
  function drawVoid(t, c) {
    boilSeed('c8 void base');
    paint(rectPts(-80, -80, W + 160, H + 160), { wash: PC.inkBg, ink: null });
    { const [vx, vy, vz] = vcam(c, .12); camBegin(vx, vy, vz);
      VD.blot.forEach((b, i) => { boilSeed('c8 blot' + i); paint(ellPts(b.x, b.y, b.r, b.r * .7, 18), { fill: b.c, fillOp: 70, bleed: .3, tex: .8, border: .6, ink: null }); });
      camEnd(); }
    // the far eyes (open since the rip) shut one by one: nothing out there is watching any more
    VD.eyes.forEach((e, i) => {
      const op = (1 - ease(seg(t, e.shut, e.shut + .22))) * blinkK(t, i); if (op < .03) return;
      const [vx, vy, vz] = vcam(c, e.d); camBegin(vx, vy, vz);
      if (inView(e.x - 60, e.x + 60, e.y - 60, e.y + 60)) { boilSeed('c8 feye' + i); farEye(e.x, e.y, e.s, op, Math.sin(t * .7 + i), e.red); }
      camEnd();
    });
    VD.chalk.forEach((m, i) => {
      const [vx, vy, vz] = vcam(c, m.d); camBegin(vx, vy, vz);
      if (inView(m.x - 80, m.x + 80, m.y - 80, m.y + 80)) { boilSeed('c8 chalk' + i); chalkMark(m.k, m.x, m.y, m.s, i, m.d > .6 ? PC.chalk : PC.chalkDim); }
      camEnd();
    });
    VD.scraps.forEach((p, i) => {
      const age = t - T42, x0 = p.x + p.vx * age, y0 = p.y + p.vy * age, k = HOME(seg(t, T50 + .3 * hash(i + 3), T53 - .8 * hash(i + 4)));
      const sp = k * (2.2 + hash(i + 5)), dx = x0 - VA[0], dy = y0 - VA[1], cs = Math.cos(sp), sn = Math.sin(sp), r = 1 - .8 * k;
      const x = VA[0] + (dx * cs - dy * sn) * r, y = VA[1] + (dx * sn + dy * cs) * r;
      const [vx, vy, vz] = vcam(c, p.d);
      camBegin(vx, vy, vz);
      if (inView(x - 150, x + 150, y - 150, y + 150)) { boilSeed('c8 scrap' + i); scrap(i, x, y, p.sz, p.w * age + i + sp, Math.cos(p.fw * age + i * 1.7), p.kind, p.d); }
      camEnd();
    });
  }

  // ================================================================ the island, painted (as chapter 7 paints it)
  function islandBase(t, c, o = {}) {
    const z = c.z, halo = o.halo ?? 1, fl = o.float ?? 1;
    boilSeed('c8 halo');
    glow(1500, 900, 1900, '#FFB35A', .2 * halo);
    glow(LAY.lampA, 700, 900, '#FFC766', .22 * halo);
    if (fl > .02) castShadow([toScreenPts(ISL.P.map(([x, y]) => [x + 22, y + 58]))], { alpha: .75 * fl, blur: 16, col: '#000000' });
    boilSeed('c8 floor');
    paint(ISL.P, { wash: PC.floor, fill: PC.floorDk, fillOp: 110, bleed: .05, tex: .7, ink: null });
    BOARDS.forEach(([y, [a, b]], k) => { if (b - a > 60) { boilSeed('c8 board' + k); inkLine([[a + 12, y], [b - 12, y + 2]], .45 / Math.min(1, z), PC.floorDk, 'inkfine', 0); } });
    boilSeed('c8 rug');
    paint(RUG_ON, { wash: PC.rug, fill: PC.rugDk, fillOp: 100, bleed: .12, tex: .9, border: .8, ink: null });
    for (let i = 0; i < 40; i++) {
      const a = i / 40 * TAU, x = 1850 + Math.cos(a) * 980, y = 935 + Math.sin(a) * 150;
      if (inPoly([x, y], ISL.P) && inPoly([x + Math.cos(a) * 14, y + Math.sin(a) * 6 + 4], ISL.P)) inkLine([[x, y], [x + Math.cos(a) * 14, y + Math.sin(a) * 6 + 4]], .5, PC.rugDk, 'inkfine', 0);
    }
    boilSeed('c8 isl light');
    paint(ellPts(LAY.lampA + 200, 930, 900, 170, 24), { fill: '#FFE3A8', fillOp: 40 * halo, bleed: .3, tex: .3, ink: null });
    for (const [x, y] of [[520, 950], [2520, 980]]) paint(ellPts(x, y, 260, 150, 18), { fill: '#2A1620', fillOp: 70, bleed: .3, tex: .4, ink: null });
  }
  function islandEdge(z, k = 1) {   // k: 1 = torn, 0 = healed
    if (k <= .02) return;
    boilSeed('c8 isl edge');
    const P = ISL.P.concat([ISL.P[0]]), s = 1 / Math.max(.45, Math.min(1.6, z));
    for (const C of chunks(P, 14)) tearEdge(C, { sw: 1.25 * s * k, shadow: false });
    for (const C of chunks(FRONT_EDGE, 14)) inkLine(C.map(([x, y]) => [x, y + 3.2 * s]), 1.6 * s * k, '#3A2430', 'inkfine', .2);
  }

  // ================================================================ floor ink shadows (A, B)
  // Each member's accepted shadow lies on the floor from its feet toward us, mirrored like a reflection, and plays
  // along with them. Faint eyes where its head is. pose = the member's pose (as silPolys takes it).
  function silPose(name, o) {   // the pose as memberOpts will actually draw it (mic arm at the mouth, guitar arms)
    const q = { ...o }, M = BAND[name], V = VIEWS[o.view] || VIEWS.front, side = o.mic ?? M.mic;
    if (side && o.inst !== false && (o.micAt ?? 'mouth') === 'mouth' && V === VIEWS.front) q[side === 'L' ? 'aL' : 'aR'] = Math.PI - .14 + (o.micBob ?? 0);
    if (o.inst !== false && (name === 'brad' || name === 'phoenix') && !(V.back || V === VIEWS.qback)) { if (o.aL === undefined) q.aL = -1.1; if (o.aR === undefined) q.aR = -1.2; }
    return q;
  }
  function floorShadow(name, x, y, u, pose, o = {}) {
    const k = o.k ?? .5, sk = o.skew ?? 0, a = o.alpha ?? .62; if (a <= .01) return;
    pose = { ...pose, dy: Math.max(0, pose.dy || 0) };   // planted: it stays on the floor when its owner hops
    const mir = ([px, py]) => { const d = y - py; return [px + sk * d, y + d * k]; };
    const polys = silPolys(name, x, y, u, pose).map(P => P.map(mir)), z = CAM ? CAM.zoom : 1;
    castShadow(polys.map(P => toScreenPts(P)), { alpha: a, blur: 2.5 * z, col: '#1A1230' });
    const e = clamp(o.eyes ?? 0), V = VIEWS[pose.view] || VIEWS.front; if (e <= .02 || !V.face) return;
    const M = BAND[name], sq = pose.sq || 0, fx = (pose.flip ? -1 : 1) * (pose.sx ?? 1) * M.sx * (1 + sq * .6), fy = (pose.sy ?? 1) * M.sy * (1 - sq);
    const bx = x + (pose.dx || 0) * u, by = y + (pose.dy || 0) * u, c = Math.cos(pose.rot || 0), s = Math.sin(pose.rot || 0);
    const Tb = (px, py) => { const X = px * u * fx, Y = py * u * fy; return [bx + X * c - Y * s, by + X * s + Y * c]; };
    const bl = frac(T * .31 + hash(name.length * 3.3)) < .05 ? .12 : 1;
    boilSeed('c8 shadow eyes ' + name);
    for (const sd of V.face.sides) {
      const [ex, ey] = mir(Tb(V.face.cx + sd * 2.5 * V.face.fw + (o.lookX || 0) * .45, -6 + (o.lookY || 0) * .3));
      const h = 1.9 * u * k * fy * bl * e, w = .8 * u * V.face.fw;
      glow(ex, ey, u * 2.2, '#D8F0A0', .3 * e);
      if (h > .6) paint(rectPts(ex - w / 2, ey - h / 2, w, h, u * .04), { wash: '#E6E9C4', washOp: 160 * e, ink: null });
    }
  }

  // ================================================================ drifting things coming home (A, B)
  // a strip of wallpaper, tumbling: front = cream stripes and a damask spark, back = plain paper
  function wallStrip(x, y, w, h, rot, fl, seed) {
    push(); translate(x, y); rotate(rot); scale(Math.max(.07, Math.abs(fl)), 1);
    boilSeed('c8 wstrip' + seed);
    const top = tearLine([-w / 2, -h / 2], [w / 2, -h / 2], seed, 7, 7), bot = tearLine([w / 2, h / 2], [-w / 2, h / 2], seed + 5, 7, 7), P = top.concat(bot);
    if (fl >= 0) {
      paint(P, { wash: PC.wall, ink: null });
      paint([[w * .02, -h / 2 + 8], [w / 2 - 3, -h / 2 + 8], [w / 2 - 3, h / 2 - 8], [w * .02, h / 2 - 8]], { wash: PC.wall2, ink: null });
      inkLine([[w * .02, -h / 2 + 10], [w * .02, h / 2 - 10]], .5, '#C9B089', 'inkfine', 0);
      for (let k = 0; k < 2; k++) {
        const cy = -h * .2 + k * h * .42;
        paint(starPts(w * .26, cy, w * .28, .22, 4, -Math.PI / 2), { wash: PC.damask, washOp: 215, ink: null });
        paint(starPts(w * .26, cy, w * .17, .3, 4, -Math.PI / 4), { wash: PC.damask, washOp: 215, ink: null });
      }
      paint(P, { ink: PAL.ink, sw: .7 });
    } else paint(P, { wash: '#E6D8BA', fill: '#C9B089', fillOp: 60, tex: .5, ink: PAL.ink, sw: .7 });
    pop();
  }
  const STRIPS = [   // wallpaper strips: path waypoints (world), time span, size, spin; front: drawn over the island
    { W: [[2330, 740], [1960, 790], [1560, 760], [1160, 700], [650, 470], [150, 280], [-350, 330]], t0: 162.1, t1: 169.2, w: 92, h: 330, spin: .5, flip: 1.3, front: [162, 166.8] },
    { W: [[3500, -150], [3150, 150], [2850, 330], [2700, 420]], t0: 166.2, t1: 171.3, w: 80, h: 280, spin: -.5, flip: 1.1 },
    { W: [[-700, -80], [-250, 170], [150, 330], [320, 420]], t0: 166.4, t1: 171.3, w: 86, h: 300, spin: .6, flip: 1.6 },
    { W: [[3400, 1500], [3000, 1320], [2750, 1200]], t0: 166.8, t1: 171.3, w: 70, h: 250, spin: .4, flip: .9 },
    { W: [[-500, 1450], [-50, 1330], [300, 1230]], t0: 167.0, t1: 171.3, w: 76, h: 260, spin: -.45, flip: 1.4 },
    { W: [[1200, -700], [1250, -250], [1320, 120]], t0: 167.1, t1: 171.3, w: 84, h: 290, spin: .35, flip: 1.2 }
  ];
  const STRIP_P = STRIPS.map(s => mkPath(s.W));
  function drawStrips(t, front) {
    STRIPS.forEach((s, i) => {
      if (t < s.t0 || t > s.t1) return;
      const isFront = s.front && t >= s.front[0] && t < s.front[1]; if (isFront !== front) return;
      const k = seg(t, s.t0, s.t1), [x, y] = pathAt(STRIP_P[i], i ? easeOut(k) : k), a = t - s.t0;
      if (!inView(x - 300, x + 300, y - 300, y + 300)) return;
      wallStrip(x, y, s.w, s.h, .9 + s.spin * a + i, Math.cos(s.flip * a + i * 1.3), 40 + i * 7);
    });
  }
  // Great-Grand-Clawd's portrait: tumbles in from the far right, circles the island and hangs itself on its nail
  const PWAIT = [1250, 120], NAIL = [LAY.portrait[0], LAY.portrait[1]];
  const PORT_P = mkPath([[3350, 700], [2900, 690], [2480, 680], [2330, 430], [2160, 140], [1850, -60], [1500, -40], PWAIT]);
  const PORT0 = 164.7, PORT1 = 171.3, SWOOP0 = 172.2, DOCK = 172.62;
  function portraitAt(t) {
    if (t < PORT0) return null;
    if (t >= DOCK) return { x: NAIL[0], y: NAIL[1], s: 1, rot: 0, swing: .1 * spring(t, DOCK, 3.2, 9), dock: true };
    const k = seg(t, PORT0, PORT1), hover = seg(t, PORT1, SWOOP0);
    let [x, y] = pathAt(PORT_P, 1 - Math.pow(1 - k, 1.5));
    const bob = Math.sin((t - PORT1) * 3.1) * 10 * Math.min(1, hover * 4);
    let rot = 1.9 * Math.pow(1 - k, 1.4) * Math.sin(k * 7.5 + .6) + .06 * Math.sin((t - PORT1) * 2.3) * Math.min(1, hover * 4);
    y += bob;
    if (t >= SWOOP0) { const q = seg(t, SWOOP0, DOCK); [x, y] = arcPt([PWAIT[0], PWAIT[1] + bob], NAIL, 210, ease(q)); rot = lerp(rot, 0, ease(q)) - .12 * Math.sin(q * Math.PI); }
    return { x, y, s: lerp(.72, 1, ease(seg(t, PORT0, SWOOP0))), rot, swing: 0, dock: false };
  }
  function drawPortrait(t) {
    const p = portraitAt(t); if (!p) return;
    if (!inView(p.x - 260, p.x + 260, p.y - 300, p.y + 300)) return;
    if (p.dock) { portrait(p.x, p.y, 1, t, { stage: 'stern', swing: p.swing }); return; }
    push(); translate(p.x, p.y); rotate(p.rot); translate(-p.x, -p.y);
    portrait(p.x, p.y, p.s, t, { stage: 'stern' });
    pop();
  }
  // the desk's table lamp, lost in the rip: it tumbles home and lands on Joe's desk (then lights with the others)
  const LAMP_P = mkPath([[3300, -250], [2800, 60], [2100, 250], [1350, 300], [880, 330], [640, 500], [LAY.lampDesk, LAY.deskTop - 20]]);
  const LAMP0 = 167.0, LAMP1 = 171.05;
  function deskLamp(t, on) {
    if (t < LAMP0) return;
    const k = seg(t, LAMP0, LAMP1), [x, y0] = pathAt(LAMP_P, 1 - Math.pow(1 - k, 1.25)), land = t >= LAMP1;
    const hop = land ? -34 * dec(t - LAMP1, 5) * Math.abs(Math.sin((t - LAMP1) * 14)) : 0, y = y0 + hop;
    const rot = land ? .05 * spring(t, LAMP1, 5, 16) : 2.2 * Math.pow(1 - k, 1.3) * Math.sin(k * 9 + 1);
    if (!inView(x - 200, x + 200)) return;
    push(); translate(x, y - 90); rotate(rot); translate(-x, -(y - 90));
    tableLamp(x, y, .8, { on });
    pop();
  }

  // ================================================================ the band on the island (A, B)
  // positions: chapter 7 keeps everyone on their LAY marks
  function mikeIsle(t) {
    const bp = bpOf(t), P0 = B(50, 3.3), P1 = T51 + .35, C0 = B(53, 3.1);
    const m = mood('mike', t, [[T50 - 3, 'excited'], [B(50, .4), 'determined'], [P0 - .08, 'excited', { lookX: .95 }], [P1, 'excited'],
      [B(52, 1.35), 'surprised', { lookX: -.95 }], [B(52, 2.15), 'surprised', { lookX: .95 }], [B(52, 3), 'excited'],
      [T53 + .1, 'surprised', { lookY: -1, lookX: .35 }], [B(53, 2), 'happy'], [C0, 'excited']], { take: .55 });
    const rap = t < P0 || (t >= P1 && t < B(52, 1.3)) || (t >= B(52, 3) && t < T53);
    const o = { ...m, emote: null, boilKey: 'c8 mike', micBob: .12 * Math.sin(bp * Math.PI), aL: .45 + .85 * Math.abs(Math.sin(bp * Math.PI)), dy: (m.dy || 0) * .75 };
    if (rap) Object.assign(o, singing(t, 'rap'));
    if (t >= P0 && t < P1) {   // the hand-off: mic arm flung out at Chester
      const k = backOut(seg(t, P0, P0 + .2));
      Object.assign(o, { micAt: 'up', aR: lerp(1.35, .2, k), aL: .15 + .3 * k, lookX: 1, mouth: 'grin', sq: (o.sq || 0) - .06 * k, rot: -.06 * k });
    }
    if (t >= C0) Object.assign(o, { micAt: 'up', aR: 1.2 + .15 * Math.sin(bp * TAU), aL: 1.35 + .15 * Math.cos(bp * TAU), mouth: 'open' });
    return { x: LAY.mike[0], y: LAY.mike[1], u: 19, o };
  }
  const LEAP0 = B(53, 3.75), LEAP1 = B(54, 1);            // Chester's leap onto the couch: 174.45 -> 175.45
  const CH_A = [LAY.chester[0], LAY.chester[1]], CH_B = [1935, 704];
  function chesterLeap(t) {   // shared by B and C: the crouch, the flight, the landing on the couch cushion
    const k = seg(t, LEAP0, LEAP1), x = lerp(CH_A[0], CH_B[0], k), base = lerp(CH_A[1], CH_B[1], ease(k)), y = base - 190 * 4 * k * (1 - k);
    const u = lerp(19, 17.5, ease(k)), crouch = t < LEAP0 ? .24 * ease(seg(t, LEAP0 - .5, LEAP0 - .04)) : 0;
    const land = t >= LEAP1 ? .3 * dec(t - LEAP1, 6) * Math.cos((t - LEAP1) * 18) : 0;
    const air = t >= LEAP0 && t < LEAP1, sq = crouch + land + (air ? -.2 * Math.abs(1 - 2 * k) : 0);
    return { x, y, g: base, u, sq, air, k };
  }
  function chesIsle(t) {
    const bp = bpOf(t), UP = B(51, 3), D0 = B(53, 3.1);
    const m = mood('chester', t, [[T50 - 3, 'excited'], [T51 - .06, 'determined', { eyes: 'closed' }], [B(51, 1.6), 'excited'], [UP, 'starstruck', { lookY: -1 }],
      [T52 + .7, 'excited'], [B(52, 1.35), 'surprised', { lookX: -.95 }], [B(52, 2.15), 'surprised', { lookX: .95 }], [B(52, 3), 'excited'],
      [T53 + .1, 'surprised', { lookY: -1, lookX: -.35 }], [B(53, 2), 'happy'], [D0, 'determined', { lookX: -1, lookY: -.3 }]], { take: .55 });
    const o = { ...m, emote: null, boilKey: 'c8 chester', aL: .5 + .9 * Math.abs(Math.sin(bp * Math.PI + .5)), dy: (m.dy || 0) * .75 };
    const belt = t < UP || (t >= T52 + .7 && t < B(52, 1.35)) || (t >= B(52, 3) && t < T53);
    if (belt) Object.assign(o, singing(t, t < UP ? 'sing' : 'belt'));
    if (t >= T51 - .06 && t < UP) { o.aL = .2 + 1.1 * ease(seg(t, T51, B(51, 2))) + .12 * Math.sin(bp * TAU); }   // the free arm reaches out
    if (t >= UP && t < T52 + .7) {   // arms flung up at the world coming back
      const k = backOut(seg(t, UP - .02, UP + .2));
      Object.assign(o, { micAt: 'up', aR: lerp(.4, 1.3, k), aL: lerp(.4, 1.4, k), mouth: 'belt', sq: (o.sq || 0) - .08 * k });
    }
    let x = CH_A[0], y = CH_A[1], g = y, u = 19;
    if (t >= D0) {   // eyes on the couch, a crouch, and the leap (the flight is finished in shot C)
      const L = chesterLeap(t);
      x = L.x; y = L.y; g = L.g; u = L.u;
      Object.assign(o, { ...turn(t, D0, D0 + .16, 0, -.125), micAt: 'up', mouth: L.air ? 'belt' : 'grin', sq: L.sq, dy: 0, aR: L.air ? 1.3 : .2 + 1.2 * seg(t, LEAP0 - .15, LEAP0), aL: L.air ? 1.45 : -.3 });
      if (L.air) o.rot = -.18 * Math.sin(L.k * Math.PI);
    }
    return { x, y, g, u, o };
  }
  // the others, through bandHooks (Brad and Phoenix on the couch, Joe at the desk, Rob at the kit)
  function sideReact(t) {   // everyone glances at the returning halves, looks up with the zip, delights at the lamps
    const l = t >= B(52, 1.35) && t < B(52, 2.15) ? -1 : t >= B(52, 2.15) && t < B(52, 3) ? 1 : 0, up = t >= T53 + .1 && t < B(53, 1.6);
    const o = {}; if (l) Object.assign(o, { eyes: 'wide', lookX: l, mouth: 'o' }); if (up) Object.assign(o, { eyes: 'wide', lookY: -1, lookX: 0, mouth: 'O' });
    if (t >= B(53, 2) && t < B(53, 3.1)) Object.assign(o, { eyes: 'happy', mouth: 'laugh' });
    return o;
  }
  function stageIsle(t, o = {}) {
    const r = sideReact(t), over = {};
    for (const m of ['brad', 'phoenix', 'joe', 'rob']) over[m] = { boilKey: 'c8 ' + m, ...r };
    if (!r.eyes) over.brad = { boilKey: 'c8 brad' };   // Brad keeps his eyes shut when nothing's happening
    const vr = viewRect(60), vis = (a, b) => b > vr[0] && a < vr[2], skip = ['mike', 'chester'];
    if (!vis(560, 960)) skip.push('joe'); if (!vis(1100, 1480)) skip.push('rob'); if (!vis(1650, 1930)) skip.push('brad'); if (!vis(1940, 2220)) skip.push('phoenix');
    const H = bandHooks(t, { style: { mike: 'hype', chester: 'belt' }, energy: 1, over, skip, extra: { couch: o.couchShadows } });
    floorLamp(LAY.lampA, LAY.floorY - 10, 1, { on: 1 });
    if (o.flare) { boilSeed('c8 flare'); glow(LAY.lampA, 300, 520, '#FFD27A', o.flare); }
    couchBack(LAY.couch, LAY.seatY + 96, 1);
    H.couch();
    couchFront(LAY.couch, LAY.seatY + 96, 1);
    H.joe();
    desk(LAY.desk, LAY.floorY, 1, t, { spin: t * 3.4 });
    deskLamp(t, o.deskOn ?? 0);
    H.rob();
    drumKit(LAY.drums, LAY.floorY + 60, .72, t, { hits: drumHits(t) });
    if (o.midAir) o.midAir();
    // the frontmen, each with the ink shadow at their feet
    const pm = mikeIsle(t), pc = chesIsle(t), sh = o.floorSh ?? 1, eyes = o.shEyes ?? 1;
    if (vis(pm.x - 130, pm.x + 130)) {
      if (o.wallSh) o.wallSh('mike', pm);
      floorShadow('mike', pm.x, pm.y, pm.u, silPose('mike', pm.o), { k: .5, skew: .03, alpha: .62 * sh, eyes: eyes, lookX: pm.o.lookX, lookY: pm.o.lookY });
      member('mike', pm.x, pm.y, pm.u, pm.o);
    }
    if (vis(pc.x - 130, pc.x + 130)) {
      if (o.wallSh) o.wallSh('chester', pc);
      floorShadow('chester', pc.x, pc.g, pc.u, silPose('chester', { ...pc.o, dy: (pc.o.dy || 0) + (pc.y - pc.g) / pc.u }), { k: .5, skew: .3, alpha: .62 * sh, eyes: eyes, lookX: pc.o.lookX, lookY: pc.o.lookY });
      member('chester', pc.x, pc.y, pc.u, pc.o);
    }
  }

  // ================================================================ the halves of the world come back (B)
  // Chapter 7 slid them 3600 px out, dropped them and swung them open about their far top corners, their torn edges
  // curling back. Here the same motion runs backwards and lands with a thump; a V of void stays open along the top
  // tear until the zip runs up it.
  const RET0 = B(52, 1), RET1 = T53;                       // 169.05 -> 171.45
  const ZIP0 = T53 + .06, ZIP1 = B(53, 1.2);               // 171.51 -> 172.41
  const CURT8 = (t, side, c) => {   // m: 1 = just outside the frame edge (rotated down), 0 = home
    const s = seg(t, RET0, RET1), m = 1 - (.35 * ease(s) + .65 * Math.pow(s, 1.3)), [vl, , vr] = viewRect(0);
    const reach = side < 0 ? 1950 - vl + 120 : vr - 1950 + 120;
    return { m, d: [side * reach * m, 60 * m * m], r: -side * .12 * m, q: side < 0 ? [-600, -600] : [4200, -600], curl: 120 * m };
  };
  const zipY = t => t < ZIP0 ? 790 : t < ZIP1 ? lerp(790, -140, ease(seg(t, ZIP0, ZIP1)) * .85 + .15 * seg(t, ZIP0, ZIP1)) : -1700;
  const vGap = (y, t) => Math.min(330, .42 * Math.max(0, zipY(t) - y));
  function halfEdge(side, t) {   // the torn edge of one half (world, unmoved), top tear V-cut open above the zip
    const top = TEAR_TOP.map(([x, y]) => [x + side * vGap(y, t) / 2, y]);
    return top.concat((side < 0 ? HALF_L : HALF_R).slice(1), TEAR_BOT.slice(1));
  }
  function halves(t, c) {
    for (const side of [-1, 1]) {
      const M = CURT8(t, side, c), E = halfEdge(side, t), P = E.concat(side < 0 ? [[-5000, 4000], [-5000, -4000]] : [[8000, 4000], [8000, -4000]]);
      const [qx, qy] = toScreen(M.q[0], M.q[1]);
      showMoved('c8room', [toScreenPts(P)], { dx: M.d[0] * c.z, dy: M.d[1] * c.z, r: M.r, px: qx, py: qy });
      const f = rig(M.q, M.r, M.d), Em = E.map(f);
      if (M.curl > 2) {   // the torn edge curled back, paper back showing, flattening as it lands
        boilSeed('c8 curl' + side);
        const inner = offsetLine(Em, M.curl, side < 0 ? 1 : -1, 4);
        castShadow([toScreenPts(inner.concat(offsetLine(Em, M.curl * 1.35, side < 0 ? 1 : -1, 6).reverse()))], { alpha: .45, blur: 10, col: '#1A0F12' });
        for (let i = 0; i < Em.length - 1; i += 10) {
          const a = Em.slice(i, i + 11), b = inner.slice(i, i + 11);
          if (a.length > 1) paint(a.concat(b.slice().reverse()), { wash: '#F4E6C6', fill: '#C9B089', fillOp: 110, bleed: .05, tex: .6, ink: null });
        }
        for (const C of chunks(inner, 14)) inkLine(C, 1.4 / c.z, '#8A6A48', 'inkfine', .4);
      }
      const knit = 1 - sm(t, 172.2, 172.9);
      if (knit > .02) { boilSeed('c8 tornedge' + side); for (const C of chunks(Em, 14)) tearEdge(C, { sw: 1.3 / c.z * knit, shadow: false }); }
    }
  }
  // the zip: a spark running up the seam; behind it the edges have met and stitches cross the seam, then heal
  function zipper(t, c) {
    if (t < ZIP0 - .02 || t > 173.2) return;
    const zy = zipY(t), heal = 1 - sm(t, 172.35, 173.0), z = c.z;
    boilSeed('c8 stitches');
    for (let y = 776, i = 0; y > -160; y -= 30, i++) {
      if (y < zy) break;
      const x = SEAM_X(y), fresh = clamp((y - zy) / 120), w = (9 + 3 * hash(i)) * heal;
      if (w < .5) continue;
      inkLine([[x - w, y - 7], [x + w, y + 7]], (1.1 + .6 * (1 - fresh)) / Math.min(1.4, z), i % 2 ? '#8A6A48' : '#F8ECD0', 'inkfine', 0);
    }
    if (t < ZIP1 + .05 && zy > -150) {
      const x = SEAM_X(zy);
      boilSeed('c8 zipspark');
      glow(x, zy, 150, '#FFE9B0', .95);
      glow(x, zy, 60, '#FFFFFF', .7);
      paint(starPts(x, zy, 26, .28, 4, t * 9), { wash: '#FFF8E6', fill: PC.goldLt, fillOp: 80, ink: PAL.ink, sw: .8 });
      speedLines(x, zy + 20, 30, 70, 7, '#FFF3D0', Math.floor(t * 12), 1);
    }
  }
  // paper shreds puffed out of the seam as it closes: the first confetti
  function shreds(t) {
    for (let i = 0; i < 26; i++) {
      const y0 = 740 - i * 34 - 20 * hash(i + 3), tb = ZIP0 + (ZIP1 - ZIP0) * clamp((790 - y0) / 930), a = t - tb;
      if (a < 0 || a > 3.6) continue;
      const sd = i % 2 ? 1 : -1, x = SEAM_X(y0) + sd * (70 + 90 * hash(i + 5)) * (1 - Math.exp(-a * 2.4)) + 16 * Math.sin(a * 3 + i);
      const y = y0 - 26 * (1 - Math.exp(-a * 6)) + 30 * a + 55 * a * a;
      if (!inView(x - 40, x + 40, y - 40, y + 40)) continue;
      confPiece(x, y, 300 + i, hash(i) * 6 + a * (3 + 2 * hash(i + 7)), Math.cos(a * (4 + 3 * hash(i + 8)) + i), false);
    }
  }

  // the room the halves carry: the parlor minus the island's own furniture and the portrait (which drifts home by
  // itself). They come back as chapter 7 took them away (dark, peeled, cracked) and heal as the seam closes.
  const CRACKS = [[[1700, 520], [300, -300]], [[1400, 700], [-400, 420]], [[2300, 560], [3600, -200]], [[2500, 760], [3700, 600]], [[1200, 1150], [300, 1800]], [[2400, 1100], [3400, 1700]]].map(([a, b], i) => tearLine(a, b, 40 + i * 3, 16, 16));
  function roomLayer(t, c, L) {
    paintLayer('c8room', () => {
      camBegin(c.cx, c.cy, c.z);
      push();
      wallpaper(-500, 3700, t, {});
      boilSeed('wall light');
      for (const [lx, ly, r, k] of [[LAY.lampA, 300, 420, L.a], [LAY.lampB, 300, 420, L.b], [LAY.lampDesk, 500, 300, L.desk]]) if (k > .05 && inView(lx - r, lx + r)) paint(ellPts(lx, ly, r, r * .8, 26), { fill: '#FFE8B0', fillOp: 90 * k, bleed: .3, tex: .3, ink: null });
      if (L.peel > .01) peelStrips(t, L.peel);
      wainscot(-500, 3700, false);
      pop();
      crown(-500, 3700, false);
      doors(LAY.doorsL, false); doors(LAY.doorsR, false);
      for (const sx of LAY.sconces) sconce(sx, 280, L.sconce, false);
      floorBoards(-500, 3700, false, { ink: 0 });
      rug(1850, 935, 980, 150, false);
      palm(LAY.palm, LAY.floorY + 4, 1, t);
      statue(LAY.statue, LAY.floorY + 6, 1, t);
      floorLamp(LAY.lampB, LAY.floorY - 10, 1, { on: L.b });
      if (L.cracks > .01) {
        boilSeed('c8 cracks');
        CRACKS.forEach(Q => { inkLine(Q, 2.4 * L.cracks, '#FFF3D0', 'inkfine', .2); inkLine(Q.map(([x, y]) => [x + 3, y + 4]), 1.6 * L.cracks, PC.inkDrip, 'inkfine', .2); });
      }
      if (L.dark > .01) roomLight(L.dark, [[LAY.lampA, 420, 1000, 1], [1900, 950, 1200, .85]], { col: '#1E0F16' });
      camEnd();
    });
  }

  // ================================================================ confetti: shredded strips of the world's paper
  const CONF = ['#FFF6E4', '#F4E6C6', '#E9D8B4', '#DFC99F', '#FFF1D6', '#F2D27A', '#B8322E', '#D97757', '#EBC9B6', '#E9D8B4', '#FFF6E4', '#6B4E9A'];
  function confPiece(x, y, i, rot, fl, lying, sc = 1) {
    push(); translate(x, y); rotate(rot); scale(1, lying ? .34 : Math.max(.1, Math.abs(fl)));
    boilSeed('c8 conf' + i);
    const w = (9 + 7 * hash(i * 1.37 + 5)) * sc, h = (32 + 40 * hash(i * 2.11 + 1)) * sc, col = CONF[i % CONF.length], back = fl < 0 && !lying;
    const c = back ? mixCol(col, '#9A8A70', .3) : mixCol(col, '#FFFFFF', .18 * Math.max(0, fl - .8) * 5);
    if (i % 6 === 4) {   // a curled shred
      const P = []; for (let k = 0; k <= 6; k++) { const a = -1.1 + 2.2 * k / 6; P.push([Math.sin(a) * h * .35, -Math.cos(a) * h * .3 + h * .12]); }
      paint(ribbon(P, w * .9, w * .7), { wash: c, ink: PAL.ink, sw: .35 });
    } else {
      paint(rectPts(-w / 2, -h / 2, w, h, 1.1), { wash: c, ink: PAL.ink, sw: .35 });
      if (!back && i % 4 === 1) paint(ellPts(0, -h * .15, w * .22, w * .22, 6), { wash: PC.damask, washOp: 200, ink: null });
    }
    pop();
  }
  // WORLD space, inside the camera. Emitted from above the ceiling from t0 (a burst, then a steady rain); each strip
  // flutters, spins and flips as it falls and lies on the floor once it lands. layer: 'far' | 'near' | 'floor'.
  function confettiRain(tf, t0, layer, o = {}) {
    const rate = o.rate ?? 30, burst = o.burst ?? 110, [vx0, vy0, vx1, vy1] = viewRect(40);
    const n = Math.floor(burst + Math.max(0, tf - t0 - .3) * rate);
    for (let i = 0; i < n; i++) {
      const h1 = hash(i * 3.7 + 1), h2 = hash(i * 5.3 + 2), h3 = hash(i * 7.9 + 3), h4 = hash(i * 2.9 + 4), h5 = hash(i * 1.3 + 5);
      const isB = i < burst, born = isB ? t0 + .3 * h5 : t0 + .3 + (i - burst) / rate + .6 * (h5 - .5) / rate, age = tf - born;
      if (age < 0) continue;
      const near = h4 > .6; if (layer === 'near' && !near) continue; if (layer === 'far' && near) continue;
      const vy = isB ? 250 + 160 * h2 : 150 + 110 * h2, y0 = isB ? -30 - 120 * h3 : -150, x0 = 250 + 3100 * h1;
      const land = 840 + 250 * hash(i * 6.1 + 7), tl = Math.min(age, (land - y0) / vy), landed = age * vy + y0 >= land;
      if ((layer === 'floor') !== landed) continue;
      const y = landed ? land : y0 + age * vy, x = x0 + Math.sin(tl * (1.2 + 1.6 * h4) + i) * (22 + 38 * h3) + 26 * tl * (h2 - .5);
      if (x < vx0 || x > vx1 || y < vy0 - 60 || y > vy1 + 60) continue;
      if (landed && i % 3 === 2) continue;   // (only some stay in view on the floor: keep the stroke count sane)
      const rot = landed ? (h3 - .5) * 1.6 : h2 * 6 + tl * (1.5 + 3 * h1) * (h3 > .5 ? 1 : -1);
      confPiece(x, y, i, rot, landed ? 1 : Math.cos(tl * (2.5 + 4.5 * h4) + i), landed, near && !landed ? 1.45 : 1);
    }
  }

  // ================================================================ the restored parlor: performers (C, D)
  // Placement: Joe at the desk, Rob at the kit, Mike clear of lamp A's pole, Brad and Phoenix back to back on the rug,
  // Chester up on the couch (after his leap). The final six-way jump: crouch on the first flurry hit, launch on the
  // biggest, frozen mid-air on the third (the shot clamps time at FL3).
  const P_MIKE = [1380, 985], P_BRAD = [1792, 1032], P_PHX = [1932, 1032];
  const MJ = T55, CU = B(55, 3);                           // Mike's big jump; Chester's arms-up (their shadows go a beat early)
  function finalJump(t, i, h) {   // i: a small per-member offset (no twinning); h: height in u
    const t0 = FL2 + .008 * i, D = .5, crouch = t < t0 ? .28 * ease(seg(t, FL1 - .02, t0)) : 0;
    if (t < t0) return { dy: .25 * crouch, sq: crouch, air: false, k: 0 };
    const k = (t - t0) / D; if (k >= 1) return { dy: 0, sq: .2 * dec(t - t0 - D, 8), air: false, k: 1 };
    return { dy: -h * 4 * k * (1 - k), sq: -.18 * Math.abs(1 - 2 * k) - .05, air: true, k };
  }
  const vinyl = (u, sw) => {   // Joe's record, held up
    push(); rotate(-.5);
    paint(ellPts(1.9 * u, 0, 2.1 * u, 2.1 * u, 22), { wash: '#17141C', ink: PAL.ink, sw: sw * .6 });
    for (const r of [1.5, 1.05]) inkLine(ellPts(1.9 * u, 0, r * u, r * u, 18).concat([[1.9 * u + r * u, 0]]), sw * .3, '#3A3440', 'inkfine', .5);
    paint(ellPts(1.9 * u, 0, .7 * u, .7 * u, 12), { wash: '#D8392F', ink: null });
    inkLine([[1.2 * u, -1.3 * u], [2.2 * u, -1.75 * u]], sw * .5, '#8E8894', 'inkfine', 0);
    pop();
  };
  function drumsCD(t) {
    const bp = bpOf(t), bi = Math.floor(bp), f = bp - bi, inb = ((bi % 4) + 4) % 4, e = frac(bp * 2);
    const last = t >= T56, fl = [FL1, FL2, FL3].reduce((s, h) => s + dec(t - h, 6), 0);
    const crash = (inb === 0 || inb === 2 || last) ? dec(f, 3.5) : 0;
    return { kick: (inb === 0 || inb === 2) ? dec(f) : 0, snare: (inb === 1 || inb === 3) ? dec(f) : 0, hat: dec(e) * .7, crash: Math.min(1.3, crash + fl), tom: t > B(56, 3.5) ? dec(frac(bp * 4), 6) : 0 };
  }
  function joeCD(t) {
    const bp = bpOf(t), r = Math.sin(bp * TAU * 4), J = finalJump(t, 2, 6.5), wild = t >= B(56, 3) ? 1 : 0;
    const o = { ...mfeel('joe', wild ? 'playful' : 'mischief', t, { seed: 9 }), emote: null, noShadow: true, noLegs: !J.air, boilKey: 'c8 joe',
      aL: .15 + (.55 + .25 * wild) * r, aR: .25 - .4 * Math.max(0, Math.sin(bp * TAU * 2 + 1)) + .45 * wild * Math.sin(bp * TAU * 4 + 2), lookX: -.35,
      dy: -.55 * Math.abs(Math.sin(bp * Math.PI * (1 + wild))) + J.dy, sq: J.sq + .06 * pulse2(t), rot: .05 * Math.sin(bp * Math.PI) };
    if (wild) o.eyes = 'happy';
    if (t >= FL1) Object.assign(o, { eyes: 'happy', mouth: 'tongue', aL: J.air ? .9 : -.2, aR: J.air ? 1.45 : .2, armR: J.air ? vinyl : null, walk: J.air ? .25 : null, rot: J.air ? .1 : 0 });
    return { name: 'joe', x: 760, y: 684, u: 16, o };
  }
  function robCD(t) {
    const h = drumsCD(t), hitL = h.snare + h.hat * .25 + h.tom, hitR = Math.min(1, h.crash), J = finalJump(t, 3, 6);
    const o = { ...mfeel('rob', t >= T56 ? 'excited' : 'determined', t, { seed: 12 }), emote: null, noShadow: true, noLegs: !J.air, boilKey: 'c8 rob',
      aL: .95 - 1 * hitL, aR: 1.3 - 1.5 * hitR, armL: stickHook(.4 - .5 * hitL), armR: stickHook(-.3 - .7 * hitR), dy: -.5 * hitR + J.dy, sq: .07 * h.kick + J.sq, rot: -.06 * hitR };
    if (t >= B(56, 3.5) && t < T57) {   // the fill: sticks up high, down on the toms on the eighths
      const f = frac(bpOf(t) * 2), up = ease(clamp(f * 2.2)), f2 = frac(bpOf(t) * 2 + .5), up2 = ease(clamp(f2 * 2.2));
      // (arms kept off vertical: straight up they vanish behind his shaggy mop)
      Object.assign(o, { eyes: 'determined', mouth: 'open', aL: .3 + .75 * up, aR: .3 + .75 * up2, armL: stickHook(-.2 - .25 * up), armR: stickHook(-.2 - .25 * up2), dy: o.dy - .3 * up });
    }
    if (t >= FL1) Object.assign(o, { eyes: 'squeeze', mouth: 'open', aL: J.air ? 1.08 : .5, aR: J.air ? 1.12 : .5, armL: stickHook(J.air ? -.5 : .3), armR: stickHook(J.air ? -.42 : -.2), walk: J.air ? .75 : null, rot: J.air ? -.08 : 0 });
    return { name: 'rob', x: 1290, y: 694, u: 16, o };
  }
  function mikeCD(t, ahead = 0) {
    const bp = bpOf(t), mj = MJ - ahead, P = jump(t, mj, mj + .62, 4.2), J = finalJump(t, 0, 8), pt = t >= B(56, 1) && t < B(56, 2);
    const o = { ...mfeel('mike', 'excited', t, { seed: 1 }), emote: null, boilKey: 'c8 mike', ...singing(t, 'rap'),
      micBob: .12 * Math.sin(bp * Math.PI), aL: .5 + .9 * Math.abs(Math.sin(bp * Math.PI)), dy: -.9 * Math.abs(Math.sin(bp * Math.PI)) + P.dy + J.dy, sq: .1 * pulse(t) + P.sq + J.sq };
    if (t > mj - .15 && t < mj + .7) Object.assign(o, { micAt: 'up', aR: 1.4, aL: 1.3, mouth: 'open' });
    if (pt) { const k = backOut(seg(t, B(56, 1), B(56, 1) + .16)); Object.assign(o, { aL: .15 + 1.0 * k, lookX: 0, lookY: -.1, eyes: 'determined', mouth: 'grin', sq: o.sq - .05 * k, dy: o.dy + .15 }); }
    if (t >= FL1) Object.assign(o, { micAt: 'up', aR: J.air ? 1.55 : .9, aL: J.air ? 1.05 : .5, eyes: 'shine', mouth: 'belt', lookY: -.4, walk: J.air ? .25 : null, rot: J.air ? -.07 : 0 });
    return { name: 'mike', x: P_MIKE[0], y: P_MIKE[1], u: 19, o };
  }
  // Back to back they face out, in profile; the kit's guitar prop is mirrored (and tipped up) so each neck points
  // out the way its player faces (drawn as usual, the necks would cross behind their backs)
  const fwdGuitar = (name, strum, up = .45) => (u, sw) => { push(); rotate(-up); scale(-1, 1); (name === 'brad' ? guitarProp : bassProp)(u, sw, strum, { col: BAND[name].col }); pop(); };
  function bradCD(t) {
    const bp = bpOf(t), lean = .06 + .05 * Math.abs(Math.sin(bp * Math.PI)), up = t >= B(56, 2) && t < B(56, 3), J = finalJump(t, 4, 7.5);
    const o = { ...mfeel('brad', 'cool', t, { seed: 3 }), eyes: 'closed', mouth: 'smirk', emote: null, boilKey: 'c8 brad', view: 'side', flip: true,
      inst: false, draw: fwdGuitar('brad', bp * 2, up ? .7 : .45), aL: -.9, rot: lean + (up ? .1 : 0), dy: -.5 * Math.abs(Math.sin(bp * Math.PI)) + J.dy, sq: .06 * pulse(t) + J.sq };
    if (up) Object.assign(o, { mouth: 'open', eyes: 'happy', lookY: -.5 });
    if (t >= FL1) Object.assign(o, { eyes: 'closed', mouth: 'grin', rot: J.air ? .2 : .12, walk: J.air ? .25 : null });
    return { name: 'brad', x: P_BRAD[0], y: P_BRAD[1], u: 19, o };
  }
  function phxCD(t) {
    const bp = bpOf(t), lean = -.06 - .05 * Math.abs(Math.sin(bp * Math.PI + .4)), up = t >= B(56, 2) && t < B(56, 3), J = finalJump(t, 5, 7);
    const o = { ...mfeel('phoenix', 'happy', t, { seed: 6 }), emote: null, boilKey: 'c8 phoenix', view: 'side', mouth: 'grin',
      inst: false, draw: fwdGuitar('phoenix', bp * 2 + .25, up ? .7 : .45), aL: -.9, rot: lean - (up ? .1 : 0), dy: -.5 * Math.abs(Math.sin(bp * Math.PI + .4)) + J.dy, sq: .06 * pulse(t, 5) + J.sq };
    if (up) Object.assign(o, { mouth: 'laugh', eyes: 'happy', lookY: -.5 });
    if (t >= FL1) Object.assign(o, { eyes: 'happy', mouth: 'laugh', rot: J.air ? -.2 : -.12, walk: J.air ? .75 : null });
    return { name: 'phoenix', x: P_PHX[0], y: P_PHX[1], u: 19, o };
  }
  function chesCD(t, ahead = 0) {
    const bp = bpOf(t), L = chesterLeap(t), cu = CU - ahead, J = finalJump(t, 1, 5), scr = t >= T56 && t < B(56, 1);
    const o = { ...mfeel('chester', 'excited', t, { seed: 2 }), emote: null, boilKey: 'c8 chester', ...singing(t, 'belt'), micAt: 'up',
      aR: 1 + .3 * Math.sin(bp * TAU), aL: .6 + .8 * Math.abs(Math.sin(bp * Math.PI + .5)), dy: J.dy, sq: L.sq + J.sq };
    if (t < LEAP1 + .2) Object.assign(o, { ...turn(t, LEAP1, LEAP1 + .16, -.125, 0), aR: L.air ? 1.3 : .9, aL: L.air ? 1.45 : .9, mouth: 'belt', rot: L.air ? -.18 * Math.sin(L.k * Math.PI) : 0 });
    else if (t < T55) o.dy += -.7 * Math.abs(Math.sin(bp * Math.PI));
    if (t > cu - .1 && t < cu + .75) { const k = backOut(seg(t, cu - .1, cu + .1)); Object.assign(o, { aR: lerp(.6, 1.5, k), aL: lerp(.6, 1.55, k), eyes: 'closed', mouth: 'belt', sq: o.sq - .08 * k }); }
    if (scr) { const k = backOut(seg(t, T56, T56 + .14)); Object.assign(o, { ...singing(t, 'scream'), eyes: 'angry', micAt: 'up', aR: lerp(.8, .35, k), aL: lerp(.8, .3, k), sq: o.sq - .06 * k }); }
    if (t >= FL1) Object.assign(o, { eyes: 'squeeze', mouth: null, lid: J.air ? .38 : .25, aR: J.air ? 1.35 : .7, aL: J.air ? 1.45 : .7, walk: J.air ? .75 : null, rot: J.air ? .05 : 0 });
    return { name: 'chester', x: L.x, y: L.y, g: L.g, u: L.u, o };
  }
  const PERF = { joe: joeCD, rob: robCD, mike: mikeCD, brad: bradCD, phoenix: phxCD, chester: chesCD };
  const drawP = p => member(p.name, p.x, p.y, p.u, p.o);
  // Rob sits behind his kit, so the drums hide his arms. His sticks (the shared stickHook prop) are drawn after the
  // kit, at his arm tips, through the same transform chain clawd() uses for arm hooks: they poke out over the drums.
  function robBody(p) { member('rob', p.x, p.y, p.u, { ...p.o, armL: null, armR: null }); }
  function robSticks(p) {
    const o = p.o, u = p.u, M = BAND.rob, V = VIEWS[o.view] || VIEWS.front, sq = (o.sq || 0);
    const fx = (o.flip ? -1 : 1) * M.sx * (1 + sq * .6), fy = M.sy * (1 - sq), sw = clamp(u / 15, .45, 2.4);
    for (const [px, dir, which] of V.arms) {
      const hook = which === 'L' ? o.armL : o.armR; if (!hook || dir === 0) continue;
      const a = which === 'L' ? (o.aL ?? .2) : (o.aR ?? .2), cl = clamp((Math.abs(a) - .7) / .9);
      boilSeed('c8 rob stick' + which);
      push(); translate(p.x + (o.dx || 0) * u, p.y + (o.dy || 0) * u); if (o.rot) rotate(o.rot); scale(fx, fy);
      translate((px + dir * .55 * cl) * u, -4.5 * u); rotate(dir < 0 ? a : -a); translate(dir * 2.2 * u, 0); if (dir < 0) scale(-1, 1);
      hook(u, sw);
      pop();
    }
  }
  // the lamp shadows on the wallpaper: normal-looking, dancing along; now and then one runs a beat ahead
  const WSH = { mike: { k: 1.45, dx: -255, wallY: 612 }, chester: { k: 1.35, dx: 238, wallY: 588 } };
  function wallShadows(tf, a = .4, mikeAhead = 0) {
    for (const nm of ['mike', 'chester']) {
      const p = nm === 'mike' ? mikeCD(tf + mikeAhead * BEAT, BEAT) : nm === 'chester' ? chesCD(tf, BEAT) : PERF[nm](tf);
      if (!inView(p.x - 500, p.x + 500)) continue;
      const S = WSH[nm], gy = p.g ?? p.y, wy = nm === 'chester' ? lerp(705, S.wallY, clamp((972 - gy) / 268)) : S.wallY;
      wallShadow(nm, p.x, gy, p.u, silPose(nm, { ...p.o, dy: (p.o.dy || 0) + (p.y - gy) / p.u }), { k: S.k, dx: S.dx, wallY: wy, alpha: a, blur: 4 });
    }
  }
  function partyHooks(t, tf, o = {}) {
    return {
      behind: () => { confettiRain(tf, T54, 'floor'); confettiRain(tf, T54, 'far'); },
      joe: () => drawP(joeCD(tf)),
      rob: () => robBody(robCD(tf)),
      floor: () => {
        robSticks(robCD(tf));
        wallShadows(tf, .4, o.mikeAhead || 0);
        for (const nm of ['brad', 'phoenix', 'mike', 'chester']) drawP(PERF[nm](tf));
        confettiRain(tf, T54, 'near');
      },
      lit: () => {   // the lamps blaze
        boilSeed('c8 blaze');
        const p = .15 * pulse(tf, 5);
        glow(LAY.lampA, 250, 430, '#FFC766', .38 + p); glow(LAY.lampB, 250, 430, '#FFC766', .38 + p); glow(LAY.lampDesk, 500, 260, '#FFC766', .3 + p);
        for (const sx of LAY.sconces) glow(sx, 310, 160, '#FFD68A', .3);
      }
    };
  }
  function parlorParty(t, tf, o = {}) {
    parlor(tf, { lamps: 1, ambient: .1, portrait: { stage: 'stern' }, drums: drumsCD(tf), spin: tf * 3.4 + .9 * Math.sin(bpOf(tf) * TAU * 4), hooks: partyHooks(t, tf, o) });
  }

  // ================================================================ cameras
  const CM = cam(LAY.mike[0], 893, 2.75), CC = cam(LAY.chester[0], 893, 2.75), CW = cam(1600, 690, .62);
  const backS = (x, s) => { x = clamp(x); return 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); };   // a back-ease with a small overshoot
  const whipIn = w => backS(w, .65);
  const whipLR = w => w < .45 ? .45 * easeIn(w / .45) : .45 + .55 * backS((w - .45) / .55, .6);
  function camAB(t) {
    // A: the whip in (from the right, zooming in) lands on Mike; a whip right to Chester; the pull-back to the wide
    // (the whip is already at full speed on the first frame: chapter 7's whip left hands over mid-move)
    const w1 = seg(t, T50 - .08, T50 + .32), w2 = seg(t, 164.86, 165.3), pb = seg(t, 167.7, 168.8);
    let c = cam(lerp(CM.cx + 900, CM.cx, whipIn(w1)), lerp(780, CM.cy, easeOut(seg(t, T50, T50 + .3))), lz(1.3, CM.z, easeOut(seg(t, T50, T50 + .34))));
    c.cx += 12 * Math.sin((t - T50) * 1.1) * seg(t, T50 + .3, T50 + 1); c.z *= 1 + .045 * seg(t, T50 + .3, 164.86);
    if (w2 > 0) { const k = whipLR(w2); c = cam(lerp(CM.cx, CC.cx, k), CM.cy, lerp(CM.z * 1.045, CC.z, w2) * (1 - .12 * Math.sin(Math.PI * w2))); }
    if (t >= 165.3) { c = cam(CC.cx - 10 * Math.sin((t - 165.3) * 1.2), CC.cy, CC.z * (1 + .05 * seg(t, 165.3, 167.7))); }
    if (pb > 0) c = mixCam(c, CW, ease(pb));
    // B: settles on the island, then pushes in as the world comes back round it
    if (t >= 168.8) {
      c = mixCam(CW, cam(1760, 615, .8), sm(t, 169.0, 171.45));
      c = mixCam(c, cam(1790, 600, .86), sm(t, 172.6, 174.0));
      c = mixCam(c, cam(1860, 640, .9), sm(t, 174.0, T54));
    }
    if (t > 169) c.cy += 8 * Math.sin((t - 169) * .9);
    const sh = shakeXY(t, 16 * dec(t - T53, 7) + 5 * dec(t - B(53, 2), 8));
    return cam(c.cx + sh[0] / c.z, c.cy + sh[1] / c.z, c.z);
  }
  const vel = (t, fn) => { const a = fn(t - 1 / 24), b = fn(t); return (b.cx - a.cx) * b.z; };   // screen px per frame

  // ================================================================ SHOT A: two voices
  function islandWorld(t, c, o = {}) {
    drawVoid(t, c);
    camBegin(c.cx, c.cy, c.z);
    drawStrips(t, false);
    drawPortrait(t);
    islandBase(t, c, { halo: 1 });
    islandEdge(c.z, 1);
    stageIsle(t, { midAir: () => drawStrips(t, true) });
    camEnd();
  }
  function whipSmear(t, v, layer) {   // a whip pan: the frame smeared along the move, plus painted streaks
    const n = clamp(Math.ceil(Math.abs(v) / 11), 6, 40);
    for (let i = 1; i < n; i++) blit(layer, v * (i / (n - 1) - .5), 1 / (i + 1));
    const k = clamp(Math.abs(v) / 420);
    const cols = ['#2A2140', '#3A2F52', '#6E2B2F', '#D97757', '#F2A283', '#E9DFC8', '#CDBF9F', '#7A5238', '#15111F', '#F4E3BC'];
    for (let i = 0; i < 16; i++) {
      const y = 40 + 1000 * hash(i * 3.1 + 2), x = W * hash(i * 7.3 + Math.floor(t * 24)), len = (200 + 700 * hash(i + 9)) * k;
      boilSeed('c8 streak' + i);
      inkLine([[x - len / 2, y], [x, y + 4 * (hash(i + 4) - .5)], [x + len / 2, y]], (1.6 + 2.4 * hash(i + 2)) * k, cols[Math.floor(clamp(y / H) * 9.99)], 'dry', .3);
    }
  }
  function shotA(t, lt, dur) {
    const c = camAB(t), v = vel(t, camAB);
    if (Math.abs(v) > 60 && t < 167.7) { paintLayer('c8whip', () => islandWorld(t, c)); blit('c8whip', 0, 1); whipSmear(t, v, 'c8whip'); }
    else islandWorld(t, c);
  }

  // ================================================================ SHOT B: the world repairs
  function lampsOn(t, seed) {   // the room's lamps: dark, a stutter, then blazing from 173.05
    if (t < 172.75) return 0;
    if (t < B(53, 2)) return hash(Math.floor(t * 24) * 1.7 + seed * 5.1) > .5 ? .55 : .06;
    return 1;
  }
  function shotB(t, lt, dur) {
    const c = camAB(t), halvesIn = t >= RET0 - .05, on = lampsOn(t, 1), blaze = t >= B(53, 2) ? dec(t - B(53, 2), 3) : 0;
    const Lr = { a: on, b: lampsOn(t, 2), desk: lampsOn(t, 3), sconce: lampsOn(t, 4), peel: .7 * (1 - sm(t, 171.9, 172.8)), cracks: 1 - sm(t, 171.7, 172.6), dark: .74 * (1 - sm(t, 172.9, 173.3)) };
    if (halvesIn) roomLayer(t, c, Lr);
    drawVoid(t, c);
    camBegin(c.cx, c.cy, c.z);
    drawStrips(t, false);
    if (halvesIn) halves(t, c);
    const closed = seg(t, RET0 + .8, RET1);
    islandBase(t, c, { halo: 1 - .5 * closed, float: 1 - closed });
    if (t > 173.3) showMoved('c8room', [toScreenPts(ISL.P)], {}, { alpha: sm(t, 173.3, 173.75), feather: 1 });   // the scrap is floor again
    islandEdge(c.z, 1 - sm(t, 171.95, 172.8));
    zipper(t, c);
    drawPortrait(t);
    const wallA = .4 * sm(t, B(53, 2), B(53, 2) + .35);
    stageIsle(t, {
      deskOn: lampsOn(t, 3), flare: .5 * blaze, floorSh: 1 - sm(t, B(53, 2), B(53, 2) + .5), shEyes: 1 - sm(t, B(53, 2) - .1, B(53, 2) + .15),
      wallSh: wallA > .01 ? (nm, p) => { const gy = p.g ?? p.y; wallShadow(nm, p.x, gy, p.u, silPose(nm, { ...p.o, dy: (p.o.dy || 0) + (p.y - gy) / p.u }), { k: nm === 'mike' ? 1.35 : 1.3, dx: nm === 'mike' ? -190 : 215, wallY: 705, alpha: wallA, blur: 4 }); } : null,
      midAir: () => { if (t > ZIP0) shreds(t); }
    });
    if (t > 172.72 && t < B(53, 2)) {   // the lamps stutter before they catch
      boilSeed('c8 stutter');
      for (const [x, y, r, sd] of [[LAY.lampB, 250, 380, 2], [LAY.lampDesk, 500, 240, 3], [LAY.sconces[0], 310, 160, 4], [LAY.sconces[1], 310, 160, 5]]) { const k = lampsOn(t, sd); if (k > .1) glow(x, y, r, '#FFD27A', .8 * k); }
    }
    // once the lamps are on, the room settles into the parlor's own lamplight falloff
    const amb = .22 * sm(t, B(53, 2), B(53, 2) + .8);
    if (amb > .01) roomLight(amb, [[LAY.lampA, 290, 760, 1], [LAY.lampB, 290, 760, 1], [LAY.lampDesk, 520, 520, 1], [LAY.sconces[0], 330, 300, .7], [LAY.sconces[1], 330, 300, .7]]);
    if (blaze > .02) { boilSeed('c8 blaze b'); for (const [x, y] of [[LAY.lampA, 250], [LAY.lampB, 250], [LAY.lampDesk, 500]]) glow(x, y, 520, '#FFE0A0', .7 * blaze); }
    camEnd();
    flash(.18 * blaze, '#FFF1D2');
  }

  // ================================================================ SHOT C: full blast
  function camC(t) {
    const k = sm(t, T54, LEAP1 + .3);
    const c = mixCam(cam(1820, 660, .93), cam(1650, 648, .98), k);
    const d = seg(t, LEAP1 + .3, T56);
    c.cx -= 70 * d; c.z *= 1 + .05 * d + .014 * pulse(t, 7) + .02 * dec(t - MJ, 5);
    const sh = shakeXY(t, 9 * dec(t - T54, 6) + 10 * dec(t - MJ, 7) + 4 * dec(t - LEAP1, 9));
    return cam(c.cx + sh[0] / c.z, c.cy + sh[1] / c.z, c.z);
  }
  function shotC(t, lt, dur) {
    const c = camC(t);
    camBegin(c.cx, c.cy, c.z);
    parlorParty(t, t);
    camEnd();
  }

  // ================================================================ SHOT D: the last hits
  // snap zooms: [time, centre x, centre y, zoom]; each crash-zooms in from half its zoom in 0.11 s, then pushes
  const SNAPS = [[T56, 1935, 600, 2.4], [B(56, 1), 1392, 895, 2.45], [B(56, 2), 1862, 915, 1.9], [B(56, 3), 760, 585, 2.55], [B(56, 3.5), 1290, 548, 2.1], [T57, 1500, 640, 1.02]];
  function camD(t) {
    let i = 0; while (i + 1 < SNAPS.length && t >= SNAPS[i + 1][0]) i++;
    const [t0, x, y, z] = SNAPS[i], a = t - t0, last = i === SNAPS.length - 1;
    let zz = last ? lz(1.55, z, easeOut(a / .1)) : lz(z * .52, z, easeOut(a / .11)) * (1 + .05 * a);
    if (last) zz *= (1 + .045 * (t >= FL2 ? dec(Math.min(t, FL3) - FL2, 5) : 0)) * (1 + .09 * easeOut(seg(t, FL3, HIT.silence)));
    const sh = shakeXY(t, 18 * dec(a, 9) + 14 * (t >= FL2 ? dec(t - FL2, 10) : 0));
    const fr = t >= FL3, hold = easeOut(seg(t, FL3, HIT.silence));   // after the freeze only the slow push goes on
    return { c: cam(x + (fr ? 55 * hold : sh[0] / zz), y + (fr ? -12 * hold : sh[1] / zz), zz), a, i, last };
  }
  function shotD(t, lt, dur) {
    const { c, a, last } = camD(t), tf = Math.min(t, FL3), T0 = T;
    if (t >= FL3) T = FL3;   // the freeze: blinks and every clock keyed to T hold still (the boil was set from the real time)
    camBegin(c.cx, c.cy, c.z);
    parlorParty(t, tf, { mikeAhead: 1 });
    camEnd();
    T = T0;
    if (a < .16 && !(last && t >= FL3)) { boilSeed('c8 snap lines'); speedLines(W / 2, H / 2, 380, 1400, 26, '#FFF6DA', Math.floor(t * 24), 1.6 * (1 - a / .16)); }
    if (t >= FL3) flash(.55 * (1 - seg(t, FL3, FL3 + .13)), '#FFF9EC');
  }

  shots([[T50, shotA], [T52, shotB], [T54, shotC], [T56, shotD]]);
})();
