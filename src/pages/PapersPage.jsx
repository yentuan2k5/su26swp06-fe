import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PaperCard from "../components/PaperCard";
import MainLayout from "../components/layout/MainLayout";
import { getPapers, searchPapers } from "../services/paperService";
import { toggleBookmark } from "../services/bookmarkService";
import { normalizePaper, toArray } from "../utils/apiData";
import "../styles/WorkspacePages.css";

function PapersPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(searchQuery);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadPapers = useCallback(async (keyword = "") => {
    try {
      setLoading(true);
      setErrorMessage("");

      const trimmedKeyword = keyword.trim();
      const response = trimmedKeyword
        ? await searchPapers(trimmedKeyword)
        : await getPapers();

      setPapers(toArray(response, ["papers"]).map(normalizePaper));
    } catch (error) {
      console.error("Cannot load papers", error);
      setPapers([]);
      setErrorMessage(error.message || "Cannot load papers from backend.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setQuery(searchQuery);
    loadPapers(searchQuery);
  }, [loadPapers, searchQuery]);

  const visiblePapers = useMemo(() => papers, [papers]);

  async function handleSearch(event) {
    event.preventDefault();
    await loadPapers(query);
  }

  async function handleToggleSaved(id) {
    setPapers((current) =>
      current.map((paper) =>
        paper.id === id ? { ...paper, saved: !paper.saved } : paper,
      ),
    );

    try {
      await toggleBookmark(id);
    } catch (error) {
      console.error("Cannot update bookmark", error);
      setPapers((current) =>
        current.map((paper) =>
          paper.id === id ? { ...paper, saved: !paper.saved } : paper,
        ),
      );
      setErrorMessage(error.message || "Cannot update bookmark.");
    }
  }

  return (
    <MainLayout
      title="Papers"
      subtitle="Search and review indexed scientific publications"
    >
      <section className="workspace-page">
        <form className="workspace-toolbar" onSubmit={handleSearch}>
          <div className="workspace-toolbar-copy">
            <h2>Indexed papers</h2>
            <p>
              {loading
                ? "Loading publications from backend..."
                : `${visiblePapers.length} publications loaded from backend.`}
            </p>
          </div>

          <input
            className="workspace-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, journal or author"
          />
        </form>

        <article className="workspace-panel">
          <div className="workspace-panel-header">
            <h2>Search results</h2>
            <span>Backend data</span>
          </div>

          {loading && <div className="workspace-empty">Loading papers...</div>}

          {!loading && errorMessage && (
            <div className="workspace-empty">{errorMessage}</div>
          )}

          {!loading && !errorMessage && (
            <div className="workspace-list">
              {visiblePapers.length > 0 ? (
                visiblePapers.map((paper) => (
                  <PaperCard
                    key={paper.id}
                    {...paper}
                    onBookmark={() => handleToggleSaved(paper.id)}
                  />
                ))
              ) : (
                <div className="workspace-empty">
                  No papers were returned from backend.
                </div>
              )}
            </div>
          )}
        </article>
      </section>
    </MainLayout>
  );
}

export default PapersPage;
