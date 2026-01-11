// Album Story Types - Dynamic Info Photo Album

import { VietnameseGenre, ConfidenceLevel, SourceReference } from "@/lib/vietnameseMusic";

// Re-export for convenience
export type { SourceReference };

export interface AlbumStoryData {
  songId: string;
  title: string;
  artist: string;
  coverImage: string;
  pages: AlbumStoryPage[];
  // New fields for content quality
  confidence?: ConfidenceLevel;
  detectedGenre?: VietnameseGenre;
}

export interface AlbumStoryPage {
  id: string;
  type: PageType;
  title: string;
  content: PageContent;
}

export type PageType =
  | 'cover'
  | 'lyrics'
  | 'composition'
  | 'author'
  | 'covers'
  | 'stories';

// Page-specific content types
export interface CoverPageContent {
  albumArt: string;
  title: string;
  artist: string;
  album?: string;
  year?: string;
  genre?: string;
  duration?: string;
  sources?: SourceReference[];
}

export interface LyricsPageContent {
  lines: LyricLineWithTranslation[];
  hasTranslation: boolean;
}

export interface LyricLineWithTranslation {
  time: number;
  text: string;
  translation?: string;
  emotion?: 'happy' | 'sad' | 'romantic' | 'energetic' | 'calm';
}

export interface CompositionPageContent {
  story: string;
  inspiration?: string;
  createdAt?: string;
  location?: string;
  funFacts?: string[];
  confidence?: ConfidenceLevel;
  sources?: SourceReference[];
}

export interface AuthorPageContent {
  name: string;
  image?: string;
  bio: string;
  birthYear?: string;
  nationality?: string;
  genres?: string[];
  famousSongs?: string[];
  awards?: string[];
  timeline?: TimelineEvent[];
  confidence?: ConfidenceLevel;
  sources?: SourceReference[];
}

export interface TimelineEvent {
  year: string;
  event: string;
}

export interface CoverVersionsPageContent {
  originalArtist: string;
  versions: CoverVersion[];
}

export interface CoverVersion {
  artist: string;
  year?: string;
  platform?: string;
  url?: string;
  rating?: number;
  views?: string;
  description?: string;
}

export interface StoriesPageContent {
  stories: SurroundingStory[];
  sources?: SourceReference[];
}

export interface SurroundingStory {
  title: string;
  content: string;
  type: 'anecdote' | 'cultural' | 'meme' | 'trivia';
  source?: string;
  verified?: boolean;
}

export type PageContent =
  | CoverPageContent
  | LyricsPageContent
  | CompositionPageContent
  | AuthorPageContent
  | CoverVersionsPageContent
  | StoriesPageContent;

// Animation types
export interface FlipState {
  currentPage: number;
  isFlipping: boolean;
  direction: 'next' | 'prev';
}

export interface CardFlipProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  isFlipped: boolean;
  onFlipComplete?: () => void;
}
