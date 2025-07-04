import React, { useEffect, useState } from 'react';

export function CookiePolicy() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="container mx-auto py-12 px-4 flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold mb-4 text-primary">FurnStore Cookie Policy</h1>
                <p className="text-gray-700 mb-2">
                    Last Updated: July 4, 2025<br />
                    <span className="text-xs text-gray-500">Active Timestamp: {now.toLocaleString()}</span>
                </p>
                <h2 className="text-xl font-semibold mt-6 mb-2">1. What Are Cookies?</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>Small text files stored on your device when you visit our website</li>
                    <li>Help remember your preferences and improve your shopping experience</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">2. Types of Cookies We Use</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>Essential Cookies: Necessary for website functionality (e.g., shopping cart)</li>
                    <li>Performance Cookies: Help us understand how visitors use our site</li>
                    <li>Functionality Cookies: Remember your preferences (e.g., language, region)</li>
                    <li>Targeting/Advertising Cookies: Used to show relevant furniture ads</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">3. Managing Cookies</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>You can control cookies through your browser settings</li>
                    <li>Disabling cookies may affect website functionality</li>
                    <li>Third-party cookies (e.g., social media, advertisers) are governed by their own policies</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">4. Why We Use Cookies</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>To remember items in your shopping cart</li>
                    <li>To understand customer preferences and improve our furniture selection</li>
                    <li>To provide personalized recommendations</li>
                    <li>For analytics to improve our website performance</li>
                </ul>
                <p className="text-gray-700 mt-4">Contact us at <a href="mailto:support@furnstore.com" className="text-blue-500 underline">support@furnstore.com</a> for questions. Continued use of the site constitutes acceptance of this policy. This policy is governed by the laws of your jurisdiction and may be updated at any time.</p>
            </div>
        </div>
    );
}
