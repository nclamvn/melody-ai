'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePlayerStore } from '@/store/playerStore';

export function useAudioPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    setCurrentTime,
    pause,
  } = usePlayerStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Demo mode: simulate playback with timer
  useEffect(() => {
    if (isPlaying && currentSong) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(usePlayerStore.getState().currentTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentSong, setCurrentTime]);

  // Auto pause when reaching end
  useEffect(() => {
    if (currentTime >= duration && duration > 0) {
      pause();
      setCurrentTime(0);
    }
  }, [currentTime, duration, pause, setCurrentTime]);

  const seek = useCallback(
    (time: number) => {
      setCurrentTime(Math.max(0, Math.min(duration, time)));
    },
    [duration, setCurrentTime]
  );

  return {
    currentTime,
    duration,
    volume,
    isPlaying,
    seek,
  };
}
