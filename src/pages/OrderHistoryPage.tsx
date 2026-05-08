import React, { useState } from 'react';
import { Package, Eye, Download, RefreshCw, Truck, CheckCircle2, Clock, AlertCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { mockOrders } from '../data/mockData';
import { formatPrice, formatDate } from '../lib/utils';

export function OrderHistoryPage() {
  const { user } = useAuth();
  const userOrders = mockOrders.filter(order => order.userId === user?.id);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'shipped':
        return <Truck className="h-5 w-5" />;
      case 'processing':
        return <Clock className="h-5 w-5" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const orderStats = {
    total: userOrders.length,
    delivered: userOrders.filter(o => o.status === 'delivered').length,
    processing: userOrders.filter(o => o.status === 'processing').length,
    shipped: userOrders.filter(o => o.status === 'shipped').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Order History</h1>
          <p className="text-blue-100">Track and manage all your orders in one place</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {userOrders.length === 0 ? (
          <Card className="shadow-lg border-0">
            <CardContent className="text-center py-16">
              <Package className="h-20 w-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-8 text-lg">You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <Button size="lg" onClick={() => window.location.href = '/'}>Start Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Order Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600 font-semibold mb-2">Total Orders</p>
                  <h3 className="text-4xl font-bold text-blue-600">{orderStats.total}</h3>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600 font-semibold mb-2">Delivered</p>
                  <h3 className="text-4xl font-bold text-green-600">{orderStats.delivered}</h3>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600 font-semibold mb-2">Shipped</p>
                  <h3 className="text-4xl font-bold text-blue-600">{orderStats.shipped}</h3>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600 font-semibold mb-2">Processing</p>
                  <h3 className="text-4xl font-bold text-yellow-600">{orderStats.processing}</h3>
                </CardContent>
              </Card>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {userOrders.map((order) => (
                <Card key={order.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden">
                  {/* Order Header (Always Visible) */}
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="w-full text-left"
                  >
                    <CardHeader className="pb-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items1-center gap-4 flex-1">
                          <div className={`p-3 rounded-lg ${getStatusBgColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                              <Badge variant={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              Placed on {formatDate(order.createdAt)} • {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{formatPrice(order.total)}</p>
                          <ChevronDown
                            className={`h-5 w-5 text-gray-400 ml-auto transition-transform ${
                              expandedOrder === order.id ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </CardHeader>
                  </button>

                  {/* Order Details (Expandable) */}
                  {expandedOrder === order.id && (
                    <CardContent className="space-y-6 pt-6 border-t">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-gray-900">{item.product.name}</h5>
                                <p className="text-sm text-gray-600 mt-1">
                                  Qty: {item.quantity} × {formatPrice(item.price)}
                                </p>
                                {item.selectedColor && (
                                  <p className="text-sm text-gray-600">
                                    Color: {item.selectedColor}
                                  </p>
                                )}
                              </div>
                              <div className="text-right font-medium text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Shipping Address</h5>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                            {order.shippingAddress.street}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Payment Information</h5>
                          <p className="text-sm text-gray-700 mb-2">
                            {order.paymentMethod.brand?.toUpperCase()} ending in {order.paymentMethod.last4}
                          </p>
                          {order.trackingNumber && (
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-1 text-sm">Tracking Number</h5>
                              <p className="text-sm text-gray-700 font-mono bg-white p-2 rounded border">{order.trackingNumber}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Order Timeline */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-4">Status Timeline</h5>
                        <div className="space-y-3">
                          {[
                            { status: 'processing', label: 'Order Placed', icon: Package },
                            { status: 'shipped', label: 'Shipped', icon: Truck },
                            { status: 'delivered', label: 'Delivered', icon: CheckCircle2 },
                          ].map((timeline, idx) => {
                            const isCompleted =
                              (order.status === 'delivered') ||
                              (order.status === 'shipped' && timeline.status !== 'delivered') ||
                              (order.status === 'processing' && timeline.status === 'processing');

                            const Icon = timeline.icon;
                            return (
                              <div key={timeline.status} className="flex items-center gap-4">
                                <div className={`p-2 rounded-full ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className={`font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {timeline.label}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {isCompleted ? 'Completed' : 'Pending'}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Download Invoice
                        </Button>
                        {order.status === 'delivered' && (
                          <Button variant="outline" size="sm" className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Reorder
                          </Button>
                        )}
                        {order.trackingNumber && (
                          <Button variant="outline" size="sm" className="gap-2">
                            <Truck className="h-4 w-4" />
                            Track Package
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}