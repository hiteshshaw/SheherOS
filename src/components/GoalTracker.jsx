import React, { useState, useEffect } from 'react';

// GoalTracker component: Allows users to set a weekly civic contribution target and track progress.
// Progress is persisted in localStorage under the key "goalTracker".
export default function GoalTracker({ showToast }) {
  const storageKey = 'goalTracker';
  const [target, setTarget] = useState(5); // default weekly target
  const [progress, setProgress] = useState(0);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const { target: t, progress: p } = JSON.parse(saved);
        setTarget(t);
        setProgress(p);
      } catch (e) {
        console.error('Failed to parse goalTracker storage', e);
      }
    }
  }, []);

  // Save whenever target or progress changes
  useEffect(() => {
    const payload = JSON.stringify({ target, progress });
    localStorage.setItem(storageKey, payload);
  }, [target, progress]);

  const increment = () => {
    if (progress < target) {
      setProgress(prev => prev + 1);
      showToast(`Great! You've made progress on your weekly goal. (${progress + 1}/${target})`, 'success');
    }
  };

  const resetGoal = () => {
    setProgress(0);
    showToast('Goal progress reset for the new week.', 'info');
  };

  const handleTargetChange = e => {
    const val = parseInt(e.target.value, 10) || 0;
    setTarget(val > 0 ? val : 1);
    if (progress > val) setProgress(val);
  };

  const percent = Math.min(100, Math.round((progress / target) * 100));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-premium-lg slide-up">
      <h3 className="text-sm font-bold text-slate-100 mb-2">Weekly Goal Tracker</h3>
      <div className="flex items-center space-x-4 mb-3">
        <label className="text-xs text-slate-400">Target:</label>
        <input
          type="number"
          min="1"
          value={target}
          onChange={handleTargetChange}
          className="w-16 bg-slate-800 text-slate-200 border border-slate-600 rounded px-2 py-1 text-xs"
        />
        <span className="text-xs text-slate-500">issues per week</span>
      </div>
      <div className="relative w-24 h-24 mx-auto mb-4">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path
            fill="none"
            stroke="#1e293b"
            strokeWidth="3.5"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3.5"
            strokeLinecap="round"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
            strokeDasharray={`${percent}, 100`}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-black text-white font-mono">{percent}%</span>
          <span className="text-xs text-slate-400">complete</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={increment}
          disabled={progress >= target}
          className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded transition disabled:opacity-50"
        >
          Increment
        </button>
        <button
          onClick={resetGoal}
          className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
