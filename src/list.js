import { readFile } from "node:fs/promises";

export async function loadEntries(filePath) {
  const raw = await readFile(filePath, "utf8");
  const entries = JSON.parse(raw);

  if (!Array.isArray(entries)) {
    throw new Error("Reading list fixture must contain an array.");
  }

  return entries;
}

export function renderList(entries) {
  return entries.map((entry) => `${entry.id}\t${entry.status}\t${entry.title}`).join("\n");
}

