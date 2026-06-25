import React, { useState, useEffect } from 'react';
import { AlertCircle, Info, ChevronRight, Users, Layers } from 'lucide-react';
import { CATEGORIES, STATUSES } from '../data/mockData';
import GoogleMap from '../components/GoogleMap';
import loadGoogleMaps from '../utils/loadGoogleMaps';

// Status and severity configs retained from original file for styling
const STATUS_COLORS = {
  Pending: { badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30', dot: 'bg-amber-400' },
  Verified: { badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30', dot: 'bg-indigo-400' },
  Assigned: { badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30', dot: 'bg-purple-400' },
  'In Progress': { badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30', dot: 'bg-blue-400' },
  Resolved: { badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-400' },
};

const SEVERITY_BADGE = {
  Critical: 'bg-red-500/20 text-red-400 border border-red-500/30',
  High: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Low: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
};

export default function LiveMapPage({ issues, setActivePage, setSelectedIssueId }) {
  const [selectedIssue, setSelectedIssue] = useState(issues[0] || null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [mapsReady, setMapsReady] = useState(false);
  const [mapsError, setMapsError] = useState(false);

  const filteredIssues = issues.filter(issue => {
    const categoryMatch = filterCategory === 'All' || issue.category === filterCategory;
    const statusMatch = filterStatus === 'All' || issue.status === filterStatus;
    const severityMatch = filterSeverity === 'All' || issue.severity === filterSeverity;
    return categoryMatch && statusMatch && severityMatch;
  });

  // Load Google Maps script once
  useEffect(() => {
    loadGoogleMaps()
      .then(() => setMapsReady(true))
      .catch(err => {
        console.error('Google Maps failed to load:', err);
        setMapsError(true);
      });
  }, []);

  const handleViewDetails = id => {
    setSelectedIssueId(id);
    setActivePage('details');
  };

  const statusColors = STATUS_COLORS[selectedIssue?.status] || STATUS_COLORS['Pending'];

  return (
    <div className="page-transition min-h-screen bg-slate-950 text-white pb-10">
      {/* Header / Filters */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-blue-400" />
            <h1 className="text-lg font-bold tracking-tight">Hyperlocal Live Incident Map</h1>
            <span className="text-xs bg-blue-900/50 text-blue-300 border border-blue-800/80 px-2 py-0.5 rounded-full font-mono font-bold">
              {filteredIssues.length} Active
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Category filter */}
            <div className="flex items-center space-x-1.5 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
              <span className="text-slate-400">Category:</span>
              <select id="filter-category-select" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer font-bold">
                <option value="All" className="bg-slate-900">All</option>
                {CATEGORIES.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
              </select>
            </div>
            {/* Status filter */}
            <div className="flex items-center space-x-1.5 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
              <span className="text-slate-400">Status:</span>
              <select id="filter-status-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer font-bold">
                <option value="All" className="bg-slate-900">All</option>
                {STATUSES.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
              </select>
            </div>
            {/* Severity filter */}
            <div className="flex items-center space-x-1.5 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
              <span className="text-slate-400">Severity:</span>
              <select id="filter-severity-select" value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer font-bold">
                <option value="All" className="bg-slate-900">All</option>
                {['Low','Medium','High','Critical'].map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Map + Side Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[650px] items-stretch">
          {/* Google Map Canvas */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-full relative">
            {mapsError ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
                <AlertCircle className="h-10 w-10 text-red-400" />
                <p className="text-red-400 font-bold">Google Maps failed to load</p>
                <p className="text-slate-400 text-xs">Check your API key in the <code className="text-blue-400">.env</code> file and ensure it has Maps JavaScript API enabled.</p>
              </div>
            ) : mapsReady ? (
              <GoogleMap
                issues={filteredIssues}
                selectedIssue={selectedIssue}
                onSelectIssue={setSelectedIssue}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-slate-400 text-sm">Loading Google Maps…</span>
              </div>
            )}
            {/* Status Legend overlay */}
            <div className="absolute bottom-4 left-4 z-[1000] bg-slate-950/90 backdrop-blur-sm border border-slate-800/80 p-3 rounded-xl space-y-2 hidden sm:block pointer-events-none">
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">
                Pin Status Legend
              </span>
              <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 text-[10px] text-slate-300 font-medium">
                {Object.entries(STATUS_COLORS).map(([status, c]) => (
                  <div key={status} className="flex items-center space-x-1.5">
                    <span className="h-2.5 w-2.5 rounded-full inline-block flex-shrink-0" style={{ background: c.pin }} />
                    <span>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Side Panel */}
          <div className="lg:col-span-4 bg-slate-900 rounded-3xl border border-slate-800 p-5 flex flex-col shadow-2xl h-full overflow-hidden">
            {selectedIssue ? (
              <div className="flex flex-col h-full page-transition">
                {/* Header */}
                <div className="flex justify-between items-start gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">
                      {selectedIssue.id}
                    </span>
                    <h2 className="text-base font-bold text-white leading-snug mt-0.5">
                      {selectedIssue.title}
                    </h2>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border shrink-0 ${statusColors.badge}`}>
                    {selectedIssue.status}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                  {/* Photo */}
                  <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-800 shadow-inner">
                    <img src={selectedIssue.imageUrl} alt={selectedIssue.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-slate-950/80 px-2 py-1 rounded-md text-[10px] font-semibold text-slate-300">
                      Severity:{' '}
                      <span className={`font-bold ${selectedIssue.severity === 'Critical' || selectedIssue.severity === 'High' ? 'text-red-400' : 'text-yellow-400'}`}> 
                        {selectedIssue.severity}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 bg-slate-950/80 px-2 py-1 rounded-md text-[10px] font-mono text-blue-400">
                      {selectedIssue.coordinates?.lat?.toFixed(4)}°N, {selectedIssue.coordinates?.lng?.toFixed(4)}°E
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/40 p-3 rounded-2xl border border-slate-800">
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                        Location
                      </span>
                      <span className="text-slate-200 font-medium block truncate mt-0.5" title={selectedIssue.location}>
                        {selectedIssue.location}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                        Priority Index
                      </span>
                      <span className="text-amber-400 font-bold block mt-0.5">
                        {selectedIssue.priorityScore} / 100
                      </span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-slate-800/40">
                      <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                        Department
                      </span>
                      <span className="text-slate-300 block mt-0.5">
                        {selectedIssue.department}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {selectedIssue.description}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800 text-slate-400">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-blue-400" />
                      <span>{selectedIssue.verifications} Citizen Votes</span>
                    </div>
                    <span>Reported {selectedIssue.reportedTime}</span>
                  </div>
                </div>

                <button
                  id={`map-view-details-${selectedIssue.id}`}
                  onClick={() => handleViewDetails(selectedIssue.id)}
                  className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center text-xs transition duration-150 cursor-pointer shadow-glow-blue"
                >
                  Inspect Milestone Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-full text-slate-500">
                <Info className="h-10 w-10 text-slate-700 mb-2" />
                <p className="font-bold">Select a map pin</p>
                <p className="text-xs text-slate-600 mt-1 max-w-[200px]">Click any colored dot on the map to see incident details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
