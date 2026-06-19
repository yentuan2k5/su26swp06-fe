import ChartBox from "../components/ChartBox";
import TopicCard from "../components/TopicCard";
import MainLayout from "../components/layout/MainLayout";
import "../styles/WorkspacePages.css";

const monthlyData = [
  { label: "Jan", value: 58 },
  { label: "Feb", value: 63 },
  { label: "Mar", value: 71 },
  { label: "Apr", value: 69 },
  { label: "May", value: 82 },
  { label: "Jun", value: 91 },
  { label: "Jul", value: 96 },
];

const topics = [
  { name: "Artificial intelligence", paperCount: "24,820 papers", growth: "+32%", score: 92 },
  { name: "Machine learning", paperCount: "18,240 papers", growth: "+28%", score: 84 },
  { name: "Cybersecurity", paperCount: "12,910 papers", growth: "+21%", score: 72 },
  { name: "Medical imaging", paperCount: "9,740 papers", growth: "+16%", score: 64 },
  { name: "Renewable energy", paperCount: "8,620 papers", growth: "+14%", score: 59 },
];

function TrendsPage() {
  return (
    <MainLayout
      title="Trends"
      subtitle="Monitor growth across scientific topics and publication fields"
    >
      <section className="workspace-page">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar-copy">
            <h2>Research trends</h2>
            <p>Publication signals based on recently indexed records.</p>
          </div>

          <select className="workspace-select" defaultValue="7-months">
            <option value="7-months">Last 7 months</option>
            <option value="12-months">Last 12 months</option>
          </select>
        </div>

        <div className="workspace-grid">
          <ChartBox
            title="Publication momentum"
            subtitle="Monthly indexed records"
            rangeLabel="2026"
            data={monthlyData}
            valueSuffix="K"
          />

          <article className="workspace-panel">
            <div className="workspace-panel-header">
              <h2>Top fields</h2>
              <span>Growth rate</span>
            </div>

            <div className="workspace-list">
              {topics.map((topic, index) => (
                <TopicCard key={topic.name} rank={index + 1} {...topic} />
              ))}
            </div>
          </article>
        </div>
      </section>
    </MainLayout>
  );
}

export default TrendsPage;
