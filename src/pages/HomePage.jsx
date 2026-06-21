import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiBookmark,
  FiCheckCircle,
  FiDatabase,
  FiTrendingUp,
} from "react-icons/fi";
import logo from "../assets/images/logo-login.png";
import heroImage from "../assets/hero.png";
import { useAuth } from "../context/useAuth";
import { ROUTE_PATHS } from "../routes/routePaths";
import "../styles/HomePage.css";

const featureItems = [
  {
    icon: FiDatabase,
    title: "Publication workspace",
    description: "Collect and review scientific papers from one consistent research workspace.",
  },
  {
    icon: FiTrendingUp,
    title: "Research trend tracking",
    description: "Follow topic momentum and identify which fields are growing across your indexed data.",
  },
  {
    icon: FiBookmark,
    title: "Personal library",
    description: "Save important papers and tracked journals so users can return to them faster.",
  },
];

const workflowItems = [
  "Search papers and journals",
  "Save useful records to your library",
  "Review trend charts and activity reports",
];

function HomePage() {
  const { isLoggedIn, defaultPath } = useAuth();
  const primaryPath = isLoggedIn ? defaultPath : ROUTE_PATHS.LOGIN;
  const primaryLabel = isLoggedIn ? "Open workspace" : "Login to workspace";

  return (
    <main className="home-page">
      <header className="home-navbar">
        <Link to={ROUTE_PATHS.HOME} className="home-brand" aria-label="ScienceTrend Hub home">
          <span className="home-brand-logo">
            <img src={logo} alt="ScienceTrend Hub logo" />
          </span>
          <span>
            <strong>ScienceTrend Hub</strong>
            <small>Scientific Journal Publication Tracking</small>
          </span>
        </Link>

        <nav className="home-nav-links" aria-label="Home navigation">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <Link to={primaryPath}>{isLoggedIn ? "Dashboard" : "Login"}</Link>
        </nav>
      </header>

      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="home-eyebrow">Research intelligence platform</span>
          <h1>Track papers, journals and scientific trends with a cleaner workspace.</h1>
          <p>
            ScienceTrend Hub helps students, lecturers and researchers organize publication data,
            monitor research topics and continue work from a single dashboard.
          </p>

          <div className="home-hero-actions">
            <Link to={primaryPath} className="home-primary-link">
              {primaryLabel} <FiArrowRight aria-hidden="true" />
            </Link>
            {!isLoggedIn && (
              <Link to={ROUTE_PATHS.REGISTER} className="home-secondary-link">
                Create account
              </Link>
            )}
          </div>
        </div>

        <div className="home-hero-visual" aria-label="ScienceTrend Hub dashboard preview">
          <div className="home-visual-card home-visual-main">
            <div className="home-visual-header">
              <div>
                <span>Publication growth</span>
                <strong>Research activity</strong>
              </div>
              <FiBarChart2 aria-hidden="true" />
            </div>
            <div className="home-mini-chart" aria-hidden="true">
              <span style={{ height: "42%" }} />
              <span style={{ height: "56%" }} />
              <span style={{ height: "48%" }} />
              <span style={{ height: "72%" }} />
              <span style={{ height: "64%" }} />
              <span style={{ height: "86%" }} />
            </div>
          </div>

          <div className="home-visual-card home-visual-topic">
            <FiTrendingUp aria-hidden="true" />
            <div>
              <span>Trending topics</span>
              <strong>Backend driven chart data</strong>
            </div>
          </div>

          <img className="home-hero-image" src={heroImage} alt="Research illustration" />
        </div>
      </section>

      <section className="home-section" id="features">
        <div className="home-section-heading">
          <span className="home-eyebrow">Core modules</span>
          <h2>Built around the real screens in your project</h2>
          <p>
            The public Home page introduces the system. After login, normal users enter the
            workspace; Admin users get access to the Admin panel only when the backend role allows it.
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
          <span className="home-eyebrow">How it works</span>
          <h2>Simple flow for students and researchers</h2>
          <p>
            The system should not decide role by button or by the page a user clicks. It reads the role
            returned after login, stores it safely, then shows the correct menu and route.
          </p>
        </div>

        <div className="home-workflow-list">
          {workflowItems.map((item) => (
            <div className="home-workflow-item" key={item}>
              <FiCheckCircle aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <div>
          <strong>ScienceTrend Hub</strong>
          <span>Scientific Journal Publication Tracking</span>
        </div>
        <Link to={primaryPath}>
          {primaryLabel} <FiBookOpen aria-hidden="true" />
        </Link>
      </footer>
    </main>
  );
}

export default HomePage;
