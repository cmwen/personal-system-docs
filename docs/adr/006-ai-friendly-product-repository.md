# ADR-006: One product repository with explicit agent context and validation

**Status:** Proposed  
**Date:** 2026-10-04

## Context

The owner requires an AI-friendly repository. Product work crosses TypeScript,
Rust, persistence, and protocol boundaries. Agents need a short path from intent
to code and deterministic validation that does not depend on private services.

## Proposed decision

Create one independent `personal-system-graph` product repository under workspace
`repos/`, containing the TypeScript server/PWA and Rust scanner/desktop packages.
The existing documentation repository remains independent. No product repository
is created by this planning deliverable.

Provide a root AGENTS.md, a repository map, short module-specific AGENTS.md files,
a canonical API contract, deterministic domain/provider fixtures, toolchain
pins, lockfiles, a bootstrap guide, and task/check commands. Generated bindings
are identified and regenerated; agents edit contract sources rather than outputs.

Each module describes ownership, entry points, permitted dependency direction,
validation, and relevant requirement/ADR links. CI enforces dependency direction,
contract drift, meaningful domain tests, TS checks, and Rust fmt/clippy/tests.
Desktop builds run on selected supported platforms; headless CI checks the
non-rendering core independently.

Agent work uses the existing workspace Run/candidate workflow. Every task names
an objective, relevant requirements, mutation scope, dependencies, acceptance
checks, and expected evidence. Results link a candidate/PR, changed behavior,
validation, and limitations. Product AI remains advisory; these coding workflows
do not grant automatic architecture or infrastructure mutation.

## Consequences

A single product checkout supports atomic protocol changes across languages and
reproducible agent work. The separate docs repository remains the product record.
Small structured context replaces copying whole histories into every task.
An individual module can later move to a separate repository when its release
or ownership lifecycle requires it.

See [repository layout and agent workflow](../design/ai-friendly-repository.md).
