import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCartStore } from '../../stores/useCartStore';
import { useAuth } from '../../contexts/AuthContext';
import { Badge } from '../ui/badge';

export function Header() {
  const { getTotalItems, toggleCart } = useCartStore();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const totalItems = getTotalItems();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-xl">FurnStore</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search furniture..."
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">
                Categories
              </Link>
              <Link to="/deals" className="text-sm font-medium hover:text-primary transition-colors">
                Deals
              </Link>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              {/* Wishlist */}
              {isAuthenticated && (
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              )}

              {/* Cart */}
              <Button variant="ghost" size="icon" onClick={toggleCart} className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-2">
                    <Link to="/dashboard">
                      <Button variant="ghost" size="sm">
                        <User className="h-4 w-4 mr-2" />
                        {user?.firstName}
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={handleAuthAction}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleAuthAction}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}