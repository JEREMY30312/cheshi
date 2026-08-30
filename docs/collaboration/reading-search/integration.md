# FEAT-READING-LIST-SEARCH — INT-001 Integration

## Scope

INT-001 integrates the independently reviewed MOD-001 query matcher and MOD-002
renderer on `feature/reading-list-search`. The CLI owns command-argument
cardinality, fixture loading, entry-shape validation, stable stderr error codes,
and the single trailing newline required for successful output.

Only the authorized integration paths were changed:

- `package.json`
- `bin/reading-list.js`
- `test/cli-search.test.js`
- this document
- `docs/collaboration/reading-search/evidence/integration.md`

The module implementation and module tests were imported without edits. No
network, credentials, generated files, fixture changes, push, PR, GitHub action,
or `main` action was performed.

## Boundary behavior

- `npm run search -- "query"` reads the checked-in JSON fixture.
- Query matching is delegated to `searchEntries`; formatting is delegated to
  `renderSearchResults`.
- Missing or ASCII-empty queries emit `MISSING_QUERY` and exit non-zero.
- Extra query arguments emit `INVALID_QUERY` and exit non-zero.
- Malformed, unreadable, or invalid-shape input emits `INPUT_ERROR` and exits
  non-zero.
- A no-match search exits successfully and emits exactly one newline.
- Matching rows preserve fixture order and use `id<TAB>status<TAB>title`.
