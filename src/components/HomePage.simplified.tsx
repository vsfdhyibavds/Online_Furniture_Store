import React, { useState } from 'react';
import { ArrowRight, Truck, Shield, Headphones, RefreshCw } from 'lucide-react';
import { Product, Category } from '../types';
import { ProductCard } from './products/ProductCard';
import { CategoryCard } from './categories/CategoryCard';

// Mock data
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Living Room',
    slug: 'living-room',
    description: 'Modern and classic living room furniture',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    productCount: 24,
  },
  {
    id: '2',
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Comfortable and stylish bedroom furniture',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200',
    productCount: 18,
  },
  {
    id: '3',
    name: 'Dining Room',
    slug: 'dining-room',
    description: 'Elegant dining sets for every occasion',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200',
    productCount: 12,
  },
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Modern Gray Sofa',
    description: 'Comfortable 3-seater sofa in modern gray',
    price: 899,
    originalPrice: 1299,
    images: ['https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: mockCategories[0],
    brand: 'FurniturePro',
    inStock: true,
    stockQuantity: 15,
    rating: 4.5,
    reviewCount: 128,
    materials: ['Fabric', 'Wood'],
    colors: ['Gray'],
    tags: ['modern', 'comfortable', 'sale'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Wooden Queen Bed',
    description: 'Solid wood queen-size bed frame',
    price: 599,
    originalPrice: 799,
    images: ['https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: mockCategories[1],
    brand: 'WoodCraft',
    inStock: true,
    stockQuantity: 8,
    rating: 4.8,
    reviewCount: 95,
    materials: ['Wood'],
    colors: ['Brown'],
    tags: ['wood', 'quality', 'bed'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Dining Table Set',
    description: '6-seater dining table with chairs',
    price: 1299,
    originalPrice: 1799,
    images: ['https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: mockCategories[2],
    brand: 'TableMaster',
    inStock: true,
    stockQuantity: 5,
    rating: 4.7,
    reviewCount: 67,
    materials: ['Wood', 'Fabric'],
    colors: ['Walnut', 'Beige'],
    tags: ['dining', 'dining-room', 'set'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Coffee Table',
    description: 'Modern glass and wood coffee table',
    price: 299,
    images: ['https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: mockCategories[0],
    brand: 'ModernLiving',
    inStock: true,
    stockQuantity: 12,
    rating: 4.3,
    reviewCount: 45,
    materials: ['Glass', 'Wood'],
    colors: ['Natural'],
    tags: ['coffee-table', 'modern'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Office Chair',
    description: 'Ergonomic office chair with lumbar support',
    price: 399,
    originalPrice: 599,
    images: ['https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: mockCategories[0],
    brand: 'ComfortSeating',
    inStock: true,
    stockQuantity: 20,
    rating: 4.6,
    reviewCount: 112,
    materials: ['Fabric', 'Metal'],
    colors: ['Black'],
    tags: ['office', 'ergonomic', 'chair'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Bookshelf',
    description: 'Tall wooden bookshelf with 5 shelves',
    price: 199,
    images: ['https://images.pexels.com/photos/159866/books-book-pages-read-159866.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: mockCategories[0],
    brand: 'StoragePro',
    inStock: true,
    stockQuantity: 10,
    rating: 4.4,
    reviewCount: 58,
    materials: ['Wood'],
    colors: ['Oak'],
    tags: ['storage', 'bookshelf'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');

  const heroSlides = [
    {
      title: "Transform Your Living Space",
      subtitle: "Discover premium furniture that combines style, comfort, and quality",
      image: "/hero-banner.jpg",
      cta: "Shop Living Room",
      link: "/categories",
    },
    {
      title: "Create Your Dream Bedroom",
      subtitle: "Luxurious beds and bedroom furniture for the perfect night's sleep",
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Shop Bedroom",
      link: "/categories",
    },
    {
      title: "Elegant Dining Solutions",
      subtitle: "Beautiful dining sets that bring family and friends together",
      image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Shop Dining Room",
      link: "/categories",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentHeroSlide = heroSlides[currentSlide];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-96 rounded-lg overflow-hidden">
        <img
          src={currentHeroSlide.image}
          alt={currentHeroSlide.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">{currentHeroSlide.title}</h2>
            <p className="text-xl mb-8 drop-shadow-md">{currentHeroSlide.subtitle}</p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors hover:bg-gray-100 shadow-lg hover:shadow-xl">
              {currentHeroSlide.cta}
            </button>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-colors"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-colors"
        >
          →
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-900 text-white rounded-lg p-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <Truck size={40} className="mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
            <p className="text-gray-400">On orders over $100</p>
          </div>
          <div>
            <Shield size={40} className="mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
            <p className="text-gray-400">100% secure transactions</p>
          </div>
          <div>
            <Headphones size={40} className="mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
            <p className="text-gray-400">Dedicated customer service</p>
          </div>
          <div>
            <RefreshCw size={40} className="mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
            <p className="text-gray-400">30-day return policy</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-50 rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">Get exclusive deals and updates delivered to your inbox</p>
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
            Subscribe
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
