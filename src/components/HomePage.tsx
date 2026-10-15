import { useState, useEffect, useRef } from 'react';
import type { FormEvent, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Headphones, RefreshCw, Shield, Truck } from 'lucide-react';
import { apiClient } from '../lib/api';
import { CategoryCard } from './categories/CategoryCard';
import { ProductCard } from './products/ProductCard';
import { useToast } from '../hooks/use-toast';

export function HomePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  const { data: productsData } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => apiClient.getProducts({ featured: true, limit: 6 }),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.getCategories(),
  });

  const { data: bestSellersData } = useQuery({
    queryKey: ['products', 'bestsellers'],
    queryFn: () => apiClient.getProducts({ sortBy: 'rating', sortOrder: 'desc', limit: 8 }),
  });

  const featuredProducts = productsData?.data || [];
  const categories = categoriesData?.data || [];
  const bestSellers = bestSellersData?.data || [];

  const heroSlides = [
    {
      title: 'Transform Your Living Space',
      subtitle: 'Discover premium furniture that combines style, comfort, and quality',
      image: '/hero-banner.jpg',
      cta: 'Shop Living Room',
      link: '/categories',
    },
    {
      title: 'Create Your Dream Bedroom',
      subtitle: "Luxurious beds and bedroom furniture for the perfect night's sleep",
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200',
      cta: 'Shop Bedroom',
      link: '/categories',
    },
    {
      title: 'Elegant Dining Solutions',
      subtitle: 'Beautiful dining sets that bring family and friends together',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200',
      cta: 'Shop Dining Room',
      link: '/categories',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleNewsletterSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (email.trim()) {
      setEmail('');
      toast({
        title: 'Subscribed!',
        description: 'Thank you for subscribing to our newsletter.',
      });
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] overflow-hidden" ref={heroRef}
        onMouseEnter={() => { if (heroRef.current) heroRef.current.dataset.paused = 'true'; }}
        onMouseLeave={() => { if (heroRef.current) delete heroRef.current.dataset.paused; }}
      >
        <div className="absolute inset-0">
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            className="h-full w-full object-cover transition-opacity duration-700"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }} />
        </div>
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-5xl font-bold text-white drop-shadow-lg">{heroSlides[currentSlide].title}</h1>
            <p className="mb-8 text-xl text-white drop-shadow-md">{heroSlides[currentSlide].subtitle}</p>
            <button
              onClick={() => navigate(heroSlides[currentSlide].link)}
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-black hover:bg-gray-100 shadow-lg transition-all hover:shadow-xl"
            >
              {heroSlides[currentSlide].cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
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
            <button
              onClick={() => navigate('/categories')}
              className="inline-flex items-center rounded-md border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50"
            >
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
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
            <button
              onClick={() => navigate('/categories')}
              className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-white"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
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
              aria-label="Email address"
            />
            <button type="submit" className="rounded-md bg-white px-6 py-3 font-medium text-blue-600 hover:bg-gray-100">
              Subscribe
            </button>
          </form>
        </div>
      </section>
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
