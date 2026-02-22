# Deploy EncryptKey to SmarterASP – step by step (start to finish)

This guide matches [SmarterASP’s React.js publish article](https://www.smarterasp.net/support/kb/2176/how-to-publish-a-react_js-project-to-your-hosting-account) and adds the steps for the **Node.js contact API** so the forms work in production.

You will do **two** deployments on SmarterASP:

1. **Node API** (the `server/` folder) – so the contact and newsletter forms can send email.
2. **React site** (the `dist/` folder) – the actual website visitors see.

Then you’ll point your domain and test.

---

## Part 1 – Deploy the Node.js API (contact form backend)

The API receives form submissions and sends email using your hosting mailbox. Deploy it first so you know its URL; you’ll need that URL when building the React site.

### Step 1.1 – Prepare the server folder on your PC

1. Open a terminal and go to the **server** folder of the project:
   ```bash
   cd path\to\EncryptKey\server
   ```
2. Install dependencies (so you can upload `node_modules` – SmarterASP expects it):
   ```bash
   npm install
   ```
3. You should have in the `server` folder:
   - `server.js`
   - `package.json`
   - `web.config` (there is one in the repo for SmarterASP)
   - `node_modules` (folder with all dependencies)

### Step 1.2 – Set environment variables for production

The API needs SMTP and email settings. **Do not put real passwords in the repo.**

- **Option A – Control panel:** In SmarterASP, go to **Websites → Manage Website → Node.js** (or your Node app). If there is an **Environment variables** or **App settings** section, add:
  - `SMTP_HOST` = (e.g. `mail5013.site4now.net`)
  - `SMTP_PORT` = `587`
  - `SMTP_USER` = `info@encryptkey.co.uk`
  - `SMTP_PASS` = (your mailbox password)
  - `CONTACT_TO_EMAIL` = `contact@sterlingprong.com`
  - `NEWSLETTER_TO_EMAIL` = `contact@sterlingprong.com`
- **Option B – web.config only:** If the host doesn’t have a UI for env vars, you can add them in `server/web.config` inside the `<environmentVariables>` block, for example:
  ```xml
  <environmentVariable name="SMTP_HOST" value="mail5013.site4now.net" />
  <environmentVariable name="SMTP_PORT" value="587" />
  <environmentVariable name="SMTP_USER" value="info@encryptkey.co.uk" />
  <environmentVariable name="SMTP_PASS" value="YourPasswordHere" />
  <environmentVariable name="CONTACT_TO_EMAIL" value="contact@sterlingprong.com" />
  <environmentVariable name="NEWSLETTER_TO_EMAIL" value="contact@sterlingprong.com" />
  ```
  Use a **copy** of `web.config` for production with these values, and **do not commit** that file. The repo’s `web.config` has no secrets.

### Step 1.3 – Enable Node.js for a folder (or site)

- In SmarterASP **Control Panel** go to **Websites → Manage Website**.
- Open **Node.js** and read their instructions. You may need to **enable Node.js** for a **specific folder** (e.g. `api`) so that only that folder runs Node, and the rest of the site stays static.
- Note the **folder** where the Node app must sit (e.g. `api` or `node`). You’ll upload the server files there in the next step.

### Step 1.4 – Upload the Node API

1. Zip the **contents** of the `server` folder (so that inside the zip you have `server.js`, `package.json`, `web.config`, and the `node_modules` folder).
2. In SmarterASP **File Manager** (or FTP), go to the **site root** (e.g. `httpdocs`).
3. If Node must run from a subfolder (e.g. `api`), create that folder and open it.
4. Upload the zip and **extract** it there. After extraction you should see `server.js`, `package.json`, `web.config`, and `node_modules` in that folder.

### Step 1.5 – Note the API URL

- If the Node app is in the **root** of the site, the API URL is:  
  `https://encryptkey.co.uk`  
  (and the form will call `https://encryptkey.co.uk/api/contact` and `.../api/newsletter`.)
- If the Node app is in a subfolder, e.g. `api`, the API URL is usually:  
  `https://encryptkey.co.uk/api`  
  You’ll use this in Part 2 when building the React site.

If you’re unsure, open:  
`https://your-site-url/api/contact`  
in a browser; you might get “Cannot GET” or a 404, which is normal (the route is POST). What matters is that the URL belongs to your site.

---

## Part 2 – Build and deploy the React site (frontend)

This follows SmarterASP’s “How to publish a React.js project” steps. Our project uses **Vite**; the build output is in **`dist`** (not `build`).

### Step 2.1 – Set the API URL and build

1. In the **project root** (the EncryptKey folder that contains `src` and `server`), create a file named **`.env.production`** (if it doesn’t exist).
2. Add one line (use the API URL from Part 1, **no trailing slash**):
   ```bash
   VITE_CONTACT_API_URL=https://encryptkey.co.uk
   ```
   If your API is in a subfolder, use e.g.:
   ```bash
   VITE_CONTACT_API_URL=https://encryptkey.co.uk/api
   ```
3. From the **project root** run:
   ```bash
   npm install
   npm run build
   ```
4. A **`dist`** folder is created. It contains `index.html`, an `assets` folder, and (from `public`) a **`web.config`** for SPA routing.

### Step 2.2 – Zip the contents of `dist`

1. Open the **`dist`** folder.
2. Select **everything inside** it (e.g. `index.html`, `assets` folder, `web.config`).  
   Do **not** zip the `dist` folder itself – only its contents.
3. Create a zip file (e.g. `encryptkey-site.zip`) from those selected items.

### Step 2.3 – Upload and unzip to the site root

1. In SmarterASP **File Manager** (or FTP), go to your **website root** (e.g. `httpdocs`).  
   This is where the **React** site must live. If your Node API is in a subfolder (e.g. `api`), do **not** overwrite that folder.
2. Upload the zip you created.
3. **Unzip** it in the site root. After unzip you should see in the root:
   - `index.html`
   - `assets` (folder)
   - `web.config`

### Step 2.4 – SPA routing (client-side routes)

The site uses client-side routing (e.g. `/contact`, `/pricing`). So the server must serve **`index.html`** for those paths.

- The **`web.config`** we put in `public/` (and that is copied into `dist/`) already has a rewrite rule. After you upload the contents of `dist`, that `web.config` should be in the site root.
- If you still get **404** when you open e.g. `https://encryptkey.co.uk/contact` or refresh a subpage, use the **exact** sample from SmarterASP’s article in the site root `web.config`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="ReactRouter Routes" stopProcessing="true">
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

Save it in the **site root** (same place as `index.html`).

### Step 2.5 – Check the site in the browser

- Open `https://encryptkey.co.uk` (or your real URL).
- Click through: Home, Features, Pricing, Documentation, Use Cases, Contact.
- Try a **refresh** on e.g. `/pricing` – you should not get 404.

---

## Part 3 – Domain and HTTPS

1. In SmarterASP, attach your domain **encryptkey.co.uk** to this site (add domain or set as default).
2. At your **domain registrar**, set **DNS** as SmarterASP instructs (usually an **A** or **CNAME** record).
3. In SmarterASP, enable **HTTPS** for the domain (e.g. Let’s Encrypt).
4. Wait for DNS to propagate (up to 24–48 hours, often less), then open `https://encryptkey.co.uk`.

---

## Part 4 – Test the forms

1. **Contact** page – submit the form. Check that an email arrives at contact@sterlingprong.com (it may still be in Junk until SPF/DKIM are done later).
2. **Newsletter** – use the footer “Subscribe” and check the same inbox.
3. **Pricing** – open “Contact Sales”, submit, and check again.

If no email arrives, check:

- The **API URL** in `.env.production` matches where the Node app really is (same domain and path).
- You **rebuilt** the site (`npm run build`) after setting `VITE_CONTACT_API_URL`.
- In SmarterASP, the **Node.js** app has the correct **environment variables** (SMTP and contact emails).

---

## Quick checklist

| # | Step | Done |
|---|------|------|
| 1 | In `server/`: `npm install`, zip contents (incl. `node_modules`, `web.config`) | |
| 2 | In SmarterASP: enable Node.js for the right folder, set env vars (SMTP, CONTACT_TO_EMAIL, etc.) | |
| 3 | Upload and unzip server contents to that folder (e.g. `api`) | |
| 4 | Note API URL (e.g. `https://encryptkey.co.uk` or `https://encryptkey.co.uk/api`) | |
| 5 | In project root: create `.env.production` with `VITE_CONTACT_API_URL=...` | |
| 6 | Run `npm run build` | |
| 7 | Zip **contents** of `dist/` (not the `dist` folder) | |
| 8 | Upload zip to **site root**, unzip | |
| 9 | Confirm `web.config` is in root for SPA (rewrite to `index.html`) | |
| 10 | Point domain DNS to SmarterASP, enable HTTPS | |
| 11 | Test all pages and Contact / Newsletter / Contact Sales forms | |

---

## Summary

- **Part 1:** Deploy the **Node API** (`server/` + `node_modules` + `web.config` + env vars) so the forms have a backend.
- **Part 2:** Build the **React** app with `VITE_CONTACT_API_URL` set, then zip the **contents** of **`dist`**, upload to the **site root**, and unzip. Use **`web.config`** in the root so client-side routes work (as in SmarterASP’s React article).
- **Part 3:** Point the domain and turn on HTTPS.
- **Part 4:** Test every page and all three forms.

For reducing form emails going to Junk later, use **[REDUCE_JUNK_EMAIL.md](./REDUCE_JUNK_EMAIL.md)** (SPF/DKIM).
