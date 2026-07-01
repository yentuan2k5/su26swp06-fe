import { apiRequest } from "./api";

// GET /api/journals
export function getJournals() {
  return apiRequest("/journals");
}

// GET /api/journals/search?keyword=...
export function searchJournals(keyword) {
  return apiRequest("/journals/search", { params: { keyword } });
}

// GET /api/journals/top?limit=...
export function getTopJournals(limit = 10) {
  return apiRequest("/journals/top", { params: { limit } });
}

// GET /api/journals/{journalId}
export function getJournalById(id) {
  return apiRequest(`/journals/${id}`);
}

// GET /api/journals/{journalId}/papers?page=...&size=...
export function getPapersByJournal(journalId, page = 0, size = 10) {
  return apiRequest(`/journals/${journalId}/papers`, { params: { page, size } });
}
