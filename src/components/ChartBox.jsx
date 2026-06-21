import { formatNumber, toNumber } from "../utils/apiData";
import "../styles/DashboardPage.css";

function ChartBox({
  title,
  subtitle,
  data = [],
  valueSuffix = "",
  rangeLabel,
  emptyMessage = "No chart data was returned from backend.",
}) {
  const safeData = Array.isArray(data)
    ? data.filter((item) => item && item.label !== undefined)
    : [];
  const maxValue = Math.max(...safeData.map((item) => toNumber(item.value)), 1);

  return (
    <article className="db-panel db-chart-panel">
      <div className="db-panel-header">
        <div>
          {subtitle && <span className="db-eyebrow">{subtitle}</span>}
          <h2>{title}</h2>
        </div>
        {rangeLabel && <span className="db-range-badge">{rangeLabel}</span>}
      </div>

      {safeData.length === 0 ? (
        <div className="db-chart-empty">{emptyMessage}</div>
      ) : (
        <div className="db-chart" role="img" aria-label={`${title} bar chart`}>
          <div className="db-chart-grid" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          {safeData.map((item) => {
            const value = toNumber(item.value);
            const height = Math.max((value / maxValue) * 100, 8);

            return (
              <div className="db-chart-column" key={item.label}>
                <div className="db-chart-value">
                  {formatNumber(value)}
                  {valueSuffix}
                </div>
                <div className="db-chart-track">
                  <span style={{ height: `${height}%` }} />
                </div>
                <small>{item.label}</small>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}

export default ChartBox;
