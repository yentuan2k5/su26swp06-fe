import { apiRequest } from "./api";

// Backend DashboardReportController chưa implement
export function getReports() {
  return apiRequest("/reports");
}

export function generateReport(params = {}) {
  return apiRequest("/reports/generate", { method: "POST", body: params });
}

export function downloadReport(url) {
  return url;
}
