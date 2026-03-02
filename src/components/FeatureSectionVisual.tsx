/**
 * Optional institutional visual for the “security foundation” section.
 * Dark + teal, no stock image. Use this or keep featureImage — both fit the new design.
 */
import React from 'react';

const FeatureSectionVisual: React.FC = () => (
  <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0D1320] aspect-video min-h-[280px] flex items-center justify-center">
    <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="feature-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(0, 184, 150, 0.12)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#feature-grid)" />
    </svg>
    {/* Abstract “layers” / infrastructure blocks */}
    <svg className="relative w-full max-w-md h-auto text-encrypt-blue opacity-80" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="40" width="120" height="80" rx="4" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="rgba(0, 184, 150, 0.06)" />
      <rect x="240" y="40" width="120" height="80" rx="4" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="rgba(0, 184, 150, 0.06)" />
      <rect x="140" y="120" width="120" height="80" rx="4" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" fill="rgba(0, 184, 150, 0.08)" />
      <line x1="160" y1="80" x2="260" y2="120" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="4 2" />
      <line x1="280" y1="80" x2="260" y2="120" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="4 2" />
      <line x1="160" y1="120" x2="200" y2="120" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="4 2" />
    </svg>
  </div>
);

export default FeatureSectionVisual;
