'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, Eye, Share2, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addToCart } from '@/lib/features/cart/cartSlice';
import { toggleBookmark } from '@/lib/features/bookmark/bookmarkSlice';
import { useCartAnimation } from '@/hooks/useCartAnimation';
import { useWishlistAnimation } from '@/hooks/useWishlistAnimation';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { animateToCart } = useCartAnimation();
  const { animateToWishlist } = useWishlistAnimation();
  const bookmarkedProducts = useAppSelector((state) => state.bookmark.bookmarkedProducts);
  const isBookmarked = bookmarkedProducts.some(p => p.id === product.id);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const images = product.images || [product.image];
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isHovered && hasMultipleImages) {
      // Start animation immediately on hover
      setIsAnimating(true);
      
      // After 2 seconds, change to next image
      timer = setTimeout(() => {
        if (isHovered) { // Only change if still hovering
          // Determine next image based on hover count
          let nextIndex;
          if (hoverCount === 1) {
            nextIndex = 1; // Show second image on first hover
          } else {
            // If third image exists, show it, otherwise show second image
            nextIndex = images.length > 2 ? 2 : 1;
          }
          setCurrentImageIndex(nextIndex);
        }
        setIsAnimating(false);
      }, 2000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isHovered, hasMultipleImages, hoverCount, images.length]);

  const handleMouseEnter = () => {
    if (hasMultipleImages) {
      setIsHovered(true);
      setHoverCount(prev => prev + 1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsAnimating(false);
    setCurrentImageIndex(0); // Reset to first image
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    await animateToCart(e.currentTarget as HTMLElement);
    dispatch(addToCart(product));
  };

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    await animateToWishlist(e.currentTarget as HTMLElement);
    dispatch(toggleBookmark(product));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareModal(true);
  };

  const shareProduct = (platform: string) => {
    const productUrl = `${window.location.origin}/products/${product.id}`;
    const productTitle = encodeURIComponent(product.name);
    const productDescription = encodeURIComponent(`Check out this amazing product: ${product.name} for only $${product.price}`);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${productDescription}%20${encodeURIComponent(productUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${productDescription}&url=${encodeURIComponent(productUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productUrl)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so we'll copy to clipboard
        navigator.clipboard.writeText(`${product.name} - ${productUrl}`);
        alert('Product link copied to clipboard! You can paste it in your Instagram post.');
        setShowShareModal(false);
        return;
      default:
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShowShareModal(false);
    }
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div 
        className="relative aspect-square overflow-hidden bg-gray-100"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Discount Badge */}
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600">
            -{discount}%
          </Badge>
        )}
        
        {/* Stock Badge */}
        {!product.inStock && (
          <Badge className="absolute top-2 right-2 z-10 bg-gray-500">
            Out of Stock
          </Badge>
        )}

        {/* Image Animation Container */}
        <div className="relative w-full h-full overflow-hidden">
          {/* Main Image Display */}
          <div className="absolute inset-0">
            <Image
              src={images[currentImageIndex]}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-500 ease-in-out ${
                isAnimating ? '-translate-x-full' : 'translate-x-0'
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          {/* Next Image (slides in from right during animation) */}
          {hasMultipleImages && isAnimating && (
            <div className="absolute inset-0">
              <Image
                src={images[hoverCount === 1 ? 1 : (images.length > 2 ? 2 : 1)]}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 ease-in-out ${
                  isAnimating ? 'translate-x-0' : 'translate-x-full'
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-800"
              onClick={handleBookmark}
            >
              <Heart 
                className={`h-4 w-4 ${isBookmarked ? 'fill-red-500 text-red-500' : ''}`} 
              />
            </Button>
            
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-800"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-800"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            
            <Link href={`/products/${product.id}`}>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-gray-800"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Share Product</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowShareModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 p-3 h-auto"
                onClick={() => shareProduct('facebook')}
              >
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  f
                </div>
                Facebook
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 p-3 h-auto"
                onClick={() => shareProduct('whatsapp')}
              >
                <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">
                  W
                </div>
                WhatsApp
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 p-3 h-auto"
                onClick={() => shareProduct('twitter')}
              >
                <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                  T
                </div>
                Twitter
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 p-3 h-auto"
                onClick={() => shareProduct('linkedin')}
              >
                <div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
                  in
                </div>
                LinkedIn
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 p-3 h-auto col-span-2"
                onClick={() => shareProduct('instagram')}
              >
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center text-white text-xs font-bold">
                  IG
                </div>
                Instagram (Copy Link)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}