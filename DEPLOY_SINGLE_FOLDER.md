# Deploy EncryptKey in one folder (no /api subfolder)

Everything runs from the **site root**: one Node app serves both the React site and the API. No separate **api** folder, no virtual directory, no second web.config. The panel’s “Setup Node.js App” points at the **site root** only.

---

## What changed

- **Node** serves the React app from **./public** and the API from **/api/contact** and **/api/newsletter**.
- You deploy **one** folder to the **site root** (encryptkey\). That folder contains: **server.js**, **run.cjs**, **web.config**, **package.json**, **node_modules**, **.env**, and a **public** folder with the React build (index.html, assets).
- In the panel you enable Node.js for the **site root** (or leave the default “root” path). You do **not** create an **api** virtual directory or a separate Node app for **api**.

---

## Step 1 – Build the frontend into server/public

From the **project root** (where package.json and src/ are):

1. Ensure **.env.production** has:
   ```bash
   VITE_CONTACT_API_URL=https://encryptkey.co.uk
   ```
2. Run:
   ```bash
   npm run build:single
   ```
   This runs `vite build` and then copies the contents of **dist** into **server/public**.

   If that script fails (e.g. older Node), do it manually:
   - Run `npm run build`
   - Create **server/public** if it doesn’t exist
   - Copy **everything inside dist** (index.html, assets folder, etc.) into **server/public**

---

## Step 2 – Prepare the server folder

1. In the **server** folder you should have:
   - **server.js**
   - **run.cjs**
   - **web.config** (iisnode, handler **run.cjs**)
   - **package.json**
   - **package-lock.json**
   - **.env** (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, NEWSLETTER_TO_EMAIL – no PORT)
   - **public** (folder with index.html and assets from Step 1)
2. In **server** run:
   ```bash
   npm install
   ```
   so **node_modules** is up to date.

---

## Step 3 – Zip the server folder contents

1. Open the **server** folder.
2. Select **all** of: **server.js**, **run.cjs**, **web.config**, **package.json**, **package-lock.json**, **.env**, **node_modules** (folder), **public** (folder).
3. Create a zip from these (e.g. **encryptkey-single.zip**). The zip should **not** contain a parent “server” folder – only the listed files and the two folders.

---

## Step 4 – Upload to the site root and enable Node

1. In SmarterASP **File Manager**, go to the **site root** for encryptkey.co.uk (the **encryptkey** folder – same place where you previously had index.html and the **api** folder).
2. **Optional but recommended:** Delete or move aside the old **api** folder and any old root files (index.html, assets, old web.config) so the root is empty or only has the new upload.
3. **Upload** the zip from Step 3 and **Unzip** in the root. After unzip you should see in **encryptkey**: server.js, run.cjs, web.config, package.json, .env, node_modules, public (with index.html and assets inside).
4. In **Control Panel** → **Websites** → **Manage Website** (encryptkey.co.uk) → **Setup Node.js App** (or **NodeJS**):
   - Set the **folder/path** to the **site root** (leave blank or “.” or the default – **not** “api”).
   - Set the **Application startup file** to **run.cjs** (or **server.js** if the panel only allows .js).
   - Save. You should see “[OK] NodeJS Application Created.” or similar.
5. If the panel **overwrites** the root **web.config**, restore it: the root **must** use the **Node** web.config (iisnode, handler run.cjs), not the old SPA-only config. The correct content is in **server/web.config** in your project – re-upload that file or paste its content into **encryptkey\web.config**.

---

## Step 5 – Test

1. **https://encryptkey.co.uk** – should show the React site.
2. **https://encryptkey.co.uk/api/contact** – should return JSON (e.g. `{"status":"ok","message":"Contact API"}`).
3. Submit the **Contact** form on the site – it should succeed (no “Failed to fetch”).

---

## Summary

| Before (two parts) | Now (single folder) |
|--------------------|----------------------|
| api folder + Node + api\web.config | No api folder |
| Root = React (index.html, assets) + root web.config (SPA) | Root = Node app (server.js, run.cjs, web.config, public) |
| Virtual directory /api, root web.config overwritten by panel | One folder, one web.config (Node); panel points Node at root only |

You only maintain **one** web.config (the Node one in the root). No more switching between SPA and Node configs or fighting the panel over the api folder.
