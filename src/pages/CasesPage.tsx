import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Lock, CreditCard, FileCheck, 
  ArrowRight, CheckCircle, Building2, Globe,
  Server, Users, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const caseImage1 = 'https://d64gsuwffb70l.cloudfront.net/69833e6536dcbf57940a4687_1770208973207_788aabe8.jpg';
const caseImage2 = 'https://d64gsuwffb70l.cloudfront.net/69833e6536dcbf57940a4687_1770208974818_b3a9c478.jpg';
const caseImage3 = 'https://d64gsuwffb70l.cloudfront.net/69833e6536dcbf57940a4687_1770209009764_98afa103.jpg';

const useCases = [
  {
    icon: CreditCard,
    title: 'Securing Payment APIs',
    description: 'Protect sensitive payment data with enterprise-Grade encryption across all your API endpoints.',
    image: caseImage1,
    benefits: [
      'End-to-end encryption for card data',
      'Tokenization for recurring payments',
      'PCI DSS compliance automation',
      'Real-time fraud detection integration'
    ],
    stats: [
      { value: '99.99%', label: 'Uptime' },
      { value: '<5ms', label: 'Latency' },
      { value: '0', label: 'Data Breaches' }
    ]
  },
  {
    icon: Server,
    title: 'Protecting sensitive data across distributed systems',
    description: 'Ensure sensitive transaction data remains protected across internal systems, partner integrations, and third-party networks.',
    image: caseImage2,
    benefits: [
      'Cross-system encryption consistency',
      'Secure data sharing with partners',
      'Audit trails for all transactions',
      'Automated compliance reporting'
    ],
    stats: [
      { value: '500M+', label: 'Transactions/Day' },
      { value: '50+', label: 'Integrations' },
      { value: '100%', label: 'Compliance' }
    ]
  },
  {
    icon: FileCheck,
    title: 'Simplifying PCI and regulatory compliance',
    description: 'Reduce PCI DSS scope and simplify compliance with centralized encryption and key management.',
    image: caseImage3,
    benefits: [
      'Reduced PCI scope by 80%',
      'Automated compliance documentation',
      'Continuous monitoring and alerts',
      'Expert compliance support'
    ],
    stats: [
      { value: '80%', label: 'Scope Reduction' },
      { value: '60%', label: 'Cost Savings' },
      { value: '2 weeks', label: 'Audit Time' }
    ]
  },
];

const industries = [
  { icon: Building2, name: 'Financial Services', description: 'Banks, credit unions, and investment firms' },
  { icon: CreditCard, name: 'Payment Processors', description: 'PSPs, acquirers, and payment gateways' },
  { icon: Globe, name: 'E-Commerce', description: 'Online retailers and marketplaces' },
  { icon: Users, name: 'Healthcare', description: 'HIPAA-compliant data protection' },
];

const CasesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-encrypt-dark">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-encrypt-magenta/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Shield className="w-4 h-4 text-encrypt-magenta" />
            <span className="text-sm text-gray-300">Use Cases</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Use cases
          </h1>
          <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
            EncryptKey enables organizations to enforce consistent cryptographic controls without slowing down operations or development velocity.
          </p>
        </div>
      </section>

      {/* Main Value Prop */}
      <section className="py-16 lg:py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
              By centralizing encryption and key lifecycle management into a dedicated platform, EncryptKey removes the need for individual teams to design, implement, and maintain cryptographic logic within each application. Security policies are applied uniformly across payment systems, processing environments, and partner integrations, reducing inconsistency and human error.
            </p>
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mt-6">
              Operational teams gain confidence through clear audit trails and controlled access, while security teams retain oversight without becoming bottlenecks. Developers continue to build and deploy at speed, without direct exposure to sensitive key material or cryptographic complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24 lg:space-y-32">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-encrypt-blue/20 to-encrypt-magenta/20 flex items-center justify-center mb-6">
                    <useCase.icon className="w-7 h-7 text-encrypt-blue" />
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    {useCase.title}
                  </h2>
                  <p className="text-lg text-gray-400 mb-8">
                    {useCase.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {useCase.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-encrypt-magenta flex-shrink-0" />
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    {useCase.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-encrypt-blue to-encrypt-magenta bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                    <img
                      src={useCase.image}
                      alt={useCase.title}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-encrypt-dark/50 via-transparent to-transparent" />
                  </div>
                  {/* Decorative gradient */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-encrypt-blue/20 to-encrypt-magenta/20 rounded-3xl blur-2xl -z-10 opacity-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 lg:py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Trusted across industries
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              From financial services to healthcare, organizations trust EncryptKey for their encryption needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-encrypt-dark border border-white/5 hover:border-encrypt-blue/50 transition-all text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-encrypt-blue/20 to-encrypt-magenta/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <industry.icon className="w-7 h-7 text-encrypt-blue" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{industry.name}</h3>
                <p className="text-gray-500 text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 lg:p-12 rounded-2xl bg-gradient-to-r from-encrypt-blue/10 to-encrypt-magenta/10 border border-white/10">
            <div className="absolute top-6 left-8 text-6xl text-encrypt-blue/30 font-serif">"</div>
            <blockquote className="relative z-10">
              <p className="text-xl lg:text-2xl text-white leading-relaxed mb-6">
                EncryptKey transformed how we handle payment security. What used to take our team weeks to implement now takes hours, and we have complete confidence in our compliance posture.
              </p>
              <footer className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-encrypt-blue to-encrypt-magenta flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <div className="text-white font-medium">James Davidson</div>
                  <div className="text-gray-500 text-sm">CTO, SecurePay Inc.</div>
                </div>
              </footer>
            </blockquote>
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
                Ready to secure your infrastructure?
              </h2>
              <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join leading organizations that trust EncryptKey for their encryption needs.
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

export default CasesPage;
