'use client';

import { useCallback } from 'react';

interface CartAnimationOptions {
  duration?: number;
  onComplete?: () => void;
}

export const useCartAnimation = () => {
  const animateToCart = useCallback((sourceElement: HTMLElement, options: CartAnimationOptions = {}) => {
    const { duration = 800, onComplete } = options;
    
    // Find the cart icon in the navbar
    const cartIcon = document.querySelector('[data-cart-icon]') as HTMLElement;
    if (!cartIcon) {
      console.warn('Cart icon not found');
      onComplete?.();
      return;
    }

    // Get positions
    const sourceRect = sourceElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    
    // Create animated element
    const animatedElement = document.createElement('div');
    animatedElement.innerHTML = `
      <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"></path>
        </svg>
      </div>
    `;
    
    // Style the animated element
    animatedElement.style.cssText = `
      position: fixed;
      top: ${sourceRect.top + sourceRect.height / 2 - 16}px;
      left: ${sourceRect.left + sourceRect.width / 2 - 16}px;
      z-index: 9999;
      pointer-events: none;
      transition: all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
      transform: scale(1);
      opacity: 1;
    `;
    
    document.body.appendChild(animatedElement);
    
    // Trigger animation
    requestAnimationFrame(() => {
      animatedElement.style.cssText += `
        top: ${cartRect.top + cartRect.height / 2 - 16}px;
        left: ${cartRect.left + cartRect.width / 2 - 16}px;
        transform: scale(0.5);
        opacity: 0.8;
      `;
    });
    
    // Cleanup and callback
    setTimeout(() => {
      if (animatedElement.parentNode) {
        animatedElement.parentNode.removeChild(animatedElement);
      }
      
      // Add a small bounce effect to cart icon
      cartIcon.style.transform = 'scale(1.2)';
      setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
      }, 150);
      
      onComplete?.();
    }, duration);
    
  }, []);

  return { animateToCart };
};