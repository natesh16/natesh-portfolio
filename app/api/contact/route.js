import { profile } from '../../../data/portfolio';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || profile.email;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);

const clean = (value, max) => String(value ?? '').trim().slice(0, max);

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (!times.some((time) => now - time < WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

export async function POST(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  if (isRateLimited(ip)) {
    return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let data;
  try {
    const type = request.headers.get('content-type') || '';
    if (type.includes('application/json')) {
      data = await request.json();
    } else {
      data = Object.fromEntries(await request.formData());
    }
  } catch {
    return Response.json({ ok: false, error: 'invalid_request' }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (data.company) return Response.json({ ok: true });

  const name = clean(data.name, 100);
  const email = clean(data.email, 200);
  const subject = clean(data.subject, 150).replace(/[\r\n]+/g, ' ');
  const message = clean(data.message, 5000);

  const fields = {};
  if (name.length < 2) fields.name = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = true;
  if (subject.length < 2) fields.subject = true;
  if (message.length < 10) fields.message = true;

  if (Object.keys(fields).length) {
    return Response.json({ ok: false, error: 'validation', fields }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        ok: false,
        error: 'email_not_configured',
        message: 'Email delivery is not configured on this server.',
      },
      { status: 503 }
    );
  }

  const text = [
    `New message from your portfolio contact form`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '',
    message,
  ].join('\n');

  const html = `
    <h2>New message from your portfolio</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}<br>
    <strong>Email:</strong> ${escapeHtml(email)}<br>
    <strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Contact email failed:', res.status, detail);
      return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
    }
  } catch (error) {
    console.error('Contact email failed:', error);
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
