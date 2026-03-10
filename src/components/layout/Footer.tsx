import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin, Mail, ArrowRight, X, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitNewsletterForm } from '@/lib/formspree';

const Footer: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError(null);
    setLoading(true);
    const { ok } = await submitNewsletterForm({ email });
    setLoading(false);
    if (ok) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    } else {
      setError('Subscription failed. Try again or contact us.');
    }
  };

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Use Cases', href: '/cases' },
    ],
    company: [
      { name: 'About Us', href: 'https://sterlingprong.com/' },
      { name: 'Careers', href: '/contact' },
      // { name: 'Blog', href: '/documentation' },
      // { name: 'Press', href: '/contact' },
      // { name: 'Partners', href: '/contact' },
    ],
    resources: [
      { name: 'Community', href: '/contact' },
      { name: 'Support', href: '/contact' },
      { name: 'Status', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/contact' },
      { name: 'Terms of Service', href: '/contact' },
      { name: 'Security', href: '/features' },
      { name: 'Compliance', href: '/cases' },
    ],
  };

  return (
    <footer className="bg-background border-t border-border">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-gradient-to-r from-encrypt-blue/10 to-encrypt-magenta/10 rounded-2xl p-8 lg:p-12 border border-border">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                Request a technical integration brief.
              </h3>
              <p className="text-muted-foreground">
                Get a detailed overview of how EncryptKey integrates with your existing payment infrastructure including HSM compatibility, key loading procedures, and compliance documentation ready for your QSA.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              {error && (
                <p className="text-destructive text-sm sm:col-span-2">{error}</p>
              )}
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-encrypt-blue"
                required
                disabled={loading}
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white whitespace-nowrap"
              >
                {subscribed ? 'Subscribed!' : loading ? 'Sending…' : 'Subscribe'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-encrypt-blue to-encrypt-magenta flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">
                Encrypt<span className="text-encrypt-magenta">Key</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Centralised encryption key management for payment infrastructure. Built for institutions where key security is non-negotiable.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/sterlingprong/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/Sterlingpro_ng"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </a>
              <a
                href="https://ng.linkedin.com/company/sterlingpro-business-applications"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@sterlingprobiotranx.co.uk"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} EncryptKey Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-muted-foreground text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
