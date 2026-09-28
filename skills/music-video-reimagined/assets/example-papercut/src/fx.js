// fx.js: the papercut machinery and the other effects this video needs.
//
// LAYERS: paint a complete alternate world, then show it through holes in the paper.
//   paintLayer(name, fn)          call at the START of a shot (outside any camera), before painting the main world:
//                                 paints fn() as a full frame on clean paper, keeps it, and hands back clean paper.
//   showLayer(name, polys, o)     composites the kept frame through the union of polys (SCREEN space) onto whatever
//                                 is painted so far; anything painted afterwards goes on top. o.feather (px blur of
//                                 the hole's edge), o.alpha, o.invert (show it everywhere EXCEPT the polys).
//   toScreenPts(pts)              world points -> screen points through the active camera (or the last one).
// PAPERCUTS:
//   slitPts(a, b, w, n)           a lens-shaped slit from a to b, w = half-width at the middle (world or screen)
//   slitEdges(a, b, w, o)         paints the cut paper's lips (cream fibre edge + a shadow) around a slit
//   tearLine(p0, p1, seed, rough) a jagged torn-paper line (deterministic)
//   tearEdge(line, o)             paints a torn edge along a line (fibres on the paper side, a dark lip)
//   sidePoly(line, corners)       closes a tear line into a polygon through the given corner points
// LIGHT AND SHADOW:
//   castShadow(polys, o)          a soft multiply shadow (SCREEN space polys): o.alpha, o.blur, o.col
//   flick(t, seed, rate)          a lamp's brightness 0..1 with deterministic flicker (rate 0..1 = how troubled)
// MARKS:
//   screamRings(x, y, age, s, o)  rings of cream brush strokes radiating from a scream
//   confetti(t, t0, o)            shredded paper strips tumbling down (screen space)
//   chalkMark(kind, x, y, s, seed) chalk scribbles for the Ink Side: 'spiral' 'eye' 'tally' 'face' 'cross' 'arrow'
//   speedLines(cx, cy, r0, r1, n, col, seed)

const LAYERS = {};
let SHOW_POOL = [], SHOW_I = 0, MASKC = null;
function resetFx() { SHOW_I = 0; }
function _gfx() { const g = createGraphics(W, H); g.pixelDensity(1); return g; }
function screenDraw(fn) { push(); resetMatrix(); translate(-W / 2, -H / 2); fn(); pop(); }
function toScreenPts(pts, cam = CAM || LAST_CAM) { return pts.map(p => toScreen(p[0], p[1], cam)); }

function paintLayer(name, fn) {
  flushBrush();
  screenDraw(() => image(paperG, 0, 0));
  fn();
  if (CAM) camEnd();
  flushBrush();
  const g = LAYERS[name] || (LAYERS[name] = _gfx()), c = g.drawingContext;
  c.globalCompositeOperation = 'copy'; c.drawImage(drawingContext.canvas, 0, 0, W, H); c.globalCompositeOperation = 'source-over';
  screenDraw(() => image(paperG, 0, 0));
}
function _pathPolys(m, polys) {
  m.beginPath();
  for (const P of polys) { if (!P || P.length < 3) continue; m.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) m.lineTo(P[i][0], P[i][1]); m.closePath(); }
}
function showLayer(name, polys, o = {}) {
  const L = LAYERS[name]; if (!L) return;
  flushBrush();
  if (!MASKC) { MASKC = document.createElement('canvas'); MASKC.width = W; MASKC.height = H; }
  const m = MASKC.getContext('2d');
  m.setTransform(1, 0, 0, 1, 0, 0); m.globalCompositeOperation = 'source-over'; m.clearRect(0, 0, W, H);
  m.filter = o.feather ? `blur(${o.feather}px)` : 'none'; m.fillStyle = '#000';
  _pathPolys(m, polys);
  if (o.invert) { m.rect(-50, -50, W + 100, H + 100); m.fill('evenodd'); } else m.fill('nonzero');
  m.filter = 'none';
  const g = SHOW_POOL[SHOW_I] || (SHOW_POOL[SHOW_I] = _gfx()); SHOW_I++;
  const s = g.drawingContext;
  s.globalCompositeOperation = 'copy'; s.drawImage(L.drawingContext.canvas, 0, 0);
  s.globalCompositeOperation = 'destination-in'; s.drawImage(MASKC, 0, 0);
  s.globalCompositeOperation = 'source-over';
  screenDraw(() => { if (o.alpha != null && o.alpha < 1) tint(255, 255 * clamp(o.alpha)); image(g, 0, 0); noTint(); });
}
// A soft shadow: the union of polys (SCREEN space), blurred, multiplied over what's painted so far.
function castShadow(polys, o = {}) {
  if (!polys.length) return;
  flushBrush();
  const g = SHOW_POOL[SHOW_I] || (SHOW_POOL[SHOW_I] = _gfx()); SHOW_I++;
  const c = g.drawingContext;
  c.setTransform(1, 0, 0, 1, 0, 0); c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, W, H);
  c.filter = `blur(${o.blur ?? 4}px)`; c.fillStyle = o.col || '#3A2238';
  _pathPolys(c, polys); c.fill('nonzero'); c.filter = 'none';
  screenDraw(() => { blendMode(MULTIPLY); tint(255, 255 * clamp(o.alpha ?? .45)); image(g, 0, 0); noTint(); blendMode(BLEND); });
}

// ---------- papercuts ----------
function slitPts(a, b, w, n = 18) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, P = [];
  for (let i = 0; i <= n; i++) { const k = i / n, h = w * Math.pow(Math.sin(k * Math.PI), .8) * (1 + .12 * (hash(i * 3.1 + a[0]) - .5)); P.push([a[0] + dx * k + nx * h, a[1] + dy * k + ny * h]); }
  for (let i = n - 1; i > 0; i--) { const k = i / n, h = w * Math.pow(Math.sin(k * Math.PI), .8) * (1 + .12 * (hash(i * 5.7 + a[1]) - .5)); P.push([a[0] + dx * k - nx * h, a[1] + dy * k - ny * h]); }
  return P;
}
function slitEdges(a, b, w, o = {}) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, n = 16, top = [], bot = [];
  for (let i = 0; i <= n; i++) { const k = i / n, h = w * Math.pow(Math.sin(k * Math.PI), .8); top.push([a[0] + dx * k + nx * h, a[1] + dy * k + ny * h]); bot.push([a[0] + dx * k - nx * h, a[1] + dy * k - ny * h]); }
  const sw = o.sw ?? 1.2;
  inkLine(top, sw * 1.6, o.lip || '#FFF6E0', 'inkfine', .4);        // the cut fibre edge catches light
  inkLine(bot, sw * 1.2, o.lip || '#FFF6E0', 'inkfine', .4);
  inkLine(top.map(([x, y]) => [x + nx * sw * 2.5, y + ny * sw * 2.5]), sw * .8, o.shade || '#7A5A48', 'inkfine', .4);
  inkLine(bot.map(([x, y]) => [x - nx * sw * 2.5, y - ny * sw * 2.5]), sw * .8, o.shade || '#7A5A48', 'inkfine', .4);
}
function tearLine(p0, p1, seed = 1, rough = 18, n = 40) {
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, P = [];
  for (let i = 0; i <= n; i++) {
    const k = i / n, big = Math.sin(k * 7 + seed) * .6 + Math.sin(k * 17 + seed * 2) * .3, fine = (hash(i * 13.7 + seed * 91) - .5) * 1.4;
    const off = (i === 0 || i === n) ? 0 : rough * (big + fine * .6);
    P.push([p0[0] + dx * k + nx * off, p0[1] + dy * k + ny * off]);
  }
  return P;
}
function sidePoly(line, corners) { return line.concat(corners); }
function tearEdge(line, o = {}) {
  const sw = o.sw ?? 1.4;
  inkLine(line, sw * 2.4, o.fibre || '#FFF8E6', 'dry', .2);
  inkLine(line, sw * .9, o.lip || '#F7EBD2', 'inkfine', .2);
  if (o.shadow !== false) inkLine(line.map(([x, y]) => [x + (o.sx ?? 4), y + (o.sy ?? 5)]), sw * 1.4, o.shade || '#1A1424', 'inkfine', .2);
}

// ---------- light ----------
// Deterministic flicker: mostly 1, with stutters. rate 0..1 = how troubled the lamp is.
function flick(t, seed = 0, rate = .3) {
  if (rate <= 0) return 1;
  const f = Math.floor(t * 24), h = hash(f * 1.31 + seed * 17.7), g = hash(Math.floor(t * 3) * 7.1 + seed * 3.3);
  if (g < rate * .5 && h < .55) return .15 + .3 * hash(f + seed);
  return 1 - .08 * rate * hash(f * .7 + seed);
}

// ---------- marks ----------
function screamRings(x, y, age, s = 1, o = {}) {
  if (age < 0) return;
  const n = o.n ?? 4, life = o.life ?? 1.2, col = o.col || PAL.cream;
  for (let i = 0; i < n; i++) {
    const a = age - i * (o.gap ?? .16); if (a < 0 || a > life) continue;
    const r = (60 + 900 * easeOut(a / life)) * s, P = [], fade = 1 - a / life;
    const arc = o.arc ?? [-.9, .9], dir = o.dir ?? -Math.PI / 2;
    for (let k = 0; k <= 16; k++) { const ang = dir + lerp(arc[0], arc[1], k / 16) * Math.PI / 2; P.push([x + Math.cos(ang) * r, y + Math.sin(ang) * r * (o.squash ?? .85)]); }
    boilSeed('ring' + i);
    inkLine(P, (3.5 * fade + .5) * s * (o.w ?? 1), col, 'dry', .6);
    inkLine(P, (1.2 * fade + .2) * s * (o.w ?? 1), col, 'ink', .6);
  }
}
function confetti(t, t0, o = {}) {
  const n = o.n ?? 60, age = t - t0; if (age < 0) return;
  const cols = o.cols || [PAL.cream, '#F4E3BC', '#E9D8B4', '#FFF8E6', PC.plaid, PAL.clay];
  for (let i = 0; i < n; i++) {
    const h1 = hash(i * 3.7 + 1), h2 = hash(i * 5.3 + 2), h3 = hash(i * 7.9 + 3), start = h3 * (o.spread ?? 1.2);
    const a = age - start; if (a < 0) continue;
    const x = h1 * (W + 200) - 100 + Math.sin(a * (1.5 + h2 * 2) + i) * 40, y = -60 + a * (140 + 160 * h2);
    if (y > H + 80) continue;
    const r = a * (3 + 5 * h1) + i, w = 10 + 16 * h2, hgt = 30 + 30 * h1, fl = Math.cos(r);
    push(); translate(x, y); rotate(r * .3 + h2 * 6); scale(1, Math.abs(fl) * .9 + .1);
    boilSeed('conf' + i);
    paint(rectPts(-w / 2, -hgt / 2, w, hgt, 1.5), { wash: cols[i % cols.length], ink: PAL.ink, sw: .45 });
    pop();
  }
}
function chalkMark(kind, x, y, s = 1, seed = 0, col = PC.chalk) {
  const sw = .9 * clamp(s, .4, 2), P = pts => pts.map(([a, b]) => [x + a * s, y + b * s]);
  switch (kind) {
    case 'spiral': { const sp = []; for (let i = 0; i < 26; i++) { const a = i * .55 + seed, r = 2 + i * 1.5; sp.push([Math.cos(a) * r, Math.sin(a) * r]); } inkLine(P(sp), sw, col, 'HB', .6); break; }
    case 'eye': {
      inkLine(P([[-26, 0], [-10, -12], [10, -12], [26, 0]]), sw, col, 'HB', .6); inkLine(P([[-26, 0], [-10, 12], [10, 12], [26, 0]]), sw, col, 'HB', .6);
      const pp = []; for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; pp.push([Math.cos(a) * 6, Math.sin(a) * 7]); } inkLine(P(pp.concat([pp[0]])), sw * 1.2, col, 'HB', .5); break;
    }
    case 'tally': for (let i = 0; i < 4; i++) inkLine(P([[i * 8 - 12, -16 + hash(i + seed) * 3], [i * 8 - 12 + 2, 16]]), sw, col, 'HB', 0); inkLine(P([[-18, 10], [18, -8]]), sw, col, 'HB', 0); break;
    case 'face': inkLine(P([[-22, -16], [22, -16], [22, 14], [-22, 14], [-22, -16]]), sw, col, 'HB', 0); for (const e of [-1, 1]) inkLine(P([[e * 9, -8], [e * 9, 2]]), sw * 1.3, col, 'HB', 0); inkLine(P([[-10, 8], [-5, 5], [0, 8], [5, 5], [10, 8]]), sw * .8, col, 'HB', 0); break;
    case 'cross': inkLine(P([[-14, -14], [14, 14]]), sw, col, 'HB', 0); inkLine(P([[14, -14], [-14, 14]]), sw, col, 'HB', 0); break;
    case 'arrow': inkLine(P([[-24, 6], [0, -2], [22, -8]]), sw, col, 'HB', .5); inkLine(P([[10, -16], [22, -8], [12, 2]]), sw, col, 'HB', 0); break;
  }
}
function speedLines(cx, cy, r0, r1, n, col = PAL.cream, seed = 0, sw = 1.2) {
  for (let i = 0; i < n; i++) {
    const a = (i + hash(i + seed) * .6) / n * TAU, ra = r0 * (.9 + .3 * hash(i * 3 + seed)), rb = r1 * (.8 + .4 * hash(i * 7 + seed));
    inkLine([[cx + Math.cos(a) * ra, cy + Math.sin(a) * ra], [cx + Math.cos(a) * rb, cy + Math.sin(a) * rb]], sw * (.5 + hash(i + 9)), col, 'dry', 0);
  }
}
