"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!barRef.current || duration <= 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = (clientX - rect.left) / rect.width;
    onSeek(Math.max(0, Math.min(duration, position * duration)));
  };

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div
        ref={barRef}
        onClick={handleInteraction}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        className="relative h-7 flex items-center cursor-pointer group"
      >
        {/* Track Background */}
        <div className="absolute inset-x-0 h-[3px] bg-white/10 rounded-full overflow-hidden">
          {/* Progress Fill */}
          <motion.div
            className="h-full bg-white/90 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ type: "tween", duration: 0.1 }}
          />
        </div>

        {/* Thumb - only visible on hover/drag */}
        <motion.div
          className="absolute w-3 h-3 -ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `${progress}%` }}
          animate={{ scale: isDragging ? 1.2 : 1 }}
        >
          <div className="w-full h-full rounded-full bg-white shadow-sm" />
        </motion.div>
      </div>

      {/* Time Labels */}
      <div className="flex items-center justify-between mt-1">
        <span className="text-[11px] text-white/40 tabular-nums font-medium">
          {formatTime(currentTime)}
        </span>
        <span className="text-[11px] text-white/40 tabular-nums font-medium">
          -{formatTime(Math.max(0, duration - currentTime))}
        </span>
      </div>
    </div>
  );
}
