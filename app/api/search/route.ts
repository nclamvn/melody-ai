import { NextRequest, NextResponse } from 'next/server';
import { mockSongs } from '@/data/mockSongs';
import { Song } from '@/types';
import { normalizeVietnamese, calculateMatchScore, getRandomItems } from '@/lib/utils';
import { searchYouTube, parseDuration, formatViewCount } from '@/lib/youtube';

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { success: false, results: [], error: 'Invalid query' },
        { status: 400 }
      );
    }

    let results: Song[] = [];

    // Always try YouTube search first if API key is available
    if (process.env.YOUTUBE_API_KEY) {
      const ytResult = await searchYouTube(query, 5);

      if (ytResult.success && ytResult.videos.length > 0) {
        results = ytResult.videos.map((video, index) => ({
          id: video.id,
          title: video.title,
          artist: video.artist,
          album: 'YouTube',
          coverUrl: video.thumbnail,
          duration: parseDuration(video.duration),
          matchScore: 95 - index * 5,
          snippet: `${formatViewCount(video.viewCount)} views`,
          lyrics: [], // Will be loaded separately
          audioUrl: null,
          youtubeId: video.id,
          youtubeTitle: video.title,
          viewCount: video.viewCount,
        }));

        return NextResponse.json({
          success: true,
          results,
          source: 'youtube',
        });
      }
    }

    // Fallback to mock data if YouTube fails or in demo mode
    if (DEMO_MODE || results.length === 0) {
      const normalizedQuery = normalizeVietnamese(query.toLowerCase());

      results = mockSongs
        .map((song) => {
          const titleScore = calculateMatchScore(query, song.title);
          const artistScore = calculateMatchScore(query, song.artist);
          const snippetScore = calculateMatchScore(query, song.snippet);
          const lyricsScore = song.lyrics.some((line) =>
            normalizeVietnamese(line.text.toLowerCase()).includes(normalizedQuery)
          )
            ? 90
            : 0;

          const maxScore = Math.max(titleScore, artistScore, snippetScore, lyricsScore);

          return {
            ...song,
            matchScore: maxScore,
          };
        })
        .filter((song) => song.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 5);

      if (results.length === 0) {
        results = getRandomItems(mockSongs, 3).map((song) => ({
          ...song,
          matchScore: 50 + Math.floor(Math.random() * 20),
        }));
      }

      return NextResponse.json({
        success: true,
        results,
        source: 'mock',
      });
    }

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    // Error handled silently
    return NextResponse.json(
      { success: false, results: [], error: 'Search failed' },
      { status: 500 }
    );
  }
}
