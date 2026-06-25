import React, { useState } from 'react';
import { Check, X, ShieldAlert, Award, ThumbsUp } from 'lucide-react';

export default function CommunityVerificationPage({ issues, onVerifyIssue, userProfile, showToast }) {
  // Track issue IDs voted on by the current user to prevent double voting
  const [votedIds, setVotedIds] = useState({});

  // Show issues that are Pending or Verified (requiring citizen checks)
  const pendingIssues = issues.filter(issue => issue.status === 'Pending' || issue.status === 'Verified');

  const handleVote = (issueId, voteType) => {
    if (votedIds[issueId]) {
      showToast('You have already verified this incident node.', 'error');
      return;
    }

    setVotedIds(prev => ({ ...prev, [issueId]: voteType }));

    if (voteType === 'exists') {
      onVerifyIssue(issueId, 1); // Increment verification count
      showToast('Vote registered! Earned +10 Citizen points.', 'success');
    } else if (voteType === 'solved') {
      showToast('Reported. Contractors notified. Earned +10 Citizen points.', 'success');
    } else if (voteType === 'incorrect') {
      showToast('Conflict logged. Admin auditing requested. Earned +10 Citizen points.', 'success');
    }
  };

  return (
    <div className="page-transition max-w-5xl mx-auto px-4 py-8 bg-dot-pattern">
      {/* Header Banner */}
      <div className="mb-8 text-center sm:text-left space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">Citizen Verification Center</h1>
        <p className="text-slate-500 font-light max-w-2xl text-sm sm:text-base">
          Community verification helps reduce fake reports and increases transparency. Review nearby logs, cast your audit vote, and claim reward badges.
        </p>
      </div>

      {/* Gamification Reminder Callout */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-slate-800 rounded-2xl text-yellow-450 border border-slate-700/60 shrink-0">
            <Award className="h-6 w-6 animate-bounce" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Earn Verification Dividends</h3>
            <p className="text-xs text-slate-400 font-light mt-0.5">Report verified issue: +20 pts | Verify active issue: +10 pts | Upload solved proof: +15 pts</p>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-2xl text-xs font-semibold text-slate-200">
          Your Rank: <span className="text-yellow-400 font-bold">{userProfile.badge}</span>
        </div>
      </div>

      {/* Grid of Pending Issues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pendingIssues.map((issue) => {
          const userVote = votedIds[issue.id];
          const hasVoted = !!userVote;

          return (
            <div key={issue.id} className="bg-white rounded-2xl border border-slate-200 shadow-premium overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-200">
              <div>
                {/* Photo Header */}
                <div className="relative aspect-video w-full border-b border-slate-100 bg-slate-100">
                  <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-350 border border-slate-800">
                    {issue.category}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-blue-600 border border-blue-400 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    {issue.verifications} Verifications
                  </div>
                </div>

                {/* Content details */}
                <div className="p-5 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold font-mono text-slate-400">
                    <span>{issue.id}</span>
                    <span>Reported {issue.reportedTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 leading-snug truncate" title={issue.title}>{issue.title}</h3>
                  <p className="text-xs text-slate-400 italic leading-snug">{issue.location}</p>
                  <p className="text-xs text-slate-500 font-light leading-relaxed pt-1 line-clamp-3">
                    {issue.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex flex-wrap gap-2 items-center justify-between">
                {hasVoted ? (
                  <div className={`w-full py-2.5 rounded-xl border font-bold text-center text-xs flex items-center justify-center gap-1.5 ${
                    userVote === 'exists' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                    userVote === 'solved' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                    'bg-red-50 text-red-800 border-red-200'
                  }`}>
                    <Check className="h-4 w-4" />
                    <span>
                      {userVote === 'exists' && 'Verified: Issue Exists'}
                      {userVote === 'solved' && 'Flagged: Issue Already Solved'}
                      {userVote === 'incorrect' && 'Flagged: Incorrect/Spam Report'}
                    </span>
                  </div>
                ) : (
                  <>
                    <button
                      id={`verify-exists-${issue.id}`}
                      onClick={() => handleVote(issue.id, 'exists')}
                      className="flex-grow bg-white hover:bg-slate-100 border border-slate-200 hover:border-emerald-350 hover:text-emerald-700 py-2 rounded-xl text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1 cursor-pointer transition duration-150"
                    >
                      <ThumbsUp className="h-3.5 w-3.5 text-emerald-500" />
                      Exists
                    </button>
                    <button
                      id={`verify-solved-${issue.id}`}
                      onClick={() => handleVote(issue.id, 'solved')}
                      className="flex-grow bg-white hover:bg-slate-100 border border-slate-200 hover:border-blue-300 hover:text-blue-750 py-2 rounded-xl text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1 cursor-pointer transition duration-150"
                    >
                      <Check className="h-3.5 w-3.5 text-blue-500" />
                      Solved
                    </button>
                    <button
                      id={`verify-incorrect-${issue.id}`}
                      onClick={() => handleVote(issue.id, 'incorrect')}
                      className="flex-grow bg-white hover:bg-slate-100 border border-slate-200 hover:border-red-300 hover:text-red-700 py-2 rounded-xl text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1 cursor-pointer transition duration-150"
                    >
                      <X className="h-3.5 w-3.5 text-red-500" />
                      Spam
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {pendingIssues.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center col-span-2 shadow-premium">
            <ShieldAlert className="h-10 w-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-slate-800 font-bold text-base mb-1">Audit complete!</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed font-light">
              All currently reported issues have been verified. Check back later or file a new ticket to run community checks.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
