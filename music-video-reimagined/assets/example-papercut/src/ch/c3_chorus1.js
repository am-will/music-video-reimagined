// c3_chorus1.js: Chorus 1 (barT(15) = 49.958 to barT(19) = 62.747).
//
// SHOT PLAN. Video times; one bar per shot, beats at bar + 0.799 s. b0.5 = the eighth after the downbeat.
// (The first frame of this chapter at 24 fps is t = 50.000; frame 1199, t = 49.958, is still c2's.)
//
// Seam in (49.958): c2 ends frozen on the frontmen two-shot camBegin(1900, 620, 1.25): Mike at (1830, 972) in side
// view facing left, 'suspicious', mic up; Chester at (1978, 972) side view facing right, 'determined'; u = 24; the
// wallpaper eyes already drained away; a razor-thin line of light from world (1250, 360) to (2600, 250), across the
// portrait and the lamp shades. We open on exactly that framing and pose.
//
// THE CUT IN THE WALL goes through the paper wall AND the portrait hanging flat on it (its face vanishes into the
// gash), but the two floor lamps stand in the room in front of it, still warm. While its face is hidden the portrait
// turns to 'grin'; the heal, which seals last right over it, reveals the grin.
//
// 1. THE WALL OPENS  49.958 - 53.156 (bar 15). Frontmen two-shot, pushing in slowly, then fast onto Chester.
//    49.958 b0   on the downbeat the line BURSTS open into a long lens (half-width 1.5 -> 172, backOut overshoot in
//                0.36 s): a flash of ink light, a shake, torn wallpaper scraps flying, the lamps stutter and sway, the
//                portrait jolts on its nail. The frontmen hold c2's frozen pose for 3 frames, then jolt (a take).
//    50.34       Mike spins round to us, terrified, looking up at it; from 50.86 he backs away left to (1400, 972).
//    50.45-50.76 in the dark behind the paper, the Face's two huge eyes open, looking down at the band.
//    51.00-51.30 Chester whirls round (drawn turn, through the front view) to face it.
//    51.30-52.90 his back to us, arms flung wide on the beats, he sings into it; the Face blinks slowly as he turns
//                to it, then narrows its eyes at him; ink runs out of the lower lip; violet light rims him.
//    52.93-53.25 he whirls back round to us (continuing the spin) as the camera rushes in: CUT ON ACTION mid-whirl.
//    reads  50.00-50.45 the wall is open (fast, but anticipated by c2's freeze and razor line) · 50.45-51.00 there are
//           eyes in it, huge · 51.00-51.30 Chester whirls to confront it · 51.30-52.90 he sings into it, arms wide
//           (Mike, secondary, cowers away) · 52.90-53.16 he spins back to us
// 2. THE CUT ON CHESTER  53.156 - 56.353 (bar 16). Close on Chester (screen u 53-72); the room dims behind him.
//    53.156 b0   he lands the whirl, front view, arms wide, belting.
//    53.556 b.5  a blade of light SLICES diagonally across his tank top (0.09 s) and glints; the camera flinches with
//                him; the note chokes (a small flinch, eyes wide).
//    53.955 b1   the cut OPENS: cream paper lips, darkness inside. His eyes go down to it first; the camera follows.
//    54.754 b2   two small glowing eyes open inside him and look up at him. They blink.
//    55.15-55.38 the camera pulls back to his face; 55.36 the horrified take (scared), and the eyes inside look at us.
//    55.76       he clamps a nub over the cut; the eyes peek out beside it and dart about; he trembles.
//    56.08-56.35 snap zoom out, carrying through into the wide.
//    reads  53.16-53.55 Chester close, belting · 53.56-53.95 the slice · 53.95-54.75 it opens, he stares at it ·
//           54.75-55.36 the eyes inside him · 55.36-55.76 his horror · 55.76-56.35 the clamp
// 3. EVERYONE IS CUT  56.353 - 59.550 (bar 17). WIDE (1500, 580, 1.05), pushing in for the scream.
//    56.353 b0   the snap zoom lands on the wide: the band still playing, Chester clutching his chest, the gash above.
//    56.753 Joe · 57.152 Rob · 57.552 Brad and Phoenix · 57.952 Mike: a papercut slices (glint) and opens on each, a
//                chain on the eighths; eyes open in every cut, dart about and settle staring at us; the Face's eyes
//                dart along the chain; each one takes, sweats and pats at the cut while still playing.
//    58.35-59.55 Chester SCREAMS at the ceiling (lid open, arms flung back so his cut gapes again, its eyes rolled
//                up to the gash), cream rings rising into the gash; the camera pushes back to shot 1's two-shot.
//    reads  56.35-56.75 the wide · 56.75-58.35 cuts on everyone, the panic · 58.35-59.55 the scream
// 4. THE PAPER HEALS  59.550 - 62.747 (bar 18). Two-shot, then up to the portrait.
//    59.550 b0   as the rings reach it, every slit ZIPS shut along its length (a spark runs at the pull), the gash
//                seals from both tips to the middle, the Face's eyes are squeezed shut, the ink drips are drawn back up,
//                and the lamps flare warm again. ~60.15 the last sliver closes over the portrait: it is grinning.
//    60.25-60.9  the band look down at themselves, then stare at each other, baffled ('?' on each, staggered).
//    60.9-61.5   the camera drifts up the wall to the grinning portrait, and holds on it.
//    62.03-62.68 it pushes into the grin while a grin-shaped iris closes on it: black (PAL.ink) from 62.68.
//    reads  59.55-60.35 everything heals (and the grin appears) · 60.35-60.90 confusion · 60.9-62.0 the portrait
//           grins · 62.0-62.7 the iris
//
// Seam out (62.747): black, after the grin-shaped iris. c4 opens from black with an iris opening on Mike.
// World state: portrait 'look' (as c2 leaves it) until the gash hides its face, 'grin' after; ink-violet light
// spills from the gash and cools the wall round it; the lamps stay warm (cold .3 -> .42), and flare warm at the heal.
(() => {
  // ================= time =================
  const T0 = barT(15), T1 = barT(16), T2 = barT(17), T3 = barT(18), T4 = barT(19);
  const bt = beatT;
  const sm = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const decay = (t, t0, k) => t < t0 ? 0 : Math.exp(-(t - t0) * k);
  const bell = (t, a, b) => Math.sin(Math.PI * seg(t, a, b));
  // eye darts: each [t, v] moves quickly from the last value to v (easeOut over d seconds)
  const darts = (t, list, d = .16) => { let v = list[0][1]; for (let i = 1; i < list.length; i++) v = lerp(v, list[i][1], easeOut(seg(t, list[i][0], list[i][0] + d))); return v; };

  // ================= staging =================
  const U = 24, FY = 972;                 // the frontmen's size and floor line, the same in every shot (as c2 leaves them)
  const CX = 1978;                        // Chester's mark all chapter (c2's freeze)
  const MX0 = 1830, MX1 = 1400;           // Mike: back to back with Chester (c2's freeze), then he backs away to the left
  const mikeX = t => lerp(MX0, MX1, ease(seg(t, T0 + .9, T0 + 2.45)));
  const EYE = PC.eyeGlow, LIPBACK = '#F4EAD4', EDGE = '#FFF9EA', INKLIGHT = '#A58BEA';

  // ================= papercut geometry =================
  // A lens from a to b; wf(k) = half-width at k (0..1 along it). lo = the +normal side, hi = the -normal side.
  function lens(a, b, wf, n = 24, seed = 0) {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, lo = [], hi = [], ws = [];
    for (let i = 0; i <= n; i++) {
      const k = i / n, w = Math.max(0, wf(k)), px = a[0] + dx * k, py = a[1] + dy * k;
      const j1 = 1 + .12 * (hash(i * 3.1 + seed) - .5), j2 = 1 + .12 * (hash(i * 5.7 + seed + 9) - .5);
      lo.push([px + nx * w * j1, py + ny * w * j1]); hi.push([px - nx * w * j2, py - ny * w * j2]); ws.push(w);
    }
    return { lo, hi, ws, nx, ny, L, poly: lo.concat(hi.slice().reverse()) };
  }
  // The cut paper's lips (in whatever space is active). s = how far the lips curl back at a wide-open middle. Each lip
  // folds back toward us: a crease out on the printed paper, the plain back of the sheet, the bright cut edge with torn
  // fibres, and the lip's shadow falling into the hole.
  function lips(Lz, s, key, o = {}) {
    const { lo, hi, ws, nx, ny } = Lz, n = lo.length - 1, sw = o.sw ?? 1;
    for (const [E, sd, side] of [[hi, -1, 'hi'], [lo, 1, 'lo']]) {
      const C = [], S = [];
      for (let i = 0; i <= n; i++) {
        const c = Math.min(s, ws[i] * .34) * (side === 'hi' ? 1 : .8);
        C.push([E[i][0] + sd * nx * c, E[i][1] + sd * ny * c]);
        S.push([E[i][0] - sd * nx * c * 1.2, E[i][1] - sd * ny * c * 1.2]);
      }
      boilSeed(key + ' shadow ' + side);
      paint(E.concat(S.slice().reverse()), { fill: '#07050C', fillOp: 170, bleed: .06, tex: .4, border: .3, ink: null });
      boilSeed(key + ' lip ' + side);
      paint(E.concat(C.slice().reverse()), { wash: o.back || LIPBACK, washOp: 255, fill: '#D9C7A2', fillOp: 60, bleed: .03, tex: .7, border: .5, ink: null });
      inkLine(C, sw * .6, o.crease || '#8C6A4C', 'inkfine', .4);
      inkLine(E, sw * 1.25, EDGE, 'inkfine', .4);
      const fib = o.fibres ?? .6;   // how many torn fibres poke into the hole (0..1)
      for (let i = 2; i < n - 1; i++) {
        if (ws[i] < s * .8 || hash(i * 7.3 + sd * 3 + key.length) > fib) continue;
        const len = s * (.25 + .4 * hash(i * 1.9 + sd)) * (fib < .5 ? .7 : 1), tw = (hash(i + 4 + sd) - .5) * 1.4 * len;
        inkLine([E[i], [E[i][0] - sd * nx * len + tw * ny, E[i][1] - sd * ny * len - tw * nx]], sw * (fib < .5 ? .3 : .45), fib < .5 ? '#E9DDC4' : EDGE, 'inkfine', .3);
      }
    }
  }
  // two small glowing eyes, like the Ink's (upright slits), centred at (cx, cy); h = slit height, gap = centre spacing
  function peepers(cx, cy, h, open, lookX, lookY, gap, key, glowA = .8) {
    boilSeed(key);
    const w = h * .46, lx = lookX * w * .5, ly = lookY * h * .16;
    for (const s of [-1, 1]) {
      const ex = cx + s * gap / 2 + lx, ey = cy + ly, hh = h * clamp(open);
      glow(ex, ey, h * 1.7, EYE, glowA * (.35 + .65 * clamp(open)));
      if (hh < h * .14) { inkLine([[ex - w * .7, ey], [ex + w * .7, ey]], Math.max(.4, h * .06), '#F4EDC9', 'inkfine', 0); continue; }
      paint(rectPts(ex - w / 2, ey - hh / 2, w, hh, h * .02), { wash: '#F4EDC9', ink: null });
      paint(rectPts(ex - w * .17, ey - hh * .34, w * .34, hh * .6), { wash: '#FFFFF0', washOp: 235, ink: null });
    }
  }
  // blinking: 1 = open; a short blink now and then, on its own clock
  const blinkK = (t, seed) => { const ph = frac(t * .62 + hash(seed * 3.3)); return ph < .045 ? Math.abs(ph / .0225 - 1) : 1; };

  // ================= the wall gash =================
  const GA = [1250, 360], GB = [2600, 250], GW = 172;
  const gAt = k => [lerp(GA[0], GB[0], k), lerp(GA[1], GB[1], k)];
  const gashOpen = t => t < T0 ? 0 : backOut(seg(t, T0, T0 + .36)) * (1 + .03 * Math.sin((t - T0) * 2.3));
  const gashZip = t => ease(seg(t, T3 + .03, T3 + .66));     // it seals from both tips toward the middle
  const zipBoth = (k, z) => sm((k - z * .56 + .02) / .1) * sm((1 - k - z * .56 + .02) / .1);
  const gashW = (t, k) => 1.5 + GW * gashOpen(t) * Math.pow(Math.sin(k * Math.PI), .8) * zipBoth(k, gashZip(t));
  const gashOn = t => t >= T0 && t < T3 + .7;                 // when the ink side shows through it

  // the Face behind the paper, centred on the gash; its eyes fit inside the opening
  const FACE = [1925, 374, 40];
  function faceState(t) {
    const open = ease(seg(t, bt(15, .62), bt(15, .98))) * (1 - .38 * bell(t, bt(15, 2) - .05, bt(15, 3))) * (1 - ease(seg(t, T3 + .05, T3 + .45)));
    const lookX = darts(t, [[T0, 0], [bt(15, 1.3), .25], [bt(15, 3.55), .6], [T1 + .5, .3],
      [bt(17, .5), -1], [bt(17, 1), -.7], [bt(17, 1.5), -.1], [bt(17, 2), -.55], [bt(17, 2.55), .35]]);
    return { open: open * faceBlink(t), lookX, lookY: .5 };
  }
  // the Face blinks: slowly as Chester turns to face it, and as the chain of cuts starts and ends
  const faceBlink = t => { let k = 1; for (const [b, d] of [[bt(15, 1.95), .3], [bt(17, .15), .2], [bt(17, 2.9), .22]]) { const a = (t - b) / d; if (a > 0 && a < 1) k = Math.min(k, Math.abs(2 * a - 1)); } return k; };
  const faceEye = (f, s) => [FACE[0] + s * 4.8 * FACE[2] + f.lookX * FACE[2] * 1.2, FACE[1] - 1.8 * FACE[2] + f.lookY * FACE[2]];
  // The layer behind the paper: the Ink Side's wall and the Face (a touch of parallax: it's deeper). Only a strip of wall
  // can show through the gash and the Face fills its middle, so this paints the Ink Side's own parts (ink wallpaper, its
  // drips and chalk, by inkSide's own formulas) just where the cut can reveal them, instead of the whole mirrored room.
  const INKX = [[1150, 1560], [2290, 2720]], inGap = x => INKX.some(([a, b]) => x > a - 40 && x < b + 40);
  function inkWall(t) {
    boilSeed('ink bg');
    paint(rectPts(1080, -300, 1720, 1100), { wash: PC.inkBg, ink: null });
    for (const [a, b] of INKX) wallpaper(a, b, t, { style: 'ink' });
    for (let i = 0; i < 40; i++) {   // drips running down the walls, on slow clocks (as inkSide)
      const x = -300 + i * 105 + 40 * hash(i * 7), ph = frac(t * (.05 + .05 * hash(i)) + hash(i + 3)), len = 120 + 420 * ph * hash(i + 1);
      if (!inGap(x)) continue;
      boilSeed('drip' + i);
      paint(ribbon([[x, LAY.wallTop], [x + 2, LAY.wallTop + len * .5], [x, LAY.wallTop + len]], 7 + 5 * hash(i + 5), 3), { wash: PC.inkDrip, ink: null });
    }
    const kinds = ['spiral', 'eye', 'tally', 'face', 'cross', 'arrow'];
    for (let i = 0; i < 22; i++) { const x = -300 + i * 190 + 60 * hash(i * 5), y = 120 + 380 * hash(i * 9 + 1); if (!inGap(x)) continue; boilSeed('chalk' + i); chalkMark(kinds[i % 6], x, y, .9 + .6 * hash(i), i); }
  }
  function paintInk(t, cam) {
    paintLayer('ink', () => {
      camBegin(cam.cx, cam.cy, cam.z * .97);
      const f = faceState(t);
      inkWall(t);
      bigFace(FACE[0], FACE[1], FACE[2], t, f);
      // behind the paper it's dark: only the Face's own eyes light it
      roomLight(.74, [[...faceEye(f, -1), 185, .2 + .8 * f.open], [...faceEye(f, 1), 185, .2 + .8 * f.open]], { col: '#0A0714' });
      camEnd();
    });
  }

  // light: the lamps, and the ink light spilling out of the cuts
  function lightState(t) {
    const heal = ease(seg(t, T3 + .2, T3 + .8)), ink = seg(t, T0, T0 + .5) * (1 - heal);
    return { ink, heal, cold: lerp(.3, .42, ink) * (1 - heal), flicker: (.16 + .6 * decay(t, T0, 3.2)) * (1 - heal),
      warm: t > T3 ? bell(t, T3 + .2, T3 + 1.6) : 0 };
  }
  function parlorLight(t, extra = []) {
    const L = lightState(t), [mx, my] = gAt(.5);
    return { cold: L.cold, flicker: L.flicker, swing: .05 * decay(t, T0, 1.5),
      lights: [[mx, my, 820, .55 * L.ink * gashOpen(t) * (1 - gashZip(t))], [LAY.lampA, 290, 900, .5 * L.warm], [LAY.lampB, 290, 900, .5 * L.warm], ...extra] };
  }

  // the gash, painted in the parlor's 'behind' hook: it cuts the wall and the portrait hanging flat on it, but the
  // two floor lamps stand in the room in front of it, so they're painted again on top (same seeds, same light)
  function relamp(t) {
    const L = lightState(t), sw = .05 * decay(t, T0, 1.5);
    floorLamp(LAY.lampA, LAY.floorY - 10, 1, { on: flick(t, 1, L.flicker), cold: L.cold, swing: sw * Math.sin(t * 2.6) });
    floorLamp(LAY.lampB, LAY.floorY - 10, 1, { on: flick(t, 2, L.flicker), cold: L.cold, swing: -sw * Math.sin(t * 2.3 + 1) });
  }
  function paintGash(t, withHole) {
    if (t < T0 || t > T3 + 1.4) { relamp(t); return; }   // the lamps are always repainted, so their light never jumps
    const L = lightState(t), Lz = lens(GA, GB, k => gashW(t, k), 36, 7), wm = Math.max(...Lz.ws), zz = gashZip(t);
    const [mx, my] = gAt(.5), f = faceState(t);
    // the ink light: it cools the paper round the cut (a violet multiply), then lights the rim. Both go UNDER the hole,
    // so only the paper round it catches the light and the ink side stays dark.
    if (L.ink > .02) castShadow([toScreenPts(ellPts(mx, my + 40, 860, 250 + wm * .7, 32))], { col: '#7E7BCC', alpha: .5 * L.ink * (1 - zz * .8), blur: 70 });
    for (let i = 0; i <= 7; i++) {
      const k = .06 + i * .125, [x, y] = gAt(k), w = gashW(t, k);
      boilSeed('gash light' + i);
      if (w > 4) glow(x, y, 90 + 1.15 * w, INKLIGHT, .5 * L.ink);
    }
    if (f.open > .05) for (const s of [-1, 1]) glow(...faceEye(f, s), 300, EYE, .3 * f.open);
    if (withHole && wm > 2.5) showLayer('ink', [toScreenPts(Lz.poly)], { feather: 1.5 });
    // the burst: for an instant the cut is all light
    const fl = decay(t, T0, 7);
    if (fl > .02) for (let i = 0; i <= 7; i++) { const k = .06 + i * .125, [x, y] = gAt(k); boilSeed('gash flash' + i); glow(x, y, 190 + 2 * gashW(t, k), '#EDE4FF', 1.15 * fl); }
    if (withHole && wm > 2.5) { gashDrips(t, Lz); lips(Lz, Math.min(26, wm * .2), 'gash', { sw: 1.3 }); }
    relamp(t);
    if (wm < 14) {   // the razor line (the first frames) / the scar (after the zip), fading
      const k = t < T3 ? 1 : 1 - seg(t, T3 + .66, T3 + 1.3);
      boilSeed('gash line');
      inkLine([GA, gAt(.5), GB], 1.6 * k, '#FFF8E6', 'inkfine', .2);
      if (t < T3) for (let i = 0; i < 5; i++) glow(...gAt(.1 + i * .2), 80, '#EDE4FF', .5 * k);
    }
    // the zipper pulls: sparks running in from both tips
    if (zz > 0 && zz < 1) for (const s of [0, 1]) {
      const k = s ? 1 - zz * .52 : zz * .52, [x, y] = gAt(k);
      boilSeed('gash zip' + s);
      glow(x, y, 120, '#FFF3D0', .9); inkLine([[x - 16, y - 10], [x + 16, y + 10]], 1.4, EDGE, 'inkfine', 0);
    }
  }
  // ink running out of the lower lip, down the wallpaper; drawn back up as the gash zips shut
  function gashDrips(t, Lz) {
    const z = gashZip(t);
    for (let i = 0; i < 7; i++) {
      const k = .16 + i * .115 + .03 * hash(i), t0 = T0 + .45 + .8 * hash(i + 3);
      const len = (70 + 190 * hash(i + 8)) * easeOut(seg(t, t0, t0 + 2.4 + 1.4 * hash(i))) * (1 - z) * zipBoth(k, z);
      if (len < 3) continue;
      const idx = Math.round(k * (Lz.lo.length - 1)), [x, y] = Lz.lo[idx], w = 7 + 5 * hash(i + 5);
      boilSeed('gash drip' + i);
      paint(ribbon([[x, y - 4], [x + 2, y + len * .5], [x - 1, y + len]], w, w * .45), { wash: PC.inkBody, ink: null });
      paint(ellPts(x - 1, y + len + 3, w * .45, w * .6, 10), { wash: PC.inkBody, ink: null });
    }
  }
  // torn scraps of wallpaper thrown out by the burst, fluttering down in front of everything
  function debris(t) {
    const a = t - T0; if (a < 0 || a > 2.6) return;
    for (let i = 0; i < 16; i++) {
      const k = .08 + .84 * hash(i * 2.3 + 1), [x0, y0] = gAt(k), up = hash(i + 7) < .55;
      const vx = (k - .5) * 700 + (hash(i + 3) - .5) * 300, vy = up ? -(260 + 300 * hash(i + 5)) : 80 + 200 * hash(i + 5);
      const e2 = (1 - Math.exp(-2.2 * a)) / 2.2, vt = 230 + 120 * hash(i + 9);
      const x = x0 + vx * e2 + 26 * Math.sin(a * (5 + 3 * hash(i)) + i), y = y0 + vy * e2 + vt * (a - e2);
      const sz = 11 + 14 * hash(i + 11), r = a * (3 + 5 * hash(i + 13)) + i, fl = Math.cos(a * (6 + 4 * hash(i)) + i);
      push(); translate(x, y); rotate(r); scale(1, Math.abs(fl) * .85 + .15);
      boilSeed('scrap' + i);
      const P = []; for (let j = 0; j < 5; j++) { const an = j / 5 * TAU + hash(i * 5 + j), rr = sz * (.6 + .5 * hash(i * 7 + j)); P.push([Math.cos(an) * rr, Math.sin(an) * rr * .7]); }
      paint(P, { wash: fl > 0 ? PC.wall : LIPBACK, ink: PAL.ink, sw: .45 });
      if (fl > 0) paint(starPts(0, 0, sz * .45, .25, 4), { wash: PC.damask, washOp: 200, ink: null });
      pop();
    }
  }

  // ================= papercuts on the band =================
  // In each member's body space (front view, in u): from a to b, half-width w. The slice draws itself just before
  // `open`; eyes open inside at `eyes`; it zips shut from a to b at `zip`.
  const CUT = {
    chester: { a: [-4.2, -3.35], b: [3.9, -2.55], w: .72, slice: bt(16, .5), open: bt(16, 1), eyes: bt(16, 2), zip: T3 + .06, seed: 1 },
    joe:     { a: [-4.0, -3.75], b: [3.8, -4.55], w: .62, hit: bt(17, .5), zip: T3 + .2, seed: 2 },
    rob:     { a: [-3.9, -3.45], b: [3.9, -2.6], w: .62, hit: bt(17, 1), zip: T3 + .16, seed: 3 },
    brad:    { a: [-3.4, -4.3], b: [2.4, -5.1], w: .6, hit: bt(17, 1.5), zip: T3 + .12, seed: 4 },
    phoenix: { a: [-3.6, -4.5], b: [2.4, -5.2], w: .6, hit: bt(17, 1.5) + .06, zip: T3 + .14, seed: 5 },
    mike:    { a: [-4.1, -3.3], b: [3.9, -2.5], w: .66, hit: bt(17, 2), zip: T3 + .1, seed: 6 },
  };
  for (const c of Object.values(CUT)) if (c.hit) { c.slice = c.hit - .1; c.open = c.hit; c.eyes = c.hit + .17; }
  function cutState(c, t) {
    if (t < c.slice) return null;
    return { blade: seg(t, c.slice, c.slice + .09), open: backOut(seg(t, c.open, c.open + (c.hit ? .24 : .34))),
      eyes: ease(seg(t, c.eyes, c.eyes + .14)), zip: ease(seg(t, c.zip, c.zip + .3)), scar: 1 - seg(t, c.zip + .3, c.zip + .8) };
  }
  // paint a member's cut (call it from their draw hook). look = [lookX, lookY] for the eyes inside.
  function paintCut(u, sw, c, t, look = [0, -1]) {
    const s = cutState(c, t); if (!s || s.scar <= 0) return;
    const A = [c.a[0] * u, c.a[1] * u], B = [c.b[0] * u, c.b[1] * u], key = 'cut' + c.seed, pull = lerp(-.14, 1.1, s.zip);
    const zipM = k => sm((k - pull) / .16);
    const wf = k => c.w * u * s.open * Math.pow(Math.sin(k * Math.PI), .8) * zipM(k);
    const Lz = lens(A, B, wf, 22, c.seed * 13), wm = Math.max(...Lz.ws), P = k => [lerp(A[0], B[0], k), lerp(A[1], B[1], k)];
    if (s.open <= 0) {   // the slice: a blade of light drawn across, then a hairline
      const tip = P(s.blade);
      boilSeed(key + ' blade');
      inkLine([A, tip], sw * (s.blade < 1 ? 1.1 : .75), '#FFF6DA', 'inkfine', 0);
      if (s.blade < 1) glow(tip[0], tip[1], u * 1.8, '#FFF3D0', 1);
      else { const g = decay(t, c.slice + .09, 5); for (const k of [.2, .5, .8]) glow(...P(k), u * (1.4 + 1.6 * g), '#FFF3D0', .3 + .6 * g); }
      return;
    }
    if (wm > u * .04) {
      boilSeed(key + ' hole');
      paint(Lz.poly, { wash: PC.inkBg, ink: null });
      paint(lens(A, B, k => wf(k) * .55, 14, c.seed).poly, { fill: PC.inkBodyLt, fillOp: 110, bleed: .12, tex: .5, ink: null });
      if (s.eyes > 0) {
        const len = Math.hypot(B[0] - A[0], B[1] - A[1]), gapK = 1.1 * u / len, h = Math.min(.95 * u, 1.5 * wf(.5 - gapK));
        const eo = s.eyes * blinkK(t, c.seed) * zipM(.5 + gapK * 1.3);
        const mid = P(.5);
        if (h > u * .08) peepers(mid[0], mid[1], h, eo, look[0], look[1], len * gapK * 2, key + ' eyes', 1);
      }
      lips(Lz, Math.min(u * .2, wm * .32), key, { sw: sw * .55, fibres: .22 });
    }
    // the scar where it has zipped shut, and the zipper's spark
    if (s.zip > 0) {
      boilSeed(key + ' scar');
      inkLine([A, P(clamp(pull))], sw * .6 * s.scar, '#F6E6C4', 'inkfine', 0);
      if (s.zip < 1) glow(...P(clamp(pull)), u * 1.3, '#FFF3D0', .85);
    }
  }

  // ================= the frontmen =================
  const chesterTurn = t => t < T1 - .5 ? turn(t, T0 + 1.04, T0 + 1.34, .25, -.5) : turn(t, bt(15, 3.72), bt(15, 3.72) + .32, -.5, -1);
  // Chester's mic, held in his own arm hook so its angle follows the arm
  const micUp = aR => (u, sw) => micProp(u, sw, 'chester', Math.PI / 2 - aR);

  function chester1(t) {
    const m = mood('chester', t, [[T0 - 2, 'determined'], [T0 + .13, 'surprised', { emote: null, mouth: 'O' }], [T0 + .9, 'determined']], { take: .7 });
    const tn = chesterTurn(t), facing = tn.view === 'back' || tn.view === 'qback';
    if (t < T0 + .9 && t > T0 + .5) m.mouth = 'O';
    if (t < T0 + .03) m.squint = 0;   // c2's freeze: eyes open until the burst lands
    const wide = ease(seg(t, T0 + 1.02, T0 + 1.45)), bp = bpOf(t);
    const jolt = bell(t, T0 + .12, T0 + .6);
    const aL = lerp(.35 + .45 * jolt, .5, wide) + .28 * pulse(t, 4) * wide + .04 * Math.sin(t * 31), aR = lerp(.5 + .45 * jolt, .62, wide) + .22 * pulse(t, 4) * wide;
    if (facing) glow(CX, FY - 6.5 * U, 8 * U, INKLIGHT, .45);   // the ink light rims him
    member('chester', CX, FY, U, { ...m, ...tn, ...(t > T0 + .5 || t < T0 ? singing(t, 'belt') : {}),
      lookY: -.6, aL, aR, mic: false, armR: micUp(aR), rot: (m.rot || 0) + .06 * (1 - ease(seg(t, T0 + .12, T0 + .4))), sq: (m.sq || 0) - .07 * pulse(t, 5) * wide, dy: (m.dy || 0) - .25 * Math.abs(Math.sin(bp * Math.PI)) * wide,
      seed: 2, boilKey: 'c3 chester' });
  }
  function mike1(t) {
    const m = mood('mike', t, [[T0 - 2, 'suspicious'], [T0 + .18, 'scared', { lookY: -1 }]], { take: .8 });
    if (t < T0 + .06) m.squint = 0;
    const tn = turn(t, T0 + .34, T0 + .5, -.25, 0), x = mikeX(t), walk = (MX0 - x) / (4 * U);
    member('mike', x, FY, U, { ...m, ...tn, lookY: -1, lookX: .35, mic: 'R', micAt: 'up', aR: 1.35 + .05 * Math.sin(t * 29) * seg(t, T0, T0 + .3), aL: .9 + .06 * Math.sin(t * 23) * seg(t, T0, T0 + .3), dx: (m.dx || 0) * seg(t, T0, T0 + .2),
      walk: t > T0 + .9 && t < T0 + 2.45 ? walk : null, seed: 1, boilKey: 'c3 mike' });
  }

  // ================= shot 1: the wall opens =================
  function cam1(t) {
    const p = ease(seg(t, T0 + .25, bt(15, 3.4))), f = easeIn(seg(t, bt(15, 3.35), T1));
    const sh = shakeXY(t, 16 * decay(t, T0, 4.5));
    return { cx: lerp(lerp(1900, 1945, p), 1998, f) + sh[0], cy: lerp(lerp(620, 600, p), 760, f) + sh[1], z: lerp(lerp(1.25, 1.36, p), 1.95, f) };
  }
  function wallOpens(t) {
    const cam = cam1(t);
    paintInk(t, cam);
    camBegin(cam.cx, cam.cy, cam.z);
    parlor(t, { ...parlorLight(t), drums: drumHits(t),
      portrait: { stage: 'look', lookX: .35, lookY: .8, swing: .06 * spring(t, T0, 3.5, 13) },
      hooks: bandHooks(t, { skip: ['mike', 'chester', 'joe'], extra: { behind: () => paintGash(t, true), front: () => debris(t) },
        floorAfter: () => { mike1(t); chester1(t); } }) });
    camEnd();
  }

  // The portrait: 'look' (as c2 leaves it) until the gash swallows its face, a tenth of a second into the burst. While
  // it's hidden inside the cut it changes to 'grin', and the healing zip, which seals last right over it, reveals that.
  const GRIN = { stage: 'grin', lookX: 0, lookY: .15 };

  // ================= shot 2: the cut on Chester =================
  function cam2(t) {
    let c = kf(t, [[T1, [1998, 790, 2.2]], [T1 + .3, [1993, 800, 2.3]], [bt(16, 1.2), [1988, 812, 2.36]], [bt(16, 1.9), [1968, 868, 2.95]],
      [bt(16, 2.48), [1972, 862, 3.0]], [bt(16, 2.8), [1984, 812, 2.45]], [T2 - .27, [1980, 815, 2.5]]]);
    const s = easeIn(seg(t, T2 - .27, T2)), sh = shakeXY(t, 6 * decay(t, CUT.chester.slice + .06, 9));
    return { cx: lerp(c[0], 1860, s) + sh[0], cy: lerp(c[1], 700, s) + sh[1], z: lerp(c[2], 1.42, s) };
  }
  function chester2(t) {
    const S = CUT.chester.slice, TK = bt(16, 2.76), CL = bt(16, 3.26);
    const m = mood('chester', t, [[T1 - 2, 'determined'], [S + .03, 'neutral', { eyes: 'wide', mouth: 'o', emote: null }], [TK, 'scared', { emote: 'sweat' }]], { take: .9 });
    const tn = chesterTurn(t);
    const lookY = t < TK ? lerp(0, 1, ease(seg(t, S + .18, S + .42))) : darts(t, [[TK, .2], [TK + .35, 1], [CL + .2, .4], [CL + .45, 0]]);
    const lookX = t < CL + .2 ? 0 : darts(t, [[CL + .2, 0], [CL + .3, -.9], [CL + .62, .7]], .1);
    const flinch = take(t, S + .02, .35), clamp_ = easeOut(seg(t, CL, CL + .12));
    const up = bell(t, S, S + .5);
    let aL = .55 + .28 * pulse(t, 4) * (t < S ? 1 : 0) + .4 * up, aR = .65 + .22 * pulse(t, 4) * (t < S ? 1 : 0) + .35 * up;
    if (t > TK) { aL = 1.25 + .08 * Math.sin(t * 33); aR = 1.55 + .07 * Math.sin(t * 29); }
    aL = lerp(aL, -2.45 + .06 * Math.sin(t * 40), clamp_);
    const sq = (m.sq || 0) + flinch.sq + .1 * clamp_, dy = (m.dy || 0) + flinch.dy + .12 * clamp_;
    member('chester', CX, FY, U, { ...m, ...tn, ...(t < S ? singing(t, 'belt') : {}), lookX, lookY, aL, aR, sq, dy,
      frontArm: clamp_ > .3 ? 'L' : undefined, mic: false, armR: micUp(aR), dx: (m.dx || 0) * .5,
      draw: (u, sw) => paintCut(u, sw, CUT.chester, t, t < TK ? [0, -1] : [darts(t, [[TK, 0], [CL + .1, -.8], [CL + .5, .5]], .12), darts(t, [[TK, -1], [TK + .15, 0]], .12)]),
      seed: 3, boilKey: 'c3 chester' });   // seed 3: no blink in the close-up, he stares
  }
  function mikeScared(t, extra = {}) {
    const m = mood('mike', t, [[T0 - 2, 'suspicious'], [T0 + .04, 'scared', { lookY: -1 }]]);
    member('mike', mikeX(t), FY, U, { ...m, lookY: -.5, lookX: .6, mic: 'R', micAt: 'up', aR: 1.35 + .05 * Math.sin(t * 29), aL: .9 + .06 * Math.sin(t * 23), seed: 1, boilKey: 'c3 mike', ...extra });
  }
  function cutOnChester(t) {
    const cam = cam2(t), zip = t > T2 - .3;
    if (zip) paintInk(t, cam);
    camBegin(cam.cx, cam.cy, cam.z);
    parlor(t, { ...parlorLight(t, [[CX, FY - 4 * U, 330, 1]]), dark: .3 * (1 - seg(t, T2 - .3, T2)), drums: drumHits(t), portrait: GRIN,
      hooks: bandHooks(t, { skip: ['mike', 'chester', 'joe'], extra: { behind: () => paintGash(t, zip) },
        floorAfter: () => { mikeScared(t); chester2(t); } }) });
    camEnd();
  }

  // ================= shot 3: everyone is cut =================
  function cam3(t) {
    const land = easeOut(seg(t, T2, T2 + .34)), push = ease(seg(t, bt(17, 2.4), T3));
    const sh = shakeXY(t, 7 * bell(t, bt(17, 3), T3));
    return { cx: lerp(lerp(1860, 1500, land), 1900, push) + sh[0], cy: lerp(lerp(700, 580, land), 620, push) + sh[1], z: lerp(lerp(1.42, 1.05, land), 1.25, push) };
  }
  // bandHooks' own faces for the back line, so a mood can start from exactly what they were showing
  const BASE = { joe: ['mischief', { emote: null }], rob: ['determined', { emote: null }], brad: ['cool', { eyes: 'closed', mouth: null, emote: null }], phoenix: ['happy', { emote: null }] };
  // a member's panic, as overrides for bandHooks: the take when their cut opens, eyes down at it, then darting about
  function panic(name, t, base, o = {}) {
    const c = CUT[name];
    if (t < c.open - .12) return { draw: o.draw };
    const m = mood(name, t, [[c.open - 5, ...BASE[name]], [c.open + .04, 'scared', { emote: 'sweat' }]], { take: o.take ?? .9 });
    const lookY = darts(t, [[c.open, 0], [c.open + .02, 1], [c.open + .75, .2]], .1), lookX = t < c.open + .75 ? 0 : m.lookX;
    const r = { ...m, lookY, lookX };
    delete r.aL; delete r.aR; delete r.dx;
    r.dx = .08 * Math.sin(t * 40 + c.seed);
    return r;
  }
  // the eyes inside a cut: a few quick darts round the room, then they settle, staring out at us
  const stare = (t, c) => [darts(t, [[c.eyes, 0], [c.eyes + .3, -.8], [c.eyes + .62, .7], [c.eyes + 1, 0]], .1), darts(t, [[c.eyes, -.7], [c.eyes + 1, 0]], .12)];
  // a nub patting at the cut: slaps in toward the chest a few times a second
  const pat = (t, c, seed, from) => { const a = t - c.open - .3; if (a < 0) return null; const s = Math.pow(Math.abs(Math.sin((a * 3.2 + .5) * Math.PI)), .7); return lerp(from, lerp(-.7, -2.4, s), ease(a / .14)); };
  function bandPanic(t) {
    const cutDraw = name => (u, sw) => paintCut(u, sw, CUT[name], t, stare(t, CUT[name]));
    const bp = bpOf(t), hL = drumHits(t).snare + drumHits(t).crash * .6;
    const joe = { ...panic('joe', t, 'mischief'), draw: cutDraw('joe') }, pj = pat(t, CUT.joe, 1, -.2 + .35 * Math.sin(bp * TAU * 2));
    if (pj != null) Object.assign(joe, { aL: pj, frontArm: 'L' });
    const rob = { ...panic('rob', t, 'determined'), draw: cutDraw('rob') }, pr = pat(t, CUT.rob, 2, .9 - .9 * hL);
    if (pr != null) Object.assign(rob, { aL: pr, frontArm: 'L' });
    const brad = { ...panic('brad', t, 'cool'), draw: cutDraw('brad') }, phoenix = { ...panic('phoenix', t, 'happy'), draw: cutDraw('phoenix') };
    return { joe, rob, brad, phoenix };
  }
  function mike3(t) {
    const c = CUT.mike, pm = pat(t, c, 3, .9 + .06 * Math.sin(t * 23));
    const m = mood('mike', t, [[T0 - 2, 'scared'], [c.open + .04, 'scared', { emote: 'sweat' }]], { take: 1.1 });
    const lookY = t < c.open ? -.4 : darts(t, [[c.open, -.4], [c.open + .02, 1], [c.open + .8, .1]], .1);
    const lookX = t < c.open ? darts(t, [[T2, .6], [bt(17, .5), -.8], [bt(17, 1), -.5], [bt(17, 1.5), .3]]) : t < c.open + .8 ? 0 : m.lookX;
    member('mike', MX1, FY, U, { ...m, lookX, lookY, mic: 'R', micAt: 'up', aR: 1.35 + .05 * Math.sin(t * 29), aL: pm ?? (.9 + .06 * Math.sin(t * 23)),
      frontArm: pm != null ? 'L' : undefined, draw: (u, sw) => paintCut(u, sw, c, t, stare(t, c)), seed: 1, boilKey: 'c3 mike' });
  }
  const SCR = bt(17, 2.5), SCR1 = T3;                       // the scream
  function chester3(t) {
    const pre = seg(t, SCR - .2, SCR), sc = seg(t, SCR, SCR + .12), rel = 1 - seg(t, SCR1 - .05, SCR1 + .2);
    const m = mood('chester', t, [[T1 - 2, 'scared', { emote: 'sweat' }], [SCR, 'angry', { emote: null }]], { take: .6 });
    const scream = t >= SCR ? singing(t, 'scream', 1) : {};
    const lid = t >= SCR ? clamp(.52 + .06 * Math.sin(t * 40)) * sc * rel : 0;
    const clampK = 1 - ease(seg(t, SCR - .05, SCR + .1));
    const aL = lerp(-.55 + .12 * Math.sin(t * 17), -2.45 + .06 * Math.sin(t * 40), clampK), aR = lerp(-.45 + .1 * Math.sin(t * 19), 1.5 + .07 * Math.sin(t * 29), clampK);
    member('chester', CX, FY, U, { ...m, ...scream, lid, mouth: t >= SCR ? null : 'wobble', eyes: t >= SCR ? 'angry' : m.eyes,
      lookY: t >= SCR ? -1 : .4, lookX: t >= SCR ? 0 : darts(t, [[T2, -.6], [bt(17, .5), -1], [bt(17, 1.5), -.2], [bt(17, 2), -.7]]),
      aL, aR, frontArm: clampK > .5 ? 'L' : undefined, mic: false, armR: micUp(aR),
      sq: (m.sq || 0) + .1 * clampK + .14 * pre * (1 - sc) - .12 * sc * rel, dy: (m.dy || 0) + .12 * clampK + .15 * pre * (1 - sc),
      draw: (u, sw) => paintCut(u, sw, CUT.chester, t, [0, t >= SCR ? -1 : 0]), seed: 2, boilKey: 'c3 chester' });
  }
  function everyoneCut(t) {
    const cam = cam3(t);
    paintInk(t, cam);
    camBegin(cam.cx, cam.cy, cam.z);
    parlor(t, { ...parlorLight(t), drums: drumHits(t), portrait: GRIN,
      hooks: bandHooks(t, { skip: ['mike', 'chester'], over: bandPanic(t),
        extra: { behind: () => paintGash(t, true), lit: () => screamRings(CX, FY - 6.2 * U, t - SCR, .75, { n: 5, gap: .16, life: 1.3, arc: [-.55, .55] }) },
        floorAfter: () => { mike3(t); chester3(t); } }) });
    camEnd();
  }

  // ================= shot 4: the paper heals =================

  const IR0 = T4 - .72, IR1 = T4 - .07;                      // the iris
  function cam4(t) {
    const c = kf(t, [[T3, [1900, 620, 1.25]], [T3 + 1.35, [1885, 640, 1.3]], [T3 + 1.95, [1935, 380, 2.3]], [IR0, [1935, 372, 2.45]]]);
    const p = easeIn(seg(t, IR0, IR1 + .05));
    return { cx: c[0], cy: c[1], z: lerp(c[2], 7.5, p) };
  }
  function bandHealed(t) {
    const conf = (name, t0, lx, base) => {
      const c = CUT[name];
      const m = mood(name, t, [[c.open - 5, ...BASE[name]], [c.open + .04, 'scared', { emote: 'sweat' }], [t0, 'confused']], { take: .7 });
      const r = { ...m, lookX: t > t0 ? lx : 0, lookY: t < t0 ? .9 : 0, draw: (u, sw) => paintCut(u, sw, c, t) };
      delete r.aL; delete r.aR; delete r.dx;
      return r;
    };
    return { joe: conf('joe', T3 + .95, .8, 'mischief'), rob: conf('rob', T3 + .88, -.8, 'determined'),
      brad: conf('brad', T3 + .8, 1, 'cool'), phoenix: conf('phoenix', T3 + .85, -1, 'happy') };
  }
  function frontmen4(t) {
    const cm = CUT.mike, cc = CUT.chester;
    const mm = mood('mike', t, [[T2, 'scared', { emote: 'sweat' }], [T3 + .72, 'confused']], { take: .8 });
    const maL = t < T3 + .95 ? kf(t, [[T3, -1.9], [T3 + .35, -2.35], [T3 + .55, -2.35], [T3 + .8, .1]]) : mm.aL;
    member('mike', MX1, FY, U, { ...mm, lookX: t < T3 + .72 ? 0 : 1, lookY: t < T3 + .72 ? 1 : 0, mic: 'R', micAt: 'up', aR: 1.2 + .05 * Math.sin(t * 7), aL: maL,
      frontArm: maL < -1.6 ? 'L' : undefined, draw: (u, sw) => paintCut(u, sw, cm, t), seed: 1, boilKey: 'c3 mike' });
    const cmn = mood('chester', t, [[T2, 'angry', { emote: null }], [T3 + .25, 'surprised', { emote: null }], [T3 + .68, 'confused']], { take: .7 });
    const lidK = 1 - seg(t, T3 - .05, T3 + .2), caL = t < T3 + .95 ? kf(t, [[T3, -.55], [T3 + .3, -.55], [T3 + .45, -2.3], [T3 + .62, -2.3], [T3 + .85, .1]]) : cmn.aL;
    member('chester', CX, FY, U, { ...cmn, lid: clamp(.52 * lidK), mouth: lidK > .1 ? null : cmn.mouth, lookX: t < T3 + .68 ? 0 : -1, lookY: t < T3 + .68 ? 1 : 0,
      aL: caL, frontArm: caL < -1.6 ? 'L' : undefined,
      mic: false, armR: micUp(cmn.aR ?? 1), draw: (u, sw) => paintCut(u, sw, cc, t), seed: 2, boilKey: 'c3 chester' });
  }
  function paperHeals(t) {
    const cam = cam4(t), inkOn = gashOn(t);
    if (inkOn) paintInk(t, cam);
    camBegin(cam.cx, cam.cy, cam.z);
    const L = lightState(t);
    parlor(t, { ...parlorLight(t), drums: drumHits(t), portrait: GRIN,
      hooks: bandHooks(t, { energy: .6, skip: ['mike', 'chester', 'joe'], over: bandHealed(t),
        extra: { behind: () => paintGash(t, inkOn), lit: () => {
          screamRings(CX, FY - 6.2 * U, t - SCR, .75, { n: 5, gap: .16, life: 1.3, arc: [-.55, .55] });
          if (L.warm > .02) for (const lx of [LAY.lampA, LAY.lampB]) glow(lx, 290, 520, '#FFC766', .5 * L.warm);
        } },
        floorAfter: () => frontmen4(t) }) });
    camEnd();
    // the iris: a hole shaped like a grin (curved upper lip, upturned corners, round bottom) closing on the portrait's
    // grin. It starts already inside the frame so its shape reads, then shuts on the mouth: black from IR1.
    if (t > IR0) {
      const k = seg(t, IR0, IR1), [gx, gy] = toScreen(1935, 371, LAST_CAM);
      const rx = 1060 * Math.pow(1 - k, 1.35) + 40 * (1 - k), ry = rx * .56;
      if (rx < 3 || t >= IR1) paint(rectPts(-60, -60, W + 120, H + 120), { wash: PAL.ink, ink: null });
      else {
        const P = [], cy = gy - .36 * ry;   // centred so the portrait's grin sits in the middle of the window
        for (let i = 0; i <= 18; i++) { const a = i / 18 * Math.PI; P.push([gx + Math.cos(a) * rx, cy + Math.sin(a) * ry * .95]); }   // the round bottom
        for (const [u, v] of [[-1.02, -.42], [-.8, -.2], [-.45, -.02], [0, .06], [.45, -.02], [.8, -.2], [1.02, -.42]]) P.push([gx + u * rx, cy + v * ry]);   // the upper lip
        irisShape(P, PAL.ink);
      }
    }
  }

  shots([[T0, wallOpens], [T1, cutOnChester], [T2, everyoneCut], [T3, paperHeals]]);
})();
