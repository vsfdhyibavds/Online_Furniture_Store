import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Headphones, AlertCircle, CheckCircle2, Zap, MessageCircle, Users, Camera, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'support@furnstore.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Furniture St, Design City, DC 12345',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Sat 9am–7pm EST',
  },
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const supportChannels = [
    {
      icon: Mail,
      label: 'Email Support',
      value: 'support@furnstore.com',
      responseTime: '24 hours',
      description: 'For detailed inquiries',
    },
    {
      icon: Phone,
      label: 'Phone Support',
      value: '+1 (555) 123-4567',
      responseTime: 'Immediate',
      description: 'Live phone support',
    },
    {
      icon: MessageCircle,
      label: 'Live Chat',
      value: 'Available Now',
      responseTime: '2-5 minutes',
      description: 'Quick answers anytime',
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      value: '+1 (555) 234-5678',
      responseTime: '15 minutes',
      description: 'Chat support',
    },
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM EST' },
    { day: 'Saturday', hours: '10:00 AM - 5:00 PM EST' },
    { day: 'Sunday', hours: 'Closed' },
    { day: 'Holidays', hours: 'By appointment' },
  ];

  const faqs = [
    {
      category: 'Shipping & Delivery',
      items: [
        {
          q: 'What is your delivery timeframe?',
          a: 'Standard delivery is 5-10 business days. Express shipping (2-3 days) and white-glove delivery (5-7 days with assembly) are also available. Custom orders typically take 4-6 weeks.',
        },
        {
          q: 'Do you ship internationally?',
          a: 'Yes! We ship to 50+ countries. International shipping typically takes 15-30 business days depending on the destination. Additional duties and taxes may apply.',
        },
        {
          q: 'How do I track my order?',
          a: 'You can track your order in real-time from your dashboard after it ships. We send tracking updates via email with carrier information.',
        },
        {
          q: 'Can I change my delivery address?',
          a: 'Yes, if your order hasn\'t shipped yet. Contact our support team immediately with your new address.',
        },
      ],
    },
    {
      category: 'Returns & Refunds',
      items: [
        {
          q: 'What is your return policy?',
          a: 'We offer a hassle-free 30-day return policy on all items in original condition. Simply initiate a return from your account dashboard for a full refund.',
        },
        {
          q: 'How long does a refund take?',
          a: 'Refunds are processed within 5-10 business days after we receive your returned item. You\'ll receive an email confirmation once the refund is issued.',
        },
        {
          q: 'Do you cover return shipping?',
          a: 'For defective items, we provide free return shipping. For standard returns, return shipping costs are the customer\'s responsibility.',
        },
        {
          q: 'Can I return assembled furniture?',
          a: 'Items must be in original condition. If you need to return something assembled, contact us for special instructions—restocking fees may apply.',
        },
      ],
    },
    {
      category: 'Products & Orders',
      items: [
        {
          q: 'Are your products eco-friendly?',
          a: 'Many of our items are made from sustainable materials. Look for the "Eco-Friendly" badge on product pages. We\'re committed to environmentally responsible sourcing.',
        },
        {
          q: 'Do you offer payment plans?',
          a: 'Yes! We offer flexible financing through our partners. For orders over $500, you can choose installment plans with 0% interest for 12 months.',
        },
        {
          q: 'Can I cancel an order?',
          a: 'Orders can be cancelled within 2 hours of placement. After that, contact support immediately if it hasn\'t shipped yet.',
        },
        {
          q: 'Do you have a physical showroom?',
          a: 'Yes! Visit us at 123 Furniture St, Design City, DC 12345. We\'re open Mon-Sat 10 AM-6 PM EST. You can see and feel our full collection in person.',
        },
      ],
    },
    {
      category: 'Warranty & Protection',
      items: [
        {
          q: 'What warranty do products come with?',
          a: 'Most furniture comes with a 1-year manufacturer\'s warranty covering defects in materials and workmanship. Check individual product pages for specific details.',
        },
        {
          q: 'Do you offer extended warranties?',
          a: 'Yes, extended warranties and protection plans are available at checkout. These cover accidental damage, stains, and can extend coverage up to 5 years.',
        },
        {
          q: 'How do I file a warranty claim?',
          a: 'Submit a warranty claim through your account dashboard with photos and a description of the issue. Our team will review and guide you through the process.',
        },
      ],
    },
    {
      category: 'Technical Support',
      items: [
        {
          q: 'I\'m having trouble placing an order',
          a: 'Try clearing your browser cache or using a different browser. If the issue persists, contact our technical support team via chat or email.',
        },
        {
          q: 'Is my personal information secure?',
          a: 'Yes! We use 256-bit SSL encryption and comply with PCI DSS standards. Your data is protected and never shared with third parties without consent.',
        },
        {
          q: 'Can I save items for later?',
          a: 'Absolutely! Add items to your Wishlist for easy access. You\'ll also receive notifications if wishlisted items go on sale.',
        },
      ],
    },
  ];

  const socialLinks = [
    { icon: Users, label: 'Facebook', url: '#' },
    { icon: Camera, label: 'Instagram', url: '#' },
    { icon: MessageCircle, label: 'Twitter', url: '#' },
    { icon: Building, label: 'LinkedIn', url: '#' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Contact us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-3">Get in Touch</h1>
            <p className="text-lg text-gray-200">
              We're here to help 24/7. Reach out via your preferred channel.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Support Channels */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-2 text-center">Multiple Ways to Reach Us</h2>
          <p className="text-gray-600 text-center mb-12 text-lg">Choose the communication channel that works best for you</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <Card key={channel.label} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{channel.label}</h3>
                    <p className="text-gray-600 text-sm mb-3">{channel.description}</p>
                    <div className="mb-4">
                      <p className="font-mono text-blue-600 font-semibold text-sm">{channel.value}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        {channel.responseTime}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Business Hours & Info */}
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hours */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {businessHours.map((info) => (
                  <div key={info.day} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <span className="font-medium text-gray-900">{info.day}</span>
                    <span className={`text-sm font-semibold ${info.hours === 'Closed' ? 'text-red-600' : 'text-green-600'}`}>
                      {info.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong>Emergency Support:</strong> For urgent issues outside business hours, call our emergency line. Critical issues are handled 24/7.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Location & Social */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Physical Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Main Showroom</h4>
                    <p className="text-gray-600">123 Furniture St<br />Design City, DC 12345</p>
                  </div>
                  <Button className="w-full" onClick={() => window.open('https://maps.google.com')}>
                    View on Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5" />
                  Follow Us
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-4">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        title={link.label}
                      >
                        <Icon className="h-5 w-5 text-gray-700" />
                      </a>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-600 mt-4 text-center">
                  Daily updates, design tips & exclusive offers
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-20">
          <Card className="border-0 shadow-lg max-w-2xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Send Us a Message
              </CardTitle>
              <p className="text-blue-100 text-sm mt-2">We'll get back to you within 24 hours</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Inquiry Type</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="order">Order Issue</option>
                    <option value="return">Return/Refund</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Message</label>
                  <textarea
                    placeholder="Tell us how we can help..."
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Expanded FAQ */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-2 text-center">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-center mb-12 text-lg">Find answers to common questions organized by topic</p>

          <div className="space-y-8">
            {faqs.map((category) => (
              <div key={category.category}>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="h-1 w-8 bg-blue-600 rounded"></div>
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.items.map((faq, idx) => (
                    <Card
                      key={idx}
                      className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setExpandedFaq(expandedFaq === `${category.category}-${idx}` ? null : `${category.category}-${idx}`)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-base">{faq.q}</h4>
                            {expandedFaq === `${category.category}-${idx}` && (
                              <p className="text-gray-600 mt-3 leading-relaxed">{faq.a}</p>
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className={`mt-1 transition-transform ${expandedFaq === `${category.category}-${idx}` ? 'rotate-180' : ''}`}
                          >
                            +
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg text-blue-100 mb-8">Our support team is ready to assist you. Chat with us now!</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button className="bg-white text-blue-600 hover:bg-gray-100" size="lg">
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Live Chat
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Phone className="mr-2 h-5 w-5" />
              Call Us Now
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
