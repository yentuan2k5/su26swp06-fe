import JournalCard from "../components/JournalCard";
import PaperCard from "../components/PaperCard";
import MainLayout from "../components/layout/MainLayout";
import "../styles/WorkspacePages.css";

const savedPapers = [
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
    title: "Privacy-Preserving Federated Learning for Medical Data",
    source: "IEEE Access",
    authors: "H. Tran, K. Martin",
    year: "2025",
    tag: "Research article",
    saved: true,
  },
];

const savedJournals = [
  {
    name: "Nature Machine Intelligence",
    publisher: "Springer Nature",
    subject: "Artificial intelligence",
    quartile: "Q1",
    impactFactor: "23.8",
  },
  {
    name: "PLOS ONE",
    publisher: "Public Library of Science",
    subject: "Multidisciplinary science",
    quartile: "Q1",
    impactFactor: "3.7",
    openAccess: true,
  },
];

function LibraryPage() {
  return (
    <MainLayout
      title="Library"
      subtitle="Manage saved papers and tracked journals"
    >
      <section className="workspace-page">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar-copy">
            <h2>My library</h2>
            <p>Keep important sources organized in one place.</p>
          </div>
        </div>

        <div className="workspace-grid">
          <article className="workspace-panel">
            <div className="workspace-panel-header">
              <h2>Saved papers</h2>
              <span>{savedPapers.length} items</span>
            </div>
            <div className="workspace-list">
              {savedPapers.map((paper) => (
                <PaperCard key={paper.id} {...paper} />
              ))}
            </div>
          </article>

          <article className="workspace-panel">
            <div className="workspace-panel-header">
              <h2>Tracked journals</h2>
              <span>{savedJournals.length} journals</span>
            </div>
            <div className="workspace-list">
              {savedJournals.map((journal) => (
                <JournalCard key={journal.name} {...journal} />
              ))}
            </div>
          </article>
        </div>
      </section>
    </MainLayout>
  );
}

export default LibraryPage;
