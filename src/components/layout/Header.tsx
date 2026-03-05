import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Shield, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useTheme } from '@/components/theme-provider';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Use Cases', href: '/cases' },
  { name: 'Contact', href: '/contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, [theme]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-encrypt-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-encrypt-blue to-encrypt-magenta flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-encrypt-blue to-encrypt-magenta blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Encrypt<span className="text-encrypt-magenta">Key</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-encrypt-blue border-b-2 border-encrypt-blue bg-transparent'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Theme toggle + Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              className="bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white border-0 shadow-lg shadow-encrypt-blue/25"
              asChild
            >
              <Link to="/contact">Request integration details</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white dark:bg-encrypt-dark border-gray-200 dark:border-white/10 p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200 dark:border-white/10">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-encrypt-blue to-encrypt-magenta flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                      Encrypt<span className="text-encrypt-magenta">Key</span>
                    </span>
                  </Link>
                </div>
                <nav className="flex-1 p-6 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                        isActive(link.href)
                          ? 'text-encrypt-blue border-b-2 border-encrypt-blue bg-transparent'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="p-6 border-t border-gray-200 dark:border-white/10 space-y-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-full justify-center text-gray-600 dark:text-gray-400"
                    onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setIsOpen(false); }}
                    aria-label="Toggle theme"
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white"
                    asChild
                  >
                    <Link to="/contact" onClick={() => setIsOpen(false)}>Request integration details</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
