// c03_storm.js (barT(15) = 31.091 -> barT(27) = 52.909): pre-chorus A1 (bars 15-21, the lift) + pre-chorus B1
// (bars 22-26, louder).
//
// ================================================ SHOT PLAN ================================================
// (video time; "B3" = beat 3 of the bar; every cut lands on a bar line)
//
// A  31.091-43.818  THE PAPER BLIZZARD (7 bars, one continuous shot, the camera pushing in the whole way)
//    [in: c02 covered the frame with paperWipe(p, 7); we uncover it (p .5 -> 1) over our first 0.45 s]
//    A grey-teal concrete underpass / loading bay painted in one-point perspective: pillars and shutter doors, a
//    ceiling of beams and strip lights, the far mouth white with storm. The right side is open between the pillars
//    and a storm of paper (sheets, torn scraps, strips, confetti, newsprint with scribbles) howls in from the right:
//    four depth layers of scraps, every one on a closed-form, hash-seeded path (the storm's own clock speeds up
//    and the density grows through the section). Oppa (tux) strides toward us between two White Dancers (v0
//    flipped so her ponytail streams downwind, v1 with the bob): they grow as they come (u 12.6 -> 24.5) while the
//    camera pushes in (zoom 1 -> 1.42). Scraps stick to Oppa: cream flecks accumulate on his suit, face, shades and
//    arms (72 + 16, each sticks at its own time with a little splat). His jacket flares downwind.
//      bars 15-16  windflap, leaning into the wind            reads: the place + the storm (31.5-32.6);
//                                                                   the trio battling in (32.6-34.7); flecks start
//      bar 17      strut (hand to the shades), lips tight     read: Oppa unbothered, swaggering in a hurricane
//      17 B3.5     he takes a breath, opens up to sing; a whole sheet tumbles in from the right, aimed at him
//      bar 18      SLAP on the downbeat (36.545): the sheet wraps his face (his shades and open mouth press through
//                  it; the paper puffs as he keeps singing). The camera flinches. He keeps strutting blind; his
//                  hand touches his "shades" on the paper. The Dancers glance over and giggle.
//      18 B4       he grips the sheet...  bar 19 downbeat: rips it off in one swing and lets the wind take it, and
//                  keeps singing, flecked, not a step missed.
//      bars 20-21  the storm grows (density x2, faster, gusting on the bar), the Dancers' hair streams sideways
//                  (Oppa's slick hair doesn't move), back to windflap into the gale, the push arrives at a
//                  medium shot. 21 B4: a giant sheet flies at the lens and slaps flat over it.
//    [out: cut under the sheet on the bar-22 downbeat]
//
// B  43.818-47.455  THE SAUNA (2 bars)  [in: the soggy sheet slides down off the lens in the steam]
//    Warm pine planks, the stove with steam, a sand-glass timer on the wall running out exactly at the cut.
//    On the bench: the Sauna Boss (lamb towel, arms folded), Oppa (sauna look, still in his shades), THE Horse
//    (sitting, lamb towel, looking at us). Oppa and the Boss bob on every beat and flick sweat drops in sync.
//      43.9-45.1  the trio; the Horse in a towel; the sweating on the beat
//      44.3-46.9  one sweat drop crawls down the Horse's long face, slowly, while it stares at us
//      45.7-46.8  Oppa's shades slide down his nose: he sneaks a sideways look at the Horse...
//      46.45      ...the Horse's eye slides to him. Busted: shades snap back up, eyes front.
//      46.95      the drop falls off its chin.                                 [out: hard cut on bar 24]
//
// C  47.455-51.091  THE BOARD-GAME BENCH (2 bars)  [in: hard cut, Oppa strutting in on the downbeat]
//    A riverside promenade: the river, the far bank's towers, a big bridge (the next chapter's). Two Grandpas at a
//    grid board (round black and white stones) on a little table by the bench. The opponent is THE Horse, upright
//    behind the table, a stone held up on its raised hoof, pondering.
//      47.46-48.0  Oppa struts in and hops up onto the bench: cool, arms spread along the backrest
//      48.0-48.9   the eye follows his glance to the game: the Horse, hoof raised, perfectly still
//      48.8        the hoof rises (anticipation)...
//      49.273      SLAM on the bar-25 downbeat: the stone clacks down, every stone on the board jumps
//      49.3-50.2   the Grandpa gapes (the other one too, a beat later)
//      50.3-51.0   the Horse's eye slides to us. Deadpan.                          [out: hard cut on bar 26]
//
// D  51.091-52.909  THE TENNIS COURT (1 bar)  [in: hard cut, Oppa mid disco point on the downbeat]
//    A hard court, the net, the green windscreen. Oppa (tux) pumps the disco point on every beat while tennis
//    balls whizz past him from the right (head, then chest): he doesn't flinch. The third one he plucks out of the
//    air with his pointing hand without looking. Hold the pose.
//    [out: cut on the bar-27 downbeat to c04 (the bridge lot, Oppa in the tux)]
//
// counterHUD in every shot (1,500 -> 60,000). Text: none.
// ==============================================================================================================
(() => {
  // ---------- time ----------
  const T0 = barT(15), T_B1 = barT(22), T_G = barT(24), T_T = barT(26), T_END = barT(27);
  const T_BREATH = beatT(17, 2.5), T_SING = beatT(17, 3), T_BELT = beatT(17, 3.4);
  const T_SLAP = barT(18);                                           // the sheet hits his face on the downbeat
  const T_SHEET = T_SLAP - .52;                                      // ...having appeared at the right edge
  const T_GRAB = beatT(18, 3), T_RIP = beatT(18, 3.5), T_REL = barT(19);   // grip on B4, rip, let go on bar 19
  const T_LENS = beatT(21, 3), T_COVER = beatT(21, 3.8);             // the last sheet flies at the lens, covers it

  const H1 = (i, k) => hash(i * 17.137 + k * 3.713 + .5);
  const faceOf = m => ({ eyes: m.eyes, mouth: m.mouth, squint: m.squint, blush: m.blush, emote: m.emote, emoteK: m.emoteK, emoteAge: m.emoteAge, lookX: m.lookX, lookY: m.lookY, sq: m.sq || 0, dy: m.dy || 0 });
  // the same transform clawd() uses for the body (feet at x, y; dx/dy in u; rot about the feet; squash), so costume
  // bits can be painted BEHIND a character exactly where its body is
  function inBody(x, y, u, q, fn) {
    const sq = q.sq || 0;
    push(); translate(x + (q.dx || 0) * u, y + (q.dy || 0) * u); if (q.rot) rotate(q.rot);
    scale((q.flip ? -1 : 1) * (q.sx ?? 1) * (1 + sq * .6), (q.sy ?? 1) * (1 - sq)); fn(); pop();
  }
  // a body-space point (in u) -> world, through the same transform
  function bodyPt(x, y, u, q, bx, by) {
    const sq = q.sq || 0, sx = (q.flip ? -1 : 1) * (q.sx ?? 1) * (1 + sq * .6), sy = (q.sy ?? 1) * (1 - sq), r = q.rot || 0;
    const X = bx * u * sx, Y = by * u * sy;
    return [x + (q.dx || 0) * u + X * Math.cos(r) - Y * Math.sin(r), y + (q.dy || 0) * u + X * Math.sin(r) + Y * Math.cos(r)];
  }
  const P_ = (u, pts) => pts.map(([a, b]) => [a * u, b * u]);

  // =========================================== A: THE PAPER BLIZZARD ===========================================
  // ---------- the underpass, painted in one-point perspective (a flat backdrop, like stableAisle) ----------
  // a point at depth d on the side walls sits at x = VPX ± KX/d; the ceiling at VPY - KC/d, the floor at VPY + KF/d.
  // The left wall is solid (shutter doors); the right side is open to the storm between its pillars.
  const VPX = 960, VPY = 452, KX = 1250, KC = 760, KF = 820, DFAR = 9, DNEAR = .5;
  const ux = (d, s) => VPX + s * KX / d, uc = d => VPY - KC / d, uf = d => VPY + KF / d;
  const DEP = [1.12, 1.5, 2.02, 2.72, 3.66, 4.95, 6.7];
  const WALL = '#88A5A1', WALL_DK = '#6E8C89', CEIL = '#5C7879', BEAM = '#48625F', FLOOR_C = '#A3AFA9', STORM = '#F3F2EA';
  function underpass(t, k) {
    boilSeed('c3 up mouth');
    paint(rectPts(ux(DFAR, -1) - 40, uc(DFAR) - 40, 2 * KX / DFAR + 80, (KC + KF) / DFAR + 80), { wash: STORM, ink: null });
    boilSeed('c3 up ceil');
    paint([[ux(DNEAR, -1), uc(DNEAR)], [ux(DNEAR, 1), uc(DNEAR)], [ux(DFAR, 1), uc(DFAR)], [ux(DFAR, -1), uc(DFAR)]], { wash: CEIL, fill: '#3E5657', fillOp: 70, tex: .5, bleed: .02, ink: null });
    boilSeed('c3 up lwall');
    paint([[ux(DNEAR, -1), uc(DNEAR)], [ux(DFAR, -1), uc(DFAR)], [ux(DFAR, -1), uf(DFAR)], [ux(DNEAR, -1), uf(DNEAR)]], { wash: WALL, fill: WALL_DK, fillOp: 60, tex: .6, bleed: .02, ink: null });
    boilSeed('c3 up rside');     // the open side: the white storm outside
    paint([[ux(DNEAR, 1), uc(DNEAR)], [ux(DFAR, 1), uc(DFAR)], [ux(DFAR, 1), uf(DFAR)], [ux(DNEAR, 1), uf(DNEAR)]], { wash: STORM, ink: null });
    const dockH = 150;
    boilSeed('c3 up dock');
    paint([[ux(DNEAR, 1), uf(DNEAR) - dockH / DNEAR], [ux(DFAR, 1), uf(DFAR) - dockH / DFAR], [ux(DFAR, 1), uf(DFAR)], [ux(DNEAR, 1), uf(DNEAR)]], { wash: WALL_DK, ink: null });
    for (let j = 0; j < 3; j++) { const h = dockH * (j + .5) / 3; inkLine([[ux(.8, 1), uf(.8) - h / .8], [ux(DFAR, 1), uf(DFAR) - h / DFAR]], .5, '#54706D', 'inkfine', 0); }
    inkLine([[ux(.8, 1), uf(.8) - dockH / .8], [ux(DFAR, 1), uf(DFAR) - dockH / DFAR]], 1.2, PAL.ink, 'ink', 0);
    boilSeed('c3 up floor');
    paint([[ux(DNEAR, -1), uf(DNEAR)], [ux(DNEAR, 1), uf(DNEAR)], [ux(DFAR, 1), uf(DFAR)], [ux(DFAR, -1), uf(DFAR)]], { wash: FLOOR_C, fill: '#8C9893', fillOp: 70, tex: .8, bleed: .02, ink: null });
    // storm light spilling in through the open side onto the floor
    for (let i = 1; i < DEP.length - 1; i++) { const d = (DEP[i] + DEP[i + 1]) / 2; glow(ux(d, 1) - 260 / d, uf(d) - 20 / d, 420 / d, '#FFF9EC', .32); }
    // shutter doors on the left wall between the pillars (the slats run along the wall toward the vanishing point)
    for (let i = 0; i + 1 < DEP.length; i++) {
      if (i % 2) continue;
      const dA = DEP[i] + .15, dB = DEP[i + 1] - .05, hD = 440;
      boilSeed('c3 door' + i);
      paint([[ux(dA, -1), uf(dA) - hD / dA], [ux(dB, -1), uf(dB) - hD / dB], [ux(dB, -1), uf(dB)], [ux(dA, -1), uf(dA)]], { wash: '#9CB4AF', ink: PAL.ink, sw: .6 });
      for (let j = 1; j < 10; j++) { const h = hD * j / 10; inkLine([[ux(dA, -1), uf(dA) - h / dA], [ux(dB, -1), uf(dB) - h / dB]], .45, '#5E7A77', 'inkfine', 0); }
    }
    // floor markings: the dashed centre line and a side line each side, converging on the vanishing point
    boilSeed('c3 lines');
    for (const [a, b] of [[1.0, 1.28], [1.55, 1.95], [2.35, 2.95], [3.55, 4.45], [5.4, 6.8]]) { const w = 13; paint([[VPX - w / a, uf(a)], [VPX + w / a, uf(a)], [VPX + w / b, uf(b)], [VPX - w / b, uf(b)]], { wash: '#E8C24A', ink: null }); }
    for (const s of [-1, 1]) { const o = 700, w = 16; paint([[VPX + s * (o - w) / .8, uf(.8)], [VPX + s * (o + w) / .8, uf(.8)], [VPX + s * (o + w) / DFAR, uf(DFAR)], [VPX + s * (o - w) / DFAR, uf(DFAR)]], { wash: '#E6E4DA', ink: null }); }
    // the paper-dust haze: the far end of the hall goes white as the storm thickens
    boilSeed('c3 haze');
    paint(ellPts(VPX, VPY + 30, 520, 250, 20), { fill: '#F6F4EC', fillOp: 70 + 90 * k, bleed: .35, tex: .2, ink: null });
    // scraps skidding and tumbling along the floor (world space, at their own depths)
    const Tw = windT(t);
    for (let i = 0; i < 14; i++) {
      const d = lerp(1.25, 6, H1(i, 81)), v = (500 + 500 * H1(i, 82)) / d, span = 2 * KX / d + 400, P = Tw * v + H1(i, 83) * span * 3, q = frac(P / span);
      const x = ux(d, 1) + 200 - q * span, hop = Math.abs(Math.sin(Tw * (4 + 5 * H1(i, 84)) + i)) * 60 / d, y = uf(d) - hop - 6 / d, w = (40 + 40 * H1(i, 85)) / d;
      boilSeed('c3 skid' + i);
      scrap(x, y, w, w * .7, Tw * (3 + 4 * H1(i, 86)) + i, Math.cos(Tw * 6 + i), H1(i, 87) < .4 ? 1 : 0, PAPER[i % PAPER.length], { ink: d < 2.5 ? .5 : 0 });
    }
    // pillars and ceiling beams, far to near (the right-hand pillars are slim: the storm shows between them)
    for (let i = DEP.length - 1; i >= 0; i--) {
      const d = DEP[i], bh = 70;
      boilSeed('c3 beam' + i);
      paint([[ux(d, -1), uc(d)], [ux(d, 1), uc(d)], [ux(d, 1), uc(d) + bh / d], [ux(d, -1), uc(d) + bh / d]], { wash: BEAM, ink: PAL.ink, sw: .7 });
      paint([[ux(d, -1), uc(d) + bh / d], [ux(d, 1), uc(d) + bh / d], [ux(d + .3, 1), uc(d + .3) + bh / (d + .3)], [ux(d + .3, -1), uc(d + .3) + bh / (d + .3)]], { wash: '#3F5657', ink: null });
      // the strip light under the beam, flickering in the storm
      const lk = flick(t, i * 3.1, .2 + .35 * k), lw = 300 / d, ly = uc(d) + (bh + 26) / d;
      boilSeed('c3 lamp' + i);
      paint(rrPts(VPX - lw / 2, ly - 9 / d, lw, 18 / d, 8 / d), { wash: mixCol('#B8C6C6', '#FFFDF4', lk), ink: PAL.ink, sw: .5 });
      if (lk > .3) glow(VPX, ly + 30 / d, 420 / d, '#EAF8F4', .3 * lk);
      for (const s of [-1, 1]) {
        const PW = s < 0 ? 175 : 120, dd = s < 0 ? .3 : .12, d2 = d + dd;
        const xw = ux(d, s), xi = xw - s * PW / d, xi2 = VPX + s * (KX - PW) / d2, top = uc(d) + bh / d;
        boilSeed('c3 pil' + i + s);
        paint([[xi, top], [xi2, uc(d2) + bh / d2], [xi2, uf(d2)], [xi, uf(d)]], { wash: '#8CA4A0', ink: PAL.ink, sw: .6 });   // the face toward the centre
        const x0 = Math.min(xi, xw), x1 = Math.max(xi, xw);
        paint([[x0, top], [x1, top], [x1, uf(d)], [x0, uf(d)]], { wash: '#B8C8C3', ink: PAL.ink, sw: .7 });
        paint([[x0 + (x1 - x0) * .72, top], [x1, top], [x1, uf(d)], [x0 + (x1 - x0) * .72, uf(d)]], { wash: '#A3B6B1', ink: null });
        const hb = 80 / d;   // the hazard band at the foot
        paint([[x0, uf(d) - hb], [x1, uf(d) - hb], [x1, uf(d)], [x0, uf(d)]], { wash: '#E8BE3A', ink: PAL.ink, sw: .5 });
        for (let j = 0; j < 4; j++) { const xa = lerp(x0, x1, j / 4 + .05); inkLine([[xa, uf(d)], [xa + (x1 - x0) * .18, uf(d) - hb]], 2.2 / d + .4, '#3A3440', 'ink', 0); }
      }
    }
    // paper piling up against the left wall, growing through the storm
    const nd = Math.floor(22 + 40 * seg(t, T0, T_B1));
    for (let i = 0; i < nd; i++) {
      const d = lerp(1.05, 6.5, H1(i, 71)), x = ux(d, -1) + (30 + 170 * H1(i, 72)) / d, y = uf(d) - (4 + 30 * H1(i, 73)) / d, r = 28 / d * (.6 + .6 * H1(i, 74));
      boilSeed('c3 drift' + i);
      paint([[x - r, y + r * .3], [x - r * .2, y - r * .5], [x + r, y - r * .2], [x + r * .7, y + r * .4]], { wash: PAPER[i % PAPER.length], ink: d < 2.2 ? '#8A8478' : null, sw: .4 });
    }
  }

  // ---------- the storm: paper on closed-form paths (screen space) ----------
  // the storm's own clock: it speeds up through A1 and surges once a bar; monotonic, so every scrap is closed-form
  const windT = t => { const a = t - T0; return a + .022 * a * a + .05 * Math.sin((t - OFF) / BAR * TAU); };
  const DENS_A = T0 + 1.2, DENS_B = barT(20) + .5;
  const dens = t => .45 + .55 * seg(t, DENS_A, DENS_B);                  // how much of the storm is flying
  const gale = t => .35 + .65 * ease(seg(t, T0 + 1, barT(20) + 1));      // how hard it blows (lean, hair, jacket)
  const PAPER = ['#FBF7EE', '#F3EDDD', '#FFFBF3', '#ECE4D0', '#F6EFDF', '#FAF4E6'];
  const PTINT = ['#E1EBEE', '#F3E2DA', '#E7EDD8', '#F1E5C9'];
  const LAYERS = {
    far:   { n: 170, s: [6, 15],   v: [480, 760],   y: [30, 1040], m: 40,  seed: 1, ink: 0,   inkP: 0,   op: 215 },
    mid:   { n: 110, s: [15, 42],  v: [850, 1300],  y: [10, 1070], m: 80,  seed: 2, ink: .4,  inkP: .3,  op: 255 },
    front: { n: 34, s: [30, 74],   v: [1250, 1800], y: [0, 1080],  m: 130, seed: 3, ink: .55, inkP: 1,   op: 255 },
    near:  { n: 9,  s: [130, 250], v: [2300, 3100], y: [-40, 1120], m: 340, seed: 4, ink: .9,  inkP: 1,   op: 255, blur: 1 },
  };
  // the corners of a scrap: kind 0 sheet, 1 torn, 2 strip, 3 newsprint, 4 ruled notebook page
  function scrapShape(kind, w, h, hs) {
    if (kind === 1) return [[-w / 2, -h / 2], [w * (.1 + .2 * hs), -h / 2 - h * .08], [w / 2, -h / 2 + h * .1], [w / 2 - w * .12, h * .05], [w / 2, h / 2], [-w * .2, h / 2 - h * .12], [-w / 2, h / 2]];
    return [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]];
  }
  // one scrap: centre (x, y), turned rot, tumbling (fl = cos of its flip; 1 face-on, 0 edge-on, < 0 its back)
  function scrap(x, y, w, h, rot, fl, kind, col, o = {}) {
    const f = Math.max(.1, Math.abs(fl)) * (fl < 0 ? -1 : 1), c = Math.cos(rot), s = Math.sin(rot);
    const tr = ([a, b]) => [x + a * c - b * f * s, y + a * s + b * f * c];
    const back = fl < 0;
    if (kind === 2) {          // a streamer: a long strip curling as it flies
      const C = []; for (let k = 0; k <= 6; k++) { const a = lerp(-w / 2, w / 2, k / 6); C.push(tr([a, Math.sin(k * 1.1 + (o.curl || 0)) * h * 1.6])); }
      paint(ribbon(C, h * .9, h * .6), { wash: col, washOp: o.op ?? 255, ink: o.ink ? '#7E7A70' : null, sw: (o.ink || .5) * .8 });
      return;
    }
    paint(scrapShape(kind, w, h, o.hs || .5).map(tr), { wash: back ? mixCol(col, '#A9ADA4', .28) : col, washOp: o.op ?? 255, ink: o.ink ? '#7E7A70' : null, sw: o.ink || .5 });
    if (back || Math.abs(fl) < .45 || w < 26) return;
    if (kind === 3) {          // newsprint: a headline bar and two columns of scribble (never a letter)
      inkLine([tr([-w * .38, -h * .3]), tr([w * .2, -h * .3])], Math.max(.8, h * .05), '#8E8878', 'ink', 0);
      for (let cl = 0; cl < 2; cl++) for (let r = 0; r < 3; r++) {
        const a0 = -w * .38 + cl * w * .42, yy = -h * .08 + r * h * .15, pts = [];
        for (let k = 0; k <= 5; k++) pts.push(tr([a0 + k * w * .066, yy + (k % 2 ? -1 : 1) * h * .03]));
        inkLine(pts, .5, '#9A9484', 'inkfine', .5);
      }
    } else if (kind === 4) {   // a notebook page: pale blue rules and a red margin
      for (let r = 0; r < 4; r++) inkLine([tr([-w * .45, -h * .3 + r * h * .2]), tr([w * .45, -h * .3 + r * h * .2])], .45, '#9FC0D8', 'inkfine', 0);
      inkLine([tr([-w * .3, -h * .46]), tr([-w * .3, h * .46])], .5, '#E08A8A', 'inkfine', 0);
    }
  }
  function stormLayer(t, name, o = {}) {
    const L = LAYERS[name], Tw = windT(t), span = W + 2 * L.m, dk = dens(t);
    for (let i = 0; i < L.n; i++) {
      const hA = H1(i, L.seed), hB = H1(i, L.seed + 10), hC = H1(i, L.seed + 20), hD = H1(i, L.seed + 30);
      const v = lerp(L.v[0], L.v[1], hA), ph = hB * span * 5, P = Tw * v + ph, pass = Math.floor(P / span), q = P / span - pass;
      // scrap i joins once the storm is dense enough, and only on a pass that starts after that: nothing pops in
      const need = (i + .5) / L.n;
      if (need > dk) continue;
      if (need > .45) { const tAct = lerp(DENS_A, DENS_B, (need - .45) / .55); if ((pass * span - ph) / v < windT(tAct)) continue; }
      const hP = H1(i * 7 + pass * 13, L.seed + 40), hQ = H1(i * 3 + pass * 5, L.seed + 50);
      const drift = (hQ - .5) * 380, eddy = hD < .2 ? 50 : 0;
      let yb = lerp(L.y[0], L.y[1], hP);
      // the big scraps fly in lanes above or below the trio's band, chosen so their drift never crosses it (the
      // dance and the faces stay readable; no scrap ever pops)
      if (o.band && (name === 'near' || lerp(L.s[0], L.s[1], hD) > 44)) {
        const [bT, bB] = o.band, m_ = 40 + eddy;
        yb = H1(i, L.seed + 70) < .72 ? lerp(L.y[0], bT - m_ - Math.max(0, drift), hP) : lerp(bB + m_ + Math.max(0, -drift), L.y[1] + 240, hP);
      }
      let x = W + L.m - q * span, y = yb + drift * q + 34 * Math.sin(Tw * (1.2 + 2.4 * hC) + hD * TAU);
      if (eddy) { x += eddy * Math.cos(Tw * 6 + i); y += eddy * Math.sin(Tw * 6 + i); }             // caught in an eddy
      const w = lerp(L.s[0], L.s[1], hD), rot = hC * TAU + Tw * (hD - .5) * 7, fl = Math.cos(Tw * (2.5 + 7 * hA) + hB * TAU);
      const kind = hA < .1 ? 2 : hA < .4 ? 1 : (name === 'far' ? 0 : hA > .82 ? 3 : hA > .72 ? 4 : 0);
      const h = kind === 2 ? w * .16 : w * lerp(.6, 1.2, hC), ww = kind === 2 ? w * 2.2 : w;
      const col = hQ < .12 ? PTINT[i % 4] : PAPER[i % PAPER.length];
      boilSeed('c3 sc ' + name + i);
      if (L.blur) for (let k = 0; k < 3; k++) { const yy = y - h * .3 + k * h * .3, L0 = ww * (1.1 + .5 * k); paint(ribbon([[x + ww * .45, yy], [x + ww * .45 + L0 * .5, yy + (k - 1) * 5], [x + ww * .45 + L0, yy + (k - 1) * 9]], 9 - k * 2, 1), { wash: '#F7F3EA', washOp: 200, ink: null }); }
      scrap(x, y, ww, h, rot, fl, kind, col, { ink: H1(i, L.seed + 60) < L.inkP ? L.ink : 0, hs: hB, op: L.op, curl: Tw * 7 + i });
    }
  }
  // wind: long tapered speed lines tearing through right to left
  function windLines(t, n) {
    const Tw = windT(t);
    for (let i = 0; i < n; i++) {
      const v = 2600 + 1400 * H1(i, 91), span = W + 1400, P = Tw * v + H1(i, 92) * span * 3, pass = Math.floor(P / span), q = P / span - pass;
      const x = W + 700 - q * span, y = 30 + 1020 * H1(i * 5 + pass * 11, 93), len = 240 + 420 * H1(i + pass * 3, 94);
      boilSeed('c3 wl' + i);
      const nn = 1 + Math.floor(H1(i, 96) * 3), bend = (H1(i + pass, 97) - .5) * 60;
      for (let j = 0; j < nn; j++) { const yy = y + j * 16, xx = x + j * 40, L2 = len * (1 - j * .2);
        paint(ribbon([[xx, yy], [xx + L2 * .5, yy - 7 + bend * .5], [xx + L2, yy + 3 + bend]], (3 + 3 * H1(i, 95)) * (1 - j * .25), .6), { wash: '#F8F5EC', washOp: 225, ink: null }); }
    }
  }
  // ---------- Oppa's paper: the flecks that stick, the sheet on his face ----------
  const FLK = ['#FFFAF0', '#F6F0E2', '#FBF6EA', '#EFE8D6'];
  const NF = 72, FT0 = T0 + .7, FDUR = T_B1 - FT0 - .6;
  const fleckT = i => FT0 + FDUR * Math.pow((i + .5) / NF, .9);
  function bodyFlecks(t, u, sw) {                  // body space (front view): suit, face, shades, hair
    for (let i = 0; i < NF; i++) {
      const a = t - fleckT(i); if (a < 0) continue;
      const fx = lerp(-4.7, 4.7, H1(i, 201)), fy = lerp(-9.0, -2.25, H1(i, 202));
      if (fy < -8.3 && Math.abs(fx) > 3.4) continue;                          // outside the hair's rounded top
      const r = (.26 + .3 * H1(i, 203)) * u * (1 + 1.1 * Math.exp(-a * 20)), rot = H1(i, 204) * TAU, P = [];
      for (let k = 0; k < 5; k++) { const q = rot + k / 5 * TAU, rr = r * (.55 + .55 * H1(i * 5 + k, 205)); P.push([fx * u + Math.cos(q) * rr, fy * u + Math.sin(q) * rr * .8]); }
      paint(P, { wash: FLK[i % 4], ink: r > .42 * u ? '#A39D90' : null, sw: sw * .3 });
    }
  }
  function armFlecks(t, u, sw, side, AL) {         // arm-tip space: the arm runs from x = -AL*u (root) to 0 (tip)
    for (let i = 0; i < 8; i++) {
      const j = i + (side > 0 ? 300 : 400), ts = FT0 + .5 + FDUR * Math.pow((i + .5) / 8, .9); if (t < ts) continue;
      const fx = -AL * u * (.15 + .75 * H1(j, 1)), fy = (H1(j, 2) - .5) * .7 * u, r = (.22 + .2 * H1(j, 3)) * u;
      paint(ellPts(fx, fy, r, r * .7, 5, 0, H1(j, 4) * 3), { wash: FLK[i % 4], ink: null });
    }
  }
  // the sheet flat over his face (body space). puff = the paper bulging over his open mouth as he sings under it
  function faceSheet(t, u, sw, o = {}) {
    const a = t - T_SLAP, k = 1 + .22 * Math.exp(-a * 16), g = gale(t);
    const fl1 = Math.sin(t * 21) * (.35 + .4 * g), fl2 = Math.sin(t * 27 + 1.3) * (.3 + .35 * g), fl3 = Math.sin(t * 17 + 2.1) * .5;
    push(); translate(-.2 * u, -6.0 * u); rotate(-.06 + .05 * Math.exp(-a * 9) * Math.sin(a * 30)); scale(k, k);
    const P = P_(u, [[-5.2 - .9 * g + fl1, -3.4 - .5 * fl2], [-1.5, -3.5], [2.2, -3.4], [4.7, -3.05], [5.05, -.6], [4.9, 3.0], [1.4, 3.25], [-2.2, 3.1], [-5.6 - 1.4 * g + fl2, 3.6 + .6 * fl1], [-5.9 - 1.1 * g + fl3, 1.4], [-5.0 - .6 * g, -.8 + .3 * fl3]]);
    paint(P, { wash: '#FAF6EC', fill: '#E6DECB', fillOp: 70, tex: .4, bleed: .02, ink: '#6E685E', sw: sw * .8, curv: .15 });
    // his round shades and his mouth press through the paper
    for (const s of [-1, 1]) { const E = ellPts((s * 2.5 + .2) * u, -.05 * u, 1.35 * u, 1.2 * u, 16); inkLine(E.concat([E[0]]), sw * .45, '#B8AE9A', 'inkfine', .5); }
    const puff = o.puff ?? 0;
    if (puff > .05) paint(ellPts(.2 * u, 1.7 * u, (.55 + .45 * puff) * u, (.4 + .5 * puff) * u, 12), { fill: '#C8BCA4', fillOp: 110, bleed: .05, ink: null });
    // newsprint scribble columns (no letters) and a crease
    for (let c = 0; c < 2; c++) for (let r = 0; r < 4; r++) {
      const x0 = (c ? .9 : -4.0), y0 = -2.4 + r * .75 + (r > 1 ? 2.4 : 0), pts = [];
      for (let j = 0; j <= 6; j++) pts.push([(x0 + j * .45) * u, (y0 + (j % 2 ? -.12 : .12)) * u]);
      inkLine(pts, sw * .5, '#9A9282', 'inkfine', .5);
    }
    inkLine(P_(u, [[-4.4, -1.4], [-.8, -1.1], [4.4, -1.6]]), sw * .4, '#C8BEA8', 'inkfine', .5);
    pop();
  }
  // a loose sheet (the one that flies at him, the one he rips off): centre, size in px, turned, tumbling, rippling
  function looseSheet(x, y, w, h, rot, fl, rip, key) {
    const c = Math.cos(rot), s = Math.sin(rot), f = Math.max(.12, Math.abs(fl)) * Math.sign(fl || 1);
    const pts = [];
    for (let i = 0; i <= 4; i++) pts.push([lerp(-w / 2, w / 2, i / 4), -h / 2 + Math.sin(i * 1.7 + rip) * h * .06]);
    for (let i = 0; i <= 3; i++) pts.push([w / 2 + Math.sin(i * 2.1 + rip) * w * .05, lerp(-h / 2, h / 2, i / 3)]);
    for (let i = 4; i >= 0; i--) pts.push([lerp(-w / 2, w / 2, i / 4), h / 2 + Math.sin(i * 1.9 + rip + 1) * h * .07]);
    for (let i = 3; i >= 0; i--) pts.push([-w / 2 + Math.sin(i * 2.4 + rip + 2) * w * .08, lerp(-h / 2, h / 2, i / 3)]);
    const P = pts.map(([a, b]) => [x + a * c - b * f * s, y + a * s + b * f * c]);
    boilSeed('c3 loose ' + key);
    paint(P, { wash: fl < 0 ? '#DCD6C6' : '#FAF6EC', fill: '#E0D8C4', fillOp: 60, tex: .4, ink: '#6E685E', sw: .9, curv: .2 });
    if (fl > .3) for (let r = 0; r < 4; r++) {
      const yy = -h * .3 + r * h * .18, L = [];
      for (let j = 0; j <= 6; j++) L.push([-w * .38 + j * w * .12, yy + (j % 2 ? -1 : 1) * h * .03]);
      inkLine(L.map(([a, b]) => [x + a * c - b * f * s, y + a * s + b * f * c]), .7, '#9A9282', 'inkfine', .5);
    }
  }

  // ---------- the trio ----------
  const trioKeys = side => [[T0 - 3, 'windflap'], [barT(17), 'strut', { side }], [barT(20), 'windflap']];
  const approach = t => { const k = seg(t, T0, T_B1); return .7 * k + .3 * ease(k); };
  const oppaU = t => lerp(14, 25.5, approach(t));
  const feetOf = u => VPY + KF * u / 37.5;                    // walking toward us down the centre line
  // leaning into the wind (it blows from the right): windflap leans hard, the strut only a little
  const leanOf = t => { const w = 1 - seg(t, barT(17) - .1, barT(17) + .1) + seg(t, barT(20) - .1, barT(20) + .1); return lerp(.05, .15 + .07 * gale(t), clamp(w)); };
  function jacketFlare(t, u, sw, g) {          // body space, painted BEHIND Oppa: the jacket's left panel flies downwind
    const f1 = Math.sin(t * 17.3), f2 = Math.sin(t * 23.1 + 1), f3 = Math.sin(t * 13.7 + 2), L = 1.3 + 2.1 * g;
    const P = P_(u, [[-4.3, -4.3], [-4.8 - L * .45, -4.55 + .25 * f1], [-4.8 - L, -4.2 + .35 * f2], [-4.8 - L * .92, -3.3 + .3 * f3], [-4.8 - L * 1.02, -2.25 + .4 * f1], [-4.8 - L * .5, -1.95 + .2 * f2], [-4.3, -2.05]]);
    paint(P, { wash: GP.tux, fill: GP.tuxDk, fillOp: 90, tex: .5, ink: PAL.ink, sw: sw * .8, curv: .3 });
    inkLine(P_(u, [[-4.8 - L * .9, -2.4 + .4 * f1], [-4.8 - L * .5, -2.15 + .2 * f2], [-4.4, -2.2]]), sw * 1.6, GP.tuxDk, 'ink', .4);
  }
  function hairStream(t, v, flip, g) {         // head space: the Dancers' hair streams downwind (screen-left)
    const dir = flip ? 1 : -1;
    return (u, sw) => {
      const n = v === 0 ? 2 : 3;
      for (let j = 0; j < n; j++) {
        const ph = t * (10 + j * 2.3) + j * 1.7 + v * 2, w1 = Math.sin(ph) * (.25 + .35 * g), w2 = Math.sin(ph * 1.35 + 1) * (.3 + .4 * g);
        const x0 = v === 0 ? 4.6 : 4.9, y0 = v === 0 ? -9.2 + j * .9 : -8.7 + j * .95, L = (v === 0 ? 3.2 : 1.6) + (v === 0 ? 3.6 : 2.4) * g - j * .5;
        const pts = [[x0, y0], [x0 + L * .35, y0 - .2 + w1 * .4], [x0 + L * .7, y0 + .1 + w1], [x0 + L, y0 + .5 * (1 - g) + w2]].map(([a, b]) => [dir * a, b]);
        paint(ribbon(P_(u, pts), (v === 0 ? 1.2 : .9) * u - j * .15 * u, .2 * u), { wash: '#221C2A', fill: '#3A3450', fillOp: 50, ink: PAL.ink, sw: sw * .5 });
      }
    };
  }
  // what Oppa's left arm does around the peel: [aL, forearm angle, forearm length] or null (just the dance)
  function peelArm(t) {
    if (t < T_GRAB - .05 || t > T_REL + .22) return null;
    if (t < T_RIP) return { aL: 1.0, ang: -2.05, len: 2.35, hold: 'corner' };
    if (t < T_REL) { const k = easeIn(seg(t, T_RIP, T_REL)); return { aL: lerp(1.0, .3, k), ang: lerp(-2.05, -.2, k), len: lerp(2.35, 2.25, k), hold: 'sheet', k }; }
    const k = ease(seg(t, T_REL, T_REL + .22)); return { aL: lerp(.3, 1.0, k), ang: lerp(-.2, -2.05, k), len: 2.3, hold: null, k: 1 };
  }
  function oppaStorm(t, x, y, u) {
    const q0 = memberOpts('oppa', { look: 'tux' }), g = gale(t);
    const pose = routine(t, trioKeys(-1), { blend: .15, hand: q0._hand, sleeve: q0._sleeve });
    // the face: lips tight in the gale, a breath, the big note... the sheet... then singing on through it
    let mouth = 'smirk', sq = pose.sq || 0, rot = (pose.rot || 0) + leanOf(t);
    if (t > T_BREATH) mouth = 'o';
    if (t > T_SING) mouth = 'sing';
    if (t > T_BELT) mouth = 'belt';
    if (t > T_BREATH && t < T_SLAP) { const k = ease(seg(t, T_BREATH, T_SLAP - .05)); sq -= .07 * k; rot -= .06 * k; }
    const sa = t - T_SLAP;
    if (sa >= 0) { sq += .16 * Math.exp(-sa * 9) * Math.cos(sa * 22); rot += .1 * Math.exp(-sa * 7); }   // the hit knocks his head back
    const sheetOn = t >= T_SLAP && t < T_RIP;
    if (t >= T_RIP) mouth = singing(t, t > barT(20) ? 'shout' : 'sing').mouth;
    const pa = peelArm(t), q = { ...pose, sq, rot };
    if (pa) {
      q.aL = pa.aL; q.frontArm = 'L'; q.armLen = { L: .8, R: (typeof pose.armLen === 'object' ? pose.armLen.R : pose.armLen) ?? 1 };
      q.armL = bentHook(pa.ang, pa.len, q0._sleeve, q0._hand, { tip: (uu, sw) => {
        if (pa.hold === 'corner') { push(); rotate(pa.aL - pa.ang); paint(P_(uu, [[-.3, -.9], [1.4, -.6], [1.2, .9], [-.2, .7]]), { wash: '#FAF6EC', ink: '#6E685E', sw: sw * .6 }); pop(); }
        if (pa.hold === 'sheet') { push(); rotate(pa.aL - pa.ang); const r = t * 40;
          looseSheet(lerp(-3.2, 4.6, easeOut(pa.k)) * uu, .4 * uu, lerp(9.6, 9.2, pa.k) * uu, lerp(6.2, 4.6, pa.k) * uu, .15 * Math.sin(r), .85 + .15 * Math.sin(r * .7), r, 'held'); pop(); }
      } });
    }
    const AL = 2.2 * (typeof q.armLen === 'object' ? (q.armLen.L ?? 1) : (q.armLen ?? 1)), AR = 2.2 * (typeof q.armLen === 'object' ? (q.armLen.R ?? 1) : (q.armLen ?? 1));
    const hL = q.armL, hR = q.armR;
    q.armL = (uu, sw) => { armFlecks(t, uu, sw, -1, AL); if (hL) hL(uu, sw); };
    q.armR = (uu, sw) => { armFlecks(t, uu, sw, 1, AR); if (hR) hR(uu, sw); };
    const puff = sheetOn ? Math.abs(Math.sin((t - OFF) / EIGHTH * Math.PI)) * .8 : 0;
    const qq = { look: 'tux', ...q, mouth: sheetOn ? null : mouth, eyes: 'normal', boilKey: 'oppa',
      draw: (uu, sw) => { bodyFlecks(t, uu, sw); if (sheetOn) faceSheet(t, uu, sw, { puff }); } };
    boilSeed('c3 flare');
    inBody(x, y, u, { ...qq, sx: q0.sx, sy: q0.sy }, () => jacketFlare(t, u, clamp(u / 15, .45, 2.4), g));
    member('oppa', x, y, u, qq);
    return { q: { ...qq, sx: q0.sx, sy: q0.sy } };
  }
  function dancerStorm(t, x, y, u, v, flip, side) {
    const q0 = memberOpts('dancer', { v }), g = gale(t);
    const pose = routine(t, trioKeys(side), { blend: .15, ph: v ? .05 : -.04, hand: q0._hand, sleeve: q0._sleeve });
    const m = mood('dancer', t, [[T0 - 3, 'determined'], [T_SLAP + .1 + .06 * v, 'laugh'], [T_GRAB + .1 * v, 'determined']], { v });
    const glance = t > T_SLAP && t < T_GRAB + .1 * v ? -1 : 0;
    const f = faceOf(m);
    member('dancer', x, y, u, { v, flip, eyes: f.eyes === 'determined' ? 'narrow' : f.eyes, mouth: f.mouth, squint: f.squint, lookX: glance,
      ...pose, rot: (pose.rot || 0) + leanOf(t) * .9, hairSway: .25 + .2 * Math.sin(t * 11 + v), head: hairStream(t, v, flip, g), boilKey: 'dancer' + v });
  }
  // the camera: pushes in over the whole section, flinches when the sheet hits
  function blizCam(t) {
    const k = ease(seg(t, T0 + .15, T_B1 - .05)), u = oppaU(t), fy = feetOf(u);
    let z = lerp(1.0, 1.38, k);
    const sa = t - T_SLAP; if (sa > 0) z *= 1 + .04 * Math.exp(-sa * 6);
    const sy = lerp(800, 925, k), cy = fy - (sy - 540) / z, cx = 960 + 16 * Math.sin(t * .55);
    const [shx, shy] = sa > 0 && sa < .3 ? shakeXY(t, 7 * (1 - sa / .3)) : [0, 0];
    return [cx + shx, cy + shy, z];
  }
  function blizzard(t, lt, dur) {
    const [cx, cy, z] = blizCam(t), u = oppaU(t), fy = feetOf(u), g = gale(t);
    camBegin(cx, cy, z);
    underpass(t, g);
    camEnd();
    stormLayer(t, 'far'); stormLayer(t, 'mid');
    camBegin(cx, cy, z);
    const ud = u * .9, fyd = feetOf(ud), sp = 15 * u;
    dancerStorm(t, 960 - sp, fyd, ud, 0, true, 1);
    dancerStorm(t, 960 + sp, fyd, ud, 1, false, -1);
    const O = oppaStorm(t, 960, fy, u);
    // the sheet that flies at his face...
    if (t >= T_SHEET && t < T_SLAP) {
      const k = seg(t, T_SHEET, T_SLAP), [fx, fyy] = bodyPt(960, feetOf(oppaU(T_SLAP)), oppaU(T_SLAP), { ...O.q, dy: 0, sq: 0, rot: .03 }, -.2, -6.0);
      const uS = oppaU(T_SLAP), pk = k * .75 + easeIn(k) * .25, p = arcPt([fx + 900, fyy - 250], [fx, fyy], 110, pk), p2 = arcPt([fx + 900, fyy - 250], [fx, fyy], 110, Math.max(0, pk - .12));
      boilSeed('c3 fly trail');
      for (let j = 0; j < 3; j++) { const oy = (j - 1) * 2.2 * uS; paint(ribbon([[p[0] + 4 * uS, p[1] + oy], [lerp(p[0], p2[0], .6) + 6 * uS, lerp(p[1], p2[1], .6) + oy], [p2[0] + 9 * uS, p2[1] + oy]], 1.1 * uS, .1 * uS), { wash: '#F8F5EC', washOp: 220, ink: null }); }
      looseSheet(p[0], p[1], 10 * uS * 1.12 * lerp(.8, 1, k), 6.4 * uS * .94 * lerp(.8, 1, k), lerp(2.6, -.06, ease(k)), k > .78 ? 1 : Math.cos(k * 10), t * 30, 'fly');
    }
    // ...and the one he rips off, gone with the wind
    if (t >= T_REL && t < T_REL + 1.2) {
      const a = t - T_REL, [hx, hy] = bodyPt(960, fy, u, O.q, -8.6, -5.9);
      looseSheet(hx - 5.2 * u - 1100 * a - 500 * a * a, hy - 1.2 * u - 420 * a + 260 * a * a, 9.4 * u, 5.4 * u, -.3 - 3.5 * a, Math.cos(a * 11), t * 30, 'gone');
    }
    camEnd();
    // the front of the storm: the big scraps keep to lanes above and below the trio's band
    const cam = { cx, cy, zoom: z, rot: 0 }, band = [toScreen(960, fy - 10.6 * u, cam)[1], toScreen(960, fy + .6 * u, cam)[1]];
    stormLayer(t, 'front', { band }); windLines(t, Math.floor(8 + 12 * g)); stormLayer(t, 'near', { band });
    counterHUD(t);
    // out: a giant sheet flies at the lens and slaps flat over it (the cut to the sauna happens under it)
    if (t >= T_LENS) lensSheet(t);
    // in: the paper wipe blows away (c02 covered the frame with it)
    if (t < T0 + .45) paperWipe(.5 + (t - 31.091) / .9, 7);
  }
  // the lens sheet, screen space: grows from a scrap to a sheet bigger than the frame and slaps flat
  function lensSheet(t, off = 0) {
    const k = seg(t, T_LENS, T_COVER), e = easeIn(k), cx = lerp(1720, 960, e), cy = lerp(900, 540 + off, e);
    const w = lerp(90, 2500, e), h = w * .72, rot = lerp(2.2, .04, ease(k)), fl = k > .75 ? 1 : Math.cos(k * 8);
    screenDraw(() => {
      const c = Math.cos(rot), s = Math.sin(rot), f = Math.max(.15, Math.abs(fl)), P = [];
      for (let i = 0; i <= 6; i++) P.push([lerp(-w / 2, w / 2, i / 6), -h / 2 + Math.sin(i * 1.9 + t * 20) * h * .03 * (1 - e)]);
      for (let i = 6; i >= 0; i--) P.push([lerp(-w / 2, w / 2, i / 6), h / 2 + Math.sin(i * 1.3 + t * 17) * h * .03 * (1 - e)]);
      boilSeed('c3 lens');
      paint(P.map(([a, b]) => [cx + a * c - b * f * s, cy + a * s + b * f * c]), { wash: fl < 0 ? '#DCD6C6' : '#F8F4EA', fill: '#E4DCC8', fillOp: 70, tex: .5, ink: '#6E685E', sw: 1.4 });
      if (fl > .3) for (let r = 0; r < 6; r++) for (let cc = 0; cc < 2; cc++) {
        const L = [], y0 = -h * .32 + r * h * .12, x0 = -w * .4 + cc * w * .43;
        for (let j = 0; j <= 7; j++) L.push([x0 + j * w * .045, y0 + (j % 2 ? -1 : 1) * h * .012]);
        inkLine(L.map(([a, b]) => [cx + a * c - b * f * s, cy + a * s + b * f * c]), 1.4 * (.3 + e), '#A8A08E', 'inkfine', .5);
      }
    });
  }

  // =============================================== B: THE SAUNA ===============================================
  const SEAT = 700;
  function saunaSet(t) {
    boilSeed('c3 sa wall');
    paint(rectPts(-300, -300, 2520, SEAT + 400), { wash: '#D9A66A', fill: '#C08A50', fillOp: 60, tex: .7, bleed: .02, ink: null });
    for (let x = -280; x < 2240; x += 78) { boilSeed('c3 plank' + x); inkLine([[x, -300], [x + 2, SEAT + 40]], .8, '#A47440', 'inkfine', 0); inkLine([[x + 30 + 20 * hash(x), 80 + 300 * hash(x + 1)], [x + 38 + 20 * hash(x), 160 + 300 * hash(x + 1)]], .5, '#B98650', 'inkfine', .5); }
    // the lamp: a warm caged bulb
    boilSeed('c3 sa lamp'); glow(640, 300, 380, '#FFC870', .55);
    paint(ellPts(640, 300, 34, 40, 14), { wash: '#FFE6A8', ink: PAL.ink, sw: .8 });
    for (let k = -1; k <= 1; k++) inkLine([[640 + k * 16, 262], [640 + k * 22, 300], [640 + k * 16, 338]], .7, '#6A4A2A', 'ink', .5);
    // the sand-glass timer on the wall: it runs out right at the cut
    const sk = seg(t, T_B1, T_G), hx = 1545, hy = 350;
    boilSeed('c3 sa glass');
    paint(rectPts(hx - 58, hy - 110, 116, 16), { wash: '#8A5A30', ink: PAL.ink, sw: .8 });
    paint(rectPts(hx - 58, hy + 94, 116, 16), { wash: '#8A5A30', ink: PAL.ink, sw: .8 });
    for (const s of [-1, 1]) paint(rectPts(hx + s * 46 - 5, hy - 96, 10, 192), { wash: '#9A6A3A', ink: PAL.ink, sw: .6 });
    paint([[hx - 36, hy - 94], [hx + 36, hy - 94], [hx + 6, hy], [hx + 36, hy + 94], [hx - 36, hy + 94], [hx - 6, hy]], { wash: '#E8F0EE', washOp: 200, ink: PAL.ink, sw: .7, curv: .3 });
    const top = 1 - sk, bot = sk;
    if (top > .02) paint([[hx - 30 * top, hy - 8 - 70 * top], [hx + 30 * top, hy - 8 - 70 * top], [hx, hy - 4]], { wash: '#E8B24A', ink: null });
    if (bot > .02) paint([[hx - 32, hy + 90], [hx + 32, hy + 90], [hx + 30 * (1 - bot * .6), hy + 90 - 60 * bot], [hx - 30 * (1 - bot * .6), hy + 90 - 60 * bot]], { wash: '#E8B24A', ink: null, curv: .3 });
    if (sk > 0 && sk < 1) inkLine([[hx, hy - 2], [hx, hy + 88 - 60 * bot]], 1.2, '#D89A34', 'inkfine', 0);
    // the stove with its stones
    boilSeed('c3 sa stove');
    paint(rectPts(130, 540, 250, SEAT + 100 - 540), { wash: '#4A4450', ink: PAL.ink, sw: 1 });
    for (let i = 0; i < 11; i++) paint(ellPts(152 + (i % 6) * 40 + (i > 5 ? 20 : 0), 525 - (i > 5 ? 34 : 0), 26, 20, 10), { wash: mixCol('#8A8690', '#B0AAB0', hash(i)), ink: PAL.ink, sw: .6 });
    glow(255, 660, 120, '#FF8A4A', .35 + .15 * Math.sin(t * 7));
    // the duckboard floor
    boilSeed('c3 sa floor');
    paint(rectPts(-300, SEAT + 90, 2520, 500), { wash: '#B8844C', fill: '#8A5A30', fillOp: 70, tex: .6, ink: null });
    for (let k = 0; k < 6; k++) inkLine([[-300, SEAT + 110 + k * 40 + k * k * 5], [2220, SEAT + 110 + k * 40 + k * k * 5]], .8, '#7A4E28', 'inkfine', 0);
  }
  // the bench, painted BEFORE the sitters, so they sit on it with their legs dangling in front of it
  function saunaBench() {
    boilSeed('c3 sa seat');
    paint(rectPts(280, SEAT + 18, 1460, 80), { wash: '#C48A50', fill: '#9A6A3A', fillOp: 60, tex: .6, ink: PAL.ink, sw: .8 });
    for (let x = 300; x < 1740; x += 64) inkLine([[x, SEAT + 20], [x, SEAT + 96]], .6, '#8A5A30', 'inkfine', 0);
    paint(rectPts(260, SEAT - 10, 1500, 30), { wash: '#E0AA6A', fill: '#C08A50', fillOp: 50, ink: PAL.ink, sw: .9 });
    boilSeed('c3 sa bucket');     // the bucket and ladle on the duckboards
    paint([[1560, SEAT + 112], [1670, SEAT + 112], [1655, SEAT + 200], [1575, SEAT + 200]], { wash: '#B07A48', ink: PAL.ink, sw: .8 });
    for (let k = 0; k < 3; k++) inkLine([[1562 + k * 4, SEAT + 130 + k * 28], [1667 - k * 4, SEAT + 130 + k * 28]], 1.2, '#6A4A2A', 'ink', 0);
    inkLine([[1620, SEAT + 120], [1700, SEAT - 30]], 3, '#8A5A30', 'ink', 0);
  }
  function steam(t, n, y0, key, op = 40) {
    for (let i = 0; i < n; i++) {
      const a = frac(t * .18 + H1(i, 301)), x = 100 + 1700 * H1(i, 302) + 60 * Math.sin(t * .7 + i), y = y0 - a * 520, r = 110 + 120 * H1(i, 303) + a * 140;
      boilSeed('c3 steam' + key + i);
      paint(ellPts(x, y, r, r * .55, 14), { fill: '#FFF4E4', fillOp: op * Math.sin(a * Math.PI), bleed: .3, tex: .2, ink: null });
    }
  }
  function drop(x, y, r, key) { boilSeed('c3 drop' + key); paint([[x, y - r * 2], [x + r * .9, y - r * .1], [x + r * .55, y + r * .75], [x, y + r], [x - r * .55, y + r * .75], [x - r * .9, y - r * .1]], { wash: '#A8D8F4', fill: '#FFFFFF', fillOp: 40, ink: PAL.ink, sw: .7, curv: .6 }); }
  function sweatDrops(t, x, y, u, key, t0, n = 3) {   // drops flicked off the head on every beat, in sync
    const b1 = Math.floor(bpOf(t));
    for (let b = b1 - 1; b <= b1; b++) {
      const tb = OFF + b * BEAT, a = t - tb; if (a < 0 || a > .55 || tb < t0) continue;
      for (let j = 0; j < n; j++) {
        const s = j % 2 ? 1 : -1, spread = .8 + .5 * j, p = arcPt([x + s * (2.5 + j) * u, y - 7.8 * u], [x + s * (6 + 2.5 * spread + hash(b + j)) * u, y - 3 * u], (2.4 + .6 * j) * u, a / .55);
        drop(p[0], p[1], .5 * u * (1 - .4 * a), key + j);
      }
    }
  }
  // the Horse's sweat drop, crawling down its jaw (horse-local space, sit view, head not lowered: head frame at nt,
  // turned .62; its eye is at (1.7, -.4), so the drop runs along the lower cheek, well clear of the eye)
  function horseDrop(t, s, sw) {
    const nt = [5.784, -15.843], a = seg(t, T_B1 + .45, T_B1 + 3.1), k = a < .4 ? a / .4 * .35 : .35 + ease((a - .4) / .6) * .65;
    const P = [[.2, .75], [1.8, 1.05], [3.4, 1.3], [5.1, 1.62]], seg_ = k * 3, i = Math.min(2, Math.floor(seg_)), f = seg_ - i;
    let lx = lerp(P[i][0], P[i + 1][0], f), ly = lerp(P[i][1], P[i + 1][1], f);
    const fall = t - (T_B1 + 3.1);
    push(); translate(nt[0] * s, nt[1] * s); rotate(.62);
    if (fall > 0) { ly += fall * fall * 70 + fall * 3; lx += fall * 1.5; }
    if (fall < .45) {
      if (fall < 0 && k > .02) { boilSeed('c3 hd trail'); inkLine([[.2 * s, .75 * s], [lx * s - .3 * s, ly * s - .1 * s]], sw * .6, '#C8E6F6', 'inkfine', .4); }
      push(); translate(lx * s, ly * s); rotate(-.62); drop(0, 0, .55 * s, 'horse'); pop();
    }
    pop();
  }
  function saunaCam(t) {
    const k = ease(seg(t, beatT(23, -.15), beatT(23, .75))), d = seg(t, T_B1, T_G);
    return [lerp(lerp(955, 985, d), 1150, k), lerp(610, 590, k), lerp(lerp(1.45, 1.52, d), 1.84, k)];
  }
  function sauna(t, lt, dur) {
    const [cx, cy, z] = saunaCam(t);
    camBegin(cx, cy, z);
    saunaSet(t);
    steam(t, 5, 900, 'b', 34);
    saunaBench();
    const u = 21, t0 = T_B1 + .25;
    const bob = b => { const f = frac(bpOf(t) + b); return { dy: -.32 * Math.sin(Math.PI * clamp(f * 1.4)), sq: .08 * Math.exp(-f * 9) }; };
    const bB = bob(.04), bO = bob(0);
    // the Boss, arms folded (the reins pose, held still), eyes shut in bliss, bobbing on the beat
    const fB = mfeel('boss', 'relieved', t), yB = SEAT + 2 * u * .98;
    member('boss', 560, yB, u, { eyes: fB.eyes, mouth: 'smile', frontArm: 'LR', armLen: 2.3, aL: Math.PI + .36, aR: Math.PI + .36, armL: fistHook(CAST.boss.hand, .78), armR: fistHook(CAST.boss.hand, .78), legSplay: .3, dy: bB.dy, sq: bB.sq, boilKey: 'boss' });
    // Oppa: bobbing with the Boss... then the sneaky look over his shades... busted
    const dip = ease(seg(t, beatT(23, .15), beatT(23, .6))) * (1 - ease(seg(t, beatT(23, 1.95), beatT(23, 2.15))));
    const gulp = t > beatT(23, 1.95) ? take(t, beatT(23, 2.0), .5) : { sq: 0, dy: 0 }, yO = SEAT + 2 * u * .94;
    const oq = { look: 'sauna', eyes: dip > .05 ? 'look' : 'closed', lookX: .95 * dip, lookY: -.1 * dip, mouth: dip > .5 ? 'flat' : 'smile',
      aL: -.75 + .1 * bO.sq, aR: -.75 + .1 * bO.sq, legSplay: .25, dy: bO.dy * (1 - dip) + gulp.dy, sq: bO.sq * (1 - dip) + gulp.sq, rot: .05 * dip, boilKey: 'oppa',
      emote: t > beatT(23, 2.05) ? 'sweat' : null, emoteK: seg(t, beatT(23, 2.05), beatT(23, 2.3)), emoteAge: t - beatT(23, 2.05) };
    if (dip > .02) { oq.bareEyes = true; oq.face = (uu, sw, F) => { push(); translate(0, dip * 1.3 * uu); roundShades(uu, sw, F, 'tort'); pop(); }; }
    member('oppa', 950, yO, u, oq);
    // THE Horse, sitting in its towel, staring at us; its eye slides to Oppa when he looks
    const busted = t > beatT(23, 1.75);
    horse(1345, SEAT + 6, 14.5, t, { view: 'sit', flip: true, towel: true, mood: 'deadpan', look: busted ? null : 'camera', blink: 3, boilKey: 'saunahorse', draw: (s, sw) => horseDrop(t, s, sw) });
    sweatDrops(t, 560, yB + bB.dy * u, u * 1.1, 'B', t0);
    if (dip < .05) sweatDrops(t, 950, yO + bO.dy * u, u, 'O', t0);
    steam(t, 4, 1150, 'f', 24);
    camEnd();
    counterHUD(t);
    // in: the lens sheet, soggy in the steam, slides down and away
    if (t < T_B1 + .32) lensSheet(T_COVER + .01, 1300 * easeIn(seg(t, T_B1 + .02, T_B1 + .32)));
  }

  // =========================================== C: THE BOARD-GAME BENCH ===========================================
  const BSEAT = 800;
  function riverBack(t) {
    boilSeed('c3 rv sky');
    paint(rectPts(-300, -300, 2520, 850), { wash: '#BFDDEB', ink: null });
    paint(ellPts(960, 470, 1400, 150, 24), { fill: '#EEF6F4', fillOp: 110, bleed: .3, tex: .3, ink: null });
    cityline(500, { col: '#C6D8DE' });
    // the river
    boilSeed('c3 rv water');
    paint(rectPts(-300, 490, 2520, 170), { wash: '#86B4CA', fill: '#6494AE', fillOp: 50, tex: .5, bleed: .02, ink: null });
    for (let i = 0; i < 14; i++) { const x = ((i * 173 + t * 40) % 2300) - 200, y = 540 + 100 * hash(i * 3.1); boilSeed('c3 rip' + i); inkLine([[x, y], [x + 60, y - 2], [x + 110, y]], .8, '#D8EEF4', 'inkfine', .5); }
    // the big bridge across the river (the next chapter's)
    boilSeed('c3 rv bridge');
    for (let x = -120; x < 2200; x += 360) { boilSeed('c3 pier' + x); paint(rectPts(x, 540, 40, 90), { wash: '#8C98A0', ink: PAL.ink, sw: .7 }); const A = []; for (let k = 0; k <= 10; k++) A.push([x + 40 + k * 32, 540 + 34 * Math.sin(k / 10 * Math.PI)]); inkLine(A, 1, '#6A7680', 'ink', .5); }
    paint(rectPts(-300, 510, 2520, 32), { wash: '#9AA6AE', ink: PAL.ink, sw: .8 });
    for (let x = -300; x < 2220; x += 60) inkLine([[x, 510], [x + 30, 490], [x + 60, 510]], .6, '#6A7680', 'inkfine', 0);
    inkLine([[-300, 490], [2220, 490]], .8, '#6A7680', 'inkfine', 0);
    // the promenade railing, the pavement
    boilSeed('c3 rv rail');
    paint(rectPts(-300, 660, 2520, 520), { wash: '#DCD4C4', fill: '#BDB2A0', fillOp: 60, tex: .7, ink: null });
    inkLine([[-300, 666], [2220, 666]], 1, '#9A9080', 'inkfine', 0);
    for (let x = -280; x < 2220; x += 110) paint(rectPts(x, 600, 10, 62), { wash: '#6A7680', ink: PAL.ink, sw: .5 });
    paint(rectPts(-300, 594, 2520, 12), { wash: '#7A8690', ink: PAL.ink, sw: .6 });
    tree(360, 700, 1.2, t);
  }
  function benchBack() {   // the backrest, in front of anyone standing behind the bench
    boilSeed('c3 rv bench');
    for (const y of [650, 694]) paint(rectPts(420, y, 1100, 28), { wash: '#B8804C', fill: '#94602E', fillOp: 50, ink: PAL.ink, sw: .8 });
    for (const x of [440, 1480]) paint(rectPts(x, 640, 20, BSEAT + 150 - 640), { wash: '#3E3A44', ink: PAL.ink, sw: .7 });
  }
  function benchSeat() {   // the seat, painted before the sitters (their legs dangle in front of it)
    boilSeed('c3 rv seat');
    paint(rectPts(430, BSEAT + 14, 1080, 16), { wash: '#A06A36', ink: PAL.ink, sw: .6 });
    for (const x of [450, 1470]) paint(rectPts(x, BSEAT + 14, 18, 150), { wash: '#3E3A44', ink: PAL.ink, sw: .7 });
    paint(rectPts(410, BSEAT - 12, 1120, 26), { wash: '#C88C54', fill: '#A06A36', fillOp: 50, ink: PAL.ink, sw: .9 });
  }
  // the stone game table in front of the bench, its board a painted trapezoid (seen from a little above), a grid,
  // round black and white stones
  const TBX = 1115, TBY = 845, BOARD_N = 7;
  const STONES = [[1, 1, 0], [2, 3, 1], [3, 2, 0], [4, 4, 1], [2, 5, 0], [5, 4, 1], [4, 1, 0], [1, 4, 1], [5, 5, 0], [3, 4, 1], [6, 3, 0], [3, 5, 1]];
  const SLAM_AT = [5, 2];
  function boardPt(i, j) {   // grid intersection (i across, j from the back row) -> world
    const kj = j / (BOARD_N - 1), y = lerp(TBY - 25, TBY + 25, kj), hw = lerp(106, 128, kj);
    return [TBX + lerp(-hw, hw, i / (BOARD_N - 1)), y];
  }
  function gameTable(t, slamT) {
    const a = t - slamT, jolt = a > 0 ? 5 * Math.exp(-a * 14) * Math.cos(a * 50) : 0;
    push(); translate(0, jolt);
    boilSeed('c3 tb');
    paint([[TBX - 192, TBY + 40], [TBX + 192, TBY + 40], [TBX + 178, 1012], [TBX - 178, 1012]], { wash: '#A8A092', fill: '#8A8274', fillOp: 50, tex: .5, ink: PAL.ink, sw: .9 });   // the solid stone base
    paint([[TBX - 164, TBY - 40], [TBX + 164, TBY - 40], [TBX + 196, TBY + 40], [TBX - 196, TBY + 40]], { wash: '#C4BCAE', ink: PAL.ink, sw: .9 });   // the top
    paint(rectPts(TBX - 196, TBY + 40, 392, 20), { wash: '#9A9282', ink: PAL.ink, sw: .8 });
    paint([[TBX - 122, TBY - 32], [TBX + 122, TBY - 32], [TBX + 146, TBY + 32], [TBX - 146, TBY + 32]], { wash: '#E4BC74', fill: '#C89A50', fillOp: 50, tex: .5, ink: PAL.ink, sw: .8 });   // the board
    for (let k = 0; k < BOARD_N; k++) { inkLine([boardPt(0, k), boardPt(BOARD_N - 1, k)], .6, '#6A4A2A', 'inkfine', 0); inkLine([boardPt(k, 0), boardPt(k, BOARD_N - 1)], .6, '#6A4A2A', 'inkfine', 0); }
    // the stones (they all jump when the Horse slams its move down)
    STONES.forEach(([i, j, c], n) => {
      const [x, y] = boardPt(i, j), h = a > 0 && a < .5 ? (16 + 24 * hash(n)) * Math.sin(Math.PI * clamp(a / (.26 + .12 * hash(n + 3)))) : 0;
      boilSeed('c3 st' + n);
      paint(ellPts(x, y - h, 12, 7, 10), { wash: c ? '#F4EEE2' : '#2E2836', ink: PAL.ink, sw: .5 });
    });
    if (a >= 0) { const [x, y] = boardPt(...SLAM_AT); boilSeed('c3 st slam'); paint(ellPts(x, y, 13, 7.5, 10), { wash: '#F4EEE2', ink: PAL.ink, sw: .6 }); }
    pop();
  }
  // THE Horse, standing upright at the table's corner. Its left foreleg pivots at the shoulder (-3.6s, -12.4s) inside
  // the body's lean (rot) and squash; hoofTip() mirrors horseUp's transform so the slam lands on the board.
  const HB_X = 1322, HB_Y = 1012, HB_S = 15.5;
  function horseShoulder(o) { const sq = o.sq || 0, r = o.rot || 0, X = -3.6 * HB_S * (1 + sq * .5), Y = -12.4 * HB_S * (1 - sq); return [HB_X + (o.dx || 0) * HB_S + X * Math.cos(r) - Y * Math.sin(r), HB_Y + (o.dy || 0) * HB_S + X * Math.sin(r) + Y * Math.cos(r)]; }
  const SLAM_POSE = { rot: -.09, sq: .06 };
  function slamAim() {   // the arm angle and length that put the hoof (and the stone) on the slam point
    const [px, py] = boardPt(...SLAM_AT), [sx, sy] = horseShoulder(SLAM_POSE), r = SLAM_POSE.rot, dx = px - sx, dy = (py - .5 * HB_S) - sy;
    const lx = (dx * Math.cos(r) + dy * Math.sin(r)) / (1 + SLAM_POSE.sq * .5), ly = (-dx * Math.sin(r) + dy * Math.cos(r)) / (1 - SLAM_POSE.sq);
    return { a: Math.atan2(-ly, -lx), armLen: Math.hypot(lx, ly) / (3.6 * .72 * HB_S) };
  }
  function bench(t, lt, dur) {
    const slamT = barT(25), sa = t - slamT;
    const z = lerp(1.5, 1.6, ease(seg(t, T_G + .2, T_T))) * (sa > 0 ? 1 + .03 * Math.exp(-sa * 6) : 1), [shx, shy] = sa > 0 && sa < .25 ? shakeXY(t, 8 * (1 - sa / .25)) : [0, 0];
    camBegin(lerp(890, 1010, ease(seg(t, T_G + .25, T_G + 1.5))) + shx, 835 + shy, z);
    riverBack(t);
    const u = 20;
    // Grandpa v1 stands behind the bench, leaning over to watch; gapes a beat after the slam
    const m1 = mood('grandpa', t, [[T_G - 2, 'thinking', { lookX: .9, lookY: .6 }], [slamT + .16, 'surprised', { lookX: .6 }]], { v: 1 });
    member('grandpa', 870, 770, u * .94, { v: 1, ...faceOf(m1), aL: -.3, aR: -.2, rot: .13 - .1 * seg(sa, .16, .4), boilKey: 'gp1' });
    benchBack();
    benchSeat();
    // Grandpa v0 plays (hunched, sweating), gapes at the slam and rears back
    const m0 = mood('grandpa', t, [[T_G - 2, 'nervous', { lookX: .6, lookY: .7 }], [slamT + .04, 'surprised', { lookX: .35, lookY: .2 }]], { v: 0 });
    const f0 = faceOf(m0);
    member('grandpa', 965, BSEAT + 2 * u * .98, u, { v: 0, ...f0, aL: -.45, aR: .15 + .1 * Math.sin(t * 3), rot: lerp(.07, -.1, ease(seg(sa, 0, .12))), boilKey: 'gp0' });
    // Oppa struts in and hops up onto the bench: cool, arms spread along the backrest; turns to the board at the slam
    const inK = seg(t, T_G, beatT(24, .75)), hop = jump(t, beatT(24, .75), beatT(24, 1.2), 1.6), sitK = seg(t, beatT(24, .75), beatT(24, 1.2));
    const ox = lerp(430, 660, easeOut(inK)) + lerp(0, 20, sitK), oy = lerp(1010, BSEAT + 2 * u * .94, ease(sitK));
    const sat = t >= beatT(24, 1.2), ob = frac(bpOf(t)), look = sa > .3 ? turn(t, slamT + .3, slamT + .45, 0, .125) : {};
    const oq = sat ? { aL: .22, aR: .22, armLen: 1.6, rot: -.04, dy: -.15 * Math.sin(Math.PI * ob) + hop.dy, sq: hop.sq, mouth: sa > .3 ? 'o' : 'smirk', eyes: 'normal', ...look }
      : { ...dance('strut', t, { side: 1, hand: CAST.oppa.hand, sleeve: GP.tux }), dy: hop.dy, sq: hop.sq, mouth: 'smirk' };
    member('oppa', ox, oy, u, { look: 'tux', ...oq, boilKey: 'oppa' });
    gameTable(t, slamT);
    // the Horse: a stone held up on its hoof by its chin... pondering... it rears back... SLAM on the downbeat
    const aim = slamAim(), wind = ease(seg(t, beatT(24, 3.0), slamT - .09)), down = easeIn(seg(t, slamT - .09, slamT));
    const aHold = 1.05 + .05 * Math.sin(seg(t, T_G, slamT) * 9);
    const aL = sa >= 0 ? aim.a + .16 * Math.exp(-sa * 9) * Math.max(0, Math.cos(sa * 22)) : lerp(lerp(aHold, 1.6, wind), aim.a, down);
    const lean = sa >= 0 ? { rot: SLAM_POSE.rot * (1 - .5 * seg(sa, .2, .8)), sq: SLAM_POSE.sq * Math.exp(-sa * 7) } : { rot: lerp(lerp(0, .08, wind), SLAM_POSE.rot, down), sq: lerp(0, SLAM_POSE.sq, down) };
    const held = sa < 0 ? (s_, sw) => { boilSeed('c3 held stone'); paint(ellPts(.9 * s_, 0, 1.0 * s_, .58 * s_, 10), { wash: '#F4EEE2', ink: PAL.ink, sw: sw * .6 }); } : null;
    horse(HB_X, HB_Y, HB_S, t, { view: 'up', mood: 'deadpan', look: sa > 1.05 ? 'camera' : null, aL, armLen: { L: aim.armLen, R: 1 }, aR: -1.2, frontArm: 'L', ...lean, blink: 7, boilKey: 'benchhorse', armL: held });
    // the slam's impact marks
    const [px, py] = boardPt(...SLAM_AT);
    if (sa > 0 && sa < .35) { boilSeed('c3 slam fx'); for (let k = 0; k < 9; k++) { const an = -Math.PI * (k + .5) / 9, r0 = 34 + 90 * easeOut(sa / .35), r1 = r0 + 40 * (1 - sa / .35); inkLine([[px + Math.cos(an) * r0, py + Math.sin(an) * r0 * .6], [px + Math.cos(an) * r1, py + Math.sin(an) * r1 * .6]], 2.4 * (1 - sa / .35) + .4, PAL.ink, 'ink', 0); } }
    camEnd();
    counterHUD(t);
  }

  // =============================================== D: THE TENNIS COURT ===============================================
  function courtSet(t) {
    boilSeed('c3 tn sky');
    paint(rectPts(-300, -300, 2520, 700), { wash: '#A8D4F0', ink: null });
    // the fence: a green windscreen, chain-link above it, posts
    boilSeed('c3 tn fence');
    paint(rectPts(-300, 170, 2520, 420), { wash: '#3E7A5A', fill: '#2E6048', fillOp: 60, tex: .5, ink: null });
    for (let x = -300; x < 2220; x += 34) { inkLine([[x, 60], [x + 110, 170]], .4, '#7A8A84', 'inkfine', 0); inkLine([[x + 110, 60], [x, 170]], .4, '#7A8A84', 'inkfine', 0); }
    for (let x = -260; x < 2220; x += 380) paint(rectPts(x, 40, 16, 560), { wash: '#5A6A64', ink: PAL.ink, sw: .6 });
    inkLine([[-300, 170], [2220, 170]], 1.2, '#4A5A54', 'ink', 0);
    // the court: the run-off, the playing surface, the lines
    boilSeed('c3 tn court');
    paint(rectPts(-300, 590, 2520, 700), { wash: '#6FA07A', fill: '#5A8A66', fillOp: 50, tex: .5, ink: null });
    paint([[-100, 640], [2020, 640], [2400, 1300], [-480, 1300]], { wash: '#4E86C0', fill: '#3E70A8', fillOp: 50, tex: .5, ink: null });
    inkLine([[-100, 640], [2020, 640]], 4, '#F4F2EA', 'ink', 0);
    inkLine([[-230, 880], [2150, 880]], 4, '#F4F2EA', 'ink', 0);
    inkLine([[960, 640], [960, 880]], 4, '#F4F2EA', 'ink', 0);
    // the net across the court behind him
    boilSeed('c3 tn net');
    paint(rectPts(-300, 620, 2520, 110), { wash: '#2A2A34', washOp: 90, ink: null });
    for (let x = -300; x < 2220; x += 22) inkLine([[x, 624], [x, 728]], .4, '#1E1E26', 'inkfine', 0);
    for (let y = 640; y < 728; y += 20) inkLine([[-300, y], [2220, y]], .4, '#1E1E26', 'inkfine', 0);
    paint(rectPts(-300, 612, 2520, 14), { wash: '#F4F2EA', ink: PAL.ink, sw: .5 });
    for (const x of [-60, 1980]) paint(rectPts(x - 9, 600, 18, 150), { wash: '#3A3A44', ink: PAL.ink, sw: .6 });
  }
  const TN_X = 840, TN_Y = 1000, TN_U = 28, MOUTH = [1395, 802];
  const TN_FIRE = [beatT(26, .3), beatT(26, 1.3), beatT(26, 2.2)], T_CATCH = beatT(26, 2.45);
  // the ball machine: a boxy orange thing on wheels with a hopper of balls and a tube aimed at him; it kicks on each shot
  function ballMachine(t) {
    let kick = 0; for (const tf of TN_FIRE) { const a = t - tf; if (a > 0 && a < .3) kick = Math.max(kick, Math.exp(-a * 14)); }
    push(); translate(10 * kick, 0);
    boilSeed('c3 tn machine');
    paint(rrPts(1450, 770, 190, 150, 22), { wash: '#E8583A', fill: '#C8402A', fillOp: 50, ink: PAL.ink, sw: 1 });
    paint(rectPts(MOUTH[0], MOUTH[1] - 22, 70, 44), { wash: '#3A3440', ink: PAL.ink, sw: .8 });
    paint(ellPts(MOUTH[0], MOUTH[1], 14, 22, 10), { wash: '#1E1826', ink: PAL.ink, sw: .6 });
    paint([[1470, 772], [1620, 772], [1650, 700], [1440, 700]], { wash: '#4A4452', ink: PAL.ink, sw: .8 });
    for (let i = 0; i < 5; i++) ball(1480 + i * 34, 694 - (i % 2) * 10, 16, 'hop' + i);
    for (const x of [1480, 1610]) paint(ellPts(x, 935, 22, 22, 12), { wash: '#2A2230', ink: PAL.ink, sw: .7 });
    pop();
    for (const tf of TN_FIRE) { const a = t - tf; if (a > 0 && a < .35) { boilSeed('c3 puff' + tf); for (let k = 0; k < 5; k++) { const an = Math.PI + (k - 2) * .45, r = 20 + 70 * easeOut(a / .35); paint(ellPts(MOUTH[0] + Math.cos(an) * r, MOUTH[1] + Math.sin(an) * r, 14 * (1 - a / .35) + 3, 11 * (1 - a / .35) + 3, 8), { wash: '#F4F0E4', washOp: 200, ink: null }); } } }
  }
  function ball(x, y, r, key) {
    boilSeed('c3 ball' + key);
    paint(ellPts(x, y, r, r, 12), { wash: '#DDEA4E', fill: '#C0D030', fillOp: 60, ink: PAL.ink, sw: .7 });
    inkLine([[x - r * .7, y - r * .5], [x, y - r * .1], [x + r * .6, y - r * .6]], .6, '#F8F8EC', 'inkfine', .5);
  }
  function flyingBall(p, key) {   // a ball whizzing left, with a long speed trail
    boilSeed('c3 streak' + key);
    for (let j = 0; j < 3; j++) paint(ribbon([[p[0] + 14, p[1] - 11 + j * 11], [p[0] + 150 + j * 50, p[1] - 11 + j * 11]], 7 - j * 1.5, .5), { wash: '#F6F2E2', washOp: 220, ink: null });
    ball(p[0], p[1], 18, key);
  }
  function tennis(t, lt, dur) {
    const ca = t - T_CATCH;
    const z = lerp(1.42, 1.5, ease(seg(t, T_T, T_END))) * (ca > 0 ? 1 + .03 * Math.exp(-ca * 7) : 1);
    camBegin(1030, 790, z);
    courtSet(t);
    ballMachine(t);
    const pose = dance('disco', t, { side: 1, hand: CAST.oppa.hand, sleeve: GP.tux });
    const kickA = ca > 0 ? .14 * Math.exp(-ca * 10) * Math.cos(ca * 25) : 0;
    const q = { look: 'tux', ...pose, aR: pose.aR + kickA, mouth: ca > 0 ? 'smirk' : 'grin', eyes: 'normal', boilKey: 'oppa' };
    // the fist at the tip of his pointing arm (the catch): the same geometry as clawd()'s right arm + fistHook
    const fist = tt => { const pp = dance('disco', tt, { side: 1 }), a = pp.aR, AL = 2.2 * pp.armLen.R, rx = 4.9 + .55 * clamp((Math.abs(a) - .7) / .9);
      return bodyPt(TN_X, TN_Y, TN_U, { ...pp, sx: CAST.oppa.sx, sy: CAST.oppa.sy }, rx + (AL + .1) * Math.cos(a), -4.5 - (AL + .1) * Math.sin(a)); };
    const hR = q.armR;
    if (ca >= 0) q.armR = (uu, sw) => { hR(uu, sw); ball(.15 * uu, -.35 * uu, .62 * uu, 'held'); };
    member('oppa', TN_X, TN_Y, TN_U, q);
    // one over his quiff, one right across his face (he doesn't blink), and the one he plucks out of the air
    const paths = [[TN_FIRE[0], MOUTH, [-200, 640]], [TN_FIRE[1], MOUTH, [-200, 900]]];
    paths.forEach(([tf, p0, p1], k) => { const a = (t - tf) / .55; if (a >= 0 && a <= 1) flyingBall([lerp(p0[0], p1[0], a), lerp(p0[1], p1[1], a)], k); });
    if (ca < 0 && t >= TN_FIRE[2]) { const f = fist(T_CATCH), a = seg(t, TN_FIRE[2], T_CATCH); flyingBall([lerp(MOUTH[0], f[0], a), lerp(MOUTH[1], f[1] - .35 * TN_U, a)], 2); }
    if (ca > 0 && ca < .3) { const f = fist(t); boilSeed('c3 catch fx'); for (let k = 0; k < 7; k++) { const an = k / 7 * TAU, r0 = 30 + 60 * ca, r1 = r0 + 30 * (1 - ca / .3); inkLine([[f[0] + Math.cos(an) * r0, f[1] + Math.sin(an) * r0], [f[0] + Math.cos(an) * r1, f[1] + Math.sin(an) * r1]], 2.2, '#F8F4E4', 'ink', 0); } }
    camEnd();
    counterHUD(t);
  }
  shots([[T0, blizzard], [T_B1, sauna], [T_G, bench], [T_T, tennis]]);
})();
