import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function normalizeVietnamese(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function calculateMatchScore(query: string, text: string): number {
  const normalizedQuery = normalizeVietnamese(query);
  const normalizedText = normalizeVietnamese(text);

  // Exact match
  if (normalizedText.includes(normalizedQuery)) {
    return 95 + Math.floor(Math.random() * 5);
  }

  // Word matching
  const queryWords = normalizedQuery.split(/\s+/);
  const textWords = normalizedText.split(/\s+/);

  let matchedWords = 0;
  for (const qWord of queryWords) {
    if (textWords.some((tWord) => tWord.includes(qWord) || qWord.includes(tWord))) {
      matchedWords++;
    }
  }

  if (matchedWords > 0) {
    const score = Math.floor((matchedWords / queryWords.length) * 80) + 10;
    return Math.min(94, score + Math.floor(Math.random() * 10));
  }

  return 0;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomItems<T>(array: T[], count: number): T[] {
  return shuffleArray(array).slice(0, count);
}
