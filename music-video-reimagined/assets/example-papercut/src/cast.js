// cast.js: the band (six Clawds), the Ink, the Face, Great-Grand-Clawd's portrait, the paper dragonfly, ink ants,
// wallpaper eyes and the instruments. EVERY chapter draws its characters through these functions, so they stay on
// model: never re-draw a band member by hand.
//
//   member(name, x, y, u, o)     a band member; o = any clawd() options (feel/emotions/move/turn/pose...), plus
//                                 o.inst: false hides the instrument, o.mic: 'L'|'R'|false picks the mic hand
//   mood(name, t, keys, opts)    emotions() that keeps the member's own clay through mood cross-fades
//   mfeel(name, emo, t, over)    feel() with the member's clay
//   singing(t, style, k)         mouth/lid flaps for performing: style 'rap' | 'sing' | 'belt' | 'scream'
//   inkling(x, y, u, o)          the Ink: a Clawd of wet ink. o.of = a member name wears that member's silhouette
//                                 (hair, headphones...). o.red 0..1, o.grin 0..1, o.drip 0..1, o.eyes ('glow' default)
//   bigFace(cx, cy, s, t, o)     the Face: the Ink as a colossal face
//   portrait(x, y, s, t, o)      the ancestor portrait; o.stage: 'stern' | 'look' | 'grin' | 'bleed' | 'ink'
//   dragonfly(x, y, s, t, o)     the paper dragonfly
//   inkAnt(x, y, s, t, heading)  one ink ant
//   silPolys(name, x, y, u, o)   world-space silhouette polygons of a posed member (for cast shadows and masks)
//
// Sizes: member u as for Clawd (medium 20-28, close 40-70). Seated members sit with (x, y) on the couch seat.

// ---------- palette for the whole video ----------
const PC = {
  wall: '#E9D8B4', wall2: '#DFC99F', wallDk: '#B8966A', damask: '#43313F', rail: '#6B4A36', wains: '#5A3A2E', wainsLt: '#7A5240',
  floor: '#7A5238', floorLt: '#94694A', floorDk: '#5A3A28', rug: '#E9DFC8', rugDk: '#CDBF9F',
  oxblood: '#6E2B2F', oxbloodLt: '#8E3B3C', oxbloodDk: '#4A1A20', gold: '#D4A646', goldDk: '#9A7428', goldLt: '#F2D27A',
  brass: '#C99A45', lamp: '#FFD27A', shade: '#F4E3BC', shadeDk: '#D9BE8C', bronze: '#7A5A3A', bronzeLt: '#A8834F',
  // the Ink Side
  inkBg: '#15111F', inkWall: '#211A31', inkWall2: '#2A2140', chalk: '#D9CFB5', chalkDim: '#8E8570', inkDrip: '#0B0911',
  inkBody: '#221A31', inkBodyDk: '#120E1B', inkBodyLt: '#3A2F52', inkRim: '#6D5E92', mold: '#2D4845', eyeGlow: '#D8F0A0', red: '#FF4A3A',
  // skin tones and clothes
  silver: '#C9CDD6', plaid: '#B8322E', plaidDk: '#5E1B22', plaidHi: '#E7C45A'
};

// ---------- small drawing helpers ----------
const _P = (u, pts) => pts.map(([a, b]) => [a * u, b * u]);
// a horizontal band of cloth across the body between y0 and y1 (in u), wrapping round the side face in 3/4 views
function clothBand(u, V, J, y0, y1, colour, o = {}) {
  const L = (V.L + .06) * u, R = (V.R - .06) * u;
  const top = o.top || (x => y0), pts = [];
  for (let i = 0; i <= 8; i++) { const x = lerp(L, R, i / 8); pts.push([x, top(x / u) * u + jit(J * .3)]); }
  pts.push([R, y1 * u], [L, y1 * u]);
  paint(pts, { wash: colour, washOp: 255, fill: mixCol(colour, PAL.ink, .35), fillOp: 60, bleed: .05, tex: .7, border: .5, ink: null });
  if (V.strip) paint(rectPts(V.strip[0] * u, y0 * u - .3 * u, (V.strip[1] - V.strip[0]) * u, (y1 - y0) * u + .3 * u, J * .3), { fill: mixCol(colour, PAL.ink, .5), fillOp: 150, bleed: .03, tex: .6, border: .4, ink: null });
  return pts;
}
// the x range the face features occupy in a view (front-view x mapped through face cx / fw)
const faceX = (V, x) => V.face ? (V.face.cx + x * V.face.fw) : x;

// ---------- hair and headwear (drawn in hat space; C = colour scheme so the Ink can wear them too) ----------
const HAIR = {
  // Chester: short spiky bleach mohawk, red tips. Runs front-to-back, so it's wide in profile.
  mohawk(u, sw, V, C) {
    // a fin of bleached spikes with red tips; outlined along the top only, so it grows out of the head
    const side = V === VIEWS.side, w = side ? 4.2 : (V === VIEWS.q || V === VIEWS.qback) ? 2.0 : 1.55, n = side ? 7 : 5;
    const hs = [2.5, 3.3, 3.7, 3.2, 2.6, 3.0, 2.4], base = -7.65, tips = [], top = [[-w - .2, base - .15]];
    for (let i = 0; i < n; i++) {
      const x0 = lerp(-w, w, i / n), x1 = lerp(-w, w, (i + 1) / n), lean = side ? -.5 : (i - (n - 1) / 2) * .22, h = hs[i];
      const tp = [(x0 + x1) / 2 + lean, base - h];
      if (i > 0) top.push([x0, base - h * .42]);
      top.push(tp); tips.push([x0, x1, tp, h]);
    }
    top.push([w + .2, base - .15]);
    paint(_P(u, top.concat([[w + .1, base + .45], [-w - .1, base + .45]])), { wash: C.base, washOp: 255, ink: null });
    for (const [x0, x1, tp, h] of tips) {   // dyed tips: the top half of every spike
      const a = [lerp(x0, tp[0], .5) - .05, base - h * .52], b = [lerp(x1, tp[0], .5) + .05, base - h * .52];
      paint(_P(u, [a, tp, b]), { wash: C.tip, washOp: 255, ink: null });
    }
    for (const [x0, x1, tp, h] of tips) inkLine(_P(u, [[(x0 + x1) / 2 + .05, base + .2], [tp[0] * .92 + .02, tp[1] + h * .3]]), sw * .35, mixCol(C.base, '#8A6A30', .5), 'inkfine', .3);
    inkLine(_P(u, top), sw * .75, C.ink, 'ink', 0);
  },
  // Mike: spiky black hair all over, blue and red tips, swept a little
  spikes(u, sw, V, C) {
    const side = V === VIEWS.side, n = side ? 7 : 8, w = side ? 4.6 : 4.7, base = -7.7, P = [[-w - .3, base + .15]];
    const hs = [1.3, 1.9, 1.6, 2.1, 1.7, 2.0, 1.5, 1.2];
    const tipAt = i => { const x0 = lerp(-w, w, i / n), x1 = lerp(-w, w, (i + 1) / n), lean = side ? -.8 : (i - (n - 1) / 2) * .28; return [x0, x1, [(x0 + x1) / 2 + lean, base - hs[i]]]; };
    for (let i = 0; i < n; i++) { const [x0, x1, tp] = tipAt(i); P.push([x0, base - .3], tp, [x1, base - .3]); }
    P.push([w + .3, base + .15]);
    paint(_P(u, P), { wash: C.base, washOp: 255, fill: mixCol(C.base, '#5A5270', .5), fillOp: 60, tex: .5, ink: null });
    for (let i = 0; i < n; i++) {
      const [x0, x1, tp] = tipAt(i), a = [lerp(x0, tp[0], .62), lerp(base - .3, tp[1], .62)], b = [lerp(x1, tp[0], .62), lerp(base - .3, tp[1], .62)];
      paint(_P(u, [a, tp, b]), { wash: i % 2 ? C.tip2 : C.tip, washOp: 255, ink: null });
    }
    paint(_P(u, P), { ink: C.ink, sw: sw * .7 });
  },
  // Brad: a heather-grey hood (rounded, with a soft peak) framing the face, big headphones over it, curls peeking out
  hood(u, sw, V, C) {
    const back = V.back || V === VIEWS.qback, side = V === VIEWS.side;
    const outer = [[-5.35, -3.7], [-5.45, -7.4], [-4.6, -8.9], [-2.4, -9.6], [0, -9.85], [2.4, -9.6], [4.6, -8.9], [5.45, -7.4], [5.35, -3.7]];
    if (back) {
      paint(_P(u, outer.concat([[3, -3.3], [0, -3.0], [-3, -3.3]])), { wash: C.hood, washOp: 255, fill: mixCol(C.hood, PAL.ink, .3), fillOp: 60, tex: .6, ink: C.ink, sw: sw * .6, curv: .35 });
      inkLine(_P(u, [[0, -9.7], [0, -5.2]]), sw * .4, mixCol(C.hood, PAL.ink, .5), 'inkfine', .3);
    } else {
      // the hood: outer silhouette minus a rounded face opening, drawn as one ring-shaped band
      const inner = []; for (let i = 0; i <= 16; i++) { const a = Math.PI + i / 16 * Math.PI; inner.push([Math.cos(a) * (side ? 3.4 : 4.15), -5.6 + Math.sin(a) * 2.35]); }
      const ring = outer.concat([[4.15, -3.7]], inner.slice().reverse(), [[-4.15, -3.7]]);
      paint(_P(u, ring), { wash: C.hood, washOp: 255, fill: mixCol(C.hood, PAL.ink, .3), fillOp: 70, tex: .7, ink: C.ink, sw: sw * .6, curv: .3 });
      inkLine(_P(u, inner.slice(2, 15)), sw * .45, mixCol(C.hood, PAL.ink, .6), 'inkfine', .4);
      if (C.curl) for (let i = 0; i < 5; i++) {   // curls under the rim
        const cx = -2.2 + i * 1.1, cy = -7.55 + .25 * Math.abs(i - 2) * .5, sp = [];
        for (let k = 0; k < 11; k++) { const a = k * .85 + i, r = .1 + k * .045; sp.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r * .85]); }
        paint(ellPts(cx * u, cy * u, .5 * u, .42 * u, 10), { wash: C.curl, ink: null });
        inkLine(_P(u, sp), sw * .5, mixCol(C.curl, '#C9A27A', .5), 'inkfine', .5);
      }
    }
    // headphones: a thick band over the top, big cups at the sides
    inkLine(_P(u, [[-5.7, -6.2], [-5.4, -9.3], [0, -10.6], [5.4, -9.3], [5.7, -6.2]]), sw * 2.6, C.band, 'ink', .6);
    inkLine(_P(u, [[-4.9, -9.2], [0, -10.25], [4.9, -9.2]]), sw * .8, mixCol(C.band, '#FFFFFF', .25), 'inkfine', .6);
    for (const sd of [-1, 1]) {
      paint(rrPts((sd < 0 ? -6.7 : 5.0) * u, -7.9 * u, 1.7 * u, 3.2 * u, .75 * u), { wash: C.cup, washOp: 255, fill: mixCol(C.cup, PAL.ink, .4), fillOp: 70, tex: .5, ink: C.ink, sw: sw * .7 });
      paint(rrPts((sd < 0 ? -6.35 : 5.35) * u, -7.35 * u, 1.0 * u, 2.1 * u, .45 * u), { wash: C.cup2, washOp: 255, ink: null });
    }
  },
  // Rob: a shaggy dark mop; long uneven locks hang over the forehead
  shag(u, sw, V, C) {
    const L = -5.45, R = 5.45, P = [[L, -6.2]];
    const drop = [1.1, .5, 1.3, .6, 1.5, .7, 1.2, .5, 1.4, .6, 1.0];
    for (let i = 0; i <= 10; i++) P.push([lerp(L + .2, R - .2, i / 10), -7.9 + drop[i] * .95]);
    P.push([R, -6.2], [R + .1, -8.4], [4, -9.4], [1.5, -9.85], [-1.5, -9.8], [-4, -9.3], [L - .1, -8.4]);
    paint(_P(u, P), { wash: C.base, washOp: 255, fill: mixCol(C.base, '#8A6A50', .5), fillOp: 70, tex: .8, ink: C.ink, sw: sw * .65, curv: .45 });
    for (let i = 0; i < 7; i++) { const x = -4.2 + i * 1.4; inkLine(_P(u, [[x - .2, -9.4 + (i % 2) * .2], [x + .3, -8.5], [x + .05, -7.3 + drop[i + 2] * .5]]), sw * .45, mixCol(C.base, '#C9A27A', .45), 'inkfine', .5); }
  },
  // Joe: a short spiky black flat-top, DJ headphones worn one-ear: a cup on the left, the right one pushed back
  flattop(u, sw, V, C) {
    const n = 9, w = V === VIEWS.side ? 4 : 4.6, base = -7.8, P = [[-w - .2, base + .1]];
    for (let i = 0; i < n; i++) { const x0 = lerp(-w, w, i / n), x1 = lerp(-w, w, (i + 1) / n); P.push([x0, base - .75], [(x0 + x1) / 2, base - 1.35 - .15 * Math.sin(i * 2.1)], [x1, base - .75]); }
    P.push([w + .2, base + .1]);
    paint(_P(u, P), { wash: C.base, washOp: 255, fill: '#4A4458', fillOp: 60, tex: .5, ink: C.ink, sw: sw * .65 });
    if (C.phones === false) return;
    inkLine(_P(u, [[-5.2, -6.4], [-4.9, -8.9], [-1.5, -9.9], [2.2, -9.6], [4.4, -8.6]]), sw * 1.9, C.band || '#2B2833', 'ink', .6);
    paint(rrPts(-6.1 * u, -7.4 * u, 1.3 * u, 2.2 * u, .55 * u), { wash: C.cup || '#2B2833', fill: '#4A4458', fillOp: 60, ink: C.ink, sw: sw * .6 });
    paint(ellPts(4.9 * u, -8.3 * u, .75 * u, .5 * u, 12, 0, .5), { wash: C.cup || '#2B2833', ink: C.ink, sw: sw * .5 });
    paint(ellPts(-5.45 * u, -6.3 * u, .28 * u, .5 * u, 8), { wash: C.dot || '#D8392F', ink: null });
  },
  // Phoenix: a buzz cut: dark stubble hugging the top of the head
  buzz(u, sw, V, C) {
    const P = [[-5.08, -7.25], [-5.08, -7.95], [-4.2, -8.42], [0, -8.55], [4.2, -8.42], [5.08, -7.95], [5.08, -7.25], [3.5, -7.5], [0, -7.62], [-3.5, -7.5]];
    paint(_P(u, P), { wash: C.base, washOp: 235, fill: mixCol(C.base, PAL.ink, .4), fillOp: 90, tex: .95, border: .9, ink: null, curv: .3 });
    inkLine(_P(u, [[-5.08, -7.95], [-4.2, -8.42], [0, -8.55], [4.2, -8.42], [5.08, -7.95]]), sw * .6, C.ink, 'ink', .5);
    for (let i = 0; i < 26; i++) { const x = -4.7 + 9.4 * hash(i + 3), y = -8.35 + .9 * hash(i + 40); paint(ellPts(x * u, y * u, .07 * u, .07 * u, 5), { wash: mixCol(C.base, PAL.ink, .65), ink: null }); }
  }
};

// ---------- face pieces (face space: eyes at (±2.5u, -6u), mouth near (0, -4.3u)) ----------
function glasses(u, sw, F, C = { frame: PAL.ink, glint: PAL.cream }) {
  for (const s of F.sides) {
    const cx = s * 2.5;
    paint(rrPts((cx - 1.25) * u, -7.15 * u, 2.5 * u, 2.1 * u, .35 * u), { ink: C.frame, sw: sw * 1.25 });
    inkLine(_P(u, [[cx - .9, -6.15], [cx - .35, -6.85]]), sw * .5, C.glint, 'inkfine', 0);
  }
  if (F.sides.length > 1) {
    inkLine(_P(u, [[-1.15, -6.55], [0, -6.8], [1.15, -6.55]]), sw * 1.1, C.frame, 'ink', .5);
    for (const s of [-1, 1]) inkLine(_P(u, [[s * 3.85, -6.7], [s * 5.4, -6.8]]), sw * 1.1, C.frame, 'ink', 0);
  } else inkLine(_P(u, [[1.15, -6.7], [-3.5, -6.8]]), sw * 1.1, C.frame, 'ink', 0);   // profile: the arm runs back
}

// ---------- the band ----------
// Each member: colours, proportions, legs, sleeves, outfit, hair, face pieces, instrument.
const BAND = {
  chester: {
    col: '#DC7B59', dk: '#A84D33', lt: '#F5B394', sx: .93, sy: 1.07,
    legCol: PC.plaid, legFar: '#8A2426',
    legPat(x, y, w, h, isFar, u, sw) {   // red tartan
      const c = isFar ? '#4A151B' : PC.plaidDk;
      for (const k of [.3, .68]) paint(rectPts(x, y + h * k, w, h * .12), { wash: c, washOp: 200, ink: null });
      paint(rectPts(x + w * .42, y, w * .18, h), { wash: c, washOp: 170, ink: null });
      inkLine([[x + w * .15, y + h * .5], [x + w * .9, y + h * .5]], sw * .25, PC.plaidHi, 'inkfine', 0);
    },
    armDeco(u, sw, which) {   // flame tattoos on bare arms
      const P = [[.35, .38], [.55, -.05], [.75, .2], [.95, -.3], [1.15, .1], [1.35, -.22], [1.55, .38]];
      paint(_P(u, P), { wash: '#2F5E86', washOp: 220, ink: null, curv: .4 });
      inkLine(_P(u, [[.5, .3], [.8, 0], [1.1, .25]]), sw * .3, '#9FC4DE', 'inkfine', .5);
    },
    outfit(u, sw, V, J, jaw) {   // black tank top with a scooped neck
      const y0 = jaw != null ? Math.max(-3.75, jaw / u + .1) : -3.75;
      clothBand(u, V, J, y0, -2.02, '#2A2530', { top: x => y0 + .45 * Math.max(0, 1 - Math.pow((x - faceX(V, 0)) / 2.2, 2)) });
    },
    head: (u, sw, V) => HAIR.mohawk(u, sw, V, { base: '#F5E4A8', tip: '#E2412F', ink: PAL.ink }),
    face(u, sw, F, V, lid, noGlasses) {
      if (!noGlasses) glasses(u, sw, F);
      if (!lid && (F.sides.length > 1 || F === VIEWS.side.face)) {   // lip ring
        const rx = F.sides.length > 1 ? .45 : 1.9;
        brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('inkfine', PC.silver, sw * .7);
        brush.beginShape(0); for (const p of ellPts(rx * u, -3.72 * u, .22 * u, .22 * u, 10)) brush.vertex(p[0], p[1]); brush.endShape(true);
      }
    },
    mic: 'R'
  },
  mike: {
    col: '#D6724F', dk: '#A0472D', lt: '#F2AA88', sx: 1, sy: 1,
    legCol: '#6D6B47', legFar: '#4E4D33', sleeve: .55, armCol: '#35323D',
    armDeco(u, sw) {   // studded wristband
      paint(rectPts(1.55 * u, -.55 * u, .42 * u, 1.1 * u), { wash: '#26222C', ink: null });
      for (const k of [-.3, 0, .3]) paint(ellPts(1.76 * u, k * u, .09 * u, .09 * u, 6), { wash: PC.silver, ink: null });
    },
    outfit(u, sw, V, J) {   // charcoal button-up with a collar
      clothBand(u, V, J, -3.8, -2.02, '#35323D');
      if (V.face) {
        const cx = faceX(V, 0), fw = V.face.fw;
        for (const s of [-1, 1]) paint(_P(u, [[cx + s * .12 * fw, -3.82], [cx + s * 1.75 * fw, -3.86], [cx + s * 1.55 * fw, -3.5], [cx + s * .3 * fw, -2.9]]), { wash: '#56525F', ink: PAL.ink, sw: sw * .4 });
        inkLine(_P(u, [[cx, -3.0], [cx, -2.05]]), sw * .45, PAL.ink, 'inkfine', 0);
        for (const k of [-2.9, -2.4]) paint(ellPts((cx + .25) * u, k * u, .1 * u, .1 * u, 6), { wash: PC.silver, ink: null });
      }
    },
    head: (u, sw, V) => HAIR.spikes(u, sw, V, { base: '#231D2B', tip: '#3F76E0', tip2: '#D8392F', ink: PAL.ink }),
    face(u, sw, F) {   // stud earrings at the body's edges
      if (F.sides.length > 1) for (const s of [-1, 1]) paint(ellPts(s * 5.05 * u, -5.1 * u, .16 * u, .16 * u, 8), { wash: PC.silver, ink: PAL.ink, sw: sw * .3 });
    },
    mic: 'R'
  },
  brad: {
    col: '#E08A66', dk: '#AD5838', lt: '#F7BC9C', sx: 1.05, sy: .97,
    legCol: '#3E4A6A', legFar: '#2C3550', sleeve: .88, armCol: '#9A9AA2',
    outfit(u, sw, V, J) {   // heather-grey hoodie: pocket and drawstrings
      clothBand(u, V, J, -3.9, -2.02, '#9A9AA2');
      if (V.face) {
        const cx = faceX(V, 0), fw = V.face.fw;
        inkLine(_P(u, [[cx - 2 * fw, -2.1], [cx - 1.6 * fw, -3.0], [cx + 1.6 * fw, -3.0], [cx + 2 * fw, -2.1]]), sw * .5, '#6A6A74', 'inkfine', 0);
        for (const s of [-1, 1]) inkLine(_P(u, [[cx + s * .7 * fw, -3.85], [cx + s * .8 * fw, -3.0]]), sw * .5, PAL.cream, 'inkfine', 0);
      }
    },
    head: (u, sw, V) => HAIR.hood(u, sw, V, { hood: '#9A9AA2', band: '#2B2833', cup: '#C73A3A', cup2: '#2B2833', curl: '#3A2A22', ink: PAL.ink }),
    mic: false
  },
  rob: {
    col: '#CC6B4B', dk: '#98462D', lt: '#EDA383', sx: 1.1, sy: .95,
    legCol: '#4A4652', legFar: '#34313B', sleeve: .5, armCol: '#6B4E9A',
    outfit(u, sw, V, J) {   // violet collared shirt
      clothBand(u, V, J, -3.75, -2.02, '#6B4E9A');
      if (V.face) {
        const cx = faceX(V, 0), fw = V.face.fw;
        for (const s of [-1, 1]) paint(_P(u, [[cx + s * .12 * fw, -3.77], [cx + s * 1.8 * fw, -3.8], [cx + s * 1.6 * fw, -3.45], [cx + s * .3 * fw, -2.95]]), { wash: '#8A70BA', ink: PAL.ink, sw: sw * .4 });
        for (const k of [-2.85, -2.35]) paint(ellPts(cx * u, k * u, .1 * u, .1 * u, 6), { wash: PAL.cream, ink: null });
      }
    },
    head: (u, sw, V) => HAIR.shag(u, sw, V, { base: '#4A3326', ink: PAL.ink }),
    face(u, sw, F) {   // goatee
      if (!F) return;
      paint(_P(u, [[-.55, -3.72], [.55, -3.72], [0, -2.95]]), { wash: '#4A3326', ink: null });
    },
    mic: false
  },
  joe: {
    col: '#D97757', dk: '#A84D33', lt: '#F2A283', sx: .98, sy: .95,
    legCol: '#2E2A33', legFar: '#1F1C24', sleeve: .5, armCol: '#8E2F3A',
    outfit(u, sw, V, J, jaw, col) {   // maroon shirt with an open V collar
      clothBand(u, V, J, -3.8, -2.02, '#8E2F3A');
      if (V.face) {
        const cx = faceX(V, 0), fw = V.face.fw;
        paint(_P(u, [[cx - .7 * fw, -3.82], [cx + .7 * fw, -3.82], [cx, -2.95]]), { wash: col || PAL.clay, ink: null });
        for (const s of [-1, 1]) paint(_P(u, [[cx + s * .1 * fw, -3.0], [cx + s * .75 * fw, -3.85], [cx + s * 1.6 * fw, -3.85], [cx + s * 1.1 * fw, -3.25]]), { wash: '#A8404A', ink: PAL.ink, sw: sw * .4 });
      }
    },
    head: (u, sw, V) => HAIR.flattop(u, sw, V, { base: '#231D2B', ink: PAL.ink }),
    mic: false
  },
  phoenix: {
    col: '#D98062', dk: '#A65236', lt: '#F4B094', sx: .95, sy: 1.1,
    legCol: '#8C7A5A', legFar: '#6A5B42', sleeve: .88, armCol: '#6A4A36',
    outfit(u, sw, V, J) {   // brown knit sweater, a red stripe across the chest
      clothBand(u, V, J, -3.95, -2.02, '#6A4A36');
      paint(rectPts((V.L + .1) * u, -3.45 * u, (V.R - V.L - .2) * u, .42 * u, J * .2), { wash: '#B8352E', washOp: 255, ink: null });
      for (let i = 0; i < 12; i++) { const x = lerp(V.L + .5, V.R - .5, i / 11); inkLine([[x * u, -2.9 * u], [x * u, -2.45 * u]], sw * .3, '#4A3024', 'inkfine', 0); }
    },
    head: (u, sw, V) => HAIR.buzz(u, sw, V, { base: '#3A2E2A', ink: PAL.ink }),
    face(u, sw, F) { paint(_P(u, [[-.5, -3.75], [.5, -3.75], [0, -3.1]]), { wash: '#3A2E2A', ink: null }); },
    mic: false
  }
};
const MEMBERS = ['chester', 'mike', 'brad', 'rob', 'joe', 'phoenix'];
const baseCols = name => ({ col: BAND[name].col, dk: BAND[name].dk, lt: BAND[name].lt });

// A member's options for clawd(): the design plus the pose. Hooks the caller passes (draw, armL, armR) are kept.
function memberOpts(name, o = {}) {
  const M = BAND[name];
  const q = { ...baseCols(name), ...o };
  q.sx = (o.sx ?? 1) * M.sx; q.sy = (o.sy ?? 1) * M.sy;
  for (const k of ['legCol', 'legFar', 'legPat', 'armCol', 'sleeve', 'armDeco', 'outfit', 'head']) if (q[k] === undefined) q[k] = M[k];
  if (M.face) { const f0 = o.face, noG = o.glasses === false; q.face = (u, sw, F, V, lid) => { M.face(u, sw, F, V, lid, noG); if (f0) f0(u, sw, F, V, lid); }; }
  const micSide = o.mic ?? M.mic, V = VIEWS[o.view] || VIEWS.front, backish = V.back || V === VIEWS.qback;
  if (micSide && o.inst !== false) {
    const k = micSide === 'L' ? 'armL' : 'armR', ak = micSide === 'L' ? 'aL' : 'aR', h0 = o[k];
    const atMouth = (o.micAt ?? 'mouth') === 'mouth' && V === VIEWS.front;
    if (atMouth) { q.frontArm = micSide; q[ak] = Math.PI - .14 + (o.micBob ?? 0); }
    const a = q[ak] ?? .2, ang = atMouth ? .05 : Math.PI / 2 - a;
    q[k] = (u, sw) => { micProp(u, sw, name, ang); if (h0) h0(u, sw); };
  }
  if (o.inst !== false && !backish && (name === 'brad' || name === 'phoenix')) {
    const d0 = o.draw, strum = o.strum ?? 0;
    q.draw = (u, sw) => { (name === 'brad' ? guitarProp : bassProp)(u, sw, strum, q); if (d0) d0(u, sw); };
    if (o.aL === undefined) q.aL = -1.1; if (o.aR === undefined) q.aR = -1.2;
  }
  return q;
}
function member(name, x, y, u, o = {}) { clawd(x, y, u, memberOpts(name, o)); }
const mood = (name, t, keys, opts = {}) => emotions(t, keys, { ...opts, base: baseCols(name) });
const mfeel = (name, emo, t, over = {}) => feel(emo, t, { ...baseCols(name), ...over });

// Mouth flaps for performing: 'rap' (fast, syllabic), 'sing' (held vowels), 'belt' (big), 'scream' (the lid opens).
// k 0..1 scales the energy. Returns { mouth, lid } to spread into member().
function singing(t, style = 'sing', k = 1) {
  const e = Math.floor((t - OFF) / EIGHTH * (style === 'rap' ? 2 : 1)), h = hash(e * 7.3 + 1);
  if (style === 'rap') return { mouth: h < .18 ? 'flat' : h < .45 ? 'open' : h < .7 ? 'o' : h < .85 ? 'sing' : 'O' };
  if (style === 'sing') return { mouth: h < .2 ? 'O' : h < .75 ? 'sing' : 'open' };
  if (style === 'belt') return { mouth: h < .25 ? 'sing' : 'belt' };
  if (style === 'scream') return { mouth: null, lid: clamp(.32 + .12 * k + .06 * Math.sin(t * 40)) };
  return {};
}

// ---------- instruments and props held by the band ----------
function micProp(u, sw, who, ang = 0) {   // handheld mic at the arm tip; ang turns it (see memberOpts)
  push(); rotate(-ang);
  paint(rrPts(-.3 * u, -.24 * u, 1.3 * u, .48 * u, .2 * u), { wash: who === 'chester' ? '#3A3440' : '#2B2833', ink: PAL.ink, sw: sw * .6 });
  paint(ellPts(1.45 * u, 0, .58 * u, .58 * u, 12), { wash: PC.silver, fill: '#8A8FA0', fillOp: 90, tex: .6, ink: PAL.ink, sw: sw * .6 });
  for (const k of [-.28, 0, .28]) inkLine([[1.45 * u + k * u, -.46 * u], [1.45 * u + k * u, .46 * u]], sw * .3, '#6A6F80', 'inkfine', 0);
  pop();
}
// Acoustic guitar across the body (body space). strum 0..1 drives the strumming nub.
function guitarProp(u, sw, strum, o, bass = false) {
  push(); translate(1.4 * u, -3.4 * u); rotate(-.32);
  const L = bass ? 9.2 : 7.6, bw = bass ? 3.2 : 2.8;
  // neck and headstock (to the left)
  paint(rectPts(-L * u, -.32 * u, (L - 1) * u, .64 * u, u * .03), { wash: '#5A3A24', ink: PAL.ink, sw: sw * .6 });
  for (let i = 1; i < 6; i++) inkLine([[(-L + i * 1.2) * u, -.32 * u], [(-L + i * 1.2) * u, .32 * u]], sw * .3, PC.silver, 'inkfine', 0);
  paint(_P(u, [[-L - 1.6, -.55], [-L, -.36], [-L, .36], [-L - 1.6, .55]]), { wash: '#3A2418', ink: PAL.ink, sw: sw * .6 });
  for (let i = 0; i < (bass ? 2 : 3); i++) for (const s of [-1, 1]) paint(ellPts((-L - .4 - i * .5) * u, s * .72 * u, .16 * u, .16 * u, 6), { wash: PC.silver, ink: null });
  // body: two lobes, sunburst
  const body = []; for (let i = 0; i < 32; i++) { const a = i / 32 * TAU, x = Math.cos(a), lobe = x < 0 ? .78 : 1; body.push([(x * (x < 0 ? 1.55 : 1.9) + (x < 0 ? -.2 : .3)) * u * (bass ? 1.12 : 1), Math.sin(a) * bw * .5 * u * lobe]); }
  paint(body, { wash: bass ? '#E2BE84' : '#E0A040', fill: bass ? '#A8784A' : '#6A2A12', fillOp: bass ? 110 : 170, bleed: .1, tex: .6, border: .9, ink: PAL.ink, sw: sw * .8 });
  if (bass) { brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('inkfine', '#4A2A18', sw * 1.2); brush.beginShape(0); for (const p of body) brush.vertex(p[0] * .93, p[1] * .9); brush.endShape(true); }
  paint(ellPts(-.25 * u, 0, .62 * u, .62 * u, 14), { wash: '#2A1A14', ink: PAL.ink, sw: sw * .5 });
  paint(rectPts(.95 * u, -.55 * u, .3 * u, 1.1 * u), { wash: '#2A1A14', ink: null });
  for (let i = 0; i < (bass ? 4 : 6); i++) { const y = (-.24 + i * (bass ? .16 : .096)) * u; inkLine([[-L * u, y], [1.1 * u, y]], sw * .18, '#E8E2D0', 'inkfine', 0); }
  pop();
  // the strumming and fretting nubs, on top of the guitar
  const s = Math.sin(strum * Math.PI * 2);
  paint(rrPts((1.6 + .15 * s) * u, (-4.1 + .55 * s) * u, 1.3 * u, 1.0 * u, .4 * u), { wash: o.col || PAL.clay, ink: PAL.ink, sw: sw * .6 });
  paint(rrPts(-4.7 * u, (-6.1 - (bass ? .25 : 0)) * u, 1.0 * u, 1.1 * u, .4 * u), { wash: o.col || PAL.clay, ink: PAL.ink, sw: sw * .6 });
}
const bassProp = (u, sw, strum, o) => guitarProp(u, sw, strum, o, true);
// A drumstick held at an arm tip (arm hook). swing: extra angle.
const stickHook = (swing = 0) => (u, sw) => { push(); rotate(-.9 - swing); inkLine([[0, 0], [3.4 * u, 0]], sw * 1.6, '#E7D3A8', 'ink', 0); paint(ellPts(3.5 * u, 0, .22 * u, .18 * u, 8), { wash: '#E7D3A8', ink: PAL.ink, sw: sw * .4 }); pop(); };

// Chester's glasses held in a hand (arm hook), e.g. armR: glassesProp
function glassesProp(u, sw) {
  push(); rotate(-.3);
  for (const dx of [.4, 3.2]) paint(rrPts(dx * u, -.9 * u, 2.4 * u, 2 * u, .35 * u), { ink: PAL.ink, sw: sw * 1.2 });
  inkLine([[2.8 * u, -.3 * u], [3.2 * u, -.3 * u]], sw, PAL.ink, 'ink', 0);
  inkLine([[1 * u, -.5 * u], [1.5 * u, -.1 * u]], sw * .4, PAL.cream, 'inkfine', 0);
  pop();
}

// ---------- the Ink ----------
// A Clawd of wet ink. o.of = member name wears that member's hair / headwear as an ink silhouette.
function inkling(x, y, u, o = {}) {
  const of = o.of && BAND[o.of], red = clamp(o.red || 0);
  const base = { col: PC.inkBody, dk: PC.inkBodyDk, lt: PC.inkBodyLt, inkCol: PC.inkRim, eyes: red > .5 ? 'glowRed' : 'glow', mouth: o.grin > .3 ? 'jag' : null, legCol: PC.inkBodyDk, legFar: '#0C0912', mouthCol: '#3A0C12' };
  const q = { ...base, ...o, red };
  if (of) {
    q.sx = (o.sx ?? 1) * of.sx; q.sy = (o.sy ?? 1) * of.sy;
    const C = { base: PC.inkBodyDk, tip: red > .5 ? '#7A1E24' : '#3A2F52', tip2: '#3A2F52', hood: PC.inkBodyDk, band: '#0B0911', cup: '#2A2140', cup2: '#0B0911', curl: null, ink: PC.inkRim };
    const hairKind = { chester: 'mohawk', mike: 'spikes', brad: 'hood', rob: 'shag', joe: 'flattop', phoenix: 'buzz' }[o.of];
    const h0 = o.head; q.head = (u, sw, V, lid) => { HAIR[hairKind](u, sw, V, C); if (h0) h0(u, sw, V, lid); };
    if (o.of === 'chester' && o.glasses !== false) { const f0 = o.face; q.face = (u, sw, F, V, lid) => { glasses(u, sw, F, { frame: '#0B0911', glint: '#8E7FAF' }); if (f0) f0(u, sw, F, V, lid); }; }
  }
  const d0 = o.draw, drip = o.drip ?? .6;
  q.draw = (u, sw) => {   // hanging drips along the bottom edge, each on its own slow clock
    if (drip > .02) for (let i = 0; i < 5; i++) {
      const dx = -4 + i * 2 + .4 * hash(i + 3), ph = frac(T * (.35 + .2 * hash(i)) + hash(i + 9)), len = (.4 + 1.6 * ph) * drip * u;
      paint(_P(u, [[dx - .3, -2.3], [dx + .3, -2.3], [dx + .12, -2.3 + len / u], [dx, -2.1 + len / u + .15], [dx - .12, -2.3 + len / u]]), { wash: PC.inkBody, ink: null, curv: .5 });
      if (ph > .8) paint(ellPts(dx * u, (-2.0 + 1.9 * drip + (ph - .8) * 6) * u, .16 * u, .22 * u, 8), { wash: PC.inkBody, ink: null });
    }
    if (d0) d0(u, sw);
  };
  clawd(x, y, u, q);
}

// ---------- the Face: the Ink as a colossal face ----------
// (cx, cy) = centre of the face, s = size (the head is ~20s wide, eyes ~5s tall). o.open 0..1 eyes, o.lookX/lookY,
// o.grin 0..1 (a thin papercut smile), o.scream 0..1 (the smile tears wide: teeth, red inside), o.red 0..1 (eyes).
function bigFace(cx, cy, s, t, o = {}) {
  const red = clamp(o.red || 0), op = clamp(o.open ?? 1), W2 = 10 * s, top = cy - 7.5 * s, sw = clamp(s / 10, .7, 3);
  boilSeed('face body');
  const P = [[cx - W2, cy + 11 * s]];   // the head: a huge block with rounded top corners; the bottom melts into drips
  for (let i = 0; i <= 8; i++) { const a = Math.PI + i / 8 * Math.PI / 2; P.push([cx - W2 + 2.2 * s + Math.cos(a) * 2.2 * s, top + 2.2 * s + Math.sin(a) * 2.2 * s]); }
  for (let i = 0; i <= 8; i++) { const a = 1.5 * Math.PI + i / 8 * Math.PI / 2; P.push([cx + W2 - 2.2 * s + Math.cos(a) * 2.2 * s, top + 2.2 * s + Math.sin(a) * 2.2 * s]); }
  P.push([cx + W2, cy + 11 * s]);
  for (let i = 0; i <= 12; i++) {   // drips hanging off the bottom edge, slowly stretching
    const x = cx + W2 - 2 * W2 * i / 12, d = s * (1.2 + 3.5 * hash(i + 17)) * (1 + .25 * Math.sin(t * 1.1 + i * 1.7));
    if (i % 2) P.push([x + s * .4, cy + 11 * s], [x, cy + 11 * s + d], [x - s * .4, cy + 11 * s]); else P.push([x, cy + 11 * s + s * .3]);
  }
  paint(P, { wash: PC.inkBody, fill: PC.inkBodyLt, fillOp: 80, bleed: .12, tex: .85, border: .7, ink: PC.inkRim, sw: sw * 1.2 });
  paint(ellPts(cx - 3 * s, top + 3.2 * s, 6 * s, 2 * s, 20), { fill: PC.inkBodyLt, fillOp: 90, bleed: .25, tex: .8, ink: null });   // a sheen
  // eyes: two tall slits that open like doors
  boilSeed('face eyes');
  for (const sd of [-1, 1]) {
    const ex = cx + sd * 4.8 * s + (o.lookX || 0) * s * 1.2, ey = cy - 1.8 * s + (o.lookY || 0) * s, h = 5.4 * s * op, w = 2 * s;
    if (h < s * .2) { inkLine([[ex - w, ey], [ex + w, ey]], sw * 1.4, PC.inkRim, 'ink', 0); continue; }
    glow(ex, ey, 8 * s, red > .5 ? '#FF3B2E' : '#D8F0A0', .55 + .4 * op);
    paint(rectPts(ex - w / 2, ey - h / 2, w, h, s * .06), { wash: mixCol('#F4EDC9', '#FF5A43', red), fill: red > .5 ? '#FF7A5A' : '#FFFBE0', fillOp: 90, bleed: .05, ink: null });
    paint(rectPts(ex - w * .2, ey - h * .34, w * .34, h * .52), { wash: mixCol('#FFFFF4', '#FFD0B8', red), washOp: 230, ink: null });
  }
  // the mouth: a papercut smile (a thin bright slit) that can tear open into a scream
  boilSeed('face mouth');
  const g = clamp(o.grin || 0), sc = clamp(o.scream || 0);
  if (g > .02 || sc > .02) {
    const mw = lerp(5.5 * g, 7.5, sc) * s, my = cy + 4.2 * s, lift = 1.6 * s * (1 - sc * .7), open = lerp(.22, 4.2, sc) * s, N = 18, Up = [], Dn = [];
    for (let i = 0; i <= N; i++) {   // a smile: corners high, middle low; opens downward as it screams
      const k = i / N, x = cx - mw + 2 * mw * k, ym = my + lift * (1 - Math.pow(2 * k - 1, 2)), b = Math.sin(k * Math.PI);
      Up.push([x, ym - open * .25 * b]); Dn.push([x, ym + open * b]);
    }
    const M = Up.concat(Dn.slice().reverse());
    if (sc > .1) glow(cx, my + open * .3, mw * 1.4, '#FF3B2E', .9 * sc);
    paint(M, { wash: sc > .1 ? mixCol('#2A0A10', '#B8201C', .45 * sc) : '#FFF6DA', ink: sc > .1 ? PC.inkRim : null, sw: sw * .8 });
    if (sc <= .1) glow(cx, my + lift * .6, mw, '#FFF3C0', .35 * g);
    if (sc > .1) for (let i = 1; i < 12; i++) {   // teeth, top and bottom
      const k = i / 12, up = Up[Math.round(k * N)], dn = Dn[Math.round(k * N)], th = open * .3 * Math.sin(k * Math.PI) + s * .2;
      paint([[up[0] - s * .5, up[1] - s * .1], [up[0] + s * .5, up[1] - s * .1], [up[0], up[1] + th]], { wash: '#F1E8C8', ink: null });
      paint([[dn[0] - s * .45, dn[1] + s * .1], [dn[0] + s * .45, dn[1] + s * .1], [dn[0], dn[1] - th * .8]], { wash: '#F1E8C8', ink: null });
    }
  }
}

// ---------- Great-Grand-Clawd: the ancestor portrait ----------
// (x, y) = centre of the frame, s = scale (the frame is about 300s x 380s). o.stage: 'stern' (eyes ahead), 'look'
// (eyes follow o.lookX), 'grin', 'bleed' (a papercut across the face, ink tears), 'ink' (the Ink sits in the frame,
// ruff and all). o.lookX/-Y aim the eyes. o.swing rotates the frame on its nail.
function portrait(x, y, s, t, o = {}) {
  const st = o.stage || 'stern';
  push(); translate(x, y - 190 * s); rotate(o.swing || 0); translate(0, 190 * s);
  boilSeed('portrait frame');
  inkLine([[-40 * s, -190 * s], [0, -240 * s], [40 * s, -190 * s]], .7, PAL.ink, 'inkfine', .2);   // the cord on its nail
  paint(ellPts(0, -240 * s, 5 * s, 5 * s, 8), { wash: PC.brass, ink: PAL.ink, sw: .4 });
  paint(rrPts(-150 * s, -190 * s, 300 * s, 380 * s, 22 * s), { wash: PC.gold, fill: PC.goldDk, fillOp: 140, bleed: .08, tex: .8, border: .7, ink: PAL.ink, sw: 1.1 });
  paint(rrPts(-128 * s, -168 * s, 256 * s, 336 * s, 14 * s), { wash: PC.goldLt, fill: PC.gold, fillOp: 120, bleed: .05, tex: .6, ink: PAL.ink, sw: .6 });
  for (const [cx, cy] of [[-138, -178], [138, -178], [-138, 178], [138, 178]]) paint(starPts(cx * s, cy * s, 22 * s, .4, 4, Math.PI / 4), { wash: PC.goldLt, ink: PAL.ink, sw: .5 });
  // the canvas: a dark olive oil-painting ground
  boilSeed('portrait canvas');
  paint(rectPts(-112 * s, -152 * s, 224 * s, 304 * s), { wash: st === 'ink' ? '#1E1A28' : '#3B3A2A', fill: st === 'ink' ? '#2A2140' : '#5A5238', fillOp: 120, bleed: .2, tex: .9, border: .8, ink: PAL.ink, sw: .5 });
  if (st !== 'ink') paint(ellPts(0, -30 * s, 100 * s, 120 * s, 20), { fill: '#7A6E4A', fillOp: 70, bleed: .3, tex: .7, ink: null });
  // the sitter
  const u = 15 * s, sitter = st === 'ink'
    ? { col: PC.inkBody, dk: PC.inkBodyDk, lt: PC.inkBodyLt, inkCol: PC.inkRim, eyes: 'glow', mouth: o.grin ? 'jag' : null }
    : { col: '#E3C7AE', dk: '#B8957A', lt: '#F5E6D6', eyes: st === 'grin' ? 'narrow' : 'normal', mouth: st === 'grin' ? 'grin' : null, lookX: st === 'stern' ? 0 : (o.lookX || 0), lookY: o.lookY || 0 };
  clawd(0, 118 * s, u, { ...sitter, noLegs: true, noShadow: true, aL: -1.2, aR: -1.2, seed: 5, boilKey: 'portrait sitter',
    draw: (u, sw) => {   // the ruff collar
      const R = []; for (let i = 0; i < 24; i++) { const a = Math.PI * (i / 23); R.push([Math.cos(a) * 6 * u, -2.2 * u + Math.sin(a) * 1.7 * u * (i % 2 ? .7 : 1)]); }
      paint(R.concat([[-6 * u, -2.2 * u]]), { wash: st === 'ink' ? '#3A2F52' : '#F3EEE0', ink: PAL.ink, sw: sw * .5 });
      for (let i = 0; i < 8; i++) { const a = Math.PI * (i / 7 * .9 + .05); inkLine([[0, -2.2 * u], [Math.cos(a) * 5.4 * u, -2.2 * u + Math.sin(a) * 1.4 * u]], sw * .3, '#9A9384', 'inkfine', 0); }
    } });
  if (st === 'bleed') {   // a papercut across the face, ink tears running down the canvas
    boilSeed('portrait cut');
    const a = [-85 * s, -40 * s], b = [85 * s, -95 * s];
    paint(slitPts(a, b, 7 * s), { wash: PC.inkBg, ink: null });
    inkLine([a, b], .5, PAL.cream, 'inkfine', 0);
    for (let i = 0; i < 3; i++) {
      const tx = lerp(a[0], b[0], .25 + i * .25), ty = lerp(a[1], b[1], .25 + i * .25), len = (70 + 120 * hash(i + 2)) * s * clamp(o.bleedK ?? 1);
      if (len < 4 * s) continue;
      paint(ribbon([[tx, ty], [tx + 6 * s, ty + len * .35], [tx - 5 * s, ty + len * .7], [tx + 2 * s, ty + len]], 13 * s, 7 * s), { wash: PC.inkBody, ink: null });
      paint(ellPts(tx + 2 * s, ty + len + 3 * s, 7 * s, 9 * s, 10), { wash: PC.inkBody, ink: null });
    }
  }
  pop();
}

// ---------- the paper dragonfly ----------
// (x, y) centre, s scale (~1 = 110 px wingspan). o.rot heading (radians, 0 = flying right), o.flap 0..1 wing energy.
function dragonfly(x, y, s, t, o = {}) {
  boilSeed('dragonfly');
  push(); translate(x, y); rotate(o.rot || 0);
  const fl = (o.flap ?? 1) * Math.sin(t * 60), sw = clamp(s * .6, .3, 1.2);
  for (const [dx, sy, ph] of [[-6, 1, 0], [6, 1, .6], [-6, -1, .3], [6, -1, .9]]) {
    const ang = sy * (.35 + .4 * Math.sin(t * 60 + ph * 3) * (o.flap ?? 1));
    push(); translate(dx * s, 0); rotate(ang);
    const Wg = [[0, 0], [8 * s, -30 * s * sy], [2 * s, -52 * s * sy], [-6 * s, -34 * s * sy]];
    paint(Wg, { wash: PAL.cream, washOp: 225, ink: PAL.ink, sw: sw * .5, curv: .6 });
    inkLine([[0, 0], [2 * s, -40 * s * sy]], sw * .3, '#B8AE98', 'inkfine', .3);
    inkLine([[-2 * s, -18 * s * sy], [5 * s, -26 * s * sy]], sw * .25, '#B8AE98', 'inkfine', 0);
    pop();
  }
  paint(ribbon([[-40 * s, 0], [-20 * s, 0], [0, 0], [10 * s, 0]], 4 * s, 7 * s), { wash: '#F2E6CC', ink: PAL.ink, sw: sw * .5 });
  paint(ellPts(15 * s, 0, 7 * s, 6 * s, 10), { wash: '#F2E6CC', ink: PAL.ink, sw: sw * .5 });
  for (const e of [-1, 1]) paint(ellPts(18 * s, e * 3.2 * s, 2.2 * s, 2.2 * s, 6), { wash: PAL.ink, ink: null });
  for (let i = 1; i < 5; i++) inkLine([[-i * 8 * s, -2.5 * s], [-i * 8 * s, 2.5 * s]], sw * .3, '#B8AE98', 'inkfine', 0);
  pop();
}

// ---------- ink ants ----------
function inkAnt(x, y, s, t, heading = 0) {
  push(); translate(x, y); rotate(heading);
  const w = Math.sin(t * 30 + x * .1) * .5;
  for (const k of [-1, 0, 1]) for (const sd of [-1, 1]) inkLine([[k * 3 * s, 0], [k * 3 * s + (2 + w * sd * k) * s, sd * 5 * s]], clamp(s * .35, .2, .8), PC.inkDrip, 'inkfine', 0);
  for (const [dx, r] of [[-5, 2.6], [0, 2.2], [4.5, 2.4]]) paint(ellPts(dx * s, 0, r * s, r * .8 * s, 8), { wash: PC.inkDrip, ink: null });
  pop();
}

// ---------- silhouettes (world space), for cast shadows and masks ----------
// Mirrors clawd()'s transform: translate(x, y + dy) · rotate(rot) · scale(flip·sx·(1+.6sq), sy·(1-sq)).
function silPolys(name, x, y, u, o = {}) {
  const M = BAND[name] || { sx: 1, sy: 1 }, V = VIEWS[o.view] || VIEWS.front;
  const sq = (o.sq || 0), fx = (o.flip ? -1 : 1) * (o.sx ?? 1) * M.sx * (1 + sq * .6), fy = (o.sy ?? 1) * M.sy * (1 - sq);
  const bx = x + (o.dx || 0) * u, by = y + (o.dy || 0) * u, c = Math.cos(o.rot || 0), s = Math.sin(o.rot || 0);
  const T = ([px, py]) => { const X = px * u * fx, Y = py * u * fy; return [bx + X * c - Y * s, by + X * s + Y * c]; };
  const out = [];
  out.push([[V.L, -8], [V.R, -8], [V.R, -2], [V.L, -2]].map(T));
  if (!o.noLegs) for (const [lx] of V.legs) out.push([[lx, -2.4], [lx + 1, -2.4], [lx + 1, -.1], [lx, -.1]].map(T));
  for (const [px, dir, which] of V.arms) {
    if (dir === 0) continue;
    const a = which === 'L' ? (o.aL ?? .2) : (o.aR ?? .2), ang = dir < 0 ? a : -a, ca = Math.cos(ang), sa = Math.sin(ang);
    const R = ([ax, ay]) => [px + dir * .55 * clamp((Math.abs(a) - .7) / .9) + ax * ca - ay * sa, -4.5 + ax * sa + ay * ca];
    const x0 = dir < 0 ? -2.2 : 0; out.push([[x0, -.5], [x0 + 2.2, -.5], [x0 + 2.2, .5], [x0, .5]].map(R).map(T));
  }
  const hair = {   // rough hair / headwear outlines, in front-view hat space
    chester: [[-1.8, -7.7], [-1.2, -9.5], [-.6, -8.1], [0, -10.3], [.6, -8.1], [1.2, -9.7], [1.8, -7.7]],
    mike: [[-5, -7.6], [-4.6, -9.1], [-3.4, -8.1], [-2.3, -9.8], [-1.2, -8.1], [0, -10], [1.2, -8.1], [2.4, -9.8], [3.5, -8.1], [4.6, -9.2], [5, -7.6]],
    brad: [[-6.5, -4.5], [-6.5, -7.6], [-5.2, -9.4], [0, -10.6], [5.2, -9.4], [6.5, -7.6], [6.5, -4.5]],
    rob: [[-5.3, -7], [-5, -8.5], [-3.5, -9.2], [0, -9.4], [3.5, -9.2], [5, -8.5], [5.3, -7]],
    joe: [[-4.8, -7.7], [-4.6, -9.1], [4.6, -9.1], [4.8, -7.7]],
    phoenix: [[-5.1, -7.5], [-4, -8.7], [0, -8.9], [4, -8.7], [5.1, -7.5]]
  }[name];
  if (hair) out.push(hair.map(([hx, hy]) => [V.hat + hx * V.hw, hy]).map(T));
  if (o.inst !== false && (name === 'brad' || name === 'phoenix')) {
    const L = name === 'phoenix' ? 9.2 : 7.6, a = -.32, ca = Math.cos(a), sa = Math.sin(a);
    const G = ([gx, gy]) => [1.4 + gx * ca - gy * sa, -3.4 + gx * sa + gy * ca];
    out.push([[-L - 1.6, -.5], [2.3, -1.5], [2.3, 1.5], [-L - 1.6, .5]].map(G).map(T));
  }
  return out;
}

// ---------- shadows on the wallpaper ----------
// A member standing at (x, y) on the floor throws a shadow up the wall behind them. shadowMap gives the mapping from
// world points to the wall: the feet land on the skirting (wallY), the figure grows by k and slides by dx (away from the
// lamp). wallShadow paints it as a soft multiply shadow; pose = the SHADOW's pose (it can differ from the member's:
// lagging, turning, grinning). o.eyes 0..1 opens glowing eyes in it, o.grin 0..1 a pale grin, o.red for red eyes.
function shadowMap(x, y, o = {}) {
  const k = o.k ?? 1.35, dx = o.dx ?? 0, wallY = o.wallY ?? LAY.floorY - 6, sk = o.skew ?? 0;
  return ([px, py]) => { const hgt = (y - py) * k; return [x + (px - x) * k + dx + sk * hgt, wallY - hgt]; };
}
function wallShadow(name, x, y, u, pose = {}, o = {}) {
  const map = shadowMap(x, y, o), polys = silPolys(name, x, y, u, pose).map(P => P.map(map));
  castShadow(polys.map(P => toScreenPts(P)), { alpha: o.alpha ?? .42, blur: o.blur ?? 4, col: o.col });
  const eyes = clamp(o.eyes || 0), grin = clamp(o.grin || 0);
  if (eyes > .02 || grin > .02) {   // the shadow wakes up: eyes (and a grin) placed through the same mapping
    const M = BAND[name], fx = (pose.flip ? -1 : 1) * M.sx, fy = M.sy, bx = x + (pose.dx || 0) * u, by = y + (pose.dy || 0) * u;
    const at = (ex, ey) => map([bx + ex * u * fx, by + ey * u * fy]), k = o.k ?? 1.35;
    boilSeed('shadow eyes ' + name);
    for (const s of [-1, 1]) {
      const [cx, cy] = at(s * 2.5 + (pose.lookX || 0) * .5, -6), h = 2.1 * u * k * fy * eyes, w = u * k * .95;
      glow(cx, cy, u * k * 2.2, o.red ? '#FF3B2E' : '#D8F0A0', .55 * eyes);
      if (h > 1) paint(rectPts(cx - w / 2, cy - h / 2, w, h, u * .05), { wash: o.red ? '#FF6A50' : '#F4EDC9', ink: null });
    }
    if (grin > .02) {
      const [cx, cy] = at(0, -4.2), gw = 2.6 * u * k * grin, top = [], bot = [];
      for (let i = 0; i <= 10; i++) { const q = i / 10, xx = cx - gw + 2 * gw * q, c = 1 - Math.pow(2 * q - 1, 2); top.push([xx, cy - .5 * u * k + .45 * u * k * c]); bot.push([xx, cy - .5 * u * k + 1.4 * u * k * c * grin]); }
      paint(top.concat(bot.reverse()), { wash: '#F1E8C8', washOp: 230, ink: null });
    }
  }
}

// ---------- the band, performing ----------
// Seated on the couch: legs tucked, body resting on the cushion. (x = LAY.brad[0] or LAY.phoenix[0])
function seated(name, x, u, o = {}) { member(name, x, LAY.seatY + 2 * u + 4, u, { noLegs: true, noShadow: true, ...o }); }
// Drum hits locked to the song: kick on beats 1 and 3 (plus a pickup eighth), snare on 2 and 4, hats on eighths,
// crash on the first beat of every other bar. Pass to parlor({ drums: drumHits(t) }).
function drumHits(t, k = 1) {
  const bp = bpOf(t), bi = Math.floor(bp), f = bp - bi, e = frac(bp * 2), bar = Math.floor(bi / 4), inb = ((bi % 4) + 4) % 4;
  const dec = x => Math.exp(-x * 7);
  return { kick: k * ((inb === 0 || inb === 2) ? dec(f) : 0), snare: k * ((inb === 1 || inb === 3) ? dec(f) : 0), hat: k * dec(e) * .7,
    crash: k * (inb === 0 && bar % 2 === 0 ? dec(f * .6) : 0), tom: 0 };
}
// Hooks for parlor() that stage the whole band performing in the standard layout.
//   o.u        sizes { front: 19, couch: 15, joe: 16, rob: 16 }
//   o.style    { mike: 'rap'|'hype'|'idle', chester: 'sing'|'belt'|'scream'|'idle' }
//   o.energy   0..1 (how hard everyone rocks)
//   o.over     per-member option overrides, e.g. { mike: { ...mood('mike', t, keys) }, chester: { view: 'q' } }
//   o.skip     members not to draw, e.g. ['mike'] if the shot draws Mike itself
//   o.extra    hooks merged in (wall, behind, lit, front...), and o.floorBefore / o.floorAfter callbacks
function bandHooks(t, o = {}) {
  const U = { front: 19, couch: 15, joe: 16, rob: 16, ...(o.u || {}) }, st = { mike: 'rap', chester: 'sing', ...(o.style || {}) };
  const en = o.energy ?? 1, ov = o.over || {}, skip = new Set(o.skip || []), bp = bpOf(t), b = _b(t);
  const nod = (ph = 0) => -.35 * en * Math.abs(Math.sin((bp + ph) * Math.PI));
  const H = { ...(o.extra || {}) };
  H.couch = () => {
    if (o.extra?.couch) o.extra.couch();
    if (!skip.has('brad')) seated('brad', LAY.brad[0], U.couch, { ...mfeel('brad', 'cool', t, { seed: 3 }), eyes: 'closed', mouth: null, emote: null, strum: bp * 2, dy: nod(.1), rot: .03 * en * Math.sin(bp * Math.PI / 2), ...(ov.brad || {}) });
    if (!skip.has('phoenix')) seated('phoenix', LAY.phoenix[0], U.couch, { ...mfeel('phoenix', 'happy', t, { seed: 6 }), emote: null, strum: bp * 2 + .25, dy: nod(.35), rot: -.04 * en * Math.sin(bp * Math.PI / 2 + 1), ...(ov.phoenix || {}) });
  };
  H.joe = () => {
    if (o.extra?.joe) o.extra.joe();
    const sc = Math.sin(bp * TAU * 2) * en;
    if (!skip.has('joe')) member('joe', LAY.joe[0], LAY.joe[1], U.joe, { ...mfeel('joe', 'mischief', t, { seed: 9 }), emote: null, noShadow: true, noLegs: true, aL: -.2 + .35 * sc, aR: .1 - .2 * Math.max(0, sc), dy: nod(.2), lookX: -.4, ...(ov.joe || {}) });
  };
  H.rob = () => {
    if (o.extra?.rob) o.extra.rob();
    const h = drumHits(t, en), hitL = h.snare + h.crash * .6, hitR = h.hat + h.kick * .3;
    if (!skip.has('rob')) member('rob', LAY.rob[0], LAY.rob[1], U.rob, { ...mfeel('rob', 'determined', t, { seed: 12 }), emote: null, noShadow: true, noLegs: true,
      aL: .9 - .9 * hitL, aR: .7 - .7 * hitR, armL: stickHook(.4 - .5 * hitL), armR: stickHook(-.2 - .4 * hitR), dy: -.25 * h.crash, sq: .05 * h.kick, ...(ov.rob || {}) });
  };
  H.floor = () => {
    if (o.floorBefore) o.floorBefore();
    if (!skip.has('mike')) {
      const s = st.mike, base = s === 'idle' ? mfeel('mike', 'neutral', t, { seed: 1 }) : mfeel('mike', s === 'hype' ? 'excited' : 'determined', t, { seed: 1 });
      member('mike', LAY.mike[0], LAY.mike[1], U.front, { ...base, emote: null, ...(s === 'rap' ? singing(t, 'rap') : {}), micBob: .12 * Math.sin(bp * Math.PI), aL: s === 'idle' ? .1 : .5 + .7 * Math.abs(Math.sin(bp * Math.PI)) * en, dy: (base.dy || 0) * en, ...(ov.mike || {}) });
    }
    if (!skip.has('chester')) {
      const s = st.chester, base = s === 'idle' ? mfeel('chester', 'neutral', t, { seed: 2 }) : mfeel('chester', s === 'scream' ? 'furious' : 'excited', t, { seed: 2 });
      member('chester', LAY.chester[0], LAY.chester[1], U.front, { ...base, emote: null, ...(s === 'idle' ? {} : singing(t, s === 'sing' ? 'sing' : s)), aL: s === 'idle' ? .1 : .6 + .8 * Math.abs(Math.sin(bp * Math.PI + .5)) * en, dy: (base.dy || 0) * en, ...(ov.chester || {}) });
    }
    if (o.floorAfter) o.floorAfter();
  };
  return H;
}
