# S2 Module Package Draft: Reading Summary

```yaml
package_version: module-package/v1-draft
status: proposed
feature_id: FEAT-READING-SUMMARY
baseline_commit: 59b4c6fb8e6e8bafba0bd92266bf62a176a1b10e
integration_branch: feature/reading-summary-integration-v2
default_branch: main
implementation_authorized: false
main_merge_status: blocked-pending-acceptance-and-remote-protection-check
```

## 1. Package authority and assignment rule

This package is a source-neutral draft, not an automatic build authorization.
For each implementation assignment, an Integration Owner records the exact
commit containing this package as the worker's `base_commit`. A worker must
stop if its local starting commit, assigned paths, contract digest, or role is
missing or stale.

The S1 specification defines product intent. This package defines technical
boundaries and must not replace product acceptance.

## 2. Frozen shared contract

### Normalized entry

```text
ReadingEntry
  id: non-empty string, unique in the list
  title: non-empty string
  status: unread | reading | completed
  priority: normal | high
```

### Module interface

```text
normalizeEntries(rawEntries) -> ReadingEntry[] | throws ReadingListValidationError
renderSummary(entries: ReadingEntry[]) -> string
```

`normalizeEntries` owns legacy-status interpretation. `renderSummary` accepts
only normalized entries and must not reinterpret legacy status names.

`ReadingListValidationError.code` values are `MISSING_ID`, `DUPLICATE_ID`,
`MISSING_TITLE`, `INVALID_STATUS`, and `INVALID_PRIORITY`. Error wording may
be improved without changing these codes.

### Summary output

The normalized status counts appear in this fixed order: `unread`, `reading`,
`completed`. High-priority entries are sorted by `id` using JavaScript string
code-unit order and rendered one per line. The final headings and empty-list
wording are part of the integration test fixture and need Project Acceptor
confirmation before merge to `main`.

## 3. Modules

### MOD-001: Status Normalizer

| Field | Value |
|---|---|
| Goal | Convert raw entries to `ReadingEntry[]` and reject invalid data. |
| Depends on | Frozen contract only. |
| Allowed paths | `src/normalize.js`, `test/normalize.test.js`, `docs/collaboration/reading-summary/handoffs/MOD-001.md` |
| Forbidden paths | `bin/`, `data/`, `src/list.js`, `src/summary.js`, `test/summary.test.js`, `test/cli.test.js`, package documents, other evidence. |
| Independent checks | Supported mappings, normalized pass-through, all five validation codes, deterministic output. |
| Implementer | `unknown` |
| Reviewer | `unknown`, must differ from Implementer. |

### MOD-002: Summary Renderer

| Field | Value |
|---|---|
| Goal | Render counts and high-priority entries from normalized data. |
| Depends on | Frozen contract and fixture-shaped normalized entries only. |
| Allowed paths | `src/summary.js`, `test/summary.test.js`, `docs/collaboration/reading-summary/handoffs/MOD-002.md` |
| Forbidden paths | `bin/`, `data/`, `src/list.js`, `src/normalize.js`, `test/normalize.test.js`, `test/cli.test.js`, package documents, other evidence. |
| Independent checks | Fixed count order, ID sorting, empty input, byte-for-byte stable output. |
| Implementer | `unknown` |
| Reviewer | `unknown`, must differ from Implementer. |

### INT-001: Summary Command Integration

| Field | Value |
|---|---|
| Goal | Connect the existing input reader, normalizer, renderer, and `summary` CLI command. |
| Depends on | MOD-001 and MOD-002 accepted reviews. |
| Allowed paths | `bin/reading-list.js`, `test/cli.test.js`, `docs/collaboration/reading-summary/integration.md`, `docs/collaboration/reading-summary/evidence/integration.md` |
| Forbidden paths | Module-owned paths unless a new approved package supersedes this one. |
| Owner | `unknown`, must not be a current module Implementer. |
| Checks | `npm test`, `npm run list`, summary CLI success and failure paths, fixture non-mutation. |

## 4. Dependency and branch flow

```text
S1 spec + S2 package
        |
        +--> MOD-001 -- independent review --+
        |                                     |
        +--> MOD-002 -- independent review --+--> INT-001 on feature/reading-summary-integration-v2
                                                       |
                                              Project acceptance
                                                       |
                                           PR to main, manual merge only
```

MOD-001 and MOD-002 may start in parallel from the exact assigned package
commit. Each module opens a PR to `feature/reading-summary-integration-v2`, never
directly to `main`. INT-001 begins only after both module reviews pass.

## 5. Evidence and stale rules

Each module handoff records: repository, integration branch, `base_commit`,
result commit, changed files, commands and exit results, contract digest,
known limitations, rollback target, Implementer identity, and Reviewer
identity.

Evidence becomes stale when its base commit, result commit, contract digest,
assigned paths, role identity, or required check result changes. A stale item
cannot be accepted without a new review.

The first rollback target is the verified baseline commit
`59b4c6fb8e6e8bafba0bd92266bf62a176a1b10e`. Recovery uses a revert or a new
branch from that SHA; force-pushing or rewriting shared history is forbidden.

## 6. Gates and stop conditions

Do not assign code work when any of these are true:

- the exact package commit is absent;
- a role is `unknown` or an Implementer is also its Reviewer or Project
  Acceptor;
- allowed paths overlap or a shared file has no owner;
- the contract is changed without a new package digest and review;
- existing `npm test` or `npm run list` fails at the assigned base;
- a hidden dependency requires database, network, credentials, code generation,
  public API change, or irreversible side effect;
- the remote default-branch protection and required-check facts are unknown at
  the moment of a proposed `main` merge.

The last condition permits local and feature-branch validation, but keeps the
formal `main` merge gate `BLOCKED`.

## 7. Remaining unknowns

- Implementer, Reviewer, Integration Owner, Project Acceptor, and Merger;
- GitHub branch protection, required checks, CODEOWNERS, and account rights;
- the final package commit and its digest;
- final summary wording accepted by the Project Acceptor.
