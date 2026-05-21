import React, { useState } from 'react';
import { Package, Truck, CheckCircle2, MapPin, Clock, AlertCircle, Search, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

export function TrackOrderPage() {
  const [searchType, setSearchType] = useState('orderNumber');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderFound, setOrderFound] = useState(false);

  const mockTrackingData = {
    orderNumber: 'ORD-2024-5789',
    date: 'May 15, 2024',
    status: 'In Transit',
    estimatedDelivery: 'May 22, 2024',
    trackingNumber: 'TRK1234567890',
    carrier: 'FedEx',
    items: [
      { name: 'Modern Leather Sofa', quantity: 1, price: '$899' },
      { name: 'Coffee Table Set', quantity: 1, price: '$299' },
    ],
    timeline: [
      {
        status: 'Order Placed',
        date: 'May 15, 2024',
        time: '2:30 PM',
        location: 'Online',
        completed: true,
        icon: Package,
      },
      {
        status: 'Processing',
        date: 'May 16, 2024',
        time: '9:00 AM',
        location: 'Warehouse',
        completed: true,
        icon: Clock,
      },
      {
        status: 'Shipped',
        date: 'May 17, 2024',
        time: '3:15 PM',
        location: 'Distribution Center',
        completed: true,
        icon: Truck,
      },
      {
        status: 'In Transit',
        date: 'May 20, 2024',
        time: '1:45 PM',
        location: 'Regional Hub, Chicago IL',
        completed: true,
        icon: MapPin,
      },
      {
        status: 'Out for Delivery',
        date: 'May 22, 2024',
        time: 'Expected',
        location: 'Your Address',
        completed: false,
        icon: Truck,
      },
      {
        status: 'Delivered',
        date: 'May 22, 2024',
        time: 'Expected',
        location: 'Your Address',
        completed: false,
        icon: CheckCircle2,
      },
    ],
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setOrderFound(true);
    }
  };

  const frequentlyTracked = [
    { label: 'My Recent Orders', count: 3 },
    { label: 'Delivered', count: 12 },
    { label: 'In Transit', count: 1 },
    { label: 'Processing', count: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Track Your Order</h1>
          </div>
          <p className="text-green-100 text-lg">Real-time tracking for your furniture delivery</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="mb-12">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle>Find Your Order</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="orderNumber"
                      checked={searchType === 'orderNumber'}
                      onChange={e => setSearchType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-medium text-gray-700">Order Number</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="email"
                      checked={searchType === 'email'}
                      onChange={e => setSearchType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-medium text-gray-700">Email Address</span>
                  </label>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder={
                      searchType === 'orderNumber'
                        ? 'Enter order number (e.g., ORD-2024-5789)'
                        : 'Enter email address'
                    }
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="lg" className="bg-green-600 hover:bg-green-700">
                    <Search className="h-4 w-4 mr-2" />
                    Track
                  </Button>
                </div>
              </form>

              {/* Quick Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-4">Quick Access</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {frequentlyTracked.map((item, idx) => (
                    <button
                      key={idx}
                      className="p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all text-left"
                    >
                      <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                      <p className="text-2xl font-bold text-green-600 mt-2">{item.count}</p>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tracking Details */}
        {orderFound && (
          <div className="space-y-8">
            {/* Order Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Order {mockTrackingData.orderNumber}</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">
                      Ordered on {mockTrackingData.date}
                    </p>
                  </div>
                  <Badge className="w-fit bg-green-600">
                    {mockTrackingData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                    <p className="font-semibold text-gray-900">{mockTrackingData.trackingNumber}</p>
                    <p className="text-xs text-gray-500 mt-1">via {mockTrackingData.carrier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                    <p className="font-semibold text-gray-900">{mockTrackingData.estimatedDelivery}</p>
                    <p className="text-xs text-gray-500 mt-1">Tuesday 9 AM - 5 PM</p>
                  </div>
                  <div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View on Carrier Site
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items in Order */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Items in This Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTrackingData.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">{item.price}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Delivery Timeline</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {mockTrackingData.timeline.map((event, idx) => {
                    const Icon = event.icon;
                    return (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex items-center justify-center h-12 w-12 rounded-full ${
                              event.completed
                                ? 'bg-green-100'
                                : 'bg-gray-100'
                            }`}
                          >
                            <Icon
                              className={`h-6 w-6 ${
                                event.completed
                                  ? 'text-green-600'
                                  : 'text-gray-400'
                              }`}
                            />
                          </div>
                          {idx < mockTrackingData.timeline.length - 1 && (
                            <div
                              className={`w-0.5 h-12 mt-2 ${
                                event.completed
                                  ? 'bg-green-600'
                                  : 'bg-gray-200'
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1 pt-2">
                          <h3 className="font-semibold text-gray-900">
                            {event.status}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {event.date} at {event.time}
                          </p>
                          <p className="text-sm text-gray-500">{event.location}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="border-0 shadow-lg bg-blue-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Need Help?
                </h3>
                <p className="text-gray-600 mb-4">
                  Can't find your order or have questions about your delivery?
                </p>
                <Button variant="outline" className="w-full md:w-auto">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!orderFound && (
          <Card className="border-0 shadow-lg text-center py-12">
            <CardContent>
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Enter your order details to get started
              </h3>
              <p className="text-gray-600">
                Use your order number or email address to track your furniture delivery
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
