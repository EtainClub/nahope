// Tiny Web Audio synth used by the Episode 1 shell.  No external libs.
// Stays a no-op on the server and silently drops if the AudioContext is blocked.

export type Cue =
  | "beep"
  | "dissonant"
  | "unlock"
  | "move"
  | "tick"
  | "whisper"
  | "equip"
  | "unequip";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) {
    try { ctx = new Ctor(); } catch { ctx = null; }
  }
  return ctx;
}

export function play(cue: Cue): void {
  const a = getCtx();
  if (!a) return;
  const now = a.currentTime;
  try {
    switch (cue) {
      case "beep": {
        const o = a.createOscillator(); const g = a.createGain();
        o.type = "sine"; o.frequency.value = 520;
        g.gain.setValueAtTime(0.015, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        o.connect(g).connect(a.destination);
        o.start(now); o.stop(now + 0.1);
        break;
      }
      case "dissonant": {
        const o1 = a.createOscillator(); const o2 = a.createOscillator(); const g = a.createGain();
        o1.type = "sawtooth"; o1.frequency.value = 80;
        o2.type = "sine"; o2.frequency.value = 82.5;
        g.gain.setValueAtTime(0.03, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
        o1.connect(g); o2.connect(g); g.connect(a.destination);
        o1.start(now); o2.start(now); o1.stop(now + 0.6); o2.stop(now + 0.6);
        break;
      }
      case "unlock": {
        const o = a.createOscillator(); const g = a.createGain();
        o.type = "triangle"; o.frequency.setValueAtTime(440, now);
        o.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        g.gain.setValueAtTime(0.025, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        o.connect(g).connect(a.destination);
        o.start(now); o.stop(now + 0.2);
        break;
      }
      case "move": {
        const o = a.createOscillator(); const g = a.createGain();
        o.type = "sine"; o.frequency.setValueAtTime(150, now);
        o.frequency.linearRampToValueAtTime(100, now + 0.15);
        g.gain.setValueAtTime(0.04, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        o.connect(g).connect(a.destination);
        o.start(now); o.stop(now + 0.15);
        break;
      }
      case "tick": {
        // Wood-block tick on turn advance.  Click + decaying high partial.
        const o = a.createOscillator(); const g = a.createGain();
        o.type = "square"; o.frequency.setValueAtTime(1800, now);
        o.frequency.exponentialRampToValueAtTime(900, now + 0.04);
        g.gain.setValueAtTime(0.018, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        o.connect(g).connect(a.destination);
        o.start(now); o.stop(now + 0.06);
        break;
      }
      case "whisper": {
        // Sub-bass + filtered noise burst — "something doesn't fit".
        const buf = a.createBuffer(1, a.sampleRate * 0.25, a.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3);
        }
        const noise = a.createBufferSource(); noise.buffer = buf;
        const filt = a.createBiquadFilter(); filt.type = "bandpass";
        filt.frequency.value = 220; filt.Q.value = 5;
        const ng = a.createGain(); ng.gain.value = 0.035;
        noise.connect(filt).connect(ng).connect(a.destination);
        noise.start(now); noise.stop(now + 0.26);
 
        const sub = a.createOscillator(); const sg = a.createGain();
        sub.type = "sine"; sub.frequency.value = 110;
        sg.gain.setValueAtTime(0.04, now);
        sg.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
        sub.connect(sg).connect(a.destination);
        sub.start(now); sub.stop(now + 0.24);
        break;
      }
      case "equip": {
        // Tactile organic click (double tick)
        const o = a.createOscillator(); const g = a.createGain();
        o.type = "triangle"; o.frequency.setValueAtTime(580, now);
        o.frequency.exponentialRampToValueAtTime(750, now + 0.06);
        g.gain.setValueAtTime(0.02, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
        o.connect(g).connect(a.destination);
        o.start(now); o.stop(now + 0.06);
        break;
      }
      case "unequip": {
        // Descending release slide
        const o = a.createOscillator(); const g = a.createGain();
        o.type = "triangle"; o.frequency.setValueAtTime(360, now);
        o.frequency.exponentialRampToValueAtTime(280, now + 0.08);
        g.gain.setValueAtTime(0.015, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        o.connect(g).connect(a.destination);
        o.start(now); o.stop(now + 0.08);
        break;
      }
    }
  } catch (e) {
    /* Audio sometimes blocked until user gesture; we just give up quietly. */
    void e;
  }
}

let bgmNodes: {
  nodes: AudioNode[];
  timer: NodeJS.Timeout | number | null;
} | null = null;

export function startBgm(): void {
  const a = getCtx();
  if (!a) return;

  if (bgmNodes) return; // Already running

  if (a.state === "suspended") {
    void a.resume();
  }

  const nodes: AudioNode[] = [];

  try {
    // 1. Heavy Ominous Low Bass Hum (Detuned saw + triangle, lowpassed to keep it sub-bass heavy)
    const osc1 = a.createOscillator();
    const osc2 = a.createOscillator();
    const droneGain = a.createGain();

    osc1.type = "sawtooth";
    osc1.frequency.value = 65.4; // C2
    osc2.type = "triangle";
    osc2.frequency.value = 65.8; // Slight detune for thick beating drone

    droneGain.gain.value = 0.24; // Louder, powerful presence

    const lp = a.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 95; // Cut off high sizzles

    osc1.connect(lp);
    osc2.connect(lp);
    lp.connect(droneGain).connect(a.destination);

    osc1.start();
    osc2.start();

    nodes.push(osc1, osc2, lp, droneGain);

    // 2. Swirling Radio Static & Wind (Filter-swept white noise)
    const bufferSize = a.sampleRate * 2;
    const noiseBuffer = a.createBuffer(1, bufferSize, a.sampleRate);
    const channelData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      channelData[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = a.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = a.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.Q.value = 2.0;
    noiseFilter.frequency.value = 160;

    const noiseGain = a.createGain();
    noiseGain.gain.value = 0.055; // Louder, audible wind static

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(a.destination);

    whiteNoise.start();

    nodes.push(whiteNoise, noiseFilter, noiseGain);

    // 3. Periodic Pulse / Heartbeat + High-Frequency Dissonant Screech Scheduler
    let phase = 0;
    const timer = setInterval(() => {
      const currentCtx = getCtx();
      if (!currentCtx || currentCtx.state === "closed" || !bgmNodes) return;

      const now = currentCtx.currentTime;

      // Slowly sweep the radio static frequency
      phase += 0.08;
      const nextFreq = 180 + Math.sin(phase) * 70;
      try {
        noiseFilter.frequency.exponentialRampToValueAtTime(nextFreq, now + 1.3);
      } catch {
        // Safe fallback
      }

      // Play double-thump heartbeat pulse (tension thud) every ~3 seconds
      if (Math.floor(phase * 10) % 20 === 0) {
        const hb1 = currentCtx.createOscillator();
        const hbg1 = currentCtx.createGain();
        hb1.type = "sine";
        hb1.frequency.setValueAtTime(55, now);
        hb1.frequency.exponentialRampToValueAtTime(10, now + 0.28);
        hbg1.gain.setValueAtTime(0.38, now);
        hbg1.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
        hb1.connect(hbg1).connect(currentCtx.destination);
        hb1.start(now); hb1.stop(now + 0.3);

        const hb2 = currentCtx.createOscillator();
        const hbg2 = currentCtx.createGain();
        hb2.type = "sine";
        hb2.frequency.setValueAtTime(55, now + 0.25);
        hb2.frequency.exponentialRampToValueAtTime(10, now + 0.53);
        hbg2.gain.setValueAtTime(0.38, now + 0.25);
        hbg2.gain.exponentialRampToValueAtTime(0.0001, now + 0.53);
        hb2.connect(hbg2).connect(currentCtx.destination);
        hb2.start(now + 0.25); hb2.stop(now + 0.56);
      }

      // Play High-Frequency Dissonant Screech (30% chance for cosmic horror dread)
      if (Math.random() < 0.3) {
        const scr1 = currentCtx.createOscillator();
        const scr2 = currentCtx.createOscillator();
        const scrGain = currentCtx.createGain();

        scr1.type = "sine";
        scr1.frequency.setValueAtTime(1420, now);
        scr2.type = "sine";
        scr2.frequency.setValueAtTime(1423.8, now); // 3.8Hz beating rate for psychological discomfort

        scrGain.gain.setValueAtTime(0.025, now); 
        scrGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);

        scr1.connect(scrGain);
        scr2.connect(scrGain);
        scrGain.connect(currentCtx.destination);

        scr1.start(now); scr2.start(now);
        scr1.stop(now + 4.2); scr2.stop(now + 4.2);
      }
    }, 1500);

    bgmNodes = { nodes, timer };
  } catch (e) {
    void e;
  }
}

export function stopBgm(): void {
  if (bgmNodes) {
    if (bgmNodes.timer) {
      clearInterval(bgmNodes.timer);
    }
    bgmNodes.nodes.forEach((n) => {
      try {
        if ("stop" in n) {
          (n as unknown as { stop: () => void }).stop();
        }
        n.disconnect();
      } catch {
        // Silent catch for disconnected nodes
      }
    });
    bgmNodes = null;
  }
}

