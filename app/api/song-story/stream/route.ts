// ═══════════════════════════════════════════════════════════════════════════════
//                    STREAMING SONG STORY API
//                    Server-Sent Events for Progressive Loading
//                    With Verified Database Priority & Anti-Hallucination
// ═══════════════════════════════════════════════════════════════════════════════

import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { verifiedSongDB, VerifiedSong } from '@/lib/database/verifiedSongDatabase';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper: Send SSE event
function formatSSE(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    VALIDATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

// Normalize Vietnamese text for comparison
function normalizeVietnamese(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^\w\s]/g, '')
    .trim();
}

// Validate Wikipedia result - check if it's actually about the song
function validateWikipediaResult(
  extract: string,
  title: string,
  artist?: string | null
): { isValid: boolean; reason?: string } {
  if (!extract || extract.length < 100) {
    return { isValid: false, reason: 'Content too short' };
  }

  const normalizedExtract = normalizeVietnamese(extract);
  const normalizedTitle = normalizeVietnamese(title);
  const normalizedArtist = artist ? normalizeVietnamese(artist) : null;

  // Check for music-related keywords
  const musicKeywords = [
    'bai hat', 'ca khuc', 'nhac', 'sang tac', 'ca si', 'album', 'phat hanh',
    'song', 'music', 'composed', 'singer', 'release', 'record', 'single'
  ];

  const hasMusicalContext = musicKeywords.some(kw => normalizedExtract.includes(kw));

  // Check if title appears in extract
  const hasTitleReference = normalizedExtract.includes(normalizedTitle) ||
    normalizedTitle.split(' ').filter(w => w.length > 2).some(word =>
      normalizedExtract.includes(word)
    );

  // Check artist if provided
  const hasArtistReference = !normalizedArtist ||
    normalizedExtract.includes(normalizedArtist) ||
    normalizedArtist.split(' ').filter(w => w.length > 2).some(word =>
      normalizedExtract.includes(word)
    );

  // Must have musical context AND relevant references
  if (!hasMusicalContext) {
    return { isValid: false, reason: 'No musical context found' };
  }

  if (!hasTitleReference && !hasArtistReference) {
    return { isValid: false, reason: 'No relevant references to song/artist' };
  }

  return { isValid: true };
}

// Validate MusicBrainz result - check for Vietnamese music match
function validateMusicBrainzResult(
  result: { title?: string; artist?: string },
  searchTitle: string,
  searchArtist?: string | null
): { isValid: boolean; confidence: number; reason?: string } {
  if (!result.title) {
    return { isValid: false, confidence: 0, reason: 'No title in result' };
  }

  const normalizedResultTitle = normalizeVietnamese(result.title);
  const normalizedSearchTitle = normalizeVietnamese(searchTitle);

  // Calculate title similarity
  const titleMatch = normalizedResultTitle === normalizedSearchTitle ||
    normalizedResultTitle.includes(normalizedSearchTitle) ||
    normalizedSearchTitle.includes(normalizedResultTitle);

  if (!titleMatch) {
    // Check word overlap
    const searchWords = normalizedSearchTitle.split(' ').filter(w => w.length > 2);
    const resultWords = normalizedResultTitle.split(' ').filter(w => w.length > 2);
    const overlap = searchWords.filter(w => resultWords.includes(w)).length;
    const overlapRatio = searchWords.length > 0 ? overlap / searchWords.length : 0;

    if (overlapRatio < 0.5) {
      return { isValid: false, confidence: 0, reason: 'Title mismatch' };
    }
  }

  // Check artist if provided
  let artistConfidence = 1;
  if (searchArtist && result.artist) {
    const normalizedResultArtist = normalizeVietnamese(result.artist);
    const normalizedSearchArtist = normalizeVietnamese(searchArtist);

    if (!normalizedResultArtist.includes(normalizedSearchArtist) &&
        !normalizedSearchArtist.includes(normalizedResultArtist)) {
      artistConfidence = 0.5; // Reduce confidence but don't invalidate
    }
  }

  const confidence = titleMatch ? artistConfidence : artistConfidence * 0.7;

  return {
    isValid: confidence >= 0.5,
    confidence,
    reason: confidence < 0.5 ? 'Low match confidence' : undefined
  };
}

// Wikipedia fetch with timeout
async function fetchWikipedia(query: string, lang: string = 'vi'): Promise<{
  found: boolean;
  extract?: string;
  url?: string;
  validated?: boolean;
  validationReason?: string;
}> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    // Search
    const searchUrl = `https://${lang}.wikipedia.org/w/api.php?` + new URLSearchParams({
      action: 'query',
      list: 'search',
      srsearch: query,
      srlimit: '3',
      format: 'json',
      origin: '*',
    });

    const searchRes = await fetch(searchUrl, { signal: controller.signal });
    const searchData = await searchRes.json();
    const title = searchData.query?.search?.[0]?.title;

    if (!title) return { found: false };

    // Get content
    const contentUrl = `https://${lang}.wikipedia.org/w/api.php?` + new URLSearchParams({
      action: 'query',
      titles: title,
      prop: 'extracts|info',
      exintro: 'false',
      explaintext: 'true',
      exsectionformat: 'plain',
      inprop: 'url',
      format: 'json',
      origin: '*',
    });

    const contentRes = await fetch(contentUrl, { signal: controller.signal });
    const contentData = await contentRes.json();
    const pages = contentData.query?.pages;
    const page = pages ? Object.values(pages)[0] as any : null;

    if (!page || page.missing) return { found: false };

    return {
      found: true,
      extract: page.extract?.substring(0, 3000), // Limit size
      url: page.fullurl,
    };
  } catch {
    return { found: false };
  } finally {
    clearTimeout(timeout);
  }
}

// MusicBrainz fetch
async function fetchMusicBrainz(query: string): Promise<{
  found: boolean;
  title?: string;
  artist?: string;
  releaseYear?: string;
  album?: string;
}> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const url = `https://musicbrainz.org/ws/2/recording?` + new URLSearchParams({
      query: query,
      limit: '1',
      fmt: 'json',
    });

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'MelodyAI/1.0 (contact@melody.ai)' },
    });

    const data = await res.json();
    const recording = data.recordings?.[0];

    if (!recording) return { found: false };

    return {
      found: true,
      title: recording.title,
      artist: recording['artist-credit']?.[0]?.artist?.name,
      releaseYear: recording['first-release-date']?.substring(0, 4),
      album: recording.releases?.[0]?.title,
    };
  } catch {
    return { found: false };
  } finally {
    clearTimeout(timeout);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    MAIN STREAMING HANDLER
// ═══════════════════════════════════════════════════════════════════════════════

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const artist = searchParams.get('artist');
  const lang = searchParams.get('lang') || 'vi';

  if (!title) {
    return new Response('Missing title parameter', { status: 400 });
  }

  const encoder = new TextEncoder();
  const startTime = Date.now();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        try {
          controller.enqueue(encoder.encode(formatSSE(event, data)));
        } catch {
          // Stream closed
        }
      };

      try {
        // ═══════════════════════════════════════════════════════════════════
        // PHASE 1: CHECK LOCAL VERIFIED DATABASE (<50ms)
        // ═══════════════════════════════════════════════════════════════════
        send('phase', { phase: 'starting', message: 'Đang tìm trong cơ sở dữ liệu...' });
        send('basic', { title, artist: artist || 'Không rõ', timestamp: Date.now() });

        // Search verified database first - HIGHEST PRIORITY
        const searchResult = verifiedSongDB.search(title, artist || undefined);

        if (searchResult.found && searchResult.song) {
          const verifiedSong = searchResult.song;

          send('source', { name: 'Verified Database', status: 'found' });
          send('metadata', {
            releaseYear: verifiedSong.year,
            album: undefined,
            composer: verifiedSong.composer,
            lyricist: verifiedSong.lyricist,
            genre: verifiedSong.genre,
            era: verifiedSong.era,
            source: 'Verified Database',
          });

          // Build verified story content
          let storyContent = verifiedSong.compositionStory;

          if (verifiedSong.historicalContext) {
            storyContent += '\n\n' + verifiedSong.historicalContext;
          }

          if (verifiedSong.facts && verifiedSong.facts.length > 0) {
            storyContent += '\n\n📌 ' + verifiedSong.facts.join('\n📌 ');
          }

          // Stream verified content (simulate for consistent UX)
          send('phase', { phase: 'synthesizing', message: 'Đang tải thông tin đã xác minh...' });

          const words = storyContent.split(' ');
          for (let i = 0; i < words.length; i += 3) {
            const chunk = words.slice(i, i + 3).join(' ') + ' ';
            send('chunk', { text: chunk });
            await new Promise(r => setTimeout(r, 30)); // Simulate streaming
          }

          send('content', {
            story: storyContent,
            confidence: 'verified',
            sources: verifiedSong.sources,
            verifiedAt: verifiedSong.verifiedAt,
            metadata: {
              composer: verifiedSong.composer,
              lyricist: verifiedSong.lyricist,
              year: verifiedSong.year,
              genre: verifiedSong.genre,
              era: verifiedSong.era,
            },
          });

          send('complete', {
            duration: Date.now() - startTime,
            sourcesChecked: 1,
            fromVerifiedDB: true,
          });

          controller.close();
          return;
        }

        // ═══════════════════════════════════════════════════════════════════
        // PHASE 2: PARALLEL DATA FETCHING WITH VALIDATION
        // ═══════════════════════════════════════════════════════════════════
        send('source', { name: 'Verified Database', status: 'not_found' });
        send('phase', { phase: 'searching', message: 'Đang tìm kiếm trên Internet...' });

        const query = artist ? `${title} ${artist} bài hát ca khúc` : `${title} bài hát ca khúc`;

        // Fetch in parallel
        const [wikiVi, wikiEn, musicBrainz] = await Promise.all([
          fetchWikipedia(query, 'vi'),
          fetchWikipedia(query, 'en'),
          fetchMusicBrainz(query),
        ]);

        // Validate Wikipedia results
        let validatedWikiVi = false;
        let validatedWikiEn = false;

        if (wikiVi.found && wikiVi.extract) {
          const validation = validateWikipediaResult(wikiVi.extract, title, artist);
          validatedWikiVi = validation.isValid;
          if (!validation.isValid) {
          }
        }

        if (wikiEn.found && wikiEn.extract) {
          const validation = validateWikipediaResult(wikiEn.extract, title, artist);
          validatedWikiEn = validation.isValid;
          if (!validation.isValid) {
          }
        }

        // Validate MusicBrainz result
        let validatedMusicBrainz = false;
        let musicBrainzConfidence = 0;

        if (musicBrainz.found) {
          const validation = validateMusicBrainzResult(musicBrainz, title, artist);
          validatedMusicBrainz = validation.isValid;
          musicBrainzConfidence = validation.confidence;
          if (!validation.isValid) {
          }
        }

        // Send metadata only if validated
        if (validatedMusicBrainz) {
          send('metadata', {
            releaseYear: musicBrainz.releaseYear,
            album: musicBrainz.album,
            source: 'MusicBrainz',
            confidence: musicBrainzConfidence,
          });
          send('source', { name: 'MusicBrainz', status: 'found' });
        } else {
          send('source', { name: 'MusicBrainz', status: musicBrainz.found ? 'rejected' : 'not_found' });
        }

        if (validatedWikiVi) {
          send('source', { name: 'Wikipedia (VI)', status: 'found' });
        } else {
          send('source', { name: 'Wikipedia (VI)', status: wikiVi.found ? 'rejected' : 'not_found' });
        }

        if (validatedWikiEn) {
          send('source', { name: 'Wikipedia (EN)', status: 'found' });
        } else {
          send('source', { name: 'Wikipedia (EN)', status: wikiEn.found ? 'rejected' : 'not_found' });
        }

        // ═══════════════════════════════════════════════════════════════════
        // PHASE 3: AI SYNTHESIS WITH ANTI-HALLUCINATION
        // ═══════════════════════════════════════════════════════════════════
        const hasValidContent = validatedWikiVi || validatedWikiEn;

        if (hasValidContent && process.env.OPENAI_API_KEY) {
          send('phase', { phase: 'synthesizing', message: 'Đang tạo câu chuyện...' });

          const sourceContent = [
            validatedWikiVi && wikiVi.extract ? `[Wikipedia Tiếng Việt - ĐÃ XÁC MINH]\n${wikiVi.extract}` : '',
            validatedWikiEn && wikiEn.extract ? `[Wikipedia English - VERIFIED]\n${wikiEn.extract}` : '',
          ].filter(Boolean).join('\n\n---\n\n');

          // STRICT ANTI-HALLUCINATION PROMPT
          const systemPrompt = lang === 'vi'
            ? `Bạn là chuyên gia lịch sử âm nhạc Việt Nam. Viết câu chuyện về bài hát.

QUY TẮC BẮT BUỘC:
1. CHỈ sử dụng thông tin từ nguồn được cung cấp bên dưới
2. KHÔNG bịa đặt bất kỳ thông tin nào không có trong nguồn
3. KHÔNG suy đoán về năm sáng tác, tác giả nếu không rõ
4. Nếu thông tin không đủ, nói rõ "Thông tin về bài hát này còn hạn chế"
5. Viết 2-3 đoạn ngắn gọn, hấp dẫn
6. Tập trung vào: hoàn cảnh sáng tác, cảm hứng, ý nghĩa (nếu có trong nguồn)

CẢNH BÁO: Thà thiếu thông tin còn hơn sai thông tin.`
            : `You are a music historian. Write a brief story about this song.

MANDATORY RULES:
1. ONLY use information from the provided sources below
2. DO NOT fabricate any information not in the sources
3. DO NOT guess about composition year, composer if unclear
4. If information is insufficient, clearly state "Limited information available"
5. Write 2-3 concise, engaging paragraphs
6. Focus on: composition context, inspiration, significance (if in sources)

WARNING: Better to lack information than to have wrong information.`;

          try {
            const aiStream = await openai.chat.completions.create({
              model: 'gpt-4o-mini',
              messages: [
                { role: 'system', content: systemPrompt },
                {
                  role: 'user',
                  content: `Bài hát: "${title}"${artist ? ` - ${artist}` : ''}
${validatedMusicBrainz && musicBrainz.releaseYear ? `Năm phát hành (MusicBrainz): ${musicBrainz.releaseYear}` : ''}
${validatedMusicBrainz && musicBrainz.album ? `Album (MusicBrainz): ${musicBrainz.album}` : ''}

NGUỒN THÔNG TIN ĐÃ XÁC MINH:
${sourceContent || 'Không có nguồn thông tin đáng tin cậy.'}

Dựa HOÀN TOÀN vào nguồn trên, viết câu chuyện về bài hát này:`,
                },
              ],
              stream: true,
              max_tokens: 800,
              temperature: 0.3, // LOW TEMPERATURE - Anti-hallucination
            });

            let fullText = '';
            for await (const chunk of aiStream) {
              const content = chunk.choices[0]?.delta?.content || '';
              if (content) {
                fullText += content;
                send('chunk', { text: content });
              }
            }

            // Determine confidence based on validated sources
            let confidence: 'high' | 'medium' | 'low' = 'low';
            if (validatedWikiVi && validatedWikiEn) {
              confidence = 'high';
            } else if (validatedWikiVi || validatedWikiEn) {
              confidence = validatedMusicBrainz ? 'high' : 'medium';
            }

            send('content', {
              story: fullText,
              confidence,
              sources: [
                validatedWikiVi ? 'Wikipedia (VI)' : null,
                validatedWikiEn ? 'Wikipedia (EN)' : null,
                validatedMusicBrainz ? 'MusicBrainz' : null,
              ].filter(Boolean),
            });

          } catch (aiError) {
            console.error('[Stream API] OpenAI error:', aiError);
            // Fallback to validated Wikipedia content only
            const fallbackContent = validatedWikiVi ? wikiVi.extract :
                                   validatedWikiEn ? wikiEn.extract : null;

            if (fallbackContent) {
              send('content', {
                story: fallbackContent,
                confidence: 'low',
                sources: [validatedWikiVi ? 'Wikipedia (VI)' : 'Wikipedia (EN)'],
                isRaw: true,
              });
            } else {
              send('content', {
                story: `Không tìm thấy thông tin đáng tin cậy về bài hát "${title}".`,
                confidence: 'none',
                sources: [],
              });
            }
          }

        } else if (hasValidContent) {
          // No AI available, send validated raw content
          const content = validatedWikiVi ? wikiVi.extract : wikiEn.extract;
          send('content', {
            story: content,
            confidence: 'medium',
            sources: [validatedWikiVi ? 'Wikipedia (VI)' : 'Wikipedia (EN)'],
            isRaw: true,
          });

        } else {
          // NO VALID CONTENT - Be honest instead of fabricating

          send('phase', { phase: 'complete', message: 'Hoàn tất tìm kiếm' });
          send('content', {
            story: `Hiện tại chưa tìm thấy thông tin đáng tin cậy về bài hát "${title}"${artist ? ` của ${artist}` : ''}.

Các nguồn đã kiểm tra:
• Wikipedia Tiếng Việt: ${wikiVi.found ? 'Tìm thấy nhưng không liên quan trực tiếp' : 'Không tìm thấy'}
• Wikipedia Tiếng Anh: ${wikiEn.found ? 'Tìm thấy nhưng không liên quan trực tiếp' : 'Không tìm thấy'}
• MusicBrainz: ${musicBrainz.found ? 'Tìm thấy nhưng không khớp' : 'Không tìm thấy'}

Chúng tôi không bịa đặt thông tin. Nếu bạn biết về bài hát này, hãy đóng góp cho cộng đồng!`,
            confidence: 'none',
            sources: [],
            honest: true,
          });
        }

        // ═══════════════════════════════════════════════════════════════════
        // COMPLETE
        // ═══════════════════════════════════════════════════════════════════
        send('complete', {
          duration: Date.now() - startTime,
          sourcesChecked: 4, // Verified DB + Wikipedia VI + Wikipedia EN + MusicBrainz
          validatedSources: [
            validatedWikiVi ? 'Wikipedia (VI)' : null,
            validatedWikiEn ? 'Wikipedia (EN)' : null,
            validatedMusicBrainz ? 'MusicBrainz' : null,
          ].filter(Boolean).length,
        });

      } catch (error) {
        console.error('[Stream API] Error:', error);
        send('error', { message: 'Đã xảy ra lỗi khi tải thông tin' });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable nginx buffering
    },
  });
}
