import { Heart, MapPin, Package, Settings, ShoppingBag, TrendingUp, User } from 'lucide-react';
import type { ReactElement } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { mockOrders } from '../data/mockData';
import { formatDate, formatPrice } from '../lib/utils';

export function DashboardPage() {
  const userOrders = mockOrders;
  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
  const wishlistCount = 3;
  const addressCount = 2;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 text-4xl font-bold">My Account</h1>
          <p className="text-blue-100">Welcome back to your furniture dashboard.</p>
        </div>
      </section>

      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 lg:grid-cols-4">
        <Card className="h-fit shadow-lg lg:col-span-1">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600">
                <User className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Premium Member</h2>
                <p className="text-sm text-gray-600">Furniture Store</p>
              </div>
            </div>
            <nav className="space-y-2">
              {[
                { label: 'Overview', icon: User },
                { label: 'Orders', icon: Package },
                { label: 'Wishlist', icon: Heart },
                { label: 'Addresses', icon: MapPin },
                { label: 'Settings', icon: Settings },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <StatCard title="Total Orders" value={userOrders.length.toString()} icon={<Package />} tone="blue" />
            <StatCard title="Wishlist Items" value={wishlistCount.toString()} icon={<Heart />} tone="red" />
            <StatCard title="Total Spent" value={formatPrice(totalSpent)} icon={<TrendingUp />} tone="green" />
            <StatCard title="Saved Addresses" value={addressCount.toString()} icon={<MapPin />} tone="purple" />
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {userOrders.map(order => (
                <div key={order.id} className="border-b p-6 last:border-b-0">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.createdAt)} - {order.items.length} item{order.items.length === 1 ? '' : 's'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatPrice(order.total)}</p>
                      <Badge className="mt-1 gap-1 capitalize">
                        <ShoppingBag className="h-3.5 w-3.5" />
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                        <img src={item.productImage} alt={item.productName} className="h-12 w-12 rounded object-cover" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                          <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  tone,
}: {
  title: string;
  value: string;
  icon: ReactElement;
  tone: 'blue' | 'red' | 'green' | 'purple';
}) {
  const tones = {
    blue: 'from-blue-50 to-blue-100 text-blue-600',
    red: 'from-red-50 to-red-100 text-red-600',
    green: 'from-green-50 to-green-100 text-green-600',
    purple: 'from-purple-50 to-purple-100 text-purple-600',
  };

  return (
    <Card className={`border-0 bg-gradient-to-br shadow-lg ${tones[tone]}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-600">{title}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          </div>
          <div className="opacity-25">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
