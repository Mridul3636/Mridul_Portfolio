import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickIntroSection } from './components/QuickIntroSection';
import { WhatIBuildSection } from './components/WhatIBuildSection';
import { FeaturedWorkSection } from './components/FeaturedWorkSection';
import { ExperienceSection } from './components/ExperienceSection';
import { DeveloperArsenalSection } from './components/DeveloperArsenalSection';
import { GithubProofSection } from './components/GithubProofSection';
import { EducationSection } from './components/EducationSection';
import { BeyondCodeSection } from './components/BeyondCodeSection';
import { SoundtrackSection } from './components/SoundtrackSection';
import { AnimeUniverseSection } from './components/AnimeUniverseSection';
import { WatchSection } from './components/WatchSection';
import { InteractiveTerminalSection } from './components/InteractiveTerminalSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuickDock } from './components/QuickDock';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { soundEngine } from './utils/soundEngine';

interface ThemePalette {
  primary: string;
  secondary: string;
  tertiary: string;
  darkBg: string;
  name: string;
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let c = hex.replace('#', '').trim();
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const r = parseInt(c.substring(0, 2) || '81', 16) / 255;
  const g = parseInt(c.substring(2, 4) || '8c', 16) / 255;
  const b = parseInt(c.substring(4, 6) || 'f8', 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

const getThemePalette = (colorHex: string): ThemePalette => {
  const { h } = hexToHsl(colorHex || '#818cf8');
  const h2 = (h + 45) % 360;
  const h3 = (h + 135) % 360;
  
  return {
    primary: `hsl(${h}, 90%, 62%)`,
    secondary: `hsl(${h2}, 85%, 55%)`,
    tertiary: `hsl(${h3}, 80%, 58%)`,
    darkBg: `hsl(${h}, 45%, 4%)`,
    name: `Chroma-${h}`
  };
};

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [currentThemeColor, setCurrentThemeColor] = useState<string>('#2dd4bf');
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  const palette = getThemePalette(currentThemeColor);

  // Guarantee page loads from top and autoplays rotating entrance tracks:
  // 1. Beat It (0:45) -> 2. Shape of You (0:06) -> 3. Базовый минимум (0:00) -> 4. Khat (0:00)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      
      // Rotate through entrance songs on each visit / tab open
      soundEngine.startNextEntranceTrack();
    }
  }, []);

  // Subscribe to SoundEngine for dynamic music theme changes across the website
  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(state => {
      if (state.currentTrack?.themeColor) {
        setCurrentThemeColor(state.currentTrack.themeColor);
      }
      setIsPlayingMusic(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  // Update root CSS variables when palette changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary', palette.primary);
      root.style.setProperty('--theme-secondary', palette.secondary);
      root.style.setProperty('--theme-tertiary', palette.tertiary);
      root.style.setProperty('--theme-dark-bg', palette.darkBg);
    }
  }, [palette]);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Intersection observer to track active section
  useEffect(() => {
    const sectionIds = [
      'hero',
      'intro',
      'capabilities',
      'featured-work',
      'experience',
      'arsenal',
      'github-proof',
      'education',
      'beyond-code',
      'soundtrack',
      'anime',
      'movies',
      'terminal',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Spacebar Key Handler for instantaneous Play / Pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        const target = e.target as HTMLElement | null;
        const tagName = target?.tagName?.toLowerCase();
        if (
          tagName === 'input' ||
          tagName === 'textarea' ||
          tagName === 'select' ||
          target?.isContentEditable ||
          target?.getAttribute('role') === 'textbox'
        ) {
          return; // Let user type spaces naturally in input/textarea/search boxes
        }
        // Prevent default browser viewport page scroll on spacebar press
        e.preventDefault();
        soundEngine.togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className="min-h-screen text-slate-100 selection:bg-brand-orange/30 selection:text-brand-orange relative overflow-x-hidden transition-colors duration-1000 ease-out"
      style={{ backgroundColor: palette.darkBg }}
    >
      {/* Dynamic Chromatic Atmosphere (Morphs with every Song Change across entire page) */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(ellipse 120% 70% at 50% -10%, ${palette.primary}55 0%, transparent 65%),
            radial-gradient(circle 900px at 0% 30%, ${palette.primary}4D 0%, transparent 60%),
            radial-gradient(circle 900px at 100% 40%, ${palette.secondary}4D 0%, transparent 60%),
            radial-gradient(circle 900px at 0% 75%, ${palette.tertiary}45 0%, transparent 60%),
            radial-gradient(circle 900px at 100% 85%, ${palette.primary}45 0%, transparent 60%),
            linear-gradient(180deg, ${palette.primary}1A 0%, transparent 35%, ${palette.secondary}1A 75%, ${palette.primary}1A 100%)
          `
        }}
      >
        {/* Pulsing ambient orbs with rich chromatic glow spanning full viewport */}
        <div 
          className={`absolute -top-20 left-1/2 -translate-x-1/2 w-[950px] h-[600px] rounded-full blur-[160px] transition-all duration-1000 ${
            isPlayingMusic ? 'opacity-70 scale-110' : 'opacity-45 scale-100'
          }`}
          style={{ backgroundColor: palette.primary }}
        />
        {/* Left Side Gutter Vibrant Glow */}
        <div 
          className={`absolute top-1/4 -left-32 w-[700px] h-[700px] rounded-full blur-[180px] transition-all duration-1000 ${
            isPlayingMusic ? 'opacity-65 scale-110' : 'opacity-40 scale-100'
          }`}
          style={{ backgroundColor: palette.primary }}
        />
        {/* Right Side Gutter Vibrant Glow */}
        <div 
          className={`absolute top-1/2 -right-32 w-[750px] h-[750px] rounded-full blur-[180px] transition-all duration-1000 ${
            isPlayingMusic ? 'opacity-65 scale-110' : 'opacity-40 scale-100'
          }`}
          style={{ backgroundColor: palette.secondary }}
        />
        {/* Lower Left Gutter Vibrant Glow */}
        <div 
          className={`absolute bottom-1/4 -left-32 w-[700px] h-[700px] rounded-full blur-[180px] transition-all duration-1000 ${
            isPlayingMusic ? 'opacity-60 scale-110' : 'opacity-35 scale-100'
          }`}
          style={{ backgroundColor: palette.tertiary }}
        />
        {/* Lower Right Gutter Vibrant Glow */}
        <div 
          className={`absolute bottom-10 -right-32 w-[700px] h-[700px] rounded-full blur-[180px] transition-all duration-1000 ${
            isPlayingMusic ? 'opacity-60 scale-110' : 'opacity-35 scale-100'
          }`}
          style={{ backgroundColor: palette.primary }}
        />

        {/* Subtle dynamic grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${palette.primary} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Fixed Side Gutter Edge Ambiance (guarantees marked margin areas reflect song theme) */}
      <div 
        className="fixed left-0 top-0 bottom-0 w-24 md:w-48 pointer-events-none -z-10 transition-all duration-1000 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 0% 50%, ${palette.primary}66 0%, transparent 80%)`
        }}
      />
      <div 
        className="fixed right-0 top-0 bottom-0 w-24 md:w-48 pointer-events-none -z-10 transition-all duration-1000 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 100% 50%, ${palette.secondary}66 0%, transparent 80%)`
        }}
      />

      {/* Top Floating Glass Navigation Header */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 01 — HERO / IDENTITY */}
      <HeroSection onNavigate={handleNavigate} />

      {/* 02 — QUICK INTRODUCTION */}
      <QuickIntroSection onNavigate={handleNavigate} />

      {/* 03 — "WHAT I BUILD" */}
      <WhatIBuildSection onNavigate={handleNavigate} />

      {/* 04 — FEATURED WORK (Crown Jewel SIIRHAM + Signature Platforms) */}
      <FeaturedWorkSection />

      {/* 05 — EXPERIENCE (Chronological Journey) */}
      <ExperienceSection />

      {/* 06 — DEVELOPER ARSENAL (Interactive Technical Ecosystem) */}
      <DeveloperArsenalSection />

      {/* 07 — GITHUB / TECHNICAL PROOF (Heatmap & Verified Commits) */}
      <GithubProofSection />

      {/* 08 — EDUCATION / FOUNDATION */}
      <EducationSection />

      {/* 09 — "BEYOND CODE" (The Personal Digital Universe) */}
      <BeyondCodeSection onNavigate={handleNavigate} />

      {/* 10 — MUSIC / SPOTIFY ("My Soundtrack" — 150 Tracks) */}
      <SoundtrackSection />

      {/* 11 — ANIME UNIVERSE ("My Anime Universe") */}
      <AnimeUniverseSection />

      {/* 12 — MOVIE / TV SECTION ("What I Watch") */}
      <WatchSection />

      {/* 13 — INTERACTIVE TERMINAL (Developer CLI) */}
      <InteractiveTerminalSection onNavigate={handleNavigate} />

      {/* 14 — CONTACT ("Let's Build Something Together") */}
      <ContactSection />

      {/* 15 — FOOTER */}
      <Footer />

      {/* Floating Quick Dock Navigation */}
      <QuickDock activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Floating Interactive Spotify Player Widget (Bottom-Right) */}
      <FloatingMusicPlayer />
    </div>
  );
}

export default App;
