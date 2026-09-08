class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private musicGainNode: GainNode | null = null;
  private musicTimer: number | null = null;
  private isCurrentlyPlayingMusic: boolean = false;
  private currentVolume: number = 0.5;
  private currentTrackTitle: string = '';

  constructor() {
    // Lazy initialize on first user gesture
  }

  public getContext(): AudioContext | null {
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

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopMusic();
    } else {
      this.playChime();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playClick(freq = 600, duration = 0.04) {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + duration);
      
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not permitted yet
    }
  }

  public playHover() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 0.03);
      
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // pass
    }
  }

  public playChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.06);
        
        gain.gain.setValueAtTime(0.04, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.35);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.35);
      });
    } catch {
      // pass
    }
  }

  public playTerminalTick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880 + Math.random() * 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {
      // pass
    }
  }

  public playSuccess() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      [440, 554.37, 659.25, 880].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.4);
      });
    } catch {
      // pass
    }
  }

  // =========================================================================
  // REAL AUDIO & HYBRID STREAMING ENGINE
  // =========================================================================

  private audioPlayer: HTMLAudioElement | null = null;

  private getAudioPlayer(): HTMLAudioElement {
    if (!this.audioPlayer && typeof window !== 'undefined') {
      this.audioPlayer = new Audio();
      this.audioPlayer.preload = 'auto';
      this.audioPlayer.loop = true;
      this.audioPlayer.volume = this.currentVolume;
    }
    return this.audioPlayer!;
  }

  public setMusicVolume(volumePercent: number) {
    this.currentVolume = Math.max(0, Math.min(1, volumePercent / 100));
    if (this.audioPlayer) {
      this.audioPlayer.volume = this.currentVolume;
    }
    if (this.musicGainNode && this.ctx) {
      try {
        this.musicGainNode.gain.setValueAtTime(this.currentVolume * 0.45, this.ctx.currentTime);
      } catch {
        // pass
      }
    }
  }

  public isPlaying(): boolean {
    return this.isCurrentlyPlayingMusic;
  }

  public getCurrentTrackTitle(): string {
    return this.currentTrackTitle;
  }

  public getAudioTime(): { current: number; duration: number } {
    if (this.audioPlayer) {
      return {
        current: this.audioPlayer.currentTime || 0,
        duration: this.audioPlayer.duration || 180
      };
    }
    return { current: 0, duration: 180 };
  }

  public seekAudio(seconds: number) {
    if (this.audioPlayer && isFinite(seconds)) {
      this.audioPlayer.currentTime = seconds;
    }
  }

  public startMusic(title: string = 'Ambient Track', trackId: number = 1, customAudioUrl?: string) {
    if (this.isMuted) return;
    this.currentTrackTitle = title;
    this.stopMusic();

    // Determine MP3 track URL
    const trackNum = ((Math.abs(trackId || title.length) - 1) % 6) + 1;
    const fallbackUrl = `/audio/track${trackNum}.mp3`;
    const audioUrl = customAudioUrl || fallbackUrl;

    try {
      const player = this.getAudioPlayer();
      player.volume = this.currentVolume;
      player.src = audioUrl;

      const playPromise = player.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isCurrentlyPlayingMusic = true;
          })
          .catch(() => {
            // If customAudioUrl failed, fallback to local track
            if (customAudioUrl && customAudioUrl !== fallbackUrl) {
              player.src = fallbackUrl;
              player.play().then(() => {
                this.isCurrentlyPlayingMusic = true;
              }).catch(() => {
                this.startWebAudioSynth();
              });
            } else {
              this.startWebAudioSynth();
            }
          });
      }
    } catch {
      this.startWebAudioSynth();
    }
  }

  private async startWebAudioSynth() {
    let ctx = this.getContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        // pass
      }
    }

    this.isCurrentlyPlayingMusic = true;

    const masterFilter = ctx.createBiquadFilter();
    masterFilter.type = 'lowpass';
    masterFilter.frequency.setValueAtTime(1800, ctx.currentTime);
    masterFilter.Q.setValueAtTime(1.5, ctx.currentTime);

    this.musicGainNode = ctx.createGain();
    this.musicGainNode.gain.setValueAtTime(this.currentVolume * 0.45, ctx.currentTime);

    masterFilter.connect(this.musicGainNode);
    this.musicGainNode.connect(ctx.destination);

    const palettes = [
      {
        tempo: 1600,
        chords: [
          [164.81, 329.63, 392.00, 493.88],
          [220.00, 261.63, 329.63, 440.00],
          [174.61, 261.63, 349.23, 440.00],
          [196.00, 246.94, 293.66, 392.00],
        ],
        melodies: [493.88, 587.33, 659.25, 783.99, 880.00, 659.25, 587.33, 493.88]
      }
    ];

    const palette = palettes[0];
    let step = 0;

    const playStep = () => {
      if (!this.isCurrentlyPlayingMusic || !this.ctx || !this.musicGainNode) return;
      const curCtx = this.ctx;
      const now = curCtx.currentTime;
      const chord = palette.chords[step % palette.chords.length];

      try {
        const bassOsc = curCtx.createOscillator();
        const bassGain = curCtx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(chord[0] * 0.5, now);

        bassGain.gain.setValueAtTime(0.001, now);
        bassGain.gain.linearRampToValueAtTime(0.18, now + 0.08);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

        bassOsc.connect(bassGain);
        bassGain.connect(masterFilter);
        bassOsc.start(now);
        bassOsc.stop(now + 1.6);
      } catch {}

      chord.forEach((freq, i) => {
        try {
          const padOsc = curCtx.createOscillator();
          const padGain = curCtx.createGain();
          padOsc.type = i === 1 ? 'sawtooth' : 'sine';
          padOsc.frequency.setValueAtTime(freq, now);

          padGain.gain.setValueAtTime(0.001, now);
          padGain.gain.linearRampToValueAtTime(0.08, now + 0.2);
          padGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

          padOsc.connect(padGain);
          padGain.connect(masterFilter);
          padOsc.start(now);
          padOsc.stop(now + 1.5);
        } catch {}
      });

      step++;
    };

    playStep();
    this.musicTimer = window.setInterval(playStep, 1600);
  }

  public stopMusic() {
    this.isCurrentlyPlayingMusic = false;
    if (this.audioPlayer) {
      try {
        this.audioPlayer.pause();
      } catch {}
    }
    if (this.musicTimer !== null) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    if (this.musicGainNode && this.ctx) {
      try {
        this.musicGainNode.gain.setValueAtTime(this.musicGainNode.gain.value, this.ctx.currentTime);
        this.musicGainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
      } catch {
        // pass
      }
    }
  }
}

export const soundEngine = new SoundEngine();


