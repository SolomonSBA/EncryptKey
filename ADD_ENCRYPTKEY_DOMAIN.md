# Add encryptkey.co.uk to your SmarterASP hosting and email

You see **encryptkey.co.uk** under **DOMAINS** (you own it), but it does **not** show under your hosting’s **Websites** or **Email Manager** because it is not yet **attached to your hosting account**. Add it in two steps: (1) attach domain to hosting, (2) add domain in Email Manager.

---

## Part 1: Attach encryptkey.co.uk to your hosting

Right now your hosting plan **sterlingprong-001** only lists domains like creditbuddie.com, sterlingprong.com, monit.sterlingprong.com. You need to **add** encryptkey.co.uk to this same plan.

### Where to do it

**Option A – From the hosting account**

1. Go to **HOSTINGS** → click your plan (**sterlingprong-001**), or click the **grid/rocket icon** in the ACTIONS column to open the control panel / hosting details.
2. Look for a **“Domains”** or **“Domain Management”** or **“Add Domain”** section.
3. Click **Add Domain** (or similar) and choose **encryptkey.co.uk** from your account domains, then confirm. That attaches encryptkey.co.uk to this hosting plan.

**Option B – From DOMAINS**

1. Go to **DOMAINS** → **My Domain Names**.
2. Click the **gear (settings)** icon next to **encryptkey.co.uk**.
3. Look for an option like **“Host this domain”**, **“Point to hosting”**, **“Assign to hosting”**, or **“Use with hosting”**.
4. Select your hosting account (**sterlingprong-001** / Premium Plan - EU) and save. That links the domain to this hosting.

After this, encryptkey.co.uk should appear in the list of domains for your hosting and can be used for a website and for email.

---

## Part 2: Add encryptkey.co.uk in Email Manager

You currently see **creditbuddie.com**, **sterlingprobiotranx.co.uk**, and **sterlingprong.com** in Email Manager, but not encryptkey.co.uk. Add it so you can create **info@encryptkey.co.uk**.

1. Go to **EMAILS** (Email Manager) – same place as your third screenshot.
2. Look for **“Add Domain”**, **“+ Add”**, **“New domain”**, or similar (often top-right or above the table).
3. Click it and enter **encryptkey.co.uk** as the new email domain.
4. Save. The new domain may show as inactive at first.
5. If there is an **“Activate”** or **“Setup”** step (like for sterlingprong.com in your screenshot), complete it (DNS may be needed; SmarterASP usually guides you).
6. Once **encryptkey.co.uk** is **Active** in the list, use the **person icon** (or “Manage” / “Mailboxes”) to **create the mailbox**:
   - **Address:** `info` → full address will be **info@encryptkey.co.uk**
   - **Password:** set a strong password and save it (you’ll use it in `server/.env` for SMTP).
7. In the same mailbox or domain settings, note the **SMTP** details:
   - **SMTP server:** likely **mail.encryptkey.co.uk** (or what the panel shows).
   - **Port:** usually **587** or **465**.
   - **Username:** **info@encryptkey.co.uk**.
   - **Password:** the one you set.

Use these in **`server/.env`** as in SMARTERTASP_STEPS.md.

---

## Part 3: Create the website for encryptkey.co.uk

After the domain is attached to hosting:

1. Go to **WEBSITES** → **My Websites** (your second screenshot).
2. Click **“+ New Site”**.
3. When asked for the domain, choose or enter **encryptkey.co.uk** (it should appear now that it’s attached).
4. Create the site (e.g. name it “encryptkey” or “EncryptKey”).
5. When it’s created, you’ll have a site (like site7) with **encryptkey.co.uk**.
6. Use **FTP** or **FILES** to upload the **contents** of your project’s **`dist`** folder (after `npm run build`) to this site’s **root** (e.g. `httpdocs` or the folder the panel shows). Ensure **web.config** is included so routes like `/contact` work.

---

## Summary

| What you see now | What to do |
|------------------|------------|
| encryptkey.co.uk under DOMAINS only | **Part 1:** Attach it to hosting (Hosting → Add domain, or Domains → gear → point to hosting). |
| encryptkey.co.uk not in Email Manager | **Part 2:** In EMAILS, click Add Domain → add encryptkey.co.uk → Activate → create info@encryptkey.co.uk and get SMTP. |
| encryptkey.co.uk not in My Websites | **Part 3:** After Part 1, in WEBSITES click “+ New Site” and assign encryptkey.co.uk, then upload your `dist` contents. |

Order: do **Part 1** first so the domain is on the plan, then **Part 2** (email) and **Part 3** (website). If you don’t see “Add Domain” or “Point to hosting”, use SmarterASP’s **Helpdesk** or **Knowledge Base** and ask: “How do I add an existing domain (encryptkey.co.uk) to my hosting plan and to Email Manager?”
