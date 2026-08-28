# S1 Feature Specification: Reading Summary

```yaml
spec_version: reading-summary-s1/v0.1
status: proposed
requirement_type: synthetic-product-requirement
feature_id: FEAT-READING-SUMMARY
repository: https://github.com/JEREMY30312/cheshi.git
baseline_commit: 59b4c6fb8e6e8bafba0bd92266bf62a176a1b10e
implementation_authorized: false
```

## Goal

Add an offline `summary` command to the existing reading-list CLI. It must
normalize supported legacy statuses, report counts for normalized statuses, and
list high-priority entries without changing the existing `list` behavior or
the checked-in input fixture.

## Users and scenario

A local CLI user runs `summary` to see the state of their reading list without
network access, a database, credentials, or changes to their source data.

## Scope

In scope:

- status normalization for the checked-in reading-list data;
- deterministic textual summary output;
- unit tests, CLI integration tests, and regression coverage for `list`;
- module, review, integration, acceptance, and rollback evidence.

Out of scope:

- database migrations, network requests, external APIs, authentication, Web UI,
  source-data writes, automatic PR creation, automatic merging, and production
  deployment.

## Business rules

| Input status | Normalized status |
|---|---|
| `todo`, `unread` | `unread` |
| `reading`, `in_progress` | `reading` |
| `done`, `completed` | `completed` |

- Every entry requires a unique, non-empty string `id` and a non-empty string
  `title`.
- Unknown statuses, duplicate IDs, missing IDs, and missing titles are errors.
- A rejected input must produce a non-zero CLI exit and must not modify input
  data.
- The summary reports counts for `unread`, `reading`, and `completed`.
- The summary lists high-priority entries in a stable order.
- The same input must produce the same output.

## Business acceptance

| ID | Acceptance condition |
|---|---|
| AC-001 | Supported legacy statuses map to the stated normalized values. |
| AC-002 | Invalid status, duplicate ID, missing ID, and missing title fail clearly. |
| AC-003 | `summary` returns stable counts and stable high-priority output. |
| AC-004 | Empty input has explicit stable output. |
| AC-005 | The input fixture is unchanged after successful and failed operations. |
| AC-006 | The existing `npm run list` behavior remains unchanged. |
| AC-007 | All checks run offline with no production credentials or external services. |

## Open product decisions

- The package defines technical output formatting, but a Project Acceptor must
  confirm the final user-facing wording before a default-branch PR is merged.
- The feature is synthetic: passing it validates a controlled collaboration
  workflow, not real product-market need or large-team throughput.
