import React, { useState } from 'react';
import { Shield, CheckSquare, Clock, CheckCircle, Flame, BarChart3, PieChart, Activity, RefreshCw, TrendingUp, AlertCircle, Zap, ChevronRight } from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';
import GoalTracker from '../components/GoalTracker';
import RecommendationBanner from '../components/RecommendationBanner';

const STATUS_CONFIG = {
  Pending:     { badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',   dot: 'bg-amber-400' },
  Verified:    { badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30', dot: 'bg-indigo-400' },
  Assigned:    { badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30', dot: 'bg-purple-400' },
  'In Progress':{ badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',      dot: 'bg-blue-400' },
  Resolved:    { badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-400' },
};

const SEVERITY_CONFIG = {
  Critical: 'bg-red-500/15 text-red-400 border-red-500/30',
  High:     'bg-orange-500/15 text-orange-400 border-orange-500/30',
  Medium:   'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  Low:      'bg-slate-500/15 text-slate-400 border-slate-500/30',
};

const CAT_COLORS = [
  'from-blue-500 to-indigo-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-purple-500 to-pink-500',
  'from-red-500 to-rose-500',
  'from-cyan-500 to-blue-500',
];

export default function AdminDashboard({ issues, setIssues, onChangeStatus, showToast }) {
  const [activeTab, setActiveTab] = useState('queue');

  const totalReports       = issues.length;
  const pendingReports     = issues.filter(i => i.status === 'Pending').length;
  const inProgressReports  = issues.filter(i => i.status === 'In Progress').length;
  const resolvedReports    = issues.filter(i => i.status === 'Resolved').length;
  const criticalReports    = issues.filter(i => i.severity === 'Critical' && i.status !== 'Resolved').length;
  const resolvedPct        = totalReports > 0 ? Math.round((resolvedReports / totalReports) * 100) : 0;
  const avgResolutionTime  = '2.4 Days';

  const sortedIssues = [...issues]
    .filter(i => i.status !== 'Resolved')
    .sort((a, b) => b.priorityScore - a.priorityScore);

  // AI-powered scheduling: pick highest priority pending issue
  const scheduleNextIssue = () => {
    const next = sortedIssues.find(i => i.status !== 'Resolved');
    if (next) {
      showToast(`Scheduled "${next.title}" (ID: ${next.id}) as your next task.`, 'info');
    } else {
      showToast('All issues are resolved! 🎉', 'success');
    }
  };

  // Generate .ics content for a given issue
  const generateICS = (issue) => {
    const start = new Date(issue.scheduledStart || Date.now());
    const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour default
    const pad = (n) => String(n).padStart(2, '0');
    const formatDate = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
    const uid = `${issue.id}@vibe2ship`; 
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Vibe2Ship//Issue Calendar//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(start)}`,
      `DTEND:${formatDate(end)}`,
      `SUMMARY:${issue.title || 'Issue'} - ${issue.category}`,
      `DESCRIPTION:${issue.description?.replace(/\n/g, '\\n')}`,
      `LOCATION:${issue.location || ''}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([ics], {type: 'text/calendar'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${issue.id}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleNextStatus = (issueId, currentStatus) => {
    const order = ['Pending', 'Verified', 'Assigned', 'In Progress', 'Resolved'];
    const idx = order.indexOf(currentStatus);
    if (idx < order.length - 1) {
      onChangeStatus(issueId, order[idx + 1]);
      showToast(`${issueId} advanced to ${order[idx + 1]}!`, 'success');
    }
  };

  const kpis = [
    { label: 'Total Reports',  value: totalReports,     color: 'text-slate-100',   sub: 'all time',      icon: <Activity className="h-5 w-5" />, glow: '', iconColor: 'text-slate-400', border: 'border-slate-700/40' },
    { label: 'Pending',        value: pendingReports,   color: 'text-amber-400',   sub: 'await action',  icon: <Clock className="h-5 w-5" />, glow: 'shadow-glow-amber', iconColor: 'text-amber-500', border: 'border-amber-500/20' },
    { label: 'In Progress',    value: inProgressReports,color: 'text-blue-400',    sub: 'active work',   icon: <RefreshCw className="h-5 w-5 animate-spin-slow" />, glow: 'shadow-glow-blue', iconColor: 'text-blue-500', border: 'border-blue-500/20' },
    { label: 'Resolved',       value: resolvedReports,  color: 'text-emerald-400', sub: `${resolvedPct}% rate`, icon: <CheckCircle className="h-5 w-5" />, glow: 'shadow-glow-green', iconColor: 'text-emerald-500', border: 'border-emerald-500/20' },
    { label: 'Critical',       value: criticalReports,  color: 'text-red-400',     sub: 'urgent now',    icon: <Flame className="h-5 w-5" />, glow: '', iconColor: 'text-red-500', border: 'border-red-500/20' },
    { label: 'Avg Clean Time', value: avgResolutionTime,color: 'text-indigo-400',  sub: 'per issue',     icon: <CheckSquare className="h-5 w-5" />, glow: 'shadow-glow-purple', iconColor: 'text-indigo-500', border: 'border-indigo-500/20' },
  ];

  return (
    <div className="page-transition min-h-screen bg-slate-950 text-white pb-12">
      {/* Page Header */}
      <div className="bg-slate-900/80 border-b border-slate-800 backdrop-blur-xl sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Authority Console</span>
                <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-emerald-400 font-semibold">Live</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Municipal Command Center</h1>
              <p className="text-xs text-slate-400 font-light">AI-prioritized dispatch board · Severity-indexed work orders</p>
            </div>

            {/* Recommendation Banner */}
          <RecommendationBanner issues={issues} />
            <div className="bg-slate-800/70 border border-slate-700/50 p-1.5 rounded-xl flex text-xs font-bold gap-1">
              {['queue', 'analytics'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all duration-200 ${activeTab === tab ? 'bg-blue-600 text-white shadow-glow-blue' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}>
                  {tab === 'queue' ? 'Priority Queue' : 'Analytics'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Goal Tracker Widget */}
          <GoalTracker issues={issues} setIssues={setIssues} showToast={showToast} />
        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {kpis.map((card, i) => (
            <div key={card.label}
              className={`bg-slate-900 border ${card.border} rounded-2xl p-4 hover-lift slide-up`}
              style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{card.label}</span>
                <span className={`${card.iconColor} opacity-70`}>{card.icon}</span>
              </div>
              <div className={`stat-value ${card.color}`} style={{ fontSize: '1.75rem' }}>{card.value}</div>
              <p className="text-[10px] text-slate-600 font-medium mt-1">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Personalized Recommendations */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-premium-lg slide-up" style={{ animationDelay: '500ms' }}>
          <h3 className="text-sm font-bold text-slate-100 mb-2">Personalized Recommendations</h3>
          <p className="text-xs text-slate-400">{pendingReports > 5 ? 'You have a high backlog. Prioritize the most critical issues first.' : 'Great job! Keep up the steady pace.'}</p>
          <button
            onClick={() => scheduleNextIssue()}
            className="mt-3 px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded transition"
          >
            Schedule Next Work
          </button>
        </div>

        {activeTab === 'queue' ? (
          /* PRIORITY QUEUE */
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-premium-lg page-transition">
            <div className="px-5 py-4 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-950/50">
              <div className="flex items-center gap-2.5">
                <Zap className="h-4 w-4 text-amber-400" />
                <h2 className="text-sm font-bold text-slate-100">Priority Work Order Dispatcher</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-red-500/10 text-red-400 font-bold px-3 py-1 rounded-full border border-red-500/20">
                  ↓ Sorted by AI Priority Score
                </span>
                <span className="text-[10px] text-slate-600 font-mono">{sortedIssues.length} active</span>
              </div>
            </div>

            {/* Mobile card view */}
            <div className="sm:hidden divide-y divide-slate-800/70">
              {sortedIssues.map((issue) => (
                <div key={issue.id} className="p-4 space-y-3 hover:bg-slate-800/30 transition">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 font-mono">{issue.id}</span>
                      <p className="text-sm font-bold text-slate-100 mt-0.5">{issue.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{issue.location}</p>
                    </div>
                    <span className="font-black text-amber-400 text-xl font-mono">{issue.priorityScore}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`badge border ${STATUS_CONFIG[issue.status]?.badge || ''}`}>{issue.status}</span>
                    <span className={`badge border ${SEVERITY_CONFIG[issue.severity] || ''}`}>{issue.severity}</span>
                    <span className="text-[10px] text-slate-500">{issue.department}</span>
                  </div>
                  {issue.status !== 'Resolved' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => generateICS(issue)}
                        className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 border border-slate-700">
                        📅 Export
                      </button>
                      <button
                        onClick={() => handleNextStatus(issue.id, issue.status)}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-glow-blue flex items-center justify-center gap-1">
                        Advance
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-950/30">
                    {['Ticket', 'Incident', 'Department', 'Score', 'Severity', 'Status', 'Action'].map(h => (
                      <th key={h} className={`py-3.5 px-4 ${h === 'Score' ? 'text-center' : h === 'Action' ? 'text-right' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {sortedIssues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-slate-800/30 transition-colors duration-150 group">
                      <td className="py-4 px-4">
                        <span className="font-mono text-[11px] font-bold text-slate-500 group-hover:text-slate-300 transition-colors">{issue.id}</span>
                      </td>
                      <td className="py-4 px-4 max-w-[200px]">
                        <p className="text-sm font-bold text-slate-200 truncate">{issue.title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 truncate">{issue.location}</p>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-400 font-medium">{issue.department}</td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-black text-amber-400 font-mono leading-none">{issue.priorityScore}</span>
                          <div className="w-10 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                            <div className="h-full progress-glow rounded-full" style={{ width: `${issue.priorityScore}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`badge border ${SEVERITY_CONFIG[issue.severity] || ''}`}>{issue.severity}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_CONFIG[issue.status]?.dot || 'bg-slate-500'}`}></span>
                          <span className={`badge border ${STATUS_CONFIG[issue.status]?.badge || ''}`}>{issue.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                                              {issue.status !== 'Resolved' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => generateICS(issue)}
                            className="px-3 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded"
                          >
                            📅 Export
                          </button>
                          <button
                            onClick={() => handleNextStatus(issue.id, issue.status)}
                            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold rounded flex items-center gap-1"
                          >
                            Advance <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-emerald-400 font-black flex items-center gap-1 justify-end">
                          <CheckCircle className="h-3.5 w-3.5" /> Closed
                        </span>
                      )}
                      </td>
                    </tr>
                  ))}
                  {sortedIssues.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-16 text-slate-500">
                        <CheckCircle className="h-10 w-10 text-emerald-500/40 mx-auto mb-3" />
                        <p className="font-bold text-slate-400">Queue is empty — all issues resolved!</p>
                        <p className="text-xs text-slate-600 mt-1">Great work. Check analytics for resolution history.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        ) : (
          /* ANALYTICS PANEL */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 page-transition">
            {/* Category Distribution */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-premium-lg">
              <div className="flex items-center gap-2.5 pb-5 mb-5 border-b border-slate-800">
                <div className="h-8 w-8 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-blue-400" />
                </div>
                <h2 className="text-sm font-bold text-slate-100">Category Distribution</h2>
              </div>
              <div className="space-y-4">
                {Object.keys(DEPARTMENTS).map((cat, i) => {
                  const count = issues.filter(issue => issue.category === cat).length;
                  const pct = totalReports > 0 ? (count / totalReports) * 100 : 0;
                  return (
                    <div key={cat} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-300">{cat}</span>
                        <span className="font-black text-slate-200">{count} <span className="font-normal text-slate-500">({Math.round(pct)}%)</span></span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${CAT_COLORS[i % CAT_COLORS.length]} transition-all duration-700`}
                          style={{ width: `${pct}%`, boxShadow: pct > 0 ? '0 0 6px rgba(99,102,241,0.4)' : 'none' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resolution Progress */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-premium-lg flex flex-col">
              <div className="flex items-center gap-2.5 pb-5 mb-5 border-b border-slate-800">
                <div className="h-8 w-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                  <PieChart className="h-4 w-4 text-emerald-400" />
                </div>
                <h2 className="text-sm font-bold text-slate-100">Resolution Clearance</h2>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 flex-1">
                {/* SVG Donut */}
                <div className="relative h-36 w-36 shrink-0">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path stroke="#1e293b" strokeWidth="3.5" fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    {/* In-progress arc */}
                    <path stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" fill="none"
                      strokeDasharray={`${totalReports > 0 ? ((inProgressReports / totalReports) * 100) : 0}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      className="transition-all duration-700 opacity-50" />
                    {/* Resolved arc */}
                    <path stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" fill="none"
                      strokeDasharray={`${resolvedPct}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      className="transition-all duration-700" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white font-mono">{resolvedPct}%</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Solved</span>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-3">
                  {[
                    { label: 'Resolved',    count: resolvedReports,   color: 'bg-emerald-500', glow: '0 0 8px rgba(16,185,129,0.4)' },
                    { label: 'In Progress', count: inProgressReports, color: 'bg-blue-500',    glow: '0 0 8px rgba(59,130,246,0.4)' },
                    { label: 'Pending',     count: pendingReports,    color: 'bg-amber-500',   glow: '' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-2.5 border-b border-slate-800/60 last:border-0">
                      <span className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                        <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} style={{ boxShadow: item.glow }}></span>
                        {item.label}
                      </span>
                      <div className="text-right">
                        <span className="text-sm font-black text-slate-200">{item.count}</span>
                        <span className="text-xs text-slate-600"> / {totalReports}</span>
                      </div>
                    </div>
                  ))}

                  {/* Trend indicator */}
                  <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-[10px] text-emerald-400 font-bold">+12% resolution rate this week</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-600 mt-5 pt-4 border-t border-slate-800 font-light font-mono">
                * Analytics computed from live in-memory state. Recalibrates on each status transition.
              </p>
            </div>

            {/* Status breakdown mini grid */}
            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Critical Issues', count: criticalReports, icon: <AlertCircle className="h-5 w-5" />, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
                { label: 'Avg Response', count: avgResolutionTime, icon: <Clock className="h-5 w-5" />, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
                { label: 'Resolution Rate', count: `${resolvedPct}%`, icon: <TrendingUp className="h-5 w-5" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                { label: 'Dept Assigned', count: Object.keys(DEPARTMENTS).length, icon: <Shield className="h-5 w-5" />, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
              ].map((s, i) => (
                <div key={s.label} className={`bg-slate-900 border ${s.bg} rounded-2xl p-4 flex items-center gap-3`}>
                  <div className={`${s.color} opacity-70`}>{s.icon}</div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{s.label}</p>
                    <p className={`text-xl font-black ${s.color} font-mono leading-tight mt-0.5`}>{s.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
