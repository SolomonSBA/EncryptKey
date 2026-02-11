import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Lock, Key, Server, Code, Zap, 
  ArrowRight, CheckCircle, Settings, Database,
  RefreshCw, FileCode, Users, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import featureImage1 from '@/assets/Image1.jpg';
import featureImage2 from '@/assets/Image2.jpg';
import featureImage3 from '@/assets/Image3.jpg';
import featureImage4 from '@/assets/featureImage.jpg';

const mainFeatures = [
  {
    icon: Lock,
    title: 'Centralized Encryption Services',
    description: 'Centralized encryption services that integrate seamlessly into existing payment flows. Consolidate all cryptographic operations into a single, secure service layer.',
    image: featureImage1,
    benefits: [
      'Single point of encryption management',
      'Consistent security policies across all systems',
      'Reduced attack surface',
      'Simplified audit trails'
    ]
  },
  {
    icon: RefreshCw,
    title: 'Automated Key Lifecycle Management',
    description: 'Automated key lifecycle management without operational cost. From generation to rotation to retirement, every key is managed automatically.',
    image: featureImage2,
    benefits: [
      'Automatic key rotation schedules',
      'Zero-downtime key updates',
      'Compliance-ready key archival',
      'Hardware security module integration'
    ]
  },
  {
    icon: FileCode,
    title: 'API-First Design',
    description: 'API-first design with clear documentation and predictable behaviour. Built by developers, for developers.',
    image: featureImage3,
    benefits: [
      'RESTful and gRPC interfaces',
      'Comprehensive SDK support',
      'Idempotent operations',
      'Detailed error responses'
    ]
  },
  {
    icon: Users,
    title: 'Access-Based Management',
    description: 'Access-based management of key requests and approval workflows. Fine-grained permissions ensure the right people have the right access.',
    image: featureImage4,
    benefits: [
      'Role-based access control',
      'Multi-level approval workflows',
      'Audit logging for all operations',
      'Integration with identity providers'
    ]
  },
];

const additionalFeatures = [
  {
    icon: Shield,
    title: 'End-to-End Encryption',
    description: 'Protect data in transit and at rest with industry-standard encryption algorithms.'
  },
  {
    icon: Database,
    title: 'Secure Key Storage',
    description: 'Keys are stored in FIPS 140-2 Level 3 certified hardware security modules.'
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Sub-10ms latency for cryptographic operations at any scale.'
  },
  {
    icon: Eye,
    title: 'Real-Time Monitoring',
    description: 'Monitor all cryptographic operations with detailed metrics and alerts.'
  },
  {
    icon: Settings,
    title: 'Custom Policies',
    description: 'Define custom encryption policies tailored to your compliance requirements.'
  },
  {
    icon: Server,
    title: 'Multi-Region Support',
    description: 'Deploy across multiple regions for data residency and disaster recovery.'
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-encrypt-dark">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-encrypt-blue/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-encrypt-magenta" />
            <span className="text-sm text-white/90">Enterprise Features</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Designed for security teams. Trusted by operations. Invisible to developers.
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-8">
            EncryptKey centralizes encryption and key management into a single, dedicated service that integrates seamlessly with existing payment and transaction flows.
          </p>
          
          <p className="text-lg text-white/85 max-w-4xl mx-auto mb-8">
            Rather than embedding cryptography into individual applications, organizations enforce security policies once and apply them consistently across systems. Key lifecycles generation, approval, assignment, access, and loading are automated and governed through controlled workflows, eliminating manual handling and reducing operational overhead. Every action is logged, auditable, and aligned with regulatory expectations for dual control and segregation of duties. An API-first architecture ensures predictable behaviour and clean integration with payment platforms, switches, and processing environments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white px-8"
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
              className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 px-8"
              asChild
            >
              <Link to="/documentation">View Documentation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24 lg:space-y-32">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-encrypt-blue/20 to-encrypt-magenta/20 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-encrypt-blue" />
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-white/90 mb-8">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-encrypt-magenta flex-shrink-0" />
                        <span className="text-white/90">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    asChild
                  >
                    <Link to="/documentation">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                    <img
                      src={feature.image}
                      alt={feature.title}
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

      {/* Additional Features Grid */}
      <section className="py-20 lg:py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              And much more
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Everything you need to secure your payment infrastructure
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-6 lg:p-8 rounded-2xl bg-encrypt-dark border border-white/5 hover:border-encrypt-blue/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-encrypt-blue/20 to-encrypt-magenta/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-encrypt-blue" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            See how EncryptKey can transform your security infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white px-8"
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
              className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 px-8"
              asChild
            >
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
