# Ready to deploy – what’s left (junk email deferred)

Junk/inbox placement is deferred; forms already send and deliver. Below is what’s left to get the site live.

---

## 1. Deploy the Node API (server) to SmarterASP

- In SmarterASP Control Panel, create/set up a **Node.js** application for the same site (or subdomain) you’ll use for encryptkey.co.uk.
- Upload the **`server/`** folder contents (at least `server.js`, `package.json`, and any files it needs). Or use their Git/deploy flow if they have one for Node.
- Set the **start command** to `node server.js` (or `npm start`) from the folder that contains `server.js`.
- In the Node app’s **environment variables** (or app settings), set the same vars you use locally (from `server/.env`):
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
  - `CONTACT_TO_EMAIL`, `NEWSLETTER_TO_EMAIL`
- Note the **URL** where the API will be reachable (e.g. `https://encryptkey.co.uk` if the API runs on the same site, or something like `https://api.encryptkey.co.uk` if separate).

---

## 2. Build the frontend for production

- In the **project root** (not inside `server/`), create or edit **`.env.production`** and set:
  ```bash
  VITE_CONTACT_API_URL=https://encryptkey.co.uk
  ```
  Use the **actual** API URL from step 1 (no trailing slash). If the API is on the same domain, this is usually `https://encryptkey.co.uk`.
- From the project root:
  ```bash
  npm install
  npm run build
  ```
- This produces the **`dist/`** folder. The **`public/web.config`** is copied into `dist/` by Vite, so SPA routing will work on IIS.

---

## 3. Upload the site to SmarterASP

- Upload the **contents** of **`dist/`** (e.g. `index.html`, `assets/`, `web.config`) to the **website root** (e.g. `httpdocs` or `wwwroot`) via FTP or the control panel File Manager.
- Do **not** upload the `dist` folder itself—only its contents.

---

## 4. Domain, HTTPS, and SPA

- **Domain:** Point **encryptkey.co.uk** to this SmarterASP site (A/CNAME as per SmarterASP instructions).
- **HTTPS:** Enable SSL for the domain in the control panel (e.g. Let’s Encrypt).
- **SPA:** The `web.config` in `dist/` already rewrites non-file requests to `/` so routes like `/contact`, `/pricing` work. If the host overwrites `web.config`, re-upload it or add the same rewrite rule in the panel.

---

## 5. Test after deploy

- Open `https://encryptkey.co.uk` and click through: Home, Features, Pricing, Documentation, Use Cases, Contact.
- Submit the **Contact** form and confirm the email arrives at contact@sterlingprong.com (may still be in Junk until SPF/DKIM later).
- Submit the **Newsletter** field in the footer and confirm.
- Submit **Contact Sales** on the Pricing page and confirm.

---

## Quick checklist

| Step | Done |
|------|------|
| Deploy `server/` to SmarterASP Node.js with env vars | |
| Set `VITE_CONTACT_API_URL` in `.env.production` | |
| `npm run build` | |
| Upload contents of `dist/` to site root | |
| Domain pointed + HTTPS enabled | |
| Test all pages and Contact / Newsletter / Contact Sales | |

**Later (when CTO is ready):** Use [REDUCE_JUNK_EMAIL.md](./REDUCE_JUNK_EMAIL.md) for SPF/DKIM so form emails land in Inbox instead of Junk.
