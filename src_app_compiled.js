import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.jsx");const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport13_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=8840dc14";
import Navbar from "/src/components/Navbar.jsx";
import LandingPage from "/src/pages/LandingPage.jsx";
import ReportIssuePage from "/src/pages/ReportIssuePage.jsx";
import LiveMapPage from "/src/pages/LiveMapPage.jsx";
import TrackComplaintPage from "/src/pages/TrackComplaintPage.jsx";
import CommunityVerificationPage from "/src/pages/CommunityVerificationPage.jsx";
import AdminDashboard from "/src/pages/AdminDashboard.jsx";
import LeaderboardPage from "/src/pages/LeaderboardPage.jsx";
import IssueDetailsPage from "/src/pages/IssueDetailsPage.jsx";
import AboutPage from "/src/pages/AboutPage.jsx";
import { INITIAL_ISSUES, INITIAL_LEADERBOARD, MOCK_USER_PROFILE } from "/src/data/mockData.js";
import { AlertCircle, CheckCircle2, Info } from "/node_modules/.vite/deps/lucide-react.js?v=8840dc14";
var _jsxFileName = "C:/Users/Hitesh/vibe2ship/src/App.jsx";
import __vite__cjsImport13_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=8840dc14";
var _s = $RefreshSig$();
export default function App() {
	_s();
	const [activePage, setActivePage] = useState("home");
	const [issues, setIssues] = useState(INITIAL_ISSUES);
	const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);
	const [userProfile, setUserProfile] = useState(MOCK_USER_PROFILE);
	const [selectedIssueId, setSelectedIssueId] = useState(null);
	// Toast notification state
	const [toast, setToast] = useState({
		message: "",
		type: null,
		visible: false
	});
	const showToast = (message, type = "success") => {
		setToast({
			message,
			type,
			visible: true
		});
		setTimeout(() => {
			setToast((prev) => ({
				...prev,
				visible: false
			}));
		}, 4e3);
	};
	// Helper: update Hitesh's stats on the leaderboard dynamically
	const updateLeaderboardStats = (newPoints, newReports = 0, newVerifications = 0) => {
		setLeaderboard((prev) => prev.map((member) => {
			if (member.name === userProfile.name) {
				const updatedPoints = member.points + newPoints;
				const updatedReports = member.reports + newReports;
				const updatedVerifications = member.verifications + newVerifications;
				// Calculate new badge based on points threshold
				let newBadge = member.badge;
				if (updatedPoints >= 300) newBadge = "Community Hero";
				else if (updatedPoints >= 250) newBadge = "Street Saver";
				else if (updatedPoints >= 200) newBadge = "Clean City Champion";
				else if (updatedPoints >= 150) newBadge = "Safety Guardian";
				else if (updatedPoints >= 100) newBadge = "Local Leader";
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
		setIssues((prev) => [newIssue, ...prev]);
		updateLeaderboardStats(20, 1, 0);
	};
	// Action: Citizen verification voting
	const handleVerifyIssue = (issueId, incrementAmount) => {
		setIssues((prev) => prev.map((issue) => {
			if (issue.id === issueId) {
				const updatedVerifications = issue.verifications + incrementAmount;
				let updatedStatus = issue.status;
				let updatedTimeline = [...issue.timeline];
				// If verifications reach a threshold, auto-advance to "Verified"
				if (issue.status === "Pending" && updatedVerifications >= 15) {
					updatedStatus = "Verified";
					updatedTimeline.push({
						status: "Verified",
						date: "Just now",
						description: "Community verification threshold (15+ votes) completed. Issue forwarded to municipal portal."
					});
					showToast(`Issue ${issue.id} has met threshold and is now Verified!`, "success");
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
		updateLeaderboardStats(10, 0, 1);
	};
	// Action: Admin advance status of issue
	const handleChangeStatus = (issueId, newStatus) => {
		setIssues((prev) => prev.map((issue) => {
			if (issue.id === issueId) {
				const timestamp = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				});
				let statusDesc = `Status transitioned to ${newStatus}.`;
				if (newStatus === "Verified") {
					statusDesc = "Audited and verified by administrative officer.";
				} else if (newStatus === "Assigned") {
					statusDesc = `Forwarded to ${issue.department} contractor division.`;
				} else if (newStatus === "In Progress") {
					statusDesc = "Work crew dispatched and repair operations commenced.";
				} else if (newStatus === "Resolved") {
					statusDesc = "Repair completed. Awaiting citizen physical verification (Proof of Resolution).";
				}
				return {
					...issue,
					status: newStatus,
					timeline: [...issue.timeline, {
						status: newStatus,
						date: timestamp,
						description: statusDesc
					}]
				};
			}
			return issue;
		}));
	};
	// Action: Upload proof of resolution
	const handleUploadProof = (issueId, proof) => {
		setIssues((prev) => prev.map((issue) => {
			if (issue.id === issueId) {
				const timestamp = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				});
				return {
					...issue,
					proofOfResolution: proof,
					timeline: [...issue.timeline, {
						status: "Closed & Verified",
						date: timestamp,
						description: `Fully Closed. Citizen audit confirmed repair quality with photo verification. Verified by ${proof.verifiedBy}.`
					}]
				};
			}
			return issue;
		}));
		updateLeaderboardStats(15, 0, 1);
	};
	// Action: Add comment/update
	const handleAddComment = (issueId, newComment) => {
		setIssues((prev) => prev.map((issue) => {
			if (issue.id === issueId) {
				return {
					...issue,
					comments: [...issue.comments, newComment]
				};
			}
			return issue;
		}));
	};
	const selectedIssue = issues.find((i) => i.id === selectedIssueId);
	// Router dispatcher
	const renderPage = () => {
		switch (activePage) {
			case "home": return /* @__PURE__ */ _jsxDEV(LandingPage, { setActivePage }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 175,
				columnNumber: 16
			}, this);
			case "report": return /* @__PURE__ */ _jsxDEV(ReportIssuePage, {
				onAddIssue: handleAddIssue,
				showToast,
				setActivePage
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 177,
				columnNumber: 16
			}, this);
			case "map": return /* @__PURE__ */ _jsxDEV(LiveMapPage, {
				issues,
				setActivePage,
				setSelectedIssueId
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 179,
				columnNumber: 16
			}, this);
			case "track": return /* @__PURE__ */ _jsxDEV(TrackComplaintPage, {
				issues,
				setActivePage,
				setSelectedIssueId
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 181,
				columnNumber: 16
			}, this);
			case "verify": return /* @__PURE__ */ _jsxDEV(CommunityVerificationPage, {
				issues,
				onVerifyIssue: handleVerifyIssue,
				userProfile,
				showToast
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 183,
				columnNumber: 16
			}, this);
			case "dashboard": return /* @__PURE__ */ _jsxDEV(AdminDashboard, {
				issues,
				onChangeStatus: handleChangeStatus,
				showToast
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 185,
				columnNumber: 16
			}, this);
			case "leaderboard": return /* @__PURE__ */ _jsxDEV(LeaderboardPage, {
				leaderboardData: leaderboard,
				userProfile
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 187,
				columnNumber: 16
			}, this);
			case "details": return /* @__PURE__ */ _jsxDEV(IssueDetailsPage, {
				issue: selectedIssue,
				onBack: () => setActivePage("track"),
				onUploadProof: handleUploadProof,
				onAddComment: handleAddComment,
				userProfile,
				showToast
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 190,
				columnNumber: 11
			}, this);
			case "about": return /* @__PURE__ */ _jsxDEV(AboutPage, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 200,
				columnNumber: 16
			}, this);
			default: return /* @__PURE__ */ _jsxDEV(LandingPage, { setActivePage }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 202,
				columnNumber: 16
			}, this);
		}
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-600 selection:text-white",
		children: [
			/* @__PURE__ */ _jsxDEV(Navbar, {
				activePage,
				setActivePage,
				userProfile,
				issues
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 209,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("main", {
				className: "flex-grow",
				children: renderPage()
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 217,
				columnNumber: 7
			}, this),
			toast.visible && /* @__PURE__ */ _jsxDEV("div", {
				className: "fixed bottom-5 right-5 z-50 animate-bounce",
				style: { animationDuration: "3s" },
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: `flex items-center gap-2.5 px-4.5 py-3 rounded-2xl shadow-2xl border text-xs font-bold ${toast.type === "success" ? "bg-emerald-500 text-white border-emerald-400" : toast.type === "error" ? "bg-red-500 text-white border-red-400" : "bg-slate-900 text-white border-slate-800"}`,
					children: [
						toast.type === "success" && /* @__PURE__ */ _jsxDEV(CheckCircle2, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 42
						}, this),
						toast.type === "error" && /* @__PURE__ */ _jsxDEV(AlertCircle, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 230,
							columnNumber: 40
						}, this),
						toast.type === "info" && /* @__PURE__ */ _jsxDEV(Info, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 231,
							columnNumber: 39
						}, this),
						/* @__PURE__ */ _jsxDEV("span", { children: toast.message }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 232,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 224,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 223,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 207,
		columnNumber: 5
	}, this);
}
_s(App, "U00hzsG/PtWy2MWvM39/Xc2/NO8=");
_c = App;
var _c;
$RefreshReg$(_c, "App");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/App.jsx";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/Hitesh/vibe2ship/src/App.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/Hitesh/vibe2ship/src/App.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/Hitesh/vibe2ship/src/App.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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O0VBQ3ZEO0NBQ0Y7Q0FFQSxPQUNFLHdCQUFDLE9BQUQ7RUFBSyxXQUFVO1lBQWY7R0FFRSx3QkFBQyxRQUFEO0lBQ2M7SUFDRztJQUNGO0lBQ0w7R0FDVDs7Ozs7R0FHRCx3QkFBQyxRQUFEO0lBQU0sV0FBVTtjQUNiLFdBQVc7R0FDUjs7Ozs7R0FHTCxNQUFNLFdBQ0wsd0JBQUMsT0FBRDtJQUFLLFdBQVU7SUFBNkMsT0FBTyxFQUFFLG1CQUFtQixLQUFLO2NBQzNGLHdCQUFDLE9BQUQ7S0FBSyxXQUFXLHlGQUNkLE1BQU0sU0FBUyxZQUFZLGlEQUMzQixNQUFNLFNBQVMsVUFBVSx5Q0FDekI7ZUFIRjtNQUtHLE1BQU0sU0FBUyxhQUFhLHdCQUFDLGNBQUQsRUFBYyxXQUFVLFVBQVc7Ozs7O01BQy9ELE1BQU0sU0FBUyxXQUFXLHdCQUFDLGFBQUQsRUFBYSxXQUFVLFVBQVc7Ozs7O01BQzVELE1BQU0sU0FBUyxVQUFVLHdCQUFDLE1BQUQsRUFBTSxXQUFVLFVBQVc7Ozs7O01BQ3JELHdCQUFDLFFBQUQsWUFBTyxNQUFNLFFBQWM7Ozs7O0tBQ3hCOzs7Ozs7R0FDRjs7Ozs7RUFFSjs7Ozs7O0FBRVQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQXBwLmpzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmF2YmFyIGZyb20gJy4vY29tcG9uZW50cy9OYXZiYXInO1xuaW1wb3J0IExhbmRpbmdQYWdlIGZyb20gJy4vcGFnZXMvTGFuZGluZ1BhZ2UnO1xuaW1wb3J0IFJlcG9ydElzc3VlUGFnZSBmcm9tICcuL3BhZ2VzL1JlcG9ydElzc3VlUGFnZSc7XG5pbXBvcnQgTGl2ZU1hcFBhZ2UgZnJvbSAnLi9wYWdlcy9MaXZlTWFwUGFnZSc7XG5pbXBvcnQgVHJhY2tDb21wbGFpbnRQYWdlIGZyb20gJy4vcGFnZXMvVHJhY2tDb21wbGFpbnRQYWdlJztcbmltcG9ydCBDb21tdW5pdHlWZXJpZmljYXRpb25QYWdlIGZyb20gJy4vcGFnZXMvQ29tbXVuaXR5VmVyaWZpY2F0aW9uUGFnZSc7XG5pbXBvcnQgQWRtaW5EYXNoYm9hcmQgZnJvbSAnLi9wYWdlcy9BZG1pbkRhc2hib2FyZCc7XG5pbXBvcnQgTGVhZGVyYm9hcmRQYWdlIGZyb20gJy4vcGFnZXMvTGVhZGVyYm9hcmRQYWdlJztcbmltcG9ydCBJc3N1ZURldGFpbHNQYWdlIGZyb20gJy4vcGFnZXMvSXNzdWVEZXRhaWxzUGFnZSc7XG5pbXBvcnQgQWJvdXRQYWdlIGZyb20gJy4vcGFnZXMvQWJvdXRQYWdlJztcblxuaW1wb3J0IHsgSU5JVElBTF9JU1NVRVMsIElOSVRJQUxfTEVBREVSQk9BUkQsIE1PQ0tfVVNFUl9QUk9GSUxFIH0gZnJvbSAnLi9kYXRhL21vY2tEYXRhJztcbmltcG9ydCB7IEFsZXJ0Q2lyY2xlLCBDaGVja0NpcmNsZTIsIEluZm8gfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IFthY3RpdmVQYWdlLCBzZXRBY3RpdmVQYWdlXSA9IHVzZVN0YXRlKCdob21lJyk7XG4gIGNvbnN0IFtpc3N1ZXMsIHNldElzc3Vlc10gPSB1c2VTdGF0ZShJTklUSUFMX0lTU1VFUyk7XG4gIGNvbnN0IFtsZWFkZXJib2FyZCwgc2V0TGVhZGVyYm9hcmRdID0gdXNlU3RhdGUoSU5JVElBTF9MRUFERVJCT0FSRCk7XG4gIGNvbnN0IFt1c2VyUHJvZmlsZSwgc2V0VXNlclByb2ZpbGVdID0gdXNlU3RhdGUoTU9DS19VU0VSX1BST0ZJTEUpO1xuICBjb25zdCBbc2VsZWN0ZWRJc3N1ZUlkLCBzZXRTZWxlY3RlZElzc3VlSWRdID0gdXNlU3RhdGUobnVsbCk7XG4gIFxuICAvLyBUb2FzdCBub3RpZmljYXRpb24gc3RhdGVcbiAgY29uc3QgW3RvYXN0LCBzZXRUb2FzdF0gPSB1c2VTdGF0ZSh7IG1lc3NhZ2U6ICcnLCB0eXBlOiBudWxsLCB2aXNpYmxlOiBmYWxzZSB9KTtcblxuICBjb25zdCBzaG93VG9hc3QgPSAobWVzc2FnZSwgdHlwZSA9ICdzdWNjZXNzJykgPT4ge1xuICAgIHNldFRvYXN0KHsgbWVzc2FnZSwgdHlwZSwgdmlzaWJsZTogdHJ1ZSB9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldFRvYXN0KHByZXYgPT4gKHsgLi4ucHJldiwgdmlzaWJsZTogZmFsc2UgfSkpO1xuICAgIH0sIDQwMDApO1xuICB9O1xuXG4gIC8vIEhlbHBlcjogdXBkYXRlIEhpdGVzaCdzIHN0YXRzIG9uIHRoZSBsZWFkZXJib2FyZCBkeW5hbWljYWxseVxuICBjb25zdCB1cGRhdGVMZWFkZXJib2FyZFN0YXRzID0gKG5ld1BvaW50cywgbmV3UmVwb3J0cyA9IDAsIG5ld1ZlcmlmaWNhdGlvbnMgPSAwKSA9PiB7XG4gICAgc2V0TGVhZGVyYm9hcmQocHJldiA9PiBwcmV2Lm1hcChtZW1iZXIgPT4ge1xuICAgICAgaWYgKG1lbWJlci5uYW1lID09PSB1c2VyUHJvZmlsZS5uYW1lKSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRQb2ludHMgPSBtZW1iZXIucG9pbnRzICsgbmV3UG9pbnRzO1xuICAgICAgICBjb25zdCB1cGRhdGVkUmVwb3J0cyA9IG1lbWJlci5yZXBvcnRzICsgbmV3UmVwb3J0cztcbiAgICAgICAgY29uc3QgdXBkYXRlZFZlcmlmaWNhdGlvbnMgPSBtZW1iZXIudmVyaWZpY2F0aW9ucyArIG5ld1ZlcmlmaWNhdGlvbnM7XG4gICAgICAgIFxuICAgICAgICAvLyBDYWxjdWxhdGUgbmV3IGJhZGdlIGJhc2VkIG9uIHBvaW50cyB0aHJlc2hvbGRcbiAgICAgICAgbGV0IG5ld0JhZGdlID0gbWVtYmVyLmJhZGdlO1xuICAgICAgICBpZiAodXBkYXRlZFBvaW50cyA+PSAzMDApIG5ld0JhZGdlID0gJ0NvbW11bml0eSBIZXJvJztcbiAgICAgICAgZWxzZSBpZiAodXBkYXRlZFBvaW50cyA+PSAyNTApIG5ld0JhZGdlID0gJ1N0cmVldCBTYXZlcic7XG4gICAgICAgIGVsc2UgaWYgKHVwZGF0ZWRQb2ludHMgPj0gMjAwKSBuZXdCYWRnZSA9ICdDbGVhbiBDaXR5IENoYW1waW9uJztcbiAgICAgICAgZWxzZSBpZiAodXBkYXRlZFBvaW50cyA+PSAxNTApIG5ld0JhZGdlID0gJ1NhZmV0eSBHdWFyZGlhbic7XG4gICAgICAgIGVsc2UgaWYgKHVwZGF0ZWRQb2ludHMgPj0gMTAwKSBuZXdCYWRnZSA9ICdMb2NhbCBMZWFkZXInO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBhY3RpdmUgcHJvZmlsZSBzdGF0ZSB0b29cbiAgICAgICAgc2V0VXNlclByb2ZpbGUoe1xuICAgICAgICAgIC4uLnVzZXJQcm9maWxlLFxuICAgICAgICAgIHBvaW50czogdXBkYXRlZFBvaW50cyxcbiAgICAgICAgICByZXBvcnRzOiB1cGRhdGVkUmVwb3J0cyxcbiAgICAgICAgICB2ZXJpZmljYXRpb25zOiB1cGRhdGVkVmVyaWZpY2F0aW9ucyxcbiAgICAgICAgICBiYWRnZTogbmV3QmFkZ2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5tZW1iZXIsXG4gICAgICAgICAgcG9pbnRzOiB1cGRhdGVkUG9pbnRzLFxuICAgICAgICAgIHJlcG9ydHM6IHVwZGF0ZWRSZXBvcnRzLFxuICAgICAgICAgIHZlcmlmaWNhdGlvbnM6IHVwZGF0ZWRWZXJpZmljYXRpb25zLFxuICAgICAgICAgIGJhZGdlOiBuZXdCYWRnZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1lbWJlcjtcbiAgICB9KSk7XG4gIH07XG5cbiAgLy8gQWN0aW9uOiBBZGQgbmV3IGlzc3VlIGZyb20gcmVwb3J0IHBhZ2VcbiAgY29uc3QgaGFuZGxlQWRkSXNzdWUgPSAobmV3SXNzdWUpID0+IHtcbiAgICBzZXRJc3N1ZXMocHJldiA9PiBbbmV3SXNzdWUsIC4uLnByZXZdKTtcbiAgICB1cGRhdGVMZWFkZXJib2FyZFN0YXRzKDIwLCAxLCAwKTsgLy8gKzIwIHBvaW50cyBmb3IgcmVwb3J0XG4gIH07XG5cbiAgLy8gQWN0aW9uOiBDaXRpemVuIHZlcmlmaWNhdGlvbiB2b3RpbmdcbiAgY29uc3QgaGFuZGxlVmVyaWZ5SXNzdWUgPSAoaXNzdWVJZCwgaW5jcmVtZW50QW1vdW50KSA9PiB7XG4gICAgc2V0SXNzdWVzKHByZXYgPT4gcHJldi5tYXAoaXNzdWUgPT4ge1xuICAgICAgaWYgKGlzc3VlLmlkID09PSBpc3N1ZUlkKSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRWZXJpZmljYXRpb25zID0gaXNzdWUudmVyaWZpY2F0aW9ucyArIGluY3JlbWVudEFtb3VudDtcbiAgICAgICAgbGV0IHVwZGF0ZWRTdGF0dXMgPSBpc3N1ZS5zdGF0dXM7XG4gICAgICAgIGxldCB1cGRhdGVkVGltZWxpbmUgPSBbLi4uaXNzdWUudGltZWxpbmVdO1xuXG4gICAgICAgIC8vIElmIHZlcmlmaWNhdGlvbnMgcmVhY2ggYSB0aHJlc2hvbGQsIGF1dG8tYWR2YW5jZSB0byBcIlZlcmlmaWVkXCJcbiAgICAgICAgaWYgKGlzc3VlLnN0YXR1cyA9PT0gJ1BlbmRpbmcnICYmIHVwZGF0ZWRWZXJpZmljYXRpb25zID49IDE1KSB7XG4gICAgICAgICAgdXBkYXRlZFN0YXR1cyA9ICdWZXJpZmllZCc7XG4gICAgICAgICAgdXBkYXRlZFRpbWVsaW5lLnB1c2goe1xuICAgICAgICAgICAgc3RhdHVzOiAnVmVyaWZpZWQnLFxuICAgICAgICAgICAgZGF0ZTogJ0p1c3Qgbm93JyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ29tbXVuaXR5IHZlcmlmaWNhdGlvbiB0aHJlc2hvbGQgKDE1KyB2b3RlcykgY29tcGxldGVkLiBJc3N1ZSBmb3J3YXJkZWQgdG8gbXVuaWNpcGFsIHBvcnRhbC4nXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2hvd1RvYXN0KGBJc3N1ZSAke2lzc3VlLmlkfSBoYXMgbWV0IHRocmVzaG9sZCBhbmQgaXMgbm93IFZlcmlmaWVkIWAsICdzdWNjZXNzJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmlzc3VlLFxuICAgICAgICAgIHZlcmlmaWNhdGlvbnM6IHVwZGF0ZWRWZXJpZmljYXRpb25zLFxuICAgICAgICAgIHN0YXR1czogdXBkYXRlZFN0YXR1cyxcbiAgICAgICAgICB0aW1lbGluZTogdXBkYXRlZFRpbWVsaW5lXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gaXNzdWU7XG4gICAgfSkpO1xuXG4gICAgdXBkYXRlTGVhZGVyYm9hcmRTdGF0cygxMCwgMCwgMSk7IC8vICsxMCBwb2ludHMgZm9yIHZlcmlmeWluZ1xuICB9O1xuXG4gIC8vIEFjdGlvbjogQWRtaW4gYWR2YW5jZSBzdGF0dXMgb2YgaXNzdWVcbiAgY29uc3QgaGFuZGxlQ2hhbmdlU3RhdHVzID0gKGlzc3VlSWQsIG5ld1N0YXR1cykgPT4ge1xuICAgIHNldElzc3VlcyhwcmV2ID0+IHByZXYubWFwKGlzc3VlID0+IHtcbiAgICAgIGlmIChpc3N1ZS5pZCA9PT0gaXNzdWVJZCkge1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpICsgJyAnICsgbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHsgaG91cjogJzItZGlnaXQnLCBtaW51dGU6ICcyLWRpZ2l0JyB9KTtcbiAgICAgICAgbGV0IHN0YXR1c0Rlc2MgPSBgU3RhdHVzIHRyYW5zaXRpb25lZCB0byAke25ld1N0YXR1c30uYDtcblxuICAgICAgICBpZiAobmV3U3RhdHVzID09PSAnVmVyaWZpZWQnKSB7XG4gICAgICAgICAgc3RhdHVzRGVzYyA9ICdBdWRpdGVkIGFuZCB2ZXJpZmllZCBieSBhZG1pbmlzdHJhdGl2ZSBvZmZpY2VyLic7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3U3RhdHVzID09PSAnQXNzaWduZWQnKSB7XG4gICAgICAgICAgc3RhdHVzRGVzYyA9IGBGb3J3YXJkZWQgdG8gJHtpc3N1ZS5kZXBhcnRtZW50fSBjb250cmFjdG9yIGRpdmlzaW9uLmA7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3U3RhdHVzID09PSAnSW4gUHJvZ3Jlc3MnKSB7XG4gICAgICAgICAgc3RhdHVzRGVzYyA9ICdXb3JrIGNyZXcgZGlzcGF0Y2hlZCBhbmQgcmVwYWlyIG9wZXJhdGlvbnMgY29tbWVuY2VkLic7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3U3RhdHVzID09PSAnUmVzb2x2ZWQnKSB7XG4gICAgICAgICAgc3RhdHVzRGVzYyA9ICdSZXBhaXIgY29tcGxldGVkLiBBd2FpdGluZyBjaXRpemVuIHBoeXNpY2FsIHZlcmlmaWNhdGlvbiAoUHJvb2Ygb2YgUmVzb2x1dGlvbikuJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uaXNzdWUsXG4gICAgICAgICAgc3RhdHVzOiBuZXdTdGF0dXMsXG4gICAgICAgICAgdGltZWxpbmU6IFsuLi5pc3N1ZS50aW1lbGluZSwgeyBzdGF0dXM6IG5ld1N0YXR1cywgZGF0ZTogdGltZXN0YW1wLCBkZXNjcmlwdGlvbjogc3RhdHVzRGVzYyB9XVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlzc3VlO1xuICAgIH0pKTtcbiAgfTtcblxuICAvLyBBY3Rpb246IFVwbG9hZCBwcm9vZiBvZiByZXNvbHV0aW9uXG4gIGNvbnN0IGhhbmRsZVVwbG9hZFByb29mID0gKGlzc3VlSWQsIHByb29mKSA9PiB7XG4gICAgc2V0SXNzdWVzKHByZXYgPT4gcHJldi5tYXAoaXNzdWUgPT4ge1xuICAgICAgaWYgKGlzc3VlLmlkID09PSBpc3N1ZUlkKSB7XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCkgKyAnICcgKyBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZyhbXSwgeyBob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTogJzItZGlnaXQnIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmlzc3VlLFxuICAgICAgICAgIHByb29mT2ZSZXNvbHV0aW9uOiBwcm9vZixcbiAgICAgICAgICB0aW1lbGluZTogWy4uLmlzc3VlLnRpbWVsaW5lLCB7XG4gICAgICAgICAgICBzdGF0dXM6ICdDbG9zZWQgJiBWZXJpZmllZCcsXG4gICAgICAgICAgICBkYXRlOiB0aW1lc3RhbXAsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogYEZ1bGx5IENsb3NlZC4gQ2l0aXplbiBhdWRpdCBjb25maXJtZWQgcmVwYWlyIHF1YWxpdHkgd2l0aCBwaG90byB2ZXJpZmljYXRpb24uIFZlcmlmaWVkIGJ5ICR7cHJvb2YudmVyaWZpZWRCeX0uYFxuICAgICAgICAgIH1dXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gaXNzdWU7XG4gICAgfSkpO1xuXG4gICAgdXBkYXRlTGVhZGVyYm9hcmRTdGF0cygxNSwgMCwgMSk7IC8vICsxNSBwb2ludHMgZm9yIHVwbG9hZGluZyBwcm9vZlxuICB9O1xuXG4gIC8vIEFjdGlvbjogQWRkIGNvbW1lbnQvdXBkYXRlXG4gIGNvbnN0IGhhbmRsZUFkZENvbW1lbnQgPSAoaXNzdWVJZCwgbmV3Q29tbWVudCkgPT4ge1xuICAgIHNldElzc3VlcyhwcmV2ID0+IHByZXYubWFwKGlzc3VlID0+IHtcbiAgICAgIGlmIChpc3N1ZS5pZCA9PT0gaXNzdWVJZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmlzc3VlLFxuICAgICAgICAgIGNvbW1lbnRzOiBbLi4uaXNzdWUuY29tbWVudHMsIG5ld0NvbW1lbnRdXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gaXNzdWU7XG4gICAgfSkpO1xuICB9O1xuXG4gIGNvbnN0IHNlbGVjdGVkSXNzdWUgPSBpc3N1ZXMuZmluZChpID0+IGkuaWQgPT09IHNlbGVjdGVkSXNzdWVJZCk7XG5cbiAgLy8gUm91dGVyIGRpc3BhdGNoZXJcbiAgY29uc3QgcmVuZGVyUGFnZSA9ICgpID0+IHtcbiAgICBzd2l0Y2ggKGFjdGl2ZVBhZ2UpIHtcbiAgICAgIGNhc2UgJ2hvbWUnOlxuICAgICAgICByZXR1cm4gPExhbmRpbmdQYWdlIHNldEFjdGl2ZVBhZ2U9e3NldEFjdGl2ZVBhZ2V9IC8+O1xuICAgICAgY2FzZSAncmVwb3J0JzpcbiAgICAgICAgcmV0dXJuIDxSZXBvcnRJc3N1ZVBhZ2Ugb25BZGRJc3N1ZT17aGFuZGxlQWRkSXNzdWV9IHNob3dUb2FzdD17c2hvd1RvYXN0fSBzZXRBY3RpdmVQYWdlPXtzZXRBY3RpdmVQYWdlfSAvPjtcbiAgICAgIGNhc2UgJ21hcCc6XG4gICAgICAgIHJldHVybiA8TGl2ZU1hcFBhZ2UgaXNzdWVzPXtpc3N1ZXN9IHNldEFjdGl2ZVBhZ2U9e3NldEFjdGl2ZVBhZ2V9IHNldFNlbGVjdGVkSXNzdWVJZD17c2V0U2VsZWN0ZWRJc3N1ZUlkfSAvPjtcbiAgICAgIGNhc2UgJ3RyYWNrJzpcbiAgICAgICAgcmV0dXJuIDxUcmFja0NvbXBsYWludFBhZ2UgaXNzdWVzPXtpc3N1ZXN9IHNldEFjdGl2ZVBhZ2U9e3NldEFjdGl2ZVBhZ2V9IHNldFNlbGVjdGVkSXNzdWVJZD17c2V0U2VsZWN0ZWRJc3N1ZUlkfSAvPjtcbiAgICAgIGNhc2UgJ3ZlcmlmeSc6XG4gICAgICAgIHJldHVybiA8Q29tbXVuaXR5VmVyaWZpY2F0aW9uUGFnZSBpc3N1ZXM9e2lzc3Vlc30gb25WZXJpZnlJc3N1ZT17aGFuZGxlVmVyaWZ5SXNzdWV9IHVzZXJQcm9maWxlPXt1c2VyUHJvZmlsZX0gc2hvd1RvYXN0PXtzaG93VG9hc3R9IC8+O1xuICAgICAgY2FzZSAnZGFzaGJvYXJkJzpcbiAgICAgICAgcmV0dXJuIDxBZG1pbkRhc2hib2FyZCBpc3N1ZXM9e2lzc3Vlc30gb25DaGFuZ2VTdGF0dXM9e2hhbmRsZUNoYW5nZVN0YXR1c30gc2hvd1RvYXN0PXtzaG93VG9hc3R9IC8+O1xuICAgICAgY2FzZSAnbGVhZGVyYm9hcmQnOlxuICAgICAgICByZXR1cm4gPExlYWRlcmJvYXJkUGFnZSBsZWFkZXJib2FyZERhdGE9e2xlYWRlcmJvYXJkfSB1c2VyUHJvZmlsZT17dXNlclByb2ZpbGV9IC8+O1xuICAgICAgY2FzZSAnZGV0YWlscyc6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPElzc3VlRGV0YWlsc1BhZ2VcbiAgICAgICAgICAgIGlzc3VlPXtzZWxlY3RlZElzc3VlfVxuICAgICAgICAgICAgb25CYWNrPXsoKSA9PiBzZXRBY3RpdmVQYWdlKCd0cmFjaycpfVxuICAgICAgICAgICAgb25VcGxvYWRQcm9vZj17aGFuZGxlVXBsb2FkUHJvb2Z9XG4gICAgICAgICAgICBvbkFkZENvbW1lbnQ9e2hhbmRsZUFkZENvbW1lbnR9XG4gICAgICAgICAgICB1c2VyUHJvZmlsZT17dXNlclByb2ZpbGV9XG4gICAgICAgICAgICBzaG93VG9hc3Q9e3Nob3dUb2FzdH1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgY2FzZSAnYWJvdXQnOlxuICAgICAgICByZXR1cm4gPEFib3V0UGFnZSAvPjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiA8TGFuZGluZ1BhZ2Ugc2V0QWN0aXZlUGFnZT17c2V0QWN0aXZlUGFnZX0gLz47XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctc2xhdGUtNTAgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gc2VsZWN0aW9uOmJnLWJsdWUtNjAwIHNlbGVjdGlvbjp0ZXh0LXdoaXRlXCI+XG4gICAgICB7LyogU3RpY2t5IHRvcCBOYXZpZ2F0aW9uIGJhciAqL31cbiAgICAgIDxOYXZiYXJcbiAgICAgICAgYWN0aXZlUGFnZT17YWN0aXZlUGFnZX1cbiAgICAgICAgc2V0QWN0aXZlUGFnZT17c2V0QWN0aXZlUGFnZX1cbiAgICAgICAgdXNlclByb2ZpbGU9e3VzZXJQcm9maWxlfVxuICAgICAgICBpc3N1ZXM9e2lzc3Vlc31cbiAgICAgIC8+XG5cbiAgICAgIHsvKiBQcmltYXJ5IFBhZ2UgQ2FudmFzICovfVxuICAgICAgPG1haW4gY2xhc3NOYW1lPVwiZmxleC1ncm93XCI+XG4gICAgICAgIHtyZW5kZXJQYWdlKCl9XG4gICAgICA8L21haW4+XG5cbiAgICAgIHsvKiBHbG9iYWwgVG9hc3QgQWxlcnRzICovfVxuICAgICAge3RvYXN0LnZpc2libGUgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGJvdHRvbS01IHJpZ2h0LTUgei01MCBhbmltYXRlLWJvdW5jZVwiIHN0eWxlPXt7IGFuaW1hdGlvbkR1cmF0aW9uOiAnM3MnIH19PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSBweC00LjUgcHktMyByb3VuZGVkLTJ4bCBzaGFkb3ctMnhsIGJvcmRlciB0ZXh0LXhzIGZvbnQtYm9sZCAke1xuICAgICAgICAgICAgdG9hc3QudHlwZSA9PT0gJ3N1Y2Nlc3MnID8gJ2JnLWVtZXJhbGQtNTAwIHRleHQtd2hpdGUgYm9yZGVyLWVtZXJhbGQtNDAwJyA6XG4gICAgICAgICAgICB0b2FzdC50eXBlID09PSAnZXJyb3InID8gJ2JnLXJlZC01MDAgdGV4dC13aGl0ZSBib3JkZXItcmVkLTQwMCcgOlxuICAgICAgICAgICAgJ2JnLXNsYXRlLTkwMCB0ZXh0LXdoaXRlIGJvcmRlci1zbGF0ZS04MDAnXG4gICAgICAgICAgfWB9PlxuICAgICAgICAgICAge3RvYXN0LnR5cGUgPT09ICdzdWNjZXNzJyAmJiA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cbiAgICAgICAgICAgIHt0b2FzdC50eXBlID09PSAnZXJyb3InICYmIDxBbGVydENpcmNsZSBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XG4gICAgICAgICAgICB7dG9hc3QudHlwZSA9PT0gJ2luZm8nICYmIDxJbmZvIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cbiAgICAgICAgICAgIDxzcGFuPnt0b2FzdC5tZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuIl19