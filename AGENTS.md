# Documentation repository

Canonical content lives in the workspace root `docs/`. Do not edit generated
`src/content/docs/` files. `scripts/prepare-content.mjs` adds site metadata and
converts Markdown file links to site routes without changing the originals.

Use an isolated workspace Run for repository changes. Required validation:
`npm run check` and `npm run build` (includes built-page link/anchor checks).
Do not publish the site without choosing its hosting visibility.
