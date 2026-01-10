"use client";

import { useRef, useEffect } from 'react';
import { VisualizerProps } from '@/types/synesthesia';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  band: 'bass' | 'lowMid' | 'mid' | 'highMid' | 'high';
}

export default function ParticlesVisualizer({
  frequencyData,
  isPlaying,
  sensitivity,
  colors
}: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef<Record<string, number>>({
    bass: 0,
    lowMid: 0,
    mid: 0,
    highMid: 0,
    high: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const bandConfig = {
      bass: { size: [15, 30], speed: [1, 3], spawnRate: 100, color: colors.bass },
      lowMid: { size: [10, 20], speed: [2, 4], spawnRate: 80, color: colors.lowMid },
      mid: { size: [6, 12], speed: [3, 5], spawnRate: 60, color: colors.mid },
      highMid: { size: [3, 8], speed: [4, 6], spawnRate: 40, color: colors.highMid },
      high: { size: [1, 4], speed: [5, 8], spawnRate: 20, color: colors.high },
    };

    const spawnParticle = (band: keyof typeof bandConfig, intensity: number) => {
      const config = bandConfig[band];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const angle = Math.random() * Math.PI * 2;
      const speed = config.speed[0] + Math.random() * (config.speed[1] - config.speed[0]);
      const size = config.size[0] + Math.random() * (config.size[1] - config.size[0]);

      particlesRef.current.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed * intensity * sensitivity,
        vy: Math.sin(angle) * speed * intensity * sensitivity,
        size: size * intensity,
        color: config.color,
        life: 1,
        maxLife: 2 + Math.random() * 2,
        band,
      });
    };

    const render = (currentTime: number) => {
      ctx.fillStyle = 'rgba(5, 5, 7, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const bands: (keyof typeof bandConfig)[] = ['bass', 'lowMid', 'mid', 'highMid', 'high'];

      bands.forEach((band) => {
        const intensity = frequencyData[band];
        const config = bandConfig[band];

        if (intensity > 0.2 && currentTime - lastSpawnRef.current[band] > config.spawnRate / intensity) {
          const count = Math.floor(intensity * 5);
          for (let i = 0; i < count; i++) {
            spawnParticle(band, intensity);
          }
          lastSpawnRef.current[band] = currentTime;
        }
      });

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.016 / particle.maxLife;
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        if (particle.life <= 0) return false;

        const alpha = particle.life;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * particle.life * 2
        );
        gradient.addColorStop(0, `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${particle.color}${Math.floor(alpha * 0.5 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${particle.color}00`);

        ctx.fillStyle = gradient;
        ctx.fill();

        return true;
      });

      const centerGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, 100 + frequencyData.overall * 100
      );
      centerGradient.addColorStop(0, `rgba(255, 255, 255, ${frequencyData.overall * 0.3})`);
      centerGradient.addColorStop(0.5, `rgba(91, 159, 255, ${frequencyData.overall * 0.1})`);
      centerGradient.addColorStop(1, 'rgba(91, 159, 255, 0)');
      ctx.fillStyle = centerGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationRef.current = requestAnimationFrame(render);
    };

    if (isPlaying) {
      render(performance.now());
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frequencyData, isPlaying, sensitivity, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#050507' }}
    />
  );
}
