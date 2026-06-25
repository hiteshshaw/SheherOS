import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ReportIssuePage from './pages/ReportIssuePage';
import LiveMapPage from './pages/LiveMapPage';
import TrackComplaintPage from './pages/TrackComplaintPage';
import CommunityVerificationPage from './pages/CommunityVerificationPage';
import AdminDashboard from './pages/AdminDashboard';
import LeaderboardPage from './pages/LeaderboardPage';
import IssueDetailsPage from './pages/IssueDetailsPage';
import AboutPage from './pages/AboutPage';

import { INITIAL_ISSUES, INITIAL_LEADERBOARD, MOCK_USER_PROFILE } from './data/mockData';
// Import custom reminder hook
import useReminderEngine from './utils/reminderEngine';
// Import toast icons
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('civic_sense_issues');
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('civic_sense_leaderboard');
    return saved ? JSON.parse(saved) : INITIAL_LEADERBOARD;
  });
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('civic_sense_user_profile');
    return saved ? JSON.parse(saved) : MOCK_USER_PROFILE;
  });
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  
  // Persist states to localStorage when they change
  useEffect(() => {
    localStorage.setItem('civic_sense_issues', JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem('civic_sense_leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  useEffect(() => {
    localStorage.setItem('civic_sense_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Toast state and helper
  const [toast, setToast] = useState({ message: '', type: null, visible: false });

  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => 
      setToast(prev => ({ ...prev, visible: false })), 
      4000);
  };
  
  // Trigger reminder checks for overdue high‑severity issues
  useReminderEngine(issues, showToast);

  // Helper: update Hitesh's stats on the leaderboard dynamically
  const updateLeaderboardStats = (newPoints, newReports = 0, newVerifications = 0) => {
    setLeaderboard(prev => prev.map(member => {
      if (member.name === userProfile.name) {
        const updatedPoints = member.points + newPoints;
        const updatedReports = member.reports + newReports;
        const updatedVerifications = member.verifications + newVerifications;
        
        // Calculate new badge based on points threshold
        let newBadge = member.badge;
        if (updatedPoints >= 300) newBadge = 'Community Hero';
        else if (updatedPoints >= 250) newBadge = 'Street Saver';
        else if (updatedPoints >= 200) newBadge = 'Clean City Champion';
        else if (updatedPoints >= 150) newBadge = 'Safety Guardian';
        else if (updatedPoints >= 100) newBadge = 'Local Leader';

        // Update active profile state too
        setUserProfile({
          ...userProfile,
          points: updatedPoints,
          reports: updatedReports,
          verifications: updatedVerifications,
          badge: newBadge
        });

        return {
          ...member,
          points: updatedPoints,
          reports: updatedReports,
          verifications: updatedVerifications,
          badge: newBadge
        };
      }
      return member;
    }));
  };

  // Action: Add new issue from report page
  const handleAddIssue = (newIssue) => {
    setIssues(prev => [newIssue, ...prev]);
    updateLeaderboardStats(20, 1, 0); // +20 points for report
  };

  // Action: Citizen verification voting
  const handleVerifyIssue = (issueId, incrementAmount) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        const updatedVerifications = issue.verifications + incrementAmount;
        let updatedStatus = issue.status;
        let updatedTimeline = [...issue.timeline];

        // If verifications reach a threshold, auto-advance to "Verified"
        if (issue.status === 'Pending' && updatedVerifications >= 15) {
          updatedStatus = 'Verified';
          updatedTimeline.push({
            status: 'Verified',
            date: 'Just now',
            description: 'Community verification threshold (15+ votes) completed. Issue forwarded to municipal portal.'
          });
          showToast(`Issue ${issue.id} has met threshold and is now Verified!`, 'success');
        }

        return {
          ...issue,
          verifications: updatedVerifications,
          status: updatedStatus,
          timeline: updatedTimeline
        };
      }
      return issue;
    }));

    updateLeaderboardStats(10, 0, 1); // +10 points for verifying
  };

  // Action: Admin advance status of issue
  const handleChangeStatus = (issueId, newStatus) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        const timestamp = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let statusDesc = `Status transitioned to ${newStatus}.`;

        if (newStatus === 'Verified') {
          statusDesc = 'Audited and verified by administrative officer.';
        } else if (newStatus === 'Assigned') {
          statusDesc = `Forwarded to ${issue.department} contractor division.`;
        } else if (newStatus === 'In Progress') {
          statusDesc = 'Work crew dispatched and repair operations commenced.';
        } else if (newStatus === 'Resolved') {
          statusDesc = 'Repair completed. Awaiting citizen physical verification (Proof of Resolution).';
        }

        return {
          ...issue,
          status: newStatus,
          timeline: [...issue.timeline, { status: newStatus, date: timestamp, description: statusDesc }]
        };
      }
      return issue;
    }));
  };

  // Action: Upload proof of resolution
  const handleUploadProof = (issueId, proof) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        const timestamp = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return {
          ...issue,
          proofOfResolution: proof,
          timeline: [...issue.timeline, {
            status: 'Closed & Verified',
            date: timestamp,
            description: `Fully Closed. Citizen audit confirmed repair quality with photo verification. Verified by ${proof.verifiedBy}.`
          }]
        };
      }
      return issue;
    }));

    updateLeaderboardStats(15, 0, 1); // +15 points for uploading proof
  };

  // Action: Add comment/update
  const handleAddComment = (issueId, newComment) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          comments: [...issue.comments, newComment]
        };
      }
      return issue;
    }));
  };

  const selectedIssue = issues.find(i => i.id === selectedIssueId);

  // Router dispatcher
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <LandingPage setActivePage={setActivePage} setSelectedIssueId={setSelectedIssueId} issues={issues} />;
      case 'report':
        return <ReportIssuePage onAddIssue={handleAddIssue} showToast={showToast} setActivePage={setActivePage} issues={issues} />;
      case 'map':
        return <LiveMapPage issues={issues} setActivePage={setActivePage} setSelectedIssueId={setSelectedIssueId} />;
      case 'track':
        return <TrackComplaintPage issues={issues} setActivePage={setActivePage} setSelectedIssueId={setSelectedIssueId} />;
      case 'verify':
        return <CommunityVerificationPage issues={issues} onVerifyIssue={handleVerifyIssue} userProfile={userProfile} showToast={showToast} />;
      case 'dashboard':
        return <LandingPage setActivePage={setActivePage} setSelectedIssueId={setSelectedIssueId} issues={issues} />; // User dashboard (home)
      case 'admin':
        return <AdminDashboard issues={issues} setIssues={setIssues} onChangeStatus={handleChangeStatus} showToast={showToast} />;
      case 'leaderboard':
        return <LeaderboardPage leaderboardData={leaderboard} userProfile={userProfile} />;
      case 'details':
        return (
          <IssueDetailsPage
            issue={selectedIssue}
            onBack={() => setActivePage('track')}
            onUploadProof={handleUploadProof}
            onAddComment={handleAddComment}
            userProfile={userProfile}
            showToast={showToast}
          />
        );
      case 'about':
        return <AboutPage />;
      default:
        return <LandingPage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Sticky top Navigation bar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        userProfile={userProfile}
        issues={issues}
      />

      {/* Primary Page Canvas */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Global Toast Alerts */}
      {toast.visible && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce" style={{ animationDuration: '3s' }}>
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold ${
            toast.type === 'success' ? 'bg-emerald-500 text-white border-emerald-400' :
            toast.type === 'error' ? 'bg-red-500 text-white border-red-400' :
            toast.type === 'warning' ? 'bg-amber-500 text-white border-amber-400' :
            'bg-slate-900 text-white border-slate-800'
          }`}>
            {toast.type === 'success' && <CheckCircle2 className="h-5 w-5" />}
            {toast.type === 'error' && <AlertCircle className="h-5 w-5" />}
            {toast.type === 'info' && <Info className="h-5 w-5" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
