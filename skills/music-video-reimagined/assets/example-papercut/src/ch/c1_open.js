// c1_open.js: Chapter 1, cold open + intro (0 -> barT(7) = 24.381).
//
// ============================================ SHOT PLAN ============================================
// Music: silence to 2.000 · the first hit (drum loop + eerie sample) at 2.000 · riser from ~10.0 · the full band
// crashes in at barT(3) = 11.592 and plays the riff for bars 3-6 · the verse starts at barT(7) = 24.381 (chapter 2).
// The riff's accents inside each bar (measured from the audio), in beats after the bar line: 0, .25, .5, 1.25, 1.75,
// 2.25, 2.5, 3.25 (see riffK()).
//
// S1  0.000 - 2.083  THE LAMP (an insert, painted at its own scale)          [in: from black]
//     Black and silent. The desk's table lamp stutters on (flashes at 0.42 and 0.58, holds from 0.75) and lights a
//     close-up of a record spinning on Joe's gilt desk: the label's spark turns. From the dark at the right, Joe's
//     nub reaches into the light (0.95), pinches the tonearm's finger lift, lifts it (1.2), swings it over the record
//     (1.35-1.65) and hovers (anticipation: a tremble, a little rise) ... then drops: the needle touches at 2.000
//     exactly, the lamp flares and the record jolts; two frames of impact, then a cut on the hit.
//     reads: light comes on (0.42-1.0) · the record spinning (0.75-1.1) · a nub takes the needle (0.95-1.65) ·
//            the hover (1.65-1.9) · the drop (1.9-2.0)
//
// S2  2.083 - 11.592  THE DOLLY: one continuous camera move to the right through the lit parlor (world x 700 -> 3130),
//     easing between the band members and never quite stopping (velocity bumps on a slow drift). Warm lamplight.
//     J  2.08-3.4   the camera pulls back off the record (match to S1): JOE at the decks, scratching on the eighths,
//                   eyes on the decks; on beat 2 (2.80) he looks up into the lens and smirks. Hold.
//     R  4.1-5.6    ROB keeps the loop on the hats; on beat 4 (4.40) he flicks his right stick up: it spins twice in
//                   the air while he watches it, drops back into his nub (5.0), and he slams the crash exactly on the
//                   bar-1 downbeat (5.197): the cymbal wobbles, his hair bounces, a proud grin.
//     P  6.1-7.0    rising to the ANCESTOR PORTRAIT: stern, eyes ahead ... then the eyes slide to follow the camera as
//                   it moves on (stage 'look'), and keep following us down to the couch.
//     C  7.3-8.5    BRAD and PHOENIX on the couch: Brad tunes (head tilted to the neck, eyes shut, one pluck per beat,
//                   a nod on the beat); Phoenix grins and bobs on the off-beats. Not in sync.
//     M  8.9-9.95   MIKE leaning on the frame of the right-hand doors, glancing left, then right (paranoid); the paper
//                   dragonfly flits past his face (surprise, a '!'), and he watches it fly on to the right ...
//     K  10.0-11.59 ... where it lands by a HAIRLINE CUT in the wallpaper right of the doors: CHESTER, from behind,
//                   on tiptoe, peering up at it (the riser). The lamps stutter (10.45-10.75), the dragonfly bolts, he
//                   spins round through the key views (10.79-11.0), sees us, crouches lower and lower (anticipation,
//                   the camera pushing in) ... and launches, lid flying open, on 11.59.
//     reads: one member per ~1.5 s, each on his own action; every action lands on a beat.
//     out: cut on action (Chester's launch).
//
// S3  11.592 - 14.789  WIDE: the band crashes in                                [in: cut on action]
//     The camera starts right, on Chester already in the air screaming (scream rings), and pans left with his flight
//     into the standard WIDE as he lands on his mark on the riff accent at 12.59 (squash, dust puff). The room shakes
//     on the crash (11.59) and on the landing; the floor lamps swing, dust sifts from the ceiling, the portrait
//     rattles on its nail and the open doors slam shut. Everyone plays flat out (bandHooks + drum hits). On 14.19 Chester glances back over his
//     shoulder toward the doors, and the camera starts to push in on him.
//     reads: the whole band, in one place, at full power (12.6-14.2) · Chester still thinking about that crack.
//     out: eyeline cut to the crack, the push continuing.
//
// S4  14.789 - 17.986  BEHIND THE PAPER                                         [in: cut on movement]
//     Close on the hairline: on the riff's triple hit (14.79, 14.99, 15.19) it jolts wider, three times, into a slit,
//     and the camera pushes through it (the paper rushes past, the room behind comes on slower: parallax) into the
//     INK SIDE: the mirrored parlor in ink and chalk, dripping. By the ink desk, in a dark corner, a shape stirs
//     (16.2), two eyes open (16.6), and it turns to face us (16.8). Hold on the eyes, then pull back out through the
//     slit, the eyes the last thing in it as it seals back to a hairline (17.4-17.95).
//     reads: where we are (15.7-16.2) · something is here (16.2-16.6) · it has noticed us (16.6-17.3).
//     out: cut on the downbeat, the camera still pulling back.
//
// S5  17.986 - 21.183  THE FRONTMEN (continuous with S6)
//     Two-shot in front of the wallpaper. The lamps throw Mike's and Chester's big shadows on the wall (Mike's to the
//     left, Chester's to the right), and the shadows copy them perfectly. They trade moves on the riff: Mike pumps
//     his fist on the triple hit, Chester answers with a stomp (18.99), Mike throws the mic up (19.39), Chester
//     headbangs twice (19.79, 19.99); then both crouch and HOP together, taking off on 20.59 and landing on the bar-6
//     downbeat (21.183), shadows and all.
//     reads: two frontmen (18.0-18.4) · their shadows copy them (18.4-20.5) · the hop, shadows match (20.3-21.3).
//
// S6  21.183 - 24.381  HANDOFF
//     The riff winds down and the room dims around a warm pool of lamplight at Mike's mark. Chester turns to Mike and
//     points him to it; Mike nods, steps forward into the light (22.2-23.0), faces front, and raises his mic to his
//     mouth (23.3-24.2) while the camera pushes in to the Mike-medium framing (1560, 760, 1.9).
//     reads: Chester gives him the floor (21.4-22.2) · Mike steps into the light (22.2-23.2) · the verse is his.
//     out (seam to c2): cut on action, Mike at LAY.mike, front view, mic arriving at his mouth, camera (1560, 760, 1.9).
//
// World state: warm lamplight; portrait 'stern', 'look' while its eyes follow the dolly; the hairline cut stays in
// the wallpaper right of the doors at CRACK (it matters later).
// ====================================================================================================
(() => {
  // ---------------------------------------------------------------------------------- times and places
  const S1 = 0, S2 = HIT.first + 2 / 24, S3 = barT(3), S4 = barT(4), S5 = barT(5), END = barT(7);
  // the hairline cut in the wallpaper, right of the doors (world). Chapters that reuse it: see the report.
  const CRACK = { a: [3232, 462], b: [3306, 584] };
  const CRACK_MID = [(CRACK.a[0] + CRACK.b[0]) / 2, (CRACK.a[1] + CRACK.b[1]) / 2];

  // ---------------------------------------------------------------------------------- small helpers
  const bump = u => { u = clamp(u); return u - Math.sin(TAU * u) / TAU; };               // smooth 0..1, zero speed at both ends
  const moves = (t, list) => list.reduce((s, [a, b, d]) => s + d * bump((t - a) / (b - a)), 0);
  const lerp3 = (a, b, k) => a.map((v, i) => lerp(v, b[i], k));
  // the riff's accents, in beats after each bar line (bars 3-6)
  const RIFF = [0, .25, .5, 1.25, 1.75, 2.25, 2.5, 3.25];
  function riffK(t, k = 9) {   // 1 on each riff accent, then decays
    if (t < barT(3) - .01) return 0;
    const bp = (t - barT(3)) / BEAT, bar = Math.floor(bp / 4), inb = bp - bar * 4;
    let best = 99; for (const r of RIFF) { const d = inb - r; if (d >= 0 && d < best) best = d; }
    if (best === 99) best = inb + 4 - RIFF[RIFF.length - 1];
    return Math.exp(-best * BEAT * k);
  }

  // members out of the current camera's view (for bandHooks' skip list): call it inside camBegin
  function offscreen(extra = []) {
    const spots = { joe: [LAY.joe[0], 120], rob: [LAY.rob[0], 150], brad: [LAY.brad[0], 150], phoenix: [LAY.phoenix[0], 190], mike: [LAY.mike[0], 130], chester: [LAY.chester[0], 130] };
    return Object.keys(spots).filter(k => !inView(spots[k][0] - spots[k][1], spots[k][0] + spots[k][1])).concat(extra);
  }
  // Where a member's parts land in the world for a pose (mirrors clawd()'s transform), so props can touch them.
  function rig(name, x, y, u, o) {
    const M = BAND[name] || { sx: 1, sy: 1 }, V = VIEWS[o.view] || VIEWS.front;
    const sq = (o.sq || 0) + (o.take || 0), sm = clamp(o.smear || 0);
    const fx = (o.flip ? -1 : 1) * (o.sx ?? 1) * M.sx * (1 + sq * .6) * (1 + sm * .35), fy = (o.sy ?? 1) * M.sy * (1 - sq);
    const X = x + (o.dx || 0) * u, Y = y + (o.dy || 0) * u, c = Math.cos(o.rot || 0), s = Math.sin(o.rot || 0);
    const W = ([lx, ly]) => { const a = lx * fx, b = ly * fy; return [X + a * c - b * s, Y + a * s + b * c]; };
    // an arm: its tip in the world, and a function giving the world direction of an angle in the arm hook's frame
    const arm = which => {
      const A = V.arms.find(q => q[2] === which); if (!A) return null;
      const [px, dir] = A, a = which === 'L' ? (o.aL ?? .2) : (o.aR ?? .2);
      let p, r, L;
      if (dir === 0) { p = [px * u, -4.2 * u]; r = .7 - a; L = 2.1 * u; }
      else { p = [(px + dir * .55 * clamp((Math.abs(a) - .7) / .9)) * u, -4.5 * u]; r = dir < 0 ? a + Math.PI : -a; L = 2.2 * u; }
      const tipL = [p[0] + L * Math.cos(r), p[1] + L * Math.sin(r)], mirror = dir < 0;
      const at = (phi, d) => { const q = mirror ? r - phi : r + phi; return W([tipL[0] + d * Math.cos(q), tipL[1] + d * Math.sin(q)]); };
      return { tip: W(tipL), at };
    };
    return { W, arm };
  }
  // invert rig() for one arm: where to stand (x, y+dy) so that arm `which` (angle a) puts its tip at world point P
  function standFor(name, u, o, which, P) {
    const probe = rig(name, 0, 0, u, { ...o, dx: 0, dy: 0 }).arm(which).tip;
    return [P[0] - probe[0], P[1] - probe[1]];
  }

  // ================================================================================================
  // S1: THE LAMP. An insert at its own scale (insert px = screen px at zoom 1): wall, desk, lamp, turntable, Joe's nub.
  // ================================================================================================
  const IN = { rc: [960, 726], rx: 540, ry: 226, piv: [1592, 438], arm: 402, lamp: [292, 526], lampS: 1.9 };
  // lamp power: black, two stutters, then it holds (frame-exact at 24 fps)
  function lampPow(t) {
    if (t < .41) return 0;
    if (t < .5) return 1;          // stutter 1 (2 frames)
    if (t < .58) return .03;
    if (t < .625) return .8;       // stutter 2 (1 frame)
    if (t < .74) return .05;
    return lerp(.8, 1, ease(seg(t, .74, 1.0)));   // holds, warming up
  }
  // the tonearm: heading (radians from +x, y down) and lift (px up off the record)
  const ARM_REST = 1.62, ARM_PLAY = 2.07;
  function armState(t) {
    const ang = kf(t, [[1.3, ARM_REST], [1.64, ARM_PLAY]], ease);
    let lift = 52 * ease(seg(t, 1.13, 1.3));                              // up off the rest
    lift += 16 * ease(seg(t, 1.62, 1.8));                                 // the hover rises a touch: anticipation
    lift += 3 * Math.sin(t * 75) * seg(t, 1.7, 1.74) * (1 - seg(t, 1.84, 1.87));   // a tremble
    lift *= 1 - easeIn(seg(t, 1.875, 2.0));                              // ... and drop
    const bounce = t > 2.0 ? 7 * Math.exp(-(t - 2) * 28) * Math.abs(Math.sin((t - 2) * 55)) : 0;
    return { ang, lift: Math.max(0, lift) + bounce };
  }
  const recPt = (r, th) => [IN.rc[0] + r * IN.rx * Math.cos(th), IN.rc[1] + r * IN.ry * Math.sin(th)];
  const headAt = A => [IN.piv[0] + IN.arm * Math.cos(A.ang), IN.piv[1] + IN.arm * Math.sin(A.ang) - A.lift];
  // the tip of the headshell's finger lift (where Joe's nub pinches it), in insert coords
  function liftTip(A) {
    const h = headAt(A), r = A.ang - Math.PI / 2, c = Math.cos(r), s = Math.sin(r), lx = 84, ly = -30;
    return [h[0] + lx * c - ly * s, h[1] + lx * s + ly * c];
  }

  function insertWall(t) {
    boilSeed('in wall');
    paint(rectPts(-100, -160, 2120, 560), { wash: PC.wall, ink: null });
    for (let i = -1; i < 7; i++) {   // the parlor wallpaper at the insert's scale: stripes and spark damask
      const cx = 20 + i * 330;
      boilSeed('in stripe' + i);
      paint(rectPts(cx - 84, -160, 168, 420), { wash: PC.wall2, ink: null });
      push(); translate(cx, 88); scale(2.2); boilSeed('in motif' + i); damask(0, 0, false, 0); pop();
    }
    boilSeed('in wains');   // the wainscot and its rail behind the desk
    paint(rectPts(-100, 246, 2120, 150), { wash: PC.wains, fill: '#3E271F', fillOp: 90, bleed: .006, tex: .6, ink: null });
    paint(rectPts(-100, 236, 2120, 28), { wash: PC.rail, ink: PAL.ink, sw: 1 });
    for (let i = 0; i < 5; i++) paint(rectPts(-60 + i * 480, 286, 420, 120, 2), { wash: PC.wainsLt, ink: '#2E1D18', sw: .8 });
  }
  function insertDesk(t) {
    boilSeed('in desk');
    paint(rectPts(-100, 380, 2120, 760), { wash: PC.oxbloodDk, fill: PC.oxblood, fillOp: 120, bleed: .008, tex: .8, border: .6, ink: null });
    paint(rectPts(-100, 372, 2120, 22), { wash: PC.goldDk, ink: PAL.ink, sw: .8 });      // back edge
    inkLine([[-100, 1040], [2020, 1044]], .9, PC.goldDk, 'inkfine', 0);                  // tooled gold line
  }
  function insertTurntable(t) {
    const [cx, cy] = IN.rc, sp = t * 3.49;   // 33 rpm
    boilSeed('in plinth');
    paint(rrPts(330, 430, 1500, 640, 50), { wash: '#1E1B24', ink: PAL.ink, sw: 1.5 });        // front face
    paint(rrPts(330, 410, 1500, 596, 50), { wash: '#2E2A33', fill: '#4A4458', fillOp: 70, bleed: .01, tex: .6, ink: PAL.ink, sw: 1.5 });
    inkLine([[390, 428], [1770, 428]], 1.4, '#5A5468', 'inkfine', 0);   // top highlight
    boilSeed('in buttons');   // start button, speed buttons and a pilot light, front left
    paint(rrPts(390, 930, 130, 46, 12), { wash: '#3A3440', ink: PAL.ink, sw: .9 });
    paint(ellPts(570, 953, 22, 14, 12), { wash: '#C9CDD6', ink: PAL.ink, sw: .7 });
    paint(ellPts(630, 953, 22, 14, 12), { wash: '#C9CDD6', ink: PAL.ink, sw: .7 });
    paint(ellPts(455, 990, 10, 8, 10), { wash: '#FF8A3A', ink: null });
    // platter rim, record, grooves
    boilSeed('in platter');
    paint(ellPts(cx, cy + 12, IN.rx * 1.035, IN.ry * 1.07, 56), { wash: '#8A8FA0', fill: '#5A5F70', fillOp: 90, bleed: .03, tex: .5, ink: PAL.ink, sw: 1.3 });
    boilSeed('in record');
    paint(ellPts(cx, cy, IN.rx, IN.ry, 64), { wash: '#17141C', ink: PAL.ink, sw: 1.3 });
    for (let i = 0; i < 10; i++) {   // grooves: rings of slightly lighter ink
      const r = .38 + i * .064;
      boilSeed('in groove' + i);
      inkLine(ellPts(cx, cy, IN.rx * r, IN.ry * r, 48).concat([[cx + IN.rx * r, cy]]), 1, i % 2 ? '#2E2937' : '#25202D', 'inkfine', .5);
    }
    // the sheen: two soft wedges of light on the vinyl, toward the lamp (fixed: the light doesn't turn)
    boilSeed('in sheen');
    for (const [a0, a1, k] of [[3.35, 3.95, 1], [.3, .8, .55]]) {
      const P = []; for (let i = 0; i <= 8; i++) P.push(recPt(.96, lerp(a0, a1, i / 8)));
      for (let i = 8; i >= 0; i--) P.push(recPt(.4, lerp(a0 + .15, a1 - .15, i / 8)));
      paint(P, { wash: '#8A8298', washOp: 60 * k, ink: null, curv: .5 });
    }
    // little marks riding round on the grooves, so the spin reads
    for (let i = 0; i < 6; i++) {
      const r = .46 + .085 * i, th = sp + i * 1.7, P = [];
      for (let k = 0; k <= 6; k++) P.push(recPt(r, th + k * .05));
      boilSeed('in mark' + i);
      inkLine(P, 1.3, '#514A60', 'inkfine', .5);
    }
    // the label: red, with a cream Claude spark that turns
    boilSeed('in label');
    const lr = .3;
    paint(ellPts(cx, cy, IN.rx * lr, IN.ry * lr, 36), { wash: '#D8392F', fill: '#A82A22', fillOp: 70, bleed: .05, tex: .4, ink: PAL.ink, sw: 1 });
    const SP = []; for (let i = 0; i < 8; i++) { const a = sp + i * Math.PI / 4, q = i % 2 ? .065 : .24; SP.push(recPt(q, a)); }
    paint(SP, { wash: PAL.cream, ink: null });
    paint(ellPts(cx, cy, 13, 7, 12), { wash: '#C9CDD6', ink: PAL.ink, sw: .8 });   // spindle
    // the arm rest post
    boilSeed('in rest');
    const rest = [IN.piv[0] + IN.arm * Math.cos(ARM_REST) + 4, IN.piv[1] + IN.arm * Math.sin(ARM_REST) + 26];
    paint(rrPts(rest[0] - 16, rest[1] - 18, 32, 54, 9), { wash: '#3A3440', ink: PAL.ink, sw: .9 });
  }
  // the tonearm, over the record, with its shadow on the surface
  function insertTonearm(t, A) {
    const [px, py] = IN.piv, L = IN.arm, d = [Math.cos(A.ang), Math.sin(A.ang)], n = [-d[1], d[0]];
    const down = [px + L * d[0], py + L * d[1]], head = headAt(A), lift = A.lift;
    // shadow: the arm lying on the surface, pushed away from the lamp; it parts from the arm as it lifts
    boilSeed('in arm shadow');
    const so = [18 + lift * .7, 12 + lift];
    paint(ribbon([[px + 6, py + 8], [lerp(px, down[0], .5) + so[0] * .5, lerp(py, down[1], .5) + so[1] * .5], [down[0] + so[0], down[1] + so[1]]], 20, 18), { wash: '#0B0911', washOp: 130, ink: null });
    paint(ellPts(down[0] + so[0], down[1] + so[1] + 10, 46, 20, 14, 0, A.ang), { wash: '#0B0911', washOp: 120, ink: null });
    // pivot base and counterweight
    boilSeed('in pivot');
    const cw = [px - d[0] * 96, py - d[1] * 96];
    paint(ellPts(px, py + 18, 78, 32, 22), { wash: '#8A8FA0', ink: PAL.ink, sw: 1.1 });
    paint(ellPts(px, py + 6, 50, 21, 20), { wash: PC.silver, fill: '#8A8FA0', fillOp: 90, tex: .5, ink: PAL.ink, sw: 1 });
    paint(ribbon([[px - d[0] * 10, py - d[1] * 10], cw], 40, 52), { wash: '#3A3440', fill: '#5A5468', fillOp: 70, tex: .4, ink: PAL.ink, sw: 1 });
    // the arm tube: from the pivot, a slight S, to the headshell (lifted)
    boilSeed('in tube');
    const mid = [lerp(px, head[0], .55) + n[0] * 18, lerp(py, head[1], .55) + n[1] * 18 - lift * .3];
    const neck = [head[0] - d[0] * 40, head[1] - d[1] * 40];
    paint(ribbon([[px, py - 2], mid, neck], 24, 19), { wash: PC.silver, fill: '#8A8FA0', fillOp: 90, tex: .4, ink: PAL.ink, sw: 1.3 });
    inkLine([[lerp(px, mid[0], .15) + n[0] * 5, lerp(py, mid[1], .15) - 4], [mid[0] + n[0] * 5, mid[1] - 4], [lerp(mid[0], neck[0], .7) + n[0] * 4, lerp(mid[1], neck[1], .7) - 3]], 1.2, '#FFFFFF', 'inkfine', .5);
    headshell(head, A.ang, 1);
    return down;
  }
  // the headshell (silver shell, black cartridge, finger lift toward Joe, stylus). k < 1: a faint reflection
  function headshell(head, ang, k) {
    boilSeed('in head' + k);
    push(); translate(head[0], head[1]); rotate(ang - Math.PI / 2);
    const ink = k < 1 ? null : PAL.ink;
    paint([[-38, -46], [38, -46], [34, 36], [-30, 40]], { wash: PC.silver, washOp: 255 * k, fill: '#8A8FA0', fillOp: 90 * k, tex: .4, ink, sw: 1.3 });
    if (k >= 1) inkLine([[-30, -38], [28, -38]], 1.2, '#FFFFFF', 'inkfine', 0);
    paint(rrPts(-26, 2, 52, 40, 6), { wash: '#1A1720', washOp: 255 * k, ink, sw: .8 });   // cartridge
    paint([[40, -24], [86, -38], [88, -26], [42, -10]], { wash: PC.silver, washOp: 255 * k, ink, sw: 1 });   // finger lift
    if (k >= 1) inkLine([[0, 42], [0, 58]], 2.4, '#E8EAF0', 'inkfine', 0);   // stylus
    pop();
  }

  function lampOpen(t, lt, dur) {
    const P = lampPow(t), A = armState(t);
    // the camera: a slow push that tightens as the needle hovers; a jolt on the drop
    const z = 1.0 + .05 * ease(seg(t, .6, 2)) + .07 * easeIn(seg(t, 1.5, 2.0));
    const [jx, jy] = t > 2 ? shakeXY(t, 12 * Math.exp(-(t - 2) * 14)) : [0, 0];
    camBegin(990 + 90 * ease(seg(t, .6, 2)) + jx, 560 + 40 * ease(seg(t, .6, 2)) + jy, z);
    if (P <= 0) {   // black: only the turntable's pilot light, a pin of amber in the dark
      boilSeed('black'); paint(rectPts(-400, -400, 2800, 1900), { wash: '#0D0A12', ink: null });
      boilSeed('pilot'); paint(ellPts(455, 990, 10, 8, 10), { wash: '#FF8A3A', ink: null });
      glow(455, 990, 60, '#FF8A3A', .8); camEnd(); return;
    }
    insertWall(t);
    insertDesk(t);
    tableLamp(IN.lamp[0], IN.lamp[1], IN.lampS, { on: P });   // the parlor's table lamp, at the insert's scale
    insertTurntable(t);
    insertTonearm(t, A);
    // Joe, seen from behind (3/4 back view, no face), reaches in from the right to pinch the finger lift
    if (t > .8) {
      const u = 64, reach = ease(seg(t, .88, 1.12));
      const aL = lerp(-.12, .08, ease(seg(t, 1.13, 1.3))) - .06 * ease(seg(t, 1.3, 1.64));
      const pose = { ...mfeel('joe', 'mischief', t, { seed: 9 }), gloom: 0, view: 'qback', flip: true, aL, aR: -1.1,
        rot: -.05 * reach, noShadow: true, noLegs: true, emote: null, boilKey: 'joe insert' };
      const goal = lerp3([2240, liftTip(A)[1] + 90], liftTip(A), reach);
      const [X, Y] = standFor('joe', u, pose, 'L', goal);
      member('joe', X, Y, u, pose);
    }
    // darkness with the lamp's pools of light (the record sits in the second)
    const hd = headAt(A);
    roomLight(.975, [[IN.lamp[0], IN.lamp[1] - 170 * IN.lampS, 880, P], [IN.rc[0] - 20, IN.rc[1] - 30, 720, P * .95], [hd[0] - 40, hd[1], 330, P * .7]]);
    const bulb = [IN.lamp[0], IN.lamp[1] - 150 * IN.lampS];
    glow(bulb[0], bulb[1], 300, '#FFC766', .75 * P);   // the shade glows over the darkness
    if (t > 1.99) {   // the drop: the lamp flares, a ring ripples out across the vinyl from the needle
      const age = t - 1.995, k = Math.exp(-age * 9), tip = [IN.piv[0] + IN.arm * Math.cos(A.ang), IN.piv[1] + IN.arm * Math.sin(A.ang) + 56];
      glow(tip[0], tip[1], 320, '#FFD27A', .9 * k);
      glow(bulb[0], bulb[1], 560, '#FFC766', .6 * k);
      for (let i = 0; i < 7; i++) {   // thin impact ticks lying flat on the vinyl, clear of the needle
        const th = Math.PI * (.62 + i * .19), r0 = 80 + 500 * age, r1 = r0 + 70 + 30 * hash(i);
        boilSeed('tick' + i);
        inkLine([[tip[0] + r0 * Math.cos(th), tip[1] + r0 * .42 * Math.sin(th)], [tip[0] + r1 * Math.cos(th), tip[1] + r1 * .42 * Math.sin(th)]], 1.6 * k + .3, '#FFF1CC', 'ink', 0);
      }
    }
    camEnd();
  }

  // ================================================================================================
  // S2: THE DOLLY. One camera move to the right, easing between the members (velocity bumps on a slow drift).
  // ================================================================================================
  const TOSS = beatT(0, 3), CATCH = 5.0, CRASH = barT(1);            // Rob: flick 4.398, catch, crash on 5.197
  const LOOKUP = beatT(0, 1);                                        // Joe looks into the lens on 2.799
  const PAUSE = 6.55;                                                // the portrait's eyes start to follow
  const DF_PASS = 9.6, DF_LAND = 10.24, DF_GO = 10.8;                 // the dragonfly
  const FLICK = [10.46, 10.76], SPIN = beatT(2, 3), LAUNCH = barT(3) - .05;   // Chester: spin 10.792, launch 11.54
  const MIKE_AT = [2866, 800], CHES_AT = [3292, 858];
  function dollyCam(t) {
    // stations (camera centre, zoom): Joe (740, 596, 2.0) · Rob (1290, 548, 2.0) · the portrait's face (1935, 338, 2.6)
    // · the couch (1950, 610, 1.8) · Mike in the doorway (2800, 650, 1.65) · Chester at the cut (3130, 640, 1.8 -> 2.2)
    const x = 718 + 20 * (t - S2) + moves(t, [[3.35, 4.2, 512], [5.45, 6.25, 590], [6.3, 7.0, 34], [7.0, 7.6, 14], [8.3, 9.1, 768], [9.72, 10.3, 322]]);
    const y = 598 + moves(t, [[3.35, 4.2, -52], [5.45, 6.25, -212], [7.0, 7.6, 272], [8.3, 9.1, 40], [9.72, 10.3, -10]]);
    const lz = Math.log(2.45) + Math.log(2.0 / 2.45) * easeOut(seg(t, S2, 2.9)) + moves(t, [
      [5.45, 6.25, Math.log(2.6 / 2.0)], [6.45, 6.95, Math.log(2.75 / 2.6)], [7.0, 7.6, Math.log(1.8 / 2.75)], [8.3, 8.7, Math.log(1.45 / 1.8)], [8.7, 9.1, Math.log(1.65 / 1.45)],
      [9.72, 10.3, Math.log(1.8 / 1.65)], [10.3, 11.2, Math.log(1.95 / 1.8)], [10.95, 11.5, Math.log(2.2 / 1.95)]]);
    return [x + 4 * Math.sin(t * 1.3), y + 3 * Math.sin(t * 1.7 + 1), Math.exp(lz)];
  }
  // the paper dragonfly's flight: keys [t, x, y]; heading from its velocity
  const DF_KEYS = [[8.95, 2470, 600], [9.2, 2650, 650], [9.38, 2820, 690], [9.46, 2856, 676], [9.54, 2836, 690], [9.62, 2878, 668],
    [9.74, 2960, 640], [9.9, 3070, 590], [10.06, 3170, 520], [DF_LAND, 3258, 446], [DF_GO, 3258, 446], [10.95, 3360, 330], [11.2, 3520, 120]];
  function dfAt(t) {
    const p = kf(t, DF_KEYS.map(([a, x, y]) => [a, [x, y]]), x => x), q = kf(t + .03, DF_KEYS.map(([a, x, y]) => [a, [x, y]]), x => x);
    const sitting = t > DF_LAND - .02 && t < DF_GO;
    const wob = sitting ? 0 : 1, flut = [7 * Math.sin(t * 17) * wob, 5 * Math.sin(t * 23 + 1) * wob];
    const rot = sitting ? -1.2 + .05 * Math.sin(t * 9) : Math.atan2(q[1] - p[1], q[0] - p[0] + 1e-3);
    return { x: p[0] + flut[0], y: p[1] + flut[1], rot, flap: sitting ? (t > FLICK[0] && t < FLICK[1] ? .6 : .12) : 1 };
  }
  // the dragonfly's soft shadow on the wall behind it (it separates the cream paper from the cream wallpaper)
  function dfShadow(d, t) {
    const off = d.flap < .5 ? [8, 10] : [26, 34], P = [];
    for (let i = 0; i < 4; i++) { const a = d.rot + [.9, 2.2, -.9, -2.2][i] + .3 * Math.sin(t * 60 + i); P.push([d.x + off[0] + Math.cos(a) * 44, d.y + off[1] + Math.sin(a) * 44]); }
    castShadow([toScreenPts(P), toScreenPts(ellPts(d.x + off[0], d.y + off[1], 40, 7, 10, 0, d.rot))], { alpha: .3, blur: 6 });
  }
  // the lamps stutter on the riser
  function stutter(t) {
    const off = [[10.46, 10.5, .12], [10.54, 10.56, .45], [10.6, 10.69, .08], [10.72, 10.75, .5]];
    for (const [a, b, k] of off) if (t >= a && t < b) return k;
    return 1;
  }
  // the hairline cut: a thin dark lens with cut-paper lips (WORLD coords, inside the camera)
  function hairline(w = 2.6, gl = .22) {
    boilSeed('hairline');
    paint(slitPts(CRACK.a, CRACK.b, w), { wash: PC.inkBg, ink: null });
    slitEdges(CRACK.a, CRACK.b, w, { sw: .7 });
    if (gl > 0) glow(CRACK_MID[0], CRACK_MID[1], 60 + 60 * gl, '#D8F0A0', gl);
  }
  // the right-hand doors stand open on a warm hallway (painted over the closed doors)
  function openDoors(t, leafW = 24) {
    const x0 = 2737, x1 = 3063, top = 212, y1 = LAY.floorY - 4;
    boilSeed('hall');
    paint(rectPts(x0, top, x1 - x0, y1 - top), { wash: '#C9A26E', fill: '#A8804E', fillOp: 90, bleed: .01, tex: .6, ink: null });
    for (const sx of [2810, 2960]) paint(rectPts(sx - 26, top, 52, 500), { wash: '#BD955F', ink: null });
    paint(rectPts(x0, 560, x1 - x0, y1 - 560), { wash: '#6B4A36', ink: null });
    paint(rectPts(x0, 552, x1 - x0, 14), { wash: '#4A3024', ink: null });
    paint(rectPts(x0, 740, x1 - x0, y1 - 740), { wash: '#4A3024', ink: null });
    paint([[2850, 740], [2950, 740], [3000, y1], [2800, y1]], { wash: '#7A2A2E', ink: null });   // a runner rug
    paint(rrPts(2935, 330, 70, 90, 6), { wash: '#D4A646', ink: PAL.ink, sw: .5 });                // a little frame on the hall wall
    paint(rectPts(2945, 340, 50, 70), { wash: '#5A5238', ink: null });
    glow(2880, 300, 260, '#FFD68A', .5);
    // the two leaves, swung open, seen edge-on at the jambs
    boilSeed('leaves');
    for (const [a, b] of [[x0, x0 + leafW], [x1 - leafW, x1]]) {
      paint(rectPts(a, top, b - a, y1 - top), { wash: '#E4D3AE', ink: PAL.ink, sw: .8 });
      inkLine([[(a + b) / 2, top + 10], [(a + b) / 2, y1 - 10]], .5, '#B8966A', 'inkfine', 0);
    }
    if (leafW > 30) for (const sd of [-1, 1]) for (let i = 0; i < 4; i++) {   // slam: speed strokes behind the leaves' edges
      const ex = sd < 0 ? x0 + leafW : x1 - leafW, yy = top + 90 + i * 130;
      boilSeed('slam' + sd + i); inkLine([[ex - sd * 10, yy], [ex - sd * 70, yy + 6]], 1.2, PAL.ink, 'dry', 0);
    }
  }
  // Rob's right arm through the toss (keys) and the stick's own flight
  function robRight(t) {
    const h = drumHits(t, .6), groove = { a: .7 - .7 * h.hat, sw: -.2 - .4 * h.hat };
    const k = [[TOSS - .32, groove.a], [TOSS - .06, -.2], [TOSS + .05, 1.32], [CATCH - .12, 1.06], [CATCH, .94], [CATCH + .06, 1.02],
      [CRASH - .1, 1.5], [CRASH, -.38], [CRASH + .3, .25], [CRASH + .7, groove.a]];
    if (t < k[0][0] || t > k[k.length - 1][0]) return { a: groove.a, sw: groove.sw, held: true };
    const a = kf(t, k, ease), sw = t < CRASH ? -.3 : lerp(-.25, groove.sw, seg(t, CRASH + .3, CRASH + .7));
    return { a, sw, held: t < TOSS + .03 || t >= CATCH };
  }
  function robPose(t) {
    const h = drumHits(t, .6), R = robRight(t), bp = bpOf(t), hitL = h.snare + h.crash * .6;
    const up = t > TOSS && t < CATCH + .05;
    const m = mood('rob', t, [[S2 - 1, 'determined'], [CRASH + .08, 'proud', { eyes: 'happy', mouth: 'grin' }]]);
    const crashK = t > CRASH ? Math.exp(-(t - CRASH) * 6) : 0;
    return { ...m, emote: null, noShadow: true, noLegs: true, boilKey: 'rob',
      aL: .9 - .9 * hitL, aR: R.a, lookY: up ? -.9 : (m.lookY || 0), lookX: up ? .5 : (m.lookX || 0),
      dy: (m.dy || 0) - .5 * crashK + .25 * spring(t, CRASH, 7, 22), sq: (m.sq || 0) + .12 * crashK + .06 * spring(t, CATCH, 9, 30),
      rot: .04 * spring(t, CRASH, 5, 16),
      armL: stickHook(.4 - .5 * hitL), armR: R.held ? stickHook(R.sw) : null, _R: R };
  }
  // the stick in flight: from Rob's hand at the flick to his hand at the catch, two turns
  function flyingStick(t, u) {
    if (!(t > TOSS + .03 && t < CATCH)) return;
    const held = tt => { const o = robPose(tt), r = rig('rob', LAY.rob[0], LAY.rob[1], u, o).arm('R'); const a = r.tip, b = r.at(-.9 - robRight(tt).sw, 3.4 * u); return { c: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], ang: Math.atan2(b[1] - a[1], b[0] - a[0]) }; };
    const A = held(TOSS + .03), B = held(CATCH), k = seg(t, TOSS + .03, CATCH);
    const c = arcPt(A.c, B.c, 175, k), ang = lerp(A.ang, B.ang - 2 * TAU, k), d = [Math.cos(ang) * 1.7 * u, Math.sin(ang) * 1.7 * u];
    boilSeed('flying stick');
    inkLine([[c[0] - d[0], c[1] - d[1]], [c[0] + d[0], c[1] + d[1]]], 1.7, '#E7D3A8', 'ink', 0);
    paint(ellPts(c[0] + d[0] * 1.03, c[1] + d[1] * 1.03, .22 * u, .18 * u, 8), { wash: '#E7D3A8', ink: PAL.ink, sw: .4 });
  }
  function chesterDolly(t, u) {
    const tl = t;
    // back view on tiptoe, peering up at the cut ... the spin ... the crouch ... the launch
    let pose = { view: 'back', flip: false, eyes: 'normal', mouth: null, lid: 0 };
    if (t >= SPIN) pose = { ...pose, ...turn(t, SPIN, SPIN + .2, .5, 1.0) };
    const m = t < SPIN + .15 ? mfeel('chester', 'neutral', t, { seed: 2 })
      : mood('chester', t, [[SPIN + .15, 'surprised', { emote: null }], [SPIN + .42, 'determined']], { take: .6 });
    const tip = 1 - ease(seg(t, SPIN - .12, SPIN));   // on tiptoe until the spin
    const crouch = ease(seg(t, SPIN + .35, LAUNCH - .02)), shake = crouch * .06 * Math.sin(t * 90);
    const launch = seg(t, LAUNCH - .02, LAUNCH + .1);
    const flinch = .1 * spring(t, FLICK[0], 8, 30);
    const o = { ...m, ...pose, emote: t > SPIN + .15 && t < SPIN + .45 ? m.emote : null, boilKey: 'chester', mic: false,
      dy: -.32 * tip + .12 * crouch - 1.6 * easeOut(launch), sq: -.08 * tip + flinch + .3 * crouch * (1 - launch) - .3 * launch,
      rot: t < SPIN ? -.06 + .025 * Math.sin(t * 5) : shake * .4, dx: shake,
      aL: t < SPIN ? .35 : lerp(lerp(.5, -1.05, crouch), 1.35, easeOut(launch)), aR: t < SPIN ? -.55 : lerp(lerp(.4, -1.0, crouch), 1.3, easeOut(launch)),
      lid: .5 * easeOut(launch), mouth: launch > .1 ? null : (m.mouth ?? null), eyes: launch > .1 ? 'squeeze' : m.eyes, squint: launch > .1 ? 0 : m.squint,
      armR: (u2, sw) => micProp(u2, sw, 'chester', t < SPIN ? -1.1 : lerp(.2, 1.4, launch)) };
    member('chester', CHES_AT[0], CHES_AT[1], u, o);
  }
  function mikeDolly(t, u) {
    const df = dfAt(t), watch = t > 9.34;
    const m = mood('mike', t, [[S2 - 1, 'suspicious'], [DF_PASS, 'surprised', { emote: '!' }]], { take: .8 });
    let lookX = kf(t, [[8.55, .2], [8.7, -1], [9.0, -1], [9.12, 1], [9.3, 1], [9.36, -.4]], ease), lookY = 0;
    if (watch) { lookX = clamp((df.x - MIKE_AT[0]) / 70, -1, 1); lookY = clamp((df.y - (MIKE_AT[1] - 6 * u)) / 60, -1, 1); }
    const lean = watch ? .06 * ease(seg(t, DF_PASS + .3, DF_PASS + .8)) : 0;
    member('mike', MIKE_AT[0], MIKE_AT[1], u, { ...m, emote: t > DF_PASS - .01 && t < DF_PASS + .9 ? '!' : null, emoteK: m.emoteK * (1 - seg(t, DF_PASS + .7, DF_PASS + .9)), emoteAge: m.emoteAge,
      lookX, lookY, rot: -.09 + lean + .01 * Math.sin(t * 2), dx: 0, aL: 1.25, aR: -.9, mic: false, boilKey: 'mike',
      armR: (u2, sw) => micProp(u2, sw, 'mike', 1.2) });
  }

  function dolly(t, lt, dur) {
    const [cx, cy, cz] = dollyCam(t), bp = bpOf(t), st = stutter(t);
    camBegin(cx, cy, cz);
    const cam = CAM;
    // the portrait's eyes: stern until the camera has had a look, then they follow it (with a lag)
    const slide = ease(seg(t, PAUSE, PAUSE + .22)), down = ease(seg(t, 7.0, 7.5));
    const portrait = { stage: 'look', lookX: 1.55 * slide - .35 * down, lookY: .95 * down };
    const drums = { ...drumHits(t, .6), crash: t > CRASH ? Math.exp(-(t - CRASH) * 2.5) : 0 };
    const spin = t * 3.4 + .9 * Math.sin(bp * TAU * 2);   // Joe's scratch rocks both records
    const flick = t > FLICK[0] && t < FLICK[1] ? 1 - st : 0;
    parlor(t, { drums, portrait, spin, lamps: { a: st, b: st, desk: st, sconce: st }, dark: .5 * flick + .3 * (1 - ease(seg(t, S2, 2.75))),
      lights: [[CHES_AT[0] - 40, 560, 520, .55 * st]],
      hooks: {
        wall: () => { if (inView(2650, 3700)) { openDoors(t); hairline(2.6, .2 + .5 * flick); } },
        joe: () => {
          if (!inView(560, 960)) return;
          const sc = Math.sin(bp * TAU * 2);
          const m = mood('joe', t, [[S2 - 1, 'mischief', { lookY: .85, lookX: -.3 }], [LOOKUP, 'smug', { lookX: 0, lookY: -.15 }]]);
          const wink = t > 3.14 && t < 3.42;
          member('joe', LAY.joe[0], LAY.joe[1], 16, { ...m, emote: null, gloom: t < LOOKUP ? .25 : 0, boilKey: 'joe',
            eyes: wink ? ['happy', 'narrow'] : m.eyes,
            aL: .2 + .1 * sc, aR: .12 + .06 * Math.sin(bp * TAU * 2 + 1.5), dx: .06 * sc,
            dy: (m.dy || 0) - .25 * Math.abs(Math.sin(bp * Math.PI)) + (t < LOOKUP ? .12 : 0), sq: (m.sq || 0) + (t < LOOKUP ? .06 : 0),
            rot: t > LOOKUP ? .05 * ease(seg(t, LOOKUP, LOOKUP + .3)) : 0, noShadow: true, noLegs: true });
        },
        rob: () => { if (inView(1150, 1450)) member('rob', LAY.rob[0], LAY.rob[1], 16, robPose(t)); },
        couch: () => {
          if (!inView(1650, 2250)) return;
          const f = frac(bp), off = frac(bp + .5);
          seated('brad', LAY.brad[0], 15, { ...mfeel('brad', 'cool', t, { seed: 3 }), eyes: 'closed', mouth: 'flat', emote: null, boilKey: 'brad',
            aL: -1.1, aR: -1.2, strum: Math.floor(bp) + ease(clamp(f / .14)) * .5, rot: -.11 + .025 * Math.sin(bp * Math.PI), dy: -.35 * Math.exp(-f * 6) });
          seated('phoenix', LAY.phoenix[0], 15, { ...mfeel('phoenix', 'happy', t, { seed: 6 }), emote: null, boilKey: 'phoenix',
            aL: -1.1, aR: -1.2, strum: bp * 2 + .25, dy: -.5 * Math.exp(-off * 4.5), rot: .06 * Math.sin(bp * Math.PI / 2 + 1) });
        },
        floor: () => {
          flyingStick(t, 16);
          if (t > CRASH && t < CRASH + .35 && inView(1300, 1600)) {   // the crash lands: a glint and a splash of strokes off the cymbal
            const age = t - CRASH, k = Math.exp(-age * 9), cx = LAY.drums + 151, cy = LAY.floorY + 60 - 238;
            glow(cx, cy, 120, '#FFE8A0', .9 * k);
            for (let i = 0; i < 7; i++) {
              const a = -Math.PI * (.08 + i * .14), r0 = 78 + 200 * age, r1 = r0 + 30 + 20 * hash(i);
              boilSeed('crash' + i); inkLine([[cx + r0 * Math.cos(a), cy + r0 * .6 * Math.sin(a)], [cx + r1 * Math.cos(a), cy + r1 * .6 * Math.sin(a)]], 1.6 * k + .3, '#FFF1CC', 'ink', 0);
            }
          }
          if (inView(2700, 3050)) mikeDolly(t, 20);
          if (inView(3100, 3500)) chesterDolly(t, 19);
          if (t > 8.9 && t < 11.2) { const d = dfAt(t); dfShadow(d, t); dragonfly(d.x, d.y, 1.05, t, { rot: d.rot, flap: d.flap }); }
        }
      } });
    camEnd();
  }

  // ================================================================================================
  // S3: WIDE. The band crashes in; Chester flies in screaming and lands on his mark; the room shakes.
  // ================================================================================================
  const LAND = barT(3) + BEAT * 1.25;      // 12.591, a riff accent
  const GLANCE = barT(3) + BEAT * 3.25;    // 14.19: Chester looks back toward the doors (and the cut)
  function flightAt(t) {                    // Chester's leap from the cut to his mark
    const k = seg(t, LAUNCH, LAND), p = arcPt(CHES_AT, LAY.chester, 390, k);
    return { x: p[0], y: p[1], k };
  }
  function wideCam(t) {
    const pan = ease(seg(t, barT(3), LAND + .1));
    let x = lerp(2150, 1720, pan), y = lerp(566, 560, pan), z = lerp(.8, .82, pan);
    const push = easeIn(seg(t, GLANCE, S4));   // the push toward Chester's glance, carried across the cut
    x = lerp(x, 2230, push); y = lerp(y, 700, push); z = lerp(z, 1.4, push);
    const sh = (t > barT(3) ? 16 * Math.exp(-(t - barT(3)) * 7) : 0) + (t > LAND ? 22 * Math.exp(-(t - LAND) * 8) : 0) + 3 * riffK(t);
    const [dx, dy] = shakeXY(t, sh);
    return [x + dx, y + dy, z];
  }
  function chesterWide(t, u) {
    const f = flightAt(t), air = t < LAND, age = t - LAND;
    let o;
    if (air) {
      const k = f.k;
      o = { ...mfeel('chester', 'excited', t, { seed: 2 }), eyes: 'squeeze', mouth: null, lid: .5 + .05 * Math.sin(t * 40), emote: null,
        dx: (f.x - LAY.chester[0]) / u, dy: (f.y - LAY.chester[1]) / u, sq: -.22 * (1 - 2 * k) * (k < .5 ? 1 : -.7), rot: -.18 * Math.sin(k * Math.PI),
        aL: 1.4, aR: 1.25, micAt: 'up' };
    } else {
      const hb = riffK(t, 7), side = beatN(t) % 2 ? 1 : -1, look = ease(seg(t, GLANCE, GLANCE + .15));
      const m = mood('chester', t, [[LAND, 'excited', { emote: null }], [GLANCE + .05, 'suspicious', { emote: null }]], { take: .5 });
      o = { ...m, emote: null, mouth: t < GLANCE ? 'grin' : 'flat', dy: -.5 * hb * (1 - look) + (m.dy || 0) * .5,
        sq: .34 * Math.exp(-age * 9) * Math.cos(age * 22) + .12 * hb * (1 - look) + (m.sq || 0) * .5,
        rot: .09 * hb * side * (1 - look), aL: lerp(.6 + .8 * hb, .3, look), aR: lerp(1.1 + .3 * hb, .6, look), micAt: 'up',
        ...(t > GLANCE ? turn(t, GLANCE, GLANCE + .14, 0, .125) : {}), lookX: look, lookY: -.2 * look };
    }
    member('chester', LAY.chester[0], LAY.chester[1], u, { ...o, boilKey: 'chester' });
    if (t > LAUNCH && t < LAND + .2) {   // the scream rings off his open lid
      const mx = f.x, my = f.y - 6.4 * u * 1.07;
      screamRings(mx, my, t - LAUNCH, .34, { n: 4, gap: .13, life: .9, arc: [-1.5, 1.5], w: 1.3, col: '#E2412F' });
    }
    if (t > LAND && t < LAND + .6) {     // a puff of dust off the rug where he lands
      const a = t - LAND;
      for (let i = 0; i < 9; i++) {
        const sd = i % 2 ? 1 : -1, r = (40 + 160 * easeOut(a / .6)) * (.6 + .5 * hash(i)), yy = LAY.chester[1] - 10 - 40 * a * hash(i + 3);
        boilSeed('puff' + i);
        paint(ellPts(LAY.chester[0] + sd * r, yy, 18 * (1 - a / .6) + 4, 12 * (1 - a / .6) + 3, 10), { wash: '#EFE3C8', washOp: 200 * (1 - a / .6), ink: null });
      }
    }
  }
  // dust sifting down from the ceiling after each impact (world)
  function dust(t) {
    for (const [t0, n, seed] of [[barT(3), 34, 1], [LAND, 26, 50]]) {
      if (t < t0) continue;
      for (let i = 0; i < n; i++) {
        const h1 = hash(i * 3.1 + seed), h2 = hash(i * 7.7 + seed), a = t - t0 - .35 * h2;
        if (a < 0) continue;
        const x = 520 + 2500 * h1 + 18 * Math.sin(a * 3 + i), y = 44 + a * (170 + 150 * hash(i + seed * 3)) + 60 * a * a;
        if (y > 820) continue;
        boilSeed('dust' + seed + '_' + i);
        const flake = i % 5 === 0, r = flake ? 9 : 3 + 4 * hash(i + 11);
        if (flake) { push(); translate(x, y); rotate(a * 5 + i); paint(rectPts(-r, -r * .5, 2 * r, r), { wash: '#F4E6C6', ink: PAL.ink, sw: .35 }); pop(); }
        else paint(ellPts(x, y, r, r, 6), { wash: i % 3 ? '#E8D8B8' : '#C9B089', washOp: 220, ink: null });
      }
    }
  }
  function wideCrash(t, lt, dur) {
    const [cx, cy, cz] = wideCam(t), bp = bpOf(t), big = t > barT(3) ? Math.exp(-(t - barT(3)) * 7) : 0;
    camBegin(cx, cy, cz);
    const dh = drumHits(t, 1), crash = Math.max(dh.crash, big, t > LAND ? Math.exp(-(t - LAND) * 5) : 0, riffK(t, 12) * .5);
    const swing = (t > barT(3) ? .11 * Math.exp(-(t - barT(3)) * .8) : 0) + (t > LAND ? .06 * Math.exp(-(t - LAND)) : 0);
    const rattle = .08 * spring(t, barT(3), 4, 22) + .06 * spring(t, LAND, 4, 24);
    const tk = take(t, barT(3) + .02, 1);
    const sc = Math.sin(bp * TAU * 2);
    const hk = bandHooks(t, { style: { mike: 'hype', chester: 'idle' }, energy: 1, skip: ['chester'],
      over: {
        joe: { aL: .22 + .14 * sc, aR: .14 + .1 * Math.sin(bp * TAU * 2 + 1.5), lookX: 0, lookY: .3, eyes: 'narrow', mouth: 'grin', dy: -.45 * Math.abs(Math.sin(bp * Math.PI)) + tk.dy, boilKey: 'joe' },
        rob: { aL: .9 - .9 * Math.max(dh.snare, big, riffK(t)), aR: .7 - .7 * Math.max(dh.hat, big), armL: stickHook(.4 - .5 * Math.max(dh.snare, big)), armR: stickHook(-.2 - .4 * Math.max(dh.hat, big)), boilKey: 'rob' },
        brad: { eyes: t > barT(3) && t < barT(3) + .5 ? 'wide' : 'closed', sq: tk.sq, boilKey: 'brad' },
        phoenix: { ...mfeel('phoenix', 'excited', t, { seed: 6 }), emote: null, sq: tk.sq, boilKey: 'phoenix' },
        mike: { boilKey: 'mike' } },
      floorAfter: () => { chesterWide(t, 19); } });
    const slam = seg(t, barT(3) - .02, barT(3) + .11);
    parlor(t, { drums: { ...dh, crash }, swing, portrait: { stage: 'stern', swing: rattle }, hooks: { ...hk, front: () => dust(t),
      wall: () => { if (slam < 1 && inView(2650, 3150)) openDoors(t, lerp(24, 163, easeIn(slam))); } } });
    camEnd();
  }

  // ================================================================================================
  // S4: BEHIND THE PAPER. The hairline jolts open on the riff's triple hit; we push through into the Ink Side, where
  // something in the corner stirs, opens its eyes and turns to us; then we pull back out as the cut seals.
  // ================================================================================================
  const J1 = barT(4), J2 = barT(4) + BEAT * .25, J3 = barT(4) + BEAT * .5;   // 14.789, 14.989, 15.189
  const THRU = 15.64, STIR = barT(4) + BEAT * 1.75, EYES = barT(4) + BEAT * 2.25, TURN = barT(4) + BEAT * 2.5, OUT = barT(4) + BEAT * 3.25;
  const INK_AT = [3150, 842], INK_U = 26;
  const jolt = (t, t0, a, b) => t < t0 ? a : lerp(a, b, backOut(seg(t, t0, t0 + .09)));
  function slitW(t) {   // the cut's half-width (world px)
    let w = jolt(t, J1, 2.6, 9); w = jolt(t, J2, w, 17); w = jolt(t, J3, w, 28);
    w = lerp(w, 92, easeIn(seg(t, J3 + .1, THRU)));
    return lerp(w, 2.6, ease(seg(t, OUT, S5 - .06)));
  }
  function slitLen(t) { return 1 + .45 * easeIn(seg(t, J3, THRU)) - .2 * ease(seg(t, OUT, S5 - .06)); }   // it heals a little longer than it was
  function slitAB(t) {
    const L = slitLen(t), d = [(CRACK.b[0] - CRACK.a[0]) / 2 * L, (CRACK.b[1] - CRACK.a[1]) / 2 * L];
    return [[CRACK_MID[0] - d[0], CRACK_MID[1] - d[1]], [CRACK_MID[0] + d[0], CRACK_MID[1] + d[1]]];
  }
  function paperCam(t) {
    let z = 2.6 * Math.pow(3.1 / 2.6, ease(seg(t, J1, J3 + .05)));
    z = z * Math.pow(17 / z, easeIn(seg(t, J3 + .05, THRU)));
    z = lerp(z, 2.3, ease(seg(t, OUT, S5)));
    const k = [[J1, [3262, 540]], [J3, [3268, 526]]];
    const c = kf(t, k, ease);
    const sh = shakeXY(t, 5 * (riffK(t, 14)));
    return [c[0] + sh[0] / z, c[1] + sh[1] / z, z];
  }
  function inkEyes(t) { return [INK_AT[0] - 30, INK_AT[1] - 6 * INK_U * .75 - 8]; }
  function inkCam(t) {
    const pc = paperCam(t);
    if (t < THRU) return [pc[0], pc[1], 2.6 * Math.pow(pc[2] / 2.6, .12)];
    const e = inkEyes(t);
    const corner = [3140, 650, 2.0], stare = [e[0], e[1], 2.7];
    const a = ease(seg(t, THRU, THRU + .5)), b = ease(seg(t, TURN + .1, OUT));
    const from = [pc[0], pc[1], 2.6 * Math.pow(17 / 2.6, .12)];
    let c = lerp3(from, corner, a); c = lerp3(c, stare, b);
    c[0] += 10 * Math.sin(t * 1.1); c[1] += 6 * Math.sin(t * 1.4);
    if (t > OUT) c[2] = lerp(2.7, 2.25, ease(seg(t, OUT, S5)));
    return c;
  }
  function inkCreature(t) {
    const stir = t > STIR ? Math.exp(-(t - STIR) * 2.5) * Math.sin((t - STIR) * 38) : 0;
    const open = ease(seg(t, EYES, EYES + .22));
    const rise = ease(seg(t, STIR, EYES + .3));
    const view = t < TURN ? { view: 'q', flip: true } : turn(t, TURN, TURN + .16, -.125, 0);
    const lean = ease(seg(t, TURN + .16, OUT));
    inkling(INK_AT[0], INK_AT[1], INK_U, { ...view, boilKey: 'ink c1', drip: 1, seed: 4,
      sq: lerp(.3, .08, rise) - .06 * lean + .07 * Math.abs(stir), dx: .22 * stir, dy: -.25 * lean, rot: -.04 * lean,
      squint: 1 - open + .25 * open * lean, lookX: t < TURN ? -.6 : 0, lookY: t < TURN ? .2 : -.05,
      aL: -.8 + .3 * rise, aR: -.8 + .25 * rise });
  }
  function inkWorld(t) { inkSide(t, { hooks: { floor: () => inkCreature(t) } }); }
  // screen-space test: does the slit polygon cover the whole frame?
  function covers(P) {
    const inside = (x, y) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
    return [[-20, -20], [W + 20, -20], [W + 20, H + 20], [-20, H + 20], [W / 2, -20], [W / 2, H + 20], [-20, H / 2], [W + 20, H / 2]].every(([x, y]) => inside(x, y));
  }
  function behindPaper(t, lt, dur) {
    const pc = paperCam(t), ic = inkCam(t), w = slitW(t), [A, B] = slitAB(t);
    // is the slit filling the frame? then we're through: paint the Ink Side directly
    camBegin(pc[0], pc[1], pc[2]); const poly = toScreenPts(slitPts(A, B, w, 28)); camEnd();
    if (covers(poly)) { camBegin(ic[0], ic[1], ic[2]); inkWorld(t); camEnd(); return; }
    paintLayer('ink', () => { camBegin(ic[0], ic[1], ic[2]); inkWorld(t); camEnd(); });
    camBegin(pc[0], pc[1], pc[2]);
    parlor(t, { lamps: 1, ambient: .26, lights: [[CHES_AT[0] - 40, 560, 520, .55]], portrait: { stage: 'stern' }, hooks: {
      wall: () => {
        openDoors(t);
        showLayer('ink', [toScreenPts(slitPts(A, B, w, 28))], { feather: 1 });
        slitEdges(A, B, w, { sw: .7 + .25 * clamp(w / 30) });
        if (t > OUT) glow(CRACK_MID[0], CRACK_MID[1], 40 + 3 * w, '#D8F0A0', .35);   // the eyes' glow leaks out as it seals
      } } });
    camEnd();
  }

  // ================================================================================================
  // S5 + S6: THE FRONTMEN, then the HANDOFF (one continuous shot). Their lamp shadows copy them perfectly.
  // ================================================================================================
  const FU = 22, MK5 = [1690, 940], CK5 = [2190, 950];
  const R5 = k => barT(5) + BEAT * k;                    // riff accents in bar 5
  const HOP0 = R5(3.25), HOP1 = barT(6);                 // take off 20.584, land on the bar-6 downbeat 21.183
  const POINT = barT(6) + BEAT * .3, STEP0 = 22.2, STEP1 = 23.0, RAISE0 = 23.3, RAISE1 = 24.22;
  const hitAt = (t, t0, k = 10) => t < t0 ? 0 : Math.exp(-(t - t0) * k);
  function frontCam(t) {
    // opens on the two of them, then eases back to reveal their shadows on the wall (standard two-shot), drifting
    const rv = ease(seg(t, S5, 18.75));
    let x = 1935 + 14 * seg(t, S5, 21.2), y = lerp(700, 612, rv), z = 1.55 * Math.pow(1.25 / 1.55, rv);
    z *= 1 + .025 * seg(t, 18.75, 21.2);
    const p = seg(t, 21.45, END), k = p < .85 ? ease(p / .85) * .96 : .96 + .04 * (p - .85) / .15;   // eases in, still creeping at the cut
    x = lerp(x, 1560, k); y = lerp(y, 760, k); z = z * Math.pow(1.9 / z, k);
    const [dx, dy] = shakeXY(t, 5 * hitAt(t, HOP1, 9) + 1.5 * riffK(t) * (1 - seg(t, 21.3, 22)));
    return [x + dx, y + dy, z];
  }
  // Mike's pose through both shots (the shadow gets exactly the same one)
  function mikeFront(t) {
    const bp = bpOf(t), groove = -.28 * Math.abs(Math.sin(bp * Math.PI)), rk = riffK(t, 8);
    const pump = t < R5(.9) ? Math.max(hitAt(t, R5(0), 7), hitAt(t, R5(.25), 7), hitAt(t, R5(.5), 7)) : 0;
    const toss = hitAt(t, R5(2) - .05, 3.2) * (t > R5(2) - .05 ? 1 : 0);
    const crouch = ease(seg(t, HOP0 - .28, HOP0)) * (t < HOP0 ? 1 : 0), hop = jump(t, HOP0, HOP1, 3.4);
    const m = mood('mike', t, [[S5 - 1, 'excited', { emote: null }], [HOP1 + .1, 'happy', { emote: null }], [POINT + .22, 'neutral', { emote: null }], [STEP0 - .15, 'determined', { emote: null }]], { take: .5 });
    let o = { ...m, emote: null, dy: groove + hop.dy + .15 * crouch, sq: .06 * rk + hop.sq + .22 * crouch, mouth: t < HOP1 ? (pump > .3 || toss > .3 ? 'open' : 'grin') : m.mouth,
      aL: .2 + 1.35 * pump + .6 * seg(t, HOP0 - .05, HOP0 + .1) * (t < HOP1 ? 1 : 0), aR: .4 + 1.15 * toss + .5 * (t > HOP0 && t < HOP1 ? 1 : 0), rot: -.14 * toss + .06 * pump, micAt: 'up', frontArm: undefined };
    o.aL = lerp(o.aL, -.35, crouch * .8); o.aR = lerp(o.aR, -.2, crouch * .8);
    // after the landing: he looks to Chester, then to the light, nods ... steps ... faces front ... raises the mic
    let x = MK5[0], y = MK5[1];
    if (t > HOP1) {
      const settle = ease(seg(t, HOP1, HOP1 + .35));
      o.aL = lerp(o.aL, .1, settle); o.aR = lerp(o.aR, -.35, settle);
      o.lookX = kf(t, [[HOP1 + .3, 0], [POINT + .25, .9], [POINT + .75, .9], [STEP0 - .15, -.5], [STEP1, -.2], [STEP1 + .25, 0]], ease);
      o.lookY = kf(t, [[POINT + .75, 0], [STEP0 - .15, .5], [STEP1, .1], [STEP1 + .25, 0]], ease);
      o.dy += .3 * hitAt(t, STEP0 - .3, 9) * (t > STEP0 - .3 ? 1 : 0);   // a nod
      const sd = stroll(t, STEP0, STEP1, MK5[0], LAY.mike[0], FU);
      x = sd.x; y = lerp(MK5[1], LAY.mike[1], ease(seg(t, STEP0, STEP1)));
      if (t > STEP0 && t < STEP1) Object.assign(o, { walk: sd.walk, ...turn(t, STEP0, STEP0 + .12, 0, -.125), dy: o.dy + sd.dy, lookX: 0, lookY: 0 });
      else if (t >= STEP1) Object.assign(o, turn(t, STEP1, STEP1 + .14, -.125, 0));
      // the mic: from his side, across the body, to his mouth (frontArm, so the arm crosses in front)
      const r = ease(seg(t, RAISE0, RAISE1));
      if (t > RAISE0 && t < RAISE1) {
        // the hand comes up from the hip, across the belly, to the mouth (the mic upright until it nears the mouth)
        o.mic = false; o.frontArm = 'R'; o.aR = lerp(-.35, -(Math.PI + .14), r);
        let up = Math.PI / 2 - o.aR; up -= TAU * Math.round((up - .05) / TAU);
        const ang = lerp(up, .05, ease(seg(r, .55, 1)));
        o.armR = (u2, sw) => micProp(u2, sw, 'mike', ang);
        o.sq = (o.sq || 0) - .04 * Math.sin(r * Math.PI);
      } else if (t >= RAISE1) { o.micAt = 'mouth'; o.micBob = .03 * Math.sin((t - RAISE1) * 9) * Math.exp(-(t - RAISE1) * 3); }
      if (t > RAISE0) o.aL = lerp(o.aL, .8, ease(seg(t, RAISE0 + .2, RAISE1)));
    }
    return { x, y, o };
  }
  function chesterFront(t) {
    const bp = bpOf(t), groove = -.3 * Math.abs(Math.sin(bp * Math.PI + .6));
    const stomp = hitAt(t, R5(1.25), 6) * (t > R5(1.25) ? 1 : 0), hb = t > R5(2.25) - .02 && t < R5(3) ? Math.max(hitAt(t, R5(2.25), 8), hitAt(t, R5(2.5), 8)) : 0;
    const crouch = ease(seg(t, HOP0 - .28, HOP0)) * (t < HOP0 ? 1 : 0), hop = jump(t, HOP0, HOP1, 3.4);
    const m = mood('chester', t, [[S5 - 1, 'excited', { emote: null }], [HOP1 + .15, 'happy', { emote: null }], [POINT + .6, 'proud', { emote: null }]], { take: .5 });
    let o = { ...m, emote: null, mouth: t < HOP1 ? (stomp > .3 || hb > .3 ? 'belt' : 'grin') : m.mouth,
      dy: groove + hop.dy + .15 * crouch + .35 * hb, sq: .25 * stomp + .1 * hb + hop.sq + .22 * crouch,
      rot: .14 * stomp + .16 * hb * (Math.floor((t - R5(2.25)) / (BEAT * .25) + 1e-6) % 2 ? -1 : 1) * (t > R5(2.25) ? 1 : 0), aL: .3 + 1.25 * stomp + .6 * (t > HOP0 && t < HOP1 ? 1 : 0), aR: .9 + .35 * (t > HOP0 && t < HOP1 ? 1 : 0), micAt: 'up' };
    o.aL = lerp(o.aL, -.35, crouch * .8); o.aR = lerp(o.aR, -.2, crouch * .8);
    let x = CK5[0];
    if (t > HOP1) {
      const settle = ease(seg(t, HOP1, HOP1 + .3));
      o.aL = lerp(o.aL, .2, settle); o.aR = lerp(o.aR, .6, settle);
      // turn to Mike (profile, facing left) and point him to the light; then step back and let him have it
      const back = ease(seg(t, STEP0 - .1, STEP1 + .2));
      if (t > POINT && t < STEP0 + .3) {
        Object.assign(o, turn(t, POINT, POINT + .16, 0, -.25));
        o.aL = kf(t, [[POINT, .2], [POINT + .2, 1.45], [POINT + .38, .9], [POINT + .6, 1.0], [STEP0, 1.0], [STEP0 + .3, .1]], ease);
        o.rot = (o.rot || 0) - .12 * ease(seg(t, POINT + .2, POINT + .4)) * (1 - ease(seg(t, STEP0, STEP0 + .3)));
        o.dy += -.35 * hitAt(t, POINT + .38, 8) * (t > POINT + .38 ? 1 : 0);
        o.mouth = 'smile';
      } else if (t >= STEP0 + .3) Object.assign(o, turn(t, STEP0 + .3, STEP0 + .46, -.25, 0));
      x = lerp(CK5[0], CK5[0] + 80, back);
      o.dy += -.2 * Math.abs(Math.sin(bp * Math.PI)) * back;
    }
    return { x, y: CK5[1], o };
  }
  function frontmen(t, lt, dur) {
    const [cx, cy, cz] = frontCam(t), wind = seg(t, 21.3, 23.4);
    camBegin(cx, cy, cz);
    const M = mikeFront(t), C = chesterFront(t);
    const mikeShadowPose = { ...M.o, ...(M.o.micAt === 'mouth' ? { aR: Math.PI - .14 } : {}) };
    const pool = ease(seg(t, 21.9, 23.1));
    const hk = bandHooks(t, { style: { mike: 'idle', chester: 'idle' }, energy: lerp(.95, .55, wind), skip: offscreen(['mike', 'chester']),
      over: { joe: { aL: .2 + .1 * Math.sin(bpOf(t) * TAU * 2), aR: .12, boilKey: 'joe' }, rob: { boilKey: 'rob' }, brad: { boilKey: 'brad' }, phoenix: { boilKey: 'phoenix' } },
      floorAfter: () => {
        const st = ease(seg(t, STEP0, STEP1));
        wallShadow('mike', M.x, M.y, FU, mikeShadowPose, { k: lerp(1.4, 1.5, st), dx: lerp(-260, -330, st), wallY: 700, alpha: lerp(.64, .5, seg(t, 23.4, END)), blur: 2.5 });
        wallShadow('chester', C.x, C.y, FU, C.o, { k: 1.4, dx: 260, wallY: 700, alpha: .64 * (1 - .3 * pool), blur: 2.5 });
        member('chester', C.x, C.y, FU, { ...C.o, boilKey: 'chester' });
        member('mike', M.x, M.y, FU, { ...M.o, boilKey: 'mike' });
      } });
    parlor(t, { drums: drumHits(t, lerp(1, .6, wind)), portrait: { stage: 'stern' }, ambient: .22 + .16 * pool * (1 - ease(seg(t, 23.5, END))),
      lights: [[LAY.mike[0], 880, 520, pool]], hooks: hk });
    camEnd();
  }

  shots([[S1, lampOpen], [S2, dolly], [S3, wideCrash], [S4, behindPaper], [S5, frontmen]]);
})();
