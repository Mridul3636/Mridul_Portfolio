import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Bot, 
  Wrench, 
  CheckCircle2, 
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { arsenalSkills } from '../data/portfolioData';
import type { ArsenalSkill } from '../types';
import { soundEngine } from '../utils/soundEngine';

export const DeveloperArsenalSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<ArsenalSkill>(arsenalSkills[0]);
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

  const categories: { name: string; icon: any; count: number }[] = [
    { name: 'All', icon: Sparkles, count: arsenalSkills.length },
    { name: 'Frontend', icon: Layers, count: arsenalSkills.filter(s => s.category === 'Frontend').length },
    { name: 'Backend', icon: Cpu, count: arsenalSkills.filter(s => s.category === 'Backend').length },
    { name: 'Database', icon: Database, count: arsenalSkills.filter(s => s.category === 'Database').length },
    { name: 'Testing & QA', icon: ShieldCheck, count: arsenalSkills.filter(s => s.category === 'Testing & QA').length },
    { name: 'AI / ML', icon: Bot, count: arsenalSkills.filter(s => s.category === 'AI / ML').length },
    { name: 'DevOps & Tools', icon: Wrench, count: arsenalSkills.filter(s => s.category === 'DevOps & Tools').length },
  ];

  const filteredSkills = selectedCategory === 'All'
    ? arsenalSkills
    : arsenalSkills.filter(s => s.category === selectedCategory);

  const handleSelectSkill = (skill: ArsenalSkill) => {
    soundEngine.playHover();
    setActiveSkill(skill);
  };

  return (
    <section 
      id="arsenal" 
      className="relative py-28 sm:py-36 md:py-40 bg-transparent border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Chromatic Gradient: Violet to Electric Pink */}
      <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-brand-violet/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-brand-pink/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-brand-violet text-xs font-mono mb-3 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>06 // TECHNICAL ECOSYSTEM</span>
            </div>
            <h2 className="font-funky font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Developer Arsenal
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-md leading-relaxed">
              Not a boring list of logos. An interactive technical ecosystem representing real-world architectural experience and production usage.
            </p>

            {/* Quick Header Arrow Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleScrollTabs('left')}
                disabled={!canScrollLeft}
                className={`p-2.5 rounded-xl border transition-all ${
                  canScrollLeft
                    ? 'bg-surface-900 border-white/20 text-white hover:border-brand-pink hover:text-brand-pink hover:scale-105 active:scale-95'
                    : 'bg-surface-950 border-white/5 text-slate-600 cursor-not-allowed opacity-50'
                }`}
                title="Scroll categories left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollTabs('right')}
                disabled={!canScrollRight}
                className={`p-2.5 rounded-xl border transition-all ${
                  canScrollRight
                    ? 'bg-surface-900 border-white/20 text-white hover:border-brand-pink hover:text-brand-pink hover:scale-105 active:scale-95'
                    : 'bg-surface-950 border-white/5 text-slate-600 cursor-not-allowed opacity-50'
                }`}
                title="Scroll categories right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs with Arrow Buttons */}
        <div className="relative mb-10 group">
          {/* Floating Left Arrow */}
          <button
            onClick={() => handleScrollTabs('left')}
            disabled={!canScrollLeft}
            className={`absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#080e1a]/95 border border-white/20 text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 ${
              canScrollLeft 
                ? 'opacity-100 hover:scale-110 hover:border-brand-pink hover:text-brand-pink active:scale-95 shadow-brand-pink/40' 
                : 'opacity-0 pointer-events-none'
            }`}
            title="Scroll categories left"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Left Gradient Fade */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-[#02040a] via-[#02040a]/80 to-transparent z-10 pointer-events-none rounded-l-2xl" />
          )}

          {/* Scrollable Tabs */}
          <div 
            ref={tabsContainerRef}
            className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none px-1 scroll-smooth"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedCategory(cat.name);
                  }}
                  className={`shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-mono transition-all border ${
                    isSelected
                      ? 'bg-surface-800 border-brand-pink text-white font-bold shadow-xl shadow-brand-pink/20 scale-[1.02]'
                      : 'bg-surface-900/60 border-white/[0.08] text-slate-400 hover:text-white hover:bg-surface-850'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-pink' : 'text-slate-500'}`} />
                  <span>{cat.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Gradient Fade */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-[#02040a] via-[#02040a]/80 to-transparent z-10 pointer-events-none rounded-r-2xl" />
          )}

          {/* Floating Right Arrow */}
          <button
            onClick={() => handleScrollTabs('right')}
            disabled={!canScrollRight}
            className={`absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#080e1a]/95 border border-white/20 text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 ${
              canScrollRight 
                ? 'opacity-100 hover:scale-110 hover:border-brand-pink hover:text-brand-pink active:scale-95 shadow-brand-pink/40' 
                : 'opacity-0 pointer-events-none'
            }`}
            title="Scroll categories right"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Galaxy Grid + Real-World Usage Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Interactive Skill Node Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => {
              const isCurrent = activeSkill.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => handleSelectSkill(skill)}
                  onMouseEnter={() => handleSelectSkill(skill)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? 'bg-surface-800 border-brand-pink shadow-xl shadow-brand-pink/20 scale-[1.02]'
                      : 'glass-card hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display font-bold text-base text-white">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-surface-900 border border-white/10 text-slate-300">
                      {skill.category}
                    </span>
                  </div>

                  {/* Proficiency Level Bar */}
                  <div className="w-full bg-surface-900 h-2 rounded-full overflow-hidden mb-3">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-orange via-brand-pink to-brand-sky rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Real-World Usage Inspector Card (5 cols) */}
          <div className="lg:col-span-5 glass-card p-8 sm:p-10 rounded-3xl border border-brand-pink/30 sticky top-28 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 text-brand-pink" />
                <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                  Technical Brain Inspector
                </span>
              </div>
              <span className="text-xs font-mono text-brand-pink font-bold px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20">
                {activeSkill.level}% Proficiency
              </span>
            </div>

            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Selected Technology:
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white mb-2">
                {activeSkill.name}
              </h3>
              <span className="text-xs font-mono text-brand-sky font-semibold block mb-6">
                Category: {activeSkill.category}
              </span>

              {/* How Mridul Uses It in Production */}
              <div className="p-6 rounded-2xl bg-surface-900 border border-white/10 mb-8 shadow-inner">
                <span className="text-xs font-mono text-brand-orange uppercase font-bold block mb-3">
                  How Mridul Uses It in Production:
                </span>
                <p className="text-sm text-slate-200 font-sans leading-relaxed">
                  {activeSkill.howUsed}
                </p>
              </div>

              {/* Verified In Projects */}
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase font-bold tracking-wider block mb-3">
                  Deployed In Key Projects:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {activeSkill.projectsUsedIn.map((proj, idx) => (
                    <span 
                      key={idx}
                      className="px-3.5 py-2 rounded-xl bg-surface-950 border border-white/10 text-xs font-mono text-white flex items-center gap-2 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                      <span>{proj}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Zero boilerplate reliance</span>
              <span className="text-brand-pink font-semibold">Production Battle-Tested</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
