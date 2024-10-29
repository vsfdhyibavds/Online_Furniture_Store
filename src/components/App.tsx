import React, { useState } from 'react';
import { ShoppingCart, User, History, LayoutDashboard, LogOut } from 'lucide-react';
import ProductList from './components/ProductList';
import { Product } from './types';

const products: Product[] = [
  { id: 1, name: 'Arm Chair', description: 'Comfortable arm chair', image: 'https://source.unsplash.com/random/200x200/?armchair', category: 'living-room' },
  { id: 2, name: 'Coffee Table', description: 'Stylish coffee table', image: 'https://source.unsplash.com/random/200x200/?coffeetable', category: 'living-room' },
  { id: 3, name: 'Desk', description: 'Modern desk', image: 'https://source.unsplash.com/random/200x200/?desk', category: 'bedroom' },
  { id: 4, name: 'Outdoor Patio Dining Set', description: 'Perfect for outdoor dining', image: 'https://source.unsplash.com/random/200x200/?patiodining', category: 'outdoor' },
  { id: 5, name: 'Recliner', description: 'Comfortable recliner', image: 'https://source.unsplash.com/random/200x200/?recliner', category: 'living-room' },
  { id: 6, name: 'Sofa Chair', description: 'Elegant sofa chair', image: 'https://source.unsplash.com/random/200x200/?sofachair', category: 'living-room' },
  { id: 7, name: 'Sofa Chaise', description: 'Luxurious sofa chaise', image: 'https://source.unsplash.com/random/200x200/?sofachaise', category: 'living-room' },
  { id: 8, name: 'Sofa Lounge', description: 'Comfortable sofa lounge', image: 'https://source.unsplash.com/random/200x200/?sofalounge', category: 'living-room' },
  { id: 9, name: 'Sofa', description: 'Classic sofa', image: 'https://source.unsplash.com/random/200x200/?sofa', category: 'living-room' },
  { id: 10, name: 'Dining Table', description: 'Elegant dining table', image: 'https://source.unsplash.com/random/200x200/?diningtable', category: 'dining' },
  { id: 11, name: 'Cabinets', description: 'Spacious cabinets', image: 'https://source.unsplash.com/random/200x200/?cabinets', category: 'storage' },
];

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const addToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Furniture Store</h1>
          <div className="flex items-center space-x-4">
            <a href="#" className="flex items-center"><ShoppingCart className="mr-1" size={18} /> Cart ({cartCount})</a>
            <a href="#" className="flex items-center"><User className="mr-1" size={18} /> Login</a>
            <a href="#" className="flex items-center"><History className="mr-1" size={18} /> Order History</a>
            <a href="#" className="flex items-center"><LayoutDashboard className="mr-1" size={18} /> Dashboard</a>
            <a href="#" className="flex items-center"><LogOut className="mr-1" size={18} /> Logout</a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <section className="mb-8">
          <label htmlFor="category-select" className="block mb-2 font-semibold">Filter by Category:</label>
          <select
            id="category-select"
            className="w-full md:w-64 p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="living-room">Living Room</option>
            <option value="dining">Dining Room</option>
            <option value="bedroom">Bedroom</option>
            <option value="kitchen">Kitchen</option>
            <option value="bathroom">Bathroom</option>
            <option value="outdoor">Outdoor</option>
            <option value="storage">Storage</option>
          </select>
        </section>

        <ProductList products={filteredProducts} addToCart={addToCart} />
      </main>
    </div>
  );
}

export default App;