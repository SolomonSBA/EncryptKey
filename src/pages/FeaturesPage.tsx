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
    title: 'Centralised Encryption Key Management',
    description: 'One governed platform manages the full encryption key lifecycle across every system in your payment stack. Individual applications no longer own or store key material. EncryptKey enforces cryptographic policy once and applies it consistently across card systems, switches, processors, and partner integrations.',
    image: featureImage1,
    benefits: [
      'Single key management policy across all payment systems',
      'No key material stored or managed at the application layer',
      'Reduced attack surface cryptographic operations consolidated',
      'Consistent security posture across all channels and partners'
    ]
  },
  {
    icon: RefreshCw,
    title: 'Automated Key Lifecycle Management',
    description: 'Every stage of the key lifecycle generation, approval, assignment, access, loading, rotation, and retirement is governed through controlled, automated workflows. Manual key handling is eliminated entirely, removing the operational risk and human error that regulators flag most often during audits.',
    image: featureImage2,
    benefits: [
      'Automated rotation schedules policy-triggered, zero downtime',
      'Compliance ready key archival with verifiable chain of custody',
      'Hardware Security Module (HSM) integration FIPS 140-2 Level 3',
      'Certified key destruction with timestamped, regulator-ready evidence'
    ]
  },
  {
    icon: FileCode,
    title: 'Clean Integration with Payment Infrastructure',
    description: 'An API-first architecture ensures EncryptKey connects cleanly with existing payment platforms, card management systems, and processing environments without requiring system re-architecture. Integration is designed for institutions that need predictable behaviour and full operational control from day one.',
    image: featureImage3,
    benefits: [
      'REST and gRPC interfaces integrates with Postillion, Base24, and switching environments',
      'Separate test and production environments provisioned independently',
      'Predictable, consistent behaviour no side effects on live transaction flows',
      'Comprehensive SDK and detailed API documentation for operations teams'
    ]
  },
  {
    icon: Users,
    title: 'Role Based Access & Approval Workflows',
    description: 'Key management operations are governed by role-based access control with multi-level approval workflows built in. Custodian responsibilities are enforced by the system not dependent on staff adherence to written procedures ensuring segregation of duties is structurally maintained at all times.',
    image: featureImage4,
    benefits: [
      'Role based access custodian A and B permissions enforced by the platform',
      'Multi-level approval workflows aligned to dual control requirements',
      'Immutable audit log every operation, every role, every timestamp',
      'Identity provider integration SSO, LDAP, and Active Directory support'
    ]
  },
];

const additionalFeatures = [
  {
    icon: Shield,
    title: 'FIPS 140-2 Key Storage',
    description: 'Encryption keys stored exclusively in FIPS 140-2 Level 3 certified hardware security modules never in software or application memory.'
  },
  {
    icon: Database,
    title: 'Sub-10ms Key Operations',
    description: 'Key loading and cryptographic operations complete in under 10ms  no latency impact on live transaction throughput or card authorisation flows.'
  },
  {
    icon: Zap,
    title: 'One-Click Audit Export',
    description: 'Complete PCI DSS, ISO 27001, and CBN audit evidence compiled automatically and exported in formats accepted by QSAs and regulatory examiners.'
  },
  {
    icon: Eye,
    title: 'Real-Time Monitoring',
    description: 'Live visibility into key state, lifecycle stage, and usage patterns with automated alerts for anomalies, expiry thresholds, and policy violations.'
  },
  {
    icon: Settings,
    title: 'Institution Specific Key Policies',
    description: 'Define custom key management policies per environment, per partner, and per regulatory requirement applied consistently without manual enforcement.'
  },
  {
    icon: Server,
    title: 'Multi-Region Deployment',
    description: 'Deploy across multiple regions for data residency compliance, disaster recovery, and continuous availability required for Tier-1 banking operations.'
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-encrypt-page">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-encrypt-blue/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6">
            <Zap className="w-4 h-4 text-encrypt-magenta" />
            <span className="text-sm text-muted-foreground">Enterprise Features</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
             Built For Payment Operations. Trusted By Compliance.
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
            EncryptKey centralises encryption key management into a single, governed service that integrates seamlessly with existing card systems, payment switches, and transaction processing environments.
          </p>
          
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
          Key lifecycles generation, approval, assignment, access, and loading  are automated through controlled workflows, eliminating manual handling. Every action is logged, auditable, and aligned with regulatory expectations for dual control and segregation of duties.
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
              className="w-full sm:w-auto border-border text-foreground hover:bg-muted px-8"
              asChild
            >
              <Link to="/contact">Get in Touch</Link>
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
                  
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-encrypt-magenta flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant="outline"
                    className="border-border text-foreground hover:bg-muted"
                    asChild
                  >
                    <Link to="/contact">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
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
      <section className="py-20 lg:py-32 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              And Much More
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to govern encryption key infrastructure across your payment environment
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-encrypt-blue/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-encrypt-blue/20 to-encrypt-magenta/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-encrypt-blue" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
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
              className="w-full sm:w-auto border-border text-foreground hover:bg-muted px-8"
              asChild
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
