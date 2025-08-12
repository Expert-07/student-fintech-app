import { Link } from "react-router-dom"
import "../css/Dashboard.css";

export default function SideBar() {
    return (
      <aside className="sidebar" id="sidebar">

        <div className="logo">
          <i className="fas fa-graduation-cap"></i>
          <span className="text-blue dark:text-white">Student</span>
          <span className="mart">Assist</span>
        </div>
        <nav className="dashboard-nav">
          <ul>
            <li>
              <Link to="/dashboard" className="active">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>

              </Link>
            </li>
            <li>
              <Link to="/reading-planner">
                <i className="fas fa-book-open"></i>
                <span>Reading Planner</span>
              </Link>
            </li>
            <li>
              <Link to="/finance">
                <i className="fas fa-wallet"></i>
                <span>Finance Tracker</span>
              </Link>
            </li>
            <li>
              <Link to="/campus-map">
                <i className="fas fa-map-marker-alt"></i>
                <span>Campus Map</span>
              </Link>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-chart-line"></i>
                <span>Progress Reports</span>
              </a>
            </li>
            <li>
              <Link to="/profile">
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <a href="/logout">
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

    
    );
}