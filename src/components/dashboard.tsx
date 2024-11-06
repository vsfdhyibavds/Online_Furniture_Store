import React from 'react';
import { products, recentSales, stockAlerts } from '../data/mockData';
import { Package, DollarSign, ShoppingCart, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const totalSales = recentSales.reduce((sum, sale) => sum + sale.amount, 0);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Products"
          value={totalProducts.toString()}
          icon={<Package className="w-6 h-6" />}
          color="bg-blue-500"
        />
        <DashboardCard
          title="Total Inventory Value"
          value={`$${totalValue.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6" />}
          color="bg-green-500"
        />
        <DashboardCard
          title="Recent Sales"
          value={`$${totalSales.toLocaleString()}`}
          icon={<ShoppingCart className="w-6 h-6" />}
          color="bg-purple-500"
        />
        <DashboardCard
          title="Low Stock Alerts"
          value={stockAlerts.length.toString()}
          icon={<AlertTriangle className="w-6 h-6" />}
          color="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductList />
        <StockAlertList />
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-full text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ProductList() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Products</h3>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center space-x-4">
            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-medium text-gray-800">{product.name}</p>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>
            <span className="text-sm text-gray-600">{product.stock} in stock</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StockAlertList() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Low Stock Alerts</h3>
      <div className="space-y-4">
        {stockAlerts.map((alert) => (
          <div key={alert.productId} className="flex items-center justify-between bg-red-50 p-4 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">{alert.productName}</p>
              <p className="text-sm text-red-600">Only {alert.currentStock} items left</p>
            </div>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Restock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}