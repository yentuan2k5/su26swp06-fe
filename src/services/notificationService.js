// Backend NotificationController chưa implement endpoint nào
export function getNotifications() {
  return Promise.resolve([]);
}

export function markNotificationAsRead(id) {
  return Promise.resolve(null);
}

export function markAllNotificationsAsRead() {
  return Promise.resolve(null);
}
