export function renderSearchResults(entries) {
  return entries.map((entry) => `${entry.id}\t${entry.status}\t${entry.title}`).join("\n");
}
