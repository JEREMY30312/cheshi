# INT-001 Summary Command Integration

## Identity and Scope

- Feature: `FEAT-READING-SUMMARY`
- Repository: `https://github.com/JEREMY30312/cheshi.git`
- Integration branch: `feature/reading-summary-integration-v2`
- Base package commit: `a13a80e22b07cd51d99fd76780b170196b3e9617`
- Integration Owner: `A Integration`
- Project Acceptor: `B Acceptor`
- Default Branch Merger: `C Default Branch Merger`
- Implementation authorization: granted by project owner instruction for MOD-001, MOD-002, and INT-001; main merge remains unauthorized.
- Documentation scope exception: the project owner authorized `README.md` and
  `package.json` updates solely to expose the implemented `summary` command;
  this exception changes no module contract or runtime behavior.

## Module Evidence Binding

The v2 integration snapshot contains the rebuilt module commits:

| Module | Final branch head | Implementation commit | Reviewer evidence commit |
| --- | --- | --- | --- |
| MOD-001 | v2 commit `16fedd3` | `16fedd3` | fresh receipt pending for the final snapshot |
| MOD-002 | v2 commit `f19f38a` | `f19f38a` | fresh receipt pending for the final snapshot |

The previous implementation snapshot `66c6f5b779b6a8768c5feaf461a93dc3b713d918`
was reviewed before the final evidence metadata corrections. It is historical
and does not authorize the current snapshot. A new independent Reviewer must
bind its receipt to the exact final HEAD after these corrections.

## Integration Behavior

`summary` loads the existing fixture, passes entries through `normalizeEntries`,
then passes the normalized values to `renderSummary`. `list` retains its
existing reader and renderer path. CLI failures print a concise diagnostic and
return a non-zero exit status; no input file is written.

## Checks

The integration evidence file records the exact commit and command outputs for
the completed checks. `main` remains unchanged and no PR is created by this
task.
