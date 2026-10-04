# ADR-001: Model the Personal System as a User-Curated Graph with Observed Evidence

**Status:** Accepted for V0  
**Date:** 2026-10-04

## Context

The application must represent a personal software ecosystem that spans logical systems, source repositories, multiple working copies, machines, and running instances.

No single provider has a complete view:

- GitHub knows repositories and repository-level facts.
- Filesystem scanners know local checkouts.
- LocalLink knows local workspaces and runtime instances.
- The user knows architectural intent and relationships that may not exist explicitly in source code or configuration.
- Future providers may describe hosted deployments, data stores, integrations, identity, telemetry, or traces.

A scanner-only model would be incomplete. A manually maintained architecture diagram would become stale and would not connect naturally to real repositories/runtimes. The system therefore needs to combine user-authored architecture with observed evidence without allowing either to silently overwrite the other.

## Decision

Use a persisted graph-oriented domain model in which user-curated desired architecture is primary and provider observations are attached as evidence.

The graph is also a first-class product interface, not merely an internal storage representation.

### 1. Core V0 entities

V0 supports five primary entity kinds:

- **System** — logical product/application/platform; may contain other Systems
- **Repository** — source repository identity
- **Checkout** — a working copy of a Repository
- **Machine** — host/environment containing checkouts or runtimes
- **Runtime** — running instance such as a LocalLink process or container

New entity kinds should only be added when the concept needs independent identity, relationships, navigation, or lifecycle.

Values such as ports, branch names, commit SHAs, last-observed timestamps, and metrics remain attributes/evidence by default.

### 2. Systems are recursively composable

Do not create fixed entity kinds for subsystem/sub-subsystem.

Represent hierarchy using System entities and a containment relationship:

    Personal AI
      contains -> Knowledge
        contains -> KB Service

"Subsystem" is therefore a presentation/context concept rather than a separate persistence primitive.

### 3. Repository and Checkout are distinct

Multiple filesystem copies of the same repository resolve to one Repository entity.

    Repository: cmwen/project
      -> Checkout: Mac ~/src/project
      -> Checkout: WSL ~/projects/project
      -> Checkout: Mini PC ~/dev/project

Repository identity should initially use normalized Git remote identity where possible. Ambiguous matches require user resolution rather than silent merging.

A Repository may have a user-selected **canonical repository/remote**. This is the preferred shared source, not a Git protocol requirement.

### 4. Runtime is distinct from source

A Repository/Checkout and a running instance are not the same entity.

A LocalLink workspace, process, or Docker workload may be linked to a Checkout, Repository, or System. This preserves the distinction between source topology and runtime topology.

### 5. Desired architecture and observations coexist

The graph stores user intent independently from observations.

Examples of desired/user-authored knowledge:

- System grouping
- manually created dependency
- maturity/criticality
- planned component
- canonical repository selection
- graph layout

Examples of observed knowledge:

- GitHub visibility
- repository remote
- checkout path
- current branch
- LocalLink runtime state
- last observed time

The UI may expose Design, Reality, and Combined lenses over the same underlying model.

### 6. Manual edges are first-class

Users can create relationships by connecting nodes in the graph UI.

A manually authored edge is never removed merely because a scanner cannot detect supporting evidence.

If later observations support the same relationship, attach the evidence to the existing relationship rather than creating a duplicate conceptual edge.

If evidence disappears, mark the evidence stale/missing while preserving the user's relationship until the user changes it.

### 7. Provenance and freshness are mandatory

Provider-derived observations must record at least:

- provider/source
- observed_at
- observed value/data
- associated entity or relationship

Absence of a fresh observation must not be interpreted as proof that an entity or relationship no longer exists.

The UI must make stale/unknown state distinguishable from confirmed absence.

### 8. Authority is explicit

Different information has different authorities.

Examples:

- GitHub is authoritative for GitHub repository visibility.
- Filesystem scanner is authoritative for what it observed at a path at scan time.
- LocalLink is authoritative for the runtime state it reports at observation time.
- The user is authoritative for intended grouping, maturity, criticality, and manually defined architecture.
- AI output is a suggestion, never authoritative state.

Provider refreshes must not overwrite user-owned intent.

### 9. Visual layout is persisted separately from topology

Node position is part of the user's mental model and must survive rescans.

Persist layout separately so the same entities/relationships can support multiple views or lenses.

A scanner may introduce newly discovered, unplaced entities but must not auto-rearrange established user layouts without an explicit user action.

### 10. V0 persistence uses SQLite, not a graph database

Expected V0 scale is small enough for SQLite while retaining a graph-shaped domain model.

Conceptual tables:

    entities
    relationships
    facets
    observations
    evidence
    layouts

Exact schema remains an implementation detail and may evolve.

Graph traversal can initially be implemented with application logic and SQL recursive CTEs where needed. A dedicated graph database is deferred until demonstrated query/scale requirements justify it.

### 11. Discovery uses provider adapters

Initial providers:

- GitHub
- filesystem/machine scanner
- LocalLink

Providers discover observations and candidate entities/relationships. They do not own the desired architecture.

Future providers can add Cloudflare, GitHub Pages, OpenConnector, data stores, telemetry, and other sources without changing the core ownership model.

### 12. Scanning is pull-based in V0

V0 does not require continuous real-time synchronization.

Supported triggers may include:

- manual Scan Now
- scan on application open

Every observation records freshness. Scheduled/background scanning can be added later if useful.

### 13. AI is read-only/advisory at the architecture boundary

AI may later query relevant bounded subgraphs and evidence to:

- suggest metadata
- identify possible missing relationships
- propose reorganizations
- explain impact
- identify possible security/maintenance concerns

AI must not directly mutate the graph's authoritative user intent or execute infrastructure changes.

If execution is desired, it is handed off separately to an explicit coding/automation agent workflow.

## Persistence sketch

A minimal conceptual shape is:

    Entity
      id
      kind
      name
      metadata

    Relationship
      id
      from_entity_id
      to_entity_id
      type
      provenance

    Facet
      entity_id
      namespace
      value
      authority

    Observation
      subject_id
      provider
      observed_at
      data

    Evidence
      subject_id
      observation_id
      evidence_type
      data

    Layout
      view_id
      entity_id
      x
      y
      width
      height
      collapsed

This is illustrative rather than a frozen database schema.

## UI implications

The graph is the primary dashboard.

Required interactions include:

- semantic zoom
- drag/reposition nodes
- create logical System nodes
- group nodes into Systems
- connect nodes and choose relationship types
- preserve manual layout
- inspect desired and observed information
- surface freshness
- search/focus a node
- switch lenses without duplicating the underlying graph

## Consequences

### Positive

- Captures architectural knowledge scanners cannot infer.
- Preserves a stable bird's-eye mental model.
- Cleanly separates source, checkout, runtime, and logical system identity.
- Allows LocalLink to remain focused on local runtime management.
- Supports future hosting/integration providers without making them the source of truth.
- Creates a trustworthy foundation for later AI reasoning.
- Avoids premature graph-database complexity.

### Negative / trade-offs

- Entity resolution is non-trivial and requires explicit ambiguity handling.
- Desired and observed state increases model/UI complexity.
- Manual graph editing requires careful merge behavior with discoveries.
- Storing layout as user intent adds persistence/versioning concerns.
- SQLite graph traversal may eventually become limiting, though this is acceptable for V0.

## Rejected alternatives

### Scanner-generated graph as source of truth

Rejected because important architectural relationships are often implicit or known only to the user, and temporary scanner failures would incorrectly change the architecture.

### Repository-centric model

Rejected because one logical system may span multiple repositories, and one repository may have multiple checkouts and runtime instances.

### Treat checkout and repository as the same entity

Rejected because the same repository can exist simultaneously on multiple machines, branches, worktrees, or paths.

### Dedicated graph database in V0

Rejected as premature. The expected personal-scale graph does not justify operational complexity before graph query requirements are proven.

### AI-maintained architecture

Rejected because AI inference is probabilistic. AI may suggest changes, but the user remains authoritative for desired architecture.

## Follow-up decisions

Separate ADRs should be created only when implementation requires them, particularly for:

- repository identity resolution rules
- remote machine scanner protocol and trust boundary
- GPUI/native architecture and optional PWA access
- graph layout/semantic zoom engine
- provider plugin interface
- graph query API for coding agents/AI
