import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Play, 
  Pause,
  FolderDown,
  Image as ImageIcon
} from 'lucide-react';
import { YouTubeIcon } from './Icons';
import type { TrackItem } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface MusicImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackAdded?: (track: TrackItem) => void;
}

export const MusicImporterModal: React.FC<MusicImporterModalProps> = ({
  isOpen,
  onClose,
  onTrackAdded
}) => {
  const [activeTab, setActiveTab] = useState<'url' | 'search'>('url');
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customArtist, setCustomArtist] = useState<string>('');
  const [category, setCategory] = useState<string>('Late Night');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [downloadedTrack, setDownloadedTrack] = useState<TrackItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setError(null);
    setDownloadedTrack(null);
    setIsPlayingPreview(false);

    const queryOrUrl = activeTab === 'url' ? youtubeUrl.trim() : searchQuery.trim();
    if (!queryOrUrl) {
      setError(activeTab === 'url' ? 'Please paste a valid YouTube URL' : 'Please enter a song name or artist to search');
      return;
    }

    setIsLoading(true);
    setStatusMessage(activeTab === 'url' ? 'Connecting to YouTube, extracting audio & original HD thumbnail...' : `Searching YouTube for "${queryOrUrl}"...`);

    try {
      soundEngine.playClick();
      const response = await fetch('/api/download-yt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: queryOrUrl,
          title: customTitle.trim() || undefined,
          artist: customArtist.trim() || undefined,
          playlistCategory: category
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server returned an error');
      }

      setDownloadedTrack(data.track);
      setStatusMessage('Audio & original HD thumbnail downloaded successfully!');
      soundEngine.playSuccess();
      if (onTrackAdded) {
        onTrackAdded(data.track);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to download track. Make sure the local python server is running (python server/music_server.py)');
      soundEngine.playClick();
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviewPlay = () => {
    if (!downloadedTrack) return;
    if (isPlayingPreview) {
      soundEngine.stopMusic();
      setIsPlayingPreview(false);
    } else {
      soundEngine.startMusic(
        downloadedTrack.title,
        downloadedTrack.id,
        downloadedTrack.previewUrl,
        downloadedTrack.themeColor,
        downloadedTrack.artist,
        downloadedTrack.coverUrl
      );
      setIsPlayingPreview(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090f1e] border-2 border-emerald-500/40 shadow-2xl shadow-emerald-950/60 overflow-hidden text-white">
        
        {/* Glow Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 animate-pulse" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 flex items-start justify-between border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
              <YouTubeIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-white">
                  YouTube & Music Studio Downloader
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  AUTO HD
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Download high-quality MP3 + original HD cover thumbnail directly into your portfolio
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-surface-700">
          
          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-surface-900/80 border border-white/10">
            <button
              onClick={() => { setActiveTab('url'); setError(null); }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === 'url'
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <YouTubeIcon className="w-4 h-4 text-red-600" />
              <span>YouTube URL Link</span>
            </button>
            <button
              onClick={() => { setActiveTab('search'); setError(null); }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === 'search'
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Auto Song Search</span>
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-3.5">
            {activeTab === 'url' ? (
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>YouTube Video or Song URL:</span>
                  <span className="text-[10px] text-emerald-400">Audio + HD Thumbnail Extracted</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-red-500">
                    <YouTubeIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                    className="w-full bg-surface-900 border border-white/15 rounded-2xl pl-10 pr-4 py-3 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Song Name / Artist / Keyword:</span>
                  <span className="text-[10px] text-emerald-400">Auto YouTube Search</span>
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Starboy The Weeknd or Arijit Singh Sajni"
                    className="w-full bg-surface-900 border border-white/15 rounded-2xl pl-10 pr-4 py-3 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>
            )}

            {/* Optional Custom Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Custom Title (Optional)
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Auto-detected if blank"
                  className="w-full bg-surface-900/70 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-white/25"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Custom Artist (Optional)
                </label>
                <input
                  type="text"
                  value={customArtist}
                  onChange={(e) => setCustomArtist(e.target.value)}
                  placeholder="Auto-detected if blank"
                  className="w-full bg-surface-900/70 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-white/25"
                />
              </div>
            </div>

            {/* Category Selector */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Playlist Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Late Night">Late Night</option>
                <option value="Forever on Repeat">Forever on Repeat</option>
                <option value="Energy Mode">Energy Mode</option>
                <option value="Soft Hours">Soft Hours</option>
                <option value="Pop Rotation">Pop Rotation</option>
                <option value="Indie Side">Indie Side</option>
              </select>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleDownload}
            disabled={isLoading}
            className={`w-full py-3.5 px-5 rounded-2xl font-mono text-xs font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg ${
              isLoading 
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] shadow-emerald-500/25 cursor-pointer'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Downloading MP3 & HD Thumbnail...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download & Save to Portfolio</span>
              </>
            )}
          </button>

          {/* Status / Error Notifications */}
          {statusMessage && !error && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{statusMessage}</span>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Error: {error}</p>
                <p className="text-[11px] text-slate-400">
                  Tip: Start backend with <code className="text-emerald-300 bg-surface-900 px-1 py-0.5 rounded">python server/music_server.py</code>
                </p>
              </div>
            </div>
          )}

          {/* Downloaded Track Preview Card */}
          {downloadedTrack && (
            <div className="p-4 rounded-2xl bg-[#0e1628] border border-emerald-500/30 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold border-b border-white/[0.08] pb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  SAVED TO PORTFOLIO SOUNDTRACK
                </span>
                <span>Track #{downloadedTrack.id}</span>
              </div>

              <div className="flex items-center gap-3.5">
                {/* Real Downloaded Thumbnail */}
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/20 shrink-0 relative bg-surface-900">
                  {downloadedTrack.coverUrl ? (
                    <img
                      src={downloadedTrack.coverUrl}
                      alt={downloadedTrack.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-slate-500" />
                    </div>
                  )}
                </div>

                <div className="overflow-hidden flex-1">
                  <h4 className="font-display font-bold text-sm text-white truncate">
                    {downloadedTrack.title}
                  </h4>
                  <p className="text-xs font-mono text-slate-400 truncate">
                    {downloadedTrack.artist}
                  </p>
                  <p className="text-[10px] font-mono text-emerald-400 mt-0.5">
                    {downloadedTrack.playlistCategory} • {downloadedTrack.duration} • Local High Fidelity
                  </p>
                </div>

                <button
                  onClick={handlePreviewPlay}
                  className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
                  title={isPlayingPreview ? 'Pause' : 'Test Play'}
                >
                  {isPlayingPreview ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface-950/80 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <FolderDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>Files: public/audio/ & public/audio/covers/</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-surface-900 border border-white/10 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
};
