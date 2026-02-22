# ERR_CONNECTION_RESET when calling /api/contact

If **https://encryptkey.co.uk/api/contact** gives "The connection was reset" / ERR_CONNECTION_RESET, the request is either **not reaching** the Node app or the **Node process is crashing** before it can respond. Use the steps below to narrow it down.

---

## 1. Add a health route and re-upload (done in code)

The server now has **GET** routes that do **not** use SMTP or .env:

- **GET** `/api/contact` or **GET** `/api` or **GET** `/` → returns `{ "status": "ok", "message": "..." }`

So you can test if the Node app responds at all.

**What to do:** Re-upload **only** **server.js** to the **api** folder (File Manager → api → Upload the new server.js and overwrite). Then in the browser open:

**https://encryptkey.co.uk/api/contact**

- If you see **`{"status":"ok","message":"Contact API"}`** → Node is running and receiving requests. The problem is likely only with **POST** (e.g. SMTP or .env). We can fix that next.
- If you still get **connection reset** → the request is not reaching Node, or Node is not starting. Go to step 2.

---

## 2. Confirm /api is routed to the api folder

On IIS, the path **/api** must be mapped to the **physical folder** that contains your Node app (run.cjs, server.js, web.config). Otherwise requests to **/api/contact** never hit Node.

**Ask SmarterASP support:**

"When I open https://encryptkey.co.uk/api/contact I get ERR_CONNECTION_RESET. Please confirm:

1. Is the URL path **/api** mapped to the physical folder **encryptkey\\api** (where our Node app with run.cjs, server.js, and web.config is deployed)?
2. Is the Node.js application for that folder enabled and set to use **run.cjs** (or server.js) as the entry file?
3. Are there any errors in the iisnode or application logs for that folder when a request is made to /api/contact?"

They may need to create an **Application** or **Virtual Directory** for **/api** pointing to the **api** folder.

---

## 3. Check api folder contents

In **File Manager** → **api**:

| File / folder | Check |
|---------------|--------|
| **.env** | Open with Edit. Must contain 6 lines: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, NEWSLETTER_TO_EMAIL. No blank file. |
| **run.cjs** | Should be a few hundred bytes. If 0 KB or empty, re-upload **run.cjs** from your **server** folder. |
| **web.config** | Should be the iisnode config (handler path **run.cjs**). |
| **server.js** | After the update, should include the GET routes and be a few KB. |

If **.env** was empty, the app would still start; it would only fail when sending email (POST). So **connection reset** on **GET** usually means Node isn’t running or /api isn’t routed to the api folder.

---

## 4. Check Node / iisnode logs

If the host provides logs for the Node app or iisnode (e.g. under **api\\iisnode** or in the control panel), open them and look for:

- "Contact API listening on port ..." → app started.
- Any **error** or **stack trace** → copy and use that to fix the crash or ask support.

---

## Summary

| If GET /api/contact returns JSON | Meaning |
|----------------------------------|--------|
| Yes `{ "status": "ok" }`         | Node is running; focus on POST / .env / SMTP. |
| Still connection reset           | Node not reached or not starting → check /api mapping and logs with SmarterASP. |

After re-uploading **server.js** to the **api** folder, test **GET https://encryptkey.co.uk/api/contact** again and use the result (JSON vs reset) to decide next steps.
