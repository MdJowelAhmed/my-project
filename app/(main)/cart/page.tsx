'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { removeFromCart, updateQuantity, applyPromo, clearPromo } from '@/lib/features/cart/cartSlice';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { calculatePromoDiscount, findOfferByCode } from '@/lib/promo';
import { getCartTotals } from '@/lib/cartTotals';
import { mockOffers } from '@/data/mockData';
import { toast } from 'sonner';
import CheckoutSteps from '@/components/layout/CheckoutSteps';

export default function CartPage() {
  const { items, total, promoCode, promoDiscount } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [promoInput, setPromoInput] = useState(promoCode ?? '');
  const { tax, total: grandTotal } = getCartTotals(total, promoDiscount);

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.message('Sign in to save your order', {
        description: 'You will return here after login.',
      });
      router.push('/login?redirect=/checkout');
      return;
    }
    router.push('/checkout');
  };

  const handleApplyPromo = () => {
    const offer = findOfferByCode(promoInput);
    if (!offer) {
      toast.error('Invalid promo code', {
        description: `Try: ${mockOffers.map((o) => o.code).join(', ')}`,
      });
      return;
    }
    const discount = calculatePromoDiscount(total, promoInput);
    dispatch(applyPromo({ code: offer.code, discount }));
    toast.success(`Applied ${offer.code}`);
  };

  const handleClearPromo = () => {
    setPromoInput('');
    dispatch(clearPromo());
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
          <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
          <p className="text-lg text-muted-foreground">
            Looks like you have not added any items to your cart yet.
          </p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-28 lg:pb-8">
      <div className="space-y-8">
        <CheckoutSteps current="cart" />
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        {!isAuthenticated && (
          <div className="rounded-lg border bg-muted/50 px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span>Sign in to checkout and track orders in your dashboard.</span>
            <Link href="/login?redirect=/checkout">
              <Button size="sm" variant="secondary">
                Sign in
              </Button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-20 h-20 bg-cover bg-center bg-no-repeat rounded-lg flex-shrink-0"
                      style={{ backgroundImage: `url(${item.product.image})` }}
                    />
                    
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Category: {item.product.category}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-primary">${item.product.price}</span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right space-y-2">
                      <div className="font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} items)</span>
                    <span>${(total || 0).toFixed(2)}</span>
                  </div>
                  {promoDiscount > 0 && promoCode && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo ({promoCode})</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button onClick={handleCheckout} className="w-full" size="lg">
                  Proceed to Checkout
                </Button>

                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-medium">Have a promo code?</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="e.g. NEWYEAR25"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <Button type="button" variant="outline" onClick={handleApplyPromo}>
                    Apply
                  </Button>
                </div>
                {promoCode && (
                  <Button type="button" variant="ghost" size="sm" onClick={handleClearPromo}>
                    Remove {promoCode}
                  </Button>
                )}
                <p className="text-xs text-muted-foreground">
                  Demo codes: {mockOffers.map((o) => o.code).join(', ')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur p-4 lg:hidden">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold">${grandTotal.toFixed(2)}</p>
          </div>
          <Button onClick={handleCheckout} size="lg" className="flex-1 max-w-xs">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}