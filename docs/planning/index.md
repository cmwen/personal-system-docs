# Implementation plan and decisions

**Status:** Proposed implementation plan  
**Date:** 2026-10-04

The implementation target is one home-network server, a native GPUI desktop
editor, read-only mobile PWA access through Tailscale, and machine-local Rust
scanners. This is a plan for product code; only the documentation site exists today.

## Read the design

- [Technical design](../design/technical-design.md)
- [AI-friendly repository design](../design/ai-friendly-repository.md)
- [ADR-004: confirmed deployment and client topology](../adr/004-home-server-and-clients.md)
- [ADR-005: proposed languages, stack, and protocol](../adr/005-mixed-stack-and-contracts.md)
- [ADR-006: proposed product repository and agent workflow](../adr/006-ai-friendly-product-repository.md)
- [Research supporting these choices](../research/RES-007-implementation-stack.md)

## Decision summary

| Topic | Decision / recommendation | State |
| --- | --- | --- |
| Graph ownership | User intent remains authoritative; discoveries contribute evidence | Accepted ADR-001 |
| Persistence | SQLite on the home server | SQLite accepted; server placement follows topology |
| Clients | GPUI desktop editor; mobile PWA read-only | Confirmed owner direction |
| Connectivity | Home-network hosting, mobile via Tailscale | Confirmed owner direction |
| Scanners | Rust, run on each machine | Confirmed owner direction |
| Server | TypeScript / Node.js with Fastify, serving API and PWA assets | Proposed ADR-005 |
| PWA | TypeScript / React / Vite, React Flow for graph browsing | Proposed; mobile prototype must validate |
| Protocol | HTTP JSON, OpenAPI contract, generated Rust/TS models | Proposed ADR-005 |
| Product repository | One independent polyglot repo; docs remain in the separate documentation repo | Proposed ADR-006 |
| Offline editing | No offline edits or mutation queue in the mobile PWA | Confirmed owner direction |
| GPUI graph engine | Implement a native canvas/interaction layer; validate early | Proposed; prototype gate |

## Milestones and exit checks

| Milestone | Work | Exit evidence | Requirements |
| --- | --- | --- | --- |
| M0: foundation | Create/register the product repo; root/module AGENTS.md; toolchains, lockfiles, dev commands, canonical contract and fixtures; CI | A fresh checkout runs the documented checks without home-network access; generated contracts have no unexplained diff | Cross-cutting |
| M1: smallest end-to-end graph | Minimal server/SQLite; GPUI prototype for node selection, pan/zoom, dragging, edge creation; save/reload via API | Two Systems and a dependency restore with the same IDs and positions after client/server restart; desktop platform build validated | REQ-001, 002, 008, 009, 010 |
| M2: manual architecture | Recursive containment, canonical-source editing, facets, named layouts, inspector, search, command revisions | Cycles rejected; edits persist; stale concurrent edits rejected; UI locates and focuses nodes | REQ-002, 004, 008, 009, 013, 014, 015 |
| M3: read-only mobile | Server-hosted PWA, graph/detail views, search, manifest, HTTPS through Tailscale, viewer credentials | A phone can install/open/search/inspect; edit and ingest requests with viewer credentials are rejected by API | REQ-001, 013, 014, 018, 019 |
| M4: discovery | GitHub personal/org import; Rust local scanners; identity candidates and ambiguity handling; freshness, scan coverage and idempotent ingestion | Two checkouts resolve to one Repository where identity is unambiguous; failed/incomplete scans do not delete intent or assert absence | REQ-003, 005, 007, 011, 012, 016 |
| M5: runtime and lenses | LocalLink adapter after inspecting its actual API; runtime mapping; Design/Reality/Combined projections; complete semantic zoom | Known process/container links to source; stale evidence remains visible; all three lenses preserve authored graph/layout | REQ-006, 007, 009, 011, 017 |
| M6: operational V0 | Multi-machine scan requests, packaging, backup/restore, platform checks, representative old-project lookup | Original PRD success questions answered using real projects; restore demonstrated; version compatibility and read-only access verified | PRD §10, remaining V0 checks |

The order is a recommendation, not a deadline estimate. Small dependency-linked
slices should finish with reviewable evidence. GPUI rendering and mobile usability
are early gates, before broad provider work. Each milestone must preserve the
existing graph-authority rules.

## First implementation slice

Create one System, another System, a manually authored dependency, and a named
layout. The GPUI client submits commands to the TypeScript server. The server
validates permissions/domain rules and writes a transaction to SQLite. Restart
both processes, load the graph through the read API, and display the same
relationship and positions. Use fixtures, not live GitHub or LocalLink, for this slice.

## Open implementation decisions

Desktop OS/build target; GPUI dependency version; SQLite driver and backup API;
contract code generator and supported schema subset; relation identity rules;
remote scan job delivery; LocalLink API/mapping; freshness thresholds; mobile
projection/layout behavior and graph library viability. Resolve these with small
spikes or focused ADRs when needed. Server/framework/library choices above remain
proposals until accepted; exact versions are pinned during M0.

## Idea capture before implementation

The owner is adding ideas before product coding. Track
[OAuth clients on edges](../ideas/IDEA-001-oauth-clients.md) and
[KeePass as a standalone data-layer node](../ideas/IDEA-002-keepass-data-layer.md)
in [the living idea register](../ideas/index.md). Resolve their identity,
representation, and release priority before modifying the five-kind contract.
The immediate work is documentation; the milestone plan is not an instruction
to start implementing these extensions.
