# Copy-paste prompt for sterlingpro (or next site) email + deploy

When you're ready to set up email and deploy for sterlingpro, open a new chat and paste the text below. Fill in the bracketed parts. This tells the assistant to use the EncryptKey approach so we skip the trial-and-error.

---

I'm setting up email and deploy for [sterlingpro / site name] on SmarterASP. Use the same approach we used for EncryptKey so we don't repeat the same issues:

- Single-folder Node app at site root (server.js, run.js, web.config). No /api virtual directory.
- React build in server/public; API at /api/contact and /api/newsletter.
- Config via FALLBACK in server.js (and optionally config.local.js). Don't rely on .env or Control Panel env vars — assume .env or small files may become 0 KB on upload.
- iisnode entry: run.js (not run.cjs).

My details:
- Domain: [e.g. sterlingprong.com]
- SMTP mailbox (for sending): [e.g. info@sterlingprong.com] — I have SMTP host, port, user, password.
- Forms should send to: [e.g. contact@sterlingprong.com]
- SSL: not ready yet — use http for VITE_CONTACT_API_URL.

Please:
1. Set up or confirm the server structure (FALLBACK, run.js, build:single, single-folder deploy) and frontend API URLs.
2. Give me a short deploy checklist for this site (upload server contents to root, Node app = run.js, restore web.config if panel overwrites it).
3. Include a "when SSL is ready" step: set VITE_CONTACT_API_URL=https://..., rebuild, re-upload public.

Reference: DEPLOY_EMAIL_CHECKLIST_FOR_NEXT_SITE.md in the EncryptKey project.

---

Replace [sterlingpro / site name], [e.g. sterlingprong.com], [e.g. info@...], [e.g. contact@...] with your real values before sending.
