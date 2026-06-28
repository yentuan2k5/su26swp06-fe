import { apiRequest } from "./api";

// Backend JournalController chưa implement
export function getJournals(params = {}) {
  return apiRequest("/journals", { params });
}

export function getJournalById(id) {
  return apiRequest(`/journals/${id}`);
}
