// sets.js: the Parlor (paper side), the Ink Side (the back of the paper), their furniture, and room lighting.
// All in WORLD coordinates: the wall runs from y 40 (under the crown moulding) to 800 (the skirting), the floor from
// 800 down. The furniture sits at fixed places (LAY) so every chapter stages the band in the same room.
//
//   parlor(t, o)       the whole room, in depth order, calling o.hooks at each depth:
//                        wall()   on the wallpaper (shadows, wall eyes, slits)   couch()  people sitting on the couch
//                        joe()    behind the desk                                 rob()    behind the drums
//                        floor()  people standing on the rug                     lit()    after the room lighting (glowing eyes)
//                        front()  foreground (also after the lighting)
//                      o.lamps: 0..1 lamp power (or {a, b, c, desk} per lamp); o.flicker 0..1; o.cold 0..1 (the
//                      light turns sickly); o.eyes(i, j) -> {open, lookX, lookY} for wallpaper eyes; o.portrait = the
//                      portrait's options (stage, lookX...); o.peel 0..1 (wallpaper peeling); o.ink 0..1 (ink pooling
//                      on the floor); o.breath (wall bulge, -1..1); o.dark 0..1 (room light off; lamps keep pools)
//                      o.spin (record angle), o.drums {kick, snare, hat, crash, tom}, o.swing (lamps swinging)
//   inkSide(t, o)      the mirrored room behind the paper, same hooks (wall, couch, floor, front)
//   roomLight(dark, lights, o)  darkness over the frame with pools of light cut out: lights = [[x, y, r, k], ...] world
//   LAY                where everything is

const LAY = {
  floorY: 800, wallTop: 40, railY: 600,
  doorsL: 250, desk: 760, deskTop: 668, lampDesk: 600, palm: 1040, drums: 1290, lampA: 1545,
  couch: 1935, seatY: 706, portrait: [1935, 318], lampB: 2360, statue: 2580, doorsR: 2900, sconces: [1180, 2700],
  // band marks (feet), for performance shots
  // Joe stands behind the desk and Rob sits behind the kit: draw both with noShadow (their feet are hidden)
  joe: [760, 684], rob: [1290, 694], brad: [1790, 712], phoenix: [2080, 712], mike: [1560, 968], chester: [2250, 972],
  mirror: 1800   // the Ink Side is the parlor mirrored about this x
};

// the visible world rectangle through the active camera (a little generous), for culling
function viewRect(m = 250) {
  const c = CAM || { cx: W / 2, cy: H / 2, zoom: 1, rot: 0 }, hw = W / 2 / c.zoom * (1 + Math.abs(c.rot)) + m, hh = H / 2 / c.zoom * (1 + Math.abs(c.rot)) + m;
  return [c.cx - hw, c.cy - hh, c.cx + hw, c.cy + hh];
}
const inView = (x0, x1, y0 = -1e9, y1 = 1e9) => { const [a, b, c, d] = viewRect(); return x1 > a && x0 < c && y1 > b && y0 < d; };

// ---------- the wallpaper: cream stripes with columns of ink spark-damask ----------
const WP = { col0: 75, dx: 150, row0: 125, dy: 124, rows: 4 };
function wallpaper(x0, x1, t, o = {}) {
  const [va, , vc] = viewRect(); x0 = Math.max(x0, va); x1 = Math.min(x1, vc); if (x1 <= x0) return;
  const S = o.style === 'ink', top = LAY.wallTop, bot = LAY.railY;
  boilSeed('wall base');
  paint(rectPts(x0 - 20, top - 10, x1 - x0 + 40, bot - top + 20), { wash: S ? PC.inkWall : PC.wall, ink: null });
  const i0 = Math.floor((x0 - WP.col0) / WP.dx) - 1, i1 = Math.ceil((x1 - WP.col0) / WP.dx) + 1;
  for (let i = i0; i <= i1; i++) {   // the darker stripes
    const cx = WP.col0 + i * WP.dx;
    boilSeed('stripe' + i);
    paint(rectPts(cx - 38, top, 76, bot - top), { wash: S ? PC.inkWall2 : PC.wall2, ink: null });
    if (!S) { inkLine([[cx - 40, top], [cx - 40, bot]], .35, '#C9B089', 'inkfine', 0); inkLine([[cx + 40, top], [cx + 40, bot]], .35, '#C9B089', 'inkfine', 0); }
    for (let j = 0; j < WP.rows; j++) {
      const cy = WP.row0 + j * WP.dy, e = o.eyes ? o.eyes(i, j) : null, open = e ? clamp(typeof e === 'number' ? e : e.open) : 0;
      boilSeed('motif' + i + '_' + j);
      damask(cx, cy, S, open, e);
    }
  }
}
// one damask motif: a stylised Claude spark with curled tips. open > 0 turns it into a watching eye.
function damask(cx, cy, S, open = 0, e = null) {
  const c = S ? PC.chalkDim : PC.damask;
  if (open < .98) {
    paint(starPts(cx, cy, 34, .22, 4, -Math.PI / 2), { wash: c, washOp: S ? 150 : 215, ink: null });
    paint(starPts(cx, cy, 20, .3, 4, -Math.PI / 4), { wash: c, washOp: S ? 150 : 215, ink: null });
    for (const [dx, dy] of [[0, -46], [0, 46]]) paint(ellPts(cx + dx, cy + dy, 4.5, 4.5, 8), { wash: c, washOp: S ? 150 : 215, ink: null });
    for (const s of [-1, 1]) inkLine([[cx + s * 14, cy - 14], [cx + s * 22, cy - 22], [cx + s * 26, cy - 17]], .5, c, 'inkfine', .6);
  }
  if (open > .02) {   // the eye: an almond of cream with a slit pupil, lashes where the rays were
    const h = 15 * easeOut(open), look = [(e && e.lookX || 0) * 9, (e && e.lookY || 0) * 4];
    const A = []; for (let k = 0; k <= 12; k++) { const a = k / 12 * Math.PI; A.push([cx - 27 * Math.cos(a), cy - h * Math.sin(a)]); }
    for (let k = 11; k > 0; k--) { const a = k / 12 * Math.PI; A.push([cx - 27 * Math.cos(a), cy + h * .85 * Math.sin(a)]); }
    paint(A, { wash: S ? '#E8F0C8' : '#F6EEDC', ink: PAL.ink, sw: .7 });
    if (h > 4) {
      paint(ellPts(cx + look[0], cy + look[1], 8.5, Math.min(h * .9, 11), 12), { wash: S ? '#B8D070' : '#7A5A2E', ink: null });
      paint(rectPts(cx + look[0] - 1.6, cy + look[1] - Math.min(h * .8, 9), 3.2, Math.min(h * 1.6, 18)), { wash: PAL.ink, ink: null });
    }
    for (let k = 0; k < 5; k++) { const a = Math.PI * (.2 + k * .15); inkLine([[cx - 25 * Math.cos(a), cy - h * Math.sin(a)], [cx - 33 * Math.cos(a), cy - (h + 9) * Math.sin(a)]], .5, PAL.ink, 'inkfine', 0); }
  }
}

// ---------- room structure ----------
function crown(x0, x1, S) {
  boilSeed('crown');
  paint(rectPts(x0 - 20, -400, x1 - x0 + 40, 400 + LAY.wallTop), { wash: S ? '#0E0B15' : '#3A2622', ink: null });
  paint(rectPts(x0 - 20, LAY.wallTop - 26, x1 - x0 + 40, 30), { wash: S ? PC.inkWall2 : '#6B4A36', bleed: .025, fill: S ? '#0E0B15' : '#3A2622', fillOp: 90, tex: .6, ink: null });
  inkLine([[x0 - 20, LAY.wallTop + 2], [x1 + 20, LAY.wallTop + 2]], 1, S ? PC.chalkDim : PAL.ink, 'ink', 0);
}
function wainscot(x0, x1, S) {
  const y0 = LAY.railY, y1 = LAY.floorY;
  boilSeed('wainscot');
  paint(rectPts(x0 - 20, y0, x1 - x0 + 40, y1 - y0), { wash: S ? '#1A1426' : PC.wains, fill: S ? '#0E0B15' : '#3E271F', fillOp: 90, bleed: .05, tex: .6, ink: null });
  paint(rectPts(x0 - 20, y0 - 6, x1 - x0 + 40, 20), { wash: S ? PC.inkWall2 : PC.rail, ink: S ? PC.chalkDim : PAL.ink, sw: .8 });
  const [va, , vc] = viewRect();
  for (let x = Math.floor((Math.max(x0, va) - 60) / 240) * 240 + 60; x < Math.min(x1, vc); x += 240) {
    boilSeed('panel' + x);
    paint(rectPts(x + 18, y0 + 38, 204, y1 - y0 - 70, 1.5), { wash: S ? '#221A31' : PC.wainsLt, ink: S ? PC.chalkDim : '#2E1D18', sw: .6 });
  }
  paint(rectPts(x0 - 20, y1 - 14, x1 - x0 + 40, 16), { wash: S ? '#0E0B15' : '#3A2622', ink: null });
}
function floorBoards(x0, x1, S, o = {}) {
  boilSeed('floor');
  paint(rectPts(x0 - 20, LAY.floorY, x1 - x0 + 40, 900), { wash: S ? '#120E1B' : PC.floor, fill: S ? '#0B0911' : PC.floorDk, fillOp: 110, bleed: .05, tex: .7, ink: null });
  for (let k = 1; k < 9; k++) { const y = LAY.floorY + k * k * 5 + k * 12; inkLine([[x0 - 20, y], [x1 + 20, y + 2]], .45, S ? '#2A2140' : PC.floorDk, 'inkfine', 0); }
}
// ink pooling across the floor and rug (k 0..1); parlor() paints it on top of the rug
function inkPool(k) {
  boilSeed('floor ink');
  const P = []; for (let i = 0; i < 28; i++) { const a = i / 28 * TAU, r = 1 + .18 * Math.sin(a * 3 + 1) + .1 * Math.sin(a * 7); P.push([1800 + Math.cos(a) * 900 * k * r, 900 + Math.sin(a) * 110 * k * r]); }
  paint(P, { wash: PC.inkBody, fill: PC.inkBodyLt, fillOp: 60, bleed: .1, tex: .6, ink: null, curv: .5 });
}
function rug(cx, cy, rx, ry, S) {
  boilSeed('rug');
  paint(ellPts(cx, cy, rx, ry, 40, 3), { wash: S ? '#1E1830' : PC.rug, fill: S ? '#0E0B15' : PC.rugDk, fillOp: 100, bleed: .12, tex: .9, border: .8, ink: null });
  for (let i = 0; i < 40; i++) { const a = i / 40 * TAU, x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry; inkLine([[x, y], [x + Math.cos(a) * 14, y + Math.sin(a) * 6 + 4]], .5, S ? '#3A2F52' : PC.rugDk, 'inkfine', 0); }
}
function doors(x, S) {
  if (!inView(x - 200, x + 200)) return;
  boilSeed('doors' + x);
  const w = 330, top = 210, y1 = LAY.floorY;
  paint(rectPts(x - w / 2 - 22, top - 26, w + 44, y1 - top + 26), { wash: S ? '#1A1426' : '#5A3A2E', ink: S ? PC.chalkDim : PAL.ink, sw: 1 });
  for (const s of [-1, 1]) {
    const dx = x + (s < 0 ? -w / 2 : 0);
    paint(rectPts(dx + 4, top, w / 2 - 8, y1 - top - 4), { wash: S ? '#221A31' : '#E4D3AE', bleed: .025, fill: S ? '#0E0B15' : '#C9B089', fillOp: 70, tex: .6, ink: S ? PC.chalkDim : PAL.ink, sw: .8 });
    for (const [py, ph] of [[top + 30, 230], [top + 290, 240]]) paint(rectPts(dx + 26, py, w / 2 - 52, ph, 1), { wash: S ? '#2A2140' : '#D8C49C', ink: S ? PC.chalkDim : '#6B4A36', sw: .6 });
    paint(ellPts(x + s * 22, 520, 8, 8, 10), { wash: S ? PC.chalkDim : PC.brass, ink: PAL.ink, sw: .5 });
  }
}
function sconce(x, y, k, S) {
  if (!inView(x - 80, x + 80)) return;
  boilSeed('sconce' + x);
  paint(rrPts(x - 16, y - 10, 32, 60, 10), { wash: S ? '#2A2140' : PC.brass, ink: S ? PC.chalkDim : PAL.ink, sw: .6 });
  for (let i = 0; i < 5; i++) inkLine([[x - 20 + i * 10, y + 50], [x - 20 + i * 10, y + 72 + 6 * (i % 2)]], .6, S ? PC.chalkDim : '#E8EEF4', 'inkfine', 0);
  if (k > .02 && !S) glow(x, y + 30, 120, '#FFD68A', .55 * k);
}

// ---------- lamps ----------
// (x, y) = the lamp's foot. s = scale. o.on 0..1, o.swing (radians, pivots at the shade top for the table lamp's
// jolts), o.cold 0..1. Table lamp ~200 px tall at s = 1, floor lamp ~560.
function lampShade(cx, top, w, h, k, S, cold) {
  const lit = mixCol(PC.shade, '#FFF3CF', k), c = S ? '#2A2140' : mixCol(lit, '#C9D9B0', cold * .6);
  paint([[cx - w * .32, top], [cx + w * .32, top], [cx + w * .5, top + h], [cx - w * .5, top + h]], { wash: c, fill: S ? '#0E0B15' : mixCol(PC.shadeDk, '#FFFFFF', k * .4), fillOp: 90, bleed: .1, tex: .6, ink: S ? PC.chalkDim : PAL.ink, sw: .8 });
  for (let i = 1; i < 7; i++) { const a = i / 7; inkLine([[cx - w * .32 + w * .64 * a, top + 3], [cx - w * .5 + w * a, top + h - 3]], .4, S ? PC.chalkDim : PC.shadeDk, 'inkfine', 0); }
}
function tableLamp(x, y, s = 1, o = {}) {
  if (!inView(x - 200 * s, x + 200 * s)) return;
  const S = o.style === 'ink', k = clamp(o.on ?? 1), cold = o.cold || 0;
  boilSeed('tlamp' + x);
  push(); translate(x, y); if (o.swing) { translate(0, -170 * s); rotate(o.swing); translate(0, 170 * s); }
  paint([[-34 * s, 0], [34 * s, 0], [22 * s, -18 * s], [26 * s, -60 * s], [12 * s, -92 * s], [-12 * s, -92 * s], [-26 * s, -60 * s], [-22 * s, -18 * s]], { wash: S ? '#1E1830' : '#E6ECF0', bleed: .025, fill: S ? '#0E0B15' : '#9AB0C0', fillOp: 90, tex: .7, ink: S ? PC.chalkDim : PAL.ink, sw: .7, curv: .4 });
  inkLine([[0, -92 * s], [0, -118 * s]], 1.4 * s, S ? PC.chalkDim : PC.brass, 'ink', 0);
  if (k > .02 && !S) glow(0, -150 * s, 260 * s, mixCol('#FFC766', '#D8F0A0', cold), .95 * k);
  lampShade(0, -190 * s, 150 * s, 80 * s, k, S, cold);
  pop();
}
function floorLamp(x, y, s = 1, o = {}) {
  if (!inView(x - 200 * s, x + 200 * s)) return;
  const S = o.style === 'ink', k = clamp(o.on ?? 1), cold = o.cold || 0;
  boilSeed('flamp' + x);
  push(); translate(x, y); if (o.swing) { translate(0, -500 * s); rotate(o.swing); translate(0, 500 * s); }
  paint(ellPts(0, -6 * s, 60 * s, 14 * s, 16), { wash: S ? '#1E1830' : PC.brass, ink: S ? PC.chalkDim : PAL.ink, sw: .7 });
  paint(rectPts(-5 * s, -470 * s, 10 * s, 466 * s), { wash: S ? '#2A2140' : PC.brass, bleed: .025, fill: S ? '#0E0B15' : PC.goldDk, fillOp: 70, ink: S ? PC.chalkDim : PAL.ink, sw: .6 });
  for (const yy of [-160, -320]) paint(ellPts(0, yy * s, 11 * s, 8 * s, 10), { wash: S ? '#2A2140' : PC.goldLt, ink: PAL.ink, sw: .5 });
  if (k > .02 && !S) glow(0, -500 * s, 330 * s, mixCol('#FFC766', '#D8F0A0', cold), .95 * k);
  lampShade(0, -560 * s, 190 * s, 110 * s, k, S, cold);
  pop();
}

// ---------- furniture ----------
function desk(x, y, s = 1, t = 0, o = {}) {   // (x, y) = centre of the desk's foot line; the top is at y - 132s
  if (!inView(x - 300 * s, x + 300 * s)) return;
  const S = o.style === 'ink', G = S ? '#221A31' : PC.gold, top = y - 132 * s;
  boilSeed('desk' + x);
  // turntables first (they sit on the top, behind the desk's front apron)
  for (const sd of [-1, 1]) {
    const tx = x + sd * 110 * s, ty = top - 16 * s;
    paint(rrPts(tx - 78 * s, ty - 22 * s, 156 * s, 30 * s, 6 * s), { wash: S ? '#1A1426' : '#2E2A33', ink: S ? PC.chalkDim : PAL.ink, sw: .7 });
    const rot = (o.spin ?? t * 3.4) * (sd < 0 ? 1 : 1.03);
    paint(ellPts(tx, ty - 22 * s, 64 * s, 14 * s, 20), { wash: S ? '#0B0911' : '#17141C', ink: S ? PC.chalkDim : PAL.ink, sw: .6 });
    paint(ellPts(tx, ty - 22 * s, 22 * s, 5 * s, 12), { wash: S ? '#3A2F52' : '#D8392F', ink: null });
    const gx = tx + Math.cos(rot) * 40 * s, gy = ty - 22 * s + Math.sin(rot) * 9 * s;
    inkLine([[tx + Math.cos(rot) * 26 * s, ty - 22 * s + Math.sin(rot) * 6 * s], [gx, gy]], .6, S ? PC.chalkDim : '#6A6474', 'inkfine', 0);
    const arm = o.arm?.[sd < 0 ? 0 : 1] ?? 1;   // tonearm: 0 = parked, 1 = on the record
    inkLine([[tx + 70 * s, ty - 28 * s], [tx + lerp(62, 30, arm) * s, ty - lerp(40, 24, arm) * s]], 1.3 * s, S ? PC.chalkDim : PC.silver, 'ink', 0);
  }
  paint(rrPts(x - 30 * s, top - 34 * s, 60 * s, 32 * s, 5 * s), { wash: S ? '#1A1426' : '#3A3440', ink: S ? PC.chalkDim : PAL.ink, sw: .6 });   // the mixer
  // the desk: a gilded Louis-style writing desk, cabriole legs
  paint(rectPts(x - 240 * s, top - 4 * s, 480 * s, 22 * s, 1), { wash: G, bleed: .025, fill: S ? '#0E0B15' : PC.goldDk, fillOp: 120, tex: .7, ink: S ? PC.chalkDim : PAL.ink, sw: .9 });
  paint([[x - 228 * s, top + 18 * s], [x + 228 * s, top + 18 * s], [x + 212 * s, top + 70 * s], [x + 60 * s, top + 84 * s], [x, top + 70 * s], [x - 60 * s, top + 84 * s], [x - 212 * s, top + 70 * s]], { wash: S ? '#2A2140' : PC.oxblood, bleed: .025, fill: S ? '#0E0B15' : PC.oxbloodDk, fillOp: 110, tex: .7, ink: S ? PC.chalkDim : PAL.ink, sw: .8, curv: .2 });
  paint(starPts(x, top + 50 * s, 16 * s, .3, 4), { wash: S ? PC.chalkDim : PC.goldLt, ink: null });
  for (const sd of [-1, 1]) paint(ribbon([[x + sd * 205 * s, top + 60 * s], [x + sd * 222 * s, top + 100 * s], [x + sd * 196 * s, y - 20 * s], [x + sd * 214 * s, y]], 18 * s, 9 * s), { wash: G, bleed: .025, fill: S ? '#0E0B15' : PC.goldDk, fillOp: 100, ink: S ? PC.chalkDim : PAL.ink, sw: .7 });
}
// o.part: 'back' = only the cymbals (drawn behind the drummer), 'front' = only the drums; default = the whole kit
function drumKit(x, y, s = 1, t = 0, o = {}) {   // (x, y) = floor point under the kick drum
  if (!inView(x - 320 * s, x + 320 * s)) return;
  const back = o.part !== 'front', front = o.part !== 'back';
  const S = o.style === 'ink', h = o.hits || {}, shell = S ? '#221A31' : '#7A2A2E', hoop = S ? PC.chalkDim : PC.brass;
  boilSeed('drums' + x);
  const cym = (cx, cy, r, k, tilt) => {   // a cymbal on a stand, wobbling after a hit
    inkLine([[cx, cy], [cx + 4 * s, y]], 1 * s, S ? PC.chalkDim : '#8A8FA0', 'inkfine', 0);
    push(); translate(cx, cy); rotate(tilt + .25 * k * Math.sin(t * 40));
    paint(ellPts(0, 0, r, r * .22, 18), { wash: S ? '#2A2140' : '#D8A63A', bleed: .025, fill: S ? '#0E0B15' : '#9A7428', fillOp: 90, tex: .6, ink: S ? PC.chalkDim : PAL.ink, sw: .6 });
    pop();
  };
  if (back) {
    cym(x - 200 * s, y - 250 * s, 70 * s, h.hat || 0, .08);        // hi-hat
    cym(x + 210 * s, y - 330 * s, 95 * s, h.crash || 0, -.15);     // crash
  }
  if (!front) return;
  // floor tom (right) and snare (left)
  for (const [cx, cy, r, hh, k] of [[x + 170 * s, y - 130 * s, 70 * s, 110 * s, h.tom || 0], [x - 170 * s, y - 180 * s, 64 * s, 60 * s, h.snare || 0]]) {
    paint(rectPts(cx - r, cy, 2 * r, hh), { wash: shell, bleed: .025, fill: S ? '#0E0B15' : PC.oxbloodDk, fillOp: 90, ink: S ? PC.chalkDim : PAL.ink, sw: .7 });
    paint(ellPts(cx, cy, r * (1 + .03 * k), r * .28, 18), { wash: S ? '#3A2F52' : '#EFE6D2', ink: S ? PC.chalkDim : PAL.ink, sw: .7 });
    inkLine([[cx - r, cy + hh], [cx - r * .8, y]], .8, hoop, 'inkfine', 0); inkLine([[cx + r, cy + hh], [cx + r * .8, y]], .8, hoop, 'inkfine', 0);
  }
  // the kick drum: a cream head with a painted Claude spark, facing us
  const kr = 140 * s * (1 + .04 * (h.kick || 0));
  paint(ellPts(x, y - kr, kr, kr, 30), { wash: S ? '#1E1830' : '#F1E6CE', fill: S ? '#0E0B15' : '#D9C49C', fillOp: 90, bleed: .1, tex: .6, ink: S ? PC.chalkDim : PAL.ink, sw: 1 });
  brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', hoop, 2.4 * s);
  brush.beginShape(0); for (const p of ellPts(x, y - kr, kr, kr, 30)) brush.vertex(p[0], p[1]); brush.endShape(true);
  paint(starPts(x, y - kr, kr * .55, .18, 4, -Math.PI / 2), { wash: S ? PC.chalkDim : PAL.clay, ink: null });
  paint(starPts(x, y - kr, kr * .36, .22, 4, -Math.PI / 4), { wash: S ? PC.chalkDim : PAL.clay, ink: null });
}
function couchBack(x, y, s = 1, o = {}) {   // (x, y) = centre of the seat front edge at floor level; seat top ~ y - 94s
  if (!inView(x - 420 * s, x + 420 * s)) return;
  const S = o.style === 'ink', c = S ? '#1E1830' : PC.oxblood;
  boilSeed('couch back' + x);
  paint(rrPts(x - 360 * s, y - 250 * s, 720 * s, 170 * s, 40 * s), { wash: c, ink: S ? PC.chalkDim : PAL.ink, sw: 1 });
  paint(rrPts(x - 340 * s, y - 150 * s, 680 * s, 60 * s, 20 * s), { wash: S ? '#150F20' : mixCol(c, PC.oxbloodDk, .55), washOp: 200, ink: null });
  for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) {   // the tufting: buttons in a diamond grid
    const bx = x - 300 * s + i * 75 * s + (r ? 37 * s : 0), by = y - 215 * s + r * 55 * s;
    if (bx > x + 330 * s) continue;
    paint(ellPts(bx, by, 5 * s, 4 * s, 8), { wash: S ? PC.chalkDim : PC.oxbloodDk, ink: null });
    if (!S) { inkLine([[bx, by], [bx + 37 * s, by + 27 * s]], .35, PC.oxbloodDk, 'inkfine', 0); inkLine([[bx, by], [bx - 37 * s, by + 27 * s]], .35, PC.oxbloodDk, 'inkfine', 0); }
  }
  paint(rrPts(x - 350 * s, y - 110 * s, 700 * s, 40 * s, 14 * s), { wash: S ? '#2A2140' : PC.oxbloodLt, ink: S ? PC.chalkDim : PAL.ink, sw: .8 });   // seat cushion
}
function couchFront(x, y, s = 1, o = {}) {
  if (!inView(x - 420 * s, x + 420 * s)) return;
  const S = o.style === 'ink', c = S ? '#1E1830' : PC.oxblood;
  boilSeed('couch front' + x);
  paint(rrPts(x - 350 * s, y - 80 * s, 700 * s, 70 * s, 10 * s), { wash: c, ink: S ? PC.chalkDim : PAL.ink, sw: .9 });
  paint(rrPts(x - 340 * s, y - 36 * s, 680 * s, 22 * s, 8 * s), { wash: S ? '#150F20' : mixCol(c, PC.oxbloodDk, .6), washOp: 200, ink: null });
  for (const sd of [-1, 1]) {   // rolled arms
    paint(rrPts(x + sd * 360 * s - 45 * s, y - 175 * s, 90 * s, 165 * s, 30 * s), { wash: c, ink: S ? PC.chalkDim : PAL.ink, sw: .9 });
    paint(rrPts(x + sd * 360 * s - 45 * s + (sd < 0 ? 8 * s : 42 * s), y - 150 * s, 40 * s, 132 * s, 14 * s), { wash: S ? '#150F20' : mixCol(c, PC.oxbloodDk, .5), washOp: 190, ink: null });
    paint(ellPts(x + sd * 360 * s, y - 170 * s, 50 * s, 26 * s, 16), { wash: S ? '#2A2140' : PC.oxbloodLt, ink: S ? PC.chalkDim : PAL.ink, sw: .7 });
  }
  for (const sd of [-1, 1]) paint(rectPts(x + sd * 330 * s - 8 * s, y - 12 * s, 16 * s, 12 * s), { wash: S ? PC.chalkDim : PC.goldDk, ink: null });
}
function statue(x, y, s = 1, t = 0, o = {}) {   // a bronze winged Clawd on a pedestal
  if (!inView(x - 200 * s, x + 200 * s)) return;
  const S = o.style === 'ink';
  boilSeed('statue');
  paint(rectPts(x - 60 * s, y - 300 * s, 120 * s, 300 * s, 1), { wash: S ? '#1E1830' : '#CFC3A8', bleed: .025, fill: S ? '#0E0B15' : '#A89A7C', fillOp: 90, tex: .6, ink: S ? PC.chalkDim : PAL.ink, sw: .8 });
  paint(rectPts(x - 72 * s, y - 318 * s, 144 * s, 22 * s), { wash: S ? '#2A2140' : '#DCD2BA', ink: S ? PC.chalkDim : PAL.ink, sw: .7 });
  for (const sd of [-1, 1]) {   // wings
    const Wg = []; for (let i = 0; i <= 6; i++) { const k = i / 6; Wg.push([x + sd * (20 + 120 * k) * s, y - (360 + 130 * Math.sin(k * 2.2)) * s + (i % 2) * 14 * s]); }
    Wg.push([x + sd * 90 * s, y - 360 * s], [x + sd * 20 * s, y - 350 * s]);
    paint(Wg, { wash: S ? '#221A31' : PC.bronze, bleed: .025, fill: S ? '#0E0B15' : '#4A3420', fillOp: 90, tex: .6, ink: S ? PC.chalkDim : PAL.ink, sw: .6 });
  }
  clawd(x, y - 318 * s, 9 * s, { col: S ? '#2A2140' : PC.bronzeLt, dk: S ? '#150F20' : PC.bronze, lt: S ? '#3A2F52' : '#D8B070', eyes: S ? 'glow' : 'closed', noShadow: true, aL: .6, aR: .6, boilKey: 'statue', inkCol: S ? PC.chalkDim : PAL.ink });
}
function palm(x, y, s = 1, t = 0, o = {}) {
  if (!inView(x - 250 * s, x + 250 * s)) return;
  const S = o.style === 'ink';
  boilSeed('palm');
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI / 2 + (i - 3) * .42 + .04 * Math.sin(t * 1.3 + i), L = (210 + 40 * hash(i)) * s, bend = (i - 3) * .12;
    const P = []; for (let k = 0; k <= 6; k++) { const q = k / 6, aa = a + bend * q * 2; P.push([x + Math.cos(aa) * L * q, y - 120 * s + Math.sin(aa) * L * q + 30 * s * q * q]); }
    paint(ribbon(P, 10 * s, 26 * s), { wash: S ? '#1E2A2A' : '#4E7A48', bleed: .025, fill: S ? '#0E0B15' : '#2E5230', fillOp: 90, ink: S ? PC.chalkDim : PAL.ink, sw: .5 });
  }
  paint([[x - 55 * s, y - 130 * s], [x + 55 * s, y - 130 * s], [x + 40 * s, y], [x - 40 * s, y]], { wash: S ? '#221A31' : '#B86A48', bleed: .025, fill: S ? '#0E0B15' : '#7A3A28', fillOp: 90, tex: .6, ink: S ? PC.chalkDim : PAL.ink, sw: .8 });
}

// ---------- the Parlor ----------
function parlor(t, o = {}) {
  const H_ = o.hooks || {}, S = false, lamps = typeof o.lamps === 'object' ? o.lamps : { a: o.lamps ?? 1, b: o.lamps ?? 1, desk: o.lamps ?? 1, sconce: o.lamps ?? 1 };
  const fl = o.flicker || 0, cold = o.cold || 0, sw = o.swing || 0;
  const lp = k => clamp(k) * (fl ? 1 : 1);
  const kA = lp(lamps.a ?? 1) * flick(t, 1, fl), kB = lp(lamps.b ?? 1) * flick(t, 2, fl), kD = lp(lamps.desk ?? 1) * flick(t, 3, fl), kS = lp(lamps.sconce ?? 1) * flick(t, 4, fl);
  const x0 = -500, x1 = 3700;
  push();
  if (o.breath) { const b = o.breath; translate(1800, 420); scale(1 + .025 * b, 1 - .015 * b); translate(-1800, -420); }
  wallpaper(x0, x1, t, { eyes: o.eyes });
  // warm pools of lamplight on the wall (paint, under everything on it)
  boilSeed('wall light');
  for (const [lx, ly, r, k] of [[LAY.lampA, 300, 420, kA], [LAY.lampB, 300, 420, kB], [LAY.lampDesk, 500, 300, kD]]) if (k > .05 && inView(lx - r, lx + r)) paint(ellPts(lx, ly, r, r * .8, 26), { fill: mixCol('#FFE8B0', '#E0F0B8', cold), fillOp: 90 * k, bleed: .3, tex: .3, ink: null });
  if (o.peel) peelStrips(t, o.peel);
  wainscot(x0, x1, S);
  pop();
  crown(x0, x1, S);
  doors(LAY.doorsL, S); doors(LAY.doorsR, S);
  for (const sx of LAY.sconces) sconce(sx, 280, kS, S);
  if (H_.wall) H_.wall();
  portrait(LAY.portrait[0], LAY.portrait[1], 1, t, o.portrait || {});
  floorBoards(x0, x1, S);
  rug(1850, 935, 980, 150, S);
  if (o.ink > .01) inkPool(o.ink);
  palm(LAY.palm, LAY.floorY + 4, 1, t);
  statue(LAY.statue, LAY.floorY + 6, 1, t);
  floorLamp(LAY.lampA, LAY.floorY - 10, 1, { on: kA, cold, swing: sw * Math.sin(t * 2.6) });
  floorLamp(LAY.lampB, LAY.floorY - 10, 1, { on: kB, cold, swing: -sw * Math.sin(t * 2.3 + 1) });
  if (H_.behind) H_.behind();
  couchBack(LAY.couch, LAY.seatY + 96, 1);
  if (H_.couch) H_.couch();
  couchFront(LAY.couch, LAY.seatY + 96, 1);
  if (H_.joe) H_.joe();
  desk(LAY.desk, LAY.floorY, 1, t, { spin: o.spin, arm: o.arm });
  tableLamp(LAY.lampDesk, LAY.deskTop - 20, .8, { on: kD, cold, swing: sw * .5 * Math.sin(t * 3.1) });
  drumKit(LAY.drums, LAY.floorY + 60, .72, t, { hits: o.drums, part: 'back' });   // cymbals behind Rob, so his arms and sticks show
  if (H_.rob) H_.rob();
  drumKit(LAY.drums, LAY.floorY + 60, .72, t, { hits: o.drums, part: 'front' });
  if (H_.floor) H_.floor();
  // lamplight falloff: the room is dim away from the lamps (o.ambient), o.dark adds darkness (a blackout at 1)
  const amb = clamp((o.ambient ?? .22) + (o.dark || 0));
  if (amb > .01) roomLight(amb, [[LAY.lampA, 290, 760, kA], [LAY.lampB, 290, 760, kB], [LAY.lampDesk, 520, 520, kD], [LAY.sconces[0], 330, 300, kS * .7], [LAY.sconces[1], 330, 300, kS * .7], ...(o.lights || [])], { col: o.darkCol });
  if (H_.lit) H_.lit();     // after the lighting: things that shine in the dark (eyes, glows)
  if (H_.front) H_.front();
  return { kA, kB, kD, kS };
}
// peeling wallpaper: long strips curling down from the ceiling, black ink behind them (p 0..1)
function peelStrips(t, p) {
  for (let i = 0; i < 16; i++) {
    const x = -200 + i * 260 + 60 * hash(i + 4), k = clamp(p * 1.6 - hash(i + 11) * .6); if (k <= .02 || !inView(x - 150, x + 150)) continue;
    const len = 520 * k, w = 110 + 40 * hash(i);
    boilSeed('peel' + i);
    paint(rectPts(x, LAY.wallTop, w, len), { wash: PC.inkBg, ink: null });   // the dark behind
    const curl = [[x, LAY.wallTop + len], [x + w, LAY.wallTop + len], [x + w + 18, LAY.wallTop + len + 60 * k], [x + w * .5, LAY.wallTop + len + 110 * k], [x - 10, LAY.wallTop + len + 70 * k]];
    paint(curl, { wash: '#F4E6C6', bleed: .025, fill: '#C9B089', fillOp: 90, ink: PAL.ink, sw: .7, curv: .5 });
    for (let d = 0; d < 3; d++) { const dx = x + 20 + d * 30, dl = (40 + 80 * hash(i * 3 + d)) * k; inkLine([[dx, LAY.wallTop + 10], [dx + 2, LAY.wallTop + len * .6 + dl]], 1.2, PC.inkDrip, 'ink', 0); }
  }
}

// ---------- the Ink Side: the parlor mirrored and inverted ----------
function inkSide(t, o = {}) {
  const H_ = o.hooks || {}, S = true, m = x => 2 * LAY.mirror - x, x0 = -500, x1 = 3700;
  boilSeed('ink bg');
  paint(rectPts(x0 - 100, -500, x1 - x0 + 200, 2200), { wash: PC.inkBg, ink: null });
  crown(x0, x1, S);
  wallpaper(x0, x1, t, { style: 'ink', eyes: o.eyes });
  boilSeed('ink mold');
  for (let i = 0; i < 7; i++) { const x = -200 + i * 600 + 200 * hash(i + 2); if (inView(x - 300, x + 300)) paint(ellPts(x, 250 + 200 * hash(i), 260, 200, 20), { fill: PC.mold, fillOp: 70, bleed: .3, tex: .8, ink: null }); }
  // drips running down the walls, on slow clocks
  for (let i = 0; i < 40; i++) {
    const x = -300 + i * 105 + 40 * hash(i * 7), ph = frac(t * (.05 + .05 * hash(i)) + hash(i + 3)), len = 120 + 420 * ph * hash(i + 1);
    if (!inView(x - 20, x + 20)) continue;
    boilSeed('drip' + i);
    paint(ribbon([[x, LAY.wallTop], [x + 2, LAY.wallTop + len * .5], [x, LAY.wallTop + len]], 7 + 5 * hash(i + 5), 3), { wash: PC.inkDrip, ink: null });
  }
  // chalk scribbles on the walls
  const kinds = ['spiral', 'eye', 'tally', 'face', 'cross', 'arrow'];
  for (let i = 0; i < 22; i++) { const x = -300 + i * 190 + 60 * hash(i * 5), y = 120 + 380 * hash(i * 9 + 1); if (!inView(x - 60, x + 60)) continue; boilSeed('chalk' + i); chalkMark(kinds[i % 6], x, y, .9 + .6 * hash(i), i); }
  wainscot(x0, x1, S);
  doors(m(LAY.doorsL), S); doors(m(LAY.doorsR), S);
  if (H_.wall) H_.wall();
  boilSeed('ink chain');   // a hanging chain
  if (inView(700, 1000)) { const P = []; for (let k = 0; k <= 10; k++) P.push([860 + 10 * Math.sin(t * 1.2 + k * .6), -40 + k * 45]); for (let k = 0; k < 10; k++) paint(ellPts(P[k][0], P[k][1] + 20, 9, 16, 10), { ink: PC.chalkDim, sw: .9 }); }
  portrait(m(LAY.portrait[0]), LAY.portrait[1], 1, t, { stage: 'ink', ...(o.portrait || {}) });
  floorBoards(x0, x1, S);
  rug(2 * LAY.mirror - 1850, 935, 980, 150, S);
  palm(m(LAY.palm), LAY.floorY + 4, 1, t, { style: 'ink' });
  statue(m(LAY.statue), LAY.floorY + 6, 1, t, { style: 'ink' });
  floorLamp(m(LAY.lampA), LAY.floorY - 10, 1, { on: 0, style: 'ink' });
  floorLamp(m(LAY.lampB), LAY.floorY - 10, 1, { on: 0, style: 'ink' });
  if (H_.behind) H_.behind();
  couchBack(m(LAY.couch), LAY.seatY + 96, 1, { style: 'ink' });
  if (H_.couch) H_.couch();
  couchFront(m(LAY.couch), LAY.seatY + 96, 1, { style: 'ink' });
  if (H_.joe) H_.joe();
  desk(m(LAY.desk), LAY.floorY, 1, t, { style: 'ink', spin: -(o.spin ?? t * 3.4) });
  tableLamp(m(LAY.lampDesk), LAY.deskTop - 20, .8, { on: 0, style: 'ink' });
  drumKit(m(LAY.drums), LAY.floorY + 60, .8, t, { style: 'ink', hits: o.drums, part: 'back' });
  if (H_.rob) H_.rob();
  drumKit(m(LAY.drums), LAY.floorY + 60, .8, t, { style: 'ink', hits: o.drums, part: 'front' });
  if (H_.floor) H_.floor();
  if (H_.front) H_.front();
}

// ---------- lighting ----------
// Darkness over the frame (0 = none, 1 = black) with soft pools of light cut out. lights = [[x, y, r, k], ...] in
// WORLD coordinates through the active camera (call it inside the camera, or pass o.cam). o.col = the darkness colour.
let LIGHTC = null;
function roomLight(dark, lights = [], o = {}) {
  if (dark <= .01) return;
  flushBrush();
  const cam = o.cam || CAM || LAST_CAM, z = cam ? cam.zoom : 1;
  const g = SHOW_POOL[SHOW_I] || (SHOW_POOL[SHOW_I] = _gfx()); SHOW_I++;
  const c = g.drawingContext;
  c.setTransform(1, 0, 0, 1, 0, 0); c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, W, H);
  c.fillStyle = o.col || '#120E1C'; c.fillRect(0, 0, W, H);
  c.globalCompositeOperation = 'destination-out';
  for (const [x, y, r, k] of lights) {
    if (k <= 0) continue;
    const [sx, sy] = cam ? toScreen(x, y, cam) : [x, y], R = r * z, gr = c.createRadialGradient(sx, sy, 0, sx, sy, R);
    gr.addColorStop(0, `rgba(0,0,0,${clamp(k)})`); gr.addColorStop(.45, `rgba(0,0,0,${clamp(k) * .75})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = gr; c.fillRect(sx - R, sy - R, 2 * R, 2 * R);
  }
  c.globalCompositeOperation = 'source-over';
  screenDraw(() => { tint(255, 255 * clamp(dark)); image(g, 0, 0); noTint(); });
}
