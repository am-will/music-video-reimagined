// sheets_pc.js: model sheets for this video (reference only; labels are fine here). Render with e.g.
//   node render.mjs --loop=band --sheet=1 --cols=1 --w=1920 --out=out/check/band.jpg
(() => {
  const label = (txt, x, y, size = 20) => letter(txt, x, y, size, PAL.ink, { ink: false, alpha: .8 });
  const floorLine = y => inkLine([[40, y + 6], [W / 2, y + 4], [W - 40, y + 7]], .6, mixCol(PAL.paper, PAL.ink, .35), 'inkfine', .5);

  // the band, front view, big, with the Ink doubles underneath
  LOOPS.band = t => {
    MEMBERS.forEach((m, i) => {
      const x = 170 + i * 316;
      member(m, x, 470, 22, { ...mfeel(m, 'happy', t, { seed: i }), ...(m === 'chester' ? singing(t, 'belt') : m === 'mike' ? singing(t, 'rap') : {}) });
      label(m, x, 510, 24);
      inkling(x, 930, 18, { of: m, grin: i % 2 ? 1 : 0, red: i === 0 ? 1 : 0, seed: i });
    });
    floorLine(470); floorLine(930);
  };
  LOOPS.band.len = 4;

  // each member in the five key views
  LOOPS.turns = t => {
    const views = ['front', 'q', 'side', 'qback', 'back'];
    MEMBERS.forEach((m, r) => views.forEach((v, c) => {
      const x = 190 + c * 380, y = 160 + r * 178;
      member(m, x, y, 13, { ...mfeel(m, 'neutral', t, { seed: r * 5 + c }), view: v });
    }));
  };
  LOOPS.turns.len = 4;

  // close-ups: Chester screaming, Mike rapping, the Ink grinning
  LOOPS.faces = t => {
    member('chester', 330, 900, 55, { ...mfeel('chester', 'angry', t), lid: .55, mouth: null, eyes: 'angry', aL: 1.2, aR: .9 });
    member('mike', 960, 900, 55, { ...mfeel('mike', 'determined', t), mouth: 'belt', aR: 1.3, aL: .4 });
    inkling(1590, 900, 55, { of: 'chester', grin: 1, lid: .45, red: 1, mouth: null });
  };
  LOOPS.faces.len = 2;

  // the parlor, wide, with the whole band playing
  LOOPS.parlor = t => {   // RECIPE: the standard wide performance shot
    camBegin(1720, 560, .82);
    parlor(t, { drums: drumHits(t), hooks: bandHooks(t, { style: { mike: 'rap', chester: 'belt' } }) });
    camEnd();
  };
  LOOPS.parlor.len = 4;

  // RECIPES: reference shots for chapter builders (look at them rendered: node render.mjs --loop=r_shadows ...)
  LOOPS.r_shadows = t => {   // the frontmen throw big lamp shadows over the wall and couch; Mike's shadow wakes up
    camBegin(1900, 620, 1.25);
    const pm = { ...mfeel('mike', 'suspicious', t), aR: 1.1 }, pc = { ...mfeel('chester', 'nervous', t) };
    parlor(t, { hooks: {
      floor: () => {   // shadows first (over the furniture behind them), then the people
        wallShadow('mike', 1620, 968, 24, pm, { k: 1.5, dx: -200, wallY: 700, eyes: seg(t, .5, .9), grin: seg(t, 1.2, 1.6) });
        wallShadow('chester', 2180, 972, 24, pc, { k: 1.5, dx: 210, wallY: 700 });
        member('mike', 1620, 968, 24, pm); member('chester', 2180, 972, 24, pc);
      }
    } });
    camEnd();
  };
  LOOPS.r_shadows.len = 2;
  LOOPS.r_slit = t => {      // a papercut slit in the wall opens on the ink side; Chester in front of it
    paintLayer('ink', () => { camBegin(1900, 560, 1.1); inkSide(t, { hooks: { wall: () => bigFace(1900, 420, 16, t, { grin: 1, lookX: -.4 }) } }); camEnd(); });
    camBegin(1900, 560, 1.1);
    const a = [1250, 140], b = [1720, 90], w = 60 * ease(seg(t, .2, 1.2));
    parlor(t, { hooks: {
      wall: () => { showLayer('ink', [toScreenPts(slitPts(a, b, w))], { feather: 1 }); slitEdges(a, b, w); },   // slitEdges takes WORLD points inside a camera
      floor: () => member('chester', 1900, 980, 28, { ...mfeel('chester', 'scared', t), view: 'qback', mic: false })
    } });
    camEnd();
  };
  LOOPS.r_slit.len = 2;
  LOOPS.r_dark = t => {      // blackout: one lamp keeps a pool of light around the huddled band; eyes in the dark
    camBegin(1800, 640, 1);
    parlor(t, { lamps: { a: 0, b: 1, desk: 0, sconce: 0 }, dark: .72, eyes: (i, j) => ({ open: seg(t, .2 + hash(i * 9 + j) * 1.2, .5 + hash(i * 9 + j) * 1.2), lookX: .3 }), hooks: {
      floor: () => ['mike', 'chester', 'brad'].forEach((m, i) => member(m, 2150 + (i - 1) * 190, 980, 18, { ...mfeel(m, 'scared', t, { seed: i }), mic: false, inst: false }))
    }, lights: [[2150, 900, 600, 1]] });
    camEnd();
  };
  LOOPS.r_dark.len = 2;
  LOOPS.empty = t => { camBegin(1720, 560, .82); parlor(t, {}); camEnd(); };
  LOOPS.empty.len = 2;
  LOOPS.inkside = t => {
    camBegin(1720, 560, .82);
    inkSide(t, { hooks: { floor: () => { inkling(1500, 960, 20, { of: 'mike', grin: 1 }); inkling(2100, 960, 20, { of: 'chester', red: 1 }); } } });
    camEnd();
  };
  LOOPS.inkside.len = 4;

  // layers: a slit and a tear showing the ink side; shadows; the Face; the portrait stages; the dragonfly
  LOOPS.fx = t => {
    paintLayer('ink', () => { camBegin(1500, 540, 1); inkSide(t); camEnd(); });
    camBegin(1500, 540, 1);
    parlor(t, { hooks: { wall: () => {
      const polys = silPolys('mike', 1100, 960, 22, { aR: 1.2 }).map(P => P.map(([x, y]) => [x - 180 + (960 - y) * -.1, 780 - (960 - y) * 1.15]));
      castShadow(toScreenPts2(polys), { alpha: .55, blur: 5 });
    }, floor: () => member('mike', 1100, 960, 22, { ...mfeel('mike', 'suspicious', t), aR: 1.2 }) } });
    const a = [1500, 200], b = [2000, 420];
    showLayer('ink', [toScreenPts(slitPts(a, b, 60))]);
    slitEdges(a, b, 60);   // world points: we're inside the camera
    camEnd();
    const line = tearLine([1500, -20], [1250, 1100], 3, 26);
    showLayer('ink', [sidePoly(line, [[-60, 1150], [-60, -60]])]);
    tearEdge(line);
  };
  LOOPS.fx.len = 3;
  const toScreenPts2 = polys => polys.map(P => toScreenPts(P));

  LOOPS.props = t => {
    paint(rectPts(0, 0, W, H), { wash: '#2A2238', ink: null });
    bigFace(420, 420, 22, t, { grin: 1, scream: .5 + .5 * Math.sin(t * 3), red: .6 });
    ['stern', 'look', 'grin', 'bleed', 'ink'].forEach((st, i) => portrait(980 + i * 190, 300, .5, t, { stage: st, lookX: .8 }));
    dragonfly(1200, 800, 1.2, t, { rot: -.2 });
    for (let i = 0; i < 6; i++) inkAnt(1500 + i * 50, 850, 1.3, t, 0);
    for (let i = 0; i < 4; i++) damask(1560 + i * 90, 700, false, i / 3, { lookX: .8 });
    screamRings(700, 900, (t % 1.5), .5);
  };
  LOOPS.props.len = 3;
})();
