/**
 * EncryptKey: API + React app from one Node server (single folder on host).
 * Serves /api/* and static React app from ./public (SPA fallback to index.html).
 * Config: .env first, then config.local.js (for hosts that strip .env). Do not commit config.local.js with real passwords.
 */
import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const require = createRequire(import.meta.url);

// Load config: env vars first, then config.local.js or config.local.json, then FALLBACK
let localConfig = {};
try {
  localConfig = require(path.join(__dirname, 'config.local.js'));
} catch {
  try {
    const jsonPath = path.join(__dirname, 'config.local.json');
    if (fs.existsSync(jsonPath)) {
      localConfig = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    }
  } catch {
    // optional
  }
}

// FALLBACK: if config files are stripped on the host, put your real password here before upload. DO NOT COMMIT.
const FALLBACK = {
  SMTP_HOST: 'mail5013.site4now.net',
  SMTP_PORT: '587',
  SMTP_USER: 'info@encryptkey.co.uk',
  SMTP_PASS: 'v1AfsTbBa#', // ← put real password here before upload; do not commit
  CONTACT_TO_EMAIL: 'contact@sterlingprong.com',
  NEWSLETTER_TO_EMAIL: 'contact@sterlingprong.com',
};

function env(key) {
  return process.env[key] ?? localConfig[key] ?? FALLBACK[key];
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

function getTransporter() {
  const host = env('SMTP_HOST');
  const user = env('SMTP_USER');
  const pass = env('SMTP_PASS');
  if (!host || !user || !pass) {
    throw new Error('Missing SMTP config: set in .env or config.local.js (SMTP_HOST, SMTP_USER, SMTP_PASS)');
  }
  const port = parseInt(env('SMTP_PORT') || '587', 10);
  const secure = env('SMTP_SECURE') === 'true' || port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

const contactTo = env('CONTACT_TO_EMAIL') || env('SMTP_USER');
const newsletterTo = env('NEWSLETTER_TO_EMAIL') || contactTo;

app.post('/api/contact', async (req, res) => {
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
      from: env('SMTP_USER'),
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
});

app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ ok: false, error: 'Email required' });
    }
    const transporter = getTransporter();
    await transporter.sendMail({
      from: env('SMTP_USER'),
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
});

app.listen(PORT, () => {
  console.log(`Contact API listening on port ${PORT}`);
});
