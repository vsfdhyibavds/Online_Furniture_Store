import { Heart, MapPin, Package, Settings, ShoppingBag, TrendingUp, User } from 'lucide-react';
import type { ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../lib/api';
import { formatDate, formatPrice } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { data: ordersData } = useQuery({
    queryKey: ['orders'],
    queryFn: () => apiClient.getMyOrders(),
    enabled: !!user,
  });

  const { data: wishlistData } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => apiClient.getWishlist(),
    enabled: !!user,
  });

  const userOrders = ordersData?.data || [];
  const wishlistCount = wishlistData?.data?.length || 0;
  const totalSpent = userOrders.reduce((sum: number, order: any) => sum + order.total, 0);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
        <Button onClick={() => navigate('/auth')}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 text-4xl font-bold">My Account</h1>
          <p className="text-blue-100">Welcome back{user?.firstName ? `, ${user.firstName}` : ''}.</p>
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
                <h2 className="text-lg font-semibold text-gray-900">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Member'}
                </h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            <nav className="space-y-2">
              {[
                { label: 'Overview', icon: User, path: '/dashboard' },
                { label: 'Orders', icon: Package, path: '/orders' },
                { label: 'Wishlist', icon: Heart, path: '/wishlist' },
                { label: 'Addresses', icon: MapPin, path: '/dashboard' },
                { label: 'Settings', icon: Settings, path: '/dashboard' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
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
            <StatCard title="Saved Addresses" value="0" icon={<MapPin />} tone="purple" />
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm" onClick={() => navigate('/orders')}>View All</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {userOrders.length === 0 ? (
                <div className="p-12 text-center">
                  <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No orders yet</p>
                  <Button onClick={() => navigate('/')}>Start Shopping</Button>
                </div>
              ) : (
                userOrders.slice(0, 5).map((order: any) => (
                  <div key={order.id} className="border-b p-6 last:border-b-0">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">Order #{order.id.slice(0, 8)}</h3>
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
                      {order.items.slice(0, 3).map((item: any) => (
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
                ))
              )}
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
