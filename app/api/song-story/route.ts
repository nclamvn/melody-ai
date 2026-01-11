// ═══════════════════════════════════════════════════════════════════════════════
//                    SONG STORY API — HYBRID APPROACH
//                    Tier 1: Database → Tier 2: Cache → Tier 3: Internet + AI
// ═══════════════════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { contentRouter } from '@/lib/services/contentRouter';
import { detectGenre, formatSourcesForResponse, VietnameseGenre } from '@/lib/vietnameseMusic';

interface SongStoryRequest {
  title: string;
  artist: string;
  forceRefresh?: boolean;
  language?: string;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body: SongStoryRequest = await request.json();
    const { title, artist, forceRefresh = false, language = 'vi' } = body;

    if (!title || !artist) {
      return NextResponse.json(
        { success: false, error: 'Missing title or artist' },
        { status: 400 }
      );
    }


    // Detect genre for specialized content
    const detectedGenre = detectGenre(title, artist);

    // Use the content router for hybrid approach
    const result = await contentRouter.getContent({
      songTitle: title,
      artistName: artist,
      language,
      forceRefresh,
      maxWaitTime: 15000, // 15 seconds max
    });

    if (!result.success || !result.content) {
      return NextResponse.json({
        success: true,
        data: generateFallbackResponse(title, artist, detectedGenre),
        source: 'fallback',
        confidence: 'low',
        detectedGenre,
        meta: {
          processingTime: Date.now() - startTime,
        },
      });
    }

    // Format response based on content
    const content = result.content;

    return NextResponse.json({
      success: true,
      data: {
        story: content.compositionStory,
        authorInfo: content.authorBio || `${content.artist} là nghệ sĩ của bài hát "${content.title}".`,
        songInfo: {
          album: 'Single',
          releaseYear: content.releaseYear?.toString() || 'Không rõ',
          genre: content.genres.join(', ') || detectedGenre,
          awards: [],
        },
        summary: content.summary,
        compositionContext: {
          narrative: content.compositionStory,
        },
        historicalContext: content.historicalContext ? {
          era: content.historicalContext,
        } : null,
        interestingFacts: content.facts,
        sources: content.sources.length > 0
          ? content.sources
          : formatSourcesForResponse(detectedGenre, title, artist),
        confidence: content.confidence,
        generatedAt: content.synthesizedAt,
      },
      source: result.source,
      confidence: content.confidence,
      contentQuality: content.contentQuality,
      detectedGenre,
      meta: {
        processingTime: result.processingTime,
        cacheHit: result.cacheHit,
        sourcesUsed: result.sourcesUsed,
        warnings: result.warnings,
      },
    });
  } catch (error) {
    console.error('[SongStory API] Error:', error);

    // Return fallback on error
    try {
      const { title, artist } = await request.clone().json();
      const detectedGenre = detectGenre(title || 'Unknown', artist || 'Unknown');

      return NextResponse.json({
        success: true,
        data: generateFallbackResponse(title || 'Unknown', artist || 'Unknown', detectedGenre),
        source: 'fallback',
        confidence: 'low',
        meta: {
          processingTime: Date.now() - startTime,
          error: String(error),
        },
      });
    } catch {
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
}

// Also support GET requests for simple queries
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


    // Use the content router
    const result = await contentRouter.getContent({
      songTitle: title,
      artistName: artist || undefined,
      language,
      forceRefresh,
      maxWaitTime: 15000,
    });

    if (!result.success || !result.content) {
      return NextResponse.json({
        success: false,
        error: 'Failed to retrieve song story',
        meta: { processingTime: Date.now() - startTime },
      }, { status: 404 });
    }

    const content = result.content;

    return NextResponse.json({
      success: true,
      data: {
        story: {
          summary: content.summary,
          compositionStory: content.compositionStory,
          historicalContext: content.historicalContext,
          facts: content.facts,
        },
        author: {
          name: content.artist,
          bio: content.authorBio || '',
        },
        song: {
          title: content.title,
          artist: content.artist,
          releaseYear: content.releaseYear,
          genres: content.genres,
        },
        sources: content.sources,
      },
      meta: {
        source: result.source,
        confidence: content.confidence,
        contentQuality: content.contentQuality,
        sourcesUsed: result.sourcesUsed.length,
        processingTime: result.processingTime,
        cacheHit: result.cacheHit,
        synthesizedAt: content.synthesizedAt,
      },
    });
  } catch (error) {
    console.error('[Song Story API GET] Error:', error);

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

/**
 * Generate fallback response when no data available
 */
function generateFallbackResponse(title: string, artist: string, genre: VietnameseGenre) {
  const genreNames: Record<VietnameseGenre, string> = {
    bolero: 'nhạc Bolero trữ tình',
    tien_chien: 'tân nhạc tiền chiến',
    dan_ca: 'dân ca Việt Nam',
    nhac_do: 'nhạc cách mạng',
    vpop: 'V-Pop đương đại',
    indie: 'indie Việt Nam',
    rap_viet: 'Rap Việt',
    rock_viet: 'Rock Việt Nam',
    nhac_tre: 'nhạc trẻ',
    cai_luong: 'cải lương',
    nhac_phim: 'nhạc phim',
    unknown: 'âm nhạc Việt Nam',
  };

  const genreName = genreNames[genre] || genreNames.unknown;
  const sources = formatSourcesForResponse(genre, title, artist);

  return {
    story: `"${title}" là một ca khúc thuộc thể loại ${genreName} trong sự nghiệp của ${artist}.

Hiện chưa có tài liệu chi tiết về hoàn cảnh sáng tác của bài hát này trong cơ sở dữ liệu của chúng tôi. Chúng tôi đang tiếp tục nghiên cứu và sẽ cập nhật khi có thông tin đáng tin cậy.`,

    authorInfo: `${artist} là nghệ sĩ hoạt động trong lĩnh vực ${genreName} của nền âm nhạc Việt Nam.

Thông tin chi tiết về nghệ sĩ đang được cập nhật. Vui lòng tham khảo các nguồn chính thống để biết thêm.`,

    songInfo: {
      album: 'Đang cập nhật',
      releaseYear: 'Không rõ',
      genre: genreName,
      awards: [],
    },
    interestingFacts: [],
    sources,
    confidence: 'low',
    disclaimer: 'Thông tin về bài hát này còn hạn chế. Nếu bạn có tài liệu tham khảo, vui lòng đóng góp.',
    generatedAt: new Date().toISOString(),
  };
}
