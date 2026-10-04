# OUT-004: Implementation plan and AI-friendly repository design

**Date:** 2026-10-04  
**Status:** Planning delivered; product not implemented

## Artifacts

- [Implementation plan and decision summary](../planning/index.md)
- [Technical design](../design/technical-design.md)
- [AI-friendly repository structure and agent workflow](../design/ai-friendly-repository.md)
- [ADR-004: accepted owner deployment/client direction](../adr/004-home-server-and-clients.md)
- [ADR-005: proposed stack and contract](../adr/005-mixed-stack-and-contracts.md)
- [ADR-006: proposed repository structure](../adr/006-ai-friendly-product-repository.md)
- [RES-007: source-grounded technical research](../research/RES-007-implementation-stack.md)

## Delivered

A sequenced plan with milestone exit evidence and requirement mapping; client,
server, scanner, persistence, API, reconciliation, access, and PWA boundaries;
a proposed code layout, dependency rules, context reading path, deterministic
fixtures, validation commands, and coding-agent task template. Requirements
REQ-018/019 supplement the source PRD with the later read-only/home-hosted direction.

## Validation

Run the existing documentation checks and production link/anchor checks before
candidate integration. GitHub Actions repeats check/build from a clean checkout
before publication. Code examples and proposed product commands are plans, not
validated commands in an existing product repository.

## Remaining

Acceptance of framework/repository proposals; first desktop platform; GPUI and
mobile interaction prototypes; SQLite driver; schema generator; identity rules;
scanner delivery protocol; actual LocalLink API research. No product repository,
scanner, desktop client, server, or PWA is created by this deliverable.
