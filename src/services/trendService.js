import { apiRequest } from "./api";

export function getTrends(params = {}) {
  return apiRequest("/trends", {
    method: "GET",
    params,
  });
}

export function getTrendingTopics(params = {}) {
  return apiRequest("/trends/topics", {
    method: "GET",
    params,
  });
}

export function getTrendById(trendId) {
  return apiRequest(`/trends/${trendId}`, {
    method: "GET",
  });
}

export function getTrendByTopic(topic, params = {}) {
  return apiRequest("/trends/topic", {
    method: "GET",
    params: {
      topic,
      ...params,
    },
  });
}

export function getTrendStats(params = {}) {
  return apiRequest("/trends/stats", {
    method: "GET",
    params,
  });
}

export function createTrend(payload) {
  return apiRequest("/trends", {
    method: "POST",
    body: payload,
  });
}

export function updateTrend(trendId, payload) {
  return apiRequest(`/trends/${trendId}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteTrend(trendId) {
  return apiRequest(`/trends/${trendId}`, {
    method: "DELETE",
  });
}