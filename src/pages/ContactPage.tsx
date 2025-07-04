import React from 'react';

export function ContactPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-700 text-lg mb-2">Have questions or need support? Reach out to us!</p>
            <ul className="text-gray-700 text-lg">
                <li>Email: support@furnstore.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Furniture St, Design City, DC 12345</li>
            </ul>
        </div>
    );
}
