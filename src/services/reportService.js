// Backend DashboardReportController chưa implement endpoint nào
export function getReports() {
  return Promise.resolve([]);
}

export function generateReport(params = {}) {
  return Promise.resolve(null);
}

export function downloadReport(url) {
  return url;
}
