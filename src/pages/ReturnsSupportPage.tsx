import React, { useState } from 'react';
import { RotateCcw, Shield, Package, CheckCircle2, Clock, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export function ReturnsSupportPage() {
  const [activeTab, setActiveTab] = useState('returns');

  const returnProcess = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Go to your order in the dashboard and click "Return Items". Select items and reason for return.',
      icon: Package,
    },
    {
      step: 2,
      title: 'Get Return Label',
      description: 'Receive prepaid return shipping label via email. Print it and attach to your package.',
      icon: FileText,
    },
    {
      step: 3,
      title: 'Ship Back',
      description: 'Drop off your package at any carrier location. We\'ll send tracking updates via email.',
      icon: Package,
    },
    {
      step: 4,
      title: 'We Inspect',
      description: 'Once received, our team inspects the items within 3-5 business days.',
      icon: CheckCircle2,
    },
    {
      step: 5,
      title: 'Refund Processed',
      description: 'After inspection, your refund is issued. It appears in your account within 5-10 business days.',
      icon: CheckCircle2,
    },
  ];

  const returnReasons = [
    {
      reason: 'Not as described',
      coverage: 'Full refund including return shipping',
      timeline: '5-10 business days',
    },
    {
      reason: 'Damaged upon arrival',
      coverage: 'Full refund including return shipping',
      timeline: '5-10 business days',
    },
    {
      reason: 'Wrong item sent',
      coverage: 'Full refund including return shipping',
      timeline: '5-10 business days',
    },
    {
      reason: 'Changed mind',
      coverage: 'Full refund, customer pays shipping',
      timeline: '5-10 business days',
    },
    {
      reason: 'Quality issue',
      coverage: 'Full refund including return shipping',
      timeline: '5-10 business days',
    },
    {
      reason: 'Doesn\'t fit space',
      coverage: 'Full refund, customer pays shipping',
      timeline: '5-10 business days',
    },
  ];

  const warrantyOptions = [
    {
      name: 'Standard Warranty',
      duration: '1 Year',
      price: 'Included',
      coverage: [
        'Manufacturing defects',
        'Material defects',
        'Workmanship defects',
        'Structural issues',
      ],
      notCovered: [
        'Normal wear and tear',
        'Stains and spills',
        'Tears or rips',
        'Accidents',
      ],
    },
    {
      name: 'Premium Protection',
      duration: '3 Years',
      price: '5-15% of item price',
      coverage: [
        'All standard warranty items',
        'Accidental spills and stains',
        'Tears, rips, and damage',
        'Furniture repairs',
        'Free replacement if unfixable',
      ],
      notCovered: [
        'Normal wear and tear',
        'Intentional damage',
        'Improper care',
        'Cosmetic issues only',
      ],
    },
    {
      name: 'Ultimate Assurance',
      duration: '5 Years',
      price: '10-20% of item price',
      coverage: [
        'All premium items',
        'Extended coverage period',
        'Priority repairs',
        'Free shipping on replacements',
        'Annual professional cleaning',
      ],
      notCovered: [
        'Loss or theft',
        'Misuse',
        'Natural disasters',
      ],
    },
  ];

  const faqReturns = [
    {
      q: 'How long do I have to return an item?',
      a: 'You have 30 days from delivery date to initiate a return. Items must be returned within 60 days of purchase.',
    },
    {
      q: 'Can I return assembled furniture?',
      a: 'Items must be in original condition. If assembled, we may apply a restocking fee (up to 15%) depending on condition.',
    },
    {
      q: 'What items cannot be returned?',
      a: 'Custom orders, clearance items, and final sale items cannot be returned. Check the product page for return eligibility.',
    },
    {
      q: 'Do I get free return shipping?',
      a: 'We cover return shipping for defective items or our mistakes. For other returns, customers pay shipping (we provide label).',
    },
    {
      q: 'How do I track my return?',
      a: 'Use your return tracking number to monitor your package. You can also check status in your account dashboard.',
    },
    {
      q: 'What if the item is damaged during return?',
      a: 'We always recommend using insurance and proper packaging. If damage occurs during transit, contact us immediately with photos.',
    },
  ];

  const warrantyFaqs = [
    {
      q: 'What does warranty cover?',
      a: 'Standard warranty covers manufacturing defects, material issues, and workmanship problems for 1 year. It does not cover normal wear, stains, or accidents.',
    },
    {
      q: 'How do I file a warranty claim?',
      a: 'Go to your account, select the item, and click "File Warranty Claim". Provide photos and description. Claims are reviewed within 48 hours.',
    },
    {
      q: 'Can I add warranty after purchase?',
      a: 'Extended warranties must be purchased within 30 days of order. Contact support if you want to add coverage to an existing order.',
    },
    {
      q: 'What is the difference between warranties?',
      a: 'Standard covers only defects. Premium adds accidental damage and stains. Ultimate includes priority service and professional cleaning.',
    },
    {
      q: 'How long does warranty processing take?',
      a: 'Simple repairs take 2-4 weeks. If item needs replacement, expect 4-6 weeks for delivery.',
    },
    {
      q: 'Do warranties transfer to new owners?',
      a: 'Standard warranty does not transfer. Premium and Ultimate plans can transfer for a $50 fee if registered to new owner within 30 days.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3">Returns & Warranty Center</h1>
          <p className="text-green-100 text-lg">Shop with confidence. Easy returns and comprehensive protection.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {[
            { id: 'returns', label: 'Returns Process', icon: RotateCcw },
            { id: 'warranty', label: 'Warranty Options', icon: Shield },
          ].map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-900 border border-gray-200 hover:border-green-300'
                }`}
              >
                <TabIcon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Returns Tab */}
        {activeTab === 'returns' && (
          <>
            {/* Return Policy Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">30-Day Returns</h3>
                  <p className="text-gray-600 text-sm">Full refund if you change your mind within 30 days of delivery</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <RotateCcw className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Easy Process</h3>
                  <p className="text-gray-600 text-sm">Simple 5-step process. Start return from your dashboard.</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Free Return Shipping</h3>
                  <p className="text-gray-600 text-sm">We cover shipping for defects. Prepaid labels for all returns.</p>
                </CardContent>
              </Card>
            </div>

            {/* Return Process Steps */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">How Returns Work</h2>
              <div className="relative">
                <div className="space-y-6">
                  {returnProcess.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.step} className="flex gap-6">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                            {step.step}
                          </div>
                          {idx < returnProcess.length - 1 && (
                            <div className="w-1 h-16 bg-green-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <h3 className="font-bold text-lg text-gray-900 mb-1">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Return Reasons Table */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Return Coverage by Reason</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-green-50 border-b-2 border-green-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold text-gray-900">Reason for Return</th>
                      <th className="px-6 py-4 text-left font-bold text-gray-900">Our Coverage</th>
                      <th className="px-6 py-4 text-left font-bold text-gray-900">Refund Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnReasons.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{item.reason}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {item.coverage}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{item.timeline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Returns FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Returns FAQs</h2>
              <div className="space-y-4">
                {faqReturns.map((faq, idx) => (
                  <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                      <p className="text-gray-600">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Warranty Tab */}
        {activeTab === 'warranty' && (
          <>
            {/* Warranty Comparison */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Choose Your Warranty Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {warrantyOptions.map((plan, idx) => (
                  <Card key={idx} className={`border-0 shadow-lg overflow-hidden ${idx === 1 ? 'ring-2 ring-green-600 transform md:scale-105' : ''}`}>
                    {idx === 1 && (
                      <div className="bg-green-600 text-white py-2 text-center font-bold text-sm">
                        MOST POPULAR
                      </div>
                    )}
                    <CardHeader className="bg-gray-50">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-3xl font-bold text-gray-900">{plan.duration}</span>
                        <span className="text-sm text-gray-600">{plan.price}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          Covers:
                        </h4>
                        <ul className="space-y-2">
                          {plan.coverage.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-green-600 font-bold mt-0.5">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-6 pb-6 border-b">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-red-600" />
                          Not Covered:
                        </h4>
                        <ul className="space-y-2">
                          {plan.notCovered.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-xs text-gray-600 flex items-start gap-2">
                              <span className="text-gray-400 mt-1">−</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button className={`w-full ${idx === 1 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}>
                        Choose Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Warranty FAQs */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Warranty FAQs</h2>
              <div className="space-y-4">
                {warrantyFaqs.map((faq, idx) => (
                  <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                      <p className="text-gray-600">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Claim Process */}
            <section className="bg-green-50 rounded-lg p-8 border border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">File a Warranty Claim</h2>
              <p className="text-gray-700 mb-6">It's easy to get support when something goes wrong:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <Badge className="bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">1</Badge>
                  <div>
                    <h4 className="font-bold text-gray-900">Log into your account</h4>
                    <p className="text-sm text-gray-600">Go to your order history and find the item</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Badge className="bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">2</Badge>
                  <div>
                    <h4 className="font-bold text-gray-900">Click "Warranty Claim"</h4>
                    <p className="text-sm text-gray-600">Describe the issue and select warranty coverage</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Badge className="bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">3</Badge>
                  <div>
                    <h4 className="font-bold text-gray-900">Upload photos</h4>
                    <p className="text-sm text-gray-600">Send clear images of the issue (2-5 photos)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Badge className="bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">4</Badge>
                  <div>
                    <h4 className="font-bold text-gray-900">Submit & we'll follow up</h4>
                    <p className="text-sm text-gray-600">We review claims within 48 hours</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-12 text-center border border-green-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to shop with confidence?</h3>
          <p className="text-gray-600 mb-6 text-lg">Browse our collection knowing you're fully protected</p>
          <Button className="bg-green-600 hover:bg-green-700 text-white" size="lg">
            Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
