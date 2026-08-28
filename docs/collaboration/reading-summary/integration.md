# INT-001 Summary Command Integration

## Identity and Scope

- Feature: `FEAT-READING-SUMMARY`
- Repository: `https://github.com/JEREMY30312/cheshi.git`
- Integration branch: `feature/reading-summary-integration`
- Base package commit: `a13a80e22b07cd51d99fd76780b170196b3e9617`
- Owner: `unknown` (must be assigned before project acceptance)
- Project Acceptor: `unknown`

## Module Evidence Binding

The integration branch contains the final heads of both worker branches:

| Module | Final branch head | Implementation commit | Reviewer evidence commit |
| --- | --- | --- | --- |
| MOD-001 | `a7eefb03fdfcb511a1819e983231ad22979c787a` | `79a992e70f4988f34e88237c60a6a16bb7a4c176` | Reviewer recorded in module handoff; final branch head includes handoff |
| MOD-002 | `97de54f83ab73279779645b65febadc0120bffb1` | `ea4355c1d31c80c239bc184ae470f3305933026a` | `5a705ba46fb84b9533cd726ebe7bd8e3e5783346` |

The final branch heads are the commits bound to this integration. Any later
change to module code, contract, or evidence requires re-running the relevant
review and updating this table.

## Integration Behavior

`summary` loads the existing fixture, passes entries through `normalizeEntries`,
then passes the normalized values to `renderSummary`. `list` retains its
existing reader and renderer path. CLI failures print a concise diagnostic and
return a non-zero exit status; no input file is written.

## Checks

The integration evidence file records the exact commit and command outputs for
the completed checks. `main` remains unchanged and no PR is created by this
task.
