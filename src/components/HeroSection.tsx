import React, { useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  ChevronDown,
  Code2,
  Coffee,
  Bot,
  Download
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas starfield particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#ff6426', '#eab308', '#38bdf8', '#ec4899', '#10b981'];
    const particleCount = Math.min(width > 768 ? 45 : 20, 50);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle atmospheric grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.012)';
      ctx.lineWidth = 1;
      const gridSize = 90;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          p.x += (dx / dist) * 0.5;
          p.y += (dy / dist) * 0.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distNodes < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - distNodes / 110) * 0.1;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex flex-col justify-between pt-36 pb-16 sm:pt-44 sm:pb-24 overflow-hidden border-b border-white/[0.06]"
    >
      {/* Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Ambient Glows (Orange / Yellow / Emerald / Sky) */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-500/15 via-brand-orange/10 to-transparent blur-[160px] pointer-events-none -z-10 animate-glow-pulse" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-500/15 via-brand-sky/10 to-transparent blur-[170px] pointer-events-none -z-10" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Funky Headline & Profile Info */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-7 text-left">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-900/90 border border-amber-500/30 backdrop-blur-md shadow-lg shadow-amber-500/5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-mono font-semibold text-amber-300 tracking-wide">
                Agentic AI Specialist · Full-Stack Architect · Dhaka
              </span>
            </div>

            {/* Funky Display Headline */}
            <div className="space-y-2">
              <h1 className="font-funky font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-white tracking-tight leading-[1.12]">
                I craft{' '}
                <span className="text-amber-400 font-funky inline-block hover:scale-105 transition-transform">
                  Agentic AI
                </span>
                ,{' '}
                <span className="text-pink-400 font-funky inline-block hover:scale-105 transition-transform">
                  lean APIs
                </span>
                {' '}and{' '}
                <span className="font-outline-white font-funky inline-block hover:scale-105 transition-transform">
                  reliable
                </span>{' '}
                backends.
              </h1>
            </div>

            {/* Sub-headline description */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed font-normal max-w-xl">
                Building autonomous multi-agent systems, ultra-fast APIs, and production canvas architectures with zero bloat.
              </p>
              <p className="text-xs sm:text-sm font-mono text-amber-300/90 font-medium">
                <span className="text-amber-400 font-bold">500+ problems solved</span> in competitive programming & agentic workflows.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onNavigate('featured-work');
                }}
                className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange via-amber-500 to-yellow-500 text-black font-display font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={personalInfo.cvUrl}
                download="Mridul_CV.pdf"
                onClick={() => soundEngine.playSuccess()}
                className="px-6 py-3.5 rounded-xl bg-surface-900/90 hover:bg-surface-850 text-white font-display font-semibold text-xs sm:text-sm border border-white/10 hover:border-brand-emerald/50 shadow-md transition-all flex items-center gap-2 backdrop-blur-md group"
              >
                <Download className="w-3.5 h-3.5 text-brand-emerald group-hover:scale-110 transition-transform" />
                <span>Download CV</span>
              </a>

              <button
                onClick={() => {
                  soundEngine.playChime();
                  onNavigate('capabilities');
                }}
                className="px-5 py-3.5 rounded-xl bg-surface-900/90 hover:bg-surface-850 text-white font-display font-semibold text-xs sm:text-sm border border-white/10 hover:border-amber-400/40 shadow-md transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Capabilities</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playTerminalTick();
                  onNavigate('terminal');
                }}
                title="Launch Developer CLI"
                className="p-3.5 rounded-xl bg-surface-900 border border-white/10 text-brand-emerald hover:text-white hover:border-brand-emerald/40 hover:bg-brand-emerald/10 transition-all shadow-md"
              >
                <Terminal className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Tech Badges Row */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-lg bg-surface-900 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-medium flex items-center gap-1.5 shadow-sm">
                <Bot className="w-3 h-3 text-amber-400" /> Agentic AI
              </span>
              <span className="px-3 py-1 rounded-lg bg-surface-900 border border-white/10 text-slate-300 text-[11px] font-mono font-medium flex items-center gap-1">
                FastAPI
              </span>
              <span className="px-3 py-1 rounded-lg bg-surface-900 border border-white/10 text-slate-300 text-[11px] font-mono font-medium flex items-center gap-1">
                Python
              </span>
              <span className="px-3 py-1 rounded-lg bg-surface-900 border border-white/10 text-slate-300 text-[11px] font-mono font-medium flex items-center gap-1">
                React
              </span>
              <span className="px-3 py-1 rounded-lg bg-surface-900 border border-white/10 text-slate-300 text-[11px] font-mono font-medium flex items-center gap-1">
                PostgreSQL
              </span>
              <span className="px-3 py-1 rounded-lg bg-surface-900 border border-white/10 text-slate-300 text-[11px] font-mono font-medium flex items-center gap-1">
                Node.js
              </span>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Code Window Mockup & Interactive Sandbox */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 relative">
            
            {/* Floating Badges */}
            <div className="absolute -top-5 right-6 z-30 p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 backdrop-blur-md shadow-lg text-amber-400 flex items-center justify-center animate-bounce">
              <Coffee className="w-4 h-4" />
            </div>
            
            <div className="absolute top-1/2 -left-5 z-30 p-2.5 rounded-xl bg-sky-500/20 border border-sky-500/40 backdrop-blur-md shadow-lg text-sky-400 flex items-center justify-center hidden sm:flex">
              <Code2 className="w-4 h-4" />
            </div>

            {/* IDE Mockup Window */}
            <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-surface-950/80 backdrop-blur-2xl">
              
              {/* Titlebar */}
              <div className="px-5 py-3 border-b border-white/[0.08] flex items-center justify-between bg-surface-900/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">localhost:3000 — agentic-engine.ts</span>
                <div className="w-8" />
              </div>

              {/* Code Snippet */}
              <div className="p-5 font-mono text-xs text-slate-300 space-y-1.5 leading-relaxed bg-[#050914]">
                <div className="text-slate-500">// Autonomous Multi-Agent Orchestration</div>
                <div><span className="text-pink-400">async function</span> <span className="text-sky-400 font-bold">deployAgenticSystem</span>() {'{'}</div>
                <div className="pl-4"><span className="text-purple-400">const</span> swarm = <span className="text-amber-400">new</span> AgentSwarm({'{'} memory: <span className="text-emerald-400">"pgvector"</span> {'}'});</div>
                <div className="pl-4"><span className="text-purple-400">await</span> swarm.<span className="text-sky-300">orchestrate</span>({'{'}</div>
                <div className="pl-8 text-amber-300">goal: <span className="text-emerald-400">"10x Velocity Autonomous Full-Stack"</span>,</div>
                <div className="pl-8 text-slate-400">agents: [<span className="text-emerald-400">"architect"</span>, <span className="text-emerald-400">"coder"</span>, <span className="text-emerald-400">"tester"</span>]</div>
                <div className="pl-4">{'}'});</div>
                <div>{'}'}</div>
              </div>

              {/* Terminal Footer Strip */}
              <div className="px-5 py-2.5 bg-surface-900/90 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="text-slate-500">&gt;_ Terminal</span>
                  <span className="text-slate-600">|</span>
                  <span className="animate-pulse">● [Agent-1: Active] Multi-agent swarm running on port 8080...</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Metrics Ribbon */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-10 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {personalInfo.stats.map((st, idx) => (
            <div 
              key={idx}
              className="glass-card p-5 sm:p-6 rounded-2xl hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                {st.value}
              </span>
              <p className="text-xs font-mono text-slate-400 mt-1.5 font-medium">
                {st.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => onNavigate('intro')}
            className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-amber-400 transition-colors"
          >
            <span>DISCOVER WHO I AM</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
