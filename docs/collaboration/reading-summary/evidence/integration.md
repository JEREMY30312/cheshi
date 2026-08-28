# INT-001 Integration Evidence (v2)

- Snapshot branch: `feature/reading-summary-integration-v2`
- Base package commit: `a13a80e22b07cd51d99fd76780b170196b3e9617`
- Contract/package SHA-256: `3a80db5877c901317f4afbb07d99856dd0d0591659a5f880b2d3820d0abb9516`
- Integration implementation commit: `c1dfd2a`
- Failure-path test commit: `16fc789`
- Independent Reviewer receipt: `/root/cheshi_v2_reviewer_terra`, reviewed commit `d177239558798f4d1c8e2eb7fa30f7fab5c2372e`.
- Reviewer-receipt SHA correction: the reviewed commit is `d177239558798f4d8c1e2eb7fa30f7fab5c2372e`.

| Check | Result |
| --- | --- |
| `npm test` | PASS: 25 tests passed, 0 failed |
| `npm run list` | PASS: baseline output |
| `node bin/reading-list.js summary` | PASS: deterministic output |
| `git diff --check` | PASS |

Independent integration Reviewer: `/root/cheshi_v2_reviewer_terra`; prior conclusion: Reject on `d177239` pending metadata corrections. This metadata snapshot requires a final independent review.
Integration Owner: `A Integration`. Project Acceptor: `B Acceptor`. Default Branch Merger: `C Default Branch Merger`. PR and `main` merge: not authorized or performed.

The project owner later authorized a documentation-only scope exception for
`README.md` and a `npm run summary` script entry in `package.json`. The next
independent review must include that commit before acceptance.
