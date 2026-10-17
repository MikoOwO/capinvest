import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import fr from '../src/content/fr.mjs';
import en from '../src/content/en.mjs';
import { renderBody } from '../build.mjs';

const template = await readFile(new URL('../src/template.html', import.meta.url), 'utf8');

// Same keys, same array lengths, no empty string: the English site cannot silently lose a block.
function shape(a, b, path = '') {
  if (Array.isArray(a)) {
    assert.ok(Array.isArray(b), `${path} must be an array in both languages`);
    assert.equal(b.length, a.length, `${path}: ${a.length} items in fr, ${b.length} in en`);
    a.forEach((item, i) => shape(item, b[i], `${path}[${i}]`));
  } else if (a && typeof a === 'object') {
    assert.deepEqual(Object.keys(b).sort(), Object.keys(a).sort(), `${path}: keys differ`);
    for (const key of Object.keys(a)) shape(a[key], b[key], `${path}.${key}`);
  } else {
    assert.equal(typeof b, 'string', `${path} must be a string`);
    assert.ok(a.length > 0 && b.length > 0, `${path} is empty`);
  }
}

test('fr and en content have the same structure', () => shape(fr, en));

test('transactions keep the same category and year in both languages', () => {
  fr.references.deals.forEach((deal, i) => {
    const other = en.references.deals[i];
    assert.equal(other.cat, deal.cat, `deal ${i}: category`);
    assert.equal(other.year, deal.year, `deal ${i}: year`);
  });
  assert.deepEqual(en.references.categories.map((c) => c.id), fr.references.categories.map((c) => c.id));
  for (const deal of fr.references.deals) {
    assert.ok(fr.references.categories.some((c) => c.id === deal.cat), `unknown category ${deal.cat}`);
  }
});

for (const content of [fr, en]) {
  test(`${content.meta.lang}: page renders without unresolved placeholder`, () => {
    const html = renderBody(template.replace(/<!--[\s\S]*?-->/g, ''), content);
    assert.doesNotMatch(html, /\{\{|\}\}|undefined|\[object/);
    assert.match(html, /href="https:\/\/melik\.zaanouni\.com"/);
  });
}

test('fr and en pages have the same element structure', () => {
  const tags = (content) => {
    const html = renderBody(template.replace(/<!--[\s\S]*?-->/g, ''), content);
    const count = {};
    for (const [, tag] of html.matchAll(/<([a-z][a-z0-9-]*)[\s>/]/g)) count[tag] = (count[tag] || 0) + 1;
    return count;
  };
  assert.deepEqual(tags(en), tags(fr));
});

test('language switch points to the other language', () => {
  assert.equal(fr.language.otherPath, en.meta.path);
  assert.equal(en.language.otherPath, fr.meta.path);
});
