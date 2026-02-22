# SmarterASP: Run Node.js only in the api folder

Follow these steps so **https://encryptkey.co.uk/api/...** is handled by your Node app.

---

## What we use (for support)

- **Entry file:** `server.js` (or `run.cjs` if the host has trouble with ES modules).
- **Module system:** **ES modules** (`"type": "module"` in package.json).
- **Port:** The app uses `process.env.PORT` (no hardcoded port).

---

## Steps you already did

1. **Prepare the api folder** – `server.js` (and `run.cjs`, `web.config`, `node_modules`, etc.) are in the **api** folder.
2. **Upload** – Zipped and uploaded to the site so the path is **/api**.

---

## 1. Enable Node.js for the api folder only

In **Control Panel V5**:

1. Go to **Hosting Control Panel** → **Websites**.
2. Select the site **encryptkey.co.uk** → **Manage Website** → **NodeJS**.
3. Choose the folder **api** as the target folder.
4. Click **Create** (this enables Node.js only for that folder).

---

## 2. Set web.config in the api folder

Your **api** folder must have a **web.config** that tells the host how to run the Node app.

### If the host uses **iisnode**

We added two files in the **server** folder:

- **`web.config.iisnode`** – use this as **web.config** in the **api** folder when the host uses iisnode.
- **`run.cjs`** – a small launcher so ES modules work with iisnode.

**Do this:**

1. In the **server** folder on your PC, copy **`web.config.iisnode`** and rename the copy to **`web.config`** (or replace the existing **web.config** in the zip with the contents of **web.config.iisnode**).
2. Ensure **`run.cjs`** is in the same folder as **server.js** (it’s in the repo).
3. Re-zip the **api** contents (server.js, run.cjs, web.config, package.json, node_modules).
4. Upload and unzip into **api** again (or only upload the new/replaced **web.config** and **run.cjs** via File Manager).

The iisnode config uses **run.cjs** as the entry so that the host runs a CommonJS file, which then loads **server.js** (ES module). **Do not set PORT in .env** on the server; the host provides it via `process.env.PORT`.

### If the host uses **httpPlatformHandler** (current SmarterASP style)

Keep your existing **web.config** in the **api** folder (the one with `<httpPlatform processPath="node" arguments="server.js" ...>` and your `<environmentVariable>` entries). No need for **run.cjs** in that case.

### Environment variables (SMTP, etc.)

- **httpPlatformHandler:** Your current web.config already has `<environmentVariable>` for SMTP and emails; keep it.
- **iisnode:** The sample **web.config.iisnode** does not include env vars. Either:
  - Ask SmarterASP how to set environment variables for the Node app (e.g. in the panel or in web.config for iisnode), or  
  - Upload a **.env** file in the **api** folder with the same variables as in your current web.config (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, NEWSLETTER_TO_EMAIL). The app uses `dotenv`, so it will load **.env**. Do not commit **.env** to the repo.

---

## 3. Test

- Open **https://encryptkey.co.uk/api/contact** in the browser.  
  You should see something like **“Cannot GET /api/contact”** or **“Cannot GET /contact”** (from Express), not a 404/502 from the host.
- Submit the **Contact** form on the site; the “Failed to fetch” error should go away if the API is reachable.

---

## Reply you can send to support (optional)

If they ask for entry filename and module type, you can say:

**Entry file:** We use **server.js** as the main app (ES modules). We also provide **run.cjs** so the host can run that as the handler if needed; **run.cjs** loads **server.js** via `import('./server.js')`.

**Module system:** ES modules (`"type": "module"` in package.json). The app listens on **process.env.PORT** and does not hardcode the port.

**Request:** We have already enabled Node.js for the **api** folder and uploaded **server.js**, **run.cjs**, **web.config**, **package.json**, and **node_modules**. We need **https://encryptkey.co.uk/api/...** to be routed to this Node app. If the host uses **iisnode**, we use **run.cjs** as the entry in web.config so that ES modules work. Please confirm that requests to **/api/** are handled by our Node app and that **process.env.PORT** is set by the host.
