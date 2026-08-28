const STATUSES = ["unread", "reading", "completed"];
const PRIORITIES = new Set(["normal", "high"]);

export class SummaryRendererValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "SummaryRendererValidationError";
  }
}

function validateEntries(entries) {
  if (!Array.isArray(entries)) {
    throw new SummaryRendererValidationError("entries must be an array");
  }

  const seenIds = new Set();

  return entries.map((entry, index) => {
    if (!entry || typeof entry !== "object") {
      throw new SummaryRendererValidationError(`entry at index ${index} must be an object`);
    }
    if (typeof entry.id !== "string" || entry.id.trim().length === 0) {
      throw new SummaryRendererValidationError(`entry at index ${index} requires a non-empty string id`);
    }
    if (seenIds.has(entry.id)) {
      throw new SummaryRendererValidationError(`id ${entry.id} occurs more than once`);
    }
    seenIds.add(entry.id);
    if (typeof entry.title !== "string" || entry.title.trim().length === 0) {
      throw new SummaryRendererValidationError(`entry ${entry.id} requires a non-empty string title`);
    }
    if (!STATUSES.includes(entry.status)) {
      throw new SummaryRendererValidationError(`entry ${entry.id} has an invalid normalized status`);
    }
    if (!PRIORITIES.has(entry.priority)) {
      throw new SummaryRendererValidationError(`entry ${entry.id} has an invalid priority`);
    }
    return entry;
  });
}

/**
 * Render a deterministic summary for already-normalized ReadingEntry values.
 * Format: three count lines, then a high-priority section whose entries are
 * sorted by id using JavaScript's default UTF-16 code-unit ordering.
 */
export function renderSummary(entries) {
  const validatedEntries = validateEntries(entries);
  const counts = Object.fromEntries(STATUSES.map((status) => [status, 0]));

  for (const entry of validatedEntries) {
    counts[entry.status] += 1;
  }

  const highPriority = validatedEntries
    .filter((entry) => entry.priority === "high")
    .slice()
    .sort((left, right) => left.id < right.id ? -1 : left.id > right.id ? 1 : 0);

  const lines = [
    `unread: ${counts.unread}`,
    `reading: ${counts.reading}`,
    `completed: ${counts.completed}`,
    "high priority:"
  ];

  lines.push(...highPriority.map((entry) => `- ${entry.id}: ${entry.title}`));
  return lines.join("\n");
}
