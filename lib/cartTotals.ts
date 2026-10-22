export function getCartTotals(subtotal: number, promoDiscount: number) {
  const discountedSubtotal = Math.max(0, subtotal - promoDiscount);
  const tax = discountedSubtotal * 0.1;
  const total = discountedSubtotal + tax;

  return { discountedSubtotal, tax, total };
}
