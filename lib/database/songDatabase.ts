// ═══════════════════════════════════════════════════════════════════════════════
//                    SONG DATABASE SERVICE — COMMERCIAL GRADE
//                         Search and Retrieval
// ═══════════════════════════════════════════════════════════════════════════════

import { SongEntry, SongSearchResult, ArtistEntry, ConfidenceLevel } from './types';
import { BOLERO_SONGS } from './songs/bolero';
import { BOLERO_SONGS_BATCH2 } from './songs/bolero-batch2';
import { PREWAR_SONGS } from './songs/prewar';
import { TRINH_SONGS } from './songs/trinh';
import { TRINH_SONGS_BATCH2 } from './songs/trinh-batch2';
import { RED_MUSIC_SONGS } from './songs/redMusic';

// Combine all song databases
const ALL_SONGS: SongEntry[] = [
  ...BOLERO_SONGS,
  ...BOLERO_SONGS_BATCH2,
  ...PREWAR_SONGS,
  ...TRINH_SONGS,
  ...TRINH_SONGS_BATCH2,
  ...RED_MUSIC_SONGS,
];

/**
 * Normalize Vietnamese text for search
 */
function normalizeVietnamese(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

/**
 * Calculate similarity score between two strings
 */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = normalizeVietnamese(str1);
  const s2 = normalizeVietnamese(str2);

  if (s1 === s2) return 1;
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;

  // Simple word overlap scoring
  const words1 = s1.split(/\s+/);
  const words2 = s2.split(/\s+/);

  let matchCount = 0;
  for (const w1 of words1) {
    for (const w2 of words2) {
      if (w1 === w2 || w1.includes(w2) || w2.includes(w1)) {
        matchCount++;
        break;
      }
    }
  }

  return matchCount / Math.max(words1.length, words2.length);
}

class SongDatabase {
  private songs: SongEntry[] = ALL_SONGS;

  /**
   * Search for a song by title and artist
   */
  searchSong(title: string, artist: string): SongEntry | null {
    const results = this.searchSongs(title, artist, 1);
    return results.length > 0 ? results[0].entry : null;
  }

  /**
   * Search for songs with scoring
   */
  searchSongs(
    title: string,
    artist: string,
    limit: number = 5
  ): SongSearchResult[] {
    const results: SongSearchResult[] = [];

    for (const song of this.songs) {
      // Check title match
      const titleScore = this.getTitleMatchScore(song, title);

      // Check artist match
      const artistScore = this.getArtistMatchScore(song, artist);

      // Combined score
      const combinedScore = titleScore * 0.7 + artistScore * 0.3;

      if (combinedScore > 0.3) {
        let matchType: 'exact' | 'partial' | 'fuzzy' = 'fuzzy';
        if (combinedScore >= 0.9) matchType = 'exact';
        else if (combinedScore >= 0.6) matchType = 'partial';

        results.push({
          entry: song,
          matchScore: combinedScore,
          matchType,
        });
      }
    }

    // Sort by score and limit
    results.sort((a, b) => b.matchScore - a.matchScore);
    return results.slice(0, limit);
  }

  /**
   * Get title match score
   */
  private getTitleMatchScore(song: SongEntry, title: string): number {
    // Exact match
    if (normalizeVietnamese(song.metadata.title) === normalizeVietnamese(title)) {
      return 1;
    }

    // Check alternative titles
    if (song.metadata.alternativeTitles) {
      for (const altTitle of song.metadata.alternativeTitles) {
        if (normalizeVietnamese(altTitle) === normalizeVietnamese(title)) {
          return 0.95;
        }
      }
    }

    // Similarity score
    return calculateSimilarity(song.metadata.title, title);
  }

  /**
   * Get artist match score
   */
  private getArtistMatchScore(song: SongEntry, artist: string): number {
    const normalizedArtist = normalizeVietnamese(artist);

    // Check composer
    if (normalizeVietnamese(song.metadata.composerName) === normalizedArtist) {
      return 1;
    }

    // Check original performer
    if (song.metadata.originalPerformerName) {
      if (normalizeVietnamese(song.metadata.originalPerformerName) === normalizedArtist) {
        return 0.95;
      }
    }

    // Check performers
    if (song.performances) {
      for (const perf of song.performances) {
        if (normalizeVietnamese(perf.performerName) === normalizedArtist) {
          return 0.9;
        }
      }
    }

    // Similarity score
    let bestScore = calculateSimilarity(song.metadata.composerName, artist);

    if (song.metadata.originalPerformerName) {
      bestScore = Math.max(
        bestScore,
        calculateSimilarity(song.metadata.originalPerformerName, artist)
      );
    }

    return bestScore;
  }

  /**
   * Get song by ID
   */
  getSongById(id: string): SongEntry | null {
    return this.songs.find((s) => s.metadata.id === id) || null;
  }

  /**
   * Get all songs by era
   */
  getSongsByEra(era: string): SongEntry[] {
    return this.songs.filter((s) => s.metadata.era === era);
  }

  /**
   * Get all songs by genre
   */
  getSongsByGenre(genre: string): SongEntry[] {
    return this.songs.filter((s) => s.metadata.genres.includes(genre));
  }

  /**
   * Get all songs by composer
   */
  getSongsByComposer(composerName: string): SongEntry[] {
    const normalized = normalizeVietnamese(composerName);
    return this.songs.filter(
      (s) => normalizeVietnamese(s.metadata.composerName) === normalized
    );
  }

  /**
   * Get total song count
   */
  getTotalCount(): number {
    return this.songs.length;
  }

  /**
   * Get statistics
   */
  getStatistics(): {
    totalSongs: number;
    byEra: Record<string, number>;
    byConfidence: Record<string, number>;
    byGenre: Record<string, number>;
  } {
    const stats = {
      totalSongs: this.songs.length,
      byEra: {} as Record<string, number>,
      byConfidence: {} as Record<string, number>,
      byGenre: {} as Record<string, number>,
    };

    for (const song of this.songs) {
      // By era
      stats.byEra[song.metadata.era] = (stats.byEra[song.metadata.era] || 0) + 1;

      // By confidence
      const conf = song.contentQuality.overallConfidence;
      stats.byConfidence[conf] = (stats.byConfidence[conf] || 0) + 1;

      // By genre
      for (const genre of song.metadata.genres) {
        stats.byGenre[genre] = (stats.byGenre[genre] || 0) + 1;
      }
    }

    return stats;
  }
}

// Export singleton instance
export const songDatabase = new SongDatabase();

// Export types for convenience
export type { SongEntry, SongSearchResult, ArtistEntry, ConfidenceLevel };
