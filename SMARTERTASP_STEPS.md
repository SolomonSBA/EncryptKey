# SmarterASP: create email and deploy the site

You’re logged in as **STERLINGPRONG** and the domain **encryptkey.co.uk** is in your account. Follow these steps to create the mailbox, get SMTP, then deploy the site and mail.

---

## Part 1: Create the domain mailbox and get SMTP

**PM said:**  
- Create: **info@encryptkey.com** (or **info@encryptkey.co.uk** if your hosting is only for .co.uk)  
- Form emails should go to: **contact@sterlingprong.com**

### Step 1 – Open email / mail for your domain

- You’re on **DOMAINS** → “My Domain Names” and see **encryptkey.co.uk**.
- Email on SmarterASP is usually under **HOSTINGS** or under the **domain**:
  - Click **HOSTINGS** in the top menu and see if there is an **Email** / **SmarterMail** / **Mail** section for your hosting plan, or  
  - Click the **gear (settings)** icon next to **encryptkey.co.uk** and look for **Email** / **Mail accounts** / **Create mailbox**.
- If you have a separate **encryptkey.com** in the list, use that for **info@encryptkey.com**. If only **encryptkey.co.uk** is set up, create **info@encryptkey.co.uk** and use that for SMTP (the “From” address).

### Step 2 – Create the mailbox

- Create a new mailbox:
  - **Address:** `info` (so the full address is **info@encryptkey.co.uk** or **info@encryptkey.com**).
  - **Password:** Set a strong password and **save it somewhere safe** (you’ll use it only in the server `.env`, not in the website code).
- Complete creation. You don’t need to log into this mailbox to read mail; we’ll send form submissions **to** contact@sterlingprong.com.

### Step 3 – Get SMTP details (from Email Manager for encryptkey.co.uk)

From your SmarterASP Email Manager for **encryptkey.co.uk**:

- **SMTP server:** `mail.encryptkey.co.uk` (or secure: `mail5013.site4now.net`)
- **Port:** **587** (recommended) or **465** for SSL; if your ISP blocks 25, use **8889**
- **Username:** `info@encryptkey.co.uk`
- **Password:** the one you set when creating the mailbox

Put these into `server/.env` in Part 2.

---

## Part 2: Configure the contact API (server)

1. On your computer, open the project and go to the **`server`** folder.
2. Copy the example env and edit the real one:
   - `copy .env.example .env` (Windows) or `cp .env.example .env` (Mac/Linux)
   - Open **`server/.env`** and set:

```env
SMTP_HOST=mail.smarterasp.net
SMTP_PORT=587
SMTP_USER=info@encryptkey.co.uk
SMTP_PASS=the_password_you_set_for_this_mailbox
CONTACT_TO_EMAIL=contact@sterlingprong.com
NEWSLETTER_TO_EMAIL=contact@sterlingprong.com
```

- Use the **exact** SMTP host, port, and username from SmarterASP. If your mailbox is **info@encryptkey.com**, use that for `SMTP_USER`.
- Do **not** commit `.env` (it’s in `.gitignore`).

---

## Part 3: Test the mail locally

1. In a terminal: **`cd server`** → **`npm install`** → **`npm start`**.  
   You should see the API listening on port 3000.

2. In the **main project** (EncryptKey root), create **`.env.local`** with:
   ```env
   VITE_CONTACT_API_URL=http://localhost:3000
   ```

3. In another terminal: **`npm run dev`**. Open the site, send a test from the Contact form and (if you want) the Newsletter.

4. Check **contact@sterlingprong.com** – the test should be there, **From:** info@encryptkey.co.uk (or info@encryptkey.com). Reply from contact@sterlingprong.com as usual.

---

## Part 4: Deploy the website and API to SmarterASP

### Deploy the **server** (Node.js contact API)

- SmarterASP supports **Node.js** ([Node.js Hosting](https://www.smarterasp.net/nodejs%5Fhosting)).
- In the control panel, create or use a **Node.js** app/site.
- Upload the **`server`** folder contents (e.g. `server.js`, `package.json`, and run `npm install` on the server or upload `node_modules` if they allow).
- Set the **start command** to `node server.js` (or `npm start`).
- In the **environment variables** for that Node app, set the same values as in your `.env`:  
  `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL=contact@sterlingprong.com`, `NEWSLETTER_TO_EMAIL=contact@sterlingprong.com`.
- Note the **URL** of this API (e.g. `https://encryptkey.co.uk` if the API is on the same site, or a subdomain like `https://api.encryptkey.co.uk`).

### Deploy the **website** (frontend)

- Build with the **live** API URL. In the main project create or edit **`.env.production`**:
  ```env
  VITE_CONTACT_API_URL=https://encryptkey.co.uk
  ```
  (Use the real URL where the API is, no trailing slash.)

- Run **`npm run build`**. Upload the **contents** of the **`dist`** folder to your SmarterASP **website root** (e.g. via FTP or File Manager). Ensure **`web.config`** is there so routes like `/contact` and `/pricing` work (SPA fallback).

### Point the domain

- In **DOMAINS**, make sure **encryptkey.co.uk** (and encryptkey.com if you use it) points to the right hosting / site. Use the gear icon or hosting settings if you need to attach the domain to the website or Node app.

---

## Summary

| Step | Where | What to do |
|------|--------|------------|
| 1 | SmarterASP → HOSTINGS or domain (gear) | Find Email / Mail → create **info@encryptkey.co.uk** (or .com) → set password |
| 2 | Same place | Copy SMTP server, port, username, password |
| 3 | Your PC → `server/.env` | Put SMTP + `CONTACT_TO_EMAIL=contact@sterlingprong.com`, `NEWSLETTER_TO_EMAIL=contact@sterlingprong.com` |
| 4 | Your PC | Run `server` (`npm start`) and frontend (`npm run dev`) with `VITE_CONTACT_API_URL=http://localhost:3000` → test form → check contact@sterlingprong.com |
| 5 | SmarterASP | Deploy Node API (server folder + env vars), then build frontend with `VITE_CONTACT_API_URL=https://...` and upload `dist` |

Result: forms send **from** info@encryptkey.co.uk (or .com) **to** contact@sterlingprong.com so the team can reply from there without using the hosting mailbox.
