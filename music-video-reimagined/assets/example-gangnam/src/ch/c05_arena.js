// c05_arena.js · barT(36) 69.273 → barT(44) 83.818 · CHORUS 1: THE HORSE DANCE (the drop), the golden arena
//
// SHOT PLAN (all cuts on bar lines; inside a shot the camera only drifts, pushes or cranes, eased)
// The routine (every dancer, every rider, every carousel horse): bars 36-37 gallop · 38-39 lasso · 40-41 gallop · 42-43 lasso.
//
//  A  69.273-71.091  bar 36 (gallop)  [in: c04's white-hot flash fades out over 0.25 s]  THE DROP, the full-formation WIDE.
//     The riding arena in gold under hanging swallowtail banners: Oppa (black tux) at the point, three staggered rows of
//     White Dancers behind him (a checkerboard, so every body shows), riders on prancing horses along the back rail, and
//     THE Horse (chestnut, spark star) among them: the only rider-less horse, perfectly still.
//     Camera: a crane down from the rafters: a string of pennants in the extreme foreground sweeps up past the lens
//     (a multiplane layer, faster than the world) while the camera descends and pushes in, easing out to a settled wide.
//     reads: 0-.25 the flash clears · .25-1.1 a whole formation galloping in unison (the drop) · 1.1-1.8 Oppa at the
//            point of it, the riders bouncing at the back.
//  B  71.091-74.727  bars 37-38 (gallop → lasso)  [cut-in on the bar line]  MEDIUM on Oppa (screen u ≈ 37), full body,
//     the flank dancers behind him pushed back by a light haze. Slow lateral drift + gentle push. Bar 37: the skip-step
//     (land on the beat, a knee up on the "and"), the reins bouncing, sand puffs on each landing. Bar 38 downbeat: his
//     right arm flies up and the lasso loop spins once per beat; every dancer behind him throws theirs on the same beat.
//     reads: 0-1.8 the gallop, clearly · 1.8-2.2 the switch to the lasso · 2.2-3.6 the loops spinning on the beat.
//  C  74.727-76.545  bar 39 (lasso)  [cut on the bar line]  THE HORSE (an insert, cheated forward and bigger): still,
//     deadpan, while behind it two riders lasso on horses prancing on the beat. Slow push in. Beat 2: a slow, heavy
//     blink (lid lowers, shuts for 5 frames, lowers, back). Beat 3: its eye slides to the camera with a tiny head dip,
//     and holds on us to the cut.
//  D  76.545-80.182  bars 40-41 (gallop)  [cut on the bar line: the Horse's deadpan stare → horses doing the dance]
//     THE CAROUSEL (painted here): a striped scalloped canopy with bulbs, a plum-and-teal mirrored centre column, brass
//     candy-striped poles, a red-and-gold platform skirt; painted wooden horses (glossy, bright saddles, jewelled
//     breastplates, poles through their bodies) with Clawd riders (a grandpa, grannies, a commuter). It turns: the outer
//     ring slides right, the centre column slower. Beat 1: an ordinary ride (the classic jumper pose, gliding on the
//     poles, riders content). Beat 2: the lead horse's painted eye blinks open with a spark, the wake ripples down the
//     line. Beat 3, on the beat: every horse rears up on its pole into THE HORSE DANCE (forelegs in the reins pose,
//     holding their own reins, hind knees skipping on the "and", bouncing, heads nodding, grinning) while the riders'
//     faces take (surprised, then scared) and they cling on (one arm flung up, rodeo).
//     reads: 0-.45 a carousel · .45-.9 it wakes · .9-3.6 horses doing the horse dance + the riders' astonishment.
//  E  80.182-83.818  bars 42-43 (lasso)  [cut on the bar line, on the action of the lasso throw]  THE ARENA, FULL POWER.
//     One beat close on Oppa's lasso, then the camera cranes up and back (exponential zoom, eased) to the widest
//     formation shot while the pennants drop into the top of the frame: every dancer and rider spinning a loop on the
//     beat, a little extra energy, THE Horse still in the back row. It settles on the wide for the last beats.
//     [out: a cut on the bar-44 downbeat (c06's montage). Last frame (83.792): the arena wide, the last lasso beat.]
//
// The counter HUD runs in every shot (1.3 M → 25 M). No lyrics, no text.
(() => {
  // ---------- the routine ----------
  const K = [[barT(36), 'gallop'], [barT(38), 'lasso'], [barT(40), 'gallop'], [barT(42), 'lasso']];
  const CX = 1600;                                   // the formation's centre line (the arena's stage centre)

  // ---------- the formation (world px; farther rows smaller) ----------
  // Oppa at the point; three staggered rows so every dancer's body shows between the ones in front.
  const OPPA = [CX, 1270, 27];
  const ROWS = [   // [y, u, x offsets]
    [930, 15, [-840, -420, 0, 420, 840]],
    [1045, 18, [-1050, -630, -210, 210, 630, 1050]],
    [1160, 21, [-840, -420, 420, 840]]
  ];
  const DANCERS = [];
  ROWS.forEach(([y, u, xs], r) => xs.forEach((dx, i) => DANCERS.push({ x: CX + dx, y, u, v: r * 7 + i + 1, r })));

  // Oppa: the shared routine through member(), with the lasso arm reaching a little higher so the loop clears his hair
  // (his head is taller than a plain Clawd's). Same move, same lassoHook, same timing.
  const LASSO_ON = [[barT(38), barT(40)], [barT(42), barT(44) + 1]];
  function oppaPose(t, o = {}) {
    const q = memberOpts('oppa', { look: 'black' }), hand = q._hand;
    const pose = routine(t, K, { hand, sleeve: q._sleeve, e: o.e });
    let w = 0;
    for (const [a, b] of LASSO_ON) if (t >= a && t < b) w = Math.min(ease((t - a) / .12), 1 - ease((t - (b - .12)) / .12));
    if (w > 0) {
      const bp = bpOf(t), up = pose.aR + .06 * w;
      pose.armLen = { L: pose.armLen.L ?? 2.4, R: (pose.armLen.R ?? 1.15) + .38 * w };
      pose.aR = up;
      if (w >= .5) pose.armR = lassoHook('R', up, bp % 1, 1.08, PAL.ink, hand);
    }
    return pose;
  }
  function oppa(t, x, y, u, o = {}) {
    const face = mfeel('oppa', 'cool', t);
    member('oppa', x, y, u, { look: 'black', eyes: face.eyes, mouth: o.mouth || 'grin', blush: face.blush, ...oppaPose(t, o), boilKey: 'oppa', ...(o.over || {}) });
  }

  // sand kicked up on every landing (the gallop lands on the beat): two soft puffs either side of the feet
  function sandPuff(x, y, u, t, ph, key) {
    const age = frac(bpOf(t) + ph) * BEAT; if (age > .34) return;
    const k = age / .34, e = easeOut(k);
    for (const sd of [-1, 1]) {
      boilSeed('puff' + key + sd);
      paint(ellPts(x + sd * (3.6 + 1.6 * e) * u, y - (.25 + .5 * e) * u, (.7 + 1.2 * e) * u, (.45 + .6 * e) * u, 12), { wash: '#F4E2B0', washOp: 210 * (1 - k), ink: null });
    }
  }
  function troupe(t, o = {}) {
    for (const d of DANCERS) {
      if (o.skip && o.skip(d)) continue;
      if (!vis(d.x - 14 * d.u, d.x + 14 * d.u)) continue;
      const cv = crowdVar(d.v);
      if (d.r === 2) sandPuff(d.x, d.y, d.u, t, cv.ph, d.v);
      dancer('dancer', d.x, d.y, d.u, K, t, { v: d.v, ...cv, e: cv.e * (o.e || 1), side: 1, mood: d.v % 3 ? 'happy' : 'excited', boilKey: 'd' + d.v, noShadow: d.r === 0 });
    }
    if (o.haze) { const [a, b, c, d] = viewRect2(100); boilSeed('haze'); paint(rectPts(a, b, c - a, d - b), { wash: '#F6EAD0', washOp: o.haze, ink: null }); }
    if (!o.noOppa) { sandPuff(OPPA[0], OPPA[1], OPPA[2], t, 0, 'oppa'); oppa(t, OPPA[0], OPPA[1], OPPA[2], o); }
  }

  // ---------- the back rail: riders on prancing horses, THE Horse among them ----------
  const RIDERS = [   // x, facing (1 = right), coat, rider variant
    [560, 1, 'grey', 3], [930, 1, 'bay', 5], [1270, 1, 'palomino', 8], [2240, -1, 'black', 2], [2600, -1, 'bay', 6]
  ];
  const HORSE_X = 1900, HORSE_Y = 835, HS = 11;       // THE Horse
  // the horse's blink is a window of .186 s every 5.86 s (horseEye); this seed opens it exactly at time tb
  const blinkAt = tb => ((4.1 - ((tb * .7) % 4.1)) % 4.1) / 1.3;
  // a rider on a prancing horse (a piaffe on the beat: trotting in place, head bobbing), the rider dancing the routine
  function riderHorse(t, x, y, s, f, coat, v, u, key) {
    const bp = bpOf(t), hop = Math.abs(Math.sin(bp * Math.PI));
    horse(x, y, s, t, { coat, flip: f < 0, walk: bp / 2 + v * .13, dy: -.25 * hop, headDown: .12 + .12 * hop, blink: v, boilKey: 'rh' + key });
    const sy = y + (-12.4 - .25 * hop) * s + .3 * s;   // the saddle
    dancer('dancer', x - f * 2.1 * s, sy + 2 * u, u, K, t, { v, ...crowdVar(v + 20), side: 1, noLegs: true, noShadow: true, mood: 'excited', boilKey: 'rider' + key });
  }
  function backRail(t, o = {}) {
    for (const [x, f, coat, v] of (o.riders || RIDERS)) if (vis(x - 260, x + 260)) riderHorse(t, x, HORSE_Y, HS * .96, f, coat, v, 10, x);
    if (!o.noHorse && !o.horseAt) theHorse(t, o);
  }
  function theHorse(t, o = {}) {
    const [x, y, s_] = o.horseAt || [HORSE_X, HORSE_Y, HS];
    horse(x, y, s_, t, { flip: true, mood: 'deadpan', blink: o.blink ?? 0, boilKey: 'THEhorse', ...(o.horse || {}) });
  }

  // ---------- set dressing: long swallowtail banners hanging from the roof (gold / crimson, the spark star) ----------
  const BAN = ['#E2B23A', '#B8322E', '#E2B23A', '#F4EAD2'];
  function banners(t) {
    const [a, , c] = viewRect2(200), bp = bpOf(t);
    for (let i = Math.floor((a - 300) / 440); i <= Math.ceil((c + 100) / 440); i++) {
      const x = i * 440 + 110, col = BAN[((i % 4) + 4) % 4], top = -760, bot = 300 + 30 * (i % 2);
      const sway = .012 * Math.sin((bp + i * .37) * Math.PI) + .006 * Math.sin(bp * TAU * .5 + i);
      boilSeed('ban' + i);
      push(); translate(x, top); rotate(sway);
      const w = 92, L = bot - top, P = [[-w / 2, 0], [w / 2, 0], [w / 2, L], [0, L - 70], [-w / 2, L]];
      paint(P, { wash: col, fill: mixCol(col, PAL.ink, .3), fillOp: 60, tex: .5, border: .3, bleed: .02, ink: PAL.ink, sw: .9 });
      paint([[-w / 2 + 10, 0], [-w / 2 + 18, 0], [-w / 2 + 18, L - 18], [-w / 2 + 10, L - 12]], { wash: mixCol(col, '#FFFFFF', .35), ink: null });   // a sheen down one edge
      horseStar(0, L - 150, 30, .8);
      pop();
    }
  }

  // a string of pennants in the extreme foreground (screen space, bigger and faster than the world: the crane's
  // multiplane layer). y0 = the screen height of the string's ends; it sags in the middle.
  const PEN = ['#D8453A', '#F2C94A', '#F7F0E4', '#3A9C98', '#E27A92', '#F2C94A'];
  function fgBunting(t, y0, sc = 1.3) {
    if (y0 < -420 * sc) return;
    const bp = bpOf(t), sag = 110 * sc, n = 13, X0 = -220, X1 = W + 220, yAt = x => { const q = (x - W / 2) / (W / 2 + 220); return y0 + sag * (1 - q * q); };
    boilSeed('fgb line');
    const L = []; for (let i = 0; i <= 16; i++) { const x = lerp(X0, X1, i / 16); L.push([x, yAt(x)]); }
    inkLine(L, 3.2 * sc, '#5A3A1E', 'ink', .5);
    for (let i = 0; i < n; i++) {
      const x = lerp(X0, X1, (i + .5) / n), y = yAt(x), slope = Math.atan2(yAt(x + 5) - yAt(x - 5), 10);
      const sw_ = .1 * Math.sin((bp + i * .23) * Math.PI) + .03 * Math.sin(bp * TAU + i);
      boilSeed('fgb' + i);
      push(); translate(x, y); rotate(slope + sw_);
      paint([[-62 * sc, 0], [62 * sc, 0], [0, 135 * sc]], { wash: PEN[i % 6], fill: mixCol(PEN[i % 6], PAL.ink, .25), fillOp: 45, tex: .4, ink: PAL.ink, sw: 1.3 * sc });
      inkLine([[-40 * sc, 12 * sc], [-8 * sc, 90 * sc]], 1.4 * sc, '#FFFFFF', 'inkfine', 0);
      pop();
    }
  }

  function arenaWorld(t, cam, o = {}) {
    camBegin(...cam);
    arena(t, { hooks: { back: () => { if (!o.noBanners) banners(t); backRail(t, o); },
      mid: () => { troupe(t, o); if (o.fg) for (const [x, y, s_, f, coat, v, u] of o.fg) riderHorse(t, x, y, s_, f, coat, v, u, 'fg' + x); if (o.horseAt) theHorse(t, o); } } });
    camEnd();
  }

  // ---------- A · the drop: the full-formation wide ----------
  function shotA(t, lt, dur) {
    const k = easeOut(seg(lt, .02, dur + .1)), zoom = .58 * Math.pow(.75 / .58, k);
    const cam = [CX + lerp(-50, 0, k), lerp(410, 745, k), zoom];
    arenaWorld(t, cam);
    fgBunting(t, lerp(230, -720, ease(seg(lt, .12, 1.3))));          // the rafters' bunting sweeps up past the lens
    counterHUD(t);
    if (lt < .25) flash(1 - lt / .25, '#FFF8E6');
  }

  // ---------- B · the medium on Oppa: the gallop, then the lasso ----------
  function shotB(t, lt, dur) {
    const k = ease(seg(lt, 0, dur));
    const cam = [OPPA[0] + lerp(-60, 40, k), lerp(990, 975, k), lerp(1.36, 1.44, k)];
    arenaWorld(t, cam, { skip: d => d.r === 1 && Math.abs(d.x - CX) < 300, haze: 70 });
    counterHUD(t);
  }

  // ---------- C · THE Horse: the only one not dancing ----------
  const TB = beatT(39, 1.15);                          // the slow blink (the real blink window opens here)
  function shotC(t, lt, dur) {
    const k = ease(seg(lt, 0, dur));
    const cam = [lerp(1845, 1815, k), lerp(752, 728, k), lerp(3.0, 3.45, k)];
    const heavy = (t >= TB - .09 && t < TB) || (t >= TB + .186 && t < TB + .29), tl = beatT(39, 2);
    const horseO = { mood: heavy ? 'smug' : 'deadpan', blink: blinkAt(TB), look: t >= tl ? 'camera' : undefined, headDown: .1 * ease(seg(t, tl - .04, tl + .4)) };
    arenaWorld(t, cam, { riders: [[1610, -1, 'palomino', 8], [2095, 1, 'black', 2]], horse: horseO, horseAt: [1905, 965, 16],
      noOppa: true, noBanners: true, skip: () => true });
    counterHUD(t);
  }

  // =================================================================================================================
  // ---------- D · THE CAROUSEL (a single-use set, painted here) ----------
  // Flat 2D: the carousel turns counter-clockwise, so its near side slides RIGHT across the frame. Everything on the outer
  // ring (poles, horses, riders, canopy stripes, platform skirt) slides at SPD; the mirrored centre column, on a smaller
  // radius, slides slower. No projection: the frame only ever shows the front stretch of the ring.
  const T_D = barT(40), SPD = 104, T_WAKE = beatT(40, 1) - .08, T_DANCE = beatT(40, 2);   // beat 2: they wake · beat 3: they dance
  const CC = [   // painted wooden horses: body, shade, mane, seat, blanket, trim
    { body: '#F7F0E4', dk: '#D9CBB4', mane: '#E8B84A', seat: '#3A62B8', blanket: '#D8453A', trim: '#F2C94A', hoof: '#E8B84A' },
    { body: '#2F2B38', dk: '#1E1B26', mane: '#F4EAD2', seat: '#E8B84A', blanket: '#3A9C98', trim: '#F2C94A', hoof: '#F2C94A' },
    { body: '#F4C98A', dk: '#D8A460', mane: '#F7F0E4', seat: '#B8322E', blanket: '#7B5CA8', trim: '#F2C94A', hoof: '#F7F0E4' },
    { body: '#CFE0EA', dk: '#A8BCCB', mane: '#E27A92', seat: '#E27A92', blanket: '#F2C94A', trim: '#FFF5E2', hoof: '#E27A92' },
    { body: '#F7F0E4', dk: '#D9CBB4', mane: '#7B5CA8', seat: '#3A9C98', blanket: '#E27A92', trim: '#F2C94A', hoof: '#E8B84A' }
  ];
  // riders: [cast name, variant]
  const CR = [['grandpa', 1], ['granny', 0], ['commuter', 2], ['granny', 3], ['crowd', 3]];

  const _sk = f => Math.pow(Math.sin(Math.PI * clamp((f - .08) / .92)), .85);   // the skip lift (as dance.js)
  // the pose of carousel horse i at time t: the wooden "jumper" (gliding on its pole) blended into THE HORSE DANCE
  function ccPose(t, i, alive) {
    const bp = bpOf(t), glide = Math.sin((bp / 2 + i * .5) * Math.PI);
    const R = { rot: -.07, dy: 1.3 * glide, fl: [[1.25, -2.35], [1.05, -2.15]], hl: [[-.8, -.2], [-.58, -.18]], head: 1.08, mouth: .55, tail: 0, bob: 0 };
    if (alive <= 0) return R;
    const ph = (hash(i * 3.3) - .5) * .06, q = bp + ph, b = Math.floor(q), f = q - b, lead = b % 2 ? -1 : 1;
    const hop = Math.sin(Math.PI * f), land = Math.exp(-f * 9), lift = _sk(f), r = -.36 + .05 * hop - .03 * lead;
    // angles are local to the tilted body; "w - r" turns a WORLD angle (0 = straight down, + = toward the head) into local
    const W_ = w => w + r;
    const up = [W_(lerp(-.05, 1.35, lift)), lerp(0, -1.45, lift)], st = [W_(-.05), 0];            // the skip: a knee comes up on the "and"
    const fore = (dw) => { const a = .12 + dw - .1 * hop; return [W_(a), (1.5 + .3 * hop) - a]; };   // the reins: upper leg hanging, forearm level, bouncing
    const D = { rot: r, dy: -1.25 * hop + .25 * land, fl: [fore(0), fore(-.12)],
      hl: lead > 0 ? [up, st] : [st, up], head: .62 + .34 * land, mouth: 1, tail: .6 * Math.sin(q * Math.PI), bob: hop };
    const k = alive, L = (a, b) => lerp(a, b, k);
    return { rot: L(R.rot, D.rot), dy: L(R.dy, D.dy), fl: R.fl.map((p, j) => [L(p[0], D.fl[j][0]), L(p[1], D.fl[j][1])]),
      hl: R.hl.map((p, j) => [L(p[0], D.hl[j][0]), L(p[1], D.hl[j][1])]), head: L(R.head, D.head), mouth: L(R.mouth, D.mouth), tail: D.tail * k, bob: D.bob * k };
  }
  // a leg from joint J: upper segment at angle a1 from straight down (+ = toward the head), the lower bent by a2
  function ccLeg(J, a1, a2, s, col, hoof, sw) {
    const K_ = [J[0] + Math.sin(a1) * 2.7 * s, J[1] + Math.cos(a1) * 2.7 * s], a = a1 + a2;
    const H_ = [K_[0] + Math.sin(a) * 2.6 * s, K_[1] + Math.cos(a) * 2.6 * s];
    paint(ribbon([J, K_, H_], 1.35 * s, .8 * s), { wash: col, ink: PAL.ink, sw });
    const d = [Math.sin(a), Math.cos(a)], n = [d[1], -d[0]], w = .5 * s, l = .85 * s;
    paint([[H_[0] + n[0] * w, H_[1] + n[1] * w], [H_[0] + n[0] * w + d[0] * l, H_[1] + n[1] * w + d[1] * l], [H_[0] - n[0] * w + d[0] * l, H_[1] - n[1] * w + d[1] * l], [H_[0] - n[0] * w, H_[1] - n[1] * w]], { wash: hoof, ink: PAL.ink, sw: sw * .8 });
    return H_;
  }
  // one painted carousel horse, facing right. (x, y) = where its pole enters its back. P = ccPose(), eye: 0 painted .. 1 alive
  function ccHorse(x, y, s, P, C, eyeK, t, key, i) {
    const sw = clamp(s / 15, .5, 2.2), S = pts => pts.map(([a, b]) => [a * s, b * s]);
    push(); translate(x, y + P.dy * s); rotate(P.rot);
    // far legs (shaded), the tail
    boilSeed(key + 'far');
    ccLeg([2.9 * s, 3.9 * s], P.fl[1][0], P.fl[1][1], s, C.dk, mixCol(C.hoof, PAL.ink, .25), sw);
    ccLeg([-4.9 * s, 3.6 * s], P.hl[1][0], P.hl[1][1], s, C.dk, mixCol(C.hoof, PAL.ink, .25), sw);
    boilSeed(key + 'tail');
    const tw = P.tail;
    paint(ribbon(S([[-6.3, .9], [-8.2, 1.8 + tw * .3], [-8.9 + tw * .6, 4.2], [-8.2 + tw * 1.1, 6.6]]), 1.9 * s, .5 * s), { wash: C.mane, fill: mixCol(C.mane, PAL.ink, .2), fillOp: 50, tex: .4, ink: PAL.ink, sw: sw * .8 });
    // the body: a glossy barrel with a chest
    boilSeed(key + 'body');
    paint(S([[-6.6, 1.6], [-5.8, .1], [-3, -.3], [1, -.1], [3.6, .4], [5.1, 2.2], [4.8, 4.6], [3, 5.4], [-2, 5.3], [-5.6, 4.6], [-6.8, 3.2]]), { wash: C.body, fill: C.dk, fillOp: 70, tex: .5, border: .6, ink: PAL.ink, sw, curv: .45 });
    // the blanket (scalloped), the seat with its cantle and pommel, the jewelled breastplate, a stirrup
    const bl = [[-4.7, -.1], [-.2, -.1]]; for (let k = 0; k <= 6; k++) { const bx = -.2 - k * 4.5 / 6; bl.push([bx, 3.1 + (k % 2 ? .45 : 0)]); }
    paint(S(bl), { wash: C.blanket, ink: PAL.ink, sw: sw * .8 });
    inkLine(S([[-4.6, 2.75], [-2.4, 2.95], [-.3, 2.75]]), sw * 1.4, C.trim, 'ink', .5);
    paint(S([[-4.6, -.2], [-4.9, -1.5], [-4.3, -1.4], [-3.4, -.5], [-1.4, -.5], [-.6, -1.35], [-.1, -1.2], [-.2, .15]]), { wash: C.seat, ink: PAL.ink, sw: sw * .9, curv: .3 });
    inkLine(S([[-2.4, .1], [-2.35, 3.6]]), sw * .7, '#6A4424', 'ink', 0);
    paint(S([[-2.9, 3.5], [-1.8, 3.5], [-1.9, 4.2], [-2.8, 4.2]]), { wash: C.trim, ink: PAL.ink, sw: sw * .6 });
    inkLine(S([[.2, .6], [2.4, 1.4], [4.4, 3.3]]), sw * 2.4, C.trim, 'ink', .5);
    for (const [jx, jy, jc] of [[1.3, 1.05, '#D8453A'], [3.0, 2.0, '#3A9C98'], [4.1, 3.0, '#D8453A']]) paint(ellPts(jx * s, jy * s, .32 * s, .32 * s, 8), { wash: jc, ink: PAL.ink, sw: sw * .4 });
    // gloss on the back and rump, and a twinkle
    inkLine(S([[-5.6, 1.0], [-4.9, .45], [-3.8, .25]]), sw * 1.6, '#FFFFFF', 'inkfine', .5);
    inkLine(S([[1.4, .35], [2.9, .65]]), sw * 1.3, '#FFFFFF', 'inkfine', .4);
    const tk = .5 + .5 * Math.sin(t * 7 + i * 2);
    paint(starPts(-5.2 * s, 1.5 * s, (.5 + .35 * tk) * s, .28, 4), { wash: '#FFFFFF', ink: null });
    // near legs
    boilSeed(key + 'near');
    const hf1 = ccLeg([3.5 * s, 4.1 * s], P.fl[0][0], P.fl[0][1], s, C.body, C.hoof, sw);
    ccLeg([-4.3 * s, 3.9 * s], P.hl[0][0], P.hl[0][1], s, C.body, C.hoof, sw);
    // the arched neck with its carved mane
    boilSeed(key + 'neck');
    paint(S([[1.2, 1.4], [3.6, .2], [5.6, -3.2], [6.7, -5.4], [7.8, -4.4], [7.0, -1.4], [5.4, 2.8], [3.6, 3.4]]), { wash: C.body, fill: C.dk, fillOp: 45, tex: .5, ink: PAL.ink, sw, curv: .4 });
    const M = []; for (let k = 0; k <= 7; k++) { const q = k / 7; M.push([lerp(6.4, 1.6, q) - .9 + .35 * Math.sin(k * 2.1 + P.bob * 2), lerp(-5.6, .2, q) - .5]); }
    paint(ribbon(S(M), 1.9 * s, 1.1 * s), { wash: C.mane, fill: mixCol(C.mane, PAL.ink, .25), fillOp: 55, tex: .4, ink: PAL.ink, sw: sw * .8 });
    inkLine(S([[5.4, -2.6], [6.4, -4.2]]), sw * 1.2, '#FFFFFF', 'inkfine', .4);
    // the head
    boilSeed(key + 'head');
    push(); translate(6.9 * s, -4.9 * s); rotate(P.head);
    paint(S([[-1.2, -1.2], [1.4, -1.45], [4.3, -1.0], [5.3, -.4], [5.3, .9], [4.4, 1.35], [1.2, 1.4], [-1.1, 1.0]]), { wash: C.body, fill: C.dk, fillOp: 40, tex: .5, ink: PAL.ink, sw, curv: .35 });
    const mo = P.mouth;   // an open mouth (carved wide in the wood; a big grin when alive): teeth and a pink tongue
    paint(S([[3.3, .7], [5.35, .45 - .2 * mo], [5.4, .95 + .8 * mo], [4.2, 1.15 + .55 * mo]]), { wash: '#7A2A38', ink: PAL.ink, sw: sw * .7 });
    paint(S([[3.6, .78], [5.3, .52 - .18 * mo], [5.3, .78 - .1 * mo], [3.7, .98]]), { wash: '#FFF8EC', ink: null });
    if (mo > .7) paint(ellPts(4.75 * s, (1.35 + .45 * mo) * s, .55 * s, .28 * s, 10, 0, -.3), { wash: '#F28AA0', ink: null });
    paint(ellPts(4.85 * s, -.55 * s, .32 * s, .2 * s, 8), { wash: PAL.ink, ink: null });                      // nostril
    for (const e of [-.3, .5]) paint(S([[e - .45, -1.2], [e + .05, -3.4], [e + .5, -1.15]]), { wash: e < 0 ? C.dk : C.body, ink: PAL.ink, sw: sw * .7 });   // ears
    paint(ribbon(S([[-.2, -1.35], [.9, -1.9], [1.8, -1.5]]), .9 * s, .3 * s), { wash: C.mane, ink: PAL.ink, sw: sw * .5 });   // forelock
    inkLine(S([[3.2, -1.2], [3.1, 1.3]]), sw * 1.5, C.trim, 'ink', 0); inkLine(S([[.3, -1.35], [.6, 1.25]]), sw * 1.5, C.trim, 'ink', 0);   // bridle
    paint(ellPts(.45 * s, -.2 * s, .38 * s, .38 * s, 10), { wash: C.blanket, ink: PAL.ink, sw: sw * .5 });   // rosette
    // the eye: painted (a fixed almond with lashes) → alive (rounder, the pupil darting, a blink as it wakes)
    const ex = 1.9 * s, ey = -.35 * s, R_ = (.62 + .18 * eyeK) * s;
    paint(ellPts(ex, ey, R_ * 1.15, R_ * .85, 14), { wash: '#FFFDF6', ink: PAL.ink, sw: sw * .7 });
    const wake = eyeK > 0 && eyeK < 1 ? Math.sin(eyeK * Math.PI) : 0;
    if (wake < .6) {
      const lx = eyeK * (-.12 + .08 * Math.sin(t * 2.3 + i)), ly = eyeK * .05;
      paint(ellPts(ex + lx * s, ey + ly * s, R_ * .58, R_ * .7, 12), { wash: eyeK > .5 ? '#2A1E24' : '#3A5AA8', ink: null });
      paint(ellPts(ex + (lx - .18) * s, ey + (ly - .22) * s, R_ * .2, R_ * .22, 8), { wash: '#FFFFFF', ink: null });
    } else inkLine([[ex - R_ * 1.1, ey], [ex + R_ * 1.1, ey + R_ * .1]], sw * 1.2, PAL.ink, 'ink', .3);
    for (let k = 0; k < 3; k++) inkLine([[ex - R_ * .6 + k * R_ * .6, ey - R_ * .8], [ex - R_ * .75 + k * R_ * .75, ey - R_ * 1.35]], sw * .6, PAL.ink, 'inkfine', 0);   // lashes
    pop();
    // the reins: bit → pommel (wooden), or bit → its own forehooves (dancing: it holds its own reins)
    boilSeed(key + 'reins');
    const bit = [6.9 * s + Math.cos(P.head) * 4.5 * s - Math.sin(P.head) * .9 * s, -4.9 * s + Math.sin(P.head) * 4.5 * s + Math.cos(P.head) * .9 * s];
    const tgt = eyeK > .5 ? hf1 : [-.4 * s, -1 * s];
    inkLine([bit, [lerp(bit[0], tgt[0], .5), lerp(bit[1], tgt[1], .5) + 1.2 * s], tgt], sw * 1.1, '#B8322E', 'ink', .5);
    pop();
  }
  // a brass pole with a candy spiral, from the canopy to the platform
  function ccPole(x, y0, y1, key) {
    boilSeed(key);
    paint(rectPts(x - 11, y0, 22, y1 - y0), { wash: '#E2B23A', fill: '#B8862A', fillOp: 60, tex: .4, ink: PAL.ink, sw: .9 });
    for (let yy = y0 + 10; yy < y1 - 10; yy += 34) inkLine([[x - 10, yy + 14], [x + 10, yy]], 2.2, '#F7F0E4', 'ink', 0);
    inkLine([[x - 5, y0 + 6], [x - 5, y1 - 6]], 1.2, '#FFF2C8', 'inkfine', 0);
  }

  function carousel(t, lt) {
    const [a, b, c, d] = viewRect2(60), ring = SPD * lt, inner = .5 * ring, bp = bpOf(t);
    // the centre column (inner ring, slower): deep plum, teal panels in gold frames, mirrors
    boilSeed('cc column');
    paint(rectPts(a, b, c - a, d - b), { wash: '#4A2A3E', ink: null });
    const PW = 420;
    for (let k = Math.floor((a - inner - PW) / PW); k <= Math.ceil((c - inner) / PW); k++) {
      const x = k * PW + inner; boilSeed('cc panel' + k);
      paint(rectPts(x + 22, 150, PW - 44, 700), { wash: '#5E3450', fill: '#3A1E30', fillOp: 60, tex: .5, ink: PAL.ink, sw: 1 });
      if (k % 2) {   // a mirror: pale blue with a diagonal sheen
        paint(rrPts(x + 70, 200, PW - 140, 600, 80), { wash: '#A9C9DA', fill: '#7FA6BE', fillOp: 70, tex: .4, ink: '#C99A45', sw: 3 });
        paint([[x + 110, 760], [x + 190, 760], [x + 310, 240], [x + 230, 240]], { wash: '#DDEFF6', washOp: 170, ink: null });
      } else {       // a painted panel: teal in a gold frame, the spark star
        paint(rrPts(x + 64, 196, PW - 128, 610, 26), { wash: '#E2B23A', ink: PAL.ink, sw: .9 });
        paint(rrPts(x + 88, 220, PW - 176, 562, 18), { wash: '#2F6F78', fill: '#1F5058', fillOp: 60, tex: .4, ink: null });
        horseStar(x + PW / 2, 500, 80, 1);
      }
    }
    // the platform: boards and a skirt of gold scrolls (outer ring)
    boilSeed('cc platform');
    paint(rectPts(a, 950, c - a, 46), { wash: '#C88A4A', fill: '#9A6030', fillOp: 70, tex: .6, ink: PAL.ink, sw: 1 });
    paint(rectPts(a, 996, c - a, d - 996 + 60), { wash: '#B8322E', ink: PAL.ink, sw: 1 });
    for (let k = Math.floor((a - ring - 300) / 300); k <= Math.ceil((c - ring) / 300); k++) {
      const x = k * 300 + ring; boilSeed('cc skirt' + k);
      paint(rrPts(x + 24, 1018, 252, 110, 30), { wash: '#F2C94A', fill: '#D8A020', fillOp: 60, ink: PAL.ink, sw: .9 });
      paint(ellPts(x + 150, 1070, 44, 30, 12), { wash: '#B8322E', ink: PAL.ink, sw: .7 });
    }
    // the horses on their poles, with their riders
    const HS_ = 31, GAP = 730, py = 500;
    for (let k = Math.floor((a - ring - 700) / GAP); k <= Math.ceil((c - ring + 700) / GAP); k++) {
      const x = k * GAP + ring + 260, i = ((k % 5) + 5) % 5, C = CC[i];
      if (!vis(x - 520, x + 520)) continue;
      const rank = Math.abs(k - 1);                                  // the lead horse (k = 1) wakes first; the wake ripples out
      const ta = T_WAKE + rank * .07, eyeK = seg(t, ta, ta + .2), td = T_DANCE + rank * .03, alive = ease(seg(t, td - .14, td));
      const P = ccPose(t, i, alive);
      ccPole(x, -120, 960, 'cc pole' + k);
      ccHorse(x, py, HS_, P, C, eyeK, t, 'cch' + k, i);
      if (k === 1 && t > ta + .12 && t < ta + .75) {                  // the lead horse's eye: a spark as it comes alive
        const hx = x + (Math.cos(P.rot) * 7.6 - Math.sin(P.rot) * -6.2) * HS_, hy = py + P.dy * HS_ + (Math.sin(P.rot) * 7.6 + Math.cos(P.rot) * -6.2) * HS_;
        boilSeed('cc spark'); emote('spark', hx + 30, hy - 40, 26, seg(t, ta + .12, ta + .3) * (1 - seg(t, ta + .55, ta + .75)), t - ta);
      }
      // the rider: sitting on the saddle, hugging the pole; astonished once the horse wakes (some fling an arm up, rodeo)
      const [nm, v] = CR[i], u = 16, lx = -3.4, ly = -.9;
      const sx = x + (Math.cos(P.rot) * lx - Math.sin(P.rot) * ly) * HS_, sy = py + P.dy * HS_ + (Math.sin(P.rot) * lx + Math.cos(P.rot) * ly) * HS_;
      const shock = nm === 'grandpa' || i % 2 ? 'scared' : 'surprised';
      const M_ = mood(nm, t, [[t - 10, 'happy'], [td + .01, nm === 'grandpa' ? 'scared' : 'surprised'], [td + .6 + .1 * i, shock]], { v, take: 1.2 });
      const lag = Math.sin(Math.PI * frac(bp - .12)) * alive, rodeo = i % 2 === 0 && alive > .5;
      member(nm, sx, sy + 2 * u, u, { ...M_, v, noLegs: true, noShadow: true, rot: P.rot * .5, dy: (M_.dy || 0) * .5 - .3 * lag,
        frontArm: rodeo ? 'LR' : 'R', aR: .15, armR: fistHook(), armLen: { R: .45, L: rodeo ? 1.3 : 1 },
        aL: rodeo ? 1.2 + .3 * Math.sin(bp * TAU) : -.9, armL: fistHook(), boilKey: 'ccr' + k });
    }
    // the canopy: a striped, scalloped valance with bulbs (outer ring); only its hem shows at the top of the frame
    boilSeed('cc canopy');
    paint(rectPts(a, b, c - a, 60 - b), { wash: '#F4E3BC', ink: null });
    const SW = 96;
    for (let k = Math.floor((a - ring - SW) / SW); k <= Math.ceil((c - ring) / SW); k++) {
      const x = k * SW + ring; boilSeed('cc stripe' + k);
      const P2 = [[x, b - 20], [x + SW, b - 20], [x + SW, 70]]; for (let q = 1; q < 8; q++) { const ang = q / 8 * Math.PI; P2.push([x + SW / 2 + Math.cos(ang) * SW / 2, 70 + Math.sin(ang) * 42]); }
      P2.push([x, 70]);
      paint(P2, { wash: k % 2 ? '#D8453A' : '#F7F0E4', ink: PAL.ink, sw: .9 });
      paint(ellPts(x + SW / 2, 124, 11, 11, 8), { wash: '#FFF4D0', ink: PAL.ink, sw: .6 });
      if (k % 2 === 0) glow(x + SW / 2, 124, 70, '#FFD27A', .45 + .35 * pulse(t, 3));
    }
  }

  function shotD(t, lt, dur) {
    const k = ease(seg(lt, 0, dur));
    camBegin(lerp(940, 1010, k), lerp(540, 548, k), lerp(1.0, 1.06, k));
    carousel(t, lt);
    camEnd();
    counterHUD(t);
  }

  // ---------- E · back to the arena, full power: crane up and back to the widest shot ----------
  function shotE(t, lt, dur) {
    const k = ease(seg(lt, .32, 2.95)), zoom = 1.28 * Math.pow(.75 / 1.28, k);
    const cam = [CX + lerp(-30, 0, k), lerp(985, 755, k), zoom];
    arenaWorld(t, cam, { haze: 65 * (1 - k), e: 1.1 });
    fgBunting(t, lerp(-700, -150, ease(seg(lt, .9, 3.2))));        // the bunting drops into the top of the frame as we rise
    counterHUD(t);
  }

  shots([[barT(36), shotA], [barT(37), shotB], [barT(39), shotC], [barT(40), shotD], [barT(42), shotE]]);
})();
