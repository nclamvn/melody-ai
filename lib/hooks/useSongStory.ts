'use client';

// ═══════════════════════════════════════════════════════════════════════════════
//                    useSongStory - Streaming Hook
//                    Progressive loading with real-time updates
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useRef } from 'react';

// Types
export interface SongMetadata {
  releaseYear?: string;
  album?: string;
  genres?: string[];
}

export interface SongStoryContent {
  story: string;
  confidence: 'verified' | 'high' | 'medium' | 'low' | 'none';
  sources: string[];
  isRaw?: boolean;
  verifiedAt?: string;
  honest?: boolean;
  metadata?: {
    composer?: string;
    lyricist?: string;
    year?: number;
    genre?: string;
    era?: string;
  };
}

export interface SourceStatus {
  name: string;
  status: 'searching' | 'found' | 'not_found' | 'rejected' | 'error';
}

export type LoadingPhase =
  | 'idle'
  | 'starting'
  | 'searching'
  | 'synthesizing'
  | 'complete'
  | 'error';

export interface SongStoryState {
  // Basic info (available immediately)
  title: string | null;
  artist: string | null;

  // Loading state
  isLoading: boolean;
  phase: LoadingPhase;
  phaseMessage: string;

  // Progressive content
  metadata: SongMetadata | null;
  sources: SourceStatus[];

  // Streaming text
  streamingText: string;
  isStreaming: boolean;

  // Final content
  content: SongStoryContent | null;

  // Metrics
  duration: number;
  error: string | null;
}

interface UseSongStoryOptions {
  autoFetch?: boolean;
  language?: 'vi' | 'en';
  onComplete?: (content: SongStoryContent) => void;
  onError?: (error: string) => void;
}

const initialState: SongStoryState = {
  title: null,
  artist: null,
  isLoading: false,
  phase: 'idle',
  phaseMessage: '',
  metadata: null,
  sources: [],
  streamingText: '',
  isStreaming: false,
  content: null,
  duration: 0,
  error: null,
};

export function useSongStory(
  songTitle: string | null,
  artistName?: string | null,
  options: UseSongStoryOptions = {}
) {
  const { autoFetch = true, language = 'vi', onComplete, onError } = options;

  const [state, setState] = useState<SongStoryState>(initialState);
  const eventSourceRef = useRef<EventSource | null>(null);
  const startTimeRef = useRef<number>(0);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  // Fetch function
  const fetchStory = useCallback(async () => {
    if (!songTitle) return;

    // Cleanup previous connection
    cleanup();

    // Reset state with basic info
    setState({
      ...initialState,
      title: songTitle,
      artist: artistName || null,
      isLoading: true,
      phase: 'starting',
      phaseMessage: 'Đang tải...',
    });

    startTimeRef.current = Date.now();

    // Build URL
    const params = new URLSearchParams({ title: songTitle });
    if (artistName) params.set('artist', artistName);
    if (language) params.set('lang', language);

    const url = `/api/song-story/stream?${params}`;

    try {
      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      // Phase updates
      eventSource.addEventListener('phase', (e) => {
        const data = JSON.parse(e.data);
        setState((prev) => ({
          ...prev,
          phase: data.phase,
          phaseMessage: data.message,
        }));
      });

      // Basic info
      eventSource.addEventListener('basic', (e) => {
        const data = JSON.parse(e.data);
        setState((prev) => ({
          ...prev,
          title: data.title,
          artist: data.artist,
        }));
      });

      // Metadata (year, album)
      eventSource.addEventListener('metadata', (e) => {
        const data = JSON.parse(e.data);
        setState((prev) => ({
          ...prev,
          metadata: {
            ...prev.metadata,
            releaseYear: data.releaseYear,
            album: data.album,
          },
        }));
      });

      // Source status updates
      eventSource.addEventListener('source', (e) => {
        const data = JSON.parse(e.data) as SourceStatus;
        setState((prev) => ({
          ...prev,
          sources: [
            ...prev.sources.filter((s) => s.name !== data.name),
            data,
          ],
        }));
      });

      // Streaming text chunks
      eventSource.addEventListener('chunk', (e) => {
        const data = JSON.parse(e.data);
        setState((prev) => ({
          ...prev,
          isStreaming: true,
          streamingText: prev.streamingText + data.text,
        }));
      });

      // Final content
      eventSource.addEventListener('content', (e) => {
        const data = JSON.parse(e.data) as SongStoryContent;
        setState((prev) => ({
          ...prev,
          content: data,
          isStreaming: false,
          // Use streaming text if available, otherwise use content story
          streamingText: prev.streamingText || data.story,
        }));
      });

      // Complete
      eventSource.addEventListener('complete', (e) => {
        const data = JSON.parse(e.data);
        setState((prev) => {
          const finalState = {
            ...prev,
            isLoading: false,
            phase: 'complete' as LoadingPhase,
            duration: data.duration || Date.now() - startTimeRef.current,
          };

          // Call onComplete callback
          if (onComplete && prev.content) {
            onComplete(prev.content);
          }

          return finalState;
        });
        eventSource.close();
      });

      // Error
      eventSource.addEventListener('error', (e) => {
        let errorMessage = 'Đã xảy ra lỗi';
        try {
          const data = JSON.parse((e as MessageEvent).data);
          errorMessage = data.message || errorMessage;
        } catch {
          // Ignore parse error
        }

        setState((prev) => ({
          ...prev,
          isLoading: false,
          phase: 'error',
          error: errorMessage,
        }));

        if (onError) onError(errorMessage);
        eventSource.close();
      });

      // Connection error
      eventSource.onerror = () => {
        if (eventSource.readyState === EventSource.CLOSED) return;

        setState((prev) => ({
          ...prev,
          isLoading: false,
          phase: 'error',
          error: 'Mất kết nối',
        }));

        if (onError) onError('Mất kết nối');
        eventSource.close();
      };

    } catch {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        phase: 'error',
        error: 'Không thể kết nối',
      }));

      if (onError) onError('Không thể kết nối');
    }
  }, [songTitle, artistName, language, cleanup, onComplete, onError]);

  // Auto-fetch when song changes
  useEffect(() => {
    if (autoFetch && songTitle) {
      fetchStory();
    }

    return cleanup;
  }, [songTitle, artistName, autoFetch, fetchStory, cleanup]);

  // Computed values
  const displayText = state.streamingText || state.content?.story || '';
  const hasContent = !!state.content || state.streamingText.length > 0;
  const isReady = state.phase === 'complete' && hasContent;

  return {
    ...state,

    // Computed
    displayText,
    hasContent,
    isReady,

    // Actions
    refetch: fetchStory,
    reset: () => setState(initialState),
  };
}

export default useSongStory;
