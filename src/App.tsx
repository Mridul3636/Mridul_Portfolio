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

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

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
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-brand-orange/30 selection:text-brand-orange relative">
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
