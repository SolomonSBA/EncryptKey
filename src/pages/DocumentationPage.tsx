import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, Code, Terminal, FileCode, Search,
  ChevronRight, Copy, Check, ArrowRight, Zap,
  Key, Lock, Shield, Server, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const docImage = 'https://d64gsuwffb70l.cloudfront.net/69833e6536dcbf57940a4687_1770209083185_a01fb72f.jpg';

const quickLinks = [
  { icon: Book, title: 'Getting Started', description: 'Learn the basics of EncryptKey', href: '#getting-started' },
  { icon: Key, title: 'Key Management', description: 'Create and manage encryption keys', href: '#key-management' },
  { icon: Lock, title: 'Encryption APIs', description: 'Encrypt and decrypt data', href: '#encryption' },
  { icon: Shield, title: 'Authentication', description: 'Secure your API requests', href: '#authentication' },
  { icon: Server, title: 'Webhooks', description: 'Real-time event notifications', href: '#webhooks' },
  { icon: RefreshCw, title: 'Key Rotation', description: 'Automated key lifecycle', href: '#rotation' },
];

const codeExamples = {
  curl: `curl -X POST https://api.encryptkey.io/v1/encrypt \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key_id": "key_abc123",
    "plaintext": "sensitive data",
    "algorithm": "AES-256-GCM"
  }'`,
  python: `import encryptkey

client = encryptkey.Client(api_key="YOUR_API_KEY")

# Encrypt data
response = client.encrypt(
    key_id="key_abc123",
    plaintext="sensitive data",
    algorithm="AES-256-GCM"
)

print(response.ciphertext)`,
  javascript: `import { EncryptKey } from '@encryptkey/sdk';

const client = new EncryptKey({
  apiKey: 'YOUR_API_KEY'
});

// Encrypt data
const response = await client.encrypt({
  keyId: 'key_abc123',
  plaintext: 'sensitive data',
  algorithm: 'AES-256-GCM'
});

console.log(response.ciphertext);`,
  go: `package main

import (
    "fmt"
    encryptkey "github.com/encryptkey/go-sdk"
)

func main() {
    client := encryptkey.NewClient("YOUR_API_KEY")
    
    response, err := client.Encrypt(&encryptkey.EncryptRequest{
        KeyID:     "key_abc123",
        Plaintext: "sensitive data",
        Algorithm: "AES-256-GCM",
    })
    
    fmt.Println(response.Ciphertext)
}`,
};

const apiEndpoints = [
  { method: 'POST', path: '/v1/keys', description: 'Create a new encryption key' },
  { method: 'GET', path: '/v1/keys', description: 'List all encryption keys' },
  { method: 'GET', path: '/v1/keys/:id', description: 'Get a specific key' },
  { method: 'DELETE', path: '/v1/keys/:id', description: 'Delete an encryption key' },
  { method: 'POST', path: '/v1/encrypt', description: 'Encrypt data' },
  { method: 'POST', path: '/v1/decrypt', description: 'Decrypt data' },
  { method: 'POST', path: '/v1/keys/:id/rotate', description: 'Rotate an encryption key' },
];

const DocumentationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('curl');

  const copyToClipboard = (code: string, lang: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(lang);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredEndpoints = apiEndpoints.filter(
    endpoint =>
      endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-encrypt-dark">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-encrypt-blue/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <Book className="w-4 h-4 text-encrypt-magenta" />
                <span className="text-sm text-gray-300">Documentation</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                APIs built for secure encryption and key management
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                EncryptKey provides clear, production-ready APIs designed for regulated payment environments. Integration patterns are consistent, responses are predictable, and security controls are enforced by design—allowing teams to integrate confidently without managing cryptography themselves.
              </p>
              
              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-encrypt-blue"
                />
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={docImage}
                  alt="EncryptKey Documentation"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 lg:py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Quick Start Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="group flex items-start gap-4 p-4 rounded-xl bg-encrypt-dark border border-white/5 hover:border-encrypt-blue/50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-encrypt-blue/20 to-encrypt-magenta/20 flex items-center justify-center flex-shrink-0">
                  <link.icon className="w-5 h-5 text-encrypt-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium mb-1 group-hover:text-encrypt-blue transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{link.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-encrypt-blue transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section id="getting-started" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Get started in minutes
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Integrate EncryptKey into your application with just a few lines of code
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start bg-white/5 border border-white/10 p-1 rounded-lg mb-4">
                <TabsTrigger
                  value="curl"
                  className="data-[state=active]:bg-encrypt-blue data-[state=active]:text-white text-gray-400"
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  cURL
                </TabsTrigger>
                <TabsTrigger
                  value="python"
                  className="data-[state=active]:bg-encrypt-blue data-[state=active]:text-white text-gray-400"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Python
                </TabsTrigger>
                <TabsTrigger
                  value="javascript"
                  className="data-[state=active]:bg-encrypt-blue data-[state=active]:text-white text-gray-400"
                >
                  <FileCode className="w-4 h-4 mr-2" />
                  JavaScript
                </TabsTrigger>
                <TabsTrigger
                  value="go"
                  className="data-[state=active]:bg-encrypt-blue data-[state=active]:text-white text-gray-400"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Go
                </TabsTrigger>
              </TabsList>
              
              {Object.entries(codeExamples).map(([lang, code]) => (
                <TabsContent key={lang} value={lang}>
                  <div className="relative rounded-xl bg-[#0d0d12] border border-white/10 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                      <span className="text-sm text-gray-400">Example: Encrypt Data</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(code, lang)}
                        className="text-gray-400 hover:text-white"
                      >
                        {copiedCode === lang ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm text-gray-300 font-mono">{code}</code>
                    </pre>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="encryption" className="py-20 lg:py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              API Reference
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Complete reference for all EncryptKey API endpoints
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl bg-encrypt-dark border border-white/10 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Filter endpoints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 text-sm"
                  />
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {filteredEndpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <span
                      className={`px-2 py-1 rounded text-xs font-mono font-medium ${
                        endpoint.method === 'GET'
                          ? 'bg-green-500/20 text-green-400'
                          : endpoint.method === 'POST'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-gray-300 font-mono text-sm">{endpoint.path}</code>
                    <span className="text-gray-500 text-sm ml-auto hidden sm:block">
                      {endpoint.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDKs Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Official SDKs
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Use our official SDKs for the best developer experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Python', version: 'v2.3.1', install: 'pip install encryptkey' },
              { name: 'JavaScript', version: 'v3.1.0', install: 'npm install @encryptkey/sdk' },
              { name: 'Go', version: 'v1.8.2', install: 'go get github.com/encryptkey/go-sdk' },
              { name: 'Ruby', version: 'v1.5.0', install: 'gem install encryptkey' },
            ].map((sdk, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-encrypt-blue/50 transition-all"
              >
                <h3 className="text-lg font-semibold text-white mb-1">{sdk.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{sdk.version}</p>
                <code className="block text-xs text-gray-400 bg-white/5 rounded px-3 py-2 font-mono">
                  {sdk.install}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-r from-encrypt-blue/10 to-encrypt-magenta/10 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Need help getting started?
          </h2>
          <p className="text-gray-400 mb-8">
            Our team is here to help you integrate EncryptKey into your application.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-encrypt-blue to-encrypt-magenta hover:opacity-90 text-white px-8"
              asChild
            >
              <Link to="/contact">
                Contact Support
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 px-8"
            >
              Join Discord Community
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DocumentationPage;
