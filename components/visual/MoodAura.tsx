// ═══════════════════════════════════════════════════════════════════════════════
//                    MOOD AURA COMPONENT
//                    Glowing animated aura around album art based on song mood
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
//                    MOOD CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

type MoodType = 'melancholic' | 'joyful' | 'romantic' | 'contemplative' | 'powerful' | 'nostalgic';

interface MoodConfig {
  colors: string[];
  pulseSpeed: number;
  glowIntensity: number;
  pattern: 'smooth' | 'wavy' | 'sharp';
}

const MOOD_CONFIGS: Record<MoodType, MoodConfig> = {
  melancholic: {
    colors: ['#1a237e', '#4a148c', '#311b92', '#1a237e'],
    pulseSpeed: 4,
    glowIntensity: 0.6,
    pattern: 'wavy',
  },
  joyful: {
    colors: ['#ff6f00', '#ffeb3b', '#ff4081', '#ff6f00'],
    pulseSpeed: 2,
    glowIntensity: 0.8,
    pattern: 'sharp',
  },
  romantic: {
    colors: ['#c2185b', '#e91e63', '#f48fb1', '#c2185b'],
    pulseSpeed: 3,
    glowIntensity: 0.7,
    pattern: 'smooth',
  },
  contemplative: {
    colors: ['#004d40', '#00796b', '#26a69a', '#004d40'],
    pulseSpeed: 5,
    glowIntensity: 0.5,
    pattern: 'smooth',
  },
  powerful: {
    colors: ['#b71c1c', '#d32f2f', '#ff5722', '#b71c1c'],
    pulseSpeed: 1.5,
    glowIntensity: 0.9,
    pattern: 'sharp',
  },
  nostalgic: {
    colors: ['#5d4037', '#795548', '#a1887f', '#5d4037'],
    pulseSpeed: 4.5,
    glowIntensity: 0.5,
    pattern: 'wavy',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
//                    MOOD AURA COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface MoodAuraProps {
  mood: MoodType;
  children: React.ReactNode;
  size?: number;
  className?: string;
  isPlaying?: boolean;
}

export function MoodAura({ 
  mood, 
  children, 
  size = 300, 
  className = '',
  isPlaying = true 
}: MoodAuraProps) {
  const config = MOOD_CONFIGS[mood];
  
  const gradientId = useMemo(() => `mood-gradient-${Math.random().toString(36).slice(2)}`, []);
  
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Glow Layer */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${config.colors[0]}40 0%, transparent 70%)`,
          filter: `blur(${size * 0.15}px)`,
        }}
        animate={isPlaying ? {
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        } : {}}
        transition={{
          duration: config.pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Animated Gradient Ring */}
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${size} ${size}`}
        style={{ filter: `blur(${size * 0.02}px)` }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {config.colors.map((color, i) => (
              <motion.stop
                key={i}
                offset={`${(i / (config.colors.length - 1)) * 100}%`}
                stopColor={color}
                animate={isPlaying ? {
                  stopColor: [...config.colors.slice(i), ...config.colors.slice(0, i)],
                } : {}}
                transition={{
                  duration: config.pulseSpeed * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </linearGradient>
        </defs>
        
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.42}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={size * 0.08}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 ${size * 0.05}px ${config.colors[0]})`,
          }}
          animate={isPlaying ? {
            strokeDasharray: config.pattern === 'wavy' 
              ? [`${size * 0.3} ${size * 0.1}`, `${size * 0.1} ${size * 0.3}`]
              : config.pattern === 'sharp'
              ? [`${size * 0.2} ${size * 0.05}`, `${size * 0.05} ${size * 0.2}`]
              : [`${size * 2.7}`, `${size * 2.7}`],
            rotate: [0, 360],
          } : {}}
          transition={{
            strokeDasharray: {
              duration: config.pulseSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: config.pulseSpeed * 5,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      </svg>
      
      {/* Inner Glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.75,
          height: size * 0.75,
          background: `radial-gradient(circle, ${config.colors[0]}20 0%, transparent 70%)`,
        }}
        animate={isPlaying ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{
          duration: config.pulseSpeed * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Content (Album Art) */}
      <div 
        className="relative z-10 rounded-full overflow-hidden shadow-2xl"
        style={{ 
          width: size * 0.65, 
          height: size * 0.65,
          boxShadow: `0 0 ${size * 0.1}px ${config.colors[0]}60`,
        }}
      >
        {children}
      </div>
      
      {/* Floating Particles */}
      {isPlaying && Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size * 0.02,
            height: size * 0.02,
            background: config.colors[i % config.colors.length],
            boxShadow: `0 0 ${size * 0.02}px ${config.colors[i % config.colors.length]}`,
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
          }}
          animate={{
            x: [0, Math.cos((i / 8) * Math.PI * 2) * size * 0.5],
            y: [0, Math.sin((i / 8) * Math.PI * 2) * size * 0.5],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: config.pulseSpeed * 1.5,
            delay: (i / 8) * config.pulseSpeed,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    MOOD DETECTOR (AI Integration point)
// ═══════════════════════════════════════════════════════════════════════════════

export function detectMoodFromGenre(genre: string): MoodType {
  const genreLower = genre.toLowerCase();
  
  if (genreLower.includes('bolero') || genreLower.includes('buồn')) {
    return 'melancholic';
  }
  if (genreLower.includes('vpop') || genreLower.includes('pop') || genreLower.includes('dance')) {
    return 'joyful';
  }
  if (genreLower.includes('trịnh') || genreLower.includes('trinh')) {
    return 'contemplative';
  }
  if (genreLower.includes('rock') || genreLower.includes('rap') || genreLower.includes('hip')) {
    return 'powerful';
  }
  if (genreLower.includes('tiền chiến') || genreLower.includes('xưa') || genreLower.includes('cũ')) {
    return 'nostalgic';
  }
  if (genreLower.includes('tình') || genreLower.includes('yêu') || genreLower.includes('love')) {
    return 'romantic';
  }
  
  return 'contemplative'; // Default
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    EXAMPLE USAGE
// ═══════════════════════════════════════════════════════════════════════════════

/*
import { MoodAura, detectMoodFromGenre } from '@/components/visual/MoodAura';

function SongPlayer({ song }) {
  const mood = detectMoodFromGenre(song.genre);
  
  return (
    <MoodAura mood={mood} size={400} isPlaying={isPlaying}>
      <img 
        src={song.albumArt} 
        alt={song.title}
        className="w-full h-full object-cover"
      />
    </MoodAura>
  );
}
*/

export default MoodAura;
