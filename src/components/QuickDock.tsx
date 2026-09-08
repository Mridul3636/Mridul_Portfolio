import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Sparkles, 
  Layers, 
  FolderGit2, 
  Terminal, 
  Music, 
  Send,
  ArrowUp,
  Volume2,
  VolumeX
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface QuickDockProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const QuickDock: React.FC<QuickDockProps> = ({ activeSection, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const dockItems = [
    { id: 'hero', label: 'Top', icon: ArrowUp },
    { id: 'intro', label: 'About', icon: Sparkles },
    { id: 'capabilities', label: 'Build', icon: Layers },
    { id: 'featured-work', label: 'Work', icon: FolderGit2 },
    { id: 'arsenal', label: 'Skills', icon: Code2 },
    { id: 'soundtrack', label: 'Sound', icon: Music },
    { id: 'terminal', label: 'CLI', icon: Terminal },
    { id: 'contact', label: 'Talk', icon: Send },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-1.5 p-2 rounded-2xl bg-surface-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 animate-fadeIn">
      {dockItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              soundEngine.playClick();
              onNavigate(item.id);
            }}
            title={item.label}
            className={`p-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
              isActive
                ? 'bg-gradient-to-r from-brand-orange to-brand-sky text-black font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden md:inline text-[11px]">{item.label}</span>
          </button>
        );
      })}

      <div className="w-[1px] h-5 bg-white/10 mx-1" />

      <button
        onClick={() => {
          const muted = soundEngine.toggleMute();
          setIsMuted(muted);
        }}
        title={isMuted ? "Unmute sound" : "Mute sound"}
        className="p-2.5 rounded-xl text-slate-400 hover:text-brand-sky hover:bg-white/[0.08] transition-colors"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-sky" />}
      </button>
    </div>
  );
};
