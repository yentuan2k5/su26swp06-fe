import { apiRequest } from "./api";

export function getPapers(params = {}) {
  return apiRequest("/papers", {
    method: "GET",
    params,
  });
}

export function searchPapers(keyword, params = {}) {
  return apiRequest("/papers/search", {
    method: "GET",
    params: {
      keyword,
      ...params,
    },
  });
}

export function getLatestPapers(limit = 10) {
  return apiRequest("/papers/latest", {
    method: "GET",
    params: { limit },
  });
}

export function getPaperById(paperId) {
  return apiRequest(`/papers/${paperId}`, {
    method: "GET",
  });
}

export function createPaper(payload) {
  return apiRequest("/papers", {
    method: "POST",
    body: payload,
  });
}

export function updatePaper(paperId, payload) {
  return apiRequest(`/papers/${paperId}`, {
    method: "PUT",
    body: payload,
  });
}

export function deletePaper(paperId) {
  return apiRequest(`/papers/${paperId}`, {
    method: "DELETE",
  });
}

export function getPaperStats() {
  return apiRequest("/papers/stats", {
    method: "GET",
  });
}