# Reduce form emails going to Junk (Outlook / contact@sterlingprong.com)

Form messages are sent **from** info@encryptkey.co.uk **to** contact@sterlingprong.com. If they land in Junk, it’s usually because the **sending domain** (encryptkey.co.uk) isn’t fully trusted yet. Fix that with **SPF** and **DKIM** in DNS, plus one optional step for Outlook.

---

## What your screenshot is for

The **“Edit/Set Forwarding”** screen is for emails that **arrive** at info@encryptkey.co.uk and get **forwarded** to contact@sterlingprong.com. Our website doesn’t use that: the form sends **directly** to contact@sterlingprong.com via SMTP. So:

- Forwarding to contact@sterlingprong.com is separate from the form.
- The warning about “free email providers” (Hotmail, Gmail, etc.) applies when **forwarding** to those. Our case is **sending** to them; improving **SPF/DKIM** for encryptkey.co.uk is what helps.

If you use forwarding as well, you can leave it as is, or check **“Delete messages when forwarded”** to avoid filling the mailbox (as the red note suggests).

---

## Step 1: Enable DKIM and add the DKIM record (SmarterASP)

SmarterASP’s own guide: [Set up DKIM record with our new email system](https://www.smarterasp.net/support/kb/a2225/set-up-dkim-record-with-our-new-email-system.aspx).

1. Log in to **Webmail** for encryptkey.co.uk using the **postmaster** (admin) user.
2. Go to **Domain Settings** → **General**.
3. **Enable DKIM** and copy the **TXT record value** they show.
4. In the **Control Panel** → **DNS** (for encryptkey.co.uk), add a **TXT** record:
   - Use the **exact name** and **value** from the Webmail DKIM screen.
   - If you use SmarterASP’s nameservers, add it in **Control Panel → DNS**. If DNS is elsewhere, add the same TXT record there.

This lets receiving servers (e.g. Outlook) verify that mail from @encryptkey.co.uk is really from your server.

---

## Step 2: Add an SPF record for encryptkey.co.uk

SPF says which mail servers are allowed to send for **encryptkey.co.uk**. Without it, Outlook and others are more likely to treat the mail as spam.

1. In **Control Panel** → **DNS** (or your DNS provider), open the zone for **encryptkey.co.uk**.
2. Add a **TXT** record:
   - **Name/host:** `@` or `encryptkey.co.uk` (depends on the panel; “@” often means the root domain).
   - **Value:** You need the **exact** SPF string SmarterASP uses. Common options:
     - Check SmarterASP Knowledge Base for **“SPF”** or **“DNS”** for your hosting.
     - Or ask SmarterASP support: “What SPF TXT record should I add for encryptkey.co.uk so mail sent via your servers is accepted?”
   - A typical shape is:  
     `v=spf1 include:... -all`  
     (the `include:` part must be what SmarterASP gives you).

3. Save. DNS can take up to 24–48 hours to update; often it’s quicker.

SmarterASP’s own article: [How To Prevent Outgoing Email From Being Marked As Spam](https://www.smarterasp.net/support/kb/a2169/how-to-prevent-outgoing-email-from-being-marked-as-spam.aspx) – they say to create SPF and enable DKIM and link to their DKIM article.

---

## Step 3 (optional): Help Outlook trust you (Microsoft)

Because the form sends to **contact@sterlingprong.com** (often Outlook/Microsoft), you can also:

1. **Mark as “Not junk”** in Outlook  
   Open the form message in Junk → **“Not junk”** (or “Report as not junk”). That trains Outlook for that sender/domain.

2. **Microsoft Junk Email Reporting Partner (JMRP)**  
   - Go to: [https://postmaster.live.com/snds/JMRP.aspx](https://postmaster.live.com/snds/JMRP.aspx)  
   - Sign up and complete the steps.  
   This helps Microsoft treat your sending domain more fairly.

3. **Smart Network Data Services (SNDS)**  
   - [https://postmaster.live.com/snds/addnetwork.aspx](https://postmaster.live.com/snds/addnetwork.aspx)  
   - Add your sending IP/network if needed (SmarterASP may use shared IPs; their docs or support can confirm).

---

## Summary

| Action | Where | Why |
|--------|--------|-----|
| Enable DKIM + add DKIM TXT | Webmail (postmaster) → Domain Settings → General; then Control Panel → DNS | So Outlook can verify mail from @encryptkey.co.uk |
| Add SPF TXT record | Control Panel → DNS for encryptkey.co.uk (or your DNS provider) | So Outlook knows your mail server is allowed to send for encryptkey.co.uk |
| Mark “Not junk” in Outlook | Inbox of contact@sterlingprong.com | Short-term improvement while DNS propagates |
| (Optional) JMRP / SNDS | Microsoft postmaster links above | Can help long-term with Outlook/Microsoft deliverability |

After SPF and DKIM are correct for **encryptkey.co.uk**, form emails from info@encryptkey.co.uk to contact@sterlingprong.com should land in Inbox more often. If the CTO has the SmarterASP login, they can do DKIM (Webmail + DNS) and SPF (DNS or with support) using the links above.
