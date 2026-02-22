# Fix: Root web.config and restore frontend

Here’s what happened and how to fix it.

---

## What happened

1. When you **enabled Node.js for the api folder**, SmarterASP created (or updated) a **web.config in the site root** (`encryptkey\`). That file is for **Node/httpPlatform**, with `arguments="api"`, and is **not** for your React site.
2. The **root** folder must use a **different** web.config: the one that does the **SPA rewrite** (all routes → `index.html`) so your React app works. So the root should **not** use the Node/httpPlatform config.
3. You also **deleted the frontend** files, so the root is missing **index.html**, **assets**, and the correct **web.config**.

**Summary:** The root needs the **SPA** web.config + **index.html** + **assets**. The **api** folder keeps its **own** web.config (iisnode, run.cjs). The config that “created itself” in the root is from the host’s Node setup; we replace it with the SPA config and restore the frontend.

---

## Fix in two parts

### Part 1 – Put the correct web.config in the root

The **root** (`encryptkey\`) must have **only** the SPA rewrite rule, no Node handlers.

**Option A – Replace by editing in File Manager (quick)**

1. In **File Manager**, go to **encryptkey** (the root, where you see **api** and the wrong **web.config**).
2. Click **Edit** on **web.config**.
3. **Delete** all content and replace with **exactly** this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="SPA fallback" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

4. Save. The root no longer has Node/httpPlatform; it only has the SPA rule.

**Option B – Replace by re-uploading the frontend (restores everything)**

Do Part 2 below. When you unzip the frontend zip in the root, it will overwrite **web.config** with the correct SPA version from your build.

---

### Part 2 – Restore the frontend (index.html + assets + correct web.config)

Because the frontend was deleted, you need to put it back in the **root** of **encryptkey** (same folder where **api** and **web.config** are).

1. **On your PC**, in the project **root** (EncryptKey folder with `src` and `server`):
   - Create or edit **`.env.production`** with:
     ```bash
     VITE_CONTACT_API_URL=https://encryptkey.co.uk
     ```
   - Run:
     ```bash
     npm install
     npm run build
     ```
2. Open the **dist** folder. Select **everything inside** it: **index.html**, **assets** folder, **web.config** (this is the SPA one).
3. Zip those items (so the zip contains **index.html**, **assets**, **web.config** – no “dist” folder inside the zip).
4. In **File Manager**, go to **encryptkey** (the root).
5. **Upload** the zip and **Unzip** there.
6. When asked to overwrite **web.config**, choose **Yes**. After unzip you should have:
   - **index.html**
   - **assets** (folder)
   - **web.config** (the SPA version from your project)
   - **api** (folder – unchanged)

Now the root has the correct SPA web.config and the full frontend again.

---

## Why there are two web.configs

| Location | File | Purpose |
|----------|------|--------|
| **Root** (`encryptkey\`) | **web.config** | SPA: rewrite all non-file requests to **index.html** so React routes work. **No** Node handlers here. |
| **api** (`encryptkey\api\`) | **web.config** | Node/iisnode: run **run.cjs** for requests to **/api/...**. Only in the api folder. |

The one that “downloaded itself” or was created in the root is the wrong type for the root; after the fix above, the root has only the SPA config and the api folder keeps its own Node config.

---

## After the fix

1. Open **https://encryptkey.co.uk** – you should see the React site and be able to click through pages.
2. Open **https://encryptkey.co.uk/api/contact** – you should see something like “Cannot GET /api/contact” or “Cannot GET /contact” (from your Node app).
3. Submit the **Contact** form – it should work without “Failed to fetch”.

---

## If .env or run.cjs in api show 0 KB

If in the **api** folder the File Manager shows **0 kb** for **.env** or **run.cjs**:

- **.env** – Edit in File Manager and paste the 6 lines (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, NEWSLETTER_TO_EMAIL). No PORT.
- **run.cjs** – Re-upload the **run.cjs** file from your **server** folder (it’s in the repo) into **api**, overwriting the existing one.

Then test the Contact form again.
