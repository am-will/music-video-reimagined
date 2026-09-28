// sheets_gs.js: model sheets and recipes for this video (labels are fine here: reference only).
(() => {
  const label = (txt, x, y, size = 20) => letter(txt, x, y, size, PAL.ink, { ink: false, alpha: .8 });
  const floorLine = y => inkLine([[40, y + 6], [W / 2, y + 4], [W - 40, y + 7]], .6, mixCol(PAL.paper, PAL.ink, .35), 'inkfine', .5);
  // every move in the library, on a plain Clawd
  LOOPS.moves = t => {
    MOVES.forEach((m, i) => {
      const x = 170 + (i % 5) * 395, y = 330 + Math.floor(i / 5) * 360;
      clawd(x, y, 17, { ...feel('happy', t, { seed: i }), ...dance(m, t) });
      label(m, x, y + 40, 24);
    });
    for (let r = 0; r < 3; r++) floorLine(330 + r * 360);
  };
  LOOPS.moves.len = BEAT * 4;

  // the cast, front view, with names
  LOOPS.cast = t => {
    const row1 = [['oppa', {}], ['oppa', { look: 'black' }], ['oppa', { look: 'white' }], ['oppa', { look: 'party' }], ['oppa', { look: 'beach' }], ['kid', {}], ['rival', {}], ['elev', {}]];
    row1.forEach(([n, o], i) => { const x = 130 + i * 237; member(n, x, 330, n === 'kid' ? 11 : 17, { ...mfeel(n, 'happy', t, { seed: i }), ...o }); label(n + (o.look ? ' ' + o.look : ''), x, 370, 20); });
    const row2 = [['pop', {}], ['dancer', { v: 0 }], ['dancer', { v: 1 }], ['dancer', { v: 2 }], ['granny', { v: 0 }], ['granny', { v: 1 }], ['grandpa', { v: 0 }], ['boss', {}]];
    row2.forEach(([n, o], i) => { const x = 130 + i * 237; member(n, x, 660, 17, { ...mfeel(n, 'happy', t, { seed: i + 9, v: o.v }), ...o }); label(n + (o.v != null ? ' ' + o.v : ''), x, 700, 20); });
    for (let i = 0; i < 12; i++) { const x = 90 + i * 158, n = i < 5 ? 'commuter' : 'crowd'; member(n, x, 960, 11, { ...mfeel(n, 'happy', t, { seed: i, v: i }), v: i }); }
    floorLine(330); floorLine(660); floorLine(960);
  };
  LOOPS.cast.len = 2;

  // the Horse: side (deadpan, looking at us, walking, grazing, shades, visor, towel), sitting, upright dancing
  LOOPS.horse = t => {
    horse(250, 420, 13, t, { mood: 'deadpan' }); label('side deadpan', 250, 460);
    horse(640, 420, 13, t, { mood: 'deadpan', look: 'camera', chew: 1 }); label('look camera + chew', 640, 460);
    horse(1030, 420, 13, t, { walk: t * 1.5, mood: 'annoyed', flip: true }); label('walk (flip) annoyed', 1030, 460);
    horse(1420, 420, 13, t, { headDown: 1, mood: 'deadpan' }); label('head down', 1420, 460);
    horse(1780, 420, 11, t, { shades: true, mood: 'smug' }); label('shades', 1780, 460);
    horse(250, 950, 13, t, { view: 'sit', visor: '#F07AA8' }); label('sit + visor', 250, 990);
    horse(640, 950, 13, t, { towel: true, mood: 'deadpan' }); label('towel', 640, 990);
    horse(1030, 980, 11, t, { view: 'up', mood: 'deadpan' }); label('upright', 1030, 1020);
    horse(1420, 980, 11, t, { view: 'up', shades: true, mood: 'joy', ...dance('gallop', t, { hand: GP.hoof }) }); label('upright gallop', 1420, 1020);
    horse(1780, 980, 11, t, { view: 'up', shades: true, mood: 'joy', ...dance('lasso', t, { hand: GP.hoof }) }); label('upright lasso', 1780, 1020);
    floorLine(420); floorLine(980);
  };
  LOOPS.horse.len = 2;

  // the dance on the cast: Oppa, the Kid, a Dancer and a Granny doing the moves
  LOOPS.castdance = t => {
    const ms = ['gallop', 'lasso', 'hipsway', 'disco', 'strut', 'pointup'];
    ms.forEach((m, i) => { const x = 170 + i * 316; dancer('oppa', x, 420, 20, m, t, { mood: 'cool' }); label(m, x, 460); });
    ms.forEach((m, i) => { const x = 170 + i * 316, n = ['kid', 'dancer', 'granny', 'rival', 'pop', 'boss'][i]; dancer(n, x, 900, n === 'kid' ? 13 : 18, 'gallop', t, { v: i, mood: 'excited' }); label(n + ' gallop', x, 940); });
    floorLine(420); floorLine(900);
  };
  LOOPS.castdance.len = BEAT * 4;

  // the counter at key film times (each row: its value at that time)
  LOOPS.counter = t => {
    paint(rectPts(0, 0, W, H), { wash: '#E8E0D0', ink: null });
    const ts = [8.5, 40, 67.2, 100, 148.9, 151.3, 190.5, 195.3, 195.8, 205, 218, 224, 226];
    ts.forEach((tt, i) => { const y = 50 + i * 80; viewCounter(tt + t * .001, { x: 800, y, h: 62 }); label(tt.toFixed(1) + 's', 1650, y, 24); });
  };
  LOOPS.counter.len = 1;
  // each shared set, wide, with a few dancers
  const setShot = (fn, cam, marks) => t => { camBegin(...cam); fn(t, { hooks: { mid: () => marks.forEach(([n, x, y, u, m], i) => dancer(n, x, y, u, m, t, { v: i, mood: 'happy' })) } }); camEnd(); counterHUD(40 + t); };
  LOOPS.s_playground = setShot(playground, STAGE.playground.wide, [['oppa', 1500, 820, 24, 'gallop'], ['kid', 1180, 860, 14, 'lasso']]);
  LOOPS.s_stable = setShot(stable, STAGE.stable.wide, [['oppa', 960, 900, 24, 'strut']]);
  LOOPS.s_arena = setShot(arena, STAGE.arena.wide, [['oppa', 1600, 960, 26, 'gallop'], ['dancer', 1300, 900, 20, 'gallop'], ['dancer', 1900, 900, 20, 'gallop']]);
  LOOPS.s_garage = setShot(garage, STAGE.garage.wide, [['oppa', 1600, 900, 24, 'strut'], ['rival', 2000, 900, 24, 'hairslick']]);
  LOOPS.s_subway = setShot(subway, STAGE.subway.wide, [['oppa', 1400, 900, 24, 'disco'], ['pop', 1750, 900, 22, 'hipsway']]);
  LOOPS.s_platform = setShot(platform, STAGE.platform.wide, [['oppa', 1500, 900, 22, 'gallop'], ['pop', 1750, 900, 20, 'gallop'], ['commuter', 1250, 900, 20, 'gallop']]);
  LOOPS.s_laser = setShot(laserHall, STAGE.laserHall.wide, [['oppa', 960, 900, 24, 'lasso'], ['pop', 1250, 900, 22, 'lasso'], ['crowd', 660, 880, 20, 'gallop']]);
  for (const k of ['s_playground', 's_stable', 's_arena', 's_garage', 's_subway', 's_platform', 's_laser']) LOOPS[k].len = 2;

  // RECIPE: the arena formation. Rows of White Dancers behind Oppa, all on the SAME routine (the chorus: 2 bars gallop,
  // 2 bars lasso) with small per-dancer variation (crowdVar), the riders and THE Horse (deadpan, not dancing) at the back.
  LOOPS.r_formation = t => {
    const tt = barT(36) + t, keys = [[barT(36), 'gallop'], [barT(38), 'lasso'], [barT(40), 'gallop'], [barT(42), 'lasso']];
    camBegin(1600, 640, .78);
    arena(tt, { hooks: {
      back: () => { horse(820, 815, 9, tt, { coat: 'bay', flip: true }); horse(2380, 815, 9, tt, { mood: 'deadpan', look: 'camera' }); },
      mid: () => {
        STAGE.arena.rows.forEach(([y, n, sp], r) => { for (let i = 0; i < n; i++) { const x = 1600 + (i - (n - 1) / 2) * sp * 1.25; if (r === 2 && Math.abs(x - 1600) < 150) continue; dancer('dancer', x, y, 13 + r * 2.5, keys, tt, { v: r * 9 + i, ...crowdVar(r * 9 + i), mood: 'happy', side: 1 }); } });
        dancer('oppa', 1600, 1040, 26, keys, tt, { look: 'black', mood: 'cool' });
      } } });
    camEnd(); counterHUD(tt);
  };
  LOOPS.r_formation.len = BAR * 4;
  // RECIPE: the glitch (the overflow). GLITCH = k for the frame, the counter in red.
  LOOPS.r_glitch = t => {
    const tt = 195.6 + t * .3;
    camBegin(...STAGE.platform.wide); platform(tt, { hooks: { mid: () => [0, 1, 2].forEach(i => dancer('commuter', 1300 + i * 200, 900, 20, 'gallop', tt, { v: i, mood: 'surprised' })) } }); camEnd();
    viewCounter(tt, { x: W / 2, y: 300, h: 150, glitch: .6 + .4 * Math.sin(t * 9) });
  };
  LOOPS.r_glitch.len = 1;
})();
LOOPS.r_paperwipe = t => { if (t < .5) { camBegin(...STAGE.stable.wide); stable(t); camEnd(); } else { camBegin(1500, 560, .75); playground(t); camEnd(); } paperWipe(t, 7); };
LOOPS.r_paperwipe.len = 1;
