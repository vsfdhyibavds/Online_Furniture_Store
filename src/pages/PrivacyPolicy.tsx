import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Share2, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function PrivacyPolicy() {
    const navigate = useNavigate();
    const [now, setNow] = useState(new Date());
    const [activeSection, setActiveSection] = useState('intro');

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const sections = [
        { id: 'intro', label: 'Introduction', icon: FileText },
        { id: 'collect', label: 'Information We Collect', icon: Eye },
        { id: 'use', label: 'How We Use Information', icon: Share2 },
        { id: 'sharing', label: 'Data Sharing', icon: Share2 },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'rights', label: 'Your Rights', icon: Shield },
        { id: 'retention', label: 'Data Retention', icon: FileText },
        { id: 'children', label: 'Children\'s Privacy', icon: FileText },
        { id: 'contact', label: 'Contact Us', icon: FileText },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                    <h1 className="text-5xl font-bold mb-3">Privacy Policy</h1>
                    <p className="text-blue-100 text-lg">Your privacy is important to us</p>
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
                                                    ? 'bg-blue-100 text-blue-700 font-semibold'
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
                                    FurnStore ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise process personal information in connection with our website, mobile applications, and related services (collectively, the "Services").
                                </p>
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                    <p className="text-blue-900">
                                        <strong>Important:</strong> By accessing and using FurnStore, you agree to the terms of this Privacy Policy. If you do not agree with our practices, please do not use our Services.
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Information We Collect */}
                        {activeSection === 'collect' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>

                                <div className="space-y-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Personal Information You Provide</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-gray-700">
                                                <li>• Full name, email address, and phone number</li>
                                                <li>• Billing and shipping addresses</li>
                                                <li>• Payment information (processed securely)</li>
                                                <li>• Account credentials and password</li>
                                                <li>• Customer support communications</li>
                                                <li>• Product reviews and ratings</li>
                                                <li>• Wishlist and saved items</li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Automatically Collected Information</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-gray-700">
                                                <li>• Device type, operating system, and browser information</li>
                                                <li>• IP address and geolocation data</li>
                                                <li>• Pages visited and time spent on our website</li>
                                                <li>• Referring website and search queries</li>
                                                <li>• Cookies and similar tracking technologies</li>
                                                <li>• Purchase history and browsing preferences</li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Information from Third Parties</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-gray-700">
                                                <li>• Social media profiles (if you link your account)</li>
                                                <li>• Payment processors and financial institutions</li>
                                                <li>• Shipping and delivery partners</li>
                                                <li>• Analytics providers and marketing partners</li>
                                                <li>• Customer feedback and reviews</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </section>
                        )}

                        {/* How We Use Information */}
                        {activeSection === 'use' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">How We Use Your Information</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Service Delivery</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-1">
                                            <p>• Process and fulfill orders</p>
                                            <p>• Manage accounts and registrations</p>
                                            <p>• Send order confirmations and receipts</p>
                                            <p>• Provide customer support</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Communication</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-1">
                                            <p>• Send promotional emails (with consent)</p>
                                            <p>• Notify about order status</p>
                                            <p>• Respond to inquiries</p>
                                            <p>• Send policy updates</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Improvement & Analytics</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-1">
                                            <p>• Analyze usage patterns</p>
                                            <p>• Improve website functionality</p>
                                            <p>• Personalize user experience</p>
                                            <p>• Conduct research and surveys</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Security & Legal</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-1">
                                            <p>• Prevent fraud and abuse</p>
                                            <p>• Comply with legal obligations</p>
                                            <p>• Protect rights and safety</p>
                                            <p>• Enforce terms of service</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </section>
                        )}

                        {/* Data Sharing */}
                        {activeSection === 'sharing' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Data Sharing & Disclosure</h2>

                                <p className="text-gray-700">We may share your information with:</p>

                                <div className="space-y-4">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <h4 className="font-semibold mb-2 text-gray-900">Service Providers</h4>
                                            <p className="text-gray-700">Payment processors, shipping partners, cloud hosting providers, and analytics companies who help us operate our Services.</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <h4 className="font-semibold mb-2 text-gray-900">Legal Requirements</h4>
                                            <p className="text-gray-700">When required by law, court order, or government request, we may disclose your information to comply with legal obligations.</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <h4 className="font-semibold mb-2 text-gray-900">Business Transfers</h4>
                                            <p className="text-gray-700">In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <h4 className="font-semibold mb-2 text-gray-900">Your Consent</h4>
                                            <p className="text-gray-700">We may share information when you explicitly consent or request us to do so.</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                                    <p className="text-yellow-900">
                                        <strong>Note:</strong> We do not sell or trade your personal information to third parties for marketing purposes without your explicit consent.
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Security */}
                        {activeSection === 'security' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Data Security</h2>

                                <p className="text-gray-700">
                                    We implement comprehensive security measures to protect your personal information:
                                </p>

                                <div className="space-y-3">
                                    <div className="flex gap-4">
                                        <Lock className="h-6 w-6 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Encryption</h4>
                                            <p className="text-gray-700">All data transmissions use SSL/TLS encryption</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Lock className="h-6 w-6 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Access Control</h4>
                                            <p className="text-gray-700">Limited access to personal data by authorized personnel</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Lock className="h-6 w-6 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Monitoring</h4>
                                            <p className="text-gray-700">Continuous security monitoring and threat detection</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Lock className="h-6 w-6 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Compliance</h4>
                                            <p className="text-gray-700">Adherence to industry standards and regulations</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                    <p className="text-red-900">
                                        <strong>Important:</strong> While we use industry-standard security measures, no system is completely secure. Please use strong passwords and notify us of any suspicious activity.
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Your Rights */}
                        {activeSection === 'rights' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Your Privacy Rights</h2>

                                <p className="text-gray-700">
                                    Depending on your location, you may have the following rights:
                                </p>

                                <div className="space-y-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Right to Access</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-gray-700">
                                            Request a copy of the personal information we hold about you.
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Right to Correction</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-gray-700">
                                            Request correction of inaccurate or incomplete information.
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Right to Deletion</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-gray-700">
                                            Request deletion of your personal information (subject to legal obligations).
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Right to Opt-Out</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-gray-700">
                                            Opt-out of marketing communications and data processing for certain purposes.
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Right to Data Portability</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-gray-700">
                                            Request a portable copy of your data in a structured format.
                                        </CardContent>
                                    </Card>
                                </div>

                                <p className="text-gray-700 mt-4">
                                    To exercise any of these rights, please contact us using the information in the Contact Us section.
                                </p>
                            </section>
                        )}

                        {/* Data Retention */}
                        {activeSection === 'retention' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Data Retention</h2>

                                <p className="text-gray-700">
                                    We retain your personal information for as long as necessary to provide Services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
                                </p>

                                <div className="space-y-4">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <h4 className="font-semibold mb-2 text-gray-900">Account Information</h4>
                                            <p className="text-gray-700">Retained during account tenure and for a reasonable period afterward for legal and business purposes.</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <h4 className="font-semibold mb-2 text-gray-900">Transaction Records</h4>
                                            <p className="text-gray-700">Retained for 7 years for accounting, tax, and fraud prevention purposes.</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <h4 className="font-semibold mb-2 text-gray-900">Cookie Data</h4>
                                            <p className="text-gray-700">Typically retained for 1-2 years unless otherwise specified in our Cookie Policy.</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </section>
                        )}

                        {/* Children's Privacy */}
                        {activeSection === 'children' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Children's Privacy</h2>

                                <p className="text-gray-700">
                                    FurnStore is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
                                </p>

                                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                                    <p className="text-purple-900">
                                        <strong>Parental Concern:</strong> If you believe we have collected information from a child under 13, please contact us immediately.
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Contact Us */}
                        {activeSection === 'contact' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>

                                <p className="text-gray-700">
                                    If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
                                </p>

                                <Card className="bg-blue-50 border-2 border-blue-200">
                                    <CardContent className="pt-6 space-y-4">
                                        <div>
                                            <p className="font-semibold text-gray-900">Email</p>
                                            <p className="text-gray-700"><a href="mailto:privacy@furnstore.com" className="text-blue-600 hover:underline">privacy@furnstore.com</a></p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Support Email</p>
                                            <p className="text-gray-700"><a href="mailto:support@furnstore.com" className="text-blue-600 hover:underline">support@furnstore.com</a></p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Mailing Address</p>
                                            <p className="text-gray-700">FurnStore Privacy Team<br />123 Furniture St<br />Design City, DC 12345<br />USA</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <p className="text-gray-600 text-sm italic">
                                    We will respond to privacy requests within 30 days of receipt. We may need to verify your identity before processing your request.
                                </p>
                            </section>
                        )}

                        {/* Footer */}
                        <div className="border-t pt-6 mt-8">
                            <p className="text-gray-600 text-sm">
                                This Privacy Policy is governed by the laws of your jurisdiction. We reserve the right to update this policy at any time. Changes will be effective upon posting to our website. Continued use of our Services constitutes acceptance of the updated Privacy Policy.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
