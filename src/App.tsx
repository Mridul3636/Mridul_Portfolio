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

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [currentThemeColor, setCurrentThemeColor] = useState<string>('#818cf8');
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

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

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-brand-orange/30 selection:text-brand-orange relative overflow-x-hidden">
      {/* Dynamic Chromatic Atmosphere (Morphs with every Song Change) */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${currentThemeColor}28, transparent 70%), radial-gradient(circle 600px at 90% 30%, ${currentThemeColor}18, transparent 70%), radial-gradient(circle 700px at 10% 70%, ${currentThemeColor}14, transparent 70%)`
        }}
      >
        {/* Pulsing ambient orbs */}
        <div 
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[180px] transition-all duration-1000 ${
            isPlayingMusic ? 'opacity-30 scale-105' : 'opacity-15 scale-100'
          }`}
          style={{ backgroundColor: currentThemeColor }}
        />
        <div 
          className={`absolute top-2/3 right-[-10%] w-[600px] h-[600px] rounded-full blur-[200px] transition-all duration-1000 ${
            isPlayingMusic ? 'opacity-25' : 'opacity-10'
          }`}
          style={{ backgroundColor: currentThemeColor }}
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
