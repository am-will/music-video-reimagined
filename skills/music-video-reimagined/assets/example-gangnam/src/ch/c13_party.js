// c13_party.js · barT(106) 196.545 → barT(116) 214.727 · THE FINAL DROP: the kick, the reboot, the ultimate party.
//
// SHOT PLAN. Music: the biggest drop at 196.545, the low end slams in at 196.81, two stabs at 197.17 / 197.51, then
// ten bars of full power (a tiny dropout 214.17-214.43 before the outro). Cuts on bar lines; cameras always drift.
// Everyone's routine: bar 107 vArms (the reboot cheer) · 108-109 gallop · 110-111 lasso · 112-113 gallop (the Horse's;
// the crowd parts and watches) · 114-115 lasso (everyone, the Horse included).
//
//  A  196.545-198.364  bar 106  THE KICK. [in: c12's exact last frame: black, the red overflowed counter at screen
//     (960, 540), h 160, glitching .5]. The black void, the counter is an object in it (drawn in world space; the camera
//     starts as identity so frame 1 matches). The camera eases left/back to make room as THE Horse (chestnut, spark star,
//     side view) walks in from the left, deadpan, and stops nose-to-number on the low-end slam (196.81), its face lit red.
//     It stares; one slow blink. Stab 1 (197.17): a snap turn (a squash-flip smear) puts its rear to the counter; it
//     loads up (head down, weight forward). Stab 2 (197.51): the BUCK: rump up, both hind hooves shoot back into the
//     counter's end (drawn kick legs, the hanging ones hidden) → painted KA-BOOM, a gold flash, the counter is knocked
//     and REBOOTS as 64-BIT: gold, bouncing, sparks flying; a stamped "64-BIT". The Horse lands and slides its eye to us.
//     197.95: the counter shoots up into the top-right corner and becomes the HUD; green lasers flicker on in the dark.
//     reads: .0-.27 the Horse walks up to the broken counter · .27-.62 it stares at it · .62-.96 turns its rear, loads
//            · .96-1.3 KICK → KA-BOOM → gold reboot · 1.3-1.45 64-BIT, spinning up · 1.45-1.82 it flies to the corner;
//            the Horse looks at us; lights flicker.
//  B  198.364-202.000  bars 107-108  LIGHTS ON: THE PARTY. [smash cut on the downbeat, the lights snap on] The laser hall
//     at full blast, a huge wide crowd: EVERYONE from the film (Oppa in the party look, the Pop Star, the Kid, the Rival,
//     Elevator Guy, Grannies, Grandpas, the Boss, White Dancers, commuters, the costumed crowd in the back rows) jumps
//     into the vArms cheer on the downbeat (the counter is back!), then the gallop on bar 108. THE Horse stands at the
//     right of Oppa, side view, deadpan: the only one not dancing. Slow crane/truck across the crowd.
//     reads: 0-.5 the world is back, lights and lasers · .5-1.8 everyone cheering · 1.8-3.6 the whole hall galloping.
//  C  202.000-203.818  bar 109  THE PRINCIPALS (gallop). [cut on the bar line] Medium: Oppa front and centre, the Pop
//     Star and the Kid beside him, the Rival and Elevator Guy behind, all galloping big and on the beat, lasers sweeping.
//     The Horse's deadpan head at the frame edge. Slow push.
//  D  203.818-205.636  bar 110  THE LASSO (the ensembles). [cut on the bar line, on the lasso throw] A truck across the
//     Grannies (wild), the Boss, the Grandpas, White Dancers and the crowd, lassos spinning on every beat; it comes to
//     rest on THE Horse, deadpan, lassos whirling round its head. Its eye slides to us.
//  E  205.636-207.455  bar 111  THE HANDOFF. [cut on the bar line] Two-shot: Oppa (lassoing) and the Horse. Oppa sees
//     it, stops, takes off his round tortoiseshell shades (his bare eyes, for the first time), the Horse lowers its head,
//     and he puts the shades on it. From here Oppa is bareEyes and the Horse wears the shades. It raises its head: a glint.
//     reads: 0-.4 Oppa notices · .4-.8 shades off (his eyes!) · .8-1.35 shades onto the Horse · 1.35-1.8 the glint.
//  F  207.455-209.273  bar 112  THE RISE (gallop). [cut on the downbeat] The Horse rears and rises UPRIGHT (view 'up'),
//     facing us in the shades, and on beat 1 dances the horse dance: the gallop with the reins, bigger and cooler than
//     anyone, perfectly on the beat. The crowd takes (surprised) and parts in awe; a ring forms round it.
//  G  209.273-211.091  bar 113  THE MASTER (gallop). [cut on the bar line] Wider: the ring, the crowd starstruck and
//     clapping on the beat, the Horse galloping in the middle; Oppa bows low to the master.
//  H  211.091-214.727  bars 114-115  EVERYONE LASSO. [cut on the downbeat, on the lasso throw] The Horse throws up the
//     biggest lasso of the night and the ring bursts back into the dance: everyone, the Horse included, lassoing together.
//     The camera pulls back to the wide and lands exactly on STAGE.laserHall.wide.
//     [out: continuous → c14: camera [960, 560, .72]; Oppa (party, bareEyes) at (960, 900) u 24 and the Horse upright in
//     the shades at (1250, 900) s 16, both mid-lasso.]
(() => {
  // ---------- timing ----------
  const T0 = barT(106), SLAM = 196.81, STAB1 = 197.17, STAB2 = 197.51, B107 = barT(107), B108 = barT(108), B109 = barT(109),
    B110 = barT(110), B111 = barT(111), B112 = barT(112), B113 = barT(113), B114 = barT(114), B115 = barT(115), TEND = barT(116);
  const VOID = '#120E1A';                       // the black of the void (matches c12's last frame)
  const ROUTINE = [[B107, 'vArms'], [B108, 'gallop'], [B110, 'lasso'], [B112, 'gallop'], [B114, 'lasso']];

  // ---------- the counter's geometry (mirrors counter.js's layout, for contact points and the flight to the HUD) ----------
  function counterW(t, h) {   // the panel's drawn width in px at height h (pop 0), and its inked left-edge inset
    const V = VIEWCOUNT(t), txt = (V.neg ? '-' : '') + groupDigits(V.str);
    let tw = 0; for (const ch of txt) tw += ch === ',' ? 24 : ch === '-' ? 44 : 64;
    const sc = h / 120, Wc = Math.ceil(150 + tw + 52);
    return { w: (Wc + 40) * sc, inset: 20 * sc, panel: Wc * sc };
  }
  const hudPos = t => { const V = VIEWCOUNT(t), aw = (150 + 64 * V.str.length + 24 * Math.floor((V.str.length - 1) / 3) + 52 + 40) * (64 / 120); return [W - 36 - aw / 2, 58]; };

  // =====================================================================================================================
  // A · THE KICK
  // =====================================================================================================================
  const HS = 25;                                  // the Horse in the void (its ground line HY and mark XH1 are solved below)
  const CX0 = 960, CY0 = 540, CH0 = 160;          // the counter (world), exactly as at the seam
  let HY = 830, XH1 = 58;
  const XH0 = -330;                               // the Horse walks from XH0 (off-screen) to XH1 (nose to the counter)
  const T_TURN = STAB1, T_LOAD = STAB1 + .13, T_EXT = STAB2 - .05, T_RET = STAB2 + .17, T_DOWN = STAB2 + .31;
  const T_FLY0 = 197.93, T_FLY1 = 198.29;         // the rebooted counter flies up into the HUD slot

  // cover the hanging hind legs (local horse space, px): they are replaced by the drawn kick legs while it bucks
  function hideHind(s) {
    const P = [];
    for (let i = 0; i <= 12; i++) { const x = lerp(-6.05, -2.05, i / 12), yb = x < -4 ? -9.2 + Math.sqrt(Math.max(0, 6.76 - (x + 4) * (x + 4))) : -6.6; P.push([x * s, (yb + .16) * s]); }
    P.push([-2.05 * s, 1.5 * s], [-6.05 * s, 1.5 * s]);
    paint(P, { wash: VOID, ink: null });
  }
  // the kicking hind legs, local horse space (s units, facing right before the flip). phi: the legs' angle (0 = straight
  // back, -PI/2 = hanging down), ext: length scale, smear 0..1 (the extension frame)
  const KL = [[-6.15, -9.55, 1], [-5.45, -8.55, 0]];   // hips: far, near
  const KLEN = 6.9;
  function kickLegs(s, sw, phi, ext, smear) {
    hideHind(s);
    const dx = -Math.cos(phi), dy = -Math.sin(phi), nx = -dy, ny = dx;
    for (const [hx, hy, far] of KL) {
      const c = far ? mixCol(GP.horseDk, PAL.ink, .2) : GP.horse, L = KLEN * ext, w0 = .72, w1 = .56;
      const ex = hx + dx * L, ey = hy + dy * L;
      if (smear > .05) {   // dry-brush sweep from the hanging position (the extension frame)
        for (let k = 0; k < 4; k++) {
          const P = []; for (let i = 0; i <= 8; i++) { const a = lerp(-Math.PI / 2, phi, i / 8), r = L * (.55 + k * .15); P.push([(hx - Math.cos(a) * r) * s, (hy - Math.sin(a) * r) * s]); }
          inkLine(P, sw * (2.2 - k * .4) * smear, mixCol(c, PAL.cream, .15 * k), 'dry', .6);
        }
      }
      boilSeed('kickleg' + far);
      paint(_Pp(s, [[hx + nx * w0, hy + ny * w0], [ex + nx * w1, ey + ny * w1], [ex - nx * w1, ey - ny * w1], [hx - nx * w0, hy - ny * w0]]),
        { wash: c, fill: GP.horseDk, fillOp: 40, ink: PAL.ink, sw: sw * .7 });
      const fx = ex + dx * .95, fy = ey + dy * .95, hw = .78;   // the hoof, its sole facing out along the leg
      paint(_Pp(s, [[ex + nx * hw, ey + ny * hw], [fx + nx * hw, fy + ny * hw], [fx - nx * hw, fy - ny * hw], [ex - nx * hw, ey - ny * hw]]), { wash: GP.hoof, ink: PAL.ink, sw: sw * .6 });
    }
  }
  // the Horse's performance in the void, as a pure function of t
  function kickPose(t) {
    const o = { x: XH0, flip: false, sx: 1, a: 0, walk: null, headDown: 0, bob: 0, legs: null, look: null, sq: 0, blink: 1.18 };
    if (t < SLAM) {   // the brisk walk in
      const k = seg(t, T0 + .04, SLAM), x = lerp(XH0, XH1, 1 - Math.pow(1 - k, 1.5));
      o.x = x; o.walk = (x - XH0) / (6.4 * HS) + .08; o.bob = -.12 * Math.abs(Math.sin(o.walk * TAU));
    } else o.x = XH1;
    const st = spring(t, SLAM, 7, 20);                       // the planted stop: the head nods on, the body settles
    o.headDown = .06 + .22 * Math.max(0, st); o.sq = .05 * Math.exp(-(t - SLAM) * 9) * (t > SLAM ? 1 : 0);
    // the snap turn on stab 1: a crouch, then one smear frame whips it round, and it lands facing the other way
    if (t >= T_TURN - .1) {
      o.flip = t >= T_TURN - .005;
      o.sq += t < T_TURN ? .1 * ease(seg(t, T_TURN - .1, T_TURN - .01)) : .1 * Math.exp(-(t - T_TURN) * 9) * Math.cos((t - T_TURN) * 22);
      o.sx = t < T_TURN ? 1 : 1 + .16 * Math.exp(-(t - T_TURN) * 12);
      o.smear = t >= T_TURN - .005 && t < T_TURN + .075 ? 1 - seg(t, T_TURN, T_TURN + .075) : 0;
    }
    // the load (head down, rump dips) → the buck on stab 2 → the landing
    if (t >= T_LOAD) {
      const ld = ease(seg(t, T_LOAD, T_EXT));
      o.headDown = lerp(o.headDown, .82, ld); o.a = .05 * ld; o.sq += .05 * ld;
    }
    if (t >= T_EXT) {
      const ex = seg(t, T_EXT, STAB2), ret = ease(seg(t, T_RET, T_DOWN));
      o.a = t < STAB2 ? lerp(.05, -.34, easeOut(ex)) : lerp(-.34, 0, ret) - .03 * spring(t, STAB2, 8, 30);
      o.legs = t < T_DOWN ? { phi: t < STAB2 ? lerp(-Math.PI / 2, -.18, easeOut(ex)) : lerp(-.18, -Math.PI / 2, ret), ext: t < STAB2 ? lerp(.93, 1.05, ex) : lerp(1.05, .93, ret), smear: t < STAB2 && ex > .05 ? .9 : (t < STAB2 + .05 ? .5 : 0) } : null;
      o.sq = t < STAB2 ? lerp(o.sq, -.06, ex) : (t < T_DOWN ? -.04 : .12 * Math.exp(-(t - T_DOWN) * 9));
      o.headDown = t < T_DOWN ? .82 : lerp(.82, .1, ease(seg(t, T_DOWN, T_DOWN + .3)));
    }
    if (t > 197.98) o.look = 'camera';                      // after the reboot: the eye slides to us
    return o;
  }
  // the whip-round: dry-brush streaks across the body and a scuff of dust at the hooves (world space)
  function turnSmear(t, o) {
    const k = o.smear || 0; if (k <= .02) return;
    for (let i = 0; i < 4; i++) {   // a few streaks of coat across the body
      const y = HY - (8 + 7.5 * i / 3) * HS, h1 = hash(i * 4.1), x0 = o.x - (7 + 3 * h1) * HS, x1 = o.x + (7 + 3 * hash(i * 2.7)) * HS;
      boilSeed('tsm' + i); inkLine([[x0, y + 8 * h1], [(x0 + x1) / 2, y - 5], [x1, y + 6 * hash(i)]], (1.3 + .8 * h1) * k, i % 2 ? GP.horse : GP.horseLt, 'dry', .5);
    }
    for (const [r, a0, a1, w] of [[10.5, -2.7, -.5, 1.4], [8.5, .35, 2.6, 1.1]]) {   // whip arcs round it
      const P = []; for (let i = 0; i <= 12; i++) { const a = lerp(a0, a1, i / 12); P.push([o.x + Math.cos(a) * r * HS, HY - 10 * HS + Math.sin(a) * r * .55 * HS]); }
      boilSeed('tarc' + r); inkLine(P, w * k * 1.6, PAL.cream, 'dry', .6); inkLine(P, w * k * .6, PAL.cream, 'ink', .6);
    }
    for (let i = 0; i < 4; i++) { boilSeed('tdust' + i); const r = (26 + 18 * hash(i * 3)) * (1.5 - .5 * k); paint(ellPts(o.x + (i - 1.5) * 105, HY - 10 - 16 * hash(i), r * 1.6, r, 12), { fill: '#5E5064', fillOp: 70 * k, bleed: .2, tex: .4, ink: null }); }
  }
  const hPivot = (o) => [o.x + (o.flip ? -1 : 1) * 3.75 * HS, HY];       // the front hooves: the buck pivots here
  function hToWorld(o, lx, ly) {
    const f = o.flip ? -1 : 1, P = hPivot(o), x = o.x + f * lx * HS * o.sx, y = HY + ly * HS;
    const c = Math.cos(o.a), si = Math.sin(o.a), dx = x - P[0], dy = y - P[1];
    return [P[0] + dx * c - dy * si, P[1] + dx * si + dy * c];
  }
  // solve the Horse's ground line and mark from the kick itself: its hind hooves must land on the counter's left end,
  // at the counter's middle height
  {
    const probe = { x: 0, flip: true, sx: 1, a: -.34 }, L = KLEN * 1.05 + .95;
    const hx = KL[1][0] - Math.cos(-.18) * L, hy = KL[1][1] - Math.sin(-.18) * L;
    HY = 0; const f0 = hToWorld(probe, hx, hy);
    const edge = CX0 - (1330.7 / 2) + 26.7;                 // the red panel's inked left edge (see counterW)
    XH1 = Math.round(edge - f0[0] - 6); HY = Math.round(CY0 + 22 - f0[1]);
  }
  function drawKickHorse(t, o) {
    const P = hPivot(o);
    push(); translate(P[0], P[1]); rotate(o.a); translate(-P[0], -P[1]);
    translate(o.x, HY); scale(o.sx, 1); translate(-o.x, -HY);
    horse(o.x, HY, HS, t, { flip: o.flip, walk: o.walk ?? undefined, headDown: o.headDown, dy: o.bob, sq: o.sq, look: o.look, blink: o.blink,
      boilKey: 'THEhorse', draw: o.legs ? (s, sw) => kickLegs(s, sw, o.legs.phi, o.legs.ext, o.legs.smear) : undefined });
    pop();
  }
  // where the counter is (world), and how it looks
  function counterState(t) {
    const hit = t >= STAB2, age = t - STAB2;
    const tc = hit ? t : T_BOOT - .001;                     // before the kick it stays broken (red); the kick reboots it
    const knock = hit ? 58 * (1 - Math.exp(-age * 11)) - 18 * ease(seg(t, STAB2 + .25, T_FLY0)) : 0;
    const rot = hit ? .11 * Math.exp(-age * 5) * Math.cos(age * 17) : .012 * Math.sin(t * 3.1);
    const pop = hit ? Math.max(0, 1.2 * Math.exp(-age * 6) * Math.cos(age * 21)) + .25 * pulse(t, 7) * seg(t, STAB2 + .2, STAB2 + .3) : 0;
    const glitch = hit ? (age < .045 ? .95 : 0) : Math.max(.12 + .08 * Math.sin(t * 40), .5 * Math.exp(-(t - T0) * 7), .42 * Math.exp(-Math.max(0, t - SLAM) * 14) * (t >= SLAM ? 1 : 0), .5 * Math.exp(-Math.max(0, t - T_TURN) * 12) * (t >= T_TURN ? 1 : 0), hash(Math.floor(t * 24) * 3.7) < .12 ? .38 : 0);
    const alpha = hit ? 1 : (hash(Math.floor(t * 24) * 1.9) < .1 ? .55 : 1);
    return { tc, x: CX0 + knock, y: CY0 - (hit ? 10 * Math.exp(-age * 4) : 0), h: CH0, rot, pop, glitch, alpha, gold: hit ? 1 : 0 };
  }
  function shotKick(t, lt, dur) {
    const o = kickPose(t), C = counterState(t);
    // camera: from the seam's identity framing, ease left/back to make room for the Horse; a punch on the kick
    const kc = ease(seg(t, T0 + .04, T0 + .45)), hitA = t >= STAB2 ? Math.exp(-(t - STAB2) * 6) : 0;
    const sh = t >= STAB2 ? shakeXY(t, 16 * Math.exp(-(t - STAB2) * 7)) : t >= SLAM ? shakeXY(t, 5 * Math.exp(-(t - SLAM) * 12)) : [0, 0];
    const cx = lerp(960, 610, kc) - 16 * seg(t, T0 + .42, B107) + sh[0], cy = lerp(540, 585, kc) + sh[1];
    const z = lerp(1, 1.04, kc) + .025 * ease(seg(t, T0 + .42, STAB2)) + .05 * hitA;
    camBegin(cx, cy, z);
    boilSeed('void'); paint(rectPts(cx - 2000, cy - 1400, 4000, 2800), { wash: VOID, ink: null });
    // a dim pool of the counter's light on the floor, right of the Horse
    boilSeed('pool'); paint(ellPts(C.x + 60, HY + 30, 820, 70, 26), { fill: C.gold ? '#6A4A18' : '#5A1424', fillOp: 55 * ease(seg(t, T0, T0 + .25)), bleed: .25, tex: .4, ink: null });
    // the counter (world space). Gold after the kick: a gold plate behind the panel, a halo
    const cw = counterW(C.tc, C.h), flying = t >= T_FLY0;
    if (!flying) {
      if (C.gold) { boilSeed('goldplate'); const pw = cw.panel * (1 + .25 * C.pop) + 34, ph = C.h * (1 + .25 * C.pop) + 34; push(); translate(C.x, C.y); rotate(C.rot); paint(rrPts(-pw / 2, -ph / 2 + 4, pw, ph, 36, 2), { wash: '#E8B53A', fill: '#B8801E', fillOp: 90, tex: .5, ink: PAL.ink, sw: 1.4 }); pop(); }
      viewCounter(C.tc, { x: C.x, y: C.y, h: C.h, world: true, rot: C.rot, pop: C.pop, glitch: C.glitch, alpha: C.alpha });
    } else if (C.glitch) GLITCH = Math.max(GLITCH, C.glitch);
    drawKickHorse(t, o);
    turnSmear(t, o);
    // light: the counter's glow over everything (red, then gold), the floor pool, the Horse's face lit on its near side
    const lampK = ease(seg(t, T0, T0 + .25));             // the red light fades up from c12's bare frame
    if (!flying) glow(C.x, C.y, 760, C.gold ? '#FFC23A' : '#FF3040', C.gold ? .55 + .6 * Math.exp(-(t - STAB2) * 4) : lampK * (.38 + .12 * Math.sin(t * 23)));
    // the kick: impact burst at the hooves, sparks, KA-BOOM
    if (t >= STAB2 - .01) kickFX(t, o, C);
    if (!flying) { const cw2 = counterW(C.tc, C.h); }
    camEnd();
    if (flying) flyCounter(t, C);
    if (t >= 198.12) voidLasers(t);
    if (t >= STAB2 && t < STAB2 + .09) flash(1 - (t - STAB2) / .09, '#FFF3D0');
  }
  function kickFX(t, o, C) {
    const age = t - STAB2, hoof = hToWorld({ ...o, a: -.34, flip: true, sx: 1 }, KL[1][0] - Math.cos(-.18) * (KLEN * 1.05 + .95), KL[1][1] - Math.sin(-.18) * (KLEN * 1.05 + .95));
    // the impact star
    if (age < .22) {
      const k = backOut(seg(age, 0, .07)) * (1 - seg(age, .14, .22)), r = 150 * k;
      boilSeed('impact'); paint(starPts(hoof[0] + 10, hoof[1], r, .42, 9, age * 3), { wash: '#FFF1C8', ink: PAL.ink, sw: 1.6 });
      boilSeed('impact2'); paint(starPts(hoof[0] + 10, hoof[1], r * .55, .5, 7, -age * 4), { wash: '#FFC94A', ink: null });
    }
    // sparks flying out on arcs
    for (let i = 0; i < 16; i++) {
      const h1 = hash(i * 3.3 + 1), h2 = hash(i * 7.1 + 2), a0 = -Math.PI * (.05 + .9 * h1), life = .45 + .35 * h2, k = seg(age, .02, .02 + life);
      if (k <= 0 || k >= 1) continue;
      const d = 180 + 360 * h2, p1 = [hoof[0] + Math.cos(a0) * d + 120, hoof[1] + Math.sin(a0) * d * .6 + 160], p = arcPt(hoof, p1, 120 + 140 * h1, easeOut(k));
      boilSeed('spark' + i); paint(starPts(p[0], p[1], (14 + 16 * h1) * (1 - k * .7), .3, 4, i), { wash: i % 3 ? '#FFD65A' : '#FFF4D8', ink: null });
      glow(p[0], p[1], 40, '#FFC23A', .8 * (1 - k));
    }
    // KA-BOOM (a painted sound effect), and the 64-BIT stamp once it has rebooted
    sfx('KA-BOOM!', hoof[0] + 150, hoof[1] - 190, 130, '#FFD65A', age, { life: .62, rot: -.14, stroke: PAL.ink });
    const sa = t - (STAB2 + .2);
    if (sa > 0 && t < T_FLY0 + .05) letter('64-BIT', C.x - 70, C.y + 190, 104, '#F2C94A', { pop: sa * 4.5, rot: -.07, stroke: PAL.ink, alpha: 1 - seg(t, T_FLY0 - .04, T_FLY0 + .05) });
  }
  // the rebooted counter swoops from its place in the void up into the top-right corner, where it becomes the HUD
  function flyCounter(t, C) {
    const k = seg(t, T_FLY0, T_FLY1), e = ease(k), T1 = hudPos(t);
    const s0 = toScreen(C.x, C.y, LAST_CAM), h0 = C.h * LAST_CAM.zoom;
    const p = arcPt(s0, T1, 180, e), h = lerp(h0, 64, Math.pow(e, .8)), land = t > T_FLY1 ? spring(t, T_FLY1, 7, 24) : 0;
    if (k < 1) glow(p[0], p[1], 260 * (1 - e) + 90, '#FFC23A', .7);
    viewCounter(t, { x: p[0], y: p[1], h, rot: .25 * Math.sin(k * Math.PI), pop: Math.max(0, land) * .9 });
  }
  // the party lasers flicker on in the dark (the power is back)
  function voidLasers(t) {
    const k = seg(t, 198.12, B107);
    for (let s = 0; s < 3; s++) {
      if (hash(Math.floor(t * 24) * 1.7 + s * 5) > .35 + k * .6) continue;
      const sx = [220, 1000, 1720][s], sy = 1080 + 40, bp = (t - OFF) / BEAT;
      for (let r = 0; r < 4; r++) {
        const ang = -Math.PI / 2 + Math.sin(bp * Math.PI / 4 + s * 1.3) * .8 + (r - 1.5) * .17;
        boilSeed('vl' + s + r); inkLine([[sx, sy], [sx + Math.cos(ang) * 1500, sy + Math.sin(ang) * 1500]], 1.3, GP.laser, 'inkfine', 0);
      }
      glow(sx, sy - 30, 110, GP.laser, .7);
    }
  }

  // =====================================================================================================================
  // THE PARTY: one crowd layout in the laser hall (world), used by every party shot
  // =====================================================================================================================
  const OPPA = [960, 900, 24], HORSE_UP = [1250, 900, 16];      // the seam marks (c14)
  const HSIDE = [1318, 903, 16];                                  // THE Horse, side view, before it rises
  const CROWD = [];
  const add = (name, v, x, y, u, o = {}) => CROWD.push({ name, v, x, y, u, i: CROWD.length, ...o });
  // two club tiers at the back (dancers on raised steps, drawn in the set's back hook), a floor row, the principal line,
  // and big dancers in the foreground corners
  const TIER = [700, 752];                                       // the tiers' top edges (the dancers' feet)
  for (let k = 0; k < 8; k++) add(k % 3 === 1 ? 'dancer' : 'crowd', k % 3 === 1 ? k + 4 : k, -420 + k * 400 + 60 * (hash(k * 1.3) - .5), TIER[0], 9.5, { far: 2, tier: 0 });
  for (let k = 0; k < 7; k++) add(k % 3 === 0 ? 'commuter' : 'crowd', k % 3 === 0 ? k : k + 13, -230 + k * 410 + 50 * (hash(k * 3.7) - .5), TIER[1], 11.5, { far: 1, tier: 1 });
  [['dancer', 0], ['grandpa', 0], ['commuter', 2], ['dancer', 1], ['grandpa', 1], ['granny', 1]]
    .forEach(([n, v], k) => add(n, v, -120 + k * 420 + 40 * (hash(k * 5.1) - .5), 832 + 6 * hash(k * 6.7), 15.5, { far: 1 }));
  add('elev', 0, 318, 908, 22); add('pop', 0, 745, 906, 22); add('oppa', 0, OPPA[0], OPPA[1], OPPA[2]);
  add('rival', 0, 1655, 906, 23); add('boss', 0, 1895, 912, 24); add('kid', 0, 548, 940, 13);
  add('granny', 2, 1545, 868, 17); add('dancer', 5, 1790, 864, 17);
  add('granny', 0, -150, 1075, 31, { fg: 1 }); add('dancer', 4, 2080, 1080, 31, { fg: 1 });
  const FACE = { oppa: 'happy', kid: 'determined', rival: 'determined', elev: 'excited', pop: 'happy', granny: 'excited', boss: 'happy', grandpa: 'happy', dancer: 'happy', commuter: 'happy', crowd: 'happy' };
  // a dancer's face over the routine: the reboot cheer (excited), then each one's own mood; acted changes (squint-swap)
  function crowdFace(m, t) {
    const own = FACE[m.name] || 'happy', f = mood(m.name, t, [[B107 - 1, 'excited'], [B108, own]], { v: m.v, seed: m.i });
    return { eyes: f.eyes, mouth: f.mouth, squint: f.squint, blush: f.blush };
  }
  // draw a crowd member at time t with its routine; opts: extra per-member fields
  function drawMember(m, t, o = {}) {
    const cv = crowdVar(m.i * 3 + 1), look = m.name === 'oppa' ? { look: 'party' } : {};
    const keys = o.keys || ROUTINE, face = o.face || crowdFace(m, t);
    dancer(m.name, (o.x ?? m.x), (o.y ?? m.y), m.u, keys, t, { v: m.v, ph: cv.ph, amp: cv.amp, side: o.side ?? cv.side, e: cv.e * (o.e ?? 1),
      ...look, ...face, noShadow: !!m.far, boilKey: 'm' + m.i, ...(o.over || {}) });
  }
  // the laser colour per bar: green, then cyan, green, magenta...
  const laserCol = t => [GP.laser, GP.neonB, GP.laser, GP.neonP][((barOf(t) % 4) + 4) % 4];

  // =====================================================================================================================
  // B · LIGHTS ON: THE PARTY (bars 107-108)
  // =====================================================================================================================
  // the club tiers: dark steps with neon edges, and their dancers (inside the set's back hook)
  function tiers(t, drawDancers = true) {
    const [a, , c] = viewRect2(200), bp = (t - OFF) / BEAT;
    for (let r = 0; r < 2; r++) {
      const y = TIER[r], y1 = r ? FLOOR - 20 : TIER[1];
      boilSeed('tierface' + r); paint(rectPts(a - 100, y, c - a + 200, y1 - y + 2), { wash: r ? '#0C1828' : '#0A1422', ink: null });
      for (let x = Math.floor(a / 500) * 500; x < c; x += 500) { boilSeed('tieredge' + r + x); inkLine([[x - 4, y + 1], [x + 504, y + 1]], 1.6, mixCol(GP.neonB, '#FFFFFF', .2), 'inkfine', 0); }
      glow((a + c) / 2, y + 6, (c - a) * .38, GP.neonB, .22 + .12 * pulse(t, 5));
      if (drawDancers) for (const m of CROWD) if (m.tier === r && vis(m.x - 120, m.x + 120)) drawMember(m, t);
    }
  }
  const floorCrowd = (t, skip = () => false) => { for (const m of CROWD) if (m.tier == null && !m.fg && !skip(m)) drawMember(m, t); };
  const fgCrowd = (t, skip = () => false) => { for (const m of CROWD) if (m.fg && !skip(m) && vis(m.x - 300, m.x + 300)) drawMember(m, t); };
  const sideHorse = (t, o = {}) => horse(HSIDE[0], HSIDE[1], HSIDE[2], t, { flip: true, mood: 'deadpan', blink: 2.3, boilKey: 'THEhorse', ...o });

  // =====================================================================================================================
  // B · LIGHTS ON: THE PARTY (bars 107-108)
  // =====================================================================================================================
  function shotParty(t, lt, dur) {
    const k1 = easeOut(seg(t, B107, B107 + .7)), k2 = ease(seg(t, B107 + .7, B109));
    const cx = 960 + 50 * k2, cy = lerp(700, 690, k1) + 40 * k2, z = lerp(.9, .8, k1) + .1 * k2;
    camBegin(cx, cy, z);
    laserHall(t, { lasers: 1, col: laserCol(t), hooks: { back: () => tiers(t), mid: () => { floorCrowd(t); sideHorse(t); }, front: () => fgCrowd(t) } });
    camEnd();
    confetti(t, B107, { n: 36, spread: .8, cols: [GP.neonG, GP.neonB, GP.neonP, '#FFE27A', PAL.cream] });
    counterHUD(t, { pop: Math.max(0, spring(t, T_FLY1, 7, 24)) * .9 });
    if (t < B107 + .2) flash(.55 * (1 - seg(t, B107, B107 + .2)), '#E8FFFF');
  }

  // party lights: coloured spots sweeping over the crowd on the beat (additive, after the crowd)
  function partyLights(t, xs, y, r = 420) {
    const bp = (t - OFF) / BEAT;
    xs.forEach((x, i) => glow(x + 260 * Math.sin(bp * Math.PI / 4 + i * 2.1), y + 60 * Math.cos(bp * Math.PI / 4 + i), r, [GP.neonP, GP.neonB, GP.neonG][i % 3], .22 + .18 * pulse(t, 4)));
  }

  // =====================================================================================================================
  // C · THE PRINCIPALS (bar 109, gallop)
  // =====================================================================================================================
  function shotPrincipals(t, lt, dur) {
    const k = ease(seg(t, B109, B110));
    camBegin(lerp(790, 830, k), lerp(655, 650, k), lerp(1.4, 1.52, k));
    laserHall(t, { lasers: 1, col: laserCol(t), hooks: { back: () => tiers(t), mid: () => { floorCrowd(t, m => m.x > 1700 || m.x < 60); sideHorse(t); } } });
    partyLights(t, [600, 1100], 800, 380);
    camEnd();
    counterHUD(t);
  }

  // =====================================================================================================================
  // D · THE LASSO (bar 110): the ensembles round THE Horse, lassos whirling; it comes to rest on the Horse's stare
  // =====================================================================================================================
  function shotLasso(t, lt, dur) {
    const k = ease(seg(t, B110, B111 - .3));
    camBegin(lerp(1850, 1370, k), lerp(650, 640, k), lerp(1.28, 1.58, k));
    const look = t > beatT(110, 2.6) ? 'camera' : undefined;
    laserHall(t, { lasers: 1, col: laserCol(t), hooks: { back: () => tiers(t), mid: () => { floorCrowd(t, m => m.x < 700); sideHorse(t, { look, blink: 1.7 }); } } });
    partyLights(t, [1300, 1900], 800, 400);
    camEnd();
    counterHUD(t);
  }

  // =====================================================================================================================
  // E · THE HANDOFF (bar 111): Oppa takes off his shades and puts them on THE Horse
  // =====================================================================================================================
  // contact geometry, from the shared rigs (clawd.js arms, cast.js horse head): Oppa's right fist and the Horse's eye
  function horseLensW(X, Y, s, hd) {   // the side-view Horse (facing left): where its shades' lens sits, world
    const ha = lerp(-.95, .35, hd), nt = [3.6 + Math.cos(ha) * 6.2 * .55 + 1.6, -11.4 + Math.sin(ha) * 6.2], r = lerp(.62, 1.25, hd);
    const lx = nt[0] + 1.8 * Math.cos(r) + .5 * Math.sin(r), ly = nt[1] + 1.8 * Math.sin(r) - .5 * Math.cos(r);
    return [X - lx * s, Y + ly * s];
  }
  function oppaFistW(x, y, u, a, L, dy = 0) {   // Oppa, front view, his right (screen-right) arm straight at angle a
    const px = 4.9 + .55 * clamp((Math.abs(a) - .7) / .9), AL = 2.2 * L;
    return [x + 1.12 * (px + AL * Math.cos(a) + .1 * Math.cos(a)) * u, y + dy * u + .94 * (-4.5 - AL * Math.sin(a) - .1 * Math.sin(a)) * u];
  }
  const E_REACH = [1.05, 1.35], E_HD = .7, E_CONTACT = beatT(111, 2.55);   // the reach pose, the head dip, the moment
  const E_LENS = horseLensW(HSIDE[0], HSIDE[1], HSIDE[2], E_HD), E_FIST0 = oppaFistW(0, OPPA[1], OPPA[2], E_REACH[0], E_REACH[1], -.15);
  const E_X = E_LENS[0] - E_FIST0[0];                        // where Oppa stands so his fist meets the Horse's eye
  const SHADES_K = .58;                                      // his shades, held in the hand (drawn smaller: in hand)
  // his shades as a prop (world space, drawn over the Horse): centred at (x, y), level, k = size
  function shadesProp(x, y, u, k, sw) {
    push(); translate(x, y + 6.05 * u * k); boilSeed('heldshades'); roundShades(u * k, sw * .8, { sides: [-1, 1] }, 'tort'); pop();
  }
  // Oppa's performance through the handoff: returns member() options, his x, and where the shades are (or null)
  const E1 = beatT(111, .5), E2 = beatT(111, 1.0), E3 = beatT(111, 1.35), E4 = beatT(111, 1.75), E5 = beatT(111, 3.7);
  function oppaHandoff(t) {
    const u = OPPA[2], hand = CAST.oppa.hand, lass = t < E1 ? dance('lasso', t, { hand, sleeve: GP.white }) : null;
    const face = mood('oppa', t, [[B111 - 2, 'happy'], [E1 - .1, 'thinking'], [E3, 'hopeful'], [E_CONTACT + .12, 'starstruck']], {});
    const o = { look: 'party', eyes: face.eyes, mouth: face.mouth, squint: face.squint, blush: face.blush, bareEyes: t >= E3, boilKey: 'oppa' };
    let x = OPPA[0], held = null;
    if (lass) return { x, o: { ...o, ...lass }, held };
    const lean = ease(seg(t, E1, E1 + .2)) * (1 - ease(seg(t, E_CONTACT + .15, E5)));
    Object.assign(o, { rot: .05 * lean, lookX: .8, dy: face.dy * .3 });
    if (t < E2) {   // the lasso arm comes down and the hand goes to the shades (the strut's hand-to-shades)
      const k = ease(seg(t, E1, E2));
      Object.assign(o, { aR: lerp(1.4, 1.0, k), armR: bentHook(lerp(-.4, -2.05, k), 2.35, GP.white, hand), aL: lerp(Math.PI + .36, -.5, k), armLen: { R: lerp(1.15, .8, k), L: lerp(2.4, 1, k) }, frontArm: 'R' });
    } else if (t < E3) {   // a beat at the shades (a little adjust: the showman's last pose)
      Object.assign(o, { aR: 1.0, armLen: { R: .8, L: 1 }, armR: bentHook(-2.05 + .07 * Math.sin((t - E2) * 34), 2.35, GP.white, hand), aL: -.5, frontArm: 'R' });
    } else if (t < E_CONTACT + .06) {   // OFF: swung out at his side, a beat to see his eyes, then offered up to the Horse
      const k0 = easeOut(seg(t, E3, E3 + .1)), k = ease(seg(t, E4, E_CONTACT));
      const a = lerp(lerp(1.0, -.15, k0), E_REACH[0], k), L = lerp(lerp(.8, 1.2, k0), E_REACH[1], k);
      x = lerp(OPPA[0], E_X, ease(seg(t, E4, E_CONTACT - .05)));
      const dy = -.15 * k;
      Object.assign(o, { aR: a, armLen: { R: L, L: 1 }, armR: fistHook(hand), aL: -.45, dy: dy + face.dy * .2, frontArm: 'R' });
      if (t < E_CONTACT) { const f = oppaFistW(x, OPPA[1], u, a, L, dy + face.dy * .2); held = { x: f[0], y: f[1], k: lerp(.8, SHADES_K, k0) }; }
    } else {   // on: his arm comes down, a step back, hands together, starstruck
      const k = ease(seg(t, E_CONTACT + .06, E_CONTACT + .4));
      x = lerp(E_X, OPPA[0] - 25, ease(seg(t, E_CONTACT + .15, E5)));
      Object.assign(o, { aR: lerp(E_REACH[0], -.95, k), aL: lerp(-.45, -.95, k), armLen: { R: lerp(E_REACH[1], 1, k), L: 1 }, armR: fistHook(hand), armL: fistHook(hand), dy: face.dy * .4 });
    }
    return { x, o, held };
  }
  // the Horse through the handoff: its eye on us, then on Oppa; the head dips to meet the shades, then rises, cool
  function horseHandoff(t) {
    const down = ease(seg(t, E4, E_CONTACT)), up = ease(seg(t, E_CONTACT + .1, E5));
    return { headDown: E_HD * down * (1 - up), shades: t >= E_CONTACT, mood: t >= E_CONTACT ? 'smug' : 'deadpan', look: t < E1 + .1 ? 'camera' : undefined, blink: 1.7 };
  }
  function shotHandoff(t, lt, dur) {
    const k = ease(seg(t, B111, B112));
    camBegin(lerp(1060, 1085, k), lerp(735, 725, k), lerp(1.78, 1.95, k));
    const O = oppaHandoff(t), Hh = horseHandoff(t);
    laserHall(t, { lasers: 1, col: laserCol(t), hooks: { back: () => tiers(t), mid: () => {
      floorCrowd(t, m => m.name === 'oppa' || m.x < 500 || m.x > 1700 || (m.x > 1000 && m.x < 1300 && m.y < 880));
      member('oppa', O.x, OPPA[1], OPPA[2], O.o);             // Oppa stands just behind the Horse's head
      sideHorse(t, Hh);
      if (O.held) shadesProp(O.held.x, O.held.y, OPPA[2], O.held.k, clamp(OPPA[2] / 15, .45, 2.4));
    } } });
    // the glint as the shades go on, and again as it lifts its head
    for (const [t0, r] of [[E_CONTACT, 46], [E5 - .06, 38]]) {
      const ga = t - t0;
      if (ga > 0 && ga < .45) { const L = horseLensW(HSIDE[0], HSIDE[1], HSIDE[2], Hh.headDown); boilSeed('glint' + r); paint(starPts(L[0] - 8, L[1] - 6, r * Math.sin(Math.PI * seg(ga, 0, .45)), .18, 4, .3), { wash: PAL.cream, ink: null }); glow(L[0], L[1], 90, '#FFF2C8', .9 * (1 - ga / .45)); }
    }
    camEnd();
    roomLight(.3, [[1080, 760, 560, 1]]);
    counterHUD(t);
  }

  // =====================================================================================================================
  // THE MASTER: the Horse rises upright and dances (F, G, H share this)
  // =====================================================================================================================
  const R0 = B112, R1 = B112 + .13, R2 = B112 + .2;         // rear up (side view) → the pop into the upright view → landed
  const HXUP0 = 1372;                                        // where it lands upright (over its hind hooves)
  const horseX = t => t < R1 ? HSIDE[0] : lerp(HXUP0, HORSE_UP[0], ease(seg(t, B113 + BEAT * 2, B115)));
  // the ring: the crowd near the Horse backs away (x only; the flat stage), then flows back for the lasso
  const partK = t => ease(seg(t, R2 + .15, B113)) * (1 - ease(seg(t, B114, B114 + BAR * .75)));
  function ringX(m, t) {
    const p = partK(t); if (p <= 0 || m.tier != null || m.fg || m.name === 'oppa') return m.x;
    const hx = horseX(t), d = m.x - hx, R = 300 + 3 * m.u;
    if (Math.abs(d) >= R) return m.x + Math.sign(d) * 60 * p * Math.max(0, 1 - (Math.abs(d) - R) / 400);
    return m.x + (Math.sign(d || 1) * R - d) * p;
  }
  // the ring's faces: a take when it rises, then starstruck
  const awe = (m, t) => { const f = mood(m.name, t, [[B111, FACE[m.name] || 'happy'], [R1 + .06 + .04 * hash(m.i), 'surprised'], [R2 + .55 + .1 * hash(m.i * 2), 'starstruck']], { v: m.v, seed: m.i }); return { eyes: f.eyes, mouth: f.mouth, squint: f.squint, blush: f.blush }; };
  // clapping on the beat (the ring): hands meet at the chest on each beat
  function clapPose(t, ph = 0) {
    const f = frac((t - OFF) / BEAT + ph), c = Math.exp(-f * 7), open = Math.sin(Math.PI * clamp(f * 1.4));
    return { aL: Math.PI - .12 - .2 * open, aR: Math.PI - .12 - .2 * open, armLen: 2.36 - .7 * open, frontArm: 'LR', dy: -.25 * c, sq: .05 * c, legSplay: .4 };
  }
  // the Horse, as a pure function of t from the handoff on: side (cool) → rearing → UPRIGHT, dancing
  function drawMaster(t, o = {}) {
    const hx = horseX(t), hy = HORSE_UP[1], s = HORSE_UP[2];
    if (t < R1) {   // rearing on its hind legs (side view, pivoting on the hind hooves), shades on
      const a = .95 * easeOut(seg(t, R0, R1)), P = [HSIDE[0] + 3.95 * s, HSIDE[1]];
      push(); translate(P[0], P[1]); rotate(a); translate(-P[0], -P[1]);
      horse(HSIDE[0], HSIDE[1], s, t, { flip: true, shades: true, mood: 'smug', headDown: 0, sq: -.06 * seg(t, R0, R1), boilKey: 'THEhorse' });
      pop();
      return;
    }
    // upright: land with a squash, then THE HORSE DANCE, bigger than anyone (amp, energy, a bigger lasso loop)
    const land = t - R1, sq = .2 * Math.exp(-land * 10) * Math.cos(land * 26);
    const keys = [[R1, 'gallop'], [B114, 'lasso'], [B115, 'lasso']];
    const pose = routine(t, keys, { hand: GP.hoof, amp: 1.32, e: 1.15, blend: .1 });
    const lassoing = t >= B114 - .02;
    if (lassoing) { const bp = (t - OFF) / BEAT, up = 1.42 + .12 * Math.sin(bp * TAU); pose.aR = up; pose.armR = lassoHook('R', up, bp % 1, 1.55, PAL.ink, GP.hoof); pose.frontArm = 'L'; pose.armLen = { R: 1.2, L: 2.4 }; }
    horse(hx, hy, s, t, { view: 'up', shades: true, mood: lassoing ? 'joy' : 'deadpan', ...pose, sq: (pose.sq || 0) + sq, dy: (pose.dy || 0) * 1.25, boilKey: 'THEhorse', ...o });
    // the pop: a puff of dust and sparkle as it goes upright
    if (land < .35) {
      const k = seg(land, 0, .35);
      for (let i = 0; i < 7; i++) { const a = -Math.PI * (i + .5) / 7, r = (60 + 90 * k) * (1 + .3 * hash(i)); boilSeed('updust' + i); paint(ellPts(hx + Math.cos(a) * r * 1.4, hy - 8 + Math.sin(a) * r * .35, 30 * (1 - k * .6), 22 * (1 - k * .6), 10), { fill: '#C8D8E0', fillOp: 120 * (1 - k), bleed: .2, tex: .4, ink: null }); }
      speedLines(hx, hy - 11 * s, 7 * s, 13 * s, 12, PAL.cream, 9, 1.4 * (1 - k));
    }
  }
  // the crowd around the master (floor rows and principals), parted into a ring; Oppa handled by the caller
  function ringCrowd(t, o = {}) {
    for (const m of CROWD) {
      if (m.tier != null || m.fg || m.name === 'oppa' || (o.skip && o.skip(m))) continue;
      const x = ringX(m, t), watching = t >= R1 && t < B114, near = Math.abs(m.x - HXUP0) < 900;
      if (watching && near) {
        const side = x < horseX(t) ? 1 : -1, face = awe(m, t), cp = clapPose(t, (hash(m.i * 1.7) - .5) * .12);
        const back = partK(t) > .02 && partK(t) < .98 ? { walk: (t - OFF) / BEAT } : {};
        member(m.name, x, m.y, m.u, { v: m.v, ...face, ...(t > R2 + .6 ? cp : dance('groove', t, { hand: CAST[m.name].hand })), ...back, view: 'front', lookX: side * .7, noShadow: !!m.far, boilKey: 'm' + m.i });
      } else drawMember(m, t, { x });
    }
  }

  // =====================================================================================================================
  // F · THE RISE (bar 112)
  // =====================================================================================================================
  function shotRise(t, lt, dur) {
    const k = easeOut(seg(t, B112, B113));
    camBegin(lerp(1330, 1300, k), lerp(700, 715, k), lerp(1.34, 1.14, k));
    const oppaX = lerp(OPPA[0] - 25, OPPA[0] - 70, ease(seg(t, R2, R2 + .8)));
    const of = mood('oppa', t, [[B111, 'starstruck'], [R1 + .05, 'surprised'], [R2 + .6, 'starstruck']], {});
    laserHall(t, { lasers: 1, col: laserCol(t), hooks: { back: () => tiers(t), mid: () => {
      ringCrowd(t, { skip: m => m.x < 400 });
      member('oppa', oppaX, OPPA[1], OPPA[2], { look: 'party', bareEyes: true, eyes: of.eyes, mouth: of.mouth, squint: of.squint, blush: of.blush, ...(t > R2 + .6 ? clapPose(t) : { aL: -.9 + .8 * seg(t, R1, R1 + .2), aR: -.9 + .8 * seg(t, R1, R1 + .2) }), dy: of.dy * .5, sq: of.sq * .5, boilKey: 'oppa' });
      drawMaster(t);
    } } });
    glow(horseX(t), 560, 520, '#FFF2C8', .35 + .3 * Math.exp(-Math.max(0, t - R1) * 3));   // a spotlight finds it
    camEnd();
    counterHUD(t);
  }

  // =====================================================================================================================
  // G · THE MASTER (bar 113): the ring claps on the beat round the galloping Horse; Oppa bows low to it
  // =====================================================================================================================
  // Oppa's bow: a step toward the Horse, then the whole block tips forward from the feet (a Clawd has no waist), the
  // near arm folded across the belly, the far arm swept out behind; up again on beat 3, then he claps along
  function oppaBow(t) {
    const g0 = B113, b0 = g0 + .42, st = ease(seg(t, g0 + .05, g0 + .4)), dn = ease(seg(t, b0, g0 + .66)), up = ease(seg(t, beatT(113, 2.9), beatT(113, 3.35)));
    const k = dn * (1 - up), x = lerp(OPPA[0] - 70, OPPA[0] - 10, st);
    const o = { look: 'party', bareEyes: true, blush: .5, boilKey: 'oppa' };
    if (t < b0) return { x, o: { ...o, view: st > .5 ? 'q' : 'front', eyes: 'spark', mouth: 'open', ...clapPose(t), walk: st > 0 && st < 1 ? (t - OFF) / BEAT : undefined } };
    if (up >= 1) return { x, o: { ...o, view: 'q', eyes: 'happy', mouth: 'grin', ...clapPose(t, .03) } };
    const c = clapPose(b0), kk = up > 0 ? 1 : dn;            // arms: from the clap into the bow (and they stay folded coming up)
    return { x, o: { ...o, view: 'q', eyes: k > .3 ? 'closed' : 'spark', mouth: 'smile', rot: .38 * k, dy: .25 * k, sq: .05 * k,
      aR: lerp(c.aR, Math.PI + .55, kk), armLen: { R: lerp(c.armLen, 1.5, kk), L: lerp(c.armLen, 1.15, kk) }, frontArm: kk > .5 ? 'R' : 'LR', aL: lerp(c.aL, .15, kk), legLift: [0, .35 * k, 0, 0] } };
  }
  function shotMaster(t, lt, dur) {
    const k = ease(seg(t, B113, B114));                      // continuous with F: its camera eases on, back and down
    camBegin(lerp(1300, 1225, k), lerp(715, 772, k), lerp(1.14, 1.04, k));
    const O = oppaBow(t);
    laserHall(t, { lasers: 1, col: laserCol(t), hooks: { back: () => tiers(t), mid: () => {
      ringCrowd(t);
      member('oppa', O.x, OPPA[1], OPPA[2], O.o);
      drawMaster(t);
    } } });
    glow(horseX(t), 560, 520, '#FFF2C8', .35 + .3 * Math.exp(-Math.max(0, t - R1) * 3));   // the spotlight stays on it
    camEnd();
    counterHUD(t);
  }

  // =====================================================================================================================
  // H · EVERYONE LASSO (bars 114-115): the Horse throws the biggest lasso of the night, the whole party lassos with it,
  // and the camera pulls back onto c14's opening frame. The layout, poses, boil keys and camera here are c14's own
  // (its outro tableau before the final boom), so the seam at 214.727 is frame-identical.
  // =====================================================================================================================
  const P14 = [
    ['crowd', -150, 832, 11, 'v', { v: 1 }], ['crowd', 330, 830, 11, 'l', { v: 4 }], ['dancer', 590, 834, 11, 'v', { v: 1 }],
    ['crowd', 1650, 832, 11, 'v', { v: 7 }], ['commuter', 1930, 830, 11, 'v', { v: 4 }], ['dancer', 2300, 834, 11, 'v', { v: 3 }],
    ['granny', 170, 842, 14, 'v', { v: 0 }], ['grandpa', 2070, 842, 14, 'v', {}],
    ['elev', 440, 850, 16, 'v', {}], ['boss', 1800, 850, 17, 'l', {}],
    ['pop', 700, 862, 18, 'l', { side: -1 }], ['rival', 1510, 862, 18, 'v', {}],
    ['kid', 790, 972, 13, 'v', {}]
  ];
  function p14Member(t, p, i) {
    const [name, x, y, u, , ex] = p, q = memberOpts(name, ex), cv = crowdVar(i + 3);
    const pose = dance('lasso', t, { ph: cv.ph, e: cv.e, side: ex.side ?? 1, hand: q._hand, sleeve: q._sleeve, sway: (hash(i * 4.1) - .5) * .12 });
    member(name, x, y, u, { ...ex, ...pose, eyes: 'happy', mouth: 'smile', noShadow: u < 15, boilKey: 'party' + i });
  }
  function party14(t) {
    P14.forEach((p, i) => { if (p[2] < 900) p14Member(t, p, i); });
    const oq = memberOpts('oppa', { look: 'party', bareEyes: true }), op = dance('lasso', t, { hand: oq._hand, sleeve: oq._sleeve, ph: 0 });
    member('oppa', 960, 900, 24, { look: 'party', bareEyes: true, ...op, dy: op.dy || 0, sq: op.sq || 0, eyes: 'happy', mouth: 'grin', blush: .4, boilKey: 'oppa' });
    const hp = dance('lasso', t, { hand: GP.hoof, ph: .05, e: 1.45 });
    horse(HORSE_UP[0], HORSE_UP[1], HORSE_UP[2], t, { view: 'up', shades: true, mood: 'deadpan', ...hp, boilKey: 'c14 party horse' });
    P14.forEach((p, i) => { if (p[2] >= 900) p14Member(t, p, i); });
  }
  const H_PULL = [B114 + BEAT * 1.5, TEND - BEAT * .9];            // the pull-back, after a beat and a half on the throw
  function shotEveryone(t, lt, dur) {
    const k = seg(t, H_PULL[0], H_PULL[1]), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    const punch = t < H_PULL[0] ? .05 * Math.exp(-(t - B114) * 5) : 0;
    camBegin(lerp(1205, 960, e), lerp(690, 560, e), lerp(1.42, .72, e) * (1 + punch));
    laserHall(t, { lasers: 1, hooks: { mid: () => party14(t) } });
    // the throw: a ring of sparks bursts off the Horse's loop on the downbeat, and a flare of speed lines
    const age = t - B114;
    if (age < .5) {
      const cx = HORSE_UP[0] + 30, cy = HORSE_UP[1] - 26.5 * HORSE_UP[2], q = seg(age, 0, .5);
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * TAU + .3, r = (120 + 260 * easeOut(q)) * (1 + .25 * hash(i * 2.3));
        boilSeed('throwspark' + i); paint(starPts(cx + Math.cos(a) * r * 1.3, cy + Math.sin(a) * r * .55, 22 * (1 - q), .3, 4, i), { wash: i % 3 ? '#FFE27A' : PAL.cream, ink: null });
      }
      glow(cx, cy, 420, '#FFF2C8', .6 * (1 - q));
      speedLines(cx, cy, 180, 420, 14, PAL.cream, 13, 1.4 * (1 - q));
    }
    camEnd();
    counterHUD(t);
  }

  shots([[T0, shotKick], [B107, shotParty], [B109, shotPrincipals], [B110, shotLasso], [B111, shotHandoff], [B112, shotRise], [B113, shotMaster], [B114, shotEveryone]]);
})();
