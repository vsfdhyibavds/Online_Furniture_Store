import { useState } from 'react';
import type { FormEvent, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Headphones, Mail, MapPin, Phone, RefreshCw, Shield, Truck } from 'lucide-react';
import { categories, products } from '../data/mockData';
import { CategoryCard } from './categories/CategoryCard';
import { ProductCard } from './products/ProductCard';

export function HomePage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');

  const featuredProducts = products.filter(product => product.featured).slice(0, 6);
  const bestSellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);

  const heroSlides = [
    {
      title: 'Transform Your Living Space',
      subtitle: 'Discover premium furniture that combines style, comfort, and quality',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      cta: 'Shop Living Room',
      link: '#products',
    },
    {
      title: 'Create Your Dream Bedroom',
      subtitle: "Luxurious beds and bedroom furniture for the perfect night's sleep",
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200',
      cta: 'Shop Bedroom',
      link: '#products',
    },
    {
      title: 'Elegant Dining Solutions',
      subtitle: 'Beautiful dining sets that bring family and friends together',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200',
      cta: 'Shop Dining Room',
      link: '#products',
    },
  ];

  const handleNewsletterSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (email.trim()) {
      console.log('Newsletter signup:', email);
      setEmail('');
      alert('Thank you for subscribing to our newsletter!');
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="Hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="mb-4 text-5xl font-bold">{heroSlides[currentSlide].title}</h1>
            <p className="mb-8 text-xl text-gray-200">{heroSlides[currentSlide].subtitle}</p>
            <a
              href={heroSlides[currentSlide].link}
              className="inline-flex items-center rounded-md bg-white px-6 py-3 text-sm font-medium text-black hover:bg-gray-100"
            >
              {heroSlides[currentSlide].cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Feature icon={<Truck className="h-8 w-8 text-white" />} title="Free Shipping" text="Free delivery on orders over $500" />
            <Feature icon={<Shield className="h-8 w-8 text-white" />} title="Quality Guarantee" text="Premium materials and craftsmanship" />
            <Feature icon={<Headphones className="h-8 w-8 text-white" />} title="24/7 Support" text="Expert customer service team" />
            <Feature icon={<RefreshCw className="h-8 w-8 text-white" />} title="Easy Returns" text="30-day return policy" />
          </div>
        </div>
      </section>

      <section id="categories" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Shop by Category</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Discover our wide range of furniture categories, each carefully curated to help you create the perfect space.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="#categories"
              className="inline-flex items-center rounded-md border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50"
            >
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="products" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Featured Products</h2>
              <p className="text-gray-600">Handpicked favorites that our customers love most</p>
            </div>
            <a
              href="#products"
              className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-white"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Best Sellers</h2>
            <p className="text-gray-600">Our most popular furniture pieces loved by customers</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
          <p className="mb-8 text-xl text-white/80">
            Get the latest furniture trends and exclusive offers delivered to your inbox
          </p>
          <form onSubmit={handleNewsletterSubmit} className="mx-auto flex max-w-md gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md px-4 py-3 text-black"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
            <button type="submit" className="rounded-md bg-white px-6 py-3 font-medium text-blue-600 hover:bg-gray-100">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
                  <span className="text-sm font-bold text-white">F</span>
                </div>
                <span className="text-xl font-bold">FurnStore</span>
              </div>
              <p className="text-sm text-gray-400">
                Premium furniture for modern living. Transform your space with our carefully curated collection.
              </p>
              <div className="flex space-x-4">
                {['f', 'x', 'ig'].map(item => (
                  <span key={item} className="cursor-pointer text-sm font-semibold text-gray-400 transition-colors hover:text-white">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <FooterColumn title="Quick Links" links={['Home', 'Categories', 'Deals', 'About Us', 'Contact']} navigate={navigate} />
            <FooterColumn title="Customer Service" links={['Help Center', 'Shipping Info', 'Returns', 'Warranty', 'Track Order']} navigate={navigate} />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">support@furnstore.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">123 Furniture St, Design City, DC 12345</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
            <p className="text-sm text-gray-400">© 2025 FurnStore. All rights reserved.</p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <button onClick={() => navigate('/privacy')} className="text-sm text-gray-400 transition-colors hover:text-white">Privacy Policy</button>
              <button onClick={() => navigate('/terms')} className="text-sm text-gray-400 transition-colors hover:text-white">Terms of Service</button>
              <button onClick={() => navigate('/cookies')} className="text-sm text-gray-400 transition-colors hover:text-white">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: ReactElement; title: string; text: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

function FooterColumn({ title, links, navigate }: { title: string; links: string[]; navigate: any }) {
  const linkRoutes: { [key: string]: string } = {
    'Home': '/',
    'Categories': '/categories',
    'Deals': '/deals',
    'About Us': '/about',
    'Contact': '/contact',
    'Help Center': '/help',
    'Shipping Info': '/shipping',
    'Returns': '/returns',
    'Warranty': '/warranty',
    'Track Order': '/track-order',
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map(link => (
          <li key={link}>
            <button
              onClick={() => navigate(linkRoutes[link] || '/')}
              className="text-gray-400 transition-colors hover:text-white"
            >
              {link}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
