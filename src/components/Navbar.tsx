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
  const [dhakaTime, setDhakaTime] = useState('');

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
          ? 'py-3.5 bg-[#02040a]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/60' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <button 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3.5 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-orange via-brand-pink to-brand-sky p-[1px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#070c18] rounded-[15px] flex items-center justify-center overflow-hidden p-1">
              <img src="/favicon.png" alt="Mridul Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base tracking-wider text-white group-hover:text-brand-orange transition-colors">
                MRIDUL
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Full Stack Architect
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
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
        <div className="flex items-center gap-3">
          
          <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-900 border border-white/[0.08] text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span>
            <span>Dhaka {dhakaTime || 'UTC+6'}</span>
          </div>

          <a
            href={personalInfo.cvUrl}
            download="Mridul_CV.pdf"
            onClick={() => soundEngine.playSuccess()}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-surface-900 border border-white/10 text-slate-200 hover:text-brand-emerald hover:border-brand-emerald/40 text-xs font-mono font-semibold transition-all shadow-sm group"
            title="Download Mridul's CV"
          >
            <Download className="w-3.5 h-3.5 text-brand-emerald group-hover:scale-110 transition-transform" />
            <span>CV</span>
          </a>

          <button
            onClick={handleToggleAudio}
            title={isMuted ? "Unmute audio effects" : "Mute audio effects"}
            className="p-2.5 rounded-2xl bg-surface-900 border border-white/10 text-slate-300 hover:text-brand-sky hover:border-brand-sky/40 transition-all"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-brand-sky animate-pulse" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-display font-bold bg-gradient-to-r from-brand-orange via-brand-amber to-brand-sky text-black hover:opacity-95 transition-all shadow-md shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Let's Talk</span>
            <Send className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-surface-900 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[76px] bg-[#070c18]/98 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
              <span className="text-xs font-mono text-slate-400">Navigation Hub</span>
              <span className="text-xs font-mono text-brand-orange">Dhaka: {dhakaTime}</span>
            </div>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
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
