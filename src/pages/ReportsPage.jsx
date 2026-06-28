import { useCallback, useEffect, useState } from "react";
import { FiDownload, FiPlus } from "react-icons/fi";
import MainLayout from "../components/layout/MainLayout";
import { generateReport, getReports } from "../services/reportService";
import { normalizeReport, toArray } from "../utils/apiData";
import "../styles/WorkspacePages.css";

function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadReports = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await getReports();
      setReports(toArray(response, ["reports"]).map(normalizeReport));
    } catch (error) {
      console.error("Cannot load reports", error);
      setReports([]);
      setErrorMessage(error.message || "Cannot load reports from backend.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  async function handleCreateReport() {
    try {
      setCreating(true);
      setErrorMessage("");

      await generateReport({ type: "summary" });
      await loadReports();
    } catch (error) {
      console.error("Cannot create report", error);
      setErrorMessage(error.message || "Cannot create report from backend.");
    } finally {
      setCreating(false);
    }
  }

  function handleDownload(report) {
    if (report.downloadUrl) {
      window.open(report.downloadUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setErrorMessage("Backend did not return a download URL for this report.");
  }

  return (
    <MainLayout
      title="Reports"
      subtitle="Create and download research activity reports"
    >
      <section className="workspace-page">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar-copy">
            <h2>Generated reports</h2>
            <p>
              {loading
                ? "Loading reports from backend..."
                : `${reports.length} reports loaded from backend.`}
            </p>
          </div>

          <button
            type="button"
            className="workspace-button primary"
            onClick={handleCreateReport}
            disabled={creating || loading}
          >
            <FiPlus /> {creating ? "Creating..." : "New report"}
          </button>
        </div>

        {loading && <div className="workspace-empty">Loading reports...</div>}

        {!loading && errorMessage && (
          <div className="workspace-empty">{errorMessage}</div>
        )}

        {!loading && !errorMessage && (
          <div className="workspace-grid three-columns">
            {reports.length > 0 ? (
              reports.map((report) => (
                <article className="workspace-report-card" key={report.id}>
                  <h3>{report.title}</h3>
                  <p>{report.description}</p>

                  <div className="workspace-report-meta">
                    {report.period && <span>{report.period}</span>}
                    {report.format && <span>{report.format}</span>}
                  </div>

                  <div className="workspace-report-footer">
                    <span
                      className={`workspace-status ${
                        String(report.status).toLowerCase() === "pending" ? "pending" : ""
                      }`}
                    >
                      {report.status}
                    </span>
                    <button
                      type="button"
                      className="workspace-button"
                      onClick={() => handleDownload(report)}
                    >
                      <FiDownload /> Download
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="workspace-empty">
                No reports were returned from backend.
              </div>
            )}
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default ReportsPage;
