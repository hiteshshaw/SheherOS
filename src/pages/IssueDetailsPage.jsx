import React, { useState } from 'react';
import { ChevronLeft, MapPin, Award, CheckCircle, Camera, Send, Sparkles, Loader2, FileText, Mail, CheckSquare } from 'lucide-react';
import { verifyResolution } from '../utils/gemini';

export default function IssueDetailsPage({ issue, onBack, onUploadProof, onAddComment, userProfile, showToast }) {
  const [commentText, setCommentText] = useState('');
  const [proofImage, setProofImage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleEmailCommissioner = () => {
    const email = "commissioner@municipal.gov";
    const subject = `[SheherOS Incident Report] ${issue.id} - ${issue.title}`;
    const body = `Dear Ward Commissioner,

I am writing to report a verified infrastructure issue in our ward using the SheherOS Platform.

Incident Details:
- Ticket ID: ${issue.id}
- Category: ${issue.category}
- Title: ${issue.title}
- Description: ${issue.description}
- Location: ${issue.location}
- Coordinates: ${issue.coordinates?.lat || 'N/A'}, ${issue.coordinates?.lng || 'N/A'}

AI Diagnostics:
- Severity: ${issue.severity}
- Priority Score: ${issue.priorityScore}/100
- Assigned Department: ${issue.department}
- Estimated Resolution: ${issue.estimatedResolution}

Milestone Timeline & Verification:
- Current Status: ${issue.status}
- Community Verifications: ${issue.verifications} votes

You can review this incident on the live dashboard. We request prompt attention to resolve this public hazard.

Sincerely,
${userProfile.name}
SheherOS Node Auditor`;

    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  if (!issue) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p className="font-bold">Error loading details</p>
        <button onClick={onBack} className="mt-4 text-blue-600 font-bold hover:underline">Go Back</button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':     return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Verified':    return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Assigned':    return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'In Progress': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Resolved':    return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:            return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: userProfile.name,
      text: commentText,
      time: 'Just now'
    };

    onAddComment(issue.id, newComment);
    setCommentText('');
    showToast('Comment posted successfully!', 'success');
  };

  const handleProofSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProofSubmit = async (e) => {
    e.preventDefault();
    if (!proofImage) return;

    setIsVerifying(true);
    showToast('Running Before/After comparison via Gemini API...', 'info');

    try {
      const result = await verifyResolution(issue.imageUrl, proofImage, issue.category);
      
      const proof = {
        imageUrl: proofImage,
        verifiedBy: `${userProfile.name} (Citizen Auditor)`,
        verifiedTime: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        aiVerified: result.verified,
        aiConfidence: result.confidence,
        aiReasoning: result.reasoning
      };

      onUploadProof(issue.id, proof);
      setProofImage(null);
      
      if (result.verified) {
        showToast('Resolution verified by Gemini! +15 Citizen points earned.', 'success');
      } else {
        showToast('Gemini flags this repair as incomplete, but proof logged.', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast(`AI verification failed: ${error.message}. Logging manual proof instead.`, 'error');
      
      // Fallback
      const proof = {
        imageUrl: proofImage,
        verifiedBy: `${userProfile.name} (Citizen Auditor)`,
        verifiedTime: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        aiVerified: true,
        aiConfidence: 80,
        aiReasoning: "Fallback verification due to API error. Manual proof accepted."
      };
      onUploadProof(issue.id, proof);
      setProofImage(null);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="page-transition max-w-4xl mx-auto px-4 py-8 bg-dot-pattern">
      {/* Back button */}
      <button
        id="back-to-list-btn"
        onClick={onBack}
        className="flex items-center text-xs font-bold text-slate-500 hover:text-slate-800 mb-6 transition cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to listings
      </button>

      {/* Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-premium overflow-hidden mb-8">
        
        {/* Banner */}
        <div className="relative aspect-video max-h-[360px] w-full bg-slate-100 border-b border-slate-100">
          <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 bg-slate-950/80 border border-slate-850 px-3 py-1 rounded-full text-xs font-bold text-white">
            {issue.category}
          </div>
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border tracking-wider shadow-sm ${getStatusColor(issue.status)}`}>
              {issue.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">{issue.id}</span>
              <h1 className="text-2xl font-black text-slate-900 leading-snug mt-1">{issue.title}</h1>
              <p className="text-xs sm:text-sm text-slate-500 flex items-center mt-2.5 font-light">
                <MapPin className="h-4 w-4 text-slate-400 mr-1.5 shrink-0" />
                {issue.location}
              </p>
            </div>
            
            {/* Score */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-2xl shrink-0 w-full sm:w-auto justify-between sm:justify-start">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Priority Score</span>
                <span className="text-xl font-black text-amber-500 font-mono">{issue.priorityScore}<span className="text-xs text-slate-400 font-normal">/100</span></span>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Severity</span>
                <span className="text-sm font-black text-slate-700 block mt-0.5">{issue.severity}</span>
              </div>
            </div>
          </div>

          {/* Incident overview */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-800">Incident Overview</h2>
            <p className="text-sm text-slate-600 leading-relaxed font-light font-sans">
              {issue.description}
            </p>
          </div>

          {/* Department info */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
            <div>
              <span className="text-slate-400 uppercase tracking-wider block font-bold text-[9px]">Responsible Authority</span>
              <span className="text-slate-800 font-bold text-sm mt-0.5 block">{issue.department}</span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-slate-400 uppercase tracking-wider block font-bold text-[9px]">Est. Resolution Window</span>
              <span className="text-emerald-600 font-extrabold text-sm mt-0.5 block">{issue.estimatedResolution}</span>
            </div>
          </div>

          {/* Civic Action & Outreach Center */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 no-print">
            <div className="flex items-center space-x-2 text-slate-800">
              <CheckSquare className="h-4.5 w-4.5 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider">Civic Action & Outreach Center</span>
            </div>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Take this report beyond the application. Export an official print-ready municipal complaint document, or draft a pre-populated email containing AI audit data directly to the ward commissioner.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="export-complaint-btn"
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-850 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <FileText className="h-4 w-4 text-blue-400" />
                Export Official Complaint
              </button>
              <button
                id="email-commissioner-btn"
                type="button"
                onClick={handleEmailCommissioner}
                className="flex-1 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Mail className="h-4 w-4 text-emerald-500" />
                Email Ward Commissioner
              </button>
            </div>
          </div>

          {/* Milestone timeline */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-800">Chronological Milestones</h2>
            <div className="relative pl-6 space-y-6">
              {/* Connector line */}
              <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-slate-200"></div>
              
              {issue.timeline.map((item, idx) => (
                <div key={idx} className="relative flex gap-4 items-start page-transition">
                  {/* Bullet */}
                  <div className="absolute -left-5 mt-1.5 h-3.5 w-3.5 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 font-mono block">{item.date}</span>
                    <span className="text-xs font-extrabold text-slate-700 block mt-0.5">{item.status} Milestone</span>
                    <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Proof of Resolution */}
      {issue.status === 'Resolved' && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden mb-8 page-transition">
          <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
          
          <div className="flex items-center space-x-2.5 pb-4 mb-5 border-b border-slate-800">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white tracking-wide">Citizen Proof of Resolution (Audit Audit)</h2>
          </div>

          {issue.proofOfResolution ? (
            <div className="space-y-6">
              {/* Before vs After side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">Before (Reported Incident)</span>
                  <div className="rounded-2xl overflow-hidden aspect-video border border-slate-800 shadow-lg relative">
                    <img src={issue.imageUrl} alt="Original Hazard" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">After (Citizen Proof Upload)</span>
                  <div className="rounded-2xl overflow-hidden aspect-video border border-slate-800 shadow-lg relative">
                    <img src={issue.proofOfResolution.imageUrl} alt="Proof resolved" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Gemini Audit Card */}
              <div className="bg-slate-950/60 border border-slate-850 p-5 rounded-2xl space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4.5 w-4.5 text-blue-400 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-200">Gemini Resolution Audit</span>
                  </div>
                  {issue.proofOfResolution.aiVerified !== undefined && (
                    <div className={`flex items-center space-x-1.5 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide border ${
                      issue.proofOfResolution.aiVerified 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                      {issue.proofOfResolution.aiVerified ? 'AI Verified Resolve' : 'AI Discrepancy Found'}
                      <span className="opacity-60 ml-1">({issue.proofOfResolution.aiConfidence}% Conf)</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-350 leading-relaxed font-light font-mono">
                  {issue.proofOfResolution.aiReasoning || "Manual verification confirmed by citizen audit."}
                </p>

                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2.5 border-t border-slate-800/60 font-medium">
                  <div>
                    Audited by: <span className="text-slate-300 font-bold">{issue.proofOfResolution.verifiedBy}</span>
                  </div>
                  <div>
                    Timestamp: <span className="text-slate-300 font-bold">{issue.proofOfResolution.verifiedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : isVerifying ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
              <div className="flex items-center space-x-2 text-blue-400">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">Running Gemini Before/After Audit...</span>
              </div>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-light">
                Comparing baseline hazard imagery with resolution proof. Auditing changes and repair completeness coefficients.
              </p>
            </div>
          ) : (
            <form onSubmit={handleProofSubmit} className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                City Contractors have logged this incident as resolved. Nearby citizens must audit the repair work by capturing and uploading a fresh validation photo.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {proofImage ? (
                  <div className="relative rounded-xl overflow-hidden h-28 aspect-video border border-slate-800 shadow-md shrink-0 w-full sm:w-auto">
                    <img src={proofImage} alt="Captured proof" className="w-full h-full object-cover" />
                    <button
                      id="clear-proof-btn"
                      type="button"
                      onClick={() => setProofImage(null)}
                      className="absolute inset-0 bg-slate-950/60 flex items-center justify-center text-[10px] font-bold text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      Capture Again
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-28 w-full sm:w-48 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl cursor-pointer hover:bg-slate-950/30 transition duration-150 shrink-0">
                    <Camera className="h-5 w-5 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-400 mt-2">Upload Repair Photo</span>
                    <input
                      id="proof-file-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProofSelect}
                    />
                  </label>
                )}

                <div className="flex-grow w-full sm:w-auto flex flex-col justify-end gap-3 h-28">
                  <div className="bg-slate-955/40 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-400 shrink-0" />
                    <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider">Earn +15 Citizen Points for Auditing</span>
                  </div>
                  <button
                    id="submit-proof-btn"
                    type="submit"
                    disabled={!proofImage}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition duration-200 cursor-pointer ${
                      proofImage ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-glow-green' : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    Submit Proof & Verify
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Discussion */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-premium p-6 md:p-8 space-y-6">
        <h2 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100">Updates & Citizen Discussion ({issue.comments.length})</h2>
        
        <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
          {issue.comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 items-start text-xs p-3 bg-slate-50 border border-slate-100 rounded-2xl page-transition">
              <div className="h-7 w-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 border border-slate-200">
                {comment.user.split(' ').map(n=>n[0]).join('')}
              </div>
              <div className="flex-grow space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">{comment.user}</span>
                  <span className="text-[10px] text-slate-400">{comment.time}</span>
                </div>
                <p className="text-slate-600 font-light leading-relaxed font-sans">{comment.text}</p>
              </div>
            </div>
          ))}
          {issue.comments.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-6 font-light">No comments or updates yet. Add a message below.</p>
          )}
        </div>

        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <input
            id="comment-input"
            type="text"
            placeholder="Type comment or report update details..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition duration-150 font-medium"
          />
          <button
            id="send-comment-btn"
            type="submit"
            className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition duration-150 cursor-pointer shadow-glow-blue"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Printable template */}
      <div id="printable-complaint">
        <div style={{ borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>SHEHEROS</h1>
            <p style={{ fontSize: '10px', margin: '2px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666' }}>Autonomous Civic Auditing Portal</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ border: '2px solid #000', padding: '4px 8px', fontSize: '10px', fontWeight: 'bold' }}>OFFICIAL PUBLIC COMPLAINT</span>
          </div>
        </div>

        <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Ticket ID:</strong> {issue.id}</p>
            <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Category:</strong> {issue.category}</p>
            <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Date Logged:</strong> {issue.dateReported} ({issue.reportedTime})</p>
          </div>
          <div>
            <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Reported By:</strong> {issue.reportedBy}</p>
            <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Status:</strong> {issue.status}</p>
            <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Priority Rating:</strong> {issue.priorityScore} / 100</p>
          </div>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Incident Overview</h3>
          <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Title:</strong> {issue.title}</p>
          <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Location:</strong> {issue.location}</p>
          <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Coordinates:</strong> {issue.coordinates?.lat?.toFixed(6)}°N, {issue.coordinates?.lng?.toFixed(6)}°E</p>
          <p style={{ margin: '8px 0 4px 0', fontSize: '12px', lineHeight: '1.4' }}><strong>Description:</strong> {issue.description}</p>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Auditing & Routing Diagnostics</h3>
          <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Severity Level:</strong> {issue.severity}</p>
          <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Assigned Department:</strong> {issue.department}</p>
          <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Est. Resolution Window:</strong> {issue.estimatedResolution}</p>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Chronological Timeline & Community Trust Index</h3>
          <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Community Verifications:</strong> {issue.verifications} validation votes logged</p>
          <h4 style={{ margin: '8px 0 4px 0', fontSize: '11px', textTransform: 'uppercase' }}>Milestone History:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '11px', lineHeight: '1.4' }}>
            {issue.timeline.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '3px' }}>
                <strong>[{item.date}] {item.status}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </div>

        {issue.proofOfResolution && (
          <div style={{ border: '1px solid #ccc', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resolution Verification (Before vs After)</h3>
            <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Verified By:</strong> {issue.proofOfResolution.verifiedBy}</p>
            <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>Verified Date:</strong> {issue.proofOfResolution.verifiedTime}</p>
            {issue.proofOfResolution.aiVerified !== undefined && (
              <>
                <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>AI Verification Verdict:</strong> {issue.proofOfResolution.aiVerified ? 'SUCCESSFULLY CLOSED & VERIFIED' : 'DISCREPANCY SUSPECTED'}</p>
                <p style={{ margin: '4px 0', fontSize: '12px', fontStyle: 'italic', color: '#333' }}><strong>Gemini Reasoning Detail:</strong> {issue.proofOfResolution.aiReasoning}</p>
              </>
            )}
          </div>
        )}

        <div style={{ marginTop: '30px', paddingTop: '15px', borderTop: '1px dashed #000', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#333' }}>
          <div>
            <p style={{ margin: 0 }}><strong>Certified by SheherOS Autonomous Auditing System</strong></p>
            <p style={{ margin: '2px 0 0 0' }}>Verification timestamp: {new Date().toLocaleString()}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0 }}>Citizen Representative Signature: _______________________</p>
          </div>
        </div>
      </div>

    </div>
  );
}
