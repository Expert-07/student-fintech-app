import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import Timetable from "./pages/Timetable"
import ThemeToggle from "./pages/Themetoggle"
import EdTechToolsPage from "./pages/EdTech"
import SmartReminders from "./pages/SmartReminders"
import NotificationBanner from "./components/NotificationBanner"
import LandingPage from "./pages/LandingPage"
import DashboardTemplate from "./pages/DashboardTemplate"
import LoginTemplate from "./pages/LoginTemplate"

function App() {
  const [notification, setNotification] = useState(null);

  return (
    <>
      <ThemeToggle />
      <NotificationBanner message={notification} onClose={() => setNotification(null)} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
{   /*     <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardTemplate />} />
        <Route path="/login" element={<LoginTemplate />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/edtech" element={<EdTechToolsPage />} />
        <Route path="/smartrem" element={<SmartReminders onNewReminder={setNotification} />} />
      </Routes>
    </>
  )
}

export default App;

