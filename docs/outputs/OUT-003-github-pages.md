# OUT-003: Standalone documentation repository and GitHub Pages

**Date:** 2026-10-04  
**Status:** Publishing configured

## Artifact

- Repository: https://github.com/cmwen/personal-system-docs
- Site: https://cmwen.github.io/personal-system-docs/
- Deployment logs: https://github.com/cmwen/personal-system-docs/actions
- Decision: [ADR-003](../adr/003-standalone-repository-and-pages.md)

## Delivered configuration

Canonical Markdown is versioned in this repository's `docs/`. A fresh checkout
builds without the agent workspace. GitHub Actions checks/builds pull requests,
and builds/deploys `main` to GitHub Pages. Dependencies use the committed lockfile;
Actions use pinned SHAs. Links and assets include the Pages project base path.

## Validation

Required before publishing: `npm run check`, `npm run build`, and generated
page/anchor verification. The Actions workflow repeats these checks from a clean
checkout before deployment. Workflow success and the live URL are the evidence
for publication; this record describes the configuration and is not a substitute
for checking the workflow result.

## Follow-up

Discuss the product implementation: persistence/authority model, manual graph
editing, graph lenses, identity resolution, and discovery adapters. No product
code is introduced by this documentation move.
