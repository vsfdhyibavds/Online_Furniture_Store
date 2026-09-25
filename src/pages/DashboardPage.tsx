import { useState } from 'react';
import type { ReactElement } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Heart,
  MapPin,
  Package,
  Settings,
  ShoppingBag,
  TrendingUp,
  User,
  Plus,
  Trash2,
  Pencil,
  Star,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../lib/api';
import { formatDate, formatPrice } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import type { Address } from '../types';

type Tab = 'overview' | 'orders' | 'wishlist' | 'addresses' | 'settings';

export function DashboardPage() {
  const { user, isAuthenticated, updateProfile, changePassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

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

  const { data: addressesData } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => apiClient.getAddresses(),
    enabled: !!user,
  });

  const userOrders = ordersData?.data || [];
  const wishlistItems = wishlistData?.data || [];
  const addresses = addressesData?.data || [];
  const totalSpent = userOrders.reduce((sum: number, order: any) => sum + order.total, 0);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
        <Button onClick={() => navigate('/auth')}>Sign In</Button>
      </div>
    );
  }

  const navItems: { label: string; icon: typeof User; tab: Tab }[] = [
    { label: 'Overview', icon: User, tab: 'overview' },
    { label: 'Orders', icon: Package, tab: 'orders' },
    { label: 'Wishlist', icon: Heart, tab: 'wishlist' },
    { label: 'Addresses', icon: MapPin, tab: 'addresses' },
    { label: 'Settings', icon: Settings, tab: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 text-4xl font-bold">My Account</h1>
          <p className="text-blue-100">Welcome back{user?.firstName ? `, ${user.firstName}` : ''}.</p>
        </div>
      </section>

      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 lg:grid-cols-4">
        {/* Sidebar */}
        <Card className="h-fit shadow-lg lg:col-span-1">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600">
                <User className="h-7 w-7 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-gray-900">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Member'}
                </h2>
                <p className="truncate text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.tab;
                return (
                  <button
                    key={item.label}
                    onClick={() => setActiveTab(item.tab)}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-50 font-semibold text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-6 lg:col-span-3">
          {activeTab === 'overview' && (
            <OverviewTab
              userOrders={userOrders}
              wishlistCount={wishlistItems.length}
              addressCount={addresses.length}
              totalSpent={totalSpent}
              onTabChange={setActiveTab}
            />
          )}
          {activeTab === 'orders' && <OrdersTab userOrders={userOrders} />}
          {activeTab === 'wishlist' && <WishlistTab items={wishlistItems} />}
          {activeTab === 'addresses' && (
            <AddressesTab addresses={addresses} />
          )}
          {activeTab === 'settings' && (
            <SettingsTab
              firstName={user?.firstName || ''}
              lastName={user?.lastName || ''}
              email={user?.email || ''}
              onUpdateProfile={updateProfile}
              onChangePassword={changePassword}
              toast={toast}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function OverviewTab({
  userOrders,
  wishlistCount,
  addressCount,
  totalSpent,
  onTabChange,
}: {
  userOrders: any[];
  wishlistCount: number;
  addressCount: number;
  totalSpent: number;
  onTabChange: (tab: Tab) => void;
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <StatCard title="Total Orders" value={userOrders.length.toString()} icon={<Package />} tone="blue" />
        <StatCard title="Wishlist Items" value={wishlistCount.toString()} icon={<Heart />} tone="red" />
        <StatCard title="Total Spent" value={formatPrice(totalSpent)} icon={<TrendingUp />} tone="green" />
        <StatCard title="Saved Addresses" value={addressCount.toString()} icon={<MapPin />} tone="blue" />
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm" onClick={() => onTabChange('orders')}>View All</Button>
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
    </>
  );
}

function OrdersTab({ userOrders }: { userOrders: any[] }) {
  const navigate = useNavigate();

  if (userOrders.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No orders yet</p>
          <Button onClick={() => navigate('/')}>Start Shopping</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {userOrders.map((order: any) => (
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
        ))}
      </CardContent>
    </Card>
  );
}

function WishlistTab({ items }: { items: any[] }) {
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-12 text-center">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Your wishlist is empty</p>
          <Button onClick={() => navigate('/')}>Browse Products</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle>Wishlist ({items.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {items.map((item: any) => (
          <div key={item.id} className="flex items-center gap-4 border-b p-6 last:border-b-0">
            <img src={item.productImage} alt={item.productName} className="h-16 w-16 rounded object-cover" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.productName}</h3>
              <p className="text-sm text-gray-600">{formatPrice(item.productPrice)}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate(`/product/${item.productId}`)}>
              View
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function AddressesTab({ addresses }: { addresses: Address[] }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    label: 'Home',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
    isDefault: false,
  });

  const addMutation = useMutation({
    mutationFn: (data: typeof formData) =>
      apiClient.addAddress({
        label: data.label,
        firstName: data.firstName,
        lastName: data.lastName,
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        phone: data.phone,
        isDefault: data.isDefault,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setShowForm(false);
      resetForm();
      toast({ title: 'Address saved' });
    },
    onError: (err: Error) => {
      toast({ title: 'Failed to save address', description: err.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: typeof formData }) =>
      apiClient.updateAddress(id, {
        label: data.label,
        firstName: data.firstName,
        lastName: data.lastName,
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        phone: data.phone,
        isDefault: data.isDefault,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setShowForm(false);
      setEditingId(null);
      resetForm();
      toast({ title: 'Address updated' });
    },
    onError: (err: Error) => {
      toast({ title: 'Failed to update address', description: err.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast({ title: 'Address deleted' });
    },
    onError: (err: Error) => {
      toast({ title: 'Failed to delete address', description: err.message, variant: 'destructive' });
    },
  });

  function resetForm() {
    setFormData({
      label: 'Home',
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
      phone: '',
      isDefault: false,
    });
  }

  function startEdit(addr: Address) {
    setEditingId(addr.id);
    setShowForm(true);
    setFormData({
      label: addr.label,
      firstName: addr.firstName,
      lastName: addr.lastName,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zipCode: addr.zipCode,
      country: addr.country,
      phone: addr.phone || '',
      isDefault: addr.isDefault,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      addMutation.mutate(formData);
    }
  }

  const fieldLabels: { name: keyof typeof formData; label: string; placeholder?: string; full?: boolean }[] = [
    { name: 'label', label: 'Label (e.g. Home, Work)' },
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'street', label: 'Street Address', full: true },
    { name: 'city', label: 'City' },
    { name: 'state', label: 'State' },
    { name: 'zipCode', label: 'ZIP Code' },
    { name: 'country', label: 'Country' },
    { name: 'phone', label: 'Phone (optional)', full: true },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <CardTitle>Saved Addresses</CardTitle>
          {!showForm && (
            <Button size="sm" onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }}>
              <Plus className="mr-1 h-4 w-4" />
              Add Address
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {showForm && (
          <form onSubmit={handleSubmit} className="border-b bg-gray-50 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {fieldLabels.map(field => (
                <div key={field.name} className={field.full ? 'md:col-span-2' : ''}>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">{field.label}</label>
                  <Input
                    name={field.name}
                    value={formData[field.name]}
                    onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    required={field.name !== 'phone'}
                  />
                </div>
              ))}
            </div>
            <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={formData.isDefault}
                onChange={e => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                className="h-4 w-4 rounded border-gray-300"
              />
              Set as default address
            </label>
            <div className="mt-4 flex gap-3">
              <Button type="submit" disabled={addMutation.isPending || updateMutation.isPending}>
                {editingId ? 'Save Changes' : 'Save Address'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => { setShowForm(false); setEditingId(null); resetForm(); }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {addresses.length === 0 && !showForm ? (
          <div className="p-12 text-center">
            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No saved addresses yet</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-1 h-4 w-4" />
              Add Your First Address
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {addresses.map(addr => (
              <div key={addr.id} className="flex items-start justify-between p-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-50 p-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{addr.label}</h3>
                      {addr.isDefault && (
                        <Badge>
                          <Star className="mr-1 h-3 w-3" />
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {addr.firstName} {addr.lastName}<br />
                      {addr.street}<br />
                      {addr.city}, {addr.state} {addr.zipCode}<br />
                      {addr.country}
                      {addr.phone && <><br />{addr.phone}</>}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => startEdit(addr)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMutation.mutate(addr.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SettingsTab({
  firstName,
  lastName,
  email,
  onUpdateProfile,
  onChangePassword,
  toast,
}: {
  firstName: string;
  lastName: string;
  email: string;
  onUpdateProfile: (updates: { firstName?: string; lastName?: string }) => Promise<void>;
  onChangePassword: (current: string, next: string) => Promise<void>;
  toast: ReturnType<typeof useToast>['toast'];
}) {
  const [profileData, setProfileData] = useState({ firstName, lastName });
  const [passwordData, setPasswordData] = useState({ current: '', next: '', confirm: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await onUpdateProfile({ firstName: profileData.firstName, lastName: profileData.lastName });
      toast({ title: 'Profile updated successfully' });
    } catch (err) {
      toast({
        title: 'Update failed',
        description: err instanceof Error ? err.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (passwordData.next !== passwordData.confirm) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (passwordData.next.length < 6) {
      toast({ title: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }
    setSavingPassword(true);
    try {
      await onChangePassword(passwordData.current, passwordData.next);
      toast({ title: 'Password changed successfully' });
      setPasswordData({ current: '', next: '', confirm: '' });
    } catch (err) {
      toast({
        title: 'Password change failed',
        description: err instanceof Error ? err.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <>
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">First Name</label>
                <Input
                  value={profileData.firstName}
                  onChange={e => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Last Name</label>
                <Input
                  value={profileData.lastName}
                  onChange={e => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <Input value={email} disabled className="bg-gray-100" />
              <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
            </div>
            <Button type="submit" disabled={savingProfile}>
              {savingProfile ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Current Password</label>
              <Input
                type="password"
                value={passwordData.current}
                onChange={e => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">New Password</label>
                <Input
                  type="password"
                  value={passwordData.next}
                  onChange={e => setPasswordData(prev => ({ ...prev, next: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Confirm New Password</label>
                <Input
                  type="password"
                  value={passwordData.confirm}
                  onChange={e => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={savingPassword}>
              {savingPassword ? 'Changing...' : 'Change Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
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
  tone: 'blue' | 'red' | 'green';
}) {
  const tones = {
    blue: 'from-blue-50 to-blue-100 text-blue-600',
    red: 'from-red-50 to-red-100 text-red-600',
    green: 'from-green-50 to-green-100 text-green-600',
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
