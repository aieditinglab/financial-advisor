// Lush ambient pad for the Shape Yourself ad.
// Pure Web Audio — no external audio assets needed, works in every browser.

type AudioContextCtor = typeof AudioContext;

declare global {
  interface Window {
    webkitAudioContext?: AudioContextCtor;
  }
}

const CHORD_HZ = [
  // C minor 9-ish, voiced low and open for a calm cinematic pad.
  // C2, G2, Eb3, G3, Bb3, D4 — soft, modern, luxurious.
  65.41, 98.0, 155.56, 196.0, 233.08, 293.66,
];

export interface AmbienceHandle {
  start(): Promise<void>;
  pause(): void;
  stop(): void;
  setMuted(muted: boolean): void;
  isRunning(): boolean;
}

export function createAmbience(): AmbienceHandle | null {
  if (typeof window === "undefined") return null;
  const Ctor: AudioContextCtor | undefined =
    window.AudioContext ?? window.webkitAudioContext;
  if (!Ctor) return null;

  const ctx = new Ctor();
  const oscillators: OscillatorNode[] = [];

  // Master chain: tremolo (LFO modulates output gain) → master gain → destination
  const master = ctx.createGain();
  master.gain.value = 0; // start silent; faded in on play()
  master.connect(ctx.destination);

  // Subtle tremolo so the pad breathes rather than feeling static
  const tremolo = ctx.createGain();
  tremolo.gain.value = 1;
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.11;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 0.06;
  lfo.connect(lfoDepth);
  lfoDepth.connect(tremolo.gain);
  lfo.start();
  oscillators.push(lfo);

  // Insert tremolo between pad bus and master
  const padBus = ctx.createGain();
  padBus.gain.value = 1;
  padBus.connect(tremolo);
  tremolo.connect(master);

  // Soft low-pass for a warm, rounded sound
  const lpf = ctx.createBiquadFilter();
  lpf.type = "lowpass";
  lpf.frequency.value = 1400;
  lpf.Q.value = 0.6;
  lpf.connect(padBus);

  // Feedback-delay reverb tail — adds air without a convolver
  const delay = ctx.createDelay();
  delay.delayTime.value = 0.45;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.42;
  const wet = ctx.createGain();
  wet.gain.value = 0.32;
  lpf.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(padBus);

  // Pad voices: each chord tone gets two slightly detuned oscillators for chorus
  CHORD_HZ.forEach((freq, idx) => {
    const isBass = freq < 80;
    [-7, 7].forEach((detuneCents) => {
      const osc = ctx.createOscillator();
      osc.type = isBass ? "sine" : "triangle";
      osc.frequency.value = freq;
      osc.detune.value = detuneCents;
      const g = ctx.createGain();
      // Bass louder, upper voices softer to keep the mix calm
      g.gain.value = isBass ? 0.18 : 0.085 - idx * 0.005;
      osc.connect(g);
      g.connect(lpf);
      osc.start();
      oscillators.push(osc);
    });
  });

  // Slow filter sweep so the pad gently opens as the ad progresses
  const now = ctx.currentTime;
  lpf.frequency.setValueAtTime(1100, now);
  lpf.frequency.linearRampToValueAtTime(2400, now + 16);
  lpf.frequency.linearRampToValueAtTime(1700, now + 28);

  let running = false;
  let muted = false;
  const TARGET_GAIN = 0.14;

  const applyTarget = () => {
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(muted ? 0 : TARGET_GAIN, t + 1.8);
  };

  return {
    async start() {
      if (ctx.state === "suspended") {
        try {
          await ctx.resume();
        } catch {
          /* ignore */
        }
      }
      running = true;
      applyTarget();
    },
    pause() {
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0, t + 0.6);
      running = false;
    },
    stop() {
      try {
        oscillators.forEach((o) => {
          try {
            o.stop();
          } catch {
            /* already stopped */
          }
        });
        ctx.close().catch(() => {});
      } catch {
        /* ignore */
      }
      running = false;
    },
    setMuted(next: boolean) {
      muted = next;
      if (running) applyTarget();
    },
    isRunning() {
      return running;
    },
  };
}
