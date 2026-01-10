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
  return (
    <div className="flex items-center justify-center gap-6">
      {/* Previous */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrev}
        className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        aria-label="Bài trước"
      >
        <SkipPrev className="w-7 h-7" strokeWidth={1.5} />
      </motion.button>

      {/* Play/Pause */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlayPause}
        className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
        aria-label={isPlaying ? "Tạm dừng" : "Phát"}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-black" strokeWidth={2.5} />
        ) : (
          <Play className="w-6 h-6 text-black ml-0.5" strokeWidth={2.5} fill="black" />
        )}
      </motion.button>

      {/* Next */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        aria-label="Bài tiếp"
      >
        <SkipNext className="w-7 h-7" strokeWidth={1.5} />
      </motion.button>
    </div>
  );
}
