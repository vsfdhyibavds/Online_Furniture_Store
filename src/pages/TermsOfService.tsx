import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, AlertCircle, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function TermsOfService() {
    const navigate = useNavigate();
    const [now, setNow] = useState(new Date());
    const [activeSection, setActiveSection] = useState('intro');

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const sections = [
        { id: 'intro', label: 'Introduction', icon: FileText },
        { id: 'acceptance', label: 'Acceptance of Terms', icon: Check },
        { id: 'products', label: 'Products & Services', icon: FileText },
        { id: 'orders', label: 'Orders & Payments', icon: FileText },
        { id: 'shipping', label: 'Shipping & Delivery', icon: FileText },
        { id: 'returns', label: 'Returns & Refunds', icon: FileText },
        { id: 'warranty', label: 'Warranty & Liability', icon: AlertCircle },
        { id: 'conduct', label: 'User Conduct', icon: FileText },
        { id: 'intellectual', label: 'Intellectual Property', icon: FileText },
        { id: 'limitation', label: 'Limitation of Liability', icon: AlertCircle },
        { id: 'changes', label: 'Changes to Terms', icon: FileText },
        { id: 'contact', label: 'Contact & Legal', icon: FileText },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                    <h1 className="text-5xl font-bold mb-3">Terms of Service</h1>
                    <p className="text-amber-100 text-lg">Please read these terms carefully</p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-6 bg-white rounded-lg shadow-lg p-6">
                            <h3 className="font-bold text-lg mb-4 text-gray-900">Contents</h3>
                            <nav className="space-y-2">
                                {sections.map(section => {
                                    const Icon = section.icon;
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                                                activeSection === section.id
                                                    ? 'bg-amber-100 text-amber-700 font-semibold'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span className="text-sm">{section.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3 bg-white rounded-lg shadow-lg p-8 space-y-8">
                        {/* Last Updated */}
                        <div className="border-b pb-6">
                            <p className="text-gray-700">
                                <strong>Last Updated:</strong> July 4, 2025<br />
                                <span className="text-sm text-gray-500">Current Timestamp: {now.toLocaleString()}</span>
                            </p>
                        </div>

                        {/* Introduction */}
                        {activeSection === 'intro' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    These Terms of Service ("Terms") govern your access to and use of the FurnStore website, mobile applications, and all related services (collectively, the "Services"). Please read these Terms carefully before using our Services.
                                </p>
                                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                                    <p className="text-amber-900">
                                        <strong>Important:</strong> By accessing and using FurnStore Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use our Services.
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Acceptance of Terms */}
                        {activeSection === 'acceptance' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Acceptance of Terms</h2>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Age Requirement</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        You must be at least 18 years old to create an account and make purchases. By using FurnStore, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into a binding agreement.
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Binding Agreement</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        Your use of the Services constitutes acceptance of these Terms and our Privacy Policy. We reserve the right to modify these Terms at any time. Continued use of the Services after modifications indicates your acceptance of the updated Terms.
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>License Grant</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        We grant you a limited, non-exclusive, non-transferable license to access and use the Services for personal, non-commercial purposes in compliance with these Terms.
                                    </CardContent>
                                </Card>
                            </section>
                        )}

                        {/* Products & Services */}
                        {activeSection === 'products' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Products & Services</h2>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Product Descriptions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-gray-700">
                                        <p>• We strive for accuracy in all product descriptions, specifications, and pricing</p>
                                        <p>• However, we do not warrant that descriptions are completely accurate, current, or error-free</p>
                                        <p>• Colors and dimensions may vary slightly due to monitor settings and natural variations</p>
                                        <p>• Product availability is subject to change without notice</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Pricing & Availability</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-gray-700">
                                        <p>• All prices are in USD unless otherwise specified</p>
                                        <p>• Prices are subject to change without notice</p>
                                        <p>• We reserve the right to limit quantities and cancel orders</p>
                                        <p>• Prices do not include applicable taxes or shipping costs</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Service Modifications</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        We reserve the right to modify, suspend, or discontinue any portion of the Services at any time with or without notice.
                                    </CardContent>
                                </Card>
                            </section>
                        )}

                        {/* Orders & Payments */}
                        {activeSection === 'orders' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Orders & Payments</h2>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Order Placement</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-gray-700">
                                        <p>• All orders are subject to acceptance and availability</p>
                                        <p>• We reserve the right to refuse or cancel any order</p>
                                        <p>• Order confirmation is sent via email upon successful payment</p>
                                        <p>• You are responsible for providing accurate contact and shipping information</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Payment Methods & Authorization</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-gray-700">
                                        <p>• We accept major credit cards, debit cards, and other payment methods as indicated</p>
                                        <p>• By placing an order, you authorize us to charge your payment method</p>
                                        <p>• You are responsible for maintaining accurate payment information</p>
                                        <p>• Payment may be declined for security reasons or due to insufficient funds</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Billing Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        You agree to provide true, accurate, current, and complete billing information. You are responsible for notifying us of any changes to your billing information.
                                    </CardContent>
                                </Card>
                            </section>
                        )}

                        {/* Shipping & Delivery */}
                        {activeSection === 'shipping' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Shipping & Delivery</h2>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Delivery Times</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-gray-700">
                                        <p>• Estimated delivery times are provided for convenience only and are not guarantees</p>
                                        <p>• Delivery may be delayed due to unforeseen circumstances</p>
                                        <p>• Risk of loss transfers to you upon delivery</p>
                                        <p>• You are responsible for inspecting furniture upon delivery</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Shipping Costs & Special Delivery</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-gray-700">
                                        <p>• Shipping costs are calculated and displayed at checkout</p>
                                        <p>• Additional fees may apply for special delivery requests (white-glove service, specific time windows)</p>
                                        <p>• International shipping may be subject to customs duties and additional fees</p>
                                    </CardContent>
                                </Card>

                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                    <p className="text-blue-900">
                                        <strong>Delivery Inspection:</strong> Upon receiving your furniture, please inspect it thoroughly. Report any damage or defects within 48 hours for proper resolution.
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Returns & Refunds */}
                        {activeSection === 'returns' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Returns & Refunds</h2>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>30-Day Return Policy</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-gray-700">
                                        <p>• Most items can be returned within 30 days of purchase</p>
                                        <p>• Items must be in original condition with all original packaging and documentation</p>
                                        <p>• Custom or made-to-order items are generally non-returnable</p>
                                        <p>• Clearance items are final sale and cannot be returned</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Refund Processing</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-gray-700">
                                        <p>• Refunds are processed within 7-10 business days of receiving returned items</p>
                                        <p>• Original shipping fees are non-refundable</p>
                                        <p>• Return shipping costs are the responsibility of the customer</p>
                                        <p>• Restocking fees (up to 20%) may apply for certain items</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Damaged or Defective Items</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        If you receive damaged or defective items, contact our customer service team immediately. We will arrange a replacement or refund at no cost to you.
                                    </CardContent>
                                </Card>
                            </section>
                        )}

                        {/* Warranty & Liability */}
                        {activeSection === 'warranty' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Warranty & Liability</h2>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Manufacturer's Warranty</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        Many products come with manufacturer warranties. Specific warranty terms vary by product. Please refer to the product documentation or contact us for warranty details.
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Disclaimer of Warranties</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-gray-700">
                                        <p>• The Services are provided "as is" without warranties of any kind</p>
                                        <p>• We disclaim all implied warranties including merchantability and fitness for a particular purpose</p>
                                        <p>• We make no warranty regarding the accuracy or reliability of information on our website</p>
                                    </CardContent>
                                </Card>

                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                    <p className="text-red-900">
                                        <strong>No Liability for Indirect Damages:</strong> We are not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Services.
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* User Conduct */}
                        {activeSection === 'conduct' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">User Conduct</h2>

                                <p className="text-gray-700">You agree not to:</p>

                                <div className="space-y-3">
                                    {[
                                        'Engage in unlawful activities or violate any laws',
                                        'Harass, threaten, or abuse other users or staff',
                                        'Create accounts impersonating others or using false information',
                                        'Share or transmit viruses, malware, or harmful code',
                                        'Attempt to gain unauthorized access to our systems',
                                        'Collect or scrape data from our website without permission',
                                        'Engage in fraud, forgery, or deception',
                                        'Resell or redistribute Services without authorization',
                                    ].map((item, index) => (
                                        <Card key={index}>
                                            <CardContent className="pt-6 text-gray-700 flex items-start gap-3">
                                                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                                {item}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                                    <p className="text-yellow-900">
                                        <strong>Consequences:</strong> Violation of these conduct rules may result in account suspension or termination, and we may pursue legal action if necessary.
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Intellectual Property */}
                        {activeSection === 'intellectual' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Intellectual Property Rights</h2>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Our Intellectual Property</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        All content on FurnStore, including text, images, logos, graphics, videos, and code, is owned by or licensed to FurnStore and protected by copyright and intellectual property laws. Unauthorized reproduction or distribution is prohibited.
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>User-Generated Content</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        By submitting reviews, comments, or other content, you grant FurnStore a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content in connection with our Services.
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Trademark Usage</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        "FurnStore" and related marks are trademarks of FurnStore. You may not use these trademarks without written permission.
                                    </CardContent>
                                </Card>
                            </section>
                        )}

                        {/* Limitation of Liability */}
                        {activeSection === 'limitation' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Limitation of Liability</h2>

                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded space-y-4">
                                    <p className="text-red-900">
                                        <strong>IMPORTANT:</strong> To the maximum extent permitted by law, FurnStore's liability for any claim arising from or related to these Terms or your use of the Services shall not exceed the total amount paid by you to FurnStore in the 12 months preceding the claim.
                                    </p>
                                    <p className="text-red-900">
                                        <strong>NO LIABILITY:</strong> In no event shall FurnStore be liable for indirect, incidental, special, consequential, or punitive damages, including but not limited to damages for loss of profits, goodwill, use, or data.
                                    </p>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Indemnification</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        You agree to indemnify and hold harmless FurnStore from any claims, losses, damages, or expenses (including legal fees) arising from your use of the Services, violation of these Terms, or infringement of third-party rights.
                                    </CardContent>
                                </Card>
                            </section>
                        )}

                        {/* Changes to Terms */}
                        {activeSection === 'changes' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Changes to Terms</h2>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Right to Modify</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Material changes will be prominently displayed.
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Continued Use</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        Your continued use of the Services following the posting of updated Terms constitutes your acceptance of the changes. We encourage you to review these Terms regularly.
                                    </CardContent>
                                </Card>
                            </section>
                        )}

                        {/* Contact & Legal */}
                        {activeSection === 'contact' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Contact & Legal</h2>

                                <Card className="bg-amber-50 border-2 border-amber-200">
                                    <CardContent className="pt-6 space-y-4">
                                        <div>
                                            <p className="font-semibold text-gray-900">For Questions or Concerns</p>
                                            <p className="text-gray-700"><a href="mailto:legal@furnstore.com" className="text-amber-600 hover:underline">legal@furnstore.com</a></p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Customer Support</p>
                                            <p className="text-gray-700"><a href="mailto:support@furnstore.com" className="text-amber-600 hover:underline">support@furnstore.com</a></p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Mailing Address</p>
                                            <p className="text-gray-700">FurnStore Legal Department<br />123 Furniture St<br />Design City, DC 12345<br />USA</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Governing Law</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        These Terms are governed by the laws of your jurisdiction, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts in that jurisdiction.
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Severability</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in effect.
                                    </CardContent>
                                </Card>
                            </section>
                        )}

                        {/* Footer */}
                        <div className="border-t pt-6 mt-8">
                            <p className="text-gray-600 text-sm italic">
                                These Terms of Service constitute the entire agreement between you and FurnStore regarding your use of the Services. If you have any questions or disputes, please contact us using the information provided above.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
