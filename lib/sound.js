// Tiny synthesised UI sounds — no audio files, no network requests.
// The AudioContext is only created after a real user gesture, so browsers
// never block it and the page stays silent until someone interacts.

const KEY = 'natesh-sfx';
let ctx = null;
let master = null;

export function isSoundOn() {
  if (typeof window === 'undefined') return false;
  try {
    const saved = localStorage.getItem(KEY);
    return saved === null ? true : saved === '1';
  } catch {
    return true;
  }
}

export function setSoundOn(on) {
  try {
    localStorage.setItem(KEY, on ? '1' : '0');
  } catch {
    /* Storage can be unavailable in private modes — sound still works. */
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sfx:change', { detail: { on } }));
  }
}

function audio() {
  if (typeof window === 'undefined') return null;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!ctx) {
    ctx = new Ctx();
    master = ctx.createGain();
    master.gain.value = 0.32;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

// A short, soft mechanical tick: filtered noise for texture plus a quick
// pitched blip. Kept quiet enough to feel premium rather than clicky.
export function playClick(kind = 'tap') {
  if (!isSoundOn()) return;
  const c = audio();
  if (!c || !master) return;

  const now = c.currentTime;
  const up = kind === 'on' || kind === 'like';
  const down = kind === 'off';
  const base = up ? 720 : down ? 520 : 860;

  // Noise transient.
  const len = Math.max(1, Math.floor(c.sampleRate * 0.045));
  const buffer = c.createBuffer(1, len, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const fade = 1 - i / len;
    data[i] = (Math.random() * 2 - 1) * fade * fade * fade;
  }
  const noise = c.createBufferSource();
  noise.buffer = buffer;
  const band = c.createBiquadFilter();
  band.type = 'bandpass';
  band.frequency.value = kind === 'off' ? 1500 : 2500;
  band.Q.value = 0.9;
  const nGain = c.createGain();
  nGain.gain.setValueAtTime(0.24, now);
  nGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
  noise.connect(band).connect(nGain).connect(master);
  noise.start(now);
  noise.stop(now + 0.06);

  // Pitched body.
  const osc = c.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(base, now);
  osc.frequency.exponentialRampToValueAtTime(down ? base * 0.68 : base * 0.62, now + 0.055);
  const oGain = c.createGain();
  oGain.gain.setValueAtTime(0.14, now);
  oGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
  osc.connect(oGain).connect(master);
  osc.start(now);
  osc.stop(now + 0.09);
}
