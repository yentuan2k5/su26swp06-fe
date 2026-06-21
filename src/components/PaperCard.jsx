import { FiBookmark, FiExternalLink } from "react-icons/fi";
import "../styles/DashboardPage.css";

function PaperCard({
  title,
  source,
  authors,
  year,
  tag,
  href,
  saved = false,
  onBookmark,
}) {
  const metadata = [authors, year].filter(Boolean).join(" · ");

  return (
    <article className="db-paper-card">
      <div className="db-paper-main">
        <div className="db-paper-heading">
          {tag && <span className="db-paper-tag">{tag}</span>}
          <span className="db-paper-source">{source}</span>
        </div>

        <h3>{title}</h3>
        {metadata && <p>{metadata}</p>}
      </div>

      <div className="db-paper-actions">
        <button
          type="button"
          className={saved ? "is-saved" : ""}
          aria-label={saved ? "Remove paper from library" : "Save paper to library"}
          onClick={onBookmark}
        >
          <FiBookmark />
        </button>

        {href && (
          <a href={href} target="_blank" rel="noreferrer" aria-label="Open paper">
            <FiExternalLink />
          </a>
        )}
      </div>
    </article>
  );
}

export default PaperCard;
