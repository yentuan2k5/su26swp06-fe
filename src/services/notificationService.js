import { apiRequest } from "./api";

// Backend NotificationController chưa implement
export function getNotifications() {
  return apiRequest("/notifications");
}

export function markNotificationAsRead(id) {
  return apiRequest(`/notifications/${id}/read`, { method: "PUT" });
}

export function markAllNotificationsAsRead() {
  return apiRequest("/notifications/read-all", { method: "PUT" });
}
