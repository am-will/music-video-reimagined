#!/usr/bin/env python3
"""Synthesise the few foley sounds that live in the video's silences and mix them under the song.

Everything is generated from noise and sine waves (no samples):
  - lamp clicks (the cold open's lamp flickering on, the ending's lamp clicking off)
  - a faint filament buzz while a lamp stutters
  - vinyl crackle while the tonearm hovers over the record, and a soft needle-drop thump
  - a propeller-plane drone flying past (a cold open over a sky), with Doppler and a pan
  - cartoon pops (a counter ticking over, things appearing), whooshes (spins, whips) and digital glitch noise
  - crickets, for a dusk or night silence (a place, not dead air)

Usage: python3 tools/sfx.py --song assets/papercut.wav --out assets/papercut_final.wav \
          --clicks 0.42,0.61,0.80 --buzz 0.40:1.0 --crackle 0.9:2.3 --drop 2.0 --offclick 191.2
       python3 tools/sfx.py --song assets/song.wav --out assets/song_final.wav \
          --drone 0:2.2 --whoosh 223.1:0.5,223.9 --pops 223.6,224.1 --glitch 225.35:225.9
Keep foley in the song's silences (the cold open, the tail); under the music it only muddies the mix.
"""
import argparse, subprocess, wave
import numpy as np

SR = 44100
rng = np.random.default_rng(7)


def read_wav(path):
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', path, '-ac', '2', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.int16).reshape(-1, 2).astype(np.float32) / 32768.0


def write_wav(path, x):
    y = np.clip(x, -1, 1)
    y = (y * 32767).astype(np.int16)
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes())


def env(n, attack, decay):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(attack, 1e-4)) * np.exp(-t / decay)


def click(level=0.35, bright=1.0):
    """A switch click: a tiny broadband snap plus a short low 'tock'."""
    n = int(0.06 * SR)
    snap = rng.standard_normal(n) * env(n, 0.0002, 0.0025 * bright)
    snap = np.diff(np.concatenate([[0], snap]))            # high-pass: crisper
    t = np.arange(n) / SR
    tock = np.sin(2 * np.pi * 1450 * t) * env(n, 0.0003, 0.006) * 0.5 + np.sin(2 * np.pi * 180 * t) * env(n, 0.001, 0.012) * 0.6
    s = snap * 0.9 + tock
    return level * s / (np.abs(s).max() + 1e-9)


def buzz(dur, level=0.02):
    n = int(dur * SR); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * 120 * t) + 0.5 * np.sin(2 * np.pi * 240 * t) + 0.25 * np.sin(2 * np.pi * 360 * t)
    flick = (rng.random(n // 200 + 1) > 0.35).astype(float).repeat(200)[:n]
    fade = np.minimum(1, t / 0.05) * np.minimum(1, (dur - t) / 0.08)
    return level * s * flick * fade


def crackle(dur, level=0.05):
    n = int(dur * SR); t = np.arange(n) / SR
    hiss = rng.standard_normal(n) * 0.08
    hiss = np.convolve(hiss, np.ones(6) / 6, 'same')     # soften
    pops = np.zeros(n)
    for i in np.flatnonzero(rng.random(n) < 22 / SR):     # ~22 pops a second
        k = min(n - i, 90)
        pops[i:i + k] += rng.choice([-1, 1]) * rng.uniform(0.3, 1.0) * np.exp(-np.arange(k) / 12)
    fade = np.minimum(1, t / 0.2) * np.minimum(1, (dur - t) / 0.05)
    return level * (hiss + pops) * fade


def thump(level=0.3):
    n = int(0.25 * SR); t = np.arange(n) / SR
    f = 70 * np.exp(-t * 6) + 40
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.07)
    return level * s


def drone(dur, level=0.17, f0=34.0, blades=3):
    """A small propeller plane flying past: a buzzy engine note with blade chop, rising then falling in pitch
    (Doppler), loudest at the middle of the pass."""
    n = int(dur * SR); t = np.arange(n) / SR; u = t / dur
    f = f0 * (1.06 - 0.12 * u)                                  # Doppler: slightly high coming in, low going away
    ph = 2 * np.pi * np.cumsum(f) / SR
    eng = sum(np.sin(k * ph) / k ** 0.8 for k in range(1, 12))  # a buzzy, sawtooth-like engine
    chop = 0.65 + 0.35 * np.sin(blades * ph)                    # the propeller blades
    air = np.convolve(rng.standard_normal(n), np.ones(24) / 24, 'same') * 0.6
    near = np.exp(-((u - 0.5) / 0.32) ** 2)                     # closest mid-pass
    fade = np.minimum(1, t / 0.15) * np.minimum(1, (dur - t) / 0.2)
    s = (eng * chop + air) * (0.25 + 0.75 * near) * fade
    return level * s / (np.abs(s).max() + 1e-9)


def pop(level=0.25, pitch=1.0):
    """A cartoon pop: a sine that sweeps up fast, with a tiny click on the front."""
    n = int(0.09 * SR); t = np.arange(n) / SR
    f = pitch * (380 + 1500 * (1 - np.exp(-t / 0.012)))
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.0008, 0.022)
    s[:40] += rng.standard_normal(40) * np.linspace(0.6, 0, 40)
    return level * s / (np.abs(s).max() + 1e-9)


def _sweep_filter(x, fc):
    """A resonant low-pass whose cutoff follows fc (Hz, one value per sample): a simple state-variable filter."""
    y = np.empty_like(x); lp = bp = 0.0; q = 0.35
    for i in range(len(x)):
        g = 2 * np.sin(np.pi * min(fc[i], SR / 6) / SR)
        hp = x[i] - lp - q * bp; bp += g * hp; lp += g * bp
        y[i] = lp + 0.5 * bp
    return y


def whoosh(dur=0.45, level=0.18, lo=300, hi=3200):
    """Air moving past: noise through a filter sweeping up then down, swelling and fading."""
    n = int(dur * SR); t = np.arange(n) / SR; u = t / dur
    fc = lo + (hi - lo) * np.sin(np.pi * u) ** 1.5
    s = _sweep_filter(rng.standard_normal(n), fc) * np.sin(np.pi * u) ** 1.2
    return level * s / (np.abs(s).max() + 1e-9)


def glitch(dur, level=0.14):
    """Digital breakage: gated bursts of bit-crushed noise, square-wave chirps and stuttered repeats."""
    n = int(dur * SR); out = np.zeros(n); i = 0
    while i < n:
        k = int(rng.uniform(0.012, 0.06) * SR); k = min(k, n - i); kind = rng.integers(3)
        t = np.arange(k) / SR
        if kind == 0:                                            # bit-crushed noise, sample-and-hold
            hold = int(rng.integers(6, 40))
            seg = np.repeat(rng.standard_normal(k // hold + 1), hold)[:k]
            seg = np.round(seg * 3) / 3
        elif kind == 1:                                          # a square chirp
            f = rng.uniform(300, 2400) * (1 + rng.uniform(-0.8, 2.0) * t / max(t[-1], 1e-3))
            seg = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.6
        else:                                                    # stutter: a tiny grain repeated
            g = rng.standard_normal(int(rng.integers(60, 400)))
            seg = np.tile(g, k // len(g) + 1)[:k] * 0.8
        out[i:i + k] = np.clip(seg, -1, 1) * (rng.random() > 0.2)
        i += k + int(rng.uniform(0, 0.02) * SR)
    fade = np.minimum(1, np.arange(n) / (0.005 * SR))
    return level * out * fade


def crickets(dur, level=0.06, n=3):
    """A few crickets, each chirping in bursts of 3-4 pulses at its own pitch and rhythm (stereo)."""
    m = int(dur * SR); out = np.zeros((m, 2)); t = np.arange(m) / SR
    for c in range(n):
        f = 4300 + 700 * c + 150 * rng.random(); pan = (c / max(1, n - 1) - .5) * 1.2; period = .42 + .2 * rng.random()
        k = rng.random() * period
        while k < dur:
            for p in range(int(rng.integers(3, 5))):                # one chirp: 3-4 pulses ~40 ms apart
                i0 = int((k + p * .04) * SR); L = int(.018 * SR)
                if i0 + L >= m: break
                tt = np.arange(L) / SR
                s = np.sin(2 * np.pi * f * tt) * np.sin(np.pi * tt / tt[-1]) ** 2
                out[i0:i0 + L, 0] += s * (1 - max(0, pan)); out[i0:i0 + L, 1] += s * (1 + min(0, pan))
            k += period * (.85 + .3 * rng.random())
    fade = np.minimum(1, t / .6) * np.minimum(1, (dur - t) / .4)
    return level * out * fade[:, None]


def place(mix, sig, t, pan=0.0):
    i = int(t * SR)
    if i >= len(mix): return
    k = min(len(sig), len(mix) - i)
    mix[i:i + k, 0] += sig[:k] * (1 - max(0, pan))
    mix[i:i + k, 1] += sig[:k] * (1 + min(0, pan))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--song', required=True); ap.add_argument('--out', required=True)
    ap.add_argument('--clicks', default=''); ap.add_argument('--buzz', default='')
    ap.add_argument('--crackle', default=''); ap.add_argument('--drop', type=float, default=None)
    ap.add_argument('--offclick', type=float, default=None)
    ap.add_argument('--softclicks', default='')
    ap.add_argument('--drone', default='', help='T0:T1[:PAN0:PAN1] a propeller plane passing (pans left to right by default)')
    ap.add_argument('--pops', default='', help='t,t,... cartoon pops')
    ap.add_argument('--whoosh', default='', help='t[:dur],... whooshes')
    ap.add_argument('--glitch', default='', help='T0:T1[,T0:T1...] digital glitch noise')
    ap.add_argument('--crickets', default='', help='T0:T1 crickets (a dusk or night silence)')
    a = ap.parse_args()
    song = read_wav(a.song)
    fx = np.zeros_like(song)
    for i, c in enumerate([float(v) for v in a.clicks.split(',') if v]):
        place(fx, click(0.22 if i else 0.3, 1 + 0.3 * i), c, pan=-0.15)
    if a.buzz:
        t0, t1 = map(float, a.buzz.split(':')); place(fx, buzz(t1 - t0), t0, pan=-0.15)
    if a.crackle:
        t0, t1 = map(float, a.crackle.split(':')); place(fx, crackle(t1 - t0), t0)
    if a.drop is not None:
        place(fx, thump(0.18), a.drop - 0.01); place(fx, crackle(0.35, 0.04), a.drop)
    for c in [float(v) for v in a.softclicks.split(',') if v]:
        place(fx, click(0.09, 0.7), c, pan=-0.2)
    if a.offclick is not None:
        place(fx, click(0.32, 1.2), a.offclick, pan=0.1)
    if a.drone:
        v = [float(x) for x in a.drone.split(':')]
        t0, t1 = v[0], v[1]; p0, p1 = (v[2], v[3]) if len(v) >= 4 else (-0.8, 0.8)
        sig = drone(t1 - t0); i0 = int(t0 * SR); k = min(len(sig), len(fx) - i0)
        pan = np.linspace(p0, p1, k)                                   # fly across the stereo field
        fx[i0:i0 + k, 0] += sig[:k] * np.minimum(1, 1 - pan)
        fx[i0:i0 + k, 1] += sig[:k] * np.minimum(1, 1 + pan)
    for i, c in enumerate([float(v) for v in a.pops.split(',') if v]):
        place(fx, pop(0.2, 1 + 0.12 * (i % 4)), c, pan=0.3 * np.sin(i * 2.1))
    for i, w in enumerate([w for w in a.whoosh.split(',') if w]):
        v = [float(x) for x in w.split(':')]
        place(fx, whoosh(v[1] if len(v) > 1 else 0.45), v[0], pan=0.4 * (-1) ** i)
    for g in [g for g in a.glitch.split(',') if g]:
        t0, t1 = map(float, g.split(':')); place(fx, glitch(t1 - t0), t0)
    if a.crickets:
        t0, t1 = map(float, a.crickets.split(':')); cr = crickets(t1 - t0); i0 = int(t0 * SR); k = min(len(cr), len(fx) - i0)
        fx[i0:i0 + k] += cr[:k]
    write_wav(a.out, song + fx)
    print('wrote', a.out, f'{len(song) / SR:.2f}s')


if __name__ == '__main__':
    main()
