import React, { useState } from 'react';
import { 
  Film, 
  Star
} from 'lucide-react';
import { watchList } from '../data/entertainmentData';
import { soundEngine } from '../utils/soundEngine';

export const WatchSection: React.FC = () => {
  const [filterType, setFilterType] = useState<'All' | 'Movie' | 'Series'>('All');

  const filteredMedia = filterType === 'All' 
    ? watchList 
    : watchList.filter(m => m.type === filterType);

  return (
    <section 
      id="movies" 
      className="relative py-28 sm:py-36 md:py-40 bg-[#02040a] border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Chromatic Gradient: Sky Blue + Violet */}
      <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-brand-sky/15 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-brand-violet/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-sky/10 border border-brand-sky/20 text-brand-sky text-xs font-mono mb-4 tracking-wider uppercase">
              <Film className="w-3.5 h-3.5" />
              <span>12 // CINEMA & TELEVISION</span>
            </div>
            <h2 className="font-funky font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              What I Watch
            </h2>
          </div>
          <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-lg leading-relaxed">
            Masterpieces of cinematic direction, high-concept sci-fi paradoxes, and uncompromising character arcs.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {(['All', 'Movie', 'Series'] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                soundEngine.playClick();
                setFilterType(t);
              }}
              className={`px-5 py-3 rounded-2xl text-xs font-mono transition-all border shrink-0 ${
                filterType === t
                  ? 'bg-brand-sky text-black font-bold shadow-lg shadow-brand-sky/20 scale-[1.02]'
                  : 'bg-surface-900/60 border-white/[0.08] text-slate-400 hover:text-white hover:bg-surface-850'
              }`}
            >
              {t === 'All' ? 'All Cinema' : t === 'Movie' ? '🎬 Feature Films' : '📺 TV Masterpieces'}
            </button>
          ))}
        </div>

        {/* Media Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMedia.map((media) => (
            <div
              key={media.id}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-brand-sky/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span 
                    className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                    style={{ backgroundColor: `${media.themeColor}15`, color: media.themeColor, borderColor: `${media.themeColor}30`, borderWidth: 1 }}
                  >
                    {media.type} • {media.year}
                  </span>
                  <span className="text-xs font-mono font-bold text-yellow-400 flex items-center gap-1.5 bg-surface-900 px-2.5 py-1 rounded-full border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {media.rating}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-brand-sky transition-colors mb-1">
                  {media.title}
                </h3>
                <span className="text-xs font-mono text-slate-400 block mb-4">
                  Directed / Created by {media.directorOrCreator}
                </span>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                  {media.synopsis}
                </p>

                {/* Mridul's Verdict */}
                <div className="p-4 rounded-2xl bg-surface-900 border border-white/10 mb-6 shadow-inner">
                  <span className="text-[10px] font-mono text-brand-sky uppercase font-bold block mb-1 tracking-wider">
                    Mridul's Take:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                    {media.mridulVerdict}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {media.genres.map((g, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-surface-950 text-[10px] font-mono text-slate-400">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
