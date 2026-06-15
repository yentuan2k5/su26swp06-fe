import { useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiActivity,
  FiBarChart2,
  FiBell,
  FiBookOpen,
  FiBookmark,
  FiDatabase,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiSearch,
  FiSettings,
  FiTrendingUp,
  
} from "react-icons/fi";

import logo from "../assets/images/logo-login.png";
import "../styles/DashboardPage.css";

const stats = [
  {
    title: "Total Papers",
    value: "128.4K",
    desc: "+12.8% this month",
    icon: FiFileText,
  },
  {
    title: "Active Journals",
    value: "4,832",
    desc: "+7.2% tracked sources",
    icon: FiBookOpen,
  },
  {
    title: "Saved Library",
    value: "1,248",
    desc: "+18.5% bookmarks",
    icon: FiBookmark,
  },
  {
    title: "Trend Signals",
    value: "326",
    desc: "+24.1% hot topics",
    icon: FiActivity,
  },
];

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: FiGrid },
  { path: "/papers", label: "Papers", icon: FiFileText },
  { path: "/trends", label: "Trends", icon: FiTrendingUp },
  { path: "/library", label: "Library", icon: FiBookmark },
  { path: "/reports", label: "Reports", icon: FiBarChart2 },
  { path: "/notifications", label: "Notifications", icon: FiBell },
];

const chartData = [
  { year: "2020", value: 42 },
  { year: "2021", value: 55 },
  { year: "2022", value: 64 },
  { year: "2023", value: 78 },
  { year: "2024", value: 90 },
  { year: "2025", value: 84 },
  { year: "2026", value: 96 },
];

const topics = [
  { name: "Artificial Intelligence", papers: "24.8K papers", growth: "+32%", percent: 92 },
  { name: "Machine Learning", papers: "18.2K papers", growth: "+28%", percent: 84 },
  { name: "Cybersecurity", papers: "12.9K papers", growth: "+21%", percent: 72 },
  { name: "Medical Imaging", papers: "9.7K papers", growth: "+16%", percent: 64 },
];

const recentPapers = [
  {
    title: "Large Language Models for Scientific Knowledge Discovery",
    source: "Nature AI Research Group",
    tag: "Hot",
  },
  {
    title: "Explainable Deep Learning in Healthcare Analytics",
    source: "Journal of Medical Systems",
    tag: "Review",
  },
  {
    title: "Graph Neural Networks for Citation Prediction",
    source: "ACM Computing Surveys",
    tag: "New",
  },
];

function getUserFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
}

function DashboardPage() {
  const navigate = useNavigate();

  const user = useMemo(() => getUserFromStorage(), []);
  const displayName = user?.username || user?.name || user?.email || "Researcher";

  const avatarText = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <main className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <img src={logo} alt="ScienceTrend Hub" />
          <div>
            <h2>ScienceTrend</h2>
            <p>Research Hub</p>
          </div>
        </div>

        <nav className="dashboard-menu">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "menu-item active" : "menu-item"
                }
              >
                <Icon />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="ai-box">
          <FiDatabase />
          <h3>Smart Research AI</h3>
          <p>Analyze papers, detect hot topics and generate reports faster.</p>
          <button type="button">Explore AI</button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span className="small-title">Research overview</span>
            <h1>Welcome back, {displayName}</h1>
            <p>
              Track scientific papers, journals and research trends in one dashboard.
            </p>
          </div>

          <div className="header-actions">
            <label className="search-box">
              <FiSearch />
              <input placeholder="Search papers, journals, topics..." />
            </label>

            <button className="icon-button" type="button">
              <FiBell />
              <span></span>
            </button>

            <div className="profile-card">
              <div className="avatar">{avatarText || "R"}</div>
              <div>
                <strong>{displayName}</strong>
                <small>{user?.role || "Research member"}</small>
              </div>
            </div>
          </div>
        </header>

        <section className="hero-section">
          <div className="hero-card">
            <div>
              <span className="hero-badge">AI Powered Analytics</span>
              <h2>Discover research trends before they become popular.</h2>
              <p>
                Monitor publication growth, trending fields, saved papers and
                weekly reports with a cleaner and more modern dashboard.
              </p>

              <div className="hero-buttons">
                <NavLink to="/trends" className="primary-btn">
                  View Trends
                </NavLink>
                <NavLink to="/papers" className="secondary-btn">
                  Browse Papers
                </NavLink>
              </div>
            </div>

            <div className="hero-visual">
              <div className="score-circle">
                <strong>92%</strong>
                <span>Trend Match</span>
              </div>

              <div className="floating-card top">
                <FiTrendingUp />
                <span>AI +32%</span>
              </div>

              <div className="floating-card bottom">
                <FiBookOpen />
                <span>4.8K Journals</span>
              </div>
            </div>
          </div>

          <div className="deadline-card">
            <div className="card-title">
              <div>
                <span className="small-title">Upcoming</span>
                <h3>Weekly Report</h3>
              </div>
              <FiSettings />
            </div>

            <strong>Friday, 09:00 AM</strong>
            <p>Your science trend report is ready to export.</p>
            <button type="button">Generate Report</button>
          </div>
        </section>

        <section className="stats-grid">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <article className="stat-card" key={item.title}>
                <div className="stat-icon">
                  <Icon />
                </div>

                <div>
                  <p>{item.title}</p>
                  <h3>{item.value}</h3>
                  <span>{item.desc}</span>
                </div>
              </article>
            );
          })}
        </section>

        <section className="content-grid">
          <article className="panel chart-panel">
            <div className="panel-header">
              <div>
                <span className="small-title">Analytics</span>
                <h3>Publication Growth</h3>
              </div>

              <button type="button">2020 - 2026</button>
            </div>

            <div className="chart">
              {chartData.map((item) => (
                <div className="chart-item" key={item.year}>
                  <div className="bar-wrap">
                    <span style={{ height: `${item.value}%` }}></span>
                  </div>
                  <small>{item.year}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-header">
              <div>
                <span className="small-title">Hot Topics</span>
                <h3>Trending Fields</h3>
              </div>

              <NavLink to="/trends">See all</NavLink>
            </div>

            <div className="topic-list">
              {topics.map((topic, index) => (
                <div className="topic-row" key={topic.name}>
                  <span className="rank">0{index + 1}</span>

                  <div className="topic-info">
                    <strong>{topic.name}</strong>
                    <small>{topic.papers}</small>

                    <div className="progress">
                      <span style={{ width: `${topic.percent}%` }}></span>
                    </div>
                  </div>

                  <em>{topic.growth}</em>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="bottom-grid">
          <article className="panel">
            <div className="panel-header">
              <div>
                <span className="small-title">Latest Papers</span>
                <h3>Recently Indexed</h3>
              </div>

              <NavLink to="/papers">Open papers</NavLink>
            </div>

            <div className="paper-list">
              {recentPapers.map((paper) => (
                <div className="paper-card" key={paper.title}>
                  <div>
                    <strong>{paper.title}</strong>
                    <p>{paper.source}</p>
                  </div>

                  <span>{paper.tag}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel quick-panel">
            <div className="panel-header">
              <div>
                <span className="small-title">Quick Actions</span>
                <h3>Workspace Tools</h3>
              </div>
            </div>

            <div className="quick-actions">
              <NavLink to="/library">
                <FiBookmark /> Save Paper
              </NavLink>

              <NavLink to="/reports">
                <FiBarChart2 /> Create Report
              </NavLink>

              <NavLink to="/trends">
                <FiTrendingUp /> Check Trends
              </NavLink>

              <button type="button" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}

export default DashboardPage;