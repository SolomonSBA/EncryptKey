# Paste these into File Manager (upload makes files 0 KB)

Your host is turning **run.js**, **package.json**, and **.env** into 0 KB when you upload or unzip. So we fix them by **editing** each file in File Manager and **pasting** the content below. Use **Edit** on each file, replace all content with the matching block, then **Save**.

---

## 1. run.js

In File Manager: **encryptkey** → click **Edit** on **run.js** → select all → delete → paste this → **Save**:

```js
(async () => {
  await import('./server.js');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

---

## 2. package.json

**Edit** **package.json** → replace all with this → **Save**:

```json
{"name":"encryptkey-contact-api","version":"1.0.0","type":"module","main":"server.js","scripts":{"start":"node server.js"},"dependencies":{"cors":"^2.8.5","dotenv":"^16.4.5","express":"^4.21.0","nodemailer":"^6.9.16"}}
```

---

## 3. .env

**Edit** **.env** → replace all with this (put your real password where it says `YOUR_MAILBOX_PASSWORD`) → **Save**:

```env
SMTP_HOST=mail5013.site4now.net
SMTP_PORT=587
SMTP_USER=info@encryptkey.co.uk
SMTP_PASS=YOUR_MAILBOX_PASSWORD
CONTACT_TO_EMAIL=contact@sterlingprong.com
NEWSLETTER_TO_EMAIL=contact@sterlingprong.com
```

Replace `YOUR_MAILBOX_PASSWORD` with the real password for info@encryptkey.co.uk. Do **not** add a `PORT=` line.

---

## Why "Submission failed" appeared

The form **did** reach the server (so run.js or server.js is running). The API then tried to send email and failed because **.env** was empty, so `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` were missing. The server returned an error and the frontend showed "Submission failed". Once **.env** has the 6 lines above (with real password), the contact form should send successfully.

---

## If you cannot Edit a file

- If **Edit** is disabled for .env or run.js, use **Control Panel → Advance → Pool Manager** (or **Environment Variables**) and add the same variables there (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, NEWSLETTER_TO_EMAIL). Then the app can work without .env. You still need **run.js** and **package.json** to have content (paste via Edit if possible).
- If the panel won’t let you save pasted content for run.js, ask SmarterASP: “Uploaded run.js and package.json end up 0 KB and I cannot edit them. How can I set the file contents so the Node app can start?”

---

## After pasting

1. Save all three files.
2. Recycle/restart the Node app in the panel if there’s an option.
3. Try the contact form again on http://encryptkey.co.uk/contact.
