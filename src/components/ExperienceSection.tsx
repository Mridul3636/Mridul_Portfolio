import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  TrendingUp,
  Award
} from 'lucide-react';
import { experienceTimeline } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

export const ExperienceSection: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<string>(experienceTimeline[0].id);

  return (
    <section 
      id="experience" 
      className="relative py-28 sm:py-36 md:py-40 bg-transparent border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Chromatic Gradient: Sky Blue to Violet */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-brand-sky/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-brand-violet/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-sky/10 border border-brand-sky/20 text-brand-sky text-xs font-mono mb-3 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05 // CAREER TIMELINE</span>
            </div>
            <h2 className="font-funky font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Professional Journey
            </h2>
          </div>
          <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-lg leading-relaxed">
            Where I turned academic theory into commercial scale, shipping high-impact software across companies and commercial platforms.
          </p>
        </div>

        {/* Chronological Milestone Journey Cards */}
        <div className="relative">
          
          {/* Vertical Glowing Line */}
          <div className="hidden md:block absolute top-10 bottom-10 left-8 w-[2px] bg-gradient-to-b from-brand-orange via-brand-emerald to-brand-sky opacity-30" />

          <div className="space-y-10">
            {experienceTimeline.map((exp) => {
              const isSelected = selectedExp === exp.id;
              return (
                <div 
                  key={exp.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedExp(exp.id);
                  }}
                  className={`glass-card rounded-3xl p-8 sm:p-10 md:pl-28 relative border transition-all duration-300 cursor-pointer shadow-xl ${
                    isSelected 
                      ? 'border-white/30 bg-surface-850/80 shadow-2xl scale-[1.01]' 
                      : 'border-white/10 hover:border-white/20 bg-surface-900/40'
                  }`}
                >
                  {/* Timeline Glowing Node */}
                  <div 
                    className="hidden md:flex absolute top-10 left-6 w-6 h-6 rounded-full border-2 border-surface-950 items-center justify-center transition-transform shadow-lg"
                    style={{ backgroundColor: exp.accentColor }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  {/* Top Row: Role, Company, Period & Badge */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span 
                          className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase"
                          style={{ backgroundColor: `${exp.accentColor}15`, color: exp.accentColor, borderColor: `${exp.accentColor}40`, borderWidth: 1 }}
                        >
                          {exp.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 font-medium">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-display font-bold text-xl" style={{ color: exp.accentColor }}>
                          {exp.company}
                        </span>
                        <span className="text-slate-500 font-mono text-xs">• {exp.type}</span>
                      </div>
                    </div>

                    {/* Highlight Stat Pill */}
                    <div className="shrink-0 p-4 rounded-2xl bg-surface-900 border border-white/10 flex items-center gap-4 shadow-md">
                      <TrendingUp className="w-6 h-6 text-brand-emerald" />
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold tracking-wider">Key Benchmark</span>
                        <span className="text-base font-display font-bold text-white block">
                          {exp.highlightStat}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Responsibilities & Technologies */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Responsibilities list (8 cols) */}
                    <div className="lg:col-span-8 space-y-4">
                      <span className="text-xs font-mono text-slate-400 uppercase font-bold tracking-wider block mb-3">
                        Key Responsibilities & Deliverables:
                      </span>
                      {exp.responsibilities.map((r, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-3.5">
                          <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-1" />
                          <p className="text-sm text-slate-300 font-sans leading-relaxed">
                            {r}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Technologies & Impact (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                      <div>
                        <span className="text-xs font-mono text-slate-400 uppercase font-bold tracking-wider block mb-3">
                          Production Tech Applied:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((t, tIdx) => (
                            <span 
                              key={tIdx}
                              className="px-3 py-1.5 rounded-xl bg-surface-950 border border-white/10 text-xs font-mono text-slate-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-surface-950/80 border border-white/10 shadow-lg">
                        <div className="flex items-center gap-2 text-xs font-mono text-brand-amber font-bold mb-2">
                          <Award className="w-4 h-4" />
                          <span>Business Impact</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                          {exp.impact}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
