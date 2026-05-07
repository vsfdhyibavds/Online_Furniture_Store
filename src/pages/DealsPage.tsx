import React from 'react';
import { ProductCard } from '../components/products/ProductCard';
import { Badge } from '../components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';

export function DealsPage() {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['deals'],
    queryFn: () => apiClient.getProducts({
      sortBy: 'price',
      sortOrder: 'asc',
      limit: 20
    }),
  });

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

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-80 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Special deals"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <Badge className="bg-red-500 text-white text-lg px-4 py-2 mb-4">
              Limited Time
            </Badge>
            <h1 className="text-5xl font-bold mb-3">Exclusive Deals</h1>
            <p className="text-xl text-gray-200">Save big on premium furniture</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Limited Time Offers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these amazing deals! Save big on premium furniture with our special discounts.
          </p>
        </div>

        {dealsProducts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">No deals available right now</h2>
            <p className="text-gray-600">Check back soon for amazing offers!</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">
                {dealsProducts.length} Special {dealsProducts.length === 1 ? 'Deal' : 'Deals'} Available
              </h3>
              <p className="text-gray-600">
                Save up to {Math.max(...dealsProducts.map((p) =>
                  Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100)
                ))}% on selected items
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dealsProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
