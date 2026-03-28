import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Ambient festival soundscape using Web Audio API.
 * Layers: distant bass thump, crowd murmur, periodic cheering.
 */

function createNoiseBuffer(ctx, seconds) {
  const length = ctx.sampleRate * seconds;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function createBassThump(ctx, master) {
  // Steady kick-like pulse at ~128 BPM festival tempo
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = 55; // deep sub-bass

  // Second harmonic for body
  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.value = 110;

  const bassGain = ctx.createGain();
  bassGain.gain.value = 0.25;

  const bass2Gain = ctx.createGain();
  bass2Gain.gain.value = 0.08;

  // Low-pass to keep it rumbly
  const lpf = ctx.createBiquadFilter();
  lpf.type = 'lowpass';
  lpf.frequency.value = 80;
  lpf.Q.value = 8;

  // Pulse the volume with an LFO at ~2.13Hz (128 BPM = kick every ~0.47s)
  const pulseLfo = ctx.createOscillator();
  pulseLfo.type = 'square';
  pulseLfo.frequency.value = 2.13;
  const pulseDepth = ctx.createGain();
  pulseDepth.gain.value = 0.12;
  pulseLfo.connect(pulseDepth);
  pulseDepth.connect(bassGain.gain);
  pulseLfo.start();

  osc.connect(lpf);
  osc2.connect(bass2Gain);
  lpf.connect(bassGain);
  bassGain.connect(master);
  bass2Gain.connect(master);

  osc.start();
  osc2.start();

  return { osc, osc2, pulseLfo };
}

function createCrowdMurmur(ctx, master) {
  // Filtered noise to simulate distant crowd chatter
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 2);
  noise.loop = true;

  // Band-pass centered on vocal frequencies
  const bpf = ctx.createBiquadFilter();
  bpf.type = 'bandpass';
  bpf.frequency.value = 1200;
  bpf.Q.value = 0.4;

  // Second band for warmth
  const bpf2 = ctx.createBiquadFilter();
  bpf2.type = 'bandpass';
  bpf2.frequency.value = 600;
  bpf2.Q.value = 0.3;

  const murmurGain = ctx.createGain();
  murmurGain.gain.value = 0.06;

  const warmGain = ctx.createGain();
  warmGain.gain.value = 0.04;

  // Slow modulation for natural ebb and flow
  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.08;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 0.03;
  lfo.connect(lfoDepth);
  lfoDepth.connect(murmurGain.gain);
  lfo.start();

  noise.connect(bpf);
  noise.connect(bpf2);
  bpf.connect(murmurGain);
  bpf2.connect(warmGain);
  murmurGain.connect(master);
  warmGain.connect(master);

  noise.start();

  return { noise, lfo };
}

function createCrowdCheers(ctx, master) {
  // Periodic cheer bursts — noise shaped with an envelope
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 2);
  noise.loop = true;

  // Wider band-pass for cheering (higher, brighter)
  const bpf = ctx.createBiquadFilter();
  bpf.type = 'bandpass';
  bpf.frequency.value = 2500;
  bpf.Q.value = 0.5;

  const cheerGain = ctx.createGain();
  cheerGain.gain.value = 0; // silent by default, envelope controls it

  noise.connect(bpf);
  bpf.connect(cheerGain);
  cheerGain.connect(master);
  noise.start();

  // Schedule random cheers
  function scheduleCheer() {
    const now = ctx.currentTime;
    const delay = 6 + Math.random() * 10; // every 6-16 seconds
    const start = now + delay;
    const duration = 1.5 + Math.random() * 2; // 1.5-3.5 seconds
    const volume = 0.08 + Math.random() * 0.07; // vary intensity

    cheerGain.gain.setValueAtTime(0, start);
    cheerGain.gain.linearRampToValueAtTime(volume, start + 0.3); // quick swell
    cheerGain.gain.setValueAtTime(volume, start + duration * 0.6);
    cheerGain.gain.linearRampToValueAtTime(0, start + duration); // fade out

    // Also sweep the filter up during the cheer for excitement
    bpf.frequency.setValueAtTime(2000, start);
    bpf.frequency.linearRampToValueAtTime(3500, start + 0.4);
    bpf.frequency.linearRampToValueAtTime(2200, start + duration);

    setTimeout(scheduleCheer, (delay + duration) * 1000);
  }

  scheduleCheer();

  return { noise };
}

export function useAmbientAudio() {
  const [muted, setMuted] = useState(true);
  const mutedRef = useRef(true);
  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const startedRef = useRef(false);

  const initAudio = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    masterRef.current = master;

    createBassThump(ctx, master);
    createCrowdMurmur(ctx, master);
    createCrowdCheers(ctx, master);
  }, []);

  const toggle = useCallback(() => {
    initAudio();
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);

    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(next ? 0 : 1, now + 0.5);
  }, [initAudio]);

  useEffect(() => {
    return () => {
      if (ctxRef.current) {
        ctxRef.current.close();
      }
    };
  }, []);

  return { muted, toggle };
}
