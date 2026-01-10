'use client';

import { motion } from 'framer-motion';
import { MusicNote } from 'iconoir-react';
import { Song } from '@/types';

interface SongInfoProps {
  song: Song;
}

export default function SongInfo({ song }: SongInfoProps) {
  return (
    <motion.div
      className="flex items-center justify-center gap-4 py-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Album cover */}
      <div className="w-20 h-20 rounded-lg bg-background-secondary flex items-center justify-center overflow-hidden shadow-lg">
        <MusicNote className="w-10 h-10 text-text-muted" />
      </div>

      {/* Song info */}
      <div className="text-center sm:text-left">
        <h1 className="text-h2 text-text-primary font-semibold">
          {song.title}
        </h1>
        <p className="text-body text-text-secondary">
          {song.artist}
        </p>
      </div>
    </motion.div>
  );
}
