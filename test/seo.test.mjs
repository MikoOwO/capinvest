import test from 'node:test';
import assert from 'node:assert/strict';

process.env.SITE_URL = 'https://capinvest.example/';
const { head, jsonLd, robotsTxt, sitemapXml } = await import('../build.mjs');
const { default: fr } = await import('../src/content/fr.mjs');
const { default: en } = await import('../src/content/en.mjs');

const pages = [
  [fr, en],
  [en, fr],
];

test('titles and descriptions: present, distinct per language, within lint ranges', () => {
  assert.notEqual(fr.meta.title, en.meta.title);
  assert.notEqual(fr.meta.description, en.meta.description);
  for (const { meta } of [fr, en]) {
    assert.ok(meta.title.length >= 30 && meta.title.length <= 80, `title length ${meta.title.length}`);
    assert.ok(meta.description.length >= 70 && meta.description.length <= 160, `description length ${meta.description.length}`);
  }
});

for (const [page, other] of pages) {
  test(`${page.meta.lang}: canonical, hreflang, Open Graph and Twitter tags`, () => {
    const html = head(page, other);
    const url = (path) => `https://capinvest.example${path}`;
    assert.ok(html.includes(`<link rel="canonical" href="${url(page.meta.path)}">`));
    assert.ok(html.includes(`hreflang="fr" href="${url('/')}"`));
    assert.ok(html.includes(`hreflang="en" href="${url('/en')}"`));
    assert.ok(html.includes(`hreflang="x-default" href="${url('/')}"`));
    assert.ok(html.includes(`<meta property="og:url" content="${url(page.meta.path)}">`));
    assert.ok(html.includes(`<meta property="og:image" content="${url('/og-image.png')}">`));
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
    assert.ok(html.includes('content="index, follow, max-image-preview:large"'));
    assert.doesNotMatch(html, /capinvest\.example\/\//, 'no double slash in absolute URLs');
  });

  test(`${page.meta.lang}: JSON-LD is valid and only states what the page says`, () => {
    const data = JSON.parse(jsonLd(page));
    assert.equal(data['@type'], 'Organization');
    assert.equal(data.name, 'Capinvest Partners');
    assert.equal(data.founder.name, 'Maher Zaanouni');
    assert.equal(data.foundingDate, '2009');
    assert.equal(data.description, page.meta.description);
    assert.equal(data.contactPoint, undefined, 'no invented contact data');
    assert.equal(data.sameAs, undefined, 'no invented social profile');
  });
}

test('sitemap lists both languages with reciprocal alternates', () => {
  const xml = sitemapXml();
  assert.match(xml, /<loc>https:\/\/capinvest\.example\/<\/loc>/);
  assert.match(xml, /<loc>https:\/\/capinvest\.example\/en<\/loc>/);
  assert.equal((xml.match(/hreflang="x-default"/g) || []).length, 2);
});

test('robots.txt allows crawling, hides the API and points to the sitemap', () => {
  const txt = robotsTxt();
  assert.match(txt, /^User-agent: \*\nAllow: \/\nDisallow: \/api\//);
  assert.match(txt, /Sitemap: https:\/\/capinvest\.example\/sitemap\.xml/);
});
