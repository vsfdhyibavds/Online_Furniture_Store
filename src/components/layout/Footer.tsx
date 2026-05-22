import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Categories', to: '/categories' },
  { label: 'Deals', to: '/deals' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const customerServiceLinks = [
  { label: 'Help Center', to: '/help' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Shipping Info', to: '/shipping' },
  { label: 'Returns', to: '/returns' },
  { label: 'Warranty', to: '/warranty' },
  { label: 'Track Order', to: '/track-order' },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', shortLabel: 'f' },
  { label: 'Twitter', href: 'https://twitter.com', shortLabel: 'x' },
  { label: 'Instagram', href: 'https://instagram.com', shortLabel: 'ig' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-xl">FurnStore</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Premium furniture for modern living. Transform your space with our carefully curated collection.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ label, href, shortLabel }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-sm font-semibold text-gray-400 uppercase hover:text-white transition-colors"
                >
                  {shortLabel}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              {customerServiceLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <address className="space-y-3 text-sm not-italic">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
                <a href="mailto:support@furnstore.com" className="text-gray-400 hover:text-white transition-colors">
                  support@furnstore.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" aria-hidden="true" />
                <span className="text-gray-400">123 Furniture St, Design City, DC 12345</span>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} FurnStore. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
