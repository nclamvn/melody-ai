"use client";

interface MelodyLogoProps {
  size?: number;
  className?: string;
}

export default function MelodyLogo({ size = 40, className = "" }: MelodyLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="melodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="30%" stopColor="#F97316" />
          <stop offset="60%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>
      </defs>

      {/* Main M shape */}
      <path
        d="M10 85V25L30 25L50 50L70 25H90V85H72V50L50 75L28 50V85H10Z"
        fill="url(#melodyGradient)"
      />

      {/* Pixel decorations - left */}
      <rect x="4" y="70" width="5" height="5" fill="#F59E0B" opacity="0.8" />
      <rect x="4" y="78" width="5" height="5" fill="#F97316" opacity="0.6" />
      <rect x="10" y="90" width="5" height="5" fill="#F97316" opacity="0.5" />
      <rect x="17" y="90" width="4" height="4" fill="#F59E0B" opacity="0.4" />

      {/* Pixel decorations - right */}
      <rect x="91" y="70" width="5" height="5" fill="#EC4899" opacity="0.8" />
      <rect x="91" y="78" width="5" height="5" fill="#D946EF" opacity="0.6" />
      <rect x="85" y="90" width="5" height="5" fill="#EC4899" opacity="0.5" />
      <rect x="78" y="90" width="4" height="4" fill="#D946EF" opacity="0.4" />

      {/* Small accent pixels */}
      <rect x="4" y="62" width="3" height="3" fill="#F59E0B" opacity="0.4" />
      <rect x="93" y="62" width="3" height="3" fill="#D946EF" opacity="0.4" />
    </svg>
  );
}
