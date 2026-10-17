import test from 'node:test';
import assert from 'node:assert/strict';
import handler, { parse } from '../api/contact.js';

function call(method, body, env = {}) {
  const saved = { ...process.env };
  Object.assign(process.env, { RESEND_API_KEY: '', CONTACT_TO_EMAIL: '', ...env });
  const res = {
    headers: {}, statusCode: 200, payload: null,
    setHeader(k, v) { this.headers[k] = v; },
    status(code) { this.statusCode = code; return this; },
    json(p) { this.payload = p; return this; },
  };
  return handler({ method, body }, res).then(() => { process.env = saved; return res; });
}

const valid = { name: 'Jane Doe, ACME', email: 'jane@acme.com', operation: 'Cession', message: 'Hello', lang: 'en' };

test('rejects anything but POST', async () => {
  const res = await call('GET');
  assert.equal(res.statusCode, 405);
});

test('rejects an invalid email or a missing name', async () => {
  assert.equal((await call('POST', { ...valid, email: 'nope' })).statusCode, 400);
  assert.equal((await call('POST', { ...valid, name: '  ' })).statusCode, 400);
});

test('honeypot: answers ok without sending', async (t) => {
  t.mock.method(globalThis, 'fetch', () => { throw new Error('must not send'); });
  const res = await call('POST', { ...valid, website: 'http://spam' }, { RESEND_API_KEY: 'k', CONTACT_TO_EMAIL: 'a@b.co' });
  assert.equal(res.statusCode, 200);
});

test('not configured: 503, never a fake success', async () => {
  assert.equal((await call('POST', valid)).statusCode, 503);
});

test('sends through Resend with reply-to and a single-line subject', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => ({ ok: true }));
  const res = await call('POST', { ...valid, name: 'Evil\r\nBcc: x@y.z' }, { RESEND_API_KEY: 'key', CONTACT_TO_EMAIL: 'founder@example.com, b@example.com' });
  assert.equal(res.statusCode, 200);
  const [url, init] = fetchMock.mock.calls[0].arguments;
  assert.equal(url, 'https://api.resend.com/emails');
  assert.equal(init.headers.Authorization, 'Bearer key');
  const sent = JSON.parse(init.body);
  assert.deepEqual(sent.to, ['founder@example.com', 'b@example.com']);
  assert.equal(sent.reply_to, 'jane@acme.com');
  assert.doesNotMatch(sent.subject, /[\r\n]/);
});

test('upstream failure is reported', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: false }));
  const res = await call('POST', valid, { RESEND_API_KEY: 'key', CONTACT_TO_EMAIL: 'a@b.co' });
  assert.equal(res.statusCode, 502);
});

test('parse caps field lengths', () => {
  assert.equal(parse({ message: 'x'.repeat(9000) }).message.length, 5000);
  assert.equal(parse('{bad json').name, '');
});
