// ═══════════════════════════════════════════════════════════════════════════════
//                    VISUAL EFFECTS — INDEX
//                    Export all visual effect components
// ═══════════════════════════════════════════════════════════════════════════════

// Mood Aura - Glowing ring around album art
export { MoodAura, detectMoodFromGenre } from './MoodAura';
export type { default as MoodAuraDefault } from './MoodAura';

// Emotion Particles - Animated particles based on song emotion
export { EmotionParticles, BurstEffect, detectEmotionFromSong } from './EmotionParticles';
export type { default as EmotionParticlesDefault } from './EmotionParticles';

// Animated Gradient - Dynamic background gradients
export {
  AnimatedGradient,
  GradientTransition,
  MeshGradient,
  getGradientMoodFromGenre
} from './AnimatedGradient';
export type { default as AnimatedGradientDefault } from './AnimatedGradient';

// Story Scroll Cinema - Cinematic scroll-based story presentation
export { StoryScrollCinema } from './StoryScrollCinema';
export type { default as StoryScrollCinemaDefault } from './StoryScrollCinema';
