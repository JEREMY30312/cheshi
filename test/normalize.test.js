import assert from "node:assert/strict";
import test from "node:test";
import { normalizeEntries, ReadingListValidationError } from "../src/normalize.js";

const entry = (overrides = {}) => ({
  id: "book-001",
  title: "A book",
  status: "todo",
  priority: "normal",
  ...overrides
});

test("maps legacy statuses and passes normalized statuses through", () => {
  const result = normalizeEntries([
    entry({ id: "a", status: "todo" }),
    entry({ id: "b", status: "unread" }),
    entry({ id: "c", status: "in_progress" }),
    entry({ id: "d", status: "reading" }),
    entry({ id: "e", status: "done" }),
    entry({ id: "f", status: "completed" })
  ]);

  assert.deepEqual(result.map(({ status }) => status), [
    "unread", "unread", "reading", "reading", "completed", "completed"
  ]);
});

test("returns fresh entries without mutating input", () => {
  const input = [entry({ status: "done" })];
  const snapshot = structuredClone(input);

  const result = normalizeEntries(input);

  assert.deepEqual(input, snapshot);
  assert.notStrictEqual(result, input);
  assert.notStrictEqual(result[0], input[0]);
  assert.deepEqual(result[0], { id: "book-001", title: "A book", status: "completed", priority: "normal" });
});

for (const [code, overrides] of [
  ["MISSING_ID", { id: "" }],
  ["DUPLICATE_ID", "duplicate"],
  ["MISSING_TITLE", { title: "   " }],
  ["INVALID_STATUS", { status: "paused" }],
  ["INVALID_PRIORITY", { priority: "urgent" }]
]) {
  test(`rejects ${code}`, () => {
    const input = overrides === "duplicate"
      ? [entry({ id: "same" }), entry({ id: "same" })]
      : [entry(overrides)];

    assert.throws(
      () => normalizeEntries(input),
      (error) => error instanceof ReadingListValidationError && error.code === code
    );
  });
}

test("accepts an empty input deterministically", () => {
  assert.deepEqual(normalizeEntries([]), []);
  assert.deepEqual(normalizeEntries([]), []);
});
