import React from "react";
import "../css/reading.css";
// NOTE: Make sure to import the CSS from reading (all in one).html in your main index.html or as a separate CSS file for pixel-perfect styling.

export default function ReadingPlannerTemplate() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar" id="sidebar">
        <div className="logo">
          <i className="fas fa-graduation-cap"></i>
          <span className="ske">Student</span><span className="mart">Hub</span>
        </div>
        <nav className="dashboard-nav">
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="active">
                <i className="fas fa-book-open"></i>
                <span>Reading Planner</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-wallet"></i>
                <span>Finance Tracker</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-chart-line"></i>
                <span>Progress Reports</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
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
            <form className="add-book-form">
              <div className="form-group">
                <label htmlFor="bookTitle">Book Title</label>
                <input type="text" id="bookTitle" placeholder="Enter book title" />
              </div>
              <div className="form-group">
                <label htmlFor="bookAuthor">Author</label>
                <input type="text" id="bookAuthor" placeholder="Enter author name" />
              </div>
              <div className="form-group">
                <label htmlFor="bookSubject">Subject/Category</label>
                <select id="bookSubject">
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
                <input type="number" id="totalPages" placeholder="Enter total pages" />
              </div>
              <div className="form-group">
                <label htmlFor="currentPage">Current Page</label>
                <input type="number" id="currentPage" placeholder="Enter current page" />
              </div>
              <div className="form-group">
                <label htmlFor="targetDate">Target Completion Date</label>
                <input type="text" id="targetDate" className="date-picker" placeholder="Select target date" />
              </div>
              <div className="form-group">
                <label htmlFor="dailyTarget">Daily Target (pages)</label>
                <input type="number" id="dailyTarget" placeholder="Enter daily target" />
              </div>
              <div className="form-group">
                <label htmlFor="bookNotes">Notes</label>
                <textarea id="bookNotes" rows="2" placeholder="Add notes about this book"></textarea>
              </div>
              <button type="button" className="btn btn-full">
                <i className="fas fa-book-medical"></i> Add Book to Reading List
              </button>
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
            <ul className="book-list">
              <li className="book-item fade-in">
                <div className="book-cover">
                  <i className="fas fa-microchip"></i>
                </div>
                <div className="book-details">
                  <h3 className="book-title">Computer Science Principles</h3>
                  <div className="book-author">David Reed</div>
                  <div className="book-meta">
                    <span><i className="fas fa-layer-group"></i> Pages: 480</span>
                    <span><i className="fas fa-tag"></i> Computer Science</span>
                    <span><i className="fas fa-calendar"></i> Due: Aug 15, 2023</span>
                  </div>
                  <div className="progress-container">
                    <div className="progress-info">
                      <span>Progress: 78%</span>
                      <span>Page 375/480</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  <div className="book-actions">
                    <button className="action-btn"><i className="fas fa-edit"></i> Update</button>
                    <button className="action-btn"><i className="fas fa-calendar"></i> Schedule</button>
                    <button className="action-btn"><i className="fas fa-tasks"></i> Goals</button>
                    <button className="action-btn"><i className="fas fa-trash-alt"></i> Remove</button>
                  </div>
                </div>
              </li>
              <li className="book-item fade-in">
                <div className="book-cover">
                  <i className="fas fa-calculator"></i>
                </div>
                <div className="book-details">
                  <h3 className="book-title">Advanced Calculus</h3>
                  <div className="book-author">Michael Spivak</div>
                  <div className="book-meta">
                    <span><i className="fas fa-layer-group"></i> Pages: 670</span>
                    <span><i className="fas fa-tag"></i> Mathematics</span>
                    <span><i className="fas fa-calendar"></i> Due: Sep 10, 2023</span>
                  </div>
                  <div className="progress-container">
                    <div className="progress-info">
                      <span>Progress: 35%</span>
                      <span>Page 234/670</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: "35%" }}></div>
                    </div>
                  </div>
                  <div className="book-actions">
                    <button className="action-btn"><i className="fas fa-edit"></i> Update</button>
                    <button className="action-btn"><i className="fas fa-calendar"></i> Schedule</button>
                    <button className="action-btn"><i className="fas fa-tasks"></i> Goals</button>
                    <button className="action-btn"><i className="fas fa-trash-alt"></i> Remove</button>
                  </div>
                </div>
              </li>
              <li className="book-item fade-in">
                <div className="book-cover">
                  <i className="fas fa-atom"></i>
                </div>
                <div className="book-details">
                  <h3 className="book-title">Modern Physics</h3>
                  <div className="book-author">Kenneth Krane</div>
                  <div className="book-meta">
                    <span><i className="fas fa-layer-group"></i> Pages: 720</span>
                    <span><i className="fas fa-tag"></i> Physics</span>
                    <span><i className="fas fa-calendar"></i> Due: Dec 5, 2023</span>
                  </div>
                  <div className="progress-container">
                    <div className="progress-info">
                      <span>Progress: 15%</span>
                      <span>Page 108/720</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  <div className="book-actions">
                    <button className="action-btn"><i className="fas fa-edit"></i> Update</button>
                    <button className="action-btn"><i className="fas fa-calendar"></i> Schedule</button>
                    <button className="action-btn"><i className="fas fa-tasks"></i> Goals</button>
                    <button className="action-btn"><i className="fas fa-trash-alt"></i> Remove</button>
                  </div>
                </div>
              </li>
            </ul>
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button className="btn btn-outline">
                <i className="fas fa-plus"></i> Load More Books
              </button>
            </div>
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
}
