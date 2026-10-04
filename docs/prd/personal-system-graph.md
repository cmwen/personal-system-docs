# PRD: Personal System Graph

**Status:** Draft  
**Date:** 2026-10-04

## 1. Summary

Personal System Graph is a visual, local-first control surface for understanding a personal software ecosystem from a bird's-eye view.

It unifies logical systems, GitHub repositories, local/remote checkouts, machines, and running instances into a user-curated graph. Automated discovery from GitHub, filesystem scanners, and LocalLink supplies observations and evidence, but the user's intended architecture remains authoritative.

The product is not primarily a repository manager or an automated infrastructure control plane. Its core value is helping the user see what exists, how it is grouped, how pieces relate, where source is checked out, and where software is running.

## 2. Problem

A personal software ecosystem becomes fragmented across:

- GitHub repositories and organizations
- Multiple checkouts of the same repository
- Multiple machines, including WSL and remote hosts
- Local processes and Docker workloads managed by LocalLink
- Logical applications composed of several repositories/services
- Hosting environments such as GitHub Pages and Cloudflare
- External integrations and data services

GitHub only describes repositories. LocalLink only describes local runtime instances. Neither represents the user's intended system architecture.

The result is loss of context: it becomes difficult to remember what already exists, which repositories belong together, where a project is checked out, what is running, and what depends on what.

## 3. Product principles

1. **The graph is the primary interface.** Search supports navigation, but the bird's-eye visual model is the core product experience.
2. **User intent is authoritative.** Discovery assists the user; it does not redefine the architecture.
3. **Desired and observed state are distinct.** The model can represent planned or manually defined architecture even when scanners cannot observe it.
4. **Not everything is a node.** Nodes represent things with meaningful identity/lifecycle; ports, branch names, timestamps, and metrics are normally attributes or evidence.
5. **Manual relationships are first-class.** Many architectural dependencies cannot be reliably inferred from code or configuration.
6. **AI is advisory.** AI may inspect and suggest, but it does not mutate infrastructure or architecture automatically.
7. **Observations have freshness.** Missing or stale observations are not equivalent to absence.
8. **Visual layout is user intent.** Refreshing discovered data must not destroy the user's spatial mental model.

## 4. Primary user

V0 is designed for a single owner managing their own software ecosystem. Multi-user collaboration, authorization, and enterprise governance are explicitly out of scope.

## 5. Core concepts

### System

A logical product, application, platform, or subsystem. Systems may contain other systems, allowing hierarchical grouping without introducing a separate fixed "subsystem" entity type.

### Repository

A source repository identity. A repository may have one canonical remote and many checkouts.

### Checkout

A working copy of a repository on a machine. Multiple checkouts of the same repository are expected and should resolve to the same Repository entity.

### Machine

A computer or environment on which source or runtimes exist, such as a Mac, WSL environment, or remote host.

### Runtime

A running instance such as a LocalLink-managed process or Docker workload. A runtime is distinct from its repository and checkout.

### Relationship

A meaningful connection between entities, for example:

- contains
- depends_on
- checked_out_on
- source_of
- runs_as

Relationships may be manually authored or discovered.

### Observation / Evidence

Information reported by a provider such as GitHub, a filesystem scanner, or LocalLink. Evidence records its source and observation time.

## 6. Key user experiences

### Bird's-eye system graph

The home experience presents the user's logical systems and their relationships. The user can zoom from high-level systems into subsystems, repositories, checkouts, and runtimes.

Semantic zoom changes the level of detail rather than merely scaling shapes.

### Manual graph editing

The user can:

- create logical systems or planned components
- group nodes into systems/subsystems
- drag nodes to arrange the architecture
- connect two nodes by dragging an edge
- select or create a relationship type
- persist positions and relationships

Manual relationships must survive rescans.

### Desired / observed lenses

The graph supports three conceptual lenses:

- **Design:** user-defined intended architecture
- **Reality:** currently known observations
- **Combined:** intended architecture with supporting/missing/unexpected observations

A desired relationship can exist without machine-discoverable evidence.

### Repository identity and checkout discovery

The app scans configured folders on machines, finds Git repositories, inspects remotes, and resolves multiple working copies to a single repository identity.

Example:

    cmwen/project
      ├─ Mac: ~/src/project
      ├─ WSL: ~/projects/project
      └─ Mini PC: ~/dev/project

The app highlights potentially stale checkouts or local-only work, but does not automatically delete or move anything.

### Canonical repository

A Repository may designate a canonical repository/remote (GitHub in the initial implementation). This represents the user's chosen authoritative shared source, not a claim that Git itself requires a central repository.

### Runtime mapping

LocalLink is a V0 runtime provider. Its workspaces/processes/containers are attached to the corresponding checkout, repository, or system where identity can be resolved or manually linked.

### Inspector and navigation

Selecting a node opens an inspector containing its metadata, relationships, observations, freshness, and useful navigation actions such as opening GitHub, a local folder, terminal, or supported coding-agent entry point.

### Search

Global search locates systems, repositories, checkouts, machines, and runtimes and focuses the corresponding node in the graph.

## 7. Metadata

User-controlled facets may include maturity, criticality, lifecycle, ownership, and classifications.

Provider-owned facts remain distinct. For example, GitHub repository visibility is observed from GitHub, while maturity is a user decision.

AI may suggest metadata changes, but acceptance converts them into explicit user decisions.

## 8. V0 scope

V0 includes:

- GitHub personal and organization repository import
- Repository identity resolution and canonical repository selection
- Configurable filesystem scanning on local/remote machines
- Multiple checkout detection
- LocalLink runtime import
- Core entities: System, Repository, Checkout, Machine, Runtime
- Hierarchical systems/subsystems
- Manual node creation, grouping, edge creation, and layout
- Persisted graph and layout
- Desired, observed, and combined graph lenses
- Observation timestamps/freshness
- Graph-first home/dashboard
- Semantic zoom
- Inspector
- Global search and navigation

## 9. Explicitly out of scope for V0

- Automatic infrastructure mutation
- AI-driven changes
- Full Cloudflare integration
- GitHub Pages deployment discovery beyond basic repository metadata
- OpenConnector/Google topology
- Telemetry/tracing analytics
- Security policy engine
- Architecture health scoring
- Cost analysis
- Multi-user collaboration
- Real-time continuous scanning
- File/package-level dependency graph

These are possible extensions only after the core model proves useful.

## 10. Success criteria

V0 succeeds if the user can reliably answer:

1. What systems/projects do I have?
2. How are they logically grouped and connected?
3. Which repository is the canonical source for this project?
4. Where is this repository checked out across my machines?
5. What instances are currently known to run from it?
6. When was this information last observed?
7. Can I navigate from the high-level system to the relevant source/runtime quickly?

A representative workflow should reduce finding an old project from several manual GitHub/SSH/filesystem steps to selecting or searching the system and navigating directly from its graph node.

## 11. Future direction

After V0 validates the system model, additional providers may attach Cloudflare deployments, GitHub Pages, data stores, OpenConnector integrations, identity boundaries, telemetry, and traces.

A read-only graph query interface can later expose bounded subgraphs to local LLMs, OpenRouter models, or coding agents for architecture review, impact analysis, security suggestions, cleanup suggestions, and agent context. AI remains advisory by default.
