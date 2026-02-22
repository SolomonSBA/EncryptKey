/**
 * EncryptKey: API + React app from one Node server (single folder on host).
 * Serves /api/* and static React app from ./public (SPA fallback to index.html).
 * Set SMTP_*, CONTACT_TO_EMAIL, NEWSLETTER_TO_EMAIL in .env.
 */
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error('Missing SMTP config: set SMTP_HOST, SMTP_USER, SMTP_PASS');
  }
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

const contactTo = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
const newsletterTo = process.env.NEWSLETTER_TO_EMAIL || contactTo;

// Contact handler (used for both /api/contact and /contact when app is mounted at /api)
async function handleContact(req, res) {
  try {
    const { firstName, lastName, email, company, reason, message, _subject } = req.body || {};
    console.log('Contact form received from', email || '(no email)');
    const subject = _subject || 'EncryptKey website – Contact form';
    const transporter = getTransporter();
    const text = [
      `Name: ${firstName || ''} ${lastName || ''}`.trim(),
      `Email: ${email || ''}`,
      `Company: ${company || ''}`,
      `Reason: ${reason || ''}`,
      '',
      (message || '').trim(),
    ].join('\n');
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: contactTo,
      replyTo: email || undefined,
      subject,
      text,
    });
    console.log('Contact email sent to', contactTo);
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Contact send error:', e);
    res.status(500).json({ ok: false, error: e.message || 'Failed to send' });
  }
}

// Newsletter handler (used for both /api/newsletter and /newsletter when app is mounted at /api)
async function handleNewsletter(req, res) {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ ok: false, error: 'Email required' });
    }
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: newsletterTo,
      replyTo: email,
      subject: 'EncryptKey website – Newsletter signup',
      text: `New newsletter signup: ${email}`,
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Newsletter send error:', e);
    res.status(500).json({ ok: false, error: e.message || 'Failed to send' });
  }
}

// —— API routes (must be before static so /api/* is not served as files)
app.get('/api/contact', (req, res) => res.json({ status: 'ok', message: 'Contact API' }));
app.get('/api', (req, res) => res.json({ status: 'ok', message: 'EncryptKey API' }));
app.post('/api/contact', handleContact);
app.post('/api/newsletter', handleNewsletter);

// —— Static React app (from ./public – build output goes here)
app.use(express.static(path.join(__dirname, 'public')));

// —— SPA fallback: non-file GET requests → index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`EncryptKey (API + site) listening on port ${PORT}`);
});
