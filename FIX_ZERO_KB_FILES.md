# Fix: 0 KB run.cjs, .env, package.json (ERR_CONNECTION_RESET)

On the server, **run.cjs**, **.env**, and **package.json** show **0 KB**. If they’re empty, the Node app never starts and you get **ERR_CONNECTION_RESET**.

Fix by re-uploading or pasting the correct content for each file in File Manager.

---

## 1. run.cjs (must not be empty)

iisnode runs **run.cjs**. If it’s empty, nothing starts.

**Option A – Re-upload**  
Upload the **run.cjs** file from your **server** folder again to the **encryptkey** root. Overwrite the existing one.

**Option B – Paste in File Manager**  
1. In File Manager open **encryptkey** → **Edit** **run.cjs**.  
2. Delete any content.  
3. Paste **exactly** this, then save:

```js
/**
 * CommonJS launcher for the ES module server.js.
 */
(async () => {
  await import('./server.js');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

---

## 2. package.json (must not be empty)

**Option A – Re-upload**  
Upload **package.json** from your **server** folder to **encryptkey** root and overwrite.

**Option B – Paste in File Manager**  
1. **Edit** **package.json** in the encryptkey root.  
2. Replace contents with:

```json
{"name":"encryptkey-contact-api","version":"1.0.0","description":"Contact API + site","type":"module","main":"server.js","scripts":{"start":"node server.js"},"dependencies":{"cors":"^2.8.5","dotenv":"^16.4.5","express":"^4.21.0","nodemailer":"^6.9.16"}}
```

3. Save.

---

## 3. .env (must not be empty)

If **.env** is 0 KB, the app has no SMTP or email settings.

**Edit** **.env** in the encryptkey root and paste your variables (one per line). **Do not add PORT.**

Example (use your real password):

```env
SMTP_HOST=mail5013.site4now.net
SMTP_PORT=587
SMTP_USER=info@encryptkey.co.uk
SMTP_PASS=your_real_password_here
CONTACT_TO_EMAIL=contact@sterlingprong.com
NEWSLETTER_TO_EMAIL=contact@sterlingprong.com
```

Save. If the panel doesn’t show .env, upload it again from your PC (create **.env** in the server folder with the lines above, then upload that file).

---

## 4. After fixing the three files

1. Save all changes.  
2. In the panel, **recycle** the Node app or app pool if there’s an option (or wait a minute).  
3. Open **https://encryptkey.co.uk** again.  
4. Then try **https://encryptkey.co.uk/api/contact**.

If **run.cjs** was the only empty file, fixing it alone can resolve ERR_CONNECTION_RESET. Fixing all three ensures the app can start and send email.
