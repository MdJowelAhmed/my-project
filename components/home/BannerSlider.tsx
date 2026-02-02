'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bannerSlides } from '@/data/mockData';
import Link from 'next/link';

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
    startAutoSlide();
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-xl">
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white space-y-6 max-w-2xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={slide.ctaLink}>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      {slide.ctaText}
                    </Button>
                  </Link>
                  {/* <Button size="lg" variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white border-white text-white  hover:text-black">
                    {slide.ctaSecondary}
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}