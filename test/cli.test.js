import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { tmpdir } from "node:os";

const execFileAsync = promisify(execFile);
const projectDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cliPath = resolve(projectDirectory, "bin/reading-list.js");
const fixturePath = resolve(projectDirectory, "data/reading-list.json");

test("summary normalizes fixture entries and renders deterministic output", async () => {
  const { stdout, stderr } = await execFileAsync(process.execPath, [cliPath, "summary"], {
    cwd: projectDirectory
  });

  assert.equal(stderr, "");
  assert.equal(stdout, [
    "unread: 1",
    "reading: 1",
    "completed: 1",
    "high priority:",
    "- book-001: A Philosophy of Software Design",
    "- book-003: The Pragmatic Programmer"
  ].join("\n") + "\n");
});

test("list remains unchanged and both commands leave the fixture untouched", async () => {
  const before = await readFile(fixturePath, "utf8");
  const { stdout } = await execFileAsync(process.execPath, [cliPath, "list"], {
    cwd: projectDirectory
  });
  await execFileAsync(process.execPath, [cliPath, "summary"], {
    cwd: projectDirectory
  });
  const after = await readFile(fixturePath, "utf8");

  assert.equal(stdout, [
    "book-001\tunread\tA Philosophy of Software Design",
    "book-002\treading\tDesigning Data-Intensive Applications",
    "book-003\tcompleted\tThe Pragmatic Programmer"
  ].join("\n") + "\n");
  assert.equal(after, before);
});

test("unknown commands fail with usage text", async () => {
  await assert.rejects(
    execFileAsync(process.execPath, [cliPath, "unknown"]),
    (error) => error.code === 1 && error.stderr === "Usage: reading-list <list|summary>\n"
  );
});

const invalidFixtures = [
  ["MISSING_ID", [{ title: "A book", status: "unread", priority: "normal" }]],
  ["DUPLICATE_ID", [
    { id: "same", title: "First", status: "unread", priority: "normal" },
    { id: "same", title: "Second", status: "reading", priority: "high" }
  ]],
  ["MISSING_TITLE", [{ id: "book-001", title: "", status: "unread", priority: "normal" }]],
  ["INVALID_STATUS", [{ id: "book-001", title: "A book", status: "paused", priority: "normal" }]],
  ["INVALID_PRIORITY", [{ id: "book-001", title: "A book", status: "unread", priority: "urgent" }]]
];

for (const [expectedCode, entries] of invalidFixtures) {
  test(`summary reports ${expectedCode} and does not modify its invalid fixture`, async () => {
    const temporaryDirectory = await mkdtemp(resolve(tmpdir(), "reading-list-cli-"));
    const temporaryFixture = resolve(temporaryDirectory, "invalid.json");
    const original = JSON.stringify(entries, null, 2) + "\n";
    await writeFile(temporaryFixture, original);

    try {
      await assert.rejects(
        execFileAsync(process.execPath, [cliPath, "summary"], {
          cwd: projectDirectory,
          env: { ...process.env, READING_LIST_FIXTURE_PATH: temporaryFixture }
        }),
        (error) => error.code === 1 && error.stderr.includes(expectedCode)
      );
      assert.equal(await readFile(temporaryFixture, "utf8"), original);
    } finally {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });
}

test("summary fails cleanly for malformed JSON without rewriting it", async () => {
  const temporaryDirectory = await mkdtemp(resolve(tmpdir(), "reading-list-cli-"));
  const temporaryFixture = resolve(temporaryDirectory, "malformed.json");
  const original = "{ not valid JSON\n";
  await writeFile(temporaryFixture, original);

  try {
    await assert.rejects(
      execFileAsync(process.execPath, [cliPath, "summary"], {
        cwd: projectDirectory,
        env: { ...process.env, READING_LIST_FIXTURE_PATH: temporaryFixture }
      }),
      (error) => error.code === 1 && error.stderr.length > 0
    );
    assert.equal(await readFile(temporaryFixture, "utf8"), original);
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});

test("summary fails cleanly when its fixture is missing", async () => {
  const missingFixture = resolve(tmpdir(), "reading-list-cli-missing-fixture.json");

  await assert.rejects(
    execFileAsync(process.execPath, [cliPath, "summary"], {
      cwd: projectDirectory,
      env: { ...process.env, READING_LIST_FIXTURE_PATH: missingFixture }
    }),
    (error) => error.code === 1 && error.stderr.length > 0
  );
});
