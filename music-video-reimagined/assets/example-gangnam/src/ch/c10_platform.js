// c10_platform.js · CHORUS 2: THE PLATFORM LINE DANCE · barT(81) = 151.091 → barT(89) = 165.636 (bars 81–88, the drop)
//
// SHOT PLAN (video times). The chorus routine runs on the platform the whole time (KEYS):
//   bars 81–82 gallop · 83–84 lasso · 85–86 gallop · 87–88 lasso — the whole line in unison, crowdVar for life.
// The line of nine (world, the platform set): y 900, x = 780 + 180i, u 14 (Oppa 15):
//   0 White Dancer v0 · 1 commuter v0 · 2 White Dancer v1 · 3 commuter v2 · 4 OPPA (white) · 5 the Pop Star ·
//   6 commuter v1 · 7 White Dancer v3 · 8 commuter v4. Faces: Oppa 'cool' (smirk, a bobbing music note), the rest 'happy'.
// THE Horse waits at the far end of the platform, (3080, 888) s 11.5, off the right edge of every wide.
//
// 1. ONE BILLION → THE REVEAL · 151.091 → 153.818 (bar 81 + half of bar 82), one continuous camera
//    [in: the big counter exactly where c09 froze it: viewCounter x 960, y 300, h 150]
//    151.09  the drop: a warm-white flash burns off in ~5 frames; the counter, on top at the SAME x/y/h, has flipped to
//            the billion (VIEWCOUNT does the number) and POPS (a spring + wobble, a bump on every beat). Under the flash:
//            the platform ceiling (strip lights, screen-door headers) and nine heads bobbing at the bottom edge.
//    151.1–152.0  painted fireworks burst at the ceiling on the eighths (8 bursts, tapered rays with sparkle heads, a
//            glow at each heart); confetti blasts out of the big one behind the counter; the camera shakes on the hit.
//            read: "the counter hit a billion: party!" (2 beats; the dancers are only heads, nothing competes)
//    152.04–152.71  pull back and DOWN: the fireworks sail up out of frame, the counter shrinks and flies into the
//            corner (it docks exactly where counterHUD sits), the line of nine rises into view mid-gallop.
//    152.7–153.8  a steady wide of the whole line galloping in unison, confetti raining. read: "a line dance on a subway
//            platform, all in sync" (1.1 s held, plus the reveal itself)
// 2. MEDIUM ON OPPA AND THE POP STAR · 153.818 → 156.545  [cut on beat 3 of bar 82, on action: mid-gallop]
//    Full bodies, big (screen u ~33), floor visible, neighbours framing them. Two beats of gallop, then on the bar-83
//    downbeat both lassos go up. A slow push. Confetti tumbling through. read: the choreography up close, 2.7 s.
// 3. THE WIDE, LASSOING · 156.545 → 158.364 (bar 84)  [cut on the downbeat]
//    All nine loops spinning at once, a slow drift the other way. read: "nine lassos in unison" (1 bar)
// 4. THE SWIMMER · 158.364 → 161.091 (1.5 bars)  [smash cut on the bar-85 downbeat]
//    An indoor pool (aqua tiles, a clock with no numbers, pennants, a ladder, lane ropes), a close shot. Calm water,
//    bubbles rise… 158.66 Oppa bursts up (a splash crown, rings) in swimming GOGGLES, wet hair beaded, water to the
//    chin, flat mouth. Deadpan. 158.82–159.73 he just stares at us · 159.73 looks left (beat 4) · 160.18 looks right
//    (bar 86) · 160.42 back to us · 160.56 sinks straight down, deadpan · bubbles, rings.
//    reads: the pool (0.3) · Oppa in goggles (0.9) · looking around (0.7) · sinks (0.5)
// 5. THE HORSE WAITS · 161.091 → 163.818  [cut back on beat 3 of bar 86]
//    Down at the far end of the platform: THE Horse (chestnut, spark star), profile, facing down the platform toward
//    where its train will come, chewing. At its back the line dances on (gallop; on bar 87 the lassos go up). A slow push
//    in on the Horse. 162.1 it stops chewing · 162.45 its eye slides back, to the party and to us · 162.95 a slow blink.
//    Not dancing. reads: the Horse (0.8) · the line behind it, the Horse not dancing (0.9) · the side-eye (1.3)
// 6. BACK TO THE LINE · 163.818 → 165.636 (bar 88)  [continuous: the camera pulls back and pans left]
//    On the downbeat the camera pulls back and pans left along the platform (0.95 s), leaving the Horse off the right
//    edge, and lands on STAGE.platform.wide; it settles onto exactly [1500, 560, .7] by the last frame while the line
//    finishes the lasso. The confetti has all fallen out of the air by ~164.6.
//    [out: continuous for c11: camera [1500, 560, .7], the line of nine as above, finishing the lasso]
//
// Counter: the big counter only in shot 1 until it docks (≈152.66); counterHUD in every other frame.
(() => {
  const T0 = barT(81);
  const T_MED = beatT(82, 2), T_WIDE2 = barT(84), T_POOL = barT(85), T_HORSE = beatT(86, 2), T_BACK = barT(88), T1 = barT(89);
  const KEYS = [[barT(81), 'gallop'], [barT(83), 'lasso'], [barT(85), 'gallop'], [barT(87), 'lasso']];
  const PW = STAGE.platform.wide;                 // [1500, 560, .7]: the hand-off framing

  // ---------- the line of nine (exactly as c11 picks it up) ----------
  const LINE = [['dancer', { v: 0 }], ['commuter', { v: 0 }], ['dancer', { v: 1 }], ['commuter', { v: 2 }], ['oppa', { look: 'white' }],
    ['pop', {}], ['commuter', { v: 1 }], ['dancer', { v: 3 }], ['commuter', { v: 4 }]];
  const LU = [14, 14, 14, 14, 15, 14, 14, 14, 14], LX = i => 780 + 180 * i, LY = 900;
  function lineDance(t, order) {
    for (const i of order || [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
      const [name, O] = LINE[i], isO = name === 'oppa', cv = crowdVar(i);
      dancer(name, LX(i), LY, LU[i], KEYS, t, { ...O, mood: isO ? 'cool' : 'happy', ph: cv.ph, amp: cv.amp, e: isO ? 1 : cv.e, side: 1,
        ...(isO ? { emote: 'music', emoteK: 1, emoteAge: t - (T1 - 4) } : {}),
        hairSway: Math.sin(bpOf(t) * Math.PI) * .3, boilKey: 'L' + i });
    }
  }

  // ---------- confetti (world space) ----------
  // A blast out of the firework behind the counter at the drop, then a thinning rain over the whole platform. Pieces
  // fall past the floor and out of the bottom of every frame (nothing lands), and the air is clear by ~164.6.
  const CCOL = ['#F4C542', '#F07AA8', '#6EC6F0', '#A8D84A', '#FFF5E2', '#B38AE8', '#F28A3A', '#E8483E'];
  const NB = 48, NR = 66, CONF = [];
  for (let i = 0; i < NB + NR; i++) {
    const h = k => hash(i * 13.37 + k * 71.3 + 5), burst = i < NB;
    let t0, x0, y0, vx, vy;
    if (burst) { const a = h(1) * TAU, sp = 450 + 1150 * h(2); t0 = T0 + .02 + .05 * h(3); x0 = 1500 + (h(4) - .5) * 160; y0 = 50 + (h(5) - .5) * 50; vx = Math.cos(a) * sp * 1.3; vy = Math.sin(a) * sp - 300; }
    else { const q = (i - NB) / NR; t0 = T0 + .2 + 3.9 * Math.pow(q, 1.15) + .25 * h(3); x0 = -100 + 3100 * h(4); y0 = -420 - 160 * h(5); vx = (h(1) - .5) * 80; vy = 60; }
    CONF.push({ t0, x0, y0, vx, vy, k: 2.4 + 1.6 * h(6), vt: 235 + 120 * h(7), swA: 16 + 26 * h(8), swF: 1.3 + 2 * h(9), ph: h(10) * TAU,
      spin: (h(11) - .5) * 8, fl: 5 + 7 * h(12), w: 8 + 6 * h(13), hh: 16 + 11 * h(14), col: CCOL[i % CCOL.length] });
  }
  function confetti10(t) {
    const [x0, y0, x1, y1] = viewRect2(40);
    CONF.forEach((p, i) => {
      const a = t - p.t0; if (a < 0) return;
      const E = 1 - Math.exp(-p.k * a);
      const x = p.x0 + p.vx * E / p.k + p.swA * Math.sin(p.swF * a + p.ph) * clamp(a * 1.5), y = p.y0 + p.vt * a + (p.vy - p.vt) * E / p.k;
      if (x < x0 || x > x1 || y < y0 || y > y1) return;
      boilSeed('c10cf' + i);
      push(); translate(x, y); rotate(p.ph + p.spin * a); scale(1, Math.abs(Math.cos(p.fl * a + p.ph)) * .85 + .15);
      paint(rectPts(-p.w / 2, -p.hh / 2, p.w, p.hh, 1), { wash: p.col, ink: PAL.ink, sw: .5 });
      pop();
    });
  }

  // ---------- fireworks (world space, up at the station ceiling) ----------
  const FW = [   // [seconds after the drop (on the eighths), x, y, radius, colour, colour]
    [0, 1500, 40, 480, '#F4C542', '#F28A3A'], [.114, 1010, -40, 280, '#F07AA8', '#B38AE8'],
    [.227, 1990, -70, 300, '#6EC6F0', '#A8D84A'], [.341, 1150, 230, 220, '#A8D84A', '#F4C542'],
    [.455, 1850, 220, 240, '#F07AA8', '#F4C542'], [.568, 790, 110, 210, '#B38AE8', '#6EC6F0'],
    [.682, 2210, 100, 225, '#F28A3A', '#F07AA8'], [.795, 1500, -150, 260, '#6EC6F0', '#F4C542']
  ];
  function fireworks(t) {
    FW.forEach(([dt, x, y, R, c1, c2], j) => {
      const age = t - T0 - dt; if (age < 0 || age > 1.5) return;
      boilSeed('c10fw' + j);
      const grow = easeOut(clamp(age / .32)), fade = 1 - clamp((age - .4) / 1.1), g = 150 * age * age, n = 15;
      if (!vis(x - R * 1.2, x + R * 1.2) || y + R * 1.3 + g < viewRect2(0)[1]) return;
      if (age < .45) glow(x, y, R * (.6 + grow), c1, 1 - age / .45);
      if (age < .16) paint(starPts(x, y, R * .42 * backOut(age / .16), .28, 8, age * 4), { wash: '#FFF8E6', fill: c1, fillOp: 60, ink: null });
      for (let k = 0; k < n; k++) {
        const a = (k + hash(j * 7.1 + k) * .45) / n * TAU, rr = R * (.66 + .34 * hash(j * 3.3 + k * 5.7)), col = k % 2 ? c1 : c2;
        const r1 = rr * grow, r0 = rr * clamp((age - .06) / .6) * .96;
        const P = q => [x + Math.cos(a) * q, y + Math.sin(a) * q + g * (q / rr) ** 2];
        if (r1 - r0 > 10 && fade > .05) paint(ribbon([P(r0), P((r0 * 2 + r1) / 3), P(r1)], 1.5, (6 + 7 * fade) * (R / 300)), { wash: col, ink: null });
        const tip = P(r1), s = (10 + 6 * (R / 300)) * fade * (.7 + .3 * Math.sin(age * 40 + k * 2.1));
        if (s > 1.5) {
          paint(starPts(tip[0], tip[1], s, .3, 4, age * 3 + k), { wash: k % 3 ? '#FFF6DC' : col, ink: null });
          if (age > .25) { const tr = P(Math.max(r0, r1 - rr * .16)); paint(ellPts(tr[0], tr[1] + 14 * (age - .25), s * .28, s * .28, 6), { wash: col, ink: null }); }
        }
      }
    });
  }

  // the corner HUD's exact position (as counterHUD computes it), so the big counter can dock into it
  function hudXY(t) {
    const V = VIEWCOUNT(t), aw = (150 + 64 * V.str.length + 24 * Math.floor((V.str.length - 1) / 3) + 52 + 40) * (64 / 120);
    return [W - 36 - aw / 2, 58];
  }

  // ---------- 1. one billion → the reveal ----------
  const CAM_A = [1500, 300, 1.15], CAM_C = [1500, 668, 1.08];
  const MV0 = .95, MV1 = 1.62;   // the pull-back (local time)
  function shotBillion(t, lt, dur) {
    const mv = ease(seg(lt, MV0, MV1)), drift = ease(seg(lt, MV1, dur));
    const cx = lerp(CAM_A[0], CAM_C[0], mv) + 28 * drift;
    const cy = lerp(CAM_A[1], CAM_C[1], mv) + 6 * drift;
    const z = lerp(CAM_A[2] + .03 * ease(seg(lt, 0, MV0)), CAM_C[2], mv) + .012 * drift;
    const [sx, sy] = shakeXY(t, 16 * Math.exp(-lt * 6));
    camBegin(cx + sx, cy + sy, z);
    platform(t, { hooks: { back: () => fireworks(t), mid: () => { lineDance(t); confetti10(t); } } });
    camEnd();
    flash(lt < .05 ? 1 : lt < .45 ? .95 * Math.exp(-(lt - .05) * 10) : 0, '#FFF6E0');
    // THE COUNTER: exactly where c09 froze it (x 960, y 300, h 150); the billion lands on the drop, pops, then docks
    const dock = ease(seg(lt, MV0, MV1 - .05));
    if (dock < 1) {
      const [hx, hy] = hudXY(t), a = lt - .07;
      const pk = lt < .07 ? easeOut(lt / .07) : Math.exp(-a * 4.5) * Math.cos(a * 16);
      const beat = lt > .4 ? .22 * pulse(t, 8) : 0;
      viewCounter(t, { x: lerp(960, hx, dock), y: lerp(300, hy, dock) - 70 * Math.sin(dock * Math.PI), h: lerp(150, 64, dock),
        pop: (pk + beat) * (1 - dock), rot: .05 * Math.sin(lt * 15) * Math.exp(-lt * 4) * (1 - dock) });
    } else counterHUD(t);
  }

  // ---------- 2. medium on Oppa and the Pop Star ----------
  function shotMedium(t, lt, dur) {
    const k = ease(lt / dur);
    camBegin(lerp(1578, 1602, k), lerp(784, 776, k), lerp(2.24, 2.4, k));
    platform(t, { hooks: { mid: () => { lineDance(t); confetti10(t); } } });
    camEnd();
    counterHUD(t);
  }

  // ---------- 3. the wide, lassoing ----------
  function shotWideLasso(t, lt, dur) {
    const k = ease(lt / dur);
    camBegin(lerp(1532, 1478, k), lerp(676, 666, k), lerp(1.08, 1.11, k));
    platform(t, { hooks: { mid: () => { lineDance(t); confetti10(t); } } });
    camEnd();
    counterHUD(t);
  }

  // ---------- 4. the swimmer (an indoor pool, its own little set) ----------
  const SX = 960, SWL = 745, SU = 32;             // Oppa's x, the waterline where he surfaces, his size
  const SY_UP = SWL + 3.55 * SU * .94;            // feet y with the water just under his mouth (local -3.55u; Oppa's sy .94)
  const SY_DOWN = SWL + 10.4 * SU * .94;          // feet y fully under (the hair top below the surface)
  const WB = [[586, '#8AD5E3'], [632, '#79CDE0'], [690, '#68C4DB'], [760, '#58B9D5'], [850, '#4BAECF'], [960, '#3FA2C7'], [1090, '#3593BC']];
  function water(x0, x1, y0) {   // the water bands, clipped to x0..x1 and below y0
    for (let i = 0; i < WB.length; i++) {
      const top = Math.max(y0, WB[i][0]), bot = i + 1 < WB.length ? WB[i + 1][0] : 1500;
      if (bot > top) paint(rectPts(x0, top, x1 - x0, bot - top + 1), { wash: WB[i][1], ink: null });
    }
  }
  function ringArc(cx, cy, rx, ry, a0, a1, sw, col) {
    const P = []; for (let i = 0; i <= 16; i++) { const a = lerp(a0, a1, i / 16); P.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); }
    inkLine(P, sw, col, 'inkfine', .5);
  }
  function laneRope(y, sp, rx, ry, t, key, x0, x1) {
    boilSeed(key);
    inkLine([[x0, y], [x1, y]], .8, '#5A6A78', 'inkfine', 0);
    for (let x = x0, k = 0; x < x1; x += sp, k++) paint(ellPts(x, y + 3 * Math.sin(t * 2.2 + x * .012), rx, ry, 12), { wash: k % 2 ? '#F4F4EE' : '#E8483E', ink: PAL.ink, sw: .45 });
  }
  const drop = (x, y, r) => [[x, y - 1.8 * r], [x + r, y - .2 * r], [x + .7 * r, y + .75 * r], [x, y + r], [x - .7 * r, y + .75 * r], [x - r, y - .2 * r]];
  function poolRoom(t) {
    boilSeed('c10 pool wall');
    paint(rectPts(-100, 150, 2120, 450), { wash: '#E9F3F1', ink: null });
    boilSeed('c10 tiles');
    for (let x = 250; x < 1700; x += 52) inkLine([[x, 180], [x, 470]], .35, '#BCD8D8', 'inkfine', 0);
    for (let y = 212; y < 470; y += 52) inkLine([[220, y], [1700, y]], .35, '#BCD8D8', 'inkfine', 0);
    // a string of pennants
    boilSeed('c10 pennants');
    const PN = []; for (let i = 0; i <= 16; i++) { const x = 200 + i * 96, y = 248 + 34 * Math.sin(i / 16 * Math.PI * 2) ** 2; PN.push([x, y]); }
    inkLine(PN, .8, '#5A6A78', 'inkfine', .5);
    for (let i = 0; i < 16; i++) {
      const [ax, ay] = PN[i], [bx, by] = PN[i + 1], sway = 4 * Math.sin(t * 3 + i);
      paint([[ax + 7, ay + 2], [bx - 7, by + 2], [(ax + bx) / 2 + sway, (ay + by) / 2 + 40]], { wash: ['#E8483E', '#F4C542', '#4AA0D8', '#F4F4EE'][i % 4], ink: PAL.ink, sw: .45 });
    }
    // the clock (no numbers: ticks and hands)
    boilSeed('c10 clock');
    const CX = 1360, CY = 380;
    paint(ellPts(CX, CY, 56, 56, 24), { wash: '#FBF7EC', ink: PAL.ink, sw: 1 });
    for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; inkLine([[CX + Math.cos(a) * 43, CY + Math.sin(a) * 43], [CX + Math.cos(a) * 50, CY + Math.sin(a) * 50]], k % 3 ? .45 : .8, PAL.ink, 'inkfine', 0); }
    const hm = -Math.PI / 2 + t * .9;
    inkLine([[CX, CY], [CX + Math.cos(hm) * 40, CY + Math.sin(hm) * 40]], .7, PAL.ink, 'ink', 0);
    inkLine([[CX, CY], [CX + Math.cos(-2.3) * 26, CY + Math.sin(-2.3) * 26]], 1, PAL.ink, 'ink', 0);
    // the blue waterline trim and the far deck lip
    boilSeed('c10 trim');
    paint(rectPts(-100, 470, 2120, 92), { wash: '#5AAAD2', ink: null });
    paint(rectPts(-100, 494, 2120, 18), { wash: '#2F6E9C', ink: null });
    paint(rectPts(-100, 556, 2120, 30), { wash: '#DDE8E8', ink: null });
    inkLine([[200, 556], [960, 556], [1720, 556]], .8, PAL.ink, 'ink', 0);
    // the ladder
    boilSeed('c10 ladder');
    for (const dx of [0, 62]) inkLine([[505 + dx, 430], [505 + dx, 470], [522 + dx, 540], [534 + dx, 600], [536 + dx, 668]], 2.4, '#A8B4BC', 'ink', .6);
    for (const ry of [616, 652]) inkLine([[534, ry], [598, ry]], 2, '#A8B4BC', 'ink', 0);
  }
  function ripples(t, y0) {   // bright ripple strokes across the water below y0
    for (let i = 0; i < 16; i++) {
      const y = 600 + 460 * hash(i * 2.7 + 1) ** 1.4; if (y < y0) continue;
      const x = 180 + 1500 * hash(i * 5.1 + 3) + 30 * Math.sin(t * .8 + i), L = 50 + 130 * hash(i * 9.3), d = 1 + (y - 600) / 300;
      boilSeed('c10 rip' + i);
      const P = []; for (let k = 0; k <= 6; k++) P.push([x + k / 6 * L * d, y + 4 * Math.sin(k * 1.4 + t * 3 + i)]);
      inkLine(P, .55 * d, '#EAF8FC', 'inkfine', .6);
    }
  }
  // Oppa's heading: stares at us, looks left (beat 4 of bar 85), right (bar 86), back to us
  function swimTurn(lt) {
    if (lt < 1.82) return turn(lt, 1.365, 1.47, 0, -.125);
    if (lt < 2.05) return turn(lt, 1.82, 1.95, -.125, .125);
    return turn(lt, 2.06, 2.15, .125, 0);
  }
  function shotPool(t, lt, dur) {
    const up = lt < .3 ? 0 : backOut(seg(lt, .3, .47)), sink = easeIn(seg(lt, 2.2, 2.6));
    const bob = (.16 * Math.sin((lt - .47) * 5.2) * clamp((lt - .5) * 3)) * (1 - sink);
    const yF = lerp(lerp(SY_DOWN, SY_UP, up), SY_DOWN + 20, sink) + bob * SU;
    const rise = lt > .3 && lt < .5 ? -.12 * Math.sin(seg(lt, .3, .5) * Math.PI) : 0;       // stretch on the way up
    const land = lt > .47 ? .07 * Math.exp(-(lt - .47) * 9) * Math.cos((lt - .47) * 22) : 0;  // the bob-settle
    const tv = swimTurn(lt), k = ease(lt / dur);
    camBegin(960 + 6 * Math.sin(lt * .9), 618 - 8 * k + 3 * Math.sin(lt * 1.7), 1.4 + .06 * k);
    poolRoom(t);
    boilSeed('c10 water far'); water(-100, 2020, 586);
    laneRope(662, 40, 16, 9, t, 'c10 rope far', 180, 1760);
    ripples(t, 586);
    const rings = [.42, .5, .6, 1.02, 1.5, 2.28, 2.4, 2.52, 2.64];
    const drawRings = (front) => rings.forEach((te, j) => {
      const a = lt - te; if (a < 0 || a > 1.3) return;
      const rx = SU * (5.2 + 7 * Math.pow(a, .6)) * (j >= 5 ? .8 : 1), f = 1 - a / 1.3;
      boilSeed('c10 ring' + j + front);
      ringArc(SX, SWL + 4, rx, rx * .16, front ? 0 : Math.PI, front ? Math.PI : TAU, 1.6 * f + .2, '#F2FBFD');
    });
    drawRings(false);
    // OPPA, surfacing in goggles
    if (yF - 9.9 * SU * .94 < SWL) {
      member('oppa', SX, yF, SU, { look: 'white', bareEyes: true, face: (u, sw, F) => roundShades(u, sw, F, 'goggles'), mouth: 'flat', eyes: 'normal',
        aL: -1.3, aR: -1.3, armLen: .6, noShadow: true, sq: rise + land, ...tv, smear: (tv.smear || 0) * .4, boilKey: 'c10swim',
        head: (u, sw) => {   // wet hair: a sheen and beads of water along the edge
          inkLine([[-3.7 * u, -8.95 * u], [-2.1 * u, -9.2 * u]], sw * .9, '#D6EEF8', 'inkfine', .5);
          inkLine([[1.1 * u, -9.5 * u], [3.3 * u, -9.35 * u]], sw, '#D6EEF8', 'inkfine', .5);
          for (const [dx, dy] of [[-4.5, -7.05], [-2.3, -7.35], [.9, -7.45], [3.3, -7.35], [4.6, -7.0]]) paint(drop(dx * u, dy * u, .26 * u), { wash: '#BFE6F4', ink: PAL.ink, sw: sw * .35 });
        },
        draw: (u, sw) => { for (const [dx, y0, y1] of [[-3.9, -7.6, -4.6], [3.1, -7.8, -5.2], [4.4, -7.4, -4.4]]) paint(ribbon([[dx * u, y0 * u], [(dx + .1) * u, (y0 + y1) / 2 * u], [dx * u, y1 * u]], .35 * u, .15 * u), { wash: '#CFEAF4', washOp: 150, ink: null }); }
      });
    }
    // the water in front of him (the same bands: it hides everything below his waterline)
    boilSeed('c10 water near'); water(SX - 280, SX + 280, SWL + 4);
    drawRings(true);
    ripples(t, SWL + 30);
    // the splash crown as he surfaces
    const sa = lt - .36;
    if (sa > 0 && sa < .7) for (let j = 0; j < 12; j++) {
      const s = (j % 2 ? 1 : -1), p0 = [SX + s * SU * (2 + 3 * hash(j)), SWL], p1 = [SX + s * SU * (5 + 6 * hash(j + 9)), SWL + 10];
      const q = clamp(sa / (.45 + .2 * hash(j + 3))); if (q >= 1) continue;
      const [x, y] = arcPt(p0, p1, SU * (3 + 3 * hash(j + 5)), q);
      boilSeed('c10 spl' + j);
      paint(drop(x, y, SU * (.22 + .12 * hash(j + 7)) * (1 - q * .5)), { wash: '#DDF3FA', ink: PAL.ink, sw: .45 });
    }
    if (sa > 0 && sa < .35) { boilSeed('c10 foam'); const f = 1 - sa / .35, P = []; for (let i = 0; i < 18; i++) { const a = Math.PI + i / 17 * Math.PI; P.push([SX + Math.cos(a) * SU * (6 + hash(i) * 1.5), SWL + 6 + Math.sin(a) * SU * (1.2 + 1.4 * hash(i + 4)) * f]); } paint(P, { wash: '#F2FBFD', ink: PAL.ink, sw: .5 }); }
    // drips off his hair while he's up
    if (lt > .6 && lt < 2.25) for (let j = 0; j < 6; j++) {
      const per = .55 + .2 * hash(j), a = (lt - .6 + hash(j + 2) * per) % per, x = SX + (hash(j + 11) - .5) * 8.5 * SU * 1.12;
      const y0 = yF - 7.2 * SU * .94, y = y0 + 1600 * a * a;
      boilSeed('c10 drip' + j);
      if (y < SWL) paint(drop(x, y, SU * .16), { wash: '#BFE6F4', ink: PAL.ink, sw: .4 });
      else { const r = (y - SWL) * .1; if (r < 40) ringArc(x, SWL + 2, 10 + r, 3 + r * .2, 0, TAU, .6, '#F2FBFD'); }
    }
    // bubbles: before he pops up, and after he sinks
    for (let j = 0; j < 9; j++) {
      const tb = j < 4 ? .02 + j * .07 : 2.34 + (j - 4) * .08, a = lt - tb; if (a < 0 || a > .45) continue;
      const x = SX + (hash(j * 3.1) - .5) * 5 * SU, y = SWL + 120 - a * 400;
      boilSeed('c10 bub' + j);
      if (y > SWL) paint(ellPts(x, y, 7 + 5 * hash(j), 7 + 5 * hash(j), 10), { wash: '#CFEFF8', washOp: 200, ink: '#EAF8FC', sw: .6 });
      else if (y > SWL - 40) ringArc(x, SWL + 2, 14 + (SWL - y) * .5, 4, 0, TAU, .6, '#F2FBFD');
    }
    // the near lane rope, in front of everything
    laneRope(948, 64, 27, 14, t, 'c10 rope near', 100, 1850);
    camEnd();
    counterHUD(t);
  }

  // ---------- 5 + 6. the Horse waits; back to the line ----------
  // THE Horse stands in the foreground just right of the line's end, facing down the platform. On the bar-88 downbeat it
  // walks off toward the far end (where c11 finds it, at (3080, 888)) and clears the frame by ~165.12.
  const HX0 = 2300, HY = 1150, HS = 12.5, T_WALK = beatT(87, 3);
  const CAM_G0 = [2290, 912, 1.6], CAM_G1 = [2310, 942, 1.98], BACK = .95;
  function horseX(t) { const a = t - T_WALK, v = 460, r = .5; return a <= 0 ? HX0 : HX0 + (a < r ? v * a * a / (2 * r) : v * (a - r / 2)); }
  function horse10(t) {
    const x = horseX(t), d = x - HX0, walking = t > T_WALK;
    horse(x, HY, HS, t, { coat: 'chestnut', mood: 'deadpan', look: t > T_HORSE + 1.36 ? 'camera' : undefined, chew: t < T_HORSE + 1.0 ? 1 : 0,
      blink: .573, walk: walking ? d / 230 : undefined, dy: walking ? -.1 * Math.abs(Math.sin(d / 230 * TAU)) : 0, boilKey: 'c10horse' });   // blink seed: one slow blink at 162.95
  }
  function shotHorse(t, lt, dur) {
    const tb = T_BACK - T_HORSE, g = ease(seg(lt, 0, tb)), c = ease(seg(lt, tb, tb + BACK)), f = ease(seg(lt, tb + BACK, dur));
    const END = [PW[0] + 10, PW[1] - 6, PW[2] + .01];   // the move lands just short of the hand-off framing...
    const cam = [0, 1, 2].map(j => lerp(lerp(lerp(CAM_G0[j], CAM_G1[j], g), END[j], c), PW[j], f));   // ...and settles onto it exactly
    camBegin(cam[0], cam[1], cam[2]);
    platform(t, { hooks: { mid: () => { lineDance(t); if (vis(horseX(t) - 140, horseX(t) + 180)) horse10(t); confetti10(t); } } });
    camEnd();
    counterHUD(t);
  }

  shots([[T0, shotBillion], [T_MED, shotMedium], [T_WIDE2, shotWideLasso], [T_POOL, shotPool], [T_HORSE, shotHorse]]);
})();
