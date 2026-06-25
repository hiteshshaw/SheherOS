# 🌐 SheherOS — Report. Verify. Track. Solve.

**SheherOS** is an AI-powered, hyperlocal civic dashboard built for citizens and municipal authorities to collaborate on identifying, verifying, routing, and solving urban infrastructure issues in real-time.

---

## 🚀 Core Features

- 📸 **AI-Driven Issue Reporting**: Snap a photo of a hazard (e.g., potholes, broken streetlights, water leaks). SheherOS automatically tags coordinates, detects the issue type, estimates severity, assigns priority scores, and routes the ticket to the correct municipal department.
- 🗺️ **Live Incident Map**: Interactive visual display powered by the **Google Maps JavaScript API** showing all active civic reports color-coded by status (Pending, Verified, Assigned, In Progress, Resolved).
- 🤖 **Gemini Before/After Auditing**: For resolved issues, citizens upload a "Proof of Resolution" photo. SheherOS leverages the Gemini Vision API to run a side-by-side audit of the repair's completeness before closing the ticket.
- 🏆 **Gamified Citizen Auditing**: Earn points and local reputation badges (e.g., *Community Hero*, *Street Saver*) for reporting verified issues or auditing completed contractor repairs.
- 📋 **Outreach & Export Center**: Export print-ready official municipal complaints or directly email pre-formatted AI-analyzed audit files to the ward commissioner.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19, Vite
- **Styling**: Tailwind CSS v4, Lucide React (icons)
- **Maps**: Google Maps JavaScript API (fallback-enabled loader utility)
- **AI Engine**: Google Gemini API (Vertex/AI Studio)
- **Build & Linter**: Vite, Oxlint

---

## 📂 Project Structure

```text
vibe2ship/
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── GoogleMap.jsx      # Google Maps canvas and marker rendering
│   │   ├── Navbar.jsx         # Site navigation and user profile status
│   │   └── GoalTracker.jsx    # Gamified goal status cards
│   ├── pages/                 # Full-page components
│   │   ├── LandingPage.jsx    # Main marketing & stats dashboard
│   │   ├── LiveMapPage.jsx    # Google Maps canvas & incident sidebar details
│   │   ├── IssueDetailsPage.jsx # Deep-dive details, timeline, and before/after verification
│   │   └── ...                # Admin, Leaderboard, About, and Report pages
│   ├── utils/
│   │   ├── loadGoogleMaps.js  # Async Google Maps SDK loader with callback
│   │   └── gemini.js          # Google Gemini AI connection and prompt engineering
│   └── data/
│       └── mockData.js        # Seed incidents, timeline logs, and leaderboard details
├── index.html                 # HTML entry point (SEO Optimized)
├── tailwind.config.js         # CSS Utility config
└── package.json               # Package manifests and scripts
```

---

## ⚙️ Installation & Setup

### 1. Clone & Install Dependencies
First, install the package dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (or update the existing one) with your credentials:
```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSy... # Must start with AIzaSy
VITE_APP_GEMINI_API_KEY=YOUR_GEMINI_KEY_HERE
```
*Note: If `VITE_GOOGLE_MAPS_API_KEY` is not present or invalid, SheherOS will automatically load the map in Developer/Evaluation mode.*

### 3. Run Development Server
Start the local server with hot module replacement (HMR):
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
Generate the optimized production bundle under `dist/`:
```bash
npm run build
```
You can preview the production bundle locally:
```bash
npm run preview
```

---

## 📜 License

This project is licensed under the MIT License.
