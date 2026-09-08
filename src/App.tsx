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

const getThemePalette = (colorHex: string): ThemePalette => {
  const hex = (colorHex || '#818cf8').toLowerCase();
  
  // Michael Jackson - Amber Gold / Sunset Neon
  if (hex === '#f59e0b' || hex.includes('f59e0b') || hex.includes('d97706')) {
    return {
      primary: '#f59e0b',
      secondary: '#ea580c',
      tertiary: '#fbbf24',
      darkBg: '#0f0802',
      name: 'Sunset Gold'
    };
  }
  
  // Phonk / Energy Mode - Crimson Red / Lava Fire
  if (hex === '#ef4444' || hex.includes('ef4444') || hex.includes('dc2626')) {
    return {
      primary: '#ef4444',
      secondary: '#b91c1c',
      tertiary: '#f43f5e',
      darkBg: '#120306',
      name: 'Crimson Surge'
    };
  }
  
  // Soft Hours (Arijit / Anuv Jain) - Romantic Rose / Cherry Blossom
  if (hex === '#ec4899' || hex.includes('ec4899') || hex.includes('db2777')) {
    return {
      primary: '#ec4899',
      secondary: '#a21caf',
      tertiary: '#f472b6',
      darkBg: '#12030d',
      name: 'Rose Romance'
    };
  }
  
  // Pop Rotation (Taylor Swift) - Electric Cyan / Sky Blue
  if (hex === '#38bdf8' || hex.includes('38bdf8') || hex.includes('0ea5e9') || hex.includes('06b6d4')) {
    return {
      primary: '#38bdf8',
      secondary: '#6366f1',
      tertiary: '#06b6d4',
      darkBg: '#030a15',
      name: 'Electric Cyan'
    };
  }
  
  // Indie Side (Arctic Monkeys) - Neon Emerald / Jade Mint
  if (hex === '#10b981' || hex.includes('10b981') || hex.includes('059669')) {
    return {
      primary: '#10b981',
      secondary: '#0d9488',
      tertiary: '#34d399',
      darkBg: '#02100b',
      name: 'Emerald Jade'
    };
  }
  
  // Late Night (Cigarettes After Sex / Default) - Cosmic Indigo / Violet Night
  return {
    primary: '#818cf8',
    secondary: '#6366f1',
    tertiary: '#a855f7',
    darkBg: '#050716',
    name: 'Cosmic Indigo'
  };
};

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [currentThemeColor, setCurrentThemeColor] = useState<string>('#818cf8');
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  const palette = getThemePalette(currentThemeColor);

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
      {/* Dynamic Chromatic Atmosphere (Morphs with every Song Change) */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(ellipse 110% 70% at 50% -15%, ${palette.primary}4D 0%, transparent 65%),
            radial-gradient(circle 950px at 95% 25%, ${palette.secondary}38 0%, transparent 65%),
            radial-gradient(circle 950px at 5% 75%, ${palette.tertiary}30 0%, transparent 65%),
            linear-gradient(145deg, ${palette.primary}18 0%, transparent 45%, ${palette.secondary}22 100%)
          `
        }}
      >
        {/* Pulsing ambient orbs with rich chromatic glow */}
        <div 
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full blur-[160px] transition-all duration-1000 ${
            isPlayingMusic ? 'opacity-60 scale-110' : 'opacity-35 scale-100'
          }`}
          style={{ backgroundColor: palette.primary }}
        />
        <div 
          className={`absolute top-1/3 -right-24 w-[750px] h-[750px] rounded-full blur-[190px] transition-all duration-1000 ${
            isPlayingMusic ? 'opacity-45 scale-105' : 'opacity-25 scale-95'
          }`}
          style={{ backgroundColor: palette.secondary }}
        />
        <div 
          className={`absolute bottom-1/4 -left-24 w-[800px] h-[800px] rounded-full blur-[200px] transition-all duration-1000 ${
            isPlayingMusic ? 'opacity-40 scale-105' : 'opacity-20 scale-95'
          }`}
          style={{ backgroundColor: palette.tertiary }}
        />

        {/* Subtle dynamic grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${palette.primary} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

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
