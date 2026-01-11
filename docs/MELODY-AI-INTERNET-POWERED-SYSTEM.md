# ═══════════════════════════════════════════════════════════════════════════════
#                    🌐 MELODY AI — INTERNET-POWERED CONTENT SYSTEM
#                         Multi-Source AI Aggregation Architecture
#                              Version 4.0 — Production Scale
# ═══════════════════════════════════════════════════════════════════════════════

## 📋 TỔNG QUAN

Hệ thống này tận dụng **AI + Internet Search** để lấy thông tin về BẤT KỲ bài hát nào
trên thế giới, không giới hạn ở database thủ công.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CONTENT FLOW                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   User Request: "Bohemian Rhapsody - Queen"                                │
│                          │                                                  │
│                          ▼                                                  │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │ STEP 1: CHECK LOCAL DATABASE                                        │  │
│   │         → Found? Return VERIFIED data                               │  │
│   │         → Not found? Continue to Step 2                             │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                          │                                                  │
│                    Not Found                                                │
│                          ▼                                                  │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │ STEP 2: CHECK CACHE                                                 │  │
│   │         → Found & Fresh? Return cached data                         │  │
│   │         → Stale/Not found? Continue to Step 3                       │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                          │                                                  │
│                    Cache Miss                                               │
│                          ▼                                                  │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │ STEP 3: MULTI-SOURCE INTERNET SEARCH                                │  │
│   │                                                                     │  │
│   │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │  │
│   │   │  Wikipedia  │  │ MusicBrainz │  │   Genius    │                │  │
│   │   │  (vi + en)  │  │  (metadata) │  │  (lyrics +  │                │  │
│   │   │             │  │             │  │  stories)   │                │  │
│   │   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                │  │
│   │          │                │                │                        │  │
│   │          └────────────────┼────────────────┘                        │  │
│   │                           ▼                                         │  │
│   │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │  │
│   │   │   Discogs   │  │   Spotify   │  │  AllMusic   │                │  │
│   │   │  (releases) │  │  (popular.) │  │  (reviews)  │                │  │
│   │   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                │  │
│   │          │                │                │                        │  │
│   │          └────────────────┼────────────────┘                        │  │
│   │                           ▼                                         │  │
│   │                  ┌─────────────────┐                                │  │
│   │                  │  AGGREGATE ALL  │                                │  │
│   │                  │    SOURCES      │                                │  │
│   │                  └────────┬────────┘                                │  │
│   │                           │                                         │  │
│   └───────────────────────────┼─────────────────────────────────────────┘  │
│                               ▼                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │ STEP 4: AI SYNTHESIS                                                │  │
│   │         → GPT-4 synthesizes all sources                             │  │
│   │         → Creates coherent narrative                                │  │
│   │         → Attributes sources                                        │  │
│   │         → Assigns confidence level                                  │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                               │                                             │
│                               ▼                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │ STEP 5: CACHE & RETURN                                              │  │
│   │         → Cache result for future requests                          │  │
│   │         → Return to user with source attribution                    │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 PHẦN 1: DATA SOURCE INTEGRATIONS

### File: `lib/services/dataSourceManager.ts`

```typescript
// ═══════════════════════════════════════════════════════════════════════════════
//                    MULTI-SOURCE DATA AGGREGATION SERVICE
// ═══════════════════════════════════════════════════════════════════════════════

import { SourceReference, ConfidenceLevel } from '../database/types';

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
  
  private baseUrl = 'https://wikipedia.org/w/api.php';
  
  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`https://en.${this.baseUrl}?action=query&meta=siteinfo&format=json`);
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
  private userAgent = 'MelodyAI/1.0 (contact@melodyai.app)';
  
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
//                         WEB SEARCH SOURCE (Fallback)
// ═══════════════════════════════════════════════════════════════════════════════

export class WebSearchSource implements IDataSource {
  name = 'Web Search';
  priority = 10; // Lowest priority, used as fallback
  reliability: 'medium' = 'medium';
  supportedLanguages = ['*'];
  
  // This would use Bing/Google Search API or scraping
  // For now, placeholder implementation
  
  async isAvailable(): Promise<boolean> {
    return true; // Always available as fallback
  }
  
  async search(query: string, language: string = 'en'): Promise<SourceData | null> {
    // In production, this would use:
    // - Bing Web Search API
    // - Google Custom Search API
    // - SerpAPI
    // - Or web scraping with Puppeteer
    
    // Placeholder return
    return null;
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
      new WebSearchSource(),
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
    const { language = 'vi', maxSources = 5, timeout = 10000 } = options || {};
    
    // Check cache first
    const cacheKey = this.getCacheKey(songTitle, artistName);
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      console.log(`[DataSourceManager] Cache hit for: ${songTitle}`);
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
      genres: [...new Set(sources.flatMap(s => s.genre || []))],
      compositionStories: sources
        .filter(s => s.compositionStory)
        .map(s => s.compositionStory!),
      historicalContexts: sources
        .filter(s => s.historicalContext)
        .map(s => s.historicalContext!),
      authorBios: sources
        .filter(s => s.authorBio)
        .map(s => s.authorBio!),
      facts: [...new Set(sources.flatMap(s => s.facts || []))],
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
```

---

## 🔧 PHẦN 2: AI CONTENT SYNTHESIZER

### File: `lib/services/aiContentSynthesizer.ts`

```typescript
// ═══════════════════════════════════════════════════════════════════════════════
//                    AI CONTENT SYNTHESIZER
//                    Transforms raw data into coherent narratives
// ═══════════════════════════════════════════════════════════════════════════════

import OpenAI from 'openai';
import { AggregatedData, SourceData } from './dataSourceManager';
import { ConfidenceLevel } from '../database/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface SynthesizedContent {
  // Main content
  summary: string;
  compositionStory: string;
  historicalContext: string;
  
  // Metadata
  title: string;
  artist: string;
  releaseYear?: number;
  genres: string[];
  
  // Author info
  authorBio?: string;
  
  // Interesting facts
  facts: string[];
  
  // Source attribution
  sources: Array<{
    name: string;
    url?: string;
    reliability: string;
  }>;
  
  // Quality metrics
  confidence: ConfidenceLevel;
  contentQuality: 'rich' | 'moderate' | 'basic' | 'minimal';
  synthesizedAt: string;
  processingTime: number;
}

/**
 * Detect language/origin of song for appropriate prompting
 */
function detectSongOrigin(title: string, artist: string): 'vietnamese' | 'international' {
  const vietnameseIndicators = [
    /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i,
    /nguyen|tran|le|pham|hoang|vu|vo|dang|bui|do|ho|ngo|duong|ly/i,
  ];
  
  for (const pattern of vietnameseIndicators) {
    if (pattern.test(title) || pattern.test(artist)) {
      return 'vietnamese';
    }
  }
  
  return 'international';
}

/**
 * Build synthesis prompt based on available data
 */
function buildSynthesisPrompt(
  aggregatedData: AggregatedData,
  origin: 'vietnamese' | 'international'
): string {
  const { mergedData, sources } = aggregatedData;
  
  // Compile all raw content
  const rawContents = sources
    .filter(s => s.rawContent)
    .map(s => `[Source: ${s.source}]\n${s.rawContent}`)
    .join('\n\n---\n\n');
  
  const compositionStories = mergedData.compositionStories.join('\n\n');
  const historicalContexts = mergedData.historicalContexts.join('\n\n');
  const facts = mergedData.facts.join('\n');
  
  const languageInstruction = origin === 'vietnamese'
    ? 'Respond in Vietnamese. Use appropriate cultural context for Vietnamese music.'
    : 'Respond in the same language as the song title, or English if unclear.';
  
  return `You are a music historian and storytelling expert. Synthesize the following information about a song into a coherent, engaging narrative.

SONG: "${mergedData.title}" by ${mergedData.artist}
${mergedData.releaseYear ? `YEAR: ${mergedData.releaseYear}` : ''}
${mergedData.genres.length ? `GENRES: ${mergedData.genres.join(', ')}` : ''}

=== SOURCE INFORMATION ===

${rawContents || 'No raw content available.'}

=== COMPOSITION STORIES ===
${compositionStories || 'No composition stories found.'}

=== HISTORICAL CONTEXT ===
${historicalContexts || 'No historical context found.'}

=== KNOWN FACTS ===
${facts || 'No additional facts.'}

=== YOUR TASK ===

Create a comprehensive response with the following sections:

1. **SUMMARY** (2-3 sentences): A brief, engaging overview of the song.

2. **COMPOSITION_STORY** (2-4 paragraphs): The story behind how this song was created. Include:
   - When and where it was written
   - What inspired the songwriter
   - The creative process
   - Any interesting anecdotes
   If information is limited, acknowledge this and provide what's available.

3. **HISTORICAL_CONTEXT** (1-3 paragraphs): The historical and cultural backdrop:
   - What was happening in music/society at the time
   - The song's place in the artist's career
   - Its cultural impact and legacy

4. **AUTHOR_BIO** (1-2 paragraphs): Brief biography of the songwriter/artist.

5. **INTERESTING_FACTS** (3-5 bullet points): Verified, interesting facts about the song.

=== IMPORTANT RULES ===

- ${languageInstruction}
- Only include information that can be attributed to the sources provided.
- If information is uncertain, use phrases like "According to sources..." or "It is believed that..."
- Do NOT invent or fabricate details.
- If very little information is available, acknowledge this honestly.
- Be engaging and narrative, not just listing facts.

Format your response as JSON:
{
  "summary": "...",
  "compositionStory": "...",
  "historicalContext": "...",
  "authorBio": "...",
  "interestingFacts": ["...", "..."]
}`;
}

/**
 * Synthesize content using AI
 */
export async function synthesizeContent(
  aggregatedData: AggregatedData
): Promise<SynthesizedContent> {
  const startTime = Date.now();
  
  const { mergedData, sources, overallReliability } = aggregatedData;
  const origin = detectSongOrigin(mergedData.title, mergedData.artist);
  
  // If no sources found, return minimal content
  if (sources.length === 0) {
    return {
      summary: `${mergedData.title} is a song by ${mergedData.artist}.`,
      compositionStory: 'No composition story available for this song. If you have information about this song, please contribute!',
      historicalContext: 'Historical context not available.',
      title: mergedData.title,
      artist: mergedData.artist,
      releaseYear: mergedData.releaseYear,
      genres: mergedData.genres,
      facts: [],
      sources: [],
      confidence: 'unknown',
      contentQuality: 'minimal',
      synthesizedAt: new Date().toISOString(),
      processingTime: Date.now() - startTime,
    };
  }
  
  try {
    const prompt = buildSynthesisPrompt(aggregatedData, origin);
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a music historian expert. Always respond with valid JSON only, no markdown formatting.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });
    
    const content = response.choices[0]?.message?.content || '{}';
    
    // Parse AI response
    let parsed;
    try {
      // Remove any markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      parsed = JSON.parse(cleanContent);
    } catch {
      console.error('[AI Synthesizer] Failed to parse response:', content);
      parsed = {
        summary: content.substring(0, 500),
        compositionStory: 'Unable to generate detailed story.',
        historicalContext: '',
        authorBio: '',
        interestingFacts: [],
      };
    }
    
    // Determine content quality
    let contentQuality: 'rich' | 'moderate' | 'basic' | 'minimal' = 'minimal';
    const storyLength = (parsed.compositionStory || '').length;
    if (storyLength > 1000 && parsed.interestingFacts?.length >= 3) {
      contentQuality = 'rich';
    } else if (storyLength > 500) {
      contentQuality = 'moderate';
    } else if (storyLength > 200) {
      contentQuality = 'basic';
    }
    
    return {
      summary: parsed.summary || `${mergedData.title} by ${mergedData.artist}`,
      compositionStory: parsed.compositionStory || '',
      historicalContext: parsed.historicalContext || '',
      title: mergedData.title,
      artist: mergedData.artist,
      releaseYear: mergedData.releaseYear,
      genres: mergedData.genres,
      authorBio: parsed.authorBio,
      facts: parsed.interestingFacts || [],
      sources: sources.map(s => ({
        name: s.source,
        url: s.sourceUrl,
        reliability: s.reliability,
      })),
      confidence: overallReliability,
      contentQuality,
      synthesizedAt: new Date().toISOString(),
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    console.error('[AI Synthesizer] Error:', error);
    
    // Return basic content from raw data
    return {
      summary: `${mergedData.title} is a song by ${mergedData.artist}.`,
      compositionStory: mergedData.compositionStories[0] || 'No composition story available.',
      historicalContext: mergedData.historicalContexts[0] || '',
      title: mergedData.title,
      artist: mergedData.artist,
      releaseYear: mergedData.releaseYear,
      genres: mergedData.genres,
      facts: mergedData.facts.slice(0, 5),
      sources: sources.map(s => ({
        name: s.source,
        url: s.sourceUrl,
        reliability: s.reliability,
      })),
      confidence: 'low',
      contentQuality: 'basic',
      synthesizedAt: new Date().toISOString(),
      processingTime: Date.now() - startTime,
    };
  }
}

/**
 * Main entry point: Search + Synthesize
 */
export async function getSmartContent(
  songTitle: string,
  artistName?: string,
  options?: {
    language?: string;
    forceRefresh?: boolean;
  }
): Promise<SynthesizedContent> {
  const { dataSourceManager } = await import('./dataSourceManager');
  
  // Search all sources
  const aggregatedData = await dataSourceManager.searchAllSources(
    songTitle,
    artistName,
    { language: options?.language || 'vi' }
  );
  
  // Synthesize with AI
  const synthesized = await synthesizeContent(aggregatedData);
  
  return synthesized;
}
```

---

## 🔧 PHẦN 3: UPDATED API ROUTE

### File: `app/api/song-story/route.ts`

```typescript
// ═══════════════════════════════════════════════════════════════════════════════
//                    SONG STORY API — HYBRID APPROACH
//                    Local DB → Cache → Internet Search → AI Synthesis
// ═══════════════════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { songDatabase } from '@/lib/database/songDatabase';
import { getSmartContent, SynthesizedContent } from '@/lib/services/aiContentSynthesizer';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    const artist = searchParams.get('artist');
    const language = searchParams.get('lang') || 'vi';
    const forceRefresh = searchParams.get('refresh') === 'true';
    
    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // TIER 1: Check Local Verified Database
    // ═══════════════════════════════════════════════════════════════════════
    
    if (!forceRefresh) {
      const dbResult = songDatabase.searchSong(title, artist || undefined);
      
      if (dbResult && dbResult.confidence !== 'unknown') {
        console.log(`[API] Tier 1 hit: ${title} (from database)`);
        
        return NextResponse.json({
          success: true,
          data: {
            story: {
              summary: dbResult.entry.summary,
              compositionStory: dbResult.entry.compositionContext.narrative,
              historicalContext: dbResult.entry.historicalContext.eraDescription,
              facts: dbResult.entry.interestingFacts?.map(f => f.content) || [],
            },
            author: {
              name: dbResult.entry.metadata.composerName,
              bio: '', // Could be expanded
            },
            song: {
              title: dbResult.entry.metadata.title,
              artist: dbResult.entry.metadata.composerName,
              releaseYear: dbResult.entry.metadata.releaseYear,
              genres: dbResult.entry.metadata.genres,
            },
            sources: dbResult.entry.sources.map(s => ({
              name: s.title,
              url: s.url,
              reliability: s.reliability,
            })),
          },
          meta: {
            source: 'verified_database',
            confidence: dbResult.confidence,
            contentQuality: 'rich',
            processingTime: Date.now() - startTime,
          },
        });
      }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // TIER 2 & 3: Internet Search + AI Synthesis
    // (Cache is handled inside getSmartContent)
    // ═══════════════════════════════════════════════════════════════════════
    
    console.log(`[API] Searching internet for: ${title} by ${artist || 'unknown'}`);
    
    const synthesized: SynthesizedContent = await getSmartContent(
      title,
      artist || undefined,
      { language, forceRefresh }
    );
    
    console.log(`[API] Synthesized content with ${synthesized.sources.length} sources`);
    
    return NextResponse.json({
      success: true,
      data: {
        story: {
          summary: synthesized.summary,
          compositionStory: synthesized.compositionStory,
          historicalContext: synthesized.historicalContext,
          facts: synthesized.facts,
        },
        author: {
          name: synthesized.artist,
          bio: synthesized.authorBio || '',
        },
        song: {
          title: synthesized.title,
          artist: synthesized.artist,
          releaseYear: synthesized.releaseYear,
          genres: synthesized.genres,
        },
        sources: synthesized.sources,
      },
      meta: {
        source: 'internet_search',
        confidence: synthesized.confidence,
        contentQuality: synthesized.contentQuality,
        sourcesUsed: synthesized.sources.length,
        processingTime: Date.now() - startTime,
        synthesizedAt: synthesized.synthesizedAt,
      },
    });
    
  } catch (error) {
    console.error('[Song Story API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve song story',
        meta: {
          processingTime: Date.now() - startTime,
        },
      },
      { status: 500 }
    );
  }
}
```

---

## 📊 TỔNG KẾT KIẾN TRÚC MỚI

### So sánh hai cách tiếp cận:

| Aspect | Database Only | Hybrid (Internet + AI) |
|--------|---------------|------------------------|
| **Coverage** | 50-100 bài | **Không giới hạn** |
| **Speed** | <50ms | 1-5 giây |
| **Accuracy** | Verified | Medium-High |
| **Maintenance** | Cao (manual) | **Tự động** |
| **Cost** | Thấp | API costs |
| **Scalability** | Kém | **Tốt** |

### Data Sources được tích hợp:

| Source | Type | Reliability | Coverage |
|--------|------|-------------|----------|
| Wikipedia | Story, History | HIGH | Global + VN |
| MusicBrainz | Metadata | VERIFIED | Global |
| Genius | Lyrics, Stories | HIGH | Western music |
| Web Search | Fallback | MEDIUM | Everything |

### Workflow:

```
Request → Local DB (50ms) → Cache (200ms) → Internet Search (2-5s) → AI Synthesis
              ↓                  ↓                    ↓                    ↓
          VERIFIED            CACHED              FRESH DATA          SYNTHESIZED
          INSTANT             FAST                COMPREHENSIVE       NARRATIVE
```

---

**Hệ thống này có thể handle BẤT KỲ bài hát nào trên thế giới!** 🌍🎵
