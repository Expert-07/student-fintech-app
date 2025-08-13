import React, { useEffect, useState } from "react";
import "../css/reading.css";
import SideBar from "./SideBar";
// NOTE: Make sure to import the CSS from reading (all in one).html in your main index.html or as a separate CSS file for pixel-perfect styling.

export default function ReadingPlanner() {
  // State for reading plans and form
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    book_title: "",
    author: "",
    subject: "",
    total_pages: "",
    current_page: "",
    start_date: "",
    end_date: "",
    pages_per_day: "",
    notes: "",
  });
  const [adding, setAdding] = useState(false);

  // Fetch reading plans
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/readingplanner", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPlans(data.plans);
      else setError(data.message || "Failed to fetch plans");
    } catch (err) {
      setError("Failed to fetch plans");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new reading plan
  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    setError("");
    // Validate required fields
    if (!form.book_title || !form.total_pages || !form.pages_per_day || !form.start_date || !form.end_date) {
      setError("Please fill in all required fields.");
      setAdding(false);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      // Only send fields the backend expects
      const payload = {
        book_title: form.book_title,
        total_pages: Number(form.total_pages),
        pages_per_day: Number(form.pages_per_day),
        start_date: form.start_date,
        end_date: form.end_date,
      };
      const res = await fetch("http://localhost:5000/api/readingplanner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setPlans([data.plan, ...plans]);
        setForm({ book_title: "", author: "", subject: "", total_pages: "", current_page: "", start_date: "", end_date: "", pages_per_day: "", notes: "" });
      } else {
        setError(data.message || "Failed to add plan");
      }
    } catch (err) {
      setError("Failed to add plan");
    } finally {
      setAdding(false);
    }
  };

  // Delete a plan
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reading plan?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/readingplanner/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setPlans(plans.filter((p) => p.id !== id));
      else setError("Failed to delete plan");
    } catch {
      setError("Failed to delete plan");
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <SideBar />
      {/* Main Content Area */}
      <main className="main-content">
        {/* Dashboard Header */}
        <header className="dashboard-header">
          <button className="menu-toggle" id="menuToggle">
            <i className="fas fa-bars"></i>
          </button>
          <div className="search-bar" id="searchBar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search books..." />
          </div>
          <div className="search-profile">
            <button className="search-toggle" id="searchToggle">
              <i className="fas fa-search"></i>
            </button>
            <div className="profile-dropdown">
              <div className="notification-badge">3</div>
              <img src="https://ui-avatars.com/api/?name=Alex+Johnson&background=00ffff&color=121212" alt="Alex" />
              <span>Alex Johnson</span>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </header>
        {/* Planner Grid Section */}
        <div className="planner-grid">
          {/* Add Book Form */}
          <div className="planner-section fade-in">
            <div className="section-title">
              <h2><i className="fas fa-plus-circle"></i> Add New Book</h2>
            </div>
            <form className="add-book-form" onSubmit={handleAdd}>
              <div className="form-group">
                <label htmlFor="bookTitle">Book Title</label>
                <input type="text" id="bookTitle" name="book_title" value={form.book_title} onChange={handleChange} placeholder="Enter book title" required />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input type="text" id="author" name="author" value={form.author} onChange={handleChange} placeholder="Enter author name" />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject/Category</label>
                <select id="subject" name="subject" value={form.subject} onChange={handleChange}>
                  <option value="">Select subject</option>
                  <option value="cs">Computer Science</option>
                  <option value="math">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="literature">Literature</option>
                  <option value="history">History</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="totalPages">Total Pages</label>
                <input type="number" id="totalPages" name="total_pages" value={form.total_pages} onChange={handleChange} placeholder="Enter total pages" required />
              </div>
              <div className="form-group">
                <label htmlFor="currentPage">Current Page</label>
                <input type="number" id="currentPage" name="current_page" value={form.current_page} onChange={handleChange} placeholder="Enter current page" />
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input type="date" id="startDate" name="start_date" value={form.start_date} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">Target Completion Date</label>
                <input type="date" id="endDate" name="end_date" value={form.end_date} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="dailyTarget">Daily Target (pages)</label>
                <input type="number" id="dailyTarget" name="pages_per_day" value={form.pages_per_day} onChange={handleChange} placeholder="Enter daily target" required />
              </div>
              <div className="form-group">
                <label htmlFor="bookNotes">Notes</label>
                <textarea id="bookNotes" name="notes" value={form.notes} onChange={handleChange} rows="2" placeholder="Add notes about this book"></textarea>
              </div>
              <button type="submit" className="btn btn-full" disabled={adding}>
                <i className="fas fa-book-medical"></i> {adding ? "Adding..." : "Add Book to Reading List"}
              </button>
              {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            </form>
          </div>
          {/* Reading List */}
          <div className="planner-section fade-in">
            <div className="section-title">
              <h2><i className="fas fa-book"></i> Your Reading List</h2>
              <div style={{ marginLeft: "auto" }}>
                <select className="time-filter">
                  <option>All Books</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Computer Science</option>
                </select>
              </div>
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : plans.length === 0 ? (
              <div>No reading plans yet.</div>
            ) : (
              <ul className="book-list">
                {plans.map((plan) => {
                  const progress = plan.total_pages ? Math.round((plan.current_page || 0) / plan.total_pages * 100) : 0;
                  return (
                    <li className="book-item fade-in" key={plan.id}>
                      <div className="book-cover">
                        <i className="fas fa-book"></i>
                      </div>
                      <div className="book-details">
                        <h3 className="book-title">{plan.book_title}</h3>
                        <div className="book-meta">
                          <span><i className="fas fa-layer-group"></i> Pages: {plan.total_pages}</span>
                          <span><i className="fas fa-calendar"></i> Due: {plan.end_date}</span>
                        </div>
                        <div className="progress-container">
                          <div className="progress-info">
                            <span>Progress: {progress}%</span>
                            <span>Page {plan.current_page || 0}/{plan.total_pages}</span>
                          </div>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                        <div className="book-actions">
                          {/* Add update progress and delete handlers here */}
                          <button className="action-btn" onClick={() => {
                            const newPage = prompt("Enter current page:", plan.current_page || 0);
                            if (newPage !== null && !isNaN(newPage)) updateProgress(plan.id, Number(newPage));
                          }}><i className="fas fa-edit"></i> Update</button>
                          <button className="action-btn" onClick={() => handleDelete(plan.id)}><i className="fas fa-trash-alt"></i> Remove</button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {/* Reading Calendar */}
          <div className="planner-section fade-in">
            <div className="calendar-header">
              <div className="section-title">
                <h2><i className="fas fa-calendar-alt"></i> Reading Calendar</h2>
              </div>
              <div className="calendar-nav">
                <button className="action-btn"><i className="fas fa-chevron-left"></i></button>
                <div className="current-month">July 2023</div>
                <button className="action-btn"><i className="fas fa-chevron-right"></i></button>
              </div>
            </div>
            <div className="calendar-grid">
              <div className="calendar-day">Sun</div>
              <div className="calendar-day">Mon</div>
              <div className="calendar-day">Tue</div>
              <div className="calendar-day">Wed</div>
              <div className="calendar-day">Thu</div>
              <div className="calendar-day">Fri</div>
              <div className="calendar-day">Sat</div>
              {/* Calendar dates with reading sessions */}
              <div className="calendar-date weekend">
                <div className="date-number">25</div>
              </div>
              <div className="calendar-date">
                <div className="date-number">26</div>
                <div className="reading-session">CS Principles: Ch 5</div>
              </div>
              <div className="calendar-date">
                <div className="date-number">27</div>
                <div className="reading-session">CS Principles: Ch 5</div>
                <div className="reading-session">Calculus: Ch 3</div>
              </div>
              <div className="calendar-date">
                <div className="date-number">28</div>
                <div className="reading-session">CS Principles: Ch 6</div>
              </div>
              <div className="calendar-date">
                <div className="date-number">29</div>
                <div className="reading-session">Physics: Ch 1</div>
              </div>
              <div className="calendar-date weekend">
                <div className="date-number">30</div>
                <div className="reading-session">Physics: Ch 1</div>
              </div>
              <div className="calendar-date weekend">
                <div className="date-number">1</div>
              </div>
              {/* Next row */}
              <div className="calendar-date">
                <div className="date-number">2</div>
                <div className="reading-session">CS Principles: Ch 7</div>
              </div>
              <div className="calendar-date today">
                <div className="date-number">3</div>
                <div className="reading-session">Today: Ch 7</div>
              </div>
              <div className="calendar-date">
                <div className="date-number">4</div>
                <div className="reading-session">Calculus: Ch 4</div>
              </div>
              <div className="calendar-date">
                <div className="date-number">5</div>
                <div className="reading-session">Physics: Ch 2</div>
              </div>
              <div className="calendar-date">
                <div className="date-number">6</div>
                <div className="reading-session">CS Principles: Review</div>
              </div>
              <div className="calendar-date weekend">
                <div className="date-number">7</div>
              </div>
              <div className="calendar-date weekend">
                <div className="date-number">8</div>
              </div>
              {/* More dates... */}
            </div>
          </div>
          {/* Reading Goals */}
          <div className="planner-section fade-in">
            <div className="section-title">
              <h2><i className="fas fa-bullseye"></i> Reading Goals</h2>
              <button className="btn" style={{ marginLeft: "auto" }}>
                <i className="fas fa-plus"></i> New Goal
              </button>
            </div>
            <div className="goals-container">
              <div className="goal-card">
                <div className="goal-header">
                  <div className="goal-title">Daily Reading Habit</div>
                  <div className="goal-badge">Daily</div>
                </div>
                <div className="progress-container">
                  <div className="progress-info">
                    <span>Progress: 85%</span>
                    <span>17/20 days</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div className="goal-meta">
                  <span><i className="fas fa-book me-1"></i> 30 min/day</span>
                  <span><i className="fas fa-calendar me-1"></i> Ends: Jul 23</span>
                </div>
              </div>
              <div className="goal-card">
                <div className="goal-header">
                  <div className="goal-title">Complete CS Textbook</div>
                  <div className="goal-badge">Book</div>
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
                  <span><i className="fas fa-book me-1"></i> Chapter 5/7</span>
                  <span><i className="fas fa-fire me-1"></i> 5 day streak</span>
                </div>
              </div>
              <div className="goal-card">
                <div className="goal-header">
                  <div className="goal-title">Monthly Book Target</div>
                  <div className="goal-badge">Monthly</div>
                </div>
                <div className="progress-container">
                  <div className="progress-info">
                    <span>Progress: 60%</span>
                    <span>3/5 books</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div className="goal-meta">
                  <span><i className="fas fa-book me-1"></i> 2 books left</span>
                  <span><i className="fas fa-calendar me-1"></i> Ends: Jul 31</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // Update progress handler
  async function updateProgress(planId, current_page) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/readingplanner/${planId}/progress`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ current_page }),
      });
      if (res.ok) {
        setPlans((prev) => prev.map((p) => (p.id === planId ? { ...p, current_page } : p)));
      }
    } catch {}
  }
}
