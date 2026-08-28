# INT-001 Integration Evidence (v2)

- Snapshot branch: `feature/reading-summary-integration-v2`
- Base package commit: `a13a80e22b07cd51d99fd76780b170196b3e9617`
- Contract/package SHA-256: `3a80db5877c901317f4afbb07d99856dd0d0591659a5f880b2d3820d0abb9516`
- Integration implementation commit: `c1dfd2a`
- Failure-path test commit: `16fc789`
- Independent Reviewer receipt: `/root/cheshi_v2_reviewer_terra`, reviewed commit `d177239558798f4d1c8e2eb7fa30f7fab5c2372e`.
- Current snapshot: `44a9c1792eb3eefb6f7444cf9d2e66f4dfc40db6`; this contains metadata-only corrections after the receipt and requires re-review before acceptance.

| Check | Result |
| --- | --- |
| `npm test` | PASS: 25 tests passed, 0 failed |
| `npm run list` | PASS: baseline output |
| `node bin/reading-list.js summary` | PASS: deterministic output |
| `git diff --check` | PASS |

Independent integration Reviewer: `/root/cheshi_v2_reviewer_terra`; prior conclusion: Reject on `d177239` pending metadata corrections. Current `44a9c17` has not yet received an independent re-review.
Project Acceptor: `unknown`. PR and `main` merge: not authorized or performed.
