import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Search,
  X,
  Disc3,
  Sparkles,
  ListMusic,
  Music
} from 'lucide-react';
import { SpotifyIcon } from './Icons';
import { allTracks, soundtrackPlaylists } from '../data/soundtrackData';
import type { TrackItem } from '../types';
import { soundEngine } from '../utils/soundEngine';

export const FloatingMusicPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0); // Default to Apocalypse by CAS
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(180);
  const [volume, setVolume] = useState<number>(80);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  const currentTrack: TrackItem = allTracks[currentTrackIndex] || allTracks[0];
  const activeColor = currentTrack.themeColor || '#10b981';

  // Parse track duration string (e.g. "4:50") to seconds
  const parseDurationToSeconds = (dur: string): number => {
    if (!dur) return 180;
    const parts = dur.split(':').map(p => parseInt(p, 10));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return parts[0] * 60 + parts[1];
    }
    return 180;
  };

  // Update total seconds whenever track changes
  useEffect(() => {
    setTotalSeconds(parseDurationToSeconds(currentTrack.duration));
  }, [currentTrack]);

  // Subscribe to central SoundEngine state for global sync
  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(state => {
      setIsPlaying(state.isPlaying);
      const idx = allTracks.findIndex(t => t.id === state.currentTrack.id);
      if (idx >= 0) {
        setCurrentTrackIndex(idx);
      }
    });
    return unsubscribe;
  }, []);

  // Audio progression timer syncing with native audio
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

  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundEngine.playClick();
    if (!isPlaying) {
      soundEngine.startMusic(currentTrack.title, currentTrack.id, currentTrack.previewUrl, currentTrack.themeColor, currentTrack.artist, currentTrack.coverUrl);
      setIsPlaying(true);
    } else {
      soundEngine.stopMusic();
      setIsPlaying(false);
    }
  };

  const handleSelectTrack = (trackId: number) => {
    soundEngine.playChime();
    const idx = allTracks.findIndex(t => t.id === trackId);
    const selected = allTracks[idx >= 0 ? idx : 0];
    setCurrentTrackIndex(idx >= 0 ? idx : 0);
    setPlaybackSeconds(0);
    setTotalSeconds(parseDurationToSeconds(selected.duration));
    soundEngine.startMusic(selected.title, selected.id, selected.previewUrl, selected.themeColor, selected.artist, selected.coverUrl);
    setIsPlaying(true);
  };

  const handleNextTrack = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundEngine.playClick();
    const nextIdx = (currentTrackIndex + 1) % allTracks.length;
    setCurrentTrackIndex(nextIdx);
    setPlaybackSeconds(0);
    const nextTr = allTracks[nextIdx];
    setTotalSeconds(parseDurationToSeconds(nextTr.duration));
    if (isPlaying) {
      soundEngine.startMusic(nextTr.title, nextTr.id, nextTr.previewUrl, nextTr.themeColor, nextTr.artist, nextTr.coverUrl);
    }
  };

  const handlePrevTrack = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundEngine.playClick();
    const prevIdx = (currentTrackIndex - 1 + allTracks.length) % allTracks.length;
    setCurrentTrackIndex(prevIdx);
    setPlaybackSeconds(0);
    const prevTr = allTracks[prevIdx];
    setTotalSeconds(parseDurationToSeconds(prevTr.duration));
    if (isPlaying) {
      soundEngine.startMusic(prevTr.title, prevTr.id, prevTr.previewUrl, prevTr.themeColor, prevTr.artist, prevTr.coverUrl);
    }
  };

  // Dragging & seeking progress bar ("tana taani")
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

  // Filter queue across all 150 tracks
  const filteredQueue = allTracks.filter(t => {
    const matchCat = activeCategory === 'all'
      ? true
      : activeCategory === 'repeat' ? t.playlistCategory === 'Forever on Repeat'
      : activeCategory === 'late-night' ? t.playlistCategory === 'Late Night'
      : activeCategory === 'energy' ? t.playlistCategory === 'Energy Mode'
      : activeCategory === 'soft' ? t.playlistCategory === 'Soft Hours'
      : activeCategory === 'indie' ? t.playlistCategory === 'Indie Side'
      : activeCategory === 'pop' ? t.playlistCategory === 'Pop Rotation'
      : true;

    const q = searchQuery.toLowerCase();
    const matchQuery = !q || t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q) || t.vibe.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  // If minimized, render circular glowing Spotify logo matching theme & Screenshot 3
  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 animate-fadeIn">
        <button
          onClick={() => {
            soundEngine.playClick();
            setIsOpen(true);
          }}
          style={{
            borderColor: activeColor,
            boxShadow: `0 0 25px ${activeColor}99`
          }}
          className={`relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#050914] border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
            isPlaying ? 'ring-4 ring-white/20' : ''
          }`}
          title={`Now Playing: ${currentTrack.title} — Click to Open Player`}
          aria-label="Open Music Player"
        >
          {/* Ambient Glowing Dynamic Ring Aura */}
          <div 
            style={{ backgroundColor: `${activeColor}40` }}
            className={`absolute -inset-1.5 rounded-full blur-md -z-10 transition-opacity duration-300 ${
              isPlaying ? 'opacity-100 animate-pulse' : 'opacity-60 group-hover:opacity-100'
            }`} 
          />

          {/* Spotify Official SVG Logo */}
          <SpotifyIcon 
            style={{ color: isPlaying ? activeColor : '#1db954' }}
            className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:scale-105" 
          />

          {/* Playing Status Ripple */}
          {isPlaying && (
            <span 
              style={{ backgroundColor: activeColor }}
              className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#050914] animate-ping" 
            />
          )}
        </button>
      </div>
    );
  }

  return (
    <div 
      style={{
        borderColor: `${activeColor}60`,
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.9), 0 0 35px ${activeColor}25`
      }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[340px] sm:w-[410px] max-w-[calc(100vw-2rem)] rounded-3xl bg-[#070c18]/98 border-2 p-4 sm:p-5 backdrop-blur-2xl transition-all duration-500 animate-fadeIn text-white select-none"
    >
      
      {/* Top Header: Dynamic Theme Indicator + Track Profile Art + Title + Close Button */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/[0.08]">
        
        <div className="flex items-center gap-3.5 overflow-hidden">
          {/* Album Cover Profile Art with Vinyl Animation */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl overflow-hidden border border-white/15 shadow-lg group">
            {currentTrack.coverUrl ? (
              <img 
                src={currentTrack.coverUrl} 
                alt={currentTrack.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? 'scale-105 animate-pulse-slow' : ''
                }`}
                loading="lazy"
              />
            ) : (
              <div 
                style={{ background: `linear-gradient(135deg, ${activeColor}40, #090f1d)` }}
                className="w-full h-full flex items-center justify-center"
              >
                <Disc3 className={`w-7 h-7 text-white ${isPlaying ? 'animate-spin-slow' : ''}`} />
              </div>
            )}

            {/* Dynamic Center Vinyl Disc Center Hole Overlay */}
            {isPlaying && (
              <div 
                style={{ borderColor: activeColor }}
                className="absolute inset-0 border-2 rounded-2xl pointer-events-none animate-pulse" 
              />
            )}
          </div>

          {/* Title & Artist & Live Theme Badge */}
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span 
                style={{ 
                  color: activeColor, 
                  borderColor: `${activeColor}40`,
                  backgroundColor: `${activeColor}15`
                }}
                className="text-[9px] font-mono px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider truncate max-w-[150px]"
              >
                {currentTrack.playlistCategory}
              </span>

              {/* Dynamic Equalizer Status */}
              <div className="flex items-center gap-0.5">
                <span style={{ backgroundColor: activeColor }} className={`w-0.5 h-2.5 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} />
                <span style={{ backgroundColor: activeColor }} className={`w-0.5 h-3.5 rounded-full ${isPlaying ? 'animate-pulse delay-75' : ''}`} />
                <span style={{ backgroundColor: activeColor }} className={`w-0.5 h-2 rounded-full ${isPlaying ? 'animate-pulse delay-150' : ''}`} />
              </div>
            </div>

            <h4 className="font-display font-bold text-sm sm:text-base text-white truncate leading-tight">
              {currentTrack.title}
            </h4>
            <p className="text-xs font-mono text-slate-300 truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <a
            href={`https://open.spotify.com/search/${encodeURIComponent(currentTrack.title + ' ' + currentTrack.artist)}`}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg bg-surface-900/80 border border-white/10 text-[#1db954] hover:bg-[#1db954]/15 transition-all"
            title="Search on Spotify"
          >
            <SpotifyIcon className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => {
              soundEngine.playClick();
              setIsOpen(false);
            }}
            className="p-1.5 rounded-lg bg-surface-900/80 border border-white/10 text-slate-400 hover:text-white hover:border-red-500/40 hover:bg-red-500/10 transition-all"
            title="Minimize Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Playback Controls & Volume */}
      <div className="flex items-center justify-between pt-3 pb-2">
        
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrevTrack}
            className="p-2 text-slate-400 hover:text-white transition-colors active:scale-95"
            title="Previous Track"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button 
            onClick={handleTogglePlay}
            style={{
              backgroundColor: activeColor,
              boxShadow: `0 0 20px ${activeColor}80`
            }}
            className="w-10 h-10 rounded-full text-black flex items-center justify-center font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play Song'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          <button 
            onClick={handleNextTrack}
            className="p-2 text-slate-400 hover:text-white transition-colors active:scale-95"
            title="Next Track"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Vibe Tag & Volume */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400 truncate max-w-[120px]">
            <Sparkles style={{ color: activeColor }} className="w-3 h-3 shrink-0" />
            <span className="truncate">{currentTrack.vibe}</span>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <Volume2 style={{ color: activeColor }} className="w-3.5 h-3.5 shrink-0" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-14 sm:w-16 h-1 bg-surface-900 accent-emerald-400 rounded-lg cursor-pointer"
            />
          </div>
        </div>

      </div>

      {/* Interactive Draggable Seek / Scrub Slider ("Song Tana Taani Option") */}
      <div className="pt-1 pb-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
          <span style={{ color: activeColor }} className="font-semibold">
            {formatTime(playbackSeconds)}
          </span>
          <span>{currentTrack.duration}</span>
        </div>

        {/* Draggable Progress Range Input */}
        <div className="relative w-full flex items-center group">
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
            title="Drag to seek / scrub track"
          />
        </div>
      </div>

      {/* Full 150-Track Queue Header & Search Filter */}
      <div className="pt-2 border-t border-white/[0.08]">
        
        <div className="flex items-center justify-between mb-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 font-bold" style={{ color: activeColor }}>
            <ListMusic className="w-3.5 h-3.5" />
            <span>ALL TRACKS ({filteredQueue.length} / {allTracks.length})</span>
          </div>
          <span className="text-[10px] text-slate-400">Click any track to play</span>
        </div>

        {/* Quick Search Inside Queue */}
        <div className="relative mb-2">
          <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search from 150 tracks, artists, moods..."
            className="w-full bg-surface-900/90 border border-white/10 rounded-xl pl-7 pr-3 py-1.5 text-[11px] font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills Inside Player */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {soundtrackPlaylists.map(pl => {
            const isCatSelected = activeCategory === pl.id;
            return (
              <button
                key={pl.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCategory(pl.id);
                }}
                style={{
                  borderColor: isCatSelected ? activeColor : 'rgba(255,255,255,0.08)',
                  backgroundColor: isCatSelected ? `${activeColor}20` : 'rgba(15, 23, 42, 0.6)',
                  color: isCatSelected ? '#ffffff' : '#94a3b8'
                }}
                className="shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all whitespace-nowrap"
              >
                <span>{pl.icon}</span> {pl.name.replace('All 150 Tracks', 'All 150')} ({pl.count})
              </button>
            );
          })}
        </div>

        {/* Scrollable 150-Track Queue List */}
        <div className="space-y-1 max-h-[175px] sm:max-h-[190px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-surface-700">
          {filteredQueue.map((tr) => {
            const isCurrent = currentTrack.id === tr.id;
            const trTheme = tr.themeColor || activeColor;
            return (
              <div
                key={tr.id}
                onClick={() => handleSelectTrack(tr.id)}
                style={{
                  backgroundColor: isCurrent ? `${trTheme}20` : undefined,
                  borderColor: isCurrent ? `${trTheme}60` : 'transparent'
                }}
                className={`px-2 py-1.5 rounded-xl flex items-center justify-between cursor-pointer transition-all border group ${
                  isCurrent
                    ? 'text-white shadow-md'
                    : 'hover:bg-white/[0.05] text-slate-300 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {/* Track Number / Equalizer */}
                  {isCurrent ? (
                    <div className="flex items-center gap-0.5 w-4 justify-center shrink-0">
                      <span style={{ backgroundColor: trTheme }} className="w-0.5 h-3 animate-pulse" />
                      <span style={{ backgroundColor: trTheme }} className="w-0.5 h-2 animate-pulse delay-75" />
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500 w-4 text-center shrink-0">
                      {tr.id}
                    </span>
                  )}

                  {/* Album Cover Art Thumbnail */}
                  <div className="w-7 h-7 rounded-lg overflow-hidden bg-surface-900 border border-white/10 shrink-0 relative">
                    {tr.coverUrl ? (
                      <img 
                        src={tr.coverUrl} 
                        alt={tr.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px]">
                        <Music className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    )}
                  </div>

                  {/* Title & Artist */}
                  <div className="overflow-hidden">
                    <p 
                      style={{ color: isCurrent ? trTheme : undefined }}
                      className={`text-xs font-display font-semibold truncate leading-tight ${!isCurrent ? 'text-white' : ''}`}
                    >
                      {tr.title}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400 truncate">
                      {tr.artist}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono text-slate-500">
                    {tr.duration}
                  </span>
                  <div 
                    style={{ backgroundColor: isCurrent ? trTheme : undefined }}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border border-white/10 text-[10px] transition-colors ${
                      isCurrent ? 'text-black font-bold' : 'text-slate-400 group-hover:text-white'
                    }`}
                  >
                    {isCurrent && isPlaying ? <Pause className="w-2.5 h-2.5 fill-current" /> : <Play className="w-2.5 h-2.5 fill-current ml-0.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
