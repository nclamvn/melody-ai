'use client';

import { motion } from 'framer-motion';
import { SunLight, HalfMoon } from 'iconoir-react';
import { useTheme } from '@/components/providers/ThemeProvider';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg bg-background-tertiary border border-border hover:border-accent-blue/50 transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
          scale: [1, 0.8, 1],
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'dark' ? (
          <HalfMoon className="w-5 h-5 text-accent-yellow" />
        ) : (
          <SunLight className="w-5 h-5 text-accent-yellow" />
        )}
      </motion.div>
    </motion.button>
  );
}
