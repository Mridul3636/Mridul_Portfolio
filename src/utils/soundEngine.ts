export interface SoundEngineTrack {
  id: number;
  title: string;
  artist: string;
  duration?: string;
  themeColor?: string;
  coverUrl?: string;
  previewUrl?: string;
  playlistCategory?: string;
}

export interface SoundEngineState {
  isPlaying: boolean;
  isMuted: boolean;
  currentTrack: SoundEngineTrack;
  currentTime: number;
  duration: number;
  volume: number;
  themeColor: string;
}

type StateListener = (state: SoundEngineState) => void;

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private musicGainNode: GainNode | null = null;
  private musicTimer: number | null = null;
  private isCurrentlyPlayingMusic: boolean = false;
  private currentVolume: number = 0.8;
  
  private currentTrack: SoundEngineTrack = {
    id: 1,
    title: 'Apocalypse',
    artist: 'Cigarettes After Sex',
    duration: '4:50',
    themeColor: '#818cf8',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b3/5e/0f/b35e0fbe-2370-fc48-0f0c-977525e93bf2/720841214601_Cover.jpg/600x600bb.jpg',
    playlistCategory: 'Late Night'
  };

  private listeners: Set<StateListener> = new Set();
  private audioPlayer: HTMLAudioElement | null = null;

  constructor() {
    // Initial theme variables
    if (typeof window !== 'undefined') {
      this.updateThemeVariables(this.currentTrack.themeColor || '#818cf8');
    }
  }

  // =========================================================================
  // STATE SUBSCRIPTION & EVENT BROADCASTING
  // =========================================================================

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    // Send initial snapshot
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): SoundEngineState {
    const time = this.getAudioTime();
    return {
      isPlaying: this.isCurrentlyPlayingMusic,
      isMuted: this.isMuted,
      currentTrack: this.currentTrack,
      currentTime: time.current,
      duration: time.duration,
      volume: Math.round(this.currentVolume * 100),
      themeColor: this.currentTrack.themeColor || '#818cf8'
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach(cb => {
      try {
        cb(state);
      } catch (err) {
        console.error('SoundEngine listener error:', err);
      }
    });
  }

  // =========================================================================
  // DYNAMIC BACKGROUND THEME GLOW SYSTEM
  // =========================================================================

  public updateThemeVariables(themeHex: string) {
    if (typeof document === 'undefined') return;
    const hex = themeHex || '#818cf8';
    
    // Set custom CSS variables for full page ambient lighting
    const root = document.documentElement;
    root.style.setProperty('--theme-glow-accent', hex);
    root.style.setProperty('--theme-primary', hex);
    root.style.setProperty('--theme-glow-1', `${hex}55`); // 33% opacity primary aura
    root.style.setProperty('--theme-glow-2', `${hex}33`); // 20% opacity secondary aura
    root.style.setProperty('--theme-glow-3', `${hex}1a`); // 10% subtle mesh aura
  }

  // =========================================================================
  // WEB AUDIO CONTEXT & SFX
  // =========================================================================

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
    if (this.audioPlayer) {
      this.audioPlayer.muted = this.isMuted;
      this.audioPlayer.volume = this.isMuted ? 0 : this.currentVolume;
    }
    if (this.musicGainNode && this.ctx) {
      try {
        this.musicGainNode.gain.setValueAtTime(
          this.isMuted ? 0.0001 : this.currentVolume * 0.45,
          this.ctx.currentTime
        );
      } catch {}
    }
    if (!this.isMuted) {
      this.playChime();
    }
    this.notify();
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public togglePlayPause() {
    if (this.isCurrentlyPlayingMusic) {
      this.stopMusic();
    } else {
      if (this.audioPlayer && this.audioPlayer.src) {
        const playPromise = this.audioPlayer.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.isCurrentlyPlayingMusic = true;
              this.notify();
            })
            .catch(() => {
              this.startMusic(this.currentTrack);
            });
        } else {
          this.isCurrentlyPlayingMusic = true;
          this.notify();
        }
      } else {
        this.startMusic(this.currentTrack);
      }
    }
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
  // FULL SONG AUDIO PLAYBACK & STREAMING ENGINE
  // =========================================================================

  private getAudioPlayer(): HTMLAudioElement {
    if (!this.audioPlayer && typeof window !== 'undefined') {
      this.audioPlayer = new Audio();
      this.audioPlayer.preload = 'auto';
      this.audioPlayer.loop = false; // We handle full progression
      this.audioPlayer.volume = this.currentVolume;

      // Handle song completion -> loop or advance
      this.audioPlayer.addEventListener('ended', () => {
        if (this.audioPlayer) {
          this.audioPlayer.currentTime = 0;
          this.audioPlayer.play().catch(() => {});
        }
        this.notify();
      });
    }
    return this.audioPlayer!;
  }

  public setMusicVolume(volumePercent: number) {
    this.currentVolume = Math.max(0, Math.min(1, volumePercent / 100));
    if (this.currentVolume > 0 && this.isMuted) {
      this.isMuted = false;
    }
    if (this.audioPlayer) {
      this.audioPlayer.muted = this.isMuted;
      this.audioPlayer.volume = this.isMuted ? 0 : this.currentVolume;
    }
    if (this.musicGainNode && this.ctx) {
      try {
        this.musicGainNode.gain.setValueAtTime(
          this.isMuted ? 0.0001 : this.currentVolume * 0.45,
          this.ctx.currentTime
        );
      } catch {
        // pass
      }
    }
    this.notify();
  }

  public isPlaying(): boolean {
    return this.isCurrentlyPlayingMusic;
  }

  public getCurrentTrack(): SoundEngineTrack {
    return this.currentTrack;
  }

  public getCurrentTrackTitle(): string {
    return this.currentTrack.title;
  }

  public getAudioTime(): { current: number; duration: number } {
    if (this.audioPlayer) {
      const dur = this.audioPlayer.duration;
      return {
        current: this.audioPlayer.currentTime || 0,
        duration: isFinite(dur) && dur > 0 ? dur : 180
      };
    }
    return { current: 0, duration: 180 };
  }

  public seekAudio(seconds: number) {
    if (this.audioPlayer && isFinite(seconds)) {
      this.audioPlayer.currentTime = seconds;
      this.notify();
    }
  }

  /**
   * Resolves the primary full-length audio URL for any track ID
   */
  private resolveFullAudioUrl(trackId: number, customAudioUrl?: string): string {
    if (customAudioUrl && customAudioUrl.startsWith('/audio/')) {
      return customAudioUrl;
    }
    const safeId = Math.abs(trackId) || 1;
    // Downloaded full songs: track_1.webm through track_20.webm
    const cycle20 = ((safeId - 1) % 20) + 1;
    return `/audio/track_${cycle20}.webm`;
  }

  /**
   * Start playing a song with full-length audio and dynamic background theme change
   */
  public startMusic(
    titleOrTrack: string | SoundEngineTrack = 'Ambient Track',
    trackId: number = 1,
    customAudioUrl?: string,
    themeColor?: string,
    artist?: string,
    coverUrl?: string
  ) {
    if (typeof titleOrTrack === 'object') {
      this.currentTrack = { ...titleOrTrack };
    } else {
      this.currentTrack = {
        id: trackId,
        title: titleOrTrack,
        artist: artist || this.currentTrack.artist || 'Mridul Soundscape',
        themeColor: themeColor || this.currentTrack.themeColor || '#818cf8',
        coverUrl: coverUrl || this.currentTrack.coverUrl,
        previewUrl: customAudioUrl
      };
    }

    // Instantly update background theme lighting across the whole website!
    this.updateThemeVariables(this.currentTrack.themeColor || '#818cf8');

    // Stop current playback
    this.stopMusic(false);

    const primaryAudioUrl = this.resolveFullAudioUrl(this.currentTrack.id, this.currentTrack.previewUrl);
    const fallbackMp3 = `/audio/track${((Math.abs(this.currentTrack.id) - 1) % 6) + 1}.mp3`;
    const fallbackM4a = `/audio/track_${((Math.abs(this.currentTrack.id) - 1) % 20) + 1}.m4a`;

    try {
      const player = this.getAudioPlayer();
      player.muted = this.isMuted;
      player.volume = this.isMuted ? 0 : this.currentVolume;
      player.src = primaryAudioUrl;

      const playPromise = player.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isCurrentlyPlayingMusic = true;
            this.notify();
          })
          .catch(() => {
            // Try m4a fallback
            player.src = fallbackM4a;
            player.play().then(() => {
              this.isCurrentlyPlayingMusic = true;
              this.notify();
            }).catch(() => {
              // Try mp3 fallback
              player.src = fallbackMp3;
              player.play().then(() => {
                this.isCurrentlyPlayingMusic = true;
                this.notify();
              }).catch(() => {
                this.startWebAudioSynth();
                this.notify();
              });
            });
          });
      }
    } catch {
      this.startWebAudioSynth();
      this.notify();
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

  public stopMusic(shouldNotify: boolean = true) {
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
    if (shouldNotify) {
      this.notify();
    }
  }
}

export const soundEngine = new SoundEngine();


