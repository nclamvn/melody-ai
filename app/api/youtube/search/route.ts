import { NextRequest, NextResponse } from 'next/server';
import { searchYouTube } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const maxResults = parseInt(searchParams.get('max') || '5', 10);

    if (!query) {
      return NextResponse.json(
        { success: false, videos: [], error: 'Query required' },
        { status: 400 }
      );
    }

    const result = await searchYouTube(query, maxResults);

    return NextResponse.json(result);
  } catch (error) {
    // Error handled silently
    return NextResponse.json(
      { success: false, videos: [], error: 'Search failed' },
      { status: 500 }
    );
  }
}
