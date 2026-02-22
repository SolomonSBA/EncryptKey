# Where to upload on SmarterASP (File Manager)

You’re in **File Manager** at:  
`…\www\encryptkey\`  
That’s the **site root** for encryptkey.co.uk. Use the **Upload** button (↑) to upload zips, then **Unzip** to extract.

---

## 1. Node.js server (API) – upload into the **`api`** folder

**Don’t** unzip the server into the root of `encryptkey`. If you do, you’ll mix the Node app with the website and have two different `web.config` files in the same place.

**Do this:**

1. In File Manager, stay in the **encryptkey** folder.
2. Create a **new folder** named **`api`** (e.g. “New folder” or “New” → “Folder”).
3. **Open** the **`api`** folder.
4. **Upload** your **server zip** here (the one with `server.js`, `package.json`, `web.config`, `node_modules`).
5. **Select** the zip and click **Unzip**.
6. Inside **encryptkey\api\** you should see: `server.js`, `package.json`, `web.config`, `node_modules`.

**In the Control Panel:** Enable **Node.js** for the **`api`** folder only (Websites → Manage Website → Node.js), so the rest of the site stays static.

The API will be at: **`https://encryptkey.co.uk/api`**  
Forms will call `https://encryptkey.co.uk/api/contact` and `.../api/newsletter` (same as now; no frontend change).

---

## 2. Frontend (React site) – upload into the **encryptkey** root (same place, different folder)

The **website** (React) goes in the **same site** but in the **root** of `encryptkey`, **not** inside `api`.

**Do this:**

1. In File Manager, go **back** to the **encryptkey** folder (click **Back** or the path so you’re in `…\www\encryptkey\`).
2. You should see the **`api`** folder (and maybe `default.asp`). Leave **`api`** as it is.
3. **Upload** your **frontend zip** here (the **contents** of `dist`: `index.html`, `assets` folder, `web.config` for the SPA).
4. **Select** the zip and click **Unzip**.
5. After unzip, in **encryptkey** you should have:
   - **`api`** (folder) – Node app
   - **`index.html`**
   - **`assets`** (folder)
   - **`web.config`** (the one for the React SPA, so routes like /contact work)

You can delete **`default.asp`** if you don’t need it; the site will be served by `index.html`.

---

## Summary

| What              | Where to upload and unzip        | Resulting URL / role      |
|-------------------|----------------------------------|----------------------------|
| **Server zip**    | **encryptkey\api\**             | API: …/api/contact, …/api/newsletter |
| **Frontend zip**  | **encryptkey\** (root, not api) | Site: https://encryptkey.co.uk      |

- **Same “place”** = same site (**encryptkey**).
- **Different folders**: server → **`api`**; website → **root** of **encryptkey**.
- Build the frontend with **`VITE_CONTACT_API_URL=https://encryptkey.co.uk`** (no `/api`), so the form posts to `https://encryptkey.co.uk/api/contact` and the Node app in **`api`** handles it.
