# ADR-002: Publish workspace documentation with Astro and Starlight

**Status:** Accepted  
**Date:** 2026-10-04

## Context

The workspace needs a documentation site for PRDs, ADRs, requirements, research,
and outputs. The owner explicitly selected Astro and current web technology.
Existing Markdown records must remain the source of truth, including the original
status and content of the imported PRD and ADR-001.

## Decision

Use Astro with Starlight to generate a static documentation site in the independent
`repos/personal-system-docs` repository. Use the current compatible releases,
TypeScript supported by the Astro checker, and an npm lockfile.

The workspace `docs/` directory remains canonical. A preparation script adds
site frontmatter and rewrites document links into routes in ignored generated
content. The site supplies a purpose-built landing page; source records remain
unchanged. Research, ADRs, and outputs are discovered recursively for navigation.

Use Starlight's Pagefind search, theme control, responsive navigation, and code
highlighting. Use system fonts and local styling. Build static output locally;
hosting and access visibility remain undecided.

Require Astro checks, a production build, and verification of generated internal
links and anchors before workspace candidate integration.

## Consequences

- Documentation content has one maintained location and can be read without the site.
- Production builds include a full-text search index.
- A standalone checkout needs `DOCS_SOURCE` pointing to the canonical records.
- Content edits require restarting the local dev command or rebuilding the site.
- This decision applies to the documentation site only; the product's native/PWA
  architecture and other open V0 implementation decisions remain open.

## Subsequent decision

[ADR-003](003-standalone-repository-and-pages.md) moves canonical documents into
this independent repository and selects public GitHub Pages. The Astro/Starlight
choice remains in effect; workspace-only content discovery is superseded.
