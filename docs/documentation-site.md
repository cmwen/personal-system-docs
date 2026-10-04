# Documentation site brief

**Status:** Implemented; GitHub Pages publishing configured  
**Recorded:** 2026-10-04

## Purpose

Create a readable, searchable home for PRDs, ADRs, requirements, research, and
outputs before product implementation. This is a delivery aid for Personal
System Graph, not another feature of its V0 runtime.

## Content and navigation

Use [the documentation hub](index.md) as the landing page. Navigation should
expose Scope, PRD, Decisions, Requirements, Research, and Outputs. Publish the
existing Markdown files as the canonical content; do not maintain separate site
copies. Show document status and source provenance, and support stable links
between requirements, decisions, research findings, and outputs.

## Proposed site acceptance checks

- Every record is reachable through navigation and links work.
- Full-text search locates requirement IDs and decision titles.
- Readers can distinguish Draft, Accepted, Proposed, and completed work.
- Pages are readable on desktop and mobile, with keyboard-accessible navigation.
- A local preview and reproducible build are documented; the build detects
  broken internal links.
- Research and outputs can be added using the register templates.
- Hosting visibility is chosen explicitly before publication of personal paths
  or architecture information.

## Decisions to make at implementation

The owner selected Astro on 2026-10-04. [ADR-002](adr/002-astro-documentation-site.md)
records Astro with Starlight in the independent `repos/personal-system-docs`
repository. Canonical Markdown now lives in the documentation repository. The owner selected
public GitHub Pages on 2026-10-04; [ADR-003](adr/003-standalone-repository-and-pages.md)
records this change.

The repository is registered under `repos/` and implemented through the workspace
Run/candidate workflow. [OUT-002](outputs/OUT-002-astro-documentation-site.md)
records delivery evidence and limitations.
