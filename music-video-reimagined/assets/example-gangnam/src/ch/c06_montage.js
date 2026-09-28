// c06_montage.js · POST-CHORUS 1 · barT(44) 83.818 -> barT(52) 98.364 · a pastel montage, dancing the whole time.
//
// SHOT PLAN (video time; bars of 1.818 s; cuts on bar lines; the post-chorus routine runs through every shot)
//   Oppa's routine: hipsway (b44-45) · disco side 1 (b46) · disco side -1 (b47) · hipsway (b48-49) · lasso (b50) · vArms (b51)
//
//   1  YOGA · 83.818-87.455 (b44-45) · [in: cut on the bar-44 downbeat, mid-move: Oppa's lasso from c05 blends into the
//      hipsway in the first frames] Riverside yoga at dawn: a pastel sky, the city skyline (cityline) across a pale
//      river. Oppa (black tux) hipsways on the wooden deck behind and above a class of nine Clawds on pastel mats (crowd
//      variants in pastel yoga tops), the instructor at the front-left. Three exercise balls bounce on the beat.
//      Camera: a slow drift right and push.
//      reads: 83.82-84.73  the class wobbles in "tree pose" (arms up, one leg tucked); Oppa sways above them
//             84.73-85.00  the instructor flips up a card: a painted cat, back arched, on all fours (the next pose)
//             85.00-85.64  the class "does" cat pose: arms down, feet down... they're just standing (a Clawd always is)
//             85.64-87.45  bar 45: they are VERY pleased with themselves (proud / smug, sparks); held to the cut.
//                          On beat 4 one ball takes a huge bounce up toward the top of frame
//   2A BUS AISLE · 87.455-91.091 (b46-47) · [cut on action: Oppa's disco arm flings up on the downbeat; the high ball
//      matches the disco ball] The granny tour bus, side-on cutaway (it drives right; the pastel riverside streams left
//      past the windows): plush teal seats with lace headrest covers, pink curtains with gold tassels, a scalloped
//      valance, a strip of party bulbs, a disco ball throwing coloured spots. Oppa (white shirt, khakis) dances DOWN THE
//      AISLE left to right, one step per beat (disco R, then disco L). The Grannies go wild: purple jumps in a V behind
//      him, green waves a fan standing on a seat, gold pumps V-arms on a seat, pink and teal disco in the aisle. THE
//      Horse sits in a seat in a pink visor, the one still thing, chewing gum, deadpan. Camera trucks right with Oppa.
//      reads: 87.45-89.27  the party bus, the Grannies going wild around Oppa
//             89.27-91.09  Oppa travels on toward the one passenger not dancing: a horse, in a visor
//      [out: the camera starts to punch in toward the Horse in the last frames]
//   2B THE HORSE · 91.091-94.727 (b48-49) · [a punch-in cut on the bar line; the push carries through and settles]
//      Closer on the Horse's seat. Pink-visor Granny dances beside it; Oppa hipsways in the aisle on the left.
//      reads: 91.09-91.55  the Horse: deadpan, chewing, a pink visor (like hers)
//             91.55-92.00  the Granny gets an idea
//             92.00-93.36  she grabs its hoof and heaves it up and down on the beats: the hoof does not move a
//                          millimetre (her fist is locked to it, her whole body bounces). The chewing stops; the eye
//                          slides to us
//             93.36-94.05  she lets go and shrugs (the Horse blinks, chews again)
//             94.05-94.73  and she's straight back to dancing, wilder than ever
//      [out: a bus curtain (pink, gold fringe) sweeps across left to right, covering on the bar-50 downbeat]
//   3  SWAN BOAT · 94.727-98.364 (b50-51) · [in: the curtain sweeps on off the right edge] The river: a pale bridge
//      and skyline far off, ripples. Oppa (sky-blue tux) pedals a big white swan pedal-boat to the right, doing the
//      lasso from the seat (b50), then V-arms (b51). The swan's head bobs on every beat; the wheel churns a wake.
//      Camera tracks right with the boat.
//      reads: 94.73-96.55  Oppa lassoing on a swan boat
//             96.55-98.11  V-arms, the swan bobbing along
//      [out: WHIP PAN RIGHT over the last 6 frames (98.125-98.333): the camera accelerates right, the world streaks
//      left under horizontal dry-brush smears and speed lines, the last frame almost all smear]
//
// The counter HUD is in every shot (25 M -> 90 M). No lettering anywhere else.
(() => {
  // ---------- time ----------
  const T0 = barT(44), T_BUS = barT(46), T_HORSE = barT(48), T_SWAN = barT(50), T1 = barT(52);
  const bt = (k, b = 0) => beatT(k, b);
  // Oppa's post-chorus routine (the lasso key is c05's last move, so the first frames blend out of it: mid-move)
  const ROUTINE = [[barT(42), 'lasso'], [barT(44), 'hipsway'], [barT(46), 'disco', { side: 1 }], [barT(47), 'disco', { side: -1 }],
    [barT(48), 'hipsway'], [barT(50), 'lasso'], [barT(51), 'vArms']];

  // ---------- helpers ----------
  const poseOf = (name, move, t, o = {}) => { const q = memberOpts(name, o), d = { ...o, hand: q._hand, sleeve: q._sleeve }; return typeof move === 'string' ? dance(move, t, d) : routine(t, move, d); };
  const handOf = (name, o = {}) => memberOpts(name, o)._hand;
  const yogaTop = col => (u, sw, V, J) => band(u, V, J, -4.35, -2.02, col);

  // an exercise ball that lands on the beat (squash), peaks on the "and". o.fly = { t0, x1, y1 }: from t0 it launches
  // (a squash, then a stretch) on an arc to (x1, y1) and hangs there, decelerating (the match to the disco ball)
  function exBall(key, x, gy, r, t, col, o = {}) {
    const bp = (t - OFF) / BEAT * (o.rate || 1) + (o.ph || 0), f = frac(bp);
    let h = (o.h ?? 90) * 4 * f * (1 - f), land = Math.exp(-f * 12), speed = Math.abs(1 - 2 * f), cx = x, cy;
    let sy = 1 - .24 * land + .1 * speed * (1 - land);
    if (o.fly && t >= o.fly.t0) {
      const k = clamp((t - o.fly.t0) / BEAT), e = easeOut(k), [px, py] = arcPt([x, gy - r], [o.fly.x1, o.fly.y1], 160, e);
      cx = px; h = gy - r - py; land = Math.exp(-k * 18); sy = 1 - .3 * land + .22 * (1 - e) * (1 - land);
      cy = py;
    } else cy = gy - r * sy - h;
    const sx = 1 / Math.max(.6, sy);
    boilSeed('ball shadow ' + key);
    const sk = 1 / (1 + h / 160);
    paint(ellPts(x, gy + 2, r * 1.05 * sk * sx, r * .22 * sk, 18), { fill: '#6E7F6A', fillOp: 70 * clamp(1.4 - h / 500), bleed: .15, tex: .3, border: .1, ink: null });
    boilSeed('ball ' + key);
    const sw = clamp(r / 40, .6, 1.6);
    paint(ellPts(cx, cy, r * sx, r * sy, 26), { wash: col, fill: mixCol(col, '#6A4A8A', .35), fillOp: 60, tex: .5, ink: PAL.ink, sw });
    paint(ellPts(cx - r * .32 * sx, cy - r * .38 * sy, r * .34 * sx, r * .22 * sy, 12, 0, -.5), { wash: mixCol(col, '#FFFFFF', .55), ink: null });
    const rot = (o.spin || .6) * bp;   // the seam turns as it bounces
    const S = []; for (let i = 0; i <= 12; i++) { const a = -Math.PI / 2 + i / 12 * Math.PI; S.push([cx + Math.cos(a + rot) * r * sx * .92, cy + Math.sin(a + rot) * r * sy * .35]); }
    inkLine(S, sw * .6, mixCol(col, PAL.ink, .45), 'inkfine', .5);
  }

  // the instructor's card: a painted cat in "cat pose" (on all fours, back arched), flipping from its blank back
  function catCard(u, sw, flipK, armA) {
    push(); rotate(armA);                       // undo the arm's rotation: the card stays upright
    const w = 11 * u, h = 7.8 * u, cx = 0, cy = -4.7 * u, sx = Math.cos(Math.PI * clamp(flipK));
    push(); translate(cx, cy); scale(Math.max(.05, Math.abs(sx)), 1);
    paint(rrPts(-w / 2, -h / 2, w, h, .7 * u), { wash: sx < 0 ? '#FFF6E6' : '#F3D8E2', ink: PAL.ink, sw: sw * .8 });
    if (sx < 0) {   // the front: the cat, arched
      paint(rrPts(-w / 2 + .45 * u, -h / 2 + .45 * u, w - .9 * u, h - .9 * u, .5 * u), { wash: '#FFF6E6', fill: '#F6C8D8', fillOp: 70, tex: .4, ink: '#E07AA0', sw: sw * .5 });
      const P = pts => pts.map(([a, b]) => [a * u, b * u]), cat = '#5A3A6A';
      push(); scale(1.17);
      paint(ribbon(P([[-2.7, .9], [-2.1, -.9], [-.6, -1.9], [.9, -1.6], [2.1, -.5]]), 1.5 * u, 1.2 * u), { wash: cat, ink: null });   // the arched back
      for (const [lx, fx] of [[-2.35, -2.6], [-1.75, -1.85], [1.55, 1.35], [2.05, 2.1]]) paint(ribbon(P([[lx, -.2], [fx, 1.9]]), .42 * u, .36 * u), { wash: cat, ink: null });   // legs
      paint(ellPts(2.5 * u, -.55 * u, .95 * u, .85 * u, 14), { wash: cat, ink: null });                                        // head
      for (const s of [-1, 1]) paint(P([[2.5 + s * .25, -1.2], [2.5 + s * .75, -2.05], [2.5 + s * .85, -.95]]), { wash: cat, ink: null });   // ears
      paint(ribbon(P([[-2.6, .2], [-3.4, -.4], [-3.5, -1.5], [-3.0, -2.2]]), .45 * u, .25 * u), { wash: cat, ink: null });    // tail
      paint(ellPts(2.85 * u, -.65 * u, .13 * u, .18 * u, 6), { wash: '#FFF6E6', ink: null });                                  // eye
      const A = []; for (let i = 0; i <= 8; i++) { const a = Math.PI * (1.12 + i / 8 * .76); A.push([-.55 * u + Math.cos(a) * 2.2 * u, -.4 * u + Math.sin(a) * 1.7 * u]); }
      inkLine(A, sw * .7, '#E07AA0', 'inkfine', .5);                                                                               // the "arch" motion mark
      inkLine([[A[8][0] - .45 * u, A[8][1] - .1 * u], A[8], [A[8][0] - .05 * u, A[8][1] + .45 * u]], sw * .7, '#E07AA0', 'inkfine', 0);
      pop();
    } else for (let k = 0; k < 3; k++) inkLine([[-w * .3, (-1 + k) * .9 * u], [w * .3, (-1 + k) * .9 * u]], sw * .4, '#D8A8BC', 'inkfine', 0);
    pop();
    pop();
    paint(ellPts(.1 * u, 0, .62 * u, .56 * u, 12), { wash: '#DC8A66', ink: PAL.ink, sw: sw * .7 });   // the fist holding it
  }

  // ---------- cameras (pure functions, so shots can match across cuts) ----------
  const yogaCam = K => [lerp(925, 958, K), lerp(684, 678, K), lerp(1.08, 1.12, K)];
  const busACam = lt => { const k = ease(clamp(lt / (T_HORSE - T_BUS))); return [lerp(800, 1150, k), 612, lerp(1.05, 1.08, k)]; };
  const DISCO = [1040, 380, 62];   // the bus's disco ball (world)
  // where the yoga ball must hang at the cut so it lands on the disco ball's spot on screen
  const DISCO_Y = (() => { const [ax, ay, az] = busACam(0), [yx, yy, yz] = yogaCam(1), sx = (DISCO[0] - ax) * az + 960, sy = (DISCO[1] - ay) * az + 540; return [(sx - 960) / yz + yx, (sy - 540) / yz + yy]; })();

  // ---------- 1. riverside yoga ----------
  // the class: [x, y (feet), u, crowd variant, top colour, which leg is tucked in tree pose, mood when pleased]
  const CLASS = [
    [560, 926, 15, 2, '#C9B8F2', 3, 'proud'], [815, 922, 15, 3, '#A6E2C8', 0, 'smug'], [1165, 924, 15, 9, '#F9C5A0', 3, 'proud'], [1430, 928, 15, 14, '#F5E08E', 0, 'proud'],
    [462, 1036, 17, 0, '#F6B8CB', 0, 'proud'], [742, 1040, 17, 5, '#A9D5F4', 3, 'proud'], [1022, 1034, 17, 16, '#C9B8F2', 0, 'smug'], [1302, 1038, 17, 7, '#A6E2C8', 3, 'proud'], [1582, 1034, 17, 10, '#F9C5A0', 0, 'proud']
  ];
  const MATS = ['#F6B8CB', '#C9B8F2', '#A6E2C8', '#F5E08E', '#F9C5A0', '#A9D5F4'];
  const T_FLIP = bt(44, 2), T_DROP = bt(44, 3), T_PROUD = bt(45, 0);

  // the shared skyline helper, pushed far back: scaled about the camera's centre (its culling widened to match)
  function farCity(y, s, col) {
    const cam = CAM; if (!cam) return;
    push(); translate(cam.cx, y); scale(s); translate(-cam.cx, -y);
    CAM = { ...cam, zoom: cam.zoom * s }; cityline(y, { col }); CAM = cam;
    pop();
  }
  function yogaSet(t, lt) {
    const [a, b, c] = viewRect2(200);
    boilSeed('y sky'); paint(rectPts(a, b, c - a, 620 - b), { wash: '#C8E1F3', ink: null });
    boilSeed('y haze'); paint(ellPts((a + c) / 2, 560, (c - a) * .62, 190, 26), { fill: '#FBE2E8', fillOp: 170, bleed: .3, tex: .4, ink: null });
    for (let i = 0; i < 4; i++) {   // soft pastel clouds, drifting
      const x = -200 + ((i * 640 + lt * 14) % 2600), y = 250 + 80 * hash(i + 11);
      if (!vis(x - 260, x + 260)) continue;
      boilSeed('y cloud' + i);
      const P = []; for (let k = 0; k < 22; k++) { const q = k / 22 * TAU, up = Math.sin(q) < 0; P.push([x + Math.cos(q) * (150 + 40 * hash(i)), y + Math.sin(q) * (up ? 42 + 16 * Math.abs(Math.sin(q * 3)) : 22)]); }
      paint(P, { wash: '#FDF6F4', fill: '#EBD8EC', fillOp: 90, bleed: .08, ink: null, curv: .4 });
    }
    farCity(566, .5, '#D2CCEA');
    boilSeed('y city haze'); paint(rectPts(a, 500, c - a, 70), { fill: '#F6E4EE', fillOp: 120, bleed: .2, tex: .3, ink: null });
    boilSeed('y far bank'); paint(rectPts(a, 556, c - a, 18), { wash: '#AFCFA6', ink: null });
    boilSeed('y river'); paint(rectPts(a, 572, c - a, 170), { wash: '#A8D8E2', fill: '#86C2D2', fillOp: 70, bleed: .04, tex: .5, ink: null });
    for (let i = 0; i < 22; i++) {   // shimmer, drifting downstream
      const y = 586 + 136 * hash(i * 2.3), x = a + ((hash(i * 5.1) * (c - a) + lt * (18 + 20 * hash(i))) % (c - a)), w = 30 + 50 * hash(i * 7.7);
      boilSeed('y shim' + i); inkLine([[x, y], [x + w, y + 1]], .7 + .6 * hash(i), '#EFFAF8', 'inkfine', 0);
    }
    boilSeed('y embank'); paint(rectPts(a, 736, c - a, 20), { wash: '#DCD4C4', fill: '#BEB4A2', fillOp: 70, tex: .5, ink: null });
    inkLine([[a, 737], [c, 739]], 1, mixCol('#BEB4A2', PAL.ink, .3), 'inkfine', 0);
    boilSeed('y lawn'); paint(rectPts(a, 754, c - a, 700), { wash: '#BCE0A2', fill: '#98C680', fillOp: 60, bleed: .03, tex: .6, ink: null });
    for (let i = 0; i < 26; i++) {   // grass tufts
      const x = a + (c - a) * hash(i * 3.7), y = 830 + 330 * hash(i * 1.9);
      boilSeed('y tuft' + i); inkLine([[x - 8, y], [x - 3, y - 12], [x, y], [x + 4, y - 14], [x + 8, y]], .6, '#7EAE68', 'inkfine', 0);
    }
    // the instructor's deck, with a railing along its back edge
    boilSeed('y rail');
    for (let x = 612; x <= 1312; x += 100) paint(rectPts(x - 5, 690, 10, 82), { wash: '#F4ECDD', ink: PAL.ink, sw: .5 });
    inkLine([[592, 690], [1332, 690]], 3.2, '#F4ECDD', 'ink', 0); inkLine([[592, 688], [1332, 688]], .6, PAL.ink, 'inkfine', 0);
    inkLine([[592, 728], [1332, 728]], 1.8, '#F4ECDD', 'ink', 0);
    boilSeed('y deck');
    paint([[580, 770], [1344, 770], [1360, 790], [564, 790]], { wash: '#EFD9B2', fill: '#D8BC8E', fillOp: 60, tex: .5, ink: PAL.ink, sw: .7 });
    paint(rectPts(564, 790, 796, 30), { wash: '#D9B886', fill: '#B8925E', fillOp: 70, tex: .6, ink: PAL.ink, sw: .7 });
    for (let k = 1; k < 9; k++) inkLine([[564 + k * 88, 792], [564 + k * 88, 818]], .5, '#A8824E', 'inkfine', 0);
  }
  function mat(key, x, y, u, col) {
    boilSeed('mat ' + key);
    paint([[x - 6.6 * u, y - 1.3 * u], [x + 6.6 * u, y - 1.3 * u], [x + 7.5 * u, y + 1.1 * u], [x - 7.5 * u, y + 1.1 * u]], { wash: col, fill: mixCol(col, PAL.ink, .2), fillOp: 45, tex: .4, ink: mixCol(col, PAL.ink, .5), sw: .6 });
    inkLine([[x - 6.9 * u, y + .1 * u], [x + 6.9 * u, y + .1 * u]], .4, mixCol(col, '#FFFFFF', .4), 'inkfine', 0);
  }
  // one member of the class: a warrior pose (arms stretched out level, a wide lunge) until their drop, then "cat pose"
  // (= just standing: a Clawd is always on all fours), then very pleased with themselves
  function warrior(t, i) {
    const w = Math.sin((t - OFF) * 2.3 + i * 1.9), br = Math.sin(bpOf(t) * Math.PI / 2 + i * .4);   // a slow breath, a small wobble
    return { aL: .06 + .05 * w, aR: .06 - .05 * w, armLen: 1.62, legSplay: 1.15, sq: .1 + .025 * br, dy: .12, rot: .035 * w, dx: .08 * br };
  }
  function yogi(t, i, x, y, u, v, top, lean, pleased) {
    const tDrop = T_DROP + .05 * (i % 3) + .03 * hash(i), tP = T_PROUD + .05 * hash(i * 3.3);
    const keys = [[T0 - 4, 'neutral', { eyes: 'closed', mouth: 'flat' }], [tP, pleased, { blush: .55 }]];
    if (pleased === 'smug') keys.push([bt(45, 2) + .07 * (i % 3), 'smug', { eyes: ['closed', 'narrow'], lookX: -.8, blush: .55 }], [bt(45, 3) + .12, 'smug', { blush: .55 }]);
    const face = mood('crowd', t, keys, { v });
    const k = ease(seg(t, tDrop, tDrop + .28)), W_ = warrior(t, i), land = spring(t, tDrop + .28, 9, 22);
    member('crowd', x, y, u, {
      v, ...face, outfit: yogaTop(top), legCol: mixCol(top, '#5A4A7A', .35), legFar: mixCol(top, '#5A4A7A', .5),
      aL: lerp(W_.aL, face.aL ?? -.8, k), aR: lerp(W_.aR, face.aR ?? -.8, k), armLen: lerp(W_.armLen, 1, k), legSplay: lerp(W_.legSplay, 0, k),
      rot: lerp(W_.rot, face.rot || 0, k), dx: lerp(W_.dx, 0, k), sq: lerp(W_.sq, face.sq || 0, k) + .12 * land, dy: lerp(W_.dy, face.dy || 0, k), boilKey: 'yogi' + i
    });
  }
  function yoga(t, lt, dur) {
    const K = ease(lt / dur);
    camBegin(...yogaCam(K));
    yogaSet(t, lt);
    // Oppa (black tux) on the deck, hipsway
    dancer('oppa', 962, 786, 22, ROUTINE, t, { look: 'black', mood: 'cool', boilKey: 'oppa' });
    // balls behind the class
    exBall('b3', 1612, 812, 32, t, '#F7AAC7', { h: 52, ph: .25, spin: -.7 });
    exBall('b1', 1718, 910, 44, t, '#9FE2C4', { h: 70, ph: .5, spin: .8 });
    // back row, then front row
    CLASS.forEach(([x, y, u, v, top], i) => { if (i < 4) mat(i, x, y, u, MATS[(i * 2 + 1) % MATS.length]); });
    CLASS.forEach(([x, y, u, v, top, lean, pl], i) => { if (i < 4) yogi(t, i, x, y, u, v, top, lean, pl); });
    CLASS.forEach(([x, y, u, v, top], i) => { if (i >= 4) mat(i, x, y, u, MATS[(i * 2 + 1) % MATS.length]); });
    CLASS.forEach(([x, y, u, v, top, lean, pl], i) => { if (i >= 4) yogi(t, i, x, y, u, v, top, lean, pl); });
    // the instructor, front-left: in the warrior pose with the card held up, its blank back to us; she flips it to the
    // cat; drops into "cat pose" herself; then just as proud
    {
      const u = 17.5, x = 172, y = 1064, v = 12, top = '#F6B8CB';
      mat('ins', x, y, u, '#A9D5F4');
      const flipK = seg(t, T_FLIP, T_FLIP + .14), shake = .7 * spring(t, T_FLIP, 8, 24);
      const face = mood('crowd', t, [[T0 - 4, 'neutral', { eyes: 'closed', mouth: 'flat' }], [T_FLIP + .02, 'excited', { emote: null }], [T_PROUD + .1, 'proud', { blush: .5 }]], { v });
      const k = ease(seg(t, T_FLIP + .05, T_FLIP + .33)), W_ = warrior(t, 9);
      const aR = 1.2 + .2 * shake + .05 * Math.sin(bpOf(t) * Math.PI * 2) * k;
      member('crowd', x, y, u, {
        v, ...face, outfit: yogaTop(top), legCol: mixCol(top, '#5A4A7A', .35), legFar: mixCol(top, '#5A4A7A', .5),
        aL: lerp(W_.aL, face.aL ?? -.6, k), aR, armLen: { L: lerp(W_.armLen, 1, k), R: 1.9 }, legSplay: lerp(W_.legSplay, 0, k),
        armR: (uu, sw) => catCard(uu, sw, flipK, aR), rot: lerp(W_.rot, face.rot || 0, k), dx: lerp(W_.dx, 0, k),
        sq: lerp(W_.sq, face.sq || 0, k), dy: lerp(W_.dy, face.dy || 0, k), boilKey: 'instructor'
      });
    }
    // a ball in front, on the right: on the last beat it takes a huge bounce up and away (it becomes the disco ball)
    exBall('b2', 1760, 1044, 60, t, '#CDB4F2', { h: 92, spin: .5, fly: { t0: bt(45, 3), x1: DISCO_Y[0], y1: DISCO_Y[1] } });
    camEnd();
    counterHUD(t);
  }

  // ---------- 2. the granny tour bus: a side-on cutaway (the bus drives right, the riverside streams past) ----------
  const BUS = { floor: 820, cush: 742, winT: 300, winB: 562 };
  const BUSC = { ceil: '#7A5C9A', ceilDk: '#5E4480', wall: '#C8A9DC', wallLo: '#A98AC8', trim: '#E9E4EE', val: '#E27CA4', valDk: '#B85680',
    gold: '#E8BA3E', curt: '#F5A6C2', curtDk: '#D97A9E', seat: '#5EB7B2', seatDk: '#3C8986', seatLt: '#8ED6CE', lace: '#FBF3E6', laceDk: '#E2D2BC',
    carpet: '#5C3D72', carpetLt: '#7A5A92', bulbs: ['#FF9CC4', '#9CF0C8', '#FFE08A', '#C8A8FF', '#9CD8FF'] };
  const seatX = k => 300 * k, winX = k => 300 * k + 22;
  const THE_HORSE = [1508, BUS.cush, 13];
  // the view through window k: pale sky, far towers, the river, riverside lamp posts whizzing by (all scrolling left)
  function busWindow(t, k) {
    const cx = winX(k), xl = cx - 118, xr = cx + 118, yt = BUS.winT, yb = BUS.winB, far = (t - T_BUS) * 55, near = (t - T_BUS) * 950, hz = 500;
    boilSeed('win' + k);
    paint(rrPts(xl, yt, xr - xl, yb - yt, 28), { wash: '#D6ECF6', ink: null });
    paint(rectPts(xl + 4, hz - 70, xr - xl - 8, 66), { wash: '#F4E2EC', ink: null });
    for (let j = Math.floor((xl + far) / 92) - 1; j <= Math.ceil((xr + far) / 92); j++) {   // far towers, clipped to the window
      const x0 = j * 92 + 30 * hash(j * 1.3) - far, w = 46 + 34 * hash(j * 2.7), h = 70 + 90 * hash(j * 4.1);
      const L = Math.max(x0, xl + 4), R = Math.min(x0 + w, xr - 4); if (R - L < 4) continue;
      paint(rectPts(L, hz - h, R - L, h), { wash: mixCol('#CCC4E6', '#FFFFFF', .25 * hash(j)), ink: null });
    }
    paint(rectPts(xl + 2, hz - 4, xr - xl - 4, 10), { wash: '#B8D8A8', ink: null });
    paint(rectPts(xl + 2, hz + 6, xr - xl - 4, yb - hz - 8), { wash: '#A6D6E0', ink: null });
    for (let j = Math.floor((xl + near) / 420); j <= Math.ceil((xr + near) / 420); j++) {   // lamp posts rushing past
      const x = j * 420 - near; if (x < xl + 8 || x > xr - 8) continue;
      inkLine([[x, yb], [x, yt + 40]], 2.4, '#8A7AA8', 'ink', 0); paint(ellPts(x, yt + 36, 10, 7, 8), { wash: '#FFF4D8', ink: '#8A7AA8', sw: .5 });
    }
    paint(rrPts(xl, yt, xr - xl, yb - yt, 28), { ink: '#EEE8F2', sw: 3.2 });
    paint(rrPts(xl - 7, yt - 7, xr - xl + 14, yb - yt + 14, 33), { ink: PAL.ink, sw: .8 });
  }
  function busCurtains(t, k) {
    const cx = winX(k), sway = 5 * Math.sin((t - OFF) * 3.1 + k * 1.7);
    for (const sd of [-1, 1]) {
      const x0 = cx + sd * 118, tie = [x0 - sd * 18 + sway * .4, 452], P = [];
      boilSeed('curt' + k + sd);
      P.push([x0 + sd * 16, 288], [x0 - sd * 58, 288], [tie[0] - sd * 10, tie[1]], [x0 - sd * 46 + sway, 596], [x0 + sd * 14 + sway, 598], [tie[0] + sd * 14, tie[1]]);
      paint(P, { wash: BUSC.curt, ink: PAL.ink, sw: .7, curv: .25 });
      for (const f of [.3, .62]) inkLine([[lerp(x0 + sd * 16, x0 - sd * 58, f), 292], [tie[0] + sd * (4 - 12 * f), tie[1] - 6], [lerp(x0 + sd * 14, x0 - sd * 46, f) + sway, 592]], .6, BUSC.curtDk, 'inkfine', .5);
      paint(ellPts(tie[0] + sd * 2, tie[1], 13, 8, 10), { wash: BUSC.gold, ink: PAL.ink, sw: .5 });                                           // the tie
      const tx = tie[0] + sd * 6 + sway * .5;
      inkLine([[tie[0] + sd * 2, tie[1] + 4], [tx, tie[1] + 22]], 1, BUSC.gold, 'ink', 0);
      paint([[tx - 7, tie[1] + 22], [tx + 7, tie[1] + 22], [tx + 10, tie[1] + 48], [tx - 10, tie[1] + 48]], { wash: BUSC.gold, ink: PAL.ink, sw: .45 });   // tassel
    }
  }
  function busSeat(k) {
    const X = seatX(k);
    boilSeed('seat' + k);
    paint(rectPts(X - 60, 772, 96, 50), { wash: '#4A3A5A', ink: PAL.ink, sw: .6 });                                                               // pedestal
    paint([[X - 131, 462], [X - 94, 455], [X - 78, 764], [X - 118, 768]], { wash: BUSC.seat, fill: BUSC.seatDk, fillOp: 80, tex: .6, ink: PAL.ink, sw: .9, curv: .15 });   // the back
    inkLine([[X - 99, 470], [X - 86, 740]], .8, BUSC.seatLt, 'inkfine', .2);
    paint(rrPts(X - 100, 734, 200, 44, 16), { wash: BUSC.seat, ink: PAL.ink, sw: .9 });                                                             // cushion
    paint(rectPts(X - 92, 762, 184, 12), { wash: BUSC.seatDk, ink: null });
    inkLine([[X - 88, 740], [X + 86, 740]], 1, BUSC.seatLt, 'inkfine', .2);
    // the lace headrest cover, draped over the top of the back, with a scalloped hem and little holes
    const L = [[X - 146, 548], [X - 146, 470], [X - 128, 446], [X - 96, 442], [X - 78, 460], [X - 76, 548]];
    for (let i = 0; i <= 5; i++) { const x = lerp(X - 76, X - 146, i / 5); L.push([x, 548 + (i % 2 ? 12 : 0)]); }
    paint(L, { wash: BUSC.lace, ink: PAL.ink, sw: .6, curv: .2 });
    for (let i = 0; i < 5; i++) paint(ellPts(X - 132 + (i % 3) * 22 + (i > 2 ? 11 : 0), 488 + (i > 2 ? 26 : 0), 4.5, 4.5, 8), { wash: BUSC.laceDk, ink: null });
  }
  function discoBall(t, x, y, r) {
    boilSeed('disco chain');
    inkLine([[x, 150], [x, y - r]], 1.6, '#B8B4C8', 'ink', 0);
    paint(rectPts(x - 16, 146, 32, 10), { wash: '#B8B4C8', ink: PAL.ink, sw: .5 });
    glow(x, y, r * 2.4, '#FFE8F6', .55 + .25 * pulse(t, 5));
    boilSeed('disco ball');
    paint(ellPts(x, y, r, r, 30), { wash: '#C9CCDA', fill: '#7E8298', fillOp: 70, tex: .6, ink: PAL.ink, sw: 1 });
    const rot = (t - OFF) * 1.6;
    for (let j = -3; j <= 3; j++) {   // latitude rings
      const ph = j / 3.6 * Math.PI / 2, yy = y + Math.sin(ph) * r, hw = Math.cos(ph) * r;
      inkLine([[x - hw, yy], [x, yy + 2], [x + hw, yy]], .5, '#6E7288', 'inkfine', .5);
    }
    for (let i = 0; i < 8; i++) {   // meridians, turning
      const th = i / 8 * Math.PI + rot % (Math.PI / 8), sx = Math.cos(th); if (Math.abs(sx) > .97) continue;
      const P = []; for (let q = 0; q <= 8; q++) { const ph = -Math.PI / 2 + q / 8 * Math.PI; P.push([x + sx * Math.cos(ph) * r, y + Math.sin(ph) * r]); }
      inkLine(P, .5, '#6E7288', 'inkfine', .5);
    }
    for (let i = 0; i < 9; i++) {   // lit facets sliding round with the spin
      const th = hash(i * 3.1) * TAU + rot, ph = (hash(i * 5.7) - .5) * 2.4, sx = Math.sin(th); if (Math.cos(th) < .15) continue;
      const fx = x + sx * Math.cos(ph) * r * .92, fy = y + Math.sin(ph) * r * .92, sz = 5 + 4 * Math.cos(th);
      paint(rectPts(fx - sz / 2, fy - sz / 2, sz, sz), { wash: BUSC.bulbs[i % 5], ink: null });
    }
    for (let i = 0; i < 3; i++) {   // twinkles
      const tw = Math.max(0, Math.sin((t - OFF) / BEAT * Math.PI * 2 + i * 2.1)), a = i * 2.2 + .6;
      if (tw > .1) paint(starPts(x + Math.cos(a) * r * .7, y + Math.sin(a) * r * .6, (8 + 10 * tw), .22, 4), { wash: '#FFFDF4', ink: null });
    }
  }
  // the disco ball's light spots: sweeping round the bus, flaring on the beat (glow = real light, over everything)
  function discoSpots(t, x, y) {
    const pk = .55 + .45 * pulse(t, 4);
    for (let i = 0; i < 16; i++) {
      const th = hash(i * 7.3) * TAU + (t - OFF) * (.9 + .3 * hash(i)), d = 260 + 760 * hash(i * 3.9);
      const sx = x + Math.cos(th) * d, sy = y + 260 + Math.sin(th) * d * .5;
      glow(sx, sy, 30 + 18 * hash(i * 1.7), BUSC.bulbs[i % 5], .75 * pk);
    }
  }
  function busSet(t, o = {}) {
    const H_ = o.hooks || {}, [a, b, c] = viewRect2(160);
    boilSeed('bus ceil'); paint(rectPts(a, b - 100, c - a, 300 - b), { wash: BUSC.ceil, fill: BUSC.ceilDk, fillOp: 70, tex: .5, ink: null });
    inkLine([[a, 130], [c, 128]], 1.2, BUSC.ceilDk, 'inkfine', 0);
    boilSeed('bus wall'); paint(rectPts(a, 236, c - a, 360), { wash: BUSC.wall, ink: null });
    paint(rectPts(a, 590, c - a, 240), { wash: BUSC.wallLo, fill: mixCol(BUSC.wallLo, BUSC.ceil, .4), fillOp: 60, tex: .5, ink: null });
    inkLine([[a, 592], [c, 592]], 3, BUSC.trim, 'ink', 0);
    for (let k = Math.floor((a - 140) / 300); k <= Math.ceil((c + 140) / 300); k++) busWindow(t, k);
    for (let k = Math.floor((a - 140) / 300); k <= Math.ceil((c + 140) / 300); k++) busCurtains(t, k);
    // the valance: a scalloped pelmet with a gold fringe
    boilSeed('valance');
    const V = [[a, 232], [c, 232]]; for (let x = c; x >= a; x -= 50) V.push([x, 282], [x - 25, 296]);
    paint(V, { wash: BUSC.val, fill: BUSC.valDk, fillOp: 60, tex: .5, ink: PAL.ink, sw: .8 });
    const F = []; for (let x = a; x <= c; x += 25) F.push([x, (x / 25) % 2 ? 300 : 308]);
    inkLine(F, 1.4, BUSC.gold, 'ink', 0);
    inkLine([[a, 250], [c, 250]], 1.4, BUSC.gold, 'ink', 0);
    // a string of party bulbs along the ceiling, chasing on the eighths
    boilSeed('bulb wire');
    const e8 = Math.floor((t - OFF) / EIGHTH), W_ = []; for (let x = Math.floor(a / 60) * 60; x <= c; x += 30) W_.push([x, 196 + 14 * Math.pow(Math.sin(x / 240 * Math.PI), 2)]);
    inkLine(W_, .9, '#3E2E52', 'inkfine', .5);
    for (let x = Math.floor(a / 60) * 60; x <= c; x += 60) {
      const i = Math.round(x / 60), by = 210 + 14 * Math.pow(Math.sin(x / 240 * Math.PI), 2), lit = ((i + e8) % 3 + 3) % 3 === 0, col = BUSC.bulbs[((i % 5) + 5) % 5];
      boilSeed('bulb' + i);
      paint(ellPts(x, by, 9, 12, 10), { wash: lit ? col : mixCol(col, BUSC.ceil, .55), ink: PAL.ink, sw: .45 });
      if (lit) glow(x, by, 44, col, .7);
    }
    if (H_.back) H_.back();
    // the aisle carpet
    boilSeed('carpet'); paint(rectPts(a, BUS.floor, c - a, 700), { wash: BUSC.carpet, fill: '#46305A', fillOp: 70, bleed: .03, tex: .7, ink: null });
    inkLine([[a, BUS.floor + 2], [c, BUS.floor + 2]], 1.2, '#3A2848', 'inkfine', 0);
    for (let r = 0; r < 3; r++) for (let x = Math.floor(a / 180) * 180 + (r % 2) * 90; x < c; x += 180) {
      const y = 872 + r * 80; boilSeed('rug' + r + x);
      paint([[x, y - 9], [x + 12, y], [x, y + 9], [x - 12, y]], { wash: BUSC.carpetLt, ink: null });
    }
    for (let k = Math.floor((a - 140) / 300); k <= Math.ceil((c + 160) / 300); k++) busSeat(k);
    if (H_.seats) H_.seats();
    discoBall(t, ...DISCO);
    if (H_.mid) H_.mid();
    discoSpots(t, DISCO[0], DISCO[1]);
    if (H_.front) H_.front();
  }
  // a folding fan in a Granny's hand (arm hook), waving
  function fanHook(armA, wave, col = '#F7B6CE') {
    return (u, sw) => {
      push(); rotate(armA + wave);
      const R = 3.1 * u, a0 = -Math.PI / 2 - .95, a1 = -Math.PI / 2 + .95, P = [[0, 0]];
      for (let i = 0; i <= 10; i++) { const q = lerp(a0, a1, i / 10); P.push([Math.cos(q) * R * (i % 2 ? .96 : 1), Math.sin(q) * R * (i % 2 ? .96 : 1) - .3 * u]); }
      paint(P, { wash: col, fill: mixCol(col, '#B85680', .4), fillOp: 50, tex: .4, ink: PAL.ink, sw: sw * .6 });
      for (let i = 1; i < 6; i++) { const q = lerp(a0, a1, i / 6); inkLine([[0, -.3 * u], [Math.cos(q) * R * .95, Math.sin(q) * R * .95 - .3 * u]], sw * .35, '#B85680', 'inkfine', 0); }
      paint(ellPts(.2 * u, -2.2 * u, .5 * u, .5 * u, 10), { wash: '#FFF4D8', ink: null }); paint(ellPts(.2 * u, -2.2 * u, .2 * u, .2 * u, 8), { wash: BUSC.gold, ink: null });
      pop();
      paint(ellPts(.1 * u, 0, .6 * u, .55 * u, 12), { wash: '#D9876A', ink: PAL.ink, sw: sw * .7 });
    };
  }
  // one step per beat along the aisle (the step lands in the first half of the beat)
  const stepX = (t, t0, x0, per) => { const b = (t - t0) / BEAT, n = Math.floor(b); return x0 + per * (n + easeOut(clamp((b - n) / .55))); };
  // the Grannies, going wild (each has her own thing)
  function granny(t, v, x, y, u, move, o = {}) {
    const q = memberOpts('granny', { v }), P = typeof move === 'string' ? dance(move, t, { ...o, hand: q._hand, sleeve: q._sleeve }) : move;
    const face = mfeel('granny', o.mood || 'excited', t, { v, seed: v });
    const f = beatPh(t + (o.ph || 0) * BEAT), jmp = (o.jump || 0) * Math.sin(Math.PI * f);
    member('granny', x, y, u, { v, eyes: face.eyes, mouth: o.mouth || face.mouth, blush: .4, ...P, dy: (P.dy || 0) - jmp + (o.dy || 0), sq: (P.sq || 0) + (o.jump ? .1 * Math.exp(-f * 9) : 0), rot: (P.rot || 0) + (o.rot || 0), boilKey: 'granny' + v, ...(o.extra || {}) });
  }
  const BLINK_AT = t0 => (4.1 * Math.ceil(t0 * .7 / 4.1) - t0 * .7) / 1.3;   // horse() blink seed so a blink starts at t0
  function theHorse(t, o = {}) { horse(THE_HORSE[0], THE_HORSE[1], THE_HORSE[2], t, { view: 'sit', visor: '#F07AA8', mood: 'deadpan', blink: BLINK_AT(93.52), boilKey: 'THE horse', ...o }); }

  // who's where on the bus. Depth: the seat row at the back (floor 820); the aisle runs toward us (y 860 near the
  // seats, 1000 in the foreground; nearer = bigger)
  const OPPA_BUS_X = t => t < T_HORSE ? stepX(t, T_BUS, 520, 76) : 1128 + 12 * Math.min(8, (t - T_HORSE) / BEAT);
  function busSeatsHook(t, horseO) {
    return () => {
      theHorse(t, horseO);
      const fanA = 1.25 + .28 * Math.sin((t - OFF) / EIGHTH * Math.PI);
      if (vis(780, 1030)) granny(t, 1, 905, BUS.cush + 2, 17, 'disco', { side: -1, mood: 'laugh', extra: { aR: fanA, armLen: { R: 1.3, L: .72 }, armR: fanHook(fanA, .35 * Math.sin((t - OFF) / EIGHTH * Math.PI * 2)), frontArm: 'R' } });
      if (vis(180, 420)) granny(t, 4, 300, BUS.cush + 2, 17, 'pointup', { side: beatIx(t) % 2 ? 1 : -1, mood: 'laugh', jump: .5, e: 1.2 });
    };
  }
  function busAisle(t, lt, dur) {
    camBegin(...busACam(lt));
    busSet(t, { hooks: {
      seats: busSeatsHook(t, { chew: 1 }),
      mid: () => {
        const g0 = routine(t, [[T_BUS, 'disco', { side: 1 }], [bt(47), 'disco', { side: -1 }]], { e: 1.25, amp: 1.1, hand: handOf('granny', { v: 0 }), sleeve: memberOpts('granny', { v: 0 })._sleeve });
        granny(t, 0, 1700, 872, 20, g0, { mood: 'excited', jump: .45 });
        granny(t, 2, stepX(t, T_BUS, 40, 60), 968, 24, 'vArms', { mood: 'starstruck', jump: 1.2, e: 1.3 });
        if (vis(1850, 2200)) granny(t, 3, 2020, 992, 25, 'disco', { side: beatIx(t) % 4 < 2 ? -1 : 1, mood: 'excited', jump: .8, e: 1.3, ph: .5 });
        dancer('oppa', OPPA_BUS_X(t), 988, 27, ROUTINE, t, { look: 'white', mood: 'happy', eyes: 'shades', mouth: 'grin', boilKey: 'oppa' });
      } } });
    camEnd();
    counterHUD(t);
  }
  // IK for a front-view 'L' arm: the angle and length that put the fist on world point P, for a member standing at
  // (x, y) with pose o (dx, dy, sq, rot) and body scale (sx, sy). Mirrors clawd()'s transform: translate, rotate, scale.
  function reachL(P, x, y, u, o, sx, sy) {
    const X = x + (o.dx || 0) * u, Y = y + (o.dy || 0) * u, sq = o.sq || 0, kx = sx * (1 + sq * .6), ky = sy * (1 - sq);
    const c = Math.cos(o.rot || 0), s_ = Math.sin(o.rot || 0), wx = P[0] - X, wy = P[1] - Y;
    const lx = (wx * c + wy * s_) / kx, ly = (-wx * s_ + wy * c) / ky;
    let a = .8, len = 1;
    for (let it = 0; it < 3; it++) {
      const px = (-4.9 - .55 * clamp((Math.abs(a) - .7) / .9)) * u, py = -4.5 * u, dx = lx - px, dy = ly - py;
      a = Math.atan2(-dy, -dx); len = Math.hypot(dx, dy) / (2.2 * u);
    }
    return { aL: a, armLen: len };
  }
  const T_IDEA = bt(48, 1), T_GRAB = bt(48, 2), T_LETGO = bt(49, 1), T_BACK = bt(49, 2) + .12;
  // the Granny who tries to make the Horse dance
  function gagGranny(t) {
    const v = 0, u = 20, x = 1752, y = 874, q = memberOpts('granny', { v }), hand = q._hand;
    const face = mood('granny', t, [[T_HORSE - 2, 'excited'], [T_IDEA, 'idea', { mouth: 'grin' }], [T_GRAB, 'determined', { mouth: 'teeth', emote: 'sweat' }],
      [T_LETGO + .02, 'neutral', { mouth: 'flat', emote: null }], [T_BACK, 'laugh']], { v });
    const hoof = [THE_HORSE[0] + 4.75 * THE_HORSE[2], THE_HORSE[1] - .55 * THE_HORSE[2]];
    let P;
    if (t < T_IDEA) P = { ...dance('vArms', t, { e: 1.3, hand }), dy: -.9 * Math.sin(Math.PI * beatPh(t)) };
    else if (t < T_GRAB - .1) {   // the idea: stop, lean in toward the Horse, rub the hands... a sly grin
      const k = ease(seg(t, T_IDEA, T_IDEA + .2)), rub = Math.sin((t - OFF) * 30) * .08;
      P = { aL: lerp(1.05, -.25 + rub, k), aR: lerp(1.05, -.25 - rub, k), armLen: lerp(1.3, .8, k), armL: fistHook(hand), armR: fistHook(hand), rot: -.1 * k, dx: -.15 * k, sq: .05 * k, legSplay: .3 };
    } else if (t < T_LETGO) {   // the heave: a yank on every beat; the fist stays locked on the hoof (the hoof never moves)
      const f = beatPh(t), pull = t < T_GRAB ? 0 : Math.pow(Math.sin(Math.PI * clamp(f / .62)), .7), sett = t < T_GRAB ? 0 : Math.exp(-f * 10);
      const body = { dx: .9 * pull + .15, dy: -1.1 * pull + .08 * sett, sq: -.16 * pull + .18 * sett, rot: .2 * pull + .04 };
      const ik = reachL(hoof, x, y, u, body, q.sx, q.sy), kR = ease(seg(t, T_GRAB - .1, T_GRAB));
      const pre = { aL: -.25, armLen: .8 };
      P = { ...body, aL: lerp(pre.aL, ik.aL, kR), armLen: { L: lerp(pre.armLen, ik.armLen, kR), R: 1.2 }, armL: fistHook(hand, .7), aR: .7 + .6 * pull + .15 * Math.sin((t - OFF) * 24),
        armR: fistHook(hand), legSplay: .7 + .3 * pull, legLift: [0, 0, .5 * pull, .6 * pull] };
    } else if (t < T_BACK) {   // lets go: flies back a step (the rebound), recovers... and shrugs
      const fly = Math.sin(Math.PI * seg(t, T_LETGO, T_LETGO + .2)), k = backOut(seg(t, T_LETGO + .16, T_LETGO + .36)), pop = spring(t, T_LETGO + .2, 7, 16);
      P = { aL: lerp(1.6, .12, k), aR: lerp(1.3, .12, k), armLen: 1.1, armL: fistHook(hand), armR: fistHook(hand), dx: .7 * fly, rot: .22 * fly - .1 * k, dy: -.4 * k - .3 * pop, sq: -.07 * k + .1 * fly, legSplay: .25, legLift: [0, 0, .7 * fly, .8 * fly] };
    } else P = { ...dance('vArms', t, { e: 1.4, hand }), dy: -1.3 * Math.sin(Math.PI * beatPh(t)) };
    member('granny', x, y, u, { v, eyes: face.eyes, mouth: face.mouth, blush: .45, emote: face.emote, emoteK: face.emoteK, emoteAge: face.emoteAge, squint: face.squint, ...P, boilKey: 'granny0' });
  }
  const busHCam = lt => { const k = 1 - easeOut(seg(lt, 0, .45)); return [1515 - 14 * k, 650, 1.36 + .08 * k]; };
  function busHorse(t, lt, dur) {
    camBegin(...busHCam(lt));
    const chew = t < T_GRAB ? 1 : t < T_LETGO + .5 ? 0 : 1, eye = t > T_GRAB + .42 && t < T_LETGO + .2, look = eye ? 'camera' : undefined;
    busSet(t, { hooks: {
      seats: busSeatsHook(t, { chew, look, mood: eye ? 'annoyed' : 'deadpan' }),
      mid: () => {
        gagGranny(t);
        if (vis(1850, 2200)) granny(t, 3, 2020, 992, 25, 'disco', { side: beatIx(t) % 4 < 2 ? -1 : 1, mood: 'excited', jump: .8, e: 1.3, ph: .5 });
        dancer('oppa', OPPA_BUS_X(t), 988, 27, ROUTINE, t, { look: 'white', mood: 'happy', eyes: 'shades', mouth: 'grin', boilKey: 'oppa' });
      } } });
    camEnd();
    counterHUD(t);
    if (lt > dur - .26) curtainWipe((lt - (dur - .26)) / .52);
  }

  // ---------- transition: a bus curtain sweeps across (left to right), covering at p = .5, sweeping on off the right ----------
  function curtainWipe(p) {
    if (p <= 0 || p >= 1) return;
    const lead = p < .5 ? lerp(-160, W + 260, easeOut(p * 2)) : W + 260 + 900 * easeIn((p - .5) * 2);
    const tail = p < .5 ? -300 : lerp(-300, W + 300, easeIn((p - .5) * 2));
    const vel = p < .5 ? 1 - p * 2 : (p - .5) * 2, lag = 110 * vel;   // the hem trails the rail: follow-through
    const edge = (x0, dir) => { const P = []; for (let i = 0; i <= 12; i++) { const y = -40 + i * (H + 80) / 12; P.push([x0 - lag * (i / 12) * dir + 18 * Math.sin(i * 1.3 + p * 6), y]); } return P; };
    const R = edge(lead, 1), L = edge(tail, 1);
    screenDraw(() => {
      boilSeed('curtain wipe');
      paint(R.concat(L.slice().reverse()), { wash: BUSC.curt, fill: BUSC.curtDk, fillOp: 60, tex: .5, ink: null });
      for (let x = tail + 40; x < lead - 20; x += 64) {   // pleats
        const P = []; for (let i = 0; i <= 8; i++) { const y = -40 + i * (H + 80) / 8; P.push([x - lag * (i / 8) + 10 * Math.sin(i + x * .05), y]); }
        inkLine(P, 1.4, BUSC.curtDk, 'ink', .5);
      }
      inkLine(R, 7, BUSC.gold, 'ink', .5);                                     // the gold fringe along the leading edge
      const Fr = R.map(([x, y], i) => [x + (i % 2 ? 14 : 4), y]); inkLine(Fr, 2, '#C8961E', 'inkfine', 0);
      inkLine(R, 1.2, PAL.ink, 'inkfine', .5);
      if (p >= .5) inkLine(L, 1.2, PAL.ink, 'inkfine', .5);
    });
  }

  // ---------- 3. the swan boat ----------
  const SW_Y = 872;                                            // the waterline
  const swanX = t => 820 + 128 * (t - T_SWAN);                 // the boat pedals right
  const T_WHIP = T1 - .263;                                     // the whip pan fills the last 6 frames
  const whipU = t => clamp((t - T_WHIP) / (T1 - T_WHIP));
  const swanCam = t => { const k = ease(seg(t, T_SWAN, T1)), u = whipU(t); return [swanX(t) + 110 + 2400 * Math.pow(u, 2.1), 628 - 10 * k, 1.3 + .06 * k]; };
  const CX0 = swanX(T_SWAN) + 110;
  function riverSet(t, cx) {
    const [a, b, c] = viewRect2(260), par = p => (cx - CX0) * (1 - p);   // a layer with parallax p moves at p x the camera
    boilSeed('r sky'); paint(rectPts(a, b - 200, c - a, 760 - b), { wash: '#C4E0F4', ink: null });
    boilSeed('r haze'); paint(rectPts(a, 380, c - a, 170), { fill: '#FAE0E8', fillOp: 150, bleed: .25, tex: .3, ink: null });
    for (let i = 0; i < 5; i++) {   // clouds (far)
      const x = CX0 - 900 + i * 520 + 90 * hash(i * 2.2) + par(.08), y = 170 + 70 * hash(i + 4);
      if (!vis(x - 220, x + 220)) continue;
      boilSeed('r cloud' + i);
      const P = []; for (let k = 0; k < 20; k++) { const q = k / 20 * TAU, up = Math.sin(q) < 0; P.push([x + Math.cos(q) * 150, y + Math.sin(q) * (up ? 40 + 14 * Math.abs(Math.sin(q * 3)) : 20)]); }
      paint(P, { wash: '#FDF7F4', fill: '#EAD8EE', fillOp: 80, bleed: .08, ink: null, curv: .4 });
    }
    { const off = par(.14); for (let j = Math.floor((a - off) / 96) - 1; j <= Math.ceil((c - off) / 96) + 1; j++) {   // far towers
      const x = j * 96 + 40 * hash(j * 1.9) + off, w = 56 + 36 * hash(j * 3.3), h = 110 + 150 * hash(j * 5.1);
      boilSeed('r tower' + j);
      paint(rectPts(x, 520 - h, w, h), { wash: mixCol('#CFC6E8', '#FFFFFF', .3 * hash(j)), ink: mixCol('#CFC6E8', PAL.ink, .3), sw: .4 });
      for (let r = 0; r < Math.floor(h / 34); r++) inkLine([[x + 7, 520 - h + 14 + r * 34], [x + w - 7, 520 - h + 14 + r * 34]], .3, mixCol('#CFC6E8', PAL.ink, .2), 'inkfine', 0);
    } }
    { const off = par(.24);   // a long bridge on piers across the river
      boilSeed('r bridge');
      paint(rectPts(a - 100, 468, c - a + 200, 18), { wash: '#E6DCF0', ink: mixCol('#C9B8E0', PAL.ink, .3), sw: .5 });
      inkLine([[a - 100, 486], [c + 100, 486]], 2, '#B8A6D2', 'ink', 0);
      for (let j = Math.floor((a - off) / 230); j <= Math.ceil((c - off) / 230); j++) {
        const x = j * 230 + off; boilSeed('pier' + j);
        paint([[x - 16, 486], [x + 16, 486], [x + 12, 548], [x - 12, 548]], { wash: '#D2C4E4', ink: mixCol('#C9B8E0', PAL.ink, .3), sw: .4 });
        const A = []; for (let i = 0; i <= 10; i++) { const q = i / 10; A.push([x + 16 + q * 198, 486 + 34 * Math.sin(Math.PI * q)]); }
        inkLine(A, 1.2, '#C2B0DA', 'inkfine', .5);
        if (hash(j) > .4) glow(x + 115, 466, 20, '#FFF0C8', .4);
      } }
    { const off = par(.32); boilSeed('r bank'); paint(rectPts(a - 100, 532, c - a + 200, 20), { wash: '#B4D6A6', ink: null });
      for (let j = Math.floor((a - off) / 140); j <= Math.ceil((c - off) / 140); j++) { const x = j * 140 + 50 * hash(j * 7.1) + off; boilSeed('r tree' + j); paint(ellPts(x, 530, 34 + 14 * hash(j), 20, 12), { wash: hash(j * 2) > .5 ? '#A6CE96' : '#98C48A', ink: null }); } }
    boilSeed('r water'); paint(rectPts(a - 100, 546, c - a + 200, 900), { wash: '#A2D4DE', fill: '#82BFCF', fillOp: 70, bleed: .04, tex: .5, ink: null });
    for (let i = 0; i < 40; i++) {   // ripples: fixed on the water, so the camera slides past them
      const x = a + ((hash(i * 3.1) * 2600 + (t - T_SWAN) * (8 + 10 * hash(i))) % 2600), y = 566 + 520 * Math.pow(hash(i * 1.7), 1.4), w = (24 + 60 * hash(i * 5.3)) * (.6 + (y - 560) / 500);
      if (x > c + 100) continue;
      boilSeed('rip' + i); inkLine([[x, y], [x + w * .5, y - 2], [x + w, y]], .6 + 1.1 * (y - 560) / 520, '#E9F7F6', 'inkfine', .5);
    }
  }
  // the swan pedal-boat (bx = its middle, y = waterline): the far rim and seat, [the pedaller], then the near hull,
  // wing, wheel and the long neck at the front. The head bobs on every beat.
  const SWS = 1.25;   // the boat's scale
  // on the boat the lasso swings from his left arm, out over the tail (the swan's neck is on his right)
  const SWAN_ROUTINE = [[barT(48), 'hipsway'], [barT(50), 'lasso', { side: -1 }], [barT(51), 'vArms']];
  function swanBack(t, bx, y) {
    push(); translate(bx, y); scale(SWS); translate(-bx, -y);
    boilSeed('swan back');
    paint([[bx - 150, y - 118], [bx + 120, y - 126], [bx + 130, y - 60], [bx - 150, y - 56]], { wash: '#E6E0D6', ink: PAL.ink, sw: .7 });   // the far rim, inside
    paint(rrPts(bx - 176, y - 214, 42, 150, 16), { wash: '#F4A6C0', ink: PAL.ink, sw: .8 });                                               // the seat back
    pop();
  }
  function swanFront(t, bx, y) {
    push(); translate(bx, y); scale(SWS); translate(-bx, -y);
    for (let i = 0; i < 4; i++) { boilSeed('wake' + i); const x0 = bx - 250 - i * 70; inkLine([[x0, y + 6 + i * 3], [x0 - 110 - 30 * i, y + 18 + i * 9]], 1.4 - i * .2, '#F2FBFA', 'inkfine', .3); }
    boilSeed('swan reflect'); paint(ellPts(bx - 10, y + 40, 250, 34, 20), { wash: '#C4E6EC', ink: null });
    // the paddle wheel at the back, turning
    const wr = (t - OFF) * 7;
    boilSeed('swan wheel');
    paint(ellPts(bx - 228, y - 22, 58, 58, 20), { wash: '#F2C94A', ink: PAL.ink, sw: .9 });
    for (let i = 0; i < 6; i++) { const q = wr + i / 6 * TAU; inkLine([[bx - 228, y - 22], [bx - 228 + Math.cos(q) * 56, y - 22 + Math.sin(q) * 56]], 1.2, '#B8901E', 'ink', 0); }
    paint(ellPts(bx - 228, y - 22, 14, 14, 10), { wash: '#E8A03A', ink: PAL.ink, sw: .6 });
    for (let i = 0; i < 3; i++) { const q = (wr * .5 + i * 2.1) % TAU; paint(ellPts(bx - 262 + 26 * Math.cos(q), y - 8 - 10 * Math.abs(Math.sin(q * 2 + i)), 10 + 5 * i, 7, 8), { wash: '#FBFFFE', ink: null }); }   // foam
    // the hull: a plump white swan body, the chest bulging into the neck, the tail swept up at the back
    boilSeed('swan hull');
    const Hh = [[212, 8], [248, -44], [240, -100], [194, -132], [120, -120], [40, -114], [-60, -114], [-150, -122], [-202, -152], [-228, -210], [-252, -170],
      [-250, -92], [-228, -30], [-200, 8]].map(([a, b]) => [bx + a, y + b]);
    paint(Hh, { wash: '#FBF7EE', fill: '#DCD6CC', fillOp: 70, tex: .5, ink: PAL.ink, sw: 1.2, curv: .45 });
    // the wing: a big feathered shape along the side, its tips swept up toward the tail
    const Wg = [[156, -100], [0, -104], [-150, -118], [-222, -166], [-200, -128], [-212, -120], [-178, -96], [-190, -84], [-148, -70], [-156, -56], [-110, -50], [-114, -36], [-60, -36], [-20, -30], [40, -32], [100, -44], [148, -68]].map(([a, b]) => [bx + a, y + b]);
    paint(Wg, { wash: '#EEEFF0', fill: '#CFCBC6', fillOp: 70, tex: .5, ink: PAL.ink, sw: .9, curv: .3 });
    for (let i = 0; i < 5; i++) { const x0 = bx + 116 - i * 60; inkLine([[x0, y - 94], [x0 - 40, y - 74], [x0 - 52, y - 48 + i * 3]], .8, '#BDB6AE', 'inkfine', .5); }
    inkLine([[bx - 210, y + 2], [bx - 100, y + 12], [bx + 60, y + 12], [bx + 200, y + 4]], 1.6, '#E9F7F6', 'ink', .5);                        // waterline froth
    // the neck and head, bobbing forward on the beat (the head drags a moment behind the neck)
    const bob = .16 * pulse(t, 5) - .05, lagb = .12 * pulse(t - .07, 5);
    push(); translate(bx + 172, y - 120); rotate(bob);
    boilSeed('swan neck');
    const N = [[0, 0], [58, -70], [44, -160], [8, -224], [26, -276]];
    paint(ribbon(N, 56, 38), { wash: '#FBF7EE', fill: '#DCD6CC', fillOp: 60, tex: .5, ink: PAL.ink, sw: 1.1 });
    push(); translate(30, -284); rotate(lagb);
    paint(ellPts(0, 0, 44, 36, 20), { wash: '#FBF7EE', ink: PAL.ink, sw: 1.1 });
    paint([[30, -14], [86, 2], [30, 16]], { wash: '#F2A03A', ink: PAL.ink, sw: .9, curv: .2 });                                                    // beak
    paint(ellPts(30, 0, 12, 16, 10), { wash: '#2B2233', ink: null });                                                                             // the black knob
    paint(ellPts(4, -6, 9, 11, 10), { wash: '#2B2233', ink: null }); paint(ellPts(1, -10, 3.5, 4, 6), { wash: '#FFFFFF', ink: null });          // eye
    for (const k of [-1, 0, 1]) inkLine([[4 + k * 5, -16], [4 + k * 8, -24]], .8, PAL.ink, 'inkfine', 0);                                        // lashes
    paint(ellPts(-8, 12, 10, 6, 8), { fill: '#F4A6C0', fillOp: 120, bleed: .2, ink: null });                                                     // blush
    pop(); pop();
    pop();
  }
  function swanBoat(t, lt, dur) {
    const [cx, cy, z] = swanCam(t), u = whipU(t);
    camBegin(cx, cy, z);
    riverSet(t, cx);
    const bx = swanX(t), rock = .025 * Math.sin((t - OFF) / BEAT * Math.PI), bobY = 3 * pulse(t, 5);
    push(); translate(bx, SW_Y + bobY); rotate(rock); translate(-bx, -SW_Y);
    swanBack(t, bx, SW_Y);
    dancer('oppa', bx - 92, SW_Y - 102, 23, SWAN_ROUTINE, t, { look: 'tux', mood: 'cool', boilKey: 'oppa', noShadow: true });
    swanFront(t, bx, SW_Y);
    pop();
    camEnd();
    counterHUD(t);
    if (lt < .26) curtainWipe(.5 + lt / .52);
    if (u > 0) whipSmear(u, toScreen(bx, SW_Y, { cx, cy, zoom: z, rot: 0 }));
  }
  // the whip pan's smear: long horizontal dry-brush streaks in the river's colours, ink speed lines, the boat's own
  // white-and-blue smear trailing it, and at the end streaky bands (horizontal charcoal hatching) covering the frame
  function whipSmear(u, boat) {
    const band = y => y < 300 ? ['#C4E0F4', '#FDF7F4'] : y < 420 ? ['#CFC6E8', '#E6DCF0'] : ['#A2D4DE', '#82BFCF', '#E9F7F6'];
    screenDraw(() => {
      if (u > .45) for (let i = 0; i < 7; i++) {   // the frame dissolves into streaky bands
        const y0 = -30 + i * (H + 60) / 7, hb = (H + 60) / 7 * clamp((u - .45) * 2.4) + 4, cs = band(y0 + 40);
        boilSeed('smear band' + i);
        paint(rectPts(-80, y0 + ((H + 60) / 7 - hb) / 2, W + 160, hb), { wash: cs[i % cs.length], washOp: 255 * clamp((u - .45) * 3),
          hatch: { d: 9, a: 0, o: { rand: .5 }, b: 'charcoal', c: mixCol(cs[0], i % 2 ? '#FFFFFF' : '#6A8AA8', .35), w: .9 }, ink: null });
      }
      if (boat && boat[0] > -500) for (let i = 0; i < 6; i++) {   // the boat and its rider, smeared out to the right of where they are
        const y = boat[1] + [-250, -205, -160, -110, -60, -10][i], x0 = boat[0] + [-10, 30, 60, -60, -120, -150][i], len = (260 + 500 * hash(i * 4.4)) * (.3 + 1.4 * u);
        boilSeed('boat smear' + i);
        inkLine([[x0, y], [x0 + len * .6, y + 2], [x0 + len, y]], (1.2 + 1.3 * hash(i)) * (.5 + u), ['#221C2A', '#86BCE8', '#86BCE8', '#FBF7EE', '#FBF7EE', '#FBF7EE'][i], 'dry', .2);
      }
      const n = Math.floor(6 + 40 * u);
      for (let i = 0; i < n; i++) {   // long colour streaks and ink speed lines
        const y = hash(i * 3.7 + 1) * (H + 40) - 20, len = (500 + 1300 * hash(i * 5.1)) * (.35 + u), x0 = hash(i * 7.3) * (W + 600) - 500;
        boilSeed('smear' + i);
        const cs = band(y);
        inkLine([[x0, y], [x0 + len * .5, y + (hash(i) - .5) * 4], [x0 + len, y]], (.5 + 1.4 * hash(i * 9.1)) * (.3 + 1.5 * u), cs[i % cs.length], 'dry', .2);
        if (i % 2 === 0) inkLine([[x0 + 80, y + 12], [x0 + 80 + len * .8, y + 12]], .5 + .5 * u, i % 4 ? PAL.ink : PAL.cream, 'inkfine', 0);
      }
    });
  }

  shots([[T0, yoga], [T_BUS, busAisle], [T_HORSE, busHorse], [T_SWAN, swanBoat]]);
})();
