import React, { useState } from 'react';
import { 
  Music, 
  Film, 
  Tv, 
  Laptop, 
  Palette, 
  Dumbbell, 
  ArrowRight,
  Headphones,
  Heart
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface BeyondCodeSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const BeyondCodeSection: React.FC<BeyondCodeSectionProps> = ({ onNavigate }) => {
  const [activeWorld, setActiveWorld] = useState<string>('music');

  const worlds = [
    {
      id: 'music',
      title: 'My Soundtrack',
      subtitle: '150+ Curated Tracks',
      icon: Headphones,
      badge: 'Interactive Audio Hub',
      color: 'from-pink-500 to-sky-400',
      accent: '#ec4899',
      description: 'Music is the fuel of my code. From late-night Cigarettes After Sex reverie to high-octane Brazilian Phonk, Michael Jackson classics, and soft Hindi acoustic poetry.',
      actionLabel: 'Launch Soundtrack Experience',
      targetSection: 'soundtrack'
    },
    {
      id: 'anime',
      title: 'My Anime Universe',
      subtitle: 'Epic Storytelling & Philosophy',
      icon: Tv,
      badge: 'Curated Gallery',
      color: 'from-orange-500 to-red-500',
      accent: '#ff6426',
      description: 'Obsessed with multi-layered worldbuilding, character depth, and philosophical conflicts in Attack on Titan, Vinland Saga, Steins;Gate, and Cyberpunk: Edgerunners.',
      actionLabel: 'Explore Anime Universe',
      targetSection: 'anime'
    },
    {
      id: 'movies',
      title: 'What I Watch',
      subtitle: 'Cinematic Masterpieces & TV',
      icon: Film,
      badge: 'Cinema Vault',
      color: 'from-sky-400 to-purple-600',
      accent: '#38bdf8',
      description: 'Christopher Nolan mind-benders, airtight time paradoxes (Dark), gritty transformations (Breaking Bad), and authentic cyber thrillers (Mr. Robot).',
      actionLabel: 'Browse Movie & TV Vault',
      targetSection: 'movies'
    },
    {
      id: 'tech',
      title: 'Tech & Hardware',
      subtitle: 'Custom Keyboards & Linux',
      icon: Laptop,
      badge: 'Craftsmanship',
      color: 'from-emerald-400 to-teal-500',
      accent: '#10b981',
      description: 'Tinkering with mechanical switches, custom keycaps, clean UNIX environments, terminal dotfiles, and minimal workspace ergonomics.',
      actionLabel: 'Explore Developer CLI',
      targetSection: 'terminal'
    },
    {
      id: 'design',
      title: 'Visual Design & Motion',
      subtitle: 'Typography & Micro-Physics',
      icon: Palette,
      badge: 'Aesthetic Sense',
      color: 'from-yellow-400 to-amber-500',
      accent: '#eab308',
      description: 'Belief that digital products must feel tactile and memorable. Combining bold Swiss typography, subtle luminous chromatic lighting, and fluid motion physics.',
      actionLabel: 'View Capabilities',
      targetSection: 'capabilities'
    },
    {
      id: 'fitness',
      title: 'Fitness & Discipline',
      subtitle: 'Physical & Mental Endurance',
      icon: Dumbbell,
      badge: 'Life Balance',
      color: 'from-rose-500 to-pink-600',
      accent: '#f43f5e',
      description: 'Consistent strength training, mental clarity, and discipline that translates directly into endurance during complex architectural problem solving.',
      actionLabel: 'Connect with Mridul',
      targetSection: 'contact'
    }
  ];

  const current = worlds.find(w => w.id === activeWorld) || worlds[0];
  const CurrentIcon = current.icon;

  return (
    <section 
      id="beyond-code" 
      className="relative py-28 sm:py-36 md:py-40 bg-transparent border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Chromatic Gradient: Pink + Sky Blue + subtle Orange */}
      <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-brand-pink/15 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-brand-sky/15 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-mono mb-4 tracking-wider uppercase">
              <Heart className="w-3.5 h-3.5" />
              <span>09 // PERSONAL UNIVERSE</span>
            </div>
            <h2 className="font-funky font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Beyond Code
            </h2>
            <p className="text-brand-pink font-mono text-sm sm:text-base mt-2 font-semibold">
              "There's more to me than code."
            </p>
          </div>
          <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-lg leading-relaxed">
            The music, cinema, anime, and creative crafts that shape my taste, discipline, and creative perspective.
          </p>
        </div>

        {/* 6 World Navigation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {worlds.map((w) => {
            const Icon = w.icon;
            const isSelected = activeWorld === w.id;
            return (
              <button
                key={w.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveWorld(w.id);
                }}
                className={`p-5 rounded-3xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[130px] ${
                  isSelected
                    ? 'bg-surface-800 border-brand-pink shadow-xl shadow-brand-pink/20 scale-[1.03]'
                    : 'glass-card hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-6 h-6" style={{ color: w.accent }} />
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {w.badge}
                  </span>
                </div>
                <div>
                  <span className="font-display font-bold text-sm sm:text-base text-white block">
                    {w.title}
                  </span>
                  <span className="text-xs font-mono text-slate-400 block truncate mt-0.5">
                    {w.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Spotlight Showcase of Selected World */}
        <div className="glass-card p-6 sm:p-10 lg:p-12 rounded-3xl border border-brand-pink/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg"
                style={{ backgroundColor: `${current.accent}20`, borderColor: `${current.accent}40`, borderWidth: 1 }}
              >
                <CurrentIcon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: current.accent }} />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  {current.subtitle}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  {current.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
              {current.description}
            </p>

            <button
              onClick={() => {
                soundEngine.playClick();
                onNavigate(current.targetSection);
              }}
              className="px-8 py-3.5 rounded-2xl font-display font-bold text-xs sm:text-sm flex items-center gap-2.5 text-black transition-all shadow-xl shadow-brand-pink/20 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: current.accent }}
            >
              <span>{current.actionLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Shortcuts Bar */}
          <div className="shrink-0 flex flex-col gap-4 w-full md:w-80">
            <button
              onClick={() => onNavigate('soundtrack')}
              className="px-6 py-4 rounded-2xl bg-surface-900 border border-white/10 hover:border-brand-pink text-xs sm:text-sm font-mono text-slate-200 flex items-center justify-between gap-4 transition-all shadow-md"
            >
              <div className="flex items-center gap-3">
                <Music className="w-5 h-5 text-brand-pink" />
                <span>150-Track Soundtrack</span>
              </div>
              <span className="text-slate-500">→</span>
            </button>

            <button
              onClick={() => onNavigate('anime')}
              className="px-6 py-4 rounded-2xl bg-surface-900 border border-white/10 hover:border-brand-orange text-xs sm:text-sm font-mono text-slate-200 flex items-center justify-between gap-4 transition-all shadow-md"
            >
              <div className="flex items-center gap-3">
                <Tv className="w-5 h-5 text-brand-orange" />
                <span>Anime Universe</span>
              </div>
              <span className="text-slate-500">→</span>
            </button>

            <button
              onClick={() => onNavigate('movies')}
              className="px-6 py-4 rounded-2xl bg-surface-900 border border-white/10 hover:border-brand-sky text-xs sm:text-sm font-mono text-slate-200 flex items-center justify-between gap-4 transition-all shadow-md"
            >
              <div className="flex items-center gap-3">
                <Film className="w-5 h-5 text-brand-sky" />
                <span>Movies & Series</span>
              </div>
              <span className="text-slate-500">→</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
