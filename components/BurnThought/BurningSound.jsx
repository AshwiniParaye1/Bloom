"use client";

import { useCallback, useEffect, useRef } from "react";

// Generate burning sound using Web Audio API
const BurningSound = ({ isPlaying, volume = 0.3 }) => {
  const audioContextRef = useRef(null);
  const nodesRef = useRef([]);
  const isPlayingRef = useRef(false);

  const createBurningSound = useCallback(() => {
    if (!audioContextRef.current || isPlayingRef.current) return;

    const ctx = audioContextRef.current;
    isPlayingRef.current = true;

    // Create multiple noise sources for realistic fire crackle
    const createNoise = (duration) => {
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        // Create brown noise (more bass-y, like fire)
        data[i] = (Math.random() * 2 - 1) * 0.5;
        if (i > 0) {
          data[i] = (data[i - 1] + (0.02 * data[i])) / 1.02;
        }
      }

      return buffer;
    };

    // Main fire rumble
    const fireBuffer = createNoise(4);
    const fireSource = ctx.createBufferSource();
    fireSource.buffer = fireBuffer;
    fireSource.loop = true;

    // Low-pass filter for deep rumble
    const lowPass = ctx.createBiquadFilter();
    lowPass.type = "lowpass";
    lowPass.frequency.value = 400;
    lowPass.Q.value = 1;

    // Gain for main fire
    const fireGain = ctx.createGain();
    fireGain.gain.setValueAtTime(0, ctx.currentTime);
    fireGain.gain.linearRampToValueAtTime(volume * 0.6, ctx.currentTime + 0.5);
    fireGain.gain.linearRampToValueAtTime(volume * 0.4, ctx.currentTime + 2.5);
    fireGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.5);

    fireSource.connect(lowPass);
    lowPass.connect(fireGain);
    fireGain.connect(ctx.destination);
    fireSource.start();

    nodesRef.current.push(fireSource);

    // Crackle sounds (random pops)
    const createCrackle = (delay) => {
      const crackleBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
      const crackleData = crackleBuffer.getChannelData(0);

      for (let i = 0; i < crackleBuffer.length; i++) {
        const t = i / crackleBuffer.length;
        crackleData[i] = (Math.random() * 2 - 1) * Math.exp(-t * 20);
      }

      const crackleSource = ctx.createBufferSource();
      crackleSource.buffer = crackleBuffer;

      // High-pass for crispy crackle
      const highPass = ctx.createBiquadFilter();
      highPass.type = "highpass";
      highPass.frequency.value = 2000;

      const crackleGain = ctx.createGain();
      crackleGain.gain.value = volume * (0.2 + Math.random() * 0.3);

      crackleSource.connect(highPass);
      highPass.connect(crackleGain);
      crackleGain.connect(ctx.destination);

      crackleSource.start(ctx.currentTime + delay);
      nodesRef.current.push(crackleSource);
    };

    // Schedule random crackles
    for (let i = 0; i < 15; i++) {
      createCrackle(0.2 + Math.random() * 2.8);
    }

    // Whoosh sound for the initial burn
    const whooshBuffer = createNoise(1.5);
    const whooshSource = ctx.createBufferSource();
    whooshSource.buffer = whooshBuffer;

    const bandPass = ctx.createBiquadFilter();
    bandPass.type = "bandpass";
    bandPass.frequency.value = 800;
    bandPass.Q.value = 0.5;

    const whooshGain = ctx.createGain();
    whooshGain.gain.setValueAtTime(0, ctx.currentTime);
    whooshGain.gain.linearRampToValueAtTime(volume * 0.5, ctx.currentTime + 0.3);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    whooshSource.connect(bandPass);
    bandPass.connect(whooshGain);
    whooshGain.connect(ctx.destination);
    whooshSource.start();

    nodesRef.current.push(whooshSource);

    // Clean up after sound ends
    setTimeout(() => {
      stopSound();
    }, 4000);
  }, [volume]);

  const stopSound = useCallback(() => {
    nodesRef.current.forEach(node => {
      try {
        node.stop();
      } catch (e) {
        // Node may have already stopped
      }
    });
    nodesRef.current = [];
    isPlayingRef.current = false;
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Initialize AudioContext on user interaction
    if (isPlaying && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (isPlaying) {
      // Resume context if suspended (browser autoplay policy)
      if (audioContextRef.current?.state === "suspended") {
        audioContextRef.current.resume().then(() => {
          createBurningSound();
        });
      } else {
        createBurningSound();
      }
    } else {
      stopSound();
    }

    return () => {
      stopSound();
    };
  }, [isPlaying, createBurningSound, stopSound]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSound();
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [stopSound]);

  return null; // This component doesn't render anything
};

export default BurningSound;
