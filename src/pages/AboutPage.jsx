import React from 'react';
import { Camera, Brain, MapPin, Users, Hammer, CheckSquare, ShieldCheck, Heart } from 'lucide-react';

export default function AboutPage() {
  const steps = [
    {
      step: "Step 1",
      icon: <Camera className="h-6 w-6 text-blue-500" />,
      title: "Citizen Reports Issue",
      desc: "Citizens notice a public hazard (e.g. pothole, broken streetlight, open sewer) and snap a photo. Geolocation is gathered automatically."
    },
    {
      step: "Step 2",
      icon: <Brain className="h-6 w-6 text-indigo-500" />,
      title: "AI Detects & Classifies",
      desc: "Our custom computer vision model analyzes the upload, detects the hazard, indexes its severity, and drafts a priority score."
    },
    {
      step: "Step 3",
      icon: <MapPin className="h-6 w-6 text-teal-500" />,
      title: "Hyperlocal Mapping",
      desc: "The verified incident is mapped to a public city dashboard. Coordinate metrics help prevent duplicate work orders."
    },
    {
      step: "Step 4",
      icon: <Users className="h-6 w-6 text-amber-500" />,
      title: "Community Verification",
      desc: "Local neighbors vote to verify reports, filtering out duplicate or incorrect claims. Gamification points are awarded."
    },
    {
      step: "Step 5",
      icon: <Hammer className="h-6 w-6 text-purple-500" />,
      title: "Authority Resolves",
      desc: "Municipal departments access the priority queue directly, assigning contractor crews to clean up or repair the nodes."
    },
    {
      step: "Step 6",
      icon: <CheckSquare className="h-6 w-6 text-emerald-500" />,
      title: "Citizen Validation",
      desc: "Once resolved, citizens must upload a 'Proof of Resolution' photo. This closes the ticket and awards extra points."
    }
  ];

  return (
    <div className="page-transition max-w-5xl mx-auto px-4 py-8 bg-dot-pattern">
      {/* Title block */}
      <div className="mb-12 text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          How It Works
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">The Hyperlocal SheherOS Loop</h1>
        <p className="text-slate-500 font-light max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          SheherOS bridges the communication gap between municipal authorities and citizens through automated priority indexing.
        </p>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {steps.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-premium flex flex-col justify-between hover:shadow-md transition duration-200">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-slate-400 font-mono tracking-wider">{item.step}</span>
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack Callout */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 text-blue-400">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Mission Statement</span>
          </div>
          <h2 className="text-xl font-bold text-white leading-snug">Hyperlocal trust, speed, and accountability</h2>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            By putting the verification power in the hands of the community and organizing contractor jobs based on safety proximity indicators, SheherOS ensures municipal funds are spent where they are needed most.
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400 shrink-0 font-light border border-slate-850 p-3 rounded-2xl bg-slate-950/40">
          Made with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 mx-0.5 animate-pulse" /> for the Vibe Coding Hackathon 2026
        </div>
      </div>
    </div>
  );
}
