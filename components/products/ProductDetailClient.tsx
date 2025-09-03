'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addToCart } from '@/lib/features/cart/cartSlice';
import { toggleBookmark } from '@/lib/features/bookmark/bookmarkSlice';
import { useCartAnimation } from '@/hooks/useCartAnimation';
import { Product } from '@/types';
import { ShoppingCart, Star, Minus, Plus, ArrowLeft, Heart } from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { animateToCart } = useCartAnimation();
  const [quantity, setQuantity] = useState(1);
  
  // Check if product is bookmarked
  const bookmarkedProducts = useAppSelector((state) => state.bookmark.bookmarkedProducts);
  const isBookmarked = bookmarkedProducts.some((p) => p.id === product.id);

  const handleAddToCart = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      const button = event.currentTarget;
      animateToCart(button, {
        onComplete: () => {
          for (let i = 0; i < quantity; i++) {
            dispatch(addToCart(product));
          }
        }
      });
    } else {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const handleBookmark = () => {
    dispatch(toggleBookmark(product));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <div
                className="aspect-square w-full bg-cover bg-center bg-no-repeat rounded-lg"
                style={{ backgroundImage: `url(${product.image})` }}
              />
              {product.originalPrice && (
                <Badge className="absolute top-4 left-4 bg-red-500">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant={product.inStock ? "default" : "destructive"}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {product.category}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <Separator />

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={(e) => handleAddToCart(e)}
                  disabled={!product.inStock}
                  className="flex-1"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1"
                >
                  Buy Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleBookmark}
                  className={isBookmarked ? 'text-red-500 border-red-500 hover:bg-red-50' : ''}
                >
                  <Heart className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Free shipping</span>
                  <span>Orders over $50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Returns</span>
                  <span>30-day return policy</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Warranty</span>
                  <span>1-year manufacturer warranty</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}