import { apiRequest } from "./api";

export function getNotifications(params = {}) {
  return apiRequest("/notifications", {
    method: "GET",
    params,
  });
}

export function getUnreadNotificationCount() {
  return apiRequest("/notifications/unread-count", {
    method: "GET",
  });
}

export function markNotificationAsRead(notificationId) {
  return apiRequest(`/notifications/${notificationId}/read`, {
    method: "PUT",
  });
}

export function markAllNotificationsAsRead() {
  return apiRequest("/notifications/read-all", {
    method: "PUT",
  });
}

export function deleteNotification(notificationId) {
  return apiRequest(`/notifications/${notificationId}`, {
    method: "DELETE",
  });
}

export function clearNotifications() {
  return apiRequest("/notifications", {
    method: "DELETE",
  });
}