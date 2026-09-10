import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Search, 
  ExternalLink, 
  Headphones, 
  Radio, 
  Disc3,
  ChevronLeft,
  ChevronRight,
  Music
} from 'lucide-react';
import { YouTubeIcon } from './Icons';
import { allTracks, soundtrackPlaylists } from '../data/soundtrackData';
import type { TrackItem } from '../types';
import { soundEngine } from '../utils/soundEngine';
import { MusicImporterModal } from './MusicImporterModal';

export const SoundtrackSection: React.FC = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentTrack, setCurrentTrack] = useState<TrackItem>(() => {
    const beatIt = allTracks.find(t => t.id === 23);
    return beatIt || allTracks[0];
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(45);
  const [totalSeconds, setTotalSeconds] = useState<number>(180);
  const [volume, setVolume] = useState<number>(80);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const playlistTabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [isImporterOpen, setIsImporterOpen] = useState<boolean>(false);

  const activeColor = currentTrack.themeColor || '#10b981';

  const parseDurationToSeconds = (dur: string): number => {
    if (!dur) return 180;
    const parts = dur.split(':').map(p => parseInt(p, 10));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return parts[0] * 60 + parts[1];
    }
    return 180;
  };

  useEffect(() => {
    setTotalSeconds(parseDurationToSeconds(currentTrack.duration));
  }, [currentTrack]);

  const checkScroll = () => {
    if (playlistTabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = playlistTabsRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = playlistTabsRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll, { passive: true });
    }
    window.addEventListener('resize', checkScroll);
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScrollPlaylists = (direction: 'left' | 'right') => {
    soundEngine.playClick();
    if (playlistTabsRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      playlistTabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  // Filter tracks
  const filteredTracks = allTracks.filter(t => {
    const matchesPlaylist = selectedPlaylist === 'all' 
      ? true 
      : selectedPlaylist === 'repeat' ? t.playlistCategory === 'Forever on Repeat'
      : selectedPlaylist === 'late-night' ? t.playlistCategory === 'Late Night'
      : selectedPlaylist === 'energy' ? t.playlistCategory === 'Energy Mode'
      : selectedPlaylist === 'soft' ? t.playlistCategory === 'Soft Hours'
      : selectedPlaylist === 'indie' ? t.playlistCategory === 'Indie Side'
      : selectedPlaylist === 'pop' ? t.playlistCategory === 'Pop Rotation'
      : true;

    const matchesSearch = !searchQuery || 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.vibe.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPlaylist && matchesSearch;
  });

  // Subscribe to central SoundEngine state for global sync
  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(state => {
      setIsPlaying(state.isPlaying);
      const matched = allTracks.find(t => t.id === state.currentTrack.id);
      if (matched) {
        setCurrentTrack(matched);
      }
    });
    return unsubscribe;
  }, []);

  // Audio progression timer
  useEffect(() => {
    let interval: number;
    if (isPlaying && !isSeeking) {
      interval = window.setInterval(() => {
        const time = soundEngine.getAudioTime();
        if (time && time.current > 0) {
          setPlaybackSeconds(Math.floor(time.current));
          if (time.duration && isFinite(time.duration) && time.duration > 5) {
            setTotalSeconds(Math.floor(time.duration));
          }
        } else {
          setPlaybackSeconds(prev => (prev >= totalSeconds ? 0 : prev + 1));
        }
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isSeeking, totalSeconds]);

  const handlePlayTrack = (track: TrackItem) => {
    soundEngine.playChime();
    soundEngine.startMusic(track.title, track.id, track.previewUrl, track.themeColor, track.artist, track.coverUrl);
    setCurrentTrack(track);
    setIsPlaying(true);
    setPlaybackSeconds(0);
    setTotalSeconds(parseDurationToSeconds(track.duration));
  };

  const handleTogglePlay = () => {
    soundEngine.playClick();
    if (isPlaying) {
      soundEngine.stopMusic();
      setIsPlaying(false);
    } else {
      soundEngine.startMusic(currentTrack.title, currentTrack.id, currentTrack.previewUrl, currentTrack.themeColor, currentTrack.artist, currentTrack.coverUrl);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    soundEngine.playClick();
    const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack.id);
    const nextTrack = filteredTracks[(currentIndex + 1) % filteredTracks.length] || filteredTracks[0];
    setCurrentTrack(nextTrack);
    setPlaybackSeconds(0);
    setTotalSeconds(parseDurationToSeconds(nextTrack.duration));
    if (isPlaying) {
      soundEngine.startMusic(nextTrack.title, nextTrack.id, nextTrack.previewUrl, nextTrack.themeColor, nextTrack.artist, nextTrack.coverUrl);
    }
  };

  const handlePrevTrack = () => {
    soundEngine.playClick();
    const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack.id);
    const prevTrack = filteredTracks[(currentIndex - 1 + filteredTracks.length) % filteredTracks.length] || filteredTracks[0];
    setCurrentTrack(prevTrack);
    setPlaybackSeconds(0);
    setTotalSeconds(parseDurationToSeconds(prevTrack.duration));
    if (isPlaying) {
      soundEngine.startMusic(prevTrack.title, prevTrack.id, prevTrack.previewUrl, prevTrack.themeColor, prevTrack.artist, prevTrack.coverUrl);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSec = parseInt(e.target.value, 10);
    setPlaybackSeconds(newSec);
    soundEngine.seekAudio(newSec);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    soundEngine.setMusicVolume(val);
  };

  const formatTime = (secs: number) => {
    const s = Math.max(0, Math.floor(secs));
    const mins = Math.floor(s / 60);
    const remainder = s % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <section 
      id="soundtrack" 
      className="relative py-28 sm:py-36 md:py-40 bg-transparent border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Chromatic Gradient matching theme */}
      <div 
        style={{ backgroundColor: `${activeColor}20` }}
        className="absolute top-1/4 left-1/4 w-[650px] h-[650px] rounded-full blur-[170px] pointer-events-none -z-10 transition-colors duration-700" 
      />
      <div className="absolute bottom-10 right-1/4 w-[650px] h-[650px] bg-brand-sky/15 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-mono mb-4 tracking-wider uppercase">
              <Headphones className="w-3.5 h-3.5" />
              <span>10 // SPOTIFY & SOUND LAB</span>
            </div>
            <h2 className="font-funky font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              My Soundtrack
            </h2>
            <p className="text-brand-sky font-mono text-xs sm:text-sm mt-2">
              150 Verified Tracks Across 6 Curated Mindset Playlists with Real Artwork & Previews
            </p>
          </div>

          {/* Search & YouTube Importer Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                soundEngine.playClick();
                setIsImporterOpen(true);
              }}
              className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-red-600/20 via-surface-900 to-emerald-500/20 border border-emerald-400/40 text-white hover:border-emerald-400 hover:text-emerald-300 font-mono text-xs font-bold transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              title="Download any YouTube video/song + original HD thumbnail"
            >
              <YouTubeIcon className="w-4 h-4 text-red-500" />
              <span>+ Import YouTube Track</span>
            </button>

            <div className="relative w-full sm:w-80 md:w-88">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 150 tracks, artists, moods..."
                className="w-full bg-surface-900 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-brand-pink shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE SPOTIFY PLAYER CONSOLE WITH DYNAMIC THEME SHIFT */}
        {/* ========================================================================= */}
        <div 
          style={{
            borderColor: `${activeColor}60`,
            boxShadow: `0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px ${activeColor}30`
          }}
          className="rounded-3xl bg-[#080d1a]/95 border-2 p-4 sm:p-10 lg:p-12 mb-12 relative overflow-hidden backdrop-blur-2xl transition-all duration-700"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left: Real Album Art & Track Info (5 cols) */}
            <div className="lg:col-span-5 flex items-center gap-5">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden border-2 border-white/15 shadow-2xl group">
                {currentTrack.coverUrl ? (
                  <img 
                    src={currentTrack.coverUrl} 
                    alt={currentTrack.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isPlaying ? 'scale-105 animate-pulse-slow' : ''
                    }`}
                  />
                ) : (
                  <div 
                    style={{ background: `linear-gradient(135deg, ${activeColor}40, #090f1d)` }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Disc3 className={`w-12 h-12 text-white ${isPlaying ? 'animate-spin-slow' : ''}`} />
                  </div>
                )}
                {isPlaying && (
                  <div 
                    style={{ borderColor: activeColor }}
                    className="absolute inset-0 border-2 rounded-2xl pointer-events-none animate-pulse" 
                  />
                )}
              </div>

              <div className="overflow-hidden">
                <div className="flex items-center gap-2 mb-1.5">
                  <span 
                    style={{ 
                      color: activeColor, 
                      borderColor: `${activeColor}40`,
                      backgroundColor: `${activeColor}15`
                    }}
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold uppercase inline-block"
                  >
                    {currentTrack.playlistCategory}
                  </span>
                  
                  {/* Live Equalizer Status */}
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                      <span style={{ backgroundColor: activeColor }} className={`w-0.5 h-2.5 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} />
                      <span style={{ backgroundColor: activeColor }} className={`w-0.5 h-3.5 rounded-full ${isPlaying ? 'animate-pulse delay-75' : ''}`} />
                      <span style={{ backgroundColor: activeColor }} className={`w-0.5 h-2 rounded-full ${isPlaying ? 'animate-pulse delay-150' : ''}`} />
                    </div>
                    <span style={{ color: activeColor }} className="text-[10px] font-mono font-bold uppercase tracking-wider">
                      {isPlaying ? 'PLAYING' : 'PAUSED'}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-black text-xl sm:text-2xl text-white truncate mb-0.5">
                  {currentTrack.title}
                </h3>
                <p className="text-sm font-mono text-slate-300 truncate">
                  {currentTrack.artist}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-mono text-slate-300">
                    {currentTrack.vibe}
                  </span>
                  <span className="text-xs font-mono text-slate-500">• {currentTrack.bpm || 110} BPM</span>
                </div>
              </div>
            </div>

            {/* Center & Right: Player Controls & Progress (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Dynamic Animated Audio Spectrum Wave Bars */}
              <div className="h-10 flex items-center gap-1 justify-center px-4 bg-surface-950/80 rounded-2xl border border-white/[0.06]">
                {Array.from({ length: 32 }).map((_, idx) => {
                  const barHeight = isPlaying 
                    ? Math.max(15, (Math.sin(idx * 0.4 + (playbackSeconds * 0.5)) * 0.5 + 0.5) * 100) 
                    : 15;
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: activeColor,
                        height: `${barHeight}%`
                      }}
                      className="w-1.5 rounded-full transition-all duration-150 opacity-90"
                    />
                  );
                })}
              </div>

              {/* Draggable Progress Range Input ("Song Tana Taani") */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                  <span style={{ color: activeColor }} className="font-semibold">
                    {formatTime(playbackSeconds)}
                  </span>
                  <span>{currentTrack.duration}</span>
                </div>
                
                <input
                  type="range"
                  min={0}
                  max={Math.max(30, totalSeconds)}
                  value={playbackSeconds}
                  onMouseDown={() => setIsSeeking(true)}
                  onMouseUp={() => setIsSeeking(false)}
                  onTouchStart={() => setIsSeeking(true)}
                  onTouchEnd={() => setIsSeeking(false)}
                  onChange={handleSeekChange}
                  style={{
                    accentColor: activeColor,
                    background: `linear-gradient(to right, ${activeColor} ${(playbackSeconds / Math.max(30, totalSeconds)) * 100}%, #1e293b ${(playbackSeconds / Math.max(30, totalSeconds)) * 100}%)`
                  }}
                  className="w-full h-2 rounded-full cursor-pointer appearance-none bg-slate-800 transition-all focus:outline-none"
                  title="Drag to seek song"
                />
              </div>

              {/* Player Controls Bar */}
              <div className="flex items-center justify-between pt-1">
                
                {/* Spotify Launch Link */}
                <a
                  href={`https://open.spotify.com/search/${encodeURIComponent(currentTrack.title + ' ' + currentTrack.artist)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#1db954] hover:underline font-semibold"
                >
                  <Radio className="w-4 h-4" />
                  <span className="hidden sm:inline">Open in Spotify</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Core Playback Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevTrack}
                    className="p-2 text-slate-300 hover:text-white transition-colors"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleTogglePlay}
                    style={{
                      backgroundColor: activeColor,
                      boxShadow: `0 0 25px ${activeColor}80`
                    }}
                    className="w-12 h-12 rounded-full text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={handleNextTrack}
                    className="p-2 text-slate-300 hover:text-white transition-colors"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                {/* Volume Slider */}
                <div className="hidden sm:flex items-center gap-2 text-slate-400 font-mono text-xs">
                  <Volume2 style={{ color: activeColor }} className="w-4 h-4" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-surface-900 accent-emerald-400 rounded-lg cursor-pointer"
                  />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Playlist Category Filter Pills with Scroll Arrows */}
        <div className="relative mb-8 group">
          {/* Floating Left Arrow */}
          <button
            onClick={() => handleScrollPlaylists('left')}
            disabled={!canScrollLeft}
            className={`absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#080e1a]/95 border border-white/20 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-200 ${
              canScrollLeft 
                ? 'opacity-100 hover:scale-110 hover:border-emerald-400 hover:text-emerald-400 active:scale-95 shadow-emerald-950/50' 
                : 'opacity-0 pointer-events-none'
            }`}
            title="Scroll playlists left"
            aria-label="Scroll playlists left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Left Fade */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-[#02040a] via-[#02040a]/80 to-transparent z-10 pointer-events-none rounded-l-2xl" />
          )}

          {/* Scrollable Playlist Pills */}
          <div 
            ref={playlistTabsRef}
            className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none px-1 scroll-smooth"
          >
            {soundtrackPlaylists.map((pl) => {
              const isSelected = selectedPlaylist === pl.id;
              return (
                <button
                  key={pl.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedPlaylist(pl.id);
                  }}
                  className={`shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-mono transition-all border ${
                    isSelected
                      ? 'bg-[#091422] border-emerald-400 text-white font-bold shadow-lg shadow-emerald-950/40 scale-[1.02]'
                      : 'bg-surface-900/60 border-white/[0.08] text-slate-400 hover:text-white hover:bg-surface-850'
                  }`}
                >
                  <span>{pl.icon}</span>
                  <span>{pl.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {pl.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Fade */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-[#02040a] via-[#02040a]/80 to-transparent z-10 pointer-events-none rounded-r-2xl" />
          )}

          {/* Floating Right Arrow */}
          <button
            onClick={() => handleScrollPlaylists('right')}
            disabled={!canScrollRight}
            className={`absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#080e1a]/95 border border-white/20 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-200 ${
              canScrollRight 
                ? 'opacity-100 hover:scale-110 hover:border-emerald-400 hover:text-emerald-400 active:scale-95 shadow-emerald-950/50' 
                : 'opacity-0 pointer-events-none'
            }`}
            title="Scroll playlists right"
            aria-label="Scroll playlists right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 150-Track Grid / List View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-surface-700">
          {filteredTracks.map((track) => {
            const isCurrent = currentTrack.id === track.id;
            const trTheme = track.themeColor || activeColor;
            return (
              <div
                key={track.id}
                onClick={() => handlePlayTrack(track)}
                style={{
                  borderColor: isCurrent ? trTheme : undefined,
                  boxShadow: isCurrent ? `0 10px 25px ${trTheme}30` : undefined,
                  backgroundColor: isCurrent ? `${trTheme}15` : undefined
                }}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                  isCurrent
                    ? 'scale-[1.01]'
                    : 'glass-card hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {/* Real Album Art Cover */}
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-900 border border-white/10 shrink-0 relative">
                    {track.coverUrl ? (
                      <img 
                        src={track.coverUrl} 
                        alt={track.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs">
                        <Music className="w-4 h-4 text-slate-500" />
                      </div>
                    )}
                  </div>

                  <div className="overflow-hidden">
                    <h4 
                      style={{ color: isCurrent ? trTheme : undefined }}
                      className={`text-xs sm:text-sm font-display font-bold truncate ${!isCurrent ? 'text-white' : ''}`}
                    >
                      {track.title}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400 truncate">
                      {track.artist}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-[11px] font-mono text-slate-500">
                    {track.duration}
                  </span>
                  <div 
                    style={{ 
                      backgroundColor: isCurrent ? trTheme : undefined,
                      color: isCurrent ? '#000000' : undefined 
                    }}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center border border-white/10 text-xs transition-colors ${
                      isCurrent ? 'font-bold' : 'text-slate-300 group-hover:text-black group-hover:bg-white'
                    }`}
                  >
                    {isCurrent && isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <span className="text-xs font-mono text-slate-400">
            Showing {filteredTracks.length} of {allTracks.length} tracks • Full Tracklist Audio Preview Engine Active
          </span>
        </div>

      </div>

      {/* YouTube & Music Downloader Modal */}
      <MusicImporterModal 
        isOpen={isImporterOpen} 
        onClose={() => setIsImporterOpen(false)}
        onTrackAdded={(track) => {
          handlePlayTrack(track);
        }}
      />
    </section>
  );
};
