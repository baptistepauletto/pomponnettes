export function normalizeText(input: string): string {
  return (input || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}+/gu, '')
    .trim();
}

export function includesNormalized(haystack: string, needle: string): boolean {
  if (!needle) return true;
  return normalizeText(haystack).includes(normalizeText(needle));
}

export function startsWithNormalized(haystack: string, needle: string): boolean {
  if (!needle) return true;
  return normalizeText(haystack).startsWith(normalizeText(needle));
}

