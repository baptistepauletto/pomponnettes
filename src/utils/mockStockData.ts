/**
 * Mock stock data for development and GitHub Pages
 * Generates random availability for testing purposes
 * 
 * This module injects mock `pomponnettesData` when running outside WordPress:
 * - ~15% of charms randomly marked as unavailable
 * - ~60% of bandana variations randomly marked as in stock
 * 
 * Uses a date-based seed for consistent results within the same day
 */

import { charms } from '../data/charms';
import { bandanas } from '../data/bandanas';

// Simple seeded random number generator (mulberry32)
function seededRandom(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Generate a seed based on the current date (changes daily)
function getDailySeed(): number {
  const today = new Date();
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

/**
 * Generate mock available charms list
 * Excludes ~15% of charms randomly
 */
function generateMockAvailableCharms(random: () => number): string[] {
  const exclusionRate = 0.15; // 15% of charms will be unavailable
  
  return charms
    .filter(() => random() > exclusionRate)
    .map(charm => charm.id);
}

/**
 * Generate mock in-stock variation IDs for bandanas
 * Only uses the 5-hole variation IDs (the main variationId) since that's what
 * the UI uses to show the "Rupture de stock" badge in the selector
 * Includes ~60% of bandanas randomly
 */
function generateMockInStockVariationIds(random: () => number): number[] {
  const inclusionRate = 0.6; // 60% of bandanas will be in stock
  
  // Only use the 5-hole variation IDs (same as bandana.variationId)
  return bandanas
    .filter(() => random() > (1 - inclusionRate))
    .map(bandana => bandana.variationIdsByHoleCount[5]);
}

/**
 * Inject mock pomponnettesData for non-WordPress environments
 * This runs on localhost and GitHub Pages
 */
export function injectMockStockData(): void {
  // Only inject if pomponnettesData is not already defined (i.e., not on WordPress)
  if (typeof window !== 'undefined' && !window.pomponnettesData) {
    const seed = getDailySeed();
    const random = seededRandom(seed);
    
    const mockAvailableCharms = generateMockAvailableCharms(random);
    const mockInStockVariationIds = generateMockInStockVariationIds(random);
    
    // Count stats for console logging
    const unavailableCharmsCount = charms.length - mockAvailableCharms.length;
    const inStockBandanasCount = mockInStockVariationIds.length;
    const outOfStockBandanasCount = bandanas.length - inStockBandanasCount;
    
    window.pomponnettesData = {
      pluginUrl: '',
      imagesPath: '',
      stock: {
        parentProductId: 21290,
        inStockVariationIds: mockInStockVariationIds,
      },
      availableCharms: mockAvailableCharms,
    };
    
    console.log(
      `%c[Mock Stock Data]%c Injected for testing (seed: ${seed}):\n` +
      `  • Charms: ${mockAvailableCharms.length}/${charms.length} available (${unavailableCharmsCount} unavailable)\n` +
      `  • Bandanas: ${inStockBandanasCount}/${bandanas.length} in stock (${outOfStockBandanasCount} out of stock)`,
      'color: #ff9800; font-weight: bold;',
      'color: inherit;'
    );
  }
}

