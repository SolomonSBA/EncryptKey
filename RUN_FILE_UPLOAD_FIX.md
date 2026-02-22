# run.cjs becomes 0 KB when uploaded – what to do

Some hosts strip or block **.cjs** files (or block editing them), so **run.cjs** ends up 0 KB after upload.

---

## Option 1: Use run.js instead (recommended)

The project now has **run.js** (same behavior as run.cjs). The host may allow **.js** files.

1. **Upload run.js** from your **server** folder to the **encryptkey** root. Overwrite if it exists.
2. **Update web.config** on the server: change **run.cjs** to **run.js** in both places:
   - `path="run.js"`
   - `url="run.js"`
   (Or upload the **server/web.config** from your project – it already points to run.js.)
3. In the panel, **Setup Node.js App** → set **Application startup file** to **run.js** (if the panel asks).
4. Recycle/restart the Node app and test **https://encryptkey.co.uk**.

If **run.js** also becomes 0 KB after upload, use Option 2.

---

## Option 2: Use server.js as the entry (no run file)

If both run.cjs and run.js end up 0 KB, point the host at **server.js** so no launcher file is needed.

1. On the server, **Edit web.config** and replace its content with the content of **server/web.config.serverjs** in your project (or change both handler and rewrite url from **run.js** to **server.js**).
2. In the panel, set **Application startup file** to **server.js**.
3. Save and recycle the Node app.

The app uses ES modules (`"type": "module"` in package.json), so **node server.js** should work on a recent Node version. If you see an error like “Unexpected token import”, the host’s Node may be too old or not using the project’s package.json; then we’d need to try another workaround (e.g. ask support why .cjs/.js uploads become 0 KB).

---

## If you still can’t edit or upload

Ask SmarterASP support:

“When I upload **run.cjs** (or **run.js**) to the site root, the file becomes **0 KB** and I can’t edit it. Can you (1) confirm whether .cjs or small .js files are restricted or modified on upload, and (2) allow or fix upload/edit for the Node entry file (run.cjs or run.js) in the encryptkey root?”

They may unblock the extension or fix the upload process.
