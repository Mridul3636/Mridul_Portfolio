import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  Trash2, 
  CornerDownLeft
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

interface TerminalProps {
  onNavigate?: (sectionId: string) => void;
}

export const InteractiveTerminalSection: React.FC<TerminalProps> = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ command: string; output: string[] | string }[]>([
    {
      command: 'welcome',
      output: [
        '⚡ MRIDUL DEVELOPER CLI [Version 2.4.0]',
        '(c) Md. Minhazur Rahaman (Mridul). All rights reserved.',
        '',
        'Type "help" to see available terminal commands, or try "siirham", "skills", "matrix", "soundtrack".'
      ]
    }
  ]);
  const [isMatrixMode, setIsMatrixMode] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    soundEngine.playTerminalTick();

    const lower = cmd.toLowerCase();
    let response: string[] | string = [];

    switch (lower) {
      case 'help':
        response = [
          'AVAILABLE COMMANDS:',
          '  agentic     - Multi-agent swarm orchestration & autonomous AI capabilities',
          '  about       - Overview of Md. Minhazur Rahaman (Mridul)',
          '  skills      - Technical arsenal & production competencies',
          '  projects    - Signature platforms & systems built',
          '  siirham     - Deep-dive into SIIRHAM 2D Canvas Tailoring Studio',
          '  experience  - Career timeline & software engineering roles',
          '  education   - B.Sc. in Computer Science & Engineering foundation',
          '  github      - GitHub profile & repository metrics',
          '  soundtrack  - 150-track music hub & Spotify playlists',
          '  anime       - Favorite anime titles & philosophy',
          '  contact     - Direct contact coordinates & email',
          '  matrix      - Toggle digital matrix mode',
          '  whoami      - System identity verification',
          '  quote       - Engineering philosophy quote',
          '  clear       - Clear terminal screen'
        ];
        break;

      case 'agent':
      case 'agentic':
      case 'ai':
        response = [
          '🤖 AGENTIC AI & AUTONOMOUS SWARM ORCHESTRATION:',
          '  Specialization: Expert in Autonomous Multi-Agent Workflows & Neural Tool Calling',
          '  Frameworks: Antigravity AI, AutoGen, CrewAI, LangChain, OpenAI / Gemini / Claude APIs',
          '  Capabilities:',
          '    • Multi-Agent Swarm Orchestration (Frontend, Backend, SQA subagents)',
          '    • Strict Function Calling, Tool-Use Schema Design & Vector Memory (pgvector)',
          '    • Automated Self-Healing Debugging & Continuous Test Generation',
          '    • 10x Engineering Velocity with Agentic Coding Workflows',
          '  Status: Ready to deploy autonomous agent pipelines for enterprise systems.'
        ];
        break;

      case 'about':
        response = [
          `NAME: ${personalInfo.name} (${personalInfo.nickname})`,
          `ROLE: ${personalInfo.role}`,
          `LOCATION: ${personalInfo.location}`,
          `STATUS: ${personalInfo.status}`,
          `STATEMENT: ${personalInfo.statement}`
        ];
        break;

      case 'skills':
        response = [
          'CORE ARSENAL:',
          '  Frontend: React, TypeScript, JavaScript (ES6+), Fabric.js, HTML5 Canvas, Tailwind CSS',
          '  Backend: PHP 8.x (Custom MVC), Node.js, Express, Python, RESTful APIs',
          '  Database: MySQL 8.0, MariaDB, PostgreSQL, Redis, ACID Transactions',
          '  Testing: SQA STLC, Automated API Suites, Postman, Selenium, Jest, Jira',
          '  Integrations: Pathao Courier Merchant API, Telegram Bot Webhooks, OAuth 2.0'
        ];
        break;

      case 'projects':
      case 'project':
        response = [
          'FEATURED PRODUCTION SYSTEMS:',
          '  1. SIIRHAM - E-Commerce & Interactive 2D Tailoring Studio (PHP MVC + Fabric.js)',
          '  2. Nexus ERP - Multi-Tenant Warehouse & RBAC Management Console',
          '  3. DevPulse - Automated SQA API & UI Regression Framework',
          '  4. Aura AI - Predictive Customer Churn & Product Affinity Classifier'
        ];
        break;

      case 'siirham':
        response = [
          '🛍️ SIIRHAM APPAREL PLATFORM:',
          '  Role: Full-Stack Software Engineer & Lead Architect',
          '  Repo: https://github.com/Mridul3636/Siirham_Website',
          '  Highlights:',
          '    • 2D Fabric.js tailoring canvas with DTF print bounding box pricing',
          '    • Pathao Courier REST API 1-click consignment dispatch',
          '    • Real-time Telegram Bot ERP webhook push notifications',
          '    • Role-Based Access Control (RBAC) with SKU size matrix'
        ];
        break;

      case 'experience':
        response = [
          'CAREER MILESTONES:',
          '  • SIIRHAM - Operations, Tech & Marketing Assistant (2023-2024)',
          '  • QA Harbor - SQA Trainee (Software Quality Assurance) (2023)',
          '  • Solution Hub Technologies - Software Engineer Intern (2022-2023)'
        ];
        break;

      case 'education':
        response = [
          '🎓 ACADEMIC BACKGROUND:',
          `  Institution: ${personalInfo.university}`,
          `  Degree: ${personalInfo.degree}`,
          '  Location: Dhaka, Bangladesh'
        ];
        break;

      case 'github':
        response = [
          `GITHUB PROFILE: ${personalInfo.github}`,
          '  Verified Commits: 1,200+',
          '  Primary Languages: PHP (48%), JavaScript (34%), TypeScript, Python'
        ];
        break;

      case 'soundtrack':
      case 'music':
        response = [
          '🎵 MY SOUNDTRACK (150 TRACKS):',
          '  • 👑 Forever on Repeat (Michael Jackson - 25 tracks)',
          '  • 🌙 Late Night (Cigarettes After Sex + The Weeknd + Lana Del Rey)',
          '  • 🔥 Energy Mode (Phonk / Brazilian Phonk - 30 tracks)',
          '  • 🩷 Soft Hours (Hindi / Indian Soft - 30 tracks)',
          '  • 🎸 Indie Side (Arctic Monkeys)',
          '  • ✨ Pop Rotation (Taylor Swift + Snoop Dogg)'
        ];
        break;

      case 'anime':
        response = [
          '🍿 ANIME FAVORITES:',
          '  Attack on Titan, Death Note, Vinland Saga, Steins;Gate, Hunter x Hunter, Cyberpunk: Edgerunners'
        ];
        break;

      case 'contact':
        response = [
          `📧 EMAIL: ${personalInfo.email}`,
          `📍 LOCATION: ${personalInfo.location}`,
          `🔗 GITHUB: ${personalInfo.github}`,
          `💼 LINKEDIN: ${personalInfo.linkedin}`
        ];
        break;

      case 'matrix':
        setIsMatrixMode(!isMatrixMode);
        response = isMatrixMode ? 'Matrix mode DISABLED.' : 'Matrix digital rain mode ENABLED.';
        break;

      case 'whoami':
        response = 'guest@mridul-digital-universe:~$ [AUTHENTICATED VISITOR]';
        break;

      case 'quote':
        response = '"Zero bloat. Sub-second performance. Pixel perfection. Build things that actually work." — Mridul';
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'sudo':
        response = 'Permission granted. You are exploring the personal digital universe of Md. Minhazur Rahaman.';
        break;

      default:
        response = `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`;
        break;
    }

    setHistory(prev => [...prev, { command: cmd, output: response }]);
    setInput('');
  };

  return (
    <section 
      id="terminal" 
      className="relative py-28 sm:py-36 md:py-40 bg-[#02040a] border-b border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald text-xs font-mono mb-4 tracking-wider uppercase">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>13 // DEVELOPER CLI TERMINAL</span>
            </div>
            <h2 className="font-funky font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Interactive Terminal
            </h2>
            <p className="text-slate-400 font-mono text-xs sm:text-sm mt-2">
              "You've explored the person. Now here's the developer."
            </p>
          </div>
          <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-lg leading-relaxed">
            Type unix-style commands to interrogate the codebase, inspect case studies, or trigger easter eggs.
          </p>
        </div>

        {/* Embedded CLI Window */}
        <div className={`rounded-3xl border overflow-hidden transition-all duration-300 shadow-2xl ${
          isMatrixMode 
            ? 'bg-black border-brand-emerald shadow-brand-emerald/20 text-brand-emerald font-mono' 
            : 'bg-[#070b14] border-white/10 text-slate-200 font-mono'
        }`}>
          
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-8 py-5 bg-surface-900 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500/80"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-green-500/80"></span>
              <span className="text-xs font-mono text-slate-400 ml-3">
                mridul@universe: ~/portfolio/cli
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setHistory([])}
                title="Clear screen"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div className="p-8 max-h-[420px] overflow-y-auto space-y-4 text-xs sm:text-sm">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2.5 text-brand-sky font-bold">
                  <span className="text-brand-orange">mridul@universe:~$</span>
                  <span>{item.command}</span>
                </div>
                {Array.isArray(item.output) ? (
                  <div className="space-y-1 text-slate-300 pl-4">
                    {item.output.map((line, lIdx) => (
                      <div key={lIdx}>{line}</div>
                    ))}
                  </div>
                ) : (
                  <div className="text-slate-300 pl-4">{item.output}</div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Line */}
          <form onSubmit={handleCommand} className="flex items-center px-8 py-5 border-t border-white/10 bg-surface-950">
            <span className="text-brand-orange font-bold text-xs sm:text-sm mr-3 shrink-0">
              mridul@universe:~$
            </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Type "help", "siirham", "skills", "soundtrack" or "contact"...'
              className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none font-mono placeholder:text-slate-600"
              autoFocus={false}
            />
            <button type="submit" className="text-slate-500 hover:text-white ml-3">
              <CornerDownLeft className="w-5 h-5" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
