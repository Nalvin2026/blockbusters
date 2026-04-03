import { useRef, useCallback } from 'react';

/**
 * Wraps Web Audio API for game sounds.
 * AudioContext is created lazily on first call (required for iOS Safari —
 * the context must be created inside a user gesture handler).
 * Each sound creates fresh oscillator nodes — nodes cannot be restarted.
 */
export function useAudio() {
  const ctxRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  /** Ascending two-tone chime — correct answer */
  const playCorrect = useCallback(() => {
    try {
      const ctx = getCtx();
      [523.25, 659.25].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.13;
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.start(t);
        osc.stop(t + 0.35);
      });
    } catch (_) { /* silent fail */ }
  }, [getCtx]);

  /** Low soft thud — wrong answer */
  const playWrong = useCallback(() => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.value = 110;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.22);
    } catch (_) { /* silent fail */ }
  }, [getCtx]);

  /** Four-note fanfare — session/level complete */
  const playLevelComplete = useCallback(() => {
    try {
      const ctx = getCtx();
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.16;
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc.start(t);
        osc.stop(t + 0.45);
      });
    } catch (_) { /* silent fail */ }
  }, [getCtx]);

  /** Short high ping — XP gain */
  const playXPPing = useCallback(() => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.18);
    } catch (_) { /* silent fail */ }
  }, [getCtx]);

  /**
   * Six metallic coin tinks timed to match the 6 coins flying into the chest.
   * Each tink: sine wave with downward frequency sweep + quick decay.
   * Scheduled ahead so each tink lands exactly when its coin animation ends.
   */
  const playCoins = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;
      // Frequencies, times (s), and gains for each of the 6 coins
      // Times match CSS animation delays (0,100…500ms) + duration (450ms)
      const tinks = [
        { freq: 1800, t: 0.45, g: 0.22 },
        { freq: 1600, t: 0.55, g: 0.20 },
        { freq: 2000, t: 0.65, g: 0.18 },
        { freq: 1700, t: 0.75, g: 0.16 },
        { freq: 1900, t: 0.85, g: 0.14 },
        { freq: 1500, t: 0.95, g: 0.12 },
      ];
      tinks.forEach(({ freq, t, g }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + t);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.65, now + t + 0.1);
        gain.gain.setValueAtTime(g, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.1);
        osc.start(now + t);
        osc.stop(now + t + 0.12);
      });
    } catch (_) { /* silent fail */ }
  }, [getCtx]);

  return { playCorrect, playWrong, playLevelComplete, playXPPing, playCoins, getCtx };
}
