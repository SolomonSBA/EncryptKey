# Test the api folder and reply to support

Use this to (1) test if Node runs at all with a minimal script, and (2) send support the details they asked for.

---

## Part 1 – Minimal test (hello.js)

Support suggested trying a **minimal** Node script to see if the handler runs. If **hello.js** responds, the platform is OK and the issue is in our app (run.cjs / server.js / ESM). If hello.js also gives connection reset, the issue is mapping or Node setup.

### Step 1 – Upload hello.js and a web.config that uses it

1. In your **server** folder you now have:
   - **hello.js** – minimal CommonJS server, no ESM, no dependencies; returns "OK" and listens on `process.env.PORT`.
   - **web.config.hello** – iisnode config that points to **hello.js** (instead of run.cjs).

2. In **File Manager** go to **encryptkey\api**:
   - **Upload** **hello.js** (from server folder).
   - **Edit** the existing **web.config** in the api folder: replace its **entire** content with the content of **web.config.hello** (so the handler is **hello.js** and the rewrite rule rewrites to **hello.js**). Save.
   - Or: upload **web.config.hello** as a separate file, then rename the current web.config to **web.config.backup** and rename **web.config.hello** to **web.config**.

3. In the browser open: **https://encryptkey.co.uk/api/** or **https://encryptkey.co.uk/api/contact**.

**Result:**

- If you see **"OK"** (plain text) → Node and the /api mapping work. The problem is likely our app (run.cjs / server.js or ESM). Then restore the real app (see “Restore real app” below) and we can focus on ESM/run.cjs.
- If you still get **ERR_CONNECTION_RESET** → The /api path is probably not mapped to the api folder, or Node is not enabled for that folder. Do the Control Panel checks in Part 2 and send support the info in Part 3.

### Restore the real app after the test

1. In **api** folder: **Edit** **web.config** and put back the **run.cjs** version (handler and rewrite to **run.cjs**), or re-upload your normal **web.config** (the one that points to run.cjs).
2. Keep **server.js**, **run.cjs**, **.env**, **node_modules**, etc. in place. You can leave **hello.js** in the folder; it won’t be used once web.config points to run.cjs again.

---

## Part 2 – Control Panel checks (you do these)

Do these and note what you see:

1. **Virtual path /api**
   - Go to **Hosting Control Panel** → **Websites** → **Website Domain Manager** (or where domain/folder mappings are).
   - For **encryptkey.co.uk**, check if there is a **virtual path** or **application** **/api** that points to the physical folder **encryptkey\api** (or `site root\api`). Note: “Yes, /api points to api folder” or “No /api mapping” or “I don’t see this option”.

2. **Node.js for the api folder**
   - Go to **Websites** → **Manage Website** (encryptkey.co.uk) → **NodeJS**.
   - Is there a Node.js application for the folder **api**? What entry file is shown (run.cjs, server.js, or nothing)? Note it.

3. **Logs**
   - Under **api** (or site root), look for a **logs** folder or files like **iisnode*.log**, **node*.log**, or **stdout/stderr** logs. If you find any, note the folder path and one or two recent lines (mask any secrets). If there is no logs folder or no recent entries when you hit /api/contact, say that.

---

## Part 3 – What to send to support

Copy and paste the following, then fill in the blanks and attach any log snippets (with secrets removed).

---

**Subject:** ERR_CONNECTION_RESET on /api/contact – details you asked for

I’m still getting ERR_CONNECTION_RESET when opening https://encryptkey.co.uk/api/contact. I’ve done the following and need your help to confirm server-side behavior.

**1. Minimal test**

I put a minimal Node script **hello.js** in the api folder and set web.config to use it (handler and rewrite to hello.js). It uses only `require('http')` and `listen(process.env.PORT)` and returns "OK".

- Result: [ I see "OK" in the browser / I still get ERR_CONNECTION_RESET ]

**2. api\\web.config (current – for the real app, run.cjs)**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="run.cjs" verb="*" modules="iisnode" />
    </handlers>
    <rewrite>
      <rules>
        <rule name="StaticContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" />
          </conditions>
          <action type="None" />
        </rule>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
          </conditions>
          <action type="Rewrite" url="run.cjs" />
        </rule>
      </rules>
    </rewrite>
    <iisnode node_env="production" />
  </system.webServer>
</configuration>
```

**3. Files in the api folder**

- .env  
- hello.js (only when testing)  
- node_modules (folder)  
- package.json  
- package-lock.json  
- run.cjs  
- server.js  
- web.config  

(Add any other files you see, e.g. iisnode folder, logs folder.)

**4. Control Panel**

- Domain Manager: [ e.g. “I don’t see a place to set virtual path /api ” or “I see /api pointing to …” ]  
- NodeJS for api folder: [ e.g. “Node is enabled for folder api, entry file run.cjs” or “Entry file not shown” ]  

**5. Logs**

- [ e.g. “No logs folder under api” or “Attached last 5 lines of iisnode_*.log (secrets removed)” ]

Please confirm whether the path /api is mapped to the physical folder encryptkey\api and whether the Node process is starting when requests are made to /api/contact. If you can check server-side logs for my account when I request https://encryptkey.co.uk/api/contact, that would help.

Thank you.

---

Use **Part 1** to run the hello.js test, **Part 2** to do the panel checks, and **Part 3** to send the above (with your results and any log lines) to support.
