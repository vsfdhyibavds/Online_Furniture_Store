import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/products/ProductCard';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { Clock, Truck, Gift, Zap } from 'lucide-react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function DealsPage() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 3,
    hours: 14,
    minutes: 28,
    seconds: 42,
  });

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['deals'],
    queryFn: () => apiClient.getProducts({
      sortBy: 'price',
      sortOrder: 'asc',
      limit: 20
    }),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const total = (prev.days * 86400) + (prev.hours * 3600) + (prev.minutes * 60) + prev.seconds - 1;

        if (total <= 0) {
          clearInterval(interval);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          days: Math.floor(total / 86400),
          hours: Math.floor((total % 86400) / 3600),
          minutes: Math.floor((total % 3600) / 60),
          seconds: total % 60,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const products = productsData?.data || [];
  const dealsProducts = products.filter((product) => product.originalPrice);
  const maxDiscount = dealsProducts.length > 0
    ? Math.max(...dealsProducts.map((p) =>
        Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100)
      ))
    : 0;

  const dealBenefits = [
    {
      icon: Zap,
      title: 'Lightning Fast Deals',
      description: 'New discounts added daily on premium furniture',
    },
    {
      icon: Gift,
      title: 'Exclusive Offers',
      description: 'Special discounts available only to members',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free white-glove delivery on orders over $500',
    },
    {
      icon: Clock,
      title: 'Limited Time',
      description: 'Deals refresh regularly, so shop while stocks last',
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-96 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Special deals"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <Badge className="bg-red-600 text-white text-lg px-6 py-2 mb-6 animate-pulse">
              🔥 Limited Time Sale
            </Badge>
            <h1 className="text-6xl font-bold mb-4">Exclusive Deals</h1>
            <p className="text-2xl text-gray-100 mb-4">Save up to {maxDiscount}% on premium furniture</p>
            <p className="text-lg text-gray-200">Premium pieces at unbeatable prices</p>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-lg mb-4 font-semibold">Sale Ends In</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
              {[
                { label: 'Days', value: timeRemaining.days },
                { label: 'Hours', value: timeRemaining.hours },
                { label: 'Minutes', value: timeRemaining.minutes },
                { label: 'Seconds', value: timeRemaining.seconds },
              ].map((item) => (
                <div key={item.label} className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl font-bold">{String(item.value).padStart(2, '0')}</div>
                  <div className="text-xs uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Shop Our Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dealBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="text-center pt-8">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-red-600" />
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Deals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our handpicked collection of premium furniture at exceptional prices. Each piece is carefully selected to ensure quality, style, and value.
          </p>
        </div>

        {dealsProducts.length === 0 ? (
          <div className="text-center py-20">
            <Gift className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">No deals available right now</h2>
            <p className="text-gray-600 mb-6">We're preparing amazing offers! Check back soon.</p>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
                  <CardContent className="pt-6">
                    <p className="text-gray-600 text-sm mb-1">Total Deals Available</p>
                    <p className="text-4xl font-bold text-blue-600">{dealsProducts.length}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0">
                  <CardContent className="pt-6">
                    <p className="text-gray-600 text-sm mb-1">Maximum Savings</p>
                    <p className="text-4xl font-bold text-green-600">Up to {maxDiscount}%</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-red-50 to-red-100 border-0">
                  <CardContent className="pt-6">
                    <p className="text-gray-600 text-sm mb-1">Limited Time</p>
                    <p className="text-4xl font-bold text-red-600">{timeRemaining.days}d {timeRemaining.hours}h</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dealsProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Miss These Incredible Savings</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our furniture deals are constantly updated. Subscribe to our newsletter to be the first to know about new offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg text-gray-900 flex-1 max-w-xs"
            />
            <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
