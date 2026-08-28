# INT-001 Summary Command Integration

## Identity and Scope

- Feature: `FEAT-READING-SUMMARY`
- Repository: `https://github.com/JEREMY30312/cheshi.git`
- Integration branch: `feature/reading-summary-integration-v2`
- Base package commit: `a13a80e22b07cd51d99fd76780b170196b3e9617`
- Owner: implementation owner not assigned; Project Acceptance remains blocked
- Project Acceptor: `unknown`
- Implementation authorization: granted by project owner instruction for MOD-001, MOD-002, and INT-001; main merge remains unauthorized.
- Documentation scope exception: the project owner authorized `README.md` and
  `package.json` updates solely to expose the implemented `summary` command;
  this exception changes no module contract or runtime behavior.

## Module Evidence Binding

The v2 integration snapshot contains the rebuilt module commits:

| Module | Final branch head | Implementation commit | Reviewer evidence commit |
| --- | --- | --- | --- |
| MOD-001 | v2 commit `16fedd3` | `16fedd3` | v2 review receipt at `d177239` |
| MOD-002 | v2 commit `f19f38a` | `f19f38a` | v2 review receipt at `d177239` |

The current implementation snapshot reviewed by the independent Reviewer is
`d177239558798f4d1c8e2eb7fa30f7fab5c2372e`.

## Integration Behavior

`summary` loads the existing fixture, passes entries through `normalizeEntries`,
then passes the normalized values to `renderSummary`. `list` retains its
existing reader and renderer path. CLI failures print a concise diagnostic and
return a non-zero exit status; no input file is written.

## Checks

The integration evidence file records the exact commit and command outputs for
the completed checks. `main` remains unchanged and no PR is created by this
task.
