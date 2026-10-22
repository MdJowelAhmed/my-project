import { mockOffers } from '@/data/mockData';
import { Offer } from '@/types';

export function findOfferByCode(code: string): Offer | undefined {
  const normalized = code.trim().toUpperCase();
  return mockOffers.find((offer) => offer.code.toUpperCase() === normalized);
}

/** Demo mock checkout: offer dates are not enforced. */
export function calculatePromoDiscount(subtotal: number, code: string): number {
  const offer = findOfferByCode(code);
  if (!offer || subtotal <= 0) {
    return 0;
  }

  if (offer.type === 'percentage') {
    return Math.min(subtotal, (subtotal * offer.discount) / 100);
  }

  return Math.min(subtotal, offer.discount);
}
