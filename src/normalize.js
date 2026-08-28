const STATUS_MAP = new Map([
  ["todo", "unread"],
  ["unread", "unread"],
  ["reading", "reading"],
  ["in_progress", "reading"],
  ["done", "completed"],
  ["completed", "completed"]
]);

const VALID_PRIORITIES = new Set(["normal", "high"]);

export class ReadingListValidationError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "ReadingListValidationError";
    this.code = code;
  }
}

function validationError(code, detail) {
  return new ReadingListValidationError(code, `${code}: ${detail}`);
}

export function normalizeEntries(rawEntries) {
  if (!Array.isArray(rawEntries)) {
    throw validationError("MISSING_ID", "entries must be an array");
  }

  const seenIds = new Set();

  return rawEntries.map((entry, index) => {
    const id = entry && entry.id;
    if (typeof id !== "string" || id.trim() === "") {
      throw validationError("MISSING_ID", `entry at index ${index} requires a non-empty string id`);
    }
    if (seenIds.has(id)) {
      throw validationError("DUPLICATE_ID", `id ${id} occurs more than once`);
    }
    seenIds.add(id);

    const title = entry && entry.title;
    if (typeof title !== "string" || title.trim() === "") {
      throw validationError("MISSING_TITLE", `entry ${id} requires a non-empty string title`);
    }

    const status = entry && entry.status;
    const normalizedStatus = STATUS_MAP.get(status);
    if (!normalizedStatus) {
      throw validationError("INVALID_STATUS", `entry ${id} has unsupported status ${String(status)}`);
    }

    const priority = entry && entry.priority;
    if (!VALID_PRIORITIES.has(priority)) {
      throw validationError("INVALID_PRIORITY", `entry ${id} has unsupported priority ${String(priority)}`);
    }

    return { id, title, status: normalizedStatus, priority };
  });
}
