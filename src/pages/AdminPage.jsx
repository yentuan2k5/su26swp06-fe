import { useCallback, useEffect, useMemo, useState } from "react";
import { FiBookOpen, FiFileText, FiShield, FiUsers } from "react-icons/fi";
import ChartBox from "../components/ChartBox";
import StatCard from "../components/StatCard";
import MainLayout from "../components/layout/MainLayout";
import { useAuth } from "../context/useAuth";
import { getDashboardOverview } from "../services/dashboardService";
import { getCurrentUser } from "../services/userService";
import { formatNumber, normalizeChartPoint, toArray, toNumber, unwrapResponse } from "../utils/apiData";
import { formatRoleForDisplay } from "../utils/authStorage";
import "../styles/WorkspacePages.css";

function getStatValue(stats, key) {
  const stat = stats?.[key];

  if (stat && typeof stat === "object") {
    return stat.value ?? stat.count ?? stat.total ?? stat.amount ?? 0;
  }

  return stat ?? 0;
}

function normalizeRoleDistribution(stats = {}) {
  const rawDistribution =
    stats.roleDistribution ??
    stats.usersByRole ??
    stats.accountRoles ??
    stats.roleStats ??
    [];

  if (Array.isArray(rawDistribution)) {
    return rawDistribution.map((item, index) => ({
      label: String(item.label ?? item.role ?? item.name ?? index + 1),
      value: toNumber(item.value ?? item.count ?? item.total ?? item.amount ?? 0),
    }));
  }

  if (rawDistribution && typeof rawDistribution === "object") {
    return Object.entries(rawDistribution).map(([role, value]) => ({
      label: formatRoleForDisplay(role),
      value: toNumber(value),
    }));
  }

  return [];
}

function normalizeActivityChart(dashboard = {}) {
  const rawData =
    dashboard.publicationGrowth ??
    dashboard.growth ??
    dashboard.chartData ??
    dashboard.monthlyData ??
    [];

  return toArray(rawData).map(normalizeChartPoint);
}

function AdminPage() {
  const { user: storedUser, refreshAuthState } = useAuth();
  const [user, setUser] = useState(storedUser || {});
  const [stats, setStats] = useState({});
  const [activityChart, setActivityChart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadAdminData = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const [userResult, dashboardResult] = await Promise.allSettled([
        getCurrentUser(),
        getDashboardOverview(),
      ]);

      if (userResult.status === "fulfilled") {
        const backendUser = unwrapResponse(userResult.value);
        if (backendUser && typeof backendUser === "object") {
          const mergedUser = { ...storedUser, ...backendUser };
          setUser(mergedUser);
          localStorage.setItem("user", JSON.stringify(mergedUser));
          refreshAuthState();
        }
      }

      if (dashboardResult.status === "fulfilled") {
        const dashboard = unwrapResponse(dashboardResult.value) || {};
        setStats(dashboard.stats || {});
        setActivityChart(normalizeActivityChart(dashboard));
      } else {
        setStats({});
        setActivityChart([]);
      }

      if (userResult.status === "rejected" && dashboardResult.status === "rejected") {
        throw new Error("Cannot load admin data from backend.");
      }
    } catch (error) {
      console.error("Cannot load admin data", error);
      setErrorMessage(error.message || "Cannot load admin data from backend.");
    } finally {
      setLoading(false);
    }
  }, [refreshAuthState, storedUser]);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  const displayName = user.username || user.name || user.fullName || "Researcher";
  const roleDistribution = useMemo(() => normalizeRoleDistribution(stats), [stats]);
  const statCards = [
    {
      title: "Registered users",
      value: formatNumber(getStatValue(stats, "registeredUsers")),
      description: "Platform accounts from backend",
      icon: FiUsers,
    },
    {
      title: "Indexed papers",
      value: formatNumber(getStatValue(stats, "indexedPapers")),
      description: "Publication records from backend",
      icon: FiFileText,
    },
    {
      title: "Tracked journals",
      value: formatNumber(getStatValue(stats, "trackedJournals")),
      description: "Journal sources from backend",
      icon: FiBookOpen,
    },
    {
      title: "Admin access",
      value: "Role checked",
      description: "Visible only when backend role is ADMIN",
      icon: FiShield,
      trend: "neutral",
    },
  ];

  return (
    <MainLayout title="Admin" subtitle="Role protected system overview">
      <section className="workspace-page">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar-copy">
            <h2>Account and administration</h2>
            <p>
              {loading
                ? "Loading account and system data from backend..."
                : "Admin panels are shown only to accounts whose role is ADMIN."}
            </p>
          </div>
          <button
            type="button"
            className="workspace-button"
            onClick={loadAdminData}
            disabled={loading}
          >
            Refresh
          </button>
        </div>

        {loading && <div className="workspace-empty">Loading admin data...</div>}

        {!loading && errorMessage && (
          <div className="workspace-empty">{errorMessage}</div>
        )}

        {!loading && !errorMessage && (
          <div className="workspace-grid two-columns-wide">
            <div className="workspace-stats-strip full-width">
              {statCards.map((item) => (
                <StatCard key={item.title} {...item} />
              ))}
            </div>

            <ChartBox
              title="Publication activity"
              subtitle="System data"
              rangeLabel="Backend data"
              data={activityChart}
            />

            <ChartBox
              title="Users by role"
              subtitle="Access control"
              rangeLabel="Backend data"
              data={roleDistribution}
              emptyMessage="Backend has not returned role distribution data yet."
            />

            <article className="workspace-panel full-width">
              <div className="workspace-panel-header">
                <h2>Profile information</h2>
                <span>Backend account details</span>
              </div>

              <div className="workspace-profile-row">
                <span>Display name</span>
                <strong>{displayName}</strong>
              </div>
              <div className="workspace-profile-row">
                <span>Email</span>
                <strong>{user.email || "Not available"}</strong>
              </div>
              <div className="workspace-profile-row">
                <span>Role</span>
                <strong>{formatRoleForDisplay(user.role)}</strong>
              </div>
            </article>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default AdminPage;
