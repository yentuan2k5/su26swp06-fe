import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiRefreshCw, FiFileText, FiBookOpen, FiKey, FiDatabase, FiArrowUpRight } from "react-icons/fi";
import ChartBox from "../components/ChartBox";
import StatCard from "../components/StatCard";
import PaperCard from "../components/PaperCard";
import MainLayout from "../components/layout/MainLayout";
import { useAuth } from "../context/useAuth";
import { getDashboardOverview } from "../services/dashboardService";
import { normalizeDashboard, normalizePaper, formatNumber } from "../utils/apiData";
import { formatRoleForDisplay } from "../utils/authStorage";
import "../styles/DashboardPage.css";

function DashboardPage() {
  const { user, displayRole } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadDashboard = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setSpinning(true);
      else setLoading(true);
      setErrorMessage("");

      // GET /api/dashboard/summary — returns DashboardSummaryResponse
      const response = await getDashboardOverview();
      setData(normalizeDashboard(response));
    } catch (error) {
      console.error("Cannot load dashboard", error);
      setErrorMessage(error.message || "Cannot load dashboard data from backend.");
    } finally {
      setLoading(false);
      setSpinning(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const displayName = user.username || user.email || "Researcher";

  // Stat cards từ DashboardSummaryResponse
  const statCards = useMemo(() => {
    if (!data) return [];
    return [
      {
        title: "Total Papers",
        value: formatNumber(data.totalPapers),
        icon: FiFileText,
        trend: "positive",
        description: `${formatNumber(data.openAlexPapers)} from OpenAlex`,
      },
      {
        title: "Total Journals",
        value: formatNumber(data.totalJournals),
        icon: FiBookOpen,
        trend: "positive",
      },
      {
        title: "Total Keywords",
        value: formatNumber(data.totalKeywords),
        icon: FiKey,
        trend: "positive",
      },
      {
        title: "Sync Status",
        value: `${formatNumber(data.successfulSyncs)} / ${formatNumber(data.successfulSyncs + data.failedSyncs)}`,
        icon: FiDatabase,
        trend: data.failedSyncs > 0 ? "negative" : "positive",
        description: data.failedSyncs > 0 ? `${data.failedSyncs} failed` : "All syncs successful",
      },
    ];
  }, [data]);

  if (loading) {
    return (
      <MainLayout title="Dashboard" subtitle="ScienceTrend Hub workspace">
        <div className="cm-loading" style={{ minHeight: 320, fontSize: 14 }}>
          Loading dashboard...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Dashboard" subtitle="ScienceTrend Hub workspace">
      <div className="db-page">
        {/* Welcome */}
        <div className="db-welcome-row">
          <div>
            <span className="db-eyebrow">Overview</span>
            <h2>Welcome back, {displayName}</h2>
            <p>
              {formatRoleForDisplay(user.role)} — here's your research workspace summary.
            </p>
          </div>
          <button
            type="button"
            className="db-refresh-btn"
            onClick={() => loadDashboard(true)}
            disabled={spinning}
          >
            <FiRefreshCw className={spinning ? "is-spinning" : ""} />
            Refresh
          </button>
        </div>

        {errorMessage && (
          <div style={{ padding: "12px 16px", marginBottom: 14, borderRadius: 10, background: "var(--st-danger-soft)", color: "var(--st-danger)", fontSize: 13, border: "1px solid rgba(192,55,42,0.18)" }}>
            {errorMessage}
          </div>
        )}

        {/* Stat Cards */}
        <div className="db-stats-grid">
          {statCards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        {/* Charts */}
        {data && (
          <div className="db-primary-grid">
            <ChartBox
              title="Papers by Year"
              subtitle="Publication Activity"
              data={data.papersByYear}
              rangeLabel="All time"
              emptyMessage="No publication data available yet."
            />

            <ChartBox
              title="Top Keywords"
              subtitle="Trending Terms"
              data={data.topKeywords}
              emptyMessage="No keyword data available yet."
            />
          </div>
        )}

        {/* Top Cited Papers */}
        {data && data.topCitedPapers.length > 0 && (
          <div className="db-panel db-chart-panel" style={{ marginBottom: 14 }}>
            <div className="db-panel-header">
              <h2>Top Cited Papers</h2>
              <Link to="/papers" className="db-panel-header-link">
                View all <FiArrowUpRight />
              </Link>
            </div>
            <div className="db-paper-list">
              {data.topCitedPapers.slice(0, 5).map((paper) => (
                <PaperCard key={paper.id} {...paper} />
              ))}
            </div>
          </div>
        )}

        {/* Top Journals chart */}
        {data && data.topJournals.length > 0 && (
          <ChartBox
            title="Top Journals"
            subtitle="By Paper Count"
            data={data.topJournals}
            emptyMessage="No journal data available yet."
          />
        )}
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
