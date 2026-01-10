import { LyricLine } from '@/types';
import { mockSongs } from '@/data/mockSongs';

export async function fetchLyrics(songId: string): Promise<LyricLine[]> {
  // Demo mode: return lyrics from mock data
  const song = mockSongs.find((s) => s.id === songId);

  if (song) {
    return song.lyrics;
  }

  // TODO: Fetch from external lyrics API
  return [];
}

export function parseLRC(lrcContent: string): LyricLine[] {
  const lines = lrcContent.split('\n');
  const lyrics: LyricLine[] = [];

  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

  for (const line of lines) {
    const match = line.match(timeRegex);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const ms = parseInt(match[3], 10);

      const time = minutes * 60 + seconds + ms / (match[3].length === 2 ? 100 : 1000);
      const text = line.replace(timeRegex, '').trim();

      if (text) {
        lyrics.push({ time, text });
      }
    }
  }

  return lyrics.sort((a, b) => a.time - b.time);
}
