# AI-friendly repository design

**Status:** Proposed  
**Date:** 2026-10-04

AI-friendly means an agent can find the right module, understand its invariants,
make a bounded change, and prove the result without private services or guessed
commands. It also means humans can review the same change easily.

## Repository boundaries

Keep the existing documentation repo independent. Propose one new product repo,
`personal-system-graph`, registered under workspace `repos/`. Its internal npm
and Cargo packages are modules in that Git repository, not independent nested
repositories. Atomic API changes can update server, scanner, and desktop together.

```text
personal-system-graph/
  README.md                    # clean-checkout setup and first workflow
  AGENTS.md                    # short instructions and required validation
  REPO_MAP.md                  # ownership, entry points, dependency directions
  CONTRIBUTING.md              # how to change and review the code
  justfile                     # discoverable task wrappers (proposed)
  package.json                 # npm workspaces and exact documented scripts
  package-lock.json
  Cargo.toml                   # Rust workspace
  Cargo.lock
  rust-toolchain.toml
  .node-version
  apps/
    server/                    # HTTP/auth/bootstrap, serves built PWA
    web/                       # read-only React PWA
  packages/
    domain/                    # graph rules and deterministic identity logic
    application/               # commands, reads, reconciliation orchestration
    persistence/               # SQLite adapter and SQL migrations
    providers/                 # GitHub and later LocalLink adapters
    api-client/                # generated TS client + small adapter
  crates/
    desktop/                   # GPUI presentation and desktop actions
    scanner/                   # local inspection and observation submission
    protocol/                  # generated Rust models/client + adapters
  contracts/
    openapi.yaml               # canonical wire contract
    examples/                  # good and invalid request/response fixtures
  fixtures/
    graphs/                    # intended graph and expected lenses
    scans/                     # multiple checkouts, failures, ambiguity
    locallink/                 # sanitized fixtures after real API research
  tests/
    integration/               # temp SQLite, fake providers, permission tests
    e2e/                       # server/client workflows
  tooling/                     # generation and deterministic checks
  deploy/                      # server image, configuration sample, backup guide
  .github/workflows/           # TS/Rust/contract/build checks
```

## Context reading path

Root AGENTS.md should fit a short read and point to REPO_MAP.md, current product
plan/ADRs, exact setup/check commands, and module instructions. Each module's
AGENTS.md specifies purpose, entry points, dependencies, invariants, fixtures,
and targeted validation. Link canonical docs by stable URL and requirement IDs;
do not copy contradictory PRDs into the code repo. A pinned documentation commit
can accompany a task when exact source context is required.

## Proposed commands

These are design targets, not commands available in a product repo today.

| Command | Expected result |
| --- | --- |
| just bootstrap | Install pinned npm/Cargo dependencies; explain toolchain requirements |
| just dev | Server + PWA using a deterministic development dataset |
| just demo | Load a representative graph without real provider credentials |
| just generate | Regenerate validation/client bindings from the canonical contract |
| just check | TS type/lint checks, Rust fmt/clippy, dependency boundary checks, contract drift |
| just test | Domain, API/persistence, and protocol fixture tests |
| just test-web | Browser checks of read-only PWA and connection states |
| just build | Server/PWA build, scanner build, desktop build for current target |

The task wrappers delegate to visible npm/Cargo commands. CI runs those same
underlying commands. Local bootstrap must not require network access to the user's
home services. Native desktop build prerequisites are explicit per supported OS.
Pin toolchains and dependencies; update through reviewable changes rather than
using `latest` in a reproducible CI install.

## Guardrails with implementation value

- Domain modules cannot import framework/database/UI packages.
- Routes cannot write SQLite directly; application services own transactions.
- Scanners produce observations and never authoritative graph commands.
- UI packages do not own reconciliation or duplicate domain rules.
- Generated files carry a source/generator header; CI verifies regeneration drift.
- A feature has requirement/ADR references, typed boundary inputs, clear errors,
  representative fixtures, and validation proportional to its risk.
- Tests target user behavior and invariants, not implementation-shaped snapshots.
- No hidden credentials, home-specific filesystem assumptions, or live-provider
  dependencies in default checks. Fixtures use invented IDs/paths and sanitized data.

## Coding-agent task template

```text
Objective: concrete behavior to add/fix
Requirements / ADRs: IDs and links
Read first: small list of relevant entry points and fixtures
Mutation scope: repository/modules
Dependencies: prerequisite contract or data changes
Acceptance: externally visible outcomes and protected invariants
Validation: exact commands and expected evidence
Result: candidate/PR, behavior summary, tests, limitations
```

Use the workspace Run/worktree/candidate workflow and inspect before integration.
Agents may suggest product architecture changes but do not quietly accept ADRs
or broaden V0. Keep completed output evidence linked from the documentation site.
This coding workflow is distinct from any future advisory AI inside the product.

## Initial acceptance for the repository itself

A fresh checkout can discover setup, run demo/targeted tests, and understand module
ownership without reading old chats. A deliberate contract mismatch fails CI.
A viewer mutation test fails if API enforcement is removed. A scanner replay test
fails if the same batch creates duplicate graph facts. Those are meaningful gates
for agent work before discovery or UI complexity expands.
