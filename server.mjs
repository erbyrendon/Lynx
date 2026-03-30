import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 8080);
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;
const AUTO_REPLY_ENABLED = (process.env.CONTACT_AUTO_REPLY || '1') === '1';
const AUTO_REPLY_SUBJECT = process.env.CONTACT_AUTO_REPLY_SUBJECT || 'Recibimos tu mensaje - LYNX';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 10;
const ipHits = new Map();

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }
  return req.ip || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const current = ipHits.get(ip) || { count: 0, start: now };

  if (now - current.start > WINDOW_MS) {
    ipHits.set(ip, { count: 1, start: now });
    return false;
  }

  current.count += 1;
  ipHits.set(ip, current);
  return current.count > MAX_REQUESTS;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    res.status(429).json({ ok: false, message: 'Too many requests. Please try again later.' });
    return;
  }

  const {
    name = '',
    email = '',
    business = '',
    message = '',
    website = '',
  } = req.body || {};

  if (typeof website === 'string' && website.trim().length > 0) {
    res.json({ ok: true });
    return;
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof business !== 'string' ||
    typeof message !== 'string'
  ) {
    res.status(400).json({ ok: false, message: 'Invalid payload.' });
    return;
  }

  const normalized = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    business: business.trim(),
    message: message.trim(),
  };

  if (
    normalized.name.length < 2 ||
    normalized.business.length < 2 ||
    normalized.message.length < 10 ||
    !validateEmail(normalized.email)
  ) {
    res.status(400).json({ ok: false, message: 'Please complete all fields correctly.' });
    return;
  }

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    res.status(503).json({ ok: false, message: 'Email service is not configured.' });
    return;
  }

  const subject = `Nuevo lead web: ${normalized.business}`;
  const internalHtml = `
    <h2>Nuevo contacto desde landing LYNX</h2>
    <p><strong>Nombre:</strong> ${normalized.name}</p>
    <p><strong>Email:</strong> ${normalized.email}</p>
    <p><strong>Negocio:</strong> ${normalized.business}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${normalized.message.replace(/\n/g, '<br>')}</p>
    <hr>
    <p><small>IP: ${ip}</small></p>
  `;

  try {
    const sendInternal = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: normalized.email,
        subject,
        html: internalHtml,
      }),
    });

    if (!sendInternal.ok) {
      const errorText = await sendInternal.text();
      let providerMessage = 'Unable to send message right now.';

      try {
        const parsed = JSON.parse(errorText);
        if (parsed?.message && typeof parsed.message === 'string') {
          providerMessage = parsed.message;
        }
      } catch {
        // Keep generic provider message when body is not JSON.
      }

      console.error('Resend internal email failed:', {
        status: sendInternal.status,
        body: errorText,
      });

      res.status(502).json({
        ok: false,
        message: providerMessage,
      });
      return;
    }

    if (AUTO_REPLY_ENABLED) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL,
          to: [normalized.email],
          subject: AUTO_REPLY_SUBJECT,
          html: `
            <p>Hola ${normalized.name},</p>
            <p>Gracias por contactarnos. Recibimos tu solicitud y te responderemos pronto.</p>
            <p><strong>Resumen:</strong></p>
            <p>${normalized.message.replace(/\n/g, '<br>')}</p>
            <p>Equipo LYNX</p>
          `,
        }),
      });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error('Contact API error:', error);
    res.status(500).json({ ok: false, message: 'Unexpected server error.' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
