'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { clearCart } from '@/lib/features/cart/cartSlice';
import { addOrder } from '@/lib/features/orders/ordersSlice';
import { getCartTotals } from '@/lib/cartTotals';
import { Order } from '@/types';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, total, promoCode, promoDiscount } = useAppSelector((state) => state.cart);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [shippingAddress, setShippingAddress] = useState(user?.address ?? '');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const { tax, total: orderTotal } = getCartTotals(total, promoDiscount);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login?redirect=/checkout');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (user?.address && !shippingAddress) {
      setShippingAddress(user.address);
    }
  }, [user?.address, shippingAddress]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Redirecting to sign in...</p>
      </div>
    );
  }

  if (placedOrderId) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg">
        <Card>
          <CardContent className="p-8 text-center space-y-6">
            <CheckCircle2 className="h-16 w-16 mx-auto text-green-600" />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Order placed!</h1>
              <p className="text-muted-foreground">
                Thank you. Your mock order <strong>#{placedOrderId}</strong> has been saved to your
                dashboard.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard/orders">
                <Button>View orders</Button>
              </Link>
              <Link href="/products">
                <Button variant="outline">Continue shopping</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-6">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
        <h1 className="text-3xl font-bold">Nothing to checkout</h1>
        <p className="text-muted-foreground">Add items to your cart first.</p>
        <Link href="/products">
          <Button size="lg">Browse products</Button>
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingAddress.trim()) {
      toast.error('Please enter a shipping address.');
      return;
    }

    setIsSubmitting(true);

    const orderId = `ORD-${Date.now()}`;
    const order: Order = {
      id: orderId,
      items: items.map((item) => ({ ...item, product: { ...item.product } })),
      total: Number(orderTotal.toFixed(2)),
      status: 'processing',
      orderDate: new Date().toISOString().slice(0, 10),
      shippingAddress: shippingAddress.trim(),
      paymentMethod,
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    setPlacedOrderId(orderId);
    setIsSubmitting(false);
    toast.success('Order placed successfully (demo).');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">Demo checkout — no real payment is processed.</p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Shipping</h2>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Street, city, country"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Payment method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['Credit Card', 'PayPal', 'Bank Transfer'].map((method) => (
                    <Button
                      key={method}
                      type="button"
                      variant={paymentMethod === method ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod(method)}
                    >
                      {method}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Summary</h2>
                <ul className="text-sm space-y-2">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between gap-2">
                      <span className="text-muted-foreground truncate">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  {promoCode && promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo ({promoCode})</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Placing order...' : 'Place order'}
                </Button>
                <Link href="/cart">
                  <Button type="button" variant="outline" className="w-full">
                    Back to cart
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
