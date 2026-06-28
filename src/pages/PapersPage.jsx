import { useCallback, useEffect, useState } from "react";
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
  const [bookmarkError, setBookmarkError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadPapers = useCallback(async (keyword = "", pageNum = 0) => {
    try {
      setLoading(true);
      setErrorMessage("");
      setBookmarkError("");

      const trimmed = keyword.trim();
      // Backend: GET /api/papers?search=&page=0&size=10
      // Trả về Spring Page: { content:[], totalElements, totalPages, ... }
      const response = trimmed
        ? await searchPapers(trimmed, { page: pageNum, size: 10 })
        : await getPapers({ page: pageNum, size: 10 });

      // Spring Page response
      const items = toArray(response); // lấy content[]
      setPapers(items.map(normalizePaper));
      setTotalPages(response?.totalPages ?? 0);
      setPage(pageNum);
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
    loadPapers(searchQuery, 0);
  }, [loadPapers, searchQuery]);

  async function handleSearch(event) {
    event.preventDefault();
    await loadPapers(query, 0);
  }

  async function handleToggleSaved(id) {
    const paper = papers.find((p) => p.id === id);
    if (!paper) return;
    setBookmarkError("");
    setPapers((current) =>
      current.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)),
    );
    try {
      await toggleBookmark(id, paper.saved);
    } catch (err) {
      // Bookmark chưa implement ở BE — rollback UI
      setPapers((current) =>
        current.map((p) => (p.id === id ? { ...p, saved: paper.saved } : p)),
      );
      setBookmarkError("Bookmark feature is not available yet.");
    }
  }

  return (
    <MainLayout title="Papers" subtitle="Browse research papers">
      <div className="workspace-page">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar-copy">
            <h2>Research Papers</h2>
            <p>Search and explore scientific papers from OpenAlex.</p>
          </div>
          <form
            onSubmit={handleSearch}
            style={{ display: "flex", gap: 8 }}
          >
            <input
              type="search"
              className="workspace-search"
              placeholder="Search papers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="workspace-button primary">
              Search
            </button>
          </form>
        </div>

        {errorMessage && (
          <div style={{ padding: "10px 14px", marginBottom: 12, borderRadius: 8, background: "var(--st-danger-soft)", color: "var(--st-danger)", fontSize: 13 }}>
            {errorMessage}
          </div>
        )}
        {bookmarkError && (
          <div style={{ padding: "10px 14px", marginBottom: 12, borderRadius: 8, background: "var(--st-warning-soft)", color: "var(--st-warning)", fontSize: 13 }}>
            {bookmarkError}
          </div>
        )}

        {loading ? (
          <div className="cm-loading" style={{ minHeight: 200, fontSize: 14 }}>
            Loading papers...
          </div>
        ) : papers.length === 0 ? (
          <div className="workspace-empty">
            No papers found. Try a different search term.
          </div>
        ) : (
          <>
            <div className="workspace-panel">
              <div className="workspace-list">
                {papers.map((paper) => (
                  <PaperCard
                    key={paper.id}
                    {...paper}
                    onBookmark={() => handleToggleSaved(paper.id)}
                  />
                ))}
              </div>
            </div>

            {totalPages > 1 && (
              <div className="cm-pagination">
                <button
                  type="button"
                  className="cm-page-btn"
                  disabled={page === 0}
                  onClick={() => loadPapers(query, page - 1)}
                >
                  ← Prev
                </button>
                <span style={{ fontSize: 13, color: "var(--st-muted)", padding: "0 8px" }}>
                  Page {page + 1} / {totalPages}
                </span>
                <button
                  type="button"
                  className="cm-page-btn"
                  disabled={page >= totalPages - 1}
                  onClick={() => loadPapers(query, page + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default PapersPage;
