export function unwrapResponse(response) {
  if (!response) return response;

  if (response.data !== undefined) return response.data;
  if (response.result !== undefined) return response.result;
  if (response.payload !== undefined) return response.payload;
  if (response.body !== undefined) return response.body;

  return response;
}

export function toArray(response, keys = []) {
  const data = unwrapResponse(response);

  if (!data) return [];
  if (Array.isArray(data)) return data;

  const defaultKeys = [
    ...keys,
    "items",
    "content",
    "records",
    "results",
    "list",
    "data",
    "papers",
    "journals",
    "topics",
    "trends",
    "notifications",
    "reports",
    "users",
  ];

  for (const key of defaultKeys) {
    if (Array.isArray(data[key])) return data[key];
  }

  return [];
}

export function toObject(response) {
  const data = unwrapResponse(response);
  return data && typeof data === "object" && !Array.isArray(data) ? data : {};
}

export function toNumber(value, fallback = 0) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(toNumber(value));
}

export function formatDateTime(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatRelativeTime(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  const diffMs = date.getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / 60000);
  const absMinutes = Math.abs(diffMinutes);

  if (absMinutes < 1) return "Just now";
  if (absMinutes < 60) return `${absMinutes} minutes ago`;

  const absHours = Math.round(absMinutes / 60);
  if (absHours < 24) return `${absHours} hours ago`;

  const absDays = Math.round(absHours / 24);
  if (absDays < 7) return `${absDays} days ago`;

  return formatDateTime(value);
}

export function normalizePaper(paper = {}, index = 0) {
  return {
    id: paper.id ?? paper.paperId ?? paper.paper_id ?? paper.uuid ?? index,
    title: paper.title ?? paper.name ?? paper.paperTitle ?? "Untitled paper",
    source:
      paper.source ??
      paper.journalName ??
      paper.journal ??
      paper.publisher ??
      "Unknown source",
    authors: Array.isArray(paper.authors)
      ? paper.authors.join(", ")
      : paper.authors ?? paper.authorNames ?? paper.author ?? "",
    year:
      paper.year ??
      paper.publishedYear ??
      paper.publicationYear ??
      paper.publishYear ??
      "",
    tag: paper.tag ?? paper.type ?? paper.category ?? paper.documentType ?? "Paper",
    href: paper.href ?? paper.url ?? paper.link ?? paper.doiUrl ?? paper.doi ?? "",
    saved: Boolean(paper.saved ?? paper.bookmarked ?? paper.isBookmarked ?? false),
  };
}

export function normalizeJournal(journal = {}, index = 0) {
  return {
    id: journal.id ?? journal.journalId ?? journal.journal_id ?? journal.name ?? index,
    name: journal.name ?? journal.title ?? journal.journalName ?? "Untitled journal",
    publisher: journal.publisher ?? journal.publisherName ?? "Unknown publisher",
    subject: journal.subject ?? journal.field ?? journal.category ?? journal.topic ?? "General",
    quartile: journal.quartile ?? journal.rank ?? journal.qRank ?? "",
    impactFactor:
      journal.impactFactor ??
      journal.impact_factor ??
      journal.impact ??
      journal.ifScore ??
      "",
    openAccess: Boolean(journal.openAccess ?? journal.open_access ?? journal.isOpenAccess ?? false),
  };
}

export function normalizeTopic(topic = {}, index = 0) {
  const rawGrowth = topic.growth ?? topic.change ?? topic.growthRate ?? topic.percent ?? 0;
  const growthNumber = Number(rawGrowth);
  const growth = Number.isFinite(growthNumber)
    ? `${growthNumber >= 0 ? "+" : ""}${growthNumber}%`
    : String(rawGrowth || "");

  return {
    id: topic.id ?? topic.topicId ?? topic.topic_id ?? topic.name ?? index,
    name: topic.name ?? topic.topicName ?? topic.title ?? "Untitled topic",
    paperCount: `${formatNumber(
      topic.paperCount ?? topic.papers ?? topic.count ?? topic.total ?? 0,
    )} papers`,
    growth,
    score: toNumber(topic.score ?? topic.percentage ?? topic.percent ?? topic.value ?? 0),
  };
}

export function normalizeChartPoint(item = {}, index = 0) {
  return {
    label: String(item.label ?? item.year ?? item.month ?? item.name ?? index + 1),
    value: toNumber(item.value ?? item.count ?? item.total ?? item.amount ?? 0),
  };
}

export function normalizeReport(report = {}, index = 0) {
  return {
    id: report.id ?? report.reportId ?? report.report_id ?? index,
    title: report.title ?? report.name ?? "Untitled report",
    description: report.description ?? report.summary ?? "No description from backend.",
    period: report.period ?? report.range ?? report.dateRange ?? report.createdAt ?? "",
    format: String(report.format ?? report.fileType ?? report.type ?? "PDF").toUpperCase(),
    status: report.status ?? report.state ?? "Ready",
    downloadUrl: report.downloadUrl ?? report.url ?? report.fileUrl ?? "",
  };
}

export function normalizeNotification(notification = {}, index = 0) {
  let unread = false;

  if (notification.unread !== undefined) unread = Boolean(notification.unread);
  else if (notification.isUnread !== undefined) unread = Boolean(notification.isUnread);
  else if (notification.read !== undefined) unread = notification.read === false;
  else if (notification.isRead !== undefined) unread = notification.isRead === false;

  return {
    id: notification.id ?? notification.notificationId ?? notification.notification_id ?? index,
    title: notification.title ?? notification.subject ?? "Notification",
    message: notification.message ?? notification.content ?? notification.description ?? "",
    time:
      notification.time ??
      notification.createdAt ??
      notification.created_at ??
      notification.updatedAt ??
      "",
    unread,
    type: notification.type ?? notification.category ?? "default",
  };
}
