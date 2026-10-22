'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ProductCard } from '@/components/ui/ProductCard';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addToCart } from '@/lib/features/cart/cartSlice';
import { toggleBookmark } from '@/lib/features/bookmark/bookmarkSlice';
import { useCartAnimation } from '@/hooks/useCartAnimation';
import { useWishlistAnimation } from '@/hooks/useWishlistAnimation';
import { mockProducts } from '@/data/mockData';
import { Product } from '@/types';
import { ShoppingCart, Star, Minus, Plus, ArrowLeft, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductDetailClientProps {
  product: Product;
}

const demoSizes = ['S', 'M', 'L', 'XL'];
const demoColors = ['Default', 'Navy', 'Black'];

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { animateToCart } = useCartAnimation();
  const { animateToWishlist } = useWishlistAnimation();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Default');
  const [imageIndex, setImageIndex] = useState(0);

  const images = product.images?.length ? product.images : [product.image];
  const bookmarkedProducts = useAppSelector((state) => state.bookmark.bookmarkedProducts);
  const isBookmarked = bookmarkedProducts.some((p) => p.id === product.id);

  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const addItemsToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    toast.success(`Added ${quantity} to cart`, {
      description: `${selectedSize} · ${selectedColor} (demo)`,
      action: { label: 'View cart', onClick: () => router.push('/cart') },
    });
  };

  const handleAddToCart = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      animateToCart(event.currentTarget, { onComplete: addItemsToCart });
    } else {
      addItemsToCart();
    }
  };

  const handleBuyNow = () => {
    addItemsToCart();
    router.push('/checkout');
  };

  const handleBookmark = (event?: React.MouseEvent<HTMLButtonElement>) => {
    const toggle = () => {
      dispatch(toggleBookmark(product));
      toast.message(isBookmarked ? 'Removed from wishlist' : 'Saved to wishlist');
    };
    if (event) {
      animateToWishlist(event.currentTarget, { onComplete: toggle });
    } else {
      toggle();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/products?category=${product.category}`} className="capitalize">
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-[200px] truncate">{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Button variant="ghost" onClick={() => router.back()} className="-ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative">
              <div
                className="aspect-square w-full bg-cover bg-center bg-no-repeat rounded-lg"
                style={{ backgroundImage: `url(${images[imageIndex]})` }}
              />
              {product.originalPrice && (
                <Badge className="absolute top-4 left-4 bg-red-500">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Product images">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    role="tab"
                    aria-selected={i === imageIndex}
                    onClick={() => setImageIndex(i)}
                    className={cn(
                      'h-16 w-16 rounded-md bg-cover bg-center border-2 transition-colors',
                      i === imageIndex ? 'border-primary' : 'border-transparent opacity-70'
                    )}
                    style={{ backgroundImage: `url(${src})` }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
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
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant={product.inStock ? 'default' : 'destructive'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {product.category}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Size (demo)</p>
                <div className="flex flex-wrap gap-2">
                  {demoSizes.map((size) => (
                    <Button
                      key={size}
                      type="button"
                      size="sm"
                      variant={selectedSize === size ? 'default' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Color (demo)</p>
                <div className="flex flex-wrap gap-2">
                  {demoColors.map((color) => (
                    <Button
                      key={color}
                      type="button"
                      size="sm"
                      variant={selectedColor === color ? 'default' : 'outline'}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={(e) => handleAddToCart(e)} disabled={!product.inStock} className="flex-1">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" onClick={handleBuyNow} disabled={!product.inStock} className="flex-1">
                  Buy Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={(e) => handleBookmark(e)}
                  aria-label={isBookmarked ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={isBookmarked ? 'text-red-500 border-red-500 hover:bg-red-50' : ''}
                >
                  <Heart className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

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

        {relatedProducts.length > 0 && (
          <section className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Related products</h2>
              <Link href={`/products?category=${product.category}`} className="text-sm text-primary hover:underline capitalize">
                View all {product.category}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
