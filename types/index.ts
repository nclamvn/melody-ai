export interface LyricLine {
  time: number;
  text: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number;
  matchScore: number;
  snippet: string;
  lyrics: LyricLine[];
  audioUrl: string | null;
  youtubeId?: string;
  youtubeTitle?: string;
  viewCount?: string;
}

export interface SearchResult {
  success: boolean;
  results: Song[];
  aiMessage?: string;
}

export interface LyricsResult {
  success: boolean;
  lyrics: LyricLine[];
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isKaraokeMode: boolean;
}

export interface PlayerActions {
  setSong: (song: Song) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  toggleKaraokeMode: () => void;
  reset: () => void;
}

export type PlayerStore = PlayerState & PlayerActions;
