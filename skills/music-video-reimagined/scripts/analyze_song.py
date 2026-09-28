#!/usr/bin/env python3
"""analyze_song.py: map a song for animation.

Measures the tempo, a beat grid refined against sample-level attacks, bar lines, section boundaries (with repeat
labels), dropouts ("breaths" and band stops), the strongest hits, and where the music starts and stops.

Usage:
  python3 analyze_song.py INPUT [--out DIR] [--bpm-min 60] [--bpm-max 200] [--beats-per-bar 4]
  python3 analyze_song.py INPUT --check-first-hit 2.0     # verify a trimmed file: its first hit should land at 2.0 s

INPUT is any audio or video file ffmpeg can read. Every time in the output is in INPUT's own clock.
Writes into DIR (default ./song_map):
  analysis.json    the machine-readable map
  report.md        tables to read: tempo candidates, grid, per-bar energy, boundaries, segments, dropouts, hits
  spectrogram.png  log-frequency spectrogram in rows, bar lines and boundaries marked. LOOK at it: the texture changes
                   (band entries, sparse verses, breakdowns, sustained pads) are obvious to the eye.
  ssm.png          self-similarity of beat-synced features: repeated sections (choruses) show as bright blocks.
Needs numpy, Pillow and ffmpeg.

Why the refinement matters: spectral-flux onsets computed on 93 ms windows land early or late depending on the time
convention. On "Papercut" an unrefined grid put every beat 64 ms (1.5 frames) before the sound. This script times
frames at window centres AND re-measures the strongest attacks sample by sample, then shifts the grid by their median.
"""
import argparse, json, os, subprocess, sys
import numpy as np

SR, NFFT, HOP = 22050, 2048, 256
FR = SR / HOP


def decode(path, sr=SR):
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', path, '-vn', '-ac', '1', '-ar', str(sr), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()


def stft_mag(x):
    win = np.hanning(NFFT).astype(np.float32)
    n = 1 + (len(x) - NFFT) // HOP
    out = np.empty((n, NFFT // 2 + 1), np.float32)
    for s in range(0, n, 4096):
        e = min(n, s + 4096)
        idx = np.arange(NFFT)[None, :] + HOP * np.arange(s, e)[:, None]
        out[s:e] = np.abs(np.fft.rfft(x[idx] * win, axis=1))
    return out


def frame_t(i):   # frame index -> time of the window CENTRE
    return (np.asarray(i) * HOP + NFFT / 2) / SR


def t_frame(t):   # time -> nearest frame index
    return np.rint((np.asarray(t) * SR - NFFT / 2) / HOP).astype(int)


def db(v):
    return 10 * np.log10(np.maximum(v, 1e-12))


def block_db(x, t0, t1, blk):
    i0, i1 = max(0, int(t0 * SR)), min(len(x), int(t1 * SR))
    seg = x[i0:i1]; n = len(seg) // blk
    if n <= 0: return np.array([]), t0
    e = np.sqrt((seg[:n * blk].reshape(n, blk) ** 2).mean(1))
    return 20 * np.log10(e + 1e-9), i0 / SR


def attack_time(x, t_guess, win=0.07):
    """Precise attack near t_guess: the steepest rise of the 1 ms log-energy envelope (smoothed over 3 ms)."""
    blk = int(SR * 0.001); bd = blk / SR
    e, t0 = block_db(x, t_guess - win, t_guess + win, blk)
    if len(e) < 10: return None
    e = np.convolve(e, np.ones(3) / 3, 'same')
    rise = e[4:] - e[:-4]          # 4 ms rise
    i = int(np.argmax(rise))
    if rise[i] < 6: return None    # no clear attack
    return t0 + (i + 2) * bd


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('input'); ap.add_argument('--out', default='song_map')
    ap.add_argument('--bpm-min', type=float, default=60); ap.add_argument('--bpm-max', type=float, default=200)
    ap.add_argument('--beats-per-bar', type=int, default=4)
    ap.add_argument('--check-first-hit', type=float, default=None)
    a = ap.parse_args()

    x44 = decode(a.input, 44100)
    if a.check_first_hit is not None:   # quick verification of a trimmed file
        blk = 44; n = len(x44) // blk; bd = blk / 44100
        e = 20 * np.log10(np.sqrt((x44[:n * blk].reshape(n, blk) ** 2).mean(1)) + 1e-9)
        i = int(np.argmax(e > -18)); t = i * bd
        print(f'first strong sound (> -18 dBFS) at {t:.3f} s; expected {a.check_first_hit:.3f} s; '
              f'delta {1000 * (t - a.check_first_hit):+.0f} ms')
        return

    os.makedirs(a.out, exist_ok=True)
    x = decode(a.input); dur = len(x) / SR
    print(f'{a.input}: {dur:.2f} s')

    # ---- where the music is ----
    blk10 = int(SR * 0.01); bd = blk10 / SR               # ~10 ms blocks; bd is the EXACT block length (220/22050 s)
    lv, _ = block_db(x, 0, dur, blk10)
    loud = np.flatnonzero(lv > -40)
    first_sound = float(loud[0] * bd) if len(loud) else 0.0
    # the music ends where the last stretch of real music (1 s windows with median above -35 dBFS) falls below -50 dBFS
    med1 = np.array([np.median(lv[i:i + 100]) for i in range(0, max(1, len(lv) - 100), 10)])
    musical = np.flatnonzero(med1 > -35)
    j = min(len(lv) - 1, (musical[-1] * 10 + 100) if len(musical) else len(lv) - 1)
    while j < len(lv) - 1 and lv[j] > -50: j += 1       # ride out a tail that is still sounding
    while j > 0 and lv[j] < -50: j -= 1                  # step back out of the silence: j = the last block above -50
    last_i = j + 1
    last_sound = float(last_i * bd)
    before = lv[max(0, last_i - 12):max(1, last_i - 2)].max() if last_i > 2 else lv[0]   # the last ~100 ms of music
    after = lv[min(len(lv) - 1, last_i + 3)]
    ending = f'hard cut (drops {before - after:.0f} dB within ~50 ms)' if before - after > 35 else 'fade or decay'

    # ---- spectrum, onsets ----
    s0 = first_sound + min(8, 0.1 * (last_sound - first_sound)); s1 = last_sound - min(8, 0.1 * (last_sound - first_sound))
    X = stft_mag(x)
    freqs = np.fft.rfftfreq(NFFT, 1 / SR)
    L = np.log1p(1000 * X)
    flux = np.concatenate([[0], np.maximum(0, np.diff(L, axis=0)).sum(1)])
    onset = np.maximum(0, flux - np.convolve(flux, np.ones(16) / 16, 'same'))
    lowmask = (freqs >= 40) & (freqs < 150)
    lowflux = np.concatenate([[0], np.maximum(0, np.diff(np.log1p(1000 * X[:, lowmask]), axis=0)).sum(1)])
    env_max = np.maximum.reduce([np.roll(onset, k) for k in range(-2, 3)])   # tolerance of +-2 frames

    # kick band at 1 ms resolution: the most precise timing reference for anything with a kick drum
    Xf = np.fft.rfft(x); ff = np.fft.rfftfreq(len(x), 1 / SR); Xf[(ff < 35) | (ff > 110)] = 0
    kb = int(SR * 0.001); kbd = kb / SR; klo = np.fft.irfft(Xf, len(x)); kn = len(klo) // kb
    # 1 ms power, smoothed over a centred 5 ms window: a 50 Hz kick's |sin| envelope ripples every ~10 ms, and without
    # smoothing the phase search can lock onto a later ripple (+20-30 ms) instead of the attack
    kpow = np.convolve((klo[:kn * kb].reshape(kn, kb) ** 2).mean(1), np.ones(5) / 5, "same")
    kdb = 10 * np.log10(kpow + 1e-14)
    krise = np.zeros(kn); krise[5:] = np.maximum(0, kdb[5:] - kdb[:-5])       # 5 ms rise in dB
    del Xf, klo
    def kick_at(ts):   # strongest kick-band rise within +-3 ms of each time
        i = np.rint(np.asarray(ts) / kbd).astype(int); i = i[(i > 3) & (i < kn - 4)]
        return np.max(np.stack([krise[i + d] for d in range(-3, 4)]), 0) if len(i) else np.zeros(1)
    def kick_score(per_, ph_):
        k = np.arange(int(np.ceil((s0 - ph_) / per_)), int((s1 - ph_) / per_))
        return float(kick_at(ph_ + k * per_).mean())

    i0, i1 = t_frame(s0), t_frame(s1)

    # ---- tempo: autocorrelation of the onset envelope ----
    o = onset[i0:i1] - onset[i0:i1].mean()
    ac = np.correlate(o, o, 'full')[len(o) - 1:]
    def score(bpm):
        lag = 60 / bpm * FR; s = 0.0
        for k in (1, 2, 3, 4):
            q = lag * k; j = int(q); f = q - j
            if j + 1 < len(ac): s += ac[j] * (1 - f) + ac[j + 1] * f
        return s
    grid = np.arange(a.bpm_min, a.bpm_max, 0.05)
    sc = np.array([score(b) for b in grid])
    cands = []
    for i in np.argsort(-sc):
        if all(abs(grid[i] - c[0]) > 1.5 for c in cands): cands.append((float(grid[i]), float(sc[i])))
        if len(cands) >= 6: break

    # ---- pulse: fine BPM + phase search maximising onset strength on the grid ----
    def grid_strength(bpm, ph):
        per = 60 / bpm
        k0 = int(np.ceil((s0 - ph) / per)); k1 = int((s1 - ph) / per)
        idx = t_frame(ph + np.arange(k0, k1) * per)
        idx = idx[(idx >= 0) & (idx < len(env_max))]
        return env_max[idx].mean() if len(idx) else 0
    best = None
    for bpm0 in [c[0] for c in cands[:3]]:
        for bpm in np.arange(bpm0 - 0.6, bpm0 + 0.6, 0.01):
            per = 60 / bpm
            for ph in np.arange(0, per, 0.004):
                v = grid_strength(bpm, ph)
                if best is None or v > best[0]: best = (v, bpm, ph)
    _, pulse_bpm, ph = best
    per = 60 / pulse_bpm

    # ---- beat level. Four-on-the-floor (a kick on nearly every beat of the DOUBLE tempo) means the pulse found above
    # is a half note, e.g. 66 for a 132 BPM dance track: use the double tempo. Otherwise, a fast pulse (> 130) that
    # alternates strong/weak is an eighth note in a half-time feel (Papercut: 150 -> 75).
    # Test: kicks as strong on the odd double-tempo beats as on the even ones (ratio), AND clearly stronger than the
    # low end halfway between them (contrast). A busy bass line (rock, hip-hop) fails the contrast test:
    # Gangnam Style ratio .97 / contrast 1.70 (four-on-the-floor); Papercut .96 / 1.10 (not).
    h_ = per / 2
    best_off = max(((kick_score(h_, ph + o), o) for o in np.arange(-0.06, 0.06, 0.001)), default=(0, 0))[1]
    kk_ = np.arange(int(np.ceil((s0 - ph - best_off) / h_)), int((s1 - ph - best_off) / h_)); tt_ = ph + best_off + kk_ * h_
    vv_ = kick_at(tt_); fe = float(vv_[kk_ % 2 == 0].mean()); fo = float(vv_[kk_ % 2 == 1].mean())
    between = max(float(kick_at(tt_ + h_ / 2).mean()), float(kick_at(tt_ + h_ / 4).mean()))
    eo_ratio = min(fe, fo) / max(fe, fo, 1e-9); contrast = min(fe, fo) / max(between, 1e-9)
    four = pulse_bpm * 2 <= 190 and eo_ratio > .8 and contrast > 1.4
    def parity(p0):
        t = ph + p0 * per + np.arange(int(np.ceil((s0 - ph) / (2 * per))), int((s1 - ph) / (2 * per))) * 2 * per
        return env_max[np.clip(t_frame(t), 0, len(env_max) - 1)].mean()
    pe, po = parity(0), parity(1)
    ratio = max(pe, po) / max(1e-9, min(pe, po))
    if four:
        beat = per / 2; beat_ph = ph + best_off; level = f'four-on-the-floor: beat = double the pulse (kick ratio {eo_ratio:.2f}, contrast {contrast:.2f})'
    elif pulse_bpm > 130 and ratio > 1.08:
        beat = 2 * per; beat_ph = ph + (0 if pe >= po else per); level = 'half-time: 1 beat = 2 pulses'
    else:
        beat = per; beat_ph = ph; level = 'beat = pulse'
    beat_bpm = 60 / beat

    # ---- refine the phase. First choice: align the grid with kick-drum transients (1 ms resolution, robust even in
    # dense mixes). Fallback when there's no steady kick: the median offset of sample-level broadband attacks.
    offs_k = np.arange(-0.045, 0.0451, 0.0005)
    ksc = np.array([kick_score(beat, beat_ph + o) for o in offs_k])
    kbest = float(offs_k[int(np.argmax(ksc))]); kpeak = float(ksc.max()); khalf = kick_score(beat, beat_ph + kbest + beat / 2)
    if kpeak > 1.5 * khalf and kpeak > 3:   # a steady kick on the beats (not just a busy low end)
        corr = kbest; mad = 0.0; method = f'kick-drum alignment (on-beat {kpeak:.1f} dB vs off-beat {khalf:.1f})'; offs = []
    else:
        ks = np.arange(int(np.ceil((s0 - beat_ph) / beat)), int((s1 - beat_ph) / beat))
        gts = beat_ph + ks * beat
        strength = env_max[np.clip(t_frame(gts), 0, len(env_max) - 1)]
        top = gts[np.argsort(-strength)[:60]]
        offs = [at - g for g in top if (at := attack_time(x, g)) is not None]
        corr = float(np.median(offs)) if len(offs) >= 8 else 0.0
        mad = float(np.median(np.abs(np.array(offs) - corr))) if len(offs) >= 8 else 0.0
        method = f'broadband attacks ({len(offs)} used, MAD {mad * 1000:.0f} ms)'
    beat_ph = beat_ph + corr; ph = beat_ph; per = beat

    # ---- drift: best local phase offset per 20 s window (should stay within a frame) ----
    drift = []
    use_kick = method.startswith('kick')
    for w0 in np.arange(s0, s1, 20):
        o_range = np.arange(-0.04, 0.0401, 0.002 if use_kick else 0.005)
        kk = np.arange(int(np.ceil((w0 - beat_ph) / beat)), int((min(w0 + 20, s1) - beat_ph) / beat))
        if len(kk) < 4: continue
        if use_kick: v = [kick_at(beat_ph + o2 + kk * beat).mean() for o2 in o_range]
        else: v = [np.mean(env_max[np.clip(t_frame(beat_ph + o2 + kk * beat), 0, len(env_max) - 1)]) for o2 in o_range]
        drift.append((round(float(w0), 1), round(float(o_range[int(np.argmax(v))]) * 1000)))

    # ---- beat-synchronous features and section novelty ----
    nb = int((last_sound - beat_ph) / beat)
    b_start = int(np.ceil((first_sound - beat_ph) / beat - 1e-6))
    beats_t = beat_ph + np.arange(b_start, nb) * beat
    edges = np.geomspace(60, 8000, 41); ei = np.searchsorted(freqs, edges)
    bands = np.stack([X[:, ei[i]:max(ei[i] + 1, ei[i + 1])].mean(1) for i in range(40)], 1)
    Lb = np.log1p(100 * bands)
    valid = (freqs > 80) & (freqs < 2000)
    pc = (np.round(12 * np.log2(freqs[valid] / 440)) % 12).astype(int)
    Xv = X[:, valid]; chroma = np.stack([Xv[:, pc == k].sum(1) for k in range(12)], 1)
    def bsync(F):
        rows = []
        for t in beats_t:
            a_, b_ = t_frame(t), t_frame(t + beat)
            rows.append(F[max(0, a_):max(a_ + 1, b_)].mean(0))
        return np.array(rows)
    Bt, Bc = bsync(Lb), bsync(chroma)
    Bt = (Bt - Bt.mean(0)) / (Bt.std(0) + 1e-9)
    nz = lambda M: M / (np.linalg.norm(M, axis=1, keepdims=True) + 1e-9)
    Bt, Bc = nz(Bt), nz(Bc)
    ctx = lambda B: np.concatenate([np.roll(B, -i, 0) for i in (-2, -1, 0, 1)], 1)   # symmetric context: no early bias
    F = nz(np.concatenate([ctx(Bt), ctx(Bc)], 1))
    F = np.nan_to_num(F).astype(np.float64)
    with np.errstate(all='ignore'):
        S = np.nan_to_num(F @ F.T)
    lo, hi = np.percentile(S, 5), np.percentile(S, 99.5)
    S = np.clip((S - lo) / (hi - lo + 1e-9), 0, 1)
    K = 8; kern = np.block([[np.ones((K, K)), -np.ones((K, K))], [-np.ones((K, K)), np.ones((K, K))]])
    nov = np.zeros(len(S))
    for i in range(K, len(S) - K): nov[i] = (S[i - K:i + K, i - K:i + K] * kern).sum()
    thr = np.percentile(nov[K:len(S) - K], 70) if len(S) > 2 * K else 0
    peaks = [i for i in range(K, len(S) - K) if nov[i] == nov[max(0, i - 6):i + 7].max() and nov[i] > thr]

    # ---- dropouts: the low end falls away (breaths before choruses, band stops) ----
    lowE = X[:, (freqs >= 40) & (freqs < 150)].sum(1)
    lowdb = db(np.convolve(lowE ** 2, np.ones(6) / 6, 'same'))
    med = np.array([np.median(lowdb[max(0, i - int(3 * FR)):i + int(3 * FR)]) for i in range(0, len(lowdb), 4)]).repeat(4)[:len(lowdb)]
    gap = (lowdb < med - 15) & (frame_t(np.arange(len(lowdb))) > first_sound + 1) & (frame_t(np.arange(len(lowdb))) < last_sound - 1)
    drops, i = [], 0
    while i < len(gap):
        if gap[i]:
            jj = i
            while jj < len(gap) and gap[jj]: jj += 1
            t0, t1 = float(frame_t(i)), float(frame_t(jj))
            if t1 - t0 >= 0.2:
                drops.append({'t0': round(t0, 3), 't1': round(t1, 3)})
            i = jj
        else: i += 1

    # ---- bar phase: kick strength on candidate downbeats + section-boundary alignment + where the music comes back
    # after dropouts (a drop almost always lands on a downbeat, sometimes after a one-beat pickup) ----
    B = a.beats_per_bar
    lowmax = np.maximum.reduce([np.roll(lowflux, k) for k in range(-2, 3)])
    kick = [lowmax[np.clip(t_frame(beats_t[j::B]), 0, len(lowmax) - 1)].mean() for j in range(B)]
    align = [sum(nov[p] for p in peaks if (p - j) % B == 0) for j in range(B)]
    kn = np.array(kick) / (max(kick) + 1e-9); an = np.array(align) / (max(align) + 1e-9) if max(align) > 0 else np.zeros(B)
    dn = np.zeros(B)
    for d_ in drops:   # the first beat at/after the music returns (allowing a 1/4-beat early pickup)
        k_ = int(np.ceil((d_['t1'] - beats_t[0]) / beat - .25)) if len(beats_t) else 0
        for j_ in range(B):
            if (k_ - j_) % B == 0: dn[j_] += 1
            if (k_ + 1 - j_) % B == 0: dn[j_] += .5   # or one beat later
    dn = dn / (dn.max() + 1e-9) if dn.max() > 0 else dn
    bar_scores = .6 * kn + an + 1.2 * dn
    j = int(np.argmax(bar_scores))
    down0 = float(beats_t[j]); bar = beat * B
    k0 = int(np.floor((first_sound - down0) / bar + 1e-6))
    if down0 + k0 * bar < first_sound - 0.02: k0 += 1
    first_down = down0 + k0 * bar            # the first downbeat at or after the first sound: bar 0
    pickup_bar = first_down - bar if first_down - first_sound > 0.05 else None   # bar -1 holds a pickup
    nbars = int(np.ceil((last_sound - first_down) / bar))
    barT = lambda k: first_down + k * bar

    # ---- per-bar energies ----
    band = lambda lo_, hi_: X[:, (freqs >= lo_) & (freqs < hi_)].sum(1)
    tot, lowE, midE, hiE = X.sum(1), band(40, 150), band(300, 3000), band(5000, 11000)
    bars = []
    for k in range(-2, nbars + 1):
        t0, t1 = barT(k), barT(k + 1)
        if t1 <= 0 or t0 >= dur: continue
        a_, b_ = max(0, t_frame(t0)), min(len(tot), t_frame(t1))
        if b_ <= a_: continue
        f = lambda v: round(float(db(v[a_:b_].mean())), 1)
        bars.append({'bar': k, 't': round(t0, 3), 'rms_db': f(tot ** 2), 'low_db': f(lowE ** 2), 'mid_db': f(midE ** 2), 'high_db': f(hiE ** 2)})

    # ---- boundaries snapped to bars, and segments with repeat labels ----
    bounds = []
    for p in peaks:
        t = float(beats_t[p]); kb = int(round((t - first_down) / bar))
        bounds.append({'t_raw': round(t, 3), 'bar': kb, 't_bar': round(barT(kb), 3), 'strength': round(float(nov[p]), 1)})
    cut_bars = sorted(set([0] + [b['bar'] for b in bounds if 0 < b['bar'] < nbars] + [nbars]))
    segs, protos = [], []
    for s_, e_ in zip(cut_bars[:-1], cut_bars[1:]):
        bi = [i for i, t in enumerate(beats_t) if barT(s_) - 1e-3 <= t < barT(e_) - 1e-3]
        if not bi: continue
        v = nz(F[bi].mean(0, keepdims=True))[0]
        label = None
        for lab, pv in protos:
            if float(v @ pv) > 0.9: label = lab; break
        if label is None: label = chr(65 + len(protos)); protos.append((label, v))
        e = [b for b in bars if s_ <= b['bar'] < e_]
        segs.append({'bars': [s_, e_], 't0': round(barT(s_), 3), 't1': round(barT(e_), 3), 'label': label,
                     'rms_db': round(float(np.mean([b['rms_db'] for b in e])), 1) if e else None,
                     'mid_db': round(float(np.mean([b['mid_db'] for b in e])), 1) if e else None})

    for d_ in drops:
        pos = (d_['t0'] - first_down) / beat; d_['bar'] = int(pos // B); d_['beat_in_bar'] = round(pos % B, 2)
        pos1 = (d_['t1'] - first_down) / beat; d_['returns_bar'] = int(round(pos1 / B)) if abs(pos1 / B - round(pos1 / B)) < .2 else None

    # ---- the strongest hits (refined) ----
    z = (flux - flux.mean()) / (flux.std() + 1e-9)
    pk = [i for i in range(2, len(z) - 2) if z[i] == z[i - 2:i + 3].max() and z[i] > 2.5]
    pk = sorted(pk, key=lambda i: -z[i])[:24]
    hits = []
    for i in sorted(pk):
        t = float(frame_t(i)); at = attack_time(x, t, 0.05)
        t = at if at is not None else t
        pos = (t - first_down) / beat
        hits.append({'t': round(t, 3), 'z': round(float(z[i]), 1), 'bar': int(pos // B), 'beat_in_bar': round(pos % B, 2)})

    res = {'input': a.input, 'duration': round(dur, 3), 'first_sound': round(first_sound, 3), 'last_sound': round(last_sound, 3),
           'ending': ending, 'tempo_candidates_bpm': [round(c[0], 2) for c in cands],
           'pulse_bpm': round(pulse_bpm, 3), 'beat_bpm': round(beat_bpm, 3), 'beat_level': level, 'parity_ratio': round(float(ratio), 2),
           'beat_s': round(beat, 5), 'bar_s': round(bar, 5), 'beats_per_bar': B,
           'first_downbeat': round(first_down, 4), 'pickup_bar_start': round(pickup_bar, 4) if pickup_bar is not None else None, 'bar_phase_scores': [round(float(s), 2) for s in bar_scores],
           'grid_correction_ms': round(corr * 1000, 1), 'grid_method': method, 'four_on_the_floor': bool(four),
           'drift_ms_per_20s': drift, 'bars': bars, 'boundaries': bounds, 'segments': segs, 'dropouts': drops, 'hits': hits}
    with open(os.path.join(a.out, 'analysis.json'), 'w') as f: json.dump(res, f, indent=1)

    # ---- report.md ----
    R = [f'# Song map: {os.path.basename(a.input)}', '',
         f'- duration {dur:.2f} s; music from **{first_sound:.2f}** to **{last_sound:.2f}** s; ending: {ending}',
         f'- tempo candidates (BPM): {", ".join(str(round(c[0], 2)) for c in cands)}',
         f'- pulse **{pulse_bpm:.2f} BPM**; {level} → beat **{beat_bpm:.3f} BPM** ({beat:.4f} s), bar of {B} beats = **{bar:.4f} s**',
         f'- bar 0 (first downbeat) at **{first_down:.3f} s**; bar-phase scores {res["bar_phase_scores"]} (the chosen one is the max; if two are close, check the spectrogram: drops and section starts land on bar lines)',
         (f'- the music starts {first_down - first_sound:.3f} s BEFORE bar 0 (a pickup): bar -1 starts at **{pickup_bar:.3f} s**. To keep the pickup, place bar -1 (not bar 0) at the pre-roll when trimming.' if pickup_bar is not None else '- the music starts on bar 0 (no pickup)'),
         f'- grid phase refined by {method}: {corr * 1000:+.1f} ms',
         f'- drift check (window start, best offset in ms; should stay within ±20): {drift}', '',
         '## Segments (boundaries snapped to bars; same letter = similar material)', '', '| bars | t0 | t1 | label | rms dB | mid dB |', '|---|---|---|---|---|---|']
    R += [f'| {s["bars"][0]}–{s["bars"][1]} | {s["t0"]:.3f} | {s["t1"]:.3f} | {s["label"]} | {s["rms_db"]} | {s["mid_db"]} |' for s in segs]
    R += ['', '## Dropouts (low end falls away ≥15 dB for ≥0.2 s: breaths, stops)', '']
    R += [f'- {d["t0"]:.3f}–{d["t1"]:.3f} s (bar {d["bar"]}, beat {d["beat_in_bar"]})' + (f'; the music returns on bar {d["returns_bar"]}' if d.get('returns_bar') is not None else '') for d in drops] or ['- none']
    R += ['', '## Strongest hits (refined attacks)', '']
    R += [f'- {h["t"]:.3f} s (bar {h["bar"]}, beat {h["beat_in_bar"]}, z {h["z"]})' for h in hits]
    R += ['', '## Per-bar energy', '', '| bar | t | rms | low | mid | high |', '|---|---|---|---|---|---|']
    R += [f'| {b["bar"]} | {b["t"]:.3f} | {b["rms_db"]} | {b["low_db"]} | {b["mid_db"]} | {b["high_db"]} |' for b in bars]
    open(os.path.join(a.out, 'report.md'), 'w').write('\n'.join(R) + '\n')

    # ---- pictures ----
    try:
        from PIL import Image, ImageDraw, ImageFont
        try: font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 12)
        except Exception: font = ImageFont.load_default()
        ed = np.geomspace(40, 11000, 161); ej = np.searchsorted(freqs, ed)
        M = np.stack([X[:, ej[i]:max(ej[i] + 1, ej[i + 1])].mean(1) for i in range(160)], 1)
        D = 20 * np.log10(M + 1e-6)
        cols = int(dur * 20)                  # exactly 20 px per second (frames are FR = SR/HOP per second)
        edges_c = np.clip(t_frame(np.arange(cols + 1) / 20), 0, len(D))
        C = np.vstack([np.zeros((1, 160)), np.cumsum(D, 0)])
        D = np.stack([(C[b_] - C[a_]) / max(1, b_ - a_) for a_, b_ in zip(edges_c[:-1], np.maximum(edges_c[1:], edges_c[:-1] + 1))])
        lo_, hi_ = np.percentile(D, 5), np.percentile(D, 99.5); img = np.clip((D - lo_) / (hi_ - lo_), 0, 1)
        row_s = 50; rows = int(np.ceil(dur / row_s)); W_ = row_s * 20 + 60
        out = Image.new('RGB', (W_, rows * 184), (10, 10, 10)); d = ImageDraw.Draw(out)
        for r in range(rows):
            a0, y0 = r * row_s, r * 184 + 20
            seg = img[int(a0 * 20):int((a0 + row_s) * 20)]
            if not len(seg): continue
            arr = np.zeros((160, seg.shape[0], 3), np.uint8); V = seg.T[::-1]
            arr[:, :, 0] = (255 * np.clip(V * 1.6, 0, 1)); arr[:, :, 1] = (255 * np.clip(V * 1.6 - .4, 0, 1)); arr[:, :, 2] = (255 * np.clip(V * 2 - 1.2, 0, 1))
            out.paste(Image.fromarray(arr), (50, y0))
            for s_ in range(int(a0), int(a0 + row_s) + 1, 5):
                xx = 50 + (s_ - a0) * 20; d.text((xx - 8, y0 - 18), str(s_), fill=(220, 220, 220), font=font)
            k = int(np.floor((a0 - first_down) / bar))
            while barT(k) < a0 + row_s:
                tb = barT(k)
                if tb >= a0:
                    xx = 50 + int((tb - a0) * 20); c = (0, 255, 255) if k % 4 == 0 else (0, 110, 150)
                    d.line([xx, y0, xx, y0 + 160], fill=c); d.text((xx + 2, y0 + 146), str(k), fill=(0, 255, 255), font=font)
                k += 1
            for bnd in bounds:
                if a0 <= bnd['t_bar'] < a0 + row_s: xx = 50 + int((bnd['t_bar'] - a0) * 20); d.line([xx, y0, xx, y0 + 12], fill=(255, 40, 40), width=3)
            for dr in drops:
                if a0 <= dr['t0'] < a0 + row_s: xx = 50 + int((dr['t0'] - a0) * 20); d.rectangle([xx, y0 + 150, 50 + int((dr['t1'] - a0) * 20), y0 + 160], fill=(60, 120, 255))
        out.save(os.path.join(a.out, 'spectrogram.png'))
        sc_ = 3; n_ = len(S); im = Image.fromarray((255 * S).astype(np.uint8)).resize((n_ * sc_, n_ * sc_)).convert('RGB')
        out2 = Image.new('RGB', (n_ * sc_ + 40, n_ * sc_ + 40)); out2.paste(im, (40, 40)); d2 = ImageDraw.Draw(out2)
        for kb in range(0, nbars + 1, 2):
            tb = barT(kb); bi = int(round((tb - beats_t[0]) / beat)) if len(beats_t) else 0
            if 0 <= bi < n_:
                p_ = 40 + bi * sc_; d2.line([p_, 34, p_, 40], fill=(255, 60, 60)); d2.line([34, p_, 40, p_], fill=(255, 60, 60))
                if kb % 4 == 0: d2.text((p_ - 4, 2), str(kb), fill=(255, 255, 0), font=font); d2.text((2, p_ - 6), str(kb), fill=(255, 255, 0), font=font)
        out2.save(os.path.join(a.out, 'ssm.png'))
    except Exception as e:
        print('pictures skipped:', e)

    print(f'pulse {pulse_bpm:.2f} BPM ({level}); beat {beat_bpm:.3f} BPM; bar {bar:.4f} s; bar 0 at {first_down:.3f} s; '
          f'phase {corr * 1000:+.1f} ms by {method}')
    print(f'{len(segs)} segments, {len(drops)} dropouts, {len(hits)} hits → {a.out}/report.md, analysis.json, spectrogram.png, ssm.png')


if __name__ == '__main__':
    main()
