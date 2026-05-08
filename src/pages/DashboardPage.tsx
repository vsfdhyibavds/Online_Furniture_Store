import React, { useState } from 'react';
import { User, Package, Heart, Settings, MapPin, CreditCard, Edit } from 'lucide-react';
import { User, Package, Heart, Settings, MapPin, Edit, Trash2, Plus, ShoppingBag, TrendingUp, Award, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../contexts/AuthContext';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { formatPrice, formatDate } from '../lib/utils';
import { useToast } from '../hooks/use-toast';

export function DashboardPage() {
  const { user, updateProfile, changePassword } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { data: ordersData } = useQuery({
    queryKey: ['my-orders'],
    queryFn: () => apiClient.getMyOrders(),
  });

  const { data: wishlistData } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => apiClient.getWishlist(),
  });

  const { data: addressesData } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => apiClient.getAddresses(),
  });

  const userOrders = ordersData?.data || [];
  const wishlistItems = wishlistData?.data || [];
  const addresses = addressesData?.data || [];

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match.",
        variant: "destructive",
      });
      return;
    }

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'processing':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'shipped':
        return <ShoppingBag className="h-4 w-4" />;
      case 'processing':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Account</h1>
          <p className="text-blue-100">Welcome back, {user?.firstName}!</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-gray-600 text-sm truncate">{user?.email}</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mb-6">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Member Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Award className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-gray-900">Premium Member</span>
                  </div>
                </div>

                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Account Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm font-semibold">Total Orders</p>
                          <h3 className="text-3xl font-bold text-gray-900 mt-2">{userOrders.length}</h3>
                        </div>
                        <Package className="h-12 w-12 text-blue-600 opacity-20" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm font-semibold">Wishlist Items</p>
                          <h3 className="text-3xl font-bold text-gray-900 mt-2">{wishlistItems.length}</h3>
                        </div>
                        <Heart className="h-12 w-12 text-red-600 opacity-20" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm font-semibold">Total Spent</p>
                          <h3 className="text-3xl font-bold text-gray-900 mt-2">{formatPrice(totalSpent)}</h3>
                        </div>
                        <TrendingUp className="h-12 w-12 text-green-600 opacity-20" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm font-semibold">Saved Addresses</p>
                          <h3 className="text-3xl font-bold text-gray-900 mt-2">{addresses.length}</h3>
                        </div>
                        <MapPin className="h-12 w-12 text-purple-600 opacity-20" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  {userOrders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                      <Button onClick={() => window.location.href = '/'}>Start Shopping</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userOrders.slice(0, 5).map((order: any) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Order #{order.id}</h4>
                            <p className="text-sm text-gray-600">
                              {formatDate(order.createdAt)} • {order.items.length} items
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatPrice(order.total)}</p>
                            <p className="text-sm text-gray-600 capitalize">{order.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
                {/* Recent Orders */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="border-b bg-gray-50">
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Orders</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab('orders')}>
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {userOrders.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                        <Button onClick={() => window.location.href = '/'}>Start Shopping</Button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {userOrders.slice(0, 5).map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">Order #{order.id}</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {formatDate(order.createdAt)} • {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                            <div className="text-right mr-4">
                              <p className="font-bold text-gray-900">{formatPrice(order.total)}</p>
                              <Badge variant={getStatusColor(order.status)} className="mt-1 gap-1">
                                {getStatusIcon(order.status)}
                                <span className="capitalize">{order.status}</span>
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

          {activeTab === 'orders' && (
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {userOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                    <Button onClick={() => window.location.href = '/'}>Start Shopping</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order: any) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium">Order #{order.id}</h4>
                            <p className="text-sm text-gray-600">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatPrice(order.total)}</p>
                            <p className="text-sm text-gray-600 capitalize">{order.status}</p>
            {activeTab === 'orders' && (
              <Card className="shadow-lg border-0">
                <CardHeader className="border-b bg-gray-50">
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {userOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                      <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                      <Button onClick={() => window.location.href = '/'}>Start Shopping</Button>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {userOrders.map((order) => (
                        <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-900">Order #{order.id}</h4>
                              <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{formatPrice(order.total)}</p>
                              <Badge variant={getStatusColor(order.status)} className="mt-1 gap-1">
                                {getStatusIcon(order.status)}
                                <span className="capitalize">{order.status}</span>
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {order.items.slice(0, 3).map((item: any) => (
                            <div key={item.id} className="flex items-center space-x-3">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="text-sm font-medium">{item.productName}</p>
                                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {order.items.slice(0, 4).map((item) => (
                              <div key={item.id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                                <img
                                  src={item.productImage}
                                  alt={item.productName}
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 truncate">{item.productName}</p>
                                  <p className="text-xs text-gray-600">×{item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

          {activeTab === 'wishlist' && (
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-4">Save items you love to your wishlist.</p>
                    <Button onClick={() => window.location.href = '/'}>Start Shopping</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map((item: any) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                        <h4 className="font-medium mb-2">{item.productName}</h4>
                        <p className="text-primary font-bold">{formatPrice(item.productPrice)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
            {activeTab === 'wishlist' && (
              <Card className="shadow-lg border-0">
                <CardHeader className="border-b bg-gray-50">
                  <CardTitle>My Wishlist</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                      <p className="text-gray-600 mb-6">Save items you love to your wishlist.</p>
                      <Button onClick={() => window.location.href = '/'}>Start Shopping</Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((item) => (
                        <Card key={item.id} className="border-0 shadow hover:shadow-lg transition-shadow">
                          <CardContent className="p-0">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                              <h4 className="font-semibold text-gray-900 line-clamp-2">{item.productName}</h4>
                              <p className="text-lg font-bold text-blue-600 mt-2">{formatPrice(item.productPrice)}</p>
                              <div className="flex gap-2 mt-4">
                                <Button className="flex-1" size="sm">Add to Cart</Button>
                                <Button variant="outline" size="sm"><Trash2 className="h-4 w-4" /></Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

          {activeTab === 'addresses' && (
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                {addresses.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
                    <p className="text-gray-600 mb-4">Add an address for faster checkout.</p>
                    <Button>Add Address</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((address: any) => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">
                            {address.firstName} {address.lastName}
                          </h4>
                          {address.isDefault && (
                            <Badge>Default</Badge>
                          )}
                        </div>
                        <p className="text-gray-600">
                          {address.street}<br />
                          {address.city}, {address.state} {address.zipCode}<br />
                          {address.country}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
            {activeTab === 'addresses' && (
              <Card className="shadow-lg border-0">
                <CardHeader className="border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle>Saved Addresses</CardTitle>
                    <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add Address</Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {addresses.length === 0 ? (
                    <div className="text-center py-12">
                      <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
                      <p className="text-gray-600 mb-6">Add an address for faster checkout.</p>
                      <Button>Add Your First Address</Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses.map((address) => (
                        <Card key={address.id} className={`border-2 ${address.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-gray-900">
                                {address.firstName} {address.lastName}
                              </h4>
                              {address.isDefault && <Badge className="bg-blue-600">Default</Badge>}
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                              {address.street}<br />
                              {address.city}, {address.state} {address.zipCode}<br />
                              {address.country}
                            </p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1 gap-2">
                                <Edit className="h-4 w-4" /> Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="flex-1 gap-2">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Profile Settings */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="border-b bg-gray-50">
                    <div className="flex items-center justify-between">
                      <CardTitle>Profile Information</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        {isEditing ? 'Cancel' : 'Edit'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {isEditing ? (
                      <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                            <Input
                              value={profileData.firstName}
                              onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                            <Input
                              value={profileData.lastName}
                              onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <Input
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <Button type="submit" className="w-full">Save Changes</Button>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                            <p className="text-gray-900 text-lg font-semibold">{user?.firstName}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                            <p className="text-gray-900 text-lg font-semibold">{user?.lastName}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <p className="text-gray-900 text-lg font-semibold">{user?.email}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                            <p className="text-gray-900 text-lg font-semibold">{user?.phone || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Password Change */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="border-b bg-gray-50">
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <Input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <Input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <Input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">Change Password</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}