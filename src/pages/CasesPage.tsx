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
import caseImage1 from '@/assets/Image1.jpg';
import caseImage2 from '@/assets/Image2.jpg';
import caseImage3 from '@/assets/Image3.jpg';

const useCases = [
  {
    icon: CreditCard,
    title: 'Centralised key management for card issuance and PIN operations.',
    description: 'Banks upgrading card management systems including Postillion, Base24, and similar platforms  require encryption keys to be managed independently of the application layer. EncryptKey provides a governed, auditable key management service that integrates into your existing card and PIN infrastructure without requiring application-level cryptographic changes.',
    image: caseImage1,
    benefits: [
      'Key generation, assignment, and loading governed through controlled workflows',
      'Dual control and segregation of duties enforced by policy, not by process',
      'Integrates with Postillion PostCard DB, HSMs, and PIN processing environments',
      'Test and production environments provisioned and mirrored independently'
    ],
    stats: [
      { value: '< 5ms', label: 'Key Load Time' },
      { value: 'Zero', label: 'Manual Handling' },
      { value: 'Full', label: 'HSM Compatibility' }
    ]
  },
  {
    icon: Server,
    title: 'Consistent key governance across switches, acquirers, and processors.',
    description: 'Payment switches and processing environments operate across multiple nodes, partners, and acquiring relationships each with its own encryption boundary. EncryptKey enforces a single key management policy across all of them, eliminating the inconsistency that creates compliance gaps and breach exposure.',
    image: caseImage2,
    benefits: [
      'Single policy applied across all transaction nodes and partner integrations',
      'Complete key audit trail from generation to destruction regulator ready',
      'Structured key zoning: separate key domains per environment, partner, and channel',
      'ISO 8583 compatible no disruption to existing transaction message flows'
    ],
    stats: [
      { value: 'One', label: 'Policy Across All Environments' },
      { value: 'Full', label: 'Audit Trail Per Key Lifecycle' },
      { value: 'Zero', label: 'Key sprawl' }
    ]
  },
  {
    icon: FileCheck,
    title: 'Audit Ready Key Management, Built For PCI DSS And CBN Requirements.',
    description: 'Regulatory examiners and PCI QSAs require demonstrable evidence that cryptographic keys are generated, stored, distributed, and destroyed under controlled, documented conditions. EncryptKey produces that evidence automatically every action logged, every workflow enforced, every key state accounted for.',
    image: caseImage3,
    benefits: [
      'Automated audit logs structured for PCI DSS 4.0, ISO 27001, and CBN Guidelines',
      'Dual control workflows eliminate reliance on manual procedures or policy documents',
      'Key custodian roles enforced in the system not left to spreadsheets and ceremony',
      'One-click QSA audit package export evidence compiled automatically'
    ],
    stats: [
      { value: 'PCI DSS 4.0', label: 'Aligned' },
      { value: 'ISO 27001', label: 'Aligned' },
      { value: 'CBN', label: 'Compliant Ready' }
    ]
  },
];

const industries = [
  { icon: Building2, name: 'Issuing Banks', description: 'Card key management, PIN generation, and HSM integration for card issuance programmes operating at scale.' },
  { icon: CreditCard, name: 'Payment Processors', description: 'Key governance across switching environments, acquirers, and ISO 8583 transaction flows under one policy.' },
  { icon: Globe, name: 'Commercial Banks', description: 'Centralised key policy for retail banking channels ATM, POS, mobile, and online from a single governed platform.' },
  { icon: Users, name: 'Payment Switches', description: 'Managed key zones for multi-party switching, interbank settlement flows, and partner-level key isolation.' },
];

const CasesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-encrypt-page">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-encrypt-magenta/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6">
            <Shield className="w-4 h-4 text-encrypt-magenta" />
            <span className="text-sm text-gray-300">Use Cases</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Encryption key management for every layer of your payment infrastructure.
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From card issuance to transaction switching, EncryptKey centralises key lifecycle management across your entire payment stack  without rewriting a single application.
          </p>
        </div>
      </section>

      {/* Main Value Prop */}
      <section className="py-16 lg:py-20 border-y border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              By centralising key lifecycle management into a dedicated, governed platform, EncryptKey removes the need for individual teams to design, implement, and maintain cryptographic key logic within each application. Key policies are enforced uniformly across card systems, processing environments, and partner integrations reducing operational risk and eliminating manual handling.
            </p>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mt-6">
              Operational teams gain complete audit visibility through controlled access workflows, while security teams retain oversight without becoming bottlenecks. Payment systems continue to run at full velocity  without direct exposure to key material or cryptographic complexity.
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
                  
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {useCase.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {useCase.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {useCase.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-encrypt-magenta flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-border">
                    {useCase.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-encrypt-blue to-encrypt-magenta bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-border bg-white/[0.02]">
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
      <section className="py-20 lg:py-32 bg-white/[0.02] border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Built For Payment Infrastructure. Not Adapted For It.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              EncryptKey is purpose built for environments where key management failure is not recoverable payment switches, card management systems, acquiring platforms, and core banking integrations. It is not a general purpose security tool retrofitted for financial services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card border border-border hover:border-encrypt-blue/50 transition-all text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-encrypt-blue/20 to-encrypt-magenta/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <industry.icon className="w-7 h-7 text-encrypt-blue" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{industry.name}</h3>
                <p className="text-muted-foreground text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 lg:p-12 rounded-2xl bg-gradient-to-r from-encrypt-blue/10 to-encrypt-magenta/10 border border-border">
            <div className="absolute top-6 left-8 text-6xl text-encrypt-blue/30 font-serif">"</div>
            <blockquote className="relative z-10">
              <p className="text-xl lg:text-2xl text-foreground leading-relaxed mb-6">
                "Financial institutions using EncryptKey eliminate manual key handling ceremonies replacing them with automated, policy enforced workflows that satisfy PCI DSS dual control requirements on day one."
              </p>
              <footer className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-encrypt-blue to-encrypt-magenta flex items-center justify-center text-white font-bold">
                  {/* Head of Cards & Payment Infrastructure  */}
                </div>
                <div>
                  <div className="text-foreground font-medium">Commercial Bank</div>
                  {/* <div className="text-muted-foreground text-sm">CTO, SecurePay Inc.</div> */}
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
                Ready to integrate?
              </h2>
              <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join leading payment institutions that trust EncryptKey to govern their encryption key infrastructure.
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
                  className="w-full sm:w-auto border-white/30 text-encrypt-blue hover:bg-white/10 text-lg px-8 py-6"
                  asChild
                >
                  <Link to="/contact">Get in Touch</Link>
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
