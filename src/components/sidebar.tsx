import React from 'react';
import { LayoutDashboard, ShoppingBag, BarChart3, Settings, Package } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, active: true },
  { label: 'Products', icon: <Package className="w-5 h-5" /> },
  { label: 'Orders', icon: <ShoppingBag className="w-5 h-5" /> },
  { label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { label: 'Settings', icon: <Settings className="w-5 h-5" /> }
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">FurnStore</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              item.active ? 'bg-gray-100' : ''
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}