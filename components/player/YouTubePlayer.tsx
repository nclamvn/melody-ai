'use client';

import { useEffect, useRef, useState } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  onReady?: () => void;
  onStateChange?: (state: number) => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  isPlaying?: boolean;
  volume?: number;
  seekTo?: number;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function YouTubePlayer({
  videoId,
  onReady,
  onStateChange,
  onTimeUpdate,
  isPlaying,
  volume = 80,
  seekTo,
}: YouTubePlayerProps) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAPIReady, setIsAPIReady] = useState(false);
  const timeUpdateInterval = useRef<NodeJS.Timeout | null>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsAPIReady(true);
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setIsAPIReady(true);
    };

    return () => {
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
      }
    };
  }, []);

  // Initialize player when API is ready
  useEffect(() => {
    if (!isAPIReady || !containerRef.current) return;

    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId: videoId,
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
      events: {
        onReady: (event: any) => {
          // Volume is 0-1, YouTube expects 0-100
          event.target.setVolume(volume * 100);
          event.target.unMute(); // Ensure not muted
          onReady?.();

          // Start time update interval
          timeUpdateInterval.current = setInterval(() => {
            if (playerRef.current && playerRef.current.getCurrentTime) {
              const currentTime = playerRef.current.getCurrentTime() || 0;
              const duration = playerRef.current.getDuration() || 0;
              onTimeUpdate?.(currentTime, duration);
            }
          }, 500);
        },
        onStateChange: (event: any) => {
          onStateChange?.(event.data);
        },
      },
    });

    return () => {
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
      }
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [isAPIReady, videoId]);

  // Handle play/pause
  useEffect(() => {
    if (!playerRef.current || !playerRef.current.playVideo) return;

    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  // Handle volume change
  useEffect(() => {
    if (!playerRef.current || !playerRef.current.setVolume) return;
    playerRef.current.setVolume(volume * 100);
  }, [volume]);

  // Handle seek
  useEffect(() => {
    if (!playerRef.current || !playerRef.current.seekTo || seekTo === undefined) return;
    playerRef.current.seekTo(seekTo, true);
  }, [seekTo]);

  // Use absolute positioning off-screen instead of display:none
  // Some browsers block audio on hidden iframes
  return (
    <div
      ref={containerRef}
      className="absolute -left-[9999px] -top-[9999px] w-0 h-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

// YouTube Player States
export const YT_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};
