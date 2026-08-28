# Reading List CLI Fixture

This repository is an intentionally small, offline baseline for validating a
single-repository collaboration workflow. It currently supports only `list`.

## Commands

```sh
npm run list
npm test
```

The command reads the checked-in fixture at `data/reading-list.json`. It makes
no network requests and does not modify the fixture.

## Baseline Boundary

This initial baseline does not include state normalization, summaries, or a
`summary` command. Those are reserved for a later collaboration validation
feature with separately assigned modules and reviews.

