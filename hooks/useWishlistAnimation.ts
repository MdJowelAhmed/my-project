'use client';

import { useCallback } from 'react';

interface AnimationOptions {
  onComplete?: () => void;
}

export const useWishlistAnimation = () => {
  const animateToWishlist = useCallback((sourceElement: HTMLElement, options?: AnimationOptions) => {
    // Find the wishlist icon in the navbar
    const wishlistIcon = document.querySelector('[data-wishlist-icon]') as HTMLElement;
    
    if (!wishlistIcon || !sourceElement) {
      options?.onComplete?.();
      return;
    }

    // Get positions
    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = wishlistIcon.getBoundingClientRect();

    // Create animated element
    const animatedElement = document.createElement('div');
    animatedElement.innerHTML = '❤️';
    animatedElement.style.cssText = `
      position: fixed;
      left: ${sourceRect.left + sourceRect.width / 2}px;
      top: ${sourceRect.top + sourceRect.height / 2}px;
      font-size: 16px;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      transform: translate(-50%, -50%);
    `;

    document.body.appendChild(animatedElement);

    // Trigger animation
    requestAnimationFrame(() => {
      animatedElement.style.left = `${targetRect.left + targetRect.width / 2}px`;
      animatedElement.style.top = `${targetRect.top + targetRect.height / 2}px`;
      animatedElement.style.transform = 'translate(-50%, -50%) scale(0.5)';
      animatedElement.style.opacity = '0.7';
    });

    // Bounce effect on wishlist icon
    wishlistIcon.style.transform = 'scale(1.2)';
    wishlistIcon.style.transition = 'transform 0.2s ease-out';
    
    setTimeout(() => {
      wishlistIcon.style.transform = 'scale(1)';
    }, 200);

    // Cleanup and callback
    setTimeout(() => {
      if (animatedElement.parentNode) {
        animatedElement.parentNode.removeChild(animatedElement);
      }
      options?.onComplete?.();
    }, 800);
  }, []);

  return { animateToWishlist };
};