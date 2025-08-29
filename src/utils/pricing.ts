import { Necklace, PlacedCharm } from '../types';

// Pricing constants
export const CHARM_PRICE = 7.00; // Each charm costs 7 euros
export const FREE_SHIPPING_THRESHOLD = 90.00; // Free shipping over 90€

// Free charm thresholds based on necklace type
export const FREE_CHARM_THRESHOLDS = {
  // Grigri necklaces: Buy 8, get 9th free
  GRIGRI: { buyCount: 8, freeCount: 1 },
  // Gypso necklaces: Buy 6, get 7th free  
  GYPSO: { buyCount: 6, freeCount: 1 }
};

// Helper function to determine necklace type from name
export function getNecklaceType(necklaceName: string): 'GRIGRI' | 'GYPSO' | null {
  const name = necklaceName.toLowerCase();
  if (name.includes('grigri')) return 'GRIGRI';
  if (name.includes('gypso')) return 'GYPSO';
  return null;
}

/**
 * Calculate free charms based on necklace type and charm count
 */
export function calculateFreeCharms(necklace: Necklace | null, charmCount: number) {
  if (!necklace) {
    return { freeCharms: 0, totalFreeCharms: 0, nextFreeAt: null, charmsUntilFree: 0 };
  }
  
  const necklaceType = getNecklaceType(necklace.name);
  if (!necklaceType) {
    return { freeCharms: 0, totalFreeCharms: 0, nextFreeAt: null, charmsUntilFree: 0 };
  }
  
  const threshold = FREE_CHARM_THRESHOLDS[necklaceType];
  const cycles = Math.floor(charmCount / (threshold.buyCount + threshold.freeCount));
  const remainingInCurrentCycle = charmCount % (threshold.buyCount + threshold.freeCount);
  
  // Calculate current free charms
  let currentFreeCharms = cycles * threshold.freeCount;
  if (remainingInCurrentCycle > threshold.buyCount) {
    currentFreeCharms += Math.min(remainingInCurrentCycle - threshold.buyCount, threshold.freeCount);
  }
  
  // Calculate when next free charm will be available
  let nextFreeAt = null;
  let charmsUntilFree = 0;
  
  if (remainingInCurrentCycle <= threshold.buyCount) {
    // Still in buying phase of current cycle
    nextFreeAt = cycles * (threshold.buyCount + threshold.freeCount) + threshold.buyCount + 1;
    charmsUntilFree = nextFreeAt - charmCount;
  } else if (remainingInCurrentCycle < threshold.buyCount + threshold.freeCount) {
    // In free phase of current cycle, but more free charms available
    // (though currently we only have 1 free charm per cycle, this handles future expansion)
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
 * Calculate the total price for a customized necklace
 */
export function calculateTotalPrice(necklace: Necklace | null, placedCharms: PlacedCharm[]) {
  if (!necklace) {
    return {
      necklacePrice: 0,
      charmsPrice: 0,
      charmsOriginalPrice: 0,
      freeCharmsCount: 0,
      freeCharmsValue: 0,
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
  
  // Calculate free charms
  const freeCharmInfo = calculateFreeCharms(necklace, charmCount);
  const freeCharmsValue = freeCharmInfo.freeCharms * CHARM_PRICE;
  const charmsPrice = charmsOriginalPrice - freeCharmsValue;
  
  const subtotal = necklacePrice + charmsPrice;
  
  // Calculate shipping
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = freeShipping ? 0 : 5.90; // Standard shipping cost
  
  const total = subtotal + shipping;
  const savings = freeCharmsValue;

  return {
    necklacePrice,
    charmsPrice,
    charmsOriginalPrice,
    freeCharmsCount: freeCharmInfo.freeCharms,
    freeCharmsValue,
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
 * Calculate progress toward next free charm
 */
export function calculateNextFreeCharmInfo(necklace: Necklace | null, currentCharmCount: number) {
  if (!necklace) return null;
  
  const necklaceType = getNecklaceType(necklace.name);
  if (!necklaceType) return null;
  
  const threshold = FREE_CHARM_THRESHOLDS[necklaceType];
  
  // Hide the message once the user has reached the free charm threshold
  // For Grigri: hide after 9 charms (8 + 1 free)
  // For Gypso: hide after 7 charms (6 + 1 free)
  if (currentCharmCount >= threshold.buyCount + threshold.freeCount) {
    return null; // User has already claimed their free charm
  }
  
  const freeCharmInfo = calculateFreeCharms(necklace, currentCharmCount);
  
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
export function getPriceBreakdown(necklace: Necklace | null, placedCharms: PlacedCharm[]) {
  const pricing = calculateTotalPrice(necklace, placedCharms);
  const nextFreeCharm = calculateNextFreeCharmInfo(necklace, placedCharms.length);
  const freeCharmInfo = calculateFreeCharms(necklace, placedCharms.length);
  
  return {
    ...pricing,
    nextFreeCharm,
    freeCharmInfo,
    hasCharms: placedCharms.length > 0,
    hasFreeCharms: pricing.freeCharmsCount > 0,
    // Check if user is close to next free charm (for Grigri: 7+ charms, for Gypso: 5+ charms)
    closeToFreeCharm: freeCharmInfo.threshold && placedCharms.length >= freeCharmInfo.threshold - 2 && nextFreeCharm
  };
}