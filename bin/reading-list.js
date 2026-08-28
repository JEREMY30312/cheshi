#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { loadEntries, renderList } from "../src/list.js";

const command = process.argv[2];

if (command !== "list") {
  console.error("Usage: reading-list list");
  process.exitCode = 1;
} else {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const fixturePath = resolve(currentDirectory, "../data/reading-list.json");
  const entries = await loadEntries(fixturePath);
  process.stdout.write(`${renderList(entries)}\n`);
}

