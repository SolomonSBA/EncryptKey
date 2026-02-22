# Upload the api folder from scratch (Option B – .env)

Use this when you want to **delete everything inside api** on SmarterASP and upload the **correct** set of files so the Node app works with **Option B** (.env for env vars).

---

## Two web.configs – that’s correct

| Location | Purpose |
|----------|--------|
| **Site root** (encryptkey\) | `web.config` for the **React SPA**: rewrites routes to `index.html` so `/contact`, `/pricing` etc. work. Leave this as is. |
| **api folder** (encryptkey\api\) | `web.config` for **Node/iisnode**: tells IIS to run `run.cjs` (which loads your server). This is **only** in the api folder. |

Do **not** mix them. The root `web.config` stays in the root; the api `web.config` stays in the api folder.

---

## Step 1 – On SmarterASP: empty the api folder

1. Go to **File Manager** → open **encryptkey** → open **api**.
2. Select **all** files and folders inside **api** (e.g. server.js, web.config, node_modules, etc.).
3. **Delete** them (or delete the whole **api** folder and create a new empty **api** folder).
4. You should end up with an **empty api** folder (or an empty folder named **api**).

---

## Step 2 – On your PC: prepare the server folder (Option B)

Do this in the **server** folder of your project (the one that has server.js, run.cjs, package.json).

### 2.1 – .env file (Option B – no secrets in web.config)

1. Create or edit **.env** in the **server** folder with **exactly** this (use your real password, **no PORT**):

```env
SMTP_HOST=mail5013.site4now.net
SMTP_PORT=587
SMTP_USER=info@encryptkey.co.uk
SMTP_PASS=v1AfsTbBa#
CONTACT_TO_EMAIL=contact@sterlingprong.com
NEWSLETTER_TO_EMAIL=contact@sterlingprong.com
```

2. Do **not** add a `PORT=` line. The host sets the port.
3. Do **not** commit this file to Git.

### 2.2 – web.config in server folder

The **server** folder should use the **iisnode** web.config (entry: **run.cjs**, no env vars). The repo’s **server/web.config** is already set to this. It should contain:

- Handler: **run.cjs**
- Rewrite rules for iisnode
- **No** SMTP or other env vars (they come from .env).

If you had an older web.config with `httpPlatform` and env vars, it’s now replaced by the iisnode version above.

### 2.3 – Dependencies

In the **server** folder run:

```bash
cd path\to\EncryptKey\server
npm install
```

You should have: **server.js**, **run.cjs**, **web.config**, **package.json**, **package-lock.json**, **node_modules**, and **.env**.

---

## Step 3 – Zip the contents of the server folder

1. Open the **server** folder.
2. Select **all** of these (not the **server** folder itself):
   - **server.js**
   - **run.cjs**
   - **web.config**
   - **package.json**
   - **package-lock.json**
   - **node_modules** (entire folder)
   - **.env**
3. Create a zip from the selected items (e.g. **api-upload.zip**).  
   Inside the zip there should be no “server” folder – only the listed files and the **node_modules** folder.

---

## Step 4 – Upload and unzip into api

1. In **File Manager**, go to **encryptkey** → open **api** (the empty folder).
2. **Upload** the zip you created.
3. **Select** the zip → click **Unzip**.
4. After unzip, inside **api** you should see:
   - server.js  
   - run.cjs  
   - web.config  
   - package.json  
   - package-lock.json  
   - node_modules  
   - .env  

---

## Step 5 – Node.js for the api folder

In **Control Panel** → **Websites** → **encryptkey.co.uk** → **Manage Website** → **NodeJS**:

- Ensure Node.js is enabled **for the api folder** (target folder = **api**).
- Entry/startup file: **run.cjs** (or **server.js** if the panel only allows .js; iisnode will use whatever is in web.config, i.e. run.cjs).

---

## Step 6 – Test

1. Open **https://encryptkey.co.uk/api/contact** in the browser.  
   You should see something like **“Cannot GET /api/contact”** or **“Cannot GET /contact”** (from Express).
2. Submit the **Contact** form on the site; it should no longer show “Failed to fetch”.

---

## Checklist

| Step | Done |
|------|------|
| Empty the **api** folder on SmarterASP | |
| In **server** folder: .env with 6 vars (no PORT) | |
| In **server** folder: web.config = iisnode (run.cjs), no env vars | |
| **server** folder: npm install | |
| Zip: server.js, run.cjs, web.config, package.json, package-lock.json, node_modules, .env | |
| Upload zip to **api** and Unzip | |
| Node.js enabled for **api** folder | |
| Test /api/contact and Contact form | |

**Reminder:** The **frontend** lives in the **site root** (encryptkey\) with its **own** web.config (SPA). The **api** folder has its **own** web.config (Node). Two places, two configs – correct.
