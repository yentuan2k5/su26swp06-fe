import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PaperCard from "../components/PaperCard";
import MainLayout from "../components/layout/MainLayout";
import "../styles/WorkspacePages.css";

const paperData = [
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
  {
    id: 4,
    title: "Privacy-Preserving Federated Learning for Medical Data",
    source: "IEEE Access",
    authors: "H. Tran, K. Martin",
    year: "2025",
    tag: "Research article",
    saved: true,
  },
];

function PapersPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [papers, setPapers] = useState(paperData);

  const filteredPapers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return papers;

    return papers.filter((paper) =>
      [paper.title, paper.source, paper.authors, paper.tag]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [papers, query]);

  function toggleSaved(id) {
    setPapers((current) =>
      current.map((paper) =>
        paper.id === id ? { ...paper, saved: !paper.saved } : paper,
      ),
    );
  }

  return (
    <MainLayout
      title="Papers"
      subtitle="Search and review indexed scientific publications"
    >
      <section className="workspace-page">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar-copy">
            <h2>Indexed papers</h2>
            <p>{filteredPapers.length} publications match the current search.</p>
          </div>

          <input
            className="workspace-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, journal or author"
          />
        </div>

        <article className="workspace-panel">
          <div className="workspace-panel-header">
            <h2>Search results</h2>
            <span>Sorted by newest</span>
          </div>

          <div className="workspace-list">
            {filteredPapers.length > 0 ? (
              filteredPapers.map((paper) => (
                <PaperCard
                  key={paper.id}
                  {...paper}
                  onBookmark={() => toggleSaved(paper.id)}
                />
              ))
            ) : (
              <div className="workspace-empty">
                No papers were found for “{query}”.
              </div>
            )}
          </div>
        </article>
      </section>
    </MainLayout>
  );
}

export default PapersPage;
