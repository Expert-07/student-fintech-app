//import React, { useEffect, useState } from "react";
//import Chart from "chart.js/auto";
import "../css/Dashboard.css";
import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
//import { p } from "framer-motion/client";
//import { Link } from "react-router-dom";
import TimetableForm from "./TimetableForm";
  // Modal close handler
  const handleCloseModal = () => setShowModal(false);
//import MonthlySummary from "./MonthlySummary";
//import BudgetSuggestions from "./BudgetSuggestions";
import Navbar from "./Navbar";
import "../css/Dashboard.css";
//import BudgetSuggestions from "./BudgetSuggestions";
import useWeeklySummary from "./useWeeklySummary";
import SideBar from "./SideBar";
import ReminderSystem from "./SmartReminders";


// This template is a direct React conversion of your dashboard.html, ready for backend integration like Dashboard.jsx
// You can now add state, fetch, and backend logic as needed.

//const userAvatar = "https://ui-avatars.com/api/?name=Alex+Johnson&background=00ffff&color=121212";

function NotificationBanner({ message, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      background: '#2563eb',
      color: 'white',
      padding: '10px',
      textAlign: 'center',
      zIndex: 1000,
    }}>
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: '20px',
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        ✕
      </button>
    </div>
  );
}

export default function DashboardTemplate() {
  // Example state for dynamic data (replace with backend fetch logic)

  const [wallet, setWallet] = useState(null);
  const [topupAmount, setTopupAmount] = useState("");
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [remindersCount, setRemindersCount] = useState(0);
  const [readingProgress, setReadingProgress] = useState({ percent: 0, completed: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [notification, setNotification] = useState(null);
  const { summary, loading: loadingWeekly } = useWeeklySummary();
  console.log("Weekly summary:", summary);
  // Get token and decode user ID
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    setUserId(decoded.id);
    setUser(decoded);
    fetchWallet(token);
    fetchReadingProgress(token);
    fetchStreak(token);
  }, []);

  // Fetch reading progress from backend
  const fetchReadingProgress = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/readingplanner", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.plans)) {
        const total = data.plans.length;
        const completed = data.plans.filter(p => Number(p.current_page) >= Number(p.total_pages) && p.total_pages > 0).length;
        // Average percent progress across all plans
        let percent = 0;
        if (total > 0) {
          percent = Math.round(
            data.plans.reduce((sum, p) => sum + ((p.current_page || 0) / (p.total_pages || 1)), 0) / total * 100
          );
        }
        setReadingProgress({ percent, completed, total });
      } else {
        setReadingProgress({ percent: 0, completed: 0, total: 0 });
      }
    } catch {
      setReadingProgress({ percent: 0, completed: 0, total: 0 });
    }
  };

  // Fetch Wallet
  const fetchWallet = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setWallet(data);
      } else {
        console.error("Error fetching wallet:", data.message);
      }
    } catch (err) {
      console.error("Fetch wallet failed:", err);
    }
  };

  // Fetch streak from backend
  const fetchStreak = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/streak", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setStreak(data.streak);
      } else {
        console.error("Error fetching streak:", data.message);
      }
    } catch (err) {
      console.error("Fetch streak failed:", err);
    }
  };

  // Handle Top-Up
  const handleTopup = async () => {
    const token = localStorage.getItem("token");
    if (!topupAmount) return;

    try {
      const res = await fetch("http://localhost:5000/api/wallet/topup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(topupAmount) }),
      });

      const data = await res.json();

      if (res.ok) {
        setNotification("Wallet topped up successfully!");
        setTopupAmount("");
        fetchWallet(token); // 🔁 Refresh wallet
      } else {
        setNotification(data.message || "Top-up failed");
      }
    } catch (err) {
      console.error("Top-up failed:", err);
      setNotification("Top-up error");
    }
  };
  // Sidebar toggle (mobile)
  useEffect(() => {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    if (menuToggle && sidebar) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active");
      });
    }
    const searchToggle = document.getElementById("searchToggle");
    const searchBar = document.getElementById("searchBar");
    if (searchToggle && searchBar) {
      searchToggle.addEventListener("click", () => {
        searchBar.classList.toggle("active");
      });
    }
  }, []);
  useEffect(() => {
    // Fetch reminders count
    const fetchRemindersCount = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) return;
      try {
        const res = await fetch(`http://localhost:5000/api/timetable/today/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setRemindersCount(data.length);
        } else {
          setRemindersCount(0);
        }
      } catch {
        setRemindersCount(0);
      }
    };
    fetchRemindersCount();
  }, []);

  useEffect(() => {
    // Example: Trigger a notification after 5 seconds
    const timer = setTimeout(() => {
      setNotification("Welcome back! Check out your new goals.");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
<SideBar/>
      {/* Main Content Area */}
      <main className="main-content">
        {/* Notification Banner */}
        {notification && (
          <NotificationBanner
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}
        {/* Dashboard Header */}
        <header className="dashboard-header">
          <button className="menu-toggle" id="menuToggle">
            <i className="fas fa-bars"></i>
          </button>
          <div className="search-bar" id="searchBar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="search-profile">
            <button className="search-toggle" id="searchToggle">
              <i className="fas fa-search"></i>
            </button>
            <div className="profile-dropdown">
              <div className="notification-badge">{remindersCount}</div>
              <span>{ user?.name }</span>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Welcome Section */}
          <div className="welcome-section fade-in">
            <h1>Welcome back, { user?.name }!</h1>
            <p>Here's your progress summary for today. You're doing great!</p>
          </div>

          {/* Stats Overview */}
          <div className="stats-grid">
            <div className="stat-card fade-in">
              <div className="stat-icon">
                <i className="fas fa-book-open"></i>
              </div>
            <div className="stat-title">Reading Progress</div>
              <div className="stat-value">{readingProgress.percent}%</div>
              <div className="stat-subtext">
                {readingProgress.total > 0
                  ? `${readingProgress.completed}/${readingProgress.total} books completed`
                  : "No books tracked yet"}
              </div>
            </div>
            <div className="stat-card fade-in">
              <div className="stat-icon">
                <i className="fas fa-wallet"></i>
              </div>
              <div className="stat-title">Total Savings</div>
              <div className="stat-value">
                {wallet
                  ? `₦${Number(wallet.totalBalance).toLocaleString('en-NG', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : "Loading..."}
              </div>
              <div className="stat-subtext">
                {loadingWeekly && "Loading weekly spend..."}
                {!loadingWeekly && summary && summary.totalSpent !== undefined && (
                  <span>Spent this week: ₦{Number(summary.totalSpent).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                )}
                {!loadingWeekly && (!summary || summary.totalSpent === undefined) && (
                  <span>Weekly spend unavailable</span>
                )}
              </div>
            </div>
            <div className="stat-card fade-in">
              <div className="stat-icon">
                <i className="fas fa-fire"></i>
              </div>
              <div className="stat-title">Day Streak</div>
              <div className="stat-value">{streak}</div>
              <div className="stat-subtext">Keep going!</div>
            </div>
            <div className="stat-card fade-in">
              <div className="stat-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <div className="stat-title">Achievements</div>
              <div className="stat-value">{}</div>
              <div className="stat-subtext">Master Reader unlocked</div>
            </div>

                        <div className="stat-card fade-in">
              <div className="stat-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <div className="stat-title">Smart Reminder</div>
              <div className="stat-value"><ReminderSystem userId={user?.id}/></div>
              <div className="stat-subtext">Master Reader unlocked</div>
            </div>
          </div>

          {/* Goals Section */}
          <div className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2>
              <i className="fas fa-bullseye"></i> Your Goals
            </h2>
            <button
              className="add-timetable-btn"
              style={{
                background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
              onClick={() => setShowModal(true)}
            >
              + Add Timetable Entry
            </button>
          </div>
        {/* Timetable Entry Modal */}
        {showModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.35)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 4px 32px rgba(0,0,0,0.18)', padding: 0, minWidth: 350, maxWidth: '90vw', position: 'relative' }}>
              <button
                onClick={handleCloseModal}
                style={{ position: 'absolute', top: 10, right: 10, background: 'transparent', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer', zIndex: 2 }}
                title="Close"
              >
                &times;
              </button>
              <div style={{ padding: 24 }}>
                <TimetableForm onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        )}
          <div className="goals-container">
            {/* Example goal cards, replace with dynamic data as needed */}
            <div className="goal-card fade-in">
              <div className="goal-header">
                <div className="goal-title">Complete CS Textbook</div>
                <div className="goal-badge">Academic</div>
              </div>
              <div className="progress-container">
                <div className="progress-info">
                  <span>Progress: 78%</span>
                  <span>3 days left</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "78%" }}></div>
                </div>
              </div>
              <div className="goal-meta">
                <span>
                  <i className="fas fa-book me-1"></i> Chapter 5/7
                </span>
                <span>
                  <i className="fas fa-fire me-1 text-danger"></i> 5 day streak
                </span>
              </div>
            </div>
            <div className="goal-card fade-in finance">
              <div className="goal-header">
                <div className="goal-title">New Laptop Fund</div>
                <div className="goal-badge finance-badge">Finance</div>
              </div>
              <div className="progress-container">
                <div className="progress-info">
                  <span>Progress: 65%</span>
                  <span>3 weeks left</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill finance-fill" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div className="goal-meta">
                <span>
                  <i className="fas fa-dollar-sign me-1"></i> $325/$500
                </span>
                <span>
                  <i className="fas fa-calendar me-1"></i> Aug 30, 2023
                </span>
              </div>
            </div>
            <div className="goal-card fade-in">
              <div className="goal-header">
                <div className="goal-title">Research Paper Draft</div>
                <div className="goal-badge">Academic</div>
              </div>
              <div className="progress-container">
                <div className="progress-info">
                  <span>Progress: 40%</span>
                  <span>2 weeks left</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "40%" }}></div>
                </div>
              </div>
              <div className="goal-meta">
                <span>
                  <i className="fas fa-file-alt me-1"></i> 2/5 sections
                </span>
                <span>
                  <i className="fas fa-pencil-alt me-1"></i> 500 words/day
                </span>
              </div>
            </div>
            <div className="goal-card fade-in">
              <div className="goal-header">
                <div className="goal-title">Fitness Challenge</div>
                <div className="goal-badge">Personal</div>
              </div>
              <div className="progress-container">
                <div className="progress-info">
                  <span>Progress: 60%</span>
                  <span>10 days left</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div className="goal-meta">
                <span>
                  <i className="fas fa-dumbbell me-1"></i> 12/20 sessions
                </span>
                <span>
                  <i className="fas fa-running me-1"></i> Daily workout
                </span>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="section-title">
            <h2>
              <i className="fas fa-history"></i> Recent Activity
            </h2>
          </div>
          <div className="activity-section fade-in">
            <ul className="activity-list">
              <li className="activity-item">
                <div className="activity-icon">
                  <i className="fas fa-book"></i>
                </div>
                <div className="activity-content">
                  <div className="activity-title">Logged reading progress</div>
                  <div className="activity-desc">Completed Chapter 5 of Computer Science textbook</div>
                  <div className="activity-time">Today, 10:30 AM</div>
                </div>
              </li>
              <li className="activity-item">
                <div className="activity-icon finance-icon">
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className="activity-content">
                  <div className="activity-title">Added to savings</div>
                  <div className="activity-desc">Deposited $25 to New Laptop Fund</div>
                  <div className="activity-time">Yesterday, 4:15 PM</div>
                </div>
              </li>
              <li className="activity-item">
                <div className="activity-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <div className="activity-content">
                  <div className="activity-title">Achievement unlocked</div>
                  <div className="activity-desc">Master Reader - Completed 5 books this semester</div>
                  <div className="activity-time">July 8, 2023, 2:40 PM</div>
                </div>
              </li>
              <li className="activity-item">
                <div className="activity-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="activity-content">
                  <div className="activity-title">Goal milestone reached</div>
                  <div className="activity-desc">Completed 75% of Research Paper Draft</div>
                  <div className="activity-time">July 7, 2023, 9:15 AM</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Charts Section */}
          <div className="section-title">
            <h2>
              <i className="fas fa-chart-line"></i> Progress Analytics
            </h2>
          </div>
          <div className="charts-section">
            <div className="chart-container fade-in">
              <div className="chart-header">
                <h3>Weekly Progress</h3>
                <select className="time-filter">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
              <div className="chart-placeholder">
                <canvas id="progressChart" height="300"></canvas>
              </div>
            </div>
            <div className="chart-container fade-in">
              <div className="chart-header">
                <h3>Savings Overview</h3>
                <select className="time-filter">
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <div className="chart-placeholder">
                <canvas id="savingsChart" height="300"></canvas>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
