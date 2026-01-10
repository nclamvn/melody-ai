"use client";

import { motion } from "framer-motion";
import { SoundHigh, SoundLow, SoundOff, Microphone } from "iconoir-react";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  isKaraokeMode: boolean;
  onKaraokeModeToggle: () => void;
  showVolume?: boolean;
  showKaraoke?: boolean;
}

export default function VolumeControl({
  volume,
  onVolumeChange,
  isKaraokeMode,
  onKaraokeModeToggle,
  showVolume = true,
  showKaraoke = true,
}: VolumeControlProps) {
  const VolumeIcon = volume === 0 ? SoundOff : volume < 0.5 ? SoundLow : SoundHigh;

  const handleVolumeClick = () => {
    if (volume > 0) {
      onVolumeChange(0);
    } else {
      onVolumeChange(0.7);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Volume Control */}
      {showVolume && (
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleVolumeClick}
            className="text-white/50 hover:text-white/80 transition-colors"
            aria-label="Âm lượng"
          >
            <VolumeIcon className="w-5 h-5" strokeWidth={1.5} />
          </motion.button>

          {/* Volume Slider */}
          <div className="relative w-20 h-5 flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full h-[3px] bg-white/10 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:opacity-0
                hover:[&::-webkit-slider-thumb]:opacity-100
                [&::-webkit-slider-thumb]:transition-opacity"
              style={{
                background: `linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`,
              }}
            />
          </div>
        </div>
      )}

      {/* Karaoke Toggle */}
      {showKaraoke && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onKaraokeModeToggle}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all
            ${isKaraokeMode
              ? "bg-white/15 text-white"
              : "bg-transparent text-white/40 hover:text-white/60"
            }
          `}
          aria-label="Chế độ karaoke"
        >
          <Microphone className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>Karaoke</span>
        </motion.button>
      )}
    </div>
  );
}
