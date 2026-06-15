import { NavLink } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/routePaths";
import "./layout.css";

function Sidebar() {
  return (
    <aside className="st-sidebar">
      <div className="st-logo">
        <div className="st-logo-icon">S</div>

        <div>
          <h2>ScienceTrend</h2>
          <p>Research Hub</p>
        </div>
      </div>

      <nav className="st-menu">
        <NavLink to={ROUTE_PATHS.DASHBOARD} className="st-menu-link">
          <span>📊</span>
          Dashboard
        </NavLink>

        <NavLink to={ROUTE_PATHS.PAPERS} className="st-menu-link">
          <span>📄</span>
          Papers
        </NavLink>

        <NavLink to={ROUTE_PATHS.TRENDS} className="st-menu-link">
          <span>📈</span>
          Trends
        </NavLink>

        <NavLink to={ROUTE_PATHS.LIBRARY} className="st-menu-link">
          <span>📚</span>
          Library
        </NavLink>

        <NavLink to={ROUTE_PATHS.NOTIFICATIONS} className="st-menu-link">
          <span>🔔</span>
          Notifications
        </NavLink>

        <NavLink to={ROUTE_PATHS.REPORTS} className="st-menu-link">
          <span>🚩</span>
          Reports
        </NavLink>

        <NavLink to={ROUTE_PATHS.ADMIN} className="st-menu-link">
          <span>⚙️</span>
          Admin
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;