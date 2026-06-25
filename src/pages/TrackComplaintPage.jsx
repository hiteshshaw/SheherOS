import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpRight, Clock, MapPin } from 'lucide-react';

export default function TrackComplaintPage({ issues, setActivePage, setSelectedIssueId }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All'); // All, High/Critical, Medium/Low

  // Filter conditions
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase()) || 
                          issue.location.toLowerCase().includes(search.toLowerCase()) ||
                          issue.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;
    
    let matchesPriority = true;
    if (priorityFilter === 'High/Critical') {
      matchesPriority = issue.priorityScore >= 75;
    } else if (priorityFilter === 'Medium/Low') {
      matchesPriority = issue.priorityScore < 75;
    }

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':     return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Verified':    return 'bg-indigo-100 text-indigo-850 border-indigo-200';
      case 'Assigned':    return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved':    return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:            return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-700 bg-red-50 border-red-200';
      case 'High':     return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Medium':   return 'text-yellow-750 bg-yellow-50 border-yellow-200';
      default:         return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  // Define steps for the milestone checklist
  const steps = ['Reported', 'Verified', 'Assigned', 'In Progress', 'Resolved'];

  const getActiveStepIndex = (status) => {
    return steps.indexOf(status);
  };

  const handleInspect = (id) => {
    setSelectedIssueId(id);
    setActivePage('details');
  };

  return (
    <div className="page-transition max-w-5xl mx-auto px-4 py-8 bg-dot-pattern">
      {/* Page header */}
      <div className="mb-8 text-center sm:text-left space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">Track Complaints & Timeline</h1>
        <p className="text-slate-500 font-light max-w-2xl text-sm sm:text-base">
          Audit the chronological progression of reported tickets from initial community verification up to final physical repair validation.
        </p>
      </div>

      {/* Control panel (Filters) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-premium flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            id="search-complaint-input"
            type="text"
            placeholder="Search by ID, title, road..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition duration-150 font-medium"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs justify-end">
          <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500 mr-1" />
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              id="filter-complaint-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-700 font-bold focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {steps.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
            <span className="text-slate-500 font-medium">Priority:</span>
            <select
              id="filter-complaint-priority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-transparent text-slate-700 font-bold focus:outline-none cursor-pointer"
            >
              <option value="All">All Priorities</option>
              <option value="High/Critical">High Priority (&gt;=75)</option>
              <option value="Medium/Low">Standard Priority (&lt;75)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid List */}
      <div className="space-y-6">
        {filteredIssues.map((issue) => {
          const currentIdx = getActiveStepIndex(issue.status);
          
          return (
            <div key={issue.id} className="bg-white rounded-2xl border border-slate-200 shadow-premium p-5 flex flex-col md:flex-row gap-5 hover:shadow-md transition duration-200">
              
              {/* Image box */}
              <div className="md:w-44 h-28 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-sm relative">
                <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
                <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getSeverityStyle(issue.severity)}`}>
                  {issue.severity}
                </span>
              </div>

              {/* Core Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold font-mono text-slate-400">{issue.id}</span>
                    <span className="text-slate-400 select-none">|</span>
                    <span className="text-xs font-bold text-slate-500">{issue.category}</span>
                    <span className="text-slate-400 select-none">|</span>
                    <span className="text-xs text-amber-500 font-bold font-mono flex items-center">
                      Score: {issue.priorityScore}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-snug">{issue.title}</h3>
                  <p className="text-xs text-slate-450 flex items-center pt-0.5">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400 shrink-0" />
                    <span className="truncate">{issue.location}</span>
                  </p>
                </div>

                {/* Compact Milestone timeline bar */}
                <div className="mt-4 pt-3.5 border-t border-slate-100">
                  <div className="flex justify-between items-center relative">
                    {/* Background connector line */}
                    <div className="absolute left-0 right-0 top-2.5 h-0.5 bg-slate-150 -z-10"></div>
                    
                    {steps.map((step, idx) => {
                      const isCompleted = idx <= currentIdx;
                      const isActive = idx === currentIdx;
                      
                      return (
                        <div key={step} className="flex flex-col items-center relative z-10 shrink-0">
                          <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                            isActive ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-glow-blue' :
                            isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' :
                            'bg-white border-slate-200 text-slate-300'
                          }`}>
                            {isCompleted ? '✓' : idx + 1}
                          </div>
                          <span className={`text-[9px] mt-1 font-bold ${
                            isActive ? 'text-blue-600 font-extrabold' : 
                            isCompleted ? 'text-slate-650 font-semibold' : 
                            'text-slate-300 font-light'
                          } hidden sm:block`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Column */}
              <div className="md:w-36 shrink-0 flex flex-row md:flex-col justify-between items-center md:items-end gap-2 pt-3 md:pt-0 md:border-l md:border-slate-100 md:pl-5">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border text-center ${getStatusStyle(issue.status)}`}>
                  {issue.status}
                </span>
                
                <div className="text-right hidden md:block">
                  <span className="text-[10px] text-slate-400 block font-light">Reported</span>
                  <span className="text-xs font-bold text-slate-600 mt-0.5 block">{issue.reportedTime}</span>
                </div>

                <button
                  id={`track-inspect-${issue.id}`}
                  onClick={() => handleInspect(issue.id)}
                  className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center hover:text-blue-600 transition cursor-pointer"
                >
                  Inspect
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          );
        })}

        {filteredIssues.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-premium">
            <Clock className="h-10 w-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-slate-700 font-bold text-base mb-1">No reports tracked</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed font-light">
              We couldn't find any filed incidents matching your criteria. Reset filters or file a new report to track progress.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
