# ADR-004: Home server, GPUI editor, read-only PWA, and machine scanners

**Status:** Accepted  
**Date:** 2026-10-04

## Context

The owner selected a GPUI desktop UI, a home-network server, machine scanners,
and a mobile PWA. The owner clarified that the PWA is read-only and mobile access
uses Tailscale. Rust scanners and a possible TypeScript server were discussed.

## Decision

The home server owns authoritative graph data, observations, reconciliation, and
SQLite persistence. The GPUI desktop client provides manual graph editing and
native source navigation. Machine-local scanners report observations. Mobile
uses a read-only PWA served by the home server and accessed through Tailscale.

Read-only mobile access is enforced by the API. The PWA has no architecture
mutation endpoints available to its viewer credentials, offline edit queue, or
client conflict-resolution workflow. Disconnected state is explicit; cached
responses, if introduced, must show their age.

The desktop and PWA share domain/API semantics but have distinct rendering layers.
The desktop provides the editing experience; the PWA provides viewing/search/
inspection. Browser access does not promise to open a desktop machine's local
filesystem or terminal.

Self-hosted/local-first now means data is owned on the user's home infrastructure.
Clients depend on a reachable server for fresh data and authoritative edits.
Independent offline desktop editing is not part of the current implementation plan.

Scanners run on the machine they inspect. Discovery cannot overwrite intended
architecture. Rust is the scanner and GPUI implementation language. TypeScript
server/framework choices are proposed separately in ADR-005.

## Consequences

The server becomes the persistence/reconciliation boundary. SQLite is not shared
as a network file between clients. Native and mobile clients need a versioned
protocol. A home-server outage prevents authoritative edits and fresh reads.

This supplements the Draft PRD; the original imported document remains unchanged.
The five entities, graph-first model, evidence ownership, pull-based scanning,
and deferred AI execution rules in ADR-001 remain in effect.
