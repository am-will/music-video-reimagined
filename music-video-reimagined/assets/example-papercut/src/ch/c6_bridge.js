// c6_bridge.js: Chapter 6, the bridge (barT(35) = 113.903 to barT(42) = 136.284).
//
// SHOT PLAN (video time; beats are 0-based inside each bar)
// Measured from the audio: in bars 35-37 the riff's bass decays from beat ~0.9 and SLAMS back in at beat ~3.33
// (116.570, 119.760, 122.953). So each blackout runs from beatT(k, 1) (= bridgeGap(k)[0]) to beatT(k, 3.3), a frame
// ahead of the bass return: later than bridgeGap's nominal 2.5, because the bass is still out at 2.5.
//
// 1  113.903-123.495  LIGHTS ON, LIGHTS OFF   camera A: c5's framing (1720, 640, 1.1) creeping in to (1720, 738, 1.36)
//      Lit (bar start to beat 1): the darkened, ink-stained parlor (ink .5, peel .7, the Ink in the portrait). Mike,
//      front and centre at (1720, 1000) u 24, raps low and tense to camera; the band plays behind him.
//      Beat 1: the lamps stutter and die. BLACKOUT: a chalk-on-ink negative of the same room (inkSide's look, not
//      mirrored). Three frames of black, then the Inks' eyes snap open where they stand and the room develops round
//      them; Mike, dimmed, raps on, unaware. One clear position per blackout, converging on him:
//        114.702  bar 35  six small Inks scattered along the back wall of the room
//        117.900  bar 36  a closing ring halfway down the rug, a gap left right behind him
//        121.097  bar 37  RIGHT behind him: his own Ink towers over him, stretched tall, grinning over his head
//      Beat 3.3 (the bass slam): the lamps snap back on and nothing is there. Mike's unease grows each lit beat
//      (determined; a glance over his shoulder; sweat and darting eyes). In the third blackout he stops rapping.
//      122.935  lit, empty. He freezes, his eyes slide to his shoulder, and he turns slowly, key view by key view.
//      reads: lit / dark, far / lit, empty / dark, closer / lit, empty / dark, RIGHT THERE / lit, empty / he turns
// 2a 123.495-124.494  (camera A) from behind he stares at the empty room (to 123.73); turns back, scared (to 123.9);
//      a long relieved breath; beat 1 (124.294): the lamps flare and pop out one by one, his take in the dying light.
// 2b 124.494-126.692  camera B (wide, lamp B's pool): the band huddles in the one surviving light, lamp B stuttering.
//      Pairs of Ink eyes blink open in the dark: one on beat 2 (125.093, left), one on beat 3 (125.893, right), then
//      a flurry from 126.09. The band's eyes dart to each pair. The paper dragonfly circles the lamp shade.
// 3  126.692-129.889  THE FACE RISES (camera B craning up and back to (1945, 455, .88)) on the pad: the Face comes up
//      from behind the couch like a moon, its eyes already thin glowing slits; at 127.64 they open wide, cold light
//      floods the room, all the little eyes shut, the dragonfly bolts, the band's shadows are thrown toward us.
//      The band turn round one by one (127.96-129.1, alternating directions) and crane up at it. 129.23 Chester steps
//      out toward it, clear of the others; 129.69 he crouches and fills his lungs.
// 4a 129.889-131.088  camera C, the reverse angle (the Face's view, cold light): on the downbeat of the scream bar
//      Chester's lid snaps open wide, cream rings fan out round him, the band cowers behind him.
// 4b 131.088-133.086  camera D, low diagonal: Chester's back lower left, Rob's back in the corner, the Face upper right
//      and too big for the frame. Its papercut smile tears open into a vast scream (131.21-131.51), red inside, eyes
//      red; red floods the room. Red rings drive his cream rings back to the middle; where they meet, a jagged seam
//      of light, trembling; the paper shakes harder and harder.
// 5a 133.086-134.685  (camera D) the seam splits the world's paper: cracks of light race from it to the frame edges.
//      Rob throws his sticks up: click (133.086), click (133.886), sparks where the tips meet.
// 5b 134.685-136.284  camera C: cut on click 3 with a pop of light. Chester, determined, the camera pushing in on his
//      face (zoom 1.2 to 3.75); click 4 (135.484) sparks over his shoulder; cracks of light run out to the frame edges
//      round him; his glasses flash (a glint across both lenses, then a star and a glow); a cream flash peaks at
//      136.284 (the seam: c7 opens out of the flash with the paper tearing).
// Colour: warm-cold lamplight / ink-violet negatives -> darkness and one warm pool -> cold Face light -> RED (4b, the
//      video's first red) -> cream light through the cracks -> cream flash.
// Seam in: c5 ends on the darkened parlor, Mike front and centre, camBegin(1720, 640, 1.1): c6 opens lit, same frame.
(() => {
  // ---------- time ----------
  const T35 = barT(35), T36 = barT(36), T37 = barT(37), T38 = barT(38), T39 = barT(39), T40 = barT(40), T41 = barT(41), T42 = barT(42);
  const OUT = k => beatT(k, 1);      // the riff stops: lights die
  const ON = k => beatT(k, 3.3);     // the bass slams back in (measured at beat ~3.33): lights snap on
  // strobe state in shot 1: n = 0..2 (bar 35..37), dark, age = time in the current state
  function strobe(t) {
    const k = clamp(barOf(t + 1e-6), 35, 37), n = k - 35;
    if (t >= OUT(k) && t < ON(k)) return { k, n, dark: true, age: t - OUT(k) };
    return { k, n, dark: false, age: t < OUT(k) ? (k > 35 ? t - ON(k - 1) : t - T35 + 1) : t - ON(k) };
  }
  // lamp power around the cuts: a stutter just before the lights die, a flick as they come back
  function lampK(t) {
    const k = clamp(barOf(t + 1e-6), 35, 37), a = OUT(k) - t, b = t - ON(k);
    if (a > 0 && a < .125) return a > .083 ? .4 : a > .042 ? 1 : .18;
    if (b >= 0 && b < .125) return b < .042 ? 1 : b < .083 ? .55 : 1;
    return 1;
  }

  // ---------- the negative: the same parlor, chalk on ink (inkSide's look, NOT mirrored) ----------
  function negRoom(t, H_ = {}) {
    const S = true, x0 = -500, x1 = 3700;
    boilSeed('c6 neg bg');
    paint(rectPts(x0 - 100, -500, x1 - x0 + 200, 2200), { wash: PC.inkBg, ink: null });
    crown(x0, x1, S);
    wallpaper(x0, x1, t, { style: 'ink' });
    boilSeed('c6 neg mold');
    for (let i = 0; i < 7; i++) { const x = -150 + i * 600 + 180 * hash(i + 21); if (inView(x - 300, x + 300)) paint(ellPts(x, 260 + 200 * hash(i + 5), 260, 200, 20), { fill: PC.mold, fillOp: 60, bleed: .3, tex: .8, ink: null }); }
    for (let i = 0; i < 40; i++) {   // ink running down the walls, on slow clocks
      const x = -280 + i * 105 + 40 * hash(i * 7 + 2), ph = frac(t * (.05 + .05 * hash(i + 4)) + hash(i + 8)), len = 120 + 420 * ph * hash(i + 1);
      if (!inView(x - 20, x + 20)) continue;
      boilSeed('c6 neg drip' + i);
      paint(ribbon([[x, LAY.wallTop], [x + 2, LAY.wallTop + len * .5], [x, LAY.wallTop + len]], 7 + 5 * hash(i + 5), 3), { wash: PC.inkDrip, ink: null });
    }
    const kinds = ['spiral', 'eye', 'tally', 'face', 'cross', 'eye'];
    for (let i = 0; i < 22; i++) { const x = -260 + i * 190 + 60 * hash(i * 5 + 3), y = 120 + 380 * hash(i * 9 + 4); if (!inView(x - 60, x + 60)) continue; boilSeed('c6 chalk' + i); chalkMark(kinds[i % 6], x, y, .9 + .6 * hash(i + 2), i); }
    wainscot(x0, x1, S);
    doors(LAY.doorsL, S); doors(LAY.doorsR, S);
    portrait(LAY.portrait[0], LAY.portrait[1], 1, t, { stage: 'ink' });
    floorBoards(x0, x1, S);
    rug(1850, 935, 980, 150, S);
    palm(LAY.palm, LAY.floorY + 4, 1, t, { style: 'ink' });
    statue(LAY.statue, LAY.floorY + 6, 1, t, { style: 'ink' });
    floorLamp(LAY.lampA, LAY.floorY - 10, 1, { on: 0, style: 'ink' });
    floorLamp(LAY.lampB, LAY.floorY - 10, 1, { on: 0, style: 'ink' });
    couchBack(LAY.couch, LAY.seatY + 96, 1, { style: 'ink' });
    couchFront(LAY.couch, LAY.seatY + 96, 1, { style: 'ink' });
    desk(LAY.desk, LAY.floorY, 1, t, { style: 'ink', spin: 0 });
    tableLamp(LAY.lampDesk, LAY.deskTop - 20, .8, { on: 0, style: 'ink' });
    drumKit(LAY.drums, LAY.floorY + 60, .72, t, { style: 'ink' });
    if (H_.floor) H_.floor();
  }

  // ---------- Mike, front and centre ----------
  const MX = 1720, MY = 1000, MU = 24;
  function camA(t) {
    const k = ease(seg(t, T35, T38 + .6));
    return [MX + 14 * Math.sin((t - T35) * .45), lerp(640, 738, k), lerp(1.1, 1.36, k)];
  }
  const RAP_END = beatT(37, 2.1);   // in the third blackout he stops: something's there
  const TURN0 = ON(37) + .06, TURN1 = T38 - .07;   // the slow look behind (a drawn turn, key view by key view)
  function mikePose(t) {
    const m = mood('mike', t, [[T35 - 3, 'determined'], [ON(36) + .1, 'nervous', { emote: 'sweat' }], [RAP_END + .3, 'scared', { emote: 'sweat' }]], { take: .45 });
    const bp = bpOf(t), rapping = t < RAP_END;
    let lookX = m.lookX || 0, lookY = -.25;
    if (t < ON(35)) lookX = 0;
    else if (t < ON(36)) lookX = t > ON(35) + .35 && t < ON(35) + .8 ? -.8 : 0;    // a glance over the shoulder
    if (t > RAP_END) lookX = lerp(0, .9, ease(seg(t, RAP_END + .35, ON(37) - .1)));   // eyes slide back toward his shoulder
    const o = { ...m, ...(rapping ? singing(t, 'rap') : { mouth: t > RAP_END + .3 ? 'wobble' : 'flat' }), lookX, lookY,
      aL: rapping ? .25 + .75 * pulse(t, 4) * (1 - .4 * (beatN(t) % 2)) : -.5, micBob: .1 * Math.sin(bp * Math.PI),
      sq: (m.sq || 0) + .06, dy: (m.dy || 0) * .6, emote: t > ON(35) ? m.emote : null, seed: 1 };
    if (t > RAP_END + .3) { o.eyes = 'wide'; o.dx = .04 * Math.sin(t * 40); o.aL = -.7; o.rot = 0; }
    if (t > TURN0) {   // the slow turn to look behind him
      Object.assign(o, turn(t, TURN0, TURN1, 0, .5), { smear: 0, micAt: 'up', aR: -.75, aL: -.7, sq: .04, dx: 0, rot: 0 });   // slow: no smear
    }
    return o;
  }

  // ---------- the Inks in the dark: one clear position per blackout ----------
  // each: [of, x, y, u, extra]
  const INKS = [
    // bar 35: scattered along the back of the room, small, still
    [['rob', 1440, 826, 11.5, { rot: -.05 }], ['joe', 1585, 808, 11, {}], ['mike', 1735, 830, 12.5, { walk: .3 }], ['brad', 1905, 812, 11.5, { rot: .04 }], ['phoenix', 2075, 822, 12, {}], ['chester', 2250, 832, 12.5, { rot: .05 }]],
    // bar 36: halfway down the rug, a closing ring round him, a gap left right behind him
    [['joe', 1290, 866, 14, {}], ['rob', 2170, 862, 14, {}], ['brad', 1425, 896, 16, { walk: .2, rot: .05 }], ['chester', 2025, 898, 16.5, { walk: .7, rot: -.05 }], ['phoenix', 1880, 850, 13.5, {}], ['mike', 1555, 852, 13.5, {}]],
    // bar 37: RIGHT behind him. His own Ink towers over him, stretched tall, claws up, grinning over his head
    [['phoenix', 1330, 928, 19, { rot: .06 }], ['joe', 2110, 926, 19, { rot: -.06 }], ['brad', 1470, 962, 24, { aL: .9, aR: .2, rot: .07 }], ['chester', 1975, 964, 25, { aL: .3, aR: 1.0, rot: -.07 }],
     ['mike', 1700, 976, 33, { aL: 1.4, aR: 1.25, sy: 1.62, sx: .9, rot: .06 }]]
  ];
  function inks(t, n, age) {
    const set = INKS[n].slice().sort((a, b) => a[2] - b[2]);
    set.forEach(([of, x, y, u, ex], i) => {
      const open = ease(seg(age, .1 + .03 * i, .22 + .03 * i));   // eyes snap open where they stand
      const lean = n === 2 ? .04 * Math.sin(age * 2.2 + i) : 0;
      inkling(x, y, u, { of, grin: n ? 1 : .0, drip: .4 + .25 * n, seed: i + 3, squint: 1 - open, aL: -.35, aR: -.3, noShadow: false,
        walk: .15, sq: .03 * Math.sin(age * 3 + i), rot: lean, boilKey: 'c6ink' + n + of, ...ex });
    });
  }

  // ---------- the parlor, lit (c5's end state) ----------
  function litParlor(t, lamp) {
    parlor(t, {
      lamps: { a: lamp, b: lamp, desk: lamp, sconce: lamp }, cold: .45, ambient: .36, dark: (1 - lamp) * .8, ink: .5, peel: .7,
      portrait: { stage: 'ink', grin: t > T37 ? 1 : 0 }, drums: drumHits(t, .6),
      hooks: bandHooks(t, { skip: ['mike'], energy: .5, style: { chester: 'idle' },
        over: { chester: { ...mfeel('chester', 'nervous', t, { seed: 2 }), emote: null, mic: 'R', micAt: 'up', aR: .3 } },
        floorAfter: () => member('mike', MX, MY, MU, mikePose(t)) })
    });
  }

  // ---------- shot 1: lights on, lights off ----------
  function sStrobe(t, lt, dur) {
    const st = strobe(t), [cx, cy, z] = camA(t);
    if (!st.dark) {
      camBegin(cx, cy, z);
      litParlor(t, lampK(t));
      camEnd();
      return;
    }
    // BLACKOUT: the negative room develops a beat after the lamps die; the Inks' eyes lead the eye
    camBegin(cx, cy, z);
    negRoom(t);
    camEnd();
    const fade = 1 - ease(seg(st.age, .1, .4));
    flash(.35 + .65 * fade, '#0B0911');
    camBegin(cx, cy, z);
    inks(t, st.n, st.age);
    const mp = mikePose(t);
    member('mike', MX, MY, MU, mp);
    castShadow(silPolys('mike', MX, MY, MU, { ...mp, aR: 2.9 }).map(P => toScreenPts(P)), { col: '#1A1430', alpha: .62, blur: 3 });
    camEnd();
  }

  // ---------- shot 2a: he looks, nothing; relief; the lamps pop out ----------
  const TURNB0 = T38 + .23, TURNB1 = T38 + .4, DIE = beatT(38, 1), CUT_B = beatT(38, 1.25);
  function mikePose2(t) {
    const m = mood('mike', t, [[T38 - 3, 'scared', { emote: 'sweat' }], [TURNB1 + .03, 'relieved'], [DIE + .06, 'scared', { emote: null }]], { take: .8 });
    const o = { ...m, mouth: t < DIE ? m.mouth : 'wobble', seed: 1, micAt: 'up', aR: -.75, aL: -.6, lookY: t > DIE + .06 ? -.6 : 0 };
    if (t < TURNB1) Object.assign(o, turn(t, TURNB0, TURNB1, .5, 0), { sq: .04, dy: 0, dx: 0, rot: 0 });
    if (t > TURNB1 && t < DIE) { const br = seg(t, TURNB1 + .05, DIE); o.sq = .1 * Math.sin(br * Math.PI); o.dy = 0; }   // a long breath out
    return o;
  }
  // the lamps die one by one on beat 1: A (behind him), the desk lamp, the sconces; lamp B stutters and survives
  const lampDie = (t, d) => t < DIE + d ? 1 : t < DIE + d + .05 ? 1.6 : 0;   // a last flare, then out
  const lampBk = t => t < DIE ? 1 : t < DIE + .5 ? [1, .3, .8, .15, .7, .5, .9, .35, .85, .6, .8, .75][Math.floor((t - DIE) * 24)] ?? .8 : .82;
  function sLook(t, lt, dur) {
    const [cx, cy, z] = camA(t), lA = lampDie(t, 0), lD = lampDie(t, .05), lS = lampDie(t, .1), lB = lampBk(t);
    camBegin(cx, cy, z);
    parlor(t, {
      lamps: { a: lA, b: lB, desk: lD, sconce: lS }, cold: .45, ambient: .36, dark: t > DIE + .12 ? .75 : 0, ink: .5, peel: .7,
      portrait: { stage: 'ink', grin: 1 }, drums: drumHits(t, .3),
      hooks: bandHooks(t, { skip: ['mike'], energy: .35, style: { chester: 'idle' },
        over: { chester: { ...mfeel('chester', 'nervous', t, { seed: 2 }), emote: null, mic: 'R', micAt: 'up', aR: .3, ...(t > DIE ? { lookY: -.8, eyes: 'wide' } : {}) },
          brad: t > DIE ? { lookY: -.8, eyes: 'wide' } : {}, phoenix: t > DIE ? { lookY: -.8, eyes: 'wide', mouth: 'o' } : {} },
        floorAfter: () => member('mike', MX, MY, MU, mikePose2(t)) })
    });
    camEnd();
  }

  // ---------- shots 2b-3: the huddle in lamp B's pool; the eyes; the Face rises ----------
  const POOL = [2040, 950, 540];
  // the huddle: [name, x, y, u] (back row first); Chester in the back row, so he can step out toward the Face
  const HUD = [['joe', 1875, 950, 19], ['chester', 2040, 944, 20], ['phoenix', 2205, 952, 19.5], ['brad', 1800, 1006, 21], ['mike', 1965, 1012, 21], ['rob', 2128, 1008, 21]];
  // pairs of eyes blinking open in the dark: one on beat 2, one on beat 3, then a flurry on the eighths
  const EYES = (() => {
    const L = [[beatT(38, 2), 1420, 520, 46], [beatT(38, 3), 2700, 640, 50]], spots = [[1330, 280], [2830, 330], [1560, 170], [2560, 160], [1290, 720], [2900, 800], [1680, 380], [2440, 430], [1460, 860], [2760, 900], [1860, 210], [2250, 240], [1230, 500], [2990, 560]];
    spots.forEach(([x, y], i) => L.push([beatT(38, 3.25) + Math.floor(i / 2) * EIGHTH * .25 + .03 * hash(i + 7), x, y, 24 + 20 * hash(i + 3)]));
    return L;
  })();
  function eyePair(x, y, s, open, lx = 0, red = 0, key = 0) {
    if (open <= .03) return;
    boilSeed('c6 eyes ' + key);
    const col = red > .5 ? '#FF6A50' : '#F4EDC9', gc = red > .5 ? '#FF3B2E' : '#D8F0A0';
    glow(x, y, s * 2.4, gc, .6 * Math.min(1, open));
    for (const sd of [-1, 1]) {
      const ex = x + sd * s * .58 + lx * s * .12, h = s * open;
      paint(rectPts(ex - s * .15, y - h / 2, s * .3, h, s * .03), { wash: col, ink: null });
    }
  }
  const FACE_UP0 = T39 + .05, FACE_UP1 = T39 + 1.5, FACE_OPEN = T39 + .95;
  function faceState(t) {
    if (t < FACE_UP0) return null;
    const k = easeOut(seg(t, FACE_UP0, FACE_UP1)), s = 60;   // like a moon: quick off the horizon, slowing as it climbs
    // it comes up with its eyes already slitted open, two thin moons rising; at the top they open wide
    return { cx: 1905, cy: lerp(1000, 200, k) + 6 * Math.sin((t - FACE_UP0) * 1.3), s, open: lerp(.2, 1, easeOut(seg(t, FACE_OPEN, FACE_OPEN + .35))), grin: 1, lookY: .55, lookX: .05 };
  }
  // the Face's silhouette (as bigFace draws it) grown by m, cut off at the couch top and the floor line behind it
  function faceMask(F, m) {
    const { cx, cy, s } = F, L = cx - 10 * s - m, R = cx + 10 * s + m, top = cy - 7.5 * s - m, r = 2.2 * s + m, P = [];
    for (let i = 0; i <= 8; i++) { const a = Math.PI + i / 8 * Math.PI / 2; P.push([L + r + Math.cos(a) * r, top + r + Math.sin(a) * r]); }
    for (let i = 0; i <= 8; i++) { const a = 1.5 * Math.PI + i / 8 * Math.PI / 2; P.push([R - r + Math.cos(a) * r, top + r + Math.sin(a) * r]); }
    const cL = LAY.couch - 350, cR = LAY.couch + 350, cT = LAY.seatY + 96 - 246, fl = LAY.floorY - 2;
    P.push([R, fl], [cR + 8, fl], [cR + 8, cT + 40], [cR - 30, cT], [cL + 30, cT], [cL - 8, cT + 40], [cL - 8, fl], [L, fl]);
    return P.map(([x, y]) => [x, Math.min(y, fl)]);
  }
  function camB(t) {
    const k = ease(seg(t, T39 + .15, T39 + 1.9));
    return [lerp(2060, 1945, k) + 10 * Math.sin((t - CUT_B) * .5), lerp(730, 455, k), lerp(1.12, .88, k)];
  }
  function sHuddle(t, lt, dur) {
    const cam = camB(t), F = faceState(t), lB = lampBk(t) * (1 + .06 * Math.sin(t * 7));
    if (F) paintLayer('c6face', () => {
      camBegin(...cam);
      boilSeed('c6 face bg'); paint(rectPts(F.cx - 1300, F.cy - 900, 2600, 2400), { wash: PC.inkBody, ink: null });
      bigFace(F.cx, F.cy, F.s, t, F);
      camEnd();
    });
    const eyesOpen = F ? F.open : 0;
    camBegin(...cam);
    parlor(t, {
      lamps: { a: 0, b: lB, desk: 0, sconce: 0 }, cold: .5, ambient: .36, dark: .85, ink: .5, peel: .7, portrait: { stage: 'ink', grin: 1 },
      lights: [[POOL[0], POOL[1], POOL[2], lB], ...(F ? [[F.cx - 4.8 * F.s, F.cy - 1.8 * F.s, 700, .55 * eyesOpen], [F.cx + 4.8 * F.s, F.cy - 1.8 * F.s, 700, .55 * eyesOpen]] : [])],
      hooks: { lit: () => {
        // eyes in the dark: they all shut as the Face opens its own
        EYES.forEach(([t0, x, y, s], i) => {
          const open = backOut(seg(t, t0, t0 + .12)) * (1 - seg(t, FACE_OPEN + .02 * (i % 5), FACE_OPEN + .1 + .02 * (i % 5))), blink = frac((t - t0) * .45 + hash(i)) < .05 ? .1 : 1;
          eyePair(x, y, s, open * blink, clamp((2050 - x) / 700, -1, 1), 0, i);
        });
        if (F) {
          glow(F.cx, F.cy - 2 * F.s, 13 * F.s, '#5A4C80', .28);   // a cold halo round it: a black moon
          showLayer('c6face', [toScreenPts(faceMask(F, .25 * F.s))], { feather: 2 });
          floorLamp(LAY.lampB, LAY.floorY - 10, 1, { on: lB, cold: .5 });
        }
        huddle(t, F);
        // the paper dragonfly circles the lamp shade like a moth; when the Face opens its eyes it bolts off to the right
        const dt = t - CUT_B, fl = easeIn(seg(t, FACE_OPEN + .05, FACE_OPEN + .9));
        const dx = 2360 + 125 * Math.cos(dt * 2.3) + 1500 * fl, dyy = 300 + 50 * Math.sin(dt * 4.6) - 20 * Math.cos(dt * 2.3) - 380 * fl;
        const vx = -125 * 2.3 * Math.sin(dt * 2.3) + 3000 * fl, vy = 50 * 4.6 * Math.cos(dt * 4.6) + 20 * 2.3 * Math.sin(dt * 2.3) - 700 * fl;
        if (fl < 1) dragonfly(dx, dyy, .55, t, { rot: Math.atan2(vy, vx), flap: 1 });
      } }
    });
    camEnd();
  }
  // the band huddled, scared; their eyes dart to each new pair of eyes; then (shot 3) they turn round one by one
  // turn order and direction (-1 = round by their left, 1 = by their right): Mike first, Chester last and fastest
  const TURNS = { mike: [0, 1], phoenix: [1, 1], brad: [2, -1], rob: [3, 1], joe: [4, -1], chester: [5, -1] };
  const TURN_AT = name => FACE_OPEN + .32 + TURNS[name][0] * .17;
  const STEP0 = T40 - .66, STEP1 = T40 - .2;   // Chester steps out toward the Face, then gathers himself
  function huddle(t, F) {
    let target = 0;   // where they look: -1 left .. 1 right
    for (const [t0, x] of EYES.slice(0, 2)) if (t > t0 + .08) target = x < 2050 ? -1 : 1;
    const drawn = [];
    HUD.forEach(([name, x, y, u], i) => {
      const f = mfeel(name, 'scared', t, { seed: i * 3 + 1 }), react = target * ease(seg(t, EYES[0][0] + .1 + .05 * i, EYES[0][0] + .25 + .05 * i));
      const o = { ...f, mic: false, inst: false, emote: i === 4 ? 'sweat' : null, lookX: t > EYES[2][0] ? .8 * Math.sin(t * 9 + i * 2) : react, dx: .15 * Math.sin(t * 31 + i), boilKey: 'hud' + name };
      if (name === 'rob') { o.armL = stickHook(.3); o.armR = stickHook(-.2); o.aL = .9; o.aR = .7; }
      // the light floods from behind them: they freeze, then turn round one by one to look up at it
      const ta = TURN_AT(name), dir = TURNS[name][1], dur = name === 'chester' ? .2 : .3;
      if (F && t > FACE_OPEN) { o.lookX = 0; o.lookY = -.3; o.dx = .06 * Math.sin(t * 40 + i); o.emote = null; }
      if (t > ta) {
        Object.assign(o, turn(t, ta, ta + dur, 0, .5 * dir), { aL: -.45, aR: -.45, sq: -.07 * ease(seg(t, ta + dur, ta + dur + .25)), dy: -.25 * ease(seg(t, ta + dur, ta + dur + .25)) });
        if (name === 'rob') { o.aL = .5; o.aR = .4; }
      }
      let px = x, py = y, pu = u;
      if (name === 'chester' && t > STEP0) {   // three steps toward the Face (away from us), then a crouch: he fills his lungs
        const k = ease(seg(t, STEP0, STEP1));
        px = lerp(x, 2052, k); py = lerp(y, 858, k); pu = lerp(u, 18.5, k);
        o.walk = k * 1.5; o.dy = -.3 * Math.abs(Math.sin(k * 1.5 * Math.PI));
        const c = seg(t, STEP1 + .02, T40); o.sq = .22 * ease(c); o.aL = -.45 - .5 * ease(c); o.aR = o.aL;
      }
      drawn.push([name, px, py, pu, o]);
    });
    if (F && F.open > .02) {   // the Face's eyes light them from behind: long shadows thrown across the rug toward us (one pass)
      const sp = []; for (const [name, px, py, pu, o] of drawn) for (const P of silPolys(name, px, py, pu, o)) sp.push(toScreenPts(P.map(([qx, qy]) => [px + (qx - px) * 1.08 + (px - F.cx) * .12 * (py - qy) / 100, py + (py - qy) * .55 + 3])));
      castShadow(sp, { col: '#1A1430', alpha: .42 * F.open, blur: 5 });
    }
    for (const [name, px, py, pu, o] of drawn) member(name, px, py, pu, o);
  }

  // ---------- effects: blasts of brush-stroke rings, cracks of light ----------
  // rings of dry-brush strokes flying from (x, y) along dir (radians), spread +-spread, from r0 out to rMax (world units)
  function blast(x, y, dir, spread, rMax, t, t0, o = {}) {
    if (t < t0) return;
    const period = o.period ?? .12, life = o.life ?? .45, a0 = t - t0, w = o.w ?? 1;
    for (let i = Math.max(0, Math.floor((a0 - life) / period)); i <= Math.floor(a0 / period); i++) {
      const a = a0 - i * period; if (a < 0 || a > life) continue;
      const k = a / life, R = typeof rMax === 'function' ? rMax(t) : rMax, r = lerp(o.r0 ?? 20, R, Math.pow(k, .8)), fade = 1 - Math.pow(k, 4), P = [];
      for (let j = 0; j <= 16; j++) { const ang = dir + lerp(-spread, spread, j / 16); P.push([x + Math.cos(ang) * r, y + Math.sin(ang) * r * (o.squash ?? 1)]); }
      boilSeed('c6 blast ' + (o.key || '') + i);
      inkLine(P, w * (.35 + .65 * fade), o.col || PAL.cream, 'dry', .6);
      inkLine(P, w * .38 * fade, o.core || o.col || PAL.cream, 'ink', .6);
    }
  }
  // a crack of light racing from a to b: k 0..1 how far it has run, w its width (whatever space we're in)
  function zig(a, b, seed, n = 12, amp = .04) {   // a crack's zigzag: straight runs with sharp kinks (deterministic)
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, P = [a];
    for (let i = 1; i < n; i++) { const k = (i + .35 * (hash(i * 3.7 + seed) - .5)) / n, off = (hash(i * 7.3 + seed * 13.1) - .5) * 2 * amp * L; P.push([a[0] + dx * k + nx * off, a[1] + dy * k + ny * off]); }
    P.push(b); return P;
  }
  function crack(a, b, seed, k, w, amp = .04, glowR = 60, halo = .3) {
    if (k <= 0) return;
    const L = zig(a, b, seed, 12, amp), n = L.length - 1, f = k * n, i = Math.floor(f), P = L.slice(0, i + 1);
    if (i < n) P.push([lerp(L[i][0], L[i + 1][0], f - i), lerp(L[i][1], L[i + 1][1], f - i)]);
    if (P.length < 2) return;
    boilSeed('c6 crack ' + seed);
    if (halo > 0) inkLine(P, w * halo, '#FFE2A8', 'dry', 0);         // light bleeding out of the slit
    inkLine(P, w, '#FFF8E6', 'ink', 0);               // the slit itself
    if (k < 1) glow(P[P.length - 1][0], P[P.length - 1][1], glowR, '#FFF3D0', .9);   // the running tip
  }
  // Rob's count-in: the stock stick, drawn at 1.85x so that a Clawd's stubby arms can bring the tips together overhead.
  // apart 0 = tips touching. tips(): where the two tips are (world), for the sparks.
  const ROB_A = 1.6, STK = 1.85;
  const countStick = apart => (u, sw) => stickHook(.05 - .5 * apart)(u * STK, sw);
  function robTips(x, y, u, apart) {
    const M = BAND.rob, piv = 4.9 + .55 * clamp((ROB_A - .7) / .9), tx = piv + 2.2 * Math.cos(-ROB_A), ty = -4.5 + 2.2 * Math.sin(-ROB_A), ang = -ROB_A - .9 - (.05 - .5 * apart);
    const ex = tx + 3.5 * STK * Math.cos(ang), ey = ty + 3.5 * STK * Math.sin(ang);
    return [[x - ex * u * M.sx, y + ey * u * M.sy], [x + ex * u * M.sx, y + ey * u * M.sy]];
  }
  // how far apart the sticks are: they touch exactly on each click, part and swing back between
  const CLICKS = [0, 1, 2, 3].map(b => beatT(41, b));
  function sticksApart(t) { const bp = bpOf(t) - bpOf(CLICKS[0]); return bp < 0 ? clamp(-bp * 2.5) : bp > 3 ? ease(clamp((bp - 3) * 2.5)) : Math.pow(Math.sin(frac(bp) * Math.PI), .6); }
  function clickSparks(t, tips) {
    CLICKS.forEach((c, i) => {
      const a = t - c; if (a < -.01 || a > .32) return;
      const q = clamp(a / .32), px = (tips[0][0] + tips[1][0]) / 2, py = (tips[0][1] + tips[1][1]) / 2, r = 14 + 60 * easeOut(q);
      glow(px, py, 90, '#FFE9A8', 1 - q);
      boilSeed('c6 spark' + i);
      for (let j = 0; j < 8; j++) { const ang = j / 8 * TAU + i * .7, r0 = r * (.35 + .1 * (j % 2)); inkLine([[px + Math.cos(ang) * r0, py + Math.sin(ang) * r0], [px + Math.cos(ang) * r, py + Math.sin(ang) * r]], 1.4 * (1 - q) + .3, '#FFF1C8', 'ink', 0); }
    });
  }

  // ---------- camera C: the reverse angle (the Face's view): Chester front on, the band behind him ----------
  const CH = [1960, 1000, 22];
  const REV = [['phoenix', 1992, 896, 15], ['joe', 2240, 902, 15.5], ['brad', 1690, 928, 17], ['mike', 1835, 922, 16.5], ['rob', 2112, 924, 17]];
  const CUT_D = beatT(40, 1.5), TEAR0 = CUT_D + .12, TEAR1 = TEAR0 + .3, CUT_C2 = beatT(41, 2);
  function revRoom(t, o) {
    const x0 = 800, x1 = 3100;
    wallpaper(x0, x1, t);
    peelStrips(t, .7);
    wainscot(x0, x1, false);
    crown(x0, x1, false);
    floorBoards(x0, x1, false);
    rug(1960, 1010, 900, 140, false);
    floorLamp(1560, LAY.floorY - 10, 1, { on: o.lamp ?? .8, cold: .5 });
    if (o.band) o.band();
    if (o.chester) o.chester();
    roomLight(o.dark ?? .9, o.lights || [], { col: o.darkCol });
    if (o.lit) o.lit();
  }
  const screen = () => [[-40, -40], [W + 40, -40], [W + 40, H + 40], [-40, H + 40]];
  // 4a: Chester screams at the Face (and at us). Cold light from the Face's eyes; cream rings fan out round him.
  function sScream(t, lt, dur) {
    const [sx, sy] = shakeXY(t, 4 + 5 * seg(t, T40, CUT_D)), z = lerp(1.85, 2.08, ease(seg(t, T40, CUT_D)));
    const burst = backOut(seg(t, T40 - .03, T40 + .08)), u = CH[2], mouth = [CH[0] - .5 * u, CH[1] - 6.2 * u * 1.07];
    camBegin(CH[0] + sx, 792 + sy, z);
    revRoom(t, {
      lamp: .7, dark: .92, darkCol: '#0C1118',
      lights: [[1560, 290, 650, .6], [CH[0], 880, 520, 1]],
      band: () => REV.forEach(([name, x, y, uu], i) => member(name, x, y, uu, { ...mfeel(name, 'scared', t, { seed: i + 20 }), eyes: 'squeeze', mouth: 'wobble', emote: null, mic: false, inst: false,
        aL: 1.35 + .1 * Math.sin(t * 30 + i), aR: 1.3 + .1 * Math.sin(t * 27 + i), rot: (x < CH[0] ? -1 : 1) * .1 * burst, dx: (x < CH[0] ? -1 : 1) * .35 * burst + .06 * Math.sin(t * 50 + i),
        ...(name === 'rob' ? { armL: stickHook(.3), armR: stickHook(-.2) } : {}), boilKey: 'rev' + name })),
      chester: () => member('chester', CH[0], CH[1], u, { ...mfeel('chester', 'furious', t, { seed: 2 }), emote: null, mic: false, mouth: null, eyes: 'angry', tintK: .3,
        lid: lerp(.04, .66, burst) + .025 * Math.sin(t * 47), aL: -1.05 + .12 * Math.sin(t * 31), aR: -1.1 + .12 * Math.sin(t * 29), sq: -.1 * burst, dx: .05 * Math.sin(t * 61), rot: .015 * Math.sin(t * 23), boilKey: 'revchester' }),
      lit: () => {
        blast(mouth[0], mouth[1], -Math.PI / 2, 1.35, 30 * u, t, T40 + .02, { r0: 9 * u, period: .1, life: .5, w: 1.35, col: '#FFF1D6', core: '#FFFBEF', squash: .82, key: 'a' });
        glow(mouth[0], mouth[1] + 20, 5 * u, '#FFF3D0', .5 * burst);
      }
    });
    camEnd();
    castShadow([screen()], { col: '#9DBCC8', alpha: .38, blur: 0 });   // the Face's cold light
  }

  // camera D: low behind Chester (lower left) and Rob (foreground right); the Face looms upper right
  const FD = { cx: 2480, cy: 90, s: 72 }, CD = [1350, 1090, 34], RD = [930, 1190, 40];
  const cHead = [CD[0] + 10, CD[1] - 9.2 * CD[2] * 1.07], fMouth = [FD.cx - 130, FD.cy + 4.2 * FD.s + 150];
  const MID = [lerp(cHead[0], fMouth[0], .5), lerp(cHead[1], fMouth[1], .5)], AX = Math.atan2(fMouth[1] - cHead[1], fMouth[0] - cHead[0]), DIST = Math.hypot(fMouth[0] - cHead[0], fMouth[1] - cHead[1]);
  function faceMaskD(F, m) {   // the Face surged forward: in front of the couch, cut only at the floor line
    const { cx, cy, s } = F, L = cx - 10 * s - m, R = cx + 10 * s + m, top = cy - 7.5 * s - m, r = 2.2 * s + m, P = [], fl = LAY.floorY + 20;
    for (let i = 0; i <= 8; i++) { const a = Math.PI + i / 8 * Math.PI / 2; P.push([L + r + Math.cos(a) * r, top + r + Math.sin(a) * r]); }
    for (let i = 0; i <= 8; i++) { const a = 1.5 * Math.PI + i / 8 * Math.PI / 2; P.push([R - r + Math.cos(a) * r, top + r + Math.sin(a) * r]); }
    P.push([R, fl], [L, fl]);
    return P;
  }
  const DCRACKS = [[300, -700], [1250, -800], [2200, -800], [3500, -300], [3600, 520], [3500, 1300], [200, 250], [150, 900], [2500, 1400]];
  // 4b + 5a: the Face tears its smile open and screams back; the blasts meet; the seam bursts into cracks; Rob counts in
  function sClash(t, lt, dur) {
    const sc = ease(seg(t, TEAR0, TEAR1)), red = ease(seg(t, TEAR0 + .04, TEAR0 + .2)), hit = seg(t, TEAR0 + .3, T41), build = seg(t, T41, CUT_C2);
    const [sx, sy] = shakeXY(t, 5 + 13 * hit + 6 * build), cam = [1880 + sx / .8, 380 + sy / .8, .8 + .03 * build];
    const F = { ...FD, cy: FD.cy - 24 * sc, open: 1, grin: 1, scream: sc, red, lookX: -.45, lookY: .55 };
    paintLayer('c6faceD', () => {
      camBegin(...cam);
      boilSeed('c6 faceD bg'); paint(rectPts(F.cx - 1300, F.cy - 900, 2600, 2400), { wash: PC.inkBody, ink: null });
      bigFace(F.cx, F.cy, F.s, t, F);
      boilSeed('c6 faceD melt');   // its lower half melts into the dark floor
      for (let i = 0; i < 4; i++) { const y0 = F.cy + (8.6 + i * .5) * F.s; paint(rectPts(F.cx - 11 * F.s, y0, 22 * F.s, 12 * F.s), { fill: '#0B0911', fillOp: 80, bleed: .2, tex: .4, ink: null }); }
      camEnd();
    });
    camBegin(...cam);
    parlor(t, {
      lamps: { a: 0, b: .4, desk: 0, sconce: 0 }, cold: .5, ambient: .36, dark: .92, darkCol: mixCol('#120E1C', '#2A060C', red), ink: .5, peel: .7, portrait: { stage: 'ink', grin: 1 },
      lights: [[F.cx - 4.8 * F.s, F.cy - 1.8 * F.s, 760, .4], [F.cx + 4.8 * F.s, F.cy - 1.8 * F.s, 760, .4], [fMouth[0], fMouth[1], 900, .45 * red]],
      hooks: { lit: () => {
        glow(F.cx, F.cy + 2 * F.s, 14 * F.s, red > .5 ? '#FF3B2E' : '#5A4C80', .22 + .3 * red);
        showLayer('c6faceD', [toScreenPts(faceMaskD(F, .25 * F.s))], { feather: 2 });
        if (red > .01) glow(fMouth[0], fMouth[1] + 150, 1500, '#FF2A1A', .42 * red);   // red floods the room
        // Chester's cream rings reach all the way to the Face until it answers; then the red rings drive them back to the middle
        const reachC = tt => lerp(DIST * .9, DIST * .5, ease(seg(tt, TEAR0 + .1, TEAR0 + .45)));
        if (t < T41 + .3) blast(cHead[0], cHead[1], AX, .45, reachC, t, CUT_D - .6, { r0: 60, period: .12, life: .42, w: 1.7, col: '#FFF1D6', core: '#FFFBEF', key: 'c' });
        if (t < T41 + .3) blast(fMouth[0], fMouth[1], AX + Math.PI, .5, DIST * .52, t, TEAR0 + .12, { r0: 80, period: .11, life: .4, w: 2.1, col: '#FF5A43', core: '#FFC2A8', key: 'f' });
        // the seam where the screams meet: a jagged line of light across the axis, trembling, brighter and brighter
        const m = seg(t, TEAR0 + .42, TEAR0 + .56), nx = -Math.sin(AX), ny = Math.cos(AX);
        if (m > 0) {
          const len = 230 * m + 170 * hit + 200 * build;
          glow(MID[0], MID[1], 260 + 200 * hit + 300 * build, '#FFF3D0', .7 + .3 * pulse2(t, 8) + .3 * build);
          crack([MID[0] - nx * len, MID[1] - ny * len], [MID[0] + nx * len, MID[1] + ny * len], 5 + beatN(t) * 3 + Math.floor(t * 12) % 2, 1, (2.4 + 2.4 * hit) * m + 2.5 * build, .07, 0, .5);
        }
        // 5a: the seam splits the world's paper: cracks of light race out to the frame edges
        DCRACKS.forEach((e, i) => { const t0 = T41 + .02 + i * .09, run = ease(seg(t, t0, t0 + .75 + .2 * hash(i + 3))); crack(MID, e, i * 11 + 2, run, 1.6 + 2.4 * seg(t, t0 + .4, CUT_C2 + .5), .045, 90); });
        // Chester from behind: a dark shape against the red, screaming with his whole body
        const cp = { ...mfeel('chester', 'furious', t, { seed: 2 }), view: 'back', emote: null, mic: false, aL: -1.15 + .1 * Math.sin(t * 31), aR: -1.2 + .1 * Math.sin(t * 29),
          sq: -.13 + .05 * build, dx: .05 * Math.sin(t * 57), rot: .06 * (1 - build) + .015 * Math.sin(t * 23), boilKey: 'Dchester' };
        glow(CD[0], CD[1] - 5 * CD[2], 12 * CD[2], red > .5 ? '#FF3B2E' : '#D8F0A0', .5);
        member('chester', CD[0], CD[1], CD[2], cp);
        castShadow(silPolys('chester', CD[0], CD[1], CD[2], cp).map(P => toScreenPts(P)), { col: mixCol('#1A1430', '#3A0A14', red), alpha: .5, blur: 3 });
        // Rob in the foreground: braced against the blast; on the downbeat he throws his sticks up and counts in
        const raise = ease(seg(t, T41 - .22, T41 - .02)), ap = sticksApart(t);
        const rp = { ...mfeel('rob', 'determined', t, { seed: 12 }), view: 'back', emote: null, inst: false, noShadow: true, boilKey: 'Drob',
          aL: lerp(.9, ROB_A, raise), aR: lerp(.8, ROB_A, raise), armL: raise > .5 ? countStick(ap) : stickHook(.3), armR: raise > .5 ? countStick(ap) : stickHook(-.2),
          sq: .06 * pulse(t, 7) * raise, dx: .03 * Math.sin(t * 43) * (1 - raise) };
        glow(RD[0], RD[1] - 6 * RD[2], 11 * RD[2], red > .5 ? '#FF3B2E' : '#D8F0A0', .4);
        member('rob', RD[0], RD[1], RD[2], rp);
        castShadow(silPolys('rob', RD[0], RD[1], RD[2], rp).map(P => toScreenPts(P)), { col: mixCol('#1A1430', '#3A0A14', red), alpha: .5, blur: 3 });
        if (raise > .5) clickSparks(t, robTips(RD[0], RD[1] + (rp.dy || 0) * RD[2], RD[2], ap));
      } }
    });
    camEnd();
  }

  // ---------- 5b: Chester's resolve. Push in; clicks 3 and 4 over his head; the paper cracks round him; the flash ----------
  const FLASH0 = T42 - .36;
  const RIM = [[-60, 180, .12], [-60, 560, .5], [-60, 930, .92], [300, -60, .02], [960, -60, .3], [1620, -60, .6], [1980, 200, .15], [1980, 600, .75], [1980, 980, .4], [420, 1140, .85], [1500, 1140, .55]];
  function sResolve(t, lt, dur) {
    const p = seg(t, CUT_C2, T42), push = p * p * (1.5 - .5 * p), redK = 1 - ease(seg(t, CUT_C2 + .2, T42 - .2));
    const C5 = [1960, 1075, 36], gy = C5[1] - 6.2 * C5[2] * 1.07;   // his glasses
    const [sx, sy] = shakeXY(t, 3 + 5 * p), z = lerp(1.22, 3.75, push), cx = lerp(1985, C5[0] + 6, push), cy = lerp(850, gy + 12, push);
    const rp = { ...mfeel('rob', 'determined', t, { seed: 12 }), emote: null, inst: false, boilKey: 'Rrob', aL: ROB_A, aR: ROB_A, armL: countStick(sticksApart(t)), armR: countStick(sticksApart(t)), mouth: pulse(t, 9) > .45 ? 'open' : 'flat' };
    const rob = REV.find(r => r[0] === 'rob');
    camBegin(cx + sx / z * 2, cy + sy / z * 2, z);
    revRoom(t, {
      lamp: .7, dark: .92, darkCol: mixCol('#120E1C', '#2A060C', redK),
      lights: [[1560, 290, 600, .55], [C5[0], 960, 470, 1]],
      band: () => REV.forEach(([name, x, y, u], i) => {
        if (name === 'rob') { member(name, x, y, u, rp); return; }
        member(name, x, y, u, { ...mfeel(name, 'determined', t, { seed: i + 20 }), emote: null, mic: false, inst: false, aL: -.3, aR: -.3, boilKey: 'rev' + name });
      }),
      chester: () => member('chester', C5[0], C5[1], C5[2], { ...mood('chester', t, [[T41 - 2, 'angry'], [CUT_C2 + .1, 'determined']], { take: .5 }), emote: null, mic: false, mouth: 'flat', lid: 0,
        lookY: -.1, aL: -.35 + .08 * Math.sin(t * 5), aR: -.4, boilKey: 'revchester',
        draw: (u, sw) => {   // the glasses flash: a glint runs across both lenses, then a star of light on one
          const g = seg(t, T42 - .66, T42 - .36); if (g > 0 && g < 1) for (const s of [-1, 1]) { const gx = (s * 2.5 - 1.2 + 2.4 * g) * u; inkLine([[gx - .3 * u, -5.25 * u], [gx + .3 * u, -6.95 * u]], sw * 1.1 * Math.sin(g * Math.PI), '#FFF8E6', 'ink', 0); }
          const st = seg(t, T42 - .44, T42 - .06);
          if (st > 0) { glow(2.6 * u, -6.7 * u, u * (1.5 + 10 * st * st), '#FFF3D0', .95); paint(starPts(2.6 * u, -6.7 * u, u * (.3 + 1.6 * backOut(st)), .14, 4, Math.PI / 4 + .6 * st), { wash: '#FFF8E6', ink: null }); }
        } }),
      lit: () => {
        if (redK > .01) glow(C5[0], 800, 900, '#FF2A1A', .38 * redK);
        clickSparks(t, robTips(rob[1], rob[2], rob[3], sticksApart(t)));
      }
    });
    camEnd();
    // round him the world's paper strains: cracks of light run out to the frame edges (screen space)
    RIM.forEach(([ex, ey, d], i) => {
      const a = Math.atan2(ey - 470, ex - 960), o = [960 + Math.cos(a) * 470, 470 + Math.sin(a) * 330], t0 = CUT_C2 + .05 + d * .9;
      crack(o, [ex, ey], i * 17 + 9, ease(seg(t, t0, t0 + .55)), 1.8 + 3.2 * ease(seg(t, t0 + .3, T42)), .05, 70, .15);
    });
    if (t < CUT_C2 + .09) flash(.5 * (1 - seg(t, CUT_C2, CUT_C2 + .09)), '#FFF8E6');   // the cut lands on click 3 with a pop of light
    // the cream flash, peaking at the seam
    const fk = Math.pow(seg(t, FLASH0, T42 - .03), 1.5);
    if (fk > 0) { glow(W / 2 + 110, H / 2 - 60, 700 + 1200 * fk, '#FFF3D0', fk); flash(fk, '#FFF8E6'); }
  }

  shots([[T35, sStrobe], [T38, sLook], [CUT_B, sHuddle], [T40, sScream], [CUT_D, sClash], [CUT_C2, sResolve]]);
})();
