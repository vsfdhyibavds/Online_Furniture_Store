import { Heart, Search, ShoppingCart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type NavigationProps = {
  cartCount: number;
};

export function Navigation({ cartCount }: NavigationProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
              <span className="text-sm font-bold text-white">F</span>
            </div>
            <span className="text-xl font-bold">FurnStore</span>
          </a>

          <div className="mx-8 hidden max-w-md flex-1 md:flex">
            <form className="relative w-full" onSubmit={(e) => {
              e.preventDefault();
              const query = (e.currentTarget.querySelector('input') as HTMLInputElement).value;
              if (query) navigate(`/search?q=${encodeURIComponent(query)}`);
            }}>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="search"
                placeholder="Search furniture..."
                className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </form>
          </div>

          <nav className="flex items-center space-x-4">
            <div className="hidden items-center space-x-4 md:flex">
              <a href="/" className="text-sm font-medium hover:text-blue-600">Home</a>
              <a href="/categories" className="text-sm font-medium hover:text-blue-600">Categories</a>
              <a href="/deals" className="text-sm font-medium hover:text-blue-600">Deals</a>
            </div>
            <button
              onClick={() => navigate('/wishlist')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 p-0 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
            >
              <User className="mr-2 h-4 w-4" />
              Sign In
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
