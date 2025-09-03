'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch } from '@/lib/hooks';
import { addToCart } from '@/lib/features/cart/cartSlice';
import { useCartAnimation } from '@/hooks/useCartAnimation';
import { mockProducts } from '@/data/mockData';
import { Product } from '@/types';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import Link from 'next/link';

export default function IslamicCornerPage() {
  const dispatch = useAppDispatch();
  const { animateToCart } = useCartAnimation();
  const islamicProducts = mockProducts.filter(p => p.category === 'islamic');

  const handleAddToCart = (product: Product, event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    
    animateToCart(button, {
      onComplete: () => {
        dispatch(addToCart(product));
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Islamic Corner</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our beautiful collection of Islamic products, carefully curated to enhance
            your spiritual journey and daily life.
          </p>
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">📿</span>
              </div>
              <h3 className="text-xl font-semibold">Prayer Items</h3>
              <p className="text-muted-foreground">Prayer mats, beads, and spiritual accessories</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold">Islamic Books</h3>
              <p className="text-muted-foreground">Quran, Hadith collections, and Islamic literature</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold">Islamic Art</h3>
              <p className="text-muted-foreground">Calligraphy, wall art, and decorative items</p>
            </CardContent>
          </Card>
        </div>

        {/* Products */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Featured Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {islamicProducts.map((product) => (
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
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
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
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">About Islamic Corner</h2>
            <p className="text-lg text-muted-foreground">
              Our Islamic Corner features carefully selected products that honor Islamic traditions
              and values. Each item is chosen for its quality, authenticity, and ability to
              enhance your spiritual practice and daily life.
            </p>
            <p className="text-muted-foreground">
              We work with trusted suppliers and artisans to bring you authentic Islamic products
              that meet the highest standards of quality and craftsmanship.
            </p>
            <Button size="lg">Contact Us for Custom Orders</Button>
          </div>
        </div>
      </div>
    </div>
  );
}