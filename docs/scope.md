# Scope

Recorded 2026-10-04. Sources: [Draft PRD](prd/personal-system-graph.md) and
[accepted ADR-001](adr/001-user-curated-graph.md).

## Product and user

Personal System Graph is a visual, local-first control surface for a single owner
to understand logical systems, source repositories, working copies, machines,
and running instances. The graph is the primary interface; search helps navigate
it. The user owns intended architecture, while discovery supplies evidence.

## Confirmed deployment direction

[ADR-004](adr/004-home-server-and-clients.md) records the owner's later direction:
a home-network server owns graph data and SQLite; GPUI desktop edits; Rust
scanners report machine-local observations; a server-hosted mobile PWA is
read-only and accessed through Tailscale. Clients need the server for fresh data
and authoritative edits. TypeScript server and web framework choices are
proposals in [ADR-005](adr/005-mixed-stack-and-contracts.md).

## V0 includes

- Five entity kinds: System, Repository, Checkout, Machine, Runtime.
- Recursive system grouping and first-class manual relationships.
- GitHub personal/organization import; remote identity normalization, explicit
  ambiguity resolution, canonical remote selection, and multiple checkouts.
- Configured local/remote filesystem scanning and LocalLink runtime import.
- Persisted graph and separately persisted layout using SQLite.
- Design, Reality, and Combined lenses; provenance and freshness indicators.
- Graph dashboard, semantic zoom, manual node/group/edge editing, inspector,
  global search, and navigation to relevant source/runtime tools.
- Pull-based discovery; manual scanning and possibly scanning on application open.

## V0 excludes

Automatic infrastructure mutation, AI-driven changes, full Cloudflare integration,
GitHub Pages deployment discovery beyond basic repository metadata,
OpenConnector/Google topology, telemetry/tracing analytics, security policy
engines, health scoring, cost analysis, multi-user collaboration, continuous
real-time scanning, and file/package-level dependency graphs.

## Accepted constraints

Manual architecture and layout survive rescans. Provider facts cannot overwrite
user intent. Observations carry provenance and time; stale/unknown state differs
from confirmed absence. Ambiguous identities are not silently merged. AI is
advisory. SQLite is the V0 persistence choice; the exact schema is illustrative.

## Success

The owner can identify systems and their relationships, choose canonical source,
locate checkouts across machines, inspect known runtimes and freshness, and
navigate quickly from the graph. A representative old-project lookup should
require selecting/searching and navigating instead of several GitHub, SSH, and
filesystem steps. The source sets no numeric performance threshold.

## Proposed delivery sequence

1. Establish the documentation site from this Markdown foundation, with PRDs,
   ADRs, requirements, research, and output records. Implemented locally using
   Astro/Starlight; see [ADR-002](adr/002-astro-documentation-site.md).
2. Follow [the implementation plan](planning/index.md) and resolve remaining choices through focused research: client
   architecture, repository identity, scanner trust/protocol, provider interface,
   and graph interaction/layout.
3. Implement a local persisted graph with manual editing and preserved layout.
4. Add provider discovery and reconcile observations without losing user intent.
5. Validate the source success questions with representative personal projects.

This ordering is a proposal, not an expansion of V0 or a commitment to a stack.

## Newly tracked product ideas

The owner requested [OAuth client inventory on graph edges](ideas/IDEA-001-oauth-clients.md)
and [KeePass as a standalone data-layer node](ideas/IDEA-002-keepass-data-layer.md).
These needs are captured in [the idea register](ideas/index.md); representation
and release assignment remain open. A manual System with facets and zero edges
fits the current baseline; OAuth inventory and specialized entity kinds require
a follow-up model decision. The original source PRD/ADR-001 remain unchanged.

## Still open

Desktop platform target and GPUI graph implementation; server/PWA framework acceptance;
remote scanner protocol and trust boundary; identity normalization rules;
provider adapter contract; graph rendering and semantic zoom engine; detailed
schema; freshness thresholds; navigation integration contracts. A future
read-only agent graph query API is deferred, not required for V0.
