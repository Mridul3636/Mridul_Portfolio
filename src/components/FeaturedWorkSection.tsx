import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Code2, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert,
  FolderGit2
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { signatureProjects } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

export const FeaturedWorkSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'e-commerce', label: 'E-Commerce & Canvas' },
    { id: 'admin', label: 'ERP & Dashboards' },
    { id: 'web', label: 'Web Applications' },
    { id: 'ai', label: 'Machine Learning & AI' },
    { id: 'swarm', label: 'Agentic AI & Swarms' }
  ];

  const filteredProjects = signatureProjects.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'e-commerce') return p.category.toLowerCase().includes('commerce') || p.category.toLowerCase().includes('canvas');
    if (activeCategory === 'admin') return p.category.toLowerCase().includes('admin') || p.category.toLowerCase().includes('erp');
    if (activeCategory === 'web') return p.category.toLowerCase().includes('web');
    if (activeCategory === 'ai') return p.category.toLowerCase().includes('machine learning') || p.category.toLowerCase().includes('ai');
    if (activeCategory === 'swarm') return p.category.toLowerCase().includes('swarm') || p.category.toLowerCase().includes('agentic');
    return true;
  });

  const handleNext = () => {
    soundEngine.playClick();
    const currentIdx = categories.findIndex(c => c.id === activeCategory);
    const nextIdx = (currentIdx + 1) % categories.length;
    setActiveCategory(categories[nextIdx].id);
  };

  const handlePrev = () => {
    soundEngine.playClick();
    const currentIdx = categories.findIndex(c => c.id === activeCategory);
    const prevIdx = (currentIdx - 1 + categories.length) % categories.length;
    setActiveCategory(categories[prevIdx].id);
  };

  return (
    <section 
      id="featured-work" 
      className="relative py-28 sm:py-36 md:py-40 bg-transparent border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-sky/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
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
              Production systems, intelligent architectures, and full-stack software built for real businesses and clients.
            </p>
          </div>

          {/* Category Filter Carousel Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-2xl bg-surface-900 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all shadow-md"
                title="Previous Category"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-2xl bg-surface-900 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all shadow-md"
                title="Next Category"
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
              key={cat.id}
              onClick={() => {
                soundEngine.playClick();
                setActiveCategory(cat.id);
              }}
              className={`shrink-0 px-4 py-2 rounded-2xl text-xs font-mono transition-all border ${
                activeCategory === cat.id
                  ? 'bg-brand-sky/15 border-brand-sky text-brand-sky font-bold shadow-md'
                  : 'bg-surface-900/60 border-white/[0.08] text-slate-400 hover:text-white hover:bg-surface-850'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Clean Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-3xl border border-white/10 hover:border-brand-sky/40 overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group bg-[#060b17]/90 backdrop-blur-xl"
            >
              <div>
                {/* Visual Project Image Header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-surface-950 border-b border-white/[0.08]">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0c162d] to-[#060c1c] flex items-center justify-center">
                      <Code2 className="w-12 h-12 text-slate-600" />
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060b17] via-[#060b17]/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span 
                      className="px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider border shadow-md backdrop-blur-md"
                      style={{ 
                        backgroundColor: `${project.accent}20`, 
                        color: project.accent, 
                        borderColor: `${project.accent}50` 
                      }}
                    >
                      {project.isCrownJewel ? 'Flagship Project' : project.featuredYear}
                    </span>

                    <div className="w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-md">
                      <Code2 className="w-4 h-4" style={{ color: project.accent }} />
                    </div>
                  </div>

                  {/* Title Bar inside Bottom of Image */}
                  <div className="absolute bottom-3 left-5 right-5 pointer-events-none">
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight group-hover:text-brand-sky transition-colors truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-300 truncate">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="p-6 sm:p-7 space-y-5">
                  
                  {/* Confidential Project Notice for EMP */}
                  {project.isConfidential && (
                    <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-semibold">{project.confidentialNotice || 'Confidential project for that company only'}</span>
                    </div>
                  )}

                  {/* Concise Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Languages Used Breakdown Bar */}
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

              {/* Bottom Action Footer */}
              <div className="p-6 sm:p-7 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3 bg-surface-950/40">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-surface-900 border border-white/10 hover:border-white/30 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-all shadow-sm"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                ) : (
                  <div className="px-4 py-2 rounded-xl bg-surface-900/50 border border-white/5 text-xs font-mono text-slate-500 flex items-center gap-2">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Internal</span>
                  </div>
                )}

                <a
                  href={project.liveUrl || project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-brand-sky/10 border border-brand-sky/30 hover:bg-brand-sky hover:text-black text-xs font-mono text-brand-sky font-semibold flex items-center gap-2 transition-all shadow-sm ml-auto"
                >
                  <span>{project.isConfidential ? 'Live Portal' : 'Live Preview'}</span>
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
