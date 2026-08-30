import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { runSearch, validateReadingEntries } from "../bin/reading-list.js";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const cliPath = resolve(testDirectory, "../bin/reading-list.js");

function runCli(...args) {
  return spawnSync(process.execPath, [cliPath, ...args], { encoding: "utf8" });
}

test("searches fixture titles case-insensitively and preserves list order", () => {
  const result = runCli("search", "DESIGN");

  assert.equal(result.status, 0);
  assert.equal(result.stderr, "");
  assert.equal(
    result.stdout,
    "book-001\tunread\tA Philosophy of Software Design\n" +
      "book-002\treading\tDesigning Data-Intensive Applications\n"
  );
});

test("no match succeeds with exactly one newline and no rows", () => {
  const result = runCli("search", "not-in-fixture");

  assert.equal(result.status, 0);
  assert.equal(result.stdout, "\n");
  assert.equal(result.stderr, "");
});

test("missing and empty queries report MISSING_QUERY", () => {
  for (const args of [["search"], ["search", ""]]) {
    const result = runCli(...args);

    assert.equal(result.status, 1);
    assert.equal(result.stdout, "");
    assert.equal(result.stderr, "MISSING_QUERY\n");
  }
});

test("extra query arguments report INVALID_QUERY", () => {
  const result = runCli("search", "book", "extra");

  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.equal(result.stderr, "INVALID_QUERY\n");
});

test("malformed and unreadable input report INPUT_ERROR", async () => {
  const malformed = await runSearch(["book"], "/dev/null");
  const unreadable = await runSearch(["book"], "/path/that/does/not/exist/reading-list.json");

  assert.deepEqual(malformed, { exitCode: 1, stdout: "", stderr: "INPUT_ERROR\n" });
  assert.deepEqual(unreadable, { exitCode: 1, stdout: "", stderr: "INPUT_ERROR\n" });
});

test("invalid entry shapes are rejected before rendering", () => {
  assert.throws(
    () => validateReadingEntries([{ id: "book-001", title: "Only a title" }]),
    /Invalid reading list entry shape/
  );
});

test("list command remains available", () => {
  const result = runCli("list");

  assert.equal(result.status, 0);
  assert.equal(result.stderr, "");
  assert.match(result.stdout, /^book-001\tunread\tA Philosophy of Software Design\n/);
});
