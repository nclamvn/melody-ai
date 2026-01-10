"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MusicNote {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}

const MUSIC_SYMBOLS = ["♪", "♫", "♩", "♬", "𝄞", "𝄢"];
const AURORA_COLORS = [
  "#5B9FFF", // blue
  "#9D7AFF", // violet
  "#FF7AA8", // rose
  "#5BE0E5", // cyan
  "#FFD07A", // gold
];

function generateNotes(count: number): MusicNote[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    symbol: MUSIC_SYMBOLS[Math.floor(Math.random() * MUSIC_SYMBOLS.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 12 + Math.random() * 20,
    opacity: 0.1 + Math.random() * 0.2,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * -20,
    color: AURORA_COLORS[Math.floor(Math.random() * AURORA_COLORS.length)],
  }));
}

interface AuroraBackgroundProps {
  noteCount?: number;
  showNotes?: boolean;
}

export default function AuroraBackground({
  noteCount = 40,
  showNotes = true
}: AuroraBackgroundProps) {
  // Generate notes only on client to avoid hydration mismatch
  const [notes, setNotes] = useState<MusicNote[]>([]);

  useEffect(() => {
    setNotes(generateNotes(noteCount));
  }, [noteCount]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Aurora Gradient Mesh */}
      <div className="absolute inset-0">
        {/* Blob 1 - Blue */}
        <motion.div
          className="absolute w-[40%] h-[40%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(91, 159, 255, 0.4) 0%, transparent 70%)",
            left: "20%",
            top: "30%",
            filter: "blur(60px)",
          }}
          animate={{
            x: ["0%", "5%", "-3%", "8%", "0%"],
            y: ["0%", "8%", "5%", "-5%", "0%"],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob 2 - Violet */}
        <motion.div
          className="absolute w-[50%] h-[50%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(157, 122, 255, 0.3) 0%, transparent 70%)",
            right: "10%",
            top: "50%",
            filter: "blur(80px)",
          }}
          animate={{
            x: ["0%", "-8%", "5%", "-5%", "0%"],
            y: ["0%", "-5%", "8%", "-8%", "0%"],
            scale: [1, 0.95, 1.1, 0.98, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob 3 - Rose */}
        <motion.div
          className="absolute w-[35%] h-[35%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 122, 168, 0.25) 0%, transparent 70%)",
            right: "20%",
            top: "15%",
            filter: "blur(50px)",
          }}
          animate={{
            x: ["0%", "10%", "-5%", "5%", "0%"],
            y: ["0%", "5%", "-10%", "8%", "0%"],
            scale: [1, 1.05, 0.98, 1.08, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob 4 - Cyan */}
        <motion.div
          className="absolute w-[30%] h-[30%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(91, 224, 229, 0.2) 0%, transparent 70%)",
            left: "10%",
            bottom: "20%",
            filter: "blur(40px)",
          }}
          animate={{
            x: ["0%", "-5%", "8%", "-8%", "0%"],
            y: ["0%", "-8%", "5%", "-5%", "0%"],
            scale: [1, 1.08, 0.95, 1.02, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Music Notes */}
      {showNotes && notes.length > 0 && (
        <div className="absolute inset-0">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              className="absolute select-none"
              style={{
                left: `${note.x}%`,
                top: `${note.y}%`,
                fontSize: `${note.size}px`,
                color: note.color,
                opacity: note.opacity,
                textShadow: `0 0 20px ${note.color}40`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, -15, 0],
                rotate: [0, 10, -10, 0],
                opacity: [note.opacity, note.opacity * 1.5, note.opacity],
              }}
              transition={{
                duration: note.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: note.delay,
              }}
            >
              {note.symbol}
            </motion.div>
          ))}
        </div>
      )}

      {/* Vignette Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 7, 0.5) 70%, rgba(5, 5, 7, 0.9) 100%)",
        }}
      />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
