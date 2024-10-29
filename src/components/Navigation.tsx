import React from 'react';
import { ShoppingCart, History, LayoutDashboard, LogOut, Home } from 'lucide-react';
import { NavLink } from './NavLink';

type NavigationProps = {
  cartCount: number;
};

export function Navigation({ cartCount }: NavigationProps) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Furniture Store</h1>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink icon={<Home size={20} />} text="Home" active />
            <NavLink icon={<ShoppingCart size={20} />} text={`Cart (${cartCount})`} />
            <NavLink icon={<History size={20} />} text="History" />
            <NavLink icon={<LayoutDashboard size={20} />} text="Dashboard" />
            <NavLink icon={<LogOut size={20} />} text="Logout" />
          </div>
        </div>
      </div>
    </nav>
  );
}