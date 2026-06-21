import { apiRequest } from "./api";

export function getReports(params = {}) {
  return apiRequest("/reports", {
    method: "GET",
    params,
  });
}

export function getReportById(reportId) {
  return apiRequest(`/reports/${reportId}`, {
    method: "GET",
  });
}

export function createReport(payload) {
  return apiRequest("/reports", {
    method: "POST",
    body: payload,
  });
}

export function updateReport(reportId, payload) {
  return apiRequest(`/reports/${reportId}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteReport(reportId) {
  return apiRequest(`/reports/${reportId}`, {
    method: "DELETE",
  });
}

export function generateReport(payload) {
  return apiRequest("/reports/generate", {
    method: "POST",
    body: payload,
  });
}

export function downloadReport(reportId, format = "pdf") {
  return apiRequest(`/reports/${reportId}/download`, {
    method: "GET",
    params: { format },
  });
}