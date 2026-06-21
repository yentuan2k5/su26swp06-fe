import { useCallback, useEffect, useState } from "react";
import { FiBell, FiBookOpen, FiFileText, FiTrendingUp } from "react-icons/fi";
import MainLayout from "../components/layout/MainLayout";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../services/notificationService";
import { formatRelativeTime, normalizeNotification, toArray } from "../utils/apiData";
import "../styles/WorkspacePages.css";

function getNotificationIcon(type = "") {
  const normalizedType = String(type).toLowerCase();

  if (normalizedType.includes("journal")) return FiBookOpen;
  if (normalizedType.includes("trend") || normalizedType.includes("topic")) return FiTrendingUp;
  if (normalizedType.includes("paper") || normalizedType.includes("publication")) return FiFileText;

  return FiBell;
}

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await getNotifications();
      setNotifications(toArray(response, ["notifications"]).map(normalizeNotification));
    } catch (error) {
      console.error("Cannot load notifications", error);
      setNotifications([]);
      setErrorMessage(error.message || "Cannot load notifications from backend.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const unreadCount = notifications.filter((item) => item.unread).length;

  async function handleMarkAllAsRead() {
    const oldNotifications = notifications;
    setNotifications((current) => current.map((item) => ({ ...item, unread: false })));

    try {
      await markAllNotificationsAsRead();
    } catch (error) {
      console.error("Cannot mark all notifications as read", error);
      setNotifications(oldNotifications);
      setErrorMessage(error.message || "Cannot mark notifications as read.");
    }
  }

  async function handleOpenNotification(notificationId) {
    const target = notifications.find((item) => item.id === notificationId);
    if (!target || !target.unread) return;

    setNotifications((current) =>
      current.map((item) =>
        item.id === notificationId ? { ...item, unread: false } : item,
      ),
    );

    try {
      await markNotificationAsRead(notificationId);
    } catch (error) {
      console.error("Cannot mark notification as read", error);
    }
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
            <p>
              {loading
                ? "Loading notifications from backend..."
                : `${unreadCount} unread updates.`}
            </p>
          </div>

          <button
            type="button"
            className="workspace-button"
            onClick={handleMarkAllAsRead}
            disabled={loading || unreadCount === 0}
          >
            <FiBell /> Mark all as read
          </button>
        </div>

        <article className="workspace-panel">
          {loading && <div className="workspace-empty">Loading notifications...</div>}

          {!loading && errorMessage && (
            <div className="workspace-empty">{errorMessage}</div>
          )}

          {!loading && !errorMessage && (
            <div className="workspace-list">
              {notifications.length > 0 ? (
                notifications.map((item) => {
                  const Icon = getNotificationIcon(item.type);

                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={`workspace-notification ${item.unread ? "unread" : ""}`}
                      onClick={() => handleOpenNotification(item.id)}
                    >
                      <span className="workspace-notification-icon">
                        <Icon />
                      </span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.message}</p>
                      </div>
                      <time>{formatRelativeTime(item.time)}</time>
                    </button>
                  );
                })
              ) : (
                <div className="workspace-empty">
                  No notifications were returned from backend.
                </div>
              )}
            </div>
          )}
        </article>
      </section>
    </MainLayout>
  );
}

export default NotificationsPage;
