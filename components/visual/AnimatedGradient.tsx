// ═══════════════════════════════════════════════════════════════════════════════
//                    ANIMATED GRADIENT BACKGROUND
//                    Smooth animated gradient that changes based on song mood
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
//                    GRADIENT PRESETS BY MOOD
// ═══════════════════════════════════════════════════════════════════════════════

type GradientMood = 
  | 'melancholic' 
  | 'joyful' 
  | 'romantic' 
  | 'peaceful' 
  | 'energetic' 
  | 'nostalgic'
  | 'mysterious'
  | 'dreamy';

interface GradientConfig {
  colors: string[];
  angle: number;
  speed: number;
  blur?: number;
}

const GRADIENT_PRESETS: Record<GradientMood, GradientConfig> = {
  melancholic: {
    colors: ['#0d1b2a', '#1b263b', '#415a77', '#1b263b'],
    angle: 135,
    speed: 8,
    blur: 100,
  },
  joyful: {
    colors: ['#ff9a9e', '#fecfef', '#fecfef', '#fad0c4'],
    angle: 45,
    speed: 4,
    blur: 80,
  },
  romantic: {
    colors: ['#ee9ca7', '#ffdde1', '#f8b4b4', '#ee9ca7'],
    angle: 90,
    speed: 6,
    blur: 90,
  },
  peaceful: {
    colors: ['#134e5e', '#71b280', '#134e5e', '#71b280'],
    angle: 180,
    speed: 10,
    blur: 120,
  },
  energetic: {
    colors: ['#f12711', '#f5af19', '#f12711', '#f5af19'],
    angle: 45,
    speed: 2,
    blur: 60,
  },
  nostalgic: {
    colors: ['#3e2723', '#5d4037', '#795548', '#5d4037'],
    angle: 135,
    speed: 12,
    blur: 100,
  },
  mysterious: {
    colors: ['#0f0c29', '#302b63', '#24243e', '#0f0c29'],
    angle: 180,
    speed: 8,
    blur: 110,
  },
  dreamy: {
    colors: ['#a18cd1', '#fbc2eb', '#a6c1ee', '#a18cd1'],
    angle: 60,
    speed: 6,
    blur: 100,
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
//                    ANIMATED GRADIENT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface AnimatedGradientProps {
  mood: GradientMood;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
  animate?: boolean;
}

export function AnimatedGradient({
  mood,
  className = '',
  children,
  overlay = true,
  overlayOpacity = 0.3,
  animate = true,
}: AnimatedGradientProps) {
  const config = GRADIENT_PRESETS[mood];
  const [colorIndex, setColorIndex] = useState(0);
  
  // Rotate colors for animation
  useEffect(() => {
    if (!animate) return;
    
    const interval = setInterval(() => {
      setColorIndex(prev => (prev + 1) % config.colors.length);
    }, config.speed * 1000);
    
    return () => clearInterval(interval);
  }, [animate, config.colors.length, config.speed]);
  
  const rotatedColors = [
    ...config.colors.slice(colorIndex),
    ...config.colors.slice(0, colorIndex),
  ];
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient layers */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(${config.angle}deg, ${rotatedColors.join(', ')})`,
            `linear-gradient(${config.angle + 30}deg, ${rotatedColors.reverse().join(', ')})`,
          ],
        }}
        transition={{
          duration: config.speed,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      
      {/* Blur overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, ${config.colors[0]}90 100%)`,
        }}
      />
      
      {/* Floating orbs for extra effect */}
      {animate && (
        <>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '40%',
              height: '40%',
              background: `radial-gradient(circle, ${config.colors[1]}60 0%, transparent 70%)`,
              filter: `blur(${config.blur}px)`,
            }}
            animate={{
              x: ['10%', '60%', '30%', '10%'],
              y: ['20%', '50%', '70%', '20%'],
            }}
            transition={{
              duration: config.speed * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '50%',
              height: '50%',
              background: `radial-gradient(circle, ${config.colors[2]}50 0%, transparent 70%)`,
              filter: `blur(${config.blur}px)`,
            }}
            animate={{
              x: ['70%', '20%', '50%', '70%'],
              y: ['60%', '30%', '10%', '60%'],
            }}
            transition={{
              duration: config.speed * 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}
      
      {/* Dark overlay for readability */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    GRADIENT TRANSITION (Smooth mood change)
// ═══════════════════════════════════════════════════════════════════════════════

interface GradientTransitionProps {
  mood: GradientMood;
  className?: string;
  children?: React.ReactNode;
  transitionDuration?: number;
}

export function GradientTransition({
  mood,
  className = '',
  children,
  transitionDuration = 1,
}: GradientTransitionProps) {
  const config = GRADIENT_PRESETS[mood];
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={mood}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration }}
          style={{
            background: `linear-gradient(${config.angle}deg, ${config.colors.join(', ')})`,
          }}
        />
      </AnimatePresence>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    MESH GRADIENT (More organic look)
// ═══════════════════════════════════════════════════════════════════════════════

interface MeshGradientProps {
  mood: GradientMood;
  className?: string;
  children?: React.ReactNode;
}

export function MeshGradient({ mood, className = '', children }: MeshGradientProps) {
  const config = GRADIENT_PRESETS[mood];
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ background: config.colors[0] }}>
        {/* Multiple gradient layers for mesh effect */}
        {config.colors.map((color, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: '80%',
              height: '80%',
              background: `radial-gradient(circle, ${color} 0%, transparent 60%)`,
              filter: `blur(${config.blur || 80}px)`,
            }}
            animate={{
              left: [`${i * 20}%`, `${((i + 2) * 20) % 100}%`],
              top: [`${((i + 1) * 25) % 100}%`, `${i * 25}%`],
            }}
            transition={{
              duration: config.speed + i * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    HELPER: Get mood from genre
// ═══════════════════════════════════════════════════════════════════════════════

export function getGradientMoodFromGenre(genre: string): GradientMood {
  const g = genre.toLowerCase();
  
  if (g.includes('bolero') || g.includes('buồn')) return 'melancholic';
  if (g.includes('vpop') || g.includes('pop') || g.includes('dance')) return 'joyful';
  if (g.includes('trịnh') || g.includes('trinh')) return 'peaceful';
  if (g.includes('rock') || g.includes('rap')) return 'energetic';
  if (g.includes('tiền chiến') || g.includes('xưa')) return 'nostalgic';
  if (g.includes('tình') || g.includes('ballad')) return 'romantic';
  if (g.includes('indie') || g.includes('alternative')) return 'dreamy';
  
  return 'mysterious';
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default AnimatedGradient;
