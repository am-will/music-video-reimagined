// c12_overflow.js: barT(97) 180.182 -> barT(106) 196.545. THE BRIDGE: the breakdown, the tension, the OVERFLOW.
// Night, then glitch red.
//
// ================================================== SHOT PLAN ==================================================
// THE JOKE. The whole city has stopped dancing to stare up at a giant view counter in the night sky as it closes in
// on 2,147,483,647. The one Clawd who hasn't noticed is Oppa, alone in a restroom stall, replaying his own dance on
// his phone. His last press is the view that breaks the counter.
//
// THE MUSIC (measured): bars 97-100 are a hushed breakdown (no hats; bass and an accent on the "and" of each beat:
// 181.77, 183.59, 185.41 = the strongest, 187.23); bars 101-103 the hats creep back; bars 104-105 build, one counter
// tick per eighth (641 ... 647); the low end drops out at 195.54 (T_OVF) and stays out past the final drop (c13).
//
// A. THE BREAKDOWN, quiet and intimate: a tiny stall at night. Mint tiles, one fluorescent tube, a high cistern with
//    a pull chain, a toilet-paper roll, a brass hook with a lucky horseshoe, a small high window onto the night.
//  S1  B97  180.18  [hard cut in on the downbeat]  WIDE. Oppa (tux, shades) on the toilet, feet dangling, the phone on
//      his lap in both fists, its light on his grin; he bobs on the off-beats.
//      reads 180.2-181.4 the place and the situation · 181.43 his right fist winds up · 181.77 JAB (replay): the HUD
//      bounces (a view) · -182.0 he wiggles, pleased with himself.
//  S2  B98  182.00  [cut in]  CLOSE-UP. His shades reflect the phone: a tiny glowing screen in each lens with a tiny
//      Oppa galloping. 182.0-182.7 the reflection · 182.7-183.2 a giggle (laugh, blush) · 183.04 the reflection shows
//      the replay arrow · 183.25 the fist winds up · 183.59 JAB · the HUD bounces, the clip restarts.
//  S3  B99  183.82  [cut to what he sees]  INSERT: the phone screen, big. The clip: tiny Oppa on a golden stage doing
//      the gallop, then the lasso; the progress bar fills. 185.04 the clip ends, the replay arrow. 185.41 (the
//      strongest accent) a tap ripple: replay; the HUD bounces.
//  S4  B100 185.64  [cut back to the stall, closer]  He can't help it: a SEATED LASSO on the toilet (the phone in the
//      reins fist, the other arm swinging the lasso), bouncing on the seat, feet kicking, the chain swinging.
//      187.23 JAB again; the HUD bounces... and flies up into the middle of the frame, growing, as the stall darkens:
// B. THE SKY COUNTER: the city at night.
//  S5  B101 187.45  [match cut: the HUD becomes the giant counter in the sky]  the counter over the skyline, glowing,
//      searchlights on it, 2,14x,xxx,xxx, its low wheels a blur. 187.85-190.55 the camera cranes down past the lit
//      towers to the street: a crowd of Clawds FROZEN mid-dance (gallop, lasso, disco, V-arms), all staring up at it.
//      THE HORSE among them. reads: the counter 187.45-188.4 · the skyline 188.4-189.4 · the frozen crowd 189.4-191.1
//  S6  B103 191.09  [cut in]  MEDIUM on the crowd: frozen mid-move, eyes wide and up, trembling. The Horse, deadpan,
//      chewing; 191.85 its eye slides to us; 192.3 a slow blink; 192.75 back to the front.
// C. THE TENSION (bars 104-105): the cutting accelerates, beats then eighths; every tick is a cut.
//  S7  B104 192.91  COUNTER: push in on the last wheels (...61x spinning down)
//  S8  193.36       FACES: three frozen Clawds, eyes wide (HUD)
//  S9  193.82       GRIN: Oppa, fist hovering over the phone, tapping the air on the eighths, grinning, unaware
//  S10 TK1 194.03 COUNTER 641 · S11 TK2 FACES 642 (eyes wider) · S12 TK3 GRIN 643 (closer) · S13 TK4 COUNTER 644
//  S14 TK5 194.94 FACES 645: the Horse, big, deadpan... one sweat drop
//  S15 TK6 195.16 SPLIT SCREEN: the counter (646) over Oppa (hovering). 195.39: 647 = MAX, the counter flares; on his
//      phone the clip ends (the replay arrow in his shades); his fist freezes... draws back (the hesitation)...
//      195.54 JAB: the counter flips to -2,147,483,648 in red, a red flash, the split's gutter cracks.
// D. OVERFLOW, in the dropout (the beat is gone).
//  S16 195.63  THE RED NUMBER, held: -2,147,483,648 over a red sky; it cracks from the impact, sags, sheds shards; the
//      searchlights die; small glitch spasms.
//  S17 195.92  THE WORLD GLITCHES: the frozen crowd in red light, stuttering and slicing (GLITCH spasms, corrupt
//      colour blocks), with one-frame flashes of the stall (Oppa still grinning, the window red) and the phone
//      (cracked, the tiny dancer frozen mid-gallop).
//  S18 196.19  COLLAPSE: the red counter's picture squeezes to a line, then a dot (a screen switching off)
//  S19 196.30  BLACK: the red counter flickers in the centre, then holds.
//  SEAM OUT 196.545: BLACK + viewCounter(t, { x: 960, y: 540, h: 160, glitch: .5 }); c13 opens on the same frame.
// ================================================================================================================
(() => {
  const PI = Math.PI;
  const B = k => barT(k);
  const TK = k => 193.8 + k * EIGHTH;                        // counter.js's tension ticks: TK(1) = ...641 ... TK(7) = ...647
  const TICKS = [1, 2, 3, 4, 5, 6, 7].map(TK);
  const PRESS = [181.773, 183.591, 185.409, 187.227];       // the replay jabs, on the breakdown's off-beat accents
  const CLIP = 1.45;                                         // the clip on his phone (s)
  const BLACK = '#100C14';
  const HAND = '#DC7B58';
  const T_RED = 195.63, T_WORLD = 195.92, T_COL = 196.19, T_BLK = 196.30;
  // restroom marks (world): back wall x L..R, floor line F, the seat line, Oppa's unit, the vanishing point
  const RR = { L: 450, R: 1470, F: 880, seat: 706, x: 960, u: 30, vp: [960, 520] };
  // Oppa's right-arm poses [angle, armLen] around the phone on his lap (the left fist holds it)
  const A = { hold: [PI + .527, 1.95], holdL: [PI + .484, 2.1], hover: [PI + .253, 1.9], press: [PI + .431, 2.18], wind: [1.899, 1.2] };
  // the city: the counter (world x, y, h)
  const CT = { x: 960, y: -120, h: 200 };

  // ---------------------------------------------------------------- helpers
  const bump = (t, times) => { let b = 0; for (const m of times) { const a = t - m; if (a >= 0 && a < .6) b = Math.max(b, Math.exp(-a * 6) * Math.sin(a * 22 + .3)); } return b; };
  const MS = MILESTONES.map(m => m[0]);
  function hud(t, o = {}) { counterHUD(t, { pop: Math.max(bump(t, PRESS), bump(t, MS), .7 * bump(t, TICKS)), ...o }); }
  // the clip on the phone: { vt, len, ended, s }
  function clip(t) {
    if (t >= 192.0) { const s = 192.0, len = TK(7) - s; return { vt: t - s, len, ended: t >= TK(7), s }; }
    let s = 179.95; for (const p of PRESS) if (t >= p) s = p;
    return { vt: t - s, len: CLIP, ended: t - s >= CLIP, s };
  }
  // a quiet seated groove: a little lift on each off-beat accent
  function grooveSeat(t, k = 1) {
    const f = frac(bpOf(t) - .5), lift = Math.sin(PI * clamp(f / .55));
    const bp = bpOf(t), side = Math.floor(bp) % 2 ? 1 : -1;
    return { dy: -.1 * k * lift, sq: .05 * k * Math.exp(-f * 8) - .02 * k * lift, rot: .018 * k * side * lift,
      legLift: side > 0 ? [.25 * k * lift, .2 * k * lift, 0, 0] : [0, 0, .2 * k * lift, .25 * k * lift] };
  }
  // the replay JAB at P: the right fist winds up beside his head and comes down on the phone
  function jab(t, P, from = A.hold) {
    const w0 = P - .34, w1 = P - .075;
    if (t < w0 || t > P + .5) return { aR: from[0], lenR: from[1], sq: 0, dy: 0 };
    if (t < w1) { const k = ease(seg(t, w0, w1)); return { aR: lerp(from[0], A.wind[0], k), lenR: lerp(from[1], A.wind[1], k), sq: -.05 * k, dy: -.06 * k }; }
    if (t < P) { const k = easeIn(seg(t, w1, P)); return { aR: lerp(A.wind[0], A.press[0], k), lenR: lerp(A.wind[1], A.press[1], k), sq: -.05 + .05 * k, dy: -.06 + .06 * k, smear: .5 * Math.sin(PI * k) }; }
    const a = t - P, k = ease(seg(a, .1, .45));
    return { aR: lerp(A.press[0], from[0], k), lenR: lerp(A.press[1], from[1], k), sq: .1 * Math.exp(-a * 10) * Math.cos(a * 20), dy: 0 };
  }
  // the phone on his lap, its back to us (body space: drawn between his fists)
  function phoneLap(u, sw, glowK = 1, px = .2) {
    const w = 3.1 * u, h = 1.7 * u, cy = -2.35 * u;
    push(); translate(px * u, 0);
    paint(rrPts(-w / 2, cy - h / 2, w, h, .3 * u, u * .02), { wash: '#2A2533', ink: PAL.ink, sw: sw * .7 });
    paint(rrPts(-w / 2 + .22 * u, cy - h / 2 + .2 * u, .75 * u, .5 * u, .14 * u), { wash: '#3E3848', ink: PAL.ink, sw: sw * .35 });
    paint(ellPts(-w / 2 + .45 * u, cy - h / 2 + .45 * u, .13 * u, .13 * u, 8), { wash: '#15121A', ink: null });
    paint(starPts(.35 * u, cy + .1 * u, .5 * u, .3, 4), { wash: '#D97757', ink: null });          // a spark sticker
    paint(starPts(.35 * u, cy + .1 * u, .32 * u, .35, 4, -PI / 4), { wash: '#D97757', ink: null });
    if (glowK > 0) inkLine([[-w / 2 + .25 * u, cy - h / 2 - .06 * u], [w / 2 - .25 * u, cy - h / 2 - .06 * u]], sw * 1.1, mixCol('#9ED8F0', '#FFF6E0', .3), 'inkfine', 0);
    pop();
  }
  // the replay arrow: a 3/4 ring with an arrowhead
  function replayArrow(cx, cy, r, col = PAL.cream, ink = PAL.ink, sw = 1, rot = 0) {
    const P = []; for (let i = 0; i <= 14; i++) { const a = rot - PI * .5 + .25 + i / 14 * PI * 1.5; P.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); }
    paint(ribbon(P, r * .3, r * .3), { wash: col, ink, sw });
    const a1 = rot - PI * .5 + .25 + PI * 1.5, tip = [cx + Math.cos(a1) * r, cy + Math.sin(a1) * r], tx = Math.cos(a1 + PI / 2), ty = Math.sin(a1 + PI / 2);
    const nx = Math.cos(a1), ny = Math.sin(a1);
    paint([[tip[0] + nx * r * .38, tip[1] + ny * r * .38], [tip[0] - nx * r * .38, tip[1] - ny * r * .38], [tip[0] + tx * r * .45, tip[1] + ty * r * .45]], { wash: col, ink, sw });
  }
  // the phone in his shades (face space): a tiny screen in each lens, with the clip or the replay arrow
  function reflection(t, st, red = 0) {
    return (u, sw, F) => {
      for (const s of F.sides) {
        const cx = s * 2.5 * u + .08 * u, cy = -6.12 * u, w = 1.72 * u, h = 1.0 * u;
        push(); translate(cx, cy); rotate(-.07);
        boilSeed('c12 refl' + s);
        paint(rrPts(-w / 2, -h / 2, w, h, .16 * u), { wash: red > .5 ? '#E0404A' : st.ended ? '#5E6E86' : '#A9DDF0', washOp: 230, ink: null });
        if (st.ended) replayArrow(0, -.02 * u, .26 * u, PAL.cream, null, 0);
        else {
          paint(rectPts(-w / 2 + .05 * u, .2 * u, w - .1 * u, .24 * u), { wash: '#E8B45A', washOp: 220, ink: null });
          dancer('oppa', 0, .3 * u, .075 * u, 'gallop', t, { look: 'tux', noShadow: true, boilKey: 'c12 reflo' + s, mood: 'cool' });
        }
        inkLine([[-w * .42, -h * .52], [-w * .1, -h * .52]], sw * .4, '#FFFFFF', 'inkfine', 0);   // the glint
        pop();
      }
    };
  }
  // Oppa seated on the toilet. Unit u, the seat point (x, seatY) under the middle of his body; o = pose fields.
  function oppaSeated(x, seatY, u, t, o = {}) {
    const sq = o.sq || 0;
    const q = {
      look: 'tux', noShadow: true, boilKey: o.boilKey || 'c12 oppa',
      eyes: 'happy', mouth: o.mouth || 'grin', blush: o.blush ?? .35, squint: o.squint || 0,
      frontArm: o.frontArm || 'LR', aL: o.aL ?? A.holdL[0], aR: o.aR ?? A.hold[0],
      armLen: { L: o.lenL ?? A.holdL[1], R: o.lenR ?? A.hold[1] },
      armL: o.armL || fistHook(HAND, .72), armR: o.armR || fistHook(HAND, .72),
      legLift: o.legLift, dy: o.dy || 0, sq, rot: o.rot || 0, dx: o.dx || 0,
      draw: o.noPhone ? null : (uu, sw) => phoneLap(uu, sw, o.glowK ?? 1),
      face: o.face, emote: o.emote, emoteK: o.emoteK, emoteAge: o.emoteAge, smear: o.smear, smearDir: o.smearDir
    };
    member('oppa', x, seatY + 2 * u * .94 * (1 - sq), u, q);
    // the screen's light on his face (it faces him)
    if (!o.noPhone && (o.glowK ?? 1) > 0) glow(x + (o.dx || 0) * u, seatY - 4.3 * u * .94 + (o.dy || 0) * u, 4.4 * u, o.red > .5 ? '#FF8A8A' : '#BDE6FF', .38 * (o.glowK ?? 1));
  }
  // night: the stall's corners fall into darkness around the tube's pool and the phone's
  function stallNight(k, face) {
    roomLight(k, [[960, 150, 950, 1], [face[0], face[1], 360, .9]], { col: '#0C0A1E' });
  }

  // ---------------------------------------------------------------- THE RESTROOM (a single-use set)
  // Painted flat, in one-point perspective toward RR.vp: the tiled back wall, two partitions, the floor.
  const toVP = (x, y, f) => [RR.vp[0] + f * (x - RR.vp[0]), RR.vp[1] + f * (y - RR.vp[1])];
  function restroom(t, o = {}) {
    const red = clamp(o.red || 0), [a, b, c, d] = viewRect2(160), { L, R, F } = RR;
    const tint = (col, k = .5) => red > 0 ? mixCol(col, '#E0484E', red * k) : col;
    const lamp = o.lamp ?? flick(t, 5, .18);
    // the room beyond the stall, dim
    boilSeed('c12 room');
    paint(rectPts(a, b, c - a, d - b), { wash: tint('#2E3A44', .45), ink: null });
    // the back wall: mint tiles, a band of darker tiles, the light from the tube
    const top = Math.max(b, -420);
    boilSeed('c12 wall');
    paint(rectPts(L, top, R - L, F - top), { wash: tint('#A9C9BC'), ink: null });
    paint(ellPts(960, 330, 600, 520, 26), { fill: tint('#E4F4EA'), fillOp: 90 * lamp, bleed: .25, tex: .4, ink: null });
    paint(rectPts(L, 466, R - L, 44), { wash: tint('#72A697'), ink: null });
    const gx0 = Math.max(L, a), gx1 = Math.min(R, c), gy0 = Math.max(top, b), gy1 = Math.min(F, d);
    for (let x = L + 68; x < R; x += 68) if (x > a && x < c) { boilSeed('c12 gx' + x); inkLine([[x, gy0], [x, gy1]], .42, tint('#82A698'), 'inkfine', 0); }
    for (let y = F - 68; y > top; y -= 68) if (y > b && y < d) { boilSeed('c12 gy' + y); inkLine([[gx0, y], [gx1, y]], .42, tint('#82A698'), 'inkfine', 0); }
    // the small high window onto the night (it glows red once the counter breaks)
    if (vis(540, 750) && b < 290) {
      boilSeed('c12 window');
      paint(rrPts(548, 118, 196, 150, 8), { wash: tint('#E9E4D6', .3), ink: PAL.ink, sw: .8 });
      paint(rrPts(562, 132, 168, 122, 5), { wash: mixCol('#1E2452', '#B0182E', red), ink: PAL.ink, sw: .5 });
      paint(ellPts(646, 246, 120, 34, 14), { wash: mixCol('#4A3A6A', '#E04040', red), washOp: 200, ink: null });
      for (let i = 0; i < 9; i++) { const wx = 570 + 150 * hash(i * 3.3), wy = 196 + 46 * hash(i * 5.1); paint(rectPts(wx, wy, 7, 10), { wash: red > .3 ? '#FF7A6A' : '#FFD98A', ink: null }); }
      for (let i = 0; i < 4; i++) { const sx = 575 + 150 * hash(i * 7.7), sy = 142 + 40 * hash(i * 2.1); paint(starPts(sx, sy, 4, .3, 4), { wash: '#FFF4D8', ink: null }); }
      inkLine([[646, 132], [646, 254]], .8, PAL.ink, 'ink', 0);
      if (red > .05) glow(646, 190, 360, '#FF3030', red);
    }
    // the high cistern, the pipe, the pull chain (it swings)
    boilSeed('c12 cistern');
    paint(rectPts(946, 326, 28, 380), { wash: tint('#C4CBD0', .3), fill: '#9AA3AA', fillOp: 60, tex: .5, ink: PAL.ink, sw: .6 });
    inkLine([[953, 330], [953, 690]], .5, '#F4F8FA', 'inkfine', 0);
    paint(rrPts(846, 228, 228, 102, 14), { wash: tint('#F1EEE4', .3), fill: '#D6D0C0', fillOp: 70, tex: .5, ink: PAL.ink, sw: .9 });
    paint(rectPts(840, 222, 240, 16), { wash: tint('#E6E2D6', .3), ink: PAL.ink, sw: .6 });
    inkLine([[1066, 262], [1102, 252]], 1.6, '#9AA3AA', 'ink', 0);
    const ch = o.chain ?? (.06 * Math.sin(t * 2.3) + .05 * ring(t, PRESS, 5, 11)), cx0 = 1100, cy0 = 256, clen = 290;
    const cend = [cx0 + Math.sin(ch) * clen, cy0 + Math.cos(ch) * clen];
    boilSeed('c12 chain');
    inkLine([[cx0, cy0], [lerp(cx0, cend[0], .5) + 3, lerp(cy0, cend[1], .5)], cend], 1.1, '#7A8086', 'inkfine', .3);
    paint(rrPts(cend[0] - 10, cend[1], 20, 38, 9), { wash: '#8A5A3A', ink: PAL.ink, sw: .6 });
    // the partitions (warm beige laminate), the gaps under them, the floor
    boilSeed('c12 partitions');
    for (const s of [-1, 1]) {
      const X = s < 0 ? L : R, f = 3.2, pt = toVP(X, 104, f), pb = toVP(X, 842, f), ft = toVP(X, F, f);
      paint([[X, F], ft, pb, [X, 842]], { wash: tint('#1C2026', .3), ink: null });                                  // the gap: the next stall's floor
      paint([[X, 104], pt, pb, [X, 842]], { wash: tint('#D0BE98'), fill: '#B8A47C', fillOp: 70, tex: .5, bleed: .03, ink: null });
      paint(ellPts(lerp(X, pt[0], .45), 420, 150, 300, 16), { fill: '#EFE4C8', fillOp: 60, bleed: .2, tex: .4, ink: null });
      inkLine([[X, 104], toVP(X, 104, 1.9)], 1.1, PAL.ink, 'ink', 0);
      inkLine([[X, 842], toVP(X, 842, 1.9)], 1.1, PAL.ink, 'ink', 0);
      inkLine([[X, 104], [X, 842]], .9, mixCol('#8A7650', PAL.ink, .3), 'inkfine', 0);
    }
    boilSeed('c12 floor');
    paint([[L, F], [R, F], toVP(R, F, 3.2), toVP(L, F, 3.2)], { wash: tint('#C0C7C0'), fill: '#A8B0A8', fillOp: 60, tex: .6, bleed: .03, ink: null });
    for (let x = L + 68; x < R; x += 68) { boilSeed('c12 fl' + x); const e = toVP(x, F, 2.2); inkLine([[x, F], e], .4, '#949C94', 'inkfine', 0); }
    for (const f of [1.12, 1.3, 1.6, 2.1]) { const y = RR.vp[1] + f * (F - RR.vp[1]); if (y > b && y < d) { boilSeed('c12 fh' + f); inkLine([toVP(L, F, f), toVP(R, F, f)], .4, '#949C94', 'inkfine', 0); } }
    inkLine([[L, F], [R, F]], .8, PAL.ink, 'inkfine', 0);
    // the toilet-paper roll (on the right partition)
    { const [hx, hy] = toVP(R, 640, 1.42), s = 1.42; if (vis(hx - 120, hx + 120)) {
      boilSeed('c12 roll');
      paint(rrPts(hx - 70 * s, hy - 10 * s, 110 * s, 14 * s, 5), { wash: '#C8CED4', ink: PAL.ink, sw: .6 });
      paint(rrPts(hx - 58 * s, hy - 6 * s, 84 * s, 64 * s, 26 * s), { wash: tint('#FBF7EE', .3), fill: '#E6E0D2', fillOp: 70, ink: PAL.ink, sw: .8 });
      paint([[hx - 50 * s, hy + 40 * s], [hx + 8 * s, hy + 40 * s], [hx + 12 * s, hy + 120 * s + 6 * Math.sin(t * 1.7)], [hx - 46 * s, hy + 118 * s + 6 * Math.sin(t * 1.7 + .6)]], { wash: tint('#FBF7EE', .3), ink: PAL.ink, sw: .6 });
      inkLine([[hx - 44 * s, hy + 70 * s], [hx + 4 * s, hy + 70 * s]], .4, '#CFC7B4', 'inkfine', 0);
    } }
    // the brass hook on the left partition, a lucky horseshoe hanging from it
    { const [hx, hy] = toVP(L, 330, 1.42), s = 1.42, sw_ = .06 * Math.sin(t * 1.9) + .06 * ring(t, PRESS, 5, 9); if (vis(hx - 80, hx + 80)) {
      boilSeed('c12 hook');
      paint(rrPts(hx - 10 * s, hy - 14 * s, 20 * s, 26 * s, 5), { wash: '#C99A45', ink: PAL.ink, sw: .6 });
      inkLine([[hx, hy], [hx + 4 * s, hy + 16 * s], [hx + 14 * s, hy + 14 * s]], 2.2, '#C99A45', 'ink', .5);
      push(); translate(hx + 10 * s, hy + 16 * s); rotate(sw_);
      const U = []; for (let i = 0; i <= 12; i++) { const q = PI * .15 + i / 12 * PI * 1.7; U.push([Math.cos(q + PI / 2) * 22 * s, 30 * s + Math.sin(q + PI / 2) * 24 * s]); }
      paint(ribbon(U, 11 * s, 11 * s), { wash: '#9AA0A8', fill: '#6A7078', fillOp: 60, ink: PAL.ink, sw: .6 });
      for (let i = 0; i < 5; i++) { const q = PI * .3 + i / 4 * PI * 1.4; paint(ellPts(Math.cos(q + PI / 2) * 22 * s, 30 * s + Math.sin(q + PI / 2) * 24 * s, 2 * s, 2 * s, 6), { wash: PAL.ink, ink: null }); }
      pop();
    } }
    // the toilet bowl and the seat (Oppa sits on it; his legs dangle in front of the bowl)
    boilSeed('c12 bowl');
    paint(ellPts(960, F + 6, 170, 16, 18), { wash: tint('#8E968E'), ink: null });
    paint([[830, 712], [1090, 712], [1082, 760], [1040, 812], [1022, 880], [898, 880], [880, 812], [838, 760]], { wash: tint('#F4F1E8', .3), fill: '#D8D2C2', fillOp: 70, tex: .5, bleed: .02, ink: PAL.ink, sw: .9, curv: .35 });
    paint(rrPts(978, 760, 22, 70, 10), { wash: '#FFFFFF', washOp: 160, ink: null });
    paint(rrPts(812, 696, 296, 20, 9), { wash: tint('#FBF9F2', .3), ink: PAL.ink, sw: .8 });
    // the fluorescent tube's light (off the top of the frame)
    glow(960, -40, 820, '#E4FFF2', .3 * lamp);
  }

  // ---------------------------------------------------------------- THE PHONE CLIP (the insert)
  // The clip on the phone screen, drawn straight into the screen rect: a golden stage, tiny Oppa dancing.
  function phoneClip(t, S, st, o = {}) {   // S = [x, y, w, h] the screen rect
    const [x, y, w, h] = S;
    boilSeed('c12 clip bg');
    paint(rrPts(x, y, w, h, 40), { wash: '#F1C46C', ink: null });
    paint(ellPts(x + w / 2, y + h * .42, w * .42, h * .5, 24), { fill: '#FFE6A6', fillOp: 120, bleed: .2, tex: .4, ink: null });
    paint(rectPts(x + 12, y + h * .72, w - 24, h * .28 - 12), { wash: '#C98E54', fill: '#A8703E', fillOp: 70, tex: .6, ink: null });
    for (let i = 0; i < 5; i++) { boilSeed('c12 clip rail' + i); inkLine([[x + 30, y + h * .72 + 14 + i * i * 7], [x + w - 30, y + h * .72 + 16 + i * i * 7]], .5, '#9A6A3A', 'inkfine', .2); }
    glow(x + w / 2, y + h * .45, w * .35, '#FFF2C8', .35);
    // tiny Oppa: the chorus, the gallop then the lasso (the clip's beat is the song's beat)
    const ou = h * .052, keys = [[st.s, 'gallop'], [st.s + st.len * .55, 'lasso']];
    dancer('oppa', x + w / 2, y + h * .8, ou, keys, o.freeze != null ? o.freeze : t, { look: 'tux', mood: 'cool', boilKey: 'c12 clip oppa' });
  }
  // the insert: the phone screen filling the frame. o.tapAge = seconds since the tap, o.freeze = a frozen clip time
  function phoneInsert(t, st, o = {}) {
    const [a, b, c, d] = viewRect2(100);
    // behind it, out of focus: the tiled wall
    boilSeed('c12 ins bg');
    paint(rectPts(a, b, c - a, d - b), { wash: o.red ? '#6A2A30' : '#5E7C72', ink: null });
    for (let i = 0; i < 5; i++) { boilSeed('c12 ins tile' + i); paint(rectPts(a - 40 + i * 470, b - 40, 16, d - b + 80), { wash: o.red ? '#7A3A3A' : '#6E8E84', ink: null }); }
    paint(ellPts(960, 60, 1100, 260, 20), { fill: o.red ? '#C04040' : '#9ACAB8', fillOp: 90, bleed: .3, tex: .3, ink: null });
    // the phone (its bottom runs off the frame: his fists are down there)
    const px = 170, py = 110, pw = 1580, ph = 1060;
    boilSeed('c12 ins phone');
    paint(rrPts(px, py, pw, ph, 96), { wash: '#221E2A', ink: PAL.ink, sw: 1.4 });
    inkLine([[px + 100, py + 12], [px + pw - 100, py + 12]], 1, '#5A5466', 'inkfine', 0);
    const S = [px + 64, py + 62, pw - 128, 820];
    phoneClip(t, S, st, o);
    // dimmed + the replay arrow once the clip has ended; the tap ripple
    if (st.ended || (o.tapAge != null && o.tapAge < .2)) {
      const dim = st.ended ? 1 : clamp(1 - o.tapAge / .2);
      boilSeed('c12 ins dim');
      paint(rrPts(S[0], S[1], S[2], S[3], 40), { wash: '#1A1626', washOp: 150 * dim, ink: null });
      const sq = o.tapAge != null && o.tapAge < .15 ? 1 - .15 * Math.sin(PI * o.tapAge / .15) : 1;
      replayArrow(S[0] + S[2] / 2, S[1] + S[3] / 2 - 20, 105 * sq * (st.ended ? backOut(seg(st.vt - st.len, 0, .25)) : 1), PAL.cream, PAL.ink, 1.2);
    }
    if (o.tapAge != null && o.tapAge >= 0 && o.tapAge < .5) {
      const k = o.tapAge / .5;
      for (let r = 0; r < 2; r++) { const kk = clamp(k * 1.3 - r * .25); if (kk <= 0 || kk >= 1) continue; boilSeed('c12 ripple' + r);
        const P = ellPts(S[0] + S[2] / 2, S[1] + S[3] / 2 - 20, 120 + 260 * kk, 120 + 260 * kk, 32); P.push(P[0]); inkLine(P, 3 * (1 - kk), PAL.cream, 'ink', .5); }
    }
    // the progress bar
    const pk = clamp(st.vt / st.len), bx = S[0] + 50, bw = S[2] - 100, by = S[1] + S[3] - 34;
    boilSeed('c12 ins bar');
    paint(rrPts(bx, by - 5, bw, 10, 5), { wash: '#8A8494', washOp: 220, ink: null });
    if (pk > .01) paint(rrPts(bx, by - 5, bw * pk, 10, 5), { wash: '#E0483E', ink: null });
    paint(ellPts(bx + bw * pk, by, 14, 14, 12), { wash: '#F4E8E0', ink: PAL.ink, sw: .6 });
    inkLine(rrPts(S[0], S[1], S[2], S[3], 40).concat([[S[0] + 40, S[1]]]), 1.2, PAL.ink, 'ink', 0);
    glow(960, 480, 900, '#FFE8C0', .12);
  }

  // ---------------------------------------------------------------- THE CITY AT NIGHT (a single-use set)
  // The frozen crowd, in three rows: [name, v, x, y, u, move, beat phase, extra]. Everyone was dancing; everyone
  // stopped mid-move to stare up at the counter. THE HORSE stands in a clear gap in the middle row.
  const CROWD = [
    ['commuter', 1, 170, 918, 16, 'gallop', .5, {}],
    ['dancer', 1, 560, 914, 16, 'vArms', .45, {}],
    ['crowd', 2, 1660, 916, 16, 'lasso', .55, {}],
    ['commuter', 4, 2080, 920, 16, 'disco', .1, {}],
    ['dancer', 2, 330, 974, 20, 'lasso', .55, {}],
    ['commuter', 3, 770, 978, 20, 'gallop', .5, {}],
    ['crowd', 4, 1540, 972, 20, 'pointup', .3, {}],
    ['grandpa', 0, 1900, 980, 20, 'gallop', .45, {}],
    ['granny', 1, 520, 1044, 24, 'disco', .08, {}],
    ['crowd', 7, 880, 1050, 24, 'gallop', .55, {}],
    ['commuter', 5, 1660, 1046, 24, 'vArms', .45, {}],
    ['dancer', 0, 2090, 1040, 24, 'lasso', .6, {}]
  ];
  const HORSE = { x: 1190, y: 976, s: 15 };
  const frozenT = (i, ph) => OFF + (400 + 2 * i + ph) * BEAT;     // a fixed moment inside the move: its pose, frozen
  function frozenCrowd(t, o = {}) {
    const [a, , c] = viewRect2(300), st = o.stutter || 0, f = Math.floor(t * 24);
    const items = CROWD.map((r, i) => ({ r, i })).sort((p, q) => p.r[3] - q.r[3]);
    let horseDone = false;
    for (const { r, i } of items) {
      const [name, v, x, y, u, mv, ph, ex] = r;
      if (!horseDone && y > HORSE.y) { drawHorse(t, o); horseDone = true; }
      if (x + 7 * u < a || x - 7 * u > c) continue;
      boilSeed('c12 cshadow' + i);
      paint(ellPts(x, y + 3, 5.2 * u, .8 * u, 14), { wash: '#141224', washOp: 170, ink: null });
      const jolt = st && hash(i * 7.3 + f) < st;
      const tf = frozenT(i, ph) + (jolt ? .12 : 0);
      const tremble = .025 * Math.sin(t * 37 + i * 2.1) + (o.shake || 0) * (hash(i + f * 1.3) - .5);
      dancer(name, x + (jolt ? (hash(i + f) - .5) * 40 : 0), y, u, mv, tf, { v, ...ex, eyes: o.eyes || 'wide', mouth: o.mouth || 'o', lookY: -1, lookX: clamp((CT.x - x) / 1200, -1, 1),
        dx: tremble, noShadow: true, boilKey: 'c12 crowd' + i, seed: i * 1.7 });
    }
    if (!horseDone) drawHorse(t, o);
  }
  function drawHorse(t, o = {}) {
    if (!vis(HORSE.x - 150, HORSE.x + 220)) return;
    boilSeed('c12 hshadow');
    paint(ellPts(HORSE.x, HORSE.y + 3, 8.4 * HORSE.s, 1 * HORSE.s, 16), { wash: '#141224', washOp: 170, ink: null });
    horse(HORSE.x, HORSE.y, HORSE.s, t, { mood: 'deadpan', chew: 1, blink: 3.3, boilKey: 'c12 thehorse', ...(o.horseLook || {}) });
  }
  function city(t, o = {}) {
    const [a, b, c, d] = viewRect2(260), red = clamp(o.red || 0), dead = clamp(o.dead || 0);
    const R = (col, k = .75) => red > 0 ? mixCol(col, '#5A0612', red * k) : col;
    // the night sky, the city's glow low on the horizon
    boilSeed('c12 sky');
    paint(rectPts(a, b, c - a, 930 - b), { wash: R('#171A40'), ink: null });
    paint(ellPts(960, 860, 2400, 560, 30), { fill: R('#3A3474'), fillOp: 150, bleed: .25, tex: .4, ink: null });
    paint(ellPts(960, 900, 1900, 250, 30), { fill: red > 0 ? mixCol('#8A5A8A', '#B0202E', red) : '#8A5A8A', fillOp: 110, bleed: .3, tex: .3, ink: null });
    for (let i = 0; i < 48; i++) {                               // stars, twinkling
      const x = -800 + 3500 * hash(i * 3.1), y = -880 + 1140 * hash(i * 5.7); if (x < a || x > c || y < b || y > d) continue;
      boilSeed('c12 star' + i); const tw = .6 + .4 * Math.sin(t * (2 + 3 * hash(i)) + i);
      paint(starPts(x, y, (3 + 4 * hash(i * 9.1)) * tw, .3, 4), { wash: red > .5 ? '#FF9A8A' : '#FFF4D8', ink: null });
    }
    // the counter's halo and the searchlights on it
    glow(CT.x, CT.y, 1150, red > .5 ? '#FF2020' : '#FFD49A', (red > .5 ? .6 : .5) * (1 - dead * .4));
    const beams = o.noBeams ? 0 : 1 - dead;
    if (beams > .02) for (let i = 0; i < 4; i++) {
      if (dead > 0 && hash(i * 3.3 + Math.floor(t * 24)) < dead * 1.4) continue;
      const bx = [120, 700, 1260, 1840][i], by = 760, sway = 90 * Math.sin(t * .7 + i * 1.9);
      boilSeed('c12 beam' + i);
      paint([[bx - 10, by], [bx + 10, by], [CT.x + sway + 90 + (i - 1.5) * 160, CT.y + 60], [CT.x + sway - 90 + (i - 1.5) * 160, CT.y + 60]], { fill: red > .5 ? '#FF6A5A' : '#FFF0C0', fillOp: 34 * beams, bleed: .05, tex: .2, ink: null });
    }
    // THE COUNTER
    viewCounter(t, { world: true, x: CT.x + (o.cdx || 0), y: CT.y + (o.cdy || 0), h: CT.h, pop: o.pop || 0, glitch: o.glitch, rot: o.crot });
    if (o.after) o.after();
    // the far towers
    for (let i = -7; i < 26; i++) {
      const x = i * 150 + 50 * hash(i * 1.7), w = 100 + 50 * hash(i * 2.3), h = 300 + 330 * hash(i * 3.1), y = 900;
      if (x + w < a || x > c || y - h > d) continue;
      boilSeed('c12 ft' + i);
      paint(rectPts(x, y - h, w, h), { wash: R('#2A2D5C'), ink: null });
      if (hash(i * 8.8) > .6) { const bl = Math.sin(t * 3 + i) > 0; paint(ellPts(x + w / 2, y - h - 8, 5, 5, 8), { wash: bl ? '#FF5A4A' : '#6A2A3A', ink: null }); inkLine([[x + w / 2, y - h], [x + w / 2, y - h - 8]], .6, '#0C0A18', 'inkfine', 0); }
    }
    // the near towers, with lit windows (they die in blocks as the glitch spreads)
    for (let i = -6; i < 20; i++) {
      const x = i * 200 + 70 * hash(i * 4.1) - 60, w = 140 + 70 * hash(i * 5.3), h = 200 + 400 * hash(i * 6.7), y = 910;
      if (x + w < a || x > c || y - h > d) continue;
      boilSeed('c12 nt' + i);
      paint(rectPts(x, y - h, w, h), { wash: R('#1A1934'), ink: '#0C0A18', sw: .6 });
      const cols = Math.max(2, Math.floor((w - 20) / 32)), rows = Math.floor((h - 30) / 46);
      for (let r = 0; r < rows; r++) for (let cc = 0; cc < cols; cc++) {
        const hh = hash(i * 97 + r * 13.1 + cc * 7.7); if (hh < .58) continue;
        if (dead > 0 && hash(i * 5 + Math.floor(r / 3) * 3.3 + Math.floor(cc / 2) * 1.1) < dead) continue;
        paint(rectPts(x + 12 + cc * 32, y - h + 18 + r * 46, 14, 20), { wash: red > .4 ? '#FF6A5A' : hh > .92 ? '#BFE8FF' : '#FFD98A', ink: null });
      }
    }
    // the street: a pavement edge, lamps
    boilSeed('c12 street');
    paint(rectPts(a - 50, 900, c - a + 100, d - 900 + 50), { wash: R('#2A2840'), ink: null });
    paint(rectPts(a - 50, 900, c - a + 100, 22), { wash: R('#4A4660'), ink: null });
    inkLine([[a - 50, 922], [c + 50, 922]], .7, '#0C0A18', 'inkfine', 0);
    for (let k = -3; k < 9; k++) {
      const lx = k * 520 + 100; if (lx < a - 100 || lx > c + 100) continue;
      boilSeed('c12 lamp' + k);
      paint(rectPts(lx - 6, 560, 12, 350), { wash: '#3A3650', ink: PAL.ink, sw: .5 });
      paint(rrPts(lx - 34, 548, 68, 20, 8), { wash: '#4A4660', ink: PAL.ink, sw: .5 });
      if (dead < .8) { paint(ellPts(lx, 570, 22, 8, 10), { wash: '#FFE8B0', ink: null }); glow(lx, 600, 260, '#FFD890', .45 * (1 - dead)); }
    }
    glow(960, 1000, 1300, red > .5 ? '#FF3030' : '#FFCF90', red > .5 ? .3 : .22);   // the counter's light on the crowd
    if (o.crowd !== false) frozenCrowd(t, o);
  }

  // ---------------------------------------------------------------- SHOTS
  // A. the restroom
  function s1(t, lt, dur) {
    const P = PRESS[0], j = jab(t, P), g = grooveSeat(t), hit = t > P ? Math.exp(-(t - P) * 16) : 0, sh = shakeXY(t, 6 * hit);
    camBegin(960 + sh[0], 560 + sh[1] - 18 * ease(lt / dur), 1.14 + .05 * ease(lt / dur));
    restroom(t);
    const wig = t > P + .05 ? .06 * Math.exp(-(t - P) * 3) * Math.sin((t - P) * 26) : 0;
    oppaSeated(RR.x, RR.seat, RR.u, t, { ...g, dx: wig, aR: j.aR, lenR: j.lenR, sq: g.sq + j.sq, dy: g.dy + (j.dy || 0), smear: j.smear, smearDir: -1, blush: .35 + .25 * hit });
    stallNight(.34, [RR.x, RR.seat - 120]);
    camEnd();
    hud(t);
  }
  function s2(t, lt, dur) {
    const P = PRESS[1], st = clip(t), j = jab(t, P);
    const m = mood('oppa', t, [[B(98), 'happy'], [182.72, 'laugh'], [183.2, 'happy']], { take: .5 });
    const zoom = 2.55 + .12 * ease(lt / dur);
    camBegin(960, RR.seat - 150, zoom);
    restroom(t);
    const [sx, sy] = toScreen(RR.x, RR.seat);
    camEnd();
    const g = grooveSeat(t, .7), u = RR.u * zoom;
    oppaSeated(sx, sy, u, t, { ...g, aR: j.aR, lenR: j.lenR, sq: g.sq + j.sq + (m.sq || 0) * .5, dy: g.dy + (j.dy || 0) + (m.dy || 0) * .3,
      mouth: m.mouth === 'laugh' ? 'laugh' : 'grin', blush: Math.max(.35, m.blush || 0), smear: j.smear, smearDir: -1, face: reflection(t, st), boilKey: 'c12 oppa close' });
    stallNight(.3, [sx, sy - 4 * u]);
    hud(t);
  }
  function s3(t, lt, dur) {
    const st = clip(t), P = PRESS[2], tapAge = t >= P ? t - P : null;
    camBegin(960, 560, 1 + .03 * ease(lt / dur));
    phoneInsert(t, st, { tapAge });
    camEnd();
    hud(t);
  }
  function s4(t, lt, dur) {
    const P = PRESS[3], Ls = dance('lasso', t, { hand: HAND, sleeve: GP.tux }), f = beatPh(t);
    const hop = Math.sin(PI * f), land = Math.exp(-f * 9), lead = beatIx(t) % 2 ? 1 : -1;
    const jabbing = t > P - .34 && t < P + .5, j = jab(t, P, [Ls.aR, Ls.armLen.R]);
    const hit = t > P ? Math.exp(-(t - P) * 16) : 0, sh = shakeXY(t, 6 * hit);
    camBegin(960 + sh[0] + 14 * Math.sin(lt * .8), 575 + sh[1], 1.42 + .05 * ease(lt / dur));
    restroom(t, { chain: .22 * Math.sin((t - OFF) / BEAT * PI) });
    oppaSeated(RR.x, RR.seat, RR.u, t, {
      frontArm: 'L', aL: A.holdL[0] - .06 * hop, lenL: A.holdL[1],
      aR: jabbing ? j.aR : Ls.aR, lenR: jabbing ? j.lenR : Ls.armLen.R, armR: jabbing ? fistHook(HAND, .72) : Ls.armR,
      dy: -.32 * hop, sq: .11 * land - .04 * hop + (j.sq || 0), rot: .025 * lead * hop, dx: .06 * lead * hop,
      legLift: lead > 0 ? [.55 * hop, .45 * hop, 0, 0] : [0, 0, .45 * hop, .55 * hop],
      mouth: 'laugh', blush: .6, emote: 'music', emoteK: seg(lt, .3, .6), emoteAge: lt
    });
    stallNight(.3, [RR.x, RR.seat - 120]);
    camEnd();
    // the HUD flies up into the sky and grows: it becomes the giant counter of the next shot
    const k = easeIn(seg(t, B(101) - .42, B(101)));
    if (k <= 0) hud(t);
    else {
      boilSeed('c12 dim'); paint(rectPts(-40, -40, W + 80, H + 80), { wash: '#0C0A18', washOp: 170 * k, ink: null });
      const V = VIEWCOUNT(t), aw = (150 + 64 * V.str.length + 24 * Math.floor((V.str.length - 1) / 3) + 52 + 40) * (64 / 120);
      viewCounter(t, { x: lerp(W - 36 - aw / 2, 960, k), y: lerp(58, 330, k), h: lerp(64, 190, k), pop: bump(t, PRESS) * (1 - k) });
    }
  }
  // B. the city
  function s5(t, lt, dur) {
    const k = ease(seg(t, 187.85, 190.55));
    camBegin(lerp(960, 1000, k) + 24 * Math.sin(lt * .5) * k, lerp(CT.y + 210 / .95, 480, k), lerp(.95, .72, k));
    city(t);
    camEnd();
  }
  function s6(t, lt, dur) {
    const k = ease(lt / dur);
    camBegin(lerp(1110, 1185, k), lerp(852, 842, k), 1.42 + .07 * k);
    const look = t > 191.85 && t < 192.75 ? 'camera' : undefined;
    city(t, { horseLook: { look, blink: .531 } });   // blink seed .531: one slow blink at 192.3
    camEnd();
    hud(t);
  }
  // C. the tension
  function counterShot(t, lt, o = {}) {   // the counter close: o.z (zoom), o.x (world x to centre), pushing in
    const z = o.z * (1 + .06 * ease(lt / (o.dur || .25))), tick = o.tick != null ? Math.exp(-Math.max(0, t - o.tick) * 12) : 0, sh = shakeXY(t, 10 * tick);
    camBegin(o.x + sh[0], CT.y + 10 + sh[1], z);
    city(t, { crowd: false, pop: .8 * tick, noBeams: o.noBeams });
    camEnd();
    if (tick > .02) flash(.22 * tick, '#FFE6B8');
  }
  function facesShot(t, lt, set) {       // close-ups of the frozen crowd, lit from above by the counter
    const tick = Math.exp(-Math.max(0, lt) * 10);
    boilSeed('c12 faces bg');
    paint(rectPts(-40, -40, W + 80, H + 80), { wash: '#1A1836', ink: null });
    paint(ellPts(960, 1180, 1500, 420, 24), { fill: '#2E2A4E', fillOp: 140, bleed: .2, tex: .4, ink: null });
    for (let i = 0; i < 10; i++) glow(90 + 200 * i + 60 * hash(i * 2.2), 150 + 320 * hash(i * 3.7), 70 + 50 * hash(i), hash(i) > .5 ? '#FFD98A' : '#8AB8E8', .5);   // city lights, out of focus
    glow(960, -160, 1400, '#FFD49A', .6 + .35 * tick);
    set(t, tick);
    glow(960, -60, 900, '#FFE8C0', .22 * tick);
    hud(t);
  }
  function grinShot(t, lt, o = {}) {       // Oppa close, his fist hovering over the phone, tapping the air on the eighths
    const zoom = o.zoom || 2.4, st = clip(t);
    camBegin(960, RR.seat - 150 + (o.dyCam || 0), zoom);
    restroom(t, { red: o.red || 0 });
    const [sx, sy] = toScreen(RR.x + (o.dxW || 0), RR.seat);
    camEnd();
    const u = RR.u * zoom, e8 = frac((t - OFF) / EIGHTH), tap = o.still ? 0 : Math.sin(PI * clamp(e8 / .6));
    const hov = o.hand || { aR: A.hover[0] + .06 * tap, lenR: A.hover[1] + .05 * tap };
    oppaSeated(sx, sy, u, t, { aR: hov.aR, lenR: hov.lenR, dy: -.05 * tap + (hov.dy || 0), sq: .03 * Math.exp(-e8 * 8) * (o.still ? 0 : 1) + (hov.sq || 0),
      face: reflection(t, st, o.red || 0), blush: .45, boilKey: 'c12 oppa grin', smear: hov.smear, smearDir: -1, red: o.red });
    stallNight(o.red ? .45 : .3, [sx, sy - 4 * u]);
  }
  const s7 = (t, lt) => counterShot(t, lt, { z: 1.8, x: 1270, dur: .45 });
  const s10 = (t, lt) => counterShot(t, lt, { z: 2.25, x: 1330, tick: TK(1) });
  const s13 = (t, lt) => counterShot(t, lt, { z: 2.7, x: 1400, tick: TK(4) });
  const s8 = (t, lt) => facesShot(t, lt, (t, tick) => {
    dancer('commuter', 470, 1180, 58, 'gallop', frozenT(0, .5), { v: 1, eyes: 'wide', mouth: 'o', lookY: -1, lookX: .3, dx: .02 * Math.sin(t * 37), noShadow: true, boilKey: 'c12 f1' });
    dancer('granny', 1000, 1230, 62, 'disco', frozenT(1, .08), { v: 0, eyes: 'wide', mouth: 'o', lookY: -1, dx: .02 * Math.sin(t * 41 + 1), noShadow: true, boilKey: 'c12 f2' });
    dancer('dancer', 1500, 1170, 56, 'lasso', frozenT(2, .55), { v: 2, eyes: 'wide', mouth: 'o', lookY: -1, lookX: -.3, dx: .02 * Math.sin(t * 33 + 2), noShadow: true, boilKey: 'c12 f3' });
  });
  const s11 = (t, lt) => facesShot(t, lt, (t, tick) => {
    dancer('crowd', 620, 1330, 88, 'vArms', frozenT(3, .45), { v: 4, eyes: 'scared', mouth: 'wobble', lookY: -1, lookX: .4, dx: .015 * Math.sin(t * 43), noShadow: true, boilKey: 'c12 f4', emote: 'sweat', emoteK: 1, emoteAge: t - TK(2) });
    dancer('commuter', 1360, 1300, 84, 'gallop', frozenT(5, .5), { v: 3, eyes: 'scared', mouth: 'O', lookY: -1, lookX: -.4, dx: .015 * Math.sin(t * 39 + 1), noShadow: true, boilKey: 'c12 f5' });
  });
  const s14 = (t, lt) => facesShot(t, lt, (t, tick) => {
    dancer('granny', 330, 1330, 84, 'lasso', frozenT(6, .6), { v: 2, eyes: 'scared', mouth: 'wobble', lookY: -1, dx: .015 * Math.sin(t * 43), noShadow: true, boilKey: 'c12 f6' });
    const s = 72, ex = 1250, ey = 470;   // THE Horse, big: its eye at (ex, ey)
    horse(ex - 8.8 * s, ey + 15.8 * s, s, t, { mood: 'deadpan', chew: 0, blink: 1.1, boilKey: 'c12 horse close' });
    emote('sweat', ex + 1.4 * s, ey - 2.4 * s, s * .45, seg(t, TK(5) + .04, TK(5) + .14), t - TK(5));
  });
  const s9 = (t, lt) => { grinShot(t, lt, { zoom: 2.4 }); hud(t); };
  const s12 = (t, lt) => { grinShot(t, lt, { zoom: 2.9, dyCam: 20 }); hud(t); };
  // S15: the split screen. The counter above, Oppa below; 647; the hesitation; the jab.
  function s15(t, lt, dur) {
    const P = T_OVF, over = t >= P, t7 = TK(7);
    let hand;   // hover (tapping the air) -> 647: it freezes, then draws back up (the hesitation) -> the jab at P
    if (t < t7) { const e8 = frac((t - OFF) / EIGHTH), tap = Math.sin(PI * clamp(e8 / .6)); hand = { aR: A.hover[0] + .06 * tap, lenR: A.hover[1] + .05 * tap }; }
    else if (t < t7 + .04) hand = { aR: A.hover[0], lenR: A.hover[1] };
    else if (t < P - .045) { const k = ease(seg(t, t7 + .04, P - .05)); hand = { aR: lerp(A.hover[0], A.wind[0], k), lenR: lerp(A.hover[1], A.wind[1], k), dy: -.05 * k, sq: -.03 * k }; }
    else if (t < P) { const k = easeIn(seg(t, P - .045, P)); hand = { aR: lerp(A.wind[0], A.press[0], k), lenR: lerp(A.wind[1], A.press[1], k), smear: .6 }; }
    else { const a = t - P; hand = { aR: A.press[0], lenR: A.press[1], sq: .12 * Math.exp(-a * 12) }; }
    paintLayer('c12 grin', () => grinShot(t, lt, { zoom: 2.3, dyCam: -30, hand, still: true, red: over ? .7 : 0 }));
    // the top panel: the counter, whole
    const tick = Math.max(Math.exp(-Math.max(0, t - TK(6)) * 12), t >= t7 ? Math.exp(-(t - t7) * 8) : 0);
    const sh = shakeXY(t, over ? 14 * Math.exp(-(t - P) * 10) : 0);
    camBegin(CT.x + sh[0], CT.y + 276 + sh[1], 1.05);
    city(t, { crowd: false, pop: .9 * tick + (over ? 1.1 * Math.exp(-(t - P) * 10) : 0), red: over ? 1 : 0, glitch: over ? .4 : 0,
      after: over ? () => crackBurst(t - P, CT.x - 260, CT.y + 10, 1.6, 3, 10) : null });
    camEnd();
    if (t >= t7 && !over) flash(.25 * Math.exp(-(t - t7) * 14), '#FFF2C8');
    // the bottom panel, through a slanted panel window; the gutter between
    const g0 = [-40, 566], g1 = [W + 40, 478];
    showLayer('c12 grin', [[g0, g1, [W + 40, H + 40], [-40, H + 40]]]);
    boilSeed('c12 gutter');
    paint([[g0[0], g0[1] - 11], [g1[0], g1[1] - 11], [g1[0], g1[1] + 11], [g0[0], g0[1] + 11]], { wash: over ? '#1A0810' : '#F3EBDC', ink: PAL.ink, sw: 1.4 });
    if (over) { const a = t - P; flash(.42 * Math.exp(-a * 28), '#FF2A3A'); crackLine(g0, g1, a); }
  }
  // cracks bursting from an impact point (world space) over age seconds; s = scale
  function crackBurst(age, cx, cy, s = 1, seed = 1, n = 9) {
    const k = easeOut(clamp(age / .14));
    for (let i = 0; i < n; i++) {
      const ang = (i + hash(i * 3.7 + seed) * .7) / n * TAU, len = (110 + 260 * hash(i * 5.1 + seed)) * s * k;
      const P = [[cx, cy]]; let x = cx, y = cy, q = ang;
      for (let j = 1; j <= 6; j++) { q += (hash(i * 11 + j + seed) - .5) * .8; x += Math.cos(q) * len / 6; y += Math.sin(q) * len / 6 * .62; P.push([x, y]); }
      boilSeed('c12 crk' + seed + '_' + i);
      inkLine(P, 1.3 * s, '#12060A', 'ink', 0);
      inkLine(P.map(([x, y]) => [x + 1.5 * s, y + 1.2 * s]), .5 * s, '#FFD6CC', 'inkfine', 0);
      if (hash(i * 7 + seed) > .35) {
        const b0 = P[2 + Math.floor(hash(i + seed) * 3)], ba = ang + (hash(i * 9 + seed) > .5 ? .9 : -.9), bl = len * .4;
        inkLine([b0, [b0[0] + Math.cos(ba) * bl * .5, b0[1] + Math.sin(ba) * bl * .3], [b0[0] + Math.cos(ba) * bl, b0[1] + Math.sin(ba) * bl * .62]], 1 * s, '#12060A', 'ink', 0);
      }
    }
    // a ring of short cracks joining the spokes
    for (let i = 0; i < n; i++) {
      const r = (46 + 30 * hash(i * 2.9 + seed)) * s * k, a0 = (i + .2) / n * TAU, a1 = (i + .9) / n * TAU;
      boilSeed('c12 crkr' + seed + '_' + i);
      inkLine([[cx + Math.cos(a0) * r, cy + Math.sin(a0) * r * .62], [cx + Math.cos((a0 + a1) / 2) * r * 1.1, cy + Math.sin((a0 + a1) / 2) * r * .68], [cx + Math.cos(a1) * r, cy + Math.sin(a1) * r * .62]], .9 * s, '#12060A', 'ink', 0);
    }
  }
  function crackLine(g0, g1, age) {
    const P = tearLine(g0, g1, 7, 22, 30), k = clamp(age / .08), m = Math.max(2, Math.floor(P.length * k));
    boilSeed('c12 gutter crack'); inkLine(P.slice(0, m), 3, '#1A0A10', 'ink', 0); inkLine(P.slice(0, m).map(([x, y]) => [x, y + 3]), 1.2, '#FF6A5A', 'inkfine', 0);
  }
  // falling shards of the counter's panel (world space)
  function shards(age, cx, cy, s = 1) {
    for (let i = 0; i < 7; i++) {
      const a = age - .03 * i; if (a <= 0) continue;
      const x0 = cx - 600 * s + 1200 * s * hash(i * 4.3), y = cy + 90 * s + 1200 * a * a * s + 60 * a * s, x = x0 + (hash(i * 2.1) - .5) * 200 * a * s, r = (10 + 16 * hash(i * 6.1)) * s;
      push(); translate(x, y); rotate(a * (4 + 6 * hash(i)) * (i % 2 ? 1 : -1));
      boilSeed('c12 shard' + i);
      paint([[-r, -r * .6], [r * .9, -r * .3], [r * .2, r]], { wash: i % 3 ? '#6A1020' : '#FFD8D0', ink: PAL.ink, sw: .6 * s });
      pop();
    }
  }
  // D. overflow
  function s16(t, lt, dur) {                 // THE RED NUMBER, held: it cracks, sags, sheds shards; the beams die
    const age = t - T_OVF, f = Math.floor(lt * 24);
    const spasm = [.7, .15, .1, .45, .1, 0, .3, .8][Math.min(7, f)] ?? .5;
    const sh = shakeXY(t, 4 + 10 * spasm), sag = easeOut(clamp(age / .3));
    camBegin(CT.x + sh[0] - 20, CT.y + 110 + sh[1], 1.0 + .03 * ease(lt / dur));
    city(t, { crowd: false, red: 1, dead: clamp(age / .35), glitch: .12 + .5 * spasm, crot: -.035 * sag, cdy: 16 * sag,
      after: () => { crackBurst(age, CT.x - 260, CT.y + 10 + 16 * sag, 1.6, 3, 10); crackBurst(age - .08, CT.x + 430, CT.y - 20 + 16 * sag, 1.1, 7, 7); shards(age - .05, CT.x, CT.y + 16 * sag, 1.2); } });
    camEnd();
    if (spasm > .4) glitchBlocks(t, spasm * .6);
  }
  function s17(t, lt, dur) {                 // THE WORLD GLITCHES: the frozen crowd in red light, stuttering
    const f = Math.floor(lt * 24), age = t - T_OVF;
    const plan = ['crowd', 'crowd', 'stall', 'crowd', 'crowd', 'phone', 'crowd'][Math.min(6, f)] || 'crowd';
    const spasm = [.9, .55, 1, .75, 1, 1, .85][Math.min(6, f)] ?? 1;
    if (plan === 'stall') { flashStall(t); GLITCH = 1; return; }
    if (plan === 'phone') { flashPhone(t); GLITCH = .85; return; }
    const sh = shakeXY(t, 16 * spasm);
    camBegin(1185 + sh[0], 842 + sh[1], 1.5);
    city(t, { red: 1, dead: 1, glitch: .55 + .45 * spasm, stutter: .6 * spasm, shake: .25 * spasm, eyes: 'scared', mouth: 'O', noBeams: true });
    camEnd();
    glitchBlocks(t, spasm);
    GLITCH = Math.max(GLITCH, .55 + .45 * spasm);
  }
  function flashStall(t) {                   // one frame: the stall, lit red through the window; he's still grinning
    camBegin(960, 560, 1.14);
    restroom(t, { red: 1, lamp: .15 });
    oppaSeated(RR.x, RR.seat, RR.u, t, { aR: A.press[0], lenR: A.press[1], mouth: 'grin', blush: .2, red: 1, face: reflection(t, { ended: true }, 1) });
    stallNight(.5, [RR.x, RR.seat - 120]);
    camEnd();
    glitchBlocks(t, 1);
  }
  function flashPhone(t) {                   // one frame: the phone, cracked, the tiny dancer frozen mid-gallop
    camBegin(960, 560, 1.04);
    phoneInsert(t, { vt: .7, len: CLIP, ended: false, s: 190 }, { freeze: frozenT(0, .5), red: 1 });
    crackBurst(1, 900, 460, 2.4, 11, 11);
    camEnd();
    glitchBlocks(t, 1);
  }
  function glitchBlocks(t, k) {            // blocks of corrupted colour
    const f = Math.floor(t * 24), n = Math.floor(2 + 6 * k), cols = ['#3BE8E0', '#FF3BA8', '#0C0A12', '#E0283F', '#0C0A12'];
    for (let i = 0; i < n; i++) {
      const x = hash(f * 3.1 + i * 7.7) * W, y = hash(f * 5.3 + i * 2.9) * H, w = 60 + 420 * hash(f + i * 4.4), h = 8 + 50 * hash(f * 2.2 + i);
      boilSeed('c12 gb' + i); paint(rectPts(x - w / 2, y - h / 2, w, h), { wash: cols[(i + f) % cols.length], washOp: 235, ink: null });
    }
  }
  function redNumber(t) {                    // the red counter scene (for the collapse)
    camBegin(CT.x - 20, CT.y + 110, 1.03);
    city(t, { crowd: false, red: 1, dead: 1, crot: -.035, cdy: 16, noBeams: true, after: () => crackBurst(1, CT.x - 260, CT.y + 26, 1.6, 3, 10) });
    camEnd();
  }
  function s18(t, lt, dur) {                 // COLLAPSE: the picture squeezes to a line, then a dot
    const k = clamp(lt / dur);
    paintLayer('c12 squeeze', () => redNumber(t));
    boilSeed('c12 black'); paint(rectPts(-40, -40, W + 80, H + 80), { wash: BLACK, ink: null });
    const h = lerp(H * .5, 6, easeOut(k)), w = k < .6 ? W : lerp(W, 40, easeIn((k - .6) / .4));
    flushBrush();
    screenDraw(() => image(LAYERS['c12 squeeze'], 960 - w / 2, 540 - h / 2, w, h, 0, 0, W, H));
    boilSeed('c12 line'); paint(rrPts(960 - w / 2, 540 - 3, w, 6, 3), { wash: '#FFF0EC', washOp: 200, ink: null });
    glow(960, 540, lerp(600, 140, k), '#FF4040', .8);
    GLITCH = .35;
  }
  function s19(t, lt, dur) {                 // BLACK: the red counter flickers, then holds (the seam)
    boilSeed('c12 black'); paint(rectPts(-40, -40, W + 80, H + 80), { wash: BLACK, ink: null });
    const f = Math.floor(lt * 24), on = [.3, 0, .85, 0, 1, 1, 1][Math.min(6, f)] ?? 1;
    if (t > B(106) - .09 || on >= 1) viewCounter(t, { x: 960, y: 540, h: 160, glitch: .5 });
    else if (on > 0) viewCounter(t, { x: 960, y: 540, h: 160, glitch: .5, alpha: on });
    else GLITCH = .5;
  }

  // TEMP bench
  LOOPS.c12bench = t => {
    const which = Math.floor(t * 10);
    paint(rectPts(-40, -40, W + 80, H + 80), { wash: '#1A1C40', ink: null });
    const N = 8, xs = i => 200 + i * 220;
    if (which === 0) for (let i = 0; i < N; i++) member('commuter', xs(i), 600, 20, { v: i, noShadow: true, boilKey: 'b' + i });
    if (which === 1) for (let i = 0; i < N; i++) dancer('commuter', xs(i), 600, 20, 'gallop', 190, { v: i, noShadow: true, boilKey: 'b' + i });
    if (which === 2) for (let i = 0; i < N; i++) dancer('commuter', xs(i), 600, 20, 'lasso', 190, { v: i, noShadow: true, boilKey: 'b' + i });
    if (which === 3) for (let i = 0; i < N; i++) member('dancer', xs(i), 600, 20, { v: i, noShadow: true, boilKey: 'b' + i });
    if (which === 4) for (let i = 0; i < N; i++) clawd(xs(i), 600, 20, { noShadow: true, boilKey: 'b' + i });
    if (which === 5) for (let i = 0; i < N; i++) member('commuter', xs(i), 600, 20, { v: i, noShadow: false, boilKey: 'b' + i });
    if (which === 6) { camBegin(960, 540, .5); for (let i = 0; i < N; i++) member('commuter', 960 + (i - 3.5) * 440, 600, 40, { v: i, noShadow: true, boilKey: 'b' + i }); camEnd(); }
    if (which === 7) for (let i = 0; i < N; i++) member('granny', xs(i), 600, 20, { v: i, noShadow: true, boilKey: 'b' + i });
    if (which === 8) for (let i = 0; i < 4; i++) horse(300 + i * 450, 700, 15, 190, { boilKey: 'h' + i });
    if (which === 9) {}
  };
  LOOPS.c12bench.len = 1;

  shots([
    [B(97), s1], [B(98), s2], [B(99), s3], [B(100), s4],
    [B(101), s5], [B(103), s6],
    [B(104), s7], [beatT(104, 1), s8], [beatT(104, 2), s9],
    [TK(1), s10], [TK(2), s11], [TK(3), s12], [TK(4), s13], [TK(5), s14], [TK(6), s15],
    [T_RED, s16], [T_WORLD, s17], [T_COL, s18], [T_BLK, s19]
  ]);
})();
