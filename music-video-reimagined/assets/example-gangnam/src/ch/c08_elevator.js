// c08_elevator.js · barT(60) 112.909 → barT(72) 134.727 · pre-chorus A2 (bars 60–66) + pre-chorus B2 (bars 67–71)
//
// ======================================== SHOT PLAN ========================================
// A2 · THE ELEVATOR · 112.909 → CUT (≈125.39) · the garage's elevator (ELEV_X 3300)
//   Camera: opens exactly on STAGE.garage.elevator [3300, 600, 1.2] (c07's last framing, doors shut on floor 1),
//   creeps in across the reveals (1.2 → ~1.45, then ~1.75 on the Horse's stare), a small zoom punch on every DING,
//   then pulls back hard for the burst. The car's interior is painted as a layer and shown only through the door
//   opening, so whoever is inside is cropped by the frame (crammed!) and the doors slide over them.
//   The gag: a DING on a downbeat every 2 bars, the floor number counting up, the doors sliding open (0.2 s) on
//   escalating chaos, a held read, the doors closing, a beat of closed doors that sets up the next one.
//   DING 1 · bar 60 · 112.909 · floor 2
//       doors open on OPPA (black tux) squatting low in the car, cool, rapping, and ELEVATOR GUY right behind him,
//       leaning over him, dancing wildly (fists pumping, knees pumping on the eighths, grinning). Oppa never breaks
//       his cool: when a fist whizzes past his head he leans away without missing a syllable (beat 3).
//       Doors close on beat 6. Closed: the doors rattle open a crack on the beats (still dancing in there),
//       the up-arrow blinks, floor 2 → 3.
//   DING 2 · bar 62 · 116.545 · floor 3
//       open on the car CRAMMED floor to ceiling: a pyramid of dancing GRANNIES (vArms, disco, visors bouncing),
//       the top one squashed against the ceiling, the side ones cropped by the frame, and OPPA squished in the
//       middle of the bottom row, sweating, still rapping. Doors close on beat 13.5.
//       Closed: the doors bulge and rattle with the party... then everything goes STILL. Floor 3 → 4.
//   DING 3 · bar 64 · 120.182 · floor 4 · THE LONGEST HOLD
//       open on THE HORSE, alone, standing upright in the middle of the car like a commuter, a carrot in its
//       hoof, staring straight at us, deadpan. It slowly takes a bite (crumbs), chews side to side, blinks once,
//       takes another bite. The camera creeps in on its face. The doors slide shut SLOWLY on its stare (beat 22.5).
//   DING 4 · bar 66 · 123.818 · floor 5
//       a quick rattle, then the doors BURST open: EVERYONE pours out at us (Elevator Guy, the Rival, the Kid, the
//       Boss, two Grannies, Oppa) on arcs, landing in a fan on the garage floor, galloping on the beat; the camera
//       punches in then pulls back to take them in. Behind them the Horse is still in the car, chewing.
//       Beat 3 (125.18): Oppa crouches and LEAPS straight up out of the top of the frame → CUT ON ACTION.
// B2 · THE SUBWAY · CUT → 134.727 · the subway set, moving (windows streaking, handles swaying, a gentle rock)
//   ≈125.39  Oppa, now in the white shirt & khakis, drops in from the top of the frame and lands in the aisle ON the
//            downbeat of bar 67 (125.636), next to the POP STAR, who is already dancing. Camera medium on the pair.
//   bar 67   Oppa and the Pop Star dance hipsway in the aisle. Around them the commuters are bored: a phone, a
//            newspaper-less stare, a sleeper at the far end.
//   bar 68   both fling the disco point to the RIGHT → THE DOMINOES, one per beat, down the car, the camera panning
//            with them: R1 (seated) bobs, then hops up onto the seat into a full gallop; R2 (standing) bobs, jumps
//            into the gallop, then turns to gallop AT...
//   bar 69   ...THE HORSE (upright, one hoof on a strap, the other holding a newspaper of scribbles up to its nose).
//            The chain stops dead. A held beat. The Horse turns a page. R3 beyond it catches the dance anyway.
//   bar 70   the disco point to the LEFT: the camera pulls back and swings left as the chain races down the left
//            side, one per half beat (L1..L4). The sleeper at the far end sleeps on.
//   bar 71   the whole car gallops; the camera settles into STAGE.subway.wide.
// SEAM OUT 134.727: camera [1500, 560, .75] (still); Oppa (white) at (1400, 900) u 24 and the Pop Star at (1750, 900)
//   u 22, both mid-gallop; the commuters galloping (the sleeper at the far left excepted); the Horse upright at the
//   right, strap + newspaper.
// ===========================================================================================
(() => {
  // ---------- time ----------
  const T0 = barT(60), TB = barT(67), TE = barT(72);
  const ab = k => T0 + k * BEAT;                 // A2 beat k (0 = the bar-60 downbeat)
  const bb = k => TB + k * BEAT;                 // B2 beat k (0 = the bar-67 downbeat)
  const D = [ab(0), ab(8), ab(16), ab(24)];      // the four DINGs (bars 60, 62, 64, 66)
  const LEAP = ab(27);                           // Oppa's takeoff (bar 66, beat 4)
  const CUT = TB - .31;                          // cut on action into the subway (Oppa leaves the top of one frame, drops into the next, lands on the downbeat)

  // ---------- small helpers ----------
  const bump = (t, t0, rise = .07, k = 7) => t < t0 ? 0 : Math.sin(Math.min(1, (t - t0) / rise) * Math.PI / 2) * Math.exp(-Math.max(0, t - t0 - rise) * k);
  const P = (u, pts, ox = 0, oy = 0) => pts.map(([a, b]) => [ox + a * u, oy + b * u]);

  // ================================= A2 · THE ELEVATOR =================================
  const EX = ELEV_X, CAR = { L: EX - 130, R: EX + 130, T: 400, B: FLOOR };
  // door schedule: [open at, open time, close at, close time]
  const DOORS = [[D[0], .2, ab(6), .25], [D[1], .2, ab(13.5), .25], [D[2], .22, ab(22.5), .45], [D[3], .09, 1e9, 1]];
  const crack = (t, t0, t1, amt, per) => { if (t < t0 || t > t1) return 0; const f = frac((t - t0) / per); return amt * Math.exp(-f * 10) * (f < .03 ? f / .03 : 1); };
  function doorOpen(t) {
    for (const [o0, od, c0, cd] of DOORS) {
      if (t < o0 || t >= c0 + cd) continue;
      if (t < o0 + od) return easeOut((t - o0) / od);
      if (t < c0) { const a = t - o0 - od; return 1 - .06 * Math.abs(Math.sin(a * 22)) * Math.exp(-a * 9); }   // bump the stops
      return 1 - ease((t - c0) / cd);
    }
    // shut: the party inside rattles the doors open a crack on the beat (then the calm before the Horse)
    return Math.max(crack(t, ab(7), ab(7.9), .035, BEAT / 2), crack(t, ab(14), ab(14.9), .05, BEAT / 2), crack(t, D[3] - .22, D[3], .05, BEAT / 4));
  }
  const floorAt = t => t < D[0] ? 1 : t < ab(7.3) ? 2 : t < ab(15.45) ? 3 : t < D[3] ? 4 : 5;
  const moving = t => (t > ab(6.7) && t < ab(7.9)) || (t > ab(15) && t < ab(15.95)) || (t > D[3] - .3 && t < D[3]);
  const phaseAt = t => t < ab(7.2) ? 1 : t < ab(15) ? 2 : 3;   // what's in the car (swapped while the doors are shut)

  function elevCam(t) {
    let z = kf(t, [[T0, 1.2], [T0 + 1.4, 1.58], [D[1], 1.64], [D[2], 1.72], [D[2] + .3, 1.74], [ab(22.5), 1.98]], ease);
    let cy = kf(t, [[T0, 600], [T0 + 1.4, 584], [D[1], 582], [D[2], 580], [ab(22.5), 566]], ease), cx = EX;
    if (t >= D[3]) {   // the burst: punch in, then pull back hard to take in the crowd pouring onto the floor
      const k = easeOut(seg(t, D[3] + .05, D[3] + .65));
      z = lerp(1.98, 1.15, k); cy = lerp(566, 712, k);
      cy -= 60 * ease(seg(t, LEAP, LEAP + .25));    // tilt up after Oppa's leap
    }
    for (let i = 0; i < 4; i++) z *= 1 + (i === 3 ? .09 : .05) * bump(t, D[i]);
    const [sx, sy] = t >= D[3] - .22 ? shakeXY(t, 10 * Math.exp(-Math.max(0, t - D[3]) * 7)) : [0, 0];
    return [cx + sx / z, cy + sy / z, z];
  }

  // ---------- the car interior (painted in its own layer, world space) ----------
  function carRoom(t) {
    const { L, R, T, B } = CAR, bl = L + 30, br = R - 30, btp = T + 26, bbt = B - 36;
    boilSeed('c8 car base');
    paint(rectPts(L - 6, T - 6, R - L + 12, B - T + 12), { wash: '#7E6E62', ink: null });
    boilSeed('c8 car walls');
    paint([[L, T], [bl, btp], [bl, bbt], [L, B]], { wash: '#A08C78', fill: '#7A6450', fillOp: 70, tex: .5, ink: PAL.ink, sw: .6 });
    paint([[R, T], [br, btp], [br, bbt], [R, B]], { wash: '#A08C78', fill: '#7A6450', fillOp: 70, tex: .5, ink: PAL.ink, sw: .6 });
    boilSeed('c8 car ceiling');
    paint([[L, T], [R, T], [br, btp], [bl, btp]], { wash: '#FFF1CC', ink: PAL.ink, sw: .6 });
    boilSeed('c8 car back');
    paint(rectPts(bl, btp, br - bl, bbt - btp), { wash: '#E6D2A8', fill: '#C9AE7E', fillOp: 70, bleed: .03, tex: .6, ink: PAL.ink, sw: .7 });
    for (const x of [bl + 24, br - 24]) inkLine([[x, btp + 4], [x, bbt - 4]], .5, '#A8906A', 'inkfine', 0);   // panel seams, clear of the middle
    inkLine([[bl + 6, 668], [br - 6, 668]], 3.2, '#8E7A5E', 'ink', 0);            // the handrail
    inkLine([[bl + 6, 665], [br - 6, 665]], .8, '#F4E6C8', 'inkfine', 0);
    boilSeed('c8 car floor');
    paint([[bl, bbt], [br, bbt], [R, B], [L, B]], { wash: '#5E5048', fill: '#3E342E', fillOp: 60, tex: .6, ink: PAL.ink, sw: .6 });
    boilSeed('c8 car panel');   // the button panel on the right wall
    paint([[R - 20, 560], [R - 8, 552], [R - 8, 640], [R - 20, 636]], { wash: '#C8C0B4', ink: PAL.ink, sw: .4 });
    for (let k = 0; k < 4; k++) paint(ellPts(R - 14, 568 + k * 18, 3, 4, 6), { wash: k === 3 ? '#FFB84A' : '#8A8078', ink: null });
    glow(EX, T + 20, 170, '#FFE2A8', .55);
  }

  // ---------- Elevator Guy's wild dance: fists and knees pumping on the eighths, bouncing ----------
  function wild(t, ph = 0) {
    const e = (t - OFF) / EIGHTH + ph, i = Math.floor(e), f = e - i, s = i % 2 ? 1 : -1;
    const pump = lag => { const q = (t - lag - OFF) / EIGHTH + ph, j = Math.floor(q), g = easeOut(clamp((q - j) / .3)); return j % 2 ? lerp(1.55, .3, g) : lerp(.3, 1.55, g); };   // up on the beat, down on the and
    const knee = Math.sin(Math.PI * f);
    return {
      aL: pump(0), aR: pump(.035) - .08, armLen: 1.75, armL: fistHook('#D98463', .78), armR: fistHook('#D98463', .78),
      legLift: s > 0 ? [knee, knee * .8, 0, 0] : [0, 0, knee * .8, knee],
      dy: -.8 * knee, sq: .1 * Math.exp(-f * 8) - .06 * knee, rot: .05 * s * knee, legSplay: .35,
      eyes: 'squeeze', mouth: f < .5 ? 'laugh' : 'grin'
    };
  }
  // ---------- Oppa's cool squat: knees wide, low, fists resting on the knees, a nod on the beat, rapping ----------
  function squat(t, extra = {}) {
    const nod = Math.exp(-frac(bpOf(t)) * 7);
    return { legSplay: 1.25, sq: .25 + .03 * nod, dy: .05, aL: -.5, aR: -.5, armLen: .95, armL: fistHook('#DC7B58', .6), armR: fistHook('#DC7B58', .6), rot: .025 * nod, ...singing(t, 'rap'), ...extra };
  }

  function phase1(t) {   // Elevator Guy dancing wildly over the squatting Oppa
    const dodge = bump(t, ab(3) - .06, .08, 4);   // a fist whizzes past: Oppa leans away without missing a syllable
    const w = wild(t);
    member('elev', EX + 30, 798, 17, { ...w, rot: -.12 + w.rot, boilKey: 'c8 eg1' });
    const sq0 = squat(t);
    member('oppa', EX - 58, 818, 16.5, { look: 'black', ...sq0, sq: sq0.sq + .12 * dodge, rot: sq0.rot - .1 * dodge, dx: -.25 * dodge, boilKey: 'c8 oppa1' });
  }
  // the granny pile, floor to ceiling: [v, x, y, u, move, side, rot, sq]
  const GR_TOP = [0, EX + 2, 576, 18, 'vArms', 1, .05, .18];
  const GR_MID = [[4, EX - 100, 706, 17, 'disco', -1, .1, 0], [5, EX + 102, 702, 17, 'disco', 1, -.1, 0]];
  const GR_BOT = [[1, EX - 104, 818, 18.5, 'disco', -1, .06, 0], [6, EX + 106, 818, 18.5, 'disco', 1, -.06, 0]];
  function phase2(t) {   // grannies floor to ceiling, Oppa wedged in the middle of the pile, feet off the floor
    const gran = ([v, x, y, u, mv, side, rot, sq], i, key) => dancer('granny', x, y, u, mv, t, { ...crowdVar(i + 3), v, side, rot, sq, mood: 'excited', mouth: i % 2 ? 'laugh' : 'open', noShadow: y < 800, boilKey: key });
    gran(GR_TOP, 0, 'c8 grT');
    GR_MID.forEach((g, i) => gran(g, i + 1, 'c8 grM' + i));
    member('oppa', EX + 2, 712, 17.5, { look: 'black', sx: .62, sy: 1.14, aL: -1.45, aR: -1.45, armLen: .7, legLift: [.45, .3, .35, .5], dy: -.1 * pulse(t, 5), rot: .03 * Math.sin((t - OFF) / BEAT * Math.PI), ...singing(t, 'rap'), emote: 'sweat', emoteK: 1, emoteAge: t - D[1], noShadow: true, boilKey: 'c8 oppa2' });
    GR_BOT.forEach((g, i) => gran(g, i + 3, 'c8 grB' + i));
  }

  // ---------- THE Horse, upright, slowly eating a carrot ----------
  const HS = 15.5, HX = EX, HY = 818, MOUTH = -13.6;   // mouth height in s (horseUp's hy + 7.6)
  const CHOMPS = [ab(17), ab(19), ab(21), ab(23), ab(25), ab(27)];
  function carrotLen(t) { let n = 0; for (const c of CHOMPS) if (t >= c + .06) n++; return 4.6 * (1 - .1 * n); }   // in s
  function chompK(t) { let k = 0; for (const c of CHOMPS) k = Math.max(k, bump(t, c, .05, 9)); return k; }
  function horseEating(t) {
    const s = HS, Lc = carrotLen(t), dir = [.94, .34], sq = .035 * chompK(t), hold = .72;
    // the carrot runs from the mouth M down-right; the hoof holds it 60% along; solve the straight foreleg to reach it
    const hx = dir[0] * hold * Lc, hy = MOUTH + dir[1] * hold * Lc, vx = hx - 3.6, vy = hy + 12.4;
    const len = Math.hypot(vx, vy), a = Math.atan2(-vy, vx), armLen = len / (3.6 * .72);
    const carrot = (u, sw) => {   // hook at the hoof: undo the arm's rotation, draw the carrot in body space
      push(); rotate(a);
      const toM = [-dir[0] * hold * Lc * s, -dir[1] * hold * Lc * s], toE = [dir[0] * (1 - hold) * Lc * s, dir[1] * (1 - hold) * Lc * s];
      paint(ribbon([toM, [toM[0] * .5, toM[1] * .5], [0, 0], toE], .6 * s, 1.15 * s), { wash: '#F58A2A', fill: '#D8651A', fillOp: 50, ink: PAL.ink, sw: sw * .6 });
      for (let k = 1; k < 4; k++) { const q = k / 4, cx = lerp(toM[0], toE[0], q), cy = lerp(toM[1], toE[1], q); inkLine([[cx - dir[1] * .2 * s, cy + dir[0] * .2 * s], [cx + dir[1] * .1 * s, cy - dir[0] * .1 * s]], sw * .4, '#A84A12', 'inkfine', 0); }
      for (let k = -1; k <= 1; k++) { const ang = Math.atan2(dir[1], dir[0]) + k * .45; paint(ribbon([toE, [toE[0] + Math.cos(ang) * .9 * s, toE[1] + Math.sin(ang) * .9 * s], [toE[0] + Math.cos(ang + .2) * 1.6 * s, toE[1] + Math.sin(ang + .2) * 1.6 * s]], .45 * s, .15 * s), { wash: '#6EAA3A', ink: PAL.ink, sw: sw * .45 }); }
      paint(rrPts(-.75 * s, -.75 * s, 1.5 * s, 1.5 * s, .5 * s), { wash: GP.hoof, ink: PAL.ink, sw: sw * .6 });   // the hoof over the carrot
      pop();
    };
    horse(HX, HY, s, t, { view: 'up', mood: 'deadpan', blink: .59, sq, aR: a, aL: -1.25, armLen: { R: armLen, L: 1 }, frontArm: 'R', armR: carrot, boilKey: 'c8 horse' });
    // the jaw grinds side to side between chomps (painted over the flat mouth line), crumbs fly on each chomp
    const my = HY + MOUTH * s * (1 - sq), g = Math.sin((t - OFF) / BEAT * Math.PI) * (1 - chompK(t)), open = chompK(t);
    boilSeed('c8 jaw');
    paint(ellPts(HX, my, 1.2 * s, .24 * s, 12), { wash: GP.horseLt, ink: null });
    inkLine([[HX - .95 * s + g * .3 * s, my - .04 * s], [HX + g * .25 * s, my + (.1 + .25 * open) * s], [HX + .95 * s + g * .3 * s, my - .02 * s]], 1.05, PAL.ink, 'ink', .5);
    for (const c of CHOMPS) {
      const age = t - c; if (age < 0 || age > .5) continue;
      for (let i = 0; i < 5; i++) {
        const p = arcPt([HX + .5 * s, my + .2 * s], [HX + (1 + 2.4 * hash(i + c)) * s * (i % 2 ? 1 : -1), my + (3.5 + 3 * hash(i * 3 + c)) * s], .7 * s, age / .5), r = (.12 + .1 * hash(i * 7 + c)) * s;
        boilSeed('c8 crumb' + i);
        paint([[p[0] - r, p[1] - r * .6], [p[0] + r, p[1] - r * .3], [p[0] + r * .2, p[1] + r]], { wash: '#F58A2A', ink: '#A84A12', sw: .3 });
      }
    }
  }
  function carContents(t) { const ph = phaseAt(t); if (ph === 1) phase1(t); else if (ph === 2) phase2(t); else horseEating(t); }

  // ---------- the burst: everyone pours out of the car onto the garage floor, galloping ----------
  // [name, opts, from, to, u, flight time, arc height]
  const BURST = [
    ['granny', { v: 3 }, [3345, 800], [3690, 872], 16.5, .42, 170],
    ['elev', {}, [3255, 800], [2900, 870], 16.5, .4, 190],
    ['rival', {}, [3230, 805], [3020, 942], 20, .36, 170],
    ['boss', {}, [3365, 805], [3590, 948], 20, .38, 160],
    ['granny', { v: 1 }, [3290, 795], [2720, 1010], 21, .46, 220],
    ['kid', {}, [3330, 812], [3520, 1050], 13.5, .32, 150],
    ['oppa', { look: 'black' }, [3300, 815], [3300, 1016], 24.5, .3, 140],
  ];
  function burstCrowd(t) {
    BURST.forEach(([name, o, from, to, u, ft, h], i) => {
      const a = t - D[3], k = clamp(a / ft), key = 'c8 burst' + i;
      if (k < 1) {   // in flight: stretched, arms flung up, legs tucked, growing as it comes at us
        const p = arcPt(from, to, h, easeOut(k)), sc = lerp(.72, 1, k);
        member(name, p[0], p[1], u * sc, { ...o, ...mfeel(name, 'excited', t, { v: o.v }), emote: null, dy: 0, aL: 1.25, aR: 1.1, armLen: 1.2, armL: fistHook(null, .7), armR: fistHook(null, .7), legLift: [.7, .8, .8, .7], sq: -.2 * Math.sin(Math.PI * k), noShadow: true, boilKey: key });
        return;
      }
      const land = t - (D[3] + ft), sqL = .28 * Math.exp(-land * 9) * Math.cos(land * 20);
      if (name === 'oppa' && t >= LEAP - .24) {   // the crouch, then the leap straight up and out of the frame
        const c = ease(seg(t, LEAP - .24, LEAP)), up = t > LEAP ? Math.pow(seg(t, LEAP, LEAP + .2), 1.5) : 0;
        member('oppa', to[0], to[1], u, { ...o, ...mfeel('oppa', 'excited', t), emote: null, aL: lerp(-.3, 1.45, up > 0 ? 1 : 0), aR: lerp(-.3, 1.45, up > 0 ? 1 : 0), armLen: 1.3, armL: fistHook(null, .7), armR: fistHook(null, .7), sq: up > 0 ? -.4 : .3 * c, dy: -60 * up, legLift: up > 0 ? [.6, .6, .6, .6] : null, legSplay: .6 * c, smear: up > .02 ? .6 : 0, smearDir: 0, noShadow: up > .1, boilKey: key });
        return;
      }
      dancer(name, to[0], to[1], u, 'gallop', t, { ...o, ...crowdVar(i + 11), mood: 'excited', sq: sqL, boilKey: key });
    });
  }

  function elevShot(t, lt, dur) {
    const cam = elevCam(t), open = doorOpen(t), burst = t >= D[3];
    if (open > .02) paintLayer('c8car', () => { camBegin(...cam); carRoom(t); carContents(t); });
    camBegin(...cam);
    garage(t, {
      elevOpen: open, elevFloor: floorAt(t), elevLight: moving(t) || D.some(d => t >= d && t < d + .6),
      hooks: {
        elevInside: () => showLayer('c8car', [toScreenPts([[CAR.L, CAR.T], [CAR.R, CAR.T], [CAR.R, CAR.B + 2], [CAR.L, CAR.B + 2]])]),
        back: () => {
          if (moving(t) && frac(t * 3) < .6) { boilSeed('c8 arrow'); paint([[EX + 44, 330], [EX + 52, 314], [EX + 60, 330]], { wash: '#FF7A4A', ink: null }); }   // the up-arrow blinks
          if (t > D[3] - .22 && t < D[3] + .1) {   // the doors rattle
            boilSeed('c8 rattle');
            for (const s of [-1, 1]) for (let k = 0; k < 3; k++) { const y = 470 + k * 110 + 20 * hash(k + s), x = EX + s * (182 + 10 * hash(Math.floor(t * 24) + k)); inkLine([[x, y], [x + s * 22, y - 10], [x + s * 10, y - 26]], 1.4, PAL.ink, 'ink', .5); }
          }
        },
        mid: () => { if (burst) burstCrowd(t); }
      }
    });
    // the DING (painted pop), with a few ding-lines round the indicator
    D.forEach((d, i) => {
      const a = t - d; if (a < 0 || a > .9) return;
      const [ix, iy] = toScreen(EX, 322), zz = CAM.zoom;
      sfx('DING', Math.min(W - 170, ix + 150 * zz), Math.max(i === 3 ? 150 : 110, iy - 36 * zz), (i === 3 ? 70 : 52) * Math.min(zz, 1.7), '#FFD84A', a, { life: .9, rot: -.14, stroke: PAL.ink, screen: true });
      if (a < .35) { boilSeed('c8 dinglines' + i); for (let k = 0; k < 5; k++) { const ang = -2.6 + k * .5, r0 = 78 + 30 * a / .35, r1 = r0 + 26 * (1 - a / .35); inkLine([[EX + Math.cos(ang) * r0, 322 + Math.sin(ang) * r0 * .6], [EX + Math.cos(ang) * r1, 322 + Math.sin(ang) * r1 * .6]], 1.3, '#FFB84A', 'ink', 0); } }
    });
    camEnd();
    counterHUD(t);
  }

  // ================================= B2 · THE SUBWAY =================================
  const SEAT_Y = 770, SEAT_TOP = 732;                               // sitting on the bench / standing up on it
  const OPPA_S = [1400, 900, 24], POP_S = [1750, 900, 22];
  const DUO = [[CUT, 'hipsway'], [bb(4), 'disco', { side: 1 }], [bb(8), 'hipsway'], [bb(12), 'disco', { side: -1 }], [bb(16), 'gallop']];
  const handOf = (name, o) => { const q = memberOpts(name, o); return { hand: q._hand, sleeve: q._sleeve }; };
  // the commuters. tb: starts bobbing (notices the dance), tc: catches it (full gallop). look: which way the dancers are.
  const COMM = [
    { id: 'R1', v: 1, x: 1958, u: 17, seat: true, tb: bb(4.4), tc: bb(5), idle: 'phone', look: -1 },
    { id: 'R2', v: 3, x: 2128, y: 884, u: 19, tb: bb(5.4), tc: bb(6), idle: 'bored', look: -1, turn: [bb(7), bb(11.4)] },
    { id: 'R3', v: 4, x: 2612, u: 17, seat: true, tb: bb(10), tc: bb(10.5), idle: 'stare', look: -1 },
    { id: 'L1', v: 2, x: 1130, u: 17, seat: true, tb: bb(12.4), tc: bb(12.9), idle: 'phone', look: 1 },
    { id: 'L2', v: 6, x: 905, y: 884, u: 19, tb: bb(12.9), tc: bb(13.4), idle: 'bored', look: 1 },
    { id: 'L3', v: 5, x: 690, u: 17, seat: true, tb: bb(13.4), tc: bb(13.9), idle: 'stare', look: 1 },
    { id: 'L4', v: 0, x: 470, y: 888, u: 19, tb: bb(13.9), tc: bb(14.4), idle: 'phone', look: 1 },
    { id: 'L5', v: 7, x: 330, u: 16, seat: true, tb: 1e9, tc: 1e9, idle: 'sleep', look: 1 },
  ];
  const phoneHook = (u, sw) => { paint(rrPts(-.1 * u, -1.25 * u, 1.05 * u, 1.75 * u, .2 * u), { wash: '#2A2630', ink: PAL.ink, sw: sw * .5 }); paint(rrPts(.05 * u, -1.1 * u, .75 * u, 1.35 * u, .12 * u), { wash: '#9FD8F0', ink: null }); };
  function commuter(c, t) {
    const key = 'c8 ' + c.id, hs = handOf('commuter', { v: c.v }), sway = .035 * Math.sin(t * 2.2 + c.x * .013);
    const y0 = c.seat ? SEAT_Y : c.y, base = { v: c.v, noShadow: !!c.seat, boilKey: key };
    if (t < c.tb) {   // bored commuting
      let o;
      if (c.idle === 'phone') o = { eyes: 'look', lookX: .5, lookY: .9, aL: -.35, aR: -.15, armLen: .85, armR: phoneHook, mouth: null };
      else if (c.idle === 'bored') o = { ...mfeel('commuter', 'bored', t, { v: c.v }) };
      else if (c.idle === 'stare') o = { eyes: 'normal', lookX: -.8 * c.look, lookY: .1, mouth: 'flat', aL: -.6, aR: -.6, seed: c.v };
      else o = { eyes: 'closed', mouth: 'o', emote: 'zzz', emoteK: 1, emoteAge: t - 100, aL: -.8, aR: -.8, sq: .06 + .03 * Math.sin(t * 1.9), rot: .1 };
      member('commuter', c.x, y0, c.u, { ...base, ...o, rot: (o.rot || 0) + sway, legLift: c.seat ? [.35, .35, .35, .35] : null });
      return;
    }
    if (t < c.tc) {   // it gets in: eyes to the dancers, a head bob on the beat, a note pops
      const k = seg(t, c.tb, c.tb + .1), bob = pulse2(t, 7);
      const into = t - c.tb > .14;
      member('commuter', c.x, y0, c.u, { ...base, eyes: into ? 'happy' : 'wide', lookX: .9 * c.look, lookY: -.1, mouth: into ? 'smile' : 'o', dy: .45 * bob * k, sq: .1 * bob * k, rot: sway + .09 * c.look * (.4 + bob) * k,
        aL: c.idle === 'phone' ? -.6 : -.4, aR: c.idle === 'phone' ? -.9 : -.4, armLen: .85, armR: c.idle === 'phone' ? phoneHook : null,
        emote: 'music', emoteK: seg(t, c.tb, c.tb + .2), emoteAge: t - c.tb, legLift: c.seat ? [.35, .35, .35, .35] : null });
      return;
    }
    // caught it: a jump with the arms flung up (the sitters jump up onto the bench), landing in a full gallop
    const a = t - c.tc, JT = .3, fly = clamp(a / JT), y = c.seat ? lerp(SEAT_Y, SEAT_TOP, easeOut(fly)) : y0, fx = { emote: 'spark', emoteK: seg(a, 0, .12) * (1 - seg(a, .9, 1.2)), emoteAge: a };
    if (a < JT) {
      const h = Math.sin(Math.PI * fly);
      member('commuter', c.x, y, c.u, { ...base, ...fx, eyes: 'wide', mouth: 'open', dy: -2.1 * h, sq: -.2 * h + .2 * (1 - seg(a, 0, .06)), aL: 1.35, aR: 1.2, armLen: 1.25, armL: fistHook(hs.hand, .62), armR: fistHook(hs.hand, .62), legLift: [.55, .6, .6, .55], noShadow: true });
      return;
    }
    const land = .26 * Math.exp(-(a - JT) * 9) * Math.cos((a - JT) * 20), p = dance('gallop', t, { ph: hash(c.v * 5.1) * .12 - .06, e: .95, ...hs });
    const turned = c.turn && t > c.turn[0] && t < c.turn[1];
    member('commuter', c.x, y, c.u, { ...base, ...p, ...fx, eyes: a < .7 ? 'wide' : 'happy', mouth: a < .7 ? 'open' : 'grin', sq: (p.sq || 0) + land, ...(turned ? { view: 'q' } : {}) });
  }

  // THE Horse on the train: upright, one hoof on a strap, the other holding a newspaper of scribbles up to its nose
  const HSS = 15, HXS = 2338, HYS = 905, FLIP = bb(9.2);
  const STRAP = { aL: 1.3, L: 1.5 };
  function strapHoof() { const len = 3.6 * STRAP.L * .72 * HSS; return [HXS - 3.6 * HSS - len * Math.cos(STRAP.aL), HYS - 12.4 * HSS - len * Math.sin(STRAP.aL)]; }
  function paperPage(x0, y0, w, h, seed, sw, squeeze = 1) {   // scribbles only: a headline, a picture, columns of squiggles
    const X = q => x0 + q * w * squeeze;
    inkLine([[X(.08), y0 + .14 * h], [X(.3), y0 + .1 * h], [X(.5), y0 + .15 * h], [X(.86), y0 + .11 * h]], sw * 1.5, '#3A3440', 'ink', .5);
    if (seed % 2) { paint(rectPts(X(.08), y0 + .26 * h, .38 * w * squeeze, .3 * h), { wash: '#C9C0AE', ink: '#6A6070', sw: sw * .4 });
      const sc = []; for (let i = 0; i < 9; i++) sc.push([X(.12 + .3 * hash(i * 3.1 + seed)), y0 + (.3 + .22 * hash(i * 5.3 + seed)) * h]); inkLine(sc, sw * .6, '#5A5060', 'inkfine', .6); }
    for (let r = 0; r < 6; r++) {
      const yy = y0 + (.3 + r * .11) * h, xa = (seed % 2 && r < 3) ? .52 : .08, pts = [];
      for (let i = 0; i <= 6; i++) pts.push([X(xa + (.86 - xa) * i / 6), yy + Math.sin(i * 2.3 + r + seed) * .018 * h]);
      inkLine(pts, sw * .45, '#8A8290', 'inkfine', .5);
    }
  }
  function newspaper(s, sw, t) {   // drawn at the hoof (arm hook, rotation undone): the paper sits to the left of the hoof
    const w = 9.4 * s, h = 7 * s, x0 = -w + .5 * s, y0 = -3.6 * s, half = w / 2, fold = x0 + half, k = seg(t, FLIP, FLIP + .36);
    boilSeed('c8 paper');
    paint(rectPts(x0, y0, w, h, s * .05), { wash: '#F1EBDD', fill: '#D8CFBC', fillOp: 60, tex: .5, ink: PAL.ink, sw: sw * .7 });
    inkLine([[fold, y0 + 2], [fold, y0 + h - 2]], sw * .5, '#9A907E', 'inkfine', 0);
    const pages = k >= 1 ? [2, 3] : [0, 1];
    paperPage(x0, y0, half, h, pages[0] + 11, sw); paperPage(fold, y0, half, h, pages[1] + 11, sw);
    if (k > 0 && k < 1) {   // the page turn: the right page swings over the fold (squeezing through edge-on)
      const e = fold + half * Math.cos(Math.PI * ease(k)), lift = -Math.sin(Math.PI * k) * .7 * s;
      paint([[fold, y0], [e, y0 + lift], [e, y0 + h + lift * .3], [fold, y0 + h]], { wash: k < .5 ? '#F1EBDD' : '#E8E0CE', ink: PAL.ink, sw: sw * .6 });
      if (Math.abs(e - fold) > .8 * s) paperPage(Math.min(fold, e), y0 + lift * .5, half, h, k < .5 ? 12 : 13, sw, Math.abs(e - fold) / half);
    }
    paint(rrPts(-.8 * s, -.8 * s, 1.6 * s, 1.6 * s, .5 * s), { wash: GP.hoof, ink: PAL.ink, sw: sw * .6 });   // the hoof gripping the edge
  }
  function horseSub(t) {
    const s = HSS, [sx, sy] = strapHoof(), sway = .012 * Math.sin(t * 2.2 + 1);
    boilSeed('c8 strap');
    inkLine([[sx, 196], [sx + 2, sy - 22]], 3, '#4A4650', 'ink', 0);                      // the strap from the rail
    paint(rrPts(sx - 20, sy - 26, 40, 42, 12), { ink: '#5A5660', sw: 2.2 });               // its handle
    const hx = 4.7, hy = -12.6, vx = hx - 3.6, vy = hy + 12.4, armLen = Math.hypot(vx, vy) / (3.6 * .72), a = Math.atan2(-vy, vx);
    horse(HXS, HYS, s, t, { view: 'up', mood: 'deadpan', blink: 2.915, rot: sway, aL: STRAP.aL, aR: a, armLen: { L: STRAP.L, R: armLen }, frontArm: 'R',
      armR: (u, sw) => { push(); rotate(a); newspaper(s, sw, t); pop(); }, boilKey: 'c8 horseS' });
  }

  function duo(t) {
    // Oppa: drops in from the top of the frame, lands on the downbeat of bar 67, then dances with the Pop Star
    const [ox, oy, ou] = OPPA_S, hs = handOf('oppa', { look: 'white' });
    if (t < TB) {
      const k = seg(t, CUT, TB);
      member('oppa', ox, oy, ou, { look: 'white', dy: -23.5 * Math.pow(1 - k, 1.3), sq: -.34, aL: 1.4, aR: 1.25, armLen: 1.3, armL: fistHook(hs.hand, .7), armR: fistHook(hs.hand, .7), legLift: [.3, .3, .3, .3], smear: .5, smearDir: 0, mouth: 'O', noShadow: k < .75, boilKey: 'c8 oppaS' });
    } else {
      const a = t - TB, land = .34 * Math.exp(-a * 8) * Math.cos(a * 17);
      let p = routine(t, DUO, hs);
      if (a < .16) p = _lerpPose({ aL: 1.4, aR: 1.25, armLen: 1.3, legLift: [.3, .3, .3, .3], dy: 0, sq: 0 }, p, ease(a / .16));
      member('oppa', ox, oy, ou, { look: 'white', ...p, ...singing(t, 'rap'), sq: (p.sq || 0) + land, boilKey: 'c8 oppaS' });
    }
    const [px, py, pu] = POP_S, hp = handOf('pop', {}), q = routine(t, DUO, { ...hp, ph: .06 });
    member('pop', px, py, pu, { ...q, eyes: 'happy', mouth: frac(bpOf(t) / 2) < .5 ? 'grin' : 'sing', blush: .3, hairSway: (q.dx || 0) * .5 + .2 * Math.sin(bpOf(t) * Math.PI), boilKey: 'c8 pop' });
  }

  function subCam(t) {
    const K = [[CUT, [1566, 652, 1.5]], [TB, [1570, 650, 1.5]], [bb(4), [1625, 650, 1.45]], [bb(7), [2010, 648, 1.4]], [bb(8.4), [2318, 640, 1.62]], [bb(11), [2306, 642, 1.6]],
      [bb(13.2), [1660, 604, .92]], [bb(16), [1506, 564, .765]], [TE, [1500, 560, .75]]];
    let i = 0; while (i + 2 < K.length && t >= K[i + 1][0]) i++;
    const [t0, A] = K[i], [t1, B] = K[i + 1], k = ease(seg(t, t0, t1)), c = A.map((v, j) => lerp(v, B[j], k));
    const rock = 1 - seg(t, TE - 1.1, TE);   // the carriage rocks (it settles for the seam)
    const land = t > TB ? 7 * Math.exp(-(t - TB) * 10) * Math.sin((t - TB) * 40) : 0;
    return [c[0], c[1] + (2.5 * Math.sin(t * 3.1) + land) * rock / c[2], c[2], .0035 * Math.sin(t * 2.3) * rock];
  }
  function subwayShot(t, lt, dur) {
    camBegin(...subCam(t));
    subway(t, { speed: 1.1, hooks: {
      seats: () => COMM.filter(c => c.seat).forEach(c => commuter(c, t)),
      mid: () => {
        COMM.filter(c => !c.seat).forEach(c => commuter(c, t));
        horseSub(t);
        duo(t);
      }
    } });
    camEnd();
    counterHUD(t);
  }

  shots([[T0, elevShot], [CUT, subwayShot]]);
})();
