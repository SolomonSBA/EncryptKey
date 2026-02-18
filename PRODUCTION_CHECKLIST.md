# EncryptKey website – production checklist

Use this before going live with your domain and hosting.

**Deploying to SmarterASP.net?** See **[DEPLOY_SMARTERTASP.md](./DEPLOY_SMARTERTASP.md)** for step-by-step instructions.

---

## 1. What “Now SOC 2 Type II Certified” means

**SOC 2** = **Service Organization Control 2** – an audit standard (by AICPA) that shows your company has security controls to protect customer data.

- **Type I** = One-time check that controls are *designed* correctly.
- **Type II** = Audit over a period (e.g. 6–12 months) that controls are *actually working* in practice.

So **“SOC 2 Type II Certified”** on the site means: an independent auditor has confirmed that EncryptKey’s security practices have been operating effectively over time. For a product selling encryption to banks and payment systems, it’s a strong trust signal.

**Important:** Only show this badge if EncryptKey has completed a real SOC 2 Type II audit and has the report. If you’re not certified yet, remove or change the text (e.g. “SOC 2 in progress” or remove the badge until you’re certified).

---

## 2. What’s remaining before production

You have **domain** and **hosting**. Below is what’s left so the site (and email/forms) work properly in production.

### A. Contact form – make it send real emails

**Current behaviour:** The form only shows “Message Sent!” and does not send data anywhere.

**Options (pick one):**

| Option | Effort | Notes |
|--------|--------|--------|
| **Formspree** | Low | Free tier: 50 submissions/month. Add `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"` to the form. No backend code. |
| **Getform / Netlify Forms / similar** | Low | Same idea: form posts to their URL, they email you or store submissions. |
| **Your own backend** | Higher | Small API (e.g. Node/Express or serverless) that receives the form and sends email via SendGrid, Resend, AWS SES, or your host’s SMTP. |

**Recommendation:** Start with **Formspree** (or similar) for a quick, production-ready contact form. You can switch to your own backend later.

**If the company wants all messages to go to and from an email created on the hosting (e.g. SmarterASP):** Formspree can still be used – you set its “Send submissions to” to that hosting inbox; replies are then sent from your mail client using that same address. If they prefer no third-party service, the CTO can provide SMTP for that mailbox and we wire the forms to a small backend. Use **[MESSAGE_TO_CTO_EMAIL_SETUP.md](./MESSAGE_TO_CTO_EMAIL_SETUP.md)** to message the CTO and get a decision (Formspree vs hosting SMTP / existing mail provider).

---

### B. Newsletter signup (footer) – make it functional

**Current behaviour:** “Subscribe” only updates local state and does not save or send anywhere.

**Options:**

- Use an **email marketing provider** (Mailchimp, ConvertKit, etc.): get a signup form URL or API and post the footer email to it.
- Or use **Formspree** again with a second form that forwards to your team and/or adds the address to a list manually until you integrate a proper tool.

---

### C. Environment variables (when you add APIs)

- Put any **API keys**, **form IDs**, or **backend URLs** in environment variables.
- In Vite, use `import.meta.env.VITE_*` (e.g. `VITE_FORMSPREE_ID`).
- In production, set these in your hosting dashboard (Vercel, Netlify, etc.) so they are not in the code.

---

### D. Domain and hosting

- Point your **domain DNS** to your hosting (A/CNAME as instructed by the host).
- Ensure **HTTPS** is enabled (most hosts do this automatically).
- After deploy, test: `https://yourdomain.com` loads and all links work.

---

### E. Favicon and meta image

- Replace `public/placeholder.svg` with your real **favicon** (e.g. EncryptKey logo).
- Add a real **og:image** (e.g. `public/og.jpg`) for social sharing; update `index.html` if the path changes.

---

### F. Legal and compliance (recommended)

- **Privacy Policy** and **Terms of Service**: either real pages or clear placeholders. Right now “Privacy” / “Terms” link to Contact; for production, better to have dedicated pages or at least a single “Legal” page.
- Only show **SOC 2 Type II** if you are actually certified (see section 1).

---

### G. Optional but useful

- **Analytics**: e.g. Google Analytics, Plausible, or your host’s built-in stats.
- **Error monitoring**: e.g. Sentry, for JavaScript errors in production.
- **Rate limiting / bot protection**: if you use a form service, check their spam protection; if you build your own API, add rate limiting.

---

## 3. Quick summary

| Item | Status / action |
|------|------------------|
| Domain | You have it – point DNS to host |
| Hosting | You have it – deploy build (e.g. `npm run build` → upload `dist/` or connect Git) |
| Contact form | **To do** – connect to Formspree (or similar) or your own backend so submissions send email |
| Newsletter | **To do** – connect to Formspree or an email/marketing service |
| SOC 2 badge | **Check** – only show if you are actually SOC 2 Type II certified |
| Favicon / og:image | Replace placeholders for a professional look |
| HTTPS | Usually automatic with hosting |
| Env vars | Use when you add form/API keys |

If you tell me your chosen form solution (e.g. Formspree), I can show the exact form `action` and any small code changes needed so the contact form and, if you want, the newsletter are production-ready.
