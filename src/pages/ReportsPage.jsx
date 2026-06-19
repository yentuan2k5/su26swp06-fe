import { FiDownload, FiPlus } from "react-icons/fi";
import MainLayout from "../components/layout/MainLayout";
import "../styles/WorkspacePages.css";

const reports = [
  {
    id: 1,
    title: "Weekly research trend summary",
    description: "Publication growth and top research fields for the current week.",
    period: "10 Jun – 16 Jun 2026",
    format: "PDF",
    status: "Ready",
  },
  {
    id: 2,
    title: "Artificial intelligence topic report",
    description: "Detailed paper and journal activity for the selected topic.",
    period: "May 2026",
    format: "CSV",
    status: "Ready",
  },
  {
    id: 3,
    title: "Saved library activity",
    description: "Summary of bookmarked papers and tracked journals.",
    period: "June 2026",
    format: "PDF",
    status: "Pending",
  },
];

function ReportsPage() {
  return (
    <MainLayout
      title="Reports"
      subtitle="Create and download research activity reports"
    >
      <section className="workspace-page">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar-copy">
            <h2>Generated reports</h2>
            <p>Export summaries for presentations and project reviews.</p>
          </div>

          <button type="button" className="workspace-button primary">
            <FiPlus /> New report
          </button>
        </div>

        <div className="workspace-grid three-columns">
          {reports.map((report) => (
            <article className="workspace-report-card" key={report.id}>
              <h3>{report.title}</h3>
              <p>{report.description}</p>

              <div className="workspace-report-meta">
                <span>{report.period}</span>
                <span>{report.format}</span>
              </div>

              <div className="workspace-report-footer">
                <span
                  className={`workspace-status ${
                    report.status === "Pending" ? "pending" : ""
                  }`}
                >
                  {report.status}
                </span>
                <button type="button" className="workspace-button">
                  <FiDownload /> Download
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

export default ReportsPage;
