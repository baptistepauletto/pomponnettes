/**
 * Helper function to get the correct path for assets in both development and production
 * @param path The relative path to the asset from the public directory
 * @returns The correct path to use in the current environment
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // In development, assets from the public folder are served from root
  // In production (WordPress plugin), they're served relative to the current path
  const isProduction = import.meta.env.PROD;
  
  return isProduction ? `./${cleanPath}` : `/${cleanPath}`;
} 