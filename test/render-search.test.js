import assert from "node:assert/strict";
import test from "node:test";
import { renderSearchResults } from "../src/render-search.js";

const entries = [
  { id: "book-001", status: "unread", title: "A Philosophy of Software Design", priority: "high" },
  { id: "book-002", status: "reading", title: "设计数据密集型应用", priority: "medium" },
  { id: "book-003", status: "completed", title: "The Pragmatic Programmer", priority: "low" }
];

test("renders an empty result as an empty string", () => {
  assert.equal(renderSearchResults([]), "");
});

test("renders a single result without a trailing newline", () => {
  assert.equal(renderSearchResults([entries[0]]), "book-001\tunread\tA Philosophy of Software Design");
});

test("renders multiple results in input order with tab-separated columns", () => {
  assert.equal(
    renderSearchResults(entries),
    "book-001\tunread\tA Philosophy of Software Design\n" +
      "book-002\treading\t设计数据密集型应用\n" +
      "book-003\tcompleted\tThe Pragmatic Programmer"
  );
});

test("preserves Unicode titles and produces byte-stable output", () => {
  const result = renderSearchResults([entries[1]]);

  assert.equal(result, "book-002\treading\t设计数据密集型应用");
  assert.equal(Buffer.from(result, "utf8").toString("hex"), "626f6f6b2d3030320972656164696e6709e8aebee8aea1e695b0e68daee5af86e99b86e59e8be5ba94e794a8");
  assert.equal(renderSearchResults([entries[1]]), result);
});

test("does not mutate the input entries", () => {
  const input = entries.map((entry) => ({ ...entry }));
  const before = structuredClone(input);

  renderSearchResults(input);

  assert.deepEqual(input, before);
});

test("does not add a trailing newline", () => {
  const result = renderSearchResults(entries);

  assert.notEqual(result.endsWith("\n"), true);
  assert.notEqual(result.endsWith("\r"), true);
});
