import React, { useState } from 'react';
import { Shield, Clock, CheckCircle2, AlertCircle, Wrench, Heart, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export function WarrantyPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const warrantyPlans = [
    {
      name: 'Standard Warranty',
      duration: '1 Year',
      price: 'Included',
      coverage: [
        'Manufacturing defects',
        'Structural damage',
        'Fabric/leather tears',
        'Frame issues',
        'Hardware failure',
      ],
      exclusions: [
        'Normal wear and tear',
        'Accidental damage',
        'Misuse or neglect',
        'Color fading',
      ],
    },
    {
      name: 'Extended Protection',
      duration: '3 Years',
      price: '5% of purchase price',
      coverage: [
        'Everything in Standard',
        'Accidental spills & stains',
        'Accidental tears',
        'Hardware replacement',
        'Free repairs up to $500/year',
      ],
      exclusions: [
        'Extreme damage',
        'Modification',
        'Professional cleaning',
      ],
    },
    {
      name: 'Premium Care',
      duration: '5 Years',
      price: '10% of purchase price',
      coverage: [
        'Everything in Extended',
        'Unlimited repairs',
        'Professional cleaning (2x/year)',
        'Replacement parts',
        'Priority support',
        'In-home assessment',
      ],
      exclusions: [
        'Complete replacement after 3 years',
      ],
    },
  ];

  const productCategories = [
    {
      category: 'Sofas & Sectionals',
      duration: '1 Year',
      coverage: 'Frame, springs, cushion filling defects',
      icon: Shield,
    },
    {
      category: 'Beds & Mattresses',
      duration: '5 Years',
      coverage: 'Sagging, springs, comfort issues',
      icon: Heart,
    },
    {
      category: 'Dining & Chairs',
      duration: '2 Years',
      coverage: 'Joints, legs, hardware',
      icon: Wrench,
    },
    {
      category: 'Tables & Storage',
      duration: '1 Year',
      coverage: 'Finishes, joints, hardware',
      icon: FileText,
    },
  ];

  const claimProcess = [
    {
      step: 1,
      title: 'Report Issue',
      description: 'Contact us with details and photos of the issue within the warranty period',
      icon: FileText,
    },
    {
      step: 2,
      title: 'Assessment',
      description: 'Our team reviews your claim and determines if it qualifies for coverage',
      icon: Shield,
    },
    {
      step: 3,
      title: 'Solution',
      description: 'We arrange repair or replacement at no cost to you',
      icon: Wrench,
    },
    {
      step: 4,
      title: 'Resolution',
      description: 'Issue is resolved and you receive follow-up support',
      icon: CheckCircle2,
    },
  ];

  const faqs = [
    {
      q: 'What does the standard warranty cover?',
      a: 'The standard 1-year warranty covers manufacturing defects including frame issues, structural damage, springs, cushioning problems, and hardware failures. It does not cover normal wear and tear or accidental damage.',
    },
    {
      q: 'Can I extend my warranty after purchase?',
      a: 'Yes! You can add Extended Protection or Premium Care coverage up to 30 days after your purchase. Contact customer service for details.',
    },
    {
      q: 'What is not covered by warranty?',
      a: 'Warranty does not cover: normal wear and tear, accidental damage (unless Extended/Premium), color fading, water damage, pet damage, or damage from misuse or neglect.',
    },
    {
      q: 'How do I file a warranty claim?',
      a: 'Contact our support team with photos and description of the issue. Include your order number and purchase date. We typically respond within 24 hours.',
    },
    {
      q: 'How long does warranty repair take?',
      a: 'Most repairs are completed within 5-10 business days. Express repairs available for an additional fee. We provide a timeline when claim is approved.',
    },
    {
      q: 'What if my furniture cannot be repaired?',
      a: 'If the item cannot be repaired and is under warranty, we will replace it free of charge or provide a full refund, depending on your preference.',
    },
    {
      q: 'Does warranty cover professional cleaning?',
      a: 'Professional cleaning is covered under Premium Care plans (included 2x per year). Standard and Extended plans do not include cleaning services.',
    },
    {
      q: 'Can I transfer my warranty to another owner?',
      a: 'Transferable warranties are available with premium plans. Standard warranties are non-transferable. Check your plan details for specifics.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Warranty & Protection</h1>
          </div>
          <p className="text-purple-100 text-lg">Protect your investment with our comprehensive warranties</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Warranty Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Choose Your Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {warrantyPlans.map((plan, idx) => (
              <Card key={idx} className={`border-0 shadow-lg ${idx === 1 ? 'border-2 border-purple-500 md:scale-105' : ''}`}>
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{plan.duration} Coverage</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-1">Cost</p>
                    <p className="text-2xl font-bold text-purple-600">{plan.price}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Covered:</h4>
                    <ul className="space-y-2">
                      {plan.coverage.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Not Covered:</h4>
                    <ul className="space-y-2">
                      {plan.exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <AlertCircle className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full">
                    Choose {plan.name === 'Standard Warranty' ? 'Included' : 'Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Product Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">By Product Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productCategories.map(item => {
              const Icon = item.icon;
              return (
                <Card key={item.category} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100">
                        <Icon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.category}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.coverage}</p>
                        <Badge>{item.duration} Warranty</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Claim Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">How to File a Claim</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {claimProcess.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex flex-col">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mx-auto mb-4">
                    <Icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center">
                    Step {item.step}: {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-start gap-2">
                    <Shield className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
          <p className="text-purple-100 mb-6">Contact our warranty specialists for assistance</p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Contact Support
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
