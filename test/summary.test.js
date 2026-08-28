import assert from "node:assert/strict";
import test from "node:test";
import { renderSummary, SummaryRendererValidationError } from "../src/summary.js";

const entry = (overrides = {}) => ({
  id: "book-001",
  title: "A book",
  status: "unread",
  priority: "normal",
  ...overrides
});

test("renders status counts and code-unit-sorted high-priority entries", () => {
  const result = renderSummary([
    entry({ id: "z", status: "completed", priority: "high", title: "Zed" }),
    entry({ id: "a", status: "reading", priority: "high", title: "Alpha" }),
    entry({ id: "m", status: "unread" }),
    entry({ id: "A", status: "completed", priority: "high", title: "Capital" })
  ]);

  assert.equal(result, [
    "unread: 1",
    "reading: 1",
    "completed: 2",
    "high priority:",
    "- A: Capital",
    "- a: Alpha",
    "- z: Zed"
  ].join("\n"));
});

test("renders an empty list with stable output", () => {
  assert.equal(renderSummary([]), [
    "unread: 0",
    "reading: 0",
    "completed: 0",
    "high priority:"
  ].join("\n"));
});

test("is deterministic and does not mutate input", () => {
  const input = [
    entry({ id: "b", priority: "high" }),
    entry({ id: "a", priority: "high" })
  ];
  const snapshot = structuredClone(input);

  const first = renderSummary(input);
  const second = renderSummary(input);

  assert.equal(first, second);
  assert.deepEqual(input, snapshot);
});

test("rejects entries that are not ReadingEntry values", () => {
  assert.throws(
    () => renderSummary([entry({ status: "todo" })]),
    (error) => error instanceof SummaryRendererValidationError
  );
  assert.throws(
    () => renderSummary([entry({ priority: "urgent" })]),
    (error) => error instanceof SummaryRendererValidationError
  );
  assert.throws(
    () => renderSummary([entry({ id: "same" }), entry({ id: "same" })]),
    (error) => error instanceof SummaryRendererValidationError
  );
});
