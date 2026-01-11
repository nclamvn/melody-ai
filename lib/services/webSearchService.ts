// ═══════════════════════════════════════════════════════════════════════════════
//                    WEB SEARCH SERVICE — PRODUCTION GRADE
//                     Wikipedia Integration
// ═══════════════════════════════════════════════════════════════════════════════

import { ConfidenceLevel } from '../database/types';

interface WikipediaSearchResult {
  title: string;
  extract: string;
  pageid: number;
  url: string;
}

interface WikipediaFullContent {
  title: string;
  content: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
  lastModified: string;
  url: string;
}

export interface WebSearchResult {
  wikipedia: WikipediaFullContent | null;
  additionalSources: Array<{
    type: string;
    title: string;
    url: string;
    reliability: string;
  }>;
  searchMetadata: {
    query: string;
    timestamp: string;
    sourcesFound: number;
    confidence: ConfidenceLevel;
  };
}

class WebSearchService {
  private wikipediaApiUrl = 'https://vi.wikipedia.org/w/api.php';
  private wikipediaEnApiUrl = 'https://en.wikipedia.org/w/api.php';

  /**
   * Search Wikipedia for song/artist information
   */
  async searchWikipedia(
    query: string,
    language: 'vi' | 'en' = 'vi'
  ): Promise<WikipediaSearchResult[]> {
    const apiUrl = language === 'vi' ? this.wikipediaApiUrl : this.wikipediaEnApiUrl;

    const params = new URLSearchParams({
      action: 'query',
      list: 'search',
      srsearch: query,
      srlimit: '5',
      format: 'json',
      origin: '*',
    });

    try {
      const response = await fetch(`${apiUrl}?${params}`, {
        headers: {
          'User-Agent': 'MelodyAI/1.0 (music-information-service)',
        },
      });

      if (!response.ok) {
        console.error(`Wikipedia API error: ${response.status}`);
        return [];
      }

      const data = await response.json();

      if (!data.query?.search) {
        return [];
      }

      const results: WikipediaSearchResult[] = [];

      for (const item of data.query.search) {
        // Get extract for each result
        const extractParams = new URLSearchParams({
          action: 'query',
          pageids: item.pageid.toString(),
          prop: 'extracts',
          exintro: 'true',
          explaintext: 'true',
          format: 'json',
          origin: '*',
        });

        try {
          const extractResponse = await fetch(`${apiUrl}?${extractParams}`, {
            headers: {
              'User-Agent': 'MelodyAI/1.0 (music-information-service)',
            },
          });
          const extractData = await extractResponse.json();
          const page = extractData.query?.pages?.[item.pageid];

          results.push({
            title: item.title,
            extract: page?.extract || '',
            pageid: item.pageid,
            url: `https://${language}.wikipedia.org/wiki/${encodeURIComponent(
              item.title.replace(/ /g, '_')
            )}`,
          });
        } catch (err) {
          // Continue with basic info if extract fails
          results.push({
            title: item.title,
            extract: '',
            pageid: item.pageid,
            url: `https://${language}.wikipedia.org/wiki/${encodeURIComponent(
              item.title.replace(/ /g, '_')
            )}`,
          });
        }
      }

      return results;
    } catch (error) {
      console.error('Wikipedia search error:', error);
      return [];
    }
  }

  /**
   * Get full Wikipedia article content
   */
  async getWikipediaArticle(
    title: string,
    language: 'vi' | 'en' = 'vi'
  ): Promise<WikipediaFullContent | null> {
    const apiUrl = language === 'vi' ? this.wikipediaApiUrl : this.wikipediaEnApiUrl;

    const params = new URLSearchParams({
      action: 'query',
      titles: title,
      prop: 'extracts|revisions|info',
      explaintext: 'true',
      rvprop: 'timestamp',
      inprop: 'url',
      format: 'json',
      origin: '*',
    });

    try {
      const response = await fetch(`${apiUrl}?${params}`, {
        headers: {
          'User-Agent': 'MelodyAI/1.0 (music-information-service)',
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      const pages = data.query?.pages;
      if (!pages) return null;

      const pageId = Object.keys(pages)[0];
      if (pageId === '-1') return null; // Page not found

      const page = pages[pageId];

      // Parse content into sections
      const content = page.extract || '';
      const sections = this.parseWikipediaSections(content);

      return {
        title: page.title,
        content: content,
        sections: sections,
        lastModified: page.revisions?.[0]?.timestamp || '',
        url:
          page.fullurl ||
          `https://${language}.wikipedia.org/wiki/${encodeURIComponent(
            title.replace(/ /g, '_')
          )}`,
      };
    } catch (error) {
      console.error('Wikipedia article fetch error:', error);
      return null;
    }
  }

  /**
   * Parse Wikipedia content into sections
   */
  private parseWikipediaSections(
    content: string
  ): Array<{ title: string; content: string }> {
    const sections: Array<{ title: string; content: string }> = [];

    // Split by section headers (lines that look like titles)
    const lines = content.split('\n');
    let currentTitle = 'Giới thiệu';
    let currentContent: string[] = [];

    for (const line of lines) {
      // Check if this looks like a section header
      // (short line, no period, followed by content)
      if (
        line.length > 0 &&
        line.length < 80 &&
        !line.includes('.') &&
        line === line.trim()
      ) {
        // Save previous section
        if (currentContent.length > 0) {
          sections.push({
            title: currentTitle,
            content: currentContent.join('\n').trim(),
          });
        }
        currentTitle = line;
        currentContent = [];
      } else if (line.trim()) {
        currentContent.push(line);
      }
    }

    // Save last section
    if (currentContent.length > 0) {
      sections.push({
        title: currentTitle,
        content: currentContent.join('\n').trim(),
      });
    }

    return sections.length > 0 ? sections : [{ title: 'Nội dung', content }];
  }

  /**
   * Search for song information across multiple sources
   */
  async searchSongInfo(
    songTitle: string,
    artistName: string
  ): Promise<WebSearchResult> {
    const timestamp = new Date().toISOString();
    const queries = [
      `${songTitle} ${artistName} bài hát`,
      `${songTitle} ${artistName}`,
      artistName,
    ];

    let wikipediaResult: WikipediaFullContent | null = null;
    let sourcesFound = 0;

    // Try Vietnamese Wikipedia first
    for (const query of queries) {
      const searchResults = await this.searchWikipedia(query, 'vi');

      if (searchResults.length > 0) {
        // Find most relevant result
        const relevant = searchResults.find(
          (r) =>
            r.title.toLowerCase().includes(songTitle.toLowerCase()) ||
            r.title.toLowerCase().includes(artistName.toLowerCase()) ||
            r.extract.toLowerCase().includes(songTitle.toLowerCase())
        );

        if (relevant) {
          wikipediaResult = await this.getWikipediaArticle(relevant.title, 'vi');
          if (wikipediaResult) {
            sourcesFound++;
            break;
          }
        }
      }
    }

    // If no Vietnamese result, try English
    if (!wikipediaResult) {
      const enResults = await this.searchWikipedia(
        `${songTitle} ${artistName} song`,
        'en'
      );
      if (enResults.length > 0) {
        wikipediaResult = await this.getWikipediaArticle(enResults[0].title, 'en');
        if (wikipediaResult) sourcesFound++;
      }
    }

    // Build additional sources
    const additionalSources: Array<{
      type: string;
      title: string;
      url: string;
      reliability: string;
    }> = [];

    if (wikipediaResult) {
      additionalSources.push({
        type: 'wikipedia',
        title: wikipediaResult.title,
        url: wikipediaResult.url,
        reliability: 'high',
      });
    }

    // Determine confidence based on sources found
    let confidence: ConfidenceLevel = 'unknown';
    if (sourcesFound >= 2) confidence = 'high';
    else if (sourcesFound === 1) confidence = 'medium';
    else confidence = 'low';

    return {
      wikipedia: wikipediaResult,
      additionalSources,
      searchMetadata: {
        query: `${songTitle} - ${artistName}`,
        timestamp,
        sourcesFound,
        confidence,
      },
    };
  }

  /**
   * Extract composition story from Wikipedia content
   */
  extractCompositionStory(wikiContent: WikipediaFullContent): string | null {
    const storyKeywords = [
      'sáng tác',
      'ra đời',
      'viết',
      'hoàn cảnh',
      'nguồn cảm hứng',
      'lịch sử',
      'composed',
      'written',
      'inspiration',
    ];

    // Look for relevant sections
    for (const section of wikiContent.sections) {
      const sectionLower = section.title.toLowerCase();
      const contentLower = section.content.toLowerCase();

      if (
        storyKeywords.some(
          (keyword) =>
            sectionLower.includes(keyword) || contentLower.includes(keyword)
        )
      ) {
        return section.content;
      }
    }

    // If no specific section, check if main content has story
    const mainContent = wikiContent.content;
    if (mainContent.length > 200) {
      // Return first few paragraphs that might contain story
      const paragraphs = mainContent.split('\n\n').slice(0, 3);
      return paragraphs.join('\n\n');
    }

    return null;
  }

  /**
   * Get author info from Wikipedia
   */
  async getAuthorInfo(artistName: string): Promise<WikipediaFullContent | null> {
    // Search for artist
    const results = await this.searchWikipedia(artistName, 'vi');

    if (results.length > 0) {
      // Find the most relevant result
      const artistResult = results.find(
        (r) =>
          r.title.toLowerCase().includes(artistName.toLowerCase()) ||
          r.extract.toLowerCase().includes('nhạc sĩ') ||
          r.extract.toLowerCase().includes('ca sĩ') ||
          r.extract.toLowerCase().includes('nghệ sĩ')
      );

      if (artistResult) {
        return await this.getWikipediaArticle(artistResult.title, 'vi');
      }
    }

    return null;
  }
}

// Singleton instance
export const webSearchService = new WebSearchService();
