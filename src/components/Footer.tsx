import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030712] border-t border-white/[0.08] py-12 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-900 border border-white/10 flex items-center justify-center overflow-hidden p-0.5">
            <img src="/favicon.png" alt="Mridul Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-white tracking-widest">
                MRIDUL
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Full Stack Developer</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Dhaka, Bangladesh • Computer Science & Engineering
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-slate-400 hover:text-white transition-colors"
          >
            Email
          </a>
          <a
            href={personalInfo.telegram}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Telegram
          </a>
        </div>

        {/* Back to Top & Copyright */}
        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Md. Minhazur Rahaman</span>
          <button
            onClick={scrollToTop}
            title="Scroll to top"
            className="p-2 rounded-xl bg-surface-900 border border-white/10 text-slate-300 hover:text-white hover:border-brand-orange transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
