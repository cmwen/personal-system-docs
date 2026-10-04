# Personal System Graph documentation

Personal System Graph helps one owner understand their software ecosystem through
a user-curated graph supported by discovered evidence.

## Read first

- [Scope and delivery sequence](scope.md)
- [PRD — Draft](prd/personal-system-graph.md)
- [ADR-001 — Accepted for V0](adr/001-user-curated-graph.md)
- [Requirements and acceptance checks](requirements/index.md)

## Implementation design

- [Plan and decision summary](planning/index.md)
- [Technical design](design/technical-design.md)
- [AI-friendly repository design](design/ai-friendly-repository.md)
- [ADR-004 — confirmed home server and clients](adr/004-home-server-and-clients.md)
- [ADR-005 — proposed mixed stack and contracts](adr/005-mixed-stack-and-contracts.md)
- [ADR-006 — proposed agent-friendly product repository](adr/006-ai-friendly-product-repository.md)

## Working records

- [Documentation site](documentation-site.md)
- [Research register and template](research/index.md)
- [Output register and template](outputs/index.md)
- [Source provenance](sources.md)

## Current state

The two source records have been preserved verbatim. The requirements register
derives implementation checks from them; it does not imply implementation is
complete. Product research has not yet been performed, and no product code or
product deployment has been delivered. The Astro/Starlight documentation site is
built; see [OUT-002](outputs/OUT-002-astro-documentation-site.md).

Canonical documents now live in this repository's `docs/` directory. GitHub Actions
builds and publishes the site to [GitHub Pages](https://cmwen.dev/personal-system-docs/).
See [the publishing record](outputs/OUT-003-github-pages.md).
