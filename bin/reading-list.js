#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { loadEntries, renderList } from "../src/list.js";
import { normalizeEntries } from "../src/normalize.js";
import { renderSummary } from "../src/summary.js";

const command = process.argv[2];

if (command !== "list" && command !== "summary") {
  console.error("Usage: reading-list <list|summary>");
  process.exitCode = 1;
} else {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const fixturePath = process.env.READING_LIST_FIXTURE_PATH
    ? resolve(process.env.READING_LIST_FIXTURE_PATH)
    : resolve(currentDirectory, "../data/reading-list.json");
  try {
    const entries = await loadEntries(fixturePath);
    const output = command === "summary"
      ? renderSummary(normalizeEntries(entries))
      : renderList(entries);
    process.stdout.write(`${output}\n`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
