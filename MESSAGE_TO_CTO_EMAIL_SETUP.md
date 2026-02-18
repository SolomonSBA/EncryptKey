# Message you can send your CTO – Form / email setup

Copy, edit if needed, and send this to your CTO so they can decide how contact form and newsletter messages should be delivered using the company/hosting email.

---

**Subject:** EncryptKey website – how should contact form & newsletter emails be set up?

Hi,

The EncryptKey marketing site is almost ready to deploy. The contact form, “Contact Sales” (pricing), and footer newsletter need to send submissions to a company email. We’d like **all messages to go to (and ideally come from) an email you create on our hosting** (e.g. `contact@[ourdomain].com` on SmarterASP).

I need your decision on one of these two approaches:

---

**Option 1 – Formspree (third‑party form service)**  
- You (or the company) create an account at [formspree.io](https://formspree.io) and create two forms: one for “Contact + Sales”, one for “Newsletter”.  
- In Formspree we set the “Send submissions to” address to **the mailbox you create on our hosting** (e.g. `contact@ourdomain.com`).  
- All form submissions will then **arrive in that hosting inbox**. When we reply to customers, we reply from that same mailbox, so replies **come from** the company address.  
- No backend code on our side; we only add two form IDs to the site config. Formspree free tier is 50 submissions/month per form.

**What I need from you for Option 1:**  
- A Formspree account (or confirmation we can use a company one) and the two form IDs, **and**  
- The exact email address you will create on SmarterASP where submissions should go (e.g. `contact@ourdomain.com`), so we can set it in Formspree.

---

**Option 2 – Use only our hosting email (no Formspree)**  
- You create the mailbox on SmarterASP (e.g. `contact@ourdomain.com`) and share the **SMTP details** (server, port, username/password) with the dev team.  
- We add a small backend (e.g. a serverless function or a small API) that receives form submissions and sends email via that SMTP so everything **goes to and from** the hosting mailbox.  
- No third‑party form service; everything stays on our infrastructure.

**What I need from you for Option 2:**  
- Confirmation that we should use this approach, **and**  
- SMTP credentials for the mailbox you create (or instructions to create the mailbox and where to find SMTP settings in SmarterASP).

---

If the company **already uses another mail or form provider** (e.g. SendGrid, Mailgun, or an in‑house API), please let me know and we can wire the forms to that instead.

Thanks,  
[Your name]
