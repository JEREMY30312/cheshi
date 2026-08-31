const ASCII_EDGE_WHITESPACE = /^[\u0009-\u000D\u0020]+|[\u0009-\u000D\u0020]+$/g;

function trimQuery(value) {
  return value.replace(ASCII_EDGE_WHITESPACE, "");
}

export function searchEntries(entries, query) {
  if (query === undefined || (typeof query === "string" && trimQuery(query) === "")) {
    return { kind: "SearchError", code: "MISSING_QUERY" };
  }

  if (typeof query !== "string") {
    return { kind: "SearchError", code: "INVALID_QUERY" };
  }

  const normalizedQuery = trimQuery(query).toLowerCase();
  return entries.filter(
    (entry) => typeof entry?.title === "string" && entry.title.toLowerCase().includes(normalizedQuery)
  );
}
