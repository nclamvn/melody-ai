// ═══════════════════════════════════════════════════════════════════════════════
//                    LYRICS METADATA CACHE
//                    Share lyrics data between Lyrics API and Album Story API
// ═══════════════════════════════════════════════════════════════════════════════

export interface LyricsMetadata {
  trackName: string;
  artistName: string;
  albumName?: string;
  duration?: number;
  source: 'lrclib' | 'openai' | 'database';
  foundAt: number;
  hasLyrics: boolean;
}

// Simple in-memory cache (works for single-instance Next.js)
const metadataCache = new Map<string, LyricsMetadata>();

// Cache TTL: 30 minutes
const CACHE_TTL = 30 * 60 * 1000;

/**
 * Generate cache key from title and artist
 */
function generateKey(title: string, artist?: string): string {
  const normalizedTitle = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();

  const normalizedArtist = artist
    ? artist
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
    : '';

  return `${normalizedTitle}|${normalizedArtist}`;
}

/**
 * Store lyrics metadata in cache
 */
export function storeLyricsMetadata(
  searchTitle: string,
  searchArtist: string | undefined,
  metadata: Omit<LyricsMetadata, 'foundAt'>
): void {
  const key = generateKey(searchTitle, searchArtist);
  metadataCache.set(key, {
    ...metadata,
    foundAt: Date.now(),
  });
}

/**
 * Get lyrics metadata from cache
 */
export function getLyricsMetadata(
  title: string,
  artist?: string
): LyricsMetadata | null {
  const key = generateKey(title, artist);
  const cached = metadataCache.get(key);

  if (!cached) {
    // Try without artist
    if (artist) {
      const keyWithoutArtist = generateKey(title, '');
      const cachedWithoutArtist = metadataCache.get(keyWithoutArtist);
      if (cachedWithoutArtist && Date.now() - cachedWithoutArtist.foundAt < CACHE_TTL) {
        return cachedWithoutArtist;
      }
    }
    return null;
  }

  // Check TTL
  if (Date.now() - cached.foundAt > CACHE_TTL) {
    metadataCache.delete(key);
    return null;
  }

  return cached;
}

/**
 * Clear expired cache entries
 */
export function cleanupCache(): void {
  const now = Date.now();
  for (const [key, value] of Array.from(metadataCache.entries())) {
    if (now - value.foundAt > CACHE_TTL) {
      metadataCache.delete(key);
    }
  }
}

// Run cleanup every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupCache, 10 * 60 * 1000);
}

export const lyricsMetadataCache = {
  store: storeLyricsMetadata,
  get: getLyricsMetadata,
  cleanup: cleanupCache,
};
