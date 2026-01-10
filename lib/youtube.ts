const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  viewCount: string;
}

export interface YouTubeSearchResult {
  success: boolean;
  videos: YouTubeVideo[];
  error?: string;
}

/**
 * Search for music videos on YouTube
 */
export async function searchYouTube(query: string, maxResults: number = 5): Promise<YouTubeSearchResult> {
  if (!YOUTUBE_API_KEY) {
    return { success: false, videos: [], error: 'YouTube API key not configured' };
  }

  try {
    // Search for videos
    const searchUrl = `${YOUTUBE_API_BASE}/search?` + new URLSearchParams({
      part: 'snippet',
      q: `${query} official audio`,
      type: 'video',
      videoCategoryId: '10', // Music category
      maxResults: maxResults.toString(),
      key: YOUTUBE_API_KEY,
    });

    const searchResponse = await fetch(searchUrl);

    if (!searchResponse.ok) {
      const error = await searchResponse.json();
      return { success: false, videos: [], error: error.error?.message || 'Search failed' };
    }

    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return { success: true, videos: [] };
    }

    // Get video IDs for duration info
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

    // Get video details (duration, view count)
    const detailsUrl = `${YOUTUBE_API_BASE}/videos?` + new URLSearchParams({
      part: 'contentDetails,statistics',
      id: videoIds,
      key: YOUTUBE_API_KEY,
    });

    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    // Map results
    const videos: YouTubeVideo[] = searchData.items.map((item: any, index: number) => {
      const details = detailsData.items?.[index];
      const snippet = item.snippet;

      // Parse channel name as artist
      const artist = snippet.channelTitle.replace(' - Topic', '').replace('VEVO', '').trim();

      return {
        id: item.id.videoId,
        title: snippet.title,
        artist: artist,
        thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
        duration: details?.contentDetails?.duration || 'PT0M0S',
        viewCount: details?.statistics?.viewCount || '0',
      };
    });

    return { success: true, videos };
  } catch (error) {
    console.error('YouTube search error:', error);
    return { success: false, videos: [], error: 'Failed to search YouTube' };
  }
}

/**
 * Get video details by ID
 */
export async function getVideoDetails(videoId: string): Promise<YouTubeVideo | null> {
  if (!YOUTUBE_API_KEY) {
    return null;
  }

  try {
    const url = `${YOUTUBE_API_BASE}/videos?` + new URLSearchParams({
      part: 'snippet,contentDetails,statistics',
      id: videoId,
      key: YOUTUBE_API_KEY,
    });

    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const item = data.items[0];
    const snippet = item.snippet;
    const artist = snippet.channelTitle.replace(' - Topic', '').replace('VEVO', '').trim();

    return {
      id: item.id,
      title: snippet.title,
      artist: artist,
      thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
      duration: item.contentDetails?.duration || 'PT0M0S',
      viewCount: item.statistics?.viewCount || '0',
    };
  } catch (error) {
    console.error('Get video details error:', error);
    return null;
  }
}

/**
 * Parse ISO 8601 duration to seconds
 */
export function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Format view count
 */
export function formatViewCount(count: string): string {
  const num = parseInt(count, 10);
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return count;
}
