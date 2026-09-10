import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  Send,
  Download
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [isPlaying, setIsPlaying] = useState(soundEngine.isPlaying());
  const [dhakaTime, setDhakaTime] = useState('');

  // Subscribe to SoundEngine for live mute and playing state
  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(state => {
      setIsMuted(state.isMuted);
      setIsPlaying(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setDhakaTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (sectionId: string) => {
    soundEngine.playClick();
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  const handleToggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { id: 'hero', label: 'Identity' },
    { id: 'intro', label: 'About' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'featured-work', label: 'Work' },
    { id: 'experience', label: 'Journey' },
    { id: 'arsenal', label: 'Arsenal' },
    { id: 'github-proof', label: 'Proof' },
    { id: 'beyond-code', label: 'Beyond Code' },
    { id: 'soundtrack', label: 'Soundtrack' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-[#02040a]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/70' 
          : 'py-4 sm:py-6 bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-8 md:px-10 lg:px-12 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <button 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 sm:gap-3.5 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-brand-orange via-brand-pink to-brand-sky p-[1px] transition-transform duration-300 group-hover:scale-105 shrink-0">
            <div className="w-full h-full bg-[#070c18] rounded-[15px] flex items-center justify-center overflow-hidden p-1">
              <img src="/favicon.png" alt="Md. Minhazur Rahaman Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-display font-bold text-xs sm:text-base tracking-wide text-white group-hover:text-brand-orange transition-colors truncate">
                Md. Minhazur Rahaman
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/20 shrink-0">
                v2.4
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block truncate">
              Software Engineer & Intelligent Systems Specialist
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-orange to-brand-amber text-white shadow-lg shadow-brand-orange/25 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side Actions: Live Clock, Audio Toggle, CV Button, CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-900 border border-white/[0.08] text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span>
            <span>Dhaka {dhakaTime || 'UTC+6'}</span>
          </div>

          <a
            href={personalInfo.cvUrl}
            download="Md_Minhazur_Rahaman_CV.pdf"
            onClick={() => soundEngine.playSuccess()}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-surface-900 border border-white/10 text-slate-200 hover:text-brand-emerald hover:border-brand-emerald/40 text-xs font-mono font-semibold transition-all shadow-sm group"
            title="Download CV"
          >
            <Download className="w-3.5 h-3.5 text-brand-emerald group-hover:scale-110 transition-transform" />
            <span>CV</span>
          </a>

          {/* Speaker Mute / Unmute Button (Navbar Top-Right) */}
          <button
            onClick={handleToggleAudio}
            title={isMuted ? "Click to Unmute sound" : "Click to Mute sound"}
            className={`p-2 sm:p-2.5 rounded-2xl border transition-all cursor-pointer ${
              isMuted 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20' 
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className={`w-4 h-4 text-emerald-400 ${isPlaying ? 'animate-pulse' : ''}`} />
            )}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs font-display font-bold bg-gradient-to-r from-brand-orange via-brand-amber to-brand-sky text-black hover:opacity-95 transition-all shadow-md shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Let's Talk</span>
            <Send className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 sm:p-2.5 rounded-2xl bg-surface-900 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-brand-orange" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#070c18]/98 backdrop-blur-2xl border-b border-white/10 p-5 shadow-2xl transition-all max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col gap-2">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-1">
              <span className="text-xs font-mono text-slate-400">Navigation Hub</span>
              <span className="text-xs font-mono text-brand-orange">Dhaka: {dhakaTime || 'UTC+6'}</span>
            </div>

            {/* Mobile Actions: Download CV + Let's Talk */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <a
                href={personalInfo.cvUrl}
                download="Md_Minhazur_Rahaman_CV.pdf"
                onClick={() => {
                  soundEngine.playSuccess();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-surface-850 border border-brand-emerald/30 text-emerald-400 text-xs font-mono font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </a>

              <button
                onClick={() => handleNavClick('contact')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-black text-xs font-mono font-bold"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Let's Talk</span>
              </button>
            </div>

            {/* Navigation Links */}
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold'
                      : 'text-slate-300 hover:bg-white/[0.06]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs opacity-50 font-mono">→</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
