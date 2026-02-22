# Check or create the /api virtual directory (before hello.js test)

The **Add Domain Name** / **Domain Manager** screen is for **domain names** (e.g. www.encryptkey.co.uk). It does **not** set the URL path **/api** or map it to your api folder.

To have **https://encryptkey.co.uk/api/...** hit your Node app, the path **/api** must be a **virtual directory** (or application) that points to the physical **api** folder. On your panel that is done under **Create Virtual Dir**.

---

## What to do (in order)

### 1. Close the "Add Domain Name" modal

That screen is only for adding domains/aliases. You can leave Domain Manager for now.

### 2. Open "Create Virtual Dir" (Advanced Features)

In the same **Websites** → **Manage Website** (encryptkey.co.uk) area, in the **Advanced Features** section on the right, click:

**Create Virtual Dir**

(or **Virtual Directory** / **Add Virtual Directory**, depending on the exact label).

### 3. See if /api already exists

In the virtual directory list you should see something like:

- **Alias / Name** (e.g. `api`)
- **Physical path** (e.g. `...\encryptkey\api` or `...\www\encryptkey\api`)

Check:

- Is there already an entry with **alias** (name) **`api`**?
  - **Yes** – Note the **physical path**. It should be the folder that contains **run.cjs**, **server.js**, **web.config** (your api folder). If the path is wrong, edit it to point to the correct **api** folder. If the path is correct, the mapping is there; the issue may be Node not starting (hello.js test still useful).
  - **No** – You need to **create** the virtual directory (step 4).

### 4. If there is no "api" virtual directory – create it

Use **Add** / **Create** (or similar) and set:

- **Alias (or Virtual path / Name):** `api`  
  (so the URL path is **/api**)
- **Physical path:** The full path to your **api** folder on the server.  
  It is often something like:
  - `h:\root\home\sterlingprong-001\www\encryptkey\api`
  or
  - `D:\...\encryptkey\api`  
  Use the same base path as your site root (e.g. from **Mapped Path** for the main site) and add `\api` at the end. If the panel has a “Browse” or “…” button, you can select the **api** folder.

Save/Apply.

---

## After that

- If you **created** or **fixed** the **api** virtual directory, try **https://encryptkey.co.uk/api/contact** again (and the hello.js test if you already switched to it). You may see "OK" or the JSON response instead of connection reset.
- If **api** was already correct, the problem is likely Node not starting or not enabled for that folder; the **hello.js** test and **Node.js App** settings (and logs) are the next step.

Summary: **Domain Manager** = domains only. **Create Virtual Dir** = where **/api** is mapped to the **api** folder. Check or create **api** there before relying on the hello.js test.
