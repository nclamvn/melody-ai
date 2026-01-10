"use client";

import { motion } from "framer-motion";
import { Play, MusicNote } from "iconoir-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Song } from "@/types";

interface SongCardProps {
  song: Song;
  index: number;
}

export default function SongCard({ song, index }: SongCardProps) {
  const router = useRouter();

  const handleClick = () => {
    // URLSearchParams automatically encodes values, don't double encode
    const params = new URLSearchParams({
      id: song.id,
      title: song.title,
      artist: song.artist,
      cover: song.coverUrl || "",
      ytId: song.youtubeId || song.id,
    });
    router.push(`/player?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{
        scale: 1.02,
        rotateX: -2,
        rotateY: 3,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="liquid-glass-elevated p-4 cursor-pointer group"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <div className="flex items-center gap-4">
        {/* Album Cover */}
        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-smoke">
          {song.coverUrl ? (
            <Image
              src={song.coverUrl}
              alt={song.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-aurora-blue/20 to-aurora-violet/20">
              <MusicNote className="w-6 h-6 text-aurora-blue" />
            </div>
          )}

          {/* Play Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
            >
              <Play className="w-5 h-5 text-void ml-0.5" fill="currentColor" />
            </motion.div>
          </motion.div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-body font-semibold text-primary truncate group-hover:text-aurora-blue transition-colors">
            {song.title}
          </h3>
          <p className="text-callout text-secondary truncate">
            {song.artist}
          </p>
          {song.snippet && (
            <p className="text-footnote text-muted mt-1 line-clamp-1">
              &quot;{song.snippet}&quot;
            </p>
          )}
        </div>

        {/* Match Score */}
        {song.matchScore && (
          <div className="flex-shrink-0">
            <div className="px-3 py-1.5 rounded-full bg-aurora-cyan/10 border border-aurora-cyan/20">
              <span className="text-caption font-medium text-aurora-cyan">
                {song.matchScore}%
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
