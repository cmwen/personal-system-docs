# Documentation repository

Canonical content lives in this repository's `docs/`. Do not edit generated
`src/content/docs/` files. `scripts/prepare-content.mjs` adds site metadata and
converts Markdown file links into site routes without changing the originals.

Within the agent workspace, use an isolated Run for repository changes.
Required validation: `npm run check` and `npm run build` (includes internal link
and anchor checks). Verify navigation and search at the configured site base.

The owner authorized public GitHub Pages publishing on 2026-10-04.
Pushes to `main` deploy through `.github/workflows/pages.yml`.
