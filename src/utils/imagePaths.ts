/**
 * Returns the correct image path based on the environment
 * @param path The image path without the base path
 * @returns The complete image path with the base path if needed
 */
export function getImagePath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // In development, images are served from the root
  // In production (GitHub Pages), images need the /pomponnettes/ prefix
  const base = import.meta.env.DEV ? '/' : '/pomponnettes/';
  
  return `${base}${cleanPath}`;
} 