# Deploy & email setup – checklist for next site (e.g. sterlingpro)

Use this when you build another site (React + Vite + Node contact API) and want to set up email and deploy on SmarterASP **without** repeating the issues we had on EncryptKey. Follow it in order.

---

## What we learned from EncryptKey (avoid these)

| Issue | What to do instead |
|-------|---------------------|
| Separate **/api** folder + virtual directory | Use **single-folder** deploy: Node at site root serves both the React app and the API. No /api subfolder, no virtual directory. |
| **run.cjs** / **run.js** / **.env** / **package.json** become **0 KB** on upload | Put SMTP and email config in **FALLBACK** inside **server.js** (see template below). Before upload, fill in the real password in FALLBACK; do not commit. Optionally also use **config.local.js** (gitignored) as backup. |
| Can't edit **.env** on the host | Don't rely on .env. Use FALLBACK in server.js or config.local.js. |
| **Control Panel** env vars / extra app pool | Not required if FALLBACK works. Skip Pool Manager if you have no extra pools. |
| **HTTP** until SSL is paid | Build with **VITE_CONTACT_API_URL=http://yourdomain.com**. When SSL is ready, switch to **https://** and rebuild + re-upload **public**. |
| Two web.configs, root overwritten by panel | Single folder = **one** web.config (iisnode, entry **run.js**). No SPA web.config in root. |

---

## Before you start (gather once)

- [ ] **Domain** for the new site (e.g. sterlingprong.com or sterlingpro.co.uk).
- [ ] **SMTP details** for the mailbox you'll use (e.g. info@sterlingprong.com):
  - SMTP_HOST, SMTP_PORT (usually 587), SMTP_USER, SMTP_PASS
- [ ] **Where to receive form emails**: CONTACT_TO_EMAIL, NEWSLETTER_TO_EMAIL (e.g. contact@sterlingprong.com).

---

## 1. Project setup (same as EncryptKey)

- [ ] **Server folder**: Express app with **server.js** (serves `/api/contact`, `/api/newsletter` and **static** from `./public` + SPA fallback).
- [ ] **Entry**: **run.js** (loads server.js) and **web.config** (iisnode, path **run.js**).
- [ ] **Config**: In **server.js**, a **FALLBACK** object with SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, NEWSLETTER_TO_EMAIL. Use empty string for SMTP_PASS until deploy; fill it in right before upload and **do not commit**.
- [ ] **Frontend**: Forms POST to `VITE_CONTACT_API_URL + '/api/contact'` and `.../api/newsletter`. Build with **VITE_CONTACT_API_URL=http://yourdomain.com** (or https when SSL is ready).
- [ ] **Build**: Script **build:single** runs `vite build` and copies **dist** → **server/public**.

---

## 2. Deploy steps (in order)

1. **.env.production** (project root):  
   `VITE_CONTACT_API_URL=http://yourdomain.com` (or https when SSL is ready).

2. **FALLBACK in server.js**: Fill in **SMTP_PASS** (and confirm other FALLBACK values). Do not commit.

3. **Build**:  
   `npm run build:single`

4. **Server folder**: Ensure **server** has: server.js, run.js, web.config, package.json, package-lock.json, **node_modules**, **public** (with index.html and assets). Optional: config.local.js with same vars (gitignored).

5. **Zip** the **contents** of the **server** folder (no parent “server” folder inside the zip).

6. **Upload** the zip to the **site root** on SmarterASP (e.g. the folder for sterlingprong.com). Unzip there.

7. **Panel**: **Setup Node.js App** for the **site root** (not a subfolder). Application startup file: **run.js**. Save.

8. If the panel **overwrites** the root web.config, restore it: content = iisnode + handler **run.js** (same as in your server/web.config).

9. **Test**:  
   - http://yourdomain.com loads.  
   - http://yourdomain.com/api/contact returns JSON.  
   - Contact form submits and email is received.

---

## 3. When SSL is ready (encryptkey or any site)

1. **.env.production**:  
   `VITE_CONTACT_API_URL=https://yourdomain.com`

2. **Rebuild**:  
   `npm run build:single`

3. **Re-upload** only the **public** folder (or the full server zip) to the site root so the new build is live.

4. Test **https://yourdomain.com** and the contact form again.

---

## Prompt you can send me for the next site

When you’re ready to set up email and deploy for sterlingpro (or another site), you can send something like this so we follow this pattern and don’t redo the EncryptKey trial-and-error:

---

**“I’m setting up email and deploy for [site name, e.g. sterlingpro] on SmarterASP. We’re using the same approach as EncryptKey: single-folder Node app (server.js + run.js + web.config), React build in server/public, FALLBACK in server.js for SMTP so we don’t rely on .env or Control Panel env vars. Domain: [e.g. sterlingprong.com]. SMTP mailbox: [e.g. info@sterlingprong.com]. Forms should send to [e.g. contact@sterlingprong.com]. SSL is not ready yet so use http for the API URL. Please: (1) Confirm the server and frontend are wired for this (FALLBACK, run.js, build:single, single-folder deploy). (2) Give me the exact deploy checklist for this site (steps 1–9 from DEPLOY_EMAIL_CHECKLIST_FOR_NEXT_SITE.md) with [domain] and [emails] filled in. (3) When we get SSL, remind me to set VITE_CONTACT_API_URL=https://... and rebuild + re-upload public.”**

---

I’ll then align the code and steps to this checklist and you won’t need to repeat the debugging we did on EncryptKey.
