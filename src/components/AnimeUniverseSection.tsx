import React, { useState, useRef, useEffect } from 'react';
import { 
  Tv, 
  Star, 
  Quote, 
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { animeList } from '../data/entertainmentData';
import type { AnimeItem } from '../types';
import { soundEngine } from '../utils/soundEngine';

export const AnimeUniverseSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const checkScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = tabsContainerRef.current;
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

  const handleScrollTabs = (direction: 'left' | 'right') => {
    soundEngine.playClick();
    if (tabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  const categories = ['All', 'Favorites', 'Currently Watching', 'Completed', 'Highly Rated'];

  const filteredAnime = selectedCategory === 'All'
    ? animeList
    : animeList.filter(a => a.category === selectedCategory);

  const handleOpenModal = (anime: AnimeItem) => {
    soundEngine.playClick();
    setSelectedAnime(anime);
  };

  const handleCloseModal = () => {
    soundEngine.playClick();
    setSelectedAnime(null);
  };

  return (
    <section 
      id="anime" 
      className="relative py-28 sm:py-36 md:py-40 bg-transparent border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Chromatic Gradient: Pink + Orange accent */}
      <div className="absolute top-1/4 right-10 w-[600px] h-[600px] bg-brand-orange/15 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-brand-pink/15 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono mb-4 tracking-wider uppercase">
              <Tv className="w-3.5 h-3.5" />
              <span>11 // ANIME UNIVERSE</span>
            </div>
            <h2 className="font-funky font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              My Anime Universe
            </h2>
          </div>
          <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-lg leading-relaxed">
            Worldbuilding, complex psychology, and timeless philosophical conflicts that fuel my creative imagination.
          </p>
        </div>

        {/* Category Tabs with Scroll Arrows */}
        <div className="relative mb-10 group">
          {/* Floating Left Arrow */}
          <button
            onClick={() => handleScrollTabs('left')}
            disabled={!canScrollLeft}
            className={`absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#080e1a]/95 border border-white/20 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-200 ${
              canScrollLeft 
                ? 'opacity-100 hover:scale-110 hover:border-brand-orange hover:text-brand-orange active:scale-95 shadow-brand-orange/40' 
                : 'opacity-0 pointer-events-none'
            }`}
            title="Scroll categories left"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Left Fade */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-[#02040a] via-[#02040a]/80 to-transparent z-10 pointer-events-none rounded-l-2xl" />
          )}

          {/* Scrollable Tabs */}
          <div 
            ref={tabsContainerRef}
            className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none px-1 scroll-smooth"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`shrink-0 px-5 py-3 rounded-2xl text-xs font-mono transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-r from-brand-orange to-brand-pink text-black font-bold shadow-lg shadow-brand-orange/20 scale-[1.02]'
                      : 'bg-surface-900/60 border-white/[0.08] text-slate-400 hover:text-white hover:bg-surface-850'
                  }`}
                >
                  {cat}
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
            onClick={() => handleScrollTabs('right')}
            disabled={!canScrollRight}
            className={`absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#080e1a]/95 border border-white/20 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-200 ${
              canScrollRight 
                ? 'opacity-100 hover:scale-110 hover:border-brand-orange hover:text-brand-orange active:scale-95 shadow-brand-orange/40' 
                : 'opacity-0 pointer-events-none'
            }`}
            title="Scroll categories right"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Anime Cards Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAnime.map((anime) => (
            <div
              key={anime.id}
              onClick={() => handleOpenModal(anime)}
              className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-brand-orange/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Poster Graphic Simulation */}
                <div 
                  className={`w-full h-48 rounded-2xl bg-gradient-to-br ${anime.posterBg} p-5 flex flex-col justify-between relative overflow-hidden mb-6 border border-white/10 group-hover:scale-[1.02] transition-transform shadow-md`}
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full font-bold bg-black/60 backdrop-blur-md"
                      style={{ color: anime.posterColor }}
                    >
                      {anime.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-yellow-400 flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-current" />
                      {anime.score}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-white/70 block font-medium">
                      {anime.studio}
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                      {anime.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-slate-400 font-sans line-clamp-2 leading-relaxed">
                    "{anime.quote}"
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {anime.genre.slice(0, 2).map((g, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-surface-900 border border-white/10 text-slate-300">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{anime.episodes}</span>
                <span className="text-brand-orange group-hover:underline flex items-center gap-1 font-bold">
                  <span>Explore</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Anime Detail Modal */}
        {selectedAnime && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass-card max-w-xl w-full p-6 sm:p-8 rounded-3xl border border-brand-orange/40 relative animate-fadeIn space-y-6">
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-surface-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedAnime.posterBg} flex items-center justify-center text-white shrink-0 border border-white/20`}
                >
                  <Tv className="w-8 h-8" style={{ color: selectedAnime.posterColor }} />
                </div>
                <div>
                  <span className="text-xs font-mono text-brand-orange font-bold">
                    MAL Rating: {selectedAnime.score} / 10 • {selectedAnime.studio}
                  </span>
                  <h3 className="font-display font-black text-2xl text-white">
                    {selectedAnime.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    {selectedAnime.japaneseTitle} • {selectedAnime.episodes}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-900 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-pink mb-1 font-bold">
                  <Quote className="w-3.5 h-3.5" />
                  <span>Favorite Quote:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-sans italic">
                  "{selectedAnime.quote}"
                </p>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 uppercase font-bold block mb-1">
                  Synopsis:
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {selectedAnime.synopsis}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {selectedAnime.genre.map((g, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-surface-900 border border-white/10 text-xs font-mono text-slate-300">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
