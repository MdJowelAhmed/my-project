'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Order } from '@/types';
import { Eye, Download, Package } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';

export default function OrdersPage() {
  const orders = useAppSelector((state) => state.orders.orders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'processing':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {order.items.length} items • Ordered on {order.orderDate}
                  </div>
                  <div className="font-bold text-primary">${order.total}</div>
                </div>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
                      <DialogHeader>
                        <DialogTitle>Order Details - #{order.id}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* Order Status */}
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Status:</span>
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-4">
                          <h4 className="font-medium">Items Ordered:</h4>
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                              <div
                                className="w-16 h-16 bg-cover bg-center bg-no-repeat rounded-lg"
                                style={{ backgroundImage: `url(${item.product.image})` }}
                              />
                              <div className="flex-1">
                                <h5 className="font-medium">{item.product.name}</h5>
                                <p className="text-sm text-muted-foreground">
                                  Quantity: {item.quantity} • ${item.product.price} each
                                </p>
                              </div>
                              <div className="font-bold">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Shipping Info */}
                        <div className="space-y-2">
                          <h4 className="font-medium">Shipping Address:</h4>
                          <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
                        </div>

                        {/* Payment Info */}
                        <div className="space-y-2">
                          <h4 className="font-medium">Payment Method:</h4>
                          <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                        </div>

                        {/* Order Total */}
                        <div className="border-t pt-4 space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span className="text-green-600">Free</span>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>

                        <Button className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download Invoice
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Invoice
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {orders.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center space-y-4">
              <Package className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-xl font-semibold">No Orders Yet</h3>
              <p className="text-muted-foreground">
                When you place your first order, it will appear here.
              </p>
              <Link href="/products">
                <Button>Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}