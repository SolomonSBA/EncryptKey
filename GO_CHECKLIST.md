# Code review: you're good to go (single-folder deploy)

I went through the full codebase. Everything is wired correctly for the **single-folder** setup. Use this checklist when you deploy.

---

## What was verified

| Area | Status |
|------|--------|
| **server/server.js** | Serves `/api/contact` and `/api/newsletter`, then static files from `./public`, then SPA fallback to `index.html`. Uses `process.env.PORT`. |
| **server/run.cjs** | Loads `server.js` (ES module). Used as entry by web.config. |
| **server/web.config** | iisnode, handler **run.cjs**, rewrite to run.cjs. No env vars (use .env). |
| **server/package.json** | `"type": "module"`, has express, cors, nodemailer, dotenv. |
| **server/.env** | You have it; must contain SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, NEWSLETTER_TO_EMAIL. **No PORT** on the host. |
| **Frontend (formspree.ts)** | Uses `VITE_CONTACT_API_URL` and posts to `/api/contact` and `/api/newsletter`. Matches the server routes. |
| **.env.production** | Has `VITE_CONTACT_API_URL=https://encryptkey.co.uk`. Build will use this. |
| **package.json (root)** | Has `build:single`: runs `vite build` then copies **dist** → **server/public**. |

No code changes needed. Follow the steps below.

---

## Deploy steps (in order)

Do these from your **project root** (the EncryptKey folder that contains `src` and `server`).

### 1. .env.production

Already set: `VITE_CONTACT_API_URL=https://encryptkey.co.uk`. Leave as is.

### 2. Build frontend into server/public

In a terminal, from the **project root**:

```bash
npm run build:single
```

- This runs `vite build` and copies the contents of **dist** into **server/public**.
- If you get an error (e.g. Node too old), do it by hand: run `npm run build`, then copy everything inside **dist** into **server/public** (create **server/public** if needed).

### 3. Server .env

In the **server** folder, open **.env**. It must have (no PORT on production):

- SMTP_HOST=mail5013.site4now.net  
- SMTP_PORT=587  
- SMTP_USER=info@encryptkey.co.uk  
- SMTP_PASS=(your real password)  
- CONTACT_TO_EMAIL=contact@sterlingprong.com  
- NEWSLETTER_TO_EMAIL=contact@sterlingprong.com  

### 4. Install server dependencies

In a terminal:

```bash
cd server
npm install
cd ..
```

### 5. Zip the server folder contents

1. Open the **server** folder in Explorer.
2. Select **all** of: **server.js**, **run.cjs**, **web.config**, **package.json**, **package-lock.json**, **.env**, **node_modules** (folder), **public** (folder).
3. Right‑click → Send to → Compressed (zipped) folder (or use your zip tool).  
   The zip should **not** contain a parent “server” folder – only those files and the two folders.

### 6. Upload to SmarterASP

1. **File Manager** → go to the **site root** for encryptkey.co.uk (the **encryptkey** folder).
2. Optional: remove or move the old **api** folder and any old root files so only the new app is there.
3. **Upload** the zip and **Unzip** in the root.  
   After unzip you should see: **server.js**, **run.cjs**, **web.config**, **package.json**, **.env**, **node_modules**, **public** (with **index.html** and **assets** inside).

### 7. Enable Node for the site root

1. **Control Panel** → **Websites** → **Manage Website** (encryptkey.co.uk) → **Setup Node.js App** (or **NodeJS**).
2. Set the **folder/path** to the **site root** (leave blank or default – **not** “api”).
3. Set **Application startup file** to **run.cjs**.
4. Save. If you see “[OK] NodeJS Application Created.” that’s correct.

### 8. If the panel overwrote web.config

If the root **web.config** was replaced by the panel, restore the **Node** one:

- In **File Manager** → **encryptkey** → **Edit** **web.config**.
- Paste the same content as in your **server/web.config** (iisnode, handler **run.cjs**). Save.

### 9. Test

1. Open **https://encryptkey.co.uk** → React site should load.  
2. Open **https://encryptkey.co.uk/api/contact** → should show `{"status":"ok","message":"Contact API"}`.  
3. Submit the **Contact** form on the site → should succeed (no “Failed to fetch”).

---

## Summary

- **Server**: API + static + SPA from one Node app; **run.cjs** entry; **.env** for SMTP.  
- **Frontend**: Build with **VITE_CONTACT_API_URL=https://encryptkey.co.uk**; forms POST to **/api/contact** and **/api/newsletter**.  
- **Deploy**: One zip (server contents + **public** from build) in the **site root**; Node.js enabled for the **root**; startup file **run.cjs**.

You’re good to go. Follow the steps above in order.
