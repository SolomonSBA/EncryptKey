# EncryptKey Contact API

This small server receives form submissions from the website and sends email using **your hosting mailbox’s SMTP**. All messages go to and from the email you create on SmarterASP (or your host).

## What you need from the CTO / hosting

After they create the domain mailbox (e.g. `contact@yourdomain.com`) on SmarterASP, get these from the hosting control panel (usually under “Email” / “SMTP” / “Outgoing server”):

- **SMTP server** (e.g. `mail.smarterasp.net`)
- **Port** (often 587 or 465)
- **Username** (usually the full email)
- **Password** (for that mailbox)

## Setup

1. Copy env example and fill in real values:
   ```bash
   copy .env.example .env
   ```
   Edit `.env` with the SMTP details. Do not commit `.env`.

2. Install and run:
   ```bash
   npm install
   npm start
   ```
   Server runs on port 3000 by default (or set `PORT` in `.env`).

## Deploying to SmarterASP (Node.js)

SmarterASP supports Node.js hosting. In the control panel:

1. Create a Node.js app / site and set the start command to `node server.js` (or `npm start`) from the folder that contains `server.js` and `package.json`.
2. Set the environment variables (SMTP_*, CONTACT_TO_EMAIL, etc.) in the panel. Do not put passwords in code.
3. Form emails are sent **to** the company inbox (set `CONTACT_TO_EMAIL` and `NEWSLETTER_TO_EMAIL` in `.env`, e.g. `info@sterlingpro.com`) so the team can read and reply from there without logging into the hosting mailbox.
4. Note the URL of the API (e.g. `https://yourdomain.com` or `https://api.yourdomain.com`). You will use this in the **frontend** as `VITE_CONTACT_API_URL` when building the website.

## Frontend

In the main EncryptKey project (frontend), set in `.env.production`:

```
VITE_CONTACT_API_URL=https://yourdomain.com
```

(Use the URL where this API is deployed, with no trailing slash.)

Then run `npm run build`. The site will send the contact and newsletter forms to this API instead of Formspree.

## Endpoints

- `POST /api/contact` – body: `{ firstName, lastName, email, company, reason, message }`. Sends one email to `CONTACT_TO_EMAIL`.
- `POST /api/newsletter` – body: `{ email }`. Sends one email to `NEWSLETTER_TO_EMAIL`.

Both use the same SMTP (your hosting mailbox). Replies from your team can be sent from that same mailbox so everything comes from your company address.
