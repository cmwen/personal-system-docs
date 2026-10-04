import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { site, base } from './site.config.mjs';

export default defineConfig({
  site,
  base,
  integrations: [starlight({
    title: 'Personal System Graph',
    description: 'The product record: scope, requirements, decisions, research, and delivery.',
    favicon: `${base}/favicon.svg`,
    customCss: ['./src/styles/custom.css'],
    sidebar: [
      { label: 'Overview', items: [
        { label: 'Documentation home', slug: '' },
        { label: 'Product scope', slug: 'scope' },
        { label: 'Implementation plan', slug: 'planning' },
        { label: 'Documentation site', slug: 'documentation-site' },
        { label: 'Source provenance', slug: 'sources' },
      ] },
      { label: 'Product requirements', items: [
        { label: 'PRD', slug: 'prd/personal-system-graph', badge: { text: 'Draft', variant: 'caution' } },
        { label: 'Requirements register', slug: 'requirements' },
      ] },
      { label: 'Architecture decisions', items: [{ autogenerate: { directory: 'adr' } }] },
      { label: 'Technical design', items: [{ autogenerate: { directory: 'design' } }] },
      { label: 'Research', items: [{ autogenerate: { directory: 'research' } }] },
      { label: 'Outputs', items: [{ autogenerate: { directory: 'outputs' } }] },
    ],
  })],
});
