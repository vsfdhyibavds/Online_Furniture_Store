import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

type ProductGridProps = {
  products: Product[];
  onAddToCart: () => void;
};

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}