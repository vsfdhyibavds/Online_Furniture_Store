import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqCategories = [
    'all',
    'Shipping & Delivery',
    'Returns & Refunds',
    'Products & Orders',
    'Warranty & Protection',
    'Technical Support',
    'Payments & Billing',
    'Account & Security',
  ];

  const allFaqs = [
    {
      category: 'Shipping & Delivery',
      items: [
        {
          q: 'What is your delivery timeframe?',
          a: 'Standard delivery is 5-10 business days. Express shipping (2-3 days) and white-glove delivery (5-7 days with assembly) are also available. Custom orders typically take 4-6 weeks. You can select your preferred shipping method at checkout.',
        },
        {
          q: 'Do you ship internationally?',
          a: 'Yes! We ship to 50+ countries worldwide. International shipping typically takes 15-30 business days depending on the destination. Additional duties and taxes may apply based on your country\'s customs regulations.',
        },
        {
          q: 'How do I track my order?',
          a: 'You can track your order in real-time from your account dashboard after it ships. We send tracking updates via email with carrier information and estimated delivery date.',
        },
        {
          q: 'Can I change my delivery address?',
          a: 'Yes, if your order hasn\'t shipped yet. Contact our support team immediately with your new address. Once an order ships, you\'ll need to arrange with the carrier to modify delivery.',
        },
        {
          q: 'What is your shipping cost?',
          a: 'Standard shipping is free for orders over $100. Orders under $100 have a flat $9.99 fee. Express and white-glove shipping rates are calculated at checkout based on distance and item weight.',
        },
        {
          q: 'Do you offer same-day or next-day delivery?',
          a: 'Same-day delivery is available in select metro areas. Next-day delivery is available in most US locations. Choose "Express" shipping at checkout to see availability for your area.',
        },
      ],
    },
    {
      category: 'Returns & Refunds',
      items: [
        {
          q: 'What is your return policy?',
          a: 'We offer a hassle-free 30-day return policy on all items in original condition. Simply initiate a return from your account dashboard. Items must be unused and in resalable condition.',
        },
        {
          q: 'How long does a refund take?',
          a: 'Refunds are processed within 5-10 business days after we receive your returned item. You\'ll receive an email confirmation once the refund is issued to your original payment method.',
        },
        {
          q: 'Do you cover return shipping?',
          a: 'For defective items or our mistake, we provide free return shipping. For standard returns, return shipping costs are the customer\'s responsibility. We provide a prepaid label for your convenience.',
        },
        {
          q: 'Can I return assembled furniture?',
          a: 'Items must be in original condition. If you need to return something assembled, contact us for special instructions. Restocking fees may apply based on item condition.',
        },
        {
          q: 'What if the item is damaged upon arrival?',
          a: 'Contact us immediately with photos of the damage. We\'ll arrange a replacement at no cost or provide a full refund. We cover all shipping costs for damaged items.',
        },
        {
          q: 'Can I exchange an item for a different size or color?',
          a: 'Yes! Exchanges are subject to availability. Return the original item and place a new order for the size/color you prefer. You may have to pay the difference if the new item costs more.',
        },
      ],
    },
    {
      category: 'Products & Orders',
      items: [
        {
          q: 'Are your products eco-friendly?',
          a: 'Many of our items are made from sustainable materials. Look for the "Eco-Friendly" badge on product pages. We\'re committed to environmentally responsible sourcing and transparent manufacturing.',
        },
        {
          q: 'Do you offer payment plans?',
          a: 'Yes! We offer flexible financing through our partners. For orders over $500, you can choose installment plans with 0% interest for 12 months (subject to credit approval).',
        },
        {
          q: 'Can I cancel an order?',
          a: 'Orders can be cancelled within 2 hours of placement for a full refund. After that, contact support immediately if it hasn\'t shipped yet. Once shipped, you\'ll need to process a return.',
        },
        {
          q: 'Do you have a physical showroom?',
          a: 'Yes! Visit us at 123 Furniture St, Design City, DC 12345. We\'re open Mon-Sat 10 AM-6 PM EST, Sun 12 PM-5 PM. You can see and feel our full collection in person.',
        },
        {
          q: 'Can I place a custom order?',
          a: 'Absolutely! We offer custom furniture with options for dimensions, fabrics, colors, and finishes. Custom orders take 4-6 weeks to complete. Contact our design team for consultation.',
        },
        {
          q: 'How do I know what size furniture will fit my space?',
          a: 'We provide detailed dimensions for every product. Use our virtual room planner tool on the website to visualize how furniture will look. You can also contact our design consultants for free advice.',
        },
      ],
    },
    {
      category: 'Warranty & Protection',
      items: [
        {
          q: 'What warranty do products come with?',
          a: 'Most furniture comes with a 1-year manufacturer\'s warranty covering defects in materials and workmanship. Check individual product pages for specific warranty details.',
        },
        {
          q: 'Do you offer extended warranties?',
          a: 'Yes, extended warranties and protection plans are available at checkout. These cover accidental damage, stains, tears, and can extend coverage up to 5 years for an additional fee.',
        },
        {
          q: 'How do I file a warranty claim?',
          a: 'Submit a warranty claim through your account dashboard with photos and a detailed description of the issue. Our team will review and guide you through the process within 48 hours.',
        },
        {
          q: 'What does the protection plan cover?',
          a: 'Protection plans cover accidental spills, stains, tears, rips, and manufacturing defects. They do NOT cover normal wear and tear or damage from improper use or care.',
        },
        {
          q: 'Can I add a protection plan after purchase?',
          a: 'Protection plans must be purchased within 30 days of your original order date. Contact our support team if you\'d like to add coverage to an existing order.',
        },
      ],
    },
    {
      category: 'Technical Support',
      items: [
        {
          q: 'I\'m having trouble placing an order',
          a: 'Try clearing your browser cache or using a different browser. Disable ad blockers and ensure JavaScript is enabled. If the issue persists, contact our technical support team via chat or email.',
        },
        {
          q: 'Is my personal information secure?',
          a: 'Yes! We use 256-bit SSL encryption and comply with PCI DSS standards. Your data is protected and never shared with third parties without your explicit consent.',
        },
        {
          q: 'Can I save items for later?',
          a: 'Absolutely! Add items to your Wishlist for easy access. You\'ll also receive notifications if wishlisted items go on sale or are back in stock.',
        },
        {
          q: 'Why can\'t I log into my account?',
          a: 'Check your email and password are correct. If you\'ve forgotten your password, use the "Forgot Password" link on the login page to reset it via email.',
        },
        {
          q: 'Can I download invoices and receipts?',
          a: 'Yes! View all your invoices and receipts in your account dashboard. You can download and print them for your records or tax purposes.',
        },
        {
          q: 'Does your site work on mobile devices?',
          a: 'Yes, our website is fully responsive and works on all smartphones and tablets. You can also download our mobile app from the App Store or Google Play for an optimized experience.',
        },
      ],
    },
    {
      category: 'Payments & Billing',
      items: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and financing options through Affirm and Klarna.',
        },
        {
          q: 'Is it safe to use my credit card on your site?',
          a: 'Absolutely! We use industry-leading security with 256-bit SSL encryption. All transactions are processed securely through PCI DSS compliant payment gateways.',
        },
        {
          q: 'Can I use multiple payment methods for one order?',
          a: 'Currently, we only allow one payment method per order. You can split your purchase across multiple orders if needed.',
        },
        {
          q: 'How can I update my billing information?',
          a: 'You can update your billing address and payment methods in your account settings at any time. Changes will apply to future orders.',
        },
        {
          q: 'Will I be charged sales tax?',
          a: 'Sales tax is calculated based on your shipping address. Tax rates vary by state and locality. Tax will be shown in your cart before checkout.',
        },
        {
          q: 'Do you offer discounts or coupon codes?',
          a: 'Yes! Check our Deals page for current promotions. We also offer email subscribers exclusive discounts and early access to sales. Use coupon codes at checkout to apply discounts.',
        },
      ],
    },
    {
      category: 'Account & Security',
      items: [
        {
          q: 'How do I create an account?',
          a: 'Click "Sign Up" on our homepage or during checkout. Enter your email, create a password, and fill in your basic information. You\'ll receive a confirmation email to verify your account.',
        },
        {
          q: 'Can I place an order without creating an account?',
          a: 'Yes! You can checkout as a guest. However, creating an account allows you to track orders, save addresses, and access your order history easily.',
        },
        {
          q: 'What information do you collect and how is it used?',
          a: 'We collect information necessary for orders, shipping, and customer service. We never sell your data to third parties. Read our Privacy Policy for complete details on data usage and protection.',
        },
        {
          q: 'How do I delete my account?',
          a: 'You can request account deletion through your account settings or by contacting our support team. We\'ll securely remove your personal data within 30 days (order history is retained for legal compliance).',
        },
        {
          q: 'How can I unsubscribe from email marketing?',
          a: 'Click the "Unsubscribe" link at the bottom of any marketing email. You\'ll be removed from our mailing list within 24 hours.',
        },
        {
          q: 'What should I do if I suspect fraudulent activity?',
          a: 'Contact us immediately at support@furnstore.com or call +1 (555) 123-4567. We\'ll investigate and help protect your account. You can also contact your payment provider to dispute any unauthorized charges.',
        },
      ],
    },
  ];

  const filteredFaqs = selectedCategory === 'all'
    ? allFaqs
    : allFaqs.filter(cat => cat.category === selectedCategory);

  const searchResults = searchQuery.trim() === ''
    ? filteredFaqs
    : filteredFaqs.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(cat => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3">Help Center</h1>
          <p className="text-blue-100 text-lg mb-8">Find answers to your questions</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {faqCategories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                {cat === 'all' ? 'All Questions' : cat}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        {searchResults.length > 0 ? (
          <div className="space-y-10">
            {searchResults.map((category) => (
              <div key={category.category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="h-1 w-8 bg-blue-600 rounded"></div>
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.items.map((faq, idx) => (
                    <Card
                      key={idx}
                      className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer"
                      onClick={() => setExpandedFaq(expandedFaq === `${category.category}-${idx}` ? null : `${category.category}-${idx}`)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-base leading-relaxed">{faq.q}</h4>
                            {expandedFaq === `${category.category}-${idx}` && (
                              <p className="text-gray-600 mt-4 leading-relaxed">{faq.a}</p>
                            )}
                          </div>
                          <ChevronDown
                            className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                              expandedFaq === `${category.category}-${idx}` ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">We couldn't find any FAQs matching your search. Try different keywords or browse by category.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Still Need Help */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-12 text-center border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Didn't find what you're looking for?</h3>
          <p className="text-gray-600 mb-6 text-lg">Our customer support team is here to help</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="lg">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
