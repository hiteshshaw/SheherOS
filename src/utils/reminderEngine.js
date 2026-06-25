import { useEffect } from 'react';

/**
 * reminderEngine - scans issues and shows a toast if a high‑severity issue has been pending >24h.
 * It runs on mount and then every hour.
 * @param {Array} issues - current issues array from state
 * @param {function} showToast - toast helper from App.jsx
 */
export default function useReminderEngine(issues, showToast) {
  useEffect(() => {
    // Helper to check and notify
    const check = () => {
      const now = Date.now();
      const overdue = issues.filter(issue => {
        const isCritical = issue.severity === 'Critical';
        const notResolved = issue.status !== 'Resolved';
        if (!isCritical || !notResolved) return false;
        // Assume issue.reportedTime is parsable; fallback to created timestamp if missing
        const reported = new Date(issue.reportedTime || issue.createdAt || now);
        const diffHours = (now - reported.getTime()) / (1000 * 60 * 60);
        return diffHours >= 24;
      });
      if (overdue.length) {
        showToast(`⚠️ ${overdue.length} critical issue(s) pending over 24h. Prioritize!`, 'warning');
      }
    };
    // Initial check
    check();
    // Schedule hourly checks
    const intervalId = setInterval(check, 60 * 60 * 1000);
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [issues, showToast]);
}
