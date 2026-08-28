# INT-001 Integration Evidence (v2)

- Snapshot branch: `feature/reading-summary-integration-v2`
- Base package commit: `a13a80e22b07cd51d99fd76780b170196b3e9617`
- Contract/package SHA-256: `3a80db5877c901317f4afbb07d99856dd0d0591659a5f880b2d3820d0abb9516`
- Integration implementation commit: `c1dfd2a`
- Failure-path test commit: `16fc789`
- Current evidence snapshot must be bound by the accepting Reviewer to `git rev-parse HEAD` at review time.

| Check | Result |
| --- | --- |
| `npm test` | PASS: 25 tests passed, 0 failed |
| `npm run list` | PASS: baseline output |
| `node bin/reading-list.js summary` | PASS: deterministic output |
| `git diff --check` | PASS |

Independent integration Reviewer: `unknown` pending v2 review.
Project Acceptor: `unknown`. PR and `main` merge: not authorized or performed.
