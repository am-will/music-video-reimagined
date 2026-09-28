// counter.js: THE VIEW COUNTER (the film's signature motion graphic) and the GLITCH post-effect.
//
// The dance is contagious and the counter tracks it: one number, continuous across the whole film. It climbs to
// 2,147,483,647 (the largest signed 32-bit integer), overflows to -2,147,483,648 (red, glitching), and is rebooted as
// a 64-bit counter that climbs toward 9,223,372,036,854,775,807... (A true story: this song's video was the first to
// break a 32-bit view counter, which had to be upgraded to 64-bit.)
//
//   VIEWCOUNT(t)             { str (digits, no sign), neg, bits (32|64), red 0..1, rate (log10 units per second) }
//   viewCounter(t, o)      draws the counter. o.x, o.y (its CENTRE, screen px unless o.world), o.h (panel height px,
//                          default 64 = the corner HUD), o.world true = draw in world space (inside a camera: a
//                          billboard), o.alpha, o.pop (0..1 extra bounce), o.glitch (0..1), o.label (default true)
//   counterHUD(t, o)       the standard corner HUD (top right), with a bounce on each milestone. Call it LAST in a shot
//                          (after camEnd, before transitions) in every shot where the counter is visible.
//   GLITCH                 set GLITCH = k (0..1) during a frame: the composite then slices, shifts and colour-splits
//                          the finished frame (deterministic per frame). Reset to 0 every frame automatically.
//   MILESTONES             [[t, label], ...] the moments the counter hits a big number (for staging celebrations)

// ---------- the count ----------
// keyframes: [t, value] with value a Number (small) or a digit string (exact big values). Between keys the count
// interpolates in log space (so it accelerates like a viral curve); between two exact strings less than 10^6 apart it
// steps exactly (BigInt).
const T_OVF = 195.54, T_BOOT = barT(106), T_TAIL1 = 223.6, T_TAIL2 = 225.35;   // overflow, 64-bit reboot, the tail's ticks
const _VK = [
  [0, 0], [9.28, 0], [9.45, 1], [10.4, 3], [11.5, 7], [12.9, 20], [14.7, 45], [16.55, 80],   // the Kid's dance = the first view
  [31.09, 1500], [52.9, 60000], [65.6, 850000], [67.06, 1000000],                       // 1 MILLION at the explosion (the breath)
  [69.27, 1300000], [83.82, 25000000], [98.36, 90000000], [112.9, 260000000], [134.73, 720000000],
  [147.45, 999999990], [148.87, 999999999],                                              // stuck on 999,999,999 through the breath...
  [151.09, 1000000000],                                                                  // ...1 BILLION on the drop
  [165.64, 1500000000], [180.18, 2000000000], [186.0, 2140000000], [190.0, 2147480000], [192.5, 2147483600], [193.8, 2147483640]
];
// the last seven views, one per eighth note (the tension ticks), then OVERFLOW
for (let k = 1; k <= 7; k++) _VK.push([193.8 + k * EIGHTH, 2147483640 + k]);
const MILESTONES = [[9.45, 'first view'], [67.06, '1,000,000'], [151.09, '1,000,000,000'], [195.39, '2,147,483,647'], [T_OVF, 'overflow'], [T_BOOT, '64-bit reboot']];
const _BIG = [   // after the reboot: 64-bit, exact strings where it matters
  [T_BOOT, '2147483648'], [214.73, '9223372036854775000'], [220.18, '9223372036854775806'], [T_TAIL1 - .01, '9223372036854775806'], [T_TAIL1, '9223372036854775807']
];
const _log = v => Math.log10(Math.max(0, v) + 1);
function _interpLog(a, b, k) { const la = _log(a), lb = _log(b); return Math.pow(10, lerp(la, lb, k)) - 1; }
function VIEWCOUNT(t) {
  if (t >= T_TAIL2) return { str: '9223372036854775808', neg: true, bits: 64, red: 1, rate: 0 };
  if (t >= T_BOOT) {
    let i = 0; while (i + 1 < _BIG.length && t >= _BIG[i + 1][0]) i++;
    const [t0, s0] = _BIG[i], nx = _BIG[i + 1];
    if (!nx) return { str: s0, neg: false, bits: 64, red: 0, rate: 0 };
    const [t1, s1] = nx, k = clamp((t - t0) / (t1 - t0));
    const A = BigInt(s0), B = BigInt(s1);
    if (B - A < 1000000n) { const v = A + BigInt(Math.floor(Number(B - A) * ease(k))); return { str: v.toString(), neg: false, bits: 64, red: 0, rate: 0 }; }
    // huge jump: log interpolation; the digits below float precision are filled with fast-spinning noise
    const la = Math.log10(Number(A)), lb = Math.log10(Number(B)), l = lerp(la, lb, easeInOutQuad(k)), v = Math.pow(10, l);
    let str = BigInt(Math.floor(v)).toString();
    const noisy = Math.max(0, str.length - 15), f = Math.floor(t * 24);
    if (noisy) str = str.slice(0, str.length - noisy) + Array.from({ length: noisy }, (_, j) => String(Math.floor(hash(f * 13.1 + j * 7.7) * 10))).join('');
    return { str, neg: false, bits: 64, red: 0, rate: (lb - la) / (t1 - t0) };
  }
  if (t >= T_OVF) return { str: '2147483648', neg: true, bits: 32, red: 1, rate: 0 };
  let i = 0; while (i + 1 < _VK.length && t >= _VK[i + 1][0]) i++;
  const [t0, v0] = _VK[i], nx = _VK[i + 1];
  if (!nx) return { str: String(Math.floor(v0)), neg: false, bits: 32, red: 0, rate: 0 };
  const [t1, v1] = nx, k = clamp((t - t0) / (t1 - t0));
  const v = v1 - v0 <= 1 ? (k >= 1 ? v1 : v0) : _interpLog(v0, v1, k);
  return { str: String(Math.floor(v)), neg: false, bits: 32, red: 0, rate: (_log(v1) - _log(v0)) / (t1 - t0), cont: v };
}
function easeInOutQuad(x) { x = clamp(x); return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
const groupDigits = s => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// ---------- drawing ----------
let _CG = null;
function _counterImage(t, o) {
  const V = VIEWCOUNT(t), txt = (V.neg ? '-' : '') + groupDigits(V.str), H_ = 120;
  const eyeW = 150, pad = 26, digitW = 64, commaW = 24;
  let tw = 0; for (const ch of txt) tw += ch === ',' ? commaW : ch === '-' ? 44 : digitW;
  const Wc = Math.ceil(eyeW + tw + pad * 2 + (o.label === false ? 0 : 0));
  if (!_CG || _CG.width < Wc + 40) { if (_CG) _CG.remove(); _CG = createGraphics(Math.max(2200, Wc + 40), H_ + 40); _CG.pixelDensity(1); }
  const c = _CG.drawingContext; c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, _CG.width, _CG.height);
  const red = V.red, ox = 20, oy = 20, f = Math.floor(t * 12), wob = i => (hash(f * 3.1 + i * 7.3) - .5) * 2.2;   // boil
  // the panel: a hand-inked rounded slab
  const panel = mixCol('#2A2238', '#6A1020', red), rim = mixCol('#F3E6C8', '#FF6A5A', red);
  c.beginPath(); const r = 30, x0 = ox, y0 = oy, x1 = ox + Wc, y1 = oy + H_;
  c.moveTo(x0 + r + wob(1), y0 + wob(2)); c.lineTo(x1 - r + wob(3), y0 + wob(4)); c.quadraticCurveTo(x1, y0, x1 + wob(5), y0 + r);
  c.lineTo(x1 + wob(6), y1 - r); c.quadraticCurveTo(x1, y1, x1 - r, y1 + wob(7)); c.lineTo(x0 + r, y1 + wob(8)); c.quadraticCurveTo(x0, y1, x0 + wob(9), y1 - r);
  c.lineTo(x0 + wob(10), y0 + r); c.quadraticCurveTo(x0, y0, x0 + r, y0); c.closePath();
  c.fillStyle = panel; c.fill(); c.lineWidth = 6; c.strokeStyle = rim; c.stroke();
  // the eye icon
  const ex = ox + 80, ey = oy + H_ / 2;
  c.beginPath(); c.moveTo(ex - 46, ey); c.quadraticCurveTo(ex, ey - 40 + wob(11), ex + 46, ey); c.quadraticCurveTo(ex, ey + 40 + wob(12), ex - 46, ey); c.closePath();
  c.fillStyle = '#FBF4E2'; c.fill(); c.lineWidth = 4; c.strokeStyle = '#1E1826'; c.stroke();
  c.beginPath(); c.arc(ex, ey, 17, 0, TAU); c.fillStyle = red > .5 ? '#E0283F' : '#D97757'; c.fill();
  c.beginPath(); c.arc(ex, ey, 8, 0, TAU); c.fillStyle = '#1E1826'; c.fill();
  c.beginPath(); c.arc(ex - 6, ey - 7, 4, 0, TAU); c.fillStyle = '#FFFFFF'; c.fill();
  // digits on little wheels; fast-changing low digits are motion-blurred
  let x = ox + eyeW, cont = V.cont, pos = V.str.length;
  c.font = `86px "Permanent Marker", cursive`; c.textAlign = 'center'; c.textBaseline = 'middle';
  for (const ch of txt) {
    if (ch === ',') { c.fillStyle = rim; c.fillText(',', x + commaW / 2, oy + H_ / 2 + 22); x += commaW; continue; }
    if (ch === '-') { c.fillStyle = '#FF5A4A'; c.fillText('-', x + 22, oy + H_ / 2 + 2); x += 44; continue; }
    pos--;   // this digit's place value 10^pos
    const cx = x + digitW / 2, cy = oy + H_ / 2 + 4;
    c.fillStyle = mixCol('#F7EEDA', '#FFD8D0', red); c.fillRect(x + 4, oy + 12, digitW - 8, H_ - 24);
    c.strokeStyle = '#1E1826'; c.lineWidth = 2; c.strokeRect(x + 4, oy + 12, digitW - 8, H_ - 24);
    const spinRate = V.rate ? Math.pow(10, Math.log10(Math.max(1, Number(V.str) || 1e18)) - pos) * V.rate * 2.3 : 0;   // wheel turns per second (approx)
    c.save(); c.beginPath(); c.rect(x + 4, oy + 12, digitW - 8, H_ - 24); c.clip();
    c.fillStyle = mixCol('#1E1826', '#B01020', red);
    if (spinRate > 14) {   // a blur of digits
      for (let k = -1; k <= 1; k++) { c.globalAlpha = .35; c.fillText(String(Math.floor(hash(Math.floor(t * 24) + pos * 11 + k) * 10)), cx, cy + k * 34); }
      c.globalAlpha = 1;
    } else {
      // the odometer roll: a wheel turns when every wheel below it is on 9 and turning
      let roll = 0;
      if (cont != null) { const p10 = Math.pow(10, pos), below = cont % p10; roll = pos === 0 ? cont % 1 : clamp(below - (p10 - 1)); }
      roll = ease(roll);
      c.fillText(ch, cx, cy - roll * 96);
      if (roll > .01) c.fillText(String((+ch + 1) % 10), cx, cy + 96 - roll * 96);
    }
    c.restore();
    x += digitW;
  }
  if (V.bits === 64) { c.font = `26px "Permanent Marker", cursive`; c.fillStyle = '#F2C94A'; c.textAlign = 'left'; c.fillText('64-BIT', ox + 26, oy + H_ - 14); }
  return { canvas: _CG, w: Wc + 40, h: H_ + 40 };
}
function viewCounter(t, o = {}) {
  const img = _counterImage(t, o), sc = (o.h || 64) / 120, pk = 1 + .25 * (o.pop || 0);
  const w = img.w * sc * pk, h = img.h * sc * pk;
  flushBrush();
  const draw = () => {
    push(); if (o.alpha != null) tint(255, 255 * clamp(o.alpha));
    if (o.rot) { translate(o.x, o.y); rotate(o.rot); image(img.canvas, -w / 2, -h / 2, w, h, 0, 0, img.w, img.h); }
    else image(img.canvas, o.x - w / 2, o.y - h / 2, w, h, 0, 0, img.w, img.h);
    noTint(); pop();
  };
  if (o.world) draw(); else screenDraw(draw);
  if (o.glitch) GLITCH = Math.max(GLITCH, o.glitch);
}
// the standard corner HUD: top-right, bouncing on milestones
function counterHUD(t, o = {}) {
  let bump = 0; for (const [mt] of MILESTONES) { const a = t - mt; if (a >= 0 && a < .6) bump = Math.max(bump, Math.exp(-a * 6) * Math.sin(a * 22 + .3)); }
  const V = VIEWCOUNT(t), approxW = (150 + 64 * V.str.length + 24 * Math.floor((V.str.length - 1) / 3) + 52 + 40) * ((o.h || 64) / 120);
  viewCounter(t, { x: W - 36 - approxW / 2, y: 58, h: 64, pop: bump, ...o });
}

// ---------- the glitch post-effect (applied in core.js composite()) ----------
let GLITCH = 0, _GC = null;
const _resetFx0 = resetFx;
resetFx = function () { _resetFx0(); GLITCH = 0; };
function postFx(c, t) {
  if (GLITCH <= .01) return;
  const k = clamp(GLITCH), f = Math.floor(t * 24);
  if (!_GC) { _GC = document.createElement('canvas'); _GC.width = W; _GC.height = H; }
  const g = _GC.getContext('2d'); g.globalCompositeOperation = 'copy'; g.drawImage(c.canvas, 0, 0); g.globalCompositeOperation = 'source-over';
  // shifted horizontal slices
  const n = Math.floor(4 + 18 * k);
  for (let i = 0; i < n; i++) {
    const y = Math.floor(hash(f * 7.1 + i * 3.3) * H), h = Math.floor(6 + hash(f * 2.3 + i) * 70 * k), dx = (hash(f * 5.7 + i * 9.1) - .5) * 260 * k;
    c.drawImage(_GC, 0, y, W, h, dx, y, W, h);
  }
  // colour split: red and cyan ghosts
  c.globalCompositeOperation = 'lighter'; c.globalAlpha = .28 * k;
  c.filter = 'sepia(1) saturate(8) hue-rotate(-50deg)'; c.drawImage(_GC, 10 * k, 0);
  c.filter = 'sepia(1) saturate(8) hue-rotate(150deg)'; c.drawImage(_GC, -10 * k, 0);
  c.filter = 'none'; c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
  // inverted blocks
  c.globalCompositeOperation = 'difference';
  for (let i = 0; i < Math.floor(5 * k); i++) { c.fillStyle = '#FFFFFF'; c.fillRect(hash(f * 1.9 + i) * W, hash(f * 4.4 + i) * H, 40 + 220 * hash(f + i * 2), 8 + 40 * hash(f * 3 + i)); }
  c.globalCompositeOperation = 'source-over';
  // scanlines
  c.globalAlpha = .18 * k; c.fillStyle = '#000000'; for (let y = f % 4; y < H; y += 4) c.fillRect(0, y, W, 1); c.globalAlpha = 1;
}

// ---------- the paper-blizzard wipe (a shared transition: c02 -> c03) ----------
// p 0 -> .5: scraps of paper blow in from the right and cover the frame; p .5 -> 1: they blow away to the left.
// Both sides of a seam call it with the same seed, so the covering frame is identical. Screen space; call it last.
function paperWipe(p, seed = 1) {
  if (p <= 0 || p >= 1) return;
  const cover = p < .5 ? easeOut(p * 2) : 1 - ease((p - .5) * 2), n = 70;
  flushBrush();
  screenDraw(() => {
    if (cover > .85) paint(rectPts(-40, -40, W + 80, H + 80), { wash: '#F4EEDF', washOp: 255 * clamp((cover - .85) / .15), ink: null });
    for (let i = 0; i < n; i++) {
      const h1 = hash(i * 3.7 + seed), h2 = hash(i * 5.9 + seed * 2), h3 = hash(i * 8.3 + seed * 3);
      const tx = h1 * (W + 300) - 150, ty = h2 * (H + 200) - 100;
      const x = p < .5 ? lerp(W + 400 + h3 * 500, tx, cover) : lerp(tx, -600 - h3 * 500, 1 - cover), y = ty + 40 * Math.sin(p * 9 + i);
      const w = 140 + 160 * h3, h = 100 + 120 * h1, r = (h2 - .5) * 1.4 + p * 3 * (h1 - .5);
      push(); translate(x, y); rotate(r); boilSeed('pw' + i);
      paint(rectPts(-w / 2, -h / 2, w, h, 3), { wash: ['#F8F3E6', '#F1EAD8', '#FBF8F0', '#EDE4D0'][i % 4], ink: PAL.ink, sw: .6 });
      if (i % 3 === 0) for (let k = 0; k < 4; k++) inkLine([[-w * .35, -h * .3 + k * h * .18], [w * .35, -h * .3 + k * h * .18]], .4, '#B8AE98', 'inkfine', 0);
      pop();
    }
  });
}
