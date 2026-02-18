/**
 * Form submission: supports either (1) hosting email API or (2) Formspree.
 * - Hosting email: set VITE_CONTACT_API_URL (e.g. https://yourdomain.com). Forms POST to /api/contact and /api/newsletter.
 * - Formspree: set VITE_FORMSPREE_CONTACT_ID and VITE_FORMSPREE_NEWSLETTER_ID.
 */

const FORMSPREE_BASE = 'https://formspree.io/f';

export function getContactApiUrl(): string | undefined {
  const url = import.meta.env.VITE_CONTACT_API_URL as string | undefined;
  return url ? url.replace(/\/$/, '') : undefined;
}

export function getContactFormId(): string | undefined {
  return import.meta.env.VITE_FORMSPREE_CONTACT_ID as string | undefined;
}

export function getNewsletterFormId(): string | undefined {
  return import.meta.env.VITE_FORMSPREE_NEWSLETTER_ID as string | undefined;
}

export type ContactFormData = {
  firstName?: string;
  lastName?: string;
  email: string;
  company?: string;
  reason?: string;
  message?: string;
};

export type NewsletterFormData = {
  email: string;
};

export type SalesFormData = {
  name: string;
  email: string;
  company: string;
  message?: string;
};

export async function submitContactForm(data: ContactFormData): Promise<{ ok: boolean; error?: string }> {
  const apiUrl = getContactApiUrl();
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          company: data.company,
          reason: data.reason,
          message: data.message,
          _subject: 'EncryptKey website – Contact form',
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, error: (json as { error?: string }).error || 'Submission failed' };
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : 'Network error' };
    }
  }
  const id = getContactFormId();
  if (!id) {
    console.warn('No VITE_CONTACT_API_URL or VITE_FORMSPREE_CONTACT_ID; contact form will not send.');
    return { ok: true };
  }
  try {
    const res = await fetch(`${FORMSPREE_BASE}/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company,
        reason: data.reason,
        message: data.message,
        _subject: 'EncryptKey website – Contact form',
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text || 'Submission failed' };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network error' };
  }
}

export async function submitNewsletterForm(data: NewsletterFormData): Promise<{ ok: boolean; error?: string }> {
  const apiUrl = getContactApiUrl();
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, error: (json as { error?: string }).error || 'Submission failed' };
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : 'Network error' };
    }
  }
  const id = getNewsletterFormId();
  if (!id) {
    console.warn('No VITE_CONTACT_API_URL or VITE_FORMSPREE_NEWSLETTER_ID; newsletter will not send.');
    return { ok: true };
  }
  try {
    const res = await fetch(`${FORMSPREE_BASE}/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        _subject: 'EncryptKey website – Newsletter signup',
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text || 'Submission failed' };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network error' };
  }
}

export async function submitSalesForm(data: SalesFormData): Promise<{ ok: boolean; error?: string }> {
  const apiUrl = getContactApiUrl();
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.name,
          email: data.email,
          company: data.company,
          message: data.message || '',
          _subject: 'EncryptKey website – Contact Sales / Enterprise',
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, error: (json as { error?: string }).error || 'Submission failed' };
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : 'Network error' };
    }
  }
  const id = getContactFormId();
  if (!id) {
    console.warn('No VITE_CONTACT_API_URL or VITE_FORMSPREE_CONTACT_ID; sales form will not send.');
    return { ok: true };
  }
  try {
    const res = await fetch(`${FORMSPREE_BASE}/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message || '',
        _subject: 'EncryptKey website – Contact Sales / Enterprise',
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text || 'Submission failed' };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network error' };
  }
}
