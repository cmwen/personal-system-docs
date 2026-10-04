# Documentation repository

Canonical content lives in this repository's `docs/`. Do not edit generated
`src/content/docs/` files. `scripts/prepare-content.mjs` adds site metadata and
converts Markdown file links into site routes without changing the originals.

Within the agent workspace, use an isolated Run for repository changes.
Required validation: `npm run check` and `npm run build` (includes internal link
and anchor checks). Verify navigation and search at the configured site base.

The owner authorized public GitHub Pages publishing on 2026-10-04.
Pushes to `main` deploy through `.github/workflows/pages.yml`.

## Read before scope/design changes

Start with `docs/planning/index.md`, `docs/scope.md`, and the relevant ADRs.
`docs/design/technical-design.md` covers runtime ownership and protocols;
`docs/design/ai-friendly-repository.md` describes the proposed product layout.
Status is meaningful: owner-confirmed topology is accepted; proposed frameworks
and future product command wrappers must not be presented as implemented.
Preserve the imported PRD/ADR-001 snapshots. Later scope decisions live in linked
ADRs and requirement supplements. No product implementation exists in this repo.

New owner ideas are captured in `docs/ideas/` with stable IDEA IDs. Preserve
owner intent while separating illustrative schemas from accepted decisions.
Do not silently add entity kinds or promote ideas into V0 requirements.
