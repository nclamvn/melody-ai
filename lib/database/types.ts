// ═══════════════════════════════════════════════════════════════════════════════
//                    SONG DATABASE TYPES — COMMERCIAL GRADE
//                         Verified Content Structure
// ═══════════════════════════════════════════════════════════════════════════════

// Confidence levels for content accuracy
export type ConfidenceLevel = 'verified' | 'high' | 'medium' | 'low' | 'unknown';

// Vietnamese music eras
export type MusicEra =
  | 'prewar'           // Tiền chiến (trước 1954)
  | 'southern_golden'  // Thời vàng son nhạc miền Nam (1954-1975)
  | 'revolutionary'    // Nhạc cách mạng / Nhạc đỏ (1945-1975+)
  | 'post_reunification' // Sau 1975
  | 'renovation'       // Đổi mới (1986+)
  | 'modern'           // Hiện đại (2000+)
  | 'contemporary';    // Đương đại (2015+)

// Source reference type
export interface SourceReference {
  type: 'book' | 'interview' | 'academic' | 'news' | 'documentary' | 'official' | 'wikipedia' | 'archive' | 'memoir';
  title: string;
  author?: string;
  publisher?: string;
  year?: number;
  url?: string;
  accessDate?: string;
  reliability: 'verified' | 'high' | 'medium' | 'low';
  notes?: string;
}

// Person involved in song creation
export interface RelatedPerson {
  name: string;
  realName?: string;
  birthYear?: number;
  deathYear?: number;
  role?: 'lyricist' | 'composer' | 'arranger' | 'performer' | 'producer' | 'muse' | 'other';
  relationship?: string;
  description?: string;
  isConfirmed?: boolean;
  verificationStatus?: 'verified' | 'probable' | 'uncertain';
  source?: SourceReference;
}

// Timeline event
export interface TimelineEvent {
  year: number | string;
  event: string;
  significance?: string;
  source?: SourceReference;
}

// Interesting fact about the song
export interface InterestingFact {
  content: string;
  category: 'creation' | 'cultural' | 'trivia' | 'controversy' | 'legacy';
  source?: SourceReference;
  isVerified: boolean;
}

// Performance/cover version info
export interface PerformanceInfo {
  performerId: string;
  performerName: string;
  year?: number;
  style?: string;
  significance?: string;
  reception?: string;
  isOriginal: boolean;
  url?: string;
}

// Historical context
export interface HistoricalContext {
  era: MusicEra;
  eraDescription: string;
  politicalContext?: string;
  socialContext?: string;
  musicalMovement?: string;
  musicalInfluences?: string[];
  culturalSignificance?: string;
  culturalImpact?: string;
  relatedEvents?: Array<{
    event: string;
    year: number;
    relevance: string;
  }>;
}

// Composition context - the story behind creation
export interface CompositionContext {
  year?: number;
  yearConfidence: ConfidenceLevel;
  location?: string;
  inspiration?: {
    summary: string;
    detailed?: string;
    relatedPeople?: RelatedPerson[];
  };
  creationProcess?: string;
  narrative: string;
  narrativeConfidence: ConfidenceLevel;
  sources?: SourceReference[];
}

// Lyrics analysis
export interface LyricsAnalysis {
  themes: string[];
  literaryDevices?: string[];
  interpretation?: string;
  culturalReferences?: string[];
}

// Content quality metadata
export interface ContentQuality {
  overallConfidence: ConfidenceLevel;
  lastVerified?: string;
  verifiedBy?: string;
  needsReview: boolean;
  reviewNotes?: string;
}

// Main song entry structure
export interface SongEntry {
  metadata: {
    id: string;
    title: string;
    alternativeTitles?: string[];
    composerId?: string;
    composerName: string;
    lyricistId?: string;
    lyricistName?: string;
    originalPerformerId?: string;
    originalPerformerName?: string;
    releaseYear?: number;
    releaseYearConfidence: ConfidenceLevel;
    era: MusicEra;
    genres: string[];
    themes: string[];
    tempo?: string;
    key?: string;
    duration?: string;
  };

  summary: string;
  compositionContext: CompositionContext;
  historicalContext?: HistoricalContext;
  performances?: PerformanceInfo[];
  interestingFacts?: InterestingFact[];
  lyricsAnalysis?: LyricsAnalysis;
  sources: SourceReference[];
  contentQuality: ContentQuality;
  disclaimers?: string[];
}

// Artist/Composer entry
export interface ArtistEntry {
  id: string;
  name: string;
  alternativeNames?: string[];
  birthYear?: number;
  birthYearConfidence: ConfidenceLevel;
  deathYear?: number;
  birthPlace?: string;
  nationality: string;

  biography: {
    summary: string;
    detailed?: string;
    confidence: ConfidenceLevel;
  };

  career: {
    startYear?: number;
    genres: string[];
    famousSongs: string[];
    awards?: string[];
    timeline?: TimelineEvent[];
  };

  style?: {
    description: string;
    influences?: string[];
    characteristics?: string[];
  };

  sources: SourceReference[];
  contentQuality: ContentQuality;
}

// Search result type
export interface SongSearchResult {
  entry: SongEntry;
  matchScore: number;
  matchType: 'exact' | 'partial' | 'fuzzy';
}
