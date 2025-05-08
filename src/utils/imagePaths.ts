/**
 * Returns the correct image path based on the environment
 * @param path The image path without the base path
 * @returns The complete image path with the base path if needed
 */
export function getImagePath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Check if we're in WordPress and have the plugin data
  const isWordPress = typeof window !== 'undefined' && 
                     window.hasOwnProperty('pomponnettesData');
  
  if (isWordPress && window.pomponnettesData?.imagesPath) {
    // Use the path provided by WordPress
    return window.pomponnettesData.imagesPath + cleanPath.replace('images/', '');
  } else if (import.meta.env.DEV) {
    // Development
    return '/' + cleanPath;
  } else {
    // GitHub Pages
    return '/pomponnettes/' + cleanPath;
  }
} 