import { FiBookOpen, FiFileText, FiUsers } from "react-icons/fi";
import StatCard from "../components/StatCard";
import MainLayout from "../components/layout/MainLayout";
import "../styles/WorkspacePages.css";

function readUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
}

function AdminPage() {
  const user = readUser();
  const displayName = user.username || user.name || user.fullName || "Researcher";

  return (
    <MainLayout
      title="Admin"
      subtitle="Account information and system overview"
    >
      <section className="workspace-page">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar-copy">
            <h2>Account and administration</h2>
            <p>Review your profile and current platform statistics.</p>
          </div>
        </div>

        <div className="workspace-grid three-columns">
          <StatCard
            title="Registered users"
            value="2,064"
            change="5.4%"
            description="Active platform accounts"
            icon={FiUsers}
          />
          <StatCard
            title="Indexed papers"
            value="128,420"
            change="12.8%"
            description="Available publication records"
            icon={FiFileText}
          />
          <StatCard
            title="Tracked journals"
            value="4,832"
            change="7.2%"
            description="Monitored journal sources"
            icon={FiBookOpen}
          />

          <article className="workspace-panel full-width">
            <div className="workspace-panel-header">
              <h2>Profile information</h2>
              <span>Stored account details</span>
            </div>

            <div className="workspace-profile-row">
              <span>Display name</span>
              <strong>{displayName}</strong>
            </div>
            <div className="workspace-profile-row">
              <span>Email</span>
              <strong>{user.email || "Not available"}</strong>
            </div>
            <div className="workspace-profile-row">
              <span>Role</span>
              <strong>{user.role || "Research member"}</strong>
            </div>
          </article>
        </div>
      </section>
    </MainLayout>
  );
}

export default AdminPage;
