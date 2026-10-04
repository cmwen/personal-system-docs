# RES-007: Implementation stack and deployment boundaries

**Date:** 2026-10-04  
**Status:** Complete desk research; implementation spikes remain

## Question

How should a GPUI editor, Rust scanners, TypeScript home server, and read-only
mobile PWA communicate, and how can the code be easy for agents to work on?

Related: REQ-001, 002, 005, 008–015, ADR-001, ADR-004, proposed ADR-005/006.

## Primary sources checked

All accessed 2026-10-04; these live docs may evolve.

| Source | Finding used |
| --- | --- |
| [GPUI examples](https://gpui.rs/examples/) | Views/events are Rust; rendering is independent of the browser; slow I/O should stay off the UI thread |
| [Fastify validation](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/) | Route validation/serialization uses JSON schemas; default examples use Draft 7, so schema compatibility needs explicit testing |
| [Vite guide](https://vite.dev/guide/) | Produces static browser application assets; supports React/TS development |
| [React Flow](https://reactflow.dev/learn) | Graph interaction library candidate for the browser; suitability for this mobile use is unverified |
| [OpenAPI](https://spec.openapis.org/oas/v3.1.1.html) | Language-neutral HTTP contract format; generator/runtime support still needs testing |
| [SQLite WAL](https://sqlite.org/wal.html) | Reader/writer overlap with a single writer; local-filesystem and backup constraints matter |
| [PWA installation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable) | Installation requires a supported manifest and secure origin |
| [Tailscale HTTPS](https://tailscale.com/docs/how-to/set-up-https-certificates) | HTTPS certificate setup for tailnet machine access |

## Recommendation and uncertainty

Recommend TypeScript/Node/Fastify server and React/Vite PWA, with Rust GPUI/scanners
and a single versioned HTTP contract. This is an inference/design choice from the
selected topology, not a benchmarked comparison or a claim of compatibility.
Recommend one polyglot product repo with explicit dependency directions and
fixture-based validation to keep protocol changes atomic and reviewable.

Unverified: graph UI ergonomics/performance, GPUI target/platform support for our
packaging, SQLite driver choice, code generation compatibility, scanner job delivery,
and actual LocalLink protocol. These need bounded implementation spikes. The
proposal remains in ADR-005/006; deployment topology follows the owner's direction.
