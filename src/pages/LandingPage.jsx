import React from 'react';
import { 
  ArrowRight, ShieldCheck, MapPin, Eye, Zap, AlertTriangle, 
  Trash2, Droplet, Lightbulb, Users, BarChart3, Sparkles, 
  CheckCircle2, Clock, Play, Upload, Smartphone, Wrench, AlertOctagon, HelpCircle, TrendingUp 
} from 'lucide-react';

export default function LandingPage({ setActivePage, setSelectedIssueId, issues }) {
  const categories = [
    { name: 'Pothole',          icon: <AlertTriangle className="h-4 w-4" />, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
    { name: 'Garbage',           icon: <Trash2 className="h-4 w-4" />,        color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { name: 'Water Leakage',     icon: <Droplet className="h-4 w-4" />,       color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { name: 'Broken Streetlight',icon: <Lightbulb className="h-4 w-4" />,     color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
    { name: 'Drainage Problem',  icon: <Wrench className="h-4 w-4" />,        color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { name: 'Damaged Road',      icon: <AlertOctagon className="h-4 w-4" />,  color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
    { name: 'Illegal Dumping',   icon: <Trash2 className="h-4 w-4" />,        color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
    { name: 'Open Manhole',      icon: <AlertTriangle className="h-4 w-4" />, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  ];

  const steps = [
    { id: '1', title: 'Report', desc: 'Citizen reports issue with photo.' },
    { id: '2', title: 'AI Detects', desc: 'AI detects type & severity.' },
    { id: '3', title: 'Map & Locate', desc: 'Added to live map.' },
    { id: '4', title: 'Community Verify', desc: 'Citizens verify the issue.' },
    { id: '5', title: 'Authority Action', desc: 'Authority assigns & resolves.' },
    { id: '6', title: 'Proof of Resolution', desc: 'Citizens verify solution.' },
  ];

  const stats = [
    { value: '1,240+', label: 'Issues Reported',   color: 'text-blue-400',    icon: <TrendingUp className="h-4 w-4 text-blue-400" /> },
    { value: '86%',    label: 'Community Verified', color: 'text-emerald-400', icon: <Sparkles className="h-4 w-4 text-emerald-400" /> },
    { value: '430+',   label: 'Issues Resolved',    color: 'text-indigo-400',  icon: <CheckCircle2 className="h-4 w-4 text-indigo-400" /> },
    { value: '24',     label: 'Active Local Areas', color: 'text-amber-400',   icon: <MapPin className="h-4 w-4 text-amber-400" /> },
  ];

  const liveIssues = [
    { title: 'Pothole on Main Road', location: 'Ward 12, Near City Hospital', severity: 'High', severityColor: 'bg-red-500/10 text-red-400 border border-red-500/20', votes: '8 Verified', time: '10m ago', img: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=150&q=80' },
    { title: 'Garbage Dump on Street', location: 'Ward 11, Market Road', severity: 'Medium', severityColor: 'bg-amber-500/10 text-amber-400 border border-amber-500/20', votes: '5 Verified', time: '25m ago', img: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=150&q=80' },
    { title: 'Broken Streetlight', location: 'Ward 9, Park Street', severity: 'In Progress', severityColor: 'bg-blue-500/10 text-blue-400 border border-blue-500/20', votes: '3 Verified', time: '1h ago', img: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?auto=format&fit=crop&w=150&q=80' },
    { title: 'Water Leakage', location: 'Ward 12, Near School', severity: 'Solved', severityColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20', votes: '7 Verified', time: '2h ago', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=150&q=80' },
  ];

  return (
    <div className="page-transition min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-900">
        <div className="absolute inset-0 bg-dot-dark opacity-60"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Column 1: Headline & Actions */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-6 text-center lg:text-left slide-up">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-300 backdrop-blur-sm w-fit mx-auto lg:mx-0">
                <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                AI-Powered Hyperlocal Problem Solver
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                <span className="block text-white">Report Local Issues.</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                  Track Real Fixes.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light">
                SheherOS helps citizens and authorities work together to build cleaner, safer, better cities. Snap a photo, let AI route and score the issue, and trace resolution timeline in real-time.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  id="hero-report-btn"
                  onClick={() => setActivePage('report')}
                  className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-glow-blue hover-lift text-xs cursor-pointer"
                >
                  <Zap className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                  Report Issue Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
                <button
                  id="hero-map-btn"
                  onClick={() => setActivePage('map')}
                  className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white font-bold rounded-2xl transition-all duration-300 text-xs cursor-pointer"
                >
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  Explore Live Map
                </button>
              </div>

              <div className="flex justify-center lg:justify-start items-center">
                <button
                  onClick={() => {
                    const el = document.getElementById('how-it-works-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-xs font-semibold hover:underline cursor-pointer"
                >
                  <Play className="h-3 w-3 fill-current" />
                  See How It Works
                </button>
              </div>
            </div>

            {/* Column 2: Live Issue Map Preview */}
            <div 
              onClick={() => setActivePage('map')}
              className="lg:col-span-4 glass-dark rounded-3xl p-5 border border-white/10 hover:border-blue-500/40 relative overflow-hidden h-[400px] flex flex-col justify-between slide-up delay-100 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-slate-200">Live Issue Map (Sample)</span>
                <span className="text-[10px] text-blue-400 font-bold group-hover:underline">View Live Map →</span>
              </div>
              <div className="relative flex-1 mt-3 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                {/* SVG Mock Map */}
                <svg viewBox="0 0 400 300" className="w-full h-full opacity-60">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.05"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <path d="M 50 0 Q 150 100 200 300" fill="none" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 0 150 L 400 150" fill="none" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
                  <path d="M 300 0 L 300 300" fill="none" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 0 50 Q 200 80 400 30" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 120 0 C 120 120 280 180 400 220" fill="none" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
                  <path d="M 150 100 L 300 100" fill="none" stroke="#1e293b" strokeWidth="3" strokeDasharray="3,3" />
                  <path d="M 200 150 L 200 250" fill="none" stroke="#1e293b" strokeWidth="3" strokeDasharray="3,3" />
                </svg>

                {/* Glowing issue pins */}
                <div className="absolute top-[25%] left-[45%] -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '0s' }} title="Critical Pothole">
                  <div className="absolute -inset-2 bg-red-500/30 rounded-full blur animate-ping"></div>
                  <div className="relative bg-gradient-to-b from-red-400 to-red-600 p-2.5 rounded-full border border-white/40 shadow-glow-red flex items-center justify-center">
                    <AlertTriangle className="h-3 w-3 text-white" />
                  </div>
                </div>

                <div className="absolute top-[35%] left-[20%] -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '0.4s' }} title="Pending Garbage">
                  <div className="absolute -inset-2 bg-amber-500/20 rounded-full blur animate-pulse"></div>
                  <div className="relative bg-gradient-to-b from-amber-400 to-amber-600 p-2.5 rounded-full border border-white/40 shadow-glow-amber flex items-center justify-center">
                    <Trash2 className="h-3 w-3 text-white" />
                  </div>
                </div>

                <div className="absolute top-[60%] left-[70%] -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '0.8s' }} title="Broken Streetlight">
                  <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur animate-pulse"></div>
                  <div className="relative bg-gradient-to-b from-blue-400 to-blue-600 p-2.5 rounded-full border border-white/40 shadow-glow-blue flex items-center justify-center">
                    <Lightbulb className="h-3 w-3 text-white" />
                  </div>
                </div>

                <div className="absolute top-[65%] left-[35%] -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '1.2s' }} title="Resolved Incident">
                  <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur animate-pulse"></div>
                  <div className="relative bg-gradient-to-b from-emerald-400 to-emerald-600 p-2.5 rounded-full border border-white/40 shadow-glow-green flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                </div>

                <div className="absolute top-[20%] left-[65%] -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '1.6s' }} title="Water Leakage">
                  <div className="absolute -inset-2 bg-indigo-500/20 rounded-full blur animate-pulse"></div>
                  <div className="relative bg-gradient-to-b from-indigo-400 to-indigo-600 p-2.5 rounded-full border border-white/40 shadow-glow-indigo flex items-center justify-center">
                    <Droplet className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>

              {/* Map Legend Overlay */}
              <div className="flex justify-between text-[8px] text-slate-400 mt-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-red-500"></span> High Priority</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span> Medium</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> In Progress</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Resolved</span>
              </div>
            </div>

            {/* Column 3: AI Analysis in Action */}
            <div 
              onClick={() => setActivePage('report')}
              className="lg:col-span-4 relative slide-up delay-200 cursor-pointer group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-3xl blur-2xl group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative glass-dark rounded-3xl p-5 shadow-2xl border border-white/10 hover:border-indigo-500/40 flex flex-col justify-between h-[400px] transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                {/* Header */}
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-200">AI Analysis in Action</span>
                  </div>
                  <span className="text-[10px] text-indigo-400 font-bold group-hover:underline">Try AI Report →</span>
                </div>

                {/* Flow Pipeline */}
                <div className="flex justify-between items-center mt-3 mb-3 text-[9px] bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80 select-none">
                  <div className="flex flex-col items-center gap-1 text-center shrink-0">
                    <div className="h-7 w-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Upload className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-slate-400 text-[8px] leading-tight">Photo<br/>Upload</span>
                  </div>
                  <span className="text-slate-700 font-bold">›</span>
                  <div className="flex flex-col items-center gap-1 text-center shrink-0">
                    <div className="h-7 w-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-slate-400 text-[8px] leading-tight">AI<br/>Detects</span>
                  </div>
                  <span className="text-slate-700 font-bold">›</span>
                  <div className="flex flex-col items-center gap-1 text-center shrink-0">
                    <div className="h-7 w-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-slate-400 text-[8px] leading-tight">Geo<br/>Tagged</span>
                  </div>
                  <span className="text-slate-700 font-bold">›</span>
                  <div className="flex flex-col items-center gap-1 text-center shrink-0">
                    <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Users className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-slate-400 text-[8px] leading-tight">Community<br/>Votes</span>
                  </div>
                  <span className="text-slate-700 font-bold">›</span>
                  <div className="flex flex-col items-center gap-1 text-center shrink-0">
                    <div className="h-7 w-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-slate-400 text-[8px] leading-tight">Authority<br/>Acts</span>
                  </div>
                </div>

                {/* AI Output Card */}
                <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800 flex-1 flex gap-3 items-center min-h-0">
                  <div className="w-[86px] h-[86px] rounded-xl overflow-hidden border border-slate-700 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=200&q=80"
                      alt="Detected Pothole"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2 min-w-0">
                    <div>
                      <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest block">Gemini AI Detected</span>
                      <span className="text-sm font-black text-white leading-tight">Pothole — Road Damage</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-red-500/15 text-red-400 border border-red-500/25">High Severity</span>
                      <span className="text-[9px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Score 87/100</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] pt-1.5 border-t border-slate-800/60">
                      <div>
                        <span className="text-slate-500 block uppercase font-bold text-[7px] tracking-wide">Location</span>
                        <span className="text-slate-300 font-semibold truncate block">Main Road, Ward 12</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block uppercase font-bold text-[7px] tracking-wide">Department</span>
                        <span className="text-slate-300 font-semibold truncate block">Road Maintenance</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center text-[9px] pt-2.5 border-t border-slate-800/60 mt-2">
                  <span className="text-slate-500">Est. Resolution: <span className="text-slate-200 font-bold">3–5 days</span></span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">94% Confidence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PUBLIC TRUST STATS STRIP ── */}
      <section className="relative bg-slate-950 py-8 border-b border-slate-900">
        <div className="absolute inset-0 bg-dot-dark opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ value, label, color, icon }, idx) => (
              <div key={label} className="flex items-center gap-3 p-4 bg-slate-900/40 rounded-2xl border border-slate-800/60 hover:bg-slate-900/60 transition-all select-none">
                <div className={`p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 ${color} flex items-center justify-center shrink-0 shadow-md`}>
                  {icon}
                </div>
                <div>
                  <span className={`text-xl sm:text-2xl font-black block tracking-tight ${color}`}>{value}</span>
                  <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider block mt-0.5">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE APP FEATURES & LIVE PREVIEW ── */}
      <section className="py-12 md:py-16 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Panel 1: Categories & Flow (Left) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              {/* Category selector visualizer */}
              <div className="glass-dark border border-white/10 rounded-3xl p-5 shadow-2xl flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-4">
                  <span className="text-xs font-bold text-slate-200">What Issues Can You Report?</span>
                  <button onClick={() => setActivePage('report')} className="text-[10px] font-bold text-blue-400 hover:underline cursor-pointer">
                    View All Categories →
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat, i) => (
                    <div 
                      key={i} 
                      onClick={() => setActivePage('report')}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-900 hover:border-slate-700 transition-all select-none cursor-pointer hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                    >
                      <div className={`p-1.5 rounded-lg border ${cat.color} shrink-0`}>
                        {cat.icon}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-300">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* App Flow / How it works */}
              <div id="how-it-works-section" className="glass-dark border border-white/10 rounded-3xl p-5 shadow-2xl">
                <div className="pb-3 border-b border-white/10 mb-4">
                  <span className="text-xs font-bold text-slate-200">How SheherOS Works</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[10px]">
                  {steps.map((st) => (
                    <div key={st.id} className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl relative overflow-hidden">
                      <span className="absolute -top-1 -right-1 text-2xl font-black text-slate-950 font-mono select-none">0{st.id}</span>
                      <span className="font-extrabold text-blue-400 block relative z-10">{st.id}. {st.title}</span>
                      <span className="text-slate-400 text-[9px] mt-0.5 block leading-relaxed relative z-10">{st.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel 2: Mobile Phone Mockup (Center) */}
            <div className="lg:col-span-4 flex items-center justify-center slide-up delay-100">
              <div className="relative w-[280px] sm:w-[320px] aspect-[9/19] bg-black rounded-[42px] p-3 border-4 border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative">
                {/* Dynamic island/notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-slate-900 rounded-full ml-auto mr-3"></div>
                </div>
                
                {/* Screen */}
                <div className="relative w-full h-full bg-slate-950 rounded-[32px] overflow-hidden flex flex-col justify-between border border-slate-900 p-4 select-none font-sans">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold px-2 pt-1">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <span>LTE</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="flex items-center gap-2 text-xs font-black text-white mt-2 pb-2 border-b border-slate-900">
                    <span className="text-slate-400 cursor-pointer">←</span>
                    <span>Report an Issue</span>
                  </div>

                  {/* Steps list */}
                  <div className="grid grid-cols-4 gap-1 text-[8px] text-center font-bold text-slate-500 py-2">
                    <span className="text-blue-400 bg-blue-500/10 py-0.5 rounded-full border border-blue-500/20">1. Photo</span>
                    <span>2. Details</span>
                    <span>3. Location</span>
                    <span>4. Submit</span>
                  </div>

                  {/* Photo container with scan line */}
                  <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-800 shadow-inner bg-slate-900 flex items-center justify-center my-1 group">
                    <img src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&q=80" alt="Pothole scan" className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-shimmer top-1/2"></div>
                    <div className="absolute top-2 right-2 bg-slate-950/80 px-2 py-0.5 rounded-md text-[8px] font-bold text-blue-400 uppercase tracking-widest border border-blue-500/20 animate-pulse">
                      SCANNING
                    </div>
                  </div>

                  {/* AI Detection Result table */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-2.5 space-y-1.5 text-[9px] leading-relaxed">
                    <div className="flex justify-between items-center pb-1 border-b border-slate-800/50">
                      <span className="font-bold text-slate-200">AI Detection Result</span>
                      <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md font-extrabold text-[8px]">94% Confidence</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Issue Type</span>
                      <span className="text-white font-bold">Pothole</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Severity</span>
                      <span className="text-red-400 font-extrabold">High</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Priority Score</span>
                      <span className="text-amber-400 font-extrabold">87 / 100</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Department</span>
                      <span className="text-slate-200 font-medium truncate max-w-[100px]">Road Maintenance</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button onClick={() => setActivePage('report')} className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl text-[10px] flex items-center justify-center gap-1.5 shadow-glow-blue transition-all cursor-pointer mt-2">
                    <Zap className="h-3 w-3" />
                    Submit Report
                  </button>
                </div>
              </div>
            </div>

            {/* Panel 3: Live Issues & Proof of Resolution (Right) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              
              {/* Live issues feed */}
              <div className="glass-dark border border-white/10 rounded-3xl p-5 shadow-2xl flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-4">
                  <span className="text-xs font-bold text-slate-200">Live Issues Around You</span>
                  <button onClick={() => setActivePage('map')} className="text-[10px] font-bold text-blue-400 hover:underline cursor-pointer">
                    View Map →
                  </button>
                </div>
                <div className="space-y-3">
                  {(issues && issues.length > 0
                    ? issues.slice(0, 4).map(issue => ({
                        id: issue.id,
                        title: issue.title,
                        location: issue.location,
                        severity: issue.severity,
                        severityColor: issue.severity === 'Critical' || issue.severity === 'High'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : issue.status === 'Resolved' || issue.status === 'Closed & Verified'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
                        votes: `${issue.verifications} Verified`,
                        time: issue.reportedTime || 'Just now',
                        img: issue.imageUrl || 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=150&q=80'
                      }))
                    : liveIssues
                  ).map((issue, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => {
                        if (issue.id) {
                          setSelectedIssueId(issue.id);
                          setActivePage('details');
                        } else {
                          // Fallback click behaviour for mockup issues
                          const firstRealIssue = issues && issues[0];
                          if (firstRealIssue) {
                            setSelectedIssueId(firstRealIssue.id);
                            setActivePage('details');
                          } else {
                            setActivePage('track');
                          }
                        }
                      }}
                      className="flex gap-2.5 p-2 bg-slate-900/60 border border-slate-800/80 rounded-2xl hover:bg-slate-900 hover:border-slate-700 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all select-none cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-800 shrink-0">
                        <img src={issue.img} alt={issue.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-1">
                          <p className="text-[10px] font-bold text-slate-200 truncate leading-snug">{issue.title}</p>
                          <span className="text-[8px] text-slate-500 font-mono shrink-0">{issue.time}</span>
                        </div>
                        <p className="text-[8px] text-slate-500 truncate mt-0.5">{issue.location}</p>
                        <div className="flex items-center justify-between text-[8px] mt-1">
                          <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-extrabold uppercase shrink-0 ${issue.severityColor}`}>
                            {issue.severity}
                          </span>
                          <span className="text-slate-400 font-bold">{issue.votes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proof of Resolution card */}
              <div className="glass-dark border border-white/10 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none"></div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-3">
                  <span className="text-xs font-bold text-slate-200">Proof of Resolution</span>
                  <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                    New
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-light leading-relaxed mb-3">
                  Authority marked this issue as resolved. Help us verify by uploading a fresh photo of the completed repair.
                </p>
                {/* Dotted Upload Box */}
                <div onClick={() => setActivePage('track')} className="border border-dashed border-slate-700 hover:border-blue-500/60 bg-slate-950/50 p-5 rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer group transition-all">
                  <div className="h-8 w-8 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors shadow-md">
                    <Upload className="h-4 w-4" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-300 group-hover:text-white">Upload Proof Photo</span>
                  <span className="text-[7px] text-slate-500">Drag & drop or click to upload</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-glow-blue">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-black text-white tracking-tight">SheherOS</span>
                <p className="text-[9px] text-slate-600 font-mono">Powered by Gemini 2.5 Flash</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-600 font-light">Vibe Coding Hackathon 2026 · React + Tailwind CSS + Google Maps API</p>
              <p className="text-[10px] text-slate-700 mt-1">© 2026 SheherOS · MIT License</p>
            </div>
            <div className="flex gap-2">
              {['Report', 'Map', 'Leaderboard'].map(p => (
                <button key={p} onClick={() => setActivePage(p.toLowerCase() === 'map' ? 'map' : p.toLowerCase())}
                  className="text-[10px] font-semibold text-slate-600 hover:text-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-800/50 transition-all cursor-pointer">
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
