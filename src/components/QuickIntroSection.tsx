import React, { useState } from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  Heart, 
  Target, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

interface QuickIntroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const QuickIntroSection: React.FC<QuickIntroSectionProps> = ({ onNavigate }) => {
  const [activePersona, setActivePersona] = useState<'architect' | 'builder' | 'tinkerer'>('architect');

  const handlePersonaChange = (persona: 'architect' | 'builder' | 'tinkerer') => {
    soundEngine.playClick(750, 0.03);
    setActivePersona(persona);
  };

  const personaContent = {
    architect: {
      title: "Agentic AI Architect & Full-Stack Engineer",
      tagline: "Building autonomous multi-agent networks, scalable zero-bloat APIs, normalized schemas, and sub-second full-stack systems.",
      traits: [
        "Autonomous multi-agent orchestration (Antigravity AI, tool calling, subagents)",
        "10x Engineering velocity with self-healing code synthesis & automated testing",
        "Lightweight PHP 8.x MVC, FastAPI, Python & TypeScript microservices",
        "Hardware-accelerated Fabric.js 2D HTML5 canvas customization studios"
      ],
      color: "from-brand-orange to-brand-amber",
      accent: "#ff6426",
      stat: "10x Agentic Velocity"
    },
    builder: {
      title: "Product Builder & Solution Engineer",
      tagline: "Transforming real-world commercial challenges into elegant, automated digital products that eliminate manual friction.",
      traits: [
        "End-to-end e-commerce platforms with dynamic coupon & discount rules",
        "Granular Role-Based Access Control (RBAC) with SKU inventory matrices",
        "Automated SQA regression test suites ensuring zero production defects",
        "User experience focused on sub-second interactions and high conversion"
      ],
      color: "from-brand-yellow to-brand-sky",
      accent: "#eab308",
      stat: "75% Faster Dispatch"
    },
    tinkerer: {
      title: "Aesthetic Tinkerer & Creative Mind",
      tagline: "Obsessed with cinematic design systems, sound design, anime worldbuilding, and mechanical craftsmanship.",
      traits: [
        "150-track curated soundtrack explorer across 6 distinct moods",
        "Cinematic film & anime universe enthusiast (Nolan, AOT, Cyberpunk)",
        "Passionate about tactile feedback, custom layouts, and audio synthesis",
        "Continuous learner balancing high engineering standards with creative depth"
      ],
      color: "from-brand-pink to-brand-sky",
      accent: "#ec4899",
      stat: "150+ Curated Tracks"
    }
  };

  const current = personaContent[activePersona];

  return (
    <section 
      id="intro" 
      className="relative py-28 sm:py-36 md:py-40 bg-[#02040a] border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Chromatic Gradient: Orange transitioning into Yellow */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-brand-orange/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono mb-3 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 // QUICK INTRODUCTION</span>
            </div>
            <h2 className="font-funky font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Who is Mridul?
            </h2>
          </div>
          <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-lg leading-relaxed">
            Not just a resume summary—an interactive architectural breakdown of who I am, how I think, and what drives my engineering.
          </p>
        </div>

        {/* Interactive Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Card 1: Academic Pedigree & Foundation (4 cols) */}
          <div className="md:col-span-4 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group hover:border-brand-sky/40 transition-all">
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-brand-sky/15 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-sky/10 border border-brand-sky/20 flex items-center justify-center text-brand-sky mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-brand-sky uppercase tracking-wider font-semibold">
                Academic Foundation
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-1.5 mb-2">
                {personalInfo.university}
              </h3>
              <p className="text-xs font-mono text-slate-200 mb-4 font-semibold">
                {personalInfo.degree}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                Graduated with a deep foundation in Data Structures, Relational Database Management Systems (DBMS), Software Engineering principles, and Artificial Intelligence.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Class of 2024</span>
              <span className="text-brand-sky font-semibold">Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Card 2: Interactive Persona Switcher (8 cols) */}
          <div className="md:col-span-8 glass-card p-8 sm:p-10 lg:p-12 rounded-3xl relative overflow-hidden border border-white/10 flex flex-col justify-between">
            <div>
              {/* Persona Switcher Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  Interactive Mindset Mode:
                </span>
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface-900 border border-white/10">
                  <button
                    onClick={() => handlePersonaChange('architect')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                      activePersona === 'architect'
                        ? 'bg-brand-orange text-black font-bold shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Architect
                  </button>
                  <button
                    onClick={() => handlePersonaChange('builder')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                      activePersona === 'builder'
                        ? 'bg-brand-yellow text-black font-bold shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Builder
                  </button>
                  <button
                    onClick={() => handlePersonaChange('tinkerer')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                      activePersona === 'tinkerer'
                        ? 'bg-brand-pink text-black font-bold shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Tinkerer
                  </button>
                </div>
              </div>

              {/* Dynamic Persona Details */}
              <div className="mt-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    {current.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-brand-orange">
                    {current.stat}
                  </span>
                </div>
                <p className="text-base text-slate-300 font-sans mb-8 leading-relaxed">
                  {current.tagline}
                </p>

                {/* Traits Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {current.traits.map((trait, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-2xl bg-surface-900/60 border border-white/[0.06] flex items-start gap-3"
                    >
                      <Zap className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                      <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                        {trait}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Link */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-400">
                Philosophy: Zero Bloat • Sub-Second Speed • Pixel Precision
              </span>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onNavigate('capabilities');
                }}
                className="text-xs font-mono font-semibold text-brand-orange hover:text-brand-yellow flex items-center gap-2 transition-colors"
              >
                <span>Explore Capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Problem Solver & DNA (6 cols) */}
          <div className="md:col-span-6 glass-card p-8 sm:p-10 rounded-3xl hover:border-brand-yellow/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow mb-8">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono text-brand-yellow uppercase tracking-wider font-semibold">
                Engineering DNA
              </span>
              <h3 className="font-display font-bold text-2xl text-white mt-2 mb-3">
                Full-Stack Problem Solver
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                I don't just write lines of code—I solve bottlenecks. From creating an in-browser 2D tailoring studio to reducing order dispatch time by 75% via Pathao REST APIs, I connect business requirements with rock-solid technical execution.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <span className="px-3.5 py-1.5 rounded-xl bg-surface-900 border border-white/10 text-xs font-mono text-slate-200">
                ✓ Full-Stack MVC
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-surface-900 border border-white/10 text-xs font-mono text-slate-200">
                ✓ RESTful Integrations
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-surface-900 border border-white/10 text-xs font-mono text-slate-200">
                ✓ Automated SQA Testing
              </span>
            </div>
          </div>

          {/* Card 4: Beyond The Code Teaser (6 cols) */}
          <div className="md:col-span-6 glass-card p-8 sm:p-10 rounded-3xl hover:border-brand-pink/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center text-brand-pink mb-8">
                <Heart className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono text-brand-pink uppercase tracking-wider font-semibold">
                Personal Universe
              </span>
              <h3 className="font-display font-bold text-2xl text-white mt-2 mb-3">
                Life Outside The Terminal
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Deeply passionate about music (150+ curated tracks from Michael Jackson to Brazilian Phonk), cinematic storytelling (Christopher Nolan, Breaking Bad), anime worldbuilding, and mechanical keyboards.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span>🎵 150 Tracks</span>
                <span>•</span>
                <span>🎬 Cinema</span>
                <span>•</span>
                <span>🍿 Anime</span>
              </div>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onNavigate('soundtrack');
                }}
                className="text-xs font-mono text-brand-pink font-semibold hover:underline flex items-center gap-1.5"
              >
                <span>Jump to Sound</span>
                <span>→</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
