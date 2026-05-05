import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

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
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-96 overflow-hidden">
                <img
                    src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1400"
                    alt="Contact us"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-4xl font-bold mb-3">Get in Touch</h1>
                        <p className="text-lg text-gray-200">
                            We're here to help. Reach out anytime.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Details */}
                        <div>
                            <h2 className="text-3xl font-bold mb-10">Contact Information</h2>
                            <div className="space-y-8">
                                {contactInfo.map((info) => {
                                    const Icon = info.icon;
                                    return (
                                        <div key={info.label} className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Icon className="h-6 w-6 text-gray-900" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{info.label}</h3>
                                                <p className="text-gray-600 mt-1">{info.value}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Showroom Image */}
                        <img
                            src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="FurnStore showroom"
                            className="rounded-lg w-full h-96 object-cover shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: 'What is your delivery timeframe?',
                                a: 'Most orders are delivered within 5-10 business days. Custom orders may take 4-6 weeks.',
                            },
                            {
                                q: 'Do you offer returns?',
                                a: 'Yes, we offer a 30-day return policy on all items in original condition.',
                            },
                            {
                                q: 'Do you have a physical showroom?',
                                a: 'Yes! Visit us at 123 Furniture St, Design City to see and feel our collection in person.',
                            },
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
