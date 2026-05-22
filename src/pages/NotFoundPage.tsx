import React from 'react';
import { Home, Search, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();

  const suggestions = [
    { label: 'Home', path: '/' },
    { label: 'Categories', path: '/categories' },
    { label: 'Deals', path: '/deals' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Help Center', path: '/help' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          {/* 404 Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="text-9xl font-bold text-gray-100">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertCircle className="h-20 w-20 text-red-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-8">
            Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Main CTA */}
          <div className="mb-12 flex gap-4 justify-center">
            <Button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <Button
              onClick={() => navigate('/search')}
              variant="outline"
              size="lg"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>

          {/* Suggested Links */}
          <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-6 text-sm uppercase tracking-wide">
              Browse Popular Pages
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {suggestions.map(item => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="text-left px-4 py-3 rounded-lg bg-white hover:bg-blue-100 transition-colors text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-100 hover:border-blue-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-8">
            Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
}
