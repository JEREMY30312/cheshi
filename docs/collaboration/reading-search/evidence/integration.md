# FEAT-READING-LIST-SEARCH — INT-001 Evidence

```yaml
status: PASS
feature: FEAT-READING-LIST-SEARCH
integration_branch: feature/reading-list-search
integration_head: 7d0ad590c53ae31db042d87b9d6cf0f02f3ce125
base_commit: 59b4c6fb8e6e8bafba0bd92266bf62a176a1b10e
mod_001_head: 6904f4101f3995af15756118ecdd1e0bf3cff4f2
mod_002_head: f8d8e7712a6c13df415441de52a0bd2c5f5cd46f
package_sha256: sha256:7b061706889ad8afacf7dcc85b78ce9b03f0669d56c5d4d92f950ef6a604f65a
fixture_sha256: sha256:aa1d7488d81f71e4922d168909baa6985d896bc60e3e5fecd98a07900f68fb05
rollback_target: 59b4c6fb8e6e8bafba0bd92266bf62a176a1b10e
```

## Source and scope checks

- Both latest independent reviews are `PASS`.
- MOD-001 and MOD-002 were merged locally with no conflicts from the exact base.
- Imported module files and module tests match their reviewed branch heads; no
  module implementation path was edited during INT-001.
- Integration-only changed paths are `package.json`, `bin/reading-list.js`,
  `test/cli-search.test.js`, `docs/collaboration/reading-search/integration.md`,
  and this evidence file.
- No fixture, top-level workspace file, `main`, remote, PR, or GitHub state was
  modified.

## Commands and results

| Command | Result |
|---|---|
| `npm test` | 24 passed, 0 failed |
| `npm run list` | exit 0; three fixture rows in input order |
| `npm run search -- "book"` | exit 0; no title match; exactly one newline |
| `npm run search -- "not-in-fixture"` | exit 0; no match; exactly one newline |
| `npm run search -- ""` | exit 1; stderr `MISSING_QUERY` plus one newline |
| `npm run search -- "book" extra` | exit 1; stderr `INVALID_QUERY` plus one newline |
| malformed/unreadable input probes | exit 1; stderr `INPUT_ERROR` plus one newline |
| invalid entry-shape probe | rejected before rendering |
| fixture SHA-256 | `aa1d7488d81f71e4922d168909baa6985d896bc60e3e5fecd98a07900f68fb05` |
| `git diff --check` | pass; no output |

## Limitations and next gate

This is local INT-001 evidence only. It is not a project-level PASS, does not
authorize merging `main`, and does not establish semantic quality, Token or cost
savings, throughput, production readiness, or a CUT 02 C1/C2 sample. C must
review the final feature head, current receipts, this evidence, requirements,
and live GitHub protection/effective merge permission before any later gate.
