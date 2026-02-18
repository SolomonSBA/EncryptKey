# Deploy EncryptKey to SmarterASP.net

Your hosting and domain are on [SmarterASP.net](https://www.smarterasp.net). Follow these steps to put the site in production.

---

## 1. Set up Formspree (so forms send email)

1. Go to **[formspree.io](https://formspree.io)** and create a free account.
2. Create **two forms**:
   - **Contact** – for the Contact page and the Pricing “Contact Sales” dialog. After creating, copy the form ID from the URL (e.g. `https://formspree.io/f/abcxyz` → `abcxyz`).
   - **Newsletter** – for the footer “Subscribe” field. Copy that form ID too.
3. In your project root, copy the example env file and add your IDs:
   ```bash
   copy .env.example .env.production
   ```
   Edit `.env.production` and set:
   ```
   VITE_FORMSPREE_CONTACT_ID=your_contact_form_id
   VITE_FORMSPREE_NEWSLETTER_ID=your_newsletter_form_id
   ```
4. In the Formspree dashboard, set **“Send submissions to”** to your company email (e.g. the mailbox you create on SmarterASP, like `contact@yourdomain.com`). That way all messages **go to** your hosting inbox. When you reply to customers from that mailbox, replies **come from** your company email.

**Using the hosting email (no Formspree)?** We have a small API in the **`server/`** folder that sends form submissions via your hosting mailbox’s SMTP. See **[HOSTING_EMAIL_INTEGRATION.md](./HOSTING_EMAIL_INTEGRATION.md)** for how it works and what to ask the CTO (SMTP details). Deploy the `server/` app, set `VITE_CONTACT_API_URL` in the frontend `.env.production`, and build.

---

## 2. Build the site

From the project folder:

```bash
npm install
npm run build
```

This creates a **`dist`** folder with the production site. All form IDs from `.env.production` are baked into this build.

---

## 3. Upload to SmarterASP.net

SmarterASP supports **React hosting** and static sites. You need to upload the **contents** of the `dist` folder to your website root.

**Option A – FTP**

1. In SmarterASP control panel, open **FTP** or **File Manager** and note your site root (often `httpdocs` or `wwwroot`).
2. Connect with an FTP client (FileZilla, WinSCP, etc.) using the credentials from the control panel.
3. Upload **everything inside** `dist/` (e.g. `index.html`, `assets/` folder) into the site root. Do not upload the `dist` folder itself.

**Option B – Web Deploy / Control Panel upload**

1. If SmarterASP offers Web Deploy or a “Upload files” / “Publish” option in the control panel, use that.
2. Select the **contents** of your local `dist` folder (all files and the `assets` folder) and upload to the default website directory.

---

## 4. SPA routing (important)

This site uses **client-side routing** (e.g. `/features`, `/pricing`, `/contact`). The server must serve **`index.html`** for those paths so the React app can load and then show the right page.

- If SmarterASP has a **“React” or “SPA”** hosting option, enable it so all routes fall back to `index.html`.
- Otherwise, check their docs for **URL Rewrite** or **default document** and add a rule so non-file requests are served by `index.html`.

Example **web.config** (if you use IIS / ASP.NET hosting) in the site root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="SPA" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
    </staticContent>
  </system.webServer>
</configuration>
```

Place this in the same folder as `index.html` (your site root). If SmarterASP already serves static files correctly, they may have their own way to set the SPA fallback; use their guidance.

---

## 5. Point your domain

1. In SmarterASP, attach your domain to this site (add domain or set as default).
2. In your **domain registrar** (where you bought the domain), set the **DNS** as SmarterASP instructs (usually A record or CNAME to their server).
3. Wait for DNS to propagate (up to 24–48 hours, often quicker).
4. SmarterASP provides **free SSL** (e.g. Let’s Encrypt). Enable HTTPS for your domain in the control panel so the site is served over `https://`.

---

## 6. After deploy

- Open `https://yourdomain.com` and click through: Home, Features, Pricing, Documentation, Use Cases, Contact.
- Submit the **Contact** form and check that you receive the email via Formspree.
- Submit the **Newsletter** field in the footer and check the same.
- Submit the **Contact Sales** form in the Pricing page and confirm you get that email too.

If forms don’t send, check that you built with `.env.production` containing the correct `VITE_FORMSPREE_*` IDs and that you uploaded the **new** build (not an old one).

---

## Quick checklist

| Step | Done |
|------|------|
| Create Formspree forms (Contact + Newsletter) | |
| Add IDs to `.env.production` | |
| Run `npm run build` | |
| Upload contents of `dist/` to SmarterASP site root | |
| Configure SPA fallback (e.g. web.config or host option) | |
| Point domain DNS to SmarterASP | |
| Enable HTTPS for your domain | |
| Test all pages and form submissions | |

For hosting and domain details, see [SmarterASP.net](https://www.smarterasp.net) and your control panel help.
