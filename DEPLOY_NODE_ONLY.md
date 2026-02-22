# Deploy only the Node.js server (step-by-step)

Use this when you want to deploy **just the API** first. You use **Option B** (env vars inside `web.config`), so no Control Panel env vars and **no `.env`** in the zip.

---

## Do I add `.env` when zipping?

**No.** When you use Option B and put `SMTP_HOST`, `SMTP_PASS`, etc. in `web.config`, you do **not** add `.env` to the zip.

- On SmarterASP, **IIS** reads `web.config` and passes those `environmentVariable` entries to Node as `process.env.SMTP_HOST`, `process.env.SMTP_PASS`, and so on.
- Your app already uses `process.env.SMTP_HOST` (and the rest), so it will get the values from `web.config`.
- Adding `.env` is unnecessary and could confuse things (e.g. different values). So: **zip only `server.js`, `package.json`, `web.config`, and `node_modules`.** Do **not** include `.env`.

---

## Right process (in order)

### 1. Have a `web.config` that includes your env vars (Option B)

You already did this: in `server/web.config` you added the `<environmentVariable>` lines for:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `CONTACT_TO_EMAIL`, `NEWSLETTER_TO_EMAIL`

**Important:** That file now contains your real password. **Do not commit it to Git.** Keep it only on your PC and use it **only** when creating the zip for upload. (The repo’s `server/web.config` is a template without secrets.)

If you prefer to keep the repo file clean, use a **copy** for deployment, e.g. `web.config.deploy`, add the env vars there, and zip that copy as `web.config` (rename when zipping or put the copy in the folder you zip).

### 2. Install dependencies (in the `server` folder)

```bash
cd path\to\EncryptKey\server
npm install
```

This creates/updates the `node_modules` folder. SmarterASP expects that folder to be uploaded.

### 3. Zip what to upload

Zip the **contents** of the `server` folder so that **inside the zip** you have:

- `server.js`
- `package.json`
- `web.config`  ← the one **with** your SMTP and email env vars (Option B)
- `node_modules`  ← the whole folder

**Do not include:**

- `.env`  ← not needed when using Option B; do not add it to the zip.

So: open the `server` folder, select `server.js`, `package.json`, `web.config`, and the `node_modules` folder, then create a zip from those. The zip should **not** contain `.env`.

### 4. Upload and unzip on SmarterASP

1. In SmarterASP, go to the folder where the Node app should run (e.g. site root or a subfolder like `api` if you use one).
2. Upload the zip.
3. Unzip it there. After unzip you should see `server.js`, `package.json`, `web.config`, and `node_modules` in that folder.

### 5. Make sure Node.js is enabled for that folder

In **Control Panel → Websites → Manage Website → Node.js**, ensure Node.js is enabled for the folder where you uploaded the files (or for the site). Without this, the server won’t run.

### 6. Test the API URL

Once the site/domain is set up, try opening in a browser:

- `https://your-site.com/api/contact`  
  (or the path where you put the Node app)

You may see “Cannot GET /api/contact” or similar—that’s normal (the route is POST). It means the Node app is being hit. You’ll use this base URL later as `VITE_CONTACT_API_URL` when you build and deploy the React site.

---

## Checklist (Node only)

| Step | Done |
|------|------|
| 1. `web.config` has env vars (SMTP_*, CONTACT_TO_EMAIL, NEWSLETTER_TO_EMAIL) | ✓ (you did this) |
| 2. `cd server` and run `npm install` | |
| 3. Zip `server.js`, `package.json`, `web.config`, `node_modules` — **no `.env`** | |
| 4. Upload zip to SmarterASP and unzip in the right folder | |
| 5. Node.js enabled for that folder/site | |
| 6. Note the API URL for later (React build) | |

You’re following the right process: Option B in `web.config`, no `.env` in the zip, and zip after `npm install` so `node_modules` is included.
