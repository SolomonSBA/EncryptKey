# config.local.js – use when you can't edit .env or use Control Panel

When the host strips **.env** and you can't set environment variables in the Control Panel (e.g. no extra application pools), put your SMTP and email settings in **config.local.js**. The server reads it automatically.

---

## Step 1: Create config.local.js on your PC

1. In the **server** folder, copy **config.local.example.js** and rename the copy to **config.local.js**.
2. Open **config.local.js** and replace **your_mailbox_password_here** with the real password for info@encryptkey.co.uk. Leave the rest as is (or change if your details differ):

```js
module.exports = {
  SMTP_HOST: 'mail5013.site4now.net',
  SMTP_PORT: '587',
  SMTP_USER: 'info@encryptkey.co.uk',
  SMTP_PASS: 'your_real_password_here',
  CONTACT_TO_EMAIL: 'contact@sterlingprong.com',
  NEWSLETTER_TO_EMAIL: 'contact@sterlingprong.com',
};
```

3. **Do not commit** config.local.js (it’s in .gitignore). Use it only on your PC and on the server.

---

## Step 2: Upload config.local.js to the server

- Upload **config.local.js** to the **encryptkey** root (same place as server.js, run.js, web.config) via File Manager.
- Or include it when you zip and upload the server folder.

The app loads **.env** first, then falls back to **config.local.js**. So even if .env is empty or missing on the server, the contact form will use the values from config.local.js.

---

## Security

- **config.local.js** is in **.gitignore**, so it won’t be committed.
- Don’t commit it with a real password. Use it only for deployment (upload to the server, keep a local copy only on your machine).
- When you can use .env or Control Panel env vars again, you can remove config.local.js from the server; the app will use env vars first.
