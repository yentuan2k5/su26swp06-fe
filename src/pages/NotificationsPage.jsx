import { useState } from "react";
import { FiBell, FiBookOpen, FiFileText, FiTrendingUp } from "react-icons/fi";
import MainLayout from "../components/layout/MainLayout";
import "../styles/WorkspacePages.css";

const initialNotifications = [
  {
    id: 1,
    title: "New papers in Artificial Intelligence",
    message: "Twenty-four new papers matched your tracked topic.",
    time: "10 minutes ago",
    unread: true,
    icon: FiFileText,
  },
  {
    id: 2,
    title: "Journal update",
    message: "Nature Machine Intelligence published a new issue.",
    time: "2 hours ago",
    unread: true,
    icon: FiBookOpen,
  },
  {
    id: 3,
    title: "Trend signal detected",
    message: "Medical imaging publication activity increased this week.",
    time: "Yesterday",
    unread: false,
    icon: FiTrendingUp,
  },
];

function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((item) => item.unread).length;

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((item) => ({ ...item, unread: false })),
    );
  }

  return (
    <MainLayout
      title="Notifications"
      subtitle="Review updates from papers, journals and tracked topics"
    >
      <section className="workspace-page">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar-copy">
            <h2>Recent notifications</h2>
            <p>{unreadCount} unread updates.</p>
          </div>

          <button
            type="button"
            className="workspace-button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <FiBell /> Mark all as read
          </button>
        </div>

        <article className="workspace-panel">
          <div className="workspace-list">
            {notifications.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.id}
                  className={`workspace-notification ${item.unread ? "unread" : ""}`}
                >
                  <span className="workspace-notification-icon">
                    <Icon />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.message}</p>
                  </div>
                  <time>{item.time}</time>
                </article>
              );
            })}
          </div>
        </article>
      </section>
    </MainLayout>
  );
}

export default NotificationsPage;
