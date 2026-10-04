# Personal System Graph documentation

Astro 7 + Starlight, TypeScript, static HTML, and Pagefind full-text search.
The workspace `docs/` directory is the canonical source. Generated site content
is ignored by Git; the source PRD and ADR remain untouched.

## Run locally

Requires Node.js 22.12+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Astro. For production search and output:

```sh
npm run check
npm run build
npm run preview
```

Search indexes are created by the production build. The preview serves `dist/`.
Build includes a check of every generated internal page link and anchor.

## Content

Edit Markdown in the workspace root `docs/`, then restart `npm run dev` or rerun
`npm run build`. The preparation step recursively imports new records, derives
titles, rewrites internal links, and rejects unresolved document links.
Research, decisions, and outputs automatically appear in their sidebar groups.
The site adds a landing page linking all registers.

Inside this workspace, source discovery is automatic from canonical checkouts
and isolated worktrees. For a standalone checkout, point `DOCS_SOURCE` at the
canonical docs folder, for example `DOCS_SOURCE=/path/to/docs npm run build`.
The build fails clearly if sources are unavailable.

No remote services, analytics, web fonts, or hosting are required. Deployment is
not configured yet. Personal source paths are included in the source provenance
page; select access/visibility before publishing.
