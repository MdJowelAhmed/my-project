'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/hooks';
import { mockOrders } from '@/data/mockData';
import { Package, DollarSign, Heart, Clock, Gift, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  
  const recentOrders = mockOrders.slice(0, 3);
  const totalOrders = mockOrders.length;
  const totalSpent = mockOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your account.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cart Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{items.length}</div>
            <p className="text-xs text-muted-foreground">Items in cart</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Login</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Link href="/dashboard/orders">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="font-medium">Order #{order.id}</div>
                <div className="text-sm text-muted-foreground">
                  {order.items.length} items • {order.orderDate}
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="font-bold">${order.total}</div>
                <Badge 
                  variant={
                    order.status === 'delivered' ? 'default' :
                    order.status === 'shipped' ? 'secondary' :
                    order.status === 'processing' ? 'default' : 'destructive'
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
          
          {recentOrders.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No orders yet</p>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/products">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center space-y-4">
              <Package className="h-8 w-8 mx-auto text-primary" />
              <div>
                <h3 className="font-semibold">Browse Products</h3>
                <p className="text-sm text-muted-foreground">Discover new items</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/offers">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center space-y-4">
              <Gift className="h-8 w-8 mx-auto text-primary" />
              <div>
                <h3 className="font-semibold">View Offers</h3>
                <p className="text-sm text-muted-foreground">Check available deals</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/support">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center space-y-4">
              <MessageCircle className="h-8 w-8 mx-auto text-primary" />
              <div>
                <h3 className="font-semibold">Get Support</h3>
                <p className="text-sm text-muted-foreground">Chat with our team</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}