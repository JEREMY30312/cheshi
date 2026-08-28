# INT-001 Integration Evidence (v2)

- Snapshot branch: `feature/reading-summary-integration-v2`
- Base package commit: `a13a80e22b07cd51d99fd76780b170196b3e9617`
- Contract/package SHA-256: `3a80db5877c901317f4afbb07d99856dd0d0591659a5f880b2d3820d0abb9516`
- Historical integration check commit: `c1dfd2a`
- Historical failure-path test commit: `16fc789`
- Independent Reviewer receipt: pending for the final snapshot after metadata correction.

| Check | Result |
| --- | --- |
| `npm test` | PASS: 25 tests passed, 0 failed |
| `npm run list` | PASS: baseline output |
| `node bin/reading-list.js summary` | PASS: deterministic output |
| `git diff --check` | PASS |

The historical Reviewer conclusion on `66c6f5b` was superseded because the
evidence and handoff metadata changed afterward. A fresh review must record its
exact target commit outside this historical check table before main-PR entry.
Integration Owner: `A Integration`. Project Acceptor: `B Acceptor`. Default Branch Merger: `C Default Branch Merger`. PR and `main` merge: not authorized or performed.

The project owner authorized a documentation-only scope exception for
`README.md` and a `npm run summary` script entry in `package.json`; those
changes are already included in the v2 snapshot. No PR or main merge is
authorized.
