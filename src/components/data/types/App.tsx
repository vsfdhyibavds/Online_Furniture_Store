import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { products } from './data/products';

function App() {
  const [category, setCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(product => product.category === category);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation cartCount={cartCount} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter category={category} setCategory={setCategory} />
        <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
      </main>
    </div>
  );
}

export default App;