// ═══════════════════════════════════════════════════════════════════════════════
//                    MULTI-SOURCE DATA AGGREGATION SERVICE
//                    Internet-Powered Content for Any Song
// ═══════════════════════════════════════════════════════════════════════════════

import { ConfidenceLevel } from '../database/types';

/**
 * Unified data structure from any source
 */
export interface SourceData {
  source: string;
  sourceUrl?: string;
  reliability: 'verified' | 'high' | 'medium' | 'low';
  language: string;

  // Song metadata
  title?: string;
  artist?: string;
  album?: string;
  releaseYear?: number;
  genre?: string[];

  // Content
  compositionStory?: string;
  historicalContext?: string;
  authorBio?: string;
  lyrics?: string;

  // Facts
  facts?: string[];

  // Raw content for AI processing
  rawContent?: string;

  // Fetch metadata
  fetchedAt: string;
  responseTime: number;
}

/**
 * Aggregated result from all sources
 */
export interface AggregatedData {
  sources: SourceData[];
  totalSources: number;
  bestSource?: SourceData;
  mergedData: {
    title: string;
    artist: string;
    releaseYear?: number;
    genres: string[];
    compositionStories: string[];
    historicalContexts: string[];
    authorBios: string[];
    facts: string[];
  };
  overallReliability: ConfidenceLevel;
  searchDuration: number;
}

/**
 * Data source interface - all sources must implement this
 */
export interface IDataSource {
  name: string;
  priority: number; // Lower = higher priority
  reliability: 'verified' | 'high' | 'medium' | 'low';
  supportedLanguages: string[];

  search(query: string, language?: string): Promise<SourceData | null>;
  isAvailable(): Promise<boolean>;
}

// ═══════════════════════════════════════════════════════════════════════════════
//                              WIKIPEDIA SOURCE
// ═══════════════════════════════════════════════════════════════════════════════

export class WikipediaSource implements IDataSource {
  name = 'Wikipedia';
  priority = 1;
  reliability: 'high' = 'high';
  supportedLanguages = ['vi', 'en', 'ja', 'ko', 'zh', 'fr', 'de', 'es'];

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch('https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&format=json&origin=*');
      return response.ok;
    } catch {
      return false;
    }
  }

  async search(query: string, language: string = 'en'): Promise<SourceData | null> {
    const startTime = Date.now();

    try {
      // Search for the page
      const searchUrl = `https://${language}.wikipedia.org/w/api.php?` + new URLSearchParams({
        action: 'query',
        list: 'search',
        srsearch: query,
        srlimit: '5',
        format: 'json',
        origin: '*',
      });

      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();

      if (!searchData.query?.search?.length) {
        return null;
      }

      // Get the first relevant result
      const pageTitle = searchData.query.search[0].title;

      // Get full page content
      const contentUrl = `https://${language}.wikipedia.org/w/api.php?` + new URLSearchParams({
        action: 'query',
        titles: pageTitle,
        prop: 'extracts|info',
        exintro: 'false',
        explaintext: 'true',
        inprop: 'url',
        format: 'json',
        origin: '*',
      });

      const contentResponse = await fetch(contentUrl);
      const contentData = await contentResponse.json();

      const pages = contentData.query?.pages;
      const page = pages ? Object.values(pages)[0] as any : null;

      if (!page || page.missing) {
        return null;
      }

      // Parse content to extract relevant sections
      const content = page.extract || '';
      const { compositionStory, historicalContext, facts } = this.parseWikipediaContent(content);

      return {
        source: `Wikipedia (${language})`,
        sourceUrl: page.fullurl,
        reliability: 'high',
        language,
        title: pageTitle,
        compositionStory,
        historicalContext,
        facts,
        rawContent: content,
        fetchedAt: new Date().toISOString(),
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      console.error('[Wikipedia] Search error:', error);
      return null;
    }
  }

  private parseWikipediaContent(content: string): {
    compositionStory?: string;
    historicalContext?: string;
    facts: string[];
  } {
    const sections = content.split(/\n\n+/);
    const facts: string[] = [];
    let compositionStory: string | undefined;
    let historicalContext: string | undefined;

    // Look for composition/creation section
    const compositionKeywords = ['sáng tác', 'viết', 'composed', 'written', 'created', 'recording', 'production'];
    const historyKeywords = ['lịch sử', 'history', 'background', 'context', 'release'];

    for (const section of sections) {
      const lowerSection = section.toLowerCase();

      if (compositionKeywords.some(k => lowerSection.includes(k))) {
        compositionStory = (compositionStory || '') + section + '\n\n';
      }

      if (historyKeywords.some(k => lowerSection.includes(k))) {
        historicalContext = (historicalContext || '') + section + '\n\n';
      }

      // Extract interesting facts (sentences with years, names, etc.)
      const sentences = section.split(/[.!?]+/);
      for (const sentence of sentences) {
        if (sentence.match(/\b(19|20)\d{2}\b/) && sentence.length > 50 && sentence.length < 300) {
          facts.push(sentence.trim());
        }
      }
    }

    return {
      compositionStory: compositionStory?.trim(),
      historicalContext: historicalContext?.trim(),
      facts: facts.slice(0, 10), // Limit to 10 facts
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//                              MUSICBRAINZ SOURCE
// ═══════════════════════════════════════════════════════════════════════════════

export class MusicBrainzSource implements IDataSource {
  name = 'MusicBrainz';
  priority = 2;
  reliability: 'verified' = 'verified'; // Community-verified database
  supportedLanguages = ['*']; // Language-agnostic metadata

  private baseUrl = 'https://musicbrainz.org/ws/2';
  private userAgent = 'MelodyAI/1.0 (melody-ai-app)';

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/artist?query=test&limit=1&fmt=json`, {
        headers: { 'User-Agent': this.userAgent },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async search(query: string): Promise<SourceData | null> {
    const startTime = Date.now();

    try {
      // Search for recording (song)
      const searchUrl = `${this.baseUrl}/recording?` + new URLSearchParams({
        query: query,
        limit: '5',
        fmt: 'json',
      });

      const response = await fetch(searchUrl, {
        headers: { 'User-Agent': this.userAgent },
      });

      if (!response.ok) return null;

      const data = await response.json();
      const recording = data.recordings?.[0];

      if (!recording) return null;

      // Extract metadata
      const artist = recording['artist-credit']?.[0]?.artist?.name;
      const releaseYear = recording['first-release-date']?.substring(0, 4);

      // Get releases for album info
      const releases = recording.releases || [];
      const album = releases[0]?.title;

      return {
        source: 'MusicBrainz',
        sourceUrl: `https://musicbrainz.org/recording/${recording.id}`,
        reliability: 'verified',
        language: 'en',
        title: recording.title,
        artist,
        album,
        releaseYear: releaseYear ? parseInt(releaseYear) : undefined,
        rawContent: JSON.stringify(recording),
        fetchedAt: new Date().toISOString(),
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      console.error('[MusicBrainz] Search error:', error);
      return null;
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//                              GENIUS SOURCE (Lyrics + Stories)
// ═══════════════════════════════════════════════════════════════════════════════

export class GeniusSource implements IDataSource {
  name = 'Genius';
  priority = 3;
  reliability: 'high' = 'high';
  supportedLanguages = ['en', 'vi', 'es', 'fr', 'de', 'ja', 'ko'];

  private accessToken: string;

  constructor(accessToken?: string) {
    this.accessToken = accessToken || process.env.GENIUS_ACCESS_TOKEN || '';
  }

  async isAvailable(): Promise<boolean> {
    return !!this.accessToken;
  }

  async search(query: string): Promise<SourceData | null> {
    if (!this.accessToken) return null;

    const startTime = Date.now();

    try {
      const searchUrl = `https://api.genius.com/search?` + new URLSearchParams({ q: query });

      const response = await fetch(searchUrl, {
        headers: { 'Authorization': `Bearer ${this.accessToken}` },
      });

      if (!response.ok) return null;

      const data = await response.json();
      const hit = data.response?.hits?.[0]?.result;

      if (!hit) return null;

      // Get song details
      const songUrl = `https://api.genius.com/songs/${hit.id}`;
      const songResponse = await fetch(songUrl, {
        headers: { 'Authorization': `Bearer ${this.accessToken}` },
      });

      const songData = await songResponse.json();
      const song = songData.response?.song;

      // Extract description/story
      const description = song?.description?.plain || '';

      return {
        source: 'Genius',
        sourceUrl: hit.url,
        reliability: 'high',
        language: 'en',
        title: hit.title,
        artist: hit.primary_artist?.name,
        album: song?.album?.name,
        releaseYear: song?.release_date ? new Date(song.release_date).getFullYear() : undefined,
        compositionStory: description,
        rawContent: description,
        fetchedAt: new Date().toISOString(),
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      console.error('[Genius] Search error:', error);
      return null;
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//                         DATA SOURCE MANAGER
// ═══════════════════════════════════════════════════════════════════════════════

export class DataSourceManager {
  private sources: IDataSource[] = [];
  private cache: Map<string, { data: AggregatedData; expiry: number }> = new Map();
  private cacheTTL = 7 * 24 * 60 * 60 * 1000; // 7 days

  constructor() {
    // Register all sources
    this.sources = [
      new WikipediaSource(),
      new MusicBrainzSource(),
      new GeniusSource(),
    ];

    // Sort by priority
    this.sources.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Add custom data source
   */
  addSource(source: IDataSource): void {
    this.sources.push(source);
    this.sources.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Generate cache key
   */
  private getCacheKey(songTitle: string, artistName?: string): string {
    const normalized = `${songTitle}|${artistName || ''}`.toLowerCase().trim();
    return normalized;
  }

  /**
   * Check cache
   */
  private getFromCache(key: string): AggregatedData | null {
    const cached = this.cache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }
    return null;
  }

  /**
   * Save to cache
   */
  private saveToCache(key: string, data: AggregatedData): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + this.cacheTTL,
    });
  }

  /**
   * Search all sources in parallel
   */
  async searchAllSources(
    songTitle: string,
    artistName?: string,
    options?: {
      language?: string;
      maxSources?: number;
      timeout?: number;
    }
  ): Promise<AggregatedData> {
    const startTime = Date.now();
    const { language = 'vi', timeout = 10000 } = options || {};

    // Check cache first
    const cacheKey = this.getCacheKey(songTitle, artistName);
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    // Build search query
    const query = artistName ? `${songTitle} ${artistName}` : songTitle;

    // Search all sources in parallel with timeout
    const searchPromises = this.sources.map(async (source) => {
      try {
        const isAvailable = await source.isAvailable();
        if (!isAvailable) return null;

        // Race between search and timeout
        const result = await Promise.race([
          source.search(query, language),
          new Promise<null>((resolve) => setTimeout(() => resolve(null), timeout)),
        ]);

        return result;
      } catch (error) {
        console.error(`[${source.name}] Error:`, error);
        return null;
      }
    });

    // Also search Vietnamese Wikipedia specifically for Vietnamese songs
    if (language === 'vi') {
      const viWikipedia = new WikipediaSource();
      searchPromises.push(
        viWikipedia.search(query, 'vi').catch(() => null)
      );
    }

    const results = await Promise.all(searchPromises);
    const validResults = results.filter((r): r is SourceData => r !== null);

    // Aggregate results
    const aggregated = this.aggregateResults(validResults, songTitle, artistName);
    aggregated.searchDuration = Date.now() - startTime;

    // Cache the results
    if (validResults.length > 0) {
      this.saveToCache(cacheKey, aggregated);
    }

    return aggregated;
  }

  /**
   * Aggregate results from multiple sources
   */
  private aggregateResults(
    sources: SourceData[],
    songTitle: string,
    artistName?: string
  ): AggregatedData {
    // Merge all data
    const mergedData = {
      title: songTitle,
      artist: artistName || sources.find(s => s.artist)?.artist || 'Unknown',
      releaseYear: sources.find(s => s.releaseYear)?.releaseYear,
      genres: Array.from(new Set(sources.flatMap(s => s.genre || []))),
      compositionStories: sources
        .filter(s => s.compositionStory)
        .map(s => s.compositionStory!),
      historicalContexts: sources
        .filter(s => s.historicalContext)
        .map(s => s.historicalContext!),
      authorBios: sources
        .filter(s => s.authorBio)
        .map(s => s.authorBio!),
      facts: Array.from(new Set(sources.flatMap(s => s.facts || []))),
    };

    // Find best source (highest reliability)
    const reliabilityOrder = { verified: 0, high: 1, medium: 2, low: 3 };
    const sortedSources = [...sources].sort(
      (a, b) => reliabilityOrder[a.reliability] - reliabilityOrder[b.reliability]
    );

    // Calculate overall reliability
    let overallReliability: ConfidenceLevel = 'unknown';
    if (sources.some(s => s.reliability === 'verified')) {
      overallReliability = 'verified';
    } else if (sources.some(s => s.reliability === 'high')) {
      overallReliability = 'high';
    } else if (sources.length >= 2) {
      overallReliability = 'medium';
    } else if (sources.length === 1) {
      overallReliability = 'low';
    }

    return {
      sources,
      totalSources: sources.length,
      bestSource: sortedSources[0],
      mergedData,
      overallReliability,
      searchDuration: 0, // Will be set by caller
    };
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache stats
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Singleton instance
export const dataSourceManager = new DataSourceManager();
