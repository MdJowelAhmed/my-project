'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/ui/ProductCard';
import { mockProducts } from '@/data/mockData';

export default function IslamicCornerPage() {
  const islamicProducts = mockProducts.filter(p => p.category === 'islamic');



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
              <ProductCard key={product.id} product={product} />
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