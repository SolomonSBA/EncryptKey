# SmarterASP: Set environment variables for the Node app (api folder)

You have two supported options. Pick one.

---

## Option A — Control Panel (recommended for secrets)

1. Log in to **Control Panel** → **Advance** → **Pool Manager** (or **Environment Variables**, depending on your panel).
2. Select the **Application Pool** used by your site (encryptkey.co.uk).
3. Add each variable with **Name** and **Value**:

| Name | Value |
|------|--------|
| SMTP_HOST | mail5013.site4now.net |
| SMTP_PORT | 587 |
| SMTP_USER | info@encryptkey.co.uk |
| SMTP_PASS | (your mailbox password) |
| CONTACT_TO_EMAIL | contact@sterlingprong.com |
| NEWSLETTER_TO_EMAIL | contact@sterlingprong.com |

4. Save. They are available as `process.env.SMTP_HOST`, etc.

**Do not set PORT** — the host provides it. Your app already uses `process.env.PORT`.

---

## Option B — .env file in the api folder

1. Create a file named **`.env`** at the top of your **api** folder (same folder as **server.js** and **run.cjs**).
2. Use **NAME=value** format, one per line. Example:

```env
SMTP_HOST=mail5013.site4now.net
SMTP_PORT=587
SMTP_USER=info@encryptkey.co.uk
SMTP_PASS=your_mailbox_password
CONTACT_TO_EMAIL=contact@sterlingprong.com
NEWSLETTER_TO_EMAIL=contact@sterlingprong.com
```

3. Replace `your_mailbox_password` with the real password for info@encryptkey.co.uk.
4. **Do not add PORT** — iisnode sets it. The app uses `process.env.PORT`.
5. Upload **.env** to the **api** folder (File Manager or include it when you zip the api folder). **Do not commit .env** to Git.

The app already loads `.env` via `import 'dotenv/config'` at the top of **server.js**, so no code change is needed.

---

## Reply you can send to support

If they asked which method you prefer and what the entry file is, you can say:

**We prefer Option B (.env in the api folder). Our entry file is run.cjs (which loads server.js). We will add a .env file in the api folder with SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, NEWSLETTER_TO_EMAIL and we will not set PORT (per your guidance).**

Or if you prefer the Control Panel:

**We prefer Option A (Control Panel / Pool Manager). We will add the variables there. Our entry file is run.cjs (which loads server.js).**

---

## Summary

| Option | Where | Good for |
|--------|--------|----------|
| **A** | Control Panel → Advance → Pool Manager (or Environment Variables) → your app pool | Central management, no secrets in files |
| **B** | File **.env** in **api** folder, NAME=value, no PORT | Simple, same as local dev; don’t commit .env |

After setting variables (A or B), restart the Node app if needed and test the Contact form again.
