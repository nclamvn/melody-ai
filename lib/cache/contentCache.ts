// ═══════════════════════════════════════════════════════════════════════════════
//                    MULTI-TIER CACHING SYSTEM
//                    Memory Cache with Optional Redis Support
// ═══════════════════════════════════════════════════════════════════════════════

import { SynthesizedContent } from '../services/aiContentSynthesizer';

/**
 * Cache entry structure
 */
interface CacheEntry<T> {
  data: T;
  createdAt: number;
  expiresAt: number;
  hitCount: number;
  source: 'database' | 'internet' | 'ai_generated';
  confidence: string;
}

/**
 * Cache configuration
 */
interface CacheConfig {
  // TTL in seconds
  databaseTTL: number;      // Verified content: 30 days
  internetTTL: number;      // Internet content: 7 days
  aiGeneratedTTL: number;   // AI content: 3 days
  minimalTTL: number;       // Low quality: 1 day

  // Size limits
  maxMemoryItems: number;   // In-memory cache limit
}

const DEFAULT_CONFIG: CacheConfig = {
  databaseTTL: 30 * 24 * 60 * 60,      // 30 days
  internetTTL: 7 * 24 * 60 * 60,       // 7 days
  aiGeneratedTTL: 3 * 24 * 60 * 60,    // 3 days
  minimalTTL: 24 * 60 * 60,            // 1 day
  maxMemoryItems: 1000,
};

/**
 * Multi-tier cache: Memory-based with optional Redis extension
 */
export class ContentCache {
  private memoryCache: Map<string, CacheEntry<any>> = new Map();
  private config: CacheConfig;
  private stats = {
    hits: 0,
    misses: 0,
    memoryHits: 0,
  };

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Generate cache key
   */
  private generateKey(songTitle: string, artistName?: string): string {
    const normalized = `song:${songTitle.toLowerCase().trim()}:${(artistName || '').toLowerCase().trim()}`;
    return normalized.replace(/\s+/g, '_');
  }

  /**
   * Get TTL based on content source
   */
  private getTTL(source: CacheEntry<any>['source'], confidence: string): number {
    if (source === 'database' || confidence === 'verified') {
      return this.config.databaseTTL;
    }
    if (confidence === 'high') {
      return this.config.internetTTL;
    }
    if (confidence === 'medium') {
      return this.config.aiGeneratedTTL;
    }
    return this.config.minimalTTL;
  }

  /**
   * Get from cache
   */
  async get<T>(songTitle: string, artistName?: string): Promise<T | null> {
    const key = this.generateKey(songTitle, artistName);

    // Check memory cache
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && memoryEntry.expiresAt > Date.now()) {
      this.stats.hits++;
      this.stats.memoryHits++;
      memoryEntry.hitCount++;
      return memoryEntry.data as T;
    }

    // Remove expired entry
    if (memoryEntry) {
      this.memoryCache.delete(key);
    }

    this.stats.misses++;
    return null;
  }

  /**
   * Set cache entry
   */
  async set<T>(
    songTitle: string,
    artistName: string | undefined,
    data: T,
    source: CacheEntry<T>['source'],
    confidence: string
  ): Promise<void> {
    const key = this.generateKey(songTitle, artistName);
    const ttl = this.getTTL(source, confidence);

    const entry: CacheEntry<T> = {
      data,
      createdAt: Date.now(),
      expiresAt: Date.now() + (ttl * 1000),
      hitCount: 0,
      source,
      confidence,
    };

    // Set in memory
    this.memoryCache.set(key, entry);
    this.pruneMemoryCache();
  }

  /**
   * Invalidate cache entry
   */
  async invalidate(songTitle: string, artistName?: string): Promise<void> {
    const key = this.generateKey(songTitle, artistName);
    this.memoryCache.delete(key);
  }

  /**
   * Prune memory cache to stay within limits
   */
  private pruneMemoryCache(): void {
    if (this.memoryCache.size <= this.config.maxMemoryItems) {
      return;
    }

    // Remove expired entries first
    const now = Date.now();
    const entries = Array.from(this.memoryCache.entries());
    for (const [key, entry] of entries) {
      if (entry.expiresAt < now) {
        this.memoryCache.delete(key);
      }
    }

    // If still over limit, remove least recently used entries
    if (this.memoryCache.size > this.config.maxMemoryItems) {
      const entries = Array.from(this.memoryCache.entries())
        .sort((a, b) => a[1].hitCount - b[1].hitCount);

      const toRemove = entries.slice(0, this.memoryCache.size - this.config.maxMemoryItems);
      for (const [key] of toRemove) {
        this.memoryCache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const hitRate = this.stats.hits / (this.stats.hits + this.stats.misses) || 0;
    return {
      ...this.stats,
      hitRate: `${(hitRate * 100).toFixed(2)}%`,
      memorySize: this.memoryCache.size,
    };
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.memoryCache.clear();
  }

  /**
   * Warm up cache with popular songs
   */
  async warmUp(popularSongs: Array<{ title: string; artist: string }>): Promise<void> {

    // Import dynamically to avoid circular dependencies
    const { getSmartContent } = await import('../services/aiContentSynthesizer');

    for (const song of popularSongs) {
      const cached = await this.get(song.title, song.artist);
      if (!cached) {
        try {
          const content = await getSmartContent(song.title, song.artist);
          await this.set(song.title, song.artist, content, 'internet', content.confidence);
        } catch (error) {
          console.warn(`[Cache] Failed to warm: ${song.title}`);
        }

        // Rate limit - wait 1 second between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

  }
}

// Singleton instance
export const contentCache = new ContentCache();
