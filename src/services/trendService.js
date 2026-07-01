import { apiRequest } from "./api";

// GET /api/trends/keyword?keyword=...
export function getTrendByKeyword(keyword) {
  return apiRequest("/trends/keyword", { params: { keyword } });
}

// GET /api/trends/topic?topic=...
export function getTrendByTopic(topic) {
  return apiRequest("/trends/topic", { params: { topic } });
}

// Các api /trends/stats và /trends/topics chưa được implement ở Backend
export function getTrendStats(params = {}) {
  return Promise.resolve([]);
}

export function getTrendingTopics(params = {}) {
  return Promise.resolve([]);
}
