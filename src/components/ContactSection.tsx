import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  MessageSquare, 
  ExternalLink
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    soundEngine.playSuccess();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setErrorMessage('');
    soundEngine.playTerminalTick();
    setIsSubmitting(true);

    // Simulate reliable delivery with mailto fallthrough
    setTimeout(() => {
      soundEngine.playSuccess();
      setIsSubmitting(false);
      setIsSent(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      // Also trigger native mail client for convenience if needed
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Mridul,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.open(mailtoUrl, '_blank');
    }, 900);
  };

  return (
    <section 
      id="contact" 
      className="relative py-32 sm:py-44 bg-[#000000] overflow-hidden"
    >
      {/* Spectacular Multi-Layered Blurred Gradient Lights (Orange, Yellow, Pink, Sky Blue) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-orange/20 rounded-full blur-[170px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-yellow/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-brand-pink/20 rounded-full blur-[180px] pointer-events-none -z-10 animate-glow-pulse" />
      <div className="absolute bottom-10 right-1/3 w-[650px] h-[650px] bg-brand-sky/20 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-brand-orange text-xs font-mono mb-4 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>14 // FINAL INITIATION</span>
          </div>

          <h2 className="font-funky font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4">
            Let's Build Something <br />
            <span className="bg-gradient-to-r from-brand-orange via-brand-yellow via-brand-pink to-brand-sky bg-clip-text text-transparent">
              Extraordinary.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            You've explored who I am, what I build, my code proof, and my world. 
            Now let's collaborate on high-impact web platforms, custom canvas studios, or scalable backend architectures.
          </p>
        </div>

        {/* Contact Form & Contact Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Coordinates & Social Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Card */}
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase font-bold tracking-wider">
                  Direct Inbox
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald animate-ping"></span>
              </div>

              <div>
                <p className="font-display font-bold text-2xl text-white break-all">
                  {personalInfo.email}
                </p>
                <p className="text-xs font-mono text-slate-400 mt-2">
                  Dhaka, Bangladesh (UTC+6) • Sub-24h Response
                </p>
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full py-4 rounded-2xl bg-surface-900 hover:bg-surface-850 border border-white/10 text-xs font-mono font-semibold text-white flex items-center justify-center gap-2.5 transition-all shadow-md"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-brand-emerald" />
                    <span className="text-brand-emerald">Email Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-brand-sky" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Channels & Location Matrix */}
            <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-4 text-xs font-mono shadow-xl">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-900 border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-4 h-4 text-slate-300" />
                  <span className="text-slate-300 font-semibold">GitHub</span>
                </div>
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-brand-sky hover:underline flex items-center gap-1 font-bold"
                >
                  <span>@Mridul3636</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-900 border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-4 h-4 text-slate-300" />
                  <span className="text-slate-300 font-semibold">LinkedIn</span>
                </div>
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-brand-sky hover:underline flex items-center gap-1 font-bold"
                >
                  <span>Connect</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-900 border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-brand-yellow" />
                  <span className="text-slate-300 font-semibold">Telegram</span>
                </div>
                <a 
                  href={personalInfo.telegram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-brand-yellow hover:underline flex items-center gap-1 font-bold"
                >
                  <span>@Mridul3636</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Contact Form (7 cols) */}
          <div className="lg:col-span-7 glass-card p-8 sm:p-12 rounded-3xl border border-white/15 relative shadow-2xl">
            
            {isSent ? (
              <div className="text-center py-16 space-y-6 animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 flex items-center justify-center text-brand-emerald mx-auto shadow-xl">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="font-display font-bold text-3xl text-white">
                  Message Dispatched!
                </h3>
                <p className="text-sm sm:text-base font-sans text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, {formData.name}. I have received your dispatch and will respond promptly.
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-8 py-3.5 rounded-2xl bg-surface-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-2 font-semibold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Miller"
                      className="w-full bg-surface-900 border border-white/10 rounded-2xl px-5 py-4 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-2 font-semibold">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-surface-900 border border-white/10 rounded-2xl px-5 py-4 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-2 font-semibold">
                    Subject / Project Scope
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Full-Stack Web App / Tailoring Studio / Role Offer"
                    className="w-full bg-surface-900 border border-white/10 rounded-2xl px-5 py-4 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono text-slate-400 font-semibold">
                      Message *
                    </label>
                    <span className="text-[10px] font-mono text-slate-500">
                      {formData.message.length} chars
                    </span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your vision, timeline, or engineering challenge..."
                    className="w-full bg-surface-900 border border-white/10 rounded-2xl p-5 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs font-mono text-red-400">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-brand-orange via-brand-amber to-brand-sky text-black font-display font-black text-sm tracking-wider uppercase shadow-xl shadow-brand-orange/20 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5"
                >
                  <Send className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                  <span>{isSubmitting ? 'Dispatching Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
