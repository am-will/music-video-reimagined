// c5_chorus2.js: Chorus 2 (barT(27) = 88.325 to barT(35) = 113.903).
//
// ============================================ SHOT PLAN ============================================
// Four shots of exactly two bars (8 beats, 6.394 s) each. B(k) = beat k of the chapter (B(0) = 88.325, B(8) = 94.720,
// B(16) = 101.114, B(24) = 107.509, B(32) = 113.903). Every cut, slash and big move lands on a beat.
//
// SHOT 1 · 88.325–94.720 · THE GREAT SLASH (split: warm parlor upper-left / Ink Side lower-right)
//   [in: seam from c4] the frame is black with the Face's jagged grin of light in the middle.
//   B0 +0.00–0.10  the grin stretches out along the diagonal into a razor line of light, screen (-100,1000) -> (2020,80)
//      +0.10–0.20  the slash flares (glow along it, the frame kicks)
//      +0.16–0.70  the blackout is cut in two along it: its halves slide apart (torn cream lips on both) and reveal the
//                  split world underneath, already torn along the same line
//   reads  88.33–88.95  the frame splits
//          88.95–90.2   upper left: Chester belting in the lamplit parlor; lower right: Ink Chester (mohawk silhouette,
//                       glasses, glowing eyes) doing the same, mirrored. The eye finds warm Chester first, then the glow.
//          90.2–91.5    B2.3: Chester SEES his double: a big take. The Ink doesn't take: it grins (mirror, but wrong)
//          91.5–93.9    bar 28: Chester gets determined, leans in and belts at it; the Ink belts back (lid, red mouth).
//                       On every beat the tear trembles and its lips flutter; the edge breathes with the bar.
//          93.9–94.7    the tear strains (a small counter-swing = anticipation) ...
//   [out] ... and swings round (next shot)
//
// SHOT 2 · 94.720–101.114 · TWO BANDS (vertical split, the Ink Side mirrored)
//   B8   the tear swings from the diagonal to a vertical line down the middle (overshoot + settle) while both cameras
//        pull back from the frontmen to the wide: the real band on the left, the six Inks on the right, mirrored
//        (mirrored cameras: the Ink camera centre = 2*LAY.mirror - the parlor camera centre).
//   reads  94.9–96.3   two bands, mirror images (symmetry reads at a glance; the frontmen sit either side of the tear)
//          96.3–97.9   in perfect sync: everyone nods on the beat, a synchronised hop on B10
//          97.9–101.1  the Ink leads: on B12 the Inks JUMP, arms up, and the real band doesn't (a frozen beat, eyes
//                      wide); on B13 the real band jumps, jerked up like puppets, while the Inks already lean into
//                      the next move; B14 lean, B15 spin... the real band always a beat late, scared, sweating.
//                      Both cameras push in on the frontmen as it happens.
//   [out] snap-zoom on the B16 downbeat into Chester
//
// SHOT 3 · 101.114–107.509 · SCREAM AGAINST SCREAM (cuts every half bar, all on the beat)
//   A  B16  Chester close-up, front view, lid wide, screams right at the tear; through the tear (right third) the
//           Ink recoils from the blast (cream scream rings pass through).
//   B  B18  reverse: the Ink close-up screams back, lid wide, red glow inside, red eyes; Chester recoils through the
//           tear (left third). Red rings.
//   C  B20  tight split, the tear in the middle: both scream at once, the rings collide at the tear, it shakes.
//           B21.5 Chester launches himself at the tear...
//   D  B22  ...cut on action: he's slammed back-first against it, both nubs pinning the torn lips shut; ink fingers
//           squeeze out round his nubs and over his head, the slit bulging on every beat. He strains.
//
// SHOT 4 · 107.509–113.903 · SHATTER
//   B24..B31  a papercut slashes across the whole frame on every beat (8 slashes): a blade of light, then the pieces
//           kick apart. Through every crack: ink-black and glowing eyes. Inside the shards the band keeps playing;
//           the camera behind the glass pulls out to the wide, then eases in on the room. In bar 34 Mike steps to
//           centre stage.
//   B31 (113.104) the last slash shatters everything: the shards fall away (closed-form arcs, tumbling) and reveal
//           the parlor CHANGED: darker and colder, walls peeled (.7), ink pooled across the rug (.5), the Ink sitting
//           in the portrait ('ink'), Inks standing in the dark corners (their eyes close as the shot ends).
//   [out, seam to c6 at 113.903] the darkened parlor, Mike front and centre facing camera, camBegin(1720, 640, 1.1).
// ====================================================================================================
(() => {
  const T0 = barT(27), B = k => T0 + k * BEAT, MIR = LAY.mirror;
  const SP = 'c5';   // layer name prefix

  // ---------- small geometry ----------
  const add = (p, v, k = 1) => [p[0] + v[0] * k, p[1] + v[1] * k];
  const lerpPt = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
  const unit = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };

  // A torn line from p0 to p1 (screen space), deterministic jag from seed. o.amp scales the roughness (trembles),
  // o.bulge bows the middle along the normal (breathes). Returns { pts, d (unit dir), n (unit normal, "left" of d) }.
  // The jag is multi-scale (long waves, medium bumps, a fine zigzag every ~18 px) and is keyed to arc length, so the
  // same tear keeps the same shape while it trembles.
  function tornLine(p0, p1, o = {}) {
    const seed = o.seed ?? 1, amp = o.amp ?? 1, rough = o.rough ?? 16, d = unit(p0, p1), nl = [d[1], -d[0]];
    const L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), n = o.n ?? Math.max(24, Math.round(L / (o.step ?? 18))), P = [];
    for (let i = 0; i <= n; i++) {
      const k = i / n, s = k * L, env = Math.min(1, Math.min(k, 1 - k) * (o.env ?? 8));
      const big = Math.sin(s / 190 + seed) * .6 + Math.sin(s / 83 + seed * 2.3) * .35;
      const mid = Math.sin(s / 31 + seed * 5.1) * .22 + (hash(Math.floor(s / 47) + seed * 13) - .5) * .5;
      const fine = (hash(i * 13.7 + seed * 91) - .5) * .9 + (i % 2 ? .22 : -.22);
      const off = rough * (big + mid + fine * .45) * amp * env + (o.bulge || 0) * Math.sin(k * Math.PI) + (o.wave ? o.wave(k, s) : 0);
      P.push([p0[0] + (p1[0] - p0[0]) * k + nl[0] * off, p0[1] + (p1[1] - p0[1]) * k + nl[1] * off]);
    }
    return { pts: P, d, n: nl };
  }
  // the polygon on one side of a line (side = unit vector pointing to that side), closed far away
  const sidePolyOf = (P, side, far = 2600) => P.concat([add(P[P.length - 1], side, far), add(P[0], side, far)]);

  // ---------- the torn paper edge ----------
  // P: the tear (screen space), hole = unit normal pointing INTO the hole (toward the world behind the paper).
  // Paints: the paper's shadow on the world behind, the torn white core of the paper (a feathered cream band of varying
  // width), fibres sticking out into the hole, and the stained pigment edge. o.s scales everything, o.t animates the
  // fibres (they flutter on the beat), o.core colours the core, o.key seeds it.
  function rip(P, hole, o = {}) {
    const s = o.s ?? 1, key = o.key ?? 'rip', t = o.t ?? T, fl = o.flutter ?? pulse(t, 5), cw = o.coreW ?? 1;
    const nP = P.length, perp = [-hole[1], hole[0]];
    // 1. the lifted paper throws a soft shadow onto the world behind it
    if (o.shadow !== false) {
      const sh = P.map((p, i) => add(p, hole, (16 + 14 * hash(i * 2.1 + 3)) * s));
      castShadow([P.concat(sh.slice().reverse())], { alpha: o.shAlpha ?? .7, blur: 10 * s, col: '#06040A' });
    }
    // 2. the torn core: the white inside of the paper where it split. Its outer edge is a fringe of little spikes.
    const wAt = i => Math.max(2.5, (4 + 11 * hash(Math.floor(i / 2) * 7.3 + 11) + 5 * Math.sin(i * .45 + 2))) * s * cw;
    const fringe = [];
    for (let i = 0; i < nP - 1; i++) for (let j = 0; j < 3; j++) {   // irregular spikes: some long, most short, many none
      const k = clamp((j + .7 * (hash(i * 6.3 + j * 2.9) - .5)) / 3, 0, .99), a = lerpPt(P[i], P[i + 1], k), w = lerp(wAt(i), wAt(i + 1), k);
      const hs = hash(i * 4.1 + j * 1.7 + 7), spike = hs < .55 ? (1 + 9 * Math.pow(hash(i * 2.7 + j * 5.3 + 9), 2)) * s : 0;
      fringe.push(add(add(a, hole, w + spike), perp, (hash(i * 9.1 + j) - .5) * 4 * s));
    }
    fringe.push(add(P[nP - 1], hole, wAt(nP - 1)));
    boilSeed(key + ' core');
    paint(P.concat(fringe.slice().reverse()), { wash: o.core || '#F6EBD3', ink: null });
    boilSeed(key + ' core2');   // the whitest fibres, right at the break
    paint(P.concat(P.map((p, i) => add(p, hole, (2 + 5 * hash(i * 3.3 + 5)) * s * cw)).reverse()), { wash: o.core2 || '#FFFCF2', ink: null });
    // 3. hairs: fibres pulled out of the fringe into the hole, fluttering on the beat
    boilSeed(key + ' fibres');
    const nf = Math.round((nP - 1) * (o.fibres ?? 1.3));
    for (let f = 0; f < nf; f++) {
      const h1 = hash(f * 3.1 + 1), h2 = hash(f * 5.7 + 2), h3 = hash(f * 1.9 + 3), i = Math.min(fringe.length - 1, Math.floor(h1 * fringe.length));
      const a = fringe[i], len = (5 + 20 * h2 * h2) * s, sway = (h3 - .5) * 1.6 + .45 * fl * Math.sin(t * 29 + f);
      const dir = [hole[0] * Math.cos(sway) + perp[0] * Math.sin(sway), hole[1] * Math.cos(sway) + perp[1] * Math.sin(sway)];
      inkLine([add(a, hole, -3 * s), add(a, dir, len * .5), add(add(a, dir, len), perp, (h1 - .5) * 5 * s)], (.3 + .4 * h3) * s, h2 > .75 ? '#E6D7B8' : '#FFF8EA', 'inkfine', .5);
    }
    // 4. the stained pigment edge where the painted layer broke
    boilSeed(key + ' lip');
    for (let a = 0; a < nP - 1; a += 24) inkLine(P.slice(a, Math.min(nP, a + 25)), .8 * s, o.stain || '#7A5A46', 'inkfine', .2);
  }
  // light spilling out of a line: additive glows at an even spacing along it (spacing ~ r/2 so they merge smoothly)
  function glowAlong(P, r, col, a, gap = .45) {
    const sp = r * gap; let acc = sp;
    for (let i = 1; i < P.length; i++) {
      const L = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
      while (acc <= L) { const q = lerpPt(P[i - 1], P[i], acc / L); if (q[0] > -r && q[0] < W + r && q[1] > -r && q[1] < H + r) glow(q[0], q[1], r, col, a); acc += sp; }
      acc -= L;
    }
  }

  // ---------- culling for split screens ----------
  // After camBegin(): make the sets' culling think only world x0..x1 is visible (the half of the frame this world
  // actually shows), without moving the camera. Anything that projects with CAM must be given the real camera.
  function cullTo(x0, x1) { if (CAM) CAM = { ...CAM, cx: (x0 + x1) / 2, zoom: W / Math.max(50, x1 - x0) }; }

  // ---------- poses shared between a member and their Ink ----------
  const POSE = ['dy', 'sq', 'rot', 'dx', 'aL', 'aR', 'squint', 'view', 'smear', 'smearDir', 'walk'];
  const poseOf = o => { const q = {}; for (const k of POSE) if (o[k] !== undefined) q[k] = o[k]; return q; };
  // the mirror image of a pose: flipped, lean and sideways offsets negated (clawd rotates before it flips)
  const mirrorPose = o => { const q = poseOf(o); q.flip = !o.flip; q.rot = -(o.rot || 0); q.dx = -(o.dx || 0); return q; };
  // an Ink holding a mic to its mouth (the member()'s micAt 'mouth' pose, for an inkling)
  const inkMic = (bp, who = 'chester') => ({ aR: Math.PI - .14 + .1 * Math.sin(bp * Math.PI), frontArm: 'R', armR: (u, sw) => micProp(u, sw, who, .05) });

  // ---------- where a posed Clawd's parts are (world space), mirroring clawd()'s transform ----------
  function bodyPt(x, y, u, o, M, bx, by) {   // body-space point (bx, by) in u -> world
    const sq = (o.sq || 0) + (o.take || 0), fx = (o.flip ? -1 : 1) * (o.sx ?? 1) * M.sx * (1 + sq * .6) * (1 + clamp(o.smear || 0) * .35), fy = (o.sy ?? 1) * M.sy * (1 - sq);
    const X0 = bx * u * fx, Y0 = by * u * fy, c = Math.cos(o.rot || 0), s = Math.sin(o.rot || 0);
    return [x + (o.dx || 0) * u + X0 * c - Y0 * s, y + (o.dy || 0) * u + X0 * s + Y0 * c];
  }
  function nubAt(x, y, u, o, M, which) {     // the tip of arm 'L' or 'R' (front / 3/4 views)
    const V = VIEWS[o.view] || VIEWS.front, arm = V.arms.find(a => a[2] === which); if (!arm || !arm[1]) return null;
    const [px, dir] = arm, a = which === 'L' ? (o.aL ?? .2) : (o.aR ?? .2), ang = dir < 0 ? a : -a;
    const pv = px + dir * .55 * clamp((Math.abs(a) - .7) / .9);
    return bodyPt(x, y, u, o, M, pv + dir * 2.2 * Math.cos(ang), -4.5 + dir * 2.2 * Math.sin(ang));
  }

  // ---------- the Ink with a scream: lid open, red mouth, red glow inside ----------
  const inkScream = (k, extra = {}) => ({ lid: k, mouth: null, red: 1, mouthCol: '#7A0E14', eyes: 'glowRed', ...extra,
    draw: (u, sw) => { glow(0, -5.6 * u, 6.5 * u * (.6 + .4 * k), '#FF3B2E', .9 * clamp(k * 2)); if (extra.draw) extra.draw(u, sw); } });

  // ---------- cameras as data: { cx, cy, z, rot } ----------
  // camOn: the camera that puts world point (x, y) at screen (sx, sy) with zoom z
  const camOn = (x, y, sx, sy, z, rot = 0) => ({ cx: x - (sx - 960) / z, cy: y - (sy - 540) / z, z, rot });
  const camMix = (a, b, k) => ({ cx: lerp(a.cx, b.cx, k), cy: lerp(a.cy, b.cy, k), z: a.z * Math.pow(b.z / a.z, k), rot: lerp(a.rot || 0, b.rot || 0, k) });
  function camGo(c, sh = [0, 0]) { camBegin(c.cx + sh[0] / c.z, c.cy + sh[1] / c.z, c.z, c.rot || 0); return CAM; }
  // a tear through screen point c at angle a (radians), long enough to cross the frame; the hole is on its right-hand side
  function tearAt(c, a, o = {}) {
    const R = o.R ?? 1170, d = [Math.cos(a), Math.sin(a)];
    const tl = tornLine([c[0] - d[0] * R, c[1] - d[1] * R], [c[0] + d[0] * R, c[1] + d[1] * R], o);
    return { pts: tl.pts, hole: [-tl.n[0], -tl.n[1]] };
  }

  // ======================================= SHOT 1: THE GREAT SLASH =======================================
  const S1 = { p0: [-100, 1000], p1: [2020, 80] };
  const A_DIAG = Math.atan2(S1.p1[1] - S1.p0[1], S1.p1[0] - S1.p0[0]), A_VERT = -Math.PI / 2;
  const s1Zoom = t => 1.65 * (1 + .05 * ease(seg(t, B(0), B(8))));
  const S1CAM = {
    parl: t => camOn(LAY.chester[0], LAY.chester[1], 700, 690, s1Zoom(t)),            // Chester's feet at screen (700, 690)
    ink: t => camOn(2 * MIR - LAY.chester[0], LAY.chester[1], 1230, 1010, s1Zoom(t))  // Ink Chester's at (1230, 1010)
  };

  // Chester's performance in shot 1 (and the Ink's mirror of it). bp = beats since B0.
  function s1Chester(t) {
    const keys = [[B(0), 'excited'], [B(2.3), 'surprised', { emote: '!' }], [B(4), 'determined']];
    const m = mood('chester', t, keys, { take: 1.2 });
    const bp = (t - B(0)) / BEAT, lean = bp < 2.3 ? .04 : bp < 4 ? -.12 * ease(seg(bp, 2.3, 2.8)) : lerp(-.12, .09, ease(seg(bp, 4, 4.5))) + .03 * Math.sin(bp * Math.PI);
    const hop = jump(t, B(4) - .05, B(4) + .42, 1.6);
    const sing = bp < 2.3 || bp >= 4 ? singing(t, 'belt') : { mouth: 'O' };
    return { ...m, ...sing, rot: lean + (m.rot || 0) * .5, dy: (m.dy || 0) * .6 + hop.dy, sq: (m.sq || 0) + hop.sq,
      lookX: bp < 1.5 ? .6 : 1, lookY: bp < 1.5 ? .1 : .55, aL: bp >= 4 && bp < 4.7 ? 1.4 : (m.aL ?? .6), emote: bp >= 2.3 && bp < 4 ? m.emote : null };
  }

  // Ink Chester in shot 1: he sings with Chester (his lid flaps where Chester's mouth does), grins while Chester
  // takes, then belts back at him, mirrored
  function s1InkOpts(t, pc) {
    const bp = (t - B(0)) / BEAT, grin = seg(t, B(2.3), B(2.8)) * (1 - seg(t, B(3.8), B(4))), flap = Math.abs(Math.sin(bpOf(t) * Math.PI * 2));
    const lid = bp < 2.3 ? (.1 + .1 * flap) * (1 - seg(bp, 2.1, 2.3)) : bp >= 4 ? (.2 + .2 * flap) * seg(bp, 4, 4.15) : 0;
    return { ...mirrorPose(pc), lookY: -.55, lookX: 1, grin, drip: .8, seed: 7, of: 'chester',
      mouth: grin > .3 ? 'jag' : null, lid, mouthCol: '#5A0C14', ...inkMic(bpOf(t)),
      draw: (u, sw) => {
        if (lid > .05) glow(0, -5.4 * u, 5 * u, '#FF4A3A', .6 * lid);
        const gl = pulse(t, 5) * (1 - seg(lid, .08, .14));   // the glasses glint on the beat
        if (gl > .05) { glow(-3.2 * u, -6.75 * u, 1.3 * u, '#FFF6DA', .75 * gl); inkLine([[-3.6 * u, -6.3 * u], [-2.8 * u, -7.1 * u]], sw * 1.1 * gl, '#FFF6DA', 'inkfine', 0); }
      } };
  }
  // hand a pose over from one choreography to another: numbers blend, everything else switches at the midpoint
  const BLEND = ['dy', 'sq', 'rot', 'dx', 'aL', 'aR', 'lid', 'lookX', 'lookY', 'squint', 'grin'];
  function blendPose(a, b, k) {
    if (k >= 1) return b; if (k <= 0) return a;
    const o = { ...(k < .5 ? a : b) };
    for (const f of BLEND) if (typeof a[f] === 'number' || typeof b[f] === 'number') o[f] = lerp(a[f] ?? 0, b[f] ?? 0, k);
    return o;
  }

  function shot1(t, lt, dur) {
    const g = t - B(0), bp = g / BEAT;
    // the tear: trembles on every beat, breathes with the bar, strains (counter-swing) before the swing out
    const trem = 1 + .55 * pulse(t, 7) + .25 * pulse2(t, 9), breath = 10 * Math.sin((t - B(0)) / BAR * TAU);
    const strain = seg(t, B(7.3), B(8)), pre = -.035 * Math.sin(Math.PI * strain);   // a small counter-rotation
    const tear = tearAt([960, 540], A_DIAG + pre, { seed: 3, rough: 15, amp: trem * (1 + 1.5 * strain), bulge: breath + 16 * strain * Math.sin(t * 40) });
    const hole = tear.hole;   // the ink side is to the lower right

    const opened = g > .07;   // before the halves part, nothing of the world is visible: skip painting it
    const sh = shakeXY(t, 14 * Math.exp(-Math.max(0, g - .1) * 6) * (g > .1 ? 1 : 0));
    // ---- the Ink Side (lower right), its own camera on Ink Chester at his mirrored mark
    const ink = [2 * MIR - LAY.chester[0], LAY.chester[1]], u = 26;   // = U2.front: the same size through the swing
    const pc = s1Chester(t);
    if (opened) {
      paintLayer(SP + 'ink', () => {
        camGo(S1CAM.ink(t), sh);
        inkSide(t, { hooks: { floor: () => {
          inkling(ink[0], ink[1], u, s1InkOpts(t, pc));
        } } });
        camEnd();
      });
      // ---- the parlor (upper left), its camera on Chester at his mark
      camGo(S1CAM.parl(t), sh);
      parlor(t, { drums: drumHits(t), flicker: .15, cold: .12, peel: .3, portrait: { stage: 'bleed' } });
      camEnd();
      // ---- the hole: the ink side through everything below the tear
      showLayer(SP + 'ink', [sidePolyOf(tear.pts, hole)], { feather: 1.2 });
      rip(tear.pts, hole, { s: 1.25, key: 's1 tear', t });
      // light still spilling from the fresh cut
      const spill = 1 - seg(g, .2, 1.1);
      if (spill > .01) glowAlong(tear.pts, 200, '#FFE9B8', .7 * spill);
      // ---- Chester stands in front of the torn paper
      camGo(S1CAM.parl(t), sh);
      member('chester', LAY.chester[0], LAY.chester[1], u, { ...pc, micBob: .1 * Math.sin(bpOf(t) * Math.PI), seed: 2 });
      camEnd();
    } else {
      boilSeed('s1 black');
      paint(rectPts(-60, -60, W + 120, H + 120), { wash: '#0E0B15', ink: null });
    }
    // ---- the opening: the grin of light stretches into the slash, then the blackout is cut in two and parts
    s1Opening(t, g, tear, hole);
  }

  // The opening. c4 ends on a thin lens of light along the diagonal (its grin, stretched: centre (960, 540), half-length
  // 1230, 12 px deep, two big glows on #0E0B15). We start exactly there: the line flares as it cuts, then the blackout
  // splits along it and its halves slide apart to show the torn world underneath.
  const C4L = [[960 - 1230 * Math.cos(A_DIAG), 540 - 1230 * Math.sin(A_DIAG)], [960 + 1230 * Math.cos(A_DIAG), 540 + 1230 * Math.sin(A_DIAG)]];
  function s1Opening(t, g, tear, hole) {
    if (g > .95) return;
    const N = 48, sl = [];
    for (let i = 0; i <= N; i++) sl.push(lerpPt(C4L[0], C4L[1], i / N));
    const hand = 1 - seg(g, 0, .3);   // c4's glows, handed over
    if (hand > .01) { glow(960, 540, 1353, '#FFF1C8', .7 * hand); glow(960, 540, 615, '#FFFBEA', .55 * hand); }
    // the blackout halves, once the cut has happened
    const part = easeOut(seg(g, .08, .62));
    if (g > .06) {
      const sep = 950 * part, rotK = .07 * part;
      for (const sd of [-1, 1]) {
        const side = [hole[0] * sd, hole[1] * sd];
        const poly = sidePolyOf(tear.pts, side, 2600), c = [960 + side[0] * 400, 540 + side[1] * 400];
        const tr = p => { const q = add(p, side, sep), dx = q[0] - c[0], dy = q[1] - c[1], cs = Math.cos(rotK * sd), sn = Math.sin(rotK * sd); return [c[0] + dx * cs - dy * sn, c[1] + dx * sn + dy * cs]; };
        boilSeed('s1 half' + sd);
        paint(poly.map(tr), { wash: '#0E0B15', ink: null });
        rip(tear.pts.map(tr), [-side[0], -side[1]], { s: 1.1, key: 's1 half edge' + sd, t, shadow: false, core: '#EFE3CB', stain: '#2A2033' });
      }
    }
    // the blade of light: c4's lens (12 px, bulging to the lower right), flaring as it cuts, fading as the halves part
    const flare = 1 - seg(g, .22, .5);
    if (flare > .01) {
      const wid = (12 + 14 * Math.sin(Math.PI * seg(g, 0, .2))) * (1 - seg(g, .2, .45)), up = [], dn = [];
      for (let i = 0; i <= N; i++) { const b = Math.sin(i / N * Math.PI); up.push(add(sl[i], hole, -wid * b * .15)); dn.push(add(sl[i], hole, wid * b)); }
      glowAlong(sl, 150 + 120 * seg(g, 0, .12), '#FFF1C8', .75 * flare * (.3 + .7 * seg(g, 0, .08)));
      boilSeed('s1 blade');
      if (wid > 1.5) paint(up.concat(dn.reverse()), { wash: '#FFF6DA', ink: null });
    }
  }

  // ======================================= SHOT 2: TWO BANDS =======================================
  const U2 = { front: 26, couch: 16, joe: 17, rob: 17 };
  const X = x => 2 * MIR - x;   // world x on the Ink Side, mirrored
  // The real band runs on its own clock: in sync with the Ink until B12, frozen for one beat, then a beat behind.
  const tauReal = t => t < B(12) ? t : t < B(13) ? B(12) : t - BEAT;

  // the band's groove at choreography time tau (the same numbers as bandHooks, so the Inks can copy them exactly)
  function bandPose(name, tau, en = 1) {
    const bp = bpOf(tau), nod = (ph = 0) => -.35 * en * Math.abs(Math.sin((bp + ph) * Math.PI));
    switch (name) {
      case 'brad': return { ...mfeel('brad', 'cool', tau, { seed: 3 }), eyes: 'closed', mouth: null, emote: null, strum: bp * 2, dy: nod(.1), rot: .03 * en * Math.sin(bp * Math.PI / 2) };
      case 'phoenix': return { ...mfeel('phoenix', 'happy', tau, { seed: 6 }), emote: null, strum: bp * 2 + .25, dy: nod(.35), rot: -.04 * en * Math.sin(bp * Math.PI / 2 + 1) };
      case 'joe': { const sc = Math.sin(bp * TAU * 2) * en; return { ...mfeel('joe', 'mischief', tau, { seed: 9 }), emote: null, noShadow: true, noLegs: true, aL: -.2 + .35 * sc, aR: .1 - .2 * Math.max(0, sc), dy: nod(.2), lookX: -.4 }; }
      case 'rob': { const h = drumHits(tau, en), hitL = h.snare + h.crash * .6, hitR = h.hat + h.kick * .3;
        return { ...mfeel('rob', 'determined', tau, { seed: 12 }), emote: null, noShadow: true, noLegs: true, aL: .9 - .9 * hitL, aR: .7 - .7 * hitR, stickL: .4 - .5 * hitL, stickR: -.2 - .4 * hitR, dy: -.25 * h.crash, sq: .05 * h.kick }; }
      case 'mike': { const b = mfeel('mike', 'determined', tau, { seed: 1 }); return { ...b, emote: null, ...singing(tau, 'rap'), micBob: .12 * Math.sin(bp * Math.PI), aL: .5 + .7 * Math.abs(Math.sin(bp * Math.PI)) * en, dy: (b.dy || 0) * en }; }
      case 'chester': { const b = mfeel('chester', 'excited', tau, { seed: 2 }); return { ...b, emote: null, ...singing(tau, 'belt'), aL: .6 + .8 * Math.abs(Math.sin(bp * Math.PI + .5)) * en, dy: (b.dy || 0) * en }; }
    }
  }
  // the big moves of the chorus, at choreography time tau (mutates and returns the pose)
  function bigMoves(name, tau, p) {
    const front = name === 'mike' || name === 'chester', seat = name === 'brad' || name === 'phoenix';
    p.dy = p.dy || 0; p.sq = p.sq || 0; p.rot = p.rot || 0;
    // B10: a small hop, everyone together (the two bands are still in sync)
    let j = front ? jump(tau, B(10) - .06, B(10) + .36, 1.2) : { dy: -.7 * Math.sin(Math.PI * seg(tau, B(10) - .02, B(10) + .3)), sq: 0 };
    p.dy += j.dy; p.sq += j.sq;
    // B12: JUMP, arms up
    const up = ease(seg(tau, B(12) - .14, B(12) + .02)) * (1 - ease(seg(tau, B(12) + .5, B(12) + .78)));
    j = front ? jump(tau, B(12) - .08, B(12) + .52, 4.6) : { dy: -(seat ? 2 : 1.6) * Math.sin(Math.PI * seg(tau, B(12) - .04, B(12) + .42)), sq: .14 * spring(tau, B(12) + .42, 9, 22) };
    p.dy += j.dy; p.sq += j.sq;
    if (!seat && up > .01) { p.aL = lerp(p.aL ?? .2, 1.45, up); p.aR = lerp(p.aR ?? .2, 1.3, up); if (front && up > .3) p.micAt = 'up'; }
    // B13: headbang, leaning in toward the tear
    const hb = Math.sin(Math.PI * seg(tau, B(13) - .06, B(13) + .5));
    p.rot += .28 * hb + .06 * spring(tau, B(13) + .5, 7, 16); p.dy += .4 * hb; p.sq += .07 * hb;
    // B14: a drawn spin (the frontmen and Joe), a head whip (the others)
    if (front || name === 'joe') {
      if (tau > B(14) - .02 && tau < B(14) + .55) { Object.assign(p, turn(tau, B(14), B(14) + .5, 0, 1)); if (front) p.micAt = 'up'; }
      j = jump(tau, B(14) - .05, B(14) + .5, front ? 1.4 : .6); p.dy += j.dy; p.sq += j.sq;
    } else p.rot += .18 * Math.sin(TAU * seg(tau, B(14) - .02, B(14) + .5)) * (1 - seg(tau, B(14), B(14) + .5));
    // B15: reach for the tear
    const rc = ease(seg(tau, B(15) - .1, B(15) + .1)) * (1 - ease(seg(tau, B(15) + .6, B(15) + .8)));
    if (rc > .01) { p.rot += .12 * rc; if (!seat) { p.aR = lerp(p.aR ?? .2, .05, rc); if (front) p.micAt = 'up'; } }
    return p;
  }
  // the real band's faces run on the wall clock: frozen in shock for a beat, then scared puppets
  function realFace(name, t, p) {
    if (t < B(12)) return p;
    const frozen = t < B(13), k = seg(t, B(12), B(12) + .15);
    p.eyes = frozen ? 'wide' : 'scared'; p.squint = 0; p.lookX = frozen ? .9 * k : .6 * Math.sin(t * 2.7 + name.length);
    if (frozen) { p.dx = (p.dx || 0) + .05 * Math.sin(t * 70); if (name !== 'brad') { p.mouth = 'O'; p.lid = 0; } }
    p.tint = 'pale'; p.tintK = .45 * seg(t, B(12), B(13));
    if (name === 'mike' || name === 'chester') { p.emote = frozen ? '!?' : 'sweat'; p.emoteK = frozen ? seg(t, B(12) + .08, B(12) + .3) : 1; p.emoteAge = t - B(12); }
    return p;
  }
  const HANDOVER = t => ease(seg(t, B(8), B(8) + .35));
  function realOpts(name, t, tau) {
    let p = realFace(name, t, bigMoves(name, tau, bandPose(name, tau)));
    if (name === 'chester' && t < B(8) + .35) p = blendPose({ ...s1Chester(t), micBob: .1 * Math.sin(bpOf(t) * Math.PI), seed: 2 }, p, HANDOVER(t));
    if (name === 'chester' && t < B(9.6)) {   // carry shot 1's determined face through the swing, then let it go
      const m = mood('chester', t, [[B(4), 'determined'], [B(8.6), 'excited']]);
      Object.assign(p, { eyes: m.eyes, squint: m.squint, lookX: lerp(1, 0, seg(t, B(8.4), B(9.2))), lookY: lerp(.55, 0, seg(t, B(8.4), B(9.2))) });
    }
    if (name === 'rob') { p.armL = stickHook(p.stickL); p.armR = stickHook(p.stickR); }
    return p;
  }
  // an ink silhouette of a guitar (or bass) with chalk strings, held like the real one (draw hook, body space)
  const inkGuitar = (bass, strum) => (u, sw) => {
    push(); translate(1.4 * u, -3.4 * u); rotate(-.32);
    const L = bass ? 9.2 : 7.6, bw = bass ? 3.2 : 2.8, body = [];
    paint(rectPts(-L * u, -.3 * u, (L - 1) * u, .6 * u), { wash: '#100C18', ink: PC.inkRim, sw: sw * .5 });
    for (let i = 0; i < 24; i++) { const a = i / 24 * TAU, x = Math.cos(a), lobe = x < 0 ? .78 : 1; body.push([(x * (x < 0 ? 1.55 : 1.9) + (x < 0 ? -.2 : .3)) * u * (bass ? 1.12 : 1), Math.sin(a) * bw * .5 * u * lobe]); }
    paint(body, { wash: '#100C18', ink: PC.inkRim, sw: sw * .6 });
    paint(ellPts(-.25 * u, 0, .55 * u, .55 * u, 12), { wash: '#060409', ink: null });
    for (let i = 0; i < 4; i++) inkLine([[-L * u, (-.2 + i * .13) * u], [u, (-.2 + i * .13) * u]], sw * .15, PC.chalkDim, 'inkfine', 0);
    pop();
    const s = Math.sin(strum * TAU);
    paint(rrPts((1.6 + .15 * s) * u, (-4.1 + .55 * s) * u, 1.3 * u, 1.0 * u, .4 * u), { wash: PC.inkBody, ink: PC.inkRim, sw: sw * .6 });
    paint(rrPts(-4.7 * u, (-6.1 - (bass ? .25 : 0)) * u, 1.0 * u, 1.1 * u, .4 * u), { wash: PC.inkBody, ink: PC.inkRim, sw: sw * .6 });
  };
  // an Ink copying its member, mirrored (on the Ink's own clock, which is the music's)
  function inkOpts(name, tau, t) {
    const p = bigMoves(name, tau, bandPose(name, tau)), bpp = bpOf(tau);
    const q = { ...mirrorPose(p), of: name, seed: 5 + name.length, drip: .7, lookX: p.lookX ?? 0, lookY: p.lookY ?? 0 };
    if (p.noLegs) { q.noLegs = true; q.noShadow = true; }
    if (name === 'rob') { q.armL = stickHook(p.stickL); q.armR = stickHook(p.stickR); }
    if (name === 'brad' || name === 'phoenix') { q.aL = -1.1; q.aR = -1.2; q.draw = inkGuitar(name === 'phoenix', p.strum); }
    if (name === 'mike' || name === 'chester') {
      if (p.micAt === 'up') { const a = q.aR ?? .2; q.armR = (u, sw) => micProp(u, sw, name, Math.PI / 2 - a); }
      else Object.assign(q, inkMic(bpp, name));
      q.lid = (.1 + .12 * Math.abs(Math.sin(bpp * TAU))) * (q.view && q.view !== 'front' ? 0 : 1); q.mouthCol = '#5A0C14';
    }
    // the takeover: the Inks start to grin just before they lead, and their eyes flare
    const take = seg(t, B(11.3), B(11.8));
    q.grin = take; if (take > .3) { q.mouth = 'jag'; q.lid = 0; }
    q.eyeGlow = 1 + .8 * seg(t, B(11.8), B(12)) * Math.exp(-Math.max(0, t - B(12)) * 2);
    if (name === 'chester' && t < B(8) + .35) return blendPose(s1InkOpts(t, s1Chester(t)), q, HANDOVER(t));
    return q;
  }
  function s2Hooks(t, tau) {
    const o = n => realOpts(n, t, tau);
    return {
      couch: () => { seated('brad', LAY.brad[0], U2.couch, o('brad')); seated('phoenix', LAY.phoenix[0], U2.couch, o('phoenix')); },
      joe: () => member('joe', LAY.joe[0], LAY.joe[1], U2.joe, o('joe')),
      rob: () => member('rob', LAY.rob[0], LAY.rob[1], U2.rob, o('rob'))
    };
  }
  function s2InkHooks(t) {
    return {
      couch: () => { for (const n of ['brad', 'phoenix']) inkling(X(LAY[n][0]), LAY.seatY + 2 * U2.couch + 4, U2.couch, { ...inkOpts(n, t, t), noLegs: true, noShadow: true }); },
      joe: () => inkling(X(LAY.joe[0]), LAY.joe[1], U2.joe, inkOpts('joe', t, t)),
      rob: () => inkling(X(LAY.rob[0]), LAY.rob[1], U2.rob, inkOpts('rob', t, t)),
      floor: () => { for (const n of ['mike', 'chester']) inkling(X(LAY[n][0]), LAY[n][1], U2.front, inkOpts(n, t, t)); }
    };
  }
  // the cameras: pull back from shot 1's framings to the mirrored wide as the tear swings, then push in on the frontmen
  // the tear sits at world x = cx (a margin right of Chester, so neither frontman ever crosses it)
  const S2W = { cx: 2490, cy: 610, z: .53 }, S2P = { cy: 585, z: .84 }, S2Z = .93;
  function s2Cams(t) {
    const kIn = ease(seg(t, B(8) - .02, B(8) + .8)), push = ease(seg(t, B(10.3), B(12))), creep = seg(t, B(12), B(16));
    const wide = { cx: S2W.cx, cy: lerp(S2W.cy, S2P.cy, push), z: S2W.z * Math.pow(S2P.z / S2W.z, push) * lerp(1, S2Z / S2P.z, creep), rot: 0 };
    const inkW = { ...wide, cx: X(wide.cx) };
    return { parl: kIn < 1 ? camMix(S1CAM.parl(B(8)), wide, kIn) : wide, ink: kIn < 1 ? camMix(S1CAM.ink(B(8)), inkW, kIn) : inkW, kIn };
  }
  function lampsOf(L) { return [[LAY.lampA, 290, 760, L.kA], [LAY.lampB, 290, 760, L.kB], [LAY.lampDesk, 520, 520, L.kD], [LAY.sconces[0], 330, 300, L.kS * .7], [LAY.sconces[1], 330, 300, L.kS * .7]]; }

  function shot2(t, lt, dur) {
    const sw = seg(t, B(8), B(8) + .62), ang = lerp(A_DIAG, A_VERT, backOut(sw));
    const trem = 1 + .5 * pulse(t, 7) + .2 * pulse2(t, 9) + 1.2 * (1 - seg(t, B(8), B(8) + .9)), breath = 8 * Math.sin((t - B(8)) / BAR * TAU);
    const tear = tearAt([960, 540], ang, { seed: 3, rough: 15, amp: trem, bulge: breath });
    const { parl, ink, kIn } = s2Cams(t), tauR = tauReal(t), settled = kIn >= 1 && sw >= 1;
    const sh = shakeXY(t, (5 + 6 * seg(t, B(12), B(12.2))) * pulse(t, 8) + 10 * Math.exp(-Math.max(0, t - B(8)) * 5));
    paintLayer(SP + 'ink', () => {
      const c = camGo(ink, [-sh[0], sh[1]]);   // a mirrored shake keeps the two halves mirror images
      if (settled) cullTo(c.cx - 60 / c.zoom, c.cx + 960 / c.zoom + 60);
      inkSide(t, { drums: drumHits(t), hooks: s2InkHooks(t) });
      camEnd();
    });
    const c = camGo(parl, sh), real = CAM;
    if (settled) cullTo(c.cx - 960 / c.zoom - 60, c.cx + 60 / c.zoom);
    const L = parlor(t, { ambient: 0, drums: drumHits(tauR), flicker: .2, cold: .2, peel: .35, portrait: { stage: 'bleed' }, hooks: s2Hooks(t, tauR) });
    camEnd();
    roomLight(.22, lampsOf(L), { cam: real });
    showLayer(SP + 'ink', [sidePolyOf(tear.pts, tear.hole)], { feather: 1.2 });
    rip(tear.pts, tear.hole, { s: 1.15, key: 's2 tear', t });
    // the frontmen stand in front of the paper
    camGo(parl, sh);
    for (const n of ['mike', 'chester']) member(n, LAY[n][0], LAY[n][1], U2.front, realOpts(n, t, tauR));
    camEnd();
    // they're being played: chalk strings snap from the Inks' nubs across the tear to the real frontmen's heads
    const on = seg(t, B(12) + .05, B(12) + .2);
    if (on > 0) {
      const pc = { cx: parl.cx + sh[0] / parl.z, cy: parl.cy + sh[1] / parl.z, zoom: parl.z, rot: 0 }, ic = { cx: ink.cx - sh[0] / ink.z, cy: ink.cy + sh[1] / ink.z, zoom: ink.z, rot: 0 };
      for (const n of ['chester', 'mike']) {
        const io = inkOpts(n, t, t), ro = realOpts(n, t, tauR), M = BAND[n];
        const nub = nubAt(X(LAY[n][0]), LAY[n][1], U2.front, { ...io, aR: io.aR }, M, 'R'); if (!nub) continue;
        const a = toScreen(nub[0], nub[1], ic), b = toScreen(...bodyPt(LAY[n][0], LAY[n][1], U2.front, ro, M, 0, -8.2), pc);
        const e = lerpPt(a, b, on), taut = pulse(t, 5), sag = (46 - 36 * taut) * on * (Math.hypot(e[0] - a[0], e[1] - a[1]) / 600);
        const mid = add(lerpPt(a, e, .5), [0, 1], sag);
        boilSeed('s2 string ' + n);
        inkLine([a, mid, e], 3, '#2B2233', 'inkfine', .5);
        inkLine([a, mid, e], 1.6, PC.chalk, 'inkfine', .5);
        if (on >= 1) paint(ellPts(b[0], b[1], 4, 4, 8), { wash: PC.chalk, ink: '#2B2233', sw: .5 });   // the knot
      }
    }
  }
  // ======================================= SHOT 3: SCREAM AGAINST SCREAM =======================================
  const U3 = 26, CH = LAY.chester, ICH = [X(LAY.chester[0]), LAY.chester[1]];
  // a scream's lid: snaps open on its beat (no time for anticipation: it's the downbeat), holds wide and flutters
  const screamLid = (t, t0, k = .62) => t < t0 ? 0 : k * backOut(seg(t, t0, t0 + .12)) + .04 * Math.sin(t * 43);
  // the mouth of a screaming front-view Clawd, in world space (flip = facing left)
  const mouthAt = (x, y, u, flip, lean = 0) => [x + (flip ? -1 : 1) * (1.2 + 5 * lean) * u, y - 5.9 * u];

  // Chester screaming (lid wide, mic raised, leaning at the tear), or recoiling from the Ink's scream
  function chesterScream(t, t0, k = .62) {
    const age = t - t0, lid = screamLid(t, t0, k), shake = .05 * Math.sin(t * 90);
    return { ...mfeel('chester', 'angry', t, { seed: 2 }), emote: null, eyes: 'angry', mouth: null, lid, lookX: .8, squint: .25,
      micAt: 'up', aR: 1.15 + .1 * Math.sin(t * 20), aL: .9 + .15 * Math.sin(t * 17), rot: .07 * ease(seg(age, 0, .15)) + .01 * Math.sin(t * 60),
      dx: shake, sq: -.08 * easeOut(seg(age, 0, .1)) + .03 * Math.sin(t * 50), tint: 'flush', tintK: .5 };
  }
  function chesterRecoil(t, t0) {
    const age = t - t0, k = easeOut(seg(age, 0, .2));
    return { ...mfeel('chester', 'scared', t, { seed: 2 }), emote: null, eyes: 'squeeze', mouth: 'wobble', micAt: 'up', aR: .6, aL: 1.3,
      rot: -.16 * k + .02 * Math.sin(t * 70), dx: -.6 * k + .05 * Math.sin(t * 80), sq: .06 * k };
  }
  // the Ink screaming back: red eyes, lid wide, red glow inside
  function inkScreamOpts(t, t0, k = .66) {
    const age = t - t0, lid = screamLid(t, t0, k);
    return { of: 'chester', seed: 7, drip: 1, flip: true, ...inkScream(lid), lookX: .8, squint: .2,
      aL: 1.1 + .15 * Math.sin(t * 19), aR: .9 + .1 * Math.sin(t * 23), rot: -.07 * ease(seg(age, 0, .15)) - .01 * Math.sin(t * 60),
      dx: -.05 * Math.sin(t * 90), sq: -.08 * easeOut(seg(age, 0, .1)) };
  }
  function inkRecoil(t, t0) {
    const age = t - t0, k = easeOut(seg(age, 0, .2));
    return { of: 'chester', seed: 7, drip: 1, flip: true, eyes: 'glow', squint: .45, grin: 0, mouth: 'wobble',
      aL: 1.2, aR: .5, rot: .16 * k + .02 * Math.sin(t * 70), dx: .6 * k + .05 * Math.sin(t * 80), sq: .06 * k };
  }

  // one split close-up: the parlor left of tearX, the Ink Side right of it, a Clawd in each, screams on top
  function screamSplit(t, o) {
    const tear = tearAt([o.tearX, 540], A_VERT, { seed: 5, rough: 17, amp: o.amp ?? 1.3, bulge: o.bulge ?? 0, R: 700 });
    const sh = shakeXY(t, o.shake ?? 10);
    paintLayer(SP + 'ink', () => {
      camGo(o.inkCam, sh);
      inkSide(t, { hooks: { floor: () => inkling(ICH[0], ICH[1], U3, o.ink) } });
      camEnd();
    });
    const pc = camGo(o.parlCam, sh), pcam = CAM;
    parlor(t, { flicker: .3, cold: .25, peel: .4, portrait: { stage: 'bleed' }, drums: drumHits(t), hooks: { floor: () => member('chester', CH[0], CH[1], U3, o.chester) } });
    camEnd();
    showLayer(SP + 'ink', [sidePolyOf(tear.pts, tear.hole)], { feather: 1.2 });
    rip(tear.pts, tear.hole, { s: 1.6, key: 's3 tear', t, coreW: 1.1 });
    // screams: cream rings from Chester, red ones from the Ink, both through the tear
    for (const r of o.rings || []) {
      const [mx, my] = toScreen(r.at[0], r.at[1], r.who === 'ink' ? { cx: o.inkCam.cx, cy: o.inkCam.cy, zoom: o.inkCam.z, rot: 0 } : pcam);
      for (const off of [0, .5]) screamRings(mx, my, frac((t - r.t0) / 1 - off) * 1, r.s ?? 1, { dir: r.dir, arc: [-.5, .5], life: 1, n: 3, gap: .14, col: r.col, w: 1.3, squash: 1 });
      glow(mx, my, 160 * (r.s ?? 1), r.who === 'ink' ? '#FF3B2E' : '#FFE9B8', .5);
    }
  }

  function shot3(t, lt, dur) {
    if (t >= B(22)) return s3Hold(t);
    const part = t < B(18) ? 0 : t < B(20) ? 1 : 2, t0 = B(16 + 2 * part), age = t - t0;
    const punch = 1 + .06 * easeOut(seg(age, 0, .12)) * (1 - .5 * seg(age, .12, 1.4));   // a punch-in on every scream
    if (part === 0) {   // A: Chester screams at the tear; the Ink recoils in the sliver on the right
      const z = 2.15 * punch, ink = camOn(ICH[0], ICH[1], 1745, 1040, z);
      const at = mouthAt(CH[0], CH[1], U3, false, .07);
      screamSplit(t, { tearX: 1420, bulge: -30 * easeOut(seg(age, .05, .4)), amp: 1.4 + .8 * pulse(t, 6), shake: 9 * Math.exp(-age * 3) + 3,
        parlCam: camOn(CH[0], CH[1], 700, 1040, z), inkCam: ink, chester: chesterScream(t, t0), ink: inkRecoil(t, t0 + .12),
        rings: [{ at, t0: t0 + .05, dir: 0, col: PAL.cream }] });
    } else if (part === 1) {   // B: the reverse. The Ink screams back, red; Chester recoils in the sliver on the left
      const z = 2.15 * punch, ink = camOn(ICH[0], ICH[1], 1220, 1040, z);
      const at = mouthAt(ICH[0], ICH[1], U3, true, .07);
      screamSplit(t, { tearX: 500, bulge: 30 * easeOut(seg(age, .05, .4)), amp: 1.4 + .8 * pulse(t, 6), shake: 11 * Math.exp(-age * 3) + 3,
        parlCam: camOn(CH[0], CH[1], 175, 1040, z), inkCam: ink, chester: chesterRecoil(t, t0 + .12), ink: inkScreamOpts(t, t0),
        rings: [{ at, t0: t0 + .05, dir: Math.PI, col: '#FF6A50', who: 'ink' }] });
    } else {   // C: both at once, face to face across the tear; at B21.4 Chester winds up and launches at it
      const z = 1.95 * punch, ink = camOn(ICH[0], ICH[1], 1450, 1040, z);
      const wind = seg(t, B(21.3), B(21.6)), go = seg(t, B(21.6), B(22));
      const ch = chesterScream(t, t0, .7);
      if (wind > 0) Object.assign(ch, { lid: ch.lid * (1 - wind), mouth: 'teeth', eyes: 'determined', sq: .22 * ease(wind) * (1 - go) - .2 * go, rot: -.12 * ease(wind) + .3 * easeIn(go), dx: 1.6 * easeIn(go), dy: -1.2 * Math.sin(Math.PI * go), aL: lerp(.9, 0, go), aR: lerp(1.15, 0, go), micAt: 'up', smear: .6 * go, smearDir: 1 });
      const collide = Math.sin(t * 75) * 22 * seg(age, .05, .2);
      screamSplit(t, { tearX: 960, bulge: collide, amp: 2.2 + 1.2 * pulse(t, 5), shake: 13 + 6 * pulse(t, 6),
        parlCam: camOn(CH[0], CH[1], 470, 1040, z), inkCam: ink, chester: ch, ink: inkScreamOpts(t, t0 + .02, .72),
        rings: wind > .5 ? [{ at: mouthAt(ICH[0], ICH[1], U3, true, .07), t0: t0 + .05, dir: Math.PI, col: '#FF6A50', who: 'ink', s: .8 }]
          : [{ at: mouthAt(CH[0], CH[1], U3, false, .07), t0: t0 + .05, dir: 0, col: PAL.cream, s: .8 }, { at: mouthAt(ICH[0], ICH[1], U3, true, .07), t0: t0 + .05, dir: Math.PI, col: '#FF6A50', who: 'ink', s: .8 }] });
    }
  }

  // D: Chester, back slammed against the paper, arms spread along a crack; his nubs pin it shut, and beyond them the
  // crack bulges open and ink fingers squeeze out, curling over the lips and over his nubs.
  const S3D = { z: 3.0, sx: 960, sy: 1118 };
  function crackShape(t, age) {   // the crack behind Chester (screen space), along his arms
    const u = U3 * S3D.z, yc = S3D.sy - 4.55 * u, half = 13.5 * u, push = .6 + .4 * pulse(t, 5) + .12 * Math.sin(t * 9);
    const open = ease(seg(age, .08, .35)), H0 = u * (1.5 + .45 * push) * open + 3, up = [], dn = [];
    for (let i = 0; i <= 70; i++) {
      const x = 960 - half + 2 * half * i / 70, a = Math.abs(x - 960) / u;
      const env = Math.pow(Math.max(0, 1 - Math.pow((x - 960) / half, 2)), .75);
      const pinch = 1 - .92 * clamp(1 - Math.abs(a - 6) / 1.35) ** .7;   // shut tight under the arms and nubs (4.9u..7.1u)
      const h = H0 * env * pinch, j1 = (hash(i * 3.7 + 1) - .5) * 9 + Math.sin(i * 1.1) * 5, j2 = (hash(i * 5.3 + 2) - .5) * 9 + Math.sin(i * .9 + 2) * 5;
      up.push([x, yc - h - Math.abs(j1) * env]); dn.push([x, yc + h + Math.abs(j2) * env]);
    }
    return { up, dn, yc, u, push, half };
  }
  // an ink finger: a tapered ribbon from inside the crack, curling out over the lip
  function inkFinger(base, len, ang, curl, w) {
    const P = [base]; let a = ang, p = base;
    for (let i = 1; i <= 4; i++) { a += curl; p = [p[0] + Math.cos(a) * len / 4, p[1] + Math.sin(a) * len / 4]; P.push(p); }
    paint(ribbon(P, w, w * .82), { wash: '#342A4A', fill: PC.inkBodyLt, fillOp: 90, ink: '#8C7CB8', sw: 1.6 });
    const tip = P[4]; paint(ellPts(tip[0], tip[1], w * .42, w * .42, 10), { wash: '#342A4A', ink: '#8C7CB8', sw: 1.2 });
    for (const k of [.35, .62]) { const q = lerpPt(P[Math.floor(k * 4)], P[Math.floor(k * 4) + 1], (k * 4) % 1), d = unit(P[1], P[3]); inkLine([add(q, [-d[1], d[0]], -w * .3), add(q, [-d[1], d[0]], w * .3)], .8, PC.chalkDim, 'inkfine', 0); }   // knuckle creases
    return P;
  }
  function s3Hold(t) {
    const age = t - B(22), cr = crackShape(t, age), u = cr.u;
    // behind the paper: the dark, red light, and the Ink's red eye pressed to the gap beyond Chester's right nub
    const eyeX = 960 + 9.6 * u, eyeOpen = ease(seg(age, .45, .75)) * (1 - (frac(t * .7) > .94 ? 1 : 0));
    paintLayer(SP + 'slit', () => {
      boilSeed('s3 void'); paint(rectPts(-40, -40, W + 80, H + 80), { wash: '#0C0911', ink: null });
      glow(960, cr.yc, 800, '#FF3B2E', .55 + .3 * pulse(t, 4));
      if (eyeOpen > .02) {
        boilSeed('s3 eye'); glow(eyeX, cr.yc, 120, '#FF3B2E', 1);
        paint(rectPts(eyeX - 22, cr.yc - 44 * eyeOpen, 44, 88 * eyeOpen, 2), { wash: '#FF5A43', ink: null });
        paint(rectPts(eyeX - 8, cr.yc - 30 * eyeOpen, 16, 50 * eyeOpen), { wash: '#FFD0B8', washOp: 230, ink: null });
      }
    });
    const sh = shakeXY(t, 5 + 7 * pulse(t, 6) + 18 * Math.exp(-age * 7));
    const cam = camOn(CH[0], CH[1], S3D.sx, S3D.sy, S3D.z * (1 + .03 * ease(seg(age, 0, 1.6))));
    camGo(cam, sh);
    parlor(t, { flicker: .35, cold: .3, peel: .45, drums: drumHits(t), portrait: { stage: 'bleed' } });
    camEnd();
    showLayer(SP + 'slit', [cr.up.concat(cr.dn.slice().reverse())], { feather: 1.5 });
    glow(960, cr.yc, 380, '#FF4A3A', .2 + .2 * cr.push);
    rip(cr.up, [0, 1], { s: 1.2, key: 's3 lipU', t, shAlpha: .5, fibres: 1 });
    rip(cr.dn.slice().reverse(), [0, -1], { s: 1.2, key: 's3 lipD', t, shAlpha: .5, fibres: 1 });
    // fingers squeezing out of the open parts beyond his nubs: over the top lip (curling up) and the bottom (curling down)
    const wig = i => .22 * Math.sin(t * 7 + i * 1.7) + .12 * pulse(t, 5);
    const grow = (a0, a1) => ease(seg(age, a0, a1)) * (1 + .15 * pulse(t, 5));
    const cluster = (side, lipUp, n, g, key, spread = 1) => {
      if (g < .02) return;
      boilSeed('s3 fingers ' + key);
      for (let i = 0; i < n; i++) {
        const x = 960 + side * (8.4 + (i - (n - 1) / 2) * 1.05 * spread) * u, lip = lipUp ? cr.up : cr.dn, k = Math.round((x - (960 - cr.half)) / (2 * cr.half) * 70);
        const ly = lip[clamp(k, 0, 70)][1], base = [x, lerp(ly, cr.yc, .55)];
        inkFinger(base, u * (1.15 + .45 * hash(i + key.length * 3)) * g, (lipUp ? -Math.PI / 2 : Math.PI / 2) + side * .45 + (i - (n - 1) / 2) * .3, side * (lipUp ? 1 : -1) * (.22 + wig(i)), u * .56);
      }
    };
    cluster(-1, true, 3, grow(.2, .55), 'a'); cluster(1, true, 3, grow(.3, .65), 'b');
    cluster(-1, false, 3, grow(.45, .8), 'c'); cluster(1, false, 2, grow(.55, .9), 'd');
    cluster(-1, true, 2, grow(.9, 1.25), 'e', 2.6); cluster(1, false, 2, grow(1, 1.35), 'f', 2.8);
    // Chester: slammed back against the paper, arms straight along the crack, straining
    const slam = seg(age, 0, .16), strain = Math.sin(t * 60) * .03, beat = pulse(t, 6);
    camGo(cam, sh);
    member('chester', CH[0], CH[1], U3, { ...mfeel('chester', 'determined', t, { seed: 2 }), emote: 'sweat', emoteK: seg(age, .3, .5), emoteAge: age,
      eyes: age < .55 ? 'squeeze' : Math.sin(t * 2.4) > .55 ? 'angry' : 'squeeze', mouth: 'teeth', mic: false, lookX: .7 * Math.sin(t * 1.3),
      aL: strain + .05 * beat, aR: -strain + .05 * beat, sq: .16 * (1 - slam) + .05 * beat, dy: -.4 * (1 - slam) * (1 - slam), dx: strain * 1.5, rot: .015 * Math.sin(t * 13),
      tint: 'flush', tintK: .35 });
    camEnd();
    // fingers curling round his nub tips (in front of him): they've got hold of him
    const gn = grow(.65, 1.05);
    if (gn > .05) {
      boilSeed('s3 fingers over');
      for (const side of [-1, 1]) for (let i = 0; i < 2; i++) {
        const base = [960 + side * 7.7 * u, cr.yc + (i ? .5 : -.5) * u];
        inkFinger(base, u * 1.05 * gn, side < 0 ? (i ? Math.PI * .8 : -Math.PI * .8) : (i ? Math.PI * .2 : -Math.PI * .2), side * (i ? -1 : 1) * (.5 + wig(i + 4)), u * .48);
      }
    }
  }

  // ======================================= SHOT 4: SHATTER =======================================
  // The 8 slashes, one per beat: [time, a point on the cut (screen), angle]. The first runs up the slit Chester was
  // holding; the last one (B31) shatters everything.
  const SLASH = [[B(24), [962, 540], -1.5], [B(25), [760, 380], -.38], [B(26), [1250, 700], .48], [B(27), [620, 780], -.95],
    [B(28), [1420, 330], 1.15], [B(29), [420, 560], .9], [B(30), [1180, 180], -.12], [B(31), [960, 560], .3]];
  const FALL = B(31);
  function splitPoly(P, p, d) {   // cut a convex polygon by the line through p along d: [positive side, negative side]
    const s = v => d[0] * (v[1] - p[1]) - d[1] * (v[0] - p[0]), A = [], Bn = [];
    for (let i = 0; i < P.length; i++) {
      const a = P[i], b = P[(i + 1) % P.length], sa = s(a), sb = s(b);
      (sa >= 0 ? A : Bn).push(a);
      if ((sa >= 0) !== (sb >= 0)) { const k = sa / (sa - sb), q = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; A.push(q); Bn.push(q); }
    }
    return [A, Bn];
  }
  // the shards after the first k slashes: the frame rectangle cut by k lines. Each shard knows its side of every line.
  function shardsAfter(k) {
    let S = [{ poly: [[-30, -30], [W + 30, -30], [W + 30, H + 30], [-30, H + 30]], signs: [] }];
    for (let i = 0; i < k; i++) {
      const [, p, a] = SLASH[i], d = [Math.cos(a), Math.sin(a)], out = [];
      for (const sh of S) {
        const [A, Bn] = splitPoly(sh.poly, p, d);
        if (A.length > 2) out.push({ poly: A, signs: sh.signs.concat([1]) });
        if (Bn.length > 2) out.push({ poly: Bn, signs: sh.signs.concat([-1]) });
      }
      S = out;
    }
    for (const sh of S) { let cx = 0, cy = 0; for (const q of sh.poly) { cx += q[0]; cy += q[1]; } sh.c = [cx / sh.poly.length, cy / sh.poly.length]; sh.id = sh.signs.reduce((a, s, i) => a + (s > 0 ? 1 << i : 0), 0); }
    return S;
  }
  // where a shard is at time t: each slash kicks the two sides of its cut apart (then they settle a little open),
  // every piece floats on its own, and after FALL they all drop (closed-form arcs), tumbling and flipping over
  function shardPose(sh, t) {
    let tx = 0, ty = 0, rot = 0;
    for (let i = 0; i < SLASH.length; i++) {
      const [ti, , a] = SLASH[i]; if (t < ti) break;
      const n = [-Math.sin(a), Math.cos(a)], s = sh.signs[i] || 0, age = t - ti;
      const gap = 66 * backOut(seg(age, 0, .16)) * (1 - .4 * ease(seg(age, .16, .7)));
      tx += n[0] * s * gap / 2; ty += n[1] * s * gap / 2; rot += s * (.012 + .022 * hash(i * 7 + 3)) * ease(seg(age, 0, .3));
    }
    const h = k => hash(sh.id * 3.17 + k), live = seg(t, B(24), B(26)), spread = seg(t, B(24), B(31)) * .035;
    tx += (sh.c[0] - 960) * spread; ty += (sh.c[1] - 540) * spread;   // the pieces drift apart as the frame breaks up
    tx += live * 6 * Math.sin(t * (1 + h(1)) + h(2) * 6); ty += live * 6 * Math.cos(t * (1.2 + h(3)) + h(4) * 6); rot += live * .008 * Math.sin(t * 1.3 + h(5) * 6);
    let flip = 1;
    const fa = t - FALL - .03 - .07 * h(6);
    if (fa > 0) {
      const dx = sh.c[0] - 960, dy = sh.c[1] - 540;
      tx += (dx * (1.1 + .9 * h(7)) + (h(8) - .5) * 360) * fa; ty += (-140 - 260 * h(9) + dy * .3) * fa + .5 * 8200 * fa * fa;
      rot += (h(10) - .5) * 10 * fa; flip = Math.cos((.9 + 2.4 * h(11)) * 3 * fa);
    }
    return { tx, ty, rot, flip };
  }
  function shardMatrix(sh, p) {   // canvas transform: rotate/flip about the shard's centre, then move it
    const [cx, cy] = sh.c, cs = Math.cos(p.rot), sn = Math.sin(p.rot), a = p.flip * cs, b = p.flip * sn, c = -sn, d = cs;
    return [a, b, c, d, cx + p.tx - (a * cx + c * cy), cy + p.ty - (b * cx + d * cy)];
  }
  const applyM = (m, q) => [m[0] * q[0] + m[2] * q[1] + m[4], m[1] * q[0] + m[3] * q[1] + m[5]];
  // composite a kept layer through each shard, moved by its own transform (face-up shards only)
  let SHARD_G = null;
  function drawShards(name, S) {
    const L = LAYERS[name]; if (!L) return;
    flushBrush();
    if (!SHARD_G) { SHARD_G = createGraphics(W, H); SHARD_G.pixelDensity(1); }
    const c = SHARD_G.drawingContext;
    c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, W, H);
    for (const s of S) {
      if (s.pose.flip <= 0) continue;
      c.save(); c.setTransform(...s.m);
      c.beginPath(); s.poly.forEach((q, i) => i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])); c.closePath(); c.clip();
      c.drawImage(L.drawingContext.canvas, 0, 0);
      c.restore();
    }
    c.setTransform(1, 0, 0, 1, 0, 0);
    screenDraw(() => image(SHARD_G, 0, 0));
  }

  // behind the paper: ink-black, chalk scratches, and eyes that open along the cracks
  function voidLayer(t) {
    boilSeed('s4 void'); paint(rectPts(-40, -40, W + 80, H + 80), { wash: '#0B0810', ink: null });
    boilSeed('s4 void haze'); paint(ellPts(960, 540, 900, 520, 24), { fill: '#241A36', fillOp: 90, bleed: .3, tex: .8, ink: null });
    for (let i = 0; i < 14; i++) {   // wet ink pooling and running in the dark
      boilSeed('s4 blot' + i);
      const x = 1920 * hash(i * 4.3 + 11), y = 1080 * hash(i * 6.1 + 12), r = 90 + 160 * hash(i * 2.2 + 13);
      paint(ellPts(x, y, r, r * .7, 14, r * .08, hash(i) * 3), { fill: i % 3 ? '#221A31' : '#2D2340', fillOp: 120, bleed: .25, tex: .8, ink: null });
    }
    for (let i = 0; i < 24; i++) {
      const x = 60 + 1800 * hash(i * 7.7 + 1), y = 50 + 980 * hash(i * 3.9 + 2), s = .6 + .8 * hash(i * 1.3 + 3), t0 = B(24) + .15 + 5.6 * hash(i * 9.1 + 4);
      const open = ease(seg(t, t0, t0 + .25)) * (1 - (Math.sin(t * .9 + i) > .96 ? 1 : 0)), look = Math.sin(t * .7 + i * 2.1) * 4 * s;
      if (open < .03) continue;
      boilSeed('s4 eye' + i);
      glow(x, y, 46 * s, i % 7 === 0 ? '#FF3B2E' : '#D8F0A0', .7 * open);
      for (const e of [-1, 1]) paint(rectPts(x + e * 13 * s - 4.5 * s + look, y - 11 * s * open, 9 * s, 22 * s * open, 1), { wash: i % 7 === 0 ? '#FF5A43' : '#F4EDC9', ink: null });
    }
    for (let i = 0; i < SLASH.length; i++) {   // eyes peering through every crack
      const [ti, p, a] = SLASH[i], d = [Math.cos(a), Math.sin(a)];
      for (let j = 0; j < 7; j++) {
        const hj = hash(i * 31 + j * 7.3), at = add(p, d, (hj - .5) * 1700), s = 1.3 + .6 * hash(i * 17 + j), t0 = ti + .1 + .45 * hash(i * 5 + j * 3.1);
        if (at[0] < -40 || at[0] > W + 40 || at[1] < -40 || at[1] > H + 40) continue;
        const open = ease(seg(t, t0, t0 + .18)) * (Math.sin(t * 1.1 + i * 3 + j) > .95 ? .1 : 1), look = Math.sin(t * .8 + i + j * 2.1) * 3 * s;
        if (open < .03) continue;
        const red = (i + j) % 6 === 0;
        boilSeed('s4 ceye' + i + '_' + j);
        glow(at[0], at[1], 46 * s, red ? '#FF3B2E' : '#D8F0A0', .95 * open);
        for (const e of [-1, 1]) { const q = add(at, d, e * 12 * s); paint(rectPts(q[0] - 4 * s + look, q[1] - 10 * s * open, 8 * s, 20 * s * open, 1), { wash: red ? '#FF5A43' : '#F4EDC9', ink: null }); }
      }
    }
    boilSeed('s4 chalk');
    for (let i = 0; i < 9; i++) chalkMark(['spiral', 'eye', 'tally', 'face', 'cross'][i % 5], 120 + 1700 * hash(i * 5.1 + 7), 90 + 900 * hash(i * 2.3 + 8), .9 + .5 * hash(i), i, PC.chalkDim);
  }

  // the camera behind the glass: from D's framing on Chester, out to the band, then easing in on the room
  const CAM4A = camOn(CH[0], CH[1], S3D.sx, S3D.sy, S3D.z * 1.03), CAM4B = { cx: 1720, cy: 600, z: .95 };
  const cam4 = t => t < B(25.4) ? camMix(CAM4A, CAM4B, ease(seg(t, B(24) + .05, B(25.4)))) : camMix(CAM4B, { cx: 1720, cy: 640, z: 1.1 }, ease(seg(t, B(25.4), B(31))));
  // Mike walks downstage to centre in bar 34 and turns to the camera: where c6 keeps him (1720, 1000), u 24
  const MX = 1720, MY = 1000, MU = 24;
  function mikeWalk(t) {
    const k = ease(seg(t, B(28.1), B(29.6))), moving = t > B(28.1) && t < B(29.6), x = lerp(LAY.mike[0], MX, k);
    return { x, y: lerp(LAY.mike[1], MY, k), u: lerp(21, MU, k), o: { walk: (x - LAY.mike[0]) / 80, view: moving ? 'side' : 'front', dy: moving ? -.4 * Math.abs(Math.sin((x - LAY.mike[0]) / 80 * Math.PI)) : 0 } };
  }
  // the band in the shards: the chorus at full power, Chester screaming, Mike hyped (and walking)
  function s4Band(t) {
    const mw = mikeWalk(t), bp = bpOf(t), letGo = seg(t, B(24), B(24) + .3);
    // Chester lets go of the crack and screams: the face acts out of D's strain (squint, take) instead of snapping
    const m = mood('chester', t, [[B(22), 'determined', { eyes: 'squeeze', mouth: 'teeth' }], [B(24) + .05, 'furious']], { take: 1.2 });
    return bandHooks(t, { style: { mike: 'hype', chester: 'scream' }, u: { front: 20 }, skip: ['mike'], over: {
      chester: { eyes: m.eyes, squint: m.squint, sq: m.sq, mouth: t < B(24) + .05 ? 'teeth' : null, lid: (.3 + .15 * Math.abs(Math.sin(bp * Math.PI))) * letGo,
        aL: lerp(0, 1.3 + .2 * Math.sin(bp * TAU), letGo), micAt: 'up', aR: lerp(0, 1.1, letGo), mic: letGo > .2 ? 'R' : false }
    }, floorAfter: () => member('mike', mw.x, mw.y, mw.u, { ...mfeel('mike', 'excited', t, { seed: 1 }), emote: null, ...singing(t, 'rap'), ...mw.o,
      aL: mw.o.view === 'side' ? .3 : .5 + .7 * Math.abs(Math.sin(bp * Math.PI)), micBob: .12 * Math.sin(bp * Math.PI) }) });
  }
  // = c6's mikePose at the top of the bridge (determined, rapping low to camera)
  function mikeEnd(t) {
    const m = mfeel('mike', 'determined', t, { seed: 1 }), bp = bpOf(t);
    return { ...m, ...singing(t, 'rap'), lookX: 0, lookY: -.25, aL: .25 + .75 * pulse(t, 4) * (1 - .4 * (beatN(t) % 2)), micBob: .1 * Math.sin(bp * Math.PI),
      sq: (m.sq || 0) + .06, dy: (m.dy || 0) * .6, emote: null, seed: 1 };
  }
  // The changed room the shards fall away from. Its options are c6's opening parlor (lamps on, cold .45, ambient .36,
  // ink .5, peel .7, the Ink in the portrait), dimmed while two Inks stand in the dark corners; a lamp flicker at
  // FALL + .64 and they're gone, the light is back, and the frame is c6's first frame.
  const CAMEND = { cx: 1720, cy: 640, z: 1.1 };
  function changedRoom(t) {
    const a = t - FALL, flick = a > .62 && a < .71 ? 1 : 0, inksOn = a < .67, dim = .22 * (1 - seg(a, .71, .74));
    camGo(CAMEND, shakeXY(t, 8 * Math.exp(-Math.max(0, a) * 5)));
    parlor(t, { lamps: 1 - .8 * flick, cold: .45, ambient: .36, dark: dim + .5 * flick, ink: .5, peel: .7, portrait: { stage: 'ink' }, drums: drumHits(t, .6),
      hooks: bandHooks(t, { skip: ['mike'], energy: .5, style: { chester: 'idle' },
        over: { chester: { ...mfeel('chester', 'nervous', t, { seed: 2 }), emote: null, mic: 'R', micAt: 'up', aR: .3 } },
        floorBefore: () => { if (inksOn) for (const [x, y, of, s] of [[918, 812, 'rob', 1], [2528, 810, 'brad', -1]])
          inkling(x, y, 17, { of, flip: s < 0, grin: 1, eyes: 'glow', eyeGlow: 1.3, lookX: .6, seed: x, drip: .8, aL: -.4, aR: -.3, dy: -.1 * Math.sin(t * 2 + x), boilKey: 'c5 corner ' + of }); },
        floorAfter: () => member('mike', MX, MY, MU, mikeEnd(t)) }) });
    camEnd();
  }

  function shot4(t, lt, dur) {
    const k = SLASH.filter(s => t >= s[0]).length, S = shardsAfter(k), falling = t >= FALL;
    for (const s of S) { s.pose = shardPose(s, t); s.m = shardMatrix(s, s.pose); s.tp = s.poly.map(q => applyM(s.m, q)); }
    const vis = S.filter(s => { let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; for (const [x, y] of s.tp) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); } return x1 > -20 && x0 < W + 20 && y1 > -20 && y0 < H + 20; });
    // paint only what can be seen: the void until the fall, the shard world while any face-up shard is on screen
    if (!falling) paintLayer(SP + 'void', () => voidLayer(t));
    if (vis.some(s => s.pose.flip > 0)) paintLayer(SP + 'shards', () => {
      camGo(cam4(t));
      parlor(t, { flicker: .3, cold: .3, peel: .45, portrait: { stage: 'bleed' }, drums: drumHits(t), hooks: s4Band(t) });
      camEnd();
    });
    if (falling) changedRoom(t);
    else showLayer(SP + 'void', [[[-10, -10], [W + 10, -10], [W + 10, H + 10], [-10, H + 10]]]);
    if (vis.length) castShadow(vis.map(s => s.tp.map(q => [q[0] + 7, q[1] + 11])), { alpha: .7, blur: 9, col: '#050308' });
    if (vis.some(s => s.pose.flip > 0)) drawShards(SP + 'shards', vis);
    // the backs of the flipped shards: plain paper, stained with ink where it soaked through
    for (const s of vis) if (s.pose.flip <= 0) { boilSeed('s4 back' + s.id); paint(s.tp, { wash: '#E7DBC2', fill: '#3A2F52', fillOp: 40, bleed: .2, tex: .7, ink: PAL.ink, sw: .8 }); }
    // the cut edges: every shard's rim is freshly cut paper, a bright lip and a dark crease
    for (const s of vis) {
      boilSeed('s4 lip' + s.id);
      const P = s.tp.concat([s.tp[0]]);
      inkLine(P, 2.6, '#FFF6E2', 'inkfine', 0);
      inkLine(P.map(q => [q[0] + (s.c[0] - q[0]) * .014, q[1] + (s.c[1] - q[1]) * .014]), .7, '#6E5040', 'inkfine', 0);
    }
    // the blade: a streak of light along each new cut, gone in a few frames
    for (const [ti, p, a] of SLASH) {
      const age = t - ti; if (age < 0 || age > .3) continue;
      const d = [Math.cos(a), Math.sin(a)], L = [add(p, d, -1500), add(p, d, 1500)], k2 = 1 - seg(age, .04, .3);
      const draw = seg(age, 0, .05), P = [L[0], lerpPt(L[0], L[1], draw)];
      glowAlong(P, 150, '#FFF1C8', .8 * k2);
      boilSeed('s4 blade' + ti); if (k2 > .3) inkLine(P, 5 * k2, '#FFF8E4', 'ink', 0);
    }
    if (t >= FALL && t < FALL + .12) flash(.55 * (1 - seg(t, FALL, FALL + .12)), '#FFF6E2');
  }

  shots([[B(0), shot1], [B(8), shot2], [B(16), shot3], [B(24), shot4]]);
})();
