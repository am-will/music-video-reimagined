// cast.js: every character in the film. Chapters draw characters ONLY through these functions, so they stay on model.
//
//   member(name, x, y, u, o)   a Clawd character. name: 'oppa' 'kid' 'rival' 'elev' 'pop' 'dancer' 'granny' 'grandpa'
//                              'boss' 'commuter' 'crowd'. o = any clawd() option (pose, face, dance(...)), plus:
//                                o.look  costume variant: oppa 'tux' (sky-blue tux, default) | 'black' | 'white' | 'party' | 'beach';
//                                o.v     variant index for the ensemble characters (dancer/granny/grandpa/commuter/crowd)
//   dancer(name, x, y, u, move|routine keys, t, o)   member() + the choreography (dance.js), with the character's hand and
//                              sleeve colours passed through so bent arms are dressed properly
//   mood(name, t, keys, o) / mfeel(name, emo, t, over)   emotions()/feel() that keep the character's own clay
//   horse(x, y, s, t, o)       the Horse (see below)
//   gear: roundShades(u, sw, F, style), sunVisor, lambTowel (usable in face/head hooks)
//
// Sizes: like Clawd (medium u 20-28, close-up 40-70, crowds 7-14). The Horse's s ~ u.

const GP = {   // the film's palette
  sky: '#9FD0EE', skyDk: '#6FA8D8', sand: '#EBD49A', sandDk: '#C9AE6E', grass: '#8CBF5A', grassDk: '#5E9A3E',
  tux: '#86BCE8', tuxDk: '#5A8FC4', lapel: '#26222E', shirt: '#F6F2EA', blackTux: '#2C2836', white: '#F3EFE6',
  maroon: '#8C2E3E', khaki: '#C9A86E', gold: '#E2B23A', tort: '#7A4A2A', tortLt: '#B07A48', lens: '#2A2233',
  yellow: '#F4D23A', yellowDk: '#C9A21E', lime: '#A8D24A', pink: '#F29AB8', rose: '#E88AA8', roseGold: '#E8A07A',
  horse: '#A45C33', horseDk: '#7A3F22', horseLt: '#C98A5E', mane: '#3A2218', hoof: '#2A2026', blaze: '#F4E6CE',
  neonG: '#6BFF8A', neonB: '#5AC8FF', neonP: '#FF6AD5', laser: '#7DFF6A'
};

const _Pp = (u, pts) => pts.map(([a, b]) => [a * u, b * u]);
const _faceX = (V, x) => V.face ? (V.face.cx + x * V.face.fw) : x;
// a band of clothing across the lower body (y0..y1 in u), wrapping the side face in 3/4 views
function band(u, V, J, y0, y1, colour, top = null) {
  const L = (V.L + .06) * u, R = (V.R - .06) * u, pts = [];
  for (let i = 0; i <= 8; i++) { const x = lerp(L, R, i / 8); pts.push([x, (top ? top(x / u) : y0) * u + jit(J * .3)]); }
  pts.push([R, y1 * u], [L, y1 * u]);
  paint(pts, { wash: colour, washOp: 255, fill: mixCol(colour, PAL.ink, .35), fillOp: 55, bleed: .03, tex: .7, border: .5, ink: null });
  if (V.strip) paint(rectPts(V.strip[0] * u, y0 * u - .3 * u, (V.strip[1] - V.strip[0]) * u, (y1 - y0) * u + .3 * u, J * .3), { fill: mixCol(colour, PAL.ink, .5), fillOp: 140, bleed: .02, tex: .6, border: .4, ink: null });
}
// a tuxedo/jacket front: jacket band, the shirt V, lapels, bow tie (or tie), buttons
function jacket(u, sw, V, J, col, o = {}) {
  band(u, V, J, -4.3, -2.02, col);
  if (!V.face) return;
  const cx = _faceX(V, 0), fw = V.face.fw;
  paint(_Pp(u, [[cx - 1.35 * fw, -4.3], [cx + 1.35 * fw, -4.3], [cx, -2.3]]), { wash: o.shirt || GP.shirt, ink: null });                // the shirt V
  if (o.lapel !== false) for (const s of [-1, 1]) paint(_Pp(u, [[cx + s * 1.35 * fw, -4.3], [cx + s * 2.05 * fw, -4.3], [cx + s * .35 * fw, -2.35], [cx + s * .1 * fw, -2.6]]), { wash: o.lapel || GP.lapel, ink: PAL.ink, sw: sw * .4 });
  if (o.tie === 'bow') { for (const s of [-1, 1]) paint(_Pp(u, [[cx, -3.95], [cx + s * .95 * fw, -4.35], [cx + s * .95 * fw, -3.5]]), { wash: o.tieCol || GP.lapel, ink: PAL.ink, sw: sw * .4 }); paint(ellPts(cx * u, -3.93 * u, .28 * u * fw, .28 * u, 8), { wash: o.tieCol || GP.lapel, ink: null }); }
  else if (o.tie === 'skinny') paint(_Pp(u, [[cx - .22 * fw, -4.2], [cx + .22 * fw, -4.2], [cx + .3 * fw, -2.6], [cx, -2.3], [cx - .3 * fw, -2.6]]), { wash: o.tieCol || PAL.ink, ink: null });
  if (o.buttons) for (const k of [-3.2, -2.6]) paint(ellPts((cx + .05) * u, k * u, .12 * u, .12 * u, 6), { wash: o.buttons, ink: null });
}

// ---------- hair and headwear (hat space: the head top is y -8u, x -5u..5u) ----------
const HAIRS = {
  // Oppa: glossy black hair slicked back with a side part and a little quiff
  slick(u, sw, V, C) {
    const P = [[-5.12, -7.25], [-5.1, -8.45], [-3.6, -9.05], [-1.6, -9.2], [-.9, -9.05], [.4, -9.5], [2.6, -9.75], [4.3, -9.3], [5.12, -8.5], [5.12, -7.35], [3.6, -7.75], [1.2, -7.8], [-1.6, -7.7]];
    paint(_Pp(u, P), { wash: C.base, washOp: 255, fill: '#3A3450', fillOp: 70, tex: .5, ink: C.ink, sw: sw * .7, curv: .35 });
    inkLine(_Pp(u, [[-1.55, -9.12], [-1.2, -8.35]]), sw * .5, '#8A86A0', 'inkfine', 0);                 // the part
    inkLine(_Pp(u, [[.2, -9.25], [1.8, -9.5], [3.4, -9.2]]), sw * .7, '#8E9AB8', 'inkfine', .5);       // shine
    inkLine(_Pp(u, [[-4.3, -8.55], [-2.8, -8.85]]), sw * .5, '#8E9AB8', 'inkfine', .5);
  },
  // Little Clawd: a black bowl cut with a straight fringe
  bowl(u, sw, V, C) {
    const P = [[-5.25, -6.6], [-5.3, -8.2], [-4.2, -9.4], [0, -9.9], [4.2, -9.4], [5.3, -8.2], [5.25, -6.6], [4.6, -6.75]];
    for (let i = 0; i <= 10; i++) P.push([4.4 - i * .88, -6.95 - (i % 2) * .12]);
    P.push([-4.6, -6.75]);
    paint(_Pp(u, P), { wash: C.base, washOp: 255, fill: '#3A3450', fillOp: 60, tex: .5, ink: C.ink, sw: sw * .7, curv: .2 });
    inkLine(_Pp(u, [[-2.4, -9.3], [1.8, -9.45]]), sw * .6, '#8E9AB8', 'inkfine', .5);
  },
  // the Rival: a big black mushroom helmet
  mushroom(u, sw, V, C) {
    const P = [[-5.6, -5.3], [-5.8, -8.1], [-4.6, -10.2], [0, -11.1], [4.6, -10.2], [5.8, -8.1], [5.6, -5.3], [4.9, -5.3], [4.8, -7.1], [-4.8, -7.1], [-4.9, -5.3]];
    paint(_Pp(u, P), { wash: C.base, washOp: 255, fill: '#3A3450', fillOp: 70, tex: .5, ink: C.ink, sw: sw * .7, curv: .3 });
    inkLine(_Pp(u, [[-3, -10.3], [1.5, -10.7]]), sw * .6, '#8E9AB8', 'inkfine', .5);
  },
  // Elevator Guy: short black sides and a tall topknot tied with a pink scrunchie
  topknot(u, sw, V, C) {
    paint(_Pp(u, [[-5.12, -7.3], [-5.1, -8.3], [-2, -8.7], [2, -8.7], [5.1, -8.3], [5.12, -7.3], [0, -7.8]]), { wash: C.base, washOp: 255, ink: C.ink, sw: sw * .6, curv: .3 });
    paint(_Pp(u, [[-1.2, -8.6], [-1.6, -10.6], [-.6, -12.4], [.6, -12.5], [1.5, -10.8], [1.2, -8.6]]), { wash: C.base, washOp: 255, fill: '#3A3450', fillOp: 60, ink: C.ink, sw: sw * .6, curv: .5 });
    paint(ellPts(0, -9.35 * u, 1.35 * u, .5 * u, 12), { wash: GP.pink, ink: C.ink, sw: sw * .5 });
  },
  // the Pop Star: long wavy rose-gold hair falling down both sides
  longwave(u, sw, V, C) {
    for (const s of [-1, 1]) {
      const P = []; for (let i = 0; i <= 8; i++) { const y = -8.6 + i * .78, w = .25 * Math.sin(i * 1.7 + (C.sway || 0) * 3); P.push([s * (5.45 + w), y]); }
      for (let i = 8; i >= 0; i--) { const y = -8.6 + i * .78, w = .2 * Math.sin(i * 1.7 + 1 + (C.sway || 0) * 3); P.push([s * (4.45 + w + (i < 2 ? .35 : 0)), y]); }
      paint(_Pp(u, P), { wash: C.base, washOp: 255, fill: C.dk, fillOp: 70, tex: .6, ink: C.ink, sw: sw * .6, curv: .5 });
    }
    paint(_Pp(u, [[-5.3, -7.6], [-5.1, -8.9], [-2.5, -9.7], [1, -9.8], [4, -9.5], [5.3, -8.6], [5.1, -7.4], [2.5, -7.95], [-1, -7.6], [-3.5, -8.05]]), { wash: C.base, washOp: 255, fill: C.dk, fillOp: 60, tex: .6, ink: C.ink, sw: sw * .6, curv: .5 });
    inkLine(_Pp(u, [[-3, -9.2], [0, -9.45], [2.8, -9.2]]), sw * .6, '#FFE0C8', 'inkfine', .5);
  },
  ponytail(u, sw, V, C) {
    paint(_Pp(u, [[-5.12, -7.2], [-5.1, -8.4], [-2.5, -9.1], [2.5, -9.1], [5.1, -8.4], [5.12, -7.2], [2, -7.7], [-2, -7.7]]), { wash: C.base, washOp: 255, ink: C.ink, sw: sw * .6, curv: .3 });
    const sway = .5 * Math.sin((C.sway || 0) * TAU);
    paint(ribbon(_Pp(u, [[3.8, -9], [5.6 + sway * .4, -9.6], [6.6 + sway, -8.2], [6.9 + sway, -6.3]]), 1.3 * u, .5 * u), { wash: C.base, ink: C.ink, sw: sw * .5 });
    paint(ellPts(4.1 * u, -9.05 * u, .4 * u, .4 * u, 8), { wash: GP.pink, ink: null });
  },
  bob(u, sw, V, C) {
    paint(_Pp(u, [[-5.4, -5.6], [-5.5, -8.3], [-3.5, -9.4], [3.5, -9.4], [5.5, -8.3], [5.4, -5.6], [4.8, -5.6], [4.7, -7.4], [0, -7.9], [-4.7, -7.4], [-4.8, -5.6]]), { wash: C.base, washOp: 255, fill: '#3A3450', fillOp: 55, ink: C.ink, sw: sw * .6, curv: .35 });
  },
  bun(u, sw, V, C) {
    paint(_Pp(u, [[-5.12, -7.2], [-5.1, -8.4], [-2.5, -9], [2.5, -9], [5.1, -8.4], [5.12, -7.2], [0, -7.8]]), { wash: C.base, washOp: 255, ink: C.ink, sw: sw * .6, curv: .3 });
    paint(ellPts(0, -10 * u, 1.5 * u, 1.3 * u, 14), { wash: C.base, ink: C.ink, sw: sw * .6 });
  },
  // Grannies: a tight perm, a cloud of curls
  perm(u, sw, V, C) {
    const cs = [[-4.6, -7.8], [-3.3, -8.9], [-1.7, -9.5], [0, -9.7], [1.7, -9.5], [3.3, -8.9], [4.6, -7.8], [-5.2, -6.8], [5.2, -6.8], [-2.5, -8.2], [2.5, -8.2], [0, -8.6]];
    for (const [cx, cy] of cs) paint(ellPts(cx * u, cy * u, 1.05 * u, .95 * u, 10), { wash: C.base, fill: C.dk, fillOp: 60, tex: .6, ink: C.ink, sw: sw * .45 });
    for (const [cx, cy] of cs.slice(0, 7)) inkLine(_Pp(u, [[cx - .4, cy + .1], [cx, cy - .3], [cx + .35, cy + .15]]), sw * .35, mixCol(C.base, '#FFFFFF', .35), 'inkfine', .6);
  },
  flatcap(u, sw, V, C) {
    paint(_Pp(u, [[-5.3, -7.5], [-5, -8.9], [-1, -9.6], [3.5, -9.3], [5.3, -8.2], [5.4, -7.5]]), { wash: C.base, fill: C.dk, fillOp: 60, tex: .6, ink: C.ink, sw: sw * .6, curv: .4 });
    paint(_Pp(u, [[-5.5, -7.55], [1.5, -7.9], [6.6, -7.6], [6.4, -7.1], [-5.4, -7.1]]), { wash: C.dk, ink: C.ink, sw: sw * .5 });
  },
  short(u, sw, V, C) {
    paint(_Pp(u, [[-5.12, -7.3], [-5.1, -8.4], [-3, -8.95], [0, -9.05], [3, -8.95], [5.1, -8.4], [5.12, -7.3], [0, -7.85]]), { wash: C.base, washOp: 255, fill: C.dk || '#3A3450', fillOp: 55, ink: C.ink, sw: sw * .6, curv: .35 });
  },
  spiky(u, sw, V, C) {
    const P = [[-5.2, -7.4]]; for (let i = 0; i < 7; i++) { const x0 = -4.8 + i * 1.37; P.push([x0, -8.2], [x0 + .68, -9.6 - .3 * Math.sin(i * 2.3)], [x0 + 1.37, -8.2]); }
    P.push([5.2, -7.4]);
    paint(_Pp(u, P), { wash: C.base, washOp: 255, ink: C.ink, sw: sw * .6 });
  },
  cap(u, sw, V, C) {
    const d = []; for (let i = 0; i <= 12; i++) { const a = Math.PI + i / 12 * Math.PI; d.push([Math.cos(a) * 4.4, -7.9 + Math.sin(a) * 2.3]); }
    paint(_Pp(u, d), { wash: C.base, fill: C.dk, fillOp: 60, ink: C.ink, sw: sw * .6 });
    paint(_Pp(u, [[-4.8, -7.9], [4.8, -7.9], [6.8, -7.5], [6.6, -7.2], [-4.8, -7.3]]), { wash: C.dk, ink: C.ink, sw: sw * .5 });
  },
  bald(u, sw, V, C) { inkLine(_Pp(u, [[-3.8, -7.8], [-2.4, -7.95]]), sw * .6, '#FFD8C0', 'inkfine', .5); }
};
// the Korean sauna "lamb head": a towel rolled into two little ears
function lambTowel(u, sw, col = '#F4EEE0') {
  paint(_Pp(u, [[-4.4, -7.7], [-4.2, -8.9], [-1.5, -9.4], [1.5, -9.4], [4.2, -8.9], [4.4, -7.7], [0, -8.1]]), { wash: col, fill: '#D8D0C0', fillOp: 60, tex: .6, ink: PAL.ink, sw: sw * .55, curv: .3 });
  for (const s of [-1, 1]) {
    paint(ellPts(s * 3.1 * u, -9.6 * u, 1.35 * u, 1.3 * u, 14), { wash: col, fill: '#D8D0C0', fillOp: 60, tex: .6, ink: PAL.ink, sw: sw * .55 });
    const sp = []; for (let i = 0; i < 12; i++) { const a = i * .8, r = .15 + i * .08; sp.push([s * 3.1 * u + Math.cos(a) * r * u, -9.6 * u + Math.sin(a) * r * u]); }
    inkLine(sp, sw * .4, '#B8AE9C', 'inkfine', .5);
  }
}
// a big sun visor: a translucent coloured brim across the forehead, the band round the head
function sunVisor(u, sw, col) {
  paint(_Pp(u, [[-5.25, -8.1], [5.25, -8.1], [5.25, -7.5], [-5.25, -7.5]]), { wash: mixCol(col, PAL.ink, .15), ink: PAL.ink, sw: sw * .5 });
  paint(_Pp(u, [[-6.2, -7.6], [6.2, -7.6], [5.2, -6.5], [-5.2, -6.5]]), { wash: col, washOp: 170, ink: PAL.ink, sw: sw * .5 });
}

// ---------- eyewear and face pieces (face space: eyes at (±2.5u, -6u)) ----------
// style: 'tort' (round tortoiseshell, Oppa), 'white' (the Rival's big white frames), 'big' (a granny's oversized
// shades), 'goggles' (swimming goggles), 'wire' (thin reading glasses, see-through)
function roundShades(u, sw, F, style = 'tort') {
  const R = style === 'big' ? 1.6 : style === 'white' ? 1.5 : style === 'goggles' ? 1.15 : 1.3;
  const frame = { tort: GP.tort, white: '#F4F0E8', big: '#2A2233', goggles: '#2F7FC0', wire: '#6A6070' }[style];
  const lens = style === 'wire' ? null : style === 'goggles' ? '#5AA8E0' : GP.lens;
  for (const s of F.sides) {
    const cx = s * 2.5 * u, cy = -6.05 * u;
    if (lens) paint(ellPts(cx, cy, R * u, R * .92 * u, 18), { wash: lens, ink: null });
    brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', frame, sw * (style === 'wire' ? .6 : 1.5));
    brush.beginShape(0); for (const p of ellPts(cx, cy, R * u, R * .92 * u, 18)) brush.vertex(p[0], p[1]); brush.endShape(true);
    if (style === 'tort') for (let k = 0; k < 5; k++) { const a = hash(k * 3.3 + s) * TAU; paint(ellPts(cx + Math.cos(a) * R * u, cy + Math.sin(a) * R * .92 * u, .2 * u, .14 * u, 6), { wash: GP.tortLt, ink: null }); }
    if (lens) { inkLine([[cx - .75 * u, cy - .15 * u], [cx - .2 * u, cy - .7 * u]], sw * .6, PAL.cream, 'inkfine', 0); inkLine([[cx - .45 * u, cy + .35 * u], [cx - .05 * u, cy - .05 * u]], sw * .4, PAL.cream, 'inkfine', 0); }
  }
  if (F.sides.length > 1) {
    inkLine(_Pp(u, [[-2.5 + R, -6.15], [0, -6.45], [2.5 - R, -6.15]]), sw * 1.1, frame, 'ink', .5);
    for (const s of [-1, 1]) inkLine(_Pp(u, [[s * (2.5 + R), -6.2], [s * 5.3, -6.4]]), sw * 1.1, frame, 'ink', 0);
    if (style === 'goggles') for (const s of [-1, 1]) inkLine(_Pp(u, [[s * (2.5 + R), -6.1], [s * 5.4, -6.2]]), sw * 2.2, '#2F7FC0', 'ink', 0);
  } else inkLine(_Pp(u, [[2.5 - R, -6.2], [-4.5, -6.4]]), sw * 1.1, frame, 'ink', 0);
}

// ---------- the cast registry ----------
const _bare = (col) => ({ col, dk: mixCol(col, '#6A2A18', .35), lt: mixCol(col, '#FFFFFF', .3) });
const _pick = (arr, v) => arr[((v % arr.length) + arr.length) % arr.length];
const CAST = {
  oppa: {
    col: '#DC7B58', dk: '#A84D33', lt: '#F5B394', sx: 1.12, sy: .94,
    looks: {
      tux: { armCol: GP.tux, sleeve: .82, legCol: '#2A2530', legFar: '#1C1822', outfit: (u, sw, V, J) => jacket(u, sw, V, J, GP.tux, { tie: 'bow' }) },
      black: { armCol: GP.blackTux, sleeve: .82, legCol: '#2A2530', legFar: '#1C1822', outfit: (u, sw, V, J) => jacket(u, sw, V, J, GP.blackTux, { tie: 'bow', lapel: '#46404F' }) },
      white: { armCol: GP.shirt, sleeve: .82, legCol: GP.khaki, legFar: mixCol(GP.khaki, PAL.ink, .25), outfit: (u, sw, V, J) => { band(u, V, J, -4.1, -2.02, GP.shirt); if (V.face) { const cx = _faceX(V, 0); for (const k of [-3.6, -3.0, -2.45]) for (const s of [-1, 1]) paint(ellPts((cx + s * .9) * u, k * u, .14 * u, .14 * u, 6), { wash: '#C9B79A', ink: null }); inkLine(_Pp(u, [[cx, -4.1], [cx, -2.05]]), sw * .4, '#C9B79A', 'inkfine', 0); } } },
      party: { armCol: GP.white, sleeve: .82, legCol: GP.maroon, legFar: mixCol(GP.maroon, PAL.ink, .3), outfit: (u, sw, V, J) => jacket(u, sw, V, J, GP.white, { tie: 'bow', lapel: '#E8E0D0', shirt: '#FFFFFF', buttons: GP.gold }) },
      sauna: { legCol: '#DC7B58', legFar: '#B8603E', outfit: (u, sw, V, J) => { band(u, V, J, -3.2, -2.02, '#F4EEE0'); inkLine([[(V.L + .3) * u, -3.0 * u], [(V.R - .3) * u, -3.05 * u]], sw * .4, '#C8BCA8', 'inkfine', 0); } },
      beach: { armCol: '#FFFFFF', sleeve: .45, legCol: '#F29AB0', legFar: '#D07890', outfit: (u, sw, V, J) => { band(u, V, J, -4.0, -2.02, '#FFFFFF'); if (V.face) { const cx = _faceX(V, 0), fw = V.face.fw; for (const s of [-1, 1]) paint(_Pp(u, [[cx + s * .9 * fw, -4.0], [cx + s * 3.6 * fw, -4.0], [cx + s * 3.3 * fw, -2.05], [cx + s * .5 * fw, -2.05]]), { wash: '#F28A3A', ink: PAL.ink, sw: sw * .45 }); } } }
    },
    head: (u, sw, V) => HAIRS.slick(u, sw, V, { base: '#221C2A', ink: PAL.ink }),
    face: (u, sw, F, V, lid, o) => { if (!o.bareEyes) roundShades(u, sw, F, 'tort'); },
    hand: '#DC7B58'
  },
  kid: {
    col: '#E0845F', dk: '#AC5236', lt: '#F7BC9C', sx: .96, sy: 1,
    look: { legCol: '#D8392F', legFar: '#A82A26', outfit: (u, sw, V, J) => { band(u, V, J, -4.2, -2.02, '#FFFFFF', x => -4.2 + (Math.abs(x) < 1.6 ? .5 : 0)); } },
    head: (u, sw, V) => HAIRS.bowl(u, sw, V, { base: '#221C2A', ink: PAL.ink }),
    hand: '#E0845F'
  },
  rival: {
    col: '#D8805E', dk: '#A5503A', lt: '#F3B498', sx: .86, sy: 1.14,
    look: { armCol: GP.yellow, sleeve: .85, legCol: GP.yellow, legFar: GP.yellowDk, outfit: (u, sw, V, J) => jacket(u, sw, V, J, GP.yellow, { tie: 'skinny', lapel: GP.yellowDk, shirt: '#3A3040', tieCol: '#E8C84A' }) },
    head: (u, sw, V) => HAIRS.mushroom(u, sw, V, { base: '#1E1826', ink: PAL.ink }),
    face: (u, sw, F) => roundShades(u, sw, F, 'white'),
    hand: '#D8805E'
  },
  elev: {
    col: '#D98463', dk: '#A6533A', lt: '#F4B89C', sx: 1.05, sy: 1.02,
    look: { legCol: '#F6F0E6', legFar: '#D8D0C4', legPat: (x, y, w, h, far, u) => { for (let k = 0; k < 3; k++) paint(ellPts(x + w * (.3 + .4 * (k % 2)), y + h * (.2 + k * .28), .16 * u, .16 * u, 6), { wash: GP.pink, ink: null }); },
      armCol: GP.lime, sleeve: .35, outfit: (u, sw, V, J) => { band(u, V, J, -4.1, -2.02, GP.lime); if (V.face) { const cx = _faceX(V, 0); paint(ellPts(cx * u, -3.05 * u, .75 * u, .75 * u, 12), { wash: '#FFE24A', ink: PAL.ink, sw: sw * .4 }); } } },
    head: (u, sw, V) => HAIRS.topknot(u, sw, V, { base: '#221C2A', ink: PAL.ink }),
    face: (u, sw, F) => { if (F.sides.length > 1) inkLine(_Pp(u, [[-1.2, -4.95], [-.3, -5.15], [.3, -5.15], [1.2, -4.95]]), sw * 1.1, '#2A2230', 'ink', .5); },   // a moustache
    hand: '#D98463'
  },
  pop: {
    col: '#E48A68', dk: '#B0583C', lt: '#F8C2A4', sx: .94, sy: 1.08,
    look: { legCol: '#F6EEE8', legFar: '#D8CEC6', armCol: GP.pink, sleeve: .3, outfit: (u, sw, V, J) => { band(u, V, J, -4.0, -2.02, GP.pink); for (let k = 0; k < 9; k++) paint(starPts((V.L + .8 + 8.4 * hash(k * 3.7)) * u, (-3.6 + 1.4 * hash(k * 5.1)) * u, .28 * u, .35, 4), { wash: '#FFF4C8', ink: null }); } },
    head: (u, sw, V, lid, o) => HAIRS.longwave(u, sw, V, { base: GP.roseGold, dk: '#C97A5A', ink: PAL.ink, sway: (o && o.hairSway) || 0 }),
    face: (u, sw, F) => {   // lashes and gold hoop earrings
      for (const s of F.sides) for (const k of [-1, 0, 1]) inkLine(_Pp(u, [[s * 2.5 + k * .35, -7.05], [s * 2.5 + k * .55, -7.6]]), sw * .5, PAL.ink, 'inkfine', 0);
      if (F.sides.length > 1) for (const s of [-1, 1]) { brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', GP.gold, sw * 1.1); brush.beginShape(0); for (const p of ellPts(s * 5.2 * u, -4.4 * u, .7 * u, .85 * u, 12)) brush.vertex(p[0], p[1]); brush.endShape(true); }
    },
    hand: '#E48A68'
  },
  dancer: {   // the White Dancers: white dresses, black hair in a few styles
    variants: v => ({ ..._bare(_pick(['#E08A66', '#D9805F', '#E6926E', '#D47858'], v)), hair: _pick(['ponytail', 'bob', 'bun', 'ponytail', 'bob'], v), sx: .92 + .05 * hash(v), sy: 1.06 }),
    look: { legCol: '#F4EFE6', legFar: '#D8D2C8', outfit: (u, sw, V, J) => band(u, V, J, -4.3, -2.02, '#F7F3EC', x => -4.3 + .25 * Math.sin(x * 2)) },
    headV: v => (u, sw, V, lid, o) => HAIRS[_pick(['ponytail', 'bob', 'bun', 'ponytail', 'bob'], v)](u, sw, V, { base: '#221C2A', ink: PAL.ink, sway: (o && o.hairSway) || 0 }),
    hand: null
  },
  granny: {   // the Grannies: a perm, a big sun visor, oversized shades, a flowery blouse, UV arm sleeves
    variants: v => ({ ..._bare(_pick(['#D9876A', '#D07E62', '#E09274'], v)), sx: 1.04, sy: .96, visor: _pick(['#F07AA8', '#9AD84A', '#B38AE8', '#4AC0C8', '#F2B23A'], v), blouse: _pick(['#F4A0B8', '#9ED0F0', '#F8D060', '#B8E0A0', '#E8A8E0'], v + 2), perm: _pick(['#5A3A2E', '#3A2A2A', '#7A5A4A'], v) }),
    look: null, hand: null
  },
  grandpa: {
    variants: v => ({ ..._bare(_pick(['#D08268', '#C8785E'], v)), sx: 1, sy: .98, cap: _pick(['#8A8478', '#6A6458', '#A89A7C'], v) }),
    look: { legCol: '#EDE8DC', legFar: '#CFC8BA', armCol: '#F2EEE4', sleeve: .9, outfit: (u, sw, V, J) => { band(u, V, J, -4.3, -2.02, '#F2EEE4'); if (V.face) { const cx = _faceX(V, 0); inkLine(_Pp(u, [[cx - 1.6, -4.3], [cx + .4, -2.8], [cx + 1.8, -4.3]]), sw * .5, '#B8B0A0', 'inkfine', 0); paint(ribbon(_Pp(u, [[cx + .4, -3.1], [cx + 1.6, -2.6], [cx + 2.2, -2.2]]), .35 * u, .2 * u), { wash: '#C8483E', ink: null }); } } },
    face: (u, sw, F) => { if (F.sides.length > 1) { paint(_Pp(u, [[-1.4, -4.9], [1.4, -4.9], [.9, -3.9], [0, -3.4], [-.9, -3.9]]), { wash: '#EDEAE4', ink: PAL.ink, sw: sw * .4, curv: .4 }); } roundShades(u, sw, F, 'wire'); },
    hand: null
  },
  boss: {   // the Sauna Boss: big, bald, a lamb-towel head, dragon tattoos, a towel round the waist
    col: '#D9906E', dk: '#A85E40', lt: '#F4C0A0', sx: 1.25, sy: .98,
    look: { legCol: '#D9906E', legFar: '#B87050', armDeco: (u, sw, which, layer, AL = 2.2) => { const P = []; for (let i = 0; i <= 6; i++) P.push([.3 * u + i * (AL - .5) / 6 * u, Math.sin(i * 1.4) * .22 * u]); inkLine(P, sw * 1.2, '#2F6E8A', 'ink', .5); paint(ellPts((AL - .4) * u, -.05 * u, .28 * u, .22 * u, 8), { wash: '#C8483E', ink: null }); },
      outfit: (u, sw, V, J) => { band(u, V, J, -3.1, -2.02, '#F4EEE0'); inkLine([[(V.L + .3) * u, -2.9 * u], [(V.R - .3) * u, -2.95 * u]], sw * .4, '#C8BCA8', 'inkfine', 0); if (V.face) { const cx = _faceX(V, 0); inkLine(_Pp(u, [[cx - 2.4, -4.4], [cx, -3.6], [cx + 2.4, -4.4]]), sw * .9, GP.gold, 'ink', .6); } } },
    head: (u, sw, V) => lambTowel(u, sw),
    hand: '#D9906E'
  },
  commuter: {
    variants: v => ({ ..._bare(_pick(['#D8805E', '#CF7A5A', '#E2906E', '#C9745A', '#DC8A66'], v)), sx: .92 + .16 * hash(v * 1.3), sy: .94 + .14 * hash(v * 2.1), suit: _pick(['#3E4A66', '#4A4452', '#6A5A48', '#2F3E3A', '#5A6A7A', '#7A4A4A'], v), hair: _pick(['short', 'spiky', 'bob', 'short', 'cap', 'bald'], v * 7 + 1), hairCol: _pick(['#221C2A', '#4A3326', '#221C2A', '#6A4A3A'], v * 3) }),
    look: null, hand: null
  },
  crowd: {   // the finale party: costumes
    variants: v => ({ ..._bare(_pick(['#D8805E', '#CF7A5A', '#E2906E', '#C9745A', '#DC8A66', '#E6967A'], v)), sx: .92 + .16 * hash(v * 1.7), sy: .94 + .14 * hash(v * 2.9), costume: _pick(['dobok', 'hazard', 'chef', 'sailor', 'hero', 'tracksuit', 'nurse', 'baseball', 'hanbok', 'suit'], v), hair: _pick(['short', 'spiky', 'bob', 'ponytail', 'cap', 'bun', 'perm'], v * 5 + 2), hairCol: _pick(['#221C2A', '#4A3326', '#8A5A3A', '#221C2A', '#D8B060'], v * 3 + 1) }),
    look: null, hand: null
  }
};
const CAST_NAMES = Object.keys(CAST);

// costume outfit for the crowd variants
function crowdOutfit(kind, u, sw, V, J) {
  switch (kind) {
    case 'dobok': band(u, V, J, -4.2, -2.02, '#F6F4EE'); paint(rectPts((V.L + .1) * u, -2.9 * u, (V.R - V.L - .2) * u, .45 * u), { wash: '#1E1A24', ink: null }); break;
    case 'hazard': band(u, V, J, -4.2, -2.02, '#F58A2A'); for (const y of [-3.6, -2.7]) paint(rectPts((V.L + .1) * u, y * u, (V.R - V.L - .2) * u, .3 * u), { wash: '#F2F2D8', ink: null }); break;
    case 'chef': band(u, V, J, -4.2, -2.02, '#FAF8F2'); for (const k of [-3.5, -2.8]) for (const s of [-1, 1]) paint(ellPts(s * .8 * u, k * u, .14 * u, .14 * u, 6), { wash: '#2A2230', ink: null }); break;
    case 'sailor': band(u, V, J, -4.2, -2.02, '#F4F4F0'); for (let i = 0; i < 3; i++) paint(rectPts((V.L + .1) * u, (-3.9 + i * .6) * u, (V.R - V.L - .2) * u, .22 * u), { wash: '#2E4E9A', ink: null }); break;
    case 'hero': band(u, V, J, -4.2, -2.02, '#3A5ED8'); paint(starPts(0, -3.2 * u, .9 * u, .45, 5), { wash: '#F4D23A', ink: PAL.ink, sw: sw * .4 }); break;
    case 'tracksuit': band(u, V, J, -4.2, -2.02, '#2FA86A'); for (const s of [-1, 1]) paint(rectPts((s < 0 ? V.L + .4 : V.R - .9) * u, -4.2 * u, .45 * u, 2.1 * u), { wash: '#F4F4EE', ink: null }); break;
    case 'nurse': band(u, V, J, -4.2, -2.02, '#9FD8E8'); break;
    case 'baseball': band(u, V, J, -4.2, -2.02, '#F4F2EA'); for (let i = 0; i < 5; i++) inkLine([[(-3 + i * 1.5) * u, -4.1 * u], [(-3 + i * 1.5) * u, -2.1 * u]], sw * .35, '#3A5A9A', 'inkfine', 0); break;
    case 'hanbok': band(u, V, J, -4.2, -2.02, '#E84A6A'); paint(rectPts((V.L + .1) * u, -4.2 * u, (V.R - V.L - .2) * u, .7 * u), { wash: '#F4D23A', ink: null }); break;
    default: jacket(u, sw, V, J, '#3E4A66', { tie: 'skinny', tieCol: '#C8483E' });
  }
}

// member(): the ONLY way to draw a Clawd character
function memberOpts(name, o = {}) {
  const C = CAST[name]; if (!C) throw new Error('no cast member ' + name);
  const v = o.v || 0, V_ = C.variants ? C.variants(v) : null;
  const base = V_ || { col: C.col, dk: C.dk, lt: C.lt, sx: C.sx, sy: C.sy };
  const look = C.looks ? (C.looks[o.look || 'tux'] || C.looks.tux) : C.look || {};
  const q = { col: base.col, dk: base.dk, lt: base.lt, ...o };
  q.sx = (o.sx ?? 1) * (base.sx ?? 1); q.sy = (o.sy ?? 1) * (base.sy ?? 1);
  for (const k of ['legCol', 'legFar', 'legPat', 'armCol', 'sleeve', 'armDeco', 'outfit']) if (q[k] === undefined && look[k] !== undefined) q[k] = look[k];
  // ensemble specials
  if (name === 'granny') {
    q.legCol ??= '#8A6A9A'; q.legFar ??= '#6A4A7A'; q.armCol ??= mixCol(base.visor, '#FFFFFF', .5); q.sleeve ??= .9;
    q.outfit ??= (u, sw, V, J) => { band(u, V, J, -4.2, -2.02, base.blouse); for (let k = 0; k < 7; k++) { const fx = (V.L + .7 + (V.R - V.L - 1.4) * hash(k * 2.9 + v)) * u, fy = (-3.8 + 1.5 * hash(k * 4.1 + v)) * u; for (let p = 0; p < 5; p++) { const a = p / 5 * TAU; paint(ellPts(fx + Math.cos(a) * .32 * u, fy + Math.sin(a) * .32 * u, .22 * u, .22 * u, 6), { wash: '#FFFFFF', washOp: 200, ink: null }); } paint(ellPts(fx, fy, .16 * u, .16 * u, 6), { wash: GP.gold, ink: null }); } };
  }
  if (name === 'commuter') { q.legCol ??= mixCol(base.suit, PAL.ink, .15); q.armCol ??= base.suit; q.sleeve ??= .85; q.outfit ??= (u, sw, V, J) => jacket(u, sw, V, J, base.suit, { tie: 'skinny', tieCol: _pick(['#C8483E', '#3A5A9A', '#E8B83A'], v) }); }
  if (name === 'crowd') { q.legCol ??= mixCol(base.col, PAL.ink, .5); q.outfit ??= (u, sw, V, J) => crowdOutfit(base.costume, u, sw, V, J); }
  // head (hair/headwear) and face (eyewear etc.): the character's own, then any the caller passes
  const h0 = o.head, f0 = o.face, hand = C.hand || base.col;
  let head = C.head;
  if (C.headV) head = C.headV(v);
  if (name === 'granny') head = (u, sw, V) => { HAIRS.perm(u, sw, V, { base: base.perm, dk: mixCol(base.perm, PAL.ink, .3), ink: PAL.ink }); sunVisor(u, sw, base.visor); };
  if (name === 'grandpa') head = (u, sw, V) => HAIRS.flatcap(u, sw, V, { base: base.cap, dk: mixCol(base.cap, PAL.ink, .3), ink: PAL.ink });
  if (name === 'commuter' || name === 'crowd') head = (u, sw, V) => { if (HAIRS[base.hair]) HAIRS[base.hair](u, sw, V, { base: base.hairCol, dk: mixCol(base.hairCol, PAL.ink, .3), ink: PAL.ink, sway: 0 }); };
  if (o.noHair) head = null;
  q.head = (u, sw, V, lid) => { if (head) head(u, sw, V, lid, o); if (h0) h0(u, sw, V, lid); };
  const face = C.face || (name === 'granny' ? (u, sw, F) => roundShades(u, sw, F, 'big') : null);
  q.face = (u, sw, F, V, lid) => { if (face && F) face(u, sw, F, V, lid, o); if (f0) f0(u, sw, F, V, lid); };
  q._hand = hand; q._sleeve = q.armCol && (q.sleeve || 0) > .6 ? q.armCol : hand;
  return q;
}
function member(name, x, y, u, o = {}) { clawd(x, y, u, memberOpts(name, o)); }
const _baseCols = (name, v = 0) => { const C = CAST[name], V_ = C.variants ? C.variants(v) : null; return V_ ? { col: V_.col, dk: V_.dk, lt: V_.lt } : { col: C.col, dk: C.dk, lt: C.lt }; };
const mood = (name, t, keys, opts = {}) => emotions(t, keys, { ...opts, base: _baseCols(name, opts.v) });
const mfeel = (name, emo, t, over = {}) => feel(emo, t, { ..._baseCols(name, over.v), ...over });
// dancer(): member() + choreography. moveOrKeys: a move name, or routine keys [[t0, move, opts], ...].
// o.face/o.eyes etc. override; o.mood = an emotion name for the face (default 'happy'); o.ph/o.e/o.side/o.amp per dancer.
function dancer(name, x, y, u, moveOrKeys, t, o = {}) {
  const q = memberOpts(name, o), dopts = { ph: o.ph, e: o.e, side: o.side, amp: o.amp, hand: q._hand, sleeve: q._sleeve };
  const pose = typeof moveOrKeys === 'string' ? dance(moveOrKeys, t, dopts) : routine(t, moveOrKeys, dopts);
  const face = mfeel(name, o.mood || 'happy', t, { v: o.v, seed: o.seed });
  const r = { ...q, eyes: face.eyes, mouth: face.mouth, blush: face.blush, ...pose };
  for (const k of ['eyes', 'mouth', 'lookX', 'lookY', 'squint', 'lid', 'emote', 'emoteK', 'blush', 'flip', 'view', 'boilKey', 'noShadow', 'dx', 'rot']) if (o[k] !== undefined) r[k] = (k === 'dx' || k === 'rot') ? (pose[k] || 0) + o[k] : o[k];
  if (o.dy !== undefined) r.dy = (pose.dy || 0) + o.dy;
  clawd(x, y, u, r);
}

// Mouth flaps for performing (no lip-sync): 'rap' (fast, syllabic) | 'sing' (held vowels) | 'shout'. Spread into member().
function singing(t, style = 'rap') {
  const e = Math.floor((t - OFF) / EIGHTH * (style === 'rap' ? 2 : 1)), h = hash(e * 7.3 + 1);
  if (style === 'rap') return { mouth: h < .18 ? 'flat' : h < .45 ? 'open' : h < .7 ? 'o' : h < .85 ? 'sing' : 'O' };
  if (style === 'sing') return { mouth: h < .2 ? 'O' : h < .75 ? 'sing' : 'open' };
  return { mouth: h < .3 ? 'sing' : 'belt' };
}

// ---------- the Horse ----------
// horse(x, y, s, t, o): (x, y) = the ground point between the hooves; s ~ a Clawd's u (a horse at s = u is about twice
// a Clawd's height). o.view: 'side' (default; faces right, o.flip faces left) | 'up' (standing upright on its hind legs,
// facing us: it can DANCE: pass dance() pose fields, same as a Clawd) | 'sit' (sitting like a person, e.g. a bus seat).
// Face: o.mood 'deadpan' (default: half-lidded, unimpressed) | 'annoyed' | 'surprised' | 'smug' | 'joy';
// o.look: 'camera' turns the eye to us; o.shades (the round tortoiseshell pair), o.visor (colour), o.towel;
// o.walk (phase: trots), o.chew (0..1: chewing), o.headDown 0..1 (grazing / reading), o.blink (seed).
// COATS: THE Horse is 'chestnut' with a cream Claude-spark star on its forehead (its signature: only it has one).
// Extras: coat 'bay' | 'grey' | 'black' | 'palomino' (no star).
const COATS = {
  chestnut: [GP.horse, GP.horseDk, GP.horseLt, GP.mane], bay: ['#8A5236', '#5E3420', '#A8704E', '#1E1618'],
  grey: ['#B8B4AE', '#8A8680', '#D8D4CE', '#5A5652'], black: ['#3A3440', '#221E28', '#5A5262', '#16121A'], palomino: ['#E0B870', '#B88E48', '#F0D498', '#F4ECD8']
};
function _coat(o) { const c = COATS[o.coat || 'chestnut'] || COATS.chestnut; return { col: c[0], dk: c[1], lt: c[2], mane: c[3], star: o.star ?? ((o.coat || 'chestnut') === 'chestnut') }; }
function horseStar(x, y, r, sw) { paint(starPts(x, y, r, .3, 4, -Math.PI / 2), { wash: '#FBF1DA', ink: null }); paint(starPts(x, y, r * .62, .35, 4, -Math.PI / 4), { wash: '#FBF1DA', ink: null }); }
function horse(x, y, s, t, o = {}) {
  const view = o.view || 'side';
  boilSeed('horse ' + (o.boilKey ?? x));
  if (view === 'up') return horseUp(x, y, s, t, o);
  const K = _coat(o), sw = clamp(s / 15, .45, 2.4), J = s * .07, flip = o.flip ? -1 : 1, col = K.col, dk = K.dk, lt = K.lt;
  push(); translate(x + (o.dx || 0) * s, y + (o.dy || 0) * s); scale(flip * (1 + (o.sq || 0) * .5), 1 - (o.sq || 0)); if (o.rot) rotate(o.rot * flip);
  const P = pts => _Pp(s, pts);
  const sit = view === 'sit';
  // shadow
  paint(ellPts(0, .15 * s, 8.5 * s, 1.1 * s, 20), { fill: PAL.ink, fillOp: 80, bleed: .2, tex: .3, border: .1, ink: null });
  // tail
  const tw = Math.sin(t * 2.3 + (o.seed || 0)) * .5;
  paint(ribbon(P(sit ? [[-5.5, -5], [-7.2, -4], [-7.6 + tw, -2], [-7 + tw, -.4]] : [[-6.2, -11.2], [-8, -10.2], [-8.6 + tw, -7.6], [-8.2 + tw * 1.4, -5]]), 1.6 * s, .6 * s), { wash: K.mane, fill: mixCol(K.mane, '#FFFFFF', .15), fillOp: 60, ink: PAL.ink, sw: sw * .7 });
  // legs: far pair darker, drawn first
  const legs = sit ? [[-3.6, 1, 'hind'], [3.2, 1, 'fore'], [-2.4, 0, 'hind'], [4.4, 0, 'fore']] : [[-4.6, 1], [3.1, 1], [-3.3, 0], [4.4, 0]];
  legs.forEach(([lx, far, kind], i) => {
    let swing = 0, lift = 0;
    if (o.walk != null) { const ph = (o.walk + [0, .5, .5, 0][i]) * TAU; swing = Math.sin(ph) * 1.1; lift = Math.max(0, Math.cos(ph)) * .9; }
    const c = far ? mixCol(dk, PAL.ink, .2) : col;
    if (sit && kind === 'hind') {   // sitting: the hind legs fold forward along the ground
      paint(P([[lx - .6, -3.4], [lx + .6, -3.4], [lx + 4.4, -1.2], [lx + 4.2, 0], [lx - .4, -1.3]]), { wash: c, ink: PAL.ink, sw: sw * .7 });
      paint(rectPts((lx + 3.8) * s, -1.2 * s, 1.5 * s, 1.2 * s), { wash: GP.hoof, ink: PAL.ink, sw: sw * .6 });
      return;
    }
    const top = sit ? -8.2 : -7.2, bot = -1 - lift;
    paint(P([[lx - .6, top], [lx + .6, top], [lx + .55 + swing, bot], [lx - .55 + swing, bot]]), { wash: c, fill: dk, fillOp: 40, ink: PAL.ink, sw: sw * .7 });
    paint(rectPts((lx - .75 + swing) * s, (bot) * s, 1.5 * s, .95 * s), { wash: GP.hoof, ink: PAL.ink, sw: sw * .6 });
  });
  // body (barrel): upright-ish when sitting
  if (sit) {
    paint(P([[-5.8, -2.2], [-6.2, -7], [-4.2, -10.6], [2.6, -11.6], [5.2, -9.6], [5.4, -6], [3.2, -2.2]]), { wash: col, fill: dk, fillOp: 50, tex: .6, ink: PAL.ink, sw, curv: .35 });
  } else {
    paint(rrPts(-6.6 * s, -12.4 * s, 12.4 * s, 5.8 * s, 2.6 * s, J), { wash: col, fill: dk, fillOp: 50, tex: .6, ink: PAL.ink, sw });
    paint(ellPts(-.5 * s, -10.9 * s, 4.6 * s, 1.2 * s, 16), { fill: lt, fillOp: 90, bleed: .1, tex: .7, ink: null });
  }
  // neck + head
  const hd = clamp(o.headDown || 0), nb = sit ? [2.2, -10.8] : [3.6, -11.4];        // neck base
  const ha = lerp(-.95, .35, hd);                                                      // neck angle (up -> grazing)
  const nl = 6.2, nt = [nb[0] + Math.cos(ha) * nl * .55 + 1.6, nb[1] + Math.sin(ha) * nl];
  paint(P([[nb[0] - 1.6, nb[1] + .6], [nb[0] + 2.4, nb[1] + .4], [nt[0] + 1.3, nt[1] + .8], [nt[0] - 1.4, nt[1] - .2]]), { wash: col, fill: dk, fillOp: 40, ink: PAL.ink, sw, curv: .2 });
  // mane along the back of the neck
  const M = []; for (let i = 0; i <= 6; i++) { const k = i / 6; M.push([lerp(nb[0] - 1.6, nt[0] - 1.4, k) - (i % 2 ? .7 : 0), lerp(nb[1] + .4, nt[1] - .3, k) - (i % 2 ? .1 : 0)]); }
  paint(ribbon(P(M), 1.2 * s, .9 * s), { wash: K.mane, ink: PAL.ink, sw: sw * .6 });
  // the head: a long block, muzzle down-forward
  push(); translate(nt[0] * s, nt[1] * s); rotate(lerp(.62, 1.25, hd));
  paint(rrPts(-.9 * s, -1.6 * s, 7 * s, 3.3 * s, 1.3 * s, J), { wash: col, fill: dk, fillOp: 40, ink: PAL.ink, sw });
  paint(rrPts(3.8 * s, -1.55 * s, 2.3 * s, 3.2 * s, 1.1 * s, J * .5), { wash: lt, ink: null });                       // muzzle
  if (K.star) horseStar(1.1 * s, -.95 * s, .75 * s, sw); else paint(P([[.6, -1.55], [4.6, -1.5], [4.3, -.9], [.8, -1.0]]), { wash: GP.blaze, ink: null });   // the spark star (THE Horse) or a blaze
  paint(ellPts(5.1 * s, -.7 * s, .35 * s, .25 * s, 8), { wash: GP.mane, ink: null });                                   // nostril
  const chew = o.chew ? Math.abs(Math.sin(t * 9)) * clamp(o.chew) : 0;
  inkLine(P([[4.2, 1.2 + chew * .2], [5.3, 1.1 + chew * .35], [5.9, .8]]), sw * .7, PAL.ink, 'ink', .4);                  // mouth
  paint(P([[-.4, -1.5], [.2, -3.4], [1, -1.4]]), { wash: col, ink: PAL.ink, sw: sw * .6 });                              // ear
  paint(ribbon(P([[.4, -1.3], [1.4, -1.9], [2.2, -1.6]]), .9 * s, .3 * s), { wash: K.mane, ink: null });                // forelock
  // the eye
  horseEye(1.7 * s, -.4 * s, s, sw, t, o, -lerp(.62, 1.25, hd));
  if (o.shades) { push(); translate(1.8 * s, -.5 * s); rotate(-lerp(.62, 1.25, hd)); for (const dx of [0]) { paint(ellPts(dx, 0, 1.15 * s, 1.05 * s, 16), { wash: GP.lens, ink: null }); brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', GP.tort, sw * 1.4); brush.beginShape(0); for (const p of ellPts(dx, 0, 1.15 * s, 1.05 * s, 16)) brush.vertex(p[0], p[1]); brush.endShape(true); } inkLine([[-1.15 * s, 0], [-3.2 * s, -.3 * s]], sw * 1.1, GP.tort, 'ink', 0); inkLine([[-.5 * s, -.3 * s], [-.1 * s, -.7 * s]], sw * .5, PAL.cream, 'inkfine', 0); pop(); }
  if (o.visor) {   // a sun visor: the band round the forehead, the brim jutting out over the eye
    paint(P([[.2, -1.75], [3.4, -1.75], [3.4, -1.15], [.2, -1.15]]), { wash: mixCol(o.visor, PAL.ink, .15), ink: PAL.ink, sw: sw * .5 });
    paint(P([[1.8, -1.7], [5.6, -2.4], [5.4, -1.7], [2.6, -1.15]]), { wash: o.visor, washOp: 180, ink: PAL.ink, sw: sw * .5 });
  }
  if (o.towel) { push(); translate(1.2 * s, -1.5 * s); rotate(-lerp(.62, 1.25, hd)); const k = .5; translate(0, 7.8 * s * k); lambTowel(s * k, sw); pop(); }
  pop();
  if (o.draw) o.draw(s, sw);
  pop();
}
// the horse's eye (side view): deadpan = a heavy flat lid over the top half; look 'camera' = the pupil turns to us
function horseEye(ex, ey, s, sw, t, o, counter = 0) {
  push(); translate(ex, ey); rotate(counter * .5);
  const m = o.mood || 'deadpan', blinkOn = ((t * .7 + (o.blink || 0) * 1.3) % 4.1) < .13;
  const R = m === 'surprised' ? .95 : .72;
  paint(ellPts(0, 0, R * s, R * 1.08 * s, 14), { wash: '#FBF6EA', ink: PAL.ink, sw: sw * .7 });
  if (!blinkOn) {
    const lx = o.look === 'camera' ? -.1 : .25, ly = o.look === 'camera' ? .05 : 0;
    paint(ellPts(lx * s, ly * s, R * .6 * s, R * .7 * s, 12), { wash: '#3A2418', ink: null });
    paint(ellPts((lx - .15) * s, (ly - .25) * s, R * .18 * s, R * .2 * s, 8), { wash: PAL.cream, ink: null });
  }
  const lid = blinkOn ? 1 : { deadpan: .52, annoyed: .62, surprised: 0, smug: .58, joy: .3 }[m] ?? .5;
  if (lid > .02) {   // the lid: a flat heavy line (the unimpressed look)
    const y = -R * 1.08 * s + lid * 2.16 * R * s;
    const P = []; for (let i = 0; i <= 10; i++) { const a = Math.PI + i / 10 * Math.PI; P.push([Math.cos(a) * R * s * 1.04, Math.min(y, Math.sin(a) * R * 1.08 * s)]); }
    paint(P.concat([[R * s * 1.04, y], [-R * s * 1.04, y]]), { wash: GP.horseDk, ink: null });
    inkLine([[-R * 1.15 * s, y + (m === 'annoyed' ? -.15 * s : 0)], [R * 1.15 * s, y + (m === 'annoyed' ? .12 * s : 0)]], sw * 1.1, PAL.ink, 'ink', 0);
  }
  if (m === 'joy') inkLine([[-.7 * s, .9 * s], [0, 1.2 * s], [.7 * s, .9 * s]], sw * .6, PAL.ink, 'inkfine', .5);
  pop();
}
// The Horse standing upright on its hind legs, facing us. Accepts dance() pose fields (aL, aR, armLen, frontArm,
// legLift, legSplay, dy, dx, sq, rot, armL/armR hooks): the forelegs are its arms, with hooves for fists.
function horseUp(x, y, s, t, o) {
  const K = _coat(o), sw = clamp(s / 15, .45, 2.4), J = s * .07, col = K.col, dk = K.dk, lt = K.lt;
  const sq = o.sq || 0, P = pts => _Pp(s, pts);
  push(); translate(x + (o.dx || 0) * s, y + (o.dy || 0) * s); if (o.rot) rotate(o.rot); scale(1 + sq * .5, 1 - sq);
  paint(ellPts(0, .15 * s, 5.4 * s, .9 * s, 18), { fill: PAL.ink, fillOp: 80, bleed: .2, tex: .3, border: .1, ink: null });
  // hind legs (two), with splay and lift
  const ll = o.legLift || [0, 0, 0, 0], liftL = Math.max(ll[0], ll[1]), liftR = Math.max(ll[2], ll[3]), sp = (o.legSplay ?? 0) * 1.1;
  for (const [s_, lift] of [[-1, liftL], [1, liftR]]) {
    const top = [s_ * 1.8, -6.6], bot = [s_ * (2.1 + sp), -1.1 - 2.2 * lift];
    paint(P([[top[0] - .9, top[1]], [top[0] + .9, top[1]], [bot[0] + .75, bot[1]], [bot[0] - .75, bot[1]]]), { wash: col, fill: dk, fillOp: 40, ink: PAL.ink, sw: sw * .8 });
    paint(rectPts((bot[0] - 1) * s, bot[1] * s, 2 * s, 1.05 * s), { wash: GP.hoof, ink: PAL.ink, sw: sw * .6 });
  }
  // the tail, peeking out
  paint(ribbon(P([[-3.2, -8], [-5, -7], [-5.6, -4.4], [-5.2, -2.6]]), 1.4 * s, .5 * s), { wash: K.mane, ink: PAL.ink, sw: sw * .6 });
  // body (a tall barrel)
  paint(rrPts(-3.8 * s, -13.8 * s, 7.6 * s, 8.2 * s, 2.8 * s, J), { wash: col, fill: dk, fillOp: 45, tex: .6, ink: PAL.ink, sw });
  paint(ellPts(0, -9.6 * s, 2.3 * s, 2.8 * s, 16), { fill: lt, fillOp: 100, bleed: .1, tex: .7, ink: null });
  // forelegs = arms. Pivots at the shoulders (±3.6s, -12.4s). a = 0 out, + up; frontArm draws across the chest.
  const arm = (side) => {
    const which = side < 0 ? 'L' : 'R', a = which === 'L' ? (o.aL ?? -1.2) : (o.aR ?? -1.2);
    const len = 3.6 * (typeof o.armLen === 'object' ? (o.armLen[which] ?? 1) : (o.armLen ?? 1)) * (o.armLen ? .72 : 1);
    push(); translate(side * 3.6 * s, -12.4 * s); rotate(side < 0 ? a : -a);
    const ax = side < 0 ? -len * s : 0;
    paint(rectPts(ax, -.65 * s, len * s, 1.3 * s, J * .5), { wash: col, fill: dk, fillOp: 40, ink: PAL.ink, sw: sw * .8 });
    const hx = side < 0 ? -len * s : len * s;
    paint(rrPts(hx - .8 * s + (side < 0 ? -.3 * s : .3 * s), -.8 * s, 1.6 * s, 1.6 * s, .5 * s), { wash: GP.hoof, ink: PAL.ink, sw: sw * .6 });
    const hook = which === 'L' ? o.armL : o.armR;
    if (hook) { translate(hx, 0); if (side < 0) scale(-1, 1); hook(s * .8, sw); }
    pop();
  };
  const fa = o.frontArm || '';
  if (!fa.includes('L')) arm(-1); if (!fa.includes('R')) arm(1);
  // neck and the long face, looking at us
  paint(P([[-2, -13.4], [2, -13.4], [1.9, -16.2], [-1.9, -16.2]]), { wash: col, ink: PAL.ink, sw });
  for (const s_ of [-1, 1]) paint(ribbon(P([[s_ * 1.9, -16.6], [s_ * 2.5, -15], [s_ * 2.3, -13.6]]), .9 * s, .4 * s), { wash: K.mane, ink: null });
  const hy = -21.2;
  paint(rrPts(-2.5 * s, (hy - .4) * s, 5 * s, 8.2 * s, 2.1 * s, J), { wash: col, fill: dk, fillOp: 40, ink: PAL.ink, sw });
  paint(rrPts(-2.2 * s, (hy + 4.8) * s, 4.4 * s, 3 * s, 1.4 * s, J * .5), { wash: lt, ink: null });                         // muzzle
  if (K.star) horseStar(0, (hy + .6) * s, .95 * s, sw); else paint(P([[-.45, hy - .2], [.45, hy - .2], [.35, hy + 4.6], [-.35, hy + 4.6]]), { wash: GP.blaze, ink: null });   // star or blaze
  for (const s_ of [-1, 1]) {
    paint(P([[s_ * 1.2, hy], [s_ * 2.2, hy - 2.4], [s_ * 2.6, hy + .2]]), { wash: col, ink: PAL.ink, sw: sw * .6 });          // ears
    paint(ellPts(s_ * .9 * s, (hy + 6.6) * s, .35 * s, .25 * s, 8), { wash: GP.mane, ink: null });                            // nostrils
  }
  paint(ribbon(P([[-.8, hy - .5], [0, hy - .1], [.9, hy - .3]]), 1.1 * s, .5 * s), { wash: K.mane, ink: null });              // forelock
  // eyes (front view): deadpan lids, or shades
  if (o.shades) {
    for (const s_ of [-1, 1]) { paint(ellPts(s_ * 1.3 * s, (hy + 2.2) * s, 1.05 * s, .95 * s, 16), { wash: GP.lens, ink: null }); brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', GP.tort, sw * 1.3); brush.beginShape(0); for (const p of ellPts(s_ * 1.3 * s, (hy + 2.2) * s, 1.05 * s, .95 * s, 16)) brush.vertex(p[0], p[1]); brush.endShape(true); inkLine([[s_ * 1.3 * s - .5 * s, (hy + 1.9) * s], [s_ * 1.3 * s - .1 * s, (hy + 1.5) * s]], sw * .5, PAL.cream, 'inkfine', 0); }
    inkLine([[-.3 * s, (hy + 2.1) * s], [.3 * s, (hy + 2.1) * s]], sw * 1, GP.tort, 'ink', 0);
  } else for (const s_ of [-1, 1]) horseEye(s_ * 1.35 * s, (hy + 2.3) * s, s * .8, sw, t, { ...o, look: 'camera' });
  const m = o.mouthUp || (o.mood === 'joy' ? 'grin' : 'flat');
  if (m === 'grin') paint(P([[-1.3, hy + 7.4], [1.3, hy + 7.4], [.8, hy + 8], [-.8, hy + 8]]), { wash: '#4A1F2A', ink: PAL.ink, sw: sw * .5, curv: .4 });
  else inkLine(P([[-.9, hy + 7.6], [.9, hy + 7.6]]), sw * .7, PAL.ink, 'ink', 0);
  if (fa.includes('L')) arm(-1); if (fa.includes('R')) arm(1);
  pop();
}
