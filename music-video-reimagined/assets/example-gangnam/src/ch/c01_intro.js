// c01_intro.js · 0 → barT(7) = 16.545 · THE COLD OPEN AND THE INTRO (midsummer daylight, the playground)
//
// SHOT PLAN. Video times. The grid: bar -1 = 2.000, bar 0 = 3.818, bar 1 = 5.636, bar 2 = 7.455, bar 3 = 9.273 (the beat
// drops), bar 4 = 11.091, bar 5 = 12.909, bar 6 = 14.727, bar 7 = 16.545 (the seam). Measured from the audio: the first sound
// is the vocal pickup at 2.285; the chant's hits land at 2.285 · 3.19 3.65 · 5.01 5.47 · 6.83 7.28 · 8.43 8.65 8.88 9.10;
// the stop has two true gaps (15.24–15.33, 15.59–15.67) with the stabs' onsets at 15.345 and 15.685.
//
// A  0.00–2.00  THE BANNER PLANE (silence).  [in: an iris opens on the plane]
//      A little red propeller plane crosses a bright midsummer sky right-to-left towing a fluttering painted banner, CLAWDNAM
//      STYLE (one letter() per glyph riding the cloth's wave, so it unrolls into frame in reading order). Gulls flap below,
//      clouds drift at two depths. 1.30–1.62 the counter HUD slides in top-right showing 0 and settles.
//      reads: 0–.5 a little plane (the iris leads the eye)  .4–1.4 the banner's words, then whole  1.35–1.7 the counter: 0
//      [out 1.66–2.0: the camera tips up into the sun, the glare whites out the frame; the sun MATCH-CUTS to its glint in a lens]
// B1 2.00–3.82  CU, OPPA IN HIS SHADES (bar -1). The glare fades off Oppa's round tortoiseshell shades, the sun glinting in the
//      left lens. He lounges against the blue wave-pattern towel, smug, and nods on the chant (2.285, 3.19, 3.65).
// B2 3.82–4.73  CU, THE SIP (cut on the bar-0 downbeat). A coconut drink with a pink straw and a paper umbrella; he sips.
// B3 4.73–5.64  MS, LIVING LARGE (cut on beat 2). Reclined, arm behind his head, the sun blazing, the umbrella's shade; a
//      sparkle pings off his hair on the chant (5.01), a nod (5.47); the camera starts easing back...
// C  5.64–9.27  THE REVEAL (bars 1–2).  [in: a match cut on the pull-back: Oppa at the same place and size, the same move]
//      The camera keeps pulling back: the "beach" is a kids' sandbox in a city playground (bucket, spade, slide, swings,
//      towers). Little Clawd stands beside the lounger, staring up at him. Bar 2: Oppa slurps on, oblivious; the Kid's eyes
//      narrow; on the four chant hits (8.43–9.10) he stamps into the stance, fists to the reins, sinks... the camera pushes in.
//      reads: 5.6–6.9 it's a sandbox, it's a playground  6.9–7.6 a kid is staring at him  7.6–8.4 the kid means business
//             8.4–9.27 he's about to do something (anticipation)
// D  9.27–11.09 THE BEAT DROPS: THE KID GALLOPS (bar 3, a cut on the drop). Medium shot, the Kid big and fierce, full body, the
//      real horse dance; Oppa behind him on the lounger stops mid-sip. The counter ticks 0 → 1 at 9.45 (its bounce).
// E  11.09–12.91 CU, OPPA LOWERS HIS SHADES (bar 4). He pulls them down his face: eyes wide (impressed) → narrow (jealous) →
//      a determined grin. The Kid keeps galloping at the bottom-left of the frame (the cause stays in shot).
// F  12.91–15.18 THE VAULT (bars 5–6). A two-shot. The Kid switches to the lasso on the downbeat; Oppa sits up, tosses the
//      coconut, vaults over the Kid (13.364) and lands beside him on beat 2 (13.818), lassoing in sync. Both big, full body.
// G  15.18–16.545 THE STOP (the same camera). The music breaks: in the gap they sink (anticipation), SNAP into pointup on the
//      stab (15.345, a camera punch), sink, SNAP again (15.685, a bigger punch, toward the fence). THE HORSE's head rises over
//      the fence behind them (its body hidden by the hedge that runs behind the pickets) and stares at us, deadpan.
//      16.09 Oppa's eyes slide up to it; a sweat drop.
//      [out: SMASH CUT on the bar-7 downbeat. Last frame 16.5417: the frozen pointup, the Horse peeking over the fence]
(() => {
  // ---------- time ----------
  const TB1 = barT(-1), TB2 = barT(0), TB3 = beatT(0, 2), TC = barT(1), TD = barT(3), TE = barT(4), TF = barT(5), TEND = barT(7);
  const CHANT = [2.285, 3.19, 3.65, 5.01, 5.47, 6.83, 7.28, 8.43, 8.65, 8.88, 9.10];
  const STAB1 = 15.345, STAB2 = 15.685, GAP1 = 15.2, GAP2 = 15.575, PICK = 16.09;
  const T_UP = beatT(5, 0) + .12, T_VAULT = beatT(5, 1), T_LAND = beatT(5, 2);

  // ---------- marks (playground world; the floor line is y = 820) ----------
  const OU = 24, KU = 13.5;
  const KID = [1180, 860];
  const LNG = { x: 1436, y: 792, rot: -.36 };         // Oppa lounging: his feet pivot, so his seat sits on the lounger's seat
  const LAND = [905, 872];                            // where he lands after the vault, left of the Kid
  const HX = 1075, HS = 13, HEDGE = 602;              // the Horse behind the hedge, between the two of them
  const IN = { x: 960, y: 900, u: 40, rot: -.36 };    // the close-up insert world: the same lounging Oppa, bigger
  const SUN_IN = [500, 350];

  // ---------- small helpers ----------
  const nod = t => { let k = 0; for (const c of CHANT) { const a = t - c + .03; if (a > 0 && a < .7) k += Math.sin(Math.min(1, a / .16) * Math.PI / 2) * Math.exp(-a * 6.5); } return k; };
  const sprg = (t, t0, k = 7, w = 22) => t < t0 ? 0 : Math.exp(-k * (t - t0)) * Math.sin(w * (t - t0));
  // where a body-local point (in u, pre-scale; the front view: body x -5..5, y -8..-2) lands in the world
  function bodyPt(P, lx, ly) {
    const sq = P.sq || 0, sx = P.sx * (1 + sq * .6), sy = P.sy * (1 - sq), c = Math.cos(P.rot || 0), s = Math.sin(P.rot || 0);
    const X = lx * P.u * sx, Y = ly * P.u * sy;
    return [P.x + (P.dx || 0) * P.u + X * c - Y * s, P.y + (P.dy || 0) * P.u + X * s + Y * c];
  }
  // aim an arm (side 1 = R, -1 = L; front view) so its tip lands on the body-local point (tx, ty): { a, len }
  function reach(side, tx, ty) {
    let px = side * 4.9, a = 0, len = 1;
    for (let it = 0; it < 3; it++) {
      const dx = tx - px, dy = ty + 4.5, ang = Math.atan2(dy, dx);
      a = side > 0 ? -ang : ang - Math.PI; a = Math.atan2(Math.sin(a), Math.cos(a));
      len = Math.hypot(dx, dy) / 2.2;
      px = side * (4.9 + .55 * clamp((Math.abs(a) - .7) / .9));
    }
    return { a, len };
  }
  function hud(t) {
    if (t < 1.3) return;
    if (t >= 1.75) { counterHUD(t); return; }
    const V = VIEWCOUNT(t), aw = (150 + 64 * V.str.length + 52 + 40) * (64 / 120), x0 = W - 36 - aw / 2, k = seg(t, 1.3, 1.6);
    counterHUD(t, { x: lerp(W + aw * .7, x0, backOut(k)), rot: .1 * (1 - ease(k)), pop: .5 * Math.max(0, sprg(t, 1.6, 9, 24)) });
  }

  // ---------- props ----------
  // the coconut drink (body-local, u units): shell, the cut top, a pink bendy straw to `tip`, a paper umbrella
  function coconut(u, sw, cx, cy, tip, o = {}) {
    const U = v => v * u;
    paint(ellPts(U(cx), U(cy), U(1.3), U(1.2), 20), { wash: '#8A5634', fill: '#5E3A22', fillOp: 90, tex: .8, ink: PAL.ink, sw: sw * .8 });
    for (let i = 0; i < 6; i++) { const a = -.4 + i * .5; inkLine([[U(cx + Math.cos(a) * .6), U(cy + Math.sin(a) * .5 + .2)], [U(cx + Math.cos(a) * 1.05), U(cy + Math.sin(a) * .95 + .15)]], sw * .35, '#4A2C18', 'inkfine', .3); }
    paint(ellPts(U(cx - .1), U(cy - .95), U(.78), U(.28), 14), { wash: '#FBF4E4', ink: PAL.ink, sw: sw * .5 });
    const b = [cx - .25, cy - 1.0], k = [lerp(b[0], tip[0], .25), Math.min(b[1], tip[1]) - .45];
    const path = [[b[0], b[1]], [b[0] - .05, k[1] + .2], [k[0], k[1]], [tip[0], tip[1]]];
    paint(ribbon(path.map(([x, y]) => [U(x), U(y)]), U(.34), U(.3)), { wash: '#F4789E', ink: PAL.ink, sw: sw * .5 });
    // the drink going up the straw (fill 0..1), then gulps travelling up it
    if (o.fill > .02) {
      const C = through(path, 5), n = Math.max(2, Math.round(C.length * clamp(o.fill)));
      inkLine(C.slice(0, n).map(([x, y]) => [U(x), U(y)]), sw * 1.5, '#F7C46A', 'ink', 0);
      if (o.fill >= 1) for (let g = 0; g < 3; g++) { const q = frac((o.flow || 0) * 2.2 + g / 3), P = C[Math.min(C.length - 1, Math.floor(q * C.length))]; paint(ellPts(U(P[0]), U(P[1]), U(.2), U(.2), 8), { wash: '#FFE6A8', ink: null }); }
    }
    for (let i = 1; i < 4; i++) { const q = i / 4, p = [lerp(k[0], tip[0], q), lerp(k[1], tip[1], q)]; inkLine([[U(p[0] - .06), U(p[1] - .15)], [U(p[0] + .06), U(p[1] + .15)]], sw * .45, PAL.cream, 'inkfine', 0); }
    if (o.umbrella !== false) {   // the paper umbrella, stuck in at a jaunty angle
      const ux = cx + .75, uy = cy - 1.2;
      inkLine([[U(ux - .15), U(uy + .7)], [U(ux + .35), U(uy - .9)]], sw * .5, '#8A6A4A', 'inkfine', 0);
      paint([[U(ux - .75), U(uy - .55)], [U(ux + .35), U(uy - 1.4)], [U(ux + 1.35), U(uy - .75)], [U(ux + .35), U(uy - .9)]], { wash: '#FFD24A', ink: PAL.ink, sw: sw * .45 });
      paint([[U(ux + .35), U(uy - 1.4)], [U(ux + 1.35), U(uy - .75)], [U(ux + .35), U(uy - .9)]], { wash: '#F2789A', ink: null });
    }
  }
  // round tortoiseshell shades pulled down the face by `drop` u, with an optional sun glint on the left lens
  function shadesHook(drop, glint = 0, t = 0) {
    return (u, sw, F) => {
      push(); translate(0, drop * u); roundShades(u, sw, F, 'tort'); pop();
      if (glint > .01 && F.sides.includes(-1)) {
        const gx = -2.95 * u, gy = (-6.5 + drop) * u, r = u * (1.1 + .5 * glint);
        glow(gx, gy, r * 2.2, '#FFF1C0', .9 * glint);
        paint(starPts(gx, gy, r * (1 + .08 * Math.sin(t * 30)), .16, 4, -Math.PI / 2 + .2), { wash: '#FFFBEA', ink: null });
      }
    };
  }
  // a hair sparkle (head hook, hat space)
  const pingHook = k => (u, sw) => {
    if (k <= .01) return;
    const p = backOut(clamp(k * 3)), x = 2.6 * u, y = -9.45 * u, r = u * 1.3 * p * (1 - .6 * clamp((k - .5) * 2));
    glow(x, y, r * 2.5, '#FFF6D0', .9 * (1 - k));
    paint(starPts(x, y, r, .2, 4, -Math.PI / 2), { wash: '#FFFBEA', ink: PAL.ink, sw: sw * .4 });
  };

  // a fist with the index finger up (the arm-tip hook for the point): the finger runs on along the arm
  const pointHook = col => (u, sw) => {
    paint(rrPts(.25 * u, -.21 * u, 1.15 * u, .42 * u, .19 * u), { wash: col, ink: PAL.ink, sw: sw * .6 });
    paint(ellPts(.1 * u, 0, .64 * u, .58 * u, 12), { wash: col, ink: PAL.ink, sw: sw * .7 });
  };

  // ---------- Oppa lounging ----------
  // o: sip 0..1, drop (shades) 0..1.3, eyes, mouth, lookX/Y, nod, sitUp 0..1 (sits up to vault), held (the coconut in hand),
  //    glint, ping, emote/emoteK/emoteAge, tint
  function loungeOpts(t, P, o = {}) {
    const hand = CAST.oppa.hand, sip = clamp(o.sip || 0), su = clamp(o.sitUp || 0), nd = o.nod || 0;
    const C = [lerp(2.95, 2.25, sip), lerp(-2.65, -3.2, sip)];                    // the coconut's centre
    const tip = [lerp(2.2, .5, sip), lerp(-4.9, -4.35, sip)];                     // the straw's tip (at the mouth when sipping)
    const R = reach(1, C[0] + 1.2, C[1] + .1);
    // the other arm: behind the head (elbow out at head height), or reaching down to the lounger as he sits up
    const pl = clamp(o.pull || 0), PR = reach(-1, -3.95, -5.95 + (o.drop || 0));
    const L = pl > 0 ? { a: lerp(1.05, PR.a, pl), len: lerp(1.42, PR.len, pl) } : { a: lerp(1.05, -.9, su), len: lerp(1.42, 1.1, su) };
    const held = o.held !== false, fa = held && pl > .35 ? 'LR' : held ? 'R' : pl > .35 ? 'L' : undefined;
    const q = {
      look: 'beach', bareEyes: true, boilKey: o.boilKey || 'oppa',
      rot: lerp(P.rot, .06, su) + .05 * nd + .02 * Math.sin(t * 1.3) * (1 - su), dy: .12 * nd + (P.dy || 0) + (o.dy || 0), sq: .03 * nd + (P.sq || 0) + (o.sq || 0) + .03 * (o.slurp > 0 && o.slurp < 1 ? Math.abs(Math.sin(t * 14)) : 0),
      eyes: o.eyes || 'normal', mouth: o.mouth === undefined ? 'smirk' : o.mouth, lookX: o.lookX || 0, lookY: o.lookY || 0,
      aL: L.a, armLen: { L: L.len, R: held ? R.len : 1 },
      armL: pl > .35 ? fistHook(hand, .66) : su < .5 ? bentHook(-2.3, 2.2, hand, hand, { cuff: false }) : fistHook(hand, .62), noLegs: o.noLegs,
      aR: held ? R.a : o.aR ?? .9, armR: fistHook(hand, .7), frontArm: fa || undefined,
      face: shadesHook(o.drop || 0, o.glint || 0, t),
      head: pingHook(o.ping || 0),
      draw: held ? (u, sw) => coconut(u, sw, C[0], C[1], tip, { fill: sip > .6 ? clamp((o.slurp || 0) * 4) : 0, flow: (o.slurp || 0) * 3 }) : null,
      emote: o.emote, emoteK: o.emoteK, emoteAge: o.emoteAge, tint: o.tint, tintK: o.tintK
    };
    return q;
  }

  // ---------- the playground, dressed for this chapter ----------
  // back hook: (the Horse) → a hedge behind the pickets → the grass in front of it → the pickets again. The hedge and the grass
  // hide everything of the Horse but its head.
  function backDressing(t, horseY) {
    const [a, , c] = viewRect2(300);
    if (horseY != null) horse(HX, horseY, HS, t, { view: 'up', look: 'camera', mood: 'deadpan', blink: .31, boilKey: 'c1horse' });
    boilSeed('c1 hedge');
    const top = [];
    for (let x = Math.floor(a / 70) * 70 - 70; x <= c + 70; x += 70) {
      const h = hash(x * .013 + 3), r = 30 + 14 * h;
      for (let k = 0; k <= 6; k++) { const q = Math.PI + k / 6 * Math.PI; top.push([x + 35 + Math.cos(q) * 38, HEDGE + 10 - 12 * h + Math.sin(q) * r]); }
    }
    const P = top.concat([[top[top.length - 1][0], FLOOR - 104], [top[0][0], FLOOR - 104]]);
    paint(P, { wash: '#5A9A48', fill: '#3F7634', fillOp: 80, bleed: .02, tex: .7, ink: null });
    for (let i = 0; i + 1 < top.length; i += 12) { boilSeed('c1 hedgeL' + i); inkLine(top.slice(i, i + 13), .8, '#2F5A2C', 'ink', .4); }
    for (let x = Math.floor(a / 70) * 70; x < c; x += 70) { const h = hash(x * .07); boilSeed('c1 leaf' + x); inkLine([[x + 20 * h, HEDGE + 30 + 40 * h], [x + 12 + 20 * h, HEDGE + 22 + 40 * h]], .6, '#8CC060', 'inkfine', .3); }
    boilSeed('c1 grass');
    paint(rectPts(a - 100, FLOOR - 108, c - a + 200, 190), { wash: GP.grass, fill: GP.grassDk, fillOp: 55, bleed: .02, tex: .6, ink: null });
    boilSeed('pg fence');
    for (let x = -600; x < 4200; x += 90) if (vis(x - 50, x + 50)) paint(rectPts(x, FLOOR - 180, 12, 74), { wash: '#6FB06A', ink: PAL.ink, sw: .5 });
    for (let x = Math.floor(a / 600) * 600; x < c; x += 600) { boilSeed('c1 rail' + x); inkLine([[x - 4, FLOOR - 170], [x + 604, FLOOR - 170]], 1.5, '#4E8A48', 'ink', 0); }
  }
  // the whole playground frame: camera, set, dressing, cast (mid hook), then the HUD
  function pgFrame(t, cam, o = {}) {
    camBegin(...cam);
    playground(t, { hooks: { back: () => backDressing(t, o.horseY), mid: () => { if (o.mid) o.mid(); } } });
    if (o.after) o.after();
    camEnd();
    hud(t);
  }

  // ---------- the Kid ----------
  const kidHand = () => CAST.kid.hand;
  function kidStanding(t, o = {}) {
    member('kid', KID[0], KID[1], KU, { ...o, boilKey: 'kid' });
  }

  // =====================================================================================================================
  // A · THE BANNER PLANE (0 → 2.0)
  // =====================================================================================================================
  const BANNER = 'CLAWDNAM STYLE', BL = 940, BH = 128, PS = 1.3;
  const planeAt = t => { const k = t / 1.9; return [lerp(1170, 120, k * (1 - .1 * (1 - k))), 468 - 50 * k + 9 * Math.sin(t * 2.4)]; };
  const SUN_A = [330, 205];
  function plane(x, y, t) {
    push(); translate(x, y); rotate(.035 * Math.sin(t * 2.4 + 1) - .035); scale(-PS, PS);    // drawn facing right, mirrored to fly left
    boilSeed('c1 plane tail');
    paint([[-100, -8], [-78, -62], [-60, -62], [-48, -12]], { wash: '#E0483C', fill: '#B8322A', fillOp: 60, ink: PAL.ink, sw: 1.1 });   // fin
    paint(starPts(-72, -40, 13, .3, 4), { wash: PAL.cream, ink: null });
    paint(ellPts(-86, -4, 26, 7, 12), { wash: '#C83A30', ink: PAL.ink, sw: .8 });                                                     // tailplane
    boilSeed('c1 plane body');
    paint([[-104, -6], [-60, -22], [20, -28], [70, -24], [96, -10], [98, 12], [70, 24], [0, 26], [-60, 16], [-104, 4]], { wash: '#E0483C', fill: '#B8322A', fillOp: 70, tex: .6, ink: PAL.ink, sw: 1.2, curv: .35 });
    inkLine([[-90, 2], [0, 12], [80, 10]], .7, '#F6E7D0', 'inkfine', .5);
    paint([[8, -26], [22, -52], [58, -50], [70, -24]], { wash: '#BFE3F5', fill: '#8FC6E8', fillOp: 60, ink: PAL.ink, sw: .9, curv: .35 });   // canopy
    inkLine([[26, -44], [38, -48]], 1.1, '#FFFFFF', 'inkfine', 0);
    paint(ellPts(30, 4, 50, 11, 16, 0, -.05), { wash: '#C83A30', fill: '#9A2A22', fillOp: 60, ink: PAL.ink, sw: .9 });                // wing
    boilSeed('c1 plane gear');
    inkLine([[30, 20], [26, 40]], 1.2, PAL.ink, 'ink', 0); inkLine([[50, 20], [54, 40]], 1.2, PAL.ink, 'ink', 0);
    paint(ellPts(24, 44, 8, 8, 10), { wash: '#2B2233', ink: null }); paint(ellPts(56, 44, 8, 8, 10), { wash: '#2B2233', ink: null });
    paint(ellPts(100, 1, 10, 13, 12), { wash: '#F4E6CE', ink: PAL.ink, sw: .8 });                                                      // spinner
    boilSeed('c1 prop');
    paint(ellPts(108, 1, 7, 46, 16), { fill: '#FFFFFF', fillOp: 70, bleed: .05, ink: null });                                          // the blur disc
    const b = Math.cos(t * 55) * 44;
    inkLine([[108, 1 - b], [108, 1 + b]], 2.2, '#4A3A40', 'ink', 0);
    for (const s of [-1, 1]) inkLine([[112, s * 30], [118, s * 14], [118, -s * 4]], .5, PAL.ink, 'inkfine', .6);
    pop();
  }
  // the banner: its front (the tow pole) at (x0, y0), trailing right, rippling; letters ride the ripple
  function banner(x0, y0, t) {
    const wave = s => { const q = s / BL; return 22 * Math.pow(q, 1.1) * Math.sin(s / 150 - t * 13) + 5 * q * Math.sin(s / 61 - t * 21); };
    const top = [], bot = [], N = 26;
    for (let i = 0; i <= N; i++) { const s = i / N * BL, w = wave(s), h = BH * (1 - .06 * s / BL); top.push([x0 + s, y0 + w - h / 2]); bot.push([x0 + s, y0 + w + h / 2]); }
    const tail = []; for (let k = 1; k < 6; k++) { const y = lerp(top[N][1], bot[N][1], k / 6); tail.push([x0 + BL + 10 * Math.sin(k * 2.1 + t * 17), y]); }
    boilSeed('c1 banner');
    paint(top.concat(tail, bot.slice().reverse()), { wash: '#FBF3DE', fill: '#E9DDC0', fillOp: 70, tex: .5, ink: null });
    // the folds: a soft shadow on each down-slope of the ripple
    for (let i = 0; i < N; i++) {
      const d = top[i + 1][1] - top[i][1]; if (d < 2.5) continue;
      boilSeed('c1 fold' + i);
      paint([top[i], top[i + 1], bot[i + 1], bot[i]], { fill: '#B8A27A', fillOp: clamp(d * 9, 0, 110), bleed: .1, tex: .4, ink: null });
    }
    boilSeed('c1 banner edge');
    const off = (P, d) => P.map(([x, y]) => [x, y + d]);
    inkLine(off(top, 8), 3.2, '#D8392F', 'ink', .4); inkLine(off(bot, -8), 3.2, '#D8392F', 'ink', .4);
    for (let i = 0; i < N; i += 13) { boilSeed('c1 bedge' + i); inkLine(top.slice(i, i + 14), 1.3, PAL.ink, 'ink', .4); inkLine(bot.slice(i, i + 14), 1.3, PAL.ink, 'ink', .4); }
    inkLine(tail.concat([bot[N]]), 1, PAL.ink, 'ink', .3);
    // the tow pole and bridle
    boilSeed('c1 pole');
    inkLine([[x0 - 2, top[0][1] - 9], [x0 - 2, bot[0][1] + 9]], 3.8, '#6A4A30', 'ink', 0);
    const knot = [x0 - 80, y0 - 8];
    inkLine([[x0 - 2, top[0][1] - 4], knot], .9, PAL.ink, 'inkfine', 0); inkLine([[x0 - 2, bot[0][1] + 4], knot], .9, PAL.ink, 'inkfine', 0);
    // the letters: one glyph per slot, riding the ripple, tilted with the cloth's slope
    const step = (BL - 80) / BANNER.length;
    for (let i = 0; i < BANNER.length; i++) {
      const ch = BANNER[i]; if (ch === ' ') continue;
      const s = 40 + (i + .5) * step, sl = (wave(s + 6) - wave(s - 6)) / 12;
      letter(ch, x0 + s, y0 + wave(s) + 5, 94, '#C8372D', { rot: Math.atan(sl) * .9 });
    }
    return knot;
  }
  function puff(x, y, w, h, key) {
    boilSeed(key);
    const P = []; for (let k = 0; k < 24; k++) { const q = k / 24 * TAU, up = Math.sin(q) < 0; P.push([x + Math.cos(q) * w, y + Math.sin(q) * (up ? h + h * .38 * Math.abs(Math.sin(q * 3)) : h * .55)]); }
    paint(P, { wash: '#FBFBF6', fill: '#DCE8EE', fillOp: 90, bleed: .08, ink: null, curv: .4 });
  }
  function gull(x, y, s, t, ph) {
    const f = Math.sin(t * 9 + ph), wy = -10 * f * s;
    inkLine([[x - 22 * s, y + wy], [x - 10 * s, y - 6 * s - wy * .3], [x, y]], 1.4 * s, PAL.ink, 'ink', .6);
    inkLine([[x, y], [x + 10 * s, y - 6 * s - wy * .3], [x + 22 * s, y + wy]], 1.4 * s, PAL.ink, 'ink', .6);
  }
  // a painted midsummer sun: a pale disc, slow-turning rays, real light
  function sun(x, y, r, t, k = 1) {
    boilSeed('c1 sun rays');
    for (let i = 0; i < 14; i++) {
      const a = i / 14 * TAU + t * .25, w = .1, r0 = r * 1.22, r1 = r * (i % 2 ? 1.75 : 2.05);
      paint([[x + Math.cos(a - w) * r0, y + Math.sin(a - w) * r0], [x + Math.cos(a) * r1, y + Math.sin(a) * r1], [x + Math.cos(a + w) * r0, y + Math.sin(a + w) * r0]], { wash: '#FFE9A0', ink: null });
    }
    boilSeed('c1 sun disc'); paint(ellPts(x, y, r, r, 30), { wash: '#FFF4C4', fill: '#FFE08A', fillOp: 60, bleed: .05, ink: '#E8B84A', sw: .8 });
    glow(x, y, r * 4, '#FFE9A8', .9 * k); glow(x, y, r * 1.8, '#FFFFFF', .7 * k);
  }
  function shotA(t, lt) {
    const push_ = ease(seg(t, 1.56, 2.0)), L = lensAtB1();
    // the end camera puts the sun where the lens (its glint) will be in B1
    const Z = 2.4, zz = lerp(1, Z, Math.pow(push_, 1.6)), cx = lerp(960, SUN_A[0] - (L[0] - 960) / Z, push_), cy = lerp(540, SUN_A[1] - (L[1] - 540) / Z, push_);
    camBegin(cx, cy, zz);
    const [a, b, c, d] = viewRect2(300);
    boilSeed('c1a sky'); paint(rectPts(a, b, c - a, d - b), { wash: GP.sky, ink: null });
    boilSeed('c1a haze'); paint(ellPts(960, 1180, 1500, 380, 30), { fill: '#EAF4F4', fillOp: 150, bleed: .3, tex: .4, ink: null });
    sun(SUN_A[0], SUN_A[1], 66, t);
    // clouds: far ones slow, near ones faster (the camera "pans" with the plane)
    [[520, 110, 110, 30, 18], [1460, 190, 150, 42, 18], [2100, 140, 120, 34, 18], [-420, 160, 130, 38, 18]].forEach(([x, y, w, h, v], i) => puff(x + v * t, y, w, h, 'c1a far' + i));
    [[1250, 900, 300, 78, 150], [-100, 840, 260, 70, 150], [2300, 920, 320, 80, 150]].forEach(([x, y, w, h, v], i) => puff(x + v * t, y, w, h, 'c1a near' + i));
    boilSeed('c1a gulls'); gull(520 + 60 * t, 700, 1, t, 0); gull(640 + 55 * t, 752, .8, t, 1.7); gull(1560 + 40 * t, 640, .7, t, 3.1);
    // the plane and its banner
    const [px, py] = planeAt(t);
    const knot = banner(px + 330, py + 34, t);
    boilSeed('c1a tow'); inkLine([[px + 100 * PS, py + 3], [knot[0], knot[1]]], 1.1, PAL.ink, 'inkfine', .2);
    plane(px, py, t);
    // the glare builds as the camera tips into the sun
    if (push_ > 0) { const g = push_ * push_; glow(SUN_A[0], SUN_A[1], 200 + 800 * g, '#FFF4CC', g); glow(SUN_A[0], SUN_A[1], 90 + 320 * g, '#FFFFFF', g); }
    camEnd();
    flushLetters();
    hud(t);
    // in: an iris opens on the plane; out: the glare whites the frame
    const ir = seg(t, 0, .6);
    if (ir < 1) { const s = toScreen(px + 10, py, { cx: 960, cy: 540, zoom: 1, rot: 0 }); iris(s[0], s[1], lerp(0, 1600, easeIn(ir) * .85 + ir * .15), '#1E1826'); }
    flash(easeIn(seg(t, 1.84, 2.0)), '#FFF8E6');
  }

  // =====================================================================================================================
  // B · THE CLOSE-UPS (the insert world: a beach, as far as anyone can tell)
  // =====================================================================================================================
  const IN_P = (o = {}) => ({ x: IN.x, y: IN.y, u: IN.u, rot: IN.rot + (o.rot || 0), sx: 1.12, sy: .94, dy: o.dy || 0, sq: o.sq || 0 });
  function insertBG(t) {
    const [a, b, c, d] = viewRect2(300);
    boilSeed('c1i sky'); paint(rectPts(a, b, c - a, 420 - b), { wash: GP.sky, ink: null });
    boilSeed('c1i haze'); paint(ellPts(IN.x, 420, 1400, 120, 30), { fill: '#EAF4F4', fillOp: 110, bleed: .3, tex: .4, ink: null });
    sun(SUN_IN[0], SUN_IN[1], 70, t, 1);
    boilSeed('c1i sand'); paint(rectPts(a, 420, c - a, d - 420), { wash: GP.sand, fill: GP.sandDk, fillOp: 70, bleed: .03, tex: .8, ink: null });
    // the lounger's back, the big towel draped over it (cream, blue waves), tilted with him
    push(); translate(IN.x, IN.y); rotate(IN.rot);
    boilSeed('c1i frame'); paint(rrPts(-500, -612, 1000, 64, 28), { wash: '#E8E0D0', fill: '#C8BEA8', fillOp: 60, ink: PAL.ink, sw: 1.4 });
    boilSeed('c1i towel'); paint([[-470, -580], [470, -580], [500, 420], [-500, 420]], { wash: '#F6F4EA', fill: '#E4E0D2', fillOp: 60, tex: .5, ink: PAL.ink, sw: 1.3 });
    for (let k = 0; k < 13; k++) { boilSeed('c1i wave' + k); const P = []; for (let i = 0; i <= 20; i++) P.push([-480 + i * 48, -525 + k * 78 + 12 * Math.sin(i * 1.3 + k)]); inkLine(P.slice(0, 11), 7, '#4A8AD8', 'ink', .6); inkLine(P.slice(10), 7, '#4A8AD8', 'ink', .6); }
    boilSeed('c1i fringe'); for (let i = 0; i < 31; i++) inkLine([[-455 + i * 30, -580], [-458 + i * 30, -603]], 1, '#B8B0A0', 'inkfine', 0);
    pop();
    glow(SUN_IN[0] + 60, SUN_IN[1] + 90, 360, '#FFE9A8', .55);   // the sunlight spills over the towel
    // the umbrella's edge, hanging into the top of the frame
    boilSeed('c1i umbrella');
    const U = [[a - 100, b - 100], [c + 100, b - 100]];
    for (let i = 14; i >= 0; i--) U.push([lerp(a - 100, c + 100, i / 14), 150 + (i % 2 ? 28 : 0)]);
    paint(U, { wash: '#F48AA8', fill: '#E0608A', fillOp: 70, ink: PAL.ink, sw: 1.4, curv: .15 });
  }
  function insertFrame(t, cam, o) {
    camBegin(...cam);
    insertBG(t);
    member('oppa', IN.x, IN.y, IN.u, { ...loungeOpts(t, { rot: IN.rot }, { ...o, noLegs: true }) });
    camEnd();
    hud(t);
  }
  // framing helpers: the camera centred on a body-local point of the insert Oppa
  const inCam = (lx, ly, z, rot = 0) => { const p = bodyPt(IN_P(), lx, ly); return [p[0], p[1], z, rot]; };
  const B1CAM = lt => inCam(lerp(-.3, 0, ease(lt / 1.8)), -6.2, lerp(2.5, 2.3, ease(lt / 1.8)), .12 + .012 * Math.sin(lt * 1.7));
  function lensAtB1() {   // the screen point of the left lens's glint in B1's first frame (shot A's sun lands on it)
    const c = B1CAM(0), cam = { cx: c[0], cy: c[1], zoom: c[2], rot: c[3] };
    return toScreen(...bodyPt(IN_P(), -2.95, -6.5), cam);
  }
  function shotB1(t, lt) {
    insertFrame(t, B1CAM(lt), { nod: nod(t), glint: 1 - seg(lt, .2, 1.0), mouth: 'smirk' });
    flash(1 - seg(lt, 0, .24), '#FFF8E6');
  }
  function shotB2(t, lt) {
    const sip = ease(seg(lt, .03, .2)) * (1 - ease(seg(lt, .62, .78)));
    const cam = inCam(lerp(1.35, 1.2, lt), -4.15, lerp(3.0, 3.1, lt), .1);
    insertFrame(t, cam, { nod: 0, sip, slurp: seg(lt, .2, .62), mouth: sip > .5 ? 'o' : lt > .7 ? 'smile' : 'smirk' });
  }
  // B3: basking: his head against the sky, the sun over his shoulder; the camera starts easing back (the reveal's pull-back)
  const B3CAM = lt => inCam(-1.5, -10.3, lerp(1.85, 1.6, easeIn(seg(lt, .3, .91))), -.05 + .02 * lt);
  function shotB3(t, lt) {
    insertFrame(t, B3CAM(lt), { nod: nod(t), ping: seg(t, 5.0, 5.45), mouth: t > 4.95 && t < 5.4 ? 'smile' : 'smirk' });
  }

  // =====================================================================================================================
  // C · THE REVEAL (5.636 → 9.273)
  // =====================================================================================================================
  const LNG_P = (o = {}) => ({ x: LNG.x, y: LNG.y, u: OU, rot: LNG.rot + (o.rot || 0), sx: 1.12, sy: .94, dy: o.dy || 0, sq: o.sq || 0 });
  function oppaLounging(t, o = {}) { member('oppa', LNG.x, LNG.y, OU, loungeOpts(t, { rot: LNG.rot, dy: 0, sq: 0 }, o)); }
  function shotC(t, lt) {
    // the match cut: the same body point at the same screen place and size as B3's last frame, the same pull-back, faster;
    // it settles on the wide (the slide, the sandbox, the umbrella, the swings, the towers) and drifts
    const e3 = B3CAM(TC - TB3), p0 = bodyPt(LNG_P(), -1.5, -10.3), z0 = e3[2] * IN.u / OU;
    const pull = 1 - Math.pow(1 - seg(lt, 0, 1.55), 2.2), drift = seg(lt, 1.2, 1.82);
    const cam = [lerp(p0[0], 1490, pull) - 18 * drift, lerp(p0[1], 606, pull), z0 * Math.pow(.86 / z0, pull) * (1 + .02 * drift), lerp(e3[3], 0, pull)];
    pgFrame(t, cam, { mid: () => {
      kidReveal(t);
      oppaLounging(t, { nod: nod(t) * .7, mouth: 'smirk' });
    } });
  }
  // C2 · THE STARE (bar 2, a cut on the downbeat): a two-shot. The Kid stares up; Oppa slurps on; the Kid winds up.
  function shotC2(t, lt) {
    const k = ease(lt / 1.82), k2 = ease(seg(lt, .9, 1.82));
    const cam = [lerp(1318, 1262, k), lerp(704, 728, k), lerp(1.7, 1.8, k) + .22 * k2, 0];
    const sipK = ease(seg(t, 7.5, 7.64)) * (1 - ease(seg(t, 8.34, 8.46)));
    pgFrame(t, cam, { mid: () => {
      kidReveal(t);
      oppaLounging(t, { nod: nod(t) * .5, sip: sipK, slurp: seg(t, 7.64, 8.34), mouth: sipK > .5 ? 'o' : 'smirk' });
    }, after: () => {
      const tip = bodyPt(LNG_P(), .6, -4.6), a = t - 7.66;
      if (a > 0 && a < .78) sfx('SLURRRP', tip[0] + 190, tip[1] - 150, 44, '#F4789E', a, { life: .78, rot: -.14 });
    } });
  }
  // the Kid in the reveal: staring up at Oppa; eyes narrow; then the wind-up into the gallop stance on the chant hits
  function kidReveal(t) {
    const mo = mood('kid', t, [[TC, 'neutral', { lookX: .8, lookY: -.9 }], [7.9, 'determined', { lookX: .5, lookY: -.6 }], [8.43, 'determined', { lookX: 0, lookY: 0 }]], { take: .6 });
    const hit = ring(t, [8.43, 8.65, 8.88, 9.10], 9, 26);
    const st = ease(seg(t, 8.38, 8.5)), fists = ease(seg(t, 8.6, 8.72)), sink = ease(seg(t, 8.84, 8.96)) + .5 * ease(seg(t, 9.06, 9.16));
    const g = dance('gallop', TD, { hand: kidHand(), sleeve: kidHand() });
    const pose = {
      ...mo,
      legSplay: .9 * st, sq: (mo.sq || 0) + .12 * sink + .05 * hit, dy: (mo.dy || 0) + .15 * sink,
      aL: lerp(mo.aL ?? .2, g.aL, fists), aR: lerp(mo.aR ?? .2, g.aR, fists), armLen: lerp(1, 2.4, fists),
      frontArm: fists > .5 ? 'LR' : undefined, armL: fists > .5 ? g.armL : undefined, armR: fists > .5 ? g.armR : undefined,
      rot: (mo.rot || 0) + .03 * hit
    };
    kidStanding(t, pose);
  }

  // =====================================================================================================================
  // D · THE KID GALLOPS (9.273 → 11.091)
  // =====================================================================================================================
  const KID_KEYS = [[TD, 'gallop'], [TF, 'lasso']];
  function kidDancing(t, o = {}) {
    dancer('kid', KID[0], KID[1], KU, KID_KEYS, t, { mood: 'determined', eyes: 'determined', mouth: 'grin', boilKey: 'kid', ...o });
  }
  function shotD(t, lt) {
    // a punch-in on the drop that settles, then a slow drift; the Kid centre, big, full body
    const pop = Math.exp(-lt * 7), sh = shakeXY(t, 6 * Math.exp(-lt * 12));
    const cam = [lerp(1196, 1206, ease(lt / 1.82)) + sh[0], lerp(784, 790, lt / 1.82) + sh[1], (lerp(2.75, 2.85, ease(lt / 1.82)) + .3 * pop) * (1 + .012 * pulse(t, 7)), 0];
    // Oppa, still sipping... the straw leaves his mouth as his head turns to the Kid
    const look = ease(seg(t, 10.3, 10.5));
    pgFrame(t, cam, { mid: () => {
      oppaLounging(t, { sip: 1 - ease(seg(t, 10.28, 10.42)), slurp: seg(t, TD, 10.28) * .6, mouth: t < 10.35 ? 'o' : 'flat', nod: .45 * pulse(t, 6) * (1 - look) });
      kidDancing(t);
    } });
  }

  // =====================================================================================================================
  // E · OPPA LOWERS HIS SHADES (11.091 → 12.909)
  // =====================================================================================================================
  function shotE(t, lt) {
    const face = bodyPt(LNG_P(), 0, -6);
    const k = ease(lt / 1.82), take = Math.max(0, sprg(t, 11.46, 9, 20));
    const cam = [lerp(face[0] - 14, face[0] - 24, k), lerp(face[1] + 6, face[1] + 12, k), lerp(3.45, 3.7, k) * (1 + .03 * take), .14];
    // the free hand comes up to the shades and pulls them down his face
    const hand = ease(seg(t, 11.16, 11.3)) * (1 - ease(seg(t, 11.5, 11.66))), drop = 1.0 * ease(seg(t, 11.3, 11.46));
    const mo = mood('oppa', t, [[TE, 'neutral', { lookX: -.5, lookY: .5 }], [11.46, 'surprised', { lookX: -.6, lookY: .6 }], [12.08, 'suspicious', { eyes: 'angry', lookX: -.75, lookY: -.2, emote: 'anger' }], [12.52, 'determined', { lookX: -.6, lookY: -.3 }]], { take: .8 });
    const mouth = t < 11.46 ? 'flat' : t < 12.08 ? 'O' : t < 12.52 ? 'pout' : 'grin';
    pgFrame(t, cam, { mid: () => {
      kidDancing(t);
      oppaLounging(t, { drop, pull: hand, eyes: mo.eyes, mouth, lookX: mo.lookX, lookY: mo.lookY, emote: mo.emote, emoteK: mo.emoteK, emoteAge: mo.emoteAge, sq: mo.sq, dy: mo.dy, nod: 0, held: true });
    } });
  }

  // =====================================================================================================================
  // F + G · THE VAULT, THE DANCE TOGETHER, THE STOP, THE HORSE (12.909 → 16.545)
  // =====================================================================================================================
  function shotFG(t, lt) {
    // a two-shot of the Kid's lasso and Oppa sitting up; the camera rides the vault's arc (up and over, easing out)
    // and settles on the pair, big; it breathes on the beat while they dance
    const k = seg(t, 13.2, 13.96), e = ease(k), arc = Math.sin(Math.PI * e), d = ease(seg(t, 13.96, 15.2));
    let cam = [lerp(1296, 1060, e) - 4 * d, lerp(700, 706, e) - 95 * arc, (lerp(1.52, 1.74, e) + .03 * seg(t, TF, 13.2) - .17 * arc + .04 * d) * (1 + .012 * pulse(t, 7) * (t < GAP1)), 0];
    // the punches on the stabs, the second one toward the fence
    const p1 = easeOut(seg(t, STAB1, STAB1 + .06)) + .25 * Math.max(0, sprg(t, STAB1 + .06, 10, 24));
    const p2 = easeOut(seg(t, STAB2, STAB2 + .06)) + .25 * Math.max(0, sprg(t, STAB2 + .06, 10, 24));
    cam[2] *= 1 + .07 * p1 + .08 * p2 + .04 * ease(seg(t, STAB2 + .1, TEND));
    cam[0] += 6 * p2; cam[1] -= 14 * p1 + 14 * p2 + 6 * seg(t, STAB2, TEND);
    const sh = shakeXY(t, 5 * (Math.exp(-(t - STAB1) * 18) * (t > STAB1) + Math.exp(-(t - STAB2) * 18) * (t > STAB2)));
    cam[0] += sh[0]; cam[1] += sh[1];
    const rise = ease(seg(t, 15.38, 15.98));
    const horseY = t > 15.3 ? lerp(HEDGE + 23.6 * HS + 16, HEDGE + 13.4 * HS - 2, rise) : null;
    pgFrame(t, cam, { horseY, mid: () => {
      kidFG(t);
      oppaFG(t);
    }, after: () => thrownCoconut(t) });
  }
  // the Kid: the lasso to the stop, then the stop poses (pointup with his LEFT arm, the inner one)
  function stopPose(name, t, side, keys, hand) {
    const d = routine(Math.min(t, GAP1), keys, { hand, sleeve: hand });
    if (t < GAP1) return d;
    const pu = dance('pointup', STAB1, { side, e: 0, hand, sleeve: hand });
    if (t < STAB1) {   // the gap: sink into an anticipation crouch
      const k = ease(seg(t, GAP1, GAP1 + .1));
      return { ...d, sq: lerp(d.sq || 0, .2, k), dy: lerp(d.dy || 0, .12, k), aL: lerp(d.aL, -.6, k), aR: lerp(d.aR, -.6, k), legLift: (d.legLift || [0, 0, 0, 0]).map(v => v * (1 - k)), legSplay: lerp(d.legSplay || 0, .9, k), rot: 0, dx: 0 };
    }
    const a1 = t - STAB1, a2 = t - STAB2;
    let sq = -.2 * Math.exp(-a1 * 9) * Math.cos(a1 * 22), dy = -.5 * Math.exp(-a1 * 10);
    if (t > GAP2 && t < STAB2) sq += .1 * ease(seg(t, GAP2, GAP2 + .08));
    if (t >= STAB2) { sq += -.22 * Math.exp(-a2 * 8) * Math.cos(a2 * 22); dy += -.8 * Math.exp(-a2 * 9) * Math.sin(Math.min(1, a2 / .12) * Math.PI / 2); }
    const fing = pointHook(hand);
    return { ...pu, sq, dy, legSplay: .75, frontArm: 'LR', ...(side > 0 ? { armLen: { R: 2.35, L: .72 }, armR: fing } : { armLen: { L: 2.6, R: .72 }, armL: fing }) };
  }
  function kidFG(t) {
    const hand = kidHand(), pose = stopPose('kid', t, -1, KID_KEYS, hand);
    member('kid', KID[0], KID[1], KU, { ...pose, eyes: 'determined', mouth: t > STAB1 ? 'grin' : 'grin', boilKey: 'kid' });
  }
  // Oppa: lounging → sits up (anticipation) → the vault over the Kid → lands on beat 2 → the lasso → the stop
  const OPPA_KEYS = [[T_LAND, 'lasso']];
  function oppaFG(t) {
    const hand = CAST.oppa.hand;
    const mo = { eyes: 'determined', mouth: 'grin' };
    if (t < T_VAULT) {
      const su = ease(seg(t, T_UP, T_VAULT));
      const crouch = ease(seg(t, T_VAULT - .14, T_VAULT));
      oppaLounging(t, { drop: 1.0, ...mo, lookX: -.6, lookY: .3, sitUp: su, held: t < 13.2, aR: lerp(1.6, .5, ease(seg(t, 13.2, 13.3))),
        sq: .2 * crouch, nod: 0 });
      return;
    }
    if (t < T_LAND) {   // the vault: a big arc over the Kid, turning to face where he's going
      const k = seg(t, T_VAULT, T_LAND), p = arcPt([LNG.x, LNG.y], LAND, 330, k);
      member('oppa', p[0], p[1], OU, {
        look: 'beach', bareEyes: true, face: shadesHook(1.0), boilKey: 'oppa', ...mo,
        ...turn(t, T_VAULT, T_VAULT + .12, 0, -.125), ...(t > T_LAND - .1 ? turn(t, T_LAND - .1, T_LAND, -.125, 0) : {}),
        sq: -.16 * (1 - k) + .1 * k * k, rot: -.22 * Math.sin(Math.PI * k), aL: 1.1, aR: 1.25, armLen: 1.35,
        armL: fistHook(hand), armR: fistHook(hand), legLift: [.7, .5, .5, .7].map(v => v * Math.sin(Math.PI * k))
      });
      return;
    }
    const pose = stopPose('oppa', t, 1, OPPA_KEYS, hand), a = t - T_LAND;
    const land = t < GAP1 ? .2 * Math.exp(-a * 9) * Math.cos(a * 20) : 0;
    // his eyes: on the Kid while dancing, forward on the pose... then up at the Horse at 16.09
    const look = ease(seg(t, PICK, PICK + .12));
    const sweat = seg(t, 16.25, 16.4);
    member('oppa', LAND[0], LAND[1], OU, {
      look: 'beach', bareEyes: true, face: shadesHook(1.0), boilKey: 'oppa', ...pose, ...mo,
      sq: (pose.sq || 0) + land, eyes: t > PICK ? 'normal' : 'determined', mouth: t > PICK + .05 ? 'flat' : 'grin',
      lookX: lerp(t < GAP1 ? .5 : 0, .85, look), lookY: lerp(0, -.9, look),
      emote: sweat > 0 ? 'sweat' : undefined, emoteK: sweat, emoteAge: t - 16.25
    });
  }
  // the coconut, tossed away as he sits up: it arcs off right and plops into the sand by the umbrella
  function thrownCoconut(t) {
    if (t < 13.2) return;
    const from = bodyPt(LNG_P(), 2.95, -2.65), to = [1760, 905], k = seg(t, 13.2, 13.8);
    const p = arcPt(from, to, 220, easeOut(k) * .3 + k * .7);
    boilSeed('c1 coconut');
    push(); translate(p[0], p[1]); rotate(k * 7);
    coconut(OU * .9, 1.2, 0, 0, [.2, -2.4], { umbrella: k < .5 });
    pop();
  }

  shots([[0, shotA], [TB1, shotB1], [TB2, shotB2], [TB3, shotB3], [TC, shotC], [barT(2), shotC2], [TD, shotD], [TE, shotE], [TF, shotFG]]);
})();
