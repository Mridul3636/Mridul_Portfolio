import { Sparkles, Download, FileText, CheckCircle2, Award, GraduationCap, Building2, School } from 'lucide-react';
import { educationInfo, personalInfo } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

export const EducationSection: React.FC = () => {
  const getAcademicIcon = (idx: number) => {
    if (idx === 0) return <GraduationCap className="w-5 h-5 text-brand-sky" />;
    if (idx === 1) return <Building2 className="w-5 h-5 text-brand-emerald" />;
    return <School className="w-5 h-5 text-brand-amber" />;
  };
  return (
    <section 
      id="education" 
      className="relative py-28 sm:py-36 bg-[#02040a] border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Chromatic Gradient */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-brand-sky/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-brand-emerald/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-sky/10 border border-brand-sky/20 text-brand-sky text-xs font-mono mb-3 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>08 // ACADEMIC FOUNDATION & RESEARCH</span>
            </div>
            <h2 className="font-funky font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Education & Research
            </h2>
          </div>

          <a
            href={personalInfo.cvUrl}
            download="Mridul_CV.pdf"
            onClick={() => soundEngine.playSuccess()}
            className="self-start md:self-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-emerald via-teal-400 to-brand-sky text-black font-display font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Official CV (PDF)</span>
          </a>
        </div>

        {/* Academic Timeline Grid (3 Cards: University, HSC, SSC) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {educationInfo.academicRecords?.map((record, idx) => (
            <div 
              key={idx}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-brand-sky/40 transition-all duration-300 flex flex-col justify-between shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-surface-900 border border-white/10 flex items-center justify-center shadow-md">
                    {getAcademicIcon(idx)}
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-surface-900 border border-brand-sky/30 text-brand-sky">
                    {record.result}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  {record.year}
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-brand-sky transition-colors mb-2">
                  {record.institution}
                </h3>
              </div>

              <div className="pt-4 border-t border-white/[0.08] mt-4">
                <span className="text-xs font-mono text-slate-300 block">
                  {record.level}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Thesis & CV Download Action Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Undergraduate Research & Thesis Papers (7 cols) */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
            <div className="flex items-center gap-2.5 text-xs font-mono text-brand-sky font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-brand-sky" />
              <span>Undergraduate Thesis & Research Papers</span>
            </div>

            <div className="space-y-4">
              {educationInfo.thesis?.map((t, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-surface-900 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-brand-sky/15 text-brand-sky font-bold uppercase">
                      {t.area}
                    </span>
                    <span className="text-[10px] font-mono text-brand-emerald font-semibold">
                      {t.status}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-white">
                    {t.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Direct CV Download & Credentials Card (5 cols) */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border border-brand-emerald/30 flex flex-col justify-between shadow-2xl bg-gradient-to-br from-[#06101c] to-[#02050c]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-emerald/15 border border-brand-emerald/30 flex items-center justify-center text-brand-emerald">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-400">PDF • 159 KB</span>
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-2">
                Official Curriculum Vitae
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                Verified background covering Software Engineering internships, SQA testing, YOLOv11 deep learning research, and full-stack projects.
              </p>

              <div className="space-y-2 text-xs font-mono text-slate-300 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0" />
                  <span>Graduation Year: 2026 • CGPA: 3.28</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0" />
                  <span>German (A1) • English • Bengali</span>
                </div>
              </div>
            </div>

            <a
              href={personalInfo.cvUrl}
              download="Mridul_CV.pdf"
              onClick={() => soundEngine.playSuccess()}
              className="w-full py-4 rounded-2xl bg-brand-emerald text-black font-display font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Mridul_CV.pdf</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
