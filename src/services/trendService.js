import { apiRequest } from "./api";

// Backend TrendController chưa implement
export function getTrendStats(params = {}) {
  return apiRequest("/trends/stats", { params });
}

export function getTrendingTopics(params = {}) {
  return apiRequest("/trends/topics", { params });
}
