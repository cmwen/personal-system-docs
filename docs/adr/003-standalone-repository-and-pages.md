# ADR-003: Own documentation in a standalone repository and publish with GitHub Pages

**Status:** Accepted  
**Date:** 2026-10-04

## Context

The owner requested moving the documents into a new repository and making the
Astro site live on GitHub Pages through GitHub Actions. The existing site depended
on a parent workspace's Markdown, which prevented a clean CI checkout from building.

## Decision

Publish the independent documentation repository as
[cmwen/personal-system-docs](https://github.com/cmwen/personal-system-docs).
Store canonical Markdown in its `docs/` directory beside the site code and lockfile.
The original PRD and ADR-001 remain verbatim.

Publish publicly at https://cmwen.dev/personal-system-docs/.
The project inherits the account's `cmwen.dev` domain. Enable HTTPS enforcement.
Use `site.config.mjs` for the domain/base path and apply that base consistently to
content links, landing-page actions, assets, and built-page link validation.

Use GitHub Actions to install, check, build, validate links, upload the static
artifact, and deploy to the `github-pages` environment. Pushes to `main` and
manual dispatch publish; pull requests validate without deploying. Pin Actions
to commit SHAs and use minimal job permissions.

A workspace `docs` symlink may preserve navigation into the canonical repository
without maintaining duplicate content. The default site build needs no parent
workspace. `DOCS_SOURCE` remains an optional override.

## Consequences

Documentation changes travel with site changes, and a fresh GitHub checkout can
build reproducibly. The site is public. Deployment status and logs are available
in the repository's Actions tab.

This changes documentation ownership/hosting only. It does not choose the product
client architecture, scanner protocol, graph engine, or detailed persistence schema.

## Supersedes

The workspace-owned content and undecided-hosting portions of
[ADR-002](002-astro-documentation-site.md); its Astro/Starlight decision remains.
