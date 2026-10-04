# Product ideas and model extensions

**Status:** Living idea register  
**Updated:** 2026-10-04

Capture ideas before implementing them. Owner requests describe desired product
coverage; example schemas, interaction designs, and release assignments remain
proposals until decided. Original PRD and accepted ADR snapshots are preserved.

| ID | Idea | Owner intent | Modeling / release state |
| --- | --- | --- | --- |
| IDEA-001 | [OAuth client inventory and edge references](IDEA-001-oauth-clients.md) | Track OAuth clients as part of the personal system; clients may be used on graph edges | Captured; representation and release assignment open |
| IDEA-002 | [KeePass and standalone data-layer nodes](IDEA-002-keepass-data-layer.md) | KeePass is an important personal-system resource; a single node with no dependencies is valid | Captured; precise resource identity and release assignment open |

## Shared implication

A useful personal-system map includes important resources even when they have no
source repository, running process, discovered provider, or known dependency.
Authentication context can describe a relationship, while a data-layer resource
can be meaningful as a disconnected node. Graph completeness must not be measured
only by discovered software or node degree.

These ideas are not a decision to add new entity kinds, OAuth flows, secret
storage, KeePass file parsing, or provider integrations to V0. The five accepted
entity kinds still form the implementation baseline; model changes require an
explicit follow-up decision. Manual standalone System nodes already fit that
baseline, while specialized inventory behavior may extend it.

## Idea record template

```markdown
# IDEA-NNN: Title
Status: Captured / Exploring / Decided / Deferred
Captured date and owner source:
Owner intent:
Why this matters:
Illustrative graph behavior:
Candidate metadata and relationships:
Candidate acceptance checks:
Open questions:
Scope/release decision:
Related requirements, ideas, research, and ADRs:
```
