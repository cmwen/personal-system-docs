# ADR-005: TypeScript server/PWA, Rust clients, and a contract-first API

**Status:** Proposed  
**Date:** 2026-10-04

## Context

GPUI requires Rust desktop code. It does not require the home server to be Rust.
The server also hosts the read-only web application, and scanners are separate
executables. Shared protocol definitions matter across the language boundary.

## Proposed decision

Use TypeScript on Node.js 24 with Fastify for the home server. Keep domain,
reconciliation, persistence, and HTTP handling in separate modules. The same
server serves the PWA's production assets and API from one origin.

Use TypeScript/React/Vite for the PWA, with React Flow as the initial graph-viewer
candidate. Its suitability for mobile scale/interaction is a prototype gate.
GPUI has its own native graph presentation; browser rendering code is not shared
with it. Use Rust for GPUI and machine scanners.

Use SQLite with explicit migrations on local server storage. Choose the driver
in M0 and keep it behind a persistence interface. Batch writes in transactions
and test recovery/idempotency. A graph database is still deferred.

Maintain `contracts/openapi.yaml` as the canonical wire contract. Generate TS and
Rust models/client bindings and Fastify-compatible validation schemas, using a
pinned generator chosen in M0. Use a tested common schema subset and shared
valid/invalid fixtures. Do not assume every OpenAPI 3.1 feature maps directly to
Fastify's default schema dialect.

Start with HTTP JSON and bounded, paginated read APIs. Desktop command writes
carry expected revisions and idempotency IDs. Scanner observations use a separate
batch-ingestion API. Poll explicitly for refreshed projections in V0; add event
streaming only if a demonstrated UX need warrants it.

## Consequences

Server/PWA development shares TypeScript tooling. Native integration remains
Rust. The team maintains two toolchains and generated cross-language contracts,
but one reconciliation implementation and one authoritative database.

Domain correctness tests do not require either UI. Scanner fixtures and fake
providers let agents work without access to the home network or real credentials.

## Alternatives

An all-Rust server would share more Rust implementation code but would still need
a browser frontend. A full-stack web framework could combine server/web routing,
but a small explicit API service fits the desktop/scanner clients. A serverless
or cloud-hosted database is outside the selected home-hosted topology.

See [technical design](../design/technical-design.md) and
[research](../research/RES-007-implementation-stack.md).
