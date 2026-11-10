// Web Audio API synthesizer for Los Serrano sound effects & "1+1 son 7" jingle

class SoundManager {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  private getContext(): AudioContext | null {
    if (this.muted) return null;
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public playStamp(isYes: boolean) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isYes ? 330 : 240, now);
    osc.frequency.exponentialRampToValueAtTime(isYes ? 523.25 : 165, now + 0.12);

    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Harp glissando when Diego Serrano wakes up from his dream ("El Sueño de Resines")
  public playDreamHarp() {
    const ctx = this.getContext();
    if (!ctx) return;

    // Whole-tone dream scale
    const notes = [261.63, 293.66, 329.63, 369.99, 415.3, 466.16, 523.25, 587.33, 659.25, 739.99, 830.61, 932.33, 1046.5];
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.065;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0008, startTime + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.72);
    });
  }

  // Cheerful acoustic-style melody inspired by "Uno más uno son 7"
  public playUnoMasUnoJingle() {
    const ctx = this.getContext();
    if (!ctx) return;

    // Rhythmic notes: "U-no más u-no son sie-te..."
    const sequence: Array<{ freq: number; delay: number; dur: number }> = [
      { freq: 392.0, delay: 0.0, dur: 0.18 },   // G4
      { freq: 392.0, delay: 0.2, dur: 0.18 },   // G4
      { freq: 440.0, delay: 0.4, dur: 0.18 },   // A4
      { freq: 493.88, delay: 0.6, dur: 0.22 },  // B4
      { freq: 523.25, delay: 0.85, dur: 0.22 }, // C5
      { freq: 587.33, delay: 1.1, dur: 0.25 },  // D5
      { freq: 493.88, delay: 1.4, dur: 0.45 },  // B4
      { freq: 587.33, delay: 1.95, dur: 0.18 }, // D5
      { freq: 659.25, delay: 2.15, dur: 0.22 }, // E5
      { freq: 587.33, delay: 2.4, dur: 0.22 },  // D5
      { freq: 523.25, delay: 2.65, dur: 0.22 }, // C5
      { freq: 493.88, delay: 2.9, dur: 0.22 },  // B4
      { freq: 440.0, delay: 3.15, dur: 0.25 },  // A4
      { freq: 392.0, delay: 3.45, dur: 0.55 },  // G4
    ];

    const now = ctx.currentTime;
    sequence.forEach(({ freq, delay, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + delay;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + dur + 0.02);
    });
  }
}

export const sound = new SoundManager();
