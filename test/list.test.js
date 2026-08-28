import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { loadEntries, renderList } from "../src/list.js";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const fixturePath = resolve(testDirectory, "../data/reading-list.json");

test("loads the checked-in reading list fixture", async () => {
  const entries = await loadEntries(fixturePath);

  assert.equal(entries.length, 3);
  assert.deepEqual(entries[0], {
    id: "book-001",
    title: "A Philosophy of Software Design",
    status: "unread",
    priority: "high"
  });
});

test("renders entries in fixture order with stable columns", async () => {
  const entries = await loadEntries(fixturePath);

  assert.equal(
    renderList(entries),
    "book-001\tunread\tA Philosophy of Software Design\n" +
      "book-002\treading\tDesigning Data-Intensive Applications\n" +
      "book-003\tcompleted\tThe Pragmatic Programmer"
  );
});

test("loading and listing do not modify the fixture", async () => {
  const before = await readFile(fixturePath, "utf8");
  const entries = await loadEntries(fixturePath);
  renderList(entries);
  const after = await readFile(fixturePath, "utf8");

  assert.equal(after, before);
});
