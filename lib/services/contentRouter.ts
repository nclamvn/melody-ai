// ═══════════════════════════════════════════════════════════════════════════════
//                    SMART CONTENT ROUTER
//                    Determines best strategy for each request
//                    Tier 1: Database → Tier 2: Cache → Tier 3: Internet + AI
// ═══════════════════════════════════════════════════════════════════════════════

import { songDatabase } from '../database/songDatabase';
import { contentCache } from '../cache/contentCache';
import { rateLimiter } from './rateLimiter';
import { dataSourceManager, AggregatedData } from './dataSourceManager';
import { synthesizeContent, SynthesizedContent } from './aiContentSynthesizer';

/**
 * Content request options
 */
interface ContentRequestOptions {
  songTitle: string;
  artistName?: string;
  language?: string;

  // Control flags
  forceRefresh?: boolean;       // Skip cache
  skipDatabase?: boolean;        // Skip local DB
  skipInternet?: boolean;        // Skip internet search
  maxWaitTime?: number;          // Max wait time in ms
  qualityThreshold?: 'any' | 'basic' | 'moderate' | 'rich';
}

/**
 * Content response
 */
export interface ContentResponse {
  success: boolean;
  content?: SynthesizedContent;
  source: 'database' | 'cache' | 'internet' | 'fallback';

  // Metrics
  processingTime: number;
  cacheHit: boolean;
  sourcesUsed: string[];

  // Errors
  error?: string;
  warnings?: string[];
}

/**
 * Smart content router
 */
export class ContentRouter {

  /**
   * Get content with intelligent routing
   */
  async getContent(options: ContentRequestOptions): Promise<ContentResponse> {
    const startTime = Date.now();
    const warnings: string[] = [];

    const {
      songTitle,
      artistName,
      language = 'vi',
      forceRefresh = false,
      skipDatabase = false,
      skipInternet = false,
      maxWaitTime = 10000,
      qualityThreshold = 'any',
    } = options;

    // ═══════════════════════════════════════════════════════════════════════
    // TIER 1: Local Database (Fastest, Most Reliable)
    // ═══════════════════════════════════════════════════════════════════════

    if (!skipDatabase && !forceRefresh) {
      const dbResult = songDatabase.searchSong(songTitle, artistName || '');

      if (dbResult && dbResult.contentQuality.overallConfidence !== 'unknown') {
        const entry = dbResult;

        const content: SynthesizedContent = {
          summary: entry.summary,
          compositionStory: entry.compositionContext.narrative,
          historicalContext: entry.historicalContext?.eraDescription || '',
          title: entry.metadata.title,
          artist: entry.metadata.composerName,
          releaseYear: entry.metadata.releaseYear,
          genres: entry.metadata.genres,
          authorBio: entry.historicalContext?.culturalSignificance || '',
          facts: entry.interestingFacts?.map(f => f.content) || [],
          sources: entry.sources.map(s => ({
            name: s.title,
            url: s.url,
            reliability: s.reliability,
          })),
          confidence: entry.contentQuality.overallConfidence,
          contentQuality: 'rich',
          synthesizedAt: new Date().toISOString(),
          processingTime: Date.now() - startTime,
        };


        return {
          success: true,
          content,
          source: 'database',
          processingTime: Date.now() - startTime,
          cacheHit: false,
          sourcesUsed: ['local_database'],
        };
      }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // TIER 2: Cache Check
    // ═══════════════════════════════════════════════════════════════════════

    if (!forceRefresh) {
      const cached = await contentCache.get<SynthesizedContent>(songTitle, artistName);

      if (cached) {
        // Check quality threshold
        const qualityMet = this.meetsQualityThreshold(cached.contentQuality, qualityThreshold);

        if (qualityMet) {

          return {
            success: true,
            content: cached,
            source: 'cache',
            processingTime: Date.now() - startTime,
            cacheHit: true,
            sourcesUsed: cached.sources.map(s => s.name),
          };
        } else {
          warnings.push(`Cached content quality (${cached.contentQuality}) below threshold (${qualityThreshold}), refreshing...`);
        }
      }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // TIER 3: Internet Search + AI Synthesis
    // ═══════════════════════════════════════════════════════════════════════

    if (!skipInternet) {
      try {
        // Check rate limits
        const openaiLimit = await rateLimiter.checkLimit('openai');
        if (!openaiLimit.allowed) {
          warnings.push('OpenAI rate limit approaching, using cached/fallback');
        }


        // Search with timeout
        const searchPromise = dataSourceManager.searchAllSources(
          songTitle,
          artistName,
          { language, timeout: maxWaitTime / 2 }
        );

        const aggregatedData = await Promise.race([
          searchPromise,
          new Promise<AggregatedData>((_, reject) =>
            setTimeout(() => reject(new Error('Search timeout')), maxWaitTime)
          ),
        ]);

        // Record OpenAI request
        rateLimiter.recordRequest('openai');

        // Synthesize with AI
        if (aggregatedData.sources.length > 0 || process.env.OPENAI_API_KEY) {
          const synthesized = await synthesizeContent(aggregatedData);

          // Cache the result
          await contentCache.set(
            songTitle,
            artistName,
            synthesized,
            'internet',
            synthesized.confidence
          );


          return {
            success: true,
            content: synthesized,
            source: 'internet',
            processingTime: Date.now() - startTime,
            cacheHit: false,
            sourcesUsed: aggregatedData.sources.map(s => s.source),
            warnings: warnings.length > 0 ? warnings : undefined,
          };
        }
      } catch (error) {
        console.error('[ContentRouter] Internet search error:', error);
        warnings.push(`Internet search failed: ${error}`);
      }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // TIER 4: Fallback (Minimal content)
    // ═══════════════════════════════════════════════════════════════════════


    const fallbackContent: SynthesizedContent = {
      summary: `${songTitle} is a song${artistName ? ` by ${artistName}` : ''}.`,
      compositionStory: 'Detailed information about this song is not available in our database. We are continuously expanding our content. If you have information about this song, please consider contributing!',
      historicalContext: '',
      title: songTitle,
      artist: artistName || 'Unknown Artist',
      genres: [],
      facts: [],
      sources: [],
      confidence: 'unknown',
      contentQuality: 'minimal',
      synthesizedAt: new Date().toISOString(),
      processingTime: Date.now() - startTime,
    };

    return {
      success: true,
      content: fallbackContent,
      source: 'fallback',
      processingTime: Date.now() - startTime,
      cacheHit: false,
      sourcesUsed: [],
      warnings: [
        'No information found from any source',
        ...warnings,
      ],
    };
  }

  /**
   * Check if content quality meets threshold
   */
  private meetsQualityThreshold(
    quality: SynthesizedContent['contentQuality'],
    threshold: ContentRequestOptions['qualityThreshold']
  ): boolean {
    const qualityOrder = { minimal: 0, basic: 1, moderate: 2, rich: 3 };
    const thresholdOrder = { any: 0, basic: 1, moderate: 2, rich: 3 };

    return qualityOrder[quality] >= thresholdOrder[threshold || 'any'];
  }

  /**
   * Batch fetch multiple songs
   */
  async batchGetContent(
    songs: Array<{ title: string; artist?: string }>,
    options?: Partial<ContentRequestOptions>
  ): Promise<ContentResponse[]> {
    const results: ContentResponse[] = [];

    // Process in parallel with concurrency limit
    const concurrency = 3;

    for (let i = 0; i < songs.length; i += concurrency) {
      const batch = songs.slice(i, i + concurrency);

      const batchResults = await Promise.all(
        batch.map(song =>
          this.getContent({
            songTitle: song.title,
            artistName: song.artist,
            ...options,
          })
        )
      );

      results.push(...batchResults);

      // Small delay between batches
      if (i + concurrency < songs.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    return results;
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      cache: contentCache.getStats(),
      rateLimits: rateLimiter.getStats(),
      dailyCost: rateLimiter.getDailyCost(),
    };
  }
}

// Singleton instance
export const contentRouter = new ContentRouter();
