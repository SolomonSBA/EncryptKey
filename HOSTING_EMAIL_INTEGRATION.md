# How we integrate the hosting email into the application

**Short version:** The website runs in the visitor’s browser. The browser **cannot** send email by itself. So we add a **small server (API)** that receives the form data and uses your **hosting mailbox’s SMTP** to send the email. All messages then **go to** and **come from** the email you create on SmarterASP.

---

## In simple terms

1. **CTO creates an email on SmarterASP**  
   Example: `contact@yourdomain.com`.  
   SmarterASP gives you **SMTP settings** for that mailbox (server, port, username, password). That is how any server “uses” the hosting email to send mail.

2. **We run a small backend (API)**  
   This backend has two jobs:
   - Receive the data when someone submits the Contact form or Newsletter.
   - Send an email using those SMTP settings (so the email is **from** your hosting address and **to** your team / that same mailbox).

3. **The website (frontend)**  
   When the user clicks “Send”, the site sends the form data to **our API** (e.g. `https://yourdomain.com/api/contact`). The API then sends the email via the hosting mailbox. The user still sees “Message Sent!” on the site.

So: **hosting email is integrated by “API + SMTP”.** The API is the only place that needs the SMTP details; the frontend only needs the API URL.

---

## What you need from the CTO (so you don’t sound vague)

Ask for this in one sentence:

**“We need the SMTP details for the mailbox you’ll use for the website (e.g. contact@ourdomain.com): server hostname, port, username (usually the email), and password. We’ll use these only in our small contact API so that all form messages are sent from that address and arrive in that inbox.”**

You can also say:

- **“We’re not using Formspree. We’re using the hosting email. To do that we need a tiny API that sends email via SMTP. That API needs the SMTP settings for the mailbox you create on SmarterASP.”**

---

## What we actually built

- **Backend (small API)**  
  In the repo there is a small Node.js API (in the `server` folder) that:
  - Exposes `POST /api/contact` (Contact page + Contact Sales) and `POST /api/newsletter` (footer signup).
  - Reads SMTP config from environment variables (so we never put passwords in code).
  - Sends email using that SMTP (Nodemailer). So every message is sent **from** the hosting mailbox and can be sent **to** that same mailbox or another internal address.

- **Frontend**  
  The site is configured so that when **hosting email** is used, it sends the form data to **your API** instead of Formspree. You set the API base URL in `.env.production` (e.g. `VITE_CONTACT_API_URL=https://yourdomain.com`). The app then calls `https://yourdomain.com/api/contact` and `https://yourdomain.com/api/newsletter`.

So **integrating the hosting email** = deploy this small API with the SMTP env vars set, point the frontend to that API, and give the API the SMTP details the CTO provides.

**If form emails land in Junk (e.g. Outlook):** See **[REDUCE_JUNK_EMAIL.md](./REDUCE_JUNK_EMAIL.md)** for SPF, DKIM, and Outlook tips. The CTO can do this in SmarterASP (DNS + Webmail DKIM).

---

## What to tell the CTO (copy-paste friendly)

You can send something like this:

---

**Subject:** EncryptKey site – using our hosting email for the contact form

Hi,

We’re going to use the **hosting email** for the website contact form and newsletter (no Formspree). Here’s how it works so we’re aligned:

- The site is static (HTML/JS). It can’t send email by itself.
- We have a **small API** that receives form submissions and sends email using the **SMTP settings** of the mailbox you create on SmarterASP.
- So all messages will **go to** and **come from** that mailbox (e.g. contact@ourdomain.com). No third-party form service is involved.

To wire this up we need the **SMTP details** for that mailbox (after you create it):

- SMTP server (e.g. mail.smarterasp.net or what SmarterASP gives you)
- Port (e.g. 587 or 465)
- Username (usually the full email)
- Password (for that mailbox)

We’ll put these only in the server environment (never in the frontend or in the repo). Can you create the mailbox and share these four details (or a screenshot of the “SMTP” / “Outgoing server” section from the control panel)?

Thanks.

---

That way you’re clear that **using the hosting email = we integrate it via an API that uses the mailbox’s SMTP**, and you’re asking for the one thing you need: SMTP details.
