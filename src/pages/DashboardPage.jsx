import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiAlertTriangle,
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
import { useAuth } from "../context/useAuth";
import { ROUTE_PATHS } from "../routes/routePaths";
import { getDashboardOverview } from "../services/dashboardService";
import "../styles/DashboardPage.css";

const statConfig = [
  {
    key: "indexedPapers",
    title: "Indexed papers",
    icon: FiFileText,
    defaultDescription: "Total papers from backend",
  },
  {
    key: "trackedJournals",
    title: "Tracked journals",
    icon: FiBookOpen,
    defaultDescription: "Total journals from backend",
  },
  {
    key: "savedItems",
    title: "Saved items",
    icon: FiBookmark,
    defaultDescription: "Total saved records",
  },
  {
    key: "activeTopics",
    title: "Active topics",
    icon: FiTrendingUp,
    defaultDescription: "Total active research topics",
  },
];

const emptyDashboard = {
  updatedAt: null,
  stats: {},
  publicationGrowth: [],
  trendingTopics: [],
  latestPapers: [],
  trackedJournals: [],
};

function toNumber(value, fallback = 0) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(toNumber(value));
}

function formatTime(value) {
  if (!value) return "Not loaded yet";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatStatChange(value) {
  if (value === undefined || value === null || value === "") return "";

  const numberValue = Number(value);

  if (Number.isFinite(numberValue)) {
    return `${Math.abs(numberValue)}%`;
  }

  return String(value).replace(/^\+/, "");
}

function formatTopicGrowth(value) {
  if (value === undefined || value === null || value === "") return "";

  const numberValue = Number(value);

  if (Number.isFinite(numberValue)) {
    return `${numberValue >= 0 ? "+" : ""}${numberValue}%`;
  }

  const textValue = String(value);
  return textValue.startsWith("+") || textValue.startsWith("-")
    ? textValue
    : `+${textValue}`;
}

function getStatValue(stat) {
  if (stat === undefined || stat === null || stat === "") return 0;
  if (typeof stat !== "object") return stat;

  return stat.value ?? stat.count ?? stat.total ?? stat.amount ?? 0;
}

function getStatChange(stat) {
  if (!stat || typeof stat !== "object") return "";

  return stat.change ?? stat.growth ?? stat.percent ?? stat.percentage ?? "";
}

function getStatTrend(stat) {
  const change = Number(getStatChange(stat));

  if (!Number.isFinite(change)) return "positive";
  if (change < 0) return "negative";
  if (change === 0) return "neutral";

  return "positive";
}

function normalizeStats(stats = {}) {
  return statConfig.map((config) => {
    const stat = stats[config.key];
    const isObjectStat = stat && typeof stat === "object";

    return {
      title: isObjectStat && stat.title ? stat.title : config.title,
      value: formatNumber(getStatValue(stat)),
      change: formatStatChange(getStatChange(stat)),
      description:
        isObjectStat && stat.description ? stat.description : config.defaultDescription,
      icon: config.icon,
      trend: getStatTrend(stat),
    };
  });
}

function normalizePublicationGrowth(data = []) {
  if (!Array.isArray(data)) return [];

  return data.map((item, index) => ({
    label: String(item.label ?? item.year ?? item.month ?? index + 1),
    value: toNumber(item.value ?? item.count ?? item.total),
  }));
}

function normalizeTrendingTopics(data = []) {
  if (!Array.isArray(data)) return [];

  return data.map((topic, index) => ({
    id: topic.id ?? topic.topicId ?? topic.name ?? index,
    name: topic.name ?? topic.topicName ?? topic.title ?? "Untitled topic",
    paperCount: `${formatNumber(
      topic.paperCount ?? topic.papers ?? topic.count ?? topic.total ?? 0,
    )} papers`,
    growth: formatTopicGrowth(topic.growth ?? topic.change ?? 0),
    score: toNumber(topic.score ?? topic.percent ?? topic.percentage ?? 0),
  }));
}

function normalizePapers(data = []) {
  if (!Array.isArray(data)) return [];

  return data.map((paper, index) => ({
    id: paper.id ?? paper.paperId ?? index,
    title: paper.title ?? paper.name ?? "Untitled paper",
    source: paper.source ?? paper.journalName ?? paper.journal ?? "Unknown source",
    authors: Array.isArray(paper.authors)
      ? paper.authors.join(", ")
      : paper.authors ?? paper.authorNames ?? "",
    year: paper.year ?? paper.publishedYear ?? paper.publicationYear ?? "",
    tag: paper.tag ?? paper.type ?? paper.category ?? "Paper",
    href: paper.href ?? paper.url ?? paper.doiUrl ?? "",
    saved: Boolean(paper.saved ?? paper.bookmarked ?? false),
  }));
}

function normalizeJournals(data = []) {
  if (!Array.isArray(data)) return [];

  return data.map((journal, index) => ({
    id: journal.id ?? journal.journalId ?? journal.name ?? index,
    name: journal.name ?? journal.title ?? "Untitled journal",
    publisher: journal.publisher ?? journal.publisherName ?? "Unknown publisher",
    subject: journal.subject ?? journal.field ?? journal.category ?? "General",
    quartile: journal.quartile ?? journal.rank ?? "",
    impactFactor: journal.impactFactor ?? journal.impact_factor ?? "",
    openAccess: Boolean(journal.openAccess ?? journal.open_access ?? false),
  }));
}

function normalizeDashboardData(data) {
  const safeData = data || {};

  return {
    updatedAt: safeData.updatedAt ?? safeData.lastUpdated ?? new Date().toISOString(),
    stats: safeData.stats ?? {},
    publicationGrowth: normalizePublicationGrowth(
      safeData.publicationGrowth ?? safeData.growth ?? safeData.chartData ?? [],
    ),
    trendingTopics: normalizeTrendingTopics(
      safeData.trendingTopics ?? safeData.topics ?? safeData.trends ?? [],
    ),
    latestPapers: normalizePapers(
      safeData.latestPapers ?? safeData.recentPapers ?? safeData.papers ?? [],
    ),
    trackedJournals: normalizeJournals(
      safeData.trackedJournals ?? safeData.journals ?? safeData.sources ?? [],
    ),
  };
}

function DashboardPage() {
  const { user, displayRole } = useAuth();
  const displayName = useMemo(
    () => user.username || user.name || user.fullName || user.email || "Researcher",
    [user],
  );
  const [dashboardData, setDashboardData] = useState(emptyDashboard);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const summaryCards = useMemo(
    () => normalizeStats(dashboardData.stats),
    [dashboardData.stats],
  );

  const loadDashboard = useCallback(async ({ silent = false } = {}) => {
    try {
      if (silent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setErrorMessage("");

      const data = await getDashboardOverview();
      setDashboardData(normalizeDashboardData(data));
    } catch (error) {
      setErrorMessage(error.message || "Cannot load dashboard data");
      setDashboardData(emptyDashboard);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  function toggleSavedPaper(paperId) {
    setDashboardData((current) => ({
      ...current,
      latestPapers: current.latestPapers.map((paper) =>
        paper.id === paperId ? { ...paper, saved: !paper.saved } : paper,
      ),
    }));
  }

  return (
    <MainLayout
      title="Dashboard"
      subtitle="Overview of publications, journals and research activity"
    >
      <section className="db-page">
        <div className="db-welcome-row">
          <div>
            <span className="db-eyebrow">Research workspace · {displayRole}</span>
            <h2>Welcome back, {displayName}</h2>
            <p>
              Review the latest publication activity and continue working with
              your saved research.
            </p>
          </div>

          <button
            type="button"
            className="db-refresh-btn"
            onClick={() => loadDashboard({ silent: true })}
            disabled={loading || refreshing}
          >
            <FiRefreshCw className={refreshing ? "is-spinning" : ""} />
            {refreshing ? "Refreshing" : `Updated ${formatTime(dashboardData.updatedAt)}`}
          </button>
        </div>

        {loading && (
          <article className="db-panel">
            <p>Loading dashboard data...</p>
          </article>
        )}

        {!loading && errorMessage && (
          <article className="db-panel">
            <div className="db-panel-header">
              <div>
                <span className="db-eyebrow">Backend connection</span>
                <h2>
                  <FiAlertTriangle /> Cannot load dashboard data
                </h2>
              </div>
            </div>
            <p>{errorMessage}</p>
            <p>
              Check DevTools Network tab and make sure the backend endpoint
              returns data for <strong>GET /api/dashboard/overview</strong>.
            </p>
          </article>
        )}

        {!loading && !errorMessage && (
          <>
            <section className="db-stats-grid" aria-label="Research summary">
              {summaryCards.map((item) => (
                <StatCard key={item.title} {...item} />
              ))}
            </section>

            <section className="db-primary-grid">
              <ChartBox
                title="Publication growth"
                subtitle="Indexed records"
                rangeLabel="Backend data"
                data={dashboardData.publicationGrowth}
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
                  {dashboardData.trendingTopics.length > 0 ? (
                    dashboardData.trendingTopics.map((topic, index) => (
                      <TopicCard
                        key={topic.id ?? topic.name}
                        rank={index + 1}
                        {...topic}
                      />
                    ))
                  ) : (
                    <p>No trending topic data from backend.</p>
                  )}
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
                  {dashboardData.latestPapers.length > 0 ? (
                    dashboardData.latestPapers.map((paper) => (
                      <PaperCard
                        key={paper.id}
                        {...paper}
                        onBookmark={() => toggleSavedPaper(paper.id)}
                      />
                    ))
                  ) : (
                    <p>No latest paper data from backend.</p>
                  )}
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
                  {dashboardData.trackedJournals.length > 0 ? (
                    dashboardData.trackedJournals.map((journal) => (
                      <JournalCard key={journal.id ?? journal.name} {...journal} />
                    ))
                  ) : (
                    <p>No tracked journal data from backend.</p>
                  )}
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
          </>
        )}
      </section>
    </MainLayout>
  );
}

export default DashboardPage;
