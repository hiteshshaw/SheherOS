import React from 'react';
import { MapPin, Clock, AlertCircle } from 'lucide-react';

// Mock recommendation logic: picks a random pending issue from the same department
export default function RecommendationBanner({ issues }) {
  // For demo, filter pending high severity issues
  const candidates = issues.filter(i => i.status === 'Pending' && i.severity === 'Critical');
  const recommendation = candidates.length ? candidates[0] : null;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 mb-6 shadow-premium-lg slide-up">
      <h3 className="text-sm font-bold text-slate-100 mb-2">Nearby High‑Priority Issues</h3>
      {recommendation ? (
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-amber-400" />
          <div>
            <p className="text-xs text-slate-300">{recommendation.title}</p>
            <p className="text-[10px] text-slate-500">{recommendation.location}</p>
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-400">No critical pending issues nearby.</p>
      )}
    </div>
  );
}
