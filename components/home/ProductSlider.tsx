'use client';

import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/ProductCard';
import { Product } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';
import Link from 'next/link';

interface ProductSliderProps {
  title: string;
  products: Product[];
  category: string;
}

export default function ProductSlider({ title, products, category }: ProductSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    loop: true,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  // Custom autoplay implementation
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={scrollPrev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={scrollNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products.map((product) => (
            <div key={product.id} className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] mr-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link href={`/products?category=${category}`}>
          <Button variant="outline" size="lg">
            See All {title}
          </Button>
        </Link>
      </div>
    </div>
  );
}