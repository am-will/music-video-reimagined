// config.js: project settings.
//   duration: the video's length in seconds.
//   bpm:      the song's quarter-note tempo (Papercut's half-time groove: 150.13 BPM eighths = 75.065 BPM quarters).
//   offset:   time of the first downbeat. The audio is trimmed so the song's first hit lands at t = 2.000.
const PROJECT = { duration: 192.4, bpm: 75.065, offset: 2.0, audio: 'assets/papercut.wav' };
