import { create } from 'zustand';
import { PlayerStore, Song } from '@/types';

export const usePlayerStore = create<PlayerStore>((set) => ({
  // State
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  isKaraokeMode: true,

  // Actions
  setSong: (song: Song) =>
    set({
      currentSong: song,
      duration: song.duration,
      currentTime: 0,
      isPlaying: false,
    }),

  play: () => set({ isPlaying: true }),

  pause: () => set({ isPlaying: false }),

  toggle: () => set((state) => ({ isPlaying: !state.isPlaying })),

  seek: (time: number) => set({ currentTime: time }),

  setVolume: (volume: number) => set({ volume }),

  setCurrentTime: (time: number) => set({ currentTime: time }),

  toggleKaraokeMode: () =>
    set((state) => ({ isKaraokeMode: !state.isKaraokeMode })),

  reset: () =>
    set({
      currentSong: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    }),
}));
