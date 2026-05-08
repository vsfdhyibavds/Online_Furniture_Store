import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cookie, Shield, Settings, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function CookiePolicy() {
    const navigate = useNavigate();
    const [now, setNow] = useState(new Date());
    const [activeSection, setActiveSection] = useState('intro');

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const sections = [
        { id: 'intro', label: 'Introduction', icon: Cookie },
        { id: 'what', label: 'What Are Cookies?', icon: Cookie },
        { id: 'types', label: 'Types of Cookies', icon: Cookie },
        { id: 'why', label: 'Why We Use Cookies', icon: Settings },
        { id: 'thirdparty', label: 'Third-Party Cookies', icon: AlertCircle },
        { id: 'manage', label: 'Managing Cookies', icon: Settings },
        { id: 'consent', label: 'Cookie Consent', icon: Shield },
        { id: 'contact', label: 'Contact Us', icon: AlertCircle },
    ];

    const cookieTypes = [
        {
            name: 'Essential/Strictly Necessary',
            category: 'essential',
            color: 'red',
            duration: 'Session to 1 year',
            examples: ['Authentication', 'Shopping cart', 'Security'],
            description: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.'
        },
        {
            name: 'Performance/Analytics',
            category: 'analytics',
            color: 'blue',
            duration: '2 years',
            examples: ['Google Analytics', 'Page views', 'User behavior'],
            description: 'These cookies help us understand how visitors interact with our website, including which pages are most frequently visited and bounce rates.'
        },
        {
            name: 'Functionality',
            category: 'functional',
            color: 'green',
            duration: '1 year',
            examples: ['Language preference', 'Currency selection', 'Display settings'],
            description: 'These cookies remember your preferences and choices to provide a more personalized experience when you return to our website.'
        },
        {
            name: 'Targeting/Advertising',
            category: 'marketing',
            color: 'purple',
            duration: '2 years',
            examples: ['Retargeting ads', 'Interest-based ads', 'Social media integration'],
            description: 'These cookies track your browsing habits to deliver personalized advertisements and measure the effectiveness of advertising campaigns.'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                    <h1 className="text-5xl font-bold mb-3">Cookie Policy</h1>
                    <p className="text-purple-100 text-lg">How we use cookies to enhance your experience</p>
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
                                                    ? 'bg-purple-100 text-purple-700 font-semibold'
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
                                <h2 className="text-3xl font-bold text-gray-900">Cookie Policy</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    FurnStore uses cookies and similar tracking technologies to enhance your browsing experience, analyze website usage, and deliver personalized content. This Cookie Policy explains what cookies are, the types we use, how we use them, and your choices regarding cookie usage.
                                </p>
                                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                                    <p className="text-purple-900">
                                        <strong>Important:</strong> By continuing to use FurnStore, you consent to our use of cookies as described in this policy. You can manage your cookie preferences at any time through your browser settings.
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* What Are Cookies */}
                        {activeSection === 'what' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">What Are Cookies?</h2>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Definition</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They contain information about your browsing activity and preferences.
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>How Cookies Work</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-gray-700">
                                        <p>1. When you visit FurnStore, our servers send cookie files to your browser</p>
                                        <p>2. Your browser stores these files on your device</p>
                                        <p>3. When you revisit FurnStore, your browser sends the cookie information back to our servers</p>
                                        <p>4. This allows us to recognize you and personalize your experience</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Session vs. Persistent Cookies</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4 text-gray-700">
                                        <div>
                                            <p className="font-semibold text-gray-900">Session Cookies</p>
                                            <p>Temporary cookies that are deleted when you close your browser. Used to maintain your session and shopping cart.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Persistent Cookies</p>
                                            <p>Remain on your device for a specified period. Used to remember your preferences and login information.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </section>
                        )}

                        {/* Types of Cookies */}
                        {activeSection === 'types' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Types of Cookies We Use</h2>

                                <div className="space-y-4">
                                    {cookieTypes.map((cookieType) => (
                                        <Card key={cookieType.category} className="overflow-hidden">
                                            <CardHeader className={`bg-${cookieType.color}-50 border-b-2 border-${cookieType.color}-200`}>
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-lg">{cookieType.name}</CardTitle>
                                                    <Badge className={`bg-${cookieType.color}-600`}>{cookieType.duration}</Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-6 space-y-4">
                                                <p className="text-gray-700">{cookieType.description}</p>
                                                <div>
                                                    <p className="font-semibold text-gray-900 mb-2">Common Examples:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {cookieType.examples.map((example, idx) => (
                                                            <Badge key={idx} variant="outline" className="bg-gray-50">
                                                                {example}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Why We Use Cookies */}
                        {activeSection === 'why' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Why We Use Cookies</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        {
                                            title: 'Shopping Cart',
                                            description: 'Remember items in your cart between visits'
                                        },
                                        {
                                            title: 'Login Information',
                                            description: 'Keep you logged in for a better experience'
                                        },
                                        {
                                            title: 'Preferences',
                                            description: 'Store your language, currency, and display preferences'
                                        },
                                        {
                                            title: 'Analytics',
                                            description: 'Understand how you use our website to improve it'
                                        },
                                        {
                                            title: 'Personalization',
                                            description: 'Provide recommendations based on your interests'
                                        },
                                        {
                                            title: 'Advertising',
                                            description: 'Show you relevant furniture ads across the web'
                                        },
                                        {
                                            title: 'Security',
                                            description: 'Detect and prevent fraud and malicious activity'
                                        },
                                        {
                                            title: 'Performance',
                                            description: 'Optimize website speed and functionality'
                                        },
                                    ].map((item, idx) => (
                                        <Card key={idx}>
                                            <CardContent className="pt-6">
                                                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                                                <p className="text-gray-700 text-sm">{item.description}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Third-Party Cookies */}
                        {activeSection === 'thirdparty' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Third-Party Cookies</h2>

                                <p className="text-gray-700">
                                    We allow trusted third parties to place cookies on our website to provide services on our behalf:
                                </p>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Analytics Partners</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-gray-700">
                                        <p>• Google Analytics - Analyze website traffic and user behavior</p>
                                        <p>• Mixpanel - Track user engagement and conversion funnels</p>
                                        <p>These tools help us understand how visitors use our site and where improvements are needed.</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Advertising Partners</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-gray-700">
                                        <p>• Google Ads - Display personalized furniture advertisements</p>
                                        <p>• Facebook Pixel - Retarget users with relevant ads on social media</p>
                                        <p>• AdRoll - Show you furniture recommendations across partner websites</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Social Media Integration</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-gray-700">
                                        <p>• Facebook, Instagram, Twitter - Allow social sharing and logins</p>
                                        <p>• YouTube - Enable embedded video content</p>
                                        <p>These partners have their own cookie policies that govern their use of data.</p>
                                    </CardContent>
                                </Card>

                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                    <p className="text-blue-900">
                                        <strong>Note:</strong> We do not control third-party cookies. Please review their privacy policies to understand how they use your data.
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Managing Cookies */}
                        {activeSection === 'manage' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Managing Cookies</h2>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Browser Settings</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4 text-gray-700">
                                        <p>Most web browsers allow you to control cookie settings. You can:</p>
                                        <ul className="space-y-2 ml-4 list-disc">
                                            <li>Accept all cookies</li>
                                            <li>Block all cookies</li>
                                            <li>Allow only certain types of cookies</li>
                                            <li>Delete existing cookies</li>
                                        </ul>
                                        <p className="mt-4"><strong>Browser Instructions:</strong></p>
                                        <ul className="space-y-1 text-sm">
                                            <li>• Chrome: Settings → Privacy and security → Cookies and other site data</li>
                                            <li>• Firefox: Preferences → Privacy & Security → Cookies and Site Data</li>
                                            <li>• Safari: Preferences → Privacy → Cookies and website data</li>
                                            <li>• Edge: Settings → Privacy, search, and services → Clear browsing data</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Impact of Disabling Cookies</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700 space-y-3">
                                        <p className="font-semibold text-gray-900">Important:</p>
                                        <ul className="space-y-2 ml-4 list-disc">
                                            <li>Disabling essential cookies may prevent you from logging in</li>
                                            <li>Your shopping cart may not function properly</li>
                                            <li>Website features and personalization may be limited</li>
                                            <li>You may see non-relevant advertisements</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Do Not Track (DNT)</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        Some browsers include a "Do Not Track" feature. While we respect your privacy choices, we cannot guarantee that all third parties will honor DNT requests as there is no universal standard.
                                    </CardContent>
                                </Card>
                            </section>
                        )}

                        {/* Cookie Consent */}
                        {activeSection === 'consent' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Cookie Consent & Preferences</h2>

                                <Card className="bg-purple-50 border-2 border-purple-200">
                                    <CardHeader>
                                        <CardTitle>Consent Management</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700 space-y-3">
                                        <p>When you first visit FurnStore, you'll see a cookie consent banner allowing you to:</p>
                                        <ul className="space-y-2 ml-4 list-disc">
                                            <li>Accept all cookies</li>
                                            <li>Accept only essential cookies</li>
                                            <li>Manage your preferences in detail</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Changing Your Preferences</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        You can change your cookie preferences at any time by:
                                        <ul className="space-y-2 ml-4 list-disc mt-3">
                                            <li>Clicking the cookie consent banner (if visible)</li>
                                            <li>Visiting our cookie preference center in your account settings</li>
                                            <li>Clearing your cookies and revisiting our website</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Opt-Out of Marketing Cookies</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-gray-700">
                                        To opt out of targeted advertising across the web, visit:
                                        <ul className="space-y-2 ml-4 list-disc mt-3">
                                            <li>Digital Advertising Alliance (DAA): optout.aboutads.info</li>
                                            <li>Network Advertising Initiative (NAI): optout.networkadvertising.org</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </section>
                        )}

                        {/* Contact Us */}
                        {activeSection === 'contact' && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Questions About Cookies?</h2>

                                <Card className="bg-purple-50 border-2 border-purple-200">
                                    <CardContent className="pt-6 space-y-4">
                                        <div>
                                            <p className="font-semibold text-gray-900">Email Us</p>
                                            <p className="text-gray-700"><a href="mailto:privacy@furnstore.com" className="text-purple-600 hover:underline">privacy@furnstore.com</a></p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">General Support</p>
                                            <p className="text-gray-700"><a href="mailto:support@furnstore.com" className="text-purple-600 hover:underline">support@furnstore.com</a></p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Mailing Address</p>
                                            <p className="text-gray-700">FurnStore Privacy Team<br />123 Furniture St<br />Design City, DC 12345<br />USA</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <p className="text-gray-600 text-sm italic">
                                    We'll respond to cookie-related inquiries within 5 business days. Please provide as much detail as possible about your concern.
                                </p>
                            </section>
                        )}

                        {/* Footer */}
                        <div className="border-t pt-6 mt-8 space-y-4">
                            <p className="text-gray-600 text-sm">
                                This Cookie Policy is governed by the laws of your jurisdiction. We reserve the right to update this policy at any time. Material changes will be prominently displayed on our website.
                            </p>
                            <p className="text-gray-600 text-sm">
                                <strong>Last updated:</strong> July 4, 2025. Your continued use of FurnStore constitutes your acceptance of this Cookie Policy and our use of cookies as described herein.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
