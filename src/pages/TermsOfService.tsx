import React, { useEffect, useState } from 'react';

export function TermsOfService() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="container mx-auto py-12 px-4 flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold mb-4 text-primary">FurnStore Terms of Service</h1>
                <p className="text-gray-700 mb-2">
                    Last Updated: July 4, 2025<br />
                    <span className="text-xs text-gray-500">Active Timestamp: {now.toLocaleString()}</span>
                </p>
                <h2 className="text-xl font-semibold mt-6 mb-2">1. General Terms</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>By using our website, you agree to these terms</li>
                    <li>We reserve the right to modify these terms at any time</li>
                    <li>You must be at least 18 to make purchases</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">2. Product Information</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>We strive for accuracy but cannot guarantee all product descriptions, colors, or dimensions</li>
                    <li>Prices are subject to change without notice</li>
                    <li>Furniture may vary slightly from images due to monitor settings</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">3. Orders & Payments</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>All orders are subject to product availability</li>
                    <li>We accept major credit cards and other payment methods as indicated</li>
                    <li>You authorize us to charge your payment method for your order</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">4. Shipping & Delivery</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>Delivery times are estimates, not guarantees</li>
                    <li>You are responsible for inspecting furniture upon delivery</li>
                    <li>Additional fees may apply for special delivery requests</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">5. Returns & Refunds</h2>
                <ul className="list-disc ml-6 text-gray-700">
                    <li>See our Return Policy for details on eligible items</li>
                    <li>Original shipping fees are non-refundable</li>
                    <li>Restocking fees may apply for certain items</li>
                </ul>
                <p className="text-gray-700 mt-4">Contact us at <a href="mailto:support@furnstore.com" className="text-blue-500 underline">support@furnstore.com</a> for questions. Continued use of the site constitutes acceptance of these terms. These terms are governed by the laws of your jurisdiction and may be updated at any time.</p>
            </div>
        </div>
    );
}
