import { apiRequest } from "./api";

// GET /api/bookmarks → returns List<BookmarkResponse>
export function getBookmarkedPapers() {
  return apiRequest("/bookmarks", { method: "GET" });
}

// POST /api/bookmarks/{paperId}
export function addBookmark(paperId) {
  return apiRequest(`/bookmarks/${paperId}`, { method: "POST" });
}

// DELETE /api/bookmarks/{paperId}
export function removeBookmark(paperId) {
  return apiRequest(`/bookmarks/${paperId}`, { method: "DELETE" });
}

// DELETE /api/bookmarks/{paperId} (in BE, delete is by paperId)
export function removeBookmarkByPaperId(paperId) {
  return apiRequest(`/bookmarks/${paperId}`, { method: "DELETE" });
}

// GET /api/bookmarks/check/{paperId} → returns Map<String, Boolean>
export function checkBookmarked(paperId) {
  return apiRequest(`/bookmarks/check/${paperId}`, { method: "GET" });
}

export function toggleBookmark(paperId, currentlySaved) {
  if (currentlySaved) {
    return removeBookmarkByPaperId(paperId);
  }
  return addBookmark(paperId);
}
