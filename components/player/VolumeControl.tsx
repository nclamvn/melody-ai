"use client";

import { motion } from "framer-motion";
import { SoundHigh, SoundLow, SoundOff, Microphone, Book } from "iconoir-react";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  isKaraokeMode: boolean;
  onKaraokeModeToggle: () => void;
  onAlbumStoryToggle?: () => void;
  showVolume?: boolean;
  showKaraoke?: boolean;
  showAlbumStory?: boolean;
}

export default function VolumeControl({
  volume,
  onVolumeChange,
  isKaraokeMode,
  onKaraokeModeToggle,
  onAlbumStoryToggle,
  showVolume = true,
  showKaraoke = true,
  showAlbumStory = true,
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleVolumeClick}
            className="w-10 h-10 rounded-full flex items-center justify-center
              bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]
              text-white/60 hover:text-white hover:bg-white/[0.1] transition-all duration-200"
            style={{
              boxShadow: "0 2px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
            aria-label="Âm lượng"
          >
            <VolumeIcon className="w-5 h-5" strokeWidth={1.5} />
          </motion.button>

          {/* Volume Slider */}
          <div className="relative w-24 h-10 flex items-center px-2
            bg-white/[0.04] backdrop-blur-xl rounded-full border border-white/[0.06]"
            style={{
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right,
                  rgba(255,255,255,0.8) 0%,
                  rgba(255,255,255,0.8) ${volume * 100}%,
                  rgba(255,255,255,0.15) ${volume * 100}%,
                  rgba(255,255,255,0.15) 100%)`,
              }}
            />
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 14px;
                height: 14px;
                background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.9);
                transition: transform 0.15s;
              }
              input[type="range"]::-webkit-slider-thumb:hover {
                transform: scale(1.15);
              }
            `}</style>
          </div>
        </div>
      )}

      {/* Karaoke Toggle */}
      {showKaraoke && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onKaraokeModeToggle}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium
            backdrop-blur-xl border transition-all duration-300
            ${isKaraokeMode
              ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400/40 text-white"
              : "bg-white/[0.06] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.1]"
            }
          `}
          style={{
            boxShadow: isKaraokeMode
              ? "0 4px 20px rgba(168,85,247,0.3), inset 0 1px 0 rgba(255,255,255,0.15)"
              : "0 2px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
          aria-label="Chế độ karaoke"
        >
          <Microphone
            className={`w-4 h-4 ${isKaraokeMode ? "text-purple-300" : ""}`}
            strokeWidth={1.5}
          />
          <span>Karaoke</span>
          {isKaraokeMode && (
            <motion.div
              layoutId="karaokeActive"
              className="w-1.5 h-1.5 rounded-full bg-purple-400"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.button>
      )}

      {/* Album Story Toggle */}
      {showAlbumStory && onAlbumStoryToggle && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAlbumStoryToggle}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium
            backdrop-blur-xl border transition-all duration-300
            bg-white/[0.06] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.1]"
          style={{
            boxShadow: "0 2px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
          aria-label="Album Story"
        >
          <Book className="w-4 h-4" strokeWidth={1.5} />
          <span>Album Story</span>
        </motion.button>
      )}
    </div>
  );
}
