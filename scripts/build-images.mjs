import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd());
const PUBLIC_DIR = path.join(ROOT, 'public');
const SRC_DIRS = [
	path.join(PUBLIC_DIR, 'images', 'charms'),
	path.join(PUBLIC_DIR, 'images', 'necklaces')
];

const THUMBS_BASE = path.join(PUBLIC_DIR, 'images', 'thumbs');

async function ensureDir(dirPath) {
	await fs.mkdir(dirPath, { recursive: true });
}

function toWebpPath(filePath) {
	return filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
}

function toThumbPath(filePath) {
	// filePath inside PUBLIC_DIR, e.g. public/images/charms/x.png
	const rel = path.relative(path.join(PUBLIC_DIR, 'images'), filePath); // charms/x.png
	const thumbAbs = path.join(THUMBS_BASE, rel);
	return toWebpPath(thumbAbs);
}

async function processImage(absPath) {
	const ext = path.extname(absPath).toLowerCase();
	if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

	const webpPath = toWebpPath(absPath);
	const thumbPath = toThumbPath(absPath);

	await ensureDir(path.dirname(webpPath));
	await ensureDir(path.dirname(thumbPath));

	// Regular WebP (keep original dimensions)
	try {
		await sharp(absPath)
			.webp({ quality: 80 })
			.toFile(webpPath);
	} catch (e) {
		console.error('Failed to create webp for', absPath, e);
	}

	// Thumbnail WebP (~200px width)
	try {
		await sharp(absPath)
			.resize({ width: 200, withoutEnlargement: true })
			.webp({ quality: 70 })
			.toFile(thumbPath);
	} catch (e) {
		console.error('Failed to create thumb for', absPath, e);
	}
}

async function walk(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const abs = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await walk(abs);
		} else {
			await processImage(abs);
		}
	}
}

async function main() {
	for (const src of SRC_DIRS) {
		try {
			await walk(src);
		} catch (e) {
			console.warn('Skipping missing dir:', src);
		}
	}
	console.log('Image optimization complete.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});


