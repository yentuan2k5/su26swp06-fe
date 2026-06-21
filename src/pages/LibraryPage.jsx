import { useCallback, useEffect, useState } from "react";
import JournalCard from "../components/JournalCard";
import PaperCard from "../components/PaperCard";
import MainLayout from "../components/layout/MainLayout";
import { getBookmarkedPapers, removeBookmarkByPaperId } from "../services/bookmarkService";
import { getJournals } from "../services/journalService";
import { normalizeJournal, normalizePaper, toArray } from "../utils/apiData";
import "../styles/WorkspacePages.css";

function LibraryPage() {
  const [savedPapers, setSavedPapers] = useState([]);
  const [trackedJournals, setTrackedJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadLibrary = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const [paperResult, journalResult] = await Promise.allSettled([
        getBookmarkedPapers(),
        getJournals({ tracked: true }),
      ]);

      if (paperResult.status === "fulfilled") {
        setSavedPapers(toArray(paperResult.value, ["papers", "bookmarks"]).map(normalizePaper));
      } else {
        setSavedPapers([]);
      }

      if (journalResult.status === "fulfilled") {
        setTrackedJournals(toArray(journalResult.value, ["journals", "trackedJournals"]).map(normalizeJournal));
      } else {
        setTrackedJournals([]);
      }

      if (paperResult.status === "rejected" && journalResult.status === "rejected") {
        throw new Error("Cannot load library data from backend.");
      }
    } catch (error) {
      console.error("Cannot load library", error);
      setErrorMessage(error.message || "Cannot load library data from backend.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  async function handleRemoveSavedPaper(paperId) {
    const oldPapers = savedPapers;
    setSavedPapers((current) => current.filter((paper) => paper.id !== paperId));

    try {
      await removeBookmarkByPaperId(paperId);
    } catch (error) {
      console.error("Cannot remove saved paper", error);
      setSavedPapers(oldPapers);
      setErrorMessage(error.message || "Cannot remove saved paper.");
    }
  }

  return (
    <MainLayout
      title="Library"
      subtitle="Manage saved papers and tracked journals"
    >
      <section className="workspace-page">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar-copy">
            <h2>My library</h2>
            <p>
              {loading
                ? "Loading library from backend..."
                : "Saved papers and journals loaded from backend."}
            </p>
          </div>
          <button
            type="button"
            className="workspace-button"
            onClick={loadLibrary}
            disabled={loading}
          >
            Refresh
          </button>
        </div>

        {loading && <div className="workspace-empty">Loading library...</div>}

        {!loading && errorMessage && (
          <div className="workspace-empty">{errorMessage}</div>
        )}

        {!loading && !errorMessage && (
          <div className="workspace-grid">
            <article className="workspace-panel">
              <div className="workspace-panel-header">
                <h2>Saved papers</h2>
                <span>{savedPapers.length} items</span>
              </div>
              <div className="workspace-list">
                {savedPapers.length > 0 ? (
                  savedPapers.map((paper) => (
                    <PaperCard
                      key={paper.id}
                      {...paper}
                      saved
                      onBookmark={() => handleRemoveSavedPaper(paper.id)}
                    />
                  ))
                ) : (
                  <div className="workspace-empty">
                    No saved papers were returned from backend.
                  </div>
                )}
              </div>
            </article>

            <article className="workspace-panel">
              <div className="workspace-panel-header">
                <h2>Tracked journals</h2>
                <span>{trackedJournals.length} journals</span>
              </div>
              <div className="workspace-list">
                {trackedJournals.length > 0 ? (
                  trackedJournals.map((journal) => (
                    <JournalCard key={journal.id} {...journal} />
                  ))
                ) : (
                  <div className="workspace-empty">
                    No tracked journals were returned from backend.
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

export default LibraryPage;
