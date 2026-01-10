'use client';

import { useMemo } from 'react';
import { LyricLine } from '@/types';

export function useLyricsSync(lyrics: LyricLine[], currentTime: number) {
  const activeIndex = useMemo(() => {
    if (!lyrics.length) return -1;

    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        return i;
      }
    }

    return -1;
  }, [lyrics, currentTime]);

  const activeLine = activeIndex >= 0 ? lyrics[activeIndex] : null;

  const nextLine =
    activeIndex >= 0 && activeIndex < lyrics.length - 1
      ? lyrics[activeIndex + 1]
      : null;

  const previousLine = activeIndex > 0 ? lyrics[activeIndex - 1] : null;

  return {
    activeIndex,
    activeLine,
    nextLine,
    previousLine,
  };
}
