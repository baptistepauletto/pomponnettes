import { Product, PlacedCharm, HoleCount, isBandanaProduct, isNecklaceProduct } from '../types';

// Pricing constants
export const CHARM_PRICE = 7.00; // Each charm costs 7 euros
export const GIFT_WRAP_PRICE = 1.50; // Gift wrap costs 1.5 euros

// Bandana pricing tiers by number of holes/charms
export const BANDANA_PRICE_BY_HOLES: Record<HoleCount, number> = {
  1: 21.00,
  3: 35.00,
  5: 49.00,
  7: 63.00
};

/** @deprecated Use BANDANA_PRICE_BY_HOLES instead */
export const BANDANA_PRICE_BY_CHARMS = BANDANA_PRICE_BY_HOLES;

function normalizeBandanaCount(count: number): HoleCount {
  if (count <= 1) return 1;
  if (count <= 3) return 3;
  if (count <= 5) return 5;
  return 7;
}

// Necklace subtypes for free charm thresholds
type NecklaceSubtype = 'GRIGRI' | 'GYPSO';

// Free charm thresholds based on necklace subtype
export const FREE_CHARM_THRESHOLDS: Record<NecklaceSubtype, { buyCount: number; freeCount: number }> = {
  // Grigri necklaces: Buy 8, get 9th free
  GRIGRI: { buyCount: 8, freeCount: 1 },
  // Gypso necklaces: Buy 6, get 7th free  
  GYPSO: { buyCount: 6, freeCount: 1 }
};

/**
 * Helper function to determine necklace subtype from name
 * Only applies to necklace products
 */
export function getNecklaceSubtype(product: Product | null): NecklaceSubtype | null {
  if (!product || !isNecklaceProduct(product)) return null;
  
  const name = product.name.toLowerCase();
  if (name.includes('grigri')) return 'GRIGRI';
  if (name.includes('gypso')) return 'GYPSO';
  return null;
}

/** @deprecated Use isBandanaProduct from types instead */
export function isBandana(product: Product | null): boolean {
  return isBandanaProduct(product);
}

/**
 * Calculate free charms based on product type and charm count
 * Only necklaces have free charm promotions
 */
export function calculateFreeCharms(product: Product | null, charmCount: number) {
  const defaultResult = { freeCharms: 0, totalFreeCharms: 0, nextFreeAt: null as number | null, charmsUntilFree: 0, threshold: 0 };
  
  if (!product) return defaultResult;
  
  // Bandanas don't have free charm promotions (charms are included in price tiers)
  if (isBandanaProduct(product)) return defaultResult;
  
  // Only necklaces have free charm promotions
  if (!isNecklaceProduct(product)) return defaultResult;
  
  const necklaceSubtype = getNecklaceSubtype(product);
  if (!necklaceSubtype) return defaultResult;
  
  const threshold = FREE_CHARM_THRESHOLDS[necklaceSubtype];
  const cycles = Math.floor(charmCount / (threshold.buyCount + threshold.freeCount));
  const remainingInCurrentCycle = charmCount % (threshold.buyCount + threshold.freeCount);
  
  // Calculate current free charms
  let currentFreeCharms = cycles * threshold.freeCount;
  if (remainingInCurrentCycle > threshold.buyCount) {
    currentFreeCharms += Math.min(remainingInCurrentCycle - threshold.buyCount, threshold.freeCount);
  }
  
  // Calculate when next free charm will be available
  let nextFreeAt: number | null = null;
  let charmsUntilFree = 0;
  
  if (remainingInCurrentCycle <= threshold.buyCount) {
    // Still in buying phase of current cycle
    nextFreeAt = cycles * (threshold.buyCount + threshold.freeCount) + threshold.buyCount + 1;
    charmsUntilFree = nextFreeAt - charmCount;
  } else if (remainingInCurrentCycle < threshold.buyCount + threshold.freeCount) {
    // In free phase of current cycle, but more free charms available
    const remainingFreeInCycle = threshold.freeCount - (remainingInCurrentCycle - threshold.buyCount);
    if (remainingFreeInCycle > 0) {
      nextFreeAt = charmCount + 1; // Next charm is free
      charmsUntilFree = 0;
    } else {
      // Start next cycle
      nextFreeAt = (cycles + 1) * (threshold.buyCount + threshold.freeCount) + threshold.buyCount + 1;
      charmsUntilFree = nextFreeAt - charmCount;
    }
  } else {
    // Start next cycle
    nextFreeAt = (cycles + 1) * (threshold.buyCount + threshold.freeCount) + threshold.buyCount + 1;
    charmsUntilFree = nextFreeAt - charmCount;
  }
  
  return { 
    freeCharms: currentFreeCharms, 
    totalFreeCharms: currentFreeCharms,
    nextFreeAt,
    charmsUntilFree: Math.max(0, charmsUntilFree),
    threshold: threshold.buyCount
  };
}

/**
 * Calculate bandana price based on hole count
 */
function calculateBandanaPrice(
  _product: Product,
  placedCharms: PlacedCharm[],
  giftWrap: boolean,
  selectedHoleCount?: HoleCount
) {
  const charmCount = placedCharms.length;
  const countForPricing = selectedHoleCount ?? normalizeBandanaCount(charmCount);
  const bandanaPrice = BANDANA_PRICE_BY_HOLES[countForPricing];
  const charmsOriginalPrice = charmCount * CHARM_PRICE;
  const giftWrapPrice = giftWrap ? GIFT_WRAP_PRICE : 0;
  const subtotal = bandanaPrice + giftWrapPrice;
  
  return {
    productPrice: bandanaPrice,
    charmsPrice: 0, // Charms are included in bandana price tiers
    charmsOriginalPrice,
    freeCharmsCount: 0,
    freeCharmsValue: 0,
    giftWrapPrice,
    subtotal,
    shipping: 0,
    total: subtotal,
    freeShipping: false,
    savings: 0
  };
}

/**
 * Calculate necklace price with charm pricing
 */
function calculateNecklacePrice(
  product: Product,
  placedCharms: PlacedCharm[],
  giftWrap: boolean
) {
  const productPrice = product.basePrice;
  const charmCount = placedCharms.length;
  const charmsOriginalPrice = charmCount * CHARM_PRICE;
  
  // Calculate free charms
  const freeCharmInfo = calculateFreeCharms(product, charmCount);
  const freeCharmsValue = freeCharmInfo.freeCharms * CHARM_PRICE;
  const charmsPrice = charmsOriginalPrice - freeCharmsValue;
  
  // Calculate gift wrap cost
  const giftWrapPrice = giftWrap ? GIFT_WRAP_PRICE : 0;
  
  const subtotal = productPrice + charmsPrice + giftWrapPrice;
  
  return {
    productPrice,
    charmsPrice,
    charmsOriginalPrice,
    freeCharmsCount: freeCharmInfo.freeCharms,
    freeCharmsValue,
    giftWrapPrice,
    subtotal,
    shipping: 0,
    total: subtotal,
    freeShipping: false,
    savings: freeCharmsValue
  };
}

/**
 * Calculate the total price for a customized product
 */
export function calculateTotalPrice(
  product: Product | null,
  placedCharms: PlacedCharm[],
  giftWrap: boolean = false,
  selectedHoleCount?: HoleCount
) {
  if (!product) {
    return {
      productPrice: 0,
      charmsPrice: 0,
      charmsOriginalPrice: 0,
      freeCharmsCount: 0,
      freeCharmsValue: 0,
      giftWrapPrice: 0,
      subtotal: 0,
      shipping: 0,
      total: 0,
      freeShipping: false,
      savings: 0,
      // Legacy alias
      necklacePrice: 0
    };
  }

  // Use type guards for clean branching
  if (isBandanaProduct(product)) {
    const result = calculateBandanaPrice(product, placedCharms, giftWrap, selectedHoleCount);
    return { ...result, necklacePrice: result.productPrice };
  }
  
  if (isNecklaceProduct(product)) {
    const result = calculateNecklacePrice(product, placedCharms, giftWrap);
    return { ...result, necklacePrice: result.productPrice };
  }
  
  // Fallback for unknown product types (shouldn't happen with proper typing)
  const result = calculateNecklacePrice(product, placedCharms, giftWrap);
  return { ...result, necklacePrice: result.productPrice };
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = '€'): string {
  return `${price.toFixed(2)}${currency}`;
}

/**
 * Calculate progress toward next free charm (necklaces only)
 */
export function calculateNextFreeCharmInfo(product: Product | null, currentCharmCount: number) {
  if (!product) return null;
  
  // Bandanas don't have free charm promotions
  if (isBandanaProduct(product)) return null;
  
  // Only necklaces have free charm promotions
  if (!isNecklaceProduct(product)) return null;
  
  const necklaceSubtype = getNecklaceSubtype(product);
  if (!necklaceSubtype) return null;
  
  const threshold = FREE_CHARM_THRESHOLDS[necklaceSubtype];
  
  // Hide the message once the user has reached the free charm threshold
  if (currentCharmCount >= threshold.buyCount + threshold.freeCount) {
    return null; // User has already claimed their free charm
  }
  
  const freeCharmInfo = calculateFreeCharms(product, currentCharmCount);
  
  if (freeCharmInfo.charmsUntilFree === 0) {
    return null; // Next charm is already free
  }
  
  return {
    charmsNeeded: freeCharmInfo.charmsUntilFree,
    nextFreeAt: freeCharmInfo.nextFreeAt,
    threshold: freeCharmInfo.threshold,
    potentialSavings: CHARM_PRICE // One free charm worth €7
  };
}

/**
 * Get price breakdown for display
 */
export function getPriceBreakdown(
  product: Product | null,
  placedCharms: PlacedCharm[],
  giftWrap: boolean = false,
  selectedHoleCount?: HoleCount
) {
  const pricing = calculateTotalPrice(product, placedCharms, giftWrap, selectedHoleCount);
  const nextFreeCharm = calculateNextFreeCharmInfo(product, placedCharms.length);
  const freeCharmInfo = calculateFreeCharms(product, placedCharms.length);
  
  return {
    ...pricing,
    nextFreeCharm,
    freeCharmInfo,
    hasCharms: placedCharms.length > 0,
    hasFreeCharms: pricing.freeCharmsCount > 0,
    // Check if user is close to next free charm (necklaces only)
    closeToFreeCharm: freeCharmInfo.threshold && placedCharms.length >= freeCharmInfo.threshold - 2 && nextFreeCharm
  };
}

// ============================================
// Legacy aliases for backward compatibility
// ============================================

/** @deprecated Use getNecklaceSubtype instead */
export function getNecklaceType(necklaceName: string): 'GRIGRI' | 'GYPSO' | null {
  const name = necklaceName.toLowerCase();
  if (name.includes('grigri')) return 'GRIGRI';
  if (name.includes('gypso')) return 'GYPSO';
  return null;
}
