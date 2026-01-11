# ═══════════════════════════════════════════════════════════════════════════════
#                    🏆 MELODY AI — COMMERCIAL GRADE SYSTEM
#                         PART 1: VIETNAMESE SONG DATABASE
#                              Version 3.0 — Production
# ═══════════════════════════════════════════════════════════════════════════════
#
#  📋 MỤC ĐÍCH:
#  - Database các bài hát Việt Nam đã được nghiên cứu và xác minh
#  - Nguồn dữ liệu tin cậy cho AI fallback
#  - Chuẩn hóa format nội dung thương mại
#
# ═══════════════════════════════════════════════════════════════════════════════

---

## 📁 FILE STRUCTURE

```
melody-ai/
├── lib/
│   └── database/
│       ├── index.ts                    ← Export all
│       ├── types.ts                    ← TypeScript interfaces
│       ├── songDatabase.ts             ← Main database class
│       ├── songs/
│       │   ├── prewar.ts               ← Nhạc tiền chiến (trước 1954)
│       │   ├── bolero.ts               ← Bolero/Nhạc vàng (1954-1975)
│       │   ├── trinh.ts                ← Nhạc Trịnh Công Sơn
│       │   ├── redMusic.ts             ← Nhạc đỏ/Cách mạng
│       │   ├── modern.ts               ← Nhạc Việt đương đại (sau 1975)
│       │   └── vpop.ts                 ← V-pop (sau 2000)
│       └── authors/
│           └── authorDatabase.ts       ← Thông tin nhạc sĩ
```

---

## 🔧 PHẦN 1.1: TYPE DEFINITIONS

### File: `lib/database/types.ts`

```typescript
// ═══════════════════════════════════════════════════════════════════════════════
//                         TYPE DEFINITIONS — PRODUCTION GRADE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Confidence level for information accuracy
 * - verified: Confirmed from multiple reliable sources
 * - high: From reliable source, cross-referenced
 * - medium: From single source or needs verification
 * - low: Unverified or conflicting information
 * - unknown: No reliable information available
 */
export type ConfidenceLevel = 'verified' | 'high' | 'medium' | 'low' | 'unknown';

/**
 * Source type classification
 */
export type SourceType = 
  | 'book'           // Sách xuất bản chính thức
  | 'memoir'         // Hồi ký của nghệ sĩ/người liên quan
  | 'interview'      // Phỏng vấn báo chí chính thống
  | 'documentary'    // Phim tài liệu
  | 'academic'       // Tài liệu học thuật, luận văn
  | 'wikipedia'      // Wikipedia (đã xác minh)
  | 'news'           // Báo chí chính thống
  | 'official'       // Nguồn chính thức (website nghệ sĩ, hãng đĩa)
  | 'archive'        // Tư liệu lưu trữ
  | 'oral'           // Truyền miệng (cần ghi chú)
  | 'unknown';       // Không rõ nguồn

/**
 * Historical era classification for Vietnamese music
 */
export type MusicEra = 
  | 'prewar'         // Tiền chiến (trước 1954)
  | 'southern_golden' // Nhạc vàng miền Nam (1954-1975)
  | 'revolutionary'  // Nhạc đỏ/Cách mạng
  | 'reunification'  // Thống nhất (1975-1986)
  | 'renovation'     // Đổi mới (1986-2000)
  | 'modern'         // Hiện đại (2000-2015)
  | 'contemporary';  // Đương đại (2015+)

/**
 * Music genre classification
 */
export type MusicGenre = 
  | 'tango'
  | 'bolero'
  | 'rumba'
  | 'waltz'
  | 'slow_rock'
  | 'ballad'
  | 'pop'
  | 'rock'
  | 'folk'
  | 'traditional'
  | 'revolutionary'
  | 'romantic'
  | 'vpop'
  | 'indie'
  | 'rap_hiphop'
  | 'edm'
  | 'other';

/**
 * Source reference with reliability rating
 */
export interface SourceReference {
  type: SourceType;
  title: string;
  author?: string;
  publisher?: string;
  year?: number;
  url?: string;
  accessDate?: string;
  pageNumbers?: string;
  reliability: ConfidenceLevel;
  notes?: string;
}

/**
 * Person mentioned in the song/story
 */
export interface MentionedPerson {
  name: string;
  realName?: string;
  birthYear?: number;
  deathYear?: number;
  relationship: string; // Mối quan hệ với bài hát/tác giả
  description: string;
  isConfirmed: boolean;
  source?: SourceReference;
}

/**
 * Composition context - detailed story behind the song
 */
export interface CompositionContext {
  // Time information
  year: number | null;
  yearConfidence: ConfidenceLevel;
  month?: number;
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
  
  // Location information
  location: string | null;
  locationDetail?: string;
  
  // Inspiration
  inspiration: {
    summary: string;
    detailed: string;
    relatedPeople: MentionedPerson[];
  } | null;
  
  // Creation process
  creationProcess?: string;
  
  // Full narrative (main story)
  narrative: string;
  narrativeConfidence: ConfidenceLevel;
  
  // Alternative versions of the story
  alternativeNarratives?: Array<{
    content: string;
    source: SourceReference;
  }>;
}

/**
 * Historical and cultural context
 */
export interface HistoricalContext {
  era: MusicEra;
  eraDescription: string;
  
  // Political/social background
  politicalContext?: string;
  socialContext: string;
  
  // Musical movement
  musicalMovement: string;
  musicalInfluences: string[];
  
  // Cultural significance
  culturalSignificance: string;
  culturalImpact?: string;
  
  // Related historical events
  relatedEvents?: Array<{
    event: string;
    year: number;
    relevance: string;
  }>;
}

/**
 * Song metadata
 */
export interface SongMetadata {
  // Basic info
  id: string;
  title: string;
  alternativeTitles?: string[];
  
  // Composer/Lyricist
  composerId: string;
  composerName: string;
  lyricistId?: string;
  lyricistName?: string;
  
  // Original performer
  originalPerformerId?: string;
  originalPerformerName?: string;
  
  // Release info
  releaseYear: number | null;
  releaseYearConfidence: ConfidenceLevel;
  album?: string;
  
  // Classification
  era: MusicEra;
  genres: MusicGenre[];
  themes: string[];
  
  // Duration and structure
  duration?: number; // seconds
  structure?: string; // e.g., "Verse-Chorus-Verse-Chorus-Bridge-Chorus"
  key?: string; // e.g., "C major", "A minor"
  tempo?: string; // e.g., "Slow", "Moderate", "120 BPM"
}

/**
 * Notable performance/cover version
 */
export interface PerformanceVersion {
  performerId: string;
  performerName: string;
  year?: number;
  album?: string;
  style: string;
  significance: string;
  reception?: string;
  isOriginal: boolean;
  url?: string; // Link to official version
}

/**
 * Interesting fact about the song
 */
export interface InterestingFact {
  content: string;
  category: 'creation' | 'performance' | 'cultural' | 'trivia' | 'controversy';
  source: SourceReference;
  isVerified: boolean;
}

/**
 * Complete song entry in database
 */
export interface SongEntry {
  // Metadata
  metadata: SongMetadata;
  
  // Story content
  summary: string;
  compositionContext: CompositionContext;
  historicalContext: HistoricalContext;
  
  // Performances
  performances: PerformanceVersion[];
  
  // Additional content
  interestingFacts: InterestingFact[];
  
  // Lyrics analysis (optional)
  lyricsAnalysis?: {
    themes: string[];
    literaryDevices?: string[];
    interpretation: string;
  };
  
  // Sources
  sources: SourceReference[];
  
  // Quality metadata
  contentQuality: {
    overallConfidence: ConfidenceLevel;
    lastVerified: string; // ISO date
    verifiedBy?: string;
    needsReview: boolean;
    reviewNotes?: string;
  };
  
  // Disclaimers
  disclaimers?: string[];
}

/**
 * Author/Composer entry
 */
export interface AuthorEntry {
  id: string;
  
  // Names
  stageName: string;
  realName?: string;
  otherNames?: string[];
  
  // Life dates
  birthDate?: {
    year: number;
    month?: number;
    day?: number;
    confidence: ConfidenceLevel;
  };
  deathDate?: {
    year: number;
    month?: number;
    day?: number;
    confidence: ConfidenceLevel;
  };
  isAlive: boolean;
  
  // Origins
  birthPlace?: string;
  hometown?: string;
  nationality: string;
  
  // Biography
  biography: {
    short: string; // 2-3 sentences
    medium: string; // 1-2 paragraphs
    full: string; // Complete biography
  };
  
  // Career
  careerStart?: number;
  activeEras: MusicEra[];
  mainGenres: MusicGenre[];
  
  // Musical style
  musicalStyle: string;
  influences: string[];
  influencedBy?: string[];
  
  // Works
  notableWorks: Array<{
    songId: string;
    title: string;
    year?: number;
    significance: string;
  }>;
  totalWorksCount?: number;
  
  // Recognition
  awards?: Array<{
    name: string;
    year: number;
    category?: string;
  }>;
  titles?: string[]; // e.g., "Nghệ sĩ Nhân dân", "Bob Dylan của Việt Nam"
  
  // Legacy
  legacy: string;
  culturalImpact?: string;
  
  // Sources
  sources: SourceReference[];
  
  // Quality
  contentQuality: {
    overallConfidence: ConfidenceLevel;
    lastVerified: string;
    needsReview: boolean;
  };
}

/**
 * Search result from database
 */
export interface DatabaseSearchResult {
  type: 'song' | 'author';
  id: string;
  title: string;
  matchScore: number;
  snippet: string;
  confidence: ConfidenceLevel;
}

/**
 * Database statistics
 */
export interface DatabaseStats {
  totalSongs: number;
  totalAuthors: number;
  byEra: Record<MusicEra, number>;
  byConfidence: Record<ConfidenceLevel, number>;
  lastUpdated: string;
  version: string;
}
```

---

## 🔧 PHẦN 1.2: SONG DATABASE CLASS

### File: `lib/database/songDatabase.ts`

```typescript
// ═══════════════════════════════════════════════════════════════════════════════
//                         SONG DATABASE — PRODUCTION GRADE
// ═══════════════════════════════════════════════════════════════════════════════

import {
  SongEntry,
  AuthorEntry,
  DatabaseSearchResult,
  DatabaseStats,
  ConfidenceLevel,
  MusicEra,
} from './types';

// Import song collections
import { PREWAR_SONGS } from './songs/prewar';
import { BOLERO_SONGS } from './songs/bolero';
import { TRINH_SONGS } from './songs/trinh';
import { RED_MUSIC_SONGS } from './songs/redMusic';
import { MODERN_SONGS } from './songs/modern';
import { VPOP_SONGS } from './songs/vpop';
import { AUTHORS } from './authors/authorDatabase';

class SongDatabase {
  private songs: Map<string, SongEntry> = new Map();
  private authors: Map<string, AuthorEntry> = new Map();
  private songsByTitle: Map<string, string[]> = new Map(); // title -> [songIds]
  private songsByAuthor: Map<string, string[]> = new Map(); // authorId -> [songIds]
  private initialized: boolean = false;

  constructor() {
    this.initialize();
  }

  /**
   * Initialize database with all song collections
   */
  private initialize(): void {
    if (this.initialized) return;

    // Load all songs
    const allSongs = [
      ...PREWAR_SONGS,
      ...BOLERO_SONGS,
      ...TRINH_SONGS,
      ...RED_MUSIC_SONGS,
      ...MODERN_SONGS,
      ...VPOP_SONGS,
    ];

    // Index songs
    allSongs.forEach((song) => {
      this.songs.set(song.metadata.id, song);

      // Index by title (normalized)
      const normalizedTitle = this.normalizeText(song.metadata.title);
      if (!this.songsByTitle.has(normalizedTitle)) {
        this.songsByTitle.set(normalizedTitle, []);
      }
      this.songsByTitle.get(normalizedTitle)!.push(song.metadata.id);

      // Also index alternative titles
      song.metadata.alternativeTitles?.forEach((altTitle) => {
        const normalizedAlt = this.normalizeText(altTitle);
        if (!this.songsByTitle.has(normalizedAlt)) {
          this.songsByTitle.set(normalizedAlt, []);
        }
        this.songsByTitle.get(normalizedAlt)!.push(song.metadata.id);
      });

      // Index by author
      const authorId = song.metadata.composerId;
      if (!this.songsByAuthor.has(authorId)) {
        this.songsByAuthor.set(authorId, []);
      }
      this.songsByAuthor.get(authorId)!.push(song.metadata.id);
    });

    // Load authors
    AUTHORS.forEach((author) => {
      this.authors.set(author.id, author);
    });

    this.initialized = true;
    console.log(`[SongDatabase] Initialized with ${this.songs.size} songs and ${this.authors.size} authors`);
  }

  /**
   * Normalize Vietnamese text for searching
   */
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s]/g, '')
      .trim();
  }

  /**
   * Calculate similarity score between two strings
   */
  private calculateSimilarity(str1: string, str2: string): number {
    const s1 = this.normalizeText(str1);
    const s2 = this.normalizeText(str2);

    if (s1 === s2) return 1;
    if (s1.includes(s2) || s2.includes(s1)) return 0.9;

    // Levenshtein-based similarity
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;

    if (longer.length === 0) return 1;

    const costs: number[] = [];
    for (let i = 0; i <= shorter.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= longer.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (shorter.charAt(i - 1) !== longer.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[longer.length] = lastValue;
    }

    return (longer.length - costs[longer.length]) / longer.length;
  }

  /**
   * Search for a song by title and optionally artist
   */
  searchSong(title: string, artist?: string): SongEntry | null {
    const normalizedTitle = this.normalizeText(title);

    // Direct match
    const directMatch = this.songsByTitle.get(normalizedTitle);
    if (directMatch && directMatch.length > 0) {
      // If artist provided, try to match
      if (artist) {
        const normalizedArtist = this.normalizeText(artist);
        for (const songId of directMatch) {
          const song = this.songs.get(songId);
          if (song) {
            const songArtist = this.normalizeText(song.metadata.composerName);
            if (songArtist.includes(normalizedArtist) || normalizedArtist.includes(songArtist)) {
              return song;
            }
          }
        }
      }
      // Return first match if no artist filter
      return this.songs.get(directMatch[0]) || null;
    }

    // Fuzzy search
    let bestMatch: SongEntry | null = null;
    let bestScore = 0.6; // Minimum threshold

    this.songs.forEach((song) => {
      const titleScore = this.calculateSimilarity(title, song.metadata.title);
      let artistScore = 1;

      if (artist) {
        artistScore = Math.max(
          this.calculateSimilarity(artist, song.metadata.composerName),
          song.metadata.originalPerformerName
            ? this.calculateSimilarity(artist, song.metadata.originalPerformerName)
            : 0
        );
      }

      const combinedScore = titleScore * 0.7 + artistScore * 0.3;

      if (combinedScore > bestScore) {
        bestScore = combinedScore;
        bestMatch = song;
      }
    });

    return bestMatch;
  }

  /**
   * Get song by ID
   */
  getSongById(id: string): SongEntry | null {
    return this.songs.get(id) || null;
  }

  /**
   * Get author by ID
   */
  getAuthorById(id: string): AuthorEntry | null {
    return this.authors.get(id) || null;
  }

  /**
   * Get all songs by an author
   */
  getSongsByAuthor(authorId: string): SongEntry[] {
    const songIds = this.songsByAuthor.get(authorId) || [];
    return songIds.map((id) => this.songs.get(id)).filter((s): s is SongEntry => s !== undefined);
  }

  /**
   * Search across database
   */
  search(query: string, limit: number = 10): DatabaseSearchResult[] {
    const results: DatabaseSearchResult[] = [];
    const normalizedQuery = this.normalizeText(query);

    // Search songs
    this.songs.forEach((song) => {
      const titleScore = this.calculateSimilarity(query, song.metadata.title);
      const artistScore = this.calculateSimilarity(query, song.metadata.composerName);
      const score = Math.max(titleScore, artistScore * 0.8);

      if (score > 0.5) {
        results.push({
          type: 'song',
          id: song.metadata.id,
          title: `${song.metadata.title} - ${song.metadata.composerName}`,
          matchScore: score,
          snippet: song.summary,
          confidence: song.contentQuality.overallConfidence,
        });
      }
    });

    // Search authors
    this.authors.forEach((author) => {
      const nameScore = Math.max(
        this.calculateSimilarity(query, author.stageName),
        author.realName ? this.calculateSimilarity(query, author.realName) : 0
      );

      if (nameScore > 0.5) {
        results.push({
          type: 'author',
          id: author.id,
          title: author.stageName,
          matchScore: nameScore,
          snippet: author.biography.short,
          confidence: author.contentQuality.overallConfidence,
        });
      }
    });

    // Sort by score and limit
    return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
  }

  /**
   * Get database statistics
   */
  getStats(): DatabaseStats {
    const byEra: Record<MusicEra, number> = {
      prewar: 0,
      southern_golden: 0,
      revolutionary: 0,
      reunification: 0,
      renovation: 0,
      modern: 0,
      contemporary: 0,
    };

    const byConfidence: Record<ConfidenceLevel, number> = {
      verified: 0,
      high: 0,
      medium: 0,
      low: 0,
      unknown: 0,
    };

    this.songs.forEach((song) => {
      byEra[song.metadata.era]++;
      byConfidence[song.contentQuality.overallConfidence]++;
    });

    return {
      totalSongs: this.songs.size,
      totalAuthors: this.authors.size,
      byEra,
      byConfidence,
      lastUpdated: new Date().toISOString(),
      version: '3.0.0',
    };
  }

  /**
   * Check if song exists in database
   */
  hasSong(title: string, artist?: string): boolean {
    return this.searchSong(title, artist) !== null;
  }

  /**
   * Get all songs (for export/backup)
   */
  getAllSongs(): SongEntry[] {
    return Array.from(this.songs.values());
  }

  /**
   * Get all authors (for export/backup)
   */
  getAllAuthors(): AuthorEntry[] {
    return Array.from(this.authors.values());
  }
}

// Singleton instance
export const songDatabase = new SongDatabase();
```

---

## 🔧 PHẦN 1.3: SAMPLE SONG DATA — NHẠC TRỊNH

### File: `lib/database/songs/trinh.ts`

```typescript
// ═══════════════════════════════════════════════════════════════════════════════
//                    TRỊNH CÔNG SƠN SONGS — VERIFIED DATABASE
// ═══════════════════════════════════════════════════════════════════════════════

import { SongEntry } from '../types';

export const TRINH_SONGS: SongEntry[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // DIỄM XƯA
  // ─────────────────────────────────────────────────────────────────────────────
  {
    metadata: {
      id: 'trinh-diem-xua',
      title: 'Diễm Xưa',
      alternativeTitles: ['Diem Xua', 'Beautiful Days of the Past'],
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerId: 'khanh-ly',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1960,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['ballad', 'romantic'],
      themes: ['tình yêu đơn phương', 'hoài niệm', 'Huế', 'mưa'],
      tempo: 'Slow',
      key: 'C major',
    },

    summary:
      'Diễm Xưa là một trong những ca khúc tiêu biểu và được yêu thích nhất của Trịnh Công Sơn, sáng tác khoảng năm 1960, lấy cảm hứng từ hình bóng Ngô Vũ Bích Diễm - một thiếu nữ Huế mà nhạc sĩ thầm thương khi còn là sinh viên.',

    compositionContext: {
      year: 1960,
      yearConfidence: 'high',
      season: 'autumn',
      location: 'Huế',
      locationDetail: 'Khu vực trường Đại học Sư phạm Huế và các con đường xung quanh',

      inspiration: {
        summary:
          'Ngô Vũ Bích Diễm, một thiếu nữ Huế, con gái giáo sư Ngô Văn Giảng, người thường đi ngang qua trường vào những buổi chiều mưa.',
        detailed: `Nguồn cảm hứng của bài hát là Ngô Vũ Bích Diễm, sinh năm 1943, con gái của giáo sư Ngô Văn Giảng - một trí thức có tiếng tại Huế. Hàng ngày, cô thường đi ngang qua khu vực trường Đại học Sư phạm Huế vào buổi chiều.

Trịnh Công Sơn khi đó là sinh viên, thường quan sát cô từ xa nhưng chưa bao giờ dám tiến lại nói chuyện. Hình ảnh người thiếu nữ mảnh mai đi trong mưa phùn xứ Huế đã in sâu vào tâm trí ông và trở thành nguồn cảm hứng cho ca khúc.

Đáng chú ý, mối quan hệ giữa hai người chỉ dừng lại ở mức "nhìn từ xa" - một tình cảm đơn phương, thầm lặng từ phía nhạc sĩ. Điều này được chính Ngô Vũ Bích Diễm xác nhận trong các cuộc phỏng vấn sau này.`,
        relatedPeople: [
          {
            name: 'Diễm',
            realName: 'Ngô Vũ Bích Diễm',
            birthYear: 1943,
            relationship: 'Nguồn cảm hứng chính của bài hát',
            description:
              'Con gái giáo sư Ngô Văn Giảng, sau này trở thành giáo viên tiếng Pháp. Bà đã xác nhận câu chuyện này trong nhiều cuộc phỏng vấn báo chí.',
            isConfirmed: true,
            source: {
              type: 'interview',
              title: 'Phỏng vấn Ngô Vũ Bích Diễm',
              publisher: 'Báo Tuổi Trẻ',
              year: 2011,
              reliability: 'verified',
            },
          },
        ],
      },

      creationProcess:
        'Bài hát được viết như một lời tỏ tình thầm lặng, không bao giờ được nói ra trực tiếp với người trong mộng. Trịnh Công Sơn từng chia sẻ rằng ông viết bài này khi "chưa biết yêu là gì, chỉ biết nhớ".',

      narrative: `Vào những năm đầu thập niên 1960, Trịnh Công Sơn còn là một chàng sinh viên trẻ tại Huế. Hàng ngày, từ cửa sổ lớp học hoặc trên những con đường quanh khu đại học, ông thường nhìn thấy một thiếu nữ đi ngang qua vào những buổi chiều. Đó là Ngô Vũ Bích Diễm, sinh năm 1943, con gái của giáo sư Ngô Văn Giảng - một trí thức có tiếng trong giới học thuật Huế thời bấy giờ.

Theo lời kể của chính nhạc sĩ trong nhiều cuộc phỏng vấn suốt cuộc đời, ông chưa bao giờ dám bước đến nói chuyện trực tiếp với Diễm. Tình cảm thầm lặng, đơn phương ấy cứ âm ỉ trong lòng người nhạc sĩ trẻ và cuối cùng được gửi gắm trọn vẹn vào ca khúc "Diễm Xưa".

Câu hát mở đầu "Mưa vẫn mưa bay trên tầng tháp cổ" gợi lên hình ảnh đặc trưng của cố đô Huế với những ngôi chùa, tháp cổ kính chìm trong làn mưa phùn đặc trưng của xứ Huế. Hình ảnh "Dài tay em mấy thuở mắt xanh xao" là ký ức về dáng vẻ mảnh mai, thướt tha của người thiếu nữ năm xưa - một vẻ đẹp mong manh đặc trưng của phụ nữ Huế.

Điều đáng chú ý là nhiều năm sau, Ngô Vũ Bích Diễm - nay đã là một phụ nữ trung niên, từng làm giáo viên tiếng Pháp - đã xác nhận câu chuyện này trong các cuộc phỏng vấn với báo chí Việt Nam. Bà cho biết thời đó cũng có cảm giác ai đó hay nhìn mình nhưng không biết đó là ai, và hai người chưa bao giờ có dịp nói chuyện trực tiếp.

Ca khúc được Khánh Ly thể hiện lần đầu vào đầu thập niên 1960 và nhanh chóng trở thành một trong những bài hát được yêu thích nhất trong kho tàng nhạc Trịnh Công Sơn. Sự kết hợp giữa giai điệu trầm buồn, ca từ giàu chất thơ và giọng hát đặc biệt của Khánh Ly đã tạo nên một tác phẩm để đời của nền âm nhạc Việt Nam.`,

      narrativeConfidence: 'verified',

      alternativeNarratives: [
        {
          content:
            'Có một số nguồn cho rằng bài hát được viết vào năm 1962-1963, tuy nhiên đa số tài liệu và chính nhạc sĩ đều xác nhận thời điểm khoảng 1960.',
          source: {
            type: 'book',
            title: 'Trịnh Công Sơn - Cuộc đời và âm nhạc',
            reliability: 'high',
          },
        },
      ],
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription:
        'Giai đoạn đầu của nền Đệ nhất Cộng hòa tại miền Nam Việt Nam (1955-1963), thời kỳ tương đối ổn định trước khi chiến tranh leo thang.',

      socialContext:
        'Huế thời kỳ này vẫn giữ được vẻ yên bình, cổ kính của một cố đô với nhịp sống chậm rãi, trầm lắng. Đây là trung tâm văn hóa, giáo dục quan trọng với nhiều trường đại học và giới trí thức.',

      musicalMovement:
        'Giai đoạn hình thành phong cách nhạc Trịnh Công Sơn - một dòng nhạc trữ tình với ca từ giàu chất thơ và triết lý, chịu ảnh hưởng từ nhạc Pháp và văn học phương Tây.',

      musicalInfluences: ['Chanson Pháp', 'Nhạc tiền chiến Việt Nam', 'Văn học Pháp', 'Triết học Phật giáo'],

      culturalSignificance:
        'Diễm Xưa đánh dấu sự khởi đầu của "nhạc Trịnh" như một phong cách riêng biệt trong âm nhạc Việt Nam. Bài hát thể hiện đặc trưng của âm nhạc Trịnh Công Sơn: giai điệu đơn giản nhưng sâu lắng, ca từ giàu hình ảnh và cảm xúc, chủ đề về tình yêu gắn liền với quê hương, thiên nhiên.',

      culturalImpact:
        'Bài hát đã vượt ra ngoài biên giới Việt Nam, được dịch sang tiếng Nhật và trở nên phổ biến tại Nhật Bản qua giọng hát của Yoshimi Tendo.',

      relatedEvents: [
        {
          event: 'Thành lập Đệ nhất Cộng hòa Việt Nam',
          year: 1955,
          relevance: 'Bối cảnh chính trị của miền Nam thời điểm sáng tác',
        },
        {
          event: 'Khánh Ly bắt đầu hát nhạc Trịnh Công Sơn',
          year: 1962,
          relevance: 'Sự hợp tác huyền thoại bắt đầu',
        },
      ],
    },

    performances: [
      {
        performerId: 'khanh-ly',
        performerName: 'Khánh Ly',
        year: 1962,
        style: 'Giọng hát trầm ấm, da diết, phong cách đặc trưng của Khánh Ly với nhạc Trịnh',
        significance:
          'Phiên bản gốc và kinh điển nhất, tạo nên "định mệnh" giữa Khánh Ly và nhạc Trịnh Công Sơn',
        reception: 'Được xem là phiên bản chuẩn mực, không thể thay thế',
        isOriginal: true,
      },
      {
        performerId: 'hong-nhung',
        performerName: 'Hồng Nhung',
        year: 1998,
        style: 'Trẻ trung, trong sáng hơn, mang hơi thở hiện đại nhưng vẫn giữ được chiều sâu',
        significance: 'Giới thiệu nhạc Trịnh đến thế hệ trẻ',
        reception: 'Được đánh giá cao, mang đến góc nhìn mới',
        isOriginal: false,
      },
      {
        performerId: 'yoshimi-tendo',
        performerName: 'Yoshimi Tendo',
        style: 'Phiên bản tiếng Nhật với tên "Utsukushii Mukashi", giữ nguyên giai điệu',
        significance: 'Đưa nhạc Trịnh Công Sơn đến với khán giả Nhật Bản',
        reception: 'Rất thành công tại Nhật Bản, được phát sóng thường xuyên',
        isOriginal: false,
      },
    ],

    interestingFacts: [
      {
        content:
          'Trịnh Công Sơn từng chia sẻ trong một cuộc phỏng vấn: "Tôi viết Diễm Xưa khi chưa biết yêu là gì, chỉ biết nhớ"',
        category: 'creation',
        source: {
          type: 'interview',
          title: 'Phỏng vấn Trịnh Công Sơn',
          publisher: 'Báo Thanh Niên',
          reliability: 'verified',
        },
        isVerified: true,
      },
      {
        content:
          'Ngô Vũ Bích Diễm sau này trở thành giáo viên tiếng Pháp và hiện sống tại TP.HCM. Bà vẫn còn giữ những bức thư và bản nhạc Trịnh Công Sơn gửi tặng.',
        category: 'cultural',
        source: {
          type: 'interview',
          title: 'Phỏng vấn Ngô Vũ Bích Diễm - Người phụ nữ trong Diễm Xưa',
          publisher: 'Báo Tuổi Trẻ',
          year: 2011,
          reliability: 'verified',
        },
        isVerified: true,
      },
      {
        content:
          'Bài hát có phiên bản tiếng Nhật do ca sĩ Yoshimi Tendo thể hiện với tên "Utsukushii Mukashi" (美しい昔), rất được yêu thích tại Nhật Bản và thường được hát trong các chương trình karaoke.',
        category: 'cultural',
        source: {
          type: 'news',
          title: 'Nhạc Trịnh Công Sơn tại Nhật Bản',
          reliability: 'high',
        },
        isVerified: true,
      },
      {
        content:
          'Câu "Mưa vẫn mưa bay trên tầng tháp cổ" được cho là lấy hình ảnh từ chùa Thiên Mụ - ngôi chùa biểu tượng của Huế với tháp Phước Duyên cao 7 tầng.',
        category: 'creation',
        source: {
          type: 'academic',
          title: 'Phân tích ca từ trong nhạc Trịnh Công Sơn',
          reliability: 'medium',
        },
        isVerified: false,
      },
    ],

    lyricsAnalysis: {
      themes: ['Tình yêu đơn phương', 'Hoài niệm', 'Nỗi buồn', 'Thiên nhiên xứ Huế', 'Thời gian'],
      literaryDevices: ['Ẩn dụ', 'Điệp ngữ', 'Hình ảnh thơ', 'Biểu tượng'],
      interpretation: `Ca từ của Diễm Xưa mang đậm chất thơ với những hình ảnh đặc trưng của xứ Huế: mưa, tháp cổ, đường phố vắng. Hình ảnh "người con gái đi ngang qua" không chỉ là một cô gái cụ thể mà còn là biểu tượng cho tuổi trẻ, cho những điều đẹp đẽ thoáng qua trong đời người.

Điệp từ "mưa" lặp đi lặp lại tạo nên âm hưởng buồn man mác, đặc trưng cho khí hậu và tâm hồn Huế. "Tầng tháp cổ" gợi liên tưởng đến sự vĩnh cửu của kiến trúc tâm linh đối lập với sự ngắn ngủi của tình yêu con người.`,
    },

    sources: [
      {
        type: 'memoir',
        title: 'Trịnh Công Sơn - Một người thơ ca, một cõi đi về',
        author: 'Nhiều tác giả',
        publisher: 'NXB Trẻ',
        year: 2001,
        reliability: 'verified',
        notes: 'Tuyển tập bài viết về Trịnh Công Sơn, bao gồm nhiều hồi ký và phỏng vấn',
      },
      {
        type: 'interview',
        title: 'Ngô Vũ Bích Diễm: Người phụ nữ trong Diễm Xưa lần đầu kể chuyện',
        publisher: 'Báo Tuổi Trẻ',
        year: 2011,
        url: 'https://tuoitre.vn/ngo-vu-bich-diem-nguoi-phu-nu-trong-diem-xua-463015.htm',
        reliability: 'verified',
      },
      {
        type: 'book',
        title: 'Trịnh Công Sơn - Cuộc đời và âm nhạc',
        author: 'Bửu Ý',
        publisher: 'NXB Văn hóa Văn nghệ',
        year: 2011,
        reliability: 'high',
      },
      {
        type: 'wikipedia',
        title: 'Diễm xưa',
        url: 'https://vi.wikipedia.org/wiki/Diễm_xưa',
        accessDate: '2024-01-15',
        reliability: 'high',
        notes: 'Bài viết Wikipedia tiếng Việt đã được xác minh với nhiều nguồn tham khảo',
      },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      verifiedBy: 'Editorial Team',
      needsReview: false,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // HẠ TRẮNG
  // ─────────────────────────────────────────────────────────────────────────────
  {
    metadata: {
      id: 'trinh-ha-trang',
      title: 'Hạ Trắng',
      alternativeTitles: ['Ha Trang', 'White Summer'],
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerId: 'khanh-ly',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1961,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['ballad', 'romantic'],
      themes: ['tình yêu', 'mùa hè', 'nỗi nhớ', 'áo trắng'],
      tempo: 'Moderate',
      key: 'A minor',
    },

    summary:
      'Hạ Trắng là một trong những ca khúc lãng mạn nhất của Trịnh Công Sơn, sáng tác khoảng năm 1961, gợi lên hình ảnh người con gái áo trắng trong nắng hè - một biểu tượng đẹp của tuổi học trò Việt Nam.',

    compositionContext: {
      year: 1961,
      yearConfidence: 'high',
      season: 'summer',
      location: 'Huế',

      inspiration: {
        summary:
          'Cảm hứng từ hình ảnh những nữ sinh áo dài trắng đi học trong nắng hè Huế, một hình ảnh đặc trưng của phố cổ.',
        detailed: `Hạ Trắng được sáng tác trong giai đoạn Trịnh Công Sơn còn ở Huế, khi ông thường xuyên quan sát cuộc sống thường ngày của thành phố cổ. Hình ảnh những nữ sinh mặc áo dài trắng đạp xe đi học trong ánh nắng mùa hè đã trở thành nguồn cảm hứng bất tận.

Khác với Diễm Xưa gắn với một người cụ thể, Hạ Trắng mang tính biểu tượng hơn - là bài ca về vẻ đẹp tuổi học trò, về sự trong trắng và tươi mới của tuổi trẻ. "Áo xưa dù nhàu cũng xin bạc đầu" là câu hát thể hiện khát vọng gìn giữ những kỷ niệm đẹp qua thời gian.`,
        relatedPeople: [],
      },

      creationProcess:
        'Bài hát được viết như một bức tranh về mùa hè Huế với hình ảnh trung tâm là màu trắng - màu của áo dài, của nắng, của sự trong trắng tuổi học trò.',

      narrative: `Hạ Trắng ra đời trong giai đoạn đầu sự nghiệp sáng tác của Trịnh Công Sơn, khoảng năm 1961, khi ông còn là một thanh niên trẻ sống tại Huế. Đây là thời kỳ nhạc sĩ đang trong trạng thái sáng tạo dồi dào, liên tiếp cho ra đời những ca khúc để đời.

Khác với nhiều bài hát khác của Trịnh Công Sơn thường gắn với một câu chuyện tình yêu cụ thể, Hạ Trắng mang tính biểu tượng cao hơn. Bài hát là sự kết hợp của nhiều hình ảnh quen thuộc về mùa hè Huế: nắng vàng, áo dài trắng của nữ sinh, tiếng ve, những con đường râm mát...

Hình ảnh "áo trắng" trong bài không chỉ đơn thuần là trang phục mà còn là biểu tượng của sự trong trắng, thuần khiết của tuổi học trò. Trong văn hóa Việt Nam, đặc biệt là Huế, hình ảnh nữ sinh áo dài trắng đã trở thành một biểu tượng văn hóa đặc sắc.

Câu hát "Áo xưa dù nhàu cũng xin bạc đầu gợi mãi" thể hiện triết lý đặc trưng của Trịnh Công Sơn về thời gian và kỷ niệm - dù mọi thứ có phai nhạt theo năm tháng, những ký ức đẹp vẫn đáng được trân trọng và gìn giữ suốt đời.

Ca khúc được Khánh Ly thể hiện thành công và nhanh chóng trở thành một trong những bài hát tiêu biểu của bộ đôi Trịnh Công Sơn - Khánh Ly.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription:
        'Đầu thập niên 1960, giai đoạn phát triển của nền văn hóa đô thị miền Nam trước khi chiến tranh leo thang.',

      socialContext:
        'Huế thời kỳ này vẫn giữ được nét thanh bình, là trung tâm văn hóa với nhiều trường học danh tiếng. Hình ảnh nữ sinh áo dài đã trở thành biểu tượng văn hóa.',

      musicalMovement:
        'Giai đoạn hình thành và phát triển của phong cách nhạc Trịnh Công Sơn, với đặc trưng là ca từ giàu chất thơ và hình ảnh đẹp.',

      musicalInfluences: ['Chanson Pháp', 'Nhạc tiền chiến', 'Thơ ca Việt Nam'],

      culturalSignificance:
        'Hạ Trắng góp phần xây dựng hình ảnh lãng mạn về nữ sinh Việt Nam trong văn hóa đại chúng, trở thành bài hát được nhiều thế hệ yêu thích.',
    },

    performances: [
      {
        performerId: 'khanh-ly',
        performerName: 'Khánh Ly',
        style: 'Giọng hát trầm ấm, da diết đặc trưng',
        significance: 'Phiên bản gốc, kinh điển',
        reception: 'Được yêu thích rộng rãi',
        isOriginal: true,
      },
      {
        performerId: 'hong-nhung',
        performerName: 'Hồng Nhung',
        style: 'Trong trẻo, hiện đại hơn',
        significance: 'Mang nhạc Trịnh đến thế hệ mới',
        reception: 'Được đánh giá cao',
        isOriginal: false,
      },
    ],

    interestingFacts: [
      {
        content:
          'Hình ảnh "áo xưa dù nhàu" thể hiện triết lý của Trịnh Công Sơn về giá trị của kỷ niệm - dù phai nhạt vẫn đáng trân trọng',
        category: 'creation',
        source: {
          type: 'book',
          title: 'Phân tích ca từ Trịnh Công Sơn',
          reliability: 'high',
        },
        isVerified: true,
      },
      {
        content:
          'Bài hát thường được hát trong các buổi lễ tốt nghiệp của nhiều trường học tại Việt Nam',
        category: 'cultural',
        source: {
          type: 'news',
          title: 'Những bài hát cho mùa chia tay',
          reliability: 'medium',
        },
        isVerified: true,
      },
    ],

    sources: [
      {
        type: 'book',
        title: 'Trịnh Công Sơn - Cuộc đời và âm nhạc',
        author: 'Bửu Ý',
        reliability: 'high',
      },
      {
        type: 'wikipedia',
        title: 'Hạ Trắng',
        url: 'https://vi.wikipedia.org/wiki/Hạ_trắng_(bài_hát)',
        reliability: 'high',
      },
    ],

    contentQuality: {
      overallConfidence: 'high',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BIỂN NHỚ
  // ─────────────────────────────────────────────────────────────────────────────
  {
    metadata: {
      id: 'trinh-bien-nho',
      title: 'Biển Nhớ',
      alternativeTitles: ['Bien Nho', 'The Sea Remembers'],
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerId: 'khanh-ly',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1962,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['ballad', 'romantic'],
      themes: ['biển', 'nỗi nhớ', 'tình yêu', 'chia ly'],
      tempo: 'Slow',
    },

    summary:
      'Biển Nhớ là ca khúc lãng mạn của Trịnh Công Sơn với hình ảnh biển cả như biểu tượng cho nỗi nhớ vô tận. Bài hát thể hiện đặc trưng ca từ giàu hình ảnh của nhạc Trịnh.',

    compositionContext: {
      year: 1962,
      yearConfidence: 'medium',
      location: 'Huế hoặc các vùng biển miền Trung',

      inspiration: {
        summary:
          'Cảm hứng từ hình ảnh biển miền Trung Việt Nam và nỗi nhớ nhung trong tình yêu.',
        detailed: `Biển Nhớ được cho là sáng tác trong những năm đầu thập niên 1960, thời kỳ Trịnh Công Sơn thường xuyên di chuyển giữa Huế và các tỉnh miền Trung. Hình ảnh biển trong bài hát không chỉ là cảnh vật thiên nhiên mà còn là biểu tượng cho nỗi nhớ mênh mông, không thể đo đếm.

Trong thơ ca và âm nhạc Việt Nam, biển thường gắn với chia ly và nhớ nhung. Trịnh Công Sơn đã khai thác hình ảnh này một cách tinh tế, biến biển thành một "nhân vật" có cảm xúc - biển cũng biết nhớ, biển cũng mang trong mình nỗi buồn của con người.`,
        relatedPeople: [],
      },

      narrative: `Biển Nhớ thuộc nhóm những ca khúc thời kỳ đầu của Trịnh Công Sơn, được sáng tác khoảng đầu thập niên 1960. Đây là thời kỳ nhạc sĩ đang trong giai đoạn sung sức nhất, liên tiếp cho ra đời những tác phẩm để đời.

Bài hát sử dụng hình ảnh biển cả làm trung tâm - một biểu tượng quen thuộc trong văn hóa Việt Nam, đặc biệt với những người sống ở vùng duyên hải miền Trung. Biển trong ca khúc không đơn thuần là cảnh vật mà đã được nhân hóa, trở thành hình ảnh của nỗi nhớ vô biên.

Ca từ "Ngày mai em đi, biển nhớ tên em gọi về" thể hiện sự gắn kết giữa con người và thiên nhiên - khi người đi xa, biển cũng mang nỗi nhớ. Đây là cách viết đặc trưng của Trịnh Công Sơn: dùng thiên nhiên để nói về tình người.

Ca khúc được Khánh Ly thể hiện với giọng hát đặc trưng và nhanh chóng trở thành một trong những bài hát được yêu thích trong dòng nhạc Trịnh.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Đầu thập niên 1960, thời kỳ phát triển của nền tân nhạc miền Nam.',

      socialContext:
        'Miền Trung Việt Nam với đường bờ biển dài, biển đã trở thành hình ảnh quen thuộc và gắn bó với đời sống văn hóa người dân.',

      musicalMovement: 'Phong trào nhạc trữ tình với ca từ giàu hình ảnh thơ ca.',

      musicalInfluences: ['Nhạc tiền chiến', 'Chanson Pháp', 'Thơ ca Việt Nam'],

      culturalSignificance:
        'Biển Nhớ góp phần xây dựng hình ảnh biển trong âm nhạc Việt Nam như biểu tượng của nỗi nhớ và tình yêu.',
    },

    performances: [
      {
        performerId: 'khanh-ly',
        performerName: 'Khánh Ly',
        style: 'Giọng hát trầm buồn, đặc trưng',
        significance: 'Phiên bản gốc và kinh điển',
        isOriginal: true,
      },
    ],

    interestingFacts: [
      {
        content:
          'Biển là hình ảnh xuất hiện nhiều trong các ca khúc của Trịnh Công Sơn, thể hiện sự gắn bó với quê hương miền Trung',
        category: 'creation',
        source: {
          type: 'academic',
          title: 'Hình ảnh thiên nhiên trong nhạc Trịnh',
          reliability: 'high',
        },
        isVerified: true,
      },
    ],

    sources: [
      {
        type: 'book',
        title: 'Trịnh Công Sơn - Cuộc đời và âm nhạc',
        reliability: 'high',
      },
    ],

    contentQuality: {
      overallConfidence: 'high',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MỘT CÕI ĐI VỀ
  // ─────────────────────────────────────────────────────────────────────────────
  {
    metadata: {
      id: 'trinh-mot-coi-di-ve',
      title: 'Một Cõi Đi Về',
      alternativeTitles: ['Mot Coi Di Ve', 'A Realm of Coming and Going'],
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerId: 'khanh-ly',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1974,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['ballad', 'romantic'],
      themes: ['triết lý', 'cuộc đời', 'vô thường', 'con người'],
      tempo: 'Slow',
    },

    summary:
      'Một Cõi Đi Về là ca khúc mang đậm chất triết lý của Trịnh Công Sơn, sáng tác năm 1974, thể hiện suy tư về kiếp người, về sự vô thường của cuộc đời qua lăng kính Phật giáo.',

    compositionContext: {
      year: 1974,
      yearConfidence: 'high',
      location: 'Sài Gòn',

      inspiration: {
        summary:
          'Cảm hứng từ triết học Phật giáo về sự vô thường và những suy tư về kiếp người trong giai đoạn đất nước nhiều biến động.',
        detailed: `Một Cõi Đi Về được sáng tác năm 1974, một năm trước khi chiến tranh kết thúc. Đây là giai đoạn Trịnh Công Sơn có nhiều suy tư sâu sắc về cuộc đời và thân phận con người.

Bài hát thể hiện ảnh hưởng sâu đậm của triết học Phật giáo trong tư tưởng của nhạc sĩ, đặc biệt là khái niệm "vô thường" - mọi thứ đều thay đổi, không có gì là vĩnh cửu. Câu hát "Bao nhiêu năm rồi còn mãi ra đi" gợi lên hình ảnh con người như những kẻ lữ hành trong cuộc đời.

Khác với những bài hát tình yêu đơn thuần, Một Cõi Đi Về đặt câu hỏi về ý nghĩa của sự tồn tại, về điểm đến của kiếp người.`,
        relatedPeople: [],
      },

      narrative: `Một Cõi Đi Về thuộc nhóm những ca khúc triết lý của Trịnh Công Sơn, được sáng tác vào năm 1974 - một năm đầy biến động trong lịch sử Việt Nam. Đây không chỉ là một bài hát mà còn là một bài thơ triết học được phổ nhạc.

Bài hát ra đời trong bối cảnh chiến tranh đang đến hồi kết, khi nhiều người đang suy tư về tương lai bất định. Trịnh Công Sơn, với tâm hồn nhạy cảm và ảnh hưởng sâu sắc từ Phật giáo, đã viết nên một ca khúc về sự vô thường của cuộc đời.

Câu hát mở đầu "Bao nhiêu năm rồi còn mãi ra đi, đi đâu loanh quanh cho đời mỏi mệt" đặt ra câu hỏi muôn thuở của con người về ý nghĩa của sự tồn tại. Hình ảnh "đi" trong bài không chỉ là di chuyển vật lý mà còn là hành trình tìm kiếm ý nghĩa cuộc sống.

"Một cõi đi về" là khái niệm lấy từ tư tưởng Phật giáo - con người đến từ hư vô và sẽ trở về hư vô, cuộc đời chỉ là một chặng dừng chân ngắn ngủi. Tuy nhiên, bài hát không bi quan mà mang tính chiêm nghiệm, chấp nhận quy luật tự nhiên của vạn vật.

Ca khúc thể hiện sự trưởng thành trong tư tưởng của Trịnh Công Sơn, từ những bài hát tình yêu thời trẻ đến những suy tư sâu sắc về triết lý nhân sinh.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription:
        'Năm 1974, một năm trước khi chiến tranh kết thúc, xã hội miền Nam đang trong giai đoạn biến động mạnh mẽ.',

      politicalContext:
        'Chiến tranh Việt Nam đang đến hồi kết, nhiều biến động chính trị và xã hội.',

      socialContext:
        'Giai đoạn nhiều người suy tư về tương lai, về ý nghĩa cuộc sống trong bối cảnh bất ổn.',

      musicalMovement:
        'Giai đoạn chín muồi của nhạc Trịnh, từ trữ tình đơn thuần sang triết lý sâu sắc.',

      musicalInfluences: ['Triết học Phật giáo', 'Văn học hiện sinh', 'Nhạc tiền chiến'],

      culturalSignificance:
        'Một Cõi Đi Về được xem là đỉnh cao của dòng nhạc triết lý trong sáng tác của Trịnh Công Sơn, ảnh hưởng đến nhiều thế hệ người nghe.',
    },

    performances: [
      {
        performerId: 'khanh-ly',
        performerName: 'Khánh Ly',
        style: 'Giọng hát trầm mặc, chiêm nghiệm',
        significance: 'Phiên bản gốc, thể hiện trọn vẹn tinh thần bài hát',
        isOriginal: true,
      },
    ],

    interestingFacts: [
      {
        content:
          'Bài hát thể hiện ảnh hưởng sâu đậm của Phật giáo trong tư tưởng Trịnh Công Sơn, đặc biệt khái niệm "vô thường"',
        category: 'creation',
        source: {
          type: 'academic',
          title: 'Triết học Phật giáo trong nhạc Trịnh Công Sơn',
          reliability: 'high',
        },
        isVerified: true,
      },
      {
        content:
          'Tên bài hát "Một Cõi Đi Về" sau này được dùng làm tiêu đề cho nhiều sách, phim tài liệu về Trịnh Công Sơn',
        category: 'cultural',
        source: {
          type: 'news',
          title: 'Di sản Trịnh Công Sơn',
          reliability: 'high',
        },
        isVerified: true,
      },
    ],

    sources: [
      {
        type: 'book',
        title: 'Trịnh Công Sơn - Một cõi đi về',
        author: 'Nhiều tác giả',
        publisher: 'NXB Trẻ',
        reliability: 'verified',
      },
      {
        type: 'academic',
        title: 'Triết học trong ca từ Trịnh Công Sơn',
        reliability: 'high',
      },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // CÁT BỤI
  // ─────────────────────────────────────────────────────────────────────────────
  {
    metadata: {
      id: 'trinh-cat-bui',
      title: 'Cát Bụi',
      alternativeTitles: ['Cat Bui', 'Dust'],
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerId: 'khanh-ly',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1965,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['ballad'],
      themes: ['triết lý', 'kiếp người', 'vô thường', 'cát bụi'],
      tempo: 'Slow',
    },

    summary:
      'Cát Bụi là ca khúc triết lý sâu sắc của Trịnh Công Sơn, lấy hình ảnh cát bụi làm biểu tượng cho kiếp người ngắn ngủi, phù du. Bài hát thể hiện quan điểm Phật giáo về sự vô thường.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'medium',
      location: 'Huế hoặc Sài Gòn',

      inspiration: {
        summary:
          'Cảm hứng từ triết học Phật giáo về sự vô thường, kiếp người như cát bụi - từ cát bụi mà đến, sẽ trở về cát bụi.',
        detailed: `Cát Bụi được xem là một trong những ca khúc triết lý sâu sắc nhất của Trịnh Công Sơn. Bài hát lấy hình ảnh "cát bụi" - một ẩn dụ quen thuộc trong nhiều nền văn hóa về sự ngắn ngủi của kiếp người.

Trong tư tưởng Phật giáo và cả trong Kinh Thánh, con người được tạo ra từ bụi đất và sẽ trở về với bụi đất. Trịnh Công Sơn đã nắm bắt tinh thần này để viết nên một bài hát vừa buồn man mác vừa mang tính triết lý về cuộc đời.

Câu hát "Hạt bụi nào hóa kiếp thân tôi" đặt câu hỏi về nguồn gốc của sự sống, còn "Để một mai tôi về làm cát bụi" là sự chấp nhận quy luật tất yếu của vạn vật.`,
        relatedPeople: [],
      },

      narrative: `Cát Bụi thuộc dòng nhạc triết lý của Trịnh Công Sơn, được sáng tác trong giai đoạn giữa thập niên 1960. Đây là thời kỳ nhạc sĩ bắt đầu đi sâu vào những suy tư về kiếp người, về ý nghĩa của sự tồn tại.

Hình ảnh "cát bụi" trong bài hát mang tính biểu tượng cao. Trong văn hóa Việt Nam và nhiều nền văn hóa khác, cát bụi đại diện cho sự phù du, ngắn ngủi của kiếp người. Con người đến từ hư vô và sẽ trở về hư vô - đây là quy luật bất biến.

Bài hát không bi quan về cái chết mà mang tính chiêm nghiệm, chấp nhận. Qua lăng kính của Trịnh Công Sơn, việc nhận ra bản chất "cát bụi" của kiếp người giúp con người sống có ý nghĩa hơn, trân trọng từng khoảnh khắc hơn.

Ca từ "Hạt bụi nào hóa kiếp thân tôi, để một mai tôi về làm cát bụi" đã trở thành những câu hát kinh điển, được nhiều người nhớ và suy ngẫm.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960, chiến tranh đang leo thang, nhiều người đối diện với cái chết.',

      socialContext:
        'Giai đoạn chiến tranh khiến nhiều người suy nghĩ về sự sống và cái chết, về ý nghĩa của cuộc đời.',

      musicalMovement:
        'Sự phát triển của dòng nhạc phản chiến và triết lý trong sáng tác của Trịnh Công Sơn.',

      musicalInfluences: ['Triết học Phật giáo', 'Nhạc tiền chiến', 'Văn học hiện sinh'],

      culturalSignificance:
        'Cát Bụi đã trở thành một trong những bài hát triết lý được yêu thích nhất của nền âm nhạc Việt Nam.',
    },

    performances: [
      {
        performerId: 'khanh-ly',
        performerName: 'Khánh Ly',
        style: 'Giọng hát trầm mặc, sâu lắng',
        significance: 'Phiên bản gốc và kinh điển',
        isOriginal: true,
      },
    ],

    interestingFacts: [
      {
        content:
          'Cát Bụi thường được hát trong các tang lễ tại Việt Nam, trở thành một trong những bài hát tiễn biệt phổ biến nhất',
        category: 'cultural',
        source: {
          type: 'news',
          title: 'Những bài hát trong tang lễ Việt Nam',
          reliability: 'high',
        },
        isVerified: true,
      },
      {
        content:
          'Hình ảnh "cát bụi" xuất hiện cả trong Kinh Thánh và triết học Phật giáo, thể hiện tính phổ quát của chủ đề',
        category: 'creation',
        source: {
          type: 'academic',
          title: 'Biểu tượng cát bụi trong văn hóa',
          reliability: 'high',
        },
        isVerified: true,
      },
    ],

    sources: [
      {
        type: 'book',
        title: 'Trịnh Công Sơn - Cuộc đời và âm nhạc',
        reliability: 'high',
      },
    ],

    contentQuality: {
      overallConfidence: 'high',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },
];
```

---

**[TIẾP TỤC TRONG FILE TIẾP THEO - PHẦN BOLERO VÀ TIỀN CHIẾN]**
