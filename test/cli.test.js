import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

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
