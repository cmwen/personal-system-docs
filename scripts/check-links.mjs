import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
const root = path.resolve('dist');
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : entry.name.endsWith('.html') ? [file] : [];
  });
}
const pages = walk(root);
const errors = [];
let checked = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const route = '/' + path.relative(root, page).split(path.sep).join('/').replace(/index\.html$/, '');
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (/^(?:[a-z][\w+.-]*:|\/\/)/i.test(href)) continue;
    const url = new URL(href, `https://docs.local${route}`);
    let target = path.join(root, decodeURIComponent(url.pathname));
    if (!path.extname(target)) target = path.join(target, 'index.html');
    if (!existsSync(target)) { errors.push(`${route} -> ${href}: missing file`); continue; }
    if (url.hash && target.endsWith('.html')) {
      const id = decodeURIComponent(url.hash.slice(1));
      const targetHtml = target === page ? html : readFileSync(target, 'utf8');
      if (id && !targetHtml.includes(`id="${id}"`)) errors.push(`${route} -> ${href}: missing anchor`);
    }
    checked++;
  }
}
if (errors.length) throw new Error(errors.join('\n'));
console.log(`Verified ${checked} internal links/anchors across ${pages.length} HTML pages.`);
if (!existsSync(path.join(root, 'pagefind/pagefind.js'))) throw new Error('Pagefind search index missing');
console.log('Production search index is present.');
