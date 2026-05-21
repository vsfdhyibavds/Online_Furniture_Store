import React, { useState } from 'react';
import { Truck, MapPin, Clock, AlertCircle, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export function ShippingInfoPage() {
  const [selectedMethod, setSelectedMethod] = useState('standard');

  const shippingMethods = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      time: '5-10 business days',
      cost: 'FREE on orders over $100',
      description: 'Reliable delivery for your furniture',
      details: [
        'Free on orders over $100',
        'Usually arrives within 5-10 business days',
        'Tracking provided via email',
        'Insurance included',
      ],
    },
    {
      id: 'express',
      name: 'Express Shipping',
      time: '2-3 business days',
      cost: '$49.99',
      description: 'Fast delivery when you need it',
      details: [
        'Arrives in 2-3 business days',
        'Priority handling',
        'Real-time tracking',
        'Full insurance included',
        'Signature required',
      ],
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      time: '1 business day',
      cost: '$99.99',
      description: 'Next-day delivery for urgent orders',
      details: [
        'Overnight delivery',
        'Premium white-glove service',
        'Real-time GPS tracking',
        'Maximum insurance',
        'Signature required',
      ],
    },
  ];

  const shippingRegions = [
    {
      region: 'Continental US',
      coverage: '48 states',
      status: 'Available',
    },
    {
      region: 'Alaska & Hawaii',
      coverage: 'Special rates apply',
      status: 'Available',
    },
    {
      region: 'Canada',
      coverage: 'Selected items only',
      status: 'Limited',
    },
    {
      region: 'International',
      coverage: 'Custom quotes',
      status: 'Request Quote',
    },
  ];

  const shippingProcess = [
    {
      step: 1,
      title: 'Order Confirmed',
      description: 'Your order is confirmed and payment is processed',
      icon: Check,
    },
    {
      step: 2,
      title: 'Preparation',
      description: 'Items are carefully packed and prepared for shipment (1-2 days)',
      icon: Truck,
    },
    {
      step: 3,
      title: 'In Transit',
      description: 'Your package is on its way. Track it anytime with your tracking number',
      icon: MapPin,
    },
    {
      step: 4,
      title: 'Delivery',
      description: 'Your furniture arrives safe and sound. Assembly support available',
      icon: Check,
    },
  ];

  const faqs = [
    {
      q: 'When will my furniture be delivered?',
      a: 'Delivery times depend on your shipping method: Standard (5-10 days), Express (2-3 days), or Overnight. Orders typically ship within 1-2 business days.',
    },
    {
      q: 'Is my furniture insured during shipping?',
      a: 'Yes! All shipments include full insurance coverage at no additional cost. If damage occurs, we will replace or refund your order.',
    },
    {
      q: 'Can I change my shipping address?',
      a: 'You can modify your address up to 24 hours after placing your order. Contact our support team immediately if needed.',
    },
    {
      q: 'What if my furniture is damaged?',
      a: 'If you receive damaged furniture, photograph the damage and contact us within 48 hours. We will arrange a replacement or full refund.',
    },
    {
      q: 'Do you offer white-glove delivery?',
      a: 'Yes! White-glove delivery is available with Express and Overnight shipping options. This includes assembly and placement assistance.',
    },
    {
      q: 'Are there shipping restrictions?',
      a: 'We ship to most addresses in the Continental US, with special rates for Alaska, Hawaii, and Canada. International shipping available on request.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Shipping Information</h1>
          </div>
          <p className="text-blue-100 text-lg">Fast, reliable delivery to your door</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Shipping Methods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Shipping Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingMethods.map(method => (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? 'border-blue-500 border-2 shadow-lg'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <span>{method.name}</span>
                    <Truck className="h-5 w-5 text-blue-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Delivery Time</p>
                    <p className="text-lg font-semibold text-gray-900">{method.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="text-lg font-semibold text-green-600">{method.cost}</p>
                  </div>
                  <ul className="space-y-2">
                    {method.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Shipping Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {shippingProcess.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex flex-col">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
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

        {/* Shipping Regions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Shipping Regions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shippingRegions.map(item => (
              <Card key={item.region} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.region}</h3>
                      <p className="text-sm text-gray-600">{item.coverage}</p>
                    </div>
                    <Badge variant={item.status === 'Available' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                    <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-blue-100 mb-6">Start browsing our premium furniture collection</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
