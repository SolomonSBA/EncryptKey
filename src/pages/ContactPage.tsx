import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Clock, Send,
  MessageSquare, Calendar, ArrowRight, Check,
  Building2, Globe, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'info@sterlingprobiotranx.co.uk',
    description: 'Send us an email anytime'
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+234 (0) 807 739 4817',
    description: 'Mon-Fri from 9am to 6pm GMT '
  },
  {
    icon: MapPin,
    title: 'Office',
    value: 'Suite G04, 1 Quality Court, Chancery Lane',
    description: 'London WC2A 1HR United Kingdom.'
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Within 24 hours',
    description: 'For all inquiries'
  },
];

const reasons = [
  { value: 'demo', label: 'Request a Demo' },
  { value: 'pricing', label: 'Pricing Inquiry' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'other', label: 'Other' },
];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    reason: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormSubmitted(true);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-encrypt-dark">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-encrypt-blue/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <MessageSquare className="w-4 h-4 text-encrypt-magenta" />
            <span className="text-sm text-gray-300">Get in Touch</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Leave us a message
          </h1>
          <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto">
            Let's discuss how EncryptKey can support your security and compliance goals
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 lg:py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-encrypt-dark border border-white/5 hover:border-encrypt-blue/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-encrypt-blue/20 to-encrypt-magenta/20 flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-encrypt-blue" />
                </div>
                <h3 className="text-white font-medium mb-1">{info.title}</h3>
                <p className="text-encrypt-blue font-medium mb-1">{info.value}</p>
                <p className="text-gray-500 text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <div className="order-2 lg:order-1">
              <div className="p-8 lg:p-10 rounded-2xl bg-white/[0.02] border border-white/10">
                {formSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-encrypt-blue/20 to-encrypt-magenta/20 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-encrypt-blue" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                    <p className="text-gray-400 mb-6">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          firstName: '',
                          lastName: '',
                          email: '',
                          company: '',
                          reason: '',
                          message: ''
                        });
                      }}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/5"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-encrypt-blue"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-encrypt-blue"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-encrypt-blue"
                        placeholder="info@sterlingprobiotranx.co.uk"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company" className="text-gray-300">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-encrypt-blue"
                        placeholder="Company Inc."
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="reason" className="text-gray-300">Reason for Contact</Label>
                      <Select
                        value={formData.reason}
                        onValueChange={(value) => handleInputChange('reason', value)}
                      >
                        <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent className="bg-encrypt-dark border-white/10">
                          {reasons.map((reason) => (
                            <SelectItem
                              key={reason.value}
                              value={reason.value}
                              className="text-white hover:bg-white/5 focus:bg-white/5"
                            >
                              {reason.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-gray-300">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-encrypt-blue min-h-[150px]"
                        placeholder="Tell us about your project and security requirements..."
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white py-6"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
            
            {/* Info */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Let's start a conversation
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                Whether you're looking to secure your payment infrastructure, simplify compliance, or explore enterprise solutions, our team is here to help.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-encrypt-blue/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-encrypt-blue" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Schedule a Demo</h3>
                    <p className="text-gray-400 text-sm">
                      Book a personalized demo with our team to see EncryptKey in action.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-encrypt-magenta/20 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-encrypt-magenta" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Enterprise Solutions</h3>
                    <p className="text-gray-400 text-sm">
                      Custom integrations, dedicated support, and tailored security solutions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-encrypt-blue/20 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-encrypt-blue" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Global Support</h3>
                    <p className="text-gray-400 text-sm">
                      24/7 support available for enterprise customers worldwide.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Trust Badges */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-gray-500 text-sm mb-4">Trusted by industry leaders</p>
                <div className="flex flex-wrap items-center gap-4">
                  {['SOC 2', 'PCI DSS', 'GDPR', 'ISO 27001'].map((badge, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
                    >
                      <Shield className="w-4 h-4 text-encrypt-blue" />
                      <span className="text-white text-sm font-medium">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map / Office Section */}
      <section className="py-20 lg:py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Visit our office
            </h2>
            <p className="text-gray-400">
              We'd love to meet you in person
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[400px] bg-gradient-to-br from-encrypt-blue/10 to-encrypt-magenta/10 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-encrypt-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Global HQ</h3>
              <p className="text-gray-400">Suite G04, 1 Quality Court, Chancery Lane,</p>
              <p className="text-gray-400">London WC2A 1HR United Kingdom.</p>
              <Button
                className="mt-6 bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white"
                onClick={() => window.open('https://maps.google.com', '_blank')}
              >
                Get Directions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
