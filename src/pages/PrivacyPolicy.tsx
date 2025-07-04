import React from 'react';
import { useNavigate } from 'react-router-dom';

export function PrivacyPolicy() {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto py-12 px-4 flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"
                >
                    ← Back
                </button>
                <h1 className="text-3xl font-bold mb-4 text-primary">FurnStore Privacy Policy</h1>
                <p className="text-gray-700 mb-2">Last Updated: July 4, 2025</p>
                <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>Personal information (name, email, phone, address) when you make a purchase</li>
                    <li>Payment information processed securely through our payment processor</li>
                    <li>Browsing behavior and preferences to improve your shopping experience</li>
                    <li>Information from cookies and similar technologies</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>To process and fulfill your orders</li>
                    <li>To communicate about your orders, account, or customer service requests</li>
                    <li>To improve our website and product offerings</li>
                    <li>For marketing purposes (with your consent)</li>
                    <li>To prevent fraud and enhance security</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>With shipping carriers to deliver your furniture</li>
                    <li>With payment processors to complete transactions</li>
                    <li>With service providers who assist with our business operations</li>
                    <li>When required by law or to protect our rights</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>Access, correct, or delete your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Disable cookies through your browser settings</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
                <p className="text-gray-700">For privacy concerns, contact us at <a href="mailto:support@furnstore.com" className="text-blue-500 underline">support@furnstore.com</a>.</p>
                <p className="text-gray-700 mt-4">Continued use of the site constitutes acceptance of this policy. This policy is governed by the laws of your jurisdiction and may be updated at any time.</p>
            </div>
        </div>
    );
}
