/**
 * Institutional hero visual: dark panel with teal grid / key-management style.
 * No stock image — fits the new teal/dark design. Replace with product screenshot later if desired.
 */
import React from 'react';

const HeroVisual: React.FC = () => (
  <div className="relative w-full aspect-[4/3] max-h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-[#0D1320] flex items-center justify-center">
    {/* Teal grid background */}
    <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(0, 184, 150, 0.15)" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="hero-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 184, 150, 0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
      <ellipse cx="20%" cy="30%" rx="40%" ry="50%" fill="url(#hero-glow)" />
    </svg>
    {/* Central “vault” / key hierarchy motif */}
    <svg className="relative w-3/4 max-w-[280px] h-auto text-encrypt-blue opacity-90" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="75" r="45" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
      <circle cx="100" cy="75" r="28" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />
      <circle cx="100" cy="75" r="10" stroke="currentColor" strokeWidth="1.5" fill="rgba(0, 184, 150, 0.08)" />
      <path d="M100 45 L100 65 M85 75 L115 75 M92 58 L108 92 M108 58 L92 92" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
      <path d="M50 120 L150 120 M70 120 L70 140 L130 140 L130 120" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" fill="none" />
      <rect x="88" y="120" width="24" height="12" rx="2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="rgba(0, 184, 150, 0.06)" />
    </svg>
  </div>
);

export default HeroVisual;
