import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Desert wind ambient generator using Web Audio API.
 * Creates layered filtered noise that sounds like gentle wind.
 */
function createWindNode(ctx) {
  // Generate noise buffer (2 seconds, looped)
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  // Low-pass filter for soft wind base
  const lpFilter = ctx.createBiquadFilter();
  lpFilter.type = 'lowpass';
  lpFilter.frequency.value = 400;
  lpFilter.Q.value = 0.5;

  // Band-pass for mid whistle
  const bpFilter = ctx.createBiquadFilter();
  bpFilter.type = 'bandpass';
  bpFilter.frequency.value = 800;
  bpFilter.Q.value = 0.3;

  // Gain for the base wind layer
  const baseGain = ctx.createGain();
  baseGain.gain.value = 0.12;

  // Gain for the whistle layer
  const whistleGain = ctx.createGain();
  whistleGain.gain.value = 0.04;

  // LFO to modulate filter frequency (wind gusts)
  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.15; // slow gusts
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 150;
  lfo.connect(lfoGain);
  lfoGain.connect(lpFilter.frequency);
  lfo.start();

  // Connect: noise -> lowpass -> baseGain -> output
  noise.connect(lpFilter);
  lpFilter.connect(baseGain);

  // Connect: noise -> bandpass -> whistleGain -> output
  noise.connect(bpFilter);
  bpFilter.connect(whistleGain);

  noise.start();

  return { baseGain, whistleGain, noise, lfo };
}

export function useAmbientAudio() {
  const [muted, setMuted] = useState(true);
  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const nodesRef = useRef(null);
  const startedRef = useRef(false);

  const initAudio = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0; // start silent
    master.connect(ctx.destination);
    masterRef.current = master;

    const nodes = createWindNode(ctx);
    nodes.baseGain.connect(master);
    nodes.whistleGain.connect(master);
    nodesRef.current = nodes;
  }, []);

  const toggle = useCallback(() => {
    initAudio();
    const next = !muted;
    setMuted(next);

    if (masterRef.current && ctxRef.current) {
      if (ctxRef.current.state === 'suspended') {
        ctxRef.current.resume();
      }
      masterRef.current.gain.cancelScheduledValues(ctxRef.current.currentTime);
      masterRef.current.gain.setTargetAtTime(
        next ? 0 : 1,
        ctxRef.current.currentTime,
        0.5, // fade time
      );
    }
  }, [muted, initAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ctxRef.current) {
        ctxRef.current.close();
      }
    };
  }, []);

  return { muted, toggle };
}
