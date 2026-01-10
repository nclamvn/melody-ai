'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
    success: 'bg-success/20 text-success border-success/30',
    warning: 'bg-accent-yellow/20 text-accent-yellow border-accent-yellow/30',
    error: 'bg-error/20 text-error border-error/30',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-caption border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
