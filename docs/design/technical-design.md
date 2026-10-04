# Technical design

**Status:** Draft implementation design  
**Date:** 2026-10-04

Confirmed topology is recorded in [ADR-004](../adr/004-home-server-and-clients.md).
Stack/protocol choices below are recommendations in
[ADR-005](../adr/005-mixed-stack-and-contracts.md), not an implemented system.

## Deployment and data flow

```text
Rust scanner on each machine -- observations --> TypeScript home server
Rust GPUI desktop -------- read + edit API ----> TypeScript home server
Mobile browser PWA ------ read API/Tailscale --> TypeScript home server
TypeScript home server --- local transactions -> SQLite
TypeScript home server --- serves assets ------> Mobile browser PWA
```

The server serves API and PWA assets from one origin. The PWA executes in the
browser; it is packaged with the server rather than being the server process.
HTTPS is required for mobile installation. Use Tailscale's HTTPS/Serve setup for
private reachability. Public GitHub Pages hosts documentation only.

## Stack recommendation

| Layer | Choice | Reason / validation gate |
| --- | --- | --- |
| Server | Node.js 24, strict TypeScript, Fastify | Explicit route/schema validation; serves all clients; pin compatible dependencies in M0 |
| Domain | Plain TypeScript modules | No HTTP, UI, or database dependencies; pure rules and testable reconciliation |
| Persistence | SQLite, explicit SQL migrations, driver behind adapter | Accepted V0 scale; choose driver/backup API in M0 |
| Browser client | React + TypeScript + Vite | Interactive viewer; static assets served by the home server |
| Browser graph | React Flow candidate | Prototype mobile pan/zoom, selection, hierarchy, and large enough representative graph; disable architecture edits |
| Native client | Rust + GPUI | Separate native graph rendering and source navigation; early interaction prototype |
| Scanners | Rust CLI, then optional persistent agent | Portable machine-local inspection; outbound observation submission |
| Contracts | OpenAPI + generated TS/Rust bindings + fixtures | Shared semantics across languages; pinned schema/generator compatibility |
| Deployment | One server image with PWA assets, local data volume | One service to operate; scanners/desktop distributed separately |

This is a proposed stack, not a claim that the dependencies have been tested
together. Exact versions, graph limits, and platform targets are implementation
spikes, not assumptions to hide in the build.

## Module boundaries

HTTP handlers authenticate/validate requests and call application services.
Application services call domain rules and persistence interfaces. Domain rules
cannot import Fastify, React, GPUI, or the SQLite driver. Reconciliation is a
server application service over deterministic domain matching/merge rules.
Provider adapters normalize external data into observation envelopes, not direct
writes to user-owned entities. The PWA and GPUI never implement reconciliation.

A desktop interaction changes local presentation state, sends a command, and
reflects the accepted server revision. Failed saves are visible; the client does
not claim an unsaved layout is authoritative. Slow I/O stays off GPUI's UI thread.

## Persistence model

Illustrative tables, preserving ADR-001 rather than freezing the schema:

| Table | Responsibility |
| --- | --- |
| entities | Stable ID, kind, display name, lifecycle, revision |
| relationships | Stable endpoints/type, author/authority, revision |
| facets | Namespaced values with explicit owner/authority |
| observations | Immutable provider facts, provider/machine identity, observed_at and received_at |
| evidence | Links observations to entities or relationships |
| views / layouts | Named view and entity position/collapse state; layout revision |
| identity_candidates | Normalized identity keys and unresolved ambiguous matches |
| scan_runs / ingestion_batches | Trigger, coverage, completion/failure, idempotency, receive status |
| command_receipts | Command ID, outcome/revision, retry deduplication |

Enable foreign keys; use transactions and schema migrations. WAL is a candidate
for reader/writer overlap, with an explicit busy timeout and backup/restore plan.
SQLite allows one writer at a time; scans are bounded batches rather than long
transactions. Database files stay on local server storage, not a shared network
filesystem. Do not copy only a live database file without accounting for WAL;
use a driver-supported consistent backup procedure and prove restore in M6.

Desired/manual relationships persist even when evidence disappears. A matching
observation attaches evidence to an existing relationship; provider refreshes
cannot overwrite user grouping, canonical-source choices, facets, or layout.
A containment command checks for cycles before committing.

## Wire contract and example operations

Proposed `/api/v1` operations:

| Operation | Caller | Meaning |
| --- | --- | --- |
| GET /graph?lens=design\|reality\|combined&root=... | Viewer or desktop | Bounded graph projection and view revision |
| GET /entities/:id | Viewer or desktop | Details, relationships, evidence, freshness |
| GET /search?q=...&cursor=... | Viewer or desktop | Paged typed results |
| GET /views/:id | Viewer or desktop | Named layout/projection settings |
| POST /commands | Desktop editor | Typed create/edit/group/connect/layout command |
| POST /observation-batches | Enrolled scanner/provider | Idempotent observation ingestion |
| POST /scan-requests | Desktop editor | Explicit scan request; does not execute arbitrary shell commands |
| GET /scan-requests?machine=... | Enrolled scanner | Optional agent mode polls requests for its own machine |
| POST /scan-requests/:id/result | Enrolled scanner | Completion/failure and coverage for its assigned job |

Contracts specify stable IDs, UTC timestamps, enums, pagination bounds, versions,
structured errors, command expectedRevision, and request/batch IDs. A stale
revision is rejected with an explicit conflict result and refreshed state.
OpenAPI schema features must be compatible with the selected runtime validator
and Rust/TS generators; golden valid/invalid JSON fixtures test that compatibility.

## Scanner protocol and reconciliation

V0 starts with an explicitly invoked scanner CLI on each machine. It reads
configured allowlisted roots, finds Git working copies, reports normalized remote
candidates plus path/branch/commit/local-work evidence, and submits a batch.
Use Git's inspection commands or a tested library adapter; worktrees and `.git`
files need fixtures. Never assume every checkout has a `.git` directory.

A batch includes protocol version, scanner version, machine ID, provider, scan ID,
batch ID, observed_at, scanned scope, completion/coverage, observations, and errors.
Retrying a batch must not duplicate facts or relationships. Completion means
completion of a stated scope, not proof of global absence. Failed or partial scans
must not mark unseen entities as deleted. Client and server observation times are
kept separate so clock skew cannot silently assert freshness.

The server validates the envelope and machine authorization, records immutable
facts, resolves identity candidates, attaches evidence, and updates the observed
projection. Ambiguous repository/fork/remote matches require owner resolution.
GitHub imports run as a server adapter. LocalLink placement and mapping wait for
inspection of its actual reachable API; do not invent process/container endpoints.

A later lightweight agent can poll for explicit scan jobs. Polling for jobs is
not continuous filesystem scanning; the original pull-based discovery boundary
remains. No arbitrary remote execution channel is introduced.

## Access and PWA behavior

Use three narrow application capabilities: viewer read, desktop editor read/edit,
and scanner ingest for an enrolled machine. One owner remains the product scope;
these are client capabilities, not a multi-user governance feature. Reject viewer
mutations and scanner architecture edits on the server. Keep credentials out of
repo fixtures, logs, and observation payloads. Credentials/bootstrap/session
storage need a concrete M0 implementation choice.

Tailscale supplies the chosen connectivity boundary; application authorization
still enforces the read-only PWA. Serve over HTTPS. The PWA has a web manifest and
responsive viewer, search, inspector, observed freshness, and explicit connection
state. Initial data requests are network-only; optional service-worker caching is
limited to static application assets. No offline writes or background mutation queue.

Read-only graph browsing can allow temporary pan/zoom/selection without saving
architecture. Desktop layouts remain authoritative; decide whether mobile reads
that layout or a separate desktop-authored mobile view during the prototype.

## Validation and risks

Test manual-edge preservation, authority isolation, deterministic identity
matching, ambiguous-match resolution, ingestion deduplication, partial scan
coverage, stale/unknown distinction, containment cycles, layout persistence,
revision conflicts, and viewer/editor/scanner permission boundaries. API tests
use temporary SQLite and fake providers; UI workflows use deterministic fixtures.

The early risks are GPUI graph interaction/packaging, mobile graph usability,
cross-language contract generation, SQLite driver/backup behavior, and actual
LocalLink identity mapping. Product data stays home-hosted; documentation is
public. The first product slice and milestone gates are in
[the implementation plan](../planning/index.md).

## Sources

Recommendations are design judgments, informed by
[Fastify schema validation](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/),
[Vite](https://vite.dev/guide/), [React Flow](https://reactflow.dev/learn),
[GPUI](https://gpui.rs/examples/),
[OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.1.html),
[SQLite WAL](https://sqlite.org/wal.html),
[PWA installation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable),
and [Tailscale HTTPS](https://tailscale.com/docs/how-to/set-up-https-certificates).
