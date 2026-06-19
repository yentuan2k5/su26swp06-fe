import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBarChart2,
  FiBookOpen,
  FiBookmark,
  FiFileText,
  FiRefreshCw,
  FiTrendingUp,
} from "react-icons/fi";
import ChartBox from "../components/ChartBox";
import JournalCard from "../components/JournalCard";
import PaperCard from "../components/PaperCard";
import StatCard from "../components/StatCard";
import TopicCard from "../components/TopicCard";
import MainLayout from "../components/layout/MainLayout";
import { ROUTE_PATHS } from "../routes/routePaths";
import "../styles/DashboardPage.css";

const summaryCards = [
  {
    title: "Indexed papers",
    value: "128,420",
    change: "12.8%",
    description: "Compared with last month",
    icon: FiFileText,
  },
  {
    title: "Tracked journals",
    value: "4,832",
    change: "7.2%",
    description: "Across 36 research fields",
    icon: FiBookOpen,
  },
  {
    title: "Saved items",
    value: "1,248",
    change: "18.5%",
    description: "Papers and journal records",
    icon: FiBookmark,
  },
  {
    title: "Active topics",
    value: "326",
    change: "24.1%",
    description: "Topics with recent growth",
    icon: FiTrendingUp,
  },
];

const publicationData = [
  { label: "2020", value: 42 },
  { label: "2021", value: 55 },
  { label: "2022", value: 64 },
  { label: "2023", value: 78 },
  { label: "2024", value: 90 },
  { label: "2025", value: 84 },
  { label: "2026", value: 96 },
];

const trendingTopics = [
  {
    name: "Artificial intelligence",
    paperCount: "24,820 papers",
    growth: "+32%",
    score: 92,
  },
  {
    name: "Machine learning",
    paperCount: "18,240 papers",
    growth: "+28%",
    score: 84,
  },
  {
    name: "Cybersecurity",
    paperCount: "12,910 papers",
    growth: "+21%",
    score: 72,
  },
  {
    name: "Medical imaging",
    paperCount: "9,740 papers",
    growth: "+16%",
    score: 64,
  },
];

const initialPapers = [
  {
    id: 1,
    title: "Large Language Models for Scientific Knowledge Discovery",
    source: "Nature Machine Intelligence",
    authors: "M. Chen, A. Kumar, S. Lee",
    year: "2026",
    tag: "Research article",
    saved: true,
  },
  {
    id: 2,
    title: "Explainable Deep Learning in Healthcare Analytics",
    source: "Journal of Medical Systems",
    authors: "R. Patel, L. Nguyen",
    year: "2026",
    tag: "Review",
    saved: false,
  },
  {
    id: 3,
    title: "Graph Neural Networks for Citation Prediction",
    source: "ACM Computing Surveys",
    authors: "D. Park, J. Wilson",
    year: "2025",
    tag: "Survey",
    saved: false,
  },
];

const journals = [
  {
    name: "Nature Machine Intelligence",
    publisher: "Springer Nature",
    subject: "Artificial intelligence",
    quartile: "Q1",
    impactFactor: "23.8",
    openAccess: false,
  },
  {
    name: "PLOS ONE",
    publisher: "Public Library of Science",
    subject: "Multidisciplinary science",
    quartile: "Q1",
    impactFactor: "3.7",
    openAccess: true,
  },
  {
    name: "IEEE Access",
    publisher: "IEEE",
    subject: "Engineering and technology",
    quartile: "Q1",
    impactFactor: "3.4",
    openAccess: true,
  },
];

function readUserName() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.username || user.name || user.fullName || "Researcher";
  } catch {
    return "Researcher";
  }
}

function DashboardPage() {
  const displayName = useMemo(() => readUserName(), []);
  const [papers, setPapers] = useState(initialPapers);
  const [lastUpdated, setLastUpdated] = useState("Today, 09:30");
  const [refreshing, setRefreshing] = useState(false);

  function toggleSavedPaper(paperId) {
    setPapers((current) =>
      current.map((paper) =>
        paper.id === paperId ? { ...paper, saved: !paper.saved } : paper,
      ),
    );
  }

  function refreshDashboard() {
    setRefreshing(true);

    window.setTimeout(() => {
      setLastUpdated(
        new Intl.DateTimeFormat("en", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
      setRefreshing(false);
    }, 500);
  }

  return (
    <MainLayout
      title="Dashboard"
      subtitle="Overview of publications, journals and research activity"
    >
      <section className="db-page">
        <div className="db-welcome-row">
          <div>
            <span className="db-eyebrow">Research workspace</span>
            <h2>Welcome back, {displayName}</h2>
            <p>
              Review the latest publication activity and continue working with
              your saved research.
            </p>
          </div>

          <button
            type="button"
            className="db-refresh-btn"
            onClick={refreshDashboard}
            disabled={refreshing}
          >
            <FiRefreshCw className={refreshing ? "is-spinning" : ""} />
            {refreshing ? "Refreshing" : `Updated ${lastUpdated}`}
          </button>
        </div>

        <section className="db-stats-grid" aria-label="Research summary">
          {summaryCards.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </section>

        <section className="db-primary-grid">
          <ChartBox
            title="Publication growth"
            subtitle="Indexed records"
            rangeLabel="2020–2026"
            data={publicationData}
            valueSuffix="K"
          />

          <article className="db-panel">
            <div className="db-panel-header">
              <div>
                <span className="db-eyebrow">Research activity</span>
                <h2>Trending fields</h2>
              </div>
              <Link to={ROUTE_PATHS.TRENDS}>View all</Link>
            </div>

            <div className="db-topic-list">
              {trendingTopics.map((topic, index) => (
                <TopicCard key={topic.name} rank={index + 1} {...topic} />
              ))}
            </div>
          </article>
        </section>

        <section className="db-secondary-grid">
          <article className="db-panel">
            <div className="db-panel-header">
              <div>
                <span className="db-eyebrow">Recently indexed</span>
                <h2>Latest papers</h2>
              </div>
              <Link to={ROUTE_PATHS.PAPERS}>Browse papers</Link>
            </div>

            <div className="db-paper-list">
              {papers.map((paper) => (
                <PaperCard
                  key={paper.id}
                  {...paper}
                  onBookmark={() => toggleSavedPaper(paper.id)}
                />
              ))}
            </div>
          </article>

          <article className="db-panel">
            <div className="db-panel-header">
              <div>
                <span className="db-eyebrow">Source monitoring</span>
                <h2>Tracked journals</h2>
              </div>
              <Link to={ROUTE_PATHS.LIBRARY}>Open library</Link>
            </div>

            <div className="db-journal-list">
              {journals.map((journal) => (
                <JournalCard key={journal.name} {...journal} />
              ))}
            </div>
          </article>
        </section>

        <section className="db-quick-actions" aria-label="Quick actions">
          <div>
            <span className="db-eyebrow">Quick access</span>
            <h2>Continue your work</h2>
          </div>

          <div className="db-action-links">
            <Link to={ROUTE_PATHS.PAPERS}>
              <FiFileText /> Find papers
            </Link>
            <Link to={ROUTE_PATHS.TRENDS}>
              <FiTrendingUp /> Review trends
            </Link>
            <Link to={ROUTE_PATHS.REPORTS}>
              <FiBarChart2 /> Create report
            </Link>
          </div>
        </section>
      </section>
    </MainLayout>
  );
}

export default DashboardPage;
