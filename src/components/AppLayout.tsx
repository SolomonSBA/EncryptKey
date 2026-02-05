import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import FeaturesPage from '@/pages/FeaturesPage';
import PricingPage from '@/pages/PricingPage';
import DocumentationPage from '@/pages/DocumentationPage';
import CasesPage from '@/pages/CasesPage';
import ContactPage from '@/pages/ContactPage';
import NotFound from '@/pages/NotFound';

const AppLayout: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/features" element={<FeaturesPage />} />
    <Route path="/pricing" element={<PricingPage />} />
    <Route path="/documentation" element={<DocumentationPage />} />
    <Route path="/cases" element={<CasesPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppLayout;
