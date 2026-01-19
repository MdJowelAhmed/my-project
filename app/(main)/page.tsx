import BannerSlider from '@/components/home/BannerSlider';
import ProductSlider from '@/components/home/ProductSlider';
import FAQ from '@/components/home/FAQ';
import Link from 'next/link';
import ReviewSection from '@/components/home/ReviewSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';

import { mockProducts } from '@/data/mockData';

export default function HomePage() {
  const jerseyProducts = mockProducts.filter(p => p.category === 'jersey');
  const shoesProducts = mockProducts.filter(p => p.category === 'shoes');
  const bagsProducts = mockProducts.filter(p => p.category === 'bags');
  const othersProducts = mockProducts.filter(p => p.category === 'others');

  return (
    <div className="space-y-16 pb-16">
      {/* Banner Section */}
      <section className="container mx-auto px-4 pt-8">
        <BannerSlider />
      </section>

      {/* Products Sections */}
      <section className="container mx-auto px-4 space-y-16">
        <ProductSlider title="Jersey Collection" products={jerseyProducts} category="jersey" />
        <ProductSlider title="Premium Shoes" products={shoesProducts} category="shoes" />
        <ProductSlider title="Bags & Accessories" products={bagsProducts} category="bags" />
        <ProductSlider title="Tech & Others" products={othersProducts} category="others" />
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4">
        <WhyChooseUs />
      </section>

      {/* Review Section */}
      <ReviewSection />

      {/* FAQ Section */}
      <section className=" py-16">
        <div className="container mx-auto px-4">
          <FAQ />
        </div>
      </section>
    </div>
  );
}