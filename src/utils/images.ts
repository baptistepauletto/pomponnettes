export function toThumbWebpUrl(url: string): string {
	// Replace the first occurrence of "/images/" with "/images/thumbs/" and force .webp extension
	const withThumbs = url.replace(/\/images\//, '/images/thumbs/');
	return withThumbs.replace(/\.(png|jpe?g|webp)$/i, '.webp');
}