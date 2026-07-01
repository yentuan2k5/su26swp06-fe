import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiBookmark,
  FiCheckCircle,
  FiDatabase,
  FiGlobe,
  FiLayers,
  FiSearch,
  FiShield,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import logo from "../assets/images/logo-login.png";
import { useAuth } from "../context/useAuth";
import { ROUTE_PATHS } from "../routes/routePaths";
import "../styles/HomePage.css";

const featureItems = [
  {
    icon: FiSearch,
    title: "Search smarter",
    description:
      "Find papers, journals and keywords through a focused research interface instead of scattered tabs.",
  },
  {
    icon: FiTrendingUp,
    title: "Spot rising topics",
    description:
      "Track topic movement, publication activity and research signals before they become crowded.",
  },
  {
    icon: FiBookmark,
    title: "Build your library",
    description:
      "Bookmark useful records and return to saved papers when preparing reports or group discussions.",
  },
  {
    icon: FiBarChart2,
    title: "Read clear reports",
    description:
      "Turn dashboard metrics into short summaries that are easier for students and lecturers to present.",
  },
];

const stats = [
  { value: "12k+", label: "indexed records" },
  { value: "38", label: "active topics" },
  { value: "24/7", label: "workspace access" },
];

const workflowItems = [
  "Search research data by paper, journal or keyword",
  "Save valuable records into your personal library",
  "Review trends, dashboards and reports in one workspace",
];

function HomePage() {
  const { isLoggedIn, defaultPath } = useAuth();
  const primaryPath = isLoggedIn ? defaultPath : ROUTE_PATHS.LOGIN;
  const primaryLabel = isLoggedIn ? "Open workspace" : "Login to workspace";

  return (
    <main className="home-page">
      <div className="home-topbar">
        <div>
          <span>ScienceTrend Research Hub</span>
          <span>Publication intelligence for students and researchers</span>
        </div>
        <div>
          <span>Mon - Fri 8.00 - 18.00</span>
          <span>English</span>
        </div>
      </div>

      <header className="home-navbar">
        <Link to={ROUTE_PATHS.HOME} className="home-brand" aria-label="ScienceTrend Hub home">
          <span className="home-brand-logo">
            <img src={logo} alt="ScienceTrend Hub logo" />
          </span>
          <span>
            <strong>ScienceTrend</strong>
            <small>Research Hub</small>
          </span>
        </Link>

        <nav className="home-nav-links" aria-label="Home navigation">
          <a href="#features">Services</a>
          <a href="#insight">Insights</a>
          <a href="#workflow">Workflow</a>
          <Link to={ROUTE_PATHS.PAPERS}>Papers</Link>
        </nav>

        <div className="home-nav-actions">
          {!isLoggedIn && (
            <Link to={ROUTE_PATHS.REGISTER} className="home-ghost-link">
              Create account
            </Link>
          )}
          <Link to={primaryPath} className="home-login-link">
            {isLoggedIn ? "Dashboard" : "Login"}
          </Link>
        </div>
      </header>

      <section className="home-hero" id="insight">
        <div className="home-hero-bg" aria-hidden="true">
          <span className="home-orb home-orb-one" />
          <span className="home-orb home-orb-two" />
          <span className="home-grid-lines" />
        </div>

        <div className="home-hero-copy">
          <span className="home-eyebrow">
            <FiZap aria-hidden="true" /> Research intelligence platform
          </span>
          <h1>
            Track scientific papers with a workspace that feels serious, fast and alive.
          </h1>
          <p>
            Search publications, follow research topics, save important papers and turn your data
            into cleaner academic reports from one modern dashboard.
          </p>

          <div className="home-hero-actions">
            <Link to={primaryPath} className="home-primary-link">
              {primaryLabel} <FiArrowRight aria-hidden="true" />
            </Link>
            <a href="#features" className="home-secondary-link">
              Explore modules
            </a>
          </div>
        </div>

        <div className="home-hero-visual" aria-label="ScienceTrend Hub preview">
          <div className="home-preview-shell">
            <div className="home-preview-top">
              <span />
              <span />
              <span />
              <strong>Live Research Board</strong>
            </div>

            <div className="home-preview-search">
              <FiSearch aria-hidden="true" />
              <span>Search AI ethics, journal ranking, open science...</span>
            </div>

            <div className="home-preview-grid">
              <article className="home-preview-card home-preview-card-large">
                <div>
                  <small>Publication growth</small>
                  <strong>+28.4%</strong>
                </div>
                <div className="home-bars" aria-hidden="true">
                  <span style={{ height: "35%" }} />
                  <span style={{ height: "48%" }} />
                  <span style={{ height: "44%" }} />
                  <span style={{ height: "66%" }} />
                  <span style={{ height: "75%" }} />
                  <span style={{ height: "92%" }} />
                </div>
              </article>

              <article className="home-preview-card">
                <FiGlobe aria-hidden="true" />
                <small>Top journal</small>
                <strong>Nature Research</strong>
              </article>

              <article className="home-preview-card">
                <FiLayers aria-hidden="true" />
                <small>Hot topic</small>
                <strong>Generative AI</strong>
              </article>
            </div>

            <div className="home-topic-ticker" aria-label="Trending research topics">
              <span>Machine Learning</span>
              <span>Health Tech</span>
              <span>Climate Data</span>
              <span>Open Science</span>
            </div>
          </div>
        </div>

        <div className="home-stat-strip" aria-label="ScienceTrend quick statistics">
          {stats.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section" id="features">
        <div className="home-section-heading">
          <span className="home-eyebrow">
            <FiShield aria-hidden="true" /> Core services
          </span>
          <h2>Not just a static landing page. It introduces the actual workspace.</h2>
          <p>
            The page now uses the project identity, research-oriented sections and interactive cards
            instead of the old Vite-style illustration.
          </p>
        </div>

        <div className="home-feature-grid">
          {featureItems.map((item) => {
            const Icon = item.icon;
            return (
              <article className="home-feature-card" key={item.title}>
                <span>
                  <Icon aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="home-section home-workflow" id="workflow">
        <div className="home-workflow-copy">
          <span className="home-eyebrow">
            <FiDatabase aria-hidden="true" /> Workspace flow
          </span>
          <h2>From search to insight in three clean steps.</h2>
          <p>
            Users enter through Home, login with their role, then move into dashboard, papers,
            trends, library and reports without the page feeling like a default template.
          </p>
        </div>

        <div className="home-workflow-list">
          {workflowItems.map((item, index) => (
            <div className="home-workflow-item" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <FiCheckCircle aria-hidden="true" />
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <div>
          <strong>ScienceTrend Hub</strong>
          <span>Scientific Journal Publication Tracking System</span>
        </div>
        <Link to={primaryPath}>
          {primaryLabel} <FiBookOpen aria-hidden="true" />
        </Link>
      </footer>
    </main>
  );
}

export default HomePage;
