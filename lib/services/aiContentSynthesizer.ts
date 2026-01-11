// ═══════════════════════════════════════════════════════════════════════════════
//                    AI CONTENT SYNTHESIZER
//                    Transforms raw data into coherent narratives
// ═══════════════════════════════════════════════════════════════════════════════

import OpenAI from 'openai';
import { AggregatedData, SourceData, dataSourceManager } from './dataSourceManager';
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
    .map(s => `[Source: ${s.source}]\n${s.rawContent?.substring(0, 2000)}`)
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
          content: 'You are a music historian expert. Always respond with valid JSON only, no markdown formatting. NEVER invent or fabricate information. If unsure, say "information not available".',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0, // CRITICAL: Zero creativity to prevent hallucination
      max_tokens: 1500,
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
