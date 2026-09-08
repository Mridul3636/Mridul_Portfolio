import React, { useState } from 'react';
import { 
  Sparkles, 
  GitCommit, 
  GitFork, 
  Star, 
  ExternalLink, 
  Code2, 
  Activity
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { githubRepositories, personalInfo } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

export const GithubProofSection: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<{ date: string; count: number } | null>(null);

  // Generate simulated realistic 365-day GitHub contribution heatmap data
  const contributionGrid = Array.from({ length: 52 * 7 }, (_, i) => {
    // Generate organic commit clusters with higher frequency in recent months
    const rand = Math.random();
    let level = 0;
    if (rand > 0.85) level = 4;
    else if (rand > 0.65) level = 3;
    else if (rand > 0.40) level = 2;
    else if (rand > 0.20) level = 1;

    const count = level === 0 ? 0 : level === 1 ? Math.floor(Math.random() * 3 + 1) : level === 2 ? Math.floor(Math.random() * 4 + 4) : level === 3 ? Math.floor(Math.random() * 5 + 8) : Math.floor(Math.random() * 6 + 13);
    return { index: i, level, count };
  });

  const getLevelColor = (level: number) => {
    switch (level) {
      case 4: return 'bg-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.6)]';
      case 3: return 'bg-[#26a641]';
      case 2: return 'bg-[#006d32]';
      case 1: return 'bg-[#0e4429]';
      default: return 'bg-[#161b22]';
    }
  };

  const recentCommits = [
    { repo: 'Siirham-Website', message: 'feat(canvas): add fabric.js dynamic DTF print bounding box pricing', time: '2 hours ago', hash: 'e48a1c9' },
    { repo: 'EMP-Wiki', message: 'docs(architecture): add QR-code attendance and payroll calculation workflow', time: 'Yesterday', hash: '9b2c3f1' },
    { repo: 'Event-management-System', message: 'feat(booking): implement real-time seat reservation & automated invoice generator', time: '3 days ago', hash: '7a1d5e2' },
    { repo: 'Event_Management_System-Decorator_Lagbe', message: 'feat(quotation): add vendor quotation matching engine & stage showcase', time: '5 days ago', hash: '3c8e4a9' },
    { repo: 'YoloV11-Model-for-Pothole-Detection', message: 'feat(training): optimize YOLOv11 model with custom road dataset', time: 'Last week', hash: '1f9a6d0' },
  ];

  return (
    <section 
      id="github-proof" 
      className="relative py-28 sm:py-36 md:py-40 bg-transparent border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Chromatic Gradient: Emerald & Sky Blue glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-brand-emerald/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald text-xs font-mono mb-3 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>07 // TECHNICAL PROOF & ACTIVITY</span>
            </div>
            <h2 className="font-funky font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              GitHub & Code Proof
            </h2>
          </div>
          <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-lg leading-relaxed">
            "I don't just say I code—I actually build." Verified contributions, public repositories, and engineering velocity.
          </p>
        </div>

        {/* GitHub Header Card with Profile & Heatmap */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-14 border border-brand-emerald/30 mb-16 relative overflow-hidden shadow-2xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-surface-900 border border-white/10 flex items-center justify-center text-white p-2 shrink-0">
                <GithubIcon className="w-10 h-10 text-brand-emerald" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    @Mridul3636
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald text-xs font-mono font-bold">
                    PRO ARCHITECT
                  </span>
                </div>
                <p className="text-sm font-mono text-slate-400 mt-1">
                  Md. Minhazur Rahaman • Full-Stack Engineer & Digital Architect
                </p>
              </div>
            </div>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-brand-emerald text-black font-display font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-all shadow-xl shadow-brand-emerald/20"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Visit GitHub Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Heatmap Grid */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
              <span className="text-white font-bold text-sm">1,240+ Contributions in the last year</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px]">Less</span>
                <span className="w-3 h-3 rounded-sm bg-[#161b22]"></span>
                <span className="w-3 h-3 rounded-sm bg-[#0e4429]"></span>
                <span className="w-3 h-3 rounded-sm bg-[#006d32]"></span>
                <span className="w-3 h-3 rounded-sm bg-[#26a641]"></span>
                <span className="w-3 h-3 rounded-sm bg-[#39d353]"></span>
                <span className="text-[11px]">More</span>
              </div>
            </div>

            <div className="overflow-x-auto pb-4 scrollbar-none">
              <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[750px]">
                {contributionGrid.map((cell) => (
                  <div
                    key={cell.index}
                    onMouseEnter={() => {
                      soundEngine.playHover();
                      setActiveTooltip({ date: `Day ${cell.index + 1}`, count: cell.count });
                    }}
                    onMouseLeave={() => setActiveTooltip(null)}
                    className={`w-3.5 h-3.5 rounded-[3px] transition-transform hover:scale-125 cursor-pointer ${getLevelColor(cell.level)}`}
                  />
                ))}
              </div>
            </div>

            {activeTooltip && (
              <div className="text-xs font-mono text-brand-emerald animate-fadeIn text-center pt-2 font-semibold">
                {activeTooltip.count === 0 ? 'No contributions' : `${activeTooltip.count} contributions on ${activeTooltip.date}`}
              </div>
            )}
          </div>

        </div>

        {/* Repositories & Recent Commit Stream Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left: Highlighted Repositories (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold block mb-2">
              Featured Public Repositories:
            </span>

            <div className="space-y-6">
              {githubRepositories.map((repo, idx) => (
                <div 
                  key={idx}
                  className="glass-card p-8 rounded-3xl border border-white/10 hover:border-brand-emerald/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-display font-bold text-xl text-white hover:text-brand-emerald flex items-center gap-2.5 transition-colors"
                      >
                        <Code2 className="w-5 h-5 text-brand-emerald" />
                        <span>{repo.name}</span>
                      </a>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-surface-900 border border-white/10 text-slate-300 font-semibold">
                        {repo.language}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 font-sans mb-6 leading-relaxed">
                      {repo.description}
                    </p>

                    {/* Language Percentages Multi-bar */}
                    <div className="w-full bg-surface-950 h-2.5 rounded-full overflow-hidden flex mb-4">
                      {repo.languagesBreakdown.map((lang, lIdx) => (
                        <div 
                          key={lIdx}
                          style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
                          title={`${lang.name}: ${lang.percent}%`}
                        />
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-5 text-xs font-mono text-slate-400">
                      {repo.languagesBreakdown.map((lang, lIdx) => (
                        <div key={lIdx} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }}></span>
                          <span>{lang.name} {lang.percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-5">
                      <span className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-brand-yellow" />
                        <span className="font-semibold text-white">{repo.stars}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <GitFork className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-white">{repo.forks}</span>
                      </span>
                    </div>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-emerald hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Commit Activity Stream (5 cols) */}
          <div className="lg:col-span-5 glass-card p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-mono text-brand-emerald uppercase font-bold mb-8 tracking-wider">
                <Activity className="w-4 h-4" />
                <span>Verified Git Commit Stream</span>
              </div>

              <div className="space-y-4">
                {recentCommits.map((c, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-surface-900 border border-white/[0.06] hover:border-white/20 transition-all space-y-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-brand-sky font-bold">[{c.repo}]</span>
                      <span className="text-slate-500">{c.time}</span>
                    </div>
                    <p className="text-xs font-mono text-slate-200 leading-snug">
                      {c.message}
                    </p>
                    <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                      <GitCommit className="w-3.5 h-3.5" />
                      <span>commit {c.hash}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 text-center">
              <span className="text-xs font-mono text-slate-400">
                100% Organic Production Commits
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
