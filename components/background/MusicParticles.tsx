'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';

interface MeteorNote {
  id: number;
  symbol: string;
  startX: number;
  startY: number;
  angle: number; // Direction in degrees
  speed: number; // Duration in seconds
  size: number;
  opacity: number;
  colorIndex: number;
  trail: boolean;
}

interface MusicParticlesProps {
  count?: number;
  syncWithBeat?: boolean;
}

const MUSIC_SYMBOLS = ['♪', '♫', '♩', '♬', '𝄞', '🎵', '🎶'];

const DARK_COLORS = [
  '#A78BFA', // purple
  '#F472B6', // pink
  '#FCD34D', // yellow
  '#60A5FA', // blue
  '#34D399', // green
  '#FB923C', // orange
];

const LIGHT_COLORS = [
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#EAB308', // yellow
  '#3B82F6', // blue
  '#10B981', // green
  '#F97316', // orange
];

export default function MusicParticles({ count = 15, syncWithBeat = false }: MusicParticlesProps) {
  const { theme } = useTheme();
  const [meteors, setMeteors] = useState<MeteorNote[]>([]);
  const [mounted, setMounted] = useState(false);

  const colors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  // Generate a new meteor
  const createMeteor = useCallback((id: number): MeteorNote => {
    // Random direction: 0=top-right, 1=top-left, 2=bottom-right, 3=bottom-left, 4=horizontal
    const direction = Math.floor(Math.random() * 5);

    let startX: number, startY: number, angle: number;

    switch (direction) {
      case 0: // From top-left to bottom-right
        startX = Math.random() * 50 - 10;
        startY = Math.random() * 30 - 10;
        angle = 30 + Math.random() * 30; // 30-60 degrees
        break;
      case 1: // From top-right to bottom-left
        startX = 60 + Math.random() * 50;
        startY = Math.random() * 30 - 10;
        angle = 120 + Math.random() * 30; // 120-150 degrees
        break;
      case 2: // From left to right (horizontal)
        startX = -10;
        startY = 20 + Math.random() * 60;
        angle = -10 + Math.random() * 20; // -10 to 10 degrees
        break;
      case 3: // From right to left (horizontal)
        startX = 110;
        startY = 20 + Math.random() * 60;
        angle = 170 + Math.random() * 20; // 170-190 degrees
        break;
      default: // Diagonal from corners
        startX = Math.random() > 0.5 ? -5 : 105;
        startY = Math.random() * 50;
        angle = startX < 0 ? (20 + Math.random() * 40) : (140 + Math.random() * 40);
    }

    return {
      id,
      symbol: MUSIC_SYMBOLS[Math.floor(Math.random() * MUSIC_SYMBOLS.length)],
      startX,
      startY,
      angle,
      speed: syncWithBeat ? 2 + Math.random() * 1.5 : 4 + Math.random() * 3,
      size: 14 + Math.random() * 20,
      opacity: 0.4 + Math.random() * 0.5,
      colorIndex: Math.floor(Math.random() * colors.length),
      trail: Math.random() > 0.3, // 70% have trails
    };
  }, [syncWithBeat, colors.length]);

  // Initialize and continuously spawn meteors
  useEffect(() => {
    setMounted(true);

    // Initial batch
    const initial = Array.from({ length: count }, (_, i) => createMeteor(i));
    setMeteors(initial);

    let nextId = count;

    // Spawn new meteors periodically
    const spawnInterval = setInterval(() => {
      setMeteors(prev => {
        // Remove old meteors and add new ones
        const maxMeteors = syncWithBeat ? count * 2 : count;
        const newMeteors = [...prev];

        // Add 1-3 new meteors
        const toAdd = syncWithBeat ? 2 + Math.floor(Math.random() * 3) : 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < toAdd; i++) {
          newMeteors.push(createMeteor(nextId++));
        }

        // Keep only recent meteors
        return newMeteors.slice(-maxMeteors);
      });
    }, syncWithBeat ? 600 : 1200);

    return () => clearInterval(spawnInterval);
  }, [count, createMeteor, syncWithBeat]);

  if (!mounted) return null;

  // Calculate end position based on angle and travel distance
  const getEndPosition = (meteor: MeteorNote) => {
    const distance = 150; // Travel distance in viewport %
    const radians = (meteor.angle * Math.PI) / 180;
    return {
      x: meteor.startX + Math.cos(radians) * distance,
      y: meteor.startY + Math.sin(radians) * distance,
    };
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <AnimatePresence>
        {meteors.map((meteor) => {
          const end = getEndPosition(meteor);

          return (
            <motion.div
              key={meteor.id}
              className="absolute"
              initial={{
                left: `${meteor.startX}%`,
                top: `${meteor.startY}%`,
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                left: `${end.x}%`,
                top: `${end.y}%`,
                opacity: [0, meteor.opacity, meteor.opacity, 0],
                scale: [0.5, 1, 1, 0.3],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: meteor.speed,
                ease: 'linear',
              }}
              style={{
                fontSize: `${meteor.size}px`,
                color: colors[meteor.colorIndex],
                textShadow: meteor.trail
                  ? `0 0 10px ${colors[meteor.colorIndex]}, 0 0 20px ${colors[meteor.colorIndex]}, 0 0 30px ${colors[meteor.colorIndex]}40`
                  : `0 0 8px ${colors[meteor.colorIndex]}`,
                filter: `drop-shadow(0 0 ${meteor.size / 3}px ${colors[meteor.colorIndex]})`,
              }}
            >
              {/* Trail effect */}
              {meteor.trail && (
                <motion.span
                  className="absolute"
                  style={{
                    left: -meteor.size * 2,
                    top: '50%',
                    transform: `translateY(-50%) rotate(${-meteor.angle}deg)`,
                    width: meteor.size * 3,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${colors[meteor.colorIndex]}80)`,
                    borderRadius: '50%',
                    filter: 'blur(2px)',
                  }}
                />
              )}
              {meteor.symbol}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Ambient floating notes (slower, background) */}
      {mounted && Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute text-text-muted/20"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${20 + (i % 3) * 30}%`,
            fontSize: '24px',
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          {MUSIC_SYMBOLS[i % MUSIC_SYMBOLS.length]}
        </motion.div>
      ))}
    </div>
  );
}
