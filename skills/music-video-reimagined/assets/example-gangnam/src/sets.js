// sets.js: the shared places, in WORLD coordinates (the floor line is y = 820 in every set). Each set paints its whole
// background and calls o.hooks at depths: back (behind the furniture), mid (the main floor: stage the cast here),
// front (foreground props), plus set-specific ones. All sets drift and live on their own (lights, leaves, trains).
//
//   playground(t, o)  the "beach" that is really a kids' sandbox: lounger, pink umbrella, towel, slide, swings, towers
//   stable(t, o)      a row of stalls with horses looking out (side-on; pan along it); stableAisle(t, o) a symmetric
//                     aisle backdrop for walking toward the camera
//   arena(t, o)       the indoor riding arena: truss roof, sand, windows, the rail; riders can stand in the back
//   garage(t, o)      the underground car park: pillars, strip lights, lines, the red convertible, the ELEVATOR
//   subway(t, o)      a subway carriage interior (seats, poles, handles, dark windows with streaking lights);
//   platform(t, o)    the station platform (tiled pillars, screen doors, benches)
//   laserHall(t, o)   the finale's hall: a triangle-panel ceiling, sweeping green lasers, spotlights, fog
//   helpers: sky(o), cityline(y, o), bench(x, y, s), tree(x, y, s, t), fluoro(x, y, w, k)
//   STAGE             framings and marks for every set (see the guide)

const FLOOR = 820;
function viewRect2(m = 250) { const c = CAM || { cx: W / 2, cy: H / 2, zoom: 1, rot: 0 }; const hw = W / 2 / c.zoom + m, hh = H / 2 / c.zoom + m; return [c.cx - hw, c.cy - hh, c.cx + hw, c.cy + hh]; }
const vis = (x0, x1) => { const [a, , c] = viewRect2(); return x1 > a && x0 < c; };

// ---------- generic scenery ----------
function sky(o = {}) {
  const [a, b, c, d] = viewRect2(400);
  boilSeed('sky');
  paint(rectPts(a, b, c - a, FLOOR + 40 - b), { wash: o.col || GP.sky, ink: null });
  paint(ellPts((a + c) / 2, FLOOR - 40, (c - a) * .7, 260, 26), { fill: o.haze || '#EAF4F4', fillOp: 120, bleed: .3, tex: .4, ink: null });
  for (let i = 0; i < 6; i++) {   // clouds, drifting
    const x = -600 + ((i * 710 + (o.t || 0) * 12) % 4200), y = 110 + 90 * hash(i + 3);
    if (!vis(x - 300, x + 300)) continue;
    boilSeed('cloud' + i);
    const P = []; for (let k = 0; k < 24; k++) { const q = k / 24 * TAU, up = Math.sin(q) < 0; P.push([x + Math.cos(q) * 190, y + Math.sin(q) * (up ? 60 + 22 * Math.abs(Math.sin(q * 3)) : 34)]); }
    paint(P, { wash: '#FBFBF6', fill: '#DCE8EE', fillOp: 90, bleed: .08, ink: null, curv: .4 });
  }
}
// the riverside apartment towers of a big city (the original's skyline), pale and far
function cityline(y = FLOOR - 60, o = {}) {
  const [a, , c] = viewRect2(300);
  for (let i = Math.floor((a + 200) / 170); i <= Math.ceil((c + 200) / 170); i++) {
    const x = i * 170 + 40 * hash(i), h = 220 + 200 * hash(i * 3.3), w = 110 + 40 * hash(i * 1.7);
    boilSeed('tower' + i);
    const col = mixCol(o.col || '#B8D4DC', '#FFFFFF', .2 * hash(i * 5));
    paint(rectPts(x, y - h, w, h), { wash: col, ink: mixCol(col, PAL.ink, .35), sw: .5 });
    for (let r = 0; r < Math.floor(h / 26); r++) inkLine([[x + 8, y - h + 16 + r * 26], [x + w - 8, y - h + 16 + r * 26]], .35, mixCol(col, PAL.ink, .25), 'inkfine', 0);
  }
}
function tree(x, y, s = 1, t = 0) {
  if (!vis(x - 160 * s, x + 160 * s)) return;
  boilSeed('tree' + Math.round(x));
  paint(rectPts(x - 12 * s, y - 150 * s, 24 * s, 150 * s), { wash: '#7A5A3A', ink: PAL.ink, sw: .6 });
  for (let k = 0; k < 3; k++) paint(ellPts(x + (k - 1) * 55 * s + 4 * Math.sin(t * 1.4 + k), y - (190 + 30 * (k % 2)) * s, 90 * s, 72 * s, 18), { wash: k % 2 ? GP.grass : GP.grassDk, fill: '#4E8A38', fillOp: 70, bleed: .05, ink: PAL.ink, sw: .6 });
}
function bench(x, y, s = 1, col = '#B8845A') {
  if (!vis(x - 140 * s, x + 140 * s)) return;
  boilSeed('bench' + Math.round(x));
  paint(rectPts(x - 120 * s, y - 62 * s, 240 * s, 16 * s), { wash: col, ink: PAL.ink, sw: .7 });
  paint(rectPts(x - 120 * s, y - 100 * s, 240 * s, 14 * s), { wash: col, ink: PAL.ink, sw: .7 });
  for (const d of [-100, 90]) paint(rectPts(x + d * s, y - 62 * s, 12 * s, 62 * s), { wash: mixCol(col, PAL.ink, .35), ink: PAL.ink, sw: .6 });
}
function fluoro(x, y, w = 160, k = 1) {   // a strip light
  if (!vis(x - w, x + w)) return;
  paint(rrPts(x - w / 2, y - 7, w, 14, 6), { wash: mixCol('#DDE6E8', '#FFFFFF', k), ink: PAL.ink, sw: .5 });
  if (k > .05) glow(x, y + 10, w * .9, '#EAF6FF', .45 * k);
}

// ---------- the playground "beach" ----------
// marks: lounger (1500, 820), umbrella pole x 1690, towel under the lounger, kid mark (1180, 850), slide x 520,
// swings x 2350, sandbox from x 900 to 2150 (wooden border), side table x 1810
function playground(t, o = {}) {
  const H_ = o.hooks || {};
  sky({ t });
  cityline(FLOOR - 120, { col: '#C4DCE2' });
  boilSeed('pg grass');
  paint(rectPts(-800, FLOOR - 130, 5200, 200), { wash: GP.grass, fill: GP.grassDk, fillOp: 60, bleed: .03, tex: .6, ink: null });
  for (let i = 0; i < 9; i++) tree(-200 + i * 480 + 90 * hash(i), FLOOR - 110, .8 + .3 * hash(i + 4), t);
  // the fence
  boilSeed('pg fence');
  for (let x = -600; x < 4200; x += 90) if (vis(x - 50, x + 50)) paint(rectPts(x, FLOOR - 180, 12, 70), { wash: '#6FB06A', ink: PAL.ink, sw: .5 });
  inkLine([[-600, FLOOR - 170], [4200, FLOOR - 170]], 1.5, '#4E8A48', 'ink', 0);
  if (H_.back) H_.back();
  // the slide and the swings (the tell that this "beach" is a playground)
  if (vis(300, 760)) { boilSeed('slide');
    paint([[430, FLOOR - 60], [470, FLOOR - 330], [510, FLOOR - 330], [480, FLOOR - 60]], { wash: '#E86A4A', ink: PAL.ink, sw: .8 });
    paint([[500, FLOOR - 330], [560, FLOOR - 330], [760, FLOOR - 60], [700, FLOOR - 60]], { wash: '#F4C23A', fill: '#D89A1E', fillOp: 60, ink: PAL.ink, sw: .9 });
    for (let k = 0; k < 6; k++) inkLine([[440 + k * 6, FLOOR - 90 - k * 44], [480 + k * 6, FLOOR - 90 - k * 44]], 1, PAL.ink, 'ink', 0); }
  if (vis(2200, 2600)) { boilSeed('swings');
    inkLine([[2230, FLOOR - 40], [2300, FLOOR - 360], [2520, FLOOR - 360], [2590, FLOOR - 40]], 3, '#4A7AC0', 'ink', 0);
    for (const [sx, ph] of [[2350, 0], [2470, 1.4]]) { const a = .12 * Math.sin(t * 2.2 + ph), bx = sx + Math.sin(a) * 250, by = FLOOR - 360 + Math.cos(a) * 250;
      inkLine([[sx - 18, FLOOR - 360], [bx - 18, by]], .8, PAL.ink, 'inkfine', 0); inkLine([[sx + 18, FLOOR - 360], [bx + 18, by]], .8, PAL.ink, 'inkfine', 0);
      paint(rectPts(bx - 30, by, 60, 12), { wash: '#E86A4A', ink: PAL.ink, sw: .6 }); } }
  // the sandbox: sand with a wooden border
  boilSeed('sandbox');
  paint(rectPts(860, FLOOR - 20, 1320, 170, 2), { wash: GP.sand, fill: GP.sandDk, fillOp: 90, bleed: .05, tex: .9, ink: null });
  for (const [x0, x1] of [[850, 2190]]) { paint(rectPts(x0, FLOOR - 34, x1 - x0, 20), { wash: '#C48A56', ink: PAL.ink, sw: .8 }); paint(rectPts(x0 - 20, FLOOR + 140, x1 - x0 + 40, 26), { wash: '#B07A48', ink: PAL.ink, sw: .8 }); }
  for (let i = 0; i < 14; i++) { const x = 900 + 90 * i + 30 * hash(i), y = FLOOR + 20 + 100 * hash(i + 7); inkLine([[x, y], [x + 16, y - 3]], .5, GP.sandDk, 'inkfine', .4); }
  // a toy bucket and spade
  if (vis(900, 1100)) { boilSeed('bucket'); paint([[960, FLOOR + 60], [1010, FLOOR + 60], [1002, FLOOR + 110], [968, FLOOR + 110]], { wash: '#4AA8E0', ink: PAL.ink, sw: .6 }); inkLine([[1030, FLOOR + 40], [1060, FLOOR + 110]], 2, '#E8483E', 'ink', 0); }
  if (H_.mid0) H_.mid0();
  // the towel (a blue wave pattern), the lounger, the umbrella, the side table with a drink
  if (vis(1200, 1900)) {
    boilSeed('towel');
    paint([[1300, FLOOR - 60], [1690, FLOOR - 60], [1720, FLOOR + 30], [1270, FLOOR + 30]], { wash: '#F6F4EA', ink: PAL.ink, sw: .7 });
    for (let k = 0; k < 5; k++) { const P = []; for (let i = 0; i <= 10; i++) P.push([1290 + i * 42, FLOOR - 48 + k * 17 + 5 * Math.sin(i * 1.3 + k)]); inkLine(P, 2.4, '#4A8AD8', 'ink', .6); }
    boilSeed('lounger');
    paint([[1300, FLOOR - 70], [1660, FLOOR - 70], [1670, FLOOR - 50], [1300, FLOOR - 50]], { wash: '#E8E0D0', ink: PAL.ink, sw: .8 });
    paint([[1290, FLOOR - 70], [1330, FLOOR - 70], [1250, FLOOR - 260], [1210, FLOOR - 250]], { wash: '#E8E0D0', ink: PAL.ink, sw: .8 });
    for (const lx of [1320, 1640]) paint(rectPts(lx, FLOOR - 50, 10, 50), { wash: '#9A9A9A', ink: PAL.ink, sw: .5 });
  }
  if (vis(1600, 2000)) {
    boilSeed('umbrella');
    inkLine([[1690, FLOOR + 10], [1690, FLOOR - 470]], 3, '#E8E0D0', 'ink', 0);
    const U = []; for (let i = 0; i <= 16; i++) { const a = Math.PI + i / 16 * Math.PI; U.push([1690 + Math.cos(a) * 300, FLOOR - 470 + Math.sin(a) * 110]); }
    U.push([1990, FLOOR - 440]); for (let i = 7; i >= 0; i--) U.push([1690 - 300 + i * 75, FLOOR - 440 + (i % 2 ? 16 : 0)]);
    paint(U, { wash: '#F48AA8', fill: '#E0608A', fillOp: 70, ink: PAL.ink, sw: .9, curv: .2 });
    for (let k = 1; k < 4; k++) inkLine([[1690, FLOOR - 580], [1690 - 300 + k * 150, FLOOR - 440]], .6, '#C0506E', 'inkfine', 0);
    boilSeed('table');
    paint(rectPts(1790, FLOOR - 110, 110, 14), { wash: '#F4F2EE', ink: PAL.ink, sw: .6 });
    for (const lx of [1800, 1880]) paint(rectPts(lx, FLOOR - 96, 8, 96), { wash: '#DDD8CE', ink: PAL.ink, sw: .5 });
    paint([[1830, FLOOR - 160], [1860, FLOOR - 160], [1856, FLOOR - 112], [1834, FLOOR - 112]], { wash: '#E8A04A', fill: '#F8D070', fillOp: 70, ink: PAL.ink, sw: .5 });
    inkLine([[1852, FLOOR - 160], [1868, FLOOR - 190]], 1, '#E8483E', 'ink', 0);
  }
  if (H_.mid) H_.mid();
  if (H_.front) H_.front();
}

// ---------- the stable ----------
// a long row of stalls, side-on: stall k spans x = 200 + 300k .. +280; its horse (if any) looks out over the half-door
// at (stallX(k) + 140, 520). The aisle floor runs in front. o.horses: stall indices that have a horse (default most).
const stallX = k => 200 + 300 * k;
function stable(t, o = {}) {
  const H_ = o.hooks || {}, [a, , c] = viewRect2(300);
  boilSeed('stable wall');
  paint(rectPts(a - 100, -400, c - a + 200, FLOOR + 400), { wash: '#E4D6B8', ink: null });
  paint(rectPts(a - 100, -400, c - a + 200, 460), { wash: '#C8B08A', fill: '#A88A60', fillOp: 60, tex: .6, ink: null });                   // upper wall
  for (let x = Math.floor(a / 120) * 120; x < c; x += 120) { boilSeed('beam' + x); inkLine([[x, -400], [x, 60]], .6, '#8A7050', 'inkfine', 0); }
  inkLine([[a - 100, 60], [c + 100, 60]], 3, '#6A5038', 'ink', 0);
  for (let k = Math.floor((a - 200) / 300); k <= Math.ceil((c - 200) / 300); k++) {
    const x = stallX(k);
    boilSeed('stall' + k);
    paint(rectPts(x, 120, 280, FLOOR - 120), { wash: '#4A3428', ink: PAL.ink, sw: .8 });                                          // the dark stall
    paint(rectPts(x - 16, 110, 16, FLOOR - 110), { wash: '#8A6444', ink: PAL.ink, sw: .7 });                                         // post
    for (let i = 0; i < 7; i++) inkLine([[x + 20 + i * 40, 130], [x + 20 + i * 40, 420]], 2.5, '#2A2026', 'ink', 0);                // bars
    const showHorse = (o.horses ? o.horses.includes(k) : hash(k * 3.3) > .25) && !(o.skip && o.skip.includes(k));
    if (showHorse && H_.stallHorse) H_.stallHorse(k, x + 140);
    else if (showHorse) horse(x + 140, 690, 14, t, { view: 'up', mood: 'deadpan', coat: _pick(['bay', 'grey', 'black', 'palomino', 'bay'], k + 7), blink: k, boilKey: 'stallhorse' + k });   // looking over the door
    paint(rectPts(x, 460, 280, FLOOR - 460), { wash: '#9A6A44', fill: '#7A5034', fillOp: 70, tex: .6, ink: PAL.ink, sw: .9 });        // the half-door
    inkLine([[x + 10, 470], [x + 270, FLOOR - 10]], 2, '#6A4A30', 'ink', 0); inkLine([[x + 270, 470], [x + 10, FLOOR - 10]], 2, '#6A4A30', 'ink', 0);
    paint(ellPts(x + 140, 300, 44, 22, 12), { wash: PC_BRASS, ink: PAL.ink, sw: .5 });                                              // nameplate (blank)
  }
  if (H_.back) H_.back();
  boilSeed('aisle');
  paint(rectPts(a - 100, FLOOR, c - a + 200, 500), { wash: '#C8B48E', fill: '#A8926A', fillOp: 70, bleed: .03, tex: .8, ink: null });
  for (let i = 0; i < 16; i++) { const x = a + (c - a) * hash(i * 2.1), y = FLOOR + 40 + 160 * hash(i * 3.7); boilSeed('straw' + i); inkLine([[x, y], [x + 30, y - 6]], .8, '#E8C860', 'inkfine', .3); }
  if (H_.mid) H_.mid();
  if (H_.front) H_.front();
}
const PC_BRASS = '#C99A45';
// a symmetric aisle painted in one-point perspective (a flat backdrop, no 3D camera): walk toward us by scaling up
function stableAisle(t, o = {}) {
  const H_ = o.hooks || {}, vx = 960, vy = 470;
  boilSeed('aisle bg');
  paint(rectPts(-400, -300, W + 800, H + 600), { wash: '#D8C8A6', ink: null });
  paint([[-400, H + 300], [W + 400, H + 300], [vx + 120, vy + 40], [vx - 120, vy + 40]], { wash: '#C8B48E', fill: '#A8926A', fillOp: 70, tex: .8, ink: null });
  paint([[-400, -300], [W + 400, -300], [vx + 120, vy - 110], [vx - 120, vy - 110]], { wash: '#B8A07A', ink: null });
  paint(rectPts(vx - 120, vy - 110, 240, 150), { wash: '#FFF6E0', ink: PAL.ink, sw: .6 });                                           // the bright far door
  glow(vx, vy - 40, 240, '#FFF0C8', .5);
  for (const sd of [-1, 1]) for (let k = 0; k < 6; k++) {   // stall fronts receding
    const q0 = 1 - k / 6, q1 = 1 - (k + 1) / 6, X = q => vx + sd * (130 + 1000 * q * q), Yt = q => vy - 110 - 520 * q * q, Yb = q => vy + 40 + 560 * q * q;
    boilSeed('as' + sd + k);
    paint([[X(q0), Yt(q0)], [X(q1), Yt(q1)], [X(q1), Yb(q1)], [X(q0), Yb(q0)]], { wash: k % 2 ? '#8A6444' : '#9A7050', fill: '#5A3E2A', fillOp: 60, ink: PAL.ink, sw: .6 });
    if (H_.aisleHorse && k < 3) H_.aisleHorse(sd, k, (X(q0) + X(q1)) / 2, (Yt(q0) + Yb(q0)) / 2 - 40 * q0, .4 + q0 * .8);
  }
  if (H_.mid) H_.mid();
  if (H_.front) H_.front();
}

// ---------- the riding arena ----------
// A big indoor hall: truss roof, windows along the back, sand floor, a white rail. Stage the dancers on the sand in
// rows between y 830 (back row) and 1000 (front). Riders/horses stand in the back at y ~ 800.
function arena(t, o = {}) {
  const H_ = o.hooks || {}, [a, , c] = viewRect2(400);
  boilSeed('arena back');
  paint(rectPts(a - 200, -600, c - a + 400, FLOOR + 600), { wash: '#E8DCC0', ink: null });
  // windows along the back wall, with a bright sky beyond
  for (let x = Math.floor(a / 260) * 260 + 30; x < c; x += 260) { boilSeed('awin' + x); paint(rectPts(x, 380, 200, 300), { wash: '#DFF0F6', fill: '#FFFFFF', fillOp: 90, ink: PAL.ink, sw: .7 }); for (const f of [1 / 3, 2 / 3]) inkLine([[x + 200 * f, 380], [x + 200 * f, 680]], .6, PAL.ink, 'inkfine', 0); inkLine([[x, 530], [x + 200, 530]], .6, PAL.ink, 'inkfine', 0); glow(x + 100, 530, 160, '#FFF8E0', .25); }
  // the truss roof: a big gable of timber beams
  boilSeed('roof');
  paint([[a - 200, 340], [c + 200, 340], [c + 200, -600], [a - 200, -600]], { wash: '#C89A68', fill: '#9A6A40', fillOp: 70, tex: .7, ink: null });
  for (let x = Math.floor(a / 220) * 220; x < c + 220; x += 220) { boilSeed('truss' + x); inkLine([[x, 340], [x + 110, 120], [x + 220, 340]], 2.2, '#6A4424', 'ink', 0); inkLine([[x + 110, 120], [x + 110, 340]], 1.2, '#6A4424', 'ink', 0); }
  inkLine([[a - 200, 340], [c + 200, 340]], 4, '#5A3A1E', 'ink', 0); inkLine([[a - 200, 120], [c + 200, 120]], 3, '#5A3A1E', 'ink', 0);
  for (let x = Math.floor(a / 330) * 330 + 160; x < c; x += 330) { boilSeed('alamp' + x); inkLine([[x, 120], [x, 250]], .7, PAL.ink, 'inkfine', 0); paint(ellPts(x, 262, 26, 14, 10), { wash: '#FFF4D8', ink: PAL.ink, sw: .5 }); glow(x, 270, 130, '#FFE8B0', .5); }
  // the rail round the ring
  boilSeed('rail');
  paint(rectPts(a - 200, 690, c - a + 400, 120), { wash: '#F2EEE4', fill: '#D8D0C0', fillOp: 60, tex: .5, ink: null });
  for (let x = Math.floor(a / 200) * 200; x < c + 200; x += 200) paint(rectPts(x, 690, 18, 120), { wash: '#E8E2D6', ink: PAL.ink, sw: .5 });
  inkLine([[a - 200, 692], [c + 200, 692]], 1.5, PAL.ink, 'ink', 0); inkLine([[a - 200, 810], [c + 200, 810]], 1, PAL.ink, 'ink', 0);
  if (H_.back) H_.back();
  // the sand, raked
  boilSeed('arena sand');
  paint(rectPts(a - 200, 810, c - a + 400, 700), { wash: '#E6CE92', fill: '#C8A866', fillOp: 80, bleed: .03, tex: .9, ink: null });
  for (let k = 0; k < 7; k++) { const y = 830 + k * k * 6 + k * 14; inkLine([[a - 200, y], [c + 200, y + 3]], .5, '#B89858', 'inkfine', .3); }
  if (H_.mid) H_.mid();
  if (H_.front) H_.front();
}

// ---------- the parking garage ----------
// marks: pillars every 520 px from x = 0 (orange bands), the red convertible at (2300, 820), the ELEVATOR doors
// centred at x = ELEV_X = 3300 (doors 260 wide, 420 tall, with a floor indicator above), strip lights overhead.
const ELEV_X = 3300;
function garage(t, o = {}) {
  const H_ = o.hooks || {}, [a, , c] = viewRect2(400);
  boilSeed('garage');
  paint(rectPts(a - 200, -600, c - a + 400, FLOOR + 600), { wash: '#DADCD4', ink: null });
  paint(rectPts(a - 200, -600, c - a + 400, 800), { wash: '#C8CAC2', fill: '#A8AAA2', fillOp: 60, tex: .6, ink: null });              // ceiling
  for (let x = Math.floor(a / 400) * 400 + 100; x < c; x += 400) for (const y of [60, 150]) fluoro(x, y, 220, o.lights ?? 1);
  paint(rectPts(a - 200, 520, c - a + 400, 300), { wash: '#E8EAE2', ink: null });                                                      // back wall
  for (let x = Math.floor(a / 520) * 520; x < c + 520; x += 520) { boilSeed('pillar' + x);
    paint(rectPts(x - 50, 200, 100, FLOOR - 200), { wash: '#F2F2EC', ink: PAL.ink, sw: .7 });
    paint(rectPts(x - 50, 580, 100, FLOOR - 580), { wash: '#F4A63A', fill: '#D8841E', fillOp: 60, ink: PAL.ink, sw: .7 });
    for (let k = 0; k < 4; k++) paint([[x - 50, 600 + k * 50], [x + 50, 580 + k * 50], [x + 50, 600 + k * 50], [x - 50, 620 + k * 50]], { wash: '#2A2630', washOp: 160, ink: null }); }
  // the elevator
  if (vis(ELEV_X - 300, ELEV_X + 300)) { boilSeed('elevator');
    paint(rectPts(ELEV_X - 170, 360, 340, FLOOR - 360), { wash: '#B8BCC0', ink: PAL.ink, sw: 1 });
    const open = clamp(o.elevOpen || 0), dw = 130 * (1 - open);
    if (open > .02 && H_.elevInside) { H_.elevInside(ELEV_X, open); }
    else if (open > .02) paint(rectPts(ELEV_X - 130, 400, 260, FLOOR - 400), { wash: '#E8ECEE', ink: null });
    for (const s of [-1, 1]) paint(rectPts(s < 0 ? ELEV_X - 130 : ELEV_X + 130 - dw, 400, dw, FLOOR - 400), { wash: '#D0D4D8', fill: '#A8ACB0', fillOp: 50, ink: PAL.ink, sw: .8 });
    paint(rrPts(ELEV_X - 60, 300, 120, 44, 8), { wash: '#2A2630', ink: PAL.ink, sw: .6 });
    if (o.elevFloor != null) letter(String(o.elevFloor), ELEV_X, 322, 34, '#FF7A4A', { ink: false });
    paint(rectPts(ELEV_X + 180, 560, 30, 60), { wash: '#C8CCD0', ink: PAL.ink, sw: .5 }); paint(ellPts(ELEV_X + 195, 590, 8, 8, 8), { wash: o.elevLight ? '#FFB84A' : '#E8E8E0', ink: PAL.ink, sw: .4 }); }
  if (H_.back) H_.back();
  // the floor: lines and arrows
  boilSeed('garage floor');
  paint(rectPts(a - 200, FLOOR, c - a + 400, 700), { wash: '#C4C8C2', fill: '#A8ACA4', fillOp: 60, bleed: .03, tex: .7, ink: null });
  for (let x = Math.floor(a / 380) * 380; x < c; x += 380) { boilSeed('line' + x); paint(rectPts(x, FLOOR + 20, 14, 180), { wash: '#F4F2E8', ink: null }); }
  for (let x = Math.floor(a / 900) * 900 + 300; x < c; x += 900) { boilSeed('arrow' + x); paint([[x, FLOOR + 110], [x + 120, FLOOR + 110], [x + 120, FLOOR + 90], [x + 170, FLOOR + 125], [x + 120, FLOOR + 160], [x + 120, FLOOR + 140], [x, FLOOR + 140]], { wash: '#F4F2E8', ink: null }); }
  // the red convertible
  if (vis(1900, 2700) && !o.noCar) carProp(2300, FLOOR + 10, 1, t, o.car || {});
  if (H_.mid) H_.mid();
  if (H_.front) H_.front();
}
function carProp(x, y, s = 1, t = 0, o = {}) {
  boilSeed('car' + Math.round(x));
  const col = o.col || '#D8302E';
  paint([[x - 330 * s, y - 60 * s], [x - 300 * s, y - 150 * s], [x - 120 * s, y - 175 * s], [x + 60 * s, y - 175 * s], [x + 250 * s, y - 150 * s], [x + 330 * s, y - 90 * s], [x + 330 * s, y - 40 * s], [x - 330 * s, y - 40 * s]], { wash: col, fill: mixCol(col, PAL.ink, .35), fillOp: 60, ink: PAL.ink, sw: 1, curv: .3 });
  paint([[x - 90 * s, y - 175 * s], [x - 40 * s, y - 250 * s], [x + 60 * s, y - 250 * s], [x + 40 * s, y - 175 * s]], { wash: '#BFE0F0', washOp: 170, ink: PAL.ink, sw: .7 });   // windscreen
  for (const wx of [-210, 210]) { paint(ellPts(x + wx * s, y - 40 * s, 62 * s, 62 * s, 18), { wash: '#26222C', ink: PAL.ink, sw: .8 }); paint(ellPts(x + wx * s, y - 40 * s, 30 * s, 30 * s, 12), { wash: '#C8CCD0', ink: PAL.ink, sw: .5 }); }
  paint(ellPts(x + 300 * s, y - 110 * s, 22 * s, 14 * s, 10), { wash: '#FFF4C8', ink: PAL.ink, sw: .5 });
}

// ---------- the subway ----------
// The carriage, side-on: seats along the back wall (y 700-790), windows above them (dark, with streaking tunnel
// lights), grab handles hanging from a rail at y 190, vertical poles every 700 px (x = 350 + 700k). The floor from 820.
function subway(t, o = {}) {
  const H_ = o.hooks || {}, [a, , c] = viewRect2(400), speed = o.speed ?? 1;
  boilSeed('sub body');
  paint(rectPts(a - 200, -600, c - a + 400, FLOOR + 600), { wash: '#E8ECEA', ink: null });
  paint(rectPts(a - 200, -600, c - a + 400, 740), { wash: '#DCE2E0', ink: null });
  for (let x = Math.floor(a / 460) * 460; x < c + 460; x += 460) { boilSeed('win' + x);
    paint(rrPts(x + 30, 260, 400, 300, 26), { wash: '#1E2230', ink: PAL.ink, sw: .9 });
    for (let k = 0; k < 3; k++) { const lx = x + 30 + ((k * 170 - t * 1400 * speed) % 400 + 400) % 400; inkLine([[lx, 300 + k * 80], [lx + 120, 300 + k * 80]], 2.5, '#FFE6A0', 'ink', 0); glow(lx + 60, 300 + k * 80, 50, '#FFE6A0', .5); }
    glow(x + 230, 410, 120, '#8FD0FF', .12); }
  paint(rectPts(a - 200, 180, c - a + 400, 20), { wash: '#B8C0C4', ink: PAL.ink, sw: .6 });                                          // the handle rail
  for (let x = Math.floor(a / 115) * 115; x < c; x += 115) { boilSeed('hdl' + x); const sw_ = 6 * Math.sin(t * 3 + x * .01); inkLine([[x, 200], [x + sw_, 240]], 1, '#8A9094', 'inkfine', 0); brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', '#8A9094', 1.2); brush.beginShape(0); for (const p of ellPts(x + sw_, 258, 16, 18, 10)) brush.vertex(p[0], p[1]); brush.endShape(true); }
  if (H_.back) H_.back();
  boilSeed('seats');
  paint(rectPts(a - 200, 690, c - a + 400, 40), { wash: '#6AA0D8', fill: '#4A80B8', fillOp: 60, tex: .6, ink: PAL.ink, sw: .7 });   // the seat back
  paint(rectPts(a - 200, 730, c - a + 400, 50), { wash: '#5A90C8', ink: PAL.ink, sw: .7 });
  if (H_.seats) H_.seats();
  boilSeed('sub floor');
  paint(rectPts(a - 200, FLOOR - 40, c - a + 400, 800), { wash: '#B8BCB6', fill: '#9A9E98', fillOp: 60, tex: .7, ink: null });
  for (let x = Math.floor(a / 700) * 700 + 350; x < c; x += 700) { boilSeed('pole' + x); paint(rectPts(x - 10, 190, 20, FLOOR + 120 - 190), { wash: '#D8DCDE', fill: '#A8AEB2', fillOp: 60, ink: PAL.ink, sw: .6 }); }
  if (H_.mid) H_.mid();
  if (H_.front) H_.front();
}
// the station platform: tiled blue pillars, screen doors with a train beyond, benches. Room for a line of 9 dancers.
function platform(t, o = {}) {
  const H_ = o.hooks || {}, [a, , c] = viewRect2(400);
  boilSeed('plat wall');
  paint(rectPts(a - 200, -600, c - a + 400, FLOOR + 600), { wash: '#DDE6EA', ink: null });
  paint(rectPts(a - 200, -600, c - a + 400, 780), { wash: '#C8D2D6', ink: null });
  for (let x = Math.floor(a / 300) * 300; x < c + 300; x += 300) fluoro(x + 150, 120, 200, o.lights ?? 1);
  // screen doors along the back, the train's windows beyond
  for (let x = Math.floor(a / 360) * 360; x < c + 360; x += 360) { boilSeed('sd' + x);
    paint(rectPts(x + 20, 330, 320, 400), { wash: '#A8C8D8', washOp: 200, ink: PAL.ink, sw: .7 });
    paint(rrPts(x + 60, 400, 240, 150, 20), { wash: '#3A4A60', ink: PAL.ink, sw: .5 });
    inkLine([[x + 180, 330], [x + 180, 730]], 1, PAL.ink, 'inkfine', 0);
    paint(rectPts(x + 20, 300, 320, 30), { wash: '#2A3A5A', ink: PAL.ink, sw: .5 }); }
  // tiled pillars
  for (let x = Math.floor(a / 900) * 900 + 450; x < c; x += 900) { boilSeed('tp' + x);
    paint(rectPts(x - 70, 160, 140, FLOOR - 160), { wash: '#6AB0E0', fill: '#4A90C8', fillOp: 60, tex: .6, ink: PAL.ink, sw: .8 });
    for (let k = 0; k < 14; k++) inkLine([[x - 70, 190 + k * 45], [x + 70, 190 + k * 45]], .5, '#2A6AA0', 'inkfine', 0);
    for (const dx of [-35, 0, 35]) inkLine([[x + dx, 160], [x + dx, FLOOR]], .4, '#2A6AA0', 'inkfine', 0); }
  if (H_.back) H_.back();
  boilSeed('plat floor');
  paint(rectPts(a - 200, FLOOR - 40, c - a + 400, 800), { wash: '#E8ECEE', fill: '#C8D0D4', fillOp: 60, tex: .6, ink: null });
  paint(rectPts(a - 200, FLOOR - 44, c - a + 400, 26), { wash: '#F4D23A', ink: PAL.ink, sw: .5 });                                   // the yellow safety line
  for (let x = Math.floor(a / 60) * 60; x < c; x += 60) paint(ellPts(x + 30, FLOOR - 31, 5, 5, 6), { wash: '#C8A21E', ink: null });
  if (H_.mid) H_.mid();
  if (H_.front) H_.front();
}

// ---------- the laser hall (the finale) ----------
// A huge dark hall: a ceiling of triangular panels lit from within, green lasers sweeping on the beat, spotlights,
// fog, a bright wash at the back. o.lasers 0..1, o.col (laser colour), o.hue (a colour shift for the ceiling).
function laserHall(t, o = {}) {
  const H_ = o.hooks || {}, [a, b, c] = viewRect2(500), k = o.lasers ?? 1;
  boilSeed('hall bg');
  paint(rectPts(a - 200, b - 200, c - a + 400, FLOOR + 400 - b), { wash: '#0E1A2A', ink: null });
  glow((a + c) / 2, 560, 900, '#3AD0FF', .55);
  glow((a + c) / 2, 700, 700, '#7AFFD0', .35);
  // the ceiling: triangle panels
  for (let i = Math.floor(a / 220) - 1; i <= Math.ceil(c / 220) + 1; i++) for (let j = 0; j < 3; j++) {
    const x = i * 220 + (j % 2 ? 110 : 0), y = -140 + j * 130, up = (i + j) % 2 === 0;
    boilSeed('tri' + i + '_' + j);
    const P = up ? [[x, y + 130], [x + 110, y], [x + 220, y + 130]] : [[x, y], [x + 220, y], [x + 110, y + 130]];
    const lum = .35 + .3 * hash(i * 3.1 + j) + .2 * pulse(t, 4) * (hash(i + j * 7) > .6 ? 1 : 0);
    paint(P, { wash: mixCol('#1E3A5A', o.hue || '#8AF0FF', lum), ink: '#0A1420', sw: .8 });
  }
  if (H_.back) H_.back();
  // lasers: fans of beams from sources at the back, sweeping on the beat
  if (k > .02) for (let s = 0; s < 4; s++) {
    const sx = (a + c) / 2 + (s - 1.5) * 520, sy = 470, bp = (t - OFF) / BEAT;
    for (let r = 0; r < 5; r++) {
      const ang = -Math.PI / 2 + Math.sin(bp * Math.PI / 4 + s * 1.3) * .9 + (r - 2) * .16, L = 1400;
      boilSeed('laser' + s + r);
      inkLine([[sx, sy], [sx + Math.cos(ang) * L, sy + Math.sin(ang) * L]], 1.4, o.col || GP.laser, 'inkfine', 0);
    }
    glow(sx, sy, 90, o.col || GP.laser, .8 * k);
  }
  // spotlights on the floor
  for (let s = 0; s < 3; s++) { const x = (a + c) / 2 + (s - 1) * 700 + 200 * Math.sin((t - OFF) / BEAT * Math.PI / 8 + s); glow(x, 900, 360, '#E8FFFF', .28); }
  boilSeed('hall floor');
  paint(rectPts(a - 200, FLOOR - 20, c - a + 400, 800), { wash: '#6A8A9A', fill: '#3A5A6A', fillOp: 70, tex: .6, ink: null });
  glow((a + c) / 2, FLOOR + 60, 1100, '#9AF4FF', .35);
  if (H_.mid) H_.mid();
  // fog along the floor
  for (let i = 0; i < 6; i++) { boilSeed('fog' + i); const x = a + (c - a) * (i + .5) / 6 + 60 * Math.sin(t * .4 + i); paint(ellPts(x, FLOOR + 170, 360, 70, 18), { fill: '#E8FFFF', fillOp: 40, bleed: .3, tex: .3, ink: null }); }
  if (H_.front) H_.front();
}

// ---------- STAGE: framings (camBegin args) and marks per set ----------
const STAGE = {
  playground: { wide: [1500, 560, .75], lounger: [1500, 640, 1.6], kidMark: [1180, 860], oppaMark: [1500, 800] },
  stable: { wide: [960, 540, .8], walkY: 900 },
  arena: { wide: [1600, 580, .62], front: [1600, 720, 1.1], rows: [[830, 9, 170], [900, 8, 190], [980, 7, 210]] },   // [y, count, spacing]
  garage: { wide: [1800, 560, .7], elevator: [ELEV_X, 600, 1.2] },
  subway: { wide: [1500, 560, .75] },
  platform: { wide: [1500, 560, .7], line: [900, 9, 180] },
  laserHall: { wide: [960, 560, .72] }
};
