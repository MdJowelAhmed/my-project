'use client';

import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { removeBookmark } from '@/lib/features/bookmark/bookmarkSlice';
import { addToCart } from '@/lib/features/cart/cartSlice';
import { useCartAnimation } from '@/hooks/useCartAnimation';
import { useWishlistAnimation } from '@/hooks/useWishlistAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, X, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const { animateToCart } = useCartAnimation();
  const { animateToWishlist } = useWishlistAnimation();
  const { bookmarkedProducts } = useAppSelector((state) => state.bookmark);

  const handleAddToCart = (product: Product, event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    
    animateToCart(button, {
      onComplete: () => {
        dispatch(addToCart(product));
      }
    });
  };

  const handleRemoveBookmark = (productId: string, event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      const button = event.currentTarget;
      
      animateToWishlist(button, {
        onComplete: () => {
          dispatch(removeBookmark(productId));
        }
      });
    } else {
      dispatch(removeBookmark(productId));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">
            {bookmarkedProducts.length} {bookmarkedProducts.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {bookmarkedProducts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground" />
              <h3 className="text-xl font-semibold">Your wishlist is empty</h3>
              <p className="text-muted-foreground">
                Save items you love by clicking the heart icon on any product.
              </p>
              <Link href="/products">
                <Button size="lg">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarkedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative">
                    <div
                      className="aspect-square w-full bg-cover bg-center bg-no-repeat rounded-t-lg"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={(e) => handleRemoveBookmark(product.id, e)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4 space-y-3">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={!product.inStock}
                        className="flex-1"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Link href={`/products/${product.id}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}