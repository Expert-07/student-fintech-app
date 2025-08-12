import React, { useState, lazy, Suspense } from "react";
import Preloader from "./components/Preloader";
import { Routes, Route } from "react-router-dom"
//import Landing from "./pages/Landing"
//import Login from "./pages/Login"

import ThemeToggle from "./pages/Themetoggle"
import NotificationBanner from "./components/NotificationBanner"
import RegisterTemplate from "./pages/RegisterTemplate";
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Register = lazy(() => import("./pages/Register"));
const DashboardTemplate = lazy(() => import("./pages/DashboardTemplate"));
const LoginTemplate = lazy(() => import("./pages/LoginTemplate"));
const Expenses = lazy(() => import("./pages/Expenses"));
const Timetable = lazy(() => import("./pages/Timetable"));
const EdTechToolsPage = lazy(() => import("./pages/EdTech"));
const CampusMap = lazy(() => import("./pages/CampusMap"));
const Finance = lazy(() => import("./pages/finance"));
const SmartReminders = lazy(() => import("./pages/SmartReminders"));
const ReadingPlannerTemplate = lazy(() => import("./pages/ReadingPlannerTemplate"));

function App() {
  const [notification, setNotification] = useState(null);

  return (
    <>
      <ThemeToggle />
      <NotificationBanner message={notification} onClose={() => setNotification(null)} />
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/logout" element={<LandingPage />} />
          {/* ...other routes... */}
          <Route path="/register" element={<RegisterTemplate />} />
          <Route path="/dashboard" element={<DashboardTemplate />} />
          <Route path="/login" element={<LoginTemplate />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/edtech" element={<EdTechToolsPage />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/smartrem" element={<SmartReminders onNewReminder={setNotification} />} />
          <Route path="/reading-planner" element={<ReadingPlannerTemplate />} />
          <Route path="/campus-map" element={<CampusMap />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;


