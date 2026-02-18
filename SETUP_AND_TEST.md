# Set up and test contact forms (info@sterlingpro.com)

Form submissions will be sent **from** the domain email (hosting mailbox) **to** **info@sterlingpro.com** so the team can reply from there.

---

## 1. Get what you need from SmarterASP

Someone with access to [SmarterASP.net](https://www.smarterasp.net) (you or the CTO) needs to:

1. **Log in** to the SmarterASP control panel (Customer Login).
2. **Create a domain mailbox** for the website (e.g. `contact@yourdomain.com` or `noreply@yourdomain.com`). This is the address that will *send* the form emails. Use the control panel’s **Email** section to create the account and set a password.
3. **Get SMTP details** for that mailbox. In SmarterASP this is usually under **Email** → the mailbox → **Settings** or **Outgoing Server**. You need:
   - **SMTP server** (e.g. `mail.smarterasp.net` or the host they show)
   - **Port** (often **587** for TLS or **465** for SSL)
   - **Username** (usually the full email, e.g. `contact@yourdomain.com`)
   - **Password** (the one you set for that mailbox)

Do **not** put the real password in the repo or in any file you commit. Use it only in `.env` on your machine or in the server’s environment on the host.

---

## 2. Configure the contact API (server)

1. Open the **`server`** folder in the project.
2. Copy the example env file:
   - Windows: `copy .env.example .env`
   - Mac/Linux: `cp .env.example .env`
3. Edit **`server/.env`** and set:

   ```env
   SMTP_HOST=mail.smarterasp.net
   SMTP_PORT=587
   SMTP_USER=contact@yourdomain.com
   SMTP_PASS=the_password_for_that_mailbox
   CONTACT_TO_EMAIL=info@sterlingpro.com
   NEWSLETTER_TO_EMAIL=info@sterlingpro.com
   ```

   Use the actual SMTP host, port, username, and password from SmarterASP. Replace `yourdomain.com` with your real domain if different.

4. Save the file. Do not commit `.env` (it’s in `.gitignore`).

---

## 3. Test the server locally

1. In a terminal, go to the **`server`** folder:
   ```bash
   cd server
   ```
2. Install dependencies and start the API:
   ```bash
   npm install
   npm start
   ```
   You should see something like: `Contact API listening on port 3000`.

3. The API is now running at **http://localhost:3000**. It has two endpoints:
   - `POST http://localhost:3000/api/contact` – contact form and “Contact Sales”
   - `POST http://localhost:3000/api/newsletter` – newsletter signup

4. Optional – test with a tool (PowerShell or curl):
   - **Contact:**  
     ```bash
     curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d "{\"firstName\":\"Test\",\"lastName\":\"User\",\"email\":\"test@test.com\",\"company\":\"Test Co\",\"reason\":\"demo\",\"message\":\"Hello\"}"
     ```
   - **Newsletter:**  
     ```bash
     curl -X POST http://localhost:3000/api/newsletter -H "Content-Type: application/json" -d "{\"email\":\"test@test.com\"}"
     ```
   Then check the **info@sterlingpro.com** inbox; you should see the test emails (from the domain address).

---

## 4. Test the website with the API

1. Keep the **server** running (step 3).
2. In the **main project** (EncryptKey root), create or edit **`.env.production`** or **`.env.local`** and set:
   ```env
   VITE_CONTACT_API_URL=http://localhost:3000
   ```
   (For local testing we use `http://localhost:3000`; for production you’ll use `https://yourdomain.com`.)

3. Start the website:
   ```bash
   npm run dev
   ```
4. Open the site in the browser (e.g. http://localhost:5173).
5. Go to **Contact**, fill out the form, and submit. Then check **info@sterlingpro.com** – the message should be there, from the domain address.
6. Try the **Newsletter** field in the footer and the **Contact Sales** form on the Pricing page. All should land in info@sterlingpro.com.

---

## 5. When everything works

- **Production:** Deploy the **server** to SmarterASP (Node.js hosting) and set the same env vars (SMTP + `CONTACT_TO_EMAIL=info@sterlingpro.com`, `NEWSLETTER_TO_EMAIL=info@sterlingpro.com`) in the hosting panel.
- In the **frontend** `.env.production`, set:
  ```env
  VITE_CONTACT_API_URL=https://yourdomain.com
  ```
  (Use the real URL where the API is deployed, no trailing slash.)
- Run **`npm run build`** and deploy the built site. Forms will then use the live API and send to info@sterlingpro.com.

---

## Summary

| Step | What to do |
|------|------------|
| 1 | Get SmarterASP login → create domain mailbox → get SMTP (host, port, user, password). |
| 2 | In `server/`, copy `.env.example` to `.env` and fill in SMTP + `CONTACT_TO_EMAIL=info@sterlingpro.com`, `NEWSLETTER_TO_EMAIL=info@sterlingpro.com`. |
| 3 | Run `server`: `cd server` → `npm install` → `npm start`. |
| 4 | Set `VITE_CONTACT_API_URL=http://localhost:3000` in the main project, run `npm run dev`, and test Contact, Newsletter, and Contact Sales. |
| 5 | Deploy server to SmarterASP, set `VITE_CONTACT_API_URL=https://yourdomain.com`, build and deploy the site. |

You never need to store the SmarterASP account password in the repo – only the **mailbox** password goes in `server/.env` (and later in the server’s environment on the host).
