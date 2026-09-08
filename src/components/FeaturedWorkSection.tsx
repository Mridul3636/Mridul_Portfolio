import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Code2, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { signatureProjects } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

export const FeaturedWorkSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Client Systems', 'Agentic AI & Swarms', 'Admin Dashboards & ERP', 'Testing & SQA Automation'];

  const filteredProjects = activeCategory === 'all'
    ? signatureProjects
    : signatureProjects.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const handleNext = () => {
    soundEngine.playClick();
    const currentIdx = categories.indexOf(activeCategory);
    const nextIdx = (currentIdx + 1) % categories.length;
    setActiveCategory(categories[nextIdx]);
  };

  const handlePrev = () => {
    soundEngine.playClick();
    const currentIdx = categories.indexOf(activeCategory);
    const prevIdx = (currentIdx - 1 + categories.length) % categories.length;
    setActiveCategory(categories[prevIdx]);
  };

  return (
    <section 
      id="featured-work" 
      className="relative py-28 sm:py-36 md:py-40 bg-[#02040a] border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-sky/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-sky/10 border border-brand-sky/20 text-brand-sky text-xs font-mono mb-4 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04 // SIGNATURE BUILDS</span>
            </div>
            <h2 className="font-funky font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="text-slate-400 font-sans text-sm sm:text-base mt-2 max-w-xl">
              Real builds where competitive-programming mindset meets production software engineering.
            </p>
          </div>

          {/* Category Filter Pills & Carousel Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-2xl bg-surface-900 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all shadow-md"
                title="Previous Project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-2xl bg-surface-900 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all shadow-md"
                title="Next Project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick();
                setActiveCategory(cat);
              }}
              className={`shrink-0 px-4 py-2 rounded-2xl text-xs font-mono transition-all border ${
                activeCategory === cat
                  ? 'bg-brand-sky/15 border-brand-sky text-brand-sky font-bold shadow-md'
                  : 'bg-surface-900/60 border-white/[0.08] text-slate-400 hover:text-white hover:bg-surface-850'
              }`}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        {/* Clean Project Cards Grid (Exact Style of Screenshot 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-3xl border border-white/10 hover:border-brand-sky/40 overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group bg-[#060b17]/90 backdrop-blur-xl"
            >
              <div>
                {/* Visual Top Header Banner (Screenshot 3 style) */}
                <div className="p-6 sm:p-7 bg-gradient-to-br from-[#0c162d] to-[#060c1c] border-b border-white/[0.08] relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                  {/* Subtle Background Accent Glow */}
                  <div 
                    className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-30"
                    style={{ backgroundColor: project.accent }}
                  />

                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-surface-900/90 border border-white/10 flex items-center justify-center text-brand-sky shadow-inner">
                      <Code2 className="w-6 h-6" style={{ color: project.accent }} />
                    </div>

                    <span 
                      className="px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider border shadow-sm"
                      style={{ 
                        backgroundColor: `${project.accent}15`, 
                        color: project.accent, 
                        borderColor: `${project.accent}40` 
                      }}
                    >
                      {project.isCrownJewel ? '⭐ Client Project' : project.featuredYear}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight group-hover:text-brand-sky transition-colors truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 truncate mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="p-6 sm:p-7 space-y-6">
                  
                  {/* Concise Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Languages Used Breakdown Bar (Screenshot 3 match) */}
                  {project.languagesBreakdown && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400 font-medium">Languages Used:</span>
                        <span className="text-slate-300 font-semibold">
                          {project.languagesBreakdown[0].name} ({project.languagesBreakdown[0].percent}%)
                        </span>
                      </div>

                      {/* Multi-Segment Progress Bar */}
                      <div className="w-full h-2 rounded-full overflow-hidden bg-surface-900 flex">
                        {project.languagesBreakdown.map((lang, idx) => (
                          <div
                            key={idx}
                            style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
                            className="h-full first:rounded-l-full last:rounded-r-full"
                            title={`${lang.name}: ${lang.percent}%`}
                          />
                        ))}
                      </div>

                      {/* Legend Dots */}
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[10px] font-mono text-slate-400">
                        {project.languagesBreakdown.map((lang, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                            <span>{lang.name} {lang.percent}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 5).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-surface-900/90 border border-white/[0.08] text-[11px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              </div>

              {/* Bottom Action Footer (Screenshot 3 match) */}
              <div className="p-6 sm:p-7 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3 bg-surface-950/40">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-surface-900 border border-white/10 hover:border-white/30 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-all shadow-sm"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  href={project.liveUrl || project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-brand-sky/10 border border-brand-sky/30 hover:bg-brand-sky hover:text-black text-xs font-mono text-brand-sky font-semibold flex items-center gap-2 transition-all shadow-sm"
                >
                  <span>Live Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
