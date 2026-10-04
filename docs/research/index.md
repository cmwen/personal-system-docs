# Research register

[RES-007](RES-007-implementation-stack.md) records source-grounded stack research.
The remaining questions distinguish confirmed owner direction from unverified
implementation details.

| ID | Question | Related requirements | Status |
| --- | --- | --- | --- |
| RES-001 | What rules normalize Git remotes and handle forks, local-only repos, and ambiguous matches? | REQ-003, REQ-004 | Open |
| RES-002 | How should remote machines be scanned, authenticated, and bounded? | REQ-005, REQ-011 | Open |
| RES-003 | Which client architecture supports graph editing, local persistence, and navigation? | REQ-001, REQ-008, REQ-013, REQ-014 | Topology confirmed in ADR-004; framework proposals in ADR-005 |
| RES-004 | Which graph/layout approach supports semantic zoom and stable user positioning? | REQ-008, REQ-009 | Open |
| RES-005 | What provider contract and LocalLink identity mapping preserve authority and freshness? | REQ-006, REQ-007, REQ-011 | Open |
| RES-006 | What documentation framework and access model fit the site brief? | Documentation site brief | Resolved in ADR-002/003 |
| RES-007 | [Mixed stack and implementation boundaries](RES-007-implementation-stack.md) | REQ-001, 005, 008–015, 018, 019 | Desk research complete; prototypes remain |

## Research record template

Create `RES-NNN-short-title.md` and link it in this register.

```markdown
# RES-NNN: Title
Date:
Status: Open / In progress / Complete
Question:
Related requirement IDs and ADRs:
Sources: URLs/files, source dates, access dates
Findings: distinguish source facts from inference
Options and tradeoffs:
Uncertainty and evidence gaps:
Recommendation: advisory until accepted
Decision or follow-up ADR:
```
