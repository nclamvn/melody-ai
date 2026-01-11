"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════════
//                    COSMIC BACKGROUND
//                    Universe with stars, nebulae, and shooting stars
// ═══════════════════════════════════════════════════════════════════════════════

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  speed: number;
  length: number;
  opacity: number;
}

// Nebula colors - cosmic purple, blue, pink, cyan
const NEBULA_COLORS = [
  { r: 139, g: 92, b: 246 },   // Purple
  { r: 59, g: 130, b: 246 },   // Blue
  { r: 236, g: 72, b: 153 },   // Pink
  { r: 34, g: 211, b: 238 },   // Cyan
  { r: 251, g: 146, b: 60 },   // Orange
];

// Star colors - white, blue-white, yellow, light blue
const STAR_COLORS = [
  "#ffffff",
  "#cce6ff",
  "#fff5e6",
  "#e6f3ff",
  "#ffe6f0",
];

interface CosmicBackgroundProps {
  starCount?: number;
  shootingStarInterval?: number; // ms between shooting stars
  nebulaIntensity?: number; // 0-1
  className?: string;
}

export default function CosmicBackground({
  starCount = 800,
  shootingStarInterval = 3000,
  nebulaIntensity = 0.6,
  className = "",
}: CosmicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const shootingStarIdRef = useRef(0);

  // Generate stars
  const generateStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      // Most stars are small, but some are larger/brighter
      const isBrightStar = Math.random() > 0.9;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isBrightStar ? Math.random() * 2 + 1.5 : Math.random() * 1.2 + 0.3,
        opacity: isBrightStar ? Math.random() * 0.3 + 0.7 : Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      });
    }
    return stars;
  }, [starCount]);

  // Create shooting star
  const createShootingStar = useCallback(() => {
    const id = shootingStarIdRef.current++;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    // Start from random position on top or right edge
    const fromTop = Math.random() > 0.5;
    const startX = fromTop ? Math.random() * width : width + 50;
    const startY = fromTop ? -50 : Math.random() * height * 0.5;

    // End at bottom-left direction
    const angle = Math.PI / 4 + Math.random() * Math.PI / 6; // 45-75 degrees
    const distance = 300 + Math.random() * 400;

    const newShootingStar: ShootingStar = {
      id,
      startX,
      startY,
      endX: startX - Math.cos(angle) * distance,
      endY: startY + Math.sin(angle) * distance,
      speed: 1500 + Math.random() * 1000, // Duration in ms
      length: 100 + Math.random() * 150,
      opacity: 0.8 + Math.random() * 0.2,
    };

    setShootingStars(prev => [...prev, newShootingStar]);

    // Remove after animation
    setTimeout(() => {
      setShootingStars(prev => prev.filter(s => s.id !== id));
    }, newShootingStar.speed + 200);
  }, []);

  // Draw stars on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      starsRef.current = generateStars(window.innerWidth, window.innerHeight);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0;
    const animate = () => {
      time += 0.016; // ~60fps
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      starsRef.current.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase);
        const opacity = star.opacity * (0.5 + twinkle * 0.5);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = opacity;
        ctx.fill();

        // Add glow for brighter stars
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 3
          );
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.globalAlpha = opacity * 0.3;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [generateStars]);

  // Shooting star interval
  useEffect(() => {
    // Initial shooting star after a short delay
    const initialTimeout = setTimeout(() => {
      createShootingStar();
    }, 1000);

    const interval = setInterval(() => {
      // Random chance to create multiple shooting stars
      createShootingStar();
      if (Math.random() > 0.7) {
        setTimeout(createShootingStar, 200 + Math.random() * 500);
      }
    }, shootingStarInterval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [shootingStarInterval, createShootingStar]);

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Deep Space Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, #0d0d1a 0%, #050508 50%, #000000 100%)",
        }}
      />

      {/* Nebula Layers */}
      <div className="absolute inset-0" style={{ opacity: nebulaIntensity }}>
        {/* Nebula 1 - Purple/Pink */}
        <motion.div
          className="absolute w-[80%] h-[60%]"
          style={{
            left: "-10%",
            top: "10%",
            background: `radial-gradient(ellipse at 30% 50%,
              rgba(139, 92, 246, 0.35) 0%,
              rgba(236, 72, 153, 0.25) 30%,
              transparent 70%)`,
            filter: "blur(80px)",
          }}
          animate={{
            x: ["0%", "5%", "-3%", "0%"],
            y: ["0%", "3%", "-2%", "0%"],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Nebula 2 - Blue/Cyan */}
        <motion.div
          className="absolute w-[70%] h-[50%]"
          style={{
            right: "-5%",
            top: "20%",
            background: `radial-gradient(ellipse at 70% 40%,
              rgba(59, 130, 246, 0.3) 0%,
              rgba(34, 211, 238, 0.2) 40%,
              transparent 70%)`,
            filter: "blur(100px)",
          }}
          animate={{
            x: ["0%", "-4%", "3%", "0%"],
            y: ["0%", "-3%", "4%", "0%"],
            scale: [1, 0.95, 1.08, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Nebula 3 - Orange/Gold dust */}
        <motion.div
          className="absolute w-[40%] h-[40%]"
          style={{
            left: "30%",
            bottom: "10%",
            background: `radial-gradient(ellipse at center,
              rgba(251, 146, 60, 0.25) 0%,
              rgba(251, 191, 36, 0.15) 40%,
              transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{
            x: ["0%", "8%", "-5%", "0%"],
            y: ["0%", "-5%", "3%", "0%"],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
        />

        {/* Nebula 4 - Deep Purple core */}
        <motion.div
          className="absolute w-[50%] h-[50%]"
          style={{
            right: "20%",
            bottom: "20%",
            background: `radial-gradient(ellipse at center,
              rgba(88, 28, 135, 0.4) 0%,
              rgba(139, 92, 246, 0.25) 30%,
              transparent 60%)`,
            filter: "blur(70px)",
          }}
          animate={{
            x: ["0%", "-6%", "4%", "0%"],
            y: ["0%", "4%", "-6%", "0%"],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8,
          }}
        />

        {/* Distant Galaxy - subtle spiral hint */}
        <motion.div
          className="absolute w-[15%] h-[8%]"
          style={{
            left: "60%",
            top: "15%",
            background: `linear-gradient(45deg,
              rgba(255, 255, 255, 0.03) 0%,
              rgba(139, 92, 246, 0.08) 50%,
              rgba(255, 255, 255, 0.03) 100%)`,
            filter: "blur(5px)",
            borderRadius: "50%",
            transform: "rotate(-30deg)",
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Stars Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Shooting Stars */}
      <AnimatePresence>
        {shootingStars.map(star => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: star.startX,
              top: star.startY,
              width: star.length,
              height: 2,
              background: `linear-gradient(90deg,
                transparent 0%,
                rgba(255,255,255,${star.opacity}) 20%,
                rgba(200,220,255,${star.opacity}) 50%,
                rgba(255,255,255,0) 100%)`,
              transformOrigin: "left center",
              transform: `rotate(${Math.atan2(
                star.endY - star.startY,
                star.endX - star.startX
              ) * 180 / Math.PI}deg)`,
              boxShadow: `
                0 0 6px 2px rgba(255,255,255,0.6),
                0 0 12px 4px rgba(200,220,255,0.4),
                0 0 20px 6px rgba(139,92,246,0.2)
              `,
              borderRadius: "100px",
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scaleX: 0.3,
            }}
            animate={{
              x: star.endX - star.startX,
              y: star.endY - star.startY,
              opacity: [0, 1, 1, 0],
              scaleX: [0.3, 1, 1, 0.5],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: star.speed / 1000,
              ease: "easeOut",
              opacity: {
                times: [0, 0.1, 0.7, 1],
              },
            }}
          />
        ))}
      </AnimatePresence>

      {/* Star Clusters - brighter spots */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + i % 3 * 2,
              height: 3 + i % 3 * 2,
              left: `${15 + (i * 10) % 70}%`,
              top: `${10 + (i * 12) % 80}%`,
              background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(200,220,255,0.5) 40%, transparent 70%)",
              boxShadow: `0 0 ${8 + i * 2}px ${3 + i}px rgba(255,255,255,0.4), 0 0 ${15 + i * 3}px ${5 + i}px rgba(139,92,246,0.2)`,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export { CosmicBackground };
