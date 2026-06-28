import { apiRequest } from "./api";

// Backend BookmarkController chưa implement — các call này sẽ fail gracefully
export function getBookmarkedPapers() {
  return apiRequest("/bookmarks", { method: "GET" });
}

export function addBookmark(paperId) {
  return apiRequest("/bookmarks", { method: "POST", body: { paperId } });
}

export function removeBookmark(bookmarkId) {
  return apiRequest(`/bookmarks/${bookmarkId}`, { method: "DELETE" });
}

export function removeBookmarkByPaperId(paperId) {
  return apiRequest(`/bookmarks/paper/${paperId}`, { method: "DELETE" });
}

export function toggleBookmark(paperId, currentlySaved) {
  if (currentlySaved) {
    return removeBookmarkByPaperId(paperId);
  }
  return addBookmark(paperId);
}
