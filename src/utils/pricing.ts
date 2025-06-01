import { Necklace, PlacedCharm } from '../types';

// Pricing constants
export const CHARM_PRICE = 5.00; // Each charm costs 7 euros
export const FREE_SHIPPING_THRESHOLD = 90.00; // Free shipping over 90€

// Discount tiers for bulk charm purchases
export const CHARM_DISCOUNTS = [
  { minCharms: 10, discount: 0.15, name: '15% off' }, // 15% off for 10+ charms
  { minCharms: 7, discount: 0.10, name: '10% off' },  // 10% off for 7+ charms
  { minCharms: 5, discount: 0.05, name: '5% off' },   // 5% off for 5+ charms
];

/**
 * Calculate the discounted price for charms based on quantity
 */
export function calculateCharmDiscount(charmCount: number): { discount: number; name: string } {
  for (const tier of CHARM_DISCOUNTS) {
    if (charmCount >= tier.minCharms) {
      return { discount: tier.discount, name: tier.name };
    }
  }
  return { discount: 0, name: '' };
}

/**
 * Calculate the total price for a customized necklace
 */
export function calculateTotalPrice(necklace: Necklace | null, placedCharms: PlacedCharm[]) {
  if (!necklace) {
    return {
      necklacePrice: 0,
      charmsPrice: 0,
      charmsOriginalPrice: 0,
      discount: 0,
      discountName: '',
      subtotal: 0,
      shipping: 0,
      total: 0,
      freeShipping: false,
      savings: 0
    };
  }

  const necklacePrice = necklace.basePrice;
  const charmCount = placedCharms.length;
  const charmsOriginalPrice = charmCount * CHARM_PRICE;
  
  // Calculate charm discount
  const { discount, name: discountName } = calculateCharmDiscount(charmCount);
  const charmDiscount = charmsOriginalPrice * discount;
  const charmsPrice = charmsOriginalPrice - charmDiscount;
  
  const subtotal = necklacePrice + charmsPrice;
  
  // Calculate shipping
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = freeShipping ? 0 : 5.90; // Standard shipping cost
  
  const total = subtotal + shipping;
  const savings = charmDiscount;

  return {
    necklacePrice,
    charmsPrice,
    charmsOriginalPrice,
    discount: charmDiscount,
    discountName,
    subtotal,
    shipping,
    total,
    freeShipping,
    savings
  };
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = '€'): string {
  return `${price.toFixed(2)}${currency}`;
}

/**
 * Calculate potential savings if user adds more charms
 */
export function calculateNextDiscountInfo(currentCharmCount: number) {
  for (const tier of CHARM_DISCOUNTS) {
    if (currentCharmCount < tier.minCharms) {
      const charmsNeeded = tier.minCharms - currentCharmCount;
      const potentialSavings = tier.minCharms * CHARM_PRICE * tier.discount;
      return {
        charmsNeeded,
        nextDiscount: tier.discount,
        nextDiscountName: tier.name,
        potentialSavings
      };
    }
  }
  return null;
}

/**
 * Get price breakdown for display
 */
export function getPriceBreakdown(necklace: Necklace | null, placedCharms: PlacedCharm[]) {
  const pricing = calculateTotalPrice(necklace, placedCharms);
  const nextDiscount = calculateNextDiscountInfo(placedCharms.length);
  
  return {
    ...pricing,
    nextDiscount,
    hasCharms: placedCharms.length > 0,
    hasDiscount: pricing.discount > 0
  };
}