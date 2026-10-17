// Vercel Function: POST /api/contact. Forwards the contact form to the founder's mailbox through Resend.
//
// Environment variables (Vercel > Settings > Environment Variables):
//   RESEND_API_KEY      API key of the Resend account (required)
//   CONTACT_TO_EMAIL    mailbox that receives the requests (required)
//   CONTACT_FROM_EMAIL  sender, e.g. "Capinvest Partners <site@your-verified-domain>" (defaults to Resend's test sender)
//
// Without RESEND_API_KEY or CONTACT_TO_EMAIL the function answers 503: the page then tells the visitor the
// sending failed instead of pretending it worked.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 200, email: 200, operation: 100, message: 5000 };

const clean = (value, max) => String(value ?? '').replace(/\r/g, '').trim().slice(0, max);
const oneLine = (value) => value.replace(/\s+/g, ' ');

export function parse(body) {
  const input = typeof body === 'string' ? safeJson(body) : body || {};
  return {
    name: clean(input.name, LIMITS.name),
    email: clean(input.email, LIMITS.email),
    operation: clean(input.operation, LIMITS.operation),
    message: clean(input.message, LIMITS.message),
    lang: input.lang === 'en' ? 'en' : 'fr',
    honeypot: clean(input.website, 200),
  };
}

function safeJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const data = parse(req.body);
  if (data.honeypot) return res.status(200).json({ ok: true }); // bot: pretend, send nothing
  if (!data.name || !EMAIL.test(data.email)) return res.status(400).json({ error: 'invalid' });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) return res.status(503).json({ error: 'not_configured' });

  const text = [
    `Nom et société : ${data.name}`,
    `E-mail : ${data.email}`,
    `Type d’opération : ${data.operation || '—'}`,
    `Langue du site : ${data.lang}`,
    '',
    data.message || '(pas de message)',
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL || 'Capinvest Partners <onboarding@resend.dev>',
        to: CONTACT_TO_EMAIL.split(',').map((address) => address.trim()),
        reply_to: data.email,
        subject: `Demande via le site — ${oneLine(data.name)}`.slice(0, 200),
        text,
      }),
    });
    if (!response.ok) return res.status(502).json({ error: 'upstream' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'upstream' });
  }
}
