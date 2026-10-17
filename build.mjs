// Static build, no dependency: src/template.html + src/content/<lang>.mjs -> dist/
//   dist/index.html  French (default)
//   dist/en.html     English, served at /en (Vercel cleanUrls)
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import fr from './src/content/fr.mjs';
import en from './src/content/en.mjs';
import { SLOTS, esc } from './src/render.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const pages = [
  { content: fr, file: 'index.html' },
  { content: en, file: 'en.html' },
];

// Optional absolute URL of the site (e.g. https://capinvest.com): enables canonical, hreflang and og:url.
const siteUrl = (process.env.SITE_URL || '').replace(/\/+$/, '');

function lookup(obj, path) {
  const value = path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
  if (value === undefined || value === null) throw new Error(`Missing template value: ${path}`);
  return value;
}

export function renderBody(template, content) {
  const fr_ = content.meta.lang === 'fr';
  const view = {
    ...content,
    lang: {
      frStyle: fr_ ? 'opacity:1' : 'opacity:0.6',
      enStyle: fr_ ? 'opacity:0.6' : 'opacity:1',
      knobLeft: fr_ ? '2px' : '18px',
    },
  };
  return template
    .replace(/\{\{\{(\w+)\}\}\}/g, (_, slot) => {
      if (!SLOTS[slot]) throw new Error(`Unknown slot: ${slot}`);
      return SLOTS[slot](content);
    })
    .replace(/\{\{([\w.]+)\}\}/g, (_, path) => esc(lookup(view, path)));
}

function head(content, other) {
  const { meta, language } = content;
  const absolute = (p) => siteUrl + p;
  const alternates = siteUrl
    ? `
<link rel="canonical" href="${absolute(meta.path)}">
<link rel="alternate" hreflang="${meta.lang}" href="${absolute(meta.path)}">
<link rel="alternate" hreflang="${language.otherLang}" href="${absolute(other.meta.path)}">
<link rel="alternate" hreflang="x-default" href="${absolute(fr.meta.path)}">
<meta property="og:url" content="${absolute(meta.path)}">`
    : '';
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<meta name="theme-color" content="#0B2545">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Capinvest Partners">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:locale" content="${meta.locale}">
<meta property="og:locale:alternate" content="${other.meta.locale}">${alternates}
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/montserrat-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/ibm-plex-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css">
<script src="/site.js" defer></script>`;
}

export async function build() {
  const template = (await readFile(join(root, 'src/template.html'), 'utf8')).replace(/<!--[\s\S]*?-->\n?/g, '');
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await cp(join(root, 'public'), dist, { recursive: true });
  await cp(join(root, 'src/styles.css'), join(dist, 'styles.css'));
  await cp(join(root, 'src/site.js'), join(dist, 'site.js'));

  for (const { content, file } of pages) {
    const other = pages.find((p) => p.content !== content).content;
    const html = `<!DOCTYPE html>
<html lang="${content.meta.lang}">
<head>
${head(content, other)}
</head>
<body>
${renderBody(template, content)}
</body>
</html>
`;
    await writeFile(join(dist, file), html);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await build();
  console.log('Built dist/ (index.html, en.html)');
}
