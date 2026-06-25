import React from 'react';
import { Award, Shield, Trophy, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LeaderboardPage({ leaderboardData, userProfile }) {
  // Find user's dynamic standing in the leaderboard list
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => b.points - a.points);
  
  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Community Hero':       return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Street Saver':         return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Clean City Champion':  return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Safety Guardian':      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Local Leader':         return 'bg-purple-100 text-purple-800 border-purple-200';
      default:                     return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'Community Hero':       return <Trophy className="h-3.5 w-3.5 text-amber-500" />;
      case 'Street Saver':         return <Star className="h-3.5 w-3.5 text-blue-500" />;
      case 'Clean City Champion':  return <Award className="h-3.5 w-3.5 text-emerald-500" />;
      default:                     return <Shield className="h-3.5 w-3.5 text-indigo-500" />;
    }
  };

  return (
    <div className="page-transition max-w-5xl mx-auto px-4 py-8 bg-dot-pattern">
      {/* Header block */}
      <div className="mb-8 text-center sm:text-left space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Citizen Leaderboard</h1>
        <p className="text-slate-500 font-light max-w-2xl text-sm sm:text-base">
          Unlock community impact scores and rise in local ranks by filing validated reports or voting on neighborhood infrastructure nodes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Rankings Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-premium overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 flex items-center">
              <Trophy className="h-5 w-5 text-yellow-500 mr-2 animate-bounce" />
              Top Active Neighbors
            </h2>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Weekly recalibration</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                  <th className="py-3 px-5 text-center w-12">Rank</th>
                  <th className="py-3 px-5">Citizen</th>
                  <th className="py-3 px-5">Badge Tier</th>
                  <th className="py-3 px-5 text-center">Reports</th>
                  <th className="py-3 px-5 text-center">Audits</th>
                  <th className="py-3 px-5 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {sortedLeaderboard.map((user, idx) => {
                  const isSelf = user.name === userProfile.name;
                  const rankPosition = idx + 1;
                  
                  return (
                    <tr key={user.name} className={`hover:bg-slate-50/40 transition ${isSelf ? 'bg-blue-50/40 font-semibold' : ''}`}>
                      <td className="py-4 px-5 text-center font-bold">
                        {rankPosition === 1 ? '🥇' : rankPosition === 2 ? '🥈' : rankPosition === 3 ? '🥉' : rankPosition}
                      </td>
                      <td className="py-4 px-5 flex items-center space-x-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelf ? 'bg-blue-600 text-white shadow-glow-blue' : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {user.avatar}
                        </div>
                        <div>
                          <p className="text-slate-800 font-bold flex items-center">
                            {user.name} 
                            {isSelf && <span className="ml-1.5 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[8px] font-extrabold uppercase rounded border border-blue-200">You</span>}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <div className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getBadgeStyle(user.badge)}`}>
                          {getBadgeIcon(user.badge)}
                          <span>{user.badge}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-center font-medium text-slate-500">{user.reports}</td>
                      <td className="py-4 px-5 text-center font-medium text-slate-500">{user.verifications}</td>
                      <td className="py-4 px-5 text-right font-black font-mono text-yellow-600">{user.points} pts</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Gamification Rules & Badges */}
        <div className="lg:col-span-4 space-y-6">
          {/* Rules info */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center space-x-2 pb-3 mb-3.5 border-b border-slate-800">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Points Distribution</h3>
            </div>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block">Report Verified Incident (+20 pts)</span>
                  <span className="text-[11px] text-slate-400 font-light block">Awarded when the community verification threshold approves your ticket.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block">Verify Active Incidents (+10 pts)</span>
                  <span className="text-[11px] text-slate-400 font-light block">Awarded instantly when you cast your vote on pending reports.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block">Upload Solved Proof (+15 pts)</span>
                  <span className="text-[11px] text-slate-400 font-light block">Awarded when you upload a photo validating a contractor's resolved work.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badges showcase info */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-premium">
            <h3 className="text-sm font-bold text-slate-800 pb-3 mb-4 border-b border-slate-100">Reward Badge Classes</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="font-semibold text-slate-600">Community Hero</span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full uppercase">300+ Points</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="font-semibold text-slate-600">Street Saver</span>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase">250+ Points</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="font-semibold text-slate-600">Clean City Champion</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase">200+ Points</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="font-semibold text-slate-600">Safety Guardian</span>
                <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full uppercase">150+ Points</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="font-semibold text-slate-600">Local Leader</span>
                <span className="text-[10px] font-bold text-purple-800 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full uppercase">100+ Points</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
