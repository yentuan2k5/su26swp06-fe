import { apiRequest } from "./api";

export function getJournals(params = {}) {
  return apiRequest("/journals", {
    method: "GET",
    params,
  });
}

export function searchJournals(keyword, params = {}) {
  return apiRequest("/journals/search", {
    method: "GET",
    params: {
      keyword,
      ...params,
    },
  });
}

export function getJournalById(journalId) {
  return apiRequest(`/journals/${journalId}`, {
    method: "GET",
  });
}

export function createJournal(payload) {
  return apiRequest("/journals", {
    method: "POST",
    body: payload,
  });
}

export function updateJournal(journalId, payload) {
  return apiRequest(`/journals/${journalId}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteJournal(journalId) {
  return apiRequest(`/journals/${journalId}`, {
    method: "DELETE",
  });
}

export function followJournal(journalId) {
  return apiRequest(`/journals/${journalId}/follow`, {
    method: "POST",
  });
}

export function unfollowJournal(journalId) {
  return apiRequest(`/journals/${journalId}/follow`, {
    method: "DELETE",
  });
}

export function getJournalStats() {
  return apiRequest("/journals/stats", {
    method: "GET",
  });
}