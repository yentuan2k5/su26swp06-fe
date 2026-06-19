import "../styles/DashboardPage.css";

function ChartBox({
  title,
  subtitle,
  data = [],
  valueSuffix = "",
  rangeLabel,
}) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <article className="db-panel db-chart-panel">
      <div className="db-panel-header">
        <div>
          {subtitle && <span className="db-eyebrow">{subtitle}</span>}
          <h2>{title}</h2>
        </div>
        {rangeLabel && <span className="db-range-badge">{rangeLabel}</span>}
      </div>

      <div className="db-chart" role="img" aria-label={`${title} bar chart`}>
        <div className="db-chart-grid" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        {data.map((item) => {
          const height = Math.max((item.value / maxValue) * 100, 8);

          return (
            <div className="db-chart-column" key={item.label}>
              <div className="db-chart-value">
                {item.value}
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
    </article>
  );
}

export default ChartBox;
