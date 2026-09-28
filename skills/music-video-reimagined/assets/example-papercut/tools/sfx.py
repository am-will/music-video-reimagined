#!/usr/bin/env python3
"""Synthesise the few foley sounds that live in the video's silences and mix them under the song.

Everything is generated from noise and sine waves (no samples):
  - lamp clicks (the cold open's lamp flickering on, the ending's lamp clicking off)
  - a faint filament buzz while a lamp stutters
  - vinyl crackle while the tonearm hovers over the record, and a soft needle-drop thump

Usage: python3 tools/sfx.py --song assets/papercut.wav --out assets/papercut_final.wav \
          --clicks 0.42,0.61,0.80 --buzz 0.40:1.0 --crackle 0.9:2.3 --drop 2.0 --offclick 191.2
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
    write_wav(a.out, song + fx)
    print('wrote', a.out, f'{len(song) / SR:.2f}s')


if __name__ == '__main__':
    main()
