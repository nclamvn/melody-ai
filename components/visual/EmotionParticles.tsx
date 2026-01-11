// ═══════════════════════════════════════════════════════════════════════════════
//                    MUSIC NOTE PARTICLES COMPONENT
//                    Floating music notes with depth simulation
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
//                    MUSIC NOTE SVG PATHS
// ═══════════════════════════════════════════════════════════════════════════════

const MUSIC_NOTES = [
  // Single note (quaver)
  'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
  // Double note (beamed quavers)
  'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm8 0v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V3h-6z',
  // Treble clef simplified
  'M12 2C8.69 2 6 4.69 6 8c0 2.97 2.16 5.43 5 5.91V22h2v-8.09c2.84-.48 5-2.94 5-5.91 0-3.31-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z',
  // Simple note
  'M12 5v8.55c-.94-.54-2.1-.75-3.33-.32-1.34.48-2.37 1.67-2.61 3.07-.46 2.74 1.86 5.08 4.59 4.65 1.96-.31 3.35-2.11 3.35-4.1V9h4V5h-6z',
];

// ═══════════════════════════════════════════════════════════════════════════════
//                    COLOR PALETTES
// ═══════════════════════════════════════════════════════════════════════════════

type EmotionType = 'sad' | 'happy' | 'romantic' | 'peaceful' | 'energetic' | 'nostalgic';

const COLOR_PALETTES: Record<EmotionType, string[]> = {
  sad: ['#6B8DD6', '#8E7CC3', '#5C6BC0', '#7986CB', '#9FA8DA', '#4FC3F7'],
  happy: ['#FFD54F', '#FF8A65', '#FFB74D', '#FFF176', '#FFAB40', '#FF7043'],
  romantic: ['#F48FB1', '#CE93D8', '#F06292', '#BA68C8', '#FF80AB', '#EA80FC'],
  peaceful: ['#81C784', '#4DB6AC', '#80CBC4', '#A5D6A7', '#80DEEA', '#B2DFDB'],
  energetic: ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF'],
  nostalgic: ['#BCAAA4', '#A1887F', '#D7CCC8', '#90A4AE', '#B0BEC5', '#8D6E63'],
};

// ═══════════════════════════════════════════════════════════════════════════════
//                    PARTICLE INTERFACE
// ═══════════════════════════════════════════════════════════════════════════════

interface Particle {
  id: number;
  x: number;
  y: number;
  noteIndex: number;
  color: string;
  size: number;
  depth: number; // 0-1, affects opacity, blur, speed
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  life: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    MUSIC NOTE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface MusicNoteProps {
  noteIndex: number;
  color: string;
  size: number;
  depth: number;
  rotation: number;
  opacity: number;
}

function MusicNote({ noteIndex, color, size, depth, rotation, opacity }: MusicNoteProps) {
  const blur = (1 - depth) * 2; // Far notes are blurrier
  const finalOpacity = opacity * (0.3 + depth * 0.7); // Far notes are more transparent

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{
        transform: `rotate(${rotation}deg)`,
        filter: blur > 0.5 ? `blur(${blur}px)` : 'none',
        opacity: finalOpacity,
      }}
    >
      <path
        d={MUSIC_NOTES[noteIndex % MUSIC_NOTES.length]}
        fill={color}
        style={{
          filter: `drop-shadow(0 0 ${4 * depth}px ${color})`,
        }}
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    EMOTION PARTICLES COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface EmotionParticlesProps {
  emotion: EmotionType;
  isActive?: boolean;
  intensity?: number; // 0-1, affects density
  className?: string;
}

export function EmotionParticles({
  emotion,
  isActive = true,
  intensity = 0.7,
  className = '',
}: EmotionParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>();
  const particleIdRef = useRef(0);

  const colors = COLOR_PALETTES[emotion];

  const createParticle = useCallback((): Particle => {
    const container = containerRef.current;
    const width = container?.clientWidth || 400;
    const height = container?.clientHeight || 400;

    // Depth affects size and speed (0 = far/small, 1 = close/large)
    const depth = Math.random();
    const baseSize = 12 + depth * 20; // 12-32px based on depth
    const speed = 0.5 + depth * 1.5; // Closer = faster

    return {
      id: particleIdRef.current++,
      x: Math.random() * width,
      y: -30,
      noteIndex: Math.floor(Math.random() * MUSIC_NOTES.length),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: baseSize,
      depth,
      speedX: (Math.random() - 0.5) * 2 * speed,
      speedY: speed * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 3,
      opacity: 0.4 + depth * 0.6,
      life: 1,
    };
  }, [colors]);

  // Spawn particles
  useEffect(() => {
    if (!isActive) return;

    const density = Math.floor(12 * intensity);
    const spawnInterval = setInterval(() => {
      setParticles(prev => {
        if (prev.length >= density * 3) return prev;
        return [...prev, createParticle()];
      });
    }, 400 / intensity);

    return () => clearInterval(spawnInterval);
  }, [isActive, intensity, createParticle]);

  // Animate particles
  useEffect(() => {
    if (!isActive) return;

    const animate = () => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.speedX,
            y: p.y + p.speedY,
            rotation: p.rotation + p.rotationSpeed,
            speedX: p.speedX + (Math.random() - 0.5) * 0.1, // Gentle drift
            life: p.life - 0.003,
          }))
          .filter(p => p.life > 0 && p.y < (containerRef.current?.clientHeight || 600) + 50)
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 5 }}
    >
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
              zIndex: Math.floor(particle.depth * 10), // Depth layering
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <MusicNote
              noteIndex={particle.noteIndex}
              color={particle.color}
              size={particle.size}
              depth={particle.depth}
              rotation={particle.rotation}
              opacity={particle.opacity * particle.life}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    BURST EFFECT (for beat drops)
// ═══════════════════════════════════════════════════════════════════════════════

interface BurstEffectProps {
  trigger: boolean;
  color?: string;
  x?: number;
  y?: number;
}

export function BurstEffect({ trigger, color = '#ffffff', x = 50, y = 50 }: BurstEffectProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    angle: number;
    distance: number;
    size: number;
    noteIndex: number;
  }>>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        angle: (i / 12) * 360,
        distance: 50 + Math.random() * 100,
        size: 16 + Math.random() * 16,
        noteIndex: Math.floor(Math.random() * MUSIC_NOTES.length),
      }));
      setParticles(newParticles);

      setTimeout(() => setParticles([]), 1000);
    }
  }, [trigger]);

  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute"
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 0.5,
            }}
            animate={{
              x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
              y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
              opacity: 0,
              scale: 1.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <svg width={p.size} height={p.size} viewBox="0 0 24 24">
              <path
                d={MUSIC_NOTES[p.noteIndex]}
                fill={color}
                style={{ filter: `drop-shadow(0 0 8px ${color})` }}
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    HELPER: Detect emotion from song metadata
// ═══════════════════════════════════════════════════════════════════════════════

export function detectEmotionFromSong(song: {
  genre?: string;
  mood?: string;
  tempo?: 'slow' | 'medium' | 'fast';
  era?: string;
}): EmotionType {
  const { genre = '', mood = '', tempo, era = '' } = song;
  const text = `${genre} ${mood} ${era}`.toLowerCase();

  // Check mood keywords
  if (text.includes('buồn') || text.includes('sad') || text.includes('đau')) {
    return 'sad';
  }
  if (text.includes('vui') || text.includes('happy') || text.includes('dance')) {
    return 'happy';
  }
  if (text.includes('tình') || text.includes('yêu') || text.includes('love') || text.includes('romantic')) {
    return 'romantic';
  }
  if (text.includes('trịnh') || text.includes('sâu') || text.includes('peaceful')) {
    return 'peaceful';
  }
  if (text.includes('rock') || text.includes('rap') || text.includes('energy') || tempo === 'fast') {
    return 'energetic';
  }
  if (text.includes('xưa') || text.includes('cũ') || text.includes('tiền chiến') || text.includes('nostalg')) {
    return 'nostalgic';
  }

  // Genre-based defaults
  if (text.includes('bolero')) return 'nostalgic';
  if (text.includes('nhạc trịnh') || text.includes('nhac trinh')) return 'peaceful';
  if (text.includes('vpop') || text.includes('pop')) return 'happy';
  if (text.includes('ballad')) return 'romantic';

  return 'nostalgic'; // Default for Vietnamese music
}

export type { EmotionType };
export default EmotionParticles;
