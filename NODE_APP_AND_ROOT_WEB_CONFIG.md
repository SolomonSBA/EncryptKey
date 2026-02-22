# Fix: NodeJS for api + keep root web.config correct

You have two things to handle:

1. **NodeJS panel** – "api" doesn’t stay in the list; you have to type it and save. That’s expected until the app is created; after saving, "api" should appear.
2. **Root web.config** – When you save the NodeJS entry, the panel **overwrites** the root **encryptkey\web.config**, which breaks the React SPA. So after every save you must **restore** the root web.config.

Use this workflow so the Node app for **api** works and the root stays correct.

---

## Step 1 – Backup both web.configs

**In File Manager:**

1. Go to **encryptkey** (site root). Open **web.config** → select all → copy, and save to a file on your PC (e.g. **root-web.config.bak**). Or **Rename** it to **web.config.bak** and upload a fresh copy later.
2. Go to **encryptkey\api**. Open **web.config** → copy and save to your PC (e.g. **api-web.config.bak**). Or rename to **web.config.bak** (you’ll need to rename it back to **web.config** after).

You now have backups of both. The root one is the **SPA** config (rewrite to index.html, **excluding /api**).

---

## Step 2 – Create / save the Node app for api

1. In **Control Panel** go to **Websites** → **Manage Website** (encryptkey.co.uk) → **NodeJS**.
2. Type **api** (the folder name) and **Save** (or Create / Add, whatever the panel uses).
3. If the panel asks for an entry file, set **run.cjs** (or **server.js**). Save again if needed.
4. Check the NodeJS list – you should see an entry for **api**.

The panel may overwrite **encryptkey\web.config** at this point. That’s what we fix in the next step.

---

## Step 3 – Restore the root web.config immediately

**Right after saving the NodeJS entry:**

1. In **File Manager** go to **encryptkey** (site root).
2. Open **web.config** and check its content. If it no longer has the SPA rewrite rule and instead has Node/httpPlatform or something else, replace the **entire** content with the correct root config.
3. **Correct root web.config** (SPA only, **/api** excluded):

Use the contents of **ROOT_WEB_CONFIG_RESTORE.txt** in your project (or copy from below). Paste into **encryptkey\web.config** and save.

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
            <add input="{REQUEST_URI}" pattern="^/api" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

4. **Do not** add any Node/httpPlatform or iisnode blocks to the **root** web.config. Those belong only in **api\web.config**.

---

## Step 4 – Check api\web.config

1. In File Manager go to **encryptkey\api**.
2. Open **web.config**. It should be the **iisnode** config:
   - Handler: **run.cjs** (path="run.cjs").
   - Rewrite rule: non-file requests → **run.cjs**.
   - No SMTP or other env vars (you use .env in api).

If the panel changed **api\web.config** to something wrong, restore it from your **api-web.config.bak** (or re-upload the correct api web.config from your **server** folder).

---

## Step 5 – Make sure /api is an application (if needed)

Support said **/api** should be an **application**, not only a virtual directory, so that **api\web.config** is used.

- In **Virtual Directory Manager**, find the **api** entry. If there is an option like **“Convert to Application”** or **“Application”** checkbox, use it for **api**.
- If you don’t see that, you can ask support: “I created the virtual directory **api** and the NodeJS entry for **api**. How do I make **api** an application so that api\web.config (iisnode) is used for requests to /api?”

---

## Step 6 – Test

1. Open **https://encryptkey.co.uk** – the React site should load (root web.config is SPA again).
2. Open **https://encryptkey.co.uk/api/contact** – you should get a response from the Node app (e.g. JSON or “OK” if using hello.js), not connection reset.
3. Submit the Contact form – it should no longer show “Failed to fetch” if the API is reachable.

---

## If the panel keeps overwriting root web.config

Every time you save something in the NodeJS panel and the root **web.config** changes:

1. Go to **encryptkey** in File Manager.
2. Edit **web.config** and replace its content with the **ROOT_WEB_CONFIG_RESTORE.txt** content (the SPA config above).
3. Save.

Keep **ROOT_WEB_CONFIG_RESTORE.txt** (or the snippet above) handy so you can paste it back whenever the panel overwrites the root.

---

## Summary

| Location            | web.config role                                                                 |
|---------------------|----------------------------------------------------------------------------------|
| **encryptkey\**     | SPA only: rewrite to index.html, **exclude /api**. Restore this after panel saves. |
| **encryptkey\api\** | Node/iisnode: handler **run.cjs**, rewrite to run.cjs. Do not put this in root.   |

After backup → save Node for api → restore root web.config → check api\web.config → (convert to application if offered) → test.
