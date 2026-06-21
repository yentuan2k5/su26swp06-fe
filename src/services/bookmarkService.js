import { apiRequest } from "./api";

export function getBookmarks(params = {}) {
  return apiRequest("/bookmarks", {
    method: "GET",
    params,
  });
}

export function getBookmarkedPapers(params = {}) {
  return apiRequest("/bookmarks/papers", {
    method: "GET",
    params,
  });
}

export function addBookmark(paperId) {
  return apiRequest("/bookmarks", {
    method: "POST",
    body: { paperId },
  });
}

export function removeBookmark(bookmarkId) {
  return apiRequest(`/bookmarks/${bookmarkId}`, {
    method: "DELETE",
  });
}

export function removeBookmarkByPaperId(paperId) {
  return apiRequest(`/bookmarks/papers/${paperId}`, {
    method: "DELETE",
  });
}

export function toggleBookmark(paperId) {
  return apiRequest(`/bookmarks/papers/${paperId}/toggle`, {
    method: "POST",
  });
}

export function checkPaperBookmarked(paperId) {
  return apiRequest(`/bookmarks/papers/${paperId}/exists`, {
    method: "GET",
  });
}