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
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

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

    // Save lead to Google Sheets if webhook URL is configured
    // Después - con await, redirect follow y log completo
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        const sheetsRes = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        body: JSON.stringify({
        name: normalized.name,
        email: normalized.email,
        business: normalized.business,
        message: normalized.message,
        source: 'web-contact',
        status: 'new',
      }),
    });
    const sheetsBody = await sheetsRes.text();
    console.log('Sheets response:', sheetsRes.status, sheetsBody);
  } catch (err) {
    console.error('Google Sheets webhook error:', err.message);
  }
}

    if (AUTO_REPLY_ENABLED) {
      const autoReplyHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px; }
            .email-wrapper { background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: #ffffff; padding: 40px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .header p { margin: 10px 0 0 0; font-size: 14px; opacity: 0.9; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 16px; margin-bottom: 20px; }
            .message-box { background-color: #f3f4f6; border-left: 4px solid #1a1a1a; padding: 15px 20px; margin: 25px 0; border-radius: 4px; }
            .message-box p { margin: 0; font-size: 14px; color: #555; line-height: 1.5; }
            .cta-section { margin: 30px 0; padding: 20px; background-color: #f9fafb; border-radius: 6px; text-align: center; }
            .cta-button { display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; margin-top: 10px; }
            .footer { background-color: #f3f4f6; padding: 25px 30px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #666; }
            .footer p { margin: 8px 0; }
            .divider { height: 1px; background-color: #e5e7eb; margin: 20px 0; }
            .highlight { color: #1a1a1a; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-wrapper">
              <div class="header">
                <h1>✓ Recibimos tu mensaje</h1>
                <p>Tu solicitud está en nuestras manos</p>
              </div>
              
              <div class="content">
                <p class="greeting">Hola <span class="highlight">${normalized.name}</span>,</p>
                
                <p>Gracias por contactarnos. Hemos recibido tu solicitud y la hemos registrado correctamente.</p>
                
                <div class="message-box">
                  <p><strong>Detalles de tu solicitud:</strong></p>
                  <p><strong>Empresa/Negocio:</strong> ${normalized.business}</p>
                  <p><strong>Tu mensaje:</strong></p>
                  <p>${normalized.message.replace(/\n/g, '<br>')}</p>
                </div>
                
                <p>Nuestro equipo revisará tu solicitud con atención y <strong>nos pondremos en contacto dentro de las próximas 24 horas</strong> para discutir cómo podemos ayudarte a potenciar tu negocio.</p>
                
                <div class="cta-section">
                  <p style="margin: 0; font-size: 14px;">¿Preguntas antes de que te contactemos?</p>
                  <p style="margin: 10px 0 0 0; font-size: 13px; color: #666;">Responde a este email directamente</p>
                </div>
                
                <p style="margin-top: 30px; font-size: 14px;">En LYNX, entendemos que cada negocio es único. Tu éxito es nuestro éxito.</p>
              </div>
              
              <div class="footer">
                <p>Equipo LYNX</p>
                <p>www.lynxtheeye.com</p>
                <p style="color: #999; margin-top: 15px;">Este es un email automatizado. Por favor no respondas a este mensaje. Utiliza nuestra página de contacto para comunicarte con nosotros.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

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
          html: autoReplyHtml,
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
