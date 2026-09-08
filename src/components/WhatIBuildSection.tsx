import React, { useState, useRef, useEffect } from 'react';
import { 
  Globe, 
  ShoppingBag, 
  LayoutDashboard, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Check,
  X
} from 'lucide-react';
import { capabilityCategories } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

interface WhatIBuildSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const WhatIBuildSection: React.FC<WhatIBuildSectionProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('agentic-ai');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const checkScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = tabsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll, { passive: true });
    }
    window.addEventListener('resize', checkScroll);
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScrollTabs = (direction: 'left' | 'right') => {
    soundEngine.playClick();
    if (tabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  // Interactive Micro-Demos State
  // 1. E-Commerce Demo state
  const [promoCode, setPromoCode] = useState('MRIDUL20');
  const cartBase = 1200;
  const [appliedDiscount, setAppliedDiscount] = useState(20);

  // 2. Admin ERP Demo state
  const [selectedRole, setSelectedRole] = useState<'superadmin' | 'manager' | 'staff'>('superadmin');

  // 3. API Webhook Demo state
  const [apiStatus, setApiStatus] = useState<'idle' | 'sending' | 'delivered'>('idle');
  const [lastPayload, setLastPayload] = useState<{ id: string; time: string; status: string }>({
    id: 'ORD-7892',
    time: '12:04 PM',
    status: 'DISPATCH_QUEUED'
  });

  // 4. Canvas Preview demo state
  const [garmentColor, setGarmentColor] = useState<'#111827' | '#ffffff' | '#b91c1c' | '#0369a1'>('#111827');
  const [printSize, setPrintSize] = useState<'A6' | 'A4' | 'A3'>('A4');

  // 5. ML Predictor demo state
  const [churnRisk, setChurnRisk] = useState<number>(14);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return Globe;
      case 'ShoppingBag': return ShoppingBag;
      case 'LayoutDashboard': return LayoutDashboard;
      case 'Cpu': return Cpu;
      case 'Sparkles': return Sparkles;
      case 'ShieldCheck': return ShieldCheck;
      default: return Sparkles;
    }
  };

  const currentCategory = capabilityCategories.find(c => c.id === activeCategory) || capabilityCategories[0];
  const IconComponent = getIcon(currentCategory.iconName);

  const handleSelect = (id: string) => {
    soundEngine.playClick(650, 0.03);
    setActiveCategory(id);
  };

  const handleApplyPromo = () => {
    soundEngine.playSuccess();
    if (promoCode.trim().toUpperCase() === 'MRIDUL20') {
      setAppliedDiscount(20);
    } else {
      setAppliedDiscount(10);
    }
  };

  const handleTriggerApi = () => {
    soundEngine.playTerminalTick();
    setApiStatus('sending');
    setTimeout(() => {
      soundEngine.playSuccess();
      setApiStatus('delivered');
      setLastPayload({
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        time: new Date().toLocaleTimeString(),
        status: 'DISPATCHED_TO_PATHAO'
      });
    }, 600);
  };

  return (
    <section 
      id="capabilities" 
      className="relative py-28 sm:py-36 md:py-40 bg-[#02040a] border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Chromatic Gradient: Yellow transitioning into Sky Blue */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-brand-yellow/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-brand-sky/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-xs font-mono mb-3 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03 // CORE CAPABILITIES</span>
            </div>
            <h2 className="font-funky font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              What I Actually Build
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-md leading-relaxed">
              From autonomous agent swarms and full-stack web platforms to hardware-accelerated 2D graphic customization canvases.
            </p>

            {/* Quick Arrow Controls on Header */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleScrollTabs('left')}
                disabled={!canScrollLeft}
                className={`p-2.5 rounded-xl border transition-all ${
                  canScrollLeft
                    ? 'bg-surface-900 border-white/20 text-white hover:border-brand-sky hover:text-brand-sky hover:scale-105 active:scale-95'
                    : 'bg-surface-950 border-white/5 text-slate-600 cursor-not-allowed opacity-50'
                }`}
                title="Scroll categories left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollTabs('right')}
                disabled={!canScrollRight}
                className={`p-2.5 rounded-xl border transition-all ${
                  canScrollRight
                    ? 'bg-surface-900 border-white/20 text-white hover:border-brand-sky hover:text-brand-sky hover:scale-105 active:scale-95'
                    : 'bg-surface-950 border-white/5 text-slate-600 cursor-not-allowed opacity-50'
                }`}
                title="Scroll categories right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Capability Category Navigation Pills with Floating Arrow Buttons */}
        <div className="relative mb-10 group">
          {/* Floating Left Arrow */}
          <button
            onClick={() => handleScrollTabs('left')}
            disabled={!canScrollLeft}
            className={`absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#080e1a]/95 border border-white/20 text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 ${
              canScrollLeft 
                ? 'opacity-100 hover:scale-110 hover:border-brand-sky hover:text-brand-sky active:scale-95 shadow-brand-sky/40' 
                : 'opacity-0 pointer-events-none'
            }`}
            title="Scroll categories left"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Left Gradient Edge Fade */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#02040a] via-[#02040a]/80 to-transparent z-10 pointer-events-none rounded-l-2xl" />
          )}

          {/* Scrollable Tabs Row */}
          <div 
            ref={tabsContainerRef}
            className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none px-1 scroll-smooth"
          >
            {capabilityCategories.map((cat) => {
              const Icon = getIcon(cat.iconName);
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelect(cat.id)}
                  className={`shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl text-xs font-mono transition-all border ${
                    isSelected
                      ? 'bg-surface-800 border-brand-sky text-white shadow-xl shadow-brand-sky/20 font-bold scale-[1.02]'
                      : 'bg-surface-900/60 border-white/[0.08] text-slate-400 hover:text-white hover:bg-surface-850'
                  }`}
                >
                  <span className="text-[10px] opacity-60">{cat.number}</span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-sky' : 'text-slate-500'}`} />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Right Gradient Edge Fade */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#02040a] via-[#02040a]/80 to-transparent z-10 pointer-events-none rounded-r-2xl" />
          )}

          {/* Floating Right Arrow */}
          <button
            onClick={() => handleScrollTabs('right')}
            disabled={!canScrollRight}
            className={`absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#080e1a]/95 border border-white/20 text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 ${
              canScrollRight 
                ? 'opacity-100 hover:scale-110 hover:border-brand-sky hover:text-brand-sky active:scale-95 shadow-brand-sky/40' 
                : 'opacity-0 pointer-events-none'
            }`}
            title="Scroll categories right"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Active Capability Deep Dive Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 glass-card p-8 sm:p-12 lg:p-14 rounded-3xl border border-white/10 relative overflow-hidden">
          
          {/* Left Column: Architectural Overview & Tech (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: `${currentCategory.accentColor}20`, borderColor: `${currentCategory.accentColor}40`, borderWidth: 1 }}
                >
                  <IconComponent className="w-7 h-7" style={{ color: currentCategory.accentColor }} />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Category {currentCategory.number}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-4xl text-white">
                    {currentCategory.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base font-mono font-semibold text-brand-sky mb-4">
                {currentCategory.tagline}
              </p>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed mb-8">
                {currentCategory.description}
              </p>

              {/* Technologies Applied */}
              <div className="mb-8">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                  Underlying Tech Foundation:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {currentCategory.techList.map((t, idx) => (
                    <span 
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-surface-900 border border-white/10 text-xs font-mono text-slate-200 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics & Case Study Link */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-8">
                {currentCategory.metrics.map((m, idx) => (
                  <div key={idx}>
                    <span className="text-xl font-display font-black text-white block">
                      {m.value}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onNavigate('featured-work');
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber text-black font-display font-bold text-xs flex items-center gap-2.5 hover:opacity-90 transition-all shadow-lg shadow-brand-orange/20"
              >
                <span>See Production Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Micro-Widget (5 cols) */}
          <div className="lg:col-span-5 bg-surface-900/90 rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald animate-pulse"></span>
                <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                  Live Interactive Widget
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Client Simulation
              </span>
            </div>

            {/* Dynamic Micro-Widget Rendering */}
            <div className="my-auto py-2">
              
              {/* 1. Web Application Widget */}
              {currentCategory.demoType === 'webApp' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-surface-850 border border-white/10">
                    <span className="text-xs font-mono text-slate-400 block mb-2">
                      Reactive State Machine Latency:
                    </span>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-brand-emerald font-bold">● Hydrated (Ready)</span>
                      <span className="text-slate-400">Time: 42ms</span>
                    </div>
                    <div className="w-full bg-surface-800 h-2 rounded-full overflow-hidden mt-3">
                      <div className="bg-gradient-to-r from-brand-orange to-brand-sky h-full w-[94%] animate-pulse"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                    <div className="p-3 rounded-xl bg-surface-850 border border-white/10">
                      <span className="text-slate-400 block text-[10px]">Zero Layout Shift</span>
                      <span className="text-brand-sky font-bold text-sm">CLS: 0.00</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-850 border border-white/10">
                      <span className="text-slate-400 block text-[10px]">Time to Interactive</span>
                      <span className="text-brand-amber font-bold text-sm">TTI: 0.3s</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. E-Commerce Widget: Cart & Dynamic Rules */}
              {currentCategory.demoType === 'ecommerce' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-850 border border-white/10 text-xs font-mono">
                    <span className="text-slate-300">Streetwear Heavy Hoodie</span>
                    <span className="font-bold text-white">৳{cartBase}</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Coupon Code"
                      className="flex-1 bg-surface-800 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-brand-yellow"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-3 py-2 rounded-xl bg-brand-yellow text-black text-xs font-bold font-mono hover:opacity-90"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-850 border border-brand-yellow/30 text-xs font-mono flex justify-between items-center">
                    <span className="text-slate-400">Discount ({appliedDiscount}% Off):</span>
                    <span className="text-brand-yellow font-bold">
                      ৳{Math.round(cartBase * (1 - appliedDiscount / 100))} BDT
                    </span>
                  </div>
                </div>
              )}

              {/* 3. Admin ERP Widget: RBAC Permission Matrix */}
              {currentCategory.demoType === 'adminErp' && (
                <div className="space-y-3">
                  <div className="flex gap-1 bg-surface-850 p-1 rounded-xl border border-white/10">
                    {(['superadmin', 'manager', 'staff'] as const).map(role => (
                      <button
                        key={role}
                        onClick={() => {
                          soundEngine.playClick();
                          setSelectedRole(role);
                        }}
                        className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono capitalize transition-all ${
                          selectedRole === role ? 'bg-brand-orange text-black font-bold' : 'text-slate-400'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-surface-850 border border-white/10 text-xs font-mono space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Edit Product Prices</span>
                      <span className={selectedRole !== 'staff' ? 'text-brand-emerald font-bold flex items-center gap-1' : 'text-red-400 flex items-center gap-1'}>
                        {selectedRole !== 'staff' ? <><Check className="w-3.5 h-3.5" /> ALLOWED</> : <><X className="w-3.5 h-3.5" /> LOCKED</>}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Dispatch Courier Consignment</span>
                      <span className="text-brand-emerald font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> ALLOWED
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">View Profit Audit Logs</span>
                      <span className={selectedRole === 'superadmin' ? 'text-brand-emerald font-bold flex items-center gap-1' : 'text-red-400 flex items-center gap-1'}>
                        {selectedRole === 'superadmin' ? <><Check className="w-3.5 h-3.5" /> ALLOWED</> : <><X className="w-3.5 h-3.5" /> LOCKED</>}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. API & Webhook Dispatch Widget */}
              {currentCategory.demoType === 'api' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-surface-850 border border-white/10 text-xs font-mono">
                    <div className="text-[10px] text-slate-400 mb-1">TELEGRAM BOT WEBHOOK PAYLOAD:</div>
                    <div className="text-brand-sky truncate">POST https://api.telegram.org/bot/sendMessage</div>
                    <div className="text-slate-300 text-[11px] mt-1">
                      {"{"} id: "{lastPayload.id}", status: "{lastPayload.status}" {"}"}
                    </div>
                  </div>
                  <button
                    onClick={handleTriggerApi}
                    disabled={apiStatus === 'sending'}
                    className="w-full py-2.5 rounded-xl bg-brand-sky text-black font-mono font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${apiStatus === 'sending' ? 'animate-spin' : ''}`} />
                    <span>{apiStatus === 'sending' ? 'Dispatching Webhook...' : 'Trigger Order Webhook'}</span>
                  </button>
                </div>
              )}

              {/* 5. Canvas Customizer Mini-Studio */}
              {currentCategory.demoType === 'canvas' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span>Garment Color:</span>
                    <div className="flex gap-2">
                      {(['#111827', '#ffffff', '#b91c1c', '#0369a1'] as const).map(c => (
                        <button
                          key={c}
                          onClick={() => setGarmentColor(c)}
                          className={`w-5 h-5 rounded-full border ${garmentColor === c ? 'ring-2 ring-brand-pink' : 'border-white/20'}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span>Print Bounding Box:</span>
                    <div className="flex gap-1">
                      {(['A6', 'A4', 'A3'] as const).map(s => (
                        <button
                          key={s}
                          onClick={() => setPrintSize(s)}
                          className={`px-2 py-1 rounded text-[10px] font-bold ${
                            printSize === s ? 'bg-brand-pink text-black' : 'bg-surface-800 text-slate-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-850 border border-brand-pink/30 text-xs font-mono flex items-center justify-between">
                    <span className="text-slate-300">Auto DTF Surcharge:</span>
                    <span className="text-brand-pink font-bold">
                      {printSize === 'A6' ? '+৳100' : printSize === 'A4' ? '+৳200' : '+৳350'}
                    </span>
                  </div>
                </div>
              )}

              {/* 6. Machine Learning / SQA Predictor */}
              {currentCategory.demoType === 'ai' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-surface-850 border border-white/10 text-xs font-mono">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300">Customer Churn Likelihood:</span>
                      <span className="text-brand-emerald font-bold">{churnRisk}% Low Risk</span>
                    </div>
                    <div className="w-full bg-surface-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-brand-emerald h-full transition-all duration-500"
                        style={{ width: `${churnRisk}%` }}
                      ></div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      soundEngine.playTerminalTick();
                      setChurnRisk(Math.floor(10 + Math.random() * 65));
                    }}
                    className="w-full py-2.5 rounded-xl bg-surface-800 border border-white/10 text-slate-200 text-xs font-mono font-semibold hover:border-brand-violet"
                  >
                    Re-Run Inference Classifier
                  </button>
                </div>
              )}

            </div>

            <div className="pt-3 border-t border-white/10 text-center">
              <span className="text-[11px] font-mono text-slate-400">
                Interactive real-time architecture preview
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
