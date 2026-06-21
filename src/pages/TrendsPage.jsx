import { useCallback, useEffect, useMemo, useState } from "react";
import ChartBox from "../components/ChartBox";
import TopicCard from "../components/TopicCard";
import MainLayout from "../components/layout/MainLayout";
import { getTrendingTopics, getTrendStats } from "../services/trendService";
import { normalizeChartPoint, normalizeTopic, toArray, toObject, unwrapResponse } from "../utils/apiData";
import "../styles/WorkspacePages.css";

function normalizeChartData(response) {
  const rawData = unwrapResponse(response);
  const data = toObject(response);

  const chartArray = Array.isArray(rawData)
    ? rawData
    : toArray(data, [
        "publicationMomentum",
        "monthlyData",
        "chartData",
        "growth",
        "publicationGrowth",
      ]);

  return chartArray.map(normalizeChartPoint);
}

function TrendsPage() {
  const [range, setRange] = useState("7-months");
  const [monthlyData, setMonthlyData] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const rangeParams = useMemo(() => ({ range }), [range]);

  const loadTrends = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const [statsResult, topicsResult] = await Promise.allSettled([
        getTrendStats(rangeParams),
        getTrendingTopics(rangeParams),
      ]);

      if (statsResult.status === "fulfilled") {
        setMonthlyData(normalizeChartData(statsResult.value));
      } else {
        setMonthlyData([]);
      }

      if (topicsResult.status === "fulfilled") {
        setTopics(toArray(topicsResult.value, ["topics", "trends"]).map(normalizeTopic));
      } else {
        setTopics([]);
      }

      if (statsResult.status === "rejected" && topicsResult.status === "rejected") {
        throw new Error("Cannot load trend data from backend.");
      }
    } catch (error) {
      console.error("Cannot load trends", error);
      setErrorMessage(error.message || "Cannot load trend data from backend.");
    } finally {
      setLoading(false);
    }
  }, [rangeParams]);

  useEffect(() => {
    loadTrends();
  }, [loadTrends]);

  return (
    <MainLayout
      title="Trends"
      subtitle="Monitor growth across scientific topics and publication fields"
    >
      <section className="workspace-page">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar-copy">
            <h2>Research trends</h2>
            <p>
              {loading
                ? "Loading publication signals from backend..."
                : "Publication signals loaded from backend."}
            </p>
          </div>

          <select
            className="workspace-select"
            value={range}
            onChange={(event) => setRange(event.target.value)}
          >
            <option value="7-months">Last 7 months</option>
            <option value="12-months">Last 12 months</option>
          </select>
        </div>

        {loading && <div className="workspace-empty">Loading trends...</div>}

        {!loading && errorMessage && (
          <div className="workspace-empty">{errorMessage}</div>
        )}

        {!loading && !errorMessage && (
          <div className="workspace-grid">
            <ChartBox
              title="Publication momentum"
              subtitle="Monthly indexed records"
              rangeLabel="Backend data"
              data={monthlyData}
              valueSuffix="K"
            />

            <article className="workspace-panel">
              <div className="workspace-panel-header">
                <h2>Top fields</h2>
                <span>Growth rate</span>
              </div>

              <div className="workspace-list">
                {topics.length > 0 ? (
                  topics.map((topic, index) => (
                    <TopicCard key={topic.id} rank={index + 1} {...topic} />
                  ))
                ) : (
                  <div className="workspace-empty">
                    No trend topics were returned from backend.
                  </div>
                )}
              </div>
            </article>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default TrendsPage;
