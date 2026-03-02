# Can't edit .env + "Failed to fetch" after changing package.json

You can't edit **.env**, and after changing **package.json** you get **Failed to fetch** again. Do the following in order.

---

## Part 1: Fix package.json (so the app starts again)

"Failed to fetch" after editing package.json usually means the file became invalid and Node won’t start. Fix it by pasting a **valid** package.json.

In File Manager → **encryptkey** → **Edit** **package.json** → **delete all** → paste **exactly** this (nothing else, no extra spaces at the start/end):

```json
{
  "name": "encryptkey-contact-api",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "nodemailer": "^6.9.16"
  }
}
```

Save. The important part is **"type": "module"** – it must be there so server.js runs as ESM. After saving, try the form again. If you get **Submission failed** (not Failed to fetch), the app is running and we only need to fix SMTP (Part 2).

---

## Part 2: Set SMTP in the Control Panel (because you can’t edit .env)

Since you can’t edit **.env**, set the same variables in the **Control Panel**. The app will read them from the environment.

1. Log in to **Control Panel** → go to **Advance** → **Pool Manager** or **Environment Variables** (the name depends on your panel).
2. Select the **Application Pool** used by **encryptkey.co.uk** (the one for this site).
3. Add these **Environment variables** (name and value). Use your real mailbox password for SMTP_PASS.

| Name | Value |
|------|--------|
| SMTP_HOST | mail5013.site4now.net |
| SMTP_PORT | 587 |
| SMTP_USER | info@encryptkey.co.uk |
| SMTP_PASS | (your real password for info@encryptkey.co.uk) |
| CONTACT_TO_EMAIL | contact@sterlingprong.com |
| NEWSLETTER_TO_EMAIL | contact@sterlingprong.com |

4. Save. Do **not** set **PORT** – the host sets it.
5. **Recycle** the application pool or restart the Node app (if the panel has that option), or wait a minute.
6. Try the contact form again on http://encryptkey.co.uk/contact.

The app uses `process.env.SMTP_HOST`, etc., so it will read these values even without a .env file.

---

## Summary

| Step | What to do |
|------|------------|
| 1 | Fix **package.json** with the multi-line JSON above (keep **"type": "module"**). Save. |
| 2 | In **Control Panel → Advance → Pool Manager** (or Environment Variables), add the 6 variables for the site’s app pool. Save. |
| 3 | Recycle app pool / restart Node if possible, then test the form. |

If you don’t see “Pool Manager” or “Environment Variables”, ask SmarterASP: “I need to set environment variables (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, NEWSLETTER_TO_EMAIL) for my Node app because I can’t edit the .env file. Where do I add them?” They’ll point you to the right place.
