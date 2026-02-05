import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, X, ArrowRight, Zap, Shield, 
  Building2, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const pricingPlans = [
  {
    name: 'Starter',
    description: 'For small teams getting started with encryption',
    monthlyPrice: 499,
    yearlyPrice: 399,
    features: [
      { name: 'Up to 1M API calls/month', included: true },
      { name: '5 encryption keys', included: true },
      { name: 'Basic key rotation', included: true },
      { name: 'Email support', included: true },
      { name: 'Standard SLA (99.9%)', included: true },
      { name: 'Single region', included: true },
      { name: 'Custom policies', included: false },
      { name: 'HSM integration', included: false },
      { name: 'Dedicated support', included: false },
      { name: 'Custom integrations', included: false },
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'For growing businesses with advanced needs',
    monthlyPrice: 1499,
    yearlyPrice: 1199,
    features: [
      { name: 'Up to 10M API calls/month', included: true },
      { name: '50 encryption keys', included: true },
      { name: 'Automated key rotation', included: true },
      { name: 'Priority email & chat support', included: true },
      { name: 'Enhanced SLA (99.95%)', included: true },
      { name: 'Multi-region deployment', included: true },
      { name: 'Custom policies', included: true },
      { name: 'HSM integration', included: true },
      { name: 'Dedicated support', included: false },
      { name: 'Custom integrations', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with custom requirements',
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      { name: 'Unlimited API calls', included: true },
      { name: 'Unlimited encryption keys', included: true },
      { name: 'Advanced key lifecycle', included: true },
      { name: '24/7 phone & email support', included: true },
      { name: 'Enterprise SLA (99.99%)', included: true },
      { name: 'Global deployment', included: true },
      { name: 'Custom policies', included: true },
      { name: 'HSM integration', included: true },
      { name: 'Dedicated support engineer', included: true },
      { name: 'Custom integrations', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  {
    question: 'What happens when I exceed my API call limit?',
    answer: 'We\'ll notify you when you reach 80% of your limit. If you exceed it, additional calls are billed at a per-call rate. You can also upgrade your plan at any time.'
  },
  {
    question: 'Can I switch plans at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any differences.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, ACH transfers, and wire transfers for enterprise customers.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, all plans come with a 14-day free trial. No credit card required to start.'
  },
  {
    question: 'What compliance certifications do you have?',
    answer: 'EncryptKey is SOC 2 Type II certified, PCI DSS compliant, and GDPR ready. Enterprise plans include additional compliance support.'
  },
];

const PricingPage: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setDemoDialogOpen(false);
      setFormSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-encrypt-dark">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-encrypt-magenta/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-encrypt-magenta" />
            <span className="text-sm text-gray-300">Simple, transparent pricing</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Flexible pricing designed to scale
          </h1>
          <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
            EncryptKey pricing is structured to reflect transaction scale, security posture, and operational complexity—ensuring institutions pay for infrastructure that grows with their environment, not per-feature tooling.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-encrypt-blue"
            />
            <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-500'}`}>
              Yearly
              <span className="ml-2 px-2 py-0.5 rounded-full bg-encrypt-magenta/20 text-encrypt-magenta text-xs">
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-encrypt-blue/10 to-encrypt-magenta/10 border-2 border-encrypt-blue'
                    : 'bg-white/[0.02] border border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-encrypt-blue to-encrypt-magenta text-white text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>
                
                <div className="mb-6">
                  {plan.monthlyPrice ? (
                    <>
                      <span className="text-4xl font-bold text-white">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-400">/month</span>
                      {isYearly && (
                        <p className="text-sm text-gray-500 mt-1">
                          Billed annually (${plan.yearlyPrice! * 12}/year)
                        </p>
                      )}
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-white">Custom</span>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-encrypt-blue flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {plan.monthlyPrice ? (
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                    asChild
                  >
                    <Link to="/contact">{plan.cta}</Link>
                  </Button>
                ) : (
                  <Dialog open={demoDialogOpen} onOpenChange={setDemoDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-white/10 hover:bg-white/20 text-white">
                        {plan.cta}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-encrypt-dark border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle>Contact Sales</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Fill out the form below and our team will get back to you within 24 hours.
                        </DialogDescription>
                      </DialogHeader>
                      {formSubmitted ? (
                        <div className="py-8 text-center">
                          <div className="w-16 h-16 rounded-full bg-encrypt-blue/20 flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-encrypt-blue" />
                          </div>
                          <p className="text-white font-medium">Thank you! We'll be in touch soon.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleDemoSubmit} className="space-y-4">
                          <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="bg-white/5 border-white/10 text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="bg-white/5 border-white/10 text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="company">Company</Label>
                            <Input
                              id="company"
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              className="bg-white/5 border-white/10 text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="message">Message (Optional)</Label>
                            <Textarea
                              id="message"
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className="bg-white/5 border-white/10 text-white"
                              rows={3}
                            />
                          </div>
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white"
                          >
                            Submit Request
                          </Button>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="py-20 lg:py-24 bg-[#ff66c4]/10 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Want to get started? Request a Demo
          </h2>
          <p className="text-gray-400 mb-8">
            Schedule a demo to see the EncryptKey platform in action.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white px-8"
            asChild
          >
            <Link to="/contact">
              Schedule Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Frequently asked questions
            </h2>
            <p className="text-gray-400">
              Everything you need to know about pricing and billing
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-encrypt-blue" />
                  {faq.question}
                </h3>
                <p className="text-gray-400 pl-7">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              asChild
            >
              <Link to="/contact">Contact our sales team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;
