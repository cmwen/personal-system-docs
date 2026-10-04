import { base } from '../site.config.mjs';
import { existsSync, readdirSync, readFileSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
function findSource() {
  return path.resolve(process.env.DOCS_SOURCE || 'docs');
}
const source = findSource();
if (!existsSync(source)) throw new Error(`Documentation source does not exist: ${source}`);
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : entry.name.endsWith('.md') ? [file] : [];
  }).sort();
}
const files = walk(source);
const routes = new Map(files.map(file => {
  const slug = path.relative(source, file).split(path.sep).join('/').replace(/\.md$/, '').replace(/(^|\/)index$/, '').toLowerCase();
  return [file, base + '/' + (slug ? slug + '/' : '')];
}));
const output = path.resolve('src/content/docs');
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const file of files) {
  const rel = path.relative(source, file);
  if (rel === 'index.md') continue;
  const raw = readFileSync(file, 'utf8');
  const title = raw.match(/^# (.+)$/m)?.[1];
  if (!title) throw new Error(`Missing document title: ${file}`);
  let fence = '';
  const body = raw.split('\n').map(line => {
    const match = line.match(/^\s*(`{3,}|~{3,})/);
    if (match) { fence = fence === match[1][0] ? '' : match[1][0]; return line; }
    if (fence) return line;
    return line.replace(/(\[[^\]]*\]\()([^\s)]+)(\))/g, (all, before, href, after) => {
      if (!href.split('#')[0].endsWith('.md') || /^[a-z]+:/i.test(href)) return all;
      const [target, fragment] = href.split('#');
      const route = routes.get(path.resolve(path.dirname(file), target));
      if (!route) throw new Error(`Unresolved Markdown link in ${file}: ${href}`);
      return before + route + (fragment ? '#' + fragment : '') + after;
    });
  }).join('\n').replace(/^# .+\n\n?/, '');
  const status = raw.match(/\*\*Status:\*\* (.+?)(?:  )?$/m)?.[1];
  const meta = ['---', `title: ${JSON.stringify(title)}`];
  if (status) meta.push('sidebar:', `  badge: ${JSON.stringify(status.trim())}`);
  meta.push('---', '');
  const target = path.join(output, rel);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, meta.join('\n') + body);
}
writeFileSync(path.join(output, 'index.mdx'), `---
title: Personal System Graph
description: The shared record of what we are building, why, and what we have learned.
template: splash
hero:
  title: See the system. Keep the context.
  tagline: The product record for a local-first view of your software ecosystem — from intended architecture to observed evidence.
  actions:
    - text: Explore the scope
      link: ${base}/scope/
      icon: right-arrow
    - text: Read the requirements
      link: ${base}/requirements/
      variant: secondary
---
import { CardGrid, LinkCard } from '@astrojs/starlight/components';

## The working record

<CardGrid>
  <LinkCard title="Product requirements" description="The draft PRD and 17 traceable requirements define V0 and its validation." href="${base}/prd/personal-system-graph/" />
  <LinkCard title="Architecture decisions" description="ADR-001: user intent is authoritative; discovery supplies evidence." href="${base}/adr/001-user-curated-graph/" />
  <LinkCard title="Research" description="Open questions, evidence, options, and recommendations before decisions." href="${base}/research/" />
  <LinkCard title="Outputs" description="Delivered artifacts, validation evidence, and remaining work." href="${base}/outputs/" />
</CardGrid>

## The V0 boundary

One owner. Five entity kinds. A graph you curate, with GitHub, filesystem, and LocalLink observations attached as evidence. Manual relationships and layout survive rescans. SQLite stores the local graph; AI remains advisory.

[Read the full scope →](${base}/scope/)

## Current status

The PRD is **Draft**. ADR-001 is **Accepted for V0**. Product requirements are captured; product implementation is not verified. This documentation site is the first delivery milestone.

[Documentation site](${base}/documentation-site/) · [Source provenance](${base}/sources/) · [Requirements register](${base}/requirements/)
`);
console.log(`Prepared ${files.length} documentation pages from ${source}`);
