# "Failed to fetch" when submitting the Contact form

"Failed to fetch" usually means the browser could not get a response from the API (wrong URL, API not running, or blocked). Use these checks in order.

---

## 1. Check what URL the form is calling

1. Open your site: **https://encryptkey.co.uk** (or your real URL).
2. Press **F12** to open Developer Tools → open the **Network** tab.
3. Submit the Contact form again.
4. In the Network list, find the request to **contact** (or **api/contact**). Click it.
5. Note:
   - **Request URL** – should be `https://encryptkey.co.uk/api/contact` (same domain as the site).
   - **Status** – e.g. 404, 502, (failed), or CORS error.

If the Request URL is wrong (e.g. `http://localhost:3000/api/contact`), you need to **rebuild** the site with the correct API URL and upload again (see step 4 below).

---

## 2. Check if the API is running

In the browser, open this URL (GET request):

**https://encryptkey.co.uk/api/contact**

- If you see something like **"Cannot GET /api/contact"** or **"Cannot GET /contact"** → the Node app is running; the problem may be CORS or how the form is sending the request.
- If you get **404** or **502** or a blank/error page → the API is not running or not reachable at `/api`.

Then:

- In SmarterASP **Control Panel** → **Websites** → **Manage Website** → **Setup Node.js App**:
  - **Application startup file** must be **`server.js`**.
  - Node.js must be **Enabled**.
- The Node app files must be in the **`api`** folder. Some hosts need the Node.js app to be set **for that folder** (not for the whole site). If there is an option like “Application path” or “Physical path”, set it to the **api** folder so that `server.js` is **api\server.js**. Otherwise the host may be looking for **server.js** in the site root (where it doesn’t exist) and Node won’t start.

---

## 3. Same origin and HTTPS

- The site and the API should use the **same domain** and **same protocol** (both HTTPS).
- When you built the frontend, **`.env.production`** should contain:
  ```bash
  VITE_CONTACT_API_URL=https://encryptkey.co.uk
  ```
  (no trailing slash; use your real domain). Then run **`npm run build`** again and **re-upload** the contents of **`dist`** to the site root.

---

## 4. Rebuild and re-upload the frontend (if the URL was wrong)

1. In the project root, set **`.env.production`**:
   ```bash
   VITE_CONTACT_API_URL=https://encryptkey.co.uk
   ```
2. Run:
   ```bash
   npm run build
   ```
3. Zip the **contents** of **`dist`** (index.html, assets, web.config).
4. In File Manager, go to the **encryptkey** root (where `api` and `index.html` are).
5. Upload the new zip and **Unzip** (replace existing files).

Then test the form again and, if it still fails, check the Network tab (step 1) and the API URL test (step 2) again.

---

## 5. If the host runs Node only at the site root

If SmarterASP runs Node only at the **site root** (and not in the `api` subfolder), then:

- Either move the Node app to the root (so **server.js**, **web.config** for Node, **node_modules** are in **encryptkey**, and the React site is in a subfolder or served by Node), **or**
- Ask SmarterASP support: “How do I run a Node.js application only in a subfolder (e.g. /api) so that https://mysite.com/api/... is handled by that app?”

Once the API responds at **https://encryptkey.co.uk/api/contact** (and the frontend is built with that base URL), the “Failed to fetch” error should go away.
