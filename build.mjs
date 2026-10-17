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

// Absolute URL of the site (e.g. https://capinvest.com), used for canonical, hreflang, Open Graph, JSON-LD and the
// sitemap. SITE_URL wins; on Vercel the production domain is picked up automatically. Without any of them (local
// build) these absolute-URL tags are simply left out.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/+$/, '');
const abs = (path) => siteUrl + path;

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

export const jsonLd = (content) => {
  const { seo, founder, meta } = content;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': abs('/#organization'),
    name: 'Capinvest Partners',
    url: abs('/'),
    logo: abs('/apple-touch-icon.png'),
    image: abs('/og-image.png'),
    description: meta.description,
    foundingDate: '2009',
    areaServed: seo.areas,
    knowsAbout: seo.knowsAbout,
    founder: {
      '@type': 'Person',
      name: founder.name,
      jobTitle: seo.founderJobTitle,
      image: abs('/assets/maher-zaanouni.png'),
    },
  };
  return JSON.stringify(data, null, 2).replaceAll('<', '\\u003c');
};

export function head(content, other) {
  const { meta, language, seo } = content;
  const urlTags = siteUrl
    ? `
<link rel="canonical" href="${abs(meta.path)}">
<link rel="alternate" hreflang="${meta.lang}" href="${abs(meta.path)}">
<link rel="alternate" hreflang="${language.otherLang}" href="${abs(other.meta.path)}">
<link rel="alternate" hreflang="x-default" href="${abs(fr.meta.path)}">
<meta property="og:url" content="${abs(meta.path)}">
<meta property="og:image" content="${abs('/og-image.png')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(seo.imageAlt)}">
<meta name="twitter:image" content="${abs('/og-image.png')}">
<meta name="twitter:image:alt" content="${esc(seo.imageAlt)}">
<script type="application/ld+json">
${jsonLd(content)}
</script>`
    : '';
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0B2545">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Capinvest Partners">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:locale" content="${meta.locale}">
<meta property="og:locale:alternate" content="${other.meta.locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(meta.title)}">
<meta name="twitter:description" content="${esc(meta.description)}">${urlTags}
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/montserrat-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/ibm-plex-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css">
<script src="/site.js" defer></script>`;
}

export function robotsTxt() {
  return ['User-agent: *', 'Allow: /', 'Disallow: /api/', ...(siteUrl ? ['', `Sitemap: ${abs('/sitemap.xml')}`] : [])].join('\n') + '\n';
}

export function sitemapXml() {
  const alternates = pages
    .map(({ content }) => `    <xhtml:link rel="alternate" hreflang="${content.meta.lang}" href="${abs(content.meta.path)}"/>`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(fr.meta.path)}"/>`)
    .join('\n');
  const urls = pages
    .map(({ content }) => `  <url>\n    <loc>${abs(content.meta.path)}</loc>\n${alternates}\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

export async function build() {
  const template = (await readFile(join(root, 'src/template.html'), 'utf8')).replace(/<!--[\s\S]*?-->\n?/g, '');
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await cp(join(root, 'public'), dist, { recursive: true });
  await cp(join(root, 'src/styles.css'), join(dist, 'styles.css'));
  await cp(join(root, 'src/site.js'), join(dist, 'site.js'));

  await writeFile(join(dist, 'robots.txt'), robotsTxt());
  if (siteUrl) await writeFile(join(dist, 'sitemap.xml'), sitemapXml());

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
