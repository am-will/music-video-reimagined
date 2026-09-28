// c9_ending.js: the Ending, "the shadows are awake" (HIT.silence 185.95 to PROJECT.duration 192.4), in SILENCE.
//
// SHOT PLAN: one continuous, quiet shot. c8 ends on a mid-air freeze; the audio cuts; SMASH CUT to stillness (the jump
// from noise to calm is the transition). It rhymes with the opening: there a lamp flickered on and a dolly ran right,
// introducing the band one by one; here the camera runs right again and introduces their SHADOWS, and a lamp clicks off.
// The reads escalate toward the viewer: the shadows play among themselves (they don't know we're here) -> the portrait's
// eyes follow us (it knows) -> Chester's shadow looks straight at us and shushes (it addresses us).
//
//   time           read                                                            camera
//   185.95-186.65  THE CALM. The parlor, warm lamplight, dead still. The band lies  WIDE (1735,560,.82), barely moving
//                  where it dropped, in its intro places: Joe slumped over the
//                  decks by the little table lamp, Rob hunched at the kit, Brad and
//                  Phoenix sagging together on the couch, Chester perched on its
//                  right arm under lampB, Mike leaning in the right doorway. Eyes
//                  shut, one slow breath a bar. The Ink sits in the portrait's ruff,
//                  eyes shut to two thin glints. Shadows on the wall: normal.
//   186.65-187.6   (the eye settles) a slow push in on the drums and the couch     push to (1674,492,1.3)
//   187.45-188.8   THE SHADOWS ARE AWAKE. Rob's shadow (up the wall right of the     held, the faintest drift
//                  kit) opens glowing eyes, looks left, right, grins; winds up and
//                  elbows Brad's shadow across lampA's pole (188.19). Brad's shadow
//                  tips over, pops awake with a take, looks round at Rob's, grins.
//                  Below them Rob and Brad sleep on: the band doesn't notice.
//   188.8-189.6    Both shadows look right; the eye follows to the PORTRAIT: the    the pan eases right (188.6-190.15)
//                  Ink's eyes snap open (188.88) and slide to follow the camera as  past the portrait and pushes in
//                  it pans past, like the portrait in the opening dolly.
//   189.62-190.17  CHESTER'S SHADOW (between the portrait and lampB) opens its eyes, it lands on Chester's shadow,
//                  grins, and cocks its head down at Chester (asleep on the arm).    (2252,452,1.84)
//   190.17-190.6   SHH. It snaps round to look straight at us (a small take, eyes    settled; a slow push begins
//                  wide), then a nub rises from its shoulder and presses on its
//                  grinning lips (190.39-190.6).
//   190.6-191.55   Hold the shh (~1 s). 190.93: the paper dragonfly flutters in     tilts up with the dragonfly
//                  from the left, over the shadow's head, and settles on lampB's
//                  shade (191.33).
//   191.55         CLICK: the lamp dies, the room goes black. Only the shadow's      (2280,402,2.06)
//                  glowing eyes remain, looking at us (0.4 s)...
//   191.95-192.05  ...then they blink shut, lids closing from the top.
//   192.05-192.4   Black to the end.
(() => {
  const S0 = HIT.silence, S1 = PROJECT.duration, at = d => S0 + d;

  // ---------------- timing (video times) ----------------
  const K = {
    push0: at(.7), push1: at(1.65),      // the camera leaves the WIDE and pushes in on the drums and the couch
    rbWake: at(1.5), rbLook: at(1.72), rbGrin: at(1.93),   // Rob's shadow opens its eyes, looks about, grins
    elbow0: at(2.12), elbow: at(2.24),   // it winds up and elbows Brad's shadow (across the lamp pole)
    brWake: at(2.28), brLook: at(2.52),  // Brad's shadow pops awake, looks round at Rob's
    bothR: at(2.85),                     // both look right: the pan follows their look
    portOpen: at(2.93),                  // ...to the portrait, where the Ink's eyes snap open and follow the camera past
    pan0: at(2.65), pan1: at(4.2),       // the pan runs right past the portrait (its eyes follow the camera) to Chester
    chWake: at(3.67), chDown: at(3.92),  // Chester's shadow wakes, looks down at Chester, asleep
    turn: at(4.22), shh: at(4.44),       // it turns to look straight at us; the nub rises to its lips
    fly0: at(4.98), fly1: at(5.38),      // the dragonfly flutters in and settles on the lamp
    click: at(5.6),                      // click: the lamp dies, the room goes dark
    shut: at(6.0)                        // the eyes blink shut: black to the end
  };

  // ---------------- camera: cubic Hermite through keys [t, value, slope/s] (smooth position and speed) ----------------
  function herm(t, Q) {
    if (t <= Q[0][0]) return Q[0][1] + Q[0][2] * (t - Q[0][0]);
    for (let i = 1; i < Q.length; i++) if (t < Q[i][0]) {
      const [t0, v0, m0] = Q[i - 1], [t1, v1, m1] = Q[i], h = t1 - t0, s = (t - t0) / h, s2 = s * s, s3 = s2 * s;
      return (2 * s3 - 3 * s2 + 1) * v0 + (s3 - 2 * s2 + s) * h * m0 + (-2 * s3 + 3 * s2) * v1 + (s3 - s2) * h * m1;
    }
    const q = Q[Q.length - 1]; return q[1] + q[2] * (t - q[0]);
  }
  const CX = [[S0, 1735, -1], [K.push0, 1733, -10], [K.push1, 1674, -6], [at(2.15), 1668, 6], [K.pan0, 1688, 75], [at(3.45), 1930, 380], [K.pan1, 2252, 45], [S1, 2282, 6]];
  const CY = [[S0, 560, 0], [K.push0, 559, -10], [K.push1, 492, -8], [K.pan0, 487, -6], [K.pan1, 452, -12], [K.fly0, 446, -30], [K.fly1, 410, -45], [K.click, 402, -15], [S1, 396, -2]];
  const CZ = [[S0, .82, .01], [K.push0, .83, .08], [K.push1, 1.3, .08], [K.pan0, 1.34, .08], [at(3.45), 1.5, .3], [K.pan1, 1.84, .15], [S1, 2.14, .06]];
  const camAt = t => [herm(t, CX), herm(t, CY), herm(t, CZ)];

  // ---------------- where everyone rests ----------------
  // Each member's mark, size, and how the lamps throw their shadow up the wallpaper (so = wallShadow options).
  const SEAT = u => LAY.seatY + 2 * u + 4;
  const L = {
    joe: { x: LAY.joe[0], y: LAY.joe[1], u: 16, so: { k: 1.35, dx: 150, wallY: 640, alpha: .5 } },
    rob: { x: LAY.rob[0], y: LAY.rob[1], u: 16, so: { k: 1.3, dx: 130, wallY: 640, alpha: .56 } },        // up the wall right of the kit
    brad: { x: 1690, y: SEAT(15), u: 15, so: { k: 1.3, dx: -25, wallY: 590, alpha: .56 } },               // between lampA and the portrait
    phoenix: { x: 1860, y: SEAT(15), u: 15, so: { k: 1.1, dx: 30, wallY: 590, alpha: .5 } },              // mostly behind the portrait
    chester: { x: 2292, y: 626 + 2.2 * 16 * 1.07, u: 16, so: { k: 1.4, dx: -52, wallY: 575, alpha: .56 } },  // between the portrait and lampB
    mike: { x: 2865, y: 832, u: 19, so: { k: 1.3, dx: 175, wallY: 792, alpha: .5 } }                      // across the door
  };

  // ---------------- the band, spent: eyes shut, one slow breath a bar, each on its own phase ----------------
  function bandPoses(t) {
    const b = ph => Math.sin((t - S0) / BAR * TAU + ph);
    return {
      joe: { eyes: 'closed', mouth: 'o', noLegs: true, noShadow: true, dy: .85 + .05 * b(.3), sq: .1 + .03 * b(.3), rot: .1, aL: -.2, aR: -.05 },
      rob: { eyes: 'closed', mouth: null, noLegs: true, noShadow: true, dy: .45 + .05 * b(1.7), sq: .12 + .03 * b(1.7), rot: -.07, aL: -1.05, aR: -1.15, armL: stickHook(-.4), armR: stickHook(-.2) },
      brad: { eyes: 'closed', mouth: 'smile', inst: false, sq: .1 + .03 * b(2.6), rot: .12, dy: .1, aL: -1.1, aR: -1.2 },
      phoenix: { eyes: 'closed', mouth: 'smile', inst: false, sq: .09 + .03 * b(4.1), rot: -.11, dy: .1, aL: -1.2, aR: -1.05 },
      chester: { eyes: 'closed', mouth: 'smile', noShadow: true, inst: false, mic: false, sq: .06 + .03 * b(.9), rot: -.12, aL: -1.15, aR: -1.3, walk: .25 },
      mike: { eyes: 'closed', mouth: null, rot: -.1, aL: -1.2, aR: -1.05, micAt: 'up', sq: .02 * b(3.3) }
    };
  }

  // ---------------- the shadows ----------------
  // A point on a member's SHADOW: body coords (front view, in u) -> the wall. Mirrors silPolys' transform, then shadowMap.
  function shadowFrame(name, q, pose) {
    const M = BAND[name], sq = pose.sq || 0, V = VIEWS[pose.view] || VIEWS.front, u = q.u;
    const fx = (pose.flip ? -1 : 1) * (pose.sx ?? 1) * M.sx * (1 + sq * .6), fy = (pose.sy ?? 1) * M.sy * (1 - sq);
    const bx = q.x + (pose.dx || 0) * u, by = q.y + (pose.dy || 0) * u, c = Math.cos(pose.rot || 0), s = Math.sin(pose.rot || 0);
    const map = shadowMap(q.x, q.y, q.so);
    const P = (px, py) => { const X = px * u * fx, Y = py * u * fy; return map([bx + X * c - Y * s, by + X * s + Y * c]); };
    return { P, V };
  }
  const rectB = (cx, cy, w, h) => [[cx - w / 2, cy - h / 2], [cx, cy - h / 2], [cx + w / 2, cy - h / 2], [cx + w / 2, cy], [cx + w / 2, cy + h / 2], [cx, cy + h / 2], [cx - w / 2, cy + h / 2], [cx - w / 2, cy]];
  function capsuleB(a, b, r, n = 7) {   // a stadium from a to b, radius r (the nub)
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), P = [];
    for (let i = 0; i <= n; i++) { const t = ang + Math.PI / 2 + i / n * Math.PI; P.push([a[0] + Math.cos(t) * r, a[1] + Math.sin(t) * r]); }
    for (let i = 0; i <= n; i++) { const t = ang - Math.PI / 2 + i / n * Math.PI; P.push([b[0] + Math.cos(t) * r, b[1] + Math.sin(t) * r]); }
    return P;
  }
  // A shadow's awake features. f = { open 0..1, lid 0..1 (closing from the top), lookX, lookY, tall, grin 0..1,
  // nub 0..1, glowK }. Pass 'mouth' paints on the wall (it goes dark with the room); pass 'eyes' shines: it is drawn
  // after the room lighting, so the eyes are what's left when the lamp goes out.
  function shadowFace(name, q, pose, f, pass) {
    const { P, V } = shadowFrame(name, q, pose), F = V.face; if (!F) return;
    const fxX = x => F.cx + x * F.fw, B = pts => pts.map(([x, y]) => P(x, y));
    if (pass === 'mouth') {
      const g = clamp(f.grin || 0);
      if (g > .03) {
        boilSeed('c9 grin ' + name);
        const gw = (.6 + 1.8 * g) * F.fw, mx = fxX(F.mx || 0), N = 12, top = [], bot = [], zz = [];
        for (let i = 0; i <= N; i++) {
          const k = i / N, x = mx - gw + 2 * gw * k, c = 1 - Math.pow(2 * k - 1, 2);
          top.push([x, -4.75 + .35 * c]); bot.push([x, -4.75 + (.5 + 1.0 * g) * c]); zz.push([x, -4.75 + (i % 2 ? .95 : .45) * c * (.55 + .45 * g)]);
        }
        paint(B(top.concat(bot.slice().reverse())), { wash: '#F1E8C8', washOp: 235, ink: null });
        if (g > .45) inkLine(B(zz), .8, '#5A4458', 'inkfine', 0);
      }
      const n = clamp(f.nub || 0);
      if (n > .02) {   // the shh: a nub rises from below to press on the lips (a second, denser layer of shadow)
        // it swings upright as it rises, ending as a finger held vertically across the lips
        const e = easeOut(n), mx = fxX(.1), tip = [lerp(3.0, mx, e), lerp(-1.9, -5.6, e)], base = [lerp(3.9, mx + .3, e), lerp(-1.3, -1.8, e)];
        castShadow([toScreenPts(B(capsuleB(base, tip, .62)))], { alpha: .78, blur: 1.5 });
      }
    } else {
      const o = clamp(f.open || 0), lid = clamp(f.lid || 0); if (o <= .01 || lid >= .99) return;
      boilSeed('c9 eyes ' + name);
      for (const s of F.sides) {
        const ex = fxX(s * 2.5 + (f.lookX || 0) * .55), ey = -6 + (f.lookY || 0) * .45, h0 = 2.1 * (f.tall || 1) * o;
        const h = h0 * (1 - lid), cy = ey + h0 * lid / 2;   // a lid closes from the top
        const c = P(ex, cy), a = P(ex + .5 * F.fw, ey), b = P(ex - .5 * F.fw, ey), w = Math.hypot(a[0] - b[0], a[1] - b[1]);
        glow(c[0], c[1], w * 2.7, '#D8F0A0', .78 * (f.glowK ?? 1) * Math.min(1, o * 1.5) * (1 - lid * .6));
        if (h > .12) {
          paint(B(rectB(ex, cy, F.fw, h)), { wash: '#F4EDC9', ink: null });
          if (h > .5) paint(B(rectB(ex - .06 * F.fw, cy - .12 * h, .34 * F.fw, .6 * h)), { wash: '#FFFFF0', washOp: 230, ink: null });
        } else inkLine(B([[ex - .5 * F.fw, cy], [ex + .5 * F.fw, cy]]), 1, '#F4EDC9', 'inkfine', 0);
      }
    }
  }

  // eyes that pop open with a little overshoot; quick blinks; eased looks between held directions
  const opening = (t, t0, d = .14) => t < t0 ? 0 : backOut(seg(t, t0, t0 + d));
  const blinkAt = (t, tb, d = .12) => { const k = seg(t, tb, tb + d); return k > 0 && k < 1 ? 1 - Math.sin(k * Math.PI) : 1; };
  const looks = (t, keys, d = .09) => {   // keys: [[t, value], ...] held, with a quick eased move into each
    let v = keys[0][1];
    for (let i = 1; i < keys.length; i++) if (t >= keys[i][0]) v = lerp(keys[i - 1][1], keys[i][1], ease(seg(t, keys[i][0], keys[i][0] + d)));
    return v;
  };

  function shadowStates(t, P) {
    const S = {};
    // Rob's shadow: wakes first, looks about, grins, and elbows Brad's shadow awake
    {
      const p = { ...P.rob }, up = ease(seg(t, K.rbWake, K.rbWake + .3));
      p.sq = lerp(p.sq, -.02, up) + .05 * spring(t, K.rbWake, 7, 20);
      p.dy = lerp(p.dy, .12, up); p.rot = lerp(p.rot, 0, up);
      const wind = ease(seg(t, K.elbow0, K.elbow)), jab = easeOut(seg(t, K.elbow, K.elbow + .07)), back = ease(seg(t, K.elbow + .18, K.elbow + .5));
      p.rot += -.1 * wind * (1 - jab) + .2 * jab * (1 - back) + .04 * spring(t, K.elbow + .18, 6, 14);
      p.dx = (p.dx || 0) - .25 * wind * (1 - jab) + .55 * jab * (1 - back);
      p.aR = lerp(lerp(p.aR, -.6, up), .25, Math.max(wind * .3, jab * (1 - back)));
      p.aL = lerp(p.aL, -.8, up);
      const lookX = looks(t, [[0, 0], [K.rbLook, -1], [K.rbLook + .22, 1], [K.bothR, 1.2]]);
      S.rob = { pose: p, awake: up, face: { open: opening(t, K.rbWake) * blinkAt(t, K.brLook + .2), lookX, lookY: looks(t, [[0, 0], [K.rbLook, -.2], [K.rbLook + .22, .2], [K.bothR, 0]]),
        grin: ease(seg(t, K.rbGrin, K.rbGrin + .15)) * .55 } };
    }
    // Brad's shadow: asleep until elbowed; it tips over, its eyes pop open (a take), it looks round at Rob's, then grins
    {
      const p = { ...P.brad }, knock = t >= K.elbow ? spring(t, K.elbow + .03, 4.5, 13) : 0;
      const tk = take(t, K.brWake, 1.1), up = ease(seg(t, K.brWake, K.brWake + .3));
      p.rot = lerp(p.rot, 0, up) + .32 * knock;
      p.dx = (p.dx || 0) + .45 * knock;
      p.sq = lerp(p.sq, -.03, up) + tk.sq; p.dy = (p.dy || 0) + tk.dy * .6;
      p.aL = lerp(p.aL, .4, ease(seg(t, K.brWake, K.brWake + .12)) * (1 - ease(seg(t, K.brLook, K.brLook + .3))));   // arms fly up in the take
      p.aR = lerp(p.aR, .5, ease(seg(t, K.brWake, K.brWake + .12)) * (1 - ease(seg(t, K.brLook, K.brLook + .3))));
      const lookX = looks(t, [[0, 0], [K.brLook, -1.1], [K.bothR + .06, 1.2]]);
      S.brad = { pose: p, awake: up, face: { open: opening(t, K.brWake, .08), tall: lerp(1.3, 1, ease(seg(t, K.brLook, K.brLook + .2))), lookX,
        grin: ease(seg(t, K.brLook + .14, K.brLook + .3)) * .55 } };
    }
    // Chester's shadow: wakes, checks Chester is asleep, turns to look straight at us, and raises a nub to its lips
    {
      const p = { ...P.chester }, up = ease(seg(t, K.chWake, K.chWake + .3));
      p.sq = lerp(p.sq, -.03, up) + .05 * spring(t, K.chWake, 7, 20); p.rot = lerp(p.rot, .03, up);
      const front = t < K.chDown || t >= K.turn + .06;
      if (!front) p.view = 'q';
      const tk = take(t, K.turn + .08, .55); p.sq += tk.sq; p.dy = (p.dy || 0) + tk.dy * .4;
      p.rot += .08 * ease(seg(t, K.chDown, K.chDown + .12)) * (1 - ease(seg(t, K.turn, K.turn + .1)));   // head cocked down at Chester
      p.rot += -.05 * ease(seg(t, K.shh, K.shh + .2)) + .02 * spring(t, K.shh + .2, 6, 12);
      p.aR = lerp(p.aR, 2.95, ease(seg(t, K.shh, K.shh + .12)));   // the hanging arm is the one that rises (the nub), so fold it in
      const lookX = looks(t, [[0, 0], [K.chDown, .9], [K.turn + .06, 0]]), lookY = looks(t, [[0, 0], [K.chDown, 1], [K.turn + .06, 0]]);
      const lid = ease(seg(t, K.shut, K.shut + .1));
      S.chester = { pose: p, awake: up, face: { open: opening(t, K.chWake), lid, lookX, lookY, tall: lerp(1, 1.12, ease(seg(t, K.turn + .06, K.turn + .2))),
        grin: ease(seg(t, K.chWake + .1, K.chWake + .28)) * lerp(.5, .75, ease(seg(t, K.turn, K.turn + .2))), nub: ease(seg(t, K.shh, K.shh + .2)), glowK: t >= K.click ? 1.35 : 1 } };
    }
    for (const m of ['joe', 'phoenix', 'mike']) S[m] = { pose: P[m], awake: 0, face: null };
    return S;
  }

  // ---------------- the portrait: the Ink sits in the ruff collar; its eyes follow the camera ----------------
  // portrait() doesn't pass lookX to the 'ink' sitter, so we repaint its canvas and seat the same Ink (inkling, same
  // boil key, same ruff) with its eyes free to move.
  function portraitSitter(lookX, lookY, squint) {
    push(); translate(LAY.portrait[0], LAY.portrait[1]);
    boilSeed('portrait canvas');
    paint(rectPts(-112, -152, 224, 304), { wash: '#1E1A28', fill: '#2A2140', fillOp: 120, bleed: 0, tex: .9, border: .8, ink: PAL.ink, sw: .5 });
    inkling(0, 118, 15, { noLegs: true, noShadow: true, aL: -1.2, aR: -1.2, seed: 5, boilKey: 'portrait sitter', drip: 0, lookX, lookY, squint,
      draw: (u, sw) => {   // the ruff collar, as portrait() paints it for the Ink
        const R = []; for (let i = 0; i < 24; i++) { const a = Math.PI * (i / 23); R.push([Math.cos(a) * 6 * u, -2.2 * u + Math.sin(a) * 1.7 * u * (i % 2 ? .7 : 1)]); }
        paint(R.concat([[-6 * u, -2.2 * u]]), { wash: '#3A2F52', ink: PAL.ink, sw: sw * .5 });
        for (let i = 0; i < 8; i++) { const a = Math.PI * (i / 7 * .9 + .05); inkLine([[0, -2.2 * u], [Math.cos(a) * 5.4 * u, -2.2 * u + Math.sin(a) * 1.4 * u]], sw * .3, '#9A9384', 'inkfine', 0); }
      } });
    pop();
  }
  // its eyes track the camera (a little late), like the portrait in the opening dolly
  // shut to two thin glints until the shadows look its way; then its eyes pop open and track the camera (a little late)
  const portraitLook = t => [clamp((herm(t - .1, CX) - 1860) / 80, -2.2, 2.2), .2, t < K.portOpen ? .8 : .8 * (1 - ease(seg(t, K.portOpen, K.portOpen + .12)))];

  // ---------------- the dragonfly: flutters in from the left and settles on the lampshade beside Chester ----------------
  const PERCH = [2338, 223];
  function dragonflyAt(t) {
    if (t < K.fly0) return null;
    const k = seg(t, K.fly0, K.fly1), e = ease(k);
    const p0 = [1770, 345], p1 = [2130, 215], p2 = PERCH;   // a quadratic arc: in from the left, over the shadow's head, down onto the rim
    let x = lerp(lerp(p0[0], p1[0], e), lerp(p1[0], p2[0], e), e), y = lerp(lerp(p0[1], p1[1], e), lerp(p1[1], p2[1], e), e);
    x += 9 * Math.sin(t * 11) * (1 - k); y += 10 * Math.sin(t * 15 + 1) * (1 - k);
    const land = t >= K.fly1 ? spring(t, K.fly1, 9, 24) : 0;
    y += 5 * land;
    const rot = k < 1 ? lerp(.15, Math.PI, ease(seg(k, .6, 1))) + .15 * Math.sin(t * 9) * (1 - k) : Math.PI + .08 * land;
    const flap = k < 1 ? lerp(1, .6, k) : .3 * Math.exp(-(t - K.fly1) * 7) + .03;
    return { x, y, rot, flap };
  }

  // ---------------- the shot ----------------
  function shot(t, lt, dur) {
    const [cx, cy, z] = camAt(t), P = bandPoses(t), S = shadowStates(t, P), on = t < K.click;
    const [plx, ply, psq] = portraitLook(t);
    const shade = (m, s) => ({ ...L[m].so, alpha: L[m].so.alpha + .2 * (s.awake || 0) });   // a shadow thickens toward ink as it wakes
    camBegin(cx, cy, z);
    parlor(t, {
      lamps: on ? 1 : 0, ambient: .42, dark: on ? 0 : 1, spin: 0, arm: [0, 0], drums: {},
      portrait: { stage: 'ink' },
      hooks: {
        wall: () => wallShadow('phoenix', L.phoenix.x, L.phoenix.y, L.phoenix.u, S.phoenix.pose, L.phoenix.so),   // tucked behind the portrait
        behind: () => {   // after the lamps' glow, so the shadows stay dark
          portraitSitter(plx, ply, psq);
          for (const m of ['joe', 'mike', 'rob', 'brad', 'chester']) {
            const q = L[m], s = S[m];
            wallShadow(m, q.x, q.y, q.u, s.pose, shade(m, s));
            if (s.face) shadowFace(m, q, s.pose, s.face, 'mouth');
          }
        },
        couch: () => { seated('brad', L.brad.x, 15, P.brad); seated('phoenix', L.phoenix.x, 15, P.phoenix); },
        joe: () => { member('chester', L.chester.x, L.chester.y, 16, P.chester); member('joe', L.joe.x, L.joe.y, 16, P.joe); },   // Chester sits ON the couch arm
        rob: () => member('rob', L.rob.x, L.rob.y, 16, P.rob),
        floor: () => {
          member('mike', L.mike.x, L.mike.y, 19, P.mike);
          const d = dragonflyAt(t); if (d) dragonfly(d.x, d.y, 1.1, t, { rot: d.rot, flap: d.flap });
        },
        lit: () => { for (const m of ['rob', 'brad', 'chester']) { const q = L[m], s = S[m]; if (s.face) shadowFace(m, q, s.pose, s.face, 'eyes'); } }
      }
    });
    camEnd();
  }
  shots([[S0, shot]]);
})();
