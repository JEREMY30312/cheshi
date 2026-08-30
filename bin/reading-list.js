#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { loadEntries, renderList } from "../src/list.js";
import { searchEntries } from "../src/search.js";
import { renderSearchResults } from "../src/render-search.js";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const fixturePath = resolve(currentDirectory, "../data/reading-list.json");

function hasReadingEntryShape(entry) {
  return entry !== null &&
    typeof entry === "object" &&
    !Array.isArray(entry) &&
    typeof entry.id === "string" &&
    typeof entry.title === "string" &&
    typeof entry.status === "string" &&
    typeof entry.priority === "string";
}

export function validateReadingEntries(entries) {
  if (!Array.isArray(entries) || entries.some((entry) => !hasReadingEntryShape(entry))) {
    throw new Error("Invalid reading list entry shape.");
  }

  return entries;
}

export async function runSearch(queryArgs, inputPath = fixturePath) {
  let entries;

  try {
    entries = validateReadingEntries(await loadEntries(inputPath));
  } catch {
    return { exitCode: 1, stdout: "", stderr: "INPUT_ERROR\n" };
  }

  const query = queryArgs.length === 0
    ? undefined
    : queryArgs.length === 1
      ? queryArgs[0]
      : null;
  const result = searchEntries(entries, query);

  if (result?.kind === "SearchError") {
    return { exitCode: 1, stdout: "", stderr: `${result.code}\n` };
  }

  return { exitCode: 0, stdout: `${renderSearchResults(result)}\n`, stderr: "" };
}

async function main() {
  const command = process.argv[2];

  if (command === "list") {
    const entries = await loadEntries(fixturePath);
    process.stdout.write(`${renderList(entries)}\n`);
    return;
  }

  if (command === "search") {
    const outcome = await runSearch(process.argv.slice(3));
    process.stdout.write(outcome.stdout);
    process.stderr.write(outcome.stderr);
    process.exitCode = outcome.exitCode;
    return;
  }

  console.error("Usage: reading-list list | search <query>");
  process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
