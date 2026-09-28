// c02_stable.js: VERSE 1 in the stable. barT(7) → barT(15) = 16.545 → 31.091. Warm browns.
//
// SHOT PLAN (video time; 132 BPM: BEAT .4545, BAR 1.818; bars 7-14 of the song = 8 bars of rap over a steady groove)
// World: the shared stable set, side-on (stalls every 300 px, doors 460-820, floor 820). THE Horse's stall is k = 6
// (centre x 2140); Oppa's stare-down mark is x 1960, the Kid's 1710. The row ends at x ≈ 2880 in a big open barn door
// (painted here), bright with the paper storm outside. Oppa (look 'black') u 26; the Kid u 14; peeking horses s 15
// (bay / grey / black / palomino); THE Horse (chestnut, the spark star) s 22. The counter HUD is in every shot.
//
// 1 THE STRUT  16.545-22.000 (bars 7-9)  [in: SMASH CUT from c01's frozen pointup, opening mid-strut, already moving]
//   A side-on dolly tracking Oppa right along the stall row. He struts in 3/4 view (the `strut` move: right hand to the
//   shades), rapping (singing 'rap'), with a gesture on every beat: left-arm chops, a pumped point ahead on some beats.
//   Every half-door has a horse's head over it. The heads follow him: a horse looks out at us until he comes near, turns
//   its head toward him (profile), faces front as he passes right under it, then turns to watch him go. Each head turn
//   snaps on an eighth note, a beat-ish lag behind him (deadpan). THE Horse's stall looks empty: its head is down.
//   reads: 16.55-17.6  Oppa in a black tux strutting and rapping down a stable row
//          16.8-18.4   the horses' heads turn to follow him (stall 3 turns front, then round; stall 5 notices him)
//          17.95-19.2  the Kid sprints in from the left, falls in behind and copies the strut a beat late (mini-me)
//          18.4-20.2   more heads swivel as he passes (stall 4); the Kid copies the point gesture a beat after him
//          20.18-20.64 he slows and stops on bar 9 beat 1, at the "empty" stall; the camera eases in
//          20.42-21.05 THE Horse's head rises slowly over the door, chewing (a rhyme with c01's fence)
//          21.09-21.55 Oppa's take (looks up), then a smirk
//          21.55-22.0  he points up at the Horse, taunting (rap flaps), and crouches: "watch this"
// 2 THE STARE-DOWN  22.000-29.273 (bars 10-13)
//   2a 22.00-26.09 [CUT on action: the gallop starts on the bar-10 downbeat] Two-shot: Oppa (and the Kid behind him,
//      copying) do the real horse dance AT the Horse: bar 10 `gallop`, bar 11 `lasso`, full bodies, on the beat, the
//      camera steady with a slow push. The Horse: chew, chew (on every beat), eyes on him, never blinks.
//      25.64 (bar 12): Oppa lands a big "ta-da" V pose (the Kid too) and holds it, grinning, waiting for applause.
//   2b 26.09-27.00 [CRASH ZOOM with speed lines] Close on THE Horse: Chew. Chew. Deadpan. No blink. A fly buzzes round
//      its head (it doesn't even blink), then dives down-left toward Oppa.
//   2c 27.00-29.27 [CUT, the fly carries the move across] Medium on Oppa, still holding the ta-da, grin fading. The fly
//      drops in from the top and lands on his shades on the bar-13 downbeat (27.455). He freezes. 27.85: his confidence
//      wobbles (pale, a sweat drop, the arms droop, fidgeting); 28.18-28.6 a nervous look to camera; 28.62 the Kid
//      scurries behind him and peeks out; 29.0 a gulp.
// 3 THE ACCENT  29.273-31.091 (bar 14)  [CUT on action: the shake-off]
//   Medium-wide: Oppa, the Horse's head, and the far door at the right, now bursting with blowing paper (scraps start
//   streaming in on the bar-14 downbeat). He shakes the fly off (29.27-29.45), spins to camera (29.45-29.8), and fires
//   finger guns on the two stabs: right hand 29.90, left hand 30.18 (a recoil and a spark each). The Kid pops out and
//   copies. The Horse slides its eye to the camera. 30.36: he turns and struts off toward the door, into the wind.
//   [out: the paper-blizzard wipe, paperWipe((t - (31.091 - .45)) / .9, 7), last in the frame: covered by 31.091]
(() => {
  // ---------- timing ----------
  const T0 = barT(7), T_END = barT(15);
  const T_DEC = barT(9), T_STOP = beatT(9, 1);                                    // 20.182 slow down, 20.636 stop
  const T_RISE0 = 20.42, T_RISE1 = 21.05;                                         // THE Horse's head comes up
  const T_TAKE = beatT(9, 2), T_SMUG = 21.33, T_POINT = beatT(9, 3);              // 21.091, 21.33, 21.545
  const T_DANCE = barT(10), T_LASSO = barT(11), T_TADA = barT(12);                // 22.000, 23.818, 25.636
  const T_CU = beatT(12, 1), T_BACK = beatT(12, 3);                               // 26.091, 27.000
  const T_LAND = barT(13), T_WOBBLE = 27.85, T_LOOK0 = 28.18, T_LOOK1 = 28.6, T_HIDE = 28.62, T_GULP = 29.0;
  const T_ACC = barT(14), T_BLAST = 29.52, T_SPIN1 = 29.84;                        // 29.273 door bursts; 29.52 the blast hits
  const [STAB1, STAB2] = HIT.verseAccent1;                                        // 29.90, 30.18
  const T_OFF = 30.36, T_WIPE = T_END - .45;

  // ---------- world ----------
  const U = 26, KU = 14, OY = 910, KY = 902;
  const KH = 6, HX = stallX(KH) + 140;                                            // THE Horse's stall centre (2140)
  const OX = 1960, KX = OX - 250;                                                 // the stare-down marks
  const DOOR_K = 8, DOOR_X = stallX(DOOR_K) - 22;                                 // the row ends here: the far door
  const HS = 24, PS = 17;
  const HAND = CAST.oppa.hand, KHAND = CAST.kid.hand, SLV = GP.blackTux;
  const DQ = { hand: HAND, sleeve: SLV }, DK = { hand: KHAND, sleeve: KHAND };
  const V = 187, X_DEC = OX - V * (T_STOP - T_DEC) / 2, V2 = 250;                 // strut speed (px/s)

  // Oppa's x: a steady strut, easing to a stop on bar 9 beat 1; parked; then strutting off after the finger guns
  function oppaX(t) {
    if (t <= T_DEC) return X_DEC - V * (T_DEC - t);
    if (t < T_STOP) { const a = t - T_DEC, D = T_STOP - T_DEC; return X_DEC + V * (a - a * a / (2 * D)); }
    if (t < T_OFF) return OX;
    const a = t - T_OFF, r = .2; return OX + V2 * (a < r ? a * a / (2 * r) : a - r / 2);
  }
  // when his centre reaches x (oppaX never decreases), for the heads that follow him
  function tAtX(x) {
    if (x <= oppaX(T0)) return -Infinity; if (x > oppaX(T_END)) return Infinity;
    let a = T0, b = T_END; for (let i = 0; i < 32; i++) { const m = (a + b) / 2; if (oppaX(m) < x) a = m; else b = m; }
    return (a + b) / 2;
  }
  const q8 = t => OFF + Math.ceil((t - OFF) / EIGHTH - 1e-6) * EIGHTH;           // the next eighth note

  // ---------- hands ----------
  const cheek = (sl, hd) => bentHook(-2.05, 2.35, sl, hd);                         // the strut's hand at the shades
  // a pointing hand (index finger along the arm), optionally cocked as a finger gun (thumb up) with a muzzle spark
  function handPoint(hand, gun = false, spark = 0) {
    return (u, sw) => {
      paint(rrPts(.25 * u, -.52 * u, 1.35 * u, .44 * u, .2 * u), { wash: hand, ink: PAL.ink, sw: sw * .6 });
      paint(ellPts(.1 * u, .05 * u, .6 * u, .55 * u, 12), { wash: hand, ink: PAL.ink, sw: sw * .7 });
      if (gun) paint(rrPts(-.2 * u, -1.1 * u, .42 * u, .72 * u, .18 * u), { wash: hand, ink: PAL.ink, sw: sw * .6 });
      if (spark > .03) {
        const r = u * (.5 + 1.1 * Math.sqrt(spark));
        paint(starPts(2.1 * u + r * .4, -.3 * u, r, .38, 6, spark * 2), { wash: '#FFEBB0', fill: PAL.ochre, fillOp: 90, ink: PAL.ink, sw: sw * .5 });
        for (let i = 0; i < 3; i++) { const a = (i - 1) * .55; inkLine([[2.2 * u + Math.cos(a) * r * 1.2, -.3 * u + Math.sin(a) * r * 1.2], [2.2 * u + Math.cos(a) * r * 1.9, -.3 * u + Math.sin(a) * r * 1.9]], sw * .8 * spark, PAL.ink, 'ink', 0); }
      }
    };
  }
  // a rap chop on every beat: the arm lifts on the "and" and chops down on the beat
  const chopA = f => f < .14 ? lerp(.55, -.55, easeOut(f / .14)) : f < .5 ? lerp(-.55, -.32, ease((f - .14) / .36)) : lerp(-.32, .55, ease((f - .5) / .5));

  // ---------- the strut, with a rap gesture on every beat ----------
  // right arm per beat from the chapter start: S = hand at the shades, P = pointing ahead, pumped on the beat
  const GEST = 'SSPS' + 'SSPP' + 'SS';
  function strutPose(t, who) {
    const kid = who === 'kid', hand = kid ? KHAND : HAND, sl = kid ? KHAND : SLV;
    const d = dance('strut', t, kid ? DK : DQ);
    const bi = beatIx(t) - beatIx(T0), g = GEST[clamp(bi, 0, GEST.length - 1)], gp = GEST[clamp(bi - 1, 0, GEST.length - 1)];
    const f = beatPh(t), blend = bi > 0 && g !== gp ? ease(clamp(f / .18)) : 1;
    const arm = c => c === 'S' ? { a: 1.0, len: .8, hook: cheek(sl, hand) } : { a: .32 + .32 * pulse(t, 7), len: 1.25, hook: handPoint(hand) };
    const A = arm(g), P0 = arm(gp);
    return {
      ...d, aR: lerp(P0.a, A.a, blend), armLen: { R: lerp(P0.len, A.len, blend), L: 1 }, armR: blend > .5 ? A.hook : P0.hook,
      aL: chopA(f), armL: fistHook(hand), frontArm: 'R'
    };
  }

  // ---------- Oppa ----------
  function oppaPose(t) {
    const x = oppaX(t), base = { look: 'black', boilKey: 'oppa', view: 'q', eyes: 'normal' };
    let o;
    if (t < T_STOP) o = { ...base, ...strutPose(t, 'oppa'), walk: (x - oppaX(T0)) / 170, ...singing(t, 'rap') };
    else if (t < T_DANCE) o = { ...base, ...arrivePose(t) };
    else if (t < T_TADA) o = { ...base, ...routine(t, [[T_DANCE, 'gallop'], [T_LASSO, 'lasso']], DQ), ...singing(t, 'rap') };
    else if (t < T_ACC) o = { ...base, ...tadaPose(t) };
    else o = { ...base, ...accentPose(t) };
    return { x, y: OY, u: U, o };
  }
  // he stops at the "empty" stall; THE Horse's head rises; a take, a smirk, a point up at it, a crouch
  function arrivePose(t, kid = false) {
    const hand = kid ? KHAND : HAND, sl = kid ? KHAND : SLV;
    const settle = spring(t, T_STOP, 7, 16), tk = take(t, T_TAKE, .55), look = ease(seg(t, T_TAKE, T_TAKE + .2)) * (1 - ease(seg(t, T_DANCE - .3, T_DANCE - .1)));
    const antic = ease(seg(t, T_DANCE - .22, T_DANCE)), pt = ease(seg(t, T_POINT - .08, T_POINT + .06));
    const aR = lerp(1.0, .78 + .08 * pulse(t, 7), pt), mouth = t < T_TAKE ? singing(t, 'rap').mouth : t < T_SMUG ? 'o' : t < T_POINT ? 'smirk' : t < T_DANCE - .2 ? singing(t, 'rap').mouth : 'smirk';
    return {
      sq: .08 * settle + tk.sq + .12 * antic, dy: tk.dy - .15 * settle, rot: -.07 * look + .02 * antic, legSplay: .35 + .25 * antic,
      aR: lerp(aR, .2, antic), armLen: { R: lerp(.8, 1.3, pt), L: 1 }, armR: pt > .5 ? handPoint(hand) : cheek(sl, hand),
      aL: lerp(-.45 + .05 * Math.sin(t * 5), -.1, antic), armL: fistHook(hand), frontArm: 'R', mouth
    };
  }
  // the ta-da, the fly, the wobble, the look to camera, the gulp
  function tadaPose(t) {
    const land = spring(t, T_TADA, 8, 16), twitch = spring(t, T_LAND, 10, 34);
    const m = mood('oppa', t, [[T_TADA, 'smug'], [T_WOBBLE, 'nervous']]), nv = seg(t, T_WOBBLE, T_WOBBLE + .3);
    const dr = ease(seg(t, T_WOBBLE + .1, T_WOBBLE + .7));                        // the V collapses: arms pulled in, fidgeting
    const fid = .12 * Math.sin(t * 29) * dr, fid2 = .12 * Math.sin(t * 23 + 1) * dr;
    const lk = t < T_LOOK1 ? turn(t, T_LOOK0, T_LOOK0 + .1, .125, 0) : turn(t, T_LOOK1, T_LOOK1 + .1, 0, .125);
    const gulp = t > T_GULP ? Math.exp(-(t - T_GULP) * 7) * Math.sin(Math.min(Math.PI, (t - T_GULP) * 14)) : 0;
    let mouth = t < 27.2 ? 'grin' : t < T_LAND ? 'flat' : t < T_WOBBLE ? 'o' : m.mouth;
    if (t > T_GULP && t < T_GULP + .18) mouth = 'o';
    const hold = t < T_WOBBLE ? .015 * Math.sin((t - T_TADA) * 5) * (t < T_LAND ? 1 : 0) : 0;
    return {
      view: lk.view, flip: lk.flip, smear: lk.smear, smearDir: 0,
      aL: lerp(.98, -1.12, dr) + fid, aR: lerp(.95, -1.08, dr) + fid2, armLen: lerp(1.35, .85, dr), armL: fistHook(HAND), armR: fistHook(HAND), frontArm: '',
      legSplay: lerp(.85, -.22 + .14 * Math.sin(t * 38), dr), sq: -.08 * land + hold + .12 * gulp + .06 * dr + (t > T_WOBBLE ? m.sq : 0), dy: (t > T_WOBBLE ? m.dy : 0) - .1 * twitch,
      rot: -.035 + .03 * twitch + .03 * dr * Math.sin(t * 17), dx: nv * (m.dx || 0) * .6,
      mouth, emote: m.emote, emoteK: t > T_WOBBLE ? m.emoteK : 0, emoteAge: m.emoteAge, col: m.col, dk: m.dk, lt: m.lt, tint: m.tint, tintK: m.tintK
    };
  }
  // the blast of paper spins him round like a top (and blows the fly away); he lands facing us, cool again, and fires
  // finger guns on the two stabs; then he struts off into the wind
  const gunArm = (t, ts) => { const a = t - ts; if (a < -.14) return { a: -.3, k: 0 }; if (a < 0) return { a: lerp(-.3, -.55, ease((a + .14) / .14)), k: 0 }; return { a: .28 + .55 * Math.exp(-a * 9) * Math.min(1, a / .035), k: Math.exp(-a * 9) }; };
  function accentPose(t) {
    if (t < T_BLAST) {   // still frozen with nerves, the knees knocking; the door bursts open off to the right
      const p = tadaPose(t), look = ease(seg(t, T_ACC + .02, T_ACC + .14));
      return { ...p, view: 'q', flip: false, smear: 0, legSplay: -.22 + .14 * Math.sin(t * 38), rot: .04 * look, mouth: look > .5 ? 'o' : p.mouth, dx: 0 };
    }
    const sp = t < T_SPIN1 ? turn(t, T_BLAST, T_SPIN1, .125, 1) : t < T_OFF ? spinView(0) : turn(t, T_OFF, T_OFF + .12, 0, .125);
    const hop = jump(t, T_BLAST + .02, T_SPIN1 - .02, 1.4), push_ = Math.exp(-Math.max(0, t - T_BLAST) * 6) * (t >= T_BLAST ? 1 : 0);
    const g1 = gunArm(t, STAB1), g2 = gunArm(t, STAB2);
    if (t >= T_OFF + .06) {   // strutting off toward the door, leaning into the wind, rapping
      return { ...strutPose(t, 'oppa'), view: 'q', walk: (oppaX(t) - OX) / 170, rot: .08 + .03 * Math.sin(t * 9), ...singing(t, 'rap') };
    }
    const front = t >= T_SPIN1, lGun = t >= STAB2 - .14;
    return {
      view: sp.view, flip: sp.flip, smear: sp.smear, smearDir: 0,
      dx: -.5 * push_, rot: -.1 * push_ + (front ? -.03 * (g1.k + g2.k) : 0),
      dy: hop.dy - .25 * (g1.k + g2.k), sq: hop.sq + .06 * (g1.k + g2.k) + (front ? .08 * spring(t, T_SPIN1, 9, 20) : 0),
      aR: front ? g1.a : 1.2, armLen: front ? { R: 1.3, L: lGun ? 1.3 : .72 } : 1.2, frontArm: '',
      armR: front ? handPoint(HAND, true, g1.k) : fistHook(HAND),
      aL: front ? (lGun ? g2.a : -.55) : 1.2, armL: front ? (lGun ? handPoint(HAND, true, g2.k) : bentHook(1.83, 1.85, SLV, HAND)) : fistHook(HAND),
      legSplay: front ? .6 : .2, mouth: t < T_SPIN1 ? 'O' : (g1.k > .5 || g2.k > .5) ? 'o' : 'smirk'
    };
  }

  // ---------- the Kid ----------
  function kidX(t) {
    const path = oppaX(t - BEAT) - 250;                                            // a beat behind, copying
    if (t < 18.82) { const k = seg(t, 17.95, 18.82); return path - 760 * (1 - k) * (1 - k); }
    return path;
  }
  function kidPose(t) {
    const base = { boilKey: 'kid', view: 'q', eyes: 'determined', mouth: 'flat' };
    let x = kidX(t), y = KY, o;
    if (t < 17.95) return null;
    if (t < T_STOP + BEAT) {
      const run = 1 - seg(t, 18.6, 18.9);
      const s = strutPose(t - BEAT, 'kid');
      o = { ...base, ...s, walk: (x - kidX(17.95)) / 150, dy: lerp(s.dy, -.8 * Math.abs(Math.sin(bpOf(t) * TAU)), run), rot: lerp(s.rot || 0, .12, run),
        smear: .35 * run, smearDir: 1, aL: lerp(s.aL, .8 * Math.sin(bpOf(t) * TAU * 2), run), aR: lerp(s.aR, -.8 * Math.sin(bpOf(t) * TAU * 2), run) };
      if (run > .5) { o.armR = fistHook(KHAND); o.armLen = 1; }
    } else if (t < T_DANCE) {
      o = { ...base, ...arrivePose(t - BEAT, true), mouth: 'flat' };
    } else if (t < T_TADA) {
      o = { ...base, ...routine(t, [[T_DANCE, 'gallop'], [T_LASSO, 'lasso']], DK) };
    } else if (t < T_ACC) {
      // mini ta-da, then scared: he scurries behind Oppa and peeks out at the Horse
      const land = spring(t, T_TADA + .06, 8, 16), sc = seg(t, T_HIDE - .2, T_HIDE), mv = ease(seg(t, T_HIDE, T_HIDE + .32));
      const m = mood('kid', t, [[T_TADA, 'determined'], [T_HIDE - .2, 'scared']]);
      x = lerp(KX, OX + 182, mv); y = lerp(KY, OY - 16, mv);
      o = { ...base, aL: lerp(1, -.2, sc), aR: lerp(1, .9, sc), armLen: 1.2, armL: fistHook(KHAND), armR: fistHook(KHAND), sq: -.08 * land + (sc > 0 ? m.sq : 0), dy: sc > 0 ? m.dy : 0,
        eyes: sc > 0 ? 'wide' : 'determined', mouth: sc > 0 ? 'wobble' : 'flat', smear: .5 * Math.sin(mv * Math.PI), smearDir: 1, walk: mv * 3,
        dx: mv > .99 ? .06 * Math.sin(t * 40) : 0, tint: sc > 0 ? 'pale' : null, tintK: .5 * sc, legSplay: .5 };
    } else {
      // bar 14: the blast bowls him from Oppa's right round to his left; he pops up, fierce again, fires finger guns
      // on the stabs with Oppa, then follows him off into the wind
      const out = ease(seg(t, T_BLAST - .04, T_SPIN1 - .02)), hop = jump(t, T_BLAST - .02, T_SPIN1 - .06, 1.6);
      x = lerp(OX + 182, OX - 205, out); y = lerp(OY - 16, KY, out);
      if (t < T_SPIN1) {
        const sp = turn(t, T_BLAST - .04, T_SPIN1 - .02, .125, 1);
        o = { ...base, ...(out > 0 ? sp : {}), eyes: 'wide', mouth: 'wobble', aL: .9, aR: .9, armLen: 1.2, armL: fistHook(KHAND), armR: fistHook(KHAND), smearDir: 0,
          dy: hop.dy, sq: hop.sq, dx: out === 0 ? .06 * Math.sin(t * 40) : 0, tint: 'pale', tintK: .5 * (1 - out) };
      } else if (t < T_OFF + BEAT) {
        const g1 = gunArm(t, STAB1 + .03), g2 = gunArm(t, STAB2 + .03);
        o = { ...base, view: 'front', aR: g1.a, armR: handPoint(KHAND, true, g1.k * .7), aL: t >= STAB2 - .11 ? g2.a : -.4, armL: t >= STAB2 - .11 ? handPoint(KHAND, true, g2.k * .7) : fistHook(KHAND), armLen: 1.3,
          dy: -.3 * (g1.k + g2.k), sq: .06 * (g1.k + g2.k) + .1 * spring(t, T_SPIN1, 9, 20), legSplay: .5 };
      } else {
        x = OX - 205 + (oppaX(t - BEAT) - OX);
        o = { ...base, ...strutPose(t - BEAT, 'kid'), view: 'q', walk: (x - OX) / 150, rot: .09 };
      }
    }
    return { x, y, u: KU, o };
  }

  // Oppa's body-local point (front-view coords, in u) → world, replicating clawd()'s transform (for the fly on his lens)
  function oppaPt(P, lx, ly) {
    const o = P.o, u = P.u, sq = o.sq || 0, sm = clamp(o.smear || 0);
    const sx = (o.flip ? -1 : 1) * 1.12 * (1 + sq * .6) * (1 + sm * .35), sy = .94 * (1 - sq);
    const bx = P.x + (o.dx || 0) * u, by = P.y + (o.dy || 0) * u, c = Math.cos(o.rot || 0), s = Math.sin(o.rot || 0);
    const px = lx * u * sx, py = ly * u * sy; return [bx + px * c - py * s, by + px * s + py * c];
  }
  function lensPt(t) {   // the lens nearest the Horse
    const P = oppaPose(t), F = (VIEWS[P.o.view] || VIEWS.front).face || VIEWS.front.face;
    return oppaPt(P, F.cx + 2.5 * F.fw, -6.2);
  }

  // ---------- the horses ----------
  const COATS_P = ['bay', 'grey', 'black', 'palomino'];
  // a peeking horse's head: 'F' (looking out at us) until he comes near, 'L' (watching him come), 'F' (he's right below),
  // 'R' (watching him go). Each switch waits a little (deadpan) and lands on an eighth note.
  function peekState(k, t) {
    const xc = stallX(k) + 140, lag = .06 + .22 * hash(k * 1.7 + .3);
    const sw = [tAtX(xc - 520), tAtX(xc - 45), tAtX(xc + 45)].map(v => isFinite(v) ? q8(v + lag) : v);
    let st = 'F', t0 = -9;
    if (t >= sw[0]) { st = 'L'; t0 = sw[0]; } if (t >= sw[1]) { st = 'F'; t0 = sw[1]; } if (t >= sw[2]) { st = 'R'; t0 = sw[2]; }
    return { st, t0, xc };
  }
  // side-view heads over the doors: the whole horse leans back (rot) so the head and neck rise over the half-door and
  // only the withers show; placed so the head's centre sits at (x, y) for a reference headDown of .1
  const ROT = .34;
  function sidePlace(x, y, s, flip) {
    const o = { flip, rot: flip ? ROT : -ROT, headDown: .1 }, c = horseHeadPt(0, 0, s, o, 2.6, 0);
    return [x - c[0], y - c[1]];
  }
  function peeker(k, t) {
    const { st, t0, xc } = peekState(k, t), coat = COATS_P[((k * 3 + 1) % 4 + 4) % 4], bob = -.16 * spring(t, t0, 8, 18);
    const near = clamp(1 - Math.abs(oppaX(t) - xc) / 420), key = 'pk' + k;
    if (st === 'F') return horse(xc, 382 + 18.9 * PS, PS, t, { view: 'up', coat, blink: k * 1.7, dy: bob, boilKey: key });
    const L = st === 'L', [gx, gy] = sidePlace(xc + (L ? -8 : 8), 382, PS, L);
    horse(gx, gy, PS, t, { coat, flip: L, rot: L ? ROT : -ROT, headDown: .1 + .22 * near, blink: k * 1.7, dy: bob, boilKey: key });
  }
  // THE Horse: head down out of sight (eating), it rises slowly as Oppa stops; then chews on every beat and stares.
  // Horse-time tw puts its chew on the beat; the blink seed is steered so it NEVER blinks.
  function theHorseOpts(t) {
    const rise = ease(seg(t, T_RISE0, T_RISE1)), bp = bpOf(t), tw = bp * Math.PI / 9 + Math.PI / 18;
    const chewing = seg(t, T_RISE1 - .1, T_RISE1 + .2), bob = .06 * Math.abs(Math.cos(Math.PI * bp)) * chewing;
    const look = t > STAB1 + .15 && t < T_END ? 'camera' : undefined;
    const low = 5.5 * (1 - easeOut(seg(t, T_RISE0, T_RISE1 - .08)));             // it stands up from the feeder, out of sight
    return { tw, o: { coat: 'chestnut', flip: true, rot: ROT + .02, headDown: lerp(1, .16, rise) + .03 * bob, chew: chewing, dy: bob + low, blink: (2 - tw * .7) / 1.3, look, boilKey: 'THE' } };
  }
  const [HGX, HGY] = (() => { const o = { flip: true, rot: ROT + .02, headDown: .16 }, c = horseHeadPt(0, 0, HS, o, 2.6, 0); return [HX - 14 - c[0], 336 - c[1]]; })();
  function theHorse(t) { const { tw, o } = theHorseOpts(t); horse(HGX, HGY, HS, tw, o); }
  // a head-space point of a side-view horse → world (replicating horse()'s transforms)
  function horseHeadPt(gx, gy, s, o, hx, hy) {
    const hd = clamp(o.headDown || 0), ha = lerp(-.95, .35, hd), nt = [3.6 + Math.cos(ha) * 6.2 * .55 + 1.6, -11.4 + Math.sin(ha) * 6.2];
    const hr = lerp(.62, 1.25, hd), c = Math.cos(hr), sn = Math.sin(hr);
    const bx = (nt[0] + hx * c - hy * sn) * s, by = (nt[1] + hx * sn + hy * c) * s;
    const fl = o.flip ? -1 : 1, sq = o.sq || 0, r = (o.rot || 0) * fl, cr = Math.cos(r), sr = Math.sin(r);
    const rx = bx * cr - by * sr, ry = bx * sr + by * cr;
    return [gx + (o.dx || 0) * s + rx * fl * (1 + sq * .5), gy + (o.dy || 0) * s + ry * (1 - sq)];
  }
  const theHorsePt = (t, hx, hy) => horseHeadPt(HGX, HGY, HS, theHorseOpts(t).o, hx, hy);
  // the wisp of hay in its mouth, bobbing with every chew
  function hay(t) {
    if (t < T_RISE0 + .2) return;
    const ch = Math.abs(Math.cos(Math.PI * bpOf(t))) * seg(t, T_RISE1 - .1, T_RISE1 + .2);
    boilSeed('c2 hay');
    for (let i = 0; i < 5; i++) {
      const a = theHorsePt(t, 4.3 + .15 * i, 1.05), b = theHorsePt(t, 6.4 + .5 * hash(i) + .3 * i, 1.6 + .5 * i + .5 * ch * (i % 2 ? 1 : -.4));
      inkLine([a, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 3], b], 1.3, i % 2 ? '#E8C860' : '#D8B048', 'ink', .4);
    }
  }
  function stallHorses(t) {
    const [a, , c] = viewRect2(0);                                                 // only heads that can be on screen
    for (let k = Math.floor((a - 400) / 300); k <= Math.ceil((c + 100) / 300); k++) {
      const xc = stallX(k) + 140; if (k >= DOOR_K || xc + 190 < a || xc - 190 > c) continue;
      if (k === KH) theHorse(t); else peeker(k, t);
    }
  }
  // repaint the lower stall fronts over the horses' bodies (they stand behind the half-doors)
  function stallFronts() {
    const [a, , c] = viewRect2(300);
    boilSeed('c2 fronts');
    paint(rectPts(a - 100, 461, c - a + 200, FLOOR - 461), { wash: '#E4D6B8', ink: null });
    for (let k = Math.floor((a - 200) / 300); k <= Math.ceil((c - 200) / 300); k++) {
      const x = stallX(k); if (k >= DOOR_K) break;
      boilSeed('c2 front' + k);
      paint(rectPts(x - 16, 461, 16, FLOOR - 461), { wash: '#8A6444', ink: null });
      inkLine([[x - 16, 458], [x - 16, FLOOR]], .7, PAL.ink, 'ink', 0); inkLine([[x, 458], [x, FLOOR]], .7, PAL.ink, 'ink', 0);
      paint(rectPts(x, 460, 280, FLOOR - 460), { wash: '#9A6A44', fill: '#7A5034', fillOp: 70, tex: .6, ink: PAL.ink, sw: .9 });
      inkLine([[x + 10, 470], [x + 270, FLOOR - 10]], 2, '#6A4A30', 'ink', 0); inkLine([[x + 270, 470], [x + 10, FLOOR - 10]], 2, '#6A4A30', 'ink', 0);
    }
  }

  // ---------- the far door: the stall row ends in a big open barn door, bright with the paper storm outside ----------
  const GX0 = DOOR_X + 110, GX1 = DOOR_X + 620, GTOP = 150;
  // the sliding door: shut until the bar-14 downbeat, then the storm bursts it open (it bangs against its stop)
  const doorOpen = t => t < T_ACC ? 0 : 1 - Math.exp(-(t - T_ACC) * 30) * Math.cos((t - T_ACC) * 20);
  function farDoor(t) {
    if (!vis(DOOR_X - 60, DOOR_X + 2600)) return;
    const op = doorOpen(t), wind = seg(t, T_ACC, T_ACC + .3);
    boilSeed('c2 endwall');
    paint(rectPts(DOOR_X, 62, 2600, FLOOR - 62), { wash: '#D8C49C', fill: '#B8986C', fillOp: 45, tex: .5, ink: null });
    for (let i = 0; i < 20; i++) { const x = DOOR_X + 24 + i * 128; if (x > GX0 - 40 && x < GX1 + 40) continue; boilSeed('c2 plank' + i); inkLine([[x, 66], [x, FLOOR]], .6, '#9A7A58', 'inkfine', 0); }
    inkLine([[DOOR_X, 62], [DOOR_X, FLOOR]], 1.2, PAL.ink, 'ink', 0);
    if (op > .01) {   // the storm beyond: bright paper-white, scraps whirling across the opening
      boilSeed('c2 doorway');
      paint(rectPts(GX0, GTOP, GX1 - GX0, FLOOR - GTOP), { wash: '#FBF5E6', ink: null });
      glow((GX0 + GX1) / 2, 470, 420, '#FFF3D0', .7 + .5 * Math.exp(-(t - T_ACC) * 5));
      for (let i = 0; i < 14; i++) {
        const h1 = hash(i * 4.1 + 2), h2 = hash(i * 6.3 + 1), x = GX1 + 40 - ((t * 1400 * (.5 + .5 * h1) + h2 * 900) % (GX1 - GX0 + 120)), y = GTOP + 40 + (FLOOR - GTOP - 80) * h1 + 30 * Math.sin(t * 3 + i);
        push(); translate(x, y); rotate(t * (4 + 5 * h2) + i); scale(1, .3 + .7 * Math.abs(Math.cos(t * 9 + i)));
        boilSeed('c2 storm' + i);
        paint(rectPts(-24 - 14 * h2, -16, 48 + 28 * h2, 32, 1), { wash: i % 2 ? '#F4EEDF' : '#FFFFFF', ink: mixCol(PAL.ink, '#FBF5E6', .4), sw: .5 });
        pop();
      }
      for (let i = 0; i < 7; i++) { boilSeed('c2 gust' + i); const y = GTOP + 60 + i * 95, x = GX1 - ((t * 1600 + i * 170) % 560); inkLine([[x, y], [x - 160 * wind, y + 8]], 1.6 * wind, '#E6DCC4', 'dry', 0); }
    }
    // the frame, the rail and the sliding door
    boilSeed('c2 doorframe');
    paint(rectPts(GX0 - 30, GTOP - 34, GX1 - GX0 + 60, 34), { wash: '#6A4A30', ink: PAL.ink, sw: .9 });
    paint(rectPts(GX0 - 30, GTOP, 30, FLOOR - GTOP), { wash: '#7A5438', ink: PAL.ink, sw: .9 });
    paint(rectPts(GX1, GTOP, 30, FLOOR - GTOP), { wash: '#7A5438', ink: PAL.ink, sw: .9 });
    inkLine([[GX0 - 50, GTOP - 52], [GX1 + 640, GTOP - 52]], 3, '#4A3A30', 'ink', 0);
    boilSeed('c2 slider');
    const sx = lerp(GX0 - 8, GX1 + 60, op), rat = op < .01 ? 2 * Math.sin(t * 31) * seg(t, 28.9, T_ACC) : 0;
    paint(rectPts(sx + rat, GTOP - 44, 524, FLOOR - GTOP + 36), { wash: '#9A6A44', fill: '#7A5034', fillOp: 70, tex: .6, ink: PAL.ink, sw: .9 });
    inkLine([[sx + rat + 14, GTOP - 30], [sx + rat + 510, FLOOR - 16]], 2, '#6A4A30', 'ink', 0); inkLine([[sx + rat + 510, GTOP - 30], [sx + rat + 14, FLOOR - 16]], 2, '#6A4A30', 'ink', 0);
  }
  // wind-blown paper scraps pouring out of the far door and down the aisle (from bar 14). layer 'back' flies along the
  // stall fronts (drawn behind the cast), 'front' tumbles along the floor in front of them.
  function scraps(t, layer) {
    const back = layer === 'back', n = back ? 34 : 26, off = back ? 0 : 100;
    for (let i = 0; i < n; i++) {
      const id = i + off, h1 = hash(id * 3.17 + .5), h2 = hash(id * 5.71 + .2), h3 = hash(id * 7.93 + .9), h4 = hash(id * 2.3 + 4);
      const blast = i < (back ? 12 : 8);                                            // the first wave bursts out with the door
      const born = blast ? T_ACC + .02 + .06 * h1 : T_ACC + .12 + 1.6 * Math.sqrt(h1), a = t - born; if (a < 0) continue;
      const v = blast ? 2400 + 1000 * h2 : 700 + 600 * h2;
      const x = GX0 + 40 + 300 * h3 - v * a - 120 * a * a;
      const y = (back ? 240 + 540 * h4 : 850 + 200 * h4) + (blast ? 30 : 60) * Math.sin(a * (3 + 3 * h2) + id) - (back ? 0 : 40 * Math.abs(Math.sin(a * 5 + id)));
      if (!vis(x - 90, x + 90)) continue;
      const w = 44 + 44 * h2, h = 30 + 30 * h3, fl = Math.cos(a * (8 + 6 * h3) + id);
      push(); translate(x, y); rotate(a * (5 + 7 * h1) * (h4 < .5 ? 1 : -1) + id); scale(blast ? 1.3 : 1, (.25 + .75 * Math.abs(fl)) * (blast ? .7 : 1));
      boilSeed('c2 scrap' + id);
      paint(rectPts(-w / 2, -h / 2, w, h, 1.5), { wash: ['#F8F3E6', '#F1EAD8', '#FBF8F0', '#EDE4D0'][id % 4], ink: PAL.ink, sw: .55 });
      if (id % 3 === 0) for (let k = 0; k < 3; k++) inkLine([[-w * .32, -h * .25 + k * h * .25], [w * .32, -h * .25 + k * h * .25]], .4, '#B8AE98', 'inkfine', 0);
      pop();
      if (blast && a < .5) { boilSeed('c2 streak' + id); inkLine([[x + 30, y], [x + 30 + 220 * (1 - a * 2), y + 4]], 1.2, '#D8CCB0', 'dry', 0); }
    }
  }

  // ---------- the fly ----------
  // world path: buzzing round THE Horse's head, diving down-left to Oppa, landing on his lens on the bar-13 downbeat,
  // riding his shades through the wobble, flung off by the shake and buzzing away up-left
  const T_FLY0 = 26.2, T_DIVE = 26.8, T_OFFLY = T_BLAST;
  // Catmull-Rom through time-keyed points [[t, [x, y]], ...]
  function crPath(keys, t) {
    let i = 0; while (i + 2 < keys.length && t >= keys[i + 1][0]) i++;
    const P = j => keys[clamp(j, 0, keys.length - 1)][1], u = clamp((t - keys[i][0]) / (keys[i + 1][0] - keys[i][0]));
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2), u2 = u * u, u3 = u2 * u;
    return [0, 1].map(d => .5 * (2 * p1[d] + (p2[d] - p0[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u2 + (3 * p1[d] - p0[d] - 3 * p2[d] + p3[d]) * u3));
  }
  function flyOrbit(t) {   // round and round THE Horse's head, right past its (unblinking) eye
    const c = theHorsePt(t, 2.0, -.3), w = (t - T_FLY0) * 8.5, k = easeOut(seg(t, T_FLY0, T_FLY0 + .22));
    const orb = [c[0] + 78 * Math.cos(w) + 16 * Math.sin(w * 2.7), c[1] - 16 + 52 * Math.sin(w * 1.3) + 10 * Math.cos(w * 3.1)];
    return [lerp(c[0] + 240, orb[0], k), lerp(c[1] - 170, orb[1], k)];
  }
  let _flyKeys = null;
  function flyKeys() {   // the dive from the Horse to Oppa's lens (fixed: both ends are pure functions of time)
    if (_flyKeys) return _flyKeys;
    const L = lensPt(T_LAND), h = theHorsePt(T_DIVE, 2.4, 0);
    return (_flyKeys = [[T_DIVE - .05, flyOrbit(T_DIVE - .05)], [T_DIVE, flyOrbit(T_DIVE)], [26.93, [h[0] - 70, h[1] + 170]],
      [27.08, [L[0] + 95, L[1] - 150]], [27.2, [L[0] - 115, L[1] - 105]], [27.33, [L[0] - 30, L[1] - 70]], [T_LAND, [L[0] - 2, L[1] - 14]], [T_LAND + .1, [L[0] - 2, L[1] - 14]]]);
  }
  function flyAt(t) {
    if (t < T_FLY0 || t > T_OFFLY + .8) return null;
    if (t < T_DIVE) { const p = flyOrbit(t), q = flyOrbit(t - .02); return { p, landed: false, dir: p[0] < q[0] ? -1 : 1 }; }
    if (t < T_LAND) { const p = crPath(flyKeys(), t), q = crPath(flyKeys(), t - .02); return { p, landed: false, dir: p[0] < q[0] - .5 ? -1 : 1 }; }
    if (t < T_OFFLY) { const l = lensPt(t); return { p: [l[0] - 2, l[1] - 14], landed: true, dir: -1 }; }
    const k = t - T_OFFLY, l = lensPt(T_OFFLY);   // blown away by the blast, tumbling
    return { p: [l[0] - 1500 * k - 70 * Math.sin(k * 25), l[1] - 14 - 260 * k + 50 * Math.sin(k * 17)], landed: false, dir: Math.sin(k * 40) > 0 ? 1 : -1 };
  }
  function drawFly(t) {
    const F = flyAt(t); if (!F) return;
    const [x, y] = F.p, s = 8, d = F.dir;
    if (!F.landed) {   // the buzz trail: dashes along where it just was
      boilSeed('c2 flytrail');
      for (let i = 1; i < 7; i++) { const A = flyAt(t - i * .03), B = flyAt(t - i * .03 - .015); if (!A || !B || A.landed) break; inkLine([A.p, B.p], .9, mixCol(PAL.ink, PAL.paper, .35), 'inkfine', 0); }
    }
    boilSeed('c2 fly');
    const flap = F.landed ? 0 : Math.floor(t * 48) % 2;
    for (const side of [-1, 1]) {   // wings: a buzzing blur in flight, folded back when it lands
      const ang = F.landed ? -d * (.35 + .12 * side) : (flap ? -1.25 : -.45) + side * .25;
      push(); translate(x - d * .2 * s, y - .5 * s); rotate(F.landed ? ang : ang * (d < 0 ? -1 : 1)); paint(ellPts(0, -1 * s, .55 * s, 1.15 * s, 10), { wash: '#EEF6F4', washOp: 210, ink: PAL.ink, sw: .45 }); pop();
    }
    paint(ellPts(x, y, 1.25 * s, .8 * s, 12), { wash: '#4E8068', fill: '#2E5A48', fillOp: 90, ink: PAL.ink, sw: .6 });
    paint(ellPts(x + d * 1.2 * s, y - .1 * s, .62 * s, .6 * s, 10), { wash: '#3A4A44', ink: PAL.ink, sw: .5 });
    paint(ellPts(x + d * 1.45 * s, y - .3 * s, .3 * s, .3 * s, 8), { wash: '#C84A3E', ink: null });
    if (F.landed) {   // rubbing its front legs together
      const r = Math.sin(t * 26) * .25 * s;
      inkLine([[x + d * 1.3 * s, y + .4 * s], [x + d * 1.9 * s + r, y + .9 * s]], .6, PAL.ink, 'inkfine', 0);
      inkLine([[x + d * 1.1 * s, y + .5 * s], [x + d * 1.8 * s - r, y + 1.0 * s]], .6, PAL.ink, 'inkfine', 0);
    }
  }

  // ---------- the world and the cast ----------
  function drawCast(t) {
    const K = kidPose(t); if (K) member('kid', K.x, K.y, K.u, K.o);
    const P = oppaPose(t); member('oppa', P.x, P.y, P.u, P.o);
  }
  function world(t) {
    stable(t, { horses: [], hooks: {
      back: () => { stallHorses(t); stallFronts(); hay(t); farDoor(t); if (t > T_ACC) scraps(t, 'back'); },
      mid: () => { drawCast(t); drawFly(t); if (t > T_ACC) scraps(t, 'front'); }
    } });
  }
  const dolly = (t, k) => [0, 1].map(i => 3 * Math.sin(t * (1.1 + i * .4) + i * 2));   // a living camera: tiny drift

  // ---------- SHOT 1: the strut (16.545 → 22.000) ----------
  function sStrut(t) {
    const k = ease(seg(t, T_DEC - .1, T_TAKE + .1)), [jx, jy] = dolly(t);
    const cx = lerp(oppaX(t) + 120, 2030, k) + jx, cy = lerp(575, 560, k) + jy, z = lerp(1.15, 1.2, k) + .03 * seg(t, T_TAKE, T_DANCE);
    camBegin(cx, cy, z); world(t); camEnd();
    counterHUD(t);
  }
  // ---------- SHOT 2a: the gallop at the Horse, the ta-da (22.000 → 26.091) ----------
  const TWO = [2030, 628, 1.42];
  function sDance(t) {
    const [jx, jy] = dolly(t), z = TWO[2] + .07 * ease(seg(t, T_DANCE, T_CU));
    camBegin(TWO[0] + jx, TWO[1] + jy, z); world(t); camEnd();
    counterHUD(t);
  }
  // ---------- SHOT 2b: CRASH ZOOM on the Horse: chew, chew (26.091 → 27.000) ----------
  function sHorseCU(t) {
    const hc = theHorsePt(T_CU, 2.4, .2), k = easeOut(seg(t, T_CU, T_CU + .13)), [sx, sy] = t < T_CU + .3 ? shakeXY(t, 5 * (1 - seg(t, T_CU + .13, T_CU + .3))) : [0, 0];
    const z = lerp(TWO[2] + .07, 4.1, k) + .15 * seg(t, T_CU + .13, T_BACK);
    camBegin(lerp(TWO[0], hc[0] - 25, k) + sx / z, lerp(TWO[1], hc[1] + 22, k) + sy / z, z); world(t); camEnd();
    if (k < .98) speedLines(W / 2, H / 2 - 60, 420, 1200, 26, PAL.cream, 3, 2.2 * (1 - k));
    counterHUD(t);
  }
  // ---------- SHOT 2c: the fly, the wobble, the Kid hides (27.000 → 29.273) ----------
  function sWobble(t) {
    const [jx, jy] = dolly(t), z = 1.6 + .1 * ease(seg(t, T_BACK, T_ACC));
    camBegin(2000 + jx, 668 + jy, z); world(t); camEnd();
    counterHUD(t);
  }
  // ---------- SHOT 3: the accent: finger guns, then off into the paper storm (29.273 → 31.091) ----------
  function sAccent(t) {
    const [jx, jy] = dolly(t), follow = oppaX(t) - OX, [bx, by] = t < T_ACC + .35 ? shakeXY(t, 7 * (1 - seg(t, T_ACC, T_ACC + .35))) : [0, 0];
    camBegin(2300 + .85 * follow + jx + bx, 610 + jy + by, 1.3 + .03 * seg(t, T_ACC, T_END)); world(t); camEnd();
    counterHUD(t);
    if (t > T_WIPE) paperWipe((t - (31.091 - .45)) / .9, 7);
  }

  // TEMP profiling loop
  LOOPS.c2_prof = lt => {
    const t = 19.2, mode = Math.floor(lt);
    camBegin(oppaX(t) + 150, 612, 1);
    stable(t, { horses: [], hooks: {
      back: () => { if (mode >= 1) stallHorses(t); if (mode >= 2) stallFronts(); if (mode >= 3) { hay(t); farDoor(t); } },
      mid: () => { if (mode >= 4) drawCast(t); }
    } });
    camEnd(); if (mode >= 5) counterHUD(t);
  };
  LOOPS.c2_prof.len = 6;
  LOOPS.c2_rot = lt => {
    const t = 21.8;
    camBegin(lt < 1 ? 1500 : 0, 480, 1.25);
    stable(t, { horses: [], hooks: {
      back: () => {
        const rots = [.12, .2, .28, .36];
        rots.forEach((r, i) => {
          const k = 2 + i, xc = stallX(k) + 140, o = { coat: 'grey', flip: true, rot: r, headDown: .1 };
          const c = horseHeadPt(0, 0, PS, o, 2.6, 0);
          horse(xc - c[0], 385 - c[1], PS, t, { ...o, boilKey: 'r' + i });
          const o2 = { coat: 'bay', flip: false, rot: -r, headDown: .1 }, c2 = horseHeadPt(0, 0, PS, o2, 2.6, 0);
          horse(stallX(k - 5) + 140 - c2[0], 385 - c2[1], PS, t, { ...o2, boilKey: 'q' + i });
        });
        horse(stallX(7) + 140, 460 + 14.6 * PS, PS, t, { view: 'up', coat: 'black', boilKey: 'up' });
        stallFronts();
      } } });
    camEnd();
  };
  LOOPS.c2_rot.len = 2;
  shots([[T0, sStrut], [T_DANCE, sDance], [T_CU, sHorseCU], [T_BACK, sWobble], [T_ACC, sAccent]]);
})();
