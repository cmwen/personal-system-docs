# Personal System Graph documentation

[Live documentation](https://cmwen.dev/personal-system-docs/)

A self-contained Astro 7 + Starlight documentation repository for the PRD,
architecture decisions, requirements, research, and outputs.

## Local development

Node.js 22.12+ is required; CI uses Node 24.

```sh
npm ci
npm run dev
```

Open the URL printed by Astro under `/personal-system-docs/`.

```sh
npm run check
npm run build
npm run preview
```

Search is indexed during the production build and works in preview/production.

## Edit documentation

Edit canonical Markdown in `docs/`. Restart dev or rebuild to refresh generated
site content. Research, ADR, and output files automatically enter navigation.
`src/content/docs/` is generated and ignored; do not edit it.
The source PRD and ADR-001 are preserved verbatim.

The default build uses only files in this repository. An optional `DOCS_SOURCE`
override may point to an alternate Markdown directory.
`site.config.mjs` defines the domain and base path for navigation/assets/search.

## GitHub Pages

Pushes to `main` and manual workflow dispatch build and deploy the site.
Pull requests run the same checks/build without deploying.
The workflow installs the lockfile with `npm ci`, checks Astro, builds the site,
verifies internal links, uploads `dist/`, and deploys to the `github-pages`
environment. Actions are pinned to commit SHAs. No extra secret is required.

Pages must use GitHub Actions as its build source. The public site is
https://cmwen.dev/personal-system-docs/.

[Scope](docs/scope.md) · [Decisions](docs/adr/002-astro-documentation-site.md) ·
[Requirements](docs/requirements/index.md) · [Outputs](docs/outputs/index.md)

[Implementation plan](docs/planning/index.md) ·
[Technical design](docs/design/technical-design.md) ·
[AI-friendly repository](docs/design/ai-friendly-repository.md)
