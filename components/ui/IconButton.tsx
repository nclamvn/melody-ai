'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'ghost' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  ariaLabel: string;
}

export default function IconButton({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
  ariaLabel,
}: IconButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue';

  const variants = {
    default: 'bg-background-tertiary text-text-secondary hover:text-text-primary hover:bg-background-tertiary/80',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/10',
    primary: 'bg-accent-blue text-white hover:bg-accent-blue/90',
  };

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}
