import { Product } from '../types';
import { bandanas } from './bandanas';
import { necklaces } from './necklaces';

/**
 * Combined product list
 * Includes all enabled product types (bandanas and necklaces)
 */
export const products: Product[] = [
  ...bandanas,
  ...necklaces,
];

// Re-export individual product arrays for convenience
export { bandanas } from './bandanas';
export { necklaces } from './necklaces';

