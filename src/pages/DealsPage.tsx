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
  const dealsProducts = products.filter((product: any) => product.originalPrice);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Badge className="bg-red-500 text-white text-lg px-4 py-2">
            Special Deals
          </Badge>
        </div>
        <h1 className="text-4xl font-bold mb-4">Limited Time Offers</h1>
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
            <h2 className="text-2xl font-bold mb-4">
              {dealsProducts.length} Special {dealsProducts.length === 1 ? 'Deal' : 'Deals'} Available
            </h2>
            <p className="text-gray-600">
              Save up to {Math.max(...dealsProducts.map((p: any) => 
                Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100)
              ))}% on selected items
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dealsProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}