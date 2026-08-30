import assert from "node:assert/strict";
import test from "node:test";
import { searchEntries } from "../src/search.js";

const entries = [
  { id: "first", title: "Alpha Reader", status: "unread", priority: "low" },
  { id: "second", title: "Beta Notes", status: "reading", priority: "high" },
  { id: "third", title: "alphabet soup", status: "completed", priority: "medium" }
];

test("trims only allowed ASCII edge whitespace", () => {
  assert.deepEqual(
    searchEntries(entries, "\u0009\u000A alpha reader \u000D"),
    [entries[0]]
  );
  assert.deepEqual(searchEntries([{ title: "  Alpha  " }], "Alpha"), [{ title: "  Alpha  " }]);
});

test("returns MISSING_QUERY for missing and empty queries", () => {
  assert.deepEqual(searchEntries(entries), { kind: "SearchError", code: "MISSING_QUERY" });
  assert.deepEqual(searchEntries(entries, ""), { kind: "SearchError", code: "MISSING_QUERY" });
  assert.deepEqual(searchEntries(entries, " \t\n\r"), { kind: "SearchError", code: "MISSING_QUERY" });
});

test("returns INVALID_QUERY for non-string queries", () => {
  for (const query of [null, 0, false, {}, []]) {
    assert.deepEqual(searchEntries(entries, query), { kind: "SearchError", code: "INVALID_QUERY" });
  }
});

test("matches title substrings case-insensitively", () => {
  assert.deepEqual(searchEntries(entries, "READER"), [entries[0]]);
  assert.deepEqual(searchEntries(entries, "alpha"), [entries[0], entries[2]]);
});

test("returns an empty array when there is no match", () => {
  assert.deepEqual(searchEntries(entries, "missing"), []);
});

test("preserves input order and entry identity", () => {
  assert.deepEqual(searchEntries(entries, "a"), [entries[0], entries[1], entries[2]]);
});

test("does not mutate entries or their titles", () => {
  const input = entries.map((entry) => ({ ...entry }));
  const before = structuredClone(input);

  searchEntries(input, "ALPHA");

  assert.deepEqual(input, before);
});

test("is deterministic", () => {
  const first = searchEntries(entries, "be");
  const second = searchEntries(entries, "be");

  assert.deepEqual(second, first);
});
