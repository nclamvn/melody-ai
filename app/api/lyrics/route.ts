import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { LyricLine } from '@/types';

const LRCLIB_API = 'https://lrclib.net/api';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface LrcLibResponse {
  id: number;
  trackName: string;
  artistName: string;
  albumName: string;
  duration: number;
  instrumental: boolean;
  plainLyrics: string | null;
  syncedLyrics: string | null;
}

/**
 * Parse LRC format lyrics to array of LyricLine
 * LRC format: [mm:ss.xx]lyrics text
 */
function parseLRC(lrc: string): LyricLine[] {
  const lines = lrc.split('\n');
  const lyrics: LyricLine[] = [];

  for (const line of lines) {
    // Match [mm:ss.xx] or [mm:ss]
    const match = line.match(/\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)/);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = match[3] ? parseInt(match[3].padEnd(3, '0'), 10) : 0;
      const text = match[4].trim();

      if (text) {
        const time = minutes * 60 + seconds + milliseconds / 1000;
        lyrics.push({ time, text });
      }
    }
  }

  // Sort by time
  lyrics.sort((a, b) => a.time - b.time);
  return lyrics;
}

/**
 * Parse plain lyrics (no timestamps) - assign rough timestamps
 */
function parsePlainLyrics(plain: string, duration: number): LyricLine[] {
  const lines = plain.split('\n').filter(line => line.trim());

  // Estimate timing with intro offset
  const introOffset = 15;
  const outroTime = 20;
  const lyricsTime = Math.max(duration - introOffset - outroTime, lines.length * 3);
  const timePerLine = lyricsTime / lines.length;

  return lines.map((text, index) => ({
    time: introOffset + (index * timePerLine),
    text: text.trim(),
  }));
}

/**
 * Extract potential song titles from a YouTube video title
 * Returns array of possible titles, from most specific to most general
 */
function extractSongTitles(title: string): string[] {
  const titles: string[] = [];

  // Original cleaned title
  let cleaned = title
    .replace(/\s*[\-\|]\s*(Official|Audio|Video|MV|Lyric|Lyrics|Music|HD|4K|Full|Vietsub|Engsub|Sub).*/i, '')
    .replace(/\s*\(.*?(Official|Audio|Video|MV|Lyric|Cover|Remix|Live).*?\)/gi, '')
    .replace(/\s*\[.*?(Official|Audio|Video|MV|Lyric|Cover|Remix|Live).*?\]/gi, '')
    .trim();

  if (cleaned) titles.push(cleaned);

  // If title contains " - ", try to extract just the song name (before the dash)
  // Pattern: "Song Name - Extra Description" or "Artist - Song Name"
  if (title.includes(' - ')) {
    const parts = title.split(' - ');

    // First part (often the actual song title for Vietnamese songs)
    const firstPart = parts[0].trim();
    if (firstPart && firstPart.length > 2 && !titles.includes(firstPart)) {
      titles.push(firstPart);
    }

    // Second part (sometimes the song title when format is "Artist - Song")
    if (parts.length > 1) {
      const secondPart = parts[1]
        .replace(/\s*(Official|Audio|Video|MV|Lyric|Lyrics|Music|HD|4K|Full|Một|Siêu|Phẩm|Bất|Hủ|Với|Tiếng|Hát).*/i, '')
        .trim();
      if (secondPart && secondPart.length > 2 && !titles.includes(secondPart)) {
        titles.push(secondPart);
      }
    }
  }

  // Try extracting text before common Vietnamese YouTube patterns
  const viPatterns = [
    /^(.+?)\s*[-–]\s*(?:Một|Siêu|Phẩm|Bất|Hủ|Với|Tiếng|Hát|Ngọt|Ngào|Hay|Nhất|Cover|Acoustic)/i,
    /^(.+?)\s*[-–]\s*(?:Nhạc|Bolero|Trữ Tình|Remix|Karaoke)/i,
  ];

  for (const pattern of viPatterns) {
    const match = title.match(pattern);
    if (match && match[1] && match[1].length > 2) {
      const extracted = match[1].trim();
      if (!titles.includes(extracted)) {
        titles.push(extracted);
      }
    }
  }

  return titles;
}

/**
 * Clean up artist name from YouTube channel name
 */
function cleanArtistName(artist: string | null): string[] {
  if (!artist) return [''];

  const artists: string[] = [];

  // Remove common suffixes
  const cleaned = artist
    .replace(/\s*(Official|VEVO|Topic|-\s*Topic|Channel|Music)/gi, '')
    .trim();

  if (cleaned) artists.push(cleaned);

  // If artist name is very long, it might contain "Artist - Description"
  if (cleaned.includes(' - ')) {
    const firstPart = cleaned.split(' - ')[0].trim();
    if (firstPart && !artists.includes(firstPart)) {
      artists.push(firstPart);
    }
  }

  // Add empty string to allow searching without artist
  if (!artists.includes('')) {
    artists.push('');
  }

  return artists;
}

/**
 * Search for lyrics with given title and artist
 */
async function searchLyrics(
  title: string,
  artist: string
): Promise<LrcLibResponse[] | null> {
  try {
    let searchUrl = `${LRCLIB_API}/search?track_name=${encodeURIComponent(title)}`;
    if (artist) {
      searchUrl += `&artist_name=${encodeURIComponent(artist)}`;
    }

    const response = await fetch(searchUrl, {
      headers: { 'User-Agent': 'MelodyAI/1.0' },
    });

    if (!response.ok) return null;

    const results = await response.json();
    return results && results.length > 0 ? results : null;
  } catch {
    return null;
  }
}

/**
 * Search lyrics with general query
 */
async function searchLyricsGeneral(query: string): Promise<LrcLibResponse[] | null> {
  try {
    const response = await fetch(
      `${LRCLIB_API}/search?q=${encodeURIComponent(query)}`,
      { headers: { 'User-Agent': 'MelodyAI/1.0' } }
    );

    if (!response.ok) return null;

    const results = await response.json();
    return results && results.length > 0 ? results : null;
  } catch {
    return null;
  }
}

/**
 * Use OpenAI to find lyrics from the internet
 */
async function searchLyricsWithOpenAI(
  title: string,
  artist: string,
  duration: number
): Promise<LyricLine[] | null> {
  if (!process.env.OPENAI_API_KEY) {
    console.log('OpenAI API key not configured');
    return null;
  }

  try {
    // Use shorter, cleaner title for search
    const shortTitle = title.split(' - ')[0].trim();
    console.log(`Searching lyrics with OpenAI for: "${shortTitle}" by "${artist}"`);

    const response = await openai.responses.create({
      model: 'gpt-4o-mini',
      tools: [{ type: 'web_search_preview' }],
      input: `Search and provide the full lyrics for the Vietnamese song "${shortTitle}" by "${artist}".

Instructions:
- Search lyrics websites like nhaccuatui.com, zingmp3.vn, chiasenhac.vn, lyrics.vn
- Return ONLY the song lyrics, line by line
- Do NOT include any explanations, introductions, or notes
- Do NOT mention copyright or any disclaimers
- Start directly with the first line of lyrics
- If exact match not found, find the closest matching song title

Output format: Just the lyrics text, one line per row, nothing else.`,
    });

    // Extract text from response
    let lyricsText = '';
    for (const item of response.output) {
      if (item.type === 'message') {
        for (const content of item.content) {
          if (content.type === 'output_text') {
            lyricsText += content.text;
          }
        }
      }
    }

    if (!lyricsText || lyricsText.length < 50) {
      console.log('OpenAI returned insufficient lyrics');
      return null;
    }

    // Check if response is a copyright refusal
    const refusalPatterns = [
      'xin lỗi',
      'không thể cung cấp',
      'bản quyền',
      'copyright',
      'i cannot',
      "i can't",
      'unable to provide',
      'không được phép',
    ];

    const lowerText = lyricsText.toLowerCase();
    if (refusalPatterns.some(pattern => lowerText.includes(pattern))) {
      console.log('OpenAI refused due to copyright, skipping');
      return null;
    }

    // Parse the lyrics into lines with timestamps
    const lines = lyricsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => {
        if (line.length === 0) return false;
        if (line.startsWith('#') || line.startsWith('*')) return false;
        if (line.startsWith('http')) return false;
        if (line.includes('nguồn:') || line.includes('source:')) return false;
        return true;
      });

    if (lines.length < 5) {
      console.log('OpenAI returned too few lines:', lines.length);
      return null;
    }

    // Assign timestamps with intro offset and better distribution
    const introOffset = 15; // Most songs have ~15 second intro
    const outroTime = 20; // Leave time for outro
    const lyricsTime = duration - introOffset - outroTime;
    const timePerLine = lyricsTime / lines.length;

    const lyrics: LyricLine[] = lines.map((text, index) => ({
      time: introOffset + (index * timePerLine),
      text,
    }));

    console.log(`OpenAI found ${lyrics.length} lines of lyrics`);
    return lyrics;
  } catch (error) {
    console.error('OpenAI lyrics search error:', error);
    return null;
  }
}

/**
 * Generate musical placeholder when nothing found
 */
function generatePlaceholderLyrics(title: string, artist: string, duration: number): LyricLine[] {
  // Use short title
  const shortTitle = title.split(' - ')[0].trim();

  // Generate a pattern of musical notes that spans the duration
  const lyrics: LyricLine[] = [];
  const patterns = [
    '♪ ♫ ♪ ♫ ♪',
    '🎵 🎶 🎵 🎶 🎵',
    '♩ ♪ ♫ ♬',
    '~ ♪ ~ ♫ ~',
    '✨ 🎵 ✨',
  ];

  // Header
  lyrics.push({ time: 0, text: shortTitle });
  lyrics.push({ time: 3, text: artist });
  lyrics.push({ time: 6, text: '' });

  // Generate musical patterns throughout the song
  const interval = 8; // seconds between each line
  const numLines = Math.floor((duration - 10) / interval);

  for (let i = 0; i < numLines; i++) {
    const time = 10 + (i * interval);
    const pattern = patterns[i % patterns.length];
    lyrics.push({ time, text: pattern });
  }

  return lyrics;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    const artist = searchParams.get('artist');
    const duration = searchParams.get('duration');
    const dur = duration ? parseFloat(duration) : 180;

    if (!title) {
      return NextResponse.json(
        { success: false, lyrics: [], error: 'Title is required' },
        { status: 400 }
      );
    }

    // Extract possible song titles
    const possibleTitles = extractSongTitles(title);
    const possibleArtists = cleanArtistName(artist);
    const shortTitle = possibleTitles.length > 1 ? possibleTitles[1] : possibleTitles[0];
    const cleanArtist = possibleArtists[0] || '';

    console.log('Searching lyrics for:', shortTitle, 'by', cleanArtist);

    // Run LrcLib (quick) and OpenAI (fallback) in PARALLEL for speed
    const lrcLibPromise = quickLrcLibSearch(possibleTitles, possibleArtists);
    const openAIPromise = searchLyricsWithOpenAI(shortTitle, cleanArtist, dur);

    // Race: return whichever finds lyrics first (with preference for LrcLib synced)
    const result = await Promise.race([
      // LrcLib with 8 second timeout
      Promise.race([
        lrcLibPromise,
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000))
      ]),
      // OpenAI starts immediately but we give LrcLib a small head start
      new Promise<LyricLine[] | null>((resolve) => {
        setTimeout(async () => {
          const openaiResult = await openAIPromise;
          resolve(openaiResult);
        }, 2000); // Start checking OpenAI after 2 seconds
      })
    ]);

    // If LrcLib found something
    if (result && 'syncedLyrics' in result) {
      const lrcResult = result as LrcLibResponse;
      console.log('LrcLib found:', lrcResult.trackName);
      if (lrcResult.syncedLyrics) {
        return NextResponse.json({
          success: true,
          lyrics: parseLRC(lrcResult.syncedLyrics),
          synced: true,
          source: 'lrclib',
          trackName: lrcResult.trackName,
          artistName: lrcResult.artistName,
        });
      } else if (lrcResult.plainLyrics) {
        return NextResponse.json({
          success: true,
          lyrics: parsePlainLyrics(lrcResult.plainLyrics, dur),
          synced: false,
          source: 'lrclib',
          trackName: lrcResult.trackName,
          artistName: lrcResult.artistName,
        });
      }
    }

    // If race returned OpenAI lyrics
    if (result && Array.isArray(result) && result.length > 0) {
      console.log('OpenAI found lyrics first');
      return NextResponse.json({
        success: true,
        lyrics: result,
        synced: false,
        source: 'openai',
        trackName: shortTitle,
        artistName: cleanArtist,
      });
    }

    // Wait for OpenAI if still pending
    console.log('Waiting for OpenAI...');
    const openaiLyrics = await openAIPromise;
    if (openaiLyrics && openaiLyrics.length > 0) {
      return NextResponse.json({
        success: true,
        lyrics: openaiLyrics,
        synced: false,
        source: 'openai',
        trackName: shortTitle,
        artistName: cleanArtist,
      });
    }

    // Final fallback: placeholder
    console.log('Using placeholder lyrics');
    return NextResponse.json({
      success: true,
      lyrics: generatePlaceholderLyrics(shortTitle, cleanArtist, dur),
      synced: false,
      source: 'placeholder',
      trackName: shortTitle,
      artistName: cleanArtist,
    });
  } catch (error) {
    console.error('Lyrics API error:', error);
    return NextResponse.json({
      success: true,
      lyrics: generatePlaceholderLyrics('Unknown', 'Unknown', 180),
      synced: false,
      source: 'placeholder',
    });
  }
}

/**
 * Quick LrcLib search - only try the most likely matches
 */
async function quickLrcLibSearch(
  titles: string[],
  artists: string[]
): Promise<LrcLibResponse | null> {
  // Only try 2-3 quick searches max
  const searches = [
    // Most likely: short title + artist
    titles[1] ? searchLyrics(titles[1], artists[0] || '') : null,
    // Fallback: short title without artist
    titles[1] ? searchLyricsGeneral(titles[1]) : null,
    // Try full title if different
    titles[0] !== titles[1] ? searchLyricsGeneral(titles[0]) : null,
  ].filter(Boolean);

  for (const searchPromise of searches) {
    if (!searchPromise) continue;
    const results = await searchPromise;
    if (results && results.length > 0) {
      // Prefer synced lyrics
      return results.find(r => r.syncedLyrics) || results[0];
    }
  }

  return null;
}
