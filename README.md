# Reading List CLI Fixture

This repository is an intentionally small, offline baseline for validating a
single-repository collaboration workflow. It supports `list` and the
reading-summary validation feature's `summary` command.

## Commands

```sh
npm run list
npm run summary
npm test
```

The command reads the checked-in fixture at `data/reading-list.json`. It makes
no network requests and does not modify the fixture.

## Baseline Boundary

The reading-summary validation feature adds state normalization and a
deterministic `summary` command. It remains on an integration branch pending
independent review and Project Acceptor approval; it has not been merged to
`main`.
