import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Lock, Key, Code, 
  ArrowRight, CheckCircle, 
  ChevronRight, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const heroImage = 'https://d64gsuwffb70l.cloudfront.net/69833e6536dcbf57940a4687_1770208957086_e95c52da.jpg';
const featureImage = 'https://d64gsuwffb70l.cloudfront.net/69833e6536dcbf57940a4687_1770208990320_52902cc4.jpg';

const features = [
  {
    icon: Lock,
    title: 'Centralized Encryption',
    description: 'Encryption services that integrate seamlessly into existing payment flows.',
  },
  {
    icon: Key,
    title: 'Automated Key Lifecycle',
    description: 'Automated key lifecycle management without operational cost.',
  },
  {
    icon: Code,
    title: 'API-First Design',
    description: 'Clear documentation and predictable behaviour for developers.',
  },
  {
    icon: Shield,
    title: 'Access-Based Management',
    description: 'Access-based management of key requests and approval workflows.',
  },
];

const stats = [
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '500M+', label: 'Transactions Secured' },
  { value: '<10ms', label: 'Average Latency' },
  { value: '50+', label: 'Enterprise Clients' },
];

const trustedBy = [
  'FinTech Corp', 'PaySecure', 'GlobalBank', 'CryptoTrust', 'SecurePay', 'DataVault'
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-encrypt-dark">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-20 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-encrypt-blue/5 via-transparent to-encrypt-magenta/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-encrypt-blue/20 to-encrypt-magenta/20 rounded-full blur-3xl opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-gray-300">Now SOC 2 Type II Certified</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 animate-slide-in">
                Enterprise-Grade encryption for{' '}
                <span className="bg-gradient-to-r from-encrypt-blue to-encrypt-magenta bg-clip-text text-transparent">
                  modern payment systems at scale
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-400 mb-4 max-w-xl mx-auto lg:mx-0 animate-slide-in" style={{ animationDelay: '0.1s' }}>
                EncryptKey provides encryption-as-a-service for financial institutions and payment platforms operating in regulated, high-availability environments.
              </p>
              <p className="text-base lg:text-lg text-gray-500 mb-6 max-w-xl mx-auto lg:mx-0 animate-slide-in" style={{ animationDelay: '0.12s' }}>
                EncryptKey is purpose-built for institutions where cryptographic security is mission-critical and operational failure is not an option. It provides a centralized, policy-driven platform for encryption and key lifecycle management across ATM networks, payment processors, switches, and transaction platforms.
              </p>
              <p className="text-base lg:text-lg text-gray-500 mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-in" style={{ animationDelay: '0.14s' }}>
                By isolating cryptographic operations from application logic, EncryptKey removes encryption from day-to-day development concerns while strengthening institutional control. Keys are generated, distributed, accessed, and audited through controlled workflows backed by HSMs and role-based access. This reduces operational risk, simplifies regulatory compliance, and ensures sensitive payment data remains protected across internal systems, partner integrations, and third-party networks. 
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white text-lg px-8 py-6 shadow-lg shadow-encrypt-blue/25"
                  asChild
                >
                  <Link to="/contact">
                    Request integration details
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 text-lg px-8 py-6"
                  asChild
                >
                  <Link to="/documentation">
                    <Play className="w-5 h-5 mr-2" />
                    View Documentation
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-encrypt-blue/20">
                <img
                  src={heroImage}
                  alt="EncryptKey Security Visualization"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-encrypt-dark/80 via-transparent to-transparent" />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-gradient-to-br from-encrypt-blue to-encrypt-magenta p-0.5 animate-float">
                <div className="w-full h-full rounded-xl bg-encrypt-dark flex items-center justify-center">
                  <Shield className="w-8 h-8 text-encrypt-blue" />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-gradient-to-br from-encrypt-magenta to-encrypt-blue p-0.5 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-full h-full rounded-xl bg-encrypt-dark flex items-center justify-center">
                  <Key className="w-6 h-6 text-encrypt-magenta" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-encrypt-blue to-encrypt-magenta bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm uppercase tracking-wider mb-8">
            Trusted by leading financial institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {trustedBy.map((company, index) => (
              <div
                key={index}
                className="text-xl lg:text-2xl font-bold text-gray-600 hover:text-gray-400 transition-colors cursor-default"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
              Designed for security teams. Trusted by operations. Invisible to developers.
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Centralized encryption and key lifecycle management that integrates with your payment and transaction flows.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-encrypt-blue/50 transition-all duration-300 hover:bg-white/[0.04]"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-encrypt-blue/20 to-encrypt-magenta/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-encrypt-blue" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Value Prop Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-transparent via-encrypt-blue/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={featureImage}
                  alt="EncryptKey Platform"
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
                A security foundation that scales
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                EncryptKey centralizes encryption and key lifecycle management into a single, dedicated service that integrates seamlessly with existing payment and transaction flows. Rather than embedding cryptography into individual applications, organizations enforce security policies once and apply them consistently across systems reducing operational risk, simplifying regulatory compliance, and ensuring sensitive payment data remains protected.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Reduces operational risk and simplifies compliance',
                  'Ensures sensitive payment data remains protected',
                  'Scales with transaction volume and complexity',
                  'Without slowing down development teams'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-encrypt-blue mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className="bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white"
                asChild
              >
                <Link to="/features">
                  Explore All Features
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-encrypt-blue to-encrypt-magenta opacity-90" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            
            <div className="relative px-8 py-16 lg:px-16 lg:py-24 text-center">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
                Ready to secure your payment infrastructure?
              </h2>
              <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join leading financial institutions that trust EncryptKey for their encryption needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-encrypt-blue hover:bg-white/90 text-lg px-8 py-6"
                  asChild
                >
                  <Link to="/contact">
                    Request a Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
                  asChild
                >
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
