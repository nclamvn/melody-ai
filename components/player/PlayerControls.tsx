"use client";

import { motion } from "framer-motion";
import { SkipPrev, SkipNext, Play, Pause } from "iconoir-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
}: PlayerControlsProps) {
  // 3D Frosted Glass button style
  const glassButtonStyle = {
    background: `linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.1) 100%
    )`,
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 2px 8px rgba(0, 0, 0, 0.2),
      inset 0 2px 4px rgba(255, 255, 255, 0.2),
      inset 0 -2px 4px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1)
    `,
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Previous */}
      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrev}
        className="w-12 h-12 rounded-full flex items-center justify-center
          border border-white/[0.15] text-white/80 hover:text-white
          transition-all duration-200 relative overflow-hidden"
        style={glassButtonStyle}
        aria-label="Bài trước"
      >
        {/* Glass highlight */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
          }}
        />
        <SkipPrev className="w-5 h-5 relative z-10" strokeWidth={1.5} />
      </motion.button>

      {/* Play/Pause - Same size as other buttons */}
      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlayPause}
        className="w-12 h-12 rounded-full flex items-center justify-center
          border border-white/[0.15] text-white/90 hover:text-white
          transition-all duration-200 relative overflow-hidden"
        style={glassButtonStyle}
        aria-label={isPlaying ? "Tạm dừng" : "Phát"}
      >
        {/* Glass highlight */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)",
          }}
        />
        {/* Inner glow for play button */}
        <div
          className="absolute inset-1 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)",
          }}
        />
        {isPlaying ? (
          <Pause className="w-5 h-5 relative z-10" strokeWidth={2} />
        ) : (
          <Play className="w-5 h-5 ml-0.5 relative z-10" strokeWidth={2} fill="currentColor" />
        )}
      </motion.button>

      {/* Next */}
      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="w-12 h-12 rounded-full flex items-center justify-center
          border border-white/[0.15] text-white/80 hover:text-white
          transition-all duration-200 relative overflow-hidden"
        style={glassButtonStyle}
        aria-label="Bài tiếp"
      >
        {/* Glass highlight */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
          }}
        />
        <SkipNext className="w-5 h-5 relative z-10" strokeWidth={1.5} />
      </motion.button>
    </div>
  );
}
