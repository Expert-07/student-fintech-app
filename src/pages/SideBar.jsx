import { NavLink } from "react-router-dom";
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
              <NavLink to="/dashboard" activeClassName="active">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reading-planner" activeClassName="active">
                <i className="fas fa-book-open"></i>
                <span>Reading Planner</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/finance" activeClassName="active">
                <i className="fas fa-wallet"></i>
                <span>Finance Tracker</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/campus-map" activeClassName="active">
                <i className="fas fa-map-marker-alt"></i>
                <span>Campus Map</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="#" activeClassName="active">
                <i className="fas fa-chart-line"></i>
                <span>Progress Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" activeClassName="active">
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" activeClassName="active">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout" activeClassName="active">
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    );
}